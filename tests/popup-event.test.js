import test from 'node:test';
import assert from 'node:assert/strict';
import { popupWindow, nextPopup, previewWindow, migratePopup, syncPopup, buyStall, stallCost, stallRate, popupRate, bestStall, tickPopup, claimPrize, awayOverlap, popupSalesBonus, popupUnlocked, popupClock, POPUP_STALLS, POPUP_PRIZES, POPUP_STALL_MAX, POPUP_THEMES, POPUP_EVERY_DAYS, POPUP_UNLOCK_LIFETIME } from '../src/popup-event.js';
import { popupWalker, popupCrowd, STALL_X, STALL_W, ARCH, POPUP_PROPS } from '../src/popup-market-layout.js';
import { POPUP_PLOT, popupSlot, DISTRICT_SLOTS, eastHaze } from '../src/branch-districts.js';
import { saleMultiplier } from '../src/progression.js';

const at = (y, m, d, h = 12) => new Date(y, m, d, h).getTime();

test('the first market runs Friday 13 to Monday 16 November 2026, local time, then every third weekend', () => {
  assert.equal(popupWindow(at(2026, 10, 12, 23)), null);
  const w = popupWindow(at(2026, 10, 13, 0));
  assert.equal(w.key, 0);
  assert.equal(new Date(w.start).getDay(), 5, 'opens on a Friday');
  assert.equal(new Date(w.end).getDay(), 1, 'closes at Monday midnight');
  assert.equal(popupWindow(at(2026, 10, 15, 23)).key, 0);
  assert.equal(popupWindow(at(2026, 10, 16, 1)), null);
  const next = nextPopup(at(2026, 10, 14));
  assert.equal(next.key, 1);
  assert.equal(new Date(next.start).getDay(), 5);
  assert.equal(Math.round((next.start - w.start) / 864e5), POPUP_EVERY_DAYS);
  // The themes take turns.
  assert.notEqual(w.theme.id, next.theme.id);
  assert.equal(popupWindow(nextPopup(at(2027, 2, 1)).start + 1).theme.id, POPUP_THEMES[nextPopup(at(2027, 2, 1)).key % 4].id);
});

test('a preview opens the next market now under its real key', () => {
  const now = at(2026, 10, 9), p = previewWindow(now);
  assert.equal(p.key, nextPopup(now).key);
  assert.ok(p.start <= now && p.end > now && p.preview);
});

test('old or broken saves load a closed market', () => {
  const pp = migratePopup(undefined);
  assert.equal(pp.key, -1);
  assert.deepEqual(pp.stalls, [1, 0, 0, 0]);
  assert.deepEqual(pp.keepsakes, []);
  const bad = migratePopup({ key: 2, tickets: -5, stalls: [0, 9, 80, 3], prizes: 99, keepsakes: ['bloom', 'bloom', 'nope'] });
  assert.equal(bad.tickets, 0);
  assert.deepEqual(bad.stalls, [1, 9, 50, 3]);
  assert.equal(bad.prizes, 7);
  assert.deepEqual(bad.keepsakes, ['bloom']);
  const gap = migratePopup({ key: 0, stalls: [4, 0, 5, 2] });
  assert.deepEqual(gap.stalls, [4, 0, 0, 0], 'a stall is only open when the one before it is');
});

test('a new weekend opens a fresh market, a finished one packs up, trophies and keepsakes stay', () => {
  const pp = migratePopup({ key: 0, tickets: 900, earned: 5e7, stalls: [20, 10, 2, 0], prizes: 3, trophies: 1, keepsakes: ['farmers'] });
  assert.equal(syncPopup(pp, { key: 0 }), '');
  assert.equal(syncPopup(pp, null), 'closed');
  assert.equal(pp.key, -1);
  assert.equal(pp.tickets, 0);
  assert.deepEqual(pp.stalls, [1, 0, 0, 0]);
  assert.equal(syncPopup(pp, { key: 1 }), 'opened');
  assert.equal(pp.prizes, 0);
  assert.equal(pp.trophies, 1);
  assert.deepEqual(pp.keepsakes, ['farmers']);
});

