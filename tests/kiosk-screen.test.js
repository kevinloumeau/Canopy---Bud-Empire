import test from 'node:test';
import assert from 'node:assert/strict';
import { screenState } from '../src/three/kiosk-screen.js';

test('kiosk screen: items are tapped in turn, then the pay button lights', () => {
  assert.deepEqual(screenState(0, 0).rows, [0, 0, 0]);
  assert.deepEqual(screenState(.12, 0).rows, [1, 0, 0]);
  assert.deepEqual(screenState(.35, 0).rows, [2, 1, 0]);
  assert.deepEqual(screenState(.65, 0).rows, [2, 2, 2]);
  assert.equal(screenState(.65, 0).pay, 0);
  assert.notEqual(screenState(.8, 0).pay, 0);
  // The pay button pulses, so its picture changes over time.
  assert.notEqual(screenState(.8, 0).key, screenState(.8, .25).key);
});
