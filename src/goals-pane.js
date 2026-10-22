import {abbr,STORES,starStatus,starCount,SHIFT_LENGTH} from './progression.js';
import {milestone} from './depth.js';
import {ACHIEVEMENTS,achievementRows} from './achievements.js';
// Goals tab: one brass Collect for every reward that is ready, then goals as tiles: an icon inside a ring that fills with
// progress, and a short name (the exact figures are in each tile's tooltip). main.js keeps rendering the original controls by id (shift goals, contract, career,
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
// Pick an icon from a goal's own words, so a new goal type still gets a sensible picture.
const iconFor=t=>{t=(t||'').toLowerCase();
 return /deliver|online|drone|web/.test(t)?'box':/kiosk/.test(t)?'screen':/strain|grow|seed|plant/.test(t)?'leaf':/upgrade|level|lv\b|station/.test(t)?'up':
  /earn|revenue|cash|\$/.test(t)?'coin':/sell|bag|pack/.test(t)?'bag':/serve|customer|walk-in|spender|guest|welcome/.test(t)?'person':/star/.test(t)?'star':'target';};
const SOURCES=['dailyClaim','careerClaim','claim','seasonClaim','goalClaim0','goalClaim1','goalClaim2'];
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const title=t=>String(t||'').toLowerCase().replace(/\b\w/g,c=>c.toUpperCase());
const span=sec=>sec<90?Math.max(1,Math.round(sec))+' s':sec<5400?Math.round(sec/60)+' min':(Math.round(sec/360)/10)+' h';
// "$1.50K" -> 1500, so the Collect card can show one total.
const dollars=text=>{const m=/\$([\d.,]+)([KMBT]?)/.exec(text||'');if(!m)return 0;return parseFloat(m[1].replace(/,/g,''))*({'':1,K:1e3,M:1e6,B:1e9,T:1e12}[m[2]]);};
const short=n=>abbr(Math.floor(n)).replace(/\.0+([KMBT])$/,'$1').replace(/(\.\d)0([KMBT])$/,'$1$2');
const clamp=v=>Math.max(0,Math.min(1,Number(v)||0));

