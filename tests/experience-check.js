// Browser regression checks for the production preview, on a dedicated test origin.
// Import this file through the dev server, then call runExperienceChecks('starter'|'established').
const $=id=>document.getElementById(id);
const assert=(condition,message)=>{if(!condition)throw new Error(message)};
const settle=()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
const click=async el=>{assert(el&&!el.disabled,'Control is available');el.click();await settle()};
export async function runExperienceChecks(mode){
 const result=[],status=()=>{const s=JSON.parse(localStorage.getItem('shift-save'));return {gameSpeed:s.gameSpeed,cash:s.money,lineLevels:s.lines,employeeLevels:s.staff,stock:s.stock,onlineCompleted:s.onlineCompleted,viewedStore:s.empire.activeStore}};
 assert(window.__shiftReady,'Game loaded');assert(!document.querySelector('[data-proxy=graphics]'),'No animation-quality setting');
 const initial=status();assert(initial.gameSpeed===0,'Fixture is paused');
 const tabs=[...document.querySelectorAll('[data-tray]')];
 for(const tab of tabs){if(tab.getAttribute('aria-pressed')!=='true'||$('sheet').classList.contains('collapsed'))await click(tab);assert(!$('sheet').classList.contains('collapsed'),'Tab opens');assert(document.querySelector('[data-pane='+tab.dataset.tray+']').hidden===false,'Matching pane visible');}
 result.push('all six tabs and panes');
 await click(document.querySelector('[data-tray=empire]'));assert($('sheet').classList.contains('collapsed'),'Active tab collapses');await click(document.querySelector('[data-tray=empire]'));
 await click($('goalsOpen'));assert(!$('goalsModal').hidden,'Story opens');
 if(mode==='starter'){
  assert($('storyTitle').textContent==='The first familiar faces','New-player chapter');
  assert($('nextInvestment').textContent.includes('Pickup'),'Shared bottleneck guidance');
  document.querySelector('.story-goals').open=true;
  assert($('goalClaim1').textContent==='View delivery pad','Delivery objective explains prerequisite');
  await click($('goalClaim1'));assert(!document.querySelector('[data-pane=orders]').hidden,'Gated goal navigates to deliveries');
  assert(!$('deliverySite').hidden&&$('deliverySite').style.display!=='none','Delivery construction visible');
  assert($('deliveryFunding').value>0&&$('deliveryFunding').value<1,'Funding reflects current cash');
  await click($('goalsOpen'));const cash=status().cash;await click($('nextInvestmentLink'));assert($('machineName').textContent==='CUSTOMER PICKUP','Recommendation selects Pickup');assert(status().cash===cash,'Recommendation never spends');
  result.push('starter story, consistent recommendation, locked delivery funding and navigation');
 }else{
  assert($('storyTitle').textContent==='Someone knows your name','Legacy progress recognized');
  await click($('storyAction'));assert($('opTab02').getAttribute('aria-pressed')==='true','Mara action opens People');
  await click(document.querySelector('[data-tray=factory]'));const levels=status().lineLevels.slice();await click($('buyMachine'));const after=status();assert(after.lineLevels.some((n,i)=>n===levels[i]+1),'Station upgraded');
  await click(document.querySelector('[data-tray=employees]'));const training=status().employeeLevels[0];await click(document.querySelector('[data-staff="0"]'));assert(status().employeeLevels[0]===training+1,'Employee trained');
  await click(document.querySelector('[data-tray=orders]'));const online=status().onlineCompleted,ready=status().stock[4];await click($('fulfillOnlineMax'));assert(status().onlineCompleted>online,'Delivery completed');assert(status().stock[4]===ready,'Ready walk-in bags preserved');
  await click($('locationToggle'));await click($('storeButton1'));assert(status().viewedStore===1,'Visit Riverside');
  await click($('manageViewedStore'));assert(!document.querySelector('[data-pane=empire]').hidden,'Manage opens Empire');
  const position=$('branchMapMarker').style.transform;await click($('zoomIn'));assert($('branchMapMarker').style.transform!==position,'Zoom updates anchored marker');await click($('centerView'));assert($('branchMapMarker').style.transform===position,'Recenter restores camera');
  const saved=JSON.parse(localStorage.getItem('shift-save'));assert(saved.journey.completed.includes('river'),'Journal persisted');assert(saved.lines.some((n,i)=>n>initial.lineLevels[i]),'Upgrades persisted');
  result.push('legacy journal, character navigation, station/staff upgrades, dispatch stock safety, branches, camera, saved progress');
 }
 await click($('settingsOpen'));assert(document.querySelector('.app').inert,'Modal background inert');
 const close=document.querySelector('.settings-close'),last=document.querySelector('[data-proxy=resetOpen]');
 close.focus();close.dispatchEvent(new KeyboardEvent('keydown',{key:'Tab',shiftKey:true,bubbles:true,cancelable:true}));assert(document.activeElement===last,'Shift+Tab loops inside settings');
 last.dispatchEvent(new KeyboardEvent('keydown',{key:'Tab',bubbles:true,cancelable:true}));assert(document.activeElement===close,'Tab loops inside settings');
 await click(document.querySelector('[data-proxy=pause]'));assert(status().gameSpeed===1,'Mobile resume works');await click(document.querySelector('[data-proxy=pause]'));assert(status().gameSpeed===0,'Mobile pause works');await click(close);assert(!document.querySelector('.app').inert,'Background released');
 const light=$('lightToggle').getAttribute('aria-pressed');await click($('lightToggle'));assert($('lightToggle').getAttribute('aria-pressed')!==light,'Light switches while paused');
 assert(document.documentElement.scrollWidth<=innerWidth,'No document overflow');
 for(const button of document.querySelectorAll('.hud button')){const r=button.getBoundingClientRect();if(r.width)assert(r.left>=0&&r.right<=innerWidth,'HUD control stays within viewport: '+button.id);}
 result.push('modal focus loop, mobile pause/resume, paused lighting, no page overflow, visible HUD controls');
 return {viewport:[innerWidth,innerHeight],mode,passed:result,save:JSON.parse(localStorage.getItem('shift-save'))};
}
