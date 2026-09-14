import { db } from '../lib/db.js';
import { watiGet, watiGetV1 } from '../lib/wati.js';

/**
 * Answers one question and writes nothing: does Wati's API return the TEXT of customer
 * conversations, or only metadata about them?
 *
 * Both the v1 and v3 OpenAPI definitions describe "event" objects — id, created,
 * conversationId, ticketId, eventType — with no text or body field. Generated API docs
 * routinely understate what an endpoint actually returns, and the difference here decides
 * whether three years of customer conversations can be taken out of Wati at all. Guessing
 * either way would be wrong, so this asks the live API.
 *
 * PRIVACY. This prints the SHAPE of the response, never its contents. Field names, value
 * types, string lengths, and whether a field is populated. No message text, no customer
 * names, no phone numbers reach the log — a Railway log is not a place for the store's
 * customer conversations, and proving text exists does not require showing any.
 */

/** A redacted description of a value: enough to reason about, impossible to read. */
function describe(v) {
  if (v === null) return 'null';
  if (v === undefined) return 'absent';
  if (Array.isArray(v)) return `array[${v.length}]`;
  if (typeof v === 'object') return `object{${Object.keys(v).join(',')}}`;
  if (typeof v === 'string') {
    if (v === '') return 'string(empty)';
    // Dates and ids are structural, not personal — showing their format aids diagnosis.
    if (/^\d{4}-\d{2}-\d{2}T/.test(v)) return `string(timestamp)`;
    return `string(len ${v.length})`;
  }
  return `${typeof v}`;
}

function shapeOf(obj, label) {
  console.log(`    ${label}:`);
  for (const [k, v] of Object.entries(obj ?? {})) {
    console.log(`      ${k.padEnd(24)} ${describe(v)}`);
  }
}

/** Field names that would carry message content, if any of them exist. */
const TEXT_FIELDS = ['text', 'body', 'message', 'content', 'caption', 'eventDescription',
                     'messageText', 'data', 'payload'];

function reportTextFields(item) {
  const present = TEXT_FIELDS.filter((f) => item?.[f] !== undefined && item?.[f] !== null && item?.[f] !== '');
  if (present.length) {
    console.log(`    CONTENT FOUND in: ${present.map((f) => `${f} (${describe(item[f])})`).join(', ')}`);
  } else {
    console.log('    NO CONTENT FIELD — every candidate is absent, null or empty');
  }
}

async function probe(label, fn) {
  console.log(`\n  ${label}`);
  try {
    const body = await fn();
    console.log(`    top-level keys: ${Object.keys(body ?? {}).join(', ')}`);

    // Find the first array of objects anywhere shallow in the response — endpoints differ
    // in whether it is called messages, message_list or something else.
    let items = null, itemsKey = null;
    for (const [k, v] of Object.entries(body ?? {})) {
      if (Array.isArray(v) && v.length) { items = v; itemsKey = k; break; }
      if (v && typeof v === 'object') {
        for (const [k2, v2] of Object.entries(v)) {
          if (Array.isArray(v2) && v2.length) { items = v2; itemsKey = `${k}.${k2}`; break; }
        }
      }
      if (items) break;
    }

    if (!items) {
      console.log('    no non-empty item array in the response');
      shapeOf(body, 'body');
      return { label, ok: true, items: 0 };
    }

    console.log(`    items under "${itemsKey}": ${items.length}`);
    shapeOf(items[0], 'first item');
    reportTextFields(items[0]);

    // eventType/type tell us whether these are chat messages or ticket events.
    const kinds = [...new Set(items.map((i) => i?.eventType ?? i?.event_type ?? i?.type).filter(Boolean))];
    if (kinds.length) console.log(`    distinct event/type values: ${kinds.join(', ')}`);

    return { label, ok: true, items: items.length };
  } catch (err) {
    console.log(`    FAILED: ${err.message.split('\n')[0]}`);
    return { label, ok: false, error: err.message };
  }
}

export default async function watiProbe(ctx) {
  const pool = db();

  // A real number from the store's own order history, so the probe hits a contact that
  // plausibly has conversation history. Never printed.
  const { rows } = await pool.query(
    `select phone_e164 from orders
      where phone_e164 is not null and total > 0.01
      order by placed_at desc limit 1`
  );
  if (!rows.length) throw new Error('no order with a usable phone number to probe with');

  const e164 = rows[0].phone_e164;
  const bare = e164.replace(/^\+/, '');
  console.log(`  probing with the most recent real order's number (not shown), ${bare.length} digits`);

  const results = [];
  results.push(await probe('v1  GET /api/v1/getMessages/{number}',
    () => watiGetV1(`/api/v1/getMessages/${bare}`, { pageSize: 20, pageNumber: 1 })));
  results.push(await probe('v3  GET /api/ext/v3/conversations/{number}/messages',
    () => watiGet(`/api/ext/v3/conversations/${bare}/messages`, { page_number: 1, page_size: 20 })));
  results.push(await probe('v3  GET /api/ext/v3/messagetemplates',
    () => watiGet('/api/ext/v3/messagetemplates', { page_number: 1, page_size: 5 })));
  results.push(await probe('v3  GET /api/ext/v3/account/credits',
    () => watiGet('/api/ext/v3/account/credits')));

  console.log('\n  summary');
  for (const r of results) {
    console.log(`    ${r.ok ? 'ok    ' : 'FAILED'} ${r.label}${r.ok ? ` (${r.items} items)` : ''}`);
  }

  ctx.rowsWritten = 0; // probes write nothing
  return results;
}
