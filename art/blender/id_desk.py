"""Canopy ID desk at the door (tier 3), modelled from the current sprite.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P id_desk.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import canopy_kit as K

OUT = K.begin("IdDesk")
TOPSTONE = K.mat("CreamTop", "#f0d9a8", .4)
SCANGLASS = K.mat("ScanGlass", "#3d4a40", .15, 0, .25)
INSET = K.mat("PanelInset", "#5a3420", .5)
LAMP = K.mat("ScanLight", "#fff2c8", .3, 0, 3.)

def panel(tag, cx, cy, w, h, z0, along_x=True):
    """A raised walnut panel with a brass frame, on the -Y face (along_x) or the +X face."""
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

# ---------- walnut desk with round brass pilasters ----------
L, D, H = 1.25, .6, .82
K.box("Plinth", (L + .12, D + .12, .13), (0, 0, 0), K.WOOD_D, .025)
K.box("PlinthBrass", (L + .1, D + .1, .02), (0, 0, .13), K.BRASS, .006)
K.box("Body", (L, D, H - .2), (0, 0, .14), K.WOOD, .01)
PW = (L - .14) / 2
for i in range(2):
    panel(f"Front{i}", -L / 2 + .07 + PW * (i + .5), -D / 2, PW - .05, .5, .2)
panel("End", L / 2, 0, D - .16, .5, .2, along_x=False)
for sx in (-1, 1):
    for sy in (-1, 1):
        x, y = sx * L / 2, sy * D / 2
        K.cyl(f"Column{sx}{sy}", .032, .032, H - .24, (x, y, .15), K.BRASS, 24)
x = -L / 2 + .07 + PW
K.cyl("ColumnMid", .026, .026, H - .24, (x, -D / 2 - .01, .15), K.BRASS, 24)
K.box("TopBand", (L + .06, D + .06, .03), (0, 0, H - .09), K.BRASS, .008)
K.box("Top", (L + .2, D + .2, .11), (0, 0, H - .07), TOPSTONE, .045, 5)
TOP = H + .04

# ---------- ID scanner: green pad with a lit glass window, arm and lamp head ----------
PX, PY = .2, -.08
K.box("ScanPad", (.46, .42, .055), (PX, PY, TOP), K.GREEN, .025, 4)
K.box("ScanFrame", (.32, .29, .01), (PX, PY, TOP + .054), K.BRASS, .005)
K.box("ScanWindow", (.27, .24, .008), (PX, PY, TOP + .059), SCANGLASS, .003)
AX, AY = PX + .02, PY + .25
K.box("ArmFoot", (.2, .14, .05), (AX, AY, TOP), K.GREEN, .025)
K.box("ArmCol", (.13, .1, .5), (AX, AY, TOP + .04), K.GREEN, .035, 4)
K.cyl("ArmKnob", .025, .025, .02, (AX - .065, AY - .0, TOP + .44), K.BRASS, 16).rotation_euler.y = -math.pi / 2
K.tube("ArmBend", [(AX, AY, TOP + .5), (AX, AY - .02, TOP + .6), (AX, AY - .1, TOP + .64)], .05, K.GREEN)
K.box("LampHead", (.42, .26, .1), (PX, PY + .02, TOP + .6), K.GREEN, .035, 4)
K.box("LampTrim", (.4, .24, .014), (PX, PY + .02, TOP + .594), K.BRASS, .005)
K.box("LampGlow", (.3, .15, .006), (PX, PY + .02, TOP + .588), LAMP, .003)

K.finish(OUT, "id_desk", ortho=2.3, centre=(0, 0, .8))
