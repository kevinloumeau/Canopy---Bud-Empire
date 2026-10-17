from pathlib import Path
from PIL import Image
import hashlib, json

root = Path(__file__).resolve().parent
report = []
for folder in sorted(root.glob('person.*')):
    meta_path = folder / 'validation.json'
    if not meta_path.exists():
        continue
    meta = json.loads(meta_path.read_text())
    frames = sorted((folder / 'frames').glob('*.png'))
    checks = []
    for frame in frames:
        im = Image.open(frame)
        assert im.mode == 'RGBA', str(frame)
        alpha = im.getchannel('A')
        bbox = alpha.point(lambda p: 255 if p > 32 else 0).getbbox()
        w, h = im.size
        checks.append({
            'file': str(frame.relative_to(root)),
            'size': [w, h],
            'alpha_extrema': alpha.getextrema(),
            'visible_bbox_alpha_gt_32': bbox,
            'edge_clearance': min(bbox[0], bbox[1], w-bbox[2], h-bbox[3]),
            'head_sha256': hashlib.sha256(im.crop((0,0,w,meta['head_cut'])).tobytes()).hexdigest(),
            'file_sha256': hashlib.sha256(frame.read_bytes()).hexdigest()
        })
    report.append({'id': folder.name, 'frame_count':len(frames),
        'head_identical':len(set(c['head_sha256'] for c in checks)) == 1,
        'unique_frames':len(set(c['file_sha256'] for c in checks)),
        'minimum_edge_clearance':min(c['edge_clearance'] for c in checks),
        'checks':checks})
(root/'file-checks.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps([{k:v for k,v in p.items() if k != 'checks'} for p in report],indent=2))
