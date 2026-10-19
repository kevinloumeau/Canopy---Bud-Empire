"""Canopy security booth at the door, five looks that grow with the Security level (Lv 1, 10, 30, 50 and 75, the station look levels).

    1  door podium: a slim oak podium with a hand scanner and a brass lamp
    2  ID desk: a green desk with oak pilasters, a lit scanner pad on an arm and a guest-list tablet
    3  ID check booth: a walnut desk with brass panels, two rear posts and a backlit ID CHECK header
    4  monitored booth: tier 3 plus a glass guard along the front, a camera on each post, twin monitors and a neon leaf
    5  flagship booth: four brass posts under a framed glass canopy, a backlit SECURITY sign, pendant lights and
       a marble-topped desk

Every tier stands on the same brass-edged mat, so all five fill the same footprint and the 3D map scales them alike
(the map sizes a model by its footprint; height is free). The -Y face is the front: the scanner, the sign and the
glass guard face the customer there, and the map turns the model so that face looks at the front door. The doorman
works the +Y side (drawers, monitors), which is the side the map's camera sees.

Needs canopy_kit.py and station_parts.py in the same folder.  Run headless with
    blender -b -P security_booth.py -- OUT_DIR TIER
(TIER 1 to 5, default 5), or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy
import canopy_kit as K
import station_parts as P

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
TIER = int(argv[1]) if len(argv) > 1 else 5
OUT = K.begin(f"SecurityBoothTier{TIER}")
M = P.mats()
LIGHT = K.mat("LightOak", "#d0a066", .6)
MAT = K.mat("DoorMat", "#24402f", .9)
INSET = K.mat("PanelInset", "#5a3420", .5)
LAMP = K.mat("ScanLight", "#fff2c8", .3, 0, 3.)
EDGE = K.mat("ScanEdge", "#8fd6a0", .3, 0, 1.2)
SIGNLIGHT = K.mat("SignBacklight", "#ffe3b0", .4, 0, 2.2)
NEON = K.mat("NeonLeaf", "#7dffb0", .3, 0, 4.)
FEED = K.mat("CameraFeed", "#9fd8b4", .3, 0, 1.1)
MARBLE = K.mat("GreenMarble", "#2f5a47", .25)
CANOPY = K.glass("CanopyGlass", "#e3efe9")
GUARD = K.glass("GuardGlass", "#eef6f1")
FONT = os.environ.get("CANOPY_FONT") or os.path.join(os.path.dirname(os.path.abspath(K.__file__)), "fonts", "Fredoka-SemiBold.ttf")

# The footprint every tier shares: a dark green mat with a brass edge.
FW, FD = 1.45, .8
K.box("Mat", (FW, FD, .02), (0, 0, 0), MAT, .006)
for n, (dx, dy, w, d) in enumerate(((0, -FD / 2 + .012, FW, .024), (0, FD / 2 - .012, FW, .024), (-FW / 2 + .012, 0, .024, FD), (FW / 2 - .012, 0, .024, FD))):
    K.box(f"MatEdge{n}", (w, d, .026), (dx, dy, 0), K.BRASS, .006)
Z0 = .02


def text(tag, body, size, x, y, z, m, faces=(-1,)):
    """Raised lettering on the sign's -Y face, and mirrored onto its +Y face when faces has 1."""
    t = bpy.data.curves.new(tag, "FONT"); t.body = body
    t.size = size; t.extrude = .006; t.align_x = "CENTER"; t.align_y = "CENTER"; t.space_character = 1.08
    if os.path.exists(FONT): t.font = bpy.data.fonts.load(FONT)
    for f in faces:
        o = bpy.data.objects.new(f"{tag}{f}", t)
        K.link(o, m); o.location = (x if f < 0 else -x, y + (0 if f < 0 else .072), z); o.rotation_euler = (math.pi / 2, 0, 0 if f < 0 else math.pi)


