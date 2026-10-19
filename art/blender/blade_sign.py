"""Canopy neon leaf OPEN blade sign (entrance.js): a forest-green bracket off the street door's post holding a dark
panel on two brass hangers.  Both faces of the panel are quads, SignFaceA (toward Blender +Y, map -z) and SignFaceB
(toward Blender -Y, map +z), material "SignFace", UVs 0..1 with u along +X and v up, so code keeps painting its neon
leaf + OPEN canvas on them.  From layout.entrance: wall x -10.65, panel x -11.9..-10.95, heights 2.05..3.1 world, at
map z 11.19.  Origin on the floor directly below where the bracket meets the post: map (-10.65, 0, 11.19).
The panel sticks out toward Blender -X (map -x, the street).

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P blade_sign.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import bpy
import canopy_kit as K

OUT = K.begin("BladeSign")
M, V = 1 / 1.69, .7247
GREEN = K.mat("BracketGreen", "#1f6b47", .45, .2); PANEL = K.mat("SignPanel", "#1d211f", .5)
FACE = K.mat("SignFace", "#1a1d1b", .6)

X0, X1 = (-11.9 + 10.65) * M, (-10.95 + 10.65) * M     # panel x relative to the wall
Y0, Y1 = 2.05 * V, 3.1 * V
T = .1 * M                                           # panel thickness (map z .1)
K.box("WallPlate", (.02, .07, .2), (-.01, 0, Y1 + .02 * V - .04), GREEN, .006, 1)
K.box("Arm", (abs(X0) + .02, .036, .034), ((X0 - .02) / 2, 0, Y1 + .1 * V), GREEN, .008, 1)
K.cyl("ArmEnd", .024, .024, .04, (X0 - .02, -.02, Y1 + .1 * V + .017), K.BRASS, 12).rotation_euler.x = math.pi / 2
# A scroll brace under the arm, back to the plate.
br = K.tube("Brace", [(-.01, 0, Y1 - .06), (-.07, 0, Y1 + .02), (-.19, 0, Y1 + .085)], .009, GREEN)
for i, x in enumerate((X0 + .12 * M, X1 - .12 * M)):
    K.cyl(f"Hanger{i}", .005, .005, .08 * V + .006, (x, 0, Y1 + .02), K.BRASS, 6)
    K.cyl(f"HangerEye{i}", .011, .011, .012, (x, 0, Y1 + .095), K.BRASS, 8).rotation_euler.x = math.pi / 2
K.box("Panel", (X1 - X0 + .08 * M, T, (Y1 - Y0) + .08 * V), ((X0 + X1) / 2, 0, Y0 - .04 * V), PANEL, .01, 2)
K.box("PanelTrim", (X1 - X0 + .08 * M + .006, T - .02, .012), ((X0 + X1) / 2, 0, Y1 + .04 * V - .01), K.BRASS, .003, 1)

def face(name, y, normal_y):
    """A quad over the panel's face area, a hair proud of the panel, UVs (0,0) at bottom-left looking along +X."""
    me = bpy.data.meshes.new(name)
    v = [(X0, y, Y0), (X1, y, Y0), (X1, y, Y1), (X0, y, Y1)]
    f = [(0, 1, 2, 3)] if normal_y < 0 else [(3, 2, 1, 0)]
    me.from_pydata(v, [], f)
    uv = me.uv_layers.new(name="UVMap")
    coords = {0: (0, 0), 1: (1, 0), 2: (1, 1), 3: (0, 1)}
    for loop in me.loops: uv.data[loop.index].uv = coords[loop.vertex_index]
    me.materials.append(FACE)
    o = bpy.data.objects.new(name, me); K.col.objects.link(o)
    return o
face("SignFaceA", T / 2 + .002, 1)
face("SignFaceB", -T / 2 - .002, -1)
K.finish(OUT, "blade_sign", ortho=1.4, centre=(-.35, 0, 1.8))
