#!/usr/bin/env python3
"""Prepare the supplied Meshy GLBs for the native Metal crowd. No third-party Python packages.
Usage: python3 scripts/import-meshy-character.py /path/to/low-poly-character.zip
"""
import argparse, bisect, hashlib, json, math, pathlib, struct, subprocess, sys, tempfile, zipfile
ROOT=pathlib.Path(__file__).resolve().parents[1]
OUT=ROOT/'ios/App/App/Characters';OUT.mkdir(exist_ok=True)
def multiply(a,b):return [sum(a[r*4+k]*b[k*4+c]for k in range(4))for r in range(4)for c in range(4)]
def trs(t,q,s):
 x,y,z,w=q;return [(1-2*y*y-2*z*z)*s[0],(2*x*y-2*z*w)*s[1],(2*x*z+2*y*w)*s[2],t[0],(2*x*y+2*z*w)*s[0],(1-2*x*x-2*z*z)*s[1],(2*y*z-2*x*w)*s[2],t[1],(2*x*z-2*y*w)*s[0],(2*y*z+2*x*w)*s[1],(1-2*x*x-2*y*y)*s[2],t[2],0,0,0,1]
def transpose(m):return [m[c*4+r]for r in range(4)for c in range(4)]
def slerp(a,b,t):
 dot=sum(x*y for x,y in zip(a,b))
 if dot<0:b=[-v for v in b];dot=-dot
 if dot>.9995:q=[x+(y-x)*t for x,y in zip(a,b)];n=math.sqrt(sum(v*v for v in q));return[v/n for v in q]
 theta=math.acos(max(-1,min(1,dot)));den=math.sin(theta);return[(x*math.sin((1-t)*theta)+y*math.sin(t*theta))/den for x,y in zip(a,b)]
def read(raw):
 assert raw[:4]==b'glTF';length=struct.unpack_from('<I',raw,12)[0];g=json.loads(raw[20:20+length]);blob=raw[28+length:]
 def accessor(i):
  a=g['accessors'][i];v=g['bufferViews'][a['bufferView']];width={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4,'MAT4':16}[a['type']];fmt={5126:'f',5125:'I',5123:'H',5121:'B'}[a['componentType']];size=struct.calcsize(fmt)*width;offset=v.get('byteOffset',0)+a.get('byteOffset',0);stride=v.get('byteStride',size)
  return [struct.unpack_from('<'+fmt*width,blob,offset+j*stride)for j in range(a['count'])]
 return g,blob,accessor
NAMES=['TieDye','Caramel','Beanie','Cream','Bearded','Chef','Colorful','Blazer','Office','Plaid','Utility','Security','GreenMan','GreenWoman','GrayEmployee','DarkHairedEmployee','YoungEmployee']
parser=argparse.ArgumentParser();parser.add_argument('zip');parser.add_argument('--name',default='TieDye',choices=NAMES);parser.add_argument('--idle',default=None);args=parser.parse_args()
name=args.name;source=pathlib.Path(args.zip);archive=zipfile.ZipFile(source)
files={}
for entry in archive.namelist():
 if entry.endswith('.glb'):
  raw=archive.read(entry);g,b,acc=read(raw);label=g['animations'][0]['name'].lower();key='idle'if label.startswith('idle')else label
  if key=='idle' and args.idle and label!=args.idle.lower():continue
  files[key]=(g,b,acc)
assert all(k in files for k in ['idle','walking','running'])
g,blob,acc=files['idle'];primitive=g['meshes'][0]['primitives'][0];attrs=primitive['attributes'];positions=acc(attrs['POSITION']);normals=acc(attrs['NORMAL']);uvs=acc(attrs['TEXCOORD_0']);joints=acc(attrs['JOINTS_0']);weights=acc(attrs['WEIGHTS_0']);indices=[v[0]for v in acc(primitive['indices'])];bone_count=len(g['skins'][0]['joints'])
# The supplied dark-haired employee has 226,978 triangles; retain its original mesh.
assert len(indices)//3<=250000 and max(indices)<len(positions)
vertices=bytearray()
for p,n,uv,j,w in zip(positions,normals,uvs,joints,weights):
 assert max(j)<bone_count and abs(sum(w)-1)<.01
 vertices+=struct.pack('<12f4I4f',*p,1,*n,0,*uv,0,0,*j,*w)
(OUT/(name+'.vertices')).write_bytes(vertices);(OUT/(name+'.indices')).write_bytes(struct.pack('<'+'I'*len(indices),*indices))
image=g['images'][g['textures'][g['materials'][0]['pbrMetallicRoughness']['baseColorTexture']['index']]['source']];view=g['bufferViews'][image['bufferView']];texture=blob[view.get('byteOffset',0):view.get('byteOffset',0)+view['byteLength']]
with tempfile.TemporaryDirectory()as temp:
 src=pathlib.Path(temp)/'source.png';src.write_bytes(texture)
 subprocess.run(['sips','-z','1024','1024','-s','format','jpeg','-s','formatOptions','85',str(src),'--out',str(OUT/(name+'.jpg'))],check=True,stdout=subprocess.DEVNULL)
