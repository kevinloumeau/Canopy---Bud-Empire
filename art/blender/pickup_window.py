"""Canopy online-orders pickup window: one storefront bay on the shop floor's front edge, with a walk-up hatch.

Kevin (2026-10-20) found the first booth a heavy, enclosed green box, then asked for the sign to be part of the
building's exterior and for an actual window in a wall.  So this is a single bay of the storefront (storefront.py):
the same green frame, brass beads, cream sign band lettered in Bricolage and capped cornice, 2.48 m tall, but only
0.2 m deep, with a service hatch where the glazing would be: a tiled kick wall to counter height, an oak ledge out
over the pavement (a bell and a bag waiting), a sliding pane pushed to one side, and an oak shelf inside with a till,
where the glass feed tube (drawn by the map) brings the bags down.

The street face looks along Blender -Y (map +z, the front pavement).  Origin at the wall's footprint centre on the
floor; the inside shelf reaches 0.5 m behind it (+Y) and the ledge 0.22 m in front.  1.8 m wide.

Needs canopy_kit.py one folder up (or next to this file).  Run headless with
    python pickup_window.py -- OUT_DIR
"""
import os, sys, math
try:
    here = os.path.dirname(os.path.abspath(__file__))
    sys.path.insert(0, here); sys.path.insert(0, os.path.dirname(here))
except NameError: pass
import bpy, bmesh
import canopy_kit as K

OUT = K.begin("PickupWindow")
FRAME = K.mat("StorefrontGreen", "#1f6b47", .45)
FRAME_D = K.mat("StorefrontGreenDeep", "#185a3b", .5)
SIGN = K.mat("SignCream", "#f1e7cc", .5)
LETTER = K.mat("SignLetters", "#1f5e40", .5)
KRAFT_D = K.mat("KraftFold", "#a97a4c", .85)
FONT = os.environ.get("CANOPY_FONT") or next((p for p in (os.path.join(d, "fonts", "Bricolage-ExtraBold.ttf") for d in (os.path.dirname(os.path.abspath(__file__)), os.path.dirname(os.path.dirname(os.path.abspath(__file__))))) if os.path.exists(p)), None)

W, H, D = 1.8, 2.48, .2
X0, X1, Y0, Y1 = -W / 2, W / 2, -D / 2, D / 2
z = lambda f: H * f
SILL, HEAD = 1.0, z(.8)          # the hatch: counter height up to the header
PIL = .14                          # pilaster width at each end

def slab(name, x0, x1, y0, y1, z0, z1, m, bevel=.008):
    return K.box(name, (x1 - x0, y1 - y0, z1 - z0), ((x0 + x1) / 2, (y0 + y1) / 2, z0), m, bevel, 1)

# ---------- plinth, kick wall to counter height with inset panels, pilasters ----------
slab("Plinth", X0, X1, Y0 - .03, Y1, 0, z(.045), FRAME_D, .01)
slab("KickWall", X0, X1, Y0, Y1, z(.045), SILL, FRAME)
slab("KickPanel", X0 + PIL + .05, X1 - PIL - .05, Y0 - .012, Y0, z(.08), SILL - .1, FRAME, .006)
slab("KickInset", X0 + PIL + .1, X1 - PIL - .1, Y0 - .016, Y0 - .012, z(.11), SILL - .13, FRAME_D, .004)
slab("KickTrim", X0 + PIL, X1 - PIL, Y0 - .02, Y0 - .01, z(.06), z(.068), K.BRASS, .002)
for s, (a, b) in ((-1, (X0, X0 + PIL)), (1, (X1 - PIL, X1))):
    slab(f"Pilaster{s}", a, b, Y0 - .03, Y1 - .006, z(.045), z(.95), FRAME, .012)
    slab(f"PilasterTrim{s}", (b - .03 if s < 0 else a + .022), (b - .022 if s < 0 else a + .03), Y0 - .036, Y0 - .03, SILL + .05, HEAD - .05, K.BRASS, .002)

# ---------- the hatch: oak ledge through the wall, brass beads, a sliding pane pushed to the left ----------
slab("Ledge", X0 + PIL - .02, X1 - PIL + .02, Y0 - .22, Y1, SILL - .045, SILL, K.OAK, .01)
slab("LedgeEdge", X0 + PIL - .02, X1 - PIL + .02, Y0 - .23, Y0 - .22, SILL - .04, SILL - .02, K.BRASS, .002)
for s in (-1, 1):
    o = slab(f"Bracket{s}", s * (W / 2 - PIL - .12) - .015, s * (W / 2 - PIL - .12) + .015, Y0 - .2, Y0, SILL - .2, SILL - .17, K.BRASS, .004)
    o.rotation_euler.x = -.7
