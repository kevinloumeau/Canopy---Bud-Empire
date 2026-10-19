"""Canopy seeds bench (tier 2): oak frame on brass feet, cream drawers with brass pulls, thick oak top,
seedling tray and a humidifier on its own pad.

Needs canopy_kit.py and station_parts.py in the same folder.  Run headless with
    blender -b -P seeds_bench_tier2.py -- OUT_DIR
"""
import os, sys
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import station_parts as P

OUT = K.begin("SeedsBenchTier2")
M = P.mats()
LIGHT = K.mat("LightOak", "#dba86a", .55)

L, D, H = 1.75, 1.0, .74
for sx in (-1, 1):
    for sy in (-1, 1):
        x, y = sx * (L / 2 - .05), sy * (D / 2 - .05)
        K.cyl(f"Foot{sx}{sy}", .045, .04, .06, (x, y, 0), K.BRASS, 24)
        K.box(f"Leg{sx}{sy}", (.08, .08, H - .14), (x, y, .06), LIGHT, .012)
K.box("Carcass", (L - .06, D - .06, .52), (0, 0, .12), LIGHT, .01)
DW = (L - .16) / 2
for i in range(2):
    cx = -L / 2 + .08 + DW * (i + .5)
    K.box(f"Drawer{i}", (DW - .05, .025, .42), (cx, -D / 2 + .02, .17), M["PAINT"], .012)
    K.box(f"DrawerInset{i}", (DW - .15, .01, .32), (cx, -D / 2 + .005, .22), M["PAINT"], .006)
    K.box(f"Pull{i}", (.16, .035, .03), (cx, -D / 2 - .02, .48), K.BRASS, .014)
K.box("EndPanel", (.02, D - .18, .42), (L / 2 - .02, 0, .17), M["PAINT"], .008)
K.box("Top", (L + .1, D + .1, .12), (0, 0, H - .1), LIGHT, .04, 4)
TOP = H + .02
P.seed_tray(M, -.16, 0, TOP, humid=None, tray_w=1.16)
K.box("HumidPad", (.3, .3, .03), (.6, -.1, TOP), K.GREEN, .012)   # the humidifier stands on its own pad
P.humidifier(M, .6, -.1, TOP + .03)
K.finish(OUT, "seeds_bench_tier2", ortho=2.6, centre=(0, 0, .55))
