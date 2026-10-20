import {PICKUP_WINDOW,PICKUP_SIGN,WINDOW_CLERK,WINDOW_COST,HATCH_COST,TIPS_COST,TIP_SHARE,migrateWindow,windowLineMax,windowServeSeconds,windowRoom,walkupCount,createWindowLine,addWalkups,stepWindowLine,windowFigures} from './pickup-window.js';
import {migrateOrderCounters,orderCounterPositions,COUNTER_SHIFT,PICKUP_X,orderCounterCost,buyOrderCounter,ORDER_QUEUE_GATE,assignOrderCounter,assignKiosk,takesKiosk,atOrderCounter,orderAvailability,pickupPlaces} from './order-counters.js';
import {makeLifts,tickLifts,CAB_SLOTS} from './lounge-lifts.js';
import {LOUNGE_TIERS,LOUNGE_MAX,migrateLounge,loungeTier,loungeUpgradeCost,loungeSeats,loungeSessionSeconds,buyLoungeTier,wantsLounge,loungeAdmission,loungeTake,loungeRate,loungeCurrentRate,migrateLoungeHost,buyLoungeLift,LOUNGE_LIFT_COST,LOUNGE_LIFT_SPEED,loungeHostSpeed,loungeHostCost} from './lounge.js';
import {migrateShopPlay,picks as momentPicks,createMoment,judgeChoice,tipFor,recordServed,tickShift,operationsAlerts,mountShopPlay} from './shop-play.js';
import {migrateJourney,advanceJourney,CHAPTERS} from './journey.js';
import {mountJourney} from './journey-ui.js';
import {manageDialog} from './dialog-focus.js';
import {migrateBuilds,startBuild,isBuilding,buildLeft,buildShareLeft,finishBuilds,buildClock} from './builds.js';
import {AUTO_DRONE_COST,BULK_DRONE_COST,payAutoDrone,grantAutoDrone,buyBulkDrone,autoDroneLimit,migrateAutoDrone,autoDroneReady} from './auto-drone.js';
import {FORMATS,wantedFormat,formatPremium,BOOST_MAX,boostCost,migrateMenu,unlockFormat,menuFormatFactor,milestone,prestigeOffer,elapsedSteps,OFFLINE_STEP} from './depth.js';
import {PERKS,migratePerks,perkLevel,perkCost,buyPerk,perkStart,spenderGap,rushLength,trainerGap,keptBranch,FOUNDER_LOOK,FOUNDER_LEVEL} from './perks.js';
import {migrateRun,freshRun,tickRun,reopenMoment} from './reopen.js';
import {makeSound} from './sfx.js';
import {FORKS,RESEARCH_BRANCHES,freshForks,migrateForks,sideStatus,takeSide,partnerOf,levelsToGate,forkOf} from './research.js';
import {installQuietDom} from './quiet-dom.js';
import {createTelemetry} from './telemetry.js';
import {createReminders,planReminders} from './reminders.js';
import {migrateAchievements,checkAchievements,achievementBonus} from './achievements.js';
import {CULTIVARS,PARENT_LEVEL,migrateCrosses,crossBonus,cultivarStatus,startCross,tickCross,sortedCultivars} from './breeding.js';
installQuietDom();
import {mountShopBrowser} from './shop-browser.js';
import {tickOperations,atmosphere,neighborhood} from './operations.js';
import {mountOperations} from './operations-ui.js';
import {mountEmpireShell} from './empire-shell.js';
import {mountStartGuide} from './start-guide.js';
import {mountSettings} from './settings.js';
import {requestCap,requestRate,accrueRequests,requestsReady,consumeRequests,requestHeat} from './deliveries.js';
import { BRANCH_THEMES, drawBranchMap } from './branch-maps.js';
import { SUNNY, SHOP_SPRITES, SUNNY_VIEW, PERSON_HEAD_Y, subwayStairs, SUBWAY_HIDDEN_Z, drawSprite, stationSprite, drawPersonSprite, drawWalker, streetItems, floorTextureFiles, fixtureSprite, shellSprite, spriteImage, spritesLoading, drawBoxSprite, softShadow, sunShadow, SUN, SUN_REACH, townLayout, carPlacements, walkerPlacements, stationSpriteSize, stationTier as spriteTier } from './sunny-world.js';
import * as economy from './economy.js';
import {ABILITIES,ABILITY_UNLOCK,ABILITY_FACTOR,ABILITY_SALES,ABILITY_SECONDS,migrateAbilities,abilityStatus,useAbility,tickAbilities,abilityFactor,abilitySales,clockLabel} from './crew-abilities.js';
import * as strains from './strains.js';
import { abbr, SPECIALTIES, customerType, satisfyCustomer, tickBranches, bulkReward, dispatchBulk, recordGoal, goalStatus, claimGoal, settleGoals, shiftStatus, STORE_PROJECTS, PROJECT_LEVELS, PROJECT_BONUSES, projectCost, projectBonus, buyProject, nextStoreRate, selectedStore, selectStore, migrateProgression, dailyStatus, claimDaily, saleMultiplier, claimCareer, CAREER, STORES, DAILY, storeCost, storeRate, branchRate, buyStore, branchOpenable, settleStars, starCount, branchFinished, STAR_BONUS, recordEvent, contractOffer, activeContract, contractTwist, contractFactor, startContract, skipContract, settleContract, useContractBoost, tickContractBoost, contractBoostFactor, CONTRACT_BOOST_SECONDS, seasonStatus, claimSeason, SEASONS, RETIRED_WEEKLY, nextSeason, weeklySpecial, specialFactor } from './progression.js';
import {mountUiKit} from './ui-kit.js';
// ?ui=kit shows the shared reskin components over the game (see ui-kit.js).
if(/[?&]ui=kit(&|$)/.test(location.search))mountUiKit();

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
  function fresh(){return{forks:freshForks(),shopPlay:migrateShopPlay(),money:30,lifetime:0,orderCounters:1,lightMode:null,journey:migrateJourney(),autoDrone:migrateAutoDrone(),pickupWindow:migrateWindow(),builds:migrateBuilds(),productMenu:migrateMenu(),sound:true,empire:migrateProgression(),idStaff:0,curingLevel:0,durationLevel:0,kioskSpeedLevel:0,onlineBonusLevel:0,comfortLevel:0,offlineLevel:0,spenderClock:180,rushTime:0,crosses:{done:[],active:null},achievements:[],reminders:false,perks:{points:0,levels:{}},run:freshRun(),trainerClock:0,scannerLevel:0,webLevel:0,trafficLevel:0,pickupLevel:0,readyLevel:0,strains:[1,0,0,0],activeStrain:0,menuStrains:[0],lines:[0,0,0,0,0,0],doorBuilt:false,shopOpen:false,stock:[0,0,0,0,0],staff:[0,0,0,0,0,0],abilities:migrateAbilities(),sold:0,kiosk:false,secondKiosk:false,thirdKiosk:false,lounge:0,loungeStaff:0,loungeLift:false,loungeSessions:0,loungeEarned:0,queueLevel:0,storageLevel:0,onlineCompleted:0,onlineRequests:0,hints:{web:false,storage:false,queue:false},multiplier:1,globalLevel:0,contract:0,lastSeen:Date.now(),theme:'dispensary',gameSpeed:1,strainTrend:strains.migrateTrend(null,4),vipBuzz:0,seedBatchLevel:0,growBatchLevel:0,harvestBatchLevel:0,packSpeedLevel:0,serviceLevel:0,signLevel:0,loyaltyLevel:0,basketLevel:0,terpeneLevel:0,breedingLevel:0,displayLevel:0,trendLevel:0,fleetLevel:0,cargoLevel:0,repeatLevel:0}}
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
    next.offlineLevel=Math.floor(finite(old.offlineLevel,0,0,5));next.forks=migrateForks(old.forks,next);next.spenderClock=finite(old.spenderClock,180,0,600);next.rushTime=finite(old.rushTime,0,0,120);next.crosses=migrateCrosses(old.crosses,old.library,old.breed);next.achievements=migrateAchievements(old.achievements);next.reminders=old.reminders===true;next.perks=migratePerks(old.perks,next.empire.shares);next.run=migrateRun(old.run);next.trainerClock=finite(old.trainerClock,0,0,240);
    next.idStaff=Math.floor(finite(old.idStaff,0,0,economy.SECURITY_MAX_LEVEL));
    next.strains=STRAINS.map(function(_,i){return Math.floor(finite(old.strains&&old.strains[i],i===0?1:0,i===0?1:0,strains.STRAIN_MAX))});
    next.activeStrain=Math.floor(finite(old.activeStrain,0,0,STRAINS.length-1));if(!next.strains[next.activeStrain])next.activeStrain=0;
    next.menuStrains=STRAINS.map(function(_,i){return i}).filter(function(i){return next.strains[i]>0&&(!Array.isArray(old.menuStrains)||old.menuStrains.indexOf(i)>=0)});if(!next.menuStrains.length)next.menuStrains=[0];next.strainTrend=strains.migrateTrend(old.strainTrend,STRAINS.length);next.vipBuzz=finite(old.vipBuzz,0,0,strains.VIP_BUZZ_SECONDS);
    next.journey=migrateJourney(old.journey);next.orderCounters=migrateOrderCounters(old.orderCounters);
    next.money=finite(old.money,30,0,Number.MAX_SAFE_INTEGER);
    next.lifetime=finite(old.lifetime,0,0,Number.MAX_SAFE_INTEGER);
    next.sold=Math.floor(finite(old.sold,0,0,Number.MAX_SAFE_INTEGER));
    next.onlineCompleted=Math.floor(finite(old.onlineCompleted,0,0,Number.MAX_SAFE_INTEGER));next.onlineRequests=finite(old.onlineRequests,0,0,40);next.hints={web:!!(old.hints&&old.hints.web),storage:!!(old.hints&&old.hints.storage),queue:!!(old.hints&&old.hints.queue)};
    next.contract=Math.floor(finite(old.contract,0,0,21));next.productMenu=migrateMenu(old.productMenu);next.sound=old.sound!==false;next.lightMode=['day','night'].includes(old.lightMode)?old.lightMode:null;next.autoDrone=migrateAutoDrone(old.autoDrone);next.pickupWindow=migrateWindow(old.pickupWindow,next.autoDrone.owned);next.builds=migrateBuilds(old.builds);
    next.globalLevel=Math.floor(finite(old.globalLevel,0,0,500));
    next.multiplier=Math.pow(1.25,next.globalLevel);
    next.lastSeen=finite(old.lastSeen,Date.now(),0,Date.now());next.lines=LINES.map(function(_,i){return Math.floor(finite(old.lines&&old.lines[i],1,next.shopOpen?1:0,10000))});next.storageLevel=Math.min(20,Math.max(0,Math.floor(Number(old.storageLevel)||0)));next.stock=Array.from({length:5},function(_,i){return Math.floor(finite(old.stock&&old.stock[i],0,0,i===4?100+next.readyLevel*50:100+next.storageLevel*100))});next.staff=LINES.map(function(_,i){return Math.floor(finite(old.staff&&old.staff[i],0,0,10000))});next.abilities=migrateAbilities(old.abilities);next.kiosk=old.kiosk===true;next.lounge=migrateLounge(old.lounge);next.shopPlay=migrateShopPlay(old.shopPlay);next.loungeStaff=migrateLoungeHost(old.loungeStaff);next.loungeLift=next.lounge>0&&old.loungeLift===true;next.loungeSessions=Math.floor(finite(old.loungeSessions,0,0,1e9));next.loungeEarned=finite(old.loungeEarned,0,0,1e15);next.secondKiosk=next.kiosk&&old.secondKiosk===true;next.thirdKiosk=next.secondKiosk&&old.thirdKiosk===true;next.queueLevel=Math.min(7,Math.max(0,Math.floor(Number(old.queueLevel)||0)));next.theme='dispensary';next.gameSpeed=[0,1,2,4].indexOf(old.gameSpeed)>=0?old.gameSpeed:1;return next}catch(e){return fresh()}}
  var firstRun=false;try{firstRun=!localStorage.getItem('shift-save')}catch(e){}
  var securitySelected=false,loungeSelected=false;
  // False once the player closes the station menu or taps empty map: the panel keeps its station, the map shows no pick.
  var mapPicked=true;
  var selectedLine=document.querySelector('.selected-line'),buyActions=document.querySelector('.station-buy-actions');
  var state=load(),achievementClock=0,selected=0,toastTimer,dispatchSummary=null;checkAchievements(state);
  state.empire=migrateProgression(state.empire);state.empire.activeStore=selectedStore(state.empire);state.empire.retailBoost=retailBoost();advanceJourney(state);
  function visualLight(){return state.lightMode?{night:state.lightMode==='night',darkness:state.lightMode==='night'?.34:0}:atmosphere(state.empire.network)}
  var lightToggle=document.createElement('button');lightToggle.id='lightToggle';lightToggle.type='button';lightToggle.onclick=function(){state.lightMode=visualLight().darkness>.15?'day':'night';save();renderUI()};document.querySelector('.speed-controls').appendChild(lightToggle);
  var speedButtons=Array.prototype.slice.call(document.querySelectorAll('[data-speed]'));
  function setGameSpeed(value){if([0,1,2,4].indexOf(value)<0)return;if(state.gameSpeed!==value)playSound('tap',state.sound);state.gameSpeed=value;renderUI();save();notify(value===0?'GAME PAUSED':'GAME SPEED · '+value+'×')}
  // The 1× button doubles as pause: pressed again at normal speed it stops the clock, and pressed while paused it resumes.
  var speedOne=speedButtons.filter(function(b){return b.getAttribute('data-speed')==='1'})[0],PLAY_GLYPH=speedOne.innerHTML,PAUSE_GLYPH='<svg viewBox="0 0 18 16" fill="currentColor" aria-hidden="true"><path d="M5 3.5h3v9H5zM10 3.5h3v9h-3z"></path></svg>';
  speedButtons.forEach(function(button){button.onclick=function(){var value=Number(button.getAttribute('data-speed'));setGameSpeed(value===1&&state.gameSpeed===1?0:value)}});
  var tickTime=performance.now(),tickRemainder=0;
  function tick(){if(SNAP)return;var now=performance.now(),seconds=(now-tickTime)/1000;tickTime=now;if(document.hidden){tickRemainder=0;return}completeBuilds();var elapsed=elapsedSteps(seconds+tickRemainder,state.gameSpeed);if(elapsed.offline){tickRemainder=0;collectOffline(elapsed.offline)}else{tickRemainder=Math.max(0,seconds+tickRemainder-Math.floor((seconds+tickRemainder+1e-8)/.05)*.05);for(var step=0;step<elapsed.steps;step++)simulate(.05)}}
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
  function branchIncome(p){return branchRate(p)*specialFactor('branch')}
  function incomeRate(){return Math.min(production(),flowerValue()*basketSize()/arrivalInterval())+branchIncome(state.empire)}
  // Offline earnings accrue whether or not the game was paused; the Back-room safe raises the cap in four-hour steps.
  function offlineCap(){return OFFLINE_STEP*(1+state.offlineLevel)}
  function offlineReward(seconds){return incomeRate()*Math.min(offlineCap(),Math.max(0,seconds))}
  // Daily, goal and event payouts grow with the shop so they are still worth a tap hours in.
  function rewardScale(){return economy.rewardScale(incomeRate())}
  function collectOffline(elapsed){
    var away=elapsed===undefined?Math.max(0,(Date.now()-state.lastSeen)/1000):elapsed;
    var seconds=Math.min(offlineCap(),away);accrueOnlineRequests(seconds);tickAbilities(state.abilities,away);
    var rates=[Math.min(production(),flowerValue()*basketSize()/arrivalInterval())].concat(STORES.map(function(_,i){return storeRate(state.empire,i)}));
    var earnings=rates.map(function(rate){return rate*seconds});
    var reward=earnings.reduce(function(a,b){return a+b},0);
    if(reward>=1)add(reward);
    // Short breaks get the toast only; the full report is for real absences.
    if(seconds>=900&&state.shopOpen)state.empire.returnReport={seconds:away,earnings:earnings,goals:[0,1,2].filter(function(i){var g=goalStatus(state.empire,i,rewardScale());return g.progress>=g.target}).length};
    save();return reward>=1?reward:0;
  }

  function menuStrains(){return state.menuStrains.filter(function(i){return state.strains[i]>0})}
  function menuChoice(sequence){var menu=menuStrains();return menu[sequence%menu.length]}
  // Regulars reach for the everyday strain; VIPs take the reserve when the menu offers one.
  // A VIP takes the reserve strain; everyone else takes their strain in the type they came for (see `wantedFormat`),
  // since every strain sells in every stocked type, and pays that type's premium. A VIP pays the menu's mean value.
  function strainFor(c){if(c.kind==='vip'){var reserve=strains.reserveStrain(menuStrains(),state.strains);if(reserve!==null)return reserve}var preferred=economy.preferredStrain(c.kind,menuStrains(),state.strains);return preferred===null?menuChoice(c.id):preferred}
  function salePriceFor(c,strain){if(c.kind==='vip')return flowerValue(strain);return Math.round(flowerValue(strain)/formatFactor('value')*formatPremium(state.productMenu,wantedType(c))*(contractTwist(state.empire)==='prerolls'&&wantedType(c)===1?.8:1))}
  // The running contract counts VIPs served within their 15 seconds and units of the type it asks for.
  function recordContractSale(c){if(!contractTwist(state.empire))return;if(c.kind==='vip'){if(Math.max(0,(c.waitSeconds||0)-(c.adviceWait||0))<=15*(1+state.comfortLevel*.15))recordEvent(state.empire,'vip',1);return}var f=wantedType(c);if(f===2)recordEvent(state.empire,'edible',c.bags||1);else if(f===1)recordEvent(state.empire,'preroll',c.bags||1)}
  // A type contract's twist sends every other walk-in to that type, when the shop stocks it.
  function wantedType(c){var t=contractTwist(state.empire),m=state.productMenu;if(c.id%2&&t==='edibles'&&m.unlocked[2])return 2;if(c.id%2&&t==='prerolls'&&m.unlocked[1])return 1;return wantedFormat(m,c.id)}
  // Satisfaction tips: patience stretches with Queue comfort, and Lasting effects sweeten every happy sale.
  function customerSaleBonus(c){var bonus=satisfyCustomer(state.empire,-1,c.kind,(c.normalStrain===undefined?c.strain:c.normalStrain)===0?'everyday':'boutique',Math.max(0,(c.waitSeconds||0)-(c.adviceWait||0)),1+state.comfortLevel*.15);if(bonus>1)bonus+=state.durationLevel*.03;
    // Strain identity: potency tips, the everyday and VIP perks, and Violet Haze's word of mouth on happy boutique sales.
    bonus*=strains.tipFactor(c.kind,strainPotency(c.strain||0));if(bonus>1)bonus*=1+state.loyaltyLevel*.03;
    if(c.strain===0)bonus*=strains.everydayBonus(state.strains);
    // VIPs: served their reserve they pay the Orchid premium, boost reputation and start a buzz; offered only everyday flower they snub the shop.
    if(c.kind==='vip'){if(c.strain>0){bonus*=strains.vipBonus(state.strains);state.empire.reputation=Math.min(1000,state.empire.reputation+strains.VIP_REPUTATION);state.vipBuzz=strains.VIP_BUZZ_SECONDS;burst({x:PICKUP_X,z:4.9,y:1.6},'#f0cf7f')}else{bonus=1;state.empire.reputation=Math.max(0,state.empire.reputation-strains.VIP_SNUB_REPUTATION)}}
    if(bonus>1&&c.strain>0)state.empire.reputation=Math.min(1000,state.empire.reputation+strains.reputationBonus(state.strains));
    return bonus*(state.rushTime>0?2:1)*contractBoostFactor(state.empire)*abilitySales(state.abilities)}
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
    $('strainNav').innerHTML=STRAINS.map(function(strain,i){return '<button type="button" role="tab" id="strainTab'+i+'" style="--strain:'+strain.color+'"><span class="strain-card-art"></span><b>'+typeGlyph(strains.STRAIN_TYPE[i])+strain.name.replace(' ',' <br>')+'</b><small></small><em class="strain-pips" aria-hidden="true">'+Array.from({length:10},function(){return '<i></i>'}).join('')+'</em></button>'}).join('');
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
      Array.prototype.forEach.call(tab.querySelectorAll('.strain-pips i'),function(pip,k){pip.classList.toggle('is-filled',k<level);pip.classList.toggle('is-second',k<level-10)});
    });
    var i=flowerFocus,strain=STRAINS[i],look=STRAIN_LOOKS[i],level=state.strains[i],active=state.menuStrains.indexOf(i)>=0,price=strainCost(i),maxed=level>=strains.STRAIN_MAX,detail=$('strainDetail');
    var isNight=atmosphere(state.empire.network).night,type=strains.STRAIN_TYPE[i],timeNow=strains.timeFactor(type,isNight);
    var nextValue=Math.round(strain.price*(1+level*.1)*(1+state.curingLevel*.03)*saleMultiplier(state.empire)*formatFactor('value')*trendBoost(i)*displayBoost(i)*timeNow);
    var stats=level?
      '<span><b>'+fmt(flowerValue(i))+'</b><small>'+'per sale'+'</small></span><span><b>'+thcLabel(i)+'</b><small>THC</small></span><span><b>'+(maxed?'Max':'+'+fmt(nextValue-flowerValue(i)))+'</b><small>'+(maxed?'level '+strains.STRAIN_MAX:'next lv')+'</small></span>':
      '<span><b>'+fmt(Math.round(strain.price*(1+state.curingLevel*.03)*saleMultiplier(state.empire)*formatFactor('value')*timeNow))+'</b><small>'+'per sale'+'</small></span><span><b>'+thcLabel(i)+'</b><small>THC</small></span><span><b>'+fmt(strain.unlock)+'</b><small>unlock</small></span>';
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
      '<div class="strain-hero-info"><small class="strain-kind"><span class="strain-kind-tier">'+look.kind+' · </span>'+strains.TYPES[type]+(level?' · <span class="strain-kind-long">Level </span><span class="strain-kind-short">Lv </span>'+level+' / '+strains.STRAIN_MAX:' · Locked')+'</small><h2>'+strain.name+'</h2><p>'+(level?look.buyers:'Unlock to put it on the menu. '+look.buyers)+'</p></div>'+
      '<div class="strain-stats">'+stats+'</div>'+
      '<div class="strain-hero-details">'+traits+perkLine+'</div>'+
      (level?'<div class="product-line strain-format"><h2>Sells as</h2><div class="format-options">'+FORMATS.map(function(f,k){var stocked=state.productMenu.unlocked[k];return '<button type="button" class="strain-format-pill" data-format="'+k+'" aria-pressed="'+stocked+'"'+(!stocked&&state.money<f.cost?' disabled':'')+' title="'+f.detail+'"><svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+productIcons[k]+'</svg><strong>'+f.name+'</strong><small>'+(stocked?'Selling':fmt(f.cost))+'</small></button>'}).join('')+'</div><p class="format-benefit">'+(function(){var next=FORMATS.findIndex(function(f,k){return !state.productMenu.unlocked[k]});return next<0?'Every strain sells in all three types, to whoever wants each.':'Stock '+FORMATS[next].name.toLowerCase()+' for every strain · '+['','+45% value for the 3 in 10 who want them · slower packing','+120% value for the 1 in 5 who want them · slow packing'][next]})()+'</p></div>':'')+
      '<div class="strain-hero-actions">'+(level?'<button type="button" id="flowerSelect" aria-pressed="'+active+'">'+(active?'On menu ✓':'Add to menu')+'</button>':'')+'<button type="button" id="flowerBuy" class="is-primary">'+(maxed?'Fully upgraded':(level?'Upgrade':'Unlock')+' · '+fmt(price))+'</button></div>'+
    '</div>';
    var heroKey=heroHtml+'|'+(maxed||state.money<price)+'|'+(active&&menu.length===1)+'|'+state.productMenu.unlocked.join(',');
    Array.prototype.forEach.call(document.querySelectorAll('.menu-board .trend-clock'),function(el){el.textContent=trendClock});
    if(detail.dataset.key===heroKey)return;
    detail.innerHTML=heroHtml;detail.dataset.key=heroKey;
    Array.prototype.forEach.call(detail.querySelectorAll('.trend-clock'),function(el){el.textContent=trendClock});
    if(level){var sel=$('flowerSelect');sel.disabled=active&&menu.length===1;sel.title=sel.disabled?'Keep at least one strain on the menu':active?'Remove from menu':'Add to menu';sel.onclick=function(){selectStrain(i)}}
    var buy=$('flowerBuy');buy.disabled=maxed||state.money<price;buy.onclick=function(){buyStrain(i)};
    Array.prototype.forEach.call(detail.querySelectorAll('.strain-format-pill'),function(pill){pill.onclick=function(){stockFormat(Number(pill.dataset.format))}});
  }
  // Every strain sells in every stocked type. `format()` is flower (units and legacy readouts); `formatFactor(p)` is the
  // door's mean for a property such as demand or value, each customer counting the type they buy.
  function format(){return FORMATS[state.productMenu.active]}
  function formatFactor(property){return menuFormatFactor(state.productMenu,property)}
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
  function flowerValue(index){if(index===undefined){var menu=menuStrains();return menu.reduce(function(total,i){return total+flowerValue(i)},0)/menu.length}var i=index;return Math.round(STRAINS[i].price*(1+Math.max(0,state.strains[i]-1)*.1)*(1+state.curingLevel*.03)*saleMultiplier(state.empire)*formatFactor('value')*trendBoost(i)*displayBoost(i)*strains.timeFactor(strains.STRAIN_TYPE[i],atmosphere(state.empire.network).night)*(1+crossBonus(state.crosses))*(1+achievementBonus(state))*(i>0?specialFactor('boutique'):1))}
  function onlineValue(sequence){return Math.round(flowerValue(menuChoice(sequence===undefined?state.onlineCompleted:sequence))*4/3*(1+state.onlineBonusLevel*.05)*specialFactor('online')*contractFactor(state.empire,'online'))}
  function strainCost(i){return state.strains[i]?Math.round(Math.max(250,STRAINS[i].unlock*.35)*Math.pow(1.85,state.strains[i]-1)):STRAINS[i].unlock}
  function buyStrain(i){
    if(i<0||i>=STRAINS.length||state.strains[i]>=strains.STRAIN_MAX||state.money<strainCost(i))return;
    var unlocking=!state.strains[i];state.money-=strainCost(i);state.strains[i]++;if(unlocking)state.menuStrains.push(i);
    notify(STRAINS[i].name.toUpperCase()+(unlocking?' UNLOCKED':' · LEVEL '+state.strains[i]),'upgrade');save();renderUI();
  }
  function selectStrain(i){
    if(!state.strains[i])return;
    var index=state.menuStrains.indexOf(i);
    if(index>=0){if(state.menuStrains.length===1)return;state.menuStrains.splice(index,1)}else state.menuStrains.push(i);
    save();renderUI();notify(STRAINS[i].name.toUpperCase()+(index>=0?' · REMOVED FROM MENU':' · ADDED TO MENU'));
  }
  // Breeding, as in the iOS app: the Menu tab's Breed view lists six cultivars, one per pair of base strains.
  // Crosses need the Breeding bench and both parents at level 5, and run on game time; each discovery is +2% sales.
  var menuBoard=document.querySelector('[data-pane="flowers"] .menu-board');
  var menuViews=document.createElement('div');menuViews.className='menu-views';menuViews.setAttribute('role','tablist');menuViews.setAttribute('aria-label','Menu views');
  menuViews.innerHTML='<button type="button" role="tab" data-menu-view="strains">Strains</button><button type="button" role="tab" data-menu-view="breed">Breed</button>';
  menuBoard.insertBefore(menuViews,$('strainNav'));
  var breedPanel=document.createElement('section');breedPanel.className='breed-view';breedPanel.id='breedView';breedPanel.setAttribute('aria-labelledby','breedTitle');breedPanel.hidden=true;
  breedPanel.innerHTML='<div class="library-head"><h3 id="breedTitle">Cultivar journal</h3><small id="breedSummary"></small></div><ul class="breed-list" id="breedList"></ul>';
  menuBoard.append(breedPanel);
  var menuView='strains';
  function showMenuView(view){menuView=view;menuBoard.dataset.menuView=view;breedPanel.hidden=view!=='breed';menuViews.querySelectorAll('button').forEach(function(b){b.setAttribute('aria-selected',String(b.dataset.menuView===view))});renderBreed()}
  menuViews.querySelectorAll('button').forEach(function(b){b.onclick=function(){showMenuView(b.dataset.menuView)}});
  var breedCards={};CULTIVARS.forEach(function(c){var li=document.createElement('li');li.className='breed-card';li.dataset.cultivar=c.id;
    li.innerHTML='<div class="breed-copy"><b>'+c.name+'</b><small>'+STRAINS[c.parents[0]].name+' × '+STRAINS[c.parents[1]].name+'</small><em class="breed-status"></em><div class="breed-parents"></div></div><button type="button"></button>';
    li.querySelector('button').onclick=function(){breedAction(c)};breedCards[c.id]=li});
  function openBreedingBench(){var index=COMPONENTS.findIndex(function(c){return c.key==='breedingLevel'});showTray('boosts');if(shopBrowser&&shopBrowser.show)shopBrowser.show(shopBrowser.categoryOf?shopBrowser.categoryOf('componentBuy'+index):2);renderUI();var card=$('componentBuy'+index).parentElement;card.classList.remove('is-recommended');void card.offsetWidth;card.classList.add('is-recommended');if(card.scrollIntoView)card.scrollIntoView({block:'nearest'})}
  function breedAction(c){var s=cultivarStatus(state,c);
    if(s.kind==='bench')return openBreedingBench();
    if(s.kind==='prepare'){showMenuView('strains');var tab=$('strainTab'+s.missing);if(tab)tab.click();return}
    if(startCross(state,c.id)){telemetry.send('cross',{id:c.id});save();renderUI();notify('BREEDING '+c.name.toUpperCase()+' · '+duration(state.crosses.active.remaining*1000),'upgrade')}}
  function renderBreed(){
    var x=state.crosses;$('breedSummary').textContent=x.done.length+'/'+CULTIVARS.length+' discovered · +'+Math.round(crossBonus(x)*100)+'% sales bonus';
    if(menuView!=='breed')return;
    var list=$('breedList');sortedCultivars(state).forEach(function(entry,k){var c=entry.c,s=entry.s,li=breedCards[c.id],button=li.querySelector('button');
      if(list.children[k]!==li)list.insertBefore(li,list.children[k]||null);li.dataset.state=s.kind;
      var status=s.kind==='known'?'Discovered · '+c.lore+' · +2% sales bonus earned':s.kind==='growing'?'Breeding in progress · '+duration(s.remaining*1000)+' left':s.kind==='open'?'Ready to breed':s.kind==='bench'?'Find Breeding bench in Shop':'Prepare this pair';
      var em=li.querySelector('.breed-status');if(em.textContent!==status)em.textContent=status;
      var parents=s.kind==='prepare'?c.parents.map(function(i,n){var l=s.levels[n];return '<span style="--fill:'+Math.min(100,l/PARENT_LEVEL*100)+'%">'+STRAINS[i].name+' · '+(l<1?'Not unlocked':l>=PARENT_LEVEL?'Ready · Lv '+l:'Lv '+l+' / '+PARENT_LEVEL)+'</span>'}).join(''):'';
      var pDiv=li.querySelector('.breed-parents');if(pDiv.innerHTML!==parents)pDiv.innerHTML=parents;pDiv.hidden=!parents;
      var label=s.kind==='known'?'Discovered':s.kind==='growing'?'Breeding':s.kind==='bench'?'Open Shop':s.kind==='prepare'?((state.strains[s.missing]||0)<1?'Unlock ':'Upgrade ')+STRAINS[s.missing].name:s.busy?'Bench busy':'Breed · '+fmt(s.cost);
      if(button.textContent!==label)button.textContent=label;
      button.disabled=s.kind==='known'||s.kind==='growing'||(s.kind==='open'&&(s.busy||state.money<s.cost))})}
  showMenuView('strains');
  function renderFlowers(){
    renderBreed();
    if($('perkGrid'))renderPerks();
    if($('prestigeStart')){
      // Shares turn all-time revenue into a permanent bonus; the panel compares the bonus now with the bonus after reopening.
      var offer=prestigeOffer(state),pct=function(m){return '+'+Math.round((m-1)*100)+'%'},rate=function(m){return m.toFixed(2).replace(/0$/,'')+'×'};
      $('prestigeStatus').textContent=offer.shares?pct(offer.current)+' sales':(offer.eligible?'Ready':'Rank 0');
      $('prestigeCurrentRank').textContent='Now';$('prestigeCurrentRate').textContent=rate(offer.current);
      $('prestigeNextRank').textContent='After reopening';$('prestigeNextRate').textContent=rate(offer.multiplier);
      $('prestigeComparison').classList.remove('is-max');$('prestigeComparison').setAttribute('aria-label','Base sales now '+rate(offer.current)+', after reopening '+rate(offer.multiplier));
      $('prestigeNext').hidden=false;$('prestigeArrow').removeAttribute('hidden');
      $('prestigeGain').textContent=offer.gain?'+'+offer.gain+' share'+(offer.gain===1?'':'s')+' · '+pct(1+offer.gain*.05)+' base sales · permanent':'Each share adds +5% base sales · permanent';
      $('prestigeFunding').hidden=false;$('prestigeRevenue').textContent=fmt(offer.allTime)+' / '+fmt(offer.target);
      $('prestigeProgress').value=Math.min(100,offer.allTime/offer.target*100);$('prestigeProgress').setAttribute('aria-valuetext',fmt(offer.allTime)+' of '+fmt(offer.target)+' all-time revenue');
      $('prestigeFundingStatus').textContent=offer.allTime<offer.target?fmt(offer.target-offer.allTime)+' to '+(offer.total?'the next share':'unlock'):'Next share earned';
      $('prestigeStart').disabled=!offer.eligible;$('prestigeStart').textContent=offer.eligible?'Reopen for +'+offer.gain+' share'+(offer.gain===1?'':'s'):'Reopen';
      $('prestigeStart').setAttribute('aria-describedby','prestigeFundingStatus prestigeCarryover');
      $('prestigeCarryover').hidden=false;
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
  function cycleSpeed(i){return (1+state.staff[i]*.3)*abilityFactor(state.abilities,i)*state.multiplier/(i===3?formatFactor('packing'):1)*(i===1?growFactorNow()*specialFactor('grow'):i===3?strains.packBonus(state.strains)*(1+state.packSpeedLevel*.06):1)}
  // Breeding bench claws back part of the boutique grow penalty on top of strain mastery.
  function growFactorNow(){var g=strains.growFactor(menuStrains(),state.strains);return 1-(1-g)*(1-state.breedingLevel*.03)}
  var batchRemainder=[0,0,0,0];
  var readyWork=0;
  var work=[0,0,0,0,0,0],lastKiosk=-1,customers=[],arrival=0,customerId=0,pickupQueueSequence=0;
  // The pickup line is first come, first served: a ticket is issued when a customer reaches the line's tail, not when
  // they order, so a counter customer already in line is not held at the tail for a kiosk customer still walking over.
  function pickupOrder(c){return c.pickupTicket||Infinity}
  var QUEUE_MAX=30;
  // The drone deck's centre: Kevin asked for it a touch up and right, into the clear sidewalk behind the lounge.
  var DECK_X=-10.7,DECK_Z=.3;
  // Where a courier loads and lifts off: the top of the striped launch pad on online_deck.glb (its PadTop spans x -1.83
  // to -.63, z -.49 to .04 at height 2.82 in the model), placed as layout.fixtures places the deck.
  function launchPad(){return {x:-11.47,z:-.58,y:8.83}}
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
  var LOUNGE_DOOR={x:-9.5,z:-.45},LOUNGE_EXIT={x:8.57,z:-3.3},LOUNGE_RIGHT=8.25,LOUNGE_ROPE=7;
  // The red carpet runs from the curtain to just past where lounge guests turn on to it (z 2.2), clear of the third kiosk.
  var LOUNGE_CARPET_END=2.6;
  // The 3D map's rooftop lounge (src/three/rooftop.js): a deck stepped back from the top floor like the floors below
  // it (its front 3.1 behind the top floor's, its rear over the back pavement on steel columns), one storey up, reached by a glass elevator
  // standing in the old lounge room behind the curtain, its bridge landing at the deck's left edge. Each cab carries
  // one guest at a time (tickLifts): a guest behind the curtain waits for a cab, rides up, walks to a spot for their
  // session, walks back to the landing, waits for a cab down and steps out of the back door. The spots fill in tier order: Speakeasy round the fire
  // table, Dab bar at the stools, Vinyl nights on the dance floor, Terrace at the parasol tables.
  // The 2D map keeps its hidden lounge.
  var liftY=0,liftY2=0,liftAsks=0,loungeSmokers=[];
  // The cabs: where each one is (0 ground, 1 roof) and the trip it is on, empty to fetch a guest or carrying them.
  var lifts=makeLifts();
  var ROOFTOP={x0:-6.5,x1:6.5,z0:-9.6,z1:-3.4,y:14.1,lift:{x:-9.9,z:-5,w:1.4,d:1.4},lift2:{z:-6.6}},ROOF_WALK=3;
  var ROOFTOP_SPOTS=[[-3.9,-6.7,.3],[-1.3,-6.7,-.3],[-2.6,-6.25,.3],[-1,-7.85,-.3],[2.7,-7.45,-.3],[4.7,-7.45,-.3],[2.5,-6,.3],[3.5,-5.25,-.3],[2.2,-4.85,.3],[-4.5,-5,.3],[-2.9,-5,-.3],[-1.7,-5,.3],[-.1,-5,-.3],[-2.3,-3.95,.3]];
  // The runner render's top face in sprite px: its near-left, near-right and far-left corners, and its length over width.
  var LOUNGE_RUNNER_PIN={left:[0,274],bottom:[146,360],top:[474,0],ratio:3.25};
  // The rope runs down the red carpet in front of the door, on the guests' side of the room.
  // Every other guest stands a half step to the side so the line reads as people, not one stacked sprite.
  function loungeWaitSpot(place){return place<=0?LOUNGE_DOOR:{x:LOUNGE_DOOR.x+(place%2?.13:-.07),z:LOUNGE_DOOR.z+.4+Math.min(place,LOUNGE_ROPE-1)*.37}}
  function loungeSeated(){return customers.filter(function(c){return c.phase==='lounge'}).length}
  function loungeWaiting(){return customers.filter(function(c){return c.phase==='toLounge'&&!c.waypoints.length}).sort(function(a,b){return a.id-b.id})}
  function loungeSpareJars(){return state.stock[3]-reservedJars()}
  // A guest walks through the open door and the drapes into the back hallway, where the walls hide them on their way
  // to the elevator (`loungeFade` runs 1 → 0 over LOUNGE_STEP_IN seconds), and fades back in at the back door on the
  // way out.
  var LOUNGE_STEP_IN=1.6;
  // Every guest keeps their own pace: from 0.6 to 1.4 times the session, spread evenly by id so the average (and the
  // lounge's income) holds while arrivals and departures stagger.
  function loungeStayJitter(id){var f=((Number(id)||0)*0.6180339887)%1;return .6+f*.8}
  function enterLounge(c){
    var take=loungeTake(state.lounge,flowerValue(strainFor(c))*specialFactor('lounge'),state.loungeStaff,state.loungeLift);
    state.stock[3]-=1;add(take.total);state.loungeSessions++;state.loungeEarned+=take.total;state.shopPlay.shift.earned+=take.total;c.loungeLeft=loungeSessionSeconds(state.lounge)*loungeStayJitter(c.id);c.phase='lounge';c.walking=false;c.loungeTake=take.total;
    c.loungeFade=1;c.fadeFromZ=c.z;c.facing=-.3;c.roofWalk=0;c.walkBack=0;c.lift=null;c.liftShaft=null;c.shaft=0;
    recordEvent(state.empire,'pickup',1);playSound('coin',state.sound);
    if(!motionPreference.matches)tickets.push({x:LOUNGE_DOOR.x,y:2.1,z:LOUNGE_DOOR.z,life:1,text:fmt(take.cover)});
  }
  function askLift(c,wait){c.lift=wait;c.liftAsk=++liftAsks;c.liftShaft=null}
  function leaveLounge(c){
    c.phase='leaving';c.t=0;c.routeKind='exit';c.x=LOUNGE_EXIT.x;c.z=LOUNGE_EXIT.z;c.renderX=c.x;c.renderZ=c.z;c.facing=.6;c.loungeFadeIn=0;
    c.waypoints=[{x:9.7,z:-4.3},{x:11.15,z:-4.6},{x:10.25,z:-5.6},{x:10.25,z:-8.1},{x:7,z:-8.1},{x:-10.5,z:-8.1}];
  }
  function tickLounge(dt){
    var curtainTarget=loungeCurtainTarget();loungeCurtain+=(curtainTarget-loungeCurtain)*(1-Math.exp(-dt*(curtainTarget>loungeCurtain?10:8)));
    var exitTarget=loungeExitCurtainTarget();loungeExitCurtain+=(exitTarget-loungeExitCurtain)*(1-Math.exp(-dt*(exitTarget>loungeExitCurtain?10:8)));
    customers.forEach(function(c){
      if(c.phase==='lounge'){
        if(c.loungeFade>0){c.loungeFade=Math.max(0,c.loungeFade-dt/LOUNGE_STEP_IN);c.z=c.fadeFromZ+(LOUNGE_FRONT-1.6-c.fadeFromZ)*(1-c.loungeFade);c.x=LOUNGE_DOOR.x;c.walking=c.loungeFade>0}
        else if(!c.lift)askLift(c,'waitUp');
        else if(c.lift==='roof'){c.roofWalk=Math.min(1,c.roofWalk+dt/ROOF_WALK);c.loungeLeft-=dt;if(c.loungeLeft<=0){c.lift='back';c.walkBack=0}}
        else if(c.lift==='back'){c.walkBack=Math.min(1,c.walkBack+dt/ROOF_WALK);if(c.walkBack>=1)askLift(c,'waitDown')}
      }else if(c.loungeFadeIn!==undefined&&c.loungeFadeIn<1)c.loungeFadeIn=Math.min(1,c.loungeFadeIn+dt/.3);
    });
    tickLifts(lifts,customers,dt,{second:state.loungeLift,leave:leaveLounge});
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
    work[i]=Math.min(1,c.serviceElapsed*abilityFactor(state.abilities,i)/economy.customerHandoff(i,state.lines[i],counterServiceDuration(i)));
    return work[i]>=1;
  }
  var moment=null,shopPlayUI=null;
  function transfersSent(){return state.empire.network.stores.reduce(function(sum,b){return sum+b.sent},0)}
  // Every so often a walk-in who has cleared security asks the budtender for a pick.
  function tickMoment(dt){
    var play=state.shopPlay;play.cooldown=Math.max(0,play.cooldown-dt);
    if(moment){moment.remaining-=dt;var asking=customers.find(function(c){return c.id===moment.customerId});if(!asking||asking.ordered||moment.remaining<=0)moment=null}
    if(moment||!state.shopOpen||state.empire.activeStore||play.cooldown>0)return;
    var guest=customers.find(function(c){return !c.ordered&&!c.kiosk&&!c.lounge&&!c.momentOffered&&c.idChecked===true&&c.phase==='entering'});
    if(!guest)return;
    var options=momentPicks(state,menuStrains());if(menuStrains().length<2)return;
    guest.momentOffered=true;moment=createMoment(play,guest,options);play.cooldown=60+(play.sequence%3)*15;
  }
  function simulate(dt){
    state.empire.retailBoost=retailBoost();accrueOnlineRequests(dt);
    tickMoment(dt);var shift=state.shopPlay.shift,sentBefore=transfersSent();
    // Achievements are checked once a game second; a save that already meets some is credited quietly on load.
    achievementClock+=dt;if(achievementClock>=1){achievementClock=0;var earned=checkAchievements(state);if(earned.length){telemetry.send('achievement',{id:earned[earned.length-1].id,count:state.achievements.length});notify('ACHIEVEMENT · '+earned[earned.length-1].name.toUpperCase()+' · +'+earned.length+'% SALES');save()}}
    var bred=tickCross(state,dt);if(bred){telemetry.send('cultivar',{id:bred.id,count:state.crosses.done.length});notify('DISCOVERED '+bred.name.toUpperCase()+' · +2% SALES','upgrade');save()}
    add(branchIncome(state.empire)*dt);tickBranches(state.empire,dt);var operationResult=tickOperations(state,dt);if(operationResult.revenue){add(operationResult.revenue);shift.earned+=operationResult.revenue}if(operationResult.deliveries){state.onlineCompleted+=operationResult.deliveries;shift.deliveries+=operationResult.deliveries;recordEvent(state.empire,'online',operationResult.deliveries)}
    shift.transfers+=transfersSent()-sentBefore;
    var stars=settleStars(state.empire);if(stars.length){celebrateStars(stars);save()}
    if(state.shopOpen){tickRun(state.run,dt,incomeRate());tickTrainer(dt)}
    tickAbilities(state.abilities,dt);arrival+=dt;state.vipBuzz=Math.max(0,(state.vipBuzz||0)-dt);state.rushTime=Math.max(0,state.rushTime-dt);tickContractBoost(state.empire,dt);var settled=settleContract(state.empire);if(settled)contractSettled(settled);if(state.shopOpen)state.spenderClock=Math.max(0,state.spenderClock-dt);
    if(strains.tickTrend(state.strainTrend,dt,STRAINS.length,state.sold+customerId)){var trending=STRAINS[state.strainTrend.index];notify(trending.name.toUpperCase()+' IS TRENDING · +35% for 8 min'+(state.strains[state.strainTrend.index]?'':' · unlock it to cash in'),'upgrade');renderUI()}
    // Nobody walks in until the sign flips; stations that are already standing still stock the shelves.
    if(state.shopOpen&&arrival>=arrivalInterval()&&customers.filter(inOrderFlow).length<queueLimit()){
      var eventGuest=contractTwist(state.empire)==='vip'&&customerId%3===2;
      var arrivingKind=eventGuest?'vip':customerType(state.empire.reputation,customerId),lounge=wantsLounge(state.lounge,customerId,arrivingKind);
      // Every two to ten minutes a big spender walks in; tapping their tag pays a tip or starts a rush. Missing one costs nothing.
      var bigSpender=state.spenderClock<=0&&!lounge&&!eventGuest&&arrivingKind!=='vip';if(bigSpender)state.spenderClock=contractTwist(state.empire)==='spender'?60:spenderGap(state.perks,120+(customerId*97)%480);
      arrival=0;customers.push({bigSpender:bigSpender,eventGuest:eventGuest,kind:arrivingKind,id:customerId++,phase:'entering',idChecked:false,idCheckTime:0,lounge:lounge,kiosk:wantsKiosk(lounge),kioskIndex:null,t:0,bag:false,ordered:false,x:-12.4,z:-10});
    }
    tickLounge(dt);windowServing=windowOpen()&&stepWindowLine(windowLine,dt,windowStairs,windowServeSeconds(state.pickupWindow));
    // Before the drone port the window is the only way out: the clerk takes ready orders as the line has room.
    if(windowOpen()&&!deliveryBuilt()&&state.lines[4]>0&&onlineRequestsReady()>0&&state.stock[3]>=onlineSize()){var room=windowRoom(windowLine,state.pickupWindow);if(room)sendOnlineOrders(room,true)}
    customers.forEach(function(c){moveQueuedCustomer(c,dt);if(!c.walking&&c.phase!=='leaving'&&c.phase!=='lounge')c.waitSeconds=(c.waitSeconds||0)+dt;if(c.bag)c.effectAge=(c.effectAge||0)+dt});
    tickThoughts(dt);
    customers=customers.filter(function(c){return c.phase!=='leaving'||c.t<1});
    if(state.lines[5]){
      var pickups=customers.filter(function(c){return c.ordered&&!c.bag}).sort(function(a,b){return pickupOrder(a)-pickupOrder(b)}).slice(0,1).filter(function(c){return c.phase==='pickup'&&!c.walking&&Math.hypot(c.x-PICKUP_X,c.z-4.9)<.01});
      if(pickups.length&&state.stock[4]>0){var served=advanceCounterService(pickups[0],5,dt)?1:0;if(served>0){work[5]=0;var bags=Math.max(1,Math.min(pickups[0].bags||1,state.stock[4]));pickups[0].bags=bags;state.stock[4]-=bags;state.sold+=bags;playSound('sale',state.sound);recordEvent(state.empire,'pickup',served);pickups.slice(0,served).forEach(recordContractSale);add(pickups.slice(0,served).reduce(function(total,c){var sale=(c.salePrice||flowerValue())*(c.bags||1)*customerSaleBonus(c);if(c.momentMatched){var tip=tipFor((c.salePrice||flowerValue())*(c.bags||1));sale+=tip;state.shopPlay.tips+=tip;state.empire.reputation=Math.min(1000,state.empire.reputation+2);if(shopPlayUI)shopPlayUI.feedback(c.momentName+' loved your pick · +'+fmt(tip)+' tip · +2 reputation')}recordServed(state.shopPlay,c,sale);return total+sale},0));pickups.slice(0,served).forEach(function(c){c.phase='leaving';c.t=0;c.bag=true;c.effectAge=0;recentPickupRatings.push(customerRatings(c).highness);if(recentPickupRatings.length>20)recentPickupRatings.shift()});burst(machinePos[5],colors.acid)}}else work[5]=0;
    }
    // Prepare pickup bags independently of the number of customers collecting, but never from jars a waiting web order needs.
    var spareJars=state.stock[3]-reservedJars();
    if(state.lines[4]&&spareJars>0&&state.stock[4]<readyCapacity()){
      readyWork+=dt*capacity(4)*abilityFactor(state.abilities,4)/2;
      var bags=Math.min(Math.floor(readyWork),spareJars,readyCapacity()-state.stock[4]);
      if(bags>0){readyWork-=bags;state.stock[3]-=bags;state.stock[4]+=bags}
    }else readyWork=Math.min(readyWork,.9);
    assignOrderCounter(customers,state.orderCounters);
    work[4]=0;
    if(state.lines[4]){
      customers.filter(function(c){return atOrderCounter(c,state.orderCounters)}).forEach(function(c){
        var available=orderAvailability(customers,state.stock[4],pickupLimit());
        if(available.places<1||available.bags<1)return;
        // A customer the player is advising waits at the desk; after a pick the team takes a moment to talk it through.
        if(moment&&moment.customerId===c.id&&moment.opened){c.adviceWait=(c.adviceWait||0)+dt;return}
        if(c.consultRemaining>0){c.adviceWait=(c.adviceWait||0)+dt;c.consultRemaining=Math.max(0,c.consultRemaining-dt);return}
        if(advanceCounterService(c,4,dt)){
          c.bags=Math.min(basketSize()*(c.kind==='vip'?strains.VIP_BASKET:1),available.bags);
          c.normalStrain=strainFor(c);c.strain=c.momentMatched?c.momentChoice.strain:c.normalStrain;c.salePrice=salePriceFor(c,c.normalStrain);c.ordered=true;
          c.phase='toPickup';c.t=0;
        }
      });
    }
    // The head of the kiosk line takes the first free kiosk; their place along the shared walkway is the same spot on
    // that kiosk's longer route.
    var nextKiosk=state.kiosk?assignKiosk(customers,kioskCount(),lastKiosk):null;
    if(nextKiosk)lastKiosk=nextKiosk.kioskIndex;
    if(nextKiosk)nextKiosk.laneDistance+=routeLength(kioskRoute(nextKiosk.kioskIndex))-routeLength(kioskRoute(0));
    if(state.kiosk)for(var kioskIndex=0;kioskIndex<kioskCount();kioskIndex++){
      var kioskX=-8.95,kioskZ=6.8-kioskIndex*1.8;
      var kioskCustomer=customers.find(function(c){return c.kiosk&&c.kioskIndex===kioskIndex&&!c.ordered&&c.phase==='kiosk'&&Math.hypot(c.x-kioskX,c.z-kioskZ)<.15});
      var kioskAvailable=orderAvailability(customers,state.stock[4],pickupLimit());
      if(kioskCustomer&&kioskAvailable.places>0&&kioskAvailable.bags>0){
        kioskCustomer.orderTime=(kioskCustomer.orderTime||0)+dt*abilityFactor(state.abilities,4);
        if(kioskCustomer.orderTime>=kioskServiceDuration()){kioskCustomer.strain=strainFor(kioskCustomer);kioskCustomer.bags=Math.min(basketSize()*(kioskCustomer.kind==='vip'?strains.VIP_BASKET:1),kioskAvailable.bags);kioskCustomer.salePrice=salePriceFor(kioskCustomer,kioskCustomer.strain);kioskCustomer.ordered=true;kioskCustomer.phase='toPickup'}
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
    // Shifts run on wall time, so a recap always covers five minutes of play whatever the game speed.
    if(state.shopOpen&&tickShift(state.shopPlay,dt/(state.gameSpeed||1),{queue:customers.filter(inOrderFlow).length,stockout:customers.some(function(c){return c.ordered&&!c.bag})&&state.stock[4]<1})&&shopPlayUI)shopPlayUI.render();
  }
  function staffCost(i){return economy.staffCost(state.staff[i])}
  function idTrainingQuote(limit){
    var levels=0,total=0;
    // Training stops at the top of the security track.
    while(levels<limit&&state.idStaff+levels<economy.SECURITY_MAX_LEVEL){
      var price=economy.securityCost(state.idStaff+levels);
      if(!Number.isFinite(price)||total+price>state.money)break;
      total+=price;levels++;
    }
    return {levels:levels,cost:total};
  }
  function loungeHostQuote(limit){
    var levels=0,total=0;if(!state.lounge)return {levels:0,cost:0};
    while(levels<limit&&state.loungeStaff+levels<10000){
      var price=loungeHostCost(state.loungeStaff+levels);
      if(!Number.isFinite(price)||total+price>state.money)break;
      total+=price;levels++;
    }
    return {levels:levels,cost:total};
  }
  function trainLoungeHost(limit){
    var quote=loungeHostQuote(limit);if(!quote.levels)return;
    state.money-=quote.cost;state.loungeStaff+=quote.levels;
    notify('LOUNGE HOST · +'+quote.levels+' LEVEL'+(quote.levels===1?'':'S'),'upgrade');renderUI();save();
  }
  function trainIdChecker(limit){
    var quote=idTrainingQuote(limit);if(!quote.levels)return;
    var tierBefore=stationLookFor(6,state.idStaff);state.money-=quote.cost;state.idStaff+=quote.levels;recordGoal(state.empire,'upgrade',quote.levels);
    var tier=stationLookFor(6,state.idStaff);if(tier>tierBefore){buildRise[6]=.6;burst(DOOR_POS,'#f0d89a');paintThumbnails()}
    notify(tier>tierBefore?'SECURITY · '+economy.SECURITY_TIERS[tier-1].toUpperCase():'SECURITY · LEVEL '+state.idStaff,'upgrade');renderUI();save();
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
    state.money-=batch.cost;state.staff[i]+=batch.levels;recordGoal(state.empire,'upgrade',batch.levels);
    burst(machinePos[i],'#b6e58c');notify(LINES[i].name+' EMPLOYEE · +'+batch.levels+' LEVEL'+(batch.levels===1?'':'S'),'upgrade');renderUI();save();
  }
  function upgradeStaff(i){if(!state.lines[i])return;var price=staffCost(i);if(state.money<price)return;state.money-=price;state.staff[i]++;recordGoal(state.empire,'upgrade',1);burst(machinePos[i],'#b6e58c');notify('EMPLOYEE LEVEL '+state.staff[i]+' · +30% BASE SPEED','upgrade');renderUI();save()}
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
  // Every other customer who is not a lounge guest uses a kiosk, while the kiosk line has room. The turn counts only
  // those customers: keyed on the customer number, it fell on the same customers the lounge takes (every second one from
  // Private booths), so with the lounge open the kiosks got few customers or none.
  var kioskTurn=0;
  function wantsKiosk(lounge){
    if(lounge||!state.kiosk||!takesKiosk(kioskTurn++))return false;
    return customers.filter(function(c){return c.kiosk&&!c.ordered}).length<kioskCount()+KIOSK_WAIT_PLACES;
  }
  function buyKiosk(){if(state.kiosk||state.money<25000)return;state.money-=25000;state.kiosk=true;save();renderUI();notify('SELF-ORDER KIOSK OPEN · customers can use kiosk or counter','upgrade')}
  function kioskCount(){return state.kiosk?(state.thirdKiosk?3:state.secondKiosk?2:1):0}
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
    {key:'fleetLevel',name:'Drone fleet',base:4000,max:20},{key:'cargoLevel',name:'Cargo bays',base:3500,max:20},{key:'repeatLevel',name:'Repeat buyers',base:2200,max:20},{key:'offlineLevel',name:'Back-room safe',base:5000,max:5}];
  function kioskServiceDuration(){return .8+1.2/(1+state.kioskSpeedLevel*.15)}
  // How far the customer standing at each kiosk has got with their order (0..1), for the 3D map's touchscreens.
  function kioskMenus(){
    var out={};
    customers.forEach(function(c){if(c.kiosk&&c.kioskIndex!=null&&!c.ordered&&c.phase==='kiosk'&&Math.hypot(c.x+8.95,c.z-(6.8-c.kioskIndex*1.8))<.15)out['kiosk'+c.kioskIndex]=Math.min(1,(c.orderTime||0)/kioskServiceDuration())});
    return out;
  }
  function securityDuration(level){return economy.securityDuration(level===undefined?state.idStaff:level,state.scannerLevel)}
  function securityMaxed(){return state.idStaff>=economy.SECURITY_MAX_LEVEL}
  function arrivalInterval(){return (atmosphere(state.empire.network).night?1.2:.9)/(1+state.trafficLevel*.15)/formatFactor('demand')/strains.trafficFactor(menuStrains(),state.strainTrend.index)/strains.buzzFactor(state.vipBuzz)/(1+state.signLevel*.04)/specialFactor('traffic')/contractFactor(state.empire,'traffic')}
  // The waiting-area upgrade's places, capped at the spots the pickup line's route actually holds.
  function pickupPromised(){return 4+state.pickupLevel*2}
  function pickupLimit(){return pickupPlaces(pickupPromised(),routeLength(queueRoute(true)),queueGap(false))}
  function pickupLineFull(){return customers.filter(function(c){return c.ordered&&!c.bag}).length>=pickupLimit()}
  function readyCapacity(){return economy.readyCapacity(state.readyLevel,state.lines)}
  function componentCost(i){var L=state[COMPONENTS[i].key];return Math.round(COMPONENTS[i].base*Math.pow(1.8,Math.min(L,8))*Math.pow(2.15,Math.max(0,L-8)))}
  function componentInstalled(i){return COMPONENTS[i].key!=='kioskSpeedLevel'||state.kiosk}
  // Buyable now: installed, and either off the forks or on a side that is taken or still free to take.
  function componentUnlocked(i){var s=sideStatus(state,COMPONENTS[i].key);return componentInstalled(i)&&(s==='open'||s==='pick')}
  // Worth advising: buyable and not a fork still waiting on the player, so the button never makes a fork's choice for them.
  function componentAdvisable(i){return componentUnlocked(i)&&sideStatus(state,COMPONENTS[i].key)==='open'}
  function componentIndex(key){return COMPONENTS.findIndex(function(c){return c.key===key})}
  // Taking a fork closes its partner for the rest of the run, so the first tap only arms it and a second tap confirms.
  var armedFork=null,armedTimer=null;
  function upgradeComponent(i){var c=COMPONENTS[i],price=componentCost(i);if(!componentUnlocked(i)||state[c.key]>=c.max||state.money<price)return;
    if(sideStatus(state,c.key)==='pick'&&armedFork!==i){armedFork=i;clearTimeout(armedTimer);armedTimer=setTimeout(function(){armedFork=null;renderUI()},6000);renderUI();return}
    armedFork=null;var took=takeSide(state,c.key);state.money-=price;state[c.key]++;save();renderUI();notify(took?c.name.toUpperCase()+' · CHOSEN OVER '+COMPONENTS[componentIndex(partnerOf(c.key))].name.toUpperCase():c.name.toUpperCase()+' · LEVEL '+state[c.key],'upgrade')}
  function renderComponents(){
    var describe=[function(l){return '+'+Math.round((economy.walkSpeed(l)/2.8-1)*100)+'% walking speed'},function(l){return (4+l*2)+' picking up'},function(l){return economy.readyCapacity(l,state.lines)+' ready bags'},function(l){return '+'+(l*3)+'% sale value'},function(l){return '+'+(l*3)+'% happy tips'},function(l){return '+'+(l*15)+'% kiosk speed'},function(l){return '+'+(l*5)+'% online value'},function(l){return Math.round(economy.patience('hurried',l))+'s patience'},function(l){return '+'+(l*12)+'% check speed'},function(l){return (requestRate(state.onlineCompleted,1,l)*60).toFixed(1)+' requests / min · '+requestCap(state.onlineCompleted,l)+' waiting'},
      function(l){return '+'+(l*6)+'% seed batch'},function(l){return '+'+(l*6)+'% grow batch'},function(l){return '+'+(l*6)+'% harvest batch'},function(l){return '+'+(l*6)+'% pack speed'},
      function(l){return '+'+(l*4)+'% counter speed'},function(l){return '+'+(l*4)+'% foot traffic'},function(l){return '+'+(l*3)+'% happy tips'},function(l){return '+'+(l*4)+'% basket size'},
      function(l){return '+'+(l*.25).toFixed(2).replace(/\.?0+$/,'')+'% THC'},function(l){return '-'+(l*3)+'% grow penalty'},function(l){return '+'+(l*2)+'% boutique value'},function(l){return '+'+(35+l*2)+'% trend bonus'},
      function(l){return (10*(1-l*.03)).toFixed(1)+'s drone interval'},function(l){return (10+l)+' orders per bulk run'},function(l){return (l*4)+'% repeat buyers'},function(l){return (4+l*4)+'h offline'}];
    COMPONENTS.forEach(function(c,i){var level=state[c.key],max=level>=c.max,side=sideStatus(state,c.key),closed=side==='closed',gated=side==='gated',locked=!componentInstalled(i)||closed||gated,button=$('componentBuy'+i),f=forkOf(c.key);
      button.parentElement.classList.toggle('is-fork-closed',closed);button.parentElement.classList.toggle('is-fork-open',side==='pick');
      if(closed||gated){$('componentBenefit'+i).textContent=describe[i](level);$('componentLevel'+i).textContent=closed?'Closed this run · took '+COMPONENTS[componentIndex(partnerOf(c.key))].name+(level?' · Lv '+level+' kept':''):'Opens at '+f.gate+' '+RESEARCH_BRANCHES.find(function(b){return b.id===f.branch}).name+' levels · '+levelsToGate(state,c.key)+' to go';$('componentPrice'+i).textContent=closed?'':fmt(componentCost(i));button.disabled=true;button.querySelector('span').textContent=closed?'Closed':'Locked';return}
      $('componentBenefit'+i).textContent=!componentInstalled(i)?'Install a kiosk first':max?describe[i](level):describe[i](level).replace(/ (walking speed|picking up|ready bags|sale value|happy tips|kiosk speed|online value|patience|check speed|waiting|seed batch|grow batch|harvest batch|pack speed|counter speed|foot traffic|basket size|THC|grow penalty|boutique value|trend bonus|drone interval|orders per bulk run|repeat buyers)$/,'')+' → '+describe[i](level+1);
      $('componentLevel'+i).textContent='Level '+level+' / '+c.max+(max?' · Maximum':state.money<componentCost(i)?' · '+fmt(componentCost(i)-state.money)+' to go':'');$('componentPrice'+i).textContent=max?'MAX':fmt(componentCost(i));button.disabled=locked||max||state.money<componentCost(i);button.querySelector('span').textContent=locked?'Locked':side==='pick'?(armedFork===i?'Confirm':'Choose'):'Upgrade';button.setAttribute('aria-describedby','componentBenefit'+i)});
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
  // The pickup window opens web orders; the drone port (deliveryBuilt) comes after it.
  function windowOpen(){return state.pickupWindow.owned}
  function onlineOpen(){return windowOpen()||deliveryBuilt()}
  // Without drones an order can only leave through the window, so a send is held to the room in its line.
  function onlineLimit(limit){return deliveryBuilt()?limit:Math.min(limit,windowOpen()?windowRoom(windowLine,state.pickupWindow):0)}
  function accrueOnlineRequests(seconds){if(onlineOpen())accrueRequests(state,seconds)}
  function onlineRequestsReady(){return requestsReady(state)}
  function onlineBatch(limit,jarBudget){
    var jars=jarBudget===undefined?state.stock[3]:jarBudget,count=0,used=0,reward=0;limit=Math.min(limit,onlineRequestsReady());
    if(state.lines[4])while(count<limit){var need=economy.onlineSize(state.onlineCompleted+count,state.lines);if(jars<need)break;jars-=need;used+=need;reward+=need*onlineValue(state.onlineCompleted+count);count++}
    return {count:count,jars:used,reward:reward};
  }
  function sendOnlineOrders(limit,automatic){
    var batch=onlineBatch(onlineLimit(limit));if(!batch.count)return;
    state.stock[3]-=batch.jars;state.onlineCompleted+=batch.count;state.shopPlay.shift.deliveries+=batch.count;consumeRequests(state,batch.count);
    // Repeat buyers: a share of fulfilled orders come straight back as new requests.
    if(state.repeatLevel)state.onlineRequests=Math.min(onlineRequestCap(),state.onlineRequests+batch.count*state.repeatLevel*.04);
    // Once drones fly, one order in three is still collected at the pickup window, while its line has room
    // (pickup-window.js); before them every order is. The tip jar pays a quarter more on each walk-up.
    var walks=windowOpen()?addWalkups(windowLine,deliveryBuilt()?walkupCount(state.onlineCompleted-batch.count,batch.count):batch.count,windowStairs,windowLineMax(state.pickupWindow)):0;
    queueDeliveryWave(batch.count-walks);if(state.pickupWindow.tips&&walks)batch.reward+=batch.reward*walks/batch.count*TIP_SHARE;
    recordEvent(state.empire,'online',batch.count);add(batch.reward);if(!automatic)notifyDispatch(batch);burst({x:DECK_X,z:DECK_Z,y:7.05},'#dbc38b');slideReceipts(batch.count);renderUI();save();
  }
  // Each order is a parcel set on its own spot on the launch pad; couriers come in one after another to fetch them. With
  // every spot taken, further orders ride along with a waiting parcel (shown as ×N), so the pad never fills up.
  var windowLine=createWindowLine(),windowServing=false;
  function windowStairs(id){return subwayStairs(id%2?.3:-.3)}
  var DRONE_SPOTS=[[-.75,0],[-.25,0],[.25,0],[.75,0]],DRONE_PICKUP=2.2,DRONE_LIFE=10.8;
  function queueDeliveryWave(count){
    var queued=0;
    for(var n=0;n<count;n++){
      var pending=deliveryDrones.filter(function(d){return d.age<d.delay+DRONE_PICKUP}),used=pending.map(function(d){return d.spot}),spot=-1;
      for(var k=0;k<DRONE_SPOTS.length;k++)if(used.indexOf(k)<0){spot=k;break}
      if(spot<0){pending.reduce(function(a,b){return a.orders<=b.orders?a:b}).orders++;continue}
      var next=pending.reduce(function(m,d){return Math.max(m,d.delay-d.age)},-1.1);
      deliveryDrones.push({age:0,boxAt:queued*.2,delay:Math.max(queued*.2,next+1.1),spot:spot,slot:spot,orders:1});queued++;
    }
    if(queued){playSound('whoosh',state.sound);if(SHOP_SPRITES){fixtureSprite('drone.courier.empty');fixtureSprite('drone.courier.loaded');fixtureSprite('prop.carton')}}
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
    var oldTier=stationTier(selected);state.money-=batch.cost;state.lines[selected]+=batch.levels;recordGoal(state.empire,'upgrade',batch.levels);telemetry.once('first_upgrade',{station:LINES[selected].name});trackStationLevel(selected);if(stationTier(selected)>oldTier){tierFlashes[selected]=1;burst(machinePos[selected],'#f0d89a')}
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
  // A new branch star gets a toast; the third names the bonus and the branch it opens.
  function celebrateStars(list){var last=list[list.length-1],i=last.store,p=state.empire,name=STORES[i].name,count=starCount(p,i);
    notify(count===3?name.toUpperCase()+' FINISHED · +'+Math.round(STAR_BONUS*100)+'% SALES EVERYWHERE'+(STORES[i+1]?' · '+STORES[i+1].name+' can open':''):name+' ★ '+count+' of 3','upgrade');renderUI()}
  function notify(message,kind){var cue=kind==='upgrade'?(/BUILT|OPEN|EXPANDED/.test(message)?'build':'upgrade'):/REWARD|MILESTONE|ACHIEVEMENT|GOAL COMPLETE|EVENT COMPLETE|CHAPTER COMPLETE|WHILE AWAY|Prestige/.test(message)?'sparkle':/^Need |previous stage first/.test(message)?'denied':null;if(cue)playSound(cue,state.sound);if(kind!=='dispatch')dispatchSummary=null;$('toast').classList.toggle('is-upgrade',kind==='upgrade');$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(function(){$('toast').classList.remove('show')},1600)}

  // The map draws with Three.js (src/three/map3d.js) under a transparent 2D canvas that keeps the screen-space effects
  // (queue badges, tickets, sparkles, confetti). There is no 2D map any more: until the 3D map has drawn, and while a
  // lost WebGL context is rebuilt, the loading card covers the map (mapStatus).
  var world=$('world'),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d',{alpha:true});
  if(!ctx){$('loadStatus').textContent='CANVAS COULD NOT START';$('loadRetry').hidden=false;return}
  world.insertBefore(canvas,world.firstChild);canvas.setAttribute('aria-hidden','true');
  var screenCtx=ctx;
  var map3d=null,canvas3d=null,map3dModule=null,map3dLayout=null,mapDrawn=false,mapRebuilds=0,mapRebuildTimer=0;
  // The 2D canvas carries the 3D map's overlay (delivery drones, badges, particles, tickets), so it must stack above
  // the absolutely positioned 3D canvas rather than paint underneath it.
  canvas.style.position='relative';
  {
    // Built, the module's hashed name comes from index.html (scripts/make-classic.mjs); the dev server serves the source.
    var map3dMeta=document.querySelector('meta[name="canopy-map3d"]'),map3dUrl=new URL(map3dMeta?map3dMeta.content:'./src/three/map3d.js',document.baseURI).href;
    import(/* @vite-ignore */ map3dUrl).then(function(m){
      var layout=townLayout();
      // The three floors; the ground floor's herringbone runs out to the store edge (11.95).
      layout.floors=[{y:0,x:.75,z:2.475,w:24.5,d:18.95},{y:4.7,z:-2.95,w:18,d:7.4},{y:9.4,z:-3.6,w:13,d:6.6}];layout.marquee={x:MARQUEE.x,zFront:MARQUEE.zFront,zRear:MARQUEE.zRear,y0:MARQUEE.y0,y1:MARQUEE.y1,top:MARQUEE.top,bottom:MARQUEE.bottom};
      // Blender models (art/blender/, exported to public/models/) by station index, sized from the tier 3 sprite they replace.
      layout.modelBase=new URL('models/',document.baseURI).href;
      // Keyed "station.look" (economy.stationLook: Lv 1, 10, 30, 50, 75); a look without its own model shows the tier 3 one. Each is sized to its tier's sprite.
      layout.stationModels={'0.1':'seeds_bench_tier1.glb','0.2':'seeds_bench_tier2.glb','0.3':'seeds_bench.glb','0.4':'seeds_bench_tier4.glb','0.5':'seeds_bench_tier5.glb','1.1':'grow_bench_tier1.glb','1.2':'grow_bench_tier2.glb','1.3':'grow_bench.glb','1.4':'grow_bench_tier4.glb','1.5':'grow_bench_tier5.glb','2.1':'harvest_bench_tier1.glb','2.2':'harvest_bench_tier2.glb','2.3':'harvest_bench.glb','2.4':'harvest_bench_tier4.glb','2.5':'harvest_bench_tier5.glb',
        '3.1':'pack_bench_tier1.glb','3.2':'pack_bench_tier2.glb','3.3':'pack_bench.glb','3.4':'pack_bench_tier4.glb','3.5':'pack_bench_tier5.glb','4.1':'order_desk_tier1.glb','4.2':'order_desk_tier2.glb','4.3':'order_desk.glb','4.4':'order_desk_tier4.glb','4.5':'order_desk_tier5.glb','5.1':'pickup_desk_tier1.glb','5.2':'pickup_desk_tier2.glb','5.3':'pickup_desk.glb','5.4':'pickup_desk_tier4.glb','5.5':'pickup_desk_tier5.glb','6.1':'security_booth_tier1.glb','6.2':'security_booth_tier2.glb','6.3':'security_booth_tier3.glb','6.4':'security_booth_tier4.glb','6.5':'security_booth_tier5.glb',
        '0.6':'seeds_bench_founder.glb','1.6':'grow_bench_founder.glb','2.6':'harvest_bench_founder.glb','3.6':'pack_bench_founder.glb','4.6':'order_desk_founder.glb','5.6':'pickup_desk_founder.glb','6.6':'security_booth_founder.glb'};
      stationModelFiles=layout.stationModels;layout.stationModelSize={};for(var key in layout.stationModels)layout.stationModelSize[key]=stationSpriteSize(+key.split('.')[0],+key.split('.')[1]);layout.stationModelSize['4.3']={w:2.2,ox:0};
      // Looks 4, 5 and the founder look share tier 3's footprint, origin and facing.
      [0,1,2,3,4,5].forEach(function(i){[4,5,6].forEach(function(t){if(layout.stationModels[i+'.'+t])layout.stationModelSize[i+'.'+t]=layout.stationModelSize[i+'.3']})});
      // The lower order desks keep their sprites' size against tier 3's.
      [1,2].forEach(function(t){layout.stationModelSize['4.'+t]={w:2.2*stationSpriteSize(4,t).w/stationSpriteSize(4,3).w,ox:0}});
      // The security booths are built facing -Y; turned a quarter, their scanner, sign and customer side face the front door
      // (west, -x), the desk runs along the footprint's long z side, and the doorman's side faces the room.
      // w 2.69 puts the shared 1.45 x 0.8 mat at 1.69 map units a metre, the scale of the people and the other stations.
      [1,2,3,4,5,6].forEach(function(t){layout.stationModelSize['6.'+t]={w:2.69,ox:0,turn:-Math.PI/2}});
      // The production line from the 2D map's own routes, so both maps carry the same tubes, belts and cargo rhythm.
      var grow=tubeRunGeometry(TUBE_RUNS[1]),pack=tubeRunGeometry(TUBE_RUNS[3]);
      layout.transport={bore:TUBE_DIA,gap:CARGO_GAP,
        tubes:[{points:grow.path,stage:1,cargoStage:1,floorRings:[grow.port]},
          {points:pack.path,stage:3,cargoStage:4,floorRings:[pack.port],window:{total:PACK_FLOW,offset:0},noCap0:true},
          {points:PACK_STUB,stage:3,cargoStage:4,window:{total:PACK_FLOW,offset:PACK_STUB_AT}},
          // The online deck's feed, shown while the deck is built: along the mezzanine rail at the 2D map's height, up the
          // same slope, level under the deck, then bending straight up into the slab (underside 7.04, boards 7.2), where its
          // open end and the parcels disappear; it tucks back from the slab's front edge (z .84) so none of it shows above.
          {points:[[-4.3,6.15,.85],[-7.99,6.15,.85],[-9.3,6.6,.85],[-10.75,6.6,.42],[-10.75,7.12,.42]],stage:3,cargoStage:5,noCap0:true,noCap1:true,fixture:'deck'},
          // The pickup window's feed (Kevin, 2026-10-20): up out of the floor behind the window, over the bay's cap and down
          // behind its sliding pane onto the inside shelf, where the parcels arrive. It shows with the window, which comes
          // with the deck.
          {points:[[PICKUP_WINDOW.x-1,-.7,PICKUP_WINDOW.z-1.6],[PICKUP_WINDOW.x-1,4,PICKUP_WINDOW.z-1.6],[PICKUP_WINDOW.x-1,4,PICKUP_WINDOW.z-.55],[PICKUP_WINDOW.x-1,1.45,PICKUP_WINDOW.z-.55]],stage:3,cargoStage:5,noCap0:true,floorRings:[[PICKUP_WINDOW.x-1,0,PICKUP_WINDOW.z-1.6]],fixture:'pickupWindow'}],
        belts:[{x1:-4.6,x2:4.6,z:-5.8,floor:9.4,height:1.05,width:BELT_W,stage:0},{x1:4.2,x2:-3.2,z:-3.7,floor:4.7,height:1.05,width:BELT_W,stage:2}]};
      // The online orders deck, placed by its origin (the stair foot, on the mezzanine) at the scale every Blender model
      // shares (about 1.69 map units a metre), so its slab's right and front edges land where the sprite's do
      // (DECK_RIGHT, DECK_FRONT) with the deck at 7.05.
      layout.floorTextures=floorTextureFiles();
      layout.fixtures=[{key:'deck',file:'online_deck.glb',x:-9.39,y:4.7,z:-.2,scale:1.69,glow:'SignLit'},{key:'pickupWindow',file:'pickup_window.glb',x:PICKUP_WINDOW.x,y:0,z:PICKUP_WINDOW.z,scale:1.69,glow:'SignCream'}];
      // The self-order kiosks, one Blender model per bought kiosk where the customer code queues them (6.8 - k * 1.8),
      // the screen facing +x toward the customer and lit like a screen (`screen` names its material).
      [0,1,2].forEach(function(k){layout.fixtures.push({key:'kiosk'+k,file:'kiosk.glb',x:-9.75,y:0,z:6.8-k*1.8,scale:1.69,screen:'Screen',menu:true})});
      // The street's cars and van: one model each, painted per car in code (CarPaint, VanPaint).
      layout.carModels={car:'car.glb',van:'van.glb'};
      // The shell and fittings, placed by the same numbers the station and customer code uses.
      layout.rooftop=ROOFTOP;
      layout.shell={plaster:SHOP_GREEN_PLASTER[2],tile:SHOP_GREEN_TILE[2],tileH:LOUNGE_TILE,tilePitch:TILE_PITCH,glazingBay:GLAZING_BAY,fanX:FAN_X,topLanding:TOP_LANDING,
        loungeFront:LOUNGE_FRONT,loungeDoor:LOUNGE_DOOR,loungeExit:LOUNGE_EXIT,loungeRight:LOUNGE_RIGHT,loungeHeader:2.05,wallLeft:-6.7,wallRight:8.4,shelfLeft:-1.3+COUNTER_SHIFT,
        exitDoor:{x0:9.44,x1:11.25,h:3.3},column:{x:9.8,z:-1.8},merchCabinet:{back:8.41,face:9.27,z0:-6.84,z1:-4.8},
        planter:{x0:-11.7,x1:-10.75,z0:2,z1:5.6,tree:{x:-11.45,z:2.35}},baseboard:{x0:-10.65,x1:13,front:11.95,rear:-7,h:.32},hanging:{x0:-2.3,x1:2.3,y:9.05,z:-1.35},
        lamps:[[-4,3.7,3.5,1.3],[4,3.7,3.5,1.3],[-4,3.7,8.5,1.1],[5,3.7,8.5,1.1],[-10,3,-4,.8],[-4,8.4,-3,1.2],[4,8.4,-3,1.2],[0,12.8,-4.5,1]]};
      // Sprite shop: the storefront and its doorway are flat elevations on the entrance wall's plane, the exit mat and
      // the lounge's runner lie on the floor where the old 2D map pinned them, and the display case casts its shadow
      // from a box under its figure.
      if(SHOP_SPRITES){
        // The flat elevations stand in until the Blender storefront and doorway (outer face on the same plane, origin at
        // its bottom centre) have loaded.
        layout.wallFaces=[{url:'sprites/shell/flat.storefront.png',x0:-10.65,z0:8.94,x1:-10.65,z1:LOUNGE_FRONT,y0:-.04,h:4.19,model:'storefront'},
          {url:'sprites/shell/flat.storefront.door.png',x0:-10.65,z0:12.05,x1:-10.65,z1:8.8,y0:-.04,h:4.2,model:'storefrontDoor'}];
        layout.fixtures.push({key:'storefront',file:'storefront.glb',x:-10.65,y:0,z:(8.94+LOUNGE_FRONT)/2,scale:1.69,glow:'SignCream'},{key:'storefrontDoor',file:'storefront_door.glb',x:-10.65,y:0,z:(12.05+8.8)/2,scale:1.69,hide:['Canopy','CanopyEdge','CanopyEdgeSide','LampStem','LampShade','LampBulb']});
        // The street door's striped awning and the neon leaf blade sign off its post (src/three/entrance.js): the door
        // opens between the storefront's last mullion (8.8) and the post (10.94..11.43), under the header (3.5..4.06).
        layout.entrance={x:-10.65,sign:{x0:-11.9,x1:-10.95,y0:2.05,y1:3.1,z:11.19}};
        var matX=10.7,matZ=-4.35,runW=(LOUNGE_CARPET_END-LOUNGE_FRONT)/LOUNGE_RUNNER_PIN.ratio,pin=LOUNGE_RUNNER_PIN;
        layout.decals=[{url:'sprites/shell/shell.mat.exit.png',image:[[0,0],[1,0],[0,1]],world:[[matX+.6,matZ+1.1],[matX+.6,matZ-1.1],[matX-.6,matZ+1.1]]},
          {url:'sprites/interior/lounge.carpet.runner.png',pixels:true,image:[pin.left,pin.bottom,pin.top],world:[[LOUNGE_DOOR.x-runW/2,LOUNGE_CARPET_END],[LOUNGE_DOOR.x+runW/2,LOUNGE_CARPET_END],[LOUNGE_DOOR.x-runW/2,LOUNGE_FRONT+.02]],show:'loungeOpen'}];
        layout.casters=[{x:10.05,z:8.7,w:.7,d:2.1,h:1.4}];
      }
      map3dModule=m;map3dLayout=layout;startMap3d();
    }).catch(function(e){console.error('3D map could not load',e);mapStatus('The map could not load. Please retry.',true)});
  }
  // The loading card over the map: a message (with Retry when only a reload can help), or hidden once the map draws.
  function mapStatus(text,retry){var card=$('loading');clearTimeout(mapRevealTimer);mapSettleStart=0;card.classList.remove('reveal');card.hidden=!text;if(text){$('loadStatus').textContent=text;$('loadRetry').hidden=!retry}}
  // The card stays over the map while the first frames draw underneath and ask for their models, textures and sprites;
  // once nothing has been loading for a few frames (shaders compiled and textures uploaded by those frames too), the
  // whole finished map fades in at once. A slow connection still gets the map after MAP_SETTLE_MAX ms.
  // The first time the map appears, the stations pop up out of the floor one after another down the line (stationPop,
  // 0 to 1 per station), starting as the card fades. Players who ask for reduced motion see them in place.
  var introAt=0;
  function stationPop(i){
    // Until the card lifts they draw at full size underneath it, so their shaders and textures are ready for the pop.
    if(!introAt)return 1;
    var t=(performance.now()-introAt)/1000-.2-i*.11;
    return t<=0?0:Math.min(1,t/.5);
  }
  var MAP_SETTLE_MAX=12000,mapSettleStart=0,mapQuietFrames=0,mapRevealTimer=0;
  function mapSettled(wallNow){
    if(!mapSettleStart){mapSettleStart=wallNow;mapQuietFrames=0}
    mapQuietFrames=map3d.loading>0||spritesLoading()>0?0:mapQuietFrames+1;
    return mapQuietFrames>=6||wallNow-mapSettleStart>MAP_SETTLE_MAX;
  }
  function mapReveal(){var card=$('loading');if(card.hidden)return;if(!introAt&&!SNAP&&!motionPreference.matches)introAt=performance.now();card.classList.add('reveal');clearTimeout(mapRevealTimer);mapRevealTimer=setTimeout(function(){card.hidden=true;card.classList.remove('reveal')},motionPreference.matches?0:500)}
  // Builds the 3D map on a fresh WebGL canvas. A lost context (the GPU reset, or iOS reclaimed it in the background)
  // is rebuilt the same way rather than trusted to come back, with the loading card up meanwhile.
  function startMap3d(){
    clearTimeout(mapRebuildTimer);
    if(map3d){try{map3d.dispose()}catch(e){}map3d=null}
    if(canvas3d)canvas3d.remove();
    canvas3d=document.createElement('canvas');canvas3d.setAttribute('aria-hidden','true');
    canvas3d.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
    world.insertBefore(canvas3d,canvas);
    var own=canvas3d;
    own.addEventListener('webglcontextlost',function(){if(own!==canvas3d)return;mapDrawn=false;mapStatus('Reloading the map…');rebuildMap3d(1200)});
    own.addEventListener('webglcontextrestored',function(){if(own===canvas3d)rebuildMap3d(0)});
    try{map3d=map3dModule.createMap3D(canvas3d,map3dLayout)}catch(e){console.error('3D map could not start',e);map3d=null;rebuildMap3d(1500);return}
    render.invalidated=true;
  }
  function rebuildMap3d(delay){
    clearTimeout(mapRebuildTimer);
    if(++mapRebuilds>4){mapStatus('The map could not start on this device. Please retry.',true);return}
    mapRebuildTimer=setTimeout(startMap3d,delay);
  }
  var dpr=1,width=1,height=1,angle=SHOP_SPRITES||/[?&]cam=45\b/.test(location.search)?Math.PI/4:.57,zoom=1,panX=0,panY=0,centerX=0,centerY=0,unit=32;
  // The sprite shop's plaster and tile take the storefront's emerald so the drawn walls match the glazing.
  var SHOP_GREEN_PLASTER=SHOP_SPRITES?['#3f9468','#174f36','#226447']:['#698775','#314b40','#496a56'],SHOP_GREEN_TILE=SHOP_SPRITES?['#4a9a6e','#14482f','#1f5e40']:['#708b72','#2c4938','#4a6850'];
  var colors={bg:'#202226',floorTop:'#303238',floorLeft:'#1c1f23',floorRight:'#272a30',grid:'#41444a',beltEdge:'#111419',belt:'#313943',slat:'#5b6470',oliveTop:'#f4f5ec',oliveLeft:'#a9b6be',oliveRight:'#d5dce0',darkTop:'#56616a',darkLeft:'#252e36',darkRight:'#3b4650',metalTop:'#eef2f3',metalLeft:'#8b9ba8',metalRight:'#becbd4',acid:'#f5c344',orange:'#ff7628',boxTop:'#d3a36c',boxLeft:'#8e6741',boxRight:'#b17f50'};
  // Sprite shop: the harvest bench stands at x 4.8, directly in front of the grow line's drop, so the tube feeds its
  // back in a straight run (the drawn shop keeps the symmetric pair at x 3). The grower works the grow bench's left end,
  // clear of the pots, watering along the row.
  var STAFF_SPOTS={0:{dx:-.2,dz:-1.4,front:false,facing:1},1:{dx:-2.85,dz:-.25,front:false,facing:1},2:{dx:-.9,dz:-1.4,front:false,facing:-1},3:{dx:-.3,dz:-1.4,front:false,facing:-1},5:{dx:1.05,dz:-1.55,front:false,facing:.35}};
  var machinePos=[{x:-3,z:-3,y:9.4},{x:3,z:-3,y:9.4},{x:SHOP_SPRITES?4.8:3,z:-.3,y:4.7},{x:-3,z:-.3,y:4.7},{x:-4+COUNTER_SHIFT,z:2.5,y:0},{x:4+COUNTER_SHIFT,z:2.5,y:0}];
  // The front edges of the floor, round the pickup pen (Kevin, 2026-10-19: one lone case left the corner looking empty,
  // and a run of cases didn't look good either): the aisle planter's twins along the front baseboard and up the
  // right-hand edge, without the aisle planter's tree. Each is 3.6 long and 0.95 deep, long along z; `rot` lays it
  // along the front.
  var FRONT_FIXTURES=[{file:'edge_planter.glb',x:2.4,z:11.33,rot:Math.PI/2},{file:'edge_planter.glb',x:6.4,z:11.33,rot:Math.PI/2},
    {file:'edge_planter.glb',x:10.3,z:11.33,rot:Math.PI/2,window:true},{file:'edge_planter.glb',x:12.43,z:10.05,rot:0}];
  // Once the pickup window is bought it takes the front planter's place, its A-frame out on the pavement.
  // The window bay itself is a layout fixture (key pickupWindow), so it rises out of a building site like the deck.
  var WINDOW_FIXTURES=[{file:'aframe_sign.glb',x:PICKUP_SIGN.x,z:PICKUP_SIGN.z,rot:PICKUP_SIGN.rot}];
  function frontFixtures(){return windowOpen()?FRONT_FIXTURES.filter(function(f){return !f.window}).concat(WINDOW_FIXTURES):isBuilding(state.builds,'window')?FRONT_FIXTURES.filter(function(f){return !f.window}):FRONT_FIXTURES}
  // The back-wall shelving stands just behind the counters; the smoking lounge is the room behind it (z −7 → −1.76).
  var DISPLAY_Z=-1.6,LOUNGE_FRONT=DISPLAY_Z+.65;
  var sceneElevation=0;
  // While the 3D map records a branch scene, the drawing primitives hand their world shapes to it instead (recordBranch).
  var branchRec=null;
  var tierFlashes=[0,0,0,0,0,0],crateTime=0,cargoOdo=0,particles=[],deliveryDrones=[],sceneTime=0,animationTime=0;
  // Rise-in progress (1 → 0) for a freshly built station; index 6 is the security door.
  var buildRise=[0,0,0,0,0,0,0,0];
  // Grand-opening confetti: paper pieces in the shop's own palette, drifting down over the whole building in world space.
  var confetti=[],CONFETTI_COLORS=['#f0d89a','#f6efdd','#b6e58c','#9dc47a','#e6c95a','#e8823a','#d3e0cb'];
  function celebrateOpening(){
    if(motionPreference.matches)return;
    tierFlashes.fill(1);burst({x:-10.65,z:10},'#f0d89a');burst({x:PICKUP_X,z:4.9},'#b6e58c');
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
  function applyCamera(){render.invalidated=true;var frame=cameraFrame();
    if(SUNNY&&!state.empire.activeStore)clampSunnyPan(frame);else{panX=Math.max(-width*1.6,Math.min(width*1.6,panX));panY=Math.max(-height*1.6,Math.min(height*1.6,panY));}
    centerX=frame.x+panX;centerY=frame.y+panY;unit=frame.unit*zoom;if(state.empire.activeStore)updateBranchMarker()}
  // The sunny city block ends in haze, and SUNNY_VIEW says how far the camera may look: the point under the frame's
  // anchor (where the shop's origin sits at rest) stays inside the shop block and its first ring of streets, and the
  // visible map (the HUD's bottom to the bottom of the map, less the sheet on a phone) stays inside the hazed reach,
  // measured along the camera's rotated axes, so no edge of the town shows at any zoom. When the visible map is wider
  // than the reach, the view sits centred on it.
  function clampSunnyPan(frame){
    var u=frame.unit*zoom,sq=FLOOR_SQUASH,c=Math.cos(angle),s=Math.sin(angle),view=SUNNY_VIEW;
    var rx=-panX/u,rz=-panY/(u*sq),x=rx*c+rz*s,z=rz*c-rx*s;
    x=Math.max(view.centre.x[0],Math.min(view.centre.x[1],x));z=Math.max(view.centre.z[0],Math.min(view.centre.z[1],z));
    rx=x*c-z*s;rz=x*s+z*c;
    var hud=document.querySelector('.hud'),top=hud?hud.getBoundingClientRect().bottom:0,bottom=visibleHeight();
    var fit=function(v,lo,hi){return lo>hi?(lo+hi)/2:Math.max(lo,Math.min(hi,v))};
    rx=fit(rx,view.reach.rx[0]+frame.x/u,view.reach.rx[1]-(width-frame.x)/u);
    rz=fit(rz,view.reach.rz[0]+Math.max(0,frame.y-top)/(u*sq),view.reach.rz[1]-Math.max(0,bottom-frame.y)/(u*sq));
    panX=-rx*u;panY=-rz*u*sq;
  }
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
  // The sprite art is rendered with floor edges at about 30°, so the sprite shop flattens the floor plane by tan 30°
  // rather than the classic 2:1 (26.6°) the drawn shop uses.
  var FLOOR_SQUASH=SHOP_SPRITES?Math.tan(Math.PI/6):.5;
  function project(x,y,z){var r=rotate(x,z),q={x:centerX+r.x*unit,y:centerY+r.z*unit*FLOOR_SQUASH-(y+sceneElevation)*unit,depth:r.z};if(branchRec)branchRec.seen(q,x,y+sceneElevation,z);return q}
  // Gradients are rebuilt identically every frame while the camera is still, so reuse them per context, keyed by colour
  // and quarter-pixel geometry. The map is cleared when it grows large, so moving objects cannot leak entries.
  var gradientCaches=new WeakMap(),gradientCtx=null,gradientMap=null,hexCache=new Map();
  function cachedGradient(key,make){if(gradientCtx!==ctx){gradientCtx=ctx;gradientMap=gradientCaches.get(ctx);if(!gradientMap){gradientMap=new Map();gradientCaches.set(ctx,gradientMap)}}var g=gradientMap.get(key);if(g)return g;if(gradientMap.size>=12000)gradientMap.clear();g=make();gradientMap.set(key,g);return g}
  function isHexColor(fill){if(typeof fill!=='string')return false;var hit=hexCache.get(fill);if(hit===undefined){hit=/^#[0-9a-f]{6}$/i.test(fill);hexCache.set(fill,hit)}return hit}
  function q4(v){return Math.round(v*4)}
  function poly(points,fill,stroke,opaque){if(branchRec){branchRec.poly(points,fill,litDepth>0);return}if(occluding()&&(opaque||isHexColor(fill)))occludePoly(points);ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);for(var i=1;i<points.length;i++)ctx.lineTo(points[i].x,points[i].y);ctx.closePath();if(isHexColor(fill)){
      var lo=points[0].y,hi=lo;for(var k=1;k<points.length;k++){var py=points[k].y;if(py<lo)lo=py;else if(py>hi)hi=py}hi=Math.max(lo+1,hi);
      ctx.fillStyle=cachedGradient(fill+'|v|'+q4(lo)+'|'+q4(hi),function(){var shade=ctx.createLinearGradient(0,lo,0,hi);shade.addColorStop(0,fill);shade.addColorStop(1,shadeColor(fill,.9));return shade});
    }else ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=Math.max(.4,Math.min(1,unit*.021));ctx.lineJoin='round';ctx.stroke()}}
  // Key light sits high on the upper right, so every free-standing object throws a soft shadow down and to the left. The
  // shadow is the convex hull of the footprint and the footprint displaced by the object's height, faded along its length.
  // The sprite look has one sun for every shadow, the renders' own (SUN in sunny-world.js): right on screen, a touch up.
  var SHADOW_DX=-.46,SHADOW_DY=.2;
  if(SHOP_SPRITES){var sunDir=rotate(SUN.x,SUN.z);SHADOW_DX=sunDir.x*SUN_REACH;SHADOW_DY=sunDir.z*FLOOR_SQUASH*SUN_REACH}
  function convexHull(pts){pts=pts.slice().sort(function(a,b){return a.x-b.x||a.y-b.y});function cross(o,a,b){return (a.x-o.x)*(b.y-o.y)-(a.y-o.y)*(b.x-o.x)}var lower=[],upper=[];pts.forEach(function(q){while(lower.length>=2&&cross(lower[lower.length-2],lower[lower.length-1],q)<=0)lower.pop();lower.push(q)});for(var i=pts.length-1;i>=0;i--){var q=pts[i];while(upper.length>=2&&cross(upper[upper.length-2],upper[upper.length-1],q)<=0)upper.pop();upper.push(q)}return lower.slice(0,-1).concat(upper.slice(0,-1))}
  function castShadow(base,h,alpha){
    var dx=h*unit*SHADOW_DX,dy=h*unit*SHADOW_DY,shifted=base.map(function(q){return{x:q.x+dx,y:q.y+dy}}),hull=convexHull(base.concat(shifted));
    var c={x:(base[0].x+base[2].x)/2,y:(base[0].y+base[2].y)/2},g=cachedGradient('c|'+alpha+'|'+q4(c.x)+'|'+q4(c.y)+'|'+q4(dx)+'|'+q4(dy),function(){var g=ctx.createLinearGradient(c.x,c.y,c.x+dx,c.y+dy);g.addColorStop(0,'rgba(14,28,20,'+alpha+')');g.addColorStop(1,'rgba(14,28,20,'+(alpha*.25)+')');return g});
    poly(hull,g);
  }
  function drawBox(x,z,y,w,d,h,palette){if(branchRec){branchRec.box(x,z,y+sceneElevation,w,d,h,palette,litDepth>0);return}var p=palette||[colors.oliveTop,colors.oliveLeft,colors.oliveRight],b0=project(x-w/2,y,z-d/2),b1=project(x+w/2,y,z-d/2),b2=project(x+w/2,y,z+d/2),b3=project(x-w/2,y,z+d/2);
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
  // Sprite shop: draws a fixture sprite `w` units wide with the image point (ax, ay) (fractions of its size) on screen
  // point p, mirrored when `flip` is set; used for wall-mounted pieces anchored by their bracket.
  function spriteAt(name,p,w,ax,ay,flip){
    if(!fixtureSprite(name))return false;var img=spriteImage(name),W=w*unit,H=W*img.naturalHeight/img.naturalWidth;
    ctx.save();ctx.translate(p.x,p.y);if(flip)ctx.scale(-1,1);ctx.drawImage(img,-ax*W,-ay*H,W,H);ctx.restore();return true;
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
  function nightAmount(){return Math.min(1,visualLight().darkness/.34)}

  function ellipse(x,y,rx,ry,fill){
    if(branchRec){branchRec.ellipse(x,y,rx,ry,fill,litDepth>0);return}
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
    if(branchRec){branchRec.ellipse(x,y,rx,ry,fill,litDepth>0);return}
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
  function visibleStrain(slot){var menu=menuStrains();return menu[Math.abs(slot)%menu.length]}
  function stationWorking(i){return state.lines[i]>0&&(i<4?(i===0||state.stock[i-1]>0)&&state.stock[i]<storageCapacity():work[i]>0)}
  // Whether the figure at a post is mid-task, which plays its staff-work-v4 loop: the stations by their flow, the
  // order desks by the customer at them, the doorman while someone is passing the desk, the online counter while
  // orders are being dispatched, the lounge host while guests are waiting or inside.
  function staffWorking(id,gait,x,z){
    if(gait&&gait.workActivity!==undefined)return gait.workActivity>0;
    if(id<6)return stationWorking(id);
    if(id===6)return customers.some(function(c){return Math.abs(c.x-x)+Math.abs(c.z-z)<2.4});
    if(id===7)return readyWork>0||deliveryDrones.length>0;
    if(id===8)return loungeWaiting().length>0||customers.some(function(c){return c.phase==='lounge'});
    return false;
  }
  var recentPickupRatings=[];
  var taskClocks=[0,0,0,0,0,0],taskActivity=[0,0,0,0,0,0],cropGrowth=[.15,.4,.7,.95];
  // Each station's work clock: it runs while the station is working, easing in and out, and drives its staff loop.
  // Its 3D model's motion (station-motion.js) runs on its own clock whenever the station is built, so a station whose
  // store is full or whose input ran dry still looks alive; only pausing the game stops it.
  var motionClocks=[0,0,0,0,0,0];
  function tickTaskClocks(dt){for(var task=0;task<6;task++){var target=stationWorking(task)?1:0;taskActivity[task]+=(target-taskActivity[task])*(1-Math.exp(-dt*5));taskClocks[task]+=dt*1000*taskActivity[task];if(state.lines[task]>0)motionClocks[task]+=dt}}
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
  function worldLine(points,color,weight){if(branchRec){branchRec.line(points,color,weight,sceneElevation,litDepth>0);return}var w=Math.max(.65,unit*weight),q=new Array(points.length);ctx.beginPath();for(var i=0;i<points.length;i++){var v=project(points[i][0],points[i][1],points[i][2]);q[i]=v;if(i)ctx.lineTo(v.x,v.y);else ctx.moveTo(v.x,v.y)}ctx.strokeStyle=color;ctx.lineWidth=w;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();if(weight>=.05&&occluding()&&isHexColor(color))occludeStroke(q,w)}
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
  // A low dark-green tiled wall with a cream cap, drawn on its true footprint (the sprite shop's divider and store edge).
  // Every drawn tile face in the sprite shop uses the one scheme of the wall renders: slim vertical stack-bond tiles
  // in the storefront emerald, light grout, and a brass rail where a cream cap or plaster sits on them.
  var TILE_PITCH=.2;
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
    // Sunny look: Ludo figures stand in for the drawn ones in the scene (thumbnails, drawn with now 0, keep the drawn style).
    // The drawn walk phase turns 5 radians a unit, so phase/5 is the ground walked, which the sprite walk wants.
    if(SUNNY&&now&&drawPersonSprite(sunnyApi(now),x,z,employee?id:(gait&&gait.identity!==undefined?gait.identity:id),employee,gait?gait.facing:.3,(gait?gait.phase:now*.007+id)/5,motionPreference.matches?0:(gait?gait.amount:(moving?1:0)),!!bag,employee&&staffWorking(id,gait,x,z),gait&&gait.heading))return;
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
    // Under the sprite look a drawn stand-in takes the same sun shadow as the sprite figures.
    if(SHOP_SPRITES&&now)sunShadow(sunnyApi(now),x,0,z,.24,.2,2.3,.9,.8);else{
    ellipse(p.x,p.y+u*.025,u*.32,u*.085,'#071d2025');
    // Cast shadow stretching down-left from the feet, matching the key light used for furniture.
    ctx.save();ctx.translate(p.x+u*.34,p.y+u*.14);ctx.rotate(-.42);var sg=ctx.createLinearGradient(-u*.45,0,u*.45,0);sg.addColorStop(0,'rgba(14,28,20,.16)');sg.addColorStop(1,'rgba(14,28,20,.03)');ctx.beginPath();ctx.ellipse(0,0,u*.5,u*.12,0,0,Math.PI*2);ctx.fillStyle=sg;ctx.fill();ctx.restore();}
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
    if(bag){var bx=x+.48,bz=z+.1,by=.55+(reduced?0:Math.sin(phase-.65)*amount*.055+(gait&&gait.pickupAge!==undefined?.14*Math.exp(-gait.pickupAge*5):0));
      if(SHOP_SPRITES&&drawBoxSprite(sunnyApi(sceneTime),fixtureSprite('prop.pickup.bag'),bx-.19,bx+.19,bz-.13,bz+.13,by,by+.6,true)){}else{drawBox(bx,bz,by,.38,.3,.48,['#ead3a1','#9c8052','#c6aa75']);worldLine([[bx-.12,by+.48,bz],[bx-.12,by+.59,bz],[bx+.12,by+.59,bz],[bx+.12,by+.48,bz]],'#bd9f67',.03);drawBox(bx,bz+.16,by+.16,.2,.018,.22,['#496f50','#496f50','#496f50']);bagAppIcon(bx,bz+.18,by+.16,.22)}}
  }
  // The order line snakes through three full-width rows of the rope pen in front of the order desk (z 7.0, 8.15 and
  // 9.3, between x −6.5 and −2.0, the gate at the right-hand end — a little back and to the right of the ID desk)
  // before its tail runs through the entry corridor in front of the ID desk and the doorman (never along the wall
  // beside them), crosses the threshold at z ≈ 9 and continues outside along the storefront.
  // The pen's rows grow with the line: 2.4 wide for the starter line of six, full width (4.5) from twenty places.
  var ORDER_ROWS=[7.0,8.15,9.3],ORDER_PEN_RIGHT=-2.0+COUNTER_SHIFT,PICKUP_AISLE_Z=5.5;
  // The ground floor runs out to x 13 on the right (Kevin, 2026-10-19: the exit route past the stairs was too narrow), so
  // leaving guests walk a lane at x 12.2, clear of the spiral stair (x 9.05-11.35), before turning in to the exit door.
  var EXIT_LANE_X=12.2;
  // The pickup pen's turning points, between the counter's light and the planters along the front edge. It starts as
  // two short rows and grows with the waiting area's promised places (Kevin, 2026-10-19: start smaller and get to that size):
  // wider as Pickup line levels up, and four rows from twelve places, full size (6.6 wide) at twenty.
  function pickupPen(){
    var places=pickupPromised(),grow=Math.max(0,Math.min(1,(places-4)/16));
    return {left:3.6,right:6+4.2*grow,rows:[5.95,7.05,8.15,9.25].slice(0,places>=12?4:2)};
  }
  // The order pen grows the same way: one row at first, widening with the line, and three rows from twelve places.
  function orderPen(){var limit=queueLimit();return {right:ORDER_PEN_RIGHT,left:ORDER_PEN_RIGHT-Math.min(4.5,1.5+limit*.15),rows:ORDER_ROWS.slice(0,limit>=12?3:1)}}
  function queueRoute(ordered){
    var ORDER_PEN=orderPen();
    // Both lines snake through their pen's rows, turning at alternate ends.
    var snake=function(pen,first){var pts=[];pen.rows.forEach(function(z,i){var a=i%2?pen[first==='right'?'left':'right']:pen[first],b=i%2?pen[first]:pen[first==='right'?'left':'right'];pts.push({x:a,z:z},{x:b,z:z})});return pts};
    if(!ordered){var lastRow=ORDER_PEN.rows[ORDER_PEN.rows.length-1];return [ORDER_QUEUE_GATE].concat(snake(ORDER_PEN,'right'),[{x:-7.4,z:lastRow},{x:-8.2,z:8.6}],ENTRY_TAIL)}
    // The pickup line steps back from the counter into a pen over the open front-right floor (Kevin, 2026-10-19:
    // the old pocket by the counter left the corner wasted): rows right, left, right, left, the tail coming in at the
    // bottom-left from the walkway down the middle of the floor. The head's row starts at the counter.
    var route=[{x:PICKUP_X,z:4.9}].concat(snake(pickupPen(),'left'));route[1]={x:PICKUP_X,z:route[1].z};return route;
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
      // A customer with a kiosk walks to it; everyone else waits on the walkway behind the first kiosk, in line order,
      // measured along the first kiosk's route (a waiting customer has no kiosk yet).
      if(c.kioskIndex!=null)return 0;
      var waiting=queue.filter(function(q){return q.kioskIndex==null});
      return KIOSK_WAIT_START+Math.max(0,waiting.indexOf(c))*queueGap(true);
    }
    return Math.max(0,queue.indexOf(c))*queueGap(false);
  }
  // Space between people in a line: close enough to read as a queue (Kevin's call), a little tighter past twenty
  // places so more of the line fits in the pen before the tail runs outside.
  // The kiosk line's first waiting place, on the walkway a step past the first kiosk (-8.45, 7.6), and how many wait:
  // three places fit on the walkway before it reaches the entry corridor (KIOSK_WAIT_START + 2 gaps < its 2.73 join),
  // so nobody waits in the doorway or stands on another waiting customer.
  var KIOSK_WAIT_START=1.3,KIOSK_WAIT_PLACES=3;
  function queueGap(kiosk){return kiosk?.65:queueLimit()>20?.7:.8}
  function customerTarget(c){
    if(c.phase==='leaving')return{x:-10.5,z:-8.1};
    return routePoint(c.kiosk&&!c.ordered?kioskRoute(c.kioskIndex):queueRoute(c.ordered),customerQueueDistance(c));
  }
  // The doorman's line is one route from the desk back out through the door and along the street, everyone 0.7
  // apart: the next customer is already on the approach while the head is being checked, so the desk is never idle
  // waiting for someone to walk up from the door, and a well-staffed door clears people as fast as they arrive.
  // The ID desk stands 0.9 further in from the street door than it first did (Kevin, 2026-10-19: more room at the door);
  // guests are checked at ID_CHECK, in front of it.
  // Turned to face the door (Kevin, 2026-10-19), the booth runs along z. At full size (1.69 map units to a Blender metre,
  // like the other stations; Kevin: "the security booth scale is too small") it sits nearer the storefront so its rear
  // end clears the order line's last turn at (-8.2, 8.6); guests stop at its scanner, and the doorman works its room
  // side by the monitors, past the line's last row at z 9.3.
  var ID_DESK={x:-8.2,z:10.15},ID_CHECK={x:-9.2,z:9.6},DOORMAN={x:-7.15,z:10.35};
  var ID_ROUTE=[ID_CHECK,{x:-10.6,z:9.6},{x:-11.7,z:9.3},{x:-12.4,z:7.8},{x:-12.4,z:-10}];
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
          c.phase='toLounge';c.routeKind='lounge';c.waypoints=[{x:ID_CHECK.x,z:8.5},{x:-9.7,z:8.15},{x:-8.2,z:8.6},{x:-7.95,z:7.6},{x:-7.95,z:2.2},{x:LOUNGE_DOOR.x,z:2.2}];return;
        }
        c.lounge=false;
        var route=c.kiosk?kioskRoute(c.kioskIndex):queueRoute(false),join=laneJoinIndex(route);
        // Step down the desk's door side and join the lane in the corridor in front of it, clear of the doorman.
        c.routeKind=c.kiosk?'kiosk':'order';c.laneDistance=routeLength(route.slice(0,join+1));c.waypoints=[{x:ID_CHECK.x,z:8.5},route[join]];
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
      // the counters (ORDER_SPOT_Z) and the head of the order line (z 6.1); counter customers step back into the same aisle
      // rather than walking along the counter front through the other customers. Everyone then goes down the middle
      // walkway to the line's tail.
      var tail=route[route.length-1],toPickup=[{x:-.25+COUNTER_SHIFT,z:PICKUP_AISLE_Z},{x:-.25+COUNTER_SHIFT,z:tail.z},tail];
      c.waypoints=(kind==='order'||kind==='kiosk')?[route[route.length-1]]:kind==='pickup'?(c.kiosk?[{x:-8,z:6.8-(c.kioskIndex||0)*1.8},{x:-7.4,z:PICKUP_AISLE_Z}].concat(toPickup):[{x:c.x,z:PICKUP_AISLE_Z}].concat(toPickup)):[{x:PICKUP_X,z:4},{x:8.1,z:4.6},{x:EXIT_LANE_X,z:4.6},{x:EXIT_LANE_X,z:-4.6},{x:10.25,z:-6},{x:10.25,z:-8.1},{x:7,z:-8.1},{x:-10.5,z:-8.1}];
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
            target=Math.max(target,ahead.laneDistance+routeLength(route)-routeLength(aheadRoute)+queueGap(c.kiosk&&!c.ordered));
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
  function customerBadged(c){return atOrderCounter(c,state.orderCounters)||c.phase==='pickup'||c.phase==='toPickup'}
  // Ordering (…) and order-in (✓) badges: a small forest-glass disc floating just clear of the head, so faces stay
  // visible. In the depth-sorted pass it is drawn a little in front of its customer, so the next person in a packed
  // line does not hide it.
  function drawCustomerBadge(c){
    if(!customerBadged(c))return;
    var r=Math.max(6,unit*.15),top=project(c.x,PERSON_HEAD_Y+.07,c.z),x=top.x,y=top.y-r,g=r*.42;
    ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle='rgba(23,52,38,.86)';ctx.fill();
    ctx.lineWidth=Math.max(1,r*.12);ctx.strokeStyle='rgba(236,246,232,.55)';ctx.stroke();
    if(c.ordered){ctx.beginPath();ctx.moveTo(x-g,y+g*.05);ctx.lineTo(x-g*.25,y+g*.7);ctx.lineTo(x+g,y-g*.6);ctx.strokeStyle='#c4e8a7';ctx.lineWidth=Math.max(1.4,r*.2);ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke()}
    else{ctx.fillStyle='#f0dfb0';[-1,0,1].forEach(function(i){ctx.beginPath();ctx.arc(x+i*g*.85,y,Math.max(.9,r*.11),0,Math.PI*2);ctx.fill()})}
    var serviceIndex=c.ordered?5:4;if(!c.walking&&c.serviceStation===serviceIndex&&c.serviceElapsed>0){var serviceProgress=motionPreference.matches?Math.min(1,c.serviceElapsed*economy.counterLanes(state.lines[serviceIndex])/counterServiceDuration(serviceIndex)):(c.serviceVisual||0);ctx.beginPath();ctx.arc(x,y,r+Math.max(2,unit*.05),-Math.PI/2,-Math.PI/2+Math.PI*2*serviceProgress);ctx.strokeStyle=c.ordered?'#d5f3ad':'#f3d294';ctx.lineWidth=Math.max(1.5,unit*.05);ctx.lineCap='round';ctx.stroke()}
    ctx.restore();
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
      // Sprite shop: the v2 gold-lidded flower jar in place of the drawn one.
      if(SHOP_SPRITES&&drawBoxSprite(sunnyApi(sceneTime),fixtureSprite('prop.jar'),x-.15,x+.15,z-.14,z+.14,y,y+.46,true))return;
      drawBox(x,z,y,.3,.27,.4,['#c4dec4','#719883','#a1bea8']);
      drawBox(x,z,y+.4,.34,.31,.07,['#dacba0','#9a8c62','#c0b182']);
      drawBox(x,z+.143,y+.1,.22,.014,.16,['#f3efda','#f3efda','#f3efda']);
    }else if(stage===5){
      // A taped kraft shipping box with a green address label, on its way up to the online orders deck.
      drawBox(x,z,y,.38,.3,.26,['#d6ae72','#8f6f42','#b88d55']);
      drawBox(x,z,y+.26,.08,.31,.012,['#eadcb4','#eadcb4','#eadcb4']);
      drawBox(x+.1,z+.151,y+.08,.12,.01,.09,['#496f50','#496f50','#496f50']);
    }else{
      // Sprite shop: the v2 kraft pickup bag with its green label.
      if(SHOP_SPRITES&&drawBoxSprite(sunnyApi(sceneTime),fixtureSprite('prop.pickup.bag'),x-.2,x+.2,z-.13,z+.13,y,y+.62,true))return;
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
  // Kevin's belt kit (2026-10-15): a hopper end, a straight that tiles and a chute end. Each module is measured on its
  // render in the render's own floor coordinates (ix, iz: pixels along its x and z axes) as the belt surface's extent and
  // its near-left corner, so every module is scaled to the one belt width BELT_W and butts against the next with the
  // surface flush. The three renders have different leg lengths, so the surface is pinned at the height that stands the
  // straight module's feet on the floor and any longer legs are clipped at the floor line under the belt.
  var BELT_W=.8;
  // Every tube and belt moves its cargo at the one shop-wide speed (cargoOdo, in world units), a parcel every CARGO_GAP
  // units, so the whole route reads as one line rather than runs on their own clocks. The sprite tubes share one bore.
  var CARGO_GAP=2.4,TUBE_DIA=.68;
  function transferTube(points,stage,ports,cargoStage,cargoOnly,window){
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
    var spriteTube=cargoOnly||(SHOP_SPRITES&&shellSprite('tube.straight')&&shellSprite('tube.elbow'));
    if(spriteTube&&!cargoOnly)drawTubeSprites(points);
    // Transparent body: the room remains visible through the tube.
    if(!spriteTube){worldLine(path,'#233e341a',.92);worldLine(path,'#233e343c',.78);worldLine(path,'#c5e6dd24',.68)}
    function glassEdge(offset,color,width){
      var screenPath=path.map(function(p){return project(p[0],p[1],p[2])});
      ctx.beginPath();screenPath.forEach(function(p,i){var a=screenPath[Math.max(0,i-1)],b=screenPath[Math.min(screenPath.length-1,i+1)],dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy)||1;
        var x=p.x-dy/len*unit*offset,y=p.y+dx/len*unit*offset;if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y);
      });ctx.strokeStyle=color;ctx.lineWidth=unit*width;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();
    }
    if(!spriteTube){glassEdge(-.35,'#e2f3e93a',.06);glassEdge(-.35,'#e2f3e980',.022);glassEdge(.35,'#456f6338',.07);glassEdge(.35,'#456f6370',.03)}

    var segments=[],total=0;
    for(var n=1;n<path.length;n++){var a=path[n-1],b=path[n],len=Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2]);segments.push({a:a,b:b,len:len});total+=len}
    // `window` {total, offset} places this run inside a longer flow (the pack line's buried stretch and stub): the
    // parcels are spaced over the whole flow and only those whose distance falls on this run are drawn here.
    var span=window?window.total:total,start=window?window.offset:0,count=Math.max(2,Math.round(span/CARGO_GAP)),spacing=span/count,odo=state.lines[stage]>0?cargoOdo:0;
    for(var parcel=0;parcel<count;parcel++){
      var distance=(odo+parcel*spacing)%span-start;
      if(distance<0||distance>=total)continue;
      for(var n=0;n<segments.length;n++){var part=segments[n];if(distance>part.len){distance-=part.len;continue}var t=distance/part.len,q=mix(part.a,part.b,t);transportItem(q[0],q[1]-.18,q[2],cargoStage===undefined?stage:cargoStage);break}
    }
    if(spriteTube)return;
    // Narrow glass reflection and restrained brass end couplings.
    worldLine(path,'#dcf3e814',.55);
    glassEdge(-.24,'#f5fff0b3',.05);glassEdge(.22,'#b9e4da5c',.024);
    [points[0],points[points.length-1]].forEach(function(p){var q=project(p[0],p[1],p[2]);ellipse(q.x,q.y,unit*.37,unit*.28,'#c3b789');ellipse(q.x,q.y,unit*.27,unit*.2,'#345e5066')});
  }
  // Kevin's glass tube kit (2026-10-15). The straight render runs along +x; at load it is turned once into a vertical
  // image (its axis down column `axis`, its two collar mouths at the `mouth` rows) so a run can be laid along any screen
  // line with only the glass between the collars stretched. Along x the render keeps its own orientation, along z it is
  // mirrored (a straight tube has no handedness, and a mirror is exactly what turns the x axis into the z axis), and a
  // vertical piece takes the turned image as it stands: its collar ellipses already lie flat.
  var TUBE_STRAIGHT={angle:30.74*Math.PI/180,cx:304.9,cy:223.8,alongMin:-333.5,rows:679,w:200,axis:100,mouth:[68.3,617.8],cap:[134.7,554.8],glass:157.2},tubeStraightCanvas=null;
  function tubeStraightVertical(){
    if(tubeStraightCanvas)return tubeStraightCanvas;
    var img=spriteImage('tube.straight');if(!img||!img.naturalWidth||typeof document==='undefined')return null;
    var T=TUBE_STRAIGHT,c=document.createElement('canvas');c.width=T.w;c.height=Math.ceil(T.rows)+4;
    var g=c.getContext('2d'),s=Math.sin(T.angle),co=Math.cos(T.angle),oy=2-T.alongMin;
    g.setTransform(s,co,-co,s,T.axis-T.cx*s+T.cy*co,oy-T.cx*co-T.cy*s);g.drawImage(img,0,0);
    return tubeStraightCanvas=c;
  }
  // The elbow render turns a vertical drop (arm A, up from the virtual corner) into a run along +x (arm B); at a bend it
  // is mapped by the one affine transform that lays those two arms along the two segments meeting there.
  var TUBE_ELBOW={corner:[102.5,398.4],armA:332,armB:262.8,w:161,dA:[0,-1],dB:[Math.cos(Math.PI/6),Math.sin(Math.PI/6)]};
  function drawTubeSprites(points,dia,opts){
    dia=dia||TUBE_DIA;opts=opts||{};var S=tubeStraightVertical(),E=spriteImage('tube.elbow'),T=TUBE_STRAIGHT;if(!S)return;
    var P=points.map(function(p){return project(p[0],p[1],p[2])}),sE=unit*dia/TUBE_ELBOW.w,trim=[];
    // Elbows first, to know how far each straight stops short of its corner.
    for(var k=1;k<P.length-1;k++){
      var c=P[k],q=P[k-1],n=P[k+1],l1=Math.hypot(q.x-c.x,q.y-c.y)||1,l2=Math.hypot(n.x-c.x,n.y-c.y)||1;
      var u1=[(q.x-c.x)/l1,(q.y-c.y)/l1],u2=[(n.x-c.x)/l2,(n.y-c.y)/l2],swapped=u1[0]*u2[1]-u1[1]*u2[0]<0;
      // Keep the render's handedness: arm A takes whichever neighbour leaves the bend un-mirrored.
      if(swapped){var sw=u1;u1=u2;u2=sw}
      trim[k]=swapped?[TUBE_ELBOW.armB*sE*.8,TUBE_ELBOW.armA*sE*.8]:[TUBE_ELBOW.armA*sE*.8,TUBE_ELBOW.armB*sE*.8];
      if(!E)continue;
      var dA=TUBE_ELBOW.dA,dB=TUBE_ELBOW.dB,C=TUBE_ELBOW.corner,det=dA[0]*dB[1]-dA[1]*dB[0],i00=dB[1]/det,i01=-dB[0]/det,i10=-dA[1]/det,i11=dA[0]/det;
      var m00=(u1[0]*i00+u2[0]*i10)*sE,m01=(u1[0]*i01+u2[0]*i11)*sE,m10=(u1[1]*i00+u2[1]*i10)*sE,m11=(u1[1]*i01+u2[1]*i11)*sE;
      ctx.save();ctx.transform(m00,m10,m01,m11,c.x-m00*C[0]-m01*C[1],c.y-m10*C[0]-m11*C[1]);ctx.drawImage(E,0,0);ctx.restore();
    }
    function slice(x,y,ux,uy,px,py,s,sy0,sy1,t0,t1){
      var k=(t1-t0)/(sy1-sy0),bx=x-px*T.axis*s+ux*t0,by=y-py*T.axis*s+uy*t0;
      ctx.save();ctx.transform(px*s,py*s,ux*k,uy*k,bx-ux*k*sy0,by-uy*k*sy0);ctx.drawImage(S,0,sy0,T.w,sy1-sy0,0,sy0,T.w,sy1-sy0);ctx.restore();
    }
    for(var i=1;i<P.length;i++){
      var a=P[i-1],b=P[i],dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy);if(L<1)continue;
      var t0=trim[i-1]?trim[i-1][1]:0,t1=L-(trim[i]?trim[i][0]:0),openStart=!!opts.noCap0&&i===1,openEnd=false;
      // The image runs down the screen, its far collar first; a segment that climbs is laid from its other end.
      if(dy<0||(dy===0&&dx<0)){var tmp=a;a=b;b=tmp;dx=-dx;dy=-dy;var tt=t0;t0=L-t1;t1=L-tt;openEnd=openStart;openStart=false}
      if(t1-t0<2)continue;
      // A cylinder along a floor axis shows 1.118 bores across its screen line; a vertical one shows exactly one.
      var ux=dx/L,uy=dy/L,mirror=ux<-.01,px=mirror?-uy:uy,py=mirror?ux:-ux,s=unit*dia*(Math.abs(ux)<.01?1:1.118)/T.glass;
      var r0=T.mouth[0],r1=T.mouth[1],c0=T.cap[0],c1=T.cap[1],H=S.height,g0=openStart?t0:t0+(c0-r0)*s,g1=openEnd?t1:t1-(r1-c1)*s;
      if(g1-g0<2){var su=(t1-t0)/(r1-r0);slice(a.x,a.y,ux,uy,px,py,s,0,H,t0-r0*su,t1+(H-r1)*su);continue}
      if(!openStart)slice(a.x,a.y,ux,uy,px,py,s,0,c0,t0-r0*s,g0);
      slice(a.x,a.y,ux,uy,px,py,s,c0,c1,g0,g1);
      if(!openEnd)slice(a.x,a.y,ux,uy,px,py,s,c1,H,g1,t1+(H-r1)*s);
    }
  }
  // Kevin's floor-to-floor assemblies (inlet from -x at the top, a brass floor ring, a swept outlet at the bottom), each
  // measured on its render: the drop's axis column and glass width (one bore), the rows where the inlet and outlet arms
  // meet the drop (`top`, `bot`), the floor ring's rows and centre, the rows where the two bends end and begin (`bend`),
  // and the inlet and outlet mouth centres. The image is drawn at the scale that gives the drop TUBE_DIA, in five
  // bands: the bends and the ring at that scale, the plain glass between them stretched so the inlet lands at the
  // feeding bench's level, the ring in the floor slab and the outlet at the receiving level.
  var TUBE_KIT={
    'tube.run.grow':{axis:174.5,width:99,top:175.3,bot:764.1,ring:[342,445,402.7],bend:[284,655],inlet:[54.2,105.9],outlet:[55.4,832.9],outDir:'z'},
    'tube.run.pack':{axis:178,width:96,top:170.3,bot:758.7,ring:[334,431,390.3],bend:[276,653],inlet:[56.6,100.2],outlet:[307.4,833.5],outDir:'x'}};
  // The pack line's downstairs leg runs behind the product wall; only a short drop from the mezzanine's underside into
  // the pickup counter's back shows, so nothing pierces the shelving in front of that wall.
  var PACK_STUB_X=4+COUNTER_SHIFT+.4;
  var TUBE_RUNS={
    // The grow line drops at the top floor's right and its outlet runs straight forward into the back of the harvest
    // bench standing in front of it (no dog-leg round the bench's end); the connector is a straight along z.
    1:{name:'tube.run.grow',x:5.6,z:-3,yTop:10.85,ySlab:9.4,yBot:5.21,end:-.3},
    // The pack line's inlet comes out of the pack bench's end (`feed`), so no collar stands loose beside the bench.
    3:{name:'tube.run.pack',x:.1,z:-1.3,yTop:6.15,ySlab:4.7,yBot:1.55,end:PACK_STUB_X,feed:-2.4}};
  // World geometry of a run from its render: the arm lengths follow from the bore, since the image has one scale.
  function tubeRunGeometry(run){
    if(run.path)return run;
    var m=TUBE_KIT[run.name],f=TUBE_DIA/(m.width*Math.SQRT1_2),arm=(m.axis-m.inlet[0])*f,out=Math.abs(m.outlet[0]-m.axis)*f;
    run.port=[run.x,run.ySlab,run.z];
    var head=(run.feed!==undefined?[[run.feed,run.yTop,run.z]]:[]).concat([[run.x-arm,run.yTop,run.z],[run.x,run.yTop,run.z],[run.x,run.yBot,run.z]]);
    if(m.outDir==='z'){run.connector=[[run.x,run.yBot,run.z+out],[run.x,run.yBot,run.end]];run.path=head.concat(run.connector)}
    else run.path=head.concat([[run.x+out,run.yBot,run.z],[run.end,run.yBot,run.z]]);
    return run;
  }
  // The pack line is one flow: the visible mezzanine leg and drop, a buried stretch inside the product wall and up to
  // the slab, then the stub into the pickup counter. Its parcels are spaced over the whole length, so the ones that
  // come out of the stub are the ones that went into the wall, at the same rhythm.
  // No slab covers the counters (the mezzanine stops at the product wall), so the stub leaves the wall's tile band below
  // the ceiling, crosses over the shelving and turns down into the counter.
  var PACK_STUB=[[PACK_STUB_X,3.8,LOUNGE_FRONT],[PACK_STUB_X,3.8,1.3],[PACK_STUB_X,1.45,1.3]];
  function polyLength(pts){var s=0;for(var i=1;i<pts.length;i++)s+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1],pts[i][2]-pts[i-1][2]);return s}
  var PACK_BURIED=polyLength([[PACK_STUB_X,1.55,-1.3],[PACK_STUB_X,3.8,-1.3],[PACK_STUB_X,3.8,LOUNGE_FRONT]]),PACK_STUB_AT=polyLength(tubeRunGeometry(TUBE_RUNS[3]).path)+PACK_BURIED,PACK_FLOW=PACK_STUB_AT+polyLength(PACK_STUB);
  TUBE_RUNS[3].flow={total:PACK_FLOW,offset:0};
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
  var FLAP_COLS=21,FLAP_ROWS=4;
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
  function drawDeckSprite(now,name){
    var api=sunnyApi(now),img=shellSprite(name)&&spriteImage(name);if(!img)return false;
    var x=DECK_X,z=DECK_Z,pts=[];[x-2.2,x+2.2].forEach(function(px){[z-3.55,z+1.9].forEach(function(pz){[-.24,3.8].forEach(function(py){pts.push(project(px,py,pz))})})});
    var savedElevation=sceneElevation;sceneElevation=0;softShadow(api,x-.3,0,z-.6,2.1,2.6,.3);softShadow(api,x+.9,0,z-1.1,2.6,2.9,.14);sceneElevation=savedElevation;
    var l=Math.min.apply(null,pts.map(function(q){return q.x})),r=Math.max.apply(null,pts.map(function(q){return q.x})),b=Math.max.apply(null,pts.map(function(q){return q.y}));
    var kOld=(r-l)/1146,cx=l+5*kOld,cy=b-1149*kOld+679*kOld,k=kOld*1.2*2;
    ctx.save();ctx.translate(cx-k*76.5,cy-k*232);ctx.scale(k,k);ctx.drawImage(img,0,0);ctx.restore();return true;
  }
  // Measured on the deck render: the underside of the slab's steel rim, taken at -.24 below the deck level, has its front
  // edge at z 1.26 and its right edge at x -10.7; the rear support leaves it near that corner and falls at -.43 (y over x)
  // to the mezzanine's end. The parcel feed climbs the same slope along the front of the support and runs on into the slab.
  var DECK_FRONT=1.26,DECK_RIGHT=-10.7,DECK_FEED=[[-4.3,-.9,.85],[-7.99,-.9,.85],[-10.68,.25,.85]];
  function onlinePackingCounter(now,previewOnly){
    var x=DECK_X,z=DECK_Z,oak=['#cbb085','#7f6a4b','#ac9168'],green=['#86a795','#3e6250','#648a70'];
    if(!deliveryBuilt()&&!previewOnly){onlineCounterSite(now,x,z,oak);return}
    // Sprite shop: the finished deck render, with the live dispatch readout and the parcel feed still drawn over it.
    if(SHOP_SPRITES&&!previewOnly&&shellSprite('deck.delivery.built')&&spriteImage('deck.delivery.built')){
      // The parcel feed runs along the mezzanine rail, climbs beside the deck's rear support and rises into the deck's
      // underside: it is cut along the slab's front and right edges, so its last stretch disappears inside the deck.
      drawDeckSprite(now,'deck.delivery.built');
      var l=project(DECK_RIGHT-8,-.24,DECK_FRONT),c=project(DECK_RIGHT,-.24,DECK_FRONT),r=project(DECK_RIGHT,-.24,DECK_FRONT-8),far=width+height;
      ctx.save();ctx.beginPath();ctx.moveTo(l.x-far,l.y);ctx.lineTo(l.x,l.y);ctx.lineTo(c.x,c.y);ctx.lineTo(r.x,r.y);ctx.lineTo(r.x+far,r.y);ctx.lineTo(r.x+far,c.y+far);ctx.lineTo(l.x-far,c.y+far);ctx.closePath();ctx.clip();
      // The feed leaves the pack bench's end without a collar, and the turn onto the support is a shallow one the right-angle elbow render cannot make, so the two straights meet
      // collar to collar there, like a coupling.
      drawTubeSprites(DECK_FEED.slice(0,2),TUBE_DIA,{noCap0:true});drawTubeSprites(DECK_FEED.slice(1));transferTube(DECK_FEED,3,[],5,true);ctx.restore();
      return;
    }
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
    if(!previewOnly)transferTube([[-4.55,-.9,1],[-7.4,-.9,1],[-7.4,1.5,DECK_Z],[-9.05,1.5,DECK_Z]],3);
  }
  // Before the delivery pad is bought the mezzanine corner is a building site: bare deck, taped-off perimeter,
  // a sheeted counter, stacked materials and an unlit COMING SOON board where the sign will go.
  function onlineCounterSite(now,x,z,oak){
    // Sprite shop: the taped-off deck as one connected render (ChatGPT redo), stretched over the site's whole box.
    if(SHOP_SPRITES&&drawDeckSprite(now,'deck.delivery.site'))return;
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
  // Slim forest-green glazing for the grow room: a low plinth, thin mullions on a regular bay, a mid rail and a top
  // rail, with the bay at `solidX` (if any) panelled solid to carry the exhaust fan. `alongZ` runs the wall along z
  // with its face toward +x from the plane x; otherwise along x with its face toward +z.
  // One bay per pane of Kevin's 2026-10-15 glazing render (three panes a module), so the modules tile at their own
  // proportions; the exhaust fan's solid panel is two panes wide, centred on the pane joint nearest FAN_X.
  // The rear glazing runs on past the top floor's corner to the outer edge of the stair's landing notch, so no slab
  // or street shows between its end and the landing (Kevin, 2026-10-17).
  var FAN_X=-4.9,GLAZING_BAY=1.07,TOP_LANDING={outer:9,back:-6.9,front:-5.7};

  function sunnyApi(now){return{get ctx(){return ctx},daylight:1-nightAmount(),width:width,height:height,unit:unit,now:motionPreference.matches?0:now,project:project,poly:poly,line:worldLine,ellipse:ellipse,blob:blobEllipse,noise:seedNoise,depth:depthOf,box:drawBox,shade:shadeColor,person:function(x,z,id,moving){drawPerson(x,z,now,id,moving,false,false)}}}
  // shell.door.exit.v2, in sprite px: the clean outline of the frame and its open leaf, with the opening cut out
  // between the posts' inner faces (the dark halo and the slivers inside the opening lie outside it), and the two
  // keyed-out reveals, drawn as shaded side faces receding on the render's own depth slope.
  var EXIT_DOOR_OUTLINE=[[29,37],[55,20],[282,147],[285,172],[421,96],[436,104],[436,533],[286,614],[262,621],[241,608],[241,196],[76,105],[76,517],[52,531],[29,519]];
  var EXIT_DOOR_REVEALS=[[[52,92],[77,77],[77,517],[52,531]],[[262,150],[285,137],[285,609.4],[262,621]]];
  // The v2 exit door render, prepared once on its own canvas. The render came out of ChatGPT with an opaque dark halo
  // round its silhouette and dark slivers inside the opening (the ragged edges), and its white-painted jamb reveals
  // were keyed out with the background, so the leaf hung clear of the frame (Kevin, 2026-10-16: "figure out the exit
  // door"). The file stays as rendered: it is composed through the clip that follows the frame's and leaf's clean
  // edges, over two shaded side faces that refill the keyed-out reveals, so the posts read as solid and the leaf hangs
  // off the right one. The render is also in perspective: its base runs at 22°, the header's underside at 29°, its
  // front-top edge at 26° and the top face's far edge at 29°, so the shear that squares the base left the header
  // climbing at about 36° on screen (Kevin, 2026-10-17: "the top frame angle still feels off"). So each 1-px column is
  // re-sampled in up to three segments that put the base, the header's underside, its front-top edge and its top
  // face's far edge on lines parallel to the base at fixed heights (3.3, 3.69 and 3.79 on the wall), and the leaf's
  // base and top on lines from the right post's outer foot at the slope the draw's shear turns into the map's -z
  // direction, the leaf 3.38 tall as rendered. Both posts come out the same height and every edge lands on the map's 30°.
  function exitDoorSource(img){
    if(exitDoorSource.canvas&&exitDoorSource.img===img)return exitDoorSource.canvas;
    var W=img.naturalWidth,H=img.naturalHeight,flat=document.createElement('canvas');flat.width=W;flat.height=H;var g=flat.getContext('2d');
    g.beginPath();EXIT_DOOR_OUTLINE.forEach(function(q,i){i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])});g.closePath();g.clip();
    g.fillStyle='#1f4835';EXIT_DOOR_REVEALS.forEach(function(face){g.beginPath();face.forEach(function(q,i){i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])});g.closePath();g.fill()});
    g.drawImage(img,0,0);
    var out=document.createElement('canvas');out.width=W;out.height=H;var o=out.getContext('2d');
    // Heights above the base line in sprite px (times the pins' scale, 0.00775 of a unit per px): the header's
    // underside, its front-top edge and its top face's far edge; the leaf's height; the column where the leaf's plane begins.
    var UNDER=425.5,FRONT=476.8,TOP=489.5,LEAF=436,HINGE=262;
    function base(u){return 529+(616-529)/(255-45)*(u-45)} // the post feet's line, the pins' base
    for(var u=0;u<W;u++){
      var c=u+.5,b=base(c);
      if(c<HINGE){
        // The render's own lines at this column: the header's underside, its front-top edge and its top face's far edge.
        var under=92+(196-92)/(241-52)*(c-52),front=37+(150-37)/(262-29)*(c-29),top=20+(147-20)/(282-55)*(c-55);
        var s1=UNDER/(b-under),s2=(FRONT-UNDER)/(under-front),s3=(TOP-FRONT)/(front-top);
        o.drawImage(flat,u,under,1,H-under,u,b-UNDER,1,(H-under)*s1);
        o.drawImage(flat,u,front,1,under-front,u,b-FRONT,1,(under-front)*s2);
        o.drawImage(flat,u,0,1,front,u,b-FRONT-front*s3,1,front*s3);
      }else{
        // The leaf and the right post's side face: the render's leaf base and top lines, hinged at the post's outer foot.
        var lb=621-(621-533)/(436-262)*(c-HINGE),lt=172-(172-96)/(421-285)*(c-285),tb=base(HINGE)-.74*(c-HINGE),sl=LEAF/(lb-lt);
        o.drawImage(flat,u,0,1,H,u,tb-lb*sl,1,H*sl);
      }
    }
    exitDoorSource.canvas=out;exitDoorSource.img=img;return out;
  }
  // A Ludo brass stanchion, its base on the post's foot and its knob at the rope's height.
  function drawStanchion(x,z){
    var name=shellSprite('shell.queue.post');if(!name)return false;
    var img=spriteImage(name),base=project(x,.05,z),top=project(x,1.02,z),foot=project(x,-.06,z),h=foot.y-top.y,w=h*img.naturalWidth/img.naturalHeight;
    ellipse(base.x-unit*.12,base.y+unit*.04,unit*.2,unit*.06,'#14201824');ctx.drawImage(img,foot.x-w*.62,top.y,w,h);return true;
  }
  // The queue pens' rope runs, [x1, z1, x2, z2] each, shared by the 2D map and the 3D one.
  function queuePens(){
    var mid=function(a,b){return (a+b)/2},solid=function(q){return Math.hypot(q[2]-q[0],q[3]-q[1])>.05};
    // Pickup pen: an outer rope round the rows of queueRoute(true), open at the top where the head steps up to the
    // counter and at the bottom-left where the tail comes in, and dividers leaving turning pockets at alternate ends.
    // Long runs get a post every couple of units so the rope never sags across the whole floor.
    var P=pickupPen(),r=P.rows,n=r.length,pl=P.left-.6,pr=P.right+.6,head=PICKUP_X-.6;
    var pickup=[[head,r[0]-.6,head,mid(r[0],r[1])],[PICKUP_X+.6,r[0]-.6,pr,r[0]-.6],[pr,r[0]-.6,pr,r[n-1]+.6],[pr,r[n-1]+.6,pl,r[n-1]+.6],[pl,mid(r[0],r[1]),pl,mid(r[n-2],r[n-1])],
      [pl,mid(r[0],r[1]),head,mid(r[0],r[1])],[head,mid(r[0],r[1]),P.right-.6,mid(r[0],r[1])]];
    for(var i=1;i<n-1;i++)pickup.push(i%2?[pr,mid(r[i],r[i+1]),P.left+.6,mid(r[i],r[i+1])]:[pl,mid(r[i],r[i+1]),P.right-.6,mid(r[i],r[i+1])]);
    var split=[];pickup.filter(solid).forEach(function(q){var k=Math.max(1,Math.round(Math.hypot(q[2]-q[0],q[3]-q[1])/2.4));for(var j=0;j<k;j++)split.push([q[0]+(q[2]-q[0])*j/k,q[1]+(q[3]-q[1])*j/k,q[0]+(q[2]-q[0])*(j+1)/k,q[1]+(q[3]-q[1])*(j+1)/k])});
    // Order pen: its rows open at the top so the gate's customers walk straight on to any counter, and open at the
    // bottom-left where the tail comes in from the door. Dividers sit between the rows of queueRoute(false), each
    // leaving a pocket at the end the line turns through (right, left, right).
    var O=orderPen(),right=O.right+.65,left=O.left-.65,rows=O.rows,m=rows.length,top=(ORDER_QUEUE_GATE.z+rows[0])/2;
    var order=[[left,top,O.right-.6,top],[right,6.4,right,rows[m-1]]];
    for(var o=0;o<m-1;o++)order.push(o%2?[left,mid(rows[o],rows[o+1]),O.right-.6,mid(rows[o],rows[o+1])]:[right,mid(rows[o],rows[o+1]),O.left+.6,mid(rows[o],rows[o+1])]);
    if(m>1)order.push([left,top,left,mid(rows[m-2],rows[m-1])]);
    return[split,order];
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
  var LOUNGE_TILE=1.15;
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
  // Sprite shop: the ChatGPT render of the arched merch cabinet, standing against the lounge's right wall. Its glazed
  // face's bottom corners (measured on the sprite) are pinned to the floor at x 9.27, z -4.8 and -6.84: the render's
  // side runs about 0.84 deep behind that face on a 33° base slope (a shade steeper than the floor's 30°), and 9.27 is
  // where that lands its back foot on the wall's base line at x 8.41. At 9.03 the back foot hung 0.3 inside the wall,
  // which the eye read as the cabinet floating (Kevin, 2026-10-16: "bring down the cabinet").
   // the render's silhouette, a hair inside its edge
  function depthOf(pos){return rotate(pos.x,pos.z).z}
  // The shop-play prompt follows the customer it is asking about, and hides when they are off screen.
  function positionShopPlay(){
    if(shopPlayUI){var asking=moment&&customers.find(function(c){return c.id===moment.customerId&&!c.ordered}),point=asking?project(asking.renderX===undefined?asking.x:asking.renderX,2.8,asking.renderZ===undefined?asking.z:asking.renderZ):null;shopPlayUI.position(point,!!point&&point.x>24&&point.x<width-24&&point.y>90&&point.y<visibleHeight())}
  }
  function drawParticles(frameDelta){
    for(var i=particles.length-1;i>=0;i--){var p=particles[i];p.life-=frameDelta*1.5;if(!motionPreference.matches){p.x+=p.vx*frameDelta;p.z+=p.vz*frameDelta;p.y+=p.vy*frameDelta;}p.vy-=frameDelta*5;var screen=project(p.x,p.y,p.z),size=Math.max(2,unit*.1);ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.color;ctx.fillRect(screen.x-size/2,screen.y-size/2,size,size);ctx.globalAlpha=1;if(p.life<=0)particles.splice(i,1)}
  }
  // The 3D map's frame: the scene goes to the WebGL canvas, and the 2D canvas, cleared to transparent, keeps
  // what is drawn over the map in screen space. Taps, tags and badges use project(), which the 3D camera matches.
  var STATION_BOXES=[{w:2.6,d:1.5,h:1.5},{w:3.2,d:1.6,h:1.7},{w:2.8,d:1.5,h:1.5},{w:2.6,d:1.5,h:1.5},{w:2.2,d:1.1,h:1.25},{w:2.4,d:1.2,h:1.25},{w:.8,d:1.3,h:1.1}];
  var PERSON_COLOURS=['#d97b5f','#5f8fc9','#e0b75a','#8a6fb5','#6aa36a','#c95f86','#4fa3a0','#d48c3a'];
  // Records the images one 2D figure draws (with every transform it applies) and turns each into four world points: a
  // flat card standing upright at the figure's feet, spanning screen-right and up, so the 3D camera shows it exactly
  // where the 2D map would while counters in front of it still hide it. Nothing else the figure draws is kept.
  var figureRecorder=(function(){
    var m=[1,0,0,1,0,0],stack=[],alpha=1,out=null,anchor=null,noop=function(){},gradient={addColorStop:noop};
    function mul(a,b,c,d,e,f){m=[m[0]*a+m[2]*b,m[1]*a+m[3]*b,m[0]*c+m[2]*d,m[1]*c+m[3]*d,m[0]*e+m[2]*f+m[4],m[1]*e+m[3]*f+m[5]]}
    var api={
      save:function(){stack.push([m,alpha])},restore:function(){var t=stack.pop();if(t){m=t[0];alpha=t[1]}},
      translate:function(x,y){mul(1,0,0,1,x,y)},scale:function(x,y){mul(x,0,0,y,0,0)},rotate:function(a){var c=Math.cos(a),s=Math.sin(a);mul(c,s,-s,c,0,0)},
      transform:mul,setTransform:function(a,b,c,d,e,f){m=typeof a==='object'?[a.a,a.b,a.c,a.d,a.e,a.f]:[a,b,c,d,e,f]},resetTransform:function(){m=[1,0,0,1,0,0]},
      createLinearGradient:function(){return gradient},createRadialGradient:function(){return gradient},createPattern:function(){return null},measureText:function(){return{width:0}},
      drawImage:function(img){
        var iw=img.naturalWidth||img.width,ih=img.naturalHeight||img.height,a=arguments,sx=0,sy=0,sw=iw,sh=ih,dx,dy,dw=iw,dh=ih;
        if(!iw||!ih)return;
        if(a.length>=9){sx=a[1];sy=a[2];sw=a[3];sh=a[4];dx=a[5];dy=a[6];dw=a[7];dh=a[8]}else{dx=a[1];dy=a[2];if(a.length>=5){dw=a[3];dh=a[4]}}
        var foot=project(anchor.x,0,anchor.z),k=Math.SQRT1_2/unit,pts=[];
        [[dx,dy+dh],[dx+dw,dy+dh],[dx+dw,dy],[dx,dy]].forEach(function(q){
          var X=m[0]*q[0]+m[2]*q[1]+m[4]-foot.x,Y=m[1]*q[0]+m[3]*q[1]+m[5]-foot.y;
          pts.push(anchor.x+X*k,anchor.y-Y/unit,anchor.z-X*k);
        });
        out.push({img:img,uv:[sx/iw,1-(sy+sh)/ih,(sx+sw)/iw,1-sy/ih],points:pts,alpha:alpha});
      }
    };
    var proxy=new Proxy(api,{get:function(t,k){if(k==='globalAlpha')return alpha;if(k in t)return t[k];return noop},set:function(t,k,v){if(k==='globalAlpha')alpha=v;return true}});
    return{begin:function(list,a){out=list;anchor=a;m=[1,0,0,1,0,0];stack.length=0;alpha=1;return proxy}};
  })();
  function capturePerson(list,x,y,z,draw){
    var savedCtx=ctx,savedElevation=sceneElevation;
    ctx=figureRecorder.begin(list,{x:x,y:y,z:z});sceneElevation=y;
    try{draw()}catch(e){}finally{ctx=savedCtx;sceneElevation=savedElevation}
  }
  function drawActiveBranch(api,now){
    var i=state.empire.activeStore-1,store=state.empire.stores[i];
    drawBranchMap(api,i,store.level,motionPreference.matches?0:now,store.projects,{lighting:visualLight(),store:store,contract:activeContract(state.empire),rewards:state.empire.rewards,network:state.empire.network,neighborhood:neighborhood(state.empire,i)});
  }
  // The point at the middle of the screen on the ground, which the 3D sun's shadow box follows.
  function viewCentre(){var u=unit,c=Math.cos(angle),s=Math.sin(angle),rx=(width/2-centerX)/u,rz=(height/2-centerY)/(u*FLOOR_SQUASH);return{x:rx*c+rz*s,z:rz*c-rx*s}}
  // A branch in 3D: its own 2D drawing runs at a fixed scale with the primitives recording world shapes (branchRec)
  // and a context that paints nothing; screen-space ellipses and polygons are traced back to the world points they
  // were projected from, and people are recorded as figures like the main map's.
  // Its gradients keep their stops, so a gradient-filled shape (Riverside's water) records in its middle colour.
  var silentCtx=(function(){var noop=function(){},canvasStub={width:1,height:1},gradient=function(){return{stops:[],addColorStop:function(o,c){this.stops.push(c)}}};
    return new Proxy({},{get:function(t,k){if(k==='createLinearGradient'||k==='createRadialGradient'||k==='createConicGradient')return gradient;if(k==='measureText')return function(){return{width:0}};if(k==='canvas')return canvasStub;if(k==='getTransform')return function(){return{a:1,b:0,c:0,d:1,e:0,f:0}};return noop},set:function(){return true}})})();
  // A gradient records as the average of its stops.
  function gradientColour(fill){
    if(!fill||!fill.stops)return fill;var r=0,g=0,b=0,a=0,n=fill.stops.length;if(!n)return null;
    fill.stops.forEach(function(c){var h=c.charAt(0)==='#'?c.slice(1):'';if(h.length===3||h.length===4)h=h.split('').map(function(d){return d+d}).join('');
      r+=parseInt(h.slice(0,2),16)||0;g+=parseInt(h.slice(2,4),16)||0;b+=parseInt(h.slice(4,6),16)||0;a+=h.length===8?parseInt(h.slice(6,8),16):255});
    function hex(v){return Math.round(v/n).toString(16).padStart(2,'0')}
    return '#'+hex(r)+hex(g)+hex(b)+hex(a);
  }
  function recordBranch(figures){
    var U=32,saved=[unit,centerX,centerY,ctx,sceneElevation],seen=new Map(),out={unit:U,boxes:[],lines:[],polys:[],ellipses:[],faces:[],fixtures:[],props:[]};
    function key(x,y){return Math.round(x*8)+','+Math.round(y*8)}
    branchRec={
      seen:function(q,x,y,z){seen.set(key(q.x,q.y),[x,y,z])},
      box:function(x,z,y,w,d,h,palette,lit){out.boxes.push({x:x,y:y,z:z,w:w,d:d,h:h,c:palette?palette[0]:colors.oliveTop,lit:lit})},
      line:function(points,colour,weight,elevation,lit){out.lines.push({pts:points.map(function(q){return[q[0],q[1]+elevation,q[2]]}),c:colour,w:weight,lit:lit})},
      poly:function(points,fill,lit){fill=gradientColour(fill);if(typeof fill!=='string')return;var pts=[];for(var i=0;i<points.length;i++){var w=seen.get(key(points[i].x,points[i].y));if(!w)return;pts.push(w)}out.polys.push({pts:pts,c:fill,lit:lit})},
      ellipse:function(x,y,rx,ry,fill,lit){fill=gradientColour(fill);if(typeof fill!=='string')return;var at=seen.get(key(x,y));if(at)out.ellipses.push({at:at,rx:rx/U,ry:ry/U,c:fill,lit:lit})}
    };
    // A potted plant as solids: the 2D one is leaves painted in screen space, which would record as flat discs.
    function plant3d(x,z,y,size,strain){
      y+=sceneElevation;size=size||1;out.boxes.push({x:x,y:y,z:z,w:.46,d:.46,h:.38,c:'#b67d59'});
      var tones=strain===undefined?['#357c50','#4e9a57','#80b567']:[['#488857','#6baa64'],['#668b4a','#9cab61'],['#456f62','#7d9273'],['#386b62','#659b87']][strain].concat(['#a4cf71']);
      out.lines.push({pts:[[x,y+.38,z],[x,y+.5+size,z]],c:'#86b96b',w:.045});
      for(var layer=0;layer<3;layer++){var r=size*(.46-layer*.11);out.ellipses.push({at:[x,y+.5+size*(.2+layer*.32),z],rx:r,ry:r*.8,c:tones[layer]})}
    }
    unit=U;centerX=0;centerY=0;ctx=silentCtx;sceneElevation=0;
    try{
      drawActiveBranch({realDepth:true,ctx:silentCtx,width:width,height:height,unit:U,project:project,box:drawBox,line:worldLine,poly:poly,ellipse:ellipse,blob:blobEllipse,leaf:leafShape,noise:seedNoise,lit:lit,plant:plant3d,jar:jar,carton:carton,depth:depthOf,
        person:function(x,z){var args=arguments,rec=branchRec;branchRec=null;capturePerson(figures,x,0,z,function(){drawPerson.apply(null,args)});branchRec=rec},
        face:function(x,y,z,alongZ,draw){out.faces.push({x:x,y:y,z:z,alongZ:alongZ,draw:draw})},
        night:function(fixtures){out.fixtures=fixtures},
        // A Blender prop in place of the 2D drawing, once its model has loaded (until then the drawing stands in).
        model:function(file,x,z,y,rot,scale){if(!map3d.propReady(file))return false;out.props.push({file:file,x:x,y:(y||0)+sceneElevation,z:z,rot:rot||0,scale:scale});return true}},sceneTime);
    }finally{branchRec=null;unit=saved[0];centerX=saved[1];centerY=saved[2];ctx=saved[3];sceneElevation=saved[4]}
    return out;
  }
  function renderBranch3d(now,frameDelta){
    var nightT=nightAmount();render.nightT=nightT;
    var figures=[],scene=recordBranch(figures);
    map3d.renderBranch({dry:render.dry,width:width,height:height,dpr:dpr,centerX:centerX,centerY:centerY,unit:unit,night:nightT,lookAt:viewCentre(),background:BRANCH_THEMES[state.empire.activeStore-1].background,land:BRANCH_THEMES[state.empire.activeStore-1].land,landKey:state.empire.activeStore,branch:scene,figures:figures.filter(function(f){return f.alpha>.99})});
    ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,canvas.width,canvas.height);ctx.setTransform(dpr,0,0,dpr,0,0);
    // Main-store effects expire while visiting a branch rather than replaying on return.
    particles.forEach(function(p){p.life-=frameDelta*1.5});particles=particles.filter(function(p){return p.life>0});deliveryDrones.forEach(function(d){d.age+=frameDelta});deliveryDrones=deliveryDrones.filter(function(d){return d.age<d.delay+DRONE_LIFE});
    if(shopPlayUI)shopPlayUI.position(null,false);
    updateBranchMarker();updateSpenderTag(true);requestAnimationFrame(render);
  }
  function renderFrame3d(now,frameDelta,wallDelta){
    var nightT=nightAmount();render.nightT=nightT;
    tierFlashes.forEach(function(life,i){if(life>0)tierFlashes[i]=Math.max(0,life-frameDelta*.65)});
    var speed=state.lines.some(function(n){return n>0})?Math.min(.07,.02+production()*.00002):0;
    crateTime=(crateTime+frameDelta*speed*1.4)%1;cargoOdo=(cargoOdo+frameDelta*speed*14)%1e5;
    var stations=[],people=[];
    function station(i,x,y,z,level,built,size){var tier=built?stationLookFor(i,level):0,b=STATION_BOXES[size];stations.push({index:i,x:x,y:y,z:z,w:b.w,d:b.d,h:b.h*(1+(Math.min(5,tier)-1)*.12),tier:tier,built:built,rise:buildRise[i]||0,pop:stationPop(i),selected:mapPicked&&selected===i&&!securitySelected&&!loungeSelected,clock:motionPreference.matches?6.3:motionClocks[i],act:taskActivity[i],boost:i<ABILITIES.length&&state.abilities.active[i]>0?state.abilities.active[i]/ABILITY_SECONDS:0})}
    // People are the 2D map's own sprites, recorded as each would be drawn and stood up in the scene as flat figures
    // (capturePerson); a capsule under each casts its shadow.
    var figures=[];
    function person(x,y,z,colour,draw){people.push({x:x,y:y,z:z,colour:colour});capturePerson(figures,x,y,z,draw)}
    for(var i=0;i<6;i++){
      var p=machinePos[i];
      if(i===4)orderCounterPositions(state.orderCounters).forEach(function(q,index){
        var active=customers.some(function(c){return c.orderCounter===index&&atOrderCounter(c,state.orderCounters)&&c.serviceElapsed>0});
        station(4,q.x,0,q.z,state.lines[4],state.lines[4]>0,4);stations[stations.length-1].act=active?1:0;
        if(state.lines[4]>0)person(q.x-.35,0,q.z-1.5,'#2f6b52',function(){drawPerson(q.x-.35,q.z-1.5,now,4,false,true,false,{amount:0,phase:0,facing:.3,identity:4+index*23,taskOffset:index*1.7,workActivity:active?1:0})});
      });
      else{
        station(i,p.x,p.y||0,p.z,state.lines[i],state.lines[i]>0,i);
        if(state.lines[i]>0)(function(i,p){var spot=STAFF_SPOTS[i]||{dx:-.95,dz:-1.65},gait=spot.facing?{amount:0,phase:0,facing:spot.facing}:undefined;
          person(p.x+spot.dx,p.y||0,p.z+spot.dz,'#2f6b52',function(){drawPerson(p.x+spot.dx,p.z+spot.dz,now,i,false,true,false,gait)})})(i,p);
      }
    }
    stations.push({index:6,x:ID_DESK.x,y:0,z:ID_DESK.z,w:1.3,d:2.4,h:1.6,tier:state.doorBuilt?stationLookFor(6,state.idStaff):0,built:state.doorBuilt,rise:buildRise[6]||0,pop:stationPop(6),selected:mapPicked&&securitySelected});
    // The doorman stands behind the booth, on the room side, facing the front door across the desk.
    if(state.doorBuilt)person(DOORMAN.x,0,DOORMAN.z,'#2f6b52',function(){drawPerson(DOORMAN.x,DOORMAN.z,now,6,false,true,false,{amount:0,phase:0,facing:1})});
    // The lounge host works the rooftop: behind the bar once there is one, otherwise by the elevator's bridge.
    if(state.lounge>0){var host=state.lounge>=2?{x:3.7,z:-8.75,f:.3}:{x:-5.2,z:-4,f:.3};person(host.x,ROOFTOP.y,host.z,'#2f6b52',function(){drawPerson(host.x,host.z,now,8,false,true,false,{amount:0,phase:0,facing:host.f})})}
    // Guests on the roof hold a spot for their session. A guest riding up or down stands in the elevator's cab, which
    // carries them between the old lounge room and the roof and waits wherever it last stopped.
    var taken={},smokers=[],spots=ROOFTOP_SPOTS.slice(0,loungeSeats(state.lounge)||4),lift=ROOFTOP.lift;
    var smooth=function(t){t=Math.max(0,Math.min(1,t));return t*t*t*(t*(t*6-15)+10)};
    customers.forEach(function(c){if(c.phase==='lounge'&&c.roofSpot!==undefined&&c.roofSpot<spots.length&&!taken[c.roofSpot])taken[c.roofSpot]=c.id;else if(c.phase!=='lounge')c.roofSpot=undefined});
    customers.forEach(function(c){
      if(c.phase!=='lounge'||c.loungeFade>0)return;
      var colour=PERSON_COLOURS[(c.id||0)%PERSON_COLOURS.length];
      // Riding: in their cab. Waiting below: out of sight in the back hallway.
      var inCab=c.lift==='down'||c.lift==='boarding'||c.lift==='exit',sh=inCab?(c.liftShaft||0):(c.shaft||0),shaftZ=(sh?ROOFTOP.lift2.z:lift.z)+.1;
      if(!c.lift||c.lift==='waitUp')return;
      if(c.lift==='up'||c.lift==='down'){var ry=lifts[sh].y*ROOFTOP.y+.12,rx=lift.x+CAB_SLOTS[c.cabSlot||0][0],rz=shaftZ+CAB_SLOTS[c.cabSlot||0][1];person(rx,ry,rz,colour,function(){drawPerson(rx,rz,now,c.id,false,false,false,{amount:0,phase:0,facing:.3})});return}
      // Stepping into the cab (from their place in the bridge queue, or from the hallway below) or out of it below:
      // the cab holds its floor until the last of them is through the door (lounge-lifts.js).
      if(c.lift==='boarding'||c.lift==='exit'){
        var bs=c.cabSlot||0,bx=lift.x+CAB_SLOTS[bs][0],bz=shaftZ+CAB_SLOTS[bs][1],door={x:lift.x+lift.w/2+.35,z:shaftZ},by=lifts[sh].y*ROOFTOP.y;
        var bt=smooth(c.lift==='boarding'?c.boardT:c.exitT),b0=c.lift==='boarding'?(c.boardFrom||door):{x:bx,z:bz},b1=c.lift==='boarding'?{x:bx,z:bz}:door;
        var bwx=b0.x+(b1.x-b0.x)*bt,bwz=b0.z+(b1.z-b0.z)*bt,bd=Math.hypot(b1.x-b0.x,b1.z-b0.z)||1,bstep=bt>0&&bt<1;
        var bh={x:(b1.x-b0.x)/bd,z:(b1.z-b0.z)/bd},bfy=by+(c.lift==='boarding'?bt:1-bt)*.12;
        person(bwx,bfy,bwz,colour,function(){drawPerson(bwx,bwz,now,c.id,bstep,false,false,{amount:bstep?1:0,phase:bt*bd*5,heading:bh,facing:bh.x-bh.z>0?.3:-.3})});return}
      if(c.roofSpot===undefined||taken[c.roofSpot]!==c.id){for(var k=0;k<spots.length;k++)if(taken[k]===undefined){c.roofSpot=k;taken[k]=c.id;break}}
      var spot=spots[c.roofSpot];if(!spot||taken[c.roofSpot]!==c.id)return;
      // Out of the cab, across the bridge and on to their spot; back to the landing a step from the cab door to wait.
      var back=c.lift!=='roof',s=c.lift==='roof'?smooth(c.roofWalk):c.lift==='back'?1-smooth(c.walkBack):0;
      if(s>=1){smokers.push({x:spot[0],z:spot[1],id:c.id,facing:spot[2]});person(spot[0],ROOFTOP.y,spot[1],colour,function(){drawPerson(spot[0],spot[1],now,c.id,false,false,false,{amount:0,phase:0,facing:spot[2]})});return}
      // Riders step out one after another from where they stood in the cab (each a beat behind the one before).
      var slot=c.cabSlot||0,cx0=lift.x+CAB_SLOTS[slot][0],cz0=shaftZ+CAB_SLOTS[slot][1];
      var path=[{x:cx0,z:cz0},{x:ROOFTOP.x0+.5,z:shaftZ},{x:spot[0],z:spot[1]}],lens=[],total=0;
      for(var p=1;p<path.length;p++){lens.push(Math.hypot(path[p].x-path[p-1].x,path[p].z-path[p-1].z));total+=lens[p-1]}
      // Guests waiting for the cab down queue back along the bridge, first come nearest the door.
      // A guest still walking back heads for the end of that queue; places close up smoothly when the cab takes someone.
      var landing=back?1:0;if(back)customers.forEach(function(q){if(q!==c&&q.phase==='lounge'&&q.lift==='waitDown'&&(q.shaft||0)===(c.shaft||0)&&(c.lift==='back'||q.liftAsk<c.liftAsk))landing+=.5});
      if(back&&c.landing!==undefined)landing=c.landing+(landing-c.landing)*.12;
      var shuffling=back&&c.landing!==undefined&&Math.abs(landing-c.landing)>.004;c.landing=back?landing:undefined;
      var along=Math.min(total,landing+s*(total-landing)),seg=0;while(seg<lens.length-1&&along>lens[seg]){along-=lens[seg];seg++}
      var a0=path[seg],a1=path[seg+1],f=lens[seg]?Math.min(1,along/lens[seg]):1,wx=a0.x+(a1.x-a0.x)*f,wz=a0.z+(a1.z-a0.z)*f;
      var hx=(a1.x-a0.x)/(lens[seg]||1),hz=(a1.z-a0.z)/(lens[seg]||1);if(back){hx=-hx;hz=-hz}
      var moving=c.lift==='roof'?s>0&&s<1:c.lift==='back'||shuffling;
      if(back){c.queueX=wx;c.queueZ=wz}
      person(wx,ROOFTOP.y,wz,colour,function(){drawPerson(wx,wz,now,c.id,moving,false,false,{amount:moving?1:0,phase:along*5,heading:{x:hx,z:hz},facing:hx-hz>0?.3:-.3})});
    });
    liftY=lifts[0].y*ROOFTOP.y;liftY2=lifts[1].y*ROOFTOP.y;loungeSmokers=smokers;
    customers.forEach(function(c){
      stepCustomerVisual(c,frameDelta);
      if(c.phase==='lounge'&&!(c.loungeFade>0))return;
      person(c.renderX,0,c.renderZ,PERSON_COLOURS[(c.id||0)%PERSON_COLOURS.length],function(){drawPerson(c.renderX,c.renderZ,now,c.id,c.walking,false,c.bag,{phase:c.walkPhase||0,heading:c.walkHeading,amount:c.walkAmount||0,facing:c.facing===undefined?.3:c.facing,lean:c.turnLean||0,pickupAge:c.effectAge})});
    });
    var streetApi=sunnyApi(now);
    walkerPlacements(now).forEach(function(w){person(w.x,w.y===undefined?-.012:w.y,w.z,PERSON_COLOURS[(w.g*3+1)%PERSON_COLOURS.length],function(){drawWalker(streetApi,w)})});
    // The pickup window's clerk inside it, and its walk-ups (cast after the shop's own customers).
    if(windowOpen()){
      person(WINDOW_CLERK.x,0,WINDOW_CLERK.z,'#2f6b52',function(){drawPerson(WINDOW_CLERK.x,WINDOW_CLERK.z,now,5,false,true,false,{amount:0,phase:0,facing:-1,workActivity:windowServing?1:0})});
      windowFigures(windowLine,SUBWAY_HIDDEN_Z).forEach(function(w){var who=500+w.id;person(w.x,w.y,w.z,PERSON_COLOURS[who%PERSON_COLOURS.length],function(){drawPerson(w.x,w.z,now,who,w.moving,false,w.bag,{identity:who,phase:w.walked*5,heading:w.heading,amount:w.moving?1:0,facing:w.facing})})});
    }
    // The street's trees, lamps and props are its own renders too, stood up at their footprints' centres, and so are
    // the cars until their Blender models load; the terraces stay solid. The 3D trees and lamps underneath only cast shadows.
    // A prop with a loaded Blender model is drawn as that instead of its card.
    var backdrops=[],props=[],carModels=map3d.carsModelled();
    streetItems(streetApi).forEach(function(j){if(j.model){props.push(j.model);if(map3d.propReady(j.model.file))return}if(j.kind!=='walker'&&!(j.kind==='car'&&carModels))capturePerson(j.kind==='building'?backdrops:figures,(j.x0+j.x1)/2,0,(j.z0+j.z1)/2,j.draw)});
    // The queue pens and the lounge's line: each post is the 2D map's stanchion, and the ropes sag between them as 3D
    // cords; the display case is its render until its Blender model loads.
    var ropes=[];
    if(SHOP_SPRITES){
      var posts={};
      var rail=function(x1,z1,x2,z2,colour){
        var pts=[];for(var k=0;k<=10;k++){var t=k/10;pts.push([x1+(x2-x1)*t,.84-.62*t*(1-t),z1+(z2-z1)*t])}
        ropes.push({points:pts,colour:colour});posts[x1.toFixed(3)+','+z1.toFixed(3)]=[x1,z1];posts[x2.toFixed(3)+','+z2.toFixed(3)]=[x2,z2];
      };
      queuePens().forEach(function(pen){pen.forEach(function(r){rail(r[0],r[1],r[2],r[3],'#2f6b45')})});
      if(state.lounge>0){var ropeX=LOUNGE_DOOR.x+.72,rf=LOUNGE_FRONT;rail(ropeX,rf+.3,ropeX,rf+1.4,'#6b1f35');rail(ropeX,rf+1.4,ropeX,rf+2.5,'#6b1f35')}
      var postModel=map3d.propReady('street_queue_post.glb');
      Object.keys(posts).forEach(function(key){var q=posts[key];if(postModel)props.push({file:'street_queue_post.glb',x:q[0],y:0,z:q[1]});else capturePerson(figures,q[0],0,q[1],function(){drawStanchion(q[0],q[1])})});
      frontFixtures().forEach(function(f){if(map3d.propReady(f.file))props.push({file:f.file,x:f.x,y:0,z:f.z,rot:f.rot})});
      // The self-order kiosks along the storefront glass are their render, stood up at each kiosk's footprint.
      if(state.kiosk&&fixtureSprite('shop.kiosk'))for(var k=0;k<kioskCount();k++)if(!map3d.hasFixture('kiosk'+k))(function(kz){capturePerson(figures,-9.75,0,kz,function(){drawBoxSprite(streetApi,fixtureSprite('shop.kiosk'),-10.04,-9.46,kz-.4,kz+.4,0,1.8,true)})})(6.8-k*1.8);
    }
    // The 2D map fades figures behind the building and lays haze over distant renders as see-through copies; in 3D
    // depth and the scene's haze do both, so only the solid draws are kept.
    figures=figures.filter(function(f){return f.alpha>.99});backdrops=backdrops.filter(function(f){return f.alpha>.99});
    var dronePoses=deliveryDronePoses(frameDelta);deliveryCards(dronePoses,figures);
    var look=viewCentre();
    map3d.render({dry:render.dry,width:width,height:height,dpr:dpr,centerX:centerX,centerY:centerY,unit:unit,night:nightT,lookAt:look,stations:stations,people:people,figures:figures,backdrops:backdrops,ropes:ropes,props:props,cars:carPlacements(now),time:sceneTime,loungeOpen:state.lounge>0,loungeTier:state.lounge,loungeBuild:isBuilding(state.builds,'lounge')?1-buildShareLeft(state.builds,'lounge'):null,liftY:liftY,liftY2:liftY2,loungeSmokers:loungeSmokers,loungeLift:state.loungeLift,loungeCurtain:loungeCurtain,loungeExitCurtain:loungeExitCurtain,menuLines:flapLines(),fixtureBuild:isBuilding(state.builds,'deck')||isBuilding(state.builds,'window')?Object.assign(isBuilding(state.builds,'deck')?{deck:1-buildShareLeft(state.builds,'deck')}:{},isBuilding(state.builds,'window')?{pickupWindow:1-buildShareLeft(state.builds,'window')}:{}):null,fixtures:{deck:deliveryBuilt(),pickupWindow:windowOpen(),storefront:true,storefrontDoor:true,displayCase:true,kiosk0:kioskCount()>0,kiosk1:kioskCount()>1,kiosk2:kioskCount()>2},menus:kioskMenus(),menuClock:animationTime/1000,cargo:{odo:cargoOdo,running:state.lines.map(function(n){return n>0})}});
    // A model that had not loaded when the tabs were painted: try again every half second until all are in.
    if(picturesPending&&!(now-(renderFrame3d.picturesTried||0)<500)){renderFrame3d.picturesTried=now;picturesPending=false;paintThumbnails()}
    ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,canvas.width,canvas.height);ctx.setTransform(dpr,0,0,dpr,0,0);
    customers.forEach(function(c){if(c.phase!=='lounge'&&customerBadged(c))drawCustomerBadge(Object.assign({},c,{x:c.renderX,z:c.renderZ}))});
    drawDeliveryExtras(dronePoses,now);drawParticles(frameDelta);drawTickets(frameDelta);drawConfetti(wallDelta);
    positionShopPlay();
    updateMarkers();updateSpenderTag(false);requestAnimationFrame(render);
  }
  // Eases a customer's drawn position toward the simulation's and updates their stride, facing and service progress.
  function stepCustomerVisual(c,frameDelta){
    var blend=1-Math.exp(-frameDelta*20),oldX=c.renderX===undefined?c.x:c.renderX,oldZ=c.renderZ===undefined?c.z:c.renderZ;
    c.renderX=oldX+(c.x-oldX)*blend;c.renderZ=oldZ+(c.z-oldZ)*blend;
    var dx=c.renderX-oldX,dz=c.renderZ-oldZ,distance=Math.hypot(dx,dz);
    c.walkPhase=(c.walkPhase||0)+distance*5;if(distance>.001)c.walkHeading={x:dx/distance,z:dz/distance};
    var strideTarget=frameDelta>0?Math.min(1,distance/frameDelta/2.2):(c.walkAmount||0);
    c.walkAmount=(c.walkAmount||0)+(strideTarget-(c.walkAmount||0))*(1-Math.exp(-frameDelta*10));
    var previousFacing=c.facing===undefined?.3:c.facing;
    var direction=distance>.001?Math.max(-1,Math.min(1,rotate(dx,dz).x/distance)):(c.facing===undefined?.3:c.facing);
    // At the kiosk head a customer turns to the screen beside them (up-left of where they stand) for as long as they order.
    if(distance<=.001&&c.phase==='kiosk'&&!c.ordered&&c.laneDistance!==null&&c.laneDistance<.05)direction=-1;
    c.facing=(c.facing===undefined?direction:c.facing)+(direction-(c.facing===undefined?direction:c.facing))*(1-Math.exp(-frameDelta*8));
    c.turnLean=(c.turnLean||0)+((c.facing-previousFacing)*1.5-(c.turnLean||0))*(1-Math.exp(-frameDelta*12));
    var serviceIndex=c.ordered?5:4,serviceTarget=c.serviceStation===serviceIndex?Math.min(1,(c.serviceElapsed||0)/economy.customerHandoff(serviceIndex,state.lines[serviceIndex],counterServiceDuration(serviceIndex))):0;
    if(c.visualServiceStation!==serviceIndex){c.serviceVisual=0;c.visualServiceStation=serviceIndex;}c.serviceVisual=(c.serviceVisual||0)+(serviceTarget-(c.serviceVisual||0))*(1-Math.exp(-frameDelta*22));
  }
  // A single failed frame (for example a zero-width canvas while the page is being laid out) must not stop the scene forever.
  // Dev quick capture (?snap, driven by scripts/snap3d.mjs): the frame loop and the clock stand still, and
  // window.__canopySnap draws one frame on demand, so a cloud browser drawing WebGL on the CPU spends its time only on
  // the frame it captures. view: {zoom, x, y, z} centres that map point at that zoom, light 'day' or 'night', advance
  // runs the game that many seconds first, and draw:false sets the frame up (asking for its models) without drawing it.
  // Players never pass ?snap.
  var SNAP=/[?&]snap\b/.test(location.search);
  if(SNAP){
    window.__canopySnap=function(view){view=view||{};
      if(view.light)state.lightMode=view.light;
      for(var step=0;step<Math.round((view.advance||0)*20);step++){simulate(.05);tickTaskClocks(.05)}
      if(view.zoom!==undefined||view.x!==undefined){zoom=Math.max(.65,Math.min(4,view.zoom||1));panX=panY=0;applyCamera();
        if(view.x!==undefined){var frame=cameraFrame(),p=project(view.x,view.y||0,view.z||0);panX=frame.x-p.x;panY=frame.y-p.y;applyCamera()}}
      render.snap=true;render.dry=view.draw===false;render.invalidated=true;render(performance.now());render.snap=render.dry=false;
      return window.__canopySnap.status()};
    window.__canopySnap.status=function(){return{map3d:!!(map3d&&map3d.ok),loading:map3d?map3d.loading:-1}};
  }
  // Dev numbers (?stats): a small readout over the map with the frames drawn a second, the frame's script time, the 3D
  // map's draw calls and triangles and its estimated GPU memory, so a phone shows its own numbers. Players never pass
  // ?stats; window.__canopyStats returns the same numbers to scripts.
  var STATS=/[?&]stats\b/.test(location.search);
  if(STATS||SNAP)window.__canopyStats=function(perModel){return map3d&&map3d.ok?map3d.stats(perModel):null};
  if(STATS){
    var statsBox=document.createElement('div');
    statsBox.style.cssText='position:fixed;left:calc(env(safe-area-inset-left) + 6px);top:calc(env(safe-area-inset-top) + 6px);z-index:9999;pointer-events:none;font:10px/1.3 ui-monospace,Menlo,monospace;color:#fff;background:rgba(0,0,0,.62);padding:4px 7px;border-radius:6px;white-space:pre';
    document.body.appendChild(statsBox);
    var statsFrames=0,statsSince=performance.now();
    setInterval(function(){var now=performance.now(),fps=(render.frames||0)-statsFrames,secs=(now-statsSince)/1000;statsFrames=render.frames||0;statsSince=now;
      var s=window.__canopyStats(),heap=performance.memory?' js '+Math.round(performance.memory.usedJSHeapSize/1048576)+'MB':'';
      statsBox.textContent=Math.round(fps/secs)+' fps '+(render.frameMs||0).toFixed(1)+' ms'+heap+(s?'\n'+s.calls+' draws '+Math.round(s.triangles/1000)+'K tris @'+s.pixelRatio+'x\n~'+Math.round(s.mb.total)+'MB gpu: '+Math.round(s.mb.geometry)+' geo '+Math.round(s.mb.texture)+' tex\n'+Math.round(s.mb.buffer)+' screen '+Math.round(s.mb.shadow)+' shadow '+s.textures+' tex':'')},1000);
  }
  function render(wallNow){if(SNAP&&!render.snap)return;var t0=performance.now();try{renderFrame(wallNow);render.frameMs=(render.frameMs||0)*.9+(performance.now()-t0)*.1;window.__canopyFrameMs=render.frameMs;if(render.frameMs>13&&dprCap>2){dprCap=2;resize()}}catch(e){if(!render.failed)console.error('Canopy frame failed; retrying',e);ctx=screenCtx;sceneElevation=0;render.failed=true;render.invalidated=true;requestAnimationFrame(render)}}
  function renderFrame(wallNow){
    if(document.hidden){render.last=wallNow;requestAnimationFrame(render);return}
    keyboardPan(wallNow);
    var frameInterval=state.gameSpeed===0?250:1000/60;
    if(!render.invalidated&&render.drawnAt!==undefined&&wallNow-render.drawnAt<frameInterval-1){requestAnimationFrame(render);return}
    render.drawnAt=wallNow;render.invalidated=false;render.frames=(render.frames||0)+1;
    var wallDelta=Math.min(.1,Math.max(0,(wallNow-(render.last===undefined?wallNow:render.last))/1000)),frameDelta=wallDelta*state.gameSpeed;
    render.last=wallNow;
    // A freshly built station rises out of its site on wall time, so the reveal plays at the same pace at every game speed.
    if(introAt){if(performance.now()-introAt>2000)introAt=0;render.invalidated=true}
    for(var site=0;site<buildRise.length;site++)if(buildRise[site]>0){buildRise[site]=motionPreference.matches?0:Math.max(0,buildRise[site]-wallDelta*1.7);render.invalidated=true}
    animationTime+=frameDelta*1000;tickTaskClocks(frameDelta);
    for(var slot=0;slot<4;slot++){var phase=(taskClocks[1]/9000+slot*.23)%1;var targetGrowth=state.stock[1]>=storageCapacity()?1:phase>.86?Math.max(0,(1-phase)/.14):Math.min(1,phase/.72);cropGrowth[slot]+=(targetGrowth-cropGrowth[slot])*(1-Math.exp(-frameDelta*4))}var now=animationTime;
    sceneTime=motionPreference.matches?0:now;
    if(!map3d||!map3d.ok){
      // No map yet (the 3D module is loading, or a lost context is being rebuilt): the loading card covers the map.
      ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,canvas.width,canvas.height);ctx.setTransform(dpr,0,0,dpr,0,0);
      requestAnimationFrame(render);return;
    }
    if(!mapDrawn&&(SNAP||mapSettled(wallNow))){mapDrawn=true;mapRebuilds=0;mapSettleStart=0;mapReveal()}
    if(state.empire.activeStore)renderBranch3d(now,frameDelta);else renderFrame3d(now,frameDelta,wallDelta);
  }
  // A courier's round trip, in seconds from its own start. Couriers are based behind the rooftop elevator tower: one
  // slips out from behind it empty, settles over its parcel, takes it on board at DRONE_PICKUP, climbs and heads back
  // behind the tower, then comes out again empty and sets down on the pad. The drone and parcel renders stand in the
  // 3D scene as cards, so the tower hides a courier behind it; rotors and lights go on the overlay near the pad only.
  function deliveryDronePoses(dt){
    var pad=launchPad(),still=motionPreference.matches,poses=[];
    var smooth=function(v){v=Math.max(0,Math.min(1,v));return v*v*(3-2*v)};
    // A point straight behind the elevator tower on screen, s units further back.
    var towerX=ROOFTOP.lift.x,towerZ=(ROOFTOP.lift.z+ROOFTOP.lift2.z)/2,behind=function(s,y){return {x:towerX-s,y:y,z:towerZ-s}};
    // Couriers from the odd spots leave the other way: straight out to the left on screen (-x and +z by the same
    // amount keeps their depth), over the street and away.
    var away=function(s,y){return {x:pad.x-s,y:y,z:pad.z+s}};
    var glide=function(from,to,u,arc){var e=smooth(u);return {x:from.x+(to.x-from.x)*e,y:from.y+(to.y-from.y)*e+arc*Math.sin(Math.PI*e),z:from.z+(to.z-from.z)*e}};
    for(var i=deliveryDrones.length-1;i>=0;i--){
      var drone=deliveryDrones[i];drone.age+=dt;var t=drone.age-drone.delay;
      if(t>(still?3.5:DRONE_LIFE)){deliveryDrones.splice(i,1);continue}
      var spot=DRONE_SPOTS[drone.spot||0],slot=drone.slot||0,bx=pad.x+spot[0],bz=pad.z+spot[1],hover=pad.y+.95;
      // The packed parcel drops on to its spot and waits there until its courier takes it.
      if(drone.age>=drone.boxAt&&t<DRONE_PICKUP){
        var drop=still?1:Math.min(1,(drone.age-drone.boxAt)/.35);poses.push({parcel:true,x:bx,y:pad.y+.5*(1-drop)*(1-drop),z:bz});
      }
      if(t<0)continue;
      var at={x:bx,y:hover,z:bz},alpha=1,loaded=t>=DRONE_PICKUP,top={x:bx,y:hover+2.4,z:bz};
      if(still){alpha=Math.min(1,t/.25,(3.5-t)/.5)}
      else if(t<2){at=glide(behind(3,9.6+slot*.3),{x:bx,y:hover,z:bz},t/2,.6);alpha=Math.min(1,t/.6)}
      else if(t<2.6){at.y=hover-.1*Math.sin(Math.PI*(t-2)/.6)}
      else if(t<3.8){at.y=hover+2.4*smooth((t-2.6)/1.2)}
      else if(t<7){at=glide(top,slot%2?away(7,11.4+slot*.3):behind(3.6,11+slot*.3),(t-3.8)/3.2,.8);alpha=Math.min(1,(7-t)/.9)}
      else if(t<7.4)continue;
      else{
        // Home again, empty: out from behind the tower, over its spot, and a short descent to settle on the pad.
        loaded=false;at=t<10?glide(behind(3,10.4+slot*.3),top,(t-7.4)/2.6,.5):{x:bx,y:hover+2.4*(1-smooth((t-10)/.5))-.35*smooth((t-10.2)/.4),z:bz};
        alpha=Math.min(1,(t-7.4)/.7,(DRONE_LIFE-t)/.25);
      }
      if(!still&&(t<2.6||t>=3.8))at.y+=Math.sin(t*2.1+slot*1.9)*.05;
      poses.push({x:at.x,y:at.y,z:at.z,alpha:Math.max(0,alpha),loaded:loaded,orders:loaded?drone.orders:1,slot:slot,near:Math.hypot(at.x-bx,at.z-bz)<2.2});
    }
    return poses;
  }
  function deliveryCards(poses,cards){
    poses.forEach(function(p){
      // Each card stands a touch nearer the camera than its point (which moves nothing on screen) so a courier
      // hovering over its parcel draws in front of it.
      capturePerson(cards,p.x+(p.parcel?0:.15),0,p.z+(p.parcel?0:.15),function(){
        if(p.parcel){if(fixtureSprite('prop.carton'))spriteAt('prop.carton',project(p.x,p.y,p.z),.52,.5,.88);return}
        ctx.globalAlpha=p.alpha;drawCourierDrone(p.x,p.y,p.z,0,p.slot,p.orders,!p.loaded,'body');
      });
    });
  }
  function drawDeliveryExtras(poses,now){
    poses.forEach(function(p){if(p.parcel||!p.near||p.alpha<=0)return;ctx.save();ctx.globalAlpha=p.alpha;drawCourierDrone(p.x,p.y,p.z,now,p.slot,p.orders,!p.loaded,'extras');ctx.restore()});
  }
  // part 'body' draws only the render, 'extras' only what is drawn over it (rotor blur, lights, the ×N tag); neither draws both.
  function drawCourierDrone(x,y,z,now,slot,orders,empty,part){
      var art=empty?'drone.courier.empty':'drone.courier.loaded',droneArt=SHOP_SPRITES&&fixtureSprite(art);
      if(part!=='extras'){if(droneArt)spriteAt(art,project(x,y+.2,z),1.75,.5,.46);else if(!empty)carton(x,z,y-.9,.62)}
      if(part==='body')return;
      if(orders>1){
        var cargoLabel=project(x,y-.55,z+.36);
        ctx.fillStyle='#f5efd7';ctx.font='600 '+Math.max(9,unit*.23)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.fillText('×'+orders,cargoLabel.x,cargoLabel.y);
      }
      if(!droneArt){worldLine([[x-.2,y-.35,z],[x-.2,y-.04,z]],'#d8c89e',.035);worldLine([[x+.2,y-.35,z],[x+.2,y-.04,z]],'#d8c89e',.035)}
      [[-.63,-.45],[.63,-.45],[-.63,.45],[.63,.45]].forEach(function(offset,n){
        var rx=x+offset[0],rz=z+offset[1];
        if(!droneArt)worldLine([[x,y+.12,z],[rx,y+.15,rz]],'#527565',.12);
        var rotor=project(rx,y+(droneArt?.35:.2),rz);
        ellipse(rotor.x,rotor.y,unit*.36,unit*.13,'#cbdacc66');
        var angle=motionPreference.matches?0:now*.055+n;
        ctx.beginPath();ctx.moveTo(rotor.x-Math.cos(angle)*unit*.3,rotor.y-Math.sin(angle)*unit*.1);ctx.lineTo(rotor.x+Math.cos(angle)*unit*.3,rotor.y+Math.sin(angle)*unit*.1);ctx.strokeStyle='#e5e9cf';ctx.lineWidth=Math.max(1,unit*.045);ctx.stroke();
        if(!droneArt)ellipse(rotor.x,rotor.y,unit*.075,unit*.045,'#294c3b');
      });
      if(!droneArt)drawBox(x,z,y,.66,.5,.22,['#e5e8d0','#587766','#91ac98']);
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
  // The big spender's tag follows them through the shop; the rush pill counts down a tapped rush.
  var spenderTag=document.createElement('button');spenderTag.type='button';spenderTag.className='marker spender-tag';spenderTag.id='spenderTag';spenderTag.hidden=true;spenderTag.innerHTML='<span class="spender-badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.8l2.75 5.82 6.35.8-4.67 4.38 1.2 6.3L12 17.02 6.37 20.1l1.2-6.3L2.9 9.42l6.35-.8z"/></svg></span>Big spender';spenderTag.setAttribute('aria-label','Big spender in the shop: tap for a tip or a rush');$('markers').appendChild(spenderTag);
  var rushPeak={rush:0,boost:0},rushPill=document.createElement('div');rushPill.id='rushPill';rushPill.className='rush-pill';rushPill.hidden=true;rushPill.setAttribute('role','status');document.body.appendChild(rushPill);
  var contractPill=document.createElement('div');contractPill.id='contractPill';contractPill.className='contract-pill';contractPill.hidden=true;contractPill.setAttribute('role','status');document.body.appendChild(contractPill);
  function spenderInShop(){for(var i=0;i<customers.length;i++){var c=customers[i];if(c.bigSpender&&!c.tapped&&c.phase!=='leaving'&&c.phase!=='lounge')return c}return null}
  spenderTag.onclick=function(){var c=spenderInShop();if(!c)return;c.tapped=true;spenderTag.hidden=true;recordEvent(state.empire,'spender',1);
    if(c.id%2){state.rushTime=rushLength(state.perks);notify('RUSH · 2× SALES FOR '+state.rushTime+'S','upgrade')}else{var tip=Math.max(50,Math.round(incomeRate()*90));add(tip);notify('BIG SPENDER TIP +'+fmt(tip),'upgrade')}
    telemetry.send('big_spender',{kind:c.id%2?'rush':'tip'});save();renderUI()};
  function updateSpenderTag(branch){var c=branch?null:spenderInShop();spenderTag.hidden=!c;if(c){var pos=project(c.x,2.75,c.z);spenderTag.style.transform='translate3d('+pos.x+'px,'+pos.y+'px,0) translate(-50%,-100%)'}
    var rush=state.rushTime>0,boost=state.empire.contracts.boost>0,parts=[];if(rush)parts.push('Rush · 2× sales · '+Math.ceil(state.rushTime)+'s');if(boost)parts.push('Boost · 2× sales · '+clock(state.empire.contracts.boost*1000/Math.max(1,state.gameSpeed||1)));rushPill.hidden=!parts.length;rushPeak.rush=rush?Math.max(rushPeak.rush,state.rushTime):0;rushPeak.boost=boost?Math.max(rushPeak.boost,state.empire.contracts.boost):0;burstRing(rushPill,Math.min(rush?state.rushTime/rushPeak.rush:1,boost?state.empire.contracts.boost/rushPeak.boost:1)*(parts.length?1:0));var text=parts.join('  ·  ');if(rushPill.textContent!==text)rushPill.textContent=text;
    var c=branch?null:activeContract(state.empire);contractPill.hidden=!c;if(c){var line=c.name+' · '+abbr(c.progress)+' / '+abbr(c.target)+' · '+clock(c.remaining);if(contractPill.textContent!==line)contractPill.textContent=line}}
  var loungeMarker=document.createElement('button');loungeMarker.className='marker';loungeMarker.dataset.marker='lounge';loungeMarker.onclick=selectLounge;$('markers').appendChild(loungeMarker);
  function updateCommerceControls(){
    if($('buyAutoDrone')){var drone=state.autoDrone,dronePrice=drone.owned?BULK_DRONE_COST:AUTO_DRONE_COST,deckBuilding=isBuilding(state.builds,'deck'),deckClock=buildClock(buildLeft(state.builds,'deck'));
      $('buyAutoDrone').disabled=drone.bulk||deckBuilding||state.money<dronePrice||!windowOpen();$('autoDronePrice').textContent=drone.bulk?'Installed':deckBuilding?deckClock:fmt(dronePrice);$('buyAutoDrone').querySelector('span').textContent=drone.owned?'Bulk upgrade':deckBuilding?'Building':'Install';$('autoDroneBenefit').textContent=drone.owned?'Up to 10 ready orders every 10s':'Send a ready order every 10s';
      $('autoDroneToggle').disabled=!drone.owned&&(deckBuilding||state.money<AUTO_DRONE_COST||!windowOpen());$('autoDroneToggle').textContent=!drone.owned?(deckBuilding?'Building · '+deckClock:'Install '+fmt(AUTO_DRONE_COST)):drone.enabled?'On':'Off';if(drone.owned)$('autoDroneToggle').setAttribute('aria-pressed',String(drone.enabled));else $('autoDroneToggle').removeAttribute('aria-pressed');$('autoDroneToggle').setAttribute('aria-label',drone.owned?'Automatic drone dispatch':('Install auto drone for '+fmt(AUTO_DRONE_COST)));
      $('autoDroneBulk').hidden=!drone.owned;$('autoDroneBulk').disabled=!drone.bulk&&state.money<BULK_DRONE_COST;$('autoDroneBulk').textContent=drone.bulk?(drone.mode==='bulk'?'Bulk · up to 10':'Single · 1 order'):'Upgrade to bulk · '+fmt(BULK_DRONE_COST);if(drone.bulk)$('autoDroneBulk').setAttribute('aria-pressed',String(drone.mode==='bulk'));else $('autoDroneBulk').removeAttribute('aria-pressed');$('autoDroneBulk').setAttribute('aria-label',drone.bulk?'Bulk automatic dispatch':('Upgrade auto drone to bulk for '+fmt(BULK_DRONE_COST)));
      $('autoDroneStatus').textContent=!drone.owned?(deckBuilding?'Opens in '+deckClock:'Ships what the window can\'t'):!drone.enabled?'Manual dispatch':state.gameSpeed===0?'Paused':drone.remaining>.05?'Next check in '+Math.ceil(drone.remaining)+'s':state.stock[3]<onlineSize()?'Waiting for '+(onlineSize()-state.stock[3])+' jars':'Ready to launch';}

    if(shopBrowser)shopBrowser.render();
  }
  function updateMarkers(){
    var key=[centerX,centerY,unit,width,height,state.idStaff,state.lines.join(),securitySelected,selected,state.lounge,loungeSelected,mapPicked].join("|");
    if(updateMarkers.key===key)return;updateMarkers.key=key;
    var securityPos=project(ID_DESK.x,.62,ID_DESK.z+.1),loungePos=map3d&&map3d.ok?project(-2.7,ROOFTOP.y+1.2,-6.1):project(LOUNGE_DOOR.x,1.5,DISPLAY_Z+.5),labelSize=Math.max(8,Math.min(10,unit*.24))*(width>=780?.85:1)+'px';
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
  // Head trainer (founder perk): the bottleneck station's crew gains a free level on a fixed game-time beat.
  function tickTrainer(dt){var gap=trainerGap(state.perks);if(!gap)return;state.trainerClock+=dt;if(state.trainerClock<gap)return;state.trainerClock-=gap;
    var i=slowestStation();if(!state.lines[i])return;state.staff[i]++;burst(machinePos[i],'#b6e58c')}
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
    if(i===4&&state.lines[5]&&pickupLineFull())return 'Holding orders · pickup line full';
    if(i===4)return state.stock[4]>=readyCapacity()?'Ready storage full':state.stock[3]<1?'Waiting for packed '+unitWord(2):'Preparing pickup bags';
    var held=customers.filter(function(c){return c.ordered&&!c.bag}).length,heldNote=held>1?' · '+held+' orders held':held===1?' · 1 order held':'';
    if(state.stock[4]<1)return 'Waiting for ready bags'+heldNote;
    return (customers.some(function(c){return c.ordered&&!c.bag&&c.phase==='pickup'&&Math.hypot(c.x-PICKUP_X,c.z-4.9)<.15})?'Serving a customer':'Waiting for a customer at the counter')+heldNote;
  }
  // Stock strip status: which way each stage is moving over the last few seconds, and which one comes from the bottleneck station.
  var STOCK_STATIONS=[[0],[1],[2],[3],[4,5]],stockHistory=[[],[],[],[],[]];
  // Stations work in batches, so a stage saw-tooths; compare the average of the last ten seconds with the ten before.
  function stockTrend(i,n,cap){
    if(n>=cap)return 'full';
    var now=performance.now(),h=stockHistory[i];if(!h.length||now-h[h.length-1].t>=1000)h.push({t:now,n:n});
    while(h.length&&now-h[0].t>20500)h.shift();
    if(h.length<12)return '';
    var half=h.length>>1,mean=function(list){return list.reduce(function(sum,x){return sum+x.n},0)/list.length};
    var d=mean(h.slice(half))-mean(h.slice(0,half)),step=Math.max(2,cap*.02);return d>=step?'up':d<=-step?'down':'';
  }
  function renderUI(periodic){
    if(document.hidden)return;
    renderReopenCard();
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
    var atFloor=slow>=4&&!trafficBound&&economy.customerHandoff(slow,state.lines[slow],counterServiceDuration(slow))<=economy.HANDOFF_FLOOR[slow]&&economy.customerHandoff(slow,state.lines[slow]+1,counterServiceDuration(slow,nextCapacity(slow)))<=economy.HANDOFF_FLOOR[slow];
    // Plain words: which station holds the shop back, then what the upgrade does for it. The % gap lives in the tooltip and meter.
    var speedsUp=['plants seeds faster','grows plants faster','harvests faster','packs faster','takes orders faster','hands out bags faster'];
    $('flowText').textContent=trafficBound?'Not enough customers · the counters could serve '+Math.round((slowRate/footTraffic-1)*100)+'% more':atFloor?shortNames[slow]+' can\'t go faster · bigger baskets help':shortNames[slow]+' is holding the shop back · upgrading it '+speedsUp[slow];
    $('flowText').title=(trafficBound?'Customers arrive at '+footTraffic.toFixed(1)+'/s but the counters can serve '+slowRate.toFixed(1)+'/s. ':shortNames[slow]+' moves '+slowRate.toFixed(1)+'/s; '+nextName+' can do '+(nextRate||0).toFixed(1)+'/s'+(behind>0?' ('+shortNames[slow]+' runs '+behind+'% slower)':'')+', so everything queues here. ')+'Estimates include batches, handoff time and kiosks.';
    // The fix button follows the best-value purchase, which can differ from the slowest station when that station is capped.
    var fix=recommendation(),fixPrice=fix?fix.price:0,canFix=fixPrice>0&&state.money>=fixPrice,fixElsewhere=fix&&!(fix.kind==='station'&&fix.index===slow);
    // At the floor the line above names what the button upgrades, so the button itself stays Upgrade.
    if(atFloor&&fix&&fix.kind==='station')$('flowText').textContent=shortNames[slow]+' can\'t go faster · upgrading '+fix.name+' brings bigger baskets';
    // An undecided research fork only opens its choice in the Shop, so the line says so and the button says Choose, not Upgrade.
    else if(fix&&fix.kind==='fork')$('flowText').textContent=(trafficBound?'Not enough customers':atFloor?shortNames[slow]+' can\'t go faster':shortNames[slow]+' is slow')+' · pick '+fix.name.charAt(0).toLowerCase()+fix.name.slice(1);
    else if(!trafficBound&&!atFloor&&fixElsewhere)$('flowText').textContent=shortNames[slow]+' is holding the shop back · this is the best buy for now';
    flowButton(state.gameSpeed===0?'Resume':fix&&fix.kind==='fork'?'Choose':fixElsewhere&&!(atFloor&&fix.kind==='station')?fix.name:'Upgrade',state.gameSpeed===0?'':fmt(fixPrice));$('flowAction').dataset.mode=state.gameSpeed===0||!canFix?'view':'fix';
    // The meter shows how much of the next station's pace the bottleneck manages (or of the counters' pace, for foot traffic).
    flowMeter(trafficBound?footTraffic/slowRate:nextRate?slowRate/nextRate:1);
    // The brass card only guides the build. Once the shop opens, suggestions come from the map and the Shop instead.
    $('flowAction').parentNode.hidden=state.shopOpen;
    // While the shop is still a building site the guide row counts sites instead of naming a bottleneck.
    if(!state.shopOpen){var raised=(state.doorBuilt?1:0)+state.lines.filter(function(n){return n>0}).length,nextSite=!state.doorBuilt?'Security':raised<7?shortNames[slow]:null;$('flowLabel').textContent='Under construction';$('flowText').textContent=raised+' of 7 sites raised'+(nextSite?' · next: '+nextSite:' · ready to open');$('flowText').title='Tap a site on the map to raise it. Customers arrive once the shop opens.';flowButton(nextSite?'Build '+nextSite:'Open the shop','');flowMeter(raised/7);$('flowAction').dataset.mode='fix'}
    var line=LINES[selected],open=isOpen(selected),level=state.lines[selected],price=cost(selected),affordable=open&&(!level||state.money>=price);
    $('rate').dataset.paused=String(state.gameSpeed===0);$('money').textContent=fmt(state.money);$('rate').textContent=state.gameSpeed===0?'Paused':fmt((state.empire.activeStore?storeRate(state.empire,state.empire.activeStore-1):production()+branchIncome(state.empire))*state.gameSpeed)+'/s';document.querySelector('.stat.output small').textContent=state.empire.activeStore?'BRANCH INCOME':'CAPACITY';
    var paused=state.gameSpeed===0;speedButtons.forEach(function(button){var value=Number(button.getAttribute('data-speed'));button.setAttribute('aria-pressed',String(value===state.gameSpeed||(value===1&&paused)))});
    var glyph=paused?'pause':'play';if(speedOne.getAttribute('data-glyph')!==glyph){speedOne.setAttribute('data-glyph',glyph);speedOne.innerHTML=paused?PAUSE_GLYPH:PLAY_GLYPH}speedOne.setAttribute('aria-label',paused?'Paused. Resume normal speed':'Normal speed. Press again to pause');speedOne.title=paused?'Paused · press to resume':'Normal speed · press again to pause';speedOne.parentElement.setAttribute('data-paused',String(paused));
    // The lounge's picture is the whole rooftop, wider than a station's, and each level is bought outright, so no MAX.
    selectedLine.classList.toggle('is-lounge',loungeSelected);buyActions.classList.toggle('single',loungeSelected);
    if(securitySelected){renderSecuritySelection()}else if(loungeSelected){renderLoungeSelection()}else{
    $('machineNumber').textContent=!open?'BUILD PREVIOUS STAGE':level?'STAGE 0'+(selected+1)+' · '+stationStatus(selected):'STAGE 0'+(selected+1)+' · UNDER CONSTRUCTION';
    $('machineName').textContent=line.name;$('machineLevel').textContent=level;$('machineRate').textContent=!level?'Under construction':selected<4?batchSize(selected).toFixed(1)+' avg / batch · '+([2,3,2,2][selected]/cycleSpeed(selected)).toFixed(1)+'s':capacity(selected).toFixed(1)+'× service';
    var tier=stationTier(selected),next=nextCapacity(selected);
    // Stat strip: a colour-coded status chip, then icon tiles instead of a sentence.
    var statusText=level?stationStatus(selected):'Under construction',statusTone=!level?'wait':/full/i.test(statusText)?'stop':/waiting/i.test(statusText)?'wait':'go',statusWord=!level?'Site':/full/i.test(statusText)?'Full':/waiting/i.test(statusText)?'Waiting':selected<4?'Producing':'Serving',heldMatch=/(\d+) orders? held/.exec(statusText);
    // The status reads as a readout like the stats beside it: the word, then a short reason underneath.
    var statusReason=heldMatch?heldMatch[1]+' held':!level?'not built':statusTone==='stop'?'storage':statusTone==='wait'?statusText.replace(/^Waiting for (packed )?/i,'for ').replace(/ at the counter$/,''):selected<4?'in batches':'at the counter';
    var tierFrom=TIER_LEVELS[tier],tierTo=tier<6?TIER_LEVELS[tier+1]:null,tierPct=tierTo?Math.round((level-tierFrom)/(tierTo-tierFrom)*100):100;
    var ICON_BATCH='<svg viewBox="0 0 24 24"><path d="M4 8h16v11H4zM4 8l3-4h10l3 4M12 4v4"/></svg>',ICON_CLOCK='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>',ICON_TIER='<svg viewBox="0 0 24 24"><path d="M12 3l2.4 5.2 5.6.7-4.1 3.9 1.1 5.7L12 15.8 7 18.5l1.1-5.7L4 8.9l5.6-.7z"/></svg>',ICON_LANES='<svg viewBox="0 0 24 24"><path d="M5 5v14M12 5v14M19 5v14"/></svg>';
    var tiles=!level?'<span class="stat" title="Nothing to measure until the station is built">'+(selected<4?ICON_BATCH:ICON_CLOCK)+'<b>—</b><small>'+(selected<4?'per batch':'per customer')+'</small></span><span class="stat" title="Raise the site to see its output">'+(selected<4?ICON_CLOCK:ICON_LANES)+'<b>—</b><small>'+(selected<4?'per cycle':'counters')+'</small></span>':selected<4?
      '<span class="stat" title="Units finished each time the station completes a batch">'+ICON_BATCH+'<b>'+(selected===3?qtyShort(Math.round(batchSize(selected))):compactCount(batchSize(selected)))+'</b><small>per batch</small></span><span class="stat" title="Time to complete one batch">'+ICON_CLOCK+'<b>'+secondsLabel([2,3,2,2][selected]/cycleSpeed(selected))+'</b><small>per cycle</small></span>':
      '<span class="stat" title="Time to serve one customer">'+ICON_CLOCK+'<b>'+secondsLabel(economy.customerHandoff(selected,level,counterServiceDuration(selected))/Math.max(1,state.gameSpeed))+'</b><small>per customer</small></span><span class="stat" title="Individually staffed counters">'+ICON_LANES+'<b>'+(selected===4?state.orderCounters:1)+'</b><small>'+((selected===4?state.orderCounters:1)===1?'counter':'counters')+'</small></span>';
    var tierTile=tierTo?'<span class="stat tier" title="Output doubles at level '+tierTo+'">'+ICON_TIER+'<b>×2</b><small>at Lv '+tierTo+'</small><i class="tier-bar"><i style="width:'+tierPct+'%"></i></i></span>':'<span class="stat tier">'+ICON_TIER+'<b>Flagship</b><small>top tier</small></span>';
    var statusHtml='<span class="status-chip" data-tone="'+statusTone+'" title="'+statusText.replace(/"/g,'')+'"><i></i><b>'+statusWord+'</b><small>'+statusReason+'</small></span>'+tiles+tierTile;
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
    renderUnlockRoad(level,selected);
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
    securityMarker.classList.add('station-sign');securityMarker.classList.toggle('selected',mapPicked&&securitySelected);securityMarker.classList.toggle('is-site',doorSite);securityMarker.classList.toggle('can-upgrade',!doorSite&&idTrainingQuote(1).levels>0);if(securityMarker.dataset.level!==doorKey){securityMarker.innerHTML='<span class=station-sign-name>Security</span><span class=station-sign-level>'+(doorSite?'Build':'Lv '+state.idStaff)+'</span>';securityMarker.dataset.level=doorKey;updateMarkers.key=null;}securityMarker.style.setProperty('--station-tier',TIER_COLORS[economy.stationLook(state.idStaff)]);securityMarker.setAttribute('aria-label',doorSite?'Security, under construction. Build the door':'Security, level '+state.idStaff+'. Open security station');securityMarker.setAttribute('aria-pressed',String(mapPicked&&securitySelected));
    // While the roof is being built the sign counts down, and its border drains with the time left (--build-left).
    var loungeBuilding=isBuilding(state.builds,'lounge'),loungeClock=buildClock(buildLeft(state.builds,'lounge'));
    var loungeLot=!state.lounge,loungePrice=loungeBuilding?null:loungeUpgradeCost(state.lounge),loungeKey=String(state.lounge)+'|'+(loungePrice!==null&&state.money>=loungePrice)+'|'+(loungeBuilding?loungeClock:'');
    loungeMarker.classList.add('station-sign');loungeMarker.classList.toggle('selected',mapPicked&&loungeSelected);loungeMarker.classList.toggle('is-lot',loungeLot);loungeMarker.classList.toggle('is-building',loungeBuilding);loungeMarker.classList.toggle('can-upgrade',loungePrice!==null&&state.money>=loungePrice);
    if(loungeBuilding)loungeMarker.style.setProperty('--build-left',buildShareLeft(state.builds,'lounge').toFixed(3));else loungeMarker.style.removeProperty('--build-left');
    if(loungeMarker.dataset.level!==loungeKey){loungeMarker.innerHTML='<span class=station-sign-name>Lounge</span><span class=station-sign-level>'+(loungeBuilding?loungeClock:loungeLot?fmt(loungePrice):'Lv '+state.lounge)+'</span>';loungeMarker.dataset.level=loungeKey;updateMarkers.key=null;}
    loungeMarker.style.setProperty('--station-tier',TIER_COLORS[Math.min(3,state.lounge)]);loungeMarker.setAttribute('aria-label',loungeBuilding?'Smoking lounge, being built. Opens in '+loungeClock:loungeLot?'Smoking lounge, under construction. Opens for '+fmt(loungePrice):'Smoking lounge, level '+state.lounge+'. Open lounge station');loungeMarker.setAttribute('aria-pressed',String(mapPicked&&loungeSelected));
    // Once a check is as quick as it gets, training buys nothing, so the single-level button says Maxed too.
    var idPrice=economy.securityCost(state.idStaff),idMax=idTrainingQuote(10000),idMaxed=securityMaxed();
    $('idEmployeeInfo').innerHTML='<span>Lv '+state.idStaff+'</span><span>'+(idMaxed?'fastest':(securityDuration()).toFixed(2)+'s/check')+'</span>';
    $('trainIdChecker').disabled=idMaxed||state.money<idPrice;
    $('trainIdChecker').querySelector('span').textContent=idMaxed?'Maxed':'+'+Math.max(1,Math.round((securityDuration()/securityDuration(state.idStaff+1)-1)*100))+'%';$('trainIdChecker').querySelector('b').textContent=idMaxed?'—':fmt(idPrice);
    $('trainIdCheckerMax').disabled=!idMax.levels;$('trainIdCheckerMax').querySelector('span').textContent=idMax.levels?'+'+idMax.levels+' lv':'Maxed';$('trainIdCheckerMax').querySelector('b').textContent=idMax.levels?fmt(idMax.cost):'—';
    var hostPrice=loungeHostCost(state.loungeStaff),hostMax=loungeHostQuote(10000),hostOpen=state.lounge>0;
    $('loungeEmployeeInfo').innerHTML='<span>Lv '+state.loungeStaff+'</span><span>'+loungeHostSpeed(state.loungeStaff).toFixed(1)+'× take</span>';
    $('trainLoungeStaff').disabled=!hostOpen||state.money<hostPrice;$('trainLoungeStaff').querySelector('span').textContent='+'+Math.round(.3/loungeHostSpeed(state.loungeStaff)*100)+'%';$('trainLoungeStaff').querySelector('b').textContent=fmt(hostPrice);
    $('trainLoungeStaff').title=!hostOpen?'Open the lounge first':state.money<hostPrice?fmt(hostPrice-state.money)+' more needed':'Train lounge host';
    $('trainLoungeStaffMax').disabled=!hostMax.levels;$('trainLoungeStaffMax').querySelector('span').textContent=hostMax.levels?'+'+hostMax.levels+' lv':'Max';$('trainLoungeStaffMax').querySelector('b').textContent=hostMax.levels?fmt(hostMax.cost):'—';
    LINES.forEach(function(line,i){var quote=maxStaffTraining(i),button=$('staffMax'+i);button.disabled=!quote.levels;button.querySelector('span').textContent=quote.levels?'+'+quote.levels+' lv':'Maxed';button.querySelector('b').textContent=quote.levels?fmt(quote.cost):'—';button.setAttribute('aria-label','Train '+line.name+' employee by '+quote.levels+' levels for '+fmt(quote.cost))});
    staffButtons.forEach(function(button,i){button.disabled=!state.lines[i]||state.money<staffCost(i);button.querySelector('b').textContent=fmt(staffCost(i));button.querySelector('span').textContent='+'+Math.round(.3/(1+state.staff[i]*.3)*100)+'%';$('employeeInfo'+i).innerHTML='<span>Lv '+state.staff[i]+'</span><span>'+(1+state.staff[i]*.3).toFixed(1)+'× speed'+'</span>';button.title=state.money<staffCost(i)?fmt(staffCost(i)-state.money)+' more needed':'Train '+shortNames[i]+' employee';button.setAttribute('aria-label','Train '+shortNames[i]+' employee, '+button.querySelector('span').textContent+', '+fmt(staffCost(i)));});renderStationTeam();
    var installedKiosks=kioskCount(),nextKioskPrice=[25000,50000,100000][installedKiosks];
    $('kioskCountLabel').textContent=installedKiosks+' / 3 installed';
    $('buyKiosk').disabled=installedKiosks===3||state.money<nextKioskPrice;
    $('kioskPrice').textContent=installedKiosks===3?'Installed':fmt(nextKioskPrice);
    $('kioskInfo').textContent=installedKiosks===3?'All three kiosks open. Customers choose the shorter line.':installedKiosks===0?'Add self-order service alongside the counter.':'Add kiosk '+(installedKiosks+1)+' to serve more customers at once.';
    $('buyKiosk').querySelector('span').textContent=installedKiosks===3?'Maximum':installedKiosks===0?'Install kiosk':'Add kiosk '+(installedKiosks+1);

    $('queueCapacity').textContent=queueLimit()>=QUEUE_MAX?QUEUE_MAX+' customers · maximum':queueLimit()+' → '+Math.min(QUEUE_MAX,queueLimit()+2)+' customers';$('queueUpgradeInfo').textContent=queueLimit()>=QUEUE_MAX?'All waiting places unlocked.':state.money<queueCost()?fmt(queueCost()-state.money)+' more to expand':'Two extra waiting places';$('queuePrice').textContent=queueLimit()>=QUEUE_MAX?'MAX':fmt(queueCost());$('upgradeQueue').disabled=queueLimit()>=QUEUE_MAX||state.money<queueCost();
    renderOrderExtras();
    $('storageCapacity').textContent=qtyLabel(storageCapacity())+' → '+qtyLabel(storageCapacity()+100)+' per stage';$('storageUsage').textContent=qtyLabel(state.stock[3])+' / '+qtyLabel(storageCapacity())+(state.storageLevel<20&&state.money<storageCost()?' · '+fmt(storageCost()-state.money)+' to expand':' stored');$('storageFill').max=storageCapacity();$('storageFill').value=state.stock[3];$('storagePrice').textContent=state.storageLevel>=20?'MAX':fmt(storageCost());$('upgradeStorage').disabled=state.storageLevel>=20||state.money<storageCost();if(state.storageLevel>=20)$('storageCapacity').textContent=storageCapacity()+' per stage · maximum';
    // One send: everything shippable, or up to ten at a time until the packing bar reaches level 10.
    var maxUnlocked=state.lines[3]>=10,maxBatch=onlineBatch(onlineLimit(maxUnlocked?Infinity:10));
    $('fulfillOnlineMax').disabled=!maxBatch.count;$('onlineMaxLabel').textContent=maxBatch.count?'Send '+maxBatch.count+(maxBatch.count===1?' order':' orders'):'Nothing to send';$('onlineMaxReward').textContent=maxBatch.count?fmt(maxBatch.reward):'';$('onlineMaxInfo').textContent=maxBatch.count?qtyLabel(maxBatch.jars)+(maxUnlocked?'':' · up to 10 per launch until Pack Lv 10'):(onlineRequestsReady()?(onlineLimit(1)?'Needs '+qtyLabel(onlineSize())+' packed':'The window line is full'):'No requests waiting');

    var built=onlineOpen();if(!built&&activeTray==='orders')paintDeliveryPreview();$('deliverySite').style.display=built?'none':'';var padBuilding=isBuilding(state.builds,'window'),padClock=buildClock(buildLeft(state.builds,'window'));$('buildDelivery').disabled=padBuilding||state.money<WINDOW_COST;$('buildDelivery').classList.toggle('is-building',padBuilding);$('buildDelivery').querySelector('span').textContent=padBuilding?'Building pickup window':'Build pickup window';$('buildDelivery').querySelector('b').textContent=padBuilding?padClock:fmt(WINDOW_COST);$('deliveryFunding').value=padBuilding?(1-buildShareLeft(state.builds,'window'))*100:Math.min(100,state.money/WINDOW_COST*100);$('deliveryFunding').setAttribute('aria-label',padBuilding?'Pickup window build progress':'Cash toward the pickup window');$('deliveryFundingText').textContent=padBuilding?'Builders at work · opens in '+padClock:state.money>=WINDOW_COST?'Ready to build':fmt(state.money)+' saved · '+fmt(WINDOW_COST-state.money)+' to go';['.online-card','#dispatchHint','.auto-drone-control','.window-control','.dispatch-stats'].forEach(function(sel){document.querySelector('[data-pane="orders"] '+sel).style.display=built?'':'none'});renderWindowControl();
    $('onlineTitle').textContent='#'+String(state.onlineCompleted+1).padStart(3,'0');$('onlineNeed').textContent=qtyLabel(onlineSize())+(state.productMenu.active===0?' ':' · ')+STRAINS[menuChoice(state.onlineCompleted)].name;$('receiptUnit').textContent=fmt(onlineValue())+' / '+unitShort();$('receiptFormat').textContent=format().name;$('receiptCarrier').textContent=deliveryBuilt()?'Drone · no fee':'Window pickup';$('receiptTotal').textContent=fmt(onlineSize()*onlineValue());var heldBags=customers.filter(function(c){return c.ordered&&!c.bag}).length;$('onlineStock').textContent=heldBags?heldBags+' walk-in bag'+(heldBags===1?'':'s')+' reserved first':'';renderDispatchDesk(maxBatch.count);$('dispatchHint').textContent=onlineRequestsReady()<1?'Waiting for the next web request. Requests arrive faster as you complete orders, and with Web marketing in the Shop.':state.stock[3]<onlineSize()?'Waiting for '+qtyLabel(onlineSize()-state.stock[3])+' more to be packed. Walk-in pickups stay reserved.':'';
    // The caption under the send button doubles as the hint line, so the card never changes height.
    if($('dispatchHint').textContent){$('onlineMaxInfo').textContent=$('dispatchHint').textContent;$('onlineMaxInfo').classList.add('is-hint')}else $('onlineMaxInfo').classList.remove('is-hint');var webItem=$('stockCountOnline').closest('.stock-item'),webCount=onlineRequestsReady();$('stockCountOnline').textContent=webCount;webItem.dataset.heat=String(requestHeat(webCount));$('stockCountOnline').classList.toggle('stock-full',webCount>=onlineRequestCap());webItem.title=webCount+' deliver'+(webCount===1?'y':'ies')+' requested · '+onlineRequestCap()+' max';$('onlineBadge').hidden=$('fulfillOnlineMax').disabled;
    renderCustomerRatings();
    var waiting=customers.filter(inOrderFlow).length;firstTimeHints(waiting);state.stock.forEach(function(n,i){var packed=i===3,oz=state.productMenu.active===0,v=packed&&oz?n/8:n;$('stockCount'+i).innerHTML=compactCount(v)+(packed?'<small>'+(oz?'oz':state.productMenu.active===1?'jt':'ed')+'</small>':'');$('stockCount'+i).title=i===4?n+' / '+readyCapacity()+' packed orders ready for walk-in pickup':i===3?qtyLabel(n)+' packed of '+qtyLabel(storageCapacity())+(n>=storageCapacity()?' · Storage full':''):n+' / '+storageCapacity()+(n>=storageCapacity()?' · Storage full':'');var cap=i===4?readyCapacity():storageCapacity(),item=$('stockCount'+i).parentNode.parentNode;$('stockCount'+i).classList.toggle('stock-full',n>=cap);item.dataset.trend=stockTrend(i,n,cap);item.classList.toggle('is-bottleneck',!trafficBound&&STOCK_STATIONS[i].indexOf(slow)>=0)});var order=milestone(state.contract);
    if(order){$('orderName').textContent=state.lifetime>=order.goal?'ORDER READY TO CLAIM':order.name;$('orderProgress').textContent=fmt(Math.min(state.lifetime,order.goal))+' / '+fmt(order.goal);$('orderFill').style.width=Math.min(100,state.lifetime/order.goal*100)+'%';$('claimReward').textContent='+'+fmt(order.reward);$('claim').disabled=state.lifetime<order.goal}
    else{$('orderName').textContent='ALL ORDERS FILLED';$('orderProgress').textContent='COMPLETE';$('orderFill').style.width='100%';$('claimReward').textContent='✓';$('claim').disabled=true}
    $('boostPreview').textContent=state.multiplier.toFixed(2)+'× → '+(state.multiplier*1.25).toFixed(2)+'× all stations';
    var boostPrice=boostCost(state.globalLevel);$('boostCost').textContent=state.globalLevel>=BOOST_MAX?'MAX':fmt(boostPrice);$('boost').disabled=state.globalLevel>=BOOST_MAX||state.money<boostPrice;
    var slowNow=slowestStation();
    // Suggestions live on the map: only the station the best buy belongs to wears the brass arrow, and a crew whose burst is
    // ready shows a bolt chip on its sign that fires it. Shop upgrades are suggested at the top of the Shop.
    var suggested=state.shopOpen&&fix&&fix.kind==='station'?fix.index:-1;
    markerEls.forEach(function(el,i){var locked=!isOpen(i),site=!state.lines[i];el.classList.toggle('selected',mapPicked&&!securitySelected&&!loungeSelected&&i===selected);el.classList.toggle('locked',locked);el.classList.toggle('is-site',site);el.classList.toggle('is-bottleneck',i===slowNow&&!locked&&!site);el.classList.add('station-sign');el.classList.toggle('can-upgrade',!locked&&!site&&i===suggested&&state.money>=cost(i));if(el.dataset.level!==String(state.lines[i])){el.innerHTML='<span class=station-sign-name>'+shortNames[i]+'</span><span class=station-sign-level>'+(site?'Build':'Lv '+state.lines[i])+'</span>';el.dataset.level=String(state.lines[i]);updateMarkers.key=null;}el.style.setProperty('--station-tier',TIER_COLORS[stationTier(i)]);el.setAttribute('aria-label',LINES[i].name+(locked?', locked':site?', under construction. Build it':', level '+state.lines[i]));el.setAttribute('aria-pressed',String(mapPicked&&!securitySelected&&!loungeSelected&&i===selected));abilityChip(el,i,!locked&&!site)});
    var loungeCard=document.querySelector('[data-lounge]');if(loungeCard){loungeCard.setAttribute('aria-pressed',String(loungeSelected));loungeCard.classList.toggle('is-lot',loungeLot);loungeCard.classList.toggle('can-upgrade',loungePrice!==null&&state.money>=loungePrice);loungeCard.querySelector('em').textContent=loungeBuilding?loungeClock:loungeLot?'Open':'Lv '+state.lounge;loungeCard.setAttribute('aria-label',loungeLot?'Smoking lounge, under construction':'Smoking lounge, level '+state.lounge);loungeCard.style.setProperty('--station-tier',TIER_COLORS[Math.min(3,state.lounge)])}
    var securityCard=document.querySelector('[data-security]');if(securityCard){securityCard.setAttribute('aria-pressed',String(securitySelected));securityCard.classList.toggle('is-site',doorSite);securityCard.classList.toggle('can-upgrade',!doorSite&&idTrainingQuote(1).levels>0);securityCard.querySelector('em').textContent=doorSite?'Build':'Lv '+state.idStaff;securityCard.setAttribute('aria-label',doorSite?'Security, under construction':'Security, level '+state.idStaff);securityCard.style.setProperty('--station-tier',TIER_COLORS[economy.stationLook(state.idStaff)])}
    updateStationOrbit(slow);
    machineTabs.forEach(function(tab,i){var locked=!isOpen(i),site=!state.lines[i],available=!locked&&!site&&state.money>=cost(i);tab.title=site?'Under construction':i===slow?'Slowest station · improve this to raise capacity':'';tab.setAttribute('aria-pressed',String(!securitySelected&&!loungeSelected&&i===selected));tab.classList.toggle('is-locked',locked);tab.classList.toggle('is-site',site);tab.classList.toggle('can-upgrade',available);tab.classList.toggle('ability-ready',!site&&abilityStatus(state.abilities,i,state.staff[i])==='ready');tab.querySelector('em').innerHTML=locked?'Locked':site?'Build':'Lv '+state.lines[i]+(i===slow?'<span class="slow-tag"> · Slow</span>':'');tab.style.setProperty('--station-tier',TIER_COLORS[stationTier(i)]);var progress=Math.min(100,state.lines[i]/100*100),progressText=site?'Under construction':state.lines[i]>=100?'Flagship equipment reached':'Level '+state.lines[i]+' of 100 toward flagship equipment';tab.querySelector('progress').value=progress;tab.querySelector('progress').setAttribute('aria-label',LINES[i].name+' equipment progress');tab.querySelector('progress').setAttribute('aria-valuetext',progressText);tab.querySelector('progress').title=progressText;tab.querySelector('.level-funding').textContent=progressText;tab.setAttribute('aria-label',LINES[i].name+(i===slow?', slowest station':'')+', level '+state.lines[i]+', '+STATION_TIERS[stationTier(i)]+(available?', upgrade ready':''))});
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
  // Staff training sits on the selected station, as on iOS. The row mirrors that station's buttons in the hidden
  // Staff pane, so prices, limits and handlers stay in one place.
  function stationStaff(){return securitySelected?{name:'Security',train:$('trainIdChecker'),max:$('trainIdCheckerMax'),info:$('idEmployeeInfo')}:loungeSelected?{name:'Lounge host',train:$('trainLoungeStaff'),max:$('trainLoungeStaffMax'),info:$('loungeEmployeeInfo')}:{name:'Team',train:document.querySelector('[data-staff="'+selected+'"]'),max:$('staffMax'+selected),info:$('employeeInfo'+selected)}}
  // The lounge's second elevator shaft: a one-off build under the host row, gone once it is up.
  function renderStationLift(){
    var row=$('stationLift'),show=loungeSelected&&state.lounge>0&&!state.loungeLift;row.hidden=!show;if(!show)return;
    var info='+'+Math.round((LOUNGE_LIFT_SPEED-1)*100)+'% take per guest',price=fmt(LOUNGE_LIFT_COST),button=$('buyLift');
    if($('liftInfo').textContent!==info)$('liftInfo').textContent=info;
    if(button.querySelector('b').textContent!==price)button.querySelector('b').textContent=price;
    button.disabled=state.money<LOUNGE_LIFT_COST;button.setAttribute('aria-label','Build a second lift for '+price);
    button.title=button.disabled?fmt(LOUNGE_LIFT_COST-state.money)+' more needed':'Build a second elevator shaft';
  }
  // Kiosks and the customer line belong to the order floor, so they sit under the counters on the Orders station. Each
  // row mirrors its original button (kept hidden in the Research list), so prices, limits and handlers stay in one place.
  var orderExtras=[['buyKiosk','kioskCountLabel','Self-order kiosks','<path d="M7 3h10v13H7zM10 7h4M10 10h4M12 16v5M8 21h8"/>'],
    ['upgradeQueue','queueCapacity','Customer line','<circle cx="8" cy="7" r="2.5"/><circle cx="16" cy="7" r="2.5"/><path d="M3.5 20v-4a4.5 4.5 0 0 1 9 0v4m-1 0v-4a4.5 4.5 0 0 1 9 0v4"/>']].map(function(d){
    var row=document.createElement('div');row.className='station-team station-extra';row.hidden=true;
    row.innerHTML='<span class="team-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+d[3]+'</svg></span><span class="team-copy"><b>'+d[2]+'</b><small></small></span><button type="button"><span></span><b></b></button>';
    var source=$(d[0]),button=row.querySelector('button');source.parentElement.hidden=true;button.onclick=function(){if(!source.disabled)source.click()};
    return {row:row,source:source,button:button,info:$(d[1])}});
  $('buyOrderCounter').parentElement.hidden=true;
  orderExtras.slice().reverse().forEach(function(x){$('orderCounterExpansion').after(x.row)});
  function renderOrderExtras(){var show=!securitySelected&&!loungeSelected&&selected===4&&state.lines[4]>0;
    orderExtras.forEach(function(x){x.row.hidden=!show;if(!show)return;var info=x.info.textContent;if(x.row.querySelector('small').textContent!==info)x.row.querySelector('small').textContent=info;
      ['span','b'].forEach(function(tag){var text=x.source.querySelector(tag).textContent;if(x.button.querySelector(tag).textContent!==text)x.button.querySelector(tag).textContent=text});
      x.button.disabled=x.source.disabled;x.button.setAttribute('aria-label',x.source.getAttribute('aria-label')||x.row.querySelector('b').textContent)})}
  // The selected station's crew ability: what it does while ready, a countdown while it runs or recharges.
  function renderStationAbility(){
    var row=$('stationAbility'),i=selected,show=!securitySelected&&!loungeSelected&&!!ABILITIES[i]&&state.lines[i]>0;row.hidden=!show;if(!show)return;
    var status=abilityStatus(state.abilities,i,state.staff[i]),button=$('useAbility'),info,label;
    if(status==='locked'){info='Unlocks at crew Lv '+ABILITY_UNLOCK;label='Lv '+ABILITY_UNLOCK}
    else if(status==='active'){info='Running · +'+Math.round(ABILITY_SALES*100)+'% sales';label=clockLabel(state.abilities.active[i])}
    else if(status==='recharging'){info='Recharging';label=clockLabel(state.abilities.recharge[i])}
    else{info=ABILITY_FACTOR+'× speed, +'+Math.round(ABILITY_SALES*100)+'% sales for '+(ABILITY_SECONDS%60?ABILITY_SECONDS+' s':ABILITY_SECONDS/60+' min');label='Use'}
    if($('abilityName').textContent!==ABILITIES[i].name)$('abilityName').textContent=ABILITIES[i].name;
    if($('abilityInfo').textContent!==info)$('abilityInfo').textContent=info;
    if(button.firstChild.textContent!==label)button.firstChild.textContent=label;
    button.disabled=status!=='ready';row.dataset.status=status;burstRing(button,status==='active'?state.abilities.active[i]/ABILITY_SECONDS:0);
    button.setAttribute('aria-label',status==='ready'?'Use '+ABILITIES[i].name:ABILITIES[i].name+': '+info+(status==='locked'?'':' '+label));
  }
  // The bolt chip rides on a station sign while that crew's burst is ready; tapping it fires the burst without opening the station.
  // Every running boost draws the same countdown: the element's border becomes a glowing brass ring that drains with the
  // share of the boost left (1 = just started, 0 = over).
  function burstRing(el,share){var on=share>0;el.classList.toggle('burst-ring',on);if(on)el.style.setProperty('--burst',Math.min(1,share).toFixed(3))}
  function abilityChip(sign,i,built){
    var status=built?abilityStatus(state.abilities,i,state.staff[i]):'none',ready=status==='ready';
    burstRing(sign,status==='active'?state.abilities.active[i]/ABILITY_SECONDS:0);
    var chip=sign.querySelector('.sign-ability');
    if(!chip){chip=document.createElement('span');chip.className='sign-ability';chip.setAttribute('role','button');chip.setAttribute('aria-label','Use '+ABILITIES[i].name);chip.title=ABILITIES[i].name+' is ready';chip.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3 5 13h6l-1 8 8-10h-6z"/></svg>';chip.addEventListener('click',function(e){e.stopPropagation();triggerAbility(i)});sign.appendChild(chip)}
    chip.hidden=!ready;
  }
  function triggerAbility(i){if(!useAbility(state.abilities,i,state.staff[i]))return;burst(machinePos[i],'#d0a54e');notify(ABILITIES[i].name.toUpperCase()+' · '+ABILITY_FACTOR+'× SPEED, +'+Math.round(ABILITY_SALES*100)+'% SALES','upgrade');renderUI();save()}
  function renderStationTeam(){renderStationLift();renderStationAbility();var row=$('stationTeam'),staff=stationStaff();if(!staff.train||!staff.max){row.hidden=true;return}row.hidden=false;
    [[$('teamTrain'),staff.train],[$('teamMax'),staff.max]].forEach(function(pair){var mine=pair[0],source=pair[1];mine.disabled=source.disabled;['span','b'].forEach(function(tag){var text=source.querySelector(tag).textContent;if(mine.querySelector(tag).textContent!==text)mine.querySelector(tag).textContent=text});mine.setAttribute('aria-label',source.getAttribute('aria-label')||'');mine.title=source.title||''});
    if($('teamName').textContent!==staff.name)$('teamName').textContent=staff.name;
    var info=staff.info?Array.prototype.map.call(staff.info.querySelectorAll('span'),function(span){return span.textContent.trim()}).filter(Boolean).join(' · ')||staff.info.textContent:'';if($('teamInfo').textContent!==info)$('teamInfo').textContent=info}
  $('teamTrain').onclick=function(){var staff=stationStaff();if(staff.train&&!staff.train.disabled)staff.train.click()};
  $('teamMax').onclick=function(){var staff=stationStaff();if(staff.max&&!staff.max.disabled)staff.max.click()};
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
  function showTray(name){if(name==='employees')name='factory';if(name==='factory')mapPicked=true;if(document.body.dataset.activeTray!==name)playSound('tap',state.sound);document.body.dataset.activeTray=name;if(state.empire.activeStore&&name!=='empire')visitStore(0,false);activeTray=name;var wasCollapsed=$('sheet').classList.contains('collapsed');panelOpen=true;$('sheet').classList.remove('collapsed');$('panelToggle').setAttribute('aria-expanded','true');$('panelToggle').textContent='⌄';var titles={factory:'Stations',employees:'Staff',orders:'Deliveries',boosts:'Research',flowers:'Menu',goals:'Goals',empire:'Empire'};$('panelTitle').textContent=titles[name];var tabName=name==='orders'?'boosts':name;trayTabs.forEach(function(t){t.setAttribute('aria-pressed',String(t.getAttribute('data-tray')===tabName))});$('panelBack').hidden=name!=='orders';Array.prototype.forEach.call(document.querySelectorAll('[data-pane]'),function(p){p.hidden=p.getAttribute('data-pane')!==name});if(wasCollapsed)glidePane(document.querySelector('[data-pane="'+name+'"]'),true);else if(paneGlide){paneGlide.cancel();paneGlide=null}fitControls()}
  function collapsePanel(){if(mapPicked){mapPicked=false;if(window.__shiftReady)renderUI()}var sheet=$('sheet'),wasOpen=!sheet.classList.contains('collapsed');if(wasOpen&&sheet.classList.contains('tall')){settleSheet('collapsed');return}panelOpen=false;$('panelToggle').setAttribute('aria-expanded','false');$('panelToggle').textContent='⌃';if(!wasOpen){fitControls();return}
    // The pane folds away first; the sheet only takes its collapsed shape once nothing is left to hide.
    glidePane(document.querySelector('[data-pane]:not([hidden])'),false,function(){if(!panelOpen){sheet.classList.add('collapsed');fitControls()}});fitControls()}
  // Deliveries lives under Shop › Online, as on iOS; its header carries a way back.
  $('panelBack').onclick=function(){showTray('boosts');if(shopBrowser)shopBrowser.show(2)};
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
    if(!h.storage&&state.stock.some(function(n,i){return i<4&&n>=storageCapacity()})){h.storage=true;notify('STORAGE FULL · expand it in Research');save();return}
    if(!h.queue&&waiting>=queueLimit()&&state.lines[4]>0){h.queue=true;notify('LINE IS FULL · upgrade the order desk for more places');save()}
  }
  function renderLoungeSelection(){
    var level=state.lounge,tier=loungeTier(level),next=LOUNGE_TIERS[level]||null,price=loungeUpgradeCost(level),maxed=!next,building=isBuilding(state.builds,'lounge'),clock=buildClock(buildLeft(state.builds,'lounge')),affordable=!maxed&&!building&&state.money>=price;
    var seated=loungeSeated(),seats=loungeSeats(level),jar=flowerValue()*specialFactor('lounge'),take=loungeTake(level,jar,state.loungeStaff,state.loungeLift),waiting=loungeWaiting().length,nowRate=loungeCurrentRate(level,seated,jar,state.loungeStaff,state.loungeLift)*state.gameSpeed;
    $('machineNumber').textContent='BACK ROOM · '+(!tier?'UNDER CONSTRUCTION':seated>=seats?'FULL'+(waiting?' · '+waiting+' ON THE ROPE':''):seated?seated+' OF '+seats+' SEATED':'SEATS FREE');
    $('machineName').textContent='SMOKING LOUNGE';$('machineLevel').textContent=level;$('machineRate').textContent=tier?fmt(nowRate)+'/s · '+fmt(take.total)+' / session':building?'Opens in '+clock:'Under construction';
    var ICON_SEAT='<svg viewBox="0 0 24 24"><path d="M6 11V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5M4 11h16v4H4zM6 15v5M18 15v5"/></svg>',ICON_GUESTS='<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M15 20c0-2.6 1.5-4.4 3.7-4.9 1.4.3 2.3 1.6 2.3 3.4"/></svg>',ICON_TICKET='<svg viewBox="0 0 24 24"><path d="M4 8a2 2 0 0 0 2-2h12a2 2 0 0 0 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 0-2 2H6a2 2 0 0 0-2-2v-3a2 2 0 0 0 0-4zM9 6v12"/></svg>',ICON_JAR='<svg viewBox="0 0 24 24"><path d="M8 4h8v3H8zM7 7h10v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2zM7 11h10"/></svg>',ICON_SESSIONS='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>',ICON_RATE='<svg viewBox="0 0 24 24"><path d="M4 17l5-6 4 3 7-8M15 6h5v5"/></svg>',ICON_LIFT='<svg viewBox="0 0 24 24"><path d="M6 3h12v18H6zM12 3v18M9 9.5l-1.5 2h3zM15 14.5l-1.5-2h3z"/></svg>',ICON_BANKED='<svg viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v4c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 10v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4M5 14v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4"/></svg>';
    var chipTone=!tier?'wait':seated>=seats?'stop':seated?'go':'wait',chipWord=building?'Building':!tier?'Site':seated>=seats?'Full':seated?seated+' of '+seats:'Open',chipReason=building?'opens in '+clock:!tier?'not built':seated>=seats?(waiting?waiting+' at the rope':'every seat'):seated?'seated':'seats free';
    var loungeHtml='<span class="status-chip" data-tone="'+chipTone+'"><i></i><b>'+chipWord+'</b><small>'+chipReason+'</small></span>'+
      (tier?'<span class="stat" title="What the lounge is making right now: '+seated+' of '+seats+' seats taken, each worth the '+fmt(take.total)+' take once per '+loungeSessionSeconds(level).toFixed(0)+'-second session">'+ICON_RATE+'<b>'+fmt(nowRate)+'/s</b><small>now</small></span>'+
      '<span class="stat" title="Banked by the lounge since it opened: every cover and every jar sold at the lounge premium">'+ICON_BANKED+'<b>'+fmt(state.loungeEarned)+'</b><small>total</small></span>'+
      '<span class="stat tier" title="One guest in '+tier.share+' through the door heads for the curtain; VIPs twice as often">'+ICON_GUESTS+'<b>1 in '+tier.share+'</b><small>guests</small></span>'+
      '<span class="stat" title="Seats in the back room">'+ICON_SEAT+'<b>'+seats+'</b><small>seats</small></span>'+
      '<span class="stat" title="Cover paid at the curtain">'+ICON_TICKET+'<b>'+fmt(take.cover)+'</b><small>cover</small></span>'+
      '<span class="stat" title="One packed jar per session at '+tier.spend+'× the counter price">'+ICON_JAR+'<b>'+fmt(take.spend)+'</b><small>jar ×'+tier.spend+'</small></span>'+
      '<span class="stat" title="Sessions so far">'+ICON_SESSIONS+'<b>'+compactCount(state.loungeSessions)+'</b><small>sessions</small></span>'+
      (state.loungeLift?'<span class="stat" title="Two elevator shafts: '+Math.round((LOUNGE_LIFT_SPEED-1)*100)+'% more take per guest">'+ICON_LIFT+'<b>2</b><small>lifts</small></span>':''):
      (building?'<span class="stat tier" title="Builders are raising the roof; guests go up once it opens">'+ICON_SESSIONS+'<b>'+clock+'</b><small>to open</small></span>':'<span class="stat tier" title="Bought outright; every level adds seats and raises the take">'+ICON_TICKET+'<b>'+fmt(price)+'</b><small>to open</small></span>')+
      '<span class="stat" title="Guests who go in skip the counters: cover at the curtain, one jar at a premium, out the back door">'+ICON_GUESTS+'<b>1 in '+LOUNGE_TIERS[0].share+'</b><small>guests</small></span>'+
      '<span class="stat" title="Seats once open">'+ICON_SEAT+'<b>'+LOUNGE_TIERS[0].seats+'</b><small>seats</small></span>');
    if($('stationStatus').dataset.html!==loungeHtml){$('stationStatus').innerHTML=loungeHtml;$('stationStatus').dataset.html=loungeHtml}
    $('upgradeLevel').textContent=!tier?(building?'Being built':'Not open'):maxed?'Lv '+level+' · '+tier.name:'Lv '+level+' → '+(level+1)+' · '+next.name;
    renderUpgradeComparison('Seats',seats,next?next.seats:seats,false,!tier,maxed,{maxed:'Fully fitted',unbuilt:building?'Opens in '+clock:null,gain:function(before,after){return '+'+(after-before)+' seats · jar ×'+(next?next.spend:tier.spend)}});
    $('stationTier').textContent=tier?tier.name:'Construction site';$('stationTier').style.color=TIER_COLORS[Math.min(3,level)];
    $('upgradeFunding').textContent=building?'Opens in '+clock:maxed?'Fully fitted':affordable?(tier?'Ready to upgrade':'Ready to open'):fmt(Math.max(0,price-state.money))+' to go';
    $('upgradeProgress').value=building?(1-buildShareLeft(state.builds,'lounge'))*100:maxed?100:Math.min(100,state.money/price*100);$('upgradeProgress').setAttribute('aria-valuetext',building?'Opens in '+clock:maxed?'Fully fitted':affordable?'Ready':fmt(Math.max(0,price-state.money))+' needed for '+next.name);
    paintUpgradePreview(-2);
    $('nextAppearance').classList.remove('unlock-road');$('nextAppearance').hidden=false;$('nextAppearance').textContent=next?next.name+' · '+next.seats+' seats · 1 in '+next.share+' guests · jar ×'+next.spend:'Nothing left to fit in the back room.';
    $('machineCost').textContent=building?clock:maxed?'—':fmt(price);$('buyMachine').disabled=!affordable;$('buyMachine').querySelector('span').textContent=building?'BUILDING':tier?'UPGRADE':'OPEN';$('buyMachine').style.setProperty('--funded',(building?(1-buildShareLeft(state.builds,'lounge'))*100:maxed?0:Math.min(100,state.money/price*100))+'%');
    $('buyMachineMax').disabled=true;$('machineMaxLabel').textContent='MAX';$('machineMaxCost').textContent='—';$('buyMachineMax').setAttribute('aria-label','The lounge is fitted one level at a time');
    $('upgradeHint').textContent=building?'Builders are on the roof · guests go up once it opens':maxed?'Every seat in the back room is spoken for.':!affordable?fmt(price-state.money)+' to go':tier?'+'+(next.seats-seats)+' seats · bigger take per session':'Open the curtain · every 4th guest slips in';$('upgradeHint').classList.toggle('ready',affordable);
  }
  function renderSecuritySelection(){
    var lvl=state.idStaff,price=economy.securityCost(lvl),maxed=securityMaxed(),site=!state.doorBuilt,affordable=site||(!maxed&&state.money>=price),quote=site?{levels:0,cost:0}:idTrainingQuote(10000);
    $('machineNumber').textContent='DOOR · '+(site?'UNDER CONSTRUCTION':lvl?'CHECKING IDS':'NO GUARD YET');$('machineName').textContent='SECURITY';$('machineLevel').textContent=lvl;$('machineRate').textContent=securityDuration().toFixed(2)+'s / check';
    // Stat tiles, like the lounge card: a status chip, the check time, who is at the door, and the scanner's boost.
    var atDoor=customers.filter(function(c){return c.phase==='idCheck'}).length,held=customers.filter(function(c){return c.phase==='idCheck'&&!c.walking}).length,checking=customers.some(function(c){return c.idChecked===false&&c.idCheckTime>0});
    var ICON_CLOCK='<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="7.5"/><path d="M12 9v4l2.5 1.5M9 3h6M12 3v2.5"/></svg>',ICON_DOOR='<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M15 20c0-2.6 1.5-4.4 3.7-4.9 1.4.3 2.3 1.6 2.3 3.4"/></svg>',ICON_SCAN='<svg viewBox="0 0 24 24"><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/></svg>';
    var chipTone=site?'wait':!lvl?'stop':held>3?'stop':checking||atDoor?'go':'wait',chipWord=site?'Site':!lvl?'No guard':held>3?'Line':checking?'Checking':atDoor?'Arriving':'Clear',chipReason=site?'not built':!lvl?'at the door':held>3?held+' waiting':checking?'an ID':atDoor?'walking up':'door';
    var securityHtml='<span class="status-chip" data-tone="'+chipTone+'"><i></i><b>'+chipWord+'</b><small>'+chipReason+'</small></span>'+
      '<span class="stat" title="Seconds the doorman takes per ID check; training and the scanner both cut it">'+ICON_CLOCK+'<b>'+securityDuration().toFixed(2)+'s</b><small>per check</small></span>'+
      '<span class="stat" title="Customers on the way to or waiting at the desk">'+ICON_DOOR+'<b>'+atDoor+'</b><small>at the door</small></span>'+
      '<span class="stat" title="ID scanner from Research: each level checks 12% faster">'+ICON_SCAN+'<b>'+(state.scannerLevel?'+'+Math.round(state.scannerLevel*12)+'%':'—')+'</b><small>scanner</small></span>';
    if($('stationStatus').dataset.html!==securityHtml){$('stationStatus').innerHTML=securityHtml;$('stationStatus').dataset.html=securityHtml}
    if(site){
      $('upgradeLevel').textContent='Not built';renderUpgradeComparison('Seconds per ID check',securityDuration(),securityDuration(),true,true,false);
      $('stationTier').textContent='Construction site';$('stationTier').style.color=TIER_COLORS[0];$('upgradeFunding').textContent='Ready to build';$('upgradeProgress').value=100;$('upgradeProgress').setAttribute('aria-valuetext','Ready to build');
      paintUpgradePreview(-1);$('nextAppearance').classList.remove('unlock-road');$('nextAppearance').hidden=false;$('nextAppearance').textContent='A staffed door station: ID checks before customers join the line.';
      $('machineCost').textContent='FREE';$('buyMachine').disabled=false;$('buyMachine').querySelector('span').textContent='BUILD';$('buyMachine').style.setProperty('--funded','100%');
      $('buyMachineMax').disabled=true;$('machineMaxLabel').textContent='MAX';$('machineMaxCost').textContent='—';$('buyMachineMax').setAttribute('aria-label','Build the door first');
      $('upgradeHint').textContent='Under construction · tap the site by the entrance, or Build here, to raise the door.';$('upgradeHint').classList.add('ready');return;
    }
    $('upgradeLevel').textContent=maxed?'Lv '+lvl:'Lv '+lvl+' → '+(lvl+1);
    renderUpgradeComparison('Seconds per ID check',securityDuration(),securityDuration(lvl+1),true,false,maxed);
    var booth=economy.stationLook(lvl),nextLook=economy.nextLookLevel(lvl);$('stationTier').textContent=lvl?economy.SECURITY_TIERS[booth-1]:'Unstaffed door';$('stationTier').style.color=TIER_COLORS[booth];
    $('upgradeFunding').textContent=maxed?'Top of the security track':affordable?'Ready to train':fmt(Math.max(0,price-state.money))+' to go';
    $('upgradeProgress').value=maxed?100:Math.min(100,state.money/price*100);$('upgradeProgress').setAttribute('aria-valuetext',affordable?'Training ready':fmt(Math.max(0,price-state.money))+' needed for level '+(lvl+1));
    paintUpgradePreview(-1);
    var road=$('nextAppearance');road.classList.add('unlock-road');road.hidden=false;road.innerHTML=nextLook?'<b>Lv '+nextLook+'</b><span>new look · '+economy.SECURITY_TIERS[economy.stationLook(nextLook)-1]+'</span>':'<b>Flagship booth</b><span>every level still speeds checks</span>';
    $('machineCost').textContent=maxed?'—':fmt(price);$('buyMachine').disabled=!affordable;$('buyMachine').querySelector('span').textContent=lvl?'TRAIN':'HIRE';
    $('buyMachineMax').disabled=!quote.levels;$('machineMaxLabel').textContent='MAX'+(quote.levels?' +'+quote.levels+' LV':'');$('machineMaxCost').textContent=quote.levels?fmt(quote.cost):'—';$('buyMachineMax').setAttribute('aria-label','Train security by '+quote.levels+' levels for '+fmt(quote.cost));
    $('buyMachine').style.setProperty('--funded',(maxed?0:Math.min(100,state.money/price*100))+'%');
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
    var gainText=maxed?(wording&&wording.maxed||'Fully trained'):unbuilt?(wording&&wording.unbuilt||'Ready to build'):wording&&wording.gain?wording.gain(before,after):(isTime?'':'+')+(gain<.1?'<0.1':gain<10?gain.toFixed(1):Math.round(gain))+'% '+(isTime?'less time':'more output');
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
    // The pickup window's own 3D model, as the map will show it built, without buying anything or advancing the scene.
    var art=document.createElement('canvas');art.width=900;art.height=900;
    var savedCtx=ctx,savedUnit=unit,savedX=centerX,savedY=centerY,savedAngle=angle,savedElevation=sceneElevation;
    try{
      ctx=art.getContext('2d',{willReadFrequently:true});unit=100;angle=.57;sceneElevation=0;
      var anchor=rotate(DECK_X,DECK_Z);centerX=450-anchor.x*unit;centerY=720-anchor.z*unit*.5;
      // The deck's own 3D model once the 3D map has it, as the map will show it built; the drawn deck until then.
      var picture=map3d&&map3d.ok&&map3d.fixturePicture?map3d.fixturePicture('pickupWindow'):null;
      if(picture)drawPictureFit(ctx,picture,900,900);
      else key='';
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
  // The menus show each station as its 3D model once the 3D map has rendered it (map3d.stationPicture, framed like the
  // map), the sprite until then and in the 2D map. picturesPending asks the frame loop to repaint the station tabs.
  var picturesPending=false,stationModelFiles={};
  // A look without its own model yet shows the highest one that has one, as the map does.
  // The unlock road: one row under the upgrade bar naming the next level that changes this station and what it gives.
  // Counters double baskets through the retail tier, which needs both counters at that level.
  function renderUnlockRoad(level,i){
    var next=economy.nextUnlock(Math.max(1,level)),road=$('nextAppearance');road.classList.add('unlock-road');road.hidden=!level;
    if(!next){road.innerHTML='<b>Flagship</b><span>every level still adds output</span>';return}
    var other=i===4?5:i===5?4:-1,gives=other<0?'×2 output':'×2 baskets'+(state.lines[other]<next.level?' with '+(other===4?'Orders':'Pickup'):'');
    road.innerHTML='<b>Lv '+next.level+'</b><span>'+gives+(next.look?' · new look':next.level===FOUNDER_LEVEL&&perkLevel(state.perks,'finish')?' · founder look':'')+'</span>';
  }
  // Founder's finish (founder perk): a flagship station at Lv 100, or the door booth at its Lv 75 cap, takes the founder look.
  function stationLookFor(i,level){var t=economy.stationLook(level);return t===5&&perkLevel(state.perks,'finish')&&level>=(i===6?economy.SECURITY_MAX_LEVEL:FOUNDER_LEVEL)?FOUNDER_LOOK:t}
  function stationModelKey(i,level){var t=stationLookFor(i,level);while(t>1&&!stationModelFiles[i+'.'+t])t--;return i+'.'+t}
  function stationPicture(i,level){
    if(!map3d||!map3d.ok||!map3d.stationPicture||!(level>0))return null;
    var picture=map3d.stationPicture(stationModelKey(i,level));if(!picture)picturesPending=true;return picture;
  }
  // The rooftop lounge as the map shows it at its tier (map3d.loungePicture); unbought, the Speakeasy it opens as.
  function loungePicture(){
    if(!map3d||!map3d.ok||!map3d.loungePicture)return null;
    var picture=map3d.loungePicture(Math.max(1,state.lounge),state.loungeLift);if(!picture)picturesPending=true;return picture;
  }
  // Draws a picture into a w×h canvas, as large as fits, centred and standing on the bottom edge.
  function drawPictureFit(c,picture,w,h){var fit=Math.min(w/picture.width,h/picture.height),pw=picture.width*fit,ph=picture.height*fit;c.drawImage(picture,(w-pw)/2,h-ph,pw,ph)}
  function paintUpgradePreview(index){
    var preview=$('upgradePreview');if(!preview)return;
    var key=[index,index===-2?state.lounge+(state.loungeLift?'+':''):index<0?state.idStaff:stationTier(index),state.menuStrains.join(','),state.productMenu.active].join('|');
    if(preview.dataset.art===key)return;
    // Render at native resolution, then frame the opaque equipment rather than its overhead light pool.
    var art=document.createElement('canvas');art.width=480;art.height=600;
    var savedCtx=ctx,savedUnit=unit,savedX=centerX,savedY=centerY,savedAngle=angle;
    try{
      ctx=art.getContext('2d',{willReadFrequently:true});unit=90;centerX=240;centerY=480;angle=.57;
      // The sprite shop shows the station's own sprite, so the panel matches the room.
      var spriteName=SHOP_SPRITES&&index!==-2?stationSprite(index<0?6:index,index<0?state.idStaff:Math.max(1,state.lines[index])):null,spriteArt=spriteName&&spriteImage(spriteName);
      var picture=index===-2?loungePicture():index<0?stationPicture(6,state.doorBuilt?state.idStaff:0):stationPicture(index,Math.max(1,state.lines[index]));
      if(SHOP_SPRITES&&index!==-2&&!spriteArt)key=''; // repaint once the sprite has loaded
      if(picturesPending&&!picture)key=''; // and once the 3D model's picture is ready
      if(picture)drawPictureFit(ctx,picture,480,600);
      else if(spriteArt){var fit=Math.min(440/spriteArt.naturalWidth,560/spriteArt.naturalHeight);ctx.drawImage(spriteArt,240-spriteArt.naturalWidth*fit/2,580-spriteArt.naturalHeight*fit,spriteArt.naturalWidth*fit,spriteArt.naturalHeight*fit)}
      else if(index===-2)drawLoungeThumb(state.lounge);
      else if(index<0){drawBox(0,0,-.24,2.6,2.6,.24,['#cbb085','#7f6a4b','#ac9168']);drawBox(.55,-.1,0,.95,.7,1.05,['#ede4cb','#a79c81','#d2c5a5']);drawPerson(-.55,-.45,0,7,false,true,false)}
      else drawStage({x:0,z:0},index,0,true);
      var pixels=ctx.getImageData(0,0,art.width,art.height).data,left=480,right=0,top=600,bottom=0;
      for(var y=0;y<600;y++)for(var x=0;x<480;x++)if(pixels[(y*480+x)*4+3]>180){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y)}
      var pc=preview.getContext('2d');pc.clearRect(0,0,preview.width,preview.height);
      if(right>=left&&bottom>=top){var w=right-left+1,h=bottom-top+1,scale=Math.min((preview.width-24)/w,(preview.height-24)/h);pc.drawImage(art,left,top,w,h,(preview.width-w*scale)/2,(preview.height-h*scale)/2,w*scale,h*scale)}
      preview.dataset.art=key;
    }finally{ctx=savedCtx;unit=savedUnit;centerX=savedX;centerY=savedY;angle=savedAngle}
  }
  function paintSecurityThumbnail(){var card=document.querySelector('[data-security] canvas');if(!card)return;var savedCtx=ctx,savedUnit=unit,savedX=centerX,savedY=centerY,savedAngle=angle;ctx=card.getContext('2d');var picture=state.doorBuilt?stationPicture(6,state.idStaff):null;if(ctx&&picture){ctx.clearRect(0,0,80,100);ctx.drawImage(picture,0,0,80,100)}else if(ctx){ctx.clearRect(0,0,80,100);unit=25;centerX=40;centerY=97;angle=.57;if(!state.doorBuilt)drawConstructionSite(0,0,2.6,2.6,function(){drawBox(.55,-.1,0,.95,.7,1.05,['#ede4cb','#a79c81','#d2c5a5'])});else{drawBox(0,0,-.24,2.6,2.6,.24,['#cbb085','#7f6a4b','#ac9168']);drawBox(.55,-.1,0,.95,.7,1.05,['#ede4cb','#a79c81','#d2c5a5']);drawPerson(-.55,-.45,0,7,false,true,false)}}ctx=savedCtx;unit=savedUnit;centerX=savedX;centerY=savedY;angle=savedAngle}
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
  function paintLoungeThumbnail(){var card=document.querySelector('[data-lounge] canvas');if(!card)return;var savedCtx=ctx,savedUnit=unit,savedX=centerX,savedY=centerY,savedAngle=angle;ctx=card.getContext('2d');var picture=loungePicture();if(ctx&&picture){ctx.clearRect(0,0,80,100);drawPictureFit(ctx,picture,80,100)}else if(ctx){ctx.clearRect(0,0,80,100);unit=22;centerX=40;centerY=94;angle=.57;drawLoungeThumb()}ctx=savedCtx;unit=savedUnit;centerX=savedX;centerY=savedY;angle=savedAngle}
  function paintThumbnails(){paintSecurityThumbnail();paintLoungeThumbnail();var savedCtx=ctx,savedUnit=unit,savedX=centerX,savedY=centerY,savedAngle=angle;machineTabs.forEach(function(tab,i){ctx=tab.querySelector('canvas').getContext('2d');if(!ctx)return;ctx.clearRect(0,0,80,100);var picture=state.lines[i]?stationPicture(i,state.lines[i]):null;if(picture){ctx.drawImage(picture,0,0,80,100);return}unit=25;centerX=40;centerY=97;angle=.57;drawStage({x:0,z:0},i,0)});ctx=savedCtx;unit=savedUnit;centerX=savedX;centerY=savedY;angle=savedAngle}
  function selectLounge(){securitySelected=false;loungeSelected=true;showTray('factory');renderUI();var card=document.querySelector('[data-lounge]');if(card&&card.scrollIntoView)card.scrollIntoView({block:'nearest',inline:'nearest'});if(navigator.vibrate)navigator.vibrate(8)}
  // Each lounge tier is bought outright; the first one raises the doorway out of its hoarding.
  function upgradeLounge(){
    var price=loungeUpgradeCost(state.lounge);if(price===null||isBuilding(state.builds,'lounge'))return;if(state.money<price)return notify('Need '+fmt(price-state.money)+' more');
    // The first level pays for the build; the roof opens when the builders finish (completeBuilds).
    if(!state.lounge){state.money-=price;startBuild(state.builds,'lounge');recordGoal(state.empire,'upgrade',1);playSound('build',state.sound);telemetry.send('lounge_build',{});notify('LOUNGE UNDER CONSTRUCTION · opens in '+buildClock(buildLeft(state.builds,'lounge')),'upgrade');paintThumbnails();updateMarkers.key=null;render.invalidated=true;renderUI();save();if(navigator.vibrate)navigator.vibrate(18);return}
    var wasLot=!state.lounge;buyLoungeTier(state);recordGoal(state.empire,'upgrade',1);var tier=loungeTier(state.lounge);
    if(wasLot)buildRise[7]=1;burst({x:LOUNGE_DOOR.x,z:LOUNGE_DOOR.z},'#f0a7c8');playSound(wasLot?'build':'sparkle',state.sound);telemetry.send('lounge_tier',{tier:state.lounge});
    notify(wasLot?'LOUNGE OPEN · '+tier.name:'LOUNGE · '+tier.name.toUpperCase(),'upgrade');paintThumbnails();updateMarkers.key=null;render.invalidated=true;renderUI();save();if(navigator.vibrate)navigator.vibrate(18);
  }
  function selectSecurity(){loungeSelected=false;securitySelected=true;showTray('factory');renderUI();var card=document.querySelector('[data-security]');if(card&&card.scrollIntoView)card.scrollIntoView({block:'nearest',inline:'nearest'});if(navigator.vibrate)navigator.vibrate(8)}
  function selectMachine(i){securitySelected=false;loungeSelected=false;selected=i;showTray('factory');renderUI();if(machineTabs[i]&&machineTabs[i].scrollIntoView)machineTabs[i].scrollIntoView({block:'nearest',inline:'nearest'});if(navigator.vibrate)navigator.vibrate(8)}
  // Construction: the door and each station are raised for free, in line order, with the intro explaining what each one does.
  // Building never charges cash because a shop with no pickup counter cannot earn any.
  var DOOR_POS=ID_DESK;
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
  function buySelected(){if(loungeSelected)return upgradeLounge();if(securitySelected)return state.doorBuilt?trainIdChecker(1):buildStation('door');buyStationLevel(selected)}
  function buyStationLevel(i){var line=LINES[i];if(!isOpen(i))return notify('Build the previous stage first');if(!state.lines[i])return buildStation(i);var c=cost(i);if(state.money<c)return notify('Need '+fmt(c-state.money)+' more');var oldTier=stationTier(i);state.money-=c;state.lines[i]++;recordGoal(state.empire,'upgrade',1);telemetry.once('first_upgrade',{station:line.name});trackStationLevel(i);if(stationTier(i)>oldTier){tierFlashes[i]=1;burst(machinePos[i],'#f0d89a')}paintThumbnails();burst(machinePos[i]);notify(line.name+' · LEVEL '+state.lines[i],'upgrade');renderUI();save();if(navigator.vibrate)navigator.vibrate(18)}
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
  today.innerHTML='<section id="returnSummary" hidden><p class="return-kicker">While you were away</p><h2>Welcome back</h2><p id="returnTotal"></p><p id="returnTime"></p><ul id="returnEarnings"></ul><p id="returnGoals"></p><button id="dismissReturn">Back to the shop</button></section><h2>Next steps</h2><p id="nextInvestment"></p><div id="shortGoals"></div><section class="reputation"><h2 class="empire-section-heading">Reputation</h2><div class="reputation-summary"><strong id="reputationStatus"></strong><span id="reputationNext"></span></div><progress id="reputationProgress" max="60" value="0" aria-label="Customer reputation"></progress><section class="reputation-guide" aria-labelledby="customerGuideTitle">'+customerGuideMarkup()+'</section></section>';
  paintCustomerGuide();
  [0,1,2].forEach(function(i){var row=document.createElement('div');row.className='short-goal';row.innerHTML='<h3 id="goalTitle'+i+'"></h3><progress id="goalProgress'+i+'" max="100" aria-label="Objective progress"></progress><p id="goalCount'+i+'"></p><button id="goalClaim'+i+'"></button>'; $('shortGoals').appendChild(row);$('goalClaim'+i).onclick=function(){var closing=shiftStatus(state.empire).done===2,reward=claimGoal(state,i,rewardScale());if(reward){save();renderUI();notify((closing?'SHIFT COMPLETE · +':'GOAL COMPLETE · +')+fmt(reward),'upgrade')}}});
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
  function stockFormat(index){if(state.productMenu.unlocked[index])return;if(unlockFormat(state,index)){save();renderUI();notify('EVERY STRAIN NOW SELLS AS '+FORMATS[index].name.toUpperCase(),'upgrade')}}
  var prestigePanel=document.createElement('details');prestigePanel.className='depth-panel prestige-panel';prestigePanel.innerHTML=
    '<summary><svg class="prestige-sprout" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21V11M12 14C3 14 3 7 3 7s9-1 9 7ZM12 11c0-8 9-9 9-9s0 9-9 9Z"/></svg><span>Reopening &amp; founder perks</span><small id="prestigeStatus"></small><svg class="prestige-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></summary>'+
    '<div class="prestige-body"><div class="prestige-rank-track" id="prestigeComparison" role="group"><div class="prestige-rank"><span id="prestigeCurrentRank"></span><strong id="prestigeCurrentRate"></strong><small>base sales</small></div><svg id="prestigeArrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h17m-6-6 6 6-6 6"/></svg><div class="prestige-rank is-next" id="prestigeNext"><span id="prestigeNextRank"></span><strong id="prestigeNextRate"></strong><small>base sales</small></div></div>'+
    '<p class="prestige-gain" id="prestigeGain"></p><div class="prestige-funding" id="prestigeFunding"><div><span>All-time revenue</span><b id="prestigeRevenue"></b></div><progress id="prestigeProgress" max="100" value="0" aria-label="All-time revenue toward the next share"></progress><small id="prestigeFundingStatus"></small></div>'+
    '<dl class="prestige-carryover" id="prestigeCarryover"><div><dt>Keep</dt><dd>Shares (permanent sales bonus), founder perks, branch stars, event badges, discovered cultivars &amp; sound setting</dd></div><div><dt>Restart</dt><dd>Cash, stores &amp; all shop progress</dd></div></dl><button id="prestigeStart" type="button" aria-describedby="prestigeFundingStatus prestigeCarryover"></button></div>';
  document.querySelector('[data-empire-section="growth"]').append(prestigePanel);
  // Founder perks spend points from reopening; shares are never spent, so buying a perk never lowers the sales bonus.
  var perkPanel=document.createElement('section');perkPanel.className='strain-library founder-perks';perkPanel.setAttribute('aria-labelledby','perksTitle');
  perkPanel.innerHTML='<div class="library-head"><h3 id="perksTitle">Founder perks</h3><small id="perkPoints"></small></div><p class="library-note">Each reopening pays one point per share gained. Perks are permanent and shape every new shop.</p><ul class="library-grid" id="perkGrid"></ul>';
  prestigePanel.querySelector('.prestige-body').insertBefore(perkPanel,$('prestigeCarryover'));
  PERKS.forEach(function(p){var li=document.createElement('li');li.className='library-card';li.dataset.perk=p.id;li.innerHTML='<b></b><small></small><em></em><button type="button"></button>';
    li.querySelector('button').onclick=function(){if(buyPerk(state.perks,p.id)){if(p.id==='vault')state.offlineLevel=Math.max(state.offlineLevel,perkLevel(state.perks,'vault'));if(p.id==='finish')paintThumbnails();save();renderUI();notify(p.name.toUpperCase()+' · LEVEL '+perkLevel(state.perks,p.id),'upgrade')}};$('perkGrid').append(li)});
  function renderPerks(){var pts=state.perks.points;$('perkPoints').textContent=pts+' point'+(pts===1?'':'s');
    PERKS.forEach(function(p){var li=$('perkGrid').querySelector('[data-perk="'+p.id+'"]'),l=perkLevel(state.perks,p.id),c=perkCost(state.perks,p.id),b=li.querySelector('button');
      li.dataset.state=c===null?'known':'open';li.querySelector('b').textContent=p.name;li.querySelector('small').textContent=p.blurb(c===null?l:l+1);li.querySelector('em').textContent='Level '+l+' of '+p.costs.length;
      b.textContent=c===null?'Maxed':'Buy · '+c+' pt'+(c===1?'':'s');b.disabled=c===null||pts<c;b.setAttribute('aria-label',c===null?p.name+' maxed':'Buy '+p.name+' level '+(l+1)+' for '+c+' points')})}
  // Return reminders exist only in the iOS app; the hidden toggle is what the Settings row proxies.
  var reminders=createReminders();
  if(reminders.available){var remindersButton=document.createElement('button');remindersButton.id='remindersToggle';remindersButton.type='button';remindersButton.hidden=true;
    remindersButton.onclick=function(){if(state.reminders){state.reminders=false;reminders.clear();save();remindersButton.textContent='Reminders off';return}reminders.enable().then(function(ok){state.reminders=ok;save();remindersButton.textContent=ok?'Reminders on':'Reminders off';notify(ok?'REMINDERS ON':'NOTIFICATIONS ARE OFF IN IOS SETTINGS')})};
    remindersButton.textContent=state.reminders?'Reminders on':'Reminders off';document.body.append(remindersButton)}
  function scheduleReminders(){if(!reminders.available||!state.reminders)return;var d=dailyStatus(state.empire,Date.now(),1);
    reminders.schedule(planReminders({now:Date.now(),offlineCapMs:offlineCap()*1000,dailyAvailable:d.available,dailyClock:state.empire.clock}))}
  var soundButton=document.createElement('button');soundButton.id='soundToggle';soundButton.type='button';soundButton.onclick=function(){state.sound=!state.sound;playSound('sale',state.sound);save();renderUI()};document.querySelector('.shop-reset').prepend(soundButton);
  var prestigeDialog=document.createElement('div');prestigeDialog.id='prestigeModal';prestigeDialog.className='modal-wrap';prestigeDialog.hidden=true;prestigeDialog.innerHTML='<div class="modal" role="dialog" aria-modal="true" aria-labelledby="prestigeTitle"><h2 id="prestigeTitle">Reopen your empire?</h2><p id="prestigePreview"></p><p>Clears cash, stores, staff, stock, strains, reputation, collections, goals and events. Only your shares, founder perks, branch stars, event badges, strain library and sound preference carry over.</p><div><button id="prestigeCancel">Keep playing</button><button id="prestigeConfirm">Reopen from scratch</button></div></div>';document.body.append(prestigeDialog);
  $('prestigeStart').onclick=function(){var o=prestigeOffer(state);if(!o.eligible)return;$('prestigePreview').textContent='+'+o.gain+' share'+(o.gain===1?'':'s')+': '+o.multiplier.toFixed(2).replace(/0$/,'')+'× base main-shop and branch income from now on.';prestigeDialog.hidden=false;$('prestigeCancel').focus()};
  var prestigeOpener=null;
  $('prestigeCancel').onclick=function(){prestigeDialog.hidden=true;(prestigeOpener&&!prestigeOpener.hidden?prestigeOpener:$('prestigeStart')).focus();prestigeOpener=null};
  // The brass reopen card: shown once a fresh shop would earn back today's income within about 20 minutes of play.
  function renderReopenCard(){var card=$('reopenCard');if(!card)return;var m=state.empire.activeStore?null:reopenMoment(prestigeOffer(state),state.run,incomeRate());card.hidden=!m;$('empireBadge').hidden=!m;if(!m)return;
    var text=(m.minutes?'Back on pace in ~'+m.minutes+' min':'Fresh shop, '+m.ratio.toFixed(2).replace(/0$/,'')+'\u00d7 sales'),gain='+'+m.gain+' share'+(m.gain===1?'':'s');
    if($('reopenText').textContent!==text)$('reopenText').textContent=text;if($('reopenGain').textContent!==gain)$('reopenGain').textContent=gain;
    card.setAttribute('aria-label','Reopen for '+gain+'. '+(m.minutes?'A fresh shop is back to today\u2019s income in about '+m.minutes+' minutes':text))}
  $('reopenCard').onclick=function(){prestigeOpener=$('reopenCard');$('prestigeStart').onclick()};
  prestigeDialog.addEventListener('keydown',function(e){if(e.key==='Escape')$('prestigeCancel').click();if(e.key==='Tab'){e.preventDefault();(document.activeElement===$('prestigeCancel')?$('prestigeConfirm'):$('prestigeCancel')).focus()}});
  $('prestigeConfirm').onclick=function(){var offer=prestigeOffer(state);if(!offer.eligible)return;var rank=offer.rank+1,sound=state.sound;state.perks.points+=offer.gain;var kept=keptBranch(state.empire.stores.map(function(s){return s.level}),STORES.map(function(_,i){return storeRate(state.empire,i)}),perkStart(state.perks).branchCap);resetRun(rank,sound,{branch:kept,shares:offer.total,lifetimeAll:offer.allTime,badges:state.empire.badges,stars:state.empire.stars,crosses:state.crosses,achievements:state.achievements,perks:state.perks,contracts:state.empire.contracts});prestigeDialog.hidden=true;save();showTray('factory');renderUI();notify('Reopened · +'+offer.gain+' shares · '+offer.multiplier.toFixed(2).replace(/0$/,'')+'× sales','upgrade')};
  var droneRow=document.createElement('div');droneRow.className='shop-upgrade';droneRow.innerHTML='<div class="shop-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="11" y="11" width="10" height="9" rx="2"/><path d="m11 12-5-5m15 5 5-5m-15 12-5 6m15-6 5 6M2 7h8m12 0h8M2 25h8m12 0h8M13 24h6"/></svg></div><div class="shop-copy"><h2>Auto drone</h2><strong id="autoDroneBenefit">Send a ready order every 10s</strong></div><button id="buyAutoDrone"><span>Install</span><b id="autoDronePrice"></b></button>';
  document.querySelector('[data-pane="boosts"]').append(droneRow);
  var droneControl=document.createElement('div');droneControl.className='auto-drone-control';droneControl.innerHTML='<span class="drone-glyph" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 10h6v4H9zM4 6h3M17 6h3M5.5 6v4h3.5M18.5 6v4H15M9 14l-3 4M15 14l3 4"/></svg></span><div><strong>Auto drone</strong><small id="autoDroneStatus"></small></div><button id="autoDroneToggle" type="button" class="drone-switch"></button><button id="autoDroneBulk" type="button" hidden></button>';document.querySelector('.dispatch-desk').append(droneControl);
  // The pickup window's row above the drone's: how its line is doing, and its two upgrades.
  var windowControl=document.createElement('div');windowControl.className='window-control';windowControl.innerHTML='<span class="drone-glyph" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V8h16v12M3 8h18M7 8v6h10V8M6 14h12M9 4h6"/></svg></span><div><strong>Pickup window</strong><small id="windowStatus"></small></div><button id="buyHatch" type="button"><span>Line of 10</span><b></b></button><button id="buyTips" type="button"><span>+25% tips</span><b></b></button>';droneControl.before(windowControl);
  $('buyHatch').onclick=function(){purchaseWindowUpgrade('hatch',HATCH_COST,'SECOND HATCH OPEN · line of 10, quicker hand-off')};
  $('buyTips').onclick=function(){purchaseWindowUpgrade('tips',TIPS_COST,'TIP JAR OUT · walk-ups pay 25% more')};
  var deliverySite=document.createElement('div');deliverySite.className='delivery-site';deliverySite.id='deliverySite';deliverySite.innerHTML='<h2>Open a pickup window</h2><div class="delivery-preview"><canvas id="deliveryPreview" width="600" height="720" role="img" aria-label="Preview of the finished pickup window with its hatch, ledge and glass parcel tube"></canvas></div><ul class="delivery-benefits"><li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 21V12h10v9M5 12h14M9 8a3 3 0 1 0 6 0 3 3 0 1 0-6 0"/></svg><strong>Walk-up</strong><span>pickup</span></li><li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 8a8 8 0 0 0-14-3L3 8m0-5v5h5m-4 8a8 8 0 0 0 14 3l3-3m0 5v-5h-5"/></svg><strong>Auto</strong><span>clerk serves</span></li><li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 17 6-6 4 4 8-10m-6 0h6v6"/></svg><strong>+33%</strong><span>per unit</span></li></ul><div class="delivery-build"><div class="delivery-funding"><small id="deliveryFundingText"></small><progress id="deliveryFunding" max="100" value="0" aria-label="Cash toward delivery pad"></progress></div><button id="buildDelivery" type="button"><span>Build delivery pad</span><b>'+fmt(AUTO_DRONE_COST)+'</b></button></div>';document.querySelector('.dispatch-desk').prepend(deliverySite);$('buildDelivery').onclick=purchaseWindow;
  // Paying starts the deck's build (builds.js); completeBuilds opens it when the time is up.
  function renderWindowControl(){var w=state.pickupWindow;if(!w.owned)return;
    var queued=windowLineMax(w)-windowRoom(windowLine,w),status=queued+' / '+windowLineMax(w)+' in line';if($('windowStatus').textContent!==status)$('windowStatus').textContent=status;
    [['buyHatch','hatch',HATCH_COST,'Second hatch: line of 10, quicker hand-off'],['buyTips','tips',TIPS_COST,'Tip jar: walk-up orders pay 25% more']].forEach(function(u){var b=$(u[0]),own=w[u[1]];b.disabled=own||state.money<u[2];b.classList.toggle('is-owned',own);var price=own?'Built':fmt(u[2]);if(b.querySelector('b').textContent!==price)b.querySelector('b').textContent=price;b.setAttribute('aria-label',u[3]+(own?', built':', '+fmt(u[2])))})}
  function purchaseWindow(){if(windowOpen()||isBuilding(state.builds,'window')||state.money<WINDOW_COST)return;state.money-=WINDOW_COST;startBuild(state.builds,'window');telemetry.once('pickup_window_paid');save();renderUI();notify('PICKUP WINDOW UNDER CONSTRUCTION · opens in '+buildClock(buildLeft(state.builds,'window')),'upgrade')}
  // The window's two upgrades, each bought once: a second hatch (longer line, quicker hand-off) and a tip jar.
  function purchaseWindowUpgrade(key,price,message){var w=state.pickupWindow;if(!w.owned||w[key]||state.money<price)return;state.money-=price;w[key]=true;telemetry.once('pickup_window_'+key);save();renderUI();notify(message,'upgrade')}
  // The drone port comes after the window.
  function purchaseAutoDrone(){if(!windowOpen()||isBuilding(state.builds,'deck'))return;if(payAutoDrone(state)){startBuild(state.builds,'deck');telemetry.once('delivery_pad_paid');save();renderUI();notify('DELIVERY PAD UNDER CONSTRUCTION · opens in '+buildClock(buildLeft(state.builds,'deck')),'upgrade')}}
  // Opens whatever finished building, live or while the game was closed.
  function completeBuilds(){finishBuilds(state.builds).forEach(function(key){
    if(key==='lounge'){var wasLot=!state.lounge;state.lounge=Math.max(1,state.lounge);if(!wasLot)return;buildRise[7]=1;burst({x:LOUNGE_DOOR.x,z:LOUNGE_DOOR.z},'#f0a7c8');telemetry.send('lounge_tier',{tier:state.lounge});notify('LOUNGE OPEN · '+loungeTier(state.lounge).name,'upgrade');paintThumbnails();updateMarkers.key=null;render.invalidated=true}
    if(key==='window'){if(state.pickupWindow.owned)return;state.pickupWindow.owned=true;burst({x:PICKUP_WINDOW.x,z:PICKUP_WINDOW.z,y:1.6},'#dbc38b');telemetry.once('pickup_window_built');notify('PICKUP WINDOW OPEN · web orders start','upgrade');render.invalidated=true}
    if(key==='deck'){if(state.autoDrone.owned)return;grantAutoDrone(state);telemetry.once('delivery_pad_built');notify('DELIVERY PAD BUILT · drones take the rest','upgrade');render.invalidated=true}
    renderUI();save()})}
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
  (function(){var icons={seedBatchLevel:'<path d="M6 26h20M9 26V14h14v12M12 14V8h8v6M16 8V4"/>',growBatchLevel:'<path d="M6 6h20M8 6v4h16V6M12 10v4m8-4v4M9 28h14l-1-8H10Z"/>',harvestBatchLevel:'<path d="M8 8l16 16M8 24 24 8M8 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm0 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>',packSpeedLevel:'<path d="M4 10h18v14H4zM22 14h5l2 3v7h-7M8 24a2 2 0 1 0 4 0m10 0a2 2 0 1 0 4 0"/>',serviceLevel:'<path d="M4 24h24M6 24V12h20v12M12 12V7h8v5M4 16h24"/>',signLevel:'<path d="M16 28V10M8 10h16l3 4-3 4H8Z"/>',loyaltyLevel:'<path d="M4 9h24v14H4zM4 14h24M9 19h6"/>',basketLevel:'<path d="M5 12h22l-2 14H7ZM10 12l3-7m9 7-3-7M12 17v5m4-5v5m4-5v5"/>',terpeneLevel:'<path d="M12 4h8M14 4v8L6 26h20L18 12V4M10 20h12"/>',breedingLevel:'<path d="M16 28V14M16 14c-6 0-9-4-9-9 6 0 9 4 9 9Zm0 0c6 0 9-4 9-9-6 0-9 4-9 9ZM6 28h20"/>',displayLevel:'<path d="M5 10h22v16H5zM5 18h22M9 10V6h14v4"/>',trendLevel:'<path d="M4 24 12 15l5 5 11-11M20 9h8v8"/>',fleetLevel:'<path d="M12 12h8v6h-8zM4 8h5M23 8h5M6 8v4h6M26 8v4h-6M12 18l-3 6M20 18l3 6"/>',cargoLevel:'<path d="M4 10h24v14H4zM4 16h24M12 10v14m8-14v14"/>',repeatLevel:'<path d="M6 14a10 10 0 0 1 17-6l3 3M26 6v6h-6M26 18a10 10 0 0 1-17 6l-3-3M6 26v-6h6"/>',offlineLevel:'<path d="M5 6h22v20H5zM5 26v2m22-2v2M16 16m-5 0a5 5 0 1 0 10 0a5 5 0 1 0-10 0M16 11v2m0 6v2m5-5h-2m-6 0h-2"/>'};
    var blurbs={seedBatchLevel:'Deeper trays start more seedlings per cycle.',growBatchLevel:'Brighter lights fatten every grow batch.',harvestBatchLevel:'Robots trim more flower per pass.',packSpeedLevel:'Machines bag flower faster than hands can.',serviceLevel:'Both counters hand off customers quicker.',signLevel:'Street signs pull more walk-ins through the door.',loyaltyLevel:'Happy customers tip more when they carry your card.',basketLevel:'Customers take a little more home each visit.',terpeneLevel:'Raises the THC of every strain on the menu.',breedingLevel:'Breeds boutique strains that grow closer to everyday speed.',displayLevel:'Boutique flower sells for more in lit cases.',trendLevel:'Spots trends early so the trending strain pays out more.',fleetLevel:'More couriers on the pad: shorter gaps between launches.',cargoLevel:'Bulk runs carry extra orders per launch.',repeatLevel:'A share of web customers order again right away.',offlineLevel:'Keeps earning longer while you are away, four more hours per level.'};
    var pane=document.querySelector('[data-pane="boosts"]'),anchor=pane.querySelector('.shop-milestone')||null;
    COMPONENTS.forEach(function(c,i){if(document.getElementById('componentBuy'+i))return;var card=document.createElement('div');card.className='shop-upgrade shop-feature';card.innerHTML='<div class="shop-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+icons[c.key]+'</svg></div><div class="shop-copy"><h2>'+c.name+'</h2><strong id="componentBenefit'+i+'"></strong><small>'+blurbs[c.key]+'</small><small id="componentLevel'+i+'"></small></div><button id="componentBuy'+i+'"><span>Upgrade</span><b id="componentPrice'+i+'"></b></button>';pane.insertBefore(card,anchor)});
  })();
  $('expandOrderCounter').onclick=expandOrderCounters;$('buyOrderCounter').onclick=expandOrderCounters;
  var shopBrowser=mountShopBrowser({getState:function(){return state},components:COMPONENTS,kiosks:kioskCount,queueLimit:queueLimit,openDeliveries:function(){showTray('orders')},deliveryDesk:function(){var building=isBuilding(state.builds,'window');return{built:onlineOpen(),building:building,clock:buildClock(buildLeft(state.builds,'window')),waiting:onlineRequestsReady(),price:fmt(WINDOW_COST),ready:!building&&state.money>=WINDOW_COST,progress:building?1-buildShareLeft(state.builds,'window'):Math.min(1,state.money/WINDOW_COST),toGo:fmt(Math.max(0,WINDOW_COST-state.money))}},recommendInfo:function(){var r=recommendation(),shelf=r.kind==='component'||r.kind==='fork';return{name:r.name,where:shelf?shopBrowser.categories[shopBrowser.categoryOf('componentBuy'+r.index)]:'Stations',price:fmt(r.price),id:shelf?'componentBuy'+r.index:null,fork:r.kind==='fork'?r.fork:null,affordable:state.money>=r.price}},recommend:function(open){var r=recommendation();if(open){actOnRecommendation();return ''}return r.name+' · '+(r.kind==='component'||r.kind==='fork'?'in '+shopBrowser.categories[shopBrowser.categoryOf('componentBuy'+r.index)]+' · ':'upgrade ')+fmt(r.price)}});
  var operationsUI=mountOperations({getState:function(){return state},format:fmt,changed:function(message){save();renderUI();if(message)notify(message,'upgrade')},visit:function(i,manage){visitStore(i+1,!manage);if(manage)manageViewedStore()}});
  function renderManagement(){
    var p=state.empire,report=p.returnReport,investment=recommendation();
    $('returnSummary').hidden=!report;
    if(report){$('returnTotal').textContent='+'+fmt(report.earnings.reduce(function(a,n){return a+n},0));$('returnTime').textContent=duration(report.seconds*1000)+' away · '+Math.round(offlineCap()/3600)+'-hour cap at 1× rate';$('returnEarnings').hidden=report.earnings.filter(function(n){return n>0}).length<2;$('returnEarnings').innerHTML=report.earnings.map(function(n,i){return n>0?'<li><span>'+(['Home store'].concat(STORES.map(function(s){return s.name})))[i]+'</span><strong>'+fmt(n)+'</strong></li>':''}).join('');$('returnGoals').hidden=!report.goals;$('returnGoals').textContent=report.goals===1?'1 goal ready to claim':report.goals+' goals ready to claim';}
    $('nextInvestment').textContent='Next improvement: '+investment.name+' · '+fmt(investment.price)+(state.money<investment.price?' ('+fmt(investment.price-state.money)+' to go)':' · ready');
    settleGoals(state);var goalsReady=[0,1,2].filter(function(i){var g=goalStatus(p,i,rewardScale());return g.progress>=g.target}).length;if($('goalsBadge')){$('goalsBadge').textContent=goalsReady;$('goalsBadge').hidden=!goalsReady;$('goalsOpen').classList.toggle('has-ready',goalsReady>0);if($('shiftGoalsReady'))$('shiftGoalsReady').textContent=goalsReady?goalsReady+' ready':'';if($('shiftProgress')){var shiftNow=shiftStatus(p,rewardScale()),left=3-shiftNow.done,shiftHtml='<span>Shift '+abbr(shiftNow.number)+'</span><span class="shift-pips" aria-hidden="true">'+[0,1,2].map(function(k){return '<i'+(k<shiftNow.done?' class="done"':'')+'></i>'}).join('')+'</span><span>'+(left===1?'1 more goal':left+' more goals')+' for a '+fmt(shiftNow.bonus)+' bonus</span>';if($('shiftProgress').dataset.html!==shiftHtml){$('shiftProgress').innerHTML=shiftHtml;$('shiftProgress').dataset.html=shiftHtml}}}
    [0,1,2].forEach(function(i){var g=goalStatus(p,i,rewardScale());$('goalTitle'+i).textContent=g.title;$('goalProgress'+i).value=g.progress/g.target*100;$('goalCount'+i).textContent=(g.kind==='revenue'?fmt(g.progress)+' / '+fmt(g.target):abbr(g.progress)+' / '+abbr(g.target))+(g.hint&&g.progress<g.target?' · '+g.hint:'');$('goalClaim'+i).textContent='Collect '+fmt(g.reward);$('goalClaim'+i).disabled=g.progress<g.target;$('goalClaim'+i).classList.toggle('ready',g.progress>=g.target);});
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
    renderStoreView();renderManagement();operationsUI.render();if(shopPlayUI)shopPlayUI.render();
    var p=state.empire,d=dailyStatus(p,Date.now(),rewardScale()),m=CAREER[p.career];
    $('careerName').textContent=m?m.name:'Bud empire complete';
    $('careerDetail').textContent=m?fmt(state.lifetime)+' / '+fmt(m.goal)+' lifetime revenue':'All six career milestones collected.';
    $('careerProgress').value=m?Math.min(100,state.lifetime/m.goal*100):100;
    $('careerBonus').textContent='Permanent sale bonus: +'+(p.career*5)+'% · '+p.career+' / 6 milestones';
    $('careerClaim').disabled=!m||state.lifetime<m.goal;
    $('careerClaim').textContent=m?'Collect '+fmt(m.reward)+' + 5% sale bonus':'Career complete';
    $('branchSummary').textContent=(1+p.stores.filter(function(s){return s.level>0}).length)+'/'+(STORES.length+1)+' open · '+fmt(branchIncome(p)*state.gameSpeed)+'/s';
    STORES.forEach(function(store,i){var level=p.stores[i].level,gated=!branchOpenable(p,i),locked=state.lifetime<store.goal||gated,max=level>=10,lockText=gated?'Finish '+STORES[i-1].name:'Unlock at '+fmt(store.goal);
      // Store row: level pips and an income figure instead of a sentence; unopened stores show a lock and the opening price.
      var pips='';for(var pip=0;pip<10;pip++)pips+='<i'+(pip<level?' class="on"':'')+'></i>';
      var rowHtml=level?'<span class="store-level" title="Level '+level+' of 10"><span class="store-pips">'+pips+'</span><b>Lv '+level+'</b></span><span class="store-income"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M9.5 10a2.5 2 0 0 1 5 0c0 2.5-5 1.5-5 4a2.5 2 0 0 0 5 0"/></svg>'+fmt(storeRate(p,i)*state.gameSpeed)+'/s</span>':
        '<span class="store-locked'+(locked?' is-locked':'')+'"><svg viewBox="0 0 24 24" aria-hidden="true">'+(locked?'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>':'<path d="M4 20V9l8-5 8 5v11M9 20v-6h6v6"/>')+'</svg>'+(locked?lockText:'Open · '+fmt(storeCost(p,i)))+'</span><span class="store-income muted">'+fmt(store.rate*saleMultiplier(p)*Math.max(1,p.retailBoost||1))+'/s</span>';
      if($('branchLevel'+i).dataset.html!==rowHtml){$('branchLevel'+i).innerHTML=rowHtml;$('branchLevel'+i).dataset.html=rowHtml}
      $('branchHint'+i).textContent=locked?(gated?'Earn all 3 stars at '+STORES[i-1].name:'Unlock at '+fmt(store.goal)+' revenue'):max?'':'Next: +'+fmt(nextStoreRate(p,i)-storeRate(p,i))+'/s';$('branchHint'+i).hidden=max;$('branchBuy'+i).hidden=max;$('projectSummary'+i).parentElement.hidden=!level;
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
    renderContract();
    var special=weeklySpecial(Date.now());$('weeklySpecial').innerHTML='<b>This week: '+special.name+'</b> · '+special.detail;
    var w=seasonStatus(p,Date.now(),rewardScale());$('seasonCard').classList.toggle('is-between',!w);
    if(!w){var upcoming=nextSeason(Date.now());$('seasonKicker').textContent='Next seasonal event';$('seasonName').textContent=upcoming.name;$('seasonCopy').textContent=upcoming.copy;var wait=upcoming.start-Date.now();$('seasonTime').textContent='Starts in '+(wait>=86400000?Math.floor(wait/86400000)+'d '+Math.floor(wait%86400000/3600000)+'h':duration(wait));$('seasonClaim').disabled=true}
    else{var unit=w.kind==='pickup'?' customers':w.kind==='online'?' orders':'',show=function(v){return w.kind==='revenue'?fmt(v):abbr(v)+unit};
    $('seasonKicker').textContent='Seasonal event';$('seasonName').textContent=w.name;$('seasonCopy').textContent=w.copy;
    $('seasonTime').textContent='Ends in '+(w.remaining>=86400000?Math.floor(w.remaining/86400000)+'d '+Math.floor(w.remaining%86400000/3600000)+'h':duration(w.remaining));
    Array.prototype.forEach.call($('seasonTiers').children,function(li,i){var done=i<w.claimed,ready=i<w.reached&&!done,share=Math.min(1,w.progress/w.targets[i]);li.className=done?'is-collected':ready?'is-ready':'';li.style.setProperty('--fill',(share*100).toFixed(1)+'%');li.innerHTML='<span>'+show(w.targets[i])+'</span><b>'+(done?'Collected':ready?'Ready':Math.round(share*100)+'%')+'</b>'+(i===2?'<small>+ '+w.name+' badge</small>':'')});
    $('seasonClaim').textContent=w.next>=0?'Collect '+fmt(w.reward):w.claimed>=3?'Ladder complete':show(w.progress)+' so far';$('seasonClaim').disabled=w.next<0}
    $('seasonBadges').textContent=p.badges.length?'Badges: '+p.badges.map(function(b){var d=SEASONS.concat(RETIRED_WEEKLY).filter(function(s){return s.id===b})[0];return d?d.name:b}).join(' · '):'Finish a ladder to earn its badge.';
    $('eventTrophies').textContent=p.trophies+' '+(p.trophies===1?'trophy':'trophies')+' · '+p.rewards.filter(Boolean).length+' / 3 scene keepsakes collected';
  }
  $('seasonClaim').onclick=function(){var reward=claimSeason(state,Date.now(),rewardScale());if(reward){save();renderUI();notify((state.empire.season.claimed===3?'LADDER COMPLETE · BADGE · +':'EVENT STEP · +')+fmt(reward),'upgrade')}};
  $('dailyClaim').onclick=function(){var reward=claimDaily(state,Date.now(),rewardScale());if(reward){save();renderUI();notify('DAILY REWARD · +'+fmt(reward),'upgrade')}};
  $('careerClaim').onclick=function(){var reward=claimCareer(state);if(reward){save();renderUI();notify('CAREER MILESTONE · +'+fmt(reward)+' · +5% sale value','upgrade')}};
  // Opening a store for the first time takes you straight to its map; later upgrades stay on the management pane.
  STORES.forEach(function(store,i){$('branchBuy'+i).onclick=function(){var opening=state.empire.stores[i].level===0;if(buyStore(state,i)){if(opening)telemetry.send('store_opened',{store:store.name});save();renderUI();notify(opening?store.name+' is open · +'+fmt(state.empire.network.stores[i].incomeGain)+'/s':store.name+' upgraded · +'+fmt(state.empire.network.stores[i].incomeGain)+'/s','upgrade');if(opening)visitStore(i+1)}}});
  // Contracts: one offer at a time, started when the player likes; the HUD pill tracks the running one.
  // What the shop does per minute right now in a contract's terms, with its twist applied: customers are the slower of the
  // door and the line's output, VIPs a third of them, a type contract half the units. Deliveries and big spenders scale by income.
  function contractPace(def){var units=Math.min.apply(null,LINES.map(function(_,i){return stationThroughput(i)})),door=1/arrivalInterval()*(def.twist==='traffic'?1.5:1),customers=60*Math.min(door,units/basketSize());
    return def.kind==='pickup'?customers:def.kind==='vip'?customers/3:def.kind==='edible'||def.kind==='preroll'?customers*basketSize()/2:0}
  function clock(ms){var t=Math.max(0,Math.ceil(ms/1000));return Math.floor(t/60)+':'+String(t%60).padStart(2,'0')}
  function renderContract(){
    var p=state.empire,c=activeContract(p),o=c?null:contractOffer(state,rewardScale(),contractPace),k=p.contracts,show=c||o;
    $('contractKicker').textContent=c?'Contract running':'Contract';
    $('contractName').textContent=show?show.name:'No contract yet';
    $('contractGoal').textContent=show?show.goal:'';
    $('contractTwist').innerHTML=show?'<b>Twist</b> · '+show.twistCopy:'';
    $('contractTime').textContent=c?abbr(c.progress)+' / '+abbr(c.target)+' · '+clock(c.remaining)+' left':'Reward · 2× sales boost, 10 min';
    $('contractStart').hidden=!!c;$('contractSkip').hidden=!!c;$('contractStart').disabled=!o;$('contractStart').textContent='Start · '+(o?o.minutes:30)+' min';
    var boosting=k.boost>0;$('contractBoostRow').hidden=!k.bank&&!boosting;
    $('contractBank').textContent=boosting?'Boost running · '+clock(k.boost*1000/Math.max(1,state.gameSpeed||1)):k.bank+' '+(k.bank===1?'boost':'boosts')+' banked · 2× for 10 min';
    $('contractBoost').hidden=!k.bank;$('contractBoost').textContent=boosting?'Add 10 min':'Use boost';
  }
  function contractSettled(r){
    if(r.done){telemetry.send('contract_done',{id:r.done.id});notify('CONTRACT DONE · '+r.done.name.toUpperCase()+' · BOOST BANKED','upgrade')}
    else{telemetry.send('contract_expired',{id:r.expired.id,share:Math.round(r.expired.progress/r.expired.target*100)});notify('Contract ran out · '+r.expired.name+' · '+abbr(r.expired.progress)+' / '+abbr(r.expired.target))}
    save();renderUI()}
  $('contractStart').onclick=function(){var c=startContract(state,Date.now(),rewardScale(),contractPace);if(!c)return;if(c.twist==='spender')state.spenderClock=Math.min(state.spenderClock,60);telemetry.send('contract_start',{id:c.id});notify('CONTRACT · '+c.name.toUpperCase()+' · '+c.twistCopy);save();renderUI()};
  $('contractSkip').onclick=function(){if(skipContract(state,Date.now(),rewardScale())){save();renderUI()}};
  $('contractBoost').onclick=function(){if(useContractBoost(state.empire)){telemetry.send('contract_boost',{bank:state.empire.contracts.bank});notify('BOOST · 2× SALES FOR 10 MIN','upgrade');save();renderUI()}};
  // The bottleneck button carries what to buy on one line and its price, in figures, on the next.
  function flowButton(label,price){var html='<span>'+label+'</span>'+(price?'<b>'+price+'</b>':'');if($('flowAction').dataset.html!==html){$('flowAction').innerHTML=html;$('flowAction').dataset.html=html}$('flowAction').classList.toggle('has-price',!!price)}
  function flowMeter(ratio){var fill=$('flowMeter');if(fill)fill.style.width=Math.round(Math.max(.04,Math.min(1,ratio||0))*100)+'%'}
  // The whole bottleneck line is the target; the button inside becomes its chevron.
  var flowGuide=document.querySelector('.flow-guide');if(flowGuide){flowGuide.setAttribute('role','button');flowGuide.setAttribute('tabindex','0');flowGuide.addEventListener('click',function(e){if(e.target!==$('flowAction'))$('flowAction').click()});flowGuide.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();$('flowAction').click()}});$('flowAction').setAttribute('tabindex','-1');$('flowAction').setAttribute('aria-hidden','true');}
  // A flag beside the customer count opens the Goals tab.
  var goalsButton=document.createElement('button');goalsButton.type='button';goalsButton.id='goalsOpen';goalsButton.setAttribute('aria-label','Open goals');goalsButton.title='Goals';
  goalsButton.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg><span id="goalsBadge" hidden></span>';
  $('customerStatus').appendChild(goalsButton);
  // Shift goals open the Goals tab (the Empire shell places this block there); the flag is a shortcut to it.
  var goalsBody=document.createElement('section');goalsBody.className='goals-body empire-group';goalsBody.setAttribute('aria-labelledby','goalsTitle');
  goalsBody.innerHTML='<div class="goals-head"><h2 class="empire-group-title" id="goalsTitle">Shift goals</h2><span id="shiftGoalsReady"></span></div>';
  var nextStepsHeading=today.querySelector('h2:not(.empire-section-heading)');if(nextStepsHeading)nextStepsHeading.remove();
  // The next improvement already leads the bottleneck card in the sheet, so the goals list leaves it out.
  $('nextInvestment').hidden=true;
  // Shift goals lead the block; the story card follows underneath.
  var shiftLine=document.createElement('p');shiftLine.id='shiftProgress';goalsBody.append($('shortGoals'),shiftLine);document.body.append(goalsBody);
  function openGoals(){showTray('goals');renderUI()}
  function closeGoals(){}
  goalsButton.onclick=function(){if(activeTray==='goals'&&panelOpen)collapsePanel();else openGoals()};
  var empireShell=mountEmpireShell({fit:fitControls,getState:function(){return state},format:fmt});
  var shopPlayCollapsed=false;
  shopPlayUI=mountShopPlay({getState:function(){return state},getMoment:function(){return moment},getAlerts:function(){return operationsAlerts(state.empire)},names:STRAINS.map(function(s){return s.name}),format:fmt,changed:save,
    // On a phone, or where the side panel would sit under the list, the sheet steps aside while shop activity is open.
    opening:function(){var sheet=$('sheet').getBoundingClientRect(),reach=(width<780?12:76)+Math.min(360,width-24);shopPlayCollapsed=panelOpen&&(width<780||sheet.left<reach+12);if(shopPlayCollapsed)collapsePanel()},
    closing:function(){if(shopPlayCollapsed){shopPlayCollapsed=false;showTray(activeTray)}},
    choose:function(index){
      if(!moment)return;var result=judgeChoice(moment,index),guest=customers.find(function(c){return c.id===moment.customerId&&!c.ordered});
      if(!result||!guest)return;
      guest.momentMatched=result.matched;guest.momentChoice=result.option;guest.momentName=moment.name;guest.consultRemaining=2/(1+state.staff[4]*.15+state.serviceLevel*.12);
      shopPlayUI.feedback(result.matched?'Good match · '+guest.momentName+' will tip at pickup':'Thanks for the suggestion · the team will finish the usual order');
      moment=null;if(navigator.vibrate)navigator.vibrate(10);save();renderUI();
    },
    skip:function(){moment=null;save();renderUI()},
    navigate:function(target){
      if(target.station!==undefined)return selectMachine(target.station);
      if(target.moment)return shopPlayUI.open();
      visitStore(target.store+1,false);showTray('empire');empireShell.openStore(target.store);operationsUI.showTab(target.store,target.tab);
      if(target.transferTo!==undefined){var to=document.querySelector('#transferTo'+target.store+' [data-value="'+target.transferTo+'"]');if(to)to.click()}
      if(target.line!==undefined){var line=document.querySelector('#deliveryLine'+target.store+' [data-value="'+target.line+'"]');if(line)line.click()}
      var control=$(target.control);if(control){if(target.details&&control.closest('details'))control.closest('details').open=true;control.scrollIntoView({block:'center'});control.focus({preventScroll:true})}
      fitControls();
    }});
  var journeyUI=mountJourney({getState:function(){return state},openGoals:openGoals,navigate:function(destination){
    closeGoals();if(destination==='pickup')return selectMachine(5);if(destination==='stations'){var r=recommendation();if(state.lines[r.index]<3)return selectMachine(r.index);return selectMachine(state.lines.findIndex(function(n){return n<3}));}
    if(destination==='flowers')return showTray('flowers');showTray('empire');if(destination==='empire'){empireShell.show('home');return;}
    var i=destination==='regulars'?state.empire.network.stores.findIndex(function(b){return !b.relationship}):0;empireShell.openStore(Math.max(0,i));if(destination==='mara'||destination==='regulars'){var people=$('opTab'+Math.max(0,i)+'2');if(people)people.click();}
  }});
  var startGuide=mountStartGuide({showTray:showTray,collapse:function(){showTray('factory')},fit:fitControls,paintHero:paintIntroArt,sound:function(kind){playSound(kind,state.sound)},report:function(name,props){telemetry.send(name,props)},
    // Construction steps: the guide asks whether a site is built, builds it on a tap, opens the shop at the end and, if
    // skipped, finishes the job itself. The sheet drops away at every size so the map stays in view; a sheet left open
    // before a reset or reload would otherwise cover the sites on desktop.
    isBuilt:isBuilt,build:buildStation,shopOpen:function(){return state.shopOpen},openShop:openShop,finish:finishConstruction,
    sheet:collapsePanel,reserve:function(px){guideReserve=px;fitControls()},
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
  canvas.addEventListener('pointerup',function(e){mapHintActivity();if(!gestureMoved&&Object.keys(touches).length===1&&state.empire.activeStore){var br=canvas.getBoundingClientRect(),f=BRANCH_THEMES[state.empire.activeStore-1].focus,q=project(f.x,f.y,f.z);if(Math.hypot(e.clientX-br.left-q.x,e.clientY-br.top-q.y)<Math.max(45,unit*3))manageViewedStore()}else if(!gestureMoved&&Object.keys(touches).length===1){var rect=canvas.getBoundingClientRect(),best=-1,distance=60;machinePos.forEach(function(pos,i){var p=project(pos.x,1.4+(pos.y||0),pos.z),d=Math.hypot(e.clientX-rect.left-p.x,e.clientY-rect.top-p.y);if(d<distance){best=i;distance=d}});orderCounterPositions(state.orderCounters).forEach(function(pos){var p=project(pos.x,1.4,pos.z),d=Math.hypot(e.clientX-rect.left-p.x,e.clientY-rect.top-p.y);if(d<distance){best=4;distance=d}});var online=project(-10.7,8.45,1.5),od=Math.hypot(e.clientX-rect.left-online.x,e.clientY-rect.top-online.y);if(od<distance){showTray('orders');renderUI()}else if(best>=0)selectMachine(best);else if(mapPicked){mapPicked=false;renderUI()}}delete touches[e.pointerId];if(Object.keys(touches).length)gestureMoved=true;else gestureOrigin=null});
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
  // The card's button buys the recommended fix when affordable; otherwise it shows the price outlined and says what is missing.
  // The counters are only "traffic bound" while an arrivals booster can still be bought; once both are maxed the fix is the station itself.
  function isTrafficBound(slow){return slow>=4&&trafficFix()!==null&&basketSize()/arrivalInterval()<stationThroughput(slow)}
  // Customers arrive too slowly for the counters. Floor flow (+15% arrivals a level) and Street signage (+4%) both bring
  // more through the door: recommend whichever buys the most arrivals per dollar, and while only one of them is within
  // reach — the cash in hand plus a minute and a half of income — that one, so a $174M line never heads the list
  // when a $23M one does the same job.
  function trafficFix(){
    var options=[{index:0,gain:.15},{index:COMPONENTS.findIndex(function(c){return c.key==='signLevel'}),gain:.04}]
      .filter(function(o){return componentAdvisable(o.index)&&state[COMPONENTS[o.index].key]<COMPONENTS[o.index].max})
      .map(function(o){var price=componentCost(o.index);return{kind:'component',index:o.index,name:COMPONENTS[o.index].name,price:price,value:o.gain/price,reach:price<=state.money+incomeRate()*90?1:0}});
    options.sort(function(a,b){return (b.reach-a.reach)||(b.value-a.value)});
    return options[0]||null;
  }
  // The single answer to "what should I upgrade next?": the counters are only starved of customers if an arrivals booster can
  // still be bought, in which case the better-value one is the fix; otherwise it is the slowest station itself.
  function legacyRecommendation(){var slow=slowestStation();if(isTrafficBound(slow))return trafficFix();return{kind:'station',index:slow,name:['Seeds','Grow','Harvest','Pack','Orders','Pickup'][slow],price:cost(slow)}}
  // The next purchase is the one that adds the most income per dollar. Each station level and shop upgrade is tried in place
  // and undone, so a counter already at its handoff floor (where more levels cannot speed it up) is never the answer; the
  // fix is then whatever lifts bags per customer, arrivals or prices. Purchases within about five minutes of income are
  // preferred, so a distant upgrade never heads the list when an affordable one does real work.
  // Upgrades that only pay every few levels (the order desk's basket grows every second level) are looked at a few levels
  // ahead and valued on the total they cost, so a counter at its handoff floor is never bought over and over for nothing.
  function recommendation(){
    var base=incomeRate(),reach=Math.max(0,state.money)+base*300,best=null,bestReach=null,LOOKAHEAD=6;
    function consider(r){r.value=r.gain/r.spend;if(!best||r.value>best.value)best=r;if(r.price<=reach&&(!bestReach||r.value>bestReach.value))bestReach=r}
    function tryLevels(get,set,limit){var start=get();var found=economy.stepsToGain(function(k){set(start+k);var gain=incomeRate()-base;set(start);return gain},limit,base*1e-4);return found}
    // Each tier level (10, 20, 30, 50, 75, 100) doubles a station's output, and lifting both counters to a tier doubles every
    // basket; those jumps sit further off than the six-level look, so the next tier is priced as one bundle too.
    LINES.forEach(function(_,i){if(!state.lines[i]||!isOpen(i))return;var name=['Seeds','Grow','Harvest','Pack','Orders','Pickup'][i],level=state.lines[i],spend=0,k;
      var found=tryLevels(function(){return state.lines[i]},function(v){state.lines[i]=v},LOOKAHEAD);
      if(found){for(k=0;k<found.steps;k++)spend+=economy.stationCost(LINES[i].base,level+k);consider({kind:'station',index:i,name:name,price:cost(i),spend:spend,gain:found.gain})}
      var tier=TIER_LEVELS.find(function(l){return l>level});if(!tier||tier-level<=LOOKAHEAD)return;
      state.lines[i]=tier;var tierGain=incomeRate()-base;state.lines[i]=level;if(!(tierGain>base*1e-4))return;
      for(spend=0,k=level;k<tier;k++)spend+=economy.stationCost(LINES[i].base,k);consider({kind:'station',index:i,name:name,price:cost(i),spend:spend,gain:tierGain})});
    // Stations tied for slowest only pay together: raising one alone leaves the others holding the line, so on its own
    // it never shows a gain and the button kept buying shop upgrades instead. Price the tied group as one step and point
    // the button at its cheapest member; each tap lifts one, and the rest stay tied until they are all raised.
    var rates=LINES.map(function(_,i){return state.lines[i]&&isOpen(i)?stationThroughput(i):Infinity}),floor=Math.min.apply(null,rates);
    var tied=LINES.map(function(_,i){return i}).filter(function(i){return isFinite(rates[i])&&rates[i]<=floor*(1+1e-6)});
    if(tied.length>1){var levels=state.lines.slice(),targets=null,group=economy.stepsToGain(function(k){tied.forEach(function(i){state.lines[i]=levels[i]+k});var gain=incomeRate()-base;tied.forEach(function(i){state.lines[i]=levels[i]});return gain},LOOKAHEAD,base*1e-4);
      if(group)targets=tied.map(function(i){return levels[i]+group.steps});
      else{
        // A floored counter tied with a producer only moves at its next tier, so try lifting every tied station to its own next tier.
        targets=tied.map(function(i){return TIER_LEVELS.find(function(l){return l>levels[i]})||levels[i]+LOOKAHEAD});
        tied.forEach(function(i,n){state.lines[i]=targets[n]});var tierGain=incomeRate()-base;tied.forEach(function(i){state.lines[i]=levels[i]});
        group=tierGain>base*1e-4?{gain:tierGain}:null;
      }
      if(group){var spend=0;tied.forEach(function(i,n){for(var k=levels[i];k<targets[n];k++)spend+=economy.stationCost(LINES[i].base,k)});var first=tied.reduce(function(a,b){return cost(b)<cost(a)?b:a});consider({kind:'station',index:first,name:['Seeds','Grow','Harvest','Pack','Orders','Pickup'][first],price:cost(first),spend:spend,gain:group.gain})}}
    COMPONENTS.forEach(function(c,i){if(!componentUnlocked(i)||state[c.key]>=c.max)return;var start=state[c.key],found=tryLevels(function(){return state[c.key]},function(v){state[c.key]=v},Math.min(LOOKAHEAD,c.max-start));if(!found)return;var spend=0;for(var k=0;k<found.steps;k++){state[c.key]=start+k;spend+=componentCost(i)}state[c.key]=start;consider({kind:'component',index:i,name:c.name,price:componentCost(i),spend:spend,gain:found.gain})});
    // A second or third order counter and the self-order kiosks take more orders at once once the desk is at its handoff
    // floor, which no level can do.
    var counterPrice=orderCounterCost(state.orderCounters);if(counterPrice!==null){state.orderCounters++;var counterGain=incomeRate()-base;state.orderCounters--;if(counterGain>base*1e-4)consider({kind:'counter',name:'Order counter',price:counterPrice,spend:counterPrice,gain:counterGain})}
    var kioskStep=!state.kiosk?['kiosk',25000]:!state.secondKiosk?['secondKiosk',50000]:!state.thirdKiosk?['thirdKiosk',100000]:null;if(kioskStep){state[kioskStep[0]]=true;var kioskGain=incomeRate()-base;state[kioskStep[0]]=false;if(kioskGain>base*1e-4)consider({kind:'kiosk',name:'Kiosk',price:kioskStep[1],spend:kioskStep[1],gain:kioskGain})}
    var pick=bestReach||best||legacyRecommendation();
    // A fork still waiting on the player is named as the choice, not bought: the tap opens both sides in the Shop.
    if(pick.kind==='component'&&!componentAdvisable(pick.index)){var f=forkOf(COMPONENTS[pick.index].key);return{kind:'fork',fork:f.id,index:pick.index,name:f.name,price:pick.price}}
    return pick;
  }
  function openFork(index){showTray('boosts');if(shopBrowser&&shopBrowser.show)shopBrowser.show(shopBrowser.categoryOf('componentBuy'+index));renderUI();var card=$('componentBuy'+index).parentElement;if(card.scrollIntoView)card.scrollIntoView({block:'nearest'})}
  // A suggestion only points: a tap opens where the pick lives (its station, or its card in the Shop) and the player buys it there.
  function actOnRecommendation(){var r=recommendation();if(!r)return;if(r.kind==='station')return selectMachine(r.index);if(r.kind==='counter'||r.kind==='kiosk')return selectMachine(4);openFork(r.index)}
  $('flowAction').onclick=function(){if(state.gameSpeed===0)return setGameSpeed(1);if(!state.shopOpen){if(!state.doorBuilt)return buildStation('door');var next=state.lines.indexOf(0);return next<0?openShop():buildStation(next)}actOnRecommendation()};
  LINES.forEach(function(_,i){$('staffMax'+i).onclick=function(){trainStaffMax(i)}});
  $('trainIdChecker').onclick=function(){if(!state.doorBuilt)return buildStation('door');trainIdChecker(1)};
  $('trainIdCheckerMax').onclick=function(){trainIdChecker(10000)};
  $('useAbility').onclick=function(){if(!securitySelected&&!loungeSelected)triggerAbility(selected)};
  $('buyLift').onclick=function(){if(!buyLoungeLift(state))return;notify('SECOND LIFT · bigger take per guest','upgrade');renderUI();save()};
  $('trainLoungeStaff').onclick=function(){trainLoungeHost(1)};
  $('trainLoungeStaffMax').onclick=function(){trainLoungeHost(10000)};
  $('fulfillOnlineMax').onclick=function(){sendOnlineOrders(state.lines[3]>=10?Infinity:10)};
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){updateMarkers.key=null;render.invalidated=true});
  window.addEventListener('resize',resize);$('buyMachine').onclick=buySelected;$('buyMachineMax').onclick=buySelectedMax;$('upgradeStorage').onclick=upgradeStorage;$('boost').onclick=boostAll;$('claim').onclick=claimOrder;$('resetOpen').onclick=function(){$('resetModal').hidden=false};$('resetCancel').onclick=function(){$('resetModal').hidden=true};$('resetConfirm').onclick=function(){resetRun(0,state.sound)};function resetRun(rank,sound,carry){if(rank>0)telemetry.send('prestige',{rank:rank});state=fresh();moment=null;if(shopPlayUI)shopPlayUI.reset();state.empire.prestige=rank;state.sound=sound;if(carry){state.empire.shares=carry.shares;state.empire.lifetimeAll=carry.lifetimeAll;if(carry.contracts){state.empire.contracts.bank=carry.contracts.bank;state.empire.contracts.done=carry.contracts.done;state.empire.contracts.round=carry.contracts.round}state.empire.badges=carry.badges.slice();if(carry.stars)state.empire.stars=carry.stars.slice();state.crosses=carry.crosses;state.achievements=(carry.achievements||[]).slice();state.perks=carry.perks;var start=perkStart(state.perks);state.money+=start.money;state.offlineLevel=start.offlineLevel;state.startLine=start.line;
      // Run-shaping perks hand the new shop what it would otherwise buy in its first stretch.
      state.kiosk=start.kiosks>0;state.secondKiosk=start.kiosks>1;state.thirdKiosk=start.kiosks>2;
      for(var f=1;f<=start.formats;f++)state.productMenu.unlocked[f]=true;
      for(var k=1;k<=start.strains&&k<state.strains.length;k++){state.strains[k]=1;state.menuStrains.push(k)}
      if(start.drone){state.pickupWindow.owned=true;state.autoDrone={owned:true,enabled:true,remaining:0,bulk:start.drone>1,mode:start.drone>1?'bulk':'single'}}
      state.lounge=Math.max(state.lounge,start.lounge);
      if(carry.branch)state.empire.stores[carry.branch.index].level=carry.branch.level}
    // A prestige reopens a standing shop; Start over goes back to the building site and replays the intro.
    if(rank>0){state.lines=LINES.map(function(){return state.startLine||1});delete state.startLine;state.doorBuilt=true;state.shopOpen=true}
    readyWork=0;work=[0,0,0,0,0,0];batchRemainder=[0,0,0,0];customers=[];arrival=0;customerId=0;deliveryDrones=[];windowLine=createWindowLine();particles=[];tickets=[];taskClocks.fill(0);taskActivity.fill(0);cropGrowth=[.15,.4,.7,.95];tierFlashes.fill(0);buildRise.fill(0);confetti=[];recentPickupRatings=[];animationTime=0;sceneTime=0;crateTime=0;cargoOdo=0;render.last=undefined;securitySelected=false;loungeSelected=false;selected=0;updateMarkers.key=null;save();$('resetModal').hidden=true;notify(rank>0?'FACTORY RESET':'STARTING OVER');syncMapView();paintThumbnails();renderUI();if(!state.shopOpen)setTimeout(function(){startGuide.open()},400)};

  // The intro waits behind the 21+ gate; a visitor who answers No never sees it.
  // `resume` picks the intro up at the first unbuilt site when a half-built shop is reloaded.
  function openGuideAfterGate(resume){var root=document.documentElement,gate=$('ageGate');if(!gate||root.classList.contains('age-ok'))return setTimeout(function(){startGuide.open({resume:resume})},600);
    if(!window.MutationObserver)return;new MutationObserver(function(_,observer){if(root.classList.contains('age-ok')){observer.disconnect();setTimeout(function(){startGuide.open({resume:resume})},350)}}).observe(root,{attributes:true,attributeFilter:['class']})}
  completeBuilds();var offline=collectOffline();if(offline>=1){setTimeout(function(){notify('WHILE AWAY +'+fmt(offline))},500)}
  // The canvas runs full height behind the sheet; the camera frames the building in the strip above it.
  var dockHeight=0;
  function fitControls(){document.documentElement.style.setProperty('--hud-height',document.querySelector('.hud').getBoundingClientRect().bottom+'px');
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
    if(PAN_KEYS[e.code]&&!(e.code.indexOf('Arrow')===0&&t&&t.closest('.sheet'))){e.preventDefault();if(!heldPanKeys[e.code]){heldPanKeys[e.code]=true;mapHintActivity()}return}
    if(e.key===' '){e.preventDefault();setGameSpeed(state.gameSpeed===0?1:0)}
    else if(e.key==='1'||e.key==='2'||e.key==='4')setGameSpeed(Number(e.key));
    else if(e.key==='Escape'&&panelOpen)collapsePanel();
  });
  document.addEventListener('keyup',function(e){if(heldPanKeys[e.code])delete heldPanKeys[e.code]});
  window.addEventListener('blur',releasePanKeys);
  if(state.empire.returnReport){renderUI()}
  syncMapView();if(!state.empire.returnReport&&state.empire.activeStore){showTray('empire');collapsePanel()}
  paintThumbnails();
  selected=slowestStation();fitControls();syncGestureHint();renderUI();telemetry.drain();telemetry.session({returning:!firstRun});telemetry.heartbeat();window.__shiftReady=true;if(!state.shopOpen)openGuideAfterGate(!firstRun);else if(firstRun&&!startGuide.seen())openGuideAfterGate(false);requestAnimationFrame(render);setInterval(tick,50);setInterval(function(){renderUI(true)},250);setInterval(function(){if(!document.hidden)save()},5000);window.addEventListener('beforeunload',function(){if(!document.hidden)save()});window.addEventListener('pagehide',function(){if(!document.hidden)save()});
  document.body.dataset.pageHidden=String(document.hidden);
  document.addEventListener('visibilitychange',function(){document.body.dataset.pageHidden=String(document.hidden);tickTime=performance.now();tickRemainder=0;if(document.hidden){releasePanKeys();save();scheduleReminders()}else{if(reminders.available)reminders.clear();collectOffline();if(state.empire.returnReport){renderUI()}renderUI()}});

  if(document.modelContext&&document.modelContext.registerTool){document.modelContext.registerTool({name:'read_factory_status',title:'Read factory status',description:'Read cash, production, and machine levels.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute:function(){return{orderCounters:state.orderCounters,reservedWalkInBags:customers.filter(function(c){return c.ordered&&!c.bag}).reduce(function(n,c){return n+(c.bags||1)},0),orderCounterPositions:orderCounterPositions(state.orderCounters),autoDrone:state.autoDrone,deliveryDrones:deliveryDrones.length,productMenu:state.productMenu,prestige:state.empire.prestige,shares:state.empire.shares,perks:state.perks,offlineLevel:state.offlineLevel,rushTime:state.rushTime,spenderClock:state.spenderClock,crosses:state.crosses,breedingLevel:state.breedingLevel,weeklySpecial:weeklySpecial(Date.now()).id,contract:state.contract,viewedStore:state.empire.activeStore,branchLevels:state.empire.stores.map(function(s){return s.level}),branchProjects:state.empire.stores.map(function(s){return s.projects}),network:state.empire.network,reputation:state.empire.reputation,management:state.empire.stores,goalsCompleted:state.empire.goalsCompleted,branchIncome:branchIncome(state.empire)*state.gameSpeed,cash:Math.floor(state.money),lifetime:Math.floor(state.lifetime),perSecond:production()*state.gameSpeed,gameSpeed:state.gameSpeed,paused:state.gameSpeed===0,lineLevels:state.lines,shopOpen:state.shopOpen,doorBuilt:state.doorBuilt,stock:state.stock,customersServed:state.sold,employeeLevels:state.staff,onlineCompleted:state.onlineCompleted,camera:{zoom:zoom,panX:panX,panY:panY,angle:angle},orderRoute:queueRoute(false),pickupRoute:queueRoute(true),lounge:{level:state.lounge,seats:loungeSeats(state.lounge),seated:loungeSeated(),waiting:loungeWaiting().length,sessions:state.loungeSessions,earned:state.loungeEarned,rate:loungeCurrentRate(state.lounge,loungeSeated(),flowerValue())*state.gameSpeed,nextCost:loungeUpgradeCost(state.lounge)},customers:customers.map(function(c){return{kind:c.kind,id:c.id,phase:c.phase,ordered:c.ordered,bag:c.bag,bags:c.bags||0,kiosk:!!c.kiosk,lounge:!!c.lounge,orderCounter:c.orderCounter,pickupTicket:c.pickupTicket||0,walking:!!c.walking,x:c.x,z:c.z,serviceElapsed:c.serviceElapsed||0}})}}});}
})();
