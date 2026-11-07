import test from 'node:test';
import assert from 'node:assert/strict';
import {tieLast} from '../src/no-lone-words.js';
import {PERKS,perkMax} from '../src/perks.js';

const NBSP = String.fromCharCode(0xa0), JOIN = String.fromCharCode(0x2060);

test('tieLast keeps the last two words of a label together', () => {
  assert.equal(tieLast('Serve 202 customers'), 'Serve 202' + NBSP + 'customers');
  assert.equal(tieLast('Reopen with $1K cash'), 'Reopen with $1K' + NBSP + 'cash');
  assert.equal(tieLast('Sell 100,000 bags '), 'Sell 100,000' + NBSP + 'bags');
  assert.equal(tieLast('Reopen selling pre-rolls'), 'Reopen selling' + NBSP + 'pre-' + JOIN + 'rolls');
});

test('tieLast leaves one- and two-word labels free to wrap', () => {
  assert.equal(tieLast('Meadow Mint'), 'Meadow Mint');
  assert.equal(tieLast('Storage'), 'Storage');
  assert.equal(tieLast(''), '');
});

test('every founder perk blurb ends on a tied pair', () => {
  for (const p of PERKS) for (let l = 0; l <= Math.min(perkMax(p), 12); l++) {
    const t = tieLast(p.blurb(l));
    if (t.trim().split(/\s+/).length > 2) assert.ok(t.includes(NBSP), p.id + ' ' + t);
  }
});
