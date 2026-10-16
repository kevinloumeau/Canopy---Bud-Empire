from PIL import Image
import numpy as np
import json,sys
from pathlib import Path

def inspect(path):
    im=Image.open(path).convert('RGBA')
    im.thumbnail((750,750))
    a=np.asarray(im).astype(float)
    rgb=a[:,:,:3]*a[:,:,3:4]/255
    gray=rgb.mean(2)
    gy,gx=np.gradient(gray)
    mag=np.hypot(gx,gy)
    mask=(mag>max(12,np.percentile(mag,93)))&(a[:,:,3]>220)
    y,x=np.nonzero(mask)
    weight=mag[y,x]
    out=[]
    for sign in (-1,1):
        ranks=[]
        for slope in np.arange(.40,.751,.002):
            bins=np.rint(y-sign*slope*x).astype(int)
            bins-=bins.min()
            h=np.bincount(bins,weights=weight)
            h=np.convolve(h,np.ones(3),'same')
            ranks.append((float(h.max()),round(sign*slope,3)))
        ranks.sort(reverse=True)
        out.append(ranks[0][1])
    return {'file':str(path),'dominant_slopes':out,'target':[-.577,.577], 'alpha_extrema':Image.open(path).convert('RGBA').getchannel('A').getextrema(),'note':'Edge candidates support visual review; curved objects and occlusion require manual judgement.'}

if __name__=='__main__':
    paths=[]
    for arg in sys.argv[1:]:
        p=Path(arg)
        paths.extend(sorted(p.glob('*.png')) if p.is_dir() else [p])
    print(json.dumps([inspect(p) for p in paths],indent=2))
