import { db } from '../lib/db.js';
import { watiGet, watiPages } from '../lib/wati.js';
import { normalisePhone } from '../lib/phone.js';
import { todayIn, addDays } from '../lib/dates.js';

/**
 * Archives broadcast campaigns and who they went to.
 *
 * WHAT WATI CAN AND CANNOT TELL US — this determines what the data is worth.
 *
 * Per BROADCAST, Wati reports total_sent / total_delivered / total_read / total_replied.
 * The read count is real and is stored. (An earlier note in this repo said Wati exposes no
 * read data at all; that was drawn from the /broadcasts/overview endpoint, whose total_open
 * is documented as open LINKS. The per-broadcast statistics object is a different thing and
 * does carry total_read.)
 *
 * Per RECIPIENT, it reports only `status` — an untyped, undocumented string — and no
 * timestamps beyond when the row was created. So we can say "this broadcast was read by 412
 * people" but not WHICH 412.
 *
 * The matched-cohort inference this project is built for needs the per-person version:
 * read versus delivered-unread within one broadcast. That still has to come from Meta's
 * WABA webhook, which reports sent/delivered/read against each phone number. Wati's role
 * here is the archive and the aggregate.
 *
 * Accordingly this job fills sent_at and delivered_at where the status plainly says so, and
 * leaves read_at NULL for Meta to fill. It never guesses a read.
 */

const PAGE_SIZE = Number(process.env.WATI_PAGE_SIZE || 100);

// The broadcasts endpoint requires a date range. Default is a wide backfill on first run
// and a short window afterwards, because a broadcast's statistics keep moving for a day or
// two as deliveries and reads land.
const LOOKBACK_DAYS = Number(process.env.WATI_LOOKBACK_DAYS || 30);
const HISTORY_START = process.env.WATI_HISTORY_START || '2023-01-01';

/**
 * Wati's per-recipient status has no documented enum, so it is matched loosely and
 * conservatively. Anything unrecognised records the send only; it never invents a delivery.
 */
export function classifyStatus(status) {
  const s = String(status ?? '').toLowerCase();
  if (!s) return { delivered: false, failed: false };
  if (s.includes('fail') || s.includes('error') || s.includes('undeliver')) {
    return { delivered: false, failed: true };
  }
  // 'read' implies delivery; the read timestamp itself still comes from Meta.
  if (s.includes('deliver') || s.includes('read') || s.includes('seen')) {
    return { delivered: true, failed: false };
  }
  return { delivered: false, failed: false };
}

async function resolveWindow(pool, args) {
  const until = args.until || todayIn('Asia/Muscat');
  if (args.since) return { since: args.since, until };
  const { rows } = await pool.query(
    `select to_char(max(started_at) at time zone 'UTC', 'YYYY-MM-DD') as latest from wa_broadcasts`
  );
  return { since: rows[0].latest ? addDays(rows[0].latest, -LOOKBACK_DAYS) : HISTORY_START, until };
}

async function upsertBroadcast(pool, b, stats) {
  const { rowCount } = await pool.query(
    `insert into wa_broadcasts
       (id, name, template_name, started_at, total_sent, total_delivered, total_read,
        total_replied, total_failed)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     on conflict (id) do update set
       name            = excluded.name,
       template_name   = excluded.template_name,
       started_at      = excluded.started_at,
       total_sent      = excluded.total_sent,
       total_delivered = excluded.total_delivered,
       total_read      = excluded.total_read,
       total_replied   = excluded.total_replied,
       total_failed    = excluded.total_failed,
       captured_at     = now()`,
    [
      b.id, b.name ?? null, b.template_id ?? null,
      b.scheduled_at ?? b.created ?? null,
      stats?.total_sent ?? null, stats?.total_delivered ?? null, stats?.total_read ?? null,
      stats?.total_replied ?? null, stats?.total_failed ?? null,
    ]
  );
  return rowCount;
}

/**
 * wa_messages.phone_e164 is a foreign key into wa_contacts, so a recipient whose number is
 * not already a contact would fail the insert and take the whole broadcast with it. The
 * recipient row carries enough to create a minimal contact, so it does — a message we
 * cannot attribute to anyone is worse than a contact with a sparse record.
 */
