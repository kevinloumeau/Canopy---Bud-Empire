"""Canopy street car: the little rounded two-door with the cream roof, one model for every colour.

The nose points toward +X.  The body paint is the material "CarPaint" so the game can recolour it; the four
wheels are separate objects WheelFL / WheelFR / WheelBL / WheelBR with their origins at the hubs and their axles
along Y, so the game can spin them as the car drives (left = +Y in Blender).  Sized to the game: 2.55 m long,
1.12 m wide (4.2 x 1.9 map units).  Origin at the footprint centre on the floor.

Construction: the lower body is a loft of superellipse sections (rounded nose and tail, bonnet sloping down to
the front) with boolean wheel arches; the cabin is a second, tapered loft on top of it whose surface between the
dark window panels forms the pillars; the cream roof is a bevelled rounded slab.  No subdivision.

Writes car.blend / car.glb / car.png (blue) plus car_<colour>.glb for each street colour.
Needs canopy_kit.py and vehicle_kit.py in the same folder.  Run headless with
    blender -b -P car.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find the kits next to this file
except NameError: pass
import bpy
import canopy_kit as K
import vehicle_kit as V

COLOURS = {"blue": "#5da7ce", "green": "#7f9e78", "orange": "#f08a3c", "purple": "#b49ae0",
           "red": "#d63228", "white": "#ebe2d5", "yellow": "#e4b22a"}
SHOW = "blue"

OUT = K.begin("Car")
PAINT = K.mat("CarPaint", COLOURS[SHOW], .36)
ROOF = K.mat("CarRoof", "#f4e2bb", .55)
CHROME = K.mat("CarChrome", "#dcdcd6", .16, 1.0)
GLASS = V.dark_glass()
GLASS.node_tree.nodes["Principled BSDF"].inputs["Roughness"].default_value = .22
TYRE = K.mat("Tyre", "#2c2a29", .85)
HUB = K.mat("HubCap", "#e3dccb", .32, .25)
LENS = K.mat("HeadLamp", "#fff6dc", .12, 0, 1.2)
AMBER = K.mat("Indicator", "#f08a2a", .3, 0, .4)
TAIL = K.mat("TailLamp", "#d8452c", .3, 0, .3)
WELL = K.mat("WheelWell", "#2a2524", .9)
DARK = K.mat("Cabin", "#2c2a28", .6)
SEAM = K.mat("Seam", "#2f2a28", .6)

# ---------- lower body: superellipse loft, rounded in plan, bonnet sloping to the nose ----------
L = 1.275
WIDTH = [(-L, .16), (-1.25, .34), (-1.18, .465), (-1.05, .535), (-.88, .56), (.88, .56), (1.05, .535), (1.18, .465), (1.25, .34), (L, .17)]
TOP = [(-L, .56), (-1.25, .66), (-1.15, .8), (-1.0, .88), (-.85, .92), (.4, .92), (.62, .87), (.9, .77), (1.1, .68), (1.22, .6), (L, .52)]
BOT = [(-L, .34), (-1.22, .24), (-1.1, .18), (-.95, .16), (.95, .16), (1.1, .18), (1.22, .24), (L, .34)]
XS = [-L, -1.25, -1.2, -1.12, -1.0, -.82, -.5, -.15, .2, .45, .62, .78, .93, 1.05, 1.15, 1.22, 1.255, L]
SECTIONS = [(x, V.interp(WIDTH, x), V.interp(BOT, x), V.interp(TOP, x), 4) for x in XS]
WX, WR = .82, .27
body = V.loft("Body", SECTIONS, PAINT, n=24, arches=[(WX, WR, .335), (-WX, WR, .335)], arch_m=WELL)
SY = .56

# ---------- cabin: a tapered loft on the body; the pillars are its surface between the windows ----------
ZB, H = .8, .56                                   # cabin base (buried in the body) and height to the roof
XF, XR = .45, -.96                               # cabin foot at the windscreen and the back light
RAKE = math.tan(math.radians(30))
XFT, XRT = XF - RAKE * H * .95, XR + .19          # the screen leans back ~30 degrees, the back light less
WB, WT = .52, .46                                # half-width at the base / roof: ~12% tumblehome
def cab_h(x):
    if x >= XFT: return H * (1 - ((x - XFT) / (XF - XFT)) ** 1.15) if x < XF else 0
    if x <= XRT: return H * (1 - ((XRT - x) / (XRT - XR)) ** 1.15) if x > XR else 0
    return H
CXS = [XR, XR + .03, XR + .07, XR + .12, XRT, XRT + .05, -.45, -.1, XFT - .05, XFT, XFT + .06, XFT + .13, XFT + .2, XF - .02, XF]
cab = V.cabin("Cabin", CXS, ZB, cab_h, WB, WT, PAINT, n=20, e=5)

def side(x, z, s, lift=0.): return tuple(V.on_side(cab, x, z, s, lift))
def end(y, z, e, lift):
    while V.hit(cab, (e * 5, y, z), (-e, 0, 0)) is None: y *= .96          # creep inward off the rounded corner
    return tuple(V.on_end(cab, y, z, e, lift))
def front(y, z, lift=0.): return end(y, z, 1, lift)
def back(y, z, lift=0.): return end(y, z, -1, lift)

ZW0, ZW1 = .86, 1.29                               # window sill and head
def a_line(z): return XF - (z - ZB) / H * (XF - XFT)      # where the side meets the screen
def c_line(z): return XR + (z - ZB) / H * (XRT - XR)
for s in (-1, 1):
    m = .045                                      # frame margin is the pillar / sill / header width
    V.panel(f"FrontWindow{s}", side(-.24, ZW0, s), side(a_line(ZW0) - .02, ZW0, s), side(a_line(ZW1) - .01, ZW1, s),
            side(-.27, ZW1, s), GLASS, margin=m, radius=.05, outward=(0, s, 0), onto=cab)
    V.panel(f"RearWindow{s}", side(c_line(ZW0) + .2, ZW0, s), side(-.3, ZW0, s), side(-.33, ZW1, s),
            side(c_line(ZW1) + .16, ZW1, s), GLASS, margin=m, radius=.06, outward=(0, s, 0), onto=cab)
V.panel("Windscreen", front(-.48, .92), front(.48, .92), front(.42, 1.3), front(-.42, 1.3), GLASS,
        margin=.05, radius=.06, outward=(1, 0, .5), onto=cab)
V.panel("BackLight", back(.45, .92), back(-.45, .92), back(-.39, 1.28), back(.39, 1.28), GLASS,
        margin=.06, radius=.06, outward=(-1, 0, .3), onto=cab)

# ---------- cream pillow roof ----------
V.slab("Roof", XRT - .09, XFT + .08, WT + .04, .18, ZB + H - .05, .13, ROOF, bevel=.065)

# ---------- wipers, door seams, handles, mirrors on short stalks at the door ----------
for y0 in (-.34, .04):
    p0 = front(y0, .97, .012); K.tube(f"Wiper{y0}", [p0, (p0[0] - .07, y0 + .26, p0[2] + .1)], .008, SEAM)
for s in (-1, 1):
    for x in (.43, -.3):
        K.tube(f"Seam{s}{x:.2f}", [tuple(V.on_side(body, x - .02 * (z - .34), z, s, .002)) for z in (.34, .55, .78)], .005, SEAM)
    hp = V.on_side(body, -.22, .72, s, .006)
    K.box(f"Handle{s}", (.1, .02, .022), (hp.x, hp.y, hp.z - .011), CHROME, .008)
    root = V.on_side(body, .36, .8, s)
    K.tube(f"MirrorStalk{s}", [tuple(root), (.35, s * (SY + .05), .86)], .016, CHROME)
    V.ball(f"Mirror{s}", .068, (.34, s * (SY + .08), .9), CHROME, (.6, 1, .9))

# ---------- lamps, indicators, tails, badge, wrap-around bumpers, number plates ----------
for s in (-1, 1):
    p = V.on_end(body, s * .34, .57, 1)
    V.lamp(f"Head{s}", (p.x - .03, p.y, p.z), .095, LENS, CHROME)
    p = V.on_end(body, s * .45, .42, 1); V.ball(f"Indicator{s}", .026, (p.x, p.y, p.z), AMBER, (.6, 1, 1))
    p = V.on_end(body, s * .38, .6, -1); V.ball(f"Tail{s}", .05, (p.x, p.y, p.z), TAIL, (.5, .85, 1.25))
p = V.on_end(body, 0, .5, 1); V.ball("Badge", .034, (p.x, 0, p.z), CHROME, (.4, 1.3, 1))
V.bumper("BumperFront", 1.27, .55, .28, .05, CHROME, .2, 1)
V.bumper("BumperRear", 1.27, .55, .28, .05, CHROME, .2, -1)
p = V.on_end(body, 0, .42, -1); K.box("PlateRecess", (.04, .3, .11), (p.x + .005, 0, .365), DARK, .02)
K.box("PlateRear", (.02, .25, .075), (p.x - .012, 0, .382), K.CREAM, .008)
p = V.on_end(body, 0, .36, 1); K.box("PlateFront", (.02, .24, .06), (p.x + .005, 0, .33), K.CREAM, .008)

# ---------- wheels: hub origins, axles along Y, tucked under the arches ----------
WY = .45
for nm, x, y in (("WheelFL", WX, WY), ("WheelFR", WX, -WY), ("WheelBL", -WX, WY), ("WheelBR", -WX, -WY)):
    V.wheel(nm, x, y, WR, WR, .15, TYRE, HUB, CHROME)

K.finish(OUT, "car", ortho=3.0, centre=(0, 0, .65))

# one glb per street colour: only the paint changes
b = PAINT.node_tree.nodes["Principled BSDF"]
for cname, hexcol in COLOURS.items():
    h = hexcol.lstrip("#"); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    b.inputs["Base Color"].default_value = (*[x / 12.92 if x <= .04045 else ((x + .055) / 1.055) ** 2.4 for x in c], 1)
    bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, f"car_{cname}.glb"), export_format="GLB", export_apply=True, export_yup=True)
