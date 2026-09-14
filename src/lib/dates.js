/**
 * Calendar-date helpers that never touch the local timezone.
 *
 * Shopify reports analytics in the SHOP's timezone (Asia/Dubai, UTC+4). Railway containers
 * run in UTC. Computing "today" with `new Date()` in the container is therefore wrong for
 * four hours out of every twenty-four, and wrong in the direction that silently drops the
 * most recent day. This has already produced three wrong readings of this store's data in
 * ad-hoc queries; it is not a hypothetical.
 *
 * Everything here works on 'YYYY-MM-DD' strings and does its arithmetic in UTC, which for
 * whole calendar days is exact.
 */

/** Today's calendar date in the given IANA timezone, as 'YYYY-MM-DD'. */
export function todayIn(timeZone) {
  // en-CA formats as YYYY-MM-DD, which is what we want and what sv-SE also gives.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date());
}

export function addDays(isoDate, n) {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function daysBetween(a, b) {
  const ms = new Date(`${b}T00:00:00Z`) - new Date(`${a}T00:00:00Z`);
  return Math.round(ms / 86_400_000);
}

/** Inclusive [since, until] split into consecutive chunks of at most `size` days. */
export function chunkRange(since, until, size) {
  if (size < 1) throw new Error('chunk size must be at least 1 day');
  const chunks = [];
  let start = since;
  while (daysBetween(start, until) >= 0) {
    let end = addDays(start, size - 1);
    if (daysBetween(end, until) < 0) end = until; // clamp the final chunk
    chunks.push({ since: start, until: end });
    start = addDays(end, 1);
  }
  return chunks;
}
