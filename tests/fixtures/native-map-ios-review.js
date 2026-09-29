// Loaded only by the Debug-only CANOPY_MAP_REVIEW_SCRIPT launch environment in an isolated simulator.
(()=>{
 const params=globalThis.CANOPY_REVIEW_OPTIONS||{},errors=[],checks={};
 window.addEventListener('error',e=>errors.push(e.message));
 window.addEventListener('unhandledrejection',e=>errors.push(String(e.reason)));
 Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t},configurable:true});
 localStorage.setItem('canopy-age-ok','1');localStorage.setItem('canopy-telemetry','off');
 if(!params.reload)localStorage.setItem('shift-save',JSON.stringify({money:5000000,lifetime:7000000,lines:[15,15,15,15,15,15],staff:[2,2,2,2,2,2],stock:[40,40,40,40,40],gameSpeed:params.running?1:0,lightMode:params.night?'night':'day',lounge:2,kiosk:true,doorBuilt:true,shopOpen:true,lastSeen:Date.now(),empire:{activeStore:params.store||0,stores:Array.from({length:5},()=>({level:7,projects:[true,true,true]}))}}));
 const report=()=>{
  const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}};const r={layout:window.__shiftReady?{hud:rect(document.querySelector('.hud')),controls:rect(document.querySelector('.map-controls')),world:rect(document.querySelector('.world')),hudHeight:getComputedStyle(document.documentElement).getPropertyValue('--hud-height')}:null,scenario:params.scenario,ready:!!window.__shiftReady,native:document.documentElement.classList.contains('native-map-ready'),available:!!window.canopyNativeMapAvailable,customCharacter:!!window.canopyNativeCharacterAvailable,caramelCharacter:!!window.canopyNativeCaramelAvailable,checks,stats:window.__canopyNativeMapStats,frameMs:window.__canopyFrameMs,errors,viewport:{width:innerWidth,height:innerHeight},status:window.factoryTool?.execute(),save:JSON.parse(localStorage.getItem('shift-save'))};
  r.characterKinds=window.canopyNativeCharacterKinds;
  window.webkit?.messageHandlers?.canopyMapReview?.postMessage(r);
 };
 let completed=false;
 setInterval(()=>{
   if(window.__shiftReady&&!completed){completed=true;
    if(params.zoom){document.querySelector('#zoomIn')?.click()}
    if(params.exercise){
      const before=JSON.parse(JSON.stringify(window.factoryTool.execute()));document.querySelector('#buyMachine').click();const upgraded=window.factoryTool.execute();
      checks.upgrade=upgraded.lineLevels.some((n,i)=>n>before.lineLevels[i]);checks.charged=upgraded.cash<before.cash;
      window.canopyNativeTray.select('employees');checks.staff=!document.querySelector('[data-pane=employees]').hidden;
      window.canopyNativeTray.select('factory');
      const old=window.factoryTool.execute().camera;document.querySelector('#zoomIn').click();const zoomed=window.factoryTool.execute().camera;
      checks.zoom=zoomed.zoom>old.zoom;document.querySelector('[data-marker="5"]').click();checks.selection=window.factoryTool.execute().camera.zoom===zoomed.zoom;
      document.querySelector('#centerView').click();document.querySelector('[data-speed="4"]').click();
      const first=window.factoryTool.execute().customersServed;let samples=0,violations=0;
      const sampling=setInterval(()=>{const current=window.factoryTool.execute();samples++;for(const c of current.customers)if((c.phase==='pickup'||c.phase==='toPickup'||c.bag)&&!c.ordered&&!c.lounge)violations++},100);
      setTimeout(()=>{clearInterval(sampling);document.querySelector('[data-speed="4"]').click();const current=window.factoryTool.execute();checks.customerSamples=samples;checks.orderViolations=violations;checks.pickups=current.customersServed-first;checks.native=document.documentElement.classList.contains('native-map-ready');checks.complete=true;report()},22000);
    }
    if(params.collapse)document.querySelector('#panelToggle')?.click();
    if(params.maxPan)setTimeout(()=>{
      const canvas=document.querySelector('canvas');
      // Synthetic touch input stays on the canvas; emulate capture only in this isolated Debug fixture.
      canvas.setPointerCapture=()=>{};canvas.releasePointerCapture=()=>{};
      for(let i=0;i<16;i++)document.querySelector('#zoomIn').click();
      checks.maxPan={};
      for(const [axis,sign] of [['X',-1],['X',1],['Y',-1],['Y',1]]){
        document.querySelector('#zoomIn').click();const before=window.factoryTool.execute().camera;
        const dx=axis==='X'?sign*innerWidth*.2:0,dy=axis==='Y'?sign*innerHeight*.15:0;
        for(let i=0;i<80;i++){
          for(const [type,x,y,buttons] of [['pointerdown',100,200,1],['pointermove',100+dx,200+dy,1],['pointerup',100+dx,200+dy,0]])canvas.dispatchEvent(new PointerEvent(type,{bubbles:true,button:0,buttons,clientX:x,clientY:y,pointerId:1,pointerType:'touch'}));
        }
        const after=window.factoryTool.execute().camera;
        checks.maxPan[axis+sign]={passed:sign*(after['pan'+axis]-before['pan'+axis])>(axis==='X'?innerWidth:innerHeight)*1.6&&after.zoom===8&&after.angle===before.angle,camera:after};
      }
      document.querySelector('#centerView').click();checks.recenter=window.factoryTool.execute().camera.zoom===1;
      checks.complete=true;report();
    },800);
    if(params.fallback)setTimeout(()=>{
      const before=window.factoryTool.execute().camera,labels=Array.from(document.querySelectorAll('.world .marker')).map(el=>el.style.transform);
      window.canopyNativeMapFailed();
      setTimeout(()=>{
        checks.fallbackCamera=JSON.stringify(before)===JSON.stringify(window.factoryTool.execute().camera);
        checks.fallbackLabels=Array.from(document.querySelectorAll('.world .marker')).every((el,i)=>el.style.transform===labels[i]);
        checks.fallbackVisible=!document.documentElement.classList.contains('native-map-ready');checks.complete=true;report();
      },700);
    },1500);
   }
   report();
 },1000);
})();