export function mountGoalsPane({pane,sources,getState,format,rate}){
 const $=id=>document.getElementById(id);
 const screen=document.createElement('div');screen.className='empire-screen empire-content goals-screen';
 // The brass reward box: the total and Collect on top, then one line per reward saying what it is for.
 const reward=document.createElement('div');reward.className='goals-reward';
 const collect=document.createElement('button');collect.type='button';collect.className='goals-collect';
 collect.innerHTML='<span class="goals-collect-icon">'+SVG(ICONS.gift)+'</span><b></b><span class="goals-collect-go">Collect</span>';
 const why=document.createElement('ul');why.className='goals-why';
 const note=document.createElement('p');note.className='goals-why-note';
 reward.append(collect,why,note);
 const quiet=document.createElement('p');quiet.className='goals-quiet';
 const list=document.createElement('div');list.className='goals-list';
 const hidden=document.createElement('div');hidden.className='goals-sources';hidden.hidden=true;hidden.append(...sources.filter(Boolean));
 screen.append(reward,quiet,list,hidden);pane.append(screen);

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
 // A ring is a circle whose stroke covers the share done; finished tiles show a tick instead of the icon.
 const ring=(icon,share,done)=>'<span class="goal-ring'+(done?' is-done':'')+'" style="--share:'+(done?1:clamp(share)).toFixed(3)+'">'+
  '<svg class="goal-ring-track" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="19"/><circle class="goal-ring-fill" cx="22" cy="22" r="19" pathLength="100"/></svg>'+
  SVG(ICONS[done?'tick':icon]||ICONS.target)+'</span>';
 const tile=o=>{const tag=o.act?'button':'div';
  return '<'+tag+' class="goal-tile'+(o.done?' is-done':'')+'"'+(o.act?' type="button" data-act="'+o.act+'"':'')+' title="'+esc(o.title+(o.figure?' · '+o.figure:''))+'">'+
   ring(o.icon||iconFor(o.title),o.share,o.done)+'<b>'+esc(o.label||o.title)+'</b>'+(o.note?'<small>'+esc(o.note)+'</small>':'')+'</'+tag+'>';};
 const group=(title,figure,body)=>body?'<section class="goal-group"><h3 class="goal-head"><span>'+esc(title)+'</span>'+(figure?'<b>'+figure+'</b>':'')+'</h3>'+body+'</section>':'';
 const tiles=items=>items.length?'<div class="goal-tiles">'+items.map(tile).join('')+'</div>':'';

 // Contract: one card with its icon, name and the one rule that changes; Start or the time left on the right.
 function contract(){
  const name=text('contractName');if(!name||name==='No contract yet')return '';
  const running=text('contractKicker')==='Contract running',boost=$('contractBoost'),boostRow=$('contractBoostRow');
  const canBoost=boostRow&&!boostRow.hidden&&boost&&!boost.hidden;
  const action=running?'<span class="goal-card-figure">'+esc(text('contractTime'))+'</span>':'<span class="goal-card-go" data-act="contract-start" role="button" tabindex="0">Start</span>';
  const boostChip=canBoost?'<span class="goal-card-go is-brass" data-act="contract-boost" role="button" tabindex="0">'+SVG(ICONS.bolt)+'2×</span>':'';
  return '<div class="goal-card"><span class="goal-card-icon">'+SVG(ICONS.contract)+'</span><span class="goal-card-copy"><b>'+esc(name)+'</b><small>'+esc(text('contractGoal'))+'</small></span>'+boostChip+action+'</div>';
 }
 function shift(){return [0,1,2].map(i=>{const b=$('goalClaim'+i),title=text('goalTitle'+i);if(!title)return null;
  return {title,figure:text('goalCount'+i).split(' · ')[0],share:bar('goalProgress'+i),done:!!(b&&b.classList.contains('ready'))};}).filter(Boolean);}
 // #shiftProgress is "<span>Shift 4</span><pips/><span>2 more goals for a $476K bonus</span>".
 function shiftHead(){const spans=$('shiftProgress')?$('shiftProgress').querySelectorAll(':scope>span:not(.shift-pips)'):[];
  const bonus=spans.length>1?/(\$[\d.,]+[KMBT]?) bonus/.exec(spans[spans.length-1].textContent):null;
  return [spans.length?spans[0].textContent.trim():'This shift',bonus?SVG(ICONS.gift)+esc(bonus[1]):''];}
 function story(){const title=text('storyTitle');if(!title)return '';
  return '<button type="button" class="goal-card is-link" data-act="story"><span class="goal-card-icon">'+SVG(ICONS.book)+'</span><span class="goal-card-copy"><b>'+esc(title)+'</b><small>'+esc(text('storyTask'))+'</small></span><span class="goal-card-figure">'+esc(text('storyCount'))+'</span><span class="goal-card-chevron">'+SVG(ICONS.chevron)+'</span></button>';}
 function stars(p){let i=-1;STORES.forEach((_,k)=>{if(p.stores[k].level>0&&starCount(p,k)<3)i=k;});if(i<0)return '';
  const goals=starStatus(p,i),earned=goals.filter(g=>g.earned).length;
  const figure='<span class="goal-stars" aria-label="'+earned+' of 3 stars">'+[0,1,2].map(k=>'<i class="'+(k<earned?'is-on':'')+'">'+SVG(ICONS.star)+'</i>').join('')+'</span>';
  return group(STORES[i].name,figure,tiles(goals.map(g=>({title:g.title,icon:'star',done:g.earned,share:g.progress/g.target,
   figure:g.kind==='level'?'Lv '+g.progress+' / '+g.target:abbr(g.progress)+' / '+abbr(g.target)}))));}
 function awards(s){const all=achievementRows(s),todo=all.filter(r=>!r.done).slice(0,3),done=all.length-all.filter(r=>!r.done).length;
  const fig=(n,r)=>(r.id.startsWith('rev-')?'$':'')+short(n);
  return group('Achievements',SVG(ICONS.trophy)+done+' / '+ACHIEVEMENTS.length,tiles(todo.map(r=>({title:r.goal,icon:iconFor(r.goal),share:r.share,figure:fig(r.value,r)+' / '+fig(r.target,r)}))));}
 function ladders(){const items=[];
  if(text('careerName')&&text('careerDetail'))items.push({title:text('careerName'),icon:'trophy',share:bar('careerProgress'),figure:'+5% sales'});
  if(text('orderName')&&text('orderName')!=='ALL ORDERS FILLED'){const fill=$('orderFill');items.push({title:'Milestone bonus',label:'Bonus '+text('claimReward'),icon:'gift',share:fill?parseFloat(fill.style.width)/100:0,figure:text('claimReward')});}
  if(text('seasonName'))items.push({title:text('seasonName'),icon:'calendar',share:0,note:text('seasonTime').replace(/^Ends in /,'').replace(/^Starts in /,'in ')});
  return group('Milestones','',tiles(items));}

 let signature='';
 function render(force){
  if(document.hidden||!getState)return;
  const s=getState(),buttons=ready(),rows=reasons(s,buttons),total=rows.reduce((n,r)=>n+r.amount,0);
  const badge=$('goalsTabBadge');if(badge)badge.hidden=!buttons.length;
  if(pane.hidden&&!force)return;
  const [shiftTitle,shiftFigure]=shiftHead();
  const html=contract()+group(shiftTitle,shiftFigure,tiles(shift()))+story()+stars(s.empire)+awards(s)+ladders();
  const daily=/in (\d+h \d+m)/.exec(text('dailyTime'));
  const perSec=rate?rate():0,worth=perSec>0&&total>0?'About '+span(total/perSec)+' of your sales · rewards grow as you earn':'';
  const sig=html+'#'+buttons.length+total+worth+rows.map(r=>r.label).join();if(sig===signature)return;signature=sig;
  reward.hidden=!buttons.length;
  why.innerHTML=rows.map(r=>'<li><span class="goals-why-icon">'+SVG(ICONS[r.icon]||ICONS.target)+'</span><span class="goals-why-copy"><b>'+esc(r.label)+'</b><small>'+esc(r.why)+'</small></span><em>'+esc(format?format(r.amount):'$'+short(r.amount))+'</em></li>').join('');
  note.hidden=!worth;note.textContent=worth;
  collect.querySelector('b').textContent=(format?format(total):'$'+short(total));
  collect.setAttribute('aria-label','Collect '+buttons.length+' reward'+(buttons.length===1?'':'s')+', '+(format?format(total):total));
  quiet.hidden=!!buttons.length;quiet.innerHTML=SVG(ICONS.gift)+'<span>'+(daily?'Next reward in '+daily[1]:'Nothing to collect')+'</span>';
  list.innerHTML=html;
 }
 const act=name=>{const click=id=>{const b=$(id);if(b&&!b.disabled)b.click();};
  if(name==='contract-start')click('contractStart');else if(name==='contract-boost')click('contractBoost');else if(name==='story')click('storyAction');
  requestAnimationFrame(()=>render(true));};
 list.addEventListener('click',e=>{const t=e.target.closest('[data-act]');if(t)act(t.dataset.act);});
 list.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[role=button][data-act]')){e.preventDefault();act(e.target.dataset.act);}});
 setInterval(()=>render(false),400);
 if(window.MutationObserver)new MutationObserver(()=>{if(!pane.hidden){render(true);requestAnimationFrame(()=>render(true));}}).observe(pane,{attributes:true,attributeFilter:['hidden']});
 render(true);
 return {render};
}
