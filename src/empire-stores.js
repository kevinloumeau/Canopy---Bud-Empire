// Empire stores: cards on the (hidden) home list, and each store's page in two tabs (Kevin, 2026-11-03: "focus on the
// station and store upgrades"). Stations: the branch's six-station line as ring tiles, a tap buys a level. Store: the
// store's level, its three store upgrades and its stars. main.js keeps rendering branchBuy and projectBuy by id; this
// module reparents the one and presses the other, and adds the tiles. Tiles share the Empire map's ring look (empire-map.css).
import {isBuilding,buildLeft,buildClock,branchBuildKey,BRANCH_BUILD_SECONDS} from './builds.js';
import {abbr,STORES,STORE_PROJECTS,PROJECT_LEVELS,PROJECT_BONUSES,projectCost,storeCost,storeRate,nextStoreRate,branchOpenable,STARS_TO_OPEN,starStatus,starCount,STAR_BONUS,ringBonus,ringRank,ringTier,RING_NAMES,BRANCH_LINE,BRANCH_LINE_MAX,branchStationCost,branchBestStation} from './progression.js';

const svg=paths=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths+'</svg>';
// Each store's 3D storefront, rendered in Blender at the map's angle (public/icons/3d).
const STORE_ICON=i=>'<img class="icon-3d map-tile-icon" src="icons/3d/store-'+i+'.png" alt="" draggable="false" decoding="async">';
const RING='<svg class="map-ring-track" viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="25"/><circle class="map-ring-fill" cx="28" cy="28" r="25" pathLength="100"/></svg>';
const LOCK_SMALL='<svg class="map-lock" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
const CHECK_SMALL='<svg class="map-lock" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const STAR='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/></svg>';
// Rings after a reopen are silver, then gold (progression.js ringTier); bronze shows the plain look.
const ringOf=p=>ringRank(p)?RING_NAMES[ringTier(p)]:'';
const starRow=(n,ring)=>'<span class="store-stars"'+(ring?' data-ring="'+ring+'"':'')+' aria-hidden="true">'+[0,1,2].map(k=>'<i'+(k<n?' class="on"':'')+'>'+STAR+'</i>').join('')+'</span>';
// The flagship's own station icons (index.html's Stations tab), so a branch's line reads as the same six stations.
const STATION_SHORT=['Seeds','Grow','Harvest','Pack','Orders','Pickup'];
const stationGlyph=j=>{const icon=document.querySelector('[data-machine="'+j+'"] .station-icon');return icon?icon.outerHTML:'';};
// Store upgrades: showcases, checkout, planting.
const PROJECT_GLYPHS=[svg('<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 11h16M9 16h6"/>'),svg('<rect x="3" y="9" width="18" height="11" rx="2"/><path d="M7 9V6h10v3M8 14h3"/>'),svg('<path d="M12 20v-8M12 12c-4 0-6-3-6-7 4 0 6 3 6 7Zm0 0c4 0 6-3 6-7-4 0-6 3-6 7ZM7 20h10"/>')];
const GOAL_NAMES={served:'Customers',level:'Store level',line:'Stations'};
// A store not open yet (Kevin, 2026-11-05: "the unbought lot info doesnt make sense or explains how to get it"): its theme
// and what it earns, then the steps to open it as tiles (stars at the store before, lifetime sales, the lease), then the
// star goals at the store before, each a tap that goes there.
const THEMES=['Neighborhood shop','Historic boutique','Downtown flagship','Desert courtyard','Mountain lodge'];
const COIN=svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M14.5 10a2.5 2 0 0 0-5 0c0 2.5 5 1.5 5 4a2.5 2 0 0 1-5 0"/>');
const KEY=svg('<circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M16 7l2 2M14 9l2 2"/>');
const CHEVRON='<svg class="page-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
// A rate with a small '/s'.
const perText=text=>text+'<span class="map-per">/s</span>';

