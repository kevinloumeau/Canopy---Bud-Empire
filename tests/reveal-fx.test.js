import test from 'node:test';
import assert from 'node:assert/strict';
import { createRevealFx, popScale, REVEAL_SECONDS, MAX_REVEALS } from '../src/reveal-fx.js';

const clock = () => { let t = 0; const now = () => t; now.add = s => { t += s * 1000; }; return now; };

test('a reveal waits for the camera, hides its fixture, then plays and fires onStart once', () => {
  const now = clock(); let started = 0;
  const fx = createRevealFx(null, now);
  fx.play({ at: { x: 1, z: 2 }, fixtures: ['kiosk0'], delay: .5, onStart: () => started++ });
  let f = fx.frame();
  assert.equal(f.beams, null);
  assert.ok(f.pops.kiosk0 < 0, 'hidden while the camera glides');
  assert.equal(popScale(f.pops.kiosk0), null);
  assert.equal(started, 0);
  now.add(.6); f = fx.frame();
  assert.equal(started, 1);
  assert.equal(f.beams.length, 1);
  assert.ok(f.pops.kiosk0 > 0);
  now.add(.5); fx.frame(); assert.equal(started, 1);
  now.add(REVEAL_SECONDS); f = fx.frame();
  assert.equal(f.beams, null); assert.equal(f.pops, null); assert.equal(fx.busy(), false);
});

test('reduced motion skips the animation but still runs onStart', () => {
  let started = 0;
  const fx = createRevealFx({ matches: true }, clock());
  fx.play({ at: { x: 0, z: 0 }, fixtures: ['deck'], onStart: () => started++ });
  assert.equal(started, 1); assert.equal(fx.busy(), false);
});

test('the pool stays small and a dropped reveal still fires', () => {
  const now = clock(); let started = 0;
  const fx = createRevealFx(null, now);
  for (let i = 0; i < MAX_REVEALS + 2; i++) fx.play({ at: { x: i, z: 0 }, delay: 1, onStart: () => started++ });
  assert.equal(started, 2);
  now.add(1.1); assert.equal(fx.frame().beams.length, MAX_REVEALS);
});

test('a second reveal of the same fixture replaces the first', () => {
  const now = clock(); let started = 0;
  const fx = createRevealFx(null, now);
  fx.play({ at: { x: 0, z: 0 }, atm: 1, delay: 1, onStart: () => started++ });
  fx.play({ at: { x: 0, z: 0 }, atm: 1, onStart: () => started++ });
  assert.equal(started, 1);
  assert.deepEqual(fx.frame().atm.machine, 1);
});

test('popScale grows out of the floor with a small overshoot and lands at full size', () => {
  assert.deepEqual(popScale(undefined), [1, 1]);
  assert.deepEqual(popScale(1), [1, 1]);
  assert.ok(popScale(0)[1] < .05);
  const peak = Math.max(...Array.from({ length: 40 }, (_, i) => popScale(i / 100)[1]));
  assert.ok(peak > 1.04 && peak < 1.25, 'overshoot ' + peak);
  const end = popScale(.98);
  assert.ok(Math.abs(end[0] - 1) < .01 && Math.abs(end[1] - 1) < .01);
});
