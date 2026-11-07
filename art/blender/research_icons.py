"""3D icons for the Research tab (public/icons/3d/research-*.png).

Same camera, sun, AgX look and palette as the Goals icons (goal_icons.py, which this imports), so the two tabs match
the Stations, Menu and Empire renders.  One icon per research card, plus a drone for the Delivery branch tab.
Run headless with bpy:
    python art/blender/research_icons.py OUT_DIR [name ...]
Then trim and shrink with scripts/trim-icons.py (each PNG ends up at most 160 px on its long side).
"""
import sys, os, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.getcwd()
ONLY = set(sys.argv[2:])
import goal_icons as G
G.OUT = OUT
import bpy
from mathutils import Vector, Matrix
import canopy_kit as K
FACE = G.FACE


def render(name, ortho, centre):
    G.render(name, ortho, centre, 'research-')


def turn(deg):
    """Turn everything built so far about the vertical axis."""
    bpy.context.view_layer.update()
    for o in list(K.col.objects): o.matrix_world = Matrix.Rotation(math.radians(deg), 4, 'Z') @ o.matrix_world


def sphere(name, r, loc, m, scale=(1, 1, 1), seg=32):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=r, location=loc, segments=seg, ring_count=seg // 2)
    o = bpy.context.active_object; bpy.ops.object.shade_smooth(); o.data.materials.append(m); o.scale = scale
    bpy.context.scene.collection.objects.unlink(o); K.col.objects.link(o)
    return o


def front(o, x=0., z=0., out=0.):
    """Place a part built facing -Y at (x across, z up) on the camera-facing plane, `out` towards the camera."""
    o.rotation_euler = (o.rotation_euler[0], o.rotation_euler[1], FACE)
    o.location = (x * math.cos(FACE) + out * math.sin(FACE), x * math.sin(FACE) - out * math.cos(FACE), z)
    return o


def bud(name, loc, sc=1.):
    return K.inst(name, K.NUG_MESH, loc, (0, 0, K.rnd.uniform(0, 6)), sc)


# ---- Grow ----
def storage():
    """Storage: a walnut shelf of stacked kraft crates."""
    G.start('storage')
    for z in (0, .26):
        K.box('Shelf%d' % (z > 0), (.62, .34, .03), (0, 0, z), K.WOOD, .008)
    for x in (-.29, .29):
        for y in (-.15, .15):
            K.box('Post', (.035, .035, .52), (x, y, 0), K.WOOD_D, .006)
    for k, (x, z, w, m) in enumerate([(-.14, .03, .24, K.KRAFT), (.14, .03, .24, G.LIME), (-.12, .29, .22, G.CORAL), (.13, .29, .2, K.KRAFT)]):
        K.box('Crate%d' % k, (w, .26, .17), (x, 0, z), m, .012)
        K.box('Lip%d' % k, (w * .5, .01, .03), (x, -.131, z + .11), G.INK, .003)
    K.box('Top', (.22, .22, .13), (0, 0, .55), K.KRAFT, .012)
    K.box('Tape', (.04, .225, .005), (0, 0, .68), K.mat('Tape', '#d8b07a', .35), .002)
    render('storage', 1.05, (0, 0, .33))


def boost():
    """Whole-store boost: a gold lightning bolt standing on a green base."""
    G.start('boost')
    pts = [(.06, .66), (-.2, .3), (-.02, .3), (-.1, -.02), (.2, .38), (.02, .38), (.12, .66)]
    G.prism('Bolt', pts[::-1], .13, G.GOLD, .025, (0, 0, .06))
    G.prism('Shine', [(.07, .6), (-.1, .36), (-.04, .36), (.08, .6)][::-1], .135, K.mat('GoldHi', '#f6d77a', .3, .4), .01, (0, 0, .06))
    K.cyl('Base', .24, .26, .06, (0, 0, 0), G.INK, 48)
    render('boost', 1.0, (0, 0, .32))


def grow():
    """Grow lights: a glowing lamp bar over a leafy plant."""
    G.start('grow')
    K.pot('P', 0, 0, 0)
    K.cyl('Stem', .012, .01, .16, (0, 0, .2), K.STEM, 12)
    for k, (yaw, pitch, sc) in enumerate([(0, 28, 1.2), (2.1, 32, 1.1), (4.2, 30, 1.15), (1.0, 12, .9)]):
        K.leaf_at('Leaf%d' % k, (0, 0, .32 + k * .02), yaw, math.radians(pitch), sc, K.LEAF_MESHES[k % 2])
    K.cyl('Hood', .17, .045, .1, (0, 0, .68), G.GOLD, 48)
    K.ring('HoodRim', .175, .155, .02, (0, 0, .675), G.GOLD_D, 48)
    sphere('Bulb', .065, (0, 0, .67), K.mat('LampGlow', '#ffe3a0', .4, 0, 8))
    K.cyl('Cap', .045, .045, .04, (0, 0, .78), K.DARK, 24)
    K.cyl('Cord', .008, .008, .1, (0, 0, .82), K.DARK, 8)
    render('grow', 1.0, (0, 0, .44))


