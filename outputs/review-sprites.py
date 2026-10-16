from pathlib import Path
import json
from PIL import Image, ImageDraw

base = Path(__file__).resolve().parent
manifest = json.loads((base / 'sprite-continuation-manifest.json').read_text())
reports = []
for folder_name in ['main-shop-v2', 'upgrades-v2', 'optional-props-v2', 'branches-v2', 'people-bags-v2']:
    folder = base / folder_name
    folder.mkdir(exist_ok=True)
    expected = [j['name']+'.png' for j in manifest['jobs'] if j['folder'].endswith(folder_name)]
    files = sorted(p for p in folder.glob('*.png') if p.name in expected)
    missing = sorted(set(expected) - {p.name for p in files})
    alpha = []
    for p in files:
        im = Image.open(p)
        a = im.getchannel('A') if 'A' in im.getbands() else None
        alpha.append({'file': p.name, 'size': list(im.size), 'mode': im.mode,
                      'transparent_pixels': a.histogram()[0] if a else 0,
                      'alpha_range': list(a.getextrema()) if a else None})
    for page in range((len(files)+19)//20):
        subset = files[page*20:(page+1)*20]
        sheet = Image.new('RGB', (1600, ((len(subset)+3)//4)*320), '#eae7df')
        draw = ImageDraw.Draw(sheet)
        for i,p in enumerate(subset):
            im = Image.open(p).convert('RGBA')
            im.thumbnail((380,280))
            x,y=(i%4)*400,(i//4)*320
            sheet.paste(im,(x+(400-im.width)//2,y),im)
            draw.text((x+8,y+288),p.stem,fill='#273c30')
        sheet.save(folder / ('preview-%02d.jpg' % (page+1)))
    report={'folder':folder_name,'expected':len(expected),'saved':len(files),'missing':missing,'alpha':alpha}
    (folder/'review.json').write_text(json.dumps(report,indent=2))
    reports.append({k:report[k] for k in ['folder','expected','saved','missing']})
(base/'continuation-status.json').write_text(json.dumps(reports,indent=2))
print(json.dumps([{k:v for k,v in r.items() if k!='missing'} for r in reports]))
