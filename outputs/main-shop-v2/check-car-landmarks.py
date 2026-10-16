from pathlib import Path
from PIL import Image
import numpy as np,json,math
root=Path(__file__).parent/'cars'
reports=[]
def normalized(p):
 im=Image.open(p).convert('RGBA');a=np.array(im);mask=a[:,:,3]>220
 hi=a[:,:,:3]>=245;lo=a[:,:,:3]<=15;mask&=~((hi|lo).all(2)&hi.any(2)&lo.any(2))
 ys,xs=np.nonzero(mask);box=(int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1));scale=600/(box[2]-box[0])
 crop=im.crop(box);crop=crop.resize((600,round(crop.height*scale)))
 return np.array(crop.convert('RGB')).mean(2),box,scale
for master in json.loads((root/'master-angle-check.json').read_text()):
 p=root/master['file'];src,box,scale=normalized(p);view=p.stem.split('.')[-1]
 w=Image.open(root/'raw'/p.name).width;b=master['vertical_shear'];a=master['vertical_scale'];offset=32-min(0,b*w)
 points={key:[((x+32-box[0])*scale,(a*y+b*x+offset-box[1])*scale) for x,y in pair] for key,pair in master['points'].items()}
 for target in root.glob(f'street.car.*.{view}.png'):
  if '.blue.' in target.name:continue
  dst,tbox,tscale=normalized(target);found={};scores=[]
  for key,pair in points.items():
   found[key]=[]
   for x,y in pair:
    x,y=round(x),round(y);r=10;template=src[y-r:y+r+1,x-r:x+r+1];template-=template.mean()
    best=(-2,None)
    for yy in range(max(r,y-45),min(dst.shape[0]-r,y+46)):
     for xx in range(max(r,x-45),min(600-r,x+46)):
      patch=dst[yy-r:yy+r+1,xx-r:xx+r+1];center=patch-patch.mean();den=np.linalg.norm(center)*np.linalg.norm(template)
      score=float((center*template).sum()/den) if den else -1
      if score>best[0]:best=(score,(xx/tscale+tbox[0],yy/tscale+tbox[1]))
    scores.append(best[0]);found[key].append(best[1])
  def slope(pair):return (pair[1][1]-pair[0][1])/(pair[1][0]-pair[0][0])
  reports.append({'file':target.name,'points':found,'scores':scores,'slopes':[slope(found['negative']),slope(found['positive'])],'requires_manual_review':min(scores)<.8})
(root/'matched-landmark-review.json').write_text(json.dumps(reports,indent=2))
print('Measured',len(reports),'cars; manual review required for',sum(r['requires_manual_review'] for r in reports))
