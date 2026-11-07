import test from 'node:test';
import assert from 'node:assert/strict';
import {planReminders,createReminders} from '../src/reminders.js';
const DAY=86400000,now=20000*DAY+5*3600000;
test('reminders cover the full safe and tomorrow\'s daily reward',()=>{
 const list=planReminders({now,offlineCapMs:8*3600000,dailyAvailable:false,dailyClock:now});
 assert.deepEqual(list.map(r=>r.id),[101,102]);assert.equal(list[1].at,20001*DAY);assert.match(list[0].body,/8 hours/);
 assert.deepEqual(planReminders({now,offlineCapMs:30000,dailyAvailable:true,dailyClock:now}),[],'nothing due later than a minute');
});
test('outside the iOS app reminders are unavailable and harmless',async()=>{
 const r=createReminders({});assert.equal(r.available,false);assert.equal(await r.enable(),false);await r.schedule([{id:1,at:now,title:'',body:''}]);await r.clear();
});
test('with the plugin, scheduling replaces the previous set',async()=>{
 const calls=[];const plugin={requestPermissions:async()=>({display:'granted'}),cancel:async a=>calls.push(['cancel',a.notifications.length]),schedule:async a=>calls.push(['schedule',a.notifications.length])};
 const r=createReminders({Capacitor:{Plugins:{LocalNotifications:plugin}}});assert.equal(r.available,true);assert.equal(await r.enable(),true);
 await r.schedule(planReminders({now,offlineCapMs:4*3600000,dailyAvailable:true,dailyClock:now}));assert.deepEqual(calls,[['cancel',4],['schedule',1]]);
});

test('the next build to finish gets its own reminder; builds under a minute away are skipped',()=>{
  const now=1e12;
  const list=planReminders({now,offlineCapMs:0,dailyAvailable:true,dailyClock:now,builds:[{name:'Canopy HQ',at:now+30*60000},{name:'Your rooftop lounge',at:now+3*60000},{name:'Riverside',at:now+20000}]});
  assert.equal(list.length,1);assert.equal(list[0].id,104);assert.equal(list[0].title,'Your rooftop lounge is ready');assert.equal(list[0].at,now+3*60000);
  assert.deepEqual(planReminders({now,offlineCapMs:0,dailyAvailable:true,dailyClock:now,builds:[{name:'x',at:NaN}]}),[]);
  assert.deepEqual(planReminders({now,offlineCapMs:0,dailyAvailable:true,dailyClock:now}),[]);
});
test('the iOS LocalNotifications plugin is installed and linked into the app',async()=>{
  const fs=await import('node:fs');
  const pkg=JSON.parse(fs.readFileSync(new URL('../package.json',import.meta.url)));
  assert.match(pkg.dependencies['@capacitor/local-notifications']||'',/^8\./);
  const swift=fs.readFileSync(new URL('../ios/App/CapApp-SPM/Package.swift',import.meta.url),'utf8');
  assert.match(swift,/CapacitorLocalNotifications/);
  // Capacitor's native bridge puts every linked plugin on window.Capacitor.Plugins, which is where reminders.js looks.
  const fake={Capacitor:{Plugins:{LocalNotifications:{requestPermissions:async()=>({display:'granted'}),schedule:async()=>{},cancel:async()=>{}}}}};
  const r=createReminders(fake);assert.equal(r.available,true);assert.equal(await r.enable(),true);
});
