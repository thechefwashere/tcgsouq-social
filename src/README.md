# Ingest service

One container, many jobs. `node src/run.js <job>` runs exactly one job and exits — there is
no long-running server, because a 24/7 container on Railway bills per second whether or not
it is doing anything, and every job here is a scheduled pull.

```
src/run.js            dispatcher — maps a job name to a module, sets the exit code
src/lib/db.js         one pg Pool from DATABASE_URL
src/lib/ingest-run.js wraps a job in an ingest_runs row: running -> ok | partial | failed
src/jobs/             one module per job
```

## Why every job writes to `ingest_runs`

A source that breaks looks exactly like a source that is quiet — both produce no new rows.
`ingest_runs` is the difference: a source with no recent `ok` row is broken, full stop. This
is the specific failure mode found in FairDrop, where errors were swallowed and turned into
plausible-looking data.

A job that dies mid-way still leaves a `partial` row with the stack trace and the number of
rows it managed to write, because the wrapper persists the failure before rethrowing.

## Jobs

| Job | Reads | Writes | Credentials |
|---|---|---|---|
| `healthcheck` | Postgres only | nothing (its own `ingest_runs` row) | `DATABASE_URL` |

`healthcheck` is deliberately first and deliberately useless: it proves Railway can reach
Supabase, the migration is applied and a job can write a row, using **no external
credentials**. If it fails, the problem is the connection or the configuration — not a data
source. Everything after it inherits a proven loop.

## Deploying to Railway

The service is a **one-shot job**, not a web service. `railway.json` sets
`restartPolicyType: NEVER`, so the container runs the start command once, exits, and is not
restarted into a crash loop when it succeeds.

1. New service in the Railway project → **GitHub repo** → `thechefwashere/tcgsouq-social`.
2. Variables: `DATABASE_URL` is already a shared variable on the project; reference it on the
   service. Nothing else is needed for `healthcheck`.
3. Deploy. The build is Nixpacks from `package.json`; `package-lock.json` is committed so
   `npm ci` is reproducible.
4. Read the deploy logs. A healthy run prints the database name, server version, session
   timezone and the row counts, then `[healthcheck] ok — 0 rows in Xs`.

Once a real ingest job exists, set a **cron schedule** on its service in the Railway
dashboard (Settings → Cron Schedule, UTC). Dubai is UTC+4, so 03:00 Dubai is `0 23 * * *`.

## Connecting to Supabase

`DATABASE_URL` comes from the Supabase project page → **Connect** button at the top → **Direct
connection**, port 5432. Not from Settings → Database; it is not there.

The pool sets `ssl.rejectUnauthorized = false`. The connection is still encrypted; the
certificate is not verified, because Supabase's CA is not in the container's trust store.
The host is pinned by the URL. Revisit if this ever connects to a database we do not own.

## Adding a job

1. `src/jobs/<name>.js` with `export default async function (ctx) { ... }`.
2. Set `ctx.rowsWritten` as it goes, and `ctx.cursor` if the source is incremental — both are
   persisted to `ingest_runs` on success *and* on failure.
3. Register it in the `JOBS` map in `src/run.js`.
4. Upsert on the natural key. Re-running a job must repair, never duplicate.
