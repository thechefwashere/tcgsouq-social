import test from 'node:test';
import assert from 'node:assert/strict';
import { addDays, daysBetween, chunkRange, todayIn } from '../src/lib/dates.js';

test('addDays crosses months, years and leap days', () => {
  assert.equal(addDays('2026-02-28', 1), '2026-03-01');
  assert.equal(addDays('2024-02-28', 1), '2024-02-29'); // leap year
  assert.equal(addDays('2026-01-01', -1), '2025-12-31');
  assert.equal(addDays('2026-12-31', 1), '2027-01-01');
});

test('daysBetween is inclusive-exclusive and signed', () => {
  assert.equal(daysBetween('2026-09-01', '2026-09-14'), 13);
  assert.equal(daysBetween('2026-09-14', '2026-09-14'), 0);
  assert.equal(daysBetween('2026-09-14', '2026-09-01'), -13);
});

test('chunks are consecutive, non-overlapping, and cover the range exactly', () => {
  const chunks = chunkRange('2023-05-01', '2026-09-14', 90);
  assert.equal(chunks[0].since, '2023-05-01');
  assert.equal(chunks.at(-1).until, '2026-09-14');
  for (let i = 1; i < chunks.length; i++) {
    assert.equal(chunks[i].since, addDays(chunks[i - 1].until, 1), `gap or overlap at chunk ${i}`);
  }
  for (const c of chunks) {
    assert.ok(daysBetween(c.since, c.until) >= 0, 'chunk runs backwards');
    assert.ok(daysBetween(c.since, c.until) < 90, 'chunk longer than requested');
  }
  const total = chunks.reduce((n, c) => n + daysBetween(c.since, c.until) + 1, 0);
  assert.equal(total, daysBetween('2023-05-01', '2026-09-14') + 1, 'days lost or double-counted');
});

test('a single-day range yields one single-day chunk', () => {
  assert.deepEqual(chunkRange('2026-01-01', '2026-01-01', 45),
                   [{ since: '2026-01-01', until: '2026-01-01' }]);
});

test('a range shorter than the chunk size is not extended past until', () => {
  assert.deepEqual(chunkRange('2026-01-01', '2026-01-10', 45),
                   [{ since: '2026-01-01', until: '2026-01-10' }]);
});

test('an exact multiple of the chunk size does not emit a trailing empty chunk', () => {
  const chunks = chunkRange('2026-01-01', '2026-01-10', 5);
  assert.deepEqual(chunks, [
    { since: '2026-01-01', until: '2026-01-05' },
    { since: '2026-01-06', until: '2026-01-10' },
  ]);
});

test('an inverted range yields no chunks rather than looping', () => {
  assert.deepEqual(chunkRange('2026-01-10', '2026-01-01', 5), []);
});

test('todayIn respects the timezone, not the container clock', () => {
  // Dubai is UTC+4, so its date is never behind UTC's and at most one day ahead.
  const diff = daysBetween(todayIn('UTC'), todayIn('Asia/Dubai'));
  assert.ok(diff === 0 || diff === 1, `unexpected offset: ${diff}`);
  assert.match(todayIn('Asia/Dubai'), /^\d{4}-\d{2}-\d{2}$/);
});
