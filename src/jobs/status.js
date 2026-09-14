import { db } from '../lib/db.js';

/**
 * Prints what the database actually contains, so questions about it get answered from the
 * data instead of from reading Railway's log pane and guessing.
 *
 * Reads only. Two things it exists to settle:
 *   - how many times a job has really run (Railway interleaves container lifecycle lines,
 *     so a single clean run can look like a restart loop);
 *   - what is in store_state, which silently governs every trading-day figure.
 */
export default async function status(ctx) {
  const pool = db();

  const { rows: counts } = await pool.query(`
    select 'shopify_daily' as table_name, count(*) as rows from shopify_daily
    union all select 'shopify_referrer_daily', count(*) from shopify_referrer_daily
    union all select 'orders',                 count(*) from orders
    union all select 'store_state',            count(*) from store_state
    union all select 'wa_messages',            count(*) from wa_messages
    union all select 'ingest_runs',            count(*) from ingest_runs
    order by 1
  `);
  console.log('  counts');
  for (const r of counts) console.log(`    ${r.table_name.padEnd(24)}${r.rows}`);

  // Dubai time throughout. A UTC cast here shows dates a day early for anything after
  // 20:00 local, which has already produced wrong readings of this store's own data.
  const { rows: runs } = await pool.query(`
    select source, status, rows_written,
           to_char(started_at  at time zone 'Asia/Dubai', 'YYYY-MM-DD HH24:MI:SS') as started_dubai,
           round(extract(epoch from (finished_at - started_at))::numeric, 2) as seconds,
           left(coalesce(error, ''), 120) as error
    from   ingest_runs
    order  by started_at desc
    limit  20
  `);
  console.log(`\n  last ${runs.length} ingest runs (Asia/Dubai)`);
  for (const r of runs) {
    const line = `    ${r.started_dubai}  ${String(r.source).padEnd(20)}${String(r.status).padEnd(9)}` +
                 `${String(r.rows_written ?? '').padStart(7)} rows  ${r.seconds ?? '?'}s`;
    console.log(r.error ? `${line}\n      ${r.error}` : line);
  }

  const { rows: runsToday } = await pool.query(`
    select source, count(*) as runs
    from   ingest_runs
    where  started_at > now() - interval '24 hours'
    group  by source order by 2 desc
  `);
  console.log('\n  runs in the last 24h');
  for (const r of runsToday) console.log(`    ${String(r.source).padEnd(24)}${r.runs}`);

  const { rows: states } = await pool.query(`
    select state,
           to_char(lower(during) at time zone 'Asia/Dubai', 'YYYY-MM-DD') as from_dubai,
           coalesce(to_char(upper(during) at time zone 'Asia/Dubai', 'YYYY-MM-DD'), 'ongoing') as to_dubai,
           coalesce(note, '') as note
    from   store_state
    order  by lower(during)
  `);
  console.log(`\n  store_state — ${states.length} rows (Asia/Dubai)`);
  for (const s of states) {
    console.log(`    ${s.from_dubai} .. ${s.to_dubai.padEnd(10)} ${s.state.padEnd(18)}${s.note}`);
  }

  const { rows: [excluded] } = await pool.query(`
    select (select count(*) from shopify_daily) - (select count(*) from shopify_daily_trading) as days_excluded
  `);
  console.log(`\n  days excluded by shopify_daily_trading: ${excluded.days_excluded}`);

  ctx.rowsWritten = 0;
}
