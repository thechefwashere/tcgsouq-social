# Google surfaces worth using — a parked note

Not a plan. A list of things the business has access to, or nearly has access to, on Google,
with enough context that picking any of them up later does not start from nothing.

Raised by the owner on **21 Sep 2026**: an email arrived saying the account now has access to
**Customer Match**, and the wider question is what else on Google is worth folding into the
Later/Wati replacement.

Nothing here has been researched properly yet. Every claim below is either something the
owner said, something already verified elsewhere in these repos (linked), or an open question
written as a question. **Do not treat any of it as settled.**

## 1. Customer Match — the one with a live trigger

**What prompted it:** the owner received notice of access. Nothing else is known first-hand;
eligibility rules, minimum list sizes, match rates and the current policy position all need
checking against Google's own documentation before any of it is planned around.

**Why it is more interesting here than it would be for most small stores:** the capture layer
already holds the list it would need, cleanly.

| Asset | State |
|---|---|
| Orders | 3,824, entire history from May 2023 |
| Phone numbers | 3,818 of 3,824 resolve to E.164 — normalised conservatively, never guessed (`src/lib/phone.js`) |
| Customers | 1,450, of which 1,432 are real (17 test orders documented in `db/seed/0004_orders_postload.sql`) |
| First-order flag | computed, so new vs returning is separable |
| Consent | `consent_events`, append-only, currently populated from Wati |

Most stores would spend weeks assembling that. It is a query here.

**The questions to answer before doing anything, in order:**

1. **Consent.** Uploading customer identifiers to an ad platform is a different act from holding
   them to fulfil an order. What the store's existing consent actually covers — and what UAE
   data-protection law requires for it — is the first question, not the last. `consent_events`
   records WhatsApp opt-in; it says nothing about advertising.
2. **Which Google product.** Customer Match appears across Ads, and possibly elsewhere. Which
   surface the access email refers to is unconfirmed.
3. **What it would be used for.** Two obvious candidates, and they are not equally valuable:
   suppression (stop paying to advertise to people who already buy) and lookalike-style
   expansion. Suppression is cheap, low-risk and needs no new spend; expansion is a
   different commitment.
4. **Whether it needs ad spend at all.** Relevant because the owner switched Instagram
   advertising off after judging it ineffective for acquisition (see
   `tcgsouq-shopify/docs/social-hub/BASELINE-2026-09-14.md` §7).

## 2. Google Search Console — still the biggest measurement gap

Not new, and it keeps not getting done. From the baseline: **search drives 443 orders a year —
23% of all orders — and there is zero visibility into which queries produce them.** Every other
channel in this project is better instrumented than the one that actually works.

Free, no spend, no consent question. The reason it keeps slipping is that it is nobody's
emergency, which is exactly why it should be scheduled rather than intended.

## 3. Google Business Profile — start the clock early

Flagged in the baseline as worth starting because **the API access form takes 2–6 weeks**, so
the waiting is the cost, not the work. Snapshots already live in
`docs/platform/google-business-profile/`.

Also relevant to the rebrand: the charter's identity model (§2) wants `admin@tcgsouq.com`
added as a second owner on platform accounts **now**, because several carry a 7-day ownership
hold. Business Profile is named there explicitly.

## 4. Google Ads history — needed to close an open question

Not a feature to adopt; a record to retrieve. The December 2025 social drop is deliberately
recorded as **unresolved** in the baseline (§7), and one of the four competing explanations is
"the owner switched advertising off". **The exact dates advertising ran would separate it.**

## 5. Merchant Center / Shopping — unexamined

Listed for completeness. No view on it yet.

## What changed recently that makes all of this easier

The Google tenant on `tcgsouq.com` is live (17 Sep) with a Cloud organisation the owner is
super-admin of (18 Sep). Before that, anything Google-shaped had to run through
`admin@pokesouq.com` — a reseller-held tenant where the owner is *not* super-admin and which
enforces `iam.disableServiceAccountKeyCreation`. See `docs/domain/README.md` §1b.

Practically: API access, service accounts and org policy are now the business's to grant.
Charter rule **R3** applies — new Cloud projects go inside the `tcgsouq.com` organisation,
never under a personal Gmail.

## Where this sits against the rest of the work

Behind the current queue, not in front of it: the hub's own Shopify app, live webhooks instead
of nightly polling, and the Meta side. This file exists so none of it is lost, not so it
jumps ahead.
