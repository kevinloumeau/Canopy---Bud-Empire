"""Canopy grow bench (tier 1), modelled from the current sprite.

An oak bench with green drawers, six young plants in terracotta pots and two hanging light bars on a green frame.
Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P grow_bench_tier1.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import canopy_kit as K
from mathutils import Vector

OUT = K.begin("GrowBenchTier1")
rnd = K.rnd
OAK_L = K.mat("OakLight", "#d6a466", .6)
SAGE = K.mat("DrawerGreen", "#3f7356", .55)

def young_plant(tag, x, y, z0, H, sc=1.):
    """A vegetative plant: a straight stem with pairs of fan leaves and an upright crown leaf, no colas."""
    K.tube(f"{tag}Stem", [(x, y, z0), (x, y, z0 + H)], .009, K.STEM, .005)
    nodes = 2
    for k in range(nodes):
        z = z0 + H * (.4 + .35 * k)
        yaw0 = k * 1.57 + rnd.uniform(-.3, .3)
        s = (1.2 - .25 * k) * sc
        for side in (0, math.pi):
            yaw = yaw0 + side
            tip = Vector((x, y, z)) + Vector((math.cos(yaw), math.sin(yaw), .3)) * .05 * sc
            K.tube(f"{tag}Pet{k}{int(side)}", [(x, y, z), tuple(tip)], .004, K.STEM)
            K.leaf_at(f"{tag}Leaf{k}{int(side)}", tuple(tip), yaw, rnd.uniform(.15, .35), s, K.LEAF_MESHES[(k + int(side > 0)) % 2])
    K.leaf_at(f"{tag}Crown", (x, y, z0 + H), rnd.uniform(0, 6.3), 1.25, .9 * sc, K.LEAF_MESHES[1])   # one fan leaf standing up

def small_pot(tag, x, y, z, k=.85):
    K.cyl(f"{tag}Pot", .12 * k, .16 * k, .2 * k, (x, y, z), K.TERRA, 40)
    K.ring(f"{tag}Rim", .172 * k, .148 * k, .04 * k, (x, y, z + .19 * k), K.TERRA_D, 40)   # open lip so the soil shows
    K.cyl(f"{tag}Soil", .15 * k, .15 * k, .02 * k, (x, y, z + .2 * k), K.SOIL, 32)

# ---------- oak cabinet with three green drawers ----------
L, D, H = 1.75, .82, .74
K.box("Plinth", (L + .1, D + .1, .08), (0, 0, 0), OAK_L, .02)
K.box("Body", (L, D, H - .08), (0, 0, .08), OAK_L, .012)
DW = (L - .12) / 3
for i in range(3):
    cx = -L / 2 + .06 + DW * (i + .5)
    K.box(f"Drawer{i}", (DW - .05, .03, .52), (cx, -D / 2 - .01, .12), SAGE, .012)
    K.box(f"DrawerInset{i}", (DW - .15, .01, .42), (cx, -D / 2 - .028, .17), SAGE, .006)
    K.box(f"Pull{i}", (.12, .04, .035), (cx, -D / 2 - .04, .5), K.BRASS, .012)
    for dz in (.2, .48):
        K.box(f"Hinge{i}{dz}", (.018, .03, .06), (cx - (DW - .05) / 2 - .012, -D / 2 - .02, dz), K.BRASS, .005)
K.box("EndPanel", (.02, D - .16, .44), (L / 2 + .008, 0, .14), OAK_L, .008)
# raised tray top with a lip all round
K.box("Top", (L + .1, D + .1, .06), (0, 0, H), OAK_L, .02, 3)
TOP = H + .06
for n, (dx, dy, w, d) in enumerate(((0, D / 2 + .03, L + .1, .04), (0, -D / 2 - .03, L + .1, .04),
                                    (L / 2 + .03, 0, .04, D + .1), (-L / 2 - .03, 0, .04, D + .1))):
    K.box(f"Lip{n}", (w, d, .08), (dx, dy, TOP), OAK_L, .015)

# ---------- green frame with two hanging light bars ----------
PH = 1.95
for sx in (-1, 1):
    px = sx * (L / 2 + .02)
    K.box(f"Post{sx}", (.07, .07, PH - .1), (px, D / 2 - .04, .1), K.GREEN, .012)
    K.cyl(f"PostCap{sx}", .03, .03, .03, (px, D / 2 - .04, PH), K.BRASS, 16)
K.box("Beam", (L + .1, .07, .08), (0, D / 2 - .04, PH - .08), K.GREEN, .015)
BY, BZ = D / 2 - .3, PH - .38          # the bars hang forward of the beam, over the back row of plants
for bx in (-.43, .43):
    for hx in (bx - .28, bx + .28):
        K.tube(f"Hanger{hx:.2f}", [(hx, D / 2 - .04, PH - .08), (hx, BY, BZ + .09)], .008, K.BRASS)
        K.cyl(f"HangerClip{hx:.2f}", .018, .018, .04, (hx, BY, BZ + .08), K.BRASS, 12)
    K.box(f"LightBar{bx}", (.76, .14, .09), (bx, BY, BZ), K.GREEN, .02)
    for ex in (-.39, .39):
        K.box(f"LightEnd{bx}{ex}", (.04, .16, .1), (bx + ex, BY, BZ - .005), K.BRASS, .01)
    K.box(f"LightPanel{bx}", (.72, .1, .01), (bx, BY, BZ - .01), K.GLOW, .003)
    K.box(f"LightStrip{bx}", (.72, .01, .03), (bx, BY - .071, BZ + .005), K.GLOW, .003)

# ---------- six young plants, staggered like the sprite ----------
SPOTS = [(-.55, .17), (.05, .17), (.62, .14), (-.72, -.18), (-.12, -.2), (.45, -.22)]
for i, (x, y) in enumerate(SPOTS):
    small_pot(f"P{i}", x, y, TOP)
    young_plant(f"P{i}", x, y, TOP + .17, rnd.uniform(.24, .3))

K.finish(OUT, "grow_bench_tier1", ortho=2.9, centre=(0, 0, 1.0))
