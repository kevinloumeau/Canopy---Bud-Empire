"""Canopy order desk, tier 5 (Lv 75): the flagship compact counter, same footprint and facing as tiers 1-4.

A fluted oak counter on a green tiled plinth under a marble top, a heavy polished brass arch into the ORDER pill
sign with a glowing leaf roundel on its crown, a slim tablet till for the budtender, a card reader for the
customer, a little glass display of jars and a potted plant at the end.

Needs canopy_kit.py and luxe_parts.py in the same folder.  Run headless with
    blender -b -P order_desk_tier5.py -- OUT_DIR
Signs use fonts/Fredoka-SemiBold.ttf next to this file; set CANOPY_FONT to a .ttf/.otf to change it.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import bpy
import canopy_kit as K

OUT = K.begin("OrderDeskTier5")
import luxe_parts as X
M = X.mats()
SIGNTXT = K.mat("SignLetters", "#fbf0d2", .45, 0, .15)
PLASTIC = K.mat("Terminal", "#3c3f42", .45)
SCREEN = K.mat("ReaderScreen", "#b9d9a0", .3, 0, .7)
KEYS = K.mat("Keys", "#e8e2d2", .5)
POTCREAM = K.mat("PotCream", "#ece2cc", .5)

def arc_pts(c, r, a0, a1, n, y):
    return [(c[0] + r * math.cos(a0 + (a1 - a0) * i / n), y, c[1] + r * math.sin(a0 + (a1 - a0) * i / n)) for i in range(n + 1)]

# ---------- fluted oak counter on a green tiled plinth ----------
L, D, H = 1.15, .62, .9
K.box("Plinth", (L + .08, D + .08, .12), (0, 0, 0), K.GREEN_D, .02)
X.tile_band("PlinthTile", -(L + .08) / 2 + .01, (L + .08) / 2 - .01, -(D + .08) / 2 - .002, .015, .09, 1, .09)
X.tile_band("PlinthTileSide", -(D + .08) / 2 + .01, (D + .08) / 2 - .01, (L + .08) / 2 + .002, .015, .09, 1, .09, "+X")
K.box("PlinthBrass", (L + .09, D + .09, .02), (0, 0, .12), M["POLISH"], .006)
K.box("Body", (L, D, H - .19), (0, 0, .14), K.WOOD, .01)
X.fluted("Flute", -L / 2 + .02, L / 2 - .02, -D / 2 - .004, .16, H - .27)
X.fluted("FluteEnd", -D / 2 + .02, D / 2 - .02, L / 2 + .004, .16, H - .27, facing="+X")
for sx in (-1, 1):
    K.box(f"Corner{sx}", (.05, .05, H - .21), (sx * L / 2, -D / 2, .14), M["POLISH"], .01)
K.box("Corner+XB", (.05, .05, H - .21), (L / 2, D / 2, .14), M["POLISH"], .01)
K.box("TopBand", (L + .04, D + .04, .03), (0, 0, H - .08), M["POLISH"], .008)
K.box("LedStrip", (L - .04, .012, .012), (0, -D / 2 - .04, H - .075), M["LED"], .003)
X.marble_top("Top", (L + .14, D + .14, .09), (0, 0, H - .06), .04)
TOP = H + .03

# ---------- heavy brass arch into the ORDER pill sign, glowing leaf roundel on the crown ----------
AY = -D / 2 + .02
ax0, ax1 = -L / 2 + .02, L / 2 - .02
AH, R = 1.9, .2
SW, SH = ax1 - ax0 - .06, .36
SZ = AH - SH + .02
for sx, x in ((-1, ax0), (1, ax1)):
    pts = [(x, AY, TOP), (x, AY, AH - SH / 2 - R)]
    pts += arc_pts((x - sx * R, AH - SH / 2 - R), R, 0 if sx > 0 else math.pi, math.pi / 2, 8, AY)[1:]
    K.tube(f"ArchPost{sx}", pts, .042, M["POLISH"])
    K.cyl(f"ArchCollar{sx}", .06, .055, .09, (x, AY, TOP), M["POLISH"], 24)
    for z in (TOP + .3, TOP + .55): K.cyl(f"ArchRing{sx}{z:.2f}", .052, .052, .03, (x, AY, z), K.BRASS, 24)
def pill(tag, w, h, d, z, m, n=16):
    r = h / 2; prof = []
    for sx, a0 in ((1, -math.pi / 2), (-1, math.pi / 2)):
        for i in range(n + 1):
            a = a0 + math.pi * i / n
            prof.append((sx * (w / 2 - r) + r * math.cos(a), r + r * math.sin(a)))
    k = len(prof)
    verts = [(x, -d / 2, zz) for x, zz in prof] + [(x, d / 2, zz) for x, zz in prof]
    faces = [tuple(range(k))[::-1], tuple(range(k, 2 * k))] + [(i, (i + 1) % k, k + (i + 1) % k, k + i) for i in range(k)]
    me = bpy.data.meshes.new(tag); me.from_pydata(verts, [], faces)
    o = K.link(bpy.data.objects.new(tag, me), m); o.location = (0, AY, z)
    bv = o.modifiers.new("Bevel", "BEVEL"); bv.width = .008; bv.segments = 2; bv.limit_method = "ANGLE"
    return o
pill("SignBorder", SW + .07, SH + .07, .065, SZ - .035, M["POLISH"])
pill("Sign", SW, SH, .08, SZ, K.GREEN_D)
txt = bpy.data.curves.new("SignText", "FONT"); txt.body = "ORDER"
txt.size = .23; txt.extrude = .008; txt.align_x = "CENTER"; txt.align_y = "CENTER"; txt.space_character = 1.05
fb = os.environ.get("CANOPY_FONT") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts", "Fredoka-SemiBold.ttf")
if os.path.exists(fb): txt.font = bpy.data.fonts.load(fb)
for side, (yy, rz) in enumerate(((AY - .044, 0), (AY + .044, math.pi))):
    o = bpy.data.objects.new(f"SignText{side}", txt)
    K.link(o, SIGNTXT); o.location = (0, yy, SZ + SH / 2); o.rotation_euler = (math.pi / 2, 0, rz)
RZ = SZ + SH + .2
K.box("RoundelFoot", (.12, .05, .12), (0, AY, SZ + SH + .01), M["POLISH"], .01)
X.roundel("Roundel", (0, AY + .02, RZ), .17, K.GREEN_D, M["POLISH"])
X.leaf_logo("RoundelLeaf", (0, AY - .015, RZ), .52, M["LEAFGLOW"])

# ---------- slim tablet till (budtender side) and card reader (customer side) ----------
K.cyl("TabletFoot", .06, .07, .02, (0, .08, TOP), M["POLISH"], 20)
K.box("TabletNeck", (.03, .03, .16), (0, .09, TOP + .02), M["POLISH"], .008)
o = K.box("Tablet", (.34, .018, .23), (0, .08, TOP + .14), PLASTIC, .01); o.rotation_euler.x = .35
o = K.box("TillGlass", (.31, .004, .2), (0, .07, TOP + .155), K.DARK, .002); o.rotation_euler.x = .35
CX, CY = .3, -.14
K.box("Cradle", (.13, .11, .03), (CX, CY + .02, TOP), M["POLISH"], .008)
rd = K.box("Reader", (.14, .22, .045), (CX, CY, TOP + .02), PLASTIC, .016); rd.rotation_euler.x = .5
for i, (x, y, w, d, m) in enumerate(((0, .05, .1, .07, SCREEN), (0, -.04, .09, .08, KEYS))):
    k = K.box(("ReaderScreen", "Key11")[i], (w, d, .006), (0, 0, 0), m, .002); k.parent = rd; k.location = (x, y, .045)

# ---------- little glass display of jars and a potted plant ----------
GX, GY = -.36, .02
K.box("DisplayBase", (.3, .26, .025), (GX, GY, TOP), M["POLISH"], .006)
K.box("DisplayGlass", (.28, .24, .2), (GX, GY, TOP + .025), M["JARGLASS"], .004)
K.box("DisplayCap", (.3, .26, .018), (GX, GY, TOP + .225), M["POLISH"], .005)
for i, dx in enumerate((-.065, .065)):
    X.jar(f"DisplayJar{i}", GX + dx, GY, TOP + .025, .045, .12, 3)
PX, PY = .38, .17
K.cyl("PlantPot", .085, .07, .17, (PX, PY, TOP), POTCREAM, 24)
K.cyl("PlantPotRim", .092, .092, .025, (PX, PY, TOP + .155), K.BRASS, 24)
K.cyl("PlantSoil", .08, .08, .01, (PX, PY, TOP + .172), K.SOIL, 20)
K.plant("Plant", PX, PY, TOP + .175, .26, .5, colas=False, spread=1.2)

K.finish(OUT, "order_desk_tier5", ortho=2.6, centre=(0, 0, 1.1))
