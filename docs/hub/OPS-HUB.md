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

Lives in the shared Supabase project, in an `ops` schema alongside `shared` and `social`.

| Table | Holds | Notes |
|---|---|---|
| `projects` | id, slug, name, kind (`app`/`service`/`store`/`data`/`integration`), status (`live`/`building`/`dormant`/`retired`), repo, url, summary | The nine-ish things: PokeSouq store, FairDrop, PackProof, Codex, curation, social hub, WhatsApp, finance, the domain itself |
| `connections` | id, platform, label, scopes[], `secret_location` (which environment holds the runtime copy), `vault_ref` (the password-manager entry name), `rotate_url`, issued_at, expires_at, notes | **Never a secret value.** See §6 |
| `project_connections` | project ↔ connection, `intended_access` (`read`/`write`), note | The map, and the basis for drift detection |
| `connection_checks` | connection_id, checked_at, ok, detail, latency_ms | Health history, not just current state |
| `events` | occurred_at, ended_at (nullable), kind (`milestone`/`store_state`/`launch`/`incident`/`decision`/`planned`), title, detail, project_id (nullable), source | The timeline. `ended_at` exists so "locked 17 Jul – 7 Sep" is one row, not two |
| `session_log` | session_id, at, project_id, kind (`change`/`finding`/`decision`/`deferral`), summary, refs[] | Written by Claude sessions. See §5 |
| `deviations` | connection_id or project_id, rule (e.g. `D7`), what, why, mitigations, fix, opened_at, closed_at | §6 — there is already one |

Two design rules worth stating:

- **`events` carries ranges, not just points.** The store-state series is the single most
  valuable thing in the table and it is made of intervals.
- **`connection_checks` is append-only.** A source that breaks looks exactly like a source
  that is quiet; only a history of successful checks distinguishes them. This is the same
  reasoning as `ingest_runs` in the capture layer, and it should reuse that pattern.

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
