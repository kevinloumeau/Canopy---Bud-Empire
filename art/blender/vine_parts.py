"""Leafy greenery for Canopy's rooftop lounge: climbing-vine leaf cards, small leaf clusters, vine strands that hang
or spiral round a post, and a leafy shrub built from clusters.  Used by rooftop_pergola_vines.py and deck_planter.py,
next to canopy_kit.py.

Kept light for phones: a leaf is a 4-triangle card (double-sided material), a cluster is 7 leaves (28 triangles), a
stem segment is 6 triangles, and every copy shares its mesh, so the glTF holds each shape once.
"""
import bpy, bmesh, math, random
from mathutils import Vector, Matrix, Euler, noise
import canopy_kit as K

_SHARED = {}

def _shared(key, build):
    if key not in _SHARED: _SHARED[key] = build()
    return _SHARED[key]

def _leaf(bm, mtx):
    """One ivy-like leaf card, base at the origin, tip along +Y, a slight cup up the midrib: 4 triangles."""
    pts = [(0, 0, 0), (-.42, .42, .06), (0, 1, .02), (.42, .42, .06), (0, .46, .12)]
    vs = [bm.verts.new(mtx @ Vector(p)) for p in pts]
    for f in ((0, 4, 1), (1, 4, 2), (2, 4, 3), (3, 4, 0)): bm.faces.new([vs[i] for i in f])

def leaf_mesh(m):
    """A single leaf (unit length) in material m."""
    def build():
        me = bpy.data.meshes.new(f"VineLeaf_{m.name}"); bm = bmesh.new()
        _leaf(bm, Matrix.Identity(4)); bm.to_mesh(me); bm.free(); me.materials.append(m)
        for p in me.polygons: p.use_smooth = True
        return me
    return _shared(("leaf", m.name), build)

def cluster_mesh(m, k):
    """A rosette of 7 leaves about a unit across: six round the rim tilted a little up or down, one on top."""
    def build():
        rnd = random.Random(31 + k * 17)
        me = bpy.data.meshes.new(f"VineCluster{k}_{m.name}"); bm = bmesh.new()
        for j in range(6):
            yaw = j * math.pi / 3 + rnd.uniform(-.35, .35)
            pitch = rnd.uniform(-.55, .35)       # + tips the leaf up
            s = rnd.uniform(.42, .58)
            off = Vector((rnd.uniform(-.06, .06), rnd.uniform(-.06, .06), rnd.uniform(-.04, .06)))
            mtx = Matrix.Translation(off) @ Matrix.Rotation(yaw - math.pi / 2, 4, 'Z') @ Matrix.Rotation(pitch, 4, 'X') @ Matrix.Scale(s, 4)
            _leaf(bm, mtx)
        mtx = Matrix.Translation((0, 0, .1)) @ Matrix.Rotation(rnd.uniform(0, 6.3), 4, 'Z') @ Matrix.Rotation(.5, 4, 'X') @ Matrix.Scale(.45, 4)
        _leaf(bm, mtx)
        bm.to_mesh(me); bm.free(); me.materials.append(m)
        for p in me.polygons: p.use_smooth = True
        return me
    return _shared(("cluster", m.name, k), build)

def stem_mesh(m):
    """A 3-sided unit stem along -Z (6 triangles)."""
    def build():
        me = bpy.data.meshes.new(f"VineStem_{m.name}"); bm = bmesh.new()
        ring = lambda z: [bm.verts.new((math.cos(t), math.sin(t), z)) for t in (0, 2.094, 4.189)]
        a, b = ring(0), ring(-1)
        for j in range(3): bm.faces.new((a[j], a[(j + 1) % 3], b[(j + 1) % 3], b[j]))
        bm.to_mesh(me); bm.free(); me.materials.append(m)
        return me
    return _shared(("stem", m.name), build)

def _obj(name, me):
    o = bpy.data.objects.new(name, me); K.col.objects.link(o); return o

def cluster(name, loc, size, mats, rnd, tilt=.25, rot=None):
    """A leaf cluster at loc, `size` metres across, in a random one of mats, random yaw and a small tilt."""
    o = _obj(name, cluster_mesh(mats[rnd.randrange(len(mats))], rnd.randrange(3)))
    o.location = loc; o.scale = (size,) * 3
    o.rotation_euler = rot if rot is not None else (rnd.uniform(-tilt, tilt), rnd.uniform(-tilt, tilt), rnd.uniform(0, 6.3))
    return o

def leaf(name, loc, size, m, out, droop=.6, roll=0.):
    """One leaf at loc, its tip heading along the horizontal direction `out` (radians) and drooping by `droop`."""
    o = _obj(name, leaf_mesh(m)); o.location = loc; o.scale = (size,) * 3
    o.rotation_euler = (-droop, roll, out - math.pi / 2)     # droop about X, then turn the tip toward `out`
    return o

