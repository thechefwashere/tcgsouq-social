import { db } from '../lib/db.js';

/**
 * Proves the whole loop works — Railway can reach Supabase, the schema is present,
 * and a job can write a row — using no external credentials at all.
 *
 * Deliberately the first thing deployed. If this fails, the problem is connectivity
 * or configuration, not a data source, and that is a much shorter debug.
 */
export default async function healthcheck(ctx) {
  const pool = db();

  const { rows: [meta] } = await pool.query(`
    select current_database() as database,
           current_setting('server_version') as version,
           current_setting('TimeZone') as session_timezone,
           now() as server_time
  `);

  const { rows: [counts] } = await pool.query(`
    select (select count(*) from shopify_daily)          as shopify_daily,
           (select count(*) from shopify_referrer_daily) as shopify_referrer_daily,
           (select count(*) from orders)                 as orders,
           (select count(*) from store_state)            as store_state,
           (select count(*) from wa_messages)            as wa_messages
  `);

  console.log(`  database        ${meta.database}`);
  console.log(`  postgres        ${meta.version}`);
  console.log(`  session tz      ${meta.session_timezone}`);
  console.log(`  server time     ${meta.server_time.toISOString()}`);
  for (const [table, n] of Object.entries(counts)) {
    console.log(`  ${table.padEnd(24)}${n}`);
  }

  // A healthcheck writes nothing but its own ingest_runs row.
  ctx.rowsWritten = 0;
  return { meta, counts };
}
