# tcgsouq.com — the domain, and what each repo needs from it

Canonical record for the domain that every repo in this family is named after. It exists
because `tcgsouq.com` is not a website to put up: it is the identity the business migrates
onto between now and the planned 2028 rebrand, and the order in which pieces land on it
determines how much of that migration hurts.

**`CHARTER.md`, next to this file, is the decision**: what the domain is for, how the two
domains divide the world, and the rules every repo follows. Read it first. This file is the
live state and the record map.

Background this doc does not repeat, in `thechefwashere/tcgsouq-shopify`
(branch `claude/later-wati-replacement-tools-l2k641`, `docs/social-hub/`):
`research/registrar-options.md` (why Porkbun), `research/migration-risk-google-apple.md`
and `research/migration-risk-commerce-saas.md` (the 2028 rename, account by account),
`ALIGNMENT-2026-09-11.md` (§4c hub topology, §7 F13/F14, decision 17).

**It lives in this repo** because the social hub owns most of the zone (`hub`, `go`, and the
platform verification records). It is not social-specific; if a dedicated infra repo appears
later, move the folder wholesale.

## 1. Verified state — 17 Sep 2026

Checked first-hand from this session, not from memory: RDAP at `rdap.verisign.com`, DNS via
DNS-over-HTTPS. Re-check any of it with `python3 scripts/dns_verify.py`.

| | `tcgsouq.com` | `pokesouq.com` |
|---|---|---|
| Registrar | **Porkbun LLC** | **Domain.com / Network Solutions** (Newfold) |
| Transferred | **2026-09-17 20:17 UTC** | not yet |
| Expires | **2036-03-27** (paid ~10 years out) | 2027-06-14 |
| Registry locks | `clientDeleteProhibited`, `clientTransferProhibited` | `clientTransferProhibited` |
| Nameservers | **Porkbun's four**, switched 20:55 UTC | `NS1/NS2.DOMAIN.COM` |
| Apex A | none — the zone came up empty | `23.227.38.65` (Shopify) |
| MX | **`smtp.google.com`** (Workspace, live 21:1x UTC) | — |
| TXT | site-verification, SPF, DMARC, DKIM — all verified live | Shopify `www` CNAME → `shops.myshopify.com` |

**The delegation and the mail layer both landed on 17 Sep**, within the hour after the
transfer. Porkbun is authoritative — proved by an NXDOMAIN probe returning an SOA from
`curitiba.ns.porkbun.com`, not merely by a resolver agreeing — and the zone came up empty,
with no default parking records to clear out. Google Workspace on `tcgsouq.com` followed the
same evening: `admin@tcgsouq.com` is the super-admin, MX is Google's current single-record
form, DKIM is confirmed 2048-bit from the DER key length, and DMARC sits at `p=none` while
reports accumulate. `dns_verify.py` reports all five records `OK` on both public resolvers.

**One thing left open on the mail side:** the DMARC `rua` points at `dmarc@tcgsouq.com`, which
needs to exist as an alias before any report can land. Until it does, the policy is valid but
nothing is being collected, and the climb to `p=reject` would be blind.

**`pokesouq.com` is still at Newfold, and there is a dated reason not to let that drift.**
Verisign raises the `.com` wholesale price on **1 November 2026**; a transfer-in adds a year
at the current rate, so moving it in the next six weeks is both the escape from Newfold and
the cheapest renewal available. The registrar research reached that conclusion for both
domains; only one of them has moved. Note the sequencing trap it documents: a transfer-in
freezes a domain for 60 days, so `tcgsouq.com` cannot move again before **~16 Nov 2026** —
irrelevant unless someone reconsiders Cloudflare Registrar.

## 2. Host map

What each name is for, which repo owns it, and what has to exist before the DNS record is
worth creating. Nothing here is live yet. The machine-readable version, which the tooling
reads, is `infra/dns/tcgsouq.com.json`.

