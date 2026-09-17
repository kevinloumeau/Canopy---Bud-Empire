// Empire navigation shell: one list, then one screen at a time.
// Reparents the existing Empire controls (main.js and operations-ui.js keep rendering them by id)
// into three screens: Home (rewards strip + store list), Store (one branch), Details (records).
export function mountEmpireShell({fit}){
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
 const more=el('button','empire-more','<span>Rewards &amp; records</span><span class="empire-more-hint" id="empireMoreHint"></span>'+chevron);more.type='button';more.onclick=()=>show('details');
 screens.home.append(strip,storesHead,storesSummary,list,storesHelp,more);
 // The welcome-back report is a moment over the map, not a row in a tab.
 const summary=$('returnSummary');if(summary){const overlay=el('div','return-overlay');overlay.hidden=true;const card=el('div','return-card');card.append(summary);overlay.append(card);document.body.append(overlay);
  const reflect=()=>{overlay.hidden=summary.hidden;if(!summary.hidden){const b=$('dismissReturn');if(b)b.focus({preventScroll:true});}};
  if(window.MutationObserver)new MutationObserver(reflect).observe(summary,{attributes:true,attributeFilter:['hidden']});reflect();
  overlay.addEventListener('keydown',e=>{if(e.key==='Escape'){const b=$('dismissReturn');if(b)b.click();}});}

 // Store: back bar, then the branch's own sticky tabs and body.
 const storeBar=backBar('Stores');screens.store.append(storeBar.bar);
 articles.forEach(article=>screens.store.append(article));

 // Details: records and long-cycle rewards, each under its own heading.
 const detailsBar=backBar('Empire','Rewards & records');screens.details.append(detailsBar.bar);
 const nextSteps=today.querySelector('h2:not(.empire-section-heading)');
 screens.details.append(
  group(null,[$('careerName'),$('careerDetail'),$('careerProgress'),$('careerBonus'),$('careerClaim')]),
  group(null,Array.from(section('daily').children)),
  group(null,Array.from(section('events').children)),
  group(null,[nextSteps,$('nextInvestment'),$('shortGoals')]),
  group(null,[today.querySelector('.reputation')]),
  group(null,[today.querySelector('.operations-today')]),
  group(null,[growth.querySelector('.depth-panel')])
 );
 pane.append(screens.home,screens.store,screens.details);

 // Navigation.
 let current='home';
 function show(name){current=name;Object.keys(screens).forEach(k=>screens[k].hidden=k!==name);pane.dataset.empireScreen=name;pane.scrollTop=0;if(name!=='store')closeBranches();if(fit)fit();}
 function closeBranches(){articles.forEach((article,i)=>{const body=$('branchBody'+i),nav=article.querySelector('.operation-tabs');if(body)body.hidden=true;if(nav)nav.hidden=true;toggles[i].setAttribute('aria-expanded','false');});}
 function openStore(i){articles.forEach((article,j)=>{const body=$('branchBody'+j),nav=article.querySelector('.operation-tabs');if(body)body.hidden=j!==i;if(nav)nav.hidden=j!==i;toggles[j].setAttribute('aria-expanded',String(j===i));});storeBar.heading.textContent=toggles[i].querySelector('.branch-name').textContent;show('store');}
 toggles.forEach((toggle,i)=>{toggle.onclick=()=>openStore(i);toggle.removeAttribute('aria-expanded');toggle.setAttribute('aria-haspopup','false');});
 // main.js still opens a branch body directly (Manage on the map, bottleneck shortcuts); follow it.
 if(window.MutationObserver){const watcher=new MutationObserver(()=>{const open=articles.findIndex((_,i)=>$('branchBody'+i)&&!$('branchBody'+i).hidden);if(open>=0&&(current!=='store'||storeBar.heading.textContent!==toggles[open].querySelector('.branch-name').textContent)){openStore(open);}});articles.forEach((_,i)=>{const body=$('branchBody'+i);if(body)watcher.observe(body,{attributes:true,attributeFilter:['hidden']});});}
 const todayView=pane.querySelector('[data-empire-view=today]');if(todayView)todayView.addEventListener('click',()=>{if(current!=='home')show('home');});
 // Sticky branch tabs sit under the back bar instead of the removed section switcher.
 const measure=()=>{const h=storeBar.bar.getBoundingClientRect().height;if(h)pane.style.setProperty('--empire-tabs-height',h+'px');};
 if(window.ResizeObserver)new ResizeObserver(measure).observe(storeBar.bar);

 // Rewards strip mirrors the existing claim buttons; collecting clicks them.
 const sources=[['Daily','dailyClaim'],['Milestone','careerClaim'],['Event','eventAction'],['Goal','goalClaim0'],['Goal','goalClaim1'],['Goal','goalClaim2']];
 const amount=text=>{const m=/\$[\d.,]+[KMB]?/.exec(text);return m?m[0]:'';};
 let signature='';
 function sync(){
  const ready=sources.map(([kind,id])=>{const b=$(id);return b&&!b.disabled&&!b.hidden&&/^Collect\s/.test(b.textContent)?{kind,button:b,amount:amount(b.textContent)}:null;}).filter(Boolean);
  const daily=$('dailyTime')?/in (\d+h \d+m)/.exec($('dailyTime').textContent):null,event=$('eventTime')?/in (\d+h \d+m)/.exec($('eventTime').textContent):null;
  const next=ready.length?'':'Nothing to collect'+(daily?' · daily reward in '+daily[1]:'')+(event?' · event in '+event[1]:'');
  const sig=ready.map(r=>r.kind+r.amount).join('|')+'#'+next;
  if(sig===signature)return;signature=sig;
  chips.innerHTML='';ready.forEach(r=>{const chip=el('button','reward-chip','<small>'+r.kind+'</small><b>'+r.amount+'</b>');chip.type='button';chip.setAttribute('aria-label','Collect '+r.kind.toLowerCase()+' reward '+r.amount);chip.onclick=()=>r.button.click();chips.append(chip);});
  strip.classList.toggle('has-rewards',ready.length>0);collectAll.hidden=ready.length<2;quiet.textContent=next;quiet.hidden=!next;
  $('empireMoreHint').textContent=ready.length?ready.length+' ready':'';
 }
 collectAll.onclick=()=>{sources.forEach(([,id])=>{const b=$(id);if(b&&!b.disabled&&/^Collect\s/.test(b.textContent))b.click();});sync();};
 pane.addEventListener('click',()=>requestAnimationFrame(sync));
 setInterval(sync,250);sync();measure();
 return {show,openStore,sync};
}
