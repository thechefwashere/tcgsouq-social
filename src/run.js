#!/usr/bin/env node
import { withIngestRun } from './lib/ingest-run.js';
import { closeDb } from './lib/db.js';

const JOBS = {
  healthcheck: () => import('./jobs/healthcheck.js'),
  status: () => import('./jobs/status.js'),
  'shopify-analytics': () => import('./jobs/shopify-analytics.js'),
  'shopify-orders': () => import('./jobs/shopify-orders.js'),
};

/** `--since 2023-05-01 --until 2026-09-14` -> { since: '...', until: '...' } */
function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) continue;
    const key = argv[i].slice(2);
    const value = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : 'true';
    args[key] = value;
  }
  return args;
}

const name = process.argv[2];

if (!name || !JOBS[name]) {
  console.error(`usage: node src/run.js <job>\n\njobs: ${Object.keys(JOBS).join(', ')}`);
  process.exit(2);
}

try {
  const { default: job } = await JOBS[name]();
  await withIngestRun(name, job, parseArgs(process.argv.slice(3)));
  await closeDb();
  process.exit(0);
} catch (err) {
  console.error(err);
  await closeDb().catch(() => {});
  // Non-zero so Railway marks the run failed rather than silently succeeding.
  process.exit(1);
}
