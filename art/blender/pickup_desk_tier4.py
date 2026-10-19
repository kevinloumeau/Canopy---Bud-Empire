"""Canopy pickup desk, tier 4 (Lv 50): the premium step up from tier 3 at the same footprint and facing.

Walnut counter with brass-framed panels and a marble top on a warm light strip, a glass-fronted back case of
order bags and jars, a green side cabinet with a backlit leaf panel, and the brass arch with the PICKUP sign
and a glowing leaf beside the lettering.

Needs canopy_kit.py and luxe_parts.py in the same folder.  Run headless with
    blender -b -P pickup_desk_tier4.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import bpy
import canopy_kit as K
OUT = K.begin("PickupDeskTier4")
import luxe_parts as X
M = X.mats()
KRAFT_D = K.mat("KraftFold", "#b47f4c", .85)

def arc_pts(c, r, a0, a1, n, y):
    return [(c[0] + r * math.cos(a0 + (a1 - a0) * i / n), y, c[1] + r * math.sin(a0 + (a1 - a0) * i / n)) for i in range(n + 1)]

def panel(tag, cx, y, z0, w, h):
    """A walnut panel with a brass frame on the -Y face."""
    K.box(tag, (w, .02, h), (cx, y - .008, z0), K.WOOD, .006)
    for dz in (z0 + .03, z0 + h - .03):
        K.box(f"{tag}H{dz:.2f}", (w - .05, .022, .014), (cx, y - .02, dz - .007), K.BRASS, .004)
    for dx in (-(w - .05) / 2, (w - .05) / 2):
        K.box(f"{tag}V{dx:.2f}", (.014, .022, h - .06), (cx + dx, y - .02, z0 + .03), K.BRASS, .004)

def bag(name, x, y, z, tick=True):
    w, d, h = .17, .1, .26
    K.box(name, (w, d, h), (x, y, z), K.KRAFT, .008)
    K.box(name + "Fold", (w + .006, d + .006, .022), (x, y, z + h - .07), KRAFT_D, .005)
    K.tube(name + "Handle", [(x - .035, y, z + h - .01), (x - .035, y, z + h + .06), (x + .035, y, z + h + .06), (x + .035, y, z + h - .01)], .006, K.KRAFT)
    if tick:
        K.box(name + "Label", (.085, .006, .085), (x, y - d / 2 - .002, z + .09), K.GREEN, .004)

# ---------- walnut counter, same plan as tier 3 ----------
L, D, X0 = 1.3, .8, -.2
K.box("Plinth", (L + .1, D + .1, .1), (X0, 0, 0), K.GREEN_D, .015)
K.box("KickBrass", (L + .12, .02, .035), (X0, -(D + .1) / 2 - .005, .035), K.BRASS, .006)
K.box("KickBrassSide", (.02, D + .12, .035), (X0 - (L + .1) / 2 - .005, 0, .035), K.BRASS, .006)
K.box("Body", (L, D, .74), (X0, 0, .1), K.WOOD, .01)
PW = (L - .12) / 3
for i in range(3):
    panel(f"Front{i}", X0 - L / 2 + .06 + PW * (i + .5), -D / 2, .18, PW - .04, .5)
for sx in (-1, 1):
    K.cyl(f"Column{sx}", .028, .028, .66, (X0 + sx * L / 2, -D / 2, .12), K.BRASS, 16)
K.box("Band", (L + .02, D + .02, .035), (X0, 0, .8), K.BRASS, .008)
K.box("LedStrip", (L - .04, .012, .012), (X0, -D / 2 - .042, .806), M["LED"], .003)
X.marble_top("Top", (L + .12, D + .12, .08), (X0, 0, .835))
TOP = .915
K.box("LipBrass", (L + .12, .016, .02), (X0, -(D + .12) / 2 - .006, .855), K.BRASS, .005)
# top details: green leather mat with a brass edge, call bell, two display jars
K.box("MatEdge", (.36, .24, .008), (X0 - .3, -.12, TOP), K.BRASS, .003)
K.box("Mat", (.34, .22, .012), (X0 - .3, -.12, TOP + .002), K.GREEN, .004)
K.cyl("BellBase", .05, .05, .015, (X0 + .45, -.22, TOP), K.WOOD_D, 20)
K.cyl("Bell", .04, .012, .045, (X0 + .45, -.22, TOP + .015), M["POLISH"], 20)
for i, x in enumerate((X0 + .12, X0 + .27)):
    X.jar(f"TopJar{i}", x, -.2, TOP, .055, .14, 3)

# ---------- glass-fronted back case of bags, warm lit ----------
BY = D / 2 - .16
K.box("CaseBase", (L - .1, .28, .06), (X0 + .05, BY, TOP), K.WOOD_D, .01)
K.box("CaseBack", (L - .1, .03, .4), (X0 + .05, BY + .125, TOP + .06), M["BACKLIGHT"], .004)
K.box("CaseTop", (L - .08, .3, .03), (X0 + .05, BY, TOP + .46), K.WOOD_D, .01)
K.box("CaseTopBrass", (L - .07, .31, .012), (X0 + .05, BY, TOP + .46), K.BRASS, .004)
for x in (X0 + .05 - (L - .1) / 2, X0 + .05 + (L - .1) / 2):
    K.box(f"CasePost{x:.2f}", (.03, .28, .4), (x, BY, TOP + .06), K.BRASS, .006)
K.box("CaseGlass", (L - .14, .006, .4), (X0 + .05, BY - .135, TOP + .06), M["JARGLASS"], 0)
for i in range(4):
    bag(f"Bag{i}", X0 - .42 + .08 + i * .27, BY, TOP + .06, tick=i != 2)

# ---------- green side cabinet with a backlit leaf panel ----------
CX, CW, CD, CH = X0 + L / 2 + .3, .5, .62, .82
K.box("Cabinet", (CW, CD, CH), (CX, .02, 0), K.GREEN, .015)
K.box("CabinetKick", (CW + .02, CD + .02, .05), (CX, .02, 0), K.GREEN_D, .01)
X.marble_top("CabinetTop", (CW + .05, CD + .05, .05), (CX, .02, CH), .02)
K.box("CabLedFront", (CW - .04, .012, .01), (CX, .02 - CD / 2 - .02, CH - .01), M["LED"], .003)
for face in ("-Y", "+X"):
    if face == "-Y":
        K.box("LeafPanel", (.3, .012, .36), (CX, .02 - CD / 2 - .004, .26), M["BACKLIGHT"], .004)
        K.box("LeafPanelFrame", (.34, .01, .4), (CX, .02 - CD / 2 + .001, .24), K.BRASS, .004)
        X.leaf_logo("LeafFront", (CX, .02 - CD / 2 - .014, .44), .55, K.GREEN_D)
    else:
        K.box("LeafPanelSide", (.012, .36, .36), (CX + CW / 2 + .004, .02, .26), M["BACKLIGHT"], .004)
        K.box("LeafPanelSideFrame", (.01, .4, .4), (CX + CW / 2 - .001, .02, .24), K.BRASS, .004)
        X.leaf_logo("LeafSide", (CX + CW / 2 + .014, .02, .44), .55, K.GREEN_D, "+X")
for i, (dx, dy) in enumerate([(-.12, .12), (.1, .14)]):
    bag(f"CabBag{i}", CX + dx, .02 + dy, CH + .05, tick=i == 1)
X.jar("CabJar", CX, -.12, CH + .05, .06, .16, 4)

# ---------- brass arch with the PICKUP sign and a glowing leaf ----------
AY = -D / 2 - .1
ax0, ax1 = X0 - L / 2 - .02, X0 + L / 2 + .02
H, R = 1.8, .22
pts = [(ax0, AY, .06), (ax0, AY, H - R)] + arc_pts((ax0 + R, H - R), R, math.pi, math.pi / 2, 8, AY)[1:]
pts += arc_pts((ax1 - R, H - R), R, math.pi / 2, 0, 8, AY) + [(ax1, AY, .06)]
K.tube("Arch", pts, .034, M["POLISH"])
K.tube("ArchInner", [(p[0] + (.05 if p[0] < X0 else -.05), p[1], min(p[2], H - .05)) for p in pts[1:-1]], .012, K.BRASS)
for x in (ax0, ax1):
    K.box(f"ArchFoot{x:.2f}", (.12, .12, .07), (x, AY, 0), K.WOOD_D, .012)
    K.cyl(f"ArchCollar{x:.2f}", .048, .048, .04, (x, AY, .07), K.BRASS, 20)
    K.cyl(f"ArchFinial{x:.2f}", .04, .04, .04, (x, AY, 1.0), K.BRASS, 20)
SX = (ax0 + ax1) / 2
K.box("SignBorder", (1.08, .06, .3), (SX, AY, H - .31), K.BRASS, .02)
K.box("Sign", (1.04, .07, .26), (SX, AY, H - .29), K.GREEN_D, .02)
for dx in (-.36, .36):
    K.tube(f"SignHanger{dx}", [(SX + dx, AY, H - .01), (SX + dx, AY, H + .03)], .01, K.BRASS)
X.leaf_logo("SignLeaf", (SX - .38, AY - .037, H - .16), .36, M["LEAFGLOW"])
txt = bpy.data.curves.new("SignText", "FONT"); txt.body = "PICKUP"; txt.resolution_u = 3
txt.size = .15; txt.extrude = .006; txt.align_x = "CENTER"; txt.align_y = "CENTER"; txt.space_character = 1.08
fb = os.environ.get("CANOPY_FONT") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts", "Fredoka-SemiBold.ttf")
if os.path.exists(fb): txt.font = bpy.data.fonts.load(fb)
to = K.link(bpy.data.objects.new("SignText", txt), K.CREAM)
to.location = (SX + .07, AY - .037, H - .16); to.rotation_euler = (math.pi / 2, 0, 0)

K.finish(OUT, "pickup_desk_tier4", ortho=2.75, centre=(-.02, 0, .85))
