/**
 * Wati API client (v3).
 *
 * Read-only by construction: only GET is exposed. This code is an archive of an account
 * that is being migrated away from, and it must never alter what it is archiving.
 */

const MAX_ATTEMPTS = 5;

// Wati documents 10 requests per 10 seconds on the heavier list endpoints. One request per
// second stays under that with room to spare; the archive is not in a hurry, and being
// throttled mid-pagination is far more expensive than being slow.
const MIN_INTERVAL_MS = Number(process.env.WATI_MIN_INTERVAL_MS || 1000);

let lastCallAt = 0;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set. See .env.example.`);
  return v;
}

/**
 * Wati's v1 and v3 APIs address accounts DIFFERENTLY, and the dashboard shows only one URL.
 *
 * v1 puts the account number in the path:  https://live-mt-server.wati.io/334873/api/v1/...
 * v3 does not put it anywhere:             https://live-mt-server.wati.io/api/ext/v3/...
 *
 * In v3 the token identifies the account. Verified by probing both, 14 Sep 2026: the v1
 * path returns 401 (exists, wants auth) while the same host WITH the account number returns
 * 404 on every v3 path, and WITHOUT it returns 401 on all six. Keeping the number on a v3
 * request produces a bare 404 with an empty body — no message, nothing naming the cause.
 *
 * So WATI_API_URL is accepted exactly as the dashboard prints it, and the account number
 * and any version suffix are stripped here. Nobody has to know this to configure it.
 */
export function watiBase(url) {
  return url
    .trim()
    .replace(/\/+$/, '')
    .replace(/\/api\/(ext\/)?v\d+.*$/i, '')  // a version suffix, if the URL carried one
    .replace(/\/\d+$/, '');                   // the v1-style account number
}

/** The account number, if the configured URL carried one. Only v1 would need it. */
export function watiAccountId(url) {
  const m = /\/(\d+)\/?$/.exec(url.trim().replace(/\/api\/(ext\/)?v\d+.*$/i, ''));
  return m ? m[1] : null;
}

function baseUrl() {
  return watiBase(required('WATI_API_URL'));
}

export async function watiGet(path, params = {}) {
  const token = required('WATI_API_TOKEN');
  const url = new URL(`${baseUrl()}${path}`);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
  }

  let lastError;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const wait = MIN_INTERVAL_MS - (Date.now() - lastCallAt);
    if (wait > 0) await sleep(wait);

    const res = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    lastCallAt = Date.now();

    if (res.status === 401 || res.status === 403) {
      const body = await res.text();
      throw new Error(
        `Wati returned ${res.status} for ${path}. The token is invalid, expired, or missing ` +
        `a scope (contacts:read, broadcast:read).\n${body.slice(0, 400)}`
      );
    }

    if (res.status === 429 || res.status >= 500) {
      const retryAfter = Number(res.headers.get('Retry-After'));
      const waitMs = Number.isFinite(retryAfter) && retryAfter > 0
        ? retryAfter * 1000
        : 2 ** attempt * 1000;
      lastError = new Error(`Wati returned ${res.status} for ${path}`);
      if (attempt < MAX_ATTEMPTS) { await sleep(waitMs); continue; }
      throw lastError;
    }

    if (res.status === 404) {
      // Wati answers a wrong v3 path with a bare 404 and an EMPTY body — no message, nothing
      // naming the cause. Say what it almost always is instead of passing the silence on.
      throw new Error(
        `Wati returned 404 for ${path} at ${baseUrl()}.\n` +
        'The v3 API takes no account number in the URL — the token identifies the account. ' +
        `Check WATI_API_URL: it should resolve to https://live-mt-server.wati.io, not ` +
        '.../<account-number>. The response body was empty, which is what this looks like.'
      );
    }

    if (!res.ok) {
      const body = (await res.text()).slice(0, 400);
      throw new Error(`Wati returned ${res.status} for ${path}${body ? ': ' + body : ' (empty body)'}`);
    }

    return res.json();
  }

  throw lastError ?? new Error(`Wati request failed: ${path}`);
}

/**
 * Page through a list endpoint. Wati's paged responses carry the page echo but not always a
 * total, so the loop stops on a short page rather than trusting a count.
 */
export async function* watiPages(path, { pageSize = 100, params = {}, listKey }) {
  for (let page = 1; ; page++) {
    const body = await watiGet(path, { ...params, page_number: page, page_size: pageSize });
    const items = body?.[listKey] ?? [];
    if (!items.length) return;
    yield { page, items, body };
    if (items.length < pageSize) return;

    // Wati has been seen to keep serving the last page instead of an empty one. Without
    // this the loop never ends and the job burns the rate limit until the container dies.
    if (page > 1000) throw new Error(`${path}: exceeded 1000 pages — pagination is not terminating`);
  }
}
