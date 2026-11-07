// Every map buy box item names a function main.js really defines. A misspelt name (go:expandOrderCounter, 2026-11-05)
// fell through to the button with that id, so tapping "Buy" on the Counter tag did nothing.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const src=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');

test('map buy tags call functions that exist',()=>{
  const names=[...src.matchAll(/\bgo:([A-Za-z_$][\w$]*)\s*[,}\]]/g)].map(m=>m[1]);
  assert.ok(names.length>5,'found the buy box items');
  for(const name of new Set(names))
    assert.match(src,new RegExp('function '+name.replace(/\$/g,'\\$')+'\\s*\\('),name+' is not defined in main.js');
});

test('kiosk tag lists only defined functions',()=>{
  const list=src.match(/go:\[([\w,\s]+)\]\[count\]/);
  assert.ok(list,'kiosk buy list found');
  for(const name of list[1].split(',').map(s=>s.trim()))assert.match(src,new RegExp('function '+name+'\\s*\\('),name+' is not defined');
});
