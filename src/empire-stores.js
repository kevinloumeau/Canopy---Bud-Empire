// Empire stores: cards on the home list and a hero-led store screen.
// main.js keeps rendering the existing controls by id (branchToggle, branchLevel, branchBuy, branchVisit,
// openingClaim, projectBuy, bulkDispatch); this module reparents them into a clearer structure and adds
// derived, read-only figures (level, income now / after upgrade, affordability, unlock progress).
import {abbr,STORES,STORE_PROJECTS,PROJECT_LEVELS,PROJECT_BONUSES,projectCost,storeCost,storeRate,nextStoreRate,saleMultiplier} from './progression.js';
import {openingStatus,LINES,STAFF,REGULARS,COSMETICS,shelfCapacity,shelfUsed,staffLevel} from './operations.js';
import {MANAGERS} from './progression.js';

const svg=paths=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths+'</svg>';
const ICONS=[
 svg('<path d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 19c2-2 4-2 6 0s4 2 6 0 4-2 6 0M12 11V3M12 11c-3.3 0-5.5-2.2-5.5-5.5C9.8 5.5 12 7.7 12 11Zm0 0c3.3 0 5.5-2.2 5.5-5.5C14.2 5.5 12 7.7 12 11Z"/>'),
 svg('<path d="M4 21V9l8-6 8 6v12M3 21h18M9 21v-6a3 3 0 0 1 6 0v6M4 12h16"/>'),
 svg('<path d="M3 21h18M5 21V9h5v12M10 21V4h6v17M16 21v-8h3v8M7 12h1M7 15h1M12 8h2M12 11h2M12 14h2"/>')
];
const LOCK=svg('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>');
const CHECK=svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>');
const SPECIALTY=['Exclusive strains','Boutique products','Bulk deliveries'];
const STYLE_GLYPHS={
 plants:[svg('<path d="M12 21v-9M12 12c-4 0-7-3-7-7 4 0 7 3 7 7Zm0 0c4 0 7-3 7-7-4 0-7 3-7 7Z"/>'),svg('<circle cx="12" cy="9" r="2.5"/><path d="M12 3.5v3M12 11.5v3M6.5 9h3M14.5 9h3M8 5l2 2M14 11l2 2M16 5l-2 2M10 11l-2 2M12 14.5V21"/>'),svg('<path d="M12 21V4a2 2 0 0 0-4 0v0M8 21V12M12 8h3a2 2 0 0 1 0 4h-3M8 12H6a2 2 0 0 1 0-4h2M6 21h10"/>')],
 layout:[svg('<rect x="3" y="12" width="18" height="7" rx="2"/><path d="M6 12V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4M3 19v2M21 19v2"/>'),svg('<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10h16M9 10v10M15 10v10"/>')]
};
const PERSON=svg('<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 21a7 7 0 0 1 14 0"/>');
const EXPANSIONS=[[3,'Display wing'],[5,'Specialist employee'],[7,'Terrace']];

