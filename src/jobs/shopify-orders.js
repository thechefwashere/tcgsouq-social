import { db } from '../lib/db.js';
import { shopifyGraphQL } from '../lib/shopify.js';
import { normalisePhone } from '../lib/phone.js';
import { addDays } from '../lib/dates.js';

/**
 * Pulls the order history into `orders` — the table the WhatsApp inference joins against
 * on phone_e164.
 *
 * Reproduces db/seed/0003_orders_backfill.sql so a re-run repairs those 3,824 rows rather
 * than disagreeing with them. Two choices there are deliberate and worth not "improving":
 *
 * PHONE PRECEDENCE: customer.phone, then order.phone, then shipping, then billing — and if
 * the FIRST present value does not normalise, the row gets NULL. It does not fall through
 * to the next field. Falling through looks like a free win but can attach the wrong
 * identity: a gift order carries the recipient's shipping phone, not the buyer's.
 *
 * TOTAL: totalPriceSet, the value at the time the order was placed — not
 * currentTotalPriceSet, which moves when an order is edited or refunded. The question this
 * column answers is "did a message produce a purchase, and how big", which is a fact about
 * the moment of ordering. It also keeps re-runs idempotent.
 *
 * WITHOUT read_all_orders Shopify serves only the last 60 days and says nothing about the
 * rest. The job checks for that explicitly rather than quietly storing a truncated history.
 */

const PAGE_SIZE = 100;

// Orders never change their created_at, but a small overlap costs nothing (the upsert is
// keyed on the order id) and covers clock skew at a window boundary.
const OVERLAP_DAYS = 2;

const HISTORY_START = process.env.SHOPIFY_HISTORY_START || '2023-05-01';

const ORDERS_QUERY = `
  query Orders($first: Int!, $after: String, $query: String!) {
    orders(first: $first, after: $after, sortKey: CREATED_AT, query: $query) {
      nodes {
        id
        createdAt
        phone
        totalPriceSet { shopMoney { amount currencyCode } }
        customer { id phone }
        shippingAddress { phone }
        billingAddress { phone }
      }
      pageInfo { hasNextPage endCursor }
    }
  }`;

/** 'gid://shopify/Order/123' -> 123. Returns null for anything unexpected. */
function gidToId(gid) {
  const m = /\/(\d+)(?:\?.*)?$/.exec(gid || '');
  return m ? Number(m[1]) : null;
}

/** First PRESENT value wins, and if it will not normalise the row gets null. */
export function pickPhone(order) {
  const candidates = [
    order.customer?.phone,
    order.phone,
    order.shippingAddress?.phone,
    order.billingAddress?.phone,
  ];
  for (const c of candidates) {
    if (c !== null && c !== undefined && String(c).trim() !== '') {
      return normalisePhone(c); // may be null — deliberately no fallback
    }
  }
  return null;
}

async function resolveSince(pool, args) {
  if (args.since) return args.since;
  const { rows } = await pool.query(
    `select to_char(max(placed_at) at time zone 'UTC', 'YYYY-MM-DD') as max_day from orders`
  );
  return rows[0].max_day ? addDays(rows[0].max_day, -OVERLAP_DAYS) : HISTORY_START;
}

async function upsert(pool, batch) {
  if (!batch.length) return 0;
  const cols = ['shopify_order_id', 'shopify_customer_id', 'phone_e164', 'placed_at', 'total', 'currency'];
  const values = cols.map((c) => batch.map((r) => r[c]));
  const { rowCount } = await pool.query(
    `insert into orders (${cols.join(', ')})
     select * from unnest($1::bigint[], $2::bigint[], $3::text[], $4::timestamptz[], $5::numeric[], $6::text[])
     on conflict (shopify_order_id) do update set
       shopify_customer_id = excluded.shopify_customer_id,
       phone_e164          = excluded.phone_e164,
       placed_at           = excluded.placed_at,
       total               = excluded.total,
       currency            = excluded.currency,
       captured_at         = now()`,
    values
  );
  return rowCount;
}

export default async function shopifyOrders(ctx) {
  const pool = db();
  const since = await resolveSince(pool, ctx.args);
  const filter = `created_at:>=${since}`;
  console.log(`  filter          ${filter}`);

  let after = null;
  let pages = 0;
  let seen = 0;
  let written = 0;
  let unjoinable = 0;
  let earliest = null;

  for (;;) {
    const data = await shopifyGraphQL(ORDERS_QUERY, { first: PAGE_SIZE, after, query: filter });
    const { nodes, pageInfo } = data.orders;
    pages++;

    const batch = [];
    for (const o of nodes) {
      const id = gidToId(o.id);
      if (id === null) throw new Error(`unparseable order id: ${o.id}`);
      const phone = pickPhone(o);
      if (phone === null) unjoinable++;
      if (earliest === null || o.createdAt < earliest) earliest = o.createdAt;
      batch.push({
        shopify_order_id: id,
        shopify_customer_id: gidToId(o.customer?.id),
        phone_e164: phone,
        placed_at: o.createdAt,
        total: o.totalPriceSet?.shopMoney?.amount ?? null,
        currency: o.totalPriceSet?.shopMoney?.currencyCode ?? 'AED',
      });
    }

    seen += batch.length;
    written += await upsert(pool, batch);
    ctx.rowsWritten = written;
    ctx.cursor = pageInfo.endCursor;

    if (!pageInfo.hasNextPage) break;
    after = pageInfo.endCursor;
  }

  // A backfill that asked for the whole history and got nothing older than ~60 days is the
  // signature of a missing read_all_orders scope, not of a young store.
  if (since < addDays(new Date().toISOString().slice(0, 10), -70) && earliest && earliest.slice(0, 10) > addDays(new Date().toISOString().slice(0, 10), -70)) {
    throw new Error(
      `Asked for orders since ${since} but the oldest returned is ${earliest}. ` +
      'That is the 60-day limit Shopify applies without the read_all_orders scope. ' +
      'Add read_all_orders to the app and re-run, rather than storing a truncated history.'
    );
  }

  console.log(`  pages           ${pages}`);
  console.log(`  orders seen     ${seen}`);
  console.log(`  rows written    ${written}`);
  console.log(`  no usable phone ${unjoinable}`);
  if (earliest) console.log(`  earliest        ${earliest}`);

  return { since, seen, written, unjoinable, earliest };
}
