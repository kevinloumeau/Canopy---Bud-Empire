from pathlib import Path
from PIL import Image
import json,math,shutil
root=Path(__file__).parent;t=math.tan(math.pi/6);report=[]
def apply(p,neg,pos,xscale=1,yscale=None,source=None):
 backup=p.parent/'raw'/'before-measured-geometry'/p.name;backup.parent.mkdir(parents=True,exist_ok=True)
 if not backup.exists():shutil.copy2(source or p,backup)
 im=Image.open(backup).convert('RGBA');w,h=im.size
 if yscale is None:a=2*t*xscale/(pos-neg);b=t*xscale-a*pos
 else:a=yscale;b=(t if pos is not None else -t)*xscale-a*(pos if pos is not None else neg)
 lo=min(0,b*w);hi=max(a*h,a*h+b*w);pad=32
 out=im.transform((math.ceil(w*xscale)+2*pad,math.ceil(hi-lo)+2*pad),Image.Transform.AFFINE,(1/xscale,0,-pad/xscale,-b/(a*xscale),1/a,(lo-pad+b*pad/xscale)/a),Image.Resampling.BICUBIC);out.save(p)
 report.append({'file':str(p.relative_to(root)),'measured_slopes':[neg,pos],'x_scale':xscale,'y_scale':a,'y_shear':b,'mapped_axes':[(a*m+b)/xscale if m is not None else None for m in [neg,pos]],'measurement_limit':'Raster landmarks and line estimates; mapped reference axes exact, remaining render edges may vary.'})
for r in json.loads((root/'cars/matched-landmark-review.json').read_text()):apply(root/'cars'/r['file'],*r['slopes'])
for name,neg,pos in [('street.van.fl.png',-139/253,83/144),('street.van.fr.png',-76/154,169/260),('street.van.bl.png',-129/224,88/172),('street.van.br.png',-82/153,121/195)]:apply(root/'cars'/name,neg,pos)
apply(root/'street/street.foodtruck.png',-.5,109/185)
apply(root/'street/street.newsboxes.png',-63/112,46/153,source=root/'street/raw/street.newsboxes.png')
apply(root/'shell/flat.wall.glazing.left.png',-194/544,None,xscale=426*math.cos(math.pi/6)/544,yscale=1)
apply(root/'shell/flat.wall.glazing.right.png',None,174/466,xscale=410*math.cos(math.pi/6)/466,yscale=1)
(root/'measured-geometry-adjustments.json').write_text(json.dumps(report,indent=2))
print('Adjusted',len(report),'assets using measured axes.')
