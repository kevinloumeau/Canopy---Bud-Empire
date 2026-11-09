// The page must never zoom (double tap on the menu zoomed the iPhone app); the map keeps its own pinch.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { installNoPageZoom } from '../src/no-page-zoom.js';

test('viewport locks the page scale', () => {
  const meta = readFileSync(new URL('../index.html', import.meta.url), 'utf8').match(/name="viewport" content="([^"]+)"/)[1];
  assert.match(meta, /maximum-scale=1/);
  assert.match(meta, /user-scalable=no/);
});

test('page allows pans only, and the map still takes every gesture itself', () => {
  assert.match(readFileSync(new URL('../src/ui.css', import.meta.url), 'utf8'), /html,body\{touch-action:pan-x pan-y\}/);
  assert.match(readFileSync(new URL('../src/dispensary.css', import.meta.url), 'utf8'), /\.world,\.world canvas\{touch-action:none\}/);
});

test('WebKit pinch and double-click zoom are cancelled once', () => {
  const seen = {};
  const doc = { addEventListener: (type, fn, opts) => { seen[type] = { fn, opts }; } };
  assert.equal(installNoPageZoom(doc), true);
  assert.equal(installNoPageZoom(doc), false);
  for (const type of ['gesturestart', 'gesturechange', 'gestureend', 'dblclick']) {
    assert.equal(seen[type].opts.passive, false);
    let prevented = false;
    seen[type].fn({ cancelable: true, preventDefault: () => { prevented = true; } });
    assert.ok(prevented, type);
  }
});

test('long press never selects text or opens the callout, but typed fields still can', () => {
  const css = readFileSync(new URL('../src/ui.css', import.meta.url), 'utf8');
  assert.match(css, /\*,\*::before,\*::after\{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent\}/);
  assert.match(css, /input,textarea,\[contenteditable\][^{]*\{-webkit-user-select:text;user-select:text/);
});
