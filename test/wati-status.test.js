import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyStatus } from '../src/jobs/wati-broadcasts.js';

test('recognises delivery', () => {
  for (const s of ['delivered', 'DELIVERED', 'Delivered', 'read', 'seen']) {
    assert.deepEqual(classifyStatus(s), { delivered: true, failed: false }, s);
  }
});

test('recognises failure, and failure wins over any delivery wording', () => {
  for (const s of ['failed', 'FAILED', 'error', 'undelivered']) {
    assert.deepEqual(classifyStatus(s), { delivered: false, failed: true }, s);
  }
});

test('an unknown or empty status claims nothing', () => {
  // The status field is an undocumented free string. Anything unrecognised must record the
  // send only — inventing a delivery would corrupt the cohort this data exists for.
  for (const s of ['sent', 'queued', 'pending', 'wibble', '', null, undefined]) {
    assert.deepEqual(classifyStatus(s), { delivered: false, failed: false }, String(s));
  }
});

import { watiBase, watiAccountId } from '../src/lib/wati.js';

test('the v3 base strips the account number and any version suffix', () => {
  // v3 takes no account number: with it every path 404s with an empty body, without it they
  // 401. Verified against the live API, 14 Sep 2026.
  const want = 'https://live-mt-server.wati.io';
  for (const given of [
    'https://live-mt-server.wati.io/334873',
    'https://live-mt-server.wati.io/334873/',
    'https://live-mt-server.wati.io/334873/api/ext/v3',
    'https://live-mt-server.wati.io/334873/api/ext/v3/',
    'https://live-mt-server.wati.io/334873/api/v1',
    'https://live-mt-server.wati.io/api/ext/v3',
    'https://live-mt-server.wati.io',
    '  https://live-mt-server.wati.io/334873  ',
  ]) {
    assert.equal(watiBase(given), want, given);
  }
});

test('the account number is still recoverable, for v1 if it is ever needed', () => {
  assert.equal(watiAccountId('https://live-mt-server.wati.io/334873'), '334873');
  assert.equal(watiAccountId('https://live-mt-server.wati.io/334873/api/ext/v3'), '334873');
  assert.equal(watiAccountId('https://live-mt-server.wati.io'), null);
});
