from PIL import Image
import importlib.util
from pathlib import Path
import json,sys,math,shutil

spec=importlib.util.spec_from_file_location('checks',Path(__file__).with_name('check-sprite-angles.py'))
checks=importlib.util.module_from_spec(spec)
spec.loader.exec_module(checks)
target=math.tan(math.pi/6)
reports=[]
for arg in sys.argv[1:]:
    p=Path(arg)
    raw=p.parent/'raw'
    raw.mkdir(exist_ok=True)
    backup=raw/p.name
    if not backup.exists():shutil.copy2(p,backup)
    before=checks.inspect(backup)
    neg,pos=before['dominant_slopes']
    scale=2*target/(pos-neg)
    shear=target-scale*pos
    im=Image.open(backup).convert('RGBA')
    w,h=im.size
    lo=min(0,shear*w)
    hi=max(scale*h,scale*h+shear*w)
    margin=24
    out_h=math.ceil(hi-lo)+margin*2
    # Inverse affine mapping: keep x and verticals, correct the two ground axes.
    im=im.transform((w+margin*2,out_h),Image.Transform.AFFINE,(1,0,-margin,-shear/scale,1/scale,(lo-margin+shear*margin)/scale),Image.Resampling.BICUBIC)
    im.save(p)
    after=checks.inspect(p)
    reports.append({'file':str(p),'before':before['dominant_slopes'],'vertical_scale':scale,'vertical_shear':shear,'after':after['dominant_slopes'],'alpha':after['alpha_extrema']})
print(json.dumps(reports,indent=2))
