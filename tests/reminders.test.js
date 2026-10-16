import test from 'node:test';
import assert from 'node:assert/strict';
import {planReminders,createReminders} from '../src/reminders.js';
const DAY=86400000,now=20000*DAY+5*3600000;
test('reminders cover the full safe, tomorrow\'s daily reward and a finished cross',()=>{
 const list=planReminders({now,offlineCapMs:8*3600000,dailyAvailable:false,dailyClock:now,breedReady:now+45*60000,breedName:'Sunset Haze'});
 assert.deepEqual(list.map(r=>r.id),[103,101,102]);assert.equal(list[2].at,20001*DAY);assert.match(list[1].body,/8 hours/);
 assert.deepEqual(planReminders({now,offlineCapMs:0,dailyAvailable:true,dailyClock:now,breedReady:now+1000,breedName:'X'}),[],'nothing due later than a minute');
});
test('outside the iOS app reminders are unavailable and harmless',async()=>{
 const r=createReminders({});assert.equal(r.available,false);assert.equal(await r.enable(),false);await r.schedule([{id:1,at:now,title:'',body:''}]);await r.clear();
});
test('with the plugin, scheduling replaces the previous set',async()=>{
 const calls=[];const plugin={requestPermissions:async()=>({display:'granted'}),cancel:async a=>calls.push(['cancel',a.notifications.length]),schedule:async a=>calls.push(['schedule',a.notifications.length])};
 const r=createReminders({Capacitor:{Plugins:{LocalNotifications:plugin}}});assert.equal(r.available,true);assert.equal(await r.enable(),true);
 await r.schedule(planReminders({now,offlineCapMs:4*3600000,dailyAvailable:true,dailyClock:now}));assert.deepEqual(calls,[['cancel',3],['schedule',1]]);
});
