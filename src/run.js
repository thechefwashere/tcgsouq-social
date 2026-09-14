#!/usr/bin/env node
import { withIngestRun } from './lib/ingest-run.js';
import { closeDb } from './lib/db.js';

const JOBS = {
  healthcheck: () => import('./jobs/healthcheck.js'),
};

const name = process.argv[2];

if (!name || !JOBS[name]) {
  console.error(`usage: node src/run.js <job>\n\njobs: ${Object.keys(JOBS).join(', ')}`);
  process.exit(2);
}

try {
  const { default: job } = await JOBS[name]();
  await withIngestRun(name, job);
  await closeDb();
  process.exit(0);
} catch (err) {
  console.error(err);
  await closeDb().catch(() => {});
  // Non-zero so Railway marks the run failed rather than silently succeeding.
  process.exit(1);
}
