"""Canopy street van: the cream delivery van with the green stripe.

The nose points toward +X.  The body paint is the material "VanPaint" (the stripe is "VanStripe") so the game
can recolour it; the four wheels are separate objects WheelFL / WheelFR / WheelBL / WheelBR with their origins at
the hubs and their axles along Y.  Sized to the game: 2.84 m long (4.8 map units), 1.2 m wide.
Origin at the footprint centre on the floor.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P van.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy
from mathutils import Matrix
import canopy_kit as K

OUT = K.begin("Van")
PAINT = K.mat("VanPaint", "#efe8da", .42)
STRIPE = K.mat("VanStripe", "#3f7a4a", .5)
CHROME = K.mat("CarChrome", "#d9d9d4", .18, 1.0)
GLASSD = K.mat("CarGlass", "#2b3238", .12)
RUBBER = K.mat("Tyre", "#2c2a29", .8)
HUB = K.mat("HubCap", "#d8d3c8", .35, .4)
LAMP = K.mat("HeadLamp", "#fff4d6", .2, 0, .8)
TAIL = K.mat("TailLamp", "#e8742c", .35, 0, .3)
GRILLE = K.mat("Grille", "#3b3a38", .5)
WELL = K.mat("WheelWell", "#1e1c1b", .9)
LINE = K.mat("PanelLine", "#cfc6b4", .6)

def wheel(name, x, y, z, r=.25, w=.17):
    """A tyre with a cream hub cap; the object's origin is the hub, its axle along Y."""
    side = 1 if y > 0 else -1
    t = K.cyl(name, r, r, w, (0, 0, 0), RUBBER, 40)
    t.data.transform(Matrix.Translation((0, 0, -w / 2)))
    t.location = (x, y, z); t.rotation_euler.x = -side * math.pi / 2
    bv = t.modifiers.new("Bevel", "BEVEL"); bv.width = .04; bv.segments = 3
    for nm, rr, d, m in (("Cap", r * .62, .02, HUB), ("Boss", r * .2, .035, CHROME)):
        K.cyl(f"{name}{nm}", rr, rr * .92, d, (0, 0, w / 2 - .01), m, 32).parent = t
    for i in range(4):
        a = i * math.pi / 2
        K.cyl(f"{name}Lug{i}", .014, .014, .03, (math.cos(a) * r * .38, math.sin(a) * r * .38, w / 2 + .005), CHROME, 10).parent = t
    return t

def band(name, x0, x1, hy, r, z0, h, m, round_front=True):
    """A stripe that hugs a rounded-corner box: a rounded-rectangle ring of height h, slightly proud of the body."""
    pts = []
    corners = [((x1 - r, hy - r), 0, round_front), ((x0 + r, hy - r), math.pi / 2, True),
               ((x0 + r, -hy + r), math.pi, True), ((x1 - r, -hy + r), 3 * math.pi / 2, round_front)]
    for (cx, cy), a0, rnd_ in corners:
        if rnd_:
            pts += [(cx + r * math.cos(a0 + math.pi / 2 * i / 8), cy + r * math.sin(a0 + math.pi / 2 * i / 8)) for i in range(9)]
        else:
            pts.append((x1, hy) if a0 == 0 else (x1, -hy))
    n = len(pts)
    verts = [(x, y, z0) for x, y in pts] + [(x, y, z0 + h) for x, y in pts]
    faces = [tuple(range(n))[::-1], tuple(range(n, 2 * n))] + [(i, (i + 1) % n, n + (i + 1) % n, n + i) for i in range(n)]
    me = bpy.data.meshes.new(name); me.from_pydata(verts, [], faces)
    o = K.link(bpy.data.objects.new(name, me), m)
    for p_ in me.polygons: p_.use_smooth = False
    return o

L, W = 2.84, 1.2
HW = W / 2 - .02
# ---------- box body, short nose, slanted windscreen ----------
K.box("Body", (1.86, 2 * HW, 1.5), (-.48, 0, .17), PAINT, .26, 6)
K.box("Nose", (.95, 2 * HW - .04, .62), (.89, 0, .17), PAINT, .26, 6)
v = [(.3, -HW + .01, .7), (.93, -HW + .03, .7), (.93, HW - .03, .7), (.3, HW - .01, .7),
     (.3, -HW + .01, 1.64), (.5, -HW + .05, 1.64), (.5, HW - .05, 1.64), (.3, HW - .01, 1.64)]
