(function () {
  'use strict';

  var LINES=[
    {name:'ORE CRUSHER',base:10,rate:1,unlock:0},{name:'SMELTER',base:100,rate:8,unlock:25},
    {name:'PARTS PRESS',base:850,rate:50,unlock:250},{name:'PACKING UNIT',base:6500,rate:280,unlock:2500}
  ];
  var ORDERS=[{name:'FIRST BATCH',goal:100,reward:40},{name:'STEADY SUPPLY',goal:1500,reward:450},{name:'MASS MARKET',goal:20000,reward:6000},{name:'CITY CONTRACT',goal:250000,reward:90000}];
  var $=function(id){return document.getElementById(id)};
  function fresh(){return{money:0,lifetime:0,lines:[0,0,0,0],multiplier:1,globalLevel:0,contract:0,lastSeen:Date.now()}}
  function load(){try{var old=JSON.parse(localStorage.getItem('shift-save')||'{}');return Object.assign(fresh(),old,{lines:Array.isArray(old.lines)?old.lines:[0,0,0,0]})}catch(e){return fresh()}}
  var state=load(),selected=0,toastTimer;
  function save(){state.lastSeen=Date.now();localStorage.setItem('shift-save',JSON.stringify(state))}
  function fmt(n){if(n<1000)return '$'+Math.floor(n).toLocaleString();var units=[['T',1e12],['B',1e9],['M',1e6],['K',1e3]];for(var i=0;i<units.length;i++)if(n>=units[i][1])return '$'+(n/units[i][1]).toFixed(n/units[i][1]>=100?0:n/units[i][1]>=10?1:2)+units[i][0]}
  function production(){return LINES.reduce(function(sum,line,i){return sum+line.rate*state.lines[i]},0)*state.multiplier}
  function cost(i){return Math.floor(LINES[i].base*Math.pow(1.16,state.lines[i]))}
  function tapValue(){return Math.max(1,Math.floor(1+production()*.08))}
  function add(n){state.money+=n;state.lifetime+=n}
  function notify(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(function(){$('toast').classList.remove('show')},1600)}

  var world=$('world'),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d',{alpha:false});
  if(!ctx){$('loadStatus').textContent='CANVAS COULD NOT START';$('loadRetry').hidden=false;return}
  world.insertBefore(canvas,world.firstChild);canvas.setAttribute('aria-hidden','true');
  var dpr=1,width=1,height=1,angle=.57,zoom=1,centerX=0,centerY=0,unit=32;
  var colors={bg:'#202226',floorTop:'#303238',floorLeft:'#1c1f23',floorRight:'#272a30',grid:'#41444a',beltEdge:'#111419',belt:'#313943',slat:'#5b6470',oliveTop:'#f4f5ec',oliveLeft:'#a9b6be',oliveRight:'#d5dce0',darkTop:'#56616a',darkLeft:'#252e36',darkRight:'#3b4650',metalTop:'#eef2f3',metalLeft:'#8b9ba8',metalRight:'#becbd4',acid:'#f5c344',orange:'#ff7628',boxTop:'#d3a36c',boxLeft:'#8e6741',boxRight:'#b17f50'};
  var machinePos=[{x:-1.6,z:-6.6},{x:1.6,z:-2.2},{x:-1.6,z:2.2},{x:1.6,z:6.6}];
  var beltNodes=[[-5,-3.2],[0,-3.2],[5,-3.2],[5.4,0],[5,3.2],[0,3.2],[-5,3.2],[-5.4,0]];
  var crateTime=0,particles=[];

  function resize(){var rect=world.getBoundingClientRect();dpr=Math.min(window.devicePixelRatio||1,2);width=Math.max(1,Math.round(rect.width));height=Math.max(1,Math.round(rect.height));canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);canvas.style.width=width+'px';canvas.style.height=height+'px';ctx.setTransform(dpr,0,0,dpr,0,0);centerX=width*.5;centerY=height*.55;unit=Math.min(width/16,height/13)*zoom}
  function rotate(x,z){var c=Math.cos(angle),s=Math.sin(angle);return{x:x*c-z*s,z:x*s+z*c}}
  function project(x,y,z){var r=rotate(x,z);return{x:centerX+r.x*unit,y:centerY+r.z*unit*.5-y*unit,depth:r.z}}
  function poly(points,fill,stroke){ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);for(var i=1;i<points.length;i++)ctx.lineTo(points[i].x,points[i].y);ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke()}}
  function drawBox(x,z,y,w,d,h,palette){var p=palette||[colors.oliveTop,colors.oliveLeft,colors.oliveRight],b0=project(x-w/2,y,z-d/2),b1=project(x+w/2,y,z-d/2),b2=project(x+w/2,y,z+d/2),b3=project(x-w/2,y,z+d/2),t0=project(x-w/2,y+h,z-d/2),t1=project(x+w/2,y+h,z-d/2),t2=project(x+w/2,y+h,z+d/2),t3=project(x-w/2,y+h,z+d/2);poly(Math.cos(angle)>=0?[b3,b2,t2,t3]:[b0,b1,t1,t0],p[1],'#00000018');poly(Math.sin(angle)>=0?[b2,b1,t1,t2]:[b3,b0,t0,t3],p[2],'#00000018');poly([t0,t1,t2,t3],p[0],'#ffffff20')}
  function groundPatch(x,z,w,d,fill){poly([project(x-w/2,.015,z-d/2),project(x+w/2,.015,z-d/2),project(x+w/2,.015,z+d/2),project(x-w/2,.015,z+d/2)],fill)}
  function glow(x,y,r,color){var g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'#00000000');ellipse(x,y,r,r*.6,g)}
  function machineDetails(pos,i,time){
    var steel=['#bcc3b7','#697166','#899182'],dark=['#444b3e','#20271e','#30392a'];
    // Raised feet, service panel and hazard-striped plinth are shared industrial parts.
    for(var j=0;j<5;j++)drawBox(pos.x-.98+j*.48,pos.z+1.19,.29,.23,.08,.16,j%2?dark:['#d7e75e','#737c31','#a4b147']);
    drawBox(pos.x+1.12,pos.z+.35,.65,.28,.55,.72,dark);
    drawLight(pos.x+1.28,pos.z+.64,1.12,state.lines[i]>0);
    if(i===0){
      drawBox(pos.x,pos.z,2.32,1.72,1.45,.05,['#141912','#11160f','#1a2116']);
      for(j=0;j<4;j++)drawBox(pos.x-.58+j*.39,pos.z,2.38,.21,1.15,.13,steel);
      drawBox(pos.x,pos.z-.96,2.3,2.3,.12,.28,steel);
      drawBox(pos.x-1.08,pos.z,2.3,.12,1.95,.28,steel);
      drawBox(pos.x+1.08,pos.z,2.3,.12,1.95,.28,steel);
    }else if(i===1){
      for(j=0;j<4;j++)drawBox(pos.x-.65+j*.43,pos.z-.12,2.78,.17,1.25,.09,dark);
      drawBox(pos.x,pos.z,3.61,.96,.96,.16,steel);
      if(state.lines[i]){var fire=project(pos.x,1.3,pos.z+1.2);glow(fire.x,fire.y,unit*1.8,'#ff8d3038');for(j=0;j<4;j++){var phase=(time*.00025+j/4)%1,smoke=project(pos.x+Math.sin(phase*4+j)*.16,3.9+phase*1.7,pos.z);ellipse(smoke.x,smoke.y,unit*(.14+phase*.3),unit*(.1+phase*.16),'rgba(177,191,158,'+((1-phase)*.14)+')')}}
    }else if(i===2){
      var drop=state.lines[i]?(Math.sin(time*.008)+1)*.33:.22;
      drawBox(pos.x,pos.z,1.72+drop,.25,.25,1.52-drop,steel);
      drawBox(pos.x,pos.z,.58,1.45,1.25,.17,steel);
      drawBox(pos.x,pos.z,3.92,.75,.7,.26,dark);
    }else{
      drawBox(pos.x,pos.z,3.62,.72,.72,.42,steel);
      drawBox(pos.x,pos.z,3.65,.23,.75,.38,['#e4d3a8','#97885f','#b5a476']);
      drawBox(pos.x,pos.z,.61,.95,.85,.65,[colors.boxTop,colors.boxLeft,colors.boxRight]);
      drawBox(pos.x,pos.z,1.26,.2,.86,.02,['#f1d5a2','#b29970','#cfb78e']);
    }
  }
  function ellipse(x,y,rx,ry,fill){ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill()}
  function beltPoint(t){t=(t%1+1)%1;var scaled=t*beltNodes.length,i=Math.floor(scaled),f=scaled-i,a=beltNodes[i%beltNodes.length],b=beltNodes[(i+1)%beltNodes.length];return{x:a[0]+(b[0]-a[0])*f,z:a[1]+(b[1]-a[1])*f}}
  function drawFloor(){
    ctx.fillStyle=colors.bg;ctx.fillRect(0,0,width,height);
    drawBox(0,0,-.3,38,32,.3,['#2b2e32','#1c2025','#25282d']);
    ctx.strokeStyle='#ffffff09';ctx.lineWidth=.6;
    for(var n=-19;n<=19;n++){var a=project(n,0,-16),b=project(n,0,16);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
    for(n=-16;n<=16;n++){a=project(-19,0,n);b=project(19,0,n);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
    machinePos.forEach(function(pos){for(var x=-12;x<12;x+=1.2){groundPatch(x,pos.z+1.7,.55,.07,'#bda34088');groundPatch(x,pos.z-1.7,.55,.07,'#bda34088')}});
  }
  function drawRobot(x,z,time,active,phase){
    var yellow=['#ffdb39','#ad7e0c','#e6b315'];
    drawBox(x,z,.02,.95,.95,.25,[colors.metalTop,colors.metalLeft,colors.metalRight]);
    drawBox(x,z,.27,.62,.62,.35,yellow);
    var swing=active?Math.sin(time*.002+phase):0,base=project(x,.62,z),elbow=project(x+.6+swing*.18,2.15,z),tip=project(x+1.25+swing*.45,1.45+swing*.3,z-.3);
    ctx.lineCap='round';ctx.lineJoin='round';
    function arm(a,b){ctx.beginPath();ctx.moveTo(a.x+2,a.y+3);ctx.lineTo(b.x+2,b.y+3);ctx.strokeStyle='#866514';ctx.lineWidth=unit*.32;ctx.stroke();ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle='#ffcd20';ctx.lineWidth=unit*.23;ctx.stroke()}
    arm(base,elbow);arm(elbow,tip);
    [base,elbow,tip].forEach(function(p){ellipse(p.x,p.y,unit*.16,unit*.16,'#e2e6df');ellipse(p.x,p.y,unit*.08,unit*.08,'#717c81')});
    ctx.beginPath();ctx.moveTo(tip.x-unit*.15,tip.y+unit*.12);ctx.lineTo(tip.x-unit*.15,tip.y+unit*.32);ctx.moveTo(tip.x+unit*.15,tip.y+unit*.12);ctx.lineTo(tip.x+unit*.15,tip.y+unit*.32);ctx.strokeStyle='#303b43';ctx.lineWidth=unit*.09;ctx.stroke();
  }
  function lineItem(x,z,i){
    var palettes=[['#9caab3','#4f5e69','#72838f'],['#ffa44b','#ad441b','#dd692d'],['#83b1ce','#345575','#547f9e'],[colors.boxTop,colors.boxLeft,colors.boxRight]];
    drawBox(x,z,.52,.65,.65,.4,palettes[i]);
    if(i===3)drawBox(x,z,.92,.17,.66,.02,['#f6ddad','#bdac86','#ddc79b']);
  }
  function addProductionLine(jobs,i,now){
    var pos=machinePos[i],z=pos.z,active=state.lines[i]>0;
    function job(x,z,draw){jobs.push({depth:depthOf({x:x,z:z}),draw:draw})}
    // Each line has its own rollers, products and two working robots.
    job(0,z,function(){
      drawBox(0,z,.08,24,1.4,.35,['#3f4854','#28313b','#323d49']);
      for(var j=0;j<52;j++){var x=-12+((j/52+(active?crateTime:0))%1)*24;
        poly([project(x,.44,z-.61),project(x+.05,.44,z-.61),project(x+.05,.44,z+.61),project(x,.44,z+.61)],'#727e8d66')}
    });
    [-.8,.8].forEach(function(side){for(var n=-10;n<=10;n+=4){(function(x,s){job(x,z+s,function(){drawBox(x,z+s,.02,.3,.25,.85,[colors.metalTop,colors.metalLeft,colors.metalRight]);drawBox(x+2,z+s,.61,4,.12,.19,[colors.metalTop,colors.metalLeft,colors.metalRight])})})(n,side)}});
    [-5.6,5].forEach(function(x,j){job(x,z-1.15,function(){drawRobot(x,z-1.15,now,active,i+j*2)})});
    job(pos.x,z,function(){[drawCrusher,drawSmelter,drawPress,drawPacker][i](pos,now);machineDetails(pos,i,now)});
    if(active){var count=Math.min(8,3+state.lines[i]);for(var j=0;j<count;j++){(function(t){var x=-11+t*22;job(x,z,function(){lineItem(x,z,i)})})((crateTime+j/count)%1)}}
  }
  function selectionRing(pos){var p=project(pos.x,.04,pos.z),rx=unit*1.7,ry=unit*.82;ctx.beginPath();ctx.ellipse(p.x,p.y,rx,ry,0,0,Math.PI*2);ctx.strokeStyle=colors.acid;ctx.lineWidth=2;ctx.setLineDash([6,5]);ctx.stroke();ctx.setLineDash([])}
  function drawCrusher(pos,time){drawBox(pos.x,pos.z,.02,2.6,2.4,.55,[colors.darkTop,colors.darkLeft,colors.darkRight]);drawBox(pos.x,pos.z,.57,1.9,1.7,1.25,[colors.oliveTop,colors.oliveLeft,colors.oliveRight]);drawBox(pos.x,pos.z,1.82,2.3,2.0,.5,[colors.metalTop,colors.metalLeft,colors.metalRight]);var gap=state.lines[0]?Math.sin(time*.01)*.16:0;drawBox(pos.x-.48+gap,pos.z,1.08,.72,.9,.55,[colors.metalTop,colors.metalLeft,colors.metalRight]);drawBox(pos.x+.48-gap,pos.z,1.08,.72,.9,.55,[colors.metalTop,colors.metalLeft,colors.metalRight]);drawLight(pos.x,pos.z+1.23,.76,state.lines[0]>0)}
  function drawSmelter(pos,time){drawBox(pos.x,pos.z,.02,2.7,2.4,.55,[colors.darkTop,colors.darkLeft,colors.darkRight]);drawBox(pos.x,pos.z,.57,2.15,1.9,2.2,[colors.oliveTop,colors.oliveLeft,colors.oliveRight]);drawBox(pos.x,pos.z+1,1.1,1.05,.16,.9,[colors.orange,'#9c330e','#c64b17']);drawBox(pos.x,pos.z,2.77,.75,.75,.85,[colors.darkTop,colors.darkLeft,colors.darkRight]);if(state.lines[1]){var p=project(pos.x,1.55,pos.z+1.12);ellipse(p.x,p.y,unit*(.34+Math.sin(time*.008)*.04),unit*.17,'#ff9b37')}}
  function drawPress(pos,time){drawBox(pos.x,pos.z,.02,2.7,2.5,.55,[colors.darkTop,colors.darkLeft,colors.darkRight]);drawBox(pos.x-.9,pos.z,.57,.32,1.4,2.7,[colors.metalTop,colors.metalLeft,colors.metalRight]);drawBox(pos.x+.9,pos.z,.57,.32,1.4,2.7,[colors.metalTop,colors.metalLeft,colors.metalRight]);drawBox(pos.x,pos.z,3.27,2.45,1.45,.65,[colors.oliveTop,colors.oliveLeft,colors.oliveRight]);var drop=state.lines[2]?(Math.sin(time*.008)+1)*.33:.22;drawBox(pos.x,pos.z,1.1+drop,1.15,1.05,.62,[colors.metalTop,colors.metalLeft,colors.metalRight]);drawLight(pos.x,pos.z+.74,3.4,state.lines[2]>0)}
  function drawPacker(pos,time){drawBox(pos.x,pos.z,.02,2.8,2.4,.55,[colors.darkTop,colors.darkLeft,colors.darkRight]);drawBox(pos.x-1,pos.z,.57,.35,1.4,2.5,[colors.metalTop,colors.metalLeft,colors.metalRight]);drawBox(pos.x+1,pos.z,.57,.35,1.4,2.5,[colors.metalTop,colors.metalLeft,colors.metalRight]);drawBox(pos.x,pos.z,3.07,2.35,1.35,.55,[colors.oliveTop,colors.oliveLeft,colors.oliveRight]);drawBox(pos.x,pos.z,1.35,1.5,.65,.72,[colors.orange,'#9c330e','#c64b17']);drawLight(pos.x,pos.z+.7,3.18,state.lines[3]>0)}
  function drawLight(x,z,y,on){var p=project(x,y,z);ellipse(p.x,p.y,Math.max(3,unit*.12),Math.max(2,unit*.065),on?colors.acid:'#272a23');if(on){ctx.strokeStyle='#d7ff4388';ctx.lineWidth=unit*.12;ctx.stroke()}}
  function drawCrate(t){var pos=beltPoint(t),p=project(pos.x,.3,pos.z);ellipse(p.x,p.y,unit*.48,unit*.22,'#00000040');drawBox(pos.x,pos.z,.36,.72,.72,.72,[colors.boxTop,colors.boxLeft,colors.boxRight]);drawBox(pos.x,pos.z,1.08,.17,.73,.015,['#efd5a5','#b7a17b','#d4bd93']);drawBox(pos.x,pos.z+.365,.63,.3,.015,.21,['#f2ead7','#d6ccb6','#ebe0c8']);return pos}
  function depthOf(pos){return rotate(pos.x,pos.z).z}
  function render(now){
    drawFloor();if(selected>=0)selectionRing(machinePos[selected]);
    var speed=production()>0?Math.min(.07,.016+production()*.00002):0;
    crateTime=(crateTime+Math.min(100,now-(render.last||now))/1000*speed)%1;render.last=now;
    var jobs=[];for(var i=0;i<4;i++)addProductionLine(jobs,i,now);
    jobs.sort(function(a,b){return a.depth-b.depth});jobs.forEach(function(job){job.draw()});
    for(i=particles.length-1;i>=0;i--){var p=particles[i];p.life-=.025;p.x+=p.vx;p.y+=p.vy;p.vy+=.08;ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,4,4);ctx.globalAlpha=1;if(p.life<=0)particles.splice(i,1)}
    updateMarkers();requestAnimationFrame(render);
  }
  function burst(worldPos,color){var p=project(worldPos.x,1.4,worldPos.z);for(var i=0;i<12;i++)particles.push({x:p.x,y:p.y,vx:(Math.random()-.5)*4,vy:-Math.random()*4-1,life:1,color:color||colors.acid})}

  var markerEls=LINES.map(function(line,i){var b=document.createElement('button');b.className='marker';b.textContent=line.name;b.onclick=function(){selectMachine(i)};$('markers').appendChild(b);return b});
  function updateMarkers(){markerEls.forEach(function(el,i){var pos=project(machinePos[i].x,3.8,machinePos[i].z);el.style.left=pos.x+'px';el.style.top=pos.y+'px';el.style.display=pos.x<-80||pos.x>width+80||pos.y<-40||pos.y>height+40?'none':'block'})}
  function renderUI(){
    var line=LINES[selected],open=state.lifetime>=line.unlock,level=state.lines[selected],price=cost(selected),affordable=open&&state.money>=price;
    $('money').textContent=fmt(state.money);$('rate').textContent=fmt(production())+'/s';$('tapValue').textContent='+'+fmt(tapValue());
    $('machineNumber').textContent=!open?'LOCKED · '+fmt(line.unlock)+' TOTAL EARNED':level?'MACHINE 0'+(selected+1)+' · RUNNING':'MACHINE 0'+(selected+1)+' · NOT BUILT';
    $('machineName').textContent=line.name;$('machineLevel').textContent=level;$('machineRate').textContent=fmt(line.rate*level*state.multiplier)+'/s';
    $('machineCost').textContent=fmt(price);$('buyMachine').disabled=!affordable;$('buyMachine').querySelector('span').textContent=!open?'LOCKED':level?'UPGRADE':'BUILD';
    $('buyMachine').style.setProperty('--funded',Math.min(100,state.money/price*100)+'%');
    $('upgradeHint').textContent=!open?'Earn '+fmt(Math.max(0,line.unlock-state.lifetime))+' more to unlock this machine.':!affordable?fmt(price-state.money)+' to go · '+(production()>0?'Keep producing or tap Run.':'Tap Run to earn cash.'):(level?'Next level':'Build machine')+' adds '+fmt(line.rate*state.multiplier)+'/s';
    $('upgradeHint').classList.toggle('ready',affordable);
    var order=ORDERS[state.contract];
    if(order){$('orderName').textContent=state.lifetime>=order.goal?'ORDER READY TO CLAIM':order.name;$('orderProgress').textContent=fmt(Math.min(state.lifetime,order.goal))+' / '+fmt(order.goal);$('orderFill').style.width=Math.min(100,state.lifetime/order.goal*100)+'%';$('claimReward').textContent='+'+fmt(order.reward);$('claim').disabled=state.lifetime<order.goal}
    else{$('orderName').textContent='ALL ORDERS FILLED';$('orderProgress').textContent='COMPLETE';$('orderFill').style.width='100%';$('claimReward').textContent='✓';$('claim').disabled=true}
    $('orderBadge').hidden=!order||state.lifetime<order.goal;
    var boostPrice=Math.floor(250*Math.pow(4,state.globalLevel));$('boostCost').textContent=fmt(boostPrice);$('boost').disabled=state.money<boostPrice;
    markerEls.forEach(function(el,i){var locked=state.lifetime<LINES[i].unlock;el.classList.toggle('selected',i===selected);el.classList.toggle('locked',locked);el.textContent=i===selected?LINES[i].name:'0'+(i+1);el.setAttribute('aria-label',LINES[i].name+(locked?', locked':', level '+state.lines[i]));el.setAttribute('aria-pressed',String(i===selected))});
    machineTabs.forEach(function(tab,i){var locked=state.lifetime<LINES[i].unlock,available=!locked&&state.money>=cost(i);tab.setAttribute('aria-pressed',String(i===selected));tab.classList.toggle('is-locked',locked);tab.classList.toggle('can-upgrade',available);tab.querySelector('em').textContent=locked?'Locked':state.lines[i]?'Level '+state.lines[i]:available?'Build now':'Not built'});
  }
  var machineTabs=Array.prototype.slice.call(document.querySelectorAll('[data-machine]'));
  machineTabs.forEach(function(tab){tab.onclick=function(){selectMachine(Number(tab.getAttribute('data-machine')))}});
  var trayTabs=Array.prototype.slice.call(document.querySelectorAll('[data-tray]'));
  trayTabs.forEach(function(tab){tab.onclick=function(){var name=tab.getAttribute('data-tray');trayTabs.forEach(function(t){t.setAttribute('aria-pressed',String(t===tab))});Array.prototype.forEach.call(document.querySelectorAll('[data-pane]'),function(pane){pane.hidden=pane.getAttribute('data-pane')!==name});fitControls()}});
  function paintThumbnails(){var savedCtx=ctx,savedUnit=unit,savedX=centerX,savedY=centerY,savedAngle=angle;machineTabs.forEach(function(tab,i){var thumb=tab.querySelector('canvas');ctx=thumb.getContext('2d');if(!ctx)return;unit=19;centerX=80;centerY=86;angle=.57;[drawCrusher,drawSmelter,drawPress,drawPacker][i]({x:0,z:0},0);machineDetails({x:0,z:0},i,0)});ctx=savedCtx;unit=savedUnit;centerX=savedX;centerY=savedY;angle=savedAngle}
  function selectMachine(i){selected=i;renderUI();if(navigator.vibrate)navigator.vibrate(8)}
  function buySelected(){var line=LINES[selected];if(state.lifetime<line.unlock)return notify('Unlocks at '+fmt(line.unlock));var c=cost(selected);if(state.money<c)return notify('Need '+fmt(c-state.money)+' more');state.money-=c;state.lines[selected]++;burst(machinePos[selected]);notify(line.name+' · LEVEL '+state.lines[selected]);renderUI();save();if(navigator.vibrate)navigator.vibrate(18)}
  function runManual(){var value=tapValue();add(value);burst({x:0,z:0});var f=document.createElement('span');f.className='float';f.textContent='+'+fmt(value);$('floatLayer').appendChild(f);setTimeout(function(){f.remove()},800);renderUI();save();if(navigator.vibrate)navigator.vibrate(10)}
  function boostAll(){var c=Math.floor(250*Math.pow(4,state.globalLevel));if(state.money<c)return notify('Need '+fmt(c-state.money)+' more');state.money-=c;state.globalLevel++;state.multiplier=Math.pow(1.25,state.globalLevel);burst({x:0,z:0},colors.orange);notify('ALL MACHINES +25%');renderUI();save()}
  function claimOrder(){var o=ORDERS[state.contract];if(!o||state.lifetime<o.goal)return;state.money+=o.reward;state.contract++;notify(fmt(o.reward)+' ORDER BONUS');renderUI();save()}

  var pointers={},dragStart=null,lastX=0,pinchDistance=0;
  canvas.addEventListener('pointerdown',function(e){canvas.setPointerCapture(e.pointerId);pointers[e.pointerId]={x:e.clientX,y:e.clientY};if(Object.keys(pointers).length===1){dragStart={x:e.clientX,y:e.clientY};lastX=e.clientX}else{var ps=Object.values(pointers);pinchDistance=Math.hypot(ps[0].x-ps[1].x,ps[0].y-ps[1].y)}});
  canvas.addEventListener('pointermove',function(e){if(!pointers[e.pointerId])return;pointers[e.pointerId]={x:e.clientX,y:e.clientY};var ps=Object.values(pointers);if(ps.length===1){angle-=(e.clientX-lastX)*.006;lastX=e.clientX}else if(ps.length===2){var dist=Math.hypot(ps[0].x-ps[1].x,ps[0].y-ps[1].y);if(pinchDistance){zoom=Math.max(.72,Math.min(1.5,zoom+(dist-pinchDistance)*.003));resize()}pinchDistance=dist}});
  canvas.addEventListener('pointerup',function(e){var moved=dragStart?Math.hypot(e.clientX-dragStart.x,e.clientY-dragStart.y):99;if(moved<8&&Object.keys(pointers).length===1){var best=-1,bestDist=68;machinePos.forEach(function(pos,i){var p=project(pos.x,1.4,pos.z),dist=Math.hypot(e.clientX-p.x,e.clientY-p.y);if(dist<bestDist){best=i;bestDist=dist}});if(best>=0)selectMachine(best)}delete pointers[e.pointerId];dragStart=null;pinchDistance=0});
  canvas.addEventListener('wheel',function(e){e.preventDefault();zoom=Math.max(.72,Math.min(1.5,zoom-e.deltaY*.001));resize()},{passive:false});
  window.addEventListener('resize',resize);$('buyMachine').onclick=buySelected;$('run').onclick=runManual;$('boost').onclick=boostAll;$('claim').onclick=claimOrder;$('resetOpen').onclick=function(){$('resetModal').hidden=false};$('resetCancel').onclick=function(){$('resetModal').hidden=true};$('resetConfirm').onclick=function(){state=fresh();save();$('resetModal').hidden=true;notify('FACTORY RESET');renderUI()};

  function playLoadSequence(){var steps=Array.prototype.slice.call(document.querySelectorAll('[data-load-step]')),bar=$('loadBar'),percent=$('loadPercent'),status=$('loadStatus'),i=0;function advance(){if(i>0){steps[i-1].classList.remove('active');steps[i-1].classList.add('done');steps[i-1].querySelector('i').textContent='READY'}if(i===steps.length){bar.style.width='100%';percent.textContent='100%';status.textContent='PRODUCTION ONLINE';setTimeout(function(){$('loading').classList.add('done')},220);return}steps[i].classList.add('active');steps[i].querySelector('i').textContent='BUILDING';var value=Math.round((i+1)/steps.length*100);bar.style.width=value+'%';percent.textContent=value+'%';status.textContent=steps[i].querySelector('b').textContent.toUpperCase();i++;setTimeout(advance,150)}advance()}
  var away=Math.min(14400,(Date.now()-state.lastSeen)/1000),offline=production()*away;if(offline>=1){add(offline);setTimeout(function(){notify('WHILE AWAY +'+fmt(offline))},500)}
  function fitControls(){document.documentElement.style.setProperty('--dock-height',$('sheet').getBoundingClientRect().height+'px');resize()}
  if(window.ResizeObserver){new ResizeObserver(fitControls).observe($('sheet'))}
  window.addEventListener('resize',fitControls);
  paintThumbnails();
  fitControls();renderUI();ctx.fillStyle=colors.bg;ctx.fillRect(0,0,width,height);window.__shiftReady=true;playLoadSequence();requestAnimationFrame(render);setInterval(function(){add(production()/4);renderUI()},250);setInterval(save,5000);window.addEventListener('beforeunload',save);

  if(document.modelContext&&document.modelContext.registerTool){document.modelContext.registerTool({name:'read_factory_status',title:'Read factory status',description:'Read cash, production, and machine levels.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute:function(){return{cash:Math.floor(state.money),lifetime:Math.floor(state.lifetime),perSecond:production(),lineLevels:state.lines}}});document.modelContext.registerTool({name:'run_factory_machine',title:'Run factory machine',description:'Run the factory once.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:function(){var value=tapValue();add(value);renderUI();save();return{produced:value,cash:Math.floor(state.money)}}})}
})();
