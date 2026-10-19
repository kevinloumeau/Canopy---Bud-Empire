"""Canopy order desk, tier 4 (Lv 50): the premium step up from tier 3 at the same footprint and facing.

Marble top on a warm light strip, a backlit leaf panel in the brass-framed front, a polished double brass arch,
a glowing leaf beside ORDER on the sign, a menu card and two display jars by the till.

Needs canopy_kit.py and luxe_parts.py in the same folder.  Run headless with
    blender -b -P order_desk_tier4.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
Signs use fonts/Fredoka-SemiBold.ttf next to this file; set CANOPY_FONT to a .ttf/.otf to change it.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy
import canopy_kit as K

OUT = K.begin("OrderDeskTier4")
import luxe_parts as X
M = X.mats()
TOPSTONE = K.mat("CreamTop", "#f0d9a8", .4)
SIGNTXT = K.mat("SignLetters", "#fbf0d2", .45, 0, .15)
PLASTIC = K.mat("Terminal", "#3c3f42", .45)
SCREEN = K.mat("ReaderScreen", "#b9d9a0", .3, 0, .7)
KEYS = K.mat("Keys", "#e8e2d2", .5)
RED = K.mat("KeyRed", "#c0463a", .5)
GRN = K.mat("KeyGreen", "#4c9a52", .5)

def arc_pts(c, r, a0, a1, n, y):
    return [(c[0] + r * math.cos(a0 + (a1 - a0) * i / n), y, c[1] + r * math.sin(a0 + (a1 - a0) * i / n)) for i in range(n + 1)]

def framed_panel(tag, cx, cy, cz, w, h, along_x=True, inset=.05):
    """A raised walnut panel with a brass frame and cut corners, on the -Y face (along_x) or the +X face."""
    t = .022
    if along_x:
        K.box(tag, (w, .02, h), (cx, cy - .008, cz), K.WOOD, .008)
        fw, fh = w - 2 * inset, h - 2 * inset
        for dz in (cz + inset, cz + h - inset):
            K.box(f"{tag}H{dz:.2f}", (fw - .06, t, .016), (cx, cy - .018, dz - .008), K.BRASS, .005)
        for dx in (-fw / 2, fw / 2):
            K.box(f"{tag}V{dx:.2f}", (.016, t, fh - .06), (cx + dx, cy - .018, cz + inset + .03), K.BRASS, .005)
        for dx in (-1, 1):   # cut corners
            for dz in (0, 1):
                o = K.box(f"{tag}C{dx}{dz}", (.045, t, .016), (cx + dx * (fw / 2 - .02), cy - .018, cz + inset + dz * fh + (.022 if dz == 0 else -.03)), K.BRASS, .004)
                o.rotation_euler.y = (math.pi / 4) * (1 if dx * (1 if dz else -1) > 0 else -1)
    else:
        K.box(tag, (.02, w, h), (cx + .008, cy, cz), K.WOOD, .008)
        fw, fh = w - 2 * inset, h - 2 * inset
        for dz in (cz + inset, cz + h - inset):
            K.box(f"{tag}H{dz:.2f}", (t, fw - .04, .016), (cx + .018, cy, dz - .008), K.BRASS, .005)
        for dy in (-fw / 2, fw / 2):
            K.box(f"{tag}V{dy:.2f}", (t, .016, fh - .04), (cx + .018, cy + dy, cz + inset + .02), K.BRASS, .005)

# ---------- walnut counter with brass pilasters ----------
L, D, H = 1.15, .62, .9
K.box("Plinth", (L + .08, D + .08, .1), (0, 0, 0), K.WOOD_D, .02)
K.box("PlinthBrass", (L + .09, D + .09, .022), (0, 0, .1), K.BRASS, .006)
K.box("Body", (L, D, H - .17), (0, 0, .12), K.WOOD, .01)
framed_panel("FrontPanel", 0, -D / 2, .17, L - .16, .6)
K.box("LeafPanel", (.3, .012, .34), (0, -D / 2 - .03, .3), M["BACKLIGHT"], .004)
K.box("LeafPanelFrame", (.34, .01, .38), (0, -D / 2 - .022, .28), K.BRASS, .004)
X.leaf_logo("FrontLeaf", (0, -D / 2 - .04, .47), .52, K.GREEN_D)
framed_panel("EndPanel", L / 2, 0, .17, D - .14, .6, along_x=False)
for sx in (-1, 1):
    for sy in (-1, 1):
        x, y = sx * (L / 2 + .005), sy * (D / 2 + .005)
        K.box(f"Pilaster{sx}{sy}", (.06, .06, H - .2), (x, y, .12), K.WOOD, .01)
        K.box(f"PilBase{sx}{sy}", (.075, .075, .035), (x, y, .12), K.BRASS, .008)
        K.box(f"PilCap{sx}{sy}", (.075, .075, .035), (x, y, H - .115), K.BRASS, .008)
K.box("TopBand", (L + .04, D + .04, .03), (0, 0, H - .08), K.BRASS, .008)
X.marble_top("Top", (L + .14, D + .14, .09), (0, 0, H - .06), .04)
K.box("LedStrip", (L - .04, .012, .012), (0, -D / 2 - .04, H - .075), M["LED"], .003)
TOP = H + .03

# ---------- brass arch along the front edge with the ORDER sign ----------
AY = -D / 2 + .02
ax0, ax1 = -L / 2 + .02, L / 2 - .02
AH, R = 1.85, .2
SW, SH = ax1 - ax0 - .06, .36
SZ = AH - SH + .02               # the sign is the arch's crown: the posts curve into its rounded ends
for sx, x in ((-1, ax0), (1, ax1)):
    pts = [(x, AY, TOP), (x, AY, AH - SH / 2 - R)]
    pts += arc_pts((x - sx * R, AH - SH / 2 - R), R, 0 if sx > 0 else math.pi, math.pi / 2, 8, AY)[1:]
    K.tube(f"ArchPost{sx}", pts, .038, M["POLISH"])
    K.tube(f"ArchPostInner{sx}", [(p[0] - sx * .055, p[1], p[2]) for p in pts[:2]], .012, K.BRASS)
    K.cyl(f"ArchFinialBall{sx}", .03, .03, .05, (x - sx * .055, AY, TOP), K.BRASS, 16)
    K.cyl(f"ArchCollar{sx}", .055, .05, .08, (x, AY, TOP), K.BRASS, 32)
    K.cyl(f"ArchRing{sx}", .048, .048, .04, (x, AY, TOP + .42), K.BRASS, 32)
def pill(tag, w, h, d, z, m, n=20):
    """A rounded-end sign plate standing on the arch line, face toward -Y, built as one clean mesh."""
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
pill("SignBorder", SW + .06, SH + .06, .06, SZ - .03, M["POLISH"])
pill("Sign", SW, SH, .076, SZ, K.GREEN_D)
for dx in (-SW / 2 + .09, SW / 2 - .09):
    for d in (-1, 1):
        K.cyl(f"Rivet{dx:.2f}{d}", .02, .02, .01, (dx, AY + d * .042, SZ + SH / 2), K.BRASS, 16).rotation_euler.x = math.pi / 2
txt = bpy.data.curves.new("SignText", "FONT"); txt.body = "ORDER"; txt.resolution_u = 3
txt.size = .2; txt.offset_y = 0; txt.extrude = .008; txt.align_x = "CENTER"; txt.align_y = "CENTER"; txt.space_character = 1.05
fb = os.environ.get("CANOPY_FONT") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts", "Fredoka-SemiBold.ttf")
if os.path.exists(fb): txt.font = bpy.data.fonts.load(fb)
for side, (yy, rz) in enumerate(((AY - .042, 0), (AY + .042, math.pi))):   # lettering on both faces
    o = bpy.data.objects.new(f"SignText{side}", txt)
    K.link(o, SIGNTXT); o.location = ((.07 if side == 0 else 0), yy, SZ + SH / 2); o.rotation_euler = (math.pi / 2, 0, rz)
X.leaf_logo("SignLeaf", (-SW / 2 + .14, AY - .045, SZ + SH / 2), .3, M["LEAFGLOW"])

# ---------- till screen (faces the budtender) and card reader (faces the customer) ----------
MX, MY = .0, .02
K.box("MonitorFoot", (.24, .18, .025), (MX, MY, TOP), PLASTIC, .01)
o = K.box("MonitorNeck", (.08, .05, .2), (MX, MY + .03, TOP + .02), PLASTIC, .012); o.rotation_euler.x = .4
o = K.box("Monitor", (.4, .04, .28), (MX, MY - .02, TOP + .12), PLASTIC, .015); o.rotation_euler.x = .45
o = K.box("MonitorGlass", (.36, .006, .24), (MX, MY + .006, TOP + .14), K.DARK, .004); o.rotation_euler.x = .45
CX, CY, T = .25, -.13, .5     # card reader on a little cradle, tilted so the keypad faces the customer
K.box("Cradle", (.14, .12, .035), (CX, CY + .02, TOP), PLASTIC, .01)
rd = K.box("Reader", (.15, .26, .05), (CX, CY, TOP + .02), PLASTIC, .018); rd.rotation_euler.x = T
def on_reader(o, x, y):
    o.parent = rd; o.location = (x, y, .05); return o
on_reader(K.box("ReaderScreen", (.11, .075, .006), (0, 0, 0), SCREEN, .002), 0, .06)
for r in range(3):
    for c in range(3):
        on_reader(K.box(f"Key{r}{c}", (.03, .022, .008), (0, 0, 0), (RED if c == 0 and r == 2 else GRN if c == 2 and r == 2 else KEYS), .003),
                  -.038 + c * .038, -.0 - r * .034)

# menu card and two display jars beside the till
K.box("MenuStand", (.12, .02, .16), (-.36, -.2, TOP), M["POLISH"], .004).rotation_euler.x = -.25
K.box("MenuCard", (.1, .006, .14), (-.36, -.212, TOP + .01), K.CREAM, .002).rotation_euler.x = -.25
for i, x in enumerate((-.4, -.25)):
    X.jar(f"TopJar{i}", x, .12, TOP, .05, .13, 3)

K.finish(OUT, "order_desk_tier4", ortho=2.6, centre=(0, 0, 1.05))
