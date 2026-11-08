import {abbr,unabbr,STORES,starStatus,starCount,SHIFT_LENGTH,ringRank} from './progression.js';
import {milestone} from './depth.js';
import {tieLast} from './no-lone-words.js';
import {untilLabel} from './deals.js';
import {ACHIEVEMENTS,achievementRows} from './achievements.js';
// Goals tab, built to fit the half-open sheet on an iPhone SE without scrolling: one brass Collect in the sheet's header
// row (the icons of what pays out, then the total), the contract and the story side by side, then one group of goal
// tiles at a time behind a row of tabs (Shift, Stars, Awards, Milestones); a desktop side panel stacks every group. A tile is an icon inside a
// ring that fills with progress, and a short name (the exact figures are in each tile's tooltip). main.js keeps rendering the original controls by id (shift goals, contract, career,
// milestone, daily, season, story); they live hidden here, and the tiles read their text and click their buttons, so
// every reward, price and handler stays in one place.
const SVG=d=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg>';
const ICONS={
 tick:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
 person:'<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.8 3.6-6 7-6s6.2 2.2 7 6"/>',
 up:'<path d="M12 19V5M6 11l6-6 6 6"/>',
 coin:'<circle cx="12" cy="12" r="8"/><path d="M14.5 9.2c-.6-.8-1.5-1.2-2.5-1.2-1.4 0-2.5.8-2.5 2s1.1 1.6 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1 0-2-.4-2.6-1.2M12 6.5V8m0 8v1.5"/>',
 box:'<path d="m4 8 8-4 8 4v8l-8 4-8-4Zm0 0 8 4 8-4M12 12v8"/>',
 bag:'<path d="M6 8h12l-1 12H7Z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
 leaf:'<path d="M12 21c-4.5-2.5-7-6-7-10a7 7 0 0 1 14 0c0 4-2.5 7.5-7 10ZM12 21V9"/>',
 screen:'<rect x="5" y="3" width="14" height="13" rx="2"/><path d="M9 21h6M12 16v5"/>',
 star:'<path d="m12 4 2.4 5 5.4.6-4 3.7 1.1 5.4L12 16l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6Z"/>',
 trophy:'<path d="M8 4h8v5a4 4 0 0 1-8 0ZM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M10 17h4v3h-4z"/>',
 gift:'<rect x="4" y="9" width="16" height="11" rx="1"/><path d="M4 13h16M12 9v11M12 9c-1.5-3-5-3.5-5-1.5S10 9 12 9Zm0 0c1.5-3 5-3.5 5-1.5S14 9 12 9Z"/>',
 calendar:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/>',
 contract:'<path d="M7 3h7l4 4v14H7Z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',
 book:'<path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1Z"/><path d="M12 6v14"/>',
 target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/>',
 bolt:'<path d="M13 3 5 14h6l-1 7 8-11h-6Z"/>',
 chevron:'<path d="m9 5 7 7-7 7"/>'
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
const span=sec=>sec<90?Math.max(1,Math.round(sec))+' s':sec<5400?Math.round(sec/60)+' min':(Math.round(sec/360)/10)+' h';
// "$1.50K" -> 1500, so the Collect card can show one total.
export const dollars=text=>{const m=/\$[\d.,]+(?:Dc|No|Oc|Sp|Sx|Qi|Qa|[KMBT])?/.exec(text||'');return m?unabbr(m[0].slice(1)):0;};
const short=n=>abbr(Math.floor(n)).replace(/\.0+([A-Za-z]+)$/,'$1').replace(/(\.\d)0([A-Za-z]+)$/,'$1$2');
const clamp=v=>Math.max(0,Math.min(1,Number(v)||0));

export function mountGoalsPane({pane,sources,getState,format,rate,deals}){
 const $=id=>document.getElementById(id);
 const screen=document.createElement('div');screen.className='empire-screen empire-content goals-screen';
 // Collect lives in the sheet's header row, beside the "Goals" title, so the pane below is all goals: the icons of what
 // pays out (daily visit, career, shift goal...), the total, and the brass Collect. With nothing ready, a quiet line
 // says when the next daily reward lands.
 const reward=document.createElement('div');reward.className='goals-reward';
 const collect=document.createElement('button');collect.type='button';collect.className='goals-collect';
 collect.innerHTML='<span class="goals-collect-icons"></span><b></b><span class="goals-collect-go">Collect</span>';
 reward.append(collect);
 const quiet=document.createElement('p');quiet.className='goals-quiet';
 const head=document.createElement('div');head.className='goals-head';head.append(reward,quiet);
 const panelTitle=document.getElementById('panelTitle');
 const list=document.createElement('div');list.className='goals-list';
 const hidden=document.createElement('div');hidden.className='goals-sources';hidden.hidden=true;hidden.append(...sources.filter(Boolean));
 if(panelTitle)panelTitle.after(head);else screen.append(head);
 screen.append(list,hidden);pane.append(screen);

 const ready=()=>SOURCES.map($).filter(b=>b&&!b.disabled&&!b.hidden&&/^Collect\b/.test(b.textContent.trim()));
 collect.onclick=()=>{ready().forEach(b=>b.click());render(true);};

 const text=id=>{const n=$(id);return n?n.textContent.trim():'';};
 // Each ready reward as {icon,label,why,amount}; the shift bonus pays with the goal that closes the shift.
 function reasons(s,buttons){const rows=[],p=s.empire,fmt=n=>format?format(n):'$'+short(n);let shiftGoals=0;
  buttons.forEach(b=>{const id=b.id,amount=dollars(b.textContent);
   if(id.startsWith('goalClaim')){shiftGoals++;rows.push({icon:iconFor(text('goalTitle'+id.slice(-1))),label:text('goalTitle'+id.slice(-1)),why:'Shift goal done',amount});}
   else if(id==='dailyClaim')rows.push({icon:'calendar',label:text('dailyTitle').replace(/ is ready$/,'')+' of 7',why:'Daily visit · grows each day',amount});
   else if(id==='careerClaim')rows.push({icon:'trophy',label:text('careerName'),why:'Career milestone · +5% sales',amount});
   else if(id==='claim'){const m=milestone(s.contract);rows.push({icon:'coin',label:m?title(m.name):'Milestone',why:m?'Earned '+fmt(m.goal)+' total':'Milestone',amount:m?m.reward:amount});}
   else if(id==='seasonClaim')rows.push({icon:'calendar',label:text('seasonName'),why:'Event step '+Math.min(3,((p.season&&p.season.claimed)||0)+1)+' of 3',amount});});
  if(shiftGoals&&p&&SHIFT_LENGTH-p.goalsCompleted%SHIFT_LENGTH<=shiftGoals){const bonus=dollars(shiftHead()[1]);
   if(bonus)rows.push({icon:'star',label:shiftHead()[0]+' bonus',why:'All '+SHIFT_LENGTH+' goals done',amount:bonus});}
  return rows;}
 const bar=id=>{const n=$(id);return n&&n.value!=null&&n.max?n.value/n.max:null;};
 // A ring is a circle whose stroke covers the share done, around the goal's 3D icon; finished tiles add a lime tick badge.
 const ring=(icon,share,done)=>'<span class="goal-ring'+(done?' is-done':'')+'" style="--share:'+(done?1:clamp(share)).toFixed(3)+'">'+
  '<svg class="goal-ring-track" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="19"/><circle class="goal-ring-fill" cx="22" cy="22" r="19" pathLength="100"/></svg>'+
  I3D(ICONS_3D.has(icon)||/-/.test(icon)?icon:'target')+(done?'<i class="goal-ring-tick">'+SVG(ICONS.tick)+'</i>':'')+'</span>';
 const tile=o=>{const tag=o.act?'button':'div';
  return '<'+tag+' class="goal-tile'+(o.done?' is-done':'')+'"'+(o.act?' type="button" data-act="'+o.act+'"':'')+' title="'+esc(o.title+(o.figure?' · '+o.figure:''))+'">'+
   ring(o.icon||iconFor(o.title),o.share,o.done)+'<b>'+esc(tieLast(o.label||o.title))+'</b>'+(o.price?'<small class="deal-price'+(o.afford?' is-ready':'')+'">'+esc(o.price)+'</small>':o.note?'<small>'+esc(o.note)+'</small>':o.figure&&!o.done?'<small class="goal-tile-figure">'+esc(o.figure)+'</small>':'')+'</'+tag+'>';};
 const tiles=items=>items.length?'<div class="goal-tiles">'+items.map(tile).join('')+'</div>':'';

 // Contract and story are half cards: the icon and the thing to do (two balanced lines), then a foot line with a small
 // label on the left and the action on the right. A running contract's icon sits in a ring that fills with its progress.
 const amount=unabbr;
 const half=(o)=>'<'+(o.act?'button type="button" data-act="'+o.act+'"':'div')+' class="goal-card goal-half'+(o.act?' is-link':'')+'" title="'+esc(o.title)+'">'+
  (o.share==null?'<span class="goal-card-icon">'+I3D(o.icon)+'</span>':ring(o.icon,o.share,false).replace('goal-ring','goal-ring goal-card-icon'))+
  '<b class="goal-card-main">'+esc(tieLast(o.main))+'</b><span class="goal-card-foot">'+(o.foot?'<small>'+esc(tieLast(o.foot))+'</small>':'<i></i>')+o.action+'</span></'+(o.act?'button':'div')+'>';
 function contract(){
  const name=text('contractName');if(!name||name==='No contract yet')return '';
  const running=text('contractKicker')==='Contract running',boost=$('contractBoost'),boostRow=$('contractBoostRow');
  const canBoost=boostRow&&!boostRow.hidden&&boost&&!boost.hidden;
  // #contractTime is "512 / 1.03K · 12:30 left" while running.
  const goal=text('contractGoal'),[count,clock]=text('contractTime').split(' · '),[done,target]=(count||'').split(' / ').map(amount);
  const action=running?(canBoost?'<span class="goal-card-go is-brass" data-act="contract-boost" role="button" tabindex="0" aria-label="Boost the contract">'+SVG(ICONS.bolt)+'2×</span>':'')
   :'<span class="goal-card-go" data-act="contract-start" role="button" tabindex="0">Start</span>';
  // Before it starts, the top line is just Start: the goal below says what the contract asks; its name is in the tooltip.
  return half({icon:'contract',main:goal,foot:running?(clock||''):'',action,share:running&&target?done/target:null,
   title:name+' · '+goal+(running?' · '+text('contractTime'):'')});
 }
 function shift(){return [0,1,2].map(i=>{const b=$('goalClaim'+i),title=text('goalTitle'+i);if(!title)return null;
  return {title,figure:text('goalCount'+i).split(' · ')[0],share:bar('goalProgress'+i),done:!!(b&&b.classList.contains('ready'))};}).filter(Boolean);}
 // #shiftProgress is "<span>Shift 4</span><pips/><span>2 more goals for a $476K bonus</span>".
 function shiftHead(){const spans=$('shiftProgress')?$('shiftProgress').querySelectorAll(':scope>span:not(.shift-pips)'):[];
  const bonus=spans.length>1?/(\$[\d.,]+(?:Dc|No|Oc|Sp|Sx|Qi|Qa|[KMBT])?) bonus/.exec(spans[spans.length-1].textContent):null;
  return [spans.length?spans[0].textContent.trim():'This shift',bonus?SVG(ICONS.gift)+esc(bonus[1]):''];}
 // The task leads (what to do next; #storyTask can carry a cost after a dot); the foot counts its progress.
 function story(){const title=text('storyTitle');if(!title)return '';
  return half({icon:'book',act:'story',main:text('storyTask').split(' · ')[0],foot:'Story '+text('storyCount'),
   action:'<span class="goal-card-chevron">'+SVG(ICONS.chevron)+'</span>',title:title+' · '+text('storyTask')});}
 function stars(p){let i=-1;STORES.forEach((_,k)=>{if(p.stores[k].level>0&&starCount(p,k)<3)i=k;});if(i<0)return null;
  const goals=starStatus(p,i),earned=goals.filter(g=>g.earned).length;
  const ring=ringRank(p)?goals[0].tier:'';
  const figure='<span class="goal-stars"'+(ring?' data-ring="'+ring+'"':'')+' aria-label="'+earned+' of 3 '+(ring?ring+' ':'')+'stars">'+[0,1,2].map(k=>'<i class="'+(k<earned?'is-on':'')+'">'+SVG(ICONS.star)+'</i>').join('')+'</span>';
  return {key:'stars',label:'Stars',title:STORES[i].name+(ring?' '+ring:'')+' stars',figure,body:tiles(goals.map(g=>({title:g.title,icon:'star',done:g.earned,share:g.progress/g.target,
   figure:g.kind!=='served'?'Lv '+g.progress+' / '+g.target:abbr(g.progress)+' / '+abbr(g.target)})))};}
 function awards(s){const all=achievementRows(s),todo=all.filter(r=>!r.done).slice(0,3),done=all.length-all.filter(r=>!r.done).length;
  const fig=(n,r)=>(r.id.startsWith('rev-')?'$':'')+short(n);
  return {key:'awards',label:'Awards',title:'Achievements',figure:done+'/'+ACHIEVEMENTS.length,body:tiles(todo.map(r=>({title:r.goal,icon:iconFor(r.goal),share:r.share,figure:fig(r.value,r)+' / '+fig(r.target,r)})))};}
 function ladders(){const items=[];
  if(text('careerName')&&text('careerDetail'))items.push({title:text('careerName'),icon:'trophy',share:bar('careerProgress'),figure:'+5% sales'});
  if(text('orderName')&&text('orderName')!=='ALL ORDERS FILLED'){const fill=$('orderFill');items.push({title:'Milestone bonus',label:'Bonus '+text('claimReward'),icon:'gift',share:fill?parseFloat(fill.style.width)/100:0,figure:text('claimReward')});}
  if(text('seasonName'))items.push({title:text('seasonName'),icon:'calendar',share:0,note:text('seasonTime').replace(/^Ends in /,'').replace(/^Starts in /,'in ')});
  return items.length?{key:'ladders',label:'Milestones',title:'Milestones',figure:'',body:tiles(items)}:null;}

 // Deals (deals.js via main.js): the offers of this four-hour window as tiles, each saying what it does and its price;
 // a tap buys. The tab counts down to the next set.
 function offers(){if(!deals||!deals.get)return null;const d=deals.get();if(!d.offers.length)return null;
  const until=untilLabel(d.ends-Date.now());
  return {key:'deals',label:'Deals',title:'Deals',figure:esc(until),body:tiles(d.offers.map(o=>({title:o.name+' · '+o.effect,label:o.effect,icon:o.icon,share:0,done:o.bought,
   act:o.bought?null:'deal:'+o.id,price:o.bought?'':o.label,afford:o.afford,note:o.bought?'Bought':''})))};}
 let signature='',picked='shift';
 function render(force){
  if(document.hidden||!getState)return;
  const s=getState(),buttons=ready(),rows=reasons(s,buttons),total=rows.reduce((n,r)=>n+r.amount,0);
  const badge=$('goalsTabBadge');if(badge)badge.hidden=!buttons.length;
  if(pane.hidden&&!force)return;
  const [shiftTitle,shiftFigure]=shiftHead();
  // Contract and story share a row; then one goal group at a time, picked from a row of tabs that each show the
  // group's headline figure.
  const deal=contract(),tale=story(),now=deal+tale;
  const groups=[{key:'shift',label:shiftTitle,title:shiftTitle,figure:shiftFigure,body:tiles(shift())},stars(s.empire),awards(s),ladders(),offers()].filter(g=>g&&g.body);
  // The tab you picked stays picked; while its group is empty (shift goals load a moment after start) the first one shows.
  const open=groups.find(g=>g.key===picked)||groups[0];
  // A desktop side panel, or a phone sheet pulled up to full screen with room for it, is tall enough for every group
  // at once, each under its own heading.
  const sheet=pane.closest('.sheet');
  const wide=window.matchMedia&&matchMedia('(min-width:780px)').matches||!!(sheet&&sheet.classList.contains('tall')&&pane.clientHeight>=640);
  const html=wide?(now?'<div class="goals-now'+(deal&&tale?'':' is-single')+'">'+now+'</div>':'')+groups.map(g=>'<section class="goal-group is-stacked"><h3 class="goal-head"><span>'+esc(g.title)+'</span>'+(g.figure?'<b>'+g.figure+'</b>':'')+'</h3>'+g.body+'</section>').join(''):(now?'<div class="goals-now'+(deal&&tale?'':' is-single')+'">'+now+'</div>':'')+
   (groups.length?'<div class="goal-switch" role="tablist" aria-label="Goal groups">'+groups.map(g=>'<button type="button" role="tab" data-group="'+g.key+'" aria-selected="'+(g===open)+'" title="'+esc(g.title)+'"'+'><span>'+esc(g.label)+'</span>'+(g.figure?'<b>'+g.figure+'</b>':'')+'</button>').join('')+'</div>'+
    '<section class="goal-group" role="tabpanel" aria-label="'+esc(open.title)+'">'+open.body+'</section>':'');
  const daily=/in (\d+h \d+m)/.exec(text('dailyTime'));
  const perSec=rate?rate():0,worth=perSec>0&&total>0?'About '+span(total/perSec)+' of your sales · rewards grow as you earn':'';
  const sig=html+'#'+buttons.length+total+worth+rows.map(r=>r.label).join();if(sig===signature)return;signature=sig;
  reward.hidden=!buttons.length;
  // Under the total, one line names what pays out; the full reasons and amounts sit in the strip's tooltip.
  const icons=[...new Set(rows.map(r=>r.icon))].slice(0,3);
  collect.querySelector('.goals-collect-icons').innerHTML=icons.map(n=>'<i>'+I3D(n)+'</i>').join('');
  collect.title=rows.map(r=>r.label+' ('+r.why+'): '+(format?format(r.amount):'$'+short(r.amount))).join('\n')+(worth?'\n'+worth:'');
  collect.querySelector('b').textContent=(format?format(total):'$'+short(total));
  collect.setAttribute('aria-label','Collect '+buttons.length+' reward'+(buttons.length===1?'':'s')+', '+(format?format(total):total));
  quiet.hidden=!!buttons.length;quiet.innerHTML=I3D('gift')+'<span>'+(daily?'Next in '+daily[1]:'Nothing to collect')+'</span>';
  list.innerHTML=html;
 }
 const act=name=>{const click=id=>{const b=$(id);if(b&&!b.disabled)b.click();};
  if(name.startsWith('group:'))picked=name.slice(6);else if(name.startsWith('deal:')){if(deals&&deals.buy)deals.buy(name.slice(5));}else if(name==='contract-start')click('contractStart');else if(name==='contract-boost')click('contractBoost');else if(name==='story')click('storyAction');
  requestAnimationFrame(()=>render(true));};
 list.addEventListener('click',e=>{const g=e.target.closest('[data-group]');if(g){act('group:'+g.dataset.group);return;}const t=e.target.closest('[data-act]');if(t)act(t.dataset.act);});
 list.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[role=button][data-act]')){e.preventDefault();act(e.target.dataset.act);}});
 setInterval(()=>render(false),400);
 if(window.MutationObserver)new MutationObserver(()=>{if(!pane.hidden){render(true);requestAnimationFrame(()=>render(true));}}).observe(pane,{attributes:true,attributeFilter:['hidden']});
 render(true);
 return {render};
}
