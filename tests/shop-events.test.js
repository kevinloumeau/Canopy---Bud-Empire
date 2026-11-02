import test from 'node:test';import assert from 'node:assert/strict';
import {SHOP_EVENTS,EVENT_ORDER,eventKind,eventGap,eventReward,eventToast,INSPECTION_REPUTATION} from '../src/shop-events.js';
test('shop events take turns, starting with a big spender',()=>{
 assert.equal(eventKind(0),'spender');assert.deepEqual(new Set(EVENT_ORDER),new Set(Object.keys(SHOP_EVENTS)));
 for(let i=1;i<EVENT_ORDER.length;i++)assert.notEqual(EVENT_ORDER[i],EVENT_ORDER[i-1],'no kind twice in a row');
 assert.notEqual(EVENT_ORDER[0],EVENT_ORDER[EVENT_ORDER.length-1],'nor across the wrap');
 assert.equal(eventKind(EVENT_ORDER.length),'spender');assert.equal(eventKind(3,'spender'),'spender','High rollers keeps them all big spenders');});
test('an event every two to seven minutes',()=>{for(let s=0;s<500;s++){const g=eventGap(s);assert.ok(g>=120&&g<420,String(g))}});
test('every tap pays something, and the toast says what',()=>{const fmt=n=>'$'+n;
 for(const kind of Object.keys(SHOP_EVENTS)){const r=eventReward(kind,100,60);assert.ok(r.cash>0||r.rush>0,kind);assert.ok(eventToast(kind,r,fmt).length<48,kind)}
 assert.equal(eventReward('rush',100,90).rush,90);assert.equal(eventReward('inspection',100,60).reputation,INSPECTION_REPUTATION);
 assert.ok(eventReward('vip',100,60).buzz>0);assert.equal(eventReward('spender',0,60).cash,50,'never below $50');
 assert.ok(eventReward('vip',100,60).cash>eventReward('spender',100,60).cash,'a VIP request pays more than a big spender');});
