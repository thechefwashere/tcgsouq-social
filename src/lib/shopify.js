/**
 * Minimal Shopify Admin GraphQL client.
 *
 * No SDK: the surface used here is one POST, and a dependency that needs upgrading every
 * quarter is a worse trade than forty lines.
 */

// Pinned deliberately. Shopify ships quarterly and supports each version ~12 months; an
// unpinned client silently changes behaviour underneath a nightly job. Bump on purpose,
// after reading the changelog — not by accident.
const API_VERSION = process.env.SHOPIFY_API_VERSION || '2026-07';

const MAX_ATTEMPTS = 5;

/**
 * This client is READ-ONLY, enforced here rather than by scopes.
 *
 * The token belongs to an existing app with full permissions, shared with another program.
 * That is a deliberate, reasonable choice — but it means Shopify will happily execute a
 * mutation this code sends by mistake, against the live store, with no second chance. A
 * capture tool has no business writing to Shopify, so the client refuses to.
 *
 * Checked on the document text before it is sent. An operation is allowed only if it
 * declares no mutation and no subscription: bare `{ ... }` and `query Name { ... }` pass,
 * anything containing a mutation operation does not.
 */
function assertReadOnly(query) {
  // Strip strings and comments first, so a mutation named inside a ShopifyQL string or a
  // comment neither trips the guard nor hides one.
  const stripped = query
    .replace(/"""[\s\S]*?"""/g, '""')
    .replace(/"(?:[^"\\\n]|\\.)*"/g, '""')
    .replace(/#[^\n]*/g, '');

  if (/\b(mutation|subscription)\b\s*[\w({]/.test(stripped)) {
    throw new Error(
      'Refusing to send a mutation. This client is read-only by design: the Shopify token ' +
      'carries write scopes, so a stray mutation would hit the live store. If a write is ' +
      'ever genuinely needed, it belongs in a separate, deliberate code path.'
    );
  }
}

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set. See .env.example.`);
  return v;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Shopify's GraphQL API is a leaky bucket: 1000 points, refilling 50/second on a standard
 * plan. A throttled request returns HTTP 200 with a THROTTLED error in the body, which is
 * why this cannot rely on status codes alone. Every response carries extensions.cost, so
 * back-off can be computed from the actual deficit rather than a blind guess.
 */
export { assertReadOnly };

export async function shopifyGraphQL(query, variables = {}) {
  const shop = required('SHOPIFY_SHOP');
  const token = required('SHOPIFY_ADMIN_TOKEN');
  const url = `https://${shop}/admin/api/${API_VERSION}/graphql.json`;

  assertReadOnly(query);

  let lastError;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
    });

    // 429 and 5xx are worth retrying; 401/403 mean the token or its scopes are wrong and
    // retrying just wastes the window.
    if (res.status === 401 || res.status === 403) {
      const body = await res.text();
      throw new Error(
        `Shopify returned ${res.status}. The token is invalid or missing a scope.\n${body.slice(0, 500)}`
      );
    }

    if (res.status === 429 || res.status >= 500) {
      const retryAfter = Number(res.headers.get('Retry-After'));
      const waitMs = Number.isFinite(retryAfter) && retryAfter > 0
        ? retryAfter * 1000
        : 2 ** attempt * 500;
      lastError = new Error(`Shopify returned ${res.status}`);
      if (attempt < MAX_ATTEMPTS) { await sleep(waitMs); continue; }
      throw lastError;
    }

    if (!res.ok) {
      throw new Error(`Shopify returned ${res.status}: ${(await res.text()).slice(0, 500)}`);
    }

    const body = await res.json();

    const throttled = body.errors?.some((e) => e.extensions?.code === 'THROTTLED');
    if (throttled) {
      const cost = body.extensions?.cost;
      const needed = cost?.requestedQueryCost ?? 100;
      const available = cost?.throttleStatus?.currentlyAvailable ?? 0;
      const restoreRate = cost?.throttleStatus?.restoreRate ?? 50;
      const waitMs = Math.max(1000, Math.ceil(((needed - available) / restoreRate) * 1000));
      lastError = new Error('Shopify throttled the request');
      if (attempt < MAX_ATTEMPTS) { await sleep(waitMs); continue; }
      throw lastError;
    }

    if (body.errors?.length) {
      throw new Error(`Shopify GraphQL errors: ${JSON.stringify(body.errors).slice(0, 1000)}`);
    }

    return body.data;
  }

  throw lastError ?? new Error('Shopify request failed');
}

/**
 * Run a ShopifyQL query and return { columns, rows }.
 *
 * Note the row shape: the Admin API returns each row as an OBJECT keyed by column name.
 * (The Shopify MCP connector returns arrays for the same query — do not carry a parser
 * from one to the other.)
 *
 * Requires the read_reports scope.
 */
export async function shopifyql(query) {
  const data = await shopifyGraphQL(
    `query Ql($q: String!) {
       shopifyqlQuery(query: $q) {
         parseErrors
         tableData { columns { name dataType } rows }
       }
     }`,
    { q: query }
  );

  const result = data.shopifyqlQuery;
  if (result?.parseErrors?.length) {
    throw new Error(`ShopifyQL parse error: ${result.parseErrors.join('; ')}\nquery: ${query}`);
  }
  if (!result?.tableData) {
    throw new Error(`ShopifyQL returned no table data.\nquery: ${query}`);
  }

  return { columns: result.tableData.columns, rows: result.tableData.rows };
}

/**
 * ShopifyQL values arrive as strings, and an EMPTY STRING means "no value for this metric
 * on this day" — not zero. A reported "0" is a real zero. Conflating the two would invent
 * a 0% conversion rate on days Shopify simply had nothing to report.
 */
export function num(v) {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
