import {atmosphere} from './operations.js';
// Three hand-curated Canvas scenes. They share the main map's projection and gestures.
export const BRANCH_THEMES = [
  {name:'Riverside', description:'A cedar neighborhood shop on a planted riverwalk, with a breezy pergola and waterside seating.', background:'#405852', focus:{x:0,y:1.3,z:1.4}},
  {name:'Old Town', description:'A historic brick boutique with arched windows, brass displays and an upstairs botanical atelier.', background:'#514840', focus:{x:0,y:.3,z:1}},
  {name:'City Center', description:'A modern glass flagship around a planted atrium, with a rooftop garden and a busy city plaza.', background:'#3e4b55', focus:{x:0,y:1.3,z:2.5}}
];

export function drawBranchMap(api, index, level, now, projects=[], experience={}) {
  const {ctx,width,height,unit,project:p,box:b,line:l,poly,ellipse,plant,jar,carton,person,depth}=api;
  const theme=BRANCH_THEMES[index];
  const network=experience.network,operation=network?.stores[index],style=operation?.cosmetics||{},day=experience.lighting||(network?atmosphere(network):{night:false,darkness:0});
  const lightColor=['#ffe2aa','#c1e4f1','#ffc079'][style.lighting||0];
  const awningFinish=[['#8fa787','#4e6d57','#6d896b'],['#d5a08b','#986452','#ba806c'],['#e4deca','#aba68e','#cec5ae']][style.awning||0];
  const wood=['#c2a073','#7a5a40','#a3815b'], dark=['#4b5750','#23362e','#374c40'];
  const cream=['#e5ddc4','#a7a18c','#cdc7af'], brass=['#dcc089','#8d7348','#b39665'];
  const jobs=[];
  const activeEvent=experience.event?.joined&&experience.event.open&&!experience.event.claimed;
  const eventKind=(experience.event?.slot||0)%3;
  const job=(x,z,draw)=>jobs.push({depth:depth({x,z}),draw});
  const patch=(x,z,w,d,color,y=.015)=>poly([p(x-w/2,y,z-d/2),p(x+w/2,y,z-d/2),p(x+w/2,y,z+d/2),p(x-w/2,y,z+d/2)],color);
  function glow(x,y,z,size){const q=p(x,y,z),g=ctx.createRadialGradient(q.x,q.y,0,q.x,q.y,unit*size);g.addColorStop(0,lightColor+(day.night?'80':'45'));g.addColorStop(1,'#ffe2aa00');ellipse(q.x,q.y,unit*size,unit*size*.65,g);}
  function planter(x,z,w=1.1,size=1.3,y=0){b(x,z,y,w,w,.55,wood);b(x,z,y+.55,w+.09,w+.09,.1,dark);if(style.plants===2){l([[x,y+.6,z],[x,y+.6+size,z]],'#79a67f',.18);l([[x-.3,y+size*.85,z],[x-.3,y+size*.5,z],[x+.3,y+size*.5,z],[x+.3,y+size,z]],'#79a67f',.13);}else plant(x,z,y+.6,size);if(projects[2]||style.plants===1){for(let k=0;k<5;k++){const xx=x-w*.35+k*w*.175,q=p(xx,y+.85+(k%2)*.12,z+w*.32);l([[xx,y+.63,z+w*.32],[xx,y+.85+(k%2)*.12,z+w*.32]],'#71925c',.025);ellipse(q.x,q.y,unit*.1,unit*.07,k%2?'#eccba1':'#c89388');}}}
  function tree(x,z,size=1){
    b(x,z,0,1.6,1.6,.28,cream);l([[x,.2,z],[x,3*size,z]],'#826243',.16);
    [-1,1].forEach(s=>l([[x,1.6*size,z],[x+s*.6*size,2.8*size,z+s*.25]],'#826243',.085));
    for(let i=0;i<14;i++){const a=i*2.4,q=p(x+Math.cos(a)*(.5+i%3*.2)*size,2.8*size+(i%4)*.28,z+Math.sin(a)*.7*size);ellipse(q.x,q.y,unit*.64*size,unit*.47*size,['#648768','#88a675','#a2b780'][i%3]);}
  }
  function bench(x,z,w=2.8){
    if(style.layout===1){display(x,z,0,wood);return;}
    [-w*.36,w*.36].forEach(dx=>b(x+dx,z,0,.12,.65,.55,dark));
    for(let i=0;i<4;i++)b(x,z-.3+i*.2,.54,w,.15,.1,wood);
    b(x,z-.43,.64,w,.1,.7,wood);
  }
  function lamp(x,z){l([[x,0,z],[x,3.2,z]],'#37453b',.1);b(x,z,3.16,.52,.5,.1,brass);b(x,z,3.26,.36,.34,.52,['#fff0c2','#d7c18d','#ebd8a5']);b(x,z,3.8,.57,.53,.1,dark);glow(x,3.5,z,.9);}
  function shelf(x,z,w,y=0,finish=wood){
    b(x,z,y,w,.24,3.4,finish);
    for(let row=0;row<3;row++){
      b(x,z+.25,y+.45+row*.94,w,.8,.11,finish);
      l([[x-w/2+.1,y+.58+row*.94,z+.66],[x+w/2-.1,y+.58+row*.94,z+.66]],'#f2d89e',.035);
      for(let tag=0;tag<3;tag++){const tx=x-w*.3+tag*w*.3;b(tx,z+.665,y+.47+row*.94,.28,.017,.065,cream);}
      for(let k=0;k<Math.min(6,2+level);k++){const xx=x-w*.38+k*w*.76/(Math.min(6,2+level)-1);if((k+row)%4===0)carton(xx,z+.24,y+.59+row*.94,.42);else jar(xx,z+.24,y+.59+row*.94,(k+row)%4);}
    }
    [-1,1].forEach(s=>b(x+s*(w/2),z+.28,y,.1,.87,3.45,finish));
  }
  function counter(x,z,w=3.5,finish=wood){
    if(style.counter===1)finish=['#849596','#43585b','#667b7a'];if(style.counter===2)finish=['#ede4ce','#b5aa8e','#d4c8ac'];
    b(x,z,0,w,1.4,1.12,finish);b(x,z,1.12,w+.2,1.55,.16,cream);
    for(let i=0;i<Math.floor(w/.22);i++)b(x-w/2+.1+i*.22,z+.715,.08,.055,.04,.91,finish===wood?brass:dark);
    b(x-.8,z-.1,1.28,.6,.4,.07,dark);b(x-.8,z-.19,1.35,.58,.1,.4,dark);
    b(x-.8,z-.13,1.39,.46,.02,.3,['#c5d9b4','#a0ba99','#b8cea6']);
    if(projects[1]){b(x-.8,z-.2,1.35,.82,.12,.56,brass);b(x-.8,z-.125,1.4,.7,.025,.43,['#aecdb7','#aecdb7','#aecdb7']);l([[x-w/2+.1,.22,z+.74],[x+w/2-.1,.22,z+.74]],'#dfc88f',.05);}
    // Paper bags, payment pad and receipt tray give each counter a working surface.
    b(x+.08,z+.21,1.29,.34,.43,.045,dark);b(x+.08,z+.21,1.34,.22,.26,.02,['#bed4b1','#bed4b1','#bed4b1']);
    b(x-.38,z+.18,1.29,.31,.4,.025,cream);
    b(x+w*.38,z-.3,1.29,.35,.27,.47,wood);l([[x+w*.38-.1,1.75,z-.3],[x+w*.38-.1,1.91,z-.3],[x+w*.38+.1,1.91,z-.3],[x+w*.38+.1,1.75,z-.3]],'#d9c799',.025);
    jar(x+.65,z,1.3,index);if(level>=4)jar(x+1.2,z,1.3,(index+1)%4);
  }
  function display(x,z,y=0,finish=wood){
    b(x,z,y,2.1,1.1,.8,finish);b(x,z,y+.8,2.2,1.2,.1,cream);
    if(projects[0]){b(x,z,y+.76,2.18,1.18,.055,brass);l([[x-1,y+.94,z+.56],[x+1,y+.94,z+.56]],'#ffe8b7',.045);[-1,1].forEach(side=>l([[x+side*1.05,y+.9,z+.55],[x+side*1.05,y+1.75,z+.55]],'#d6b77f',.045));}
    for(let j=0;j<3;j++)jar(x-.65+j*.65,z,y+.9,(j+index)%4);
    poly([p(x-1.05,y+.9,z+.55),p(x+1.05,y+.9,z+.55),p(x+1.05,y+1.75,z+.55),p(x-1.05,y+1.75,z+.55)],'#b8dac326');
    l([[x-1.05,y+.9,z+.55],[x-1.05,y+1.75,z+.55],[x+1.05,y+1.75,z+.55],[x+1.05,y+.9,z+.55]],'#b2c7b3',.035);
    l([[x-1.05,y+1.75,z-.55],[x+1.05,y+1.75,z-.55],[x+1.05,y+1.75,z+.55]],'#cddfc8',.035);
  }
  function pendant(x,z,y=3.8){l([[x,y+1,z],[x,y,z]],'#59634d',.026);const q=p(x,y-.15,z);ellipse(q.x,q.y,unit*.26,unit*.27,'#ffedbc');glow(x,y-.15,z,1.1);}
  function arch(x,z,y,w,h){
    const points=[[x-w/2,y,z],[x-w/2,y+h-w/2,z]];
    for(let i=0;i<=16;i++){const a=Math.PI-i*Math.PI/16;points.push([x+Math.cos(a)*w/2,y+h-w/2+Math.sin(a)*w/2,z]);}
    points.push([x+w/2,y,z]);poly(points.map(q=>p(...q)),'#466c6a');l([...points,points[0]],'#ddc7a0',.15);
    l([[x,y,z+.015],[x,y+h-.09,z+.015]],'#c1a577',.05);l([[x-w/2+.08,y+h*.5,z+.015],[x+w/2-.08,y+h*.5,z+.015]],'#c1a577',.05);
    poly([p(x-w*.35,y+.2,z+.02),p(x-w*.18,y+.2,z+.02),p(x+w*.28,y+h*.7,z+.02),p(x+w*.11,y+h*.7,z+.02)],'#d5eee020');
  }
  function floor(x,z,w,d,y=0,finish=wood){b(x,z,y-.25,w,d,.25,finish);for(let i=x-w/2+.6;i<x+w/2;i+=.65)l([[i,y+.012,z-d/2],[i,y+.012,z+d/2]],'#6f62552a',.017);}
  function glass(x,z,w,h,y=0){poly([p(x-w/2,y,z),p(x+w/2,y,z),p(x+w/2,y+h,z),p(x-w/2,y+h,z)],'#b9d8ce20');l([[x-w/2,y,z],[x-w/2,y+h,z],[x+w/2,y+h,z],[x+w/2,y,z]],'#435b56',.06);}
  function cafeTable(x,z){
    b(x,z,0,.15,.15,.86,dark);b(x,z,.86,1.3,1.3,.12,wood);
    [-1,1].forEach(side=>{const sx=x+side*1.25;b(sx,z,0,.55,.55,.53,wood);b(sx,z-.28,.53,.58,.08,.62,wood);});
    b(x+.27,z,.99,.21,.21,.22,cream);jar(x-.24,z,1,index);
  }
  function flowerBox(x,z,y,w=2){
    b(x,z,y,w,.55,.32,wood);b(x,z,y+.32,w-.12,.4,.025,dark);
    for(let i=0;i<7;i++){const xx=x-w*.42+i*w*.14,yy=y+.47+(i%3)*.08;l([[xx,y+.34,z],[xx,yy+.13,z]],'#60814f',.028);const q=p(xx,yy+.16,z);ellipse(q.x,q.y,unit*.11,unit*.085,['#d9b876','#bd9188','#e5d8ae'][i%3]);}
  }
  function bicycle(x,z,color='#a8bd93'){
    [-.7,.7].forEach(dx=>{const pts=[];for(let k=0;k<=24;k++){const a=k*Math.PI/12;pts.push([x+dx+Math.cos(a)*.43,.48+Math.sin(a)*.43,z]);}l(pts,'#35443b',.065);l([[x+dx-.35,.48,z],[x+dx+.35,.48,z]],'#a5b1a1',.025);});
    l([[x-.7,.48,z],[x-.3,1.13,z],[x+.14,.5,z],[x-.7,.48,z],[x+.49,1.15,z],[x+.7,.48,z],[x+.14,.5,z]],color,.06);
    l([[x+.49,1.15,z],[x+.41,1.37,z],[x+.75,1.37,z]],'#cad0b8',.04);l([[x-.46,1.17,z],[x-.1,1.17,z]],'#343e36',.075);
  }
  function wallArt(x,z,y){
    b(x,z,y,1.15,.1,1.5,brass);b(x,z+.07,y+.09,.96,.025,1.3,cream);
    l([[x,y+.25,z+.09],[x,y+1.15,z+.09]],'#4f7555',.025);
    for(let i=0;i<4;i++)[-1,1].forEach(side=>{const q=p(x+side*.15,y+.45+i*.2,z+.1);ellipse(q.x,q.y,unit*.13,unit*.045,i%2?'#8aa06c':'#58785a');});
  }
  function vine(x,z,y,length){
    const pts=[];for(let i=0;i<12;i++)pts.push([x+Math.sin(i*.7)*.13,y-i*length/12,z]);l(pts,'#4b7248',.035);
    pts.forEach((q,i)=>{const v=p(q[0]+(i%2?.1:-.1),q[1],q[2]);ellipse(v.x,v.y,unit*.14,unit*.085,i%3?'#86a46c':'#b0bf80');});
  }
  function sconce(x,z,y=2.8){
    b(x,z,y,.22,.13,.48,brass);l([[x,y+.24,z],[x,y+.24,z+.45]],'#bca273',.055);
    b(x,z+.44,y+.01,.32,.34,.43,['#f9eac8','#c8b98d','#e4d5ab']);b(x,z+.44,y+.45,.43,.44,.07,dark);glow(x,y+.2,z+.5,.75);
  }
  function hangingPot(x,z,y,size=.55){
    [-.23,.23].forEach(dx=>l([[x,y+1.2,z],[x+dx,y+.3,z]],'#a7a489',.025));
    plant(x,z,y,size);vine(x+.13,z+.15,y+.27,.85);
  }
  function mat(x,z,w=2.5,d=1.1){
    patch(x,z,w,d,'#807f59',.03);patch(x,z,w-.15,d-.15,'#b0a57c',.033);
    for(let i=0;i<12;i++)l([[x-w*.45+i*w*.075,.038,z-d*.38],[x-w*.45+i*w*.075,.038,z+d*.38]],'#5c705754',.023);
  }
  function ring(x,z,y,r,color){const pts=[];for(let i=0;i<=32;i++){const a=i*Math.PI/16;pts.push([x+Math.cos(a)*r,y,z+Math.sin(a)*r]);}l(pts,color,.018);}
  function bollard(x,z){b(x,z,.02,.2,.2,.58,dark);b(x,z,.6,.23,.23,.13,['#f3e0b7','#b7b090','#e2d1a9']);glow(x,.7,z,.5);}
  function visitors(order,pickup,exit,approach=[-5,4.4]){
    // Managed customers are visual only; branch income stays in the economy simulation.
    const path=[[-8,7],approach,order,order,pickup,pickup,exit,[10,8]];
    for(let i=0;i<Math.min(10,3+Math.floor(level/2)+(activeEvent?2:0)+(experience.neighborhood||0)-(day.night?2:0));i++){
      const phase=(now/8500+i*1.19)%7,k=Math.floor(phase),t=phase-k,a=path[k],c=path[k+1];
      const x=a[0]+(c[0]-a[0])*t,z=a[1]+(c[1]-a[1])*t;
      job(x,z,()=>person(x,z,now,20+index*19+i,k!==2&&k!==4,false,k>=5));
    }
  }
  ctx.fillStyle=theme.background;ctx.fillRect(0,0,width,height);
  const sh=p(.7,-.4,2);ellipse(sh.x,sh.y,unit*16,unit*7,'#152a233d');

  if(index===0){
    // A low cedar pavilion with a river running beside the whole plot.
    b(0,0,-.65,28,23,.5,['#9fac88','#586d56','#7b916f']);
    patch(-10.7,0,6.1,22.8,'#629b9c',-.13);
    // Shallow water gets shifting caustics and fine circular ripples.
    for(let i=0;i<7;i++){const x=-12.4+(i%3)*1.2,z=-8+i*2.7,phase=(now*.00015+i*.21)%1;ring(x,z,-.095,.18+phase*.75,'#d7e7c33b');}
    for(let i=0;i<26;i++){const z=-10.5+i*.84,x=-12.4+Math.sin(i*2.1+now*.0002)*.52;l([[x,-.1,z],[x+1.1+i%3*.3,-.1,z]],i%3?'#c0d9c638':'#d8e3c26b',.035);}
    // A moored canoe, stepping stones and reeds make the water a river edge.
    const bob=Math.sin(now*.0007)*.025;
    const hull=[[-12.3,1.3],[-11.8,-.2],[-11.2,-.35],[-10.8,1.3],[-11.2,2.95],[-11.8,2.8]];
    poly(hull.map(q=>p(q[0],bob,q[1])),'#b78957');
    poly(hull.map(q=>p(-11.55+(q[0]+11.55)*.66,bob+.06,1.3+(q[1]-1.3)*.75)),'#5b6b52');
    b(-11.55,.7,.08,1,.18,.09,wood);b(-11.55,1.9,.08,1,.18,.09,wood);
    l([[-11.7,.15,1],[-9,.15,2.1]],'#dcc294',.07);
    for(let i=0;i<10;i++){const z=-9+i*1.3;job(-7.7,z,()=>{for(let j=0;j<4;j++){const x=-7.9+j*.16;l([[x,0,z],[x+Math.sin(j+i)*.12,.6+(j%3)*.21,z]],'#789162',.035);} });}
    b(-7.5,0,-.12,.55,23,.35,['#acbda0','#63775e','#88997b']);
    // Wide boardwalk outside the open shop and a short waterside pier.
    floor(-2,5.8,10,8,0,wood);floor(-8.8,7,3,2.8,0,wood);
    // Staggered board ends and small fasteners make the decking read as timber.
    for(let x=-6.8;x<3;x+=.65)for(let z=2.4;z<9.7;z+=2.1){l([[x,.02,z],[x+.6,.02,z]],'#82694755',.015);const q=p(x+.08,.026,z+.07);ellipse(q.x,q.y,Math.max(.5,unit*.023),Math.max(.3,unit*.013),'#645a43');}
    mat(-2.1,4,2.4,.9);
    for(let z=-9;z<11;z+=2.4){b(-7.6,z,.08,.16,.16,1.05,dark);l([[-7.6,1.04,z],[-7.6,1.04,Math.min(11,z+2.4)]],'#bdab86',.065);}
    floor(2,-1.4,17,13.6,0,wood);
    b(2,-8.15,0,17,.23,4.6,['#98ac90','#536f5b','#78937a']);
    for(let i=-6.3;i<10.5;i+=.32)b(i,-8.0,.05,.06,.045,4.38,wood);
    b(-6.4,-4.8,0,.2,6.6,4.6,wood);
    [-2.2,2.1,6.4].forEach(x=>glass(x,-7.86,3.2,2.1,1.8));
    shelf(-3.7,-6.8,3.5);shelf(2.1,-6.8,4.7);
    wallArt(5.2,-7.82,1.55);
    [-.15,4.7,9.9].forEach(x=>sconce(x,-7.76,3.15));
    [-5.5,5.5].forEach(x=>hangingPot(x,-6.1,2.6,.65));
    b(2,-8.12,4.55,17.35,.42,.22,wood);
    // Rain chain and a small collection barrel at the nursery end.
    job(10.85,-3.5,()=>{b(10.85,-3.5,0,.85,.85,1.15,wood);[.25,.9].forEach(y=>b(10.85,-3.5,y,.89,.89,.07,dark));for(let n=0;n<12;n++){const q=p(10.85,1.2+n*.26,-3.5);ctx.strokeStyle='#b8aa7b';ctx.lineWidth=Math.max(.5,unit*.02);ctx.beginPath();ctx.ellipse(q.x,q.y,unit*.06,unit*.09,0,0,Math.PI*2);ctx.stroke();}});
    b(-.1,-5.8,.03,1.1,.8,.8,wood);carton(-.1,-5.8,.85,.62);
    for(let n=0;n<3;n++)jar(-.48+n*.37,-4.6,.08,n);
    // Irrigation and a stocked potting bench accompany the nursery.
    b(10,-5,.12,.55,3.4,.75,wood);for(let n=0;n<4;n++)carton(10,-6.15+n*.75,.88,.42);
    l([[6.7,.13,-6.7],[6.7,.13,-2.2],[9.9,.13,-2.2]],'#52766a',.065);
    floor(8.3,-4.7,4.2,5.2,.08,cream);
    for(let x=7;x<10;x+=1.15)for(let z=-6;z<-2;z+=1.3)plant(x,z,.1,.65+level*.025,index,.8);
    l([[6.3,3.5,-7.3],[10.3,3.5,-7.3],[10.3,3.5,-2.1]],'#e9d9ae',.1);
    // Pergola is behind the terrace, leaving the cutaway completely open.
    [-5.8,2.7].forEach(x=>b(x,2.5,0,.2,.2,4.5,wood));
    b(-1.55,2.5,4.45,8.8,.3,.25,wood);
    for(let x=-5.8;x<=2.7;x+=.72)b(x,3.7,4.64,.12,2.7,.12,wood);
    for(let i=0;i<7;i++){const x=-5.4+i*1.22;pendant(x,2.6,4.05);}
    [-5.5,-4.9,2,2.6].forEach(x=>vine(x,2.65,4.8,1.4));
    job(-3.5,5.4,()=>cafeTable(-3.5,5.4));
    job(9,9.3,()=>bicycle(9,9.3,'#c9b57e'));
    job(10.7,6.3,()=>{b(10.7,6.3,0,.7,.7,1,dark);b(10.7,6.3,1,.8,.8,.12,wood);});
    job(-3,1.4,()=>{person(-3,-.1,now,10,false,true,false);counter(-3,1.4);});
    job(2,1.4,()=>{person(2,-.1,now,11,false,true,false);counter(2,1.4);});
    job(6.2,.7,()=>display(6.2,.7));
    if(level>=3)job(7.5,3.5,()=>display(7.5,3.5));
    job(3.3,6.9,()=>bench(3.3,6.9));job(-4.3,7.6,()=>bench(-4.3,7.6));
    [-5.5,0,6.4].forEach(x=>job(x,9.5,()=>planter(x,9.5,1.4,1.1)));
    job(10,-.4,()=>tree(10,-.4,1.25));job(-5.8,-6.6,()=>tree(-5.8,-6.6,.95));
    job(7,8.8,()=>lamp(7,8.8));
    [-5.6,-1.4,2.8].forEach(x=>job(x,10.4,()=>bollard(x,10.4)));
    // A lifebuoy is fastened to the outer boardwalk railing.
    job(-7.6,4,()=>{const q=p(-7.6,.65,4);ctx.strokeStyle='#deae79';ctx.lineWidth=unit*.1;ctx.beginPath();ctx.ellipse(q.x,q.y,unit*.22,unit*.27,0,0,Math.PI*2);ctx.stroke();});
    if(level>=5){job(-8.5,7,()=>{b(-8.5,7,0,1.2,.55,.24,wood);plant(-8.5,7,.24,1.1);});job(9,6,()=>bench(9,6,2));}
    visitors([-3,3],[2,3],[6.5,5.7]);
  } else if(index===1){
    const brick=['#b8876a','#714d40','#986952'],stone=['#d5c1a1','#938270','#b7a58d'];
    b(0,1,-.55,26,22,.55,stone);
    for(let row=0;row<21;row++)for(let col=0;col<24;col++)patch(-12.4+col*1.05+(row%2)*.35,-9.3+row*1.02,.96,.92,(row+col)%3?'#a5a291':'#bbb39e',.012);
    // Corner-townhouse footprint, stone street frontage and tall brick rear wall.
    floor(0,-1,17,15.8,0,wood);b(0,-8.8,0,17,.36,9,brick);b(-8.35,-5.8,0,.3,6,9,brick);
    for(let row=0;row<25;row++){const y=.18+row*.35;l([[-8.25,y,-8.59],[8.4,y,-8.59]],'#c7a98e65',.022);for(let x=-8+(row%2)*.45;x<8.4;x+=.95)l([[x,y,-8.58],[x,y+.34,-8.58]],'#c7a98e55',.02);}
    [-5.6,0,5.6].forEach(x=>{arch(x,-8.54,1,2.4,3);arch(x,-8.54,5.65,2.4,2.8);});
    [-5.6,0,5.6].forEach(x=>flowerBox(x,-8.15,5.1,2.6));
    [-2.8,2.8].forEach(x=>wallArt(x,-8.53,6.05));
    b(0,-8.6,4.65,17.3,.5,.25,stone);b(0,-8.7,9,17.7,.75,.28,stone);
    // Terracotta coping, drainpipe and warm wall lanterns finish the historic shell.
    for(let x=-8.4;x<=8.4;x+=.6)b(x,-8.7,9.28,.52,.79,.1,['#bd9271','#805a48','#a17458']);
    l([[8.15,8.9,-8.35],[8.15,.25,-8.35],[8.55,.12,-8.15]],'#675b48',.1);
    [-7.4,-2.8,2.8,7.4].forEach(x=>sconce(x,-8.43,3.75));
    [-7.9,-7.5,-7.1].forEach(x=>vine(x,-8.39,8.8,2.1));
    shelf(-4.3,-6.9,4.5,0,['#91735d','#503e35','#725541']);shelf(3.5,-6.9,4.8,0,['#91735d','#503e35','#725541']);
    // A narrow rear atelier above the shop, leaving the front retail volume open.
    floor(0,-6.35,16.7,4.65,4.8,wood);
    b(-3.8,-6,4.8,4.7,1.4,.85,wood);b(-3.8,-6,5.65,4.9,1.55,.14,stone);
    for(let i=0;i<5;i++)plant(-5.6+i*.85,-6,5.82,.63,i%4,.8);
    b(3.4,-6,4.8,3.7,1.4,1,wood);for(let i=0;i<3;i++)carton(2.5+i*.8,-6,5.8,.6);
    b(6.6,-7,4.8,.9,1.2,1.3,wood);for(let n=0;n<3;n++)jar(6.6,-7.3+n*.37,6.1,n);
    // Botanical workbench tools and drying bundles under the mezzanine.
    b(-2.2,-5.9,5.8,.3,.32,.35,['#9cae86','#596e50','#819772']);l([[-2.1,6.05,-5.9],[-1.65,6.12,-5.9]],'#9cae86',.075);
    [-6.7,-5.9,-5.1].forEach(x=>vine(x,-4.1,4.52,.85));
    for(let x=-8;x<8.4;x+=.8)l([[x,4.82,-4],[x,5.8,-4]],'#4a4e40',.038);
    l([[-8.1,5.8,-4],[8.1,5.8,-4]],'#b39b6c',.07);
    for(let i=0;i<15;i++)b(9.2,3.5-i*.51,i*.32,1.45,.55,.12,wood);
    l([[9.85,.95,3.7],[9.85,5.85,-3.9]],'#4a4e40',.07);
    // The entrance is foreground geometry, not part of the rear building pass.
    // Sort each span with the people and furniture it overlaps. A single job for
    // the full-width canopy would incorrectly cover objects at its far end.
    [-7.7,7.7].forEach(x=>job(x,5.5,()=>{
      b(x,5.5,0,.55,.6,3.8,stone);b(x,5.5,3.8,.72,.76,.22,stone);
    }));
    for(let i=0;i<16;i++){
      const x=-7.5+i,finish=i%2?cream:awningFinish;
      job(x,5.5,()=>b(x,5.5,3.95,1,.55,.22,stone));
      job(x,6.05,()=>b(x,6.05,3.72,1,1.5,.16,finish));
    }
    job(-3,-2.8,()=>{person(-3,-4.35,now,10,false,true,false);counter(-3,-2.8,3.6,['#846c58','#423e35','#655344']);});
    job(2.3,-2.8,()=>{person(2.3,-4.35,now,11,false,true,false);counter(2.3,-2.8,3.6,['#846c58','#423e35','#655344']);});
    job(-5.4,4.3,()=>display(-5.4,4.3,0,brass));job(.5,4.3,()=>display(.5,4.3,0,brass));
    if(level>=3)job(5.1,4.3,()=>display(5.1,4.3,0,brass));
    [-4,3].forEach(x=>pendant(x,-.6,3.5));
    [-5.8,5.8].forEach(x=>hangingPot(x,-3.9,2.5,.65));
    mat(-2.6,6.2,3.3,.9);
    // Sidewalk parcel storage and brass doorknobs on the built-in cabinets.
    job(10.9,-4.6,()=>{carton(10.9,-4.6,.03,.85);carton(10.9,-4.6,.58,.65);carton(11.5,-3.9,.03,.62);});
    for(let x=-6.2;x<6.5;x+=1.4)b(x,-6.42,.32,.075,.08,.075,brass);
    job(-10,-.7,()=>{b(-10,-.7,.32,2.1,1.1,.62,wood);[-.75,.75].forEach(dx=>{const q=p(-10+dx,.28,-.25);ellipse(q.x,q.y,unit*.22,unit*.25,'#374a3c');});for(let i=0;i<3;i++)plant(-10.65+i*.65,-.7,.94,.6);flowerBox(-10,-.7,1.1,1.9);});
    job(-10,2.6,()=>bicycle(-10,2.6,'#af7f63'));
    job(3.5,9.8,()=>{cafeTable(3.5,9.8);});
    job(-10,5.3,()=>lamp(-10,5.3));job(10.9,6.5,()=>lamp(10.9,6.5));
    job(-8.3,8.9,()=>bench(-8.3,8.9));job(6.6,9,()=>tree(6.6,9,1));
    [-6,4.3].forEach(x=>job(x,6.7,()=>planter(x,6.7,1,1)));
    if(level>=5){job(-10,-2,()=>tree(-10,-2,1.3));job(10,9.6,()=>planter(10,9.6,1.4,1.4));}
    // Enter down the left aisle and exit on the right, clear of the front displays.
    visitors([-3,-1.1],[2.3,-1.1],[7,3.2],[-7,2]);
  } else {
    const silver=['#d6e0db','#7b9190','#abbdb7'],teal=['#699a91','#244c4d','#467774'];
    b(0,0,-.5,28,24,.5,['#bdc7c2','#667978','#95a7a1']);
    patch(0,9.6,27.8,4.7,'#53666a');
    for(let i=0;i<8;i++)patch(-6.3+i*.72,9.6,.4,3.7,'#d6dac8',.025);
    for(let i=-12;i<=12;i+=4)patch(i,11.2,2,.09,'#cbd0b4',.026);
    floor(0,-2.2,21,16,0,silver);
    for(let x=-10;x<10;x+=1.7)for(let z=-9;z<6;z+=1.7)patch(x+.82,z+.82,1.62,1.62,(Math.floor(x+z)%3===0)?'#c3ccc1':'#d2d7cb');
    b(0,-10.15,0,21,.28,8.4,teal);
    for(let x=-9.8;x<10;x+=2.8){glass(x+1.3,-9.96,2.65,7.9,.2);l([[x,.2,-9.9],[x,8.4,-9.9]],'#bac9b9',.075);}
    b(-10.45,-6.5,0,.22,7.4,7.1,teal);
    // Ground-floor fittings must precede the upper slab that occludes them.
    // Otherwise rear shelves appear suspended in front of the balcony/posts.
    shelf(-7.1,-8.3,4.5,0,teal);shelf(7,-8.3,4.5,0,teal);
    b(9,-4.6,0,1.75,1.65,.15,silver);
    b(9,-4.58,.15,1.25,1.05,2.25,['#cad8d0','#819a90','#a5bdb0']);
    l([[9,.18,-4.02],[9,2.36,-4.02]],'#586e66',.035);
    glass(9,-3.76,1.7,5.2);
    [8.15,9.85].forEach(x=>l([[x,0,-3.8],[x,5.2,-3.8]],'#bbc8c2',.08));
    b(10.05,-3.8,1.05,.18,.09,.3,dark);
    [-9.8,-3.5,3.5,9.8].forEach(x=>b(x,-3.1,0,.14,.14,5.1,dark));
    // The right balcony wraps the shaft rather than passing through it.
    floor(-6.9,-6.3,7,7.5,5.2,silver);
    floor(5.725,-6.3,4.65,7.5,5.2,silver);
    floor(10.175,-6.3,.45,7.5,5.2,silver);
    floor(9,-7.775,1.9,4.55,5.2,silver);
    floor(9,-3.125,1.9,1.15,5.2,silver);
    [8.05,9.95].forEach(x=>b(x,-4.6,5.2,.09,1.8,.11,silver));
    [-5.5,-3.7].forEach(z=>b(9,z,5.2,1.9,.09,.11,silver));
    // Only the upper shaft is painted over the balcony surface.
    glass(9,-3.76,1.7,1.3,5.2);
    [8.15,9.85].forEach(x=>l([[x,5.2,-3.8],[x,6.5,-3.8]],'#bbc8c2',.08));
    [-6.9,6.9].forEach(x=>{glass(x,-2.56,7,1.15,5.2);b(x,-6.1,5.2,5.8,1.2,.6,teal);for(let n=0;n<5;n++)plant(x-2.3+n*1.15,-6.1,5.8,.9,n%4,.85);});
    // Architectural strips, planting beds and a transparent balustrade light the upper wings.
    [-6.9,6.9].forEach(x=>{l([[x-3.3,5.01,-2.52],[x+3.3,5.01,-2.52]],'#e7ecd3',.05);for(let n=0;n<4;n++)flowerBox(x-2.3+n*1.5,-9.25,5.22,1.2);});
    // A glass bridge joins both rooftop gardens behind the atrium tree.
    floor(0,-8,7,2.2,5.2,silver);glass(0,-6.85,7,1.1,5.2);
    l([[-3.4,5.06,-6.9],[3.4,5.06,-6.9]],'#dff0c4',.04);
    // Perforated shade fins on the front canopy cast fine bands over the stone.
    for(let i=0;i<9;i++)patch(-6.8+i*1.6,-1.8,.08,5.2,'#47645b0c',.035);
    for(let x=-9.8;x<=10;x+=2.8)l([[x,8.4,-10],[x,8.4,-3.2]],'#d4dace',.075);
    for(let z=-10;z<=-3;z+=1.7)l([[-10.4,8.4,z],[10.4,8.4,z]],'#d4dace',.06);
    poly([p(-10.4,8.4,-10),p(10.4,8.4,-10),p(10.4,8.4,-3.2),p(-10.4,8.4,-3.2)],'#b6ddcb17');
    // Draped planting softens the long balcony edge.
    [-8,-7.5,-4.6,4.1,4.6,8.3].forEach(x=>vine(x,-2.52,5.25,1.15));
    [-6.9,6.9].forEach(x=>{b(x,-8.5,5.22,3.2,.65,.35,wood);b(x,-8.8,5.57,3.2,.12,.55,wood);});
    job(-8,1.8,()=>{b(-8,1.8,0,.9,.75,1.45,teal);b(-8,1.8,1.45,1,.18,1.1,dark);b(-8,1.91,1.57,.79,.025,.78,['#bcd8c4','#bcd8c4','#bcd8c4']);for(let n=0;n<3;n++)b(-8,1.94,1.75+n*.17,.51,.02,.045,teal);});
    job(0,-4.5,()=>{b(0,-4.5,0,3.5,3.4,.5,cream);tree(0,-4.5,1.75);});
    for(let i=0;i<3;i++)job(-6.8+i*6.6,-.6,()=>display(-6.8+i*6.6,-.6,0,silver));
    job(-3,2.5,()=>{person(-3,1,now,10,false,true,false);counter(-3,2.5,3.9,teal);});
    job(3.3,2.5,()=>{person(3.3,1,now,11,false,true,false);counter(3.3,2.5,3.9,teal);});
    // Low planter lights keep the retail sightlines clear of bare tall poles.
    [-8.7,8.8].forEach(x=>job(x,4.5,()=>{planter(x,4.5,1.4,1.3);b(x+.52,4.9,.65,.16,.16,.18,silver);b(x+.52,4.9,.83,.19,.19,.09,cream);glow(x+.52,.92,4.9,.55);}));
    job(-9,7,()=>bench(-9,7,3.8));job(9.2,7,()=>bench(9.2,7,3.8));
    job(-12,1.3,()=>tree(-12,1.3,1.35));job(12,3.4,()=>tree(12,3.4,1.2));
    // A reflecting fountain, bicycles and pavement details furnish the plaza.
    job(11,-1.5,()=>{b(11,-1.5,0,2,2,.4,silver);b(11,-1.5,.4,1.68,1.68,.03,['#7cacaa','#7cacaa','#7cacaa']);b(11,-1.5,.42,.3,.3,.58,teal);l([[11,1,-1.5],[11,1.28,-1.5],[11.34,.46,-1.5]],'#dcf2d891',.035);for(let i=0;i<3;i++)ring(11.3,-1.5,.445,.1+((now*.0004+i*.3)%1)*.46,'#dff2d96b');});
    job(10,9.3,()=>bicycle(10,9.3,'#c7aa76'));
    job(11.4,9.4,()=>bicycle(11.4,9.4,'#809f9b'));
    job(-11,7.9,()=>{b(-11,7.9,0,.8,.8,1.1,teal);b(-11,7.9,1.1,.9,.9,.1,silver);});
    for(let x=-10;x<=8;x+=6){patch(x,7.8,1.3,.42,'#667b74',.04);for(let k=0;k<6;k++)l([[x-.55+k*.2,.052,7.65],[x-.55+k*.2,.052,7.97]],'#384f49',.025);}
    // Bike stands, inset ground lights, and a low planted plaza edge.
    for(let i=0;i<4;i++)job(9+i*.65,9,()=>l([[9+i*.65,0,9],[9+i*.65,.9,9],[9+i*.65,.9,9.7],[9+i*.65,0,9.7]],'#b4c3bf',.07));
    // Brushed-metal street bollards separate the crossing from the shop apron.
    [-7.6,-5.5,1.5,5.5].forEach(x=>job(x,7.4,()=>bollard(x,7.4)));
    mat(-3,4.25,3.9,.8);mat(3.3,4.25,3.9,.8);
    for(let x=-10;x<11;x+=2)job(x,6,()=>{b(x,6,.02,.5,.22,.035,brass);glow(x,.04,6,.45);});
    if(level>=3)job(7,5.5,()=>display(7,5.5,0,teal));
    if(level>=5){job(-6.7,6,()=>planter(-6.7,6,1.3,1.5));job(11,-5,()=>tree(11,-5,1.5));}
    visitors([-3,4.3],[3.3,4.3],[6.2,7]);
  }
  // Purchases add whole usable spaces around the existing architecture.
  if(level>=3)job(-7,5.6,()=>{
    b(-7,5.6,.02,3.6,2.6,.18,wood);
    display(-7,5.6,.2,index===1?brass:wood);
    [-8.6,-5.4].forEach(x=>{b(x,4.4,.2,.1,.1,2.8,brass);});
    b(-7,4.4,3,3.6,.45,.16,wood);
  });
  if(level>=5)job(5,5.8,()=>{
    b(5,5.8,0,2.4,1.4,.9,wood);b(5,5.8,.9,2.5,1.5,.12,cream);
    if(index===0){plant(4.5,5.8,1.03,.65);plant(5.4,5.8,1.03,.65);}
    else if(index===1){jar(4.5,5.8,1.03,2);jar(5.3,5.8,1.03,3);}
    else{carton(4.5,5.8,1.03,.5);carton(5.3,5.8,1.03,.6);}
    person(5,4.6,now,12,false,true,false);
  });
  if(level>=7)job(0,9.1,()=>{
    b(0,9.1,0,6.3,2.5,.24,wood);
    for(let k=0;k<10;k++)l([[-3,.25,8+k*.23],[3,.25,8+k*.23]],'#78664b',.022);
    bench(-1.5,9.5,2.2);bench(1.5,9.5,2.2);
    b(0,8.8,.25,.75,.75,.64,cream);jar(0,8.8,.9,1);
    [-3,3].forEach(x=>{planter(x,9.1,.65,.9,.24);l([[x,.24,8],[x,3.4,8]],'#7c7052',.07);});
    l([[-3,3.4,8],[0,3,8],[3,3.4,8]],'#e0c18b',.045);
    for(let k=0;k<7;k++){const x=-2.7+k*.9,y=3+Math.abs(x)*.13,q=p(x,y,8);ellipse(q.x,q.y,unit*.08,unit*.1,'#ffe7b4');}
  });
  if(experience.store?.featured==='exclusive'&&level>=2)job(-4.9,3.8,()=>{b(-4.9,3.8,0,.9,.9,.9,brass);plant(-4.9,3.8,.9,.85,2);});
  if(experience.store?.manager&&experience.store.manager!=='none')job(7,3.7,()=>person(7,3.7,now,16,false,true,false));
  if(activeEvent) {
    job(0,6.7,()=>{
      [-9,9].forEach(x=>l([[x,0,6.7],[x,4.1,6.7]],'#bda173',.09));
      l([[-9,4.1,6.7],[0,3.6,6.7],[9,4.1,6.7]],'#e6d3a3',.04);
      for(let k=0;k<13;k++){
        const x=-8+k*1.3,y=3.6+Math.abs(x)*.055,q=p(x,y,6.7);
        if(eventKind===0){ellipse(q.x,q.y,unit*.2,unit*.28,k%2?'#e1ad7a':'#e4d098');glow(x,y,6.7,.55);}
        else poly([p(x-.25,y,6.7),p(x+.25,y,6.7),p(x,y-.55,6.7)],eventKind===1?'#b9b0d0':'#d5b36d');
      }
    });
    job(-10,4.5,()=>{
      b(-10,4.5,0,2.3,1.3,1,wood);
      if(eventKind===2){for(let k=0;k<3;k++)plant(-10.7+k*.7,4.5,1,.65);}
      else for(let k=0;k<3;k++)jar(-10.7+k*.7,4.5,1,k+1);
      b(-10,4.5,2.9,2.7,1.7,.14,eventKind===1?['#b9afce','#7e7394','#9d91b7']:brass);
      [-11,-9].forEach(x=>l([[x,0,4.5],[x,2.9,4.5]],'#c8b383',.05));
      person(-10,3.4,now,eventKind===1?18:14,false,false,false);
    });
  }
  if(experience.rewards?.[0])job(-8,8,()=>lamp(-8,8));
  if(experience.rewards?.[1])job(8,8,()=>{b(8,8,0,1,1,1.1,brass);jar(8,8,1.1,3);});
  if(experience.rewards?.[2])job(4,8,()=>planter(4,8,.8,1.2));
  // Cosmetic awnings and working stock are part of the live scene.
  if(index!==1)job(5,5.5,()=>{
    [-1.5,1.5].forEach(dx=>l([[5+dx,0,5.5],[5+dx,3.1,5.5]],'#ab9673',.06));
    for(let k=0;k<6;k++)b(3.75+k*.5,5.8,3.1,.5,1.8,.1,k%2?cream:awningFinish);
  });
  if(operation){
    job(7.5,5.6,()=>{b(7.5,5.6,0,1.25,1.1,.6,wood);for(let j=0;j<3;j++)if(operation.stock[j]>0){carton(7.15+j*.35,5.6,.6,.3);if(operation.stock[j]>5)jar(7.15+j*.35,5.6,.95,j);}});
    // The same returning character stays recognizable across their story chapters.
    job(-5,7,()=>{person(-5,7,now,81+index,false,false,operation.relationship>0);if(operation.relationship>0){const q=p(-5,2.3,7);ellipse(q.x,q.y,unit*.12,unit*.12,'#dfc28d');}});
    const construction=operation.construction;
    if(construction>0)job(0,7.8,()=>{
      if(construction>2){[-2,2].forEach(x=>{l([[x,0,7.8],[x,2.7,7.8]],'#d5b47b',.07);});l([[-2,1.2,7.8],[2,1.2,7.8],[-2,2.5,7.8],[2,2.5,7.8]],'#b69b6b',.055);for(let k=0;k<5;k++){b(-1.6+k*.8,7.8,.8,.5,.12,.28,k%2?dark:brass);}}
      else {person(-1,7.8,now,10,true,true,false);person(1,7.8,now,11,true,true,false);for(let k=0;k<9;k++){const q=p(-2+k*.5,2+(k%3)*.4+(2-construction)*.5,7.8);poly([{x:q.x,y:q.y},{x:q.x+unit*.08,y:q.y-unit*.1},{x:q.x+unit*.15,y:q.y}],k%2?'#e6c28a':'#b5d796');}}
    });
  }
  const district=experience.neighborhood||0;
  if(district>0)job(13,-6,()=>{
    b(13,-6,-.25,3.2,4,.25,cream);b(13,-7,0,3,.3,3.4,wood);b(13,-6,3.4,3.2,2.3,.16,dark);
    b(13,-6.7,.3,2.4,.1,2.3,['#b7c6ac','#5c796b','#8eab96']);b(13,-5.4,0,2.7,.7,1,wood);for(let k=0;k<4;k++)plant(12+k*.65,-5.4,1,.5);
  });
  if(district>=2){job(12,7.6,()=>{planter(12,7.6,.85,1.2);lamp(12,8.4);});job(-10,10,()=>planter(-10,10,.7,1));}
  if(district>=3){job(11,6.5,()=>{person(11,6.5,now,43,true,false,false);person(12,5.2,now,44,false,false,true);});job(13,1,()=>{b(13,1,0,2,2.5,.15,cream);bench(13,1,2);});}
  if(network){
    network.jobs.forEach(route=>{
      const f=Math.min(1,route.elapsed/route.duration),source=route.from===index,destination=route.to===index;
      if(!(source&&f<.5||destination&&f>=.5))return;
      const x=source?-10+f*42:11-(f-.5)*42,z=10.7;
      job(x,z,()=>{
        b(x,z,.28,2.4,1.15,.9,['#d2dcc8','#6a8572','#9ab299']);b(x+.9,z,1.18,.6,1.08,.46,['#a8c5c6','#526e72','#82a7a8']);b(x-.2,z,1.18,1.6,1.1,.55,cream);
        [-.75,.75].forEach(dx=>{const q=p(x+dx,.27,z+.57);ellipse(q.x,q.y,unit*.24,unit*.26,'#28392f');ellipse(q.x,q.y,unit*.1,unit*.11,'#9dac9c');});
        const q=p(x+1.22,.75,z+.4);ellipse(q.x,q.y,unit*.08,unit*.06,'#ffebb7');
      });
    });
    if(network.flagship)job(0,5.5,()=>{b(0,5.5,0,.6,.6,1.8,dark);b(0,5.5,1.8,1.1,.15,.8,brass);const q=p(0,2.2,5.6);ellipse(q.x,q.y,unit*.18,unit*.2,'#f0e4bb');});
  }
  jobs.sort((a,b)=>a.depth-b.depth);jobs.forEach(j=>j.draw());
  if(day.darkness>0){ctx.fillStyle='rgba(15,26,48,'+day.darkness+')';ctx.fillRect(0,0,width,height);[-3,3].forEach(x=>glow(x,2,2,2.6));glow(0,3,8,2);if(district>0)glow(13,2,-6,1.8);}
}
