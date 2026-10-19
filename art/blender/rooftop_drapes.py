"""Canopy rooftop lounge: one velvet drape tied back at a pergola post (Private booths tier, used four times).

Matches rooftop.js (PR #64, t5, drape()): the drape starts .1 map off the post, hangs from just under the beam
(p.h - .12 = 2.63 world tall), is .42 map wide at the top, gathers in to its brass tie-back at 1.05-1.12 world and
spreads out again to .8 of its width at the deck.  Modelled as the code's alongX, dir +1 case: the post centre is the
origin on the deck and the drape runs off it toward Blender +X (map +x), a .12 map thick fold.
Placement (three.js rotation.y about the post): drape(p.x0, p.z1, x, +1) -> 0; drape(p.x1, p.z1, x, -1) -> pi;
drape(p.x1, p.z1, z, -1) -> +pi/2 (runs toward map -z); drape(p.x1, p.z0, z, +1) -> -pi/2 (runs toward map +z).
The brass curtain rods stay in code.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P rooftop_drapes.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import bpy
import canopy_kit as K

def H(m): return m / 1.69
def V(w): return w * .7247

OUT = K.begin("RooftopDrapes")
VELVET = K.mat("Velvet", "#6b2436", .85, two_sided=True)
VELVET_D = K.mat("VelvetDeep", "#4a1b29", .85)

O, W, TOP, TIE = H(.1), H(.42), V(2.75 - .12), V(1.085)
def width(z):
    """The drape's width at height z: full under the beam, pinched at the tie-back, flaring to .8 at the deck."""
    if z >= TIE:
        t = min(1., (z - TIE) / (TOP * .42)); return W * (.36 + .64 * (1 - (1 - t) ** 2))
    t = (TIE - z) / TIE; return W * (.36 + .44 * t ** 1.2)

ROWS = [0, .04, .14, .28, .42, .56, .68, TIE - .05, TIE - .02, TIE, TIE + .02, TIE + .06, .95, 1.1, 1.3, 1.5, 1.7, TOP - .05, TOP]
COLS = 12
verts, faces = [], []
for z in ROWS:
    w = width(z); amp = .016 + .026 * w / W
    for c in range(COLS + 1):
        u = c / COLS
        x = O + w * u
        y = amp * math.sin(u * math.pi * 4.5 + (.4 if z < TIE else 0)) * (1 - .6 * u * (z > TOP - .1))
        zz = z - (.015 * math.sin(u * math.pi) if z == 0 else 0) + (.0 if z else .0)
        verts.append((x, y, zz))
for r in range(len(ROWS) - 1):
    for c in range(COLS):
        a = r * (COLS + 1) + c
        faces.append((a, a + 1, a + COLS + 2, a + COLS + 1))
me = bpy.data.meshes.new("Drape"); me.from_pydata(verts, [], faces)
for p in me.polygons: p.use_smooth = True
d = K.link(bpy.data.objects.new("Drape", me), VELVET)
sol = d.modifiers.new("Solid", "SOLIDIFY"); sol.thickness = .014; sol.offset = 0

# a gathered heading under the beam and a hem roll at the deck
K.box("Heading", (W + .01, .05, .04), (O + W / 2, 0, TOP - .04), VELVET_D, .012, 2)
# ---------- the brass tie-back: a band round the gather and a rosette on the post side ----------
tw = width(TIE)
K.box("TieBack", (tw + .02, .062, V(.07)), (O + tw / 2, 0, V(1.05)), K.BRASS, .01, 2)
K.cyl("TieRosette", .022, .022, .012, (O - .008, 0, V(1.085)), K.BRASS, 12).rotation_euler.y = math.pi / 2
K.cyl("TieTassel", .012, .02, .07, (O + tw + .012, 0, V(1.05) - .07), K.BRASS, 8)

K.finish(OUT, "rooftop_drapes", ortho=2.2, centre=(.12, 0, .95))