| Host | Serves | Points at | Repo | Waiting on |
|---|---|---|---|---|
| `tcgsouq.com`, `www` | brand holding page; later the legal pages platforms ask for | 302 URL forward → `pokesouq.com` (interim) | — | decision D5 |
| `hub.tcgsouq.com` | social hub UI | Railway | `tcgsouq-social` | Railway service |
| `inbox.tcgsouq.com` | WhatsApp inbox PWA | Railway | `tcgsouq-whatsapp` | Railway service, decision D2 |
| `go.` (`pokesouq.com`?) | short-link redirector with UTM logging | Railway | `tcgsouq-social` | decision D4 |
| `codex.tcgsouq.com` | Codex curation app, today on `tcgsouq-codex.vercel.app` | Vercel `cname.vercel-dns.com` | `tcgsouq-codex` | add the domain in Vercel first |
| `api.tcgsouq.com` | PackProof backend | Railway | `packproof-backend` | not deployed — Railway trial ended |
| `admin@`, `accounts@`, `dmarc@` | identity and the finance inbox | MX | `tcgsouq-finance` | decision D3 |

Two constraints worth knowing before the map is treated as settled:

- **Railway Hobby allows 2 custom domains per service**, and a custom domain needs *both* the
  per-domain CNAME target *and* the TXT challenge Railway prints — the CNAME alone returns 404.
  Targets are per-domain; never copy one from another project.
- **Webhooks do not need their own hostname.** Meta and Shopify only require an HTTPS URL, so
  they live on paths under `hub.` — one fewer record, one fewer certificate, and it keeps the
  service inside the 2-domain budget.

## 3. Decisions

Two are now settled (17 Sep 2026, owner); the rest are recommendations. Nothing in this
section has been *executed* — no record exists yet.

