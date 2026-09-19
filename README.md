# tcgsouq-social — PokeSouq Social Hub

Private web app for [PokeSouq.com](https://pokesouq.com) that replaces Later.com: create
marketing content once, adapt it per channel, review, publish or schedule, and measure the
result in Shopify Marketing.

Status: **scoping**. No application code yet. The plan, research and alignment proposal
live in `thechefwashere/tcgsouq-shopify` under `docs/social-hub/`. The sibling repo
`tcgsouq-whatsapp` owns everything WhatsApp.

## docs/domain — tcgsouq.com

`docs/domain/` is the canonical record for the domain this repo family is named after: what
is verified true about it today, which hostname serves what, the decisions still open, and
the registrar runbook. The zone itself is data in `infra/dns/tcgsouq.com.json`.

```
python3 scripts/dns_verify.py     what public DNS actually returns vs the manifest (no credentials)
python3 scripts/dns_sync.py       plan the manifest against Porkbun; --apply writes
```

The hub's own hostnames (`hub.`, `go.`) and the platform verification records live there too.

## docs/platform — the ground rules

`docs/platform/` holds a dated snapshot of the official documentation and policies of every
platform this tool publishes to or reads from: Meta (Instagram, Facebook Pages, Threads,
Graph API, policies), Google Business Profile, YouTube, TikTok, X, Canva, Judge.me and the
Shopify endpoints the hub uses. Each file carries a front matter with the source URL, the
UTC fetch time and a hash of the content, so a later re-fetch shows exactly which rules
changed and when.

```
docs/platform/manifest.json        the list of pages to snapshot
docs/platform/<platform>/INDEX.md  per-platform index with fetch dates and status
docs/platform/<platform>/<page>.md the snapshot (front matter + Markdown)
docs/platform/CHANGES.md           appended on every re-run that finds changed pages
```

Re-fetch (needs Python 3.11+):

```
pip install --user beautifulsoup4 lxml markdownify
python3 scripts/fetch_platform_docs.py --manifest docs/platform/manifest.json
```

Unchanged pages keep their original `fetched_at` and only update `last_checked_at`.
Pages marked `EMPTY` in an index are rendered in the browser and could not be captured
by a plain fetch; they are listed so nobody assumes they were checked.

Meta's `developers.facebook.com/documentation/...` pages are served as Markdown to
non-browser clients and are stored as received; all other pages are converted from HTML.
Snapshots are reference copies of third-party documents and remain the property of their
publishers.
