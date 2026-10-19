"""Canopy rooftop lounge: the Tasting bar tier's jar flights on the dab bar and the menu board on the back bar.

Matches rooftop.js (PR #64, t6): four oak boards .52 x .26 map on the bar top (1.12-1.15 world) at
jx = b.x0 + .5 + k * (b.x1 - b.x0 - 1) / 3, jz = b.z - .22, each with glass jars of buds and brass lids, and the
menu board centred on the back bar (1.6 map wide, 1.94-2.5 world high, face at z0 + .36).
The origin is the bar counter's footprint centre on the deck, ((b.x0 + b.x1) / 2, b.z - .225), the same as
rooftop_bar.glb, so the two load at the same point.  Customers' side toward Blender -Y (map +z).
The menu's dark face is its own quad "MenuFace" (material "MenuFace", UVs 0..1, u across, v up) carrying a default
picture of cream lines, so code can paint its own.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P rooftop_jar_flight.py -- OUT_DIR
"""
import os, sys, math, random
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import bpy, bmesh
import canopy_kit as K

def H(m): return m / 1.69
def V(w): return w * .7247

OUT = K.begin("RooftopJarFlight")
rr = random.Random(5)
STRAINS = [K.mat(f"Strain{i}", c, .75) for i, c in enumerate(("#5f8a3c", "#7a9a42", "#4f7a3a", "#8c9a4a"))]
JAR = K.glass("JarGlass", "#e3f1ea")
OAKB = K.mat("FlightOak", "#c9935a", .55)
DARKOAK = K.mat("OakDark", "#6e4a2c", .6)

def jar_buds(name, m):
    """Three small knobbly buds filling a jar: 60 triangles."""
    bm = bmesh.new()
    for i, (x, y, z, r) in enumerate(((-.012, -.008, .016, .02), (.013, .006, .018, .019), (0, .002, .043, .017))):
        res = bmesh.ops.create_icosphere(bm, subdivisions=1, radius=r)
        for v in res["verts"]: v.co *= 1 + rr.uniform(-.15, .15); v.co.z *= 1.15
        bmesh.ops.translate(bm, verts=res["verts"], vec=(x, y, z))
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    for p in me.polygons: p.use_smooth = True
    me.materials.append(m); return me
BUDS = [jar_buds(f"JarBuds{i}", m) for i, m in enumerate(STRAINS)]

# ---------- four flight boards with three jars each ----------
TOP = V(1.12)
BW, BD = H(.52), H(.26)
for k in range(4):
    x = H(-1.1 + k * (3.2 - 1) / 3)
    K.box(f"Board{k}", (BW, BD, V(.03)), (x, -.003, TOP), OAKB, .008, 2)
    K.box(f"BoardTag{k}", (.05, .004, .014), (x, -.003 - BD / 2 - .002, TOP + .004), K.BRASS, .001, 1)
    for j, dx in enumerate((-.1, 0, .1)):
        s = k * 3 + j; z0 = TOP + V(.03)
        K.cyl(f"Jar{s}", .036, .036, V(.2) * .82, (x + dx, -.003, z0), JAR, 12)
        K.inst(f"Jar{s}Buds", BUDS[(k + j) & 3], (x + dx, -.003, z0 + .004), (0, 0, rr.uniform(0, 6.3)), 1.)
        K.cyl(f"Jar{s}Lid", .039, .036, .018, (x + dx, -.003, z0 + V(.2) * .82), K.BRASS, 12)
        K.cyl(f"Jar{s}Knob", .01, .008, .012, (x + dx, -.003, z0 + V(.2) * .82 + .018), K.BRASS, 8)

# ---------- menu board on the back bar ----------
FY = H(.915)                            # face front, from the counter centre (b.z - .225) back to z0 + .36
MW, MH, MZ = H(1.5), V(.5), V(1.97)
K.box("MenuFrame", (H(1.6), H(.04) + .012, V(.56)), (0, FY + H(.04) / 2 + .006, V(1.94)), DARKOAK, .01, 2)
K.box("MenuBack", (H(1.5), H(.05), V(.5)), (0, FY + H(.025), MZ), K.mat("MenuDark", "#22302a", .7), 0)
for sx in (-1, 1):
    K.cyl(f"MenuBolt{sx}", .012, .012, .008, (sx * (H(1.6) / 2 - .03), FY - .004, V(1.94) + V(.56) - .03), K.BRASS, 10).rotation_euler.x = math.pi / 2
W, Hh = 128, 44
img = bpy.data.images.new("FlightMenu", W, Hh)
dark, cream, green = (.05, .09, .07, 1), (.92, .84, .66, 1), (.36, .62, .3, 1)
px = []
for y in range(Hh):
    for x in range(W):
        c = dark
        for k in range(4):
            y0 = 34 - k * 8
            if y0 <= y < y0 + 3 and 14 <= x < (78 if k & 1 else 108): c = cream
            if y0 <= y < y0 + 3 and 6 <= x < 10: c = green
        px.extend(c)
img.pixels = px; img.pack()
MF = bpy.data.materials.new("MenuFace"); MF.use_nodes = True
nt = MF.node_tree; bsdf = nt.nodes["Principled BSDF"]
tex = nt.nodes.new("ShaderNodeTexImage"); tex.image = img; tex.interpolation = "Closest"
nt.links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])
nt.links.new(tex.outputs["Color"], bsdf.inputs["Emission Color"])
bsdf.inputs["Emission Strength"].default_value = .25; bsdf.inputs["Roughness"].default_value = .6
me = bpy.data.meshes.new("MenuFace")
x0, x1, z0, z1 = -MW / 2, MW / 2, MZ, MZ + MH
me.from_pydata([(x0, 0, z0), (x1, 0, z0), (x1, 0, z1), (x0, 0, z1)], [], [(0, 1, 2, 3)])
uv = me.uv_layers.new(name="UVMap")
for loop, (u, v) in zip(uv.data, ((0, 0), (1, 0), (1, 1), (0, 1))): loop.uv = (u, v)
mo = K.link(bpy.data.objects.new("MenuFace", me), MF); mo.location = (0, FY - .001, 0)

K.finish(OUT, "rooftop_jar_flight", ortho=2.3, centre=(0, .25, 1.0))
