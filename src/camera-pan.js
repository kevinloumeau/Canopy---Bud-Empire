// Keep the overview's existing overscroll, but let enlarged scene edges reach the viewport center.
// `unit` is the current, zoomed projection scale; home offsets match the fitted-center zoom buttons.
export function cameraPanBounds({width,height,sceneWidth,sceneHeight,unit,homeX=0,homeY=0}){
  const reachX=Math.max(width*1.6,sceneWidth*unit/2+width/2);
  const reachY=Math.max(height*1.6,sceneHeight*unit/2+height/2);
  return {minX:homeX-reachX,maxX:homeX+reachX,minY:homeY-reachY,maxY:homeY+reachY};
}
