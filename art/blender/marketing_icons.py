"""3D icons for the Research tab's Marketing branch (public/icons/3d/marketing-*.png).

Same camera, sun, AgX look and palette as the Research and Goals icons (research_icons.py, goal_icons.py), so the new
branch sits with the other three.  One icon per campaign (marketing.js), plus a sidewalk sign for the branch tab.
Run headless with bpy:
    python art/blender/marketing_icons.py OUT_DIR [name ...]
Then trim and shrink with scripts/trim-icons.py (each PNG ends up at most 160 px on its long side).
"""
import sys, os, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.getcwd()
ONLY = set(sys.argv[2:])
import goal_icons as G
G.OUT = OUT
import bpy
from mathutils import Matrix
import canopy_kit as K
FACE = G.FACE


def render(name, ortho, centre):
    G.render(name, ortho, centre, 'marketing-')


def front(o, x=0., z=0., out=0.):
    """Place a part built facing -Y at (x across, z up) on the camera-facing plane, `out` towards the camera."""
    o.rotation_euler = (o.rotation_euler[0], o.rotation_euler[1], FACE)
    o.location = (x * math.cos(FACE) + out * math.sin(FACE), x * math.sin(FACE) - out * math.cos(FACE), z)
    return o


def rect(x0, z0, x1, z1):
    return [(x0, z0), (x1, z0), (x1, z1), (x0, z1)][::-1]


def leaf_mark(name, x, z, out, size, m):
    """A flat seven-point leaf, the shop's mark."""
    return front(G.prism(name, G.star_pts(size, size * .4, 7, 0, 0), .02, m, .003), x, z, out)


def tab():
    """The branch tab: a walnut sidewalk sign (an A-frame seen from the front) with a green face, a lime leaf and a gold line."""
    G.start('tab')
    back = G.prism('Back', rect(-.2, 0, .2, .6), .03, K.WOOD_D, .012); back.rotation_euler = (math.radians(14), 0, 0); front(back, 0, 0, -.28); back.rotation_euler = (math.radians(14), 0, FACE)
    for k, x in enumerate((-.2, .2)):
        leg = K.box('Leg%d' % k, (.035, .035, .62), (0, 0, 0), K.WOOD, .008); leg.rotation_euler = (math.radians(-14), 0, 0); front(leg, x, 0, 0)
        leg.rotation_euler = (math.radians(-14), 0, FACE)
    board = G.prism('Board', rect(-.23, 0, .23, .6), .04, K.WOOD, .014); board.rotation_euler = (math.radians(-14), 0, 0); front(board, 0, 0, .02)
    face = G.prism('Face', rect(-.19, .05, .19, .55), .045, G.INK, .006); face.rotation_euler = (math.radians(-14), 0, 0); front(face, 0, 0, .023)
    leaf = G.prism('Leaf', G.star_pts(.11, .042, 7, 0, .37), .05, G.LIME, .004); leaf.rotation_euler = (math.radians(-14), 0, 0); front(leaf, 0, 0, .03)
    bar = G.prism('Bar', rect(-.13, .15, .13, .19), .05, G.GOLD, .004); bar.rotation_euler = (math.radians(-14), 0, 0); front(bar, 0, 0, .03)
    for o in (board, face, leaf, bar): o.rotation_euler = (math.radians(-14), 0, FACE)
    # Turned a little off the camera so its A-frame legs show, which sets it apart from the Billboard campaign.
    bpy.context.view_layer.update()
    for o in list(K.col.objects): o.matrix_world = Matrix.Rotation(math.radians(-32), 4, 'Z') @ o.matrix_world
    render('tab', .95, (0, 0, .3))


def flyers():
    """Flyers: three paper flyers fanned like cards, the front one with a coral header, a green leaf and two lines."""
    G.start('flyers')
    for k, (ang, m) in enumerate([(14, K.mat('Paper2', '#efe5cf', .7)), (-12, G.CORAL), (0, G.PAPER)]):
        sh = G.prism('Sheet%d' % k, rect(-.17, 0, .17, .46), .012, m, .004)
        sh.rotation_euler = (0, math.radians(ang), 0); front(sh, (k - 1.5) * .02 if k < 2 else 0, .04, k * .02 - .03); sh.rotation_euler = (0, math.radians(ang), FACE)
    front(G.prism('Head', rect(-.17, .36, .17, .46), .016, G.CORAL, .002), 0, .04, .012)
    front(G.prism('Leaf', G.star_pts(.08, .032, 7, 0, .22), .016, G.INK, .002), 0, .04, .014)
    for j, (z, w) in enumerate([(.08, .22), (.04, .14)]):
        front(G.prism('Line%d' % j, rect(-w / 2, z, w / 2, z + .018), .016, G.INK, .001), 0, .04, .014)
    K.box('Clip', (.08, .03, .05), (0, 0, 0), G.GOLD, .008)
    bpy.context.view_layer.update(); clip = list(K.col.objects)[-1]; front(clip, 0, .48, .012)
    render('flyers', .95, (0, 0, .3))


