// Connected branch operations. All clocks use simulated seconds and pause with play.
export const BRANCH_NAMES=['Riverside','Old Town','City Center'];
export const LINES=[
 {id:'staples',name:'Daily jars',raw:1,price:28,seconds:6,research:0},
 {id:'boutique',name:'Botanical tins',raw:2,price:76,seconds:10,research:2500},
 {id:'reserve',name:'Reserve boxes',raw:3,price:145,seconds:16,research:8000}
];
export const STAFF={grower:{name:'Rowan',trait:'Patient botanist',specialty:'Cultivation'},host:{name:'Jules',trait:'Remembers every regular',specialty:'Hospitality'},dispatcher:{name:'Alex',trait:'Always takes the scenic shortcut',specialty:'Logistics'}};
export const REGULARS=[{name:'Mara',role:'Riverwalk gardener',requests:['A jar for the gardening club','Tins for the neighborhood swap','A reserve box for the club anniversary']},{name:'Sol',role:'Local printmaker',requests:['Something simple for the studio','Tins for the gallery opening','A reserve box for a first collector']},{name:'Kit',role:'Bike courier',requests:['A quick pickup after the route','Tins for the courier crew','A reserve box for a hundredth delivery']}];
export const COSMETICS={counter:['Oak','Slate','Cream'],awning:['Sage','Clay','Linen'],plants:['Fern','Flowers','Cactus'],lighting:['Warm','Cool','Amber'],layout:['Lounge','Showcase']};
const clamp=(v,max=1e9)=>Number.isFinite(v)?Math.min(max,Math.max(0,v)):0;
const whole=(v,max=1e9)=>Math.floor(clamp(v,max));
const triple=(v,max=1e9)=>[0,1,2].map(i=>whole(v?.[i],max));
export function migrateOperations(raw){
 const r=raw&&typeof raw==='object'?raw:{};
 const stores=[0,1,2].map(i=>{const s=r.stores?.[i]||{},shelves=triple(s.shelves,60);if(!shelves.some(Boolean))shelves[0]=20;while(shelves.reduce((a,b)=>a+b,0)>60){const j=shelves.findIndex(n=>n>0);shelves[j]--;}
 return {raw:clamp(s.raw,120),stock:triple(s.stock,60),shelves,recipe:whole(s.recipe,2),craftClock:clamp(s.craftClock,15),saleClock:clamp(s.saleClock,11),demandClock:clamp(s.demandClock,59),demand:whole(s.demand??2,3),reserve:[0,5,10].includes(s.reserve)?s.reserve:5,area:whole(s.area,2),crafted:whole(s.crafted),sold:whole(s.sold),received:whole(s.received),sent:whole(s.sent),deliveries:whole(s.deliveries),harvested:whole(s.harvested),opening:whole(s.opening,3),relationship:whole(s.relationship,3),storyWait:clamp(s.storyWait,45),cosmetics:Object.fromEntries(Object.entries(COSMETICS).map(([k,v])=>[k,whole(s.cosmetics?.[k],v.length-1)])),construction:clamp(s.construction,6),incomeGain:clamp(s.incomeGain)};});
 const fleet=Math.max(1,whole(r.fleet||1,3));
 const jobs=(Array.isArray(r.jobs)?r.jobs:[]).slice(0,fleet).filter(j=>j&&['transfer','delivery'].includes(j.kind)&&Number.isInteger(j.from)&&j.from>=0&&j.from<3&&(j.kind==='delivery'||Number.isInteger(j.to)&&j.to>=0&&j.to<3&&j.to!==j.from)).map((j,i)=>({id:i+1,kind:j.kind,from:j.from,to:j.kind==='transfer'?j.to:-1,amount:whole(j.amount,30),line:whole(j.line,2),elapsed:clamp(j.elapsed,90),duration:Math.max(1,clamp(j.duration,90)),reward:clamp(j.reward,20000)})).filter(j=>j.amount>0);
 return {version:1,time:clamp(r.time,1e12),fleet,area:whole(r.area,2),jobs,nextJob:jobs.length+1,staff:Object.fromEntries(Object.keys(STAFF).map(k=>[k,{xp:clamp(r.staff?.[k]?.xp,500)}])),recipes:[true,r.recipes?.[1]===true,r.recipes?.[2]===true],discoveries:triple(r.discoveries,1),stores,flagship:r.flagship===true,productRevenue:clamp(r.productRevenue)};
}
export function atmosphere(n){const phase=n.time%600;return {name:phase<300?'Day':phase<390?'Evening':phase<540?'Night':'Dawn',night:phase>=360&&phase<540,darkness:phase<300?0:phase<390?(phase-300)/90*.34:phase<510?.34:(600-phase)/90*.34};}
export function staffLevel(n,id){return Math.min(5,Math.floor((n.staff[id]?.xp||0)/100));}
function experience(p,i,amount){const id=p.stores[i].manager;if(p.network.staff[id])p.network.staff[id].xp=Math.min(500,p.network.staff[id].xp+amount);}
export function shelfCapacity(p,i){return 20+Math.floor(p.stores[i].level/2)*8;}
export function shelfUsed(s){return s.shelves.reduce((a,b)=>a+b,0);}
export function allocateShelf(p,i,j,delta){const n=p.network,s=n.stores[i];if(!p.stores[i]?.level||!Number.isInteger(j)||j<0||j>2||![5,-5].includes(delta)||!n.recipes[j])return false;const next=s.shelves[j]+delta;if(next<s.stock[j]||next<0||shelfUsed(s)+delta>shelfCapacity(p,i))return false;s.shelves[j]=next;return true;}
export function developProduct(state,j){const n=state.empire.network,line=LINES[j];if(!line||n.recipes[j]||!state.empire.stores[0].level||state.money<line.research)return false;state.money-=line.research;n.recipes[j]=true;return true;}
export function chooseRecipe(p,i,j){if(!p.stores[i]?.level||!p.network.recipes[j]||!LINES[j])return false;p.network.stores[i].recipe=j;p.network.stores[i].craftClock=0;return true;}
export function customize(p,i,key,value){if(!p.stores[i]?.level||!COSMETICS[key]||!Number.isInteger(value)||value<0||value>=COSMETICS[key].length)return false;p.network.stores[i].cosmetics[key]=value;return true;}
export function importHarvest(state){const p=state.empire,s=p.network.stores[0];if(!p.stores[0].level||state.stock[2]<10||s.raw+10>120)return false;state.stock[2]-=10;s.raw+=10;return true;}
export function transferReason(p,to,amount=10){const n=p.network;if(![1,2].includes(to)||!p.stores[0].level||!p.stores[to].level)return 'Open both stores';if(n.jobs.length>=n.fleet)return 'All drivers busy';if(n.stores[0].raw<amount)return 'Need '+amount+' harvest';const reserved=n.jobs.filter(j=>j.kind==='transfer'&&j.to===to).reduce((a,j)=>a+j.amount,0);return n.stores[to].raw+reserved+amount>120?'Destination full':'';}
export function sendTransfer(p,to){if(transferReason(p,to))return false;const n=p.network;n.stores[0].raw-=10;n.jobs.push({id:n.nextJob++,kind:'transfer',from:0,to,amount:10,line:0,elapsed:0,duration:24+to*8,reward:0});return true;}
export function deliveryReason(p,i,j){const n=p.network,s=n.stores[i];if(!p.stores[i]?.level)return 'Open store first';if(n.jobs.length>=n.fleet)return 'All drivers busy';if(!s.demand)return 'Waiting for demand';if(!LINES[j]||s.stock[j]-5<s.reserve)return 'Keep '+s.reserve+' for walk-ins';return '';}
export function dispatchDelivery(p,i,j){if(deliveryReason(p,i,j))return false;const n=p.network,s=n.stores[i],manager=p.stores[i].manager;s.stock[j]-=5;s.demand--;n.jobs.push({id:n.nextJob++,kind:'delivery',from:i,to:-1,amount:5,line:j,elapsed:0,duration:(24+s.area*15)/(manager==='dispatcher'?1.25+staffLevel(n,manager)*.05:1),reward:Math.round(5*LINES[j].price*(1.4+s.area*.3)*(manager==='dispatcher'?1.25:1))});return true;}
export function upgradeFleet(state){const n=state.empire.network,cost=2000*n.fleet*n.fleet;if(n.fleet>=3||state.money<cost)return false;state.money-=cost;n.fleet++;return true;}
export function expandArea(state){const n=state.empire.network,cost=[3000,12000][n.area];if(n.area>=2||!state.empire.stores[2].level||state.money<cost)return false;state.money-=cost;n.area++;return true;}
export function openingStatus(p,i){const s=p.network.stores[i],step=s.opening;
 const tasks=i===0?[['Grow 10 harvest',s.harvested,10],['Send a transfer',s.sent,1],['Meet Mara',s.relationship,1]]:i===1?[['Receive 10 harvest',s.received,10],['Make 5 products',s.crafted,5],['Meet Sol',s.relationship,1]]:[['Make 5 products',s.crafted,5],['Complete a delivery',s.deliveries,1],['Meet Kit',s.relationship,1]];
 const t=tasks[Math.min(step,2)];return {title:step===3?'Grand opening complete':t[0],progress:Math.min(t[1],t[2]),target:t[2],ready:step<3&&t[1]>=t[2],reward:[250,500,1000][step]||0};}
