"""Canopy harvest bench, tier 5 (Lv 75): the flagship trim and cure station.  A walnut cabinet with brass rails, a
glass-fronted curing cabinet with lit shelves of jars at the left, an automated trimmer drum in green and brass in
the middle, and two dry lines of hanging branches across the back.

Same footprint, origin and facing as harvest_bench (tier 3).  Needs canopy_kit.py and tier45_parts.py alongside.
Run headless with  blender -b -P harvest_bench_tier5.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K

OUT = K.begin("HarvestBenchTier5")
import tier45_parts as P
rnd = K.rnd
SHELFGLOW = K.mat("CureGlow", "#ffe2a8", .4, 0, 3.)

TOP, L, D = P.harvest_cabinet(walnut=True)
P.logo_plate("Logo", 0, -D / 2 - .03, .24, .2, .13)

# ---------- glass-fronted curing cabinet on the left of the worktop ----------
CX, CY, CW, CD, CH = -.62, .06, .58, .58, .92
K.box("CureBase", (CW + .04, CD + .04, .05), (CX, CY, TOP), K.WOOD_D, .01)
for sx in (-1, 1):
    K.box(f"CureSide{sx}", (.04, CD, CH), (CX + sx * (CW / 2 - .02), CY, TOP + .05), K.WOOD, .008)
K.box("CureBack", (CW - .08, .03, CH), (CX, CY + CD / 2 - .015, TOP + .05), K.CREAM, .006)
K.box("CureTop", (CW + .06, CD + .06, .06), (CX, CY, TOP + .05 + CH), K.WOOD, .012)
K.box("CureCrown", (CW + .08, CD + .08, .025), (CX, CY, TOP + .035 + CH), K.BRASS, .006)
K.box("CureLamp", (CW - .12, CD - .16, .012), (CX, CY, TOP + .035 + CH), SHELFGLOW, .003)
for k in range(3):
    z = TOP + .05 + .04 + k * .29
    K.box(f"CureShelf{k}", (CW - .08, CD - .06, .02), (CX, CY + .01, z), K.OAK, .004)
    K.box(f"CureShelfLip{k}", (CW - .08, .012, .016), (CX, CY - CD / 2 + .045, z + .004), SHELFGLOW, .003)
    K.box(f"CureLight{k}", (CW - .12, .02, .012), (CX, CY + CD / 2 - .05, z + .25), SHELFGLOW, .003)
    for j in range(3):
        P.jar(f"CureJar{k}{j}", CX - .17 + j * .17, CY + .03, z + .02, .06, .16, K.BRASS, K.GREEN if (j + k) % 2 else None, 5)
FRONT = K.mat("CureFront", "#dfeee8", .05); FRONT.blend_method = "BLEND" if hasattr(FRONT, "blend_method") else None
b = FRONT.node_tree.nodes["Principled BSDF"]; b.inputs["Alpha"].default_value = .18
K.box("CureGlass", (CW - .06, .01, CH - .04), (CX, CY - CD / 2 + .01, TOP + .07), FRONT, .003)
for dz in (TOP + .07, TOP + .07 + CH - .06):
    K.box(f"CureFrameH{dz:.2f}", (CW - .04, .02, .03), (CX, CY - CD / 2 + .005, dz), K.BRASS, .004)
for dx in (-(CW / 2 - .03), CW / 2 - .03):
    K.box(f"CureFrameV{dx:.2f}", (.03, .02, CH - .04), (CX + dx, CY - CD / 2 + .005, TOP + .07), K.BRASS, .004)
K.box("CureHandle", (.02, .04, .2), (CX + CW / 2 - .07, CY - CD / 2 - .02, TOP + .4), K.BRASS, .008)

# ---------- automated trimmer: a green drum with brass rings on a stand, a hopper and a catch tray ----------
TX, TY, TZ = .18, .02, TOP + .34
for sx in (-1, 1):
    K.box(f"TrimLeg{sx}", (.05, .3, .3), (TX + sx * .27, TY, TOP), K.GREEN_D, .012)
o = K.cyl("TrimDrum", .15, .15, .5, (TX - .25, TY, TZ), K.GREEN, 24); o.rotation_euler.y = math.pi / 2
for dx in (-.25, -.08, .08, .25):
    o = K.cyl(f"DrumRing{dx}", .158, .158, .03, (TX + dx - .015, TY, TZ), K.BRASS, 24); o.rotation_euler.y = math.pi / 2
for k in range(5):
    a = k * math.pi / 5 + .3
    K.box(f"DrumSlot{k}", (.4, .006, .02), (TX, TY - .151 * math.cos(a) * 0 - .152, TZ - .06 + k * .03), K.DARK, .002)
K.cyl("Hopper", .06, .14, .14, (TX - .1, TY + .05, TZ + .14), K.BRASS, 20)
K.box("Motor", (.14, .16, .14), (TX + .35, TY + .05, TZ - .1), K.GREEN_D, .02)
K.cyl("MotorCap", .05, .05, .02, (TX + .42, TY + .05, TZ - .02), K.BRASS, 16).rotation_euler.y = math.pi / 2
K.box("MotorLamp", (.03, .01, .03), (TX + .35, TY - .035, TZ - .02), SHELFGLOW, .004)
P.tray("Tray1", TX, TY - .25, TOP, .42, .18, 8, K.GREEN_D)

# ---------- dry lines across the back right with hanging branches ----------
LY, LZ = D / 2 - .08, 1.66
for x in (-.28, L / 2 - .05):
    K.box(f"LinePost{x:.2f}", (.05, .05, LZ - TOP + .05), (x, LY, TOP), K.GREEN, .012)
    K.cyl(f"LineFinial{x:.2f}", .032, .032, .045, (x, LY, LZ + .05), K.BRASS, 16)
for k, z in enumerate((LZ, LZ - .16)):
    K.tube(f"DryLine{k}", [(-.28, LY - .03, z), (L / 2 - .05, LY - .03, z)], .006, K.BRASS)
for i in range(6):
    x = -.15 + (L / 2 - .25) * i / 5 + .1
    P.branch(f"Hang{i}", x, LY - .03, LZ if i % 2 else LZ - .16, rnd.uniform(.32, .4), 3)

# ---------- finished jars at the front right ----------
for i, (x, y) in enumerate([(.62, -.26), (.8, -.2), (.8, .0)]):
    P.jar(f"Done{i}", x, y, TOP, .07, .17, K.BRASS, K.GREEN, 6)

K.finish(OUT, "harvest_bench_tier5", ortho=2.8, centre=(0, 0, 1.0))
