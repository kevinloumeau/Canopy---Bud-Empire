import test from 'node:test';import assert from 'node:assert/strict';
import {createCashPops,rollCash,popFrame,POP_GAP,POP_HOLD} from '../src/cash-pops.js';
const site={x:1,y:2,z:3};
test('a busy shop shows about one pop a second, holding the sales together',()=>{
 const pops=createCashPops();let shown=[];
 for(let i=0;i<100;i++){pops.credit('pickup',site,10);const p=pops.tick(.1);if(p)shown.push(p);}
 assert.ok(shown.length>=8&&shown.length<=11,'pops: '+shown.length);
 assert.ok(shown.every(p=>p.amount>=40),'each pop gathers several sales');
 const total=shown.reduce((a,p)=>a+p.amount,0)+pops.pending();assert.equal(Math.round(total),1000);
});
test('the site that waited longest goes first, so none is starved',()=>{
 const pops=createCashPops();pops.credit('deck',site,5);pops.tick(.2);pops.credit('pickup',site,9);
 const first=pops.tick(POP_HOLD);assert.equal(first.key,'deck');
 assert.equal(pops.tick(.1),null);const second=pops.tick(POP_GAP);assert.equal(second.key,'pickup');
});
test('bad amounts are ignored',()=>{const pops=createCashPops();pops.credit('a',site,0);pops.credit('a',site,-3);pops.credit('a',site,NaN);assert.equal(pops.pending(),0);});
test('the cash counter rolls up, snaps down on a spend and snaps under reduced motion',()=>{
 let v=100;for(let i=0;i<4;i++)v=rollCash(v,200,1/60,false);assert.ok(v>100&&v<200);
 for(let i=0;i<60;i++)v=rollCash(v,200,1/60,false);assert.equal(v,200);
 assert.equal(rollCash(200,50,1/60,false),50);assert.equal(rollCash(100,200,1/60,true),200);
});
test('a pop springs in, holds and fades out',()=>{
 assert.equal(popFrame(0).alpha,0);assert.equal(popFrame(.4).alpha,1);assert.ok(popFrame(1).alpha<.01);
 assert.ok(popFrame(.2).scale>1);assert.equal(popFrame(.5).scale,1);assert.ok(popFrame(1).rise>popFrame(.3).rise);
});
