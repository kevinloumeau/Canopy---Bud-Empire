"""3D icons for the Goals tab (public/icons/3d/goal-*.png).

Same 30-degree camera, sun and AgX look as the menu's strain, product and store icons, on a transparent background,
so the Goals tab matches the Stations, Menu and Empire tabs.  Flat objects (star, arrow, clipboard ...) stand up and
turn 45 degrees so they face the camera.  Run headless with bpy:
    python art/blender/goal_icons.py OUT_DIR [name ...]
Then trim and shrink with scripts/trim-icons.py (each PNG ends up at most 160 px on its long side).
"""
import sys, os, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.getcwd()
ONLY = set(sys.argv[2:])
sys.argv = [sys.argv[0], '--', OUT]
import bpy, bmesh
from mathutils import Vector, Matrix
import canopy_kit as K

FONT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts', 'Bricolage-ExtraBold.ttf')
FACE = math.radians(45)          # yaw that turns a part's -Y front towards the camera


def render(name, ortho, centre):
    scene = bpy.context.scene
    cam_d = bpy.data.cameras.new('IsoCam'); cam_d.type = 'ORTHO'; cam_d.ortho_scale = ortho
    cam = bpy.data.objects.new('IsoCam', cam_d); scene.collection.objects.link(cam)
    cam.rotation_euler = (math.radians(54.7356), 0, math.radians(45))
    cam.location = Vector(centre) + Vector((7, -7, 7))
    scene.camera = cam
    sun_d = bpy.data.lights.new('Sun', 'SUN'); sun_d.energy = 3.4; sun_d.angle = math.radians(6); sun_d.color = (1, .95, .86)
    sun = bpy.data.objects.new('Sun', sun_d); scene.collection.objects.link(sun)
    sun.rotation_euler = (math.radians(42), math.radians(-18), math.radians(-30))
    fill_d = bpy.data.lights.new('Fill', 'AREA'); fill_d.energy = 60; fill_d.size = 3; fill_d.color = (1, .97, .92)
    fill = bpy.data.objects.new('Fill', fill_d); scene.collection.objects.link(fill)
    fill.location = Vector(centre) + Vector((2.5, -3.5, 2.5)); fill.rotation_euler = (math.radians(60), 0, math.radians(35))
    world = bpy.data.worlds.new('World'); scene.world = world; world.use_nodes = True
    bg = world.node_tree.nodes['Background']; bg.inputs['Color'].default_value = (.92, .9, .85, 1); bg.inputs['Strength'].default_value = .7
    scene.render.engine = 'CYCLES'; scene.cycles.device = 'CPU'
    scene.cycles.samples = int(os.environ.get('SAMPLES', '64')); scene.cycles.use_denoising = True
    scene.render.film_transparent = True
    scene.render.resolution_x = scene.render.resolution_y = 256
    scene.view_settings.view_transform = 'AgX'; scene.view_settings.look = 'AgX - Medium High Contrast'
    scene.render.filepath = os.path.join(OUT, 'goal-' + name + '.png')
    bpy.ops.render.render(write_still=True)


