"""Canopy online-orders pickup window: an open walk-up counter set into the shop floor's front edge.

Kevin (2026-10-20) found the first booth a heavy, enclosed green box; this one is open and part of the building: the
front baseboard (green tile, brass rail, cream cap) rises into a counter base, an oak top reaches out over the
pavement, and two slim brass posts carry a cream sign bar ("ONLINE PICKUP") with globe sconces (material "LampGlow",
lit at night by the map). On the top, a bell, a till and a bag waiting; the bags come up a glass tube into the
counter's back (drawn by the map, not here).  The clerk is the game's own staff figure, standing in the open behind it.

The street face looks along Blender -Y (map +z, the front pavement).  Origin at the footprint centre on the floor.
1.7 m wide, 0.6 m deep (the top reaches .14 m further out), counter 1.0 m, sign bar to 2.57 m.

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
TILE = K.mat("BoothTile", "#1f5e40", .45)
TILE_D = K.mat("BoothTileDeep", "#174a33", .5)
CAP = K.mat("BoothCap", "#e1dbc0", .55)
SIGNTXT = K.mat("SignLetters", "#1e4a37", .5)
LAMP = K.mat("LampGlow", "#fff1cf", .35, 0, 1.2)
KRAFT_D = K.mat("KraftFold", "#a97a4c", .85)

W, D, TOP = 1.7, .6, 1.0
FY = -D / 2

def b(name, size, loc, m, bevel=.006, seg=1):
    return K.box(name, size, loc, m, bevel, seg)

# ---------- counter base: the baseboard's green tile, brass rail and cream cap, risen to counter height ----------
b("Base", (W, D - .1, TOP - .05), (0, .05, 0), TILE)
b("BaseFront", (W, .06, TOP - .05), (0, FY + .03, 0), TILE, .004)
for s in (-1, 1):
    b(f"Panel{s}", (W / 2 - .18, .012, .52), (s * W / 4, FY - .004, .2), TILE_D, .004)
b("KickRail", (W - .06, .02, .025), (0, FY - .012, .12), K.BRASS, .005)
b("CapRail", (W + .02, .02, .025), (0, FY - .012, TOP - .09), K.BRASS, .005)
# oak top, reaching out over the pavement, with a brass edge
b("Top", (W + .1, D + .2, .05), (0, -.04, TOP - .05), K.OAK, .01)
b("TopEdge", (W + .1, .02, .02), (0, FY - .15, TOP - .04), K.BRASS, .004)

# ---------- two slim brass posts carrying the sign bar ----------
SB = 2.3    # sign bar bottom, high enough to see the clerk under it
for s in (-1, 1):
    x = s * (W / 2 - .06)
    K.cyl(f"Post{s}", .022, .022, SB - TOP, (x, -.05, TOP), K.BRASS, 10)
    K.cyl(f"PostFoot{s}", .04, .03, .03, (x, -.05, TOP), K.BRASS, 10)
b("SignBar", (W + .04, .08, .24), (0, -.05, SB), CAP, .01)
b("SignTrim", (W + .06, .09, .02), (0, -.05, SB - .01), K.BRASS, .004)
b("SignCap", (W + .06, .1, .03), (0, -.05, SB + .24), TILE, .006)
txt = bpy.data.curves.new("SignText", "FONT"); txt.body = "ONLINE PICKUP"; txt.resolution_u = 2
txt.size = .135; txt.extrude = 0; txt.align_x = "CENTER"; txt.align_y = "CENTER"; txt.space_character = 1.04
fb = os.environ.get("CANOPY_FONT") or next((p for p in (os.path.join(d, "fonts", "Fredoka-SemiBold.ttf") for d in sys.path[:2]) if os.path.exists(p)), None)
if fb: txt.font = bpy.data.fonts.load(fb)
o = bpy.data.objects.new("SignText", txt); K.link(o, SIGNTXT)
o.location = (0, -.05 - .041, SB + .12); o.rotation_euler = (math.pi / 2, 0, 0)

# globe sconces hanging under the sign bar's ends
for s in (-1, 1):
    x = s * (W / 2 - .25)
    K.cyl(f"LampStem{s}", .006, .006, .08, (x, -.05, SB - .08), K.BRASS, 6)
    g = bpy.data.meshes.new(f"Globe{s}")
    bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=10, v_segments=6, radius=.05); bm.to_mesh(g); bm.free()
    for p in g.polygons: p.use_smooth = True
    go = K.link(bpy.data.objects.new(f"LampGlobe{s}", g), LAMP); go.location = (x, -.05, SB - .12)

# ---------- on the top: a bell, a till facing the clerk, a bag waiting ----------
K.cyl("BellBase", .045, .045, .012, (.45, FY - .02, TOP), K.WOOD, 12)
K.cyl("Bell", .035, .008, .04, (.45, FY - .02, TOP + .012), K.BRASS, 12)
b("Till", (.24, .16, .03), (.1, .12, TOP), K.DARK, .006)
o = b("TillScreen", (.22, .02, .15), (.1, .16, TOP + .03), K.DARK, .006); o.rotation_euler.x = .35

def bag(name, x, y, z, s=1.):
    w, d, h = .17 * s, .1 * s, .26 * s
    b(name, (w, d, h), (x, y, z), K.KRAFT, .006)
    b(name + "Fold", (w + .006, d + .006, .022), (x, y, z + h - .07 * s), KRAFT_D, .004)
    b(name + "Label", (.08 * s, .006, .08 * s), (x, y - d / 2 - .002, z + .09 * s), K.GREEN, .003)
    b(name + "Handle", (w * .5, .01, .06 * s), (x, y, z + h), KRAFT_D, 0)

bag("LedgeBag", -.35, FY + .02, TOP)
K.finish(OUT, "pickup_window", ortho=3.0, centre=(0, 0, 1.0))
