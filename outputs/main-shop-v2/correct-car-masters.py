from pathlib import Path
from PIL import Image
import math,json,shutil
root=Path(__file__).parent/'cars'
specs={
'fl':{'negative':[(725,838),(1220,625)],'positive':[(255,610),(552,738)]},
'fr':{'negative':[(944,795),(1213,670)],'positive':[(310,620),(780,878)]},
'bl':{'negative':[(610,936),(1082,710)],'positive':[(135,665),(450,831)]},
'br':{'negative':[(790,860),(1108,725)],'positive':[(235,660),(650,930)]}}
report=[]
for view,points in specs.items():
 p=root/f'street.car.blue.{view}.png';raw=root/'raw';raw.mkdir(exist_ok=True)
 backup=raw/p.name
 if not backup.exists():shutil.copy2(p,backup)
 def slope(pair):return (pair[1][1]-pair[0][1])/(pair[1][0]-pair[0][0])
 neg,pos=slope(points['negative']),slope(points['positive'])
 t=math.tan(math.pi/6);a=2*t/(pos-neg);b=t-a*pos
 im=Image.open(backup).convert('RGBA');w,h=im.size
 lo=min(0,b*w);hi=max(a*h,a*h+b*w);pad=32
 out=im.transform((w+pad*2,math.ceil(hi-lo)+pad*2),Image.Transform.AFFINE,(1,0,-pad,-b/a,1/a,(lo-pad+b*pad)/a),Image.Resampling.BICUBIC)
 out.save(p)
 report.append({'file':p.name,'measurement':'Same-height wheel hubs and paired front or rear lights, checked on coordinate-grid preview','points':points,'before':[neg,pos],'vertical_scale':a,'vertical_shear':b,'mapped_axes':[a*neg+b,a*pos+b]})
(root/'master-angle-check.json').write_text(json.dumps(report,indent=2))