def prism(name, pts, depth, m, bevel=.012, loc=(0, 0, 0), yaw=FACE):
    """A flat shape drawn in x (right) / z (up), extruded `depth` towards the camera, bevelled and turned to face it."""
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    front = [bm.verts.new((x, -depth / 2, z)) for x, z in pts]
    back = [bm.verts.new((x, depth / 2, z)) for x, z in pts]
    bm.faces.new(front); bm.faces.new(list(reversed(back)))
    n = len(pts)
    for i in range(n):
        j = (i + 1) % n
        bm.faces.new((front[i], back[i], back[j], front[j]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces); bm.to_mesh(me); bm.free()
    o = K.link(bpy.data.objects.new(name, me), m)
    if bevel:
        bv = o.modifiers.new('Bevel', 'BEVEL'); bv.width = bevel; bv.segments = 3; bv.limit_method = 'ANGLE'
    o.modifiers.new('Normals', 'WEIGHTED_NORMAL').keep_sharp = True
    o.location = loc; o.rotation_euler = (0, 0, yaw)
    return o


def facing(o, loc=None):
    """Turn a part built in the x/z plane so it faces the camera, about the world origin."""
    o.matrix_world = Matrix.Rotation(FACE, 4, 'Z') @ o.matrix_world
    return o


def label(name, text, size, loc, m, depth=.02):
    cu = bpy.data.curves.new(name, 'FONT'); cu.body = text; cu.size = size; cu.extrude = depth
    cu.align_x = 'CENTER'; cu.align_y = 'CENTER'
    if os.path.exists(FONT): cu.font = bpy.data.fonts.load(FONT)
    o = K.link(bpy.data.objects.new(name, cu), m)
    o.rotation_euler = (math.radians(90), 0, 0); o.location = loc
    return o


GOLD = None
def palette():
    global GOLD, GOLD_D, CORAL, CORAL_D, LIME, LIME_D, PAPER, INK
    GOLD = K.mat('Gold', '#e6b84f', .32, .55); GOLD_D = K.mat('GoldDeep', '#c4933a', .38, .5)
    CORAL = K.mat('Coral', '#e0634f', .45); CORAL_D = K.mat('CoralDeep', '#b84a3b', .5)
    LIME = K.mat('Lime', '#8fcb4a', .45); LIME_D = K.mat('LimeDeep', '#5f9a32', .5)
    PAPER = K.mat('Paper', '#f7f1e3', .7); INK = K.mat('Ink', '#2d6a4c', .5)


def start(name):
    K.begin(name); palette()


def star_pts(r_out, r_in, n=5, cx=0, cz=0):
    pts = []
    for k in range(n * 2):
        a = math.pi / 2 + k * math.pi / n
        r = r_out if k % 2 == 0 else r_in
        pts.append((cx + r * math.cos(a), cz + r * math.sin(a)))
    return list(reversed(pts))


# ---- The icons ----
def gift():
    start('gift')
    K.box('Box', (.5, .5, .36), (0, 0, 0), CORAL, .02)
    K.box('Lid', (.56, .56, .12), (0, 0, .36), CORAL_D, .02)
    for rot in (0, 1):
        r = K.box('Ribbon%d' % rot, (.12, .58, .5), (0, 0, -.005), GOLD, .01)
        r.rotation_euler = (0, 0, rot * math.pi / 2)
    for k, yaw in enumerate((math.radians(45), math.radians(225))):
        loop = K.ring('Bow%d' % k, .11, .065, .07, (0, 0, 0), GOLD, 32)
        loop.rotation_euler = (math.radians(90), math.radians(-30 if k else 30), yaw)
        loop.location = (math.cos(yaw - math.pi / 2) * -.08, math.sin(yaw - math.pi / 2) * -.08, .58)
    K.cyl('Knot', .05, .045, .06, (0, 0, .48), GOLD_D, 24)
    render('gift', 1.05, (0, 0, .3))


def trophy():
    start('trophy')
    K.box('Plinth', (.34, .34, .12), (0, 0, 0), K.WOOD, .02)
    K.box('Plate', (.16, .01, .05), (0, -.172, .035), GOLD_D, .004).rotation_euler = (0, 0, 0)
    K.cyl('Stem', .035, .05, .14, (0, 0, .12), GOLD, 24)
    K.cyl('Foot', .1, .06, .04, (0, 0, .12), GOLD, 32)
    K.cyl('Cup', .1, .2, .26, (0, 0, .26), GOLD, 48)
    K.ring('Lip', .205, .175, .03, (0, 0, .51), GOLD_D, 48)
    K.cyl('Inner', .175, .175, .01, (0, 0, .49), GOLD_D, 48)
    for s in (-1, 1):
        h = K.ring('Handle%d' % s, .09, .065, .035, (0, 0, 0), GOLD, 32)
        h.rotation_euler = (math.radians(90), 0, FACE)
        h.location = (s * .2 * math.cos(FACE), s * .2 * math.sin(FACE), .4)
    star = prism('Star', star_pts(.06, .025), .02, PAPER, .004)
    star.location = (.1 * math.sin(FACE) * 1.3, -.1 * math.cos(FACE) * 1.3, .37)
    render('trophy', 1.0, (0, 0, .28))


def coin():
    start('coin')
    for k, (x, y, z) in enumerate([(.05, .06, 0), (.05, .06, .07), (.05, .06, .14), (-.22, -.02, 0), (-.22, -.02, .07)]):
        K.cyl('Flat%d' % k, .15, .15, .06, (x, y, z), GOLD if k % 2 == 0 else GOLD_D, 48)
        K.ring('Edge%d' % k, .152, .13, .062, (x, y, z), GOLD_D if k % 2 == 0 else GOLD, 48)
    c = K.cyl('Stand', .2, .2, .07, (0, 0, 0), GOLD, 64)
    c.rotation_euler = (math.radians(90), 0, FACE); c.location = (.14, -.18, .2)
    r = K.ring('StandRim', .2, .17, .075, (0, 0, 0), GOLD_D, 64)
    r.rotation_euler = (math.radians(90), 0, FACE); r.location = (.14 - .002, -.18 - .002, .2)
    t = label('Dollar', '$', .26, (0, 0, 0), GOLD_D, .015)
    t.rotation_euler = (math.radians(90), 0, FACE)
    t.location = (.14 + .08 * math.sin(FACE), -.18 - .08 * math.cos(FACE), .2)
    render('coin', 1.0, (0, 0, .18))


def star():
    start('star')
    prism('Star', star_pts(.32, .14, 5, 0, .32), .12, GOLD, .03)
    prism('Shine', star_pts(.14, .06, 5, 0, .33), .14, K.mat('GoldHi', '#f6d77a', .3, .4), .015)
    render('star', .95, (0, 0, .3))


def up():
    start('up')
    pts = [(-.11, 0), (.11, 0), (.11, .3), (.27, .3), (0, .62), (-.27, .3), (-.11, .3)]
    prism('Arrow', list(reversed(pts)), .14, LIME, .03)
    K.cyl('Base', .26, .28, .05, (0, 0, -.05), INK, 48)
    render('up', 1.0, (0, 0, .28))


def calendar():
    start('calendar')
    body = prism('Back', [(-.28, 0), (.28, 0), (.28, .5), (-.28, .5)][::-1], .08, PAPER, .025)
    head = prism('Head', [(-.28, .38), (.28, .38), (.28, .55), (-.28, .55)][::-1], .1, CORAL, .02)
    for x in (-.15, .15):
        rg = K.ring('Ring%d' % (x > 0), .04, .025, .03, (0, 0, 0), GOLD, 24)
        rg.rotation_euler = (math.radians(90), 0, FACE)
        rg.location = (x * math.cos(FACE), x * math.sin(FACE), .56)
    t = label('Day', '7', .3, (0, 0, 0), INK, .02)
    t.rotation_euler = (math.radians(90), 0, FACE)
    t.location = (.05 * math.sin(FACE), -.05 * math.cos(FACE), .19)
    feet = K.box('Foot', (.5, .2, .03), (0, 0, -.03), K.WOOD, .01); feet.rotation_euler = (0, 0, FACE)
    render('calendar', 1.0, (0, 0, .27))


def contract():
    start('contract')
    board = prism('Board', [(-.24, 0), (.24, 0), (.24, .62), (-.24, .62)][::-1], .04, K.WOOD, .02)
    sheet = prism('Sheet', [(-.2, .04), (.2, .04), (.2, .55), (-.2, .55)][::-1], .05, PAPER, .006)
    for k, (w, z) in enumerate([(.26, .44), (.3, .36), (.3, .28), (.18, .2)]):
        ln = prism('Line%d' % k, [(-.15, z), (-.15 + w, z), (-.15 + w, z + .025), (-.15, z + .025)][::-1], .06, INK, .004)
    tick = prism('Seal', star_pts(.065, .045, 10, .11, .12), .065, CORAL, .006)
    clip = prism('Clip', [(-.1, .56), (.1, .56), (.08, .66), (-.08, .66)][::-1], .08, GOLD, .015)
    for o in (board, sheet, clip):
        pass
    # lean the whole board back a touch so it reads as a clipboard on a desk
    bpy.context.view_layer.update()
    for o in list(K.col.objects):
        o.matrix_world = Matrix.Rotation(FACE, 4, 'Z') @ Matrix.Rotation(math.radians(-12), 4, 'X') @ Matrix.Rotation(-FACE, 4, 'Z') @ o.matrix_world
    render('contract', 1.0, (0, 0, .3))


def book():
    start('book')
    cover = INK
    for s in (-1, 1):
        c = K.box('Cover%d' % s, (.32, .46, .03), (0, 0, 0), cover, .01)
        c.rotation_euler = (0, math.radians(-8 * s), 0); c.location = (s * .16, 0, 0)
        p = K.box('Pages%d' % s, (.29, .42, .05), (0, 0, 0), PAPER, .015)
        p.rotation_euler = (0, math.radians(-8 * s), 0); p.location = (s * .15, 0, .02)
        for k in range(3):
            ln = K.box('Text%d%d' % (s, k), (.18, .015, .004), (s * .15, .1 - k * .06, .07 + .012 * (1 - abs(s * .15) / .3)), K.mat('Faint', '#b9b2a0', .8), 0)
            ln.rotation_euler = (0, math.radians(-8 * s), 0)
    K.box('Spine', (.03, .46, .04), (0, 0, -.01), K.mat('Spine', '#1e4a37', .5), .01)
    rib = K.box('Ribbon', (.03, .12, .006), (.06, -.27, .02), CORAL, .002)
    bpy.context.view_layer.update()
    for o in list(K.col.objects): o.matrix_world = Matrix.Rotation(-math.radians(15), 4, 'Z') @ o.matrix_world
    render('book', .95, (0, 0, .05))


def person():
    start('person')
    shirt = K.mat('Shirt', '#4fa3a0', .55); skin = K.mat('Skin', '#e8b48f', .55); hair = K.mat('Hair', '#4a3426', .7)
    K.cyl('Body', .17, .1, .32, (0, 0, .02), shirt, 40)
    K.cyl('Shoulders', .1, .06, .06, (0, 0, .34), shirt, 40)
    head = K.cyl('Neck', .04, .04, .05, (0, 0, .36), skin, 16)
    bpy.ops.mesh.primitive_uv_sphere_add(radius=.12, location=(0, 0, .5), segments=32, ring_count=16)
    h = bpy.context.active_object; bpy.ops.object.shade_smooth(); h.data.materials.append(skin)
    bpy.context.scene.collection.objects.unlink(h); K.col.objects.link(h)
    bpy.ops.mesh.primitive_uv_sphere_add(radius=.125, location=(-.012, .012, .53), segments=32, ring_count=16)
    hh = bpy.context.active_object; bpy.ops.object.shade_smooth(); hh.data.materials.append(hair); hh.scale = (1, 1, .75)
    bpy.context.scene.collection.objects.unlink(hh); K.col.objects.link(hh)
    K.cyl('Base', .2, .22, .04, (0, 0, -.02), INK, 48)
    render('person', .95, (0, 0, .28))


def box():
    start('box')
    K.box('Carton', (.5, .42, .36), (0, 0, 0), K.KRAFT, .015)
    K.box('Tape', (.1, .43, .005), (0, 0, .358), K.mat('Tape', '#d8b07a', .35), .002)
    lab = K.box('Label', (.2, .01, .13), (.08, -.212, .14), INK, .004)
    K.box('Leaf', (.06, .012, .06), (.08, -.216, .17), LIME, .01).rotation_euler = (0, math.radians(45), 0)
    render('box', 1.0, (0, 0, .2))


def bag():
    start('bag')
    K.box('Bag', (.42, .26, .46), (0, 0, 0), K.KRAFT, .012)
    K.box('Band', (.425, .265, .12), (0, 0, .18), INK, .006)
    K.box('Leaf', (.06, .01, .06), (0, -.133, .2), LIME, .01).rotation_euler = (0, math.radians(45), 0)
    for x in (-.08, .08):
        h = K.ring('Handle%d' % (x > 0), .07, .055, .02, (0, 0, 0), K.mat('Rope', '#5b3a27', .7), 24)
        h.rotation_euler = (math.radians(90), 0, 0); h.location = (0, x * 1.15, .45)
    bpy.context.view_layer.update()
    for o in list(K.col.objects): o.matrix_world = Matrix.Rotation(math.radians(20), 4, 'Z') @ o.matrix_world
    render('bag', 1.0, (0, 0, .3))


def leaf():
    start('leaf')
    K.pot('P', 0, 0, 0)
    K.cyl('Stem', .012, .01, .2, (0, 0, .2), K.STEM, 12)
    for k, (yaw, pitch, sc) in enumerate([(0, 30, 1.3), (2.1, 35, 1.15), (4.2, 32, 1.2), (1.0, 10, .95)]):
        K.leaf_at('Leaf%d' % k, (0, 0, .34 + k * .02), yaw, math.radians(pitch), sc, K.LEAF_MESHES[k % 2])
    render('leaf', .75, (0, 0, .25))


def screen():
    start('screen')
    K.cyl('Foot', .16, .18, .04, (0, 0, 0), GOLD_D, 40)
    K.cyl('Pole', .035, .035, .3, (0, 0, .04), GOLD, 16)
    prism('Frame', [(-.22, .3), (.22, .3), (.22, .66), (-.22, .66)][::-1], .06, PAPER, .02)
    prism('Glass', [(-.19, .33), (.19, .33), (.19, .63), (-.19, .63)][::-1], .065, K.mat('Screen', '#9fe0a0', .3, 0, 1.2), .004)
    prism('Bud', star_pts(.07, .03, 7, 0, .5), .07, INK, .003)
    prism('Bar', [(-.12, .37), (.12, .37), (.12, .4), (-.12, .4)][::-1], .07, INK, .003)
    render('screen', 1.0, (0, 0, .33))


def target():
    start('target')
    for k, (r, m) in enumerate([(.3, CORAL), (.24, PAPER), (.17, CORAL), (.1, PAPER), (.045, CORAL)]):
        d = K.cyl('Ring%d' % k, r, r, .05 + k * .012, (0, 0, 0), m, 64)
        d.rotation_euler = (math.radians(90), 0, FACE); d.location = (0, 0, .34)
    K.box('Leg', (.04, .04, .32), (0, 0, 0), K.WOOD, .01).rotation_euler = (0, 0, FACE)
    render('target', 1.0, (0, 0, .3))


JOBS = {'gift': gift, 'trophy': trophy, 'coin': coin, 'star': star, 'up': up, 'calendar': calendar, 'contract': contract,
        'book': book, 'person': person, 'box': box, 'bag': bag, 'leaf': leaf, 'screen': screen, 'target': target}
for key, job in JOBS.items():
    if ONLY and key not in ONLY: continue
    job()
