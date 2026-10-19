import test from 'node:test';import assert from 'node:assert/strict';
import {ACHIEVEMENTS,migrateAchievements,achievementBonus,checkAchievements,achievementRows} from '../src/achievements.js';
import {nextUnlock} from '../src/economy.js';
const fresh=o=>({sold:0,lifetime:0,lines:[1,1,1,1,1,1],idStaff:0,onlineCompleted:0,strains:[1,0,0,0],crosses:{done:[],active:null},kiosk:false,secondKiosk:false,thirdKiosk:false,orderCounters:1,lounge:0,empire:{stores:[{level:0},{level:0},{level:0},{level:0},{level:0}],shares:0},achievements:[],...o});
test('ids are unique and every goal reads as one short line',()=>{
  assert.equal(new Set(ACHIEVEMENTS.map(a=>a.id)).size,ACHIEVEMENTS.length);
  assert.ok(ACHIEVEMENTS.every(a=>a.name.length<=18&&a.goal.length<=28));
});
test('a new game has none; each earned one adds +1% sales',()=>{
  const s=fresh();assert.deepEqual(checkAchievements(s),[]);assert.equal(achievementBonus(s),0);
  s.sold=150;assert.deepEqual(checkAchievements(s).map(a=>a.id),['sold-100']);assert.equal(achievementBonus(s),.01);
  assert.deepEqual(checkAchievements(s),[],'earned once');
});
test('an old save is credited with everything it already meets',()=>{
  const s=fresh({sold:12000,lifetime:2e6,lines:[30,31,40,30,55,30],onlineCompleted:120,strains:[10,3,2,1],crosses:{done:['0-1'],active:null},empire:{stores:[{level:3},{level:0},{level:0},{level:0},{level:0}],shares:4}});
  delete s.achievements;const got=checkAchievements(s).map(a=>a.id);
  for(const id of ['sold-100','sold-1k','sold-10k','rev-10k','rev-1m','line-10','line-30','web-10','web-100','menu-4','strain-10','cross-1','branch-1','reopen'])assert.ok(got.includes(id),id);
  for(const id of ['sold-100k','rev-100m','line-50','branch-all','cross-6'])assert.ok(!got.includes(id),id);
  assert.equal(achievementBonus(s),got.length/100);
});
test('earned achievements stay when the run resets; unknown ids and repeats are dropped',()=>{
  assert.deepEqual(migrateAchievements(['sold-100','nope','sold-100','line-10']),['sold-100','line-10']);
  assert.deepEqual(migrateAchievements(undefined),[]);
  const s=fresh({achievements:['rev-1m']});checkAchievements(s);assert.ok(s.achievements.includes('rev-1m'));
});
test('the list shows the closest unearned first, then earned in order',()=>{
  const s=fresh({sold:900,achievements:['sold-100']});const rows=achievementRows(s);
  assert.equal(rows[0].id,'sold-1k');assert.equal(rows[0].value,900);assert.equal(rows.at(-1).id,'sold-100');assert.ok(rows.at(-1).done);
  assert.ok(rows.every(r=>r.value<=r.target));
});
test('unlock road: next output tier, with a new look on the look levels',()=>{
  assert.deepEqual(nextUnlock(1),{level:10,double:true,look:true});
  assert.deepEqual(nextUnlock(12),{level:20,double:true,look:false});
  assert.deepEqual(nextUnlock(20),{level:30,double:true,look:true});
  assert.deepEqual(nextUnlock(60),{level:75,double:true,look:true});
  assert.deepEqual(nextUnlock(80),{level:100,double:true,look:false});
  assert.equal(nextUnlock(100),null);
});
