"""Canopy pickup desk (tier 1), modelled from the current sprite.

An oak-slatted counter on a green base under a wooden arch with the PICKUP sign, a crate of kraft bags along the
back, a potted plant, three jars and a green mat, with a green end cabinet at +x.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P pickup_desk_tier1.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
Signs use fonts/Fredoka-SemiBold.ttf next to this file; set CANOPY_FONT to a .ttf/.otf to change it.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy
import canopy_kit as K

OUT = K.begin("PickupDeskTier1")
rnd = K.rnd
TOPSTONE = K.mat("CreamTop", "#f0dfb8", .4)
LIGHTOAK = K.mat("LightOak", "#c9935c", .6)
KRAFT_D = K.mat("KraftFold", "#b47f4c", .85)
SIGNTXT = K.mat("SignLetters", "#f6ead0", .45, 0, .15)

def sweep(name, pts, w, d, y, m):
    """A board of section w (in the arch plane) x d (depth in y) swept along pts [(x, z), ...]."""
    verts, faces, n = [], [], len(pts)
    for i, (x, z) in enumerate(pts):
        a, b = pts[max(i - 1, 0)], pts[min(i + 1, n - 1)]
        tx, tz = b[0] - a[0], b[1] - a[1]; ln = math.hypot(tx, tz); nx, nz = -tz / ln, tx / ln
        for s, t in ((-1, -1), (1, -1), (1, 1), (-1, 1)):
            verts.append((x + nx * s * w / 2, y + t * d / 2, z + nz * s * w / 2))
    for i in range(n - 1):
        for k in range(4):
            a, b = i * 4 + k, i * 4 + (k + 1) % 4
            faces.append((a, b, b + 4, a + 4))
    faces += [(3, 2, 1, 0), tuple(4 * (n - 1) + k for k in range(4))]
    me = bpy.data.meshes.new(name); me.from_pydata(verts, [], faces)
    o = K.link(bpy.data.objects.new(name, me), m)
    bv = o.modifiers.new("Bevel", "BEVEL"); bv.width = .01; bv.segments = 2; bv.limit_method = "ANGLE"
    return o

def arc(c, r, a0, a1, n=10):
    return [(c[0] + r * math.cos(a0 + (a1 - a0) * i / n), c[1] + r * math.sin(a0 + (a1 - a0) * i / n)) for i in range(n + 1)]

def nug(name, x, y, z, s=1.0):
    return K.inst(name, K.NUG_MESH, (x, y, z), (rnd.uniform(-.4, .4), rnd.uniform(-.4, .4), rnd.uniform(0, 6.3)), s * rnd.uniform(.85, 1.15))

def jar(tag, x, y, z, r=.075, h=.17):
    K.cyl(tag + "Glass", r, r, h, (x, y, z), K.GLASS, 40)
    for i in range(8):
        a = i * 2.4; rr = r * .5 * (i % 3) / 2
        nug(f"{tag}Nug{i}", x + math.cos(a) * rr, y + math.sin(a) * rr, z + .012 + (i // 3) * .055)
    K.cyl(tag + "Lid", r + .006, r + .006, .045, (x, y, z + h), K.BRASS, 40)

def flat_bag(tag, x, y, z, h=.3, lean=0.):
    o = K.box(tag, (.2, .035, h), (x, y, z), K.KRAFT, .006); o.rotation_euler.x = lean
    f = K.box(tag + "Fold", (.205, .04, .04), (x, y, z + h - .06), KRAFT_D, .005); f.rotation_euler.x = lean

# ---------- counter: oak slats on a green base, cream top ----------
L, D, H = 1.45, .86, .72
X0 = -.18                       # counter centre; the end cabinet sits at +x
K.box("Plinth", (L + .08, D + .08, .1), (X0, 0, 0), K.GREEN, .02)
K.box("PlinthBrass", (L + .09, D + .09, .02), (X0, 0, .1), K.BRASS, .006)
K.box("Body", (L - .04, D - .04, H - .18), (X0, 0, .12), LIGHTOAK, .01)
for i in range(15):             # vertical slats on the customer face
    x = X0 - L / 2 + .06 + i * (L - .12) / 14
    K.box(f"Slat{i}", (.07, .03, H - .26), (x, -D / 2 + .005, .14), K.OAK, .012)
for sx in (-1, 1):              # green corner frame
    K.box(f"Corner{sx}", (.07, .07, H - .14), (X0 + sx * (L / 2 - .02), -D / 2 + .02, .1), K.GREEN, .012)
K.box("FrameTop", (L, .06, .05), (X0, -D / 2 + .01, H - .1), K.GREEN, .01)
K.box("TopBand", (L + .04, D + .04, .03), (X0, 0, H - .07), K.BRASS, .008)
K.box("Top", (L + .12, D + .12, .08), (X0, 0, H - .05), TOPSTONE, .035, 4)
TOP = H + .03

# ---------- green end cabinet with a small kraft box on its end ----------
CX, CW = X0 + L / 2 + .2, .38
K.box("Cabinet", (CW, D - .02, TOP - .04), (CX, 0, 0), K.GREEN, .015)
K.box("CabinetLip", (CW + .03, D + .01, .04), (CX, 0, TOP - .04), K.GREEN_D, .012)
K.box("CabinetKick", (CW + .02, D, .1), (CX, 0, 0), K.GREEN_D, .012)
K.box("EndRecess", (.012, .32, .3), (CX + CW / 2 + .002, 0, .3), K.GREEN_D, .006)
K.box("EndBox", (.1, .22, .22), (CX + CW / 2 - .02, 0, .32), K.KRAFT, .008)

# ---------- crate of flat kraft bags along the back, running onto the cabinet ----------
BX0, BX1, BY = X0 - .25, CX + CW / 2 - .02, D / 2 - .17
K.box("CrateBase", (BX1 - BX0, .3, .03), ((BX0 + BX1) / 2, BY, TOP), LIGHTOAK, .008)
for y in (BY - .14, BY + .14):
    K.box(f"CrateSide{y:.2f}", (BX1 - BX0, .025, .2), ((BX0 + BX1) / 2, y, TOP), LIGHTOAK, .006)
for k in range(6):
    x = BX0 + (BX1 - BX0) * k / 5
    K.box(f"CrateDiv{k}", (.025, .3, .22), (x, BY, TOP), LIGHTOAK, .006)
for k in range(5):
    x = BX0 + (BX1 - BX0) * (k + .5) / 5
    flat_bag(f"Bag{k}", x, BY - .02, TOP + .03, rnd.uniform(.34, .42), rnd.uniform(-.12, .05))
    if k % 2 == 0:
        flat_bag(f"BagB{k}", x + .02, BY + .07, TOP + .03, rnd.uniform(.3, .36), rnd.uniform(-.05, .1))

# ---------- on the top: plant, three jars and a green mat ----------
K.pot("Plant", X0 - .5, .18, TOP)
K.plant("Plant", X0 - .5, .18, TOP + .21, .42, .9)
for i, (x, y) in enumerate([(X0 - .22, .02), (X0 + .0, -.08), (X0 + .22, -.18)]):
    jar(f"Jar{i}", x, y, TOP)
K.box("Mat", (.36, .24, .02), (X0 - .48, -.2, TOP), K.GREEN, .008)

# ---------- wooden arch along the front edge, the PICKUP sign as its crown ----------
AY = -D / 2 - .1
ax0, ax1 = X0 - L / 2 - .02, X0 + L / 2 + .04
AH, R = 2.25, .3
path = [(ax0, .02), (ax0, AH - R)] + arc((ax0 + R, AH - R), R, math.pi, math.pi / 2)[1:] \
     + arc((ax1 - R, AH - R), R, math.pi / 2, 0)[1:] + [(ax1, .02)]
sweep("Arch", path, .1, .09, AY, K.OAK)
for x in (ax0, ax1):
    K.box(f"ArchFoot{x:.2f}", (.15, .13, .06), (x, AY, 0), K.BRASS, .01)
    K.box(f"ArchCollar{x:.2f}", (.11, .09, .05), (x, AY, AH - R - .05), K.BRASS, .01)
    K.box(f"ArchBand{x:.2f}", (.11, .09, .04), (x, AY, TOP + .02), K.BRASS, .01)
SW, SH, SZ = ax1 - ax0 - .32, .3, AH - .27
K.box("SignBorder", (SW + .04, .07, SH + .04), ((ax0 + ax1) / 2, AY, SZ - .02), K.BRASS, .02)
K.box("Sign", (SW, .09, SH), ((ax0 + ax1) / 2, AY, SZ), K.GREEN_D, .02)
txt = bpy.data.curves.new("SignText", "FONT"); txt.body = "PICKUP"
txt.size = .19; txt.extrude = .008; txt.align_x = "CENTER"; txt.align_y = "CENTER"; txt.space_character = 1.05
fb = os.environ.get("CANOPY_FONT") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts", "Fredoka-SemiBold.ttf")
if os.path.exists(fb): txt.font = bpy.data.fonts.load(fb)
for side, (yy, rz) in enumerate(((AY - .047, 0), (AY + .047, math.pi))):   # lettering on both faces
    o = bpy.data.objects.new(f"SignText{side}", txt)
    K.link(o, SIGNTXT); o.location = ((ax0 + ax1) / 2, yy, SZ + SH / 2); o.rotation_euler = (math.pi / 2, 0, rz)

# ---------- recentre: origin at the middle of the footprint, on the floor ----------
from mathutils import Vector
dg = bpy.context.evaluated_depsgraph_get()
xs, ys = [], []
for o in bpy.data.objects:
    if o.type == "MESH" and not o.parent:
        ev = o.evaluated_get(dg)
        for c in ev.bound_box:
            w = ev.matrix_world @ Vector(c); xs.append(w.x); ys.append(w.y)
shift = Vector((-(min(xs) + max(xs)) / 2, -(min(ys) + max(ys)) / 2, 0))
for o in bpy.data.objects:
    if not o.parent and o.type in ("MESH", "FONT", "CURVE"): o.location += shift
print("footprint", round(max(xs) - min(xs), 3), "x", round(max(ys) - min(ys), 3), "shift", tuple(round(v, 3) for v in shift))

K.finish(OUT, "pickup_desk_tier1", ortho=2.9, centre=(0, 0, 1.05))
