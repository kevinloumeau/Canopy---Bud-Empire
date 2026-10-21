# Blender (bpy) script: python -m venv v && v/bin/pip install bpy numpy, then
#   v/bin/python scripts/meshy-character.py -- out.glb 1024 4500 <walking_withSkin.glb> <idle_withSkin.glb> [<running_withSkin.glb>]
# Build a game-ready Meshy character from its original downloads: one skinned mesh, cut to TRIS triangles without
# opening cracks (weld first, then collapse), a fresh UV layout of a few large padded islands, and a texture baked from
# the original high-res surface, plus every clip, scaled to the game's 1.36 m figure.
# Usage: build.py OUT.glb SIZE TRIS SRC_WALK.glb SRC_IDLE.glb [SRC_OTHER.glb ...]
import bpy, sys, numpy as np, bmesh
from mathutils.bvhtree import BVHTree
from mathutils import Vector
from mathutils.geometry import barycentric_transform
args = sys.argv[sys.argv.index('--') + 1:]
out, size, tris, srcs = args[0], int(args[1]), int(args[2]), args[3:]
HEIGHT = 1.36
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=srcs[0])
keep = set(bpy.data.objects)
arm = next(o for o in keep if o.type == 'ARMATURE'); hi = next(o for o in keep if o.type == 'MESH' and o.vertex_groups)
for o in list(keep):
    if o.type == 'MESH' and o is not hi: bpy.data.objects.remove(o)
# The other clips: import, keep the action, drop the objects.
for path in srcs[1:]:
    before = set(bpy.data.objects); bpy.ops.import_scene.gltf(filepath=path)
    for o in set(bpy.data.objects) - before: bpy.data.objects.remove(o)
for a in bpy.data.actions: a.use_fake_user = True
print('ACTIONS', [a.name for a in bpy.data.actions])
# Meshy's idles (Idle_12 above all) hold the arms well out from the body. Measure the hand spread in the idle and
# turn both upper arms in by the angle that brings it to a relaxed ~0.21 of the figure's metres, on every clip's keys.
import math
from mathutils import Quaternion
def fcurves(action):
    try: return action.fcurves
    except AttributeError: pass
    out = []
    for layer in action.layers:
        for strip in layer.strips:
            for bag in strip.channelbags: out.extend(bag.fcurves)
    return out
idle = next((a for a in bpy.data.actions if a.name.startswith('Idle')), None)
arm.animation_data_create(); arm.animation_data.action = idle
try: arm.animation_data.action_slot = idle.slots[0]
except Exception: pass
bpy.context.scene.frame_set(10); bpy.context.view_layer.update()
hw = lambda side: arm.matrix_world @ arm.pose.bones['mixamorig:%sHand' % side].head
hip = arm.matrix_world @ arm.pose.bones['mixamorig:Hips'].head
height = hi.dimensions.z
spread = (abs(hw('Left').x - hip.x) + abs(hw('Right').x - hip.x)) / 2 / height * 1.36
angle = max(0, min(25, (spread - .21) / .0048))
print('ARMS spread %.3f -> turn in %.1f deg' % (spread, angle))
if angle > .5:
    r = math.radians(angle) / math.sqrt(2)
    turn = {'Left': Quaternion((1, 0, 0), r) @ Quaternion((0, 0, 1), r), 'Right': Quaternion((1, 0, 0), r) @ Quaternion((0, 0, 1), -r)}
    for action in bpy.data.actions:
        curves = fcurves(action)
        for side, q in turn.items():
            path = 'pose.bones["mixamorig:%sArm"].rotation_quaternion' % side
            fc = sorted((c for c in curves if c.data_path == path), key=lambda c: c.array_index)
            if len(fc) != 4: continue
            for k in range(len(fc[0].keyframe_points)):
                key = Quaternion([fc[i].keyframe_points[k].co[1] for i in range(4)]) @ q
                for i in range(4): fc[i].keyframe_points[k].co[1] = key[i]; fc[i].keyframe_points[k].handle_left[1] = fc[i].keyframe_points[k].handle_right[1] = key[i]
            for c in fc: c.update()
arm.animation_data.action = None
arm.data.pose_position = 'REST'
srcimg = next(n.image for n in hi.data.materials[0].node_tree.nodes if n.type == 'TEX_IMAGE')
# The low mesh: a welded copy, collapsed to the triangle budget.
lo = hi.copy(); lo.data = hi.data.copy(); lo.name = 'char1'; bpy.context.collection.objects.link(lo)
hi.name = 'hires'
bm = bmesh.new(); bm.from_mesh(lo.data)
bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-4 * hi.dimensions.z / hi.matrix_world.to_scale().z)
bm.to_mesh(lo.data); bm.free()
d = lo.modifiers.new('dec', 'DECIMATE'); d.ratio = min(1, tris / len(lo.data.polygons))
for o in bpy.data.objects: o.select_set(o == lo)
bpy.context.view_layer.objects.active = lo
bpy.ops.object.modifier_apply(modifier='dec')
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT'); bpy.ops.mesh.quads_convert_to_tris()
me = lo.data
while len(me.uv_layers) > 1: me.uv_layers.remove(me.uv_layers[-1])
bpy.ops.object.mode_set(mode='OBJECT')
me.uv_layers[0].name = 'UVMap'
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.uv.smart_project(angle_limit=1.15, island_margin=0.01, area_weight=0.0, correct_aspect=True, scale_to_bounds=False)
bpy.ops.uv.pack_islands(margin=0.01, rotate=True)
bpy.ops.object.mode_set(mode='OBJECT')
bm = bmesh.new(); bm.from_mesh(lo.data); print('LOW tris', len(lo.data.polygons), 'boundary', sum(1 for e in bm.edges if e.is_boundary)); bm.free()
# Bake: every texel of the new layout finds the nearest point of the original surface and takes its colour there.
hme = hi.data; hme.calc_loop_triangles()
hv = [v.co.copy() for v in hme.vertices]; hpolys = [(t.vertices[:], t.loops[:]) for t in hme.loop_triangles]
bvh = BVHTree.FromPolygons(hv, [p[0] for p in hpolys])
huv = np.empty(len(hme.loops) * 2, np.float32); hme.uv_layers[0].data.foreach_get('uv', huv); huv = huv.reshape(-1, 2)
sw, sh = srcimg.size; src = np.empty(sw * sh * 4, np.float32); srcimg.pixels.foreach_get(src); src = src.reshape(sh, sw, 4)
def sample(u, v):
    x = np.clip(u * sw - .5, 0, sw - 1.001); y = np.clip(v * sh - .5, 0, sh - 1.001)
    x0 = x.astype(int); y0 = y.astype(int); fx = (x - x0)[:, None]; fy = (y - y0)[:, None]
    a = src[y0, x0, :3]; b = src[y0, x0 + 1, :3]; c = src[y0 + 1, x0, :3]; d = src[y0 + 1, x0 + 1, :3]
    return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy
