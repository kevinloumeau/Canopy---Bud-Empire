"""Riverside boathouse: a small board-and-batten cedar shed under a sage metal gable, a green front door and window
facing the viewer (-Y), a braced barn door and a lifebuoy on the river side (+X).

Fits the 2D boathouse: 3.6 by 3.8 map units (2.13 by 2.25 m), walls 2.5 tall (1.81 m), roof 1.4 more (1.0 m).
Run headless:  python boathouse.py -- OUT_DIR   (bpy) or  blender -b -P boathouse.py -- OUT_DIR
"""
import math
from branch_kit import K, prism, torus, tris

OUT = K.begin("Boathouse")
CEDAR = K.mat("Cedar", "#cf9f62", .7); CEDAR_D = K.mat("CedarDark", "#a8783f", .75)
ROOF = K.mat("RoofSage", "#6d7f6c", .55); ROOF_D = K.mat("RoofSageDark", "#4c5d4f", .55)
DOOR = K.mat("DoorGreen", "#2f4237", .5); STONE = K.mat("Plinth", "#b9bba8", .8)
TRIM = K.mat("TrimCream", "#dcc294", .6); RED = K.mat("BuoyRed", "#d9694f", .6); WHITE = K.mat("BuoyWhite", "#f3ead6", .6)
LAMP = K.mat("LampGlow", "#fff0c2", .4, 0, 1.5)
W, D, H, RISE, EAVE = 2.13, 2.25, 1.81, 1.0, .16

K.box("Plinth", (W + .12, D + .12, .1), (0, 0, 0), STONE, .02, 1)
K.box("Walls", (W, D, H), (0, 0, .1), CEDAR, .015, 1)
# Battens on the two faces the camera sees.
for i in range(9):
    x = -W / 2 + .12 + i * (W - .24) / 8
    if .2 < x < .66: continue                     # the front door
    K.box(f"BattenF{i}", (.035, .03, H - .04), (x, -D / 2 - .012, .12), CEDAR_D, 0)
for i in range(9):
    y = -D / 2 + .12 + i * (D - .24) / 8
    if -.55 < y < .55: continue                   # the barn door
    K.box(f"BattenE{i}", (.03, .035, H - .04), (W / 2 + .012, y, .12), CEDAR_D, 0)
# Gable ends and the roof: ridge along X.
half = D / 2
import bpy as B
def gable(name, x):
    mesh = B.data.meshes.new(name)
    v = [(x - .01, -half, H + .1), (x - .01, half, H + .1), (x - .01, 0, H + .1 + RISE), (x + .01, -half, H + .1), (x + .01, half, H + .1), (x + .01, 0, H + .1 + RISE)]
    mesh.from_pydata(v, [], [(0, 2, 1), (3, 4, 5), (0, 1, 4, 3), (1, 2, 5, 4), (2, 0, 3, 5)]); mesh.update()
    return K.link(B.data.objects.new(name, mesh), CEDAR)
gable("GableW", -W / 2 + .01); gable("GableE", W / 2 - .01)
slope = math.atan2(RISE, half); length = math.hypot(half, RISE) + EAVE
for s in (-1, 1):
    o = K.box(f"Roof{'S' if s < 0 else 'N'}", (W + 2 * EAVE, length, .06), (0, 0, 0), ROOF if s < 0 else ROOF_D, .01, 1)
    o.rotation_euler.x = -s * slope
    # The box grows up from its base centre; tilt it about the ridge and slide it down its own slope.
    o.location = (0, s * (length / 2) * math.cos(slope), H + .1 + RISE - (length / 2) * math.sin(slope) + .02)
K.box("Ridge", (W + 2 * EAVE + .04, .1, .07), (0, 0, H + .1 + RISE - .02), ROOF_D, .02, 1)
# Front: door, step, window with frame and box, lantern.
K.box("Door", (.46, .04, 1.32), (.43, -D / 2 - .02, .1), DOOR, .01, 1)
K.box("DoorTrim", (.54, .03, 1.38), (.43, -D / 2 - .005, .08), TRIM, .005, 1)
K.box("DoorKnob", (.04, .04, .04), (.6, -D / 2 - .05, .72), TRIM, .01, 1)
K.box("Step", (.62, .22, .08), (.43, -D / 2 - .13, 0), STONE, .01, 1)
K.box("WindowFrame", (.52, .03, .48), (-.54, -D / 2 - .015, .66), TRIM, .006, 1)
K.box("WindowGlass", (.44, .03, .4), (-.54, -D / 2 - .025, .7), K.mat("Pane", "#9fc4bd", .15), 0)
K.box("WindowBar", (.03, .035, .4), (-.54, -D / 2 - .03, .7), TRIM, 0)
K.box("FlowerBox", (.56, .14, .12), (-.54, -D / 2 - .08, .54), CEDAR_D, .01, 1)
for i in range(5):
    K.box(f"Flower{i}", (.07, .07, .07), (-.76 + i * .11, -D / 2 - .08, .66), [RED, WHITE, K.mat("Bloom", "#e5c86e", .6)][i % 3] if i % 2 else K.mat("Sprig", "#5f8a5a", .7), .02, 1)
K.box("LampArm", (.04, .14, .04), (.43, -D / 2 - .07, 1.6), DOOR, 0)
K.box("Lamp", (.12, .12, .16), (.43, -D / 2 - .14, 1.5), LAMP, .01, 1)
K.box("LampCap", (.16, .16, .03), (.43, -D / 2 - .14, 1.66), DOOR, .005, 1)
# Leaf medallion in the river-side gable.
med = K.cyl("Medallion", .2, .2, .03, (0, 0, 0), TRIM, 20); med.rotation_euler.y = math.pi / 2; med.location = (W / 2 - .01, 0, H + .1 + RISE * .4)
K.inst("MedallionLeaf", K.LEAF_MESHES[2], (W / 2 + .035, 0, H + .1 + RISE * .4 - .11), (math.pi / 2, 0, math.pi / 2), 1.7)
# River side: a braced double barn door and a lifebuoy.
K.box("BarnDoor", (.04, 1.04, 1.2), (W / 2 + .02, 0, .1), DOOR, .01, 1)
for z in (.16, .66, 1.18):
    K.box(f"BarnRail{z}", (.03, 1.04, .07), (W / 2 + .045, 0, z), TRIM, 0)
for s in (-1, 1):
    o = K.box(f"BarnBrace{s}", (.03, .07, 1.0), (W / 2 + .045, s * .26, .2), TRIM, 0); o.rotation_euler.x = s * .45
torus("Lifebuoy", (W / 2 + .05, -.82, 1.05), .17, .045, RED, (0, math.pi / 2, 0), 16, 6)
for k in range(4):
    a = k * math.pi / 2 + math.pi / 4
    K.box(f"BuoyBand{k}", (.03, .07, .1), (W / 2 + .06, -.82 + math.cos(a) * .17, 1.0 + math.sin(a) * .17), WHITE, .01, 1)
K.finish(OUT, "boathouse", ortho=4.4, centre=(0, 0, 1.3))
tris(OUT, "boathouse")
