// Map drag physics (map-gesture.js): rubber band past the edge, fling speed, glide and spring back.
import test from 'node:test';
import assert from 'node:assert/strict';
import { rubberBand, addSample, releaseVelocity, coastAxis, slideAlong, STILL_MS } from '../src/map-gesture.js';

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

// A model of the branch street: the view's ground point may run along x but stays within a narrow band of z, seen
// through the game's camera (turned by ANGLE, floor squashed by SQUASH, U px per map unit).
const ANGLE = 0.57, SQUASH = 0.5, U = 10, C = Math.cos(ANGLE), S = Math.sin(ANGLE);
const toGround = (px, py) => { const rx = -px / U, rz = -py / (U * SQUASH); return { x: rx * C + rz * S, z: rz * C - rx * S }; };
const toPan = (x, z) => ({ x: -(x * C - z * S) * U, y: -(x * S + z * C) * U * SQUASH });
const street = (east = 200) => (px, py) => { const g = toGround(px, py); return toPan(Math.max(-20, Math.min(east, g.x)), Math.max(-1, Math.min(1, g.z))); };

test('a sideways push against the street edge slides down the street instead of stretching', () => {
  const clamp = street(), start = toPan(50, 0);
  // A 160 px drag to the left (the view travels right, east along the street).
  const pushed = { x: start.x - 160, y: start.y };
  const r = slideAlong(pushed.x, pushed.y, clamp, ANGLE, SQUASH);
  assert.equal(r.slid, true);
  // Where it lands is on the street: the clamp leaves it alone, so nothing springs back on release.
  const rest = clamp(r.x, r.y);
  assert.ok(Math.hypot(rest.x - r.x, rest.y - r.y) < 0.01, 'the slid view sits inside the clamp');
  // It travels about as far across the screen as the finger did (it went about two thirds before, then sprang back).
  assert.ok(start.x - r.x > 140, `travelled ${start.x - r.x} px of 160`);
  assert.ok(toGround(r.x, r.y).x > 50 + 10, 'the view moved east along the street');
});

test('a push into a true edge keeps its stretch', () => {
  // At the east end of the street a push further east cannot slide anywhere.
  const clamp = street(60), end = toPan(60, 0);
  const r = slideAlong(end.x - 160, end.y, clamp, ANGLE, SQUASH);
  assert.equal(r.slid, false);
  assert.equal(r.x, end.x - 160);
  // A screen-square box (the flagship's own limits) is not the street: no slide.
  const box = (px, py) => ({ x: Math.max(-100, Math.min(100, px)), y: Math.max(-50, Math.min(50, py)) });
  assert.equal(slideAlong(0, -120, box, ANGLE, SQUASH).slid, false);
  assert.equal(slideAlong(-180, 0, box, ANGLE, SQUASH).slid, false);
  // Inside the clamp nothing changes.
  const inside = slideAlong(start0().x, start0().y, street(), ANGLE, SQUASH);
  assert.equal(inside.slid, false);
  function start0() { return toPan(10, 0.5); }
});

test('a push up or down against the street edge moves nothing, and a sideways one follows the finger', () => {
  // Kevin, 2026-11-10: "dont like the camera auto moving to the empty plot": half of an up or down swipe used to go
  // sideways along the street.
  const clamp = street(), start = toPan(50, 0);
  for (const dy of [-120, -30, 40, 120]) {
    const r = slideAlong(start.x, start.y + dy, clamp, ANGLE, SQUASH);
    assert.equal(r.slid, true);
    assert.ok(Math.abs(r.x - start.x) < 0.01, `a ${dy} px push moved the view ${r.x - start.x} px sideways`);
    const rest = clamp(r.x, r.y);
    assert.ok(Math.hypot(rest.x - start.x, rest.y - start.y) < 2.5, 'it rests where it was');
  }
  const side = slideAlong(start.x - 90, start.y, clamp, ANGLE, SQUASH);
  assert.ok(Math.abs(side.x - (start.x - 90)) < 0.01, 'the view goes as far across the screen as the finger');
});
