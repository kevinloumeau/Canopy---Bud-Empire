(function () {
  'use strict';

  var LINES=[
    {name:'SEED STATION',base:10,rate:1,unlock:0},{name:'GROW ROOM',base:25,rate:1,unlock:0},
    {name:'PICKING TABLE',base:40,rate:1,unlock:0},{name:'PACKING BAR',base:65,rate:1,unlock:0},
    {name:'ORDER DESK',base:90,rate:1,unlock:0},{name:'CUSTOMER PICKUP',base:120,rate:1,unlock:0}
  ];
  var ORDERS=[{name:'FIRST BATCH',goal:100,reward:40},{name:'STEADY SUPPLY',goal:1500,reward:450},{name:'MASS MARKET',goal:20000,reward:6000},{name:'CITY CONTRACT',goal:250000,reward:90000}];
  var $=function(id){return document.getElementById(id)};
  function fresh(){return{money:30,lifetime:0,lines:[0,0,0,0,0,0],stock:[0,0,0,0,0],sold:0,multiplier:1,globalLevel:0,contract:0,lastSeen:Date.now(),theme:'dispensary'}}
  function load(){try{var old=JSON.parse(localStorage.getItem('shift-save')||'{}'),next=Object.assign(fresh(),old);next.lines=LINES.map(function(_,i){return Math.max(0,Math.floor(Number(old.lines&&old.lines[i])||0))});next.stock=Array.from({length:5},function(_,i){return Math.max(0,Math.min(100,Number(old.stock&&old.stock[i])||0))});next.theme='dispensary';return next}catch(e){return fresh()}}
  var state=load(),selected=0,toastTimer;
  function save(){state.lastSeen=Date.now();localStorage.setItem('shift-save',JSON.stringify(state))}
  function fmt(n){if(n<1000)return '$'+Math.floor(n).toLocaleString();var units=[['T',1e12],['B',1e9],['M',1e6],['K',1e3]];for(var i=0;i<units.length;i++)if(n>=units[i][1])return '$'+(n/units[i][1]).toFixed(n/units[i][1]>=100?0:n/units[i][1]>=10?1:2)+units[i][0]}
  function capacity(i){return state.lines[i]>0?(1+(state.lines[i]-1)*.4)*state.multiplier:0}
  function isOpen(i){return i===0||state.lines[i-1]>0}
  function production(){return Math.min.apply(null,LINES.map(function(_,i){return capacity(i)/[2,3,2,2,2,3][i]}))*18}
  var work=[0,0,0,0,0,0],customers=[],arrival=0,customerId=0;
  function simulate(dt){
    arrival+=dt;var arrivingEvery=state.lines[5]>0?Math.max(.6,3/capacity(5)):5;
    if(arrival>=arrivingEvery&&customers.filter(function(c){return c.phase!=='leaving'}).length<6){arrival=0;customers.push({id:customerId++,phase:'entering',t:0,wait:0,bag:false})}
    customers.forEach(function(c){if(c.phase==='entering'){c.t+=dt/3;if(c.t>=1){c.phase='waiting';c.t=1}}else if(c.phase==='leaving'){c.t+=dt/3}else{c.wait+=dt;if(c.wait>30){c.phase='leaving';c.t=0}}});
    customers=customers.filter(function(c){return !(c.phase==='leaving'&&c.t>=1)});
    for(var i=5;i>=0;i--){
      if(!state.lines[i])continue;
      var ready=i===5?customers.filter(function(c){return c.phase==='waiting'}):[];
      if((i>0&&state.stock[i-1]<1)||(i<5&&state.stock[i]>=100)||(i===5&&!ready.length)){work[i]=Math.min(work[i],.9);continue}
      work[i]+=dt*capacity(i)/[2,3,2,2,2,3][i];
      var amount=Math.min(Math.floor(work[i]),i===0?100:state.stock[i-1],i<5?100-state.stock[i]:ready.length);
      if(amount>0){work[i]-=amount;if(i>0)state.stock[i-1]-=amount;if(i<5)state.stock[i]+=amount;else{ready.slice(0,amount).forEach(function(c){c.phase='leaving';c.t=0;c.bag=true});state.sold+=amount;add(amount*18);burst(machinePos[5],colors.acid)}}
    }
  }
  function cost(i){return Math.floor(LINES[i].base*Math.pow(1.16,state.lines[i]))}
  function tapValue(){return Math.max(1,Math.floor(1+production()*.08))}
  function add(n){state.money+=n;state.lifetime+=n}
  function notify(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(function(){$('toast').classList.remove('show')},1600)}

  var world=$('world'),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d',{alpha:false});
  if(!ctx){$('loadStatus').textContent='CANVAS COULD NOT START';$('loadRetry').hidden=false;return}
  world.insertBefore(canvas,world.firstChild);canvas.setAttribute('aria-hidden','true');
  var dpr=1,width=1,height=1,angle=.57,zoom=1,centerX=0,centerY=0,unit=32;
  var colors={bg:'#202226',floorTop:'#303238',floorLeft:'#1c1f23',floorRight:'#272a30',grid:'#41444a',beltEdge:'#111419',belt:'#313943',slat:'#5b6470',oliveTop:'#f4f5ec',oliveLeft:'#a9b6be',oliveRight:'#d5dce0',darkTop:'#56616a',darkLeft:'#252e36',darkRight:'#3b4650',metalTop:'#eef2f3',metalLeft:'#8b9ba8',metalRight:'#becbd4',acid:'#f5c344',orange:'#ff7628',boxTop:'#d3a36c',boxLeft:'#8e6741',boxRight:'#b17f50'};
  var machinePos=[{x:-4,z:-5},{x:4,z:-5},{x:4,z:0},{x:-4,z:0},{x:-4,z:5},{x:4,z:5}];
  var beltNodes=[[-5,-3.2],[0,-3.2],[5,-3.2],[5.4,0],[5,3.2],[0,3.2],[-5,3.2],[-5.4,0]];
  var crateTime=0,particles=[];

  function resize(){var rect=world.getBoundingClientRect();dpr=Math.min(window.devicePixelRatio||1,2);width=Math.max(1,Math.round(rect.width));height=Math.max(1,Math.round(rect.height));canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);canvas.style.width=width+'px';canvas.style.height=height+'px';ctx.setTransform(dpr,0,0,dpr,0,0);centerX=width*.5;centerY=height*.55;unit=Math.min(width/16,height/13)*zoom}
  function rotate(x,z){var c=Math.cos(angle),s=Math.sin(angle);return{x:x*c-z*s,z:x*s+z*c}}
  function project(x,y,z){var r=rotate(x,z);return{x:centerX+r.x*unit,y:centerY+r.z*unit*.5-y*unit,depth:r.z}}
  function poly(points,fill,stroke){ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);for(var i=1;i<points.length;i++)ctx.lineTo(points[i].x,points[i].y);ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke()}}
  function drawBox(x,z,y,w,d,h,palette){var p=palette||[colors.oliveTop,colors.oliveLeft,colors.oliveRight],b0=project(x-w/2,y,z-d/2),b1=project(x+w/2,y,z-d/2),b2=project(x+w/2,y,z+d/2),b3=project(x-w/2,y,z+d/2),t0=project(x-w/2,y+h,z-d/2),t1=project(x+w/2,y+h,z-d/2),t2=project(x+w/2,y+h,z+d/2),t3=project(x-w/2,y+h,z+d/2);poly(Math.cos(angle)>=0?[b3,b2,t2,t3]:[b0,b1,t1,t0],p[1],'#00000018');poly(Math.sin(angle)>=0?[b2,b1,t1,t2]:[b3,b0,t0,t3],p[2],'#00000018');poly([t0,t1,t2,t3],p[0],'#ffffff20')}
  function groundPatch(x,z,w,d,fill){poly([project(x-w/2,.015,z-d/2),project(x+w/2,.015,z-d/2),project(x+w/2,.015,z+d/2),project(x-w/2,.015,z+d/2)],fill)}
  function glow(x,y,r,color){var g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'#00000000');ellipse(x,y,r,r*.6,g)}
  function ellipse(x,y,rx,ry,fill){ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill()}
  function plant(x,z,y,size){
    drawBox(x,z,y,.5,.5,.4,['#d7b29a','#815d4f','#ab806a']);
    var root=project(x,y+.4,z),top=project(x,y+.4+size,z);
    ctx.beginPath();ctx.moveTo(root.x,root.y);ctx.lineTo(top.x,top.y);ctx.strokeStyle='#75b876';ctx.lineWidth=Math.max(1,unit*.06);ctx.stroke();
    for(var k=0;k<7;k++){var a=-Math.PI+k*Math.PI/6,base={x:top.x,y:top.y+unit*.14},tip={x:top.x+Math.cos(a)*unit*size*.6,y:top.y+Math.sin(a)*unit*size*.65};
      poly([base,{x:(base.x+tip.x)/2+unit*.08,y:(base.y+tip.y)/2-unit*.06},tip,{x:(base.x+tip.x)/2-unit*.08,y:(base.y+tip.y)/2+unit*.05}],k%2?'#76c77d':'#39875a')}
  }
  function jar(x,z,y){drawBox(x,z,y,.45,.45,.55,['#c1ead5','#638b78','#94bfa6']);drawBox(x,z,y+.55,.48,.48,.1,['#eadcaa','#aa986a','#c8b981']);drawBox(x,z+.23,y+.2,.29,.02,.19,['#faf3df','#d3cdb7','#ece6ce'])}
  function drawStage(pos,i,now){
    var x=pos.x,z=pos.z,active=state.lines[i]>0,stone=['#e0e8de','#7d9387','#adbcaf'],dark=['#416859','#213b32','#315446'];
    drawBox(x,z,.03,3.1,2.5,.3,dark);drawBox(x,z,.33,2.9,2.25,.8,stone);drawBox(x,z,1.13,3.2,2.5,.16,['#d8c39b','#9a8868','#b5a17d']);
    if(i===0){drawBox(x,z,1.29,2.3,1.55,.12,dark);for(var n=0;n<6;n++){var p=project(x-.7+(n%3)*.7,1.44,z-.35+Math.floor(n/3)*.7);ellipse(p.x,p.y,unit*.09,unit*.06,'#e1c68a')}}
    if(i===1){for(var n=0;n<4;n++)plant(x-.65+(n%2)*1.3,z-.5+Math.floor(n/2),1.3,active?.7+((now*.0002+n*.2)%1)*.65:.5);drawBox(x-1.4,z,1.3,.1,.1,2,stone);drawBox(x+1.4,z,1.3,.1,.1,2,stone);drawBox(x,z,3.3,3,.7,.13,['#dfbfff','#8c6eaa','#bf9bdc'])}
    if(i===2){plant(x-.75,z,1.3,1);drawBox(x+.7,z,1.3,1.1,1,.2,dark);for(var n=0;n<3;n++){var p=project(x+.45+n*.25,1.6,z);ellipse(p.x,p.y,unit*.14,unit*.11,'#73ac6b')}var p=project(x,1.5,z+.55);ctx.strokeStyle='#e4ece6';ctx.lineWidth=unit*.07;ctx.beginPath();ctx.moveTo(p.x-unit*.25,p.y-unit*.15);ctx.lineTo(p.x+unit*.25,p.y+unit*.15);ctx.moveTo(p.x-unit*.25,p.y+unit*.15);ctx.lineTo(p.x+unit*.25,p.y-unit*.15);ctx.stroke()}
    if(i===3){for(var n=0;n<3;n++)jar(x-.8+n*.8,z,1.3);drawBox(x,z-.9,1.3,2.7,.25,.6,dark)}
    if(i===4){drawBox(x-.7,z,1.3,.95,.7,.12,dark);drawBox(x-.7,z-.2,1.42,.95,.13,.7,['#d8e7df','#314c42','#426b57']);for(var n=0;n<3;n++)drawBox(x+.5+n*.22,z+n*.18,1.3+n*.16,.7,.55,.16,['#f2ead5','#b0a589','#d2c6aa'])}
    if(i===5){drawBox(x,z-.8,1.3,3,.3,.65,dark);jar(x-.8,z,1.3);drawBox(x+.65,z,1.3,.65,.55,.65,['#f0dca4','#a68b59','#cdb47f']);var sign=project(x,2.2,z-.85);ctx.fillStyle='#dcefc2';ctx.font='bold '+Math.max(9,unit*.32)+'px sans-serif';ctx.textAlign='center';ctx.fillText('PICKUP',sign.x,sign.y)}
    var p=project(x+1.25,1.44,z+1);ellipse(p.x,p.y,unit*.1,unit*.07,active?'#a7ed96':'#69786f');
  }
  function drawCustomer(c,now,index){
    var x,z;if(c.phase==='entering'){x=12-c.t*7;z=8-c.t*1.2+index*.3}else if(c.phase==='leaving'){x=5+c.t*8;z=7+c.t*2}else{x=5+index*.65;z=7+index*.25}
    var p=project(x,.01,z);ellipse(p.x,p.y,unit*.32,unit*.14,'#00000044');
    var walk=c.phase==='waiting'?0:Math.sin(now*.012+c.id)*.13;
    drawBox(x-.13,z,.03,.16,.2,.52+walk,['#343c46','#202630','#2b3440']);drawBox(x+.13,z,.03,.16,.2,.52-walk,['#343c46','#202630','#2b3440']);
    var shirts=[['#eab67f','#9b694d','#c78a63'],['#c4ace2','#766394','#9c85b9'],['#83bec5','#4c7b83','#619fa6']];
    drawBox(x,z,.53,.58,.35,.65,shirts[c.id%3]);drawBox(x,z,1.18,.37,.35,.4,['#e5bba0','#af7f68','#cd9b7e']);
    if(c.bag)drawBox(x+.45,z,.55,.35,.3,.45,['#ead3a1','#9c8052','#c6aa75']);
    return {x:x,z:z};
  }
  function drawFloor(){
    ctx.fillStyle='#15291f';ctx.fillRect(0,0,width,height);drawBox(0,0,-.2,32,28,.2,['#35463d','#24352c','#293b32']);
    ctx.strokeStyle='#ffffff09';ctx.lineWidth=.7;
    for(var n=-16;n<=16;n+=2){var a=project(n,0,-14),b=project(n,0,14);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
    for(n=-14;n<=14;n+=2){a=project(-16,0,n);b=project(16,0,n);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
    groundPatch(7,8,12,3,'#b2bc9d18');
    for(var i=0;i<5;i++){var a=machinePos[i],b=machinePos[i+1],horizontal=a.z===b.z;
      drawBox((a.x+b.x)/2,(a.z+b.z)/2,.28,horizontal?Math.abs(b.x-a.x):1,horizontal?1:Math.abs(b.z-a.z),.16,['#6b8d77','#344d3e','#4e6b59']);
      for(var k=0;k<10;k++){var t=(k/10+(state.lines[i]>0?crateTime:0))%1;drawBox(a.x+(b.x-a.x)*t,a.z+(b.z-a.z)*t,.45,horizontal?.04:.8,horizontal?.8:.04,.02,['#b3c2ab','#617963','#819780'])}
    }
  }
  function selectionRing(pos){var p=project(pos.x,.02,pos.z);ctx.beginPath();ctx.ellipse(p.x,p.y,unit*1.9,unit*.95,0,0,Math.PI*2);ctx.strokeStyle='#b6eb8e';ctx.lineWidth=2;ctx.stroke()}
  function depthOf(pos){return rotate(pos.x,pos.z).z}
  function render(now){
    drawFloor();if(selected>=0)selectionRing(machinePos[selected]);
    var speed=production()>0?Math.min(.07,.016+production()*.00002):0;
    crateTime=(crateTime+Math.min(100,now-(render.last||now))/1000*speed)%1;render.last=now;
    var jobs=machinePos.map(function(pos,i){return {depth:depthOf(pos),draw:function(){drawStage(pos,i,now)}}});
    customers.forEach(function(c,i){jobs.push({depth:depthOf({x:5+i*.65,z:7+i*.25}),draw:function(){drawCustomer(c,now,i)}})});
    for(var stage=0;stage<5;stage++){for(var item=0;item<Math.min(3,state.stock[stage]);item++){(function(i,k){var a=machinePos[i],b=machinePos[i+1],t=(crateTime+k/3)%1,x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t;jobs.push({depth:depthOf({x:x,z:z}),draw:function(){if(i===1)plant(x,z,.5,.65);else if(i===3)jar(x,z,.5);else drawBox(x,z,.5,.5,.5,.3,i===0?['#e4c997','#9a7c53','#b79e73']:['#a0c78e','#557a52','#7ca271'])}})})(stage,item)}}
    jobs.sort(function(a,b){return a.depth-b.depth});jobs.forEach(function(job){job.draw()});
    for(var i=particles.length-1;i>=0;i--){var p=particles[i];p.life-=.025;p.x+=p.vx;p.y+=p.vy;p.vy+=.08;ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,4,4);ctx.globalAlpha=1;if(p.life<=0)particles.splice(i,1)}
    updateMarkers();requestAnimationFrame(render);
  }
  function burst(worldPos,color){var p=project(worldPos.x,1.4,worldPos.z);for(var i=0;i<12;i++)particles.push({x:p.x,y:p.y,vx:(Math.random()-.5)*4,vy:-Math.random()*4-1,life:1,color:color||colors.acid})}

  var markerEls=LINES.map(function(line,i){var b=document.createElement('button');b.className='marker';b.textContent=line.name;b.onclick=function(){selectMachine(i)};$('markers').appendChild(b);return b});
  function updateMarkers(){markerEls.forEach(function(el,i){var pos=project(machinePos[i].x,3.8,machinePos[i].z);el.style.left=pos.x+'px';el.style.top=pos.y+'px';el.style.display=pos.x<-80||pos.x>width+80||pos.y<-40||pos.y>height+40?'none':'block'})}
  function renderUI(){
    var line=LINES[selected],open=isOpen(selected),level=state.lines[selected],price=cost(selected),affordable=open&&state.money>=price;
    $('money').textContent=fmt(state.money);$('rate').textContent=fmt(production())+'/s';$('tapValue').textContent='+'+fmt(tapValue());
    $('machineNumber').textContent=!open?'BUILD PREVIOUS STAGE':level?'STAGE 0'+(selected+1)+' · ACTIVE':'STAGE 0'+(selected+1)+' · NOT BUILT';
    $('machineName').textContent=line.name;$('machineLevel').textContent=level;$('machineRate').textContent=capacity(selected).toFixed(1)+'× speed';
    $('machineCost').textContent=fmt(price);$('buyMachine').disabled=!affordable;$('buyMachine').querySelector('span').textContent=!open?'LOCKED':level?'UPGRADE':'BUILD';
    $('buyMachine').style.setProperty('--funded',Math.min(100,state.money/price*100)+'%');
    $('upgradeHint').textContent=!open?'Build '+LINES[selected-1].name.toLowerCase()+' first.':!affordable?fmt(price-state.money)+' to go · tap WORK to earn cash.':level?'Upgrade for faster '+['seeding','growing','picking','packing','order preparation','customer service'][selected]+'.':'Build this stage to extend your line.';
    $('upgradeHint').classList.toggle('ready',affordable);
    $('customerStatus').textContent=customers.filter(function(c){return c.phase==='waiting'}).length+' waiting · '+state.stock[4]+' orders ready · '+state.sold+' served';$('stockStatus').textContent=state.stock.join(' → ');var order=ORDERS[state.contract];
    if(order){$('orderName').textContent=state.lifetime>=order.goal?'ORDER READY TO CLAIM':order.name;$('orderProgress').textContent=fmt(Math.min(state.lifetime,order.goal))+' / '+fmt(order.goal);$('orderFill').style.width=Math.min(100,state.lifetime/order.goal*100)+'%';$('claimReward').textContent='+'+fmt(order.reward);$('claim').disabled=state.lifetime<order.goal}
    else{$('orderName').textContent='ALL ORDERS FILLED';$('orderProgress').textContent='COMPLETE';$('orderFill').style.width='100%';$('claimReward').textContent='✓';$('claim').disabled=true}
    $('orderBadge').hidden=!order||state.lifetime<order.goal;
    var boostPrice=Math.floor(250*Math.pow(4,state.globalLevel));$('boostCost').textContent=fmt(boostPrice);$('boost').disabled=state.money<boostPrice;
    markerEls.forEach(function(el,i){var locked=!isOpen(i);el.classList.toggle('selected',i===selected);el.classList.toggle('locked',locked);el.textContent=i===selected?LINES[i].name:'0'+(i+1);el.setAttribute('aria-label',LINES[i].name+(locked?', locked':', level '+state.lines[i]));el.setAttribute('aria-pressed',String(i===selected))});
    machineTabs.forEach(function(tab,i){var locked=!isOpen(i),available=!locked&&state.money>=cost(i);tab.setAttribute('aria-pressed',String(i===selected));tab.classList.toggle('is-locked',locked);tab.classList.toggle('can-upgrade',available);tab.querySelector('em').textContent=locked?'Locked':state.lines[i]?'Level '+state.lines[i]:available?'Build now':'Not built'});
  }
  var machineTabs=Array.prototype.slice.call(document.querySelectorAll('[data-machine]'));
  machineTabs.forEach(function(tab){tab.onclick=function(){selectMachine(Number(tab.getAttribute('data-machine')))}});
  var trayTabs=Array.prototype.slice.call(document.querySelectorAll('[data-tray]'));
  trayTabs.forEach(function(tab){tab.onclick=function(){var name=tab.getAttribute('data-tray');trayTabs.forEach(function(t){t.setAttribute('aria-pressed',String(t===tab))});Array.prototype.forEach.call(document.querySelectorAll('[data-pane]'),function(pane){pane.hidden=pane.getAttribute('data-pane')!==name});fitControls()}});
  function paintThumbnails(){var savedCtx=ctx,savedUnit=unit,savedX=centerX,savedY=centerY,savedAngle=angle;machineTabs.forEach(function(tab,i){ctx=tab.querySelector('canvas').getContext('2d');if(!ctx)return;unit=19;centerX=80;centerY=86;angle=.57;drawStage({x:0,z:0},i,0)});ctx=savedCtx;unit=savedUnit;centerX=savedX;centerY=savedY;angle=savedAngle}
  function selectMachine(i){selected=i;renderUI();if(navigator.vibrate)navigator.vibrate(8)}
  function buySelected(){var line=LINES[selected];if(!isOpen(selected))return notify('Build the previous stage first');var c=cost(selected);if(state.money<c)return notify('Need '+fmt(c-state.money)+' more');state.money-=c;state.lines[selected]++;burst(machinePos[selected]);notify(line.name+' · LEVEL '+state.lines[selected]);renderUI();save();if(navigator.vibrate)navigator.vibrate(18)}
  function runManual(){var value=tapValue();add(value);burst({x:0,z:0});var f=document.createElement('span');f.className='float';f.textContent='+'+fmt(value);$('floatLayer').appendChild(f);setTimeout(function(){f.remove()},800);renderUI();save();if(navigator.vibrate)navigator.vibrate(10)}
  function boostAll(){var c=Math.floor(250*Math.pow(4,state.globalLevel));if(state.money<c)return notify('Need '+fmt(c-state.money)+' more');state.money-=c;state.globalLevel++;state.multiplier=Math.pow(1.25,state.globalLevel);burst({x:0,z:0},colors.orange);notify('ALL STAGES +25%');renderUI();save()}
  function claimOrder(){var o=ORDERS[state.contract];if(!o||state.lifetime<o.goal)return;state.money+=o.reward;state.contract++;notify(fmt(o.reward)+' ORDER BONUS');renderUI();save()}

  var pointers={},dragStart=null,lastX=0,pinchDistance=0;
  canvas.addEventListener('pointerdown',function(e){canvas.setPointerCapture(e.pointerId);pointers[e.pointerId]={x:e.clientX,y:e.clientY};if(Object.keys(pointers).length===1){dragStart={x:e.clientX,y:e.clientY};lastX=e.clientX}else{var ps=Object.values(pointers);pinchDistance=Math.hypot(ps[0].x-ps[1].x,ps[0].y-ps[1].y)}});
  canvas.addEventListener('pointermove',function(e){if(!pointers[e.pointerId])return;pointers[e.pointerId]={x:e.clientX,y:e.clientY};var ps=Object.values(pointers);if(ps.length===1){angle-=(e.clientX-lastX)*.006;lastX=e.clientX}else if(ps.length===2){var dist=Math.hypot(ps[0].x-ps[1].x,ps[0].y-ps[1].y);if(pinchDistance){zoom=Math.max(.72,Math.min(1.5,zoom+(dist-pinchDistance)*.003));resize()}pinchDistance=dist}});
  canvas.addEventListener('pointerup',function(e){var moved=dragStart?Math.hypot(e.clientX-dragStart.x,e.clientY-dragStart.y):99;if(moved<8&&Object.keys(pointers).length===1){var best=-1,bestDist=68;machinePos.forEach(function(pos,i){var p=project(pos.x,1.4,pos.z),dist=Math.hypot(e.clientX-p.x,e.clientY-p.y);if(dist<bestDist){best=i;bestDist=dist}});if(best>=0)selectMachine(best)}delete pointers[e.pointerId];dragStart=null;pinchDistance=0});
  canvas.addEventListener('wheel',function(e){e.preventDefault();zoom=Math.max(.72,Math.min(1.5,zoom-e.deltaY*.001));resize()},{passive:false});
  window.addEventListener('resize',resize);$('buyMachine').onclick=buySelected;$('run').onclick=runManual;$('boost').onclick=boostAll;$('claim').onclick=claimOrder;$('resetOpen').onclick=function(){$('resetModal').hidden=false};$('resetCancel').onclick=function(){$('resetModal').hidden=true};$('resetConfirm').onclick=function(){state=fresh();work=[0,0,0,0,0,0];customers=[];arrival=0;save();$('resetModal').hidden=true;notify('FACTORY RESET');renderUI()};

  function playLoadSequence(){var steps=Array.prototype.slice.call(document.querySelectorAll('[data-load-step]')),bar=$('loadBar'),percent=$('loadPercent'),status=$('loadStatus'),i=0;function advance(){if(i>0){steps[i-1].classList.remove('active');steps[i-1].classList.add('done');steps[i-1].querySelector('i').textContent='READY'}if(i===steps.length){bar.style.width='100%';percent.textContent='100%';status.textContent='PRODUCTION ONLINE';setTimeout(function(){$('loading').classList.add('done')},220);return}steps[i].classList.add('active');steps[i].querySelector('i').textContent='BUILDING';var value=Math.round((i+1)/steps.length*100);bar.style.width=value+'%';percent.textContent=value+'%';status.textContent=steps[i].querySelector('b').textContent.toUpperCase();i++;setTimeout(advance,150)}advance()}
  var away=Math.min(14400,(Date.now()-state.lastSeen)/1000),offline=production()*away;if(offline>=1){add(offline);setTimeout(function(){notify('WHILE AWAY +'+fmt(offline))},500)}
  function fitControls(){document.documentElement.style.setProperty('--dock-height',$('sheet').getBoundingClientRect().height+'px');resize()}
  if(window.ResizeObserver){new ResizeObserver(fitControls).observe($('sheet'))}
  window.addEventListener('resize',fitControls);
  paintThumbnails();
  fitControls();renderUI();ctx.fillStyle=colors.bg;ctx.fillRect(0,0,width,height);window.__shiftReady=true;playLoadSequence();requestAnimationFrame(render);setInterval(function(){simulate(.25);renderUI()},250);setInterval(save,5000);window.addEventListener('beforeunload',save);

  if(document.modelContext&&document.modelContext.registerTool){document.modelContext.registerTool({name:'read_factory_status',title:'Read factory status',description:'Read cash, production, and machine levels.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute:function(){return{cash:Math.floor(state.money),lifetime:Math.floor(state.lifetime),perSecond:production(),lineLevels:state.lines,stock:state.stock,customersServed:state.sold}}});document.modelContext.registerTool({name:'run_factory_machine',title:'Run factory machine',description:'Run the factory once.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:function(){var value=tapValue();add(value);renderUI();save();return{produced:value,cash:Math.floor(state.money)}}})}
})();
