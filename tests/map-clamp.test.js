// Where the camera may look on the town map (map-clamp.js). Kevin, 2026-11-10: "dont like the camera auto moving to
// the empty plot when zoomed out": zoomed out, the limits carried the view east along the street on every call.
import test from 'node:test';
import assert from 'node:assert/strict';
import { clampTownView } from '../src/map-clamp.js';
import { SUNNY_VIEW } from '../src/sunny-world.js';

// The screens as the game measures them (width, anchor, top bar's bottom, bottom of the visible map, px per map unit at
// zoom 1), with no branch open (the street runs 73 units on, to the next lot) and with two.
const SCREENS = {
  'iPhone 390, menu down': { width: 390, frameX: 195, frameY: 501.22, top: 58, bottom: 677, base: 12.515 },
  'iPhone 390, menu half open': { width: 390, frameX: 195, frameY: 265.296, top: 58, bottom: 354.484, base: 11.055 },
  'iPhone 430, menu down': { width: 430, frameX: 215, frameY: 559.3, top: 58, bottom: 765, base: 13.945 },
  'desktop 1440': { width: 1440, frameX: 720, frameY: 648.4, top: 68, bottom: 900, base: 31.186 }
};
const STREETS = { 'no branches': { reach: 73, east: 118 }, 'two branches': { reach: 213, east: 258 } };
const C = Math.SQRT1_2, SQ = Math.tan(Math.PI / 6);
const screen = (name, street, zoom) => { const a = SCREENS[name]; return { ...a, ...STREETS[street], c: C, s: C, sq: SQ, zoom, u: a.base * zoom, view: SUNNY_VIEW }; };
const cases = () => Object.keys(SCREENS).flatMap(name => Object.keys(STREETS).flatMap(street => [0.65, 0.75, 0.85, 0.95, 1.1, 1.5, 2.5].map(zoom => ({ label: `${name}, ${street}, zoom ${zoom}`, o: screen(name, street, zoom) }))));
const px = (a, b, o) => Math.hypot(a.rx - b.rx, a.rz - b.rz) * o.u;

test('zoomed out, the shop stays in the middle of the screen', () => {
  for (const { label, o } of cases()) {
    const v = clampTownView(0, 0, o);
    // Across the screen it may move a few pixels; it was carried 270 to 1,300 px east before.
    assert.ok(Math.abs(v.rx) * o.u < 12, `${label}: moved ${(v.rx * o.u).toFixed(0)} px across`);
    assert.ok(Math.abs(v.rz) * o.u * o.sq < 110, `${label}: moved ${(v.rz * o.u * o.sq).toFixed(0)} px down`);
  }
});

test('asking again never moves the camera', () => {
  for (const { label, o } of cases()) {
    let worst = 0;
    for (let rx = -80; rx <= 300; rx += 7.3) for (let rz = -90; rz <= 300; rz += 8.9) {
      const once = clampTownView(rx, rz, o);
      let again = once; for (let i = 0; i < 3; i++) again = clampTownView(again.rx, again.rz, o);
      worst = Math.max(worst, px(once, again, o));
    }
    assert.ok(worst < 0.5, `${label}: crept ${worst.toFixed(1)} px`);
  }
});

test('zooming out from the shop and back in does not carry the view along the street', () => {
  for (const name of Object.keys(SCREENS)) for (const street of Object.keys(STREETS)) {
    const a = SCREENS[name]; let zoom = 1.6, pan = { x: 0, y: 0 }, jump = 0;
    // What a pinch does (main.js zoomAt): scale the view around a point on screen, then clamp.
    const step = next => {
      const o = screen(name, street, next), ratio = next / zoom, fx = a.width / 2, fy = a.frameY;
      const nx = fx - (fx - (a.frameX + pan.x)) * ratio - a.frameX, ny = fy - (fy - (a.frameY + pan.y)) * ratio - a.frameY;
      const v = clampTownView(-nx / o.u, -ny / (o.u * o.sq), o); pan = { x: -v.rx * o.u, y: -v.rz * o.u * o.sq };
      jump = Math.max(jump, Math.hypot(pan.x - nx, pan.y - ny)); zoom = next;
    };
    while (zoom > 0.65) step(Math.max(0.65, zoom / 1.01));
    assert.ok(Math.abs(pan.x) < 30, `${name}, ${street}: zoomed out the shop sits ${pan.x.toFixed(0)} px off the middle`);
    while (zoom < 1.6) step(Math.min(1.6, zoom * 1.01));
    while (zoom > 0.65) step(Math.max(0.65, zoom / 1.01));
    assert.ok(Math.abs(pan.x) < 60, `${name}, ${street}: after out, in and out the shop sits ${pan.x.toFixed(0)} px off the middle`);
    assert.ok(jump < 30, `${name}, ${street}: a 1% zoom step pushed the view ${jump.toFixed(0)} px`);
  }
});

test('zoomed out at the shop, a push up or down the screen comes straight back', () => {
  for (const name of ['iPhone 390, menu down', 'iPhone 430, menu down']) for (const street of Object.keys(STREETS)) {
    const o = screen(name, street, 0.65), home = clampTownView(0, 0, o);
    for (const push of [-30, -8, 8, 30]) {
      const back = clampTownView(home.rx, home.rz + push, o);
      assert.ok(px(home, back, o) < 0.5, `${name}, ${street}: a push of ${push} left the view ${px(home, back, o).toFixed(1)} px away`);
    }
  }
});

test('closer in, a view the old limits allowed is still left alone', () => {
  // Inside the shop block at play zooms nothing binds: the view comes back as it went in.
  for (const name of Object.keys(SCREENS)) for (const zoom of [1.5, 2.5]) {
    const o = screen(name, 'two branches', zoom);
    for (const [rx, rz] of [[0, 0], [3, 2], [-4, 5], [6, -3]]) {
      const v = clampTownView(rx, rz, o);
      assert.ok(px(v, { rx, rz }, o) < 0.01, `${name}, zoom ${zoom}: (${rx}, ${rz}) moved`);
    }
  }
});
