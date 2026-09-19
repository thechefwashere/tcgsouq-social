-- Verification for 0002_ops_hub.sql
--
-- Run against a THROWAWAY database — it writes rows.
--   db/tests/run.sh
--
-- Checks the three behaviours this layer exists for. Each raises an exception on failure,
-- so the script exits non-zero if anything regresses.

\set ON_ERROR_STOP on
\i :root/db/seed/0005_ops_hub_seed.sql
\i :root/db/seed/0005_ops_hub_seed.sql

do $$
declare
  n integer;
  m integer;
begin
  ---------------------------------------------------------------------------
  -- 1. The seed is idempotent. It is applied twice above; a second run must repair,
  --    not duplicate. A dashboard showing every project twice is worse than no dashboard.
  ---------------------------------------------------------------------------
  select count(*) into n from projects;
  if n <> count(distinct slug) from projects then
    raise exception 'FAIL 1: projects duplicated on re-seed (% rows)', n;
  end if;
  select count(*) into m from deviations where rule = 'D7' and closed_at is null;
  if m <> 1 then
    raise exception 'FAIL 1: expected exactly one open D7 deviation, found %', m;
  end if;
  raise notice 'PASS 1: re-seeding repaired rather than duplicated (% projects, 1 open deviation)', n;

  ---------------------------------------------------------------------------
  -- 2. The timeline view must carry BOTH sources. store_state is the most valuable
  --    series in the database — a chart of "what happened" that silently omits the
  --    seven-week closure is exactly the mistake BASELINE recorded twice.
  ---------------------------------------------------------------------------
  select count(*) into n from timeline where source_table = 'event';
  select count(*) into m from timeline where source_table = 'store_state';
  if n = 0 or m = 0 then
    raise exception 'FAIL 2: timeline missing a source (% events, % store_state)', n, m;
  end if;
  raise notice 'PASS 2: timeline unions both sources (% events, % store_state)', n, m;

  ---------------------------------------------------------------------------
  -- 3. Dates must survive as +04 instants, not drift a day.
  --    The owner is UTC+4 and the server is not. A milestone entered as 17 July
  --    renders as 16 July if anything reads it in UTC, so the stored instant is
  --    asserted here against the zone the owner actually lives in.
  ---------------------------------------------------------------------------
  select count(*) into n
    from store_state
   where state = 'password'
     and (lower(during) at time zone 'Asia/Dubai')::date = date '2026-07-17';
  if n <> 1 then
    raise exception 'FAIL 3: the closure does not start on 17 Jul in Asia/Dubai';
  end if;
  raise notice 'PASS 3: instants render correctly in the owner''s zone (Asia/Dubai)';

  raise notice 'ALL OPS HUB CHECKS PASSED';
end $$;