a, b = X0 + PIL, X1 - PIL
for x in (a + .006, b - .006):
    slab(f"Bead{x:.2f}", x - .006, x + .006, Y0 - .018, Y1, SILL, HEAD, K.BRASS, .002)
slab("BeadTop", a, b, Y0 - .018, Y1, HEAD - .012, HEAD, K.BRASS, .002)
PW = (b - a) / 2
slab("Pane", a + .012, a + PW, -.02, -.008, SILL + .02, HEAD - .03, K.GLASS, 0)
slab("PaneStile", a + PW - .02, a + PW, -.024, -.004, SILL + .02, HEAD - .03, K.BRASS, .003)
for zz in (SILL + .02, HEAD - .05):
    slab(f"PaneRail{zz:.2f}", a + .012, a + PW, -.024, -.004, zz, zz + .025, K.BRASS, .003)

# ---------- header, sign band, cap: the storefront's ----------
slab("Header", X0, X1, Y0 - .025, Y1 + .025, HEAD, z(.815), FRAME, .008)
slab("SignBand", X0, X1, Y0, Y1, z(.815), z(.95), FRAME)
slab("SignRailLow", X0, X1, Y0 - .024, Y0, z(.815), z(.825), K.BRASS, .003)
slab("SignRailTop", X0, X1, Y0 - .024, Y0, z(.945), z(.955), K.BRASS, .003)
slab("SignFrame", X0 + .04, X1 - .04, Y0 - .016, Y0 - .004, z(.827), z(.943), K.BRASS, .002)
slab("SignPanel", X0 + .048, X1 - .048, Y0 - .02, Y0, z(.83), z(.94), SIGN, .004)
cu = bpy.data.curves.new("SignText", "FONT"); cu.body = "ONLINE PICKUP"
cu.size = z(.074); cu.extrude = .004; cu.align_x = "CENTER"; cu.align_y = "CENTER"; cu.resolution_u = 2
if FONT: cu.font = bpy.data.fonts.load(FONT)
o = K.link(bpy.data.objects.new("SignText", cu), LETTER); o.location = (0, Y0 - .026, z(.885)); o.rotation_euler = (math.pi / 2, 0, 0)
slab("Cap", X0 - .02, X1 + .02, Y0 - .07, Y1 + .04, z(.95), z(1.0), FRAME, .03)
slab("CapTrim", X0, X1, Y0 - .076, Y0 - .07, z(.96), z(.967), K.BRASS, .002)

# ---------- on the ledge: a brass bell and a bag waiting ----------
K.cyl("BellBase", .045, .045, .012, (.42, Y0 - .1, SILL), K.WOOD, 12)
K.cyl("Bell", .035, .008, .04, (.42, Y0 - .1, SILL + .012), K.BRASS, 12)

def bag(name, x, y, zz, s=1.):
    w, d, h = .17 * s, .1 * s, .26 * s
    slab(name, x - w / 2, x + w / 2, y - d / 2, y + d / 2, zz, zz + h, K.KRAFT, .006)
    slab(name + "Fold", x - w / 2 - .003, x + w / 2 + .003, y - d / 2 - .003, y + d / 2 + .003, zz + h - .07 * s, zz + h - .048 * s, KRAFT_D, .004)
    slab(name + "Label", x - .04 * s, x + .04 * s, y - d / 2 - .005, y - d / 2 - .001, zz + .09 * s, zz + .17 * s, K.GREEN, .002)
    slab(name + "Handle", x - w / 4, x + w / 4, y - .005, y + .005, zz + h, zz + h + .06 * s, KRAFT_D, 0)
bag("LedgeBag", -.25, Y0 - .1, SILL)

# ---------- inside: an oak shelf on two legs with the till, where the feed tube comes down ----------
slab("InnerShelf", a, b, Y1, Y1 + .5, SILL - .045, SILL, K.OAK, .008)
for s in (-1, 1):
    slab(f"ShelfLeg{s}", s * (W / 2 - PIL - .08) - .03, s * (W / 2 - PIL - .08) + .03, Y1 + .38, Y1 + .44, 0, SILL - .045, K.OAK, .006)
slab("Till", .05, .29, Y1 + .1, Y1 + .26, SILL, SILL + .03, K.DARK, .006)
o = slab("TillScreen", .06, .28, Y1 + .22, Y1 + .24, SILL + .03, SILL + .18, K.DARK, .004); o.rotation_euler.x = .35

K.finish(OUT, "pickup_window", ortho=3.0, centre=(0, 0, 1.2))
