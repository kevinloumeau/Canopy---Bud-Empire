from pathlib import Path
import hashlib, json, shutil, zipfile, subprocess
from PIL import Image

root = Path(__file__).resolve().parent
delivery = root.parent / 'rear-walk-cast-v7-delivery'
ids = [f'person.customer.{n:02d}' for n in range(1,14)] + [f'person.walker.{n:02d}' for n in range(1,8)]
manifest = {'scope':'Rear upper-right, no shopping bag; intrinsic character props retained.',
 'people':20,'new_people_this_batch':19,'frames_per_person':8,'frame_count':160,
 'sequence':['contact A','down A','passing A','reach B','contact B','down B','passing B','reach A'],
 'method':'One PNG per image generation. Frame 00 reuses the rear source except walker 07, whose contact was regenerated to reverse its starting foot. Uniform body scaling and translation; a fixed master head region is reused in every frame.',
 'review':'Contact sheets visually reviewed for identity, rear orientation, head consistency and alternating contact poses. Motion has not been tested in the game.',
 'integration':'Asset handoff only. No game files changed.', 'characters':[]}
for id in ids:
    src = root/id if id != 'person.customer.01' else root.parent/'rear-walk-single-frames/customer01-head-locked'
    dst = delivery/id
    dst.mkdir(parents=True,exist_ok=True)
    frames = sorted((src/'frames').glob('*.png'))
    assert len(frames)==8, (id,len(frames))
    (dst/'frames').mkdir(exist_ok=True)
    infos = []
    for frame in frames:
        shutil.copy2(frame,dst/'frames'/frame.name)
        im = Image.open(frame)
        assert im.mode == 'RGBA' and im.getchannel('A').getextrema()==(0,255)
        infos.append({'file':'frames/'+frame.name,'size':list(im.size),'sha256':hashlib.sha256(frame.read_bytes()).hexdigest()})
    shutil.copy2(src/'contact-sheet.jpg',dst/'contact-sheet.jpg')
    atlas = src/'walk-8x1.png' if id != 'person.customer.01' else src/'customer01-rear-walk-8x1.png'
    shutil.copy2(atlas,dst/'walk-8x1.png')
    for name in ['validation.json','generation-prompts.json','corrections.json','manifest.json']:
        if (src/name).exists():shutil.copy2(src/name,dst/name)
    a = Image.open(atlas)
    manifest['characters'].append({'id':id,'frames':infos,'atlas':{'file':id+'/walk-8x1.png','size':list(a.size),'cell_size':[a.width//8,a.height]}})
delivery.mkdir(exist_ok=True)
(delivery/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
shutil.copy2(root/'file-checks.json',delivery/'file-checks.json')
(delivery/'README.txt').write_text('''CANOPY — REAR WALK FRAMES v7

20 people × 8 PNG frames = 160 frames.
Customer 01 is the previously corrected set; the remaining 19 people are new.
Customers 01–13 and walkers 01–07. Rear three-quarter, facing upper right.
No shopping bags. Dog/leash, skateboard, earbuds and other intrinsic details remain.

Each person folder contains:
  frames/         Eight full-resolution RGBA PNGs, 00 through 07.
  walk-8x1.png    Transparent eight-cell horizontal sprite strip, left to right.
  contact-sheet.jpg  Labeled static review sheet.
  JSON records   Generation provenance and alignment/check information.

All individual frames are 1536 px tall. Most are 1024 px wide; walker 06
uses a wider canvas to retain the whole dog and leash. See manifest.json
for exact canvas and atlas cell dimensions. Keep each cell at its fixed
canvas size; do not independently crop or fit every frame to its bounds.

Head alignment: a fixed region from frame 00 is reused in all eight frames.
The upper head pixels are identical, with a short blended collar transition.
Bodies were uniformly scaled and translated to align the head/waist where
visible. Long hair below that region and clothing folds remain generated.

Playback order: 00,01,02,03,04,05,06,07, then repeat.
Two opposing contact poses are at 00 and 04. 02 and 06 are passing poses.
Start at approximately 8 frames per 1.2 seconds and tune to map movement.

Reviewed as stills: identity, rear direction, opposing contact poses,
head consistency, complete silhouettes and transparent backgrounds.
File checks cover counts, alpha, canvas bounds and identical head regions.
These checks do not establish foot planting or smooth motion at game size.
Long coats obscure some leg articulation. Dog motion needs in-game review.

This is an asset handoff. No game wiring, publication, video, bag variants
or additional front-view cycles were performed in this batch.
''')
cards='\n'.join(f'<section><h2>{id.removeprefix("person.").replace("."," ").title()}</h2><p><a href="{id}/walk-8x1.png">Sprite strip</a> · <a href="{id}/frames/">Individual PNGs</a></p><a href="{id}/contact-sheet.jpg"><img loading="lazy" src="{id}/contact-sheet.jpg" alt="Eight rear walk frames for {id}"></a></section>' for id in ids)
(delivery/'index.html').write_text('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Canopy rear walk frames</title><style>body{margin:0;background:#f3f1e9;color:#233429;font:16px system-ui,sans-serif}main{max-width:1200px;margin:auto;padding:32px 20px}h1{font-size:36px;margin-bottom:12px}section{margin:48px 0}img{display:block;width:100%;height:auto;border-radius:10px}a{color:#245d44}p{line-height:1.6}</style><main><h1>Canopy · Rear walk frames</h1><p>20 people, eight transparent PNG frames each. Customer 01 plus the 19 newly completed sets. Heads are fixed across each sequence. Static review sheets below.</p><p><a href="README.txt">Handoff notes</a> · <a href="manifest.json">Asset manifest</a></p>'+cards+'</main></html>')
subprocess.run(['node', str(root/'make-overview.cjs')],check=True)
zip_path = root.parent/'canopy-rear-walk-cast-v7.zip'
with zipfile.ZipFile(zip_path,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
    for file in sorted(delivery.rglob('*')):
        if file.is_file():z.write(file,Path(delivery.name)/file.relative_to(delivery))
with zipfile.ZipFile(zip_path) as z:
    bad=z.testzip()
    assert bad is None,bad
    assert sum('/frames/' in name and name.endswith('.png') for name in z.namelist())==160
print(json.dumps({'delivery':str(delivery),'zip':str(zip_path),'bytes':zip_path.stat().st_size,'frames':160,'archive_verified':True}))
