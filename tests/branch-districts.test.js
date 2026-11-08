import test from 'node:test';
import assert from 'node:assert/strict';
import { districtCentre, districtBlock, districtPlot, districtTerraces, shownDistricts, eastHaze, districtAt, leaseLot, CROSS_STREETS, MAIN_EAST_HAZE, DISTRICT_COUNT } from '../src/branch-districts.js';
import { townLayout } from '../src/sunny-world.js';

test('each branch has its own block east of the flagship, between two cross streets', () => {
  assert.equal(DISTRICT_COUNT, 5);
  for (let i = 0; i < DISTRICT_COUNT; i++) {
    const b = districtBlock(i), p = districtPlot(i), west = i ? CROSS_STREETS[i - 1] : 42;
    assert.equal(b.x0, west + 3, 'block starts at the west cross street kerb');
    assert.equal(b.x1, CROSS_STREETS[i] - 3, 'block ends at the east cross street kerb');
    assert.ok(p.x0 > b.x0 && p.x1 < b.x1 && p.z0 > b.z0 && p.z1 < b.z1, 'the plot sits inside its block');
    assert.equal(districtAt(districtCentre(i).x), i);
  }
  assert.equal(districtAt(0), -1, 'the flagship is no district');
});

test('the town shows every open branch and only the next lot', () => {
  assert.deepEqual(shownDistricts([0, 0, 0, 0, 0]), [{ index: 0, open: false }]);
  assert.deepEqual(shownDistricts([3, 1, 0, 0, 0]).map(d => d.open), [true, true, false]);
  assert.equal(shownDistricts([1, 1, 1, 1, 1]).length, 5);
  // The east haze clears the last shown block and hides the one after it.
  const haze = eastHaze([3, 0, 0, 0, 0]);
  assert.ok(haze[0] > districtBlock(1).x1 && haze[1] <= districtPlot(2).x0, 'haze between the lease lot and the next plot');
  assert.ok(eastHaze([0, 0, 0, 0, 0])[0] > MAIN_EAST_HAZE[0], 'the first lease lot is always in view');
});

test('neighbouring terraces stay off the plot and the streets', () => {
  for (let i = 0; i < DISTRICT_COUNT; i++) {
    const p = districtPlot(i), b = districtBlock(i);
    districtTerraces(i).forEach(t => {
      const x0 = t.x - t.fit.w / 2, x1 = t.x + t.fit.w / 2, z0 = t.z - t.fit.d / 2, z1 = t.z + t.fit.d / 2;
      assert.ok(x1 <= p.x0 || x0 >= p.x1 || z1 <= p.z0 || z0 >= p.z1, 'clear of the plot');
      assert.ok(x0 >= b.x0 && x1 <= b.x1, 'inside the block between the cross streets');
      assert.ok(t.fit.w <= 11, 'no stretched giant');
    });
  }
  const lot = leaseLot(0);
  lot.props.forEach(q => assert.ok(q.x > lot.x0 && q.x < lot.x1 && q.z > lot.z0 - .5 && q.z < lot.z1, 'lease lot dressing stays on the lot'));
});

test('the town leaves a hole for every plot and runs its streets east to the last block', () => {
  const layout = townLayout();
  assert.ok(layout.eastEnd > CROSS_STREETS[CROSS_STREETS.length - 1]);
  CROSS_STREETS.forEach(x => assert.ok(layout.roads.some(r => r.along === 'z' && r.at === x), 'cross street at ' + x));
  assert.equal(layout.districtPlots.length, DISTRICT_COUNT + 1, "every branch and the market's spare block");
  layout.districtPlots.forEach(p => assert.ok(layout.holes.some(h => h.x0 === p.x0 && h.z1 === p.z1)));
});
