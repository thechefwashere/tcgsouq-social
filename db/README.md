# Capture layer

Starts archiving now, before the publishing tool exists. Three things are perishable and are the
whole reason this runs early:

1. **WhatsApp delivered/read receipts** — the basis of the only causal inference available here.
2. **Instagram Story insights** — 24 hours and gone.
3. **Store open/closed state** — nothing records it, and its absence already produced one wrong
   reading of the store's own numbers (`tcgsouq-shopify/docs/social-hub/BASELINE-2026-09-14.md`).

Everything else — Instagram media insights at ~2 years, Shopify's own reporting — could wait. These
cannot.

## Setting up Supabase

Owner does this once; nothing here can create the project.

1. **New project** at supabase.com. Region **Frankfurt (eu-central-1)** — closest to UAE of the EU
   regions and where the alignment doc already assumed the data would sit.
2. **Pro plan ($25/mo).** Free pauses after 7 days of inactivity, which would silently stop every
   capture job. That was decided on 11 Sep and holds.
3. **Point-in-time recovery** is a paid add-on and is *not* included in Pro. Do not assume backups
   exist. See "Backups" below.
4. Save the **database connection string** and the **service-role key** somewhere durable — a
   password manager, not a chat. The service-role key bypasses row-level security.

Then apply the migration:

```
psql "$SUPABASE_DB_URL" -f db/migrations/0001_capture_layer.sql
```

## Design rules, all deliberate

**Every instant is `timestamptz`.** The operator is UTC+4, the infrastructure is in Europe, Meta
reports in the account's timezone and Shopify in the store's. A wall-clock string in this schema
would be a bug waiting for a drop night.

**Metrics are snapshots, not facts.** A post's reach grows for days after publishing. `post_metrics`
keeps the series with `captured_at` rather than overwriting a single row, so "how fast did it grow"
remains answerable.

**Secrets are never stored here.** `connections.secret_ref` is a pointer — `env:IG_TOKEN`,
`vault:wati/readonly` — and the value lives in the host environment.

**Upserts key on natural keys.** Re-running a job repairs rather than duplicates.

**`consent_events` is append-only.** Never updated, never deleted. It is a legal artefact under UAE
data-protection law, and today those records exist in Wati alone with no export tooling anywhere.

**Read `shopify_daily_trading`, not `shopify_daily`.** The view excludes closed periods. Averaging
through a seven-week shutdown is exactly the mistake this schema exists to prevent.

## The inference this is built for

WhatsApp is identity-linked in a way Instagram never will be. A broadcast goes to a phone number,
the provider reports sent / delivered / read against that number, and orders carry the same identity
via `identity_links`.

That allows a matched-cohort comparison rather than click attribution:

- purchase rate among recipients in a window after delivery,
- against those same customers' own baseline rate,
- against non-recipients over the same period.

And the sharpest instrument available anywhere in this project: **read versus delivered-unread within
a single broadcast**. Same list, same message, same moment — one group opened it and one did not.

`wa_messages` exists to make that query possible. It needs message-level data; Wati's reporting
screens will not provide it.

## Backups

Supabase PITR is a paid add-on, not part of Pro. This database holds post history, the asset
library's index and — in time — consent records. A nightly `pg_dump` to Storage plus a monthly
restore drill is an afternoon's work and is not optional once consent data lands here.

## What is deliberately absent

No publishing tables yet — `posts`, `renditions`, `schedule`, `publish_attempts`. Those belong with
the publishing path in December and will need idempotency keys per `(post, account)` and per-target
status rows, per the audit. Adding them later costs nothing; the capture layer does not depend on
them.
