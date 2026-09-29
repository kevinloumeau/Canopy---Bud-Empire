import test from 'node:test';
import assert from 'node:assert/strict';
import {cameraPanBounds} from '../src/camera-pan.js';

test('fitted overview retains its existing pan allowance',()=>{
  assert.deepEqual(cameraPanBounds({width:390,height:844,sceneWidth:35,sceneHeight:29,unit:10}),{minX:-624,maxX:624,minY:-1350.4,maxY:1350.4});
});

test('maximum zoom expands both axes past the old viewport-only limit',()=>{
  const bounds=cameraPanBounds({width:390,height:844,sceneWidth:35,sceneHeight:29,unit:80});
  assert.ok(bounds.maxX>390*1.6);
  assert.ok(bounds.maxY>844*1.6);
});

test('every projected scene corner can reach the clear center at all supported zooms',()=>{
  const scenes=[{w:35,h:29,cx:-.8,cy:-4.6},{w:44.3,h:24.9,cx:-1.9,cy:-2.2},{w:43.3,h:30.7,cx:-.85,cy:-4.7},{w:44.9,h:32.7,cx:-.05,cy:-5.45},{w:43.3,h:23.6,cx:-.85,cy:-1.15},{w:43.3,h:23.7,cx:-.85,cy:-1.2}];
  for(const [width,height] of [[320,640],[390,844],[834,1210],[1440,900]])for(const scene of scenes)for(const zoom of [.65,1,2,8]){
    const fitted=Math.min((width-40)/scene.w,(height-180)/scene.h),unit=fitted*zoom;
    const homeX=scene.cx*fitted*(1-zoom),homeY=scene.cy*fitted*(1-zoom);
    const bounds=cameraPanBounds({width,height,sceneWidth:scene.w,sceneHeight:scene.h,unit,homeX,homeY});
    for(const x of [-1,1])for(const y of [-1,1]){
      const panX=homeX-x*scene.w*unit/2,panY=homeY-y*scene.h*unit/2;
      assert.ok(panX>=bounds.minX&&panX<=bounds.maxX);
      assert.ok(panY>=bounds.minY&&panY<=bounds.maxY);
    }
  }
});
