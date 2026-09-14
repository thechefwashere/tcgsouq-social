import { withIngestRun } from '../lib/ingest-run.js';

/**
 * Forces a FULL Wati pull, from the configured history start rather than the trailing
 * window the nightly run uses.
 *
 * It exists because of a deadline, not a feature: Wati permanently deletes everything 90
 * days after an account is cancelled. The nightly job is incremental by design and would
 * never reach back to 2023 on its own, so "have we actually got the whole history" must be
 * answerable by running one thing rather than by reasoning about windows.
 *
 * Safe to run repeatedly. Every write upserts on a natural key, so a second run repairs
 * rather than duplicates — it is slow, not dangerous.
 */
const START = process.env.WATI_HISTORY_START || '2023-01-01';

const SOURCES = [
  ['wati-contacts', () => import('./wati-contacts.js')],
  ['wati-broadcasts', () => import('./wati-broadcasts.js')],
];

export default async function watiBackfill(ctx) {
  console.log(`  full backfill from ${START} — this is slow by design (Wati rate limits)`);

  const failures = [];
  let rows = 0;

  for (const [name, load] of SOURCES) {
    console.log(`\n--- ${name} (full) ---`);
    try {
      const { default: job } = await load();
      await withIngestRun(`${name}-backfill`, async (sub) => {
        const result = await job(sub);
        rows += sub.rowsWritten;
        return result;
      }, { ...ctx.args, since: ctx.args.since || START });
    } catch (err) {
      failures.push(`${name}: ${err.message}`);
      console.error(`  ${name} failed — continuing`);
    }
  }

  ctx.rowsWritten = rows;
  if (failures.length) {
    throw new Error(`${failures.length} of ${SOURCES.length} failed:\n  ${failures.join('\n  ')}`);
  }
  return { rows };
}
