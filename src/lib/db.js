import pg from 'pg';

const { Pool } = pg;

// Supabase terminates TLS with a certificate this container does not have in its trust
// store. rejectUnauthorized:false keeps the connection encrypted but does not verify the
// peer. Acceptable here because the host is pinned in DATABASE_URL and the alternative is
// shipping a CA bundle; revisit if this ever talks to a database we do not control.
const ssl = process.env.PGSSL_DISABLE === '1'
  ? false
  : { rejectUnauthorized: false };

/**
 * Supabase publishes three connection strings and only one of them works from here.
 *
 * The DIRECT connection (db.<ref>.supabase.co) has an AAAA record and no A record unless
 * the project buys the IPv4 add-on. Railway containers have no IPv6 egress, so pg resolves
 * an address it cannot route to and fails with ENETUNREACH — an error that names neither
 * Supabase nor IPv6 and reads like a Railway outage. It cost one deploy already.
 *
 * The SESSION POOLER (aws-N-<region>.pooler.supabase.com:5432) is IPv4 on every plan and
 * is full Postgres. That is what belongs in DATABASE_URL.
 *
 * The TRANSACTION POOLER (:6543) is also IPv4 but drops the connection back to the pool
 * after every transaction: no prepared statements, no session state, no advisory locks
 * held across statements. Fine for a single-statement read, wrong for the bulk upserts
 * these jobs do. Warn rather than refuse — it will appear to work, which is the danger.
 */
function checkHost(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error('DATABASE_URL is not a valid URL.');
  }

  if (/^db\..*\.supabase\.co$/.test(parsed.hostname)) {
    throw new Error(
      `DATABASE_URL points at the Supabase DIRECT connection (${parsed.hostname}), which ` +
      'is IPv6-only. This container has no IPv6 route, so it will fail with ENETUNREACH.\n' +
      'Use the SESSION POOLER instead: Supabase project -> Connect -> Session pooler ' +
      '(host aws-N-<region>.pooler.supabase.com, port 5432, user postgres.<project-ref>).'
    );
  }

  if (parsed.hostname.endsWith('.pooler.supabase.com') && parsed.port === '6543') {
    console.warn(
      '[db] WARNING: DATABASE_URL uses the Supabase TRANSACTION pooler (:6543). It has no ' +
      'prepared statements and keeps no session state between transactions. Prefer the ' +
      'Session pooler on :5432 for ingest jobs.'
    );
  }
}

let pool;

export function db() {
  if (!pool) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        'DATABASE_URL is not set. On Railway this is a shared variable that each service ' +
        'must reference; locally copy .env.example to .env. Get the value from the ' +
        'Supabase project page -> Connect -> Session pooler.'
      );
    }
    checkHost(url);
    pool = new Pool({
      connectionString: url,
      ssl,
      // A job container should fail fast rather than hang on a bad host.
      connectionTimeoutMillis: 10_000,
      max: 4,
    });
  }
  return pool;
}

export async function closeDb() {
  if (pool) {
    await pool.end();
    pool = undefined;
  }
}
