-- Verification for 0001_capture_layer.sql
--
-- Run against a THROWAWAY database — it writes rows.
--   db/tests/run.sh
--
-- Checks the four behaviours the schema exists for. Each raises an exception on failure,
-- so the script exits non-zero if anything regresses.

do $$
declare
  n integer;
  ok boolean;
begin
  ---------------------------------------------------------------------------
  -- 1. store_state must reject overlapping periods.
  --    Without this, two contradictory "what was the shop doing" rows can coexist
  --    and the trading view becomes meaningless.
  ---------------------------------------------------------------------------
  begin
    insert into store_state (state, during)
      values ('maintenance', tstzrange('2026-08-01 00:00+04','2026-08-05 00:00+04','[)'));
    raise exception 'FAIL 1: overlapping store_state was accepted';
  exception when exclusion_violation then
    raise notice 'PASS 1: overlapping store_state rejected';
  end;

  ---------------------------------------------------------------------------
  -- 2. Non-overlapping periods must still be accepted.
  ---------------------------------------------------------------------------
  insert into store_state (state, during, note)
    values ('maintenance', tstzrange('2026-05-01 00:00+04','2026-05-02 00:00+04','[)'), 'test row');
  raise notice 'PASS 2: non-overlapping store_state accepted';

  ---------------------------------------------------------------------------
  -- 3. shopify_daily_trading must hide every day inside a non-open period.
  --    This is the one that matters most: averaging through the 17 Jul - 7 Sep
  --    shutdown already produced one wrong reading of the store's own numbers.
  ---------------------------------------------------------------------------
  insert into shopify_daily (day, sessions, orders) values
    ('2026-07-16', 100, 5),   -- open, day before the closure
    ('2026-07-20',  90, 0),   -- inside closure
    ('2026-08-15',  80, 0),   -- inside closure
    ('2026-09-06',  70, 0),   -- inside closure, last day
    ('2026-09-08', 300, 12),  -- reopened
    ('2026-05-01', 200, 9);   -- inside the maintenance day from step 2

  select count(*) into n from shopify_daily;
  if n <> 6 then raise exception 'FAIL 3a: expected 6 seeded days, found %', n; end if;

  select count(*) into n from shopify_daily_trading;
  if n <> 2 then
    raise exception 'FAIL 3b: trading view should show 2 open days, showed %', n;
  end if;

  select bool_and(day in (date '2026-07-16', date '2026-09-08')) into ok
    from shopify_daily_trading;
  if not ok then raise exception 'FAIL 3c: trading view kept a closed day'; end if;
  raise notice 'PASS 3: trading view hid 4 of 6 days';

  ---------------------------------------------------------------------------
  -- 4. phone_e164 must be canonical. It is the join key between WhatsApp and
  --    Shopify; a loose format here silently breaks every cohort comparison.
  ---------------------------------------------------------------------------
  insert into wa_contacts (phone_e164) values ('+971502950782');

  begin
    insert into wa_contacts (phone_e164) values ('971502950782');   -- missing +
    raise exception 'FAIL 4a: phone without + was accepted';
  exception when check_violation then null;
  end;

  begin
    insert into wa_contacts (phone_e164) values ('+0971502950782'); -- leading zero
    raise exception 'FAIL 4b: phone with leading zero was accepted';
  exception when check_violation then null;
  end;
  raise notice 'PASS 4: phone_e164 accepts canonical, rejects malformed';

  raise notice 'ALL SCHEMA CHECKS PASSED';
end $$;

---------------------------------------------------------------------------
-- 5. The inference query this schema exists to make possible.
--    Read versus delivered-unread within ONE broadcast: same list, same
--    message, same moment, one group opened it. As close to a natural control
--    group as anything in this project gets.
--
--    Not an assertion — it prints, so the shape stays visible and reviewable.
---------------------------------------------------------------------------

insert into wa_contacts (phone_e164) values
  ('+971500000001'),('+971500000002'),('+971500000003');

insert into wa_broadcasts (id, name, template_name, started_at)
  values ('test_bc1','Restock drop','fairdrop_items_reserved','2026-09-10 10:00+04');

insert into wa_messages (id, phone_e164, broadcast_id, direction, sent_at, delivered_at, read_at) values
  ('test_m1','+971500000001','test_bc1','outbound','2026-09-10 10:00+04','2026-09-10 10:01+04','2026-09-10 10:30+04'),
  ('test_m2','+971500000002','test_bc1','outbound','2026-09-10 10:00+04','2026-09-10 10:01+04', null),
  ('test_m3','+971500000003','test_bc1','outbound','2026-09-10 10:00+04','2026-09-10 10:02+04','2026-09-10 11:00+04');

insert into orders (shopify_order_id, phone_e164, placed_at, total, is_first_order) values
  (1001,'+971500000001','2026-09-10 12:00+04', 250.00, false),
  (1002,'+971500000003','2026-09-11 09:00+04', 120.00, true);

select
  case when m.read_at is not null then 'read' else 'delivered_unread' end as arm,
  count(*)                                                               as recipients,
  count(o.shopify_order_id)                                              as ordered_within_48h,
  round(100.0 * count(o.shopify_order_id) / count(*), 1)                 as pct
from wa_messages m
left join orders o
  on  o.phone_e164 = m.phone_e164
  and o.placed_at >= m.delivered_at
  and o.placed_at <  m.delivered_at + interval '48 hours'
where m.broadcast_id = 'test_bc1'
  and m.delivered_at is not null
group by 1
order by 1;
