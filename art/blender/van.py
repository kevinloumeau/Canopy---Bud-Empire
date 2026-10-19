"""Canopy street van: the cream delivery van with the green stripe.

The nose points toward +X.  The body paint is the material "VanPaint" (the stripe is "VanStripe") so the game
can recolour it; the four wheels are separate objects WheelFL / WheelFR / WheelBL / WheelBR with their origins at
the hubs and their axles along Y (left = +Y in Blender).  Sized to the game: 2.84 m long (4.8 map units),
1.2 m wide.  Origin at the footprint centre on the floor.

Construction: the car's lower body and short round bonnet for the front third, a tapered cab loft with a raked,
framed windscreen, and a tall superellipse box loft for the cargo area; the stripe is a thin band following the
sections, the rear side panel an inset slab.  No subdivision.

Needs canopy_kit.py and vehicle_kit.py in the same folder.  Run headless with
    blender -b -P van.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find the kits next to this file
except NameError: pass
import bpy
import canopy_kit as K
import vehicle_kit as V

OUT = K.begin("Van")
PAINT = K.mat("VanPaint", "#f7e7c6", .4)
STRIPE = K.mat("VanStripe", "#33704a", .45)
CHROME = K.mat("CarChrome", "#dcdcd6", .16, 1.0)
GLASS = V.dark_glass("VanGlass")
GLASS.node_tree.nodes["Principled BSDF"].inputs["Roughness"].default_value = .22
TYRE = K.mat("Tyre", "#2c2a29", .85)
HUB = K.mat("HubCap", "#e3dccb", .32, .25)
LENS = K.mat("HeadLamp", "#fff6dc", .12, 0, 1.2)
AMBER = K.mat("Indicator", "#f08a2a", .3, 0, .4)
TAIL = K.mat("TailLamp", "#d8452c", .3, 0, .3)
WELL = K.mat("WheelWell", "#2a2524", .9)
DARK = K.mat("Grille", "#34312e", .55)
SEAM = K.mat("Seam", "#b9ae9a", .6)

L, W = 1.42, .6
WX, WR, AR = 1.0, .26, .34
ROOFZ = 1.66

# ---------- the car's lower body and short round bonnet (front third) ----------
WIDTH = [(-.3, W), (1.1, W), (1.25, .56), (1.36, .48), (1.4, .38), (L, .2)]
TOP = [(-.3, 1.0), (.5, 1.0), (.8, .9), (1.08, .78), (1.28, .68), (1.38, .6), (L, .52)]
BOT = [(-.3, .16), (1.12, .16), (1.27, .19), (1.37, .25), (L, .34)]
XS = [-.3, .2, .6, .75, .9, 1.05, 1.17, 1.27, 1.34, 1.39, L]
FRONT = [(x, V.interp(WIDTH, x), V.interp(BOT, x), V.interp(TOP, x), 4) for x in XS]
nose = V.loft("Body", FRONT, PAINT, n=24, arches=[(WX, WR, AR)], arch_m=WELL)

# ---------- tall cargo box: superellipse sections, exponent 5, rounded at the back ----------
BW = [(-L, .42), (-1.39, .54), (-1.32, .59), (-1.2, W), (0, W)]
BB = [(-L, .3), (-1.37, .2), (-1.26, .16), (0, .16)]
BT = [(-L, 1.48), (-1.39, 1.59), (-1.3, ROOFZ), (0, ROOFZ)]
BXS = [-L, -1.4, -1.36, -1.3, -1.2, -.9, -.5, -.2, 0]
BOX = [(x, V.interp(BW, x), V.interp(BB, x), V.interp(BT, x), 5) for x in BXS]
box = V.loft("Box", BOX, PAINT, n=24, arches=[(-WX, WR, AR)], arch_m=WELL)

# ---------- cab: tapered loft from the box to the raked windscreen ----------
ZB, H = .8, ROOFZ - .8
XF = .66
XFT = XF - math.tan(math.radians(30)) * H * .95
def cab_h(x):
    if x <= XFT: return H
    return H * (1 - ((x - XFT) / (XF - XFT)) ** 1.15) if x < XF else 0
CXS = [-.12, XFT - .2, XFT, XFT + .06, XFT + .14, XFT + .22, XFT + .3, XFT + .38, XF - .02, XF]
cab = V.cabin("Cab", CXS, ZB, cab_h, W - .004, W - .012, PAINT, n=20, e=5)

def creep(o, origin_fn, dir_, a, b):
    while V.hit(o, origin_fn(a), dir_) is None: a *= .96
    return a
def side(x, z, s, lift=0.):
    while V.hit(cab, (x, s * 5, z), (0, -s, 0)) is None: x -= .01      # step back off the screen's rounded edge
    return tuple(V.on_side(cab, x, z, s, lift))
def end(o, y, z, e, lift=0.):
    while V.hit(o, (e * 5, y, z), (-e, 0, 0)) is None: y *= .96
    return tuple(V.on_end(o, y, z, e, lift))

# ---------- framed windows: dark glass on the cab and the back doors ----------
V.panel("Windscreen", end(cab, -.52, .93, 1), end(cab, .52, .93, 1), end(cab, .47, 1.46, 1), end(cab, -.47, 1.46, 1),
        GLASS, margin=.075, radius=.07, outward=(1, 0, .5), onto=cab)
def a_line(z): return XF - (z - ZB) / H * (XF - XFT)
for s in (-1, 1):
    V.panel(f"CabWindow{s}", side(.04, .92, s), side(a_line(.92) - .03, .92, s), side(a_line(1.46) - .02, 1.46, s),
            side(.04, 1.46, s), GLASS, margin=.05, radius=.06, outward=(0, s, 0), onto=cab)
    V.panel(f"RearWindow{s}", end(box, s * .06, .98, -1), end(box, s * .48, .98, -1), end(box, s * .47, 1.46, -1),
            end(box, s * .06, 1.46, -1), GLASS, margin=.035, radius=.06, outward=(-1, 0, 0), onto=box)

# ---------- green stripe round the sides and back, stopping before the nose ----------
V.band("Stripe", BOX + FRONT[1:], .62, .8, STRIPE, x_max=.72, lift=.005)

# ---------- recessed rear side panel: a seam outline with the paint panel set inside it ----------
for s in (-1, 1):
    q = [tuple(V.on_side(box, x, z, s)) for x, z in ((-1.22, .86), (-.14, .86), (-.14, 1.52), (-1.22, 1.52))]
    V.panel(f"PanelGroove{s}", *q, SEAM, margin=.0, radius=.09, lift=.003, outward=(0, s, 0), onto=box)
    V.panel(f"PanelInset{s}", *q, PAINT, margin=.022, radius=.075, lift=.006, outward=(0, s, 0), onto=box)

# ---------- door lines, handles, mirrors on short stalks at the door, roof ribs, rear split ----------
for s in (-1, 1):
    K.tube(f"DoorLine{s}", [tuple(V.on_side(box, -.04, z, s, .002)) for z in (.3, .7, 1.1, 1.5)], .005, SEAM)
    K.tube(f"DoorFront{s}", [tuple(V.on_side(nose, .62 - .03 * (z - .3), z, s, .002)) for z in (.3, .55, .84)], .005, SEAM)
    hp = V.on_side(nose, .1, .86, s, .006)
    K.box(f"Handle{s}", (.1, .02, .022), (hp.x, hp.y, hp.z - .011), CHROME, .008)
    root = V.on_side(nose, .58, .84, s)
    K.tube(f"MirrorStalk{s}", [tuple(root), (.56, s * (W + .05), .92)], .016, CHROME)
    V.ball(f"Mirror{s}", .07, (.55, s * (W + .08), .96), CHROME, (.6, 1, .9))
for y0 in (-.36, .02):
    p0 = end(cab, y0, .97, 1, .012); K.tube(f"Wiper{y0}", [p0, (p0[0] - .07, y0 + .28, p0[2] + .12)], .008, DARK)
K.tube("RearSplit", [end(box, 0, z, -1, .002) for z in (.3, .8, 1.3, 1.55)], .005, SEAM)
for y in (-.3, 0, .3):
    K.tube(f"RoofRib{y}", [(-1.22, y, ROOFZ + .004), (XFT - .04, y, ROOFZ + .004)], .016, PAINT)

# ---------- round lamps, grille, badge, wrap-round chrome bumpers, plates ----------
for s in (-1, 1):
    p = V.on_end(nose, s * .36, .58, 1)
    V.lamp(f"Head{s}", (p.x - .03, p.y, p.z), .095, LENS, CHROME)
    p = V.on_end(nose, s * .47, .42, 1); V.ball(f"Indicator{s}", .026, (p.x, p.y, p.z), AMBER, (.6, 1, 1))
    p = V.on_end(box, s * .5, .62, -1); V.ball(f"Tail{s}", .05, (p.x, p.y, p.z), TAIL, (.5, .8, 1.6))
p = V.on_end(nose, 0, .42, 1)
K.box("Grille", (.05, .34, .12), (p.x - .025, 0, .36), DARK, .03)
for i in range(3):
    K.box(f"GrilleBar{i}", (.02, .32, .012), (p.x - .002, 0, .38 + i * .033), CHROME, .004)
p = V.on_end(nose, 0, .55, 1); V.ball("Badge", .035, (p.x, 0, p.z), CHROME, (.4, 1.3, 1))
V.bumper("BumperFront", L + .01, W - .02, .27, .05, CHROME, .2, 1)
V.bumper("BumperRear", L + .01, W - .02, .27, .05, CHROME, .2, -1)
p = V.on_end(box, 0, .42, -1)
K.box("PlateRecess", (.04, .32, .12), (p.x + .005, 0, .34), DARK, .02)
K.box("PlateRear", (.02, .26, .08), (p.x - .012, 0, .36), K.CREAM, .008)

# ---------- wheels ----------
WY = .48
for nm, x, y in (("WheelFL", WX, WY), ("WheelFR", WX, -WY), ("WheelBL", -WX, WY), ("WheelBR", -WX, -WY)):
    V.wheel(nm, x, y, WR, WR, .15, TYRE, HUB, CHROME)

K.finish(OUT, "van", ortho=3.4, centre=(0, 0, .85))
