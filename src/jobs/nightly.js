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

  if (failures.length) {
    throw new Error(`${failures.length} of ${SOURCES.length} sources failed:\n  ${failures.join('\n  ')}`);
  }
  return { sources: SOURCES.length, rows };
}
