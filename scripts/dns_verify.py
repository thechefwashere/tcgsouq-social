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

RESOLVERS = [("google", "https://dns.google/resolve"),
             ("cloudflare", "https://cloudflare-dns.com/dns-query")]
TIMEOUT = 20

GREEN, RED, YELLOW, DIM, RESET = "\033[32m", "\033[31m", "\033[33m", "\033[2m", "\033[0m"
if not sys.stdout.isatty() or os.environ.get("NO_COLOR"):
    GREEN = RED = YELLOW = DIM = RESET = ""


def resolve(name, rtype):
    """Ask every resolver and return {resolver: [answers]}, skipping ones that failed.

    Every resolver is asked, not just the first that answers, because during a nameserver
    cutover they disagree - one still serving a cached delegation while another already has
    the new one. A single resolver cannot tell "not published" from "not propagated yet",
    and that is precisely the question you have at a cutover.
    """
    out = {}
    for label, base in RESOLVERS:
        url = f"{base}?{urllib.parse.urlencode({'name': name, 'type': rtype})}"
        req = urllib.request.Request(url, headers={"Accept": "application/dns-json"})
        try:
            with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
                data = json.load(r)
        except Exception as exc:  # noqa: BLE001 - a resolver that fails is simply not counted
            print(f"  ! {label} lookup failed for {name} {rtype}: {exc}", file=sys.stderr)
            continue
        if data.get("Status") not in (0, 3):  # 0 NOERROR, 3 NXDOMAIN (a real answer: nothing)
            continue
        out[label] = [a["data"] for a in data.get("Answer", [])
                      if _type_name(a.get("type")) == rtype]
    return out


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
    per_ns = {r: sorted(norm(n, "NS") for n in v) for r, v in resolve(domain, "NS").items()}
    agree = [r for r, v in per_ns.items() if v == want_ns]
    ns_ok = bool(per_ns) and len(agree) == len(per_ns)
    if not agree:
        failures += 1
    results.append({"check": "delegation", "name": domain, "type": "NS", "ok": ns_ok,
                    "propagating": bool(agree) and not ns_ok, "want": want_ns,
                    "by_resolver": per_ns, "status": "ready"})

    for rec in manifest["records"]:
        name, rtype = rec.get("name", ""), rec["type"]
        want = norm(rec["content"], rtype)
        per = {r: [norm(g, rtype) for g in v] for r, v in resolve(fqdn(name, domain), rtype).items()}
        seen = [r for r, v in per.items() if want in v]
        present = bool(per) and len(seen) == len(per)
        entry = {"check": "record", "name": fqdn(name, domain), "type": rtype,
                 "status": rec["status"], "want": want, "by_resolver": per,
                 "ok": present, "propagating": bool(seen) and not present}
        if rec["status"] == "ready" and not seen:
            failures += 1
        results.append(entry)

    if args.json:
        print(json.dumps({"domain": domain, "failures": failures, "results": results}, indent=2))
        return 1 if failures else 0

    print(f"\n{domain} - live DNS vs {args.manifest}\n")
    for r in results:
        if r["check"] == "delegation":
            if r["ok"]:
                mark = f"{GREEN}OK   {RESET}"
            elif r.get("propagating"):
                mark = f"{YELLOW}PROP {RESET}"
            else:
                mark = f"{RED}WRONG{RESET}"
            print(f"  {mark} delegation  NS")
            for res, vals in r["by_resolver"].items():
                hit = "=" if vals == r["want"] else "!"
                print(f"       {DIM}{hit} {res:<11}{RESET} {', '.join(vals) or '(none)'}")
            if not r["ok"]:
                print(f"       {DIM}  want       {', '.join(r['want'])}{RESET}")
            continue
        if r["status"] == "ready":
            mark = (f"{GREEN}OK   {RESET}" if r["ok"]
                    else f"{YELLOW}PROP {RESET}" if r.get("propagating") else f"{RED}MISS {RESET}")
        else:
            mark = f"{YELLOW}LIVE {RESET}" if r["ok"] or r.get("propagating") else f"{DIM}blkd {RESET}"
        label = f"{r['name']} {r['type']}"
        print(f"  {mark} {label:<34} {r['want'][:58]}")
        if r.get("propagating"):
            for res, vals in r["by_resolver"].items():
                print(f"       {DIM}{'=' if r['want'] in vals else '!'} {res:<11}"
                      f"{', '.join(vals)[:70] or '(none)'}{RESET}")
        if r["status"] != "ready" and (r["ok"] or r.get("propagating")):
            print(f"       {DIM}now live - update its status in the manifest{RESET}")

    if failures:
        print(f"\n  {failures} check(s) failing\n")
    elif any(r.get("propagating") for r in results):
        print("\n  matches where it has propagated; PROP lines are caches still catching up\n")
    else:
        print("\n  all ready records match\n")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
