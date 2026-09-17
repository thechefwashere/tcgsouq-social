# Runbook — bringing tcgsouq.com under our own control

Owner-side steps, in order. Each one says what to click, how to check it worked, and how to
undo it. Read `README.md` first for why any of this is shaped the way it is.

Everything here is done from the Porkbun dashboard by the account holder. Nothing in this
repo can do step 1, because moving the delegation needs the registrar login.

**Nameservers before Google Workspace — not the other way round.** Workspace setup asks you to
add DNS records (a verification TXT, then MX and DKIM). You want to be adding those in the
zone that will still be authoritative next week, not in the one you are leaving. Worse: if the
MX records go in at Domain.com and the nameservers are flipped afterwards, **mail stops the
instant the flip propagates**, because the Porkbun zone would not carry them. Flip first —
there is nothing served from the zone today, so there is nothing to break — then do Workspace
entirely inside Porkbun, once.

---

## 1. Switch the nameservers to Porkbun — do this first

Until this is done the zone is still answered by Domain.com and the Porkbun dashboard edits
nothing.

**Safety check, already done:** `tcgsouq.com`'s current zone at Domain.com holds a single
parking A record (`208.91.197.27`) and no MX, TXT or CNAME. Nothing is being served from it
and no mail flows to it, so there is nothing to lose in the cutover. (`pokesouq.com` is a
different story — it carries the live Shopify records — and is *not* touched by this step.)

