import test from 'node:test';
import assert from 'node:assert/strict';
import {createSparkles,sparkleFrame,rgb,SPARKLE_COUNT,SPARKLE_SECONDS,MAX_SPARKLES,LEAF,GLINT,COIN} from '../src/sparkles.js';

const clock=()=>{let t=1000;const f=()=>t;f.add=ms=>{t+=ms};return f};

test('a burst throws leaves, glints and coins that rise and fade out', () => {
  const now=clock(),s=createSparkles({matches:false},now,()=>.5);
  s.burst({x:2,z:3},'#f0d89a');
  assert.equal(s.count,SPARKLE_COUNT);
  now.add(200);
  const early=s.frame();
  assert.ok(early.length>0);
  assert.deepEqual([...new Set(early.map(p=>p.shape))].sort(),[LEAF,GLINT,COIN].sort());
  now.add(400);
  const later=s.frame(),first=early[0],again=later[0];
  assert.ok(again.y>first.y,'keeps rising');
  early.concat(later).forEach(p=>{assert.ok(p.alpha>=0&&p.alpha<=1);assert.ok(p.size>0);assert.ok(Number.isFinite(p.angle))});
  now.add(SPARKLE_SECONDS*1000*1.2);
  assert.equal(s.frame().length,0);
  assert.equal(s.count,0);
});

test('leaves are leaf green and coins brass, whatever the burst colour', () => {
  const now=clock(),s=createSparkles({matches:false},now,()=>.3);
  s.burst({x:0,z:0},'#ff0000');now.add(300);
  const list=s.frame(),leaf=list.find(p=>p.shape===LEAF),coin=list.find(p=>p.shape===COIN),glint=list.find(p=>p.shape===GLINT);
  assert.ok(leaf.g>leaf.r&&leaf.g>leaf.b);
  assert.ok(coin.r>coin.b&&coin.g>coin.b);
  assert.ok(glint.r>glint.g,'glints pick up the burst tint');
});

test('reduced motion skips sparkles, and the pool is capped', () => {
  const still=createSparkles({matches:true},clock());
  still.burst({x:0,z:0});
  assert.equal(still.count,0);
  const s=createSparkles({matches:false},clock());
  for(let i=0;i<40;i++)s.burst({x:i,z:0});
  assert.equal(s.count,MAX_SPARKLES);
});

test('the life curve springs in, eases out and ends invisible', () => {
  assert.equal(sparkleFrame(0).alpha,0);
  assert.equal(sparkleFrame(1).alpha,0);
  assert.equal(sparkleFrame(.3).alpha,1);
  assert.ok(sparkleFrame(.5).out>.8,'most of the rise happens early');
  assert.deepEqual(rgb('nope'),rgb('#f0c451'));
});
