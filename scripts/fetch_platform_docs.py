#!/usr/bin/env python3
"""Fetch official platform documentation into dated, diffable Markdown files.

Usage:
  python3 scripts/fetch_platform_docs.py [--manifest docs/platform/manifest.json]
                                          [--only <platform>] [--force]

Each manifest entry: {"platform": "whatsapp", "slug": "messaging-limits",
                      "url": "https://...", "title": "Messaging limits"}

Output: docs/platform/<platform>/<slug>.md with a YAML front matter that records the
source URL, the fetch timestamp, the HTTP status and a SHA-256 of the extracted text.
On a re-run the file is rewritten only when the extracted text changed; the previous
fetch date is kept in `previous_fetched_at` and the change is listed in CHANGES.md.
An INDEX.md per platform lists every page with its last fetch date.

Dependencies: beautifulsoup4, lxml, markdownify (pip install --user ...).
"""
import argparse, datetime, hashlib, json, os, re, sys, time, urllib.request, urllib.error

try:
    from bs4 import BeautifulSoup
    from markdownify import markdownify as md
except ImportError:
    sys.exit("pip install --user beautifulsoup4 lxml markdownify")

UA_PLAIN = "curl/8.5.0"
UA_BROWSER = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 "
              "(KHTML, like Gecko) Version/17.5 Safari/605.1.15")

MAIN_SELECTORS = [
    "main article", "article", "main", "[role=main]", "#content", ".devsite-article-body",
    "#hc-article", ".article-content", "div.content", "body",
]
STRIP_TAGS = ["script", "style", "noscript", "svg", "iframe", "nav", "footer", "header",
              "form", "button", "aside"]


def fetch(url):
    last = None
    for ua in (UA_PLAIN, UA_BROWSER):
        req = urllib.request.Request(url, headers={
            "User-Agent": ua, "Accept": "text/html,text/markdown,text/plain,*/*",
            "Accept-Language": "en-US,en;q=0.9"})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                body = r.read()
                ctype = r.headers.get("Content-Type", "")
                return r.status, ctype, body, r.geturl()
        except urllib.error.HTTPError as e:
            last = (e.code, "", e.read() if e.fp else b"", url)
            if e.code in (400, 403, 406, 429):
                time.sleep(1.5)
                continue
            return last
        except Exception as e:  # network
            last = (0, "", str(e).encode(), url)
            time.sleep(2)
    return last


def looks_like_markdown(body):
    head = body[:400].lstrip().lower()
    return not head.startswith(b"<!doctype") and not head.startswith(b"<html") and (
        head.startswith(b"#") or b"\n## " in body[:5000])


def html_to_md(body):
    soup = BeautifulSoup(body, "lxml")
    title = (soup.title.string.strip() if soup.title and soup.title.string else "")
    for t in soup(STRIP_TAGS):
        t.decompose()
    node = None
    for sel in MAIN_SELECTORS:
        node = soup.select_one(sel)
        if node and len(node.get_text(strip=True)) > 400:
            break
    node = node or soup
    text = md(str(node), heading_style="ATX", strip=["img"], bullets="-")
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    if len(text) < 300:
        # Meta help / policy pages ship the article as an escaped HTML string inside a
        # script; pull the largest such string that contains a heading and convert it.
        raw = body.decode("utf-8", "replace")
        best = ""
        for m in re.finditer(r'"((?:[^"\\]|\\.)*?\\u003Ch[12](?:[^"\\]|\\.)*?)"', raw):
            if len(m.group(1)) > len(best):
                best = m.group(1)
        if best:
            try:
                frag = json.loads('"' + best + '"')
                inner = BeautifulSoup(frag, "lxml")
                for t in inner(STRIP_TAGS):
                    t.decompose()
                text = md(str(inner), heading_style="ATX", strip=["img"], bullets="-")
                text = re.sub(r"\n{3,}", "\n\n", text).strip()
            except Exception:
                pass
    # drop breadcrumb / sidebar noise that precedes the first H1 when one exists early
    m = re.search(r"^# .+$", text, re.M)
    if m and m.start() < 6000:
        text = text[m.start():]
    return title, text


def clean_markdown(text):
    """Remove per-request noise so identical pages hash identically across runs."""
    from urllib.parse import unquote
    # Facebook's outbound link wrapper carries a per-request token: unwrap it
    text = re.sub(r"https?://l\.facebook\.com/l\.php\?u=([^&)\s]+)[^)\s]*",
                  lambda m: unquote(m.group(1)), text)
    # drop login / tracking links and Meta's footer chrome
    lines = []
    for line in text.splitlines():
        if "privacy_mutation_token" in line or "fbclid=" in line or "/ajax/rapidfeedback/" in line:
            continue
        if line.strip() in ("#### Have a moment?", "Tell us how we're doing"):
            continue
        if line.startswith("[About](https://www.meta.com/about/"):
            break
        lines.append(line)
    text = "\n".join(lines)
    return re.sub(r"\n{3,}", "\n\n", text).strip()


def normalise(text):
    return re.sub(r"\s+", " ", text).strip()


