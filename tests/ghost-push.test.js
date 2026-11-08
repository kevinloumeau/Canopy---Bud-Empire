// Pushing the ghost buys (Kevin, 2026-11-08): the brass leans toward the blueprint, the brass button and a tap on the
// blueprint open its buy box, and its tag carries a savings ring and a ready state.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const src=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/ghost-push.css',import.meta.url),'utf8');
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('ghost buys pull harder in the best buy, and remember what they add',()=>{
  assert.match(src,/var GHOST_PULL=1\.\d+/);
  assert.match(src,/function consider\(r\)\{r\.value=r\.gain\/r\.spend;var gk=ghostKind\(r\);if\(gk\)\{r\.value\*=GHOST_PULL;ghostGains\[gk\]=r\.gain\}/);
});

test('the blueprint follows the brass when it names a ghost',()=>{
  assert.match(src,/brass=fix&&ghostKind\(fix\)/);
});

test('the brass button and a tap on the blueprint open its buy box',()=>{
  assert.match(src,/return pickGhost\(r\.kind\)/);
  assert.match(src,/return pickGhost\('atm'\)/);
  assert.match(src,/pickGhost\(gm\.dataset\.marker\)/);
});

test('the ghost tag saves up, then wakes up',()=>{
  assert.match(src,/classList\.toggle\('is-saving'/);
  assert.match(src,/classList\.toggle\('is-ready',ready\)/);
  assert.match(css,/conic-gradient\(#f3ead6 var\(--save/);
  assert.match(css,/prefers-reduced-motion/);
  assert.match(html,/src\/ghost-push\.css/);
});