def curing():
    """Curing equipment: a glass curing jar of buds with a gold lid and a little dial."""
    G.start('curing')
    K.cyl('Jar', .17, .17, .36, (0, 0, 0), K.glass('JarGlass', '#e4f2ea'), 48)
    for k in range(9):
        a = k * 2.4; r = .09 if k < 6 else .03
        bud('Bud%d' % k, (r * math.cos(a), r * math.sin(a), .02 + (k // 3) * .085), 1.25)
    K.cyl('Neck', .14, .14, .03, (0, 0, .36), K.glass('NeckGlass', '#e4f2ea'), 48)
    K.cyl('Lid', .155, .155, .07, (0, 0, .38), G.GOLD, 48)
    K.ring('LidRim', .158, .14, .072, (0, 0, .38), G.GOLD_D, 48)
    lab = K.box('Label', (.16, .01, .1), (0, 0, 0), G.INK, .004); front(lab, 0, .13, .168)
    leaf = G.prism('Mark', G.star_pts(.035, .014, 7, 0, 0), .012, G.PAPER, .002); front(leaf, 0, .18, .176)
    render('curing', .95, (0, 0, .24))


def trend():
    """Trend scout: three bars rising with an arrow over them."""
    G.start('trend')
    for k, (h, m) in enumerate([(.16, G.LIME_D), (.28, G.LIME), (.42, G.LIME)]):
        b = K.box('Bar%d' % k, (.13, .13, h), (0, 0, 0), m, .015); front(b, -.18 + k * .18, .05)
    pts = [(-.3, .3), (-.06, .5), (.06, .4), (.22, .6)]
    path = [(x * math.cos(FACE), x * math.sin(FACE) - .1, z) for x, z in pts]
    K.tube('Line', [(p[0] - .1 * math.sin(FACE), p[1] - .1 * math.cos(FACE) + .1, p[2]) for p in path], .022, G.CORAL)
    head = G.prism('Head', [(-.07, -.05), (.07, -.05), (0, .08)][::-1], .05, G.CORAL, .01)
    head.rotation_euler = (0, math.radians(-50), FACE)
    head.location = (path[-1][0] - .1 * math.sin(FACE), path[-1][1] - .1 * math.cos(FACE) + .1, path[-1][2] + .01)
    K.cyl('Base', .3, .32, .05, (0, 0, 0), G.INK, 48)
    render('trend', 1.05, (0, 0, .3))


def breeding():
    """Breeding bench: two seedlings in a shared tray with a gold sparkle between them."""
    G.start('breeding')
    K.box('Tray', (.6, .26, .09), (0, 0, 0), K.TERRA, .015)
    K.box('Soil', (.56, .22, .02), (0, 0, .08), K.SOIL, .004)
    for k, x in enumerate((-.16, .16)):
        X, Y = x * math.cos(FACE), x * math.sin(FACE)
        K.tube('Stem%d' % k, [(X, Y, .09), (X, Y, .28)], .01, K.STEM)
        for j, yaw in enumerate((0, math.pi)):
            K.leaf_at('Leaf%d%d' % (k, j), (X, Y, .27), yaw + k + .4, math.radians(35), .95, K.LEAF_MESHES[(j + k) % 2])
    for o in list(K.col.objects)[:2]: o.rotation_euler = (0, 0, FACE)
    G.prism('Spark', G.star_pts(.09, .03, 4, 0, .44), .04, G.GOLD, .006)
    G.prism('Spark2', G.star_pts(.045, .015, 4, .1, .56), .03, G.GOLD, .004)
    render('breeding', 1.0, (0, 0, .28))


def offline():
    """Back-room safe: a green steel safe with a gold dial and handle."""
    G.start('offline')
    safe = K.mat('Safe', '#2f6f50', .4, .15)
    K.box('Body', (.48, .44, .5), (0, 0, .03), safe, .03)
    door = G.prism('Door', [(-.19, .07), (.19, .07), (.19, .49), (-.19, .49)][::-1], .03, K.mat('SafeDoor', '#3c8460', .38, .15), .015)
    front(door, 0, 0, .225)
    dial = K.cyl('Dial', .075, .075, .03, (0, 0, 0), G.GOLD, 40); dial.rotation_euler = (math.radians(90), 0, 0); front(dial, -.03, .28, .265)
    knob = K.cyl('Knob', .03, .03, .03, (0, 0, 0), G.GOLD_D, 24); knob.rotation_euler = (math.radians(90), 0, 0); front(knob, -.03, .28, .29)
    for k in range(8):
        a = k * math.pi / 4
        t = K.box('Tick%d' % k, (.012, .01, .02), (0, 0, 0), G.PAPER, 0); front(t, -.03 + .1 * math.cos(a), .27 + .1 * math.sin(a), .245)
    h = K.box('Handle', (.03, .03, .14), (0, 0, 0), G.GOLD, .01); front(h, .13, .21, .26)
    for x in (-.18, .18):
        K.cyl('Foot', .03, .03, .03, (x * math.cos(FACE), x * math.sin(FACE), 0), K.DARK, 16)
    render('offline', 1.0, (0, 0, .28))


# ---- Retail ----
def basket():
    """Bigger baskets: a coral shopping basket heaped with goods."""
    G.start('basket')
    K.cyl('Basket', .2, .26, .24, (0, 0, 0), G.CORAL, 4).rotation_euler = (0, 0, math.pi / 4)
    rim = K.ring('Rim', .275, .245, .03, (0, 0, .23), G.CORAL_D, 4); rim.rotation_euler = (0, 0, math.pi / 4)
    for k, (x, y, m, s) in enumerate([(-.08, .05, K.KRAFT, (.14, .12, .18)), (.08, -.04, G.LIME, (.12, .12, .16)), (.06, .08, G.PAPER, (.1, .1, .2))]):
        K.box('Good%d' % k, s, (x, y, .14), m, .012)
    bud('Bud', (-.05, -.08, .22), 1.6)
    for s in (-1, 1):
        K.tube('Handle%d' % s, [(s * .19, -.02, .24), (s * .12, 0, .42), (0, 0, .46)][::s] if False else [(s * .19 * math.cos(FACE), s * .19 * math.sin(FACE), .24), (s * .1 * math.cos(FACE), s * .1 * math.sin(FACE), .44), (0, 0, .46)], .016, G.CORAL_D)
    render('basket', 1.0, (0, 0, .24))


def traffic():
    """Floor flow: two gold queue posts with a velvet rope between them."""
    G.start('traffic')
    for k, x in enumerate((-.22, .22)):
        X, Y = x * math.cos(FACE), x * math.sin(FACE)
        K.cyl('Foot%d' % k, .09, .1, .03, (X, Y, 0), G.GOLD_D, 32)
        K.cyl('Post%d' % k, .022, .022, .44, (X, Y, .03), G.GOLD, 16)
        sphere('Cap%d' % k, .04, (X, Y, .49), G.GOLD)
    rope = [(t * .44 - .22, .38 - .1 * math.sin(math.pi * t)) for t in (i / 10 for i in range(11))]
    K.tube('Rope', [(x * math.cos(FACE), x * math.sin(FACE), z) for x, z in rope], .018, K.mat('Velvet', '#b8323f', .6))
    G.prism('Arrow', [(-.12, -.04), (.04, -.04), (.04, -.09), (.14, 0), (.04, .09), (.04, .04), (-.12, .04)][::-1], .03, G.LIME, .008, (0, 0, .15))
    render('traffic', 1.0, (0, 0, .25))


def display():
    """Display cases: a lit glass case on a walnut plinth with a bud inside."""
    G.start('display')
    K.box('Plinth', (.44, .34, .2), (0, 0, 0), K.WOOD, .015)
    K.box('Trim', (.46, .36, .025), (0, 0, .2), G.GOLD, .006)
    K.box('Case', (.4, .3, .3), (0, 0, .225), K.glass('CaseGlass', '#e8f4ee'), .01)
    K.box('Cap', (.42, .32, .03), (0, 0, .525), G.GOLD_D, .008)
    K.box('Light', (.34, .24, .006), (0, 0, .518), K.mat('CaseGlow', '#fff1cf', .4, 0, 5), .002)
    K.cyl('Stand', .07, .08, .04, (0, 0, .225), G.PAPER, 32)
    bud('Bud', (0, 0, .265), 2.2)
    render('display', 1.0, (0, 0, .28))


def loyalty():
    """Loyalty cards: two cards fanned on a stand, the front one stamped with a leaf."""
    G.start('loyalty')
    back = G.prism('Back', [(-.26, 0), (.26, 0), (.26, .32), (-.26, .32)][::-1], .03, G.GOLD, .02)
    back.rotation_euler = (0, math.radians(-12), FACE); back.location = (-.03, .05, .2)
    card = G.prism('Card', [(-.26, 0), (.26, 0), (.26, .32), (-.26, .32)][::-1], .03, G.CORAL, .02)
    front(card, 0, .12, .04)
    stripe = G.prism('Stripe', [(-.26, .22), (.26, .22), (.26, .27), (-.26, .27)][::-1], .035, G.INK, .004); front(stripe, 0, .12, .04)
    for k in range(4):
        dot = K.cyl('Stamp%d' % k, .03, .03, .02, (0, 0, 0), G.PAPER if k < 3 else G.LIME, 24)
        dot.rotation_euler = (math.radians(90), 0, 0); front(dot, -.17 + k * .095, .2, .06)
    K.box('Stand', (.5, .2, .1), (0, 0, 0), K.WOOD, .015).rotation_euler = (0, 0, FACE)
    render('loyalty', 1.0, (0, 0, .25))


def service():
    """Express lanes: a gold stopwatch."""
    G.start('service')
    body = K.cyl('Body', .25, .25, .1, (0, 0, 0), G.GOLD, 64); body.rotation_euler = (math.radians(90), 0, 0); front(body, 0, .3, -.05)
    face = K.cyl('Face', .21, .21, .02, (0, 0, 0), G.PAPER, 64); face.rotation_euler = (math.radians(90), 0, 0); front(face, 0, .3, .045)
    for k in range(12):
        a = k * math.pi / 6
        t = K.box('Tick%d' % k, (.014, .01, .04 if k % 3 == 0 else .022), (0, 0, 0), G.INK, 0)
        t.rotation_euler = (0, a, 0); front(t, .17 * math.sin(a), .3 + .17 * math.cos(a) - (.02 if k % 3 == 0 else .011), .068)
        t.rotation_euler = (0, a, FACE)
    sweep = G.prism('Sweep', [(0, 0), (.0, .17), (.12, .12)][::-1], .012, K.mat('Sweep', '#8fcb4a', .5), 0); front(sweep, 0, .3, .068)
    hand = K.box('Hand', (.016, .01, .16), (0, 0, 0), G.CORAL, .003); hand.rotation_euler = (0, math.radians(40), FACE); front(hand, 0, .3, .078); hand.rotation_euler = (0, math.radians(40), FACE)
    K.cyl('Crown', .045, .045, .05, (0, 0, .55), G.GOLD_D, 24)
    K.cyl('Button', .028, .028, .04, (0, 0, .6), G.GOLD, 24)
    for s in (-1, 1):
        b = K.cyl('Side%d' % s, .022, .022, .05, (0, 0, 0), G.GOLD_D, 16); b.rotation_euler = (0, math.radians(s * 40), FACE)
        front(b, s * .18, .5, -.0); b.rotation_euler = (0, math.radians(s * 40), FACE)
    render('service', 1.0, (0, 0, .32))


# ---- Delivery ----
def web():
    """Web marketing: a coral megaphone calling out to the right, with lime sound rings."""
    G.start('web')
    K.cyl('Horn', .07, .2, .34, (0, 0, 0), G.CORAL, 48)
    K.ring('Bell', .21, .18, .03, (0, 0, .33), G.PAPER, 48)
    K.cyl('Inner', .18, .18, .005, (0, 0, .32), G.CORAL_D, 48)
    K.cyl('Back', .075, .06, .08, (0, 0, -.08), G.INK, 32)
    grip = K.box('Grip', (.05, .06, .16), (-.07, 0, -.04), G.INK, .015); grip.rotation_euler = (0, math.radians(25), 0)
    for k in range(3):
        K.ring('Wave%d' % k, .13 + k * .06, .11 + k * .06, .022, (0, 0, .42 + k * .07), G.LIME, 48)
    # horn axis (Z) points across to the right and a little up; the grip hangs below
    bpy.context.view_layer.update()
    aim = Matrix.Translation((0, 0, .3)) @ Matrix.Rotation(FACE, 4, 'Z') @ Matrix.Rotation(math.radians(72), 4, 'Y') @ Matrix.Translation((0, 0, -.2))
    for o in list(K.col.objects): o.matrix_world = aim @ o.matrix_world
    render('web', 1.1, (0, 0, .32))


def premium():
    """Premium bags: a deep green gift bag with a gold band and ribbon handles."""
    G.start('premium')
    K.box('Bag', (.4, .24, .44), (0, 0, 0), G.INK, .012)
    K.box('Band', (.405, .245, .1), (0, 0, .16), G.GOLD, .006)
    K.box('Leaf', (.06, .01, .06), (0, -.124, .19), G.PAPER, .01).rotation_euler = (0, math.radians(45), 0)
    G.prism('Shine', G.star_pts(.05, .018, 4, 0, 0), .02, K.mat('GoldHi', '#f6d77a', .3, .4), .004).location = (.0, -.13, .34)
    for x in (-.08, .08):
        h = K.ring('Handle%d' % (x > 0), .075, .06, .02, (0, 0, 0), G.GOLD, 24)
        h.rotation_euler = (math.radians(90), 0, 0); h.location = (0, x * 1.1, .43)
    for k, (x, tilt) in enumerate([(-.06, -14), (.07, 12)]):
        t = G.prism('Tissue%d' % k, [(-.1, 0), (.1, 0), (.07, .14), (0, .17), (-.08, .13)][::-1], .012, G.CORAL if k else K.mat('TissueHi', '#f08a74', .6), .004)
        t.rotation_euler = (0, math.radians(tilt), 0); t.location = (x, (k - .5) * .06, .4)
    turn(20)
    render('premium', 1.0, (0, 0, .3))


def drone_at(tag, cx, cy, cz, sc=1.):
    """A quadcopter: green body, four arms with gold rotors."""
    body = K.mat('DroneBody', '#f3ead6', .45)
    K.box(tag + 'Body', (.2 * sc, .2 * sc, .08 * sc), (cx, cy, cz), body, .03 * sc)
    K.box(tag + 'Top', (.12 * sc, .12 * sc, .03 * sc), (cx, cy, cz + .08 * sc), G.INK, .012 * sc)
    eye = K.box(tag + 'Eye', (.06 * sc, .01 * sc, .025 * sc), (0, 0, 0), K.mat('Eye', '#9fe0a0', .3, 0, 2), .006 * sc)
    eye.rotation_euler = (0, 0, FACE); eye.location = (cx + .1 * sc * math.sin(FACE), cy - .1 * sc * math.cos(FACE), cz + .025 * sc)
    for k in range(4):
        a = math.pi / 4 + k * math.pi / 2
        ex, ey = cx + .2 * sc * math.cos(a), cy + .2 * sc * math.sin(a)
        K.tube(tag + 'Arm%d' % k, [(cx, cy, cz + .05 * sc), (ex, ey, cz + .07 * sc)], .014 * sc, G.INK)
        K.cyl(tag + 'Hub%d' % k, .025 * sc, .025 * sc, .04 * sc, (ex, ey, cz + .05 * sc), K.DARK, 16)
        K.cyl(tag + 'Rotor%d' % k, .1 * sc, .1 * sc, .008 * sc, (ex, ey, cz + .09 * sc), K.mat('Rotor', '#e6b84f', .35, .3), 40)
    for s in (-1, 1):
        K.tube(tag + 'Skid%d' % s, [(cx + s * .07 * sc, cy - .08 * sc, cz - .05 * sc), (cx + s * .07 * sc, cy + .08 * sc, cz - .05 * sc)], .01 * sc, K.DARK)


def fleet():
    """Drone fleet: a hovering delivery drone (also the Delivery branch tab)."""
    G.start('fleet')
    drone_at('D', 0, 0, .3)
    K.cyl('Shadow', .2, .2, .01, (0, 0, 0), K.mat('Pad', '#2d6a4c', .6), 48)
    K.ring('PadRing', .2, .17, .012, (0, 0, .001), G.GOLD, 48)
    render('fleet', 1.0, (0, 0, .2))


def cargo():
    """Cargo bays: a drone lifting a kraft parcel."""
    G.start('cargo')
    drone_at('D', 0, 0, .56, .9)
    K.box('Parcel', (.24, .2, .18), (0, 0, .17), K.KRAFT, .012)
    K.box('Tape', (.05, .205, .005), (0, 0, .348), K.mat('Tape', '#d8b07a', .35), .002)
    lab = K.box('Label', (.1, .01, .06), (0, 0, 0), G.INK, .004); front(lab, .04, .22, .102)
    for s in (-1, 1):
        K.tube('Line%d' % s, [(s * .08, 0, .35), (s * .04, 0, .52)], .006, K.DARK)
    render('cargo', 1.05, (0, 0, .36))


JOBS = {'storage': storage, 'boost': boost, 'grow': grow, 'curing': curing, 'trend': trend, 'breeding': breeding, 'offline': offline,
        'basket': basket, 'traffic': traffic, 'display': display, 'loyalty': loyalty, 'service': service,
        'web': web, 'premium': premium, 'fleet': fleet, 'cargo': cargo}
for key, job in JOBS.items():
    if ONLY and key not in ONLY: continue
    job()
