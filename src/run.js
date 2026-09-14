#!/usr/bin/env node
import { withIngestRun } from './lib/ingest-run.js';
import { closeDb } from './lib/db.js';

const JOBS = {
  healthcheck: () => import('./jobs/healthcheck.js'),
  status: () => import('./jobs/status.js'),
  'shopify-analytics': () => import('./jobs/shopify-analytics.js'),
  'shopify-orders': () => import('./jobs/shopify-orders.js'),
  'wati-probe': () => import('./jobs/wati-probe.js'),
  'wati-contacts': () => import('./jobs/wati-contacts.js'),
  'wati-broadcasts': () => import('./jobs/wati-broadcasts.js'),
  'wati-backfill': () => import('./jobs/wati-backfill.js'),
  nightly: () => import('./jobs/nightly.js'),
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

// The job comes from the command line locally, and from the JOB variable on Railway — so
// switching what the deployed service runs is a variable change in the dashboard, not a
// code edit and redeploy.
const name = process.argv[2] || process.env.JOB || 'healthcheck';

if (!JOBS[name]) {
  console.error(
    `unknown job: ${name}\n\n` +
    `usage: node src/run.js <job> [--since YYYY-MM-DD]\n` +
    `   or: JOB=<job> node src/run.js\n\n` +
    `jobs: ${Object.keys(JOBS).join(', ')}`
  );
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
