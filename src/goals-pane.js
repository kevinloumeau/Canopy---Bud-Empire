import {abbr,unabbr,STORES,starStatus,starCount,SHIFT_LENGTH,ringRank} from './progression.js';
import {milestone} from './depth.js';
import {tieLast} from './no-lone-words.js';
import {untilLabel} from './deals.js';
import {ACHIEVEMENTS,achievementRows} from './achievements.js';
// Goals tab (redesign 2026-11-09, Kevin: "the layout should be thought out better, the deals don't look purchasable,
// the rewards button should always be visible with different states"). Three layers, top to bottom:
//   1. A segmented row picks one of three sections: Shift (what to do now), Deals (what to buy now) and Awards (the
//      long climbs). Each segment shows its 3D icon, its name and one figure (goals done, time left, awards won).
//   2. The section fills the room between: the shift's three goals as big rings with the contract and the story under
//      them; the deals as three shop tiles, each with a real price button; the awards as ring tiles that name what
//      comes next.
//   3. The reward button, pinned at the bottom of every section, never hidden. It has four states: ready (brass, the
//      total and Collect), in progress (a dark bar that fills toward the nearest reward, with its percentage),
//      locked (nothing under way, says when the next one comes) and collected (lime tick and the amount, for a moment).
// main.js keeps rendering the original controls by id (shift goals, contract, career, milestone, daily, season, story);
// they live hidden here, and the pane reads their text and clicks their buttons, so every reward, price and handler
// stays in one place.
const SVG=d=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg>';
const ICONS={
 tick:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
 star:'<path d="m12 4 2.4 5 5.4.6-4 3.7 1.1 5.4L12 16l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6Z"/>',
 gift:'<rect x="4" y="9" width="16" height="11" rx="1"/><path d="M4 13h16M12 9v11M12 9c-1.5-3-5-3.5-5-1.5S10 9 12 9Zm0 0c1.5-3 5-3.5 5-1.5S14 9 12 9Z"/>',
 target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/>',
 bolt:'<path d="M13 3 5 14h6l-1 7 8-11h-6Z"/>',
 lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
 clock:'<circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.5 2.5"/>',
 play:'<path d="M8 5.5v13l10-6.5Z"/>'
};
// 3D icons rendered in Blender at the map's angle (public/icons/3d/goal-*.png, art/blender/goal_icons.py), like the other tabs.
const ICONS_3D=new Set(['gift','trophy','coin','star','up','calendar','contract','book','person','box','bag','leaf','screen','target']);
// A name with a dash is a whole file name in icons/3d (the deals reuse the research icons).
const I3D=(n,cls)=>/-/.test(n)?'<img class="goal-3d'+(cls?' '+cls:'')+'" src="icons/3d/'+n+'.png" alt="" draggable="false" decoding="async">':ICONS_3D.has(n)?'<img class="goal-3d'+(cls?' '+cls:'')+'" src="icons/3d/goal-'+n+'.png" alt="" draggable="false" decoding="async">':SVG(ICONS[n]||ICONS.target);
// Pick an icon from a goal's own words, so a new goal type still gets a sensible picture.
const iconFor=t=>{t=(t||'').toLowerCase();
 return /contract/.test(t)?'contract':/share/.test(t)?'trophy':/city|hq|building/.test(t)?'up':/deliver|online|drone|web/.test(t)?'box':/kiosk/.test(t)?'screen':/strain|grow|seed|plant/.test(t)?'leaf':/upgrade|level|lv\b|station/.test(t)?'up':
  /earn|revenue|cash|\$/.test(t)?'coin':/sell|bag|pack/.test(t)?'bag':/serve|customer|walk-in|spender|guest|welcome/.test(t)?'person':/star/.test(t)?'star':'target';};
