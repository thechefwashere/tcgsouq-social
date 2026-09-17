#!/usr/bin/env python3
"""Check the live public DNS for a domain against the manifest in infra/dns/.

Usage:
  python3 scripts/dns_verify.py [--manifest infra/dns/tcgsouq.com.json] [--json]

Needs no credentials: it reads what the internet actually returns, over DNS-over-HTTPS,
and compares that with what the manifest says should be there. Run it after every change
at the registrar, and any time you want to know whether the zone still matches the plan.

Exit code 0 when every `ready` record resolves as written and the delegation matches the
manifest's nameservers; 1 otherwise. `blocked` records are reported but never fail the
run - if one has appeared it means the thing that blocked it got done, and the manifest
should be updated to say so.
"""
import argparse, json, os, sys, urllib.parse, urllib.request

RESOLVERS = ["https://dns.google/resolve", "https://cloudflare-dns.com/dns-query"]
TIMEOUT = 20

GREEN, RED, YELLOW, DIM, RESET = "\033[32m", "\033[31m", "\033[33m", "\033[2m", "\033[0m"
if not sys.stdout.isatty() or os.environ.get("NO_COLOR"):
    GREEN = RED = YELLOW = DIM = RESET = ""


def resolve(name, rtype):
    """Return the list of answer strings for name/rtype, or None if the lookup failed."""
    last = None
    for base in RESOLVERS:
        url = f"{base}?{urllib.parse.urlencode({'name': name, 'type': rtype})}"
        req = urllib.request.Request(url, headers={"Accept": "application/dns-json"})
        try:
            with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
                data = json.load(r)
        except Exception as exc:  # noqa: BLE001 - any failure means try the next resolver
            last = exc
            continue
        if data.get("Status") not in (0, 3):  # 0 NOERROR, 3 NXDOMAIN (a real answer: nothing)
            last = RuntimeError(f"resolver status {data.get('Status')}")
            continue
        return [a["data"] for a in data.get("Answer", []) if _type_name(a.get("type")) == rtype]
    print(f"  ! lookup failed for {name} {rtype}: {last}", file=sys.stderr)
    return None


_TYPES = {1: "A", 2: "NS", 5: "CNAME", 15: "MX", 16: "TXT", 28: "AAAA", 257: "CAA"}


def _type_name(num):
    return _TYPES.get(num, str(num))


def norm(value, rtype):
    """Compare DNS answers and manifest values on equal terms.

    Resolvers return names with a trailing dot, TXT values wrapped in quotes (and long
    ones split into several quoted chunks), and MX/CAA with their numeric field inline.
    """
    v = value.strip()
    if rtype == "TXT":
        if '" "' in v:  # a long TXT split into 255-byte chunks
            v = "".join(part for part in v.split('" "'))
        return v.strip('"').strip()
    if rtype in ("CNAME", "NS", "MX", "ALIAS"):
        v = v.rstrip(".")
    if rtype == "MX":
        parts = v.split(None, 1)
        if len(parts) == 2:  # "10 mail.example.com" -> compare host only; prio checked apart
            return parts[1].rstrip(".").lower() or "."
        return v.lower()
    if rtype == "CAA":
        return " ".join(v.split()).replace('"', "").lower()
    return v.lower()


def fqdn(name, domain):
    return domain if name in ("", "@", None) else f"{name}.{domain}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--manifest", default="infra/dns/tcgsouq.com.json")
    ap.add_argument("--json", action="store_true", help="machine-readable output")
    args = ap.parse_args()

    with open(args.manifest, encoding="utf-8") as fh:
        manifest = json.load(fh)
    domain = manifest["domain"]
    results, failures = [], 0

    want_ns = sorted(n.rstrip(".").lower() for n in manifest.get("nameservers", []))
    got_ns_raw = resolve(domain, "NS")
    got_ns = sorted(norm(n, "NS") for n in (got_ns_raw or []))
    ns_ok = bool(got_ns) and got_ns == want_ns
    if not ns_ok:
        failures += 1
    results.append({"check": "delegation", "name": domain, "type": "NS",
                    "ok": ns_ok, "want": want_ns, "got": got_ns, "status": "ready"})

    for rec in manifest["records"]:
        name, rtype = rec.get("name", ""), rec["type"]
        want = norm(rec["content"], rtype)
        got = [norm(g, rtype) for g in (resolve(fqdn(name, domain), rtype) or [])]
        present = want in got
        entry = {"check": "record", "name": fqdn(name, domain), "type": rtype,
                 "status": rec["status"], "want": want, "got": got, "ok": present}
        if rec["status"] == "ready" and not present:
            failures += 1
        results.append(entry)

    if args.json:
        print(json.dumps({"domain": domain, "failures": failures, "results": results}, indent=2))
        return 1 if failures else 0

    print(f"\n{domain} - live DNS vs {args.manifest}\n")
    for r in results:
        if r["check"] == "delegation":
            mark = f"{GREEN}OK  {RESET}" if r["ok"] else f"{RED}WRONG{RESET}"
            print(f"  {mark} delegation  NS -> {', '.join(r['got']) or '(none)'}")
            if not r["ok"]:
                print(f"       {DIM}expected {', '.join(r['want'])}{RESET}")
            continue
        if r["status"] == "ready":
            mark = f"{GREEN}OK  {RESET}" if r["ok"] else f"{RED}MISSING{RESET}"
        else:
            mark = f"{YELLOW}LIVE{RESET}" if r["ok"] else f"{DIM}blocked{RESET}"
        label = f"{r['name']} {r['type']}"
        print(f"  {mark} {label:<34} {r['want'][:60]}")
        if r["status"] == "ready" and not r["ok"] and r["got"]:
            print(f"       {DIM}found instead: {', '.join(r['got'])[:90]}{RESET}")
        if r["status"] != "ready" and r["ok"]:
            print(f"       {DIM}now live - update its status in the manifest{RESET}")

    print(f"\n  {failures} check(s) failing\n" if failures else "\n  all ready records match\n")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
