"""Canopy pickup desk (tier 2), modelled from the current sprite.

A green slatted counter with a brass-framed panel under a brass-edged oak arch with the PICKUP sign, an oak cubby
shelf of kraft boxes with three jars on it, a plant in a cream pot, a till and card reader, and a green end
cabinet with a brass rail basket of flat bags at +x.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P pickup_desk_tier2.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
Set CANOPY_FONT to a .ttf/.otf to change the sign's lettering.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy
import canopy_kit as K

OUT = K.begin("PickupDeskTier2")
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
    K.cyl(tag + "Lid", r + .006, r + .006, .05, (x, y, z + h), LIGHTOAK, 40)   # cork-wood lids at this tier

def flat_bag(tag, x, y, z, h=.3, lean=0.):
    o = K.box(tag, (.2, .035, h), (x, y, z), K.KRAFT, .006); o.rotation_euler.x = lean
    f = K.box(tag + "Fold", (.205, .04, .04), (x, y, z + h - .06), KRAFT_D, .005); f.rotation_euler.x = lean

# ---------- counter: green slats with a brass-framed panel, brass corners, cream top ----------
L, D, H = 1.45, .86, .72
X0 = -.18                       # counter centre; the end cabinet sits at +x
K.box("Plinth", (L + .08, D + .08, .1), (X0, 0, 0), LIGHTOAK, .02)
K.box("PlinthBrass", (L + .09, D + .09, .025), (X0, 0, .1), K.BRASS, .006)
K.box("Body", (L - .04, D - .04, H - .18), (X0, 0, .12), K.GREEN, .01)
for i in range(17):             # slender vertical slats on the customer face
    x = X0 - L / 2 + .05 + i * (L - .1) / 16
    K.box(f"Slat{i}", (.05, .025, H - .26), (x, -D / 2 + .005, .14), K.GREEN, .01)
K.box("Panel", (L - .4, .02, .3), (X0, -D / 2 - .012, .22), K.GREEN_D, .008)
for dz in (.22, .52):
    K.box(f"PanelH{dz}", (L - .38, .03, .022), (X0, -D / 2 - .02, dz - .011), K.BRASS, .006)
for dx in (-(L - .38) / 2, (L - .38) / 2):
    K.box(f"PanelV{dx:.2f}", (.022, .03, .3), (X0 + dx, -D / 2 - .02, .22), K.BRASS, .006)
for sx in (-1, 1):
    for sy in (-1, 1):
        K.box(f"Corner{sx}{sy}", (.06, .06, H - .14), (X0 + sx * (L / 2 - .01), sy * (D / 2 - .01), .1), K.BRASS, .012)
K.box("TopBand", (L + .04, D + .04, .03), (X0, 0, H - .07), K.BRASS, .008)
K.box("Top", (L + .12, D + .12, .08), (X0, 0, H - .05), TOPSTONE, .035, 4)
TOP = H + .03

# ---------- green end cabinet with a brass rail basket of flat kraft bags ----------
CX, CW = X0 + L / 2 + .2, .38
CH = TOP - .12
K.box("Cabinet", (CW, D - .02, CH), (CX, 0, 0), K.GREEN, .015)
for i in range(6):
    K.box(f"CabSlat{i}", (.04, .02, CH - .2), (CX - CW / 2 + .05 + i * (CW - .1) / 5, -(D - .02) / 2 - .006, .12), K.GREEN, .008)
K.box("CabinetLip", (CW + .03, D + .01, .03), (CX, 0, CH), K.BRASS, .008)
K.box("CabinetKick", (CW + .02, D, .1), (CX, 0, 0), K.GREEN_D, .012)
RX0, RX1, RY0, RY1, RZ = CX - CW / 2 + .03, CX + CW / 2 - .03, -.3, .34, CH + .03
for y in (RY0, RY1):
    K.tube(f"BasketRail{y:.2f}", [(RX0, y, RZ + .18), (RX1, y, RZ + .18)], .014, K.BRASS)
for x in (RX0, RX1):
    K.tube(f"BasketRailE{x:.2f}", [(x, RY0, RZ + .18), (x, RY1, RZ + .18)], .014, K.BRASS)
    for y in (RY0, RY1):
        K.tube(f"BasketPost{x:.2f}{y:.2f}", [(x, y, RZ), (x, y, RZ + .19)], .014, K.BRASS)
for k in range(6):
    y = RY0 + .06 + k * (RY1 - RY0 - .12) / 5
    o = K.box(f"FlatBag{k}", (CW - .1, .03, rnd.uniform(.32, .4)), (CX, y, RZ), K.KRAFT, .006)
    o.rotation_euler.x = -.12 + .03 * k

# ---------- oak cubby shelf of kraft boxes along the back, three jars on top ----------
SX0, SX1, SY, SD, SHH = X0 - .2, X0 + L / 2 - .02, D / 2 - .17, .28, .38
K.box("ShelfBack", (SX1 - SX0, .025, SHH), ((SX0 + SX1) / 2, SY + SD / 2 - .012, TOP), LIGHTOAK, .006)
for z in (TOP, TOP + SHH / 2 - .012, TOP + SHH - .025):
    K.box(f"ShelfBoard{z:.2f}", (SX1 - SX0, SD, .025), ((SX0 + SX1) / 2, SY, z), LIGHTOAK, .006)
for k in range(4):
    x = SX0 + (SX1 - SX0) * k / 3
    K.box(f"ShelfDiv{k}", (.025, SD, SHH), (x, SY, TOP), LIGHTOAK, .006)
for k in range(3):
    x = SX0 + (SX1 - SX0) * (k + .5) / 3
    for lvl in range(2):
        K.box(f"Box{k}{lvl}", ((SX1 - SX0) / 3 - .06, SD - .06, SHH / 2 - .06), (x, SY - .01, TOP + .025 + lvl * (SHH / 2 - .012)), K.KRAFT, .01)
    jar(f"Jar{k}", x, SY - .02, TOP + SHH)

# ---------- on the top: plant in a cream pot, till and card reader ----------
PX, PY = X0 - .52, .16
K.cyl("PotCream", .13, .15, .2, (PX, PY, TOP), K.CREAM, 32)
K.cyl("PotBand", .152, .152, .05, (PX, PY, TOP + .13), K.GREEN, 32)
K.cyl("PotSoil", .14, .14, .01, (PX, PY, TOP + .195), K.SOIL, 24)
K.plant("Plant", PX, PY, TOP + .2, .42, .9)
TX, TY = X0 + .02, -.08
K.box("TillFoot", (.2, .16, .025), (TX, TY, TOP), K.GREEN_D, .01)
o = K.box("TillNeck", (.07, .045, .17), (TX, TY + .03, TOP + .02), K.GREEN_D, .012); o.rotation_euler.x = .4
o = K.box("Till", (.3, .035, .21), (TX, TY - .01, TOP + .1), K.GREEN, .015); o.rotation_euler.x = .45
o = K.box("TillGlass", (.26, .006, .17), (TX, TY + .014, TOP + .12), K.DARK, .004); o.rotation_euler.x = .45
K.box("Reader", (.16, .14, .04), (TX + .24, TY - .16, TOP), K.GREEN, .012)
K.box("ReaderTop", (.1, .08, .008), (TX + .24, TY - .16, TOP + .038), K.BRASS, .003)
K.box("ReaderPad", (.08, .06, .006), (TX + .24, TY - .16, TOP + .044), K.GREEN_D, .002)

# ---------- brass-edged oak arch along the front edge, the PICKUP sign as its crown ----------
AY = -D / 2 - .1
ax0, ax1 = X0 - L / 2 - .02, X0 + L / 2 + .04
AH, R = 2.25, .32
path = [(ax0, .02), (ax0, AH - R)] + arc((ax0 + R, AH - R), R, math.pi, math.pi / 2)[1:] \
     + arc((ax1 - R, AH - R), R, math.pi / 2, 0)[1:] + [(ax1, .02)]
sweep("ArchBrass", path, .13, .07, AY, K.BRASS)
sweep("Arch", path, .09, .1, AY, K.OAK)
for x in (ax0, ax1):
    K.box(f"ArchFoot{x:.2f}", (.17, .14, .07), (x, AY, 0), K.BRASS, .01)
    K.box(f"ArchBand{x:.2f}", (.15, .12, .04), (x, AY, TOP + .02), K.BRASS, .01)
SW, SH, SZ = ax1 - ax0 - .34, .3, AH - .27
K.box("SignBorder", (SW + .04, .07, SH + .04), ((ax0 + ax1) / 2, AY, SZ - .02), K.BRASS, .02)
K.box("Sign", (SW, .09, SH), ((ax0 + ax1) / 2, AY, SZ), K.GREEN_D, .02)
txt = bpy.data.curves.new("SignText", "FONT"); txt.body = "PICKUP"
txt.size = .19; txt.extrude = .008; txt.align_x = "CENTER"; txt.align_y = "CENTER"; txt.space_character = 1.05
fb = os.environ.get("CANOPY_FONT") or "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
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

K.finish(OUT, "pickup_desk_tier2", ortho=2.9, centre=(0, 0, 1.05))
