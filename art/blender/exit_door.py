"""Canopy exit door, modelled from the v2 exit door sprite.

A forest-green door frame with brass edging round a clear doorway, the brass-framed EXIT ONLY sign on its header,
a small lamp above ("ExitLamp", material "ExitLamp", for the game to light) and the green panelled leaf with its
glass upper panel standing open.  The leaf is the empty "DoorLeaf", its origin on the hinge axis at the doorway's
+X edge, swung 90 degrees into the shop (-Y).  Origin: the doorway's centre on the floor, in the wall plane (y=0);
the door faces Blender -Y.  No wall is modelled round it.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P exit_door.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy
import canopy_kit as K

OUT = K.begin("ExitDoor")
FRAME = K.mat("DoorFrameGreen", "#24573f", .5)
LEAF = K.mat("DoorGreen", "#2d6146", .5)
SIGNTXT = K.mat("SignLetters", "#fbf0d2", .45, 0, .15)
LAMP = K.mat("ExitLamp", "#d84a3a", .4, 0, .6)
PANE = K.mat("DoorPane", "#e9eedf", .08, 0, .05)

W, H = 1.071, 2.391                 # clear doorway
PW, Y0, Y1 = .083, -.071, .059      # post width, frame front and back faces
HH = .145                           # header

# ---------- frame: posts and header with brass edging on the front ----------
for sx in (-1, 1):
    x = sx * (W / 2 + PW / 2)
    K.box(f"Post{sx}", (PW, Y1 - Y0, H), (x, (Y0 + Y1) / 2, 0), FRAME, .008)
    K.box(f"PostBrass{sx}", (.012, .006, H), (sx * (W / 2 + .012), Y0 - .002, 0), K.BRASS, .002)
K.box("Header", (W + 2 * PW, Y1 - Y0, HH), (0, (Y0 + Y1) / 2, H), FRAME, .008)
K.box("HeaderBrass", (W + .012, .006, .012), (0, Y0 - .002, H + .01), K.BRASS, .002)
K.box("HeaderCap", (W + 2 * PW + .03, Y1 - Y0 + .03, .03), (0, (Y0 + Y1) / 2, H + HH + .001), FRAME, .01)

# ---------- EXIT ONLY sign on the header ----------
SW, SH, SZ = .72, .2, H + HH / 2 - .1
K.box("SignBrass", (SW + .03, .024, SH + .03), (0, Y0 - .012, SZ - .015), K.BRASS, .006)
K.box("Sign", (SW, .03, SH), (0, Y0 - .02, SZ), K.GREEN_D, .006)
txt = bpy.data.curves.new("SignText", "FONT"); txt.body = "EXIT ONLY"
txt.size = .11; txt.extrude = .004; txt.align_x = "CENTER"; txt.align_y = "CENTER"; txt.space_character = 1.05
fb = os.environ.get("CANOPY_FONT") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts", "Fredoka-SemiBold.ttf")
if os.path.exists(fb): txt.font = bpy.data.fonts.load(fb)
o = K.link(bpy.data.objects.new("SignText", txt), SIGNTXT); o.location = (0, Y0 - .039, SZ + SH / 2); o.rotation_euler = (math.pi / 2, 0, 0)

# ---------- the lamp above the header ----------
LZ = H + HH + .07
K.box("LampHousing", (.4, .05, .11), (0, -.025, LZ), K.GREEN_D, .01)
K.box("ExitLamp", (.34, .012, .07), (0, -.054, LZ + .02), LAMP, .004)

# ---------- the leaf, built closed (extending -X from the hinge) and swung open ----------
LW, LH, LT = 1.0, H - .015, .045
hinge = bpy.data.objects.new("DoorLeaf", None); K.link(hinge); hinge.location = (W / 2, Y0, .008)
def part(o, x, y, z):
    o.parent = hinge; o.location = (x, y, z); return o
part(K.box("LeafSlab", (LW, LT, LH), (0, 0, 0), LEAF, .01), -LW / 2, -LT / 2, 0)
def framed(tag, z0, z1, inner):
    """A brass-framed panel on both faces of the leaf."""
    w, h, t = LW - .26, z1 - z0, .022
    for side, yy in ((-1, -LT), (1, 0)):
        part(K.box(f"{tag}In{side}", (w - .03, .01, h - .03), (0, 0, 0), inner, .006), -LW / 2, yy + (-.004 if side < 0 else .004), z0 + .015)
        for n, (dx, dz, bw, bh) in enumerate(((0, 0, w, t), (0, h - t, w, t), (-(w - t) / 2, 0, t, h), ((w - t) / 2, 0, t, h))):
            part(K.box(f"{tag}Br{side}{n}", (bw, .014, bh), (0, 0, 0), K.BRASS, .004), -LW / 2 + dx, yy + (-.006 if side < 0 else .006), z0 + dz)
framed("Glass", 1.3, 2.17, PANE)
framed("Panel", .28, 1.08, LEAF)
for side, yy in ((-1, -LT - .012), (1, .012)):
    part(K.box(f"Handle{side}", (.14, .022, .03), (0, 0, 0), K.BRASS, .008), -LW + .14, yy, 1.02)
    part(K.box(f"Rose{side}", (.05, .01, .1), (0, 0, 0), K.BRASS, .004), -LW + .08, yy, .975)
for z in (.25, 1.2, 2.15):
    part(K.cyl(f"Knuckle{z}", .014, .014, .1, (0, 0, 0), K.BRASS, 16), 0, .0, z)
hinge.rotation_euler.z = math.pi / 2       # local -X now points into the shop (-Y)

K.finish(OUT, "exit_door", ortho=3.4, centre=(0, -.4, 1.3))
