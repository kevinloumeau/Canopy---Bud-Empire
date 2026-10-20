import test from 'node:test';
import assert from 'node:assert/strict';
import { streetItems } from '../src/sunny-world.js';

// Street tree pits must sit on the pavement: clear of every kerb, and clear of the facades behind it.
const KERBS = [-18.5, 21.5, -36.5, 40.5].map(at => ({ along: 'x', at })).concat([-22.5, 22.5, -48.5, 42].map(at => ({ along: 'z', at })));
const HALF = { 'street_tree.glb#low': .75, 'tree.glb#low': .46, 'street_tree_grate.glb': .75 };

test('every street tree pit stays on the pavement', () => {
  const jobs = streetItems({ depth: () => 0 });
  const pits = jobs.filter(j => j.model && HALF[j.model.file]).map(j => j.model);
  const trees = jobs.filter(j => j.model && /^(street_)?tree\.glb#lawn$/.test(j.model.file));
  assert.ok(pits.length >= 20);
  assert.equal(pits.length, trees.length);
  const blocks = jobs.filter(j => j.kind === 'building');
  pits.forEach(p => {
    assert.equal(p.rot, 0, 'pit sides run with the kerb');
    const half = HALF[p.file] * 1.69 * (p.scale || 1);
    KERBS.forEach(({ along, at }) => {
      const v = along === 'x' ? p.z : p.x;
      [at - 3, at + 3].forEach(k => { if (Math.abs(v - k) < 4) assert.ok(Math.abs(v - k) - half >= .1, `${p.file} at ${p.x},${p.z} crosses the kerb`); });
    });
    blocks.forEach(b => {
      const inX = p.x > b.x0 - half && p.x < b.x1 + half, inZ = p.z > b.z0 - half && p.z < b.z1 + half;
      assert.ok(!(inX && inZ), `${p.file} at ${p.x},${p.z} runs into a facade`);
    });
  });
});
