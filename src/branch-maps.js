import {atmosphere} from './operations.js';
// Three hand-curated Canvas scenes, each a whole city block around its shop. They share the main map's projection and gestures.
// `frame` is each scene's projected bounding box in world units at unit scale (width, height, centre), measured by
// drawing it through a recording projection; the camera fits it to the viewport.
export const BRANCH_THEMES = [
  {name:'Riverside', description:'A cedar riverwalk shop with a timber loft and rooftop glasshouse, a footbridge to the far-bank promenade and boathouse, and waterside seating.', background:'#2f4c49', focus:{x:0,y:1.3,z:1.4}, frame:{w:44.3,h:24.9,cx:-1.9,cy:-2.2}},
  {name:'Old Town', description:'A three-storey brick boutique on a cobbled market square, beside a bakery and a clock tower, with a fountain, stalls and an upstairs botanical atelier.', background:'#514840', focus:{x:0,y:.3,z:1}, frame:{w:43.3,h:30.7,cx:-.85,cy:-4.7}},
  {name:'City Center', description:'A glass flagship beneath its own tower on a downtown plaza, with roof gardens, a reflecting pool, a metro entrance and a busy street.', background:'#3e4b55', focus:{x:0,y:1.3,z:2.5}, frame:{w:44.9,h:32.2,cx:-.05,cy:-5.2}}
];

