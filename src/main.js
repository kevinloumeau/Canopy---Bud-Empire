import {AUTO_DRONE_COST,BULK_DRONE_COST,buyAutoDrone,buyBulkDrone,autoDroneLimit,migrateAutoDrone,autoDroneReady} from './auto-drone.js';
import {FORMATS,BOOST_MAX,boostCost,migrateMenu,chooseFormat,milestone,prestigeOffer,elapsedSteps,makeSound} from './depth.js';
import {mountShopBrowser} from './shop-browser.js';
import {tickOperations,atmosphere,branchBottleneck,neighborhood} from './operations.js';
import {mountOperations} from './operations-ui.js';
import {mountEmpireShell} from './empire-shell.js';
import {mountStartGuide} from './start-guide.js';
import {mountSettings} from './settings.js';
import {requestCap,accrueRequests,requestsReady,consumeRequests,requestHeat} from './deliveries.js';
import { BRANCH_THEMES, drawBranchMap } from './branch-maps.js';
import { MANAGERS, PRODUCTS, SPECIALTIES, exclusiveAvailable, setFeatured, assignManager, customerType, satisfyCustomer, tickBranches, bulkReward, dispatchBulk, recordGoal, goalStatus, claimGoal, affordableImprovement, STORE_PROJECTS, PROJECT_LEVELS, PROJECT_BONUSES, projectCost, projectBonus, buyProject, nextStoreRate, selectedStore, selectStore, migrateProgression, dailyStatus, claimDaily, saleMultiplier, claimCareer, CAREER, STORES, DAILY, storeCost, storeRate, branchRate, buyStore, eventStatus, joinEvent, recordEvent, claimEvent } from './progression.js';
(function () {
  'use strict';

  var LINES=[
    {name:'SEED STATION',base:10,rate:1,unlock:0},{name:'GROW ROOM',base:25,rate:1,unlock:0},
    {name:'HARVEST TABLE',base:40,rate:1,unlock:0},{name:'PACKING BAR',base:65,rate:1,unlock:0},
    {name:'ORDER DESK',base:90,rate:1,unlock:0},{name:'CUSTOMER PICKUP',base:120,rate:1,unlock:0}
  ];
  var STRAINS=[{name:'Meadow Mint',price:18,unlock:0,color:'#aacb85'},{name:'Amber Bloom',price:26,unlock:1500,color:'#ddbc75'},{name:'Violet Haze',price:38,unlock:12000,color:'#baa1cf'},{name:'Midnight Orchid',price:56,unlock:65000,color:'#8ebcbb'}];
  // Contract progression is defined in depth.js, including post-city milestones.
  var $=function(id){return document.getElementById(id)};
  function fresh(){return{money:30,lifetime:0,lightMode:null,autoDrone:migrateAutoDrone(),productMenu:migrateMenu(),sound:false,empire:migrateProgression(),idStaff:0,curingLevel:0,durationLevel:0,kioskSpeedLevel:0,onlineBonusLevel:0,comfortLevel:0,scannerLevel:0,trafficLevel:0,pickupLevel:0,readyLevel:0,strains:[1,0,0,0],activeStrain:0,menuStrains:[0],lines:[1,1,1,1,1,1],stock:[0,0,0,0,0],staff:[0,0,0,0,0,0],sold:0,kiosk:false,secondKiosk:false,thirdKiosk:false,queueLevel:0,storageLevel:0,onlineCompleted:0,onlineRequests:0,hints:{web:false,storage:false,queue:false},multiplier:1,globalLevel:0,contract:0,lastSeen:Date.now(),theme:'dispensary',gameSpeed:1}}
  function readSave(){
    for(var key of ['shift-save','shift-save-backup']){
      try{var raw=localStorage.getItem(key);if(!raw)continue;var value=JSON.parse(raw);if(value&&typeof value==='object'&&!Array.isArray(value))return value}catch(e){}
    }
    return {};
  }
  function finite(value,fallback,min,max){var n=Number(value);return Number.isFinite(n)?Math.max(min,Math.min(max,n)):fallback}
  function load(){try{var old=readSave(),next=Object.assign(fresh(),old);
    ['trafficLevel','pickupLevel','readyLevel','curingLevel','durationLevel','kioskSpeedLevel','onlineBonusLevel','comfortLevel','scannerLevel'].forEach(function(key){next[key]=Math.floor(finite(old[key],0,0,key==='pickupLevel'?4:8))});
    next.idStaff=Math.floor(finite(old.idStaff,0,0,10000));
    next.strains=STRAINS.map(function(_,i){return Math.floor(finite(old.strains&&old.strains[i],i===0?1:0,i===0?1:0,10))});
    next.activeStrain=Math.floor(finite(old.activeStrain,0,0,STRAINS.length-1));if(!next.strains[next.activeStrain])next.activeStrain=0;
    next.menuStrains=STRAINS.map(function(_,i){return i}).filter(function(i){return next.strains[i]>0&&(!Array.isArray(old.menuStrains)||old.menuStrains.indexOf(i)>=0)});if(!next.menuStrains.length)next.menuStrains=[0];
    next.money=finite(old.money,30,0,Number.MAX_SAFE_INTEGER);
    next.lifetime=finite(old.lifetime,0,0,Number.MAX_SAFE_INTEGER);
    next.sold=Math.floor(finite(old.sold,0,0,Number.MAX_SAFE_INTEGER));
    next.onlineCompleted=Math.floor(finite(old.onlineCompleted,0,0,Number.MAX_SAFE_INTEGER));next.onlineRequests=finite(old.onlineRequests,0,0,40);next.hints={web:!!(old.hints&&old.hints.web),storage:!!(old.hints&&old.hints.storage),queue:!!(old.hints&&old.hints.queue)};
    next.contract=Math.floor(finite(old.contract,0,0,21));next.productMenu=migrateMenu(old.productMenu);next.sound=old.sound===true;next.lightMode=['day','night'].includes(old.lightMode)?old.lightMode:null;next.autoDrone=migrateAutoDrone(old.autoDrone);
    next.globalLevel=Math.floor(finite(old.globalLevel,0,0,500));
    next.multiplier=Math.pow(1.25,next.globalLevel);
    next.lastSeen=finite(old.lastSeen,Date.now(),0,Date.now());next.lines=LINES.map(function(_,i){return Math.floor(finite(old.lines&&old.lines[i],1,1,10000))});next.storageLevel=Math.min(20,Math.max(0,Math.floor(Number(old.storageLevel)||0)));next.stock=Array.from({length:5},function(_,i){return Math.floor(finite(old.stock&&old.stock[i],0,0,i===4?100+next.readyLevel*50:100+next.storageLevel*100))});next.staff=LINES.map(function(_,i){return Math.floor(finite(old.staff&&old.staff[i],0,0,10000))});next.kiosk=old.kiosk===true;next.secondKiosk=next.kiosk&&old.secondKiosk===true;next.thirdKiosk=next.secondKiosk&&old.thirdKiosk===true;next.queueLevel=Math.min(7,Math.max(0,Math.floor(Number(old.queueLevel)||0)));next.theme='dispensary';next.gameSpeed=[0,1,2,4].indexOf(old.gameSpeed)>=0?old.gameSpeed:1;return next}catch(e){return fresh()}}
  var firstRun=false;try{firstRun=!localStorage.getItem('shift-save')}catch(e){}
  var securitySelected=false;
  var state=load(),selected=0,toastTimer,dispatchSummary=null;
  state.empire=migrateProgression(state.empire);state.empire.activeStore=selectedStore(state.empire);
  // One-time kiosk preview grant for an existing local game; never deduct cash.
  try{if(localStorage.getItem('shift-save')&&!localStorage.getItem('shift-kiosk-preview-granted')){
    state.kiosk=true;localStorage.setItem('shift-kiosk-preview-granted','1');
  }}catch(e){}
  function visualLight(){return state.lightMode?{night:state.lightMode==='night',darkness:state.lightMode==='night'?.34:0}:atmosphere(state.empire.network)}
  var lightToggle=document.createElement('button');lightToggle.id='lightToggle';lightToggle.type='button';lightToggle.onclick=function(){state.lightMode=visualLight().darkness>.15?'day':'night';save();renderUI()};document.querySelector('.speed-controls').appendChild(lightToggle);
  var speedButtons=Array.prototype.slice.call(document.querySelectorAll('[data-speed]'));
  function setGameSpeed(value){if([0,1,2,4].indexOf(value)<0)return;state.gameSpeed=value;renderUI();save();notify(value===0?'GAME PAUSED':'GAME SPEED · '+value+'×')}
  speedButtons.forEach(function(button){button.onclick=function(){setGameSpeed(Number(button.getAttribute('data-speed')))}});
  var tickTime=performance.now(),tickRemainder=0;
  function tick(){var now=performance.now(),seconds=(now-tickTime)/1000;tickTime=now;if(document.hidden){tickRemainder=0;return}var elapsed=elapsedSteps(seconds+tickRemainder,state.gameSpeed);if(elapsed.offline){tickRemainder=0;collectOffline(elapsed.offline)}else{tickRemainder=Math.max(0,seconds+tickRemainder-Math.floor((seconds+tickRemainder+1e-8)/.05)*.05);for(var step=0;step<elapsed.steps;step++)simulate(.05)}}
  var saveFailed=false;
  function save(){
    state.lastSeen=Date.now();
    try{
      var previous=localStorage.getItem('shift-save');
      if(previous){try{var parsed=JSON.parse(previous);if(parsed&&typeof parsed==='object'&&!Array.isArray(parsed))localStorage.setItem('shift-save-backup',previous)}catch(e){}}
      localStorage.setItem('shift-save',JSON.stringify(state));saveFailed=false;return true;
    }catch(e){if(!saveFailed)notify('SAVE UNAVAILABLE · keep this window open to retain progress');saveFailed=true;return false}
  }
  function offlineReward(seconds){return state.gameSpeed===0?0:(Math.min(production(),flowerValue()/arrivalInterval())+branchRate(state.empire))*Math.min(14400,Math.max(0,seconds))}
  function collectOffline(elapsed){
    var away=elapsed===undefined?Math.max(0,(Date.now()-state.lastSeen)/1000):elapsed;
    var seconds=Math.min(14400,away);if(state.gameSpeed!==0)accrueOnlineRequests(seconds);
    var rates=[Math.min(production(),flowerValue()/arrivalInterval())].concat(STORES.map(function(_,i){return storeRate(state.empire,i)}));
    var earnings=rates.map(function(rate){return state.gameSpeed===0?0:rate*seconds});
    var reward=earnings.reduce(function(a,b){return a+b},0);
    if(reward>=1)add(reward);
    if(seconds>=60)state.empire.returnReport={seconds:away,earnings:earnings,goals:[0,1,2].filter(function(i){var g=goalStatus(state.empire,i);return g.progress>=g.target}).length};
    save();return reward>=1?reward:0;
  }

  function menuStrains(){return state.menuStrains.filter(function(i){return state.strains[i]>0})}
  function menuChoice(sequence){var menu=menuStrains();return menu[sequence%menu.length]}
  function format(){return FORMATS[state.productMenu.active]}
  var playSound=makeSound();
  function flowerValue(index){if(index===undefined){var menu=menuStrains();return menu.reduce(function(total,i){return total+flowerValue(i)},0)/menu.length}var i=index;return Math.round(STRAINS[i].price*(1+Math.max(0,state.strains[i]-1)*.1)*saleMultiplier(state.empire)*format().value)}
  function onlineValue(sequence){return Math.round(flowerValue(menuChoice(sequence===undefined?state.onlineCompleted:sequence))*4/3*(1+state.onlineBonusLevel*.05))}
  function strainCost(i){return state.strains[i]?Math.round(Math.max(250,STRAINS[i].unlock*.35)*Math.pow(1.85,state.strains[i]-1)):STRAINS[i].unlock}
  function buyStrain(i){
    if(i<0||i>=STRAINS.length||state.strains[i]>=10||state.money<strainCost(i))return;
    var unlocking=!state.strains[i];state.money-=strainCost(i);state.strains[i]++;if(unlocking)state.menuStrains.push(i);
    notify(STRAINS[i].name.toUpperCase()+(unlocking?' UNLOCKED':' · LEVEL '+state.strains[i]),'upgrade');save();renderUI();
  }
  function selectStrain(i){
    if(!state.strains[i])return;
    var index=state.menuStrains.indexOf(i);
    if(index>=0){if(state.menuStrains.length===1)return;state.menuStrains.splice(index,1)}else state.menuStrains.push(i);
    save();renderUI();notify(STRAINS[i].name.toUpperCase()+(index>=0?' · REMOVED FROM MENU':' · ADDED TO MENU'));
  }
  function renderFlowers(){
    FORMATS.forEach(function(f,i){var b=$('format'+i);if(!b)return;b.setAttribute('aria-pressed',String(state.productMenu.active===i));b.disabled=!state.productMenu.unlocked[i]&&state.money<f.cost;b.querySelector('small').textContent=state.productMenu.unlocked[i]?(state.productMenu.active===i?'Featured':'Feature'):fmt(f.cost)});
    if($('formatBenefit')){var f=format();$('formatBenefit').textContent=[['Standard value','Steady demand'],['+45% value','Faster pickup','Slower packing'],['+120% value','Lower demand','Slower packing']][state.productMenu.active].join(' · ');$('formatBenefit').title=f.detail;}
    if($('prestigeStart')){var offer=prestigeOffer(state);$('prestigeStart').disabled=!offer.eligible;$('prestigeStatus').textContent='Rank '+offer.rank+' · '+(1+offer.rank*.2).toFixed(1)+'× base sales';$('prestigeStart').textContent=offer.rank>=19?'Maximum prestige':'Reopen · '+fmt(offer.target);$('soundToggle').textContent=state.sound?'Sound on':'Sound off';$('soundToggle').setAttribute('aria-pressed',String(state.sound));}

    $('flowerSummary').textContent=menuStrains().length+(menuStrains().length===1?' strain · ':' strains · ')+fmt(flowerValue())+'/pickup';
    STRAINS.forEach(function(strain,i){
      var level=state.strains[i],active=state.menuStrains.indexOf(i)>=0,price=strainCost(i);
      $('flowerLevel'+i).textContent=level?'Level '+level+' / 10':'Not unlocked';
      $('flowerValue'+i).textContent=fmt(flowerValue(i))+' / pickup · '+(i*9+Math.max(0,level-1)*3)+' potency'+(level&&level<10?' → '+fmt(Math.round(strain.price*(1+level*.1))):'');
      $('flowerBuy'+i).disabled=level>=10||state.money<price;
      $('flowerBuy'+i).textContent=level>=10?'Fully upgraded':(level?'Upgrade ':'Unlock ')+fmt(price);
      $('flowerSelect'+i).hidden=!level;$('flowerSelect'+i).disabled=active&&state.menuStrains.length===1;
      $('flowerSelect'+i).textContent=active?'On menu ✓':'Add to menu';$('flowerSelect'+i).setAttribute('aria-pressed',String(active));$('flowerSelect'+i).setAttribute('aria-label',(active?'Remove ':'Add ')+strain.name+(active?' from menu':' to menu'));$('flowerSelect'+i).title=active&&state.menuStrains.length===1?'Keep at least one strain on the menu':active?'Remove from menu':'Add to menu';$('flowerBuy'+i).setAttribute('aria-label',(level?'Upgrade ':'Unlock ')+strain.name+' · '+fmt(price));
      $('flowerCard'+i).classList.toggle('is-active',active);
    });
  }
  function fmt(n){if(n<1000)return '$'+Math.floor(n).toLocaleString();var units=[['T',1e12],['B',1e9],['M',1e6],['K',1e3]];for(var i=0;i<units.length;i++)if(n>=units[i][1])return '$'+(n/units[i][1]).toFixed(n/units[i][1]>=100?0:n/units[i][1]>=10?1:2)+units[i][0]}
  function capacity(i){return state.lines[i]>0?(1+(state.lines[i]-1)*.4)*(1+state.staff[i]*.3)*state.multiplier:0}
  var STATION_TIERS=['Starter','Established','Advanced','Premium','Signature','Elite','Flagship'];
  var TIER_COLORS=['#b4c5a0','#92d5a4','#8ad6d9','#efd18c','#afbfdb','#c5a7cd','#f2e6bf'];
  var TIER_LEVELS=[1,10,20,30,50,75,100];
  function stationTier(i){var tier=0;for(var n=1;n<TIER_LEVELS.length;n++)if(state.lines[i]>=TIER_LEVELS[n])tier=n;return tier}
  function nextCapacity(i){return (1+state.lines[i]*.4)*(1+state.staff[i]*.3)*state.multiplier}
  function isOpen(i){return i===0||state.lines[i-1]>0}
  function stationThroughput(i){
    if(!state.lines[i])return 0;
    if(i<4)return capacity(i)/[2,3,2,2][i]/(i===3?format().packing:1);
    var service=1/counterServiceDuration(i);
    return i===4?Math.min(capacity(i)/2,service+kioskCount()/kioskServiceDuration()):service;
  }
  function production(){return Math.min.apply(null,LINES.map(function(_,i){return stationThroughput(i)}))*flowerValue()}
  function batchSize(i){return 1+(state.lines[i]-1)*.4}
  function cycleSpeed(i){return (1+state.staff[i]*.3)*state.multiplier/(i===3?format().packing:1)}
  var batchRemainder=[0,0,0,0];
  var readyWork=0;
  var work=[0,0,0,0,0,0],customers=[],arrival=0,customerId=0,pickupQueueSequence=0;
  function queueLimit(){return Math.min(20,Math.min(12,6+Math.floor(Math.max(0,state.lines[4]-1)/2)+Math.floor(state.staff[4]/2))+state.queueLevel*2)}
  function counterServiceDuration(i,serviceCapacity){
    // Both equipment and training shorten the handoff, with gentler gains at high levels.
    var rate=serviceCapacity===undefined?capacity(i):serviceCapacity;
    return (1.4+Math.max(1.2/Math.pow(rate,.15),[2,3][i-4]/rate))*(i===5?format().service:1);
  }
  function advanceCounterService(c,i,dt){
    if(c.serviceStation!==i){c.serviceStation=i;c.serviceElapsed=0}
    c.serviceElapsed+=dt;
    work[i]=Math.min(1,c.serviceElapsed/counterServiceDuration(i));
    return work[i]>=1;
  }
  function simulate(dt){
    accrueOnlineRequests(dt);
    add(branchRate(state.empire)*dt);tickBranches(state.empire,dt);var operationResult=tickOperations(state,dt);if(operationResult.revenue)add(operationResult.revenue);if(operationResult.deliveries){state.onlineCompleted+=operationResult.deliveries;recordEvent(state.empire,'online',operationResult.deliveries)}
    arrival+=dt;
    if(arrival>=arrivalInterval()&&customers.filter(function(c){return !c.ordered&&c.phase!=='leaving'}).length<queueLimit()){
      var activeEvent=eventStatus(state.empire);var eventGuest=activeEvent.joined&&activeEvent.open&&!activeEvent.claimed&&customerId%4===3;
      arrival=0;customers.push({eventGuest:eventGuest,kind:eventGuest||atmosphere(state.empire.network).night&&state.empire.reputation>=20&&customerId%2===0?'collector':customerType(state.empire.reputation,customerId),id:customerId++,phase:'entering',idChecked:false,idCheckTime:0,kiosk:state.kiosk&&customerId%2===0&&customers.filter(function(c){return c.kiosk&&!c.ordered}).length<kioskCount()+4,kioskIndex:chooseKiosk(),t:0,bag:false,ordered:false,x:-12.4,z:-10});
    }
    customers.forEach(function(c){moveQueuedCustomer(c,dt);if(!c.walking&&c.phase!=='leaving')c.waitSeconds=(c.waitSeconds||0)+dt;if(c.bag)c.effectAge=(c.effectAge||0)+dt});
    customers=customers.filter(function(c){return c.phase!=='leaving'||c.t<1});
    if(state.lines[5]){
      var pickups=customers.filter(function(c){return c.ordered&&!c.bag}).sort(function(a,b){return (a.pickupTicket||a.id)-(b.pickupTicket||b.id)}).slice(0,1).filter(function(c){return c.phase==='pickup'&&!c.walking&&Math.hypot(c.x-4,c.z-6.4)<.01});
      if(pickups.length&&state.stock[4]>0){var served=advanceCounterService(pickups[0],5,dt)?1:0;if(served>0){work[5]=0;state.stock[4]-=served;state.sold+=served;playSound('sale',state.sound);recordEvent(state.empire,'pickup',served);add(pickups.slice(0,served).reduce(function(total,c){return total+(c.salePrice||flowerValue())*satisfyCustomer(state.empire,-1,c.kind,c.strain===0?'everyday':'boutique',c.waitSeconds||0)*(c.eventGuest&&c.strain>0?1.25:1)},0));pickups.slice(0,served).forEach(function(c){c.phase='leaving';c.t=0;c.bag=true;c.effectAge=0;recentPickupRatings.push(customerRatings(c).highness);if(recentPickupRatings.length>20)recentPickupRatings.shift()});burst(machinePos[5],colors.acid)}}else work[5]=0;
    }
    // Prepare pickup bags independently of the number of customers collecting.
    if(state.lines[4]&&state.stock[3]>0&&state.stock[4]<readyCapacity()){
      readyWork+=dt*capacity(4)/2;
      var bags=Math.min(Math.floor(readyWork),state.stock[3],readyCapacity()-state.stock[4]);
      if(bags>0){readyWork-=bags;state.stock[3]-=bags;state.stock[4]+=bags}
    }else readyWork=Math.min(readyWork,.9);
    if(state.lines[4]){
      var queue=customers.filter(function(c){return !c.kiosk&&!c.ordered&&c.phase!=='leaving'}).slice(0,1).filter(function(c){return c.phase==='ordering'&&!c.walking&&Math.hypot(c.x+4,c.z-6.4)<.01});
      var reserved=customers.filter(function(c){return c.ordered&&!c.bag}).length,available=Math.max(0,state.stock[4]-reserved);
      if(queue.length&&reserved<pickupLimit()&&available>0){
        var count=advanceCounterService(queue[0],4,dt)?1:0;
        for(var j=0;j<count;j++){available--;queue[j].strain=menuChoice(queue[j].id);queue[j].salePrice=flowerValue(queue[j].strain);queue[j].ordered=true;queue[j].pickupTicket=++pickupQueueSequence;queue[j].phase='toPickup';queue[j].t=0}if(count)work[4]=0;
      }else work[4]=0;
    }
    if(state.kiosk)for(var kioskIndex=0;kioskIndex<kioskCount();kioskIndex++){
      var kioskX=-8.95,kioskZ=6.8-kioskIndex*1.8;
      var kioskCustomer=customers.find(function(c){return c.kiosk&&(c.kioskIndex||0)===kioskIndex&&!c.ordered&&c.phase==='kiosk'&&Math.hypot(c.x-kioskX,c.z-kioskZ)<.15});
      var kioskReserved=customers.filter(function(c){return c.ordered&&!c.bag}).length;
      if(kioskCustomer&&kioskReserved<pickupLimit()&&state.stock[4]>kioskReserved){
        kioskCustomer.orderTime=(kioskCustomer.orderTime||0)+dt;
        if(kioskCustomer.orderTime>=kioskServiceDuration()){kioskCustomer.strain=menuChoice(kioskCustomer.id);kioskCustomer.salePrice=flowerValue(kioskCustomer.strain);kioskCustomer.ordered=true;kioskCustomer.pickupTicket=++pickupQueueSequence;kioskCustomer.phase='toPickup'}
      }
    }
    for(var i=3;i>=0;i--){
      if(!state.lines[i])continue;
      if((i>0&&state.stock[i-1]<1)||state.stock[i]>=storageCapacity()){work[i]=Math.min(work[i],.9);continue}
      // Equipment determines batch yield; employees determine cycle duration.
      work[i]+=dt*cycleSpeed(i)/[2,3,2,2][i];
      var cycles=Math.floor(work[i]);
      if(cycles>0){
        work[i]-=cycles;
        var yieldTotal=cycles*batchSize(i)+batchRemainder[i];
        var whole=Math.floor(yieldTotal+1e-9);
        batchRemainder[i]=Math.max(0,yieldTotal-whole);
        var amount=Math.min(whole,i===0?storageCapacity():state.stock[i-1],storageCapacity()-state.stock[i]);
        if(i>0)state.stock[i-1]-=amount;state.stock[i]+=amount;
      }
    }
    if(autoDroneReady(state.autoDrone,dt,state.lines[4]>0&&state.stock[3]>=onlineSize()&&onlineRequestsReady()>0))sendOnlineOrders(autoDroneLimit(state.autoDrone),true);
  }
  function staffCost(i){return Math.floor(20*Math.pow(1.6,state.staff[i]))}
  function idTrainingQuote(limit){
    var levels=0,total=0;
    while(levels<limit&&state.idStaff+levels<10000){
      var price=Math.floor(20*Math.pow(1.6,state.idStaff+levels));
      if(!Number.isFinite(price)||total+price>state.money)break;
      total+=price;levels++;
    }
    return {levels:levels,cost:total};
  }
  function trainIdChecker(limit){
    var quote=idTrainingQuote(limit);if(!quote.levels)return;
    state.money-=quote.cost;state.idStaff+=quote.levels;
    notify('SECURITY · LEVEL '+state.idStaff,'upgrade');renderUI();save();
  }
  function maxStaffTraining(i){
    var levels=0,total=0;if(!state.lines[i])return {levels:0,cost:0};
    while(state.staff[i]+levels<10000){
      var price=Math.floor(20*Math.pow(1.6,state.staff[i]+levels));
      if(!Number.isFinite(price)||total+price>state.money)break;
      total+=price;levels++;
    }
    return {levels:levels,cost:total};
  }
  function trainStaffMax(i){
    var batch=maxStaffTraining(i);if(!batch.levels)return;
    state.money-=batch.cost;state.staff[i]+=batch.levels;
    burst(machinePos[i],'#b6e58c');notify(LINES[i].name+' EMPLOYEE · +'+batch.levels+' LEVEL'+(batch.levels===1?'':'S'),'upgrade');renderUI();save();
  }
  function upgradeStaff(i){if(!state.lines[i])return;var price=staffCost(i);if(state.money<price)return;state.money-=price;state.staff[i]++;burst(machinePos[i],'#b6e58c');notify('EMPLOYEE LEVEL '+state.staff[i]+' · +30% BASE SPEED','upgrade');renderUI();save()}
  function buyKiosk(){if(state.kiosk||state.money<25000)return;state.money-=25000;state.kiosk=true;save();renderUI();notify('SELF-ORDER KIOSK OPEN · customers can use kiosk or counter','upgrade')}
  function kioskCount(){return state.kiosk?(state.thirdKiosk?3:state.secondKiosk?2:1):0}
  function chooseKiosk(){
    var counts=Array(kioskCount()||1).fill(0);
    customers.forEach(function(c){if(c.kiosk&&!c.ordered&&c.phase!=='leaving')counts[c.kioskIndex||0]++});
    return counts.indexOf(Math.min.apply(null,counts));
  }
  function buyThirdKiosk(){if(!state.secondKiosk||state.thirdKiosk||state.money<100000)return;state.money-=100000;state.thirdKiosk=true;save();renderUI();notify('THIRD KIOSK OPEN','upgrade')}
  function buySecondKiosk(){if(!state.kiosk||state.secondKiosk||state.money<50000)return;state.money-=50000;state.secondKiosk=true;save();renderUI();notify('SECOND KIOSK OPEN','upgrade')}
  function kioskRoute(index){var z=6.8-(index||0)*1.8;return [{x:-8.95,z:z},{x:-8.45,z:z},{x:-8.45,z:9.65},{x:-10.5,z:9.65},{x:-11.7,z:9.3},{x:-12.4,z:7.8}]}
  var COMPONENTS=[{key:'trafficLevel',name:'Customer traffic',base:750,max:8},{key:'pickupLevel',name:'Pickup waiting area',base:1200,max:4},{key:'readyLevel',name:'Ready-bag storage',base:600,max:8},{key:'curingLevel',name:'Curing equipment',base:1800,max:8},{key:'durationLevel',name:'Lasting effects',base:2400,max:8},{key:'kioskSpeedLevel',name:'Kiosk software',base:3000,max:8},{key:'onlineBonusLevel',name:'Premium packaging',base:2200,max:8},{key:'comfortLevel',name:'Queue comfort',base:1400,max:8},{key:'scannerLevel',name:'ID scanner',base:1600,max:8}];
  function kioskServiceDuration(){return .8+1.2/(1+state.kioskSpeedLevel*.15)}
  function securityDuration(){return .9/((1+state.idStaff*.3)*(1+state.scannerLevel*.12))}
  function arrivalInterval(){return (atmosphere(state.empire.network).night?1.2:.9)/(1+state.trafficLevel*.15)/format().demand}
  function pickupLimit(){return 4+state.pickupLevel*2}
  function readyCapacity(){return 100+state.readyLevel*50}
  function componentCost(i){return Math.round(COMPONENTS[i].base*Math.pow(1.8,state[COMPONENTS[i].key]))}
  function upgradeComponent(i){var c=COMPONENTS[i],price=componentCost(i);if(state[c.key]>=c.max||state.money<price)return;state.money-=price;state[c.key]++;save();renderUI();notify(c.name.toUpperCase()+' · LEVEL '+state[c.key],'upgrade')}
  function renderComponents(){COMPONENTS.forEach(function(c,i){var level=state[c.key],max=level>=c.max;var benefits=[Math.round(60/arrivalInterval())+' → '+Math.round(60/(.9/(1+(level+1)*.15)))+' arrivals / min',pickupLimit()+' → '+(pickupLimit()+2)+' picking up',readyCapacity()+' → '+(readyCapacity()+50)+' ready bags','+'+(level*4)+' → +'+((level+1)*4)+' highness points',Math.round((1+level*.3)*100)+'% → '+Math.round((1+(level+1)*.3)*100)+' effect duration','+'+(level*15)+'% → +'+((level+1)*15)+'% kiosk speed','+'+(level*5)+'% → +'+((level+1)*5)+'% online value',Math.round(100/(1+level*.2))+'% → '+Math.round(100/(1+(level+1)*.2))+'% wait penalty','+'+(level*12)+'% → +'+((level+1)*12)+'% check speed'];$('componentBenefit'+i).textContent=max?['More frequent arrivals',pickupLimit()+' picking up',readyCapacity()+' ready bags','+32 highness points','340% effect duration','+120% kiosk speed','+40% online value','38% wait penalty','+96% check speed'][i]:benefits[i];$('componentLevel'+i).textContent='Level '+level+' / '+c.max+(max?' · Maximum':state.money<componentCost(i)?' · '+fmt(componentCost(i)-state.money)+' to go':'');$('componentPrice'+i).textContent=max?'MAX':fmt(componentCost(i));$('componentBuy'+i).disabled=max||state.money<componentCost(i)});if(shopBrowser)shopBrowser.render()}
  function queueCost(){return Math.round(150*Math.pow(1.8,state.queueLevel))}
  function upgradeQueue(){if(queueLimit()>=20||state.money<queueCost())return;state.money-=queueCost();state.queueLevel++;save();renderUI();notify('LINE EXPANDED · '+queueLimit()+' customers','upgrade')}
  function storageCapacity(){return 100+state.storageLevel*100}
  function storageCost(){return Math.round(250*Math.pow(1.7,state.storageLevel))}
  function upgradeStorage(){if(state.storageLevel>=20||state.money<storageCost())return;state.money-=storageCost();state.storageLevel++;save();renderUI();notify('STORAGE EXPANDED · '+storageCapacity()+' per stage','upgrade')}
  function onlineSize(){return 4+(state.onlineCompleted%5)*3}
  // Web requests arrive slowly at first and speed up with completed orders; the maths lives in deliveries.js.
  function onlineRequestCap(){return requestCap(state.onlineCompleted)}
  function accrueOnlineRequests(seconds){accrueRequests(state,seconds)}
  function onlineRequestsReady(){return requestsReady(state)}
  function onlineBatch(limit,jarBudget){
    var jars=jarBudget===undefined?state.stock[3]:jarBudget,count=0,used=0,reward=0;limit=Math.min(limit,onlineRequestsReady());
    if(state.lines[4])while(count<limit){var need=4+((state.onlineCompleted+count)%5)*3;if(jars<need)break;jars-=need;used+=need;reward+=need*onlineValue(state.onlineCompleted+count);count++}
    return {count:count,jars:used,reward:reward};
  }
  function sendOnlineOrders(limit,automatic){
    var batch=onlineBatch(limit);if(!batch.count)return;
    state.stock[3]-=batch.jars;state.onlineCompleted+=batch.count;consumeRequests(state,batch.count);
    queueDeliveryWave(batch.count);
    recordEvent(state.empire,'online',batch.count);add(batch.reward);if(!automatic)notifyDispatch(batch);burst({x:-10.7,z:1.5,y:7.05},'#dbc38b');renderUI();save();
  }
  // Rapid dispatches share a short loading window, never a growing launch queue.
  function queueDeliveryWave(count){
    var wave=deliveryDrones.filter(function(drone){return drone.age<.45});
    var age=wave.length?wave[0].age:0;
    for(var n=0;n<count;n++){
      if(wave.length<5){
        var drone={age:age,delay:0,slot:wave.length,orders:1};
        wave.push(drone);deliveryDrones.push(drone);
      }else{
        var carrier=wave.reduce(function(a,b){return a.orders<=b.orders?a:b});carrier.orders++;
      }
    }
  }
  function fulfillOnline(){sendOnlineOrders(1)}

  function cost(i){return Math.floor(LINES[i].base*Math.pow(1.16,state.lines[i]))}
  function maxStationUpgrade(i){
    var levels=0,total=0,level=state.lines[i];
    if(!isOpen(i))return {levels:0,cost:0};
    while(level+levels<10000){
      var price=Math.floor(LINES[i].base*Math.pow(1.16,level+levels));
      if(!Number.isFinite(price)||total+price>state.money)break;
      total+=price;levels++;
    }
    return {levels:levels,cost:total};
  }
  function buySelectedMax(){
    if(securitySelected)return trainIdChecker(10000);
    var batch=maxStationUpgrade(selected);if(!batch.levels)return;
    var oldTier=stationTier(selected);state.money-=batch.cost;state.lines[selected]+=batch.levels;if(stationTier(selected)>oldTier)tierFlashes[selected]=1;
    paintThumbnails();burst(machinePos[selected]);
    notify(LINES[selected].name+' · +'+batch.levels+' LEVEL'+(batch.levels===1?'':'S')+' · LEVEL '+state.lines[selected],'upgrade');
    renderUI();save();if(navigator.vibrate)navigator.vibrate(18);
  }
  function add(n){state.money+=n;state.lifetime+=n;recordGoal(state.empire,'revenue',n)}
  function notifyDispatch(batch){
    var now=performance.now();
    if(!dispatchSummary||now-dispatchSummary.lastClick>=1600)dispatchSummary={count:0,reward:0,lastClick:now};
    dispatchSummary.count+=batch.count;dispatchSummary.reward+=batch.reward;dispatchSummary.lastClick=now;
    notify(dispatchSummary.count+' ONLINE ORDER'+(dispatchSummary.count===1?'':'S')+' SENT · '+fmt(dispatchSummary.reward),'dispatch');
  }
  function notify(message,kind){if(kind==='upgrade')playSound('upgrade',state.sound);if(kind!=='dispatch')dispatchSummary=null;$('toast').classList.toggle('is-upgrade',kind==='upgrade');$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(function(){$('toast').classList.remove('show')},1600)}

  var world=$('world'),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d',{alpha:false});
  if(!ctx){$('loadStatus').textContent='CANVAS COULD NOT START';$('loadRetry').hidden=false;return}
  world.insertBefore(canvas,world.firstChild);canvas.setAttribute('aria-hidden','true');
  var dpr=1,width=1,height=1,angle=.57,zoom=1,panX=0,panY=0,centerX=0,centerY=0,unit=32;
  var colors={bg:'#202226',floorTop:'#303238',floorLeft:'#1c1f23',floorRight:'#272a30',grid:'#41444a',beltEdge:'#111419',belt:'#313943',slat:'#5b6470',oliveTop:'#f4f5ec',oliveLeft:'#a9b6be',oliveRight:'#d5dce0',darkTop:'#56616a',darkLeft:'#252e36',darkRight:'#3b4650',metalTop:'#eef2f3',metalLeft:'#8b9ba8',metalRight:'#becbd4',acid:'#f5c344',orange:'#ff7628',boxTop:'#d3a36c',boxLeft:'#8e6741',boxRight:'#b17f50'};
  var machinePos=[{x:-3,z:-3,y:9.4},{x:3,z:-3,y:9.4},{x:3,z:1,y:4.7},{x:-3,z:1,y:4.7},{x:-4,z:4,y:0},{x:4,z:4,y:0}];
  var sceneElevation=0;
  var beltNodes=[[-5,-3.2],[0,-3.2],[5,-3.2],[5.4,0],[5,3.2],[0,3.2],[-5,3.2],[-5.4,0]];
  var tierFlashes=[0,0,0,0,0,0],crateTime=0,particles=[],deliveryDrones=[],sceneTime=0,animationTime=0;
  var motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');

  function resize(){var rect=world.getBoundingClientRect();dpr=Math.min(window.devicePixelRatio||1,2);width=Math.max(1,Math.round(rect.width));height=Math.max(1,Math.round(rect.height));canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);canvas.style.width=width+'px';canvas.style.height=height+'px';ctx.setTransform(dpr,0,0,dpr,0,0);applyCamera()}
  function cameraFrame(){
    if(state.empire.activeStore){var right=width>=780?450:0,low=25,top=document.querySelector('.hud').getBoundingClientRect().bottom+82,space=Math.max(130,height-top-low),area=Math.max(260,width-right);return{x:area*.5,y:top+space*.61,unit:Math.min((area-35)/38,space/25)}}
    var bottom=0,top=Math.min(160,height*.26),space=Math.max(120,height-top-bottom);return{x:width*.5,y:top+space*.65,unit:Math.min((width-40)/33,space/28)}}
  function applyCamera(){var frame=cameraFrame();panX=Math.max(-width*1.6,Math.min(width*1.6,panX));panY=Math.max(-height*1.6,Math.min(height*1.6,panY));centerX=frame.x+panX;centerY=frame.y+panY;unit=frame.unit*zoom;if(state.empire.activeStore)updateBranchMarker()}
  function zoomAt(next,x,y){next=Math.max(.65,Math.min(4,next));var ratio=next/zoom,frame=cameraFrame();panX=x-(x-centerX)*ratio-frame.x;panY=y-(y-centerY)*ratio-frame.y;zoom=next;applyCamera()}
  function rotate(x,z){var c=Math.cos(angle),s=Math.sin(angle);return{x:x*c-z*s,z:x*s+z*c}}
  function project(x,y,z){var r=rotate(x,z);return{x:centerX+r.x*unit,y:centerY+r.z*unit*.5-(y+sceneElevation)*unit,depth:r.z}}
  function poly(points,fill,stroke){ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);for(var i=1;i<points.length;i++)ctx.lineTo(points[i].x,points[i].y);ctx.closePath();if(typeof fill==='string'&&/^#[0-9a-f]{6}$/i.test(fill)){
      var ys=points.map(function(p){return p.y}),lo=Math.min.apply(null,ys),hi=Math.max.apply(null,ys),shade=ctx.createLinearGradient(0,lo,0,Math.max(lo+1,hi));
      shade.addColorStop(0,fill);shade.addColorStop(1,shadeColor(fill,.9));ctx.fillStyle=shade;
    }else ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=Math.max(.4,Math.min(1,unit*.021));ctx.lineJoin='round';ctx.stroke()}}
  function drawBox(x,z,y,w,d,h,palette){var p=palette||[colors.oliveTop,colors.oliveLeft,colors.oliveRight],b0=project(x-w/2,y,z-d/2),b1=project(x+w/2,y,z-d/2),b2=project(x+w/2,y,z+d/2),b3=project(x-w/2,y,z+d/2),t0=project(x-w/2,y+h,z-d/2),t1=project(x+w/2,y+h,z-d/2),t2=project(x+w/2,y+h,z+d/2),t3=project(x-w/2,y+h,z+d/2);poly(Math.cos(angle)>=0?[b3,b2,t2,t3]:[b0,b1,t1,t0],p[1],w<.1||d<.04?null:'#ffffff28');poly(Math.sin(angle)>=0?[b2,b1,t1,t2]:[b3,b0,t0,t3],p[2],w<.1||d<.04?null:'#ffffff28');poly([t0,t1,t2,t3],p[0],w<.1||d<.04?null:'#ffffff28')}
  // Ambient shadow: a soft band on a floor plane, dark along one edge and fading away from it.
  function shadowBand(x0,x1,zNear,zFar,y,alpha){var a=project((x0+x1)/2,y,zNear),b=project((x0+x1)/2,y,zFar),g=ctx.createLinearGradient(a.x,a.y,b.x,b.y);g.addColorStop(0,'rgba(14,28,20,'+alpha+')');g.addColorStop(1,'rgba(14,28,20,0)');poly([project(x0,y,zNear),project(x1,y,zNear),project(x1,y,zFar),project(x0,y,zFar)],g)}
  function shadowBandX(z0,z1,xNear,xFar,y,alpha){var a=project(xNear,y,(z0+z1)/2),b=project(xFar,y,(z0+z1)/2),g=ctx.createLinearGradient(a.x,a.y,b.x,b.y);g.addColorStop(0,'rgba(14,28,20,'+alpha+')');g.addColorStop(1,'rgba(14,28,20,0)');poly([project(xNear,y,z0),project(xNear,y,z1),project(xFar,y,z1),project(xFar,y,z0)],g)}
  function groundPatch(x,z,w,d,fill){poly([project(x-w/2,.015,z-d/2),project(x+w/2,.015,z-d/2),project(x+w/2,.015,z+d/2),project(x-w/2,.015,z+d/2)],fill)}
  function glow(x,y,r,color){var g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'#00000000');ellipse(x,y,r,r*.6,g)}
  // Small projected light sources; layered strokes avoid expensive full-scene bloom.
  function warmStrip(points,cool){
    ctx.save();worldLine(points,'#344338',.095);
    ctx.globalAlpha=.12;worldLine(points,cool?'#d6edbe':'#ffcf83',.34);
    ctx.globalAlpha=.28;worldLine(points,cool?'#e2f3cd':'#ffe3a4',.15);
    ctx.globalAlpha=.85;worldLine(points,cool?'#e7f6d0':'#ffe8b4',.052);
    ctx.globalAlpha=1;worldLine(points,cool?'#f3fbe7':'#fff5da',.018);ctx.restore();
  }
  // Night: everything that glows is redrawn above the shade so the shop reads as lit, not dimmed.
  function nightLights(now){
    var saved=sceneElevation;sceneElevation=0;
    function tint(hex,a){var n=parseInt(hex.slice(1),16);return 'rgba('+(n>>16&255)+','+(n>>8&255)+','+(n&255)+','+a+')'}
    function pool(x,y,z,r,a,color){var p=project(x,y,z),g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,unit*r);g.addColorStop(0,tint(color,a));g.addColorStop(.55,tint(color,a*.35));g.addColorStop(1,tint(color,0));ellipse(p.x,p.y,unit*r,unit*r*.55,g)}
    function halo(x,y,z,r,a,color){var p=project(x,y,z),g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,unit*r);g.addColorStop(0,tint(color,a));g.addColorStop(1,tint(color,0));ellipse(p.x,p.y,unit*r,unit*r,g)}
    var warm='#ffd98f',cool='#cfeebb';
    // Work lights over every station; the grow room glows cool.
    machinePos.forEach(function(q,i){pool(q.x,q.y+.04,q.z+.9,2,.24,i===1?cool:warm)});
    // Shop-floor downlights, the lit entrance, and the online kiosk sign.
    [[-4,4],[4,4],[0,7.5]].forEach(function(q){pool(q[0],.03,q[1],2.2,.26,warm)});
    pool(-9.1,.04,10.41,1.7,.32,warm);halo(-9.1,2.4,10.41,.9,.35,'#ffe2a5');
    pool(-10.7,7.09,1.5,1.6,.34,cool);halo(-10.7,9.2,1.5,1.3,.45,'#bfe9d8');
    // Fascia strips glow a little stronger at night in place of any hanging bulbs.
    [[4.7,3.05,-8.8,8.8],[9.4,-.3,-6.3,6.3]].forEach(function(f){var a=project(f[2],f[0]-.06,f[1]),b=project(f[3],f[0]-.06,f[1]);var g=ctx.createLinearGradient(a.x,a.y,b.x,b.y);g.addColorStop(0,tint('#ffd98f',0));g.addColorStop(.12,tint('#ffd98f',.22));g.addColorStop(.88,tint('#ffd98f',.22));g.addColorStop(1,tint('#ffd98f',0));ctx.save();ctx.strokeStyle=g;ctx.lineWidth=unit*.42;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.restore()});
    // A warm wash behind the top-floor shelving and the mezzanine planted wall.
    var w=project(.6,11,-6.7),g=ctx.createRadialGradient(w.x,w.y,0,w.x,w.y,unit*3.4);g.addColorStop(0,tint('#ffd98f',.2));g.addColorStop(1,tint('#ffd98f',0));ellipse(w.x,w.y,unit*3.4,unit*1.2,g);
    var v=project(7.9,5.9,-6.5),gv=ctx.createRadialGradient(v.x,v.y,0,v.x,v.y,unit*1.8);gv.addColorStop(0,tint('#cfeebb',.22));gv.addColorStop(1,tint('#cfeebb',0));ellipse(v.x,v.y,unit*1.8,unit*1.4,gv);
    // Stair treads.
    for(var st=0;st<8;st++)pool(9.2,.6+st*1.15,4.6-st*.75,.55,.22,warm);
    sceneElevation=saved;
  }
  function lightPool(x,y,z,r,cool){
    var p=project(x,y,z);glow(p.x,p.y,unit*r,cool?'#d8efae30':'#ffdc9138');
  }

  function ellipse(x,y,rx,ry,fill){
    ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);
    if(typeof fill==='string'&&/^#[0-9a-f]{6}$/i.test(fill)&&rx>unit*.11){
      var g=ctx.createRadialGradient(x-rx*.3,y-ry*.4,0,x,y,Math.max(rx,ry));
      g.addColorStop(0,fill);g.addColorStop(.6,fill);g.addColorStop(1,shadeColor(fill,.79));ctx.fillStyle=g;
    }else ctx.fillStyle=fill;ctx.fill();
  }
  var shadeCache=new Map();
  function shadeColor(hex,factor){var key=hex+':'+factor;if(shadeCache.has(key))return shadeCache.get(key);var result='#'+[1,3,5].map(function(i){return Math.round(parseInt(hex.slice(i,i+2),16)*factor).toString(16).padStart(2,'0')}).join('');shadeCache.set(key,result);return result}
  function landscapeTree(x,z,size){
    var root=project(x,.06,z);ellipse(root.x+unit*.45,root.y+unit*.12,unit*size*.9,unit*size*.38,'#31544225');
    worldLine([[x,0,z],[x,2.1*size,z]],'#977550',.15);
    [[-.45,2.15,.72],[.45,2.35,.83],[0,2.85,.9]].forEach(function(c){var p=project(x+c[0]*size,c[1]*size,z);ellipse(p.x,p.y,unit*c[2]*size,unit*c[2]*size*1.08,c[0]<0?'#82b64f':c[0]>0?'#a6cf67':'#b8dc78')});
  }
  function visibleStrain(slot){var menu=menuStrains();return menu[Math.abs(slot)%menu.length]}
  function stationWorking(i){return state.lines[i]>0&&(i<4?(i===0||state.stock[i-1]>0)&&state.stock[i]<storageCapacity():work[i]>0)}
  var recentPickupRatings=[];
  var taskClocks=[0,0,0,0,0,0],taskActivity=[0,0,0,0,0,0],cropGrowth=[.15,.4,.7,.95];
  function crop(x,z,y,slot,mature){
    var strain=visibleStrain(slot),phase=motionPreference.matches?.8:(taskClocks[1]/9000+slot*.23)%1;
    // A readable representative crop cycle, independent of high-speed batch counts.
    var harvest=!mature&&phase>.86&&state.stock[1]<storageCapacity();
    var growth=mature?1:motionPreference.matches?.9:cropGrowth[slot%4];
    if(harvest){ctx.save();ctx.globalAlpha*=Math.sin((phase-.86)/.14*Math.PI);var cut=(phase-.86)/.14;for(var bud=0;bud<3;bud++)flowerBud(x+.35+bud*.12,z,y+.5+(1-cut)*.6,strain,.09);ctx.restore()}
    plant(x,z,y,.2+growth*[.95,.78,1.1,.7][strain],strain,growth);
  }
  function flowerBud(x,z,y,strain,size){
    var p=project(x,y,z),r=unit*(size||.13),color=STRAINS[strain].color;
    ellipse(p.x-r*.35,p.y+r*.1,r*.65,r*.8,shadeColor(color,.8));
    ellipse(p.x+r*.35,p.y,r*.65,r*.85,color);
    ellipse(p.x,p.y-r*.5,r*.6,r*.75,color);
    worldLine([[x-.025,y+.035,z],[x+.035,y+.1,z]],strain===1?'#f0d4a0':'#e4d3b0',.018);
  }
  function plant(x,z,y,size,strain,growth){
    var base=project(x,y,z),rim=project(x,y+.38,z),r=unit*.3;
    poly([{x:rim.x-r,y:rim.y},{x:rim.x+r,y:rim.y},{x:base.x+r*.72,y:base.y},{x:base.x-r*.72,y:base.y}],'#b67d59');
    ellipse(base.x,base.y,r*.72,r*.24,'#8b583f');ellipse(rim.x,rim.y,r*1.1,r*.48,'#e8b38a');ellipse(rim.x,rim.y,r*.84,r*.32,'#46382c');
    var sway=motionPreference.matches?0:Math.sin(sceneTime*.0013+x+z)*.045;
    var top=project(x+sway,y+.45+size,z);
    ctx.beginPath();ctx.moveTo(rim.x,rim.y);ctx.lineTo(top.x,top.y);ctx.strokeStyle='#86b96b';ctx.lineWidth=Math.max(1,unit*.045);ctx.stroke();
    for(var layer=0;layer<3;layer++){
      var cy=top.y+unit*size*(.55-layer*.3),spread=unit*size*(.52-layer*.09)*(strain===undefined?1:[1,.88,.72,1.2][strain]);
      for(var side=-1;side<=1;side+=2){
        var bx=top.x,tx=bx+side*spread,ty=cy-spread*.6;
        ctx.beginPath();ctx.moveTo(bx,cy);ctx.bezierCurveTo(bx+side*spread*.2,cy-spread*.5,tx-side*spread*.15,ty-spread*.22,tx,ty);ctx.bezierCurveTo(tx-side*spread*.1,ty+spread*.35,bx+side*spread*.55,cy+spread*.19,bx,cy);
        ctx.fillStyle=side>0?['#46935c','#69b45b','#a4cf71'][layer]:['#357c50','#4e9a57','#80b567'][layer];if(strain!==undefined)ctx.fillStyle=[['#488857','#6baa64'],['#668b4a','#9cab61'],['#456f62','#7d9273'],['#386b62','#659b87']][strain][side>0?1:0];ctx.fill();
        ctx.beginPath();ctx.moveTo(bx,cy);ctx.lineTo(tx,ty);ctx.strokeStyle='#b4da7b77';ctx.lineWidth=Math.max(.6,unit*.015);ctx.stroke();
        if(strain!==undefined&&growth>.6){flowerBud(x+side*.1,z,y+.58+size*(.6+layer*.16),strain,.07+(growth-.6)*.13)}
        else if(strain===undefined&&size>.8){var bud=project(x+side*.09,y+.58+size*(.6+layer*.16),z);ellipse(bud.x,bud.y,unit*.09,unit*.13,layer%2?'#a3bd68':'#779b4b')}
      }
    }
    var tip=project(x+sway,y+.62+size,z);ellipse(tip.x,tip.y,unit*size*.09,unit*size*.19,'#abd17a');
    if(strain===undefined&&size>=.6){
      var foot=project(x+.28,y+.05,z+.27),canopy=project(x,y+.55+size*.45,z);
      var wash=ctx.createRadialGradient(foot.x,foot.y,0,foot.x,foot.y,unit*(size+.6));wash.addColorStop(0,'#ffdc9652');wash.addColorStop(.5,'#e6e3a51d');wash.addColorStop(1,'#e6e3a500');
      poly([foot,{x:canopy.x-unit*size*.38,y:canopy.y-unit*size*.35},{x:canopy.x+unit*size*.38,y:canopy.y-unit*size*.35}],wash);
      ellipse(foot.x,foot.y,unit*.105,unit*.055,'#3c493d');ellipse(foot.x,foot.y-unit*.015,unit*.055,unit*.028,'#fff1c9');glow(foot.x,foot.y,unit*.5,'#ffe0a13d');
    }

  }
  function objectShadow(x,z,y,w,d){
    // Two soft footprint layers anchor products without a per-item blur pass.
    var p=project(x+.035,y+.003,z+.025);
    ellipse(p.x,p.y,unit*w*.57,unit*d*.3,'#1c302b0c');
    ellipse(p.x,p.y,unit*w*.45,unit*d*.22,'#1c302b18');
  }
  function jar(x,z,y,strain){
    if(strain===undefined)strain=visibleStrain(Math.round(Math.abs(x*7+z*11)));
    objectShadow(x,z,y,.52,.5);
    var base=project(x,y,z),top=project(x,y+.55,z),r=unit*.23;
    ctx.fillStyle='#88af9880';ctx.fillRect(base.x-r,top.y,r*2,base.y-top.y);
    ellipse(base.x,base.y,r,r*.45,'#60876d');
    // Visible contents and a narrower paper band let the jars read as glass.
    if(unit>=18){for(var bud=0;bud<3;bud++){var px=base.x+(bud-1)*r*.46,py=base.y-unit*(.1+bud%2*.09);ellipse(px,py,r*.38,unit*.075,shadeColor(STRAINS[strain].color,.8))}}
    ctx.fillStyle=STRAINS[strain].color;ctx.fillRect(top.x-r*.62,top.y+unit*.17,r*1.24,unit*.15);
    ctx.fillStyle='#e8f3dd70';ctx.fillRect(top.x-r*.78,top.y+unit*.065,r*.17,unit*.35);
    ellipse(top.x,top.y,r,r*.45,'#c3dfba');
    ellipse(top.x,top.y-unit*.04,r*1.08,r*.5,'#b39c6c');
    ellipse(top.x,top.y-unit*.075,r*1.06,r*.46,'#ddc893');
    if(unit>=24){ctx.strokeStyle='#f4e6bb80';ctx.lineWidth=unit*.012;ctx.beginPath();ctx.ellipse(top.x,top.y-unit*.084,r*.78,r*.29,0,Math.PI,Math.PI*2);ctx.stroke()}
  }
  function worldLine(points,color,weight){ctx.beginPath();points.forEach(function(p,i){var q=project(p[0],p[1],p[2]);if(i)ctx.lineTo(q.x,q.y);else ctx.moveTo(q.x,q.y)});ctx.strokeStyle=color;ctx.lineWidth=Math.max(.65,unit*weight);ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke()}
  function carton(x,z,y,size){
    drawBox(x,z,y,size,size*.75,size*.65,['#e5bc80','#a57c4f','#c99c65']);
    drawBox(x,z,y+size*.65,size*.16,size*.76,.018,['#f0d6a6','#c6aa77','#d7bb85']);
    drawBox(x,z+size*.38,y+size*.16,size*.38,.015,size*.23,['#f7e8c9','#ddd0b4','#eaddbd']);
    worldLine([[x-size*.1,y+size*.26,z+size*.395],[x+size*.1,y+size*.26,z+size*.395]],'#6c7657',.025);
  }
  function bagAppIcon(x,z,y,size){
    // Exact two-leaf Canopy mark, projected onto the bag's front face.
    var o=project(x-size/2,y+size,z),a=project(x+size/2,y+size,z),b=project(x-size/2,y,z);
    ctx.save();ctx.transform((a.x-o.x)/48,(a.y-o.y)/48,(b.x-o.x)/48,(b.y-o.y)/48,o.x,o.y);
    ctx.beginPath();ctx.moveTo(24,38);ctx.lineTo(24,24);ctx.strokeStyle='#dce9be';ctx.lineWidth=2.5;ctx.lineCap='round';ctx.stroke();
    ctx.beginPath();ctx.moveTo(24,31);ctx.bezierCurveTo(14,32,11,26,12,21);ctx.bezierCurveTo(20,20,25,24,24,31);ctx.closePath();ctx.fillStyle='#a8c884';ctx.fill();
    ctx.beginPath();ctx.moveTo(24,27);ctx.bezierCurveTo(23,18,28,13,36,13);ctx.bezierCurveTo(37,21,33,27,24,27);ctx.closePath();ctx.fillStyle='#dce9be';ctx.fill();ctx.restore();
  }
  function pickupBag(x,z,y){
    objectShadow(x,z,y,.48,.36);
    drawBox(x,z,y,.46,.32,.56,['#e6d2a7','#a68b60','#c8ae7d']);
    worldLine([[x-.13,y+.56,z],[x-.13,y+.72,z],[x+.13,y+.72,z],[x+.13,y+.56,z]],'#b39564',.035);
    drawBox(x,z+.167,y+.14,.22,.014,.27,['#496f50','#496f50','#496f50']);
    bagAppIcon(x,z+.183,y+.145,.26);
    if(unit>=22){
      worldLine([[x+.232,y+.04,z-.12],[x+.232,y+.27,z],[x+.232,y+.53,z-.12]],'#96794b88',.014);
      worldLine([[x-.2,y+.535,z+.17],[x+.2,y+.535,z+.17]],'#f1deb188',.014);
    }
    drawBox(x+.125,z+.17,y+.42,.1,.015,.08,['#f6edcf','#f6edcf','#f6edcf']);
  }
  function merchandise(x,z,y,kind,color){
    objectShadow(x,z,y,.6,.46);
    var fabric=[color,shadeColor(color,.68),shadeColor(color,.85)];
    if(kind===0){
      // Folded tees: two soft stacks, a neck fold, and a small cream leaf tag.
      for(var layer=0;layer<2;layer++)drawBox(x,z,y+layer*.085,.58,.42,.075,layer?fabric:['#e8dfbf','#a59c80','#c6bca0']);
      worldLine([[x-.07,y+.163,z-.12],[x,y+.163,z-.06],[x+.07,y+.163,z-.12]],'#dfdfbf',.022);
      worldLine([[x+.12,y+.164,z+.06],[x+.12,y+.164,z+.16]],'#e6edcc',.018);
      worldLine([[x+.07,y+.164,z+.08],[x+.12,y+.164,z+.12],[x+.17,y+.164,z+.07]],'#e6edcc',.024);
    }else if(kind===1){
      // Cap crown and projecting brim sit directly on the shelf.
      drawBox(x,z+.14,y,.51,.42,.035,fabric);
      var q=project(x,y+.14,z-.035);
      ellipse(q.x,q.y,unit*.22,unit*.19,color);
      worldLine([[x,y+.15,z+.13],[x,y+.27,z+.08]],'#e6edcc',.026);
      worldLine([[x-.055,y+.2,z+.13],[x,y+.23,z+.1],[x+.055,y+.2,z+.13]],'#e6edcc',.026);
    }else{
      // Canvas tote with visible handles and a leaf print.
      drawBox(x,z,y,.43,.24,.4,['#e6d8b5','#a49470','#c7b68d']);
      worldLine([[x-.12,y+.4,z],[x-.12,y+.54,z],[x+.12,y+.54,z],[x+.12,y+.4,z]],color,.027);
      drawBox(x,z+.128,y+.1,.23,.012,.24,[color,color,color]);bagAppIcon(x,z+.14,y+.1,.24);
      if(unit>=22)worldLine([[x-.18,y+.025,z+.13],[x+.18,y+.025,z+.13]],'#f4e7c680',.014);
    }
  }
  function stationDetails(x,z,i,now){
    var brass=['#d6c18a','#8c784d','#b7a16a'],metal=['#d9e5da','#708f80','#a2baaa'];
    if(i===0){
      for(var row=0;row<2;row++)for(var col=0;col<3;col++){var sx=x-.72+col*.72,sz=z-.37+row*.72;drawBox(sx,sz,1.42,.54,.5,.08,['#5c4e37','#353b2b','#434c34']);var q=project(sx,1.54,sz);ellipse(q.x,q.y,unit*.07,unit*.05,'#c6d988');worldLine([[sx,1.52,sz],[sx+.07,1.69,sz]],'#85b867',.03)}
      drawBox(x-1.23,z-.72,1.33,.33,.12,.52,['#ebd8ab','#ae9970','#d0b98a']);
      drawBox(x+1.12,z+.52,1.33,.4,.4,.46,metal);
      worldLine([[x+1.28,1.6,z+.5],[x+1.57,1.78,z+.55]],'#bdd3bd',.06);
    }
    if(i===1){
      drawBox(x,z,3.28,2.7,.56,.035,['#fcf5c9','#b8bfa2','#e1e5bf']);
      for(var light=0;light<7;light++){var p=project(x-1.05+light*.35,3.27,z+.27);ellipse(p.x,p.y,unit*.065,unit*.035,'#fff3d5')}
      drawBox(x+1.5,z+.5,1.67,.09,.36,.45,metal);
      var screen=project(x+1.57,1.94,z+.68);ctx.fillStyle='#294b40';ctx.fillRect(screen.x-unit*.12,screen.y,unit*.22,unit*.17);ctx.fillStyle='#bbe697';ctx.fillRect(screen.x-unit*.09,screen.y+unit*.05,unit*.13,unit*.04);
      worldLine([[x+1.4,3.3,z],[x+1.65,3.5,z],[x+1.65,.4,z]],'#435b4a',.025);
    }
    if(i===2){
      drawBox(x+.68,z+.76,1.33,.85,.47,.045,['#b3cab6','#6b8c79','#91ac98']);
      for(var k=0;k<5;k++){var p=project(x+.38+(k%3)*.2,1.43,z+.6+Math.floor(k/3)*.2);ellipse(p.x,p.y,unit*.085,unit*.065,k%2?'#9aba6a':'#638950')}
      drawBox(x+1.08,z-.77,1.33,.38,.3,.38,brass);
    }
    if(i===3){
      carton(x-1,z+.77,1.33,.56);carton(x+.55,z-.68,1.33,.65);
      worldLine([[x-.9,1.38,z-.65],[x-.3,1.38,z-.65]],'#f1dfbc',.12);
      var tape=project(x-.6,1.46,z-.65);ellipse(tape.x,tape.y,unit*.12,unit*.07,'#b89f66');ellipse(tape.x,tape.y,unit*.055,unit*.03,'#405342');
    }
    if(i===4){
      // The screen faces the same way as its counter, so it stays attached during pan/zoom.
      drawBox(x-.7,z-.115,1.53,.73,.025,.43,['#b8d9ad','#183f36','#244f40']);
      for(var row=0;row<3;row++)drawBox(x-.79,z-.096,1.6+row*.105,.37-row*.07,.012,.024,['#c9e6a9','#c9e6a9','#c9e6a9']);
      drawBox(x+.96,z+.56,1.33,.5,.4,.24,metal);drawBox(x+.96,z+.56,1.57,.28,.48,.018,['#f4ead3','#cabfa8','#e1d8c1']);
      drawBox(x-.7,z+.47,1.33,.78,.3,.04,['#526e60','#304d40','#3c5c49']);
    }

  }
  function drawCounterDivider(){
        // A low tiled divider links the counters without crossing the customer lanes.
        drawBox(.3,4,.03,3.5,.28,1.04,['#6b8972','#284939','#3d614c']);
        for(var tile=0;tile<15;tile++){var tx=-1.38+tile*.24;worldLine([[tx,.09,4.15],[tx,1.05,4.15]],'#d4d6b7',.016)}
        [.38,.72].forEach(function(y){worldLine([[-1.45,y,4.15],[2.05,y,4.15]],'#d4d6b7',.016)});
        drawBox(.3,4,1.07,3.62,.4,.11,['#e0d4b4','#a99c7b','#c5ba9a']);
  }
  function drawStarterStation(x,z,i){
    var wood=['#c5a478','#806244','#a1835b'],metal=['#435749','#24382d','#324b3b'];
    // A compact open workbench: one tool, one task, no extra cabinetry.
    [-.85,.85].forEach(function(dx){[-.64,.64].forEach(function(dz){drawBox(x+dx,z+dz,.03,.1,.1,1.12,metal)})});
    drawBox(x,z,1.12,2.05,1.65,.16,wood);
    drawBox(x,z+.72,.36,1.8,.08,.48,metal);
    if(i===0){drawBox(x,z,1.28,1.35,.9,.09,metal);for(var n=0;n<3;n++){var seed=project(x-.42+n*.42,1.4,z);ellipse(seed.x,seed.y,unit*.075,unit*.05,'#e1c68a')}}
    if(i===1)crop(x,z,1.28,0,false);
    if(i===2){drawBox(x+.3,z,1.28,.9,.7,.09,metal);crop(x-.55,z-.1,1.28,0,true)}
    if(i===3){jar(x-.35,z,1.28);carton(x+.48,z,1.28,.42)}
    if(i===4){drawBox(x-.25,z,1.28,.65,.5,.08,metal);drawBox(x-.25,z-.16,1.36,.65,.1,.45,metal);drawBox(x+.55,z+.2,1.28,.4,.35,.06,wood)}
    if(i===5){pickupBag(x-.35,z,1.28);pickupBag(x+.35,z,1.28)}
  }
  function drawStage(pos,i,now){
    now=motionPreference.matches?0:taskClocks[i];
    var x=pos.x,z=pos.z,active=stationWorking(i),stone=[['#d1e5c4','#6f9b7d','#a0c6a5'],['#7fd7b5','#236e62','#44ab89'],['#97e4e1','#28747f','#55b4b4'],['#ffe29a','#c3893f','#edbd62']][Math.min(3,stationTier(i))],dark=['#416859','#213b32','#315446'];
    if(stationTier(i)===0){drawStarterStation(x,z,i);warmStrip([[x-.8,1.12,z+.84],[x+.8,1.12,z+.84]],i===1);return}
    var contact=project(x+.25,.015,z+.2);ellipse(contact.x,contact.y,unit*1.95,unit*.88,'#344d3b26');
    drawBox(x,z,.03,3.1,2.5,.3,dark);drawBox(x,z,.33,2.9,2.25,.8,stone);drawBox(x,z,1.13,3.2,2.5,.16,['#f4e7c0','#b6a37b','#d6c596']);drawBox(x,z,1.29,3.12,2.42,.035,['#f0e5cb','#b8aa8b','#d6c7a6']);
    for(var panel=0;panel<2;panel++){drawBox(x-.75+panel*1.5,z+1.135,.44,1.32,.04,.55,['#d0e3c9','#6b8f79','#a2bfa4']);drawBox(x-.75+panel*1.5,z+1.17,.75,.32,.045,.045,['#e3d6ac','#958d70','#c3b68f'])}
    drawBox(x+1.46,z,.37,.035,2.1,.63,['#a8bda9','#65846f','#8da38e']);
    for(var seam=0;seam<3;seam++)drawBox(x+1.49,z-.7+seam*.7,.47,.02,.035,.43,['#afc2aa','#6c8470','#859f88']);
    drawBox(x,z-.9,1.305,2.7,.035,.025,['#f4ebd5','#c1ac84','#ded0ac']);
    if(i===0){drawBox(x,z,1.29,2.3,1.55,.12,dark);for(var n=0;n<6;n++){var p=project(x-.7+(n%3)*.7,1.44,z-.35+Math.floor(n/3)*.7);ellipse(p.x,p.y,unit*.09,unit*.06,'#e1c68a')}}
    if(i===1){for(var n=0;n<(stationTier(i)===1?2:4);n++)crop(x-.65+(n%2)*1.3,z-.5+Math.floor(n/2),1.3,n,false);drawBox(x-1.4,z,1.3,.1,.1,2,stone);drawBox(x+1.4,z,1.3,.1,.1,2,stone);drawBox(x,z,3.3,3,.7,.13,['#ecebd7','#929c94','#c9d0bc'])}
    if(i===2){crop(x-.75,z,1.3,1,true);drawBox(x+.7,z,1.3,1.1,1,.2,dark);for(var n=0;n<3;n++){flowerBud(x+.45+n*.25,z,1.6,visibleStrain(n),.14)}var p=project(x+(Math.sin(now*.005)*.12),1.5,z+.55);ctx.strokeStyle='#e4ece6';ctx.lineWidth=unit*.07;ctx.beginPath();ctx.moveTo(p.x-unit*.25,p.y-unit*.15);ctx.lineTo(p.x+unit*.25,p.y+unit*.15);ctx.moveTo(p.x-unit*.25,p.y+unit*.15);ctx.lineTo(p.x+unit*.25,p.y-unit*.15);ctx.stroke()}
    if(i===3){for(var n=0;n<3;n++)jar(x-.8+n*.8,z+(Math.sin(now*.003+n)*.08),1.3);drawBox(x,z-.9,1.3,2.7,.18,.16,dark)}
    if(i===4){drawBox(x-.7,z,1.3,.95,.7,.12,dark);drawBox(x-.7,z-.2,1.42,.95,.13,.7,['#d8e7df','#314c42','#426b57']);for(var n=0;n<3;n++)drawBox(x+.5+n*.22,z+n*.18,1.3+n*.16,.7,.55,.16,['#f2ead5','#b0a589','#d2c6aa'])}

    if(i===1&&active){var lit=project(x,1.38,z);glow(lit.x,lit.y,unit*2.1,'#e6efb047')}
    if(i===3){drawBox(x+1.05,z+.8,1.33,.5,.35,.16,['#9faf99','#465f4a','#70866b']);drawBox(x+1.05,z+.8,1.5,.35,.24,.025,['#c9ebaf','#8cac78','#b7d59d'])}
    if(i>=4){
      // Pale stone retail counters with oak fluting and a glass product vitrine.
      drawBox(x,z,.34,2.92,2.24,.79,['#386552','#173e32','#255240']);
      for(var tile=0;tile<13;tile++)worldLine([[x-1.4+tile*.23,.36,z+1.135],[x-1.4+tile*.23,1.1,z+1.135]],'#d9d7b8',.018);
      [.38,.73,1.08].forEach(function(y){worldLine([[x-1.44,y,z+1.14],[x+1.44,y,z+1.14]],'#d9d7b8',.018)});
      worldLine([[x-1.5,.22,z+1.3],[x+1.5,.22,z+1.3]],'#c4a76b',.06);
      // Oak slats on the side return retain the green tile across the front.
      drawBox(x+1.47,z,.34,.055,2.22,.8,['#b78a59','#755033','#9d7146']);
      for(var slat=0;slat<12;slat++)drawBox(x+1.505,z-1.02+slat*.18,.38,.075,.105,.7,['#c9a16d','#7b5638','#b18a58']);
      drawBox(x,z,.3,3.02,2.32,.09,['#353a35','#181e1b','#252c27']);
      drawBox(x,z,1.095,3.19,2.47,.065,['#b68b5c','#765138','#9c724a']);
      drawBox(x,z,1.14,3.22,2.5,.17,['#fcfaf0','#bfc3ba','#e1e4db']);
      worldLine([[x-1.2,1.316,z-.8],[x-.65,1.316,z-.3],[x-.85,1.316,z+.3]],'#999f9335',.016);
      if(i===4){drawBox(x+.65,z+.35,1.34,1.15,.85,.65,['#d7ebe524','#99c6b629','#b8dfcf35']);
      worldLine([[x+.08,1.34,z+.78],[x+.08,2,z+.78],[x+1.22,2,z+.78],[x+1.22,1.34,z+.78]],'#2f3933',.035);
      }
      worldLine([[x-1.45,.39,z+1.16],[x+1.45,.39,z+1.16]],'#c0a466',.035);
      if(i===4){jar(x+.4,z+.36,1.34);jar(x+.86,z+.36,1.34)}
      else{
        // Low oak staging tray leaves a clear handoff area at the front.
        drawBox(x,z-.35,1.315,2.6,.72,.07,['#cdb38b','#92724e','#b2946c']);
        for(var bag=0;bag<3;bag++)pickupBag(x-.82+bag*.82,z-.35,1.385);
        drawBox(x-.95,z+.66,1.32,.6,.42,.045,['#466957','#294b3b','#365947']);
      }
    }
    if(stationTier(i)>=2)stationDetails(x,z,i,now);
    premiumEquipment(x,z,i,now);
    var visualTier=stationTier(i),finish=TIER_COLORS[visualTier];
    if(visualTier>=4){
      // Signature: pale stone front and dark inset trim.
      drawBox(x,z+1.19,.48,2.65,.045,.48,[finish,'#acb8b2',finish]);
      for(var rib=0;rib<9;rib++)worldLine([[x-1.18+rib*.295,.5,z+1.22],[x-1.18+rib*.295,.92,z+1.22]],'#506b63',.025);
    }
    if(visualTier>=5){
      // Elite: compact instrument pod on the existing side return.
      drawBox(x+1.94,z-.35,1.32,.58,.48,.63,['#d4ddd4','#40584d','#728f80']);
      drawBox(x+1.94,z-.097,1.52,.4,.018,.28,['#c5a7cd','#405b50','#c5a7cd']);
      worldLine([[x+1.81,1.66,z-.078],[x+2.07,1.66,z-.078]],'#f4eaca',.025);
    }
    if(visualTier>=6){
      // Flagship: brass corner caps and a low illuminated crest.
      [-1.4,1.4].forEach(function(dx){drawBox(x+dx,z+1.21,.35,.12,.065,.76,['#f0dda5','#a88d56','#d4b979'])});
      drawBox(x,z+1.25,.56,.44,.025,.35,['#294a3c','#294a3c','#294a3c']);bagAppIcon(x,z+1.27,.59,.29);
    }

    warmStrip([[x-1.3,1.1,z+1.26],[x+1.3,1.1,z+1.26]],i===1);
    warmStrip([[x-1.35,.14,z+1.18],[x+1.35,.14,z+1.18]],false);
    if(stationTier(i)>=2){var pool=project(x,.08,z+1.35);glow(pool.x,pool.y,unit*1.45,'#f4d29528')}

    worldLine([[x-1.5,1.325,z+1.22],[x+1.5,1.325,z+1.22]],'#fff9df88',.018);
    worldLine([[x+1.55,1.325,z-1.12],[x+1.55,1.325,z+1.18]],'#fff9df55',.018);
    drawStationLevel(x,z,i);
    var p=project(x+1.25,1.44,z+1);ellipse(p.x,p.y,unit*.1,unit*.07,active?'#a7ed96':'#69786f');
  }
  function premiumEquipment(x,z,i,now){
    var tier=stationTier(i);if(tier<2)return;
    var metal=['#bdcfc5','#405e50','#789787'],dark=['#425c4d','#21382e','#304b3c'];
    if(i===0){ // Seed dispenser above the germination tray.
      drawBox(x-.95,z-.65,1.33,.08,.1,.9,metal);
      drawBox(x-.55,z-.65,2.13,.9,.55,.32,metal);
      drawBox(x-.55,z-.65,1.93,.16,.18,.2,dark);
    }
    if(i===2){ // Low trimming enclosure, clear of the employee.
      drawBox(x+.65,z,1.51,1.1,.85,.5,['#d2eee32b','#91bfab30','#a2cebe38']);
      worldLine([[x+.1,1.52,z+.44],[x+.1,2.01,z+.44],[x+1.2,2.01,z+.44],[x+1.2,1.52,z+.44]],'#547264',.035);
    }
    if(i===3){ // Compact bag sealer.
      drawBox(x+.65,z+.25,1.34,.72,.62,.16,metal);
      [-.3,.3].forEach(function(dx){drawBox(x+.65+dx,z+.25,1.5,.06,.12,.52,dark)});
      var press=1.92-(motionPreference.matches?0:(1-Math.cos(now*.002))*.08);
      drawBox(x+.65,z+.25,press,.72,.18,.09,metal);
    }
    if(tier<3)return;
    // Premium counters gain lit inset panels; production stations gain task lighting.
    if(i<4){
      drawBox(x-1.35,z-.85,1.33,.065,.065,1.45,dark);
      drawBox(x-.8,z-.85,2.78,1.15,.22,.07,metal);
      worldLine([[x-1.3,2.77,z-.73],[x-.25,2.77,z-.73]],'#f9e9b7',.035);
    }else{
      drawBox(x-.85,z+1.17,.57,.62,.025,.36,dark);
      for(var row=0;row<3;row++)worldLine([[x-1.07,.64+row*.085,z+1.19],[x-.65+row*.035,.64+row*.085,z+1.19]],'#cce3a5',.022);
    }
  }
  function drawStationLevel(x,z,i){
    var tier=Math.min(3,stationTier(i)),color=TIER_COLORS[stationTier(i)],level=state.lines[i];
    // Each pair of levels lights another indicator before the next ten-level milestone.
    var lamps=level>=30?5:Math.floor((level%10)/2)+1;
    for(var n=0;n<5;n++){var p=project(x-.56+n*.28,.99,z+1.17);ellipse(p.x,p.y,unit*.06,unit*.045,n<lamps?color:'#45614f')}
    if(tier<2)return;
    drawBox(x,z+1.2,1.12,3.1,.055,.09,[color,color,color]);
    var equipment=['#c0d5bd','#4e715c','#8cae94'];
    drawBox(x+1.94,z-.3,.03,.72,1.55,1.18,equipment);
    drawBox(x+1.94,z-.3,1.21,.82,1.65,.1,[color,'#6c8b72','#a5bea0']);
    if(i===0){for(var n=0;n<tier+1;n++)carton(x+1.94,z-.8+n*.42,1.31,.35)}
    if(i===1){plant(x+1.94,z-.6,1.31,.5+tier*.12);drawBox(x+2.22,z-.3,1.31,.07,.08,1.45,equipment);drawBox(x+1.94,z-.3,2.76,.8,1.6,.08,['#fbf2c5','#929c94','#dbe1bc'])}
    if(i===2){for(var n=0;n<tier+1;n++){drawBox(x+1.94,z-.65+n*.35,1.31,.55,.28,.16,['#a7bd89','#5b7e50','#80a169']);var bud=project(x+1.94,1.5,z-.65+n*.35);ellipse(bud.x,bud.y,unit*.13,unit*.08,'#9abe68')}}
    if(i===3){for(var n=0;n<tier+1;n++)jar(x+1.94,z-.84+n*.4,1.31)}
    if(i===5){for(var n=0;n<3;n++)pickupBag(x+1.94,z-.8+n*.5,1.31)}
    if(i===4){drawBox(x+1.94,z-.45,1.31,.57,.18,.65,equipment);drawBox(x+1.94,z-.343,1.43,.45,.025,.4,['#abdaaf','#224e44','#376b59'])}
    if(tier>=3&&i===3){
      // Keep the employee sightline open; packaging supplies live on the side return.
      drawBox(x+1.94,z-.3,2.05,.82,1.55,.1,equipment);
      [-.98,.38].forEach(function(zz){drawBox(x+2.27,z+zz,1.31,.055,.055,.78,equipment)});
      for(var n=0;n<3;n++)drawBox(x+1.94,z-.8+n*.5,2.15,.56,.36,.28,[color,'#6c8b72','#a5bea0']);
    }
    if(tier>=3&&i!==3&&i!==5){
      drawBox(x,z-.99,2.15,2.75,.25,.12,equipment);
      [-1.32,1.32].forEach(function(dx){drawBox(x+dx,z-.99,1.32,.055,.055,.84,equipment)});
      for(var n=0;n<3;n++)drawBox(x-.87+n*.87,z-.99,2.27,.58,.3,.32,[color,'#6c8b72','#a5bea0']);
    }
    if(tier>=3){drawBox(x,z+1.21,.35,2.9,.06,.12,['#f4dda2','#ae8c50','#d6b56e']);drawBox(x+2.33,z-.3,.58,.035,.9,.32,['#f4dda2','#ae8c50','#d6b56e'])}
  }
  function drawPerson(x,z,now,id,moving,employee,bag,gait){
    var reduced=motionPreference.matches,u=unit,p=project(x,0,z);
    var amount=reduced?0:(gait?gait.amount:(moving?1:0)),phase=gait?gait.phase:now*.007+id;
    var step=Math.sin(phase)*amount,bob=reduced?0:(Math.cos(phase*2)*.022*amount+Math.sin(now*.0018+id)*.009);
    var facing=gait?gait.facing:.3;
    // Stable per-customer choices keep colors consistent while walking.
    function pickColor(palette,salt){var n=Math.imul(id+1,salt)>>>0;n=Math.imul(n^(n>>>16),0x45d9f3b)>>>0;return palette[((n^(n>>>16))>>>0)%palette.length]}
    var style=id%20,skin=pickColor(['#e9b28e','#bd8158','#754b32','#f0c9a0','#a66b48','#d6a17d','#604333'],127);
    var hair=pickColor(['#282521','#b66c38','#211f20','#d9b775','#513b28','#795340','#9c8773','#c3beb0'],311);
    var shirt=employee?'#e5e8cf':pickColor(['#8eb7be','#c96b60','#315d6b','#daa951','#587c85','#b45d65','#718b68','#dddcc9','#ce865b','#775d88','#496a59','#b899a6','#8192b3','#bc784d','#9ba97a','#4b5059'],733);
    var pants=employee?'#294b3c':pickColor(['#345767','#343632','#253d49','#93754d','#536758','#706174','#b2a183','#4d647c'],997);
    var accent=pickColor(['#a87955','#789084','#9b6658','#627e95','#9a789e','#c8996a'],1297);
    if(!employee&&style===18)hair=pickColor(['#b5b3a5','#ded5bf','#8f9390'],311);
    if(!employee&&style===19)hair=pickColor(['#638f91','#b17c94','#9983b0','#bf8967'],311);
    var expressive=!employee&&style===8;
    if(expressive)hair=pickColor(['#ac83b5','#648f9c','#bf819d','#aaad72'],311);
    function point(dx,y){return{x:p.x+dx*u,y:p.y-(y+bob)*u}}
    function shape(coords,color){poly(coords.map(function(q){return point(q[0],q[1])}),color)}
    function block(dx,y,w,h,r,color){var q=point(dx,y);ctx.beginPath();ctx.roundRect(q.x,q.y,w*u,h*u,r*u);ctx.fillStyle=color;ctx.fill()}
    function limb(coords,color,w){ctx.beginPath();coords.forEach(function(q,i){var v=point(q[0],q[1]);if(i)ctx.lineTo(v.x,v.y);else ctx.moveTo(v.x,v.y)});ctx.lineWidth=w*u;ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle=color;ctx.stroke()}
    ellipse(p.x,p.y+u*.025,u*.32,u*.085,'#071d2025');
    // Flat, elongated silhouettes with geometric shoes and a restrained walking stride.
    [-1,1].forEach(function(side){var stride=step*side*.13,fx=side*.11+stride,fy=.065+Math.max(0,side*step)*.055;
      limb([[side*.105,.76],[side*.11+stride*.4,.4],[fx,fy+.04]],expressive?skin:pants,.14);
      if(expressive)limb([[side*.105,.78],[side*.11+stride*.3,.53]],pants,.19);
      shape([[fx-.07,fy+.075],[fx+.06,fy+.075],[fx+.17,fy-.025],[fx-.07,fy-.025]],employee?'#20352c':'#242c2c');
      limb([[fx-.065,fy-.026],[fx+.16,fy-.026]],'#c6cfbf',.025);
    });
    var longHair=!employee&&(style===2||style===3||style===6||style===12||style===14||style===17);
    if(longHair)block(-.25,1.78,.49,.77,.18,hair);
    // Straight sleeves and small hands, without the old outlined, rounded limbs.
    [-1,1].forEach(function(side){if(employee&&id<6)return;var swing=-side*step*.1,reach=employee&&!reduced?Math.sin(now*.003+id+side)*.045:0;
      limb([[side*.245,1.28],[side*.275,1.04+swing],[side*(.28+reach),.79+swing]],skin,.105);
      limb([[side*.24,1.27],[side*.265,1.11+swing]],shirt,.15);
    });
    if(expressive){block(-.2,1.05,.4,.28,.04,skin);block(-.22,.85,.44,.12,.025,pants)}
    block(-.225,1.37,.45,expressive?.38:.64,.095,shirt);
    // Distinct dresses, striped tops, jackets, and shop aprons.
    if(!employee&&(style===3||style===6))shape([[-.2,1.16],[.2,1.16],[.27,.67],[-.27,.67]],shirt);
    if(!employee&&style===7)for(var stripe=0;stripe<4;stripe++)block(-.223,1.25-stripe*.13,.446,.055,0,'#2b3835');
    if(!employee&&(style===2||style===9)){block(-.043,1.33,.086,.59,0,'#c6d1c5');for(var btn=0;btn<3;btn++){var bp=point(.075,1.17-btn*.12);ellipse(bp.x,bp.y,u*.014,u*.014,'#b6c6b6')}}
    if(!employee&&style>=10){
      if([11,16,18].indexOf(style)>=0){block(-.055,1.33,.11,.55,0,'#e5dfca');limb([[-.08,1.31],[-.14,1.1],[-.06,1.03]],'#afc0b5',.025);for(var stud=0;stud<3;stud++)block(.09,1.2-stud*.13,.025,.025,.01,'#d9d4b3')}
      if(style===10){for(var stripe=0;stripe<3;stripe++)limb([[-.19+stripe*.045,1.3],[-.19+stripe*.045,.78]],'#e2dcca',.022);block(-.03,1.28,.03,.49,0,'#ddcfae')}
      if(style===12||style===17)shape([[-.2,1.1],[.2,1.1],[.28,.61],[-.28,.61]],shirt);
      if(style===14)for(var stripe=0;stripe<4;stripe++)block(-.215,1.27-stripe*.12,.43,.055,0,'#33463d');
      if(style===15){limb([[-.12,1.32],[0,1.04],[.12,1.32]],'#ddbf91',.045);block(-.16,1.34,.32,.11,.025,'#ddbf91')}
      if(style===13){limb([[-.13,1.3],[.16,.87]],'#d1b386',.045);block(.07,.99,.2,.2,.025,'#887051')}
    }
    if(employee){shape([[-.14,1.3],[.14,1.3],[.19,.73],[-.19,.73]],'#527e60');limb([[-.14,1.34],[-.12,1.16]],'#a9bb92',.035);limb([[.14,1.34],[.12,1.16]],'#a9bb92',.035);block(-.09,1.01,.18,.12,.015,'#41674f')}
    if(employee&&id<6){
      var cycle=reduced?0:(1-Math.cos(taskClocks[id]*.003))* .5;
      var activity=reduced?(stationWorking(id)?1:0):taskActivity[id];
      var handY=.79+activity*(.43+cycle*.15),handX=.28+activity*(-.16+cycle*.12);
      limb([[-.24,1.27],[-.28,1.04+activity*.09],[-.28+activity*.23,.79+activity*.43]],skin,.105);
      limb([[.24,1.27],[.275+activity*.055,1.04+activity*.09],[handX,handY]],skin,.105);
      ctx.save();ctx.globalAlpha*=activity;
      if(id===0){block(handX-.06,handY+.13,.16,.2,.02,'#e0c590')}
      if(id===1){block(handX-.08,handY+.14,.23,.2,.035,'#88aaa0');limb([[handX+.12,handY+.08],[handX+.25,handY+.15]],'#b9d2c0',.04)}
      if(id===2){limb([[handX-.08,handY+.1],[handX+.14,handY-.03]],'#dbe4d8',.035);limb([[handX-.08,handY-.02],[handX+.14,handY+.1]],'#dbe4d8',.035)}
      if(id===3||id===5){block(-.09,1.28,.22,.28,.015,'#c9ac77');limb([[-.04,1.29],[-.04,1.36],[.08,1.36],[.08,1.29]],'#e6d1a7',.025)}
      if(id===4){block(handX-.04,handY+.08,.16,.1,.012,'#e5e8d2')}
      ctx.restore();
    }
    block(-.065,1.46,.13,.17,.035,skin);
    block(-.205+facing*.025,1.79,.41,.47,.15,skin);
    // Broad hair shapes carry the personality; faces stay almost featureless.
    if(!employee&&style===1){for(var curl=0;curl<9;curl++){var angle=curl*Math.PI/8,q=point(Math.cos(angle)*.22,1.69+Math.sin(angle)*.21);ellipse(q.x,q.y,u*.105,u*.105,hair)}}
    else{block(-.218,1.83,.44,.22,.12,employee?'#527b69':hair);shape([[-.218,1.7],[-.13,1.63],[-.09,1.78],[.19,1.69],[.21,1.8],[-.16,1.82]],employee?'#527b69':hair)}
    if(expressive){var ear=point(.205,1.43);ctx.beginPath();ctx.ellipse(ear.x,ear.y,u*.045,u*.065,0,0,Math.PI*2);ctx.strokeStyle='#ecd496';ctx.lineWidth=u*.02;ctx.stroke()}
    if(longHair)block(-.235,1.74,.13,.58,.04,hair);
    if(!employee&&style===10){for(var curl=0;curl<11;curl++){var a=curl*Math.PI/10,q=point(Math.cos(a)*.26,1.68+Math.sin(a)*.26);ellipse(q.x,q.y,u*.105,u*.11,hair)}}
    if(!employee&&(style===11||style===18)){shape([[-.18,1.5],[-.11,1.36],[.12,1.32],[.21,1.49],[.12,1.42],[-.05,1.43]],hair);block(-.08,1.49,.2,.045,.02,hair)}
    if(!employee&&style===13){block(-.23,1.91,.46,.25,.13,accent);block(-.245,1.72,.49,.08,.02,shadeColor(accent,1.1))}
    if(!employee&&style===14){var puff=point(-.18,2.02);ellipse(puff.x,puff.y,u*.18,u*.21,hair);limb([[-.23,1.77],[.02,1.84],[.19,1.78]],'#cdb987',.04)}
    if(!employee&&style===16){block(-.22,1.85,.44,.18,.1,accent);block(.09,1.73,.25,.055,.02,accent)}
    if(!employee&&(style===12||style===17)){for(var bead=0;bead<5;bead++){var q=point(-.12+bead*.06,1.31-Math.sin(bead*Math.PI/4)*.06);ellipse(q.x,q.y,u*.025,u*.026,'#ead6a2')}}
    if(!employee&&(style===15||style===18)){[-1,1].forEach(function(side){var q=point(side*.105,1.58);ctx.beginPath();ctx.ellipse(q.x,q.y,u*.085,u*.065,0,0,Math.PI*2);ctx.strokeStyle='#34565c';ctx.lineWidth=u*.025;ctx.stroke()});limb([[-.025,1.58],[.025,1.58]],'#34565c',.025)}

    if(!employee&&style===5){var bun=point(-.15,1.91);ellipse(bun.x,bun.y,u*.12,u*.12,hair)}
    if(employee||style===0){var cap=employee?'#527b69':accent;block(-.22,1.83,.43,.18,.1,cap);block(.07,1.72,.27,.06,.025,cap)}
    if(!employee&&(style===4||style===9)){var glassesY=1.57;[-1,1].forEach(function(side){var q=point(side*.095+facing*.025,glassesY);ctx.beginPath();ctx.roundRect(q.x-u*.073,q.y-u*.048,u*.146,u*.1,u*.025);ctx.strokeStyle='#365764';ctx.lineWidth=u*.026;ctx.stroke()});limb([[-.025,glassesY],[.025,glassesY]],'#365764',.023)}
    if(!employee&&(style===3||style===6)){var mouth=point(.075,1.4);ellipse(mouth.x,mouth.y,u*.034,u*.018,'#b96356')}
    if(bag){var bx=x+.48,bz=z+.1,by=.55+step*.035;drawBox(bx,bz,by,.38,.3,.48,['#ead3a1','#9c8052','#c6aa75']);worldLine([[bx-.12,by+.48,bz],[bx-.12,by+.59,bz],[bx+.12,by+.59,bz],[bx+.12,by+.48,bz]],'#bd9f67',.03);drawBox(bx,bz+.16,by+.16,.2,.018,.22,['#496f50','#496f50','#496f50']);bagAppIcon(bx,bz+.18,by+.16,.22)}
  }
  function queueRoute(ordered){
    var x=ordered?4:-4,d=-1;
    var route=[{x:x,z:6.4},{x:x+d*2.1,z:6.4},{x:x+d*2.1,z:7.6},{x:x,z:7.6},{x:x,z:8.8},{x:x+d*2.1,z:8.8},{x:x+d*2.1,z:ordered?9.6:state.kiosk?9.05:10}];
    if(!ordered)route=route.concat(state.kiosk?[{x:-7.4,z:9.05},{x:-8.7,z:9.05},{x:-10.5,z:9.05},{x:-11.4,z:8.7},{x:-12.05,z:7.8}]:[{x:-7.4,z:10},{x:-8.7,z:10},{x:-10.5,z:10},{x:-11.7,z:9.3},{x:-12.4,z:7.8}]);return route;
  }
  function routeLength(route){var n=0;for(var i=1;i<route.length;i++)n+=Math.hypot(route[i].x-route[i-1].x,route[i].z-route[i-1].z);return n}
  function routePoint(route,distance){
    for(var i=1;i<route.length;i++){var a=route[i-1],b=route[i],length=Math.hypot(b.x-a.x,b.z-a.z);if(distance<=length)return{x:a.x+(b.x-a.x)*distance/length,z:a.z+(b.z-a.z)*distance/length};distance-=length}
    return route[route.length-1];
  }
  function customerQueue(c){
    var queue=customers.filter(function(q){return q.idChecked!==false&&q.phase!=='leaving'&&q.ordered===c.ordered&&(c.ordered||!!q.kiosk===!!c.kiosk)});
    if(c.ordered)queue.sort(function(a,b){return (a.pickupTicket||a.id)-(b.pickupTicket||b.id)});
    return queue;
  }
  function customerQueueDistance(c){
    var queue=customerQueue(c);
    if(c.kiosk&&!c.ordered){
      var heads=Array.from({length:kioskCount()},function(_,index){return queue.find(function(q){return (q.kioskIndex||0)===index})});
      if(heads.indexOf(c)>=0)return 0;
      var waiting=queue.filter(function(q){return heads.indexOf(q)<0});
      // Both kiosk branches merge into the same rear walkway. Reserve each slot once.
      return .5+(7.6-(6.8-(c.kioskIndex||0)*1.8))+Math.max(0,waiting.indexOf(c))*.55;
    }
    return Math.max(0,queue.indexOf(c))*.75;
  }
  function customerTarget(c){
    if(c.phase==='leaving')return{x:-10.5,z:-8.1};
    return routePoint(c.kiosk&&!c.ordered?kioskRoute(c.kioskIndex):queueRoute(c.ordered),customerQueueDistance(c));
  }
  function moveToIdCheck(c,dt){
    var queue=customers.filter(function(q){return q.idChecked===false}),index=queue.indexOf(c);
    var startX=c.x,startZ=c.z,budget=dt*2.8;
    c.phase='idCheck';
    if(index===0&&c.idApproach){
      while(c.idApproach.length&&budget>0){
        var point=c.idApproach[0],dx=point.x-c.x,dz=point.z-c.z,distance=Math.hypot(dx,dz),step=Math.min(distance,budget);
        if(distance>.001){c.x+=dx/distance*step;c.z+=dz/distance*step}budget-=step;
        if(distance<=step+.001)c.idApproach.shift();else break;
      }
      c.walking=Math.hypot(c.x-startX,c.z-startZ)>.001;
      if(!c.idApproach.length&&!c.walking){
        c.idCheckTime+=dt;
        if(c.idCheckTime>=securityDuration()){
          c.idChecked=true;c.phase='entering';
          var route=c.kiosk?kioskRoute(c.kioskIndex):queueRoute(false),join=c.kiosk?2:route.length-4;
          c.routeKind=c.kiosk?'kiosk':'order';c.laneDistance=routeLength(route.slice(0,join+1));c.waypoints=[route[join]];
        }
      }
      return;
    }
    var waitingIndex=index-(queue[0]&&queue[0].idApproach?1:0),targetZ=7.1-Math.max(0,waitingIndex)*.85,ahead=queue[index-1];
    if(ahead&&!ahead.idApproach)targetZ=Math.min(targetZ,ahead.z-.85);
    var dx=-12.4-c.x,dz=targetZ-c.z,distance=Math.hypot(dx,dz),step=Math.min(distance,budget);
    if(distance>.001){c.x+=dx/distance*step;c.z+=dz/distance*step}
    c.walking=step>.001;
    if(index===0&&!c.walking&&Math.hypot(c.x+12.4,c.z-7.1)<.01){
      c.idApproach=[{x:-12.4,z:7.8},{x:-11.7,z:9.3},{x:-10.5,z:9.65},{x:-9.8,z:9.8}];
    }
  }
  function moveQueuedCustomer(c,dt){
    if(c.idChecked===false){moveToIdCheck(c,dt);return}
    var kind=c.phase==='leaving'?'exit':c.ordered?'pickup':c.kiosk?'kiosk':'order',route=kind==='kiosk'?kioskRoute(c.kioskIndex):queueRoute(c.ordered),budget=dt*2.8,startX=c.x,startZ=c.z;
    if(c.routeKind!==kind){
      c.routeKind=kind;c.laneDistance=null;
      c.waypoints=(kind==='order'||kind==='kiosk')?[route[route.length-1]]:kind==='pickup'?(c.kiosk?[{x:-8,z:6.8-(c.kioskIndex||0)*1.8},{x:-7.1,z:5.3},{x:-1.3,z:5.3},{x:-.25,z:6.4},{x:-.25,z:9.65},{x:1.9,z:9.65},{x:1.9,z:9.6}]:[{x:-1.3,z:6.4},{x:-.25,z:6.4},{x:-.25,z:9.65},{x:1.9,z:9.65},{x:1.9,z:9.6}]):[{x:4,z:5.5},{x:8.1,z:6.5},{x:11.15,z:6.5},{x:11.15,z:-4.3},{x:10.25,z:-5.6},{x:10.25,z:-8.1},{x:7,z:-8.1},{x:-10.5,z:-8.1}];
    }
    while(c.waypoints.length&&budget>0){var point=c.waypoints[0],dx=point.x-c.x,dz=point.z-c.z,distance=Math.hypot(dx,dz),step=Math.min(distance,budget);if(distance>.0001){c.x+=dx/distance*step;c.z+=dz/distance*step}budget-=step;if(distance<=step+.0001)c.waypoints.shift();else break}
    if(!c.waypoints.length){
      if(kind==='exit')c.t=1;
      else{
        if(c.laneDistance===null)c.laneDistance=routeLength(route);
        var target=customerQueueDistance(c);
        // Follow the person ahead, not just the final empty queue slot.
        var queue=customerQueue(c),ahead=queue[queue.indexOf(c)-1];
        if(ahead){
          var aheadRoute=ahead.kiosk&&!ahead.ordered?kioskRoute(ahead.kioskIndex):queueRoute(ahead.ordered);
          if(ahead.laneDistance==null||ahead.waypoints&&ahead.waypoints.length)target=Math.max(target,routeLength(route));
          else if(!c.kiosk||c.ordered||(ahead.kioskIndex||0)===(c.kioskIndex||0)||ahead.laneDistance>.5){
            target=Math.max(target,ahead.laneDistance+routeLength(route)-routeLength(aheadRoute)+(c.kiosk&&!c.ordered?.55:.75));
          }
        }
        // Never jump backwards when a new customer joins another queue.
        c.laneDistance=Math.min(c.laneDistance,Math.max(target,c.laneDistance-budget));
        var pos=routePoint(route,c.laneDistance);c.x=pos.x;c.z=pos.z;c.phase=c.ordered?'pickup':c.kiosk?'kiosk':'ordering';
      }
    }
    c.walking=Math.hypot(c.x-startX,c.z-startZ)>.001;
  }
  function customerBehindBuilding(c){
    var x=c.renderX===undefined?c.x:c.renderX,z=c.renderZ===undefined?c.z:c.renderZ;
    return z < -7.5 || (x < -11.5 && z < 7.5);
  }
  function customerRatings(c){
    var happiness=Math.max(15,Math.min(100,96-(c.waitSeconds||0)*1.2/(1+state.comfortLevel*.2)+(c.bag?18:0)));
    var strain=c.strain===undefined?menuChoice(c.id):c.strain;
    var tolerance=.8+(c.id%5)*.1;
    var potency=strain*9+Math.max(0,state.strains[strain]-1)*3;
    var advice=Math.min(15,state.staff[4]*1.5);
    var boost=c.bag?(potency+advice+state.curingLevel*4)/tolerance:0;
    var decay=c.bag?(c.effectAge||0)*.8/(1+state.durationLevel*.3):0;
    var highness=Math.round(Math.max(0,Math.min(100,12+(c.id%5)*6+boost+(c.bag?30:0))-decay));
    return {happiness:Math.round(happiness),highness:highness};
  }
  function renderCustomerRatings(){
    var crowd=customers.filter(function(c){return !customerBehindBuilding(c)});
    ['happiness','highness'].forEach(function(key){
      var sample=crowd.map(function(c){return customerRatings(c)[key]});
      var value=sample.length?Math.round(sample.reduce(function(sum,v){return sum+v},0)/sample.length):0;
      $(key+'Value').textContent=sample.length?value+'%':'—';$(key+'Meter').value=value;
      $(key+'Meter').setAttribute('aria-valuetext',sample.length?value+' percent':key==='pickupRating'?'No pickups yet':'No customers yet');
    });
  }
  function drawCustomer(c,now){
    var moving=c.walking;
    if(c.eventGuest||c.kind==='vip'){var guest=project(c.x,.02,c.z);ellipse(guest.x,guest.y,unit*.48,unit*.22,'#dac18b80');}
    if(c.kind==='vip'){var vip=project(c.x,2.6,c.z);ctx.fillStyle='#f0cf7f';ctx.font='bold '+Math.max(9,unit*.25)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.fillText('VIP',vip.x,vip.y)}
    drawPerson(c.x,c.z,now,c.id,moving,false,c.bag,{phase:c.walkPhase||0,amount:c.walkAmount||0,facing:c.facing===undefined?.3:c.facing});
    if((c.phase==='ordering'&&Math.hypot(c.x+4,c.z-6.4)<.2)||c.phase==='pickup'||c.phase==='toPickup'){var p=project(c.x,2.05,c.z);ellipse(p.x,p.y,unit*.2,unit*.18,c.ordered?'#c4e8a7':'#f0dfb0');ctx.fillStyle='#24412f';ctx.font='bold '+Math.max(8,unit*.22)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.fillText(c.ordered?'✓':'…',p.x,p.y+unit*.075)}
  }
  function drawFloor(){
    ctx.fillStyle='#ecdac3';ctx.fillRect(0,0,width,height);
    poly([project(-15,-.4,-9),project(15,-.4,-9),project(18,-.4,14),project(-12,-.4,14)],'#9e816335');drawBox(0,1,-.24,30,20,.24,['#d9d1b8','#a9a087','#bfb49b']);
    groundPatch(-4.5,-3,8.8,10,'#b99c7460');groundPatch(4.5,-3,8.8,10,'#88a58a55');groundPatch(0,4.5,18,4.8,'#d9c39b66');groundPatch(0,8,22,3,'#c9baa33d');
    // Distinct real materials keep each room legible without reintroducing labels.
    for(var row=0;row<8;row++)for(var col=0;col<7;col++)groundPatch(.7+col*1.22,-7.25+row*1.18,1.17,1.13,(row+col)%2?'#b7c7a07a':'#8ca98b8a');
    for(var row=0;row<6;row++)for(var col=0;col<4;col++){var px=-8.35+col*2.25;groundPatch(px,-7.3+row*1.53,2.21,1.47,(row+col)%3?'#c7ad8066':'#e2c59466');worldLine([[px-.8,.026,-7.05+row*1.53],[px+.65,.026,-7.05+row*1.53]],'#7e65472a',.015)}
    for(var paving=0;paving<20;paving++){groundPatch(-14.2+(paving%10)*2.85,7.7+Math.floor(paving/10)*1.45,2.77,1.38,paving%3?'#c1b9a49c':'#d4c8ac9c')}
    groundPatch(0,6.87,18.5,.15,'#eee0be99');
    var waiting=customers.filter(function(c){return !c.ordered&&c.phase!=='leaving'}).length;
    for(var place=0;place<queueLimit();place++){var qx=-4-place*.9;groundPatch(qx,7.4,.72,.82,place<waiting?'#dfd49646':'#efe4c216');groundPatch(qx,7.89,.45,.06,place<waiting?'#ece0a6':'#b5bda260')}
    groundPatch(-4,7.4,.78,.06,'#f0d996');
    for(var plank=-8.5;plank<9;plank+=.65)groundPatch(plank,4.4,.018,4.6,'#604b3525');
    machinePos.forEach(function(pos,i){groundPatch(pos.x,pos.z,3.8,3.2,i<4?'#718c7333':'#b99d7533');var shadow=project(pos.x+.4,.01,pos.z+.3);ellipse(shadow.x,shadow.y,unit*2,unit*.9,'#00000028')});
    drawBox(0,-8.1,0,19,.3,2.6,['#e8e6b4','#9f9775','#d0cea1']);
    drawBox(-9.5,-4,0,.3,8.5,2.6,['#e8e6b4','#a1997a','#d3d0a0']);
    drawBox(0,-7.87,.12,19,.06,.16,['#a5b69a','#657e63','#849678']);
    drawBox(0,-8.06,2.6,19.4,.52,.14,['#f5e8c9','#aab695','#d1d5b5']);
    for(var scuff=0;scuff<9;scuff++){var sx=-8.4+scuff*1.95,sy=.35+(scuff%3)*.7;poly([project(sx,sy,-7.93),project(sx+.24,sy+.06,-7.93),project(sx+.42,sy-.12,-7.93),project(sx+.3,sy-.21,-7.93),project(sx-.08,sy-.13,-7.93)],'#9e9b7433')}
    worldLine([[-8.8,2.48,-7.87],[-7.9,2.41,-7.87],[-7.65,2.15,-7.87]],'#747553',.018);
    for(var brick=0;brick<18;brick++)worldLine([[-9+brick,1.48,-7.935],[-8.05+brick,1.48,-7.935]],'#e4dcc135',.02);
    // Floor shadows are anchored in world space and never lag behind the camera.
    poly([project(-9.15,.024,-5.1),project(-9.15,.024,-3.4),project(-2.3,.024,1.3),project(-2.3,.024,-.4)],'#fff0b726');
    poly([project(-9.15,.024,-2.9),project(-9.15,.024,-1.2),project(-2.3,.024,3.5),project(-2.3,.024,1.8)],'#fff0b71d');
    for(var win=0;win<3;win++){var wz=-6+win*2.2;drawBox(-9.3,wz,.75,.06,1.7,1.4,['#c6ddc8','#61867e','#85aaa2']);drawBox(-9.24,wz,1.35,.035,1.65,.04,['#e0e5ce','#90aa91','#bfcab2']);poly([project(-9.15,.02,wz-.8),project(-9.15,.02,wz+.8),project(-4.8,.02,wz+3.5),project(-4.8,.02,wz+1.9)],'#e8f3c912')}
    for(var shelf=0;shelf<3;shelf++){drawBox(-5.5,-7.6,.45+shelf*.65,5,.65,.1,['#cbb18b','#8d7754','#ae946a']);for(var j=0;j<4;j++){drawBox(-7+j*1.05,-7.55,.55+shelf*.65,.75,.55,.42,['#dec79e','#a2855a','#c0a071']);drawBox(-7+j*1.05,-7.25,.67+shelf*.65,.28,.025,.16,['#f5ecd5','#c6b58e','#e4d6b4'])}}
    for(var divider=-7;divider<2;divider+=2)drawBox(0,divider,.02,.22,1.75,.65,['#e5d6b8','#84977a','#bdc4a2']);
    drawBox(0,-7.8,.02,.3,.4,2.6,['#efe3c9','#92a184','#bfc9aa']);
    var logoGlow=project(2,1.7,-7.8);glow(logoGlow.x,logoGlow.y,unit*2.5,'#d2e9a716');
    plant(-8,7,0,1.5);plant(8,-7,0,1.8);
    for(var dash=-7;dash<=7;dash+=1.4)groundPatch(dash,8.5,.55,.06,'#cfd7b94d');
    for(var i=0;i<5;i++){var a=machinePos[i],b=machinePos[i+1],horizontal=a.z===b.z;
      drawBox((a.x+b.x)/2,(a.z+b.z)/2,.28,horizontal?Math.abs(b.x-a.x):1,horizontal?1:Math.abs(b.z-a.z),.16,['#6b8d77','#344d3e','#4e6b59']);
      for(var k=0;k<10;k++){var t=(k/10+(state.lines[i]>0?crateTime:0))%1;drawBox(a.x+(b.x-a.x)*t,a.z+(b.z-a.z)*t,.45,horizontal?.04:.8,horizontal?.8:.04,.02,['#b3c2ab','#617963','#819780'])}
    }
  }
  function transportItem(x,y,z,stage){
    var p=project(x,y,z),u=unit;
    if(stage===0||stage===1){
      var h=stage===0?.3:.62;
      worldLine([[x,y,z],[x,y+h,z]],'#547d43',.045);
      for(var leaf=0;leaf<(stage===0?1:3);leaf++){
        var q=project(x,y+.18+leaf*.17,z),r=u*(stage===0?.11:.16);
        ellipse(q.x-r*.65,q.y-r*.3,r,r*.55,leaf%2?'#99c16e':'#75a650');
        ellipse(q.x+r*.65,q.y-r*.6,r,r*.55,'#aad077');
      }
      drawBox(x,z,y-.07,.22,.2,.09,['#a18359','#645139','#867046']);
    }else if(stage===2){
      [[-.1,0,.13],[.09,-.04,.13],[0,-.16,.14]].forEach(function(b){ellipse(p.x+b[0]*u,p.y+b[1]*u,u*b[2],u*b[2]*1.15,'#84a55c')});
      ellipse(p.x+.055*u,p.y-.16*u,u*.035,u*.07,'#d9b47f');
    }else if(stage===3){
      drawBox(x,z,y,.3,.27,.4,['#c4dec4','#719883','#a1bea8']);
      drawBox(x,z,y+.4,.34,.31,.07,['#dacba0','#9a8c62','#c0b182']);
      drawBox(x,z+.143,y+.1,.22,.014,.16,['#f3efda','#f3efda','#f3efda']);
    }else{
      drawBox(x,z,y,.39,.26,.46,['#e0c796','#a38c61','#c7ac78']);
      worldLine([[x-.1,y+.46,z],[x-.1,y+.6,z],[x+.1,y+.6,z],[x+.1,y+.46,z]],'#987e50',.025);
      drawBox(x,z+.14,y+.12,.2,.018,.23,['#496f50','#496f50','#496f50']);bagAppIcon(x,z+.16,y+.12,.23);
    }
  }
  function floorPort(x,y,z){
    var p=project(x,y+.02,z);
    ellipse(p.x,p.y,unit*.6,unit*.29,'#b8c5b1');
    ellipse(p.x,p.y,unit*.46,unit*.21,'#263b31');
    [-1,1].forEach(function(side){ellipse(p.x+unit*.5*side,p.y,unit*.045,unit*.035,'#e0d5b3')});
  }
  function conveyorRun(x1,x2,z,y,stage){
    var length=Math.abs(x2-x1),mid=(x1+x2)/2,forward=x2>x1?1:-1;
    var steel=['#758d80','#344a40','#536c5b'];
    drawBox(mid,z,y-.18,length,.7,.16,steel);
    drawBox(mid,z,y-.01,length,.5,.035,['#334b40','#24382f','#2a4035']);
    [-.36,.36].forEach(function(dz){worldLine([[x1,y+.09,z+dz],[x2,y+.09,z+dz]],'#b6c7ad',.055)});
    var phase=state.lines[stage]>0&&!motionPreference.matches?crateTime:0;
    for(var slat=0;slat<Math.ceil(length/.23);slat++){
      var t=(slat*.23+phase*.7)%length,x=x1+forward*t;
      worldLine([[x,y+.03,z-.24],[x,y+.03,z+.24]],'#75927a',.035);
    }
    [x1+.2*forward,x2-.2*forward].forEach(function(x){drawBox(x,z,.06,.1,.5,Math.max(.1,y-.25),steel)});
    for(var pack=0;pack<2;pack++){
      var px=x1+(x2-x1)*((phase+pack*.5)%1);
      transportItem(px,y+.08,z,stage);
    }
  }
  function transferTube(points,stage,ports,cargoStage){
    // Round every elbow in world space so cargo follows the same smooth path.
    var path=[points[0]],radius=.48;
    function mix(a,b,t){return a.map(function(v,i){return v+(b[i]-v)*t})}
    for(var k=1;k<points.length-1;k++){
      var prev=points[k-1],corner=points[k],next=points[k+1];
      var before=mix(corner,prev,Math.min(.4,radius/Math.hypot.apply(null,prev.map(function(v,i){return v-corner[i]}))));
      var after=mix(corner,next,Math.min(.4,radius/Math.hypot.apply(null,next.map(function(v,i){return v-corner[i]}))));
      path.push(before);
      for(var sample=1;sample<=8;sample++){var t=sample/8;path.push(before.map(function(v,i){return (1-t)*(1-t)*v+2*(1-t)*t*corner[i]+t*t*after[i]}))}
    }
    path.push(points[points.length-1]);
    (ports||[]).forEach(function(p){floorPort(p[0],p[1],p[2])});
    // Transparent body: the room remains visible through the tube.
    worldLine(path,'#233e341a',.92);worldLine(path,'#233e343c',.78);worldLine(path,'#c5e6dd24',.68);
    function glassEdge(offset,color,width){
      var screenPath=path.map(function(p){return project(p[0],p[1],p[2])});
      ctx.beginPath();screenPath.forEach(function(p,i){var a=screenPath[Math.max(0,i-1)],b=screenPath[Math.min(screenPath.length-1,i+1)],dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy)||1;
        var x=p.x-dy/len*unit*offset,y=p.y+dx/len*unit*offset;if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y);
      });ctx.strokeStyle=color;ctx.lineWidth=unit*width;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();
    }
    glassEdge(-.35,'#e2f3e93a',.06);glassEdge(-.35,'#e2f3e980',.022);glassEdge(.35,'#456f6338',.07);glassEdge(.35,'#456f6370',.03);

    var segments=[],total=0;
    for(var n=1;n<path.length;n++){var a=path[n-1],b=path[n],len=Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2]);segments.push({a:a,b:b,len:len});total+=len}
    for(var parcel=0;parcel<3;parcel++){
      var distance=((parcel/3+(state.lines[stage]>0&&!motionPreference.matches?crateTime:0))%1)*total;
      for(var n=0;n<segments.length;n++){var part=segments[n];if(distance>part.len){distance-=part.len;continue}var t=distance/part.len,q=mix(part.a,part.b,t);transportItem(q[0],q[1]-.18,q[2],cargoStage===undefined?stage:cargoStage);break}
    }
    // Narrow glass reflection and restrained brass end couplings.
    worldLine(path,'#dcf3e814',.55);
    glassEdge(-.24,'#f5fff0b3',.05);glassEdge(.22,'#b9e4da5c',.024);
    [points[0],points[points.length-1]].forEach(function(p){var q=project(p[0],p[1],p[2]);ellipse(q.x,q.y,unit*.37,unit*.28,'#c3b789');ellipse(q.x,q.y,unit*.27,unit*.2,'#345e5066')});
  }
  function drawFloorTransfer(stage,upper){
    var port=stage===1?[5.4,9.4,-2]:[-.6,4.7,1];
    var route=stage===1?[[4.55,10.85,-3],[5.4,10.85,-3],[5.4,10.85,-2],[5.4,6.15,-2],[5.4,6.15,1],[4.55,6.15,1]]:[[-1.45,6.15,1],[-.6,6.15,1],[-.6,1.55,1],[4,1.55,1],[4,1.55,2.7]];
    var p=project(port[0],port[1],port[2]);
    if(upper)floorPort(port[0],port[1],port[2]);
    ctx.save();ctx.beginPath();
    if(upper)ctx.rect(-10000,-10000,20000,10000+p.y);
    else ctx.rect(-10000,p.y,20000,20000);
    ctx.clip();transferTube(route,stage,[],stage===3?4:stage);ctx.restore();
    if(upper){
      // The foreground half of the floor sleeve occludes the pipe at the opening.
      ctx.beginPath();ctx.ellipse(p.x,p.y,unit*.54,unit*.25,0,0,Math.PI);
      ctx.strokeStyle='#c4cfb9';ctx.lineWidth=unit*.11;ctx.stroke();
      ctx.beginPath();ctx.ellipse(p.x,p.y+unit*.09,unit*.54,unit*.25,0,0,Math.PI);
      ctx.strokeStyle='#6b8070';ctx.lineWidth=unit*.07;ctx.stroke();
    }
  }
  function archedServiceSign(x,label){
    var z=5.25,half=1.95,spring=2.7,rise=1.25;
    var oak=['#c7ad7e','#7d694b','#a38c64'];
    [-1,1].forEach(function(side){
      drawBox(x+side*half,z,.015,.42,.5,.15,oak);
      drawBox(x+side*half,z,.16,.15,.19,spring-.16,oak);
    });
    var arch=[];
    for(var step=0;step<=32;step++){
      var t=Math.PI-step*Math.PI/32;
      arch.push([x+Math.cos(t)*half,spring+Math.sin(t)*rise,z]);
    }
    worldLine(arch,'#6a654e',.2);worldLine(arch,'#bda979',.12);warmStrip(arch.map(function(p){return [p[0],p[1]-.07,p[2]+.07]}),false);
    var y=3.35,w=2.55,h=.55;
    var halo=project(x,y+h*.5,z);glow(halo.x,halo.y,unit*1.65,'#ffdb9460');
    drawBox(x,z,y,w,.16,h,['#aa9568','#203f31','#2d503c']);
    warmStrip([[x-w/2+.03,y+h-.025,z+.095],[x+w/2-.03,y+h-.025,z+.095]],false);
    worldLine([[x-w/2+.07,y+.06,z+.09],[x+w/2-.07,y+.06,z+.09]],'#c9b77e',.025);
    var p=project(x,y+h*.45,z+.1),axis=project(x+1,y+h*.45,z+.1),slope=(axis.y-p.y)/(axis.x-p.x);
    ctx.save();ctx.translate(p.x,p.y);ctx.transform(1,slope,0,1,0,0);
    ctx.shadowColor='#ffe8b6';ctx.shadowBlur=unit*.12;ctx.fillStyle='#fff5d9';ctx.font='600 '+Math.max(7,unit*.27)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,0,0,w*unit*.64);ctx.restore();
  }
  function onlinePackingCounter(now){
    var x=-10.7,z=1.5,oak=['#cbb085','#7f6a4b','#ac9168'],green=['#86a795','#3e6250','#648a70'];
    // Cantilevered launch deck, attached to the rear sign supports.
    var padZ=z-2.25,steel=['#526659','#253b30','#3a5142'];
    [-1.2,1.2].forEach(function(dx){
      drawBox(x+dx,z-1.05,.02,.12,.14,3.04,steel);
      worldLine([[x+dx,2.05,z-1.05],[x+dx,2.96,padZ-.65]],'#304638',.09);
    });
    drawBox(x,padZ,2.96,3.25,2.6,.16,steel);
    drawBox(x,padZ,3.12,3.04,2.38,.025,['#779080','#779080','#779080']);
    var ring=[];for(var r=0;r<=40;r++){var a=r/40*Math.PI*2;ring.push([x+Math.cos(a)*.85,3.15,padZ+Math.sin(a)*.85])}worldLine(ring,'#e5d8ab',.045);
    var leafOutline=[[0,.42],[-.18,.28],[-.51,.3],[-.34,.12],[-.67,-.08],[-.39,-.12],[-.52,-.5],[-.22,-.3],[0,-.78],[.22,-.3],[.52,-.5],[.39,-.12],[.67,-.08],[.34,.12],[.51,.3],[.18,.28],[0,.42]];
    worldLine(leafOutline.map(function(p){return[x+p[0],3.15,padZ+p[1]]}),'#eee4bd',.038);
    worldLine([[x,3.15,padZ+.42],[x,3.15,padZ+.65]],'#eee4bd',.038);
    [-1,1].forEach(function(dx){[-1,1].forEach(function(dz){var light=project(x+dx*1.4,3.17,padZ+dz*1.05);ellipse(light.x,light.y,unit*.065,unit*.035,'#c2e9a4')})});
    drawBox(x,z,-.24,4.4,3.8,.24,oak);
    drawPerson(x-.6,z-1.4,now,7,false,true,false);
    drawBox(x,z,.05,2.9,1.8,.95,green);drawBox(x,z,1,3.1,2,.14,['#ede4cb','#a79c81','#d2c5a5']);
    for(var n=0;n<3;n++)jar(x-1+n*.5,z-.3,1.15);
    warmStrip([[x-1.45,.18,z+.84],[x+1.45,.18,z+.84]],false);
    // Shipping carton, tape dispenser, label printer, and a small order monitor.
    carton(x+.65,z+.12,1.15,.7);
    drawBox(x+.65,z+.12,1.61,.13,.54,.025,['#efddb0','#b8a075','#d9c493']);
    drawBox(x-1,z+.5,1.15,.4,.35,.25,['#e8e4d4','#929c8b','#bac6b2']);
    drawBox(x-.9,z+.75,1.25,.23,.32,.025,['#faf6e5','#faf6e5','#faf6e5']);
    drawBox(x+.85,z-.6,1.15,.75,.14,.6,green);
    drawBox(x+.85,z-.515,1.28,.58,.025,.35,['#badabb','#badabb','#badabb']);
    for(var n=0;n<2;n++)carton(x+1.6,z-.8+n*.6,.02,.48);
    // Oak-framed fascia integrated into the packing counter's rear uprights.
    [-1.48,1.48].forEach(function(dx){drawBox(x+dx,z-.78,1.13,.1,.12,1.75,oak)});
    var onlineHalo=project(x,2.56,z-.65);glow(onlineHalo.x,onlineHalo.y,unit*1.8,'#ffdb9450');
    drawBox(x,z-.78,2.25,3.15,.18,.65,oak);
    warmStrip([[x-1.48,2.88,z-.65],[x+1.48,2.88,z-.65]],false);
    drawBox(x,z-.674,2.31,2.97,.025,.51,['#355d49','#294836','#355d49']);
    worldLine([[x-1.4,2.29,z-.64],[x+1.4,2.29,z-.64]],'#ecd39c',.027);
    var sign=project(x,2.55,z-.64),axis=project(x+1,2.55,z-.64);
    ctx.save();ctx.translate(sign.x,sign.y);ctx.transform(1,(axis.y-sign.y)/(axis.x-sign.x),0,1,0,0);
    ctx.shadowColor='#ffe8b6';ctx.shadowBlur=unit*.1;ctx.fillStyle='#fff5d9';ctx.font='600 '+Math.max(7,unit*.235)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('ONLINE ORDERS',0,0,unit*2.3);ctx.restore();
    var status=project(x+.85,1.5,z-.49);ellipse(status.x,status.y,unit*.065,unit*.065,state.stock[3]>=onlineSize()?'#b7e394':'#d7b775');
    
    var stockPin=project(x,1.25,z+.3);ctx.fillStyle='#b9e2d7';ctx.font='600 '+Math.max(8,unit*.22)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.fillText(state.stock[3]+' available',stockPin.x,stockPin.y-unit*.12);ctx.fillStyle='#20392d';ctx.fillRect(stockPin.x-unit*.55,stockPin.y,unit*1.1,unit*.12);ctx.fillStyle='#a9d2c8';ctx.fillRect(stockPin.x-unit*.55,stockPin.y,unit*1.1*Math.min(1,state.stock[3]/onlineSize()),unit*.12);
    // Its own feed branch carries packed jars from the packing station.
    transferTube([[-4.55,-.9,1],[-7.4,-.9,1],[-7.4,1.5,1.5],[-9.05,1.5,1.5]],3);
  }
  function retailDetails(fi,rear){
    var oak=['#cfb184','#836949','#b09266'],stone=['#e2dfd0','#969c8e','#c3c8b8'],brass=['#d7c28b','#8c774c','#b7a16c'];
    if(fi===0){
      // Cream columns with forest-green tile bases and brass wall sconces.
      [-10.8,9.8].forEach(function(cx){
        var cz=-1.8;
        drawBox(cx,cz,0,.75,.7,4.25,['#f2edda','#c1bdac','#e1ddca']);
        drawBox(cx,cz,.08,.78,.73,1.65,['#37634d','#153c2d','#25523b']);
        for(var tile=0;tile<5;tile++)worldLine([[cx-.36+tile*.18,.1,cz+.375],[cx-.36+tile*.18,1.72,cz+.375]],'#d7d7b4',.016);
        for(var grout=0;grout<5;grout++)worldLine([[cx-.38,.1+grout*.4,cz+.38],[cx+.38,.1+grout*.4,cz+.38]],'#d7d7b4',.016);
        drawBox(cx,cz+.01,1.73,.8,.76,.12,['#e1dbc0','#b5b29d','#d8d2b8']);
        var lamp=project(cx,2.6,cz+.42);ellipse(lamp.x,lamp.y,unit*.17,unit*.3,'#c4aa70');ellipse(lamp.x,lamp.y,unit*.12,unit*.24,'#fff2c8');
      });
      // Small terracotta stools add the warm accent from the reference.
      [0,1].forEach(function(n){var sx=-8.4+n*.9,sz=.5;
        drawBox(sx,sz,.8,.6,.55,.12,['#c78366','#824c3f','#ad6652']);
        [-.22,.22].forEach(function(dx){worldLine([[sx+dx,.05,sz-.19],[sx+dx,.8,sz-.19]],'#ac6650',.06);worldLine([[sx+dx,.05,sz+.19],[sx+dx,.8,sz+.19]],'#ac6650',.06)});
      });
    }
    // Stocked glass islands: staggered sizes and pale labels read as a curated shop.
    if(fi===0){
      [-1.5,2.1].forEach(function(x,display){
        var z=-.6-display*.7;
        drawBox(x,z,0,2.2,1.1,1.05,oak);
        for(var flute=0;flute<12;flute++)worldLine([[x-1+flute*.18,.1,z+.56],[x-1+flute*.18,.95,z+.56]],'#6f593b35',.018);
        drawBox(x,z,1.06,2.34,1.2,.1,stone);
        for(var n=0;n<5;n++){jar(x-.85+n*.42,z,1.17);drawBox(x-.85+n*.42,z+.42,1.18,.25,.16,.02,['#f7f2de','#d4cab3','#e9dfc9'])}
        drawBox(x,z,1.18,2.3,1.12,.66,['#d9eee31d','#b3d4c41b','#c7e5d329']);
        worldLine([[x-1.14,1.2,z+.57],[x-1.14,1.86,z+.57],[x+1.14,1.86,z+.57],[x+1.14,1.2,z+.57]],'#c7ddc6',.025);
        worldLine([[x-1.05,1.04,z+.61],[x+1.05,1.04,z+.61]],'#ffdf9e',.035);
      });

    }
    // Layered backlit merchandise bays on each floor.
    var bx=fi===0?6:fi===1?3:-4.6;
    drawBox(bx,rear+.35,.1,2.3,.55,2.6,oak);
    for(var row=0;row<3;row++){
      drawBox(bx,rear+.65,.48+row*.72,2.35,.7,.07,brass);
      worldLine([[bx-1.05,.57+row*.72,rear+.97],[bx+1.05,.57+row*.72,rear+.97]],'#ffe6ae',.028);
      for(var product=0;product<6;product++){
        var color=['#92ad8b','#d5bd8c','#b1c6c1'][product%3];
        drawBox(bx-.95+product*.38,rear+.66,.56+row*.72,.25,.25,.27+(product%2)*.12,[color,'#65765e',color]);
        drawBox(bx-.95+product*.38,rear+.798,.65+row*.72,.15,.012,.1,['#f4efd8','#f4efd8','#f4efd8']);
      }
    }
    // A playful arch boutique on the open side wall of the processing floor.
    if(fi===1){
      var az=1.2,ax=-8.75;
      for(var alcove=0;alcove<2;alcove++){
        var zz=az-alcove*2.4,shape=[];
        shape.push(project(ax,.15,zz-1));shape.push(project(ax,2.3,zz-1));
        for(var arc=0;arc<=16;arc++){var t=Math.PI-arc/16*Math.PI;shape.push(project(ax,2.3+Math.sin(t),zz+Math.cos(t)))}
        shape.push(project(ax,.15,zz+1));poly(shape,'#d3a888','#62796f');
        var frame=[];frame.push([ax,.15,zz-1]);frame.push([ax,2.3,zz-1]);
        for(var arc=0;arc<=20;arc++){var t=Math.PI-arc/20*Math.PI;frame.push([ax,2.3+Math.sin(t),zz+Math.cos(t)])}
        frame.push([ax,.15,zz+1]);worldLine(frame,'#859c94',.13);
        for(var shelf=0;shelf<3;shelf++){
          drawBox(ax+.25,zz,.5+shelf*.7,.55,1.8,.08,['#ecdbc1','#a58d72','#cfb79a']);
          // Eighteen display positions represent the current packed-jar capacity.
          var filledSlots=Math.min(18,state.stock[3]/storageCapacity()*18);
          for(var item=0;item<3;item++){
            var slot=shelf*6+alcove*3+item,fill=Math.max(0,Math.min(1,filledSlots-slot));
            if(fill>0){ctx.save();ctx.globalAlpha=fill;jar(ax+.27,zz-.6+item*.6,.59+shelf*.7);ctx.restore()}
          }
        }
      }
    }
    // Round illuminated curiosity cabinets add a collectible-shop character.
    if(fi===2){
      for(var niche=0;niche<3;niche++){
        var nx=2.3+niche*1.05,ny=1.45+(niche%2)*.8;
        drawBox(nx,rear+.23,ny-.48,.94,.3,1,['#b8a382','#736851','#96866a']);
        var np=project(nx,ny,rear+.4);ellipse(np.x,np.y,unit*.35,unit*.38,'#e5ce89');ellipse(np.x,np.y,unit*.27,unit*.3,'#5a7055');
        jar(nx,rear+.45,ny-.2);
      }
    }
    if(fi===0){
      // Richly varied moss behind the lounge, with a small botanical light motif.
      drawBox(-9.7,-1.1,.8,.16,3.1,2.35,['#a68d62','#3a5740','#527d47']);
      for(var moss=0;moss<36;moss++){
        var mp=project(-9.58,1+(moss%6)*.36,-2.45+Math.floor(moss/6)*.5);
        ellipse(mp.x,mp.y,unit*(.14+(moss%3)*.035),unit*.18,['#7ea558','#527d46','#a0b86a'][moss%3]);
      }
      // A rounded terracotta display plinth offers a splash of color.
      var pedestal=project(6.7,.7,2.5);drawBox(6.7,2.5,0,1.15,1.1,.7,['#dba588','#966955','#be8b70']);
      ellipse(pedestal.x,pedestal.y,unit*.68,unit*.33,'#e8ba91');plant(6.7,2.5,.72,.75);
    }
    // Hanging planters and fine trails sit against the back wall, leaving sightlines open.
    for(var basket=0;basket<2;basket++){
      var hx=fi===2?(-2+basket*4):(-7+basket*12),hz=rear+.9;
      worldLine([[hx,3.85,hz],[hx,3.1,hz]],'#343f33',.022);
      drawBox(hx,hz,2.85,.58,.5,.3,['#b6ac8a','#615e4a','#8c8667']);
      for(var vine=0;vine<5;vine++){
        var vx=hx-.24+vine*.12,drop=.48+(vine%3)*.18;
        worldLine([[vx,3.02,hz+.26],[vx+.08,2.65,hz+.3],[vx-.04,2.85-drop,hz+.32]],'#65844e',.022);
        for(var tip=0;tip<3;tip++){var vp=project(vx+(tip%2?.08:-.03),2.85-tip*drop/3,hz+.32);ellipse(vp.x,vp.y,unit*.075,unit*.11,tip%2?'#a0bb71':'#7b9b5b')}
      }
    }
  }
  var groundCache=null;
  function drawCachedGround(floor){
    var key=[width,height,dpr,unit,centerX,centerY,angle,stationTier(4),stationTier(5)].join(':');
    if(typeof OffscreenCanvas==='undefined'){paintGround();return}
    if(!groundCache||groundCache.key!==key){
      var surface=new OffscreenCanvas(Math.ceil(width*dpr),Math.ceil(height*dpr)),mainContext=ctx;
      ctx=surface.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);
      try{paintGround()}finally{ctx=mainContext}
      groundCache={key:key,surface:surface};
    }
    ctx.drawImage(groundCache.surface,0,0,width,height);
    function paintGround(){
        var retailTier=Math.min(stationTier(4),stationTier(5));
        drawBox(0,floor.z,-.24,floor.w,floor.d,.24,retailTier>=2?['#cecdb8','#858879','#aaa995']:['#d7bc91','#8e7859','#b8a07a']);
        if(retailTier>=1)for(var tileX=-10;tileX<=10;tileX+=2)for(var tileZ=-6;tileZ<10;tileZ+=2){groundPatch(tileX,tileZ,1.97,1.97,(tileX+tileZ)%4===0?'#dcd6bd':'#d1cbb2')}
    }
  }
  function drawTower(now){
    sceneElevation=0;
    ctx.fillStyle='#424b43';ctx.fillRect(0,0,width,height);
    var stone=['#c9c7b5','#737c70','#9fa796'],wood=['#bc9d73','#6f5943','#998063'],green=['#698775','#314b40','#496a56'],metal=['#414440','#191e1c','#2b302d'];
    var shade=project(1,0,1);glow(shade.x,shade.y,unit*16,'#d7c39118');
    poly([project(-13,-.5,-8),project(14,-.5,-8),project(16,-.5,12),project(-9,-.5,12)],'#17231d45');
    drawBox(0,1,-.32,26,20,.32,stone);
    // Rear circulation is painted before the building so people pass behind its walls.
    customers.forEach(function(c){if(customerBehindBuilding(c)){var v=Object.assign({},c,{x:c.renderX===undefined?c.x:c.renderX,z:c.renderZ===undefined?c.z:c.renderZ});drawCustomer(v,now)}});
    // Three open rooms. Only the rear and short side walls remain in the cutaway.
    [{y:0,z:1.5,w:23,d:17,ids:[4,5]},{y:4.7,z:-1.8,w:18,d:9.7,ids:[3,2]},{y:9.4,z:-3.6,w:13,d:6.6,ids:[0,1]}].forEach(function(floor,fi){
      sceneElevation=floor.y;
      var rear=floor.z-floor.d/2,front=floor.z+floor.d/2,left=-floor.w/2,right=floor.w/2;
      if(fi===2){
        // Draw the suspended foliage before the slab so the floor occludes its crown.
        sceneElevation=0;
        // One broad hanging canopy, suspended from the center of the top-floor soffit.
        var canopyX=0,canopyZ=-1.35;
        [-1.7,1.7].forEach(function(dx){worldLine([[canopyX+dx,9.15,canopyZ],[canopyX+dx,8.83,canopyZ]],'#8c9570',.035)});
        drawBox(canopyX,canopyZ,8.72,4.6,1.05,.14,['#64764e','#394d35','#4c613e']);
        // Overlapping foliage hides the support and forms an irregular, full crown.
        for(var crown=0;crown<38;crown++){
          var cx=canopyX-2.45+(crown%13)*.4,cz=canopyZ-.54+Math.floor(crown/13)*.48;
          var cy=8.82+Math.sin(crown*2.3)*.1,q=project(cx,cy,cz);
          ellipse(q.x,q.y,unit*(.27+(crown%3)*.04),unit*.17,['#668649','#7f9d52','#526f3e','#95ad62'][crown%4]);
        }
        for(var vine=0;vine<25;vine++){
          var dx=-2.3+vine*.19,vz=canopyZ+.4+(vine%3)*.11;
          var length=.65+(1-Math.abs(dx)/2.7)*.85+(Math.sin(vine*2.4)+1)*.21;
          worldLine([[canopyX+dx,8.8,vz],[canopyX+dx+.08,8.25,vz+.05],[canopyX+dx-.12,8.8-length,vz+.13]],'#4f703d',.033);
          for(var leaf=0;leaf<9;leaf++){
            var h=8.78-leaf*length/9,side=leaf%2?-1:1;
            var q=project(canopyX+dx+Math.sin(leaf*.8+vine)*.08+side*.09,h,vz+.1);
            ellipse(q.x,q.y,unit*(.12-leaf*.003),unit*.085,['#9cb765','#789b4f','#567b3f','#87a858'][(leaf+vine)%4]);
          }
        }
        sceneElevation=floor.y;
      }
      if(fi===0)drawCachedGround(floor);

      else{
        // One continuous floor outline includes the stair landing, with no internal slab edge.
        var landing=fi===1?{outer:10.85,back:-1.58,front:-.37}:{outer:8.65,back:-5.58,front:-4.47};
        var finish=fi===1?wood:stone;
        var outline=[[left,rear],[right,rear],[right,landing.back],[landing.outer,landing.back],[landing.outer,landing.front],[right,landing.front],[right,front],[left,front]];
        for(var edge=0;edge<outline.length;edge++){
          var a=outline[edge],b=outline[(edge+1)%outline.length];
          if((b[0]===a[0]&&b[1]>a[1])||(b[1]===a[1]&&b[0]<a[0]))poly([project(a[0],-.24,a[1]),project(b[0],-.24,b[1]),project(b[0],0,b[1]),project(a[0],0,a[1])],b[0]===a[0]?finish[2]:finish[1]);
        }
        poly(outline.map(function(p){return project(p[0],0,p[1])}),finish[0]);
      }
      if(fi>0){
        // Warm oak fascia with a slim black steel edge beneath each mezzanine.
        drawBox(0,front+.015,-.23,floor.w,.16,.19,['#bb9366','#785438','#a57b50']);
        drawBox(0,front+.035,-.27,floor.w,.18,.045,metal);
        for(var grain=0;grain<3;grain++)worldLine([[left+.1,-.18+grain*.044,front+.1],[right-.1,-.18+grain*.044,front+.1]],'#d0ac793c',.012);
      }
      if(fi===0){
        // Pale tile borders frame an oak aisle and the customer service zone.
        drawBox(0,6.5,.002,15.6,7,.018,['#dce0ca','#bcc5b1','#ccd5bf']);
        for(var grout=0;grout<31;grout++)worldLine([[-7.7+grout*.5,.025,3],[-7.7+grout*.5,.025,10]],'#a6b7a126',.014);
        for(var row=0;row<15;row++)worldLine([[-7.8,.025,3+row*.5],[7.8,.025,3+row*.5]],'#a6b7a126',.014);
      }
      // Material seams, a rear forest-green wall, and warm recessed strip lighting.
      for(var seam=left+.8;seam<right;seam+=.9)worldLine([[seam,.015,rear],[seam,.015,front]],fi===1?'#71593b18':'#72796c12',.014);
      drawBox(fi===0?-1.225:0,rear,0,fi===0?20.55:floor.w,.2,3.9,fi===0?['#f1ebd8','#c0bba8','#ddd8c3']:green);
      drawBox(left,rear+1.7,0,.18,3.6,3.9,fi===0?['#f1ebd8','#c0bba8','#ddd8c3']:green);
      if(fi===0){
        // Half-height glazed tile wainscot, beneath the existing cream plaster.
        drawBox(-1.225,rear+.125,.06,20.37,.055,1.72,['#537867','#244a3d','#365e4c']);
        for(var tileX=left+.15;tileX<9.05-.1;tileX+=.27)worldLine([[tileX,.08,rear+.16],[tileX,1.77,rear+.16]],'#cbd2b2',.016);
        [.62,1.19].forEach(function(y){worldLine([[left+.1,y,rear+.16],[9.05-.1,y,rear+.16]],'#cbd2b2',.016)});
        drawBox(-1.225,rear+.14,0,20.37,.08,.13,['#354039','#202e27','#29392f']);
        drawBox(-1.225,rear+.15,1.78,20.37,.085,.16,['#e6ddbc','#b9b999','#d5d1ae']);
        for(var mosaicX=left+.18;mosaicX<9.05-.12;mosaicX+=.18)drawBox(mosaicX,rear+.2,1.81,.09,.018,.075,['#345441','#345441','#345441']);
        worldLine([[left+.08,1.96,rear+.2],[9.05-.08,1.96,rear+.2]],'#c6af79',.04);
      }
      worldLine([[left+.3,3.6,rear+.14],[fi===0?8.95:right-.3,3.6,rear+.14]],'#f5dfaa',.065);
      var light=project(0,2.5,rear+.3);glow(light.x,light.y,unit*5,'#f7d58b20');
      // Ambient occlusion where the floor meets the walls, and under the mezzanine above.
      shadowBand(left+.2,fi===0?9:right-.2,rear+.2,rear+1.9,.018,.2);
      shadowBandX(rear+.2,front-.2,left+.2,left+1.4,.018,.15);
      if(fi===0){poly([project(-9,.016,rear+.2),project(9,.016,rear+.2),project(9,.016,3.05),project(-9,.016,3.05)],'rgba(14,28,20,.07)');shadowBand(-9,9,3.05,1.3,.017,.12)}
      if(fi===1){poly([project(-6.5,.016,rear+.2),project(6.5,.016,rear+.2),project(6.5,.016,-.3),project(-6.5,.016,-.3)],'rgba(14,28,20,.07)');shadowBand(-6.5,6.5,-.3,-1.9,.017,.12)}
      if(fi!==0){
      // Black-framed glass along the rear-right corner, not across the open front.
      poly([project(right,0,rear),project(right,0,rear+3),project(right,3.8,rear+3),project(right,3.8,rear)],'#adc7b21b');
      for(var mull=0;mull<4;mull++)worldLine([[right,0,rear+mull],[right,3.8,rear+mull]],'#263a32',.065);
      worldLine([[right,3.8,rear],[right,3.8,rear+3]],'#252b28',.07);
      }
      if(fi===2){
        var artX=left+.13,artZ=rear+1.8;
        drawBox(artX,artZ,1.35,.1,1.25,1.6,wood);
        drawBox(artX+.06,artZ,1.44,.025,1.07,1.42,['#e4dbc0','#c2b69a','#ded4b7']);
        worldLine([[artX+.08,1.62,artZ],[artX+.08,2.65,artZ]],'#476746',.035);
        for(var leaf=0;leaf<4;leaf++)[-1,1].forEach(function(dir){var y=1.8+leaf*.22;poly([project(artX+.08,y,artZ),project(artX+.08,y+.17,artZ+dir*.3),project(artX+.08,y+.04,artZ+dir*.36),project(artX+.08,y-.025,artZ+dir*.13)],'#718b52')});
      }
      if(fi===1){
        // Side-wall displays face into the room: oak shelves on black steel uprights.
        var sideX=left+.24,sideZ=rear+1.8;
        [-1.3,1.3].forEach(function(dz){drawBox(sideX,sideZ+dz,.35,.09,.08,2.85,metal)});
        [.62,1.55].forEach(function(y,row){
          drawBox(sideX+.19,sideZ,y,.58,2.8,.12,wood);
          worldLine([[sideX+.49,y+.12,sideZ-1.3],[sideX+.49,y+.12,sideZ+1.3]],'#ecd8a1',.025);
          for(var item=0;item<4;item++){
            var iz=sideZ-1.02+item*.67;
            if((item+row+fi)%3===0)plant(sideX+.2,iz,y+.12,.43);
            else if(row===0)jar(sideX+.2,iz,y+.12);
            else carton(sideX+.2,iz,y+.12,.36);
          }
        });
        // Two framed botanical studies above the shelves, oriented to the side wall.
        [-.68,.68].forEach(function(dz,index){
          var fz=sideZ+dz;
          drawBox(sideX,fz,2.32,.11,1.02,.96,wood);
          drawBox(sideX+.063,fz,2.39,.025,.88,.81,['#e4dbc0','#c2b69a','#ded4b7']);
          var fx=sideX+.084;
          worldLine([[fx,2.48,fz],[fx,3.09,fz]],'#476746',.026);
          for(var leaf=0;leaf<3;leaf++){
            var ly=2.59+leaf*.17;
            [-1,1].forEach(function(dir){poly([project(fx,ly,fz),project(fx,ly+.13,fz+dir*.23),project(fx,ly+.03,fz+dir*.28),project(fx,ly-.035,fz+dir*.1)],(index+leaf)%2?'#789257':'#567849')});
          }
        });
      }
      // Built-in timber shelving with jars, cartons, and plants.
      var shelfX=fi===0?-6:fi===1?-5:0;
      drawBox(shelfX,rear+.12,.1,4.35,.18,3.25,['#c6a267','#82633e','#ac884f']);
      for(var shelf=0;shelf<3;shelf++){
        drawBox(shelfX,rear+.5,.6+shelf*.85,4.2,.85,.12,wood);
        warmStrip([[shelfX-2,.71+shelf*.85,rear+.91],[shelfX+2,.71+shelf*.85,rear+.91]],false);
        for(var item=0;item<5;item++)if((item+shelf)%3)jar(shelfX-1.6+item*.8,rear+.5,.73+shelf*.85);else carton(shelfX-1.6+item*.8,rear+.5,.73+shelf*.85,.4);
      }
      // Cabinet partitions occlude the shelf ends and products behind their faces.
      for(var cubby=4;cubby>=0;cubby--)drawBox(shelfX-2.1+cubby*1.05,rear+.55,.1,.06,.82,3.17,wood);
      [2.1,-2.1].forEach(function(dx){drawBox(shelfX+dx,rear+.5,0,.09,.86,3.3,wood)});
      if(fi===0){
        // Built-in product wall directly behind the service counters, under the mezzanine.
        var displayZ=-2.6;
        drawBox(0,displayZ,0,13.4,.32,3.95,green);
        drawBox(0,displayZ+.22,.04,13.4,.75,.62,wood);
        for(var bay=0;bay<5;bay++){
          var bx=-5.2+bay*2.6;
          drawBox(bx,displayZ+.61,.15,2.42,.05,.43,['#d1b58b','#957448','#b99b6e']);
          for(var batten=0;batten<10;batten++)drawBox(bx-1.1+batten*.245,displayZ+.65,.17,.1,.055,.38,['#caa16c','#805a39','#ac8151']);
          worldLine([[bx-.22,.46,displayZ+.65],[bx+.22,.46,displayZ+.65]],'#dec48c',.055);
          for(var row=0;row<4;row++){
            var sy=.7+row*.76;
            drawBox(bx,displayZ+.25,sy,2.55,.8,.1,wood);
            warmStrip([[bx-1.18,sy+.12,displayZ+.67],[bx+1.18,sy+.12,displayZ+.67]],false);if(stationTier(4)>=2){var shelfLight=project(bx,sy+.2,displayZ+.3);glow(shelfLight.x,shelfLight.y,unit*1.05,'#f4d2952a')}
            for(var product=0;product<3;product++){
              var xx=bx-.78+product*.78;
              if(bay===1||bay===3)merchandise(xx,displayZ+.3,sy+.12,(row+product)%3,['#527e60','#b28b64','#75999a'][product]);
              else if((bay+row)%3===0)carton(xx,displayZ+.3,sy+.12,.43);
              else jar(xx,displayZ+.3,sy+.12);
            }
          }
        }
        for(var divider=0;divider<6;divider++)drawBox(-6.5+divider*2.6,displayZ+.23,.65,.09,.82,3.16,metal);
        drawBox(0,displayZ+.22,3.8,13.45,.84,.16,wood);
        // Ground-floor lounge and an open retail display area.
        drawBox(-8,-.6,.1,3.2,1.3,.55,metal);drawBox(-8,-1.18,.65,3.2,.22,.65,green);
        [-9,-7].forEach(function(x){drawBox(x,-.55,.67,.92,.95,.15,green)});
        drawBox(-7.6,1.35,.1,1.6,.9,.55,wood);
      }
      if(fi===2){
        // Low L-shaped planter fitted into the left corner of the mezzanine.
        var planterX=left+.57,planterZ=front-1.05;
        drawBox(planterX,planterZ,0,.95,1.8,.56,wood);
        drawBox(planterX+.67,planterZ+.45,0,1.35,.9,.56,wood);
        drawBox(planterX,planterZ,.56,1.03,1.88,.075,metal);
        drawBox(planterX+.67,planterZ+.45,.56,1.43,.98,.075,metal);
        drawBox(planterX,planterZ,.635,.78,1.61,.025,['#514633','#514633','#514633']);
        drawBox(planterX+.67,planterZ+.45,.635,1.16,.7,.025,['#514633','#514633','#514633']);
        [[planterX,planterZ-.52,.62],[planterX,planterZ+.1,.76],[planterX+.75,planterZ+.45,.56]].forEach(function(p){
          worldLine([[p[0],.65,p[1]],[p[0],.65+p[2],p[1]]],'#5e7e45',.035);
          for(var leaf=0;leaf<5;leaf++){var angle=leaf*2.4,q=project(p[0]+Math.cos(angle)*.23,.83+leaf*.11,p[1]+Math.sin(angle)*.19);ellipse(q.x,q.y,unit*.18,unit*.1,leaf%2?'#8eae64':'#64894e')}
        });
      }
      if(fi===1){
        // Packing supplies and a softly lit interior work area.
        for(var box=0;box<4;box++)carton(5.5+(box%2)*.7,-4+Math.floor(box/2)*.7,0,.6);
        drawBox(2.4,-5.8,0,.16,1.7,2.9,green);plant(7,-3,0,1.4);
      }
      if(fi===2)plant(4.4,-5.6,0,.75);
      // Oak trims and planted wall panels.
      worldLine([[left+.2,2.95,rear+.18],[fi===0?8.95:right-.2,2.95,rear+.18]],'#b7986a',.11);
      // Concealed strips along the wall trim and the exposed mezzanine fascia.
      warmStrip([[left+.35,2.87,rear+.25],[fi===0?8.6:right-.35,2.87,rear+.25]],fi===2);
      if(fi>0)warmStrip([[left+.2,-.08,front+.025],[right-.2,-.08,front+.025]],false);
      if(fi===1){
      drawBox(right-1.05,rear+.18,.4,1.45,.08,2.3,['#536b42','#2e4835','#405c3b']);
      for(var leaf=0;leaf<18;leaf++){var lp=project(right-1.6+(leaf%3)*.47,.6+Math.floor(leaf/3)*.35,rear+.25);ellipse(lp.x,lp.y,unit*.22,unit*.18,leaf%3===0?'#86a85c':leaf%3===1?'#587e49':'#6c9550')}
      }
      if(fi<2)retailDetails(fi,rear);

      // Short roller belts carry products directly between neighboring stations.
      if(fi===2)conveyorRun(-1.45,1.45,-3,1.35,0);
      if(fi===1)conveyorRun(1.45,-1.45,1,1.35,2);
      floor.ids.forEach(function(i){var p=machinePos[i];lightPool(p.x,.035,p.z+.9,1.65,i===1)});
      // Furniture stays visible in front of the back wall and shelving.
      floor.ids.forEach(function(i){if(i===5)drawCounterDivider();var p=machinePos[i];drawPerson(p.x-.95,p.z-1.65,now,i,false,true,false);drawStage(p,i,now);if(selected===i)selectionRing(p)});
      // Thin mezzanine guard rails stop short of the workstation fronts.
      if(fi>0){
        var rz=front-.1;
        [-floor.w/2,-floor.w/2+2,floor.w/2-2,floor.w/2].forEach(function(x){worldLine([[x,0,rz],[x,.95,rz]],'#252b28',.055)});
        [[left,left+2],[right-2,right]].forEach(function(pair){worldLine([[pair[0],.95,rz],[pair[1],.95,rz]],'#252b28',.055)});
      }
      sceneElevation=0;
      // Draw outgoing runs before the next slab, which naturally hides the buried section.
      if(fi===0)drawFloorTransfer(3,false);
      if(fi===1){
        drawFloorTransfer(3,true);drawFloorTransfer(1,false);
        drawBox(-12.5,3,0,.14,.14,6.81,metal);
        // The inner support lands on the second-floor slab.
        drawBox(-8.9,3,4.7,.14,.14,2.11,metal);
        sceneElevation=7.05;onlinePackingCounter(now);sceneElevation=0;
      }
      if(fi===2){
        drawFloorTransfer(1,true);

      }
    });
    // Illuminated stair flights connect the open floors at the right-hand edge.
    [{x:10,y:0,z:5},{x:7.8,y:4.7,z:1}].forEach(function(stair){
      for(var step=0;step<14;step++){
        var sy=stair.y+step*4.7/14,sz=stair.z-step*.43;
        drawBox(stair.x,sz,sy,1.7,.45,.16,wood);
        if(step%2===0){warmStrip([[stair.x-.72,sy+.17,sz+.21],[stair.x+.72,sy+.17,sz+.21]],false);lightPool(stair.x,sy+.18,sz,.5,false)}else worldLine([[stair.x-.76,sy+.17,sz+.21],[stair.x+.76,sy+.17,sz+.21]],'#d5be91',.025);
      }
      [-.92,.92].forEach(function(dx){worldLine([[stair.x+dx,stair.y+.9,stair.z],[stair.x+dx,stair.y+5.6,stair.z-5.8]],'#252b28',.07)});
    });
    // Slim structural posts support the open mezzanines.
    [[-8.8,-5.7,9.1],[8.8,-5.7,4.5],[6.3,-6.7,9.2]].forEach(function(p){drawBox(p[0],p[1],0,.16,.16,p[2],metal)});
    // Enclosed gravity transfers bridge each floor without crossing the stairs.
    archedServiceSign(-4,'ORDER');archedServiceSign(4,'PICKUP');
    // Street-level queue markings and low entry planters retain the service route.
    var waiting=customers.filter(function(c){return !c.ordered&&c.phase!=='leaving'}).length;
    for(var place=0;place<Math.min(12,queueLimit());place++){var row=Math.floor(place/4),slot=place%4;groundPatch(-4-(row%2?3-slot:slot)*.7,6.4+row*1.2,.3,.06,place<waiting?'#dfcb99':'#7d8f78')}

  }
  function addIllustratedDetails(jobs){
    function add(x,z,draw){jobs.push({depth:depthOf({x:x,z:z}),draw:draw})}
    var cream=['#f2ecd5','#a9a790','#d9d6bd'],blue=['#7eb0c3','#426a81','#5894b1'];
    // Small utility fixtures and stable wear marks give the cutaway the reference's lived-in feel.
    add(6.7,-7.65,function(){
      drawBox(6.7,-7.65,2.65,2.05,.9,.85,cream);
      var fan=project(6.35,3.08,-7.18);ellipse(fan.x,fan.y,unit*.26,unit*.26,'#455250');ellipse(fan.x,fan.y,unit*.14,unit*.14,'#b7c2ac');
      for(var vent=0;vent<4;vent++)worldLine([[7,2.85+vent*.13,-7.18],[7.45,2.85+vent*.13,-7.18]],'#565e54',.028);
      worldLine([[7.55,2.74,-7.2],[7.75,2.42,-7.2],[7.75,1.75,-7.2],[8.7,1.75,-7.2]],'#374641',.09);
      worldLine([[7.55,2.74,-7.2],[7.75,2.42,-7.2],[7.75,1.75,-7.2],[8.7,1.75,-7.2]],'#b7c4a7',.04);
    });
    add(-9.3,-4.1,function(){
      drawBox(-9.23,-4.1,2.38,.35,2.5,.1,blue);
      for(var strip=0;strip<5;strip++)worldLine([[-9.05,2.39,-5.15+strip*.49],[-8.7,2.13,-5.15+strip*.49]],'#3d5150',.026);
    });
    add(10,3.5,function(){
      drawBox(10,3.5,.05,1.3,1,2.5,blue);drawBox(10,4.015,.55,1.01,.035,1.5,cream);
      for(var row=0;row<3;row++){for(var col=0;col<3;col++){drawBox(9.65+col*.34,4.04,.7+row*.42,.2,.025,.28,[col%2?'#9bc0a6':'#d6b49d','#8e9a83',col%2?'#9bc0a6':'#d6b49d'])}worldLine([[9.54,.64+row*.42,4.06],[10.46,.64+row*.42,4.06]],'#485449',.027)}
      drawBox(10,4.03,.27,.7,.04,.16,['#283d43','#283d43','#283d43']);
    });
    add(11.6,-.8,function(){
      drawBox(11.6,-.8,0,1.25,1.25,.9,['#b2947a','#775e56','#96776a']);worldLine([[11.6,.9,-.8],[11.6,2.55,-.8]],'#655d3d',.13);
      var crown=project(11.6,2.85,-.8);for(var n=0;n<7;n++){var a=n*2.4;ellipse(crown.x+Math.cos(a)*unit*.48,crown.y+Math.sin(a)*unit*.38,unit*.48,unit*.42,n%2?'#77af6c':'#549b62')}
      for(var n=0;n<5;n++){var a=n*2.2;ellipse(crown.x+Math.cos(a)*unit*.44,crown.y+Math.sin(a)*unit*.35,unit*.065,unit*.065,'#eac66e')}
    });
    add(-.4,-7.7,function(){
      var p=project(-.4,2.02,-7.7);ellipse(p.x,p.y,unit*.32,unit*.32,'#eee7cc');ctx.beginPath();ctx.moveTo(p.x,p.y-unit*.2);ctx.lineTo(p.x,p.y);ctx.lineTo(p.x+unit*.15,p.y+unit*.07);ctx.strokeStyle='#3b4237';ctx.lineWidth=Math.max(1,unit*.025);ctx.stroke();
    });
  }
  function addIdCheckStation(jobs,now){
    var x=-9.1,z=9.8,steel=['#414843','#171e1a','#2b342e'],wood=['#bc9d73','#6f5943','#998063'];
    jobs.push({depth:depthOf({x:-12.4,z:7.1})-.01,draw:function(){
      groundPatch(-12.4,7.1,.65,.7,'#c7d6a754');
      worldLine([[-12.7,.04,7.45],[-12.1,.04,7.45]],'#e5d7ae',.05);
    }});
    jobs.push({depth:depthOf({x:x+.7,z:z}),draw:function(){drawPerson(x+.7,z,now,4,false,true,false)}});
    jobs.push({depth:depthOf({x:x,z:z}),draw:function(){
      drawBox(x,z,0,.64,1.25,.12,steel);drawBox(x,z,.12,.6,1.2,.85,wood);
      drawBox(x,z,.97,.78,1.38,.13,['#efe4c8','#a9a18c','#d4c7a6']);
      drawBox(x-.12,z,1.1,.24,.32,.08,['#b7ccac','#527563','#88a488']);
      var checking=customers.find(function(c){return c.idChecked===false&&c.idCheckTime>0});
      var checkProgress=checking?Math.min(1,checking.idCheckTime/(securityDuration())):0;
      worldLine([[x-.29,1.11,z-.43],[x-.29,1.11,z+.43]],'#577465',.035);
      if(checkProgress>0)worldLine([[x-.29,1.115,z-.43],[x-.29,1.115,z-.43+checkProgress*.86]],'#c5e89e',.045);
      var light=project(x-.12,1.19,z);ellipse(light.x,light.y,unit*.055,unit*.035,checking?'#e9cf87':'#b7dd96');
      var label=project(x,.65,z+.61);ctx.save();ctx.fillStyle='#f2ecd5';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='600 '+(unit*.12)+'px "Bricolage Grotesque",sans-serif';ctx.fillText('ID CHECK',label.x,label.y,unit*.55);ctx.restore();
    }});
  }
  function addEntryDoor(jobs){
    var x=-10.65,z=10,frame=['#414843','#171e1a','#2b342e'],brass=['#d8c18b','#8d7950','#b7a16d'];
    function add(px,pz,fn){jobs.push({depth:depthOf({x:px,z:pz}),draw:fn})}
    // Glazed storefront bays continue the door frame behind the kiosk row.
    for(var bay=0;bay<4;bay++)(function(start,end){
      for(var strip=0;strip<6;strip++)(function(a,b){add(x,(a+b)/2,function(){
        poly([project(x,.15,a),project(x,.15,b),project(x,3.3,b),project(x,3.3,a)],'#b9d9c51c');
        drawBox(x,(a+b)/2,3.3,.18,Math.abs(b-a)+.01,.3,frame);
        drawBox(x,(a+b)/2,.08,.13,Math.abs(b-a)+.01,.08,frame);
      })})(start+(end-start)*strip/6,start+(end-start)*(strip+1)/6);
      add(x,end,function(){drawBox(x,end,.08,.13,.13,3.25,frame)});
    })(8.8-bay*1.6,Math.max(2.5,7.2-bay*1.6));
    // Return glazing turns the corner and meets the existing mezzanine support.
    for(var pane=0;pane<6;pane++)(function(a,b){add((a+b)/2,2.5,function(){
      poly([project(a,.15,2.5),project(b,.15,2.5),project(b,3.3,2.5),project(a,3.3,2.5)],'#b9d9c51c');
      drawBox((a+b)/2,2.5,3.3,b-a+.01,.18,.3,frame);
      drawBox((a+b)/2,2.5,.08,b-a+.01,.13,.08,frame);
    })})(x+(-8.8-x)*pane/6,x+(-8.8-x)*(pane+1)/6);
    jobs.push({depth:-Infinity,draw:function(){var reflection=project(-10.25,.02,7.85);glow(reflection.x,reflection.y,unit*1.1,'#9adf7930')}});
    // A small neon leaf hangs on the glass above the kiosk row.
    add(x+.12,7.85,function(){
      var outline=[[0,.42],[-.18,.28],[-.51,.3],[-.34,.12],[-.67,-.08],[-.39,-.12],[-.52,-.5],[-.22,-.3],[0,-.78],[.22,-.3],[.52,-.5],[.39,-.12],[.67,-.08],[.34,.12],[.51,.3],[.18,.28],[0,.42]];
      var points=outline.map(function(p){return [x+.12,2.68-p[1]*.72,7.85+p[0]*.85]});
      ctx.save();ctx.shadowColor='#a4ff70';ctx.shadowBlur=unit*.2;
      worldLine(points,'#86eb7040',.09);worldLine(points,'#a6fa86',.035);
      worldLine([[x+.12,2.38,7.85],[x+.12,2.25,7.85]],'#a6fa86',.035);
      ctx.shadowBlur=0;worldLine(points,'#e6ffd2',.012);ctx.restore();
    });
    // Matching short tiled returns flank the entrance without crossing the approach.
    [{cx:x+1.22,cz:11.25},{cx:x,cz:7.53,turned:true}].forEach(function(wall){
      if(wall.turned){
        for(var section=0;section<10;section++)(function(center){add(wall.cx,center,function(){
          drawBox(wall.cx,center,.03,.26,7/30,1.12,['#708b72','#2c4938','#4a6850']);
          worldLine([[wall.cx+.145,.12,center-7/60],[wall.cx+.145,1.05,center-7/60]],'#ccd3b3',.015);
          worldLine([[wall.cx+.145,.59,center-7/60],[wall.cx+.145,.59,center+7/60]],'#ccd3b3',.014);
          drawBox(wall.cx,center,1.15,.38,7/30+.01,.1,['#e0d4b4','#a99c7b','#c5ba9a']);
        })})(wall.cz-7/6+(section+.5)*7/30);
        return;
      }
      add(wall.cx,wall.cz,function(){
        var half=7/6;
        if(wall.turned){
          drawBox(wall.cx,wall.cz,.03,.26,half*2,1.12,['#708b72','#2c4938','#4a6850']);
          for(var seam=0;seam<10;seam++){var sz=wall.cz-half+.08+seam*.24;worldLine([[wall.cx+.145,.12,sz],[wall.cx+.145,1.05,sz]],'#ccd3b3',.015)}
          worldLine([[wall.cx+.145,.59,wall.cz-half],[wall.cx+.145,.59,wall.cz+half]],'#ccd3b3',.014);
          drawBox(wall.cx,wall.cz,1.15,.38,half*2+.04,.1,['#e0d4b4','#a99c7b','#c5ba9a']);return;
        }
        drawBox(wall.cx,wall.cz,.03,half*2,.26,1.12,['#708b72','#2c4938','#4a6850']);
        for(var seam=0;seam<10;seam++){var sx=wall.cx-half+.08+seam*.24;worldLine([[sx,.12,wall.cz+.145],[sx,1.05,wall.cz+.145]],'#ccd3b3',.015)}
        worldLine([[wall.cx-half,.59,wall.cz+.145],[wall.cx+half,.59,wall.cz+.145]],'#ccd3b3',.014);
        drawBox(wall.cx,wall.cz,1.15,half*2+.04,.38,.1,['#e0d4b4','#a99c7b','#c5ba9a']);
      });
    });
    // Rear-wall exit replaces the greenery panel; customers approach beside the stairs.
    var exitX=10.25,exitZ=-7;
    add(exitX-2.15,exitZ+.23,function(){
      var sx=exitX-2.15,sz=exitZ+.23;
      drawBox(sx,sz,2.2,1.2,.055,.38,['#b8b49a','#283e32','#355342']);
      var label=project(sx,2.39,sz+.03),axis=project(sx+1,2.39,sz+.03);
      ctx.save();ctx.translate(label.x,label.y);ctx.transform((axis.x-label.x)/unit,(axis.y-label.y)/unit,0,1,0,0);
      ctx.fillStyle='#eee6ca';ctx.font='600 '+unit*.16+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('EXIT ONLY',0,0,unit*1.02);ctx.restore();
    });
    [exitX-1.15,exitX+1.15].forEach(function(edge){add(edge,exitZ,function(){drawBox(edge,exitZ,0,.16,.24,3.65,['#454d44','#202923','#303c32'])})});
    add(exitX,exitZ,function(){
      drawBox(exitX,exitZ,3.5,2.46,.24,.18,['#454d44','#202923','#303c32']);
    });
    // Door and return window share a frame, sorted after floor coverings.
    var glazingX=exitX+1.1;
    [[exitZ,exitZ+1.65,3.4],[exitZ+1.65,exitZ+3,3.4]].forEach(function(section){
      var back=section[0],front=section[1],top=section[2];
      add(glazingX,(back+front)/2,function(){
        poly([project(glazingX,.06,back),project(glazingX,.06,front),project(glazingX,top,front),project(glazingX,top,back)],'#b5d7c12e');
        worldLine([[glazingX,.06,back],[glazingX,.06,front],[glazingX,top,front],[glazingX,top,back],[glazingX,.06,back]],'#303c32',.065);
      });
    });
    jobs.push({depth:-Infinity,draw:function(){
      groundPatch(exitX,exitZ+.5,1.9,1.6,'#314d3d');
      worldLine([[exitX,.055,exitZ+1.1],[exitX,.055,exitZ-.1],[exitX-.28,.055,exitZ+.25]],'#d6c18a',.07);
      worldLine([[exitX,.055,exitZ-.1],[exitX+.28,.055,exitZ+.25]],'#d6c18a',.07);
    }});
    // Threshold and welcome mat lie on the actual customer approach.
    jobs.push({depth:-Infinity,draw:function(){groundPatch(x-.8,z,1.6,2,'#314d3d');drawBox(x,z,.025,.34,2.5,.06,brass)}});
    [z-1.2,z+1.2].forEach(function(edge){add(x,edge,function(){drawBox(x,edge,.04,.26,.26,3.26,frame);drawBox(x,edge,0,.3,.3,.18,brass)})});
    add(x,z,function(){
      drawBox(x,z,3.3,.26,2.66,.3,frame);
    });
    // Park the glass leaf along the side wall, clear of the entrance lanes.
    add(x-.14,z-1.9,function(){
      var hinge=[x-.14,0,z-1.1],end=[x-.14,0,z-2.75];
      poly([project(hinge[0],.12,hinge[2]),project(end[0],.12,end[2]),project(end[0],3.17,end[2]),project(hinge[0],3.17,hinge[2])],'#b5d7c12e');
      worldLine([[hinge[0],.12,hinge[2]],[end[0],.12,end[2]],[end[0],3.17,end[2]],[hinge[0],3.17,hinge[2]],[hinge[0],.12,hinge[2]]],'#2b342e',.075);
      worldLine([[end[0],1.25,end[2]+.18],[end[0],1.85,end[2]+.18]],'#dfc58c',.065);

    });
  }
  function addQueueRails(jobs){

    [-4,4].forEach(function(center){
      var direction=-1,near=center-direction*.65,far=center+direction*2.75;
      function post(x,z){jobs.push({depth:depthOf({x:x,z:z}),draw:function(){
        var base=project(x,.05,z),cap=project(x,.85,z);
        ellipse(base.x,base.y,unit*.2,unit*.09,'#8a805b');
        worldLine([[x,.06,z],[x,.85,z]],'#c5b382',.065);ellipse(cap.x,cap.y,unit*.095,unit*.08,'#eddaad');
      }})}
      function rope(x1,z1,x2,z2){
        for(var segment=0;segment<12;segment++)(function(t0,t1){
          var x0=x1+(x2-x1)*t0,z0=z1+(z2-z1)*t0,x=x1+(x2-x1)*t1,z=z1+(z2-z1)*t1;
          jobs.push({depth:depthOf({x:(x0+x)/2,z:(z0+z)/2}),draw:function(){worldLine([[x0,.77-.34*t0*(1-t0),z0],[x,.77-.34*t1*(1-t1),z]],'#365846',.07)}});
        })(segment/12,(segment+1)/12);
      }
      // Two alternating dividers leave turning pockets matching queueRoute.
      var z1=7,z2=8.2;
      [[near,z1,center+direction*1.5,z1],[far,z2,center+direction*.6,z2],
       [near,6,near,9.4],[far,6,far,9.4],
       [near,9.4,center+direction*1.5,9.4]].forEach(function(r){post(r[0],r[1]);post(r[2],r[3]);rope(r[0],r[1],r[2],r[3])});
    });
  }
  function addExitMerch(jobs){
    var wood=['#d9b885','#896e49','#b69766'];
    // Slim merch stand beside the exit lane, beyond the stair footprint.
    jobs.push({depth:depthOf({x:9.65,z:-3.45}),draw:function(){
      var x=9.65,z=-3.45,frame=['#4a5d50','#263b30','#354c3e'];
      drawBox(x,z,.02,.78,2.05,.15,frame);
      [-.94,.94].forEach(function(dz){drawBox(x-.31,z+dz,.17,.07,.07,1.82,frame)});
      for(var row=0;row<3;row++){
        var y=.22+row*.59;
        drawBox(x,z,y,.78,2.05,.085,wood);
        worldLine([[x+.39,y+.086,z-.96],[x+.39,y+.086,z+.96]],'#ddc593',.025);
        for(var item=0;item<3;item++)merchandise(x,z-.65+item*.65,y+.085,(row+item)%3,['#527e60','#b28b64','#75999a'][item]);
      }
      drawBox(x-.31,z,2.0,.08,2.05,.14,frame);
    }});
  }
  function addRoomDetails(jobs,now){
    var wood=['#d9b885','#896e49','#b69766'],sage=['#a1baa0','#4f725a','#799878'],cream=['#efe4c8','#a9b195','#d2d3b3'];
    function add(x,z,draw){jobs.push({depth:depthOf({x:x,z:z}),draw:draw})}
    add(4,-7.25,function(){
      drawBox(4,-7.25,.12,5.3,.85,.16,sage);
      for(var leg=-1;leg<=1;leg+=2)drawBox(4+leg*2.55,-7.25,.1,.1,.7,2.1,sage);
      for(var shelf=0;shelf<2;shelf++){var y=.5+shelf*1.05;drawBox(4,-7.25,y,5.4,.85,.12,wood);for(var pot=0;pot<5;pot++)plant(1.95+pot*1.03,-7.25,y+.12,.42+pot%2*.14)}
    });
    add(-7,-4.1,function(){
      carton(-7.1,-4.3,.05,1.1);carton(-7.1,-4.3,.77,.85);carton(-7.65,-3.6,.05,.72);
      drawBox(-6.8,-3.1,.05,1.4,.1,.09,wood);drawBox(-7.4,-3.1,.05,.1,.9,.09,wood);
    });
    add(-8.45,.35,function(){
      drawBox(-8.45,.35,.08,1.1,3.1,.18,sage);drawBox(-8.85,.35,.1,.12,3.2,2.1,sage);
      for(var shelf=0;shelf<3;shelf++){drawBox(-8.4,.35,.65+shelf*.65,1.15,3.2,.09,wood);for(var bottle=0;bottle<4;bottle++)jar(-8.35,-.75+bottle*.72,.74+shelf*.65)}
    });
    add(7.8,-2.2,function(){
      drawBox(7.8,-2.2,.06,1.1,1.1,1.5,cream);drawBox(7.8,-2.2,1.56,1.2,1.2,.09,sage);
      for(var vent=0;vent<5;vent++)drawBox(7.8,-1.636,.35+vent*.16,.68,.015,.035,['#557562','#557562','#557562']);
      var fan=project(7.8,1.18,-1.625);ellipse(fan.x,fan.y,unit*.29,unit*.27,'#3a5947');
      for(var blade=0;blade<3;blade++){var a=(motionPreference.matches?0:now*.0025)+blade*Math.PI*2/3;ctx.beginPath();ctx.moveTo(fan.x,fan.y);ctx.quadraticCurveTo(fan.x+Math.cos(a+.6)*unit*.35,fan.y+Math.sin(a+.6)*unit*.3,fan.x+Math.cos(a)*unit*.25,fan.y+Math.sin(a)*unit*.23);ctx.strokeStyle='#9daf99';ctx.lineWidth=unit*.065;ctx.stroke()}
      ellipse(fan.x,fan.y,unit*.055,unit*.055,'#d2d8bd');
    });
    add(7.6,2.2,function(){
      drawBox(7.6,2.2,.3,1.5,1,.12,sage);drawBox(7.6,2.2,1.1,1.5,1,.12,wood);
      [-.65,.65].forEach(function(dx){worldLine([[7.6+dx,.2,1.8],[7.6+dx,1.2,1.8],[7.6+dx,1.2,2.6]],'#708f73',.055)});
      carton(7.5,2.2,.42,.7);jar(7.2,2.2,1.22);jar(7.85,2.2,1.22);
      [-.58,.58].forEach(function(dx){var w=project(7.6+dx,.17,2.55);ellipse(w.x,w.y,unit*.12,unit*.14,'#35493b')});
    });
    add(-1.5,-7.65,function(){
      drawBox(-1.5,-7.65,1.1,1.05,.13,1.05,wood);drawBox(-1.5,-7.568,1.2,.85,.018,.85,cream);
      for(var note=0;note<3;note++){drawBox(-1.78+note*.27,-7.55,1.4+note%2*.3,.2,.014,.3,['#ebc897','#ebc897','#ebc897'])}
    });
    add(8.8,8.9,function(){drawBox(8.8,8.9,.06,.65,.65,.8,sage);drawBox(8.8,8.9,.86,.73,.73,.1,cream);drawBox(8.8,9.28,.48,.35,.025,.28,['#345b46','#345b46','#345b46'])});
    // Flower beds frame the scene without crossing the customer route.
    [-11.6,11.6].forEach(function(x){add(x,4.2,function(){drawBox(x,4.2,.01,1.5,3,.25,cream);for(var n=0;n<3;n++){plant(x,3.25+n*.94,.26,.66);var flower=project(x+.14,.97,3.25+n*.94);ellipse(flower.x,flower.y,unit*.075,unit*.07,n%2?'#f0c674':'#e2a7a0')}})});
  }
  function addStorefront(jobs){
    var cream=['#f4eccf','#c7c1a1','#e4dec1'],sage=['#88b69b','#315e4a','#527d60'],rose=['#a4d9bc','#619e8d','#86c1aa'];
    function add(x,z,draw){jobs.push({depth:depthOf({x:x,z:z}),draw:draw})}
    [-8,0,8].forEach(function(x){add(x,6.15,function(){drawBox(x,6.15,.02,.5,.45,3.15,cream);drawBox(x,6.43,.15,.55,.07,.22,sage)})});
    for(var n=-7;n<=7;n+=2){(function(x){add(x,6.15,function(){drawBox(x,6.15,.02,1.95,.28,.7,sage);for(var stripe=0;stripe<4;stripe++)drawBox(x-.7+stripe*.45,6.31,.1,.025,.018,.49,['#b4c5a0','#72926d','#91aa82']);drawBox(x,6.15,2.68,2,.35,.46,cream)})})(n)}
    [-4,4].forEach(function(x){add(x,6.35,function(){
      drawBox(x,6.35,.75,5.6,.9,.16,['#dfbd8e','#9d7b52','#bd986b']);
      drawBox(x,6.35,2.55,5.6,.15,.1,sage);
      [-2.8,2.8].forEach(function(dx){drawBox(x+dx,6.3,.88,.12,.12,1.75,cream)});
      var label=project(x,2.83,6.5);ctx.fillStyle='#375b43';ctx.font='bold '+Math.max(10,unit*.35)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.fillText(x<0?'ORDER':'PICKUP',label.x,label.y);
    })});
    for(var stripe=0;stripe<16;stripe++){(function(k){var x=-7.5+k;add(x,6.3,function(){drawBox(x,6.3,3.15,1,1.65,.13,k%2?cream:rose);drawBox(x,7.13,2.95,1,.06,.25,k%2?cream:rose)})})(stripe)}
    [-8.7,8.7].forEach(function(x){add(x,7,function(){drawBox(x,7,0,.95,.95,.6,cream);plant(x,7,.6,1.1)})});
    add(-8,9,function(){drawBox(-8,9,.12,2,.7,.18,sage);drawBox(-8,9,.3,2,.65,.45,rose);drawBox(-8,8.7,.65,2,.12,.55,rose)});
  }
  function selectionRing(pos){
    var x=pos.x,z=pos.z,edge='#c1e6a1';
    if(stationTier(selected)===0){
      var rim=[[x-1.04,1.29,z-.84],[x+1.04,1.29,z-.84],[x+1.04,1.29,z+.84],[x-1.04,1.29,z+.84]];
      poly(rim.map(function(p){return project(p[0],p[1],p[2])}),'#c5edaa16');worldLine(rim.concat([rim[0]]),edge,.04);return;
    }
    // Trace the counter's actual top and exposed faces instead of a floor halo.
    var top=[[x-1.62,1.325,z-1.26],[x+1.62,1.325,z-1.26],[x+1.62,1.325,z+1.26],[x-1.62,1.325,z+1.26]];
    poly(top.map(function(p){return project(p[0],p[1],p[2])}),'#c5edaa16');
    worldLine(top.concat([top[0]]),edge,.04);
    worldLine([[x-1.55,1.3,z+1.26],[x-1.55,.04,z+1.26],[x+1.55,.04,z+1.26],[x+1.55,1.3,z+1.26]],edge,.04);
    worldLine([[x+1.55,.04,z+1.26],[x+1.55,.04,z-1.25],[x+1.55,1.3,z-1.25]],'#c1e6a18c',.03);
    if(stationTier(selected)>=2){
      var side=[[x+1.53,1.32,z-1.125],[x+2.35,1.32,z-1.125],[x+2.35,1.32,z+.525],[x+1.53,1.32,z+.525]];
      worldLine(side.concat([side[0]]),edge,.035);
      worldLine([[x+2.35,1.32,z+.525],[x+2.35,.04,z+.525],[x+1.6,.04,z+.525]],'#c1e6a18c',.03);
    }
  }
  function depthOf(pos){return rotate(pos.x,pos.z).z}
  function render(wallNow){
    if(document.hidden){render.last=wallNow;requestAnimationFrame(render);return}
    var frameDelta=Math.min(.1,Math.max(0,(wallNow-(render.last===undefined?wallNow:render.last))/1000))*state.gameSpeed;
    render.last=wallNow;animationTime+=frameDelta*1000;for(var task=0;task<6;task++){var target=stationWorking(task)?1:0;taskActivity[task]+=(target-taskActivity[task])*(1-Math.exp(-frameDelta*5));taskClocks[task]+=frameDelta*1000*taskActivity[task]}
    for(var slot=0;slot<4;slot++){var phase=(taskClocks[1]/9000+slot*.23)%1;var targetGrowth=state.stock[1]>=storageCapacity()?1:phase>.86?Math.max(0,(1-phase)/.14):Math.min(1,phase/.72);cropGrowth[slot]+=(targetGrowth-cropGrowth[slot])*(1-Math.exp(-frameDelta*4))}var now=animationTime;
    sceneTime=motionPreference.matches?0:now;
    if(state.empire.activeStore){
      sceneElevation=0;
      drawBranchMap({ctx:ctx,width:width,height:height,unit:unit,project:project,box:drawBox,line:worldLine,poly:poly,ellipse:ellipse,plant:plant,jar:jar,carton:carton,person:drawPerson,depth:depthOf},state.empire.activeStore-1,state.empire.stores[state.empire.activeStore-1].level,motionPreference.matches?0:now,state.empire.stores[state.empire.activeStore-1].projects,{lighting:visualLight(),store:state.empire.stores[state.empire.activeStore-1],event:eventStatus(state.empire),rewards:state.empire.rewards,network:state.empire.network,neighborhood:neighborhood(state.empire,state.empire.activeStore-1)});
      // Main-store effects expire while visiting a branch rather than replaying on return.
      particles.forEach(function(p){p.life-=frameDelta*1.5});particles=particles.filter(function(p){return p.life>0});deliveryDrones.forEach(function(d){d.age+=frameDelta});deliveryDrones=deliveryDrones.filter(function(d){return d.age<d.delay+7.5});
      updateBranchMarker();requestAnimationFrame(render);return;
    }
    drawTower(now);
    var held=customers.filter(function(c){return c.ordered&&!c.bag}).length,heldPin=project(machinePos[5].x,2.2-sceneElevation,machinePos[5].z);ctx.fillStyle='#ead49b';ctx.font='600 '+Math.max(8,unit*.22)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.fillText(held+' held',heldPin.x,heldPin.y);
    tierFlashes.forEach(function(life,i){if(life<=0)return;tierFlashes[i]=Math.max(0,life-frameDelta);var station=machinePos[i];ctx.save();ctx.globalAlpha=life*.8;for(var n=0;n<5;n++){var q=project(station.x-1.3+n*.65,station.y+1.6+(motionPreference.matches?0:(1-life)*.5),station.z+.7),r=unit*.09*life;ctx.strokeStyle='#f6e3ae';ctx.lineWidth=Math.max(.7,unit*.025);ctx.beginPath();ctx.moveTo(q.x-r,q.y);ctx.lineTo(q.x+r,q.y);ctx.moveTo(q.x,q.y-r);ctx.lineTo(q.x,q.y+r);ctx.stroke()}ctx.restore()});
    var speed=state.lines.some(function(n){return n>0})?Math.min(.07,.02+production()*.00002):0;
    crateTime=(crateTime+frameDelta*speed*1.4)%1;
    var jobs=[];
    customers.forEach(function(c){
      var blend=1-Math.exp(-frameDelta*20),oldX=c.renderX===undefined?c.x:c.renderX,oldZ=c.renderZ===undefined?c.z:c.renderZ;
      c.renderX=oldX+(c.x-oldX)*blend;c.renderZ=oldZ+(c.z-oldZ)*blend;
      var dx=c.renderX-oldX,dz=c.renderZ-oldZ,distance=Math.hypot(dx,dz);
      c.walkPhase=(c.walkPhase||0)+distance*5;
      var strideTarget=frameDelta>0?Math.min(1,distance/frameDelta/2.2):(c.walkAmount||0);
      c.walkAmount=(c.walkAmount||0)+(strideTarget-(c.walkAmount||0))*(1-Math.exp(-frameDelta*10));
      var direction=distance>.001?Math.max(-1,Math.min(1,rotate(dx,dz).x/distance)):(c.facing===undefined?.3:c.facing);
      c.facing=(c.facing===undefined?direction:c.facing)+(direction-(c.facing===undefined?direction:c.facing))*(1-Math.exp(-frameDelta*8));
      var visual=Object.assign({},c,{x:c.renderX,z:c.renderZ});if(!customerBehindBuilding(c))jobs.push({depth:depthOf(visual),draw:function(){drawCustomer(visual,now)}})
    });
    if(state.kiosk)Array.from({length:kioskCount()},function(_,index){return index}).forEach(function(index){var dx=index*1.8;jobs.push({depth:depthOf({x:-9.6,z:6.8-dx}),draw:function(){
      function point(x,y,z){return [-9.75+(z-7.95),y,6.8-dx-(x-(-1.3+dx))]}
      function kb(x,z,y,w,d,h,p){var q=point(x,y,z);drawBox(q[0],q[2],y,d,w,h,p)}
      function kp(x,y,z){var q=point(x,y,z);return project(q[0],q[1],q[2])}
      function kl(points,color,w){worldLine(points.map(function(p){return point(p[0],p[1],p[2])}),color,w)}
      var steel=['#424d43','#202c24','#303f32'],oak=['#c6a071','#7c583a','#a27c50'];
      kb(-1.3+dx,7.95,0,.95,.7,.12,steel);kb(-1.3+dx,7.95,.12,.58,.46,1.25,oak);
      kb(-1.3+dx,7.95,1.3,.85,.26,1.05,steel);kb(-1.3+dx,8.09,1.4,.69,.018,.85,['#dbe9c5','#dbe9c5','#dbe9c5']);
      kl([[-1.55+dx,2.06,8.11],[-1.05+dx,2.06,8.11]],'#648355',.035);
      kb(-1.3+dx,8.12,1.5,.45,.018,.16,['#71965f','#71965f','#71965f']);
      kb(-1.3+dx,8.095,2.1,.73,.025,.19,['#355444','#263b31','#355444']);
      var serving=customers.find(function(c){return c.kiosk&&(c.kioskIndex||0)===index&&!c.ordered&&Math.hypot(c.x+8.95,c.z-(6.8-dx))<.15});
      var progress=serving?Math.min(1,(serving.orderTime||0)/.65):0;
      kb(-1.3+dx,8.125,1.77,.47,.015,.06,['#a9bda1','#a9bda1','#a9bda1']);
      if(progress>0)kb(-1.535+dx+progress*.235,8.14,1.77,.47*progress,.012,.06,['#527c46','#527c46','#527c46']);
      var light=kp(-.98+dx,2.27,8.12);ellipse(light.x,light.y,unit*.035,unit*.035,serving?'#e7c480':'#b7dd96');
      var label=kp(-1.3+dx,2.195,8.115),axis=kp(-.3+dx,2.195,8.115);
      ctx.save();ctx.translate(label.x,label.y);
      // Match both the angle and projected width of the kiosk face.
      ctx.transform((axis.x-label.x)/unit,(axis.y-label.y)/unit,0,1,0,0);
      ctx.beginPath();ctx.rect(-unit*.365,-unit*.095,unit*.73,unit*.19);ctx.clip();
      ctx.fillStyle='#e8edcf';ctx.font='600 '+(unit*.1)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText('SELF ORDER',0,0,unit*.59);ctx.restore();
    }});});
    // Ground planters share guest depth sorting, so foliage occludes people behind it.
    [{x:-10.35,z:5.9,compact:true},{x:10.85,z:9.3}].forEach(function(p){
      jobs.push({depth:depthOf(p),draw:function(){
        drawBox(p.x,p.z,0,p.compact?.45:.95,p.compact?.45:1,p.compact?.4:.65,['#bc9d73','#6f5943','#998063']);
        plant(p.x,p.z,p.compact?.4:.65,p.compact?.7:1.1);
      }});
    });
    jobs.push({depth:depthOf({x:-11.45,z:1.05}),draw:function(){
      // Botanical centerpiece in the open side aisle, away from the queue.
      var tx=-11.45,tz=1.05;
      var base=project(tx,0,tz),rim=project(tx,.4,tz),r=unit*.34;
      poly([{x:rim.x-r,y:rim.y},{x:rim.x+r,y:rim.y},{x:base.x+r*.72,y:base.y},{x:base.x-r*.72,y:base.y}],'#a87855');
      ellipse(rim.x,rim.y,r,unit*.12,'#d9aa7b');ellipse(rim.x,rim.y,r*.8,unit*.09,'#46382c');
      worldLine([[tx,.4,tz],[tx+.12,2.5,tz],[tx-.05,3.55,tz]],'#816747',.16);
      [-1,1].forEach(function(side){worldLine([[tx+.12,2.1,tz],[tx+side*.85,3.2,tz]],'#816747',.085)});
      for(var leaf=0;leaf<18;leaf++){var a=leaf*2.399,r=.35+(leaf%4)*.18,lp=project(tx+Math.cos(a)*r,2.7+(leaf%5)*.19,tz+Math.sin(a)*r*.6);ellipse(lp.x,lp.y,unit*.33,unit*.24,leaf%3===0?'#98b96e':leaf%3===1?'#587c4d':'#769852')}

    }});
    if(Math.min(stationTier(4),stationTier(5))>=2)jobs.push({depth:depthOf({x:-9.7,z:1.1}),draw:function(){
      drawBox(-9.7,1.1,.02,1.1,.75,.52,['#cbb38a','#806748','#a58a62']);
      drawBox(-9.7,1.1,.54,1.16,.8,.07,['#eee8ce','#b4ad93','#d5cdb0']);
      merchandise(-9.95,1.1,.61,1,'#527e60');pickupBag(-9.43,1.1,.61);
      worldLine([[-10.2,.51,1.49],[-9.2,.51,1.49]],'#f1d99f',.025);
    }});
    addExitMerch(jobs);
    addIdCheckStation(jobs,now);
    addEntryDoor(jobs);
    jobs.push({depth:depthOf({x:-8.8,z:2.5})+.12,draw:function(){
      drawBox(-8.8,2.5,0,.16,.16,4.5,['#414440','#191e1c','#2b302d']);
    }});
    addQueueRails(jobs);
    var festival=eventStatus(state.empire);
    if(festival.joined&&festival.open&&!festival.claimed){
      jobs.push({depth:depthOf({x:9,z:6}),draw:function(){
        var color=festival.slot%3===0?'#e3bc7d':festival.slot%3===1?'#b3a4c8':'#afbc75';
        drawBox(9,6,0,2,1.2,1,['#c2a073','#7a5a40','#a3815b']);
        for(var k=0;k<3;k++){if(festival.slot%3===2)plant(8.4+k*.6,6,1,.6);else jar(8.4+k*.6,6,1,k+1);}
        drawPerson(9,5,now,18,false,false,false);
        worldLine([[7.8,0,6],[7.8,3.5,6],[10.2,3.5,6],[10.2,0,6]],'#d5c397',.07);
        for(var n=0;n<5;n++){var q=project(8+n*.5,3.2,6);ellipse(q.x,q.y,unit*.16,unit*.23,color);}
      }});
    }
    jobs.sort(function(a,b){return a.depth-b.depth});jobs.forEach(function(job){job.draw()});var nightShade=visualLight().darkness;if(nightShade>0){ctx.fillStyle='rgba(14,24,46,'+(nightShade+.04)+')';ctx.fillRect(0,0,width,height);nightLights(now)}
    if(nightShade>0){
      // Emissive accents sit above the night tint, while their surrounding materials stay dark.
      ctx.save();ctx.globalAlpha=Math.min(1,nightShade/.34);
      [[-9,9,4.62,3.075],[-6.5,6.5,9.32,-.275]].forEach(function(edge){warmStrip([[edge[0]+.2,edge[2],edge[3]],[edge[1]-.2,edge[2],edge[3]]],false)});
      machinePos.forEach(function(p,i){var half=stationTier(i)===0?.8:1.3,y=p.y+1.1,z=p.z+(stationTier(i)===0?.84:1.26);warmStrip([[p.x-half,y,z],[p.x+half,y,z]],i===1)});
      [[-4,3.6,5.35,'ORDER',2.55],[4,3.6,5.35,'PICKUP',2.55],[-10.7,9.6,.86,'ONLINE ORDERS',3.15]].forEach(function(sign){var p=project(sign[0],sign[1],sign[2]),axis=project(sign[0]+1,sign[1],sign[2]);glow(p.x,p.y,unit*1.4,'#ffda8a38');ctx.save();ctx.translate(p.x,p.y);ctx.transform(1,(axis.y-p.y)/(axis.x-p.x),0,1,0,0);ctx.shadowColor='#ffdca0';ctx.shadowBlur=unit*.13;ctx.fillStyle='#fff0cf';ctx.font='600 '+Math.max(7,unit*.235)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(sign[3],0,0,sign[4]*unit*.64);ctx.restore()});
      ctx.restore();
    }
    for(var i=particles.length-1;i>=0;i--){var p=particles[i];p.life-=frameDelta*1.5;if(!motionPreference.matches){p.x+=p.vx*frameDelta;p.z+=p.vz*frameDelta;p.y+=p.vy*frameDelta;}p.vy-=frameDelta*5;var screen=project(p.x,p.y,p.z),size=Math.max(2,unit*.1);ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.color;ctx.fillRect(screen.x-size/2,screen.y-size/2,size,size);ctx.globalAlpha=1;if(p.life<=0)particles.splice(i,1)}
    drawDeliveryDrones(frameDelta,now);
    updateMarkers();requestAnimationFrame(render);
  }
  function drawDeliveryDrones(dt,now){
    for(var i=deliveryDrones.length-1;i>=0;i--){
      var drone=deliveryDrones[i];drone.age+=dt;var t=drone.age-drone.delay;if(t<0)continue;
      if(t>7.5){deliveryDrones.splice(i,1);continue}
      var lift=Math.min(1,Math.max(0,(t-2.45)/1.5));lift=lift*lift*(3-2*lift);
      var fly=Math.max(0,(t-3.95)/3.55),travel=fly*fly;
      var slot=drone.slot||0,side=slot%2?1:-1,lane=Math.ceil(slot/2);
      var spread=1;
      if(motionPreference.matches){lift=0;travel=0;}
      var x=-10.7-travel*20+(slot%3-1)*.72,z=-.75+travel*5+Math.floor(slot/3)*.62,y=11.10+lift*2.4+travel*7;
      ctx.save();ctx.globalAlpha=motionPreference.matches?Math.min(1,t/.25,(7.5-t)/.7):Math.min(1,(7.5-t)/.7);
      // A taped parcel hangs beneath a compact four-rotor courier.
      if(t<2&&!motionPreference.matches){
        var load=Math.min(1,t/1.9),ease=load*load*(3-2*load);
        // Every courier loads its own crate, with no parcel count/position jump.
        drawBox(x,z,10.2,.62,.465,.08,['#e5bc80','#a57c4f','#c99c65']);
        ctx.save();ctx.globalAlpha*=1-Math.max(0,(load-.7)/.3);
        pickupBag(x,z+.3*(1-ease),10.28+.2*(1-ease));ctx.restore();
        if(load>.65){ctx.save();ctx.globalAlpha*=(load-.65)/.35;carton(x,z,10.2,.62);ctx.restore()}
        ctx.restore();continue;
      }
      carton(x,z,y-.9,.62);
      if(drone.orders>1){
        var cargoLabel=project(x,y-.55,z+.36);
        ctx.fillStyle='#f5efd7';ctx.font='600 '+Math.max(9,unit*.23)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.fillText('×'+drone.orders,cargoLabel.x,cargoLabel.y);
      }
      worldLine([[x-.2,y-.35,z],[x-.2,y-.04,z]],'#d8c89e',.035);
      worldLine([[x+.2,y-.35,z],[x+.2,y-.04,z]],'#d8c89e',.035);
      [[-.63,-.45],[.63,-.45],[-.63,.45],[.63,.45]].forEach(function(offset,n){
        var rx=x+offset[0],rz=z+offset[1];
        worldLine([[x,y+.12,z],[rx,y+.15,rz]],'#527565',.12);
        var rotor=project(rx,y+.2,rz);
        ellipse(rotor.x,rotor.y,unit*.36,unit*.13,'#cbdacc66');
        var angle=motionPreference.matches?0:now*.055+n;
        ctx.beginPath();ctx.moveTo(rotor.x-Math.cos(angle)*unit*.3,rotor.y-Math.sin(angle)*unit*.1);ctx.lineTo(rotor.x+Math.cos(angle)*unit*.3,rotor.y+Math.sin(angle)*unit*.1);ctx.strokeStyle='#e5e9cf';ctx.lineWidth=Math.max(1,unit*.045);ctx.stroke();
        ellipse(rotor.x,rotor.y,unit*.075,unit*.045,'#294c3b');
      });
      drawBox(x,z,y,.66,.5,.22,['#e5e8d0','#587766','#91ac98']);
      var light=project(x+.25,y+.15,z+.26);ellipse(light.x,light.y,unit*.045,unit*.045,'#bde887');
      ctx.restore();
    }
  }
  function burst(worldPos,color){if(motionPreference.matches)return;for(var i=0;i<12;i++)particles.push({x:worldPos.x,y:1.4+(worldPos.y||0),z:worldPos.z,vx:(Math.random()-.5)*1.8,vz:(Math.random()-.5)*1.8,vy:1.6+Math.random()*1.8,life:1,color:color||colors.acid})}

  var markerEls=LINES.map(function(line,i){var b=document.createElement('button');b.className='marker';b.textContent=line.name;b.onclick=function(){selectMachine(i)};$('markers').appendChild(b);return b});
  var securityMarker=document.createElement('button');securityMarker.className='marker';securityMarker.onclick=function(){selectSecurity()};$('markers').appendChild(securityMarker);
  function updateMarkers(){
    var securityPos=project(-9.1,.62,10.41);
    securityMarker.style.transform='translate3d('+securityPos.x+'px,'+securityPos.y+'px,0) translate(-50%,-50%)';
    securityMarker.style.fontSize=Math.max(8,Math.min(11,unit*.29))+'px';
    securityMarker.style.display=securityPos.x<-40||securityPos.x>width+40||securityPos.y<-30||securityPos.y>height+30?'none':'block';
    if($('buyAutoDrone')){var drone=state.autoDrone,dronePrice=drone.owned?BULK_DRONE_COST:AUTO_DRONE_COST;
      $('buyAutoDrone').disabled=drone.bulk||state.money<dronePrice;$('autoDronePrice').textContent=drone.bulk?'Installed':fmt(dronePrice);$('buyAutoDrone').querySelector('span').textContent=drone.owned?'Bulk upgrade':'Install';$('autoDroneBenefit').textContent=drone.owned?'Up to 10 ready orders every 10s':'Send a ready order every 10s';
      $('autoDroneToggle').disabled=!drone.owned&&state.money<AUTO_DRONE_COST;$('autoDroneToggle').textContent=!drone.owned?'Install '+fmt(AUTO_DRONE_COST):drone.enabled?'On':'Off';if(drone.owned)$('autoDroneToggle').setAttribute('aria-pressed',String(drone.enabled));else $('autoDroneToggle').removeAttribute('aria-pressed');$('autoDroneToggle').setAttribute('aria-label',drone.owned?'Automatic drone dispatch':('Install auto drone for '+fmt(AUTO_DRONE_COST)));
      $('autoDroneBulk').hidden=!drone.owned;$('autoDroneBulk').disabled=!drone.bulk&&state.money<BULK_DRONE_COST;$('autoDroneBulk').textContent=drone.bulk?(drone.mode==='bulk'?'Bulk · up to 10':'Single · 1 order'):'Upgrade to bulk · '+fmt(BULK_DRONE_COST);if(drone.bulk)$('autoDroneBulk').setAttribute('aria-pressed',String(drone.mode==='bulk'));else $('autoDroneBulk').removeAttribute('aria-pressed');$('autoDroneBulk').setAttribute('aria-label',drone.bulk?'Bulk automatic dispatch':('Upgrade auto drone to bulk for '+fmt(BULK_DRONE_COST)));
      $('autoDroneStatus').textContent=!drone.owned?'A ready order every 10s':!drone.enabled?'Manual dispatch':state.gameSpeed===0?'Paused':drone.remaining>.05?'Next check in '+Math.ceil(drone.remaining)+'s':state.stock[3]<onlineSize()?'Waiting for '+(onlineSize()-state.stock[3])+' jars':'Ready to launch';}

    if(shopBrowser)shopBrowser.render();
    markerEls.forEach(function(el,i){var station=machinePos[i],pos=project(station.x,.63+station.y,station.z+1.23);el.style.transform='translate3d('+pos.x+'px,'+pos.y+'px,0) translate(-50%,-50%)';el.style.fontSize=Math.max(8,Math.min(11,unit*.29))+'px';el.style.display=pos.x<-40||pos.x>width+40||pos.y<-30||pos.y>height+30?'none':'block'})}
  function slowestStation(){
    var lowest=Infinity,result=0;
    LINES.forEach(function(_,i){var rate=stationThroughput(i);if(rate<lowest){lowest=rate;result=i}});return result;
  }
  function stationStatus(i){
    if(i<4){
      if(state.stock[i]>=storageCapacity())return 'Storage full';
      if(i>0&&state.stock[i-1]<1)return 'Waiting for '+['seeds','plants','harvest'][i-1];
      return 'Producing in batches';
    }
    if(i===4)return state.stock[4]>=readyCapacity()?'Ready storage full':state.stock[3]<1?'Waiting for packed jars':'Preparing pickup bags';
    if(state.stock[4]<1)return 'Waiting for ready bags';
    return customers.some(function(c){return c.ordered&&!c.bag&&c.phase==='pickup'&&Math.hypot(c.x-4,c.z-6.4)<.15})?'Serving a customer':'Waiting for a customer at the counter';
  }
  function renderUI(){
    renderEmpire();
    renderFlowers();renderComponents();
    var night=visualLight().darkness>.15;lightToggle.setAttribute('aria-label',night?'Switch to daytime lighting':'Switch to nighttime lighting');lightToggle.setAttribute('aria-pressed',String(night));lightToggle.title=night?'Night lighting · switch to day':'Day lighting · switch to night';var lightIcon=night?'<path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10Z"/>':'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>';if(lightToggle.dataset.mode!==String(night)){lightToggle.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+lightIcon+'</svg>';lightToggle.dataset.mode=String(night)}
    var slow=slowestStation(),shortNames=['Seeds','Grow','Harvest','Pack','Orders','Pickup'];
    $('flowText').textContent='Bottleneck: '+shortNames[slow]+' · '+stationThroughput(slow).toFixed(1)+'/s';
    $('flowText').title='Estimated throughput includes production batches, counter handoff time, and installed kiosks. Walking, security checks, and customer demand can reduce actual sales.';
    $('stationTraining').textContent='Train '+shortNames[selected]+' employee · '+fmt(staffCost(selected));
    $('stationTraining').disabled=state.money<staffCost(selected);
    $('flowAction').textContent=state.gameSpeed===0?'Resume 1×':'View station';
    var line=LINES[selected],open=isOpen(selected),level=state.lines[selected],price=cost(selected),affordable=open&&state.money>=price;
    $('money').textContent=fmt(state.money);$('rate').textContent=state.gameSpeed===0?'Paused':fmt((state.empire.activeStore?storeRate(state.empire,state.empire.activeStore-1):production()+branchRate(state.empire))*state.gameSpeed)+'/s';document.querySelector('.stat.output small').textContent=state.empire.activeStore?'BRANCH INCOME':'CAPACITY';
    speedButtons.forEach(function(button){button.setAttribute('aria-pressed',String(Number(button.getAttribute('data-speed'))===state.gameSpeed))});
    $('stationTraining').parentElement.hidden=securitySelected;
    if(securitySelected){renderSecuritySelection()}else{
    $('machineNumber').textContent=!open?'BUILD PREVIOUS STAGE':level?'STAGE 0'+(selected+1)+' · '+stationStatus(selected):'STAGE 0'+(selected+1)+' · NOT BUILT';
    $('machineName').textContent=line.name;$('machineLevel').textContent=level;$('machineRate').textContent=selected<4?batchSize(selected).toFixed(1)+' avg / batch · '+([2,3,2,2][selected]/cycleSpeed(selected)).toFixed(1)+'s':capacity(selected).toFixed(1)+'× service';
    var tier=stationTier(selected),next=nextCapacity(selected),gain=Math.round((next/capacity(selected)-1)*100);
    $('stationStatus').textContent=stationStatus(selected)+(selected<4?' · '+batchSize(selected).toFixed(1)+' avg / batch, '+([2,3,2,2][selected]/cycleSpeed(selected)).toFixed(1)+'s cycles':' · '+(counterServiceDuration(selected)/Math.max(1,state.gameSpeed)).toFixed(2)+'s handoff')+(tier<6?' · New look at Lv '+TIER_LEVELS[tier+1]:' · Flagship');
    $('upgradeLevel').textContent='Lv '+level+' → '+(level+1);
    $('stationTier').textContent=STATION_TIERS[tier];$('stationTier').style.color=TIER_COLORS[tier];
    $('upgradeFunding').textContent=!open?'Build previous station':affordable?'Ready to upgrade':fmt(Math.max(0,price-state.money))+' to go';
    $('upgradeProgress').value=Math.min(100,state.money/price*100);
    $('upgradeProgress').setAttribute('aria-valuetext',affordable?'Upgrade ready':fmt(Math.max(0,price-state.money))+' needed for level '+(level+1));
    $('upgradeBenefit').textContent=selected<4?'+'+gain+'% batch size':(counterServiceDuration(selected)/Math.max(1,state.gameSpeed)).toFixed(3)+'s → '+(counterServiceDuration(selected,next)/Math.max(1,state.gameSpeed)).toFixed(3)+'s handoff';
    var preview=$('upgradePreview'),source=machineTabs[selected].querySelector('canvas');if(preview&&typeof preview.getContext==='function'&&source){var pc=preview.getContext('2d');if(pc){pc.clearRect(0,0,80,100);pc.drawImage(source,0,0)}}
    $('nextAppearance').textContent=tier<6?'New look at level '+TIER_LEVELS[tier+1]+' · '+STATION_TIERS[tier+1]:'Flagship equipment · upgrades keep increasing output';
    $('machineCost').textContent=fmt(price);$('buyMachine').disabled=!affordable;$('buyMachine').querySelector('span').textContent=!open?'LOCKED':level?'UPGRADE':'BUILD';
    var maxUpgrade=maxStationUpgrade(selected);
    $('buyMachineMax').disabled=!maxUpgrade.levels;
    $('machineMaxLabel').textContent='MAX'+(maxUpgrade.levels?' +'+maxUpgrade.levels+' LV':'');
    $('machineMaxCost').textContent=maxUpgrade.levels?fmt(maxUpgrade.cost):'—';
    $('buyMachineMax').setAttribute('aria-label','Upgrade '+line.name+' by '+maxUpgrade.levels+' levels for '+fmt(maxUpgrade.cost));
    $('buyMachine').style.setProperty('--funded',Math.min(100,state.money/price*100)+'%');
    $('upgradeHint').textContent=!open?'Build '+LINES[selected-1].name.toLowerCase()+' first.':!affordable?fmt(price-state.money)+' to go · customer sales earn cash automatically.':level?selected<4?'Larger batches per cycle. Train employees to shorten each cycle.':'Upgrade for faster '+['','','','','order preparation','customer service'][selected]+'.':'Build this stage to extend your line.';
    $('upgradeHint').classList.toggle('ready',affordable);
    if(selected===4&&level)$('upgradeHint').textContent+=' Queue: '+queueLimit()+' customers · every 2 desk or employee upgrades adds a place (max 12).';
    }
    securityMarker.classList.add('station-sign');securityMarker.classList.toggle('selected',securitySelected);securityMarker.classList.toggle('can-upgrade',state.idStaff<10000&&state.money>=Math.floor(20*Math.pow(1.6,state.idStaff)));securityMarker.innerHTML='<span class=station-sign-name>Security</span><span class=station-sign-level>Lv '+state.idStaff+'</span>';securityMarker.style.setProperty('--station-tier',TIER_COLORS[state.idStaff>=25?3:state.idStaff>=10?2:1]);securityMarker.setAttribute('aria-label','Security, level '+state.idStaff+'. Open security station');securityMarker.setAttribute('aria-pressed',String(securitySelected));
    var idPrice=Math.floor(20*Math.pow(1.6,state.idStaff)),idMax=idTrainingQuote(10000);
    $('idEmployeeInfo').textContent='Lv '+state.idStaff+' · '+(securityDuration()).toFixed(2)+'s / check';
    $('trainIdChecker').disabled=state.money<idPrice||state.idStaff>=10000;
    $('trainIdChecker').querySelector('span').textContent='Train +'+Math.round(.3/(1+state.idStaff*.3)*100)+'%';$('trainIdChecker').querySelector('b').textContent=fmt(idPrice);
    $('trainIdCheckerMax').disabled=!idMax.levels;$('trainIdCheckerMax').querySelector('span').textContent='Max'+(idMax.levels?' +'+idMax.levels:'');$('trainIdCheckerMax').querySelector('b').textContent=idMax.levels?fmt(idMax.cost):'—';
    var trainingMax=maxStaffTraining(selected);
    $('stationTrainingMax').textContent='Max training'+(trainingMax.levels?' +'+trainingMax.levels+' · '+fmt(trainingMax.cost):'');
    $('stationTrainingMax').disabled=!trainingMax.levels;
    LINES.forEach(function(line,i){var quote=maxStaffTraining(i),button=$('staffMax'+i);button.disabled=!quote.levels;button.querySelector('span').textContent='Max'+(quote.levels?' +'+quote.levels:'');button.querySelector('b').textContent=quote.levels?fmt(quote.cost):'—';button.setAttribute('aria-label','Train '+line.name+' employee by '+quote.levels+' levels for '+fmt(quote.cost))});
    staffButtons.forEach(function(button,i){button.disabled=!state.lines[i]||state.money<staffCost(i);button.querySelector('b').textContent=fmt(staffCost(i));button.querySelector('span').textContent='Train +'+Math.round(.3/(1+state.staff[i]*.3)*100)+'%';$('employeeInfo'+i).textContent='Lv '+state.staff[i]+' · '+(1+state.staff[i]*.3).toFixed(1)+'× speed';button.title=state.money<staffCost(i)?fmt(staffCost(i)-state.money)+' more needed':'Train '+shortNames[i]+' employee';button.setAttribute('aria-label','Train '+shortNames[i]+' employee, '+button.querySelector('span').textContent+', '+fmt(staffCost(i)));});
    var installedKiosks=kioskCount(),nextKioskPrice=[25000,50000,100000][installedKiosks];
    $('kioskCountLabel').textContent=installedKiosks+' / 3 installed';
    $('buyKiosk').disabled=installedKiosks===3||state.money<nextKioskPrice;
    $('kioskPrice').textContent=installedKiosks===3?'Installed':fmt(nextKioskPrice);
    $('kioskInfo').textContent=installedKiosks===3?'All three kiosks open. Customers choose the shorter line.':installedKiosks===0?'Add self-order service alongside the counter.':'Add kiosk '+(installedKiosks+1)+' to serve more customers at once.';
    $('buyKiosk').querySelector('span').textContent=installedKiosks===3?'Maximum':installedKiosks===0?'Install kiosk':'Add kiosk '+(installedKiosks+1);

    $('queueCapacity').textContent=queueLimit()>=20?'20 customers · maximum':queueLimit()+' → '+Math.min(20,queueLimit()+2)+' customers';$('queueUpgradeInfo').textContent=queueLimit()>=20?'All waiting places unlocked.':state.money<queueCost()?fmt(queueCost()-state.money)+' more to expand':'Two extra waiting places';$('queuePrice').textContent=queueLimit()>=20?'MAX':fmt(queueCost());$('upgradeQueue').disabled=queueLimit()>=20||state.money<queueCost();
    $('storageCapacity').textContent=storageCapacity()+' → '+(storageCapacity()+100)+' per stage';$('storageUsage').textContent=state.stock[3]+' / '+storageCapacity()+' jars'+(state.storageLevel<20&&state.money<storageCost()?' · '+fmt(storageCost()-state.money)+' to expand':' stored');$('storageFill').max=storageCapacity();$('storageFill').value=state.stock[3];$('storagePrice').textContent=state.storageLevel>=20?'MAX':fmt(storageCost());$('upgradeStorage').disabled=state.storageLevel>=20||state.money<storageCost();if(state.storageLevel>=20)$('storageCapacity').textContent=storageCapacity()+' per stage · maximum';
    var batch=onlineBatch(10),quote=onlineBatch(10,Infinity),maxUnlocked=state.lines[3]>=10,maxBatch=onlineBatch(Infinity);
    $('fulfillOnlineBatch').disabled=batch.count<10;$('onlineBatchLabel').textContent='Send 10';$('onlineBatchReward').textContent=fmt(quote.reward);$('onlineBatchInfo').textContent=quote.jars+' jars total';
    $('onlineMaxOption').hidden=!maxUnlocked;$('fulfillOnlineMax').disabled=!maxBatch.count;$('onlineMaxLabel').textContent='Send max ('+maxBatch.count+')';$('onlineMaxReward').textContent=fmt(maxBatch.reward);$('onlineMaxInfo').textContent=maxBatch.jars+' jars total';

    $('onlineTitle').textContent='Web order #'+String(state.onlineCompleted+1).padStart(3,'0');$('onlineNeed').textContent=onlineSize()+' jars · '+STRAINS[menuChoice(state.onlineCompleted)].name;$('onlineReward').textContent=fmt(onlineSize()*onlineValue());$('onlineStock').textContent=onlineRequestsReady()+' request'+(onlineRequestsReady()===1?'':'s')+' waiting · '+state.stock[3]+' jars available · '+customers.filter(function(c){return c.ordered&&!c.bag}).length+' walk-in bags held';$('dispatchHint').textContent=onlineRequestsReady()<1?'Waiting for the next web request. Requests arrive faster as you complete orders.':state.stock[3]<onlineSize()?'Waiting for '+(onlineSize()-state.stock[3])+' more packed jars. Walk-in pickups stay reserved.':'Ready for drone delivery. Walk-in pickups stay reserved.';$('fulfillOnline').disabled=!state.lines[4]||state.stock[3]<onlineSize()||onlineRequestsReady()<1;var webItem=$('stockCountOnline').closest('.stock-item'),webCount=onlineRequestsReady();$('stockCountOnline').textContent=webCount;webItem.dataset.heat=String(requestHeat(webCount));$('stockCountOnline').classList.toggle('stock-full',webCount>=onlineRequestCap());webItem.title=webCount+' deliver'+(webCount===1?'y':'ies')+' requested · '+onlineRequestCap()+' max';$('onlineBadge').hidden=$('fulfillOnline').disabled;if(!maxUnlocked)$('dispatchHint').textContent+=' Send max unlocks at Packing Lv 10.';
    renderCustomerRatings();
    var waiting=customers.filter(function(c){return !c.ordered&&c.phase!=='leaving'}).length;$('queueCount').textContent=waiting+'/'+queueLimit();$('queueCount').classList.toggle('queue-full',waiting>=queueLimit());firstTimeHints(waiting);$('queueCount').parentElement.title=waiting>=queueLimit()?'Line is full · new customers walk away. Upgrade the order desk or its employees to add places.':'Customers waiting to order';$('pickupCount').textContent=customers.filter(function(c){return c.phase==='pickup'||c.phase==='toPickup'}).length;$('servedCount').textContent=state.sold.toLocaleString();state.stock.forEach(function(n,i){$('stockCount'+i).textContent=n;$('stockCount'+i).title=i===4?n+' / '+readyCapacity()+' packed orders ready for walk-in pickup':n+' / '+storageCapacity()+(n>=storageCapacity()?' · Storage full':'');$('stockCount'+i).classList.toggle('stock-full',n>=(i===4?readyCapacity():storageCapacity()))});var order=milestone(state.contract);
    if(order){$('orderName').textContent=state.lifetime>=order.goal?'ORDER READY TO CLAIM':order.name;$('orderProgress').textContent=fmt(Math.min(state.lifetime,order.goal))+' / '+fmt(order.goal);$('orderFill').style.width=Math.min(100,state.lifetime/order.goal*100)+'%';$('claimReward').textContent='+'+fmt(order.reward);$('claim').disabled=state.lifetime<order.goal}
    else{$('orderName').textContent='ALL ORDERS FILLED';$('orderProgress').textContent='COMPLETE';$('orderFill').style.width='100%';$('claimReward').textContent='✓';$('claim').disabled=true}
    $('orderBadge').hidden=!order||state.lifetime<order.goal;
    $('boostPreview').textContent=state.multiplier.toFixed(2)+'× → '+(state.multiplier*1.25).toFixed(2)+'× all stations';
    var boostPrice=boostCost(state.globalLevel);$('boostCost').textContent=state.globalLevel>=BOOST_MAX?'MAX':fmt(boostPrice);$('boost').disabled=state.globalLevel>=BOOST_MAX||state.money<boostPrice;
    markerEls.forEach(function(el,i){var locked=!isOpen(i);el.classList.toggle('selected',i===selected);el.classList.toggle('locked',locked);el.classList.add('station-sign');el.classList.toggle('can-upgrade',!locked&&state.money>=cost(i));el.innerHTML='<span class=station-sign-name>'+shortNames[i]+'</span><span class=station-sign-level>Lv '+state.lines[i]+'</span>';el.style.setProperty('--station-tier',TIER_COLORS[stationTier(i)]);el.setAttribute('aria-label',LINES[i].name+(locked?', locked':', level '+state.lines[i]));el.setAttribute('aria-pressed',String(i===selected))});
    var securityCard=document.querySelector('[data-security]');if(securityCard){var idPriceNow=Math.floor(20*Math.pow(1.6,state.idStaff));securityCard.setAttribute('aria-pressed',String(securitySelected));securityCard.classList.toggle('can-upgrade',state.idStaff<10000&&state.money>=idPriceNow);securityCard.querySelector('em').textContent='Lv '+state.idStaff;securityCard.setAttribute('aria-label','Security, level '+state.idStaff);securityCard.style.setProperty('--station-tier',TIER_COLORS[state.idStaff>=25?3:state.idStaff>=10?2:1])}
    machineTabs.forEach(function(tab,i){var locked=!isOpen(i),available=!locked&&state.money>=cost(i);tab.classList.toggle('is-bottleneck',i===slow);tab.title=i===slow?'Slowest station · improve this to raise capacity':'';tab.setAttribute('aria-pressed',String(!securitySelected&&i===selected));tab.classList.toggle('is-locked',locked);tab.classList.toggle('can-upgrade',available);tab.querySelector('em').innerHTML=locked?'Locked':'Lv '+state.lines[i]+(i===slow?'<span class="slow-tag"> · Slow</span>':'');tab.style.setProperty('--station-tier',TIER_COLORS[stationTier(i)]);var progress=Math.min(100,state.lines[i]/100*100),progressText=state.lines[i]>=100?'Flagship equipment reached':'Level '+state.lines[i]+' of 100 toward flagship equipment';tab.querySelector('progress').value=progress;tab.querySelector('progress').setAttribute('aria-label',LINES[i].name+' equipment progress');tab.querySelector('progress').setAttribute('aria-valuetext',progressText);tab.querySelector('progress').title=progressText;tab.querySelector('.level-funding').textContent=progressText;tab.setAttribute('aria-label',LINES[i].name+(i===slow?', slowest station':'')+', level '+state.lines[i]+', '+STATION_TIERS[stationTier(i)]+(available?', upgrade ready':''))});
  }
  var machineTabs=Array.prototype.slice.call(document.querySelectorAll('[data-machine]'));var securityTab=document.querySelector('[data-security]');if(securityTab)securityTab.onclick=selectSecurity;
  machineTabs.forEach(function(tab,i){var progress=document.createElement('progress');progress.max=100;progress.value=0;progress.setAttribute('aria-label',LINES[i].name+' equipment progress');tab.appendChild(progress);var label=document.createElement('span');label.className='level-funding';tab.appendChild(label);tab.onclick=function(){selectMachine(Number(tab.getAttribute('data-machine')))}});
  var trayTabs=Array.prototype.slice.call(document.querySelectorAll('[data-tray]'));
  var activeTray='factory',panelOpen=true;
  function showTray(name){document.body.dataset.activeTray=name;if(state.empire.activeStore&&name!=='empire')visitStore(0,false);activeTray=name;panelOpen=true;$('sheet').classList.remove('collapsed');$('panelToggle').setAttribute('aria-expanded','true');$('panelToggle').textContent='⌄';var titles={factory:'Stations',employees:'Staff',orders:'Deliveries',boosts:'Shop',flowers:'Flower',empire:'Empire'};$('panelTitle').textContent=titles[name];trayTabs.forEach(function(t){t.setAttribute('aria-pressed',String(t.getAttribute('data-tray')===name))});Array.prototype.forEach.call(document.querySelectorAll('[data-pane]'),function(p){p.hidden=p.getAttribute('data-pane')!==name});fitControls()}
  function collapsePanel(){panelOpen=false;$('sheet').classList.add('collapsed');$('panelToggle').setAttribute('aria-expanded','false');$('panelToggle').textContent='⌃';fitControls()}
  trayTabs.forEach(function(tab){tab.onclick=function(){var name=tab.getAttribute('data-tray');if(name===activeTray&&panelOpen)collapsePanel();else showTray(name)}});
  $('panelToggle').onclick=function(){if(panelOpen)collapsePanel();else showTray(activeTray)};

  // Security is a door station: the ID checker's training shares the station panel.
  // One-time nudges for the moments the guide cannot cover: the first web order, the first full shelf, the first full line.
  function firstTimeHints(waiting){
    var h=state.hints;if(!h)return;
    if(!h.web&&onlineRequestsReady()>=1){h.web=true;notify('FIRST WEB ORDER · send it from Deliveries','upgrade');save();return}
    if(!h.storage&&state.stock.some(function(n,i){return i<4&&n>=storageCapacity()})){h.storage=true;notify('STORAGE FULL · expand it in the Shop');save();return}
    if(!h.queue&&waiting>=queueLimit()&&state.lines[4]>0){h.queue=true;notify('LINE IS FULL · upgrade the order desk for more places');save()}
  }
  function renderSecuritySelection(){
    var lvl=state.idStaff,price=Math.floor(20*Math.pow(1.6,lvl)),maxed=lvl>=10000,affordable=!maxed&&state.money>=price,quote=idTrainingQuote(10000),gain=Math.round(.3/(1+lvl*.3)*100);
    $('machineNumber').textContent='DOOR · '+(lvl?'CHECKING IDS':'NO GUARD YET');$('machineName').textContent='SECURITY';$('machineLevel').textContent=lvl;$('machineRate').textContent=securityDuration().toFixed(2)+'s / check';
    $('stationStatus').textContent='Checks IDs at the door before customers join the line. Faster checks keep the queue moving'+(state.scannerLevel?' · scanner +'+Math.round(state.scannerLevel*12)+'%':'')+'.';
    $('upgradeLevel').textContent=maxed?'Lv '+lvl:'Lv '+lvl+' → '+(lvl+1);$('upgradeBenefit').textContent=maxed?'Fully trained':'+'+gain+'% check speed';
    $('stationTier').textContent=lvl>=25?'Head of security':lvl>=10?'Seasoned doorman':lvl?'Door staff':'Unstaffed door';$('stationTier').style.color=lvl>=25?TIER_COLORS[3]:lvl>=10?TIER_COLORS[2]:TIER_COLORS[1];
    $('upgradeFunding').textContent=maxed?'Fully trained':affordable?'Ready to train':fmt(Math.max(0,price-state.money))+' to go';
    $('upgradeProgress').value=maxed?100:Math.min(100,state.money/price*100);$('upgradeProgress').setAttribute('aria-valuetext',affordable?'Training ready':fmt(Math.max(0,price-state.money))+' needed for level '+(lvl+1));
    var preview=$('upgradePreview'),source=document.querySelector('[data-security] canvas');if(preview&&typeof preview.getContext==='function'&&source){var pc=preview.getContext('2d');if(pc){pc.clearRect(0,0,80,100);pc.drawImage(source,0,0)}}
    $('nextAppearance').textContent='Scanner upgrades in the Shop speed up every check.';
    $('machineCost').textContent=maxed?'—':fmt(price);$('buyMachine').disabled=!affordable;$('buyMachine').querySelector('span').textContent=lvl?'TRAIN':'HIRE';
    $('buyMachineMax').disabled=!quote.levels;$('machineMaxLabel').textContent='MAX'+(quote.levels?' +'+quote.levels+' LV':'');$('machineMaxCost').textContent=quote.levels?fmt(quote.cost):'—';$('buyMachineMax').setAttribute('aria-label','Train security by '+quote.levels+' levels for '+fmt(quote.cost));
    $('buyMachine').style.setProperty('--funded',Math.min(100,state.money/price*100)+'%');
    $('upgradeHint').textContent=maxed?'Nobody gets past this door.':!affordable?fmt(price-state.money)+' to go · customer sales earn cash automatically.':lvl?'Shorter ID checks let more customers join the line.':'Hire a doorman so ID checks stop holding up the line.';$('upgradeHint').classList.toggle('ready',affordable);
  }
  function paintSecurityThumbnail(){var card=document.querySelector('[data-security] canvas');if(!card)return;var savedCtx=ctx,savedUnit=unit,savedX=centerX,savedY=centerY,savedAngle=angle;ctx=card.getContext('2d');if(ctx){ctx.clearRect(0,0,80,100);unit=25;centerX=40;centerY=97;angle=.57;drawBox(0,0,-.24,2.6,2.6,.24,['#cbb085','#7f6a4b','#ac9168']);drawBox(.55,-.1,0,.95,.7,1.05,['#ede4cb','#a79c81','#d2c5a5']);drawPerson(-.55,-.45,0,7,false,true,false)}ctx=savedCtx;unit=savedUnit;centerX=savedX;centerY=savedY;angle=savedAngle}
  function paintThumbnails(){paintSecurityThumbnail();var savedCtx=ctx,savedUnit=unit,savedX=centerX,savedY=centerY,savedAngle=angle;machineTabs.forEach(function(tab,i){ctx=tab.querySelector('canvas').getContext('2d');if(!ctx)return;ctx.clearRect(0,0,80,100);unit=25;centerX=40;centerY=97;angle=.57;drawStage({x:0,z:0},i,0)});ctx=savedCtx;unit=savedUnit;centerX=savedX;centerY=savedY;angle=savedAngle}
  function selectSecurity(){securitySelected=true;showTray('factory');renderUI();var card=document.querySelector('[data-security]');if(card&&card.scrollIntoView)card.scrollIntoView({block:'nearest',inline:'nearest'});if(navigator.vibrate)navigator.vibrate(8)}
  function selectMachine(i){securitySelected=false;selected=i;showTray('factory');renderUI();if(machineTabs[i]&&machineTabs[i].scrollIntoView)machineTabs[i].scrollIntoView({block:'nearest',inline:'nearest'});if(navigator.vibrate)navigator.vibrate(8)}
  function buySelected(){if(securitySelected)return trainIdChecker(1);var line=LINES[selected];if(!isOpen(selected))return notify('Build the previous stage first');var c=cost(selected);if(state.money<c)return notify('Need '+fmt(c-state.money)+' more');var oldTier=stationTier(selected);state.money-=c;state.lines[selected]++;if(stationTier(selected)>oldTier)tierFlashes[selected]=1;paintThumbnails();burst(machinePos[selected]);notify(line.name+' · LEVEL '+state.lines[selected],'upgrade');renderUI();save();if(navigator.vibrate)navigator.vibrate(18)}
  function boostAll(){if(state.globalLevel>=BOOST_MAX)return;var c=boostCost(state.globalLevel);if(state.money<c)return notify('Need '+fmt(c-state.money)+' more');state.money-=c;state.globalLevel++;state.multiplier=Math.pow(1.25,state.globalLevel);burst({x:0,z:0},colors.orange);notify('ALL STAGES +25%','upgrade');renderUI();save()}
  function claimOrder(){var o=milestone(state.contract);if(!o||state.lifetime<o.goal)return;state.money+=o.reward;state.contract++;notify(fmt(o.reward)+' ORDER BONUS');renderUI();save()}

  function duration(ms){var seconds=Math.max(0,Math.ceil(ms/1000));return Math.floor(seconds/3600)+'h '+Math.floor(seconds%3600/60)+'m '+seconds%60+'s'}
  STORES.forEach(function(store,i){
    var details=document.createElement('details');details.className='branch-projects';
    details.innerHTML='<summary id="projectSummary'+i+'">Store projects</summary><p class="empire-note">Bonuses include offline earnings.</p>'+STORE_PROJECTS[i].map(function(name,j){return '<div class="branch-project"><div><h4>'+name+'</h4><strong id="projectInfo'+i+j+'"></strong></div><button id="projectBuy'+i+j+'"></button></div>'}).join('');
    $('branchBuy'+i).closest('article').appendChild(details);
    STORE_PROJECTS[i].forEach(function(name,j){$('projectBuy'+i+j).onclick=function(){if(buyProject(state,i,j)){save();renderUI();notify(name+' · +'+fmt(state.empire.network.stores[i].incomeGain)+'/s','upgrade')}}});
  });
  // Short goals and management live in the existing tray; map gestures remain free.
  var today=document.querySelector('[data-empire-section="today"]');
  today.innerHTML='<section id="returnSummary" hidden><h2>Welcome back</h2><p id="returnTime"></p><ul id="returnEarnings"></ul><p id="returnGoals"></p><button id="dismissReturn">Dismiss summary</button></section><h2>Next steps</h2><p id="nextInvestment"></p><div id="shortGoals"></div><section class="reputation"><h2 class="empire-section-heading">Reputation</h2><div class="reputation-summary"><strong id="reputationStatus"></strong><span id="reputationNext"></span></div><progress id="reputationProgress" max="60" value="0" aria-label="Customer reputation"></progress><details class="branch-help reputation-guide"><summary>Customer guide</summary><dl><dt>Regulars</dt><dd>Meadow Mint</dd><dt>Collectors</dt><dd>Boutique strains</dd><dt>Hurried</dt><dd>Wait ≤20 seconds</dd><dt>VIPs</dt><dd>Wait ≤15 seconds · double payment</dd></dl><dl><dt>Match</dt><dd>+1 loyalty · +15% tip</dd><dt>Miss</dt><dd>−1 loyalty</dd><dt>20 loyalty</dt><dd>Collectors unlock</dd><dt>60 loyalty</dt><dd>VIPs unlock · regular matches tip 35%</dd></dl><p>Branch loyalty adds up to 20% income.</p></details></section>';
  [0,1,2].forEach(function(i){var row=document.createElement('div');row.className='short-goal';row.innerHTML='<h3 id="goalTitle'+i+'"></h3><progress id="goalProgress'+i+'" max="100" aria-label="Objective progress"></progress><p id="goalCount'+i+'"></p><button id="goalClaim'+i+'"></button>'; $('shortGoals').appendChild(row);$('goalClaim'+i).onclick=function(){var reward=claimGoal(state,i);if(reward){save();renderUI();notify('GOAL COMPLETE · +'+fmt(reward),'upgrade')}}});
  $('dismissReturn').onclick=function(){state.empire.returnReport=null;save();renderUI()};
  STORES.forEach(function(store,i){
    var controls=document.createElement('div');controls.className='branch-management';
    controls.innerHTML='<div class="branch-facts"><span class="specialty">'+['Exclusive strains','Boutique products','Bulk deliveries'][i]+'</span><span id="branchLoyalty'+i+'"></span></div><details class="branch-settings"><summary>Product &amp; manager</summary><div class="branch-choices"><div><label for="featured'+i+'">Feature</label><select id="featured'+i+'">'+PRODUCTS.map(function(f){return '<option value="'+f+'">'+({everyday:'Everyday',exclusive:'River Mist',boutique:'Boutique',express:'Express'})[f]+'</option>'}).join('')+'</select><p id="featuredEffect'+i+'" class="choice-effect"></p></div><div><label for="manager'+i+'">Manager</label><select id="manager'+i+'">'+MANAGERS.map(function(m){return '<option value="'+m.id+'">'+m.name+'</option>'}).join('')+'</select><p id="managerEffect'+i+'" class="choice-effect"></p></div></div>'+(i===2?'<button id="bulkDispatch">Dispatch 30 jars</button><p id="bulkDetail"></p>':'')+'<details class="branch-help"><summary>Store details</summary><p>'+SPECIALTIES[i]+'</p><p id="branchExpansion'+i+'"></p><p id="branchCustomers'+i+'"></p><p>One store per specialist. Reassigning moves them.</p></details></details>';

    $('branchBuy'+i).closest('article').insertBefore(controls,$('projectSummary'+i).parentElement);
    $('featured'+i).onchange=function(){setFeatured(state.empire,i,this.value);save();renderUI()};
    $('manager'+i).onchange=function(){assignManager(state.empire,i,this.value);save();renderUI()};
  });
  function expandBranch(index){
    STORES.forEach(function(_,i){var open=i===index;$('branchToggle'+i).setAttribute('aria-expanded',String(open));$('branchBody'+i).hidden=!open;var nav=$('branchToggle'+i).parentElement.querySelector('.operation-tabs');if(nav)nav.hidden=!open;});
  }
  STORES.forEach(function(store,i){
    var article=$('branchBuy'+i).closest('article'),heading=article.firstElementChild;
    var toggle=document.createElement('button');toggle.id='branchToggle'+i;toggle.className='branch-toggle';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','branchBody'+i);
    var name=document.createElement('span');name.className='branch-name';name.textContent=store.name;
    toggle.appendChild(name);toggle.appendChild($('branchLevel'+i));
    var body=document.createElement('div');body.id='branchBody'+i;body.className='branch-body';body.hidden=true;
    body.appendChild($('branchHint'+i));heading.remove();
    while(article.firstChild)body.appendChild(article.firstChild);
    article.appendChild(toggle);article.appendChild(body);
    var settings=body.querySelector('.branch-settings'),fields=document.createElement('div');fields.className='branch-settings';settings.querySelector(':scope > summary').remove();while(settings.firstChild)fields.appendChild(settings.firstChild);settings.replaceWith(fields);
    toggle.onclick=function(){var open=toggle.getAttribute('aria-expanded')!=='true';expandBranch(open?i:-1);if(open)requestAnimationFrame(function(){toggle.scrollIntoView({block:'start'})})};
  });
  $('bulkDispatch').onclick=function(){var reward=dispatchBulk(state);if(reward){queueDeliveryWave(1);notify('BULK DELIVERY · +'+fmt(reward),'upgrade');save();renderUI()}};
  var productIcons=[
    '<path d="M16 28V12m0 8C5 20 5 8 5 8s11 0 11 12Zm0-4C16 5 27 5 27 5s0 11-11 11Z"/>',
    '<path d="m5 23 17-17 5 5-17 17Z M8 20l5 5m7-17 5 5M7 7c-3-3 3-3 0-6"/>',
    '<rect x="5" y="5" width="22" height="22" rx="4"/><path d="M5 16h22M16 5v22M9 10h3m8 0h3M9 21h3m8 0h3"/>'
  ];
  var menuPanel=document.createElement('section');menuPanel.className='product-line';menuPanel.setAttribute('aria-labelledby','productLineTitle');menuPanel.innerHTML='<h2 id="productLineTitle">Product line</h2><div class="format-options">'+FORMATS.map(function(f,i){return '<button id="format'+i+'" type="button"><svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+productIcons[i]+'</svg><strong>'+f.name+'</strong><small></small></button>'}).join('')+'</div><p id="formatBenefit"></p>';
  document.querySelector('[data-pane="flowers"]').prepend(menuPanel);
  var flowerHelp=$('flowerSummary').nextElementSibling;if(flowerHelp){var flowerGuide=document.createElement('details');flowerGuide.className='strain-guide';flowerGuide.innerHTML='<summary>Strain guide</summary>';flowerHelp.before(flowerGuide);flowerGuide.append(flowerHelp)}
  FORMATS.forEach(function(_,i){$('format'+i).onclick=function(){if(chooseFormat(state,i)){save();renderUI();notify(FORMATS[i].name+' featured','upgrade')}}});
  var prestigePanel=document.createElement('details');prestigePanel.className='depth-panel';prestigePanel.innerHTML='<summary>New beginnings</summary><p id="prestigeStatus"></p><p>Reopen from scratch for +20% permanent base sales per rank.</p><button id="prestigeStart" type="button"></button>';
  document.querySelector('[data-empire-section="growth"]').append(prestigePanel);
  var soundButton=document.createElement('button');soundButton.id='soundToggle';soundButton.type='button';soundButton.onclick=function(){state.sound=!state.sound;playSound('upgrade',state.sound);save();renderUI()};document.querySelector('.shop-reset').prepend(soundButton);
  var prestigeDialog=document.createElement('div');prestigeDialog.id='prestigeModal';prestigeDialog.className='modal-wrap';prestigeDialog.hidden=true;prestigeDialog.innerHTML='<div class="modal" role="dialog" aria-modal="true" aria-labelledby="prestigeTitle"><small>OPTIONAL PRESTIGE</small><h2 id="prestigeTitle">Reopen your empire?</h2><p id="prestigePreview"></p><p>Clears cash, stores, staff, stock, strains, reputation, collections, goals and events. Only your prestige rank and sound preference carry over.</p><div><button id="prestigeCancel">Keep playing</button><button id="prestigeConfirm">Reopen</button></div></div>';document.body.append(prestigeDialog);
  $('prestigeStart').onclick=function(){var o=prestigeOffer(state);if(!o.eligible)return;$('prestigePreview').textContent='Next rank: '+o.multiplier.toFixed(1)+'× base main-shop and branch income.';prestigeDialog.hidden=false;$('prestigeCancel').focus()};
  $('prestigeCancel').onclick=function(){prestigeDialog.hidden=true;$('prestigeStart').focus()};
  prestigeDialog.addEventListener('keydown',function(e){if(e.key==='Escape')$('prestigeCancel').click();if(e.key==='Tab'){e.preventDefault();(document.activeElement===$('prestigeCancel')?$('prestigeConfirm'):$('prestigeCancel')).focus()}});
  $('prestigeConfirm').onclick=function(){var offer=prestigeOffer(state);if(!offer.eligible)return;var rank=offer.rank+1,sound=state.sound;resetRun(rank,sound);prestigeDialog.hidden=true;save();showTray('factory');renderUI();notify('Prestige '+rank+' · permanent sales bonus','upgrade')};
  var droneRow=document.createElement('div');droneRow.className='shop-upgrade';droneRow.innerHTML='<div class="shop-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="11" y="11" width="10" height="9" rx="2"/><path d="m11 12-5-5m15 5 5-5m-15 12-5 6m15-6 5 6M2 7h8m12 0h8M2 25h8m12 0h8M13 24h6"/></svg></div><div class="shop-copy"><h2>Auto drone</h2><strong id="autoDroneBenefit">Send a ready order every 10s</strong></div><button id="buyAutoDrone"><span>Install</span><b id="autoDronePrice"></b></button>';
  document.querySelector('[data-pane="boosts"]').append(droneRow);
  var droneControl=document.createElement('div');droneControl.className='auto-drone-control';droneControl.innerHTML='<div><strong>Auto drone</strong><small id="autoDroneStatus"></small></div><button id="autoDroneToggle" type="button"></button><button id="autoDroneBulk" type="button" hidden></button>';document.querySelector('[data-pane="orders"]').prepend(droneControl);
  function purchaseAutoDrone(){if(buyAutoDrone(state)){save();renderUI();notify('Auto drone installed','upgrade')}}
  function purchaseBulkDrone(){if(buyBulkDrone(state)){save();renderUI();notify('Bulk auto drone installed','upgrade')}}
  $('buyAutoDrone').onclick=function(){if(state.autoDrone.owned)purchaseBulkDrone();else purchaseAutoDrone()};
  $('autoDroneBulk').onclick=function(){if(!state.autoDrone.bulk){purchaseBulkDrone();return}state.autoDrone.mode=state.autoDrone.mode==='bulk'?'single':'bulk';save();renderUI()};
  $('autoDroneToggle').onclick=function(){if(!state.autoDrone.owned){purchaseAutoDrone();return}state.autoDrone.enabled=!state.autoDrone.enabled;save();renderUI()};
  var shopBrowser=mountShopBrowser({getState:function(){return state},components:COMPONENTS,kiosks:kioskCount,queueLimit:queueLimit,recommend:function(open){var i=slowestStation();if(open)selectMachine(i);return ['Seeds','Grow','Harvest','Pack','Orders','Pickup'][i]+' · upgrade '+fmt(cost(i))}});
  var operationsUI=mountOperations({getState:function(){return state},format:fmt,changed:function(message){save();renderUI();if(message)notify(message,'upgrade')},visit:function(i,manage){visitStore(i+1,!manage);if(manage)manageViewedStore()},mainFlow:function(open){
    var station=slowestStation(),reason='Capacity';
    if(state.stock[1]>20&&state.stock[2]<2){station=2;reason='Harvest backlog'}else if(state.stock[2]>20&&state.stock[3]<2){station=3;reason='Packing backlog'}else if(state.stock[4]>20&&customers.some(function(c){return c.ordered&&!c.bag})){station=5;reason='Pickup queue'}else if(state.stock[0]<1){station=0;reason='Seed supply'}else if(state.stock[1]<1){station=1;reason='Growing'}else if(state.stock[2]<1){station=2;reason='Harvesting'}else if(state.stock[3]<1){station=3;reason='Packing stock'}else if(state.stock[4]<1){station=4;reason='Preparing orders'}
    if(open)selectMachine(station);return 'Main shop · '+reason+' · '+LINES[station].name.toLowerCase();
  }});
  function renderManagement(){
    var p=state.empire,report=p.returnReport,investment=affordableImprovement(state,LINES.map(function(line,i){return {name:'Main store '+line.name.toLowerCase()+' upgrade',cost:cost(i)}}));
    $('returnSummary').hidden=!report;
    if(report){$('returnTime').textContent=duration(report.seconds*1000)+' away · estimated earnings (4-hour cap, 1× rate)';$('returnEarnings').innerHTML=report.earnings.map(function(n,i){return '<li><span>'+(['Main store'].concat(STORES.map(function(s){return s.name})))[i]+'</span><strong>'+fmt(n)+'</strong></li>'}).join('');$('returnGoals').textContent=report.goals+' goals ready to collect on return. Customer service and deliveries resume while playing.';}
    $('nextInvestment').textContent=investment?(state.money>=investment.cost?'Affordable now: ':'Next investment: ')+investment.name+' · '+fmt(investment.cost):'All branch investments complete. Keep growing your main store.';
    [0,1,2].forEach(function(i){var g=goalStatus(p,i);$('goalTitle'+i).textContent=g.title;$('goalProgress'+i).value=g.progress/g.target*100;$('goalCount'+i).textContent=Math.floor(g.progress)+' / '+g.target+' · '+p.goalsCompleted+' goals completed';$('goalClaim'+i).textContent='Collect '+fmt(g.reward);$('goalClaim'+i).disabled=g.progress<g.target});
    var reputationTarget=p.reputation<20?20:60;
    $('reputationStatus').textContent=p.reputation+' loyalty';
    $('reputationNext').textContent=p.reputation>=60?'VIPs unlocked':p.reputation>=20?'VIPs at 60':'Collectors at 20';
    $('reputationProgress').max=reputationTarget;$('reputationProgress').value=Math.min(p.reputation,reputationTarget);
    $('reputationProgress').setAttribute('aria-valuetext',p.reputation+' loyalty. '+(p.reputation>=60?'VIPs unlocked':p.reputation>=20?'Collectors unlocked. VIPs at 60.':'Collectors at 20.'));
    STORES.forEach(function(_,i){var store=p.stores[i];$('featured'+i).value=store.featured;$('featured'+i).disabled=!store.level;$('featured'+i).querySelector('[value="exclusive"]').disabled=!exclusiveAvailable(p);$('manager'+i).value=store.manager;$('manager'+i).disabled=!store.level;$('managerEffect'+i).textContent=({none:'Standard team',grower:'+30% exclusive income',host:'2× loyalty gains',dispatcher:'Faster service · +25% bulk'})[store.manager];$('featuredEffect'+i).textContent=({everyday:'For regulars',exclusive:'Collectors · +15% income',boutique:i===1&&store.level>=2?'Collectors · +40% income':'For collectors',express:'Faster service'})[store.featured];$('featured'+i).closest('.branch-management').hidden=!store.level;
      $('branchLoyalty'+i).textContent=store.loyalty+' loyalty';$('branchLoyalty'+i).title=store.loyalty>=60?'VIP following':store.loyalty>=20?'Collectors unlocked':'Collectors unlock at 20';$('branchCustomers'+i).textContent=store.served+' served · '+(store.loyalty>=60?'VIP following':store.loyalty>=20?'Collectors unlocked':'Collectors at 20 loyalty');
      $('branchExpansion'+i).textContent=store.level<3?'Display wing at level 3':store.level<5?'Specialist employee at level 5':store.level<7?'Terrace at level 7':'All expansions built';
    });
    $('bulkDispatch').disabled=p.stores[2].level<2||state.stock[3]<30;
    $('bulkDetail').textContent=(p.stores[2].level<2?'Unlocks at level 2 · ':'')+fmt(bulkReward(p))+' reward · '+state.stock[3]+'/30 shared jars';
  }
  function renderEmpire(){
    renderStoreView();renderManagement();operationsUI.render();
    var p=state.empire,d=dailyStatus(p),e=eventStatus(p),m=CAREER[p.career];
    $('empireBadge').hidden=!(d.available||(m&&state.lifetime>=m.goal)||(e.joined&&!e.claimed&&e.progress>=e.goal));
    $('careerName').textContent=m?m.name:'Bud empire complete';
    $('careerDetail').textContent=m?fmt(state.lifetime)+' / '+fmt(m.goal)+' lifetime revenue':'All six career milestones collected.';
    $('careerProgress').value=m?Math.min(100,state.lifetime/m.goal*100):100;
    $('careerBonus').textContent='Permanent sale bonus: +'+(p.career*5)+'% · '+p.career+' / 6 milestones';
    $('careerClaim').disabled=!m||state.lifetime<m.goal;
    $('careerClaim').textContent=m?'Collect '+fmt(m.reward)+' + 5% sale bonus':'Career complete';
    $('branchSummary').textContent=(1+p.stores.filter(function(s){return s.level>0}).length)+'/4 open · '+fmt(branchRate(p)*state.gameSpeed)+'/s';
    STORES.forEach(function(store,i){var level=p.stores[i].level,locked=state.lifetime<store.goal,max=level>=10;
      $('branchLevel'+i).textContent=level?'Lv '+level+'/10 · '+fmt(storeRate(p,i)*state.gameSpeed)+'/s':'Unopened · starts at '+fmt(store.rate)+'/s at 1×';
      $('branchHint'+i).textContent=locked?'Unlock at '+fmt(store.goal)+' revenue':max?'':'Next: +'+fmt(nextStoreRate(p,i)-storeRate(p,i))+'/s';$('branchHint'+i).hidden=max;$('branchBuy'+i).hidden=max;$('projectSummary'+i).parentElement.hidden=!level;
      $('projectSummary'+i).textContent='Projects · '+p.stores[i].projects.filter(Boolean).length+'/3';
      STORE_PROJECTS[i].forEach(function(name,j){
        var owned=p.stores[i].projects[j],required=PROJECT_LEVELS[j],cost=projectCost(i,j),button=$('projectBuy'+i+j);
        var gain=storeRate(p,i)/(1+projectBonus(p,i))*PROJECT_BONUSES[j];
        $('projectInfo'+i+j).textContent=owned?'Installed · +'+Math.round(PROJECT_BONUSES[j]*100)+'% base income':level<required?'Unlocks at store level '+required:'+'+fmt(gain)+'/s at 1× · +'+Math.round(PROJECT_BONUSES[j]*100)+'% base income';
        button.textContent=owned?'Installed':level<required?'Level '+required:'Build '+fmt(cost);
        button.disabled=owned||level<required||state.money<cost;
        button.setAttribute('aria-label',name+', '+button.textContent);
      });
      $('branchBuy'+i).textContent=max?'Maximum':(level?'Upgrade ':'Open ')+fmt(storeCost(p,i));
      $('branchBuy'+i).disabled=max||locked||state.money<storeCost(p,i);$('branchVisit'+i).disabled=!level;$('branchVisit'+i).textContent=p.activeStore===i+1?'Viewing':'Visit';$('branchVisit'+i).setAttribute('aria-pressed',String(p.activeStore===i+1));
    });
    $('dailyTitle').textContent=d.available?'Day '+d.day+' is ready':'Day '+d.day+' collected';
    $('dailyTime').textContent='Next daily reset in '+duration(d.remaining)+' · midnight UTC';
    $('dailyClaim').textContent=d.available?'Collect '+fmt(d.reward):'Collected today';$('dailyClaim').disabled=!d.available;
    DAILY.forEach(function(reward,i){var el=$('dailyDay'+i);el.classList.toggle('current',i===d.day-1);el.classList.toggle('collected',i<d.day-1||(!d.available&&i===d.day-1));el.setAttribute('aria-label','Day '+(i+1)+', '+fmt(reward)+(i===d.day-1?(d.available?', ready to collect':', collected'):''));});
    $('eventName').textContent=e.name;$('eventDescription').textContent=e.copy+' Earn '+fmt(e.reward)+' and a trophy. Event collectors visit every fourth arrival and tip 25% extra for boutique products. Exclusive reward: '+['market lantern','vendor display','harvest planter'][e.slot%3]+' for every branch.';
    $('eventTime').textContent=(e.open?'Ends in ':e.joined&&e.progress>=e.goal&&!e.claimed?'Claim before next event in ':'Next event in ')+duration(e.remaining);
    $('eventProgress').value=Math.min(100,e.progress/e.goal*100);
    $('eventCount').textContent=e.claimed?'Reward collected':e.joined?e.progress+' / '+e.goal+(e.open?' completed':e.progress>=e.goal?' · Complete':' · Event ended'):'Join to start counting progress';
    $('eventAction').textContent=e.claimed?'Collected':e.joined?(e.progress>=e.goal?'Collect '+fmt(e.reward):e.open?'Challenge in progress':'Event ended'):e.open?'Join event':'Waiting for next event';
    $('eventAction').disabled=e.claimed||(e.joined?e.progress<e.goal:!e.open);
    $('eventTrophies').textContent=p.trophies+' event '+(p.trophies===1?'trophy':'trophies')+' · '+p.rewards.filter(Boolean).length+' / 3 scene keepsakes collected';
  }
  $('dailyClaim').onclick=function(){var reward=claimDaily(state);if(reward){save();renderUI();notify('DAILY REWARD · +'+fmt(reward),'upgrade')}};
  $('careerClaim').onclick=function(){var reward=claimCareer(state);if(reward){save();renderUI();notify('CAREER MILESTONE · +'+fmt(reward)+' · +5% sale value','upgrade')}};
  STORES.forEach(function(store,i){$('branchBuy'+i).onclick=function(){if(buyStore(state,i)){save();renderUI();notify(store.name+' upgraded · +'+fmt(state.empire.network.stores[i].incomeGain)+'/s','upgrade')}}});
  $('eventAction').onclick=function(){var e=eventStatus(state.empire);if(!e.joined){if(joinEvent(state.empire))notify('EVENT JOINED · '+e.copy)}else{var reward=claimEvent(state);if(reward)notify('EVENT COMPLETE · +'+fmt(reward),'upgrade')}save();renderUI()};
  var empireShell=mountEmpireShell({fit:fitControls,getState:function(){return state},format:fmt});
  var startGuide=mountStartGuide({showTray:showTray,collapse:function(){showTray('factory')},fit:fitControls});var guideReplay=document.createElement('button');guideReplay.type='button';guideReplay.className='guide-replay';guideReplay.textContent='Replay the start guide';guideReplay.onclick=function(){startGuide.open()};document.querySelector('.shop-reset').prepend(guideReplay);mountSettings();
  Array.prototype.forEach.call(document.querySelectorAll('[data-empire-view]'),function(button){button.onclick=function(){var view=button.getAttribute('data-empire-view');Array.prototype.forEach.call(document.querySelectorAll('[data-empire-view]'),function(b){b.setAttribute('aria-pressed',String(b===button))});Array.prototype.forEach.call(document.querySelectorAll('[data-empire-section]'),function(section){section.hidden=section.getAttribute('data-empire-section')!==view});document.querySelector('[data-pane=empire]').scrollTop=0;fitControls()}});

  function syncMapView(){
    var id=state.empire.activeStore;document.body.dataset.storeView=id?'branch':'main';
    $('branchMapMarker').hidden=!id;
    $('world').setAttribute('aria-label',id?BRANCH_THEMES[id-1].name+'. '+BRANCH_THEMES[id-1].description+' Drag to pan, pinch to zoom, or tap the counter to manage.':'Isometric dispensary. Drag to pan, pinch to zoom, and tap a station.');
    renderStoreView();
  }
  function visitStore(id,collapse){
    if(!selectStore(state.empire,id))return;
    zoom=1;panX=0;panY=0;syncMapView();
    if(collapse!==false){showTray(id?'empire':'factory');collapsePanel()}
    fitControls();save();renderUI();
  }
  function renderStoreView(){
    var id=state.empire.activeStore;
    ['Original shop','Riverside','Old Town','City Center'].forEach(function(name,i){var button=$('storeButton'+i),locked=i>0&&!state.empire.stores[i-1].level;button.disabled=locked;button.setAttribute('aria-pressed',String(id===i));button.setAttribute('aria-label',name+(locked?' · Unlock in Empire':id===i?' · Current store':' · Visit store'));button.title=name+(locked?' · Unlock in Empire':'');});
    $('manageViewedStore').hidden=!id;
    if(locationToggle&&locationToggle.dataset.store!==String(id)){locationToggle.innerHTML=$('storeButton'+id).querySelector('.location-icon').outerHTML+'<span>'+['Main','Riverside','Old Town','City'][id]+'</span><span class=location-chevron aria-hidden=true>⌄</span>';locationToggle.dataset.store=String(id);locationToggle.setAttribute('aria-label','Change location · '+['Main shop','Riverside','Old Town','City Center'][id])}
    if(id){$('branchMapMarker').textContent='Manage · Lv '+state.empire.stores[id-1].level;$('branchMapMarker').setAttribute('aria-label','Manage '+STORES[id-1].name+' upgrades');}
  }
  function manageViewedStore(){
    var id=state.empire.activeStore;if(!id)return;
    showTray('empire');document.querySelector('[data-empire-view="growth"]').click();
    expandBranch(id-1);$('branchToggle'+(id-1)).scrollIntoView({block:'start'});$('branchToggle'+(id-1)).focus({preventScroll:true});
  }
  function updateBranchMarker(){
    var id=state.empire.activeStore;if(!id)return;
    var f=BRANCH_THEMES[id-1].focus,q=project(f.x,f.y,f.z),el=$('branchMapMarker');
    el.style.transform='translate3d('+q.x+'px,'+q.y+'px,0) translate(-50%,-50%)';el.style.fontSize=Math.max(9,Math.min(12,unit*.38))+'px';
    el.style.visibility=q.x<0||q.x>width||q.y<0||q.y>height?'hidden':'visible';
  }
  var locationNav=document.querySelector('.store-switcher'),locationOptions=document.createElement('div');locationOptions.id='locationOptions';locationOptions.className='location-options';locationOptions.hidden=true;while(locationNav.firstChild)locationOptions.appendChild(locationNav.firstChild);locationNav.appendChild(locationOptions);
  var locationToggle=document.createElement('button');locationToggle.id='locationToggle';locationToggle.type='button';locationToggle.setAttribute('aria-expanded','false');locationToggle.setAttribute('aria-controls','locationOptions');locationToggle.innerHTML=$('storeButton0').querySelector('.location-icon').outerHTML+'<span>Main</span><span class=location-chevron aria-hidden=true>⌄</span>';locationNav.append(locationToggle,locationOptions);document.querySelector('.map-controls').appendChild(locationNav);
  function closeLocations(){locationOptions.hidden=true;locationToggle.setAttribute('aria-expanded','false')}
  locationToggle.onclick=function(){var open=locationOptions.hidden;locationOptions.hidden=!open;locationToggle.setAttribute('aria-expanded',String(open))};
  document.addEventListener('pointerdown',function(e){if(!locationNav.contains(e.target))closeLocations()});
  locationNav.addEventListener('keydown',function(e){if(e.key==='Escape'){closeLocations();locationToggle.focus()}});
  Array.prototype.forEach.call(document.querySelectorAll('[data-store]'),function(button){button.onclick=function(){var id=Number(this.getAttribute('data-store'));closeLocations();if(id!==state.empire.activeStore)visitStore(id);locationToggle.focus({preventScroll:true})}});$('manageViewedStore').onclick=function(){closeLocations();manageViewedStore()};$('branchMapMarker').onclick=manageViewedStore;
  STORES.forEach(function(_,i){$('branchVisit'+i).onclick=function(){visitStore(i+1)}});

  var touches={},gestureMoved=false,gestureOrigin=null;
  var hintHideTimer=setTimeout(function(){$('gestureHint').classList.add('is-hidden')},4500),hintIdleTimer;
  function mapHintActivity(){
    clearTimeout(hintHideTimer);clearTimeout(hintIdleTimer);$('gestureHint').classList.add('is-hidden');
    hintIdleTimer=setTimeout(function(){
      if(document.hidden||Object.keys(touches).length)return;
      $('gestureHint').classList.remove('is-hidden');
      hintHideTimer=setTimeout(function(){$('gestureHint').classList.add('is-hidden')},4000);
    },30000);
  }
  canvas.addEventListener('pointerdown',function(e){mapHintActivity();canvas.setPointerCapture(e.pointerId);touches[e.pointerId]={x:e.clientX,y:e.clientY};if(Object.keys(touches).length===1){gestureMoved=false;gestureOrigin={x:e.clientX,y:e.clientY}}else gestureMoved=true});
  canvas.addEventListener('pointermove',function(e){
    if(!touches[e.pointerId])return;mapHintActivity();var before=Object.values(touches),previous=touches[e.pointerId];touches[e.pointerId]={x:e.clientX,y:e.clientY};var after=Object.values(touches);
    if(after.length===1){var dx=e.clientX-previous.x,dy=e.clientY-previous.y;if(Math.hypot(e.clientX-gestureOrigin.x,e.clientY-gestureOrigin.y)>5)gestureMoved=true;if(gestureMoved){panX+=dx;panY+=dy;applyCamera()}}
    else if(after.length===2){var rect=canvas.getBoundingClientRect(),oldDistance=Math.hypot(before[0].x-before[1].x,before[0].y-before[1].y),newDistance=Math.hypot(after[0].x-after[1].x,after[0].y-after[1].y),mx=(after[0].x+after[1].x)/2-rect.left,my=(after[0].y+after[1].y)/2-rect.top;panX+=(after[0].x+after[1].x-before[0].x-before[1].x)/2;panY+=(after[0].y+after[1].y-before[0].y-before[1].y)/2;applyCamera();if(oldDistance>0)zoomAt(zoom*newDistance/oldDistance,mx,my)}
  });
  canvas.addEventListener('pointerup',function(e){mapHintActivity();if(!gestureMoved&&Object.keys(touches).length===1&&state.empire.activeStore){var br=canvas.getBoundingClientRect(),f=BRANCH_THEMES[state.empire.activeStore-1].focus,q=project(f.x,f.y,f.z);if(Math.hypot(e.clientX-br.left-q.x,e.clientY-br.top-q.y)<Math.max(45,unit*3))manageViewedStore()}else if(!gestureMoved&&Object.keys(touches).length===1){var rect=canvas.getBoundingClientRect(),best=-1,distance=60;machinePos.forEach(function(pos,i){var p=project(pos.x,1.4+(pos.y||0),pos.z),d=Math.hypot(e.clientX-rect.left-p.x,e.clientY-rect.top-p.y);if(d<distance){best=i;distance=d}});var online=project(-10.7,8.45,1.5),od=Math.hypot(e.clientX-rect.left-online.x,e.clientY-rect.top-online.y);if(od<distance){showTray('orders');renderUI()}else if(best>=0)selectMachine(best)}delete touches[e.pointerId];if(Object.keys(touches).length)gestureMoved=true;else gestureOrigin=null});
  function cancelPointer(e){mapHintActivity();delete touches[e.pointerId];gestureMoved=true}
  canvas.addEventListener('pointercancel',cancelPointer);canvas.addEventListener('lostpointercapture',cancelPointer);
  canvas.addEventListener('wheel',function(e){mapHintActivity();e.preventDefault();var r=canvas.getBoundingClientRect();zoomAt(zoom*Math.exp(-e.deltaY*.0015),e.clientX-r.left,e.clientY-r.top)},{passive:false});
  $('zoomIn').onclick=function(){mapHintActivity();zoomAt(zoom*1.2,width/2,height/2)};
  $('zoomOut').onclick=function(){mapHintActivity();zoomAt(zoom/1.2,width/2,height/2)};
  $('centerView').onclick=function(){mapHintActivity();zoom=1;panX=0;panY=0;applyCamera()};
  var staffButtons=Array.prototype.slice.call(document.querySelectorAll('[data-staff]'));
  staffButtons.forEach(function(button){button.onclick=function(){upgradeStaff(Number(button.getAttribute('data-staff')))}});
  STRAINS.forEach(function(_,i){$('flowerBuy'+i).onclick=function(){buyStrain(i)};$('flowerSelect'+i).onclick=function(){selectStrain(i)}});
  COMPONENTS.forEach(function(_,i){$('componentBuy'+i).onclick=function(){upgradeComponent(i)}});
  var webStock=document.querySelector('#stockStatus .stock-online');webStock.setAttribute('role','button');webStock.setAttribute('tabindex','0');webStock.setAttribute('aria-label','Open deliveries');webStock.onclick=function(){showTray('orders')};webStock.onkeydown=function(event){if(event.key==='Enter'||event.key===' '){event.preventDefault();showTray('orders')}};
  Array.prototype.forEach.call(document.querySelectorAll('#stockStatus .stock-item:not(.stock-online)'),function(item,i){
    var station=[0,1,2,3,5][i];
    item.setAttribute('role','button');item.setAttribute('tabindex','0');
    item.setAttribute('aria-label','Open '+LINES[station].name.toLowerCase()+' upgrades');
    item.onclick=function(){selectMachine(station)};
    item.onkeydown=function(event){if(event.key==='Enter'||event.key===' '){event.preventDefault();selectMachine(station)}};
  });
  $('stationTraining').onclick=function(){upgradeStaff(selected)};
  $('buyKiosk').onclick=function(){if(!state.kiosk)buyKiosk();else if(!state.secondKiosk)buySecondKiosk();else buyThirdKiosk()};

  $('upgradeQueue').onclick=upgradeQueue;
  $('flowAction').onclick=function(){if(state.gameSpeed===0)setGameSpeed(1);else selectMachine(slowestStation())};
  LINES.forEach(function(_,i){$('staffMax'+i).onclick=function(){trainStaffMax(i)}});
  $('stationTrainingMax').onclick=function(){trainStaffMax(selected)};
  $('trainIdChecker').onclick=function(){trainIdChecker(1)};
  $('trainIdCheckerMax').onclick=function(){trainIdChecker(10000)};
  $('fulfillOnline').onclick=fulfillOnline;
  $('fulfillOnlineBatch').onclick=function(){if(onlineBatch(10).count===10)sendOnlineOrders(10)};
  $('fulfillOnlineMax').onclick=function(){if(state.lines[3]>=10)sendOnlineOrders(Infinity)};
  window.addEventListener('resize',resize);$('buyMachine').onclick=buySelected;$('buyMachineMax').onclick=buySelectedMax;$('upgradeStorage').onclick=upgradeStorage;$('boost').onclick=boostAll;$('claim').onclick=claimOrder;$('resetOpen').onclick=function(){$('resetModal').hidden=false};$('resetCancel').onclick=function(){$('resetModal').hidden=true};$('resetConfirm').onclick=function(){resetRun(0,state.sound)};function resetRun(rank,sound){state=fresh();state.empire.prestige=rank;state.sound=sound;readyWork=0;work=[0,0,0,0,0,0];batchRemainder=[0,0,0,0];customers=[];arrival=0;customerId=0;deliveryDrones=[];particles=[];taskClocks.fill(0);taskActivity.fill(0);cropGrowth=[.15,.4,.7,.95];tierFlashes.fill(0);recentPickupRatings=[];animationTime=0;sceneTime=0;crateTime=0;render.last=undefined;save();$('resetModal').hidden=true;notify('FACTORY RESET');syncMapView();paintThumbnails();renderUI()};

  function finishLoading(){requestAnimationFrame(function(){requestAnimationFrame(function(){$('loading').hidden=true})})}
  var offline=collectOffline();if(offline>=1){setTimeout(function(){notify('WHILE AWAY +'+fmt(offline))},500)}
  function fitControls(){document.documentElement.style.setProperty('--hud-height',document.querySelector('.hud').getBoundingClientRect().height+'px');document.documentElement.style.setProperty('--dock-height',$('sheet').getBoundingClientRect().height+'px');resize()}
  if(window.ResizeObserver){new ResizeObserver(fitControls).observe($('sheet'))}
  var empireViews=document.querySelector('.empire-views');function measureEmpireViews(){var h=empireViews.getBoundingClientRect().height;if(h)document.querySelector('[data-pane="empire"]').style.setProperty('--empire-tabs-height',h+'px')}if(window.ResizeObserver)new ResizeObserver(measureEmpireViews).observe(empireViews);measureEmpireViews();
  window.addEventListener('resize',fitControls);
  // Desktop conveniences: the hint names the pointer, and speed and tabs have keys when no field has focus.
  if(!window.matchMedia('(pointer:coarse)').matches){$('gestureHint').textContent='DRAG TO PAN · SCROLL TO ZOOM · SPACE PAUSES · 1 2 4 SET SPEED'}
  document.addEventListener('keydown',function(e){
    if(e.metaKey||e.ctrlKey||e.altKey)return;var t=e.target,tag=t&&t.tagName;if(tag==='INPUT'||tag==='SELECT'||tag==='TEXTAREA'||(t&&t.isContentEditable))return;
    if(document.querySelector('.start-guide:not([hidden])')||document.querySelector('.modal-wrap:not([hidden])'))return;
    if(e.key===' '){e.preventDefault();setGameSpeed(state.gameSpeed===0?1:0)}
    else if(e.key==='1'||e.key==='2'||e.key==='4')setGameSpeed(Number(e.key));
    else if(e.key==='Escape'&&panelOpen)collapsePanel();
  });
  if(state.empire.returnReport){renderUI()}
  syncMapView();if(!state.empire.returnReport&&state.empire.activeStore){showTray('empire');collapsePanel()}
  paintThumbnails();
  fitControls();renderUI();ctx.fillStyle=colors.bg;ctx.fillRect(0,0,width,height);window.__shiftReady=true;finishLoading();if(firstRun&&!startGuide.seen())setTimeout(function(){startGuide.open()},600);requestAnimationFrame(render);setInterval(tick,50);setInterval(renderUI,250);setInterval(function(){if(!document.hidden)save()},5000);window.addEventListener('beforeunload',function(){if(!document.hidden)save()});window.addEventListener('pagehide',function(){if(!document.hidden)save()});
  document.addEventListener('visibilitychange',function(){tickTime=performance.now();tickRemainder=0;if(document.hidden){save()}else{collectOffline();if(state.empire.returnReport){renderUI()}renderUI()}});

  if(document.modelContext&&document.modelContext.registerTool){document.modelContext.registerTool({name:'read_factory_status',title:'Read factory status',description:'Read cash, production, and machine levels.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute:function(){return{autoDrone:state.autoDrone,deliveryDrones:deliveryDrones.length,productMenu:state.productMenu,prestige:state.empire.prestige,contract:state.contract,viewedStore:state.empire.activeStore,branchLevels:state.empire.stores.map(function(s){return s.level}),branchProjects:state.empire.stores.map(function(s){return s.projects}),network:state.empire.network,reputation:state.empire.reputation,management:state.empire.stores,goalsCompleted:state.empire.goalsCompleted,branchIncome:branchRate(state.empire)*state.gameSpeed,cash:Math.floor(state.money),lifetime:Math.floor(state.lifetime),perSecond:production()*state.gameSpeed,gameSpeed:state.gameSpeed,paused:state.gameSpeed===0,lineLevels:state.lines,stock:state.stock,customersServed:state.sold,employeeLevels:state.staff,onlineCompleted:state.onlineCompleted,camera:{zoom:zoom,panX:panX,panY:panY,angle:angle},customers:customers.map(function(c){return{kind:c.kind,id:c.id,phase:c.phase,ordered:c.ordered,bag:c.bag}})}}});}
})();
