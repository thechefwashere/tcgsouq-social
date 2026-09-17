#!/usr/bin/env python3
"""Apply the DNS manifest in infra/dns/ to Porkbun's nameservers, idempotently.

Usage:
  PORKBUN_API_KEY=pk1_... PORKBUN_SECRET_API_KEY=sk1_... \
    python3 scripts/dns_sync.py [--manifest infra/dns/tcgsouq.com.json] [--apply]
  python3 scripts/dns_sync.py --self-test          # diff logic only, no network, no keys

Without --apply it prints the plan and changes nothing; that is the default because a DNS
mistake is the kind that takes hours to expire out of caches. Only records with
`"status": "ready"` are touched - a `blocked` record is waiting on something the manifest
names, and creating it early is how you get a subdomain that 404s or a certificate that
never issues.

Records living in Porkbun that the manifest does not mention are listed, never removed,
unless --prune is passed. Do not use --prune while Porkbun URL forwarding is enabled on
the domain: forwarding maintains its own apex records and prune would fight it.

Credentials come from the environment only. Never put them in the manifest or a commit.
"""
import argparse, json, os, sys, urllib.error, urllib.request

DEFAULT_ENDPOINT = "https://api.porkbun.com/api/json/v3"
TIMEOUT = 30


class Porkbun:
    def __init__(self, endpoint, key, secret):
        self.endpoint, self.key, self.secret = endpoint.rstrip("/"), key, secret

    def call(self, path, payload=None):
        body = json.dumps(payload or {}).encode()
        req = urllib.request.Request(
            f"{self.endpoint}/{path.lstrip('/')}", data=body, method="POST",
            headers={"Content-Type": "application/json",
                     "X-API-Key": self.key, "X-Secret-API-Key": self.secret})
        try:
            with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
                data = json.load(r)
        except urllib.error.HTTPError as exc:
            try:
                data = json.load(exc)
            except Exception:  # noqa: BLE001
                raise SystemExit(f"HTTP {exc.code} from {path}: {exc.reason}") from exc
        if data.get("status") == "ERROR":
            hint = (data.get("next_action") or {}).get("hint", "")
            raise SystemExit(f"Porkbun error on {path}: {data.get('message')} "
                             f"[{data.get('code')}] {hint}")
        return data

    def records(self, domain):
        return self.call(f"dns/retrieve/{domain}").get("records", [])

    def create(self, domain, rec):
        return self.call(f"dns/create/{domain}", rec)

    def edit(self, domain, rec_id, rec):
        return self.call(f"dns/edit/{domain}/{rec_id}", rec)

    def delete(self, domain, rec_id):
        return self.call(f"dns/delete/{domain}/{rec_id}")


def short_name(full, domain):
    """Porkbun returns fully-qualified names but accepts bare subdomains on write."""
    full = full.rstrip(".")
    if full == domain:
        return ""
    return full[: -len(domain) - 1] if full.endswith("." + domain) else full


def txt_policy(content):
    """Which single-instance policy a TXT record carries, if any.

    SPF and DMARC must appear exactly once per name - two SPF records is a permanent error
    at every receiver, not a merge. So a TXT carrying the same policy as a manifest record is
    that record, whatever its current value, and gets edited rather than duplicated.
    """
    c = content.strip().strip('"').lower()
    for tag in ("v=spf1", "v=dmarc1"):
        if c.startswith(tag):
            return tag
    return None


def same_content(a, b, rtype):
    a, b = a.strip().rstrip("."), b.strip().rstrip(".")
    if rtype == "TXT":
        a, b = a.strip('"'), b.strip('"')
        return a == b
    return a.lower() == b.lower()


def plan(manifest, live):
    """Return (actions, unmanaged). An action is (verb, record, live_match_or_None)."""
    domain = manifest["domain"]
    default_ttl = manifest.get("defaults", {}).get("ttl", 600)
    actions, matched_ids = [], set()

    for rec in manifest["records"]:
        if rec.get("status") != "ready":
            continue
        name, rtype = rec.get("name", ""), rec["type"]
        ttl = int(rec.get("ttl", default_ttl))
        wire = {"name": name, "type": rtype, "content": rec["content"], "ttl": ttl}
        if "prio" in rec:
            wire["prio"] = int(rec["prio"])

        candidates = [r for r in live
                      if short_name(r.get("name", ""), domain) == name and r.get("type") == rtype]
        exact = next((r for r in candidates if same_content(r.get("content", ""), rec["content"], rtype)), None)
        if exact:
            matched_ids.add(exact.get("id"))
            if str(exact.get("ttl")) != str(ttl):
                actions.append(("update-ttl", wire, exact))
            else:
                actions.append(("ok", wire, exact))
            continue
        # Several TXT records legitimately share a name (verification tokens pile up at the
        # apex), so a TXT is added rather than overwritten - unless it carries a policy that
        # may only exist once, in which case the existing one is edited.
        if rtype == "TXT":
            want_policy = txt_policy(rec["content"])
            replace = next((r for r in candidates if want_policy
                            and txt_policy(r.get("content", "")) == want_policy), None)
        else:
            replace = next(iter(candidates), None)
        if replace:
            matched_ids.add(replace.get("id"))
            actions.append(("update", wire, replace))
        else:
            actions.append(("create", wire, None))

    unmanaged = [r for r in live if r.get("id") not in matched_ids]
    return actions, unmanaged


