"""Pieces shared by the tier 1 / tier 2 seeds, order and ID desks: the seedling tray, the ORDER sign and the
till / card reader.  Keep next to canopy_kit.py; call after K.begin()."""
import os, math
import bpy
import canopy_kit as K

def mats():
    return dict(
        TOPSTONE=K.mat("CreamTop", "#f0d9a8", .4), WHITE=K.mat("Humidifier", "#ece6d6", .45), VENT=K.mat("Vent", "#8f8a7c", .6),
        SIGNTXT=K.mat("SignLetters", "#fbf0d2", .45, 0, .15), PLASTIC=K.mat("Terminal", "#3c3f42", .45),
        SCREEN=K.mat("ReaderScreen", "#b9d9a0", .3, 0, .7), KEYS=K.mat("Keys", "#e8e2d2", .5),
        RED=K.mat("KeyRed", "#c0463a", .5), GRN=K.mat("KeyGreen", "#4c9a52", .5),
        SCANGLASS=K.mat("ScanGlass", "#3d5a46", .15, 0, .35), PAINT=K.mat("CreamPaint", "#efe5cc", .55))

def seedling(tag, x, y, z, s=1.):
    rnd = K.rnd; h = .07 * s
    K.tube(f"{tag}Stem", [(x, y, z), (x, y, z + h)], .006, K.STEM, .004)
    yaw0 = rnd.uniform(0, 6.3)
    for i in range(4):
        K.leaf_at(f"{tag}Leaf{i}", (x, y, z + h), yaw0 + i * 1.571, rnd.uniform(.15, .35), .78 * s, K.LEAF_MESHES[i % 2])
    for i in range(3):
        K.leaf_at(f"{tag}Top{i}", (x, y, z + h + .01), yaw0 + .6 + i * 2.09, .55, .38 * s, K.LEAF_MESHES[2])

def seed_tray(M, TX, TY, TOP, humid=(.44, -.1), tray_w=1.3):
    """Green tray with two rows of three cells of seedlings and a white humidifier at (TX+hx, TY+hy)."""
    rnd = K.rnd
    K.box("Tray", (tray_w, .64, .06), (TX, TY, TOP), K.GREEN, .02, 4)
    for n, (dx, dy, w, d) in enumerate(((0, .31, tray_w, .03), (0, -.31, tray_w, .03), (tray_w / 2 - .015, 0, .03, .64), (-tray_w / 2 + .015, 0, .03, .64))):
        K.box(f"TrayRim{n}", (w, d, .05), (TX + dx, TY + dy, TOP + .05), K.GREEN, .012)
    for r, y in enumerate((TY - .15, TY + .15)):
        for c in range(3):
            x = TX - .48 + c * .3
            K.box(f"Cell{r}{c}", (.25, .25, .06), (x, y, TOP + .03), K.GREEN_D, .02, 3)
            K.box(f"Soil{r}{c}", (.21, .21, .01), (x, y, TOP + .085), K.SOIL, .005)
            seedling(f"S{r}{c}", x + rnd.uniform(-.015, .015), y + rnd.uniform(-.015, .015), TOP + .09, rnd.uniform(.95, 1.1))
    if humid: humidifier(M, TX + humid[0], TY + humid[1], TOP + .055)

def humidifier(M, HX, HY, Z, slots=False):
    K.box("Humidifier", (.22, .22, .24), (HX, HY, Z), M["WHITE"], .03, 4)
    for i in range(4):   # grille slots on the customer face
        K.box(f"HumidSlot{i}", (.012, .006, .1), (HX - .05 + i * .03, HY - .111, Z + .07), M["VENT"], .004)
    K.cyl("HumidVent", .055, .055, .004, (HX, HY, Z + .24), M["VENT"], 24)

def arc_pts(c, r, a0, a1, n, y):
    return [(c[0] + r * math.cos(a0 + (a1 - a0) * i / n), y, c[1] + r * math.sin(a0 + (a1 - a0) * i / n)) for i in range(n + 1)]

