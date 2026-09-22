# Ops hub — spec

The operational half of `hub.tcgsouq.com`: what exists, whether it is running, what it is
connected to, what happened to it, and when. Agreed with the owner 19 Sep 2026.

It is deliberately **not** a metrics warehouse. See §2 — that was asked for and then cut,
and the reasoning is worth keeping so nobody quietly rebuilds it.

Companion documents: `docs/domain/CHARTER.md` (the two-domain decision, rules R1–R10, the
decision register), `docs/domain/README.md` (host map and live state).

## 1. What it is

One app, one login, five things:

> **Projects** → their **connections** → the **health** of each connection → their **logs**
> → a **timeline** of what happened and when.

Parts 1 and 2 of the original ask were never really separate. "Is the Shopify token still
valid" is both a connection fact and a project-status fact, and the social build already
needs per-connector health checks for its own scheduling (a real read call, token expiry,
permissions; red blocks scheduling). The ops views are largely a UI over something the build
requires anyway.

## 2. Why the business-metrics dashboard was cut

The original part 3 was a unified, filterable view of Shopify, Meta, Google Ads and the
accounts. It was dropped on 19 Sep, and not for effort alone:

- **Four tools already report on themselves**, and the finance repo's entire purpose is to
  produce the books in Sheets. A worse Shopify Analytics is not worth two months.
- **It was the only gated part.** Google Ads needs a developer token with a real approval
  lead time; Meta insights need the app. Cutting it takes every external approval off the
  critical path — nothing in this spec waits on anyone.

**What was kept instead, and why it is the valuable half.** No platform can tell you *the
shop was password-locked from 17 July to 7 September*, or *advertising was switched off in
December*. Numbers without that context have already produced wrong conclusions here:
`BASELINE-2026-09-14.md` records three readings of this store's data, of which two were
wrong — a "collapse in reach" that was a seven-week closure, and a "summer trough" that a
previous August disproved. Both errors came from metrics with no events beside them.

So the timeline is not decoration. It is the part that makes every number — read anywhere —
interpretable. And it is a table and a form, needing no API access at all.

If a figure is wanted on a screen later, the cheap version is a link out to the platform or
one hand-refreshed number. Not a pipeline.

## 3. Data model

**Built on the capture layer, not beside it.** `db/migrations/0001_capture_layer.sql` already
provides more of this than the first draft of this spec assumed, and its modelling is better
in places. What already exists, and must not be duplicated:

| Already there | Does |
|---|---|
| `connections` | Credential **pointers** — `secret_ref`, `scopes`, `expires_at`, `last_ok_at`, `last_error`, `status`. The registry rule of §6 is already enforced in its design: *"Secrets are never stored here."* |
| `accounts` | One row per connected account. A second Instagram is a row, not a schema change |
| `store_state` | Open / password / maintenance / partial-stockout as a `tstzrange`, with a GiST exclusion constraint so two states cannot overlap. **The Jul–Sep closure is already seeded**, with the honest note that the exact open days were never recorded |
| `shopify_daily_trading` | A view that removes closed periods from `shopify_daily`. The BASELINE lesson enforced as a view rather than left to discipline |
| `ingest_runs` | Per-job history: running / ok / partial / failed, rows written, error. Health over time, not just a current flag |

So `connection_checks` from the first draft is unnecessary — `connections.status` plus
`ingest_runs` already cover current state and history respectively. And the timeline does not
need its own store-state rows; it reads `store_state`.

**What is genuinely missing**, and is all `0002_ops_hub.sql` adds:

| Table | Holds | Why it does not exist yet |
|---|---|---|
| `projects` | slug, name, kind, status (`live`/`building`/`scoping`/`dormant`/`retired`), repo, url, summary, `blocked_on` | Nothing models the projects themselves — the capture layer models *accounts and data*, not the things being built |
| `project_connections` | project ↔ `connections` / `accounts`, `intended_access` | The map, and the basis for drift detection |
| `events` | `during tstzrange`, kind (`milestone`/`launch`/`incident`/`decision`/`planned`), title, detail, project | `store_state` covers one kind of interval. Milestones, launches and planned work have nowhere to live |
| `deviations` | rule (e.g. `D7`), what, why, mitigations, fix, opened_at, closed_at | Makes a recorded deviation queryable rather than prose-only. There is already one |
| `session_log` | session_id, at, project, kind, summary, refs | What a session did, so the next one does not have to re-read a transcript |
| `timeline` (view) | `events` ∪ `store_state`, one shape | So the store-state series appears in the timeline without being copied into it |

Following the capture layer's conventions throughout: every instant `timestamptz`, intervals
as `tstzrange`, natural keys so a re-run repairs rather than duplicates, and no secret values.

**One trap the UI must not walk into, found by actually running the seed.** The owner is
UTC+4 and the database is not. The closure stored as starting `2026-07-17 00:00+04` renders
as **16 July** to anything reading it in UTC — every date a day early, silently, and on the
one series whose dates carry the most meaning. The timeline must convert to `Asia/Dubai` for
display. `db/tests/0002_ops_hub_test.sql` asserts this so a regression fails the build
rather than quietly shifting history.

