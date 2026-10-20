"""Canopy A-frame sidewalk sign for the online pickup window: an oak-framed chalkboard sandwich board.

Two boards hinged at the top (brass hinges, a little chain between them), splayed apart at the foot.  The front
board carries chalk lettering, "ONLINE" over "PICKUP", an arrow and a doodled bag with a leaf; the back board a
smaller "ORDER AHEAD".  Chalk is flat (no extrusion) to keep the count down.

The front board faces Blender -Y (map +z).  Origin at the footprint centre on the pavement.  About 0.62 m wide,
0.95 m tall, 0.5 m deep at the foot.

Needs canopy_kit.py one folder up (or next to this file).  Run headless with
    python aframe_sign.py -- OUT_DIR
"""
import os, sys, math
try:
    here = os.path.dirname(os.path.abspath(__file__))
    sys.path.insert(0, here); sys.path.insert(0, os.path.dirname(here))
except NameError: pass
import bpy
import canopy_kit as K

OUT = K.begin("AFrameSign")
SLATE = K.mat("Slate", "#2c3530", .85)
CHALK = K.mat("Chalk", "#f3ead6", .9)
CHALK_G = K.mat("ChalkGreen", "#b6e58c", .9)
CHALK_Y = K.mat("ChalkGold", "#f0d89a", .9)

BW, BH = .62, .95              # board width, slant length
FOOT = .25                     # each foot's distance from the centre line
TILT = math.asin(FOOT / BH)
fb = os.environ.get("CANOPY_FONT") or next((p for p in (os.path.join(d, "fonts", "Fredoka-SemiBold.ttf") for d in sys.path[:2]) if os.path.exists(p)), None)
font = bpy.data.fonts.load(fb) if fb else None

def board(tag, side):
    """A board hinged at the top: an empty at the hinge line, tilted so its foot lands at y = side * FOOT."""
    piv = bpy.data.objects.new(tag, None); K.link(piv)
    piv.location = (0, 0, BH * math.cos(TILT)); piv.rotation_euler = (side * TILT, 0, 0)
    def part(o):
        o.parent = piv; return o
    fr = .045
    # frame: two stiles running past the board to make legs, a top rail and a bottom rail
    for s in (-1, 1):
        part(K.box(f"{tag}Stile{s}", (fr, .03, BH), (s * (BW / 2 - fr / 2), 0, -BH), K.OAK, .006, 1))
    part(K.box(f"{tag}TopRail", (BW, .03, fr), (0, 0, -fr), K.OAK, .006, 1))
    part(K.box(f"{tag}BottomRail", (BW - 2 * fr, .03, fr), (0, 0, -BH + .1), K.OAK, .006, 1))
    part(K.box(f"{tag}Slate", (BW - 2 * fr, .016, BH - .1 - 2 * fr + .01), (0, 0, -BH + .1 + fr - .005), SLATE, 0))
    return piv, part

def chalk_text(name, body, size, z, parent, side, m=CHALK):
    t = bpy.data.curves.new(name, "FONT"); t.body = body; t.resolution_u = 2; t.size = size; t.extrude = 0
    t.align_x = "CENTER"; t.align_y = "CENTER"; t.space_character = 1.06
    if font: t.font = font
    o = bpy.data.objects.new(name, t); K.link(o, m); o.parent = parent
    o.location = (0, side * .0095, z); o.rotation_euler = (math.pi / 2, 0, 0 if side < 0 else math.pi)
    return o

def stroke(name, pts, parent, side, m=CHALK, r=.006, mirror=False):
    o = K.tube(name, [(-x if mirror else x, side * .011, z) for x, z in pts], r, m); o.data.bevel_resolution = 0; o.data.resolution_u = 1
    o.parent = parent; return o

front, fp = board("Front", -1)
back, bp = board("Back", 1)
# front board: ONLINE / PICKUP, an arrow pointing left (to the window, as the map stands it), a bag doodle with a leaf
chalk_text("ChalkOnline", "ONLINE", .095, -.2, front, -1, CHALK_G)
chalk_text("ChalkPickup", "PICKUP", .12, -.33, front, -1, CHALK)
stroke("ChalkUnderline", [(-.2, -.41), (.2, -.405)], front, -1, CHALK_Y, .005)
# kraft bag doodle: body, fold line, handle, and a leaf on it
stroke("ChalkBag", [(-.17, -.75), (-.17, -.53), (.0, -.53), (.0, -.75), (-.17, -.75)], front, -1, CHALK, mirror=True)
stroke("ChalkFold", [(-.17, -.58), (.0, -.58)], front, -1, CHALK, mirror=True)
stroke("ChalkHandle", [(-.12, -.53), (-.12, -.48), (-.05, -.48), (-.05, -.53)], front, -1, CHALK, mirror=True)
stroke("ChalkLeaf", [(-.085, -.72), (-.085, -.62), (-.12, -.66), (-.085, -.72), (-.05, -.66), (-.085, -.62)], front, -1, CHALK_G, mirror=True)
# arrow toward the window
stroke("ChalkArrow", [(.05, -.64), (.21, -.64)], front, -1, CHALK_Y, .007, mirror=True)
stroke("ChalkArrowHead", [(.15, -.59), (.21, -.64), (.15, -.69)], front, -1, CHALK_Y, .007, mirror=True)
# back board
chalk_text("ChalkOrder", "ORDER", .09, -.28, back, 1, CHALK)
chalk_text("ChalkAhead", "AHEAD", .09, -.4, back, 1, CHALK_G)
# brass hinges at the top and a chain keeping the legs apart
for s in (-1, 1):
    K.cyl(f"Hinge{s}", .016, .016, .07, (s * (BW / 2 - .12), 0, BH * math.cos(TILT) - .035), K.BRASS, 8).rotation_euler.y = math.pi / 2
    K.cyl(f"Hinge{s}", .016, .016, .07, (s * (BW / 2 - .12) - .035, 0, BH * math.cos(TILT) - .02), K.BRASS, 8).rotation_euler.y = math.pi / 2
cz, fr = .3, .045
off = FOOT * (cz / (BH * math.cos(TILT)))
for s in (-1, 1):
    K.tube(f"Chain{s}", [(s * (BW / 2 - fr), -(FOOT - off) + .02, cz), (s * (BW / 2 - fr), (FOOT - off) - .02, cz)], .004, K.BRASS)
# rubber feet
for s in (-1, 1):
    for side in (-1, 1):
        K.box(f"Foot{s}{side}", (.05, .05, .02), (s * (BW / 2 - .0225), side * (FOOT - .005), 0), K.DARK, .004, 1)

K.finish(OUT, "aframe_sign", ortho=1.4, centre=(0, 0, .48))
