import {characterPose,characterHand} from './character-animation.js';
// Native geometry bridge. These are world-space meshes/instances, never a Canvas image.
// The simulation and fixed projection remain authoritative in main.js. Each packet is
// acknowledged before another is submitted, bounding memory if the GPU is interrupted.
export const NATIVE_STRIDE = 24;
export function colorRGBA(value, alpha = 1) {
  if (typeof value !== 'string') return null;
  if(/^#[a-f\d]{3,4}$/i.test(value))value='#'+value.slice(1).split('').map(c=>c+c).join('');
  const hex = /^#([a-f\d]{6})([a-f\d]{2})?$/i.exec(value);
  if (hex) return [parseInt(hex[1].slice(0,2),16)/255,parseInt(hex[1].slice(2,4),16)/255,parseInt(hex[1].slice(4,6),16)/255,alpha*(hex[2]?parseInt(hex[2],16)/255:1)];
  const rgb = /^rgba?\(([^)]+)\)$/.exec(value);
  if (!rgb) return null;
  const a = rgb[1].split(',').map(Number);
  return [a[0]/255,a[1]/255,a[2]/255,alpha*(a[3]??1)];
}
export function nativeProjection(p, camera) {
  const c=Math.cos(camera.angle),s=Math.sin(camera.angle);
  return [camera.x+(p[0]*c-p[2]*s)*camera.unit,camera.y+((p[0]*s+p[2]*c)*.5-p[1])*camera.unit];
}
// Convex boards are clipped in world space; a Canvas clip cannot clip native geometry.
export function herringboneBoards(floor){
  const rear=floor.z-floor.d/2,front=floor.z+floor.d/2,left=-floor.w/2,right=floor.w/2,boards=[];
  const clip=(poly,bound,keepAbove)=>{const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],inside=p=>keepAbove?p[1]>=bound:p[1]<=bound,ia=inside(a),ib=inside(b);if(ia)out.push(a);if(ia!==ib){const t=(bound-a[1])/(b[1]-a[1]);out.push([a[0]+(b[0]-a[0])*t,bound])}}return out};
  for(let col=0,x=left;x<right;col++,x+=1.15){const end=Math.min(right,x+1.15),dir=col%2?-1:1,lo=(dir>0?rear-end:rear+x)-.56,hi=(dir>0?front-x:front+end)+.56;
    for(let b=lo;b<hi;b+=.56){let poly=[[x,dir*x+b],[end,dir*end+b],[end,dir*end+b+.56],[x,dir*x+b+.56]];poly=clip(clip(poly,rear,true),front,false);if(poly.length>=3)boards.push(poly)}
  }return boards;
}
export function createNativeMap(env = window) {
  const handler=env.canopyNativeMapAvailable&&env.webkit?.messageHandlers?.canopyMap;
  if(!handler)return null;
  let active=false,enabled=true,flight=0,sequence=0,ack=0,emission=0,packet,points=[],records=[];
  const colors=new Map();
  const rgba=(fill,alpha)=>{let c=colors.get(fill);if(c===undefined){c=colorRGBA(fill);colors.set(fill,c)}return c?[c[0],c[1],c[2],c[3]*alpha]:null};
  env.canopyNativeMapAck=(id)=>{if(enabled&&id===sequence){const first=ack===0;flight=0;ack=id;env.document?.documentElement?.classList.add('native-map-ready');if(first)env.dispatchEvent?.(new env.Event('resize'))}};
  env.canopyNativeMapRetry=()=>{flight=0};
  env.canopyNativeMapFailed=()=>{enabled=false;active=false;flight=0;env.document?.documentElement?.classList.remove('native-map-ready');env.dispatchEvent?.(new env.Event('resize'))};
  function add(type,p,size,fill,alpha=1,q=[0,0,0,1],extra=[0,0,0,0]) {
    const c=rgba(fill,alpha);if(!c||c[3]<.025||![...p,...size,...q].every(Number.isFinite))return;
    // Small transparent marks are painted detail, not shadow-casting solids.
    const metal=c[0]>.48&&c[0]>c[2]*1.25&&c[1]>c[2]*1.15?.28:0;
    records.push([...p,type,...size,emission,...q,...c,...extra,.65,metal,0,0]);
  }
  const api={
    get active(){return active&&enabled}, get enabled(){return enabled},
    available(now){if(flight&&now-flight>2500){env.canopyNativeMapFailed();return true}return !flight},
    begin(meta){if(!enabled)return;active=true;packet=meta;records=[];points=[];emission=0},
    project(p,x,y,z){if(!active)return p;p.world=[x,y,z];points.push(p);if(points.length>32)points.shift();return p},
    lit(draw){const old=emission;emission=1;try{draw(1)}finally{emission=old}},
    box(x,z,y,w,d,h,fill,alpha=1){if(w<=0||d<=0||h<=0)return;add(0,[x,y+h/2,z],[w,h,d],fill,alpha)},
    sphere(x,y,z,w,h,d,fill,alpha=1,q){add(1,[x,y,z],[w,h,d],fill,alpha,q)},
    cylinder(x,y,z,r,h,fill,alpha=1){add(2,[x,y,z],[r*2,h,r*2],fill,alpha)},
    line(ps,fill,weight,alpha=1){for(let i=1;i<ps.length;i++){
      const a=ps[i-1],b=ps[i],dx=b[0]-a[0],dy=b[1]-a[1],dz=b[2]-a[2],len=Math.hypot(dx,dy,dz);if(len<.0001)continue;
      const v=[dx/len,dy/len,dz/len],qw=1+v[1],n=Math.hypot(v[2],v[0],qw);
      const q=n<.0001?[1,0,0,0]:[v[2]/n,0,-v[0]/n,qw/n];
      add(2,a.map((x,k)=>(x+b[k])/2),[Math.max(.012,weight),len,Math.max(.012,weight)],fill,alpha,q);
    }},
    poly(ps,fill,alpha=1){if(ps.length<3||ps.some(p=>!p.world))return;const c=rgba(fill,alpha);if(!c)return;
      // Ear clipping on the existing projection also handles concave arch surrounds.
      const ids=ps.map((_,i)=>i);let area=0;ps.forEach((p,i)=>{const n=ps[(i+1)%ps.length];area+=p.x*n.y-n.x*p.y});const sign=area>=0?1:-1;
      const cross=(a,b,c)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
      let guard=ps.length*ps.length;
      while(ids.length>=3&&guard-->0){let found=false;
        for(let j=0;j<ids.length;j++){const a=ids[(j+ids.length-1)%ids.length],b=ids[j],d=ids[(j+1)%ids.length];if(cross(ps[a],ps[b],ps[d])*sign<=.000001)continue;
          if(ids.some(k=>k!==a&&k!==b&&k!==d&&cross(ps[a],ps[b],ps[k])*sign>=-0.000001&&cross(ps[b],ps[d],ps[k])*sign>=-0.000001&&cross(ps[d],ps[a],ps[k])*sign>=-0.000001))continue;
          add(3,ps[a].world,ps[b].world,fill,alpha,[...ps[d].world,1]);ids.splice(j,1);found=true;break;
        }if(!found)break;
      }
    },
    point(x,y){let best=null,dist=Infinity;for(let i=points.length-1;i>=0;i--){const p=points[i],d=Math.hypot(p.x-x,p.y-y);if(d<dist){dist=d;best=p}if(d<.001)break}if(!best||dist>packet.unit*1.8)return null;
      const dx=(x-best.x)/packet.unit,dy=(y-best.y)/packet.unit;
      return [best.world[0]+dx*Math.cos(packet.angle),best.world[1]-dy,best.world[2]-dx*Math.sin(packet.angle)];
    },
    ellipse(x,y,rx,ry,fill,alpha=1){const c=rgba(fill,alpha);if(!c||c[3]<.34)return;const p=api.point(x,y);if(!p)return;
      const w=rx*2/packet.unit,h=ry*2/packet.unit;
      if(ry<rx*.56)add(2,p,[w,.018,h*2],fill,alpha,[0,Math.sin(packet.angle/2),0,Math.cos(packet.angle/2)]);
      else add(1,p,[w,Math.max(.025,h),Math.min(w,h)*.65],fill,alpha);
    },
    leaf(px,py,len,angle,fill,alpha=1){
      const origin=api.point(px,py);if(!origin)return;
      const c=Math.cos(packet.angle),s=Math.sin(packet.angle),ca=Math.cos(angle),sa=Math.sin(angle),scale=len/packet.unit;
      const ps=[[0,0],[.3,-.19],[.7,-.16],[1,0],[.7,.16],[.3,.19]].map(([along,across])=>{
        const dx=(along*ca-across*sa)*scale,dy=(along*sa+across*ca)*scale;
        return {x:px+dx*packet.unit,y:py+dy*packet.unit,world:[origin[0]+dx*c,origin[1]-dy,origin[2]-dx*s]};
      });api.poly(ps,fill,alpha);
    },
    floor(floor,y,alpha=1){
      api.box(0,floor.z,y-.24,floor.w,floor.d,.24,'#c9a97e',alpha);
      for(const [i,board] of herringboneBoards(floor).entries()){
        const vertices=board.map(([x,z])=>[x,y+.012,z]);
        for(let j=1;j<vertices.length-1;j++)add(3,vertices[0],vertices[j],['#c2a277','#ccad83','#c6a57b'][i%3],alpha,[...vertices[j+1],1]);
        api.line([...vertices,vertices[0]],'#6d543a2e',.012,alpha);
      }
    },
    pendant(x,z,soffitY,alpha=1){
      const globeY=soffitY-1.05;
      api.cylinder(x,soffitY-.025,z,.11,.05,'#b7a16d',alpha);
      api.line([[x,soffitY-.05,z],[x,globeY+.3,z]],'#c9ab6a',.028,alpha);
      const old=emission;emission=.55;api.sphere(x,globeY,z,.62,.62,.62,'#fff3d2',alpha);emission=old;
    },
    arch(x,z,y,half,rise,alpha=1){
      // An extruded curved rail, not overlapping capped cylinders. Separate the light inlay from the wood.
      const triangle=(a,b,c,color)=>add(3,a,b,color,alpha,[...c,1]);
      const quad=(a,b,c,d,color)=>{triangle(a,b,c,color);triangle(a,c,d,color)};
      const point=(t,offset,depth)=>{const nx=Math.cos(t)/half,ny=Math.sin(t)/rise,n=Math.hypot(nx,ny);return[x+Math.cos(t)*half+nx/n*offset,y+Math.sin(t)*rise+ny/n*offset,z+depth]};
      for(let i=0;i<64;i++){
        const a=i*Math.PI/64,b=(i+1)*Math.PI/64;
        quad(point(a,-.1,.095),point(a,.1,.095),point(b,.1,.095),point(b,-.1,.095),'#bda979');
        quad(point(a,.1,-.095),point(a,-.1,-.095),point(b,-.1,-.095),point(b,.1,-.095),'#a38c64');
        for(const edge of [-.1,.1])quad(point(a,edge,-.095),point(a,edge,.095),point(b,edge,.095),point(b,edge,-.095),'#a38c64');
        const old=emission;emission=1;quad(point(a,-.07,.105),point(a,-.04,.105),point(b,-.04,.105),point(b,-.07,.105),'#ffe9bc');emission=old;
      }
      for(const t of [0,Math.PI])quad(point(t,-.1,-.095),point(t,.1,-.095),point(t,.1,.095),point(t,-.1,.095),'#a38c64');
    },
    fan(x,z,y,time,alpha=1){
      api.box(x,z,y-1.18,2.36,.24,2.36,'#a8b6a6',alpha);
      const disk=(radius,depth,color)=>add(2,[x,y,z+depth],[radius*2,.025,radius*2],color,alpha,[Math.SQRT1_2,0,0,Math.SQRT1_2]);
      disk(1.055,.14,'#93a99a');disk(.96,.16,'#1d3028');disk(.88,.18,'#30483a');
      const turn=time*Math.PI*2/26000;
      for(let i=0;i<4;i++){
        const a=turn+i*Math.PI/2,c=Math.cos(a),s=Math.sin(a);
        const ps=[[.12,-.07],[.32,-.48],[.71,-.64],[.87,-.31],[.87,.14],[.56,.34],[.38,.08],[.12,.09]].map(([dx,dy])=>{
          const xx=dx*c-dy*s,yy=dx*s+dy*c,world=[x+xx,y-yy,z+.21],screen=nativeProjection(world,packet);return{x:screen[0],y:screen[1],world};
        });api.poly(ps,'#a6baa5',alpha);
      }
      for(const r of [.38,.65,.9]){const ps=[];for(let i=0;i<=40;i++){const a=i*Math.PI/20;ps.push([x+Math.cos(a)*r,y+Math.sin(a)*r,z+.25])}api.line(ps,'#bac9b3',.014,alpha)}
      for(let i=0;i<8;i++){const a=i*Math.PI/4;api.line([[x+Math.cos(a)*.18,y+Math.sin(a)*.18,z+.25],[x+Math.cos(a)*.95,y+Math.sin(a)*.95,z+.25]],'#bac9b3',.014,alpha)}
      disk(.2,.28,'#93a99a');
      for(const sx of [-1,1])for(const sy of [-1,1])api.sphere(x+sx*1.015,y+sy*1.015,z+.14,.07,.07,.025,'#394f42',alpha);
    },
    plant(x,z,y,size,strain,growth=1,alpha=1,time=0){
      // Terracotta pot with a lip and a mound of soil.
      api.cylinder(x,y+.17,z,.27,.34,'#bf815e',alpha);api.cylinder(x,y+.35,z,.3,.07,'#dfa37c',alpha);api.cylinder(x,y+.385,z,.235,.02,'#403d29',alpha);
      api.sphere(x,y+.4,z,.4,.09,.4,'#4a3f2d',alpha);
      const sway=Math.sin(time*.0013+x+z)*.035,top=[x+sway,y+.5+size,z];
      const shade=(hex,f)=>'#'+[1,3,5].map(i=>Math.min(255,Math.round(parseInt(hex.slice(i,i+2),16)*f)).toString(16).padStart(2,'0')).join('');
      // Yaw about Y, then tilt about the leaflet's own Z, so a long thin ellipsoid can lie along any bearing and pitch.
      const orient=(yaw,pitch)=>{const sy=Math.sin(yaw/2),cy=Math.cos(yaw/2),sz=Math.sin(pitch/2),cz=Math.cos(pitch/2);return [sy*sz,sy*cz,cy*sz,cy*cz]};
      const stem=[[x,y+.4,z],[x+sway*.4,y+.5+size*.5,z],top];
      api.line(stem,'#5f8a47',.045,alpha);
      const tones=['#5f9847','#7aa650','#4b7a68','#4d8477'],tone=tones[(strain??0)%4];
      const detailed=packet.unit>=16,count=detailed?5:3,offsets=detailed?[-.9,-.45,0,.45,.9]:[-.6,0,.6],lengths=detailed?[.55,.8,1,.8,.55]:[.72,1,.72];
      const g=Math.max(.3,Math.min(1,growth??1)),tiers=2+Math.round(g*2),spread=[1,.88,.72,1.2][(strain??0)%4];
      const fan=(node,bearing,pitch,length,color)=>{
        // A short stalk, then leaflets radiating from its end like a hand.
        const stalk=length*.32,bx=node[0]+Math.cos(bearing)*stalk,by=node[1]+Math.sin(pitch)*stalk*.6,bz=node[2]+Math.sin(bearing)*stalk;
        api.line([node,[bx,by,bz]],shade(color,.85),.02,alpha);
        for(let i=0;i<count;i++){
          const yaw=bearing+offsets[i],len=length*lengths[i],cp=Math.cos(pitch),half=len/2;
          api.sphere(bx+Math.cos(yaw)*cp*half,by+Math.sin(pitch)*half,bz+Math.sin(yaw)*cp*half,len,.022,len*.26,i===Math.floor(count/2)?shade(color,1.14):shade(color,i%2?.94:1.04),alpha,orient(-yaw,pitch));
        }
      };
      for(let t=0;t<tiers;t++){
        const level=(t+.4)/tiers*.82,node=[x+sway*level,y+.5+size*level,z],reach=size*(.56-level*.27)*spread;
        for(let k=0;k<2;k++){
          const bearing=t*Math.PI/2+k*Math.PI+x*.9+z*.6,pitch=.3-.62*(1-level);
          fan(node,bearing,pitch,reach,shade(tone,.78+level*.42));
        }
        // Small buds in the upper nodes once the plant is grown.
        if(strain!==undefined&&g>.6&&t>=tiers-2){
          const bud=['#b5cc7a','#d5b36b','#b59bc8','#92bdb3'][strain%4];
          for(let k=0;k<2;k++){const a=t*Math.PI/2+k*Math.PI+.8;api.sphere(node[0]+Math.cos(a)*.09,node[1]+.05,node[2]+Math.sin(a)*.09,.11,.17,.11,k?shade(bud,.86):bud,alpha)}
        }
      }
      // Crown: a crowning fan of leaves, and the main cola on strains that flower.
      fan(top,x*1.7,.95,size*.3*spread,shade(tone,1.25));fan(top,x*1.7+Math.PI,.95,size*.3*spread,shade(tone,1.2));
      if(strain!==undefined&&g>.6){
        const bud=['#b5cc7a','#d5b36b','#b59bc8','#92bdb3'][strain%4],s=.12+(g-.6)*.22;
        [[0,.55,1],[.32,.9,.82],[.62,1.2,.62]].forEach(([lift,,f],i)=>api.sphere(top[0],top[1]+lift*s*1.6,top[2],s*1.15*f,s*1.5*f,s*1.15*f,i%2?shade(bud,.86):shade(bud,1.1),alpha));
        if(detailed)for(const a of [.7,2.6])api.line([[top[0]+Math.cos(a)*s*.35,top[1]+s*.7,top[2]+Math.sin(a)*s*.35],[top[0]+Math.cos(a)*s*.85,top[1]+s*1.15,top[2]+Math.sin(a)*s*.85]],'#e8a25f',.014,alpha);
      }else api.sphere(top[0],top[1]+.05,top[2],.1,.2,.1,'#abd17a',alpha);
    },
    jar(x,z,y,strain=0,alpha=1){api.cylinder(x,y+.26,z,.22,.5,'#6e9779',alpha);api.cylinder(x,y+.58,z,.24,.075,'#d9bc7c',alpha);api.cylinder(x,y+.33,z,.224,.13,['#aacb85','#ddbc75','#baa1cf','#8ebcbb'][strain%4],alpha)},
    person(x,z,y,id,employee,bag,gait,now,alpha=1){
      if(employee){
        const kinds=Array.isArray(env.canopyNativeCharacterKinds)?env.canopyNativeCharacterKinds:[];
        const staff=[['GreenMan',16],['GreenWoman',17],['GrayEmployee',18],['DarkHairedEmployee',19],['YoungEmployee',20]].filter(([,kind])=>kinds.includes(kind));
        const selected=gait?.role==='security'?(kinds.includes(15)?['Security',15]:null):staff[Math.abs(id)%staff.length];
        if(selected){
          const [name,kind]=selected;
          const pose=characterPose(gait,now,id,name),heading=gait?.heading??packet.angle,q=[0,Math.sin(heading/2),0,Math.cos(heading/2)],scale=1.08;
          add(kind,[x,y,z],[scale,scale,scale],'#ffffff',alpha,q,[pose.idle,pose.walk,pose.blend,0]);return;
        }
      }
      const names=['TieDye','Caramel','Beanie','Cream','Bearded','Chef','Colorful','Blazer','Office','Plaid','Utility'];
      const available=Array.isArray(env.canopyNativeCharacterKinds)?env.canopyNativeCharacterKinds:[env.canopyNativeCharacterAvailable&&4,env.canopyNativeCaramelAvailable&&5,env.canopyNativeBeanieAvailable&&6,env.canopyNativeCreamAvailable&&7].filter(Boolean);
      const imported=available.filter(kind=>kind>=4&&kind<=14).map(kind=>[names[kind-4],kind]);
      if(!employee&&imported.length){
        const [name,kind]=imported[Math.abs(id)%imported.length],pose=characterPose(gait,now,id,name),heading=gait?.heading??packet.angle,q=[0,Math.sin(heading/2),0,Math.cos(heading/2)],scale=1.08;
        add(kind,[x,y,z],[scale,scale,scale],'#ffffff',alpha,q,[pose.idle,pose.walk,pose.blend,0]);
        if(bag){
          const hand=characterHand(pose,name).map(v=>v*scale),c=Math.cos(heading),s=Math.sin(heading),hx=x+hand[0]*c+hand[2]*s,hy=y+hand[1],hz=z-hand[0]*s+hand[2]*c;
          add(0,[hx,hy-.3,hz],[.3,.38,.22],'#d5b580',alpha,q);
          const point=(dx,dy,dz=0)=>[hx+dx*c+dz*s,hy+dy,hz-dx*s+dz*c];
          api.line([point(-.1,-.11),point(-.1,0),point(.1,0),point(.1,-.11)],'#9c8052',.023,alpha);
          add(0,point(0,-.3,.115),[.17,.19,.01],gait?.bagColor||'#496f50',alpha,q);
        }return;
      }
      // Keep the Canvas character identities, but model their details in world space.
      const identity=gait?.identity??id,style=((id%20)+20)%20;
      const pick=(palette,salt)=>{let n=Math.imul(identity+1,salt)>>>0;n=Math.imul(n^(n>>>16),0x45d9f3b)>>>0;return palette[((n^(n>>>16))>>>0)%palette.length]};
      let skin=pick(['#e9b28e','#bd8158','#754b32','#f0c9a0','#a66b48','#d6a17d','#604333'],127);
      let hair=pick(['#282521','#b66c38','#211f20','#d9b775','#513b28','#795340','#9c8773','#c3beb0'],311);
      const shirt=employee?'#e5e8cf':pick(['#8eb7be','#c96b60','#315d6b','#daa951','#587c85','#b45d65','#718b68','#dddcc9','#ce865b','#775d88','#496a59','#b899a6','#8192b3','#bc784d','#9ba97a','#4b5059'],733);
      const pants=employee?'#294b3c':pick(['#345767','#343632','#253d49','#93754d','#536758','#706174','#b2a183','#4d647c'],997);
      const accent=pick(['#a87955','#789084','#9b6658','#627e95','#9a789e','#c8996a'],1297);
      const seedTech=employee&&id===0,expressive=!employee&&style===8;
      if(seedTech){skin='#e9b28e';hair='#b66c38'}
      if(!employee&&style===18)hair=pick(['#b5b3a5','#ded5bf','#8f9390'],311);
      if(!employee&&style===19)hair=pick(['#638f91','#b17c94','#9983b0','#bf8967'],311);
      if(expressive)hair=pick(['#ac83b5','#648f9c','#bf819d','#aaad72'],311);
      const working=employee&&id<6,activity=working?(gait?.workActivity??0):0,cycle=gait?.workCycle??.5;
      const amount=gait?.amount??0,phase=gait?.phase??now*.007+id,step=Math.sin(phase)*amount;
      const bob=Math.cos(phase*2)*.022*amount,lean=Math.max(-.045,Math.min(.045,gait?.lean||0));
      // A shallow, camera-facing body keeps small accessories readable at map scale.
      const a=packet.angle,c=Math.cos(a),s=Math.sin(a),q=[0,Math.sin(a/2),0,Math.cos(a/2)];
      const p=(dx,h,d=0)=>[x+(dx+lean*Math.max(0,h-.15))*c+d*s,y+h+bob,z-(dx+lean*Math.max(0,h-.15))*s+d*c];
      const oval=(dx,h,d,w,ht,depth,fill)=>add(1,p(dx,h,d),[w,ht,depth],fill,alpha,q);
      const block=(dx,h,d,w,ht,depth,fill)=>add(0,p(dx,h,d),[w,ht,depth],fill,alpha,q);
      const line=(points,fill,width)=>api.line(points.map(v=>p(...v)),fill,width,alpha);
      const ring=(dx,h,d,rx,ry,fill,width)=>{const pts=[];for(let i=0;i<=12;i++){const t=i*Math.PI/6;pts.push([dx+Math.cos(t)*rx,h+Math.sin(t)*ry,d])}line(pts,fill,width)};
      const longHair=seedTech||!employee&&[2,3,6,12,14,17].includes(style);
      if(longHair)oval(0,1.48,-.1,.5,.79,.33,hair);
      for(const side of [-1,1]){
        const stride=step*side*.13,foot=side*.11+stride,fy=.065+Math.max(0,side*step)*.055;
        line([[side*.105,.76,0],[side*.11+stride*.4,.4,0],[foot,fy+.04,.03]],expressive?skin:pants,.14);
        if(expressive)line([[side*.105,.78,0],[side*.11+stride*.3,.53,0]],pants,.19);
        block(foot+.035,fy,.09,.24,.12,.32,'#242c2c');block(foot+.035,fy-.045,.09,.24,.025,.33,'#c6cfbf');
        const swing=-side*step*.1;
        const hand=working?(side===1?[.28+activity*(-.16+cycle*.12),.79+activity*(.43+cycle*.15),.16]:[-.28+activity*.23,.79+activity*.43,.16]):bag&&side===1?[.44,1.1+step*.035,.12]:[side*.28,.79+swing,.02];
        line([[side*.245,1.28,0],[side*.275,1.04+swing,.01],hand],skin,.105);
        line([[side*.24,1.27,0],[side*.265,1.11+swing,0]],shirt,.16);
      }
      block(0,1.05,0,.45,.64,.3,shirt);
      if(expressive){block(0,.94,.015,.4,.25,.31,skin);block(0,.8,0,.44,.12,.32,pants)}
      if(!employee&&[3,6,12,17].includes(style)){
        block(0,.87,0,.49,.35,.34,shirt);block(0,.69,0,.56,.11,.36,shirt);
      }
      if(!employee&&[7,14].includes(style))for(let i=0;i<4;i++)block(0,1.25-i*.13,.157,.446,.055,.014,'#2b3835');
      if(!employee&&[2,9,11,16,18].includes(style)){
        block(0,1.05,.16,.09,.56,.018,'#e5dfca');
        for(let i=0;i<3;i++)oval(.09,1.2-i*.13,.175,.033,.033,.02,'#d9d4b3');
      }
      if(!employee&&style===10)for(let i=0;i<3;i++)block(-.18+i*.055,1.04,.16,.022,.52,.018,'#e2dcca');
      if(!employee&&style===15){line([[-.12,1.32,.17],[0,1.04,.18],[.12,1.32,.17]],'#ddbf91',.045);block(0,1.29,.17,.32,.1,.04,'#ddbf91')}
      if(!employee&&style===13){line([[-.13,1.3,.18],[.16,.87,.18]],'#d1b386',.045);block(.17,.87,.2,.22,.22,.1,'#887051')}
      if(employee){block(0,1.01,.17,.34,.56,.035,seedTech?'#7a9c66':'#527e60');for(const side of [-1,1])line([[side*.14,1.34,.17],[side*.12,1.16,.195]],'#a9bb92',.035);block(0,.95,.2,.18,.12,.02,'#41674f')}
      if(working&&activity>.05){
        const hx=.28+activity*(-.16+cycle*.12),hy=.79+activity*(.43+cycle*.15);
        if(id===0)block(hx+.02,hy+.03,.19,.16,.2,.1,'#e0c590');
        if(id===1){block(hx+.035,hy+.04,.19,.23,.2,.16,'#88aaa0');line([[hx+.12,hy+.08,.2],[hx+.25,hy+.15,.2]],'#b9d2c0',.04);if(!gait?.still&&cycle>.35)for(let i=0;i<3;i++){const fall=((gait?.workTime||0)*.002+i/3)%1;oval(hx+.25+fall*.1,hy+.15-fall*.38,.2,.03,.06,.03,'#bedfd5')}}
        if(id===2){const blade=.015+cycle*.075;line([[hx-.08,hy+blade,.2],[hx+.14,hy-blade,.2]],'#dbe4d8',.035);line([[hx-.08,hy-blade,.2],[hx+.14,hy+blade,.2]],'#dbe4d8',.035)}
        if(id===3||id===5){block(.02,1.14,.24,.22,.28,.12,'#c9ac77');line([[-.04,1.29,.24],[-.04,1.36,.24],[.08,1.36,.24],[.08,1.29,.24]],'#e6d1a7',.025)}
        if(id===4)block(hx+.04,hy+.03,.21,.16,.1,.02,'#e5e8d2');
      }
      oval(0,1.4,0,.14,.22,.16,skin);oval(0,1.57,0,.42,.48,.35,skin);
      for(const side of [-1,1])oval(side*.205,1.54,0,.075,.12,.1,skin);
      oval(0,1.77,-.025,.46,.23,.39,hair);oval(-.14,1.69,.1,.15,.24,.14,hair);
      if(longHair)oval(-.22,1.47,.015,.14,.61,.25,hair);
      if(!employee&&[1,10].includes(style))for(let i=0;i<9;i++){const t=i*Math.PI/8;oval(Math.cos(t)*.22,1.7+Math.sin(t)*.2,-.02,.19,.21,.29,hair)}
      if(!employee&&[5,14].includes(style))oval(-.16,1.94,-.03,style===14?.32:.24,.28,.26,hair);
      if(!employee&&[11,18].includes(style)){oval(.02,1.4,.13,.32,.2,.18,hair);block(.02,1.49,.182,.22,.04,.035,hair)}
      if((employee&&!seedTech)||!employee&&[0,13,16].includes(style)){
        const cap=employee?'#527b69':accent;oval(0,1.83,0,.48,style===13?.32:.22,.4,cap);
        block(style===13?0:.12,1.74,.16,style===13?.5:.32,.055,.24,cap);
      }
      if(!employee&&[4,9,15,18].includes(style)){
        for(const side of [-1,1])ring(side*.105,1.58,.18,.085,.062,'#34565c',.025);
        line([[-.025,1.58,.184],[.025,1.58,.184]],'#34565c',.024);
      }
      if(!employee&&[12,17].includes(style))for(let i=0;i<5;i++)oval(-.12+i*.06,1.31-Math.sin(i*Math.PI/4)*.06,.18,.042,.044,.03,'#ead6a2');
      if(expressive)ring(.225,1.45,.045,.045,.065,'#ecd496',.022);
      if(!employee&&[3,6].includes(style))oval(.06,1.41,.166,.064,.028,.025,'#b96356');
      if(bag){const h=.78+step*.035;block(.45,h,.13,.34,.43,.26,'#d5b580');block(.45,h,.268,.19,.2,.014,gait?.bagColor||'#496f50');line([[.34,h+.22,.13],[.34,h+.33,.13],[.56,h+.33,.13],[.56,h+.22,.13]],'#9c8052',.027);line([[.45,h-.06,.28],[.45,h+.06,.28]],'#d5dfaf',.022);for(const side of [-1,1])line([[.45,h,.28],[.45+side*.055,h+.055,.28]],'#d5dfaf',.025)}
    },
    finish(){if(!active)return;active=false;if(!enabled)return;
      // Group by mesh and opacity; translucent objects are sorted back to front.
      const c=Math.cos(packet.angle),s=Math.sin(packet.angle),depth=r=>(r[0]*s+r[2]*c)*.894+r[1]*.447;
      records.sort((a,b)=>{const ta=a[15]<.98,tb=b[15]<.98;return ta!==tb?ta?1:-1:ta?depth(a)-depth(b):a[3]-b[3]});
      const floats=new Float32Array(records.length*NATIVE_STRIDE);records.forEach((r,i)=>floats.set(r,i*NATIVE_STRIDE));
      const bytes=new Uint8Array(floats.buffer);let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
      flight=performance.now();sequence++;env.__canopyNativeMapStats={instances:records.length,bytes:bytes.length,sequence,ack};
      try{handler.postMessage({...packet,version:1,id:sequence,data:btoa(binary)})}catch(e){env.canopyNativeMapFailed()}
    }
  };return api;
}
