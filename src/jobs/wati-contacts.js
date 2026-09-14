import { db } from '../lib/db.js';
import { watiPages } from '../lib/wati.js';
import { normalisePhone } from '../lib/phone.js';

/**
 * Archives the Wati contact list, and — the part that actually matters — the consent state
 * attached to each contact.
 *
 * Those consent records exist today in exactly one place: Wati's own database. There is no
 * export tooling, the account is being migrated away from, and under UAE data-protection
 * law they are the evidence that every message sent was permitted. Losing them is not a
 * data-quality problem, it is a compliance one. That is why this job runs before anything
 * that publishes.
 *
 * CONSENT IS WRITTEN AS A CHANGELOG, NOT A SNAPSHOT. consent_events is append-only and has
 * no unique key, so a naive re-run would duplicate every row nightly. Instead a row is
 * written only when the state actually differs from the last thing recorded for that phone.
 * A contact whose consent never changes produces exactly one row, ever.
 */

const PAGE_SIZE = Number(process.env.WATI_PAGE_SIZE || 100);

/** Wati gives `phone` and `wa_id`; either may be blank or unnormalisable. */
function contactPhone(c) {
  return normalisePhone(c.phone) ?? normalisePhone(c.wa_id);
}

function attributesOf(c) {
  const custom = {};
  for (const p of c.custom_params ?? []) {
    if (p?.name) custom[p.name] = p.value ?? null;
  }
  return {
    wati_contact_status: c.contact_status ?? null,
    wati_source: c.source ?? null,
    channel_type: c.channel_type ?? null,
    teams: c.teams ?? [],
    segments: c.segments ?? [],
    opted_in: c.opted_in ?? null,
    allow_broadcast: c.allow_broadcast ?? null,
    allow_sms: c.allow_sms ?? null,
    custom: custom,
  };
}

async function upsertContacts(pool, batch) {
  if (!batch.length) return 0;
  const cols = ['phone_e164', 'wati_id', 'display_name', 'attributes', 'first_seen_at', 'last_seen_at'];
  const { rowCount } = await pool.query(
    `insert into wa_contacts (${cols.join(', ')})
     select * from unnest($1::text[], $2::text[], $3::text[], $4::jsonb[], $5::timestamptz[], $6::timestamptz[])
     on conflict (phone_e164) do update set
       wati_id       = excluded.wati_id,
       display_name  = excluded.display_name,
       attributes    = excluded.attributes,
       -- Keep the earliest first_seen we have ever observed, not the latest snapshot's.
       first_seen_at = least(wa_contacts.first_seen_at, excluded.first_seen_at),
       last_seen_at  = greatest(wa_contacts.last_seen_at, excluded.last_seen_at),
       captured_at   = now()`,
    [
      batch.map((c) => c.phone_e164),
      batch.map((c) => c.wati_id),
      batch.map((c) => c.display_name),
      batch.map((c) => JSON.stringify(c.attributes)),
      batch.map((c) => c.first_seen_at),
      batch.map((c) => c.last_seen_at),
    ]
  );
  return rowCount;
}

/**
 * Append a consent event only if it changes the recorded state.
 *
 * `occurred_at` is Wati's last_updated, and the evidence records plainly that this is when
 * Wati last touched the contact — NOT an observed moment of consent. Wati does not expose
 * one. Overstating that in a compliance record would be worse than admitting the limit.
 */
async function recordConsent(pool, batch) {
  if (!batch.length) return 0;
  const phones = batch.map((c) => c.phone_e164);

  const { rows: latest } = await pool.query(
    `select distinct on (phone_e164, event) phone_e164, event, occurred_at
       from consent_events
      where phone_e164 = any($1::text[]) and source = 'wati_import'
      order by phone_e164, event, occurred_at desc, id desc`,
    [phones]
  );
  const seen = new Set(latest.map((r) => `${r.phone_e164}|${r.event}`));

  const toWrite = [];
  for (const c of batch) {
    const optedIn = c.attributes.opted_in === true || c.attributes.allow_broadcast === true;
    const event = optedIn ? 'opt_in' : 'opt_out';

    // Only write when this phone has no record of THIS state yet. A contact that has always
    // been opted in writes one row and never writes again.
    if (seen.has(`${c.phone_e164}|${event}`)) continue;

    toWrite.push({
      phone_e164: c.phone_e164,
      event,
      occurred_at: c.last_seen_at ?? c.first_seen_at ?? new Date().toISOString(),
      evidence: {
        note: 'Imported from the Wati contact list. occurred_at is Wati last_updated, which '
            + 'is when Wati last modified the contact — not an observed consent action. '
            + 'Wati exposes no consent timestamp.',
        opted_in: c.attributes.opted_in,
        allow_broadcast: c.attributes.allow_broadcast,
        allow_sms: c.attributes.allow_sms,
        wati_contact_status: c.attributes.wati_contact_status,
        wati_source: c.attributes.wati_source,
      },
    });
  }

  if (!toWrite.length) return 0;
  const { rowCount } = await pool.query(
    `insert into consent_events (phone_e164, event, source, occurred_at, evidence)
     select * from unnest($1::text[], $2::text[], $3::text[], $4::timestamptz[], $5::jsonb[])`,
    [
      toWrite.map((e) => e.phone_e164),
      toWrite.map((e) => e.event),
      toWrite.map(() => 'wati_import'),
      toWrite.map((e) => e.occurred_at),
      toWrite.map((e) => JSON.stringify(e.evidence)),
    ]
  );
  return rowCount;
}

export default async function watiContacts(ctx) {
  const pool = db();

  let seen = 0;
  let written = 0;
  let consentWritten = 0;
  let unusablePhone = 0;

  for await (const { page, items } of watiPages('/api/ext/v3/contacts', {
    pageSize: PAGE_SIZE,
    listKey: 'contact_list',
  })) {
    seen += items.length;

    const batch = [];
    for (const c of items) {
      const phone = contactPhone(c);
      if (!phone) { unusablePhone++; continue; }
      batch.push({
        phone_e164: phone,
        wati_id: c.id ?? null,
        display_name: c.display_name || c.name || null,
        attributes: attributesOf(c),
        first_seen_at: c.created ?? null,
        last_seen_at: c.last_updated ?? c.created ?? null,
      });
    }

    // De-duplicate within the page: two Wati contacts can normalise to one number, and
    // unnest + on conflict cannot update the same row twice in one statement.
    const unique = [...new Map(batch.map((c) => [c.phone_e164, c])).values()];

    written += await upsertContacts(pool, unique);
    consentWritten += await recordConsent(pool, unique);
    ctx.rowsWritten = written + consentWritten;

    if (page % 10 === 0) console.log(`  page ${page}: ${seen} contacts seen, ${written} stored`);
  }

  console.log(`  contacts seen     ${seen}`);
  console.log(`  contacts stored   ${written}`);
  console.log(`  consent events    ${consentWritten} new`);
  console.log(`  unusable phone    ${unusablePhone}`);

  return { seen, written, consentWritten, unusablePhone };
}
