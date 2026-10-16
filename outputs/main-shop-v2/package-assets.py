from pathlib import Path
from PIL import Image,ImageOps
import json,hashlib,zipfile,shutil
root=Path(__file__).parent
protected=root/'protected/person.walker.06.walk.bag.right.original.png'
assert hashlib.sha256(protected.read_bytes()).hexdigest()=='556a0c4cf61cd05043a00cdd67ae48173d9ebec6c47f475aa61ab28694c30e7b'
assert (root/'people/person.walker.06.walk.bag.right.png').read_bytes()==protected.read_bytes()
left=root/'people/left';left.mkdir(exist_ok=True)
for p in (root/'people').glob('*.right.png'):
 ImageOps.mirror(Image.open(p)).save(left/p.name.replace('.right.png','.left.png'))
files=[]
for folder in ['sites','people','cars','tubes','belts','shell','street']:
 files+=list((root/folder).glob('*.png'))
files+=list(left.glob('*.png'))+list((root/'cycles').glob('*.sheet.png'))+list((root/'cycles/frames').glob('*.png'))
manifest=[]
for p in sorted(files):
 im=Image.open(p).convert('RGBA');alpha=im.getchannel('A');assert alpha.getextrema()[0]==0,p
 assert im.getbbox(),p
 manifest.append({'file':str(p.relative_to(root)),'size':list(im.size),'alpha_extrema':list(alpha.getextrema()),'opaque_bounds':list(alpha.getbbox()),'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
(root/'asset-manifest.json').write_text(json.dumps(manifest,indent=2))
docs=['README-ASSETS.md','CHARACTER-DECISIONS.md','REVISION-PROMPTS.md','source-sprite-prompts.md','sprite-prompts-batch.json','walk-sheet-prompts.json','asset-manifest.json','walk-frame-manifest.json','EXPORT-VALIDATION.json','measured-geometry-adjustments.json','structural-angle-adjustments.json','edge-cleanup-report.json']
files+=[root/p for p in docs if (root/p).exists()]
files+=list((root/'previews').glob('*'))
for p in [root/'sites/angle-check.json',root/'cars/master-angle-check.json',root/'cars/matched-landmark-review.json',root/'tubes/axis-adjustments.json']:
 if p.exists():files.append(p)
dest=root/'canopy-sprite-expansion.zip'
with zipfile.ZipFile(dest,'w',zipfile.ZIP_DEFLATED) as z:
 for p in files:z.write(p,p.relative_to(root))
with zipfile.ZipFile(dest) as z:assert z.testzip() is None
print(json.dumps({'png_files':len(manifest),'zip':str(dest),'bytes':dest.stat().st_size}))