me = bpy.data.meshes.new("Cab"); me.from_pydata(v, [], [(0, 3, 2, 1), (4, 5, 6, 7), (0, 1, 5, 4), (1, 2, 6, 5), (2, 3, 7, 6), (3, 0, 4, 7)])
cab = K.link(bpy.data.objects.new("Cab", me), PAINT); bv = cab.modifiers.new("Bevel", "BEVEL"); bv.width = .06; bv.segments = 4
for p_ in me.polygons: p_.use_smooth = True
TILT = math.atan2(.43, .94)
ws = K.box("Windscreen", (.02, 2 * HW - .3, .7), (.9, 0, .8), GLASSD, .05); ws.rotation_euler.y = -TILT
for i in range(3):   # roof ribs
    K.box(f"RoofRib{i}", (1.5, .03, .02), (-.5, -.3 + i * .3, 1.665), PAINT, .01)

# ---------- side and rear windows, doors ----------
for s in (-1, 1):
    y = s * (HW + .003)
    K.box(f"CabWindow{s}", (.32, .01, .4), (.5, s * (HW + .003 - .03), .95), GLASSD, .03)
    K.box(f"DoorLine{s}", (.008, .008, 1.0), (.28, y, .4), LINE, .002)
    K.box(f"SlideLine{s}", (.008, .008, .9), (-.5, y, .4), LINE, .002)
    K.box(f"Handle{s}", (.08, .02, .02), (.2, y + s * .006, .84), CHROME, .006)
    K.box(f"Mirror{s}", (.07, .08, .1), (.78, s * (HW + .06), .95), PAINT, .025)
    K.tube(f"MirrorStalk{s}", [(.78, s * (HW - .02), .9), (.78, s * (HW + .03), .95)], .01, CHROME)
    # the green stripe wraps the sides and the nose
for s in (-1, 1):
    K.box(f"RearWindow{s}", (.01, .34, .36), (-1.41, s * .2, 1.0), GLASSD, .03)
K.box("RearSplit", (.012, .008, 1.1), (-1.412, 0, .32), LINE, .002)
band("Stripe", -1.41 - .006, .45 + .006, HW + .006, .266, .55, .14, STRIPE)
band("NoseStripe", .3, 1.08, HW - .02 + .006, .266, .55, .14, STRIPE, round_front=False)

# ---------- lamps, grille, bumpers ----------
for s in (-1, 1):
    o = K.cyl(f"HeadRing{s}", .075, .075, .03, (1.33, s * .38, .5), CHROME, 32); o.rotation_euler.y = math.pi / 2
    o = K.cyl(f"Head{s}", .062, .058, .035, (1.35, s * .38, .5), LAMP, 32); o.rotation_euler.y = math.pi / 2
    K.box(f"Tail{s}", (.03, .09, .2), (-1.42, s * .5, .45), TAIL, .015)
K.box("Grille", (.02, .42, .16), (1.36, 0, .4), GRILLE, .02)
for i in range(3):
    K.box(f"GrilleBar{i}", (.025, .4, .012), (1.37, 0, .42 + i * .045), CHROME, .004)
for x, nm in ((1.38, "Front"), (-1.44, "Rear")):
    K.box(f"Bumper{nm}", (.08, 2 * HW - .1, .09), (x, 0, .18), CHROME, .035)
K.box("Plate", (.02, .26, .07), (-1.48, 0, .3), K.CREAM, .006)

# ---------- wheels ----------
R, WX, WY = .24, 1.0, HW - .07
for nm, x, y in (("WheelFL", WX, WY), ("WheelFR", WX, -WY), ("WheelBL", -WX, WY), ("WheelBR", -WX, -WY)):
    wheel(nm, x, y, R, R)
for nm, x in (("Front", WX), ("Rear", -WX)):
    K.box(f"Well{nm}", (.54, 2 * HW + .01, .2), (x, 0, .17), WELL, .06)

K.finish(OUT, "van", ortho=3.4, centre=(0, 0, .85))
