from pathlib import Path
from PIL import Image,ImageFilter
import numpy as np
root=Path(__file__).parent
for folder in ['people','cycles']:
 for p in (root/folder).glob('*.png'):
  if folder=='people' and 'walker.06' in p.name:continue
  im=Image.open(p).convert('RGBA');a=np.array(im)
  core=Image.fromarray(np.where(a[:,:,3]>=240,255,0).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))
  keep=np.asarray(core)>0
  if ((a[:,:,3]>0)&~keep).any():
   backup=p.parent/'raw'/'before-halo-cleanup'/p.name;backup.parent.mkdir(parents=True,exist_ok=True)
   if not backup.exists():im.save(backup)
   a[~keep,3]=0;Image.fromarray(a).save(p)
print('Removed diffuse external halos while retaining antialiased opaque character contours.')
