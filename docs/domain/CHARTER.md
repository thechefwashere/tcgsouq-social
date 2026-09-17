# TCGSouq.com — the charter

What the domain is for, how the two domains divide the world, and the rules every repo in
this family follows. Decided by the owner on **17 Sep 2026**.

This is the document the other repos point at. Next to it: `README.md` holds the live state
and the record map, `RUNBOOK.md` the registrar steps.

## 1. The decision

**Two domains, two jobs, two different clocks.**

**`pokesouq.com` — the customer's domain.** Stays exactly as it is. The storefront, the brand
customers know, every URL a customer ever sees. It moves only when the owner is ready, and
"ready" means two specific, checkable things — a solid SEO migration plan, and the trade
licence legally renamed — not a feeling and not a date. Nothing in this repo family sets that
clock, and nothing here should be built in a way that quietly starts it.

**`tcgsouq.com` — the business's domain.** The platform underneath: the Google tenant that
owns cloud, the internal tools (social hub, WhatsApp inbox, finance automation), the APIs, and
the multi-game Codex. None of it is customer-facing, so none of it carries SEO weight or brand
recognition, so all of it can move now at no cost.

**Why this order is the right one.** The invisible layer moves first; the visible layer moves
last. Identity and internal tooling can be migrated, reverted and migrated again with nobody
outside the business noticing. A storefront domain moves exactly once, in public, with every
ranking and every saved link riding on the outcome. Doing the cheap, reversible half now means
that when the expensive, irreversible half happens, it is the *only* thing happening — not
tangled up with a Workspace migration, a cloud reorganisation and four platform account
transfers.

The transition is deliberate and slow. That is the plan, not a compromise.

## 2. The identity model

One sentence: **`tcgsouq.com` holds the super-admin; `pokesouq.com` holds users.**

| Layer | Lives on | Why |
|---|---|---|
| Google Workspace tenant (super-admin) | `tcgsouq.com`, bought **direct from Google** | A tenant bought through a reseller can withhold super-admin — which is exactly the position `admin@pokesouq.com` is in today |
| Google Cloud organisation | created by that tenant | The org is bound to the Workspace domain. Owning the tenant is the only way to own the org |
| Cloud projects | inside that org | Inherited IAM, org policy and billing all follow the org |
| `admin@pokesouq.com` and other existing accounts | **IAM members / users** on the org | Granting IAM to an identity outside the org is normal and supported. Being a *user* costs nothing and breaks nothing |
| Platform accounts (Play, Apple, GBP, Shopify staff, Supabase) | add `admin@tcgsouq.com` as a **second owner/admin now** | Several carry a 7-day ownership hold. Starting those clocks years early costs nothing and removes the rebrand's worst dependency |

**What this fixes, concretely.** The books are owned by an account on a reseller-held tenant;
the Drive connector authenticates as a personal Gmail; PackProof's Cloud project had to be
created under that same personal Gmail because the pokesouq.com tenant enforces
`iam.disableServiceAccountKeyCreation` and nobody inside the business can turn it off. One
tenant the owner is super-admin of ends all three.

**Two traps to walk into deliberately rather than discover:**

- A Google Cloud organisation created after 3 May 2024 enforces
  `iam.disableServiceAccountKeyCreation` **by default**. That is the same policy that pushed
  PackProof onto a personal Gmail. The difference is that on `tcgsouq.com` the owner is
  Organization Policy Administrator and can switch it off — but it has to be done on purpose,
  and service-account-key workflows will fail until it is.
- **Cloud Identity Free** also creates a Cloud organisation at no cost, and is tempting for
  that reason. It gives no mailbox. Half the point of `admin@tcgsouq.com` is receiving the
  ownership invitations from Play Console, the Business Profile, Apple and Shopify — which
  bounce without a real inbox. Pay for Workspace.

## 3. Rules every repo follows

These are the "what should the other repos do" answers. They are deliberately short.

**R1 — A new internal service gets a hostname under `tcgsouq.com`.** Never under
`pokesouq.com`. Internal means: only the owner and the business use it.

**R2 — Anything a customer sees stays on `pokesouq.com` until the rebrand.** Storefront URLs,
short links in WhatsApp broadcasts and social posts, anything pasted into a message. A link on
an unfamiliar domain is a trust problem, and on WhatsApp it is a quality-rating problem.

**R3 — New Google Cloud projects are created inside the `tcgsouq.com` organisation.** Never
under a personal Gmail. PackProof is the cautionary tale: its project sits outside any org and
cannot be governed, and moving it later needs four IAM roles on both ends.

**R4 — New third-party accounts are opened on a role address** (`admin@`, `dev@`, `accounts@`
`tcgsouq.com`), never a personal Gmail and never a staff member's address. Ownership has to
survive a person.

**R5 — Secrets live in environment or sealed variables, never in a repo, never in a
spreadsheet cell.** Rotate when a work period ends. The one exposed secret found so far was in
a Google Sheet cell.

**R6 — DNS changes go through `infra/dns/tcgsouq.com.json` and a PR**, not ad-hoc dashboard
edits, so the zone has history and a reviewer. The exception is anything Porkbun manages
itself (URL forwarding, email forwarding), which is why the sync tool never prunes by default.

**R7 — Every hostname is recorded in its repo's `docs/DOMAIN.md`**, with what it points at and
what it is waiting on. A hostname nobody owns is a hostname nobody renews.

**R8 — Never create a DNS record before the host side knows about the domain.** Vercel and
Railway both serve a 404 and issue no certificate for a hostname they have not been told
about, which looks exactly like a broken deploy and wastes an afternoon.

**R9 — Anything customer-visible or structural gets proposed before it is changed.** The
owner's standing preference, and it applies to domains more than anything else.

## 4. What the rebrand will and will not change

Worth knowing now, so nothing gets built on an assumption that cannot survive it.

**Changes freely, when the time comes:** the store name, the public developer name on the App
Store and Play, page titles, social handles, the primary domain setting in Shopify.

**Never changes, and must not be assumed to:** the Android package `com.pokesouq.fairdrop`
(permanent for the life of that listing), Apple bundle identifiers, the Supabase project refs,
the Shopify internal name `pokesouq.myshopify.com`, and every short link already sent — sent
messages are permanent, so any redirector must answer on `go.pokesouq.com` forever.

**The design rule that follows:** never assume brand name == domain == package name == store
handle. Read each from configuration. A tool that hard-codes `pokesouq.com` is a tool that has
to be edited during the riskiest week of the migration.

## 5. Decision register

| | Decision | Status |
|---|---|---|
| D1 | DNS hosted on Porkbun's own nameservers | **Decided** — 17 Sep 2026 |
| D2 | `hub.` and `inbox.` as separate subdomains, shared cookie on `.tcgsouq.com` | Open — needs the Supabase cookie-storage check first |
| D3 | Google Workspace on `tcgsouq.com`, direct from Google, super-admin `admin@tcgsouq.com` | **Decided** — 17 Sep 2026. Porkbun email forwarding is therefore *not* used; they collide at the MX |
| D4 | Customer-facing short links stay on `go.pokesouq.com` | Follows from §1 and R2. Confirm when the redirector is built |
| D5 | Apex forwards 302 to `pokesouq.com` until there is a page worth having | Open, low stakes |