**D1 — DNS host: Porkbun's own nameservers. DECIDED.** Free, supports `ALIAS` at the apex, has dated
restore points for the zone, and a clean REST API this repo already automates against
(`scripts/dns_sync.py`, verified end-to-end against Porkbun's mock server). Cloudflare buys
redirect rules, edge caching and free Email Routing at the cost of a second vendor, and
Porkbun's API can hand the zone to Cloudflare later if that changes. *Recommend Porkbun.*

**D2 — Hub topology: `hub.` and `inbox.` as separate subdomains.** ALIGNMENT decision 17 put
both tools on one host with path routing (`/` and `/chat`), which on Railway needs a proxy in
front because Railway cannot path-route across two services. Owning a whole domain removes
that need: two subdomains, one session cookie scoped to `.tcgsouq.com`, no proxy. *Caveat to
verify before building:* Supabase Auth stores its session in `localStorage` by default, which
is per-origin — sharing a login across subdomains means configuring cookie-based storage with
an explicit parent-domain scope. That is a known pattern, but it is not the default and this
session did not test it. *Recommend two subdomains, after that check.*

**D3 — Email: Google Workspace on tcgsouq.com, direct from Google. DECIDED.** The options
were mutually exclusive at the MX record, and the one chosen is the one the continuity plan
rests on:
1. *Porkbun forwarding* — free, instant, up to 20 addresses forwarded into the existing Gmail.
   Enough for `accounts@` (the finance inbox) and `dmarc@` (report address).
2. *Google Workspace on tcgsouq.com* — ~$6/user/mo, and the piece the whole 2028 continuity
   plan is built on: it creates `admin@tcgsouq.com` as a real identity that can be added as a
   backup owner on the Business Profile, Play Console, Apple, Shopify staff and Supabase
   *today*, starting the 7-day ownership clocks years before they matter. It also creates a
   Google Cloud organisation the owner is super-admin of — the thing `admin@pokesouq.com`
   cannot be, because that tenant is resold by Domain.com and enforces
   `iam.disableServiceAccountKeyCreation`.
3. *Neither* — publish a null MX and leave the domain mail-dead.

The developer-accounts decision of 13 Sep took Workspace **off the critical path** for the
social build (the Play Console account owns the Cloud project instead). It is back on the
path by choice, not by necessity: it is the backbone of the rebrand plan and it is cheap now
that the DNS is ours. **Porkbun email forwarding is therefore not used** — it would fight the
Workspace MX.

Consequence for §4 below: the stopgap SPF/DMARC pair is *not* published, because publishing
`-all` and `p=reject` and then sending real mail from Workspace means every message is
rejected until someone remembers to change them. The Workspace-shaped records go in at
signup instead. If Workspace slips more than a couple of weeks, publish the stopgap pair —
both variants are in the manifest, one edit apart.

**D4 — Short links: keep customer-facing links on `go.pokesouq.com`.** Customers know
PokeSouq; an unfamiliar domain inside a WhatsApp broadcast is a trust problem and WhatsApp
quality rating is unforgiving. The redirector can answer on both domains, so adding
`go.tcgsouq.com` at rebrand costs nothing and old links keep resolving forever — which they
must, since sent messages are permanent. *Recommend `go.pokesouq.com` now, both later*, and
mind the 2-domains-per-service limit above.

**D5 — The apex, for now: a 302 forward to `pokesouq.com`.** Free on Porkbun, no code, and the
domain stops being a Newfold parking page. A 302 rather than a 301 because this is temporary
and a 301 is cached hard by browsers. A real landing page becomes worth building when a
platform asks for a privacy-policy or data-deletion URL; the Meta app stays in development
mode against the business's own accounts, so no App Review needs one today.

## 4. Mail authentication — sequenced, not rushed

A domain with no SPF and no DMARC is a free brand to forge, so these records matter. But the
order matters more, and it is the one place in this plan where doing the safe-looking thing
first causes an outage:

- `v=spf1 -all` plus `p=reject` is exactly right for a domain that sends no mail.
- The moment Workspace sends mail, those same two records reject **every message the business
  sends**, until someone remembers to change them.

Since Workspace is the decided next step (§3 D3), the records go in **with** it, in their
Workspace shape, rather than being published now and rewritten:

```
@        TXT   v=spf1 include:_spf.google.com ~all
_dmarc   TXT   v=DMARC1; p=none; rua=mailto:dmarc@tcgsouq.com
google._domainkey  TXT  (generated in Admin console, 2048-bit)
MX             (the records Google's console shows — use those, not any value written here)
```

Then read the DMARC reports for about two weeks and climb `p=none` → `p=quarantine` →
`p=reject` once everything legitimate passes. If Workspace slips beyond a couple of weeks,
publish the stopgap `-all` / `p=reject` pair in the meantime; the manifest carries both
variants so it is one status change either way.

One correctness detail the manifest also records: a DMARC `rua=` address on a *different*
domain only works if that domain publishes an authorisation record
(`tcgsouq.com._report._dmarc.gmail.com`, RFC 7489 §7.1). We cannot publish records on
`gmail.com`, so reports go to an address **on tcgsouq.com** — which a Workspace mailbox
provides, and which is why `rua` was deliberately absent until this decision.

## 5. Tooling

```
infra/dns/tcgsouq.com.json     the zone as data: every record, its purpose, and what blocks it
scripts/dns_verify.py          what the internet actually returns vs the manifest (no credentials)
scripts/dns_sync.py            plan/apply the manifest to Porkbun (needs API keys, --apply to write)
```

`dns_verify.py` needs nothing but network and answers the question "is the zone still what we
said it is" — run it after every registrar change. `dns_sync.py` prints a plan and changes
nothing unless `--apply` is passed, only touches records marked `ready`, and never deletes
without `--prune`. **Do not `--prune` while Porkbun URL forwarding is on** (D5): forwarding
maintains its own apex records and prune would fight it. `--self-test` exercises the diff
logic with no network and no keys.

Credentials come from `PORKBUN_API_KEY` / `PORKBUN_SECRET_API_KEY` in the environment, never
from the manifest or a commit. Porkbun keys can be scoped to specific domains and source IPs;
scope them to `tcgsouq.com`.

## 6. Order of work

1. ~~Switch the nameservers to Porkbun.~~ **Done 17 Sep, 20:55 UTC.**
2. ~~Google Workspace on tcgsouq.com, direct from Google, plus its records.~~ **Done 17 Sep**,
   same evening. Remaining: create the `dmarc@` and `accounts@` aliases, send a test message
   and confirm `spf=pass` / `dkim=pass` in the headers, and around **1 Oct** read the reports
   and climb DMARC to `p=quarantine` then `p=reject`.
3. `admin@tcgsouq.com` added as a second owner/admin on the platform accounts that carry a
   7-day hold (Business Profile, Play Console, Apple, Shopify staff, Supabase). Costs nothing,
   and the clocks are then long spent.
4. `codex.tcgsouq.com` — the one service that exists today and can be moved onto the domain
   immediately (add in Vercel first, then the CNAME).
5. `hub.` / `inbox.` / `go.` as the Railway services come up, per the social and WhatsApp build.
6. Separately, and on its own clock: transfer `pokesouq.com` to Porkbun before 1 Nov 2026.

## 7. What this doc deliberately does not do

Everything executed so far was done by the owner at the registrar and in Google's console;
this repo holds the plan, the record of what is live, and the tooling that checks it. Nothing
here reaches into the store, and no customer-facing URL has changed or will without the
sign-off §3 and the charter both call for.
