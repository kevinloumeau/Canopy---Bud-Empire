import {abbr,STORES,starStatus,starCount,STAR_BONUS} from './progression.js';
import {ACHIEVEMENTS,achievementRows} from './achievements.js';
// Empire and Goals shells. Reparents the existing controls (main.js and operations-ui.js keep rendering them by id).
// Empire has three screens: Home (reopen card, store list, founder perks), Store (one branch), Records.
// Goals is one list: every reward to collect, the contract, shift goals and story, branch stars, achievements, ladders.
import {mountEmpireStores} from './empire-stores.js';
import {manageDialog} from './dialog-focus.js';
export function mountEmpireShell({fit,getState,format}){
 const pane=document.querySelector('[data-pane=empire]'),$=id=>document.getElementById(id);
 const section=name=>pane.querySelector('[data-empire-section="'+name+'"]');
 const el=(tag,cls,html)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(html!=null)n.innerHTML=html;return n;};
 const chevron='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
 const screens={home:el('div','empire-screen empire-content'),store:el('div','empire-screen empire-content'),details:el('div','empire-screen empire-content')};
 Object.keys(screens).forEach(name=>{screens[name].dataset.screen=name;screens[name].hidden=name!=='home';});
 const backBar=(label,title)=>{const bar=el('div','empire-back');const button=el('button','empire-back-button','<span class="empire-back-icon">'+chevron+'</span><span>'+label+'</span>');button.type='button';const heading=el('b','empire-back-title',title||'');bar.append(button,heading);button.onclick=()=>show('home');return {bar,heading};};
 const group=(title,nodes)=>{const g=el('section','empire-group');if(title)g.append(el('h2','empire-group-title',title));nodes.forEach(n=>n&&g.append(n));return g;};

 // Home: return summary, rewards strip, store list, one door to everything else.
 const today=section('today'),growth=section('growth');
 const strip=el('section','reward-strip');strip.setAttribute('aria-label','Rewards ready to collect');
 const chips=el('div','reward-chips'),collectAll=el('button','reward-collect','Collect all'),quiet=el('p','reward-quiet');collectAll.type='button';
 strip.append(chips,collectAll,quiet);
 const storesHead=growth.querySelector('.empire-section-heading'),storesSummary=$('branchSummary'),storesHelp=growth.querySelector('.branch-help');
 const list=el('div','store-list');
 const toggles=[],articles=[];
 growth.querySelectorAll('.empire-branch').forEach((article,i)=>{const toggle=article.querySelector('.branch-toggle');toggles[i]=toggle;articles[i]=article;list.append(toggle);});
 const more=el('button','empire-more','<span>Records</span><span class="empire-more-hint">Lifetime figures, reputation</span>'+chevron);more.type='button';more.onclick=()=>show('details');
 // Empire home: the reopen card leads (it pays for the perks below), then the stores, then reopening and founder perks.
 const reopen=$('reopenCard');
 screens.home.append(reopen||'',storesHead,storesSummary,list,storesHelp,group(null,[growth.querySelector('.depth-panel')]),more);
 // Goals: everything with a target or a timer, in one list.
 const goalsPane=document.querySelector('[data-pane=goals]'),goalsScreen=el('div','empire-screen empire-content goals-screen');
 goalsScreen.dataset.screen='goals';
 goalsScreen.append(strip,$('contractCard'));
 const shiftGoals=document.querySelector('.goals-body');if(shiftGoals)goalsScreen.append(shiftGoals);
 // The welcome-back report is a moment over the map, not a row in a tab.
 const summary=$('returnSummary');if(summary){const overlay=el('div','return-overlay');overlay.hidden=true;const card=el('div','return-card');card.append(summary);overlay.append(card);document.body.append(overlay);
  const reflect=()=>{overlay.hidden=summary.hidden;if(!summary.hidden){const b=$('dismissReturn');if(b)b.focus({preventScroll:true});}};
  if(window.MutationObserver)new MutationObserver(reflect).observe(summary,{attributes:true,attributeFilter:['hidden']});reflect();
  card.setAttribute('role','dialog');card.setAttribute('aria-modal','true');card.setAttribute('aria-label','Welcome back');
  manageDialog(overlay,()=>{const b=$('dismissReturn');if(b)b.click();});}

 // Store: back bar, then the branch's own sticky tabs and body.
 const storeBar=backBar('Stores');screens.store.append(storeBar.bar);
 articles.forEach(article=>screens.store.append(article));

 // Details: records and long-cycle rewards, each under its own heading.
 const detailsBar=backBar('Empire','Records');screens.details.append(detailsBar.bar);
 // Scoreboard: the lifetime figures that left the HUD, at the top of the records.
 const board=el('section','scoreboard');board.setAttribute('aria-label','Lifetime figures');
 const stats=[['Lifetime revenue','revenue'],['Bags sold','served'],['Deliveries','deliveries'],['Trophies','trophies'],['Shares','prestige']];
 board.innerHTML=stats.map(([label,key])=>'<div class="score"><small>'+label+'</small><b data-score="'+key+'">—</b></div>').join('');
 screens.details.append(board);
 let boardSig='';
 function syncBoard(){if(!getState)return;const s=getState();const values={revenue:format?format(s.lifetime||0):String(Math.round(s.lifetime||0)),served:abbr(s.sold||0),deliveries:abbr(s.onlineCompleted||0),trophies:String((s.empire&&s.empire.trophies)||0),prestige:String((s.empire&&s.empire.shares)||0)};const sig=Object.values(values).join('|');if(sig===boardSig)return;boardSig=sig;stats.forEach(([,key])=>{board.querySelector('[data-score="'+key+'"]').textContent=values[key];});}
 const goalsOpen=()=>document.body.dataset.activeTray==='goals';
 setInterval(()=>{if(document.hidden)return;if(current==='details')syncBoard();if(goalsOpen()){syncAwards();syncStars();}},500);
 // Achievements: the nearest few still to earn, then the earned ones folded away. Each earned one is +1% sales.
 const awards=el('section','empire-group achievements');awards.setAttribute('aria-label','Achievements');
 awards.innerHTML='<div class="achievement-head"><h2 class="empire-group-title">Achievements</h2><b id="achievementTotal"></b></div><ul class="achievement-list" id="achievementNext"></ul><details class="empire-help achievement-earned"><summary id="achievementEarnedLabel"></summary><ul class="achievement-list" id="achievementDone"></ul></details>';
 const tick='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
 const short=(n,r)=>(r.id.startsWith('rev-')?'$':'')+abbr(Math.floor(n)).replace(/\.0+([KMBT])$/,'$1').replace(/(\.\d)0([KMBT])$/,'$1$2');
 const row=r=>'<li class="achievement'+(r.done?' is-done':'')+'"><span class="achievement-copy"><b>'+r.name+'</b><small>'+r.goal+'</small></span>'+(r.done?'<span class="achievement-figure" aria-label="Earned">'+tick+'</span>':'<span class="achievement-figure">'+short(r.value,r)+' / '+short(r.target,r)+'</span>')+'</li>';
 let awardSig='';
 function syncAwards(){if(!getState)return;const rows=achievementRows(getState()),todo=rows.filter(r=>!r.done).slice(0,4),done=rows.filter(r=>r.done);
  const sig=todo.map(r=>r.id+':'+Math.floor(r.value)).join('|')+'#'+done.length;if(sig===awardSig)return;awardSig=sig;
  $('achievementTotal').textContent=done.length+' / '+ACHIEVEMENTS.length+' · +'+done.length+'% sales';
  $('achievementNext').innerHTML=todo.map(row).join('');$('achievementNext').hidden=!todo.length;
  $('achievementEarnedLabel').textContent=done.length?'Earned ('+done.length+')':'Each one earned adds +1% to every sale';
  $('achievementDone').innerHTML=done.map(row).join('');}
 // Branch stars: the three goals of the branch being worked on now (the newest open one not yet finished).
 const stars=el('section','empire-group goal-stars');stars.setAttribute('aria-labelledby','goalStarsTitle');
 stars.innerHTML='<div class="achievement-head"><h2 class="empire-group-title" id="goalStarsTitle"></h2><b id="goalStarsCount"></b></div><ul class="achievement-list" id="goalStarsList"></ul><p class="goal-stars-reward" id="goalStarsReward"></p>';
 let starSig='';
 function syncStars(){if(!getState)return;const p=getState().empire;let i=-1;STORES.forEach((_,k)=>{if(p.stores[k].level>0&&starCount(p,k)<3)i=k;});
  stars.hidden=i<0;if(i<0)return;const goals=starStatus(p,i),count=goals.filter(g=>g.earned).length;
  const sig=i+'|'+goals.map(g=>g.progress+':'+g.earned).join();if(sig===starSig)return;starSig=sig;
  $('goalStarsTitle').textContent=STORES[i].name+' stars';$('goalStarsCount').textContent=count+' / 3';
  $('goalStarsList').innerHTML=goals.map(g=>'<li class="achievement'+(g.earned?' is-done':'')+'"><span class="achievement-copy"><b>'+g.title+'</b></span>'+(g.earned?'<span class="achievement-figure" aria-label="Earned">'+tick+'</span>':'<span class="achievement-figure">'+(g.kind==='level'?'Lv '+g.progress+' / '+g.target:abbr(g.progress)+' / '+abbr(g.target))+'</span>')+'</li>').join('');
  const next=STORES[i+1];$('goalStarsReward').textContent='All three: +'+Math.round(STAR_BONUS*100)+'% sales everywhere'+(next?' and '+next.name+' opens':'');}
 const shopMilestone=document.querySelector('.shop-milestone');
 goalsScreen.append(stars,awards,
  group(null,[$('careerName'),$('careerDetail'),$('careerProgress'),$('careerBonus'),$('careerClaim')]),
  group(null,[shopMilestone]),
  group(null,Array.from(section('daily').children)),
  group(null,Array.from(section('events').children))
 );
 if(goalsPane)goalsPane.append(goalsScreen);
 screens.details.append(group(null,[today.querySelector('.reputation')]));
 // Keep the back controls outside the scrolling content so their background can be the panel itself.
 const scrollers={};
 ['store','details'].forEach(name=>{const screen=screens[name],body=el('div','empire-screen-body');while(screen.children.length>1)body.append(screen.children[1]);screen.append(body);scrollers[name]=body;});
 pane.append(screens.home,screens.store,screens.details);
 const storesUI=mountEmpireStores({getState,format});

 // Navigation.
 let current='home';
 function show(name){current=name;if(name==='details')syncBoard();Object.keys(screens).forEach(k=>screens[k].hidden=k!==name);pane.dataset.empireScreen=name;pane.scrollTop=0;if(scrollers[name])scrollers[name].scrollTop=0;if(name!=='store')closeBranches();if(fit)fit();}
 function closeBranches(){articles.forEach((article,i)=>{const body=$('branchBody'+i),nav=article.querySelector('.operation-tabs');if(body)body.hidden=true;if(nav)nav.hidden=true;toggles[i].setAttribute('aria-expanded','false');});}
 function openStore(i){articles.forEach((article,j)=>{const body=$('branchBody'+j),nav=article.querySelector('.operation-tabs');if(body)body.hidden=j!==i;if(nav)nav.hidden=j!==i;toggles[j].setAttribute('aria-expanded',String(j===i));});storeBar.heading.textContent=toggles[i].querySelector('.branch-name').textContent;show('store');}
 toggles.forEach((toggle,i)=>{toggle.onclick=()=>openStore(i);toggle.removeAttribute('aria-expanded');toggle.setAttribute('aria-haspopup','false');});
 // main.js still opens a branch body directly (Manage on the map, bottleneck shortcuts); follow it.
 if(window.MutationObserver){const watcher=new MutationObserver(()=>{const open=articles.findIndex((_,i)=>$('branchBody'+i)&&!$('branchBody'+i).hidden);if(open>=0&&(current!=='store'||storeBar.heading.textContent!==toggles[open].querySelector('.branch-name').textContent)){openStore(open);}});articles.forEach((_,i)=>{const body=$('branchBody'+i);if(body)watcher.observe(body,{attributes:true,attributeFilter:['hidden']});});}
 const todayView=pane.querySelector('[data-empire-view=today]');if(todayView)todayView.addEventListener('click',()=>{if(current!=='home')show('home');});
 // Rewards strip mirrors the existing claim buttons; collecting clicks them.
 const sources=[['Daily','dailyClaim'],['Milestone','careerClaim'],['Bonus','claim'],['Week','seasonClaim'],['Goal','goalClaim0'],['Goal','goalClaim1'],['Goal','goalClaim2']];
 const amount=text=>{const m=/\$[\d.,]+[KMB]?/.exec(text);return m?m[0]:text.trim().replace(/^Collect\s*/,'');};
 let signature='';
 function sync(){
  if(document.hidden)return;
  storesUI.sync();
  const ready=sources.map(([kind,id])=>{const b=$(id);return b&&!b.disabled&&!b.hidden&&/^Collect\b/.test(b.textContent.trim())?{kind,button:b,amount:amount(b.textContent)}:null;}).filter(Boolean);
  const daily=$('dailyTime')?/in (\d+h \d+m)/.exec($('dailyTime').textContent):null;
  const next=ready.length?'':'Nothing to collect'+(daily?' · daily reward in '+daily[1]:'');
  const sig=ready.map(r=>r.kind+r.amount).join('|')+'#'+next;
  if(sig===signature)return;signature=sig;
  chips.innerHTML='';ready.forEach(r=>{const chip=el('button','reward-chip','<small>'+r.kind+'</small><b>'+r.amount+'</b>');chip.type='button';chip.setAttribute('aria-label','Collect '+r.kind.toLowerCase()+' reward '+r.amount);chip.onclick=()=>r.button.click();chips.append(chip);});
  strip.classList.toggle('has-rewards',ready.length>0);collectAll.hidden=ready.length<2;quiet.textContent=next;quiet.hidden=!next;
  const badge=$('goalsTabBadge');if(badge)badge.hidden=!ready.length;
 }
 collectAll.onclick=()=>{sources.forEach(([,id])=>{const b=$(id);if(b&&!b.disabled&&/^Collect\b/.test(b.textContent.trim()))b.click();});sync();};
 pane.addEventListener('click',()=>requestAnimationFrame(sync));if(goalsPane)goalsPane.addEventListener('click',()=>requestAnimationFrame(sync));
 setInterval(sync,250);sync();
 // Opening the Goals tab refreshes its slower lists at once instead of on the next half-second tick.
 if(goalsPane&&window.MutationObserver)new MutationObserver(()=>{if(!goalsPane.hidden){syncAwards();syncStars();}}).observe(goalsPane,{attributes:true,attributeFilter:['hidden']});
 syncAwards();syncStars();
 return {show,openStore,sync};
}