def stem(name, p0, p1, r, m):
    d = p1 - p0
    o = _obj(name, stem_mesh(m)); o.location = p0
    o.rotation_mode = "QUATERNION"; o.rotation_quaternion = (-d).to_track_quat("Z", "Y")
    o.scale = (r, r, d.length)
    return o

def path_leaves(tag, pts, leaf_mats, stem_m, rnd, size=.05, every=1, centre=None, r_stem=.004, shrink=.35):
    """Stem segments along pts with leaves at the joints, alternating sides.  When `centre` (x, y) is given the leaves
    face away from it (round a post); otherwise they face sideways off the strand."""
    n = len(pts) - 1
    for i in range(n):
        stem(f"{tag}Stem{i}", pts[i], pts[i + 1], r_stem, stem_m)
    for i in range(1, n + 1, every):
        p = pts[i]; t = i / n
        if centre is not None:
            out = math.atan2(p.y - centre[1], p.x - centre[0]) + rnd.uniform(-.5, .5)
        else:
            d = pts[i] - pts[i - 1]; out = math.atan2(d.y, d.x) + (1 if i % 2 else -1) * math.pi / 2 + rnd.uniform(-.6, .6)
        sc = size * rnd.uniform(.85, 1.15) * (1 - shrink * t)
        leaf(f"{tag}Leaf{i}", p, sc, leaf_mats[(i + rnd.randrange(2)) % len(leaf_mats)], out, rnd.uniform(.35, .9), rnd.uniform(-.4, .4))

def hanging(tag, top, length, leaf_mats, stem_m, rnd, size=.045, step=.05, sway=.025):
    """A strand hanging straight down from top with a gentle wave."""
    n = max(2, int(length / step)); ph = rnd.uniform(0, 6.3)
    pts = [Vector((top[0] + math.sin(ph + t * 4) * sway * t, top[1] + math.cos(ph + t * 3) * sway * t, top[2] - length * t))
           for t in (i / n for i in range(n + 1))]
    path_leaves(tag, pts, leaf_mats, stem_m, rnd, size)

def spiral(tag, cx, cy, ztop, drop, radius, leaf_mats, stem_m, rnd, size=.05, step=.045, turns_per_m=2.2):
    """A vine winding down a post centred at (cx, cy) from ztop, `drop` metres, leaves facing out."""
    n = max(3, int(drop / step)); ph = rnd.uniform(0, 6.3)
    pts = []
    for i in range(n + 1):
        t = i / n; a = ph + t * drop * turns_per_m * 2 * math.pi
        rr = radius * (1 + .15 * math.sin(i * 1.7))
        pts.append(Vector((cx + math.cos(a) * rr, cy + math.sin(a) * rr, ztop - drop * t)))
    path_leaves(tag, pts, leaf_mats, stem_m, rnd, size, centre=(cx, cy), shrink=.45)

def leafy_shrub(tag, centre, r, mats, core_m, rnd, n=9):
    """A rounded shrub: a small dark core lump hidden under leaf clusters over its top and sides (~80 + n x 28 tris)."""
    cx, cy, cz = centre
    core = bpy.data.meshes.get("ShrubCoreMesh")
    if core is None:
        core = bpy.data.meshes.new("ShrubCoreMesh"); bm = bmesh.new()
        bmesh.ops.create_icosphere(bm, subdivisions=1, radius=1.); bm.to_mesh(core); bm.free(); core.materials.append(core_m)
        for p in core.polygons: p.use_smooth = True
    o = _obj(f"{tag}Core", core); o.location = (cx, cy, cz); o.scale = (r * .82, r * .82, r * .62)
    golden = math.pi * (3 - math.sqrt(5))
    for j in range(n):
        # Spread over the upper dome with a golden-angle spiral; the lower ring leans out more.
        h = 1 - (j + .5) / n * 1.15                      # 1 at the top to about -.15 near the soil
        ring = math.sqrt(max(0, 1 - h * h)); a = j * golden + rnd.uniform(-.2, .2)
        nx, ny, nz = math.cos(a) * ring, math.sin(a) * ring, h
        loc = (cx + nx * r * .78, cy + ny * r * .78, cz + nz * r * .6)
        # Tip each cluster so it faces outward from the core.
        rot = Vector((nx, ny, nz + .35)).normalized().to_track_quat("Z", "Y").to_euler()
        rot.z += rnd.uniform(0, 6.3)
        cluster(f"{tag}Leaves{j}", loc, r * rnd.uniform(.85, 1.05), mats, rnd, rot=rot)

