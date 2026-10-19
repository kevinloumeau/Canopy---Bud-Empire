import test from 'node:test';
import assert from 'node:assert/strict';
import { screenState, PAID } from '../src/three/kiosk-screen.js';

test('kiosk screen: browse and tap three items, check out, then the thank-you screen', () => {
  const start = screenState(0, 0);
  assert.equal(start.mode, 'browse');
  assert.equal(start.picked, 0);
  assert.equal(start.tapping, -1);
  // A tap ripples on one tile, then that item is in the basket.
  assert.notEqual(screenState(.16, 0).tapping, -1);
  assert.equal(screenState(.25, 0).picked, 1);
  assert.equal(screenState(.58, 0).picked, 3);
  // The menu scrolls as they browse.
  assert.ok(screenState(.5, 0).scroll > start.scroll);
  assert.equal(screenState(.7, 0).mode, 'pay');
  assert.equal(screenState(.7, 0).press, 0);
  assert.ok(screenState(.85, 0).press > 0);
  // While the card goes through the dots move, so the picture changes over time.
  assert.notEqual(screenState(.85, 0).key, screenState(.85, .2).key);
  assert.equal(screenState(PAID, 0, 0).mode, 'paid');
  assert.ok(screenState(PAID, 0, 1).q > screenState(PAID, 0, .2).q);
});