def hand_scanner(x, y, z):
    """A hand-held ID scanner resting in a brass tray."""
    K.box("ScannerTray", (.2, .14, .02), (x, y, z), K.BRASS, .008)
    o = K.box("Scanner", (.07, .16, .045), (x, y - .005, z + .02), M["PLASTIC"], .018); o.rotation_euler.z = .35
    K.box("ScannerWindow", (.05, .03, .006), (x + .012, y - .06, z + .064), EDGE, .002).rotation_euler.z = .35


def lamp_scanner(x, y, z):
    """A green scan pad with a lit glass window, an arm and a lamp head (the old tier 3 scanner)."""
    K.box("ScanPad", (.42, .38, .05), (x, y, z), K.GREEN, .022, 4)
    K.box("ScanFrame", (.3, .27, .01), (x, y, z + .049), K.BRASS, .005)
    K.box("ScanWindow", (.25, .22, .008), (x, y, z + .054), M["SCANGLASS"], .003)
    ax, ay = x + .02, y + .22
    K.box("ArmFoot", (.18, .12, .05), (ax, ay, z), K.GREEN, .022)
    K.box("ArmCol", (.11, .09, .44), (ax, ay, z + .04), K.GREEN, .03, 4)
    K.tube("ArmBend", [(ax, ay, z + .44), (ax, ay - .02, z + .53), (ax, ay - .09, z + .57)], .045, K.GREEN)
    K.box("LampHead", (.38, .24, .09), (x, y + .02, z + .53), K.GREEN, .03, 4)
    K.box("LampTrim", (.36, .22, .012), (x, y + .02, z + .525), K.BRASS, .005)
    K.box("LampGlow", (.27, .14, .006), (x, y + .02, z + .52), LAMP, .003)


def monitor(tag, x, y, z, s=1., yaw=0.):
    """A slim monitor on a foot showing a lit camera feed, turned yaw about Z, facing the doorman (+Y)."""
    foot = K.box(f"{tag}Foot", (.16 * s, .12 * s, .02), (x, y, z), M["PLASTIC"], .008)
    neck = K.box(f"{tag}Neck", (.05 * s, .035 * s, .16 * s), (x, y - .02 * s, z + .015), M["PLASTIC"], .01)
    scr = K.box(f"{tag}", (.34 * s, .03, .22 * s), (x, y, z + .12 * s), M["PLASTIC"], .012); scr.rotation_euler.x = -.18
    feed = K.box(f"{tag}Feed", (.3 * s, .006, .18 * s), (x, y + .017, z + .14 * s), FEED, .003); feed.rotation_euler.x = -.18
    for o in (foot, neck, scr, feed):
        o.rotation_euler.z = yaw


def cctv(tag, x, y, z, yaw):
    """A small dome-less security camera on a bracket, pointing along yaw (radians from -Y)."""
    K.box(f"{tag}Bracket", (.05, .05, .08), (x, y, z), K.BRASS, .01)
    body = K.box(f"{tag}Body", (.09, .2, .08), (x, y, z + .06), M["WHITE"], .025); body.rotation_euler = (-.3, 0, yaw)
    lens = K.box(f"{tag}Lens", (.06, .02, .05), (x - .1 * math.sin(yaw), y - .1 * math.cos(yaw), z + .085), K.DARK, .01); lens.rotation_euler = (-.3, 0, yaw)


def neon_leaf(x, y, z, s=.16):
    """A seven-finger leaf drawn in lit tube, flat on the -Y face."""
    for i in range(7):
        a = math.radians(-75 + i * 25); r = s * (1 - abs(i - 3) * .17)
        K.tube(f"Neon{i}", [(x, y, z), (x + r * .55 * math.sin(a), y, z + r * .55 * math.cos(a)), (x + r * math.sin(a), y, z + r * math.cos(a))], .009, NEON)
    K.tube("NeonStem", [(x, y, z), (x, y, z - s * .45)], .009, NEON)


