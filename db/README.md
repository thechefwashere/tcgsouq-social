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

`wa_messages` exists to make that query possible. But **where the timestamps come from matters, and
it is not Wati.**

### Read receipts come from Meta, not Wati — checked 14 Sep 2026

Against the snapshot in `docs/platform/wati/`:

| Wati gives | Wati does **not** give |
|---|---|
| Campaign aggregates: `total_sent`, `total_delivered`, `total_failed`, `total_stopped` | Per-recipient **read receipts with timestamps** |
| Per-recipient **delivery** status (`/broadcasts/{id}/recipients` — `contact_phone`, `status`, `message_id`) | — |
| Contacts, conversation messages, templates, credit balance | — |

Two traps in the aggregates. `total_open` is documented as **"the total number of open links"** — link
clicks, not message reads. `total_replied` is likewise "replied links". Neither is a WhatsApp read
receipt. And the per-recipient `status` is an untyped nullable string with no documented enum, so
whether `read` is ever a value cannot be established from the docs.

**Read receipts come from the WABA webhook at Meta**, which reports `sent` / `delivered` / `read`
per message against the phone number. The store owns the WABA, so this arrives through the store's
own Meta app — and it keeps working after Wati is cancelled, which Wati-sourced data would not.

So the division of labour is:

- **Meta WABA webhook** → `wa_messages.sent_at / delivered_at / read_at`. The inference depends on it.
- **Wati API** → the *export*: contacts and their attributes, consent records, conversation history,
  templates. Plus campaign-level analytics and credit balance until the migration completes.

### One honest caveat on the read arm

A WhatsApp user can switch read receipts off. When they do, no `read` status is ever sent, so a
genuine reader lands in the delivered-unread arm.

That does not invalidate the comparison, and it fails in the safe direction: the unread arm is
diluted with real readers, which **pulls the measured difference toward zero**. Any effect that
survives is therefore an understatement, not an exaggeration. Worth stating whenever a number from
this comparison is quoted.

## Backups

Supabase PITR is a paid add-on, not part of Pro. This database holds post history, the asset
library's index and — in time — consent records. A nightly `pg_dump` to Storage plus a monthly
restore drill is an afternoon's work and is not optional once consent data lands here.

## What is deliberately absent

No publishing tables yet — `posts`, `renditions`, `schedule`, `publish_attempts`. Those belong with
the publishing path in December and will need idempotency keys per `(post, account)` and per-target
status rows, per the audit. Adding them later costs nothing; the capture layer does not depend on
them.