test('tickets buy stall levels in order; a closed market sells nothing', () => {
  const pp = migratePopup({ key: 0 });
  assert.equal(buyStall(pp, 1), false, 'the pre-roll cart needs tickets');
  pp.tickets = POPUP_STALLS[1].open;
  assert.equal(buyStall(pp, 2), false, 'edibles open after the pre-roll cart');
  assert.ok(buyStall(pp, 1));
  assert.equal(pp.tickets, 0);
  assert.equal(pp.stalls[1], 1);
  assert.equal(stallCost(0, 1), POPUP_STALLS[0].price);
  assert.ok(stallCost(0, 2) > stallCost(0, 1));
  assert.equal(stallRate(0, 10), 2 * stallRate(0, 5) * 2, 'takings double at level 10');
  pp.stalls[0] = POPUP_STALL_MAX; pp.tickets = 1e30;
  assert.equal(buyStall(pp, 0), false, 'a maxed stall stays maxed');
  const shut = migratePopup({ key: -1, tickets: 1e9 });
  assert.equal(buyStall(shut, 0), false);
  assert.deepEqual(tickPopup(shut, 100), []);
  assert.equal(shut.earned, 0);
});

test('the best buy is an openable, unmaxed stall', () => {
  const pp = migratePopup({ key: 0, stalls: [5, 0, 0, 0] });
  const j = bestStall(pp);
  assert.ok(j === 0 || j === 1);
  pp.stalls = [POPUP_STALL_MAX, 0, 0, 0];
  assert.equal(bestStall(pp), 1);
});

test('prizes pay once each as the takings reach them, and the trophy adds sales for good', () => {
  const pp = migratePopup({ key: 0 });
  pp.stalls = [10, 10, 10, 10];
  const due = tickPopup(pp, POPUP_PRIZES[2].target / popupRate(pp) + 1);
  assert.deepEqual(due, [0, 1, 2]);
  due.forEach(i => assert.ok(claimPrize(pp, i, 'harvest')));
  assert.equal(claimPrize(pp, 0, 'harvest'), false);
  assert.deepEqual(tickPopup(pp, 10), []);
  assert.deepEqual(pp.keepsakes, ['harvest']);
  assert.equal(pp.trophies, 1);
  const bonus = popupSalesBonus(pp);
  assert.ok(bonus > 0);
  const base = { career: 0, shares: 0, stake: 0, stores: [] };
  assert.ok(Math.abs(saleMultiplier({ ...base, popupBonus: bonus }) / saleMultiplier(base) - (1 + bonus)) < 1e-9);
});

test('time away only counts while the market was open', () => {
  const w = { start: 1000e3, end: 2000e3 };
  assert.equal(awayOverlap(w, 0, 500e3), 0);
  assert.equal(awayOverlap(w, 1500e3, 3000e3), 500);
  assert.equal(awayOverlap(null, 0, 3000e3), 0);
});

test('the market waits for an open shop with some takings, and its clock reads short', () => {
  assert.equal(popupUnlocked({ shopOpen: false, lifetime: 1e9 }), false);
  assert.equal(popupUnlocked({ shopOpen: true, lifetime: POPUP_UNLOCK_LIFETIME - 1 }), false);
  assert.equal(popupUnlocked({ shopOpen: true, lifetime: POPUP_UNLOCK_LIFETIME }), true);
  assert.equal(popupClock((2 * 1440 + 4 * 60 + 9) * 60000), '2d 4h');
  assert.equal(popupClock((5 * 60 + 12) * 60000), '5h 12m');
  assert.equal(popupClock(20000), '1m');
});

test('the market fits its plot: tents, arch and props inside, shoppers on the block or the pavement', () => {
  const [x0, x1, z0, z1] = POPUP_PLOT;
  STALL_X.forEach(x => assert.ok(x - STALL_W / 2 >= x0 && x + STALL_W / 2 <= x1));
  assert.ok(ARCH.z <= z1 && Math.abs(ARCH.x) + ARCH.w / 2 <= x1);
  POPUP_PROPS.forEach(p => assert.ok(p.x >= x0 - 1 && p.x <= x1 + 1 && p.z >= z0 - 1 && p.z <= z1 + 1, p.file));
  for (let open = 1; open <= 4; open++) for (let k = 0; k < popupCrowd(open); k++) for (let t = 0; t < 120; t += 3) {
    const w = popupWalker(k, t, open);
    assert.ok(Number.isFinite(w.x) && Number.isFinite(w.z));
    assert.ok(Math.abs(w.x) <= 26 && w.z >= z0 && w.z <= 16);
  }
  assert.equal(popupCrowd(1), 3);
  assert.equal(popupCrowd(4), 9);
});

test('the market takes the first empty block, the spare one when every branch is open', () => {
  assert.equal(popupSlot([0, 0, 0, 0, 0]), 1, 'past the lease lot');
  assert.equal(popupSlot([5, 5, 5, 5, 5]), DISTRICT_SLOTS - 1);
  const levels = [1, 0, 0, 0, 0];
  assert.ok(eastHaze(levels, true)[0] > eastHaze(levels, false)[0], 'the haze opens to show the market');
});
