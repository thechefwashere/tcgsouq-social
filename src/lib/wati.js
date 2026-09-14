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
 * Every Wati account has its own server path: https://live-mt-server.wati.io/<tenant>.
 *
 * Wati's dashboard shows that base URL in some places and a version-suffixed one in others,
 * so WATI_API_URL is accepted either way and normalised back to the bare tenant root. The
 * paths in this file supply their own `/api/ext/v3/...`, and a doubled version segment
 * would 404 with a message that names neither cause.
 */
function baseUrl() {
  const raw = required('WATI_API_URL').trim().replace(/\/+$/, '');
  return raw.replace(/\/api\/(ext\/)?v\d+$/i, '');
}

export function _baseUrlForTest(url) {
  return url.trim().replace(/\/+$/, '').replace(/\/api\/(ext\/)?v\d+$/i, '');
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

    if (!res.ok) {
      throw new Error(`Wati returned ${res.status} for ${path}: ${(await res.text()).slice(0, 400)}`);
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
