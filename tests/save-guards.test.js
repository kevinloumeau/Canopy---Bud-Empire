import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {idCheckLength,stockCaps,onlineRequestLimit,offlineSeconds,BIG} from '../src/save-guards.js';
import {storageCapacity,readyCapacity} from '../src/economy.js';
import {requestCap} from '../src/deliveries.js';
import {abbr,abbrShort,unabbr,SUFFIXES,migrateProgression} from '../src/progression.js';
import {dollars} from '../src/goals-pane.js';

const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');

// Gameplay review 2026-11-07: a newcomer pushed this tick had no idDistance yet, the gap came out NaN, and the head of
// the line stayed at the ID desk for good, stopping every walk-in sale until a reload.
test('the two-customer ID check always ends: a newcomer without a distance leaves the door free', () => {
  const trained=.6,show=2.2,walk=1.6;
  for(const behind of [undefined,NaN,null,Infinity]){
    const length=idCheckLength(trained,show,behind,walk);
    assert.ok(Number.isFinite(length)&&length>0,'length for '+behind+' was '+length);
    assert.equal(length,show);
  }
  // A walker right behind still gets the quick trained check, one far back the full show.
  assert.equal(idCheckLength(trained,show,.7,walk),trained);
  assert.equal(idCheckLength(trained,show,20,walk),show);
  // Simulate the head at the desk for two game minutes: they are waved in after the show length.
  let t=0,checked=false;const length=idCheckLength(trained,show,undefined,walk);
  for(let step=0;step<2400&&!checked;step++){t+=.05;if(t>=length)checked=true;}
  assert.ok(checked&&t<3,'the head cleared the door after '+t.toFixed(2)+' s');
});

test('new arrivals carry their ID route distance from the moment they spawn', () => {
  assert.match(main,/customers\.push\(\{[^}]*idDistance:routeLength\(ID_ROUTE\)/);
  assert.match(main,/c\.idCheckFor=idCheckLength\(/);
});

test('a reload keeps stock up to the live caps, retail boost included', () => {
  const next={lines:[30,30,30,30,30,30],storageLevel:2,readyLevel:0,basketLevel:0};
  const caps=stockCaps(next);
  assert.equal(caps[0],storageCapacity(2,next.lines));
  assert.ok(caps[0]>=2400,'line level 30 shelves hold '+caps[0]);
  assert.ok(caps[4]>=readyCapacity(0,next.lines));
  assert.match(main,/var caps=stockCaps\(next\);next\.stock=/);
  // The caps are worked out after the line levels are read.
  assert.ok(main.indexOf('next.lines=LINES.map')<main.indexOf('var caps=stockCaps(next)'));
});

test('a reload keeps queued web orders up to the real request cap', () => {
  const next={onlineCompleted:5000,webLevel:20};
  assert.equal(onlineRequestLimit(next),requestCap(5000,20));
  assert.ok(onlineRequestLimit(next)>40);
  assert.match(main,/next\.onlineRequests=finite\(old\.onlineRequests,0,0,onlineRequestLimit\(next\)\)/);
});

test('fmt, abbr and the goals parser round-trip every suffix', () => {
  assert.equal(abbr(1e15),'1Qa');
  assert.equal(abbr(3e17),'300Qa');
  assert.equal(abbr(4.5e18),'4.5Qi');
  assert.equal(abbr(1e21),'1Sx');
  for(const [suffix,size] of SUFFIXES){
    for(const k of [1,2.5,47.5,999]){
      const text=abbr(k*size);
      assert.ok(text.endsWith(suffix),text+' should end in '+suffix);
      assert.ok(Math.abs(unabbr(text)/(k*size)-1)<.01,text+' reads back as '+unabbr(text));
      assert.ok(Math.abs(dollars('Collect $'+text+' now')/(k*size)-1)<.01,'$'+text+' parsed');
      assert.ok(abbrShort(k*size).endsWith(suffix));
    }
  }
  assert.equal(dollars('$1,250'),1250);
  assert.equal(dollars('no money'),0);
});

test('big idle totals survive a load', () => {
  const p=migrateProgression({lifetimeAll:3e17,shares:2e6,flagship:5e16,clock:1});
  assert.equal(p.lifetimeAll,3e17);
  assert.equal(p.shares,2e6);
  assert.equal(p.flagship,5e16);
  assert.equal(migrateProgression({lifetimeAll:Infinity,shares:1}).lifetimeAll,0);
  assert.ok(BIG>1e100&&Number.isFinite(BIG));
  assert.doesNotMatch(main,/next\.money=finite\(old\.money,30,0,Number\.MAX_SAFE_INTEGER\)/);
  assert.doesNotMatch(main,/loungeEarned,0,0,1e15/);
});

test('winding the clock forward and back pays each moment of offline time once', () => {
  const hour=3600e3,real=1e12;
  // Forward a day: paid for the day.
  assert.equal(offlineSeconds(real+24*hour,real,0),24*3600);
  // Back to the real time (load clamps lastSeen to now), then forward again: nothing more is owed.
  const paidThrough=real+24*hour;
  assert.equal(offlineSeconds(real,real,paidThrough),0);
  assert.equal(offlineSeconds(real+24*hour,real,paidThrough),0);
  // Real time that passes beyond what was paid still pays.
  assert.equal(offlineSeconds(real+25*hour,real,paidThrough),3600);
  assert.match(main,/offlineSeconds\(now,state\.lastSeen,state\.paidThrough\)/);
});
