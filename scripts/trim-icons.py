"""Trim a rendered icon to its visible pixels (2 px margin) and shrink it to at most 160 px on its long side.
    python3 scripts/trim-icons.py SRC_DIR DEST_DIR      # every PNG in SRC_DIR, written under the same name
"""
import sys, os, glob
from PIL import Image
src, dest = sys.argv[1], sys.argv[2]
for f in sorted(glob.glob(os.path.join(src, '*.png'))):
    im = Image.open(f).convert('RGBA')
    box = im.getchannel('A').point(lambda a: 255 if a > 6 else 0).getbbox()
    im = im.crop((max(0, box[0] - 2), max(0, box[1] - 2), min(im.width, box[2] + 2), min(im.height, box[3] + 2)))
    im.thumbnail((160, 160), Image.LANCZOS)
    im.save(os.path.join(dest, os.path.basename(f)), optimize=True)
    print(os.path.basename(f), im.size)