export function claimOpening(state,i){const p=state.empire,s=p.network.stores[i],g=openingStatus(p,i);if(!p.stores[i].level||!g.ready)return false;state.money+=g.reward;s.opening++;p.stores[i].loyalty=Math.min(1000,p.stores[i].loyalty+5);return true;}
export function storyStatus(p,i){const s=p.network.stores[i],r=s.relationship,line=Math.min(r,2),need=[3,2,1][line];return {name:REGULARS[i].name,title:r===3?'Neighborhood regular':REGULARS[i].requests[r],line,need,ready:r<3&&s.stock[line]>=need&&s.storyWait===0,reward:[150,400,1000][r]||0};}
export function fulfillStory(state,i){const p=state.empire,s=p.network.stores[i],story=storyStatus(p,i);if(!p.stores[i].level||!story.ready)return false;s.stock[story.line]-=story.need;s.relationship++;s.storyWait=45;p.stores[i].loyalty=Math.min(1000,p.stores[i].loyalty+5);state.money+=story.reward;experience(p,i,30);return true;}
export function neighborhood(p,i){const s=p.network.stores[i];return Math.min(3,Math.floor((s.sold+s.deliveries*5+s.relationship*10)/20));}
export function journal(state){const p=state.empire,n=p.network;return [
 ...['Meadow Mint','Amber Bloom','Violet Haze','Midnight Orchid','River Mist'].map((name,i)=>({group:'Strains',name,found:i===4?p.stores[0].level>=2:!!state.strains?.[i]})),
 ...LINES.map((l,i)=>({group:'Products',name:l.name,found:!!n.discoveries[i]})),
 ...REGULARS.map((r,i)=>({group:'Regulars',name:r.name,found:n.stores[i].relationship>0})),
 ...p.stores.flatMap((s,i)=>[3,5,7].map((level,j)=>({group:'Milestones',name:BRANCH_NAMES[i]+' · '+['Displays','Specialist','Terrace'][j],found:s.level>=level}))),
 ...['Market lantern','Vendor display','Harvest planter'].map((name,i)=>({group:'Souvenirs',name,found:p.rewards[i]}))];}
