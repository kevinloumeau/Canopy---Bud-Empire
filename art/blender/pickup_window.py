"""Canopy online-orders pickup window: a little walk-up kiosk booth on the shop floor's front edge.

A green-tiled booth (cream cornice, brass trim) with a serving hatch in its street face: an oak ledge outside with a
brass bell and a bag waiting, a sliding glass pane pushed to one side, two brass globe sconces (material "LampGlow",
lit at night by the map) and an "ONLINE PICKUP" sign plate on the fascia.  Inside, an oak shelf of kraft bags; the
clerk is the game's own staff figure, stood just behind the hatch.

The street face looks along Blender -Y (map +z, the front pavement).  Origin at the footprint centre on the floor.
Footprint 1.6 m wide by 1.0 m deep (2.7 by 1.69 map units at 1.69 a metre), 2.3 m tall; the ledge reaches .26 m past
the front.

Needs canopy_kit.py one folder up (or next to this file).  Run headless with
    python pickup_window.py -- OUT_DIR        (bpy as a module)   or   blender -b -P pickup_window.py -- OUT_DIR
"""
import os, sys, math
try:
    here = os.path.dirname(os.path.abspath(__file__))
    sys.path.insert(0, here); sys.path.insert(0, os.path.dirname(here))
except NameError: pass
import bpy
import canopy_kit as K

OUT = K.begin("PickupWindow")
TILE = K.mat("BoothTile", "#1f5e40", .45)
TILE_D = K.mat("BoothTileDeep", "#174a33", .5)
CAP = K.mat("BoothCap", "#e1dbc0", .55)
INSIDE = K.mat("BoothInside", "#efe3c8", .7)
SIGNTXT = K.mat("SignLetters", "#1e4a37", .5)
LAMP = K.mat("LampGlow", "#fff1cf", .35, 0, 1.2)
KRAFT_D = K.mat("KraftFold", "#a97a4c", .85)

W, D, H = 1.6, 1.0, 2.18
FY = -D / 2                      # the street face
SILL, HEAD = 1.0, 1.82           # the hatch opening, bottom and top
HW = 1.08                        # hatch width
T = .07                          # wall thickness

def b(name, size, loc, m, bevel=.006, seg=1):
    return K.box(name, size, loc, m, bevel, seg)

# ---------- plinth, walls ----------
b("Plinth", (W + .04, D + .04, .08), (0, 0, 0), TILE_D, .01)
b("FrontLow", (W, T, SILL - .08), (0, FY + T / 2, .08), TILE)
for s in (-1, 1):
    b(f"Side{'L' if s < 0 else 'R'}", (T, D - T, H - .08), (s * (W / 2 - T / 2), T / 2, .08), TILE)
    b(f"Post{'L' if s < 0 else 'R'}", ((W - HW) / 2, T, HEAD - SILL), (s * (HW / 2 + (W - HW) / 4), FY + T / 2, SILL), TILE)
b("Back", (W - 2 * T, T, H - .08), (0, D / 2 - T / 2, .08), INSIDE)
b("Fascia", (W, T, H - HEAD), (0, FY + T / 2, HEAD), TILE)
# recessed panels and a brass kick rail on the lower front
for s in (-1, 1):
    b(f"Panel{s}", (W / 2 - .2, .012, .5), (s * W / 4, FY - .004, .28), TILE_D, .004)
b("KickRail", (W - .08, .02, .025), (0, FY - .012, .2), K.BRASS, .006)
# inside floor, so the hatch never shows the pavement through the booth
b("Floor", (W - 2 * T, D - 2 * T, .02), (0, 0, .08), INSIDE, 0)

# ---------- roof: cream cornice and a green cap ----------
b("Cornice", (W + .14, D + .14, .07), (0, 0, H), CAP, .012)
b("Roof", (W + .06, D + .06, .05), (0, 0, H + .07), TILE_D, .01)

# ---------- the hatch: oak ledge out over the pavement, brass frame, sliding glass pushed aside ----------
b("Ledge", (HW + .18, .36, .045), (0, FY - .08, SILL - .045), K.OAK, .01)
b("LedgeEdge", (HW + .18, .02, .02), (0, FY - .265, SILL - .035), K.BRASS, .005)
b("InnerSill", (W - 2 * T, .5, .04), (0, FY + T + .25, SILL - .04), K.OAK, .006)
for s in (-1, 1):   # brackets under the ledge
    o = b(f"Bracket{s}", (.03, .2, .03), (s * (HW / 2 - .05), FY - .09, SILL - .2), K.BRASS, .006); o.rotation_euler.x = -.75
