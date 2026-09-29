import {FORMATS,formatUnlocked} from './depth.js';
import {STRAIN_TYPE,TYPES} from './strains.js';
import {BRANCH_NAMES,LINES,REGULARS,storyStatus,deliveryReason} from './operations.js';

export const SHIFT_SECONDS=300;
const count=(v,max=1e12)=>Number.isFinite(v)?Math.max(0,Math.min(max,v)):0;
const emptyShift=()=>({seconds:0,served:0,matches:0,earned:0,deliveries:0,transfers:0,queuePeak:0,waitTotal:0,stockoutSeconds:0});
function cleanShift(raw){const s=emptyShift();for(const key of Object.keys(s))s[key]=count(raw?.[key],key==='seconds'?SHIFT_SECONDS:1e12);return s;}
export function migrateShopPlay(raw){return {version:1,cooldown:count(raw?.cooldown??35,90),sequence:Math.floor(count(raw?.sequence)),matches:Math.floor(count(raw?.matches)),tips:count(raw?.tips),shift:cleanShift(raw?.shift),recap:raw?.recap?cleanShift(raw.recap):null,recapUnread:raw?.recapUnread===true};}

// Recommendations use unlocked products only, without changing the permanent menu.
export function momentOptions(state){const options=[];state.strains.forEach((level,strain)=>{if(!level)return;FORMATS.forEach((f,format)=>{if(formatUnlocked(state.productMenu,strain,format))options.push({strain,format,type:STRAIN_TYPE[strain],trait:TYPES[STRAIN_TYPE[strain]],formatName:f.name});});});return options;}
export function createMoment(state,customer){
 const options=momentOptions(state),sequence=state.shopPlay.sequence++;
 const target=options[sequence%options.length];if(!target)return null;
 const formatRequest=sequence%3===2&&target.format>0;
 const request=formatRequest?['','Something rolled and ready.','Something without flower.'][target.format]:['A balanced house pick, please.','A bright daytime pick, please.','An evening-style pick, please.'][target.type];
 const matches=o=>formatRequest?o.format===target.format:o.type===target.type;
 const alternatives=options.filter(o=>!matches(o));
 const choices=[target,...alternatives.slice(sequence%Math.max(1,alternatives.length)),...options.filter(o=>o!==target)].filter((o,i,a)=>a.findIndex(v=>v.strain===o.strain&&v.format===o.format)===i).slice(0,3);
 // Rotate the answer position; don't turn the interaction into clicking the first button.
 for(let n=0;n<sequence%choices.length;n++)choices.push(choices.shift());
 return {customerId:customer.id,name:['Avery','Eden','Noa','Remy','Sage','Robin'][sequence%6],request,choices,remaining:18,opened:false,formatRequest,target:formatRequest?target.format:target.type};
}
export function resolveMoment(moment,index){const option=moment.choices[index];return option?{option,matched:moment.formatRequest?option.format===moment.target:option.type===moment.target}:null;}
export function recordPickup(play,customer,revenue){const s=play.shift;s.served++;s.waitTotal+=count(customer.waitSeconds);s.earned+=count(revenue);if(customer.momentMatched){s.matches++;play.matches++;}}
export function tickShift(play,seconds,{queue=0,stockout=false}={}){
 const s=play.shift;s.seconds+=seconds;s.queuePeak=Math.max(s.queuePeak,queue);if(stockout)s.stockoutSeconds+=seconds;
 if(s.seconds<SHIFT_SECONDS)return false;
 play.recap={...s,seconds:SHIFT_SECONDS};play.recapUnread=true;play.shift=emptyShift();return true;
}
export function recapSuggestion(recap){if(recap.stockoutSeconds>30)return {text:'Keep pickup stocked: check your Pack and Orders stations.',station:3};if(recap.served&&recap.waitTotal/recap.served>25)return {text:'Customers waited a while. Train the Orders team or improve queue comfort.',station:4};if(recap.queuePeak>8)return {text:'A busy shift. Add an order counter to spread the queue.',station:4};return {text:'Try another customer recommendation next shift. Great matches earn extra tips.',moment:true};}

export function operationsAlerts(state){
 const p=state.empire,n=p.network,alerts=[];
 n.stores.forEach((s,i)=>{if(!p.stores[i].level)return;
  const story=storyStatus(p,i),prefix=BRANCH_NAMES[i];
  if(story.ready)alerts.push({id:'regular-'+i,title:REGULARS[i].name+'’s request is ready',detail:prefix+' · '+story.need+' '+LINES[story.line].name,store:i,tab:2,control:'storyServe'+i});
  const recipe=LINES[s.recipe];
  if(s.shelves[s.recipe]===0)alerts.push({id:'shelf-'+i,title:prefix+' needs shelf space',detail:'Allocate space for '+recipe.name,store:i,tab:1,control:'shelfMore'+i+s.recipe});
  else if(s.stock[s.recipe]>=s.shelves[s.recipe])alerts.push({id:'full-'+i,title:prefix+' shelves are full',detail:'Check deliveries or your shelf plan',store:i,tab:1,control:'deliverySend'+i,details:true});
  else if(i>0&&s.raw<recipe.raw&&!n.jobs.some(j=>j.kind==='transfer'&&j.to===i))alerts.push({id:'harvest-'+i,title:prefix+' needs harvest',detail:'Send a transfer from Riverside',store:0,tab:1,control:'transferSend0',details:true,transferTo:i});
  const line=s.stock.findIndex((_,j)=>!deliveryReason(p,i,j));
  if(line>=0)alerts.push({id:'driver-'+i,title:'Driver ready for '+prefix,detail:s.demand+' requests · dispatch '+LINES[line].name,store:i,tab:1,control:'deliverySend'+i,details:true,line});
 });return alerts;
}
