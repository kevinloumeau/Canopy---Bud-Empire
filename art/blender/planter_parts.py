"""Low-poly greenery for Canopy's planters and hanging plants: shrub lumps, heart-shaped pothos leaves on trailing
strands, and the shop's panelled planter box.  Used by edge_planter.py, deck_planter.py, hanging_basket.py and
pothos_rail.py, next to canopy_kit.py.

Everything is kept light for phones: a shrub lump is an 80-triangle displaced icosphere, a pothos leaf is a 4-triangle
card, and every copy shares its mesh, so the glTF holds each shape once.
"""
import bpy, bmesh, math, random
from mathutils import Vector, Matrix, noise
import canopy_kit as K

M, V = 1 / 1.69, .7247            # map units -> metres across, world heights -> metres up
_SHARED = {}

def _shared(key, build):
    if key not in _SHARED: _SHARED[key] = build()
    return _SHARED[key]

def _lump_mesh(k):
    """An 80-triangle soft clump, noise-displaced so the three variants don't read as balls."""
    def build():
        me = bpy.data.meshes.new(f"ShrubLump{k}"); bm = bmesh.new()
        bmesh.ops.create_icosphere(bm, subdivisions=2, radius=1.)
        off = Vector((k * 7.1 + 1, k * 3.3 + 2, k * 5.7 + 3))
        for v in bm.verts:
            n = v.co.normalized(); v.co = n * (1 + .14 * noise.noise(n * 1.7 + off))
        bm.to_mesh(me); bm.free()
        for p in me.polygons: p.use_smooth = True
        return me
    return _shared(("lump", k), build)

def _with(me, m):
    def build():
        c = me.copy(); c.name = f"{me.name}_{m.name}"; c.materials.clear(); c.materials.append(m); return c
    return _shared(("mat", me.name, m.name), build)

def lump(name, centre, r, m, squash=.8, k=0, yaw=0.):
    o = bpy.data.objects.new(name, _with(_lump_mesh(k % 3), m)); K.col.objects.link(o)
    o.location = centre; o.scale = (r, r, r * squash); o.rotation_euler = (0, 0, yaw)
    return o

def shrub(tag, centre, r, mats, rnd, parts=3):
    """A rounded shrub: a main clump and a couple of smaller side clumps in two greens (parts x 80 triangles)."""
    cx, cy, cz = centre
    lump(f"{tag}Core", (cx, cy, cz), r, mats[0], .8, rnd.randrange(3), rnd.uniform(0, 6.3))
    for j in range(parts - 1):
        a = rnd.uniform(0, 6.3) + j * 2.6
        lump(f"{tag}Side{j}", (cx + r * .55 * math.cos(a), cy + r * .55 * math.sin(a), cz - r * .15 + rnd.uniform(0, r * .25)),
             r * rnd.uniform(.6, .72), mats[(j + 1) % len(mats)], .78, rnd.randrange(3), a)

def _leaf_mesh(m, k):
    """A heart-shaped pothos leaf card: tip along -Z (it hangs), 4 triangles, a slight cup so it catches light."""
    def build():
        me = bpy.data.meshes.new(f"PothosLeaf_{m.name}"); bm = bmesh.new()
        pts = [(0, 0, 0), (-.5, .08, -.35), (0, .12, -.55), (.5, .08, -.35), (0, .02, -1.)]
        vs = [bm.verts.new(p) for p in pts]
        for f in ((0, 1, 2), (0, 2, 3), (1, 4, 2), (2, 4, 3)): bm.faces.new([vs[i] for i in f])
        bm.to_mesh(me); bm.free(); me.materials.append(m)
        for p in me.polygons: p.use_smooth = True
        return me
    return _shared(("leaf", m.name), build)

def _stem_mesh(m):
    def build():
        me = bpy.data.meshes.new(f"PothosStem_{m.name}"); bm = bmesh.new()
        ring = lambda z: [bm.verts.new((math.cos(t), math.sin(t), z)) for t in (0, 2.094, 4.189)]
        a, b = ring(0), ring(-1)
        for j in range(3): bm.faces.new((a[j], a[(j + 1) % 3], b[(j + 1) % 3], b[j]))
        bm.to_mesh(me); bm.free(); me.materials.append(m)
        return me
    return _shared(("stem", m.name), build)

