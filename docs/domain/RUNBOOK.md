# Runbook — bringing tcgsouq.com under our own control

Owner-side steps, in order. Each one says what to click, how to check it worked, and how to
undo it. Read `README.md` first for why any of this is shaped the way it is.

Everything here is done from the Porkbun dashboard by the account holder. Nothing in this
repo can do step 1, because moving the delegation needs the registrar login.

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

**Timing.** The registry updates within minutes. Resolvers that already cached the old
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

## 3. Publish the anti-spoofing records

Either `python3 scripts/dns_sync.py --apply`, or by hand in **DNS** on the domain:

| Type | Host | Value | TTL |
|---|---|---|---|
| TXT | *(blank / @)* | `v=spf1 -all` | 600 |
| TXT | `_dmarc` | `v=DMARC1; p=reject; adkim=s; aspf=s` | 600 |

Check with `python3 scripts/dns_verify.py` — both go `OK`.

**Undo:** delete the two records. Nothing depends on them.

---

## 4. Point the apex somewhere (decision D5)

While there is no landing page, a temporary forward stops the domain looking abandoned:

1. Domain Management → `tcgsouq.com` → **URL Forwarding**.
2. Forward `tcgsouq.com` *and* `www` to `https://pokesouq.com`, type **302 (temporary)**,
   not 301 — browsers cache a 301 indefinitely and it will outlive its usefulness.
3. Check: `curl -sI https://tcgsouq.com | head -3` shows `302` and the `location` header.

**While forwarding is on, never run `dns_sync.py --prune`** — forwarding maintains its own
apex records and prune would delete them.

---

## 5. Email (decision D3) — pick one, not both

### Option A — Porkbun forwarding (free, ~2 minutes)
Domain Management → **Email Forwarding**. Add `accounts@tcgsouq.com` → the owner's Gmail, and
`dmarc@tcgsouq.com` → the same. Porkbun sets the MX records itself. Then update the DMARC
record to `v=DMARC1; p=reject; rua=mailto:dmarc@tcgsouq.com; adkim=s; aspf=s`.

### Option B — Google Workspace on tcgsouq.com (~$6/user/mo)
Sign up **directly with Google**, never through a reseller — that is the exact mistake that
left `admin@pokesouq.com` without super-admin. Google's setup wizard prints the records to
add: a verification TXT, the MX record(s) it currently recommends, and a DKIM TXT at
`google._domainkey` generated in Admin console → Apps → Google Workspace → Gmail →
Authenticate email (choose 2048-bit). **Use the values the console shows**, not any value
written down here — Google has changed its recommended MX set before.

Then, and this is the point of the exercise: set SPF to `v=spf1 include:_spf.google.com ~all`,
drop DMARC to `p=none` with `rua=mailto:dmarc@tcgsouq.com`, read the reports for about two
weeks, and put it back to `p=reject` once everything legitimate passes.

Option B replaces Option A. Running both means two sets of MX records and lost mail.

---

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