def social():
    """Social post: a phone on its edge with a lime screen and a coral heart popping out of it."""
    G.start('social')
    body = G.prism('Phone', rect(-.15, 0, .15, .56), .05, K.DARK, .03)
    front(body, 0, 0, 0)
    screen = G.prism('Screen', rect(-.125, .05, .125, .51), .052, K.mat('Glow', '#9fe0a0', .3, 0, 1.0), .006); front(screen, 0, 0, .002)
    for k, (z, w) in enumerate([(.16, .17), (.11, .12)]):
        front(G.prism('Row%d' % k, rect(-.09, z, -.09 + w, z + .025), .056, G.INK, .002), 0, 0, .004)
    pic = G.prism('Pic', rect(-.09, .22, .09, .38), .056, G.PAPER, .003); front(pic, 0, 0, .004)
    leaf_mark('Leaf', 0, .30, .036, .05, G.LIME_D)
    # The heart: two circles and a point, in a bubble off the top right corner.
    bub = K.cyl('Bubble', .12, .12, .04, (0, 0, 0), G.PAPER, 48); bub.rotation_euler = (math.radians(90), 0, 0); front(bub, .16, .55, .09)
    heart = [(0, -.065)] + [(.035 + .035 * math.cos(a), .02 + .035 * math.sin(a)) for a in [math.radians(d) for d in range(-40, 181, 20)]] + \
            [(-.035 + .035 * math.cos(a), .02 + .035 * math.sin(a)) for a in [math.radians(d) for d in range(0, 221, 20)]]
    h = G.prism('Heart', heart[::-1], .05, G.CORAL, .006); front(h, .16, .545, .12)
    render('social', 1.05, (0, 0, .34))


def happy():
    """Happy hour: a coral price tag on a gold ring with a big paper % on it."""
    G.start('happy')
    pts = [(-.2, -.24), (.2, -.24), (.2, .16), (0, .32), (-.2, .16)][::-1]
    tag = G.prism('Tag', pts, .05, G.CORAL, .02); front(tag, 0, .3, 0)
    hole = K.ring('Hole', .035, .022, .056, (0, 0, 0), G.GOLD, 24); hole.rotation_euler = (math.radians(90), 0, 0); front(hole, 0, .52, 0)
    K.tube('Ring', [(0, 0, .55 + .09 * math.sin(math.radians(a))) if False else (.09 * math.cos(math.radians(a)) * math.cos(FACE), .09 * math.cos(math.radians(a)) * math.sin(FACE), .6 + .09 * math.sin(math.radians(a))) for a in range(-90, 271, 15)], .012, G.GOLD)
    pct = G.label('Pct', '%', .3, (0, 0, 0), G.PAPER, .025)
    pct.rotation_euler = (math.radians(90), 0, FACE); pct.location = (.03 * math.sin(FACE), -.03 * math.cos(FACE), .26)
    render('happy', 1.0, (0, 0, .33))


def billboard():
    """Billboard: a green board with a lime leaf on two walnut legs, gold lamps leaning over the top."""
    G.start('billboard')
    for k, x in enumerate((-.17, .17)):
        front(K.box('Leg%d' % k, (.04, .04, .32), (0, 0, 0), K.WOOD, .008), x, 0, -.02)
    front(G.prism('Frame', rect(-.32, .26, .32, .62), .05, G.PAPER, .015), 0, 0, 0)
    front(G.prism('Board', rect(-.29, .29, .29, .59), .055, G.INK, .006), 0, 0, 0)
    leaf_mark('Leaf', -.15, .44, .03, .09, G.LIME)
    for k, (z, w) in enumerate([(.47, .26), (.4, .18)]):
        front(G.prism('Copy%d' % k, rect(-.03, z, -.03 + w, z + .035), .06, G.GOLD, .003), 0, 0, .002)
    for k, x in enumerate((-.18, .18)):
        arm = K.box('Arm%d' % k, (.016, .016, .1), (0, 0, 0), K.DARK, .003); arm.rotation_euler = (math.radians(-55), 0, 0); front(arm, x, .62, .02)
        arm.rotation_euler = (math.radians(-55), 0, FACE)
        lamp = K.cyl('Lamp%d' % k, .03, .045, .045, (0, 0, 0), G.GOLD, 24); lamp.rotation_euler = (math.radians(-120), 0, FACE); front(lamp, x, .67, .09); lamp.rotation_euler = (math.radians(-120), 0, FACE)
    render('billboard', 1.0, (0, 0, .33))


JOBS = {'tab': tab, 'flyers': flyers, 'social': social, 'happy': happy, 'billboard': billboard}
for key, job in JOBS.items():
    if ONLY and key not in ONLY: continue
    job()