def framed_panel(tag, cx, cy, w, h, z0, along_x=True):
    """A walnut panel with a brass frame on the -Y face (along_x) or the +X face."""
    t, f = .022, .016
    if along_x:
        K.box(tag, (w, .02, h), (cx, cy - .008, z0), K.WOOD, .008)
        K.box(tag + "Inset", (w - .1, .012, h - .1), (cx, cy - .02, z0 + .05), INSET, .006)
        for dz in (z0 + .03, z0 + h - .03):
            K.box(f"{tag}H{dz:.2f}", (w - .06, t, f), (cx, cy - .022, dz - f / 2), K.BRASS, .005)
        for dx in (-(w - .06) / 2, (w - .06) / 2):
            K.box(f"{tag}V{dx:.2f}", (f, t, h - .06), (cx + dx, cy - .022, z0 + .03), K.BRASS, .005)
    else:
        K.box(tag, (.02, w, h), (cx + .008, cy, z0), K.WOOD, .008)
        K.box(tag + "Inset", (.012, w - .1, h - .1), (cx + .02, cy, z0 + .05), INSET, .006)
        for dz in (z0 + .03, z0 + h - .03):
            K.box(f"{tag}H{dz:.2f}", (t, w - .06, f), (cx + .022, cy, dz - f / 2), K.BRASS, .005)
        for dy in (-(w - .06) / 2, (w - .06) / 2):
            K.box(f"{tag}V{dy:.2f}", (t, f, h - .06), (cx + .022, cy + dy, z0 + .03), K.BRASS, .005)


def walnut_desk(L, D, H, top):
    """The tier 3 to 5 desk: walnut body, brass-framed panels, round brass pilasters and a thick top."""
    K.box("Plinth", (L + .1, D + .1, .12), (0, 0, Z0), K.WOOD_D, .025)
    K.box("PlinthBrass", (L + .08, D + .08, .02), (0, 0, Z0 + .12), K.BRASS, .006)
    K.box("Body", (L, D, H - .2), (0, 0, Z0 + .13), K.WOOD, .01)
    pw = (L - .14) / 2
    for i in range(2):
        framed_panel(f"Front{i}", -L / 2 + .07 + pw * (i + .5), -D / 2, pw - .05, .46, Z0 + .19)
    framed_panel("End", L / 2, 0, D - .16, .46, Z0 + .19, along_x=False)
    # The doorman's side: a bank of drawers with brass pulls, since the map's camera looks at this face.
    dw = (L - .16) / 3
    for i in range(3):
        for j, (z, h) in enumerate(((Z0 + .19, .22), (Z0 + .43, .22))):
            cx = -L / 2 + .08 + dw * (i + .5)
            K.box(f"Drawer{i}{j}", (dw - .03, .02, h - .03), (cx, D / 2 + .008, z), K.WOOD_D, .008)
            K.box(f"Pull{i}{j}", (.1, .02, .016), (cx, D / 2 + .022, z + h / 2 - .02), K.BRASS, .005)
    for sx in (-1, 1):
        for sy in (-1, 1):
            K.cyl(f"Column{sx}{sy}", .03, .03, H - .23, (sx * L / 2, sy * D / 2, Z0 + .14), K.BRASS, 24)
    K.box("TopBand", (L + .05, D + .05, .03), (0, 0, Z0 + H - .09), K.BRASS, .008)
    K.box("Top", (L + .16, D + .16, .1), (0, 0, Z0 + H - .07), top, .04, 5)
    return Z0 + H + .03


def header_sign(word, posts_y, z, w, leaf=False):
    """A backlit sign between the two rear posts: a green face in a brass frame, light spilling round its edges."""
    h = .3
    K.box("SignGlow", (w + .1, .014, h + .1), (0, posts_y, z - .05), SIGNLIGHT, .03, 4)
    P.pill("SignBorder", w + .05, h + .05, .05, 0, posts_y, z - .025, K.BRASS)
    P.pill("Sign", w, h, .066, 0, posts_y, z, K.GREEN_D)
    if leaf:
        neon_leaf(-w / 2 + .2, posts_y - .04, z + .13, .12)
        text("SignText", word, .15, .1, posts_y - .036, z + h / 2, M["SIGNTXT"], (-1, 1))
        neon_leaf(w / 2 - .2, posts_y + .04, z + .13, .12)
    else:
        text("SignText", word, .16, 0, posts_y - .036, z + h / 2, M["SIGNTXT"], (-1, 1))