def describe(wire):
    label = wire["name"] or "@"
    return f"{label} {wire['type']} -> {wire['content']}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--manifest", default="infra/dns/tcgsouq.com.json")
    ap.add_argument("--apply", action="store_true", help="actually write the changes")
    ap.add_argument("--prune", action="store_true", help="delete records not in the manifest")
    ap.add_argument("--endpoint", default=os.environ.get("PORKBUN_ENDPOINT", DEFAULT_ENDPOINT))
    ap.add_argument("--self-test", action="store_true", help="run the diff logic on fixtures")
    args = ap.parse_args()

    if args.self_test:
        return self_test()

    with open(args.manifest, encoding="utf-8") as fh:
        manifest = json.load(fh)
    domain = manifest["domain"]

    key, secret = os.environ.get("PORKBUN_API_KEY"), os.environ.get("PORKBUN_SECRET_API_KEY")
    if not key or not secret:
        raise SystemExit("set PORKBUN_API_KEY and PORKBUN_SECRET_API_KEY "
                         "(porkbun.com/account/api, and switch API ACCESS on for the domain)")

    api = Porkbun(args.endpoint, key, secret)
    live = api.records(domain)
    actions, unmanaged = plan(manifest, live)

    print(f"\n{domain} - {len(live)} record(s) live at Porkbun\n")
    changes = 0
    for verb, wire, match in actions:
        if verb == "ok":
            print(f"  ok       {describe(wire)}")
            continue
        changes += 1
        print(f"  {verb:<8} {describe(wire)}"
              + (f"   (was {match['content']})" if match and verb == "update" else ""))

    if unmanaged:
        print(f"\n  {len(unmanaged)} record(s) at Porkbun but not in the manifest:")
        for r in unmanaged:
            print(f"    - {short_name(r.get('name',''), domain) or '@'} {r.get('type')} "
                  f"-> {str(r.get('content'))[:60]}")
        print("    (left alone; --prune deletes them)" if not args.prune else "    (--prune: will delete)")

    if not args.apply:
        print(f"\n  plan only - {changes} change(s) pending. Re-run with --apply to write.\n")
        return 0

    for verb, wire, match in actions:
        if verb == "ok":
            continue
        if verb == "create":
            api.create(domain, wire)
        else:
            api.edit(domain, match["id"], wire)
        print(f"  applied  {describe(wire)}")
    if args.prune:
        for r in unmanaged:
            api.delete(domain, r["id"])
            print(f"  deleted  {short_name(r.get('name',''), domain) or '@'} {r.get('type')}")
    print(f"\n  {changes} change(s) applied. Verify with: python3 scripts/dns_verify.py\n")
    return 0


def self_test():
    manifest = {
        "domain": "example.com",
        "defaults": {"ttl": 600},
        "records": [
            {"name": "", "type": "TXT", "content": "v=spf1 -all", "status": "ready"},
            {"name": "_dmarc", "type": "TXT", "content": "v=DMARC1; p=reject", "status": "ready"},
            {"name": "www", "type": "CNAME", "content": "target.example.net", "status": "ready"},
            {"name": "hub", "type": "CNAME", "content": "x.up.railway.app", "status": "blocked"},
        ],
    }
    live = [
        {"id": "1", "name": "example.com", "type": "TXT", "content": '"v=spf1 -all"', "ttl": "600"},
        {"id": "2", "name": "www.example.com", "type": "CNAME", "content": "old.example.net", "ttl": "600"},
        {"id": "3", "name": "example.com", "type": "TXT", "content": "google-site-verification=abc", "ttl": "600"},
        {"id": "5", "name": "_dmarc.example.com", "type": "TXT", "content": "v=DMARC1; p=none", "ttl": "600"},
        {"id": "4", "name": "legacy.example.com", "type": "A", "content": "1.2.3.4", "ttl": "600"},
    ]
    actions, unmanaged = plan(manifest, live)
    got = {(v, w["name"], w["type"]) for v, w, _ in actions}
    checks = [
        ("existing TXT matched, no change", ("ok", "", "TXT") in got),
        ("stale DMARC policy edited, not duplicated", ("update", "_dmarc", "TXT") in got),
        ("CNAME with new target updated in place", ("update", "www", "CNAME") in got),
        ("blocked record not acted on", not any(w["name"] == "hub" for _, w, _ in actions)),
        ("unrelated TXT on same name kept", any(r["id"] == "3" for r in unmanaged)),
        ("policy TXT claimed, not left as unmanaged", not any(r["id"] == "5" for r in unmanaged)),
        ("unmanaged A record reported", any(r["id"] == "4" for r in unmanaged)),
        ("matched records excluded from unmanaged", not any(r["id"] in ("1", "2") for r in unmanaged)),
    ]
    failed = 0
    for label, ok in checks:
        print(f"  {'PASS' if ok else 'FAIL'}  {label}")
        failed += 0 if ok else 1
    print(f"\n  {len(checks) - failed}/{len(checks)} passed\n")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
