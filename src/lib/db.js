import pg from 'pg';

const { Pool } = pg;

// Supabase terminates TLS with a certificate this container does not have in its trust
// store. rejectUnauthorized:false keeps the connection encrypted but does not verify the
// peer. Acceptable here because the host is pinned in DATABASE_URL and the alternative is
// shipping a CA bundle; revisit if this ever talks to a database we do not control.
const ssl = process.env.PGSSL_DISABLE === '1'
  ? false
  : { rejectUnauthorized: false };

let pool;

export function db() {
  if (!pool) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        'DATABASE_URL is not set. On Railway this is a shared variable; ' +
        'locally copy .env.example to .env. Supabase: Connect -> Direct connection.'
      );
    }
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