export function mountEmpireStores({getState,format}){
 const $=id=>document.getElementById(id);
 const el=(tag,cls,html)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(html!=null)n.innerHTML=html;return n;};
 const set=(node,text)=>{if(node.textContent!==text)node.textContent=text;};
 const cards=[],heroes=[];
 const stockUI=[],peopleUI=[],styleUI=[];
 const card=(cls,title,count)=>{const c=el('section','store-panel '+cls);if(title)c.append(el('h4','store-section-title',title+(count?' <span class="store-section-count"></span>':'')));return c;};
 const field=id=>{const n=$(id);return n?n.closest('.pill-field'):null;};

 STORES.forEach((store,i)=>{
  // ---- Home card: the toggle button becomes a card with icon, description, figures and a status chip. ----
  const toggle=$('branchToggle'+i),figures=$('branchLevel'+i),name=toggle.querySelector('.branch-name');
  toggle.classList.add('store-card');
  const icon=el('span','store-icon',ICONS[i]+'<i class="store-dot" hidden></i>');
  // Name and status share the top line; the figures row below keeps the full width so nothing clips at 375px.
  const status=el('span','store-status');
  const copy=el('span','store-copy');copy.append(name,status,el('small','store-detail',store.detail));
  const meta=el('span','store-meta');meta.append(figures);
  const meter=el('span','store-meter','<i></i>');meter.hidden=true;
  toggle.innerHTML='';toggle.append(icon,copy,meta,meter);
  cards[i]={toggle,status,meter,dot:icon.querySelector('.store-dot'),sig:''};

  // ---- Store screen: hero, grand opening, at-a-glance stats, bulk delivery, projects. ----
  const overview=$('opPane'+i+'0'),buy=$('branchBuy'+i),visit=$('branchVisit'+i),opening=overview.querySelector('.opening-task'),projects=overview.querySelector('.branch-projects');
  const hero=el('section','store-hero');hero.setAttribute('aria-label',store.name+' overview');
  const head=el('div','hero-head','<span class="store-icon">'+ICONS[i]+'</span><span class="hero-copy"><b class="hero-tag">'+SPECIALTY[i]+'</b><span class="hero-detail">'+store.detail+'</span></span>');
  const level=el('div','hero-level');
  const income=el('div','hero-income');
  const actions=el('div','hero-actions');actions.append(buy,visit);
  const hint=el('p','hero-hint');
  hero.append(head,level,income,actions,hint);
  const openingCard=el('section','store-opening');openingCard.hidden=true;
  const openingTitle=el('h4','store-section-title','Grand opening <span class="store-section-count"></span>');
  if(opening)openingCard.append(openingTitle,opening);
  const stats=el('section','store-stats');stats.setAttribute('aria-label',store.name+' at a glance');
  stats.innerHTML=[['Loyalty','loyalty'],['Served','served'],['Next unlock','next']].map(([label,key])=>'<div class="store-stat"><small>'+label+'</small><b data-stat="'+key+'">—</b><span data-sub="'+key+'"></span></div>').join('');
  let bulk=null;const dispatch=$('bulkDispatch');
  if(i===2&&dispatch&&dispatch.closest('.branch-management')){bulk=el('section','store-bulk');bulk.innerHTML='<h4 class="store-section-title">Bulk delivery</h4>';const row=el('div','store-bulk-row');const detail=$('bulkDetail');row.append(detail,dispatch);bulk.append(row);}
  if(projects){projects.open=true;const summary=projects.querySelector('summary');summary.addEventListener('click',e=>e.preventDefault());summary.classList.add('store-section-title');
   STORE_PROJECTS[i].forEach((_,j)=>{const row=$('projectBuy'+i+j).closest('.branch-project');row.prepend(el('span','project-mark',CHECK));});}
  const body=overview;body.prepend(hero);hero.after(openingCard);openingCard.after(stats);if(bulk)stats.after(bulk);
  heroes[i]={hero,level,income,buy,visit,hint,openingCard,openingCount:openingTitle.querySelector('.store-section-count'),stats,projects,sig:''};
  mountStock(i);mountPeople(i);mountStyle(i);
 });

 // ---- Stock: supply meters, featured / production cards, shelf rows with fill meters, logistics regrouped. ----
 function mountStock(i){
  const pane=$('opPane'+i+'1');if(!pane)return;
  const supply=el('section','supply-strip');supply.setAttribute('aria-label','Supply');
  supply.innerHTML=[['Harvest','harvest'],['Shelf space','shelf']].map(([label,key])=>'<div class="supply-tile"><small>'+label+'</small><b data-supply="'+key+'">—</b><span class="supply-meter"><i data-meter="'+key+'"></i></span></div>').join('');
  const featured=card('stock-featured','Featured product');featured.append(field('featured'+i),$('featuredEffect'+i));
  const make=card('stock-make','Production',true);make.append(field('recipe'+i),$('craftStatus'+i));
  const shelves=card('stock-shelves','Shelves',true);const list=pane.querySelector('.shelf-list');shelves.append(list);
  LINES.forEach((line,j)=>{const row=list.querySelector('#shelfAllocation'+i+j).closest('.shelf-row');row.classList.add('line-row');const copy=row.firstElementChild;const meter=el('span','line-meter','<i></i>');copy.append(meter);});
  const logistics=pane.querySelector('.operation-details');logistics.classList.add('store-panel','stock-logistics');
  const summary=logistics.querySelector('summary');summary.classList.add('store-section-title');
  const groups=[['Transfers',[$('importHarvest'+i).closest('.operation-row'),field('transferTo'+i),$('transferSend'+i),$('transferReason'+i)]],['Deliveries',[field('deliveryLine'+i),field('deliveryArea'+i),field('walkinReserve'+i),$('deliverySend'+i),$('deliveryHint'+i)]],['Drivers',[$('routes'+i),$('fleetLabel'+i).closest('.operation-row'),$('areaUpgrade'+i).closest('.operation-row')]]];
  const vansNote=logistics.querySelector('p.operation-hint:not([id])');
  groups.forEach(([title,nodes])=>{const g=el('div','logistics-group');g.append(el('h5','logistics-title',title));nodes.forEach(n=>n&&g.append(n));if(title==='Drivers'&&vansNote)g.append(vansNote);logistics.append(g);});
  pane.prepend(supply);supply.after(featured);featured.after(make);make.after(shelves);shelves.after(logistics);
  pane.querySelector('.operation-stats').hidden=true;
  stockUI[i]={supply,makeCount:make.querySelector('.store-section-count'),shelfCount:shelves.querySelector('.store-section-count'),sig:''};
 }
 function mountPeople(i){
  const pane=$('opPane'+i+'2');if(!pane)return;
  const manager=card('people-manager','Store manager');const current=el('div','manager-current','<span class="person-avatar"></span><span class="manager-copy"><b></b><small></small></span>');manager.append(current,$('managerSummary'+i));
  const team=card('people-team','Specialists');
  Object.keys(STAFF).forEach(id=>{const row=$('assign'+i+id).closest('.operation-row');row.classList.add('person-row');row.dataset.person=id;const copy=row.firstElementChild;copy.classList.add('person-copy');const avatar=el('span','person-avatar',STAFF[id].name[0]);row.prepend(avatar);
   const nameRow=el('span','person-name');nameRow.append(copy.firstElementChild,el('em','person-where'));copy.prepend(nameRow);
   const level=el('span','person-level','<span class="store-pips" aria-hidden="true"></span><b></b>');copy.insertBefore(level,copy.children[1]);row.querySelector('#staffInfo'+i+id).classList.add('sr-only');team.append(row);});
  const regular=card('people-regular','Regular customer');
  const head=el('div','regular-head','<span class="person-avatar is-regular">'+REGULARS[i].name[0]+'</span><span class="regular-copy"><b>'+REGULARS[i].name+'</b><small>'+REGULARS[i].role+'</small></span>');
  const track=el('div','regular-track','<span class="store-pips regular-pips" aria-hidden="true"><i></i><i></i><i></i></span>');track.append($('relationship'+i));
  const request=$('storyServe'+i).closest('.operation-row');request.classList.add('regular-request');
  regular.append(head,track,$('storyTitle'+i),request,$('storyHint'+i));
  pane.querySelectorAll('h4:not(.store-section-title)').forEach(h=>h.remove());
  pane.append(manager,team,regular);
  peopleUI[i]={current,pane,sig:''};
 }
 function mountStyle(i){
  const pane=$('opPane'+i+'3');if(!pane)return;
  const intro=pane.querySelector('p.operation-hint:not([id])');
  const hood=$('neighborhood'+i);hood.classList.add('style-neighborhood');const head=el('div','style-head');head.append(intro,hood);
  const look=card('style-look','Your look');
  Object.keys(COSMETICS).forEach(key=>{const f=field('style'+i+key);f.classList.add('style-field');if(STYLE_GLYPHS[key])f.querySelectorAll('.pill-group button').forEach((b,j)=>b.insertAdjacentHTML('afterbegin','<span class="pill-glyph">'+STYLE_GLYPHS[key][j]+'</span>'));look.append(f);});
  const preview=$('previewStyle'+i);preview.classList.add('style-preview');preview.textContent='View this store';
  pane.append(head,look,preview);
  styleUI[i]={sig:''};
 }
 function syncTabs(i){
  const state=getState(),p=state.empire,n=p.network,s=n.stores[i];
  if(stockUI[i]){const u=stockUI[i],cap=shelfCapacity(p,i),used=shelfUsed(s);
   const sig=[Math.floor(s.raw),used,cap,s.stock.join(),s.shelves.join(),s.sold,s.recipe].join('|');
   if(sig!==u.sig){u.sig=sig;const v=k=>u.supply.querySelector('[data-supply="'+k+'"]'),m=k=>u.supply.querySelector('[data-meter="'+k+'"]');
    set(v('harvest'),Math.floor(s.raw)+' / 120');m('harvest').style.width=Math.min(100,s.raw/120*100)+'%';
    set(v('shelf'),used+' / '+cap);m('shelf').style.width=Math.min(100,used/cap*100)+'%';
    set(u.makeCount,LINES[s.recipe].name+' · '+s.sold+' sold');set(u.shelfCount,used+' / '+cap+' used');
    LINES.forEach((_,j)=>{const meter=$('shelfAllocation'+i+j).closest('.shelf-row').querySelector('.line-meter');const on=n.recipes[j]&&s.shelves[j]>0;meter.hidden=!on;if(on)meter.firstChild.style.width=Math.min(100,s.stock[j]/s.shelves[j]*100)+'%';$('shelfAllocation'+i+j).closest('.shelf-row').classList.toggle('is-locked',!n.recipes[j]);});}}
  if(peopleUI[i]){const u=peopleUI[i],mgr=MANAGERS.find(m=>m.id===p.stores[i].manager)||MANAGERS[0];
   const sig=[p.stores[i].manager,Object.keys(STAFF).map(id=>staffLevel(n,id)+':'+Math.floor(n.staff[id].xp)+':'+p.stores.findIndex(st=>st.manager===id)).join(),s.relationship,s.storyWait>0].join('|');
   if(sig!==u.sig){u.sig=sig;
    u.current.classList.toggle('is-none',mgr.id==='none');u.current.querySelector('.person-avatar').innerHTML=mgr.id==='none'?PERSON:STAFF[mgr.id].name[0];
    set(u.current.querySelector('b'),mgr.id==='none'?'Local team':STAFF[mgr.id].name+' · '+STAFF[mgr.id].specialty.toLowerCase());set(u.current.querySelector('small'),mgr.detail);
    Object.keys(STAFF).forEach(id=>{const row=u.pane.querySelector('[data-person="'+id+'"]'),lvl=staffLevel(n,id),where=p.stores.findIndex(st=>st.manager===id);
     row.classList.toggle('is-here',where===i);row.querySelector('.store-pips').innerHTML=[0,1,2,3,4].map(k=>'<i'+(k<lvl?' class="on"':'')+'></i>').join('');
     set(row.querySelector('.person-level b'),STAFF[id].specialty+' '+lvl+'/5');row.querySelector('.person-level').title=Math.floor(n.staff[id].xp)+' XP';set(row.querySelector('.person-where'),where===i?'Here':where>=0?STORES[where].name:'Free');});
    u.pane.querySelectorAll('.regular-pips i').forEach((dot,k)=>dot.classList.toggle('on',k<s.relationship));
    u.pane.querySelector('.people-regular').classList.toggle('is-complete',s.relationship===3);}}
 }

 function describe(i){
  const state=getState(),p=state.empire,store=p.stores[i],def=STORES[i],lvl=store.level;
  const locked=state.lifetime<def.goal,max=lvl>=10,cost=storeCost(p,i),afford=state.money>=cost;
  const rate=storeRate(p,i)*state.gameSpeed,next=nextStoreRate(p,i)*state.gameSpeed;
  const baseRate=def.rate*saleMultiplier(p)*Math.max(1,p.retailBoost||1);
  const opening=lvl?openingStatus(p,i):null,step=lvl?p.network.stores[i].opening:0;
  const projectReady=lvl?STORE_PROJECTS[i].some((_,j)=>!store.projects[j]&&lvl>=PROJECT_LEVELS[j]&&state.money>=projectCost(i,j)):false;
  const expansion=EXPANSIONS.find(([at])=>lvl<at);
  return {state,p,store,def,lvl,locked,max,cost,afford,rate,next,baseRate,opening,step,projectReady,expansion,
   unlockPct:Math.min(100,state.lifetime/def.goal*100),
   loyaltyNote:store.loyalty>=60?'VIP following':'VIPs at 60'};
 }

 function syncCard(i){
  const c=cards[i],d=describe(i);
  let chip='',tone='',dot=false;
  if(d.locked){chip=Math.round(d.unlockPct)+'% there';tone='locked';}
  else if(!d.lvl){chip=d.afford?'Ready to open':'Need '+format(d.cost-d.state.money);tone=d.afford?'ready gold':'';}
  else if(d.max){chip='Max level';tone='max';}
  else{chip=(d.afford?'Upgrade · ':'Next · ')+format(d.cost);tone=d.afford?'ready':'';dot=(d.opening&&d.opening.ready)||d.projectReady;}
  const sig=[chip,tone,dot,d.locked&&Math.round(d.unlockPct)].join('|');
  if(sig===c.sig)return;c.sig=sig;
  set(c.status,chip);c.status.className='store-status'+(tone?' '+tone.split(' ').map(t=>'is-'+t).join(' '):'');
  c.dot.hidden=!dot;c.meter.hidden=!d.locked;if(d.locked)c.meter.firstChild.style.width=d.unlockPct+'%';
  c.toggle.classList.toggle('is-locked',d.locked);c.toggle.classList.toggle('has-ready',!!tone&&tone!=='max'&&tone!=='locked');
 }

 function pips(lvl){let out='';for(let k=0;k<10;k++)out+='<i'+(k<lvl?' class="on"':'')+'></i>';return '<span class="store-pips" aria-hidden="true">'+out+'</span>';}
 function syncHero(i){
  const h=heroes[i],d=describe(i);
  const sig=[d.lvl,d.locked,d.max,d.afford,d.cost,Math.round(d.rate*100),Math.round(d.next*100),Math.round(d.baseRate*100),d.step,d.opening&&d.opening.progress,d.opening&&d.opening.ready,d.store.loyalty,d.store.served,Math.round(d.unlockPct),d.state.money>=d.cost?1:Math.round((d.cost-d.state.money)/50),d.projectReady].join('|');
  if(sig===h.sig)return;h.sig=sig;
  h.hero.classList.toggle('is-locked',d.locked);h.hero.classList.toggle('is-closed',!d.locked&&!d.lvl);h.hero.classList.toggle('is-ready',!d.locked&&!d.max&&d.afford);h.hero.classList.toggle('is-max',d.max);
  if(d.locked){
   h.level.innerHTML='<span class="hero-lock">'+LOCK+'</span><span class="hero-level-copy"><b>Unlocks at '+format(d.def.goal)+' lifetime revenue</b><small>'+format(d.state.lifetime)+' earned · '+Math.round(d.unlockPct)+'%</small></span><span class="hero-meter"><i style="width:'+d.unlockPct+'%"></i></span>';
   h.income.innerHTML='<b>'+format(d.baseRate)+'/s</b><span>when open</span>';
   h.hint.textContent='Keep selling at the main shop to unlock this location.';
  }else if(!d.lvl){
   h.level.innerHTML='<span class="hero-level-copy"><b>'+(d.afford?'Ready to open':'Unlocked')+'</b><small>'+(d.afford?'Opening takes you to the new store':'Need '+format(d.cost-d.state.money)+' more to open')+'</small></span>';
   h.income.innerHTML='<b>'+format(d.baseRate)+'/s</b><span>when open</span>';
   h.hint.textContent='Earns automatically, even while you are away (up to 4 hours).';
  }else{
   h.level.innerHTML=pips(d.lvl)+'<span class="hero-level-copy"><b>Level '+d.lvl+' of 10</b><small>'+(d.max?'Fully upgraded':'Level '+(d.lvl+1)+' adds +'+format(d.next-d.rate)+'/s')+'</small></span>';
   h.income.innerHTML='<b>'+format(d.rate)+'/s</b><span>now</span>'+(d.max?'':'<em class="hero-arrow" aria-hidden="true">→</em><b class="is-next">'+format(d.next)+'/s</b><span>after upgrade</span>');
   h.hint.textContent=d.max?'This store has reached its final level.':d.afford?'':'Need '+format(d.cost-d.state.money)+' more for level '+(d.lvl+1)+'.';
  }
  h.hint.hidden=!h.hint.textContent;
  // Grand opening: three steps with a visible counter; hidden once complete or before the store exists.
  const showOpening=!!d.lvl&&d.step<3;h.openingCard.hidden=!showOpening;if(showOpening)set(h.openingCount,'Step '+(d.step+1)+' of 3');
  h.openingCard.classList.toggle('is-ready',showOpening&&d.opening.ready);
  h.stats.hidden=!d.lvl;
  if(d.lvl){
   const v=k=>h.stats.querySelector('[data-stat="'+k+'"]'),s=k=>h.stats.querySelector('[data-sub="'+k+'"]');
   set(v('loyalty'),String(d.store.loyalty));set(s('loyalty'),d.loyaltyNote);
   set(v('served'),abbr(d.store.served));set(s('served'),'customers');
   set(v('next'),d.expansion?'Lv '+d.expansion[0]:'Built');set(s('next'),d.expansion?d.expansion[1]:'All expansions');
  }
  if(h.projects){h.projects.classList.toggle('has-ready',d.projectReady);
   STORE_PROJECTS[i].forEach((_,j)=>{const row=$('projectBuy'+i+j).closest('.branch-project'),owned=d.store.projects[j],lockedAt=d.lvl<PROJECT_LEVELS[j];
    row.classList.toggle('is-installed',!!owned);row.classList.toggle('is-locked',!owned&&lockedAt);row.classList.toggle('is-ready',!owned&&!lockedAt&&d.state.money>=projectCost(i,j));});}
 }

 function sync(){STORES.forEach((_,i)=>{syncCard(i);syncHero(i);syncTabs(i);});}
 sync();
 return {sync};
}
