"""Canopy pack bench (tier 1), modelled from the current sprite.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P pack_bench_tier1.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import canopy_kit as K

OUT = K.begin("PackBenchTier1")
rnd = K.rnd
SAGE = K.mat("Sage", "#6a9672", .55)
SAGE_D = K.mat("SageDeep", "#4f7a5a", .6)
TOPSTONE = K.mat("CreamTop", "#f0dfb6", .4)

def nug(name, x, y, z, s=1.0):
    return K.inst(name, K.NUG_MESH, (x, y, z), (rnd.uniform(-.4, .4), rnd.uniform(-.4, .4), rnd.uniform(0, 6.3)), s * rnd.uniform(.85, 1.15))

# ---------- sage cabinet with oak corner posts and two drawers ----------
L, D, H = 1.3, .76, .72
K.box("Plinth", (L + .08, D + .08, .12), (0, 0, 0), SAGE_D, .02)
K.box("Body", (L, D, H - .14), (0, 0, .12), SAGE, .01)
for sx in (-1, 1):
    for sy in (-1, 1):
        K.box(f"Post{sx}{sy}", (.07, .07, H - .14), (sx * (L / 2 - .02), sy * (D / 2 - .02), .12), K.OAK, .01)
K.box("OakRail", (L - .04, .03, .05), (0, -D / 2 - .005, .12), K.OAK, .008)
DW = (L - .14) / 2
for i in range(2):
    cx = -L / 2 + .07 + DW * (i + .5)
    K.box(f"Drawer{i}", (DW - .05, .02, .46), (cx, -D / 2 - .008, .2), SAGE, .008)
    K.box(f"DrawerInset{i}", (DW - .14, .01, .36), (cx, -D / 2 - .017, .25), SAGE_D, .006)
    K.box(f"Pull{i}", (.16, .035, .04), (cx, -D / 2 - .035, .44), K.BRASS, .016)
K.box("EndPanel", (.02, D - .12, .5), (L / 2 + .008, 0, .17), SAGE, .008)
K.box("Top", (L + .14, D + .14, .1), (0, 0, H - .02), TOPSTONE, .04, 4)
TOP = H + .08

# ---------- kraft box with a cream band ----------
K.box("KraftBox", (.36, .3, .26), (-.5, .08, TOP), K.KRAFT, .015)
K.box("KraftBand", (.07, .304, .264), (-.47, .08, TOP - .002), K.CREAM, .006)

# ---------- big jar of buds ----------
JX, JY = -.13, .12
K.cyl("Jar", .13, .13, .3, (JX, JY, TOP), K.GLASS, 40)
for j in range(14):
    a = j * 2.4; rr = .075 * ((j % 3) / 2)
    nug(f"JarNug{j}", JX + math.cos(a) * rr, JY + math.sin(a) * rr, TOP + .01 + (j // 3) * .055, 1.1)
K.cyl("JarLid", .135, .135, .05, (JX, JY, TOP + .3), K.BRASS, 40)

# ---------- small green press with a cup of buds ----------
PX, PY = .44, -.02
K.box("PressBase", (.36, .3, .06), (PX, PY - .02, TOP), SAGE, .015)
K.box("PressCup", (.2, .2, .08), (PX - .05, PY - .04, TOP + .06), SAGE, .012)
K.box("PressWell", (.15, .15, .01), (PX - .05, PY - .04, TOP + .135), K.DARK, .004)
for j in range(4):
    nug(f"PressNug{j}", PX - .05 + rnd.uniform(-.04, .04), PY - .04 + rnd.uniform(-.04, .04), TOP + .13, .9)
K.box("PressColumn", (.1, .1, .5), (PX - .05, PY + .14, TOP + .06), SAGE, .02)
K.box("PressArm", (.1, .32, .09), (PX - .05, PY + .05, TOP + .5), SAGE, .025)
K.box("PressHead", (.16, .16, .05), (PX - .05, PY - .04, TOP + .28), SAGE, .012)
K.cyl("PressRam", .03, .03, .18, (PX - .05, PY - .04, TOP + .33), SAGE_D, 20)
K.cyl("PressCollar", .045, .045, .03, (PX - .05, PY - .04, TOP + .38), K.BRASS, 24)
K.box("PressSide", (.12, .14, .16), (PX + .1, PY + .1, TOP + .06), SAGE, .012)
K.cyl("PressKnob", .025, .025, .02, (PX + .1, PY + .028, TOP + .15), K.BRASS, 16).rotation_euler.x = math.pi / 2

K.finish(OUT, "pack_bench_tier1", ortho=2.0, centre=(0, 0, .6))
