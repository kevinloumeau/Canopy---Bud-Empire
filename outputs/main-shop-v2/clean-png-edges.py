from pathlib import Path
import json
import numpy as np
from PIL import Image

ROOT=Path(__file__).parent
report=[]
for folder in ['sites','people','cars','tubes','belts','shell','street','cycles']:
 for path in (ROOT/folder).glob('*.png'):
  # Explicit user-protected character; leave all his images untouched.
  if folder=='people' and 'walker.06' in path.name: continue
  im=Image.open(path).convert('RGBA'); a=np.array(im)
  high=a[:,:,:3]>=245; low=a[:,:,:3]<=15
  marker=(high|low).all(2)&high.any(2)&low.any(2)&(a[:,:,3]>0)
  if not marker.any(): continue
  backup=path.parent/'raw'/'before-edge-cleanup'/path.name
  backup.parent.mkdir(parents=True,exist_ok=True)
  if not backup.exists(): im.save(backup)
  a[marker,3]=0
  Image.fromarray(a).save(path)
  report.append({'file':str(path.relative_to(ROOT)),'removed_marker_pixels':int(marker.sum())})
(ROOT/'edge-cleanup-report.json').write_text(json.dumps(report,indent=2))
print(f'Cleaned marker pixels from {len(report)} images; protected walker.06 excluded.')
