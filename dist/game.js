const LINES=[
  {name:'Parts Press',icon:'⚙️',base:10,rate:1,unlock:0},
  {name:'Circuit Bench',icon:'▦',base:100,rate:8,unlock:25},
  {name:'Auto Welder',icon:'⚡',base:850,rate:50,unlock:250},
  {name:'Drone Bay',icon:'◆',base:6500,rate:280,unlock:2500}
];
const CONTRACTS=[
  {name:'FIRST BATCH',copy:'Produce $100 in total output.',goal:100,reward:40},
  {name:'STEADY SUPPLY',copy:'Produce $1,500 in total output.',goal:1500,reward:450},
  {name:'MASS MARKET',copy:'Produce $20,000 in total output.',goal:20000,reward:6000},
  {name:'CITY CONTRACT',copy:'Produce $250,000 in total output.',goal:250000,reward:90000}
];
const fresh=()=>({money:0,lifetime:0,lines:[0,0,0,0],multiplier:1,globalLevel:0,contract:0,lastSeen:Date.now()});
let state=load(); let toastTimer;
const $=id=>document.getElementById(id);
function load(){try{return {...fresh(),...JSON.parse(localStorage.getItem('shift-save')||'{}')}}catch{return fresh()}}
function save(){state.lastSeen=Date.now();localStorage.setItem('shift-save',JSON.stringify(state))}
function fmt(n){if(n<1000)return '$'+Math.floor(n).toLocaleString();const u=[['T',1e12],['B',1e9],['M',1e6],['K',1e3]];for(const [s,v] of u)if(n>=v)return '$'+(n/v).toFixed(n/v>=100?0:n/v>=10?1:2)+s}
function rate(){return LINES.reduce((sum,l,i)=>sum+l.rate*state.lines[i],0)*state.multiplier}
function cost(i){return Math.floor(LINES[i].base*Math.pow(1.16,state.lines[i]))}
function tap(){return Math.max(1,Math.floor(1+rate()*.08))}
function add(amount){state.money+=amount;state.lifetime+=amount}
function notify(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2200)}
function renderLines(){
  $('linesGrid').innerHTML=LINES.map((l,i)=>{const unlocked=state.lifetime>=l.unlock;const owned=state.lines[i];const c=cost(i);return `<article class="line-card ${unlocked?'':'locked'} ${owned?'owned':''}">
    <span class="number">LINE 0${i+1}</span><div class="machine-icon" aria-hidden="true">${unlocked?l.icon:'▧'}</div>
    <h4>${unlocked?l.name:'LOCKED LINE'}</h4><div class="stats">${unlocked?`LEVEL ${owned}<br>${fmt(l.rate*owned*state.multiplier)} / SEC`:`UNLOCK AT ${fmt(l.unlock)}`}</div>
    <button ${unlocked?'':'disabled'} data-buy="${i}">${unlocked?`BUY / ${fmt(c)}`:'LOCKED'}</button></article>`}).join('');
  document.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>buyLine(Number(b.dataset.buy)));
}
function render(){
  const r=rate();$('money').textContent=fmt(state.money);$('perSecond').textContent=`+${fmt(r)} / SEC`;$('lifetime').textContent=`LIFETIME ${fmt(state.lifetime)}`;$('tapValue').textContent=fmt(tap()).slice(1);$('shiftNumber').textContent=String(Math.min(99,Math.floor(state.lifetime/1000)+1)).padStart(2,'0');
  const next=LINES.find(l=>state.lifetime<l.unlock);if(next){$('nextUnlock').textContent=`NEXT LINE AT ${fmt(next.unlock)}`;$('progressFill').style.width=Math.min(100,state.lifetime/next.unlock*100)+'%'}else{$('nextUnlock').textContent='ALL LINES UNLOCKED';$('progressFill').style.width='100%'}
  const contract=CONTRACTS[state.contract];if(contract){$('contractName').textContent=contract.name;$('contractReward').textContent='+'+fmt(contract.reward);$('contractCopy').textContent=contract.copy;$('contractProgress').textContent=`${fmt(Math.min(state.lifetime,contract.goal))} / ${fmt(contract.goal)}`;$('contractFill').style.width=Math.min(100,state.lifetime/contract.goal*100)+'%';$('claimButton').disabled=state.lifetime<contract.goal;$('claimButton').textContent='CLAIM'}else{$('contractName').textContent='ALL ORDERS FILLED';$('contractReward').textContent='✓';$('contractCopy').textContent='Your factory has fulfilled every current contract.';$('contractProgress').textContent='COMPLETE';$('contractFill').style.width='100%';$('claimButton').disabled=true;$('claimButton').textContent='DONE'}
  const uc=Math.floor(250*Math.pow(4,state.globalLevel));$('upgradeCost').textContent=fmt(uc);renderLines();
}
function buyLine(i){const c=cost(i);if(state.money<c)return notify(`Need ${fmt(c-state.money)} more`);state.money-=c;state.lines[i]++;notify(`${LINES[i].name} upgraded to level ${state.lines[i]}`);render();save()}
function upgrade(){const c=Math.floor(250*Math.pow(4,state.globalLevel));if(state.money<c)return notify(`Need ${fmt(c-state.money)} more`);state.money-=c;state.globalLevel++;state.multiplier=Math.pow(1.25,state.globalLevel);notify('Factory output increased by 25%');render();save()}
function claim(){const c=CONTRACTS[state.contract];if(!c||state.lifetime<c.goal)return;state.money+=c.reward;state.contract++;notify(`Contract complete — ${fmt(c.reward)} awarded`);render();save()}
$('crankButton').onclick=()=>{add(tap());render();save()};$('globalUpgrade').onclick=upgrade;$('claimButton').onclick=claim;
$('resetButton').onclick=()=>$('resetModal').hidden=false;$('cancelReset').onclick=()=>$('resetModal').hidden=true;$('confirmReset').onclick=()=>{state=fresh();save();$('resetModal').hidden=true;notify('Factory reset');render()};
document.addEventListener('keydown',e=>{if(e.code==='Space'&&e.target===document.body){e.preventDefault();$('crankButton').click()}});
const away=Math.min(4*60*60,(Date.now()-state.lastSeen)/1000),offline=rate()*away;if(offline>=1){add(offline);notify(`While away: ${fmt(offline)} produced`)}
setInterval(()=>{add(rate()/10);render()},100);setInterval(save,5000);window.addEventListener('beforeunload',save);render();

// Expose the game's real actions to supported agent-enabled browsers.
if(document.modelContext?.registerTool){
  const tools=[
    {name:'read_factory_status',title:'Read factory status',description:'Read current cash, lifetime output, production rate, and machine levels.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute:()=>({cash:Math.floor(state.money),lifetime:Math.floor(state.lifetime),perSecond:rate(),lineLevels:state.lines})},
    {name:'run_factory_machine',title:'Run factory machine',description:'Run the manual machine once and add its output to the factory.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:()=>{const amount=tap();add(amount);render();save();return{produced:amount,cash:Math.floor(state.money)}}}
  ];tools.forEach(tool=>document.modelContext.registerTool(tool));
}
