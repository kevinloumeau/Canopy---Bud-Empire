"""Canopy rooftop lounge: the DJ booth (Vinyl nights, lounge tier 3), laid out like rooftop.js on main.

A dark booth with a brass lip, two turntables and a brass ashtray on the lip's corner, a speaker cabinet each side, facing Blender -X (map -x) across
the deck, and the flat "DanceFloor" in front of it (material "DanceFloor", glow driven by code).
The origin is the booth's footprint centre on the deck.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P rooftop_dj_booth.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import bpy
import canopy_kit as K

M, V = 1 / 1.69, 0.7247
OUT = K.begin("RooftopDJ")
BOOTH = K.mat("Booth", "#1d2422", .5)
PANEL = K.mat("BoothPanel", "#25523b", .45)
DECK = K.mat("Turntable", "#2e3330", .4, .2)
VINYL = K.mat("Vinyl", "#121414", .25)
LABEL = K.mat("RecordLabel", "#d06aa0", .5)
CAB = K.mat("Speaker", "#262b29", .55)
CONE = K.mat("SpeakerCone", "#4a514d", .6)
GRILLE = K.mat("Grille", "#33392f", .7)
TOPGREY = K.mat("SpeakerTop", "#3d4340", .6)
FLOOR = K.mat("DanceFloor", "#4a3a33", .4, 0, .3)
FLOOR.node_tree.nodes["Principled BSDF"].inputs["Emission Color"].default_value = (.63, .14, .35, 1)
LED = K.mat("BoothLED", "#ff8fbf", .4, 0, 2.)

def my(dz): return -dz * M

def ashtray(tag, x, y, z):
    """A round brass ashtray with three rests."""
    K.cyl(tag, .045, .04, .015, (x, y, z), K.BRASS, 28)
    K.cyl(tag + "Well", .033, .033, .004, (x, y, z + .013), K.DARK, 24)
    for i in range(3):
        a = i * 2 * math.pi / 3
        K.box(f"{tag}Rest{i}", (.014, .01, .006), (x + .041 * math.cos(a), y + .041 * math.sin(a), z + .013), K.DARK, .002).rotation_euler.z = a


W, Dp, H = .7 * M, 1.6 * M, 1. * V    # across x (toward the dancers), along z, high
# ---------- the booth ----------
K.box("BoothBase", (W + .02, Dp + .02, .06), (0, 0, 0), K.BRASS, .01)
K.box("Booth", (W, Dp, H - .06), (0, 0, .05), BOOTH, .012)
K.box("BoothFront", (.012, Dp - .1, H - .26), (-W / 2 - .004, 0, .15), PANEL, .004)       # facing the dancers
for z in (.15, H - .11):
    K.box(f"FrontTrim{z:.2f}", (.016, Dp - .08, .014), (-W / 2 - .008, 0, z - .007), K.BRASS, .003)
for dy in (-(Dp - .08) / 2, (Dp - .08) / 2):
    K.box(f"FrontTrimV{dy:.2f}", (.016, .014, H - .26), (-W / 2 - .008, dy, .15), K.BRASS, .003)
K.box("BoothLED", (.006, Dp - .16, .012), (-W / 2 - .014, 0, .2), LED, 0)
K.box("BoothLip", (.8 * M, 1.7 * M, .06 * V), (0, 0, H), K.BRASS, .008)
K.box("DeckTop", (.7 * M, 1.6 * M, .01), (0, 0, H + .06 * V), BOOTH, .004)
TOPZ = H + .06 * V + .01
# ---------- two turntables and a mixer between them ----------
for i, dz in enumerate((-.4, .4)):
    y = my(dz)
    K.box(f"Deck{i}", (.36, .3, .03), (0, y, TOPZ), DECK, .008)
    K.cyl(f"Platter{i}", .13, .13, .012, (0, y, TOPZ + .03), DECK, 32)
    K.cyl(f"Record{i}", .122, .122, .004, (0, y, TOPZ + .042), VINYL, 32)
    K.cyl(f"Label{i}", .04, .04, .002, (0, y, TOPZ + .046), LABEL, 24)
    arm = K.tube(f"ToneArm{i}", [(.13, y + .12, TOPZ + .05), (.12, y + .02, TOPZ + .05), (.06, y - .04, TOPZ + .048)], .006, K.BRASS)
K.box("Mixer", (.22, .14, .04), (0, 0, TOPZ), DECK, .01)
for k in range(4):
    K.cyl(f"Knob{k}", .01, .01, .015, (-.05 + k * .033, .03, TOPZ + .04), K.BRASS, 12)
    K.box(f"Fader{k}", (.012, .006, .01), (-.05 + k * .033, -.03, TOPZ + .04), K.CREAM, .002)
ashtray("Ashtray", .09, my(.62), TOPZ)

# ---------- speaker cabinets each side, cones toward the dance floor ----------
for i, dz in enumerate((-1.05, 1.05)):
    x, y, s, h = .1 * M, my(dz), .45 * M, 1.35 * V
    K.box(f"Speaker{i}", (s, s, h), (x, y, 0), CAB, .012)
    K.box(f"SpeakerTop{i}", (s - .012, s - .012, .012), (x, y, h - .004), TOPGREY, .003)    # closed top inside the rim
    for n, (dx, dy, w, d) in enumerate(((0, s / 2, s + .01, .012), (0, -s / 2, s + .01, .012), (s / 2, 0, .012, s + .01), (-s / 2, 0, .012, s + .01))):
        K.box(f"SpeakerTrim{i}_{n}", (w, d, .02), (x + dx, y + dy, h - .012), K.BRASS, .003)
    K.box(f"LogoPlate{i}", (.004, .09, .03), (x - s / 2 - .007, y, .045), K.BRASS, .002)       # under the grille, facing the dancers
    K.box(f"LogoInset{i}", (.003, .074, .018), (x - s / 2 - .009, y, .051), PANEL, .001)
    K.box(f"SpeakerGrille{i}", (.006, s - .05, h - .12), (x - s / 2 - .002, y, .08), GRILLE, .003)
    for zc, r in ((.9 * V, .15 * M), (.9 * V - .22, .1 * M), (h - .1, .035)):
        o = K.cyl(f"Cone{i}_{zc:.2f}", r, r * .55, .03, (x - s / 2 - .004, y, zc), CONE, 28)
        o.rotation_euler.y = -math.pi / 2
        o2 = K.cyl(f"ConeRing{i}_{zc:.2f}", r + .008, r + .008, .006, (x - s / 2 - .004, y, zc), K.BRASS, 28)
        o2.rotation_euler.y = -math.pi / 2
# ---------- the dance floor ----------
fw, fd = 2.6 * M, 2.2 * M
bpy.ops.mesh.primitive_plane_add(size=1, location=(-2.4 * M, 0, .005))
f = bpy.context.active_object; f.name = "DanceFloor"; f.scale = (fw, fd, 1)
for c in f.users_collection: c.objects.unlink(f)
K.link(f, FLOOR)
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
K.finish(OUT, "rooftop_dj_booth", ortho=3.0, centre=(-.6, 0, .4))
