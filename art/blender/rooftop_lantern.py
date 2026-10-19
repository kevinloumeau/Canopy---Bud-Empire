"""Canopy rooftop lounge: the tall brass lantern of the Members' club tier (used twice, at the deck's far corners).

Matches rooftop.js (PR #64, t8): a brass foot .26 map square and .1 world high, a .06 brass pole to 1.35 world, the
lantern .24 wide and .34 world tall, and a .3 cap at 1.69 world.  Origin on the deck at the centre of the foot.
The warm core is its own mesh "LanternGlow" with its own material "LanternGlow", so code can drive its glow at night.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P rooftop_lantern.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import bpy
import canopy_kit as K

def H(m): return m / 1.69          # map units across -> metres
def V(w): return w * .7247         # world heights -> metres

OUT = K.begin("RooftopLantern")
GLOW = K.mat("LanternGlow", "#fff1cf", .4, 0, 4.)
DARKB = K.mat("BrassDark", "#8a6a2c", .35, 1.)

# ---------- foot and pole ----------
K.box("Foot", (H(.26), H(.26), V(.07)), (0, 0, 0), K.BRASS, .006, 1)
K.box("FootStep", (H(.19), H(.19), V(.03)), (0, 0, V(.07)), K.BRASS, .004, 1)
K.cyl("Pole", H(.03), H(.026), V(1.35) - V(.1), (0, 0, V(.1)), K.BRASS, 10)
K.cyl("PoleCollar", H(.045), H(.045), .02, (0, 0, V(.55)), K.BRASS, 10)

# ---------- the lantern: brass frame, glass panes, a warm core, pyramid roof and a ring ----------
L0, LH, LW = V(1.35), V(.34), H(.24)
K.box("LanternBase", (LW + .012, LW + .012, .018), (0, 0, L0), K.BRASS, .004, 1)
K.box("LanternTop", (LW + .012, LW + .012, .016), (0, 0, L0 + LH - .016), K.BRASS, .004, 1)
for sx in (-1, 1):
    for sy in (-1, 1):
        K.box(f"LanternPost{sx}{sy}", (.012, .012, LH - .03), (sx * LW / 2, sy * LW / 2, L0 + .016), K.BRASS, .002, 1)
for i, (x, y, rz) in enumerate(((0, -LW / 2, 0), (0, LW / 2, 0), (-LW / 2, 0, math.pi / 2), (LW / 2, 0, math.pi / 2))):
    g = K.box(f"Pane{i}", (LW - .012, .003, LH - .036), (x, y, L0 + .018), K.GLASS, 0); g.rotation_euler.z = rz
K.cyl("CandleBase", .028, .028, .02, (0, 0, L0 + .018), DARKB, 10)
K.cyl("LanternGlow", .022, .018, LH * .55, (0, 0, L0 + .038), GLOW, 10)
roof = K.cyl("Roof", H(.3) * .72, .012, V(.09), (0, 0, V(1.69)), K.BRASS, 4); roof.rotation_euler.z = math.pi / 4
K.box("Cap", (H(.3), H(.3), V(.05) * .6), (0, 0, V(1.69) - .01), K.BRASS, .005, 1)
RZ = V(1.69) + V(.09) + .03
K.tube("Ring", [(.022 * math.cos(t * math.pi / 6), 0, RZ + .022 * math.sin(t * math.pi / 6)) for t in range(13)], .004, K.BRASS)

K.finish(OUT, "rooftop_lantern", ortho=1.7, centre=(0, 0, .7))
