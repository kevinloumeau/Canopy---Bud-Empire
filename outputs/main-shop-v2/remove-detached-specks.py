from pathlib import Path
import numpy as np
from PIL import Image
root=Path(__file__).parent
for folder in ['sites','people','cars','tubes','belts','shell','street','cycles']:
 for p in (root/folder).glob('*.png'):
  if folder=='people' and 'walker.06' in p.name: continue
  im=Image.open(p).convert('RGBA'); a=np.array(im); mask=a[:,:,3]>0
  runs=[]; parent=[]; area=[]; prev=[]
  def find(i):
   while parent[i]!=i:
    parent[i]=parent[parent[i]]; i=parent[i]
   return i
  for y,row in enumerate(mask):
   edges=np.flatnonzero(np.diff(np.r_[False,row,False].astype(np.int8)))
   current=[]; k=0
   for start,end in zip(edges[::2],edges[1::2]):
    idx=len(parent);parent.append(idx);area.append(int(end-start));runs.append((y,start,end,idx));current.append((start,end,idx))
    while k<len(prev) and prev[k][1]<start: k+=1
    q=k
    while q<len(prev) and prev[q][0]<=end:
     r1,r2=find(idx),find(prev[q][2])
     if r1!=r2: parent[r2]=r1;area[r1]+=area[r2]
     q+=1
   prev=current
  threshold=max(12,round(im.width*im.height/18000))
  removed=0
  for y,start,end,idx in runs:
   if area[find(idx)]<threshold:
    a[y,start:end,3]=0;removed+=int(end-start)
  if removed:
   backup=p.parent/'raw'/'before-speck-cleanup'/p.name;backup.parent.mkdir(parents=True,exist_ok=True)
   if not backup.exists(): im.save(backup)
   Image.fromarray(a).save(p)
print('Removed small detached alpha components; walker.06 protected.')
