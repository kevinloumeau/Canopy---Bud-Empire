"""Canopy pack bench, tier 5 (Lv 75): a small brass-and-green packing line.  Jars ride a short conveyor across
the walnut cabinet, under a green and brass sealer arch, to a stack of boxed product with the leaf logo; branded
pouches wait on the back shelf and a leaf plaque marks the cabinet front.

Same footprint, origin and facing as pack_bench (tier 3).  Needs canopy_kit.py and tier45_parts.py alongside.
Run headless with  blender -b -P pack_bench_tier5.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K

OUT = K.begin("PackBenchTier5")
import tier45_parts as P
rnd = K.rnd
BELT = K.mat("Belt", "#2f3331", .8)
SCREEN = K.mat("SealerScreen", "#c9d8a4", .3, 0, .8)
LAMP = K.mat("SealerLamp", "#ffe2a8", .4, 0, 3.)

TOP, L, D = P.pack_cabinet(green_panels=True)
P.logo_plate("Logo", 0, -D / 2 - .03, .25, .2, .14)

# ---------- conveyor across the worktop ----------
CY, X0, X1, BZ = -.1, -.8, .42, TOP + .16
K.box("ConvFrame", (X1 - X0, .3, .07), ((X0 + X1) / 2, CY, BZ - .07), K.GREEN, .012)
K.box("ConvBelt", (X1 - X0 - .06, .24, .012), ((X0 + X1) / 2, CY, BZ), BELT, .004)
for x in (X0 + .03, X1 - .03):
    o = K.cyl(f"Roller{x:.2f}", .04, .04, .3, (x, CY - .15, BZ - .03), K.BRASS, 16); o.rotation_euler.x = -math.pi / 2
for x in (X0 + .08, X1 - .08):
    for sy in (-1, 1):
        K.box(f"ConvLeg{x:.2f}{sy}", (.04, .04, BZ - .07 - TOP), (x, CY + sy * .11, TOP), K.GREEN_D, .008)
for sy in (-1, 1):
    K.tube(f"ConvGuide{sy}", [(X0 + .04, CY + sy * .13, BZ + .05), (X1 - .04, CY + sy * .13, BZ + .05)], .008, K.BRASS)
for i, x in enumerate((-.7, -.5, -.3, .05, .27)):
    P.jar(f"LineJar{i}", x, CY, BZ + .012, .065, .15, K.BRASS if x > 0 else K.CREAM, K.GREEN, 5)

# ---------- sealer arch over the belt ----------
AX = -.12
for sy in (-1, 1):
    K.box(f"SealerPost{sy}", (.08, .06, .42), (AX, CY + sy * .19, TOP), K.GREEN, .015)
K.box("SealerHead", (.2, .46, .14), (AX, CY, BZ + .26), K.GREEN, .03)
K.box("SealerBand", (.21, .47, .025), (AX, CY, BZ + .3), K.BRASS, .006)
K.box("SealerPress", (.14, .2, .05), (AX, CY, BZ + .21), K.BRASS, .012)
K.box("SealerLamp", (.12, .01, .03), (AX, CY - .236, BZ + .34), LAMP, .003)
K.box("SealerScreen", (.12, .01, .06), (AX, CY - .236, BZ + .1), SCREEN, .003)

# ---------- boxed product at the end of the line ----------
BX, BY = .68, -.12
for k, (dx, dy, dz) in enumerate([(-.07, -.08, 0), (.07, -.08, 0), (-.07, .08, 0), (.07, .08, 0), (0, -.08, .11), (0, .08, .11), (0, 0, .22)]):
    K.box(f"Box{k}", (.13, .15, .1), (BX + dx, BY + dy, TOP + dz), K.CREAM, .01)
    K.box(f"BoxBand{k}", (.134, .03, .102), (BX + dx, BY + dy, TOP + dz - .001), K.GREEN, .003)
o = K.inst("BoxLeaf", P.brass_leaf_mesh(), (BX, BY - .076, TOP + .27), (math.pi / 2, 0, 0), .45)

# ---------- back shelf of branded pouches and a control box ----------
SY = D / 2 - .14
K.box("ShelfBack", (L - .1, .025, 0.42), (0, SY + .115, TOP), K.WOOD_D, .006)
K.box("Shelf", (L - .1, .2, .03), (0, SY, TOP + .32), K.OAK, .008)
K.box("ShelfLip", (L - .1, .014, .03), (0, SY - .1, TOP + .34), K.BRASS, .003)
for x in (-L / 2 + .08, L / 2 - .08):
    K.cyl(f"ShelfPost{x:.2f}", .016, .016, .35, (x, SY + .04, TOP), K.BRASS, 12)
for i in range(10):
    x = -L / 2 + .18 + i * (L - .36) / 9
    if i % 4 == 3: P.tin(f"Tin{i}", x, SY, TOP + .35, .05, .07)
    else: P.pouch(f"Pouch{i}", x, SY, TOP + .35, K.GREEN if i % 2 else K.CREAM, label=K.CREAM if i % 2 else K.GREEN)
for i in range(4):
    P.pouch(f"LowPouch{i}", .45 + i * .12, SY + .02, TOP, K.GREEN_D, .1, .045, .15, K.BRASS)
K.box("Control", (.2, .14, .2), (-.6, SY - .02, TOP), K.GREEN_D, .02)
K.box("ControlFace", (.14, .01, .08), (-.6, SY - .095, TOP + .1), SCREEN, .003)
for i in range(3):
    K.cyl(f"ControlKnob{i}", .014, .014, .015, (-.65 + i * .05, SY - .095, TOP + .05), K.BRASS, 12).rotation_euler.x = math.pi / 2

K.finish(OUT, "pack_bench_tier5", ortho=2.5, centre=(0, 0, .75))
