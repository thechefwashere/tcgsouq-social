import { db } from './db.js';

/**
 * Every job writes a row to ingest_runs — start, finish, outcome.
 *
 * This exists because of how FairDrop fails: errors get swallowed and turned into
 * plausible-looking data, so a broken source looks identical to a quiet one. A source
 * with no recent `ok` row is broken. Without this table you cannot tell.
 */
export async function withIngestRun(source, fn, args = {}) {
  const pool = db();
  const { rows } = await pool.query(
    `insert into ingest_runs (source, status) values ($1, 'running') returning id`,
    [source]
  );
  const runId = rows[0].id;
  const started = Date.now();

  // Jobs report progress through this; whatever they set is persisted on completion.
  const ctx = { runId, rowsWritten: 0, cursor: null, args };

  try {
    const result = await fn(ctx);
    await pool.query(
      `update ingest_runs
          set finished_at = now(), status = 'ok', rows_written = $2, cursor = $3
        where id = $1`,
      [runId, ctx.rowsWritten, ctx.cursor]
    );
    console.log(
      `[${source}] ok — ${ctx.rowsWritten} rows in ${((Date.now() - started) / 1000).toFixed(1)}s`
    );
    return result;
  } catch (err) {
    // Persist the failure before rethrowing, so a crashed container still leaves a trace.
    const message = err && err.stack ? err.stack : String(err);
    await pool
      .query(
        `update ingest_runs
            set finished_at = now(),
                status = case when $2 > 0 then 'partial' else 'failed' end,
                rows_written = $2, cursor = $3, error = $4
          where id = $1`,
        [runId, ctx.rowsWritten, ctx.cursor, message.slice(0, 4000)]
      )
      .catch(() => {
        // If even this fails the database is unreachable; the throw below is all we have.
      });
    console.error(`[${source}] FAILED after ${ctx.rowsWritten} rows`);
    throw err;
  }
}
