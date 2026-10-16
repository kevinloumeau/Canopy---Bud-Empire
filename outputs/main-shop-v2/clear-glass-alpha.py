from pathlib import Path
from PIL import Image
import numpy as np
root=Path(__file__).parent
paths=list((root/'tubes').glob('*.png'))+list((root/'shell').glob('flat.wall.glazing.*.png'))+[root/'shell/shell.stairs.landing.png']
for p in paths:
 if not p.exists():continue
 backup=p.parent/'raw'/'before-glass-alpha'/p.name;backup.parent.mkdir(parents=True,exist_ok=True)
 if not backup.exists():Image.open(p).save(backup)
 a=np.array(Image.open(backup).convert('RGBA'));rgb=a[:,:,:3].astype(float)
 r,g,b=rgb[:,:,0],rgb[:,:,1],rgb[:,:,2]
 mask=(r>135)&(g>155)&(b>140)&(g>=r*.96)&(abs(r-b)<75)&(a[:,:,3]>0)
 # Brass, oak and green frames remain opaque; clear pale glass transmits the scene.
 factor=np.where((r+g+b)/3>235,.62,.32)
 a[:,:,3]=np.where(mask,a[:,:,3]*factor,a[:,:,3]).astype(np.uint8)
 Image.fromarray(a).save(p)
print('Preserved glass tint/reflections with translucent alpha.')
