"""Canopy lounge door under the LOUNGE sign (rooftop.js, "The lounge door"), modelled for the 3D map.

A forest-green frame proud of the facade, the short back hallway behind it (dark reveals through the wall, a back
wall, a ceiling, the red velvet runner and a warm sconce "Sconce" with its own material "Sconce"), and the green
panelled leaf "DoorLeaf" hung from its left jamb.  DoorLeaf's origin is on the hinge axis; the model is shut, and
code opens it by turning DoorLeaf about Blender +Z (three.js +y) by up to 1.75 rad, swinging it into the hallway
(+Y).  "StaffPlaque" (cream plate, brass border, STAFF ONLY in Fredoka) is a child of the leaf, so code hides it
while the lounge is open.  Origin: the doorway's centre on the floor, in the facade plane (map z = loungeFront);
the street side is -Y, the hallway runs back toward +Y.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P lounge_door.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import bpy
import canopy_kit as K

OUT = K.begin("LoungeDoor")
H = lambda m: m / 1.69
V = lambda w: w * 0.7247
FRAME = K.mat("DoorFrame", "#1f4a35", .45)
LEAF = K.mat("DoorLeafGreen", "#2d6146", .5)
PANEL = K.mat("DoorPanel", "#357052", .5)
REVEAL = K.mat("HallReveal", "#26302a", .7)
BACKW = K.mat("HallBack", "#2f3a32", .7)
CEIL = K.mat("HallCeiling", "#1d241f", .7)
VELVET = K.mat("Velvet", "#6b2436", .8)
PLATE = K.mat("PlaqueCream", "#ece4d2", .5)
INK = K.mat("PlaqueInk", "#1f3a2c", .5)
SCONCE = K.mat("Sconce", "#fff2c8", .3, 0, 2.)

def span(name, x0, x1, h0, h1, z0, z1, m, bevel=.004):
    return K.box(name, (H(x1 - x0), H(z1 - z0), V(h1 - h0)), (H((x0 + x1) / 2), -H((z0 + z1) / 2), V(h0)), m, bevel, 1)

HW, HEAD, THICK = .7, 2.05, .81
BACK = -(THICK + 1.5)
# Frame, proud of the facade on the street side.
span("JambL", -HW - .12, -HW, 0, HEAD + .12, -.02, .1, FRAME, .01)
span("JambR", HW, HW + .12, 0, HEAD + .12, -.02, .1, FRAME, .01)
span("Header", -HW - .12, HW + .12, HEAD, HEAD + .14, -.02, .1, FRAME, .01)
span("HeaderBrass", -HW - .1, HW + .1, HEAD + .14, HEAD + .165, -.0, .1, K.BRASS, .004)
span("ThresholdBrass", -HW, HW, 0, .02, -.02, .1, K.BRASS, .003)
# The hallway through the wall and beyond.
span("RevealL", -HW - .1, -HW, 0, HEAD, BACK, -.02, REVEAL, 0)
span("RevealR", HW, HW + .1, 0, HEAD, BACK, -.02, REVEAL, 0)
span("HallBack", -HW, HW, 0, HEAD, BACK - .1, BACK, BACKW, 0)
span("HallCeiling", -HW, HW, HEAD, HEAD + .05, BACK, -.02, CEIL, 0)
span("Runner", -.38, .38, .004, .014, BACK, -.02, VELVET, 0)
span("RunnerBrass", -.43, .43, .002, .01, BACK, -.02, K.BRASS, 0)
s = K.cyl("Sconce", H(.1), H(.1), H(.2), (0, -H(BACK + .1), V(HEAD - .45) - H(.1)), SCONCE, 12)
K.box("SconcePlate", (H(.18), H(.03), H(.3)), (0, -H(BACK + .015), V(HEAD - .45) - H(.15)), K.BRASS, .003, 1)
K.box("SconceShade", (H(.26), H(.16), H(.06)), (0, -H(BACK + .1), V(HEAD - .45) + H(.1)), K.BRASS, .01, 1)

# The leaf, hung from its left jamb; its front faces the street (-Y).
hinge = bpy.data.objects.new("DoorLeaf", None); K.link(hinge); hinge.location = (H(-HW + .02), -H(.02), 0)
LW, LH = HW * 2 - .04, HEAD - .03
def leaf(name, x0, x1, h0, h1, z0, z1, m, bevel=.004):
    """A part of the leaf given relative to the hinge (map x along the leaf, z out of it)."""
    o = K.box(name, (H(x1 - x0), H(z1 - z0), V(h1 - h0)), (H((x0 + x1) / 2), -H((z0 + z1) / 2), V(h0)), m, bevel, 1)
    o.parent = hinge
    return o
leaf("Leaf", 0, LW, .01, LH, -.03, .03, LEAF, .008)
for k, (a, b) in enumerate(((.32, .95), (1.15, 1.85))):
    leaf(f"Panel{k}", .14, LW - .14, a, b, .03, .05, PANEL, .006)
    leaf(f"PanelBack{k}", .14, LW - .14, a, b, -.05, -.03, PANEL, .006)
leaf("KickPlate", .08, LW - .08, .02, .2, .03, .045, K.BRASS, .003)
leaf("Handle", LW - .2, LW - .12, .95, 1.1, .03, .1, K.BRASS, .01)
leaf("HandleBack", LW - .2, LW - .12, .95, 1.1, -.1, -.03, K.BRASS, .01)
for k, h in enumerate((.35, 1.7)):
    leaf(f"Knuckle{k}", -.03, .03, h, h + .18, -.03, .03, K.BRASS, .008)
# STAFF ONLY plaque on the leaf's street face; code hides it once the lounge is open.
plaque = bpy.data.objects.new("StaffPlaque", None); K.link(plaque); plaque.parent = hinge
PX, PY, PW, PH = LW * .62, 1.5, .66, .25
plaque.location = (H(PX), -H(.05), V(PY))
def pl(name, w, h, d, z, m, bevel=.003):
    o = K.box(name, (H(w), H(d), V(h)), (0, -H(z), -V(h) / 2), m, bevel, 1); o.parent = plaque; return o
pl("PlaqueBrass", PW, PH, .012, .006, K.BRASS)
pl("Plaque", PW - .04, PH - .04, .012, .014, PLATE)
txt = bpy.data.curves.new("PlaqueText", "FONT"); txt.body = "STAFF ONLY"
txt.size = H(.105); txt.align_x = "CENTER"; txt.align_y = "CENTER"; txt.resolution_u = 2; txt.extrude = 0
fb = os.environ.get("CANOPY_FONT") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts", "Fredoka-SemiBold.ttf")
if os.path.exists(fb): txt.font = bpy.data.fonts.load(fb)
to = K.link(bpy.data.objects.new("PlaqueText", txt), INK); to.parent = plaque
to.location = (0, -H(.021), 0); to.rotation_euler = (math.pi / 2, 0, 0)

K.finish(OUT, "lounge_door", ortho=2.6, centre=(0, H(.6), .75))