## 4. Views

Mobile first — the owner checks this on a phone at least as often as a desktop.

- **Projects** — one card each: status, live or not, connection health rolled up to a single
  colour, last session activity. The answer to "what is going on" in one screen.
- **Project detail** — links (repo, deploy, docs), its connections with health, recent
  session log, its events.
- **Connections** — grouped by platform: health, age since rotation, which projects use it,
  and any open deviation flagged against it.
- **Timeline** — the annotated history, filter by kind and project, planned items included
  with rough dates. Horizontal on desktop, vertical list on a phone.

## 5. How Claude sessions use it

Sessions read and write the **database**, not the UI, via the shared Supabase project. A
helper in `scripts/` — the same shape as `dns_verify.py`, stdlib only, no credentials in the
repo — exposes `status`, `log`, `event add`, `connection check`.

**The division of labour with the repo docs matters, and is the point:**

| | Holds | Changes |
|---|---|---|
| `docs/` — charter, README, runbooks | Decisions, rules, why things are as they are | Rarely, by PR, with reasoning |
| Ops hub DB | What is running, what broke, what a session did, what happened when | Constantly, without a PR |

This fixes something that actually happened while the domain work was being done: the docs
went stale twice within hours, because live state was being recorded in a place designed for
slow-moving truth. Fast state belongs in a table.

**Convention:** a session that changes something writes one `session_log` row before it ends.
Not a transcript — what changed, and where to look.

## 6. Credential rules

The hard rule, from charter §3b (D7): **the hub holds the map, never the keys.**

A dashboard holding secrets that a Claude session can read is a dashboard one prompt
injection away from leaking them — anything reaching a session's context (a PR comment, a
webhook payload, a supplier email) could steer it into fetching and exposing them. That risk
does not exist if the values are not there.

So `connections` records what exists, its scopes, which project consumes it, where the
runtime copy lives, which password-manager entry holds the human copy, and when it was last
rotated. The secret itself stays in the service environment (Railway sealed variables,
Vercel env, GitHub Actions secrets) and in the owner's password manager.

**Permission toggling is explicitly out of scope.** Platform permissions live in each
platform's console, and a dashboard able to change them would need admin credentials to every
platform — the worst possible concentration of risk. The hub records *intended* access and
flags drift instead.

**Drift is not hypothetical — there is already one, and it is the proof this table earns its
place.** Charter §3b records that since 14 Sep the hub's capture layer authenticates to
Shopify with the **Finance Extract** token, the same one in the bookkeeping spreadsheet,
which is exactly the arrangement D7 argues against. It was chosen deliberately with the owner
because Shopify no longer permits new admin-created custom apps and the alternative was
blocking the build. The costs apply regardless: the hub holds finance-shaped scopes it does
not need, and rotating that token to protect the spreadsheet would silently stop the nightly
capture. The `deviations` table exists so this stays visible until a Dev Dashboard app for
the hub closes it.

Related, and now settled: the store carries **three** distinct admin-created apps — Finance
Extract, OTO and PokeSouq FairDrop — with distinct Shopify app ids and therefore distinct
tokens. Rotating one cannot break another.

## 7. Auth and hosting

- **`hub.tcgsouq.com`**, Railway, per the host map. Charter R1.
- **Supabase Auth**, email one-time code, a single allow-listed address — already specified
  in the social hub plan, so this is not new work, only work landing earlier.
- **Not Cloudflare Access**, although it is free and would need no auth code: it requires the
  zone to be served by Cloudflare, and D1 puts DNS on Porkbun. The owner declined moving the
  domain a second time, particularly with live mail on it. D1 stands.

## 8. Build order

Cheapest and most useful first; nothing here waits on an external approval.

1. `ops` schema, auth shell, projects list — seeded by hand.
2. **Timeline.** Highest value per hour of work, and it needs an interview, not an integration.
3. Connections registry, seeded from `ACCESS-MAP.md`.
4. Health checks — reuse the per-connector checks the social build needs anyway.
5. `session_log` plus the helper script, so sessions start recording state.
6. *Optional, later:* link-outs or single hand-refreshed figures. Not a pipeline.

## 9. Seeding is transcription, not discovery

Most of the initial data already exists in this family:

- **Connections** — `docs/social-hub/ACCESS-MAP.md` enumerates most of them, including the
  three Shopify apps, the Supabase projects, Railway, Vercel, the Cloud project and the
  Actions secrets.
- **Store-state events** — `BASELINE-2026-09-14.md` has the closure dates.
- **Projects and decisions** — the charter and the per-repo `docs/DOMAIN.md` files.

## 10. Open questions

- **The milestone dates** — first Korean product, first 100k, profitability, when ads were
  switched off. Some may exist in Shopify; the rest are in the owner's head. This is an
  interview, and it should happen before the timeline is built rather than after.
- **Store open/closed could be detected rather than typed.** Shopify exposes whether the
  storefront is password-protected; sampling it daily would make the most valuable series in
  the table self-maintaining. Worth a look, not a blocker.