def _soft_leaf(bm, mtx):
    """A rounded oval leaf: blunt tip, domed middle, 6 triangles, so a shrub reads soft rather than spiky."""
    pts = [(0, 0, 0), (-.3, .2, .04), (-.34, .55, .06), (0, .85, .04), (.34, .55, .06), (.3, .2, .04), (0, .45, .1)]
    vs = [bm.verts.new(mtx @ Vector(p)) for p in pts]
    for j in range(6): bm.faces.new((vs[6], vs[j], vs[(j + 1) % 6]))

def soft_cluster_mesh(m, k):
    """Eight rounded leaves laid nearly flat in an overlapping rosette (48 triangles)."""
    def build():
        rnd = random.Random(53 + k * 13)
        me = bpy.data.meshes.new(f"ShrubLeaves{k}_{m.name}"); bm = bmesh.new()
        for j in range(7):
            yaw = j * 2 * math.pi / 7 + rnd.uniform(-.25, .25)
            mtx = (Matrix.Translation((0, 0, rnd.uniform(-.02, .03))) @ Matrix.Rotation(yaw - math.pi / 2, 4, 'Z')
                   @ Matrix.Rotation(rnd.uniform(-.25, .05), 4, 'X') @ Matrix.Scale(rnd.uniform(.5, .6), 4))
            _soft_leaf(bm, mtx)
        _soft_leaf(bm, Matrix.Translation((0, -.1, .06)) @ Matrix.Rotation(rnd.uniform(0, 6.3), 4, 'Z') @ Matrix.Scale(.45, 4))
        bm.to_mesh(me); bm.free(); me.materials.append(m)
        for p in me.polygons: p.use_smooth = True
        return me
    return _shared(("soft", m.name, k), build)

def soft_shrub(tag, centre, r, mats, core_m, rnd, n=14):
    """A soft mound: a fuller core with rounded leaf rosettes laid close over it (~80 + n x 48 tris)."""
    cx, cy, cz = centre
    core = bpy.data.meshes.get("SoftCoreMesh")
    if core is None:
        core = bpy.data.meshes.new("SoftCoreMesh"); bm = bmesh.new()
        bmesh.ops.create_icosphere(bm, subdivisions=2, radius=1.); bm.to_mesh(core); bm.free(); core.materials.append(core_m)
        for p in core.polygons: p.use_smooth = True
    o = _obj(f"{tag}Core", core); o.location = (cx, cy, cz); o.scale = (r * .9, r * .9, r * .7)
    golden = math.pi * (3 - math.sqrt(5))
    for j in range(n):
        h = 1 - (j + .5) / n * 1.1
        ring = math.sqrt(max(0, 1 - h * h)); a = j * golden + rnd.uniform(-.15, .15)
        nx, ny, nz = math.cos(a) * ring, math.sin(a) * ring, h
        loc = (cx + nx * r * .9, cy + ny * r * .9, cz + nz * r * .7)
        rot = Vector((nx, ny, nz * 1.3)).normalized().to_track_quat("Z", "Y").to_euler(); rot.z += rnd.uniform(0, 6.3)
        o = _obj(f"{tag}Leaves{j}", soft_cluster_mesh(mats[rnd.randrange(len(mats))], rnd.randrange(3)))
        o.location = loc; o.rotation_euler = rot; o.scale = (r * rnd.uniform(.8, .95),) * 3

def smooth_shrub(tag, centre, r, mats, core_m, rnd, n=10):
    """A smooth rounded bush with only a light leaf texture: a full-size soft core in the leaves' own green, and
    rounded leaf rosettes lying flat against its surface (~320 + n x 48 tris)."""
    cx, cy, cz = centre
    core = bpy.data.meshes.get("SmoothCoreMesh")
    if core is None:
        core = bpy.data.meshes.new("SmoothCoreMesh"); bm = bmesh.new()
        bmesh.ops.create_icosphere(bm, subdivisions=2, radius=1.)
        for v in bm.verts:
            nrm = v.co.normalized(); v.co = nrm * (1 + .06 * noise.noise(nrm * 2.2 + Vector((3, 1, 7))))
        bm.to_mesh(core); bm.free(); core.materials.append(core_m)
        for p in core.polygons: p.use_smooth = True
    o = _obj(f"{tag}Core", core); o.location = (cx, cy, cz); o.scale = (r, r, r * .78)
    golden = math.pi * (3 - math.sqrt(5))
    for j in range(n):
        h = 1 - (j + .5) / n * 1.0
        ring = math.sqrt(max(0, 1 - h * h)); a = j * golden + rnd.uniform(-.15, .15)
        nx, ny, nz = math.cos(a) * ring, math.sin(a) * ring, h
        loc = (cx + nx * r * .96, cy + ny * r * .96, cz + nz * r * .75)
        # face straight out along the (squashed) surface normal so the leaves lie flat on the mound
        rot = Vector((nx, ny, nz / .78)).normalized().to_track_quat("Z", "Y").to_euler(); rot.z += rnd.uniform(0, 6.3)
        o = _obj(f"{tag}Leaves{j}", soft_cluster_mesh(mats[rnd.randrange(len(mats))], rnd.randrange(3)))
        o.location = loc; o.rotation_euler = rot; o.scale = (r * rnd.uniform(.6, .72),) * 3

