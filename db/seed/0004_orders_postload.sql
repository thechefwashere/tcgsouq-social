-- 0004_orders_postload.sql
-- Run ONCE after 0003_orders_backfill.sql. Safe to re-run; every statement is idempotent.
--
-- Two jobs: repair two malformed phone numbers, and compute is_first_order.
-- Test orders are documented here but NOT marked in the database — see the note at the end
-- for why, and for the predicate to exclude them.

begin;

-- ---------------------------------------------------------------------------
-- 1. Two UAE numbers carry a stray 0 between the country code and the subscriber
--    number: +971 0 5XXXXXXXX. That is 14 characters where a UAE mobile is 13.
--    It passes the E.164 check constraint but is not dialable, so a WhatsApp join
--    against it would silently miss.
--
--    The repair is unambiguous — drop the 0 — but it is GUARDED: only applied when
--    the result is exactly a valid 13-character UAE mobile. Anything else is left
--    alone rather than guessed at.
-- ---------------------------------------------------------------------------

update orders
set    phone_e164 = regexp_replace(phone_e164, '^\+9710', '+971')
where  phone_e164 like '+9710%'
  and  regexp_replace(phone_e164, '^\+9710', '+971') ~ '^\+9715[0-9]{8}$';

-- NOT repaired, deliberately: one number of the form +971XXXXXXXX (12 chars) is a
-- digit short of a UAE mobile. There is no safe way to know which digit is missing,
-- so it stays as captured. It will simply fail to join, which is the honest outcome.

-- ---------------------------------------------------------------------------
-- 2. is_first_order — computed here rather than guessed per-row at fetch time,
--    because it is a property of the customer's whole order history.
--
--    Verified on the full backfill: 1,450 first orders across exactly 1,450
--    customers, so there are no same-timestamp ties to resolve.
-- ---------------------------------------------------------------------------

update orders o
set    is_first_order = (o.placed_at = f.first_at)
from   (select shopify_customer_id, min(placed_at) as first_at
        from   orders
        where  shopify_customer_id is not null
        group  by shopify_customer_id) f
where  o.shopify_customer_id = f.shopify_customer_id;

commit;

-- ---------------------------------------------------------------------------
-- 3. Test orders — documented, not marked. Read this before computing revenue.
--
--    17 orders of 0.00-0.01 AED with line items literally titled "Test"/"test",
--    across throwaway customer records. Counting every customer who has never placed
--    an order above 0.01 AED — the May burst, the two stragglers, and one older record —
--    18 of the 1,450 customer records are not real. Real customers: 1,432. None of them
--    corrupts a genuine customer's first-order flag.
--
--      2026-05-17 Dubai, 00:17-00:26  -- 15 orders, a ten-minute burst
--      2026-05-18 Dubai, 08:17        --  1 order
--      2026-05-21 Dubai, 23:16        --  1 order
--
--    NOTE the timezone: that burst is 2026-05-16 in UTC. Filtering these by UTC date
--    finds them on the wrong day, and filtering only 16 May Dubai finds none at all.
--
--    They are NOT deleted — they are real rows in Shopify and this is an archive.
--    They are NOT recorded in store_state either: that table drives
--    shopify_daily_trading, and 2026-05-17 was a normal trading day with 19 genuine
--    orders and AED 4,353 in sales. Flagging it there would hide real revenue from
--    every future analysis. store_state answers "was the shop open", not "is this row
--    odd".
--
--    To exclude them, filter on value:
--
--      where total > 0.01
--
--    That is blunt but honest, and it also removes the ten older zero-value orders
--    scattered from 2023 to 2025, whose nature has not been established.
-- ---------------------------------------------------------------------------

-- Verification — expect: still_malformed 0, first_orders 1450, customers 1450,
-- test_orders 17, real_customers 1432.

select count(*) filter (where phone_e164 like '+9710%')     as still_malformed,
       count(*) filter (where is_first_order)               as first_orders,
       count(distinct shopify_customer_id)                  as customers,
       count(*) filter (where total <= 0.01
                          and placed_at >= '2026-05-01')    as test_orders,
       count(distinct shopify_customer_id)
         filter (where total > 0.01)                        as real_customers
from   orders;
