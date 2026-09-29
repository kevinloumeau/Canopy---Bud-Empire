// Injected through the existing Debug-only review bridge, only in clean test simulators.
(()=>{
 const errors=[],checks={};let ready=false,chosen=false,chosenAt=0,samples=0,violations=0;
 window.addEventListener('error',e=>errors.push(e.message));window.addEventListener('unhandledrejection',e=>errors.push(String(e.reason)));
 Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t},configurable:true});
 localStorage.setItem('canopy-age-ok','1');localStorage.setItem('shift-guide-seen','1');localStorage.setItem('canopy-telemetry','off');
 localStorage.setItem('shift-save',JSON.stringify({money:5000000,lifetime:5000000,lines:[8,8,8,8,8,8],staff:[2,2,2,2,2,2],strains:[1,1,1,1],stock:[60,60,60,60,60],gameSpeed:4,doorBuilt:true,shopOpen:true,lastSeen:Date.now(),shopPlay:{cooldown:0,shift:{seconds:298}},empire:{stores:[{level:2},{level:1}],network:{stores:[{raw:60,stock:[12,0,0]}]}}}));
 function report(s){window.webkit?.messageHandlers?.canopyMapReview?.postMessage({ready:!!window.__shiftReady,native:document.documentElement.classList.contains('native-map-ready'),checks,errors,status:s,stats:window.__canopyNativeMapStats,viewport:{width:innerWidth,height:innerHeight},save:JSON.parse(localStorage.getItem('shift-save'))});}
 setInterval(()=>{
  if(!window.__shiftReady||!window.factoryTool)return;let s=window.factoryTool.execute();samples++;for(const c of s.customers)if((c.phase==='pickup'||c.phase==='toPickup'||c.bag)&&!c.ordered&&!c.lounge)violations++;
  if(!ready){ready=true;const cash=s.cash;document.getElementById('buyMachine').click();checks.upgrade=window.factoryTool.execute().cash<cash;checks.recap=!!s.shopPlay.recap;}
  if(!chosen&&s.budtenderMoment){chosen=true;chosenAt=Date.now();document.querySelector('[data-speed="1"]').click();document.querySelector('[data-speed="1"]').click();document.getElementById('shopActivity').click();const m=s.budtenderMoment,index=m.choices.findIndex(o=>m.formatRequest?o.format===m.target:o.type===m.target);checks.moment=true;checks.choices=document.querySelectorAll('[data-choice]').length;
   setTimeout(()=>{document.querySelector('[data-choice="'+index+'"]').click();document.getElementById('shopActivityClose').click();document.querySelector('[data-speed="4"]').click();},7000);
  }
  if(chosen&&Date.now()-chosenAt>22000&&!checks.complete){document.querySelector('[data-speed="1"]').click();document.querySelector('[data-speed="1"]').click();s=window.factoryTool.execute();checks.tip=s.shopPlay.tips>0;checks.matches=s.shopPlay.matches;checks.recap=!!s.shopPlay.recap;checks.pickups=s.shopPlay.shift.served;checks.samples=samples;checks.orderViolations=violations;
   document.getElementById('shopActivity').click();checks.activity=!document.getElementById('shopActivityPanel').hidden;const alert=s.operationsAlerts.find(a=>a.tab===2)||s.operationsAlerts[0];if(alert){document.querySelector('[data-alert="'+alert.id+'"]').click();checks.alert=!document.getElementById('opPane'+alert.store+alert.tab).hidden;document.getElementById('shopActivity').click();}checks.complete=true;
  }
  report(window.factoryTool.execute());
 },250);
})();