def front_matter(meta):
    lines = ["---"]
    for k, v in meta.items():
        v = str(v).replace('"', "'")
        lines.append(f'{k}: "{v}"')
    lines.append("---")
    return "\n".join(lines)


def read_existing(path):
    if not os.path.exists(path):
        return None, None
    raw = open(path, encoding="utf-8").read()
    m = re.match(r"---\n(.*?)\n---\n", raw, re.S)
    meta = {}
    if m:
        for line in m.group(1).splitlines():
            k, _, v = line.partition(": ")
            meta[k] = v.strip().strip('"')
    return meta, raw[m.end():] if m else raw


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--manifest", default="docs/platform/manifest.json")
    ap.add_argument("--only")
    ap.add_argument("--force", action="store_true")
    args = ap.parse_args()

    root = os.path.dirname(os.path.abspath(args.manifest))
    manifest = json.load(open(args.manifest))
    now = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    changes, failures, index = [], [], {}

    for entry in manifest["pages"]:
        if args.only and entry["platform"] != args.only:
            continue
        platform, slug, url = entry["platform"], entry["slug"], entry["url"]
        out_dir = os.path.join(root, platform)
        os.makedirs(out_dir, exist_ok=True)
        path = os.path.join(out_dir, slug + ".md")
        status, ctype, body, final_url = fetch(url)
        if status != 200 or not body:
            failures.append((platform, slug, url, status))
            old_meta, _ = read_existing(path)
            index.setdefault(platform, []).append((entry, old_meta or {}, "FAILED %s" % status))
            print(f"FAIL {status} {url}", file=sys.stderr)
            continue
        if entry.get("raw") or url.endswith((".yaml", ".yml", ".json", ".md", ".txt")):
            text = body.decode("utf-8", "replace").strip()
            title = entry.get("title") or slug
            fmt = "raw"
        elif looks_like_markdown(body):
            text = body.decode("utf-8", "replace").strip()
            title = entry.get("title") or (text.splitlines()[0].lstrip("# ").strip() if text else slug)
            fmt = "markdown-served"
        else:
            title, text = html_to_md(body)
            title = entry.get("title") or title or slug
            fmt = "html-converted"
            if len(text) < 300:
                failures.append((platform, slug, url, "EMPTY (client-rendered page)"))
                old_meta, _ = read_existing(path)
                index.setdefault(platform, []).append((entry, old_meta or {}, "EMPTY: page is rendered in the browser; needs manual capture"))
                print(f"EMPTY {url}", file=sys.stderr)
                continue
        text = clean_markdown(text)
        digest = hashlib.sha256(normalise(text).encode()).hexdigest()
        old_meta, old_body = read_existing(path)
        if old_meta and old_meta.get("sha256") == digest and not args.force:
            # unchanged: refresh the checked date only
            old_meta["last_checked_at"] = now
            open(path, "w", encoding="utf-8").write(front_matter(old_meta) + "\n\n" + old_body.lstrip("\n"))
            index.setdefault(platform, []).append((entry, old_meta, "unchanged"))
            print(f"same {url}")
            continue
        meta = {
            "title": title, "source": url, "final_url": final_url,
            "platform": platform, "fetched_at": now, "last_checked_at": now,
            "previous_fetched_at": (old_meta or {}).get("fetched_at", ""),
            "http_status": status, "format": fmt, "sha256": digest,
        }
        if entry.get("note"):
            meta["note"] = entry["note"]
        open(path, "w", encoding="utf-8").write(front_matter(meta) + "\n\n" + text + "\n")
        state = "new" if not old_meta else "CHANGED"
        if old_meta:
            changes.append((platform, slug, url, old_meta.get("fetched_at"), now))
        index.setdefault(platform, []).append((entry, meta, state))
        print(f"{state} {url} ({fmt}, {len(text)} chars)")
        time.sleep(0.5)

    # per-platform index
    for platform, rows in index.items():
        lines = [f"# {platform} — official documentation snapshot", "",
                 "Fetched by `scripts/fetch_platform_docs.py` from the manifest. Dates are UTC.", "",
                 "| Page | Source | Fetched | Status |", "|---|---|---|---|"]
        for entry, meta, state in rows:
            lines.append(f"| [{entry.get('title') or entry['slug']}]({entry['slug']}.md) | {entry['url']} | {meta.get('fetched_at', '')} | {state} |")
        open(os.path.join(root, platform, "INDEX.md"), "w", encoding="utf-8").write("\n".join(lines) + "\n")

    if changes:
        with open(os.path.join(root, "CHANGES.md"), "a", encoding="utf-8") as f:
            f.write(f"\n## Run {now}\n\n")
            for platform, slug, url, old, new in changes:
                f.write(f"- {platform}/{slug}: content changed since {old} ({url})\n")
    if failures:
        print("\nFailures:", file=sys.stderr)
        for f_ in failures:
            print("  ", f_, file=sys.stderr)
    print(f"\n{sum(len(v) for v in index.values())} pages, {len(changes)} changed, {len(failures)} failed")


if __name__ == "__main__":
    main()
