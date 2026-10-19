"""Small helpers for branch-map models on top of canopy_kit (which lives in ../blender, owned by the diorama thread)."""
import os, sys, math
HERE = os.path.dirname(os.path.abspath(__file__))
# canopy_kit.py sits in ../blender in the project folder and in .. (art/blender) in the repo.
for kit in (os.path.join(HERE, "..", "blender"), os.path.join(HERE, "..")):
    sys.path.insert(0, kit)
import bpy, bmesh
import canopy_kit as K

def prism(name, pts2d, y0, y1, m):
    """An upright prism: a polygon in the XZ plane (x, z pairs) extruded from y0 to y1 (a gable end)."""
    mesh = bpy.data.meshes.new(name)
    n = len(pts2d)
    v = [(x, y0, z) for x, z in pts2d] + [(x, y1, z) for x, z in pts2d]
    f = [tuple(range(n))[::-1], tuple(range(n, 2 * n))] + [(i, (i + 1) % n, n + (i + 1) % n, n + i) for i in range(n)]
    mesh.from_pydata(v, [], f); mesh.update()
    o = K.link(bpy.data.objects.new(name, mesh), m)
    return o

def torus(name, loc, R, r, m, rot=(0, 0, 0), seg=16, ring=6):
    bm = bmesh.new()
    verts = []
    for i in range(seg):
        a = i * 2 * math.pi / seg
        for j in range(ring):
            b = j * 2 * math.pi / ring
            d = R + r * math.cos(b)
            verts.append(bm.verts.new((d * math.cos(a), d * math.sin(a), r * math.sin(b))))
    for i in range(seg):
        for j in range(ring):
            a, b = i * ring + j, i * ring + (j + 1) % ring
            c, d = ((i + 1) % seg) * ring + (j + 1) % ring, ((i + 1) % seg) * ring + j
            bm.faces.new((verts[a], verts[b], verts[c], verts[d]))
    mesh = bpy.data.meshes.new(name); bm.to_mesh(mesh); bm.free()
    for p in mesh.polygons: p.use_smooth = True
    o = K.link(bpy.data.objects.new(name, mesh), m); o.location = loc; o.rotation_euler = rot
    return o

def ellipsoid(name, loc, size, m, seg=12, rings=6):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=rings, radius=.5)
    bmesh.ops.scale(bm, vec=size, verts=bm.verts)
    mesh = bpy.data.meshes.new(name); bm.to_mesh(mesh); bm.free()
    for p in mesh.polygons: p.use_smooth = True
    o = K.link(bpy.data.objects.new(name, mesh), m); o.location = loc
    return o

def tris(out, name):
    import struct, json
    with open(os.path.join(out, name + ".glb"), "rb") as fh:
        data = fh.read()
    n = struct.unpack("<I", data[12:16])[0]; j = json.loads(data[20:20 + n])
    total = 0
    for mesh in j["meshes"]:
        for p in mesh["primitives"]:
            total += j["accessors"][p["indices"]]["count"] // 3 if "indices" in p else j["accessors"][p["attributes"]["POSITION"]]["count"] // 3
    print(name, "triangles:", total)
