import { withIngestRun } from '../lib/ingest-run.js';

/**
 * The scheduled run: every capture source, in order, in one container.
 *
 * One container rather than one service per source, because each job takes seconds and
 * Railway bills per second — the spin-up dominates. Sources are added here as they gain
 * credentials.
 *
 * A failing source does NOT stop the others. That is the point: if Wati's token expires,
 * Shopify should still be captured tonight, and the failure should be a row in ingest_runs
 * rather than a silence. Each sub-job gets its own ingest_runs row, so "which source is
 * broken and since when" stays answerable.
 *
 * The container still exits non-zero if anything failed, so Railway marks the run red and
 * the deploy status reflects reality.
 */
const SOURCES = [
  ['shopify-analytics', () => import('./shopify-analytics.js')],
  ['shopify-orders', () => import('./shopify-orders.js')],
  // Contacts before broadcasts: a broadcast recipient whose number is not yet a contact gets
  // a minimal record created for it, and a full one is better than a sparse one.
  ['wati-contacts', () => import('./wati-contacts.js')],
  ['wati-broadcasts', () => import('./wati-broadcasts.js')],
];

/**
 * A compact picture of what is now in the database, printed at the end of every run.
 *
 * Without this, reading a run means inferring state from row counts in the log — and a
 * count of 0 is ambiguous: it can mean "nothing new, correctly" or "quietly broken". The
 * summary shows what is actually stored and how far back it goes, so the difference is
 * visible without anyone flipping a variable to run a separate job.
 */
async function summarise(pool) {
  const { rows: [c] } = await pool.query(`
    select (select count(*) from shopify_daily)          as shopify_days,
           (select count(*) from orders)                 as orders,
           (select count(*) from wa_contacts)            as wa_contacts,
           (select count(*) from wa_broadcasts)          as wa_broadcasts,
           (select count(*) from wa_messages)            as wa_messages,
           (select count(*) from consent_events)         as consent_events,
           (select count(*) from consent_events where event = 'opt_in')  as consent_in,
           (select count(*) from consent_events where event = 'opt_out') as consent_out
  `);

  // Dubai/Muscat time: both UTC+4. A UTC cast shows the wrong calendar day after 20:00 local.
  const { rows: [r] } = await pool.query(`
    select to_char(min(started_at) at time zone 'Asia/Dubai', 'YYYY-MM-DD') as bc_first,
           to_char(max(started_at) at time zone 'Asia/Dubai', 'YYYY-MM-DD') as bc_last
      from wa_broadcasts
  `);
  const { rows: [m] } = await pool.query(`
    select to_char(min(sent_at) at time zone 'Asia/Dubai', 'YYYY-MM-DD') as first,
           to_char(max(sent_at) at time zone 'Asia/Dubai', 'YYYY-MM-DD') as last,
           count(*) filter (where delivered_at is not null) as delivered,
           count(*) filter (where read_at is not null)      as read
      from wa_messages
  `);

  console.log('\n=== database now ===');
  console.log(`  shopify_daily     ${String(c.shopify_days).padStart(7)} days`);
  console.log(`  orders            ${String(c.orders).padStart(7)}`);
  console.log(`  wa_contacts       ${String(c.wa_contacts).padStart(7)}`);
  console.log(`  wa_broadcasts     ${String(c.wa_broadcasts).padStart(7)}   ${r.bc_first ?? '-'} .. ${r.bc_last ?? '-'}`);
  console.log(`  wa_messages       ${String(c.wa_messages).padStart(7)}   ${m.first ?? '-'} .. ${m.last ?? '-'}`);
  console.log(`      delivered     ${String(m.delivered).padStart(7)}`);
  console.log(`      read          ${String(m.read).padStart(7)}   (Meta fills this; 0 until the webhook exists)`);
  console.log(`  consent_events    ${String(c.consent_events).padStart(7)}   ${c.consent_in} opt-in, ${c.consent_out} opt-out`);
}

export default async function nightly(ctx) {
  const failures = [];
  let rows = 0;

  for (const [name, load] of SOURCES) {
    console.log(`\n--- ${name} ---`);
    try {
      const { default: job } = await load();
      // Its own ingest_runs row, not a share of this one.
      await withIngestRun(name, async (sub) => {
        const result = await job(sub);
        rows += sub.rowsWritten;
        return result;
      }, ctx.args);
    } catch (err) {
      failures.push(`${name}: ${err.message}`);
      console.error(`  ${name} failed — continuing with the remaining sources`);
    }
  }

  ctx.rowsWritten = rows;

  // Always summarise, including after failures — the state after a partial run is exactly
  // when it matters most.
  try {
    const { db } = await import('../lib/db.js');
    await summarise(db());
  } catch (err) {
    console.error(`  summary unavailable: ${err.message.split('\n')[0]}`);
  }

  if (failures.length) {
    throw new Error(`${failures.length} of ${SOURCES.length} sources failed:\n  ${failures.join('\n  ')}`);
  }
  return { sources: SOURCES.length, rows };
}
