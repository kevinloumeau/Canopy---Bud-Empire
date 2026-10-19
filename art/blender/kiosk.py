"""Canopy self-order kiosk (redesign): a sleek portrait touchscreen on a slender pedestal.

A tall portrait screen in a thin forest-green bezel with a fine brass edge, tilted back toward the customer, on a
slender green pedestal that tapers into a weighted oval base with a brass foot ring.  An oak accent panel runs up
the pedestal's back; a small ledge under the screen carries the card reader and the receipt slot; a little brass
leaf sits on top of the bezel.

The screen is its own mesh, "Screen", with its own material "Screen" and UVs 0..1 over the glass (u across, v up),
so code can light it or paint its own menu on it; the file carries a cream menu image as a default.
The screen faces Blender +X (map +x, where the customer stands).  Origin at the footprint centre on the floor.
Footprint from main.js drawBoxSprite(-10.04..-9.46, kz-.4..kz+.4, 1.8 world high): 0.343 x 0.473 m, 1.30 m tall.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P kiosk.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy
import canopy_kit as K

OUT = K.begin("Kiosk")
BODY = K.mat("KioskGreen", "#1e4a37", .4)
BEZEL = K.mat("KioskBezel", "#173d2d", .3)
OAKP = K.mat("KioskOak", "#c99558", .5)
SLOT = K.mat("Slot", "#151716", .5)
READER = K.mat("Reader", "#2a2e2c", .35)
LED = K.mat("ReaderLed", "#7fd38a", .4, 0, 2.)

# ---------- the default screen picture: a portrait menu, cream with a green header, three items and a pay button ----------
W, Hh = 96, 160
img = bpy.data.images.new("KioskMenu", W, Hh)
cream, mid, dark, card = (1., .9, .66, 1), (.36, .62, .3, 1), (.08, .3, .16, 1), (.93, .8, .56, 1)
px = []
for y in range(Hh):
    for x in range(W):
        c = cream
        if y >= 140: c = dark                                         # header band
        for y0 in (104, 76, 48):                                       # three menu cards with a green swatch
            if y0 <= y < y0 + 22 and 8 <= x < 88: c = mid if x < 30 else card
        if 14 <= y < 30 and 16 <= x < 80: c = dark                    # pay button
        px.extend(c)
img.pixels = px; img.pack()
SCREEN = bpy.data.materials.new("Screen"); SCREEN.use_nodes = True
nt = SCREEN.node_tree; bsdf = nt.nodes["Principled BSDF"]
tex = nt.nodes.new("ShaderNodeTexImage"); tex.image = img; tex.interpolation = "Closest"
nt.links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])
nt.links.new(tex.outputs["Color"], bsdf.inputs["Emission Color"])
bsdf.inputs["Emission Strength"].default_value = .7; bsdf.inputs["Roughness"].default_value = .2

def oval(name, rx, ry, h, z, m, verts=24):
    o = K.cyl(name, 1., 1., h, (0, 0, z), m, verts); o.scale = (rx, ry, 1.); return o

# ---------- weighted oval base with a brass foot ring ----------
oval("FootRing", .158, .2, .014, 0, K.BRASS)
oval("Base", .15, .192, .045, .012, BODY)
oval("BaseTop", .1, .13, .02, .055, BODY)

# ---------- slender pedestal, tapering up to the ledge, with an oak strip on its back ----------
ped = K.cyl("Pedestal", .062, .04, .56, (0, 0, .07), BODY, 16); ped.scale = (.85, 1., 1.)
K.box("OakPanel", (.012, .05, .42), (-.05, 0, .12), OAKP, .004, 1).rotation_euler.y = .045
K.box("PedCollar", (.07, .085, .014), (0, 0, .62), K.BRASS, .004, 1)

# ---------- ledge under the screen with the card reader and receipt slot ----------
K.box("Ledge", (.15, .24, .028), (.035, 0, .628), BODY, .008, 1)
K.box("LedgeEdge", (.004, .24, .01), (.111, 0, .637), K.BRASS, .001, 1)
rd = K.box("CardReader", (.07, .06, .022), (.055, .065, .656), READER, .006, 1); rd.rotation_euler.y = -.3
K.box("CardSlot", (.004, .045, .004), (.09, .065, .675), SLOT, .001, 1)
K.box("ReaderLed", (.008, .008, .004), (.07, .088, .672), LED, .001, 1)
K.box("ReceiptSlot", (.004, .08, .006), (.112, -.06, .63), SLOT, .001, 1)

# ---------- the tilted screen: a pivot at the ledge, bezel, brass edge, glass and the leaf on top ----------
TILT = math.radians(12)
piv = bpy.data.objects.new("ScreenHead", None); K.link(piv)
piv.location = (.0, 0, .652); piv.rotation_euler = (0, -TILT, 0)
SW, SH = .36, .62
def part(o):
    o.parent = piv; return o
part(K.box("Bezel", (.03, SW + .04, SH + .044), (-.015, 0, -.007), BEZEL, .01, 1))
part(K.box("BrassEdge", (.022, SW + .032, SH + .036), (-.019, 0, -.003), K.BRASS, .008, 1))
me = bpy.data.meshes.new("Screen")
y0, y1, z0, z1 = -SW / 2 + .006, SW / 2 - .006, .015, .015 + SH - .012
me.from_pydata([(0, y0, z0), (0, y1, z0), (0, y1, z1), (0, y0, z1)], [], [(0, 1, 2, 3)])
uv = me.uv_layers.new(name="UVMap")
for loop, (u, v) in zip(uv.data, ((0, 0), (1, 0), (1, 1), (0, 1))): loop.uv = (u, v)
scr = part(K.link(bpy.data.objects.new("Screen", me), SCREEN)); scr.location = (.0005, 0, 0)
lo = part(K.link(bpy.data.objects.new("LeafMark", K.LEAF_MESHES[2].copy())))
lo.data.materials.clear(); lo.data.materials.append(K.BRASS)
lo.location = (-.014, 0, SH + .028); lo.scale = (.5,) * 3; lo.rotation_euler = (math.pi / 2, 0, math.pi / 2)

K.finish(OUT, "kiosk", ortho=1.55, centre=(0, 0, .66))
