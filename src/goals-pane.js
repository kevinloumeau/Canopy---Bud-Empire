import {abbr,STORES,starStatus,starCount,STAR_BONUS} from './progression.js';
import {ACHIEVEMENTS,achievementRows} from './achievements.js';
// Goals tab: one brass Collect for every reward that is ready, then one-row goals with open figures, grouped under
// short headings. main.js keeps rendering the original controls by id (shift goals, contract, career, milestone,
// daily, season, story); they live hidden here, and the rows read their text and click their buttons, so every
// reward, price and handler stays in one place.
const TICK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const CHEVRON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>';
const SOURCES=['dailyClaim','careerClaim','claim','seasonClaim','goalClaim0','goalClaim1','goalClaim2'];
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// "$1.50K" -> 1500, so the Collect card can show one total.
const dollars=text=>{const m=/\$([\d.,]+)([KMBT]?)/.exec(text||'');if(!m)return 0;return parseFloat(m[1].replace(/,/g,''))*({'':1,K:1e3,M:1e6,B:1e9,T:1e12}[m[2]]);};
const short=n=>abbr(Math.floor(n)).replace(/\.0+([KMBT])$/,'$1').replace(/(\.\d)0([KMBT])$/,'$1$2');

export function mountGoalsPane({pane,sources,getState,format}){
 const $=id=>document.getElementById(id);
 const screen=document.createElement('div');screen.className='empire-screen empire-content goals-screen';
 const collect=document.createElement('button');collect.type='button';collect.className='goals-collect';
 collect.innerHTML='<span class="goals-collect-copy"><small>Ready to collect</small><b></b></span><span class="goals-collect-go">Collect</span>';
 const quiet=document.createElement('p');quiet.className='goals-quiet';
 const list=document.createElement('div');list.className='goals-list';
 const hidden=document.createElement('div');hidden.className='goals-sources';hidden.hidden=true;hidden.append(...sources.filter(Boolean));
 screen.append(collect,quiet,list,hidden);pane.append(screen);

 const ready=()=>SOURCES.map($).filter(b=>b&&!b.disabled&&!b.hidden&&/^Collect\b/.test(b.textContent.trim()));
 collect.onclick=()=>{ready().forEach(b=>b.click());render(true);};

 const text=id=>{const n=$(id);return n?n.textContent.trim():'';};
 const row=(o)=>{const tag=o.act?'button':'div';
  return '<'+tag+' class="goal-row'+(o.done?' is-done':'')+(o.act?' is-link':'')+'"'+(o.act?' type="button" data-act="'+o.act+'"':'')+'>'+
   '<span class="goal-copy"><b>'+esc(o.title)+'</b>'+(o.sub?'<small>'+esc(o.sub)+'</small>':'')+'</span>'+
   (o.button?'<span class="goal-action'+(o.brass?' is-brass':'')+'" data-act="'+o.button.act+'" role="button" tabindex="0">'+esc(o.button.label)+'</span>':
    '<span class="goal-figure">'+(o.done?TICK:esc(o.figure||''))+'</span>')+
   (o.act&&!o.button?'<span class="goal-chevron">'+CHEVRON+'</span>':'')+
   '</'+tag+'>';};
 const section=(title,figure,rows)=>rows.length?'<section class="goal-group"><h3 class="goal-head"><span>'+esc(title)+'</span>'+(figure?'<b>'+esc(figure)+'</b>':'')+'</h3>'+rows.join('')+'</section>':'';

 function contractRows(){
  const running=text('contractKicker')==='Contract running',rows=[];
  if(!text('contractName')||text('contractName')==='No contract yet')return rows;
  const twist=text('contractTwist').replace(/^Twist\s*·\s*/,'');
  rows.push(row({title:text('contractName')+' · '+text('contractGoal'),sub:'Twist: '+twist,
   figure:running?text('contractTime'):'',button:running?null:{act:'contract-start',label:'Start'}}));
  const boost=$('contractBoost');
  if($('contractBoostRow')&&!$('contractBoostRow').hidden)rows.push(row({title:'2× sales boost',sub:text('contractBank'),
   figure:boost&&boost.hidden?'Running':'',button:boost&&!boost.hidden?{act:'contract-boost',label:boost.textContent.trim()==='Add 10 min'?'+10 min':'Use'}:null,brass:true}));
  return rows;
 }
 function shiftRows(){return [0,1,2].map(i=>{const b=$('goalClaim'+i),done=b&&b.classList.contains('ready'),p=$('goalProgress'+i);
  const [figure,hint]=text('goalCount'+i).split(' · ');
  return row({title:text('goalTitle'+i),sub:done?'Reward ready above':hint,figure,done,share:p?p.value/100:null});});}
 // #shiftProgress is "<span>Shift 4</span><pips/><span>2 more goals for a $476K bonus</span>".
 function shiftHead(){const spans=$('shiftProgress')?$('shiftProgress').querySelectorAll(':scope>span:not(.shift-pips)'):[];
  const bonus=spans.length>1?/(\$[\d.,]+[KMBT]?) bonus/.exec(spans[spans.length-1].textContent):null;
  return [spans.length?spans[0].textContent.trim():'Shift goals',bonus?bonus[1]+' bonus at 3 / 3':''];}
 function storyRows(){const title=text('storyTitle');if(!title)return [];
  return [row({title,sub:text('storyTask'),figure:text('storyCount'),act:'story',share:$('storyProgress')&&!$('storyProgress').hidden?$('storyProgress').value/100:null})];}
 function starRows(p){let i=-1;STORES.forEach((_,k)=>{if(p.stores[k].level>0&&starCount(p,k)<3)i=k;});if(i<0)return null;
  const goals=starStatus(p,i),next=STORES[i+1];
  return {title:STORES[i].name+' stars',figure:goals.filter(g=>g.earned).length+' / 3',
   rows:goals.map(g=>row({title:g.title,done:g.earned,figure:g.kind==='level'?'Lv '+g.progress+' / '+g.target:abbr(g.progress)+' / '+abbr(g.target),share:g.progress/g.target}))
    .concat('<p class="goal-note">All three: +'+Math.round(STAR_BONUS*100)+'% sales everywhere'+(next?', and '+esc(next.name)+' opens':'')+'</p>')};}
 function awardRows(s){const all=achievementRows(s),todo=all.filter(r=>!r.done).slice(0,3),done=all.length-all.filter(r=>!r.done).length;
  const fig=(n,r)=>(r.id.startsWith('rev-')?'$':'')+short(n);
  return {figure:done+' / '+ACHIEVEMENTS.length+' · +'+done+'% sales',rows:todo.map(r=>row({title:r.name,sub:r.goal,figure:fig(r.value,r)+' / '+fig(r.target,r),share:r.share}))};}
 function ladderRows(){const rows=[];
  const career=text('careerName');if(career&&text('careerDetail')){const m=/^(.*?) lifetime/.exec(text('careerDetail'));
   rows.push(row({title:career,sub:'Career milestone · +5% sales',figure:m?m[1]:text('careerDetail'),share:$('careerProgress')?$('careerProgress').value/100:null}));}
  if(text('orderName')&&text('orderName')!=='ALL ORDERS FILLED')rows.push(row({title:'Milestone bonus',sub:text('claimReward')+' cash',figure:text('orderProgress')}));
  if(text('seasonName'))rows.push(row({title:text('seasonName'),sub:text('seasonKicker'),figure:text('seasonTime').replace(/^Ends in /,'')+' left'}));
  const d=/in (\d+h \d+m)/.exec(text('dailyTime'));rows.push(row({title:'Daily reward',sub:text('dailyTitle'),figure:$('dailyClaim')&&!$('dailyClaim').disabled?'Ready':d?'in '+d[1]:''}));
  return rows;}

 let signature='';
 function render(force){
  if(document.hidden||!getState)return;
  const s=getState(),buttons=ready(),total=buttons.reduce((n,b)=>n+dollars(b.textContent),0);
  const badge=$('goalsTabBadge');if(badge)badge.hidden=!buttons.length;
  if(pane.hidden&&!force)return;
  const star=starRows(s.empire),award=awardRows(s),[shiftTitle,shiftFigure]=shiftHead();
  const html=section('Contract','',contractRows())+section(shiftTitle,shiftFigure,shiftRows())+section('Shop story','',storyRows())+
   (star?section(star.title,star.figure,star.rows):'')+section('Achievements',award.figure,award.rows)+section('Milestones','',ladderRows());
  const daily=/in (\d+h \d+m)/.exec(text('dailyTime'));
  const sig=html+'#'+buttons.length+total;if(sig===signature)return;signature=sig;
  collect.hidden=!buttons.length;
  collect.querySelector('b').textContent=(format?format(total):'$'+short(total))+(buttons.length>1?' · '+buttons.length+' rewards':'');
  collect.setAttribute('aria-label','Collect '+buttons.length+' reward'+(buttons.length===1?'':'s')+', '+(format?format(total):total));
  quiet.hidden=!!buttons.length;quiet.textContent='Nothing to collect'+(daily?' · daily reward in '+daily[1]:'');
  list.innerHTML=html;
 }
 const act=name=>{const click=id=>{const b=$(id);if(b&&!b.disabled)b.click();};
  if(name==='contract-start')click('contractStart');else if(name==='contract-boost')click('contractBoost');else if(name==='story')click('storyAction');
  requestAnimationFrame(()=>render(true));};
 list.addEventListener('click',e=>{const t=e.target.closest('[data-act]');if(t)act(t.dataset.act);});
 list.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('.goal-action')){e.preventDefault();act(e.target.dataset.act);}});
 setInterval(()=>render(false),400);
 if(window.MutationObserver)new MutationObserver(()=>{if(!pane.hidden){render(true);requestAnimationFrame(()=>render(true));}}).observe(pane,{attributes:true,attributeFilter:['hidden']});
 render(true);
 return {render};
}
