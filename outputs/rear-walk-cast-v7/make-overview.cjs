const fs=require('node:fs/promises'),path=require('node:path');
const sharp=require('/Users/kevinloumeau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
async function main(){
const root=path.resolve(__dirname,'../rear-walk-cast-v7-delivery');
const manifest=JSON.parse(await fs.readFile(path.join(root,'manifest.json'),'utf8'));
const composite=[];
for(let i=0;i<manifest.characters.length;i++){
 const c=manifest.characters[i],x=(i%5)*300,y=Math.floor(i/5)*370;
 const img=await sharp(path.join(root,c.id,c.frames[0].file)).resize({height:330,width:280,fit:'contain',background:'#e7e9e6'}).png().toBuffer();
 composite.push({input:img,left:x+10,top:y+10});
 composite.push({input:Buffer.from(`<svg width="290" height="25"><text x="145" y="18" text-anchor="middle" fill="#233429" font-family="sans-serif" font-size="15">${c.id.replace('person.','').replace('.',' ')}</text></svg>`),left:x+5,top:y+340});
}
await sharp({create:{width:1500,height:1480,channels:3,background:'#e7e9e6'}}).composite(composite).jpeg({quality:94}).toFile(path.join(root,'cast-overview.jpg'));
}
main().catch(e=>{console.error(e);process.exitCode=1});
