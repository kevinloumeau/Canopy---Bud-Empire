import test from 'node:test';
import assert from 'node:assert/strict';
import { migrateProgression, BRANCH_LINE, branchLineFactor, branchStationCost, buyBranchStation, branchStationMax, branchBestStation, storeRate, buyStore, STORES } from '../src/progression.js';
import { BRANCH_STATIONS, branchQueue, BRANCH_THEMES } from '../src/branch-maps.js';

const fresh = (levels = [1, 0, 0, 0, 0]) => migrateProgression({ stores: levels.map(level => ({ level })) });

test('every branch runs the flagship station line, all at Lv 1 when open and none when shut', () => {
  const p = fresh([3, 0, 0, 0, 0]);
  assert.equal(BRANCH_LINE.length, 6);
  assert.deepEqual(p.stores[0].lines, [1, 1, 1, 1, 1, 1]);
  assert.deepEqual(p.stores[1].lines, [0, 0, 0, 0, 0, 0]);
  const kept = migrateProgression({ stores: [{ level: 2, lines: [5, 9, 1, 3, 200, 'x'] }] });
  assert.deepEqual(kept.stores[0].lines, [5, 9, 1, 3, 100, 1], 'levels survive a reload, capped and cleaned');
});

test('the line multiplies branch income from 1x at Lv 1, slowest station weighing most', () => {
  assert.equal(branchLineFactor([1, 1, 1, 1, 1, 1]), 1);
  assert.equal(branchLineFactor([0, 0, 0, 0, 0, 0]), 1);
  const even = branchLineFactor([10, 10, 10, 10, 10, 10]);
  assert.ok(even > 2.5 && even < 3.5, 'Lv 10 across the line is about 3x');
  assert.ok(branchLineFactor([10, 10, 10, 10, 10, 1]) < branchLineFactor([10, 10, 10, 10, 10, 5]), 'raising the slowest pays');
  assert.ok(branchLineFactor([2, 1, 1, 1, 1, 1]) > 1, 'every level counts some');
});

test('buying a branch station level costs cash, raises the level and income, and the best buy is the cheap slow one', () => {
  const state = { money: 1e6, lifetime: 1e9, empire: fresh([2, 0, 0, 0, 0]) };
  const before = storeRate(state.empire, 0), price = branchStationCost(0, 0, 1);
  assert.ok(buyBranchStation(state, 0, 0));
  assert.equal(state.empire.stores[0].lines[0], 2);
  assert.equal(state.money, 1e6 - price);
  assert.ok(storeRate(state.empire, 0) > before);
  assert.ok(branchStationCost(0, 0, 2) > price, 'each level costs more');
  assert.equal(buyBranchStation(state, 1, 0), false, 'a shut branch has no stations to buy');
  state.empire.stores[0].lines = [10, 10, 10, 10, 10, 2];
  assert.equal(branchBestStation(state.empire, 0), 5);
  const max = branchStationMax({ ...state, money: 5000 }, 0, 5);
  assert.ok(max.levels > 1 && max.cost <= 5000);
  const broke = { money: 0, lifetime: 1e9, empire: fresh([2, 0, 0, 0, 0]) };
  assert.equal(buyBranchStation(broke, 0, 0), false);
});

test('opening a branch starts its line at Lv 1', () => {
  const state = { money: 1e9, lifetime: 1e9, empire: fresh([0, 0, 0, 0, 0]) };
  assert.ok(buyStore(state, 0));
  assert.deepEqual(state.empire.stores[0].lines, [1, 1, 1, 1, 1, 1]);
});

test('each branch scene places all six stations inside its plot, with the queue in front of the desks', () => {
  assert.equal(BRANCH_STATIONS.length, STORES.length);
  BRANCH_STATIONS.forEach((spots, i) => {
    const [x0, x1, z0, z1] = BRANCH_THEMES[i].land.plot;
    assert.equal(spots.length, 6);
    spots.forEach(([x, z]) => assert.ok(x > x0 && x < x1 && z > z0 && z < z1, BRANCH_THEMES[i].name + ' station off its plot'));
    const row = spots.slice(0, 4);
    row.slice(1).forEach(([x], k) => assert.ok(x - row[k][0] >= 3, BRANCH_THEMES[i].name + ' production stations overlap'));
    const [order, pickup] = branchQueue(i);
    assert.ok(order[1] > spots[4][1] && pickup[1] > spots[5][1]);
  });
});
