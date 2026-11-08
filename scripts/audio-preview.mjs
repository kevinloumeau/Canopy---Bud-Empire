// Renders the synthesised music and every sound effect offline in Chromium, so they can be heard and measured without
// running the game: node scripts/audio-preview.mjs <out-dir> [seconds-of-music]
// Writes music-day.wav, music-night.wav (from the start of a round) and sfx.wav (every cue, two and a half seconds apart,
// with its name in sfx.txt), and prints each one's peak and loudness in dBFS.
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)('playwright'); // not a project dependency: install it globally
import {createServer} from 'node:http';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..'),out=process.argv[2]||'audio-preview',seconds=Number(process.argv[3]||60);
await mkdir(out,{recursive:true});
const server=createServer(async(req,res)=>{
 if(req.url==='/')return res.end('<!doctype html><title>audio</title>');
 try{res.setHeader('content-type','text/javascript');res.end(await readFile(join(root,req.url)));}catch(e){res.statusCode=404;res.end();}
}).listen(0);
const port=server.address().port;
const browser=await chromium.launch(process.env.CHROME?{executablePath:process.env.CHROME}:{});
const page=await browser.newPage();await page.goto('http://localhost:'+port+'/');
const result=await page.evaluate(async(seconds)=>{
 const {makeMusic}=await import('/src/music.js'),{makeSound}=await import('/src/sfx.js');
 const RATE=44100;
 function stats(ch){let peak=0,sum=0;for(const d of ch)for(let i=0;i<d.length;i++){const v=Math.abs(d[i]);if(v>peak)peak=v;sum+=d[i]*d[i];}const n=ch.length*ch[0].length;return {peak:20*Math.log10(peak||1e-9),rms:20*Math.log10(Math.sqrt(sum/n)||1e-9)};}
 // A context that behaves like the game's: its output is the effects' compressor.
 async function renderMusic(night){
  const ctx=new OfflineAudioContext(2,RATE*seconds,RATE);window.AudioContext=function(){return ctx;};
  const sfx=makeSound(),m=makeMusic(sfx.context,{output:sfx.output});m.preview(seconds,0,night);
  const b=await ctx.startRendering();return [b.getChannelData(0),b.getChannelData(1)];
 }
 async function renderCue(kind){
  const ctx=new OfflineAudioContext(2,RATE*2.5,RATE);window.AudioContext=function(){return ctx;};
  const sfx=makeSound();sfx(kind,true);const b=await ctx.startRendering();return [b.getChannelData(0),b.getChannelData(1)];
 }
 const wav=ch=>{const n=ch[0].length,buf=new ArrayBuffer(44+n*4),v=new DataView(buf);const w=(o,s)=>[...s].forEach((c,i)=>v.setUint8(o+i,c.charCodeAt(0)));
  w(0,'RIFF');v.setUint32(4,36+n*4,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,2,true);v.setUint32(24,RATE,true);v.setUint32(28,RATE*4,true);v.setUint16(32,4,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,n*4,true);
  for(let i=0;i<n;i++)for(let c=0;c<2;c++)v.setInt16(44+i*4+c*2,Math.max(-1,Math.min(1,ch[c][i]))*32767,true);
  const u=new Uint8Array(buf);let bin='';for(let i=0;i<u.length;i+=32768)bin+=String.fromCharCode.apply(null,u.subarray(i,i+32768));return btoa(bin);};
 const files={},report={};
 for(const night of [false,true]){const ch=await renderMusic(night),name=night?'music-night':'music-day';report[name]=stats(ch);files[name]=wav(ch);}
 const kinds=makeSound().kinds,gap=RATE*2.5,all=[new Float32Array(gap*kinds.length+RATE),new Float32Array(gap*kinds.length+RATE)];
 for(let k=0;k<kinds.length;k++){const ch=await renderCue(kinds[k]);report[kinds[k]]=stats(ch);for(let c=0;c<2;c++)all[c].set(ch[c].subarray(0,Math.min(ch[c].length,all[c].length-k*gap)),k*gap);}
 files.sfx=wav(all);
 return {files,report,kinds};
},seconds);
for(const [name,bytes] of Object.entries(result.files))await writeFile(join(out,name+'.wav'),Buffer.from(bytes,'base64'));
await writeFile(join(out,'sfx.txt'),result.kinds.map((k,i)=>(i*2.5).toFixed(1)+'s  '+k).join('\n')+'\n');
for(const [name,s] of Object.entries(result.report))console.log(name.padEnd(12),'peak',s.peak.toFixed(1).padStart(6),'dBFS  rms',s.rms.toFixed(1).padStart(6),'dBFS');
await browser.close();server.close();