for s in (-1, 1):
    b(f"FrameSide{s}", (.03, .03, HEAD - SILL), (s * HW / 2, FY - .005, SILL), K.BRASS, .006)
b("FrameTop", (HW + .03, .03, .03), (0, FY - .005, HEAD - .03), K.BRASS, .006)
b("Track", (HW, .05, .02), (0, FY + .03, HEAD - .05), K.BRASS, .004)
PW = HW / 2 - .02
gx = -HW / 2 + PW / 2 + .02
b("Pane", (PW, .012, HEAD - SILL - .1), (gx, FY + .04, SILL + .03), K.GLASS, 0)
for dz in (SILL + .02, HEAD - .07):
    b(f"PaneRail{dz:.2f}", (PW, .018, .025), (gx, FY + .04, dz), K.BRASS, .004)
b("PaneStile", (.025, .018, HEAD - SILL - .08), (gx + PW / 2, FY + .04, SILL + .02), K.BRASS, .004)

# ---------- sign plate on the fascia ----------
SZ = HEAD + (H - HEAD) / 2
b("SignPlate", (W - .16, .02, .24), (0, FY - .01, SZ - .12), CAP, .008)
b("SignRim", (W - .12, .012, .27), (0, FY - .004, SZ - .135), K.BRASS, .006)
txt = bpy.data.curves.new("SignText", "FONT"); txt.body = "ONLINE PICKUP"; txt.resolution_u = 2
txt.size = .135; txt.extrude = 0; txt.align_x = "CENTER"; txt.align_y = "CENTER"; txt.space_character = 1.04
fb = os.environ.get("CANOPY_FONT") or next((p for p in (os.path.join(d, "fonts", "Fredoka-SemiBold.ttf") for d in sys.path[:2]) if os.path.exists(p)), None)
if fb: txt.font = bpy.data.fonts.load(fb)
o = bpy.data.objects.new("SignText", txt); K.link(o, SIGNTXT)
o.location = (0, FY - .022, SZ - .005); o.rotation_euler = (math.pi / 2, 0, 0)

# ---------- brass globe sconces either side of the hatch ----------
for s in (-1, 1):
    x = s * (W / 2 - .13)
    b(f"SconcePlate{s}", (.07, .015, .1), (x, FY - .007, HEAD - .02), K.BRASS, .004)
    b(f"SconceArm{s}", (.02, .1, .02), (x, FY - .06, HEAD + .02), K.BRASS, .004)
    g = bpy.data.meshes.new(f"Globe{s}")
    import bmesh
    bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=10, v_segments=6, radius=.055); bm.to_mesh(g); bm.free()
    for p in g.polygons: p.use_smooth = True
    go = K.link(bpy.data.objects.new(f"LampGlobe{s}", g), LAMP); go.location = (x, FY - .11, HEAD - .03)

# ---------- on the ledge: a brass bell and a bag waiting to be picked up ----------
K.cyl("BellBase", .045, .045, .012, (.38, FY - .12, SILL), K.WOOD, 12)
K.cyl("Bell", .035, .008, .04, (.38, FY - .12, SILL + .012), K.BRASS, 12)

def bag(name, x, y, z, s=1.):
    w, d, h = .17 * s, .1 * s, .26 * s
    b(name, (w, d, h), (x, y, z), K.KRAFT, .006)
    b(name + "Fold", (w + .006, d + .006, .022), (x, y, z + h - .07 * s), KRAFT_D, .004)
    b(name + "Label", (.08 * s, .006, .08 * s), (x, y - d / 2 - .002, z + .09 * s), K.GREEN, .003)
    b(name + "Handle", (w * .5, .01, .06 * s), (x, y, z + h), KRAFT_D, 0)

bag("LedgeBag", -.3, FY - .1, SILL)
# ---------- inside: oak shelf of bags against the back wall, and a till on the inner sill ----------
b("Shelf", (W - 2 * T, .26, .035), (0, D / 2 - T - .13, 1.18), K.OAK, .006)
for i, x in enumerate((-.5, -.25, 0, .25, .5)):
    bag(f"ShelfBag{i}", x, D / 2 - T - .13, 1.215, .9)
b("Till", (.22, .16, .03), (.28, FY + T + .2, SILL), K.DARK, .006)
o = b("TillScreen", (.2, .02, .14), (.28, FY + T + .27, SILL + .03), K.DARK, .006); o.rotation_euler.x = -.35

K.finish(OUT, "pickup_window", ortho=3.0, centre=(0, 0, 1.1))
