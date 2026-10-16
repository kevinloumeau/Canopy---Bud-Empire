"""Register the generated PNG poses without repainting or deforming anatomy."""
from pathlib import Path
import json
import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent
DRAFT = ROOT.parent / 'customer01-draft'
CORRECTIONS = {1:'head01', 3:'fix03Arms', 5:'head05', 6:'head06', 7:'head07'}
SIZE = (1024,1536)
TARGET_COLLAR_Y = 352
TARGET_TORSO_LENGTH = 418
TARGET_HEAD_X = 512

def landmarks(im):
    a=np.asarray(im).astype(float)
    r,g,b,alpha=[a[:,:,j] for j in range(4)]
    yy,xx=np.indices(r.shape)
    head=(yy<350)&(alpha>220)&(r>g*1.12)&(g>b*1.08)&(r>35)
    hx=float(np.median(xx[head]))
    blue=(b>r*1.3)&(g>r*1.25)&(alpha>220)
    rows=np.where(blue[:,510:555].mean(axis=1)>.7)[0]
    rows=rows[(rows>290)&(rows<820)]
    return hx,int(rows.min()),int(rows.max())

def resize_rgba(im,size):
    # Premultiplied resampling preserves alpha at sprite edges.
    return im.convert('RGBa').resize(size,Image.Resampling.LANCZOS).convert('RGBA')

manifest=json.loads((DRAFT/'manifest.json').read_text())
entries=[]
frames=[]
for entry in manifest['frames']:
    i=entry['index']
    src=ROOT/'sources'/(CORRECTIONS[i]+'.png') if i in CORRECTIONS else DRAFT/entry['file']
    im=Image.open(src).convert('RGBA')
    hx,cy,wy=landmarks(im)
    scale=TARGET_TORSO_LENGTH/(wy-cy)
    resized=resize_rgba(im,(round(im.width*scale),round(im.height*scale)))
    dx=round(TARGET_HEAD_X-hx*scale)
    dy=round(TARGET_COLLAR_Y-cy*scale)
    result=Image.new('RGBA',SIZE)
    result.alpha_composite(resized,(dx,dy))
    (ROOT/'frames').mkdir(exist_ok=True)
    result.save(ROOT/'frames'/entry['file'])
    frames.append(result)
    alpha=np.asarray(result.getchannel('A'))
    assert alpha.max()==255 and alpha.min()==0
    assert max(int(a.max()) for a in (alpha[0],alpha[-1],alpha[:,0],alpha[:,-1]))<=2, 'Clipped visible frame'
    entries.append({**entry,'source':str(src),'file':'frames/'+entry['file'],
                    'size':list(SIZE),'uniform_scale':scale,'translation':[dx,dy],
                    'source_landmarks':{'head_center_x':hx,'collar_y':cy,'waist_y':wy},
                    'registered_landmarks':{'head_center_x':hx*scale+dx,'collar_y':cy*scale+dy,'waist_y':wy*scale+dy}})

# A static review sheet and equal-cell atlas. No generated video or GIF.
sheet=Image.new('RGB',(1280,1056),(231,233,230))
draw=ImageDraw.Draw(sheet)
atlas=Image.new('RGBA',(256*8,384))
for i,im in enumerate(frames):
    small=resize_rgba(im,(256,384))
    atlas.alpha_composite(small,(256*i,0))
    x=(i%4)*320+32;y=(i//4)*528+25
    sheet.paste(small,(x,y),small)
    draw.line((x,y+193,x+256,y+193),fill=(179,189,182))
    draw.text((x,y+410),f"{i:02}  {entries[i]['phase']}",fill=(30,40,34))
sheet.save(ROOT/'contact-sheet.jpg',quality=95)
atlas.save(ROOT/'customer01-rear-walk-8x1.png')
manifest.update({'status':'pose-corrected-and-registered-review-set',
                 'frames':entries,'registration':{'canvas':SIZE,'collar_y':352,'waist_y':770,
                 'head_center_x':512,'method':'Uniform scaling by collar-to-waist length, followed by translation; no per-axis stretch, pose warping or bottom-of-bounds alignment.'},
                 'qa':['Frame 03: lowered reach and corrected opposite arm swing.',
                       'Frames 01 and 07: shortened transition stride.',
                       'Frames 01, 05, 06 and 07: targeted head-size corrections against the same appearance master.',
                       'All frames retain rear upper-right orientation and alternating legs.',
                       'Eight RGBA PNGs share canvas, torso scale and registration anchors; all have unclipped margins.',
                       'Small generated hair, fabric-texture and limb-shape differences remain; these are not a rigged animation.',
                       'Not integrated into the game.']})
(ROOT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps({'frames':len(entries),'canvas':SIZE,'scale_range':[min(e['uniform_scale'] for e in entries),max(e['uniform_scale'] for e in entries)],'max_anchor_error_px':max(abs(e['registered_landmarks']['collar_y']-352) for e in entries)},indent=2))
