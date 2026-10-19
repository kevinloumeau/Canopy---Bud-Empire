"""Canopy pack bench (tier 3), modelled from the current sprite.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P pack_bench.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import canopy_kit as K

OUT = K.begin("PackBench")
rnd = K.rnd
SCREEN = K.mat("ScaleScreen", "#c9d8a4", .3, 0, .6)

def nug(name, x, y, z, s=1.0, lying=True):
    return K.inst(name, K.NUG_MESH, (x, y, z), (rnd.uniform(-.4, .4), rnd.uniform(-.4, .4), rnd.uniform(0, 6.3)), s * rnd.uniform(.85, 1.15))

# ---------- walnut cabinet with brass ----------
L, D, H = 1.8, .92, .78
K.box("Plinth", (L + .1, D + .1, .1), (0, 0, 0), K.WOOD_D, .02)
K.box("PlinthBrass", (L + .11, D + .11, .02), (0, 0, .1), K.BRASS, .006)
K.box("Body", (L, D, H - .12), (0, 0, .12), K.WOOD, .01)
DW = (L - .16) / 3
for i in range(3):
    cx = -L / 2 + .08 + DW * (i + .5)
    K.box(f"Drawer{i}", (DW - .05, .02, .46), (cx, -D / 2 - .008, .2), K.WOOD, .008)
    K.box(f"DrawerInset{i}", (DW - .14, .01, .36), (cx, -D / 2 - .016, .25), K.WOOD_D, .006)
    K.box(f"Pull{i}", (.18, .035, .035), (cx, -D / 2 - .04, .44), K.BRASS, .016)
    for dx in (-.07, .07): K.box(f"PullFoot{i}{dx}", (.02, .03, .02), (cx + dx, -D / 2 - .022, .447), K.BRASS, .005)
K.box("EndPanel", (.02, D - .16, .46), (L / 2 + .008, 0, .2), K.WOOD, .008)
K.box("EndInset", (.01, D - .26, .36), (L / 2 + .016, 0, .25), K.WOOD_D, .006)
for sx in (-1, 1):
    for sy in (-1, 1):
        K.cyl(f"Column{sx}{sy}", .03, .03, H - .16, (sx * L / 2, sy * D / 2, .12), K.BRASS, 24)
for x in (-L / 2 + .08 + DW, -L / 2 + .08 + 2 * DW):
    K.cyl(f"Divider{x:.2f}", .022, .022, H - .16, (x, -D / 2, .12), K.BRASS, 20)
K.box("TopBand", (L + .08, D + .08, .03), (0, 0, H - .04), K.BRASS, .008)
K.box("Top", (L + .14, D + .14, .08), (0, 0, H - .01), K.STONE, .035, 4)
TOP = H + .07

# ---------- five jars of buds along the back ----------
for i in range(5):
    x, y = -.16 + i * .23, .26
    K.cyl(f"Jar{i}", .095, .095, .24, (x, y, TOP), K.GLASS, 40)
    for j in range(9):
        a = j * 2.4; rr = .05 * (j % 3) / 2
        nug(f"Jar{i}Nug{j}", x + math.cos(a) * rr, y + math.sin(a) * rr, TOP + .01 + (j // 3) * .065, 1.0, lying=False)
    K.cyl(f"Jar{i}Band", .097, .097, .03, (x, y, TOP + .215), K.GREEN, 40)
    K.cyl(f"Jar{i}Lid", .1, .1, .05, (x, y, TOP + .24), K.BRASS, 40)

# ---------- gift boxes with brass ribbon ----------
for i, (x, y, z) in enumerate([(-.6, .2, 0), (-.6, .2, .095), (-.6, -.06, 0), (-.6, -.06, .095)]):
    K.box(f"Box{i}", (.4, .25, .09), (x, y, TOP + z), K.CREAM, .012)
    K.box(f"Ribbon{i}", (.045, .254, .092), (x, y, TOP + z - .001), K.BRASS, .004)
K.leaf_at("BoxLeaf", (-.52, .2, TOP + .187), .5, 0, .5, K.LEAF_MESHES[2])

# ---------- brass scale ----------
K.box("ScaleBase", (.42, .34, .09), (-.18, -.14, TOP), K.WOOD_D, .025)
K.cyl("ScaleStem", .035, .035, .035, (-.18, -.12, TOP + .09), K.BRASS, 16)
K.box("ScalePan", (.4, .3, .025), (-.18, -.12, TOP + .125), K.BRASS, .012)
K.box("ScaleScreen", (.18, .012, .05), (-.18, -.315, TOP + .02), SCREEN, .004)

# ---------- tray of buds and a brass tin ----------
K.box("Tray", (.34, .26, .07), (.36, -.16, TOP), K.CREAM, .014)
K.box("TrayWell", (.28, .2, .01), (.36, -.16, TOP + .065), K.STONE, .004)
for j in range(8):
    nug(f"TrayNug{j}", .36 + rnd.uniform(-.09, .09), -.16 + rnd.uniform(-.06, .06), TOP + .07)
K.cyl("Tin", .1, .1, .12, (.72, -.24, TOP), K.BRASS, 40)
K.cyl("TinLid", .105, .105, .03, (.72, -.24, TOP + .11), K.BRASS, 40)

K.finish(OUT, "pack_bench", ortho=2.5, centre=(0, 0, .65))
