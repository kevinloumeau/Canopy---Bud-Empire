import test from 'node:test';
import assert from 'node:assert/strict';
import { createUpgradeFx } from '../src/upgrade-fx.js';

test('an upgrade plays a ring and a spring, then goes quiet', () => {
  let t = 1000;
  const fx = createUpgradeFx({ matches: false }, () => t);
  assert.equal(fx.busy(), false);
  fx.play({ at: { x: 2, z: 3 }, r: 1.5, station: 'f5', fixtures: ['deck'], big: true, ui: false });
  t += 300;
  const f = fx.frame();
  assert.equal(f.rings.length, 1);
  assert.ok(f.rings[0].t > .3 && f.rings[0].t < .4);
  assert.ok(f.rings[0].r > 1.5, 'a new look plays the bigger ring');
  assert.ok(f.springs.deck > 0 && f.springs.deck < 1);
  assert.ok(fx.bump('f5') > 0 && fx.bump('f5') < 1);
  assert.equal(fx.bump('f4'), undefined);
  t += 1000;
  const done = fx.frame();
  assert.equal(done.rings, null);
  assert.equal(done.springs, null);
  assert.equal(fx.bump('f5'), undefined);
  assert.equal(fx.busy(), false);
});

test('reduced motion plays nothing', () => {
  const fx = createUpgradeFx({ matches: true }, () => 0);
  fx.play({ at: { x: 0, z: 0 }, station: 'f0', ui: false });
  assert.equal(fx.frame().rings, null);
  assert.equal(fx.bump('f0'), undefined);
});

test('rapid buys keep only a handful of rings', () => {
  let t = 0;
  const fx = createUpgradeFx({ matches: false }, () => t);
  for (let n = 0; n < 20; n++) { fx.play({ at: { x: n, z: 0 }, ui: false }); t += 10; }
  assert.ok(fx.frame().rings.length <= 6);
});
