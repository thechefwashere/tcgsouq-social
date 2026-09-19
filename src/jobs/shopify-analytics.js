import { db } from '../lib/db.js';
import { shopifyGraphQL, shopifyql, num } from '../lib/shopify.js';
import { todayIn, addDays, daysBetween, chunkRange } from '../lib/dates.js';

/**
 * Pulls Shopify's daily analytics into shopify_daily and shopify_referrer_daily.
 *
 * This replaces the hand-generated backfill in db/seed/0001 and 0002, and reproduces its
 * transformation rules exactly — see the headers of those files for why each one exists.
 * The rules are load-bearing, not cosmetic:
 *
 *   - An EMPTY STRING from the SALES query is the no-referrer bucket and is the same thing
 *     the sessions query calls 'direct'. It is renamed to 'direct'.
 *   - An EMPTY STRING from the SESSIONS query is NOT that. It co-exists with a separate
 *     'direct' row on the same day and carried most traffic during 2024-02-22..2024-03-01
 *     when Shopify's attribution was not resolving. Folding it into 'direct' would have
 *     invented roughly 1,265 direct sessions. It is kept as 'unattributed'.
 *   - An empty metric string means "Shopify returned no value", which is not zero. It is
 *     written as NULL. A returned "0" is a real zero.
 *   - total_sales is net of refunds and CAN BE NEGATIVE. Never clamped.
 *
 * Re-running is safe and is expected: Shopify revises recent days as refunds and late
 * attribution land, so the default window re-pulls the trailing fortnight.
 */

// How far back an incremental run re-pulls. Shopify keeps adjusting recent days.
const LOOKBACK_DAYS = Number(process.env.SHOPIFY_LOOKBACK_DAYS || 14);

// The store's first order. Used only when the table is empty.
const HISTORY_START = process.env.SHOPIFY_HISTORY_START || '2023-05-01';

// Rows returned = days x sources, and ShopifyQL caps a result set. 90 days x ~8 sources
// stays well under it; the plain daily query has one row per day so it can take a year.
const REFERRER_CHUNK_DAYS = 90;
const DAILY_CHUNK_DAYS = 365;

async function shopTimezone() {
  const data = await shopifyGraphQL(`{ shop { ianaTimezone } }`);
  return data.shop.ianaTimezone;
}

/** ShopifyQL rows come back as objects keyed by column name. Index them by day. */
function byDay(rows) {
  const map = new Map();
  for (const r of rows) map.set(r.day, r);
  return map;
}

async function resolveWindow(pool, args) {
  const timeZone = await shopTimezone();
  const until = args.until || todayIn(timeZone);

  if (args.since) return { since: args.since, until, timeZone };

  const { rows } = await pool.query(`select max(day)::text as max_day from shopify_daily`);
  const since = rows[0].max_day
    ? addDays(rows[0].max_day, -LOOKBACK_DAYS)
    : HISTORY_START;

  return { since, until, timeZone };
}

async function pullDaily(since, until) {
  const out = new Map();

  for (const c of chunkRange(since, until, DAILY_CHUNK_DAYS)) {
    const sales = await shopifyql(
      `FROM sales SHOW orders, total_sales, average_order_value, new_customers, returning_customers ` +
      `TIMESERIES day SINCE ${c.since} UNTIL ${c.until}`
    );
    const sessions = await shopifyql(
      `FROM sessions SHOW sessions, conversion_rate TIMESERIES day SINCE ${c.since} UNTIL ${c.until}`
    );

    const sessionsByDay = byDay(sessions.rows);

    for (const day of new Set([...sales.rows.map((r) => r.day), ...sessionsByDay.keys()])) {
      const s = sales.rows.find((r) => r.day === day) || {};
      const v = sessionsByDay.get(day) || {};
      out.set(day, {
        day,
        sessions: num(v.sessions),
        orders: num(s.orders),
        new_customers: num(s.new_customers),
        returning_customers: num(s.returning_customers),
        total_sales: num(s.total_sales),
        average_order_value: num(s.average_order_value),
        conversion_rate: num(v.conversion_rate),
      });
    }
  }

  return [...out.values()];
}

