import {migrateOrderCounters,orderCounterPositions,orderCounterCost,buyOrderCounter,ORDER_QUEUE_GATE,assignOrderCounter,atOrderCounter,orderAvailability} from './order-counters.js';
import {LOUNGE_TIERS,LOUNGE_MAX,migrateLounge,loungeTier,loungeUpgradeCost,loungeSeats,loungeSessionSeconds,buyLoungeTier,wantsLounge,loungeAdmission,loungeTake,loungeRate,loungeCurrentRate} from './lounge.js';
import {migrateJourney,advanceJourney,CHAPTERS} from './journey.js';
import {mountJourney} from './journey-ui.js';
import {manageDialog} from './dialog-focus.js';
import {AUTO_DRONE_COST,BULK_DRONE_COST,buyAutoDrone,buyBulkDrone,autoDroneLimit,migrateAutoDrone,autoDroneReady} from './auto-drone.js';
import {FORMATS,wantedFormat,strainForFormat,formatPremium,BOOST_MAX,boostCost,migrateMenu,chooseFormat,strainFormat,dominantFormat,menuFormatFactor,milestone,prestigeOffer,elapsedSteps} from './depth.js';
import {makeSound} from './sfx.js';
import {installQuietDom} from './quiet-dom.js';
import {createTelemetry} from './telemetry.js';
installQuietDom();
import {mountShopBrowser} from './shop-browser.js';
import {tickOperations,atmosphere,neighborhood} from './operations.js';
import {mountOperations} from './operations-ui.js';
import {mountEmpireShell} from './empire-shell.js';
import {mountStartGuide} from './start-guide.js';
import {mountSettings} from './settings.js';
import {requestCap,requestRate,accrueRequests,requestsReady,consumeRequests,requestHeat} from './deliveries.js';
import { BRANCH_THEMES, drawBranchMap } from './branch-maps.js';
import { createGlPost } from './gl-post.js';
import * as economy from './economy.js';
import * as strains from './strains.js';
import { abbr, SPECIALTIES, customerType, satisfyCustomer, tickBranches, bulkReward, dispatchBulk, recordGoal, goalStatus, claimGoal, STORE_PROJECTS, PROJECT_LEVELS, PROJECT_BONUSES, projectCost, projectBonus, buyProject, nextStoreRate, selectedStore, selectStore, migrateProgression, dailyStatus, claimDaily, saleMultiplier, claimCareer, CAREER, STORES, DAILY, storeCost, storeRate, branchRate, buyStore, eventStatus, joinEvent, recordEvent, claimEvent } from './progression.js';
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
  // A new shop starts as seven construction sites: the door and six stations are raised for free during the intro, then the sign flips.
  function fresh(){return{money:30,lifetime:0,orderCounters:1,lightMode:null,journey:migrateJourney(),autoDrone:migrateAutoDrone(),productMenu:migrateMenu(),sound:true,empire:migrateProgression(),idStaff:0,curingLevel:0,durationLevel:0,kioskSpeedLevel:0,onlineBonusLevel:0,comfortLevel:0,scannerLevel:0,webLevel:0,trafficLevel:0,pickupLevel:0,readyLevel:0,strains:[1,0,0,0],activeStrain:0,menuStrains:[0],lines:[0,0,0,0,0,0],doorBuilt:false,shopOpen:false,stock:[0,0,0,0,0],staff:[0,0,0,0,0,0],sold:0,kiosk:false,secondKiosk:false,thirdKiosk:false,lounge:0,loungeSessions:0,loungeEarned:0,queueLevel:0,storageLevel:0,onlineCompleted:0,onlineRequests:0,hints:{web:false,storage:false,queue:false},multiplier:1,globalLevel:0,contract:0,lastSeen:Date.now(),theme:'dispensary',gameSpeed:1,strainTrend:strains.migrateTrend(null,4),vipBuzz:0,seedBatchLevel:0,growBatchLevel:0,harvestBatchLevel:0,packSpeedLevel:0,serviceLevel:0,signLevel:0,loyaltyLevel:0,basketLevel:0,terpeneLevel:0,breedingLevel:0,displayLevel:0,trendLevel:0,fleetLevel:0,cargoLevel:0,repeatLevel:0}}
  function readSave(){
    for(var key of ['shift-save','shift-save-backup']){
      try{var raw=localStorage.getItem(key);if(!raw)continue;var value=JSON.parse(raw);if(value&&typeof value==='object'&&!Array.isArray(value))return value}catch(e){}
    }
    return {};
  }
  function finite(value,fallback,min,max){var n=Number(value);return Number.isFinite(n)?Math.max(min,Math.min(max,n)):fallback}
  function load(){try{var old=readSave(),next=Object.assign(fresh(),old);if(!Object.keys(old).length)return fresh();
    // Saves from before the construction intro have no `shopOpen`; they are open shops with every station standing.
    next.shopOpen=old.shopOpen!==false;next.doorBuilt=next.shopOpen||old.doorBuilt===true;
    ['trafficLevel','pickupLevel','readyLevel','curingLevel','durationLevel','kioskSpeedLevel','onlineBonusLevel','comfortLevel','scannerLevel','webLevel','seedBatchLevel','growBatchLevel','harvestBatchLevel','packSpeedLevel','serviceLevel','signLevel','loyaltyLevel','basketLevel','terpeneLevel','breedingLevel','displayLevel','trendLevel','fleetLevel','cargoLevel','repeatLevel'].forEach(function(key){next[key]=Math.floor(finite(old[key],0,0,key==='pickupLevel'?12:20))});
    next.idStaff=Math.floor(finite(old.idStaff,0,0,10000));
    next.strains=STRAINS.map(function(_,i){return Math.floor(finite(old.strains&&old.strains[i],i===0?1:0,i===0?1:0,10))});
    next.activeStrain=Math.floor(finite(old.activeStrain,0,0,STRAINS.length-1));if(!next.strains[next.activeStrain])next.activeStrain=0;
    next.menuStrains=STRAINS.map(function(_,i){return i}).filter(function(i){return next.strains[i]>0&&(!Array.isArray(old.menuStrains)||old.menuStrains.indexOf(i)>=0)});if(!next.menuStrains.length)next.menuStrains=[0];next.strainTrend=strains.migrateTrend(old.strainTrend,STRAINS.length);next.vipBuzz=finite(old.vipBuzz,0,0,strains.VIP_BUZZ_SECONDS);
    next.journey=migrateJourney(old.journey);next.orderCounters=migrateOrderCounters(old.orderCounters);
    next.money=finite(old.money,30,0,Number.MAX_SAFE_INTEGER);
    next.lifetime=finite(old.lifetime,0,0,Number.MAX_SAFE_INTEGER);
    next.sold=Math.floor(finite(old.sold,0,0,Number.MAX_SAFE_INTEGER));
    next.onlineCompleted=Math.floor(finite(old.onlineCompleted,0,0,Number.MAX_SAFE_INTEGER));next.onlineRequests=finite(old.onlineRequests,0,0,40);next.hints={web:!!(old.hints&&old.hints.web),storage:!!(old.hints&&old.hints.storage),queue:!!(old.hints&&old.hints.queue)};
    next.contract=Math.floor(finite(old.contract,0,0,21));next.productMenu=migrateMenu(old.productMenu);next.sound=old.sound!==false;next.lightMode=['day','night'].includes(old.lightMode)?old.lightMode:null;next.autoDrone=migrateAutoDrone(old.autoDrone);
    next.globalLevel=Math.floor(finite(old.globalLevel,0,0,500));
    next.multiplier=Math.pow(1.25,next.globalLevel);
    next.lastSeen=finite(old.lastSeen,Date.now(),0,Date.now());next.lines=LINES.map(function(_,i){return Math.floor(finite(old.lines&&old.lines[i],1,next.shopOpen?1:0,10000))});next.storageLevel=Math.min(20,Math.max(0,Math.floor(Number(old.storageLevel)||0)));next.stock=Array.from({length:5},function(_,i){return Math.floor(finite(old.stock&&old.stock[i],0,0,i===4?100+next.readyLevel*50:100+next.storageLevel*100))});next.staff=LINES.map(function(_,i){return Math.floor(finite(old.staff&&old.staff[i],0,0,10000))});next.kiosk=old.kiosk===true;next.lounge=migrateLounge(old.lounge);next.loungeSessions=Math.floor(finite(old.loungeSessions,0,0,1e9));next.loungeEarned=finite(old.loungeEarned,0,0,1e15);next.secondKiosk=next.kiosk&&old.secondKiosk===true;next.thirdKiosk=next.secondKiosk&&old.thirdKiosk===true;next.queueLevel=Math.min(7,Math.max(0,Math.floor(Number(old.queueLevel)||0)));next.theme='dispensary';next.gameSpeed=[0,1,2,4].indexOf(old.gameSpeed)>=0?old.gameSpeed:1;return next}catch(e){return fresh()}}
  var firstRun=false;try{firstRun=!localStorage.getItem('shift-save')}catch(e){}
  var securitySelected=false,loungeSelected=false;
  var state=load(),selected=0,toastTimer,dispatchSummary=null;
  state.productMenu.active=dominantFormat(state.productMenu,state.menuStrains.filter(function(i){return state.strains[i]>0}));
  state.empire=migrateProgression(state.empire);state.empire.activeStore=selectedStore(state.empire);state.empire.retailBoost=retailBoost();advanceJourney(state);
  function visualLight(){return state.lightMode?{night:state.lightMode==='night',darkness:state.lightMode==='night'?.34:0}:atmosphere(state.empire.network)}
  var lightToggle=document.createElement('button');lightToggle.id='lightToggle';lightToggle.type='button';lightToggle.onclick=function(){state.lightMode=visualLight().darkness>.15?'day':'night';save();renderUI()};document.querySelector('.speed-controls').appendChild(lightToggle);
  var speedButtons=Array.prototype.slice.call(document.querySelectorAll('[data-speed]'));
  function setGameSpeed(value){if([0,1,2,4].indexOf(value)<0)return;if(state.gameSpeed!==value)playSound('tap',state.sound);state.gameSpeed=value;renderUI();save();notify(value===0?'GAME PAUSED':'GAME SPEED · '+value+'×')}
  // The 1× button doubles as pause: pressed again at normal speed it stops the clock, and pressed while paused it resumes.
  var speedOne=speedButtons.filter(function(b){return b.getAttribute('data-speed')==='1'})[0],PLAY_GLYPH=speedOne.innerHTML,PAUSE_GLYPH='<svg viewBox="0 0 18 16" fill="currentColor" aria-hidden="true"><path d="M5 3.5h3v9H5zM10 3.5h3v9h-3z"></path></svg>';
  speedButtons.forEach(function(button){button.onclick=function(){var value=Number(button.getAttribute('data-speed'));setGameSpeed(value===1&&state.gameSpeed===1?0:value)}});
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
  // Demand ceiling counts whole baskets, so offline pay and reward scaling track real sales.
  function incomeRate(){return Math.min(production(),flowerValue()*basketSize()/arrivalInterval())+branchRate(state.empire)}
  function offlineReward(seconds){return state.gameSpeed===0?0:incomeRate()*Math.min(14400,Math.max(0,seconds))}
  // Daily, goal and event payouts grow with the shop so they are still worth a tap hours in.
  function rewardScale(){return economy.rewardScale(incomeRate())}
  function collectOffline(elapsed){
    var away=elapsed===undefined?Math.max(0,(Date.now()-state.lastSeen)/1000):elapsed;
    var seconds=Math.min(14400,away);if(state.gameSpeed!==0)accrueOnlineRequests(seconds);
    var rates=[Math.min(production(),flowerValue()*basketSize()/arrivalInterval())].concat(STORES.map(function(_,i){return storeRate(state.empire,i)}));
    var earnings=rates.map(function(rate){return state.gameSpeed===0?0:rate*seconds});
    var reward=earnings.reduce(function(a,b){return a+b},0);
    if(reward>=1)add(reward);
    // Short breaks get the toast only; the full report is for real absences.
    if(seconds>=900&&state.shopOpen)state.empire.returnReport={seconds:away,earnings:earnings,goals:[0,1,2].filter(function(i){var g=goalStatus(state.empire,i,rewardScale());return g.progress>=g.target}).length};
    save();return reward>=1?reward:0;
  }

  function menuStrains(){return state.menuStrains.filter(function(i){return state.strains[i]>0})}
  function menuChoice(sequence){var menu=menuStrains();return menu[sequence%menu.length]}
  // Regulars reach for the everyday strain; VIPs take the reserve when the menu offers one.
  // A VIP takes the reserve strain however it is sold; everyone else takes a menu strain in the format they came for
  // when there is one (see `wantedFormat`), and pays the format premium only when they got their way.
  function strainFor(c){if(c.kind==='vip'){var reserve=strains.reserveStrain(menuStrains(),state.strains);if(reserve!==null)return reserve}var preferred=economy.preferredStrain(c.kind,menuStrains(),state.strains);return strainForFormat(state.productMenu,menuStrains(),preferred===null?menuChoice(c.id):preferred,wantedFormat(state.productMenu,c.id),c.id)}
  function salePriceFor(c,strain){var f=formatOf(strain);if(c.kind==='vip')return flowerValue(strain);return Math.round(flowerValue(strain)/f.value*formatPremium(state.productMenu,strain,wantedFormat(state.productMenu,c.id)))}
  // Satisfaction tips: patience stretches with Queue comfort, and Lasting effects sweeten every happy sale.
  function customerSaleBonus(c){var bonus=satisfyCustomer(state.empire,-1,c.kind,c.strain===0?'everyday':'boutique',c.waitSeconds||0,1+state.comfortLevel*.15);if(bonus>1)bonus+=state.durationLevel*.03;
    // Strain identity: potency tips, the everyday and VIP perks, and Violet Haze's word of mouth on happy boutique sales.
    bonus*=strains.tipFactor(c.kind,strainPotency(c.strain||0));if(bonus>1)bonus*=1+state.loyaltyLevel*.03;
    if(c.strain===0)bonus*=strains.everydayBonus(state.strains);
    // VIPs: served their reserve they pay the Orchid premium, boost reputation and start a buzz; offered only everyday flower they snub the shop.
    if(c.kind==='vip'){if(c.strain>0){bonus*=strains.vipBonus(state.strains);state.empire.reputation=Math.min(1000,state.empire.reputation+strains.VIP_REPUTATION);state.vipBuzz=strains.VIP_BUZZ_SECONDS;burst({x:4,z:4.9,y:1.6},'#f0cf7f')}else{bonus=1;state.empire.reputation=Math.max(0,state.empire.reputation-strains.VIP_SNUB_REPUTATION)}}
    if(bonus>1&&c.strain>0)state.empire.reputation=Math.min(1000,state.empire.reputation+strains.reputationBonus(state.strains));
    return bonus*(c.eventGuest&&c.strain>0?1.25:1)}
  // Flower menu: one jar illustration per strain, a row of cards to pick from, and a hero for the chosen strain.
  var STRAIN_LOOKS=[
    {kind:'Everyday',buyers:'Regulars always order this one.',pistil:'#d9c46a',frost:false,shape:'round'},
    {kind:'Boutique',buyers:'VIPs order the most potent boutique strain on the menu.',pistil:'#e0803f',frost:false,shape:'cone'},
    {kind:'Boutique',buyers:'VIPs order the most potent boutique strain on the menu.',pistil:'#ead3f2',frost:true,shape:'fluffy'},
    {kind:'Boutique',buyers:'VIPs order the most potent boutique strain on the menu.',pistil:'#9fe0c9',frost:true,shape:'dense'}
  ];
  // A glass jar with the strain's bud inside. Calyx blobs stack in three tones of the strain colour; pistils and frost differ per strain.
  function strainArt(i,locked){
    var c=STRAINS[i].color,look=STRAIN_LOOKS[i],dark=shadeColor(c,.66),mid=shadeColor(c,.86),light=shadeColor(c,1.18),g='';
    var layouts={
      round:[[32,46,11,9,0],[24,40,9,8,-25],[40,40,9,8,25],[32,36,10,9,0],[26,31,8,7,-20],[38,31,8,7,20],[32,27,8,8,0]],
      cone:[[32,47,11,8,0],[25,42,8,8,-20],[39,42,8,8,20],[32,38,9,9,0],[27,32,7,8,-15],[37,32,7,8,15],[32,26,6,9,0],[32,20,4,6,0]],
      fluffy:[[30,46,12,9,0],[22,40,9,9,-30],[42,41,9,9,30],[32,37,11,10,0],[25,30,8,8,-20],[39,30,8,8,20],[32,25,9,8,0],[28,20,5,5,0],[37,21,5,5,0]],
      dense:[[32,47,12,8,0],[24,42,8,7,-20],[40,42,8,7,20],[32,39,10,8,0],[26,33,8,7,-15],[38,33,8,7,15],[32,28,9,8,0],[32,22,6,6,0]]
    }[look.shape];
    layouts.forEach(function(b,k){var tone=k%3===0?mid:k%3===1?dark:c;g+='<ellipse cx="'+b[0]+'" cy="'+b[1]+'" rx="'+b[2]+'" ry="'+b[3]+'" transform="rotate('+b[4]+' '+b[0]+' '+b[1]+')" fill="'+tone+'"/>'});
    // Highlights along the upper-left edge of the front calyxes.
    [[26,34],[36,29],[30,24],[34,42]].forEach(function(q){g+='<ellipse cx="'+q[0]+'" cy="'+q[1]+'" rx="3.2" ry="1.6" transform="rotate(-30 '+q[0]+' '+q[1]+')" fill="'+light+'" opacity=".8"/>'});
    [[22,38],[41,35],[29,44],[38,45],[33,31],[26,27]].forEach(function(q,k){g+='<path d="M'+q[0]+' '+q[1]+'c1.5-1.5 3-1.5 4.5 0" fill="none" stroke="'+look.pistil+'" stroke-width="1.4" stroke-linecap="round" opacity=".9"/>'});
    if(look.frost)[[24,36],[38,38],[30,30],[36,26],[27,42],[34,47],[40,31]].forEach(function(q){g+='<circle cx="'+q[0]+'" cy="'+q[1]+'" r="1.1" fill="#ffffff" opacity=".85"/>'});
    var leaf='<path d="M32 52c-6-2-12-8-14-16 8 1 12 7 14 16Zm0 0c6-2 12-8 14-16-8 1-12 7-14 16Z" fill="'+dark+'"/>';
    return '<svg class="strain-art'+(locked?' is-locked':'')+'" viewBox="0 0 64 80" aria-hidden="true">'+
      '<defs><linearGradient id="jar'+i+'" x1="0" x2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".22"/><stop offset=".35" stop-color="#ffffff" stop-opacity=".04"/><stop offset=".8" stop-color="#ffffff" stop-opacity=".02"/><stop offset="1" stop-color="#ffffff" stop-opacity=".18"/></linearGradient></defs>'+
      '<ellipse cx="32" cy="74" rx="20" ry="3.5" fill="#0b1a12" opacity=".35"/>'+
      '<rect x="12" y="14" width="40" height="58" rx="9" fill="#1c2b23"/>'+
      leaf+g+
      '<rect x="12" y="14" width="40" height="58" rx="9" fill="url(#jar'+i+')"/>'+
      '<rect x="12.6" y="14.6" width="38.8" height="56.8" rx="8.6" fill="none" stroke="#dfe9dc" stroke-opacity=".55" stroke-width="1.2"/>'+
      '<path d="M17 24v34" stroke="#ffffff" stroke-opacity=".45" stroke-width="2.2" stroke-linecap="round"/>'+
      '<rect x="14" y="60" width="36" height="7" rx="2" fill="'+c+'"/><rect x="14" y="60" width="36" height="7" rx="2" fill="#000" opacity=".12"/>'+
      '<rect x="9" y="8" width="46" height="10" rx="3.5" fill="#3b3a33"/><rect x="9" y="8" width="46" height="4" rx="2" fill="#5a584c"/>'+
      (locked?'<rect x="12" y="14" width="40" height="58" rx="9" fill="#101a15" opacity=".62"/><path d="M26 44v-6a6 6 0 0 1 12 0v6" fill="none" stroke="#dfe9dc" stroke-width="2.2"/><rect x="23" y="43" width="18" height="13" rx="2.5" fill="#dfe9dc"/>':'')+
    '</svg>';
  }
  // A thumbnail bud in the strain's colours for legend tiles.
  function strainBud(i){var c=STRAINS[i].color,d=shadeColor(c,.7),l=shadeColor(c,1.2),pk=(STRAIN_LOOKS[i]||{}).pistil||'#e8a25f';return '<svg viewBox="0 0 20 20" aria-hidden="true">'+
    '<path d="M10 17.5C6.4 16.2 4.8 13.4 5.7 10.4C8.7 11.9 10 14.1 10 17.5Z" fill="'+d+'"/>'+
    '<path d="M10 17.5C13.6 16.2 15.2 13.4 14.3 10.4C11.3 11.9 10 14.1 10 17.5Z" fill="'+c+'"/>'+
    '<path d="M9.6 13.8C6.8 12.6 5.8 10.2 6.8 7.6C9.1 9.1 9.9 11.1 9.6 13.8Z" fill="'+c+'"/>'+
    '<path d="M10.4 13.8C13.2 12.6 14.2 10.2 13.2 7.6C10.9 9.1 10.1 11.1 10.4 13.8Z" fill="'+c+'"/>'+
    '<path d="M10 12.4C8.3 10 8.4 7 10 4.6C11.6 7 11.7 10 10 12.4Z" fill="'+l+'"/>'+
    '<path d="M8 8.4c-1-.8-1.2-2-.6-3.1M12.1 8.9c1-.8 1.3-2 .7-3.1" fill="none" stroke="'+pk+'" stroke-width="1" stroke-linecap="round"/></svg>'}
  // Sun for sativa, moon for indica, a half disc for hybrid.
  function typeGlyph(type,large){var cls='type-glyph'+(large?' is-large':'');if(type===strains.SATIVA)return '<svg class="'+cls+'" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>';if(type===strains.INDICA)return '<svg class="'+cls+'" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 3a8.5 8.5 0 1 0 6.5 13.5A9 9 0 0 1 14.5 3Z"/></svg>';return '<svg class="'+cls+'" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 4a8 8 0 0 1 0 16Z"/></svg>'}
  var flowerFocus=0;
  function strainPotency(i){return strains.potency(i,state.strains[i])+state.terpeneLevel*.25}
  function trendBoost(i){return i===state.strainTrend.index?1.35+state.trendLevel*.02:1}
  function displayBoost(i){return i>0?1+state.displayLevel*.02:1}
  function thcLabel(i){var v=strainPotency(i);return (Math.round(v*10)/10).toFixed(v%1?1:0)+'%'}
  function buildStrainMenu(){
    $('strainNav').innerHTML=STRAINS.map(function(strain,i){return '<button type="button" role="tab" id="strainTab'+i+'" style="--strain:'+strain.color+'"><span class="strain-card-art"></span><b>'+typeGlyph(strains.STRAIN_TYPE[i])+strain.name.replace(' ','<br>')+'</b><small></small><em class="strain-pips" aria-hidden="true">'+Array.from({length:10},function(){return '<i></i>'}).join('')+'</em></button>'}).join('');
    STRAINS.forEach(function(_,i){$('strainTab'+i).onclick=function(){flowerFocus=i;renderFlowers();var hero=document.querySelector('.strain-hero');if(hero&&hero.scrollIntoView)hero.scrollIntoView({block:'nearest',behavior:motionPreference.matches?'auto':'smooth'})}});
    flowerFocus=menuStrains()[0]||0;
  }
  function renderStrainMenu(){
    if(!$('strainNav'))return;
    if(!$('strainNav').children.length)buildStrainMenu();
    var menu=menuStrains(),trend=state.strainTrend.index,trendLeft=Math.max(0,Math.ceil(state.strainTrend.remaining)),trendClock=Math.floor(trendLeft/60)+':'+('0'+trendLeft%60).slice(-2);
    var reserve=strains.reserveStrain(menu,state.strains),buzzLeft=Math.ceil(state.vipBuzz||0);
    $('flowerSummary').textContent=fmt(flowerValue());
    // Live modifiers as tiles: VIP buzz, the type peaking right now, and the trending strain.
    var FLAME='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c1 4 5 5.5 5 11a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.2 1.6 1 2.5 2 2.5 0-4 .5-6.5 1-9Z"/></svg>';
    var STAR='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.7 6 6.5.6-4.9 4.3 1.5 6.4L12 16.4l-5.8 3.4 1.5-6.4L2.8 9.1l6.5-.6Z"/></svg>';
    var night=atmosphere(state.empire.network).night,peak=strains.peakType(night);
    var legend=(buzzLeft>0?'<span class="buyer is-buzz" style="--strain:#f0cf7f" title="VIP buzz · +30% traffic">'+STAR+'<b>'+buzzLeft+'s</b><small>Buzz</small></span>':'')+
      '<span class="buyer is-time'+(night?' is-night':'')+'" title="'+(night?'Night: indicas sell +15%, sativas −9%':'Day: sativas sell +15%, indicas −9%')+'">'+typeGlyph(peak,true)+'<b>+15%</b><small>'+strains.TYPES[peak]+'</small></span>'+
      '<span class="buyer is-trend'+(menu.indexOf(trend)>=0?' is-live':'')+'" style="--strain:'+STRAINS[trend].color+'" title="Trending · '+STRAINS[trend].name+' · +35% price while on the menu'+(menu.indexOf(trend)>=0?'':state.strains[trend]?' · add it to the menu':' · unlock it')+'">'+FLAME+'<i class="bud">'+strainBud(trend)+(menu.indexOf(trend)>=0?'':'<em>'+(state.strains[trend]?'+':'🔒')+'</em>')+'</i><b class="trend-clock"></b><small>Trending</small></span>';
    if($('flowerBuyers').dataset.html!==legend){$('flowerBuyers').innerHTML=legend;$('flowerBuyers').dataset.html=legend}
    STRAINS.forEach(function(strain,i){
      var level=state.strains[i],active=state.menuStrains.indexOf(i)>=0,tab=$('strainTab'+i),art=tab.querySelector('.strain-card-art');
      var artKey=(level?'u':'l');if(art.dataset.key!==artKey){art.innerHTML=strainArt(i,!level);art.dataset.key=artKey}
      tab.classList.toggle('is-on-menu',active);tab.classList.toggle('is-locked',!level);tab.classList.toggle('is-trending',i===trend);tab.setAttribute('aria-selected',String(flowerFocus===i));tab.tabIndex=flowerFocus===i?0:-1;
      var tag=tab.querySelector('small');tag.textContent=!level?fmt(strain.unlock):active?'On menu':'Off menu';tag.classList.toggle('price-tag',!level);
      Array.prototype.forEach.call(tab.querySelectorAll('.strain-pips i'),function(pip,k){pip.classList.toggle('is-filled',k<level)});
    });
    var i=flowerFocus,strain=STRAINS[i],look=STRAIN_LOOKS[i],level=state.strains[i],active=state.menuStrains.indexOf(i)>=0,price=strainCost(i),maxed=level>=10,detail=$('strainDetail');
    var isNight=atmosphere(state.empire.network).night,type=strains.STRAIN_TYPE[i],timeNow=strains.timeFactor(type,isNight);
    var nextValue=Math.round(strain.price*(1+level*.1)*(1+state.curingLevel*.03)*saleMultiplier(state.empire)*formatOf(i).value*trendBoost(i)*displayBoost(i)*timeNow);
    var stats=level?
      '<span><b>'+fmt(flowerValue(i))+'</b><small>'+unitWord(1,strainFormat(state.productMenu,i))+'</small></span><span><b>'+thcLabel(i)+'</b><small>THC</small></span><span><b>'+(maxed?'Max':'+'+fmt(nextValue-flowerValue(i)))+'</b><small>'+(maxed?'level 10':'next lv')+'</small></span>':
      '<span><b>'+fmt(Math.round(strain.price*(1+state.curingLevel*.03)*saleMultiplier(state.empire)*formatOf(i).value*timeNow))+'</b><small>'+unitWord(1,strainFormat(state.productMenu,i))+'</small></span><span><b>'+thcLabel(i)+'</b><small>THC</small></span><span><b>'+fmt(strain.unlock)+'</b><small>unlock</small></span>';
    var growPct=Math.round((1-strains.strainGrowFactor(i,Math.max(1,level)))*100),tipVip=Math.round((strains.tipFactor('vip',strains.potency(i,level)+state.terpeneLevel*.25)-1)*100),tier=strains.perkTier(level),perk=strains.PERKS[i];
    var traits='<ul class="strain-traits">'+
      '<li'+(growPct?' class="is-cost"':'')+'>'+(growPct?'Grow room −'+growPct+'%'+(level<10?' · masters with levels':''):'Easy to grow')+'</li>'+
      '<li>VIP tips +'+tipVip+'%</li>'+
      (type===strains.HYBRID?'<li>'+typeGlyph(type)+'Hybrid · steady day and night</li>':'<li class="'+(timeNow>1?'is-live':'is-cost')+'">'+typeGlyph(type)+strains.TYPES[type]+' · '+(timeNow>1?'+15% right now':'−9% until '+(type===strains.SATIVA?'morning':'evening'))+'</li>')+
      (i===trend?'<li class="is-trend">Trending · +'+Math.round((trendBoost(i)-1)*100)+'% price · <span class="trend-clock"></span></li>':'')+
      (i===reserve?'<li class="is-vip">★ VIP reserve · double baskets</li>':'')+
    '</ul>';
    var perkLine='<p class="strain-perk'+(tier?' is-unlocked':'')+'"><b>'+(tier?'★ '+perk.name:'☆ '+perk.name)+'</b> · '+(tier?perk.effect[tier-1]+(tier<2?' · level 10 doubles it':''):perk.locked)+'</p>';
    var heroHtml='<div class="strain-hero'+(level?'':' is-locked')+(active?' is-on-menu':'')+(i===trend?' is-trending':'')+'" style="--strain:'+strain.color+'">'+
      '<div class="strain-hero-art">'+strainArt(i,!level)+'</div>'+
      '<div class="strain-hero-info"><small class="strain-kind"><span class="strain-kind-tier">'+look.kind+' · </span>'+strains.TYPES[type]+(level?' · <span class="strain-kind-long">Level </span><span class="strain-kind-short">Lv </span>'+level+' / 10':' · Locked')+'</small><h2>'+strain.name+'</h2><p>'+(level?look.buyers:'Unlock to put it on the menu. '+look.buyers)+'</p></div>'+
      '<div class="strain-stats">'+stats+'</div>'+
      '<div class="strain-hero-details">'+traits+perkLine+'</div>'+
      (level?'<div class="product-line strain-format"><h2>Sell as</h2><div class="format-options">'+FORMATS.map(function(f,k){var own=strainFormat(state.productMenu,i)===k,unlocked=state.productMenu.unlocked[k];return '<button type="button" class="strain-format-pill" data-format="'+k+'" aria-pressed="'+own+'"'+(!unlocked&&state.money<f.cost?' disabled':'')+' title="'+f.detail+'"><svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+productIcons[k]+'</svg><strong>'+f.name+'</strong><small>'+(own?'Selling':unlocked?'Switch':fmt(f.cost))+'</small></button>'}).join('')+'</div><p class="format-benefit">'+[['Standard value','Half the door wants it'],['+45% value for the 3 in 10 who want it','Faster pickup','Slower packing'],['+120% value for the 1 in 5 who want it','Lower demand','Slower packing']][strainFormat(state.productMenu,i)].join(' · ')+'</p></div>':'')+
      '<div class="strain-hero-actions">'+(level?'<button type="button" id="flowerSelect" aria-pressed="'+active+'">'+(active?'On menu ✓':'Add to menu')+'</button>':'')+'<button type="button" id="flowerBuy" class="is-primary">'+(maxed?'Fully upgraded':(level?'Upgrade':'Unlock')+' · '+fmt(price))+'</button></div>'+
    '</div>';
    var heroKey=heroHtml+'|'+(maxed||state.money<price)+'|'+(active&&menu.length===1)+'|'+state.productMenu.formats.join(',')+'|'+state.productMenu.unlocked.join(',');
    Array.prototype.forEach.call(document.querySelectorAll('.menu-board .trend-clock'),function(el){el.textContent=trendClock});
    if(detail.dataset.key===heroKey)return;
    detail.innerHTML=heroHtml;detail.dataset.key=heroKey;
    Array.prototype.forEach.call(detail.querySelectorAll('.trend-clock'),function(el){el.textContent=trendClock});
    if(level){var sel=$('flowerSelect');sel.disabled=active&&menu.length===1;sel.title=sel.disabled?'Keep at least one strain on the menu':active?'Remove from menu':'Add to menu';sel.onclick=function(){selectStrain(i)}}
    var buy=$('flowerBuy');buy.disabled=maxed||state.money<price;buy.onclick=function(){buyStrain(i)};
    Array.prototype.forEach.call(detail.querySelectorAll('.strain-format-pill'),function(pill){pill.onclick=function(){chooseStrainFormat(i,Number(pill.dataset.format))}});
  }
  // Every strain sells in its own format. `format()` is the one most of the menu uses (units and legacy readouts);
  // `formatOf(i)` is a strain's own; `formatFactor(p)` is the menu mix's mean for a property such as demand.
  function format(){return FORMATS[state.productMenu.active]}
  function formatOf(i){return FORMATS[strainFormat(state.productMenu,i)]}
  function formatFactor(property){return menuFormatFactor(state.productMenu,menuStrains(),property)}
  function syncDominantFormat(){state.productMenu.active=dominantFormat(state.productMenu,menuStrains())}
  // Sales units follow the format: flower is sold by weight (one packed unit is an eighth), pre-rolls by the joint, edibles by the piece.
  function unitWord(n,formatIndex){var f=formatIndex===undefined?state.productMenu.active:formatIndex;return f===1?(n===1?'joint':'joints'):f===2?(n===1?'edible':'edibles'):(n===1?'eighth':'eighths')}
  function unitShort(){var f=state.productMenu.active;return f===1?'joint':f===2?'edible':'⅛'}
  function weightLabel(n){var oz=Math.floor(n/8),rem=n%8,frac=['','⅛','¼','⅜','½','⅝','¾','⅞'][rem];return (oz?abbr(oz):'')+(oz>=1000?'':frac)+(oz||rem?' oz':'0 oz')}
  function qtyLabel(n){return state.productMenu.active===0?weightLabel(n):abbr(n)+' '+unitWord(n)}
  // One compact number style for every HUD counter: 24000 → 24k, 3000 → 3k, 1250 → 1.3k.
  function compactCount(n){return n>=100000?Math.round(n/1000)+'k':n>=1000?(Math.round(n/100)/10).toFixed(n%1000?1:0).replace(/\.0$/,'')+'k':Math.round(n*10)/10+''}
  function secondsLabel(t){return (t>=10?Math.round(t):t>=1?t.toFixed(1):t.toFixed(2))+'s'}
  function qtyShort(n){var f=state.productMenu.active;if(f===0){var oz=n/8;return (oz>=1000?(oz/1000).toFixed(oz>=10000?0:1)+'k':oz>=10?Math.round(oz):Math.round(oz*10)/10)+' oz'}return (n>=1000?(n/1000).toFixed(n>=10000?0:1)+'k':n)+(f===1?' jt':' ed')}
  var playSound=makeSound();
  var telemetry=createTelemetry();
  // Progression markers: the first time any station reaches these levels on this device.
  function trackStationLevel(i){var lv=state.lines[i];[10,25,50,100].forEach(function(m){if(lv>=m)telemetry.once('station_level_'+m,{station:LINES[i].name})})}
  // Browsers only start audio inside a gesture: the first tap or key press primes the context while sound is on.
  ['pointerdown','keydown'].forEach(function(type){window.addEventListener(type,function prime(){playSound.unlock(state.sound)},{passive:true})});
  function flowerValue(index){if(index===undefined){var menu=menuStrains();return menu.reduce(function(total,i){return total+flowerValue(i)},0)/menu.length}var i=index;return Math.round(STRAINS[i].price*(1+Math.max(0,state.strains[i]-1)*.1)*(1+state.curingLevel*.03)*saleMultiplier(state.empire)*formatOf(i).value*trendBoost(i)*displayBoost(i)*strains.timeFactor(strains.STRAIN_TYPE[i],atmosphere(state.empire.network).night))}
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
    syncDominantFormat();save();renderUI();notify(STRAINS[i].name.toUpperCase()+(index>=0?' · REMOVED FROM MENU':' · ADDED TO MENU'));
  }
  function renderFlowers(){
    if($('prestigeStart')){
      var offer=prestigeOffer(state),maxRank=offer.rank>=19,earned=Math.max(0,state.lifetime),current=(1+offer.rank*.2).toFixed(1);
      $('prestigeStatus').textContent='Rank '+offer.rank;
      $('prestigeCurrentRank').textContent='Rank '+offer.rank;$('prestigeCurrentRate').textContent=current+'×';
      $('prestigeNextRank').textContent='Rank '+(offer.rank+1);$('prestigeNextRate').textContent=offer.multiplier.toFixed(1)+'×';
      $('prestigeComparison').classList.toggle('is-max',maxRank);$('prestigeComparison').setAttribute('aria-label',maxRank?'Maximum rank '+offer.rank+', '+current+' times base sales':'Rank '+offer.rank+' to rank '+(offer.rank+1)+': '+current+' to '+offer.multiplier.toFixed(1)+' times base sales');
      $('prestigeNext').hidden=maxRank;$('prestigeArrow').toggleAttribute('hidden',maxRank);
      $('prestigeGain').textContent=maxRank?'Maximum permanent bonus':'+20% base sales · permanent';
      $('prestigeFunding').hidden=maxRank;$('prestigeRevenue').textContent=fmt(earned)+' / '+fmt(offer.target);
      $('prestigeProgress').value=Math.min(100,earned/offer.target*100);$('prestigeProgress').setAttribute('aria-valuetext',fmt(earned)+' of '+fmt(offer.target)+' lifetime revenue');
      $('prestigeFundingStatus').textContent=offer.eligible?'Ready to reopen':fmt(Math.max(0,offer.target-earned))+' to unlock';
      $('prestigeStart').disabled=!offer.eligible;$('prestigeStart').textContent=maxRank?'Maximum rank reached':'Reopen at rank '+(offer.rank+1);
      if(maxRank)$('prestigeStart').removeAttribute('aria-describedby');else $('prestigeStart').setAttribute('aria-describedby','prestigeFundingStatus prestigeCarryover');
      $('prestigeCarryover').hidden=maxRank;
      $('soundToggle').textContent=state.sound?'Sound on':'Sound off';$('soundToggle').setAttribute('aria-pressed',String(state.sound));
    }

    renderStrainMenu();
  }
  function fmt(n){if(n<1000)return '$'+Math.floor(n).toLocaleString();var units=[['T',1e12],['B',1e9],['M',1e6],['K',1e3]];for(var i=0;i<units.length;i++)if(n>=units[i][1])return '$'+(n/units[i][1]).toFixed(n/units[i][1]>=100?0:n/units[i][1]>=10?1:2)+units[i][0]}
  function capacity(i){return economy.capacity(state.lines[i],state.staff[i],state.multiplier)}
  var STATION_TIERS=economy.STATION_TIERS,TIER_COLORS=economy.TIER_COLORS,TIER_LEVELS=economy.TIER_LEVELS;
  function stationTier(i){return economy.stationTier(state.lines[i])}
  function retailBoost(){return economy.retailBoost(state.lines)}
  function nextCapacity(i){return economy.capacity(state.lines[i]+1,state.staff[i],state.multiplier)}
  function isOpen(i){return i===0||state.lines[i-1]>0}
  // Customers buy a basket of bags that grows with the order desk and doubles per retail tier, so the counters move items, not just people.
  function basketSize(){return Math.max(1,Math.round(economy.basketSize(state.lines)*(1+state.basketLevel*.04)))}
  function stationThroughput(i){
    if(!state.lines[i])return 0;
    if(i<4)return capacity(i)/[2,3,2,2][i]/(i===3?formatFactor('packing'):1);
    var service=(i===4?state.orderCounters:1)/economy.customerHandoff(i,state.lines[i],counterServiceDuration(i));
    return (i===4?Math.min(capacity(i)/2,service+kioskCount()/kioskServiceDuration()):service)*basketSize();
  }
  function production(){return Math.min.apply(null,LINES.map(function(_,i){return stationThroughput(i)}))*flowerValue()}
  function batchSize(i){return economy.batchSize(state.lines[i])*(i<3?1+state[['seedBatchLevel','growBatchLevel','harvestBatchLevel'][i]]*.06:1)}
  function cycleSpeed(i){return (1+state.staff[i]*.3)*state.multiplier/(i===3?formatFactor('packing'):1)*(i===1?growFactorNow():i===3?strains.packBonus(state.strains)*(1+state.packSpeedLevel*.06):1)}
  // Breeding bench claws back part of the boutique grow penalty on top of strain mastery.
  function growFactorNow(){var g=strains.growFactor(menuStrains(),state.strains);return 1-(1-g)*(1-state.breedingLevel*.03)}
  var batchRemainder=[0,0,0,0];
  var readyWork=0;
  var work=[0,0,0,0,0,0],customers=[],arrival=0,customerId=0,pickupQueueSequence=0;
  // The pickup line is first come, first served: a ticket is issued when a customer reaches the line's tail, not when
  // they order, so a counter customer already in line is not held at the tail for a kiosk customer still walking over.
  function pickupOrder(c){return c.pickupTicket||Infinity}
  var QUEUE_MAX=30;
  // Everyone still to order holds a place in the line — except guests who have gone through the curtain.
  function inOrderFlow(c){return !c.ordered&&c.phase!=='leaving'&&c.phase!=='toLounge'&&c.phase!=='lounge'}
  // The smoking lounge behind the back-wall shelving. Guests bound for it are let in at the curtain while a seat and a
  // spare packed jar are free (otherwise they wait on the rope), sit out a session unseen, then leave by the back door
  // on to the exit lane and out through the exit.
  // The curtain is past the mezzanine's left edge; the back door opens on to the exit lane between the cream column
  // and the merch cabinet, so leaving guests step straight on to the mat.
  // The right wall sits so that the merch cabinet standing against it is flush with the mezzanine's edge above (x 9).
  // The back door sits half behind the cream column from this camera, so a guest fades in out of sight behind it and
  // steps out from behind it.
  // Up to seven guests wait for a seat at the curtains: the first on the carpet, the rest in a line along the lounge's
  // front wall to the right of the door, clear of the carpet's stanchions.
  var LOUNGE_DOOR={x:-9.85,z:-.45},LOUNGE_EXIT={x:8.57,z:-3.3},LOUNGE_RIGHT=8.25,LOUNGE_ROPE=7;
  function loungeWaitSpot(place){return place<=0?LOUNGE_DOOR:{x:LOUNGE_DOOR.x+1.3+(place-1)*.65,z:LOUNGE_DOOR.z+.1}}
  function loungeSeated(){return customers.filter(function(c){return c.phase==='lounge'}).length}
  function loungeWaiting(){return customers.filter(function(c){return c.phase==='toLounge'&&!c.waypoints.length}).sort(function(a,b){return a.id-b.id})}
  function loungeSpareJars(){return state.stock[3]-reservedJars()}
  // A guest steps through the gap in the drapes and fades as they go (`loungeFade` 1 → 0 over the last half unit),
  // and fades back in at the back door on the way out.
  function enterLounge(c){
    var take=loungeTake(state.lounge,flowerValue(strainFor(c)));
    state.stock[3]-=1;add(take.total);state.loungeSessions++;state.loungeEarned+=take.total;c.loungeLeft=loungeSessionSeconds(state.lounge);c.phase='lounge';c.walking=false;c.loungeTake=take.total;
    c.loungeFade=1;c.fadeFromZ=c.z;c.facing=-.3;
    recordEvent(state.empire,'pickup',1);playSound('coin',state.sound);
    if(!motionPreference.matches)tickets.push({x:LOUNGE_DOOR.x,y:2.1,z:LOUNGE_DOOR.z,life:1,text:fmt(take.cover)});
  }
  function leaveLounge(c){
    c.phase='leaving';c.t=0;c.routeKind='exit';c.x=LOUNGE_EXIT.x;c.z=LOUNGE_EXIT.z;c.renderX=c.x;c.renderZ=c.z;c.facing=.6;c.loungeFadeIn=0;
    c.waypoints=[{x:9.7,z:-4.3},{x:11.15,z:-4.6},{x:10.25,z:-5.6},{x:10.25,z:-8.1},{x:7,z:-8.1},{x:-10.5,z:-8.1}];
  }
  function tickLounge(dt){
    var curtainTarget=loungeCurtainTarget();loungeCurtain+=(curtainTarget-loungeCurtain)*(1-Math.exp(-dt*(curtainTarget>loungeCurtain?10:8)));
    var exitTarget=loungeExitCurtainTarget();loungeExitCurtain+=(exitTarget-loungeExitCurtain)*(1-Math.exp(-dt*(exitTarget>loungeExitCurtain?10:8)));
    customers.forEach(function(c){
      if(c.phase==='lounge'){
        if(c.loungeFade>0){c.loungeFade=Math.max(0,c.loungeFade-dt/.8);c.z=c.fadeFromZ+(LOUNGE_FRONT-.2-c.fadeFromZ)*(1-c.loungeFade);c.x=LOUNGE_DOOR.x;c.walking=c.loungeFade>0}
        c.loungeLeft-=dt;if(c.loungeLeft<=0)leaveLounge(c);
      }else if(c.loungeFadeIn!==undefined&&c.loungeFadeIn<1)c.loungeFadeIn=Math.min(1,c.loungeFadeIn+dt/.3);
    });
    // The rope: the first guest waiting at the curtain goes in as soon as a seat and a jar are free.
    var waiting=loungeWaiting();
    if(waiting.length&&loungeAdmission(state.lounge,loungeSeated(),loungeSpareJars()).admit)enterLounge(waiting[0]);
  }
  // Occasional thought bubbles: three-beat emoji stories about why someone came in, what the wait feels like, or the plan once the bag is in hand.
  var THOUGHTS={
    waiting:['💼😩🛋️','🎮🌙🍕','👵🍪❓','🧘☁️😌','🌧️📺☕','🎂🎈🎉','💍❓😬','👶😱🌙','🧾💸😅','🌮🌮🌮','🐈📦🤔','🎸🔥🎤','📝💔🍦','🚲🌅😎','🏃💨🥵','🧦🧦❓','🦆🍞🌅','📚😵🧠','🍕🍕😴'],
    pickup:['⏳😐⏳','🕰️👀🛍️','🍔🍟⏳','🧮💰🤞','🎧🎶😌','📱🔋😬','🥪🚗🏠','☕☕☕','🐢🐢🐢','🤔🍫🍿','⏰💭🛋️'],
    leaving:['🛋️🍕📺','🌅🏖️😎','🎮🌙🍿','🛁🕯️🎶','🍳🥞😋','🐕🛋️💤','🎨🖌️🌈','🎸🔊🚗','🌌🔭🤯','🍪🥛🌙','📺🐧😂','🧺🧦🙃','🍦🍦😁','🎳🍟🌙']
  };
  function thoughtPool(c){return c.bag?THOUGHTS.leaving:c.ordered?THOUGHTS.pickup:THOUGHTS.waiting}
  var thoughtTimer=4;
  function tickThoughts(dt){
    var reduced=motionPreference.matches,active=0;
    customers.forEach(function(c){if(c.thought){c.thought.age+=dt;if(c.thought.age>=c.thought.duration)c.thought=null;else active++}c.thoughtCooldown=Math.max(0,(c.thoughtCooldown||0)-dt)});
    thoughtTimer-=dt;if(thoughtTimer>0||active>=3)return;
    // One bubble at a time on a loose cadence: pick someone on screen who is not mid-exit and has not just had a thought.
    var eligible=customers.filter(function(c){return !c.thought&&!c.thoughtCooldown&&c.phase!=='lounge'&&!customerBehindBuilding(c)&&(c.phase!=='leaving'||c.t<.5)});
    thoughtTimer=5+Math.random()*7;if(!eligible.length)return;
    var c=eligible[Math.floor(Math.random()*eligible.length)],pool=thoughtPool(c);
    c.thought={text:pool[Math.floor(Math.random()*pool.length)],age:0,duration:reduced?5:4.4};c.thoughtCooldown=20+Math.random()*15;
  }
  function queueLimit(){return Math.min(QUEUE_MAX,Math.min(12,6+Math.floor(Math.max(0,state.lines[4]-1)/2)+Math.floor(state.staff[4]/2))+state.queueLevel*2)}
  function counterServiceDuration(i,serviceCapacity){
    // Both equipment and training shorten the handoff, with gentler gains at high levels.
    return economy.counterServiceDuration(i,serviceCapacity===undefined?capacity(i):serviceCapacity,formatFactor('service'))/(1+state.serviceLevel*.04);
  }
  function advanceCounterService(c,i,dt){
    if(c.serviceStation!==i){c.serviceStation=i;c.serviceElapsed=0}
    c.serviceElapsed+=dt;
    work[i]=Math.min(1,c.serviceElapsed/economy.customerHandoff(i,state.lines[i],counterServiceDuration(i)));
    return work[i]>=1;
  }
  function simulate(dt){
    state.empire.retailBoost=retailBoost();accrueOnlineRequests(dt);
    add(branchRate(state.empire)*dt);tickBranches(state.empire,dt);var operationResult=tickOperations(state,dt);if(operationResult.revenue)add(operationResult.revenue);if(operationResult.deliveries){state.onlineCompleted+=operationResult.deliveries;recordEvent(state.empire,'online',operationResult.deliveries)}
    arrival+=dt;state.vipBuzz=Math.max(0,(state.vipBuzz||0)-dt);
    if(strains.tickTrend(state.strainTrend,dt,STRAINS.length,state.sold+customerId)){var trending=STRAINS[state.strainTrend.index];notify(trending.name.toUpperCase()+' IS TRENDING · +35% for 8 min'+(state.strains[state.strainTrend.index]?'':' · unlock it to cash in'),'upgrade');renderUI()}
    // Nobody walks in until the sign flips; stations that are already standing still stock the shelves.
    if(state.shopOpen&&arrival>=arrivalInterval()&&customers.filter(inOrderFlow).length<queueLimit()){
      var activeEvent=eventStatus(state.empire);var eventGuest=activeEvent.joined&&activeEvent.open&&!activeEvent.claimed&&customerId%4===3;
      var arrivingKind=eventGuest?'vip':customerType(state.empire.reputation,customerId),lounge=wantsLounge(state.lounge,customerId,arrivingKind);
      arrival=0;customers.push({eventGuest:eventGuest,kind:arrivingKind,id:customerId++,phase:'entering',idChecked:false,idCheckTime:0,lounge:lounge,kiosk:!lounge&&state.kiosk&&customerId%2===0&&customers.filter(function(c){return c.kiosk&&!c.ordered}).length<kioskCount()+4,kioskIndex:chooseKiosk(),t:0,bag:false,ordered:false,x:-12.4,z:-10});
    }
    tickLounge(dt);
    customers.forEach(function(c){moveQueuedCustomer(c,dt);if(!c.walking&&c.phase!=='leaving'&&c.phase!=='lounge')c.waitSeconds=(c.waitSeconds||0)+dt;if(c.bag)c.effectAge=(c.effectAge||0)+dt});
    tickThoughts(dt);
    customers=customers.filter(function(c){return c.phase!=='leaving'||c.t<1});
    if(state.lines[5]){
      var pickups=customers.filter(function(c){return c.ordered&&!c.bag}).sort(function(a,b){return pickupOrder(a)-pickupOrder(b)}).slice(0,1).filter(function(c){return c.phase==='pickup'&&!c.walking&&Math.hypot(c.x-4,c.z-4.9)<.01});
      if(pickups.length&&state.stock[4]>0){var served=advanceCounterService(pickups[0],5,dt)?1:0;if(served>0){work[5]=0;var bags=Math.max(1,Math.min(pickups[0].bags||1,state.stock[4]));pickups[0].bags=bags;state.stock[4]-=bags;state.sold+=bags;playSound('sale',state.sound);recordEvent(state.empire,'pickup',served);add(pickups.slice(0,served).reduce(function(total,c){return total+(c.salePrice||flowerValue())*(c.bags||1)*customerSaleBonus(c)},0));pickups.slice(0,served).forEach(function(c){c.phase='leaving';c.t=0;c.bag=true;c.effectAge=0;recentPickupRatings.push(customerRatings(c).highness);if(recentPickupRatings.length>20)recentPickupRatings.shift()});burst(machinePos[5],colors.acid)}}else work[5]=0;
    }
    // Prepare pickup bags independently of the number of customers collecting, but never from jars a waiting web order needs.
    var spareJars=state.stock[3]-reservedJars();
    if(state.lines[4]&&spareJars>0&&state.stock[4]<readyCapacity()){
      readyWork+=dt*capacity(4)/2;
      var bags=Math.min(Math.floor(readyWork),spareJars,readyCapacity()-state.stock[4]);
      if(bags>0){readyWork-=bags;state.stock[3]-=bags;state.stock[4]+=bags}
    }else readyWork=Math.min(readyWork,.9);
    assignOrderCounter(customers,state.orderCounters);
    work[4]=0;
    if(state.lines[4]){
      customers.filter(function(c){return atOrderCounter(c,state.orderCounters)}).forEach(function(c){
        var available=orderAvailability(customers,state.stock[4],pickupLimit());
        if(available.places<1||available.bags<1)return;
        if(advanceCounterService(c,4,dt)){
          c.bags=Math.min(basketSize()*(c.kind==='vip'?strains.VIP_BASKET:1),available.bags);
          c.strain=strainFor(c);c.salePrice=salePriceFor(c,c.strain);c.ordered=true;
          c.phase='toPickup';c.t=0;
        }
      });
    }
    if(state.kiosk)for(var kioskIndex=0;kioskIndex<kioskCount();kioskIndex++){
      var kioskX=-8.95,kioskZ=6.8-kioskIndex*1.8;
      var kioskCustomer=customers.find(function(c){return c.kiosk&&(c.kioskIndex||0)===kioskIndex&&!c.ordered&&c.phase==='kiosk'&&Math.hypot(c.x-kioskX,c.z-kioskZ)<.15});
      var kioskAvailable=orderAvailability(customers,state.stock[4],pickupLimit());
      if(kioskCustomer&&kioskAvailable.places>0&&kioskAvailable.bags>0){
        kioskCustomer.orderTime=(kioskCustomer.orderTime||0)+dt;
        if(kioskCustomer.orderTime>=kioskServiceDuration()){kioskCustomer.strain=strainFor(kioskCustomer);kioskCustomer.bags=Math.min(kioskCustomer.kind==='vip'?strains.VIP_BASKET:1,kioskAvailable.bags);kioskCustomer.salePrice=salePriceFor(kioskCustomer,kioskCustomer.strain);kioskCustomer.ordered=true;kioskCustomer.phase='toPickup'}
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
    if(autoDroneReady(state.autoDrone,dt,state.lines[4]>0&&state.stock[3]>=onlineSize()&&onlineRequestsReady()>0)){state.autoDrone.remaining*=1-state.fleetLevel*.03;sendOnlineOrders(autoDroneLimit(state.autoDrone)+(state.autoDrone.bulk&&state.autoDrone.mode==='bulk'?state.cargoLevel:0),true)}
  }
  function staffCost(i){return economy.staffCost(state.staff[i])}
  function idTrainingQuote(limit){
    var levels=0,total=0;
    // Training stops once a check is as quick as it gets.
    while(levels<limit&&state.idStaff+levels<10000&&rawSecurityDuration(state.idStaff+levels)>economy.ID_CHECK_FLOOR){
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
  function expandOrderCounters(){
    if(!buyOrderCounter(state))return;
    selectMachine(4);tierFlashes[4]=1;burst(machinePos[4],'#e6d3a0');
    renderUI();save();notify(state.orderCounters+' ORDER COUNTERS OPEN · employee included','upgrade');
  }
  function renderOrderCounters(){
    var count=state.orderCounters,price=orderCounterCost(count),complete=price===null;
    $('orderCounterExpansion').hidden=securitySelected||loungeSelected||selected!==4;
    $('orderCounterStatus').textContent=count+' / 3';
    $('orderCounterDetail').textContent=complete?'All staffed':'Staff included';
    var slots=$('orderCounterSlots');
    if(slots.dataset.count!==String(count)){
      slots.dataset.count=String(count);slots.setAttribute('aria-label',count+' of 3 staffed counters open. Orders training improves the whole team.');
      slots.innerHTML=[0,1,2].map(function(i){return '<span class="order-counter-slot'+(i<count?' is-open':i===count?' is-next':'')+'" aria-hidden="true"><svg viewBox="0 0 40 36" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><g class="counter-worker"><circle cx="20" cy="8" r="4"/><path d="M12 21v-3a8 8 0 0 1 16 0v3"/></g><path class="counter-top" d="M5 21h30v4H5z"/><path class="counter-front" d="M8 25h24v9H8z"/><path d="M13 28v3m7-3v3m7-3v3"/></svg><em>'+(i+1)+'</em></span>'}).join('');
    }
    ['expandOrderCounter','buyOrderCounter'].forEach(function(id){var button=$(id);button.disabled=complete||state.money<price;button.querySelector('span').textContent=complete?'Fully expanded':'Open counter '+(count+1);button.querySelector('b').textContent=complete?'3 / 3':fmt(price);button.setAttribute('aria-label',complete?'All three order counters open':'Open order counter '+(count+1)+' with employee for '+fmt(price));});
    $('expandOrderCounter').hidden=complete;
    $('orderCounterShopCount').textContent=count+' → '+Math.min(3,count+1)+' staffed counters';
    $('orderCounterShopInfo').textContent=complete?'Three counters open. Train Orders to speed up the team.':'Employee included. Take more orders at the same time.';
  }
  function buyKiosk(){if(state.kiosk||state.money<25000)return;state.money-=25000;state.kiosk=true;save();renderUI();notify('SELF-ORDER KIOSK OPEN · customers can use kiosk or counter','upgrade')}
  function kioskCount(){return state.kiosk?(state.thirdKiosk?3:state.secondKiosk?2:1):0}
  function chooseKiosk(){
    var counts=Array(kioskCount()||1).fill(0);
    customers.forEach(function(c){if(c.kiosk&&!c.ordered&&c.phase!=='leaving')counts[c.kioskIndex||0]++});
    return counts.indexOf(Math.min.apply(null,counts));
  }
  function buyThirdKiosk(){if(!state.secondKiosk||state.thirdKiosk||state.money<100000)return;state.money-=100000;state.thirdKiosk=true;save();renderUI();notify('THIRD KIOSK OPEN','upgrade')}
  function buySecondKiosk(){if(!state.kiosk||state.secondKiosk||state.money<50000)return;state.money-=50000;state.secondKiosk=true;save();renderUI();notify('SECOND KIOSK OPEN','upgrade')}
  // Every line's tail leaves the shop the same way: past the doorman, across the threshold and out along the storefront.
  // A customer cleared at the ID desk joins their lane at the first of these points.
  var ENTRY_TAIL=[{x:-9.7,z:8.15},{x:-10.3,z:8.75},{x:-10.9,z:9.3},{x:-11.7,z:9.3},{x:-12.4,z:7.8}];
  function laneJoinIndex(route){return route.length-ENTRY_TAIL.length}
  function kioskRoute(index){var z=6.8-(index||0)*1.8;return [{x:-8.95,z:z},{x:-8.45,z:z},{x:-8.45,z:7.7}].concat(ENTRY_TAIL)}
  // Twenty levels per line (twelve for the waiting area). The first eight climb gently; past that each level costs 2.15× the last, so the back half of every line is a late-game project rather than an afternoon.
  var COMPONENTS=[{key:'trafficLevel',name:'Floor flow',base:750,max:20},{key:'pickupLevel',name:'Pickup waiting area',base:1200,max:12},{key:'readyLevel',name:'Ready-bag storage',base:600,max:20},{key:'curingLevel',name:'Curing equipment',base:1800,max:20},{key:'durationLevel',name:'Lasting effects',base:2400,max:20},{key:'kioskSpeedLevel',name:'Kiosk software',base:3000,max:20},{key:'onlineBonusLevel',name:'Premium packaging',base:2200,max:20},{key:'comfortLevel',name:'Queue comfort',base:1400,max:20},{key:'scannerLevel',name:'ID scanner',base:1600,max:20},{key:'webLevel',name:'Web marketing',base:2500,max:20},
    {key:'seedBatchLevel',name:'Seed trays',base:900,max:20},{key:'growBatchLevel',name:'Grow lights',base:1500,max:20},{key:'harvestBatchLevel',name:'Trim robots',base:2000,max:20},{key:'packSpeedLevel',name:'Auto-baggers',base:2600,max:20},
    {key:'serviceLevel',name:'Express lanes',base:1800,max:20},{key:'signLevel',name:'Street signage',base:1000,max:20},{key:'loyaltyLevel',name:'Loyalty cards',base:2100,max:20},{key:'basketLevel',name:'Bigger baskets',base:2400,max:20},
    {key:'terpeneLevel',name:'Terpene lab',base:2800,max:20},{key:'breedingLevel',name:'Breeding bench',base:3200,max:20},{key:'displayLevel',name:'Display cases',base:2600,max:20},{key:'trendLevel',name:'Trend scout',base:3000,max:20},
    {key:'fleetLevel',name:'Drone fleet',base:4000,max:20},{key:'cargoLevel',name:'Cargo bays',base:3500,max:20},{key:'repeatLevel',name:'Repeat buyers',base:2200,max:20}];
  function kioskServiceDuration(){return .8+1.2/(1+state.kioskSpeedLevel*.15)}
  function rawSecurityDuration(level){return .9/((1+level*.3)*(1+state.scannerLevel*.12))}
  function securityDuration(){return Math.max(economy.ID_CHECK_FLOOR,rawSecurityDuration(state.idStaff))}
  function arrivalInterval(){return (atmosphere(state.empire.network).night?1.2:.9)/(1+state.trafficLevel*.15)/formatFactor('demand')/strains.trafficFactor(menuStrains(),state.strainTrend.index)/strains.buzzFactor(state.vipBuzz)/(1+state.signLevel*.04)}
  function pickupLimit(){return 4+state.pickupLevel*2}
  function readyCapacity(){return economy.readyCapacity(state.readyLevel,state.lines)}
  function componentCost(i){var L=state[COMPONENTS[i].key];return Math.round(COMPONENTS[i].base*Math.pow(1.8,Math.min(L,8))*Math.pow(2.15,Math.max(0,L-8)))}
  function componentUnlocked(i){return COMPONENTS[i].key!=='kioskSpeedLevel'||state.kiosk}
  function upgradeComponent(i){var c=COMPONENTS[i],price=componentCost(i);if(!componentUnlocked(i)||state[c.key]>=c.max||state.money<price)return;state.money-=price;state[c.key]++;save();renderUI();notify(c.name.toUpperCase()+' · LEVEL '+state[c.key],'upgrade')}
  function renderComponents(){
    var describe=[function(l){return '+'+Math.round((economy.walkSpeed(l)/2.8-1)*100)+'% walking speed'},function(l){return (4+l*2)+' picking up'},function(l){return economy.readyCapacity(l,state.lines)+' ready bags'},function(l){return '+'+(l*3)+'% sale value'},function(l){return '+'+(l*3)+'% happy tips'},function(l){return '+'+(l*15)+'% kiosk speed'},function(l){return '+'+(l*5)+'% online value'},function(l){return Math.round(economy.patience('hurried',l))+'s patience'},function(l){return '+'+(l*12)+'% check speed'},function(l){return (requestRate(state.onlineCompleted,1,l)*60).toFixed(1)+' requests / min · '+requestCap(state.onlineCompleted,l)+' waiting'},
      function(l){return '+'+(l*6)+'% seed batch'},function(l){return '+'+(l*6)+'% grow batch'},function(l){return '+'+(l*6)+'% harvest batch'},function(l){return '+'+(l*6)+'% pack speed'},
      function(l){return '+'+(l*4)+'% counter speed'},function(l){return '+'+(l*4)+'% foot traffic'},function(l){return '+'+(l*3)+'% happy tips'},function(l){return '+'+(l*4)+'% basket size'},
      function(l){return '+'+(l*.25).toFixed(2).replace(/\.?0+$/,'')+'% THC'},function(l){return '-'+(l*3)+'% grow penalty'},function(l){return '+'+(l*2)+'% boutique value'},function(l){return '+'+(35+l*2)+'% trend bonus'},
      function(l){return (10*(1-l*.03)).toFixed(1)+'s drone interval'},function(l){return (10+l)+' orders per bulk run'},function(l){return (l*4)+'% repeat buyers'}];
    COMPONENTS.forEach(function(c,i){var level=state[c.key],max=level>=c.max,locked=!componentUnlocked(i),button=$('componentBuy'+i);
      $('componentBenefit'+i).textContent=locked?'Install a kiosk first':max?describe[i](level):describe[i](level).replace(/ (walking speed|picking up|ready bags|sale value|happy tips|kiosk speed|online value|patience|check speed|waiting|seed batch|grow batch|harvest batch|pack speed|counter speed|foot traffic|basket size|THC|grow penalty|boutique value|trend bonus|drone interval|orders per bulk run|repeat buyers)$/,'')+' → '+describe[i](level+1);
      $('componentLevel'+i).textContent='Level '+level+' / '+c.max+(max?' · Maximum':state.money<componentCost(i)?' · '+fmt(componentCost(i)-state.money)+' to go':'');$('componentPrice'+i).textContent=max?'MAX':fmt(componentCost(i));button.disabled=locked||max||state.money<componentCost(i);button.querySelector('span').textContent=locked?'Locked':'Upgrade';button.setAttribute('aria-describedby','componentBenefit'+i)});
    if(shopBrowser)shopBrowser.render()}
  function queueCost(){return Math.round(150*Math.pow(1.8,state.queueLevel))}
  function upgradeQueue(){if(queueLimit()>=QUEUE_MAX||state.money<queueCost())return;state.money-=queueCost();state.queueLevel++;save();renderUI();notify('LINE EXPANDED · '+queueLimit()+' customers','upgrade')}
  function storageCapacity(){return economy.storageCapacity(state.storageLevel,state.lines)}
  function storageCost(){return Math.round(250*Math.pow(1.7,state.storageLevel))}
  function upgradeStorage(){if(state.storageLevel>=20||state.money<storageCost())return;state.money-=storageCost();state.storageLevel++;save();renderUI();notify('STORAGE EXPANDED · '+storageCapacity()+' per stage','upgrade')}
  function onlineSize(){return economy.onlineSize(state.onlineCompleted,state.lines)}
  // Jars held back from bag prep so the next web order can leave as soon as it is requested.
  function reservedJars(){return state.lines[4]&&onlineRequestsReady()>0?onlineSize():0}
  // Web requests arrive slowly at first and speed up with completed orders; the maths lives in deliveries.js.
  function onlineRequestCap(){return requestCap(state.onlineCompleted,state.webLevel)}
  function deliveryBuilt(){return state.autoDrone.owned}
  function accrueOnlineRequests(seconds){if(deliveryBuilt())accrueRequests(state,seconds)}
  function onlineRequestsReady(){return requestsReady(state)}
  function onlineBatch(limit,jarBudget){
    var jars=jarBudget===undefined?state.stock[3]:jarBudget,count=0,used=0,reward=0;limit=Math.min(limit,onlineRequestsReady());
    if(state.lines[4])while(count<limit){var need=economy.onlineSize(state.onlineCompleted+count,state.lines);if(jars<need)break;jars-=need;used+=need;reward+=need*onlineValue(state.onlineCompleted+count);count++}
    return {count:count,jars:used,reward:reward};
  }
  function sendOnlineOrders(limit,automatic){
    var batch=onlineBatch(limit);if(!batch.count)return;
    state.stock[3]-=batch.jars;state.onlineCompleted+=batch.count;consumeRequests(state,batch.count);
    // Repeat buyers: a share of fulfilled orders come straight back as new requests.
    if(state.repeatLevel)state.onlineRequests=Math.min(onlineRequestCap(),state.onlineRequests+batch.count*state.repeatLevel*.04);
    queueDeliveryWave(batch.count);
    recordEvent(state.empire,'online',batch.count);add(batch.reward);if(!automatic)notifyDispatch(batch);burst({x:-10.7,z:1.5,y:7.05},'#dbc38b');slideReceipts(batch.count);renderUI();save();
  }
  // Rapid dispatches share a short loading window, never a growing launch queue.
  function queueDeliveryWave(count){
    var wave=deliveryDrones.filter(function(drone){return drone.age<.45});
    var age=wave.length?wave[0].age:0;
    for(var n=0;n<count;n++){
      if(wave.length<5){
        // Couriers in a wave lift off one after another, not as a block.
        var drone={age:age,delay:wave.length*.42,slot:wave.length,orders:1};
        wave.push(drone);deliveryDrones.push(drone);playSound('whoosh',state.sound);
      }else{
        var carrier=wave.reduce(function(a,b){return a.orders<=b.orders?a:b});carrier.orders++;
      }
    }
  }
  // Dispatch desk: the three numbers that matter, and the backlog as a row of parcels (lit ones can ship now).
  var dispatchKey='';
  function renderDispatchDesk(shippable){
    var waiting=onlineRequestsReady(),jars=state.stock[3],key=waiting+'|'+jars+'|'+shippable+'|'+state.productMenu.active;
    if(key===dispatchKey)return;dispatchKey=key;
    $('deliveryWaiting').textContent=waiting;$('deliveryJars').textContent=state.productMenu.active===0?abbr(Math.floor(jars/8))+' oz':abbr(jars);$('deliveryJarsLabel').textContent=(state.productMenu.active===0?'flower':unitWord(2))+' packed';$('deliveryShippable').textContent=shippable;
    $('deliveryShippable').parentElement.classList.toggle('is-live',shippable>0);
    // The stack shows up to two more receipts peeking out behind the one on top.
    $('receiptStack').dataset.depth=String(Math.max(0,Math.min(2,waiting-1)));$('receiptStack').classList.toggle('is-idle',!waiting);
  }
  // Sent orders fly off the stack; the next receipt settles into place underneath.
  function slideReceipts(count){
    if(motionPreference.matches)return;
    var stack=$('receiptStack'),front=stack.querySelector('.receipt:not(.is-leaving)');if(!front||!stack.offsetParent)return;
    for(var k=0;k<Math.min(3,count);k++){(function(k){var ghost=front.cloneNode(true);ghost.classList.remove('is-arriving');ghost.classList.add('is-leaving');ghost.style.animationDelay=(k*110)+'ms';Array.prototype.forEach.call(ghost.querySelectorAll('[id]'),function(el){el.removeAttribute('id')});stack.appendChild(ghost);var done=function(){ghost.remove()};ghost.addEventListener('animationend',done);setTimeout(done,900+k*110)})(k)}
    front.classList.remove('is-arriving');void front.offsetWidth;front.classList.add('is-arriving');
  }

  function cost(i){return economy.stationCost(LINES[i].base,state.lines[i])}
  function maxStationUpgrade(i){
    var levels=0,total=0,level=state.lines[i];
    if(!isOpen(i))return {levels:0,cost:0};
    while(level+levels<10000){
      var price=economy.stationCost(LINES[i].base,level+levels);
      if(!Number.isFinite(price)||total+price>state.money)break;
      total+=price;levels++;
    }
    return {levels:levels,cost:total};
  }
  function buySelectedMax(){if(loungeSelected)return upgradeLounge();if(securitySelected&&!state.doorBuilt)return buildStation('door');if(!securitySelected&&!state.lines[selected])return buildStation(selected);
    if(securitySelected)return trainIdChecker(10000);
    var batch=maxStationUpgrade(selected);if(!batch.levels)return;
    var oldTier=stationTier(selected);state.money-=batch.cost;state.lines[selected]+=batch.levels;telemetry.once('first_upgrade',{station:LINES[selected].name});trackStationLevel(selected);if(stationTier(selected)>oldTier)tierFlashes[selected]=1;
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
  function notify(message,kind){var cue=kind==='upgrade'?(/BUILT|OPEN|EXPANDED/.test(message)?'build':'upgrade'):/REWARD|MILESTONE|GOAL COMPLETE|EVENT COMPLETE|CHAPTER COMPLETE|WHILE AWAY|Prestige/.test(message)?'sparkle':/^Need |previous stage first/.test(message)?'denied':null;if(cue)playSound(cue,state.sound);if(kind!=='dispatch')dispatchSummary=null;$('toast').classList.toggle('is-upgrade',kind==='upgrade');$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(function(){$('toast').classList.remove('show')},1600)}

  var world=$('world'),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d',{alpha:false});
  if(!ctx){$('loadStatus').textContent='CANVAS COULD NOT START';$('loadRetry').hidden=false;return}
  world.insertBefore(canvas,world.firstChild);canvas.setAttribute('aria-hidden','true');
  var screenCtx=ctx;
  // GPU compositor pilot (Desert Oasis only for now): the 2D frame is re-composited through WebGL2 with bloom,
  // grade, vignette and grain on an overlay canvas. Any failure leaves the plain canvas visible underneath.
  var glPost=null,glCanvas=null;
  try{
    glCanvas=document.createElement('canvas');glPost=createGlPost(glCanvas);
    if(glPost){glCanvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;display:none';glCanvas.setAttribute('aria-hidden','true');canvas.after(glCanvas)}
    else glCanvas=null;
  }catch(e){glPost=null;glCanvas=null}
  function glCompose(now){
    var wanted=!!glPost;
    if(wanted){try{wanted=glPost.apply(canvas,now,nightAmount(),!motionPreference.matches)}catch(e){wanted=false;glPost=null}}
    if(glCanvas&&glCanvas.style.display!==(wanted?'block':'none'))glCanvas.style.display=wanted?'block':'none';
  }
  var dpr=1,width=1,height=1,angle=.57,zoom=1,panX=0,panY=0,centerX=0,centerY=0,unit=32;
  var colors={bg:'#202226',floorTop:'#303238',floorLeft:'#1c1f23',floorRight:'#272a30',grid:'#41444a',beltEdge:'#111419',belt:'#313943',slat:'#5b6470',oliveTop:'#f4f5ec',oliveLeft:'#a9b6be',oliveRight:'#d5dce0',darkTop:'#56616a',darkLeft:'#252e36',darkRight:'#3b4650',metalTop:'#eef2f3',metalLeft:'#8b9ba8',metalRight:'#becbd4',acid:'#f5c344',orange:'#ff7628',boxTop:'#d3a36c',boxLeft:'#8e6741',boxRight:'#b17f50'};
  var machinePos=[{x:-3,z:-3,y:9.4},{x:3,z:-3,y:9.4},{x:3,z:-.3,y:4.7},{x:-3,z:-.3,y:4.7},{x:-4,z:2.5,y:0},{x:4,z:2.5,y:0}];
  // The front-of-house display case along the front-right of the shop floor, planters built into both ends.
  var DISPLAY_CASE={x:8,z:8.9,width:5.2};
  // The back-wall shelving stands just behind the counters; the smoking lounge is the room behind it (z −7 → −1.76).
  var DISPLAY_Z=-1.6,LOUNGE_FRONT=DISPLAY_Z+.65;
  var sceneElevation=0;
  var beltNodes=[[-5,-3.2],[0,-3.2],[5,-3.2],[5.4,0],[5,3.2],[0,3.2],[-5,3.2],[-5.4,0]];
  var tierFlashes=[0,0,0,0,0,0],crateTime=0,particles=[],deliveryDrones=[],sceneTime=0,animationTime=0;
  // Rise-in progress (1 → 0) for a freshly built station; index 6 is the security door.
  var buildRise=[0,0,0,0,0,0,0,0];
  // Grand-opening confetti: paper pieces in the shop's own palette, drifting down over the whole building in world space.
  var confetti=[],CONFETTI_COLORS=['#f0d89a','#f6efdd','#b6e58c','#9dc47a','#e6c95a','#e8823a','#d3e0cb'];
  function celebrateOpening(){
    if(motionPreference.matches)return;
    tierFlashes.fill(1);burst({x:-10.65,z:10},'#f0d89a');burst({x:4,z:4.9},'#b6e58c');
    for(var i=0;i<170;i++)confetti.push({x:-12+Math.random()*20,z:-10+Math.random()*21,y:13+Math.random()*7,vy:-(2.6+Math.random()*2.2),vx:(Math.random()-.5)*.5,vz:(Math.random()-.5)*.5,phase:Math.random()*Math.PI*2,sway:.5+Math.random()*.8,rot:Math.random()*Math.PI,rotV:(Math.random()-.5)*9,color:CONFETTI_COLORS[i%CONFETTI_COLORS.length],life:3.4+Math.random()*1.6,w:.14+Math.random()*.1,h:.08+Math.random()*.04});
    render.invalidated=true;
  }
  function drawConfetti(dt){
    if(!confetti.length)return;
    var savedElevation=sceneElevation;sceneElevation=0;ctx.save();
    for(var i=confetti.length-1;i>=0;i--){var c=confetti[i];c.life-=dt;if(c.life<=0){confetti.splice(i,1);continue}
      c.y+=c.vy*dt;c.x+=(c.vx+Math.sin(c.phase+c.y*1.7)*c.sway)*dt;c.z+=c.vz*dt;c.rot+=c.rotV*dt;
      var p=project(c.x,c.y,c.z);ctx.globalAlpha=Math.min(1,c.life*1.4);ctx.fillStyle=c.color;
      ctx.setTransform(dpr,0,0,dpr,0,0);ctx.translate(p.x,p.y);ctx.rotate(c.rot);ctx.scale(1,.3+.7*Math.abs(Math.cos(c.rot*1.4+c.phase)));
      ctx.fillRect(-c.w*unit/2,-c.h*unit/2,c.w*unit,c.h*unit)}
    ctx.restore();sceneElevation=savedElevation;render.invalidated=true;
  }
  var motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
  var dprCap=3;

  function resize(){var rect=world.getBoundingClientRect(),oldWidth=width,oldHeight=height,oldDpr=dpr;dpr=Math.min(window.devicePixelRatio||1,dprCap);width=Math.max(1,Math.round(rect.width));height=Math.max(1,Math.round(rect.height));if(oldWidth!==width||oldHeight!==height||oldDpr!==dpr){canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);}canvas.style.width=width+'px';canvas.style.height=height+'px';ctx.setTransform(dpr,0,0,dpr,0,0);applyCamera()}
  function cameraFrame(){
    if(state.empire.activeStore){
      // A branch plot fills the viewport: its measured projected extents (see BRANCH_THEMES[].frame) fit the width or the
      // height under the HUD, whichever binds. On desktop the tray floats over the bottom-right, where the plot's near
      // corner lands, so a little more room is kept under the plot there.
      var fit=BRANCH_THEMES[state.empire.activeStore-1].frame,wide=width>=780,top=document.querySelector('.hud').getBoundingClientRect().bottom+16,low=wide?64:16,space=Math.max(130,visibleHeight()-top-low),area=Math.max(260,width-(wide?56:24)),u=Math.max(1,Math.min(area/fit.w,space/fit.h));
      return{x:width*.5-fit.cx*u,y:top+space*.5-fit.cy*u,unit:u}}
    var visible=visibleHeight(),bottom=0,top=Math.min(160,visible*.26),space=Math.max(120,visible-top-bottom);return{x:width*.5,y:top+space*.66,unit:Math.max(1,Math.min((width-40)/33,space/28))*1.18}}
  function applyCamera(){render.invalidated=true;var frame=cameraFrame();panX=Math.max(-width*1.6,Math.min(width*1.6,panX));panY=Math.max(-height*1.6,Math.min(height*1.6,panY));centerX=frame.x+panX;centerY=frame.y+panY;unit=frame.unit*zoom;if(state.empire.activeStore)updateBranchMarker()}
  function zoomAt(next,x,y){next=Math.max(.65,Math.min(4,next));var ratio=next/zoom,frame=cameraFrame();panX=x-(x-centerX)*ratio-frame.x;panY=y-(y-centerY)*ratio-frame.y;zoom=next;applyCamera()}
  // Desktop keyboard panning: arrows or WASD glide the camera while held. Direction is the way the view moves, so the
  // content slides the other way. Velocity eases toward the held direction, so a tap nudges and a hold coasts to speed,
  // and the render loop steps it on wall time so panning runs at any game speed, including paused.
  var PAN_KEYS={ArrowUp:[0,1],KeyW:[0,1],ArrowDown:[0,-1],KeyS:[0,-1],ArrowLeft:[1,0],KeyA:[1,0],ArrowRight:[-1,0],KeyD:[-1,0]},KEY_PAN_SPEED=640,heldPanKeys={},keyPan={vx:0,vy:0,at:undefined};
  function keyboardPan(wallNow){
    var tx=0,ty=0;for(var code in heldPanKeys){tx+=PAN_KEYS[code][0];ty+=PAN_KEYS[code][1]}
    var len=Math.hypot(tx,ty);if(!len&&!keyPan.vx&&!keyPan.vy){keyPan.at=undefined;return}
    if(len){tx=tx/len*KEY_PAN_SPEED;ty=ty/len*KEY_PAN_SPEED}
    var dt=keyPan.at===undefined?0:Math.min(.1,Math.max(0,(wallNow-keyPan.at)/1000)),ease=1-Math.exp(-dt*14);keyPan.at=wallNow;
    keyPan.vx+=(tx-keyPan.vx)*ease;keyPan.vy+=(ty-keyPan.vy)*ease;
    if(!len&&Math.hypot(keyPan.vx,keyPan.vy)<3){keyPan.vx=0;keyPan.vy=0}
    panX+=keyPan.vx*dt;panY+=keyPan.vy*dt;applyCamera();
  }
  function releasePanKeys(){for(var code in heldPanKeys)delete heldPanKeys[code]}
  function rotate(x,z){var c=Math.cos(angle),s=Math.sin(angle);return{x:x*c-z*s,z:x*s+z*c}}
  function project(x,y,z){var r=rotate(x,z);return{x:centerX+r.x*unit,y:centerY+r.z*unit*.5-(y+sceneElevation)*unit,depth:r.z}}
  // Gradients are rebuilt identically every frame while the camera is still, so reuse them per context, keyed by colour
  // and quarter-pixel geometry. The map is cleared when it grows large, so moving objects cannot leak entries.
  var gradientCaches=new WeakMap(),gradientCtx=null,gradientMap=null,hexCache=new Map();
  function cachedGradient(key,make){if(gradientCtx!==ctx){gradientCtx=ctx;gradientMap=gradientCaches.get(ctx);if(!gradientMap){gradientMap=new Map();gradientCaches.set(ctx,gradientMap)}}var g=gradientMap.get(key);if(g)return g;if(gradientMap.size>=12000)gradientMap.clear();g=make();gradientMap.set(key,g);return g}
  function isHexColor(fill){if(typeof fill!=='string')return false;var hit=hexCache.get(fill);if(hit===undefined){hit=/^#[0-9a-f]{6}$/i.test(fill);hexCache.set(fill,hit)}return hit}
  function q4(v){return Math.round(v*4)}
  function poly(points,fill,stroke,opaque){if(occluding()&&(opaque||isHexColor(fill)))occludePoly(points);ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);for(var i=1;i<points.length;i++)ctx.lineTo(points[i].x,points[i].y);ctx.closePath();if(isHexColor(fill)){
      var lo=points[0].y,hi=lo;for(var k=1;k<points.length;k++){var py=points[k].y;if(py<lo)lo=py;else if(py>hi)hi=py}hi=Math.max(lo+1,hi);
      ctx.fillStyle=cachedGradient(fill+'|v|'+q4(lo)+'|'+q4(hi),function(){var shade=ctx.createLinearGradient(0,lo,0,hi);shade.addColorStop(0,fill);shade.addColorStop(1,shadeColor(fill,.9));return shade});
    }else ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=Math.max(.4,Math.min(1,unit*.021));ctx.lineJoin='round';ctx.stroke()}}
  // Key light sits high on the upper right, so every free-standing object throws a soft shadow down and to the left. The
  // shadow is the convex hull of the footprint and the footprint displaced by the object's height, faded along its length.
  var SHADOW_DX=-.46,SHADOW_DY=.2;
  function convexHull(pts){pts=pts.slice().sort(function(a,b){return a.x-b.x||a.y-b.y});function cross(o,a,b){return (a.x-o.x)*(b.y-o.y)-(a.y-o.y)*(b.x-o.x)}var lower=[],upper=[];pts.forEach(function(q){while(lower.length>=2&&cross(lower[lower.length-2],lower[lower.length-1],q)<=0)lower.pop();lower.push(q)});for(var i=pts.length-1;i>=0;i--){var q=pts[i];while(upper.length>=2&&cross(upper[upper.length-2],upper[upper.length-1],q)<=0)upper.pop();upper.push(q)}return lower.slice(0,-1).concat(upper.slice(0,-1))}
  function castShadow(base,h,alpha){
    var dx=h*unit*SHADOW_DX,dy=h*unit*SHADOW_DY,shifted=base.map(function(q){return{x:q.x+dx,y:q.y+dy}}),hull=convexHull(base.concat(shifted));
    var c={x:(base[0].x+base[2].x)/2,y:(base[0].y+base[2].y)/2},g=cachedGradient('c|'+alpha+'|'+q4(c.x)+'|'+q4(c.y)+'|'+q4(dx)+'|'+q4(dy),function(){var g=ctx.createLinearGradient(c.x,c.y,c.x+dx,c.y+dy);g.addColorStop(0,'rgba(14,28,20,'+alpha+')');g.addColorStop(1,'rgba(14,28,20,'+(alpha*.25)+')');return g});
    poly(hull,g);
  }
  function drawBox(x,z,y,w,d,h,palette){var p=palette||[colors.oliveTop,colors.oliveLeft,colors.oliveRight],b0=project(x-w/2,y,z-d/2),b1=project(x+w/2,y,z-d/2),b2=project(x+w/2,y,z+d/2),b3=project(x-w/2,y,z+d/2);
    // Furniture-sized boxes resting on a floor or counter cast; slabs, walls, rails and trim do not.
    var furniture=h>=.2&&h<=3.2&&w>=.15&&d>=.15&&w<=5&&d<=5&&y>=-.05&&y<=1.6;
    // Repeated furniture stops sharing pixel-identical fills: a tint nudge seeded by a coarse floor cell, so one
    // machine's parts stay matched while its twin across the room drifts a shade. Quantized to keep the shade and
    // gradient caches small; architecture keeps exact colours so adjacent slabs join seamlessly.
    if(furniture&&isHexColor(p[0])&&isHexColor(p[1])&&isHexColor(p[2])){
      var tint=1+(seedNoise(Math.round(x/2)*3.7,Math.round(z/2)*2.9)-.5)*.06;tint=Math.round(tint*50)/50;
      if(tint!==1)p=[shadeColor(p[0],tint),shadeColor(p[1],tint),shadeColor(p[2],tint)]}
    if(furniture)castShadow([b0,b1,b2,b3],h,.13);
    // Tall architecture gets a short contact shadow at its base: grounding without long streaks into interiors.
    else if(h>3.2&&h<=15&&w>=.5&&d>=.5&&w<=20&&d<=20&&y>=-.2&&y<=.1)castShadow([b0,b1,b2,b3],1.1,.09);
    var t0=project(x-w/2,y+h,z-d/2),t1=project(x+w/2,y+h,z-d/2),t2=project(x+w/2,y+h,z+d/2),t3=project(x-w/2,y+h,z+d/2);
    var f1=Math.cos(angle)>=0?[b3,b2,t2,t3]:[b0,b1,t1,t0],f2=Math.sin(angle)>=0?[b2,b1,t1,t2]:[b3,b0,t0,t3],deep=h>=.45&&w>=.2&&d>=.2;
    poly(f1,deep&&isHexColor(p[1])?litSide(f1,p[1]):p[1]);poly(f2,deep&&isHexColor(p[2])?litSide(f2,p[2]):p[2]);
    var topPts=[t0,t1,t2,t3],tcx=(t0.x+t1.x+t2.x+t3.x)/4,tcy=(t0.y+t1.y+t2.y+t3.y)/4;
    // Furniture tops get a bevel: the rim a shade lighter than the inset surface, so edges read rounded, not razor.
    var bevel=furniture&&w>=.3&&d>=.3&&h>=.15&&isHexColor(p[0])&&unit>=14;
    if(bevel){
      // The rim is lit directionally — dim on the shadow side, bright toward the key light — so it reads as a
      // rounded lip rather than an outline ring, especially on pale counter tops.
      var rimLo=Math.min(t0.x,t1.x,t2.x,t3.x),rimHi=Math.max(t0.x,t1.x,t2.x,t3.x),rimBase=p[0];
      poly(topPts,cachedGradient(rimBase+'|r|'+q4(rimLo)+'|'+q4(rimHi),function(){var g=ctx.createLinearGradient(rimLo,0,rimHi,0);g.addColorStop(0,shadeColor(rimBase,.94));g.addColorStop(.55,shadeColor(rimBase,1.03));g.addColorStop(1,shadeColor(rimBase,1.14));return g}),null,true);
      var bpx=Math.max(1,Math.min(2.4,unit*.05));
      var inner=topPts.map(function(q){var dx=q.x-tcx,dy=q.y-tcy,len=Math.hypot(dx,dy)||1,f=Math.max(0,1-bpx/len);return{x:tcx+dx*f,y:tcy+dy*f}});
      poly(inner,w>=.6&&d>=.6?litTop(inner,p[0]):p[0]);
      // Faint stone veining on large pale slab tops (service counters, benches) once close enough to read it.
      var lum=(parseInt(p[0].slice(1,3),16)*.3+parseInt(p[0].slice(3,5),16)*.59+parseInt(p[0].slice(5,7),16)*.11);
      if(unit>=22&&lum>=210&&w*d>=1.2){
        var vseed=Math.round(x*13.7+z*7.1);
        ctx.save();ctx.beginPath();ctx.moveTo(inner[0].x,inner[0].y);ctx.lineTo(inner[1].x,inner[1].y);ctx.lineTo(inner[2].x,inner[2].y);ctx.lineTo(inner[3].x,inner[3].y);ctx.closePath();ctx.clip();
        ctx.strokeStyle='rgba(140,150,142,.13)';ctx.lineWidth=Math.max(.5,unit*.013);ctx.lineCap='round';
        for(var vein=0;vein<2;vein++){
          var u1=.15+seedNoise(vseed,vein)*.7,u2=.15+seedNoise(vseed,vein+7)*.7;
          var vs={x:inner[0].x+(inner[3].x-inner[0].x)*u1,y:inner[0].y+(inner[3].y-inner[0].y)*u1};
          var ve={x:inner[1].x+(inner[2].x-inner[1].x)*u2,y:inner[1].y+(inner[2].y-inner[1].y)*u2};
          ctx.beginPath();ctx.moveTo(vs.x,vs.y);ctx.quadraticCurveTo((vs.x+ve.x)/2,(vs.y+ve.y)/2+(seedNoise(vseed,vein+13)-.5)*unit*.3,ve.x,ve.y);ctx.stroke();
        }
        ctx.restore();
      }
    }else poly(topPts,w>=.6&&d>=.6&&isHexColor(p[0])?litTop(topPts,p[0]):p[0],null,isHexColor(p[0]));
    // Instead of tracing the whole wireframe, only the top edges facing the key light (upper right) catch a
    // highlight; the dark side is defined by shading and contact shadows alone.
    if(!(w<.1||d<.04)&&h>=.1){
      ctx.beginPath();
      for(var e=0;e<4;e++){var ea=topPts[e],eb=topPts[(e+1)%4];if((ea.x+eb.x)/2-tcx-((ea.y+eb.y)/2-tcy)>0){ctx.moveTo(ea.x,ea.y);ctx.lineTo(eb.x,eb.y)}}
      ctx.strokeStyle='#ffffff30';ctx.lineWidth=Math.max(.4,Math.min(1,unit*.021));ctx.lineCap='round';ctx.stroke();
    }
    // Material grain: full strength on walls taller than a person and room-sized slab tops, fainter on mid-size
    // furniture faces, so nothing large reads as flat vector fill.
    if(h>=1.6&&(w>=1.4||d>=1.4)){var tex=surfaceTexture();poly(f1,tex);poly(f2,tex)}
    else if(h>=.8&&(w>=.8||d>=.8)){var mid=surfaceTexture();ctx.save();ctx.globalAlpha*=.55;poly(f1,mid);poly(f2,mid);ctx.restore()}
    if(w>=6&&d>=6)poly(topPts,surfaceTexture());
    else if(w>=2.5&&d>=2.5){ctx.save();ctx.globalAlpha*=.5;poly(topPts,surfaceTexture());ctx.restore()}}
  // Vertical falloff on box sides: lit at the top edge, settling darker toward the ground.
  // A neutral mottled grain tile, overlaid at low alpha on large faces so walls and ground read as material
  // rather than flat vector fill. The pattern is anchored to the world (translated and scaled with the camera),
  // so it stays glued to surfaces while panning and zooming.
  var textureTile=(function(){var t=document.createElement('canvas');t.width=t.height=96;var tc=t.getContext('2d');var seed=7;function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647}
    for(var i=0;i<190;i++){var r=.5+rnd()*1.3;tc.fillStyle=rnd()<.5?'rgba(255,250,235,.05)':'rgba(8,14,10,.055)';tc.beginPath();tc.arc(rnd()*96,rnd()*96,r,0,Math.PI*2);tc.fill()}
    for(var j=0;j<26;j++){tc.strokeStyle=j%2?'rgba(255,250,235,.028)':'rgba(8,14,10,.03)';tc.lineWidth=.8;var sx=rnd()*96,sy=rnd()*96;tc.beginPath();tc.moveTo(sx,sy);tc.lineTo(sx+(rnd()-.5)*3,sy+3+rnd()*6);tc.stroke()}
    return t})();
  var texturePatterns=new WeakMap();
  function surfaceTexture(){var pat=texturePatterns.get(ctx);if(!pat){pat=ctx.createPattern(textureTile,'repeat');texturePatterns.set(ctx,pat)}var k=unit/26;pat.setTransform(new DOMMatrix([k,0,0,k,centerX,centerY]));return pat}
  function litSide(points,fill){var top=points[0].y,low=top;for(var k=1;k<points.length;k++){var py=points[k].y;if(py<top)top=py;else if(py>low)low=py}low=Math.max(top+1,low);return cachedGradient(fill+'|v|'+q4(top)+'|'+q4(low),function(){var g=ctx.createLinearGradient(0,top,0,low);g.addColorStop(0,shadeColor(fill,1.05));g.addColorStop(.45,fill);g.addColorStop(1,shadeColor(fill,.88));return g})}
  // Soft key light from the upper right: wide top surfaces pick up a gentle left-to-right lift.
  function litTop(points,fill){var lo=points[0].x,hi=lo;for(var k=1;k<points.length;k++){var px=points[k].x;if(px<lo)lo=px;else if(px>hi)hi=px}hi=Math.max(lo+1,hi);return cachedGradient(fill+'|h|'+q4(lo)+'|'+q4(hi),function(){var g=ctx.createLinearGradient(lo,0,hi,0);g.addColorStop(0,shadeColor(fill,.955));g.addColorStop(.5,fill);g.addColorStop(1,shadeColor(fill,1.045));return g})}
  // Ambient shadow: a soft band on a floor plane, dark along one edge and fading away from it.
  function bandGradient(a,b,alpha){return cachedGradient('b|'+alpha+'|'+q4(a.x)+'|'+q4(a.y)+'|'+q4(b.x)+'|'+q4(b.y),function(){var g=ctx.createLinearGradient(a.x,a.y,b.x,b.y);g.addColorStop(0,'rgba(14,28,20,'+alpha+')');g.addColorStop(1,'rgba(14,28,20,0)');return g})}
  function shadowBand(x0,x1,zNear,zFar,y,alpha){var a=project((x0+x1)/2,y,zNear),b=project((x0+x1)/2,y,zFar),g=bandGradient(a,b,alpha);poly([project(x0,y,zNear),project(x1,y,zNear),project(x1,y,zFar),project(x0,y,zFar)],g)}
  function shadowBandX(z0,z1,xNear,xFar,y,alpha){var a=project(xNear,y,(z0+z1)/2),b=project(xFar,y,(z0+z1)/2),g=bandGradient(a,b,alpha);poly([project(xNear,y,z0),project(xNear,y,z1),project(xFar,y,z1),project(xFar,y,z0)],g)}
  function groundPatch(x,z,w,d,fill){poly([project(x-w/2,.015,z-d/2),project(x+w/2,.015,z-d/2),project(x+w/2,.015,z+d/2),project(x-w/2,.015,z+d/2)],fill)}
  // Emissive light. Every glow, pool, cone and wash is composited with 'screen' so it lifts the material it lands on
  // instead of painting a translucent disc over it; light surfaces stay put, dark ones warm up.
  function parseHex(hex){var n=parseInt(hex.slice(1,7),16);return [n>>16&255,n>>8&255,n&255,hex.length>7?parseInt(hex.slice(7,9),16)/255:1]}
  function rgba(c,a){return 'rgba('+c[0]+','+c[1]+','+c[2]+','+Math.max(0,a)+')'}
  // Bright core, quick roll-off and a long faint tail, closer to inverse-square than a linear fade.
  // Rounded-rectangle path for browsers without ctx.roundRect (Safari before 16).
  function roundedRectPath(x,y,w,h,r){r=Math.max(0,Math.min(r,w/2,h/2));ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
  function softRadial(x,y,r,c,a){return cachedGradient('s|'+c[0]+','+c[1]+','+c[2]+'|'+a+'|'+q4(x)+'|'+q4(y)+'|'+q4(r),function(){var g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,rgba(c,a));g.addColorStop(.28,rgba(c,a*.52));g.addColorStop(.62,rgba(c,a*.16));g.addColorStop(1,rgba(c,0));return g})}
  // Everything that emits declares itself as it is drawn. `lit(draw)` paints an emitter into the scene and, after dark,
  // paints it again into an emissive buffer that runs alongside the scene. Every opaque surface drawn afterwards paints
  // black over that buffer (see poly, ellipse, worldLine and the limbs and blocks of drawPerson), so an emitter behind
  // a wall, a counter or a guest is hidden in the buffer exactly as it is in the scene. The buffer is added over the
  // night light map and blurred for the bloom. Night is carried by points of light, not lines: lamp faces go in at
  // full strength; the concealed strips under every shelf, fascia, counter front and stair tread go in as faint trim
  // so the floors do not turn into a grid of glowing lines; spill (glows and cones) stays out of the buffer entirely,
  // since the light map already lifts what it lands on. `draw(k)` receives the strength, for painters that set their
  // own layer alphas.
  var nightScene=false,emissiveCtx=null,litDepth=0,EMISSIVE_WEIGHT={face:1,strip:.18,pane:.26};
  function lit(draw,kind){
    kind=kind||'face';litDepth++;draw(1);litDepth--;
    if(nightScene&&litDepth===0&&kind!=='spill'){var scene=ctx,weight=EMISSIVE_WEIGHT[kind];ctx=emissiveCtx;ctx.save();ctx.globalAlpha=scene.globalAlpha*weight;litDepth++;draw(weight);litDepth--;ctx.restore();ctx=scene}
  }
  // Black over the emissive buffer for an opaque surface just drawn in the scene: a polygon, an ellipse or a stroke.
  function occludePoly(points){var e=emissiveCtx;e.globalAlpha=ctx.globalAlpha;e.beginPath();e.moveTo(points[0].x,points[0].y);for(var i=1;i<points.length;i++)e.lineTo(points[i].x,points[i].y);e.closePath();e.fillStyle='#000';e.fill()}
  function occludeEllipse(x,y,rx,ry){var e=emissiveCtx;e.globalAlpha=ctx.globalAlpha;e.beginPath();e.ellipse(x,y,rx,ry,0,0,Math.PI*2);e.fillStyle='#000';e.fill()}
  function occludeStroke(q,w){var e=emissiveCtx;e.globalAlpha=ctx.globalAlpha;e.beginPath();for(var i=0;i<q.length;i++){if(i)e.lineTo(q[i].x,q[i].y);else e.moveTo(q[i].x,q[i].y)}e.strokeStyle='#000';e.lineWidth=w;e.lineCap='round';e.lineJoin='round';e.stroke()}
  function occluding(){return nightScene&&litDepth===0}
  function litEllipse(x,y,rx,ry,fill){lit(function(){ellipse(x,y,rx,ry,fill)})}
  function litLine(points,color,weight){lit(function(){worldLine(points,color,weight)})}
  function litBox(x,z,y,w,d,h,palette){lit(function(){drawBox(x,z,y,w,d,h,palette)})}
  function glow(x,y,r,color,ry){lit(function(){var c=parseHex(color);ctx.save();ctx.globalCompositeOperation='screen';ellipse(x,y,r,ry||r*.6,softRadial(x,y,r,c,c[3]));ctx.restore()},'spill')}
  // Linear gradient across a projected plane: p0->p1 is a line of constant value, p0->p3 the falloff direction. Keeps a wash
  // aligned to world height on a slanted wall rather than to screen rows.
  function planeGradient(p0,p1,p3,stops){var dx=p1.x-p0.x,dy=p1.y-p0.y,len=Math.hypot(dx,dy)||1,nx=-dy/len,ny=dx/len,t=(p3.x-p0.x)*nx+(p3.y-p0.y)*ny;var g=ctx.createLinearGradient(p0.x,p0.y,p0.x+nx*t,p0.y+ny*t);stops.forEach(function(st){g.addColorStop(st[0],st[1])});return g}
  // Grazing light: a concealed strip washes down the wall plane beneath it and dies out before the floor.
  function wallWash(x0,x1,z,yTop,yBottom,color,a){var c=parseHex(color),p0=project(x0,yTop,z),p1=project(x1,yTop,z),p2=project(x1,yBottom,z),p3=project(x0,yBottom,z);ctx.save();ctx.globalCompositeOperation='screen';poly([p0,p1,p2,p3],planeGradient(p0,p1,p3,[[0,rgba(c,a)],[.35,rgba(c,a*.42)],[1,rgba(c,0)]]));ctx.restore()}
  // Volumetric cone: a wedge of light falling from a fixture to the surface below. Three nested wedges keep the edges feathered.
  function lightCone(x,yTop,z,yBottom,topHalf,bottomHalf,color,a){lit(function(){coneShape(x,yTop,z,yBottom,topHalf,bottomHalf,color,a)},'spill')}
  function coneShape(x,yTop,z,yBottom,topHalf,bottomHalf,color,a){
    var top=project(x,yTop,z),base=project(x,yBottom,z),c=parseHex(color);
    ctx.save();ctx.globalCompositeOperation='screen';
    [[.62,1],[1,.55],[1.5,.25]].forEach(function(layer){
      var tw=unit*topHalf*layer[0],bw=unit*bottomHalf*layer[0],g=ctx.createLinearGradient(0,top.y,0,base.y);
      g.addColorStop(0,rgba(c,a*layer[1]));g.addColorStop(.5,rgba(c,a*layer[1]*.42));g.addColorStop(1,rgba(c,0));
      ctx.beginPath();ctx.moveTo(top.x-tw,top.y);ctx.lineTo(top.x+tw,top.y);ctx.lineTo(base.x+bw,base.y);ctx.lineTo(base.x-bw,base.y);ctx.closePath();ctx.fillStyle=g;ctx.fill();
    });
    ctx.restore();
  }
  // World-space emitters: a floor pool (with a tighter hot spot) and a spherical halo around a fixture.
  function poolLight(x,y,z,r,a,color){var p=project(x,y,z),c=parseHex(color);ctx.save();ctx.globalCompositeOperation='screen';ellipse(p.x,p.y,unit*r,unit*r*.5,softRadial(p.x,p.y,unit*r,c,a));ellipse(p.x,p.y,unit*r*.38,unit*r*.19,softRadial(p.x,p.y,unit*r*.38,c,a*.7));ctx.restore()}
  function haloLight(x,y,z,r,a,color){var p=project(x,y,z),c=parseHex(color);ctx.save();ctx.globalCompositeOperation='screen';ellipse(p.x,p.y,unit*r,unit*r,softRadial(p.x,p.y,unit*r,c,a));ctx.restore()}
  // Slow breathing for gas-discharge fixtures; still under reduced motion.
  function lampPulse(now,seed){return motionPreference.matches?1:1+Math.sin(now*.0013+seed)*.035}
  // Exterior fixtures, shared by the day pass and the night re-lighting pass: brass sconces on the entrance posts, a recessed
  // strip under the entrance header, a hooded lamp over the exit and low bollards beside both approaches.
  var exteriorFixtures={
    sconces:[{x:-10.98,y:2.3,z:8.72},{x:-10.98,y:2.3,z:11.28}],
    // Entrance bollards stay on the far side of the approach so arriving guests always pass in front of them.
    bollards:[{x:-12.8,z:10.35},{x:-12.75,z:6.2},{x:9.05,z:-8.45},{x:11.3,z:-8.9}],
    exitLamp:{x:10.25,y:3.38,z:-7.34},
    entryStrip:[[-10.9,3.27,8.85],[-10.9,3.27,11.15]]
  };
  function drawBollard(b){
    drawBox(b.x,b.z,0,.2,.2,.7,['#414843','#171e1a','#2b342e']);litBox(b.x,b.z,.5,.21,.21,.13,['#fff1c9','#d8c18b','#f2e0b1']);drawBox(b.x,b.z,.7,.24,.24,.05,['#d8c18b','#8d7950','#b7a16d']);
  }
  function exteriorLightSpill(k){
    exteriorFixtures.sconces.forEach(function(f){haloLight(f.x-.2,f.y-.06,f.z,.8,.26*k,'#ffe2a5');lightCone(f.x-.32,f.y-.12,f.z,.03,.14,.8,'#ffd98f',.08*k);poolLight(f.x-.6,.03,f.z,1.25,.2*k,'#ffd98f')});
    exteriorFixtures.bollards.forEach(function(b){haloLight(b.x,.62,b.z,.42,.28*k,'#ffe2a5');poolLight(b.x,.03,b.z,1.1,.18*k,'#ffd98f')});
    var e=exteriorFixtures.exitLamp;haloLight(e.x,e.y-.14,e.z,.7,.26*k,'#ffe2a5');lightCone(e.x,e.y-.12,e.z-.06,.03,.28,1.1,'#ffd98f',.09*k);poolLight(e.x,.03,e.z-.8,1.5,.22*k,'#ffd98f');
    poolLight(-11.2,.03,10,1.5,.16*k,'#ffd98f');
  }
  // Recessed downlight in the slab over the ground-floor counters: a small trim ring and a long, faint cone onto the counter top.
  // The counters' soffit downlights paint with the ground floor (under the mezzanine slab) even though the counters
  // themselves are drawn later as depth-sorted jobs; the jobs skip them.
  var suppressDownlights=false;
  function slabDownlight(x,z,slabY,topY){
    if(suppressDownlights)return;
    var trim=project(x,slabY,z);ellipse(trim.x,trim.y,unit*.13,unit*.065,'#2a3330');litEllipse(trim.x,trim.y,unit*.075,unit*.038,'#fff3d2');
    lightCone(x,slabY-.01,z,topY,.12,1.25,'#ffe3a8',.055);
    var top=project(x,topY+.01,z);glow(top.x,top.y,unit*1.35,'#ffe6b01e',unit*.62);
  }
  // Bench task lamp for mid-tier production stations: a slim arm from the rear corner with a hooded head over the work surface.
  function benchLamp(x,z,cool){
    var arm=['#3a4340','#1b201e','#2a302d'],head=['#c9c1a6','#6f6a57','#a49d84'];
    worldLine([[x+1.28,1.3,z-.95],[x+1.28,2.32,z-.95],[x+.95,2.42,z-.6]],'#2a302d',.032);
    drawBox(x+.9,z-.55,2.24,.36,.3,.14,head);
    var bulb=project(x+.9,2.22,z-.55);litEllipse(bulb.x,bulb.y,unit*.075,unit*.04,cool?'#eef8dc':'#fff3d2');
    lightCone(x+.85,2.22,z-.5,1.3,.13,.7,cool?'#d8efae':'#ffe3a8',.09);
    var spot=project(x+.6,1.31,z-.3);glow(spot.x,spot.y,unit*1.05,cool?'#e2f3cd28':'#ffe6b02a',unit*.5);
  }
  // Small projected light sources; layered strokes avoid expensive full-scene bloom.
  function warmStrip(points,cool,kind){lit(function(k){stripShape(points,cool,k)},kind||'strip')}
  function stripShape(points,cool,k){
    ctx.save();if(k>=1)worldLine(points,'#344338',.095);
    ctx.globalCompositeOperation='screen';
    ctx.globalAlpha=.06*k;worldLine(points,cool?'#d6edbe':'#ffcf83',.46);
    ctx.globalAlpha=.11*k;worldLine(points,cool?'#d6edbe':'#ffcf83',.26);
    ctx.globalAlpha=.24*k;worldLine(points,cool?'#e2f3cd':'#ffe3a4',.12);
    ctx.globalCompositeOperation='source-over';
    ctx.globalAlpha=.9*k;worldLine(points,cool?'#e7f6d0':'#ffe8b4',.052);
    ctx.globalAlpha=k;worldLine(points,cool?'#f3fbe7':'#fff5da',.018);ctx.restore();
  }
  function orderCounterStrip(x,z){return [[x-.95,1.11,z+1.12],[x+.95,1.11,z+1.12]]}
  // ---- Night --------------------------------------------------------------------------------------------------------
  // Night is one deferred light map rather than a stack of overlays. The diorama is painted on its own surface, and a
  // single map holding the ambient (a deep, cool ink that darkens toward the frame) plus every fixture added into it as
  // coloured light is multiplied over that surface alone: lit floor keeps its real colour, overlapping fixtures sum
  // instead of stacking discs, the unlit world goes properly dark, and the backdrop is left alone. Each floor gets
  // a broad room fill so the building glows like a lantern while the street stays dark. Above the map: light in the
  // air (one cone and halo per fixture), the emitters themselves at full brightness, a real bloom of those emitters
  // blurred at half resolution, and dust drifting through the beams. The backdrop behind is only deepened, never lit.
  var nightSurfaces={};
  function nightSurface(name,w,h){var c=nightSurfaces[name];if(!c){c=document.createElement('canvas');nightSurfaces[name]=c}if(c.width!==w||c.height!==h){c.width=w;c.height=h}return c}
  var canvasBlur=typeof CanvasRenderingContext2D!=='undefined'&&'filter' in CanvasRenderingContext2D.prototype;
  function nightAmount(){return Math.min(1,visualLight().darkness/.34)}
  function mixHex(a,b,t){var A=parseHex(a),B=parseHex(b);return 'rgb('+Math.round(A[0]+(B[0]-A[0])*t)+','+Math.round(A[1]+(B[1]-A[1])*t)+','+Math.round(A[2]+(B[2]-A[2])*t)+')'}
  // The diorama paints onto a transparent surface after dark so its alpha can mask the light map.
  function beginNightScene(){var pw=Math.ceil(width*dpr),ph=Math.ceil(height*dpr),s=nightSurface('scene',pw,ph),e=nightSurface('emissive',pw,ph);emissiveCtx=e.getContext('2d');emissiveCtx.setTransform(dpr,0,0,dpr,0,0);emissiveCtx.globalCompositeOperation='source-over';emissiveCtx.globalAlpha=1;emissiveCtx.clearRect(0,0,width,height);nightScene=true;litDepth=0;ctx=s.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.clearRect(0,0,width,height)}
  function endNightScene(){nightScene=false;if(ctx===screenCtx)return;var s=nightSurfaces.scene;ctx=screenCtx;ctx.drawImage(s,0,0,width,height)}
  // Every night fixture in one place. `emit(kind,args)` receives pools (light on a surface), beams (a wedge from a
  // fixture down to a surface), halos (a sphere of light at a fixture head) and washes (grazing light down a wall).
  // The light map paints them all; the air pass draws only the beams and halos.
  var WARM='#ffd98f',COOL='#cfeebb',GROW='#c98bff',MINT='#bfe9d8';
  function nightFixtures(now,emit){
    function pool(){emit('pool',arguments)}function halo(){emit('halo',arguments)}function beam(){emit('beam',arguments)}function wash(){emit('wash',arguments)}
    var counters=orderCounterPositions(state.orderCounters),many=state.orderCounters>1,e=exteriorFixtures.exitLamp;
    // Street: sconces on the door posts, bollards on the approaches, the hooded lamp over the exit, the lit threshold.
    exteriorFixtures.sconces.forEach(function(f){halo(f.x-.2,f.y-.06,f.z,.9,.55,WARM);beam(f.x-.32,f.y-.12,f.z,.03,.14,.9,.3,WARM);pool(f.x-.6,.03,f.z,1.5,.7,WARM)});
    exteriorFixtures.bollards.forEach(function(b){halo(b.x,.62,b.z,.5,.55,WARM);pool(b.x,.03,b.z,1.3,.6,WARM)});
    halo(e.x,e.y-.14,e.z,.8,.55,WARM);beam(e.x,e.y-.12,e.z-.06,.03,.28,1.2,.3,WARM);pool(e.x,.03,e.z-.8,1.7,.65,WARM);
    pool(-11.2,.03,10,1.7,.5,WARM);pool(-9.1,.04,9.91,1.9,.7,WARM);halo(-9.1,2.4,9.91,.9,.45,'#ffe2a5');
    // The glazed storefront and marquee spill onto the sidewalk along the whole entrance wall.
    pool(-12.3,.03,4.6,2.4,.3,'#ffe3a8');pool(-12.3,.03,8.2,2.4,.32,'#ffe3a8');
    // Shop floor: slab downlights over the counters, the retail counters, floor downlights, the vitrine, the lounge door.
    counters.concat([machinePos[5]]).forEach(function(q){beam(q.x,4.45,q.z,1.31,.12,1.3,.28,WARM);pool(q.x,1.32,q.z,1.6,.55,'#ffe3a8');halo(q.x+.65,1.6,q.z+.35,.6,.25,'#fff0c8')});
    counters.forEach(function(p){pool(p.x,.03,4.9,many?1.5:2.9,.65,WARM)});pool(4,.03,4.9,2.9,.65,WARM);
    [-5.3,-2.7,7.4].forEach(function(gx){pool(gx,.03,1,2.3,.55,'#ffe9bb');halo(gx,3.4,1,1.1,.4,'#ffe9bb')});
    pool(DISPLAY_CASE.x,.03,DISPLAY_CASE.z-.3,2.6,.45,'#fff0c8');halo(DISPLAY_CASE.x,1.4,DISPLAY_CASE.z-.32,1.5,.3,'#fff0c8');
    if(state.kiosk)for(var k=0;k<kioskCount();k++){halo(-9.45,1.85,6.8-k*1.8,.8,.45,'#dfeccc');pool(-9.1,.03,6.8-k*1.8,1.2,.4,'#dfeccc')}
    if(state.lounge>0){pool(LOUNGE_DOOR.x,.03,LOUNGE_DOOR.z,1.7,.45,'#ffb8cf');halo(LOUNGE_SIDE.x+.2,1.4,LOUNGE_SIDE.z0+.42,1.2,.5,'#ff8fb8')}
    // Work lights over every station (cool over the grow room) and the strip under each counter front.
    machinePos.forEach(function(q,i){if(i===4&&many)return;var c=i===1?COOL:WARM;pool(q.x,q.y+.04,q.z+.9,2.3,.65,c);beam(q.x,q.y+1.1,q.z+1.26,q.y+.04,1.1,1.7,.2,c)});
    if(many)counters.forEach(function(q){var strip=orderCounterStrip(q.x,q.z);pool(q.x,.04,q.z+.9,1.6,.6,WARM);beam(q.x,strip[0][1],strip[0][2],.04,.95,1.2,.2,WARM)});
    // Concealed strips wash the rear walls of every floor so the architecture stays legible after dark.
    wash(-11.2,8.95,-6.9,3.6,1.3,.4,WARM);wash(-8.7,8.7,4.7-6.55,4.7+3.6,4.7+1.5,.42,WARM);wash(-6.2,6.2,9.4-6.7,9.4+3.6,9.4+1.7,.24,GROW);
    // Mezzanine: the online kiosk sign and the planted wall.
    if(deliveryBuilt()){pool(-10.7,7.09,1.5,1.9,.7,MINT);halo(-10.7,9.2,1.5,1.5,.55,MINT)}
    halo(7.9,5.9,-6.5,1.9,.28,COOL);
    // Grow room: purple pendants over the benches, cool light on the rack and a warm wash behind the shelving.
    growLightBars().forEach(function(lx,li){var pulse=lampPulse(now,li*1.7);pool(lx,9.44,-3,1.9,.75*pulse,GROW);halo(lx,12.65,-3,1.2,.55*pulse,'#d9a8ff');beam(lx,12.6,-3,9.44,.3,1.3,.5*pulse,GROW)});
    pool(0,9.44,-6.2,2.9,.45,'#cfe6ff');halo(0,11.4,-6.2,2.3,.22,'#cfe6ff');halo(.6,11,-6.7,3.4,.3,WARM);
    // Stair treads.
    for(var st=0;st<8;st++)pool(9.2,.6+st*1.15,4.6-st*.75,.65,.45,WARM);
  }
  // The light map: ambient ink, a room fill per floor, then every fixture as light; masked to the diorama's own alpha
  // and multiplied over it in one draw, so nothing is tinted twice and the sky stays untouched.
  function nightLightMap(t,now){
    var ms=dpr*.5,map=nightSurface('light',Math.ceil(width*ms),Math.ceil(height*ms)),saved=sceneElevation;sceneElevation=0;
    ctx=map.getContext('2d');ctx.setTransform(ms,0,0,ms,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
    var c=project(0,4.5,0),g=ctx.createRadialGradient(c.x,c.y,unit*3,c.x,c.y,Math.max(width,height)*.75);
    g.addColorStop(0,mixHex('#ffffff','#4a5680',t));g.addColorStop(.45,mixHex('#ffffff','#2b355e',t));g.addColorStop(1,mixHex('#ffffff','#121838',t));
    ctx.fillStyle=g;ctx.fillRect(0,0,width,height);
    ctx.save();ctx.globalCompositeOperation='screen';
    // Room fills: the shop floor and mezzanine in the warm of their strips, the grow room in the purple of its pendants.
    [[0,.03,1.5,13,.34,'#ffe3b8'],[0,4.73,-1,10,.3,'#ffe0b0'],[0,9.43,-3,8.5,.3,'#d0a6ff']].forEach(function(f){var p=project(f[0],f[1],f[2]),cc=parseHex(f[5]);ellipse(p.x,p.y,unit*f[3],unit*f[3]*.5,softRadial(p.x,p.y,unit*f[3],cc,f[4]*t))});
    ctx.restore();
    nightFixtures(now,function(kind,a){
      if(kind==='pool')poolLight(a[0],a[1],a[2],a[3],a[4]*t,a[5]);
      else if(kind==='halo')haloLight(a[0],a[1],a[2],a[3],a[4]*t,a[5]);
      else if(kind==='beam')lightCone(a[0],a[1],a[2],a[3],a[4],a[5],a[7],a[6]*t);
      else wallWash(a[0],a[1],a[2],a[3],a[4],a[6],a[5]*t);
    });
    ctx.globalCompositeOperation='destination-in';ctx.drawImage(nightSurfaces.scene,0,0,width,height);ctx.globalCompositeOperation='source-over';
    ctx=screenCtx;sceneElevation=saved;
    ctx.save();ctx.globalCompositeOperation='multiply';ctx.drawImage(map,0,0,width,height);ctx.restore();
  }
  // Light in the air: one soft cone and one halo per fixture, plus the grow room's humid glow.
  function nightAir(t,now){
    var saved=sceneElevation;sceneElevation=0;ctx.save();ctx.globalAlpha=t;
    nightFixtures(now,function(kind,a){
      if(kind==='beam')lightCone(a[0],a[1],a[2],a[3],a[4],a[5],a[7],a[6]*.45);
      else if(kind==='halo')haloLight(a[0],a[1],a[2],a[3]*1.15,a[4]*.32,a[5]);
    });
    var haze=project(0,11,-3);glow(haze.x,haze.y,unit*7.5,'#b47cff14',unit*3.2);
    ctx.restore();sceneElevation=saved;
  }
  // The emissive buffer added over the map at full strength, then the signs, marquee, kiosk readout and neon, which
  // are drawn as text and so never enter the buffer.
  function nightEmitters(now){
    ctx.save();ctx.globalCompositeOperation='lighter';ctx.drawImage(nightSurfaces.emissive,0,0,width,height);ctx.restore();
    var saved=sceneElevation;sceneElevation=0;
    signFaces.forEach(function(sign){var p=project(sign.x,sign.y,sign.z);glow(p.x,p.y,unit*sign.halo,'#ffda8a40',unit*sign.halo*.7);signText(sign.x,sign.y,sign.z,sign.label,sign.width,sign.size,'#fff3d6')});
    drawMarquee(true);
    if(deliveryBuilt()){sceneElevation=7.05;var pending=onlineRequestsReady();onlineReadout(-10.7,2.4,pending,pending>0&&state.stock[3]>=onlineSize());sceneElevation=0}
    if(state.lounge>0)loungeNeon(true);
    sceneElevation=saved;
  }
  // Bloom: the emitters drawn again at half resolution, blurred, and added back so every light source glows.
  function nightBloom(t,now,emitters){
    if(!canvasBlur)return;
    var s=.5,bw=Math.ceil(width*s),bh=Math.ceil(height*s),sharp=nightSurface('bloomA',bw,bh),soft=nightSurface('bloomB',bw,bh);
    ctx=sharp.getContext('2d');ctx.setTransform(s,0,0,s,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.clearRect(0,0,width,height);
    emitters(now);
    ctx=soft.getContext('2d');ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,bw,bh);ctx.filter='blur('+Math.max(3,Math.min(12,unit*s*.28)).toFixed(1)+'px)';ctx.drawImage(sharp,0,0);ctx.filter='none';
    ctx=screenCtx;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.6*t;ctx.drawImage(soft,0,0,width,height);ctx.restore();
  }
  // Dust drifting down through the pendants' beams and the street lamps' cones; still under reduced motion.
  var MOTES=(function(){var s=[],seed=99;function r(){seed=(seed*48271)%2147483647;return seed/2147483647}for(var i=0;i<44;i++)s.push({a:r(),b:r(),c:r(),phase:r()*6.28,rate:.6+r()*.8});return s})();
  function nightMotes(t,now){
    var hosts=[],e=exteriorFixtures.exitLamp,still=motionPreference.matches,saved=sceneElevation;sceneElevation=0;
    growLightBars().forEach(function(lx){hosts.push({x:lx,z:-3,y0:9.7,y1:12.4,rx:.9,rz:1,c:'#eed6ff'})});
    exteriorFixtures.sconces.forEach(function(f){hosts.push({x:f.x-.45,z:f.z,y0:.3,y1:f.y-.25,rx:.35,rz:.4,c:'#ffe9bd'})});
    hosts.push({x:e.x,z:e.z-.45,y0:.3,y1:e.y-.3,rx:.5,rz:.4,c:'#ffe9bd'});
    ctx.save();ctx.globalCompositeOperation='screen';
    MOTES.forEach(function(m,i){var h=hosts[i%hosts.length],tm=still?0:now*.00009*m.rate;
      var fall=(m.a+tm*.35)%1,y=h.y1-fall*(h.y1-h.y0),x=h.x+Math.sin(tm*2.3+m.phase)*h.rx*(.3+m.b*.7),z=h.z+Math.cos(tm*1.7+m.phase*1.6)*h.rz*(.3+m.c*.7);
      var p=project(x,y,z);ctx.globalAlpha=t*Math.sin(fall*Math.PI)*(.45+.25*Math.sin(tm*6+m.phase));ctx.fillStyle=h.c;ctx.beginPath();ctx.arc(p.x,p.y,Math.max(.9,unit*.026),0,Math.PI*2);ctx.fill()});
    ctx.restore();sceneElevation=saved;
  }
  // Branch maps: the same sky and light map, from the flat theme colour and the fixtures the branch registers.
  function branchBackdrop(color){
    var nt=nightAmount();render.nightT=nt;
    var sky=ctx.createLinearGradient(0,0,0,height);sky.addColorStop(0,nt>0?mixHex(color,'#131b1e',nt*.85):mixHex(color,'#dfeadb',.1));sky.addColorStop(.55,mixHex(color,'#0e1417',nt*.87));sky.addColorStop(1,mixHex(color,'#0e1417',.16+nt*.74));
    ctx.fillStyle=sky;ctx.fillRect(0,0,width,height);
    if(nt<1){var haze=ctx.createRadialGradient(width*.62,height*.3,0,width*.62,height*.3,Math.max(width,height)*.6);haze.addColorStop(0,'#f7ecc8'+Math.round(18*(1-nt)).toString(16).padStart(2,'0'));haze.addColorStop(1,'#f7ecc800');ctx.fillStyle=haze;ctx.fillRect(0,0,width,height);}
    if(nt>0){var halo=project(0,0,1);ctx.save();ctx.globalAlpha=nt;glow(halo.x,halo.y-unit*3,unit*20,'#4b6a6a30');ctx.restore();beginNightScene()}
  }
  function branchNight(fixtures,color,focus){
    var t=render.nightT||0;if(!(t>0))return;
    endNightScene();
    var ms=dpr*.5,map=nightSurface('light',Math.ceil(width*ms),Math.ceil(height*ms)),saved=sceneElevation;sceneElevation=0;
    ctx=map.getContext('2d');ctx.setTransform(ms,0,0,ms,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
    var c=project(0,2,0),g=ctx.createRadialGradient(c.x,c.y,unit*3,c.x,c.y,Math.max(width,height)*.75);
    g.addColorStop(0,mixHex('#ffffff','#4a5680',t));g.addColorStop(.45,mixHex('#ffffff','#2b355e',t));g.addColorStop(1,mixHex('#ffffff','#121838',t));
    ctx.fillStyle=g;ctx.fillRect(0,0,width,height);
    var room=project(focus.x,.03,focus.z),rc=parseHex('#ffe3b8');ctx.save();ctx.globalCompositeOperation='screen';ellipse(room.x,room.y,unit*12,unit*6,softRadial(room.x,room.y,unit*12,rc,.3*t));ctx.restore();
    fixtures.forEach(function(f){poolLight(f.x,.03,f.z,f.size*1.7,.6*t,color);haloLight(f.x,f.y,f.z,f.size*.9,.5*t,color)});
    ctx.globalCompositeOperation='destination-in';ctx.drawImage(nightSurfaces.scene,0,0,width,height);ctx.globalCompositeOperation='source-over';
    ctx=screenCtx;ctx.save();ctx.globalCompositeOperation='multiply';ctx.drawImage(map,0,0,width,height);ctx.restore();
    ctx.save();ctx.globalAlpha=t;fixtures.forEach(function(f){haloLight(f.x,f.y,f.z,f.size,.3,color)});ctx.restore();
    function emitters(){fixtures.forEach(function(f){var q=project(f.x,f.y,f.z);ellipse(q.x,q.y,unit*Math.min(.16,f.size*.14),unit*Math.min(.12,f.size*.1),'#fff3d2')})}
    ctx.save();ctx.globalAlpha=t;ctx.globalCompositeOperation='lighter';ctx.drawImage(nightSurfaces.emissive,0,0,width,height);ctx.restore();
    ctx.save();ctx.globalAlpha=t;emitters();ctx.restore();
    nightBloom(t,sceneTime,function(){ctx.drawImage(nightSurfaces.emissive,0,0,width,height);emitters()});
    sceneElevation=saved;
  }
  function lightPool(x,y,z,r,cool){
    var p=project(x,y,z);glow(p.x,p.y,unit*r,cool?'#d8efae34':'#ffdc913c',unit*r*.5);glow(p.x,p.y,unit*r*.4,cool?'#eaf7cf2a':'#fff0c22e',unit*r*.2);
  }

  function ellipse(x,y,rx,ry,fill){
    if(occluding()&&rx>=unit*.04&&isHexColor(fill))occludeEllipse(x,y,rx,ry);
    ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);
    if(isHexColor(fill)&&rx>unit*.11){
      ctx.fillStyle=cachedGradient(fill+'|e|'+q4(x)+'|'+q4(y)+'|'+q4(rx)+'|'+q4(ry),function(){var g=ctx.createRadialGradient(x-rx*.3,y-ry*.4,0,x,y,Math.max(rx,ry));g.addColorStop(0,fill);g.addColorStop(.6,fill);g.addColorStop(1,shadeColor(fill,.79));return g});
    }else ctx.fillStyle=fill;ctx.fill();
  }
  // Deterministic 0..1 noise from a world identity, so organic wobble is stable frame to frame and while panning.
  function seedNoise(a,b){var n=Math.sin(a*127.1+(b||0)*311.7)*43758.5453;return n-Math.floor(n)}
  // A hand-drawn ellipse: eight seeded lobes joined by quadratics, for foliage, soil and other soft silhouettes.
  // Shading and occlusion match ellipse(); amp is the radius wobble (default ±14%).
  function blobEllipse(x,y,rx,ry,fill,seed,amp){
    amp=amp===undefined?.14:amp;
    if(occluding()&&rx>=unit*.04&&isHexColor(fill))occludeEllipse(x,y,rx,ry);
    var pts=new Array(8);
    for(var i=0;i<8;i++){var a=i*Math.PI/4,k=1+(seedNoise(seed,i)-.5)*2*amp;pts[i]={x:x+Math.cos(a)*rx*k,y:y+Math.sin(a)*ry*k}}
    ctx.beginPath();ctx.moveTo((pts[7].x+pts[0].x)/2,(pts[7].y+pts[0].y)/2);
    for(var j=0;j<8;j++){var n=pts[(j+1)%8];ctx.quadraticCurveTo(pts[j].x,pts[j].y,(pts[j].x+n.x)/2,(pts[j].y+n.y)/2)}
    ctx.closePath();
    if(isHexColor(fill)&&rx>unit*.11){
      ctx.fillStyle=cachedGradient(fill+'|e|'+q4(x)+'|'+q4(y)+'|'+q4(rx)+'|'+q4(ry),function(){var g=ctx.createRadialGradient(x-rx*.3,y-ry*.4,0,x,y,Math.max(rx,ry)*(1+amp));g.addColorStop(0,fill);g.addColorStop(.6,fill);g.addColorStop(1,shadeColor(fill,.79));return g});
    }else ctx.fillStyle=fill;ctx.fill();
  }
  // A pointed leaf or calyx in screen space: two quadratics from base to tip, fat in the middle.
  function leafShape(px,py,len,ang,fill){
    var ca=Math.cos(ang),sa=Math.sin(ang),tx=px+ca*len,ty=py+sa*len,mx=px+ca*len*.45,my=py+sa*len*.45,wx=-sa*len*.36,wy=ca*len*.36;
    ctx.beginPath();ctx.moveTo(px,py);ctx.quadraticCurveTo(mx+wx,my+wy,tx,ty);ctx.quadraticCurveTo(mx-wx,my-wy,px,py);
    ctx.fillStyle=fill;ctx.fill();
  }
  var shadeCache=new Map();
  function shadeColor(hex,factor){var key=hex+':'+factor;if(shadeCache.has(key))return shadeCache.get(key);var result='#'+[1,3,5].map(function(i){return Math.min(255,Math.round(parseInt(hex.slice(i,i+2),16)*factor)).toString(16).padStart(2,'0')}).join('');shadeCache.set(key,result);return result}
  function landscapeTree(x,z,size){
    var root=project(x,.06,z);ellipse(root.x+unit*.45,root.y+unit*.12,unit*size*.9,unit*size*.38,'#31544225');
    worldLine([[x,0,z],[x,2.1*size,z]],'#977550',.15);
    // The canopy is three wobbled lobes rather than perfect circles, with a few pointed leaves escaping the rim.
    var seed=x*7.3+z*3.1;
    [[-.45,2.15,.72],[.45,2.35,.83],[0,2.85,.9]].forEach(function(c,k){var p=project(x+c[0]*size,c[1]*size,z);blobEllipse(p.x,p.y,unit*c[2]*size,unit*c[2]*size*1.08,c[0]<0?'#82b64f':c[0]>0?'#a6cf67':'#b8dc78',seed+k*5,.13)});
    if(unit>=10){var crown=project(x,2.85*size,z),cr=unit*.9*size;
      for(var leaf=0;leaf<5;leaf++){var a=-2.5+leaf*1.25+(seedNoise(seed,leaf+20)-.5)*.7;
        leafShape(crown.x+Math.cos(a)*cr*.88,crown.y+Math.sin(a)*cr*.95,cr*(.3+seedNoise(seed,leaf+30)*.15),a+(seedNoise(seed,leaf+40)-.5)*.6,leaf%2?'#a6cf67':'#8cc058')}}
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
    var p=project(x,y,z),r=unit*(size||.13),color=STRAINS[strain].color,dark=shadeColor(color,.8),light=shadeColor(color,1.16);
    // Stacked calyxes narrowing toward the tip, so buds read as flowers rather than oval clusters.
    [[-.38,.62,-.5,1.15,dark],[.38,.58,.5,1.2,color],[-.2,.28,-.26,1.05,color],[.22,.24,.3,1,color],[0,.12,0,1.1,light]].forEach(function(c){
      leafShape(p.x+c[0]*r,p.y+c[1]*r,r*c[3]*1.2,-Math.PI/2+c[2],c[4])});
    if(r>=2.6){var pistil=(STRAIN_LOOKS[strain]||{}).pistil||'#e8a25f';
      ctx.strokeStyle=pistil;ctx.lineWidth=Math.max(.5,r*.13);ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(p.x-r*.3,p.y-r*.25);ctx.quadraticCurveTo(p.x-r*.62,p.y-r*.5,p.x-r*.5,p.y-r*.78);
      ctx.moveTo(p.x+r*.32,p.y-r*.4);ctx.quadraticCurveTo(p.x+r*.62,p.y-r*.56,p.x+r*.52,p.y-r*.9);ctx.stroke()}
  }
  function plant(x,z,y,size,strain,growth){
    var base=project(x,y,z),rim=project(x,y+.38,z),r=unit*.3;
    poly([{x:rim.x-r,y:rim.y},{x:rim.x+r,y:rim.y},{x:base.x+r*.72,y:base.y},{x:base.x-r*.72,y:base.y}],'#b67d59');
    ellipse(base.x,base.y,r*.72,r*.24,'#8b583f');ellipse(rim.x,rim.y,r*1.1,r*.48,'#e8b38a');blobEllipse(rim.x,rim.y,r*.84,r*.32,'#46382c',x*5.1+z*7.7,.1);
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
      ellipse(foot.x,foot.y,unit*.105,unit*.055,'#3c493d');litEllipse(foot.x,foot.y-unit*.015,unit*.055,unit*.028,'#fff1c9');glow(foot.x,foot.y,unit*.5,'#ffe0a13d');
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
  // Glass: translucent tint plus a diagonal sheen so panes read as glazing rather than flat film.
  function glassPane(points,tint){poly(points,tint);var xs=points.map(function(q){return q.x}),ys=points.map(function(q){return q.y}),x0=Math.min.apply(null,xs),x1=Math.max.apply(null,xs),y0=Math.min.apply(null,ys),y1=Math.max.apply(null,ys),g=ctx.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,'rgba(255,255,255,.14)');g.addColorStop(.32,'rgba(255,255,255,.02)');g.addColorStop(.5,'rgba(255,255,255,.08)');g.addColorStop(.68,'rgba(255,255,255,0)');poly(points,g)}
  function worldLine(points,color,weight){var w=Math.max(.65,unit*weight),q=new Array(points.length);ctx.beginPath();for(var i=0;i<points.length;i++){var v=project(points[i][0],points[i][1],points[i][2]);q[i]=v;if(i)ctx.lineTo(v.x,v.y);else ctx.moveTo(v.x,v.y)}ctx.strokeStyle=color;ctx.lineWidth=w;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();if(weight>=.05&&occluding()&&isHexColor(color))occludeStroke(q,w)}
  function constructionTape(a,b){
    // A vertical ribbon in world space stays attached to the stair posts when the camera moves.
    function point(t,lift){return project(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t+lift,a[2]+(b[2]-a[2])*t)}
    var edge=[point(0,-.065),point(1,-.065),point(1,.065),point(0,.065)];
    ctx.save();poly(edge,'#ebcb59','#74652e');
    ctx.beginPath();edge.forEach(function(p,i){if(i)ctx.lineTo(p.x,p.y);else ctx.moveTo(p.x,p.y)});ctx.closePath();ctx.clip();
    for(var stripe=-1;stripe<9;stripe++){var t=stripe/8;poly([point(t,-.065),point(t+.055,-.065),point(t+.11,.065),point(t+.055,.065)],'#30372b')}
    ctx.restore();
  }
  function carton(x,z,y,size){
    drawBox(x,z,y,size,size*.75,size*.65,['#e5bc80','#a57c4f','#c99c65']);
    drawBox(x,z,y+size*.65,size*.16,size*.76,.018,['#f0d6a6','#c6aa77','#d7bb85']);
    drawBox(x,z+size*.38,y+size*.16,size*.38,.015,size*.23,['#f7e8c9','#ddd0b4','#eaddbd']);
    worldLine([[x-size*.1,y+size*.26,z+size*.395],[x+size*.1,y+size*.26,z+size*.395]],'#6c7657',.025);
  }
  function bagAppIcon(x,z,y,size){
    // Exact two-leaf Canopy mark, projected onto the bag's front face.
    leafMark(project(x-size/2,y+size,z),project(x+size/2,y+size,z),project(x-size/2,y,z));
  }
  // The same mark laid flat on a horizontal surface (a folded tee's top), size units on a side.
  function leafMarkFlat(x,z,y,size){leafMark(project(x-size/2,y,z-size/2),project(x+size/2,y,z-size/2),project(x-size/2,y,z+size/2))}
  function leafMark(o,a,b){
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
      // Folded tees: two soft stacks, a neck fold, and the Canopy leaf printed on the chest.
      for(var layer=0;layer<2;layer++)drawBox(x,z,y+layer*.085,.58,.42,.075,layer?fabric:['#e8dfbf','#a59c80','#c6bca0']);
      worldLine([[x-.07,y+.163,z-.12],[x,y+.163,z-.06],[x+.07,y+.163,z-.12]],'#dfdfbf',.022);
      leafMarkFlat(x+.1,z+.08,y+.166,.24);
    }else if(kind===1){
      // Cap crown and projecting brim sit directly on the shelf, the Canopy leaf on the crown's front.
      drawBox(x,z+.14,y,.51,.42,.035,fabric);
      var q=project(x,y+.14,z-.035);
      ellipse(q.x,q.y,unit*.22,unit*.19,color);
      bagAppIcon(x,z+.12,y+.09,.2);
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
      for(var row=0;row<2;row++)for(var col=0;col<3;col++){var sx=x-.72+col*.72,sz=z-.37+row*.72;drawBox(sx,sz,1.42,.54,.5,.08,['#5c4e37','#353b2b','#434c34']);var q=project(sx,1.54,sz);
        // A sprout with two pointed cotyledons rather than a dot on a stick.
        worldLine([[sx,1.5,sz],[sx+.03,1.64,sz]],'#85b867',.026);
        leafShape(q.x,q.y-unit*.1,unit*.1,Math.PI*1.22,'#c6d988');
        leafShape(q.x+unit*.01,q.y-unit*.11,unit*.11,-Math.PI*.28,'#a9cc6e')}
      drawBox(x-1.23,z-.72,1.33,.33,.12,.52,['#ebd8ab','#ae9970','#d0b98a']);
      drawBox(x+1.12,z+.52,1.33,.4,.4,.46,metal);
      worldLine([[x+1.28,1.6,z+.5],[x+1.57,1.78,z+.55]],'#bdd3bd',.06);
    }
    if(i===1){
      // The overhead strip is gone; the gantry's purple bars light this bench. Only the small monitor remains.
      drawBox(x+1.5,z+.5,1.67,.09,.36,.45,metal);
      var screen=project(x+1.57,1.94,z+.68);lit(function(){ctx.fillStyle='#294b40';ctx.fillRect(screen.x-unit*.12,screen.y,unit*.22,unit*.17);ctx.fillStyle='#bbe697';ctx.fillRect(screen.x-unit*.09,screen.y+unit*.05,unit*.13,unit*.04)});
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
      for(var row=0;row<3;row++)litBox(x-.79,z-.096,1.6+row*.105,.37-row*.07,.012,.024,['#c9e6a9','#c9e6a9','#c9e6a9']);
      drawBox(x+.96,z+.56,1.33,.5,.4,.24,metal);drawBox(x+.96,z+.56,1.57,.28,.48,.018,['#f4ead3','#cabfa8','#e1d8c1']);
      drawBox(x-.7,z+.47,1.33,.78,.3,.04,['#526e60','#304d40','#3c5c49']);
    }

  }
  function drawCounterDivider(){
    // A low tiled divider links the counters without crossing the customer lanes, centred in the gap between the
    // right-hand order desk and the pickup counter (the desks narrow when the order bank expands, so the gap moves).
    var count=state.orderCounters,orderEdge=Math.max.apply(null,orderCounterPositions(count).map(function(p){return p.x+(count===1?1.46:1.01)})),pickupEdge=4-1.46;
    var cx=(orderEdge+pickupEdge)/2,width=count===3?2:3.5,seams=Math.floor(width/.24);
    drawBox(cx,2.5,.03,width,.28,1.04,['#6b8972','#284939','#3d614c']);
    for(var tile=0;tile<seams;tile++){var tx=cx-width/2+.07+tile*.24;worldLine([[tx,.09,2.65],[tx,1.05,2.65]],'#d4d6b7',.016)}
    [.38,.72].forEach(function(y){worldLine([[cx-width/2,y,2.65],[cx+width/2,y,2.65]],'#d4d6b7',.016)});
    drawBox(cx,2.5,1.07,width+.12,.4,.11,['#e0d4b4','#a99c7b','#c5ba9a']);
  }
  function drawOrderCounterBank(now,only){
    orderCounterPositions(state.orderCounters).map(function(p,index){return {x:p.x,z:p.z,index:index}}).sort(function(a,b){return depthOf(a)-depthOf(b)}).forEach(function(p){
      if(only!==undefined&&p.index!==only)return;
      var active=customers.some(function(c){return c.orderCounter===p.index&&atOrderCounter(c,state.orderCounters)&&c.serviceElapsed>0});
      if(state.lines[4]>0)drawPerson(p.x-.35,p.z-1.5,now,4,false,true,false,{amount:0,phase:0,facing:.3,identity:4+p.index*23,taskOffset:p.index*1.7,workActivity:active?1:0});
      if(state.orderCounters===1){drawStage(p,4,now);return}
      var x=p.x,z=p.z,stone=['#f8f3e5','#bfc3b4','#dfe2d5'],walnut=['#8d6a45','#4a3120','#6e5034'],oak=['#cfb085','#82613f','#a88960'];
      drawBox(x,z,.03,2.12,2.16,.25,['#425046','#222d25','#324137']);
      drawBox(x,z,.28,2.02,2.06,.86,walnut);
      for(var flute=0;flute<11;flute++)drawBox(x-.9+flute*.18,z+1.035,.32,.105,.075,.78,['#a8865c','#7f5f3f','#5e4229']);
      drawBox(x+1.02,z,.29,.055,2.03,.84,oak);
      drawBox(x,z,1.14,2.22,2.2,.17,stone);
      warmStrip(orderCounterStrip(x,z),false);
      // Each desk has a till facing its employee and a separate customer payment pad.
      drawBox(x-.36,z-.24,1.31,.7,.52,.1,['#577765','#243c30','#3d5846']);
      drawBox(x-.36,z-.38,1.41,.7,.12,.5,['#bdd0bd','#2f5040','#496b56']);
      drawBox(x-.36,z-.305,1.52,.53,.02,.28,['#b6d29d','#b6d29d','#b6d29d']);
      drawBox(x+.52,z+.64,1.31,.4,.36,.07,['#53735e','#294936','#365541']);
      drawBox(x+.52,z+.65,1.385,.25,.24,.015,['#cbe2ba','#cbe2ba','#cbe2ba']);
      jar(x+.61,z-.35,1.31);
      slabDownlight(x,z,4.45,1.31);
      if(selected===4)selectionRing(p,true);
      var wait=project(x,.025,4.9);ellipse(wait.x,wait.y,unit*.32,unit*.12,active?'#dcc89170':'#b2bc9340');
    });
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
  // An orange cone with a reflective band: the universal sign that something is not finished yet.
  function trafficCone(x,z,y,size){
    size=size||.3;var base=project(x,y,z),apex=project(x,y+size*1.45,z),r=unit*size*.34;
    drawBox(x,z,y,size*.78,size*.78,.025,['#d9572d','#8a3418','#b8451f']);
    ellipse(base.x,base.y-unit*.02,r,r*.45,'#c24a22');
    poly([{x:base.x-r,y:base.y-unit*.02},{x:apex.x,y:apex.y},{x:base.x+r,y:base.y-unit*.02}],'#ea7a3a');
    var band=project(x,y+size*.62,z),br=r*.6;poly([{x:band.x-br,y:band.y},{x:band.x-br*.78,y:band.y-unit*size*.16},{x:band.x+br*.78,y:band.y-unit*size*.16},{x:band.x+br,y:band.y}],'#f6efe1');
  }
  // A construction site the size of the future station: gravel pad, chalk outline, a faint ghost of what will stand here,
  // yellow stakes joined by striped tape, cones and a lumber pile. Static on purpose; the tap is the animation.
  function drawConstructionSite(x,z,w,d,ghost){
    var stake=['#e6c95a','#8b7423','#c9ab3e'],timber=['#cfae7c','#8a6b45','#b08e62'];
    drawBox(x,z,0,w,d,.06,['#bdb9a8','#7c7868','#9d9988']);
    ctx.save();ctx.setLineDash([Math.max(2,unit*.14),Math.max(2,unit*.1)]);worldLine([[x-w/2+.2,.075,z-d/2+.2],[x+w/2-.2,.075,z-d/2+.2],[x+w/2-.2,.075,z+d/2-.2],[x-w/2+.2,.075,z+d/2-.2],[x-w/2+.2,.075,z-d/2+.2]],'#f4efd9b0',.03);ctx.restore();
    if(ghost){ctx.save();ctx.globalAlpha=.24;ghost();ctx.restore()}
    var hx=w/2-.12,hz=d/2-.12,corners=[[x-hx,z-hz],[x+hx,z-hz],[x+hx,z+hz],[x-hx,z+hz]];
    corners.forEach(function(c){drawBox(c[0],c[1],.06,.1,.1,.72,stake)});
    for(var e=0;e<4;e++){var a=corners[e],b=corners[(e+1)%4];constructionTape([a[0],.58,a[1]],[b[0],.58,b[1]])}
    drawBox(x-w*.18,z+d*.12,.06,1.15,.22,.07,timber);drawBox(x-w*.18+.08,z+d*.12-.2,.13,1.05,.2,.07,timber);drawBox(x-w*.18-.05,z+d*.12-.08,.2,.95,.2,.07,timber);
    trafficCone(x+w*.3,z+d*.28,.06);trafficCone(x-w*.34,z-d*.24,.06,.24);
    // A hard hat waiting on the pile.
    var hat=project(x-w*.18+.15,.32,z+d*.12-.1);ellipse(hat.x,hat.y,unit*.14,unit*.07,'#e4bf3f');ellipse(hat.x,hat.y-unit*.045,unit*.1,unit*.085,'#f0cd52');
  }
  function drawStage(pos,i,now,previewOnly){
    if(!previewOnly&&!state.lines[i]){drawConstructionSite(pos.x,pos.z,3.1,2.5,function(){drawStarterStation(pos.x,pos.z,i)});return}
    var rise=previewOnly?0:buildRise[i]||0,lift=rise*rise*1.1;
    if(rise>0){ctx.save();ctx.globalAlpha=.15+.85*(1-rise);sceneElevation-=lift}
    try{drawStageBuilt(pos,i,now,previewOnly)}finally{if(rise>0){sceneElevation+=lift;ctx.restore()}}
  }
  function drawStageBuilt(pos,i,now,previewOnly){
    now=motionPreference.matches?0:taskClocks[i];
    var x=pos.x,z=pos.z,active=stationWorking(i),stone=[['#d1e5c4','#6f9b7d','#a0c6a5'],['#7fd7b5','#236e62','#44ab89'],['#97e4e1','#28747f','#55b4b4'],['#ffe29a','#c3893f','#edbd62']][Math.min(3,stationTier(i))],dark=['#416859','#213b32','#315446'];
    if(stationTier(i)===0){drawStarterStation(x,z,i);warmStrip([[x-.8,1.12,z+.84],[x+.8,1.12,z+.84]],i===1);if(i>=4&&!previewOnly)slabDownlight(x,z,4.45,1.13);return}
    var contact=project(x+.25,.015,z+.2);ellipse(contact.x,contact.y,unit*1.95,unit*.88,'#344d3b26');
    drawBox(x,z,.03,3.1,2.5,.3,dark);drawBox(x,z,.33,2.9,2.25,.8,stone);drawBox(x,z,1.13,3.2,2.5,.16,['#f4e7c0','#b6a37b','#d6c596']);drawBox(x,z,1.29,3.12,2.42,.035,['#f0e5cb','#b8aa8b','#d6c7a6']);
    for(var panel=0;panel<2;panel++){drawBox(x-.75+panel*1.5,z+1.135,.44,1.32,.04,.55,['#d0e3c9','#6b8f79','#a2bfa4']);drawBox(x-.75+panel*1.5,z+1.17,.75,.32,.045,.045,['#e3d6ac','#958d70','#c3b68f'])}
    drawBox(x+1.46,z,.37,.035,2.1,.63,['#a8bda9','#65846f','#8da38e']);
    for(var seam=0;seam<3;seam++)drawBox(x+1.49,z-.7+seam*.7,.47,.02,.035,.43,['#afc2aa','#6c8470','#859f88']);
    drawBox(x,z-.9,1.305,2.7,.035,.025,['#f4ebd5','#c1ac84','#ded0ac']);
    if(i===0){drawBox(x,z,1.29,2.3,1.55,.12,dark);for(var n=0;n<6;n++){var p=project(x-.7+(n%3)*.7,1.44,z-.35+Math.floor(n/3)*.7);ellipse(p.x,p.y,unit*.09,unit*.06,'#e1c68a')}}
    if(i===1){for(var n=0;n<(stationTier(i)===1?2:4);n++)crop(x-.65+(n%2)*1.3,z-.5+Math.floor(n/2),1.3,n,false)}
    if(i===2){crop(x-.75,z,1.3,1,true);drawBox(x+.7,z,1.3,1.1,1,.2,dark);for(var n=0;n<3;n++){flowerBud(x+.45+n*.25,z,1.6,visibleStrain(n),.14)}var p=project(x+(Math.sin(now*.005)*.12),1.5,z+.55);ctx.strokeStyle='#e4ece6';ctx.lineWidth=unit*.07;ctx.beginPath();ctx.moveTo(p.x-unit*.25,p.y-unit*.15);ctx.lineTo(p.x+unit*.25,p.y+unit*.15);ctx.moveTo(p.x-unit*.25,p.y+unit*.15);ctx.lineTo(p.x+unit*.25,p.y-unit*.15);ctx.stroke()}
    if(i===3){for(var n=0;n<3;n++)jar(x-.8+n*.8,z+(Math.sin(now*.003+n)*.08),1.3);drawBox(x,z-.9,1.3,2.7,.18,.16,dark)}
    if(i===4){drawBox(x-.7,z,1.3,.95,.7,.12,dark);drawBox(x-.7,z-.2,1.42,.95,.13,.7,['#d8e7df','#314c42','#426b57']);for(var n=0;n<3;n++)drawBox(x+.5+n*.22,z+n*.18,1.3+n*.16,.7,.55,.16,['#f2ead5','#b0a589','#d2c6aa'])}

    if(i===1&&active){var lit=project(x,1.38,z);glow(lit.x,lit.y,unit*2.1,'#e6efb047')}
    if((i===2||i===3)&&stationTier(i)<3)benchLamp(x,z,false);
    if(i>=4&&!previewOnly)slabDownlight(x,z,4.45,1.31);
    if(i===3){drawBox(x+1.05,z+.8,1.33,.5,.35,.16,['#9faf99','#465f4a','#70866b']);drawBox(x+1.05,z+.8,1.5,.35,.24,.025,['#c9ebaf','#8cac78','#b7d59d'])}
    if(i>=4){
      // Stone-topped retail counters on a dark plinth, fluted walnut across the front and the side return. The plinth
      // goes down first — its full-footprint top face would otherwise paint over the lower front of the body in this
      // projection and leave the counter looking like a black slab.
      drawBox(x,z,.3,3.02,2.32,.09,['#3b433d','#1e2521','#2c3530']);
      drawBox(x,z,.34,2.92,2.24,.79,['#8d6a45','#4a3120','#6e5034']);
      for(var flute=0;flute<16;flute++)drawBox(x-1.35+flute*.18,z+1.125,.38,.105,.075,.7,['#a8865c','#7f5f3f','#5e4229']);
      worldLine([[x-1.5,.22,z+1.3],[x+1.5,.22,z+1.3]],'#c4a76b',.06);
      drawBox(x+1.47,z,.34,.055,2.22,.8,['#8d6a45','#4f3521','#6e5034']);
      for(var slat=0;slat<12;slat++)drawBox(x+1.505,z-1.02+slat*.18,.38,.075,.105,.7,['#a8865c','#5e4229','#8a6844']);
      drawBox(x,z,1.095,3.19,2.47,.065,['#b68b5c','#765138','#9c724a']);
      drawBox(x,z,1.14,3.22,2.5,.17,['#fcfaf0','#bfc3ba','#e1e4db']);
      worldLine([[x-1.2,1.316,z-.8],[x-.65,1.316,z-.3],[x-.85,1.316,z+.3]],'#999f9335',.016);
      if(i===4){drawBox(x+.65,z+.35,1.34,1.15,.85,.65,['#d7ebe524','#99c6b629','#b8dfcf35']);
      worldLine([[x+.08,1.34,z+.78],[x+.08,2,z+.78],[x+1.22,2,z+.78],[x+1.22,1.34,z+.78]],'#2f3933',.035);
      }
      if(i===4){jar(x+.4,z+.36,1.34);jar(x+.86,z+.36,1.34);
        // Case lighting: an LED bar under the lid and a soft fill on the jars.
        var caseFill=project(x+.65,1.58,z+.35);glow(caseFill.x,caseFill.y,unit*.62,'#fff0c82c',unit*.42);litLine([[x+.14,1.95,z+.74],[x+1.16,1.95,z+.74]],'#fff2cc',.02)}
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

    lightCone(x,1.1,z+1.26,.04,1.3,1.7,i===1?'#d8efae':'#ffdc91',.07);
    warmStrip([[x-1.3,1.1,z+1.26],[x+1.3,1.1,z+1.26]],i===1);
    warmStrip([[x-1.35,.14,z+1.18],[x+1.35,.14,z+1.18]],false);
    if(stationTier(i)>=2){var pool=project(x,.08,z+1.35);glow(pool.x,pool.y,unit*1.45,'#f4d29528',unit*.7)}

    worldLine([[x-1.5,1.325,z+1.22],[x+1.5,1.325,z+1.22]],'#fff9df88',.018);
    worldLine([[x+1.55,1.325,z-1.12],[x+1.55,1.325,z+1.18]],'#fff9df55',.018);
    drawStationLevel(x,z,i);
    // Status lamp on the front corner of the counters only: green while the counter is free, grey while a customer is
    // being served, so a lit lamp always means "come here". The production stations upstairs carry no lamp.
    if(i>=4){
      var lit=!active,lamp=project(x+1.25,1.44,z+1);
      ellipse(lamp.x,lamp.y,unit*.115,unit*.08,lit?'#3f7a55':'#4d5650');(lit?litEllipse:ellipse)(lamp.x,lamp.y-unit*.01,unit*.085,unit*.06,lit?'#a7ed96':'#7d8780');
      if(lit)glow(lamp.x,lamp.y,unit*.4,'#9ff59f55',unit*.26);
    }
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
      lightCone(x-.78,2.76,z-.73,1.33,.55,.9,'#ffe6a8',.12);
      litLine([[x-1.3,2.77,z-.73],[x-.25,2.77,z-.73]],'#f9e9b7',.035);
    }else{
      drawBox(x-.85,z+1.17,.57,.62,.025,.36,dark);
      for(var row=0;row<3;row++)worldLine([[x-1.07,.64+row*.085,z+1.19],[x-.65+row*.035,.64+row*.085,z+1.19]],'#cce3a5',.022);
    }
  }
  function drawStationLevel(x,z,i){
    var tier=Math.min(3,stationTier(i)),color=TIER_COLORS[stationTier(i)],level=state.lines[i];
    if(tier<2)return;
    drawBox(x,z+1.2,1.12,3.1,.055,.09,[color,color,color]);
    var equipment=['#c0d5bd','#4e715c','#8cae94'];
    drawBox(x+1.94,z-.3,.03,.72,1.55,1.18,equipment);
    drawBox(x+1.94,z-.3,1.21,.82,1.65,.1,[color,'#6c8b72','#a5bea0']);
    if(i===0){for(var n=0;n<tier+1;n++)carton(x+1.94,z-.8+n*.42,1.31,.35)}
    if(i===1){plant(x+1.94,z-.6,1.31,.5+tier*.12);plant(x+1.94,z+.3,1.31,.4+tier*.1)}
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
    function pickColor(palette,salt){var n=Math.imul((gait&&gait.identity!==undefined?gait.identity:id)+1,salt)>>>0;n=Math.imul(n^(n>>>16),0x45d9f3b)>>>0;return palette[((n^(n>>>16))>>>0)%palette.length]}
    var style=id%20,skin=pickColor(['#e9b28e','#bd8158','#754b32','#f0c9a0','#a66b48','#d6a17d','#604333'],127);
    var hair=pickColor(['#282521','#b66c38','#211f20','#d9b775','#513b28','#795340','#9c8773','#c3beb0'],311);
    var shirt=employee?'#e5e8cf':pickColor(['#8eb7be','#c96b60','#315d6b','#daa951','#587c85','#b45d65','#718b68','#dddcc9','#ce865b','#775d88','#496a59','#b899a6','#8192b3','#bc784d','#9ba97a','#4b5059'],733);
    var pants=employee?'#294b3c':pickColor(['#345767','#343632','#253d49','#93754d','#536758','#706174','#b2a183','#4d647c'],997);
    var accent=pickColor(['#a87955','#789084','#9b6658','#627e95','#9a789e','#c8996a'],1297);
    if(!employee&&style===18)hair=pickColor(['#b5b3a5','#ded5bf','#8f9390'],311);
    if(!employee&&style===19)hair=pickColor(['#638f91','#b17c94','#9983b0','#bf8967'],311);
    var expressive=!employee&&style===8;
    // The seed technician is a distinct character from the grower: lighter skin, long auburn hair, no cap, a paler apron.
    var seedTech=employee&&id===0;if(seedTech){skin='#e9b28e';hair='#b66c38'}
    if(expressive)hair=pickColor(['#ac83b5','#648f9c','#bf819d','#aaad72'],311);
    function point(dx,y){var lean=reduced?0:gait?Math.max(-.045,Math.min(.045,gait.lean||0)):0;return{x:p.x+(dx+lean*Math.max(0,y-.15))*u,y:p.y-(y+bob)*u}}
    function shape(coords,color){poly(coords.map(function(q){return point(q[0],q[1])}),color)}
    function block(dx,y,w,h,r,color){var q=point(dx,y);if(occluding()){var scene=ctx;ctx=emissiveCtx;ctx.globalAlpha=scene.globalAlpha;ctx.beginPath();roundedRectPath(q.x,q.y,w*u,h*u,r*u);ctx.fillStyle='#000';ctx.fill();ctx=scene}ctx.beginPath();roundedRectPath(q.x,q.y,w*u,h*u,r*u);if(h>=.25&&/^#[0-9a-f]{6}$/i.test(color)){var g=ctx.createLinearGradient(q.x,q.y,q.x,q.y+h*u);g.addColorStop(0,shadeColor(color,1.06));g.addColorStop(1,shadeColor(color,.9));ctx.fillStyle=g}else ctx.fillStyle=color;ctx.fill()}
    function limb(coords,color,w){var q=coords.map(function(c){return point(c[0],c[1])});ctx.beginPath();q.forEach(function(v,i){if(i)ctx.lineTo(v.x,v.y);else ctx.moveTo(v.x,v.y)});ctx.lineWidth=w*u;ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle=color;ctx.stroke();if(occluding())occludeStroke(q,w*u)}
    ellipse(p.x,p.y+u*.025,u*.32,u*.085,'#071d2025');
    // Cast shadow stretching down-left from the feet, matching the key light used for furniture.
    ctx.save();ctx.translate(p.x+u*.34,p.y+u*.14);ctx.rotate(-.42);var sg=ctx.createLinearGradient(-u*.45,0,u*.45,0);sg.addColorStop(0,'rgba(14,28,20,.16)');sg.addColorStop(1,'rgba(14,28,20,.03)');ctx.beginPath();ctx.ellipse(0,0,u*.5,u*.12,0,0,Math.PI*2);ctx.fillStyle=sg;ctx.fill();ctx.restore();
    // Flat, elongated silhouettes with geometric shoes and a restrained walking stride.
    [-1,1].forEach(function(side){var stride=step*side*.13,fx=side*.11+stride,fy=.065+Math.max(0,side*step)*.055;
      limb([[side*.105,.76],[side*.11+stride*.4,.4],[fx,fy+.04]],expressive?skin:pants,.14);
      if(expressive)limb([[side*.105,.78],[side*.11+stride*.3,.53]],pants,.19);
      shape([[fx-.07,fy+.075],[fx+.06,fy+.075],[fx+.17,fy-.025],[fx-.07,fy-.025]],employee?'#20352c':'#242c2c');
      limb([[fx-.065,fy-.026],[fx+.16,fy-.026]],'#c6cfbf',.025);
    });
    var longHair=seedTech||!employee&&(style===2||style===3||style===6||style===12||style===14||style===17);
    if(longHair)block(-.25,1.78,.49,.77,.18,hair);
    // Straight sleeves and small hands, without the old outlined, rounded limbs.
    [-1,1].forEach(function(side){if(employee&&id<6)return;var swing=-side*step*.1,reach=employee&&!reduced?Math.sin(now*.003+id+side)*.045:0;
      if(bag&&side===1){limb([[.245,1.28],[.34,1.05],[.44,1.12+step*.035]],skin,.105);}else limb([[side*.245,1.28],[side*.275,1.04+swing],[side*(.28+reach),.79+swing]],skin,.105);
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
    if(employee){shape([[-.14,1.3],[.14,1.3],[.19,.73],[-.19,.73]],seedTech?'#7a9c66':'#527e60');limb([[-.14,1.34],[-.12,1.16]],'#a9bb92',.035);limb([[.14,1.34],[.12,1.16]],'#a9bb92',.035);block(-.09,1.01,.18,.12,.015,'#41674f')}
    if(employee&&id<6){
      var cycle=reduced?.5:(1-Math.cos(taskClocks[id]*[.004,.0022,.006,.0035,.003,.003][id]+(gait&&gait.taskOffset||0)))*.5;
      var activity=gait&&gait.workActivity!==undefined?gait.workActivity:reduced?(stationWorking(id)?1:0):taskActivity[id];
      var handY=.79+activity*(.43+cycle*.15),handX=.28+activity*(-.16+cycle*.12);
      limb([[-.24,1.27],[-.28,1.04+activity*.09],[-.28+activity*.23,.79+activity*.43]],skin,.105);
      limb([[.24,1.27],[.275+activity*.055,1.04+activity*.09],[handX,handY]],skin,.105);
      ctx.save();ctx.globalAlpha*=activity;
      if(id===0){block(handX-.06,handY+.13,.16,.2,.02,'#e0c590')}
      if(id===1){block(handX-.08,handY+.14,.23,.2,.035,'#88aaa0');limb([[handX+.12,handY+.08],[handX+.25,handY+.15]],'#b9d2c0',.04);if(!reduced&&cycle>.35)for(var drop=0;drop<3;drop++){var fall=(taskClocks[id]*.002+drop/3)%1,water=point(handX+.25+fall*.1,handY+.15-fall*.38);ellipse(water.x,water.y,u*.018,u*.035,'#bedfd5');}}
      if(id===2){var blade=.015+cycle*.075;limb([[handX-.08,handY+blade],[handX+.14,handY-blade]],'#dbe4d8',.035);limb([[handX-.08,handY-blade],[handX+.14,handY+blade]],'#dbe4d8',.035)}
      if(id===3||id===5){block(-.09,1.28,.22,.28,.015,'#c9ac77');limb([[-.04,1.29],[-.04,1.36],[.08,1.36],[.08,1.29]],'#e6d1a7',.025)}
      if(id===4){block(handX-.04,handY+.08,.16,.1,.012,'#e5e8d2')}
      ctx.restore();
    }
    block(-.065,1.46,.13,.17,.035,skin);
    block(-.205+facing*.025,1.79,.41,.47,.15,skin);
    // Broad hair shapes carry the personality; faces stay almost featureless.
    if(!employee&&style===1){for(var curl=0;curl<9;curl++){var angle=curl*Math.PI/8,q=point(Math.cos(angle)*.22,1.69+Math.sin(angle)*.21);ellipse(q.x,q.y,u*.105,u*.105,hair)}}
    else{block(-.218,1.83,.44,.22,.12,employee&&!seedTech?'#527b69':hair);shape([[-.218,1.7],[-.13,1.63],[-.09,1.78],[.19,1.69],[.21,1.8],[-.16,1.82]],employee&&!seedTech?'#527b69':hair)}
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
    if(!employee&&(style===4||style===9)){var glassesY=1.57;[-1,1].forEach(function(side){var q=point(side*.095+facing*.025,glassesY);ctx.beginPath();roundedRectPath(q.x-u*.073,q.y-u*.048,u*.146,u*.1,u*.025);ctx.strokeStyle='#365764';ctx.lineWidth=u*.026;ctx.stroke()});limb([[-.025,glassesY],[.025,glassesY]],'#365764',.023)}
    if(!employee&&(style===3||style===6)){var mouth=point(.075,1.4);ellipse(mouth.x,mouth.y,u*.034,u*.018,'#b96356')}
    if(bag){var bx=x+.48,bz=z+.1,by=.55+(reduced?0:Math.sin(phase-.65)*amount*.055+(gait&&gait.pickupAge!==undefined?.14*Math.exp(-gait.pickupAge*5):0));drawBox(bx,bz,by,.38,.3,.48,['#ead3a1','#9c8052','#c6aa75']);worldLine([[bx-.12,by+.48,bz],[bx-.12,by+.59,bz],[bx+.12,by+.59,bz],[bx+.12,by+.48,bz]],'#bd9f67',.03);drawBox(bx,bz+.16,by+.16,.2,.018,.22,['#496f50','#496f50','#496f50']);bagAppIcon(bx,bz+.18,by+.16,.22)}
  }
  // The order line snakes through three full-width rows of the rope pen in front of the order desk (z 7.0, 8.15 and
  // 9.3, between x −6.5 and −2.0, the gate at the right-hand end — a little back and to the right of the ID desk)
  // before its tail runs through the entry corridor in front of the ID desk and the doorman (never along the wall
  // beside them), crosses the threshold at z ≈ 9 and continues outside along the storefront.
  // The pen's rows grow with the line: 2.4 wide for the starter line of six, full width (4.5) from twenty places.
  var ORDER_ROWS=[7.0,8.15,9.3],ORDER_PEN_RIGHT=-2.0,PICKUP_AISLE_Z=5.5;
  function orderPen(){return {right:ORDER_PEN_RIGHT,left:ORDER_PEN_RIGHT-Math.min(4.5,1.5+queueLimit()*.15)}}
  function queueRoute(ordered){
    var ORDER_PEN=orderPen();
    if(!ordered)return [ORDER_QUEUE_GATE,{x:ORDER_PEN.right,z:ORDER_ROWS[0]},{x:ORDER_PEN.left,z:ORDER_ROWS[0]},{x:ORDER_PEN.left,z:ORDER_ROWS[1]},{x:ORDER_PEN.right,z:ORDER_ROWS[1]},{x:ORDER_PEN.right,z:ORDER_ROWS[2]},{x:ORDER_PEN.left,z:ORDER_ROWS[2]},{x:-7.4,z:ORDER_ROWS[2]},{x:-8.2,z:8.6}].concat(ENTRY_TAIL);
    var x=4,d=-1;
    return [{x:x,z:4.9},{x:x+d*2.1,z:4.9},{x:x+d*2.1,z:6.1},{x:x,z:6.1},{x:x,z:7.3},{x:x+d*2.1,z:7.3},{x:x+d*2.1,z:8.1}];
  }
  function routeLength(route){var n=0;for(var i=1;i<route.length;i++)n+=Math.hypot(route[i].x-route[i-1].x,route[i].z-route[i-1].z);return n}
  function routePoint(route,distance){
    for(var i=1;i<route.length;i++){var a=route[i-1],b=route[i],length=Math.hypot(b.x-a.x,b.z-a.z);if(distance<=length)return{x:a.x+(b.x-a.x)*distance/length,z:a.z+(b.z-a.z)*distance/length};distance-=length}
    return route[route.length-1];
  }
  function customerQueue(c){
    // Lounge guests are not in any line: counting them left the order customers behind them waiting at the lane join,
    // beside the ID desk, for as long as the guest was on the rope or inside.
    var queue=customers.filter(function(q){return q.idChecked!==false&&q.phase!=='leaving'&&q.phase!=='toLounge'&&q.phase!=='lounge'&&q.ordered===c.ordered&&(c.ordered||!!q.kiosk===!!c.kiosk)&&(q.ordered||q.kiosk||q.orderCounter==null)});
    if(c.ordered)queue.sort(function(a,b){return pickupOrder(a)-pickupOrder(b)});
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
    return Math.max(0,queue.indexOf(c))*(queueLimit()>20?.6:.75);
  }
  function customerTarget(c){
    if(c.phase==='leaving')return{x:-10.5,z:-8.1};
    return routePoint(c.kiosk&&!c.ordered?kioskRoute(c.kioskIndex):queueRoute(c.ordered),customerQueueDistance(c));
  }
  // The doorman's line is one route from the desk back out through the door and along the street, everyone 0.7
  // apart: the next customer is already on the approach while the head is being checked, so the desk is never idle
  // waiting for someone to walk up from the door, and a well-staffed door clears people as fast as they arrive.
  var ID_ROUTE=[{x:-10.05,z:9.35},{x:-10.6,z:9.6},{x:-11.7,z:9.3},{x:-12.4,z:7.8},{x:-12.4,z:-10}];
  function moveToIdCheck(c,dt){
    var queue=customers.filter(function(q){return q.idChecked===false}),index=queue.indexOf(c);
    var startX=c.x,startZ=c.z,budget=dt*economy.walkSpeed(state.trafficLevel);
    c.phase='idCheck';
    if(c.idDistance===undefined)c.idDistance=routeLength(ID_ROUTE);
    c.idDistance=Math.max(index*.7,c.idDistance-budget);
    var pos=routePoint(ID_ROUTE,c.idDistance);c.x=pos.x;c.z=pos.z;
    c.walking=Math.hypot(c.x-startX,c.z-startZ)>.001;
    // The doorman starts the check as the head comes up the last half-stride, so a quick door clears a customer every
    // tick or two and never caps the shop's flow.
    if(index===0&&c.idDistance<=.35){
      c.idCheckTime+=dt;
      if(c.idCheckTime>=securityDuration()){
        c.idChecked=true;c.phase='entering';
        // A lounge guest heads for the curtain only while the rope there is short; otherwise they shop like anyone
        // else, so the rope never backs up through the kiosks to the door.
        if(c.lounge&&loungeSeats(state.lounge)>0&&loungeWaiting().length+customers.filter(function(q){return q.phase==='toLounge'&&q.waypoints.length}).length<LOUNGE_ROPE){
          // Past the doorman, along the kiosk row and back to the curtain.
          c.phase='toLounge';c.routeKind='lounge';c.waypoints=[{x:-10.05,z:8.5},{x:-9.7,z:8.15},{x:-8.2,z:8.6},{x:-7.95,z:7.6},{x:-7.95,z:2.2},{x:LOUNGE_DOOR.x,z:2.2},LOUNGE_DOOR];return;
        }
        c.lounge=false;
        var route=c.kiosk?kioskRoute(c.kioskIndex):queueRoute(false),join=laneJoinIndex(route);
        // Step down the desk's door side and join the lane in the corridor in front of it, clear of the doorman.
        c.routeKind=c.kiosk?'kiosk':'order';c.laneDistance=routeLength(route.slice(0,join+1));c.waypoints=[{x:-10.05,z:8.5},route[join]];
      }
    }
  }
  function moveQueuedCustomer(c,dt){
    if(c.idChecked===false){moveToIdCheck(c,dt);return}
    if(c.phase==='lounge'){if(!(c.loungeFade>0))c.walking=false;return}
    if(c.phase==='toLounge'){
      var loungeStartX=c.x,loungeStartZ=c.z,loungeBudget=dt*economy.walkSpeed(state.trafficLevel);
      if(!c.waypoints.length){
        // Waiting on the rope: shuffle back along the approach, one place per guest ahead.
        var place=loungeWaiting().indexOf(c),spot=loungeWaitSpot(place);
        var wdx=spot.x-c.x,wdz=spot.z-c.z,wd=Math.hypot(wdx,wdz),ws=Math.min(wd,loungeBudget);if(wd>.001){c.x+=wdx/wd*ws;c.z+=wdz/wd*ws}
      }else while(c.waypoints.length&&loungeBudget>0){var lp=c.waypoints[0],ldx=lp.x-c.x,ldz=lp.z-c.z,ld=Math.hypot(ldx,ldz),ls=Math.min(ld,loungeBudget);if(ld>.0001){c.x+=ldx/ld*ls;c.z+=ldz/ld*ls}loungeBudget-=ls;if(ld<=ls+.0001)c.waypoints.shift();else break}
      c.walking=Math.hypot(c.x-loungeStartX,c.z-loungeStartZ)>.001;return;
    }
    if(!c.ordered&&c.orderCounter!=null){
      var startX=c.x,startZ=c.z,budget=dt*economy.walkSpeed(state.trafficLevel);
      while(c.waypoints.length&&budget>0){var point=c.waypoints[0],dx=point.x-c.x,dz=point.z-c.z,distance=Math.hypot(dx,dz),step=Math.min(distance,budget);if(distance>.0001){c.x+=dx/distance*step;c.z+=dz/distance*step}budget-=step;if(distance<=step+.0001)c.waypoints.shift();else break}
      c.phase='ordering';c.walking=Math.hypot(c.x-startX,c.z-startZ)>.001;return;
    }
    if(c.phase==='leaving'&&c.loungeFadeIn!==undefined&&c.loungeFadeIn<1){c.walking=false;return}
    var kind=c.phase==='leaving'?'exit':c.ordered?'pickup':c.kiosk?'kiosk':'order',route=kind==='kiosk'?kioskRoute(c.kioskIndex):queueRoute(c.ordered),budget=dt*economy.walkSpeed(state.trafficLevel),startX=c.x,startZ=c.z;
    // A guest out of the lounge is in no hurry: they amble to the door at a fixed slow pace, whatever Floor flow does
    // for everyone else (a third of the base walking speed).
    if(c.lounge&&kind==='exit'&&c.z>-7.4)budget=dt*economy.walkSpeed(0)/3;
    if(c.routeKind!==kind){
      c.routeKind=kind;c.laneDistance=null;
      // To the pickup line: kiosk customers cross the floor along z 5.5, the aisle between the customers ordering at
      // the counters (z 4.9) and the head of the order line (z 6.1); counter customers step back into the same aisle
      // rather than walking along the counter front through the other customers. Everyone then goes down the middle
      // walkway to the line's tail.
      var toPickup=[{x:-.25,z:PICKUP_AISLE_Z},{x:-.25,z:8.15},{x:1.9,z:8.15},{x:1.9,z:8.1}];
      c.waypoints=(kind==='order'||kind==='kiosk')?[route[route.length-1]]:kind==='pickup'?(c.kiosk?[{x:-8,z:6.8-(c.kioskIndex||0)*1.8},{x:-7.4,z:PICKUP_AISLE_Z}].concat(toPickup):[{x:c.x,z:PICKUP_AISLE_Z}].concat(toPickup)):[{x:4,z:4},{x:8.1,z:5},{x:11.15,z:5},{x:11.15,z:-4.3},{x:10.25,z:-5.6},{x:10.25,z:-8.1},{x:7,z:-8.1},{x:-10.5,z:-8.1}];
    }
    while(c.waypoints.length&&budget>0){var point=c.waypoints[0],dx=point.x-c.x,dz=point.z-c.z,distance=Math.hypot(dx,dz),step=Math.min(distance,budget);if(distance>.0001){c.x+=dx/distance*step;c.z+=dz/distance*step}budget-=step;if(distance<=step+.0001)c.waypoints.shift();else break}
    if(!c.waypoints.length){
      if(kind==='exit')c.t=1;
      else{
        if(c.laneDistance===null){c.laneDistance=routeLength(route);if(kind==='pickup'&&!c.pickupTicket)c.pickupTicket=++pickupQueueSequence}
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
    // Behind the rear wall, or outside along the storefront. The exit vestibule past the wall's end (x ≥ 9) stays
    // depth-sorted so leaving guests pass in front of the bollards there.
    return (z < -7.5 && x < 9) || (x < -11.5 && z < 7.5);
  }
  function customerRatings(c){
    var happiness=Math.max(15,Math.min(100,96-(c.waitSeconds||0)*1.2/(1+state.comfortLevel*.2)+(c.bag?18:0)));
    var strain=c.strain===undefined?menuChoice(c.id):c.strain;
    var tolerance=.8+(c.id%5)*.1;
    var potency=(strainPotency(strain)-strains.THC_BASE)*54/16.5;
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
  // Guests slipping through the lounge drapes fade out; guests coming out of its back door fade in.
  function drawFadedCustomer(c,now){
    var t=c.phase==='lounge'?Math.max(0,Math.min(1,(c.loungeFade||0)/.2)):c.loungeFadeIn!==undefined?Math.max(0,Math.min(1,c.loungeFadeIn)):1,alpha=t*t*(3-2*t);
    if(alpha<=0)return;
    if(alpha>=1){drawCustomer(c,now);return}
    ctx.save();ctx.globalAlpha=alpha;drawCustomer(c,now);ctx.restore();
  }
  function drawCustomer(c,now){
    var moving=c.walking;
    if(c.eventGuest||c.kind==='vip'){var guest=project(c.x,.02,c.z);ellipse(guest.x,guest.y,unit*.48,unit*.22,'#dac18b80');}
    if(c.kind==='vip'){var vip=project(c.x,2.6,c.z);ctx.fillStyle='#f0cf7f';ctx.font='bold '+Math.max(9,unit*.25)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.fillText('VIP',vip.x,vip.y)}
    drawPerson(c.x,c.z,now,c.id,moving,false,c.bag,{phase:c.walkPhase||0,amount:c.walkAmount||0,facing:c.facing===undefined?.3:c.facing,lean:c.turnLean||0,pickupAge:c.effectAge});
    if(atOrderCounter(c,state.orderCounters)||c.phase==='pickup'||c.phase==='toPickup'){var p=project(c.x,2.05,c.z);ellipse(p.x,p.y,unit*.2,unit*.18,c.ordered?'#c4e8a7':'#f0dfb0');ctx.fillStyle='#24412f';ctx.font='bold '+Math.max(8,unit*.22)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.fillText(c.ordered?'✓':'…',p.x,p.y+unit*.075);var serviceIndex=c.ordered?5:4;if(!moving&&c.serviceStation===serviceIndex&&c.serviceElapsed>0){var serviceProgress=motionPreference.matches?Math.min(1,c.serviceElapsed*economy.counterLanes(state.lines[serviceIndex])/counterServiceDuration(serviceIndex)):(c.serviceVisual||0);ctx.beginPath();ctx.arc(p.x,p.y,Math.max(5,unit*.26),-Math.PI/2,-Math.PI/2+Math.PI*2*serviceProgress);ctx.strokeStyle=c.ordered?'#d5f3ad':'#f3d294';ctx.lineWidth=Math.max(1.5,unit*.06);ctx.lineCap='round';ctx.stroke();}}
    if(c.thought)drawThought(c);
  }
  function drawThought(c){
    var t=c.thought,reduced=motionPreference.matches,fade=Math.min(1,(t.duration-t.age)/.5);
    var pop=reduced?1:Math.min(1,t.age/.32),scale=pop<1?1-Math.pow(1-pop,3)*.6+Math.sin(pop*Math.PI)*.12:1;
    var drift=reduced?0:Math.sin(t.age*2.2+c.id)*.03,head=project(c.x,2.05,c.z),cloud=project(c.x+.58,2.72+drift,c.z),u=unit*scale;
    ctx.save();ctx.globalAlpha*=fade*Math.min(1,pop*1.6);
    // Two rising puffs lead from the temple to the cloud.
    ellipse(head.x+(cloud.x-head.x)*.22,head.y+(cloud.y-head.y)*.28,u*.055,u*.05,'#ffffff');
    ellipse(head.x+(cloud.x-head.x)*.5,head.y+(cloud.y-head.y)*.62,u*.09,u*.08,'#ffffff');
    var w=u*1.42,h=u*.6,cx=cloud.x,cy=cloud.y-h*.35;
    ctx.shadowColor='rgba(20,40,30,.18)';ctx.shadowBlur=u*.12;ctx.shadowOffsetY=u*.04;
    // One combined path so the overlapping lobes cast a single soft shadow.
    ctx.beginPath();[[-.36,-.02,.3,.24],[-.06,-.1,.34,.28],[.28,-.04,.3,.25],[-.22,.1,.3,.2],[.14,.1,.32,.21],[0,0,.55,.2]].forEach(function(b){ctx.moveTo(cx+b[0]*w+b[2]*w,cy+b[1]*h);ctx.ellipse(cx+b[0]*w,cy+b[1]*h,b[2]*w,b[3]*h*1.6,0,0,Math.PI*2)});
    ctx.fillStyle='#ffffff';ctx.fill();ctx.shadowColor='transparent';
    ctx.fillStyle='#1c2a24';ctx.font=Math.max(11,u*.34)+'px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(t.text,cx,cy+u*.01);
    ctx.restore();
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
    var waiting=customers.filter(inOrderFlow).length;
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
    // The stands first: they are under the belt, so its body goes over them.
    [x1+.2*forward,x2-.2*forward].forEach(function(x){drawBox(x,z,.06,.1,.5,Math.max(.1,y-.25),steel)});
    drawBox(mid,z,y-.18,length,.7,.16,steel);
    drawBox(mid,z,y-.01,length,.5,.035,['#334b40','#24382f','#2a4035']);
    [-.36,.36].forEach(function(dz){worldLine([[x1,y+.09,z+dz],[x2,y+.09,z+dz]],'#b6c7ad',.055)});
    var phase=state.lines[stage]>0&&!motionPreference.matches?crateTime:0;
    for(var slat=0;slat<Math.ceil(length/.23);slat++){
      var t=(slat*.23+phase*.7)%length,x=x1+forward*t;
      worldLine([[x,y+.03,z-.24],[x,y+.03,z+.24]],'#75927a',.035);
    }
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
    // The pack tube drops through the mezzanine at x 0.1, clear of the menu board's price column on the wall behind.
    var port=stage===1?[5.4,9.4,-2]:[.1,4.7,-.3];
    var route=stage===1?[[4.55,10.85,-3],[5.4,10.85,-3],[5.4,10.85,-2],[5.4,6.15,-2],[5.4,6.15,-.3],[4.55,6.15,-.3]]:[[-1.45,6.15,-.3],[.1,6.15,-.3],[.1,1.55,-.3],[4,1.55,-.3],[4,1.55,1.35]];
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
  // Lit sign face: text drawn in the sign's own plane with a bloom, at the exact spot the day pass uses.
  // The night pass re-draws every registered face above the shade.
  var signFaces=[];
  function signText(x,y,z,label,widthUnits,size,color){
    var p=project(x,y,z),axis=project(x+1,y,z);
    ctx.save();ctx.translate(p.x,p.y);ctx.transform(1,(axis.y-p.y)/(axis.x-p.x),0,1,0,0);
    ctx.shadowColor='#ffe8b6';ctx.shadowBlur=unit*.12;ctx.fillStyle=color||'#fff5d9';ctx.font='600 '+Math.max(7,unit*size)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,0,0,widthUnits*unit);ctx.restore();
  }
  // Flat lettering on a wall plane: along x (the default) or along z (`alongZ`) for signs on the side walls. No halo.
  // Split-flap menu board built into the first two shelving bays: an oak surround in the shelves' own timber, a black
  // reveal, and four rows of twenty-one letter flaps — the strains on the menu with their current price. A letter that
  // changes flips over, cycling through the alphabet for a moment and rippling left to right, the way a Solari board
  // rolls; on load the whole board flips in from blank. Letters are only drawn once a flap is wide enough to read.
  // The board stops at y 2.62: from the default view the mezzanine fascia hides the back wall above about 2.65.
  var FLAP_COLS=21,FLAP_ROWS=4,FLAP_ALPHABET='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$ ',flapCells=[],flapSweepAt=0;
  // Every now and then — 40 s to two minutes apart — the board refreshes itself for fun: every flap in turn, letter by
  // letter along each row, rolls through the alphabet and lands back on what it showed.
  function scheduleFlapSweep(now){flapSweepAt=now+40000+Math.random()*80000}
  function flapLines(){
    var lines=[];
    menuStrains().slice(0,FLAP_ROWS).forEach(function(i){
      var value=Math.round(flowerValue(i)),name=STRAINS[i].name.toUpperCase().slice(0,15),price=value<10000?'$'+value:fmt(value);
      while(name.length<FLAP_COLS-price.length)name+=' ';
      lines.push(name+price);
    });
    while(lines.length<FLAP_ROWS)lines.push('');
    return lines.map(function(line){while(line.length<FLAP_COLS)line+=' ';return line.slice(0,FLAP_COLS)});
  }
  function drawMenuBoard(x,z,y0,width,height,now,timber){
    // Set flush into the back wall: the black flap panel sits on the wall's face inside a slim oak trim that stands
    // only a hair proud of it, so nothing overhangs the letters from this camera. The sill and jambs go down before
    // the panel, the head after it, since its lip is in front of the panel's top edge.
    var bar=.07,depth=.1,zMid=z+.16+depth/2,ix=width-bar*2,ih=height-bar*2,iy=y0+bar;
    drawBox(x,zMid,y0,width,depth,bar,timber);
    drawBox(x-width/2+bar/2,zMid,iy,bar,depth,ih,timber);
    drawBox(x+width/2-bar/2,zMid,iy,bar,depth,ih,timber);
    drawBox(x,z+.16,iy,ix,.05,ih,['#1a1e20','#0b0e10','#131617']);
    var lines=flapLines(),reduced=motionPreference.matches,padX=.1,padY=.06;
    if(!flapSweepAt)scheduleFlapSweep(now);
    var sweep=!reduced&&now>=flapSweepAt&&flapCells.length===FLAP_COLS*FLAP_ROWS;
    if(sweep)scheduleFlapSweep(now);
    var cellW=(ix-padX*2)/FLAP_COLS,pitch=(ih-padY*2)/FLAP_ROWS,cellH=pitch*.82;
    var mid=iy+ih/2,p=project(x,mid,z+.215),axis=project(x+1,mid,z+.215),ux=axis.x-p.x;
    var cw=cellW*ux*.9,ch=cellH*unit,letters=cw>=4;
    ctx.save();ctx.translate(p.x,p.y);ctx.transform(1,(axis.y-p.y)/(axis.x-p.x),0,1,0,0);
    if(letters){ctx.font='800 '+(ch*1.02)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle'}
    for(var row=0;row<FLAP_ROWS;row++){
      var v=-(iy+ih-padY-pitch*(row+.5)-mid)*unit;
      for(var col=0;col<FLAP_COLS;col++){
        var index=row*FLAP_COLS+col,target=lines[row][col],cell=flapCells[index]||(flapCells[index]={ch:' ',flip:0,to:' '});
        if(cell.ch!==target&&!cell.flip){cell.flip=now+col*18;cell.to=target}
        else if(sweep&&!cell.flip){cell.flip=now+index*16;cell.to=cell.ch}
        var shown=cell.ch,flipping=false;
        if(cell.flip){var t=(now-cell.flip)/420;if(t>=1||reduced){cell.ch=cell.to;cell.flip=0;shown=cell.ch}else if(t>0){flipping=true;shown=FLAP_ALPHABET[Math.floor(now/55+index)%FLAP_ALPHABET.length]}}
        var u=(col-(FLAP_COLS-1)/2)*cellW*ux;
        ctx.fillStyle='#363c3e';ctx.fillRect(u-cw/2,v-ch/2,cw,ch/2);
        ctx.fillStyle='#2b3133';ctx.fillRect(u-cw/2,v,cw,ch/2);
        if(letters&&shown!==' '){ctx.fillStyle=flipping?'#b9b2a0':'#efe4c8';ctx.fillText(shown,u,v)}
        ctx.fillStyle=flipping?'#5a6264':'#0d1113';ctx.fillRect(u-cw/2,v-.5,cw,Math.max(1,ch*.05));
      }
    }
    ctx.restore();
    drawBox(x,zMid,y0+height-bar,width,depth,bar,timber);
  }
  function wallText(x,y,z,label,maxWidth,size,color,alongZ,weight){
    var p=project(x,y,z),axis=alongZ?project(x,y,z-1):project(x+1,y,z);
    ctx.save();ctx.translate(p.x,p.y);ctx.transform(1,(axis.y-p.y)/(axis.x-p.x),0,1,0,0);
    ctx.fillStyle=color;ctx.font=(weight||'800')+' '+Math.max(5,unit*size)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,0,0,maxWidth);ctx.restore();
  }
  // Marquee lightbox over the storefront glazing: a slim steel fascia carrying two full-length backlit bars — a cream bar
  // with forest-green block lettering above, a solid green bar with cream lettering below, a hairline between them and
  // the cream carried over the top — the way a modern dispensary fascia reads. It runs the length of the entrance wall
  // between the door's pilaster and a rear one. `emissive` redraws only the lit bars and lettering, for the pass above
  // the night tint. The rear pilaster is drawn separately, sorted at its own depth, because the kiosk row stands in
  // front of it.
  // The fascia is as deep as the door header, sits directly on the glazing's top rail, and starts flush with the outer
  // edge of the door's front post so the sign reads as one piece with the entrance.
  // The return is as slim as the corner window's rail and runs to the steel post, which closes its end.
  // The corner is a clean L: the return's box starts on the wall run's face plane (never inside it), the two top faces
  // meet at that plane, and both rows of panels stop a hairline short of the shared vertical edge so a thin steel line
  // marks the corner exactly like the dividers between panels. The return dies into the steel post, drawn over it.
  // The marquee runs straight along the storefront between two pilasters; there is no return round the corner, so
  // the floor behind the last bay stays open for the lounge's forecourt.
  var MARQUEE={x:-10.65,zFront:11.07,zRear:2.59,y0:3.6,y1:4.4,depth:.26,pilaster:11.2,rearPilaster:2.46,
    top:['FLOWER','PRE-ROLLS','EDIBLES','HOUSE GROWN'],bottom:['OPEN 7 DAYS','WALK-IN','PICKUP','DELIVERY']};
  function drawMarquee(emissive){
    var m=MARQUEE,steel=['#33372f','#14181a','#23292a'],cream='#f4e7bd',green='#1f4a37',ink='#193b2b';
    var face=m.x+m.depth/2,segments=m.top.length,len=(m.zFront-m.zRear)/segments;
    var seam=.02,rowH=(m.y1-m.y0-seam)/2,botY0=m.y0,botY1=botY0+rowH,topY0=botY1+seam,topY1=m.y1;
    function bar(y0,y1,fill){
      var q=[project(face,y0,m.zFront),project(face,y0,m.zRear),project(face,y1,m.zRear),project(face,y1,m.zFront)];
      if(emissive&&fill===cream){var mid=project(face,(y0+y1)/2,(m.zFront+m.zRear)/2);glow(mid.x,mid.y,Math.abs(q[1].x-q[0].x)*.55,'#ffe9b03a',unit*rowH*1.3)}
      poly(q,fill);
    }
    if(!emissive){
      // The fascia and the door's pilaster flush with its front end.
      drawBox(m.x,(m.zFront+m.zRear)/2,m.y0,m.depth,m.zFront-m.zRear,m.y1-m.y0,steel);
      drawBox(m.x,m.pilaster,0,m.depth,m.depth,m.y1,steel);
    }
    bar(topY0,topY1,cream);bar(botY0,botY1,green);
    for(var i=0;i<segments;i++){
      var z0=m.zFront-i*len,z1=m.zFront-(i+1)*len;
      // A hairline divider between neighbouring words on both bars.
      if(i)worldLine([[face+.005,m.y0,z0],[face+.005,m.y1,z0]],'#14181a',.022);
      var maxW=Math.abs(project(face,0,z1).x-project(face,0,z0).x)*.7;
      wallText(face+.01,(topY0+topY1)/2,(z0+z1)/2,m.top[i],maxW,rowH*.46,ink,true);
      wallText(face+.01,(botY0+botY1)/2,(z0+z1)/2,m.bottom[i],maxW,rowH*.4,cream,true);
    }
  }
  function drawMarqueeRearPilaster(){var m=MARQUEE;drawBox(m.x,m.rearPilaster,0,m.depth,m.depth,m.y1,['#33372f','#14181a','#23292a'])}
  // Frosted globe pendants on slim brass rods under the mezzanine soffit, a soft pool on the floor beneath each.
  function globePendant(x,z,soffitY){
    var globeY=soffitY-1.05,canopy=project(x,soffitY-.02,z),g=project(x,globeY,z);
    ellipse(canopy.x,canopy.y,unit*.11,unit*.055,'#b7a16d');
    worldLine([[x,soffitY-.02,z],[x,globeY+.3,z]],'#c9ab6a',.028);
    glow(g.x,g.y,unit*.85,'#ffe9bb60',unit*.85);
    // A frosted sphere rather than a flat disc: amber rim, cream body, an upper-left bloom and a small specular.
    litEllipse(g.x,g.y,unit*.31,unit*.31,'#e9cd9c');
    litEllipse(g.x-unit*.025,g.y-unit*.035,unit*.275,unit*.27,'#fff3d2');
    litEllipse(g.x-unit*.08,g.y-unit*.1,unit*.165,unit*.15,'#fffdf0');
    litEllipse(g.x-unit*.105,g.y-unit*.125,unit*.065,unit*.05,'#ffffff');
    var floor=project(x,.02,z);glow(floor.x,floor.y,unit*1.3,'#ffe6b022',unit*.6);
  }
  function archedServiceSign(x,label,compact){
    var z=3.75,half=compact?1.16:1.95,spring=compact?2.45:2.7,rise=compact?.72:1.25;
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
    worldLine(arch,'#6a654e',.2);worldLine(arch,'#bda979',.12);warmStrip(arch.map(function(p){return [p[0],p[1]-.07,p[2]+.07]}),false,'face');
    var y=compact?2.72:3.35,w=compact?1.76:2.55,h=compact?.43:.55;
    var halo=project(x,y+h*.5,z);glow(halo.x,halo.y,unit*1.65,'#ffdb9460');
    drawBox(x,z,y,w,.16,h,['#aa9568','#203f31','#2d503c']);
    warmStrip([[x-w/2+.03,y+h-.025,z+.095],[x+w/2-.03,y+h-.025,z+.095]],false,'face');
    worldLine([[x-w/2+.07,y+.06,z+.09],[x+w/2-.07,y+.06,z+.09]],'#c9b77e',.025);
    signText(x,y+h*.45,z+.1,label,w*.64,.27);
    signFaces.push({x:x,y:y+h*.45,z:z+.1,label:label,width:w*.64,size:.27,halo:1.4});
  }
  // Backlit LED readout: the panel itself emits a teal glow, the text blooms over it. Drawn in the day pass and again above the night shade.
  function onlineReadout(x,faceZ,pending,ready){
    var tone=ready?'#9fe07a':'#7fd2c2',c=parseHex(tone);
    ctx.save();ctx.globalCompositeOperation='screen';
    var p0=project(x-.9,.4,faceZ+.048),p1=project(x+.9,.4,faceZ+.048),p2=project(x+.9,.8,faceZ+.048),p3=project(x-.9,.8,faceZ+.048);
    poly([p0,p1,p2,p3],planeGradient(p3,p2,p0,[[0,rgba(c,.34)],[1,rgba(c,.16)]]));
    ctx.restore();
    var spill=project(x,.6,faceZ+.05);glow(spill.x,spill.y,unit*1.3,tone+'3a',unit*.6);
    var disp=project(x,.62,faceZ+.05),dAxis=project(x+1,.62,faceZ+.05),frameWidth=Math.abs(project(x+.93,.62,faceZ+.05).x-project(x-.93,.62,faceZ+.05).x)*.86;
    ctx.save();ctx.translate(disp.x,disp.y);ctx.transform(1,(dAxis.y-disp.y)/(dAxis.x-disp.x),0,1,0,0);
    ctx.shadowColor=ready?'#b7e394':'#9ed6c8';ctx.shadowBlur=unit*.1;ctx.fillStyle=ready?'#d9f7c4':'#d2f2ea';ctx.font='600 '+Math.max(6,unit*.16)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(pending+(pending===1?' ORDER':' ORDERS')+' · '+state.stock[3]+' JARS',0,0,frameWidth);ctx.restore();
  }
  function onlinePackingCounter(now,previewOnly){
    var x=-10.7,z=1.5,oak=['#cbb085','#7f6a4b','#ac9168'],green=['#86a795','#3e6250','#648a70'];
    if(!deliveryBuilt()&&!previewOnly){onlineCounterSite(now,x,z,oak);return}
    // Cantilevered launch deck, attached to the rear sign supports.
    var padZ=z-2.25,steel=['#526659','#253b30','#3a5142'];
    // A tie beam under the deck meets the mezzanine edge so the cantilever reads as attached.
    [-1.2,1.2].forEach(function(dx){
      drawBox(x+dx,z-1.05,.02,.12,.14,3.04,steel);
      worldLine([[x+dx,2.05,z-1.05],[x+dx,2.96,padZ-.65]],'#304638',.09);
    });
    drawBox(x+.85,padZ,2.86,1.9,.14,.1,steel);
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
    // Packed boxes waiting for dispatch, the same packs that ride the tube, kept clear of the sign posts.
    for(var n=0;n<3;n++)transportItem(x-.62+n*.42,1.15,z-.3,3);
    warmStrip([[x-1.45,.18,z+.84],[x+1.45,.18,z+.84]],false);
    // Shipping carton, tape dispenser, label printer, and a small order monitor.
    carton(x+.8,z+.2,1.15,.7);
    drawBox(x+.8,z+.2,1.61,.13,.54,.025,['#efddb0','#b8a075','#d9c493']);
    drawBox(x-1,z+.5,1.15,.4,.35,.25,['#e8e4d4','#929c8b','#bac6b2']);
    drawBox(x-.9,z+.75,1.25,.23,.32,.025,['#faf6e5','#faf6e5','#faf6e5']);
    drawBox(x+.85,z-.6,1.15,.75,.14,.6,green);
    litBox(x+.85,z-.515,1.28,.58,.025,.35,['#badabb','#badabb','#badabb']);
    for(var n=0;n<2;n++)carton(x+1.6,z-.8+n*.6,.02,.48);
    // Oak-framed fascia integrated into the packing counter's rear uprights.
    [-1.48,1.48].forEach(function(dx){drawBox(x+dx,z-.78,1.13,.1,.12,1.75,oak)});
    var onlineHalo=project(x,2.56,z-.65);glow(onlineHalo.x,onlineHalo.y,unit*1.8,'#ffdb9450');
    drawBox(x,z-.78,2.25,3.15,.18,.65,oak);
    warmStrip([[x-1.48,2.88,z-.65],[x+1.48,2.88,z-.65]],false);
    drawBox(x,z-.674,2.31,2.97,.025,.51,['#355d49','#294836','#355d49']);
    worldLine([[x-1.4,2.29,z-.64],[x+1.4,2.29,z-.64]],'#ecd39c',.027);
    signText(x,2.55,z-.64,'ONLINE ORDERS',2.3,.235);
    if(!previewOnly)signFaces.push({x:x,y:2.55+sceneElevation,z:z-.64,label:'ONLINE ORDERS',width:2.3,size:.235,halo:1.4});
    var status=project(x+.85,1.5,z-.49);ellipse(status.x,status.y,unit*.065,unit*.065,state.stock[3]>=onlineSize()?'#b7e394':'#d7b775');
    
    // Shelf-edge display set into the counter front: orders waiting against jars on hand, with a fill line for how much of the queue can ship.
    var faceZ=z+.9,pending=onlineRequestsReady(),needed=pending?onlineBatch(pending,Infinity).jars:0,ready=pending>0&&state.stock[3]>=onlineSize();
    drawBox(x,faceZ+.02,.34,1.9,.04,.5,['#1d3a2c','#12281e','#183224']);
    worldLine([[x-.93,.36,faceZ+.045],[x+.93,.36,faceZ+.045],[x+.93,.82,faceZ+.045],[x-.93,.82,faceZ+.045],[x-.93,.36,faceZ+.045]],'#a9d2c855',.02);
    // The readout is measured against the frame's projected width so it always sits inside the black surround.
    if(previewOnly)signText(x,.62,faceZ+.05,'DISPATCH',1.5,.16,'#cce8c4');else onlineReadout(x,faceZ,pending,ready);
    worldLine([[x-.78,.45,faceZ+.05],[x+.78,.45,faceZ+.05]],'#0d1f17',.07);
    var fill=pending?Math.min(1,state.stock[3]/Math.max(1,needed)):0;if(fill>0)worldLine([[x-.78,.45,faceZ+.05],[x-.78+1.56*fill,.45,faceZ+.05]],ready?'#b7e394':'#a9d2c8',.05);
    // Its own feed branch carries packed jars from the packing station.
    if(!previewOnly)transferTube([[-4.55,-.9,1],[-7.4,-.9,1],[-7.4,1.5,1.5],[-9.05,1.5,1.5]],3);
  }
  // Before the delivery pad is bought the mezzanine corner is a building site: bare deck, taped-off perimeter,
  // a sheeted counter, stacked materials and an unlit COMING SOON board where the sign will go.
  function onlineCounterSite(now,x,z,oak){
    var padZ=z-2.25,steel=['#526659','#253b30','#3a5142'],ply=['#d9c39a','#8a7250','#b89a6c'],sheet=['#d8dad2','#9a9f97','#bfc3ba'],hazard=['#e8c85a','#8c7420','#c6a93f'];
    [-1.2,1.2].forEach(function(dx){drawBox(x+dx,z-1.05,.02,.12,.14,3.04,steel);worldLine([[x+dx,2.05,z-1.05],[x+dx,2.96,padZ-.65]],'#304638',.09)});
    drawBox(x+.85,padZ,2.86,1.9,.14,.1,steel);
    drawBox(x,padZ,2.96,3.25,2.6,.16,steel);
    // Deck plates still being laid: two down, one leaning, the rest stacked.
    drawBox(x-.8,padZ+.6,3.12,1.4,1.1,.025,['#779080','#779080','#779080']);drawBox(x+.7,padZ+.6,3.12,1.4,1.1,.025,['#779080','#779080','#779080']);
    drawBox(x+.9,padZ-.55,3.12,1.1,.9,.16,['#6e8676','#3c5246','#55695c']);
    // Barrier posts with tape around the deck edge.
    var posts=[[-1.45,-1.15],[1.45,-1.15],[1.45,1.15],[-1.45,1.15]];
    posts.forEach(function(q){drawBox(x+q[0],padZ+q[1],3.12,.09,.09,.62,hazard);drawBox(x+q[0],padZ+q[1],3.12,.22,.22,.04,['#2b2f2a','#15181a','#202422'])});
    for(var k=0;k<4;k++){var a=posts[k],b=posts[(k+1)%4];worldLine([[x+a[0],3.62,padZ+a[1]],[x+b[0],3.62,padZ+b[1]]],'#e8c85a',.035);worldLine([[x+a[0],3.5,padZ+a[1]],[x+b[0],3.5,padZ+b[1]]],'#1a1c19',.035)}
    var cone=project(x-.9,3.12,padZ-.7);drawBox(x-.9,padZ-.7,3.12,.28,.28,.03,['#e2622f','#8f3a1a','#c24d24']);drawBox(x-.9,padZ-.7,3.15,.14,.14,.42,['#ee7a3f','#9c4020','#d3612f']);drawBox(x-.9,padZ-.7,3.3,.16,.16,.06,['#f4f0e4','#b9b4a6','#dcd7c8']);
    drawBox(x,z,-.24,4.4,3.8,.24,oak);
    // Counter carcass in raw plywood under a dust sheet, sawhorse and materials beside it.
    drawBox(x,z,.05,2.9,1.8,.95,ply);drawBox(x,z+.05,.98,3.2,2.05,.12,sheet);drawBox(x-.3,z+.3,1.1,2.2,1.2,.05,sheet);
    drawBox(x+1.5,z+.9,.02,.5,.9,.7,['#b59a6e','#6e5a3c','#93794f']);drawBox(x+1.5,z+.9,.72,.7,1,.06,ply);
    // Flat, aligned boards rest on the deck in front of the counter, held together by two straps.
    for(var n=0;n<3;n++)drawBox(x-1.14,z+1.26,.02+n*.08,1.12,.46,.08,n%2?ply:['#c9b48a','#7c6646','#a88a5e']);
    [-.32,.32].forEach(function(dx){drawBox(x-1.14+dx,z+1.26,.26,.045,.47,.012,steel);drawBox(x-1.14+dx,z+1.498,.02,.045,.012,.24,steel)});
    // Sign board mounted, but unlit and blank: a paper notice hangs across it.
    [-1.48,1.48].forEach(function(dx){drawBox(x+dx,z-.78,1.13,.1,.12,1.75,oak)});
    drawBox(x,z-.78,2.25,3.15,.18,.65,oak);
    drawBox(x,z-.674,2.31,2.97,.025,.51,['#26382f','#1b2a22','#26382f']);
    drawBox(x,z-.66,2.36,2.2,.02,.4,['#efe7cf','#c8bf9f','#e2d9bd']);
    signText(x,2.55,z-.64,'COMING SOON',1.9,.2,'#5a5d4c');
    // Loose worktop props draw after the rear sign uprights so those posts cannot cut through the cartons.
    // The first carton sits on the dust sheet; the smaller one sits on its taped lid.
    var cartonBase=1.15,cartonSize=.54;
    carton(x-.77,z+.08,cartonBase,cartonSize);carton(x-.8,z+.07,cartonBase+cartonSize*.65+.018,.44);
    drawBox(x+.95,z-.55,1.1,.3,.5,.25,['#8e8f87','#4d4f49','#6c6e67']);
  }
  // A guest coming out of the lounge's back door is behind the cream column from this camera until they have walked
  // clear of it (x 9.5), so until then they are painted here, just before the column, rather than as a sorted job.
  function leaverBehindColumn(c){return c.lounge&&c.phase==='leaving'&&c.x<9.5&&c.z>-4.6}
  function retailDetails(fi,rear,now){
    var oak=['#cfb184','#836949','#b09266'],stone=['#e2dfd0','#969c8e','#c3c8b8'],brass=['#d7c28b','#8c774c','#b7a16c'];
    if(fi===0){
      customers.forEach(function(c){
        if(!leaverBehindColumn(c))return;
        var v=Object.assign({},c,{x:c.renderX===undefined?c.x:c.renderX,z:c.renderZ===undefined?c.z:c.renderZ});
        if(c.loungeFadeIn!==undefined&&c.loungeFadeIn<1)drawGuestThroughDrapes(v,now,true);else drawFadedCustomer(v,now);
      });
      // Cream columns with forest-green tile bases and brass wall sconces.
      [9.8].forEach(function(cx){
        var cz=-1.8;
        // Tiled base, its cap, then the shaft rising from the cap, so the cap reads as a lip around the shaft's foot
        // rather than a slab painted across it.
        drawBox(cx,cz,.08,.78,.73,1.65,['#37634d','#153c2d','#25523b']);
        for(var tile=0;tile<5;tile++)worldLine([[cx-.36+tile*.18,.1,cz+.375],[cx-.36+tile*.18,1.72,cz+.375]],'#d7d7b4',.016);
        for(var grout=0;grout<5;grout++)worldLine([[cx-.38,.1+grout*.4,cz+.38],[cx+.38,.1+grout*.4,cz+.38]],'#d7d7b4',.016);
        // The same grid continues around the right face.
        for(var tile=0;tile<4;tile++)worldLine([[cx+.395,.1,cz-.27+tile*.18],[cx+.395,1.72,cz-.27+tile*.18]],'#d7d7b4',.016);
        for(var grout=0;grout<5;grout++)worldLine([[cx+.395,.1+grout*.4,cz-.365],[cx+.395,.1+grout*.4,cz+.365]],'#d7d7b4',.016);
        drawBox(cx,cz+.01,1.73,.8,.76,.12,['#e1dbc0','#b5b29d','#d8d2b8']);
        drawBox(cx,cz,1.85,.75,.7,2.4,['#f2edda','#c1bdac','#e1ddca']);
        var lamp=project(cx,2.6,cz+.42);ellipse(lamp.x,lamp.y,unit*.17,unit*.3,'#c4aa70');ellipse(lamp.x,lamp.y,unit*.12,unit*.24,'#fff2c8');
      });
    }
    // A layered backlit merchandise bay on the top floor's rear wall. The ground floor's, seen through the stair
    // flight beside the cream column, is gone.
    var bx=fi===0?6:fi===1?3:-4.6;
    if(fi===2){
    drawBox(bx,rear+.35,.1,2.3,.55,2.6,oak);
    for(var row=0;row<3;row++){
      drawBox(bx,rear+.65,.48+row*.72,2.35,.7,.07,brass);
      litLine([[bx-1.05,.57+row*.72,rear+.97],[bx+1.05,.57+row*.72,rear+.97]],'#ffe6ae',.028);
      for(var product=0;product<6;product++){
        var color=['#92ad8b','#d5bd8c','#b1c6c1'][product%3];
        drawBox(bx-.95+product*.38,rear+.66,.56+row*.72,.25,.25,.27+(product%2)*.12,[color,'#65765e',color]);
        drawBox(bx-.95+product*.38,rear+.798,.65+row*.72,.15,.012,.1,['#f4efd8','#f4efd8','#f4efd8']);
      }
    }
    }
    // A playful arch boutique on the open side wall of the processing floor.
    if(fi===1){
      // The arch alcove sits at the rear of the side wall; the front of that wall carries the stairs to the online-orders deck.
      // One arch alcove at the rear of the side wall; the deck stairs occupy the front of it.
      var ax=-8.75;
      for(var alcove=0;alcove<1;alcove++){
        var zz=-4.85,shape=[];
        shape.push(project(ax,.15,zz-1));shape.push(project(ax,2.3,zz-1));
        for(var arc=0;arc<=16;arc++){var t=Math.PI-arc/16*Math.PI;shape.push(project(ax,2.3+Math.sin(t),zz+Math.cos(t)))}
        shape.push(project(ax,.15,zz+1));poly(shape,'#d3a888','#62796f');
        var frame=[];frame.push([ax,.15,zz-1]);frame.push([ax,2.3,zz-1]);
        for(var arc=0;arc<=20;arc++){var t=Math.PI-arc/20*Math.PI;frame.push([ax,2.3+Math.sin(t),zz+Math.cos(t)])}
        frame.push([ax,.15,zz+1]);worldLine(frame,'#859c94',.13);
        for(var shelf=0;shelf<3;shelf++){
          drawBox(ax+.25,zz,.5+shelf*.7,.55,1.8,.08,['#ecdbc1','#a58d72','#cfb79a']);
          // Nine display positions represent the current packed-jar capacity.
          var filledSlots=Math.min(9,state.stock[3]/storageCapacity()*9);
          for(var item=0;item<3;item++){
            var slot=shelf*3+item,fill=Math.max(0,Math.min(1,filledSlots-slot));
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
      // A rounded terracotta display plinth offers a splash of color; it sorts with the counters and customers.
      sceneJobs.push({depth:depthOf({x:9.85,z:2.9}),draw:function(){sceneElevation=0;drawBox(9.85,2.9,0,1.15,1.1,.7,['#dba588','#966955','#be8b70']);plant(9.85,2.9,.72,.75)}});
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
        // One continuous oak plank floor: long boards run front to back, with staggered end joints and a faint grain.
        var rear=floor.z-floor.d/2,front=floor.z+floor.d/2,left=-floor.w/2,right=floor.w/2;
        drawBox(0,floor.z,-.24,floor.w,floor.d,.24,['#c9a97e','#7f6446','#a68a62']);
        // Herringbone oak: columns of boards laid at alternating 45° angles, three tones of the same plank, fine joints.
        ctx.save();ctx.beginPath();[project(left,.012,rear),project(right,.012,rear),project(right,.012,front),project(left,.012,front)].forEach(function(q,i){i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y)});ctx.closePath();ctx.clip();
        var colW=1.15,step=.56,tones=['#00000009','#ffffff0b','#00000004'];
        for(var col=0,x0=left;x0<right;col++,x0+=colW){
          var x1=Math.min(right,x0+colW),dir=col%2?-1:1,k=0;
          // Strips z = dir·x + b: the b range that spans the whole column differs by direction.
          var bMin=(dir>0?rear-x1:rear+x0)-step,bMax=(dir>0?front-x0:front+x1)+step;
          for(var b=bMin;b<bMax;b+=step,k++){
            var za=dir*x0+b,zb=dir*x1+b;
            poly([project(x0,.012,za),project(x1,.012,zb),project(x1,.012,zb+step),project(x0,.012,za+step)],tones[(k+col)%3]);
            worldLine([[x0,.014,za],[x1,.014,zb]],'#6d543a2e',.014);
          }
          worldLine([[x1,.015,rear],[x1,.015,front]],'#6d543a22',.012);
        }
        ctx.restore();
    }
  }

  function drawGrowExhaustFan(x,z,y){
    var faceZ=z+.13,center=project(x,y,faceZ);
    if(center.x+unit*1.5<0||center.x-unit*1.5>width||center.y+unit*1.6<0||center.y-unit*1.6>height)return;
    // The housing and rotor share the rear wall's plane, including its isometric shear.
    poly([project(x-1.25,y-1.26,z-.02),project(x+1.3,y-1.26,z-.02),project(x+1.3,y+1.18,z-.02),project(x-1.25,y+1.18,z-.02)],'#15241c48');
    drawBox(x,z,y-1.18,2.36,.24,2.36,['#a8b6a6','#647a6c','#7f9686']);
    var across=project(x+1,y,faceZ),down=project(x,y-1,faceZ);
    ctx.save();ctx.transform(across.x-center.x,across.y-center.y,down.x-center.x,down.y-center.y,center.x,center.y);
    ctx.fillStyle='#718779';ctx.fillRect(-1.1,-1.1,2.2,2.2);
    var metal=ctx.createLinearGradient(-1,-1,1,1);metal.addColorStop(0,'#d6dfcf');metal.addColorStop(.45,'#93a99a');metal.addColorStop(1,'#526b5c');
    ctx.beginPath();ctx.arc(0,0,1.055,0,Math.PI*2);ctx.fillStyle=metal;ctx.fill();
    ctx.beginPath();ctx.arc(0,0,.96,0,Math.PI*2);ctx.fillStyle='#1d3028';ctx.fill();
    ctx.beginPath();ctx.arc(0,.035,.88,0,Math.PI*2);ctx.fillStyle='#30483a';ctx.fill();
    // One revolution per 26 seconds at 1x; sceneTime already respects pause and reduced motion.
    ctx.save();ctx.rotate(sceneTime*Math.PI*2/26000);
    for(var blade=0;blade<4;blade++){
      ctx.save();ctx.rotate(blade*Math.PI/2);
      ctx.beginPath();ctx.moveTo(.12,-.07);ctx.bezierCurveTo(.32,-.48,.71,-.64,.87,-.31);ctx.bezierCurveTo(1.01,-.03,.76,.38,.56,.34);ctx.bezierCurveTo(.39,.3,.38,.08,.12,.09);ctx.closePath();
      var finish=ctx.createLinearGradient(.15,-.42,.7,.3);finish.addColorStop(0,'#d0ddca');finish.addColorStop(.48,'#a6baa5');finish.addColorStop(1,'#668676');ctx.fillStyle=finish;ctx.fill();
      ctx.beginPath();ctx.moveTo(.25,-.1);ctx.bezierCurveTo(.47,-.39,.73,-.47,.84,-.3);ctx.strokeStyle='#e1ead466';ctx.lineWidth=.022;ctx.stroke();ctx.restore();
    }
    ctx.restore();
    // Fixed wire guard: sparse enough that the slow-moving blades remain readable.
    ctx.strokeStyle='#bac9b37a';ctx.lineWidth=.014;
    [.38,.65,.9].forEach(function(r){ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.stroke()});
    for(var spoke=0;spoke<8;spoke++){var a=spoke*Math.PI/4;ctx.beginPath();ctx.moveTo(Math.cos(a)*.18,Math.sin(a)*.18);ctx.lineTo(Math.cos(a)*.95,Math.sin(a)*.95);ctx.stroke()}
    ctx.beginPath();ctx.arc(0,0,.2,0,Math.PI*2);ctx.fillStyle=metal;ctx.fill();
    ctx.beginPath();ctx.arc(-.035,-.035,.07,0,Math.PI*2);ctx.fillStyle='#dce6d2';ctx.fill();
    [-1,1].forEach(function(sx){[-1,1].forEach(function(sy){ctx.beginPath();ctx.arc(sx*1.015,sy*1.015,.035,0,Math.PI*2);ctx.fillStyle='#394f42';ctx.fill();ctx.beginPath();ctx.moveTo(sx*1.015-.017,sy*1.015);ctx.lineTo(sx*1.015+.017,sy*1.015);ctx.strokeStyle='#c8d4c1';ctx.lineWidth=.009;ctx.stroke()})});
    ctx.restore();
  }
  // The purple grow bars over the top-floor benches are bought in the Shop (the Grow lights component): none until the
  // first level, then the two over the Grow bench, a third over Seeds, and all four from level three.
  function growLightBars(){var level=state.growBatchLevel||0;return level<=0?[]:level===1?[2.25,3.75]:level===2?[-2.25,2.25,3.75]:[-3.75,-2.25,2.25,3.75]}
  // Grow-room lighting gantry, drawn after the benches so the bars always sit above them.
  function drawGrowGantry(part){
    // Lighting gantry: posts are painted before the benches so their feet sit behind the counters; the beam and bars come after.
    var beamY=3.85,beamZ=-3.55,metal=['#414440','#191e1c','#2b302d'],bars=growLightBars();
    if(!bars.length)return;
    if(part==='posts'){[-5.4,5.4].forEach(function(px){drawBox(px,beamZ,0,.12,.12,beamY,metal)});return}
    drawBox(0,beamZ,beamY,10.9,.14,.12,metal);
    // Two bars per bench, hung across the beam so they run front to back over the Seeds and Grow stations.
    bars.forEach(function(lx,li){
      var barY=3.25,barZ=beamZ+.55;
      [-.85,.85].forEach(function(dz){worldLine([[lx,beamY,beamZ],[lx,barY+.12,barZ+dz]],'#2a302d',.022)});
      drawBox(lx,barZ,barY,.5,2.3,.13,['#3c4146','#1d2124','#2b3034']);
      litLine([[lx-.12,barY-.005,barZ-1.1],[lx-.12,barY-.005,barZ+1.1]],'#e7b8ff',.045);litLine([[lx+.12,barY-.005,barZ-1.1],[lx+.12,barY-.005,barZ+1.1]],'#e7b8ff',.045);
      ctx.save();ctx.globalAlpha=.22;litLine([[lx,barY-.03,barZ-1.1],[lx,barY-.03,barZ+1.1]],'#c98bff',.5);ctx.restore();
      var pulse=lampPulse(sceneTime,li*1.7),under=project(lx,barY-.1,barZ);glow(under.x,under.y,unit*1.4,'#c47cff30');
      lightCone(lx,barY-.06,barZ,.03,.32,1.05,'#c98bff',.13*pulse);
      var floorWash=project(lx,.03,barZ);glow(floorWash.x,floorWash.y,unit*1.7,'#be78ff26',unit*1.1);
    });
  }
  // A wall in the grow room's style: forest-green plaster with dark timber slats to dado height under a timber rail.
  // `alongZ` runs it along z with its face toward +x from the plane x; otherwise along x with its face toward +z.
  function drawSlattedWall(alongZ,plane,a0,a1,height,finish){
    var slatTop=2.2,face=plane+.1,rail=['#c8ab7c','#7d6748','#a58a5f'];
    if(alongZ)drawBox(plane,(a0+a1)/2,0,.18,a1-a0,height,finish);else drawBox((a0+a1)/2,plane,0,a1-a0,.18,height,finish);
    for(var t=a0+.25;t<a1-.1;t+=.24){
      worldLine(alongZ?[[face,.05,t],[face,slatTop,t]]:[[t,.05,face],[t,slatTop,face]],'#4d6a58',.05);
      worldLine(alongZ?[[face,.05,t+.075],[face,slatTop,t+.075]]:[[t+.075,.05,face],[t+.075,slatTop,face]],'#22382d',.018);
    }
    if(alongZ)drawBox(plane+.02,(a0+a1)/2,slatTop,.1,a1-a0,.09,rail);else drawBox((a0+a1)/2,plane+.02,slatTop,a1-a0,.1,.09,rail);
  }
  var sceneJobs=[];
  function drawTower(now){
    sceneElevation=0;signFaces.length=0;
    // Backdrop: the same quiet studio gradient day and night, a halo behind the shop and a vignette at the edges. After
    // dark the gradient deepens and cools and the halo turns into the building's own spill, while the diorama is
    // painted on its own surface so the night light map can be multiplied over the building alone.
    var nt=nightAmount();render.nightT=nt;
    var sky=ctx.createLinearGradient(0,0,0,height);sky.addColorStop(0,mixHex('#3a433c','#131b1e',nt));sky.addColorStop(.5,mixHex('#4a544a','#1a2427',nt));sky.addColorStop(1,mixHex('#333b34','#0e1417',nt));ctx.fillStyle=sky;ctx.fillRect(0,0,width,height);
    var halo=project(0,0,1);
    if(nt<1){ctx.save();ctx.globalAlpha=1-nt;glow(halo.x,halo.y-unit*4,unit*24,'#98a88626');ctx.restore()}
    if(nt>0){ctx.save();ctx.globalAlpha=nt;glow(halo.x,halo.y-unit*4,unit*22,'#4b6a6a34');ctx.restore()}
    var vignette=ctx.createRadialGradient(width/2,height/2,0,width/2,height/2,Math.max(width,height)*.8);vignette.addColorStop(0,'rgba(18,26,20,0)');vignette.addColorStop(.4,'rgba(18,26,20,.05)');vignette.addColorStop(.7,'rgba(18,26,20,.22)');vignette.addColorStop(1,'rgba(18,26,20,.48)');ctx.fillStyle=vignette;ctx.fillRect(0,0,width,height);
    // Depth in the void: a vast soft lift toward the key light's corner and a cooler settle low on the left,
    // anchored to the world so they drift with the pan, so the field behind the diorama reads as atmosphere.
    var lift=project(15,7,-9),liftC=parseHex(mixHex('#93a184','#31404b',nt));
    ellipse(lift.x,lift.y,unit*27,unit*16,softRadial(lift.x,lift.y,unit*27,liftC,.09));
    var settle=project(-17,0,13),settleC=parseHex(mixHex('#1e2b24','#0c1216',nt));
    ellipse(settle.x,settle.y,unit*21,unit*13,softRadial(settle.x,settle.y,unit*21,settleC,.14));
    var stone=['#c9c7b5','#737c70','#9fa796'],wood=['#bc9d73','#6f5943','#998063'],green=['#698775','#314b40','#496a56'],metal=['#414440','#191e1c','#2b302d'];
    // Contact shadow: one soft radial pool under the slab, biased toward the front-left, with no polygon edges to read as lines.
    var pool=project(0,-.33,1),shadowGradient=ctx.createRadialGradient(pool.x-unit*1.4,pool.y+unit*1.2,0,pool.x-unit*1.4,pool.y+unit*1.2,unit*23);
    shadowGradient.addColorStop(0,'rgba(12,22,17,.36)');shadowGradient.addColorStop(.45,'rgba(12,22,17,.2)');shadowGradient.addColorStop(.75,'rgba(12,22,17,.07)');shadowGradient.addColorStop(1,'rgba(12,22,17,0)');
    ellipse(pool.x-unit*1.4,pool.y+unit*1.2,unit*23,unit*12.6,shadowGradient);
    if(nt>0)beginNightScene();
    // Ground slab: the same on-screen margin past the wood floor on every edge. The floor is 23 × 17 around z = 1.5;
    // 1.5 units of overhang along x and 1.95 along z project to matching ~1.1-unit bands in this isometric view.
    drawBox(0,1.5,-.32,26,20.9,.32,['#bfbcab','#68695d','#8e8c7b']);
    // The margin reads as a perimeter sidewalk: scored concrete panels with a darker kerb band along the outer edge.
    for(var jx=-11.5;jx<13;jx+=1.5)worldLine([[jx,.006,-8.95],[jx,.006,11.95]],'#a3a08f',.02);
    for(var jz=-7.5;jz<11.95;jz+=1.5)worldLine([[-13,.006,jz],[13,.006,jz]],'#a3a08f',.02);
    groundPatch(0,-8.95+.17,26,.34,'#aca997');groundPatch(0,11.95-.17,26,.34,'#aca997');
    groundPatch(-13+.17,1.5,.34,20.9,'#aca997');groundPatch(13-.17,1.5,.34,20.9,'#aca997');
    worldLine([[-13,.02,-8.95],[13,.02,-8.95],[13,.02,11.95],[-13,.02,11.95],[-13,.02,-8.95]],'#8f8c7b',.03);
    // Rear circulation is painted before the building so people pass behind its walls. The entrance bollards go down
    // first of all, so guests queuing outside always stand in front of them.
    exteriorFixtures.bollards.filter(function(b){return b.x<=-11.5}).forEach(drawBollard);
    customers.forEach(function(c){if(c.phase!=='lounge'&&customerBehindBuilding(c)){var v=Object.assign({},c,{x:c.renderX===undefined?c.x:c.renderX,z:c.renderZ===undefined?c.z:c.renderZ});drawFadedCustomer(v,now)}});
    // Three open rooms. Only the rear and short side walls remain in the cutaway.
    // Depth-sorted overlays (customers, islands, the entrance, the ground-floor counters) are collected here while the
    // floors paint and drawn by the frame after them, so a guest walking behind a counter is hidden by it and one in
    // front stands on it.
    sceneJobs=[];var jobs=sceneJobs;
    [{y:0,z:1.5,w:23,d:17,ids:[4,5]},{y:4.7,z:-2.55,w:18,d:8.2,ids:[3,2]},{y:9.4,z:-3.6,w:13,d:6.6,ids:[0,1]}].forEach(function(floor,fi){
      sceneElevation=floor.y;
      var rear=floor.z-floor.d/2,front=floor.z+floor.d/2,left=-floor.w/2,right=floor.w/2;
      if(fi===2){
        // Draw the suspended foliage before the slab so the floor occludes its crown.
        sceneElevation=0;
        // One broad hanging canopy, suspended from the center of the top-floor soffit.
        var canopyX=0,canopyZ=-1.35;
        [-1.7,1.7].forEach(function(dx){worldLine([[canopyX+dx,9.15,canopyZ],[canopyX+dx,8.83,canopyZ]],'#8c9570',.035)});
        drawBox(canopyX,canopyZ,8.72,4.6,1.05,.14,['#64764e','#394d35','#4c613e']);
        // Trailing pothos: curved, drooping stems with heart-shaped leaves; back rows darker, front rows lighter.
        var swayT=sceneTime*.0009;
        function vineLeaf(q,dir,size,fill,vein){
          ctx.beginPath();ctx.moveTo(q.x,q.y);
          ctx.quadraticCurveTo(q.x+dir*size*1.15,q.y-size*.5,q.x+dir*size*.85,q.y+size*.4);
          ctx.quadraticCurveTo(q.x+dir*size*.3,q.y+size*.95,q.x,q.y+size*.12);
          ctx.closePath();ctx.fillStyle=fill;ctx.fill();
          ctx.beginPath();ctx.moveTo(q.x+dir*size*.08,q.y+size*.08);ctx.lineTo(q.x+dir*size*.62,q.y+size*.3);ctx.strokeStyle=vein;ctx.lineWidth=Math.max(.5,size*.07);ctx.stroke();
        }
        var rows=[{z:canopyZ-.32,stem:'#3c5531',leaves:['#4f6f3c','#5a7d44','#466636'],vein:'#6d8a55'},{z:canopyZ+.08,stem:'#496a3a',leaves:['#6b9250','#7aa257','#5f8648'],vein:'#a3c17e'},{z:canopyZ+.42,stem:'#557a42',leaves:['#8bb463','#9cc46e','#7ea65a','#b9d284'],vein:'#dbe9b0'}];
        rows.forEach(function(row,ri){
          for(var vine=0;vine<14;vine++){
            var dx=-2.2+vine*.335+(ri%2)*.16,seed=vine*3.1+ri*7.7;
            var length=.75+(1-Math.abs(dx)/2.6)*1.05+(Math.sin(seed)+1)*.28;
            var sway=Math.sin(swayT+seed)*.05,points=[],nodes=7;
            for(var n=0;n<=nodes;n++){var t=n/nodes;points.push([canopyX+dx+Math.sin(t*3.4+seed)*.14*t+sway*t,8.82-length*t*(1-.08*t),row.z+t*.22+(n%2)*.02])}
            worldLine(points,row.stem,.034);worldLine(points.slice(0,3),row.stem,.05);
            for(var n=1;n<=nodes;n++){
              var t=n/nodes,side=(n+vine)%2?-1:1,q=project(points[n][0],points[n][1],points[n][2]);
              vineLeaf(q,side,unit*(.25-t*.08)*(ri===0?.9:1),row.leaves[(n+vine+ri)%row.leaves.length],row.vein);
            }
          }
        });
        // Dense crown of larger leaves along the trough so the stems read as spilling over its edge.
        for(var crown=0;crown<22;crown++){
          var cx=canopyX-2.35+crown*.225,q=project(cx,8.74+Math.sin(crown*1.7)*.05,canopyZ+.5+(crown%2)*.1);
          vineLeaf(q,crown%2?-1:1,unit*(.26+(crown%3)*.03),['#86ae5f','#98be6b','#729b52'][crown%3],'#d6e6ad');
        }
        sceneElevation=floor.y;
      }
      if(fi===0){drawCachedGround(floor);drawSideAislePlanter()}

      else{
        // One continuous floor outline includes the stair landing, with no internal slab edge.
        var landing=fi===1?{outer:10.85,back:-1.58,front:-.37}:{outer:8.65,back:-5.58,front:-4.47};
        var finish=fi===1?wood:stone;
        var outline=[[left,rear],[right,rear],[right,landing.back],[landing.outer,landing.back],[landing.outer,landing.front],[right,landing.front],[right,front],[left,front]];
        for(var edge=0;edge<outline.length;edge++){
          var a=outline[edge],b=outline[(edge+1)%outline.length];
          if((b[0]===a[0]&&b[1]>a[1])||(b[1]===a[1]&&b[0]<a[0]))poly([project(a[0],-.24,a[1]),project(b[0],-.24,b[1]),project(b[0],0,b[1]),project(a[0],0,a[1])],b[0]===a[0]?finish[2]:finish[1]);
        }
        var slabTop=outline.map(function(p){return project(p[0],0,p[1])});
        poly(slabTop,finish[0]);
        // The same material grain the walls carry, so the wide slab tops don't read as flat vector fill.
        ctx.save();ctx.globalAlpha*=.75;poly(slabTop,surfaceTexture());ctx.restore();
      }
      if(fi>0){
        // Warm oak fascia with a slim black steel edge beneath each mezzanine.
        drawBox(0,front+.015,-.23,floor.w,.16,.19,['#bb9366','#785438','#a57b50']);
        drawBox(0,front+.035,-.27,floor.w,.18,.045,metal);
        for(var grain=0;grain<3;grain++)worldLine([[left+.1,-.18+grain*.044,front+.1],[right-.1,-.18+grain*.044,front+.1]],'#d0ac793c',.012);
      }
      // Material seams, a rear forest-green wall, and warm recessed strip lighting.
      if(fi>0)for(var seam=left+.8;seam<right;seam+=.9)worldLine([[seam,.015,rear],[seam,.015,front]],fi===1?'#71593b18':'#72796c12',.014);
      var wallFinish=green;
      drawBox(fi===0?-1.225:0,rear,0,fi===0?20.55:floor.w,.2,3.9,wallFinish);
      if(fi===2)drawBox(left,rear+1.7,0,.18,3.6,3.9,wallFinish);
      // The mezzanine's left stub, behind the jar shelf, is in the grow room's wall style. It rises exactly to the top
      // floor's level (4.7 above the mezzanine) and turns along the rear wall to meet the top floor's left-rear corner,
      // so the two are joined.
      if(fi===1){drawSlattedWall(true,left,rear,rear+3.5,4.7,green);drawSlattedWall(false,rear,left,-6.5,4.7,green)}
      if(fi===2){
        // Grow room: forest-green walls with dark timber slats to dado height and a clerestory band that lets the light in.
        var slatTop=2.2,sillY=2.42,headY=3.42,frame=['#3b433d','#1c2320','#2a322d'];
        for(var slat=left+.3;slat<right-.15;slat+=.24){worldLine([[slat,.05,rear+.11],[slat,slatTop,rear+.11]],'#5b7a68',.05);worldLine([[slat+.075,.05,rear+.11],[slat+.075,slatTop,rear+.11]],'#22382d',.018)}
        for(var sideSlat=rear+.25;sideSlat<rear+3.45;sideSlat+=.24){worldLine([[left+.1,.05,sideSlat],[left+.1,slatTop,sideSlat]],'#4d6a58',.05);worldLine([[left+.1,.05,sideSlat+.075],[left+.1,slatTop,sideSlat+.075]],'#22382d',.018)}
        drawBox(0,rear+.14,slatTop,floor.w-.3,.1,.09,['#c8ab7c','#7d6748','#a58a5f']);drawBox(left+.11,rear+1.85,slatTop,.1,3.3,.09,['#c8ab7c','#7d6748','#a58a5f']);
        function clerestory(points,mullions){
          var sky=ctx.createLinearGradient(0,points[3].y,0,points[0].y);sky.addColorStop(0,'#d9e6e4');sky.addColorStop(1,'#eef1e2');poly(points,sky);
          glassPane(points,'#c8dde033');mullions.forEach(function(line){worldLine(line,'#26302a',.055)});
        }
        var rearMullions=[];for(var mx=left+.5+1.6;mx<right-.5;mx+=1.6)rearMullions.push([[mx,sillY,rear+.12],[mx,headY,rear+.12]]);
        clerestory([project(left+.5,sillY,rear+.12),project(right-.5,sillY,rear+.12),project(right-.5,headY,rear+.12),project(left+.5,headY,rear+.12)],rearMullions);
        clerestory([project(left+.11,sillY,rear+.45),project(left+.11,sillY,rear+3.3),project(left+.11,headY,rear+3.3),project(left+.11,headY,rear+.45)],[[[left+.11,sillY,rear+1.4],[left+.11,headY,rear+1.4]],[[left+.11,sillY,rear+2.35],[left+.11,headY,rear+2.35]]]);
        drawBox(0,rear+.13,sillY-.09,floor.w-.9,.14,.09,frame);drawBox(0,rear+.13,headY,floor.w-.9,.14,.08,frame);
        drawBox(left+.12,rear+1.875,sillY-.09,.14,2.95,.09,frame);drawBox(left+.12,rear+1.875,headY,.14,2.95,.08,frame);
        // Daylight from the clerestory washes the top of the plaster and the floor beneath it.
        var daylight=project(0,headY,rear+.3),dayFactor=1-Math.min(1,visualLight().darkness/.34);
        ctx.save();ctx.globalAlpha=dayFactor;glow(daylight.x,daylight.y,unit*6.5,'#e9f0d81c',unit*3.2);wallWash(left+.5,right-.5,rear+.2,headY,sillY-.9,'#eef4e2',.12);ctx.restore();
      }
      // Ambient occlusion: the floor darkens softly where it meets the rear and side walls.
      shadowBand(fi===0?-11.5:left+.2,fi===0?9.05:right-.2,rear+.1,rear+1.6,.012,fi===0?.14:.22);shadowBandX(rear+.1,rear+3.5,left+.18,left+1.3,.012,.14);
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
      wallWash(left+.3,fi===0?8.95:right-.3,rear+.2,3.58,fi===2?1.9:1.5,'#f7d58b',.2);
      var light=project(0,2.5,rear+.3);glow(light.x,light.y,unit*5,'#f7d58b18',unit*2.4);
      // Ambient occlusion where the floor meets the walls, and under the mezzanine above.
      shadowBand(left+.2,fi===0?9:right-.2,rear+.2,rear+1.9,.018,.2);
      shadowBandX(rear+.2,front-.2,left+.2,left+1.4,.018,.15);
      if(fi===0){poly([project(-9,.016,rear+.2),project(9,.016,rear+.2),project(9,.016,1.55),project(-9,.016,1.55)],'rgba(14,28,20,.07)');shadowBand(-9,9,1.55,1.3,.017,.12)}
      if(fi===1){poly([project(-6.5,.016,rear+.2),project(6.5,.016,rear+.2),project(6.5,.016,-.3),project(-6.5,.016,-.3)],'rgba(14,28,20,.07)');shadowBand(-6.5,6.5,-.3,-1.9,.017,.12)}
      if(fi!==0){
      // Black-framed glass along the rear-right corner, not across the open front.
      glassPane([project(right,0,rear),project(right,0,rear+3),project(right,3.8,rear+3),project(right,3.8,rear)],'#adc7b21b');
      for(var mull=0;mull<4;mull++)worldLine([[right,0,rear+mull],[right,3.8,rear+mull]],'#263a32',.04);
      worldLine([[right,3.8,rear],[right,3.8,rear+3]],'#252b28',.045);
      }
      if(fi===2){
        var artX=left+.13,artZ=rear+1.8;
        drawBox(artX,artZ,.55,.1,1.25,1.5,wood);
        drawBox(artX+.06,artZ,.64,.025,1.07,1.32,['#e4dbc0','#c2b69a','#ded4b7']);
        worldLine([[artX+.08,.8,artZ],[artX+.08,1.8,artZ]],'#476746',.035);
        for(var leaf=0;leaf<4;leaf++)[-1,1].forEach(function(dir){var y=.98+leaf*.2;poly([project(artX+.08,y,artZ),project(artX+.08,y+.17,artZ+dir*.3),project(artX+.08,y+.04,artZ+dir*.36),project(artX+.08,y-.025,artZ+dir*.13)],'#718b52')});
      }
      if(fi===1){
      }
      var shelfX=fi===0?-6:fi===1?-5:0;
      if(fi===2){
        // Grow room: an open black-steel propagation rack with seedling trays under cool grow-light bars.
        var rackZ=rear+.62,rackW=4.6,rackD=.95,tierY=[.42,1.18,1.94],rackFrame=['#3a403c','#1a1f1c','#282e2a'];
        [-1,1].forEach(function(sx){[-1,1].forEach(function(sz){drawBox(shelfX+sx*rackW/2,rackZ+sz*rackD/2,0,.08,.08,2.62,rackFrame)})});
        tierY.forEach(function(y,tier){
          drawBox(shelfX,rackZ,y,rackW,rackD,.05,['#56605a','#2b322e','#3e4641']);
          for(var wire=0;wire<9;wire++)worldLine([[shelfX-rackW/2+.2+wire*.52,y+.052,rackZ-rackD/2+.05],[shelfX-rackW/2+.2+wire*.52,y+.052,rackZ+rackD/2-.05]],'#7c877f',.014);
          for(var tray=0;tray<4;tray++){
            var tx=shelfX-1.65+tray*1.1,grown=(tray+tier)%3;
            drawBox(tx,rackZ,y+.05,.92,.66,.16,['#2f3733','#171c1a','#232927']);
            drawBox(tx,rackZ,y+.19,.82,.56,.03,['#4a3a2c','#2d231b','#3a2d22']);
            for(var cell=0;cell<6;cell++){
              var cx=tx-.3+(cell%3)*.3,cz=rackZ-.13+Math.floor(cell/3)*.26,q=project(cx,y+.22,cz),leafR=unit*(.045+grown*.03);
              worldLine([[cx,y+.21,cz],[cx,y+.3+grown*.09,cz]],'#6f9a4e',.02);
              ellipse(q.x-leafR*.7,q.y-unit*(.07+grown*.08),leafR,leafR*.6,grown===2?'#8fb95c':'#7aa652');ellipse(q.x+leafR*.7,q.y-unit*(.09+grown*.08),leafR,leafR*.6,grown?'#9cc265':'#6f9a4e');
            }
          }
          // Grow-light bar under the tier above (and a top bar), with a cool wash on the trays below.
          var barY=y+.7;litBox(shelfX,rackZ,barY,rackW-.3,.14,.05,['#f0f4f2','#9aa6a0','#c7d0ca']);
          ctx.save();ctx.globalAlpha=.16;litLine([[shelfX-rackW/2+.2,barY-.01,rackZ],[shelfX+rackW/2-.2,barY-.01,rackZ]],'#d8ecff',.34);ctx.restore();
          var wash=project(shelfX,y+.25,rackZ);glow(wash.x,wash.y,unit*1.6,'#cfe6ff1c');
        });
        drawBox(shelfX,rackZ,2.62,rackW,rackD,.05,['#56605a','#2b322e','#3e4641']);
        // A watering can and a stack of spare trays at the end of the rack.
        drawBox(shelfX+rackW/2+.45,rackZ,0,.38,.3,.42,['#8fb0b7','#4d6d74','#6d9098']);worldLine([[shelfX+rackW/2+.6,.36,rackZ],[shelfX+rackW/2+.82,.5,rackZ-.06]],'#4d6d74',.04);
        for(var spare=0;spare<3;spare++)drawBox(shelfX-rackW/2-.55,rackZ,spare*.1,.9,.62,.09,['#2f3733','#171c1a','#232927']);
      }else if(fi===1){
      // Mezzanine: storage shelving runs the whole back wall in four bays, oak shelves on black steel uprights.
      [-6.6,-2.2,2.2,6.6].forEach(function(bayX,bay){
        [-1,1].forEach(function(sx){[-1,1].forEach(function(sz){drawBox(bayX+sx*2.1,rear+.5+sz*.4,0,.08,.08,3.2,metal)})});
        for(var shelf=0;shelf<3;shelf++){
          drawBox(bayX,rear+.5,.6+shelf*.85,4.2,.85,.1,wood);
          warmStrip([[bayX-2,.71+shelf*.85,rear+.91],[bayX+2,.71+shelf*.85,rear+.91]],false);
          for(var item=0;item<5;item++){var kind=(item+shelf+bay)%4;if(kind===0)carton(bayX-1.6+item*.8,rear+.5,.71+shelf*.85,.4);else if(kind===2&&shelf===2)plant(bayX-1.6+item*.8,rear+.5,.71+shelf*.85,.4);else jar(bayX-1.6+item*.8,rear+.5,.71+shelf*.85)}
        }
        drawBox(bayX,rear+.5,3.2,4.25,.85,.06,metal);
      });
      }else{
      // Built-in timber shelving with jars, cartons, and plants.
      drawBox(shelfX,rear+.12,.1,4.35,.18,3.25,['#c6a267','#82633e','#ac884f']);
      for(var shelf=0;shelf<3;shelf++){
        drawBox(shelfX,rear+.5,.6+shelf*.85,4.2,.85,.12,wood);
        warmStrip([[shelfX-2,.71+shelf*.85,rear+.91],[shelfX+2,.71+shelf*.85,rear+.91]],false);
        for(var item=0;item<5;item++)if((item+shelf)%3)jar(shelfX-1.6+item*.8,rear+.5,.73+shelf*.85);else carton(shelfX-1.6+item*.8,rear+.5,.73+shelf*.85,.4);
      }
      // Cabinet partitions occlude the shelf ends and products behind their faces.
      for(var cubby=4;cubby>=0;cubby--)drawBox(shelfX-2.1+cubby*1.05,rear+.55,.1,.06,.82,3.17,wood);
      [2.1,-2.1].forEach(function(dx){drawBox(shelfX+dx,rear+.5,0,.09,.86,3.3,wood)});
      }
      if(fi===0){
        // Built-in product wall directly behind the service counters, under the mezzanine.
        var displayZ=DISPLAY_Z;
        // The lounge's walls go down first: the shelving unit stands in front of the wall's end.
        drawLoungeFront(now);
        drawBox(0,displayZ,0,13.4,.32,3.95,green);
        drawBox(0,displayZ+.22,.04,13.4,.75,.62,wood);
        // The bay uprights go down before the goods, so what stands beside them is never cut by them.
        for(var divider=0;divider<6;divider++)if(divider!==1)drawBox(-6.5+divider*2.6,displayZ+.23,.65,.07,.8,3.16,['#c9a97e','#8a6d4b','#a68a62']);
        for(var bay=0;bay<5;bay++){
          var bx=-5.2+bay*2.6,boardRow=function(row){return bay<2&&(row===1||row===2)};
          drawBox(bx,displayZ+.61,.15,2.42,.05,.43,['#d1b58b','#957448','#b99b6e']);
          for(var batten=0;batten<10;batten++)drawBox(bx-1.1+batten*.245,displayZ+.65,.17,.1,.055,.38,['#caa16c','#805a39','#ac8151']);
          worldLine([[bx-.22,.46,displayZ+.65],[bx+.22,.46,displayZ+.65]],'#dec48c',.055);
          // Every board of the bay goes down first, then the goods on each shelf, then the lit front edges — so no
          // board above ever paints over the top of what stands on the shelf below it.
          for(var row=0;row<4;row++)if(!boardRow(row)&&bay!==1)drawBox(bay===0?bx+1.3:bx,displayZ+.25,.7+row*.76,bay===0?5.15:2.55,.8,.1,wood);
          if(bay===0)drawMenuBoard(bx+1.3,displayZ,1.38,5.1,1.24,now,wood);
          for(var row=0;row<4;row++){
            var sy=.7+row*.76;
            if(boardRow(row))continue;
            if(stationTier(4)>=2){var shelfLight=project(bx,sy+.2,displayZ+.3);glow(shelfLight.x,shelfLight.y,unit*1.05,'#f4d2952a')}
            for(var product=0;product<3;product++){
              var xx=bx-.78+product*.78;
              if(bay===1||bay===3)merchandise(xx,displayZ+.3,sy+.12,(row+product)%3,['#527e60','#b28b64','#75999a'][product]);
              else if((bay+row)%3===0)carton(xx,displayZ+.3,sy+.12,.43);
              else jar(xx,displayZ+.3,sy+.12);
            }
          }
          for(var row=0;row<4;row++){if(boardRow(row))continue;var sy=.7+row*.76;warmStrip([[bx-1.18,sy+.12,displayZ+.67],[bx+1.18,sy+.12,displayZ+.67]],false)}
        }
        drawBox(0,displayZ+.22,3.8,13.45,.84,.16,wood);
        drawExitCabinet();
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
        // A long planter runs along the mezzanine's left edge in front of the deck stairs, in the same build as the
        // top floor's corner planter: oak box, steel rim, soil and a row of plants.
        var edgeX=left+.55,edgeZ=-.35;
        drawBox(edgeX,edgeZ,0,.95,2.9,.56,wood);
        drawBox(edgeX,edgeZ,.56,1.03,2.98,.075,metal);
        drawBox(edgeX,edgeZ,.635,.78,2.7,.025,['#514633','#514633','#514633']);
        [-1.05,-.35,.35,1.05].forEach(function(dz,n){var px=edgeX+(n%2?.12:-.1),pz=edgeZ+dz,h=.55+(n%3)*.1;
          worldLine([[px,.65,pz],[px,.65+h,pz]],'#5e7e45',.035);
          for(var leaf=0;leaf<5;leaf++){var angle=leaf*2.4+n,q=project(px+Math.cos(angle)*.22,.83+leaf*.1,pz+Math.sin(angle)*.18);ellipse(q.x,q.y,unit*.17,unit*.1,leaf%2?'#8eae64':'#64894e')}
        });
        // Packing supplies and a softly lit interior work area.
        for(var box=0;box<4;box++)carton(5.5+(box%2)*.7,-4+Math.floor(box/2)*.7,0,.6);
        plant(7,-3,0,1.4);
      }
      if(fi===2){
        plant(4.4,-5.6,0,.75);
        // Drip irrigation: a slim line along the rear wall feeding the rack.
        worldLine([[left+.4,1.05,rear+.2],[right-.4,1.05,rear+.2]],'#8ea6a0',.03);
        for(var drip=0;drip<6;drip++)worldLine([[-2+drip*.8,1.05,rear+.2],[-2+drip*.8,.5,rear+.55]],'#8ea6a0',.02);
      }
      // Oak trims and planted wall panels, with concealed strips along the trim, on the upper floors; the ground
      // floor's rear wall only shows beside the exit door, where it stays a plain green panel.
      if(fi>0){
        worldLine([[left+.2,2.95,rear+.18],[right-.2,2.95,rear+.18]],'#b7986a',.11);
        warmStrip([[left+.35,2.87,rear+.25],[right-.35,2.87,rear+.25]],fi===2);
      }
      if(fi===2)drawGrowExhaustFan(-4.4,rear+.24,2.4);
      if(fi>0)warmStrip([[left+.2,-.08,front+.025],[right-.2,-.08,front+.025]],false);
      if(fi<2)retailDetails(fi,rear,now);

      // Short roller belts carry products directly between neighboring stations, along their rear halves so the
      // workers in front stand clear of them.
      if(fi===2)conveyorRun(-1.45,1.45,-3.55,1.35,0);
      if(fi===1)conveyorRun(1.45,-1.45,-.85,1.35,2);
      floor.ids.forEach(function(i){var p=machinePos[i];lightPool(p.x,.035,p.z+.9,1.65,i===1)});
      // Furniture stays visible in front of the back wall and shelving.
      // Staff positions: most stand behind their bench; the grow-room pair stand where the gantry and rack do not hide them.
      var staffSpots={0:{dx:-2.45,dz:.45,front:true,facing:1},1:{dx:-2.45,dz:.45,front:true,facing:1},5:{dx:1.05,dz:-1.55,front:false,facing:.35}};
      if(fi===2)drawGrowGantry('posts');
      function drawStation(i,only){if(i===4){drawOrderCounterBank(now,only);if(selected===4&&state.orderCounters===1)selectionRing(machinePos[4]);return}if(i===5)drawCounterDivider();var p=machinePos[i],spot=staffSpots[i]||{dx:-.95,dz:-1.65,front:false},gait=spot.facing?{amount:0,phase:0,facing:spot.facing}:undefined,staffed=state.lines[i]>0;if(staffed&&!spot.front)drawPerson(p.x+spot.dx,p.z+spot.dz,now,i,false,true,false,gait);drawStage(p,i,now);if(staffed&&spot.front)drawPerson(p.x+spot.dx,p.z+spot.dz,now,i,false,true,false,gait);if(selected===i)selectionRing(p)}
      // The ground-floor counters sort with the customers; the upper stations paint with their floors.
      floor.ids.forEach(fi===0?function(i){
        var p=machinePos[i],desks=i===4?orderCounterPositions(state.orderCounters):[p];
        if(state.lines[i]>0)desks.forEach(function(q){slabDownlight(q.x,1.45,4.45,1.31)});
        desks.forEach(function(q,index){jobs.push({depth:depthOf(q),draw:function(){sceneElevation=0;suppressDownlights=true;try{drawStation(i,i===4?index:undefined)}finally{suppressDownlights=false}}})});
      }:drawStation);
      if(fi===0)[-5.3,-2.7,7.4].forEach(function(gx){globePendant(gx,1.0,4.45)});
      if(fi===2)drawGrowGantry();
      // Thin mezzanine guard rails stop short of the workstation fronts. The top floor's transfer tube drops behind its
      // front rail, so that run is painted first and the rail over it.
      if(fi===2){sceneElevation=0;drawFloorTransfer(1,true);sceneElevation=floor.y}
      if(fi>0){
        var rz=front-.1;
        [-floor.w/2,-floor.w/2+2,floor.w/2-2,floor.w/2].forEach(function(x){worldLine([[x,0,rz],[x,.95,rz]],'#252b28',.055)});
        [[left,left+2],[right-2,right]].forEach(function(pair){worldLine([[pair[0],.95,rz],[pair[1],.95,rz]],'#252b28',.055)});
      }
      sceneElevation=0;
      // Draw outgoing runs before the next slab, which naturally hides the buried section.
      if(fi===0)drawFloorTransfer(3,false);
      if(fi===1){
        // Stairs to the online-orders deck: a short flight leaves the mezzanine past the end of the side wall, reaches a landing
        // outside the building, then turns left and climbs forward to enter the deck from its rear edge, behind the counter.
        sceneElevation=4.7;
        var rise=2.35/10,rail='#252b28',post=['#3a403c','#1a1f1c','#282e2a'];
        var f1Z=-2.3,f1Start=-7.2,f1Run=.78,landX=-10.25,landZ=-2.3,f2X=-10.25,f2Start=-1.41,f2Run=.38;
        // The outside section hangs from the deck's own structure; no posts run down past the lounge's curtain.
        for(var t1=0;t1<4;t1++){var y1=(t1+1)*rise,x1=f1Start-t1*f1Run;drawBox(x1,f1Z,y1-.16,f1Run+.03,1.4,.16,wood);if(t1%2===0)warmStrip([[x1-.37,y1+.01,f1Z-.6],[x1-.37,y1+.01,f1Z+.6]],false)}
        drawBox(landX,landZ,5*rise-.16,1.4,1.4,.16,wood);
        for(var t2=0;t2<4;t2++){var y2=(6+t2)*rise,z2=f2Start+t2*f2Run;drawBox(f2X,z2,y2-.16,1.4,f2Run+.03,.16,wood);if(t2%2===1)warmStrip([[f2X-.6,y2+.01,z2+.17],[f2X+.6,y2+.01,z2+.17]],false)}
        // Rails: both sides of the first flight, the rear and outer edges of the landing, and both sides of the second flight.
        [-.72,.72].forEach(function(dz){worldLine([[f1Start+.4,.05,f1Z+dz],[f1Start+.4,.95,f1Z+dz],[f1Start-3*f1Run-.4,4*rise+.95,f1Z+dz]],rail,.06);worldLine([[f1Start-1.5*f1Run,2*rise,f1Z+dz],[f1Start-1.5*f1Run,2*rise+.95,f1Z+dz]],rail,.045)});
        worldLine([[landX+.7,5*rise+.95,landZ-.7],[landX-.7,5*rise+.95,landZ-.7],[landX-.7,5*rise+.95,landZ+.7]],rail,.06);
        [[landX+.7,landZ-.7],[landX-.7,landZ-.7],[landX-.7,landZ+.7]].forEach(function(pt){worldLine([[pt[0],5*rise,pt[1]],[pt[0],5*rise+.95,pt[1]]],rail,.045)});
        [-.72,.72].forEach(function(dx){worldLine([[f2X+dx,5*rise+.95,landZ+.7],[f2X+dx,9*rise+.95,f2Start+3*f2Run+.2]],rail,.06);worldLine([[f2X+dx,9*rise,f2Start+3*f2Run+.2],[f2X+dx,9*rise+.95,f2Start+3*f2Run+.2]],rail,.045)});
        if(!deliveryBuilt()){
          var entryX=f1Start+.4;
          constructionTape([entryX,.92,f1Z-.74],[entryX,.48,f1Z+.74]);
          constructionTape([entryX,.48,f1Z-.74],[entryX,.92,f1Z+.74]);
        }
        sceneElevation=0;
        drawFloorTransfer(3,true);drawFloorTransfer(1,false);
        drawBox(-12.5,3,0,.14,.14,6.81,metal);
        // The inner support is a raking strut: the platform's inner-front corner hangs past the mezzanine's front
        // edge, so it leans back to a shoe on the slab's front-left corner, in line with the side wall.
        drawBox(-8.95,1.35,4.7,.34,.34,.14,metal);
        worldLine([[-8.95,4.84,1.35],[-8.9,6.81,3]],'#252b28',.14);
        sceneElevation=7.05;onlinePackingCounter(now);sceneElevation=0;
      }
    });
    // Illuminated stair flights connect the open floors at the right-hand edge, each flush against the slab it climbs
    // to: the lower flight's inner edge meets the mezzanine at x 9, the upper flight's meets the top floor at x 6.5.
    // The upper flight is one straight run.
    [{x:7.35,y:4.7,z:.45}].forEach(function(stair){
      for(var step=0;step<14;step++){
        var sy=stair.y+step*4.7/14,sz=stair.z-step*.43;
        drawBox(stair.x,sz,sy,1.7,.45,.16,wood);
        if(step%2===0){warmStrip([[stair.x-.72,sy+.17,sz+.21],[stair.x+.72,sy+.17,sz+.21]],false);lightPool(stair.x,sy+.18,sz,.5,false)}else worldLine([[stair.x-.76,sy+.17,sz+.21],[stair.x+.76,sy+.17,sz+.21]],'#d5be91',.025);
      }
      [-.92,.92].forEach(function(dx){worldLine([[stair.x+dx,stair.y+.9,stair.z],[stair.x+dx,stair.y+5.6,stair.z-5.8]],'#252b28',.07)});
    });
    // The ground flight is a dog-leg: from the mezzanine landing it comes forward along the right edge for seven steps
    // to a half landing, then turns and comes down toward the counters, its foot beside the pickup counter's planter.
    (function(){
      var x=9.85,rise=4.7/14,landZ=2.9,landY=6*rise,rail='#252b28',foot=6.525;
      function tread(tx,tz,ty,w,d,lit,along){
        drawBox(tx,tz,ty,w,d,.16,wood);
        // The lit nose sits on the edge the step descends from: the front (+z) edge of the upper run, the inner (−x)
        // edge of the lower run.
        var a=along?[[tx-.21,ty+.17,tz-.72],[tx-.21,ty+.17,tz+.72]]:[[tx-.72,ty+.17,tz+.21],[tx+.72,ty+.17,tz+.21]];
        if(lit){warmStrip(a,false);lightPool(tx,ty+.18,tz,.5,false)}else worldLine(a,'#d5be91',.025);
      }
      // Painter's order: the lower run lies beyond the landing (smaller x) and below it, so it goes down first, then
      // the upper run behind, then the landing in front of both.
      for(var m=0;m<6;m++)tread(foot+m*.45,landZ,m*rise,.45,1.7,m%2===1,true);
      for(var step=7;step<14;step++)tread(x,5-step*.43,step*rise,1.7,.45,step%2===0,false);
      drawBox(x,landZ,landY,1.7,1.7,.16,wood);
      warmStrip([[x-.72,landY+.17,landZ+.64],[x+.72,landY+.17,landZ+.64]],false);
      // Handrails: both sides of the upper run, the landing's outer and front edges, both sides of the lower run.
      [-.92,.92].forEach(function(dx){worldLine([[x+dx,3.29,2.05],[x+dx,5.6,-.8]],rail,.07)});
      worldLine([[x+.92,3.29,2.05],[x+.92,3.05,landZ+.85],[9,3.05,landZ+.85]],rail,.07);
      [-.85,.85].forEach(function(dz){worldLine([[9,3.05,landZ+dz],[foot-.22,.9,landZ+dz]],rail,.07)});
    })();
    // Slim structural post for the left mezzanine, and the newel at the head of the upper flight on the right: it stands
    // on the mezzanine (from the top of the lower flight, not below it) and rises to the top of the handrails.
    drawBox(-8.8,-5.7,0,.16,.16,9.1,metal);
    drawBox(8.27,-4.8,4.7,.16,.16,5.6,metal);
    // A guard rail along the mezzanine's open right edge runs from the newel toward the lower flight and stops short
    // of its top tread, leaving a gap to walk through; an end post closes the rail there.
    worldLine([[8.93,5.6,-1.75],[8.93,5.6,-4.8],[8.27,5.6,-4.8]],'#252b28',.07);
    [-1.75,-2.75,-3.75].forEach(function(bz){worldLine([[8.93,4.7,bz],[8.93,5.6,bz]],'#252b28',bz===-1.75?.07:.045)});
    // Enclosed gravity transfers bridge each floor without crossing the stairs.
    // The arched service signs stand in front of the counters, which now sort as jobs, so they sort as jobs too.
    orderCounterPositions(state.orderCounters).forEach(function(p){sceneJobs.push({depth:depthOf({x:p.x,z:3.75}),draw:function(){sceneElevation=0;archedServiceSign(p.x,'ORDER',state.orderCounters>1)}})});
    sceneJobs.push({depth:depthOf({x:4,z:3.75}),draw:function(){sceneElevation=0;archedServiceSign(4,'PICKUP')}});
    // Street-level queue markings and low entry planters retain the service route.
    // One dash per standing place along the order line, as far as the doorman; lit while someone is on it.
    var waiting=customers.filter(inOrderFlow).length,orderRoute=queueRoute(false),spacing=queueLimit()>20?.6:.75,inside=routeLength(orderRoute.slice(0,laneJoinIndex(orderRoute)+1));
    for(var place=0;place<queueLimit();place++){var along=place*spacing;if(along>inside)break;var spot=routePoint(orderRoute,along),next=routePoint(orderRoute,along+.02),acrossX=Math.abs(next.x-spot.x)>=Math.abs(next.z-spot.z);groundPatch(spot.x,spot.z,acrossX?.06:.3,acrossX?.3:.06,place<waiting?'#dfcb99':'#7d8f78')}

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
    // The desk sits wholly on the timber floor (front edge z 9.925 < 10), just inside the door.
    var x=-9.1,z=9.3,steel=['#414843','#171e1a','#2b342e'],wood=['#bc9d73','#6f5943','#998063'];
    jobs.push({depth:depthOf({x:-12.4,z:7.1})-.01,draw:function(){
      groundPatch(-12.4,7.1,.65,.7,'#c7d6a754');
      worldLine([[-12.7,.04,7.45],[-12.1,.04,7.45]],'#e5d7ae',.05);
    }});
    if(!state.doorBuilt){jobs.push({depth:depthOf({x:x,z:z}),draw:function(){drawConstructionSite(x,z,1.5,2.1,function(){drawBox(x,z,0,.64,1.25,.12,steel);drawBox(x,z,.12,.6,1.2,.85,wood);drawBox(x,z,.97,.78,1.38,.13,['#efe4c8','#a9a18c','#d4c7a6'])})}});return}
    jobs.push({depth:depthOf({x:x+.7,z:z}),draw:function(){drawPerson(x+.7,z,now,4,false,true,false)}});
    jobs.push({depth:depthOf({x:x,z:z}),draw:function(){
      var rise=buildRise[6]||0,lift=rise*rise*1.1;if(rise>0){ctx.save();ctx.globalAlpha=.15+.85*(1-rise);sceneElevation-=lift}
      try{drawIdDesk()}finally{if(rise>0){sceneElevation+=lift;ctx.restore()}}
    }});
    function drawIdDesk(){
      drawBox(x,z,0,.64,1.25,.12,steel);drawBox(x,z,.12,.6,1.2,.85,wood);
      drawBox(x,z,.97,.78,1.38,.13,['#efe4c8','#a9a18c','#d4c7a6']);
      drawBox(x-.12,z,1.1,.24,.32,.08,['#b7ccac','#527563','#88a488']);
      var checking=customers.find(function(c){return c.idChecked===false&&c.idCheckTime>0});
      var checkProgress=checking?Math.min(1,checking.idCheckTime/(securityDuration())):0;
      worldLine([[x-.29,1.11,z-.43],[x-.29,1.11,z+.43]],'#577465',.035);
      if(checkProgress>0)worldLine([[x-.29,1.115,z-.43],[x-.29,1.115,z-.43+checkProgress*.86]],'#c5e89e',.045);
      var light=project(x-.12,1.19,z);ellipse(light.x,light.y,unit*.055,unit*.035,checking?'#e9cf87':'#b7dd96');
      var label=project(x,.65,z+.61);ctx.save();ctx.fillStyle='#f2ecd5';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='600 '+(unit*.12)+'px "Bricolage Grotesque",sans-serif';ctx.fillText('ID CHECK',label.x,label.y,unit*.55);ctx.restore();
    }
  }
  // An exterior planter runs along the outside of the storefront, behind the glass: a low green blocker between the
  // shop and the sidewalk queue. Its sides are the entrance's glazed green tile with cream seams (tall tiles, no
  // course line) under the same steel rim as the mezzanine planters. It runs the whole side aisle, from the storefront
  // bays back past the corner window, and the corner's tree grows out of it. It is painted with the ground floor, right
  // after the boards, so the interior stands in front of it while it still fronts the outside queue.
  function drawSideAislePlanter(){
    var x=-10.65;
    // The planter runs the glazed bays and a little past their rear pilaster, stopping well clear of the smoking
    // lounge, whose left end stands in the aisle beyond (its wall would otherwise paint over the planter's end).
    var px=x-.55,pz=3.8,len=3.6,tile=['#708b72','#2c4938','#4a6850'],metal=['#414440','#191e1c','#2b302d'];
      drawBox(px,pz,0,.9,len,.56,tile);
      var faceX=px+.465,endZ=pz+len/2+.015;
      for(var sz=pz-len/2+.08;sz<pz+len/2-.04;sz+=.24)worldLine([[faceX,0,sz],[faceX,.56,sz]],'#ccd3b3',.015);
      for(var sx=px-.45+.08;sx<px+.45-.04;sx+=.24)worldLine([[sx,0,endZ],[sx,.56,endZ]],'#ccd3b3',.015);
      drawBox(px,pz,.56,.98,len+.08,.075,metal);drawBox(px,pz,.635,.72,len-.2,.025,['#514633','#514633','#514633']);
      [-1.2,-.5,.2,.9,1.6].forEach(function(dz,n){var qx=px+(n%2?.1:-.1),qz=pz+dz,h=.5+(n%3)*.1;
        worldLine([[qx,.65,qz],[qx,.65+h,qz]],'#5e7e45',.035);
        for(var leaf=0;leaf<5;leaf++){var angle=leaf*2.4+n,q=project(qx+Math.cos(angle)*.2,.83+leaf*.09,qz+Math.sin(angle)*.17);ellipse(q.x,q.y,unit*.16,unit*.095,leaf%2?'#8eae64':'#64894e')}
      });
      // The tree: trunk out of the soil, two limbs, a loose crown.
      var tx=px-.25,tz=2.35;
      worldLine([[tx,.64,tz],[tx+.12,2.5,tz],[tx-.05,3.55,tz]],'#816747',.16);
      [-1,1].forEach(function(side){worldLine([[tx+.12,2.1,tz],[tx+side*.85,3.2,tz]],'#816747',.085)});
      for(var leaf=0;leaf<18;leaf++){var a=leaf*2.399,r=.35+(leaf%4)*.18,lp=project(tx+Math.cos(a)*r,2.7+(leaf%5)*.19,tz+Math.sin(a)*r*.6);ellipse(lp.x,lp.y,unit*.33,unit*.24,leaf%3===0?'#98b96e':leaf%3===1?'#587c4d':'#769852')}
  }
  function addEntryDoor(jobs){
    var x=-10.65,z=10,frame=['#414843','#171e1a','#2b342e'],brass=['#d8c18b','#8d7950','#b7a16d'];
    function add(px,pz,fn){jobs.push({depth:depthOf({x:px,z:pz}),draw:fn})}
    // Glazed storefront bays continue the door frame behind the kiosk row.
    for(var bay=0;bay<4;bay++)(function(start,end){
      for(var strip=0;strip<6;strip++)(function(a,b){add(x,(a+b)/2,function(){
        glassPane([project(x,.15,a),project(x,.15,b),project(x,3.3,b),project(x,3.3,a)],'#b9d9c51c');
        drawBox(x,(a+b)/2,.08,.13,Math.abs(b-a)+.01,.08,frame);
      })})(start+(end-start)*strip/6,start+(end-start)*(strip+1)/6);
      add(x,end,function(){drawBox(x,end,.08,.13,.13,3.25,frame)});
    })(8.8-bay*1.6,Math.max(2.5,7.2-bay*1.6));
    // One continuous black transom bar runs under the marquee along the whole glazed run.
    jobs.push({depth:depthOf({x:x,z:11.4})+.55,draw:function(){drawBox(x,(8.8+2.5)/2,3.3,.18,8.8-2.5,.3,frame)}});
    // The marquee sorts after every glazing rail and the door header so nothing on the wall overpaints its panels.
    jobs.push({depth:depthOf({x:x,z:11.4})+.6,draw:function(){drawMarquee(false)}});
    jobs.push({depth:depthOf({x:MARQUEE.x,z:MARQUEE.rearPilaster}),draw:drawMarqueeRearPilaster});
    jobs.push({depth:-Infinity,draw:function(){var reflection=project(-10.25,.02,7.85);glow(reflection.x,reflection.y,unit*1.1,'#9adf7930')}});
    // A small neon leaf hangs on the glass above the kiosk row.
    add(x+.12,7.85,function(){
      var outline=[[0,.42],[-.18,.28],[-.51,.3],[-.34,.12],[-.67,-.08],[-.39,-.12],[-.52,-.5],[-.22,-.3],[0,-.78],[.22,-.3],[.52,-.5],[.39,-.12],[.67,-.08],[.34,.12],[.51,.3],[.18,.28],[0,.42]];
      var points=outline.map(function(p){return [x+.12,2.68-p[1]*.72,7.85+p[0]*.85]});
      lit(function(){ctx.save();ctx.shadowColor='#a4ff70';ctx.shadowBlur=unit*.2;
      worldLine(points,'#86eb7040',.09);worldLine(points,'#a6fa86',.035);
      worldLine([[x+.12,2.38,7.85],[x+.12,2.25,7.85]],'#a6fa86',.035);
      ctx.shadowBlur=0;worldLine(points,'#e6ffd2',.012);ctx.restore()});
    });
    // Matching short tiled returns flank the entrance without crossing the approach; both stand straight on the slab.
    var tileWall=['#708b72','#2c4938','#4a6850'],coping=['#e0d4b4','#a99c7b','#c5ba9a'];
    // Along the side wall, in ten sections so the queue sorts against it.
    for(var section=0;section<10;section++)(function(center,last){add(x,center,function(){
      drawBox(x,center,0,.26,7/30,1.15,tileWall);
      worldLine([[x+.145,0,center-7/60],[x+.145,1.15,center-7/60]],'#ccd3b3',.015);
      worldLine([[x+.145,.575,center-7/60],[x+.145,.575,center+7/60]],'#ccd3b3',.014);
      if(last)worldLine([[x-.13,.575,center+7/60+.015],[x+.13,.575,center+7/60+.015]],'#ccd3b3',.014);
      drawBox(x,center,1.15,.38,7/30+.01,.1,coping);
    })})(7.53-7/6+(section+.5)*7/30,section===9);
    // Across the front, butted against the marquee's corner pilaster: it starts on the pilaster's front corner, shares
    // its depth and front plane, and runs nine whole tiles; the coping is the wall's own footprint so every edge is
    // flush. It is painted after the marquee job, so the pilaster's inner face (which the wall hides) cannot paint over
    // the first tile, and its seams run the full height from the slab to the coping.
    var pilasterFace=MARQUEE.x+MARQUEE.depth/2,wallX1=pilasterFace+9*.24,wallZ=MARQUEE.pilaster;
    jobs.push({depth:depthOf({x:x,z:11.4})+.61,draw:function(){
      var cx=(pilasterFace+wallX1)/2,w=wallX1-pilasterFace,fz=wallZ+MARQUEE.depth/2+.015;
      drawBox(cx,wallZ,0,w,MARQUEE.depth,1.15,tileWall);
      for(var seam=1;seam<9;seam++){var sx=pilasterFace+seam*.24;worldLine([[sx,0,fz],[sx,1.15,fz]],'#ccd3b3',.015)}
      worldLine([[pilasterFace,.575,fz],[wallX1,.575,fz]],'#ccd3b3',.014);
      // The course line turns the corner on to the wall's end.
      worldLine([[wallX1+.015,.575,wallZ+MARQUEE.depth/2],[wallX1+.015,.575,wallZ-MARQUEE.depth/2]],'#ccd3b3',.014);
      drawBox(cx,wallZ,1.15,w,MARQUEE.depth,.1,coping);
    }});
    // Rear-wall exit replaces the greenery panel; customers approach beside the stairs.
    var exitX=10.25,exitZ=-7;
    add(exitX,exitZ+.14,function(){
      // A plate centred on the door's header bar.
      var sx=exitX,sz=exitZ+.13;
      drawBox(sx,sz,3.4,1.2,.055,.38,['#b8b49a','#283e32','#355342']);
      var label=project(sx,3.59,sz+.03),axis=project(sx+1,3.59,sz+.03);
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
        glassPane([project(glazingX,.06,back),project(glazingX,.06,front),project(glazingX,top,front),project(glazingX,top,back)],'#b5d7c12e');
        worldLine([[glazingX,.06,back],[glazingX,.06,front],[glazingX,top,front],[glazingX,top,back],[glazingX,.06,back]],'#303c32',.045);
      });
    });
    jobs.push({depth:-Infinity,draw:function(){
      // The mat lies in the exit lane just past the merch cabinet, its arrow pointing on to the door.
      var matX=10.7,matZ=-4.35;
      groundPatch(matX,matZ,1.4,1.9,'#314d3d');
      worldLine([[matX,.055,matZ+.7],[matX,.055,matZ-.7],[matX-.28,.055,matZ-.35]],'#d6c18a',.07);
      worldLine([[matX,.055,matZ-.7],[matX+.28,.055,matZ-.35]],'#d6c18a',.07);
    }});
    // Exterior lighting: sconces on the outer faces of the door posts, a strip under the header, bollards on the approaches
    // and a hooded lamp over the exit. Their spill is drawn once here and again above the night shade.
    exteriorFixtures.sconces.forEach(function(f){add(f.x-.1,f.z,function(){
      drawBox(f.x+.06,f.z,f.y-.14,.08,.22,.3,frame);drawBox(f.x-.12,f.z,f.y-.04,.26,.2,.14,brass);
      var lamp=project(f.x-.14,f.y-.07,f.z);litEllipse(lamp.x,lamp.y,unit*.075,unit*.045,'#fff3d2');
    })});
    // The exit bollards sort with everything else; the entrance pair is painted early, behind the outside queue.
    exteriorFixtures.bollards.filter(function(b){return b.x>-11.5}).forEach(function(b){add(b.x,b.z,function(){drawBollard(b)})});
    add(exitX,exitZ-.3,function(){
      var e=exteriorFixtures.exitLamp;drawBox(e.x,e.z,e.y-.1,.5,.22,.16,brass);drawBox(e.x,e.z+.1,e.y-.02,.14,.1,.2,frame);
      var lamp=project(e.x,e.y-.13,e.z-.02);litEllipse(lamp.x,lamp.y,unit*.085,unit*.05,'#fff3d2');
    });
    add(x-.2,z,function(){warmStrip(exteriorFixtures.entryStrip,false)});
    jobs.push({depth:depthOf({x:x-.3,z:z})+.05,draw:function(){exteriorLightSpill(.7)}});
    jobs.push({depth:depthOf({x:exitX,z:exitZ-.3})+.05,draw:function(){var e=exteriorFixtures.exitLamp;haloLight(e.x,e.y-.14,e.z,.7,.18,'#ffe2a5')}});
    // Threshold and welcome mat lie on the actual customer approach.
    jobs.push({depth:-Infinity,draw:function(){groundPatch(x-.8,z,1.6,2,'#314d3d');drawBox(x,z,.025,.34,2.5,.06,brass)}});
    // The door posts run straight to the slab: a wider brass foot block read as a loose crate beside the ID desk.
    [z-1.2,z+1.2].forEach(function(edge){add(x,edge,function(){drawBox(x,edge,0,.26,.26,3.3,frame)})});
    add(x,z,function(){
      drawBox(x,z,3.3,.26,2.66,.3,frame);
    });
    // Park the glass leaf along the side wall, clear of the entrance lanes.
    add(x-.14,z-1.9,function(){
      var hinge=[x-.14,0,z-1.1],end=[x-.14,0,z-2.75];
      glassPane([project(hinge[0],.12,hinge[2]),project(end[0],.12,end[2]),project(end[0],3.17,end[2]),project(hinge[0],3.17,hinge[2])],'#b5d7c12e');
      worldLine([[hinge[0],.12,hinge[2]],[end[0],.12,end[2]],[end[0],3.17,end[2]],[hinge[0],3.17,hinge[2]],[hinge[0],.12,hinge[2]]],'#2b342e',.075);
      worldLine([[end[0],1.25,end[2]+.18],[end[0],1.85,end[2]+.18]],'#dfc58c',.065);

    });
  }
  function addQueueRails(jobs){

    function post(x,z){jobs.push({depth:depthOf({x:x,z:z}),draw:function(){
      var base=project(x,.05,z),cap=project(x,.85,z);
      // The post's cast shadow leans down-left with the key light before its brass base goes down.
      ellipse(base.x-unit*.17,base.y+unit*.055,unit*.24,unit*.07,'#14201824');
      ellipse(base.x,base.y,unit*.2,unit*.09,'#8a805b');
      worldLine([[x,.06,z],[x,.85,z]],'#c5b382',.065);ellipse(cap.x,cap.y,unit*.095,unit*.08,'#eddaad');
    }})}
    function rope(x1,z1,x2,z2){
      for(var segment=0;segment<12;segment++)(function(t0,t1){
        var x0=x1+(x2-x1)*t0,z0=z1+(z2-z1)*t0,x=x1+(x2-x1)*t1,z=z1+(z2-z1)*t1;
        jobs.push({depth:depthOf({x:(x0+x)/2,z:(z0+z)/2}),draw:function(){
          // The rope's soft shadow lies on the floor, displaced down-left like every other cast shadow.
          worldLine([[x0-.14,.012,z0+.08],[x-.14,.012,z+.08]],'#1420181c',.06);
          worldLine([[x0,.77-.62*t0*(1-t0),z0],[x,.77-.62*t1*(1-t1),z]],'#365846',.07)}});
      })(segment/12,(segment+1)/12);
    }
    // Rails that meet share one post.
    function pen(rails){var posts={};rails.forEach(function(r){[[r[0],r[1]],[r[2],r[3]]].forEach(function(p){var key=p[0].toFixed(3)+','+p[1].toFixed(3);if(!posts[key]){posts[key]=true;post(p[0],p[1])}});rope(r[0],r[1],r[2],r[3])})}
    // Pickup pen: two alternating dividers leave turning pockets matching queueRoute(true).
    var near=4.65,far=1.25;
    pen([[near,5.5,2.5,5.5],[far,6.7,3.4,6.7],[near,4.5,near,7.9],[far,4.5,far,7.9],[near,7.9,2.5,7.9]]);
    // Order pen: three full-width rows, open at the top so the gate's customers walk straight on to any counter, and
    // open at the bottom-left where the tail comes in from the door. Dividers sit between the rows of
    // queueRoute(false), each leaving a pocket at the end the line turns through (right, left, right).
    var ORDER_PEN=orderPen(),right=ORDER_PEN.right+.65,left=ORDER_PEN.left-.65,rows=ORDER_ROWS;
    pen([[left,(ORDER_QUEUE_GATE.z+rows[0])/2,ORDER_PEN.right-.6,(ORDER_QUEUE_GATE.z+rows[0])/2],
         [right,(rows[0]+rows[1])/2,ORDER_PEN.left+.6,(rows[0]+rows[1])/2],
         [left,(rows[1]+rows[2])/2,ORDER_PEN.right-.6,(rows[1]+rows[2])/2],
         [right,6.4,right,rows[2]],[left,(ORDER_QUEUE_GATE.z+rows[0])/2,left,(rows[1]+rows[2])/2]]);
  }
  // The smoking lounge's face. The shelving wall continues left into a speakeasy doorway — dark lacquer with brass
  // mouldings, velvet curtains tied back to a narrow gap that shows a lamp-lit corner of the room, a neon LOUNGE sign on
  // the header — and right to a plain end wall whose back door, under the stairs, lets guests out to the exit. Until
  // the lounge is bought the doorway is boarded, the tube is dark and the site is taped like any other station.
  // The smoking lounge. Its walls are the shop's forest-green plaster with the entrance's glazed green tile on the
  // lower half (cream seams, a cream course on top), like the tiled returns and the column bases. The room is
  // open-topped in the cutaway like every other room, so its left section (past the mezzanine's edge) shows its floor,
  // sofas and lamps from above. A side wall closes the old forecourt between the storefront's rear pilaster and the
  // lounge's front, and the neon LOUNGE blade hangs on that wall's inner face beside the curtain. Guests admitted at
  // the curtain are painted here, behind the drapes, so they slip in between them as they fade.
  var LOUNGE_SIDE={x:-10.65,z0:LOUNGE_FRONT,z1:2.5},LOUNGE_TILE=1.15;
  // The drapes hang closed but for a sliver of lamplight; they draw apart as an admitted guest walks up, and close
  // again over the guest's back as they step through. `loungeCurtain` is the open amount (0 closed, 1 drawn to the
  // jambs), eased toward whatever the guests going in call for.
  var loungeCurtain=0,loungeExitCurtain=0;
  // The back door's drapes: drawn back as a guest's session runs out, held while they fade in on the threshold and
  // take their first steps out, then closed behind them once they are a stride away.
  function loungeExitCurtainTarget(){
    var target=0;
    customers.forEach(function(c){
      if(c.phase==='lounge'&&c.loungeLeft<=.5&&!(c.loungeFade>0))target=1;
      if(c.lounge&&c.phase==='leaving'){var d=Math.hypot(c.x-LOUNGE_EXIT.x,c.z-LOUNGE_EXIT.z);target=Math.max(target,d<.6?1:d<1.3?1-(d-.6)/.7:0)}
    });
    return target;
  }
  function loungeCurtainTarget(){
    var target=0,admitting=loungeAdmission(state.lounge,loungeSeated(),loungeSpareJars()).admit;
    customers.forEach(function(c){
      // Drawn back as a guest who will be let straight in comes down the last stretch, held while they step through,
      // then closed over them.
      if(admitting&&c.phase==='toLounge'&&c.waypoints.length<=1&&c.z<1.6)target=1;
      if(c.phase==='lounge'&&c.loungeFade>0){var p=1-c.loungeFade;target=Math.max(target,p<.4?1:p<.7?1-(p-.4)/.3:0)}
    });
    return target;
  }
  // Inner edge of each drape (top, waist, hem offsets from the door's centre) for an open amount.
  function drapeEdges(open){
    var closed=[.07,.07,.07],drawn=[.42,.56,.48];
    return closed.map(function(v,i){return v+(drawn[i]-v)*open});
  }
  // A guest going in is clipped to the gap between the drapes as it stands — wide while they are drawn back, shut over
  // the guest as they close — and fades out under them at the very end so nothing shows through the rest sliver.
  // Where each pair of drapes hangs: across the entrance, or — wider and taller — on the right wall's outer face at
  // the back door. `pt` maps an offset along the opening and a height to world space, `pr` projects it.
  function drapeGeometry(exit){
    var g=exit?{centre:LOUNGE_EXIT.z,plane:LOUNGE_RIGHT+.19,scale:1.35,top:2.78,open:loungeExitCurtain}:{centre:LOUNGE_DOOR.x,plane:LOUNGE_FRONT+.03,scale:1,top:2.48,open:loungeCurtain};
    g.pt=function(u,y,lift){return exit?[g.plane+(lift||0),y,g.centre+u]:[g.centre+u,y,g.plane+(lift||0)]};
    g.pr=function(u,y){var q=g.pt(u,y);return project(q[0],q[1],q[2])};
    return g;
  }
  function drawGuestThroughDrapes(c,now,exit){
    var g=drapeGeometry(exit),e=drapeEdges(g.open).map(function(v){return v*g.scale}),waist=g.top*.54;
    var gap=[[-e[0],g.top],[e[0],g.top],[e[1],waist],[e[2],.04],[-e[2],.04],[-e[1],waist]].map(function(q){return g.pr(q[0],q[1])});
    ctx.save();ctx.beginPath();ctx.moveTo(gap[0].x,gap[0].y);for(var i=1;i<gap.length;i++)ctx.lineTo(gap[i].x,gap[i].y);ctx.closePath();ctx.clip();
    drawFadedCustomer(c,now);ctx.restore();
  }
  // Velvet drapes: straight and full when closed, gathered to the jambs when drawn, with folds and a hem.
  // `exit` hangs the pair on the right wall's outer face, centred on the back door, instead of across the entrance.
  function drawLoungeDrapes(alpha,open,exit){
    var g=drapeGeometry(exit),e=drapeEdges(open===undefined?g.open:open).map(function(v){return v*g.scale}),pt=g.pt,pr=g.pr;
    var wide=.68*g.scale,T=g.top,W=T*.54;
    if(alpha<=0)return;if(alpha<1){ctx.save();ctx.globalAlpha=alpha}
    [-1,1].forEach(function(side){
      var outer=side*wide,top=side*e[0],waist=side*e[1],hem=side*e[2];
      poly([pr(outer,T),pr(top,T),pr(waist,W),pr(hem,.04),pr(outer,.04)],'#5c1e30');
      worldLine([pt(outer+(top-outer)*.35,T-.08,.005),pt(outer+(waist-outer)*.45,W,.005),pt(outer+(hem-outer)*.4,.1,.005)],'#7d3047',.05);
      worldLine([pt(outer+(top-outer)*.7,T-.08,.005),pt(outer+(waist-outer)*.8,W,.005),pt(outer+(hem-outer)*.75,.1,.005)],'#43121f',.04);
    });
    if(alpha<1)ctx.restore();
  }
  function drawLoungeFront(now){
    var z=DISPLAY_Z,fd=.81,zc=z+.245,face=z+.65,H=3.95,plaster=['#698775','#314b40','#496a56'],tile=['#708b72','#2c4938','#4a6850'],seam='#ccd3b3';
    var velvet=['#6b2436','#3c1220','#8a3448'],darkWood=['#3a2a1e','#1e140e','#2c2016'],open=state.lounge>0,rise=buildRise[7]||0,dx=LOUNGE_DOOR.x;
    var rx=LOUNGE_RIGHT,rface=rx+.16,roomZ=(-7+face)/2,roomD=face+7,side=LOUNGE_SIDE,sideZ=(side.z0+side.z1)/2,sideD=side.z1-side.z0;
    // Tile band painted flat on a wall face — a change of finish, with no ledge on top (only the short half-walls at
    // the entrance have a coping): the face colour from the slab to the band's top, seams every 0.24, a course line.
    function tileFace(alongZ,a0,a1,at){
      var f=at+.004,fill=alongZ?tile[2]:tile[1];
      poly(alongZ?[project(f,0,a0),project(f,0,a1),project(f,LOUNGE_TILE,a1),project(f,LOUNGE_TILE,a0)]:[project(a0,0,f),project(a1,0,f),project(a1,LOUNGE_TILE,f),project(a0,LOUNGE_TILE,f)],fill);
      f+=.004;
      for(var s0=a0+.12;s0<a1-.06;s0+=.24)worldLine(alongZ?[[f,0,s0],[f,LOUNGE_TILE,s0]]:[[s0,0,f],[s0,LOUNGE_TILE,f]],seam,.015);
      worldLine(alongZ?[[f,LOUNGE_TILE*.5,a0],[f,LOUNGE_TILE*.5,a1]]:[[a0,LOUNGE_TILE*.5,f],[a1,LOUNGE_TILE*.5,f]],seam,.014);
    }
    // The room seen from above, past the mezzanine's edge: a plum floor, a rug, two velvet sofas and lamp tables.
    groundPatch(-10.1,roomZ,2.3,roomD,'#2a1b22');
    groundPatch(-10.1,-4.1,1.5,2.3,'#4a2a35');
    [[-5.85,1],[-2.35,-1]].forEach(function(sofa){var sz=sofa[0],dir=sofa[1];drawBox(-10.1,sz,0,1.6,.6,.5,velvet);drawBox(-10.1,sz-dir*.24,.45,1.6,.14,.42,velvet)});
    drawBox(-10.1,-4.1,0,.9,.5,.4,darkWood);
    [[-10.7,-6.6],[-10.7,-1.55],[-9.6,-4.1]].forEach(function(t){drawBox(t[0],t[1],0,.4,.4,.62,darkWood);var lamp=project(t[0],.92,t[1]);(open?litEllipse:ellipse)(lamp.x,lamp.y,unit*.16,unit*.1,open?'#f3c88a':'#6a5a4a');if(open)glow(lamp.x,lamp.y,unit*.8,'#ffb36a44')});
    if(open){var spill=project(dx,.03,-1.3);glow(spill.x,spill.y,unit*.8,'#ff9ab83a',unit*.36)}
    // A red carpet runs out from the curtain, with a short velvet rope on brass stanchions down its right-hand side;
    // the posts and rope sort with the guests who wait on the carpet.
    if(open){
      groundPatch(dx,face+.95,1.1,1.9,'#7a1f2e');groundPatch(dx,face+.95,.96,1.78,'#8e2537');
      worldLine([[dx-.55,.018,face+.02],[dx-.55,.018,face+1.9]],'#c9a45a',.03);worldLine([[dx+.55,.018,face+.02],[dx+.55,.018,face+1.9]],'#c9a45a',.03);
      [[dx+.72,face+.25],[dx+.72,face+1.75]].forEach(function(pt){sceneJobs.push({depth:depthOf({x:pt[0],z:pt[1]}),draw:function(){
        sceneElevation=0;var base=project(pt[0],.05,pt[1]),cap=project(pt[0],.95,pt[1]);
        ellipse(base.x,base.y,unit*.17,unit*.08,'#8d7950');worldLine([[pt[0],.06,pt[1]],[pt[0],.92,pt[1]]],'#d8c18b',.055);ellipse(cap.x,cap.y,unit*.085,unit*.075,'#f0dfb1');
      }})});
      [.72].forEach(function(side){for(var seg=0;seg<8;seg++)(function(t0,t1){
        var z0=face+.25+1.5*t0,z1=face+.25+1.5*t1;
        sceneJobs.push({depth:depthOf({x:dx+side,z:(z0+z1)/2}),draw:function(){sceneElevation=0;worldLine([[dx+side,.84-.3*t0*(1-t0),z0],[dx+side,.84-.3*t1*(1-t1),z1]],'#8b1e34',.075)}});
      })(seg/8,(seg+1)/8)});
    }
    // End walls at the floor's left edge and behind the exit corner, each with its tile band; the back door on the right
    // wall opens on to the exit lane between the column and the merch cabinet.
    drawBox(-11.34,roomZ,0,.32,roomD,H,plaster);
    tileFace(true,-7,face,-11.18);
    drawBox(rx,roomZ,0,.32,roomD,H,plaster);
    tileFace(true,-7,face,rx+.16);
    // The back door: a taller, wider opening than the entrance, dark inside so the drapes never open on to the wall's
    // tiles, with the same velvet pair and pelmet over it.
    var ez=LOUNGE_EXIT.z,eh=2.84,ew=.92;
    poly([project(rface+.01,.02,ez-ew),project(rface+.01,.02,ez+ew),project(rface+.01,eh,ez+ew),project(rface+.01,eh,ez-ew)],'#0d1310');
    worldLine([[rface+.02,.02,ez-ew],[rface+.02,eh,ez-ew],[rface+.02,eh,ez+ew],[rface+.02,.02,ez+ew]],'#171e1a',.07);
    if(open){
      drawLoungeDrapes(1,undefined,true);
      drawBox(rface+.05,ez,eh-.1,.1,ew*2+.04,.14,['#4a1b29','#2b0d16','#3b1420']);
    }else drawBox(rface+.03,ez,0,.05,ew*2-.3,eh-.24,darkWood);
    // The side wall closing the forecourt on the storefront line, from the lounge's front to the rear pilaster.
    drawBox(side.x,sideZ,0,.26,sideD,H,plaster);
    tileFace(true,side.z0,side.z1,side.x+.13);
    // Facade: jamb and header around the doorway, the wall to its right and past the shelving, tiled below.
    if(rise>0){ctx.save();ctx.globalAlpha=.15+.85*(1-rise)}
    drawBox(dx-.94,zc,0,.48,fd,H,plaster);drawBox(dx,zc,2.5,1.4,fd,H-2.5,plaster);drawBox((dx+.7-6.7)/2,zc,0,-6.7-(dx+.7),fd,H,plaster);drawBox((6.7+rx)/2,zc,0,rx-6.7,fd,H,plaster);
    [[dx-1.18,dx-.7],[dx+.7,-6.7],[6.7,rx]].forEach(function(run){tileFace(false,run[0],run[1],face)});
    worldLine([[dx-.74,.02,face+.02],[dx-.74,2.54,face+.02],[dx+.74,2.54,face+.02],[dx+.74,.02,face+.02]],'#171e1a',.07);
    if(open){
      drawLoungeDrapes(1,loungeCurtain);
      drawBox(dx,face-.05,2.44,1.5,.1,.14,['#4a1b29','#2b0d16','#3b1420']);
    }else{
      // Boarded up: a plywood sheet with battens, a COMING SOON stencil and a strip of tape across the frame.
      drawBox(dx,face-.04,0,1.36,.08,2.46,['#c9a874','#7d6240','#a9895c']);
      [dx-.5,dx-.1,dx+.3].forEach(function(bx){worldLine([[bx,.1,face+.03],[bx,2.4,face+.03]],'#8a6b46',.03)});
      wallText(dx,1.55,face+.04,'COMING SOON',unit*1.15,.17,'#5a4a35',false,'800');
      constructionTape([dx-.75,1.05,face+.06],[dx+.75,.95,face+.06]);
    }
    // The neon blade on the side wall's inner face, beside the curtain: a glowing tube when open, dark over the hoarding.
    drawBox(side.x+.145,side.z0+.42,.3,.03,.46,2.2,['#1a1216','#0e090c','#140d10']);
    loungeNeon(open);
    if(rise>0)ctx.restore();
  }
  // The neon LOUNGE blade's glow and letters, on the side wall's inner face beside the curtain; drawn with the lounge
  // front by day and again above the night map.
  function loungeNeon(open){
    var bx=LOUNGE_SIDE.x+.135,bz=LOUNGE_SIDE.z0+.42;
    if(open){var neon=project(bx+.03,1.4,bz);glow(neon.x,neon.y,unit*.62,'#ff8fb87a',unit*1.3)}
    'LOUNGE'.split('').forEach(function(letter,i){var ly=2.28-i*.36;
      if(open){ctx.save();ctx.shadowColor='#ff6fa8';ctx.shadowBlur=unit*.26;wallText(bx+.04,ly,bz,letter,unit*.44,.34,'#ff8fbf',true,'800');ctx.restore();wallText(bx+.042,ly,bz,letter,unit*.44,.34,'#fff4f8',true,'700')}
      else wallText(bx+.04,ly,bz,letter,unit*.44,.34,'#5a4750',true,'800');
    });
  }
  function drawExitCabinet(){
    // Arched display cabinet in the corner between the lounge's right wall and the exit wall: an oak case with a
    // fluted back, three lit glass shelves of merchandise behind a glazed arch, and oak spandrels that turn the
    // rectangular case into a rounded niche. Its rear end sits against the rear wall beside the exit door.
    // Painted with the ground floor, before the stair flight and the structural posts, so those stand in front of it.
    (function(){
      var x=8.66,z=-5.82,half=1.02,r=.98,spring=2.4,faceX=x+.34,cream=['#bc9d73','#6f5943','#998063'],oak=['#c9a56f','#7f6242','#a8875a'];
      drawBox(x,z,.02,.74,half*2+.12,.18,cream);
      drawBox(x-.24,z,.2,.16,half*2,spring+r-.1,oak);
      for(var flute=0;flute<11;flute++){var fz=z-half+.12+flute*.18;worldLine([[x-.155,.26,fz],[x-.155,spring+r-.18,fz]],'#e3c890',.024);worldLine([[x-.155,.26,fz+.06],[x-.155,spring+r-.18,fz+.06]],'#6f5538',.012)}
      [-1,1].forEach(function(side){drawBox(x,z+side*(half+.02),.2,.68,.08,spring+r-.1,cream)});
      for(var row=0;row<3;row++){
        var y=.34+row*.68;
        drawBox(x,z,y,.6,half*2-.12,.05,['#e9e6d8','#aeb0a2','#d0d1c1']);
        worldLine([[x+.29,y+.05,z-half+.1],[x+.29,y+.05,z+half-.1]],'#e8f0e6',.014);
        for(var item=0;item<3;item++)merchandise(x-.02,z-.64+item*.64,y+.05,(row+item)%3,['#527e60','#b28b64','#75999a'][item]);
        litLine([[x+.22,y+.62,z-half+.12],[x+.22,y+.62,z+half-.12]],'#ffe9b8',.018);
        var shelfGlow=project(x+.1,y+.3,z);glow(shelfGlow.x,shelfGlow.y,unit*.8,'#ffe6b01e',unit*.42);
      }
      // Glazed arch over the opening, then the spandrels and the cream rim.
      var opening=[project(faceX,.2,z-r),project(faceX,spring,z-r)];
      for(var t=0;t<=20;t++){var a=Math.PI-t/20*Math.PI;opening.push(project(faceX,spring+Math.sin(a)*r,z+Math.cos(a)*r))}
      opening.push(project(faceX,.2,z+r));glassPane(opening,'#b9d9c51c');
      var spandrel=[project(faceX,spring,z-half-.06),project(faceX,spring+r+.1,z-half-.06),project(faceX,spring+r+.1,z+half+.06),project(faceX,spring,z+half+.06)];
      for(var t=0;t<=20;t++){var a=t/20*Math.PI;spandrel.push(project(faceX,spring+Math.sin(a)*r,z+Math.cos(a)*r))}
      poly(spandrel,'#bc9d73');
      var rim=[[faceX+.005,.2,z-r],[faceX+.005,spring,z-r]];
      for(var t=0;t<=24;t++){var a=Math.PI-t/24*Math.PI;rim.push([faceX+.005,spring+Math.sin(a)*r,z+Math.cos(a)*r])}
      rim.push([faceX+.005,.2,z+r]);
      worldLine(rim,'#bc9d73',.11);worldLine(rim.map(function(q){return [q[0]+.004,q[1],q[2]]}),'#8a6d4b',.02);
      drawBox(x,z,spring+r+.08,.76,half*2+.14,.1,cream);
    })();
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
  function selectionRing(pos,compactCounter){
    var x=pos.x,z=pos.z,edge='#c1e6a1';
    if(!compactCounter&&stationTier(selected)===0){
      var rim=[[x-1.04,1.29,z-.84],[x+1.04,1.29,z-.84],[x+1.04,1.29,z+.84],[x-1.04,1.29,z+.84]];
      poly(rim.map(function(p){return project(p[0],p[1],p[2])}),'#c5edaa16');worldLine(rim.concat([rim[0]]),edge,.04);return;
    }
    // Trace the counter's actual top and exposed faces instead of a floor halo.
    var topX=compactCounter?1.12:1.62,topZ=compactCounter?1.11:1.26,baseX=compactCounter?1.06:1.55,baseZ=compactCounter?1.08:1.26;
    var top=[[x-topX,1.325,z-topZ],[x+topX,1.325,z-topZ],[x+topX,1.325,z+topZ],[x-topX,1.325,z+topZ]];
    poly(top.map(function(p){return project(p[0],p[1],p[2])}),'#c5edaa16');
    worldLine(top.concat([top[0]]),edge,.04);
    worldLine([[x-baseX,1.3,z+topZ],[x-baseX,.04,z+baseZ],[x+baseX,.04,z+baseZ],[x+baseX,1.3,z+topZ]],edge,.04);
    worldLine([[x+baseX,.04,z+baseZ],[x+baseX,.04,z-baseZ],[x+baseX,1.3,z-topZ]],'#c1e6a18c',.03);
    if(!compactCounter&&stationTier(selected)>=2){
      var side=[[x+1.53,1.32,z-1.125],[x+2.35,1.32,z-1.125],[x+2.35,1.32,z+.525],[x+1.53,1.32,z+.525]];
      worldLine(side.concat([side[0]]),edge,.035);
      worldLine([[x+2.35,1.32,z+.525],[x+2.35,.04,z+.525],[x+1.6,.04,z+.525]],'#c1e6a18c',.03);
    }
  }
  function depthOf(pos){return rotate(pos.x,pos.z).z}
  // A single failed frame (for example a zero-width canvas while the page is being laid out) must not stop the scene forever.
  function render(wallNow){var t0=performance.now();try{renderFrame(wallNow);render.frameMs=(render.frameMs||0)*.9+(performance.now()-t0)*.1;window.__canopyFrameMs=render.frameMs;if(render.frameMs>13&&dprCap>2){dprCap=2;resize()}}catch(e){if(!render.failed)console.error('Canopy frame failed; retrying',e);ctx=screenCtx;sceneElevation=0;render.failed=true;render.invalidated=true;requestAnimationFrame(render)}}
  function renderFrame(wallNow){
    if(document.hidden){render.last=wallNow;requestAnimationFrame(render);return}
    keyboardPan(wallNow);
    var frameInterval=state.gameSpeed===0?250:1000/60;
    if(!render.invalidated&&render.drawnAt!==undefined&&wallNow-render.drawnAt<frameInterval-1){requestAnimationFrame(render);return}
    render.drawnAt=wallNow;render.invalidated=false;
    var wallDelta=Math.min(.1,Math.max(0,(wallNow-(render.last===undefined?wallNow:render.last))/1000)),frameDelta=wallDelta*state.gameSpeed;
    render.last=wallNow;
    // A freshly built station rises out of its site on wall time, so the reveal plays at the same pace at every game speed.
    for(var site=0;site<buildRise.length;site++)if(buildRise[site]>0){buildRise[site]=motionPreference.matches?0:Math.max(0,buildRise[site]-wallDelta*1.7);render.invalidated=true}
    animationTime+=frameDelta*1000;for(var task=0;task<6;task++){var target=stationWorking(task)?1:0;taskActivity[task]+=(target-taskActivity[task])*(1-Math.exp(-frameDelta*5));taskClocks[task]+=frameDelta*1000*taskActivity[task]}
    for(var slot=0;slot<4;slot++){var phase=(taskClocks[1]/9000+slot*.23)%1;var targetGrowth=state.stock[1]>=storageCapacity()?1:phase>.86?Math.max(0,(1-phase)/.14):Math.min(1,phase/.72);cropGrowth[slot]+=(targetGrowth-cropGrowth[slot])*(1-Math.exp(-frameDelta*4))}var now=animationTime;
    sceneTime=motionPreference.matches?0:now;
    if(state.empire.activeStore){
      sceneElevation=0;
      drawBranchMap({get ctx(){return ctx},width:width,height:height,unit:unit,project:project,box:drawBox,line:worldLine,poly:poly,ellipse:ellipse,blob:blobEllipse,leaf:leafShape,noise:seedNoise,lit:lit,plant:plant,jar:jar,carton:carton,person:drawPerson,depth:depthOf,backdrop:branchBackdrop,night:nightAmount()>0?branchNight:null},state.empire.activeStore-1,state.empire.stores[state.empire.activeStore-1].level,motionPreference.matches?0:now,state.empire.stores[state.empire.activeStore-1].projects,{lighting:visualLight(),store:state.empire.stores[state.empire.activeStore-1],event:eventStatus(state.empire),rewards:state.empire.rewards,network:state.empire.network,neighborhood:neighborhood(state.empire,state.empire.activeStore-1)});
      // Main-store effects expire while visiting a branch rather than replaying on return.
      particles.forEach(function(p){p.life-=frameDelta*1.5});particles=particles.filter(function(p){return p.life>0});deliveryDrones.forEach(function(d){d.age+=frameDelta});deliveryDrones=deliveryDrones.filter(function(d){return d.age<d.delay+7.5});
      atmosphereFinish(nightAmount());
      glCompose(now);updateBranchMarker();requestAnimationFrame(render);return;
    }
    drawTower(now);
    tierFlashes.forEach(function(life,i){if(life<=0)return;tierFlashes[i]=Math.max(0,life-frameDelta);var station=machinePos[i];ctx.save();ctx.globalAlpha=life*.8;for(var n=0;n<5;n++){var q=project(station.x-1.3+n*.65,station.y+1.6+(motionPreference.matches?0:(1-life)*.5),station.z+.7),r=unit*.09*life;ctx.strokeStyle='#f6e3ae';ctx.lineWidth=Math.max(.7,unit*.025);ctx.beginPath();ctx.moveTo(q.x-r,q.y);ctx.lineTo(q.x+r,q.y);ctx.moveTo(q.x,q.y-r);ctx.lineTo(q.x,q.y+r);ctx.stroke()}ctx.restore()});
    var speed=state.lines.some(function(n){return n>0})?Math.min(.07,.02+production()*.00002):0;
    crateTime=(crateTime+frameDelta*speed*1.4)%1;
    var jobs=sceneJobs;
    customers.forEach(function(c){
      var blend=1-Math.exp(-frameDelta*20),oldX=c.renderX===undefined?c.x:c.renderX,oldZ=c.renderZ===undefined?c.z:c.renderZ;
      c.renderX=oldX+(c.x-oldX)*blend;c.renderZ=oldZ+(c.z-oldZ)*blend;
      var dx=c.renderX-oldX,dz=c.renderZ-oldZ,distance=Math.hypot(dx,dz);
      c.walkPhase=(c.walkPhase||0)+distance*5;
      var strideTarget=frameDelta>0?Math.min(1,distance/frameDelta/2.2):(c.walkAmount||0);
      c.walkAmount=(c.walkAmount||0)+(strideTarget-(c.walkAmount||0))*(1-Math.exp(-frameDelta*10));
      var previousFacing=c.facing===undefined?.3:c.facing;
      var direction=distance>.001?Math.max(-1,Math.min(1,rotate(dx,dz).x/distance)):(c.facing===undefined?.3:c.facing);
      c.facing=(c.facing===undefined?direction:c.facing)+(direction-(c.facing===undefined?direction:c.facing))*(1-Math.exp(-frameDelta*8));
      c.turnLean=(c.turnLean||0)+((c.facing-previousFacing)*1.5-(c.turnLean||0))*(1-Math.exp(-frameDelta*12));
      var serviceIndex=c.ordered?5:4,serviceTarget=c.serviceStation===serviceIndex?Math.min(1,(c.serviceElapsed||0)/economy.customerHandoff(serviceIndex,state.lines[serviceIndex],counterServiceDuration(serviceIndex))):0;
      if(c.visualServiceStation!==serviceIndex){c.serviceVisual=0;c.visualServiceStation=serviceIndex;}c.serviceVisual=(c.serviceVisual||0)+(serviceTarget-(c.serviceVisual||0))*(1-Math.exp(-frameDelta*22));
      var visual=Object.assign({},c,{x:c.renderX,z:c.renderZ});
      if(c.phase==='lounge'){if(c.loungeFade>0)jobs.push({depth:depthOf(visual),draw:function(){drawGuestThroughDrapes(visual,now)}})}
      else if(leaverBehindColumn(c)){}
      else if(c.loungeFadeIn!==undefined&&c.loungeFadeIn<1)jobs.push({depth:depthOf(visual),draw:function(){drawGuestThroughDrapes(visual,now,true)}})
      else if(!customerBehindBuilding(c))jobs.push({depth:depthOf(visual),draw:function(){drawFadedCustomer(visual,now)}})
    });
    if(state.kiosk)Array.from({length:kioskCount()},function(_,index){return index}).forEach(function(index){var dx=index*1.8;jobs.push({depth:depthOf({x:-9.6,z:6.8-dx}),draw:function(){
      function point(x,y,z){return [-9.75+(z-7.95),y,6.8-dx-(x-(-1.3+dx))]}
      function kb(x,z,y,w,d,h,p){var q=point(x,y,z);drawBox(q[0],q[2],y,d,w,h,p)}
      function kp(x,y,z){var q=point(x,y,z);return project(q[0],q[1],q[2])}
      function kl(points,color,w){worldLine(points.map(function(p){return point(p[0],p[1],p[2])}),color,w)}
      var steel=['#424d43','#202c24','#303f32'],oak=['#c6a071','#7c583a','#a27c50'];
      kb(-1.3+dx,7.95,0,.95,.7,.12,steel);kb(-1.3+dx,7.95,.12,.58,.46,1.25,oak);
      // The head is as deep as the pedestal so the two front faces align and the head sits centred over the base.
      kb(-1.3+dx,7.95,1.3,.85,.46,1.05,steel);kb(-1.3+dx,8.195,2.1,.73,.025,.19,['#355444','#263b31','#355444']);
      var serving=customers.find(function(c){return c.kiosk&&(c.kioskIndex||0)===index&&!c.ordered&&Math.hypot(c.x+8.95,c.z-(6.8-dx))<.15});
      var progress=serving?Math.min(1,(serving.orderTime||0)/.65):0;
      // The backlit screen, its bars, the status light and the header label all emit, so they are registered together.
      lit(function(){
        kb(-1.3+dx,8.19,1.4,.69,.018,.85,['#dbe9c5','#dbe9c5','#dbe9c5']);
        kl([[-1.55+dx,2.06,8.21],[-1.05+dx,2.06,8.21]],'#648355',.035);
        kb(-1.3+dx,8.22,1.5,.45,.018,.16,['#71965f','#71965f','#71965f']);
        kb(-1.3+dx,8.225,1.77,.47,.015,.06,['#a9bda1','#a9bda1','#a9bda1']);
        if(progress>0)kb(-1.535+dx+progress*.235,8.24,1.77,.47*progress,.012,.06,['#527c46','#527c46','#527c46']);
        var light=kp(-.98+dx,2.27,8.22);ellipse(light.x,light.y,unit*.035,unit*.035,serving?'#e7c480':'#b7dd96');
        var label=kp(-1.3+dx,2.195,8.215),axis=kp(-.3+dx,2.195,8.215);
        ctx.save();ctx.translate(label.x,label.y);
        // Match both the angle and projected width of the kiosk face.
        ctx.transform((axis.x-label.x)/unit,(axis.y-label.y)/unit,0,1,0,0);
        ctx.beginPath();ctx.rect(-unit*.365,-unit*.095,unit*.73,unit*.19);ctx.clip();
        ctx.fillStyle='#e8edcf';ctx.font='600 '+(unit*.1)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.fillText('SELF ORDER',0,0,unit*.59);ctx.restore();
      });
    }});});
    // Ground planters share guest depth sorting, so foliage occludes people behind it.
    [{x:-10.35,z:5.9,compact:true}].forEach(function(p){
      jobs.push({depth:depthOf(p),draw:function(){
        drawBox(p.x,p.z,0,p.compact?.45:.95,p.compact?.45:1,p.compact?.4:.65,['#bc9d73','#6f5943','#998063']);
        plant(p.x,p.z,p.compact?.4:.65,p.compact?.7:1.1);
      }});
    });
    // Front-of-house display: one long oak case along the front-right of the floor. A planter is built into each end
    // of the plinth, and between them a glass hood covers a back riser of jars with products and merch on the deck.
    function drawDisplayCase(x,z,width){
      jobs.push({depth:depthOf({x:x,z:z}),draw:function(){
        var oak=['#cfb184','#836949','#b09266'],stone=['#e2dfd0','#969c8e','#c3c8b8'],brass=['#d7c28b','#8c774c','#b7a16c'],half=width/2,bed=.95,inner=half-bed;
        drawBox(x,z,0,width,1.35,.85,oak);
        for(var flute=0;flute<Math.floor(width/.185);flute++)worldLine([[x-half+.1+flute*.185,.08,z+.69],[x-half+.1+flute*.185,.78,z+.69]],'#6f593b35',.018);
        drawBox(x,z,.86,width+.14,1.48,.09,stone);
        // Built-in planters: a raised oak curb at each end with a bed of foliage set toward the front. The far (left)
        // bed paints before the glass hood and the near (right) one after it, so foliage never sits behind the glass.
        function planter(side){
          var px=x+side*(half-bed/2),pz=z+.15;
          drawBox(px,z,.95,bed-.1,1.25,.32,oak);drawBox(px,z,1.27,bed-.02,1.33,.05,['#a68a62','#7f6446','#a68a62']);
          var soil=project(px,1.31,z);ellipse(soil.x,soil.y,unit*.4,unit*.26,'#4a3b2e');
          [[0,0,.95],[-.22,.25,.7],[.2,-.28,.75],[.24,.24,.55],[-.24,-.2,.6]].forEach(function(stem,k){
            var sx=px+stem[0],sz=pz+stem[1];worldLine([[sx,1.3,sz],[sx+.04,1.3+stem[2],sz]],'#5e7e45',.035);
            for(var leaf=0;leaf<6;leaf++){var a=leaf*2.399+k,r=.14+(leaf%3)*.09,q=project(sx+Math.cos(a)*r,1.42+stem[2]*.55+leaf*.1,sz+Math.sin(a)*r*.7);ellipse(q.x,q.y,unit*.2,unit*.13,leaf%3===0?'#8fb45c':leaf%3===1?'#6b934f':'#a4c56a')}
          });
        }
        planter(-1);
        // The vitrine between the beds: jars on a back riser, products and merch on the deck, under a glass hood.
        var vx0=x-inner,vx1=x+inner,vw=inner*2;
        drawBox(x,z-.32,.95,vw-.1,.55,.36,oak);
        var jars=Math.max(3,Math.round(vw/.5));for(var n=0;n<jars;n++)jar(x-(jars-1)*.25+n*.5,z-.32,1.32);
        var caseFill=project(x,1.45,z-.32);glow(caseFill.x,caseFill.y,unit*1.1,'#fff0c826',unit*.42);litLine([[vx0+.12,1.83,z-.68],[vx1-.12,1.83,z-.68]],'#fff2cc',.02);
        for(var n=0;n<Math.max(2,Math.round(vw/.9))-1;n++)transportItem(vx0+.45+n*.55,.95,z+.3,3);
        pickupBag(vx1-.45,z+.3,.95);
        // Merch: a stack of folded tees and a cap beside the bags.
        [['#5f8a6e',0],['#e6d2a7',.07],['#3b4b42',.14]].forEach(function(tee){drawBox(vx1-1.05,z+.28,.95+tee[1],.42,.34,.07,[tee[0],tee[0],tee[0]])});
        leafMarkFlat(vx1-1.0,z+.3,1.162,.2);
        var cap=project(vx1-1.55,1.05,z+.3);ellipse(cap.x,cap.y,unit*.16,unit*.11,'#3b4b42');ellipse(cap.x,cap.y-unit*.06,unit*.13,unit*.1,'#5f8a6e');worldLine([[vx1-1.62,.98,z+.34],[vx1-1.42,.98,z+.36]],'#3b4b42',.03);
        bagAppIcon(vx1-1.55,z+.42,1.0,.16);
        for(var tag=0;tag<Math.round(vw/.65);tag++)drawBox(vx0+.35+tag*.6,z+.66,1.05,.2,.012,.12,['#f7f2de','#d4cab3','#e9dfc9']);
        drawBox(x,z,.95,vw+.05,1.4,.95,['#d9eee31d','#b3d4c41b','#c7e5d329']);
        worldLine([[vx0,.96,z+.7],[vx0,1.9,z+.7],[vx1,1.9,z+.7],[vx1,.96,z+.7]],'#c7ddc6',.025);
        worldLine([[vx0,1.9,z+.7],[vx0,1.9,z-.7],[vx1,1.9,z-.7],[vx1,1.9,z+.7]],'#c7ddc6',.02);
        drawBox(x,z-.72,1.86,vw+.1,.06,.05,brass);
        litLine([[vx0+.1,.9,z+.74],[vx1-.1,.9,z+.74]],'#ffdf9e',.035);
        var glowPoint=project(x,1.1,z+.2);glow(glowPoint.x,glowPoint.y,unit*1.5,'#ffe6b022');
        planter(1);
      }});
    }
    drawDisplayCase(DISPLAY_CASE.x,DISPLAY_CASE.z,DISPLAY_CASE.width);
    addIdCheckStation(jobs,now);
    addEntryDoor(jobs);
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
    jobs.sort(function(a,b){return a.depth-b.depth});jobs.forEach(function(job){job.draw()});
    drawDeliveryDrones(frameDelta,now);
    var nightT=render.nightT||0;
    if(nightT>0){
      endNightScene();
      nightLightMap(nightT,now);nightAir(nightT,now);
      ctx.save();ctx.globalAlpha=nightT;nightEmitters(now);ctx.restore();
      nightBloom(nightT,now,nightEmitters);nightMotes(nightT,now);
    }
    for(var i=particles.length-1;i>=0;i--){var p=particles[i];p.life-=frameDelta*1.5;if(!motionPreference.matches){p.x+=p.vx*frameDelta;p.z+=p.vz*frameDelta;p.y+=p.vy*frameDelta;}p.vy-=frameDelta*5;var screen=project(p.x,p.y,p.z),size=Math.max(2,unit*.1);ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.color;ctx.fillRect(screen.x-size/2,screen.y-size/2,size,size);ctx.globalAlpha=1;if(p.life<=0)particles.splice(i,1)}
    drawTickets(frameDelta);drawConfetti(wallDelta);
    atmosphereFinish(nightT);
    glCompose(now);updateMarkers();requestAnimationFrame(render);
  }
  // A final pass over the composed frame: at day a faint warm wash from the key light's corner ties the palette
  // together, and a whisper of world-anchored grain keeps large flat fills reading as material at every zoom.
  function atmosphereFinish(nightT){
    if(nightT<1){
      var sun=cachedGradient('sun|'+q4(width)+'|'+q4(height),function(){var g=ctx.createLinearGradient(width,0,width*.25,height*.8);g.addColorStop(0,'rgba(255,233,190,.075)');g.addColorStop(.5,'rgba(255,233,190,.02)');g.addColorStop(1,'rgba(255,233,190,0)');return g});
      ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=1-nightT;ctx.fillStyle=sun;ctx.fillRect(0,0,width,height);ctx.restore();
    }
    ctx.save();ctx.globalAlpha=.05;ctx.fillStyle=surfaceTexture();ctx.fillRect(0,0,width,height);ctx.restore();
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
      // Each slot fans out on its own heading and bobs on its own phase so a bulk launch reads as separate aircraft.
      var bob=motionPreference.matches?0:Math.sin(t*2.1+slot*1.9)*.07*Math.min(1,lift+travel);
      var x=-10.7-travel*(20+slot*1.6)+(slot%3-1)*.72,z=-.75+travel*(5-(slot%2?1.2:0)+Math.floor(slot/3)*.9)+Math.floor(slot/3)*.62,y=11.10+lift*(2.4+slot*.18)+travel*7+bob;
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
      drawCourierDrone(x,y,z,now,slot,drone.orders);
      ctx.restore();
    }
  }
  function drawCourierDrone(x,y,z,now,slot,orders){
      carton(x,z,y-.9,.62);
      if(orders>1){
        var cargoLabel=project(x,y-.55,z+.36);
        ctx.fillStyle='#f5efd7';ctx.font='600 '+Math.max(9,unit*.23)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.fillText('×'+orders,cargoLabel.x,cargoLabel.y);
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
      // Navigation lights: red to port, green to starboard, and a white strobe on the tail that flashes twice a second.
      var phase=motionPreference.matches?0:now*.002+slot*1.3,strobe=motionPreference.matches?1:((phase%1)<.12||((phase+.2)%1)<.12?1:0),beacon=motionPreference.matches?1:.55+Math.sin(phase*Math.PI*2)*.45;
      [[-.55,-.42,'#ff5a4a',beacon],[.55,-.42,'#5cff8a',beacon],[.05,.3,'#ffffff',strobe]].forEach(function(nav){
        var q=project(x+nav[0],y+.2,z+nav[1]),c=parseHex(nav[2]);
        (nav[3]>.5?litEllipse:ellipse)(q.x,q.y,unit*.04,unit*.04,nav[3]>.5?nav[2]:'#3d4a44');
        if(nav[3]>0)lit(function(){ctx.save();ctx.globalCompositeOperation='screen';ellipse(q.x,q.y,unit*.3,unit*.3,softRadial(q.x,q.y,unit*.3,c,.55*nav[3]));ctx.restore()},'spill')
      });
  }
  // Lounge cover tickets: a little stub that rises from the curtain and fades as the entry fee lands in the till.
  var tickets=[];
  function drawTickets(dt){
    for(var i=tickets.length-1;i>=0;i--){
      var t=tickets[i];t.life-=dt*.7;t.y+=dt*.55;if(t.life<=0){tickets.splice(i,1);continue}
      var p=project(t.x,t.y,t.z),w=Math.max(28,unit*.95),h=Math.max(14,unit*.4),x0=p.x-w/2,y0=p.y-h/2,notch=w*.28;
      ctx.save();ctx.globalAlpha=Math.min(1,t.life*2.5);
      ctx.beginPath();roundedRectPath(x0,y0,w,h,h*.25);ctx.fillStyle='#f4e7bd';ctx.fill();ctx.strokeStyle='#8d7950';ctx.lineWidth=Math.max(1,unit*.018);ctx.stroke();
      ctx.beginPath();ctx.setLineDash([Math.max(1,unit*.03),Math.max(1,unit*.03)]);ctx.moveTo(x0+notch,y0+h*.12);ctx.lineTo(x0+notch,y0+h*.88);ctx.strokeStyle='#8d795088';ctx.stroke();ctx.setLineDash([]);
      ctx.fillStyle='#1f4a37';ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.font='800 '+Math.max(7,h*.5)+'px "Bricolage Grotesque",sans-serif';ctx.fillText('$',x0+notch/2,p.y+h*.02);
      ctx.font='800 '+Math.max(8,h*.58)+'px "Bricolage Grotesque",sans-serif';ctx.fillText(t.text,x0+notch+(w-notch)/2,p.y+h*.02,w-notch-4);
      ctx.restore();
    }
  }
  function burst(worldPos,color){if(motionPreference.matches)return;for(var i=0;i<12;i++)particles.push({x:worldPos.x,y:1.4+(worldPos.y||0),z:worldPos.z,vx:(Math.random()-.5)*1.8,vz:(Math.random()-.5)*1.8,vy:1.6+Math.random()*1.8,life:1,color:color||colors.acid})}

  var markerEls=LINES.map(function(line,i){var b=document.createElement('button');b.className='marker';b.dataset.marker=String(i);b.textContent=line.name;b.onclick=function(){if(!state.lines[i]&&isOpen(i))buildStation(i);else selectMachine(i)};$('markers').appendChild(b);return b});
  var securityMarker=document.createElement('button');securityMarker.className='marker';securityMarker.dataset.marker='security';securityMarker.onclick=function(){if(!state.doorBuilt)buildStation('door');else selectSecurity()};$('markers').appendChild(securityMarker);
  var loungeMarker=document.createElement('button');loungeMarker.className='marker';loungeMarker.dataset.marker='lounge';loungeMarker.onclick=selectLounge;$('markers').appendChild(loungeMarker);
  function updateCommerceControls(){
    if($('buyAutoDrone')){var drone=state.autoDrone,dronePrice=drone.owned?BULK_DRONE_COST:AUTO_DRONE_COST;
      $('buyAutoDrone').disabled=drone.bulk||state.money<dronePrice;$('autoDronePrice').textContent=drone.bulk?'Installed':fmt(dronePrice);$('buyAutoDrone').querySelector('span').textContent=drone.owned?'Bulk upgrade':'Install';$('autoDroneBenefit').textContent=drone.owned?'Up to 10 ready orders every 10s':'Send a ready order every 10s';
      $('autoDroneToggle').disabled=!drone.owned&&state.money<AUTO_DRONE_COST;$('autoDroneToggle').textContent=!drone.owned?'Install '+fmt(AUTO_DRONE_COST):drone.enabled?'On':'Off';if(drone.owned)$('autoDroneToggle').setAttribute('aria-pressed',String(drone.enabled));else $('autoDroneToggle').removeAttribute('aria-pressed');$('autoDroneToggle').setAttribute('aria-label',drone.owned?'Automatic drone dispatch':('Install auto drone for '+fmt(AUTO_DRONE_COST)));
      $('autoDroneBulk').hidden=!drone.owned;$('autoDroneBulk').disabled=!drone.bulk&&state.money<BULK_DRONE_COST;$('autoDroneBulk').textContent=drone.bulk?(drone.mode==='bulk'?'Bulk · up to 10':'Single · 1 order'):'Upgrade to bulk · '+fmt(BULK_DRONE_COST);if(drone.bulk)$('autoDroneBulk').setAttribute('aria-pressed',String(drone.mode==='bulk'));else $('autoDroneBulk').removeAttribute('aria-pressed');$('autoDroneBulk').setAttribute('aria-label',drone.bulk?'Bulk automatic dispatch':('Upgrade auto drone to bulk for '+fmt(BULK_DRONE_COST)));
      $('autoDroneStatus').textContent=!drone.owned?'A ready order every 10s':!drone.enabled?'Manual dispatch':state.gameSpeed===0?'Paused':drone.remaining>.05?'Next check in '+Math.ceil(drone.remaining)+'s':state.stock[3]<onlineSize()?'Waiting for '+(onlineSize()-state.stock[3])+' jars':'Ready to launch';}

    if(shopBrowser)shopBrowser.render();
  }
  function updateMarkers(){
    var key=[centerX,centerY,unit,width,height,state.idStaff,state.lines.join(),securitySelected,selected,state.lounge,loungeSelected].join("|");
    if(updateMarkers.key===key)return;updateMarkers.key=key;
    var securityPos=project(-9.1,.62,9.91),loungePos=project(LOUNGE_DOOR.x,1.5,DISPLAY_Z+.5),labelSize=Math.max(8,Math.min(10,unit*.24))*(width>=780?.85:1)+'px';
    securityMarker.style.fontSize=labelSize;loungeMarker.style.fontSize=labelSize;
    var labels=[{el:securityMarker,x:securityPos.x,y:securityPos.y},{el:loungeMarker,x:loungePos.x,y:loungePos.y}];
    markerEls.forEach(function(el,i){var station=machinePos[i],pos=project(station.x,.63+station.y,station.z+1.23);el.style.fontSize=labelSize;labels.push({el:el,x:pos.x,y:pos.y})});
    labels.forEach(function(l){l.el.style.display=l.x<-40||l.x>width+40||l.y<-30||l.y>height+30?'none':'block'});
    labels.forEach(function(l){l.w=l.el.offsetWidth;l.h=l.el.offsetHeight});
    // Keep labels from stacking: later (lower) labels slide down until they clear any earlier one they overlap.
    var gap=4;labels.sort(function(a,b){return a.y-b.y});
    for(var pass=0;pass<2;pass++)for(var i=1;i<labels.length;i++){var a=labels[i];if(a.el.style.display==='none')continue;for(var j=0;j<i;j++){var b=labels[j];if(b.el.style.display==='none')continue;
      if(Math.abs(a.x-b.x)<(a.w+b.w)/2+gap&&Math.abs(a.y-b.y)<(a.h+b.h)/2+gap)a.y=b.y+(a.h+b.h)/2+gap}}
    labels.forEach(function(l){l.el.style.transform='translate3d('+l.x+'px,'+l.y+'px,0) translate(-50%,-50%)'})}
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
    if(i===4)return state.stock[4]>=readyCapacity()?'Ready storage full':state.stock[3]<1?'Waiting for packed '+unitWord(2):'Preparing pickup bags';
    var held=customers.filter(function(c){return c.ordered&&!c.bag}).length,heldNote=held>1?' · '+held+' orders held':held===1?' · 1 order held':'';
    if(state.stock[4]<1)return 'Waiting for ready bags'+heldNote;
    return (customers.some(function(c){return c.ordered&&!c.bag&&c.phase==='pickup'&&Math.hypot(c.x-4,c.z-4.9)<.15})?'Serving a customer':'Waiting for a customer at the counter')+heldNote;
  }
  function renderUI(periodic){
    if(document.hidden)return;
    if(!periodic)render.invalidated=true;
    var chapters=advanceJourney(state);
    if(journeyUI){journeyUI.render();chapters.forEach(function(id){telemetry.send('chapter_complete',{chapter:id})});if(chapters.length&&!document.body.classList.contains('guide-open'))notify('CHAPTER COMPLETE · '+CHAPTERS.find(function(c){return c.id===chapters[chapters.length-1]}).title,'upgrade');}
    renderEmpire();
    renderFlowers();renderComponents();
    var night=visualLight().darkness>.15;lightToggle.setAttribute('aria-label',night?'Switch to daytime lighting':'Switch to nighttime lighting');lightToggle.setAttribute('aria-pressed',String(night));lightToggle.title=night?'Night lighting · switch to day':'Day lighting · switch to night';var lightIcon=night?'<path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10Z"/>':'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>';if(lightToggle.dataset.mode!==String(night)){lightToggle.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+lightIcon+'</svg>';lightToggle.dataset.mode=String(night)}
    var slow=slowestStation(),shortNames=['Seeds','Grow','Harvest','Pack','Orders','Pickup'],trafficBound=isTrafficBound(slow);
    var flowIconSource=trafficBound?null:machineTabs[slow]&&machineTabs[slow].querySelector('.station-icon');
    if(flowIconSource&&$('flowIcon').dataset.station!==String(slow)){$('flowIcon').innerHTML=flowIconSource.outerHTML;$('flowIcon').dataset.station=String(slow)}
    if(trafficBound&&$('flowIcon').dataset.station!=='traffic'){$('flowIcon').innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="5" r="2"/><circle cx="17" cy="6" r="2"/><path d="M7 21v-6l-2-3 3-4h2l2 3h3M15 21v-5l-2-3 2-4h2l3 3"/></svg>';$('flowIcon').dataset.station='traffic'}
    $('flowLabel').textContent=state.gameSpeed===0?'Paused':'Bottleneck';
    // Say why it is the bottleneck: how far behind the next-slowest station it runs, not a bare rate.
    var rates=LINES.map(function(_,i){return state.lines[i]?stationThroughput(i):Infinity}),slowRate=rates[slow],others=rates.filter(function(r,i){return i!==slow&&isFinite(r)}),nextRate=others.length?Math.min.apply(null,others):null,nextName=nextRate!==null?shortNames[rates.indexOf(nextRate)]:'';
    var behind=nextRate?Math.round((1-slowRate/nextRate)*100):0,footTraffic=basketSize()/arrivalInterval();
    $('flowText').textContent=trafficBound?'Foot traffic · '+Math.round((1-footTraffic/slowRate)*100)+'% below capacity':behind>0?shortNames[slow]+' trails '+nextName+' by '+behind+'%':shortNames[slow]+' · slowest station';
    $('flowText').title=(trafficBound?'Customers arrive at '+footTraffic.toFixed(1)+'/s but the counters can serve '+slowRate.toFixed(1)+'/s. ':shortNames[slow]+' moves '+slowRate.toFixed(1)+'/s; '+nextName+' can do '+(nextRate||0).toFixed(1)+'/s, so everything queues here. ')+'Estimates include batches, handoff time and kiosks.';
    var fix=trafficBound?trafficFix():null,fixPrice=trafficBound?(fix?fix.price:0):cost(slow),canFix=fixPrice>0&&state.money>=fixPrice;
    $('flowAction').textContent=state.gameSpeed===0?'Resume':trafficBound?(fix?fix.name+' · '+fmt(fixPrice):'Open Shop'):canFix?'Fix · '+fmt(fixPrice):'Needs '+fmt(fixPrice);$('flowAction').dataset.mode=state.gameSpeed===0||!canFix?'view':'fix';
    // While the shop is still a building site the guide row counts sites instead of naming a bottleneck.
    if(!state.shopOpen){var raised=(state.doorBuilt?1:0)+state.lines.filter(function(n){return n>0}).length,nextSite=!state.doorBuilt?'Security':raised<7?shortNames[slow]:null;$('flowLabel').textContent='Under construction';$('flowText').textContent=raised+' of 7 sites raised'+(nextSite?' · next: '+nextSite:' · ready to open');$('flowText').title='Tap a site on the map to raise it. Customers arrive once the shop opens.';$('flowAction').textContent=nextSite?'Build '+nextSite:'Open the shop';$('flowAction').dataset.mode='fix'}
    var line=LINES[selected],open=isOpen(selected),level=state.lines[selected],price=cost(selected),affordable=open&&(!level||state.money>=price);
    $('rate').dataset.paused=String(state.gameSpeed===0);$('money').textContent=fmt(state.money);$('rate').textContent=state.gameSpeed===0?'Paused':fmt((state.empire.activeStore?storeRate(state.empire,state.empire.activeStore-1):production()+branchRate(state.empire))*state.gameSpeed)+'/s';document.querySelector('.stat.output small').textContent=state.empire.activeStore?'BRANCH INCOME':'CAPACITY';
    var paused=state.gameSpeed===0;speedButtons.forEach(function(button){var value=Number(button.getAttribute('data-speed'));button.setAttribute('aria-pressed',String(value===state.gameSpeed||(value===1&&paused)))});
    var glyph=paused?'pause':'play';if(speedOne.getAttribute('data-glyph')!==glyph){speedOne.setAttribute('data-glyph',glyph);speedOne.innerHTML=paused?PAUSE_GLYPH:PLAY_GLYPH}speedOne.setAttribute('aria-label',paused?'Paused. Resume normal speed':'Normal speed. Press again to pause');speedOne.title=paused?'Paused · press to resume':'Normal speed · press again to pause';speedOne.parentElement.setAttribute('data-paused',String(paused));
    if(securitySelected){renderSecuritySelection()}else if(loungeSelected){renderLoungeSelection()}else{
    $('machineNumber').textContent=!open?'BUILD PREVIOUS STAGE':level?'STAGE 0'+(selected+1)+' · '+stationStatus(selected):'STAGE 0'+(selected+1)+' · UNDER CONSTRUCTION';
    $('machineName').textContent=line.name;$('machineLevel').textContent=level;$('machineRate').textContent=!level?'Under construction':selected<4?batchSize(selected).toFixed(1)+' avg / batch · '+([2,3,2,2][selected]/cycleSpeed(selected)).toFixed(1)+'s':capacity(selected).toFixed(1)+'× service';
    var tier=stationTier(selected),next=nextCapacity(selected);
    // Stat strip: a colour-coded status chip, then icon tiles instead of a sentence.
    var statusText=level?stationStatus(selected):'Under construction',statusTone=!level?'wait':/full/i.test(statusText)?'stop':/waiting/i.test(statusText)?'wait':'go',statusWord=!level?'Site':/full/i.test(statusText)?'Full':/waiting/i.test(statusText)?'Waiting':selected<4?'Producing':'Serving',heldMatch=/(\d+) orders? held/.exec(statusText);if(heldMatch)statusWord+=' · '+heldMatch[1]+' held';
    var tierFrom=TIER_LEVELS[tier],tierTo=tier<6?TIER_LEVELS[tier+1]:null,tierPct=tierTo?Math.round((level-tierFrom)/(tierTo-tierFrom)*100):100;
    var ICON_BATCH='<svg viewBox="0 0 24 24"><path d="M4 8h16v11H4zM4 8l3-4h10l3 4M12 4v4"/></svg>',ICON_CLOCK='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>',ICON_TIER='<svg viewBox="0 0 24 24"><path d="M12 3l2.4 5.2 5.6.7-4.1 3.9 1.1 5.7L12 15.8 7 18.5l1.1-5.7L4 8.9l5.6-.7z"/></svg>',ICON_LANES='<svg viewBox="0 0 24 24"><path d="M5 5v14M12 5v14M19 5v14"/></svg>';
    var tiles=!level?'<span class="stat" title="Nothing to measure until the station is built">'+(selected<4?ICON_BATCH:ICON_CLOCK)+'<b>—</b><small>'+(selected<4?'per batch':'per customer')+'</small></span><span class="stat" title="Raise the site to see its output">'+(selected<4?ICON_CLOCK:ICON_LANES)+'<b>—</b><small>'+(selected<4?'per cycle':'counters')+'</small></span>':selected<4?
      '<span class="stat" title="Units finished each time the station completes a batch">'+ICON_BATCH+'<b>'+(selected===3?qtyShort(Math.round(batchSize(selected))):compactCount(batchSize(selected)))+'</b><small>per batch</small></span><span class="stat" title="Time to complete one batch">'+ICON_CLOCK+'<b>every '+secondsLabel([2,3,2,2][selected]/cycleSpeed(selected))+'</b></span>':
      '<span class="stat" title="Time to serve one customer">'+ICON_CLOCK+'<b>'+secondsLabel(economy.customerHandoff(selected,level,counterServiceDuration(selected))/Math.max(1,state.gameSpeed))+'</b><small>per customer</small></span><span class="stat" title="Individually staffed counters">'+ICON_LANES+'<b>'+(selected===4?state.orderCounters:1)+'</b><small>'+((selected===4?state.orderCounters:1)===1?'counter':'counters')+'</small></span>';
    var tierTile=tierTo?'<span class="stat tier" title="Output doubles at level '+tierTo+'">'+ICON_TIER+'<b>×2</b><small>at Lv '+tierTo+'</small><i class="tier-bar"><i style="width:'+tierPct+'%"></i></i></span>':'<span class="stat tier">'+ICON_TIER+'<b>Flagship</b><small>top tier</small></span>';
    var statusHtml='<span class="status-chip" data-tone="'+statusTone+'" title="'+statusText.replace(/"/g,'')+'"><i></i>'+statusWord+'</span>'+tiles+tierTile;
    if($('stationStatus').dataset.html!==statusHtml){$('stationStatus').innerHTML=statusHtml;$('stationStatus').dataset.html=statusHtml}
    $('upgradeLevel').textContent='Lv '+level+' → '+(level+1);
    $('stationTier').textContent=STATION_TIERS[tier];$('stationTier').style.color=TIER_COLORS[tier];
    $('upgradeFunding').textContent=!open?'Build previous station':!level?'Ready to build':affordable?'Ready to upgrade':fmt(Math.max(0,price-state.money))+' to go';
    $('upgradeProgress').value=!level?100:Math.min(100,state.money/price*100);
    $('upgradeProgress').setAttribute('aria-valuetext',!level?'Ready to build':affordable?'Upgrade ready':fmt(Math.max(0,price-state.money))+' needed for level '+(level+1));
    var lanesNow=economy.counterLanes(level),lanesNext=economy.counterLanes(level+1);
    if(selected<4){
      var batchBoost=selected<3?1+state[['seedBatchLevel','growBatchLevel','harvestBatchLevel'][selected]]*.06:1;
      renderUpgradeComparison('Units per batch',level?batchSize(selected):0,economy.batchSize(level+1)*batchBoost,false,!level,false);
    }else{
      var handoffNow=economy.customerHandoff(selected,level,counterServiceDuration(selected)),handoffNext=economy.customerHandoff(selected,level+1,counterServiceDuration(selected,next));
      if(level&&handoffNow<=economy.HANDOFF_FLOOR[selected]&&handoffNext<=economy.HANDOFF_FLOOR[selected]){
        // Hands are as quick as they get: what a level buys now is the basket — every other order-desk level, and the
        // retail tier once both counters reach it — so the card compares that instead of a 1.00000 → 1.00000 handoff.
        var basketAt=function(at){var lines=state.lines.slice();lines[selected]=at;return Math.max(1,Math.round(economy.basketSize(lines)*(1+state.basketLevel*.04)))};
        var basketNow=basketAt(level),basketNext=basketAt(level+1),nextGain=level+1;
        while(nextGain<level+60&&basketAt(nextGain)<=basketNow)nextGain++;
        // Pickup only moves the basket through the retail tier, which both counters have to reach.
        var retail=economy.retailTier(state.lines),laterGain=basketAt(nextGain)>basketNow?'+1 at Lv '+nextGain:retail<TIER_LEVELS.length-1?'×2 when both counters reach Lv '+TIER_LEVELS[retail+1]:'';
        renderUpgradeComparison('Units per basket',basketNow,basketNext,false,false,false,{gain:function(before,after){return after>before?'+'+(after-before)+' per basket':'Same basket'+(laterGain?' · '+laterGain:'')}});
      }else renderUpgradeComparison('Seconds per handoff',handoffNow/Math.max(1,state.gameSpeed),handoffNext/Math.max(1,state.gameSpeed),true,!level,false);
    }
    paintUpgradePreview(selected);
    $('nextAppearance').textContent=(tier?'Tier bonus ×'+economy.tierBoost(level)+' · ':'')+(tier<6?'Output ×2 and new look at level '+TIER_LEVELS[tier+1]+' · '+STATION_TIERS[tier+1]+(selected>=4?' · both counters at a tier double baskets':''):'Flagship equipment · upgrades keep increasing output');
    $('machineCost').textContent=level?fmt(price):'FREE';$('buyMachine').disabled=!affordable;$('buyMachine').querySelector('span').textContent=!open?'LOCKED':level?'UPGRADE':'BUILD';
    var maxUpgrade=level?maxStationUpgrade(selected):{levels:0,cost:0};
    $('buyMachineMax').disabled=!maxUpgrade.levels;
    $('machineMaxLabel').textContent='MAX'+(maxUpgrade.levels?' +'+maxUpgrade.levels+' LV':'');
    $('machineMaxCost').textContent=maxUpgrade.levels?fmt(maxUpgrade.cost):'—';
    $('buyMachineMax').setAttribute('aria-label','Upgrade '+line.name+' by '+maxUpgrade.levels+' levels for '+fmt(maxUpgrade.cost));
    $('buyMachine').style.setProperty('--funded',(!level?100:Math.min(100,state.money/price*100))+'%');
    $('upgradeHint').textContent=!open?'Build '+LINES[selected-1].name.toLowerCase()+' first.':!level?'Under construction · tap the site on the map, or Build here, to raise it.':!affordable?fmt(price-state.money)+' to go · customer sales earn cash automatically.':selected<4?'Larger batches per cycle. Train employees to shorten each cycle.':'Upgrade for faster '+['','','','','order preparation','customer service'][selected]+'.';
    $('upgradeHint').classList.toggle('ready',affordable);
    if(selected===4&&level)$('upgradeHint').textContent+=' Training applies to all '+state.orderCounters+' counters. Baskets: '+qtyLabel(basketSize())+' per customer (+1 every 2 desk levels). Queue: '+queueLimit()+' customers · every 2 desk or employee upgrades adds a place (max 12).';
    }
    renderOrderCounters();
    var doorSite=!state.doorBuilt,doorKey=doorSite?'site':String(state.idStaff);
    securityMarker.classList.add('station-sign');securityMarker.classList.toggle('selected',securitySelected);securityMarker.classList.toggle('is-site',doorSite);securityMarker.classList.toggle('can-upgrade',!doorSite&&state.idStaff<10000&&state.money>=Math.floor(20*Math.pow(1.6,state.idStaff)));if(securityMarker.dataset.level!==doorKey){securityMarker.innerHTML='<span class=station-sign-name>Security</span><span class=station-sign-level>'+(doorSite?'Build':'Lv '+state.idStaff)+'</span>';securityMarker.dataset.level=doorKey;updateMarkers.key=null;}securityMarker.style.setProperty('--station-tier',TIER_COLORS[state.idStaff>=25?3:state.idStaff>=10?2:1]);securityMarker.setAttribute('aria-label',doorSite?'Security, under construction. Build the door':'Security, level '+state.idStaff+'. Open security station');securityMarker.setAttribute('aria-pressed',String(securitySelected));
    var loungeLot=!state.lounge,loungePrice=loungeUpgradeCost(state.lounge),loungeKey=String(state.lounge)+'|'+(loungePrice!==null&&state.money>=loungePrice);
    loungeMarker.classList.add('station-sign');loungeMarker.classList.toggle('selected',loungeSelected);loungeMarker.classList.toggle('is-lot',loungeLot);loungeMarker.classList.toggle('can-upgrade',loungePrice!==null&&state.money>=loungePrice);
    if(loungeMarker.dataset.level!==loungeKey){loungeMarker.innerHTML='<span class=station-sign-name>Lounge</span><span class=station-sign-level>'+(loungeLot?'Open · '+fmt(loungePrice):'Lv '+state.lounge)+'</span>';loungeMarker.dataset.level=loungeKey;updateMarkers.key=null;}
    loungeMarker.style.setProperty('--station-tier',TIER_COLORS[Math.min(3,state.lounge)]);loungeMarker.setAttribute('aria-label',loungeLot?'Smoking lounge, under construction. Opens for '+fmt(loungePrice):'Smoking lounge, level '+state.lounge+'. Open lounge station');loungeMarker.setAttribute('aria-pressed',String(loungeSelected));
    var idPrice=Math.floor(20*Math.pow(1.6,state.idStaff)),idMax=idTrainingQuote(10000);
    $('idEmployeeInfo').innerHTML='<span>Lv '+state.idStaff+'</span><span>'+(securityDuration()).toFixed(2)+'s / check</span>';
    $('trainIdChecker').disabled=state.money<idPrice||state.idStaff>=10000;
    $('trainIdChecker').querySelector('span').textContent='+'+Math.round(.3/(1+state.idStaff*.3)*100)+'%';$('trainIdChecker').querySelector('b').textContent=fmt(idPrice);
    $('trainIdCheckerMax').disabled=!idMax.levels;$('trainIdCheckerMax').querySelector('span').textContent=idMax.levels?'+'+idMax.levels+' lv':'Maxed';$('trainIdCheckerMax').querySelector('b').textContent=idMax.levels?fmt(idMax.cost):'—';
    LINES.forEach(function(line,i){var quote=maxStaffTraining(i),button=$('staffMax'+i);button.disabled=!quote.levels;button.querySelector('span').textContent=quote.levels?'+'+quote.levels+' lv':'Maxed';button.querySelector('b').textContent=quote.levels?fmt(quote.cost):'—';button.setAttribute('aria-label','Train '+line.name+' employee by '+quote.levels+' levels for '+fmt(quote.cost))});
    staffButtons.forEach(function(button,i){button.disabled=!state.lines[i]||state.money<staffCost(i);button.querySelector('b').textContent=fmt(staffCost(i));button.querySelector('span').textContent='+'+Math.round(.3/(1+state.staff[i]*.3)*100)+'%';$('employeeInfo'+i).innerHTML='<span>Lv '+state.staff[i]+'</span><span>'+(1+state.staff[i]*.3).toFixed(1)+'× speed'+'</span>';button.title=state.money<staffCost(i)?fmt(staffCost(i)-state.money)+' more needed':'Train '+shortNames[i]+' employee';button.setAttribute('aria-label','Train '+shortNames[i]+' employee, '+button.querySelector('span').textContent+', '+fmt(staffCost(i)));});
    var installedKiosks=kioskCount(),nextKioskPrice=[25000,50000,100000][installedKiosks];
    $('kioskCountLabel').textContent=installedKiosks+' / 3 installed';
    $('buyKiosk').disabled=installedKiosks===3||state.money<nextKioskPrice;
    $('kioskPrice').textContent=installedKiosks===3?'Installed':fmt(nextKioskPrice);
    $('kioskInfo').textContent=installedKiosks===3?'All three kiosks open. Customers choose the shorter line.':installedKiosks===0?'Add self-order service alongside the counter.':'Add kiosk '+(installedKiosks+1)+' to serve more customers at once.';
    $('buyKiosk').querySelector('span').textContent=installedKiosks===3?'Maximum':installedKiosks===0?'Install kiosk':'Add kiosk '+(installedKiosks+1);

    $('queueCapacity').textContent=queueLimit()>=QUEUE_MAX?QUEUE_MAX+' customers · maximum':queueLimit()+' → '+Math.min(QUEUE_MAX,queueLimit()+2)+' customers';$('queueUpgradeInfo').textContent=queueLimit()>=QUEUE_MAX?'All waiting places unlocked.':state.money<queueCost()?fmt(queueCost()-state.money)+' more to expand':'Two extra waiting places';$('queuePrice').textContent=queueLimit()>=QUEUE_MAX?'MAX':fmt(queueCost());$('upgradeQueue').disabled=queueLimit()>=QUEUE_MAX||state.money<queueCost();
    $('storageCapacity').textContent=qtyLabel(storageCapacity())+' → '+qtyLabel(storageCapacity()+100)+' per stage';$('storageUsage').textContent=qtyLabel(state.stock[3])+' / '+qtyLabel(storageCapacity())+(state.storageLevel<20&&state.money<storageCost()?' · '+fmt(storageCost()-state.money)+' to expand':' stored');$('storageFill').max=storageCapacity();$('storageFill').value=state.stock[3];$('storagePrice').textContent=state.storageLevel>=20?'MAX':fmt(storageCost());$('upgradeStorage').disabled=state.storageLevel>=20||state.money<storageCost();if(state.storageLevel>=20)$('storageCapacity').textContent=storageCapacity()+' per stage · maximum';
    // One send: everything shippable, or up to ten at a time until the packing bar reaches level 10.
    var maxUnlocked=state.lines[3]>=10,maxBatch=onlineBatch(maxUnlocked?Infinity:10);
    $('fulfillOnlineMax').disabled=!maxBatch.count;$('onlineMaxLabel').textContent=maxBatch.count?'Send '+maxBatch.count+(maxBatch.count===1?' order':' orders'):'Nothing to send';$('onlineMaxReward').textContent=maxBatch.count?fmt(maxBatch.reward):'';$('onlineMaxInfo').textContent=maxBatch.count?qtyLabel(maxBatch.jars)+(maxUnlocked?'':' · up to 10 per launch until Pack Lv 10'):(onlineRequestsReady()?'Needs '+qtyLabel(onlineSize())+' packed':'No requests waiting');

    var built=deliveryBuilt();if(!built&&activeTray==='orders')paintDeliveryPreview();$('deliverySite').style.display=built?'none':'';$('buildDelivery').disabled=state.money<AUTO_DRONE_COST;$('deliveryFunding').value=Math.min(100,state.money/AUTO_DRONE_COST*100);$('deliveryFundingText').textContent=state.money>=AUTO_DRONE_COST?'Ready to build':fmt(state.money)+' saved · '+fmt(AUTO_DRONE_COST-state.money)+' to go';['.online-card','#dispatchHint','.auto-drone-control','.dispatch-stats'].forEach(function(sel){document.querySelector('[data-pane="orders"] '+sel).style.display=built?'':'none'});
    $('onlineTitle').textContent='#'+String(state.onlineCompleted+1).padStart(3,'0');$('onlineNeed').textContent=qtyLabel(onlineSize())+(state.productMenu.active===0?' ':' · ')+STRAINS[menuChoice(state.onlineCompleted)].name;$('receiptUnit').textContent=fmt(onlineValue())+' / '+unitShort();$('receiptFormat').textContent=format().name;$('receiptTotal').textContent=fmt(onlineSize()*onlineValue());var heldBags=customers.filter(function(c){return c.ordered&&!c.bag}).length;$('onlineStock').textContent=heldBags?heldBags+' walk-in bag'+(heldBags===1?'':'s')+' reserved first':'';renderDispatchDesk(maxBatch.count);$('dispatchHint').textContent=onlineRequestsReady()<1?'Waiting for the next web request. Requests arrive faster as you complete orders, and with Web marketing in the Shop.':state.stock[3]<onlineSize()?'Waiting for '+qtyLabel(onlineSize()-state.stock[3])+' more to be packed. Walk-in pickups stay reserved.':'';
    // The caption under the send button doubles as the hint line, so the card never changes height.
    if($('dispatchHint').textContent){$('onlineMaxInfo').textContent=$('dispatchHint').textContent;$('onlineMaxInfo').classList.add('is-hint')}else $('onlineMaxInfo').classList.remove('is-hint');var webItem=$('stockCountOnline').closest('.stock-item'),webCount=onlineRequestsReady();$('stockCountOnline').textContent=webCount;webItem.dataset.heat=String(requestHeat(webCount));$('stockCountOnline').classList.toggle('stock-full',webCount>=onlineRequestCap());webItem.title=webCount+' deliver'+(webCount===1?'y':'ies')+' requested · '+onlineRequestCap()+' max';$('onlineBadge').hidden=$('fulfillOnlineMax').disabled;
    renderCustomerRatings();
    var waiting=customers.filter(inOrderFlow).length;$('queueCount').textContent=waiting+'/'+queueLimit();$('queueCount').classList.toggle('queue-full',waiting>=queueLimit());firstTimeHints(waiting);$('queueCount').parentElement.title=waiting>=queueLimit()?'Line is full · new customers walk away. Upgrade the order desk or its employees to add places.':'Customers waiting to order';$('pickupCount').textContent=customers.filter(function(c){return c.phase==='pickup'||c.phase==='toPickup'}).length;$('servedCount').textContent=state.sold.toLocaleString();state.stock.forEach(function(n,i){var packed=i===3,oz=state.productMenu.active===0,v=packed&&oz?n/8:n;$('stockCount'+i).innerHTML=compactCount(v)+(packed?'<small>'+(oz?'oz':state.productMenu.active===1?'jt':'ed')+'</small>':'');$('stockCount'+i).title=i===4?n+' / '+readyCapacity()+' packed orders ready for walk-in pickup':i===3?qtyLabel(n)+' packed of '+qtyLabel(storageCapacity())+(n>=storageCapacity()?' · Storage full':''):n+' / '+storageCapacity()+(n>=storageCapacity()?' · Storage full':'');$('stockCount'+i).classList.toggle('stock-full',n>=(i===4?readyCapacity():storageCapacity()))});var order=milestone(state.contract);
    if(order){$('orderName').textContent=state.lifetime>=order.goal?'ORDER READY TO CLAIM':order.name;$('orderProgress').textContent=fmt(Math.min(state.lifetime,order.goal))+' / '+fmt(order.goal);$('orderFill').style.width=Math.min(100,state.lifetime/order.goal*100)+'%';$('claimReward').textContent='+'+fmt(order.reward);$('claim').disabled=state.lifetime<order.goal}
    else{$('orderName').textContent='ALL ORDERS FILLED';$('orderProgress').textContent='COMPLETE';$('orderFill').style.width='100%';$('claimReward').textContent='✓';$('claim').disabled=true}
    $('orderBadge').hidden=!order||state.lifetime<order.goal;
    $('boostPreview').textContent=state.multiplier.toFixed(2)+'× → '+(state.multiplier*1.25).toFixed(2)+'× all stations';
    var boostPrice=boostCost(state.globalLevel);$('boostCost').textContent=state.globalLevel>=BOOST_MAX?'MAX':fmt(boostPrice);$('boost').disabled=state.globalLevel>=BOOST_MAX||state.money<boostPrice;
    var slowNow=slowestStation();
    markerEls.forEach(function(el,i){var locked=!isOpen(i),site=!state.lines[i];el.classList.toggle('selected',!securitySelected&&!loungeSelected&&i===selected);el.classList.toggle('locked',locked);el.classList.toggle('is-site',site);el.classList.toggle('is-bottleneck',i===slowNow&&!locked&&!site);el.classList.add('station-sign');el.classList.toggle('can-upgrade',!locked&&!site&&state.money>=cost(i));if(el.dataset.level!==String(state.lines[i])){el.innerHTML='<span class=station-sign-name>'+shortNames[i]+'</span><span class=station-sign-level>'+(site?'Build':'Lv '+state.lines[i])+'</span>';el.dataset.level=String(state.lines[i]);updateMarkers.key=null;}el.style.setProperty('--station-tier',TIER_COLORS[stationTier(i)]);el.setAttribute('aria-label',LINES[i].name+(locked?', locked':site?', under construction. Build it':', level '+state.lines[i]));el.setAttribute('aria-pressed',String(!securitySelected&&!loungeSelected&&i===selected))});
    var loungeCard=document.querySelector('[data-lounge]');if(loungeCard){loungeCard.setAttribute('aria-pressed',String(loungeSelected));loungeCard.classList.toggle('is-lot',loungeLot);loungeCard.classList.toggle('can-upgrade',loungePrice!==null&&state.money>=loungePrice);loungeCard.querySelector('em').textContent=loungeLot?'Open':'Lv '+state.lounge;loungeCard.setAttribute('aria-label',loungeLot?'Smoking lounge, under construction':'Smoking lounge, level '+state.lounge);loungeCard.style.setProperty('--station-tier',TIER_COLORS[Math.min(3,state.lounge)])}
    var securityCard=document.querySelector('[data-security]');if(securityCard){var idPriceNow=Math.floor(20*Math.pow(1.6,state.idStaff));securityCard.setAttribute('aria-pressed',String(securitySelected));securityCard.classList.toggle('is-site',doorSite);securityCard.classList.toggle('can-upgrade',!doorSite&&state.idStaff<10000&&state.money>=idPriceNow);securityCard.querySelector('em').textContent=doorSite?'Build':'Lv '+state.idStaff;securityCard.setAttribute('aria-label',doorSite?'Security, under construction':'Security, level '+state.idStaff);securityCard.style.setProperty('--station-tier',TIER_COLORS[state.idStaff>=25?3:state.idStaff>=10?2:1])}
    updateStationOrbit(slow);
    machineTabs.forEach(function(tab,i){var locked=!isOpen(i),site=!state.lines[i],available=!locked&&!site&&state.money>=cost(i);tab.title=site?'Under construction':i===slow?'Slowest station · improve this to raise capacity':'';tab.setAttribute('aria-pressed',String(!securitySelected&&!loungeSelected&&i===selected));tab.classList.toggle('is-locked',locked);tab.classList.toggle('is-site',site);tab.classList.toggle('can-upgrade',available);tab.querySelector('em').innerHTML=locked?'Locked':site?'Build':'Lv '+state.lines[i]+(i===slow?'<span class="slow-tag"> · Slow</span>':'');tab.style.setProperty('--station-tier',TIER_COLORS[stationTier(i)]);var progress=Math.min(100,state.lines[i]/100*100),progressText=site?'Under construction':state.lines[i]>=100?'Flagship equipment reached':'Level '+state.lines[i]+' of 100 toward flagship equipment';tab.querySelector('progress').value=progress;tab.querySelector('progress').setAttribute('aria-label',LINES[i].name+' equipment progress');tab.querySelector('progress').setAttribute('aria-valuetext',progressText);tab.querySelector('progress').title=progressText;tab.querySelector('.level-funding').textContent=progressText;tab.setAttribute('aria-label',LINES[i].name+(i===slow?', slowest station':'')+', level '+state.lines[i]+', '+STATION_TIERS[stationTier(i)]+(available?', upgrade ready':''))});
    updateCommerceControls();
  }
  var machineTabs=Array.prototype.slice.call(document.querySelectorAll('[data-machine]'));var securityTab=document.querySelector('[data-security]');if(securityTab)securityTab.onclick=selectSecurity;
  var loungeTab=document.querySelector('[data-lounge]');if(loungeTab)loungeTab.onclick=selectLounge;
  var stationOrbitIndex=-1,stationOrbitOffset=0;
  function updateStationOrbit(index){
    if(index===stationOrbitIndex)return;
    var previous=machineTabs[stationOrbitIndex];
    if(previous&&previous.getClientRects().length){
      var offset=parseFloat(getComputedStyle(previous.querySelector('.station-orbit rect')).strokeDashoffset);
      if(Number.isFinite(offset))stationOrbitOffset=offset;
    }
    // Start the next card at the outgoing border's exact position on the 16-second circuit.
    var next=machineTabs[index];
    if(next)next.style.setProperty('--station-orbit-delay',(stationOrbitOffset*.16)+'s');
    machineTabs.forEach(function(tab,i){tab.classList.toggle('is-bottleneck',i===index)});
    stationOrbitIndex=index;
  }
  var stationMotionObserver=typeof IntersectionObserver==='function'?new IntersectionObserver(function(entries){entries.forEach(function(entry){entry.target.classList.toggle('station-motion-visible',entry.isIntersecting)})}):null;
  machineTabs.forEach(function(tab){
    var orbit=document.createElementNS('http://www.w3.org/2000/svg','svg'),rim=document.createElementNS('http://www.w3.org/2000/svg','rect');
    orbit.setAttribute('class','station-orbit');orbit.setAttribute('aria-hidden','true');orbit.setAttribute('focusable','false');
    rim.setAttribute('x','1');rim.setAttribute('y','1');rim.setAttribute('rx','13');rim.setAttribute('pathLength','100');
    orbit.appendChild(rim);tab.appendChild(orbit);
  });
  [securityTab].concat(machineTabs).forEach(function(tab,i){
    [tab,i===0?securityMarker:markerEls[i-1]].forEach(function(el){
      if(!el)return;el.style.setProperty('--upgrade-wave-delay',(i*.16).toFixed(2)+'s');
      if(stationMotionObserver)stationMotionObserver.observe(el);else el.classList.add('station-motion-visible');
    });
  });
  machineTabs.forEach(function(tab,i){var progress=document.createElement('progress');progress.max=100;progress.value=0;progress.setAttribute('aria-label',LINES[i].name+' equipment progress');tab.appendChild(progress);var label=document.createElement('span');label.className='level-funding';tab.appendChild(label);tab.onclick=function(){selectMachine(Number(tab.getAttribute('data-machine')))}});
  var trayTabs=Array.prototype.slice.call(document.querySelectorAll('[data-tray]'));
  var activeTray='factory',panelOpen=true;
  // The tray glides: a pane opens from nothing to its natural height and closes the same way, measured live so every
  // breakpoint keeps its own pane height. The sheet's ResizeObserver reframes the map on each step, so the scene eases too.
  var paneGlide=null;
  function glidePane(pane,expand,done){
    if(paneGlide){paneGlide.cancel();paneGlide=null}
    var height=pane?pane.getBoundingClientRect().height:0;
    if(!pane||!height||motionPreference.matches||typeof pane.animate!=='function'){if(done)done();return}
    pane.style.overflow='hidden';
    var from={height:'0px',opacity:0,transform:'translateY(6px)'},to={height:height+'px',opacity:1,transform:'none'};
    var run=paneGlide=pane.animate(expand?[from,to]:[to,from],{duration:expand?480:320,easing:expand?'cubic-bezier(.2,.8,.2,1)':'cubic-bezier(.4,0,.6,1)'});
    run.onfinish=function(){pane.style.overflow='';if(paneGlide===run)paneGlide=null;if(done)done();fitControls()};
    run.oncancel=function(){pane.style.overflow='';if(paneGlide===run)paneGlide=null};
  }
  function showTray(name){if(document.body.dataset.activeTray!==name)playSound('tap',state.sound);document.body.dataset.activeTray=name;if(state.empire.activeStore&&name!=='empire')visitStore(0,false);activeTray=name;var wasCollapsed=$('sheet').classList.contains('collapsed');panelOpen=true;$('sheet').classList.remove('collapsed');$('panelToggle').setAttribute('aria-expanded','true');$('panelToggle').textContent='⌄';var titles={factory:'Stations',employees:'Staff',orders:'Deliveries',boosts:'Shop',flowers:'Menu',empire:'Empire'};$('panelTitle').textContent=titles[name];trayTabs.forEach(function(t){t.setAttribute('aria-pressed',String(t.getAttribute('data-tray')===name))});Array.prototype.forEach.call(document.querySelectorAll('[data-pane]'),function(p){p.hidden=p.getAttribute('data-pane')!==name});if(wasCollapsed)glidePane(document.querySelector('[data-pane="'+name+'"]'),true);else if(paneGlide){paneGlide.cancel();paneGlide=null}fitControls()}
  function collapsePanel(){var sheet=$('sheet'),wasOpen=!sheet.classList.contains('collapsed');if(wasOpen&&sheet.classList.contains('tall')){settleSheet('collapsed');return}panelOpen=false;$('panelToggle').setAttribute('aria-expanded','false');$('panelToggle').textContent='⌃';if(!wasOpen){fitControls();return}
    // The pane folds away first; the sheet only takes its collapsed shape once nothing is left to hide.
    glidePane(document.querySelector('[data-pane]:not([hidden])'),false,function(){if(!panelOpen){sheet.classList.add('collapsed');fitControls()}});fitControls()}
  trayTabs.forEach(function(tab){tab.onclick=function(){var name=tab.getAttribute('data-tray');if(name===activeTray&&panelOpen)collapsePanel();else showTray(name)}});
  $('panelToggle').onclick=function(){if(panelOpen)collapsePanel();else showTray(activeTray)};
  // Phones: the sheet has three heights. Its header is a grabber: pulled up past the half-open height the sheet fills
  // the screen below the HUD ("tall"); pulled down it returns to half height, then collapses. While it follows the finger
  // or glides between heights the open pane stretches to fill it (.fluid), and the map keeps its half-height framing
  // rather than being squeezed into the strip a tall sheet leaves.
  var sheetGlide=null,sheetDrag=null,sheetHalfHeight=0,suppressHeaderClick=false;
  function phoneSheet(){return window.innerWidth<780}
  function sheetTallHeight(){return Math.max(240,window.innerHeight-document.querySelector('.hud').getBoundingClientRect().bottom-14)}
  function settleSheet(target){
    var sheet=$('sheet'),from=sheet.getBoundingClientRect().height;
    if(sheetGlide){sheetGlide.cancel();sheetGlide=null}
    if(paneGlide){paneGlide.cancel();paneGlide=null}
    sheet.style.height='';sheet.classList.add('fluid');
    if(target==='collapsed'){panelOpen=false;$('panelToggle').setAttribute('aria-expanded','false');$('panelToggle').textContent='⌃';sheet.classList.remove('tall')}
    else{if(!panelOpen){showTray(activeTray);if(paneGlide){paneGlide.cancel();paneGlide=null}}sheet.classList.toggle('tall',target==='tall')}
    $('panelExpand').setAttribute('aria-pressed',String(target==='tall'));$('panelExpand').setAttribute('aria-label',target==='tall'?'Return this panel to half height':'Fill the screen with this panel');
    // Measure the destination in its settled classes, then glide the sheet's height there with the pane stretching.
    sheet.classList.remove('fluid');if(target==='collapsed')sheet.classList.add('collapsed');
    var to=sheet.getBoundingClientRect().height;
    if(target==='collapsed')sheet.classList.remove('collapsed');
    function finish(){sheet.classList.remove('fluid');if(target==='collapsed')sheet.classList.add('collapsed');sheetGlide=null;fitControls()}
    if(motionPreference.matches||typeof sheet.animate!=='function'||Math.abs(to-from)<2){finish();return}
    sheet.classList.add('fluid');
    var run=sheetGlide=sheet.animate([{height:from+'px'},{height:to+'px'}],{duration:360,easing:'cubic-bezier(.2,.8,.2,1)'});
    run.onfinish=function(){if(sheetGlide===run)finish()};
    run.oncancel=function(){if(sheetGlide===run){sheet.classList.remove('fluid');sheetGlide=null}};
  }
  $('panelExpand').onclick=function(){settleSheet($('sheet').classList.contains('tall')?'half':'tall')};
  // A drag can start anywhere on the sheet that does not scroll: the header, the stats strip and the tab bar. Their
  // buttons still take taps, because a press that moves less than 8px is left alone.
  var sheetSurface=$('sheet');
  sheetSurface.addEventListener('click',function(e){
    if(suppressHeaderClick){e.stopPropagation();e.preventDefault();return}
    // Collapsed, a tap on any bare part of the strip opens it; its buttons keep their own jobs.
    if(sheetSurface.classList.contains('collapsed')&&phoneSheet()&&!e.target.closest('button,a,input,select,textarea,label'))showTray(activeTray);
  },true);
  sheetSurface.addEventListener('pointerdown',function(e){
    if(!phoneSheet()||e.button!==0||sheetGlide||e.target.closest('[data-pane]'))return;
    var sheet=$('sheet');
    sheetDrag={id:e.pointerId,y:e.clientY,lastY:e.clientY,lastT:e.timeStamp,vy:0,height:sheet.getBoundingClientRect().height,moved:false,collapsed:sheet.classList.contains('collapsed'),tall:sheet.classList.contains('tall')};
    // Bare surfaces capture the pointer at once so a fast pull that leaves the strip still counts, as does the collapsed
    // handle, whose tap opens the sheet either way. Other buttons wait until the press has become a drag: capturing on
    // pointerdown would retarget a tap's click from the button to the sheet.
    if(!e.target.closest('button,a,input,select,textarea,label')||(sheetDrag.collapsed&&e.target.closest('#panelToggle')))try{sheetSurface.setPointerCapture(e.pointerId)}catch(err){}
  });
  sheetSurface.addEventListener('pointermove',function(e){
    var d=sheetDrag;if(!d||e.pointerId!==d.id)return;
    var dy=e.clientY-d.y,dt=Math.max(1,e.timeStamp-d.lastT);d.vy=d.vy*.6+((e.clientY-d.lastY)/dt)*.4;d.lastY=e.clientY;d.lastT=e.timeStamp;
    if(!d.moved){if(Math.abs(dy)<8)return;d.moved=true;try{sheetSurface.setPointerCapture(e.pointerId)}catch(err){}}
    if(d.collapsed)return;
    var sheet=$('sheet');sheet.classList.add('fluid');
    sheet.style.height=Math.max(120,Math.min(sheetTallHeight(),d.height-dy))+'px';
  });
  function endSheetDrag(e,cancelled){
    var d=sheetDrag;if(!d||e.pointerId!==d.id)return;sheetDrag=null;
    if(!d.moved)return;
    suppressHeaderClick=true;setTimeout(function(){suppressHeaderClick=false},0);
    var dy=e.clientY-d.y,half=sheetHalfHeight||d.height,tall=sheetTallHeight(),target;
    if(cancelled)target=d.collapsed?'collapsed':d.tall?'tall':'half';
    else if(d.collapsed)target=dy>-24?'collapsed':dy<-half*.6?'tall':'half';
    else{var h=d.height-dy;
      if(d.vy<-.5)target='tall';else if(d.vy>.5)target=d.tall&&h>half*.75?'half':'collapsed';
      else target=h<half*.72?'collapsed':h>(half+tall)/2?'tall':'half'}
    if(target==='collapsed'&&d.collapsed){$('sheet').style.height='';$('sheet').classList.remove('fluid');return}
    settleSheet(target);
  }
  sheetSurface.addEventListener('pointerup',function(e){endSheetDrag(e,false)});
  sheetSurface.addEventListener('pointercancel',function(e){endSheetDrag(e,true)});

  // Security is a door station: the ID checker's training shares the station panel.
  // One-time nudges for the moments the guide cannot cover: the first web order, the first full shelf, the first full line.
  function firstTimeHints(waiting){
    var h=state.hints;if(!h||!state.shopOpen||document.body.classList.contains('guide-open')||(firstRun&&startGuide&&!startGuide.seen())||$('toast').classList.contains('show'))return;
    if(!h.web&&onlineRequestsReady()>=1){h.web=true;notify('FIRST WEB ORDER · send it from Deliveries','upgrade');save();return}
    if(!h.storage&&state.stock.some(function(n,i){return i<4&&n>=storageCapacity()})){h.storage=true;notify('STORAGE FULL · expand it in the Shop');save();return}
    if(!h.queue&&waiting>=queueLimit()&&state.lines[4]>0){h.queue=true;notify('LINE IS FULL · upgrade the order desk for more places');save()}
  }
  function renderLoungeSelection(){
    var level=state.lounge,tier=loungeTier(level),next=LOUNGE_TIERS[level]||null,price=loungeUpgradeCost(level),maxed=!next,affordable=!maxed&&state.money>=price;
    var seated=loungeSeated(),seats=loungeSeats(level),jar=flowerValue(),take=loungeTake(level,jar),waiting=loungeWaiting().length,nowRate=loungeCurrentRate(level,seated,jar)*state.gameSpeed;
    $('machineNumber').textContent='BACK ROOM · '+(!tier?'UNDER CONSTRUCTION':seated>=seats?'FULL'+(waiting?' · '+waiting+' ON THE ROPE':''):seated?seated+' OF '+seats+' SEATED':'SEATS FREE');
    $('machineName').textContent='SMOKING LOUNGE';$('machineLevel').textContent=level;$('machineRate').textContent=tier?fmt(nowRate)+'/s · '+fmt(take.total)+' / session':'Under construction';
    var ICON_SEAT='<svg viewBox="0 0 24 24"><path d="M6 11V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5M4 11h16v4H4zM6 15v5M18 15v5"/></svg>',ICON_GUESTS='<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M15 20c0-2.6 1.5-4.4 3.7-4.9 1.4.3 2.3 1.6 2.3 3.4"/></svg>',ICON_TICKET='<svg viewBox="0 0 24 24"><path d="M4 8a2 2 0 0 0 2-2h12a2 2 0 0 0 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 0-2 2H6a2 2 0 0 0-2-2v-3a2 2 0 0 0 0-4zM9 6v12"/></svg>',ICON_JAR='<svg viewBox="0 0 24 24"><path d="M8 4h8v3H8zM7 7h10v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2zM7 11h10"/></svg>',ICON_SESSIONS='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>',ICON_RATE='<svg viewBox="0 0 24 24"><path d="M4 17l5-6 4 3 7-8M15 6h5v5"/></svg>',ICON_BANKED='<svg viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v4c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 10v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4M5 14v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4"/></svg>';
    var chipTone=!tier?'wait':seated>=seats?'stop':seated?'go':'wait',chipWord=!tier?'Site':seated>=seats?'Full':seated?seated+' of '+seats+' seated':'Seats free';
    var loungeHtml='<span class="status-chip" data-tone="'+chipTone+'"><i></i>'+chipWord+'</span>'+
      (tier?'<span class="stat" title="What the lounge is making right now: '+seated+' of '+seats+' seats taken, each worth the '+fmt(take.total)+' take once per '+tier.session+'-second session">'+ICON_RATE+'<b>'+fmt(nowRate)+'/s</b><small>now</small></span>'+
      '<span class="stat" title="Banked by the lounge since it opened: every cover and every jar sold at the lounge premium">'+ICON_BANKED+'<b>'+fmt(state.loungeEarned)+'</b><small>total</small></span>'+
      '<span class="stat tier" title="One guest in '+tier.share+' through the door heads for the curtain; VIPs twice as often">'+ICON_GUESTS+'<b>1 in '+tier.share+'</b><small>guests</small></span>'+
      '<span class="stat" title="Seats in the back room">'+ICON_SEAT+'<b>'+seats+'</b><small>seats</small></span>'+
      '<span class="stat" title="Cover paid at the curtain">'+ICON_TICKET+'<b>'+fmt(tier.cover)+'</b><small>cover</small></span>'+
      '<span class="stat" title="One packed jar per session at '+tier.spend+'× the counter price">'+ICON_JAR+'<b>'+fmt(take.spend)+'</b><small>jar ×'+tier.spend+'</small></span>'+
      '<span class="stat" title="Sessions so far">'+ICON_SESSIONS+'<b>'+compactCount(state.loungeSessions)+'</b><small>sessions</small></span>':
      '<span class="stat tier" title="Bought outright; every level adds seats and raises the take">'+ICON_TICKET+'<b>'+fmt(price)+'</b><small>to open</small></span>'+
      '<span class="stat" title="Guests who go in skip the counters: cover at the curtain, one jar at a premium, out the back door">'+ICON_GUESTS+'<b>1 in '+LOUNGE_TIERS[0].share+'</b><small>guests</small></span>'+
      '<span class="stat" title="Seats once open">'+ICON_SEAT+'<b>'+LOUNGE_TIERS[0].seats+'</b><small>seats</small></span>');
    if($('stationStatus').dataset.html!==loungeHtml){$('stationStatus').innerHTML=loungeHtml;$('stationStatus').dataset.html=loungeHtml}
    $('upgradeLevel').textContent=!tier?'Not open':maxed?'Lv '+level+' · '+tier.name:'Lv '+level+' → '+(level+1)+' · '+next.name;
    renderUpgradeComparison('Seats',seats,next?next.seats:seats,false,!tier,maxed,{maxed:'Fully fitted',gain:function(before,after){return '+'+(after-before)+' seats · jar ×'+(next?next.spend:tier.spend)}});
    $('stationTier').textContent=tier?tier.name:'Construction site';$('stationTier').style.color=TIER_COLORS[Math.min(3,level)];
    $('upgradeFunding').textContent=maxed?'Fully fitted':affordable?(tier?'Ready to upgrade':'Ready to open'):fmt(Math.max(0,price-state.money))+' to go';
    $('upgradeProgress').value=maxed?100:Math.min(100,state.money/price*100);$('upgradeProgress').setAttribute('aria-valuetext',maxed?'Fully fitted':affordable?'Ready':fmt(Math.max(0,price-state.money))+' needed for '+next.name);
    paintUpgradePreview(-2);
    $('nextAppearance').textContent=next?next.name+' · '+next.seats+' seats · 1 in '+next.share+' guests · jar ×'+next.spend:'Nothing left to fit in the back room.';
    $('machineCost').textContent=maxed?'—':fmt(price);$('buyMachine').disabled=!affordable;$('buyMachine').querySelector('span').textContent=tier?'UPGRADE':'OPEN';$('buyMachine').style.setProperty('--funded',(maxed?100:Math.min(100,state.money/price*100))+'%');
    $('buyMachineMax').disabled=true;$('machineMaxLabel').textContent='MAX';$('machineMaxCost').textContent='—';$('buyMachineMax').setAttribute('aria-label','The lounge is fitted one level at a time');
    $('upgradeHint').textContent=maxed?'Every seat in the back room is spoken for.':!affordable?fmt(price-state.money)+' to go':tier?'+'+(next.seats-seats)+' seats · bigger take per session':'Open the curtain · every 4th guest slips in';$('upgradeHint').classList.toggle('ready',affordable);
  }
  function renderSecuritySelection(){
    var lvl=state.idStaff,price=Math.floor(20*Math.pow(1.6,lvl)),maxed=lvl>=10000||rawSecurityDuration(lvl)<=economy.ID_CHECK_FLOOR,site=!state.doorBuilt,affordable=site||(!maxed&&state.money>=price),quote=site?{levels:0,cost:0}:idTrainingQuote(10000);
    $('machineNumber').textContent='DOOR · '+(site?'UNDER CONSTRUCTION':lvl?'CHECKING IDS':'NO GUARD YET');$('machineName').textContent='SECURITY';$('machineLevel').textContent=lvl;$('machineRate').textContent=securityDuration().toFixed(2)+'s / check';
    // Stat tiles, like the lounge card: a status chip, the check time, who is at the door, and the scanner's boost.
    var atDoor=customers.filter(function(c){return c.phase==='idCheck'}).length,held=customers.filter(function(c){return c.phase==='idCheck'&&!c.walking}).length,checking=customers.some(function(c){return c.idChecked===false&&c.idCheckTime>0});
    var ICON_CLOCK='<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="7.5"/><path d="M12 9v4l2.5 1.5M9 3h6M12 3v2.5"/></svg>',ICON_DOOR='<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M15 20c0-2.6 1.5-4.4 3.7-4.9 1.4.3 2.3 1.6 2.3 3.4"/></svg>',ICON_SCAN='<svg viewBox="0 0 24 24"><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/></svg>';
    var chipTone=site?'wait':!lvl?'stop':held>3?'stop':checking||atDoor?'go':'wait',chipWord=site?'Site':!lvl?'No guard':held>3?'Line at the door':checking?'Checking':atDoor?'Walking up':'Door clear';
    var securityHtml='<span class="status-chip" data-tone="'+chipTone+'"><i></i>'+chipWord+'</span>'+
      '<span class="stat" title="Seconds the doorman takes per ID check; training and the scanner both cut it">'+ICON_CLOCK+'<b>'+securityDuration().toFixed(2)+'s</b><small>per check</small></span>'+
      '<span class="stat" title="Customers on the way to or waiting at the desk">'+ICON_DOOR+'<b>'+atDoor+'</b><small>at the door</small></span>'+
      '<span class="stat" title="ID scanner from the Shop: each level checks 12% faster">'+ICON_SCAN+'<b>'+(state.scannerLevel?'+'+Math.round(state.scannerLevel*12)+'%':'—')+'</b><small>scanner</small></span>';
    if($('stationStatus').dataset.html!==securityHtml){$('stationStatus').innerHTML=securityHtml;$('stationStatus').dataset.html=securityHtml}
    if(site){
      $('upgradeLevel').textContent='Not built';renderUpgradeComparison('Seconds per ID check',securityDuration(),securityDuration(),true,true,false);
      $('stationTier').textContent='Construction site';$('stationTier').style.color=TIER_COLORS[0];$('upgradeFunding').textContent='Ready to build';$('upgradeProgress').value=100;$('upgradeProgress').setAttribute('aria-valuetext','Ready to build');
      paintUpgradePreview(-1);$('nextAppearance').textContent='A staffed door station: ID checks before customers join the line.';
      $('machineCost').textContent='FREE';$('buyMachine').disabled=false;$('buyMachine').querySelector('span').textContent='BUILD';$('buyMachine').style.setProperty('--funded','100%');
      $('buyMachineMax').disabled=true;$('machineMaxLabel').textContent='MAX';$('machineMaxCost').textContent='—';$('buyMachineMax').setAttribute('aria-label','Build the door first');
      $('upgradeHint').textContent='Under construction · tap the site by the entrance, or Build here, to raise the door.';$('upgradeHint').classList.add('ready');return;
    }
    $('upgradeLevel').textContent=maxed?'Lv '+lvl:'Lv '+lvl+' → '+(lvl+1);
    renderUpgradeComparison('Seconds per ID check',securityDuration(),Math.max(economy.ID_CHECK_FLOOR,rawSecurityDuration(lvl+1)),true,false,maxed);
    $('stationTier').textContent=lvl>=25?'Head of security':lvl>=10?'Seasoned doorman':lvl?'Door staff':'Unstaffed door';$('stationTier').style.color=lvl>=25?TIER_COLORS[3]:lvl>=10?TIER_COLORS[2]:TIER_COLORS[1];
    $('upgradeFunding').textContent=maxed?'As quick as a check gets':affordable?'Ready to train':fmt(Math.max(0,price-state.money))+' to go';
    $('upgradeProgress').value=maxed?100:Math.min(100,state.money/price*100);$('upgradeProgress').setAttribute('aria-valuetext',affordable?'Training ready':fmt(Math.max(0,price-state.money))+' needed for level '+(lvl+1));
    paintUpgradePreview(-1);
    $('nextAppearance').textContent='Scanner upgrades in the Shop speed up every check.';
    $('machineCost').textContent=maxed?'—':fmt(price);$('buyMachine').disabled=!affordable;$('buyMachine').querySelector('span').textContent=lvl?'TRAIN':'HIRE';
    $('buyMachineMax').disabled=!quote.levels;$('machineMaxLabel').textContent='MAX'+(quote.levels?' +'+quote.levels+' LV':'');$('machineMaxCost').textContent=quote.levels?fmt(quote.cost):'—';$('buyMachineMax').setAttribute('aria-label','Train security by '+quote.levels+' levels for '+fmt(quote.cost));
    $('buyMachine').style.setProperty('--funded',Math.min(100,state.money/price*100)+'%');
    $('upgradeHint').textContent=maxed?'Nobody gets past this door.':!affordable?fmt(price-state.money)+' to go · customer sales earn cash automatically.':lvl?'Shorter ID checks let more customers join the line.':'Hire a doorman so ID checks stop holding up the line.';$('upgradeHint').classList.toggle('ready',affordable);
  }
  // Keep exact improvements visible even when the usual compact time label rounds them away.
  function renderUpgradeComparison(label,before,after,isTime,unbuilt,maxed,wording){
    var digits=isTime?2:1;
    // Show more decimals only when the two values genuinely differ but round the same; equal values keep the base
    // precision rather than escalating to 1.00000 → 1.00000.
    if(!unbuilt&&!maxed&&Math.abs(after-before)>1e-9)while(digits<5&&before.toFixed(digits)===after.toFixed(digits))digits++;
    var formatValue=function(value){return value.toLocaleString('en-US',{minimumFractionDigits:isTime?digits:0,maximumFractionDigits:digits})};
    var gain=isTime?(1-after/before)*100:(after/before-1)*100;
    var gainText=maxed?(wording&&wording.maxed||'Fully trained'):unbuilt?'Ready to build':wording&&wording.gain?wording.gain(before,after):(isTime?'':'+')+(gain<.1?'<0.1':gain<10?gain.toFixed(1):Math.round(gain))+'% '+(isTime?'less time':'more output');
    $('upgradeMetricLabel').textContent=label;
    $('upgradeBefore').textContent=unbuilt?'—':formatValue(before);
    $('upgradeAfter').textContent=maxed?formatValue(before):formatValue(after);
    $('upgradeGain').textContent=gainText;
    $('upgradeBenefit').setAttribute('aria-label',label+': '+(unbuilt?'not built':formatValue(before))+(maxed?'':', next level '+formatValue(after))+'. '+gainText);
    $('upgradeBenefit').classList.toggle('is-maxed',maxed);
  }
  function paintDeliveryPreview(){
    var preview=$('deliveryPreview'),key=[state.productMenu.active,state.menuStrains.join(',')].join('|');
    if(!preview||preview.dataset.art===key)return;
    // Reuse the finished deck and courier artwork without buying anything or advancing the live scene.
    var art=document.createElement('canvas');art.width=900;art.height=900;
    var savedCtx=ctx,savedUnit=unit,savedX=centerX,savedY=centerY,savedAngle=angle,savedElevation=sceneElevation;
    try{
      ctx=art.getContext('2d',{willReadFrequently:true});unit=100;angle=.57;sceneElevation=0;
      var anchor=rotate(-10.7,1.5);centerX=450-anchor.x*unit;centerY=720-anchor.z*unit*.5;
      onlinePackingCounter(0,true);drawCourierDrone(-10.7,4.6,-.75,0,0,1);
      var pixels=ctx.getImageData(0,0,900,900).data,left=900,right=0,top=900,bottom=0;
      for(var y=0;y<900;y++)for(var x=0;x<900;x++)if(pixels[(y*900+x)*4+3]>180){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y)}
      var pc=preview.getContext('2d');pc.clearRect(0,0,preview.width,preview.height);
      if(right>=left&&bottom>=top){var w=right-left+1,h=bottom-top+1,scale=Math.min((preview.width-40)/w,(preview.height-40)/h);pc.drawImage(art,left,top,w,h,(preview.width-w*scale)/2,(preview.height-h*scale)/2,w*scale,h*scale)}
      preview.dataset.art=key;
    }finally{ctx=savedCtx;unit=savedUnit;centerX=savedX;centerY=savedY;angle=savedAngle;sceneElevation=savedElevation}
  }
  // Intro hero: a small stage built from the shop's own pieces (counter, jars, plants, two customers, the courier drone),
  // painted once into the start guide's canvas. It never touches the live scene or camera.
  function paintIntroArt(target){
    if(!target||target.dataset.art)return;
    var art=document.createElement('canvas');art.width=1000;art.height=700;
    var savedCtx=ctx,savedUnit=unit,savedX=centerX,savedY=centerY,savedAngle=angle,savedElevation=sceneElevation;
    try{
      ctx=art.getContext('2d',{willReadFrequently:true});unit=88;angle=.57;sceneElevation=0;centerX=500;centerY=470;
      drawBox(0,0,-.22,7.2,4.2,.22,['#cbb085','#7f6a4b','#ac9168']);
      plant(-2.9,.9,0,1.05,0,1);plant(2.9,.9,0,1.05,1,1);plant(-2.2,-1.3,0,.8,2,1);
      drawBox(0,-.4,0,2.6,.95,1,['#ede4cb','#a79c81','#d2c5a5']);
      jar(-.8,-.4,1,0);jar(0,-.4,1,1);jar(.8,-.4,1,2);
      drawPerson(-1.55,1.15,0,18,false,false,true,{amount:0,phase:0,facing:.35});
      drawPerson(1.7,1.3,0,13,false,false,false,{amount:0,phase:0,facing:-.3});
      drawCourierDrone(.9,3.3,-.6,0,0,1);
      var pixels=ctx.getImageData(0,0,art.width,art.height).data,left=art.width,right=0,top=art.height,bottom=0;
      for(var y=0;y<art.height;y++)for(var x=0;x<art.width;x++)if(pixels[(y*art.width+x)*4+3]>180){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y)}
      var pc=target.getContext('2d');pc.clearRect(0,0,target.width,target.height);
      if(right>=left&&bottom>=top){var w=right-left+1,h=bottom-top+1,scale=Math.min((target.width-24)/w,(target.height-16)/h);pc.drawImage(art,left,top,w,h,(target.width-w*scale)/2,target.height-h*scale-6,w*scale,h*scale)}
      target.dataset.art='1';
    }finally{ctx=savedCtx;unit=savedUnit;centerX=savedX;centerY=savedY;angle=savedAngle;sceneElevation=savedElevation}
  }
  function paintCustomerGuide(){
    var guide=document.querySelector('.reputation-guide');if(!guide||guide.dataset.painted)return;
    // The guide borrows the shop's characters once; it never advances their live animation or camera.
    var savedCtx=ctx,savedUnit=unit,savedX=centerX,savedY=centerY,savedAngle=angle,savedElevation=sceneElevation;
    try{
      unit=106;centerX=90;centerY=232;angle=.57;sceneElevation=0;
      guide.querySelectorAll('canvas').forEach(function(portrait,i){
        ctx=portrait.getContext('2d');if(!ctx)return;
        ctx.clearRect(0,0,portrait.width,portrait.height);
        drawPerson(0,0,0,[18,13,12][i],false,false,false,{amount:0,phase:0,facing:.3});
      });
      guide.dataset.painted='true';
    }finally{ctx=savedCtx;unit=savedUnit;centerX=savedX;centerY=savedY;angle=savedAngle;sceneElevation=savedElevation}
  }
  function customerGuideMarkup(){
    function icon(path){return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+path+'</svg>'}
    var clock=icon('<circle cx="16" cy="18" r="10"/><path d="M16 12v6l4 2M12 3h8M16 3v5M24 7l3 3"/>');
    var crown=icon('<path d="m4 9 6 5 6-9 6 9 6-5-3 17H7ZM9 22h14"/>');
    return '<h3 id="customerGuideTitle">Customer guide</h3><ul class="customer-lineup">'+
      '<li class="guide-customer"><div class="guide-portrait"><canvas width="180" height="260" aria-hidden="true"></canvas><span class="guide-flower" aria-hidden="true">'+strainArt(0,false)+'</span></div><h4>Regulars</h4><strong class="guide-preference">Meadow Mint</strong><span class="guide-caption">On the menu</span></li>'+
      '<li class="guide-customer"><div class="guide-portrait"><canvas width="180" height="260" aria-hidden="true"></canvas><span class="guide-cue">'+clock+'</span></div><h4>Hurried</h4><strong class="guide-time" id="guideHurriedTime">≤20s</strong><span class="guide-caption">Whole visit</span></li>'+
      '<li class="guide-customer guide-vip"><div class="guide-portrait"><canvas width="180" height="260" aria-hidden="true"></canvas><span class="guide-cue">'+crown+'</span></div><h4>VIPs</h4><strong class="guide-time" id="guideVipTime">≤15s</strong><span class="guide-caption">Whole visit<br>Reserve flower<br><b>2× pay</b></span></li></ul>'+
      '<p class="guide-comfort">'+clock+'<span id="guideComfort">Queue comfort adds time to both visit limits.</span></p>'+
      '<div class="guide-outcomes"><div>'+icon('<circle cx="16" cy="16" r="12"/><path d="m10 16 4 4 8-8"/>')+'<div><h4>Match</h4><strong>+1 <span>loyalty</span></strong><small id="guideMatchTip">+15% base tip</small></div></div><div>'+icon('<circle cx="16" cy="16" r="12"/><path d="m12 12 8 8m0-8-8 8"/>')+'<div><h4>Miss</h4><strong>−1 <span>loyalty</span></strong><small>Preference or time</small></div></div></div>'+
      '<div class="guide-unlock">'+crown+'<div><strong id="guideVipUnlock">VIPs at 60 loyalty</strong><span>35% base tips on regular matches</span></div></div>'+
      '<p class="guide-branch">'+icon('<path d="M5 14h22v14H5ZM3 14l3-9h20l3 9M12 28V18h8v10M3 14c0 4 6 4 6 0 0 4 7 4 7 0 0 4 7 4 7 0 0 4 6 4 6 0"/>')+'<span>Branch loyalty <b>up to +20% income</b></span></p>';
  }
  function paintUpgradePreview(index){
    var preview=$('upgradePreview');if(!preview)return;
    var key=[index,index===-2?state.lounge:index<0?state.idStaff:stationTier(index),state.menuStrains.join(','),state.productMenu.active].join('|');
    if(preview.dataset.art===key)return;
    // Render at native resolution, then frame the opaque equipment rather than its overhead light pool.
    var art=document.createElement('canvas');art.width=480;art.height=600;
    var savedCtx=ctx,savedUnit=unit,savedX=centerX,savedY=centerY,savedAngle=angle;
    try{
      ctx=art.getContext('2d',{willReadFrequently:true});unit=90;centerX=240;centerY=480;angle=.57;
      if(index===-2)drawLoungeThumb(state.lounge);
      else if(index<0){drawBox(0,0,-.24,2.6,2.6,.24,['#cbb085','#7f6a4b','#ac9168']);drawBox(.55,-.1,0,.95,.7,1.05,['#ede4cb','#a79c81','#d2c5a5']);drawPerson(-.55,-.45,0,7,false,true,false)}
      else drawStage({x:0,z:0},index,0,true);
      var pixels=ctx.getImageData(0,0,art.width,art.height).data,left=480,right=0,top=600,bottom=0;
      for(var y=0;y<600;y++)for(var x=0;x<480;x++)if(pixels[(y*480+x)*4+3]>180){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y)}
      var pc=preview.getContext('2d');pc.clearRect(0,0,preview.width,preview.height);
      if(right>=left&&bottom>=top){var w=right-left+1,h=bottom-top+1,scale=Math.min((preview.width-24)/w,(preview.height-24)/h);pc.drawImage(art,left,top,w,h,(preview.width-w*scale)/2,(preview.height-h*scale)/2,w*scale,h*scale)}
      preview.dataset.art=key;
    }finally{ctx=savedCtx;unit=savedUnit;centerX=savedX;centerY=savedY;angle=savedAngle}
  }
  function paintSecurityThumbnail(){var card=document.querySelector('[data-security] canvas');if(!card)return;var savedCtx=ctx,savedUnit=unit,savedX=centerX,savedY=centerY,savedAngle=angle;ctx=card.getContext('2d');if(ctx){ctx.clearRect(0,0,80,100);unit=25;centerX=40;centerY=97;angle=.57;if(!state.doorBuilt)drawConstructionSite(0,0,2.6,2.6,function(){drawBox(.55,-.1,0,.95,.7,1.05,['#ede4cb','#a79c81','#d2c5a5'])});else{drawBox(0,0,-.24,2.6,2.6,.24,['#cbb085','#7f6a4b','#ac9168']);drawBox(.55,-.1,0,.95,.7,1.05,['#ede4cb','#a79c81','#d2c5a5']);drawPerson(-.55,-.45,0,7,false,true,false)}}ctx=savedCtx;unit=savedUnit;centerX=savedX;centerY=savedY;angle=savedAngle}
  // The lounge doorway in miniature, dressed for its tier. Every level keeps the lacquer jambs, the slab and the LOUNGE
  // blade so the card still reads as the lounge; what changes is the colour of the neon, the drapes, the room glimpsed
  // between them and the dressing out front — planters for the terrace, a rope for the booths, a doorman and a runner
  // for the members' club. Unbought, the doorway is boarded and taped like any other site.
  var LOUNGE_LOOKS=[
    {neon:'#ff9fc6',glow:'#ff8fb84a',halo:'#ff7fb0',velvet:'#5c1e30',wall:['#2e1a24','#160c11','#22131b'],floor:'#2a1b22',gap:[.1,.32,.22]},
    {neon:'#ffc46b',glow:'#ffb35a4a',halo:'#ff9d3c',velvet:'#5c1e30',wall:['#2c1d18','#150d0a','#211511'],floor:'#241a16',gap:[.2,.48,.42]},
    {neon:'#c99bff',glow:'#b487ff4a',halo:'#a56cff',velvet:'#3a1a4a',wall:['#1e1830','#0e0b18','#171226'],floor:'#171226',gap:[.2,.48,.42]},
    {neon:'#e4f5b0',glow:'#cfeb8f4a',halo:'#c7e87a',velvet:'#d3c7ab',wall:['#2c4258','#172736','#22354a'],floor:'#4e5c48',gap:[.22,.5,.44]},
    {neon:'#ffb6a8',glow:'#ff9a8a4a',halo:'#ff8a78',velvet:'#5c1e30',wall:['#2e1a24','#160c11','#22131b'],floor:'#2a1b22',gap:[.02,.05,.035]},
    {neon:'#9fe8d8',glow:'#7fdcc84a',halo:'#6fd8c4',velvet:'#1f4a4a',wall:['#173432','#0a1a19','#112826'],floor:'#142523',gap:[.2,.48,.42]},
    {neon:'#ffb07a',glow:'#ff9a5c4a',halo:'#ff8c4a',velvet:'#5a2a1c',wall:['#3a2418','#1d110a','#2c1a11'],floor:'#2a1b13',gap:[.22,.5,.44]},
    {neon:'#ffd98a',glow:'#ffc86a4a',halo:'#ffbe55',velvet:'#3a1522',wall:['#4a3020','#261710','#382317'],floor:'#3b1a24',gap:[.15,.42,.34]}
  ];
  function drawLoungeThumb(level){
    var tier=migrateLounge(level===undefined?state.lounge:level),open=tier>0,look=LOUNGE_LOOKS[Math.max(0,tier-1)],face=.16;
    var lacquer=tier>=5?['#2a2328','#130f12','#1f1a1e']:['#2e3a33','#151c18','#222b25'],brass=tier>=8?'#e2c47e':'#c9b077';
    var plinth=tier>=8?['#ded8c9','#96907f','#bfb8a6']:tier===4?['#c9a874','#7d6240','#a9895c']:['#cbb085','#7f6a4b','#ac9168'];
    drawBox(0,0,-.24,2.8,1.6,.24,plinth);
    if(tier>=8)groundPatch(0,.48,.8,.66,'#8a2233');
    if(open){
      // The room behind the drapes: its back wall, floor and the tier's furniture, back to front.
      drawBox(0,-.72,0,1.36,.06,1.75,look.wall);groundPatch(0,-.4,1.2,.7,look.floor);
      if(tier===1){drawBox(0,-.55,0,1,.3,.45,['#6b2436','#3c1220','#8a3448']);var sconce=project(.42,1.25,-.7);litEllipse(sconce.x,sconce.y,unit*.045,unit*.03,'#ffd9b0');glow(sconce.x,sconce.y,unit*.32,'#ffb98a44')}
      if(tier===2){
        drawBox(0,-.7,.95,1.1,.1,.04,['#e2c47e','#8a7340','#c0a45e']);for(var b=0;b<3;b++)drawBox(-.3+b*.3,-.7,.99,.11,.11,.3,[['#e8a34a','#8a5a1c','#c9842f'],['#c9d9a8','#6f7f56','#a2b47f'],['#e8c470','#8f7130','#c9a44c']][b]);
        drawBox(0,-.3,0,1.05,.32,.5,['#6e4a30','#3a2617','#553a26']);drawBox(0,-.3,.5,1.12,.38,.05,['#e9dcc0','#a08e6c','#c9b995']);
        drawBox(.22,-.3,.55,.12,.12,.24,['#c8ecec','#6fa9b1','#9ad0d4']);var flame=project(.22,.86,-.3);litEllipse(flame.x,flame.y,unit*.04,unit*.07,'#ffe9a8');glow(flame.x,flame.y,unit*.36,'#ffb35a5a',unit*.3);
      }
      if(tier===3){
        var disc=project(-.2,1.25,-.7);ellipse(disc.x,disc.y,unit*.17,unit*.17,'#0e0e12');ellipse(disc.x,disc.y,unit*.055,unit*.055,look.neon);
        drawBox(-.5,-.55,0,.3,.3,.95,['#26262c','#111114','#1c1c21']);[.28,.66].forEach(function(h){var cone=project(-.5,h,-.4);ellipse(cone.x,cone.y,unit*.085,unit*.075,'#3b3b44');ellipse(cone.x,cone.y,unit*.035,unit*.03,'#6a5f8a')});
        drawBox(.1,-.42,0,.9,.42,.6,['#2a2d33','#131518','#1e2126']);var platter=project(-.08,.61,-.42);ellipse(platter.x,platter.y,unit*.19,unit*.085,'#0e0e12');ellipse(platter.x,platter.y,unit*.06,unit*.027,look.neon);
        drawBox(.36,-.42,.6,.26,.22,.05,['#3a3f48','#1a1d22','#2a2e35']);litLine([[-.34,.6,-.2],[.54,.6,-.2]],look.neon,.03);var wash=project(.1,.35,-.2);glow(wash.x,wash.y,unit*.5,'#b487ff40',unit*.3);
      }
      if(tier===4){
        worldLine([[-.6,1.38,-.7],[-.3,1.3,-.7],[0,1.28,-.7],[.3,1.3,-.7],[.6,1.38,-.7]],'#2b3a33',.018);
        [-.45,-.15,.15,.45].forEach(function(bx){var bulb=project(bx,1.27-Math.abs(bx)*.05,-.69);litEllipse(bulb.x,bulb.y,unit*.045,unit*.055,'#ffe9b0');glow(bulb.x,bulb.y,unit*.26,'#ffd98a44')});
        drawBox(.2,-.42,0,.4,.4,.46,['#e8e2d2','#9c968a','#c4bfb0']);drawBox(-.36,-.5,0,.26,.26,.28,['#4a6b5a','#28403a','#3a564a']);drawBox(-.36,-.62,.28,.26,.05,.3,['#4a6b5a','#28403a','#3a564a']);
      }
      if(tier===5){drawBox(0,-.45,0,.1,.5,1.5,lacquer);drawBox(-.35,-.55,0,.5,.3,.42,['#6b2436','#3c1220','#8a3448']);drawBox(.35,-.55,0,.5,.3,.42,['#6b2436','#3c1220','#8a3448'])}
      if(tier===6){
        litLine([[-.5,1.28,-.7],[.5,1.28,-.7]],look.neon,.035);var shelf=project(0,1.1,-.7);glow(shelf.x,shelf.y,unit*.6,'#7fdcc848',unit*.3);
        drawBox(0,-.3,0,1.1,.32,.5,['#5f8b7c','#2e4c43','#46705f']);worldLine([[-.55,.5,-.14],[.55,.5,-.14]],'#e2c47e',.03);
        jar(0,-.3,.5,0);drawBox(-.34,-.28,.5,.1,.1,.16,['#e7f4f0','#9bbbb4','#c5ddd7']);drawBox(.34,-.28,.5,.1,.1,.16,['#e7f4f0','#9bbbb4','#c5ddd7']);
      }
      if(tier===7){
        [-.36,.36].forEach(function(px){var pan=project(px,1.35,-.7);ellipse(pan.x,pan.y,unit*.1,unit*.1,'#c47a48');ellipse(pan.x,pan.y,unit*.06,unit*.06,'#8a4f2c')});
        drawBox(0,-.4,0,1.05,.46,.34,['#e9dcc0','#9d8f72','#c7b995']);[-.28,.28].forEach(function(px){var plate=project(px,.35,-.4);ellipse(plate.x,plate.y,unit*.11,unit*.05,'#fbf8ee');ellipse(plate.x,plate.y,unit*.045,unit*.022,'#7a8a4a')});
        worldLine([[0,1.75,-.4],[0,1.31,-.4]],'#3a2a1e',.02);drawBox(0,-.4,1.18,.34,.34,.13,['#d9905b','#8a4f2c','#b8703f']);var bulb=project(0,1.15,-.4);litEllipse(bulb.x,bulb.y,unit*.05,unit*.03,'#fff0c8');lightCone(0,1.15,-.4,.44,.12,.5,'#ffd7a0',.1);var table=project(0,.36,-.4);glow(table.x,table.y,unit*.6,'#ffcf9a55',unit*.3);
      }
      if(tier===8){
        drawBox(0,-.5,0,1,.38,.4,['#6b2436','#3c1220','#8a3448']);drawBox(0,-.66,.4,1,.1,.42,['#6b2436','#3c1220','#8a3448']);
        [-.45,.45].forEach(function(sx){var sconce=project(sx,1.3,-.7);litEllipse(sconce.x,sconce.y,unit*.045,unit*.03,'#ffe2a8');glow(sconce.x,sconce.y,unit*.34,'#ffc86a48')});
      }
    }else groundPatch(0,-.4,1.2,.7,'#2a1b22');
    drawBox(-.95,0,0,.5,.32,2.6,lacquer);drawBox(.95,0,0,.5,.32,2.6,lacquer);drawBox(0,0,1.75,1.4,.32,.85,lacquer);
    worldLine([[-.72,.02,face],[-.72,1.77,face],[.72,1.77,face],[.72,.02,face]],brass,tier>=8?.05:.035);
    if(open){
      // Drapes at the doorway, tied back to the tier's gap; the booths keep theirs drawn to a sliver of lamplight.
      var g=look.gap,zd=face+.02;
      [-1,1].forEach(function(s){poly([project(s*.7,1.73,zd),project(s*g[0],1.73,zd),project(s*g[1],.95,zd),project(s*g[2],.04,zd),project(s*.7,.04,zd)],look.velvet)});
      if(tier===5){litLine([[0,.06,zd+.01],[0,1.7,zd+.01]],'#ffd2a8',.02);var leak=project(0,.9,zd);glow(leak.x,leak.y,unit*.4,'#ffb98a44',unit*.9)}
      // Out front: a velvet rope for the booths and the club, planters for the terrace, a doorman for the club.
      if(tier===5||tier>=8){
        var rope=tier>=8?'#c9a24a':'#a8243c';
        [-.62,.62].forEach(function(px){worldLine([[px,0,.62],[px,.62,.62]],'#d8b56a',.045);var knob=project(px,.66,.62);ellipse(knob.x,knob.y,unit*.05,unit*.04,'#e9cd87')});
        var sag=[];for(var t=0;t<=1;t+=.125)sag.push([-.62+1.24*t,.58-.14*Math.sin(Math.PI*t),.62]);worldLine(sag,rope,.035);
      }
      if(tier===4){plant(-1.18,.52,0,.42);plant(1.18,.52,0,.42)}
      if(tier>=8)drawPerson(1.12,.56,0,7,false,true,false);
      var neon=project(0,2.2,face);glow(neon.x,neon.y,unit*.9,look.glow,unit*.5);ctx.save();ctx.shadowColor=look.halo;ctx.shadowBlur=unit*.2;wallText(0,2.2,face+.01,'LOUNGE',unit*1.2,.32,look.neon,false,'800');ctx.restore();wallText(0,2.2,face+.012,'LOUNGE',unit*1.2,.32,'#fff6ee',false,'600');
    }
    else{drawBox(0,.14,0,1.36,.08,1.72,['#c9a874','#7d6240','#a9895c']);constructionTape([-.75,.8,face+.06],[.75,.7,face+.06]);wallText(0,2.2,face+.01,'LOUNGE',unit*1.2,.32,'#4b3f45',false,'800')}
  }
  function paintLoungeThumbnail(){var card=document.querySelector('[data-lounge] canvas');if(!card)return;var savedCtx=ctx,savedUnit=unit,savedX=centerX,savedY=centerY,savedAngle=angle;ctx=card.getContext('2d');if(ctx){ctx.clearRect(0,0,80,100);unit=22;centerX=40;centerY=94;angle=.57;drawLoungeThumb()}ctx=savedCtx;unit=savedUnit;centerX=savedX;centerY=savedY;angle=savedAngle}
  function paintThumbnails(){paintSecurityThumbnail();paintLoungeThumbnail();var savedCtx=ctx,savedUnit=unit,savedX=centerX,savedY=centerY,savedAngle=angle;machineTabs.forEach(function(tab,i){ctx=tab.querySelector('canvas').getContext('2d');if(!ctx)return;ctx.clearRect(0,0,80,100);unit=25;centerX=40;centerY=97;angle=.57;drawStage({x:0,z:0},i,0)});ctx=savedCtx;unit=savedUnit;centerX=savedX;centerY=savedY;angle=savedAngle}
  function selectLounge(){securitySelected=false;loungeSelected=true;showTray('factory');renderUI();var card=document.querySelector('[data-lounge]');if(card&&card.scrollIntoView)card.scrollIntoView({block:'nearest',inline:'nearest'});if(navigator.vibrate)navigator.vibrate(8)}
  // Each lounge tier is bought outright; the first one raises the doorway out of its hoarding.
  function upgradeLounge(){
    var price=loungeUpgradeCost(state.lounge);if(price===null)return;if(state.money<price)return notify('Need '+fmt(price-state.money)+' more');
    var wasLot=!state.lounge;buyLoungeTier(state);var tier=loungeTier(state.lounge);
    if(wasLot)buildRise[7]=1;burst({x:LOUNGE_DOOR.x,z:LOUNGE_DOOR.z},'#f0a7c8');playSound(wasLot?'build':'sparkle',state.sound);telemetry.send('lounge_tier',{tier:state.lounge});
    notify(wasLot?'LOUNGE OPEN · '+tier.name:'LOUNGE · '+tier.name.toUpperCase(),'upgrade');paintThumbnails();updateMarkers.key=null;render.invalidated=true;renderUI();save();if(navigator.vibrate)navigator.vibrate(18);
  }
  function selectSecurity(){loungeSelected=false;securitySelected=true;showTray('factory');renderUI();var card=document.querySelector('[data-security]');if(card&&card.scrollIntoView)card.scrollIntoView({block:'nearest',inline:'nearest'});if(navigator.vibrate)navigator.vibrate(8)}
  function selectMachine(i){securitySelected=false;loungeSelected=false;selected=i;showTray('factory');renderUI();if(machineTabs[i]&&machineTabs[i].scrollIntoView)machineTabs[i].scrollIntoView({block:'nearest',inline:'nearest'});if(navigator.vibrate)navigator.vibrate(8)}
  // Construction: the door and each station are raised for free, in line order, with the intro explaining what each one does.
  // Building never charges cash because a shop with no pickup counter cannot earn any.
  var DOOR_POS={x:-9.1,z:9.3};
  function isBuilt(key){return key==='door'?state.doorBuilt:state.lines[key]>0}
  function buildStation(key){
    if(isBuilt(key))return false;
    if(key==='door'){state.doorBuilt=true;buildRise[6]=1;burst(DOOR_POS,'#f0d89a');securitySelected=true;loungeSelected=false;paintThumbnails()}
    else{if(!isOpen(key)){notify('Build the previous stage first');return false}state.lines[key]=1;buildRise[key]=1;tierFlashes[key]=1;burst(machinePos[key],'#f0d89a');securitySelected=false;loungeSelected=false;selected=key;paintThumbnails()}
    playSound('build',state.sound);updateMarkers.key=null;render.invalidated=true;renderUI();save();if(navigator.vibrate)navigator.vibrate(18);return true;
  }
  function openShop(){
    if(state.shopOpen)return false;
    if(!state.doorBuilt)buildStation('door');LINES.forEach(function(_,i){if(!state.lines[i])buildStation(i)});
    state.shopOpen=true;arrival=arrivalInterval();telemetry.once('shop_opened');celebrateOpening();
    notify('OPEN FOR BUSINESS');paintThumbnails();updateMarkers.key=null;renderUI();save();return true;
  }
  // Skipping or escaping the intro still leaves a working shop behind.
  function finishConstruction(){if(!state.shopOpen)openShop()}
  function buySelected(){if(loungeSelected)return upgradeLounge();if(securitySelected)return state.doorBuilt?trainIdChecker(1):buildStation('door');var line=LINES[selected];if(!isOpen(selected))return notify('Build the previous stage first');if(!state.lines[selected])return buildStation(selected);var c=cost(selected);if(state.money<c)return notify('Need '+fmt(c-state.money)+' more');var oldTier=stationTier(selected);state.money-=c;state.lines[selected]++;telemetry.once('first_upgrade',{station:line.name});trackStationLevel(selected);if(stationTier(selected)>oldTier)tierFlashes[selected]=1;paintThumbnails();burst(machinePos[selected]);notify(line.name+' · LEVEL '+state.lines[selected],'upgrade');renderUI();save();if(navigator.vibrate)navigator.vibrate(18)}
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
  today.innerHTML='<section id="returnSummary" hidden><h2>Welcome back</h2><p id="returnTime"></p><ul id="returnEarnings"></ul><p id="returnGoals"></p><button id="dismissReturn">Dismiss summary</button></section><h2>Next steps</h2><p id="nextInvestment"></p><div id="shortGoals"></div><section class="reputation"><h2 class="empire-section-heading">Reputation</h2><div class="reputation-summary"><strong id="reputationStatus"></strong><span id="reputationNext"></span></div><progress id="reputationProgress" max="60" value="0" aria-label="Customer reputation"></progress><section class="reputation-guide" aria-labelledby="customerGuideTitle">'+customerGuideMarkup()+'</section></section>';
  paintCustomerGuide();
  [0,1,2].forEach(function(i){var row=document.createElement('div');row.className='short-goal';row.innerHTML='<h3 id="goalTitle'+i+'"></h3><progress id="goalProgress'+i+'" max="100" aria-label="Objective progress"></progress><p id="goalCount'+i+'"></p><button id="goalClaim'+i+'"></button>'; $('shortGoals').appendChild(row);$('goalClaim'+i).onclick=function(){var g=goalStatus(state.empire,i,rewardScale());if(g.kind==='online'&&!deliveryBuilt()&&g.progress<g.target){closeGoals();showTray('orders');return;}var reward=claimGoal(state,i,rewardScale());if(reward){save();renderUI();notify('GOAL COMPLETE · +'+fmt(reward),'upgrade')}}});
  $('dismissReturn').onclick=function(){state.empire.returnReport=null;save();renderUI()};
  STORES.forEach(function(store,i){
    var controls=document.createElement('div');controls.className='branch-management';
    controls.innerHTML='<div class="branch-facts"><span class="specialty">'+['Exclusive strains','Boutique products','Bulk deliveries','Rooftop lounge','Fireside terrace'][i]+'</span><span id="branchLoyalty'+i+'"></span></div>'+(i===2?'<button id="bulkDispatch">Dispatch '+qtyLabel(30)+'</button><p id="bulkDetail"></p>':'')+'<p class="operation-hint" id="storeDetails'+i+'"></p>';

    $('branchBuy'+i).closest('article').insertBefore(controls,$('projectSummary'+i).parentElement);
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
    toggle.onclick=function(){var open=toggle.getAttribute('aria-expanded')!=='true';expandBranch(open?i:-1);if(open)requestAnimationFrame(function(){toggle.scrollIntoView({block:'start'})})};
  });
  $('bulkDispatch').onclick=function(){var reward=dispatchBulk(state);if(reward){queueDeliveryWave(1);notify('BULK DELIVERY · +'+fmt(reward),'upgrade');save();renderUI()}};
  var productIcons=[
    '<path d="M16 28V12m0 8C5 20 5 8 5 8s11 0 11 12Zm0-4C16 5 27 5 27 5s0 11-11 11Z"/>',
    '<path d="m5 23 17-17 5 5-17 17Z M8 20l5 5m7-17 5 5M7 7c-3-3 3-3 0-6"/>',
    '<rect x="5" y="5" width="22" height="22" rx="4"/><path d="M5 16h22M16 5v22M9 10h3m8 0h3M9 21h3m8 0h3"/>'
  ];
  // Each strain's card carries its own Sell-as pills (see renderFlowers); a format's unlock is paid once, for every strain.
  function chooseStrainFormat(strain,index){if(chooseFormat(state,index,strain)){syncDominantFormat();save();renderUI();notify(STRAINS[strain].name.toUpperCase()+' · SOLD AS '+FORMATS[index].name.toUpperCase(),'upgrade')}}
  var prestigePanel=document.createElement('details');prestigePanel.className='depth-panel prestige-panel';prestigePanel.innerHTML=
    '<summary><svg class="prestige-sprout" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21V11M12 14C3 14 3 7 3 7s9-1 9 7ZM12 11c0-8 9-9 9-9s0 9-9 9Z"/></svg><span>New beginnings</span><small id="prestigeStatus"></small><svg class="prestige-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></summary>'+
    '<div class="prestige-body"><div class="prestige-rank-track" id="prestigeComparison" role="group"><div class="prestige-rank"><span id="prestigeCurrentRank"></span><strong id="prestigeCurrentRate"></strong><small>base sales</small></div><svg id="prestigeArrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h17m-6-6 6 6-6 6"/></svg><div class="prestige-rank is-next" id="prestigeNext"><span id="prestigeNextRank"></span><strong id="prestigeNextRate"></strong><small>base sales</small></div></div>'+
    '<p class="prestige-gain" id="prestigeGain"></p><div class="prestige-funding" id="prestigeFunding"><div><span>Lifetime revenue</span><b id="prestigeRevenue"></b></div><progress id="prestigeProgress" max="100" value="0" aria-label="Lifetime revenue toward next rank"></progress><small id="prestigeFundingStatus"></small></div>'+
    '<dl class="prestige-carryover" id="prestigeCarryover"><div><dt>Keep</dt><dd>Permanent rank bonus &amp; sound setting</dd></div><div><dt>Restart</dt><dd>Cash, stores &amp; all shop progress</dd></div></dl><button id="prestigeStart" type="button" aria-describedby="prestigeFundingStatus prestigeCarryover"></button></div>';
  document.querySelector('[data-empire-section="growth"]').append(prestigePanel);
  var soundButton=document.createElement('button');soundButton.id='soundToggle';soundButton.type='button';soundButton.onclick=function(){state.sound=!state.sound;playSound('sale',state.sound);save();renderUI()};document.querySelector('.shop-reset').prepend(soundButton);
  var prestigeDialog=document.createElement('div');prestigeDialog.id='prestigeModal';prestigeDialog.className='modal-wrap';prestigeDialog.hidden=true;prestigeDialog.innerHTML='<div class="modal" role="dialog" aria-modal="true" aria-labelledby="prestigeTitle"><h2 id="prestigeTitle">Reopen your empire?</h2><p id="prestigePreview"></p><p>Clears cash, stores, staff, stock, strains, reputation, collections, goals and events. Only your prestige rank and sound preference carry over.</p><div><button id="prestigeCancel">Keep playing</button><button id="prestigeConfirm">Reopen from scratch</button></div></div>';document.body.append(prestigeDialog);
  $('prestigeStart').onclick=function(){var o=prestigeOffer(state);if(!o.eligible)return;$('prestigePreview').textContent='Next rank: '+o.multiplier.toFixed(1)+'× base main-shop and branch income.';prestigeDialog.hidden=false;$('prestigeCancel').focus()};
  $('prestigeCancel').onclick=function(){prestigeDialog.hidden=true;$('prestigeStart').focus()};
  prestigeDialog.addEventListener('keydown',function(e){if(e.key==='Escape')$('prestigeCancel').click();if(e.key==='Tab'){e.preventDefault();(document.activeElement===$('prestigeCancel')?$('prestigeConfirm'):$('prestigeCancel')).focus()}});
  $('prestigeConfirm').onclick=function(){var offer=prestigeOffer(state);if(!offer.eligible)return;var rank=offer.rank+1,sound=state.sound;resetRun(rank,sound);prestigeDialog.hidden=true;save();showTray('factory');renderUI();notify('Prestige '+rank+' · permanent sales bonus','upgrade')};
  var droneRow=document.createElement('div');droneRow.className='shop-upgrade';droneRow.innerHTML='<div class="shop-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="11" y="11" width="10" height="9" rx="2"/><path d="m11 12-5-5m15 5 5-5m-15 12-5 6m15-6 5 6M2 7h8m12 0h8M2 25h8m12 0h8M13 24h6"/></svg></div><div class="shop-copy"><h2>Auto drone</h2><strong id="autoDroneBenefit">Send a ready order every 10s</strong></div><button id="buyAutoDrone"><span>Install</span><b id="autoDronePrice"></b></button>';
  document.querySelector('[data-pane="boosts"]').append(droneRow);
  var droneControl=document.createElement('div');droneControl.className='auto-drone-control';droneControl.innerHTML='<span class="drone-glyph" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 10h6v4H9zM4 6h3M17 6h3M5.5 6v4h3.5M18.5 6v4H15M9 14l-3 4M15 14l3 4"/></svg></span><div><strong>Auto drone</strong><small id="autoDroneStatus"></small></div><button id="autoDroneToggle" type="button" class="drone-switch"></button><button id="autoDroneBulk" type="button" hidden></button>';document.querySelector('.dispatch-desk').append(droneControl);
  var deliverySite=document.createElement('div');deliverySite.className='delivery-site';deliverySite.id='deliverySite';deliverySite.innerHTML='<h2>Build your delivery pad</h2><div class="delivery-preview"><canvas id="deliveryPreview" width="600" height="720" role="img" aria-label="Preview of the finished rooftop launch deck, packing counter and courier drone carrying a parcel"></canvas></div><ul class="delivery-benefits"><li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 10h7l1.5 3.5h-10zM8.5 10 5 7m10.5 3L19 7M8.5 13.5 5 17m10.5-3.5L19 17M2 7h6m8 0h6M2 17h6m8 0h6"/></svg><strong>1 drone</strong><span>included</span></li><li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 8a8 8 0 0 0-14-3L3 8m0-5v5h5m-4 8a8 8 0 0 0 14 3l3-3m0 5v-5h-5"/></svg><strong>Auto</strong><span>dispatch</span></li><li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 17 6-6 4 4 8-10m-6 0h6v6"/></svg><strong>+33%</strong><span>per unit</span></li></ul><div class="delivery-build"><div class="delivery-funding"><small id="deliveryFundingText"></small><progress id="deliveryFunding" max="100" value="0" aria-label="Cash toward delivery pad"></progress></div><button id="buildDelivery" type="button"><span>Build delivery pad</span><b>'+fmt(AUTO_DRONE_COST)+'</b></button></div>';document.querySelector('.dispatch-desk').prepend(deliverySite);$('buildDelivery').onclick=purchaseAutoDrone;
  function purchaseAutoDrone(){if(buyAutoDrone(state)){telemetry.once('delivery_pad_built');save();renderUI();notify('DELIVERY PAD BUILT · web orders open','upgrade')}}
  function purchaseBulkDrone(){if(buyBulkDrone(state)){save();renderUI();notify('Bulk auto drone installed','upgrade')}}
  $('buyAutoDrone').onclick=function(){if(state.autoDrone.owned)purchaseBulkDrone();else purchaseAutoDrone()};
  $('autoDroneBulk').onclick=function(){if(!state.autoDrone.bulk){purchaseBulkDrone();return}state.autoDrone.mode=state.autoDrone.mode==='bulk'?'single':'bulk';save();renderUI()};
  // The switch flips on any press-and-release anywhere on it: pointer capture means the release always lands on the
  // button even though the knob slides under the pointer, and the click event is ignored so nothing double-fires.
  function flipAutoDrone(){if(!state.autoDrone.owned){purchaseAutoDrone();return}state.autoDrone.enabled=!state.autoDrone.enabled;save();renderUI()}
  (function(toggle){var pressed=false;
    toggle.addEventListener('pointerdown',function(e){if(e.button&&e.button!==0)return;pressed=true;try{toggle.setPointerCapture(e.pointerId)}catch(err){}});
    toggle.addEventListener('pointerup',function(e){if(!pressed)return;pressed=false;try{toggle.releasePointerCapture(e.pointerId)}catch(err){}flipAutoDrone()});
    toggle.addEventListener('pointercancel',function(){pressed=false});
    toggle.addEventListener('click',function(e){if(e.detail!==0)e.preventDefault();else flipAutoDrone()});
  })($('autoDroneToggle'));
  // Cards for the second wave of upgrades are generated from the table; the originals stay in the HTML.
  (function(){var icons={seedBatchLevel:'<path d="M6 26h20M9 26V14h14v12M12 14V8h8v6M16 8V4"/>',growBatchLevel:'<path d="M6 6h20M8 6v4h16V6M12 10v4m8-4v4M9 28h14l-1-8H10Z"/>',harvestBatchLevel:'<path d="M8 8l16 16M8 24 24 8M8 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm0 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>',packSpeedLevel:'<path d="M4 10h18v14H4zM22 14h5l2 3v7h-7M8 24a2 2 0 1 0 4 0m10 0a2 2 0 1 0 4 0"/>',serviceLevel:'<path d="M4 24h24M6 24V12h20v12M12 12V7h8v5M4 16h24"/>',signLevel:'<path d="M16 28V10M8 10h16l3 4-3 4H8Z"/>',loyaltyLevel:'<path d="M4 9h24v14H4zM4 14h24M9 19h6"/>',basketLevel:'<path d="M5 12h22l-2 14H7ZM10 12l3-7m9 7-3-7M12 17v5m4-5v5m4-5v5"/>',terpeneLevel:'<path d="M12 4h8M14 4v8L6 26h20L18 12V4M10 20h12"/>',breedingLevel:'<path d="M16 28V14M16 14c-6 0-9-4-9-9 6 0 9 4 9 9Zm0 0c6 0 9-4 9-9-6 0-9 4-9 9ZM6 28h20"/>',displayLevel:'<path d="M5 10h22v16H5zM5 18h22M9 10V6h14v4"/>',trendLevel:'<path d="M4 24 12 15l5 5 11-11M20 9h8v8"/>',fleetLevel:'<path d="M12 12h8v6h-8zM4 8h5M23 8h5M6 8v4h6M26 8v4h-6M12 18l-3 6M20 18l3 6"/>',cargoLevel:'<path d="M4 10h24v14H4zM4 16h24M12 10v14m8-14v14"/>',repeatLevel:'<path d="M6 14a10 10 0 0 1 17-6l3 3M26 6v6h-6M26 18a10 10 0 0 1-17 6l-3-3M6 26v-6h6"/>'};
    var blurbs={seedBatchLevel:'Deeper trays start more seedlings per cycle.',growBatchLevel:'Brighter lights fatten every grow batch.',harvestBatchLevel:'Robots trim more flower per pass.',packSpeedLevel:'Machines bag flower faster than hands can.',serviceLevel:'Both counters hand off customers quicker.',signLevel:'Street signs pull more walk-ins through the door.',loyaltyLevel:'Happy customers tip more when they carry your card.',basketLevel:'Customers take a little more home each visit.',terpeneLevel:'Raises the THC of every strain on the menu.',breedingLevel:'Breeds boutique strains that grow closer to everyday speed.',displayLevel:'Boutique flower sells for more in lit cases.',trendLevel:'Spots trends early so the trending strain pays out more.',fleetLevel:'More couriers on the pad: shorter gaps between launches.',cargoLevel:'Bulk runs carry extra orders per launch.',repeatLevel:'A share of web customers order again right away.'};
    var pane=document.querySelector('[data-pane="boosts"]'),anchor=pane.querySelector('.shop-milestone')||null;
    COMPONENTS.forEach(function(c,i){if(document.getElementById('componentBuy'+i))return;var card=document.createElement('div');card.className='shop-upgrade shop-feature';card.innerHTML='<div class="shop-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+icons[c.key]+'</svg></div><div class="shop-copy"><h2>'+c.name+'</h2><strong id="componentBenefit'+i+'"></strong><small>'+blurbs[c.key]+'</small><small id="componentLevel'+i+'"></small></div><button id="componentBuy'+i+'"><span>Upgrade</span><b id="componentPrice'+i+'"></b></button>';pane.insertBefore(card,anchor)});
  })();
  $('expandOrderCounter').onclick=expandOrderCounters;$('buyOrderCounter').onclick=expandOrderCounters;
  var shopBrowser=mountShopBrowser({getState:function(){return state},components:COMPONENTS,kiosks:kioskCount,queueLimit:queueLimit,recommend:function(open){var r=recommendation();if(open){actOnRecommendation();return ''}return r.name+' · '+(r.kind==='component'?'in Customers · ':'upgrade ')+fmt(r.price)}});
  var operationsUI=mountOperations({getState:function(){return state},format:fmt,changed:function(message){save();renderUI();if(message)notify(message,'upgrade')},visit:function(i,manage){visitStore(i+1,!manage);if(manage)manageViewedStore()}});
  function renderManagement(){
    var p=state.empire,report=p.returnReport,investment=recommendation();
    $('returnSummary').hidden=!report;
    if(report){$('returnTime').textContent=duration(report.seconds*1000)+' away · estimated earnings (4-hour cap, 1× rate)';$('returnEarnings').innerHTML=report.earnings.map(function(n,i){return '<li><span>'+(['Home store'].concat(STORES.map(function(s){return s.name})))[i]+'</span><strong>'+fmt(n)+'</strong></li>'}).join('');$('returnGoals').textContent=report.goals+' goals ready to collect on return. Customer service and deliveries resume while playing.';}
    $('nextInvestment').textContent='Next improvement: '+investment.name+' · '+fmt(investment.price)+(state.money<investment.price?' ('+fmt(investment.price-state.money)+' to go)':' · ready');
    var goalsReady=[0,1,2].filter(function(i){var g=goalStatus(p,i,rewardScale());return g.progress>=g.target}).length;if($('goalsBadge')){$('goalsBadge').textContent=goalsReady;$('goalsBadge').hidden=!goalsReady;$('goalsOpen').classList.toggle('has-ready',goalsReady>0);if($('shiftGoalsReady'))$('shiftGoalsReady').textContent=goalsReady?goalsReady+' ready':''}
    [0,1,2].forEach(function(i){var g=goalStatus(p,i,rewardScale());$('goalTitle'+i).textContent=g.title;$('goalProgress'+i).value=g.progress/g.target*100;$('goalCount'+i).textContent=(g.kind==='revenue'?fmt(g.progress)+' / '+fmt(g.target):abbr(g.progress)+' / '+abbr(g.target))+' · '+abbr(p.goalsCompleted)+' goals completed';$('goalClaim'+i).textContent='Collect '+fmt(g.reward);$('goalClaim'+i).disabled=g.progress<g.target;var gated=g.kind==='online'&&!deliveryBuilt()&&g.progress<g.target;if(gated){$('goalCount'+i).textContent='First build the delivery pad · '+fmt(AUTO_DRONE_COST);$('goalClaim'+i).textContent='View delivery pad';$('goalClaim'+i).disabled=false;}});
    var reputationTarget=p.reputation<20?20:60;
    $('reputationStatus').textContent=p.reputation+' loyalty';
    $('reputationNext').textContent=p.reputation>=60?'VIPs unlocked':'VIPs at 60';
    $('reputationProgress').max=reputationTarget;$('reputationProgress').value=Math.min(p.reputation,reputationTarget);
    $('reputationProgress').setAttribute('aria-valuetext',p.reputation+' loyalty. '+(p.reputation>=60?'VIPs unlocked':'VIPs at 60.'));
    $('guideHurriedTime').textContent='≤'+Number(economy.patience('hurried',state.comfortLevel).toFixed(2))+'s';
    $('guideVipTime').textContent='≤'+Number(economy.patience('vip',state.comfortLevel).toFixed(2))+'s';
    $('guideComfort').textContent=state.comfortLevel?'Queue comfort adds '+(state.comfortLevel*15)+'% to both visit limits.':'Queue comfort adds time to both visit limits.';
    $('guideMatchTip').textContent='+'+(p.reputation>=60?'35':'15')+'% base tip';
    $('guideVipUnlock').textContent=p.reputation>=60?'VIPs unlocked · 60 loyalty':'VIPs at 60 loyalty';
    STORES.forEach(function(_,i){var store=p.stores[i];$('branchLoyalty'+i).closest('.branch-management').hidden=!store.level;
      $('branchLoyalty'+i).textContent=store.loyalty+' loyalty';$('branchLoyalty'+i).title=store.loyalty>=60?'VIP following':'VIPs follow at 60';
      var expansion=store.level<3?'Display wing at level 3':store.level<5?'Specialist employee at level 5':store.level<7?'Terrace at level 7':'All expansions built';
      var customers=store.served+' served · '+(store.loyalty>=60?'VIP following':'VIPs at 60 loyalty');
      $('storeDetails'+i).textContent=SPECIALTIES[i]+' · '+expansion+' · '+customers;
    });
    $('bulkDispatch').disabled=p.stores[2].level<2||state.stock[3]<30;
    $('bulkDetail').textContent=(p.stores[2].level<2?'Unlocks at level 2 · ':'')+fmt(bulkReward(p))+' reward · '+qtyLabel(state.stock[3])+' of '+qtyLabel(30)+' shared';
  }
  function renderEmpire(){
    renderStoreView();renderManagement();operationsUI.render();
    var p=state.empire,d=dailyStatus(p,Date.now(),rewardScale()),e=eventStatus(p,Date.now(),rewardScale()),m=CAREER[p.career];
    $('empireBadge').hidden=!(d.available||(m&&state.lifetime>=m.goal)||(e.joined&&!e.claimed&&e.progress>=e.goal));
    $('careerName').textContent=m?m.name:'Bud empire complete';
    $('careerDetail').textContent=m?fmt(state.lifetime)+' / '+fmt(m.goal)+' lifetime revenue':'All six career milestones collected.';
    $('careerProgress').value=m?Math.min(100,state.lifetime/m.goal*100):100;
    $('careerBonus').textContent='Permanent sale bonus: +'+(p.career*5)+'% · '+p.career+' / 6 milestones';
    $('careerClaim').disabled=!m||state.lifetime<m.goal;
    $('careerClaim').textContent=m?'Collect '+fmt(m.reward)+' + 5% sale bonus':'Career complete';
    $('branchSummary').textContent=(1+p.stores.filter(function(s){return s.level>0}).length)+'/'+(STORES.length+1)+' open · '+fmt(branchRate(p)*state.gameSpeed)+'/s';
    STORES.forEach(function(store,i){var level=p.stores[i].level,locked=state.lifetime<store.goal,max=level>=10;
      // Store row: level pips and an income figure instead of a sentence; unopened stores show a lock and the opening price.
      var pips='';for(var pip=0;pip<10;pip++)pips+='<i'+(pip<level?' class="on"':'')+'></i>';
      var rowHtml=level?'<span class="store-level" title="Level '+level+' of 10"><span class="store-pips">'+pips+'</span><b>Lv '+level+'</b></span><span class="store-income"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M9.5 10a2.5 2 0 0 1 5 0c0 2.5-5 1.5-5 4a2.5 2 0 0 0 5 0"/></svg>'+fmt(storeRate(p,i)*state.gameSpeed)+'/s</span>':
        '<span class="store-locked'+(locked?' is-locked':'')+'"><svg viewBox="0 0 24 24" aria-hidden="true">'+(locked?'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>':'<path d="M4 20V9l8-5 8 5v11M9 20v-6h6v6"/>')+'</svg>'+(locked?'Unlock at '+fmt(store.goal):'Open · '+fmt(storeCost(p,i)))+'</span><span class="store-income muted">'+fmt(store.rate*saleMultiplier(p)*Math.max(1,p.retailBoost||1))+'/s</span>';
      if($('branchLevel'+i).dataset.html!==rowHtml){$('branchLevel'+i).innerHTML=rowHtml;$('branchLevel'+i).dataset.html=rowHtml}
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
    $('eventName').textContent=e.name;$('eventDescription').textContent=e.copy+' Earn '+fmt(e.reward)+' and a trophy. Event VIPs visit every fourth arrival and tip 25% extra on boutique flower. Exclusive reward: '+['market lantern','vendor display','harvest planter'][e.slot%3]+' for every branch.';
    $('eventTime').textContent=(e.open?'Ends in ':e.joined&&e.progress>=e.goal&&!e.claimed?'Claim before next event in ':'Next event in ')+duration(e.remaining);
    $('eventProgress').value=Math.min(100,e.progress/e.goal*100);
    $('eventCount').textContent=e.claimed?'Reward collected':e.joined?e.progress+' / '+e.goal+(e.open?' completed':e.progress>=e.goal?' · Complete':' · Event ended'):'Join to start counting progress';
    $('eventAction').textContent=e.claimed?'Collected':e.joined?(e.progress>=e.goal?'Collect '+fmt(e.reward):e.open?'Challenge in progress':'Event ended'):e.open?'Join event':'Waiting for next event';
    $('eventAction').disabled=e.claimed||(e.joined?e.progress<e.goal:!e.open);
    $('eventTrophies').textContent=p.trophies+' event '+(p.trophies===1?'trophy':'trophies')+' · '+p.rewards.filter(Boolean).length+' / 3 scene keepsakes collected';
  }
  $('dailyClaim').onclick=function(){var reward=claimDaily(state,Date.now(),rewardScale());if(reward){save();renderUI();notify('DAILY REWARD · +'+fmt(reward),'upgrade')}};
  $('careerClaim').onclick=function(){var reward=claimCareer(state);if(reward){save();renderUI();notify('CAREER MILESTONE · +'+fmt(reward)+' · +5% sale value','upgrade')}};
  // Opening a store for the first time takes you straight to its map; later upgrades stay on the management pane.
  STORES.forEach(function(store,i){$('branchBuy'+i).onclick=function(){var opening=state.empire.stores[i].level===0;if(buyStore(state,i)){if(opening)telemetry.send('store_opened',{store:store.name});save();renderUI();notify(opening?store.name+' is open · +'+fmt(state.empire.network.stores[i].incomeGain)+'/s':store.name+' upgraded · +'+fmt(state.empire.network.stores[i].incomeGain)+'/s','upgrade');if(opening)visitStore(i+1)}}});
  $('eventAction').onclick=function(){var e=eventStatus(state.empire);if(!e.joined){if(joinEvent(state.empire))notify('EVENT JOINED · '+e.copy)}else{var reward=claimEvent(state,Date.now(),rewardScale());if(reward)notify('EVENT COMPLETE · +'+fmt(reward),'upgrade')}save();renderUI()};
  // The whole bottleneck line is the target; the button inside becomes its chevron.
  var flowGuide=document.querySelector('.flow-guide');if(flowGuide){flowGuide.setAttribute('role','button');flowGuide.setAttribute('tabindex','0');flowGuide.addEventListener('click',function(e){if(e.target!==$('flowAction'))$('flowAction').click()});flowGuide.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();$('flowAction').click()}});$('flowAction').setAttribute('tabindex','-1');$('flowAction').setAttribute('aria-hidden','true');}
  // Goals live in their own popover, opened from a flag beside the customer count, rather than inside the Empire tab.
  var goalsButton=document.createElement('button');goalsButton.type='button';goalsButton.id='goalsOpen';goalsButton.setAttribute('aria-label','Shop story and goals');goalsButton.setAttribute('aria-haspopup','dialog');goalsButton.title='Goals';
  goalsButton.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg><span id="goalsBadge" hidden></span>';
  $('customerStatus').appendChild(goalsButton);
  // The list is a dropdown anchored under the flag, not a full-screen dialog.
  var goalsWrap=document.createElement('div');goalsWrap.className='goals-dropdown';goalsWrap.id='goalsModal';goalsWrap.hidden=true;goalsWrap.setAttribute('role','dialog');goalsWrap.setAttribute('aria-labelledby','goalsTitle');
  goalsWrap.innerHTML='<div class="settings-head"><h2 id="goalsTitle">Your shop story</h2><button type="button" id="goalsClose" aria-label="Close shop story">×</button></div><div class="goals-body"></div>';
  document.body.append(goalsWrap);
  var goalsBody=goalsWrap.querySelector('.goals-body'),nextStepsHeading=today.querySelector('h2:not(.empire-section-heading)');if(nextStepsHeading)nextStepsHeading.remove();
  var investmentLink=document.createElement('button');investmentLink.type='button';investmentLink.id='nextInvestmentLink';investmentLink.append($('nextInvestment'));investmentLink.onclick=function(){closeGoals();var r=recommendation();if(r.kind==='station')selectMachine(r.index);else{showTray('boosts');shopBrowser.show(2);renderUI();}};
  var dailyGoals=document.createElement('details');dailyGoals.className='story-goals';dailyGoals.innerHTML='<summary>Shift goals <span id=shiftGoalsReady></span></summary>';dailyGoals.append($('shortGoals'));goalsBody.append(investmentLink,dailyGoals);$('goalsClose').onclick=closeGoals;
  function placeGoals(){var r=goalsButton.getBoundingClientRect(),wide=window.innerWidth>=480;goalsWrap.style.top=Math.round(r.bottom+8)+'px';goalsWrap.style.right=wide?Math.max(8,Math.round(window.innerWidth-r.right-4))+'px':'8px';goalsWrap.style.left=wide?'auto':'8px';goalsWrap.style.setProperty('--caret',Math.round(r.left+r.width/2-(wide?goalsWrap.getBoundingClientRect().left:8))+'px')}
  function openGoals(){goalsWrap.hidden=false;renderUI();placeGoals();$('goalsClose').focus({preventScroll:true});goalsButton.setAttribute('aria-expanded','true')}
  function closeGoals(){if(goalsWrap.hidden)return;var restore=goalsWrap.contains(document.activeElement);goalsWrap.hidden=true;goalsButton.setAttribute('aria-expanded','false');if(restore)goalsButton.focus({preventScroll:true})}
  goalsButton.setAttribute('aria-expanded','false');goalsButton.onclick=function(){if(goalsWrap.hidden)openGoals();else closeGoals()};
  document.addEventListener('pointerdown',function(e){if(!goalsWrap.hidden&&!goalsWrap.contains(e.target)&&!goalsButton.contains(e.target))closeGoals()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!goalsWrap.hidden){e.stopPropagation();closeGoals();goalsButton.focus()}},true);
  window.addEventListener('resize',function(){if(!goalsWrap.hidden)placeGoals()});
  var empireShell=mountEmpireShell({fit:fitControls,getState:function(){return state},format:fmt});
  var journeyUI=mountJourney({getState:function(){return state},openGoals:openGoals,navigate:function(destination){
    closeGoals();if(destination==='pickup')return selectMachine(5);if(destination==='stations'){var r=recommendation();if(state.lines[r.index]<3)return selectMachine(r.index);return selectMachine(state.lines.findIndex(function(n){return n<3}));}
    if(destination==='flowers')return showTray('flowers');showTray('empire');if(destination==='empire'){empireShell.show('home');return;}
    var i=destination==='regulars'?state.empire.network.stores.findIndex(function(b){return !b.relationship}):0;empireShell.openStore(Math.max(0,i));if(destination==='mara'||destination==='regulars'){var people=$('opTab'+Math.max(0,i)+'2');if(people)people.click();}
  }});
  var startGuide=mountStartGuide({showTray:showTray,collapse:function(){showTray('factory')},fit:fitControls,paintHero:paintIntroArt,sound:function(kind){playSound(kind,state.sound)},report:function(name,props){telemetry.send(name,props)},
    // Construction steps: the guide asks whether a site is built, builds it on a tap, opens the shop at the end and, if
    // skipped, finishes the job itself. On phones the sheet drops away so every site is on screen beneath the card.
    isBuilt:isBuilt,build:buildStation,shopOpen:function(){return state.shopOpen},openShop:openShop,finish:finishConstruction,
    sheet:function(){if(width<780)collapsePanel()},reserve:function(px){guideReserve=px;fitControls()},
    select:function(key){loungeSelected=key==='lounge';securitySelected=key==='door';if(key!=='door'&&key!=='lounge')selected=key;renderUI()}});var guideReplay=document.createElement('button');guideReplay.type='button';guideReplay.className='guide-replay';guideReplay.textContent='Replay the start guide';guideReplay.onclick=function(){startGuide.open()};document.querySelector('.shop-reset').prepend(guideReplay);mountSettings({getState:function(){return state},setSpeed:setGameSpeed});
  manageDialog($('resetModal'),function(){$('resetModal').hidden=true});manageDialog(prestigeDialog,function(){prestigeDialog.hidden=true});
  Array.prototype.forEach.call(document.querySelectorAll('[data-empire-view]'),function(button){button.onclick=function(){var view=button.getAttribute('data-empire-view');Array.prototype.forEach.call(document.querySelectorAll('[data-empire-view]'),function(b){b.setAttribute('aria-pressed',String(b===button))});Array.prototype.forEach.call(document.querySelectorAll('[data-empire-section]'),function(section){section.hidden=section.getAttribute('data-empire-section')!==view});document.querySelector('[data-pane=empire]').scrollTop=0;fitControls()}});

  function syncMapView(){
    var id=state.empire.activeStore;document.body.dataset.storeView=id?'branch':'main';
    $('branchMapMarker').hidden=!id;
    $('world').setAttribute('aria-label',id?BRANCH_THEMES[id-1].name+'. '+BRANCH_THEMES[id-1].description+' Drag or use arrow keys to pan, pinch to zoom, or tap the counter to manage.':'Isometric dispensary. Drag or use arrow keys to pan, pinch to zoom, and tap a station.');
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
    ['Home shop','Riverside','Old Town','City Center','Desert Oasis','Alpine'].forEach(function(name,i){var button=$('storeButton'+i),locked=i>0&&!state.empire.stores[i-1].level;button.disabled=locked;button.setAttribute('aria-pressed',String(id===i));button.setAttribute('aria-label',name+(locked?' · Unlock in Empire':id===i?' · Current store':' · Visit store'));button.title=name+(locked?' · Unlock in Empire':'');});
    $('manageViewedStore').hidden=!id;
    if(locationToggle&&locationToggle.dataset.store!==String(id)){locationToggle.innerHTML=$('storeButton'+id).querySelector('.location-icon').outerHTML+'<span>'+['Home','Riverside','Old Town','City','Desert','Alpine'][id]+'</span><span class=location-chevron aria-hidden=true>⌄</span>';locationToggle.dataset.store=String(id);locationToggle.setAttribute('aria-label','Change location · '+['Home shop','Riverside','Old Town','City Center','Desert Oasis','Alpine'][id])}
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
  // Double-tap anywhere on the map (canvas or a station pill) zooms in around the tap, or back out when already close.
  var lastTap={time:0,x:0,y:0};
  canvas.parentElement.addEventListener('pointerup',function(e){
    if(e.pointerType==='mouse'&&e.button!==0)return;if(Object.keys(touches).length>1||gestureMoved&&e.target===canvas)return;
    if(e.target.closest&&e.target.closest('.map-controls,.location-nav,#locationNav,button:not(.marker)'))return;
    var now=performance.now(),quick=now-lastTap.time<350&&Math.hypot(e.clientX-lastTap.x,e.clientY-lastTap.y)<30;
    lastTap=quick?{time:0,x:0,y:0}:{time:now,x:e.clientX,y:e.clientY};
    if(!quick)return;
    var r=canvas.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
    if(zoom<1.7)zoomAt(2.2,x,y);else{zoom=1;panX=0;panY=0;applyCamera()}
  });
  canvas.addEventListener('pointerup',function(e){mapHintActivity();if(!gestureMoved&&Object.keys(touches).length===1&&state.empire.activeStore){var br=canvas.getBoundingClientRect(),f=BRANCH_THEMES[state.empire.activeStore-1].focus,q=project(f.x,f.y,f.z);if(Math.hypot(e.clientX-br.left-q.x,e.clientY-br.top-q.y)<Math.max(45,unit*3))manageViewedStore()}else if(!gestureMoved&&Object.keys(touches).length===1){var rect=canvas.getBoundingClientRect(),best=-1,distance=60;machinePos.forEach(function(pos,i){var p=project(pos.x,1.4+(pos.y||0),pos.z),d=Math.hypot(e.clientX-rect.left-p.x,e.clientY-rect.top-p.y);if(d<distance){best=i;distance=d}});orderCounterPositions(state.orderCounters).forEach(function(pos){var p=project(pos.x,1.4,pos.z),d=Math.hypot(e.clientX-rect.left-p.x,e.clientY-rect.top-p.y);if(d<distance){best=4;distance=d}});var online=project(-10.7,8.45,1.5),od=Math.hypot(e.clientX-rect.left-online.x,e.clientY-rect.top-online.y);if(od<distance){showTray('orders');renderUI()}else if(best>=0)selectMachine(best)}delete touches[e.pointerId];if(Object.keys(touches).length)gestureMoved=true;else gestureOrigin=null});
  function cancelPointer(e){mapHintActivity();delete touches[e.pointerId];gestureMoved=true}
  canvas.addEventListener('pointercancel',cancelPointer);canvas.addEventListener('lostpointercapture',cancelPointer);
  canvas.addEventListener('wheel',function(e){mapHintActivity();e.preventDefault();var r=canvas.getBoundingClientRect();zoomAt(zoom*Math.exp(-e.deltaY*.0015),e.clientX-r.left,e.clientY-r.top)},{passive:false});
  $('zoomIn').onclick=function(){mapHintActivity();zoomAt(zoom*1.2,width/2,height/2)};
  $('zoomOut').onclick=function(){mapHintActivity();zoomAt(zoom/1.2,width/2,height/2)};
  $('centerView').onclick=function(){mapHintActivity();zoom=1;panX=0;panY=0;applyCamera()};
  var staffButtons=Array.prototype.slice.call(document.querySelectorAll('[data-staff]'));
  staffButtons.forEach(function(button){button.onclick=function(){upgradeStaff(Number(button.getAttribute('data-staff')))}});
  COMPONENTS.forEach(function(_,i){$('componentBuy'+i).onclick=function(){upgradeComponent(i)}});
  var webStock=document.querySelector('#stockStatus .stock-online');webStock.setAttribute('role','button');webStock.setAttribute('tabindex','0');webStock.setAttribute('aria-label','Open deliveries');webStock.onclick=function(){showTray('orders')};webStock.onkeydown=function(event){if(event.key==='Enter'||event.key===' '){event.preventDefault();showTray('orders')}};
  Array.prototype.forEach.call(document.querySelectorAll('#stockStatus .stock-item:not(.stock-online)'),function(item,i){
    var station=[0,1,2,3,5][i];
    item.setAttribute('role','button');item.setAttribute('tabindex','0');
    item.setAttribute('aria-label','Open '+LINES[station].name.toLowerCase()+' upgrades');
    item.onclick=function(){selectMachine(station)};
    item.onkeydown=function(event){if(event.key==='Enter'||event.key===' '){event.preventDefault();selectMachine(station)}};
  });
  $('buyKiosk').onclick=function(){if(!state.kiosk)buyKiosk();else if(!state.secondKiosk)buySecondKiosk();else buyThirdKiosk()};

  $('upgradeQueue').onclick=upgradeQueue;
  // The card's button fixes the bottleneck when affordable (or opens the Shop for foot traffic); otherwise it just shows the station.
  // The counters are only "traffic bound" while an arrivals booster can still be bought; once both are maxed the fix is the station itself.
  function isTrafficBound(slow){return slow>=4&&trafficFix()!==null&&basketSize()/arrivalInterval()<stationThroughput(slow)}
  // Customers arrive too slowly for the counters. Floor flow (+15% arrivals a level) and Street signage (+4%) both bring
  // more through the door: recommend whichever buys the most arrivals per dollar, and while only one of them is within
  // reach — the cash in hand plus a minute and a half of income — that one, so a $174M line never heads the list
  // when a $23M one does the same job.
  function trafficFix(){
    var options=[{index:0,gain:.15},{index:COMPONENTS.findIndex(function(c){return c.key==='signLevel'}),gain:.04}]
      .filter(function(o){return state[COMPONENTS[o.index].key]<COMPONENTS[o.index].max})
      .map(function(o){var price=componentCost(o.index);return{kind:'component',index:o.index,name:COMPONENTS[o.index].name,price:price,value:o.gain/price,reach:price<=state.money+incomeRate()*90?1:0}});
    options.sort(function(a,b){return (b.reach-a.reach)||(b.value-a.value)});
    return options[0]||null;
  }
  // The single answer to "what should I upgrade next?": the counters are only starved of customers if an arrivals booster can
  // still be bought, in which case the better-value one is the fix; otherwise it is the slowest station itself.
  function recommendation(){var slow=slowestStation();if(isTrafficBound(slow))return trafficFix();return{kind:'station',index:slow,name:['Seeds','Grow','Harvest','Pack','Orders','Pickup'][slow],price:cost(slow)}}
  function actOnRecommendation(){var r=recommendation();if(r.kind==='component'){showTray('boosts');if(shopBrowser&&shopBrowser.show)shopBrowser.show(2);renderUI();var card=$('componentBuy'+r.index).parentElement;card.classList.remove('is-recommended');void card.offsetWidth;card.classList.add('is-recommended');if(card.scrollIntoView)card.scrollIntoView({block:'nearest'});return}if(activeTray!=='factory')showTray('factory');selectMachine(r.index);if(state.money>=cost(r.index))buySelected()}
  $('flowAction').onclick=function(){if(state.gameSpeed===0)return setGameSpeed(1);if(!state.shopOpen){if(!state.doorBuilt)return buildStation('door');var next=state.lines.indexOf(0);return next<0?openShop():buildStation(next)}actOnRecommendation()};
  LINES.forEach(function(_,i){$('staffMax'+i).onclick=function(){trainStaffMax(i)}});
  $('trainIdChecker').onclick=function(){if(!state.doorBuilt)return buildStation('door');trainIdChecker(1)};
  $('trainIdCheckerMax').onclick=function(){trainIdChecker(10000)};
  $('fulfillOnlineMax').onclick=function(){sendOnlineOrders(state.lines[3]>=10?Infinity:10)};
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){updateMarkers.key=null;render.invalidated=true});
  window.addEventListener('resize',resize);$('buyMachine').onclick=buySelected;$('buyMachineMax').onclick=buySelectedMax;$('upgradeStorage').onclick=upgradeStorage;$('boost').onclick=boostAll;$('claim').onclick=claimOrder;$('resetOpen').onclick=function(){$('resetModal').hidden=false};$('resetCancel').onclick=function(){$('resetModal').hidden=true};$('resetConfirm').onclick=function(){resetRun(0,state.sound)};function resetRun(rank,sound){if(rank>0)telemetry.send('prestige',{rank:rank});state=fresh();state.empire.prestige=rank;state.sound=sound;
    // A prestige reopens a standing shop; Start over goes back to the building site and replays the intro.
    if(rank>0){state.lines=LINES.map(function(){return 1});state.doorBuilt=true;state.shopOpen=true}
    syncDominantFormat();readyWork=0;work=[0,0,0,0,0,0];batchRemainder=[0,0,0,0];customers=[];arrival=0;customerId=0;deliveryDrones=[];particles=[];tickets=[];taskClocks.fill(0);taskActivity.fill(0);cropGrowth=[.15,.4,.7,.95];tierFlashes.fill(0);buildRise.fill(0);confetti=[];recentPickupRatings=[];animationTime=0;sceneTime=0;crateTime=0;render.last=undefined;securitySelected=false;loungeSelected=false;selected=0;updateMarkers.key=null;save();$('resetModal').hidden=true;notify(rank>0?'FACTORY RESET':'STARTING OVER');syncMapView();paintThumbnails();renderUI();if(!state.shopOpen)setTimeout(function(){startGuide.open()},400)};

  // The intro waits behind the 21+ gate; a visitor who answers No never sees it.
  // `resume` picks the intro up at the first unbuilt site when a half-built shop is reloaded.
  function openGuideAfterGate(resume){var root=document.documentElement,gate=$('ageGate');if(!gate||root.classList.contains('age-ok'))return setTimeout(function(){startGuide.open({resume:resume})},600);
    if(!window.MutationObserver)return;new MutationObserver(function(_,observer){if(root.classList.contains('age-ok')){observer.disconnect();setTimeout(function(){startGuide.open({resume:resume})},350)}}).observe(root,{attributes:true,attributeFilter:['class']})}
  function finishLoading(){requestAnimationFrame(function(){requestAnimationFrame(function(){$('loading').hidden=true})})}
  var offline=collectOffline();if(offline>=1){setTimeout(function(){notify('WHILE AWAY +'+fmt(offline))},500)}
  // The canvas runs full height behind the sheet; the camera frames the building in the strip above it.
  var dockHeight=0;
  function fitControls(){document.documentElement.style.setProperty('--hud-height',document.querySelector('.hud').getBoundingClientRect().height+'px');
    var sheet=$('sheet');if(!phoneSheet())sheet.classList.remove('tall');
    // A tall or gliding sheet keeps the last settled dock height, so the map is framed for the half-open sheet it sits behind.
    if(!sheet.classList.contains('tall')&&!sheet.classList.contains('fluid')){dockHeight=sheet.getBoundingClientRect().height;if(!sheet.classList.contains('collapsed')&&!paneGlide)sheetHalfHeight=dockHeight}
    document.documentElement.style.setProperty('--dock-height',dockHeight+'px');resize()}
  // While the intro's card is docked over the collapsed tray, the map is framed above the card rather than the tray.
  var guideReserve=0;
  function visibleHeight(){return width>=780?height:Math.max(200,height-Math.max(dockHeight,guideReserve))}
  if(window.ResizeObserver){new ResizeObserver(fitControls).observe($('sheet'))}
  window.addEventListener('resize',fitControls);
  // Desktop conveniences: the hint names the pointer, and speed and tabs have keys when no field has focus.
  // Hint copy follows the active pointer, and drops the keyboard shortcuts where the map is too narrow to fit them.
  var coarsePointer=window.matchMedia('(pointer:coarse)');
  function syncGestureHint(){var copy=coarsePointer.matches?'DRAG TO PAN · PINCH TO ZOOM':width<560?'DRAG TO PAN · SCROLL TO ZOOM':'DRAG OR ARROWS / WASD TO PAN · SCROLL TO ZOOM · SPACE PAUSES · 1 2 4 SET SPEED';if($('gestureHint').textContent!==copy)$('gestureHint').textContent=copy}
  if(coarsePointer.addEventListener)coarsePointer.addEventListener('change',syncGestureHint);window.addEventListener('resize',syncGestureHint);
  document.addEventListener('keydown',function(e){
    if(e.defaultPrevented||e.metaKey||e.ctrlKey||e.altKey)return;var t=e.target,tag=t&&t.tagName;if(tag==='INPUT'||tag==='SELECT'||tag==='TEXTAREA'||(t&&t.isContentEditable))return;
    if(document.querySelector('.start-guide:not([hidden])')||document.querySelector('.modal-wrap:not([hidden])'))return;
    if(e.key===' '&&t&&t.closest('button,a,summary,[role=button]'))return;
    // Arrow keys still scroll a panel that has focus; WASD pans from anywhere outside a field.
    if(PAN_KEYS[e.code]&&!(e.code.indexOf('Arrow')===0&&t&&t.closest('.sheet,.goals-dropdown'))){e.preventDefault();if(!heldPanKeys[e.code]){heldPanKeys[e.code]=true;mapHintActivity()}return}
    if(e.key===' '){e.preventDefault();setGameSpeed(state.gameSpeed===0?1:0)}
    else if(e.key==='1'||e.key==='2'||e.key==='4')setGameSpeed(Number(e.key));
    else if(e.key==='Escape'&&panelOpen)collapsePanel();
  });
  document.addEventListener('keyup',function(e){if(heldPanKeys[e.code])delete heldPanKeys[e.code]});
  window.addEventListener('blur',releasePanKeys);
  if(state.empire.returnReport){renderUI()}
  syncMapView();if(!state.empire.returnReport&&state.empire.activeStore){showTray('empire');collapsePanel()}
  paintThumbnails();
  selected=slowestStation();fitControls();syncGestureHint();renderUI();telemetry.drain();telemetry.session({returning:!firstRun});telemetry.heartbeat();ctx.fillStyle=colors.bg;ctx.fillRect(0,0,width,height);window.__shiftReady=true;finishLoading();if(!state.shopOpen)openGuideAfterGate(!firstRun);else if(firstRun&&!startGuide.seen())openGuideAfterGate(false);requestAnimationFrame(render);setInterval(tick,50);setInterval(function(){renderUI(true)},250);setInterval(function(){if(!document.hidden)save()},5000);window.addEventListener('beforeunload',function(){if(!document.hidden)save()});window.addEventListener('pagehide',function(){if(!document.hidden)save()});
  document.body.dataset.pageHidden=String(document.hidden);
  document.addEventListener('visibilitychange',function(){document.body.dataset.pageHidden=String(document.hidden);tickTime=performance.now();tickRemainder=0;if(document.hidden){releasePanKeys();save()}else{collectOffline();if(state.empire.returnReport){renderUI()}renderUI()}});

  if(document.modelContext&&document.modelContext.registerTool){document.modelContext.registerTool({name:'read_factory_status',title:'Read factory status',description:'Read cash, production, and machine levels.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute:function(){return{orderCounters:state.orderCounters,reservedWalkInBags:customers.filter(function(c){return c.ordered&&!c.bag}).reduce(function(n,c){return n+(c.bags||1)},0),orderCounterPositions:orderCounterPositions(state.orderCounters),autoDrone:state.autoDrone,deliveryDrones:deliveryDrones.length,productMenu:state.productMenu,prestige:state.empire.prestige,contract:state.contract,viewedStore:state.empire.activeStore,branchLevels:state.empire.stores.map(function(s){return s.level}),branchProjects:state.empire.stores.map(function(s){return s.projects}),network:state.empire.network,reputation:state.empire.reputation,management:state.empire.stores,goalsCompleted:state.empire.goalsCompleted,branchIncome:branchRate(state.empire)*state.gameSpeed,cash:Math.floor(state.money),lifetime:Math.floor(state.lifetime),perSecond:production()*state.gameSpeed,gameSpeed:state.gameSpeed,paused:state.gameSpeed===0,lineLevels:state.lines,shopOpen:state.shopOpen,doorBuilt:state.doorBuilt,stock:state.stock,customersServed:state.sold,employeeLevels:state.staff,onlineCompleted:state.onlineCompleted,camera:{zoom:zoom,panX:panX,panY:panY,angle:angle},orderRoute:queueRoute(false),pickupRoute:queueRoute(true),lounge:{level:state.lounge,seats:loungeSeats(state.lounge),seated:loungeSeated(),waiting:loungeWaiting().length,sessions:state.loungeSessions,earned:state.loungeEarned,rate:loungeCurrentRate(state.lounge,loungeSeated(),flowerValue())*state.gameSpeed,nextCost:loungeUpgradeCost(state.lounge)},customers:customers.map(function(c){return{kind:c.kind,id:c.id,phase:c.phase,ordered:c.ordered,bag:c.bag,bags:c.bags||0,kiosk:!!c.kiosk,lounge:!!c.lounge,orderCounter:c.orderCounter,pickupTicket:c.pickupTicket||0,walking:!!c.walking,x:c.x,z:c.z,serviceElapsed:c.serviceElapsed||0}})}}});}
})();
