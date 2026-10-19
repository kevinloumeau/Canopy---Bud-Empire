"""Canopy flip menu board on the product wall, modelled from the flat menu frame sprite.

An oak frame with brass corner bolts, a cream inner border with brass bar rails at the sides and a brass inner
frame round the dark flip-letter face.  The face is one flat rectangle named "BoardFace" (UVs 0..1, material
"BoardFace") that the game paints with its own canvas.  Origin: on the floor directly below the board's centre,
in the wall plane (the board's back face); the board faces Blender -Y.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P menu_board.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy
import canopy_kit as K

OUT = K.begin("MenuBoard")
CREAMB = K.mat("BoardCream", "#efe2c2", .5)
FACE = K.mat("BoardFace", "#131617", .6)

W, H, Z0, D = 3.18, 1.07, 1.218, .085      # outer frame, bottom edge height, depth off the wall (bolts .098)
FW, FH = 2.935, .797                       # the dark flip-letter face
OW, OH = .05, .085                        # oak border: sides, top/bottom
ZC = Z0 + H / 2

K.box("OakBack", (W, .05, H), (0, -.025, Z0), K.OAK, .006)
for n, z in enumerate((Z0, Z0 + H - OH)):        # chunky top and bottom rails with rounded ends
    K.box(f"OakRail{n}", (W, .036, OH), (0, -.067, z), K.OAK, .022, 4)
for n, x in enumerate((-(W - OW) / 2 + .012, (W - OW) / 2 - .012)):
    K.box(f"OakPost{n}", (OW - .024, .024, H - 2 * OH + .01), (x, -.061, Z0 + OH - .005), K.OAK, .008)
K.box("CreamInset", (W - 2 * OW + .004, .008, H - 2 * OH + .004), (0, -.053, Z0 + OH - .002), CREAMB, .002)

# brass inner frame round the face
BT = .016
for n, (x, z, w, h) in enumerate(((0, ZC - FH / 2 - BT, FW + 2 * BT, BT), (0, ZC + FH / 2, FW + 2 * BT, BT),
                                  (-(FW + BT) / 2, ZC - FH / 2, BT, FH), ((FW + BT) / 2, ZC - FH / 2, BT, FH))):
    K.box(f"BrassFrame{n}", (w, .014, h), (x, -.062, z), K.BRASS, .004)

# the face: one quad facing -Y with UVs 0..1 (u along +X, v up)
y = -.0585
verts = [(-FW / 2, y, ZC - FH / 2), (FW / 2, y, ZC - FH / 2), (FW / 2, y, ZC + FH / 2), (-FW / 2, y, ZC + FH / 2)]
me = bpy.data.meshes.new("BoardFace"); me.from_pydata(verts, [], [(0, 1, 2, 3)])
uv = me.uv_layers.new(name="UVMap")
for li, (u, v) in zip(range(4), ((0, 0), (1, 0), (1, 1), (0, 1))): uv.data[li].uv = (u, v)
K.link(bpy.data.objects.new("BoardFace", me), FACE)

# brass bar rails in the cream side strips, with knob ends
SX = (FW / 2 + BT + (W / 2 - OW + .012)) / 2
for sx in (-1, 1):
    x = sx * SX
    K.tube(f"SideBar{sx}", [(x, -.064, ZC - FH / 2 + .07), (x, -.064, ZC + FH / 2 - .07)], .009, K.BRASS)
    for z in (ZC - FH / 2 + .07, ZC + FH / 2 - .07):
        o = K.cyl(f"BarKnob{sx}{z:.2f}", .013, .013, .012, (x, -.056, z), K.BRASS, 20); o.rotation_euler.x = math.pi / 2

# brass bolts on the oak frame: corners and side middles
for x in (-(W / 2 - OW / 2), W / 2 - OW / 2):
    for z in (Z0 + OH / 2, Z0 + H - OH / 2):
        o = K.cyl(f"Bolt{x:.2f}{z:.2f}", .03, .026, .014, (x, -.084, z), K.BRASS, 24); o.rotation_euler.x = math.pi / 2

K.finish(OUT, "menu_board", ortho=3.6, centre=(0, 0, 1.75))