def post(tag, x, y, h):
    K.box(f"{tag}Shoe", (.1, .1, .05), (x, y, Z0), K.BRASS, .012)
    K.cyl(f"{tag}", .032, .032, h, (x, y, Z0), K.BRASS, 24)
    K.box(f"{tag}Cap", (.08, .08, .03), (x, y, Z0 + h), K.BRASS, .01)


if TIER == 1:
    # A slim oak podium, scanner and lamp: one person waving people in.
    L, D, H = .72, .5, .98
    PX = -.18
    K.box("Plinth", (L + .06, D + .06, .08), (PX, 0, Z0), K.GREEN, .022)
    K.box("PlinthBand", (L + .07, D + .07, .018), (PX, 0, Z0 + .08), K.BRASS, .006)
    K.box("Core", (L - .04, D - .04, H - .2), (PX, 0, Z0 + .1), K.WOOD_D, .01)
    for i in range(4):
        for sy in (-1, 1):
            K.box(f"Slat{i}{sy}", (L / 4 - .02, .04, H - .2), (PX - L / 2 + L / 4 * (i + .5), sy * (D / 2 - .02), Z0 + .1), LIGHT, .012)
    for i in range(3):
        K.box(f"SlatE{i}", (.04, D / 3 - .02, H - .2), (PX + L / 2 - .02, -D / 2 + D / 3 * (i + .5), Z0 + .1), LIGHT, .012)
    K.box("Top", (L + .12, D + .12, .1), (PX, 0, Z0 + H - .1), M["TOPSTONE"], .045, 5)
    TOP = Z0 + H
    hand_scanner(PX - .15, -.04, TOP)
    K.cyl("LampFoot", .05, .06, .02, (PX + .2, .1, TOP), K.BRASS, 24)
    K.tube("LampStem", [(PX + .2, .1, TOP), (PX + .2, .1, TOP + .2), (PX + .14, .06, TOP + .26)], .012, K.BRASS)
    K.cyl("LampShade", .07, .04, .07, (PX + .12, .05, TOP + .22), K.GREEN, 24)
    K.cyl("LampBulb", .045, .045, .01, (PX + .12, .05, TOP + .215), LAMP, 16)
    # A brass stanchion at the street end of the mat.
    post("Stanchion", .58, -.28, .7)
    K.cyl("StanchionBase", .07, .08, .025, (.58, -.28, Z0), K.BRASS, 24)
    K.cyl("StanchionBall", .04, .04, .05, (.58, -.28, Z0 + .73), K.BRASS, 16)
    K.finish(OUT, "security_booth_tier1", ortho=2.2, centre=(0, 0, .6))

elif TIER == 2:
    # A green desk with oak pilasters, the lit scanner on an arm and a guest-list tablet.
    L, D, H = 1.2, .56, .92
    K.box("Plinth", (L + .08, D + .08, .1), (0, 0, Z0), LIGHT, .02)
    K.box("Body", (L, D, H - .18), (0, 0, Z0 + .1), K.GREEN, .01)
    for i in range(1, 9):
        for sy in (-1, 1):
            K.box(f"Groove{i}{sy}", (.012, .012, H - .34), (-L / 2 + L / 9 * i, sy * (D / 2 + .002), Z0 + .2), K.GREEN_D, .003)
    for sx in (-1, 1):
        for sy in (-1, 1):
            x, y = sx * (L / 2 + .005), sy * (D / 2 + .005)
            K.box(f"Pilaster{sx}{sy}", (.07, .07, H - .18), (x, y, Z0 + .1), LIGHT, .01)
            K.box(f"PilCap{sx}{sy}", (.08, .08, .03), (x, y, Z0 + H - .11), K.BRASS, .008)
    K.box("EndFrame", (.02, D - .16, .46), (L / 2 + .012, 0, Z0 + .2), K.BRASS, .006)
    K.box("EndInset", (.024, D - .2, .42), (L / 2 + .014, 0, Z0 + .22), K.GREEN, .006)
    K.box("Top", (L + .12, D + .12, .09), (0, 0, Z0 + H - .08), M["TOPSTONE"], .04, 5)
    TOP = Z0 + H + .01
    lamp_scanner(-.3, -.06, TOP)
    o = K.box("Tablet", (.24, .17, .014), (.22, -.06, TOP), M["PLASTIC"], .006); o.rotation_euler.z = -.25
    o = K.box("TabletScreen", (.2, .13, .004), (.22, -.06, TOP + .013), FEED, .002); o.rotation_euler.z = -.25
    K.finish(OUT, "security_booth_tier2", ortho=2.2, centre=(0, 0, .7))