export function drawBranchMap(api, index, level, now, projects=[], experience={}) {
  const {width,height,unit,project:p,box:b,line:l,poly,ellipse,plant,jar,carton,person,depth}=api;
  const theme=BRANCH_THEMES[index];
  const network=experience.network,operation=network?.stores[index],style=operation?.cosmetics||{},day=experience.lighting||(network?atmosphere(network):{night:false,darkness:0});
  const lightColor=['#ffe2aa','#c1e4f1','#ffc079'][style.lighting||0];
  const awningFinish=[['#8fa787','#4e6d57','#6d896b'],['#d5a08b','#986452','#ba806c'],['#e4deca','#aba68e','#cec5ae']][style.awning||0];
  let wood=['#c2a073','#7a5a40','#a3815b'], dark=['#4b5750','#23362e','#374c40'];
  const cream=['#e5ddc4','#a7a18c','#cdc7af'], brass=['#dcc089','#8d7348','#b39665'];
  const rust=['#c98466','#7d4a3a','#a4624e','#dba58a'], sage=['#7f9c8a','#46605a','#658074','#a9c1b0'];
  const jobs=[],fixtures=[];
  const activeEvent=experience.event?.joined&&experience.event.open&&!experience.event.claimed;
  const eventKind=(experience.event?.slot||0)%3;
  const job=(x,z,draw)=>jobs.push({depth:depth({x,z}),draw});
  const patch=(x,z,w,d,color,y=.015)=>poly([p(x-w/2,y,z-d/2),p(x+w/2,y,z-d/2),p(x+w/2,y,z+d/2),p(x-w/2,y,z+d/2)],color);
  // Screen-blended light with a bright core and a long faint tail, so fixtures lift the ground they land on rather than tint it.
  function glow(x,y,z,size,color=lightColor){if(api.night)fixtures.push({x,y,z,size});const q=p(x,y,z),g=api.ctx.createRadialGradient(q.x,q.y,0,q.x,q.y,unit*size),a='45';g.addColorStop(0,color+a);g.addColorStop(.3,color+'24');g.addColorStop(.65,color+'0b');g.addColorStop(1,color+'00');api.ctx.save();api.ctx.globalCompositeOperation='screen';ellipse(q.x,q.y,unit*size,unit*size*.55,g);api.ctx.restore();}
  function planter(x,z,w=1.1,size=1.3,y=0){b(x,z,y,w,w,.55,wood);b(x,z,y+.55,w+.09,w+.09,.1,dark);if(style.plants===2){l([[x,y+.6,z],[x,y+.6+size,z]],'#79a67f',.18);l([[x-.3,y+size*.85,z],[x-.3,y+size*.5,z],[x+.3,y+size*.5,z],[x+.3,y+size,z]],'#79a67f',.13);}else plant(x,z,y+.6,size);if(projects[2]||style.plants===1){for(let k=0;k<5;k++){const xx=x-w*.35+k*w*.175,q=p(xx,y+.85+(k%2)*.12,z+w*.32);l([[xx,y+.63,z+w*.32],[xx,y+.85+(k%2)*.12,z+w*.32]],'#71925c',.025);ellipse(q.x,q.y,unit*.1,unit*.07,k%2?'#eccba1':'#c89388');}}}
  function tree(x,z,size=1){
    b(x,z,0,1.6,1.6,.28,cream);l([[x,.2,z],[x,3*size,z]],'#826243',.16);
    [-1,1].forEach(s=>l([[x,1.6*size,z],[x+s*.6*size,2.8*size,z+s*.25]],'#826243',.085));
    for(let i=0;i<14;i++){const a=i*2.4,q=p(x+Math.cos(a)*(.5+i%3*.2)*size,2.8*size+(i%4)*.28,z+Math.sin(a)*.7*size);ellipse(q.x,q.y,unit*.64*size,unit*.47*size,['#648768','#88a675','#a2b780'][i%3]);}
  }
  function bench(x,z,w=2.8,y=0){
    if(style.layout===1&&y===0){display(x,z,0,wood);return;}
    [-w*.36,w*.36].forEach(dx=>b(x+dx,z,y,.12,.65,.55,dark));
    for(let i=0;i<4;i++)b(x,z-.3+i*.2,y+.54,w,.15,.1,wood);
    b(x,z-.43,y+.64,w,.1,.7,wood);
  }
  function lamp(x,z,y=0){l([[x,y,z],[x,y+3.2,z]],'#37453b',.1);b(x,z,y+3.16,.52,.5,.1,brass);b(x,z,y+3.26,.36,.34,.52,['#fff0c2','#d7c18d','#ebd8a5']);b(x,z,y+3.8,.57,.53,.1,dark);glow(x,y+3.5,z,.9);}
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
  function cafeTable(x,z,y=0){
    b(x,z,y,.15,.15,.86,dark);b(x,z,y+.86,1.3,1.3,.12,wood);
    [-1,1].forEach(side=>{const sx=x+side*1.25;b(sx,z,y,.55,.55,.53,wood);b(sx,z-.28,y+.53,.58,.08,.62,wood);});
    b(x+.27,z,y+.99,.21,.21,.22,cream);jar(x-.24,z,y+1,index);
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
  // District-scale pieces: the shops sit inside a wider block of neighbours, water, streets and landmarks.
  function glassX(x,z,d,h,y=0){poly([p(x,y,z-d/2),p(x,y,z+d/2),p(x,y+h,z+d/2),p(x,y+h,z-d/2)],'#b9d8ce20');l([[x,y,z-d/2],[x,y+h,z-d/2],[x,y+h,z+d/2],[x,y,z+d/2]],'#435b56',.06);}
  // Pitched roof with its ridge along x: back slope, gable end, then the lit front slope.
  function gableRoof(x,z,y,w,d,h,tile,eave=.3){
    const x0=x-w/2-eave,x1=x+w/2+eave,z0=z-d/2-eave,z1=z+d/2+eave;
    poly([p(x0,y,z0),p(x1,y,z0),p(x1,y+h,z),p(x0,y+h,z)],tile[1]);
    poly([p(x1,y,z0),p(x1,y,z1),p(x1,y+h,z)],tile[2]);
    poly([p(x0,y,z1),p(x1,y,z1),p(x1,y+h,z),p(x0,y+h,z)],tile[0]);
    l([[x0,y+h,z],[x1,y+h,z]],tile[2],.07);
  }
  // Rows of lit or dark panes on a wall face: plane 'z' faces the viewer along x, plane 'x' runs along z.
  function windowGrid(plane,at,a0,a1,y0,rows,cols,ph,pw,gapY,colors,seed=0){
    const span=a1-a0,step=(span-cols*pw)/(cols+1);
    for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
      const s=a0+step+c*(pw+step),e=s+pw,y=y0+r*(ph+gapY),lit=colors[(r*7+c*3+seed)%colors.length];
      poly(plane==='z'?[p(s,y,at),p(e,y,at),p(e,y+ph,at),p(s,y+ph,at)]:[p(at,y,s),p(at,y,e),p(at,y+ph,e),p(at,y+ph,s)],lit);
    }
  }
  function shutters(x,z,y,w,h,color){[-1,1].forEach(s=>{b(x+s*(w/2+.17),z,y,.26,.08,h,color);for(let k=0;k<4;k++)l([[x+s*(w/2+.06),y+.15+k*(h-.3)/3,z+.05],[x+s*(w/2+.28),y+.15+k*(h-.3)/3,z+.05]],'#00000022',.02);});}
  // An arched timber footbridge between two banks: the deck follows a parabola, with piers, rails and lanterns.
  function footbridge(x0,x1,z,y0,y1,rise,width=1.8){
    const n=14,at=t=>({x:x0+(x1-x0)*t,y:y0+(y1-y0)*t+rise*4*t*(1-t)});
    [.28,.72].forEach(t=>{const q=at(t);b(q.x,z,-.6,.42,width-.3,q.y+.42,['#c2c3b1','#7f8478','#a5a897']);});
    for(let i=0;i<n;i++){const a=at(i/n),c=at((i+1)/n);
      poly([p(a.x,a.y-.16,z+width/2),p(c.x,c.y-.16,z+width/2),p(c.x,c.y,z+width/2),p(a.x,a.y,z+width/2)],wood[1]);
      poly([p(a.x,a.y,z-width/2),p(c.x,c.y,z-width/2),p(c.x,c.y,z+width/2),p(a.x,a.y,z+width/2)],i%2?wood[0]:wood[2]);}
    [-1,1].forEach(s=>{const rail=[];for(let i=0;i<=n;i++){const q=at(i/n);rail.push([q.x,q.y+1,z+s*width/2]);if(i%2===0)l([[q.x,q.y,z+s*width/2],[q.x,q.y+1,z+s*width/2]],dark[1],.055);}l(rail,'#c9b58a',.06);l(rail.map(q=>[q[0],q[1]-.45,q[2]]),'#8d7a55',.03);});
    [.5].forEach(t=>{const q=at(t);[-1,1].forEach(s=>{b(q.x,z+s*width/2,q.y+1,.22,.22,.08,brass);b(q.x,z+s*width/2,q.y+1.08,.26,.26,.3,['#fff0c2','#d7c18d','#ebd8a5']);b(q.x,z+s*width/2,q.y+1.38,.3,.3,.07,dark);glow(q.x,q.y+1.2,z+s*width/2,.7);});});
  }
  // A round stone fountain: basin wall, water, a tiered centre with animated jets and spreading ripples.
  function fountain(x,z,r,stone){
    const rim=r+.35,lo=p(x,0,z),hi=p(x,.6,z),arc=[];
    for(let i=0;i<=20;i++){const a=i*Math.PI/20;arc.push([x+Math.cos(a)*rim,z+Math.sin(a)*rim]);}
    ellipse(lo.x,lo.y,unit*rim,unit*rim*.5,stone[1]);
    poly([...arc.map(q=>p(q[0],0,q[1])),...arc.slice().reverse().map(q=>p(q[0],.6,q[1]))],stone[1]);
    poly([...arc.map(q=>p(q[0],0,q[1])).slice(0,11),...arc.slice(0,11).reverse().map(q=>p(q[0],.6,q[1]))],stone[2]);
    ellipse(hi.x,hi.y,unit*rim,unit*rim*.5,stone[0]);
    const w=p(x,.55,z);ellipse(w.x,w.y,unit*r,unit*r*.5,'#6fa5a3');ellipse(w.x-unit*r*.25,w.y-unit*r*.1,unit*r*.45,unit*r*.18,'#8fc0ba66');
    b(x,z,.55,.8,.8,.9,stone);b(x,z,1.45,1.5,1.5,.12,stone);b(x,z,1.57,.4,.4,.7,stone);b(x,z,2.27,.8,.8,.1,stone);
    const t=(now*.0004)%1;
    for(let k=0;k<6;k++){const a=k*Math.PI/3,pts=[];for(let s=0;s<=6;s++){const f=s/6;pts.push([x+Math.cos(a)*f*1.25,2.35+Math.sin(f*Math.PI)*.9-f*1.4,z+Math.sin(a)*f*1.25]);}l(pts,'#e6f5ee9a',.04);}
    for(let k=0;k<3;k++)ring(x,z,.57,.3+((t+k/3)%1)*(r-.4),'#dff2e9'+Math.round(90*(1-(t+k/3)%1)).toString(16).padStart(2,'0'));
    glow(x,.6,z,r*.9);
  }
  // A market stall with a striped canopy and something to sell.
  function stall(x,z,stripe,goods=0){
    b(x,z,0,2.6,1.4,.9,wood);b(x,z,.9,2.7,1.5,.1,cream);
    [-1.2,1.2].forEach(dx=>[-.6,.6].forEach(dz=>l([[x+dx,0,z+dz],[x+dx,2.6,z+dz]],'#5b4a38',.05)));
    for(let k=0;k<6;k++)b(x-1.15+k*.46,z,2.6,.48,1.7,.1,k%2?cream:stripe);
    l([[x-1.4,2.6,z+.85],[x+1.4,2.6,z+.85]],stripe[1],.05);
    if(goods===0)for(let k=0;k<4;k++)plant(x-.9+k*.6,z,1,.45,k%4,.9);
    else if(goods===1)for(let k=0;k<3;k++){carton(x-.7+k*.7,z-.2,1,.42);jar(x-.7+k*.7,z+.35,1,k);}
    else for(let k=0;k<7;k++){const q=p(x-.95+k*.32,1.15,z+(k%2)*.3-.1);ellipse(q.x,q.y,unit*.14,unit*.1,['#d5a059','#c96d5a','#e6d38f','#8fa96b'][k%4]);}
  }
  // A newsstand kiosk with a lit hatch and a small awning.
  function kiosk(x,z,finish){
    b(x,z,0,2,1.8,2.3,finish);b(x,z,2.3,2.3,2.1,.16,dark);b(x,z,2.46,.5,.5,.35,finish);
    poly([p(x-.7,1,z+.91),p(x+.7,1,z+.91),p(x+.7,1.95,z+.91),p(x-.7,1.95,z+.91)],'#ffe9b8');
    b(x,z+.91,.95,1.6,.3,.08,cream);for(let k=0;k<3;k++)jar(x-.5+k*.5,z+.85,1.03,k);
    for(let k=0;k<4;k++)b(x-.75+k*.5,z+1.15,2.1,.5,.7,.06,k%2?cream:awningFinish);
    glow(x,1.5,z+1,.8);
  }
  // A parked car: low body, glazed cabin, wheels and lamps.
  function car(x,z,paint){
    const sh=p(x,.01,z);ellipse(sh.x,sh.y,unit*1.4,unit*.62,'#0f1f1a3a');
    b(x,z,.3,2.6,1.25,.55,paint);b(x-.1,z,.85,1.45,1.15,.5,['#b9d3d4','#57767a','#87a7a8']);
    b(x-.1,z,1.33,1.3,1,.06,paint);
    [-.85,.85].forEach(dx=>[-.62,.62].forEach(dz=>{const q=p(x+dx,.28,z+dz);ellipse(q.x,q.y,unit*.26,unit*.28,'#26332c');ellipse(q.x,q.y,unit*.1,unit*.11,'#a5b1a3');}));
    const hl=p(x+1.31,.6,z+.4);ellipse(hl.x,hl.y,unit*.08,unit*.06,'#fff0c4');const tl=p(x-1.3,.62,z+.42);ellipse(tl.x,tl.y,unit*.07,unit*.05,'#d9694f');
  }
  // A glass bus shelter with a bench, a route flag and a lit roof panel.
  function busShelter(x,z,w=3){
    [-1,1].forEach(s=>{l([[x+s*(w/2-.1),0,z-.7],[x+s*(w/2-.1),2.5,z-.7]],'#4d5b56',.07);l([[x+s*(w/2-.1),0,z+.7],[x+s*(w/2-.1),2.5,z+.7]],'#4d5b56',.07);});
    poly([p(x-w/2,.1,z-.7),p(x+w/2,.1,z-.7),p(x+w/2,2.4,z-.7),p(x-w/2,2.4,z-.7)],'#b9d8ce26');l([[x-w/2,.1,z-.7],[x-w/2,2.4,z-.7],[x+w/2,2.4,z-.7],[x+w/2,.1,z-.7]],'#5a6c66',.05);
    glassX(x-w/2,z,1.4,2.3,.1);
    b(x,z-.35,.48,w-.5,.5,.08,wood);[-1,1].forEach(s=>b(x+s*(w/2-.45),z-.35,0,.1,.45,.48,dark));
    b(x,z,2.5,w+.2,1.7,.12,dark);b(x,z+.1,2.62,w-.6,1,.05,['#ffe9b8','#ffe9b8','#ffe9b8']);glow(x,2.4,z,1.1);
    l([[x+w/2+.4,0,z+.7],[x+w/2+.4,3,z+.7]],'#4d5b56',.05);b(x+w/2+.4,z+.7,3,.5,.08,.5,['#e7c76e','#a78c48','#c9ac5e']);
  }
  // Text and marks on a wall face, sheared to the projection like the main map's wallText().
  // draw() receives the context and the screen pixels per world unit along the face, since faces are foreshortened.
  function face(x,y,z,alongZ,draw){const ctx=api.ctx,q=p(x,y,z),axis=alongZ?p(x,y,z-1):p(x+1,y,z),run=Math.abs(axis.x-q.x);if(!(run>1e-6))return;ctx.save();ctx.translate(q.x,q.y);ctx.transform(1,(axis.y-q.y)/(axis.x-q.x),0,1,0,0);draw(ctx,run);ctx.restore();}
  function text(x,y,z,label,widthUnits,size,color,alongZ=false,weight='800'){face(x,y,z,alongZ,(ctx,run)=>{ctx.fillStyle=color;ctx.font=weight+' '+Math.max(5,unit*size)+'px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,0,0,widthUnits*run);});}
  function leaf(x,y,z,size,color,alongZ=false){face(x,y,z,alongZ,ctx=>{ctx.fillStyle=color;for(let k=-2;k<=2;k++){ctx.save();ctx.rotate(k*.5);ctx.beginPath();ctx.ellipse(0,-unit*size*.42,unit*size*.13,unit*size*.46,0,0,Math.PI*2);ctx.fill();ctx.restore();}ctx.fillRect(-unit*size*.025,0,unit*size*.05,unit*size*.36);});}
  // Lounge furniture: sofas and armchairs in fabric, rugs under seating zones.
  function sofa(x,z,w,y=0,fabric=rust,facing=1){
    b(x,z,y,w,1.1,.42,fabric);b(x,z+facing*.42,y+.42,w,.26,.55,fabric);
    [-1,1].forEach(s=>b(x+s*(w/2-.13),z,y+.42,.26,1.1,.22,fabric));
    const n=Math.max(1,Math.round((w-.5)/1)),cw=(w-.5)/n;for(let k=0;k<n;k++)b(x-(n-1)*.5*cw+k*cw,z-facing*.08,y+.42,cw-.1,.75,.12,[fabric[3],fabric[3],fabric[3]]);
  }
  function rug(x,z,w,d,y=0,c=['#a0563f','#c98466','#e0b58a']){patch(x,z,w,d,c[0],y+.02);patch(x,z,w-.24,d-.24,c[1],y+.024);for(let i=0;i<5;i++)patch(x,z-d/2+.35+i*(d-.7)/4,w-.6,.07,c[2],y+.026);}
  function firePit(x,z){
    b(x,z,0,1.2,1.2,.38,['#b9bba8','#6f7466','#9a9d8c']);const t=p(x,.39,z);ellipse(t.x,t.y,unit*.42,unit*.21,'#2b2420');
    for(let k=0;k<3;k++){const f=Math.sin(now*.006+k*2.1)*.12;poly([p(x-.2+k*.15,.4,z+.06),p(x+.02+k*.15,.4,z-.06),p(x-.09+k*.15+f,.95+k*.1,z)],k===1?'#f2b45a':'#e77d47');}
    glow(x,.7,z,1,'#ffb26a');
  }
  function deckChair(x,z){b(x,z,.12,1.5,.7,.28,['#d9c9a0','#8d8264','#b8aa85']);poly([p(x+.5,.4,z-.33),p(x+.5,.4,z+.33),p(x+.85,1.1,z+.33),p(x+.85,1.1,z-.33)],'#c9b48c');[-.6,.5].forEach(dx=>[-.3,.3].forEach(dz=>l([[x+dx,0,z+dz],[x+dx,.14,z+dz]],'#7a6a4e',.04)));}
  function heater(x,z,y=0){b(x,z,y,.5,.5,.06,dark);l([[x,y,z],[x,y+2.1,z]],'#4d5b56',.05);b(x,z,y+1.7,.3,.3,.4,['#ffb66f','#a86a2e','#d68f4c']);b(x,z,y+2.1,.62,.62,.1,dark);glow(x,y+1.9,z,.9,'#ffb26a');}
  function floorLamp(x,z,y=0){b(x,z,y,.4,.4,.05,dark);l([[x,y,z],[x,y+1.5,z]],'#4d5b56',.035);b(x,z,y+1.5,.6,.6,.45,['#f3e4c0','#b9a67c','#dccaa0']);glow(x,y+1.7,z,.8);}
  // A backlit, brass-framed glass showcase in place of open wall shelving.
  function showcase(x,z,w){
    b(x,z,0,w,.95,.85,dark);
    poly([p(x-w/2+.05,.9,z-.44),p(x+w/2-.05,.9,z-.44),p(x+w/2-.05,3.15,z-.44),p(x-w/2+.05,3.15,z-.44)],'#f3e7cd');
    const n=Math.min(6,2+level);[.9,1.7,2.5].forEach((y,row)=>{if(row)b(x,z,y-.05,w-.1,.85,.05,brass);for(let k=0;k<n;k++){const xx=x-w*.38+k*w*.76/(n-1);if((k+row)%4===0)carton(xx,z,y+.01,.4);else jar(xx,z,y+.01,(k+row)%4);}});
    b(x,z,3.15,w+.1,1.05,.08,brass);[-1,1].forEach(s=>l([[x+s*w/2,.85,z+.47],[x+s*w/2,3.15,z+.47]],brass[0],.04));l([[x-w/2,.85,z+.47],[x+w/2,.85,z+.47]],brass[0],.04);
    poly([p(x-w/2,.85,z+.47),p(x+w/2,.85,z+.47),p(x+w/2,3.15,z+.47),p(x-w/2,3.15,z+.47)],'#cfe6de22');glassX(x+w/2,z,.95,2.3,.85);
    glow(x,2,z+.2,w*.3);
  }
  // Full-spectrum LED grow panels, hung from the structure above.
  function ledPanel(x,z,y,w,d,hang=0){if(hang)[-w*.4,w*.4].forEach(dx=>l([[x+dx,y+hang,z],[x+dx,y+.07,z]],'#5e6a5e',.025));b(x,z,y,w,d,.07,['#f6f8ee','#b8c0b0','#d5dccc']);l([[x-w/2,y,z+d/2+.01],[x+w/2,y,z+d/2+.01]],'#f6e3f7',.05);glow(x,y-.1,z,w*.45,'#f2c9e8');}
  function signpost(x,z,labels){b(x,z,-.15,.16,.16,3,dark);labels.forEach((t,i)=>{const y=2.35-i*.55;b(x,z,y,1.55,.12,.42,i?wood:dark);text(x,y+.21,z+.07,t,1.35,.15,i?'#2d3a30':'#f3e7cd');});}
  function aFrame(x,z){poly([p(x-.55,0,z-.35),p(x+.55,0,z-.35),p(x+.55,1.3,z-.02),p(x-.55,1.3,z-.02)],'#1f2823');poly([p(x-.55,0,z+.35),p(x+.55,0,z+.35),p(x+.55,1.3,z+.02),p(x-.55,1.3,z+.02)],'#2a332c');l([[x-.55,0,z+.35],[x-.55,1.3,z+.02],[x+.55,1.3,z+.02],[x+.55,0,z+.35]],'#8d7a55',.04);['HIGHER','DAYS','AHEAD'].forEach((t,i)=>text(x,1.02-i*.28,z+.1+i*.07,t,.95,.14,'#e8dcc0'));}
  function stanchions(points){points.forEach(([x,z],i)=>{b(x,z,0,.22,.22,.05,brass);b(x,z,.05,.08,.08,.9,brass);b(x,z,.95,.14,.14,.06,brass);if(i){const [px,pz]=points[i-1];l([[px,.88,pz],[(px+x)/2,.74,(pz+z)/2],[x,.88,z]],'#8a4a3a',.045);}});}
  function neonPanel(x,z,y,w,h,lines,color='#9fe3a5',alongZ=false){
    if(alongZ){b(x+.04,z,y,.08,w,h,dark);lines.forEach((t,i)=>text(x+.09,y+h-.35-i*.55,z,t,w-.3,.26,color,true));leaf(x+.09,y+.25,z,lines.length?.55:h*.75,color,true);glow(x+.3,y+h/2,z,w*.45,'#8fe6a6');}
    else{b(x,z-.08,y,w,.08,h,dark);lines.forEach((t,i)=>text(x,y+h-.35-i*.55,z+.01,t,w-.3,.26,color));leaf(x,y+.12,z+.01,.55,color);glow(x,y+h/2,z+.2,w*.45,'#8fe6a6');}
  }
  // Square lantern heads on short posts, the boardwalk's path lighting.
  function lanternPost(x,z,y=0){b(x,z,y,.14,.14,.85,dark);b(x,z,y+.85,.34,.34,.06,dark);b(x,z,y+.91,.26,.26,.3,['#ffefc4','#e0b76a','#f2cf8a']);b(x,z,y+1.21,.38,.38,.07,dark);glow(x,y+1.05,z,.7,'#ffc978');}
  // A dense, layered shrub: clustered leaf ellipses in three greens.
  function bush(x,z,y,size=1){for(let i=0;i<9;i++){const a=i*2.2,q=p(x+Math.cos(a)*.35*size,y+.25*size+(i%3)*.16*size,z+Math.sin(a)*.3*size);ellipse(q.x,q.y,unit*.36*size,unit*.27*size,['#4f7a55','#6d9a62','#8fb478'][i%3]);}}
  // A dark timber planter box with a layered shrub, the boardwalk's edge planting.
  function planterBox(x,z,y=0,size=.9){b(x,z,y,.95,.95,.55,dark);b(x,z,y+.55,1.02,1.02,.06,dark);bush(x,z,y+.5,size*.75);}
  // A lit street pylon carrying the shop's mark.
  function pylon(x,z,finish){
    b(x,z,0,.55,.55,6,finish);b(x,z,3.9,2.2,.34,1.9,dark);poly([p(x-1,4,z+.18),p(x+1,4,z+.18),p(x+1,5.7,z+.18),p(x-1,5.7,z+.18)],'#dfeed4');
    const q=p(x,4.85,z+.19);ellipse(q.x,q.y,unit*.3,unit*.42,'#4f7a58');ellipse(q.x+unit*.1,q.y-unit*.1,unit*.16,unit*.24,'#7fa870');glow(x,4.8,z+.4,1.2);
  }
  function visitors(order,pickup,exit,approach=[-5,4.4]){
    // Managed customers are visual only; branch income stays in the economy simulation.
    const path=[[-8,7],approach,order,order,pickup,pickup,exit,[10,8]];
    for(let i=0;i<Math.min(10,3+Math.floor(level/2)+(activeEvent?2:0)+(experience.neighborhood||0)-(day.night?2:0));i++){
      const phase=(now/8500+i*1.19)%7,k=Math.floor(phase),t=phase-k,a=path[k],c=path[k+1];
      const x=a[0]+(c[0]-a[0])*t,z=a[1]+(c[1]-a[1])*t;
      job(x,z,()=>person(x,z,now,20+index*19+i,k!==2&&k!==4,false,k>=5));
    }
  }
  if(api.backdrop)api.backdrop(theme.background);else{api.ctx.fillStyle=theme.background;api.ctx.fillRect(0,0,width,height);}
  {const ctx=api.ctx,v=ctx.createRadialGradient(width*.5,height*.45,Math.min(width,height)*.35,width*.5,height*.45,Math.max(width,height)*.75);v.addColorStop(0,'#0a181600');v.addColorStop(1,'#0a181666');ctx.fillStyle=v;ctx.fillRect(0,0,width,height);}
  const sh=p(-.5,-.4,2);ellipse(sh.x,sh.y,unit*21,unit*9,'#0e201c55');

  if(index===0){
    // A cedar pavilion on a wide riverbank. The river cuts the plot in two: a footbridge crosses to a planted far-bank
    // promenade with a boathouse, and the shop carries a timber loft with a rooftop glasshouse.
    const WL=-.4,RX0=-15.5,RX1=-7.75,RZ=12.5,ctx=api.ctx,alpha=a=>Math.round(Math.max(0,Math.min(1,a))*255).toString(16).padStart(2,'0');
    wood=['#cf9f62','#8a5f33','#b07f42'];dark=['#2f4237','#172620','#243529'];
    const stone=['#b9bba8','#6f7466','#9a9d8c'],grass=['#8aa07a','#4a6150','#6a8262'];
    b(-2.25,0,-.65,36.5,25,.5,grass);
    // Far bank: a gravel promenade with lamps and benches, a boathouse with racked kayaks, and a small fishing dock.
    patch(-17.7,0,1.5,25,'#b3ae93',-.14);
    for(let z=-11.5;z<12.5;z+=1.6)l([[-18.45,-.13,z],[-16.95,-.13,z+.3]],'#8e8a7233',.02);
    b(-20.35,0,-.15,.3,25,.12,['#8ea77b','#586d56','#7b916f']);
    [[-19.5,-10.4,1.15],[-19.7,5.6,1.05],[-19.1,11.3,.9]].forEach(([x,z,s])=>tree(x,z,s));
    // Benches go down before the boathouse, which stands nearer and must occlude the one behind it.
    bench(-17.9,7.4,2.4,-.15);bench(-18,-8.2,2.4,-.15);
    b(-18.7,-3.3,-.15,3.6,3.8,2.5,wood);gableRoof(-18.7,-3.3,2.35,3.6,3.8,1.4,['#6d7f6c','#3f5044','#56685a']);
    poly([p(-18,-.15,-1.39),p(-17,-.15,-1.39),p(-17,1.75,-1.39),p(-18,1.75,-1.39)],'#2f3d36');
    l([[-18,-.15,-1.38],[-18,1.75,-1.38],[-17,1.75,-1.38],[-17,-.15,-1.38]],'#dcc294',.04);
    poly([p(-20,.9,-1.39),p(-19.2,.9,-1.39),p(-19.2,1.6,-1.39),p(-20,1.6,-1.39)],'#b9d8ce30');
    leaf(-19.4,1.4,-1.38,.9,'#d9c68a');const lb=p(-16.89,1.3,-3.3);ctx.strokeStyle='#deae79';ctx.lineWidth=Math.max(1,unit*.08);ctx.beginPath();ctx.ellipse(lb.x,lb.y,unit*.2,unit*.24,0,0,Math.PI*2);ctx.stroke();
    [-19.75,-17.65].forEach(x=>b(x,.9,-.15,.16,.6,1.25,dark));[.3,.85].forEach(y=>l([[-19.85,y,.9],[-17.55,y,.9]],'#5b6a58',.04));
    [[.34,'#cf8a5a'],[.9,'#7fa5a0']].forEach(([y,c])=>{poly([p(-20.1,y,.9),p(-19.4,y,.55),p(-18,y,.55),p(-17.2,y,.9),p(-18,y,1.25),p(-19.4,y,1.25)].map(q=>q),c);poly([p(-19.2,y+.02,.72),p(-18.2,y+.02,.72),p(-18.2,y+.02,1.08),p(-19.2,y+.02,1.08)],'#2c3a34');});
    [-9.2,6.2,10.4].forEach(z=>lamp(-16.8,z,-.15));
    // The walk up to the bridge: a branded directional post, planters and patio heaters.
    signpost(-16.6,4.6,['RIVERSIDE','FLOWERS','EDIBLES','WELLNESS']);[-.4,5.6].forEach(z=>heater(-16.95,z,-.15));[[-17,-1.6],[-18.4,4.6]].forEach(([x,z])=>planter(x,z,1,1,-.15));
    floor(-14.9,7.6,1.9,2.6,0,wood);[[-14.15,6.5],[-14.15,8.7]].forEach(([x,z])=>b(x,z,WL-.15,.2,.2,.55,dark));
    l([[-14.05,.1,7.6],[-14.05,-.3,7.6]],'#8d8a76',.05);l([[-14.05,.1,7.9],[-14.05,-.3,7.9]],'#8d8a76',.05);
    // The river is cut into the plot rather than painted on it: a grass verge and an earth bank drop to the water,
    // which runs off both ends of the slab. Its surface is graded from the lit shallows by the far bank to the deeper
    // channel, with the near bank's shadow lying across it.
    poly([p(RX0,-.65,-RZ),p(RX0,-.65,RZ),p(RX0,-.15,RZ),p(RX0,-.15,-RZ)],'#4f5c47');
    b(-15.75,0,-.15,.5,25,.1,['#8ea77b','#586d56','#7b916f']);
    [[-15.7,-9.6,.4],[-15.8,-4.2,.32],[-15.65,3.1,.46],[-15.75,8.4,.3],[-15.7,11.6,.34]].forEach(([x,z,w])=>b(x,z,-.05,w,w*.8,w*.5,stone));
    [-7.4,-1.1,5.9,10.2].forEach((z,i)=>{for(let j=0;j<4;j++){const x=-15.55+j*.09;l([[x,-.05,z],[x+Math.sin(j*1.3+i)*.1,.5+(j%3)*.18,z]],'#7e975f',.032);}});
    const across=(a,b)=>ctx.createLinearGradient(p(a,WL,0).x,p(a,WL,0).y,p(b,WL,0).x,p(b,WL,0).y);
    const water=across(RX0,RX1);water.addColorStop(0,'#74cabf');water.addColorStop(.3,'#41aaa6');water.addColorStop(.72,'#2f9497');water.addColorStop(1,'#2a868b');
    poly([p(RX0,WL,-RZ),p(RX1,WL,-RZ),p(RX1,WL,RZ),p(RX0,WL,RZ)],water);
    // Sky reflected down the middle of the channel, the boardwalk's shadow along the near bank.
    const sky=across(-13.8,-10.4);sky.addColorStop(0,'#dcefe400');sky.addColorStop(.5,'#e6f6ee3a');sky.addColorStop(1,'#dcefe400');
    poly([p(-13.8,WL,-RZ),p(-10.4,WL,-RZ),p(-10.4,WL,RZ),p(-13.8,WL,RZ)],sky);
    const shade=across(RX1,-9.4);shade.addColorStop(0,'#16343352');shade.addColorStop(1,'#16343300');
    poly([p(-9.4,WL,-RZ),p(RX1,WL,-RZ),p(RX1,WL,RZ),p(-9.4,WL,RZ)],shade);
    // Wide cross-section of water on the slab's front face, so the river reads as flowing off the plot.
    poly([p(RX0,-.65,RZ),p(RX1,-.65,RZ),p(RX1,WL,RZ),p(RX0,WL,RZ)],'#256b6e');
    // Current: soft highlight streaks drift downstream and breathe, a few rings spread and fade, sparkles wink.
    for(let i=0;i<28;i++){const drift=((i*.83+now*.00045)%(RZ*2)),z=-RZ+.6+drift,len=.5+(i*.37%1)*1.3,x=-14.9+(i*2.3%6.6)+Math.sin(i*1.7+now*.0003)*.2,a=.46*Math.max(0,Math.sin(now*.0011+i*2.1))*Math.min(1,drift/1.5,(RZ*2-1.2-drift)/1.5);if(a<.02||z+len>RZ-.3)continue;l([[x,WL+.01,z],[x+.05,WL+.01,z+len*.5],[x,WL+.01,z+len]],'#e4f3ea'+alpha(a),.036);}
    for(let i=0;i<6;i++){const phase=(now*.00013+i*.19)%1,x=-14.6+(i*1.9%6.4),z=-10.5+i*4.1;ring(x,z,WL+.005,.15+phase*.8,'#dcece3'+alpha(.42*(1-phase)));}
    for(let i=0;i<12;i++){const tw=Math.pow(Math.max(0,Math.sin(now*.0023+i*1.9)),3);if(tw<.05)continue;const q=p(-15+(i*1.31%7),WL+.01,-11.2+i*1.95);ellipse(q.x,q.y,Math.max(.6,unit*.028),Math.max(.4,unit*.018),'#f5fcf6'+alpha(tw*.85));}
    // Lily pads gather in the shallows by the far bank; two of them flower.
    [[-15.15,-8.3],[-14.7,-7.6],[-15.05,-1.4],[-14.55,4.6],[-15.1,5.4],[-14.85,10.7],[-14.4,11.3]].forEach(([x,z],i)=>{const q=p(x,WL+.008,z);ellipse(q.x,q.y,unit*.22,unit*.13,'#6d9a63');ellipse(q.x+unit*.09,q.y-unit*.02,unit*.12,unit*.07,'#7fa871');ellipse(q.x+unit*.16,q.y+unit*.05,unit*.06,unit*.04,'#5b9a99');if(i===1||i===4){ellipse(q.x-unit*.04,q.y-unit*.06,unit*.08,unit*.06,'#e9bcb6');ellipse(q.x-unit*.04,q.y-unit*.07,unit*.03,unit*.025,'#f2d98a');}});
    // A pair of ducks paddle upstream, leaving thin wakes.
    [[-11.4,.0],[-10.9,.7]].forEach(([dx,dz],i)=>{const z=dz+3.6+Math.sin(now*.00025+i*2)*1.6,x=dx+Math.sin(now*.0004+i)*.15,q=p(x,WL+.03,z);l([[x-.08,WL+.005,z+.25],[x-.28,WL+.005,z+1.1]],'#dcece3'+alpha(.28),.022);l([[x+.08,WL+.005,z+.25],[x+.24,WL+.005,z+1.1]],'#dcece3'+alpha(.28),.022);ellipse(q.x,q.y,unit*.17,unit*.1,i?'#d9cfb3':'#ece4cc');const h=p(x+.12,WL+.2,z-.08);ellipse(h.x,h.y,unit*.075,unit*.075,i?'#7a6a52':'#41684d');ellipse(h.x+unit*.07,h.y+unit*.01,unit*.045,unit*.025,'#e0a44f');});
    // A moored canoe rides low on the water, its rope slack to a bollard on the walk.
    const bob=Math.sin(now*.0007)*.025;
    const cs=p(-11.7,WL,-4.25);ellipse(cs.x,cs.y,unit*1.15,unit*.44,'#1d3b3b4a');
    const hull=[[-12.3,-4.5],[-11.8,-6],[-11.2,-6.15],[-10.8,-4.5],[-11.2,-2.85],[-11.8,-3]];
    poly(hull.map(q=>p(q[0],WL+bob,q[1])),'#b78957');
    poly(hull.map(q=>p(-11.55+(q[0]+11.55)*.66,WL+bob+.06,-4.5+(q[1]+4.5)*.75)),'#5b6b52');
    b(-11.55,-5.1,WL+bob+.08,1,.18,.09,wood);b(-11.55,-3.9,WL+bob+.08,1,.18,.09,wood);
    l([[-11.15,WL+bob+.16,-6],[-9.7,WL+.03,-5.6],[-7.62,.95,-5.2]],'#dcc294',.06);
    // An arched footbridge joins the boardwalk to the far-bank promenade.
    footbridge(-7.55,-15.7,2.5,.25,-.05,1.5);
    // The near bank: a shadowed earth lip under the boardwalk curb, then reeds along the water's edge.
    poly([p(RX1,WL,-RZ),p(RX1,WL,9.5),p(RX1,-.15,9.5),p(RX1,-.15,-RZ)],'#4a5a45');
    // The bank bends around the front corner, so the water wraps the boardwalk: an inlet with rocks and reeds.
    poly([p(RX1,WL,9.5),p(RX1,WL,RZ),p(-4,WL,RZ)],water);poly([p(RX1,WL,9.5),p(-4,WL,RZ),p(-4,-.15,RZ),p(RX1,-.15,9.5)],'#4a5a45');
    poly([p(RX1,-.65,RZ),p(-4,-.65,RZ),p(-4,WL,RZ),p(RX1,WL,RZ)],'#256b6e');
    [[-6.9,11.1],[-5.6,11.9],[-4.7,12.2]].forEach(([x,z],i)=>{const q=p(x,WL+.008,z);ellipse(q.x,q.y,unit*.2,unit*.12,'#6d9a63');if(i===1)ellipse(q.x-unit*.04,q.y-unit*.06,unit*.07,unit*.05,'#e9bcb6');});
    [[-6.9,10.2,.5],[-5.9,11,.42],[-5,11.7,.55],[-4.2,12.3,.36]].forEach(([x,z,w])=>b(x,z,-.05,w,w*.8,w*.55,stone));
    [[-7.3,9.9],[-6.9,10.5],[-3.9,12.4]].forEach(([x,z],i)=>{const q=p(x,WL+.008,z);ellipse(q.x,q.y,unit*.19,unit*.11,'#6d9a63');ellipse(q.x+unit*.08,q.y-unit*.02,unit*.1,unit*.06,'#7fa871');});
    [[-6.3,10.6],[-5.4,11.5],[-4.4,12.05],[-7.4,9.7]].forEach(([x,z],i)=>job(x,z,()=>{for(let j=0;j<4;j++)l([[x+j*.12,0,z],[x+j*.12+Math.sin(j+i)*.12,.6+(j%3)*.2,z]],'#789162',.035);}));
    for(let i=0;i<16;i++){const z=-11+i*1.3;if(Math.abs(z+6)<1.3||Math.abs(z-2.5)<1.3||z>9)continue;job(-7.7,z,()=>{for(let j=0;j<4;j++){const x=-7.9+j*.16;l([[x,0,z],[x+Math.sin(j+i)*.12,.6+(j%3)*.21,z]],'#789162',.035);} });}
    b(-7.5,-1.5,-.12,.55,22,.35,['#acbda0','#63775e','#88997b']);
    // Wide boardwalk outside the open shop and a short waterside pier.
    floor(-2,5.8,10,8,0,wood);
    // A wider waterside deck: deck chairs face the river around a fire pit.
    poly([p(-11.2,WL,4.9),p(-7.75,WL,4.9),p(-7.75,WL,9.2),p(-11.2,WL,9.2)],'#1d3b3b3d');
    [[-10.7,5.1],[-10.7,8.9],[-8.5,8.9]].forEach(([x,z])=>b(x,z,WL-.15,.2,.2,.45,dark));
    floor(-9.2,7,3.8,4.2,0,wood);
    job(-8.4,8.1,()=>firePit(-8.4,8.1));job(-10.1,5.9,()=>deckChair(-10.1,5.9));job(-10.1,8.2,()=>deckChair(-10.1,8.2));
    // String lights swing between two posts along the pier's water edge.
    [5.1,8.9].forEach(z=>b(-10.9,z,0,.16,.16,2.9,dark));l([[-10.9,2.85,5.1],[-10.9,2.45,7],[-10.9,2.85,8.9]],'#5e5a48',.02);for(let k=0;k<7;k++){const t=k/6,z=5.1+t*3.8,y=2.85-Math.sin(t*Math.PI)*.4,q=p(-10.9,y-.14,z);ellipse(q.x,q.y,unit*.07,unit*.09,'#ffe7b4');if(k%3===1)glow(-10.9,y,z,.5);}
    // Staggered board ends and small fasteners make the decking read as timber.
    for(let x=-6.8;x<3;x+=.65)for(let z=2.4;z<9.7;z+=2.1){l([[x,.02,z],[x+.6,.02,z]],'#82694755',.015);const q=p(x+.08,.026,z+.07);ellipse(q.x,q.y,Math.max(.5,unit*.023),Math.max(.3,unit*.013),'#645a43');}
    mat(-2.1,4,2.4,.9);
    // The boardwalk rail breaks for the bridge landing.
    const posts=[-11.6,-9.4,-7.1,-4.9,-2.6,-.3,1.2,3.9,6.6,8.9];posts.forEach((z,i)=>{b(-7.6,z,.08,.16,.16,1.05,dark);if(i<posts.length-1&&z!==1.2)l([[-7.6,1.04,z],[-7.6,1.04,posts[i+1]]],'#bdab86',.065);});
    floor(2,-1.4,17,13.6,0,wood);
    b(2,-8.15,0,17,.23,4.6,['#98ac90','#536f5b','#78937a']);
    for(let i=-6.3;i<10.5;i+=.32)b(i,-8.0,.05,.06,.045,4.38,wood);
    b(-6.4,-4.8,0,.2,6.6,4.6,wood);
    [-2.2,2.1,6.4].forEach(x=>glass(x,-7.86,3.2,2.1,1.8));
    showcase(-3.7,-6.9,3.5);showcase(2.1,-6.9,4.7);
    // Chalk menu between the showcases, a neon slogan panel by the nursery.
    b(-1.1,-7.98,1.5,1.5,.08,2.1,dark);['FLOWER','PRE-ROLLS','EDIBLES','WELLNESS'].forEach((t,i)=>text(-1.1,3.3-i*.42,-7.9,t,1.3,.13,'#e8dcc0',false,'600'));
    neonPanel(-6.3,-6.2,1.3,2,2,[],'#9fe3a5',true);
    wallArt(5.2,-7.82,1.55);
    [-.15,4.7,10.1].forEach(x=>sconce(x,-7.76,3.15));
    hangingPot(-5.5,-2.9,2.6,.65);hangingPot(5.5,-6.1,2.6,.65);
    b(2,-8.12,4.55,17.35,.42,.22,wood);
    // A timber loft over the rear half of the shop: café tables and planters under a cedar roof, string lights along
    // its rail, and a glasshouse nursery at the sunny end.
    floor(2,-5.45,17,5.7,4.8,wood);
    b(2,-8.15,4.8,17,.23,4.1,['#98ac90','#536f5b','#78937a']);
    for(let i=-6.3;i<10.5;i+=.32)b(i,-8.0,4.85,.06,.045,3.95,wood);
    b(-6.4,-5.4,4.8,.2,5.6,4.1,wood);
    glass(-2.6,-7.86,3,1.9,6.1);
    b(1.4,-7.98,5.85,4,.1,2.1,dark);leaf(1.4,7.45,-7.9,.85,'#d9c68a');text(1.4,6.5,-7.9,'RIVERSIDE',3.6,.44,'#f0dfb0');
    wallArt(-4.9,-7.82,6.3);wallArt(4.4,-7.82,6.3);[-1,5.6].forEach(x=>sconce(x,-7.76,7.3));
    // Upstairs lounge: a rug, armchairs and a low table on the left, a café table on the right, and a mural on the wall.
    rug(-3.6,-4.7,3.6,2.3,4.8);sofa(-4.4,-5.1,1.3,4.8,rust,-1);sofa(-2.8,-5.1,1.3,4.8,sage,-1);b(-3.6,-4,4.8,1.2,.6,.4,dark);jar(-3.6,-4,5.2,2);
    cafeTable(-.1,-4.4,4.8);floorLamp(-5.8,-7.4,4.8);floorLamp(4.8,-3.2,4.8);
    [['#c98466',5.5],['#e0b58a',6.1],['#7f9c8a',6.7],['#466c6a',7.3]].forEach(([c,y])=>poly([p(-6.29,y,-7.6),p(-6.29,y,-5.6),p(-6.29,y+.6,-5.6),p(-6.29,y+.6,-7.6)],c));l([[-6.28,5.5,-7.6],[-6.28,7.9,-7.6],[-6.28,7.9,-5.6],[-6.28,5.5,-5.6],[-6.28,5.5,-7.6]],brass[0],.04);
    bench(.4,-7.25,2.6,4.8);
    [-5.6,2.7].forEach(x=>planter(x,-3.5,1,1.1,4.8));
    b(7.6,-5.5,4.8,4.6,4.4,.15,stone);
    [-6.9,-4.3].forEach(z=>{[5.9,9.3].forEach(x=>b(x,z,4.95,.12,.7,1.4,dark));b(7.6,z,6.15,3.7,.75,.06,brass);for(let x=6.1;x<9.4;x+=.8){plant(x,z,4.95,.45,index,.8);plant(x,z,6.2,.45,index,.8);}ledPanel(7.6,z,7,3.6,.6,.35);});
    for(let x=6.2;x<9.4;x+=1.05)plant(x,-5.6,4.95,.55,index,.85);
    glass(7.6,-3.3,4.6,2.4,4.95);glassX(9.9,-5.5,4.4,2.4,4.95);
    poly([p(5.3,7.35,-3.3),p(9.9,7.35,-3.3),p(9.9,8.5,-5.5),p(5.3,8.5,-5.5)],'#cfe6de2c');poly([p(9.9,7.35,-7.7),p(9.9,7.35,-3.3),p(9.9,8.5,-5.5)],'#cfe6de24');
    l([[5.3,7.35,-3.3],[9.9,7.35,-3.3],[9.9,8.5,-5.5],[5.3,8.5,-5.5],[5.3,7.35,-3.3]],'#dfe9d6',.05);l([[9.9,7.35,-7.7],[9.9,8.5,-5.5]],'#dfe9d6',.05);
    for(let x=6.2;x<9.9;x+=1.15)l([[x,7.35,-3.3],[x,8.5,-5.5]],'#dfe9d6',.03);
    for(let x=-6.3;x<=10.5;x+=1.2)b(x,-2.62,4.8,.1,.1,1.05,dark);
    l([[-6.3,5.85,-2.62],[10.5,5.85,-2.62]],'#bdab86',.065);l([[-6.3,5.35,-2.62],[10.5,5.35,-2.62]],'#8d7a55',.03);
    for(let z=-8;z<=-2.62;z+=1.1)b(10.5,z,4.8,.1,.1,1.05,dark);l([[10.5,5.85,-8],[10.5,5.85,-2.62]],'#bdab86',.065);
    [-6.3,-.7,4.9].forEach(x=>b(x,-4.95,4.8,.18,.18,4.1,wood));
    b(-.7,-6.7,8.9,12.2,3.6,.3,['#3f5748','#22312a','#31463a']);b(-.7,-4.9,8.85,12.2,.22,.42,wood);
    text(-.7,9.07,-4.78,'GOOD PLANTS  ·  GOOD PEOPLE',9,.3,'#f3e7cd');
    [-3.5,1].forEach(x=>poly([p(x-.9,9.21,-7.6),p(x+.9,9.21,-7.6),p(x+.9,9.21,-5.9),p(x-.9,9.21,-5.9)],'#b9d8ce55'));
    l([[-6.3,6.15,-2.62],[10.5,6.15,-2.62]],'#5e5a48',.02);for(let k=0;k<14;k++){const x=-5.7+k*1.2,q=p(x,6,-2.62);ellipse(q.x,q.y,unit*.07,unit*.09,'#ffe7b4');if(k%3===1)glow(x,6,-2.62,.5);}
    // Warm light pools through the open shop and the loft, and pendants hang under the loft floor.
    glow(1,1.6,-2.5,7.5,'#ffcf8a');glow(0,6.4,-5.4,5,'#ffcf8a');
    [-4.6,-1.4,1.8].forEach(x=>pendant(x,-4.2,3.6));
    // Rain chain and a small collection barrel at the nursery end.
    job(10.85,-3.5,()=>{b(10.85,-3.5,0,.85,.85,1.15,wood);[.25,.9].forEach(y=>b(10.85,-3.5,y,.89,.89,.07,dark));for(let n=0;n<12;n++){const q=p(10.85,1.2+n*.26,-3.5);api.ctx.strokeStyle='#b8aa7b';api.ctx.lineWidth=Math.max(.5,unit*.02);api.ctx.beginPath();api.ctx.ellipse(q.x,q.y,unit*.06,unit*.09,0,0,Math.PI*2);api.ctx.stroke();}});
    b(-.1,-5.8,.03,1.1,.8,.8,wood);carton(-.1,-5.8,.85,.62);
    for(let n=0;n<3;n++)jar(-.48+n*.37,-4.6,.08,n);
    // Irrigation and a stocked potting bench accompany the nursery.
    b(10,-5,.12,.55,3.4,.75,wood);for(let n=0;n<4;n++)carton(10,-6.15+n*.75,.88,.42);
    l([[6.7,.13,-6.7],[6.7,.13,-2.2],[9.9,.13,-2.2]],'#52766a',.065);
    floor(8.3,-4.7,4.2,5.2,.08,cream);
    for(let x=7;x<10;x+=1.15)for(let z=-6;z<-2;z+=1.3)plant(x,z,.1,.65+level*.025,index,.8);
    [-6.3,-4.7,-3.1].forEach(z=>ledPanel(8.3,z,3.5,3.6,.55,1.3));
    // Pergola is behind the terrace, leaving the cutaway completely open.
    [-5.8,2.7].forEach(x=>b(x,2.5,0,.2,.2,4.5,wood));
    b(-1.55,2.5,4.45,8.8,.3,.25,wood);
    for(let x=-5.8;x<=2.7;x+=.72)b(x,3.7,4.64,.12,2.7,.12,wood);
    for(let i=0;i<7;i++){const x=-5.4+i*1.22;pendant(x,2.6,4.05);}
    [-5.5,-4.9,2,2.6].forEach(x=>vine(x,2.65,4.8,1.4));
    job(-4.4,4.4,()=>aFrame(-4.4,4.4));job(-3,4.7,()=>stanchions([[-4.4,4.7],[-3,4.7],[-1.6,4.7]]));
    job(9,9.3,()=>bicycle(9,9.3,'#c9b57e'));
    job(10.7,6.3,()=>{b(10.7,6.3,0,.7,.7,1,dark);b(10.7,6.3,1,.8,.8,.12,wood);});
    job(-3,1.4,()=>{[-1,1].forEach(s=>l([[-3+s*1.05,0,-.9],[-3+s*1.05,3.2,-.9]],'#4d5b56',.04));b(-3,-.9,2.55,2.3,.12,.62,dark);text(-3,2.86,-.83,'ORDER',2,.28,'#f0dfb0');person(-3,-.1,now,10,false,true,false);counter(-3,1.4);});
    job(2,1.4,()=>{[-1,1].forEach(s=>l([[2+s*1.05,0,-.9],[2+s*1.05,3.2,-.9]],'#4d5b56',.04));b(2,-.9,2.55,2.3,.12,.62,dark);text(2,2.86,-.83,'PICK UP',2,.28,'#f0dfb0');person(2,-.1,now,11,false,true,false);counter(2,1.4);});
    job(6.2,.7,()=>display(6.2,.7));
    if(level>=3)job(7.5,3.5,()=>display(7.5,3.5));
    rug(3.3,7,4.8,2.6);
    job(3.3,7.4,()=>sofa(3.3,7.4,3.2,0,rust));job(3.3,6.1,()=>{b(3.3,6.1,0,1.4,.7,.42,dark);jar(3.1,6.1,.42,1);});job(1.2,8.6,()=>heater(1.2,8.6));
    job(-6,-1.1,()=>floorLamp(-6,-1.1));job(10.1,4.9,()=>floorLamp(10.1,4.9));
    [-5.5,0,6.4].forEach(x=>job(x,9.5,()=>planter(x,9.5,1.4,1.1)));
    job(10,-.4,()=>tree(10,-.4,1.25));job(14.6,11.4,()=>tree(14.6,11.4,1.05));
    job(7,8.8,()=>lamp(7,8.8));
    [-5.2,-3.3,-1.4,.7,2.8].forEach(x=>job(x,10.4,()=>lanternPost(x,10.4)));
    [3.9,6.2,8.5].forEach(z=>job(-6.85,z,()=>lanternPost(-6.85,z)));[[-10.9,4.95],[-10.9,9.05],[-7.5,9.05]].forEach(([x,z])=>job(x,z,()=>lanternPost(x,z)));
    [[-5.9,10.9,1],[-3.6,11.4,.8],[12.2,-9.8,1.1],[14.9,8.6,.9],[11.6,11.8,.8]].forEach(([x,z,sz])=>job(x,z,()=>bush(x,z,0,sz)));
    [[-19.9,-6.6,.9],[-19.6,2.6,.8],[-19.9,8.4,.9]].forEach(([x,z,sz])=>job(x,z,()=>bush(x,z,-.15,sz)));
    // A lifebuoy is fastened to the outer boardwalk railing.
    job(-7.6,4,()=>{const q=p(-7.6,.65,4);api.ctx.strokeStyle='#deae79';api.ctx.lineWidth=unit*.1;api.ctx.beginPath();api.ctx.ellipse(q.x,q.y,unit*.22,unit*.27,0,0,Math.PI*2);api.ctx.stroke();});
    if(level>=5){job(-8,5.5,()=>{b(-8,5.5,0,1.2,.55,.24,wood);plant(-8,5.5,.24,1.1);});job(9,6,()=>bench(9,6,2));}
    // A clipped hedge and a tree close the plot's open eastern edge.
    for(let z=-11.5;z<12;z+=1.3)b(15.6,z,-.15,.6,1.2,.9,['#7f9a6c','#3f5a44','#5f7c58']);
    job(13.2,-11.2,()=>tree(13.2,-11.2,1.1));
    // A lower promenade along the water's edge in front.
    floor(-.5,11.5,13,2,0,wood);poly([p(-7,WL,10.6),p(-7,WL,12.6),p(-4,WL,12.6)],'#1d3b3b3d');[[-6.6,12.4],[-4.8,12.4]].forEach(([x,z])=>b(x,z,WL-.15,.2,.2,.45,dark));
    for(let x=-6.5;x<6;x+=.65)l([[x,.02,10.55],[x,.02,12.45]],'#6f62552a',.017);
    patch(10.6,12.2,9.4,1.1,'#b3ae93',.018);
    job(1.6,11.4,()=>cafeTable(1.6,11.4));
    [-6.4,-.4,5.6].forEach(x=>job(x,12.3,()=>lanternPost(x,12.3)));[-3.4,2.6].forEach(x=>job(x,12.2,()=>planterBox(x,12.2)));
    job(10.4,11.9,()=>lamp(10.4,11.9));
    job(-16.9,10.9,()=>{person(-16.9,10.9,now,63,false,false,false);l([[-16.6,1.1,10.9],[-15.2,.6,10.4],[-14.9,WL+.02,10.2]],'#d8d2b8',.02);});
    visitors([-3,3],[2,3],[6.5,5.7]);
  } else if(index===1){
    const brick=['#b8876a','#714d40','#986952'],stone=['#d5c1a1','#938270','#b7a58d'],tile=['#b07a63','#6e4a3d','#8f6150'];
    // A whole market square: the boutique's three-storey townhouse, its neighbour, a clock tower and the cobbled
    // square in front with fountain, stalls and a kiosk.
    b(0,.5,-.55,34,25,.55,stone);
    for(let row=0;row<24;row++)for(let col=0;col<32;col++)patch(-16.4+col*1.05+(row%2)*.35,-11.3+row*1.02,.96,.92,(row+col)%3?'#a5a291':'#bbb39e',.012);
    // The neighbouring townhouse: a pale-brick bakery with shuttered windows, window boxes and a tiled gable.
    const pale=['#c9a98a','#7e5e4d','#a88268'],shutter=['#5c6e5f','#3a4a40','#4b5d50'];
    b(-12.2,-5.3,0,7.4,7.4,9.4,pale);
    for(let row=0;row<26;row++){const y=.18+row*.35;l([[-15.85,y,-1.59],[-8.55,y,-1.59]],'#e6cdb455',.02);}
    poly([p(-14.7,0,-1.58),p(-13.6,0,-1.58),p(-13.6,2.4,-1.58),p(-14.7,2.4,-1.58)],'#3b2f28');l([[-14.7,0,-1.57],[-14.7,2.4,-1.57],[-13.6,2.4,-1.57],[-13.6,0,-1.57]],'#dcc294',.04);
    poly([p(-12.6,.8,-1.58),p(-9.6,.8,-1.58),p(-9.6,2.5,-1.58),p(-12.6,2.5,-1.58)],'#f2dfae');l([[-12.6,.8,-1.57],[-12.6,2.5,-1.57],[-9.6,2.5,-1.57],[-9.6,.8,-1.57]],'#5b4a38',.05);
    for(let k=0;k<3;k++){carton(-12.1+k*.9,-1.75,.95,.4);jar(-11.7+k*.9,-1.75,1.6,k);}glow(-11.1,1.6,-1.3,1.2);
    for(let k=0;k<7;k++)b(-13.9+k*.5,-1.1,3.1,.5,1.2,.1,k%2?cream:['#a8555a','#6f3a3d','#8d474b']);
    windowGrid('z',-1.58,-15.3,-9.1,4.1,2,3,1.4,1,1.3,['#3a4a46','#f0dfb0','#3a4a46','#eddaa8'],1);
    [-14,-12.2,-10.4].forEach(x=>{shutters(x,-1.62,4.1,1,1.4,shutter);shutters(x,-1.62,6.8,1,1.4,shutter);flowerBox(x,-1.4,3.95,1.15);});
    b(-9.4,-1.2,3.5,.08,.9,.08,dark);b(-9.4,-1.1,2.75,.06,.75,.7,cream);
    b(-12.2,-5.3,9.4,7.7,7.7,.25,stone);gableRoof(-12.2,-5.3,9.65,7.4,7.4,2.15,tile,.35);b(-9.8,-7,10.6,.8,.8,1.9,brick);b(-9.8,-7,12.5,.95,.95,.12,stone);
    // Corner-townhouse footprint, stone street frontage and a three-storey brick rear wall under a mansard roof.
    floor(0,-1,17,15.8,0,wood);b(0,-8.8,0,17,.36,11.6,brick);b(-8.35,-5.8,0,.3,6,9,brick);
    for(let row=0;row<33;row++){const y=.18+row*.35;l([[-8.25,y,-8.59],[8.4,y,-8.59]],'#c7a98e65',.022);for(let x=-8+(row%2)*.45;x<8.4;x+=.95)l([[x,y,-8.58],[x,y+.34,-8.58]],'#c7a98e55',.02);}
    [-5.6,0,5.6].forEach(x=>{arch(x,-8.54,1,2.4,3);arch(x,-8.54,5.65,2.4,2.8);});
    [-5.6,0,5.6].forEach(x=>flowerBox(x,-8.15,5.1,2.6));
    [-2.8,2.8].forEach(x=>wallArt(x,-8.53,6.05));
    b(0,-8.6,4.65,17.3,.5,.25,stone);b(0,-8.7,9,17.7,.75,.28,stone);
    // Third floor: shuttered sash windows with window boxes, then a stone cornice, terracotta coping and the mansard.
    [-5.6,0,5.6].forEach(x=>{poly([p(x-.8,9.7,-8.6),p(x+.8,9.7,-8.6),p(x+.8,11.3,-8.6),p(x-.8,11.3,-8.6)],'#466c6a');l([[x-.8,9.7,-8.59],[x-.8,11.3,-8.59],[x+.8,11.3,-8.59],[x+.8,9.7,-8.59]],'#ddc7a0',.06);l([[x,9.7,-8.58],[x,11.3,-8.58]],'#c1a577',.04);l([[x-.8,10.5,-8.58],[x+.8,10.5,-8.58]],'#c1a577',.04);shutters(x,-8.62,9.7,1.6,1.6,shutter);flowerBox(x,-8.35,9.55,1.8);});
    b(0,-8.7,11.6,17.7,.75,.3,stone);
    for(let x=-8.4;x<=8.4;x+=.6)b(x,-8.7,11.9,.52,.79,.1,['#bd9271','#805a48','#a17458']);
    poly([p(-8.85,12,-8.33),p(8.85,12,-8.33),p(8.3,13.5,-9.3),p(-8.3,13.5,-9.3)],tile[0]);
    for(let x=-8.4;x<8.4;x+=.55)l([[x,12.05,-8.36],[x-.12,13.45,-9.28]],'#00000018',.02);
    poly([p(8.85,12,-8.33),p(8.85,12,-9.7),p(8.3,13.5,-9.3)],tile[2]);
    b(0,-9.45,13.45,16.6,.6,.14,stone);
    [-3.6,3.6].forEach(x=>{b(x,-9,12,1.4,1,1,brick);poly([p(x-.4,12.15,-8.49),p(x+.4,12.15,-8.49),p(x+.4,12.85,-8.49),p(x-.4,12.85,-8.49)],'#466c6a');l([[x-.4,12.15,-8.48],[x-.4,12.85,-8.48],[x+.4,12.85,-8.48],[x+.4,12.15,-8.48]],'#ddc7a0',.04);gableRoof(x,-9,12.95,1.4,1,.6,tile,.15);});
    [-5,5].forEach(x=>{b(x,-9.3,13,.9,.7,1.3,brick);b(x,-9.3,14.3,1.05,.85,.12,stone);});
    l([[8.15,11.5,-8.35],[8.15,.25,-8.35],[8.55,.12,-8.15]],'#675b48',.1);
    // An iron gate closes the passage between the boutique and the clock tower.
    [8.8,9.7,10.6].forEach(x=>l([[x,0,-8.6],[x,2.3,-8.6]],'#3a3f3a',.06));
    [.5,1.9].forEach(y=>l([[8.8,y,-8.6],[10.6,y,-8.6]],'#3a3f3a',.04));for(let x=9;x<10.6;x+=.3)l([[x,.5,-8.6],[x,2.1,-8.6]],'#3a3f3a',.025);
    l([[8.8,2.3,-8.6],[9.1,2.9,-8.6],[9.7,3.1,-8.6],[10.3,2.9,-8.6],[10.6,2.3,-8.6]],'#6d6a4a',.05);
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
    // The clock tower stands at the corner behind the boutique: sorted as a job so the neighbourhood annex, which is
    // nearer, still lands in front of it.
    job(14.4,-8.2,()=>{
      const tx=12.6,tz=-10,fz=tz+1.61,fx=tx+1.61;
      b(tx,tz,0,3.6,3.6,8.8,stone);b(tx,tz,8.8,4,4,.3,stone);b(tx,tz,9.1,3.2,3.2,2.7,stone);b(tx,tz,11.8,3.6,3.6,.25,stone);
      poly([p(tx-.5,0,fz),p(tx+.5,0,fz),p(tx+.5,1.9,fz),p(tx-.5,1.9,fz)],'#3b2f28');l([[tx-.5,0,fz+.01],[tx-.5,1.9,fz+.01],[tx+.5,1.9,fz+.01],[tx+.5,0,fz+.01]],'#dcc294',.04);
      for(let y=2.6;y<7;y+=2.1)poly([p(tx-.25,y,fz),p(tx+.25,y,fz),p(tx+.25,y+1,fz),p(tx-.25,y+1,fz)],'#2f3d3a');
      const cf=p(tx,7.3,fz);ellipse(cf.x,cf.y,unit*.95,unit*1.1,'#4a4a40');ellipse(cf.x,cf.y,unit*.8,unit*.95,'#efe3c4');
      for(let k=0;k<12;k++){const a=k*Math.PI/6,q=p(tx+Math.sin(a)*.65,7.3+Math.cos(a)*.78,fz+.01);ellipse(q.x,q.y,unit*.04,unit*.04,'#4a4a40');}
      l([[tx,7.3,fz+.01],[tx,7.9,fz+.01]],'#3a3a30',.05);l([[tx,7.3,fz+.01],[tx+.5,7.15,fz+.01]],'#3a3a30',.05);
      const cs=p(fx,7.3,tz);ellipse(cs.x,cs.y,unit*.6,unit*1.1,'#4a4a40');ellipse(cs.x,cs.y,unit*.5,unit*.95,'#efe3c4');l([[fx+.01,7.3,tz],[fx+.01,7.9,tz]],'#3a3a30',.05);l([[fx+.01,7.3,tz],[fx+.01,7.15,tz+.5]],'#3a3a30',.05);
      arch(tx,fz-.01,9.4,1.3,2.1);poly([p(fx+.01,9.5,tz-.45),p(fx+.01,9.5,tz+.45),p(fx+.01,11.4,tz+.45),p(fx+.01,11.4,tz-.45)],'#2f3d3a');
      b(tx,tz,10.2,.5,.5,.6,brass);
      poly([p(tx-1.9,12.05,tz+1.9),p(tx+1.9,12.05,tz+1.9),p(tx,14.9,tz)],'#5e6f65');poly([p(tx+1.9,12.05,tz+1.9),p(tx+1.9,12.05,tz-1.9),p(tx,14.9,tz)],'#48584f');
      l([[tx,14.9,tz],[tx,15.7,tz]],brass[0],.06);poly([p(tx,15.7,tz),p(tx+.75,15.45,tz),p(tx,15.2,tz)],'#c9a45a');
      sconce(tx+1,fz-.44,2.6);
    });
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
    if(level>=5){job(-15,2.2,()=>tree(-15,2.2,1.3));job(10,9.6,()=>planter(10,9.6,1.4,1.4));}
    // The square: a stone fountain, two market stalls, a newsstand, corner lamps and a bollard line along the kerb.
    job(-13,9.2,()=>fountain(-13,9.2,1.9,stone));
    job(-13.5,4,()=>stall(-13.5,4,['#a8555a','#6f3a3d','#8d474b'],2));job(14,4,()=>stall(14,4,['#5d7f8a','#37525b','#4a6a73'],0));
    job(15,9.5,()=>kiosk(15,9.5,['#6d7f6c','#3f5044','#56685a']));
    job(-16,-.5,()=>lamp(-16,-.5));job(15.6,-1.5,()=>lamp(15.6,-1.5));
    [-14,-10,-6,-2,2,6,10,14].forEach(x=>job(x,12.4,()=>bollard(x,12.4)));
    job(-15.5,7,()=>person(-15.5,7,now,64,false,false,true));job(12.6,6.2,()=>person(12.6,6.2,now,65,false,false,false));
    // Enter down the left aisle and exit on the right, clear of the front displays.
    visitors([-3,-1.1],[2.3,-1.1],[7,3.2],[-7,2]);
  } else {
    const silver=['#d6e0db','#7b9190','#abbdb7'],teal=['#699a91','#244c4d','#467774'],tower=['#6f9a94','#2a5052','#4a7a78'];
    // A downtown block: the flagship's glass tower rises behind the atrium, an office block stands beside it, and a
    // two-lane street with a crossing, bus shelter and metro entrance runs along the plaza.
    b(1,0,-.5,34,26,.5,['#bdc7c2','#667978','#95a7a1']);
    patch(1,10.3,33.8,5.4,'#53666a');patch(1,7.55,33.8,.16,'#8f9c95',.028);patch(1,13.05,33.8,.14,'#8f9c95',.028);
    for(let i=0;i<8;i++)patch(-6.3+i*.72,10.3,.4,4.4,'#d6dac8',.025);
    for(let i=-15;i<=17;i+=3)patch(i,10.3,1.6,.09,'#cbd0b4',.026);
    // A long reflecting pool with jets, and a row of flags, mark the plaza's western edge.
    b(-13.2,-5,0,3.4,7.4,.4,silver);poly([p(-14.7,.41,-8.5),p(-11.7,.41,-8.5),p(-11.7,.41,-1.5),p(-14.7,.41,-1.5)],'#7cacaa');
    poly([p(-14.2,.415,-8),p(-13.4,.415,-8),p(-12.4,.415,-2),p(-13.2,.415,-2)],'#a5cfc866');
    for(let k=0;k<4;k++){const z=-7.6+k*1.7,h=.9+Math.sin(now*.003+k)*.15,pts=[];for(let q=0;q<=6;q++){const f=q/6;pts.push([-13.2+(f-.5)*.6,.42+Math.sin(f*Math.PI)*h,z]);}l(pts,'#e6f5ee9a',.04);const ph=(now*.0005+k*.25)%1;ring(-13.2,z,.42,.2+ph*.7,'#dff2e9'+Math.round(80*(1-ph)).toString(16).padStart(2,'0'));}
    glow(-13.2,.5,-5,1.4);
    [-11.8,-10.3,-8.8].forEach((z,i)=>{l([[-15.4,0,z],[-15.4,7,z]],'#c8d3cc',.05);const w=Math.sin(now*.002+i)*.15;poly([p(-15.4,7,z),p(-13.8,6.7+w,z+.15),p(-13.8,5.6+w,z+.15),p(-15.4,5.4,z)],['#7fa870','#e7c76e','#5d7f8a'][i]);});
    floor(0,-2.2,21,16,0,silver);
    for(let x=-10;x<10;x+=1.7)for(let z=-9;z<6;z+=1.7)patch(x+.82,z+.82,1.62,1.62,(Math.floor(x+z)%3===0)?'#c3ccc1':'#d2d7cb');
    // The tower: curtain-wall floors above the atrium roof, a plant room and roof garden, and a beacon mast.
    b(4,-11.65,0,12,2.7,14.5,tower);
    for(let fy=9;fy<14.5;fy+=1.55){l([[-2,fy,-10.29],[10,fy,-10.29]],'#d4e3dc',.05);l([[10.01,fy,-13],[10.01,fy,-10.3]],'#d4e3dc',.05);}
    windowGrid('z',-10.28,-1.8,9.8,9.2,3,8,1.1,1.1,.45,['#dfe9c8','#3d6a6a','#f0e6b6','#3d6a6a','#e6efd0'],2);
    windowGrid('x',10.02,-12.9,-10.4,9.2,3,2,1.1,.9,.45,['#3d6a6a','#e6efd0','#3d6a6a'],1);
    b(4,-11.65,14.5,12.4,3.1,.3,silver);b(0,-11.8,14.8,2.2,1.5,.9,silver);b(7.4,-11.9,14.8,1.4,1.2,1.1,silver);
    l([[9,14.8,-12.2],[9,17.3,-12.2]],'#c8d3cc',.05);const beacon=p(9,17.35,-12.2);ellipse(beacon.x,beacon.y,unit*.1,unit*.1,'#ff9a7a');glow(9,17.35,-12.2,.5);
    for(let x=2;x<7;x+=1.6){const q=p(x,14.8,-11.2);ellipse(q.x,q.y-unit*.45,unit*.5,unit*.4,'#7fa06f');ellipse(q.x,q.y-unit*.7,unit*.34,unit*.28,'#98b47c');}
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
    job(-12.8,2.6,()=>tree(-12.8,2.6,1.35));job(12,3.4,()=>tree(12,3.4,1.2));
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
    // The office block next door is sorted by its near corner so the plaza trees stay in front of it.
    job(18,-2,()=>{
      const office=['#cfc8b8','#6e6a5f','#a29b8c'];
      b(16.4,-7.5,0,3.2,11,11.5,office);
      windowGrid('z',-1.98,15,17.8,3.4,4,2,1.1,.9,.7,['#3d5a5c','#efe4bf','#3d5a5c'],0);
      windowGrid('x',18.02,-12.8,-2.2,3.4,4,6,1.1,1,.7,['#3d5a5c','#3d5a5c','#efe4bf','#3d5a5c'],1);
      poly([p(15,.6,-1.98),p(17.8,.6,-1.98),p(17.8,2.4,-1.98),p(15,2.4,-1.98)],'#f2e3b4');l([[15,.6,-1.97],[15,2.4,-1.97],[17.8,2.4,-1.97],[17.8,.6,-1.97]],'#5a5a4c',.04);
      for(let k=0;k<5;k++)b(15.1+k*.56,-1.6,2.7,.56,.9,.08,k%2?cream:['#5d7f8a','#37525b','#4a6a73']);
      b(16.4,-7.5,11.5,3.5,11.3,.25,silver);b(16.8,-9.5,11.75,1.4,1.4,.8,silver);b(16.6,-4,11.75,.9,.9,.5,silver);
      glow(16.4,1.5,-1.5,1.1);
    });
    // Street life: a bus shelter, a metro entrance under a glass canopy, parked cars and the shop's pylon sign.
    job(-14.2,6.2,()=>busShelter(-14.2,6.2,3));
    job(16.2,6.7,()=>{
      patch(15.2,5.2,2,3,'#1e2a28',.02);for(let k=0;k<5;k++)patch(15.2,4+k*.55,1.7,.5,k%2?'#2b3a37':'#243230',.021);
      [[14.2,3.7,14.2,6.7],[14.2,3.7,16.2,3.7],[16.2,3.7,16.2,6.7]].forEach(([x0,z0,x1,z1])=>{l([[x0,.95,z0],[x1,.95,z1]],'#b4c3bf',.06);l([[x0,.5,z0],[x1,.5,z1]],'#b4c3bf',.035);for(let t=0;t<=1;t+=.25)l([[x0+(x1-x0)*t,0,z0+(z1-z0)*t],[x0+(x1-x0)*t,.95,z0+(z1-z0)*t]],'#b4c3bf',.045);});
      [[14.3,3.8],[16.1,3.8]].forEach(([x,z])=>l([[x,0,z],[x,2.6,z]],'#4d5b56',.06));
      poly([p(14.1,2.6,3.6),p(16.3,2.6,3.6),p(16.3,2.6,6.9),p(14.1,2.6,6.9)],'#b9d8ce40');l([[14.1,2.6,3.6],[16.3,2.6,3.6],[16.3,2.6,6.9],[14.1,2.6,6.9],[14.1,2.6,3.6]],'#c8d3cc',.05);
      b(16.9,7.1,0,.4,.4,2.8,teal);b(16.9,7.1,2.8,.8,.3,.8,['#f2dc8e','#b09a55','#d2bb70']);glow(16.9,3.2,7.1,.7);
    });
    job(6,12.1,()=>car(6,12.1,['#e2cc6c','#9c8a3e','#c3ac55']));job(-9.5,12.1,()=>car(-9.5,12.1,['#a9b7b9','#5a6c70','#83979a']));
    job(-15.6,.6,()=>pylon(-15.6,.6,teal));
    job(-15,9.4,()=>person(-15,9.4,now,66,false,false,true));job(15,8.3,()=>person(15,8.3,now,67,true,false,false));
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
  // After dark the main map lights the branch with the same deferred light map, from the fixtures registered by glow().
  if(api.night)api.night(fixtures,lightColor,theme.focus);
}