def pill(tag, w, h, d, x, y, z, m, n=20, bulge=0.):
    """A rounded-end plate, face toward -Y.  bulge > 0 arches the top edge (the tier 2 crown sign)."""
    r = h / 2; prof = []
    for sx, a0 in ((1, -math.pi / 2), (-1, math.pi / 2)):
        for i in range(n + 1):
            a = a0 + math.pi * i / n
            px, pz = sx * (w / 2 - r) + r * math.cos(a), r + r * math.sin(a)
            prof.append((px, pz))
    if bulge:
        prof = [(px, pz + (bulge * (1 - (2 * px / w) ** 2) if pz > r else 0)) for px, pz in prof]
    k = len(prof)
    verts = [(px, -d / 2, pz) for px, pz in prof] + [(px, d / 2, pz) for px, pz in prof]
    faces = [tuple(range(k))[::-1], tuple(range(k, 2 * k))] + [(i, (i + 1) % k, k + (i + 1) % k, k + i) for i in range(k)]
    me = bpy.data.meshes.new(tag); me.from_pydata(verts, [], faces)
    o = K.link(bpy.data.objects.new(tag, me), m); o.location = (x, y, z)
    bv = o.modifiers.new("Bevel", "BEVEL"); bv.width = .008; bv.segments = 2; bv.limit_method = "ANGLE"
    return o

def order_sign(M, AY, SW, SH, SZ, bulge=0.):
    pill("SignBorder", SW + .06, SH + .06, .06, 0, AY, SZ - .03, K.BRASS, bulge=bulge)
    pill("Sign", SW, SH, .076, 0, AY, SZ, K.GREEN_D, bulge=bulge)
    txt = bpy.data.curves.new("SignText", "FONT"); txt.body = "ORDER"
    txt.size = .23; txt.extrude = .008; txt.align_x = "CENTER"; txt.align_y = "CENTER"; txt.space_character = 1.05
    fb = os.environ.get("CANOPY_FONT") or "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
    if os.path.exists(fb): txt.font = bpy.data.fonts.load(fb)
    for side, (yy, rz) in enumerate(((AY - .042, 0), (AY + .042, math.pi))):   # lettering on both faces
        o = bpy.data.objects.new(f"SignText{side}", txt)
        K.link(o, M["SIGNTXT"]); o.location = (0, yy, SZ + SH / 2 + bulge * .3); o.rotation_euler = (math.pi / 2, 0, rz)

def card_reader(M, CX, CY, TOP, T=.5, base=None):
    """A card reader on a little cradle, tilted so the keypad faces the customer (-Y)."""
    K.box("Cradle", (.14, .12, .035), (CX, CY + .02, TOP), base or M["PLASTIC"], .01)
    rd = K.box("Reader", (.15, .26, .05), (CX, CY, TOP + .02), M["PLASTIC"], .018); rd.rotation_euler.x = T
    def on(o, x, y):
        o.parent = rd; o.location = (x, y, .05); return o
    on(K.box("ReaderScreen", (.11, .075, .006), (0, 0, 0), M["SCREEN"], .002), 0, .06)
    for r in range(3):
        for c in range(3):
            on(K.box(f"Key{r}{c}", (.03, .022, .008), (0, 0, 0), (M["RED"] if c == 0 and r == 2 else M["GRN"] if c == 2 and r == 2 else M["KEYS"]), .003),
               -.038 + c * .038, -r * .034)

def till(M, MX, MY, TOP, s=1.):
    K.box("MonitorFoot", (.24 * s, .18 * s, .025), (MX, MY, TOP), M["PLASTIC"], .01)
    o = K.box("MonitorNeck", (.08 * s, .05 * s, .2 * s), (MX, MY + .03 * s, TOP + .02), M["PLASTIC"], .012); o.rotation_euler.x = .4
    o = K.box("Monitor", (.4 * s, .04, .28 * s), (MX, MY - .02 * s, TOP + .12 * s), M["PLASTIC"], .015); o.rotation_euler.x = .45
    o = K.box("MonitorGlass", (.36 * s, .006, .24 * s), (MX, MY + .006, TOP + .14 * s), K.DARK, .004); o.rotation_euler.x = .45
