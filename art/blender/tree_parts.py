"""Shared pieces for Canopy's trees: soft clay-like canopy lumps, scallop bumps, a tapered forked trunk and an iron
tree-pit grate.  Used by street_tree.py, tree.py, shop_planter.py and rooftop_olive.py, next to canopy_kit.py.

Each lump is one of three shared meshes (a noise-displaced icosphere), placed and scaled per lump, so the glTF holds
the geometry once and the canopy only adds nodes.
"""
import bpy, bmesh, math
from mathutils import Vector, noise
import canopy_kit as K

_LUMPS, _BUMP = [], None
# LITE (set by street_tree.py and tree.py for phones): lumps are 120-triangle UV spheres instead of 320-triangle
# icospheres, scallop bumps 36 triangles instead of 80 and half as many, and the grate's boxes lose their bevels.
LITE = False

def _blob_mesh(name, subdiv, seed, amp, freq=1.6, uv=None):
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    if uv: bmesh.ops.create_uvsphere(bm, u_segments=uv[0], v_segments=uv[1], radius=1.)
    else: bmesh.ops.create_icosphere(bm, subdivisions=subdiv, radius=1.)
    off = Vector((seed * 7.1, seed * 3.3, seed * 5.7))
    for v in bm.verts:
        n = v.co.normalized()
        v.co = n * (1 + amp * noise.noise(n * freq + off))
    bm.to_mesh(me); bm.free()
    for p in me.polygons: p.use_smooth = True
    return me

def lump_meshes():
    """Three lumpy canopy masses and one small scallop bump, made once per scene."""
    global _BUMP
    if not _LUMPS:
        _LUMPS.extend(_blob_mesh(f"CanopyLump{k}", 3, k + 1, .07, 1.2, (10, 7) if LITE else None) for k in range(3))
        _BUMP = _blob_mesh("CanopyBump", 2, 9, .06, uv=(6, 4) if LITE else None)
    return _LUMPS, _BUMP

_COPIES = {}
def _with(me, m):
    """The shared mesh me carrying material m (one linked copy per material, so instances stay shared)."""
    key = (me.name, m.name)
    if key not in _COPIES:
        c = me.copy(); c.name = f"{me.name}_{m.name}"; c.materials.clear(); c.materials.append(m); _COPIES[key] = c
    return _COPIES[key]

def lump(name, centre, r, m, squash=.82, k=0, yaw=0., bumps=0, bump_m=None, rnd=None):
    """A canopy mass of radius r at centre, flattened by squash; with bumps, small scallops round its lower half."""
    lumps, bump = lump_meshes()
    if LITE: bumps = (bumps + 1) // 2
    o = bpy.data.objects.new(name, _with(lumps[k % 3], m)); K.col.objects.link(o)
    o.location = centre; o.scale = (r, r, r * squash); o.rotation_euler = (0, 0, yaw)
    for i in range(bumps):
        a = yaw + i * 2 * math.pi / bumps + (rnd.uniform(-.3, .3) if rnd else 0)
        el = (rnd.uniform(-.38, -.1) if rnd else -.25)
        d = Vector((math.cos(a) * math.cos(el), math.sin(a) * math.cos(el), math.sin(el) * squash))
        b = bpy.data.objects.new(f"{name}Bump{i}", _with(bump, bump_m or m)); K.col.objects.link(b)
        rb = r * (rnd.uniform(.2, .26) if rnd else .23)
        b.location = Vector(centre) + d * r * .93; b.scale = (rb, rb, rb * .6)
    return o

def trunk(name, base, top, r0, r1, m, forks=(), rf=None):
    """A tapered trunk from base to top, with optional fork branches [(end point), ...]."""
    K.tube(name, [base, top], r0, m, r1)
    for i, end in enumerate(forks):
        K.tube(f"{name}Fork{i}", [top if i % 2 else Vector(base).lerp(Vector(top), .7), end], rf or r1, m, (rf or r1) * .6)

def grate(name, side, frame, frame_m, grate_m, soil_m, slots=6, frame_h=.035, kerb=0., kerb_m=None, hole=0.):
    """A square tree-pit grate on the pavement (top near z=frame_h): frame band, sunk grille of crossed bars, soil."""
    s = side / 2
    _box = K.box
    if LITE:
        def _box(n, size, loc, m, bevel=0., seg=1): return K.box(n, size, loc, m, 0)
    if kerb:
        for n, (dx, dy, w, d) in enumerate(((0, s + kerb / 2, side + 2 * kerb, kerb), (0, -s - kerb / 2, side + 2 * kerb, kerb),
                                            (s + kerb / 2, 0, kerb, side), (-s - kerb / 2, 0, kerb, side))):
            _box(f"{name}Kerb{n}", (w, d, frame_h * .8), (dx, dy, 0), kerb_m or frame_m, .006, 2)
    for n, (dx, dy, w, d) in enumerate(((0, s - frame / 2, side, frame), (0, -s + frame / 2, side, frame),
                                        (s - frame / 2, 0, frame, side - 2 * frame), (-s + frame / 2, 0, frame, side - 2 * frame))):
        _box(f"{name}Frame{n}", (w, d, frame_h), (dx, dy, 0), frame_m, .006, 2)
    inner = side - 2 * frame
    _box(f"{name}Soil", (inner, inner, .006), (0, 0, 0), soil_m, 0)
    # Slotted quarters like the sprites' grates: a centre cross, and in each quarter slots running the other way to
    # its neighbours, round the trunk hole.
    _box(f"{name}CrossX", (inner, frame * .7, frame_h * .6), (0, 0, frame_h * .15), grate_m, .003, 1)
    _box(f"{name}CrossY", (frame * .7, inner, frame_h * .6), (0, 0, frame_h * .15), grate_m, .003, 1)
    q = inner / 2 - frame * .35
    bar = q / (slots * 2 + 1)
    for qi, (sx, sy) in enumerate(((1, 1), (-1, 1), (-1, -1), (1, -1))):
        cx, cy = sx * (frame * .35 + q / 2), sy * (frame * .35 + q / 2)
        along_x = qi % 2 == 0
        for i in range(slots + 1):
            t = -q / 2 + bar / 2 + i * 2 * bar
            if along_x: _box(f"{name}Bar{qi}{i}", (q, bar * .95, frame_h * .55), (cx, cy + t, frame_h * .2), grate_m, .003, 1)
            else: _box(f"{name}Bar{qi}{i}", (bar * .95, q, frame_h * .55), (cx + t, cy, frame_h * .2), grate_m, .003, 1)
    K.cyl(f"{name}Ring", hole + frame * .3, hole + frame * .3, frame_h * .7, (0, 0, 0), grate_m, 12 if LITE else 24) if hole else None
