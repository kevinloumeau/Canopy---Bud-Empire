// Marketing (Kevin, 2026-11-09: "in research add a marketing tab with different temporary boosts", and "the marketing
// tab needs a increase of customer flow option"). Four campaigns bought with cash, each a short boost on one part of the
// shop, then a rest before it can run again:
//   Flyers      customer flow: more shoppers, and the door, lines, counters and pickup all move faster
//   Social post every sale pays a little more
//   Happy hour  the rooftop lounge sells for more (once the lounge is built)
//   Billboard   more of the door are VIPs (once VIPs follow the shop)
// They stay well under the store's 2× boost (2× every dollar, 30 minutes an ad, 2 hours a token): the strongest is
// +30% on one part of the shop for a few minutes, live play only (the away pay ignores them).
//
// Prices are seconds of income, like deals.js: a campaign costs SHARE of what it adds at today's shop, so it pays back
// about 1.7× its price at any size of shop. What it adds is measured by the caller (the income model with the campaign
// switched on), so a campaign the shop can't use (more flow when the jars run out first) says so instead of selling.
// Timers run on the wall clock, like the store boost, and survive a reload. A reopen or Start over makes them all ready.
export const CAMPAIGNS=[
  {id:'flyers',name:'Flyers',effect:'+30% customer flow',kind:'flow',amount:.3,seconds:300,rest:600,icon:'marketing-flyers'},
  {id:'social',name:'Social post',effect:'+15% sales',kind:'sales',amount:.15,seconds:300,rest:900,icon:'marketing-social'},
  {id:'happy',name:'Happy hour',effect:'+30% lounge sales',kind:'lounge',amount:.3,seconds:240,rest:1200,icon:'marketing-happy',needs:'lounge'},
  {id:'billboard',name:'Billboard',effect:'+8% VIPs',kind:'vip',amount:.08,seconds:600,rest:1800,icon:'marketing-billboard',needs:'vip'}
];
export const SHARE=.6,MIN_LIFT=.02,MIN_PRICE=50;
export function campaign(id){return CAMPAIGNS.find(c=>c.id===id)||null;}
export function freshMarketing(){const m={};CAMPAIGNS.forEach(c=>{m[c.id]={ends:0,ready:0}});return m;}
// Saves keep timers only for campaigns that still exist, and nothing longer than the campaign itself could set.
export function migrateMarketing(old,now=Date.now()){const m=freshMarketing();if(!old||typeof old!=='object')return m;
  CAMPAIGNS.forEach(c=>{const o=old[c.id];if(!o||typeof o!=='object')return;
    const ends=Number(o.ends),ready=Number(o.ready);
    m[c.id].ends=Number.isFinite(ends)?Math.max(0,Math.min(now+c.seconds*1000,ends)):0;
    m[c.id].ready=Number.isFinite(ready)?Math.max(0,Math.min(now+(c.seconds+c.rest)*1000,ready)):0;});
  return m;}
// Seconds the campaign still runs, and seconds until it can run again (its run plus its rest).
export function runLeft(m,id,now){const t=m&&m[id];return t?Math.max(0,(t.ends-now)/1000):0;}
export function restLeft(m,id,now){const t=m&&m[id];return t?Math.max(0,(t.ready-now)/1000):0;}
// 'running', 'resting' (finished, not ready yet) or 'ready'.
export function phase(m,id,now){return runLeft(m,id,now)>0?'running':restLeft(m,id,now)>0?'resting':'ready';}
// The sum of every running campaign of a kind: flow, sales and lounge as a lift (+0.3), vip as a share (+0.08).
export function lift(m,kind,now){return CAMPAIGNS.reduce((t,c)=>t+(c.kind===kind&&runLeft(m,c.id,now)>0?c.amount:0),0);}
export function factor(m,kind,now){return 1+lift(m,kind,now);}
// The cash price, given income per second and the share of income the campaign adds while it runs.
export function price(id,income,added){const c=campaign(id);if(!c)return Infinity;
  return Math.max(MIN_PRICE,Math.round(Math.max(0,income||0)*Math.max(0,added||0)*c.seconds*SHARE));}
// Starts a campaign that is ready. Returns false when it is running or resting.
export function launch(m,id,now){const c=campaign(id);if(!c||!m[id]||phase(m,id,now)!=='ready')return false;
  m[id].ends=now+c.seconds*1000;m[id].ready=now+(c.seconds+c.rest)*1000;return true;}
// "4:59" / "1:02:00".
export function clock(seconds){const t=Math.max(0,Math.ceil(seconds)),h=Math.floor(t/3600),mm=Math.floor(t%3600/60),s=t%60,pad=n=>String(n).padStart(2,'0');
  return h?h+':'+pad(mm)+':'+pad(s):mm+':'+pad(s);}