else:
    # Tiers 3 to 5: the walnut desk under a header sign.
    L, D, H = 1.22, .56, .9
    TOP = walnut_desk(L, D, H, MARBLE if TIER == 5 else M["TOPSTONE"])
    lamp_scanner(-.3, -.06, TOP)
    PX, PY = FW / 2 - .07, FD / 2 - .07          # the posts sit inside the mat's corners
    PH = 2.25 if TIER == 5 else 2.1
    for sx in (-1, 1):
        post(f"RearPost{sx}", sx * PX, PY, PH)
    if TIER == 3:
        monitor("Monitor", .3, .12, TOP, 1., .15)
        header_sign("ID CHECK", PY, PH - .42, 2 * PX - .12)
    if TIER >= 4:
        monitor("MonitorL", .14, .13, TOP, .9, -.12)
        monitor("MonitorR", .42, .1, TOP, .9, .22)
        # A low glass guard along the front edge of the top, brass-capped.
        K.box("GuardGlass", (L - .1, .014, .28), (.04, -D / 2 - .03, TOP), GUARD, .004)
        K.box("GuardCap", (L - .08, .03, .016), (.04, -D / 2 - .03, TOP + .28), K.BRASS, .006)
        for x in (-L / 2 + .1, L / 2 - .02):
            K.box(f"GuardClip{x:.2f}", (.03, .05, .06), (x, -D / 2 - .03, TOP), K.BRASS, .006)
        # Under-top glow and a camera on each rear post.
        K.box("UnderGlow", (L - .1, .012, .012), (0, -D / 2 - .02, Z0 + H - .1), SIGNLIGHT, .004)
        cctv("CamL", -PX, PY, PH + .03, -.5)
        cctv("CamR", PX, PY, PH + .03, .5)
    if TIER == 4:
        header_sign("ID CHECK", PY, PH - .42, 2 * PX - .12, leaf=True)
    if TIER == 5:
        # Front posts and a framed glass canopy over the whole booth, with two pendant lights.
        for sx in (-1, 1):
            post(f"FrontPost{sx}", sx * PX, -PY, PH)
        CZ = Z0 + PH + .03
        K.box("CanopyGlass", (2 * PX + .06, 2 * PY + .06, .02), (0, 0, CZ), CANOPY, .004)
        for n, (dx, dy, w, d) in enumerate(((0, -PY, 2 * PX + .1, .05), (0, PY, 2 * PX + .1, .05), (-PX, 0, .05, 2 * PY + .1), (PX, 0, .05, 2 * PY + .1))):
            K.box(f"CanopyFrame{n}", (w, d, .05), (dx, dy, CZ - .015), K.BRASS, .01)
        for x in (-.32, .32):
            K.tube(f"Pendant{x:.2f}", [(x, 0, CZ), (x, 0, CZ - .42)], .006, K.DARK)
            K.cyl(f"PendantShade{x:.2f}", .045, .09, .1, (x, 0, CZ - .52), K.BRASS, 24)
            K.cyl(f"PendantBulb{x:.2f}", .07, .07, .01, (x, 0, CZ - .525), LAMP, 20)
        header_sign("SECURITY", PY, PH - .42, 2 * PX - .12, leaf=True)
        # A second scanner gate at the street end of the desk top.
        hand_scanner(.5, -.14, TOP)
    K.finish(OUT, f"security_booth_tier{TIER}", ortho=2.9, centre=(0, 0, 1.05))
