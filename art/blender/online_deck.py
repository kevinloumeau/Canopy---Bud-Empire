"""Canopy online orders deck (built), modelled from the current sprite.

A raised oak deck on green steel braces with the ONLINE ORDERS counter and sign, a drone landing pad on posts
above it, and a flight of stairs down to a foot landing.  The origin is the centre of the whole footprint on the
floor at the stair foot; the empty "DeckCentre" marks the middle of the deck's walking surface.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P online_deck.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy
from mathutils import Vector
import canopy_kit as K

OUT = K.begin("OnlineDeck")
STEEL = K.mat("DeckSteel", "#1f5a3c", .45, .2)
DECKWOOD = K.mat("DeckOak", "#d9a768", .55)
STRIPE = K.mat("PadStripe", "#e3b320", .45)
CONE = K.mat("Cone", "#ec6a1c", .5)
TOPSTONE = K.mat("CreamTop", "#f0d9a8", .4)
SIGNBOARD = K.mat("SignBoard", "#f3e6c4", .5)

def beam(name, p0, p1, w, m=STEEL, h=None):
    """A square steel member from p0 to p1."""
    p0, p1 = Vector(p0), Vector(p1); d = p1 - p0
    o = K.box(name, (w, h or w, d.length), (0, 0, 0), m, .012)
    o.location = p0; o.rotation_mode = "QUATERNION"; o.rotation_quaternion = d.to_track_quat("Z", "Y")
    return o

def bolt(name, loc, axis="y"):
    o = K.cyl(name, .018, .018, .012, loc, K.BRASS, 12)
    if axis == "y": o.rotation_euler.x = math.pi / 2
    elif axis == "x": o.rotation_euler.y = math.pi / 2
    return o

def rail(tag, pts, posts):
    K.tube(tag, pts, .024, K.BRASS)
    for i, (x, y, z) in enumerate(posts):
        K.tube(f"{tag}Post{i}", [(x, y, z), (x, y, z + .42)], .02, K.BRASS)
        K.cyl(f"{tag}Knob{i}", .032, .032, .05, (x, y, z + .41), K.BRASS, 16)
        K.cyl(f"{tag}Foot{i}", .03, .03, .03, (x, y, z), STEEL, 16)

# ---------- the deck: oak boards on a green steel frame ----------
DL, DD, PH = 1.75, 1.1, 1.7          # deck length (x), depth (y), walking height
X0 = 0.0
K.box("DeckFrame", (DL, DD, .1), (X0, 0, PH - .1), STEEL, .015)
K.box("DeckBoards", (DL + .04, DD + .04, .05), (X0, 0, PH - .03), DECKWOOD, .012)
for x in (X0 - DL / 2 + .1, X0, X0 + DL / 2 - .1):
    bolt(f"DeckBoltF{x:.2f}", (x, -DD / 2 - .002, PH - .06))
for y in (-DD / 2 + .1, DD / 2 - .1):
    bolt(f"DeckBoltE{y:.2f}", (X0 + DL / 2 + .002, y, PH - .06), "x")

# braces: two diagonals from under the deck down to a floor beam that runs under the stairs
# ---------- stairs down to the foot landing ----------
SY0, SY1 = .0, .58                     # the flight runs off the back half of the deck's +x end
SW = SY1 - SY0; SYC = (SY0 + SY1) / 2
N = 12; RISE = PH / N; RUN = .19
SX0 = X0 + DL / 2
K.box("TopLanding", (.2, SW + .06, .05), (SX0 + .1, SYC, PH - .03), DECKWOOD, .01)
for i in range(N - 1):
    x = SX0 + .2 + RUN * (i + .5); z = PH - RISE * (i + 1)
    K.box(f"Tread{i}", (RUN + .02, SW, .045), (x, SYC, z - .045), DECKWOOD, .01)
    K.box(f"Riser{i}", (.02, SW, RISE - .045), (x + RUN / 2, SYC, z - RISE), STEEL, .004)
FOOT = SX0 + .2 + RUN * (N - 1)
for y in (SY0 - .03, SY1 + .03):
    beam(f"Stringer{y:.2f}", (SX0 + .2, y, PH - .05), (FOOT, y, 0), .05, STEEL, .16)
K.box("FootLanding", (.6, .7, .07), (FOOT + .3, SYC + .05, 0), DECKWOOD, .015)
K.box("FootFrame", (.62, .72, .03), (FOOT + .3, SYC + .05, 0), STEEL, .006)
for y in (SY0 - .03, SY1 + .03):
    top = [(SX0 + .1, y, PH + .42), (FOOT, y, .42 + .07)]
    posts = [(SX0 + .2 + RUN * k, y, PH - RISE * (k + 1) + .0) for k in range(0, N - 1, 3)] + [(FOOT, y, .07)]
    rail(f"StairRail{y:.2f}", top, posts)
rail("FootRail", [(FOOT, SY1 + .03, .49), (FOOT + .55, SY1 + .03, .49)], [(FOOT + .55, SY1 + .03, .07)])

NX = X0 + DL / 2 + .55                 # the braces meet at a node under the stairs; a floor beam runs on to the foot
for y0, y in ((-DD / 2 + .12, SY0 - .03), (DD / 2 - .12, SY1 + .03)):
    beam(f"Diag{y:.2f}", (X0 - DL / 2 + .12, y0, PH - .1), (NX, y, .14), .11)
    beam(f"Diag2{y:.2f}", (X0 + .35, y0, PH - .1), (NX, y, .14), .09)
    beam(f"FloorBeam{y:.2f}", (NX - .1, y, .07), (FOOT, y, .07), .13)
    bolt(f"BraceBolt{y:.2f}", (NX, y - .07, .14))
beam("FloorTie", (NX, SY0 - .03, .07), (NX, SY1 + .03, .07), .1)

# ---------- ONLINE ORDERS counter ----------
CX, CY = X0 - .22, -DD / 2 + .3
K.box("CounterBody", (1.1, .36, .42), (CX, CY, PH), K.GREEN, .012)
K.box("CounterBrass", (1.12, .38, .025), (CX, CY, PH + .02), K.BRASS, .006)
K.box("CounterPanel", (1.0, .01, .26), (CX, CY - .182, PH + .08), K.GREEN_D, .004)
for dz in (.08, .34):
    K.box(f"CounterTrim{dz}", (1.0, .014, .012), (CX, CY - .19, PH + dz - .006), K.BRASS, .003)
K.box("CounterTop", (1.18, .44, .07), (CX, CY, PH + .42), TOPSTONE, .03, 4)
K.box("SideBody", (.34, .32, .3), (CX + .74, CY - .04, PH), K.GREEN, .012)
K.box("SideBrass", (.36, .34, .02), (CX + .74, CY - .04, PH + .02), K.BRASS, .006)
K.box("SideTop", (.4, .36, .06), (CX + .74, CY - .04, PH + .3), TOPSTONE, .025, 4)

# ---------- sign on an oak portal behind the counter ----------
GY = -.03; G0, G1 = X0 - .5, X0 + .42
for x in (G0, G1):
    K.box(f"SignPost{x:.2f}", (.07, .07, 1.0), (x, GY, PH), DECKWOOD, .012)
K.box("SignBeam", (G1 - G0 + .1, .08, .07), ((G0 + G1) / 2, GY, PH + 1.0), DECKWOOD, .012)
K.box("SignBoard", (G1 - G0 - .1, .05, .3), ((G0 + G1) / 2, GY, PH + .66), DECKWOOD, .01)
K.box("SignFace", (G1 - G0 - .18, .01, .22), ((G0 + G1) / 2, GY - .03, PH + .7), SIGNBOARD, .004)
txt = bpy.data.curves.new("SignText", "FONT"); txt.body = "ONLINE ORDERS"
txt.size = .12; txt.extrude = .004; txt.align_x = "CENTER"; txt.align_y = "CENTER"
fb = os.environ.get("CANOPY_FONT") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts", "Fredoka-SemiBold.ttf")
if os.path.exists(fb): txt.font = bpy.data.fonts.load(fb)
to = K.link(bpy.data.objects.new("SignText", txt), K.GREEN_D)
to.location = ((G0 + G1) / 2, GY - .037, PH + .81); to.rotation_euler = (math.pi / 2, 0, 0)

# ---------- drone landing pad on steel posts ----------
PX0, PX1, PY0, PY1, PZ = X0 - .4, X0 + .82, .02, DD / 2 + .02, PH + 1.1
for x in (PX0 + .05, PX1 - .05):
    for y in (PY0 + .05, PY1 - .05):
        K.box(f"PadPost{x:.2f}{y:.2f}", (.09, .09, PZ - PH - .1), (x, y, PH), STEEL, .012)
        K.box(f"PadPostFoot{x:.2f}{y:.2f}", (.14, .14, .03), (x, y, PH), STEEL, .006)
    beam(f"PadKnee{x:.2f}", (x, PY0 + .05, PZ - .45), (x, PY0 + .3, PZ - .12), .05)
K.box("PadFrame", (PX1 - PX0, PY1 - PY0, .1), ((PX0 + PX1) / 2, (PY0 + PY1) / 2, PZ - .1), STEEL, .015)
K.box("PadTop", (PX1 - PX0 - .02, PY1 - PY0 - .02, .02), ((PX0 + PX1) / 2, (PY0 + PY1) / 2, PZ), K.GREEN, .006)
for k in range(3):
    x = PX0 + (PX1 - PX0) * (k + .5) / 3
    K.box(f"PadStripe{k}", ((PX1 - PX0) / 6, PY1 - PY0 - .04, .006), (x, (PY0 + PY1) / 2, PZ + .018), STRIPE, .002)
for x in (PX0 + .15, (PX0 + PX1) / 2, PX1 - .15):
    bolt(f"PadBolt{x:.2f}", (x, PY0 - .002, PZ - .05))
for name, pts in (("Back", [(PX0, PY1, PZ + .42), (PX1, PY1, PZ + .42)]), ("Front", [(PX0, PY0, PZ + .42), (PX1, PY0, PZ + .42)]),
                  ("Left", [(PX0, PY0, PZ + .42), (PX0, PY1, PZ + .42)]),
                  ("Right", [(PX1, PY0, PZ + .42), (PX1, PY1, PZ + .42)])):
    rail(f"Pad{name}", pts, [pts[0][:2] + (PZ + .02,), pts[1][:2] + (PZ + .02,)])
K.cyl("ConeBase", .07, .07, .015, ((PX0 + PX1) / 2 + .05, PY1 - .2, PZ + .02), K.DARK, 4).rotation_euler.z = math.pi / 4
K.cyl("Cone", .055, .012, .2, ((PX0 + PX1) / 2 + .05, PY1 - .2, PZ + .035), CONE, 24)
K.cyl("ConeBand", .037, .03, .04, ((PX0 + PX1) / 2 + .05, PY1 - .2, PZ + .12), K.CREAM, 24)

# ---------- recentre: origin at the middle of the whole footprint, on the floor ----------
dg = bpy.context.evaluated_depsgraph_get()
xs, ys = [], []
for o in bpy.data.objects:
    if o.type in ("MESH", "FONT") and not o.parent:   # curve bounds are padded, and every rail sits inside the meshes
        ev = o.evaluated_get(dg)
        for c in ev.bound_box:
            w = ev.matrix_world @ Vector(c); xs.append(w.x); ys.append(w.y)
shift = Vector((-(min(xs) + max(xs)) / 2, -(min(ys) + max(ys)) / 2, 0))
for o in bpy.data.objects:
    if not o.parent and o.type in ("MESH", "FONT", "CURVE"): o.location += shift
mark = bpy.data.objects.new("DeckCentre", None); K.link(mark); mark.location = Vector((X0, 0, PH)) + shift
print("footprint", round(max(xs) - min(xs), 3), "x", round(max(ys) - min(ys), 3), "deck centre", tuple(round(v, 3) for v in mark.location))

K.finish(OUT, "online_deck", ortho=4.8, centre=(0, 0, 1.5))
