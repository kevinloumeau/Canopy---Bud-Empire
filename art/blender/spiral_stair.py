"""Canopy spiral staircase: one flight of the two spirals on the shop's right-hand side (map3d.js spiral()).

Oak and green wedge treads alternate round a forest-green post with a brass foot plate and ball cap, green balusters
stand at each tread's outer corner, a brass handrail and a green outer stringer wind up with them.  Both spirals in the
game rise one storey (4.7 world units), so this one model serves both.  The origin is the post centre on the floor;
the top tread sits beside Blender +Y (map -z), the direction you step off onto the landing.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P spiral_stair.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy
import canopy_kit as K

OUT = K.begin("SpiralStair")
STEEL = K.mat("StairGreen", "#1f5a3c", .45, .2)
TREAD_OAK = K.mat("TreadOak", "#d9a768", .55)
TREAD_GREEN = K.mat("TreadGreen", "#3f7d43", .5)

MU, HU = 1 / 1.69, 1.2247 / 1.69          # metres per map unit across, and per world unit up (HEIGHT_SCALE)
N = 14                                     # risers; the 14th is the upper floor itself
STEP = math.radians(24)
R = 1.15 * MU                              # tread radius
RISE = 4.7 * HU / N
T = .1 * HU                                # tread thickness (a touch chunkier than the code .08, like the sprite)
ARRIVE = -math.pi / 2                      # map angle of the landing side
POST_R = .13 * MU

def angle(k):                              # map angle of tread k (0 = bottom), as map3d.js
    return ARRIVE + (N - 1 - k) * STEP

def at(a, r, z):                           # map angle a is (cos a, sin a) in map (x, z), i.e. Blender (cos a, -sin a)
    return (r * math.cos(a), -r * math.sin(a), z)

def wedge(name, a, w, z_top, m, r0=POST_R * .7, r1=R, seg=8):
    """A pie-slice tread centred on map angle a, spanning w radians, top at z_top."""
    verts, faces = [], []
    for i in range(seg + 1):
        t = a - w / 2 + w * i / seg
        for r in (r0, r1):
            for z in (z_top - T, z_top):
                verts.append(at(t, r, z))
    # vertex index: 4*i + 2*(outer) + (top)
    for i in range(seg):
        a0, b0 = 4 * i, 4 * (i + 1)
        faces += [(a0 + 1, b0 + 1, b0 + 3, a0 + 3),      # top
                  (a0, a0 + 2, b0 + 2, b0),              # bottom
                  (a0 + 2, a0 + 3, b0 + 3, b0 + 2),      # outer rim
                  (a0, b0, b0 + 1, a0 + 1)]              # inner rim
    e = 4 * seg
    faces += [(0, 1, 3, 2), (e, e + 2, e + 3, e + 1)]    # the two cut ends
    me = bpy.data.meshes.new(name); me.from_pydata(verts, [], faces); me.validate()
    o = K.link(bpy.data.objects.new(name, me), m)
    o.data.update()
    # make every face point outward whatever the winding
    import bmesh
    bm = bmesh.new(); bm.from_mesh(me); bmesh.ops.recalc_face_normals(bm, faces=bm.faces); bm.to_mesh(me); bm.free()
    bv = o.modifiers.new("Bevel", "BEVEL"); bv.width = .008; bv.segments = 2; bv.limit_method = "ANGLE"
    return o

def helix(name, r, a0, a1, z0, z1, thick, m, n=64):
    pts = [at(a0 + (a1 - a0) * i / n, r, z0 + (z1 - z0) * i / n) for i in range(n + 1)]
    return K.tube(name, pts, thick, m)

# ---------- post, foot plate and cap ----------
TOP_Z = N * RISE
RAIL_H = 1.0 * HU
K.box("FootPlate", (.56 * MU, .56 * MU, .06 * HU), (0, 0, 0), K.BRASS, .01)
K.cyl("FootCollar", POST_R * 1.5, POST_R * 1.2, .05, (0, 0, .06 * HU), K.BRASS, 32)
K.cyl("Post", POST_R, POST_R, TOP_Z + RAIL_H + .03, (0, 0, 0), STEEL, 32)
K.cyl("CapCollar", POST_R * 1.25, POST_R * 1.25, .03, (0, 0, TOP_Z + RAIL_H + .01), K.BRASS, 32)
bpy.ops.mesh.primitive_uv_sphere_add(radius=.13 * MU, location=(0, 0, TOP_Z + RAIL_H + .04 + .13 * MU), segments=24, ring_count=12)
cap = bpy.context.object; cap.name = "Cap"; bpy.ops.object.shade_smooth(); cap.data.materials.append(K.BRASS)

# ---------- treads, each with a baluster at its outer corner ----------
for k in range(N - 1):
    a, z = angle(k), RISE * (k + 1)
    wedge(f"Tread{k:02d}", a, STEP * 1.04, z, TREAD_OAK if k % 2 == 0 else TREAD_GREEN)
    b = a - STEP / 2
    x, y, _ = at(b, R - .06 * MU, 0)
    K.cyl(f"Baluster{k:02d}", .016, .016, RAIL_H - .01, (x, y, z), STEEL, 12)
    K.cyl(f"BalusterFoot{k:02d}", .024, .024, .015, (x, y, z), K.BRASS, 12)
    # a nosing strip of brass on the oak treads' leading edge
for k in range(N - 1):
    a, z = angle(k), RISE * (k + 1)
    edge = a + STEP * 1.04 / 2 - .01                       # the riser-side edge (towards the lower tread)
    p0, p1 = at(edge, POST_R * 1.1, z - .004), at(edge, R - .01, z - .004)
    K.tube(f"Nosing{k:02d}", [p0, p1], .008, K.BRASS)

# ---------- brass handrail and green outer stringer ----------
a0, a1 = angle(0) + STEP / 2, angle(N - 2) - STEP / 2
helix("Handrail", R - .06 * MU, a0, a1, RISE + RAIL_H, TOP_Z - RISE + RAIL_H, .05 * MU, K.BRASS)
helix("Stringer", R - .02 * MU, a0, a1, RISE - .14 * HU, TOP_Z - .14 * HU, .09 * MU, STEEL)
for end, (a, z) in (("Low", (a0, RISE + RAIL_H)), ("High", (a1, TOP_Z - RISE + RAIL_H))):
    x, y, _ = at(a, R - .06 * MU, 0)
    K.cyl(f"RailEnd{end}", .022, .022, .03, (x, y, z - .015), K.BRASS, 16)

print("treads", N - 1, "bottom", round(math.degrees(angle(0)), 1), "top", round(math.degrees(angle(N - 2)), 1),
      "rise", round(TOP_Z, 3), "radius", round(R, 3))
K.finish(OUT, "spiral_stair", ortho=4.6, centre=(0, 0, 2.1))
