"""Head-and-shoulders portraits of the shoppers (public/icons/3d/people-*.png) for the customer pick card.

Each shopper's own game model (public/models/people/NAME.glb) at the first frame of its idle, seen from the front and a
little above under the same sun, fill and AgX look as the other 3D icons, on a transparent background.  The Meshy
material is set matte (the game does the same in map3d.js) so the face is lit, not milky.  Run headless with bpy:
    python art/blender/people_portraits.py OUT_DIR [name ...]
Then trim and shrink with scripts/trim-icons.py.
"""
import sys, os, math
ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
OUT = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.getcwd()
ONLY = sys.argv[2:]
import bpy
from mathutils import Vector

PEOPLE = ['beanie-character', 'colorful-jacket', 'gray-blazer', 'plaid-shirt', 'utility-vest', 'office-woman',
          'bearded-blue-shirt', 'tie-dye-hoodie', 'cream-outfit', 'trench-coat', 'linen-tunic', 'blazer-woman',
          'beanie-hoodie', 'puffer-vest-woman', 'fleece-man', 'yellow-jacket-woman', 'athletic-man', 'hijab-woman',
          'pattern-shirt-man', 'tweed-senior', 'green-sweater-man', 'chef-woman', 'overalls-woman',
          'punk-jacket-woman', 'bomber-jacket-man']


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def portrait(name):
    reset()
    scene = bpy.context.scene
    bpy.ops.import_scene.gltf(filepath=os.path.join(ROOT, 'public', 'models', 'people', name + '.glb'))
    scene.frame_set(1)
    for m in bpy.data.materials:
        if not m.use_nodes:
            continue
        b = m.node_tree.nodes.get('Principled BSDF')
        if not b:
            continue
        b.inputs['Metallic'].default_value = 0
        b.inputs['Roughness'].default_value = .55
        for key in ('Emission Strength',):
            if key in b.inputs:
                b.inputs[key].default_value = 0
    # Bounds of the posed mesh, to find the head.
    dg = bpy.context.evaluated_depsgraph_get()
    pts = []
    for o in scene.objects:
        if o.type != 'MESH':
            continue
        e = o.evaluated_get(dg)
        me = e.to_mesh()
        pts += [e.matrix_world @ v.co for v in me.vertices]
        e.to_mesh_clear()
    top = max(p.z for p in pts)
    bottom = min(p.z for p in pts)
    h = top - bottom
    head = [p for p in pts if p.z > top - h * .14]
    cx = sum(p.x for p in head) / len(head)
    cy = sum(p.y for p in head) / len(head)
    # Head and shoulders, centred on the head.
    centre = Vector((cx, cy, top - h * .14))
    cam_d = bpy.data.cameras.new('Cam'); cam_d.type = 'ORTHO'; cam_d.ortho_scale = h * .3
    cam = bpy.data.objects.new('Cam', cam_d); scene.collection.objects.link(cam)
    # the people face -Y after import; look at them from the front, a touch from the side and above.
    yaw = math.radians(18)
    d = Vector((math.sin(yaw), -math.cos(yaw), .32)).normalized()
    cam.location = centre + d * 6
    cam.rotation_euler = (-d).to_track_quat('-Z', 'Y').to_euler()
    scene.camera = cam
    sun_d = bpy.data.lights.new('Sun', 'SUN'); sun_d.energy = 3.4; sun_d.angle = math.radians(6); sun_d.color = (1, .95, .86)
    sun = bpy.data.objects.new('Sun', sun_d); scene.collection.objects.link(sun)
    sun.rotation_euler = (math.radians(50), math.radians(-20), math.radians(-25))
    world = bpy.data.worlds.new('World'); scene.world = world; world.use_nodes = True
    bg = world.node_tree.nodes['Background']; bg.inputs['Color'].default_value = (.92, .9, .85, 1); bg.inputs['Strength'].default_value = .9
    scene.render.engine = 'CYCLES'; scene.cycles.device = 'CPU'
    scene.cycles.samples = int(os.environ.get('SAMPLES', '48')); scene.cycles.use_denoising = True
    scene.render.film_transparent = True
    scene.render.resolution_x = scene.render.resolution_y = 240
    scene.view_settings.view_transform = 'AgX'; scene.view_settings.look = 'AgX - Medium High Contrast'
    scene.render.filepath = os.path.join(OUT, 'people-' + name + '.png')
    bpy.ops.render.render(write_still=True)


for n in (ONLY or PEOPLE):
    portrait(n)