1. porkbun.com → **Domain Management** → `tcgsouq.com` → **NS** / *Authoritative Nameservers*.
2. Replace `ns1.domain.com` / `ns2.domain.com` with Porkbun's four:
   ```
   curitiba.ns.porkbun.com
   fortaleza.ns.porkbun.com
   maceio.ns.porkbun.com
   salvador.ns.porkbun.com
   ```
   (Porkbun's own UI offers a one-click "use Porkbun nameservers" — same thing.)
3. Check:
   ```
   python3 scripts/dns_verify.py
   ```
   The delegation line goes from `WRONG` to `OK`.

**What actually happened, 17 Sep 2026 20:55 UTC.** The registry accepted the change within
two minutes, and Porkbun brought the zone up **empty** — no default parking records, nothing
to clean up. An NXDOMAIN probe returned an SOA from `curitiba.ns.porkbun.com`, which is the
proof that Porkbun is authoritative rather than that a resolver happens to agree.

**Timing, observed.** The registry updated within minutes and one public resolver had the new
delegation immediately, while another was still serving the old one — and the apex kept
answering Domain.com's parking IP `208.91.197.27` from cache for another hour or so, on the
old record's 7200-second TTL. That is cache, not failure: `dns_verify.py` asks every resolver
and prints `PROP` when they disagree, precisely so a stale-but-successful answer cannot be
mistaken for the real state.

**Timing, in general.** The registry updates within minutes. Resolvers that already cached the old
delegation keep it until their copy expires — usually minutes to a couple of hours, worst
case up to 48 hours for the `.com` parent TTL. Nothing breaks while both answer, because
neither zone serves anything yet.

**Undo:** set the two Domain.com nameservers back on the same screen.

---

## 2. Create an API key, scoped

Only needed if the DNS is to be driven from `scripts/dns_sync.py` rather than clicked in.

1. porkbun.com → **Account** → **API Access** → create a key. Keep the secret; it is shown once.
2. On `tcgsouq.com` in Domain Management, switch **API ACCESS** on for that domain. This is a
   per-domain toggle and is off by default — an otherwise valid key returns a permission error
   without it.
3. Scope the key to `tcgsouq.com` (and to a source IP if it will run from a fixed host).
4. Check, from a shell that has the key in its environment and nothing committed anywhere:
   ```
   PORKBUN_API_KEY=pk1_... PORKBUN_SECRET_API_KEY=sk1_... python3 scripts/dns_sync.py
   ```
   That prints a plan and writes nothing. `--apply` writes.

Rotate the key when the work pauses, the same way Theme Access passwords are handled on the
store.

---

## 3. Google Workspace on tcgsouq.com

Decision D3, made 17 Sep 2026. **Sign up directly with Google** — never through a reseller.
That is the exact mistake that left `admin@pokesouq.com` without super-admin on its own tenant.

1. Sign up at `workspace.google.com` for `tcgsouq.com`. One user, Business Starter, 14-day
   trial. Create `admin@tcgsouq.com` as the super-admin.
2. Google's wizard prints the records to add. Add them in Porkbun's **DNS** screen:
   - the **verification TXT**,
   - the **MX record(s) the console shows** — use those values, not any written down here or
     anywhere else; Google has changed its recommended set before,
   - the **DKIM TXT** at `google._domainkey`, generated in Admin console → Apps → Google
     Workspace → Gmail → **Authenticate email**, at **2048-bit**.
3. Add mail authentication in the same sitting, because the MX going live is what makes them
   matter:

   | Type | Host | Value |
   |---|---|---|
   | TXT | *(blank / @)* | `v=spf1 include:_spf.google.com ~all` |
   | TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:dmarc@tcgsouq.com` |

   Start at `p=none`, not `p=reject`. Read the reports for about two weeks, then climb to
   `p=quarantine` and then `p=reject` once everything legitimate passes.
4. Create `accounts@tcgsouq.com` for supplier invoices (the finance repo's inbox) and
   `dmarc@tcgsouq.com` for the reports above. Both are ordinary aliases on the one mailbox.
5. Check: `python3 scripts/dns_verify.py` — the mail records go `OK` once the manifest entries
   are flipped from `blocked` to `ready`. Send yourself a message from the new address and
   check the headers show `spf=pass` and `dkim=pass`.

**Undo:** the Workspace trial can be cancelled; the DNS records are deletable. Nothing else in
the family depends on this yet.

**Then, once `admin@tcgsouq.com` exists** — and this is the part with a clock on it — add it as
a second owner/admin on the accounts that impose a 7-day ownership hold: Google Business
Profile (as **Owner**, not Manager), Play Console (all permissions), Apple Developer (Admin),
the YouTube Brand Account (Owner), Shopify (full-permission **staff user**, not a
collaborator), and Supabase (second Owner). None of these transfers anything today; they start
the clocks so the rebrand is never waiting on one.

**And the trap to walk into deliberately:** a Cloud organisation created after 3 May 2024
enforces `iam.disableServiceAccountKeyCreation` by default. Service-account JSON keys — the
pattern PackProof uses — will fail in the new org until you turn that policy off as
Organization Policy Administrator. On `tcgsouq.com` you can; that is the whole point.

## 4. Point the apex somewhere (decision D5)

While there is no landing page, a temporary forward stops the domain looking abandoned:

1. Domain Management → `tcgsouq.com` → **URL Forwarding**.
2. Forward `tcgsouq.com` *and* `www` to `https://pokesouq.com`, type **302 (temporary)**,
   not 301 — browsers cache a 301 indefinitely and it will outlive its usefulness.
3. Check: `curl -sI https://tcgsouq.com | head -3` shows `302` and the `location` header.

**While forwarding is on, never run `dns_sync.py --prune`** — forwarding maintains its own
apex records and prune would delete them.

---

## 5. Email — decided, see step 3

D3 was settled on 17 Sep 2026: Google Workspace, direct from Google. **Porkbun email
forwarding is therefore not used** — it sets its own MX records and would fight Workspace's.
If Workspace slips more than a couple of weeks, publish the stopgap `v=spf1 -all` /
`v=DMARC1; p=reject` pair from the manifest in the meantime, and delete it before Workspace
sends its first message: `-all` with `p=reject` rejects every mail the business sends.

## 6. Account hardening — do it once, now

From `research/registrar-options.md`, which reached these conclusions before the transfer:

- **Two hardware keys / passkeys** enrolled on the Porkbun account, so there is a second way
  in that is not a phone. Porkbun supports WebAuthn/FIDO2, and its API keys work regardless of
  whether 2FA is on — so enabling 2FA costs nothing operationally.
- **Auto-renew on**, with a second card on file. Most domain losses are an expired card.
- **A backup Authorized User** for continuity. Porkbun's authorized users can manage DNS and
  pay for renewals but cannot unlock the domain, generate an auth code, or change registrant
  contacts — which is the right trade-off for a continuity backup and not enough for a
  successor.
- **Registrant contacts** onto a role mailbox rather than a personal address, once one exists
  (step 5). Porkbun's documentation states a registrant change triggers the registry's
  material-change notice **but does not impose a 60-day transfer lock** — unlike the Domain.com
  behaviour the research warned about. Still worth doing after the transfer, not during.
- Registry locks `clientTransferProhibited` and `clientDeleteProhibited` are already set.

---

## 7. If something breaks

- **Porkbun keeps dated restore points for the zone.** DNS → restore points: diff against an
  earlier version and roll back. This is the fastest undo for any bad edit, including one made
  by the sync script.
- `python3 scripts/dns_verify.py --json` prints exactly what resolves right now, which is the
  first thing to capture when reporting a problem.
- A subdomain that returns 404 with correct-looking DNS is almost always the host side: the
  domain was not added in Vercel/Railway, or Railway's TXT challenge is missing.
- A certificate that never issues is usually CAA (if one was ever added) or the same missing
  host-side domain registration.
