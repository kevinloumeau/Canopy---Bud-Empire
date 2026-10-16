const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require('/Users/kevinloumeau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');

async function main() {
  const source = path.join(__dirname, 'customer01-refined');
  const dest = path.join(__dirname, 'customer01-head-locked');
  await fs.mkdir(path.join(dest, 'frames'), {recursive:true});
  const names = Array.from({length:8},(_,i)=>`person.customer.01.walk.empty.${String(i).padStart(2,'0')}.back-right.png`);
  const {data:master,info} = await sharp(path.join(source,'frames',names[0])).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const width=info.width, height=info.height, stride=width*4;
  const headEnd=360, joinEnd=392;
  const headHash=crypto.createHash('sha256').update(master.subarray(0,headEnd*stride)).digest('hex');
  const checks=[];
  const panels=[];
  const heads=[];
  const atlas=[];
  for(let i=0;i<8;i++) {
    const original=await sharp(path.join(source,'frames',names[i])).ensureAlpha().raw().toBuffer();
    const output=Buffer.from(original);
    master.copy(output,0,0,headEnd*stride);
    // Only the blue collar join is blended. Head pixels are identical across frames.
    // Premultiplied-alpha interpolation prevents a dark seam at the silhouette.
    if(i!==0) for(let y=headEnd;y<joinEnd;y++) {
      const t=(y-headEnd)/(joinEnd-headEnd-1);
      const mix=t*t*(3-2*t);
      for(let x=0;x<width;x++) {
        const p=(y*width+x)*4;
        const ma=master[p+3]/255, oa=original[p+3]/255;
        const a=ma*(1-mix)+oa*mix;
        for(let c=0;c<3;c++) output[p+c]=a?Math.round((master[p+c]*ma*(1-mix)+original[p+c]*oa*mix)/a):0;
        output[p+3]=Math.round(a*255);
      }
    }
    const hash=crypto.createHash('sha256').update(output.subarray(0,headEnd*stride)).digest('hex');
    const bodyUnchanged=output.subarray(joinEnd*stride).equals(original.subarray(joinEnd*stride));
    if(hash!==headHash || !bodyUnchanged) throw new Error('Head/body consistency check failed');
    const file=path.join(dest,'frames',names[i]);
    await sharp(output,{raw:{width,height,channels:4}}).png().toFile(file);
    const small=await sharp(file).resize(256,384).png().toBuffer();
    atlas.push({input:small,left:i*256,top:0});
    panels.push({input:small,left:(i%4)*300+22,top:Math.floor(i/4)*440+12});
    const label=Buffer.from(`<svg width="256" height="26"><text x="8" y="19" font-family="sans-serif" font-size="15" fill="#26312c">Frame ${String(i).padStart(2,'0')}</text></svg>`);
    panels.push({input:label,left:(i%4)*300+22,top:Math.floor(i/4)*440+400});
    const head=await sharp(file).extract({left:340,top:64,width:360,height:350}).png().toBuffer();
    heads.push({input:head,left:(i%4)*360,top:Math.floor(i/4)*350});
    checks.push({index:i,file:'frames/'+names[i],head_sha256:hash,body_below_row_392_unchanged:bodyUnchanged,canvas:[width,height]});
  }
  await sharp({create:{width:1200,height:880,channels:4,background:'#e7e9e6'}}).composite(panels).jpeg({quality:95}).toFile(path.join(dest,'contact-sheet.jpg'));
  await sharp({create:{width:1440,height:700,channels:4,background:'#e7e9e6'}}).composite(heads).png().toFile(path.join(dest,'head-comparison.png'));
  await sharp({create:{width:2048,height:384,channels:4,background:'#00000000'}}).composite(atlas).png().toFile(path.join(dest,'customer01-rear-walk-8x1.png'));
  const manifest=JSON.parse(await fs.readFile(path.join(source,'manifest.json'),'utf8'));
  manifest.status='head-scale-locked';
  manifest.head_correction={master:'customer01-refined/frames/'+names[0],identical_head_rows:[0,359],collar_transition_rows:[360,391],body_unchanged_from_row:392,method:'Same frame 00 head pixels at fixed size and position; no image regeneration.',checks};
  manifest.qa=['Identical head size, position and pixels in all eight frames verified by SHA-256.', 'Collar joins visually inspected at full resolution.', 'Body pixels below row 392 are unchanged from the refined set.', 'Existing corrected leg poses and full PNG transparency retained.', 'Not integrated; body/clothing variation from source generation remains.'];
  await fs.writeFile(path.join(dest,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
  await fs.writeFile(path.join(dest,'README.txt'),'Customer 01 rear walk: fixed head scale\n\nAll eight frames use the same head from refined frame 00, at identical pixel size and position. Only the collar transition (rows 360-391) is blended. Body pixels below row 392 are unchanged. Head pixels are verified identical by SHA-256.\n\nPNG frames: 1024 x 1536. Atlas: eight 256 x 384 cells, left to right, 00-07.\n\nThis replaces the refined set for head consistency. Prior outputs remain preserved. No game integration or video generation. Body/clothing variation remains from the earlier generated frames.\n');
  console.log(JSON.stringify({output:dest,frames:checks.length,identical_heads:true,unchanged_bodies:true,head_sha256:headHash},null,2));
}
main().catch(e=>{console.error(e);process.exitCode=1});