frames=[];hands=[];clips={};bounds={}
for key in ['idle','walking','running']:
 g,b,acc=files[key];p=g['meshes'][0]['primitives'][0];assert acc(p['attributes']['POSITION'])==positions,'animation mesh differs'
 skin=g['skins'][0];assert len(skin['joints'])==bone_count
 parents={c:i for i,n in enumerate(g['nodes'])for c in n.get('children',[])};ibm=[transpose(m)for m in acc(skin['inverseBindMatrices'])];tracks=[]
 for ch in g['animations'][0]['channels']:
  sample=g['animations'][0]['samplers'][ch['sampler']];assert sample.get('interpolation','LINEAR')=='LINEAR';tracks.append((ch['target']['node'],ch['target']['path'],[v[0]for v in acc(sample['input'])],acc(sample['output'])))
 start=min(t[2][0]for t in tracks);duration=max(t[2][-1]for t in tracks)-start;count=max(2,math.ceil(duration*60));offset=len(frames);sample_bounds=[]
 for frame in range(count+1):
  time=start+(frame%count)/count*duration;nodes=[dict(n)for n in g['nodes']]
  for node,path,times,values in tracks:
   i=max(0,min(len(times)-2,bisect.bisect_right(times,time)-1));factor=max(0,min(1,(time-times[i])/max(1e-8,times[i+1]-times[i])));nodes[node][path]=slerp(values[i],values[i+1],factor)if path=='rotation'else[a+(b-a)*factor for a,b in zip(values[i],values[i+1])]
  # Ease the final 180 ms back into the first pose instead of snapping at wrap.
  seam=max(0,min(1,(time-(start+duration-.18))/.18));seam=seam*seam*(3-2*seam)
  if seam>0:
   for node,path,times,values in tracks:
    current=nodes[node][path];first=values[0]
    nodes[node][path]=slerp(current,first,seam)if path=='rotation'else[a+(b-a)*seam for a,b in zip(current,first)]
  worlds={}
  def world(i):
   if i not in worlds:
    n=nodes[i];local=transpose(n['matrix'])if'matrix'in n else trs(n.get('translation',[0,0,0]),n.get('rotation',[0,0,0,1]),n.get('scale',[1,1,1]));worlds[i]=multiply(world(parents[i]),local)if i in parents else local
   return worlds[i]
  matrices=[multiply(world(j),bind)for j,bind in zip(skin['joints'],ibm)]
  # Remove any travel from the root: game paths remain authoritative. Retain vertical gait bob.
  root=world(skin['joints'][0]);rx,rz=root[3],root[11]
  for m in matrices:m[3]-=rx;m[11]-=rz
  hand_node=next(i for i,n in enumerate(nodes)if n.get('name')=='mixamorig:RightHand');hand=world(hand_node);hands.append([round(hand[3]-rx,6),round(hand[7],6),round(hand[11]-rz,6)])
  # Track actual skinned bounds as an import sanity check, including feet and head.
  points=[];bound_step=max(1,len(positions)//6000)
  for p,j,w in zip(positions[::bound_step],joints[::bound_step],weights[::bound_step]):
   points.append([sum(weight*(sum(matrices[joint][axis*4+k]*p[k]for k in range(3))+matrices[joint][axis*4+3])for joint,weight in zip(j,w))for axis in range(3)])
  low=[min(p[k]for p in points)for k in range(3)];high=[max(p[k]for p in points)for k in range(3)]
  assert -0.4<low[1]<.4 and 1.2<high[1]<2.2,(key,low,high)
  sample_bounds.append([low,high]);frames.append(matrices)
 clips[key]={'offset':offset,'frames':count,'duration':duration};bounds[key]={'min':[min(b[0][k]for b in sample_bounds)for k in range(3)],'max':[max(b[1][k]for b in sample_bounds)for k in range(3)]}
# This export's idle clip is lifted above its walking floor. Align its lowest sole.
if name=='Caramel':
 lift=bounds['idle']['min'][1];clip=clips['idle']
 for i in range(clip['offset'],clip['offset']+clip['frames']+1):
  for m in frames[i]:m[7]-=lift
  hands[i][1]-=lift
 bounds['idle']['min'][1]-=lift;bounds['idle']['max'][1]-=lift
flat=[v for frame in frames for m in frame for v in transpose(m)];assert all(math.isfinite(v)for v in flat)
(OUT/(name+'.poses')).write_bytes(struct.pack('<'+'f'*len(flat),*flat))
manifest={'version':1,'vertices':len(positions),'indices':len(indices),'bones':bone_count,'totalFrames':len(frames),'clips':clips,'bounds':bounds,'sourceSHA256':hashlib.sha256(source.read_bytes()).hexdigest()}
(OUT/(name+'.json')).write_text(json.dumps(manifest,indent=2)+'\n')
clip_file={'TieDye':'character-clips.js','Caramel':'caramel-clips.js','Beanie':'beanie-clips.js','Cream':'cream-clips.js','Bearded':'bearded-clips.js','Chef':'chef-clips.js','Colorful':'colorful-clips.js','Blazer':'blazer-clips.js','Office':'office-clips.js','Plaid':'plaid-clips.js','Utility':'utility-clips.js','Security':'security-clips.js','GreenMan':'green-man-clips.js','GreenWoman':'green-woman-clips.js','GrayEmployee':'gray-employee-clips.js','DarkHairedEmployee':'dark-haired-employee-clips.js','YoungEmployee':'young-employee-clips.js'}[name]
(ROOT/'src'/clip_file).write_text('// Generated by scripts/import-meshy-character.py. Frames include a duplicated loop seam.\nexport const CHARACTER_CLIPS='+json.dumps(clips,separators=(',',':'))+';\nexport const CHARACTER_HANDS='+json.dumps(hands,separators=(',',':'))+';\n')
print(json.dumps(manifest,indent=2));print('Runtime bytes:',sum(p.stat().st_size for p in OUT.iterdir()if p.is_file()))
