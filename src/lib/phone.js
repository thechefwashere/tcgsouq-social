/**
 * Phone normalisation to E.164.
 *
 * This is the join key between a WhatsApp contact and a Shopify customer, and it is the
 * whole basis of the read-vs-unread inference. A number that normalises wrongly does not
 * throw — it silently fails to join, and the cohort quietly loses a member. So the rule
 * throughout is: normalise only what is unambiguous, and return null rather than guess a
 * country code.
 *
 * These rules are the ones the 2026-09-14 backfill used (see db/seed/0003_orders_backfill.sql),
 * reproduced exactly so a re-run repairs rows rather than diverging from them.
 */

const E164 = /^\+[1-9][0-9]{7,14}$/;

// UAE mobile: +971 then 5 then 8 digits.
const UAE_MOBILE = /^\+9715[0-9]{8}$/;

export function normalisePhone(raw) {
  if (raw === null || raw === undefined) return null;

  let s = String(raw).trim();
  if (!s) return null;

  // Punctuation humans use and carriers ignore.
  s = s.replace(/[\s\-().\/]/g, '');
  if (!s) return null;

  // '++971...' happens when two systems each add a prefix.
  s = s.replace(/^\++/, '+');

  // International access code.
  if (s.startsWith('00')) s = '+' + s.slice(2);

  if (s.startsWith('+')) {
    if (!/^\+[0-9]+$/.test(s)) return null;

    // A stray 0 between the country code and a UAE subscriber number: +971 0 5XXXXXXXX.
    // Passes a naive E.164 check at 14 characters but is not dialable. The backfill found
    // two of these and repaired them in a follow-up migration; doing it here stops new ones
    // entering. Guarded: only applied when the result is exactly a UAE mobile.
    if (s.startsWith('+9710')) {
      const repaired = '+971' + s.slice(5);
      return UAE_MOBILE.test(repaired) ? repaired : null;
    }

    return E164.test(s) ? s : null;
  }

  if (!/^[0-9]+$/.test(s)) return null;

  // Local UAE forms. Nothing here invents a country code that is not already implied.
  if (/^5[0-9]{8}$/.test(s)) return '+971' + s;              // 5XXXXXXXX
  if (/^05[0-9]{8}$/.test(s)) return '+971' + s.slice(1);    // 05XXXXXXXX
  if (/^9715[0-9]{8}$/.test(s)) return '+' + s;              // 9715XXXXXXXX — code is literally present

  // Anything else: a bare national number from an unknown country, a truncated number,
  // free text that survived the strip. Guessing here would produce a plausible number
  // belonging to someone else.
  return null;
}

export function isE164(s) {
  return typeof s === 'string' && E164.test(s);
}