export function flagshipStatus(state){const p=state.empire,n=p.network,entries=journal(state);const checks=[{name:'Store quality',value:p.stores.filter(s=>s.level>=7&&s.projects.filter(Boolean).length>=2).length,total:3},{name:'Collection',value:entries.filter(e=>e.found).length,total:entries.length},{name:'Grand openings',value:n.stores.filter(s=>s.opening===3).length,total:3},{name:'Reputation',value:Math.min(60,p.reputation,...p.stores.map(s=>s.loyalty)),total:60}];return {checks,ready:checks.every(c=>c.value>=c.total),claimed:n.flagship};}
export function claimFlagship(state){if(state.empire.network.flagship||!flagshipStatus(state).ready)return false;state.empire.network.flagship=true;return true;}
export function branchBottleneck(p,i){const s=p.network.stores[i],l=LINES[s.recipe];if(!p.stores[i].level)return {name:'Unopened',action:'Open store',tab:'overview'};if(!s.shelves[s.recipe])return {name:'Shelf allocation',action:'Make shelf space',tab:'stock'};if(s.stock[s.recipe]>=s.shelves[s.recipe])return {name:'Full shelves',action:'Dispatch goods',tab:'stock'};if(s.raw<l.raw)return {name:i===0?'Growing':'Supply',action:i===0?'Import harvest':'Send from Riverside',tab:'stock'};if(s.stock.reduce((a,b)=>a+b,0)<3)return {name:'Production',action:'Try Daily jars',tab:'stock'};return {name:'Service',action:'Upgrade store',tab:'overview'};}
export function tickOperations(state,dt){
 if(!Number.isFinite(dt)||dt<=0)return {revenue:0,deliveries:0};const p=state.empire,n=p.network;n.time+=dt;let revenue=0,deliveries=0;
 const completed=[];n.jobs.forEach(j=>{j.elapsed+=dt;if(j.elapsed>=j.duration){completed.push(j.id);if(j.kind==='transfer'){n.stores[j.to].raw=Math.min(120,n.stores[j.to].raw+j.amount);n.stores[j.to].received+=j.amount;n.stores[j.from].sent++;experience(p,j.from,12);}else{revenue+=j.reward;deliveries++;n.stores[j.from].deliveries++;experience(p,j.from,18);}}});n.jobs=n.jobs.filter(j=>!completed.includes(j.id));
 n.stores.forEach((s,i)=>{if(!p.stores[i].level)return;const store=p.stores[i];s.storyWait=Math.max(0,s.storyWait-dt);s.construction=Math.max(0,s.construction-dt);
 if(i===0){const growth=dt*(.25+store.level*.06)*(store.manager==='grower'?1.3+staffLevel(n,'grower')*.08:1),added=Math.min(120-s.raw,growth);s.raw+=added;s.harvested+=added;}
 s.demandClock+=dt;if(s.demandClock>=60){s.demand=Math.min(3,s.demand+Math.floor(s.demandClock/60));s.demandClock%=60;}
 const recipe=LINES[s.recipe];if(n.recipes[s.recipe]&&s.raw>=recipe.raw&&s.stock[s.recipe]<s.shelves[s.recipe]){s.craftClock+=dt*(1+(store.manager==='grower'?staffLevel(n,'grower')*.1:0));while(s.craftClock>=recipe.seconds&&s.raw>=recipe.raw&&s.stock[s.recipe]<s.shelves[s.recipe]){s.craftClock-=recipe.seconds;s.raw-=recipe.raw;s.stock[s.recipe]++;s.crafted++;n.discoveries[s.recipe]=1;experience(p,i,3);}}else s.craftClock=0;
 s.saleClock+=dt;const interval=atmosphere(n).night?16:12;
 while(s.saleClock>=interval){s.saleClock-=interval;const preferred=atmosphere(n).night?2:store.featured==='boutique'?1:store.featured==='exclusive'?2:0;const available=s.stock[preferred]>0?preferred:s.stock.findIndex(v=>v>0);if(available>=0){s.stock[available]--;s.sold++;revenue+=LINES[available].price*(i===1&&available>0?1.4:1)*(1+Math.min(store.loyalty,100)*.002);experience(p,i,2);}}
 });n.productRevenue+=revenue;return {revenue,deliveries};
}
