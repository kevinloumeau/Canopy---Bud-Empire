from pathlib import Path
from PIL import Image, ImageDraw
import json
root=Path(__file__).resolve().parent/'people-complete-v3'
ids=[f'customer.{i:02}' for i in range(1,8)]+[f'walker.{i:02}' for i in range(1,5)]
expected=[f'person.{id}.{pose}.{carry}.{direction}.png' for id in ids for pose in ['stand','walk'] for carry in ['bag','empty'] for direction in ['left','right']]
missing=[name for name in expected if not (root/name).exists()]
report=[]
for name in expected:
    p=root/name
    if not p.exists():continue
    im=Image.open(p);a=im.getchannel('A')
    assert im.format=='PNG' and a.getextrema()[0]==0,name
    report.append({'file':name,'size':list(im.size),'mode':im.mode,'transparent_pixels':a.histogram()[0]})
for id in ids:
    names=[f'person.{id}.{pose}.{carry}.{direction}.png' for pose in ['stand','walk'] for carry in ['bag','empty'] for direction in ['left','right']]
    if any(not(root/name).exists() for name in names):continue
    sheet=Image.new('RGB',(1200,720),'#eae7df');d=ImageDraw.Draw(sheet)
    for i,name in enumerate(names):
        p=(root/'game-scale'/name) if (root/'game-scale'/name).exists() else (root/name)
        im=Image.open(p);im.thumbnail((270,315));x=i%4*300;y=i//4*360
        sheet.paste(im,(x+(300-im.width)//2,y),im)
        d.text((x+8,y+326),name.replace(f'person.{id}.','').removesuffix('.png'),fill='#273c30')
    sheet.save(root/f'preview-{id}.jpg')
(root/'review.json').write_text(json.dumps({'expected':88,'saved':len(report),'missing':missing,'all_saved_png_real_alpha':True,'files':report},indent=2))
print(json.dumps({'expected':88,'saved':len(report),'missing_count':len(missing)}))
