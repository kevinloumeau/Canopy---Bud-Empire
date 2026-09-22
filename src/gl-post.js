// WebGL2 post-processing compositor. The 2D painter keeps drawing the scene into its own canvas; this takes that
// finished frame as a texture each render and composites it on the GPU: a bright-pass bloom (threshold, two
// separable gaussian blurs at half resolution, screen-blended back), a warm/cool grade with a gentle saturation
// lift, a vignette and animated film grain. Callers hide the overlay and fall back to the plain canvas whenever
// createGlPost returns null or apply() returns false (no WebGL2, or the context was lost).
const VS = `#version 300 es
void main(){vec2 p=vec2(float(gl_VertexID<<1&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}`;

const BRIGHT_FS = `#version 300 es
precision mediump float;uniform sampler2D u_src;uniform vec2 u_res;uniform float u_threshold;out vec4 outColor;
void main(){vec3 c=texture(u_src,gl_FragCoord.xy/u_res).rgb;float l=dot(c,vec3(.299,.587,.114));
outColor=vec4(c*smoothstep(u_threshold,u_threshold+.28,l),1.);}`;

const BLUR_FS = `#version 300 es
precision mediump float;uniform sampler2D u_src;uniform vec2 u_res;uniform vec2 u_dir;out vec4 outColor;
void main(){vec2 uv=gl_FragCoord.xy/u_res,px=u_dir/u_res;
vec3 c=texture(u_src,uv).rgb*.227;
c+=(texture(u_src,uv+px*1.385).rgb+texture(u_src,uv-px*1.385).rgb)*.316;
c+=(texture(u_src,uv+px*3.231).rgb+texture(u_src,uv-px*3.231).rgb)*.07;
outColor=vec4(c,1.);}`;

const COMPOSITE_FS = `#version 300 es
precision mediump float;uniform sampler2D u_src;uniform sampler2D u_bloom;uniform vec2 u_res;
uniform float u_time;uniform float u_bloomAmount;uniform float u_grain;out vec4 outColor;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
 vec2 uv=gl_FragCoord.xy/u_res;
 vec3 base=texture(u_src,uv).rgb;
 vec3 bloom=texture(u_bloom,uv).rgb*u_bloomAmount*(1.-.6*dot(base,vec3(.299,.587,.114)));
 vec3 c=1.-(1.-base)*(1.-bloom);
 float l=dot(c,vec3(.299,.587,.114));
 c=mix(vec3(l),c,1.07);
 c+=(l-.5)*vec3(.045,.012,-.05);
 vec2 v=uv-.5;c*=1.-dot(v,v)*.45;
 c+=(hash(gl_FragCoord.xy+fract(u_time)*61.7)-.5)*u_grain;
 outColor=vec4(c,1.);
}`;

export function createGlPost(glCanvas){
  const gl=glCanvas.getContext('webgl2',{alpha:false,antialias:false,depth:false,stencil:false});
  if(!gl)return null;
  let lost=false;
  glCanvas.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;});
  function shader(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;}
  function program(fs){const p=gl.createProgram();gl.attachShader(p,shader(gl.VERTEX_SHADER,VS));gl.attachShader(p,shader(gl.FRAGMENT_SHADER,fs));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));const u={};const n=gl.getProgramParameter(p,gl.ACTIVE_UNIFORMS);for(let i=0;i<n;i++){const info=gl.getActiveUniform(p,i);u[info.name]=gl.getUniformLocation(p,info.name);}return {p,u};}
  let bright,blur,composite;
  try{bright=program(BRIGHT_FS);blur=program(BLUR_FS);composite=program(COMPOSITE_FS);}catch(e){return null;}
  function makeTex(){const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);return t;}
  const srcTex=makeTex(),halfA={tex:makeTex(),fbo:gl.createFramebuffer()},halfB={tex:makeTex(),fbo:gl.createFramebuffer()};
  let w=0,h=0,hw=0,hh=0;
  function target(t,tw,th){gl.bindFramebuffer(gl.FRAMEBUFFER,t.fbo);gl.viewport(0,0,tw,th);}
  function size(sw,sh){
    w=sw;h=sh;hw=Math.max(1,sw>>1);hh=Math.max(1,sh>>1);
    glCanvas.width=sw;glCanvas.height=sh;
    for(const t of [halfA,halfB]){gl.bindTexture(gl.TEXTURE_2D,t.tex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,hw,hh,0,gl.RGBA,gl.UNSIGNED_BYTE,null);gl.bindFramebuffer(gl.FRAMEBUFFER,t.fbo);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,t.tex,0);}
  }
  return {
    apply(source,timeMs,night,animate){
      if(lost)return false;
      if(source.width!==w||source.height!==h)size(source.width,source.height);
      if(!w)return false;
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
      gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,srcTex);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,source);
      // Bright pass into half resolution, then two separable blurs ping-ponged between the half buffers.
      target(halfA,hw,hh);gl.useProgram(bright.p);gl.uniform1i(bright.u.u_src,0);gl.uniform2f(bright.u.u_res,hw,hh);gl.uniform1f(bright.u.u_threshold,night>0?.7:.62);gl.drawArrays(gl.TRIANGLES,0,3);
      gl.useProgram(blur.p);gl.uniform1i(blur.u.u_src,0);gl.uniform2f(blur.u.u_res,hw,hh);
      for(let i=0;i<3;i++){
        const r=1.5+i*1.6;
        gl.bindTexture(gl.TEXTURE_2D,halfA.tex);target(halfB,hw,hh);gl.uniform2f(blur.u.u_dir,r,0);gl.drawArrays(gl.TRIANGLES,0,3);
        gl.bindTexture(gl.TEXTURE_2D,halfB.tex);target(halfA,hw,hh);gl.uniform2f(blur.u.u_dir,0,r);gl.drawArrays(gl.TRIANGLES,0,3);
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(0,0,w,h);
      gl.useProgram(composite.p);
      gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,srcTex);gl.uniform1i(composite.u.u_src,0);
      gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,halfA.tex);gl.uniform1i(composite.u.u_bloom,1);
      gl.uniform2f(composite.u.u_res,w,h);
      gl.uniform1f(composite.u.u_time,animate?timeMs*.001:0);
      gl.uniform1f(composite.u.u_bloomAmount,.45+night*.15);
      gl.uniform1f(composite.u.u_grain,.03);
      gl.drawArrays(gl.TRIANGLES,0,3);
      return true;
    }
  };
}
