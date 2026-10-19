"""Canopy pack bench, tier 4 (Lv 50): the tier 3 walnut cabinet with a two-step brass and oak shelf of branded
pouches and tins along the back, a bigger brass scale with a dial, a label printer feeding green labels, and jars
and a tray of buds ready to pack.

Same footprint, origin and facing as pack_bench (tier 3).  Needs canopy_kit.py and tier45_parts.py alongside.
Run headless with  blender -b -P pack_bench_tier4.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K

OUT = K.begin("PackBenchTier4")
import tier45_parts as P
rnd = K.rnd
SCREEN = K.mat("ScaleScreen", "#c9d8a4", .3, 0, .6)
DIAL = K.mat("DialFace", "#f6eedb", .4)

TOP, L, D = P.pack_cabinet()

# ---------- back shelf: two oak steps on brass posts, pouches and tins ----------
SY = D / 2 - .14
K.box("ShelfBack", (L - .1, .025, 0.56), (0, SY + .115, TOP), K.WOOD_D, .006)
for k, (z, y) in enumerate(((TOP + .2, SY), (TOP + .44, SY + .06))):
    K.box(f"Shelf{k}", (L - .1, .2, .03), (0, y, z), K.OAK, .008)
    K.box(f"ShelfLip{k}", (L - .1, .014, .03), (0, y - .1, z + .02), K.BRASS, .003)
for x in (-L / 2 + .08, 0, L / 2 - .08):
    K.cyl(f"ShelfPost{x:.2f}", .016, .016, .47, (x, SY + .04, TOP), K.BRASS, 12)
for i in range(12):
    x = -L / 2 + .16 + i * (L - .32) / 11
    if i % 3 == 2: P.tin(f"ShelfTin{i}", x, SY, TOP + .23, .045, .07)
    else: P.pouch(f"ShelfPouch{i}", x, SY, TOP + .23, K.GREEN if i % 2 else K.CREAM, label=K.CREAM if i % 2 else K.GREEN)
for i in range(9):
    x = -L / 2 + .2 + i * (L - .4) / 8
    if i % 2: P.tin(f"TopTin{i}", x, SY + .06, TOP + .47, .05, .07, K.CREAM)
    else: P.pouch(f"TopPouch{i}", x, SY + .06, TOP + .47, K.GREEN_D, .13, .05, .18, K.BRASS)

# ---------- bigger brass scale with a dial ----------
SX, SYc = -.42, -.16
K.box("ScaleBase", (.5, .4, .1), (SX, SYc, TOP), K.WOOD_D, .03)
K.box("ScaleBaseBand", (.51, .41, .02), (SX, SYc, TOP + .06), K.BRASS, .006)
K.cyl("ScaleStem", .035, .035, .05, (SX, SYc + .02, TOP + .1), K.BRASS, 16)
K.cyl("ScalePan", .2, .17, .035, (SX, SYc + .02, TOP + .15), K.BRASS, 32)
K.cyl("ScalePanIn", .17, .17, .004, (SX, SYc + .02, TOP + .183), K.DARK, 32)
for i in range(5):
    P.nug(f"PanNug{i}", SX + rnd.uniform(-.08, .08), SYc + .02 + rnd.uniform(-.08, .08), TOP + .17)
o = K.cyl("DialRim", .1, .1, .03, (SX, SYc - .2, TOP + .17), K.BRASS, 32); o.rotation_euler.x = math.pi / 2
o = K.cyl("DialFace", .085, .085, .006, (SX, SYc - .232, TOP + .17), DIAL, 32); o.rotation_euler.x = math.pi / 2
K.box("DialNeedle", (.006, .004, .07), (SX, SYc - .236, TOP + .165), K.DARK, .001).rotation_euler.y = .5
K.box("DialFoot", (.06, .05, .08), (SX, SYc - .2, TOP + .06), K.BRASS, .01)
K.box("ScaleScreen", (.16, .012, .045), (SX + .13, SYc - .206, TOP + .025), SCREEN, .004)

# ---------- label printer feeding green labels ----------
LX, LY = .12, -.18
K.box("Printer", (.3, .24, .15), (LX, LY, TOP), K.CREAM, .03)
K.box("PrinterLid", (.28, .2, .02), (LX, LY + .01, TOP + .15), K.GREEN, .008)
o = K.cyl("LabelRoll", .06, .06, .2, (LX - .1, LY + .1, TOP + .17), K.CREAM, 20); o.rotation_euler.y = math.pi / 2
o = K.cyl("RollCore", .022, .022, .204, (LX - .102, LY + .1, TOP + .17), K.BRASS, 12); o.rotation_euler.y = math.pi / 2
K.box("PrinterSlot", (.2, .01, .012), (LX, LY - .121, TOP + .1), K.DARK, .002)
for i in range(3):
    K.box(f"Label{i}", (.07, .005, .05), (LX - .07 + i * .075, LY - .14 - i * .004, TOP + .005), K.GREEN, .002).rotation_euler.x = 1.45
K.box("PrinterLed", (.02, .006, .02), (LX + .11, LY - .121, TOP + .11), SCREEN, .002)

# ---------- jars and a tray of buds ----------
for i, (x, y) in enumerate([(.5, -.02), (.7, -.02), (.62, -.26)]):
    P.jar(f"Jar{i}", x, y, TOP, .08, .2, K.BRASS, K.GREEN, 7)
P.tray("Tray", -.05, .08, TOP, .28, .2, 6, K.CREAM)

K.finish(OUT, "pack_bench_tier4", ortho=2.5, centre=(0, 0, .75))