const SOURCES=['dailyClaim','careerClaim','claim','seasonClaim','goalClaim0','goalClaim1','goalClaim2'];
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const title=t=>String(t||'').toLowerCase().replace(/\b\w/g,c=>c.toUpperCase());
// "$1.50K" -> 1500, so the reward button can show one total.
export const dollars=text=>{const m=/\$[\d.,]+(?:Dc|No|Oc|Sp|Sx|Qi|Qa|[KMBT])?/.exec(text||'');return m?unabbr(m[0].slice(1)):0;};
const short=n=>abbr(Math.floor(n)).replace(/\.0+([A-Za-z]+)$/,'$1').replace(/(\.\d)0([A-Za-z]+)$/,'$1$2');
const clamp=v=>Math.max(0,Math.min(1,Number(v)||0));
const pct=v=>Math.floor(clamp(v)*100)+'%';
// The reward button's states and how long the collected one stays up.
export const REWARD_STATES=['ready','progress','locked','done'];
const DONE_MS=2400;
// The three sections, in the order of the segmented row.
export const SECTIONS=[{key:'shift',label:'Shift',icon:'target'},{key:'deals',label:'Deals',icon:'gift'},{key:'awards',label:'Awards',icon:'trophy'}];

// Which state the reward button is in: a moment after a collect it says so; with anything to collect it is ready;
// with a goal under way it shows the nearest one filling; with nothing under way it is locked.
export function rewardState({collected,ready,next}){
 if(collected)return 'done';if(ready>0)return 'ready';if(next)return 'progress';return 'locked';}

