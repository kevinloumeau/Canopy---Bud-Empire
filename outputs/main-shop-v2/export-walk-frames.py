from pathlib import Path
from PIL import Image,ImageOps
import numpy as np,json
root=Path(__file__).parent
cycle=root/'cycles';cycle.mkdir(exist_ok=True)
# Retain the established customer 07 animation rather than regenerate its identity.
sample=[Image.open(Path('sprites/people/cycle')/f'person.customer.07.cycle.{i:02d}.png').convert('RGBA') for i in [0,9,18,26]]
w=max(im.width for im in sample);h=max(im.height for im in sample);sheet=Image.new('RGBA',(w*4,h))
for i,im in enumerate(sample):sheet.alpha_composite(im,(i*w,0))
sheet.save(cycle/'person.customer.07.walk.empty.sheet.png')
manifest=[]
for p in cycle.glob('*.sheet.png'):
 im=Image.open(p).convert('RGBA');frames=[]
 columns=(np.asarray(im)[:,:,3]>180).sum(axis=0);cuts=[0]
 for phase in [1,2,3]:
  ideal=round(phase*im.width/4);radius=round(im.width*.08)
  candidates=np.flatnonzero(columns[max(cuts[-1]+1,ideal-radius):min(im.width,ideal+radius)]==0)+max(cuts[-1]+1,ideal-radius)
  if not len(candidates):raise ValueError(f'No clean frame separator: {p} phase {phase}')
  cuts.append(int(candidates[np.argmin(abs(candidates-ideal))]))
 cuts.append(im.width)
 for i in range(4):
  f=im.crop((cuts[i],0,cuts[i+1],im.height));box=f.getbbox()
  if box is None:raise ValueError(f'Empty phase: {p} {i}')
  frames.append(f.crop(box))
 scale=400/max(f.height for f in frames)
 for i,f in enumerate(frames):
  f=f.resize((round(f.width*scale),round(f.height*scale)),Image.Resampling.LANCZOS)
  mask=np.asarray(f)[:,:,3]>180;ys,xs=np.nonzero(mask[:max(1,round(f.height*.3))]);center=float(xs.mean()) if len(xs) else f.width/2
  canvas=Image.new('RGBA',(512,448));canvas.alpha_composite(f,(round(256-center),424-f.height))
  name=p.name.replace('.sheet.png',f'.{i:02d}.right.png');dest=cycle/'frames'/name;dest.parent.mkdir(exist_ok=True);canvas.save(dest)
  left=dest.with_name(name.replace('.right.png','.left.png'));ImageOps.mirror(canvas).save(left)
  manifest.append({'file':str(dest.relative_to(root)),'phase':i,'baseline':424,'size':[512,448]})
(root/'walk-frame-manifest.json').write_text(json.dumps(manifest,indent=2))
print('Exported',len(manifest),'right-facing frames and matching left mirrors.')