async function pullReferrer(since, until) {
  const out = new Map(); // key: `${day}|${source}`

  const put = (day, source, patch) => {
    const key = `${day}|${source}`;
    out.set(key, { day, referrer_source: source, sessions: null, orders: null, total_sales: null,
                   ...out.get(key), ...patch });
  };

  for (const c of chunkRange(since, until, REFERRER_CHUNK_DAYS)) {
    const sessions = await shopifyql(
      `FROM sessions SHOW sessions GROUP BY referrer_source TIMESERIES day ` +
      `SINCE ${c.since} UNTIL ${c.until}`
    );
    for (const r of sessions.rows) {
      // Empty string here is its own bucket, NOT direct. See the note at the top.
      const source = r.referrer_source === '' || r.referrer_source == null
        ? 'unattributed'
        : r.referrer_source;
      put(r.day, source, { sessions: num(r.sessions) });
    }

    const sales = await shopifyql(
      `FROM sales SHOW orders, total_sales GROUP BY order_referrer_source TIMESERIES day ` +
      `SINCE ${c.since} UNTIL ${c.until}`
    );
    for (const r of sales.rows) {
      // Empty string here IS the no-referrer bucket, which sessions calls 'direct'.
      const source = r.order_referrer_source === '' || r.order_referrer_source == null
        ? 'direct'
        : r.order_referrer_source;
      put(r.day, source, { orders: num(r.orders), total_sales: num(r.total_sales) });
    }
  }

  return [...out.values()];
}

async function upsertDaily(pool, rows) {
  if (!rows.length) return 0;
  const cols = ['day', 'sessions', 'orders', 'new_customers', 'returning_customers',
                'total_sales', 'average_order_value', 'conversion_rate'];
  const values = rows.map((r) => cols.map((c) => r[c]));
  const { rowCount } = await pool.query(
    `insert into shopify_daily (${cols.join(', ')})
     select * from unnest(
       $1::date[], $2::integer[], $3::integer[], $4::integer[], $5::integer[],
       $6::numeric[], $7::numeric[], $8::numeric[])
     on conflict (day) do update set
       sessions            = excluded.sessions,
       orders              = excluded.orders,
       new_customers       = excluded.new_customers,
       returning_customers = excluded.returning_customers,
       total_sales         = excluded.total_sales,
       average_order_value = excluded.average_order_value,
       conversion_rate     = excluded.conversion_rate,
       captured_at         = now()`,
    cols.map((_, i) => values.map((v) => v[i]))
  );
  return rowCount;
}

async function upsertReferrer(pool, rows) {
  if (!rows.length) return 0;
  const cols = ['day', 'referrer_source', 'sessions', 'orders', 'total_sales'];
  const values = rows.map((r) => cols.map((c) => r[c]));
  const { rowCount } = await pool.query(
    `insert into shopify_referrer_daily (${cols.join(', ')})
     select * from unnest($1::date[], $2::text[], $3::integer[], $4::integer[], $5::numeric[])
     on conflict (day, referrer_source) do update set
       sessions    = excluded.sessions,
       orders      = excluded.orders,
       total_sales = excluded.total_sales,
       captured_at = now()`,
    cols.map((_, i) => values.map((v) => v[i]))
  );
  return rowCount;
}


/**
 * Compare what the job is about to write against what is already stored, for the days that
 * overlap. Reported BEFORE the upsert overwrites anything.
 *
 * This is the only cheap check that the job agrees with the hand-built backfill. The
 * incremental window naturally overlaps a fortnight of already-verified data, so a first
 * run is a correctness test rather than just a smoke test — and any later drift (a changed
 * ShopifyQL metric, a renamed referrer bucket) shows up as a diff instead of silently
 * replacing 1,233 good rows with subtly different ones.
 *
 * Differences are not always wrong: Shopify revises recent days as refunds and late
 * attribution land, so movement in the last few days is expected. Movement in a day weeks
 * old is not, and that is the signal worth seeing.
 *
 * Note the `day::text` cast. node-postgres parses a `date` column into a JS Date in the
 * container's timezone, which can shift the calendar day by one and make every row look
 * changed. Comparing text sidesteps it entirely.
 */
