# Pages that cannot be captured automatically

Some official pages are rendered entirely in the browser or sit behind a bot-protection
challenge, so `scripts/fetch_platform_docs.py` cannot store their text. They stay in the
manifest so the per-platform `INDEX.md` shows them as `EMPTY` or `FAILED` rather than
silently missing. Headless Chromium cannot reach the public internet from the remote
session that maintains this repo, which is why they are not rendered here.

| Host | Why | How to capture by hand |
|---|---|---|
| `help.shopify.com` | "Verifying your connection" challenge for non-browser clients | Open the page in a browser, print to PDF, save under `docs/platform/manual/shopify/` with the date in the file name |
| `help.x.com` | Cloudflare returns 403 to scripts | Same, under `docs/platform/manual/x/` |
| `www.tiktok.com` (Community Guidelines, legal pages) | Content is loaded by JavaScript after the page loads | Same, under `docs/platform/manual/tiktok/` |
| `www.facebook.com/business/help`, `help.instagram.com`, `www.facebook.com/policies` | Article is embedded as escaped HTML in the page data; the fetcher extracts it. If an index row still says `EMPTY`, Meta changed the page structure | Same, under `docs/platform/manual/meta/` |

When a manual capture is added, list it here with the capture date so the next re-fetch
knows the latest reference copy.
