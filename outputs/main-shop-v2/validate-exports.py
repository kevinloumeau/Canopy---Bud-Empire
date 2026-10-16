from pathlib import Path
from PIL import Image
import json,hashlib
root=Path(__file__).parent
expected={'sites':6,'people':34,'cars':32,'tubes':6,'belts':3,'shell':3,'street':8}
counts={f:len(list((root/f).glob('*.png'))) for f in expected}
assert counts==expected,(counts,expected)
sheets=list((root/'cycles').glob('*.sheet.png'));assert len(sheets)==39,len(sheets)
frames=list((root/'cycles/frames').glob('*.png'));assert len(frames)==312,len(frames)
for p in frames:
 im=Image.open(p).convert('RGBA');assert im.size==(512,448),(p,im.size)
 box=im.getchannel('A').getbbox();assert box and box[0]>0 and box[2]<512 and box[1]>0 and box[3]<448,(p,box)
for f in expected:
 for p in (root/f).glob('*.png'):
  im=Image.open(p).convert('RGBA');a=im.getchannel('A');assert a.getextrema()[0]==0,p
  assert all(a.getpixel(q)==0 for q in [(0,0),(im.width-1,0),(0,im.height-1),(im.width-1,im.height-1)]),p
protected=root/'people/person.walker.06.walk.bag.right.png'
assert hashlib.sha256(protected.read_bytes()).hexdigest()=='556a0c4cf61cd05043a00cdd67ae48173d9ebec6c47f475aa61ab28694c30e7b'
report={'primary_asset_counts':counts,'walk_sheets':39,'individual_frames_both_directions':312,'frame_canvas':[512,448],'baseline_y':424,'transparent_corners':'pass','frame_clipping_check':'pass','protected_attachment_hash':'pass','source_or_hosting_changes':'none from this task','geometry_evidence':['sites/angle-check.json','cars/master-angle-check.json','cars/matched-landmark-review.json','measured-geometry-adjustments.json','structural-angle-adjustments.json','tubes/axis-adjustments.json'],'geometry_limit':'Measured reference axes are mapped to tan(30 degrees); raster estimates and generated secondary detail have finite precision. Curved and naturally tilted edges require visual judgement.'}
(root/'EXPORT-VALIDATION.json').write_text(json.dumps(report,indent=2));print(json.dumps(report))
