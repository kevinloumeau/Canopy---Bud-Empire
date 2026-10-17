const fs=require('node:fs/promises'),path=require('node:path'),crypto=require('node:crypto');
const sharp=require('/Users/kevinloumeau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const id=process.argv[2],headCut=Number(process.argv[3]),W=Number(process.argv[4]||1024),H=1536;
const waistInput=Number(process.argv[5]||0);
const dir=path.join(__dirname,id),name=i=>`${id}.walk.empty.${String(i).padStart(2,'0')}.back-right.png`;
function headBounds(data,w,h,cut){
 let top=h, xs=[];
 for(let y=10;y<cut-30;y++)for(let x=Math.floor(w*.15);x<Math.floor(w*.85);x++)if(data[(y*w+x)*4+3]>128){top=Math.min(top,y);break;}
 for(let y=top+25;y<cut-50;y++){
 let l=w,r=0;
 for(let x=Math.floor(w*.15);x<Math.floor(w*.85);x++)if(data[(y*w+x)*4+3]>128){l=Math.min(l,x);r=x;}
 if(r>l)xs.push([l,r]);
 }
 const mid=a=>a.sort((a,b)=>a-b)[Math.floor(a.length/2)];
 const l=mid(xs.map(x=>x[0])),r=mid(xs.map(x=>x[1]));return {top,cx:(l+r)/2,width:r-l};
}
function colorAt(data,w,y,cx){
 const v=[0,0,0];let n=0;
 for(let yy=Math.round(y)-3;yy<=Math.round(y)+3;yy++)for(let x=Math.round(cx)-18;x<=Math.round(cx)+18;x++){
 const p=(yy*w+x)*4;if(p>=0&&p<data.length&&data[p+3]>128){for(let c=0;c<3;c++)v[c]+=data[p+c];n++;}}
 return v.map(a=>a/Math.max(n,1));
}
function matchWaist(master,mw,target,tw,waist,mcx,tcx){
 const offsets=[-30,-20,-10,0,10,20,30];const ref=offsets.map(d=>colorAt(master,mw,waist+d,mcx));
 let best=waist,error=Infinity;
 for(let y=waist-70;y<=waist+70;y++){
 let e=0;offsets.forEach((d,k)=>{const v=colorAt(target,tw,y+d,tcx);for(let c=0;c<3;c++)e+=(v[c]-ref[k][c])**2;});
 if(e<error){error=e;best=y;}}
 return best;
}
async function main(){
 await fs.mkdir(path.join(dir,'frames'),{recursive:true});
 const src0=path.join(dir,'raw',name(0));const meta0=await sharp(src0).metadata();
 const cut=Math.round(headCut*H/meta0.height),joinEnd=cut+32;
 const ref=await sharp(src0).resize({height:H}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 const bounds0=headBounds(ref.data,ref.info.width,H,cut),targetX=W*.52;
 const waist=waistInput?Math.round(waistInput*H/meta0.height):0;
 const all=[],checks=[],panels=[],atl=[];let master;
 for(let i=0;i<8;i++){
 const src=path.join(dir,'raw',name(i));
 const base=await sharp(src).resize({height:H}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 const bd=headBounds(base.data,base.info.width,H,cut);
 const matchedWaist=waist?matchWaist(ref.data,ref.info.width,base.data,base.info.width,waist,bounds0.cx,bd.cx):0;
 const scale=waist?(waist-bounds0.top)/(matchedWaist-bd.top):Math.max(.93,Math.min(1.07,bounds0.width/bd.width));
 const nx=Math.round(base.info.width*scale),ny=Math.round(H*scale);
 const buf=await sharp(base.data,{raw:{width:base.info.width,height:H,channels:4}}).resize(nx,ny).png().toBuffer();
 const dx=Math.round(targetX-bd.cx*scale),dy=Math.round(bounds0.top-bd.top*scale);
 const clipped=await sharp(buf).extract({left:Math.max(0,-dx),top:Math.max(0,-dy),width:Math.min(nx-Math.max(0,-dx),W-Math.max(0,dx)),height:Math.min(ny-Math.max(0,-dy),H-Math.max(0,dy))}).png().toBuffer();
 const registered=await sharp({create:{width:W,height:H,channels:4,background:'#00000000'}}).composite([{input:clipped,left:Math.max(0,dx),top:Math.max(0,dy)}]).raw().toBuffer();
 if(i===0)master=Buffer.from(registered);
 const original=Buffer.from(registered);
 master.copy(registered,0,0,cut*W*4);
 if(i!==0)for(let y=cut;y<joinEnd;y++){
 const t=(y-cut)/31,m=t*t*(3-2*t);
 for(let x=0;x<W;x++){const p=(y*W+x)*4,ma=master[p+3]/255,oa=original[p+3]/255,a=ma*(1-m)+oa*m;for(let c=0;c<3;c++)registered[p+c]=a?Math.round((master[p+c]*ma*(1-m)+original[p+c]*oa*m)/a):0;registered[p+3]=Math.round(a*255);}
 }
 // RGB beneath zero alpha is irrelevant to rendering and can confuse raw previews.
 for(let p=0;p<registered.length;p+=4)if(registered[p+3]===0)registered[p]=registered[p+1]=registered[p+2]=0;
 const dest=path.join(dir,'frames',name(i));await sharp(registered,{raw:{width:W,height:H,channels:4}}).png().toFile(dest);
 const hash=crypto.createHash('sha256').update(registered.subarray(0,cut*W*4)).digest('hex');
 checks.push({index:i,canvas:[W,H],scale,translation:[dx,dy],head_sha256:hash});
 const small=await sharp(dest).resize({height:384}).png().toBuffer();const sw=Math.round(W/4);
 panels.push({input:small,left:(i%4)*(sw+40)+20,top:Math.floor(i/4)*430+10});atl.push({input:small,left:i*sw,top:0});
 panels.push({input:Buffer.from(`<svg width="${sw}" height="24"><text x="8" y="17" fill="#27362c" font-family="sans-serif" font-size="14">${id.replace('person.','')} · ${String(i).padStart(2,'0')}</text></svg>`),left:(i%4)*(sw+40)+20,top:Math.floor(i/4)*430+400});
 }
 if(new Set(checks.map(x=>x.head_sha256)).size!==1)throw new Error('Head lock failed');
 const sw=Math.round(W/4);
 await sharp({create:{width:(sw+40)*4,height:860,channels:4,background:'#e7e9e6'}}).composite(panels).jpeg({quality:94}).toFile(path.join(dir,'contact-sheet.jpg'));
 await sharp({create:{width:sw*8,height:384,channels:4,background:'#00000000'}}).composite(atl).png().toFile(path.join(dir,'walk-8x1.png'));
 await fs.writeFile(path.join(dir,'validation.json'),JSON.stringify({id,frames:8,head_locked:true,head_cut:cut,collar_join_end:joinEnd,checks,status:'awaiting-contact-sheet-review'},null,2)+'\n');
 console.log(JSON.stringify({id,frames:8,head_locked:true,head_cut:cut,scale_range:[Math.min(...checks.map(x=>x.scale)),Math.max(...checks.map(x=>x.scale))]}));
}
main().catch(e=>{console.error(e);process.exitCode=1});