export function mountGoalsPane({pane,sources,getState,format,rate,deals}){
 const $=id=>document.getElementById(id);
 const fmt=n=>format?format(n):'$'+short(n);
 const screen=document.createElement('div');screen.className='empire-screen empire-content goals-screen gb';
 const tabs=document.createElement('div');tabs.className='gb-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Goals sections');
 const body=document.createElement('div');body.className='gb-body';
 const reward=document.createElement('button');reward.type='button';reward.className='gb-reward';
 const hidden=document.createElement('div');hidden.className='goals-sources';hidden.hidden=true;hidden.append(...sources.filter(Boolean));
 screen.append(tabs,body,reward,hidden);pane.append(screen);

 const ready=()=>SOURCES.map($).filter(b=>b&&!b.disabled&&!b.hidden&&/^Collect\b/.test(b.textContent.trim()));
 const text=id=>{const n=$(id);return n?n.textContent.trim():'';};
 const bar=id=>{const n=$(id);return n&&n.value!=null&&n.max?n.value/n.max:null;};

 // Each ready reward as {icon,label,why,amount}; the shift bonus pays with the goal that closes the shift.
 function reasons(s,buttons){const rows=[],p=s.empire;let shiftGoals=0;
  buttons.forEach(b=>{const id=b.id,amount=dollars(b.textContent);
   if(id.startsWith('goalClaim')){shiftGoals++;rows.push({icon:iconFor(text('goalTitle'+id.slice(-1))),label:text('goalTitle'+id.slice(-1)),why:'Shift goal done',amount});}
   else if(id==='dailyClaim')rows.push({icon:'calendar',label:text('dailyTitle').replace(/ is ready$/,'')+' of 7',why:'Daily visit · grows each day',amount});
   else if(id==='careerClaim')rows.push({icon:'trophy',label:text('careerName'),why:'Career milestone · +5% sales',amount});
   else if(id==='claim'){const m=milestone(s.contract);rows.push({icon:'coin',label:m?title(m.name):'Milestone',why:m?'Earned '+fmt(m.goal)+' total':'Milestone',amount:m?m.reward:amount});}
   else if(id==='seasonClaim')rows.push({icon:'calendar',label:text('seasonName'),why:'Event step '+Math.min(3,((p.season&&p.season.claimed)||0)+1)+' of 3',amount});});
  if(shiftGoals&&p&&SHIFT_LENGTH-p.goalsCompleted%SHIFT_LENGTH<=shiftGoals){const bonus=shiftBonus();
   if(bonus)rows.push({icon:'star',label:shiftTitle()+' bonus',why:'All '+SHIFT_LENGTH+' goals done',amount:bonus});}
  return rows;}

 // A ring is a circle whose stroke covers the share done, around the goal's 3D icon; finished ones add a lime tick.
 const ring=(icon,share,done,cls)=>'<span class="goal-ring'+(done?' is-done':'')+(cls?' '+cls:'')+'" style="--share:'+(done?1:clamp(share)).toFixed(3)+'">'+
  '<svg class="goal-ring-track" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="19"/><circle class="goal-ring-fill" cx="22" cy="22" r="19" pathLength="100"/></svg>'+
  I3D(ICONS_3D.has(icon)||/-/.test(icon)?icon:'target')+(done?'<i class="goal-ring-tick">'+SVG(ICONS.tick)+'</i>':'')+'</span>';

 // ---------- Data, read from the hidden controls main.js renders ----------
 function shift(){return [0,1,2].map(i=>{const b=$('goalClaim'+i),t=text('goalTitle'+i);if(!t)return null;
  return {title:t,icon:iconFor(t),figure:text('goalCount'+i).split(' · ')[0],share:bar('goalProgress'+i),done:!!(b&&b.classList.contains('ready')),reward:b?dollars(b.textContent):0};}).filter(Boolean);}
 // #shiftProgress is "<span>Shift 4</span><pips/><span>2 more goals for a $476K bonus</span>".
 const shiftSpans=()=>$('shiftProgress')?[...$('shiftProgress').querySelectorAll(':scope>span:not(.shift-pips)')]:[];
 function shiftTitle(){const s=shiftSpans();return s.length?s[0].textContent.trim():'This shift';}
 function shiftBonus(){const s=shiftSpans();const m=s.length>1?/(\$[\d.,]+(?:Dc|No|Oc|Sp|Sx|Qi|Qa|[KMBT])?) bonus/.exec(s[s.length-1].textContent):null;return m?unabbr(m[1].slice(1)):0;}
 function contract(){const name=text('contractName');if(!name||name==='No contract yet')return null;
  const running=text('contractKicker')==='Contract running',boost=$('contractBoost'),boostRow=$('contractBoostRow');
  const canBoost=running&&boostRow&&!boostRow.hidden&&boost&&!boost.hidden;
  // #contractTime is "512 / 1.03K · 12:30 left" while running.
  const goal=text('contractGoal'),[count,clock]=text('contractTime').split(' · '),[done,target]=(count||'').split(' / ').map(unabbr);
  return {name,goal,running,canBoost,clock:clock||'',share:running&&target?done/target:null,title:name+' · '+goal+(running?' · '+text('contractTime'):'')};}
 function story(){const t=text('storyTitle');if(!t)return null;return {task:text('storyTask').split(' · ')[0],count:text('storyCount'),title:t+' · '+text('storyTask')};}
 // Awards: one tile per long climb, each naming its nearest step.
 function stars(p){let i=-1;STORES.forEach((_,k)=>{if(p.stores[k].level>0&&starCount(p,k)<3)i=k;});if(i<0)return null;
  const goals=starStatus(p,i),earned=goals.filter(g=>g.earned).length,next=goals.find(g=>!g.earned);
  const tier=ringRank(p)?goals[0].tier:'';
  return {key:'stars',icon:'star',label:'Stars',figure:earned+'/3',share:next?next.progress/next.target:1,title:STORES[i].name+(tier?' '+tier:'')+' stars',next:next?next.title:''};}
 function achievements(s){const all=achievementRows(s),todo=all.filter(r=>!r.done).sort((a,b)=>b.share-a.share),done=all.length-all.filter(r=>!r.done).length;
  const n=todo[0];return {key:'awards',icon:'trophy',label:'Awards',figure:done+'/'+ACHIEVEMENTS.length,share:n?n.share:1,title:'Achievements',next:n?n.goal:''};}
 function career(){if(!text('careerName')||!text('careerDetail'))return null;
  return {key:'career',icon:'up',label:'Career',figure:'+5%',share:bar('careerProgress')||0,title:text('careerName')+' · '+text('careerDetail'),next:title(text('careerName'))};}
 function order(){const n=text('orderName');if(!n||n==='ALL ORDERS FILLED')return null;const fill=$('orderFill');
  return {key:'order',icon:'coin',label:'Bonus',figure:text('claimReward'),share:fill?parseFloat(fill.style.width)/100:0,title:'Milestone bonus · '+text('orderProgress'),next:text('orderProgress').split(' / ')[1]?'Earn '+text('orderProgress').split(' / ')[1]:''};}
 function offers(){if(!deals||!deals.get)return null;const d=deals.get();return d.offers.length?d:null;}

 // ---------- Markup ----------
 // The segmented row: icon, name and one figure per section; the deals segment wears a dot while one is affordable.
 function tabsHtml(open,figs,dots,has){return SECTIONS.filter(t=>has[t.key]!==false).map(t=>'<button type="button" role="tab" class="gb-tab" data-section="'+t.key+'" aria-selected="'+(t.key===open)+'">'+
  '<span class="gb-tab-art">'+I3D(t.icon)+'</span><span class="gb-tab-copy"><b>'+t.label+'</b>'+(figs[t.key]?'<small>'+esc(figs[t.key])+'</small>':'')+'</span>'+(dots[t.key]?'<i class="gb-dot" aria-label="Something to do"></i>':'')+'</button>').join('');}
 function shiftHtml(goals,c,st){
  const pips=$('shiftProgress')&&$('shiftProgress').querySelector('.shift-pips'),bonus=shiftBonus();
  const head='<div class="gb-head"><b>'+esc(shiftTitle())+'</b>'+(pips?pips.outerHTML:'')+(bonus?'<span class="gb-bonus" title="Finish all three for this bonus">'+SVG(ICONS.gift)+esc(fmt(bonus))+'</span>':'')+'</div>';
  const rings='<div class="gb-rings">'+goals.map(g=>'<div class="gb-goal'+(g.done?' is-done':'')+'" title="'+esc(g.title+' · '+g.figure)+'">'+ring(g.icon,g.share,g.done)+
   '<b>'+esc(tieLast(g.title))+'</b><small>'+esc(g.done?'Done':g.figure)+'</small></div>').join('')+'</div>';
  // The contract and the story: one line card each, the icon, the thing to do and its one action.
  const task=o=>'<button type="button" class="gb-task'+(o.go?' has-go':'')+'" data-act="'+o.act+'" title="'+esc(o.title)+'">'+
   (o.share!=null?ring(o.icon,o.share,false,'gb-task-art'):'<span class="gb-task-art">'+I3D(o.icon)+'</span>')+
   '<span class="gb-task-copy"><b>'+esc(tieLast(String(o.main||'').replace(/-/g,'‑')))+'</b>'+(o.foot?'<small>'+esc(o.foot)+'</small>':'')+'</span>'+o.end+'</button>';
  const cards=[];
  // A contract waiting to start wears a Start badge on its top edge; a running one shows its time left, or the boost.
  if(c)cards.push(task({act:c.running?(c.canBoost?'contract-boost':'none'):'contract-start',icon:'contract',share:c.share,main:c.goal,title:c.title,
   go:!c.running,end:c.running?(c.canBoost?'<span class="gb-go">'+SVG(ICONS.bolt)+'2×</span>':'<span class="gb-chip">'+esc(c.clock.replace(/ left$/,''))+'</span>'):'<span class="gb-go is-badge">'+SVG(ICONS.play)+'Start</span>'}));
  if(st)cards.push(task({act:'story',icon:'book',main:st.task,title:st.title,end:'<span class="gb-chip">'+esc(st.count.replace(/ /g,''))+'</span>'}));
  return '<section class="gb-sec is-shift" aria-label="'+esc(shiftTitle())+'">'+head+rings+(cards.length?'<div class="gb-tasks'+(cards.length===1?' is-single':'')+'">'+cards.join('')+'</div>':'')+'</section>';}
 // A deal is a shop tile: picture, name, what it does, and a price button in one of four states. Leaf when you can
 // pay (tap buys), a lock with the price filling toward it when you can't yet, a tick once bought, a quiet note when
 // the shop can't use it. Boost deals cost store boosts; without one the button opens the store.
 function dealsHtml(d){const s=getState(),cash=s.money||0;
  return '<section class="gb-sec is-deals" aria-label="Deals"><div class="gb-offers">'+d.offers.map(o=>{
   const boost=/token/.test(o.label),price=boost?o.label.replace(/tokens?/,m=>m==='tokens'?'boosts':'boost'):o.label;
   const st=o.bought?'bought':o.blocked?'blocked':o.afford?'afford':'short';
   const need=boost?0:dollars(o.label),save=st==='short'&&need>0?clamp(cash/need):0;
   const btn=st==='bought'?'<span class="gb-price">'+SVG(ICONS.tick)+'Bought</span>':st==='blocked'?'<span class="gb-price">Shop is full</span>':
    st==='short'&&boost?'<span class="gb-price">Get boosts</span>':
    '<span class="gb-price"'+(st==='short'?' style="--save:'+save.toFixed(3)+'"':'')+'>'+(st==='short'?SVG(ICONS.lock):'')+'<b>'+esc(price)+'</b></span>';
   const say=o.name+', '+o.effect+(st==='bought'?', bought':st==='blocked'?', shop is full':', costs '+price+(st==='short'?', not enough yet':''));
   return '<button type="button" class="gb-offer is-'+st+'"'+(st==='afford'||(st==='short'&&boost)?' data-act="deal:'+o.id+'"':st==='short'?' data-act="deal:'+o.id+'"':' disabled')+' aria-label="'+esc(say)+'" title="'+esc(o.name+' · '+o.effect)+'">'+
    '<span class="gb-offer-art">'+I3D(o.icon)+'</span><b>'+esc(o.name)+'</b><small>'+esc(tieLast(o.effect))+'</small>'+btn+'</button>';}).join('')+'</div></section>';}
 function awardsHtml(items){
  return '<section class="gb-sec is-awards" aria-label="Awards"><div class="gb-awards" style="--n:'+items.length+'">'+items.map(a=>'<div class="gb-award" title="'+esc(a.title)+'">'+ring(a.icon,a.share,false)+
   '<span class="gb-award-top"><b>'+esc(a.label)+'</b><span class="gb-fig">'+esc(a.figure)+'</span></span>'+(a.next?'<small>'+esc(tieLast(a.next))+'</small>':'')+'</div>').join('')+'</div></section>';}

 // The reward button. Ready: brass, the 3D icons of what pays, the total and Collect. In progress: a dark bar that
 // fills toward the nearest shift goal, its reward and how far along it is. Locked: nothing under way. Done: a lime
 // tick and the amount just collected.
 let collected=null;
 function rewardHtml(stateName,rows,total,next,daily){
  if(stateName==='done')return {cls:'is-done',say:'Collected '+fmt(collected.amount),html:'<span class="gb-r-art"><i class="gb-r-tick">'+SVG(ICONS.tick)+'</i></span><span class="gb-r-copy"><b>+'+esc(fmt(collected.amount))+'</b><small>Collected</small></span><span class="gb-r-go">'+SVG(ICONS.tick)+'</span>'};
  if(stateName==='ready'){const icons=[...new Set(rows.map(r=>r.icon))].slice(0,3);
   return {cls:'is-ready',say:'Collect '+rows.length+' reward'+(rows.length===1?'':'s')+', '+fmt(total),
    html:'<span class="gb-r-art is-stack">'+icons.map(n=>'<i>'+I3D(n)+'</i>').join('')+'</span><span class="gb-r-copy"><b>'+esc(fmt(total))+'</b><small>'+(rows.length===1?esc(rows[0].why.split(' · ')[0]):rows.length+' rewards')+'</small></span><span class="gb-r-go">Collect</span>'};}
  if(stateName==='progress')return {cls:'is-progress',share:next.share,say:'Next reward '+fmt(next.reward)+', '+next.title+', '+pct(next.share)+' done',
   html:'<span class="gb-r-art">'+ring(next.icon,next.share,false)+'</span><span class="gb-r-copy"><b>'+esc(fmt(next.reward))+'</b><small>Next · '+esc(next.title)+'</small></span><span class="gb-r-go">'+SVG(ICONS.lock)+pct(next.share)+'</span>'};
  return {cls:'is-locked',say:'No reward under way'+(daily?', next daily in '+daily:''),
   html:'<span class="gb-r-art">'+SVG(ICONS.lock)+'</span><span class="gb-r-copy"><b>'+(daily?'Next in '+esc(daily):'No reward yet')+'</b><small>'+(daily?'Daily visit':'Goals start as the shop runs')+'</small></span><span class="gb-r-go">'+SVG(ICONS.clock)+'</span>'};}

 let signature='',picked='shift';
 function render(force){
  if(document.hidden||!getState)return;
  const s=getState(),buttons=ready(),rows=reasons(s,buttons),total=rows.reduce((n,r)=>n+r.amount,0);
  const badge=$('goalsTabBadge');if(badge)badge.hidden=!buttons.length;
  if(pane.hidden&&!force)return;
  if(collected&&Date.now()>collected.until)collected=null;
  const goals=shift(),c=contract(),st=story(),d=offers();
  const awardItems=[stars(s.empire),achievements(s),career(),order()].filter(Boolean);
  const open=SECTIONS.some(t=>t.key===picked)&&(picked!=='deals'||d)?picked:'shift';
  const doneShift=goals.filter(g=>g.done).length,wonAwards=achievementRows(s).filter(r=>r.done).length;
  const bonusNow=shiftBonus(),figs={shift:bonusNow?'+'+fmt(bonusNow):goals.length?doneShift+'/'+goals.length:'',deals:d?untilLabel(d.ends-Date.now()):'',awards:wonAwards+'/'+ACHIEVEMENTS.length};
  const dots={deals:!!(d&&d.offers.some(o=>!o.bought&&!o.blocked&&o.afford))};
  const section=open==='deals'?dealsHtml(d):open==='awards'?awardsHtml(awardItems):shiftHtml(goals,c,st);
  const todo=goals.filter(g=>!g.done),next=todo.length?todo.reduce((a,b)=>(b.share||0)>(a.share||0)?b:a):null;
  const daily=/in (\d+h \d+m|\d+m)/.exec(text('dailyTime'));
  const stateName=rewardState({collected:!!collected,ready:buttons.length,next});
  const r=rewardHtml(stateName,rows,total,next,daily&&daily[1]);
  const tall=pane.clientHeight>=480;
  const has={deals:!!d},tabRow=tabsHtml(open,figs,dots,has);
  const sig=open+tabRow+section+r.html+r.cls+(r.share||0)+tall;if(sig===signature)return;signature=sig;
  screen.classList.toggle('is-tall',tall);screen.classList.toggle('is-roomy',tall);screen.dataset.section=open;
  tabs.innerHTML=tabRow;body.innerHTML=section;
  reward.className='gb-reward '+r.cls;reward.dataset.state=stateName;reward.innerHTML=r.html;reward.setAttribute('aria-label',r.say);
  reward.style.setProperty('--fill',(r.share||0).toFixed(3));
  reward.setAttribute('aria-disabled',String(stateName!=='ready'));
  reward.title=stateName==='ready'?rows.map(x=>x.label+' ('+x.why+'): '+fmt(x.amount)).join('\n'):r.say;
 }
 reward.onclick=()=>{const buttons=ready();
  if(!buttons.length){picked='shift';render(true);return;}
  const s=getState(),rows=reasons(s,buttons),total=rows.reduce((n,x)=>n+x.amount,0);
  buttons.forEach(b=>b.click());collected={amount:total,until:Date.now()+DONE_MS};render(true);};
 const act=name=>{const click=id=>{const b=$(id);if(b&&!b.disabled)b.click();};
  if(name.startsWith('deal:')){if(deals&&deals.buy)deals.buy(name.slice(5));}else if(name==='contract-start')click('contractStart');else if(name==='contract-boost')click('contractBoost');else if(name==='story')click('storyAction');
  requestAnimationFrame(()=>render(true));};
 tabs.addEventListener('click',e=>{const t=e.target.closest('[data-section]');if(t){picked=t.dataset.section;render(true);}});
 body.addEventListener('click',e=>{const t=e.target.closest('[data-act]');if(t&&t.dataset.act!=='none')act(t.dataset.act);});
 setInterval(()=>render(false),400);
 if(window.MutationObserver)new MutationObserver(()=>{if(!pane.hidden){render(true);requestAnimationFrame(()=>render(true));}}).observe(pane,{attributes:true,attributeFilter:['hidden']});
 render(true);
 return {render,show:key=>{picked=key;render(true);}};
}
