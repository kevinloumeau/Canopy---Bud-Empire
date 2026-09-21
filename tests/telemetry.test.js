import test from 'node:test';
import assert from 'node:assert/strict';
import {createTelemetry} from '../src/telemetry.js';

const DAY=86400000;
function fakeStorage(seed){const m=new Map(Object.entries(seed||{}));return {getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),map:m};}
function fakeWindow(){const sent=[];return {sent,plausible:(name,opts)=>sent.push([name,opts.props]),document:{hidden:false},setTimeout:()=>0};}

test('first session is day 0 with no return signal; the next day sends return_day once',()=>{
 const win=fakeWindow(),storage=fakeStorage();let t=1_000_000;
 const tel=createTelemetry({window:win,storage,now:()=>t});
 assert.equal(tel.session({returning:false}),0);
 assert.deepEqual(win.sent,[['session_start',{returning:'false',day:0}]]);
 t+=DAY+1;tel.session();tel.session();
 const returns=win.sent.filter(e=>e[0]==='return_day');
 assert.deepEqual(returns,[['return_day',{day:1}]],'return_day is sent once per calendar day');
 assert.equal(win.sent.filter(e=>e[0]==='session_start')[2][1].returning,'true');
});

test('once() fires a funnel event a single time per device and survives a reload',()=>{
 const storage=fakeStorage(),win=fakeWindow();
 const tel=createTelemetry({window:win,storage});
 assert.equal(tel.once('first_upgrade',{station:'SEED STATION'}),true);
 assert.equal(tel.once('first_upgrade',{station:'GROW ROOM'}),false);
 const again=createTelemetry({window:fakeWindow(),storage});
 assert.equal(again.once('first_upgrade'),false,'the marker persisted in storage');
 assert.equal(win.sent.length,1);
});

test('the off switch silences everything, including once() and sessions',()=>{
 const win=fakeWindow(),tel=createTelemetry({window:win,storage:fakeStorage({'canopy-telemetry':'off'})});
 tel.session();tel.once('delivery_pad_built');tel.send('chapter_complete',{chapter:'x'});
 assert.equal(win.sent.length,0);
});

test('events queued before load are drained, later pushes go straight through, and props are sanitised',()=>{
 const bare=fakeWindow();createTelemetry({window:bare,storage:fakeStorage()}).drain();bare.canopyEvents.push(['age_gate',{answer:'no'}]);
 assert.deepEqual(bare.sent,[['age_gate',{answer:'no'}]],'a push after boot with nothing queued before still sends');
 const win=fakeWindow();win.canopyEvents=[['age_gate',{answer:'yes'}]];
 const tel=createTelemetry({window:win,storage:fakeStorage()});
 tel.drain();win.canopyEvents.push(['age_gate',{answer:'no',skip:undefined,seconds:1.2345}]);
 assert.deepEqual(win.sent,[['age_gate',{answer:'yes'}],['age_gate',{answer:'no',seconds:1.23}]]);
});

test('without a provider the Plausible stub queues calls for a script that loads later',()=>{
 const win={document:{hidden:false},setTimeout:()=>0};
 const tel=createTelemetry({window:win,storage:fakeStorage()});
 tel.send('session_start',{day:0});
 assert.equal(typeof win.plausible,'function');
 assert.equal(win.plausible.q.length,1);
 assert.equal(win.plausible.q[0][0],'session_start');
});