async function reportDrift(pool, rows, { table, key, fields }) {
  const days = [...new Set(rows.map((r) => r.day))];
  if (!days.length) return;

  // Compare at the column's own precision. average_order_value is numeric(12,2), so
  // Shopify's 574.887 and the stored 574.89 are the same value — the write changes
  // nothing. Reporting that as drift buries the differences that matter in noise.
  const { rows: scales } = await pool.query(
    `select column_name, numeric_scale
       from information_schema.columns
      where table_name = $1 and numeric_scale is not null`, [table]
  );
  const scaleOf = new Map(scales.map((c) => [c.column_name, c.numeric_scale]));
  const atScale = (v, f) => {
    if (v === null) return null;
    const scale = scaleOf.get(f);
    return scale === undefined ? Number(v) : Number(Number(v).toFixed(scale));
  };

  const { rows: existing } = await pool.query(
    `select *, day::text as day_key from ${table} where day = any($1::date[])`, [days]
  );
  if (!existing.length) {
    console.log(`  ${table}: no existing rows in this window — nothing to compare`);
    return;
  }

  const keyOf = (r, dayValue) => key.map((k) => (k === 'day' ? dayValue : r[k])).join('|');
  const index = new Map(existing.map((e) => [keyOf(e, e.day_key), e]));

  const diffs = [];
  let changedRows = 0;
  let newRows = 0;

  for (const r of rows) {
    const found = index.get(keyOf(r, r.day));
    if (!found) {
      newRows++;
      diffs.push(`${r.day} ${r.referrer_source ?? ''} NEW ROW`.replace(/ +/g, ' ').trim());
      continue;
    }
    let rowChanged = false;
    for (const f of fields) {
      const before = atScale(found[f], f);
      const after = atScale(r[f], f);
      // Both-null counts as the same; otherwise compare at the column's stored precision.
      const same = (before === null && after === null) ||
        (before !== null && after !== null && Math.abs(before - after) < 1e-9);
      if (!same) {
        rowChanged = true;
        diffs.push(`${r.day} ${r.referrer_source ?? ''} ${f}: ${before} -> ${after}`.replace(/ +/g, ' '));
      }
    }
    if (rowChanged) changedRows++;
  }

  if (!diffs.length) {
    console.log(`  ${table}: all ${rows.length} rows identical to what is stored`);
    return;
  }

  console.log(
    `  ${table}: ${rows.length} rows — ${changedRows} changed, ${newRows} new, ` +
    `${rows.length - changedRows - newRows} identical`
  );
  for (const d of diffs.slice(0, 40)) console.log(`      ${d}`);
  if (diffs.length > 40) console.log(`      ... and ${diffs.length - 40} more differences`);
}

export default async function shopifyAnalytics(ctx) {
  const pool = db();
  const { since, until, timeZone } = await resolveWindow(pool, ctx.args);

  if (daysBetween(since, until) < 0) {
    throw new Error(`window runs backwards: ${since} .. ${until}`);
  }

  const span = daysBetween(since, until) + 1;
  console.log(`  window          ${since} .. ${until} (${span} days, shop tz ${timeZone})`);

  const daily = await pullDaily(since, until);
  const referrer = await pullReferrer(since, until);

  // Shopify returns a row for every day in range, including zero days. A short result means
  // the window was truncated — worth saying out loud rather than silently storing a gap.
  if (daily.length < span) {
    console.warn(`  WARNING: ${span - daily.length} of ${span} days missing from the daily result`);
  }

  // Compare before overwriting — see reportDrift.
  await reportDrift(pool, daily, {
    table: 'shopify_daily',
    key: ['day'],
    fields: ['sessions', 'orders', 'new_customers', 'returning_customers',
             'total_sales', 'average_order_value', 'conversion_rate'],
  });
  await reportDrift(pool, referrer, {
    table: 'shopify_referrer_daily',
    key: ['day', 'referrer_source'],
    fields: ['sessions', 'orders', 'total_sales'],
  });

  const wroteDaily = await upsertDaily(pool, daily);
  const wroteReferrer = await upsertReferrer(pool, referrer);

  console.log(`  shopify_daily           ${wroteDaily} rows`);
  console.log(`  shopify_referrer_daily  ${wroteReferrer} rows`);

  ctx.rowsWritten = wroteDaily + wroteReferrer;
  ctx.cursor = until;
  return { since, until, wroteDaily, wroteReferrer };
}
