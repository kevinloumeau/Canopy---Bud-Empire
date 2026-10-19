"""Canopy pickup desk, tier 5 (Lv 75): the flagship look, same footprint and facing as tiers 1-4.

A sculpted counter with a rounded end and a fluted oak front on a green tiled plinth under a marble top, a
glass display of jars set into the counter's rounded end, a polished brass canopy on two columns carrying the
PICKUP sign with a glowing leaf roundel on top, a lit back case of order bags, and a green tiled side cabinet
with a potted plant.

Needs canopy_kit.py and luxe_parts.py in the same folder.  Run headless with
    blender -b -P pickup_desk_tier5.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import bpy
import canopy_kit as K
OUT = K.begin("PickupDeskTier5")
import luxe_parts as X
M = X.mats()
KRAFT_D = K.mat("KraftFold", "#b47f4c", .85)
POTCREAM = K.mat("PotCream", "#ece2cc", .5)

def bag(name, x, y, z, tick=True):
    w, d, h = .17, .1, .26
    K.box(name, (w, d, h), (x, y, z), K.KRAFT, .008)
    K.box(name + "Fold", (w + .006, d + .006, .022), (x, y, z + h - .07), KRAFT_D, .005)
    K.tube(name + "Handle", [(x - .035, y, z + h - .01), (x - .035, y, z + h + .06), (x + .035, y, z + h + .06), (x + .035, y, z + h - .01)], .006, K.KRAFT)
    if tick:
        K.box(name + "Label", (.085, .006, .085), (x, y - d / 2 - .002, z + .09), K.GREEN, .004)

# ---------- sculpted counter: straight run plus a rounded left end, same outline as tier 3 ----------
L, D, X0 = 1.3, .8, -.2
R = D / 2
XL = X0 - L / 2 + R                  # centre of the rounded end
XR = X0 + L / 2
SC = (XL + XR) / 2; SL = XR - XL
# green tiled plinth
K.box("Plinth", (SL, D + .1, .12), (SC, 0, 0), K.GREEN_D, .015)
K.cyl("PlinthEnd", R + .05, R + .05, .12, (XL, 0, 0), K.GREEN_D, 40)
X.tile_band("PlinthTile", XL, XR + .05, -(D + .1) / 2 - .002, .015, .09, 1, .09)
K.box("KickBrass", (SL + .02, D + .12, .02), (SC, 0, .12), K.BRASS, .005)
K.cyl("KickBrassEnd", R + .06, R + .06, .02, (XL, 0, .12), K.BRASS, 40)
# body: oak, fluted on the front and round the end
K.box("Body", (SL, D, .68), (SC, 0, .14), K.WOOD, .01)
K.cyl("BodyEnd", R, R, .68, (XL, 0, .14), M["FLUTE"], 48)
X.fluted("Flute", XL, XR - .02, -D / 2 - .004, .16, .62)
for i in range(9):                    # flutes carried round the rounded end
    a = math.pi / 2 + math.pi * (i + .5) / 9
    c = K.cyl(f"EndFlute{i}", .024, .024, .62, (XL + math.cos(a) * (R + .004), math.sin(a) * (R + .004), .16), M["FLUTE"], 10)
K.box("Band", (SL, D + .02, .035), (SC, 0, .82), M["POLISH"], .008)
K.cyl("BandEnd", R + .01, R + .01, .035, (XL, 0, .82), M["POLISH"], 48)
K.box("LedStrip", (SL - .04, .012, .012), (SC, -D / 2 - .042, .826), M["LED"], .003)
X.marble_top("Top", (SL, D + .12, .08), (SC, 0, .855))
K.cyl("TopEnd", R + .06, R + .06, .0785, (XL, 0, .855), M["MARBLE"], 48)
TOP = .935

# glass display set into the rounded end: a brass-framed glass box with jars on a stepped stand
GX, GY = XL + .02, -.1
K.box("DisplayBase", (.4, .34, .03), (GX, GY, TOP), M["POLISH"], .006)
K.box("DisplayStep", (.34, .12, .06), (GX, GY + .08, TOP + .03), K.WOOD_D, .008)
K.box("DisplayGlass", (.38, .32, .3), (GX, GY, TOP + .03), M["JARGLASS"], .004)
K.box("DisplayCap", (.4, .34, .02), (GX, GY, TOP + .33), M["POLISH"], .006)
for i, (dx, dy, dz) in enumerate(((-.09, -.06, 0), (.09, -.06, 0), (0, .08, .06))):
    X.jar(f"DisplayJar{i}", GX + dx, GY + dy, TOP + .03 + dz, .05, .12, 3)
# leather mat and bell further along
K.box("MatEdge", (.36, .24, .008), (X0 + .2, -.14, TOP), K.BRASS, .003)
K.box("Mat", (.34, .22, .012), (X0 + .2, -.14, TOP + .002), K.GREEN, .004)
K.cyl("BellBase", .05, .05, .015, (X0 + .5, -.24, TOP), K.WOOD_D, 20)
K.cyl("Bell", .04, .012, .045, (X0 + .5, -.24, TOP + .015), M["POLISH"], 20)

# ---------- lit back case of order bags with a leaf roundel ----------
BY = D / 2 - .16
K.box("CaseBase", (L - .1, .28, .06), (X0 + .05, BY, TOP), K.WOOD_D, .01)
K.box("CaseBack", (L - .1, .03, .46), (X0 + .05, BY + .125, TOP + .06), M["BACKLIGHT"], .004)
K.box("CaseShelf", (L - .12, .26, .02), (X0 + .05, BY, TOP + .3), K.OAK, .005)
K.box("CaseTop", (L - .06, .32, .04), (X0 + .05, BY, TOP + .52), K.WOOD_D, .01)
K.box("CaseTopBrass", (L - .05, .33, .014), (X0 + .05, BY, TOP + .52), M["POLISH"], .004)
for x in (X0 + .05 - (L - .1) / 2, X0 + .05 + (L - .1) / 2):
    K.box(f"CasePost{x:.2f}", (.035, .28, .46), (x, BY, TOP + .06), M["POLISH"], .006)
K.box("CaseGlass", (L - .14, .006, .46), (X0 + .05, BY - .135, TOP + .06), M["JARGLASS"], 0)
for i in range(4):
    bag(f"Bag{i}", X0 - .42 + .08 + i * .27, BY, TOP + .06, tick=i != 2)
for i in range(4):
    X.jar(f"CaseJar{i}", X0 - .34 + i * .27, BY, TOP + .32, .045, .11, 2)

# ---------- green tiled side cabinet with a potted plant ----------
CX, CW, CD, CH = X0 + L / 2 + .3, .5, .62, .82
K.box("Cabinet", (CW, CD, CH), (CX, .02, 0), K.GREEN, .015)
X.tile_band("CabTile", CX - CW / 2 + .01, CX + CW / 2 - .01, .02 - CD / 2 - .004, .08, .62, 4, .1)
X.tile_band("CabTileSide", .02 - CD / 2 + .01, .02 + CD / 2 - .01, CX + CW / 2 + .004, .08, .62, 4, .1, "+X")
K.box("CabinetKick", (CW + .02, CD + .02, .07), (CX, .02, 0), K.GREEN_D, .01)
K.box("CabKickBrass", (CW + .03, CD + .03, .015), (CX, .02, .07), K.BRASS, .004)
X.marble_top("CabinetTop", (CW + .05, CD + .05, .05), (CX, .02, CH), .02)
K.box("CabPlaque", (.24, .012, .07), (CX, .02 - CD / 2 - .012, .74), M["POLISH"], .005)
K.cyl("PlantPot", .1, .08, .2, (CX + .08, .14, CH + .05), POTCREAM, 24)
K.cyl("PlantPotRim", .108, .108, .03, (CX + .08, .14, CH + .23), K.BRASS, 24)
K.cyl("PlantSoil", .095, .095, .01, (CX + .08, .14, CH + .245), K.SOIL, 20)
K.plant("Plant", CX + .08, .14, CH + .25, .34, .62, colas=False, spread=1.2)
bag("CabBag", CX - .12, .12, CH + .05)
X.jar("CabJar", CX - .08, -.12, CH + .05, .06, .16, 4)

# ---------- polished brass canopy on two columns, the PICKUP sign and a glowing leaf roundel ----------
AY = -D / 2 - .1
ax0, ax1 = X0 - L / 2 - .02, X0 + L / 2 + .02
H = 1.82
for x in (ax0, ax1):
    K.box(f"ColFoot{x:.2f}", (.13, .13, .07), (x, AY, 0), K.WOOD_D, .012)
    K.cyl(f"ColBase{x:.2f}", .055, .055, .05, (x, AY, .07), M["POLISH"], 20)
    K.cyl(f"Col{x:.2f}", .032, .032, H - .12, (x, AY, .12), M["POLISH"], 20)
    for z in (.5, 1.0, 1.5): K.cyl(f"ColRing{x:.2f}{z}", .042, .042, .025, (x, AY, z), K.BRASS, 20)
    K.cyl(f"ColCap{x:.2f}", .05, .05, .04, (x, AY, H - .02), M["POLISH"], 20)
CW_ = ax1 - ax0 + .14
K.box("Canopy", (CW_, .56, .05), ((ax0 + ax1) / 2, AY + .22, H + .02), M["POLISH"], .015)
K.box("CanopyGreen", (CW_ - .06, .5, .02), ((ax0 + ax1) / 2, AY + .22, H + .07), K.GREEN_D, .006)
K.box("CanopyLed", (CW_ - .12, .02, .01), ((ax0 + ax1) / 2, AY + .03, H + .005), M["LED"], .003)
SX = (ax0 + ax1) / 2
K.box("SignBorder", (1.08, .06, .3), (SX, AY, H - .33), M["POLISH"], .02)
K.box("Sign", (1.04, .07, .26), (SX, AY, H - .31), K.GREEN_D, .02)
for dx in (-.4, .4):
    K.tube(f"SignHanger{dx}", [(SX + dx, AY, H - .05), (SX + dx, AY, H + .02)], .01, K.BRASS)
txt = bpy.data.curves.new("SignText", "FONT"); txt.body = "PICKUP"; txt.resolution_u = 3
txt.size = .15; txt.extrude = .006; txt.align_x = "CENTER"; txt.align_y = "CENTER"; txt.space_character = 1.08
fb = os.environ.get("CANOPY_FONT") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts", "Fredoka-SemiBold.ttf")
if os.path.exists(fb): txt.font = bpy.data.fonts.load(fb)
to = K.link(bpy.data.objects.new("SignText", txt), K.CREAM)
to.location = (SX, AY - .037, H - .18); to.rotation_euler = (math.pi / 2, 0, 0)
X.roundel("Roundel", (SX, AY + .02, H + .33), .2, K.GREEN_D, M["POLISH"])
K.box("RoundelFoot", (.14, .06, .2), (SX, AY + .03, H + .07), M["POLISH"], .01)
X.leaf_logo("RoundelLeaf", (SX, AY - .015, H + .33), .62, M["LEAFGLOW"])

K.finish(OUT, "pickup_desk_tier5", ortho=2.9, centre=(-.02, 0, .95))