export function mountEmpireStores({getState,format,buyStation,goStore}){
 const $=id=>document.getElementById(id);
 const el=(tag,cls,html)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(html!=null)n.innerHTML=html;return n;};
 const set=(node,text)=>{if(node.textContent!==text)node.textContent=text;};
 const cards=[],stationUI=[],storeUI=[];

 STORES.forEach((store,i)=>{
  // ---- Home card: the toggle button becomes a card with icon, description, figures and a status chip. ----
  const toggle=$('branchToggle'+i),figures=$('branchLevel'+i),name=toggle.querySelector('.branch-name');
  toggle.classList.add('store-card');
  const icon=el('span','store-icon',STORE_ICON(i)+'<i class="store-dot" hidden></i>');
  // Name and status share the top line; the figures row below keeps the full width so nothing clips at 375px.
  const status=el('span','store-status');
  const stars=el('span','store-name-stars');name.append(stars);const copy=el('span','store-copy');copy.append(name,status,el('small','store-detail',store.detail));
  const meta=el('span','store-meta');meta.append(figures);
  const meter=el('span','store-meter','<i></i>');meter.hidden=true;
  toggle.innerHTML='';toggle.append(icon,copy,meta,meter);
  cards[i]={toggle,status,meter,stars,dot:icon.querySelector('.store-dot'),sig:''};

  mountStations(i);mountStore(i);
 });

 // ---- Stations tab: the branch's six stations as ring tiles, three across. A tap buys one level; the ring fills
 // toward the station's next tier (a doubling every 10 levels). Only the line's best buy wears the brass. ----
 function mountStations(i){
  const pane=$('opPane'+i+'0');if(!pane)return;
  const head=el('div','page-head','<b>Line</b><span class="page-meta"></span>');
  const grid=el('div','page-tiles is-stations');
  const tiles=BRANCH_LINE.map((name,j)=>{const b=el('button','page-tile');b.type='button';
   b.innerHTML='<span class="map-ring">'+RING+'<span class="page-glyph">'+stationGlyph(j)+'</span><b class="page-level"></b></span><b class="map-tile-name">'+STATION_SHORT[j]+'</b><small class="map-tile-figure"></small>';
   b.onclick=()=>{if(buyStation)buyStation(i,j);sync();};grid.append(b);return {b,ring:b.querySelector('.map-ring'),level:b.querySelector('.page-level'),figure:b.querySelector('.map-tile-figure'),sig:''};});
  pane.append(head,grid);
  stationUI[i]={meta:head.querySelector('.page-meta'),tiles};
 }
 // ---- Store tab: the store's level as one hero row, its three store upgrades as tiles, then its stars. ----
 function mountStore(i){
  const pane=$('opPane'+i+'1');if(!pane)return;
  const buy=$('branchBuy'+i);
  const hero=el('section','page-hero');
  const ring=el('span','map-ring',RING+STORE_ICON(i));
  const copy=el('span','page-hero-copy','<b></b><small></small>');
  // While the store before still owes stars, the hero's button goes there instead of buying.
  const go=el('button','page-buy page-go');go.type='button';go.hidden=true;
  if(i)go.innerHTML='<span>'+STORES[i-1].name+'</span>'+CHEVRON,go.setAttribute('aria-label','Go to '+STORES[i-1].name+' to earn stars');
  go.onclick=()=>{if(goStore)goStore(i-1,1);};
  hero.append(ring,copy,buy,go);buy.classList.add('page-buy');
  // To open: one tile per step, read left to right.
  const unlock=el('section','page-group is-unlock');unlock.setAttribute('aria-label','To open');
  const unlockHead=el('div','page-head','<b>To open</b><span class="page-meta"></span>');
  const unlockGrid=el('div','page-tiles'+(i?'':' is-two'));
  const step=(glyph,name)=>{const d=el('div','page-tile map-tile');d.innerHTML='<span class="map-ring">'+RING+'<span class="page-glyph'+(glyph===STAR?' is-star':'')+'">'+glyph+'</span></span><b class="map-tile-name"></b><small class="map-tile-figure"></small>';set(d.querySelector('.map-tile-name'),name);unlockGrid.append(d);
   return {b:d,ring:d.querySelector('.map-ring'),figure:d.querySelector('.map-tile-figure'),sig:''};};
  const steps={stars:i?step(STAR,STORES[i-1].name+' stars'):null,sales:step(COIN,'Total sales'),lease:step(KEY,'Lease')};
  unlock.append(unlockHead,unlockGrid);
  // The store before's three star goals; each opens that store on the tab where the goal is worked.
  const prev=el('section','page-group is-stars is-prev');prev.hidden=true;
  let prevGoals=[],prevMeta=null;
  if(i){prev.setAttribute('aria-label',STORES[i-1].name+' stars');
   const head=el('div','page-head','<b>'+STORES[i-1].name+' stars</b><span class="page-meta"></span>');prevMeta=head.lastChild;
   const grid=el('div','page-tiles');
   prevGoals=[0,1,2].map(k=>{const b=el('button','page-tile map-tile is-goal');b.type='button';b.innerHTML='<span class="map-ring">'+RING+'<span class="page-glyph is-star">'+STAR+'</span></span><b class="map-tile-name"></b><small class="map-tile-figure"></small>';grid.append(b);
    return {b,ring:b.querySelector('.map-ring'),name:b.querySelector('.map-tile-name'),figure:b.querySelector('.map-tile-figure'),sig:''};});
   prev.append(head,grid);}
  const upgrades=el('section','page-group');upgrades.setAttribute('aria-label','Store upgrades');
  const upgradeGrid=el('div','page-tiles');
  const projects=STORE_PROJECTS[i].map((name,j)=>{const b=el('button','page-tile');b.type='button';
   b.innerHTML='<span class="map-ring">'+RING+'<span class="page-glyph">'+PROJECT_GLYPHS[j]+'</span></span><b class="map-tile-name is-wrap">'+name+'</b><small class="map-tile-figure"></small>';
   b.onclick=()=>{$('projectBuy'+i+j).click();sync();};upgradeGrid.append(b);return {b,ring:b.querySelector('.map-ring'),figure:b.querySelector('.map-tile-figure'),sig:''};});
  upgrades.append(upgradeGrid);
  const stars=el('section','page-group is-stars');stars.setAttribute('aria-label','Stars');
  const starGrid=el('div','page-tiles');
  const goals=[0,1,2].map(()=>{const d=el('div','page-tile is-goal');d.innerHTML='<span class="map-ring">'+RING+'<span class="page-glyph is-star">'+STAR+'</span></span><b class="map-tile-name"></b><small class="map-tile-figure"></small>';starGrid.append(d);
   return {b:d,ring:d.querySelector('.map-ring'),name:d.querySelector('.map-tile-name'),figure:d.querySelector('.map-tile-figure'),sig:''};});
  stars.append(starGrid);
  pane.prepend(hero,unlock,prev,upgrades,stars);
  storeUI[i]={hero,ring,copy,buy,go,upgrades,projects,stars,goals,unlock,unlockMeta:unlockHead.lastChild,steps,prev,prevMeta,prevGoals,sig:''};
 }
 const ringShare=(ring,share)=>ring.style.setProperty('--share',Math.max(0,Math.min(1,share)).toFixed(3));
 const paintTile=(t,cls,label,figure,share)=>{const sig=[cls,label,figure,share.toFixed(3)].join('|');if(sig===t.sig)return;t.sig=sig;
  ringShare(t.ring,share);if(t.figure.innerHTML!==figure)t.figure.innerHTML=figure;t.b.className=cls;if(t.b.tagName==='BUTTON')t.b.setAttribute('aria-label',label);t.b.title=label;};
 function syncStations(i,d){
  const u=stationUI[i];if(!u||!d.lvl)return;
  const lines=d.store.lines,best=branchBestStation(d.p,i),money=d.state.money;
  const meta=perText(format(d.rate));if(u.meta.innerHTML!==meta)u.meta.innerHTML=meta;
  u.tiles.forEach((t,j)=>{const level=Math.max(1,lines[j]||1),max=level>=BRANCH_LINE_MAX,cost=max?0:branchStationCost(d.p,i,j,level),afford=!max&&money>=cost,isBest=j===best&&afford;
   set(t.level,String(level));
   const share=max?1:(level%10)/10,label=STORES[i].name+' '+BRANCH_LINE[j]+', level '+level+(max?', maxed':', next level '+format(cost)+(isBest?', best buy':''));
   paintTile(t,'page-tile map-tile'+(max?' is-max':isBest?' is-best':afford?' is-ready':''),label,max?'Max':format(cost),share);});
 }
 function syncStore(i,d){
  const u=storeUI[i];if(!u)return;
  // Hero: the level ring, what the store earns (or what opens it), and its one buy button.
  let title,sub,share;
  if(!d.lvl){title=THEMES[i];sub=d.building?'Opens in '+d.building:'Earns '+perText(format(d.baseRate))+' once open';share=d.building?d.buildShare:d.locked?d.openShare:1;}
  else{title='Level '+d.lvl+' of 10';sub=d.max?'Earns '+perText(format(d.rate)):perText(format(d.rate))+' → '+perText(format(d.next));share=d.lvl/10;}
  const sig=[title,sub,share.toFixed(3),d.locked,d.gated,d.afford,d.max].join('|');
  if(sig!==u.sig){u.sig=sig;set(u.copy.firstChild,title);u.copy.lastChild.innerHTML=sub;ringShare(u.ring,share);
   u.hero.classList.toggle('is-locked',d.locked);u.hero.classList.toggle('is-building',!!d.building);u.buy.classList.toggle('is-off',d.locked||d.max);u.go.hidden=!d.gated;}
  syncUnlock(i,d);
  // One brass on this tab: the cheapest thing it can buy right now, the next level or a store upgrade.
  const buys=[];if(!d.locked&&!d.max&&d.afford)buys.push({k:-1,cost:d.cost});
  if(d.lvl)STORE_PROJECTS[i].forEach((_,j)=>{const cost=projectCost(i,j);if(!d.store.projects[j]&&d.lvl>=PROJECT_LEVELS[j]&&d.state.money>=cost)buys.push({k:j,cost});});
  const best=buys.length?buys.reduce((a,b)=>b.cost<a.cost?b:a).k:null;
  u.buy.classList.toggle('is-best',best===-1||(!!d.building&&!u.buy.disabled));
  u.upgrades.hidden=!d.lvl;
  if(d.lvl)u.projects.forEach((t,j)=>{const done=!!d.store.projects[j],need=PROJECT_LEVELS[j],cost=projectCost(i,j),lockedAt=d.lvl<need,afford=!done&&!lockedAt&&d.state.money>=cost,bonus='+'+Math.round(PROJECT_BONUSES[j]*100)+'%';
   const label=STORE_PROJECTS[i][j]+', '+(done?'built, '+bonus+' sales':lockedAt?'opens at store level '+need:'build for '+format(cost)+', '+bonus+' sales')+(best===j?', best buy':'');
   paintTile(t,'page-tile map-tile'+(done?' is-max':lockedAt?' is-locked':best===j?' is-best':afford?' is-ready':''),label,done?CHECK_SMALL+bonus:lockedAt?LOCK_SMALL+'Lv '+need:format(cost),done?1:lockedAt?d.lvl/need:Math.min(1,d.state.money/cost));});
  syncGoals(i,d);
 }
 // A store not open yet: the steps to open it, then the star goals at the store before (hidden once it opens).
 function syncUnlock(i,d){
  const u=storeUI[i],show=!d.lvl;u.unlock.hidden=!show;u.prev.hidden=!show||!i;if(!show)return;
  const salesDone=d.state.lifetime>=d.def.goal,starsDone=!d.gated,paid=!!d.building,done=[starsDone,salesDone,paid].slice(i?0:1).filter(Boolean).length,total=i?3:2;
  const meta=paid?'Building':done+' of '+total+' done';set(u.unlockMeta,meta);
  const tick=text=>CHECK_SMALL+text;
  if(u.steps.stars)paintTile(u.steps.stars,'page-tile map-tile'+(starsDone?' is-max':''),STARS_TO_OPEN+' stars at '+STORES[i-1].name+', '+Math.min(STARS_TO_OPEN,d.prevStars)+' of '+STARS_TO_OPEN+(starsDone?', done':''),starsDone?tick('Done'):d.prevStars+' / '+STARS_TO_OPEN,Math.min(1,d.prevStars/STARS_TO_OPEN));
  paintTile(u.steps.sales,'page-tile map-tile'+(salesDone?' is-max':''),'Total sales '+format(Math.min(d.state.lifetime,d.def.goal))+' of '+format(d.def.goal)+(salesDone?', done':''),salesDone?tick('Done'):format(d.state.lifetime)+' / '+format(d.def.goal),d.unlockPct/100);
  const canLease=!d.locked&&!paid,leaseFigure=paid?tick('Paid'):d.locked?LOCK_SMALL+format(d.cost):format(d.cost);
  paintTile(u.steps.lease,'page-tile map-tile'+(paid?' is-max':d.locked?' is-locked':canLease&&d.afford?' is-ready':''),'Lease for '+format(d.cost)+', then it builds for '+Math.round(BRANCH_BUILD_SECONDS[i]/60)+' minutes',leaseFigure,paid?1:Math.min(1,d.state.money/d.cost));
  if(!i)return;
  const goals=starStatus(d.p,i-1),count=goals.filter(g=>g.earned).length;setRing(u.prev,ringOf(d.p));
  set(u.prevMeta,count>=STARS_TO_OPEN?count+' of 3 earned':'Any '+STARS_TO_OPEN+' of 3');
  goals.forEach((g,k)=>{const t=u.prevGoals[k];set(t.name,GOAL_NAMES[g.kind]);t.b.onclick=()=>{if(goStore)goStore(i-1,g.kind==='line'?0:1);};
   const figure=g.earned?CHECK_SMALL+'Done':g.kind==='served'?abbr(g.progress)+' / '+abbr(g.target):'Lv '+g.progress+' / '+g.target;
   paintTile(t,'page-tile map-tile is-goal'+(g.earned?' is-max':''),STORES[i-1].name+': '+g.title+(g.earned?', earned':', '+g.progress+' of '+g.target+'. Go there'),figure,g.earned?1:g.progress/g.target);});
 }
 // Stars: three goal tiles, filling as each nears; the head says what all three give.
 function setRing(node,ring){if(!node)return;if(ring)node.dataset.ring=ring;else delete node.dataset.ring;}
 function syncGoals(i,d){
  const u=storeUI[i],goals=starStatus(d.p,i),count=goals.filter(g=>g.earned).length,show=!!d.lvl||count>0;
  u.stars.hidden=!show;if(!show)return;
  const ring=ringOf(d.p),bonus=Math.round(ringBonus(d.p)*100)+'% sales'+(ring?' this run':'');setRing(u.stars,ring);
  const next=STORES[i+1],reward=(ring?ring[0].toUpperCase()+ring.slice(1)+' ring. ':'')+(count===3?'Earned: +'+bonus+(ring?'':' everywhere'):(next&&count<STARS_TO_OPEN?'Any '+STARS_TO_OPEN+' open '+next.name+'. ':'')+'All 3: +'+bonus);
  u.stars.title=reward;u.stars.setAttribute('aria-label','Stars, '+count+' of 3. '+reward);
  goals.forEach((g,k)=>{const t=u.goals[k];set(t.name,GOAL_NAMES[g.kind]);
   const figure=g.earned?CHECK_SMALL+'Done':g.kind==='served'?abbr(g.progress)+' / '+abbr(g.target):'Lv '+g.progress+' / '+g.target;
   paintTile(t,'page-tile map-tile is-goal'+(g.earned?' is-max':''),g.title+(g.earned?', earned':', '+g.progress+' of '+g.target),figure,g.earned?1:g.progress/g.target);});
 }

 function describe(i){
  const state=getState(),p=state.empire,store=p.stores[i],def=STORES[i],lvl=store.level;
  const gated=!branchOpenable(p,i),locked=state.lifetime<def.goal||gated,max=lvl>=10,cost=storeCost(p,i),afford=state.money>=cost,prevStars=i?starCount(p,i-1):3;
  const rate=storeRate(p,i)*state.gameSpeed,next=nextStoreRate(p,i)*state.gameSpeed;
  const baseRate=lvl?rate:nextStoreRate(p,i)*state.gameSpeed;
  const projectReady=lvl?STORE_PROJECTS[i].some((_,j)=>!store.projects[j]&&lvl>=PROJECT_LEVELS[j]&&state.money>=projectCost(i,j)):false;
  const key=branchBuildKey(i),building=!lvl&&isBuilding(state.builds,key)?buildClock(buildLeft(state.builds,key)):'';
  const buildShare=building?1-buildLeft(state.builds,key)/BRANCH_BUILD_SECONDS[i]:0;
  // How far along the steps to open are, for the hero ring: stars and sales, each half (sales alone for the first branch).
  const openShare=i?(Math.min(1,prevStars/STARS_TO_OPEN)+Math.min(1,state.lifetime/def.goal))/2:Math.min(1,state.lifetime/def.goal);
  return {state,p,store,def,lvl,gated,prevStars,locked,max,cost,afford,rate,next,baseRate,projectReady,building,buildShare,openShare,
   unlockPct:Math.min(100,state.lifetime/def.goal*100)};
 }

 function syncCard(i){
  const c=cards[i],d=describe(i);
  let chip='',tone='',dot=false;
  if(d.gated){chip=STORES[i-1].name+' '+d.prevStars+'/'+STARS_TO_OPEN+' ★';tone='locked';}
  else if(d.locked){chip=Math.round(d.unlockPct)+'% there';tone='locked';}
  else if(!d.lvl){chip=d.afford?format(d.cost):'Need '+format(d.cost-d.state.money);tone=d.afford?'ready gold':'';}
  else if(d.max){chip='Max level';tone='max';}
  else{chip=(d.afford?'':'Next · ')+format(d.cost);tone=d.afford?'ready':'';dot=d.projectReady;}
  const starred=d.lvl?starCount(d.p,i):0;
  const ring=ringOf(d.p),sig=[chip,tone,dot,d.locked&&Math.round(d.unlockPct),starred,ring].join('|');
  if(sig===c.sig)return;c.sig=sig;
  c.stars.innerHTML=d.lvl?starRow(starred,ring):'';c.stars.title=d.lvl?starred+' of 3 stars':'';
  if(d.gated){c.status.innerHTML=starRow(d.prevStars,ring);c.status.title='Earn '+STARS_TO_OPEN+' stars at '+STORES[i-1].name;c.status.setAttribute('aria-label',chip);}else{set(c.status,chip);c.status.removeAttribute('title');c.status.removeAttribute('aria-label');}c.status.className='store-status'+(tone?' '+tone.split(' ').map(t=>'is-'+t).join(' '):'');
  c.dot.hidden=!dot;c.meter.hidden=!d.locked||d.gated;if(d.locked)c.meter.firstChild.style.width=(d.gated?Math.min(1,d.prevStars/STARS_TO_OPEN)*100:d.unlockPct)+'%';
  c.toggle.classList.toggle('is-locked',d.locked);c.toggle.classList.toggle('has-ready',!!tone&&tone!=='max'&&tone!=='locked');
 }

 function sync(){STORES.forEach((_,i)=>{syncCard(i);const d=describe(i);syncStations(i,d);syncStore(i,d);});}
 sync();
 return {sync};
}