luv = np.empty(len(me.loops) * 2, np.float32); me.uv_layers['UVMap'].data.foreach_get('uv', luv); luv = luv.reshape(-1, 2)
lco = np.array([v.co[:] for v in me.vertices], np.float32)
canvas = np.zeros((size, size, 3), np.float32); filled = np.zeros((size, size), bool)
for poly in me.polygons:
    li = list(poly.loop_indices); vi = list(poly.vertices)
    P = luv[li] * size; V = lco[vi]
    x0 = max(int(np.floor(P[:, 0].min())) - 1, 0); x1 = min(int(np.ceil(P[:, 0].max())) + 1, size - 1)
    y0 = max(int(np.floor(P[:, 1].min())) - 1, 0); y1 = min(int(np.ceil(P[:, 1].max())) + 1, size - 1)
    xs, ys = np.meshgrid(np.arange(x0, x1 + 1) + .5, np.arange(y0, y1 + 1) + .5); xs = xs.ravel(); ys = ys.ravel()
    (ax, ay), (bx, by), (cx, cy) = P
    den = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy)
    if abs(den) < 1e-12: continue
    w0 = ((by - cy) * (xs - cx) + (cx - bx) * (ys - cy)) / den; w1 = ((cy - ay) * (xs - cx) + (ax - cx) * (ys - cy)) / den; w2 = 1 - w0 - w1
    e = -0.75 / max(1.0, np.sqrt(abs(den)))
    m = (w0 >= e) & (w1 >= e) & (w2 >= e)
    if not m.any(): continue
    W = np.stack([w0[m], w1[m], w2[m]], 1).clip(0, 1); W /= W.sum(1, keepdims=True)
    pts = W @ V; uvs = np.empty((len(pts), 2), np.float32)
    for k, p in enumerate(pts):
        loc, nor, idx, dist = bvh.find_nearest(Vector(p))
        tv, tl = hpolys[idx]
        bc = barycentric_transform(loc, hv[tv[0]], hv[tv[1]], hv[tv[2]], Vector((1, 0, 0)), Vector((0, 1, 0)), Vector((0, 0, 1)))
        uvs[k] = bc[0] * huv[tl[0]] + bc[1] * huv[tl[1]] + bc[2] * huv[tl[2]]
    px = (xs[m] - .5).astype(int); py = (ys[m] - .5).astype(int)
    canvas[py, px] = sample(uvs[:, 0], uvs[:, 1]); filled[py, px] = True
for _ in range(24):
    grow = ~filled
    if not grow.any(): break
    acc = np.zeros_like(canvas); cnt = np.zeros(filled.shape, np.float32)
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        sf = np.roll(filled, (dy, dx), (0, 1)); acc += np.roll(canvas, (dy, dx), (0, 1)) * sf[..., None]; cnt += sf
    take = grow & (cnt > 0); canvas[take] = acc[take] / cnt[take][:, None]; filled |= take
img = bpy.data.images.new('texture', size, size)
img.pixels.foreach_set(np.concatenate([canvas, np.ones((size, size, 1), np.float32)], 2).ravel()); img.update(); img.pack()
bpy.data.objects.remove(hi)
mat = bpy.data.materials.new('Material_1'); mat.use_nodes = True; nt = mat.node_tree
bsdf = nt.nodes['Principled BSDF']; bsdf.inputs['Roughness'].default_value = .75; bsdf.inputs['Metallic'].default_value = 0
t = nt.nodes.new('ShaderNodeTexImage'); t.image = img; nt.links.new(t.outputs[0], bsdf.inputs['Base Color'])
me.materials.clear(); me.materials.append(mat)
# Scale to the game's figure height (the mesh is the armature's child).
arm.data.pose_position = 'POSE'
bpy.context.view_layer.update()
zs = [(lo.matrix_world @ v.co).z for v in me.vertices]; h = max(zs) - min(zs)
arm.scale = arm.scale * (HEIGHT / h)
print('HEIGHT was', h)
bpy.ops.export_scene.gltf(filepath=out, export_format='GLB', export_image_format='JPEG', export_jpeg_quality=88,
    export_animations=True, export_animation_mode='ACTIONS', export_skins=True, export_yup=True, export_apply=False)
print('BUILT', out)