async function ensureContacts(pool, recipients) {
  if (!recipients.length) return;
  await pool.query(
    `insert into wa_contacts (phone_e164, wati_id, display_name, attributes)
     select * from unnest($1::text[], $2::text[], $3::text[], $4::jsonb[])
     on conflict (phone_e164) do nothing`,
    [
      recipients.map((r) => r.phone_e164),
      recipients.map((r) => r.contact_id ?? null),
      recipients.map((r) => r.contact_name ?? null),
      recipients.map(() => JSON.stringify({ created_from: 'wati_broadcast_recipient' })),
    ]
  );
}

async function upsertMessages(pool, rows) {
  if (!rows.length) return 0;
  const { rowCount } = await pool.query(
    `insert into wa_messages
       (id, phone_e164, broadcast_id, template_name, direction, sent_at, delivered_at,
        failed_at, failure_reason)
     select * from unnest($1::text[], $2::text[], $3::text[], $4::text[], $5::text[],
                          $6::timestamptz[], $7::timestamptz[], $8::timestamptz[], $9::text[])
     on conflict (id) do update set
       phone_e164     = excluded.phone_e164,
       broadcast_id   = excluded.broadcast_id,
       template_name  = excluded.template_name,
       sent_at        = excluded.sent_at,
       delivered_at   = excluded.delivered_at,
       failed_at      = excluded.failed_at,
       failure_reason = excluded.failure_reason,
       captured_at    = now()`,
    // read_at is deliberately absent from the update list: Meta owns that column, and a
    // nightly Wati run must never wipe a read timestamp the webhook has already recorded.
    [
      rows.map((r) => r.id), rows.map((r) => r.phone_e164), rows.map((r) => r.broadcast_id),
      rows.map((r) => r.template_name), rows.map(() => 'outbound'),
      rows.map((r) => r.sent_at), rows.map((r) => r.delivered_at),
      rows.map((r) => r.failed_at), rows.map((r) => r.failure_reason),
    ]
  );
  return rowCount;
}

export default async function watiBroadcasts(ctx) {
  const pool = db();
  const { since, until } = await resolveWindow(pool, ctx.args);
  console.log(`  window          ${since} .. ${until}`);

  let broadcasts = 0;
  let messages = 0;
  let unusablePhone = 0;

  for await (const { items } of watiPages('/api/ext/v3/broadcasts', {
    pageSize: PAGE_SIZE,
    listKey: 'broadcasts',
    params: { date_from: since, date_to: until },
  })) {
    for (const b of items) {
      if (!b?.id) continue;

      // The list endpoint has no statistics; the detail endpoint does.
      let stats = null;
      try {
        const detail = await watiGet(`/api/ext/v3/broadcasts/${encodeURIComponent(b.id)}`);
        stats = detail?.statistics ?? null;
      } catch (err) {
        console.warn(`  broadcast ${b.id}: statistics unavailable (${err.message.split('\n')[0]})`);
      }

      await upsertBroadcast(pool, b, stats);
      broadcasts++;

      for await (const { items: recips } of watiPages(
        `/api/ext/v3/broadcasts/${encodeURIComponent(b.id)}/recipients`,
        { pageSize: PAGE_SIZE, listKey: 'recipients' }
      )) {
        const rows = [];
        for (const r of recips) {
          const phone = normalisePhone(r.contact_phone);
          // Without a message id there is no stable key, and without a phone there is no
          // identity — either way the row cannot join to anything, so it is counted not stored.
          if (!phone || !r.message_id) { unusablePhone++; continue; }
          const { delivered, failed } = classifyStatus(r.status);
          rows.push({
            id: r.message_id,
            phone_e164: phone,
            broadcast_id: b.id,
            template_name: b.template_id ?? null,
            sent_at: r.created ?? null,
            delivered_at: delivered ? (r.created ?? null) : null,
            failed_at: failed ? (r.created ?? null) : null,
            failure_reason: failed ? (r.failed_code ?? r.status ?? null) : null,
            contact_id: r.contact_id ?? null,
            contact_name: r.contact_name ?? null,
          });
        }

        const unique = [...new Map(rows.map((r) => [r.id, r])).values()];
        await ensureContacts(pool, [...new Map(unique.map((r) => [r.phone_e164, r])).values()]);
        messages += await upsertMessages(pool, unique);
        ctx.rowsWritten = broadcasts + messages;
      }
    }
  }

  console.log(`  broadcasts      ${broadcasts}`);
  console.log(`  messages        ${messages}`);
  console.log(`  unusable rows   ${unusablePhone}`);
  ctx.cursor = until;

  return { since, until, broadcasts, messages, unusablePhone };
}
