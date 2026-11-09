import test from 'node:test';
import assert from 'node:assert/strict';
import {CAMPAIGNS,freshMarketing,migrateMarketing,launch,phase,runLeft,restLeft,lift,factor,price,clock,SHARE,MIN_PRICE} from '../src/marketing.js';
import {AD_BOOST_SECONDS} from '../src/store.js';

test('a campaign runs, rests, then is ready again', () => {
  const m=freshMarketing(),t=1e12,c=CAMPAIGNS[0];
  assert.equal(phase(m,c.id,t),'ready');
  assert.equal(launch(m,c.id,t),true);
  assert.equal(phase(m,c.id,t+1000),'running');
  assert.equal(launch(m,c.id,t+1000),false);
  assert.equal(Math.round(runLeft(m,c.id,t)),c.seconds);
  assert.equal(phase(m,c.id,t+c.seconds*1000+1),'resting');
  assert.equal(Math.round(restLeft(m,c.id,t+c.seconds*1000)),c.rest);
  assert.equal(phase(m,c.id,t+(c.seconds+c.rest)*1000+1),'ready');
});

test('effects add up only while running', () => {
  const m=freshMarketing(),t=1e12;
  assert.equal(factor(m,'flow',t),1);
  launch(m,'flyers',t);
  assert.equal(factor(m,'flow',t+1),1.3);
  assert.equal(lift(m,'vip',t+1),0);
  assert.equal(factor(m,'flow',t+301e3),1);
});

test('there is a customer flow campaign', () => {
  assert.ok(CAMPAIGNS.some(c=>c.kind==='flow'));
});

test('campaigns stay well under the 2x ad boost', () => {
  // A 2x ad adds 100% of income for 30 minutes. A campaign adds at most +30% on one part of the shop for minutes.
  CAMPAIGNS.forEach(c=>{assert.ok(c.amount<=.3);assert.ok(c.amount*c.seconds<.2*AD_BOOST_SECONDS,c.id);assert.ok(c.rest>=c.seconds,c.id)});
});

test('price is a share of what the campaign adds, with a floor', () => {
  const c=CAMPAIGNS[1];
  assert.equal(price(c.id,1000,.15),Math.round(1000*.15*c.seconds*SHARE));
  assert.equal(price(c.id,0,.15),MIN_PRICE);
  assert.equal(price('nope',1000,.1),Infinity);
});

test('saves keep sane timers', () => {
  const t=1e12;
  assert.deepEqual(migrateMarketing(null,t),freshMarketing());
  const m=migrateMarketing({flyers:{ends:t+9e9,ready:'x'},gone:{ends:5}},t);
  assert.equal(m.flyers.ends,t+300e3);assert.equal(m.flyers.ready,0);assert.equal(m.gone,undefined);
});

test('clock', () => {assert.equal(clock(299.2),'5:00');assert.equal(clock(3725),'1:02:05');});
