import test from 'node:test';
import assert from 'node:assert/strict';
import {abbr,abbrShort,count,times} from '../src/progression.js';

// One number style app-wide (visual review 2026-11-07): capital suffixes and no trailing zeros.
test('abbr drops trailing zeros and keeps three significant figures', () => {
  assert.equal(abbr(8000), '8K');
  assert.equal(abbr(1500), '1.5K');
  assert.equal(abbr(40000), '40K');
  assert.equal(abbr(4230), '4.23K');
  assert.equal(abbr(213000), '213K');
  assert.equal(abbr(9e12), '9T');
  assert.equal(abbr(1.7e6), '1.7M');
  assert.equal(abbr(999.9), '999');
});

test('abbrShort fits the inventory strip: whole numbers, one decimal only under ten', () => {
  assert.equal(abbrShort(198.1), '198');
  assert.equal(abbrShort(1.4), '1.4');
  assert.equal(abbrShort(0), '0');
  assert.equal(abbrShort(38400), '38K');
  assert.equal(abbrShort(4800), '4.8K');
  assert.equal(abbrShort(12800), '13K');
  assert.equal(abbrShort(3000), '3K');
});

test('counts get a thousands comma and multipliers lose trailing zeros', () => {
  assert.equal(count(22360), '22,360');
  assert.equal(times(1119.04), '1,119×');
  assert.equal(times(1.5), '1.5×');
  assert.equal(times(2), '2×');
  assert.equal(times(12.44), '12.4×');
});

// DM Mono is no longer loaded; a stylesheet asking for it would fall back to the system monospace.
test('no stylesheet asks for DM Mono', async () => {
  const {readdir,readFile}=await import('node:fs/promises');
  const dir=new URL('../src/',import.meta.url),hits=[];
  for(const f of await readdir(dir))if(f.endsWith('.css')){const css=(await readFile(new URL(f,dir),'utf8')).replace(/\/\*[\s\S]*?\*\//g,'');if(/DM Mono/.test(css))hits.push(f);}
  assert.deepEqual(hits,[],'use Bricolage Grotesque (tabular figures are global) instead of DM Mono in '+hits.join(', '));
});
