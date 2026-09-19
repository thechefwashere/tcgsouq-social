import test from 'node:test';
import assert from 'node:assert/strict';
import { normalisePhone, isE164 } from '../src/lib/phone.js';

test('keeps a well-formed international number', () => {
  assert.equal(normalisePhone('+971502950782'), '+971502950782');
  assert.equal(normalisePhone('+447911123456'), '+447911123456');
});

test('strips the punctuation humans type', () => {
  for (const s of ['+971 50 295 0782', '+971-50-295-0782', '+971 (50) 295.0782', '+971/50/2950782']) {
    assert.equal(normalisePhone(s), '+971502950782', s);
  }
});

test('collapses a doubled plus and converts 00', () => {
  assert.equal(normalisePhone('++971502950782'), '+971502950782');
  assert.equal(normalisePhone('00971502950782'), '+971502950782');
});

test('expands the local UAE forms, and only those', () => {
  assert.equal(normalisePhone('502950782'), '+971502950782');    // 5XXXXXXXX
  assert.equal(normalisePhone('0502950782'), '+971502950782');   // 05XXXXXXXX
  assert.equal(normalisePhone('971502950782'), '+971502950782'); // code present, no + 
});

test('repairs +9710 — the stray zero the backfill found', () => {
  assert.equal(normalisePhone('+9710502950782'), '+971502950782');
});

test('refuses to repair +9710 when the result is not a UAE mobile', () => {
  assert.equal(normalisePhone('+97104445555'), null);   // landline-shaped, ambiguous
  assert.equal(normalisePhone('+971050295078'), null);  // one digit short after repair
});

test('returns null rather than guessing a country code', () => {
  assert.equal(normalisePhone('2950782'), null);        // bare local, unknown country
  assert.equal(normalisePhone('12345'), null);          // too short
  assert.equal(normalisePhone('+0123456789'), null);    // E.164 forbids a leading 0
  assert.equal(normalisePhone('+9715029507821234567'), null); // too long
});

test('returns null for absent or non-numeric input', () => {
  for (const s of [null, undefined, '', '   ', 'n/a', 'call me', '+971abc123456', '---']) {
    assert.equal(normalisePhone(s), null, JSON.stringify(s));
  }
});

test('accepts a number object as well as a string', () => {
  assert.equal(normalisePhone(971502950782), '+971502950782');
});

test('every non-null result satisfies the database check constraint', () => {
  const inputs = ['+971502950782', '0502950782', '971502950782', '+9710502950782',
                  '00971502950782', '+971 50 295 0782', 'rubbish', null, '12345'];
  for (const raw of inputs) {
    const out = normalisePhone(raw);
    if (out !== null) assert.ok(isE164(out), `${raw} -> ${out}`);
  }
});