def _flower_mesh(m):
    """A tiny flower knot: three flattened 20-triangle blobs (60 tris), about one unit across."""
    def build():
        me = bpy.data.meshes.new(f"FlowerKnot_{m.name}"); bm = bmesh.new()
        for (x, y) in ((-.3, 0), (.28, .15), (0, -.3)):
            r = bmesh.ops.create_icosphere(bm, subdivisions=1, radius=.38)
            for v in r["verts"]: v.co = Vector((v.co.x + x, v.co.y + y, v.co.z * .55))
        bm.to_mesh(me); bm.free(); me.materials.append(m)
        for p in me.polygons: p.use_smooth = True
        return me
    return _shared(("flower", m.name), build)

def scale_shrub(tag, centre, r, mats, core_m, flower_mats, rnd, n=60, flowers=6, core_sub=2, leaf_size=(.34, .42), sq=.82, low=1.3):
    """A dense round bush like the sprite-era shrubs: a soft core shingled all over with small rounded leaves that
    lie almost flat on it, tips pointing down the slope, plus a few small orange and pink flower knots
    (~80 + n x 6 + flowers x 60 tris)."""
    cx, cy, cz = centre
    core = bpy.data.meshes.get(f"ScaleCoreMesh{core_sub}_{core_m.name}")
    if core is None:
        core = bpy.data.meshes.new(f"ScaleCoreMesh{core_sub}_{core_m.name}"); bm = bmesh.new()
        bmesh.ops.create_icosphere(bm, subdivisions=core_sub, radius=1.); bm.to_mesh(core); bm.free(); core.materials.append(core_m)
        for p in core.polygons: p.use_smooth = True
    o = _obj(f"{tag}Core", core); o.location = (cx, cy, cz); o.scale = (r * .93, r * .93, r * .93 * sq)
    golden = math.pi * (3 - math.sqrt(5))
    def surface(h, a):
        ring = math.sqrt(max(0, 1 - h * h))
        nx, ny, nz = math.cos(a) * ring, math.sin(a) * ring, h
        return Vector((cx + nx * r, cy + ny * r, cz + nz * r * sq)), Vector((nx, ny, nz / sq)).normalized()
    for j in range(n):
        h = 1 - (j + .5) / n * low                          # down to just below the equator
        pos, nrm = surface(h, j * golden + rnd.uniform(-.1, .1))
        down = Vector((0, 0, -1)); tang = (down - nrm * down.dot(nrm))
        tang = tang.normalized() if tang.length > 1e-3 else Vector((math.cos(j), math.sin(j), 0))
        tang = (Matrix.Rotation(rnd.uniform(-.6, .6), 3, nrm) @ tang).normalized()
        lift = rnd.uniform(.05, .2)                          # tip lifts a little off the surface
        y_ax = (tang * math.cos(lift) + nrm * math.sin(lift)).normalized()
        z_ax = nrm.cross(y_ax).cross(y_ax) * -1
        z_ax = (z_ax - y_ax * z_ax.dot(y_ax)).normalized(); x_ax = y_ax.cross(z_ax)
        rotm = Matrix((x_ax, y_ax, z_ax)).transposed()
        lf = _obj(f"{tag}Leaf{j}", _soft_leaf_mesh(mats[rnd.randrange(len(mats))]))
        lf.location = pos - tang * r * .12; lf.rotation_mode = "QUATERNION"; lf.rotation_quaternion = rotm.to_quaternion()
        lf.scale = (r * rnd.uniform(*leaf_size),) * 3
    for f in range(flowers):
        h = rnd.uniform(-.1, .85); pos, nrm = surface(h, rnd.uniform(0, 6.3))
        fo = _obj(f"{tag}Flower{f}", _flower_mesh(flower_mats[f % len(flower_mats)]))
        fo.location = pos + nrm * r * .06; fo.rotation_mode = "QUATERNION"; fo.rotation_quaternion = nrm.to_track_quat("Z", "Y")
        fo.scale = (r * .2,) * 3

def _soft_leaf_mesh(m):
    def build():
        me = bpy.data.meshes.new(f"ShrubLeaf_{m.name}"); bm = bmesh.new()
        _soft_leaf(bm, Matrix.Identity(4)); bm.to_mesh(me); bm.free(); me.materials.append(m)
        for p in me.polygons: p.use_smooth = True
        return me
    return _shared(("softleaf", m.name), build)
