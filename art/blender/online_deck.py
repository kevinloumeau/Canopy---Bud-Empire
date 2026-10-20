"""Canopy drone port (the online orders deck, built): it runs itself, so there is no counter and no staff.

A raised oak deck on green steel braces with a DRONE DELIVERY sign, a charging dock with a spare courier, a
parcel lift that carries packed orders up to a drone landing pad on posts (four marked parcel bays, beacons and a
windsock), and a flight of stairs down to a foot landing.  The origin is the centre of the whole footprint on the
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

# ---------- deck guard rails: nobody serves here, so the open front and left edges get brass rails ----------
RY, RX = -DD / 2 + .03, X0 - DL / 2 + .03
rail("FrontRail", [(RX, RY, PH + .42), (X0 + DL / 2 - .03, RY, PH + .42)],
     [(RX, RY, PH), (X0 - .3, RY, PH), (X0 + .3, RY, PH), (X0 + DL / 2 - .03, RY, PH)])
rail("LeftRail", [(RX, RY, PH + .42), (RX, DD / 2 - .03, PH + .42)], [(RX, DD / 2 - .03, PH)])

# ---------- DRONE DELIVERY sign: a steel gantry with a backlit board, a quadcopter mark above the words ----------
SIGNLIT = K.mat("SignLit", "#f6ecd2", .45)       # the map makes this the backlit face (layout.fixtures glow)
INK = K.GREEN_D
GY = -.03; G0, G1 = X0 - .84, X0 + .14; GC = (G0 + G1) / 2; GZ = PH + .56
for x in (G0, G1):
    K.box(f"SignPost{x:.2f}", (.055, .055, GZ - PH + .4), (x, GY, PH), STEEL, .01)
    K.cyl(f"SignCap{x:.2f}", .034, .034, .03, (x, GY, GZ + .4), K.BRASS, 12)
K.box("SignBoard", (G1 - G0 + .02, .05, .4), (GC, GY, GZ), STEEL, .012)
K.box("SignFace", (G1 - G0 - .06, .01, .34), (GC, GY - .028, GZ + .03), SIGNLIT, .004)
K.box("SignTrim", (G1 - G0 - .04, .012, .012), (GC, GY - .033, GZ + .02), K.BRASS, .003)
# the mark: a quadcopter seen from the front, four rotors on a cross with a parcel hanging under it
MX, MZ, F = GC - .31, GZ + .2, GY - .036
K.box("SignMarkBody", (.08, .012, .03), (MX, F, MZ), INK, .004)
for dx in (-1, 1):
    K.box(f"SignMarkArm{dx}", (.06, .01, .012), (MX + dx * .06, F, MZ + .018), INK, .002)
    K.box(f"SignMarkRotor{dx}", (.07, .01, .01), (MX + dx * .1, F, MZ + .036), INK, .002)
    K.box(f"SignMarkHub{dx}", (.012, .01, .02), (MX + dx * .1, F, MZ + .02), INK, .002)
K.box("SignMarkLine", (.006, .01, .035), (MX, F, MZ - .035), INK, 0)
K.box("SignMarkParcel", (.05, .01, .045), (MX, F, MZ - .08), INK, .004)
fb = os.environ.get("CANOPY_FONT") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts", "Fredoka-SemiBold.ttf")
for name, body, size, x, z in (("SignText", "DRONE", .13, GC + .09, GZ + .25), ("SignText2", "DELIVERY", .09, GC + .09, GZ + .11)):
    txt = bpy.data.curves.new(name, "FONT"); txt.body = body; txt.resolution_u = 3
    txt.size = size; txt.extrude = .004; txt.align_x = "CENTER"; txt.align_y = "CENTER"
    if os.path.exists(fb): txt.font = bpy.data.fonts.load(fb)
    to = K.link(bpy.data.objects.new(name, txt), INK)
    to.location = (x, GY - .037, z); to.rotation_euler = (math.pi / 2, 0, 0)

# ---------- charging dock with a spare courier parked on it (a touch larger than life so it reads on the map) ----------
BEACON = K.mat("PadBeacon", "#8fe39a", .4, 0, 2.0)
DX, DYc, Q = X0 - .4, -.24, 1.5
K.cyl("DockBase", .23, .23, .03, (DX, DYc, PH), K.DARK, 24)
K.ring("DockRing", .21, .19, .034, (DX, DYc, PH), BEACON, 24)
K.box("DockPost", (.06, .06, .24), (DX - .24, DYc + .14, PH), STEEL, .01)
K.box("DockScreen", (.05, .012, .06), (DX - .24, DYc + .11, PH + .19), BEACON, .004)
DZ = PH + .09
K.box("DroneBody", (.16 * Q, .16 * Q, .07 * Q), (DX, DYc, DZ), K.CREAM, .025)
K.box("DroneLid", (.11 * Q, .11 * Q, .035 * Q), (DX, DYc, DZ + .07 * Q), K.GREEN, .015)
K.box("DroneEye", (.05 * Q, .01, .02 * Q), (DX, DYc - .08 * Q - .004, DZ + .03 * Q), BEACON, .003)
for i, (sx, sy) in enumerate(((1, 1), (1, -1), (-1, 1), (-1, -1))):
    ax, ay = DX + sx * .13 * Q, DYc + sy * .13 * Q
    beam(f"DroneArm{i}", (DX + sx * .05 * Q, DYc + sy * .05 * Q, DZ + .035 * Q), (ax, ay, DZ + .045 * Q), .025, K.GREEN)
    K.ring(f"DroneGuard{i}", .07 * Q, .06 * Q, .022, (ax, ay, DZ + .04 * Q), K.CREAM, 16)
    K.box(f"DroneRotor{i}", (.11 * Q, .016, .004), (ax, ay, DZ + .06 * Q), K.DARK, 0).rotation_euler.z = sx * sy * .6
    K.cyl(f"DroneLeg{i}", .009, .009, DZ - PH, (DX + sx * .055 * Q, DYc + sy * .055 * Q, PH + .02), K.DARK, 6)

# ---------- parcel lift: packed jars come up through the deck, ride a conveyor and are lifted to the pad ----------
LX, LY = X0 + .6, -.12
PZ = PH + 1.1                          # the landing pad's top
# a short belt brings the jars' boxes from the feed under the deck to the tower's foot
K.box("FeedHopper", (.24, .2, .1), (LX, -.4, PH), STEEL, .01)
K.box("Conveyor", (.2, .24, .07), (LX, -.36, PH + .1), K.GREEN, .01)
for k in range(4):
    K.cyl(f"Roller{k}", .013, .013, .18, (LX - .09, -.46 + k * .065, PH + .18), K.BRASS, 8).rotation_euler.y = math.pi / 2
K.box("ParcelOnBelt", (.11, .1, .08), (LX, -.38, PH + .195), K.KRAFT, .008)
K.box("ParcelTape", (.022, .102, .082), (LX, -.38, PH + .195), K.CREAM, 0)
# the lift tower: a green shaft up to the pad's front edge, a lit window showing a parcel on its way up
TW, TD = .26, .2
K.box("LiftTower", (TW, TD, PZ - PH - .02), (LX, LY, PH), K.GREEN, .015)
FY = LY - TD / 2                        # the tower's front face
K.box("LiftWindowBack", (TW - .08, .012, .44), (LX, FY - .006, PH + .35), K.DARK, .004)
K.box("ParcelInLift", (.12, .05, .09), (LX, FY - .03, PH + .5), K.KRAFT, .008)
K.box("ParcelInLiftTape", (.024, .052, .092), (LX, FY - .03, PH + .5), K.CREAM, 0)
K.box("LiftShelf", (TW - .1, .06, .012), (LX, FY - .03, PH + .488), K.BRASS, .003)
K.box("LiftWindow", (TW - .06, .008, .46), (LX, FY - .062, PH + .34), K.GLASS, .003)
K.box("LiftDoor", (TW - .08, .01, .12), (LX, FY - .004, PH + .12), K.GREEN_D, .004)
for k, z in enumerate((PH + .32, PH + .8, PZ - .05)):
    K.box(f"LiftBand{k}", (TW + .02, TD + .02, .03), (LX, LY, z), K.BRASS, .006)
K.box("LiftStatus", (.14, .012, .03), (LX, FY - .006, PH + .86), BEACON, .004)
K.cyl("LiftBeacon", .03, .024, .05, (LX, LY, PZ - .02), BEACON, 12)
K.tube("Antenna", [(LX + .09, LY - .06, PZ - .02), (LX + .09, LY - .06, PZ + .3)], .007, STEEL)
K.cyl("AntennaTip", .016, .016, .022, (LX + .09, LY - .06, PZ + .3), BEACON, 8)

# ---------- drone landing pad on steel posts: four marked parcel bays, beacons on the corners ----------
PX0, PX1, PY0, PY1 = X0 - .4, X0 + .82, .02, DD / 2 + .02
PADC = ((PX0 + PX1) / 2, (PY0 + PY1) / 2)
for x in (PX0 + .05, PX1 - .05):
    for y in (PY0 + .05, PY1 - .05):
        K.box(f"PadPost{x:.2f}{y:.2f}", (.09, .09, PZ - PH - .1), (x, y, PH), STEEL, .012)
        K.box(f"PadPostFoot{x:.2f}{y:.2f}", (.14, .14, .03), (x, y, PH), STEEL, .006)
    beam(f"PadKnee{x:.2f}", (x, PY0 + .05, PZ - .45), (x, PY0 + .3, PZ - .12), .05)
K.box("PadFrame", (PX1 - PX0, PY1 - PY0, .1), (PADC[0], PADC[1], PZ - .1), STEEL, .015)
K.box("PadTop", (PX1 - PX0 - .02, PY1 - PY0 - .02, .02), (PADC[0], PADC[1], PZ), K.GREEN, .006)
for name, size, off in (("Front", (PX1 - PX0, .03), (0, -(PY1 - PY0) / 2 + .015)), ("Back", (PX1 - PX0, .03), (0, (PY1 - PY0) / 2 - .015)),
                        ("Left", (.03, PY1 - PY0), (-(PX1 - PX0) / 2 + .015, 0)), ("Right", (.03, PY1 - PY0), ((PX1 - PX0) / 2 - .015, 0))):
    K.box(f"PadLip{name}", size + (.035,), (PADC[0] + off[0], PADC[1] + off[1], PZ - .01), K.DARK, .006)
# the bays sit where the game drops the parcels: 0.5 map units apart (1.69 units a metre), centred on the pad
BAY = .5 / 1.69; BW = .22; LW = .014
for k in range(4):
    bx = PADC[0] + (k - 1.5) * BAY
    for name, size, off in (("N", (BW, LW), (0, BW / 2)), ("S", (BW, LW), (0, -BW / 2)),
                            ("W", (LW, BW), (-BW / 2, 0)), ("E", (LW, BW), (BW / 2, 0))):
        K.box(f"PadBay{k}{name}", (size[0], size[1], .004), (bx + off[0], PADC[1] + off[1], PZ + .02), STRIPE, 0)
    K.box(f"PadBayDot{k}", (.03, .03, .004), (bx, PADC[1], PZ + .02), K.CREAM, 0)
for x in (PX0 + .03, PX1 - .03):
    for y in (PY0 + .03, PY1 - .03):
        K.cyl(f"PadBeacon{x:.2f}{y:.2f}", .025, .02, .035, (x, y, PZ + .02), BEACON, 12)
for x in (PX0 + .15, PADC[0], PX1 - .15):
    bolt(f"PadBolt{x:.2f}", (x, PY0 - .002, PZ - .05))
# a windsock on the back corner, so the pad reads as an airfield
WX, WY = PX0 + .03, PY1 - .03
K.tube("WindsockMast", [(WX, WY, PZ + .05), (WX, WY, PZ + .5)], .01, STEEL)
sock = K.cyl("Windsock", .04, .02, .2, (WX, WY, PZ + .46), CONE, 12); sock.rotation_euler.y = math.pi / 2 + .25
K.cyl("WindsockBand", .034, .03, .03, (WX + .1, WY, PZ + .44), K.CREAM, 12).rotation_euler.y = math.pi / 2 + .25

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
