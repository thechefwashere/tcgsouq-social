# tcgsouq.com — the domain, and what each repo needs from it

Canonical record for the domain that every repo in this family is named after. It exists
because `tcgsouq.com` is not a website to put up: it is the identity the business migrates
onto between now and the planned 2028 rebrand, and the order in which pieces land on it
determines how much of that migration hurts.

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
| Nameservers | **`NS1/NS2.DOMAIN.COM`** — still Domain.com | `NS1/NS2.DOMAIN.COM` |
| Apex A | `208.91.197.27` (Domain.com parking) | `23.227.38.65` (Shopify) |
| MX / TXT | none | Shopify `www` CNAME → `shops.myshopify.com` |

Two things follow, and they are the whole of the near-term plan:

**The registrar moved; the DNS did not.** Porkbun is the registrar of record, but the zone is
still answered by Domain.com's nameservers, so nothing can be added to `tcgsouq.com` from the
Porkbun dashboard or its API until the delegation is switched. This is one screen, five
minutes, and it is the prerequisite for everything else here — see `RUNBOOK.md` step 1.

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

## 3. Open decisions

Recommendations, not changes. Nothing in this section has been done.

**D1 — DNS host: Porkbun's own nameservers.** Free, supports `ALIAS` at the apex, has dated
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

**D3 — Email.** Three options, and they are mutually exclusive at the MX record:
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
social build (the Play Console account owns the Cloud project instead), so this is not
blocking anyone. But it is the backbone of the rebrand plan and it is cheap now that the DNS
is ours. *Recommend Workspace when the owner is ready to spend; forwarding as the free
interim — not both, since Workspace replaces the MX.*

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

## 4. Anti-spoofing, before anything else

The two records marked `ready` in the manifest can go in the minute the delegation lands, and
should:

```
@        TXT   v=spf1 -all
_dmarc   TXT   v=DMARC1; p=reject; adkim=s; aspf=s
```

A domain with no SPF and no DMARC is a free brand to forge, and a new domain attached to a
shop is a natural target. `-all` and `p=reject` are safe *because* nothing legitimate sends as
`tcgsouq.com` yet — there is nothing to break. Both get rewritten the day mail arrives (§3 D3),
and the manifest carries that instruction on the record itself.

One correctness detail the manifest also records: a DMARC `rua=` address on a *different*
domain only works if that domain publishes an authorisation record
(`tcgsouq.com._report._dmarc.gmail.com`, RFC 7489 §7.1). We cannot publish records on
`gmail.com`, so reports must go to an address **on tcgsouq.com** — which means `rua` waits
for D3, and is deliberately absent until then rather than pointing somewhere that silently
discards reports.

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

1. Switch the nameservers to Porkbun; wait for propagation; `dns_verify.py` goes green on
   delegation. **Nothing else can start before this.**
2. Publish SPF + DMARC (`dns_sync.py --apply`).
3. Decide D3, D5 — both are minutes of dashboard work once decided.
4. `codex.tcgsouq.com` — the one service that exists today and can be moved onto the domain
   immediately (add in Vercel first, then the CNAME).
5. `hub.` / `inbox.` / `go.` as the Railway services come up, per the social and WhatsApp build.
6. Separately, and on its own clock: transfer `pokesouq.com` to Porkbun before 1 Nov 2026.

## 7. What this doc deliberately does not do

No DNS record has been created, no nameserver changed, no account touched. Everything above is
a plan plus the tooling to execute it; the registrar work needs the owner's login, and the
owner's standing preference is to align before anything visible or structural changes.