def strand(tag, top, length, leaf_mats, stem_m, rnd, size=.055, step=.07, sway=.03, lean=(0, 0), stem=True, pairs=False):
    """A trailing pothos vine hanging from top: a thin stem (6 triangles per segment, optional) with leaves alternating
    down it, or in pairs; overlapping leaves read as the vine on their own at map distance."""
    n = max(2, int(length / step)); pts = []
    ph = rnd.uniform(0, 6.3)
    for i in range(n + 1):
        t = i / n
        pts.append(Vector((top[0] + math.sin(ph + t * 3.2) * sway + lean[0] * t, top[1] + math.cos(ph + t * 2.1) * sway * .6 + lean[1] * t,
                           top[2] - length * t)))
    for i in range(n):
        p0, p1 = pts[i], pts[i + 1]; d = p1 - p0
        if stem:
            s = bpy.data.objects.new(f"{tag}Stem{i}", _stem_mesh(stem_m)); K.col.objects.link(s)
            s.location = p0; s.rotation_mode = "QUATERNION"; s.rotation_quaternion = (-d).to_track_quat("Z", "Y")
            s.scale = (.0035, .0035, d.length)
        for side in ((1, -1) if pairs else (1 if i % 2 else -1,)):
            lf = bpy.data.objects.new(f"{tag}Leaf{i}{'L' if side < 0 else 'R'}", _leaf_mesh(leaf_mats[(i + rnd.randrange(3)) % len(leaf_mats)], i)); K.col.objects.link(lf)
            lf.location = p0.lerp(p1, .5 if side < 0 and pairs else 1.); sc = size * rnd.uniform(.8, 1.15) * (1 - .3 * i / n)
            lf.scale = (sc, sc, sc)
            lf.rotation_euler = (rnd.uniform(-.5, .2), side * rnd.uniform(.5, .9), ph + i * 1.9 + (1.4 if side < 0 else 0))
    return pts[-1]

def planter_box(tag, W, D, H, rim_h, mats, inlay=True):
    """The shop's planter: a forest-green box on dark feet, cream inlay frames, a dark rim and soil, origin on the floor.
    W along X, D along Y (metres)."""
    box_m, rim_m, soil_m, inlay_m = mats
    K.box(f"{tag}Feet", (W - .05, D - .05, .03), (0, 0, 0), rim_m, .008)
    K.box(f"{tag}Box", (W, D, H - .03), (0, 0, .03), box_m, .012, 1)
    if inlay:
        for sx in (-1, 1):
            K.box(f"{tag}InlayX{sx}T", (.008, D - .12, .014), (sx * (W / 2 + .002), 0, H - .075), inlay_m, 0, 1)
            K.box(f"{tag}InlayX{sx}B", (.008, D - .12, .014), (sx * (W / 2 + .002), 0, .09), inlay_m, 0, 1)
            for sy in (-1, 1):
                K.box(f"{tag}InlayX{sx}E{sy}", (.008, .014, H - .175), (sx * (W / 2 + .002), sy * (D / 2 - .067), .09), inlay_m, 0, 1)
        for sy in (-1, 1):
            K.box(f"{tag}InlayY{sy}T", (W - .12, .008, .014), (0, sy * (D / 2 + .002), H - .075), inlay_m, 0, 1)
            K.box(f"{tag}InlayY{sy}B", (W - .12, .008, .014), (0, sy * (D / 2 + .002), .09), inlay_m, 0, 1)
            for sx in (-1, 1):
                K.box(f"{tag}InlayY{sy}E{sx}", (.014, .008, H - .175), (sx * (W / 2 - .067), sy * (D / 2 + .002), .09), inlay_m, 0, 1)
    K.box(f"{tag}Rim", (W + .05, D + .05, rim_h), (0, 0, H), rim_m, .008, 1)
    K.box(f"{tag}Soil", (W - .1, D - .1, .02), (0, 0, H + rim_h - .016), soil_m, 0, 1)
    return H + rim_h
