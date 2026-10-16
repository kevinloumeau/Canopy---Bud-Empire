from PIL import Image,ImageDraw
from pathlib import Path
import math
out=Path(__file__).parent/'guides';out.mkdir(exist_ok=True)
S=190
def P(p):
 x,z,y=p;return (640+S*.8660254038*(x-z),650+S*.5*(x+z)-S*y)
def new():
 im=Image.new('RGBA',(1280,1280));return im,ImageDraw.Draw(im)
def poly(d,points,fill,outline=None):d.polygon([P(p) for p in points],fill=fill,outline=outline)
def line(d,points,fill,width):d.line([P(p) for p in points],fill=fill,width=width,joint='curve')
green=(37,80,52,255);gold=(185,148,66,255);oak=(202,166,112,255);glass=(175,212,192,125)
def box(d,x,z,y,dx,dz,dy,col):
 poly(d,[(x,z+dz,y),(x+dx,z+dz,y),(x+dx,z+dz,y+dy),(x,z+dz,y+dy)],col,green)
 poly(d,[(x+dx,z,y),(x+dx,z+dz,y),(x+dx,z+dz,y+dy),(x+dx,z,y+dy)],col,green)
 poly(d,[(x,z,y+dy),(x+dx,z,y+dy),(x+dx,z+dz,y+dy),(x,z+dz,y+dy)],col,green)
def ring(d,c,axis,r=.19):
 pts=[]
 for n in range(101):
  t=n*math.tau/100;a=r*math.cos(t);b=r*math.sin(t);x,z,y=c
  pts.append(P((x,z+a,y+b) if axis=='x' else (x+a,z,y+b) if axis=='z' else (x+a,z+b,y)))
 d.line(pts,fill=gold,width=12,joint='curve')
def pipe(d,pts):
 line(d,pts,green,75);line(d,pts,glass,68);line(d,pts,(236,251,243,210),6)
for name,direction in [('tube.run.grow','z'),('tube.run.pack','x')]:
 im,d=new();pts=[(0,.65,3),(0,.25,3)]
 pts +=[(0,.25-.25*math.sin(t),2.75+.25*math.cos(t)) for t in [i*math.pi/40 for i in range(21)]]
 pts +=[(0,0,.25)]
 pts +=[((.25*(1-math.cos(t)) if direction=='x' else 0),(.25*(1-math.cos(t)) if direction=='z' else 0),.25*(1-math.sin(t))) for t in [i*math.pi/40 for i in range(21)]]
 end=(.65,0,0) if direction=='x' else (0,.65,0);pts.append(end);pipe(d,pts)
 ring(d,pts[0],'z');ring(d,(0,0,1.5),'y',.22);ring(d,end,direction)
 im.save(out/(name+'.geometry.png'))
im,d=new();pts=[(0,0,1),(0,0,.25)]+[(.25*(1-math.cos(t)),0,.25*(1-math.sin(t))) for t in [i*math.pi/40 for i in range(21)]]+[(.65,0,0)]
pipe(d,pts);ring(d,pts[0],'y');ring(d,pts[-1],'x');im.save(out/'tube.elbow.geometry.png')
im,d=new();poly(d,[(0,-.27,.73),(0,.27,.73),(0,.27,1.27),(0,-.27,1.27)],green,gold);pipe(d,[(0,0,1),(.6,0,1)]);ring(d,(0,0,1),'x');ring(d,(.6,0,1),'x');im.save(out/'tube.stub.pickup.geometry.png')
im,d=new();pipe(d,[(0,0,1),(.35,0,1)]);ring(d,(0,0,1),'x',.25);ring(d,(.35,0,1),'x',.19);q=P((0,-.3,1.1));d.ellipse((q[0]-10,q[1]-10,q[0]+10,q[1]+10),fill=(96,230,88,255));im.save(out/'tube.port.geometry.png')
for name,length in [('belt.straight',1.2),('belt.end.in',.55),('belt.end.out',.55)]:
 im,d=new()
 for x in [.15,length-.15]:box(d,x,.18,0,.055,.055,.83,green)
 box(d,0,0,.75,length,.48,.12,(232,225,207,255));poly(d,[(0,0,.88),(length,0,.88),(length,.48,.88),(0,.48,.88)],(43,45,43,255))
 for z in [0,.48]:line(d,[(0,z,.92),(length,z,.92)],gold,5)
 if name=='belt.end.in':
  poly(d,[(.05,.02,1.4),(.5,.02,1.4),(.5,.46,1.4),(.05,.46,1.4)],gold,green)
  for z in [.02,.46]:poly(d,[(.05,z,1.4),(.5,z,1.4),(.35,.24,1.0)],gold,green)
  line(d,[(0,0,.85),(0,.48,.85)],gold,30)
 if name=='belt.end.out':
  line(d,[(length,0,.85),(length,.48,.85)],gold,30)
  poly(d,[(length,0,.86),(length,.48,.86),(length+.3,.48,.56),(length+.3,0,.56)],gold,green)
 im.save(out/(name+'.geometry.png'))
im,d=new()
for x,z in [(0,0),(1.2,2.5)]:box(d,x,z,0,.075,.075,2,green)
box(d,0,0,1.92,1.2,2.5,.08,oak)
for edge in [[(0,0,2),(0,2.5,2)],[(0,0,2),(1.2,0,2)]]:
 a,b=edge;poly(d,[a,b,(b[0],b[1],2.85),(a[0],a[1],2.85)],glass)
 line(d,[(a[0],a[1],2.88),(b[0],b[1],2.88)],gold,7)
 for x,z,y in edge:line(d,[(x,z,2),(x,z,2.88)],gold,8)
im.save(out/'shell.stairs.landing.geometry.png')
im,d=new();line(d,[(0,0,0),(0,0,3)],green,22)
for axis,y in [('x',2.65),('z',2.85)]:
 if axis=='x':box(d,-.6,-.035,y,1.2,.07,.15,green)
 else:box(d,-.035,-.6,y,.07,1.2,.15,green)
im.save(out/'street.signpost.geometry.png')
S=110
im,d=new();box(d,0,0,.35,4.5,1.8,2.15,(237,228,207,255))
poly(d,[(4.5,0,.4),(4.5,1.8,.4),(4.5,1.8,1.0),(4.5,0,1.0)],green)
poly(d,[(0,1.8,.4),(4.5,1.8,.4),(4.5,1.8,1.0),(0,1.8,1.0)],green)
poly(d,[(4.51,.15,1.25),(4.51,1.65,1.25),(4.51,1.65,2.25),(4.51,.15,2.25)],(66,86,78,255),gold)
poly(d,[(.35,1.81,1.1),(3.3,1.81,1.1),(3.3,1.81,2.15),(.35,1.81,2.15)],(75,74,65,255),gold)
poly(d,[(.3,1.8,2.2),(3.35,1.8,2.2),(3.35,2.5,1.95),(.3,2.5,1.95)],(141,166,130,255),green)
for x in [.8,3.6]:
 pts=[]
 for n in range(101):
  t=n*math.tau/100;pts.append(P((x+.36*math.cos(t),1.83,.36+.36*math.sin(t))))
 d.polygon(pts,fill=(45,45,43,255));ring(d,(x,1.84,.36),'z',.21)
for z in [.28,1.52]:ring(d,(4.52,z,.88),'x',.14)
im.save(out/'street.foodtruck.geometry.png')
print('Created ten structural geometry guides')
