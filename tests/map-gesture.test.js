// Map drag physics (map-gesture.js): rubber band past the edge, fling speed, glide and spring back.
import test from 'node:test';
import assert from 'node:assert/strict';
import { rubberBand, addSample, releaseVelocity, coastAxis, STILL_MS } from '../src/map-gesture.js';

test('rubber band follows the finger at about half speed and never passes the view size', () => {
  assert.equal(rubberBand(0, 400), 0);
  const small = rubberBand(10, 400);
  assert.ok(small > 4 && small < 6, `10 px pull shows ${small}`);
  assert.ok(rubberBand(5000, 400) < 400);
  assert.equal(rubberBand(-80, 400), -rubberBand(80, 400));
  // More pull always shows more stretch.
  assert.ok(rubberBand(200, 400) > rubberBand(100, 400));
});

test('release speed comes from the last 100 ms and a finger that stopped throws nothing', () => {
  const s = [];
  for (let t = 0; t <= 300; t += 16) addSample(s, t, t * 2, 0); // 2 px/ms = 2000 px/s
  const v = releaseVelocity(s, 300);
  assert.ok(Math.abs(v.x - 2000) < 1, `got ${v.x}`);
  assert.ok(s.length <= 8, 'old samples are dropped');
  assert.deepEqual(releaseVelocity(s, 300 + STILL_MS + 5), { x: 0, y: 0 });
  assert.deepEqual(releaseVelocity([{ t: 0, x: 0, y: 0 }], 0), { x: 0, y: 0 });
  // A wild flick is capped.
  const fast = [{ t: 0, x: 0, y: 0 }, { t: 20, x: 400, y: 0 }];
  assert.ok(releaseVelocity(fast, 20).x <= 4200);
});

test('a flick glides, slows and stops', () => {
  let pos = 0, v = 1500, frames = 0;
  while (v && frames < 600) { ({ pos, v } = coastAxis(pos, v, 0, 1 / 60)); frames++; }
  assert.equal(v, 0);
  assert.ok(pos > 380 && pos < 520, `1500 px/s flick went ${pos}`);
  assert.ok(frames < 120, `stopped after ${frames} frames`);
});

test('a view past the edge springs back without wobbling past it', () => {
  // 60 px past the edge, at rest: settles on the edge, never crossing to the other side.
  let pos = 60, v = 0, edge = 0, frames = 0, low = Infinity;
  while ((pos !== edge || v) && frames < 300) { ({ pos, v } = coastAxis(pos, v, pos - edge, 1 / 60)); low = Math.min(low, pos); frames++; }
  assert.equal(pos, edge);
  assert.ok(low >= edge, 'no overshoot into the map');
  assert.ok(frames < 45, `settled in ${frames} frames`);
  // A flick into the edge stretches a little and comes back.
  pos = 0; v = 2000; let peak = 0; frames = 0;
  ({ pos, v } = coastAxis(pos, v, 0, 1 / 60));
  while ((pos !== 0 || v) && frames < 300) { ({ pos, v } = coastAxis(pos, v, pos, 1 / 60)); peak = Math.max(peak, pos); frames++; }
  assert.ok(peak > 20 && peak < 120, `overshoot ${peak}`);
  assert.equal(pos, 0);
});

test('long frames do not blow the spring up', () => {
  const { pos } = coastAxis(100, 0, 100, 0.05);
  assert.ok(pos >= 0 && pos < 100);
});
