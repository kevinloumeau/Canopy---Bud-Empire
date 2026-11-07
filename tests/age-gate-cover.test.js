import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// On a fresh iOS install the native loading cover used to wait for the whole 3D map with the age gate already up
// behind it (about 30 s at 90%). The inline gate script now tells the app it is ready as soon as the gate has painted.
test('the age gate lifts the native loading cover on first launch', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const gate = html.slice(html.indexOf("getElementById('ageGate')"), html.indexOf("getElementById('ageYes')"));
  assert.match(gate, /classList\.contains\('age-ok'\)\) return/, 'returning players skip it and keep the map handoff');
  assert.match(gate, /canopyTray/, 'it talks to the app');
  assert.match(gate, /postMessage\(\{ ready: true \}\)/, 'it sends ready');
  assert.match(gate, /setTimeout\(tell, \d+\)/, 'a slow badge or font never holds the cover');
});
