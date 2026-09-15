(function () {
  'use strict';

  var LINES=[
    {name:'SEED STATION',base:10,rate:1,unlock:0},{name:'GROW ROOM',base:25,rate:1,unlock:0},
    {name:'PICKING TABLE',base:40,rate:1,unlock:0},{name:'PACKING BAR',base:65,rate:1,unlock:0},
    {name:'ORDER DESK',base:90,rate:1,unlock:0},{name:'CUSTOMER PICKUP',base:120,rate:1,unlock:0}
  ];
  var ORDERS=[{name:'FIRST BATCH',goal:100,reward:40},{name:'STEADY SUPPLY',goal:1500,reward:450},{name:'MASS MARKET',goal:20000,reward:6000},{name:'CITY CONTRACT',goal:250000,reward:90000}];
  var $=function(id){return document.getElementById(id)};
  function fresh(){return{money:30,lifetime:0,lines:[1,1,1,1,1,1],stock:[0,0,0,0,0],staff:[0,0,0,0,0,0],sold:0,onlineCompleted:0,multiplier:1,globalLevel:0,contract:0,lastSeen:Date.now(),theme:'dispensary'}}
  function load(){try{var old=JSON.parse(localStorage.getItem('shift-save')||'{}'),next=Object.assign(fresh(),old);next.lines=LINES.map(function(_,i){return Math.max(1,Math.floor(Number(old.lines&&old.lines[i])||0))});next.stock=Array.from({length:5},function(_,i){return Math.max(0,Math.min(100,Number(old.stock&&old.stock[i])||0))});next.staff=LINES.map(function(_,i){return Math.max(0,Math.floor(Number(old.staff&&old.staff[i])||0))});next.theme='dispensary';return next}catch(e){return fresh()}}
  var state=load(),selected=0,toastTimer;
  function save(){state.lastSeen=Date.now();localStorage.setItem('shift-save',JSON.stringify(state))}
  function fmt(n){if(n<1000)return '$'+Math.floor(n).toLocaleString();var units=[['T',1e12],['B',1e9],['M',1e6],['K',1e3]];for(var i=0;i<units.length;i++)if(n>=units[i][1])return '$'+(n/units[i][1]).toFixed(n/units[i][1]>=100?0:n/units[i][1]>=10?1:2)+units[i][0]}
  function capacity(i){return state.lines[i]>0?(1+(state.lines[i]-1)*.4)*(1+state.staff[i]*.3)*state.multiplier:0}
  function isOpen(i){return i===0||state.lines[i-1]>0}
  function production(){return Math.min.apply(null,LINES.map(function(_,i){return capacity(i)/[2,3,2,2,2,3][i]}))*18}
  var work=[0,0,0,0,0,0],customers=[],arrival=0,customerId=0;
  function queueLimit(){return Math.min(12,4+Math.floor(Math.max(0,state.lines[4]-1)/2)+Math.floor(state.staff[4]/2))}
  function simulate(dt){
    arrival+=dt;
    if(arrival>=3.5&&customers.filter(function(c){return c.phase!=='leaving'}).length<queueLimit()){
      arrival=0;customers.push({id:customerId++,phase:'entering',t:0,bag:false,ordered:false,x:-16,z:7.4});
    }
    customers.forEach(function(c){
      var target=customerTarget(c),dx=target.x-c.x,dz=target.z-c.z,distance=Math.hypot(dx,dz),step=Math.min(distance,dt*2.8);
      if(distance>.001){c.x+=dx/distance*step;c.z+=dz/distance*step}
      c.walking=distance>.08;
      if(distance<=step+.08){if(c.phase==='entering')c.phase='ordering';else if(c.phase==='toPickup')c.phase='pickup';else if(c.phase==='leaving')c.t=1}
    });
    customers=customers.filter(function(c){return c.phase!=='leaving'||c.t<1});
    if(state.lines[5]){
      var pickups=customers.filter(function(c){return c.phase==='pickup'&&c.ordered}).slice(0,1).filter(function(c){return Math.hypot(c.x-4,c.z-7.4)<.15});
      if(pickups.length&&state.stock[4]>0){work[5]+=dt*capacity(5)/3;var served=Math.min(Math.floor(work[5]),pickups.length,state.stock[4]);if(served>0){work[5]-=served;state.stock[4]-=served;state.sold+=served;add(served*18);pickups.slice(0,served).forEach(function(c){c.phase='leaving';c.t=0;c.bag=true});burst(machinePos[5],colors.acid)}}else work[5]=Math.min(work[5],.9);
    }
    if(state.lines[4]){
      var queue=customers.filter(function(c){return !c.ordered&&c.phase!=='leaving'}).slice(0,1).filter(function(c){return c.phase==='ordering'&&Math.hypot(c.x+4,c.z-7.4)<.15});
      var reserved=customers.filter(function(c){return c.ordered&&!c.bag}).length,available=Math.max(0,state.stock[4]-reserved);
      if(queue.length&&(state.stock[3]>0||available>0)){
        work[4]+=dt*capacity(4)/2;var count=Math.min(Math.floor(work[4]),queue.length,state.stock[3]+available,100-reserved);
        for(var j=0;j<count;j++){if(available>0)available--;else{state.stock[3]--;state.stock[4]++}queue[j].ordered=true;queue[j].phase='toPickup';queue[j].t=0}work[4]-=count;
      }else work[4]=Math.min(work[4],.9);
    }
    for(var i=3;i>=0;i--){
      if(!state.lines[i])continue;
      if((i>0&&state.stock[i-1]<1)||state.stock[i]>=100){work[i]=Math.min(work[i],.9);continue}
      work[i]+=dt*capacity(i)/[2,3,2,2][i];
      var amount=Math.min(Math.floor(work[i]),i===0?100:state.stock[i-1],100-state.stock[i]);
      if(amount>0){work[i]-=amount;if(i>0)state.stock[i-1]-=amount;state.stock[i]+=amount}
    }
  }
  function staffCost(i){return Math.floor(20*Math.pow(1.6,state.staff[i]))}
  function upgradeStaff(i){if(!state.lines[i])return;var price=staffCost(i);if(state.money<price)return;state.money-=price;state.staff[i]++;burst(machinePos[i],'#b6e58c');notify('EMPLOYEE LEVEL '+state.staff[i]+' · +30% BASE SPEED');renderUI();save()}
  function onlineSize(){return 4+(state.onlineCompleted%5)*3}
  function fulfillOnline(){var qty=onlineSize();if(!state.lines[4]||state.stock[3]<qty)return;state.stock[3]-=qty;state.onlineCompleted++;add(qty*24);notify('ONLINE ORDER SENT · '+fmt(qty*24));burst(machinePos[4],'#dbc38b');renderUI();save()}
  function cost(i){return Math.floor(LINES[i].base*Math.pow(1.16,state.lines[i]))}
  function add(n){state.money+=n;state.lifetime+=n}
  function notify(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(function(){$('toast').classList.remove('show')},1600)}

  var world=$('world'),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d',{alpha:false});
  if(!ctx){$('loadStatus').textContent='CANVAS COULD NOT START';$('loadRetry').hidden=false;return}
  world.insertBefore(canvas,world.firstChild);canvas.setAttribute('aria-hidden','true');
  var dpr=1,width=1,height=1,angle=.57,zoom=1,panX=0,panY=0,centerX=0,centerY=0,unit=32;
  var colors={bg:'#202226',floorTop:'#303238',floorLeft:'#1c1f23',floorRight:'#272a30',grid:'#41444a',beltEdge:'#111419',belt:'#313943',slat:'#5b6470',oliveTop:'#f4f5ec',oliveLeft:'#a9b6be',oliveRight:'#d5dce0',darkTop:'#56616a',darkLeft:'#252e36',darkRight:'#3b4650',metalTop:'#eef2f3',metalLeft:'#8b9ba8',metalRight:'#becbd4',acid:'#f5c344',orange:'#ff7628',boxTop:'#d3a36c',boxLeft:'#8e6741',boxRight:'#b17f50'};
  var machinePos=[{x:-4,z:-5},{x:4,z:-5},{x:4,z:0},{x:-4,z:0},{x:-4,z:5},{x:4,z:5}];
  var beltNodes=[[-5,-3.2],[0,-3.2],[5,-3.2],[5.4,0],[5,3.2],[0,3.2],[-5,3.2],[-5.4,0]];
  var crateTime=0,particles=[],sceneTime=0;
  var motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');

  function resize(){var rect=world.getBoundingClientRect();dpr=Math.min(window.devicePixelRatio||1,2);width=Math.max(1,Math.round(rect.width));height=Math.max(1,Math.round(rect.height));canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);canvas.style.width=width+'px';canvas.style.height=height+'px';ctx.setTransform(dpr,0,0,dpr,0,0);applyCamera()}
  function cameraFrame(){var bottom=width>=780?$('sheet').getBoundingClientRect().height+24:0,top=Math.min(118,height*.25),space=Math.max(120,height-top-bottom);return{x:width*.5,y:top+space*.52,unit:Math.min(width/26,space/17)}}
  function applyCamera(){var frame=cameraFrame();panX=Math.max(-width*1.6,Math.min(width*1.6,panX));panY=Math.max(-height*1.6,Math.min(height*1.6,panY));centerX=frame.x+panX;centerY=frame.y+panY;unit=frame.unit*zoom}
  function zoomAt(next,x,y){next=Math.max(.65,Math.min(2.8,next));var ratio=next/zoom,frame=cameraFrame();panX=x-(x-centerX)*ratio-frame.x;panY=y-(y-centerY)*ratio-frame.y;zoom=next;applyCamera()}
  function rotate(x,z){var c=Math.cos(angle),s=Math.sin(angle);return{x:x*c-z*s,z:x*s+z*c}}
  function project(x,y,z){var r=rotate(x,z);return{x:centerX+r.x*unit,y:centerY+r.z*unit*.5-y*unit,depth:r.z}}
  function poly(points,fill,stroke){ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);for(var i=1;i<points.length;i++)ctx.lineTo(points[i].x,points[i].y);ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke()}}
  function drawBox(x,z,y,w,d,h,palette){var p=palette||[colors.oliveTop,colors.oliveLeft,colors.oliveRight],b0=project(x-w/2,y,z-d/2),b1=project(x+w/2,y,z-d/2),b2=project(x+w/2,y,z+d/2),b3=project(x-w/2,y,z+d/2),t0=project(x-w/2,y+h,z-d/2),t1=project(x+w/2,y+h,z-d/2),t2=project(x+w/2,y+h,z+d/2),t3=project(x-w/2,y+h,z+d/2);poly(Math.cos(angle)>=0?[b3,b2,t2,t3]:[b0,b1,t1,t0],p[1],'#00000018');poly(Math.sin(angle)>=0?[b2,b1,t1,t2]:[b3,b0,t0,t3],p[2],'#00000018');poly([t0,t1,t2,t3],p[0],'#ffffff20')}
  function groundPatch(x,z,w,d,fill){poly([project(x-w/2,.015,z-d/2),project(x+w/2,.015,z-d/2),project(x+w/2,.015,z+d/2),project(x-w/2,.015,z+d/2)],fill)}
  function glow(x,y,r,color){var g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'#00000000');ellipse(x,y,r,r*.6,g)}
  function ellipse(x,y,rx,ry,fill){ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill()}
  function plant(x,z,y,size){
    var base=project(x,y,z),rim=project(x,y+.38,z),r=unit*.3;
    poly([{x:rim.x-r,y:rim.y},{x:rim.x+r,y:rim.y},{x:base.x+r*.72,y:base.y},{x:base.x-r*.72,y:base.y}],'#b67d59');
    ellipse(base.x,base.y,r*.72,r*.24,'#8b583f');ellipse(rim.x,rim.y,r*1.1,r*.48,'#e8b38a');ellipse(rim.x,rim.y,r*.84,r*.32,'#46382c');
    var sway=motionPreference.matches?0:Math.sin(sceneTime*.0013+x+z)*.045;
    var top=project(x+sway,y+.45+size,z);
    ctx.beginPath();ctx.moveTo(rim.x,rim.y);ctx.lineTo(top.x,top.y);ctx.strokeStyle='#86b96b';ctx.lineWidth=Math.max(1,unit*.045);ctx.stroke();
    for(var layer=0;layer<3;layer++){
      var cy=top.y+unit*size*(.55-layer*.3),spread=unit*size*(.52-layer*.09);
      for(var side=-1;side<=1;side+=2){
        var bx=top.x,tx=bx+side*spread,ty=cy-spread*.6;
        ctx.beginPath();ctx.moveTo(bx,cy);ctx.bezierCurveTo(bx+side*spread*.2,cy-spread*.5,tx-side*spread*.15,ty-spread*.22,tx,ty);ctx.bezierCurveTo(tx-side*spread*.1,ty+spread*.35,bx+side*spread*.55,cy+spread*.19,bx,cy);
        ctx.fillStyle=side>0?['#4f9e5b','#74b75f','#a5d37c'][layer]:['#28734a','#3a9154','#64ac61'][layer];ctx.fill();
        ctx.beginPath();ctx.moveTo(bx,cy);ctx.lineTo(tx,ty);ctx.strokeStyle='#b4da7b77';ctx.lineWidth=Math.max(.6,unit*.015);ctx.stroke();
        if(size>.8){var bud=project(x+side*.09,y+.58+size*(.6+layer*.16),z);ellipse(bud.x,bud.y,unit*.09,unit*.13,layer%2?'#a3bd68':'#779b4b')}
      }
    }
    var tip=project(x+sway,y+.62+size,z);ellipse(tip.x,tip.y,unit*size*.09,unit*size*.19,'#abd17a');
  }
  function jar(x,z,y){var base=project(x,y,z),top=project(x,y+.55,z),r=unit*.23;ctx.fillStyle='#82ae93';ctx.fillRect(base.x-r,top.y,r*2,base.y-top.y);ellipse(base.x,base.y,r,r*.45,'#60876d');ellipse(top.x,top.y,r,r*.45,'#c3dfba');ctx.fillStyle='#e3ecd3';ctx.fillRect(top.x-r*.58,top.y+unit*.15,r*1.16,unit*.2);ctx.fillStyle='#d7ead255';ctx.fillRect(top.x-r*.75,top.y+unit*.04,r*.2,unit*.43);ellipse(top.x,top.y-unit*.055,r*1.08,r*.5,'#d6bf87')}
  function worldLine(points,color,weight){ctx.beginPath();points.forEach(function(p,i){var q=project(p[0],p[1],p[2]);if(i)ctx.lineTo(q.x,q.y);else ctx.moveTo(q.x,q.y)});ctx.strokeStyle=color;ctx.lineWidth=Math.max(.65,unit*weight);ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke()}
  function carton(x,z,y,size){
    drawBox(x,z,y,size,size*.75,size*.65,['#e5bc80','#a57c4f','#c99c65']);
    drawBox(x,z,y+size*.65,size*.16,size*.76,.018,['#f0d6a6','#c6aa77','#d7bb85']);
    drawBox(x,z+size*.38,y+size*.16,size*.38,.015,size*.23,['#f7e8c9','#ddd0b4','#eaddbd']);
    worldLine([[x-size*.1,y+size*.26,z+size*.395],[x+size*.1,y+size*.26,z+size*.395]],'#6c7657',.025);
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
      drawBox(x,z,3.28,2.7,.56,.035,['#f7e0ff','#bf98d2','#e1c5f3']);
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
    if(i===5){
      worldLine([[x+.48,1.95,z],[x+.48,2.12,z],[x+.82,2.12,z],[x+.82,1.95,z]],'#a58b54',.035);
      drawBox(x+.65,z+.283,1.49,.26,.018,.23,['#699565','#41653f','#557b4d']);
      jar(x-1.12,z-.46,1.33);jar(x-.5,z-.46,1.33);
    }
  }
  function drawStage(pos,i,now){
    if(motionPreference.matches)now=0;
    var x=pos.x,z=pos.z,active=state.lines[i]>0,stone=['#e0e8de','#7d9387','#adbcaf'],dark=['#416859','#213b32','#315446'];
    drawBox(x,z,.03,3.1,2.5,.3,dark);drawBox(x,z,.33,2.9,2.25,.8,stone);drawBox(x,z,1.13,3.2,2.5,.16,['#ded0b0','#ab9670','#c5b38d']);drawBox(x,z,1.29,3.12,2.42,.035,['#f0e5cb','#b8aa8b','#d6c7a6']);
    for(var panel=0;panel<2;panel++){drawBox(x-.75+panel*1.5,z+1.135,.44,1.32,.04,.55,['#c6d8c4','#526f5b','#90ad96']);drawBox(x-.75+panel*1.5,z+1.17,.75,.32,.045,.045,['#e3d6ac','#958d70','#c3b68f'])}
    drawBox(x+1.46,z,.37,.035,2.1,.63,['#a8bda9','#65846f','#8da38e']);
    for(var seam=0;seam<3;seam++)drawBox(x+1.49,z-.7+seam*.7,.47,.02,.035,.43,['#afc2aa','#6c8470','#859f88']);
    drawBox(x,z-.9,1.305,2.7,.035,.025,['#f4ebd5','#c1ac84','#ded0ac']);
    if(i===0){drawBox(x,z,1.29,2.3,1.55,.12,dark);for(var n=0;n<6;n++){var p=project(x-.7+(n%3)*.7,1.44,z-.35+Math.floor(n/3)*.7);ellipse(p.x,p.y,unit*.09,unit*.06,'#e1c68a')}}
    if(i===1){for(var n=0;n<4;n++)plant(x-.65+(n%2)*1.3,z-.5+Math.floor(n/2),1.3,active?.9+Math.sin(now*.0008+n)*.22:.5);drawBox(x-1.4,z,1.3,.1,.1,2,stone);drawBox(x+1.4,z,1.3,.1,.1,2,stone);drawBox(x,z,3.3,3,.7,.13,['#dfbfff','#8c6eaa','#bf9bdc'])}
    if(i===2){plant(x-.75,z,1.3,1);drawBox(x+.7,z,1.3,1.1,1,.2,dark);for(var n=0;n<3;n++){var p=project(x+.45+n*.25,1.6,z);ellipse(p.x,p.y,unit*.14,unit*.11,'#73ac6b')}var p=project(x+(active?Math.sin(now*.005)*.12:0),1.5,z+.55);ctx.strokeStyle='#e4ece6';ctx.lineWidth=unit*.07;ctx.beginPath();ctx.moveTo(p.x-unit*.25,p.y-unit*.15);ctx.lineTo(p.x+unit*.25,p.y+unit*.15);ctx.moveTo(p.x-unit*.25,p.y+unit*.15);ctx.lineTo(p.x+unit*.25,p.y-unit*.15);ctx.stroke()}
    if(i===3){for(var n=0;n<3;n++)jar(x-.8+n*.8,z+(active?Math.sin(now*.003+n)*.08:0),1.3);drawBox(x,z-.9,1.3,2.7,.25,.6,dark)}
    if(i===4){drawBox(x-.7,z,1.3,.95,.7,.12,dark);drawBox(x-.7,z-.2,1.42,.95,.13,.7,['#d8e7df','#314c42','#426b57']);for(var n=0;n<3;n++)drawBox(x+.5+n*.22,z+n*.18,1.3+n*.16,.7,.55,.16,['#f2ead5','#b0a589','#d2c6aa'])}
    if(i===5){drawBox(x,z-.8,1.3,3,.3,.65,dark);jar(x-.8,z,1.3);drawBox(x+.65,z,1.3,.65,.55,.65,['#f0dca4','#a68b59','#cdb47f']);var sign=project(x,2.2,z-.85);ctx.fillStyle='#dcefc2';ctx.font='bold '+Math.max(9,unit*.32)+'px sans-serif';ctx.textAlign='center';ctx.fillText('PICKUP',sign.x,sign.y)}
    if(i===1&&active){var lit=project(x,1.38,z);glow(lit.x,lit.y,unit*1.9,'#d8bbe523')}
    if(i===3){drawBox(x+1.05,z+.8,1.33,.5,.35,.16,['#9faf99','#465f4a','#70866b']);drawBox(x+1.05,z+.8,1.5,.35,.24,.025,['#c9ebaf','#8cac78','#b7d59d'])}
    if(i===4){var label=project(x,2.3,z-.3);ctx.fillStyle='#e2eabc';ctx.font='bold '+Math.max(9,unit*.3)+'px sans-serif';ctx.textAlign='center';ctx.fillText('ORDER HERE',label.x,label.y)}
    stationDetails(x,z,i,now);
    var p=project(x+1.25,1.44,z+1);ellipse(p.x,p.y,unit*.1,unit*.07,active?'#a7ed96':'#69786f');
  }
  function drawPerson(x,z,now,id,moving,employee,bag){
    if(motionPreference.matches){now=0;moving=false}
    var p=project(x,.01,z);ellipse(p.x,p.y,unit*.35,unit*.15,'#00000035');
    var step=moving?Math.sin(now*.009+id)*.2:0,bob=moving?Math.abs(Math.sin(now*.009+id))*.05:Math.sin(now*.002+id)*.015;
    drawBox(x-.14,z+step,.03,.19,.24,.56,['#344438','#1d2c25','#29392f']);drawBox(x+.14,z-step,.03,.19,.24,.56,['#344438','#1d2c25','#29392f']);
    var shirts=employee?[['#f0e8d4','#a6b39a','#cdd8be']]:[['#eab67f','#9b694d','#c78a63'],['#c4ace2','#766394','#9c85b9'],['#83bec5','#4c7b83','#619fa6']];
    drawBox(x,z,.56+bob,.62,.4,.67,shirts[employee?0:id%3]);
    if(employee)drawBox(x,z+.22,.6+bob,.46,.025,.56,['#669b6d','#345c45','#4c7c58']);
    for(var side=-1;side<=1;side+=2){var shoulder=project(x+side*.34,1.14+bob,z),hand=project(x+side*.39,.68+bob,z+side*step*.7);if(employee){var reach=(Math.sin(now*.006+id)+1)*.17;hand=project(x+side*(.25+reach),1.03+reach,z-.5)}
      ctx.beginPath();ctx.moveTo(shoulder.x,shoulder.y);ctx.lineTo(hand.x,hand.y);ctx.strokeStyle=employee?'#cdd8be':shirts[id%3][2];ctx.lineWidth=unit*.14;ctx.lineCap='round';ctx.stroke();ellipse(hand.x,hand.y,unit*.075,unit*.075,'#dab098')}
    var skin=[['#e5bba0','#af7f68','#cd9b7e'],['#bd8969','#784b36','#9e694d'],['#8b604b','#54362b','#754936'],['#f0c9ac','#b48d73','#d9ab89']][id%4];
    drawBox(x,z,1.23+bob,.39,.37,.42,skin);
    var hair=[['#594635','#30271f','#413628'],['#c79150','#76502e','#9e6b38'],['#363333','#211f20','#2d2a2b'],['#9a694b','#603f2d','#805137']][id%4];
    drawBox(x,z-.04,1.59+bob,.43,.39,.12,employee?['#527f5a','#264c38','#3c6549']:hair);
    if(employee){drawBox(x,z+.2,1.58+bob,.47,.19,.055,['#8bb778','#365c3c','#5c8c52']);drawBox(x+.11,z+.249,.92+bob,.13,.025,.15,['#eee0b7','#eee0b7','#eee0b7'])}
    else if(id%3===1)drawBox(x,z-.12,1.34+bob,.47,.28,.35,hair);
    var face=project(x,1.43+bob,z+.194),eye=unit*.024;
    ellipse(face.x-unit*.075,face.y,eye,eye*1.35,'#34322b');ellipse(face.x+unit*.075,face.y+unit*.035,eye,eye*1.35,'#34322b');
    if(!employee&&id%5===0){ctx.strokeStyle='#4a4c3f';ctx.lineWidth=Math.max(.7,unit*.025);ctx.strokeRect(face.x-unit*.14,face.y-unit*.05,unit*.12,unit*.1);ctx.strokeRect(face.x+unit*.015,face.y-unit*.015,unit*.12,unit*.1)}
    if(bag){drawBox(x+.48,z+.1,.55,.38,.3,.48,['#ead3a1','#9c8052','#c6aa75']);worldLine([[x+.36,1.03,z+.1],[x+.36,1.14,z+.1],[x+.6,1.14,z+.1],[x+.6,1.03,z+.1]],'#bd9f67',.03);drawBox(x+.48,z+.26,.71,.15,.018,.17,['#679165','#456c47','#567e52'])}
  }
  function customerTarget(c){
    var ordering=!c.ordered,queue=customers.filter(function(q){return q.phase!=='leaving'&&(!q.ordered)===ordering}),rank=Math.max(0,queue.indexOf(c));
    if(c.phase==='leaving')return{x:16,z:9};
    if(ordering)return{x:-4-rank*.95,z:7.4};
    return{x:4+rank*.8,z:7.4+rank*.55};
  }
  function drawCustomer(c,now){
    var moving=c.walking;
    drawPerson(c.x,c.z,now,c.id,moving,false,c.bag);
    if(c.phase==='ordering'||c.phase==='pickup'||c.phase==='toPickup'){var p=project(c.x,2.05,c.z);ellipse(p.x,p.y,unit*.2,unit*.18,c.ordered?'#c4e8a7':'#f0dfb0');ctx.fillStyle='#24412f';ctx.font='bold '+Math.max(8,unit*.22)+'px sans-serif';ctx.textAlign='center';ctx.fillText(c.ordered?'✓':'…',p.x,p.y+unit*.075)}
  }
  function drawFloor(){
    var backdrop=ctx.createRadialGradient(width*.43,height*.4,0,width*.5,height*.5,Math.max(width,height)*.8);backdrop.addColorStop(0,'#45604c');backdrop.addColorStop(1,'#142a22');ctx.fillStyle=backdrop;ctx.fillRect(0,0,width,height);
    var floorLight=ctx.createLinearGradient(centerX-unit*10,centerY-unit*7,centerX+unit*8,centerY+unit*9);floorLight.addColorStop(0,'#768d70');floorLight.addColorStop(1,'#3f5a42');drawBox(0,0,-.35,32,28,.35,[floorLight,'#263e30','#34513a']);
    ctx.strokeStyle='#ffffff09';ctx.lineWidth=.7;
    for(var n=-16;n<=16;n+=2){var a=project(n,0,-14),b=project(n,0,14);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
    for(n=-14;n<=14;n+=2){a=project(-16,0,n);b=project(16,0,n);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
    groundPatch(-4.5,-3,8.8,10,'#b99c7460');groundPatch(4.5,-3,8.8,10,'#88a58a55');groundPatch(0,4.5,18,4.8,'#d9c39b66');groundPatch(0,8,22,3,'#c9baa33d');
    // Distinct real materials keep each room legible without reintroducing labels.
    for(var row=0;row<8;row++)for(var col=0;col<7;col++)groundPatch(.7+col*1.22,-7.25+row*1.18,1.17,1.13,(row+col)%2?'#b7c7a07a':'#8ca98b8a');
    for(var row=0;row<6;row++)for(var col=0;col<4;col++){var px=-8.35+col*2.25;groundPatch(px,-7.3+row*1.53,2.21,1.47,(row+col)%3?'#c7ad8066':'#e2c59466');worldLine([[px-.8,.026,-7.05+row*1.53],[px+.65,.026,-7.05+row*1.53]],'#7e65472a',.015)}
    for(var paving=0;paving<20;paving++){groundPatch(-14.2+(paving%10)*2.85,7.7+Math.floor(paving/10)*1.45,2.77,1.38,paving%3?'#c1b9a49c':'#d4c8ac9c')}
    groundPatch(0,6.87,18.5,.15,'#eee0be99');
    for(var plank=-8.5;plank<9;plank+=.65)groundPatch(plank,4.4,.018,4.6,'#604b3525');
    machinePos.forEach(function(pos,i){groundPatch(pos.x,pos.z,3.8,3.2,i<4?'#718c7333':'#b99d7533');var shadow=project(pos.x+.4,.01,pos.z+.3);ellipse(shadow.x,shadow.y,unit*2,unit*.9,'#00000028')});
    drawBox(0,-8.1,0,19,.3,2.6,['#f0e3c8','#9ca88e','#c8cbb1']);
    drawBox(-9.5,-4,0,.3,8.5,2.6,['#efe2c5','#9eae92','#c4cdb0']);
    drawBox(0,-7.87,.12,19,.06,.16,['#a5b69a','#657e63','#849678']);
    drawBox(0,-8.06,2.6,19.4,.52,.14,['#f5e8c9','#aab695','#d1d5b5']);
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
    var cream=['#f5e7cb','#b8b99a','#ddd7b7'],sage=['#8cac87','#45694e','#658a65'],rose=['#edc0a9','#b57e6d','#d59c88'];
    function add(x,z,draw){jobs.push({depth:depthOf({x:x,z:z}),draw:draw})}
    [-8,0,8].forEach(function(x){add(x,6.15,function(){drawBox(x,6.15,.02,.5,.45,3.15,cream);drawBox(x,6.43,.15,.55,.07,.22,sage)})});
    for(var n=-7;n<=7;n+=2){(function(x){add(x,6.15,function(){drawBox(x,6.15,.02,1.95,.28,.7,sage);for(var stripe=0;stripe<4;stripe++)drawBox(x-.7+stripe*.45,6.31,.1,.025,.018,.49,['#b4c5a0','#72926d','#91aa82']);drawBox(x,6.15,2.68,2,.35,.46,cream)})})(n)}
    [-4,4].forEach(function(x){add(x,6.35,function(){
      drawBox(x,6.35,.75,5.6,.9,.16,['#dfbd8e','#9d7b52','#bd986b']);
      drawBox(x,6.35,2.55,5.6,.15,.1,sage);
      [-2.8,2.8].forEach(function(dx){drawBox(x+dx,6.3,.88,.12,.12,1.75,cream)});
      var label=project(x,2.83,6.5);ctx.fillStyle='#375b43';ctx.font='bold '+Math.max(10,unit*.35)+'px sans-serif';ctx.textAlign='center';ctx.fillText(x<0?'ORDER':'PICKUP',label.x,label.y);
    })});
    for(var stripe=0;stripe<16;stripe++){(function(k){var x=-7.5+k;add(x,6.3,function(){drawBox(x,6.3,3.15,1,1.65,.13,k%2?cream:rose);drawBox(x,7.13,2.95,1,.06,.25,k%2?cream:rose)})})(stripe)}
    [-8.7,8.7].forEach(function(x){add(x,7,function(){drawBox(x,7,0,.95,.95,.6,cream);plant(x,7,.6,1.1)})});
    add(-8,9,function(){drawBox(-8,9,.12,2,.7,.18,sage);drawBox(-8,9,.3,2,.65,.45,rose);drawBox(-8,8.7,.65,2,.12,.55,rose)});
  }
  function selectionRing(pos){var p=project(pos.x,.02,pos.z);ctx.beginPath();ctx.ellipse(p.x,p.y,unit*1.9,unit*.95,0,0,Math.PI*2);ctx.strokeStyle='#b6eb8e';ctx.lineWidth=2;ctx.stroke()}
  function depthOf(pos){return rotate(pos.x,pos.z).z}
  function render(now){
    if(document.hidden){render.last=now;requestAnimationFrame(render);return}
    sceneTime=motionPreference.matches?0:now;drawFloor();if(selected>=0)selectionRing(machinePos[selected]);
    var frameDelta=Math.min(.1,Math.max(0,(now-(render.last||now))/1000));
    var speed=state.lines.some(function(n){return n>0})?Math.min(.07,.02+production()*.00002):0;
    crateTime=(crateTime+Math.min(100,now-(render.last||now))/1000*speed)%1;render.last=now;
    var jobs=machinePos.map(function(pos,i){return {depth:depthOf(pos),draw:function(){drawStage(pos,i,now)}}});
    machinePos.forEach(function(pos,i){if(!state.lines[i])return;var count=1+Math.min(1,Math.floor(state.staff[i]/3));for(var n=0;n<count;n++){(function(k){var x=pos.x-1+k*1.3,z=pos.z+(i>=4?-1.5:1.7);jobs.push({depth:depthOf({x:x,z:z}),draw:function(){drawPerson(x,z,now*(1+state.staff[i]*.1),i+k,false,true,false)}})})(n)}});
    customers.forEach(function(c){var blend=1-Math.exp(-frameDelta*16);c.renderX=c.renderX===undefined?c.x:c.renderX+(c.x-c.renderX)*blend;c.renderZ=c.renderZ===undefined?c.z:c.renderZ+(c.z-c.renderZ)*blend;var visual=Object.assign({},c,{x:c.renderX,z:c.renderZ});jobs.push({depth:depthOf(visual),draw:function(){drawCustomer(visual,now)}})});
    for(var stage=0;stage<5;stage++){for(var item=0;item<Math.min(3,state.stock[stage]);item++){(function(i,k){var a=machinePos[i],b=machinePos[i+1],t=(crateTime+k/3)%1,x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t;jobs.push({depth:depthOf({x:x,z:z}),draw:function(){if(i===1)plant(x,z,.5,.65);else if(i===3)jar(x,z,.5);else drawBox(x,z,.5,.5,.5,.3,i===0?['#e4c997','#9a7c53','#b79e73']:['#a0c78e','#557a52','#7ca271'])}})})(stage,item)}}
    addRoomDetails(jobs,now);addStorefront(jobs);
    jobs.sort(function(a,b){return a.depth-b.depth});jobs.forEach(function(job){job.draw()});
    for(var i=particles.length-1;i>=0;i--){var p=particles[i];p.life-=frameDelta*1.5;p.x+=p.vx*frameDelta;p.z+=p.vz*frameDelta;p.y+=p.vy*frameDelta;p.vy-=frameDelta*5;var screen=project(p.x,p.y,p.z),size=Math.max(2,unit*.1);ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.color;ctx.fillRect(screen.x-size/2,screen.y-size/2,size,size);ctx.globalAlpha=1;if(p.life<=0)particles.splice(i,1)}
    updateMarkers();requestAnimationFrame(render);
  }
  function burst(worldPos,color){for(var i=0;i<12;i++)particles.push({x:worldPos.x,y:1.4,z:worldPos.z,vx:(Math.random()-.5)*1.8,vz:(Math.random()-.5)*1.8,vy:1.6+Math.random()*1.8,life:1,color:color||colors.acid})}

  var markerEls=LINES.map(function(line,i){var b=document.createElement('button');b.className='marker';b.textContent=line.name;b.onclick=function(){selectMachine(i)};$('markers').appendChild(b);return b});
  function updateMarkers(){var heights=[2.1,3.85,3,2.15,2.8,2.8];markerEls.forEach(function(el,i){var pos=project(machinePos[i].x,heights[i],machinePos[i].z);el.style.transform='translate3d('+pos.x+'px,'+pos.y+'px,0) translate(-50%,-100%)';el.style.display=pos.x<-90||pos.x>width+90||pos.y<-50||pos.y>height+50?'none':'block'})}
  function renderUI(){
    var line=LINES[selected],open=isOpen(selected),level=state.lines[selected],price=cost(selected),affordable=open&&state.money>=price;
    $('money').textContent=fmt(state.money);$('rate').textContent=fmt(production())+'/s';
    $('machineNumber').textContent=!open?'BUILD PREVIOUS STAGE':level?'STAGE 0'+(selected+1)+' · ACTIVE':'STAGE 0'+(selected+1)+' · NOT BUILT';
    $('machineName').textContent=line.name;$('machineLevel').textContent=level;$('machineRate').textContent=capacity(selected).toFixed(1)+'× speed';
    $('machineCost').textContent=fmt(price);$('buyMachine').disabled=!affordable;$('buyMachine').querySelector('span').textContent=!open?'LOCKED':level?'UPGRADE':'BUILD';
    $('buyMachine').style.setProperty('--funded',Math.min(100,state.money/price*100)+'%');
    $('upgradeHint').textContent=!open?'Build '+LINES[selected-1].name.toLowerCase()+' first.':!affordable?fmt(price-state.money)+' to go · customer sales earn cash automatically.':level?'Upgrade for faster '+['seeding','growing','picking','packing','order preparation','customer service'][selected]+'.':'Build this stage to extend your line.';
    $('upgradeHint').classList.toggle('ready',affordable);
    if(selected===4&&level)$('upgradeHint').textContent+=' Queue: '+queueLimit()+' customers · every 2 desk or employee upgrades adds a place (max 12).';
    staffButtons.forEach(function(button,i){button.disabled=!state.lines[i]||state.money<staffCost(i);button.querySelector('b').textContent=fmt(staffCost(i));$('employeeInfo'+i).textContent=!state.lines[i]?'Build this station first':'Lv '+state.staff[i]+' · +'+(state.staff[i]*30)+'% speed';});
    $('onlineTitle').textContent='Web order #'+String(state.onlineCompleted+1).padStart(3,'0');$('onlineNeed').textContent=onlineSize()+' packed jars';$('onlineReward').textContent=fmt(onlineSize()*24);$('onlineStock').textContent=state.stock[3]+' packed jars available · '+state.onlineCompleted+' online orders sent';$('fulfillOnline').disabled=!state.lines[4]||state.stock[3]<onlineSize();$('onlineBadge').hidden=$('fulfillOnline').disabled;
    $('customerStatus').textContent=customers.filter(function(c){return c.phase==='ordering'}).length+' ordering · '+customers.filter(function(c){return c.phase==='pickup'||c.phase==='toPickup'}).length+' collecting · '+state.sold+' served';$('stockStatus').textContent=state.stock.join(' → ');var order=ORDERS[state.contract];
    if(order){$('orderName').textContent=state.lifetime>=order.goal?'ORDER READY TO CLAIM':order.name;$('orderProgress').textContent=fmt(Math.min(state.lifetime,order.goal))+' / '+fmt(order.goal);$('orderFill').style.width=Math.min(100,state.lifetime/order.goal*100)+'%';$('claimReward').textContent='+'+fmt(order.reward);$('claim').disabled=state.lifetime<order.goal}
    else{$('orderName').textContent='ALL ORDERS FILLED';$('orderProgress').textContent='COMPLETE';$('orderFill').style.width='100%';$('claimReward').textContent='✓';$('claim').disabled=true}
    $('orderBadge').hidden=!order||state.lifetime<order.goal;
    var boostPrice=Math.floor(250*Math.pow(4,state.globalLevel));$('boostCost').textContent=fmt(boostPrice);$('boost').disabled=state.money<boostPrice;
    markerEls.forEach(function(el,i){var locked=!isOpen(i);el.classList.toggle('selected',i===selected);el.classList.toggle('locked',locked);el.textContent='0'+(i+1);el.setAttribute('aria-label',LINES[i].name+(locked?', locked':', level '+state.lines[i]));el.setAttribute('aria-pressed',String(i===selected))});
    machineTabs.forEach(function(tab,i){var locked=!isOpen(i),available=!locked&&state.money>=cost(i);tab.setAttribute('aria-pressed',String(i===selected));tab.classList.toggle('is-locked',locked);tab.classList.toggle('can-upgrade',available);tab.querySelector('em').textContent=locked?'Locked':state.lines[i]?'Level '+state.lines[i]:available?'Build now':'Not built'});
  }
  var machineTabs=Array.prototype.slice.call(document.querySelectorAll('[data-machine]'));
  machineTabs.forEach(function(tab){tab.onclick=function(){selectMachine(Number(tab.getAttribute('data-machine')))}});
  var trayTabs=Array.prototype.slice.call(document.querySelectorAll('[data-tray]'));
  var activeTray='factory',panelOpen=true;
  function showTray(name){activeTray=name;panelOpen=true;$('sheet').classList.remove('collapsed');$('panelToggle').setAttribute('aria-expanded','true');$('panelToggle').textContent='⌄';var titles={factory:'Stations',employees:'Employees',orders:'Online orders',boosts:'Shop'};$('panelTitle').textContent=titles[name];trayTabs.forEach(function(t){t.setAttribute('aria-pressed',String(t.getAttribute('data-tray')===name))});Array.prototype.forEach.call(document.querySelectorAll('[data-pane]'),function(p){p.hidden=p.getAttribute('data-pane')!==name});fitControls()}
  function collapsePanel(){panelOpen=false;$('sheet').classList.add('collapsed');$('panelToggle').setAttribute('aria-expanded','false');$('panelToggle').textContent='⌃';fitControls()}
  trayTabs.forEach(function(tab){tab.onclick=function(){var name=tab.getAttribute('data-tray');if(name===activeTray&&panelOpen)collapsePanel();else showTray(name)}});
  $('panelToggle').onclick=function(){if(panelOpen)collapsePanel();else showTray(activeTray)};

  function paintThumbnails(){var savedCtx=ctx,savedUnit=unit,savedX=centerX,savedY=centerY,savedAngle=angle;machineTabs.forEach(function(tab,i){ctx=tab.querySelector('canvas').getContext('2d');if(!ctx)return;unit=19;centerX=80;centerY=86;angle=.57;drawStage({x:0,z:0},i,0)});ctx=savedCtx;unit=savedUnit;centerX=savedX;centerY=savedY;angle=savedAngle}
  function selectMachine(i){selected=i;showTray('factory');renderUI();if(machineTabs[i]&&machineTabs[i].scrollIntoView)machineTabs[i].scrollIntoView({block:'nearest',inline:'nearest'});if(navigator.vibrate)navigator.vibrate(8)}
  function buySelected(){var line=LINES[selected];if(!isOpen(selected))return notify('Build the previous stage first');var c=cost(selected);if(state.money<c)return notify('Need '+fmt(c-state.money)+' more');state.money-=c;state.lines[selected]++;burst(machinePos[selected]);notify(line.name+' · LEVEL '+state.lines[selected]);renderUI();save();if(navigator.vibrate)navigator.vibrate(18)}
  function boostAll(){var c=Math.floor(250*Math.pow(4,state.globalLevel));if(state.money<c)return notify('Need '+fmt(c-state.money)+' more');state.money-=c;state.globalLevel++;state.multiplier=Math.pow(1.25,state.globalLevel);burst({x:0,z:0},colors.orange);notify('ALL STAGES +25%');renderUI();save()}
  function claimOrder(){var o=ORDERS[state.contract];if(!o||state.lifetime<o.goal)return;state.money+=o.reward;state.contract++;notify(fmt(o.reward)+' ORDER BONUS');renderUI();save()}

  var touches={},gestureMoved=false,gestureOrigin=null;
  canvas.addEventListener('pointerdown',function(e){canvas.setPointerCapture(e.pointerId);touches[e.pointerId]={x:e.clientX,y:e.clientY};if(Object.keys(touches).length===1){gestureMoved=false;gestureOrigin={x:e.clientX,y:e.clientY}}else gestureMoved=true});
  canvas.addEventListener('pointermove',function(e){
    if(!touches[e.pointerId])return;var before=Object.values(touches),previous=touches[e.pointerId];touches[e.pointerId]={x:e.clientX,y:e.clientY};var after=Object.values(touches);
    if(after.length===1){var dx=e.clientX-previous.x,dy=e.clientY-previous.y;if(Math.hypot(e.clientX-gestureOrigin.x,e.clientY-gestureOrigin.y)>5)gestureMoved=true;if(gestureMoved){panX+=dx;panY+=dy;applyCamera()}}
    else if(after.length===2){var rect=canvas.getBoundingClientRect(),oldDistance=Math.hypot(before[0].x-before[1].x,before[0].y-before[1].y),newDistance=Math.hypot(after[0].x-after[1].x,after[0].y-after[1].y),mx=(after[0].x+after[1].x)/2-rect.left,my=(after[0].y+after[1].y)/2-rect.top;panX+=(after[0].x+after[1].x-before[0].x-before[1].x)/2;panY+=(after[0].y+after[1].y-before[0].y-before[1].y)/2;applyCamera();if(oldDistance>0)zoomAt(zoom*newDistance/oldDistance,mx,my)}
  });
  canvas.addEventListener('pointerup',function(e){if(!gestureMoved&&Object.keys(touches).length===1){var rect=canvas.getBoundingClientRect(),best=-1,distance=60;machinePos.forEach(function(pos,i){var p=project(pos.x,1.4,pos.z),d=Math.hypot(e.clientX-rect.left-p.x,e.clientY-rect.top-p.y);if(d<distance){best=i;distance=d}});if(best>=0)selectMachine(best)}delete touches[e.pointerId];if(Object.keys(touches).length)gestureMoved=true;else gestureOrigin=null});
  function cancelPointer(e){delete touches[e.pointerId];gestureMoved=true}
  canvas.addEventListener('pointercancel',cancelPointer);canvas.addEventListener('lostpointercapture',cancelPointer);
  canvas.addEventListener('wheel',function(e){e.preventDefault();var r=canvas.getBoundingClientRect();zoomAt(zoom*Math.exp(-e.deltaY*.0015),e.clientX-r.left,e.clientY-r.top)},{passive:false});
  $('zoomIn').onclick=function(){zoomAt(zoom*1.2,width/2,height/2)};
  $('zoomOut').onclick=function(){zoomAt(zoom/1.2,width/2,height/2)};
  $('centerView').onclick=function(){zoom=1;panX=0;panY=0;applyCamera()};
  var staffButtons=Array.prototype.slice.call(document.querySelectorAll('[data-staff]'));
  staffButtons.forEach(function(button){button.onclick=function(){upgradeStaff(Number(button.getAttribute('data-staff')))}});
  $('fulfillOnline').onclick=fulfillOnline;
  window.addEventListener('resize',resize);$('buyMachine').onclick=buySelected;$('boost').onclick=boostAll;$('claim').onclick=claimOrder;$('resetOpen').onclick=function(){$('resetModal').hidden=false};$('resetCancel').onclick=function(){$('resetModal').hidden=true};$('resetConfirm').onclick=function(){state=fresh();work=[0,0,0,0,0,0];customers=[];arrival=0;save();$('resetModal').hidden=true;notify('FACTORY RESET');renderUI()};

  function playLoadSequence(){var steps=Array.prototype.slice.call(document.querySelectorAll('[data-load-step]')),bar=$('loadBar'),percent=$('loadPercent'),status=$('loadStatus'),i=0;function advance(){if(i>0){steps[i-1].classList.remove('active');steps[i-1].classList.add('done');steps[i-1].querySelector('i').textContent='READY'}if(i===steps.length){bar.style.width='100%';percent.textContent='100%';status.textContent='PRODUCTION ONLINE';setTimeout(function(){$('loading').classList.add('done')},220);return}steps[i].classList.add('active');steps[i].querySelector('i').textContent='BUILDING';var value=Math.round((i+1)/steps.length*100);bar.style.width=value+'%';percent.textContent=value+'%';status.textContent=steps[i].querySelector('b').textContent.toUpperCase();i++;setTimeout(advance,150)}advance()}
  var away=Math.min(14400,(Date.now()-state.lastSeen)/1000),offline=production()*away;if(offline>=1){add(offline);setTimeout(function(){notify('WHILE AWAY +'+fmt(offline))},500)}
  function fitControls(){document.documentElement.style.setProperty('--dock-height',$('sheet').getBoundingClientRect().height+'px');resize()}
  if(window.ResizeObserver){new ResizeObserver(fitControls).observe($('sheet'))}
  window.addEventListener('resize',fitControls);
  paintThumbnails();
  fitControls();renderUI();ctx.fillStyle=colors.bg;ctx.fillRect(0,0,width,height);window.__shiftReady=true;playLoadSequence();requestAnimationFrame(render);setInterval(function(){simulate(.25);renderUI()},250);setInterval(save,5000);window.addEventListener('beforeunload',save);

  if(document.modelContext&&document.modelContext.registerTool){document.modelContext.registerTool({name:'read_factory_status',title:'Read factory status',description:'Read cash, production, and machine levels.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute:function(){return{cash:Math.floor(state.money),lifetime:Math.floor(state.lifetime),perSecond:production(),lineLevels:state.lines,stock:state.stock,customersServed:state.sold,employeeLevels:state.staff,onlineCompleted:state.onlineCompleted,camera:{zoom:zoom,panX:panX,panY:panY,angle:angle},customers:customers.map(function(c){return{id:c.id,phase:c.phase,ordered:c.ordered,bag:c.bag}})}}});}
})();
