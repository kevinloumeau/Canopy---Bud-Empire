"""Canopy hanging pothos rail (shell.js `hanging`, under the top floor's soffit): a brass rod on ceiling drops with
eighteen trailing pothos vines, longest in the middle, at shell.js's spacing and lengths.  4.6 map units long, along
map x (Blender X).  Origin at the rail's centre on its top edge (code: ((x0+x1)/2, hanging.y, hanging.z));
everything hangs below z=0.  About 2.5K triangles.

Needs canopy_kit.py and planter_parts.py in the same folder.  Run headless with
    blender -b -P pothos_rail.py -- OUT_DIR
"""
import os, sys, math, random
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import planter_parts as P

OUT = K.begin("PothosRail")
rnd = random.Random(9); M, V = P.M, P.V
STEM = K.mat("PothosStem", "#5c7f3a", .7)
LEAVES = [K.mat("PothosDeep", "#4f7f3c", .6, two_sided=True), K.mat("PothosMid", "#6a9a48", .55, two_sided=True),
          K.mat("PothosLight", "#9cc46e", .55, two_sided=True)]

L, R = 4.6 * M, .018
rod = K.cyl("Rail", R, R, L, (0, 0, 0), K.BRASS, 10); rod.rotation_euler.y = math.pi / 2; rod.location = (-L / 2, 0, -R)
for sx in (-1, 1):
    K.cyl(f"Finial{sx}", R * 1.6, R * 1.6, .03, (sx * (L / 2 + .015) - .015, 0, -R), K.BRASS, 10).rotation_euler.y = math.pi / 2
for i, x in enumerate((-L / 2 + .15, 0, L / 2 - .15)):   # short drops up to the soffit
    K.cyl(f"Drop{i}", .007, .007, .12, (x, 0, -.001), K.BRASS, 6)
    K.cyl(f"DropRose{i}", .028, .022, .012, (x, 0, .11), K.BRASS, 12)
for v in range(18):
    x = -L / 2 + L * (v + .5) / 18
    length = (.5 + (1 - abs(v - 8.5) / 9) * .7 + (v % 3) * .12) * V
    K.cyl(f"Ring{v}", R * 1.5, R * 1.5, .012, (x - .006, 0, -R), K.BRASS, 8).rotation_euler.y = math.pi / 2
    P.strand(f"Vine{v}", (x, (.06 if v % 2 else -.06) * M * .5, -2 * R), length, LEAVES, STEM, rnd, .1, .065, .035,
             (rnd.uniform(-.03, .03), (-.08 if v % 2 else .08) * M * .5), stem=False, pairs=True)
K.finish(OUT, "pothos_rail", ortho=3.2, centre=(0, 0, -.4))
