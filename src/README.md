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
| `status` | Postgres only | nothing | `DATABASE_URL` |
| `shopify-analytics` | ShopifyQL | `shopify_daily`, `shopify_referrer_daily` | + `SHOPIFY_SHOP`, `SHOPIFY_ADMIN_TOKEN` |
| `shopify-orders` | Admin GraphQL | `orders` | + `SHOPIFY_SHOP`, `SHOPIFY_ADMIN_TOKEN` |
| `nightly` | every source above | all of the above | all of the above |

**Which job the deployed service runs is the `JOB` variable, not the start command.** The
start command is `node src/run.js` with no argument; it takes the job name from `JOB`, and
falls back to `healthcheck`. So switching the service from a healthcheck to a real capture
run is a variable change in the Railway dashboard — no code edit, no redeploy of a changed
file. On the command line the argument still wins: `node src/run.js shopify-orders --since 2023-05-01`.

`nightly` runs every source in one container — Railway bills per second and each job takes
seconds, so the spin-up dominates. A failing source does not stop the others: if Wati's
token expires, Shopify is still captured tonight and the failure is a row in `ingest_runs`
rather than a silence. Each source gets its own row. The container still exits non-zero if
anything failed, so the deploy goes red.

`status` prints run history, `store_state` and row counts. It exists so questions about the
database get answered from the database rather than from reading Railway's log pane, which
interleaves container lifecycle lines and can make one clean run look like a restart loop.

Both Shopify jobs re-pull a trailing window by default and upsert, so running them twice is
repair, not duplication. `--since YYYY-MM-DD` forces a wider window; `--since 2023-05-01`
rebuilds the whole history.

### The Shopify token is write-capable, and the client refuses to use it that way

The token comes from an existing full-permission app shared with another program. Shopify
will execute a mutation this code sends by mistake, against the live store, with no undo.
So `src/lib/shopify.js` inspects every operation before sending and throws on a `mutation`
or `subscription` — scopes are not the safety net here, the client is. A write, if one is
ever genuinely needed, belongs in a separate and deliberate code path.

`healthcheck` is deliberately first and deliberately useless: it proves Railway can reach
Supabase, the migration is applied and a job can write a row, using **no external
credentials**. If it fails, the problem is the connection or the configuration — not a data
source. Everything after it inherits a proven loop.

## Deploying to Railway

The service is a **one-shot job**, not a web service. `railway.json` sets
`restartPolicyType: NEVER`, so the container runs the start command once, exits, and is not
restarted into a crash loop when it succeeds.

1. New service in the Railway project → **GitHub repo** → `thechefwashere/tcgsouq-social`.
2. Variables: a project shared variable is not inherited automatically. On the service's
   **Variables** tab click **Shared Variable** and pick `DATABASE_URL` (equivalently, add
   `DATABASE_URL=${{shared.DATABASE_URL}}`). Nothing else is needed for `healthcheck`.
3. Deploy. The build is Nixpacks from `package.json`; `package-lock.json` is committed so
   `npm ci` is reproducible.
4. Read the deploy logs. A healthy run prints the database name, server version, session
   timezone and the row counts, then `[healthcheck] ok — 0 rows in Xs`.

Once a real ingest job exists, set a **cron schedule** on its service in the Railway
dashboard (Settings → Cron Schedule, UTC). Dubai is UTC+4, so 03:00 Dubai is `0 23 * * *`.

## Connecting to Supabase

`DATABASE_URL` is the **Session pooler** string: Supabase project page → **Connect** button
at the top → **Session pooler**, port 5432. Not Settings → Database; it is not there.

**Not the Direct connection.** Supabase offers three strings and only the poolers work from
Railway:

| String | Host | IP |
|---|---|---|
| Direct | `db.<ref>.supabase.co:5432` | **IPv6 only** unless the project buys the IPv4 add-on |
| Session pooler | `aws-N-<region>.pooler.supabase.com:5432` | IPv4 on every plan, full Postgres |
| Transaction pooler | `aws-N-<region>.pooler.supabase.com:6543` | IPv4, but no prepared statements and no session state between transactions |

Railway containers have no IPv6 egress, so the Direct string fails with `ENETUNREACH` — an
error naming neither Supabase nor IPv6, which reads like a Railway outage. It cost one
deploy on 14 Sep 2026. `src/lib/db.js` now refuses that host outright with an error that
says what to use instead, and warns on `:6543` rather than letting bulk upserts quietly run
without session state.

Note the pooler username is `postgres.<project-ref>`, not `postgres`. Copy the whole string
from the Connect dialog rather than editing the old one.

The pool sets `ssl.rejectUnauthorized = false`. The connection is still encrypted; the
certificate is not verified, because Supabase's CA is not in the container's trust store.
The host is pinned by the URL. Revisit if this ever connects to a database we do not own.

## Adding a job

1. `src/jobs/<name>.js` with `export default async function (ctx) { ... }`.
2. Set `ctx.rowsWritten` as it goes, and `ctx.cursor` if the source is incremental — both are
   persisted to `ingest_runs` on success *and* on failure.
3. Register it in the `JOBS` map in `src/run.js`.
4. Upsert on the natural key. Re-running a job must repair, never duplicate.
