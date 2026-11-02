/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Gc="attached",Cu="detached";const rn="srgb",mi="srgb-linear",so="linear",vn="srgb";const Hc="300 es";class Ks{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const ri=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Vc=1234567;const Jr=Math.PI/180,xr=180/Math.PI;function zi(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ri[s&255]+ri[s>>8&255]+ri[s>>16&255]+ri[s>>24&255]+"-"+ri[e&255]+ri[e>>8&255]+"-"+ri[e>>16&15|64]+ri[e>>24&255]+"-"+ri[t&63|128]+ri[t>>8&255]+"-"+ri[t>>16&255]+ri[t>>24&255]+ri[n&255]+ri[n>>8&255]+ri[n>>16&255]+ri[n>>24&255]).toLowerCase()}function Hn(s,e,t){return Math.max(e,Math.min(t,s))}function Ec(s,e){return(s%e+e)%e}function Pu(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Lu(s,e,t){return s!==e?(t-s)/(e-s):0}function Zr(s,e,t){return(1-t)*s+t*e}function Iu(s,e,t,n){return Zr(s,e,1-Math.exp(-t*n))}function Du(s,e=1){return e-Math.abs(Ec(s,e*2)-e)}function Fu(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Nu(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Uu(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Ou(s,e){return s+Math.random()*(e-s)}function Bu(s){return s*(.5-Math.random())}function ku(s){s!==void 0&&(Vc=s);let e=Vc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function zu(s){return s*Jr}function Gu(s){return s*xr}function Hu(s){return(s&s-1)===0&&s!==0}function Vu(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Wu(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Xu(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":s.set(o*u,c*h,c*d,o*l);break;case"YZY":s.set(c*d,o*u,c*h,o*l);break;case"ZXZ":s.set(c*h,c*d,o*u,o*l);break;case"XZX":s.set(o*u,c*g,c*f,o*l);break;case"YXY":s.set(c*f,o*u,c*g,o*l);break;case"ZYZ":s.set(c*g,c*f,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function ki(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function _n(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const ju={DEG2RAD:Jr,RAD2DEG:xr,generateUUID:zi,clamp:Hn,euclideanModulo:Ec,mapLinear:Pu,inverseLerp:Lu,lerp:Zr,damp:Iu,pingpong:Du,smoothstep:Fu,smootherstep:Nu,randInt:Uu,randFloat:Ou,randFloatSpread:Bu,seededRandom:ku,degToRad:zu,radToDeg:Gu,isPowerOfTwo:Hu,ceilPowerOfTwo:Vu,floorPowerOfTwo:Wu,setQuaternionFromProperEuler:Xu,normalize:_n,denormalize:ki};class We{constructor(e=0,t=0){We.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Hn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Vt{constructor(e,t,n,i,r,a,o,c,l){Vt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],x=i[1],y=i[4],b=i[7],L=i[2],w=i[5],C=i[8];return r[0]=a*_+o*x+c*L,r[3]=a*m+o*y+c*w,r[6]=a*p+o*b+c*C,r[1]=l*_+u*x+h*L,r[4]=l*m+u*y+h*w,r[7]=l*p+u*b+h*C,r[2]=d*_+f*x+g*L,r[5]=d*m+f*y+g*w,r[8]=d*p+f*b+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+i*r*l-i*a*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,d=o*c-u*r,f=l*r-a*c,g=t*h+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(i*l-u*n)*_,e[2]=(o*n-i*a)*_,e[3]=d*_,e[4]=(u*t-i*c)*_,e[5]=(i*r-o*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(po.makeScale(e,t)),this}rotate(e){return this.premultiply(po.makeRotation(-e)),this}translate(e,t){return this.premultiply(po.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const po=new Vt;function Ph(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function na(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function qu(){const s=na("canvas");return s.style.display="block",s}const Wc={};function Yr(s){s in Wc||(Wc[s]=!0,console.warn(s))}function Yu(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Ku(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Ju(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const cn={enabled:!0,workingColorSpace:mi,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===vn&&(s.r=us(s.r),s.g=us(s.g),s.b=us(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===vn&&(s.r=br(s.r),s.g=br(s.g),s.b=br(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===""?so:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function us(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function br(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Xc=[.64,.33,.3,.6,.15,.06],jc=[.2126,.7152,.0722],qc=[.3127,.329],Yc=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Kc=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);cn.define({[mi]:{primaries:Xc,whitePoint:qc,transfer:so,toXYZ:Yc,fromXYZ:Kc,luminanceCoefficients:jc,workingColorSpaceConfig:{unpackColorSpace:rn},outputColorSpaceConfig:{drawingBufferColorSpace:rn}},[rn]:{primaries:Xc,whitePoint:qc,transfer:vn,toXYZ:Yc,fromXYZ:Kc,luminanceCoefficients:jc,outputColorSpaceConfig:{drawingBufferColorSpace:rn}}});let Js;class Zu{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Js===void 0&&(Js=na("canvas")),Js.width=e.width,Js.height=e.height;const n=Js.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Js}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=na("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=us(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(us(t[n]/255)*255):t[n]=us(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Qu=0;class Lh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=zi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(mo(i[a].image)):r.push(mo(i[a]))}else r=mo(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function mo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Zu.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let $u=0;class Gn extends Ks{constructor(e=Gn.DEFAULT_IMAGE,t=Gn.DEFAULT_MAPPING,n=1001,i=1001,r=1006,a=1008,o=1023,c=1009,l=Gn.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$u++}),this.uuid=zi(),this.name="",this.source=new Lh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Gn.DEFAULT_IMAGE=null;Gn.DEFAULT_MAPPING=300;Gn.DEFAULT_ANISOTROPY=1;class ln{constructor(e=0,t=0,n=0,i=1){ln.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const c=e.elements,l=c[0],u=c[4],h=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,b=(f+1)/2,L=(p+1)/2,w=(u+d)/4,C=(h+_)/4,E=(g+m)/4;return y>b&&y>L?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=w/n,r=C/n):b>L?b<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(b),n=w/i,r=E/i):L<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(L),n=C/r,i=E/r),this.set(n,i,r,t),this}let x=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(h-_)/x,this.z=(d-u)/x,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ed extends Ks{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ln(0,0,e,t),this.scissorTest=!1,this.viewport=new ln(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Gn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Lh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Is extends ed{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ih extends Gn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class td extends Gn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class An{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3];const d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(h!==_||c!==d||l!==f||u!==g){let m=1-o;const p=c*d+l*f+u*g+h*_,x=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const L=Math.sqrt(y),w=Math.atan2(L,p*x);m=Math.sin(m*w)/L,o=Math.sin(o*w)/L}const b=o*x;if(c=c*m+d*b,l=l*m+f*b,u=u*m+g*b,h=h*m+_*b,m===1-o){const L=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=L,l*=L,u*=L,h*=L}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+u*h+c*f-l*d,e[t+1]=c*g+u*d+l*h-o*f,e[t+2]=l*g+u*f+o*d-c*h,e[t+3]=u*g-o*h-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(i/2),h=o(r/2),d=c(n/2),f=c(i/2),g=c(r/2);switch(a){case"XYZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"YZX":this._x=d*u*h+l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h-d*f*g;break;case"XZY":this._x=d*u*h-l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(a-i)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-c)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+l)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-l)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-i)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Hn(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+i*l-r*c,this._y=i*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-i*o,this._w=a*u-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-t)*u)/l,d=Math.sin(t*u)/l;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=i*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,t=0,n=0){I.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Jc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Jc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),u=2*(o*t-r*i),h=2*(r*n-a*t);return this.x=t+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=i+c*h+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return go.copy(this).projectOnVector(e),this.sub(go)}reflect(e){return this.sub(go.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Hn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const go=new I,Jc=new An;class Zn{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ni.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ni.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ni.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ni):Ni.fromBufferAttribute(r,a),Ni.applyMatrix4(e.matrixWorld),this.expandByPoint(Ni);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),la.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),la.copy(n.boundingBox)),la.applyMatrix4(e.matrixWorld),this.union(la)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ni),Ni.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ir),ha.subVectors(this.max,Ir),Zs.subVectors(e.a,Ir),Qs.subVectors(e.b,Ir),$s.subVectors(e.c,Ir),vs.subVectors(Qs,Zs),ys.subVectors($s,Qs),Ns.subVectors(Zs,$s);let t=[0,-vs.z,vs.y,0,-ys.z,ys.y,0,-Ns.z,Ns.y,vs.z,0,-vs.x,ys.z,0,-ys.x,Ns.z,0,-Ns.x,-vs.y,vs.x,0,-ys.y,ys.x,0,-Ns.y,Ns.x,0];return!bo(t,Zs,Qs,$s,ha)||(t=[1,0,0,0,1,0,0,0,1],!bo(t,Zs,Qs,$s,ha))?!1:(ua.crossVectors(vs,ys),t=[ua.x,ua.y,ua.z],bo(t,Zs,Qs,$s,ha))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ni).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ni).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($i[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$i[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$i[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$i[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$i[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$i[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$i[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$i[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($i),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const $i=[new I,new I,new I,new I,new I,new I,new I,new I],Ni=new I,la=new Zn,Zs=new I,Qs=new I,$s=new I,vs=new I,ys=new I,Ns=new I,Ir=new I,ha=new I,ua=new I,Us=new I;function bo(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Us.fromArray(s,r);const o=i.x*Math.abs(Us.x)+i.y*Math.abs(Us.y)+i.z*Math.abs(Us.z),c=e.dot(Us),l=t.dot(Us),u=n.dot(Us);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const nd=new Zn,Dr=new I,_o=new I;class Yi{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):nd.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Dr.subVectors(e,this.center);const t=Dr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Dr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_o.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Dr.copy(e.center).add(_o)),this.expandByPoint(Dr.copy(e.center).sub(_o))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const es=new I,xo=new I,da=new I,Ms=new I,vo=new I,fa=new I,yo=new I;class ro{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,es)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=es.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(es.copy(this.origin).addScaledVector(this.direction,t),es.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){xo.copy(e).add(t).multiplyScalar(.5),da.copy(t).sub(e).normalize(),Ms.copy(this.origin).sub(xo);const r=e.distanceTo(t)*.5,a=-this.direction.dot(da),o=Ms.dot(this.direction),c=-Ms.dot(da),l=Ms.lengthSq(),u=Math.abs(1-a*a);let h,d,f,g;if(u>0)if(h=a*c-o,d=a*o-c,g=r*u,h>=0)if(d>=-g)if(d<=g){const _=1/u;h*=_,d*=_,f=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d<=-g?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l):d<=g?(h=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(xo).addScaledVector(da,d),f}intersectSphere(e,t){es.subVectors(e.center,this.origin);const n=es.dot(this.direction),i=es.dot(es)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,es)!==null}intersectTriangle(e,t,n,i,r){vo.subVectors(t,e),fa.subVectors(n,e),yo.crossVectors(vo,fa);let a=this.direction.dot(yo),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ms.subVectors(this.origin,e);const c=o*this.direction.dot(fa.crossVectors(Ms,fa));if(c<0)return null;const l=o*this.direction.dot(vo.cross(Ms));if(l<0||c+l>a)return null;const u=-o*Ms.dot(yo);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class tt{constructor(e,t,n,i,r,a,o,c,l,u,h,d,f,g,_,m){tt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,u,h,d,f,g,_,m)}set(e,t,n,i,r,a,o,c,l,u,h,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/er.setFromMatrixColumn(e,0).length(),r=1/er.setFromMatrixColumn(e,1).length(),a=1/er.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=a*u,f=a*h,g=o*u,_=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=f+g*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*u,f=c*h,g=l*u,_=l*h;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*u,f=c*h,g=l*u,_=l*h;t[0]=d-_*o,t[4]=-a*h,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*u,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*u,f=a*h,g=o*u,_=o*h;t[0]=c*u,t[4]=g*l-f,t[8]=d*l+_,t[1]=c*h,t[5]=_*l+d,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=_-d*h,t[8]=g*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=f*h+g,t[10]=d-_*h}else if(e.order==="XZY"){const d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=d*h+_,t[5]=a*u,t[9]=f*h-g,t[2]=g*h-f,t[6]=o*u,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(id,e,sd)}lookAt(e,t,n){const i=this.elements;return Si.subVectors(e,t),Si.lengthSq()===0&&(Si.z=1),Si.normalize(),Ss.crossVectors(n,Si),Ss.lengthSq()===0&&(Math.abs(n.z)===1?Si.x+=1e-4:Si.z+=1e-4,Si.normalize(),Ss.crossVectors(n,Si)),Ss.normalize(),pa.crossVectors(Si,Ss),i[0]=Ss.x,i[4]=pa.x,i[8]=Si.x,i[1]=Ss.y,i[5]=pa.y,i[9]=Si.y,i[2]=Ss.z,i[6]=pa.z,i[10]=Si.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],x=n[3],y=n[7],b=n[11],L=n[15],w=i[0],C=i[4],E=i[8],v=i[12],M=i[1],P=i[5],G=i[9],O=i[13],q=i[2],ie=i[6],D=i[10],X=i[14],k=i[3],le=i[7],K=i[11],Z=i[15];return r[0]=a*w+o*M+c*q+l*k,r[4]=a*C+o*P+c*ie+l*le,r[8]=a*E+o*G+c*D+l*K,r[12]=a*v+o*O+c*X+l*Z,r[1]=u*w+h*M+d*q+f*k,r[5]=u*C+h*P+d*ie+f*le,r[9]=u*E+h*G+d*D+f*K,r[13]=u*v+h*O+d*X+f*Z,r[2]=g*w+_*M+m*q+p*k,r[6]=g*C+_*P+m*ie+p*le,r[10]=g*E+_*G+m*D+p*K,r[14]=g*v+_*O+m*X+p*Z,r[3]=x*w+y*M+b*q+L*k,r[7]=x*C+y*P+b*ie+L*le,r[11]=x*E+y*G+b*D+L*K,r[15]=x*v+y*O+b*X+L*Z,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*h-i*l*h-r*o*d+n*l*d+i*o*f-n*c*f)+_*(+t*c*f-t*l*d+r*a*d-i*a*f+i*l*u-r*c*u)+m*(+t*l*h-t*o*f-r*a*h+n*a*f+r*o*u-n*l*u)+p*(-i*o*u-t*c*h+t*o*d+i*a*h-n*a*d+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],x=h*m*l-_*d*l+_*c*f-o*m*f-h*c*p+o*d*p,y=g*d*l-u*m*l-g*c*f+a*m*f+u*c*p-a*d*p,b=u*_*l-g*h*l+g*o*f-a*_*f-u*o*p+a*h*p,L=g*h*c-u*_*c-g*o*d+a*_*d+u*o*m-a*h*m,w=t*x+n*y+i*b+r*L;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/w;return e[0]=x*C,e[1]=(_*d*r-h*m*r-_*i*f+n*m*f+h*i*p-n*d*p)*C,e[2]=(o*m*r-_*c*r+_*i*l-n*m*l-o*i*p+n*c*p)*C,e[3]=(h*c*r-o*d*r-h*i*l+n*d*l+o*i*f-n*c*f)*C,e[4]=y*C,e[5]=(u*m*r-g*d*r+g*i*f-t*m*f-u*i*p+t*d*p)*C,e[6]=(g*c*r-a*m*r-g*i*l+t*m*l+a*i*p-t*c*p)*C,e[7]=(a*d*r-u*c*r+u*i*l-t*d*l-a*i*f+t*c*f)*C,e[8]=b*C,e[9]=(g*h*r-u*_*r-g*n*f+t*_*f+u*n*p-t*h*p)*C,e[10]=(a*_*r-g*o*r+g*n*l-t*_*l-a*n*p+t*o*p)*C,e[11]=(u*o*r-a*h*r-u*n*l+t*h*l+a*n*f-t*o*f)*C,e[12]=L*C,e[13]=(u*_*i-g*h*i+g*n*d-t*_*d-u*n*m+t*h*m)*C,e[14]=(g*o*i-a*_*i-g*n*c+t*_*c+a*n*m-t*o*m)*C,e[15]=(a*h*i-u*o*i+u*n*c-t*h*c-a*n*d+t*o*d)*C,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,u*o+n,u*c-i*a,0,l*c-i*o,u*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,h=o+o,d=r*l,f=r*u,g=r*h,_=a*u,m=a*h,p=o*h,x=c*l,y=c*u,b=c*h,L=n.x,w=n.y,C=n.z;return i[0]=(1-(_+p))*L,i[1]=(f+b)*L,i[2]=(g-y)*L,i[3]=0,i[4]=(f-b)*w,i[5]=(1-(d+p))*w,i[6]=(m+x)*w,i[7]=0,i[8]=(g+y)*C,i[9]=(m-x)*C,i[10]=(1-(d+_))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=er.set(i[0],i[1],i[2]).length();const a=er.set(i[4],i[5],i[6]).length(),o=er.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Ui.copy(this);const l=1/r,u=1/a,h=1/o;return Ui.elements[0]*=l,Ui.elements[1]*=l,Ui.elements[2]*=l,Ui.elements[4]*=u,Ui.elements[5]*=u,Ui.elements[6]*=u,Ui.elements[8]*=h,Ui.elements[9]*=h,Ui.elements[10]*=h,t.setFromRotationMatrix(Ui),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=2e3){const c=this.elements,l=2*r/(t-e),u=2*r/(n-i),h=(t+e)/(t-e),d=(n+i)/(n-i);let f,g;if(o===2e3)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===2001)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=2e3){const c=this.elements,l=1/(t-e),u=1/(n-i),h=1/(a-r),d=(t+e)*l,f=(n+i)*u;let g,_;if(o===2e3)g=(a+r)*h,_=-2*h;else if(o===2001)g=r*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const er=new I,Ui=new tt,id=new I(0,0,0),sd=new I(1,1,1),Ss=new I,pa=new I,Si=new I,Zc=new tt,Qc=new An;class Ci{constructor(e=0,t=0,n=0,i=Ci.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Hn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Hn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Hn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Hn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Hn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Hn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Zc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Qc.setFromEuler(this),this.setFromQuaternion(Qc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ci.DEFAULT_ORDER="XYZ";class Dh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let rd=0;const $c=new I,tr=new An,ts=new tt,ma=new I,Fr=new I,ad=new I,od=new An,el=new I(1,0,0),tl=new I(0,1,0),nl=new I(0,0,1),il={type:"added"},cd={type:"removed"},nr={type:"childadded",child:null},Mo={type:"childremoved",child:null};class Pn extends Ks{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rd++}),this.uuid=zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pn.DEFAULT_UP.clone();const e=new I,t=new Ci,n=new An,i=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new tt},normalMatrix:{value:new Vt}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=Pn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Dh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return tr.setFromAxisAngle(e,t),this.quaternion.multiply(tr),this}rotateOnWorldAxis(e,t){return tr.setFromAxisAngle(e,t),this.quaternion.premultiply(tr),this}rotateX(e){return this.rotateOnAxis(el,e)}rotateY(e){return this.rotateOnAxis(tl,e)}rotateZ(e){return this.rotateOnAxis(nl,e)}translateOnAxis(e,t){return $c.copy(e).applyQuaternion(this.quaternion),this.position.add($c.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(el,e)}translateY(e){return this.translateOnAxis(tl,e)}translateZ(e){return this.translateOnAxis(nl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ts.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ma.copy(e):ma.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Fr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ts.lookAt(Fr,ma,this.up):ts.lookAt(ma,Fr,this.up),this.quaternion.setFromRotationMatrix(ts),i&&(ts.extractRotation(i.matrixWorld),tr.setFromRotationMatrix(ts),this.quaternion.premultiply(tr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(il),nr.child=e,this.dispatchEvent(nr),nr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(cd),Mo.child=e,this.dispatchEvent(Mo),Mo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ts.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ts.multiply(e.parent.matrixWorld)),e.applyMatrix4(ts),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(il),nr.child=e,this.dispatchEvent(nr),nr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fr,e,ad),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fr,od,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Pn.DEFAULT_UP=new I(0,1,0);Pn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Oi=new I,ns=new I,So=new I,is=new I,ir=new I,sr=new I,sl=new I,Eo=new I,wo=new I,Ao=new I,To=new ln,Ro=new ln,Co=new ln;class Ii{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Oi.subVectors(e,t),i.cross(Oi);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Oi.subVectors(i,t),ns.subVectors(n,t),So.subVectors(e,t);const a=Oi.dot(Oi),o=Oi.dot(ns),c=Oi.dot(So),l=ns.dot(ns),u=ns.dot(So),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(l*c-o*u)*d,g=(a*u-o*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,is)===null?!1:is.x>=0&&is.y>=0&&is.x+is.y<=1}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,is)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,is.x),c.addScaledVector(a,is.y),c.addScaledVector(o,is.z),c)}static getInterpolatedAttribute(e,t,n,i,r,a){return To.setScalar(0),Ro.setScalar(0),Co.setScalar(0),To.fromBufferAttribute(e,t),Ro.fromBufferAttribute(e,n),Co.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(To,r.x),a.addScaledVector(Ro,r.y),a.addScaledVector(Co,r.z),a}static isFrontFacing(e,t,n,i){return Oi.subVectors(n,t),ns.subVectors(e,t),Oi.cross(ns).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Oi.subVectors(this.c,this.b),ns.subVectors(this.a,this.b),Oi.cross(ns).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ii.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ii.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return Ii.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return Ii.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ii.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;ir.subVectors(i,n),sr.subVectors(r,n),Eo.subVectors(e,n);const c=ir.dot(Eo),l=sr.dot(Eo);if(c<=0&&l<=0)return t.copy(n);wo.subVectors(e,i);const u=ir.dot(wo),h=sr.dot(wo);if(u>=0&&h<=u)return t.copy(i);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(ir,a);Ao.subVectors(e,r);const f=ir.dot(Ao),g=sr.dot(Ao);if(g>=0&&f<=g)return t.copy(r);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(sr,o);const m=u*g-f*h;if(m<=0&&h-u>=0&&f-g>=0)return sl.subVectors(r,i),o=(h-u)/(h-u+(f-g)),t.copy(i).addScaledVector(sl,o);const p=1/(m+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(ir,a).addScaledVector(sr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Fh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Es={h:0,s:0,l:0},ga={h:0,s:0,l:0};function Po(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class st{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=rn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,cn.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=cn.workingColorSpace){return this.r=e,this.g=t,this.b=n,cn.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=cn.workingColorSpace){if(e=Ec(e,1),t=Hn(t,0,1),n=Hn(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Po(a,r,e+1/3),this.g=Po(a,r,e),this.b=Po(a,r,e-1/3)}return cn.toWorkingColorSpace(this,i),this}setStyle(e,t=rn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=rn){const n=Fh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=us(e.r),this.g=us(e.g),this.b=us(e.b),this}copyLinearToSRGB(e){return this.r=br(e.r),this.g=br(e.g),this.b=br(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=rn){return cn.fromWorkingColorSpace(ai.copy(this),e),Math.round(Hn(ai.r*255,0,255))*65536+Math.round(Hn(ai.g*255,0,255))*256+Math.round(Hn(ai.b*255,0,255))}getHexString(e=rn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=cn.workingColorSpace){cn.fromWorkingColorSpace(ai.copy(this),t);const n=ai.r,i=ai.g,r=ai.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(i-r)/h+(i<r?6:0);break;case i:c=(r-n)/h+2;break;case r:c=(n-i)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=cn.workingColorSpace){return cn.fromWorkingColorSpace(ai.copy(this),t),e.r=ai.r,e.g=ai.g,e.b=ai.b,e}getStyle(e=rn){cn.fromWorkingColorSpace(ai.copy(this),e);const t=ai.r,n=ai.g,i=ai.b;return e!==rn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Es),this.setHSL(Es.h+e,Es.s+t,Es.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Es),e.getHSL(ga);const n=Zr(Es.h,ga.h,t),i=Zr(Es.s,ga.s,t),r=Zr(Es.l,ga.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ai=new st;st.NAMES=Fh;let ld=0;class Di extends Ks{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ld++}),this.uuid=zi(),this.name="",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new st(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Cn extends Di{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ci,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const zn=new I,ba=new We;class fn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ba.fromBufferAttribute(this,t),ba.applyMatrix3(e),this.setXY(t,ba.x,ba.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)zn.fromBufferAttribute(this,t),zn.applyMatrix3(e),this.setXYZ(t,zn.x,zn.y,zn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)zn.fromBufferAttribute(this,t),zn.applyMatrix4(e),this.setXYZ(t,zn.x,zn.y,zn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zn.fromBufferAttribute(this,t),zn.applyNormalMatrix(e),this.setXYZ(t,zn.x,zn.y,zn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zn.fromBufferAttribute(this,t),zn.transformDirection(e),this.setXYZ(t,zn.x,zn.y,zn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ki(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_n(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ki(t,this.array)),t}setX(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ki(t,this.array)),t}setY(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ki(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ki(t,this.array)),t}setW(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),n=_n(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),n=_n(n,this.array),i=_n(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),n=_n(n,this.array),i=_n(i,this.array),r=_n(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}}class Nh extends fn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Uh extends fn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Qt extends fn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let hd=0;const Pi=new tt,Lo=new Pn,rr=new I,Ei=new Zn,Nr=new Zn,jn=new I;class Sn extends Ks{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ph(e)?Uh:Nh)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Vt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Pi.makeRotationFromQuaternion(e),this.applyMatrix4(Pi),this}rotateX(e){return Pi.makeRotationX(e),this.applyMatrix4(Pi),this}rotateY(e){return Pi.makeRotationY(e),this.applyMatrix4(Pi),this}rotateZ(e){return Pi.makeRotationZ(e),this.applyMatrix4(Pi),this}translate(e,t,n){return Pi.makeTranslation(e,t,n),this.applyMatrix4(Pi),this}scale(e,t,n){return Pi.makeScale(e,t,n),this.applyMatrix4(Pi),this}lookAt(e){return Lo.lookAt(e),Lo.updateMatrix(),this.applyMatrix4(Lo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(rr).negate(),this.translate(rr.x,rr.y,rr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Qt(n,3))}else{for(let n=0,i=t.count;n<i;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];Ei.setFromBufferAttribute(r),this.morphTargetsRelative?(jn.addVectors(this.boundingBox.min,Ei.min),this.boundingBox.expandByPoint(jn),jn.addVectors(this.boundingBox.max,Ei.max),this.boundingBox.expandByPoint(jn)):(this.boundingBox.expandByPoint(Ei.min),this.boundingBox.expandByPoint(Ei.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(Ei.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Nr.setFromBufferAttribute(o),this.morphTargetsRelative?(jn.addVectors(Ei.min,Nr.min),Ei.expandByPoint(jn),jn.addVectors(Ei.max,Nr.max),Ei.expandByPoint(jn)):(Ei.expandByPoint(Nr.min),Ei.expandByPoint(Nr.max))}Ei.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)jn.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(jn));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)jn.fromBufferAttribute(o,l),c&&(rr.fromBufferAttribute(e,l),jn.add(rr)),i=Math.max(i,n.distanceToSquared(jn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new fn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let E=0;E<n.count;E++)o[E]=new I,c[E]=new I;const l=new I,u=new I,h=new I,d=new We,f=new We,g=new We,_=new I,m=new I;function p(E,v,M){l.fromBufferAttribute(n,E),u.fromBufferAttribute(n,v),h.fromBufferAttribute(n,M),d.fromBufferAttribute(r,E),f.fromBufferAttribute(r,v),g.fromBufferAttribute(r,M),u.sub(l),h.sub(l),f.sub(d),g.sub(d);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(P),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(P),o[E].add(_),o[v].add(_),o[M].add(_),c[E].add(m),c[v].add(m),c[M].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let E=0,v=x.length;E<v;++E){const M=x[E],P=M.start,G=M.count;for(let O=P,q=P+G;O<q;O+=3)p(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const y=new I,b=new I,L=new I,w=new I;function C(E){L.fromBufferAttribute(i,E),w.copy(L);const v=o[E];y.copy(v),y.sub(L.multiplyScalar(L.dot(v))).normalize(),b.crossVectors(w,v);const P=b.dot(c[E])<0?-1:1;a.setXYZW(E,y.x,y.y,y.z,P)}for(let E=0,v=x.length;E<v;++E){const M=x[E],P=M.start,G=M.count;for(let O=P,q=P+G;O<q;O+=3)C(e.getX(O+0)),C(e.getX(O+1)),C(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new fn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new I,r=new I,a=new I,o=new I,c=new I,l=new I,u=new I,h=new I;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)jn.fromBufferAttribute(e,t),jn.normalize(),e.setXYZ(t,jn.x,jn.y,jn.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,h=o.normalized,d=new l.constructor(c.length*u);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*u;for(let p=0;p<u;p++)d[g++]=l[f++]}return new fn(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Sn,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const d=l[u],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const f=l[h];u.push(f.toJSON(e.data))}u.length>0&&(i[c]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const l in i){const u=i[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const rl=new tt,Os=new ro,_a=new Yi,al=new I,xa=new I,va=new I,ya=new I,Io=new I,Ma=new I,ol=new I,Sa=new I;class Ve extends Pn{constructor(e=new Sn,t=new Cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){Ma.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(Io.fromBufferAttribute(h,e),a?Ma.addScaledVector(Io,u):Ma.addScaledVector(Io.sub(t),u))}t.add(Ma)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),_a.copy(n.boundingSphere),_a.applyMatrix4(r),Os.copy(e.ray).recast(e.near),!(_a.containsPoint(Os.origin)===!1&&(Os.intersectSphere(_a,al)===null||Os.origin.distanceToSquared(al)>(e.far-e.near)**2))&&(rl.copy(r).invert(),Os.copy(e.ray).applyMatrix4(rl),!(n.boundingBox!==null&&Os.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Os)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],x=Math.max(m.start,f.start),y=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let b=x,L=y;b<L;b+=3){const w=o.getX(b),C=o.getX(b+1),E=o.getX(b+2);i=Ea(this,p,e,n,l,u,h,w,C,E),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const x=o.getX(m),y=o.getX(m+1),b=o.getX(m+2);i=Ea(this,a,e,n,l,u,h,x,y,b),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],x=Math.max(m.start,f.start),y=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let b=x,L=y;b<L;b+=3){const w=b,C=b+1,E=b+2;i=Ea(this,p,e,n,l,u,h,w,C,E),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const x=m,y=m+1,b=m+2;i=Ea(this,a,e,n,l,u,h,x,y,b),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function ud(s,e,t,n,i,r,a,o){let c;if(e.side===1?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===0,o),c===null)return null;Sa.copy(o),Sa.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(Sa);return l<t.near||l>t.far?null:{distance:l,point:Sa.clone(),object:s}}function Ea(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,xa),s.getVertexPosition(c,va),s.getVertexPosition(l,ya);const u=ud(s,e,t,n,xa,va,ya,ol);if(u){const h=new I;Ii.getBarycoord(ol,xa,va,ya,h),i&&(u.uv=Ii.getInterpolatedAttribute(i,o,c,l,h,new We)),r&&(u.uv1=Ii.getInterpolatedAttribute(r,o,c,l,h,new We)),a&&(u.normal=Ii.getInterpolatedAttribute(a,o,c,l,h,new I),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new I,materialIndex:0};Ii.getNormal(xa,va,ya,d.normal),u.face=d,u.barycoord=h}return u}class yn extends Sn{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],h=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Qt(l,3)),this.setAttribute("normal",new Qt(u,3)),this.setAttribute("uv",new Qt(h,2));function g(_,m,p,x,y,b,L,w,C,E,v){const M=b/C,P=L/E,G=b/2,O=L/2,q=w/2,ie=C+1,D=E+1;let X=0,k=0;const le=new I;for(let K=0;K<D;K++){const Z=K*P-O;for(let xe=0;xe<ie;xe++){const Ce=xe*M-G;le[_]=Ce*x,le[m]=Z*y,le[p]=q,l.push(le.x,le.y,le.z),le[_]=0,le[m]=0,le[p]=w>0?1:-1,u.push(le.x,le.y,le.z),h.push(xe/C),h.push(1-K/E),X+=1}}for(let K=0;K<E;K++)for(let Z=0;Z<C;Z++){const xe=d+Z+ie*K,Ce=d+Z+ie*(K+1),te=d+(Z+1)+ie*(K+1),fe=d+(Z+1)+ie*K;c.push(xe,Ce,fe),c.push(Ce,te,fe),k+=6}o.addGroup(f,k,v),f+=k,d+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function vr(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function di(s){const e={};for(let t=0;t<s.length;t++){const n=vr(s[t]);for(const i in n)e[i]=n[i]}return e}function dd(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Oh(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:cn.workingColorSpace}const fd={clone:vr,merge:di};var pd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,md=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ds extends Di{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pd,this.fragmentShader=md,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vr(e.uniforms),this.uniformsGroups=dd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Bh extends Pn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=2e3}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ws=new I,cl=new We,ll=new We;class vi extends Bh{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=xr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Jr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xr*2*Math.atan(Math.tan(Jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ws.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ws.x,ws.y).multiplyScalar(-e/ws.z),ws.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ws.x,ws.y).multiplyScalar(-e/ws.z)}getViewSize(e,t){return this.getViewBounds(e,cl,ll),t.subVectors(ll,cl)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Jr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ar=-90,or=1;class gd extends Pn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new vi(ar,or,e,t);i.layers=this.layers,this.add(i);const r=new vi(ar,or,e,t);r.layers=this.layers,this.add(r);const a=new vi(ar,or,e,t);a.layers=this.layers,this.add(a);const o=new vi(ar,or,e,t);o.layers=this.layers,this.add(o);const c=new vi(ar,or,e,t);c.layers=this.layers,this.add(c);const l=new vi(ar,or,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class kh extends Gn{constructor(e,t,n,i,r,a,o,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:301,super(e,t,n,i,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class bd extends Is{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new kh(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:1006}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new yn(5,5,5),r=new Ds({name:"CubemapFromEquirect",uniforms:vr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});r.uniforms.tEquirect.value=t;const a=new Ve(i,r),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=1006),new gd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}const Do=new I,_d=new I,xd=new Vt;class hs{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Do.subVectors(n,t).cross(_d.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Do),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||xd.getNormalMatrix(e),i=this.coplanarPoint(Do).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Bs=new Yi,wa=new I;class wc{constructor(e=new hs,t=new hs,n=new hs,i=new hs,r=new hs,a=new hs){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3){const n=this.planes,i=e.elements,r=i[0],a=i[1],o=i[2],c=i[3],l=i[4],u=i[5],h=i[6],d=i[7],f=i[8],g=i[9],_=i[10],m=i[11],p=i[12],x=i[13],y=i[14],b=i[15];if(n[0].setComponents(c-r,d-l,m-f,b-p).normalize(),n[1].setComponents(c+r,d+l,m+f,b+p).normalize(),n[2].setComponents(c+a,d+u,m+g,b+x).normalize(),n[3].setComponents(c-a,d-u,m-g,b-x).normalize(),n[4].setComponents(c-o,d-h,m-_,b-y).normalize(),t===2e3)n[5].setComponents(c+o,d+h,m+_,b+y).normalize();else if(t===2001)n[5].setComponents(o,h,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bs)}intersectsSprite(e){return Bs.center.set(0,0,0),Bs.radius=.7071067811865476,Bs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bs)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(wa.x=i.normal.x>0?e.max.x:e.min.x,wa.y=i.normal.y>0?e.max.y:e.min.y,wa.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(wa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function zh(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function vd(s){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,h=l.byteLength,d=s.createBuffer();s.bindBuffer(c,d),s.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c.updateRanges;if(s.bindBuffer(l,o),h.length===0)s.bufferSubData(l,0,u);else{h.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<h.length;f++){const g=h[d],_=h[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,h[d]=_)}h.length=d+1;for(let f=0,g=h.length;f<g;f++){const _=h[f];s.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(s.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}class Qn extends Sn{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,u=c+1,h=e/o,d=t/c,f=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const x=p*d-a;for(let y=0;y<l;y++){const b=y*h-r;g.push(b,-x,0),_.push(0,0,1),m.push(y/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let x=0;x<o;x++){const y=x+l*p,b=x+l*(p+1),L=x+1+l*(p+1),w=x+1+l*p;f.push(y,b,w),f.push(b,L,w)}this.setIndex(f),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(_,3)),this.setAttribute("uv",new Qt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qn(e.width,e.height,e.widthSegments,e.heightSegments)}}var yd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Md=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Sd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ed=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ad=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Td=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Rd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Pd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ld=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Id=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Dd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Fd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Nd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ud=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Od=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Gd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Hd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Vd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Wd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Xd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,jd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,qd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Kd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$d=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ef=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,tf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,nf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,rf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,af=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,of=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,hf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,uf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,df=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ff=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,pf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,mf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,bf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_f=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,vf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,yf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Mf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Sf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ef=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Af=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Lf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,If=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Df=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ff=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Nf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Uf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Of=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Bf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,zf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Gf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Wf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Xf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,jf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Kf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Zf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$f=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ep=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,np=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ip=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,sp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,rp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ap=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,op=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,lp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,up=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,mp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,gp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,bp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,vp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const yp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Mp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ep=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ap=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Rp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Cp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Pp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ip=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Np=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Up=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Op=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,zp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Hp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Vp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,jp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Jp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$p=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,em=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xt={alphahash_fragment:yd,alphahash_pars_fragment:Md,alphamap_fragment:Sd,alphamap_pars_fragment:Ed,alphatest_fragment:wd,alphatest_pars_fragment:Ad,aomap_fragment:Td,aomap_pars_fragment:Rd,batching_pars_vertex:Cd,batching_vertex:Pd,begin_vertex:Ld,beginnormal_vertex:Id,bsdfs:Dd,iridescence_fragment:Fd,bumpmap_pars_fragment:Nd,clipping_planes_fragment:Ud,clipping_planes_pars_fragment:Od,clipping_planes_pars_vertex:Bd,clipping_planes_vertex:kd,color_fragment:zd,color_pars_fragment:Gd,color_pars_vertex:Hd,color_vertex:Vd,common:Wd,cube_uv_reflection_fragment:Xd,defaultnormal_vertex:jd,displacementmap_pars_vertex:qd,displacementmap_vertex:Yd,emissivemap_fragment:Kd,emissivemap_pars_fragment:Jd,colorspace_fragment:Zd,colorspace_pars_fragment:Qd,envmap_fragment:$d,envmap_common_pars_fragment:ef,envmap_pars_fragment:tf,envmap_pars_vertex:nf,envmap_physical_pars_fragment:pf,envmap_vertex:sf,fog_vertex:rf,fog_pars_vertex:af,fog_fragment:of,fog_pars_fragment:cf,gradientmap_pars_fragment:lf,lightmap_pars_fragment:hf,lights_lambert_fragment:uf,lights_lambert_pars_fragment:df,lights_pars_begin:ff,lights_toon_fragment:mf,lights_toon_pars_fragment:gf,lights_phong_fragment:bf,lights_phong_pars_fragment:_f,lights_physical_fragment:xf,lights_physical_pars_fragment:vf,lights_fragment_begin:yf,lights_fragment_maps:Mf,lights_fragment_end:Sf,logdepthbuf_fragment:Ef,logdepthbuf_pars_fragment:wf,logdepthbuf_pars_vertex:Af,logdepthbuf_vertex:Tf,map_fragment:Rf,map_pars_fragment:Cf,map_particle_fragment:Pf,map_particle_pars_fragment:Lf,metalnessmap_fragment:If,metalnessmap_pars_fragment:Df,morphinstance_vertex:Ff,morphcolor_vertex:Nf,morphnormal_vertex:Uf,morphtarget_pars_vertex:Of,morphtarget_vertex:Bf,normal_fragment_begin:kf,normal_fragment_maps:zf,normal_pars_fragment:Gf,normal_pars_vertex:Hf,normal_vertex:Vf,normalmap_pars_fragment:Wf,clearcoat_normal_fragment_begin:Xf,clearcoat_normal_fragment_maps:jf,clearcoat_pars_fragment:qf,iridescence_pars_fragment:Yf,opaque_fragment:Kf,packing:Jf,premultiplied_alpha_fragment:Zf,project_vertex:Qf,dithering_fragment:$f,dithering_pars_fragment:ep,roughnessmap_fragment:tp,roughnessmap_pars_fragment:np,shadowmap_pars_fragment:ip,shadowmap_pars_vertex:sp,shadowmap_vertex:rp,shadowmask_pars_fragment:ap,skinbase_vertex:op,skinning_pars_vertex:cp,skinning_vertex:lp,skinnormal_vertex:hp,specularmap_fragment:up,specularmap_pars_fragment:dp,tonemapping_fragment:fp,tonemapping_pars_fragment:pp,transmission_fragment:mp,transmission_pars_fragment:gp,uv_pars_fragment:bp,uv_pars_vertex:_p,uv_vertex:xp,worldpos_vertex:vp,background_vert:yp,background_frag:Mp,backgroundCube_vert:Sp,backgroundCube_frag:Ep,cube_vert:wp,cube_frag:Ap,depth_vert:Tp,depth_frag:Rp,distanceRGBA_vert:Cp,distanceRGBA_frag:Pp,equirect_vert:Lp,equirect_frag:Ip,linedashed_vert:Dp,linedashed_frag:Fp,meshbasic_vert:Np,meshbasic_frag:Up,meshlambert_vert:Op,meshlambert_frag:Bp,meshmatcap_vert:kp,meshmatcap_frag:zp,meshnormal_vert:Gp,meshnormal_frag:Hp,meshphong_vert:Vp,meshphong_frag:Wp,meshphysical_vert:Xp,meshphysical_frag:jp,meshtoon_vert:qp,meshtoon_frag:Yp,points_vert:Kp,points_frag:Jp,shadow_vert:Zp,shadow_frag:Qp,sprite_vert:$p,sprite_frag:em},Ye={common:{diffuse:{value:new st(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new st(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new st(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new st(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},ji={basic:{uniforms:di([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:di([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,Ye.lights,{emissive:{value:new st(0)}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:di([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,Ye.lights,{emissive:{value:new st(0)},specular:{value:new st(1118481)},shininess:{value:30}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:di([Ye.common,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.roughnessmap,Ye.metalnessmap,Ye.fog,Ye.lights,{emissive:{value:new st(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:di([Ye.common,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.gradientmap,Ye.fog,Ye.lights,{emissive:{value:new st(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:di([Ye.common,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:di([Ye.points,Ye.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:di([Ye.common,Ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:di([Ye.common,Ye.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:di([Ye.common,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:di([Ye.sprite,Ye.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distanceRGBA:{uniforms:di([Ye.common,Ye.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distanceRGBA_vert,fragmentShader:Xt.distanceRGBA_frag},shadow:{uniforms:di([Ye.lights,Ye.fog,{color:{value:new st(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};ji.physical={uniforms:di([ji.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new st(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new st(0)},specularColor:{value:new st(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};const Aa={r:0,b:0,g:0},ks=new Ci,tm=new tt;function nm(s,e,t,n,i,r,a){const o=new st(0);let c=r===!0?0:1,l,u,h=null,d=0,f=null;function g(x){let y=x.isScene===!0?x.background:null;return y&&y.isTexture&&(y=(x.backgroundBlurriness>0?t:e).get(y)),y}function _(x){let y=!1;const b=g(x);b===null?p(o,c):b&&b.isColor&&(p(b,1),y=!0);const L=s.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,a):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(x,y){const b=g(y);b&&(b.isCubeTexture||b.mapping===306)?(u===void 0&&(u=new Ve(new yn(1,1,1),new Ds({name:"BackgroundCubeMaterial",uniforms:vr(ji.backgroundCube.uniforms),vertexShader:ji.backgroundCube.vertexShader,fragmentShader:ji.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(L,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),ks.copy(y.backgroundRotation),ks.x*=-1,ks.y*=-1,ks.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ks.y*=-1,ks.z*=-1),u.material.uniforms.envMap.value=b,u.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(tm.makeRotationFromEuler(ks)),u.material.toneMapped=cn.getTransfer(b.colorSpace)!==vn,(h!==b||d!==b.version||f!==s.toneMapping)&&(u.material.needsUpdate=!0,h=b,d=b.version,f=s.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new Ve(new Qn(2,2),new Ds({name:"BackgroundMaterial",uniforms:vr(ji.background.uniforms),vertexShader:ji.background.vertexShader,fragmentShader:ji.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=cn.getTransfer(b.colorSpace)!==vn,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||d!==b.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,h=b,d=b.version,f=s.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,y){x.getRGB(Aa,Oh(s)),n.buffers.color.setClear(Aa.r,Aa.g,Aa.b,y,a)}return{getClearColor:function(){return o},setClearColor:function(x,y=1){o.set(x),c=y,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,p(o,c)},render:_,addToRenderList:m}}function im(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(M,P,G,O,q){let ie=!1;const D=h(O,G,P);r!==D&&(r=D,l(r.object)),ie=f(M,O,G,q),ie&&g(M,O,G,q),q!==null&&e.update(q,s.ELEMENT_ARRAY_BUFFER),(ie||a)&&(a=!1,b(M,P,G,O),q!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function c(){return s.createVertexArray()}function l(M){return s.bindVertexArray(M)}function u(M){return s.deleteVertexArray(M)}function h(M,P,G){const O=G.wireframe===!0;let q=n[M.id];q===void 0&&(q={},n[M.id]=q);let ie=q[P.id];ie===void 0&&(ie={},q[P.id]=ie);let D=ie[O];return D===void 0&&(D=d(c()),ie[O]=D),D}function d(M){const P=[],G=[],O=[];for(let q=0;q<t;q++)P[q]=0,G[q]=0,O[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:G,attributeDivisors:O,object:M,attributes:{},index:null}}function f(M,P,G,O){const q=r.attributes,ie=P.attributes;let D=0;const X=G.getAttributes();for(const k in X)if(X[k].location>=0){const K=q[k];let Z=ie[k];if(Z===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(Z=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(Z=M.instanceColor)),K===void 0||K.attribute!==Z||Z&&K.data!==Z.data)return!0;D++}return r.attributesNum!==D||r.index!==O}function g(M,P,G,O){const q={},ie=P.attributes;let D=0;const X=G.getAttributes();for(const k in X)if(X[k].location>=0){let K=ie[k];K===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(K=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(K=M.instanceColor));const Z={};Z.attribute=K,K&&K.data&&(Z.data=K.data),q[k]=Z,D++}r.attributes=q,r.attributesNum=D,r.index=O}function _(){const M=r.newAttributes;for(let P=0,G=M.length;P<G;P++)M[P]=0}function m(M){p(M,0)}function p(M,P){const G=r.newAttributes,O=r.enabledAttributes,q=r.attributeDivisors;G[M]=1,O[M]===0&&(s.enableVertexAttribArray(M),O[M]=1),q[M]!==P&&(s.vertexAttribDivisor(M,P),q[M]=P)}function x(){const M=r.newAttributes,P=r.enabledAttributes;for(let G=0,O=P.length;G<O;G++)P[G]!==M[G]&&(s.disableVertexAttribArray(G),P[G]=0)}function y(M,P,G,O,q,ie,D){D===!0?s.vertexAttribIPointer(M,P,G,q,ie):s.vertexAttribPointer(M,P,G,O,q,ie)}function b(M,P,G,O){_();const q=O.attributes,ie=G.getAttributes(),D=P.defaultAttributeValues;for(const X in ie){const k=ie[X];if(k.location>=0){let le=q[X];if(le===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(le=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(le=M.instanceColor)),le!==void 0){const K=le.normalized,Z=le.itemSize,xe=e.get(le);if(xe===void 0)continue;const Ce=xe.buffer,te=xe.type,fe=xe.bytesPerElement,De=te===s.INT||te===s.UNSIGNED_INT||le.gpuType===1013;if(le.isInterleavedBufferAttribute){const _e=le.data,ot=_e.stride,rt=le.offset;if(_e.isInstancedInterleavedBuffer){for(let _t=0;_t<k.locationSize;_t++)p(k.location+_t,_e.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let _t=0;_t<k.locationSize;_t++)m(k.location+_t);s.bindBuffer(s.ARRAY_BUFFER,Ce);for(let _t=0;_t<k.locationSize;_t++)y(k.location+_t,Z/k.locationSize,te,K,ot*fe,(rt+Z/k.locationSize*_t)*fe,De)}else{if(le.isInstancedBufferAttribute){for(let _e=0;_e<k.locationSize;_e++)p(k.location+_e,le.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let _e=0;_e<k.locationSize;_e++)m(k.location+_e);s.bindBuffer(s.ARRAY_BUFFER,Ce);for(let _e=0;_e<k.locationSize;_e++)y(k.location+_e,Z/k.locationSize,te,K,Z*fe,Z/k.locationSize*_e*fe,De)}}else if(D!==void 0){const K=D[X];if(K!==void 0)switch(K.length){case 2:s.vertexAttrib2fv(k.location,K);break;case 3:s.vertexAttrib3fv(k.location,K);break;case 4:s.vertexAttrib4fv(k.location,K);break;default:s.vertexAttrib1fv(k.location,K)}}}}x()}function L(){E();for(const M in n){const P=n[M];for(const G in P){const O=P[G];for(const q in O)u(O[q].object),delete O[q];delete P[G]}delete n[M]}}function w(M){if(n[M.id]===void 0)return;const P=n[M.id];for(const G in P){const O=P[G];for(const q in O)u(O[q].object),delete O[q];delete P[G]}delete n[M.id]}function C(M){for(const P in n){const G=n[P];if(G[M.id]===void 0)continue;const O=G[M.id];for(const q in O)u(O[q].object),delete O[q];delete G[M.id]}}function E(){v(),a=!0,r!==i&&(r=i,l(r.object))}function v(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:E,resetDefaultState:v,dispose:L,releaseStatesOfGeometry:w,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:x}}function sm(s,e,t){let n;function i(l){n=l}function r(l,u){s.drawArrays(n,l,u),t.update(u,n,1)}function a(l,u,h){h!==0&&(s.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function o(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let f=0;for(let g=0;g<h;g++)f+=u[g];t.update(f,n,1)}function c(l,u,h,d){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],u[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,u,0,d,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*d[_];t.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function rm(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==1023&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const E=C===1016&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==1009&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==1015&&!E)}function c(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,w=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:b,vertexTextures:L,maxSamples:w}}function am(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new hs,o=new Vt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||i;return i=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=s.get(h);if(!i||g===null||g.length===0||r&&!m)r?u(null):l();else{const x=r?0:n,y=x*4;let b=p.clippingState||null;c.value=b,b=u(g,d,y,f);for(let L=0;L!==y;++L)b[L]=t[L];p.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,b=f;y!==_;++y,b+=4)a.copy(h[y]).applyMatrix4(x,o),a.normal.toArray(m,b),m[b+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function om(s){let e=new WeakMap;function t(a,o){return o===303?a.mapping=301:o===304&&(a.mapping=302),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===303||o===304)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new bd(c.height);return l.fromEquirectangularTexture(s,a),e.set(a,l),a.addEventListener("dispose",i),t(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class ao extends Bh{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const gr=4,hl=[.125,.215,.35,.446,.526,.582],Xs=20,Fo=new ao,ul=new st;let No=null,Uo=0,Oo=0,Bo=!1;const Ws=(1+Math.sqrt(5))/2,cr=1/Ws,dl=[new I(-Ws,cr,0),new I(Ws,cr,0),new I(-cr,0,Ws),new I(cr,0,Ws),new I(0,Ws,-cr),new I(0,Ws,cr),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)];class fl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){No=this._renderer.getRenderTarget(),Uo=this._renderer.getActiveCubeFace(),Oo=this._renderer.getActiveMipmapLevel(),Bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ml(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(No,Uo,Oo),this._renderer.xr.enabled=Bo,e.scissorTest=!1,Ta(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),No=this._renderer.getRenderTarget(),Uo=this._renderer.getActiveCubeFace(),Oo=this._renderer.getActiveMipmapLevel(),Bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:mi,depthBuffer:!1},i=pl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pl(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cm(r)),this._blurMaterial=lm(r,e,t)}return i}_compileMaterial(e){const t=new Ve(this._lodPlanes[0],e);this._renderer.compile(t,Fo)}_sceneToCubeUV(e,t,n,i){const o=new vi(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(ul),u.toneMapping=0,u.autoClear=!1;const f=new Cn({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),g=new Ve(new yn,f);let _=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(ul),_=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):x===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));const y=this._cubeSize;Ta(i,x*y,p>2?y:0,y,y),u.setRenderTarget(i),_&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===301||e.mapping===302;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=gl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ml());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new Ve(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;Ta(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Fo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=dl[(i-r-1)%dl.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Ve(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Xs-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):Xs;m>Xs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Xs}`);const p=[];let x=0;for(let C=0;C<Xs;++C){const E=C/_,v=Math.exp(-E*E/2);p.push(v),C===0?x+=v:C<m&&(x+=2*v)}for(let C=0;C<p.length;C++)p[C]=p[C]/x;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;const b=this._sizeLods[i],L=3*b*(i>y-gr?i-y+gr:0),w=4*(this._cubeSize-b);Ta(t,L,w,3*b,2*b),c.setRenderTarget(t),c.render(h,Fo)}}function cm(s){const e=[],t=[],n=[];let i=s;const r=s-gr+1+hl.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let c=1/o;a>s-gr?c=hl[a-s+gr-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,_=3,m=2,p=1,x=new Float32Array(_*g*f),y=new Float32Array(m*g*f),b=new Float32Array(p*g*f);for(let w=0;w<f;w++){const C=w%3*2/3-1,E=w>2?0:-1,v=[C,E,0,C+2/3,E,0,C+2/3,E+1,0,C,E,0,C+2/3,E+1,0,C,E+1,0];x.set(v,_*g*w),y.set(d,m*g*w);const M=[w,w,w,w,w,w];b.set(M,p*g*w)}const L=new Sn;L.setAttribute("position",new fn(x,_)),L.setAttribute("uv",new fn(y,m)),L.setAttribute("faceIndex",new fn(b,p)),e.push(L),i>gr&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function pl(s,e,t){const n=new Is(s,e,t);return n.texture.mapping=306,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ta(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function lm(s,e,t){const n=new Float32Array(Xs),i=new I(0,1,0);return new Ds({name:"SphericalGaussianBlur",defines:{n:Xs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ac(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ml(){return new Ds({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ac(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function gl(){return new Ds({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ac(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ac(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function hm(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===303||c===304,u=c===301||c===302;if(l||u){let h=e.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new fl(s)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return l&&f&&f.height>0||u&&f&&i(f)?(t===null&&(t=new fl(s)),h=l?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function i(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function um(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Yr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function dm(s,e,t,n){const i={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}d.removeEventListener("dispose",a),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function c(h){const d=h.attributes;for(const g in d)e.update(d[g],s.ARRAY_BUFFER);const f=h.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],s.ARRAY_BUFFER)}}function l(h){const d=[],f=h.index,g=h.attributes.position;let _=0;if(f!==null){const x=f.array;_=f.version;for(let y=0,b=x.length;y<b;y+=3){const L=x[y+0],w=x[y+1],C=x[y+2];d.push(L,w,w,C,C,L)}}else if(g!==void 0){const x=g.array;_=g.version;for(let y=0,b=x.length/3-1;y<b;y+=3){const L=y+0,w=y+1,C=y+2;d.push(L,w,w,C,C,L)}}else return;const m=new(Ph(d)?Uh:Nh)(d,1);m.version=_;const p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function fm(s,e,t){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){s.drawElements(n,f,r,d*a),t.update(f,n,1)}function l(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*a,g),t.update(f,n,g))}function u(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function h(d,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let x=0;x<g;x++)p+=f[x]*_[x];t.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function pm(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function mm(s,e,t){const n=new WeakMap,i=new ln;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let v=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",v)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let y=0;f===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let b=o.attributes.position.count*y,L=1;b>e.maxTextureSize&&(L=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const w=new Float32Array(b*L*4*h),C=new Ih(w,b,L,h);C.type=1015,C.needsUpdate=!0;const E=y*4;for(let M=0;M<h;M++){const P=m[M],G=p[M],O=x[M],q=b*L*4*M;for(let ie=0;ie<P.count;ie++){const D=ie*E;f===!0&&(i.fromBufferAttribute(P,ie),w[q+D+0]=i.x,w[q+D+1]=i.y,w[q+D+2]=i.z,w[q+D+3]=0),g===!0&&(i.fromBufferAttribute(G,ie),w[q+D+4]=i.x,w[q+D+5]=i.y,w[q+D+6]=i.z,w[q+D+7]=0),_===!0&&(i.fromBufferAttribute(O,ie),w[q+D+8]=i.x,w[q+D+9]=i.y,w[q+D+10]=i.z,w[q+D+11]=O.itemSize===4?i.w:1)}}d={count:h,texture:C,size:new We(b,L)},n.set(o,d),o.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];const g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(s,"morphTargetBaseInfluence",g),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function gm(s,e,t,n){let i=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(i.get(h)!==l&&(e.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return h}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}class Gh extends Gn{constructor(e,t,n,i,r,a,o,c,l,u=1026){if(u!==1026&&u!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===1026&&(n=1014),n===void 0&&u===1027&&(n=1020),super(null,i,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:1003,this.minFilter=c!==void 0?c:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Hh=new Gn,bl=new Gh(1,1),Vh=new Ih,Wh=new td,Xh=new kh,_l=[],xl=[],vl=new Float32Array(16),yl=new Float32Array(9),Ml=new Float32Array(4);function wr(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=_l[i];if(r===void 0&&(r=new Float32Array(i),_l[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Vn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Wn(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function oo(s,e){let t=xl[e];t===void 0&&(t=new Int32Array(e),xl[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function bm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function _m(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vn(t,e))return;s.uniform2fv(this.addr,e),Wn(t,e)}}function xm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vn(t,e))return;s.uniform3fv(this.addr,e),Wn(t,e)}}function vm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vn(t,e))return;s.uniform4fv(this.addr,e),Wn(t,e)}}function ym(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Wn(t,e)}else{if(Vn(t,n))return;Ml.set(n),s.uniformMatrix2fv(this.addr,!1,Ml),Wn(t,n)}}function Mm(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Wn(t,e)}else{if(Vn(t,n))return;yl.set(n),s.uniformMatrix3fv(this.addr,!1,yl),Wn(t,n)}}function Sm(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Wn(t,e)}else{if(Vn(t,n))return;vl.set(n),s.uniformMatrix4fv(this.addr,!1,vl),Wn(t,n)}}function Em(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function wm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vn(t,e))return;s.uniform2iv(this.addr,e),Wn(t,e)}}function Am(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vn(t,e))return;s.uniform3iv(this.addr,e),Wn(t,e)}}function Tm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vn(t,e))return;s.uniform4iv(this.addr,e),Wn(t,e)}}function Rm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Cm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vn(t,e))return;s.uniform2uiv(this.addr,e),Wn(t,e)}}function Pm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vn(t,e))return;s.uniform3uiv(this.addr,e),Wn(t,e)}}function Lm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vn(t,e))return;s.uniform4uiv(this.addr,e),Wn(t,e)}}function Im(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(bl.compareFunction=515,r=bl):r=Hh,t.setTexture2D(e||r,i)}function Dm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Wh,i)}function Fm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Xh,i)}function Nm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Vh,i)}function Um(s){switch(s){case 5126:return bm;case 35664:return _m;case 35665:return xm;case 35666:return vm;case 35674:return ym;case 35675:return Mm;case 35676:return Sm;case 5124:case 35670:return Em;case 35667:case 35671:return wm;case 35668:case 35672:return Am;case 35669:case 35673:return Tm;case 5125:return Rm;case 36294:return Cm;case 36295:return Pm;case 36296:return Lm;case 35678:case 36198:case 36298:case 36306:case 35682:return Im;case 35679:case 36299:case 36307:return Dm;case 35680:case 36300:case 36308:case 36293:return Fm;case 36289:case 36303:case 36311:case 36292:return Nm}}function Om(s,e){s.uniform1fv(this.addr,e)}function Bm(s,e){const t=wr(e,this.size,2);s.uniform2fv(this.addr,t)}function km(s,e){const t=wr(e,this.size,3);s.uniform3fv(this.addr,t)}function zm(s,e){const t=wr(e,this.size,4);s.uniform4fv(this.addr,t)}function Gm(s,e){const t=wr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Hm(s,e){const t=wr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Vm(s,e){const t=wr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Wm(s,e){s.uniform1iv(this.addr,e)}function Xm(s,e){s.uniform2iv(this.addr,e)}function jm(s,e){s.uniform3iv(this.addr,e)}function qm(s,e){s.uniform4iv(this.addr,e)}function Ym(s,e){s.uniform1uiv(this.addr,e)}function Km(s,e){s.uniform2uiv(this.addr,e)}function Jm(s,e){s.uniform3uiv(this.addr,e)}function Zm(s,e){s.uniform4uiv(this.addr,e)}function Qm(s,e,t){const n=this.cache,i=e.length,r=oo(t,i);Vn(n,r)||(s.uniform1iv(this.addr,r),Wn(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Hh,r[a])}function $m(s,e,t){const n=this.cache,i=e.length,r=oo(t,i);Vn(n,r)||(s.uniform1iv(this.addr,r),Wn(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Wh,r[a])}function eg(s,e,t){const n=this.cache,i=e.length,r=oo(t,i);Vn(n,r)||(s.uniform1iv(this.addr,r),Wn(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Xh,r[a])}function tg(s,e,t){const n=this.cache,i=e.length,r=oo(t,i);Vn(n,r)||(s.uniform1iv(this.addr,r),Wn(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Vh,r[a])}function ng(s){switch(s){case 5126:return Om;case 35664:return Bm;case 35665:return km;case 35666:return zm;case 35674:return Gm;case 35675:return Hm;case 35676:return Vm;case 5124:case 35670:return Wm;case 35667:case 35671:return Xm;case 35668:case 35672:return jm;case 35669:case 35673:return qm;case 5125:return Ym;case 36294:return Km;case 36295:return Jm;case 36296:return Zm;case 35678:case 36198:case 36298:case 36306:case 35682:return Qm;case 35679:case 36299:case 36307:return $m;case 35680:case 36300:case 36308:case 36293:return eg;case 36289:case 36303:case 36311:case 36292:return tg}}class ig{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Um(t.type)}}class sg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ng(t.type)}}class rg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const ko=/(\w+)(\])?(\[|\.)?/g;function Sl(s,e){s.seq.push(e),s.map[e.id]=e}function ag(s,e,t){const n=s.name,i=n.length;for(ko.lastIndex=0;;){const r=ko.exec(n),a=ko.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){Sl(t,l===void 0?new ig(o,s,e):new sg(o,s,e));break}else{let h=t.map[o];h===void 0&&(h=new rg(o),Sl(t,h)),t=h}}}class Ka{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);ag(r,a,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function El(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const og=37297;let cg=0;function lg(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const wl=new Vt;function hg(s){cn._getMatrix(wl,cn.workingColorSpace,s);const e=`mat3( ${wl.elements.map(t=>t.toFixed(4))} )`;switch(cn.getTransfer(s)){case so:return[e,"LinearTransferOETF"];case vn:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Al(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+lg(s.getShaderSource(e),a)}else return i}function ug(s,e){const t=hg(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function dg(s,e){let t;switch(e){case 1:t="Linear";break;case 2:t="Reinhard";break;case 3:t="Cineon";break;case 4:t="ACESFilmic";break;case 6:t="AgX";break;case 7:t="Neutral";break;case 5:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ra=new I;function fg(){cn.getLuminanceCoefficients(Ra);const s=Ra.x.toFixed(4),e=Ra.y.toFixed(4),t=Ra.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function pg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Kr).join(`
`)}function mg(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function gg(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Kr(s){return s!==""}function Tl(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Rl(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const bg=/^[ \t]*#include +<([\w\d./]+)>/gm;function hc(s){return s.replace(bg,xg)}const _g=new Map;function xg(s,e){let t=Xt[e];if(t===void 0){const n=_g.get(e);if(n!==void 0)t=Xt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return hc(t)}const vg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cl(s){return s.replace(vg,yg)}function yg(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Pl(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Mg(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===1?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===2?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===3&&(e="SHADOWMAP_TYPE_VSM"),e}function Sg(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case 301:case 302:e="ENVMAP_TYPE_CUBE";break;case 306:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Eg(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case 302:e="ENVMAP_MODE_REFRACTION";break}return e}function wg(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case 0:e="ENVMAP_BLENDING_MULTIPLY";break;case 1:e="ENVMAP_BLENDING_MIX";break;case 2:e="ENVMAP_BLENDING_ADD";break}return e}function Ag(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Tg(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Mg(t),l=Sg(t),u=Eg(t),h=wg(t),d=Ag(t),f=pg(t),g=mg(r),_=i.createProgram();let m,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Kr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Kr).join(`
`),p.length>0&&(p+=`
`)):(m=[Pl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Kr).join(`
`),p=[Pl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?Xt.tonemapping_pars_fragment:"",t.toneMapping!==0?dg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,ug("linearToOutputTexel",t.outputColorSpace),fg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Kr).join(`
`)),a=hc(a),a=Tl(a,t),a=Rl(a,t),o=hc(o),o=Tl(o,t),o=Rl(o,t),a=Cl(a),o=Cl(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Hc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Hc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=x+m+a,b=x+p+o,L=El(i,i.VERTEX_SHADER,y),w=El(i,i.FRAGMENT_SHADER,b);i.attachShader(_,L),i.attachShader(_,w),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function C(P){if(s.debug.checkShaderErrors){const G=i.getProgramInfoLog(_).trim(),O=i.getShaderInfoLog(L).trim(),q=i.getShaderInfoLog(w).trim();let ie=!0,D=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(ie=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,L,w);else{const X=Al(i,L,"vertex"),k=Al(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+G+`
`+X+`
`+k)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(O===""||q==="")&&(D=!1);D&&(P.diagnostics={runnable:ie,programLog:G,vertexShader:{log:O,prefix:m},fragmentShader:{log:q,prefix:p}})}i.deleteShader(L),i.deleteShader(w),E=new Ka(i,_),v=gg(i,_)}let E;this.getUniforms=function(){return E===void 0&&C(this),E};let v;this.getAttributes=function(){return v===void 0&&C(this),v};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,og)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=cg++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=L,this.fragmentShader=w,this}let Rg=0;class Cg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Pg(e),t.set(e,n)),n}}class Pg{constructor(e){this.id=Rg++,this.code=e,this.usedTimes=0}}function Lg(s,e,t,n,i,r,a){const o=new Dh,c=new Cg,l=new Set,u=[],h=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return l.add(v),v===0?"uv":`uv${v}`}function m(v,M,P,G,O){const q=G.fog,ie=O.geometry,D=v.isMeshStandardMaterial?G.environment:null,X=(v.isMeshStandardMaterial?t:e).get(v.envMap||D),k=X&&X.mapping===306?X.image.height:null,le=g[v.type];v.precision!==null&&(f=i.getMaxPrecision(v.precision),f!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const K=ie.morphAttributes.position||ie.morphAttributes.normal||ie.morphAttributes.color,Z=K!==void 0?K.length:0;let xe=0;ie.morphAttributes.position!==void 0&&(xe=1),ie.morphAttributes.normal!==void 0&&(xe=2),ie.morphAttributes.color!==void 0&&(xe=3);let Ce,te,fe,De;if(le){const Wt=ji[le];Ce=Wt.vertexShader,te=Wt.fragmentShader}else Ce=v.vertexShader,te=v.fragmentShader,c.update(v),fe=c.getVertexShaderID(v),De=c.getFragmentShaderID(v);const _e=s.getRenderTarget(),ot=s.state.buffers.depth.getReversed(),rt=O.isInstancedMesh===!0,_t=O.isBatchedMesh===!0,vt=!!v.map,yt=!!v.matcap,At=!!X,H=!!v.aoMap,tn=!!v.lightMap,Ct=!!v.bumpMap,ht=!!v.normalMap,lt=!!v.displacementMap,an=!!v.emissiveMap,ce=!!v.metalnessMap,R=!!v.roughnessMap,S=v.anisotropy>0,B=v.clearcoat>0,se=v.dispersion>0,de=v.iridescence>0,re=v.sheen>0,Fe=v.transmission>0,ve=S&&!!v.anisotropyMap,Pe=B&&!!v.clearcoatMap,Pt=B&&!!v.clearcoatNormalMap,Se=B&&!!v.clearcoatRoughnessMap,ze=de&&!!v.iridescenceMap,nt=de&&!!v.iridescenceThicknessMap,dt=re&&!!v.sheenColorMap,Ke=re&&!!v.sheenRoughnessMap,Gt=!!v.specularMap,Tt=!!v.specularColorMap,jt=!!v.specularIntensityMap,V=Fe&&!!v.transmissionMap,Re=Fe&&!!v.thicknessMap,ue=!!v.gradientMap,ge=!!v.alphaMap,Oe=v.alphaTest>0,Ge=!!v.alphaHash,Xe=!!v.extensions;let nn=0;v.toneMapped&&(_e===null||_e.isXRRenderTarget===!0)&&(nn=s.toneMapping);const Tn={shaderID:le,shaderType:v.type,shaderName:v.name,vertexShader:Ce,fragmentShader:te,defines:v.defines,customVertexShaderID:fe,customFragmentShaderID:De,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:_t,batchingColor:_t&&O._colorsTexture!==null,instancing:rt,instancingColor:rt&&O.instanceColor!==null,instancingMorph:rt&&O.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:_e===null?s.outputColorSpace:_e.isXRRenderTarget===!0?_e.texture.colorSpace:mi,alphaToCoverage:!!v.alphaToCoverage,map:vt,matcap:yt,envMap:At,envMapMode:At&&X.mapping,envMapCubeUVHeight:k,aoMap:H,lightMap:tn,bumpMap:Ct,normalMap:ht,displacementMap:d&&lt,emissiveMap:an,normalMapObjectSpace:ht&&v.normalMapType===1,normalMapTangentSpace:ht&&v.normalMapType===0,metalnessMap:ce,roughnessMap:R,anisotropy:S,anisotropyMap:ve,clearcoat:B,clearcoatMap:Pe,clearcoatNormalMap:Pt,clearcoatRoughnessMap:Se,dispersion:se,iridescence:de,iridescenceMap:ze,iridescenceThicknessMap:nt,sheen:re,sheenColorMap:dt,sheenRoughnessMap:Ke,specularMap:Gt,specularColorMap:Tt,specularIntensityMap:jt,transmission:Fe,transmissionMap:V,thicknessMap:Re,gradientMap:ue,opaque:v.transparent===!1&&v.blending===1&&v.alphaToCoverage===!1,alphaMap:ge,alphaTest:Oe,alphaHash:Ge,combine:v.combine,mapUv:vt&&_(v.map.channel),aoMapUv:H&&_(v.aoMap.channel),lightMapUv:tn&&_(v.lightMap.channel),bumpMapUv:Ct&&_(v.bumpMap.channel),normalMapUv:ht&&_(v.normalMap.channel),displacementMapUv:lt&&_(v.displacementMap.channel),emissiveMapUv:an&&_(v.emissiveMap.channel),metalnessMapUv:ce&&_(v.metalnessMap.channel),roughnessMapUv:R&&_(v.roughnessMap.channel),anisotropyMapUv:ve&&_(v.anisotropyMap.channel),clearcoatMapUv:Pe&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:Pt&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:ze&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:nt&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:Ke&&_(v.sheenRoughnessMap.channel),specularMapUv:Gt&&_(v.specularMap.channel),specularColorMapUv:Tt&&_(v.specularColorMap.channel),specularIntensityMapUv:jt&&_(v.specularIntensityMap.channel),transmissionMapUv:V&&_(v.transmissionMap.channel),thicknessMapUv:Re&&_(v.thicknessMap.channel),alphaMapUv:ge&&_(v.alphaMap.channel),vertexTangents:!!ie.attributes.tangent&&(ht||S),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!ie.attributes.color&&ie.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!ie.attributes.uv&&(vt||ge),fog:!!q,useFog:v.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:ot,skinning:O.isSkinnedMesh===!0,morphTargets:ie.morphAttributes.position!==void 0,morphNormals:ie.morphAttributes.normal!==void 0,morphColors:ie.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:xe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:nn,decodeVideoTexture:vt&&v.map.isVideoTexture===!0&&cn.getTransfer(v.map.colorSpace)===vn,decodeVideoTextureEmissive:an&&v.emissiveMap.isVideoTexture===!0&&cn.getTransfer(v.emissiveMap.colorSpace)===vn,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===2,flipSided:v.side===1,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Xe&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xe&&v.extensions.multiDraw===!0||_t)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Tn.vertexUv1s=l.has(1),Tn.vertexUv2s=l.has(2),Tn.vertexUv3s=l.has(3),l.clear(),Tn}function p(v){const M=[];if(v.shaderID?M.push(v.shaderID):(M.push(v.customVertexShaderID),M.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)M.push(P),M.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(x(M,v),y(M,v),M.push(s.outputColorSpace)),M.push(v.customProgramCacheKey),M.join()}function x(v,M){v.push(M.precision),v.push(M.outputColorSpace),v.push(M.envMapMode),v.push(M.envMapCubeUVHeight),v.push(M.mapUv),v.push(M.alphaMapUv),v.push(M.lightMapUv),v.push(M.aoMapUv),v.push(M.bumpMapUv),v.push(M.normalMapUv),v.push(M.displacementMapUv),v.push(M.emissiveMapUv),v.push(M.metalnessMapUv),v.push(M.roughnessMapUv),v.push(M.anisotropyMapUv),v.push(M.clearcoatMapUv),v.push(M.clearcoatNormalMapUv),v.push(M.clearcoatRoughnessMapUv),v.push(M.iridescenceMapUv),v.push(M.iridescenceThicknessMapUv),v.push(M.sheenColorMapUv),v.push(M.sheenRoughnessMapUv),v.push(M.specularMapUv),v.push(M.specularColorMapUv),v.push(M.specularIntensityMapUv),v.push(M.transmissionMapUv),v.push(M.thicknessMapUv),v.push(M.combine),v.push(M.fogExp2),v.push(M.sizeAttenuation),v.push(M.morphTargetsCount),v.push(M.morphAttributeCount),v.push(M.numDirLights),v.push(M.numPointLights),v.push(M.numSpotLights),v.push(M.numSpotLightMaps),v.push(M.numHemiLights),v.push(M.numRectAreaLights),v.push(M.numDirLightShadows),v.push(M.numPointLightShadows),v.push(M.numSpotLightShadows),v.push(M.numSpotLightShadowsWithMaps),v.push(M.numLightProbes),v.push(M.shadowMapType),v.push(M.toneMapping),v.push(M.numClippingPlanes),v.push(M.numClipIntersection),v.push(M.depthPacking)}function y(v,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),v.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),v.push(o.mask)}function b(v){const M=g[v.type];let P;if(M){const G=ji[M];P=fd.clone(G.uniforms)}else P=v.uniforms;return P}function L(v,M){let P;for(let G=0,O=u.length;G<O;G++){const q=u[G];if(q.cacheKey===M){P=q,++P.usedTimes;break}}return P===void 0&&(P=new Tg(s,M,v,r),u.push(P)),P}function w(v){if(--v.usedTimes===0){const M=u.indexOf(v);u[M]=u[u.length-1],u.pop(),v.destroy()}}function C(v){c.remove(v)}function E(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:b,acquireProgram:L,releaseProgram:w,releaseShaderCache:C,programs:u,dispose:E}}function Ig(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Dg(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Ll(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Il(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(h,d,f,g,_,m){let p=s[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},s[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),e++,p}function o(h,d,f,g,_,m){const p=a(h,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function c(h,d,f,g,_,m){const p=a(h,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function l(h,d){t.length>1&&t.sort(h||Dg),n.length>1&&n.sort(d||Ll),i.length>1&&i.sort(d||Ll)}function u(){for(let h=e,d=s.length;h<d;h++){const f=s[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:c,finish:u,sort:l}}function Fg(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new Il,s.set(n,[a])):i>=r.length?(a=new Il,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Ng(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new st};break;case"SpotLight":t={position:new I,direction:new I,color:new st,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new st,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new st,groundColor:new st};break;case"RectAreaLight":t={color:new st,position:new I,halfWidth:new I,halfHeight:new I};break}return s[e.id]=t,t}}}function Ug(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Og=0;function Bg(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function kg(s){const e=new Ng,t=Ug(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);const i=new I,r=new tt,a=new tt;function o(l){let u=0,h=0,d=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,x=0,y=0,b=0,L=0,w=0,C=0;l.sort(Bg);for(let v=0,M=l.length;v<M;v++){const P=l[v],G=P.color,O=P.intensity,q=P.distance,ie=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=G.r*O,h+=G.g*O,d+=G.b*O;else if(P.isLightProbe){for(let D=0;D<9;D++)n.probe[D].addScaledVector(P.sh.coefficients[D],O);C++}else if(P.isDirectionalLight){const D=e.get(P);if(D.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const X=P.shadow,k=t.get(P);k.shadowIntensity=X.intensity,k.shadowBias=X.bias,k.shadowNormalBias=X.normalBias,k.shadowRadius=X.radius,k.shadowMapSize=X.mapSize,n.directionalShadow[f]=k,n.directionalShadowMap[f]=ie,n.directionalShadowMatrix[f]=P.shadow.matrix,x++}n.directional[f]=D,f++}else if(P.isSpotLight){const D=e.get(P);D.position.setFromMatrixPosition(P.matrixWorld),D.color.copy(G).multiplyScalar(O),D.distance=q,D.coneCos=Math.cos(P.angle),D.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),D.decay=P.decay,n.spot[_]=D;const X=P.shadow;if(P.map&&(n.spotLightMap[L]=P.map,L++,X.updateMatrices(P),P.castShadow&&w++),n.spotLightMatrix[_]=X.matrix,P.castShadow){const k=t.get(P);k.shadowIntensity=X.intensity,k.shadowBias=X.bias,k.shadowNormalBias=X.normalBias,k.shadowRadius=X.radius,k.shadowMapSize=X.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=ie,b++}_++}else if(P.isRectAreaLight){const D=e.get(P);D.color.copy(G).multiplyScalar(O),D.halfWidth.set(P.width*.5,0,0),D.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=D,m++}else if(P.isPointLight){const D=e.get(P);if(D.color.copy(P.color).multiplyScalar(P.intensity),D.distance=P.distance,D.decay=P.decay,P.castShadow){const X=P.shadow,k=t.get(P);k.shadowIntensity=X.intensity,k.shadowBias=X.bias,k.shadowNormalBias=X.normalBias,k.shadowRadius=X.radius,k.shadowMapSize=X.mapSize,k.shadowCameraNear=X.camera.near,k.shadowCameraFar=X.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=ie,n.pointShadowMatrix[g]=P.shadow.matrix,y++}n.point[g]=D,g++}else if(P.isHemisphereLight){const D=e.get(P);D.skyColor.copy(P.color).multiplyScalar(O),D.groundColor.copy(P.groundColor).multiplyScalar(O),n.hemi[p]=D,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ye.LTC_FLOAT_1,n.rectAreaLTC2=Ye.LTC_FLOAT_2):(n.rectAreaLTC1=Ye.LTC_HALF_1,n.rectAreaLTC2=Ye.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const E=n.hash;(E.directionalLength!==f||E.pointLength!==g||E.spotLength!==_||E.rectAreaLength!==m||E.hemiLength!==p||E.numDirectionalShadows!==x||E.numPointShadows!==y||E.numSpotShadows!==b||E.numSpotMaps!==L||E.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=b+L-w,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=C,E.directionalLength=f,E.pointLength=g,E.spotLength=_,E.rectAreaLength=m,E.hemiLength=p,E.numDirectionalShadows=x,E.numPointShadows=y,E.numSpotShadows=b,E.numSpotMaps=L,E.numLightProbes=C,n.version=Og++)}function c(l,u){let h=0,d=0,f=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,x=l.length;p<x;p++){const y=l[p];if(y.isDirectionalLight){const b=n.directional[h];b.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(m),h++}else if(y.isSpotLight){const b=n.spot[f];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(m),f++}else if(y.isRectAreaLight){const b=n.rectArea[g];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(m),a.identity(),r.copy(y.matrixWorld),r.premultiply(m),a.extractRotation(r),b.halfWidth.set(y.width*.5,0,0),b.halfHeight.set(0,y.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){const b=n.point[d];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){const b=n.hemi[_];b.direction.setFromMatrixPosition(y.matrixWorld),b.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:n}}function Dl(s){const e=new kg(s),t=[],n=[];function i(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function zg(s){let e=new WeakMap;function t(i,r=0){const a=e.get(i);let o;return a===void 0?(o=new Dl(s),e.set(i,[o])):r>=a.length?(o=new Dl(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class Gg extends Di{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Hg extends Di{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Vg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Wg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Xg(s,e,t){let n=new wc;const i=new We,r=new We,a=new ln,o=new Gg({depthPacking:3201}),c=new Hg,l={},u=t.maxTextureSize,h={0:1,1:0,2:2},d=new Ds({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:Vg,fragmentShader:Wg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Sn;g.setAttribute("position",new fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ve(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let p=this.type;this.render=function(w,C,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const v=s.getRenderTarget(),M=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),G=s.state;G.setBlending(0),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const O=p!==3&&this.type===3,q=p===3&&this.type!==3;for(let ie=0,D=w.length;ie<D;ie++){const X=w[ie],k=X.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);const le=k.getFrameExtents();if(i.multiply(le),r.copy(k.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/le.x),i.x=r.x*le.x,k.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/le.y),i.y=r.y*le.y,k.mapSize.y=r.y)),k.map===null||O===!0||q===!0){const Z=this.type!==3?{minFilter:1003,magFilter:1003}:{};k.map!==null&&k.map.dispose(),k.map=new Is(i.x,i.y,Z),k.map.texture.name=X.name+".shadowMap",k.camera.updateProjectionMatrix()}s.setRenderTarget(k.map),s.clear();const K=k.getViewportCount();for(let Z=0;Z<K;Z++){const xe=k.getViewport(Z);a.set(r.x*xe.x,r.y*xe.y,r.x*xe.z,r.y*xe.w),G.viewport(a),k.updateMatrices(X,Z),n=k.getFrustum(),b(C,E,k.camera,X,this.type)}k.isPointLightShadow!==!0&&this.type===3&&x(k,E),k.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(v,M,P)};function x(w,C){const E=e.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Is(i.x,i.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(C,null,E,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(C,null,E,f,_,null)}function y(w,C,E,v){let M=null;const P=E.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)M=P;else if(M=E.isPointLight===!0?c:o,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const G=M.uuid,O=C.uuid;let q=l[G];q===void 0&&(q={},l[G]=q);let ie=q[O];ie===void 0&&(ie=M.clone(),q[O]=ie,C.addEventListener("dispose",L)),M=ie}if(M.visible=C.visible,M.wireframe=C.wireframe,v===3?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:h[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,E.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const G=s.properties.get(M);G.light=E}return M}function b(w,C,E,v,M){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===3)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,w.matrixWorld);const O=e.update(w),q=w.material;if(Array.isArray(q)){const ie=O.groups;for(let D=0,X=ie.length;D<X;D++){const k=ie[D],le=q[k.materialIndex];if(le&&le.visible){const K=y(w,le,v,M);w.onBeforeShadow(s,w,C,E,O,K,k),s.renderBufferDirect(E,null,O,K,w,k),w.onAfterShadow(s,w,C,E,O,K,k)}}}else if(q.visible){const ie=y(w,q,v,M);w.onBeforeShadow(s,w,C,E,O,ie,null),s.renderBufferDirect(E,null,O,ie,w,null),w.onAfterShadow(s,w,C,E,O,ie,null)}}const G=w.children;for(let O=0,q=G.length;O<q;O++)b(G[O],C,E,v,M)}function L(w){w.target.removeEventListener("dispose",L);for(const E in l){const v=l[E],M=w.target.uuid;M in v&&(v[M].dispose(),delete v[M])}}}const jg={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function qg(s,e){function t(){let V=!1;const Re=new ln;let ue=null;const ge=new ln(0,0,0,0);return{setMask:function(Oe){ue!==Oe&&!V&&(s.colorMask(Oe,Oe,Oe,Oe),ue=Oe)},setLocked:function(Oe){V=Oe},setClear:function(Oe,Ge,Xe,nn,Tn){Tn===!0&&(Oe*=nn,Ge*=nn,Xe*=nn),Re.set(Oe,Ge,Xe,nn),ge.equals(Re)===!1&&(s.clearColor(Oe,Ge,Xe,nn),ge.copy(Re))},reset:function(){V=!1,ue=null,ge.set(-1,0,0,0)}}}function n(){let V=!1,Re=!1,ue=null,ge=null,Oe=null;return{setReversed:function(Ge){if(Re!==Ge){const Xe=e.get("EXT_clip_control");Re?Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.ZERO_TO_ONE_EXT):Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.NEGATIVE_ONE_TO_ONE_EXT);const nn=Oe;Oe=null,this.setClear(nn)}Re=Ge},getReversed:function(){return Re},setTest:function(Ge){Ge?_e(s.DEPTH_TEST):ot(s.DEPTH_TEST)},setMask:function(Ge){ue!==Ge&&!V&&(s.depthMask(Ge),ue=Ge)},setFunc:function(Ge){if(Re&&(Ge=jg[Ge]),ge!==Ge){switch(Ge){case 0:s.depthFunc(s.NEVER);break;case 1:s.depthFunc(s.ALWAYS);break;case 2:s.depthFunc(s.LESS);break;case 3:s.depthFunc(s.LEQUAL);break;case 4:s.depthFunc(s.EQUAL);break;case 5:s.depthFunc(s.GEQUAL);break;case 6:s.depthFunc(s.GREATER);break;case 7:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ge=Ge}},setLocked:function(Ge){V=Ge},setClear:function(Ge){Oe!==Ge&&(Re&&(Ge=1-Ge),s.clearDepth(Ge),Oe=Ge)},reset:function(){V=!1,ue=null,ge=null,Oe=null,Re=!1}}}function i(){let V=!1,Re=null,ue=null,ge=null,Oe=null,Ge=null,Xe=null,nn=null,Tn=null;return{setTest:function(Wt){V||(Wt?_e(s.STENCIL_TEST):ot(s.STENCIL_TEST))},setMask:function(Wt){Re!==Wt&&!V&&(s.stencilMask(Wt),Re=Wt)},setFunc:function(Wt,pe,Nn){(ue!==Wt||ge!==pe||Oe!==Nn)&&(s.stencilFunc(Wt,pe,Nn),ue=Wt,ge=pe,Oe=Nn)},setOp:function(Wt,pe,Nn){(Ge!==Wt||Xe!==pe||nn!==Nn)&&(s.stencilOp(Wt,pe,Nn),Ge=Wt,Xe=pe,nn=Nn)},setLocked:function(Wt){V=Wt},setClear:function(Wt){Tn!==Wt&&(s.clearStencil(Wt),Tn=Wt)},reset:function(){V=!1,Re=null,ue=null,ge=null,Oe=null,Ge=null,Xe=null,nn=null,Tn=null}}}const r=new t,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let u={},h={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,x=null,y=null,b=null,L=null,w=null,C=new st(0,0,0),E=0,v=!1,M=null,P=null,G=null,O=null,q=null;const ie=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let D=!1,X=0;const k=s.getParameter(s.VERSION);k.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(k)[1]),D=X>=1):k.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),D=X>=2);let le=null,K={};const Z=s.getParameter(s.SCISSOR_BOX),xe=s.getParameter(s.VIEWPORT),Ce=new ln().fromArray(Z),te=new ln().fromArray(xe);function fe(V,Re,ue,ge){const Oe=new Uint8Array(4),Ge=s.createTexture();s.bindTexture(V,Ge),s.texParameteri(V,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(V,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Xe=0;Xe<ue;Xe++)V===s.TEXTURE_3D||V===s.TEXTURE_2D_ARRAY?s.texImage3D(Re,0,s.RGBA,1,1,ge,0,s.RGBA,s.UNSIGNED_BYTE,Oe):s.texImage2D(Re+Xe,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Oe);return Ge}const De={};De[s.TEXTURE_2D]=fe(s.TEXTURE_2D,s.TEXTURE_2D,1),De[s.TEXTURE_CUBE_MAP]=fe(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),De[s.TEXTURE_2D_ARRAY]=fe(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),De[s.TEXTURE_3D]=fe(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),_e(s.DEPTH_TEST),a.setFunc(3),Ct(!1),ht(1),_e(s.CULL_FACE),H(0);function _e(V){u[V]!==!0&&(s.enable(V),u[V]=!0)}function ot(V){u[V]!==!1&&(s.disable(V),u[V]=!1)}function rt(V,Re){return h[V]!==Re?(s.bindFramebuffer(V,Re),h[V]=Re,V===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=Re),V===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=Re),!0):!1}function _t(V,Re){let ue=f,ge=!1;if(V){ue=d.get(Re),ue===void 0&&(ue=[],d.set(Re,ue));const Oe=V.textures;if(ue.length!==Oe.length||ue[0]!==s.COLOR_ATTACHMENT0){for(let Ge=0,Xe=Oe.length;Ge<Xe;Ge++)ue[Ge]=s.COLOR_ATTACHMENT0+Ge;ue.length=Oe.length,ge=!0}}else ue[0]!==s.BACK&&(ue[0]=s.BACK,ge=!0);ge&&s.drawBuffers(ue)}function vt(V){return g!==V?(s.useProgram(V),g=V,!0):!1}const yt={100:s.FUNC_ADD,101:s.FUNC_SUBTRACT,102:s.FUNC_REVERSE_SUBTRACT};yt[103]=s.MIN,yt[104]=s.MAX;const At={200:s.ZERO,201:s.ONE,202:s.SRC_COLOR,204:s.SRC_ALPHA,210:s.SRC_ALPHA_SATURATE,208:s.DST_COLOR,206:s.DST_ALPHA,203:s.ONE_MINUS_SRC_COLOR,205:s.ONE_MINUS_SRC_ALPHA,209:s.ONE_MINUS_DST_COLOR,207:s.ONE_MINUS_DST_ALPHA,211:s.CONSTANT_COLOR,212:s.ONE_MINUS_CONSTANT_COLOR,213:s.CONSTANT_ALPHA,214:s.ONE_MINUS_CONSTANT_ALPHA};function H(V,Re,ue,ge,Oe,Ge,Xe,nn,Tn,Wt){if(V===0){_===!0&&(ot(s.BLEND),_=!1);return}if(_===!1&&(_e(s.BLEND),_=!0),V!==5){if(V!==m||Wt!==v){if((p!==100||b!==100)&&(s.blendEquation(s.FUNC_ADD),p=100,b=100),Wt)switch(V){case 1:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case 2:s.blendFunc(s.ONE,s.ONE);break;case 3:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case 4:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case 1:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case 2:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case 3:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case 4:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}x=null,y=null,L=null,w=null,C.set(0,0,0),E=0,m=V,v=Wt}return}Oe=Oe||Re,Ge=Ge||ue,Xe=Xe||ge,(Re!==p||Oe!==b)&&(s.blendEquationSeparate(yt[Re],yt[Oe]),p=Re,b=Oe),(ue!==x||ge!==y||Ge!==L||Xe!==w)&&(s.blendFuncSeparate(At[ue],At[ge],At[Ge],At[Xe]),x=ue,y=ge,L=Ge,w=Xe),(nn.equals(C)===!1||Tn!==E)&&(s.blendColor(nn.r,nn.g,nn.b,Tn),C.copy(nn),E=Tn),m=V,v=!1}function tn(V,Re){V.side===2?ot(s.CULL_FACE):_e(s.CULL_FACE);let ue=V.side===1;Re&&(ue=!ue),Ct(ue),V.blending===1&&V.transparent===!1?H(0):H(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),a.setFunc(V.depthFunc),a.setTest(V.depthTest),a.setMask(V.depthWrite),r.setMask(V.colorWrite);const ge=V.stencilWrite;o.setTest(ge),ge&&(o.setMask(V.stencilWriteMask),o.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),o.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),an(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?_e(s.SAMPLE_ALPHA_TO_COVERAGE):ot(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ct(V){M!==V&&(V?s.frontFace(s.CW):s.frontFace(s.CCW),M=V)}function ht(V){V!==0?(_e(s.CULL_FACE),V!==P&&(V===1?s.cullFace(s.BACK):V===2?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ot(s.CULL_FACE),P=V}function lt(V){V!==G&&(D&&s.lineWidth(V),G=V)}function an(V,Re,ue){V?(_e(s.POLYGON_OFFSET_FILL),(O!==Re||q!==ue)&&(s.polygonOffset(Re,ue),O=Re,q=ue)):ot(s.POLYGON_OFFSET_FILL)}function ce(V){V?_e(s.SCISSOR_TEST):ot(s.SCISSOR_TEST)}function R(V){V===void 0&&(V=s.TEXTURE0+ie-1),le!==V&&(s.activeTexture(V),le=V)}function S(V,Re,ue){ue===void 0&&(le===null?ue=s.TEXTURE0+ie-1:ue=le);let ge=K[ue];ge===void 0&&(ge={type:void 0,texture:void 0},K[ue]=ge),(ge.type!==V||ge.texture!==Re)&&(le!==ue&&(s.activeTexture(ue),le=ue),s.bindTexture(V,Re||De[V]),ge.type=V,ge.texture=Re)}function B(){const V=K[le];V!==void 0&&V.type!==void 0&&(s.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function se(){try{s.compressedTexImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function de(){try{s.compressedTexImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function re(){try{s.texSubImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Fe(){try{s.texSubImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ve(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Pe(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Pt(){try{s.texStorage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Se(){try{s.texStorage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ze(){try{s.texImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function nt(){try{s.texImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function dt(V){Ce.equals(V)===!1&&(s.scissor(V.x,V.y,V.z,V.w),Ce.copy(V))}function Ke(V){te.equals(V)===!1&&(s.viewport(V.x,V.y,V.z,V.w),te.copy(V))}function Gt(V,Re){let ue=l.get(Re);ue===void 0&&(ue=new WeakMap,l.set(Re,ue));let ge=ue.get(V);ge===void 0&&(ge=s.getUniformBlockIndex(Re,V.name),ue.set(V,ge))}function Tt(V,Re){const ge=l.get(Re).get(V);c.get(Re)!==ge&&(s.uniformBlockBinding(Re,ge,V.__bindingPointIndex),c.set(Re,ge))}function jt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},le=null,K={},h={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,x=null,y=null,b=null,L=null,w=null,C=new st(0,0,0),E=0,v=!1,M=null,P=null,G=null,O=null,q=null,Ce.set(0,0,s.canvas.width,s.canvas.height),te.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:_e,disable:ot,bindFramebuffer:rt,drawBuffers:_t,useProgram:vt,setBlending:H,setMaterial:tn,setFlipSided:Ct,setCullFace:ht,setLineWidth:lt,setPolygonOffset:an,setScissorTest:ce,activeTexture:R,bindTexture:S,unbindTexture:B,compressedTexImage2D:se,compressedTexImage3D:de,texImage2D:ze,texImage3D:nt,updateUBOMapping:Gt,uniformBlockBinding:Tt,texStorage2D:Pt,texStorage3D:Se,texSubImage2D:re,texSubImage3D:Fe,compressedTexSubImage2D:ve,compressedTexSubImage3D:Pe,scissor:dt,viewport:Ke,reset:jt}}function Fl(s,e,t,n){const i=Yg(n);switch(t){case 1021:return s*e;case 1024:return s*e;case 1025:return s*e*2;case 1028:return s*e/i.components*i.byteLength;case 1029:return s*e/i.components*i.byteLength;case 1030:return s*e*2/i.components*i.byteLength;case 1031:return s*e*2/i.components*i.byteLength;case 1022:return s*e*3/i.components*i.byteLength;case 1023:return s*e*4/i.components*i.byteLength;case 1033:return s*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(s,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(s,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case 37496:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case 37808:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(s/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(s/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Yg(s){switch(s){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function Kg(s,e,t,n,i,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new We,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,S){return f?new OffscreenCanvas(R,S):na("canvas")}function _(R,S,B){let se=1;const de=ce(R);if((de.width>B||de.height>B)&&(se=B/Math.max(de.width,de.height)),se<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const re=Math.floor(se*de.width),Fe=Math.floor(se*de.height);h===void 0&&(h=g(re,Fe));const ve=S?g(re,Fe):h;return ve.width=re,ve.height=Fe,ve.getContext("2d").drawImage(R,0,0,re,Fe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+de.width+"x"+de.height+") to ("+re+"x"+Fe+")."),ve}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+de.width+"x"+de.height+")."),R;return R}function m(R){return R.generateMipmaps}function p(R){s.generateMipmap(R)}function x(R){return R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?s.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(R,S,B,se,de=!1){if(R!==null){if(s[R]!==void 0)return s[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let re=S;if(S===s.RED&&(B===s.FLOAT&&(re=s.R32F),B===s.HALF_FLOAT&&(re=s.R16F),B===s.UNSIGNED_BYTE&&(re=s.R8)),S===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(re=s.R8UI),B===s.UNSIGNED_SHORT&&(re=s.R16UI),B===s.UNSIGNED_INT&&(re=s.R32UI),B===s.BYTE&&(re=s.R8I),B===s.SHORT&&(re=s.R16I),B===s.INT&&(re=s.R32I)),S===s.RG&&(B===s.FLOAT&&(re=s.RG32F),B===s.HALF_FLOAT&&(re=s.RG16F),B===s.UNSIGNED_BYTE&&(re=s.RG8)),S===s.RG_INTEGER&&(B===s.UNSIGNED_BYTE&&(re=s.RG8UI),B===s.UNSIGNED_SHORT&&(re=s.RG16UI),B===s.UNSIGNED_INT&&(re=s.RG32UI),B===s.BYTE&&(re=s.RG8I),B===s.SHORT&&(re=s.RG16I),B===s.INT&&(re=s.RG32I)),S===s.RGB_INTEGER&&(B===s.UNSIGNED_BYTE&&(re=s.RGB8UI),B===s.UNSIGNED_SHORT&&(re=s.RGB16UI),B===s.UNSIGNED_INT&&(re=s.RGB32UI),B===s.BYTE&&(re=s.RGB8I),B===s.SHORT&&(re=s.RGB16I),B===s.INT&&(re=s.RGB32I)),S===s.RGBA_INTEGER&&(B===s.UNSIGNED_BYTE&&(re=s.RGBA8UI),B===s.UNSIGNED_SHORT&&(re=s.RGBA16UI),B===s.UNSIGNED_INT&&(re=s.RGBA32UI),B===s.BYTE&&(re=s.RGBA8I),B===s.SHORT&&(re=s.RGBA16I),B===s.INT&&(re=s.RGBA32I)),S===s.RGB&&B===s.UNSIGNED_INT_5_9_9_9_REV&&(re=s.RGB9_E5),S===s.RGBA){const Fe=de?so:cn.getTransfer(se);B===s.FLOAT&&(re=s.RGBA32F),B===s.HALF_FLOAT&&(re=s.RGBA16F),B===s.UNSIGNED_BYTE&&(re=Fe===vn?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT_4_4_4_4&&(re=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(re=s.RGB5_A1)}return(re===s.R16F||re===s.R32F||re===s.RG16F||re===s.RG32F||re===s.RGBA16F||re===s.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function b(R,S){let B;return R?S===null||S===1014||S===1020?B=s.DEPTH24_STENCIL8:S===1015?B=s.DEPTH32F_STENCIL8:S===1012&&(B=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===1014||S===1020?B=s.DEPTH_COMPONENT24:S===1015?B=s.DEPTH_COMPONENT32F:S===1012&&(B=s.DEPTH_COMPONENT16),B}function L(R,S){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==1003&&R.minFilter!==1006?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function w(R){const S=R.target;S.removeEventListener("dispose",w),E(S),S.isVideoTexture&&u.delete(S)}function C(R){const S=R.target;S.removeEventListener("dispose",C),M(S)}function E(R){const S=n.get(R);if(S.__webglInit===void 0)return;const B=R.source,se=d.get(B);if(se){const de=se[S.__cacheKey];de.usedTimes--,de.usedTimes===0&&v(R),Object.keys(se).length===0&&d.delete(B)}n.remove(R)}function v(R){const S=n.get(R);s.deleteTexture(S.__webglTexture);const B=R.source,se=d.get(B);delete se[S.__cacheKey],a.memory.textures--}function M(R){const S=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(S.__webglFramebuffer[se]))for(let de=0;de<S.__webglFramebuffer[se].length;de++)s.deleteFramebuffer(S.__webglFramebuffer[se][de]);else s.deleteFramebuffer(S.__webglFramebuffer[se]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[se])}else{if(Array.isArray(S.__webglFramebuffer))for(let se=0;se<S.__webglFramebuffer.length;se++)s.deleteFramebuffer(S.__webglFramebuffer[se]);else s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let se=0;se<S.__webglColorRenderbuffer.length;se++)S.__webglColorRenderbuffer[se]&&s.deleteRenderbuffer(S.__webglColorRenderbuffer[se]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const B=R.textures;for(let se=0,de=B.length;se<de;se++){const re=n.get(B[se]);re.__webglTexture&&(s.deleteTexture(re.__webglTexture),a.memory.textures--),n.remove(B[se])}n.remove(R)}let P=0;function G(){P=0}function O(){const R=P;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),P+=1,R}function q(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function ie(R,S){const B=n.get(R);if(R.isVideoTexture&&lt(R),R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){const se=R.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{te(B,R,S);return}}t.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+S)}function D(R,S){const B=n.get(R);if(R.version>0&&B.__version!==R.version){te(B,R,S);return}t.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+S)}function X(R,S){const B=n.get(R);if(R.version>0&&B.__version!==R.version){te(B,R,S);return}t.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+S)}function k(R,S){const B=n.get(R);if(R.version>0&&B.__version!==R.version){fe(B,R,S);return}t.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+S)}const le={1e3:s.REPEAT,1001:s.CLAMP_TO_EDGE,1002:s.MIRRORED_REPEAT},K={1003:s.NEAREST,1004:s.NEAREST_MIPMAP_NEAREST,1005:s.NEAREST_MIPMAP_LINEAR,1006:s.LINEAR,1007:s.LINEAR_MIPMAP_NEAREST,1008:s.LINEAR_MIPMAP_LINEAR},Z={512:s.NEVER,519:s.ALWAYS,513:s.LESS,515:s.LEQUAL,514:s.EQUAL,518:s.GEQUAL,516:s.GREATER,517:s.NOTEQUAL};function xe(R,S){if(S.type===1015&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===1006||S.magFilter===1007||S.magFilter===1005||S.magFilter===1008||S.minFilter===1006||S.minFilter===1007||S.minFilter===1005||S.minFilter===1008)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,le[S.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,le[S.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,le[S.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,K[S.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,K[S.minFilter]),S.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,Z[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===1003||S.minFilter!==1005&&S.minFilter!==1008||S.type===1015&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");s.texParameterf(R,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Ce(R,S){let B=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",w));const se=S.source;let de=d.get(se);de===void 0&&(de={},d.set(se,de));const re=q(S);if(re!==R.__cacheKey){de[re]===void 0&&(de[re]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,B=!0),de[re].usedTimes++;const Fe=de[R.__cacheKey];Fe!==void 0&&(de[R.__cacheKey].usedTimes--,Fe.usedTimes===0&&v(S)),R.__cacheKey=re,R.__webglTexture=de[re].texture}return B}function te(R,S,B){let se=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(se=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(se=s.TEXTURE_3D);const de=Ce(R,S),re=S.source;t.bindTexture(se,R.__webglTexture,s.TEXTURE0+B);const Fe=n.get(re);if(re.version!==Fe.__version||de===!0){t.activeTexture(s.TEXTURE0+B);const ve=cn.getPrimaries(cn.workingColorSpace),Pe=S.colorSpace===""?null:cn.getPrimaries(S.colorSpace),Pt=S.colorSpace===""||ve===Pe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);let Se=_(S.image,!1,i.maxTextureSize);Se=an(S,Se);const ze=r.convert(S.format,S.colorSpace),nt=r.convert(S.type);let dt=y(S.internalFormat,ze,nt,S.colorSpace,S.isVideoTexture);xe(se,S);let Ke;const Gt=S.mipmaps,Tt=S.isVideoTexture!==!0,jt=Fe.__version===void 0||de===!0,V=re.dataReady,Re=L(S,Se);if(S.isDepthTexture)dt=b(S.format===1027,S.type),jt&&(Tt?t.texStorage2D(s.TEXTURE_2D,1,dt,Se.width,Se.height):t.texImage2D(s.TEXTURE_2D,0,dt,Se.width,Se.height,0,ze,nt,null));else if(S.isDataTexture)if(Gt.length>0){Tt&&jt&&t.texStorage2D(s.TEXTURE_2D,Re,dt,Gt[0].width,Gt[0].height);for(let ue=0,ge=Gt.length;ue<ge;ue++)Ke=Gt[ue],Tt?V&&t.texSubImage2D(s.TEXTURE_2D,ue,0,0,Ke.width,Ke.height,ze,nt,Ke.data):t.texImage2D(s.TEXTURE_2D,ue,dt,Ke.width,Ke.height,0,ze,nt,Ke.data);S.generateMipmaps=!1}else Tt?(jt&&t.texStorage2D(s.TEXTURE_2D,Re,dt,Se.width,Se.height),V&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Se.width,Se.height,ze,nt,Se.data)):t.texImage2D(s.TEXTURE_2D,0,dt,Se.width,Se.height,0,ze,nt,Se.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Tt&&jt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Re,dt,Gt[0].width,Gt[0].height,Se.depth);for(let ue=0,ge=Gt.length;ue<ge;ue++)if(Ke=Gt[ue],S.format!==1023)if(ze!==null)if(Tt){if(V)if(S.layerUpdates.size>0){const Oe=Fl(Ke.width,Ke.height,S.format,S.type);for(const Ge of S.layerUpdates){const Xe=Ke.data.subarray(Ge*Oe/Ke.data.BYTES_PER_ELEMENT,(Ge+1)*Oe/Ke.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ue,0,0,Ge,Ke.width,Ke.height,1,ze,Xe)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ue,0,0,0,Ke.width,Ke.height,Se.depth,ze,Ke.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ue,dt,Ke.width,Ke.height,Se.depth,0,Ke.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Tt?V&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,ue,0,0,0,Ke.width,Ke.height,Se.depth,ze,nt,Ke.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ue,dt,Ke.width,Ke.height,Se.depth,0,ze,nt,Ke.data)}else{Tt&&jt&&t.texStorage2D(s.TEXTURE_2D,Re,dt,Gt[0].width,Gt[0].height);for(let ue=0,ge=Gt.length;ue<ge;ue++)Ke=Gt[ue],S.format!==1023?ze!==null?Tt?V&&t.compressedTexSubImage2D(s.TEXTURE_2D,ue,0,0,Ke.width,Ke.height,ze,Ke.data):t.compressedTexImage2D(s.TEXTURE_2D,ue,dt,Ke.width,Ke.height,0,Ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Tt?V&&t.texSubImage2D(s.TEXTURE_2D,ue,0,0,Ke.width,Ke.height,ze,nt,Ke.data):t.texImage2D(s.TEXTURE_2D,ue,dt,Ke.width,Ke.height,0,ze,nt,Ke.data)}else if(S.isDataArrayTexture)if(Tt){if(jt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Re,dt,Se.width,Se.height,Se.depth),V)if(S.layerUpdates.size>0){const ue=Fl(Se.width,Se.height,S.format,S.type);for(const ge of S.layerUpdates){const Oe=Se.data.subarray(ge*ue/Se.data.BYTES_PER_ELEMENT,(ge+1)*ue/Se.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ge,Se.width,Se.height,1,ze,nt,Oe)}S.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Se.width,Se.height,Se.depth,ze,nt,Se.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,dt,Se.width,Se.height,Se.depth,0,ze,nt,Se.data);else if(S.isData3DTexture)Tt?(jt&&t.texStorage3D(s.TEXTURE_3D,Re,dt,Se.width,Se.height,Se.depth),V&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Se.width,Se.height,Se.depth,ze,nt,Se.data)):t.texImage3D(s.TEXTURE_3D,0,dt,Se.width,Se.height,Se.depth,0,ze,nt,Se.data);else if(S.isFramebufferTexture){if(jt)if(Tt)t.texStorage2D(s.TEXTURE_2D,Re,dt,Se.width,Se.height);else{let ue=Se.width,ge=Se.height;for(let Oe=0;Oe<Re;Oe++)t.texImage2D(s.TEXTURE_2D,Oe,dt,ue,ge,0,ze,nt,null),ue>>=1,ge>>=1}}else if(Gt.length>0){if(Tt&&jt){const ue=ce(Gt[0]);t.texStorage2D(s.TEXTURE_2D,Re,dt,ue.width,ue.height)}for(let ue=0,ge=Gt.length;ue<ge;ue++)Ke=Gt[ue],Tt?V&&t.texSubImage2D(s.TEXTURE_2D,ue,0,0,ze,nt,Ke):t.texImage2D(s.TEXTURE_2D,ue,dt,ze,nt,Ke);S.generateMipmaps=!1}else if(Tt){if(jt){const ue=ce(Se);t.texStorage2D(s.TEXTURE_2D,Re,dt,ue.width,ue.height)}V&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ze,nt,Se)}else t.texImage2D(s.TEXTURE_2D,0,dt,ze,nt,Se);m(S)&&p(se),Fe.__version=re.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function fe(R,S,B){if(S.image.length!==6)return;const se=Ce(R,S),de=S.source;t.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+B);const re=n.get(de);if(de.version!==re.__version||se===!0){t.activeTexture(s.TEXTURE0+B);const Fe=cn.getPrimaries(cn.workingColorSpace),ve=S.colorSpace===""?null:cn.getPrimaries(S.colorSpace),Pe=S.colorSpace===""||Fe===ve?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);const Pt=S.isCompressedTexture||S.image[0].isCompressedTexture,Se=S.image[0]&&S.image[0].isDataTexture,ze=[];for(let ge=0;ge<6;ge++)!Pt&&!Se?ze[ge]=_(S.image[ge],!0,i.maxCubemapSize):ze[ge]=Se?S.image[ge].image:S.image[ge],ze[ge]=an(S,ze[ge]);const nt=ze[0],dt=r.convert(S.format,S.colorSpace),Ke=r.convert(S.type),Gt=y(S.internalFormat,dt,Ke,S.colorSpace),Tt=S.isVideoTexture!==!0,jt=re.__version===void 0||se===!0,V=de.dataReady;let Re=L(S,nt);xe(s.TEXTURE_CUBE_MAP,S);let ue;if(Pt){Tt&&jt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Re,Gt,nt.width,nt.height);for(let ge=0;ge<6;ge++){ue=ze[ge].mipmaps;for(let Oe=0;Oe<ue.length;Oe++){const Ge=ue[Oe];S.format!==1023?dt!==null?Tt?V&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Oe,0,0,Ge.width,Ge.height,dt,Ge.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Oe,Gt,Ge.width,Ge.height,0,Ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Tt?V&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Oe,0,0,Ge.width,Ge.height,dt,Ke,Ge.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Oe,Gt,Ge.width,Ge.height,0,dt,Ke,Ge.data)}}}else{if(ue=S.mipmaps,Tt&&jt){ue.length>0&&Re++;const ge=ce(ze[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Re,Gt,ge.width,ge.height)}for(let ge=0;ge<6;ge++)if(Se){Tt?V&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,ze[ge].width,ze[ge].height,dt,Ke,ze[ge].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,Gt,ze[ge].width,ze[ge].height,0,dt,Ke,ze[ge].data);for(let Oe=0;Oe<ue.length;Oe++){const Xe=ue[Oe].image[ge].image;Tt?V&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Oe+1,0,0,Xe.width,Xe.height,dt,Ke,Xe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Oe+1,Gt,Xe.width,Xe.height,0,dt,Ke,Xe.data)}}else{Tt?V&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,dt,Ke,ze[ge]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,Gt,dt,Ke,ze[ge]);for(let Oe=0;Oe<ue.length;Oe++){const Ge=ue[Oe];Tt?V&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Oe+1,0,0,dt,Ke,Ge.image[ge]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Oe+1,Gt,dt,Ke,Ge.image[ge])}}}m(S)&&p(s.TEXTURE_CUBE_MAP),re.__version=de.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function De(R,S,B,se,de,re){const Fe=r.convert(B.format,B.colorSpace),ve=r.convert(B.type),Pe=y(B.internalFormat,Fe,ve,B.colorSpace),Pt=n.get(S),Se=n.get(B);if(Se.__renderTarget=S,!Pt.__hasExternalTextures){const ze=Math.max(1,S.width>>re),nt=Math.max(1,S.height>>re);de===s.TEXTURE_3D||de===s.TEXTURE_2D_ARRAY?t.texImage3D(de,re,Pe,ze,nt,S.depth,0,Fe,ve,null):t.texImage2D(de,re,Pe,ze,nt,0,Fe,ve,null)}t.bindFramebuffer(s.FRAMEBUFFER,R),ht(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,se,de,Se.__webglTexture,0,Ct(S)):(de===s.TEXTURE_2D||de>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&de<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,se,de,Se.__webglTexture,re),t.bindFramebuffer(s.FRAMEBUFFER,null)}function _e(R,S,B){if(s.bindRenderbuffer(s.RENDERBUFFER,R),S.depthBuffer){const se=S.depthTexture,de=se&&se.isDepthTexture?se.type:null,re=b(S.stencilBuffer,de),Fe=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ve=Ct(S);ht(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ve,re,S.width,S.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,ve,re,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,re,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Fe,s.RENDERBUFFER,R)}else{const se=S.textures;for(let de=0;de<se.length;de++){const re=se[de],Fe=r.convert(re.format,re.colorSpace),ve=r.convert(re.type),Pe=y(re.internalFormat,Fe,ve,re.colorSpace),Pt=Ct(S);B&&ht(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Pt,Pe,S.width,S.height):ht(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Pt,Pe,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,Pe,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ot(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const se=n.get(S.depthTexture);se.__renderTarget=S,(!se.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),ie(S.depthTexture,0);const de=se.__webglTexture,re=Ct(S);if(S.depthTexture.format===1026)ht(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,de,0,re):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,de,0);else if(S.depthTexture.format===1027)ht(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,de,0,re):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,de,0);else throw new Error("Unknown depthTexture format")}function rt(R){const S=n.get(R),B=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){const se=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),se){const de=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,se.removeEventListener("dispose",de)};se.addEventListener("dispose",de),S.__depthDisposeCallback=de}S.__boundDepthTexture=se}if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");ot(S.__webglFramebuffer,R)}else if(B){S.__webglDepthbuffer=[];for(let se=0;se<6;se++)if(t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[se]),S.__webglDepthbuffer[se]===void 0)S.__webglDepthbuffer[se]=s.createRenderbuffer(),_e(S.__webglDepthbuffer[se],R,!1);else{const de=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,re=S.__webglDepthbuffer[se];s.bindRenderbuffer(s.RENDERBUFFER,re),s.framebufferRenderbuffer(s.FRAMEBUFFER,de,s.RENDERBUFFER,re)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=s.createRenderbuffer(),_e(S.__webglDepthbuffer,R,!1);else{const se=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,de=S.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,de),s.framebufferRenderbuffer(s.FRAMEBUFFER,se,s.RENDERBUFFER,de)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function _t(R,S,B){const se=n.get(R);S!==void 0&&De(se.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&rt(R)}function vt(R){const S=R.texture,B=n.get(R),se=n.get(S);R.addEventListener("dispose",C);const de=R.textures,re=R.isWebGLCubeRenderTarget===!0,Fe=de.length>1;if(Fe||(se.__webglTexture===void 0&&(se.__webglTexture=s.createTexture()),se.__version=S.version,a.memory.textures++),re){B.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer[ve]=[];for(let Pe=0;Pe<S.mipmaps.length;Pe++)B.__webglFramebuffer[ve][Pe]=s.createFramebuffer()}else B.__webglFramebuffer[ve]=s.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer=[];for(let ve=0;ve<S.mipmaps.length;ve++)B.__webglFramebuffer[ve]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(Fe)for(let ve=0,Pe=de.length;ve<Pe;ve++){const Pt=n.get(de[ve]);Pt.__webglTexture===void 0&&(Pt.__webglTexture=s.createTexture(),a.memory.textures++)}if(R.samples>0&&ht(R)===!1){B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ve=0;ve<de.length;ve++){const Pe=de[ve];B.__webglColorRenderbuffer[ve]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[ve]);const Pt=r.convert(Pe.format,Pe.colorSpace),Se=r.convert(Pe.type),ze=y(Pe.internalFormat,Pt,Se,Pe.colorSpace,R.isXRRenderTarget===!0),nt=Ct(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,nt,ze,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.RENDERBUFFER,B.__webglColorRenderbuffer[ve])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),_e(B.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(re){t.bindTexture(s.TEXTURE_CUBE_MAP,se.__webglTexture),xe(s.TEXTURE_CUBE_MAP,S);for(let ve=0;ve<6;ve++)if(S.mipmaps&&S.mipmaps.length>0)for(let Pe=0;Pe<S.mipmaps.length;Pe++)De(B.__webglFramebuffer[ve][Pe],R,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Pe);else De(B.__webglFramebuffer[ve],R,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);m(S)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Fe){for(let ve=0,Pe=de.length;ve<Pe;ve++){const Pt=de[ve],Se=n.get(Pt);t.bindTexture(s.TEXTURE_2D,Se.__webglTexture),xe(s.TEXTURE_2D,Pt),De(B.__webglFramebuffer,R,Pt,s.COLOR_ATTACHMENT0+ve,s.TEXTURE_2D,0),m(Pt)&&p(s.TEXTURE_2D)}t.unbindTexture()}else{let ve=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ve=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ve,se.__webglTexture),xe(ve,S),S.mipmaps&&S.mipmaps.length>0)for(let Pe=0;Pe<S.mipmaps.length;Pe++)De(B.__webglFramebuffer[Pe],R,S,s.COLOR_ATTACHMENT0,ve,Pe);else De(B.__webglFramebuffer,R,S,s.COLOR_ATTACHMENT0,ve,0);m(S)&&p(ve),t.unbindTexture()}R.depthBuffer&&rt(R)}function yt(R){const S=R.textures;for(let B=0,se=S.length;B<se;B++){const de=S[B];if(m(de)){const re=x(R),Fe=n.get(de).__webglTexture;t.bindTexture(re,Fe),p(re),t.unbindTexture()}}}const At=[],H=[];function tn(R){if(R.samples>0){if(ht(R)===!1){const S=R.textures,B=R.width,se=R.height;let de=s.COLOR_BUFFER_BIT;const re=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Fe=n.get(R),ve=S.length>1;if(ve)for(let Pe=0;Pe<S.length;Pe++)t.bindFramebuffer(s.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Pe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Fe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Pe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer);for(let Pe=0;Pe<S.length;Pe++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(de|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(de|=s.STENCIL_BUFFER_BIT)),ve){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Fe.__webglColorRenderbuffer[Pe]);const Pt=n.get(S[Pe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Pt,0)}s.blitFramebuffer(0,0,B,se,0,0,B,se,de,s.NEAREST),c===!0&&(At.length=0,H.length=0,At.push(s.COLOR_ATTACHMENT0+Pe),R.depthBuffer&&R.resolveDepthBuffer===!1&&(At.push(re),H.push(re),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,H)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,At))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ve)for(let Pe=0;Pe<S.length;Pe++){t.bindFramebuffer(s.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Pe,s.RENDERBUFFER,Fe.__webglColorRenderbuffer[Pe]);const Pt=n.get(S[Pe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Fe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Pe,s.TEXTURE_2D,Pt,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const S=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function Ct(R){return Math.min(i.maxSamples,R.samples)}function ht(R){const S=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function lt(R){const S=a.render.frame;u.get(R)!==S&&(u.set(R,S),R.update())}function an(R,S){const B=R.colorSpace,se=R.format,de=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||B!==mi&&B!==""&&(cn.getTransfer(B)===vn?(se!==1023||de!==1009)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),S}function ce(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=O,this.resetTextureUnits=G,this.setTexture2D=ie,this.setTexture2DArray=D,this.setTexture3D=X,this.setTextureCube=k,this.rebindTextures=_t,this.setupRenderTarget=vt,this.updateRenderTargetMipmap=yt,this.updateMultisampleRenderTarget=tn,this.setupDepthRenderbuffer=rt,this.setupFrameBufferTexture=De,this.useMultisampledRTT=ht}function Jg(s,e){function t(n,i=""){let r;const a=cn.getTransfer(i);if(n===1009)return s.UNSIGNED_BYTE;if(n===1017)return s.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return s.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===1010)return s.BYTE;if(n===1011)return s.SHORT;if(n===1012)return s.UNSIGNED_SHORT;if(n===1013)return s.INT;if(n===1014)return s.UNSIGNED_INT;if(n===1015)return s.FLOAT;if(n===1016)return s.HALF_FLOAT;if(n===1021)return s.ALPHA;if(n===1022)return s.RGB;if(n===1023)return s.RGBA;if(n===1024)return s.LUMINANCE;if(n===1025)return s.LUMINANCE_ALPHA;if(n===1026)return s.DEPTH_COMPONENT;if(n===1027)return s.DEPTH_STENCIL;if(n===1028)return s.RED;if(n===1029)return s.RED_INTEGER;if(n===1030)return s.RG;if(n===1031)return s.RG_INTEGER;if(n===1033)return s.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===vn)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===33776)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===33776)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===35840)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===36196||n===37492)return a===vn?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===37496)return a===vn?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===37808)return a===vn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===vn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===vn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===vn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===vn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===vn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===vn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===vn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===vn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===vn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===vn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===vn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===vn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===vn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===36492)return a===vn?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===36492)return r.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class Zg extends vi{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class mt extends Pn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Qg={type:"move"};class zo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Qg)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new mt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const $g=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,e0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class t0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Gn,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ds({vertexShader:$g,fragmentShader:e0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ve(new Qn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class n0 extends Ks{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,d=null,f=null,g=null;const _=new t0,m=t.getContextAttributes();let p=null,x=null;const y=[],b=[],L=new We;let w=null;const C=new vi;C.viewport=new ln;const E=new vi;E.viewport=new ln;const v=[C,E],M=new Zg;let P=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let fe=y[te];return fe===void 0&&(fe=new zo,y[te]=fe),fe.getTargetRaySpace()},this.getControllerGrip=function(te){let fe=y[te];return fe===void 0&&(fe=new zo,y[te]=fe),fe.getGripSpace()},this.getHand=function(te){let fe=y[te];return fe===void 0&&(fe=new zo,y[te]=fe),fe.getHandSpace()};function O(te){const fe=b.indexOf(te.inputSource);if(fe===-1)return;const De=y[fe];De!==void 0&&(De.update(te.inputSource,te.frame,l||a),De.dispatchEvent({type:te.type,data:te.inputSource}))}function q(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",q),i.removeEventListener("inputsourceschange",ie);for(let te=0;te<y.length;te++){const fe=b[te];fe!==null&&(b[te]=null,y[te].disconnect(fe))}P=null,G=null,_.reset(),e.setRenderTarget(p),f=null,d=null,h=null,i=null,x=null,Ce.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){r=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){o=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(te){l=te},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(te){if(i=te,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",q),i.addEventListener("inputsourceschange",ie),m.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(L),i.renderState.layers===void 0){const fe={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,fe),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Is(f.framebufferWidth,f.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let fe=null,De=null,_e=null;m.depth&&(_e=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=m.stencil?1027:1026,De=m.stencil?1020:1014);const ot={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:r};h=new XRWebGLBinding(i,t),d=h.createProjectionLayer(ot),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Is(d.textureWidth,d.textureHeight,{format:1023,type:1009,depthTexture:new Gh(d.textureWidth,d.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Ce.setContext(i),Ce.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ie(te){for(let fe=0;fe<te.removed.length;fe++){const De=te.removed[fe],_e=b.indexOf(De);_e>=0&&(b[_e]=null,y[_e].disconnect(De))}for(let fe=0;fe<te.added.length;fe++){const De=te.added[fe];let _e=b.indexOf(De);if(_e===-1){for(let rt=0;rt<y.length;rt++)if(rt>=b.length){b.push(De),_e=rt;break}else if(b[rt]===null){b[rt]=De,_e=rt;break}if(_e===-1)break}const ot=y[_e];ot&&ot.connect(De)}}const D=new I,X=new I;function k(te,fe,De){D.setFromMatrixPosition(fe.matrixWorld),X.setFromMatrixPosition(De.matrixWorld);const _e=D.distanceTo(X),ot=fe.projectionMatrix.elements,rt=De.projectionMatrix.elements,_t=ot[14]/(ot[10]-1),vt=ot[14]/(ot[10]+1),yt=(ot[9]+1)/ot[5],At=(ot[9]-1)/ot[5],H=(ot[8]-1)/ot[0],tn=(rt[8]+1)/rt[0],Ct=_t*H,ht=_t*tn,lt=_e/(-H+tn),an=lt*-H;if(fe.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(an),te.translateZ(lt),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),ot[10]===-1)te.projectionMatrix.copy(fe.projectionMatrix),te.projectionMatrixInverse.copy(fe.projectionMatrixInverse);else{const ce=_t+lt,R=vt+lt,S=Ct-an,B=ht+(_e-an),se=yt*vt/R*ce,de=At*vt/R*ce;te.projectionMatrix.makePerspective(S,B,se,de,ce,R),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function le(te,fe){fe===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(fe.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(i===null)return;let fe=te.near,De=te.far;_.texture!==null&&(_.depthNear>0&&(fe=_.depthNear),_.depthFar>0&&(De=_.depthFar)),M.near=E.near=C.near=fe,M.far=E.far=C.far=De,(P!==M.near||G!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,G=M.far),C.layers.mask=te.layers.mask|2,E.layers.mask=te.layers.mask|4,M.layers.mask=C.layers.mask|E.layers.mask;const _e=te.parent,ot=M.cameras;le(M,_e);for(let rt=0;rt<ot.length;rt++)le(ot[rt],_e);ot.length===2?k(M,C,E):M.projectionMatrix.copy(C.projectionMatrix),K(te,M,_e)};function K(te,fe,De){De===null?te.matrix.copy(fe.matrixWorld):(te.matrix.copy(De.matrixWorld),te.matrix.invert(),te.matrix.multiply(fe.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(fe.projectionMatrix),te.projectionMatrixInverse.copy(fe.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=xr*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(te){c=te,d!==null&&(d.fixedFoveation=te),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=te)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let Z=null;function xe(te,fe){if(u=fe.getViewerPose(l||a),g=fe,u!==null){const De=u.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let _e=!1;De.length!==M.cameras.length&&(M.cameras.length=0,_e=!0);for(let rt=0;rt<De.length;rt++){const _t=De[rt];let vt=null;if(f!==null)vt=f.getViewport(_t);else{const At=h.getViewSubImage(d,_t);vt=At.viewport,rt===0&&(e.setRenderTargetTextures(x,At.colorTexture,d.ignoreDepthValues?void 0:At.depthStencilTexture),e.setRenderTarget(x))}let yt=v[rt];yt===void 0&&(yt=new vi,yt.layers.enable(rt),yt.viewport=new ln,v[rt]=yt),yt.matrix.fromArray(_t.transform.matrix),yt.matrix.decompose(yt.position,yt.quaternion,yt.scale),yt.projectionMatrix.fromArray(_t.projectionMatrix),yt.projectionMatrixInverse.copy(yt.projectionMatrix).invert(),yt.viewport.set(vt.x,vt.y,vt.width,vt.height),rt===0&&(M.matrix.copy(yt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),_e===!0&&M.cameras.push(yt)}const ot=i.enabledFeatures;if(ot&&ot.includes("depth-sensing")){const rt=h.getDepthInformation(De[0]);rt&&rt.isValid&&rt.texture&&_.init(e,rt,i.renderState)}}for(let De=0;De<y.length;De++){const _e=b[De],ot=y[De];_e!==null&&ot!==void 0&&ot.update(_e,fe,l||a)}Z&&Z(te,fe),fe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:fe}),g=null}const Ce=new zh;Ce.setAnimationLoop(xe),this.setAnimationLoop=function(te){Z=te},this.dispose=function(){}}}const zs=new Ci,i0=new tt;function s0(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Oh(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,x,y,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,b)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,x,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===1&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===1&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p),y=x.envMap,b=x.envMapRotation;y&&(m.envMap.value=y,zs.copy(b),zs.x*=-1,zs.y*=-1,zs.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(zs.y*=-1,zs.z*=-1),m.envMapRotation.value.setFromMatrix4(i0.makeRotationFromEuler(zs)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,x,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===1&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function r0(s,e,t,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,y){const b=y.program;n.uniformBlockBinding(x,b)}function l(x,y){let b=i[x.id];b===void 0&&(g(x),b=u(x),i[x.id]=b,x.addEventListener("dispose",m));const L=y.program;n.updateUBOMapping(x,L);const w=e.render.frame;r[x.id]!==w&&(d(x),r[x.id]=w)}function u(x){const y=h();x.__bindingPointIndex=y;const b=s.createBuffer(),L=x.__size,w=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,L,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,b),b}function h(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const y=i[x.id],b=x.uniforms,L=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let w=0,C=b.length;w<C;w++){const E=Array.isArray(b[w])?b[w]:[b[w]];for(let v=0,M=E.length;v<M;v++){const P=E[v];if(f(P,w,v,L)===!0){const G=P.__offset,O=Array.isArray(P.value)?P.value:[P.value];let q=0;for(let ie=0;ie<O.length;ie++){const D=O[ie],X=_(D);typeof D=="number"||typeof D=="boolean"?(P.__data[0]=D,s.bufferSubData(s.UNIFORM_BUFFER,G+q,P.__data)):D.isMatrix3?(P.__data[0]=D.elements[0],P.__data[1]=D.elements[1],P.__data[2]=D.elements[2],P.__data[3]=0,P.__data[4]=D.elements[3],P.__data[5]=D.elements[4],P.__data[6]=D.elements[5],P.__data[7]=0,P.__data[8]=D.elements[6],P.__data[9]=D.elements[7],P.__data[10]=D.elements[8],P.__data[11]=0):(D.toArray(P.__data,q),q+=X.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,G,P.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,y,b,L){const w=x.value,C=y+"_"+b;if(L[C]===void 0)return typeof w=="number"||typeof w=="boolean"?L[C]=w:L[C]=w.clone(),!0;{const E=L[C];if(typeof w=="number"||typeof w=="boolean"){if(E!==w)return L[C]=w,!0}else if(E.equals(w)===!1)return E.copy(w),!0}return!1}function g(x){const y=x.uniforms;let b=0;const L=16;for(let C=0,E=y.length;C<E;C++){const v=Array.isArray(y[C])?y[C]:[y[C]];for(let M=0,P=v.length;M<P;M++){const G=v[M],O=Array.isArray(G.value)?G.value:[G.value];for(let q=0,ie=O.length;q<ie;q++){const D=O[q],X=_(D),k=b%L,le=k%X.boundary,K=k+le;b+=le,K!==0&&L-K<X.storage&&(b+=L-K),G.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=b,b+=X.storage}}}const w=b%L;return w>0&&(b+=L-w),x.__size=b,x.__cache={},this}function _(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),y}function m(x){const y=x.target;y.removeEventListener("dispose",m);const b=a.indexOf(y.__bindingPointIndex);a.splice(b,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function p(){for(const x in i)s.deleteBuffer(i[x]);a=[],i={},r={}}return{bind:c,update:l,dispose:p}}class a0{constructor(e={}){const{canvas:t=qu(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const x=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=rn,this.toneMapping=0,this.toneMappingExposure=1;const b=this;let L=!1,w=0,C=0,E=null,v=-1,M=null;const P=new ln,G=new ln;let O=null;const q=new st(0);let ie=0,D=t.width,X=t.height,k=1,le=null,K=null;const Z=new ln(0,0,D,X),xe=new ln(0,0,D,X);let Ce=!1;const te=new wc;let fe=!1,De=!1;const _e=new tt,ot=new tt,rt=new I,_t=new ln,vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let yt=!1;function At(){return E===null?k:1}let H=n;function tn(T,W){return t.getContext(T,W)}try{const T={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r170"),t.addEventListener("webglcontextlost",ge,!1),t.addEventListener("webglcontextrestored",Oe,!1),t.addEventListener("webglcontextcreationerror",Ge,!1),H===null){const W="webgl2";if(H=tn(W,T),H===null)throw tn(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ct,ht,lt,an,ce,R,S,B,se,de,re,Fe,ve,Pe,Pt,Se,ze,nt,dt,Ke,Gt,Tt,jt,V;function Re(){Ct=new um(H),Ct.init(),Tt=new Jg(H,Ct),ht=new rm(H,Ct,e,Tt),lt=new qg(H,Ct),ht.reverseDepthBuffer&&d&&lt.buffers.depth.setReversed(!0),an=new pm(H),ce=new Ig,R=new Kg(H,Ct,lt,ce,ht,Tt,an),S=new om(b),B=new hm(b),se=new vd(H),jt=new im(H,se),de=new dm(H,se,an,jt),re=new gm(H,de,se,an),dt=new mm(H,ht,R),Se=new am(ce),Fe=new Lg(b,S,B,Ct,ht,jt,Se),ve=new s0(b,ce),Pe=new Fg,Pt=new zg(Ct),nt=new nm(b,S,B,lt,re,f,c),ze=new Xg(b,re,ht),V=new r0(H,an,ht,lt),Ke=new sm(H,Ct,an),Gt=new fm(H,Ct,an),an.programs=Fe.programs,b.capabilities=ht,b.extensions=Ct,b.properties=ce,b.renderLists=Pe,b.shadowMap=ze,b.state=lt,b.info=an}Re();const ue=new n0(b,H);this.xr=ue,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const T=Ct.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ct.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(T){T!==void 0&&(k=T,this.setSize(D,X,!1))},this.getSize=function(T){return T.set(D,X)},this.setSize=function(T,W,ae=!0){if(ue.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}D=T,X=W,t.width=Math.floor(T*k),t.height=Math.floor(W*k),ae===!0&&(t.style.width=T+"px",t.style.height=W+"px"),this.setViewport(0,0,T,W)},this.getDrawingBufferSize=function(T){return T.set(D*k,X*k).floor()},this.setDrawingBufferSize=function(T,W,ae){D=T,X=W,k=ae,t.width=Math.floor(T*ae),t.height=Math.floor(W*ae),this.setViewport(0,0,T,W)},this.getCurrentViewport=function(T){return T.copy(P)},this.getViewport=function(T){return T.copy(Z)},this.setViewport=function(T,W,ae,ee){T.isVector4?Z.set(T.x,T.y,T.z,T.w):Z.set(T,W,ae,ee),lt.viewport(P.copy(Z).multiplyScalar(k).round())},this.getScissor=function(T){return T.copy(xe)},this.setScissor=function(T,W,ae,ee){T.isVector4?xe.set(T.x,T.y,T.z,T.w):xe.set(T,W,ae,ee),lt.scissor(G.copy(xe).multiplyScalar(k).round())},this.getScissorTest=function(){return Ce},this.setScissorTest=function(T){lt.setScissorTest(Ce=T)},this.setOpaqueSort=function(T){le=T},this.setTransparentSort=function(T){K=T},this.getClearColor=function(T){return T.copy(nt.getClearColor())},this.setClearColor=function(){nt.setClearColor.apply(nt,arguments)},this.getClearAlpha=function(){return nt.getClearAlpha()},this.setClearAlpha=function(){nt.setClearAlpha.apply(nt,arguments)},this.clear=function(T=!0,W=!0,ae=!0){let ee=0;if(T){let j=!1;if(E!==null){const we=E.texture.format;j=we===1033||we===1031||we===1029}if(j){const we=E.texture.type,me=we===1009||we===1014||we===1012||we===1020||we===1017||we===1018,He=nt.getClearColor(),it=nt.getClearAlpha(),Mt=He.r,It=He.g,je=He.b;me?(g[0]=Mt,g[1]=It,g[2]=je,g[3]=it,H.clearBufferuiv(H.COLOR,0,g)):(_[0]=Mt,_[1]=It,_[2]=je,_[3]=it,H.clearBufferiv(H.COLOR,0,_))}else ee|=H.COLOR_BUFFER_BIT}W&&(ee|=H.DEPTH_BUFFER_BIT),ae&&(ee|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ge,!1),t.removeEventListener("webglcontextrestored",Oe,!1),t.removeEventListener("webglcontextcreationerror",Ge,!1),Pe.dispose(),Pt.dispose(),ce.dispose(),S.dispose(),B.dispose(),re.dispose(),jt.dispose(),V.dispose(),Fe.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",qn),ue.removeEventListener("sessionend",$n),Ln.stop()};function ge(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function Oe(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const T=an.autoReset,W=ze.enabled,ae=ze.autoUpdate,ee=ze.needsUpdate,j=ze.type;Re(),an.autoReset=T,ze.enabled=W,ze.autoUpdate=ae,ze.needsUpdate=ee,ze.type=j}function Ge(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Xe(T){const W=T.target;W.removeEventListener("dispose",Xe),nn(W)}function nn(T){Tn(T),ce.remove(T)}function Tn(T){const W=ce.get(T).programs;W!==void 0&&(W.forEach(function(ae){Fe.releaseProgram(ae)}),T.isShaderMaterial&&Fe.releaseShaderCache(T))}this.renderBufferDirect=function(T,W,ae,ee,j,we){W===null&&(W=vt);const me=j.isMesh&&j.matrixWorld.determinant()<0,He=Un(T,W,ae,ee,j);lt.setMaterial(ee,me);let it=ae.index,Mt=1;if(ee.wireframe===!0){if(it=de.getWireframeAttribute(ae),it===void 0)return;Mt=2}const It=ae.drawRange,je=ae.attributes.position;let Ht=It.start*Mt,qt=(It.start+It.count)*Mt;we!==null&&(Ht=Math.max(Ht,we.start*Mt),qt=Math.min(qt,(we.start+we.count)*Mt)),it!==null?(Ht=Math.max(Ht,0),qt=Math.min(qt,it.count)):je!=null&&(Ht=Math.max(Ht,0),qt=Math.min(qt,je.count));const Ut=qt-Ht;if(Ut<0||Ut===1/0)return;jt.setup(j,ee,He,ae,it);let Je,$t=Ke;if(it!==null&&(Je=se.get(it),$t=Gt,$t.setIndex(Je)),j.isMesh)ee.wireframe===!0?(lt.setLineWidth(ee.wireframeLinewidth*At()),$t.setMode(H.LINES)):$t.setMode(H.TRIANGLES);else if(j.isLine){let Be=ee.linewidth;Be===void 0&&(Be=1),lt.setLineWidth(Be*At()),j.isLineSegments?$t.setMode(H.LINES):j.isLineLoop?$t.setMode(H.LINE_LOOP):$t.setMode(H.LINE_STRIP)}else j.isPoints?$t.setMode(H.POINTS):j.isSprite&&$t.setMode(H.TRIANGLES);if(j.isBatchedMesh)if(j._multiDrawInstances!==null)$t.renderMultiDrawInstances(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount,j._multiDrawInstances);else if(Ct.get("WEBGL_multi_draw"))$t.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{const Be=j._multiDrawStarts,kt=j._multiDrawCounts,Ot=j._multiDrawCount,Yt=it?se.get(it).bytesPerElement:1,Kt=ce.get(ee).currentProgram.getUniforms();for(let Rn=0;Rn<Ot;Rn++)Kt.setValue(H,"_gl_DrawID",Rn),$t.render(Be[Rn]/Yt,kt[Rn])}else if(j.isInstancedMesh)$t.renderInstances(Ht,Ut,j.count);else if(ae.isInstancedBufferGeometry){const Be=ae._maxInstanceCount!==void 0?ae._maxInstanceCount:1/0,kt=Math.min(ae.instanceCount,Be);$t.renderInstances(Ht,Ut,kt)}else $t.render(Ht,Ut)};function Wt(T,W,ae){T.transparent===!0&&T.side===2&&T.forceSinglePass===!1?(T.side=1,T.needsUpdate=!0,bn(T,W,ae),T.side=0,T.needsUpdate=!0,bn(T,W,ae),T.side=2):bn(T,W,ae)}this.compile=function(T,W,ae=null){ae===null&&(ae=T),p=Pt.get(ae),p.init(W),y.push(p),ae.traverseVisible(function(j){j.isLight&&j.layers.test(W.layers)&&(p.pushLight(j),j.castShadow&&p.pushShadow(j))}),T!==ae&&T.traverseVisible(function(j){j.isLight&&j.layers.test(W.layers)&&(p.pushLight(j),j.castShadow&&p.pushShadow(j))}),p.setupLights();const ee=new Set;return T.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;const we=j.material;if(we)if(Array.isArray(we))for(let me=0;me<we.length;me++){const He=we[me];Wt(He,ae,j),ee.add(He)}else Wt(we,ae,j),ee.add(we)}),y.pop(),p=null,ee},this.compileAsync=function(T,W,ae=null){const ee=this.compile(T,W,ae);return new Promise(j=>{function we(){if(ee.forEach(function(me){ce.get(me).currentProgram.isReady()&&ee.delete(me)}),ee.size===0){j(T);return}setTimeout(we,10)}Ct.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let pe=null;function Nn(T){pe&&pe(T)}function qn(){Ln.stop()}function $n(){Ln.start()}const Ln=new zh;Ln.setAnimationLoop(Nn),typeof self<"u"&&Ln.setContext(self),this.setAnimationLoop=function(T){pe=T,ue.setAnimationLoop(T),T===null?Ln.stop():Ln.start()},ue.addEventListener("sessionstart",qn),ue.addEventListener("sessionend",$n),this.render=function(T,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(ue.cameraAutoUpdate===!0&&ue.updateCamera(W),W=ue.getCamera()),T.isScene===!0&&T.onBeforeRender(b,T,W,E),p=Pt.get(T,y.length),p.init(W),y.push(p),ot.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),te.setFromProjectionMatrix(ot),De=this.localClippingEnabled,fe=Se.init(this.clippingPlanes,De),m=Pe.get(T,x.length),m.init(),x.push(m),ue.enabled===!0&&ue.isPresenting===!0){const we=b.xr.getDepthSensingMesh();we!==null&&gi(we,W,-1/0,b.sortObjects)}gi(T,W,0,b.sortObjects),m.finish(),b.sortObjects===!0&&m.sort(le,K),yt=ue.enabled===!1||ue.isPresenting===!1||ue.hasDepthSensing()===!1,yt&&nt.addToRenderList(m,T),this.info.render.frame++,fe===!0&&Se.beginShadows();const ae=p.state.shadowsArray;ze.render(ae,T,W),fe===!0&&Se.endShadows(),this.info.autoReset===!0&&this.info.reset();const ee=m.opaque,j=m.transmissive;if(p.setupLights(),W.isArrayCamera){const we=W.cameras;if(j.length>0)for(let me=0,He=we.length;me<He;me++){const it=we[me];Hi(ee,j,T,it)}yt&&nt.render(T);for(let me=0,He=we.length;me<He;me++){const it=we[me];Yn(m,T,it,it.viewport)}}else j.length>0&&Hi(ee,j,T,W),yt&&nt.render(T),Yn(m,T,W);E!==null&&(R.updateMultisampleRenderTarget(E),R.updateRenderTargetMipmap(E)),T.isScene===!0&&T.onAfterRender(b,T,W),jt.resetDefaultState(),v=-1,M=null,y.pop(),y.length>0?(p=y[y.length-1],fe===!0&&Se.setGlobalState(b.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function gi(T,W,ae,ee){if(T.visible===!1)return;if(T.layers.test(W.layers)){if(T.isGroup)ae=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(W);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||te.intersectsSprite(T)){ee&&_t.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ot);const me=re.update(T),He=T.material;He.visible&&m.push(T,me,He,ae,_t.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||te.intersectsObject(T))){const me=re.update(T),He=T.material;if(ee&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),_t.copy(T.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),_t.copy(me.boundingSphere.center)),_t.applyMatrix4(T.matrixWorld).applyMatrix4(ot)),Array.isArray(He)){const it=me.groups;for(let Mt=0,It=it.length;Mt<It;Mt++){const je=it[Mt],Ht=He[je.materialIndex];Ht&&Ht.visible&&m.push(T,me,Ht,ae,_t.z,je)}}else He.visible&&m.push(T,me,He,ae,_t.z,null)}}const we=T.children;for(let me=0,He=we.length;me<He;me++)gi(we[me],W,ae,ee)}function Yn(T,W,ae,ee){const j=T.opaque,we=T.transmissive,me=T.transparent;p.setupLightsView(ae),fe===!0&&Se.setGlobalState(b.clippingPlanes,ae),ee&&lt.viewport(P.copy(ee)),j.length>0&&ci(j,W,ae),we.length>0&&ci(we,W,ae),me.length>0&&ci(me,W,ae),lt.buffers.depth.setTest(!0),lt.buffers.depth.setMask(!0),lt.buffers.color.setMask(!0),lt.setPolygonOffset(!1)}function Hi(T,W,ae,ee){if((ae.isScene===!0?ae.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[ee.id]===void 0&&(p.state.transmissionRenderTarget[ee.id]=new Is(1,1,{generateMipmaps:!0,type:Ct.has("EXT_color_buffer_half_float")||Ct.has("EXT_color_buffer_float")?1016:1009,minFilter:1008,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:cn.workingColorSpace}));const we=p.state.transmissionRenderTarget[ee.id],me=ee.viewport||P;we.setSize(me.z,me.w);const He=b.getRenderTarget();b.setRenderTarget(we),b.getClearColor(q),ie=b.getClearAlpha(),ie<1&&b.setClearColor(16777215,.5),b.clear(),yt&&nt.render(ae);const it=b.toneMapping;b.toneMapping=0;const Mt=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),p.setupLightsView(ee),fe===!0&&Se.setGlobalState(b.clippingPlanes,ee),ci(T,ae,ee),R.updateMultisampleRenderTarget(we),R.updateRenderTargetMipmap(we),Ct.has("WEBGL_multisampled_render_to_texture")===!1){let It=!1;for(let je=0,Ht=W.length;je<Ht;je++){const qt=W[je],Ut=qt.object,Je=qt.geometry,$t=qt.material,Be=qt.group;if($t.side===2&&Ut.layers.test(ee.layers)){const kt=$t.side;$t.side=1,$t.needsUpdate=!0,ei(Ut,ae,ee,Je,$t,Be),$t.side=kt,$t.needsUpdate=!0,It=!0}}It===!0&&(R.updateMultisampleRenderTarget(we),R.updateRenderTargetMipmap(we))}b.setRenderTarget(He),b.setClearColor(q,ie),Mt!==void 0&&(ee.viewport=Mt),b.toneMapping=it}function ci(T,W,ae){const ee=W.isScene===!0?W.overrideMaterial:null;for(let j=0,we=T.length;j<we;j++){const me=T[j],He=me.object,it=me.geometry,Mt=ee===null?me.material:ee,It=me.group;He.layers.test(ae.layers)&&ei(He,W,ae,it,Mt,It)}}function ei(T,W,ae,ee,j,we){T.onBeforeRender(b,W,ae,ee,j,we),T.modelViewMatrix.multiplyMatrices(ae.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),j.onBeforeRender(b,W,ae,ee,T,we),j.transparent===!0&&j.side===2&&j.forceSinglePass===!1?(j.side=1,j.needsUpdate=!0,b.renderBufferDirect(ae,W,ee,j,T,we),j.side=0,j.needsUpdate=!0,b.renderBufferDirect(ae,W,ee,j,T,we),j.side=2):b.renderBufferDirect(ae,W,ee,j,T,we),T.onAfterRender(b,W,ae,ee,j,we)}function bn(T,W,ae){W.isScene!==!0&&(W=vt);const ee=ce.get(T),j=p.state.lights,we=p.state.shadowsArray,me=j.state.version,He=Fe.getParameters(T,j.state,we,W,ae),it=Fe.getProgramCacheKey(He);let Mt=ee.programs;ee.environment=T.isMeshStandardMaterial?W.environment:null,ee.fog=W.fog,ee.envMap=(T.isMeshStandardMaterial?B:S).get(T.envMap||ee.environment),ee.envMapRotation=ee.environment!==null&&T.envMap===null?W.environmentRotation:T.envMapRotation,Mt===void 0&&(T.addEventListener("dispose",Xe),Mt=new Map,ee.programs=Mt);let It=Mt.get(it);if(It!==void 0){if(ee.currentProgram===It&&ee.lightsStateVersion===me)return Fi(T,He),It}else He.uniforms=Fe.getUniforms(T),T.onBeforeCompile(He,b),It=Fe.acquireProgram(He,it),Mt.set(it,It),ee.uniforms=He.uniforms;const je=ee.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(je.clippingPlanes=Se.uniform),Fi(T,He),ee.needsLights=Mi(T),ee.lightsStateVersion=me,ee.needsLights&&(je.ambientLightColor.value=j.state.ambient,je.lightProbe.value=j.state.probe,je.directionalLights.value=j.state.directional,je.directionalLightShadows.value=j.state.directionalShadow,je.spotLights.value=j.state.spot,je.spotLightShadows.value=j.state.spotShadow,je.rectAreaLights.value=j.state.rectArea,je.ltc_1.value=j.state.rectAreaLTC1,je.ltc_2.value=j.state.rectAreaLTC2,je.pointLights.value=j.state.point,je.pointLightShadows.value=j.state.pointShadow,je.hemisphereLights.value=j.state.hemi,je.directionalShadowMap.value=j.state.directionalShadowMap,je.directionalShadowMatrix.value=j.state.directionalShadowMatrix,je.spotShadowMap.value=j.state.spotShadowMap,je.spotLightMatrix.value=j.state.spotLightMatrix,je.spotLightMap.value=j.state.spotLightMap,je.pointShadowMap.value=j.state.pointShadowMap,je.pointShadowMatrix.value=j.state.pointShadowMatrix),ee.currentProgram=It,ee.uniformsList=null,It}function li(T){if(T.uniformsList===null){const W=T.currentProgram.getUniforms();T.uniformsList=Ka.seqWithValue(W.seq,T.uniforms)}return T.uniformsList}function Fi(T,W){const ae=ce.get(T);ae.outputColorSpace=W.outputColorSpace,ae.batching=W.batching,ae.batchingColor=W.batchingColor,ae.instancing=W.instancing,ae.instancingColor=W.instancingColor,ae.instancingMorph=W.instancingMorph,ae.skinning=W.skinning,ae.morphTargets=W.morphTargets,ae.morphNormals=W.morphNormals,ae.morphColors=W.morphColors,ae.morphTargetsCount=W.morphTargetsCount,ae.numClippingPlanes=W.numClippingPlanes,ae.numIntersection=W.numClipIntersection,ae.vertexAlphas=W.vertexAlphas,ae.vertexTangents=W.vertexTangents,ae.toneMapping=W.toneMapping}function Un(T,W,ae,ee,j){W.isScene!==!0&&(W=vt),R.resetTextureUnits();const we=W.fog,me=ee.isMeshStandardMaterial?W.environment:null,He=E===null?b.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:mi,it=(ee.isMeshStandardMaterial?B:S).get(ee.envMap||me),Mt=ee.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,It=!!ae.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),je=!!ae.morphAttributes.position,Ht=!!ae.morphAttributes.normal,qt=!!ae.morphAttributes.color;let Ut=0;ee.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(Ut=b.toneMapping);const Je=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,$t=Je!==void 0?Je.length:0,Be=ce.get(ee),kt=p.state.lights;if(fe===!0&&(De===!0||T!==M)){const Dn=T===M&&ee.id===v;Se.setState(ee,T,Dn)}let Ot=!1;ee.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==kt.state.version||Be.outputColorSpace!==He||j.isBatchedMesh&&Be.batching===!1||!j.isBatchedMesh&&Be.batching===!0||j.isBatchedMesh&&Be.batchingColor===!0&&j.colorTexture===null||j.isBatchedMesh&&Be.batchingColor===!1&&j.colorTexture!==null||j.isInstancedMesh&&Be.instancing===!1||!j.isInstancedMesh&&Be.instancing===!0||j.isSkinnedMesh&&Be.skinning===!1||!j.isSkinnedMesh&&Be.skinning===!0||j.isInstancedMesh&&Be.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&Be.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&Be.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&Be.instancingMorph===!1&&j.morphTexture!==null||Be.envMap!==it||ee.fog===!0&&Be.fog!==we||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==Se.numPlanes||Be.numIntersection!==Se.numIntersection)||Be.vertexAlphas!==Mt||Be.vertexTangents!==It||Be.morphTargets!==je||Be.morphNormals!==Ht||Be.morphColors!==qt||Be.toneMapping!==Ut||Be.morphTargetsCount!==$t)&&(Ot=!0):(Ot=!0,Be.__version=ee.version);let Yt=Be.currentProgram;Ot===!0&&(Yt=bn(ee,W,j));let Kt=!1,Rn=!1,ti=!1;const on=Yt.getUniforms(),pn=Be.uniforms;if(lt.useProgram(Yt.program)&&(Kt=!0,Rn=!0,ti=!0),ee.id!==v&&(v=ee.id,Rn=!0),Kt||M!==T){lt.buffers.depth.getReversed()?(_e.copy(T.projectionMatrix),Ku(_e),Ju(_e),on.setValue(H,"projectionMatrix",_e)):on.setValue(H,"projectionMatrix",T.projectionMatrix),on.setValue(H,"viewMatrix",T.matrixWorldInverse);const un=on.map.cameraPosition;un!==void 0&&un.setValue(H,rt.setFromMatrixPosition(T.matrixWorld)),ht.logarithmicDepthBuffer&&on.setValue(H,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&on.setValue(H,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,Rn=!0,ti=!0)}if(j.isSkinnedMesh){on.setOptional(H,j,"bindMatrix"),on.setOptional(H,j,"bindMatrixInverse");const Dn=j.skeleton;Dn&&(Dn.boneTexture===null&&Dn.computeBoneTexture(),on.setValue(H,"boneTexture",Dn.boneTexture,R))}j.isBatchedMesh&&(on.setOptional(H,j,"batchingTexture"),on.setValue(H,"batchingTexture",j._matricesTexture,R),on.setOptional(H,j,"batchingIdTexture"),on.setValue(H,"batchingIdTexture",j._indirectTexture,R),on.setOptional(H,j,"batchingColorTexture"),j._colorsTexture!==null&&on.setValue(H,"batchingColorTexture",j._colorsTexture,R));const hi=ae.morphAttributes;if((hi.position!==void 0||hi.normal!==void 0||hi.color!==void 0)&&dt.update(j,ae,Yt),(Rn||Be.receiveShadow!==j.receiveShadow)&&(Be.receiveShadow=j.receiveShadow,on.setValue(H,"receiveShadow",j.receiveShadow)),ee.isMeshGouraudMaterial&&ee.envMap!==null&&(pn.envMap.value=it,pn.flipEnvMap.value=it.isCubeTexture&&it.isRenderTargetTexture===!1?-1:1),ee.isMeshStandardMaterial&&ee.envMap===null&&W.environment!==null&&(pn.envMapIntensity.value=W.environmentIntensity),Rn&&(on.setValue(H,"toneMappingExposure",b.toneMappingExposure),Be.needsLights&&yi(pn,ti),we&&ee.fog===!0&&ve.refreshFogUniforms(pn,we),ve.refreshMaterialUniforms(pn,ee,k,X,p.state.transmissionRenderTarget[T.id]),Ka.upload(H,li(Be),pn,R)),ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(Ka.upload(H,li(Be),pn,R),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&on.setValue(H,"center",j.center),on.setValue(H,"modelViewMatrix",j.modelViewMatrix),on.setValue(H,"normalMatrix",j.normalMatrix),on.setValue(H,"modelMatrix",j.matrixWorld),ee.isShaderMaterial||ee.isRawShaderMaterial){const Dn=ee.uniformsGroups;for(let un=0,mn=Dn.length;un<mn;un++){const Mn=Dn[un];V.update(Mn,Yt),V.bind(Mn,Yt)}}return Yt}function yi(T,W){T.ambientLightColor.needsUpdate=W,T.lightProbe.needsUpdate=W,T.directionalLights.needsUpdate=W,T.directionalLightShadows.needsUpdate=W,T.pointLights.needsUpdate=W,T.pointLightShadows.needsUpdate=W,T.spotLights.needsUpdate=W,T.spotLightShadows.needsUpdate=W,T.rectAreaLights.needsUpdate=W,T.hemisphereLights.needsUpdate=W}function Mi(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(T,W,ae){ce.get(T.texture).__webglTexture=W,ce.get(T.depthTexture).__webglTexture=ae;const ee=ce.get(T);ee.__hasExternalTextures=!0,ee.__autoAllocateDepthBuffer=ae===void 0,ee.__autoAllocateDepthBuffer||Ct.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ee.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,W){const ae=ce.get(T);ae.__webglFramebuffer=W,ae.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(T,W=0,ae=0){E=T,w=W,C=ae;let ee=!0,j=null,we=!1,me=!1;if(T){const it=ce.get(T);if(it.__useDefaultFramebuffer!==void 0)lt.bindFramebuffer(H.FRAMEBUFFER,null),ee=!1;else if(it.__webglFramebuffer===void 0)R.setupRenderTarget(T);else if(it.__hasExternalTextures)R.rebindTextures(T,ce.get(T.texture).__webglTexture,ce.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const je=T.depthTexture;if(it.__boundDepthTexture!==je){if(je!==null&&ce.has(je)&&(T.width!==je.image.width||T.height!==je.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(T)}}const Mt=T.texture;(Mt.isData3DTexture||Mt.isDataArrayTexture||Mt.isCompressedArrayTexture)&&(me=!0);const It=ce.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(It[W])?j=It[W][ae]:j=It[W],we=!0):T.samples>0&&R.useMultisampledRTT(T)===!1?j=ce.get(T).__webglMultisampledFramebuffer:Array.isArray(It)?j=It[ae]:j=It,P.copy(T.viewport),G.copy(T.scissor),O=T.scissorTest}else P.copy(Z).multiplyScalar(k).floor(),G.copy(xe).multiplyScalar(k).floor(),O=Ce;if(lt.bindFramebuffer(H.FRAMEBUFFER,j)&&ee&&lt.drawBuffers(T,j),lt.viewport(P),lt.scissor(G),lt.setScissorTest(O),we){const it=ce.get(T.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+W,it.__webglTexture,ae)}else if(me){const it=ce.get(T.texture),Mt=W||0;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,it.__webglTexture,ae||0,Mt)}v=-1},this.readRenderTargetPixels=function(T,W,ae,ee,j,we,me){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let He=ce.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&me!==void 0&&(He=He[me]),He){lt.bindFramebuffer(H.FRAMEBUFFER,He);try{const it=T.texture,Mt=it.format,It=it.type;if(!ht.textureFormatReadable(Mt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ht.textureTypeReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=T.width-ee&&ae>=0&&ae<=T.height-j&&H.readPixels(W,ae,ee,j,Tt.convert(Mt),Tt.convert(It),we)}finally{const it=E!==null?ce.get(E).__webglFramebuffer:null;lt.bindFramebuffer(H.FRAMEBUFFER,it)}}},this.readRenderTargetPixelsAsync=async function(T,W,ae,ee,j,we,me){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let He=ce.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&me!==void 0&&(He=He[me]),He){const it=T.texture,Mt=it.format,It=it.type;if(!ht.textureFormatReadable(Mt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ht.textureTypeReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(W>=0&&W<=T.width-ee&&ae>=0&&ae<=T.height-j){lt.bindFramebuffer(H.FRAMEBUFFER,He);const je=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,je),H.bufferData(H.PIXEL_PACK_BUFFER,we.byteLength,H.STREAM_READ),H.readPixels(W,ae,ee,j,Tt.convert(Mt),Tt.convert(It),0);const Ht=E!==null?ce.get(E).__webglFramebuffer:null;lt.bindFramebuffer(H.FRAMEBUFFER,Ht);const qt=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await Yu(H,qt,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,je),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,we),H.deleteBuffer(je),H.deleteSync(qt),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,W=null,ae=0){T.isTexture!==!0&&(Yr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),W=arguments[0]||null,T=arguments[1]);const ee=Math.pow(2,-ae),j=Math.floor(T.image.width*ee),we=Math.floor(T.image.height*ee),me=W!==null?W.x:0,He=W!==null?W.y:0;R.setTexture2D(T,0),H.copyTexSubImage2D(H.TEXTURE_2D,ae,0,0,me,He,j,we),lt.unbindTexture()},this.copyTextureToTexture=function(T,W,ae=null,ee=null,j=0){T.isTexture!==!0&&(Yr("WebGLRenderer: copyTextureToTexture function signature has changed."),ee=arguments[0]||null,T=arguments[1],W=arguments[2],j=arguments[3]||0,ae=null);let we,me,He,it,Mt,It,je,Ht,qt;const Ut=T.isCompressedTexture?T.mipmaps[j]:T.image;ae!==null?(we=ae.max.x-ae.min.x,me=ae.max.y-ae.min.y,He=ae.isBox3?ae.max.z-ae.min.z:1,it=ae.min.x,Mt=ae.min.y,It=ae.isBox3?ae.min.z:0):(we=Ut.width,me=Ut.height,He=Ut.depth||1,it=0,Mt=0,It=0),ee!==null?(je=ee.x,Ht=ee.y,qt=ee.z):(je=0,Ht=0,qt=0);const Je=Tt.convert(W.format),$t=Tt.convert(W.type);let Be;W.isData3DTexture?(R.setTexture3D(W,0),Be=H.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(R.setTexture2DArray(W,0),Be=H.TEXTURE_2D_ARRAY):(R.setTexture2D(W,0),Be=H.TEXTURE_2D),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,W.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,W.unpackAlignment);const kt=H.getParameter(H.UNPACK_ROW_LENGTH),Ot=H.getParameter(H.UNPACK_IMAGE_HEIGHT),Yt=H.getParameter(H.UNPACK_SKIP_PIXELS),Kt=H.getParameter(H.UNPACK_SKIP_ROWS),Rn=H.getParameter(H.UNPACK_SKIP_IMAGES);H.pixelStorei(H.UNPACK_ROW_LENGTH,Ut.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Ut.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,it),H.pixelStorei(H.UNPACK_SKIP_ROWS,Mt),H.pixelStorei(H.UNPACK_SKIP_IMAGES,It);const ti=T.isDataArrayTexture||T.isData3DTexture,on=W.isDataArrayTexture||W.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const pn=ce.get(T),hi=ce.get(W),Dn=ce.get(pn.__renderTarget),un=ce.get(hi.__renderTarget);lt.bindFramebuffer(H.READ_FRAMEBUFFER,Dn.__webglFramebuffer),lt.bindFramebuffer(H.DRAW_FRAMEBUFFER,un.__webglFramebuffer);for(let mn=0;mn<He;mn++)ti&&H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,ce.get(T).__webglTexture,j,It+mn),T.isDepthTexture?(on&&H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,ce.get(W).__webglTexture,j,qt+mn),H.blitFramebuffer(it,Mt,we,me,je,Ht,we,me,H.DEPTH_BUFFER_BIT,H.NEAREST)):on?H.copyTexSubImage3D(Be,j,je,Ht,qt+mn,it,Mt,we,me):H.copyTexSubImage2D(Be,j,je,Ht,qt+mn,it,Mt,we,me);lt.bindFramebuffer(H.READ_FRAMEBUFFER,null),lt.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else on?T.isDataTexture||T.isData3DTexture?H.texSubImage3D(Be,j,je,Ht,qt,we,me,He,Je,$t,Ut.data):W.isCompressedArrayTexture?H.compressedTexSubImage3D(Be,j,je,Ht,qt,we,me,He,Je,Ut.data):H.texSubImage3D(Be,j,je,Ht,qt,we,me,He,Je,$t,Ut):T.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,j,je,Ht,we,me,Je,$t,Ut.data):T.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,j,je,Ht,Ut.width,Ut.height,Je,Ut.data):H.texSubImage2D(H.TEXTURE_2D,j,je,Ht,we,me,Je,$t,Ut);H.pixelStorei(H.UNPACK_ROW_LENGTH,kt),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Ot),H.pixelStorei(H.UNPACK_SKIP_PIXELS,Yt),H.pixelStorei(H.UNPACK_SKIP_ROWS,Kt),H.pixelStorei(H.UNPACK_SKIP_IMAGES,Rn),j===0&&W.generateMipmaps&&H.generateMipmap(Be),lt.unbindTexture()},this.copyTextureToTexture3D=function(T,W,ae=null,ee=null,j=0){return T.isTexture!==!0&&(Yr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ae=arguments[0]||null,ee=arguments[1]||null,T=arguments[2],W=arguments[3],j=arguments[4]||0),Yr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,W,ae,ee,j)},this.initRenderTarget=function(T){ce.get(T).__webglFramebuffer===void 0&&R.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?R.setTextureCube(T,0):T.isData3DTexture?R.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?R.setTexture2DArray(T,0):R.setTexture2D(T,0),lt.unbindTexture()},this.resetState=function(){w=0,C=0,E=null,lt.reset(),jt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=cn._getDrawingBufferColorSpace(e),t.unpackColorSpace=cn._getUnpackColorSpace()}}class Nl extends Pn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ci,this.environmentIntensity=1,this.environmentRotation=new Ci,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class jh{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=zi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ui=new I;class ia{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)ui.fromBufferAttribute(this,t),ui.applyMatrix4(e),this.setXYZ(t,ui.x,ui.y,ui.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ui.fromBufferAttribute(this,t),ui.applyNormalMatrix(e),this.setXYZ(t,ui.x,ui.y,ui.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ui.fromBufferAttribute(this,t),ui.transformDirection(e),this.setXYZ(t,ui.x,ui.y,ui.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ki(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_n(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=_n(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=_n(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=_n(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=_n(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ki(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ki(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ki(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ki(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=_n(t,this.array),n=_n(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=_n(t,this.array),n=_n(n,this.array),i=_n(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=_n(t,this.array),n=_n(n,this.array),i=_n(i,this.array),r=_n(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new fn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ia(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class qh extends Di{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new st(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let lr;const Ur=new I,hr=new I,ur=new I,dr=new We,Or=new We,Yh=new tt,Ca=new I,Br=new I,Pa=new I,Ul=new We,Go=new We,Ol=new We;class o0 extends Pn{constructor(e=new qh){if(super(),this.isSprite=!0,this.type="Sprite",lr===void 0){lr=new Sn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new jh(t,5);lr.setIndex([0,1,2,0,2,3]),lr.setAttribute("position",new ia(n,3,0,!1)),lr.setAttribute("uv",new ia(n,2,3,!1))}this.geometry=lr,this.material=e,this.center=new We(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),hr.setFromMatrixScale(this.matrixWorld),Yh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ur.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&hr.multiplyScalar(-ur.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;La(Ca.set(-.5,-.5,0),ur,a,hr,i,r),La(Br.set(.5,-.5,0),ur,a,hr,i,r),La(Pa.set(.5,.5,0),ur,a,hr,i,r),Ul.set(0,0),Go.set(1,0),Ol.set(1,1);let o=e.ray.intersectTriangle(Ca,Br,Pa,!1,Ur);if(o===null&&(La(Br.set(-.5,.5,0),ur,a,hr,i,r),Go.set(0,1),o=e.ray.intersectTriangle(Ca,Pa,Br,!1,Ur),o===null))return;const c=e.ray.origin.distanceTo(Ur);c<e.near||c>e.far||t.push({distance:c,point:Ur.clone(),uv:Ii.getInterpolation(Ur,Ca,Br,Pa,Ul,Go,Ol,new We),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function La(s,e,t,n,i,r){dr.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Or.x=r*dr.x-i*dr.y,Or.y=i*dr.x+r*dr.y):Or.copy(dr),s.copy(e),s.x+=Or.x,s.y+=Or.y,s.applyMatrix4(Yh)}const Bl=new I,kl=new ln,zl=new ln,c0=new I,Gl=new tt,Ia=new I,Ho=new Yi,Hl=new tt,Vo=new ro;class l0 extends Ve{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Gc,this.bindMatrix=new tt,this.bindMatrixInverse=new tt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Zn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ia),this.boundingBox.expandByPoint(Ia)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Yi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ia),this.boundingSphere.expandByPoint(Ia)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ho.copy(this.boundingSphere),Ho.applyMatrix4(i),e.ray.intersectsSphere(Ho)!==!1&&(Hl.copy(i).invert(),Vo.copy(e.ray).applyMatrix4(Hl),!(this.boundingBox!==null&&Vo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Vo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new ln,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Gc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Cu?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;kl.fromBufferAttribute(i.attributes.skinIndex,e),zl.fromBufferAttribute(i.attributes.skinWeight,e),Bl.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=zl.getComponent(r);if(a!==0){const o=kl.getComponent(r);Gl.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(c0.copy(Bl).applyMatrix4(Gl),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Kh extends Pn{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Tc extends Gn{constructor(e=null,t=1,n=1,i,r,a,o,c,l=1003,u=1003,h,d){super(null,a,o,c,l,u,i,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Vl=new tt,h0=new tt;class Rc{constructor(e=[],t=[]){this.uuid=zi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new tt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new tt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:h0;Vl.multiplyMatrices(o,t[r]),Vl.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Rc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Tc(t,e,e,1023,1015);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Kh),this.bones.push(a),this.boneInverses.push(new tt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class uc extends fn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const fr=new tt,Wl=new tt,Da=[],Xl=new Zn,u0=new tt,kr=new Ve,zr=new Yi;class fi extends Ve{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new uc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,u0)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Zn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,fr),Xl.copy(e.boundingBox).applyMatrix4(fr),this.boundingBox.union(Xl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Yi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,fr),zr.copy(e.boundingSphere).applyMatrix4(fr),this.boundingSphere.union(zr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(kr.geometry=this.geometry,kr.material=this.material,kr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zr.copy(this.boundingSphere),zr.applyMatrix4(n),e.ray.intersectsSphere(zr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,fr),Wl.multiplyMatrices(n,fr),kr.matrixWorld=Wl,kr.raycast(e,Da);for(let a=0,o=Da.length;a<o;a++){const c=Da[a];c.instanceId=r,c.object=this,t.push(c)}Da.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new uc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Tc(new Float32Array(i*this.count),i,this.count,1028,1015));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Jh extends Di{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new st(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Za=new I,Qa=new I,jl=new tt,Gr=new ro,Fa=new Yi,Wo=new I,ql=new I;class Cc extends Pn{constructor(e=new Sn,t=new Jh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Za.fromBufferAttribute(t,i-1),Qa.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Za.distanceTo(Qa);e.setAttribute("lineDistance",new Qt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fa.copy(n.boundingSphere),Fa.applyMatrix4(i),Fa.radius+=r,e.ray.intersectsSphere(Fa)===!1)return;jl.copy(i).invert(),Gr.copy(e.ray).applyMatrix4(jl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=u.getX(_),x=u.getX(_+1),y=Na(this,e,Gr,c,p,x);y&&t.push(y)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(f),p=Na(this,e,Gr,c,_,m);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=Na(this,e,Gr,c,_,_+1);p&&t.push(p)}if(this.isLineLoop){const _=Na(this,e,Gr,c,g-1,f);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Na(s,e,t,n,i,r){const a=s.geometry.attributes.position;if(Za.fromBufferAttribute(a,i),Qa.fromBufferAttribute(a,r),t.distanceSqToSegment(Za,Qa,Wo,ql)>n)return;Wo.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Wo);if(!(c<e.near||c>e.far))return{distance:c,point:ql.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const Yl=new I,Kl=new I;class d0 extends Cc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Yl.fromBufferAttribute(t,i),Kl.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Yl.distanceTo(Kl);e.setAttribute("lineDistance",new Qt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class f0 extends Cc{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Zh extends Di{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new st(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Jl=new tt,dc=new ro,Ua=new Yi,Oa=new I;class p0 extends Pn{constructor(e=new Sn,t=new Zh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ua.copy(n.boundingSphere),Ua.applyMatrix4(i),Ua.radius+=r,e.ray.intersectsSphere(Ua)===!1)return;Jl.copy(i).invert(),dc.copy(e.ray).applyMatrix4(Jl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=d,_=f;g<_;g++){const m=l.getX(g);Oa.fromBufferAttribute(h,m),Zl(Oa,m,c,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let g=d,_=f;g<_;g++)Oa.fromBufferAttribute(h,g),Zl(Oa,g,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Zl(s,e,t,n,i,r,a){const o=dc.distanceSqToPoint(s);if(o<t){const c=new I;dc.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class pi extends Gn{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ki{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(r-1);const u=n[i],d=n[i+1]-u,f=(a-u)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),c=t||(a.isVector2?new We:new I);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new I,i=[],r=[],a=[],o=new I,c=new tt;for(let f=0;f<=e;f++){const g=f/e;i[f]=this.getTangentAt(g,new I)}r[0]=new I,a[0]=new I;let l=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),d=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Hn(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(Hn(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Pc extends Ki{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new We){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*u-f*h+this.aX,l=d*h+f*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class m0 extends Pc{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Lc(){let s=0,e=0,t=0,n=0;function i(r,a,o,c){s=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){i(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,h){let d=(a-r)/l-(o-r)/(l+u)+(o-a)/u,f=(o-a)/u-(c-a)/(u+h)+(c-o)/h;d*=u,f*=u,i(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return s+e*r+t*a+n*o}}}const Ba=new I,Xo=new Lc,jo=new Lc,qo=new Lc;class co extends Ki{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new I){const n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=i[(o-1)%r]:(Ba.subVectors(i[0],i[1]).add(i[0]),l=Ba);const h=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?u=i[(o+2)%r]:(Ba.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=Ba),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),f),_=Math.pow(h.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(u),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Xo.initNonuniformCatmullRom(l.x,h.x,d.x,u.x,g,_,m),jo.initNonuniformCatmullRom(l.y,h.y,d.y,u.y,g,_,m),qo.initNonuniformCatmullRom(l.z,h.z,d.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(Xo.initCatmullRom(l.x,h.x,d.x,u.x,this.tension),jo.initCatmullRom(l.y,h.y,d.y,u.y,this.tension),qo.initCatmullRom(l.z,h.z,d.z,u.z,this.tension));return n.set(Xo.calc(c),jo.calc(c),qo.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new I().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Ql(s,e,t,n,i){const r=(n-e)*.5,a=(i-t)*.5,o=s*s,c=s*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*s+t}function g0(s,e){const t=1-s;return t*t*e}function b0(s,e){return 2*(1-s)*s*e}function _0(s,e){return s*s*e}function Qr(s,e,t,n){return g0(s,e)+b0(s,t)+_0(s,n)}function x0(s,e){const t=1-s;return t*t*t*e}function v0(s,e){const t=1-s;return 3*t*t*s*e}function y0(s,e){return 3*(1-s)*s*s*e}function M0(s,e){return s*s*s*e}function $r(s,e,t,n,i){return x0(s,e)+v0(s,t)+y0(s,n)+M0(s,i)}class Qh extends Ki{constructor(e=new We,t=new We,n=new We,i=new We){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new We){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set($r(e,i.x,r.x,a.x,o.x),$r(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class S0 extends Ki{constructor(e=new I,t=new I,n=new I,i=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new I){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set($r(e,i.x,r.x,a.x,o.x),$r(e,i.y,r.y,a.y,o.y),$r(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class $h extends Ki{constructor(e=new We,t=new We){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new We){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new We){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class eu extends Ki{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class tu extends Ki{constructor(e=new We,t=new We,n=new We){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new We){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(Qr(e,i.x,r.x,a.x),Qr(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class nu extends Ki{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(Qr(e,i.x,r.x,a.x),Qr(e,i.y,r.y,a.y),Qr(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class iu extends Ki{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new We){const n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,c=i[a===0?a:a-1],l=i[a],u=i[a>i.length-2?i.length-1:a+1],h=i[a>i.length-3?i.length-1:a+2];return n.set(Ql(o,c.x,l.x,u.x,h.x),Ql(o,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new We().fromArray(i))}return this}}var fc=Object.freeze({__proto__:null,ArcCurve:m0,CatmullRomCurve3:co,CubicBezierCurve:Qh,CubicBezierCurve3:S0,EllipseCurve:Pc,LineCurve:$h,LineCurve3:eu,QuadraticBezierCurve:tu,QuadraticBezierCurve3:nu,SplineCurve:iu});class su extends Ki{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new fc[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new fc[i.type]().fromJSON(i))}return this}}class E0 extends su{constructor(e){super(),this.type="Path",this.currentPoint=new We,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new $h(this.currentPoint.clone(),new We(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new tu(this.currentPoint.clone(),new We(e,t),new We(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,a){const o=new Qh(this.currentPoint.clone(),new We(e,t),new We(n,i),new We(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new iu(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,r,a),this}absarc(e,t,n,i,r,a){return this.absellipse(e,t,n,n,i,r,a),this}ellipse(e,t,n,i,r,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,i,r,a,o,c),this}absellipse(e,t,n,i,r,a,o,c){const l=new Pc(e,t,n,i,r,a,o,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ic extends Sn{constructor(e=[new We(0,-.5),new We(.5,0),new We(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Hn(i,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],u=1/t,h=new I,d=new We,f=new I,g=new I,_=new I;let m=0,p=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(g)}for(let x=0;x<=t;x++){const y=n+x*u*i,b=Math.sin(y),L=Math.cos(y);for(let w=0;w<=e.length-1;w++){h.x=e[w].x*b,h.y=e[w].y,h.z=e[w].x*L,a.push(h.x,h.y,h.z),d.x=x/t,d.y=w/(e.length-1),o.push(d.x,d.y);const C=c[3*w+0]*b,E=c[3*w+1],v=c[3*w+0]*L;l.push(C,E,v)}}for(let x=0;x<t;x++)for(let y=0;y<e.length-1;y++){const b=y+x*e.length,L=b,w=b+e.length,C=b+e.length+1,E=b+1;r.push(L,w,E),r.push(C,E,w)}this.setIndex(r),this.setAttribute("position",new Qt(a,3)),this.setAttribute("uv",new Qt(o,2)),this.setAttribute("normal",new Qt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ic(e.points,e.segments,e.phiStart,e.phiLength)}}class Dc extends Ic{constructor(e=1,t=1,n=4,i=8){const r=new E0;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new Dc(e.radius,e.length,e.capSegments,e.radialSegments)}}class lo extends Sn{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new I,u=new We;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const f=n+h/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[d]/e+1)/2,u.y=(a[d+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Qt(a,3)),this.setAttribute("normal",new Qt(o,3)),this.setAttribute("uv",new Qt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lo(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class wn extends Sn{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const u=[],h=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;x(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new Qt(h,3)),this.setAttribute("normal",new Qt(d,3)),this.setAttribute("uv",new Qt(f,2));function x(){const b=new I,L=new I;let w=0;const C=(t-e)/n;for(let E=0;E<=r;E++){const v=[],M=E/r,P=M*(t-e)+e;for(let G=0;G<=i;G++){const O=G/i,q=O*c+o,ie=Math.sin(q),D=Math.cos(q);L.x=P*ie,L.y=-M*n+m,L.z=P*D,h.push(L.x,L.y,L.z),b.set(ie,C,D).normalize(),d.push(b.x,b.y,b.z),f.push(O,1-M),v.push(g++)}_.push(v)}for(let E=0;E<i;E++)for(let v=0;v<r;v++){const M=_[v][E],P=_[v+1][E],G=_[v+1][E+1],O=_[v][E+1];(e>0||v!==0)&&(u.push(M,P,O),w+=3),(t>0||v!==r-1)&&(u.push(P,G,O),w+=3)}l.addGroup(p,w,0),p+=w}function y(b){const L=g,w=new We,C=new I;let E=0;const v=b===!0?e:t,M=b===!0?1:-1;for(let G=1;G<=i;G++)h.push(0,m*M,0),d.push(0,M,0),f.push(.5,.5),g++;const P=g;for(let G=0;G<=i;G++){const q=G/i*c+o,ie=Math.cos(q),D=Math.sin(q);C.x=v*D,C.y=m*M,C.z=v*ie,h.push(C.x,C.y,C.z),d.push(0,M,0),w.x=ie*.5+.5,w.y=D*.5*M+.5,f.push(w.x,w.y),g++}for(let G=0;G<i;G++){const O=L+G,q=P+G;b===!0?u.push(q,q+1,O):u.push(q+1,q,O),E+=3}l.addGroup(p,E,b===!0?1:2),p+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $a extends wn{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new $a(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Fc extends Sn{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],a=[];o(i),l(n),u(),this.setAttribute("position",new Qt(r,3)),this.setAttribute("normal",new Qt(r.slice(),3)),this.setAttribute("uv",new Qt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const y=new I,b=new I,L=new I;for(let w=0;w<t.length;w+=3)f(t[w+0],y),f(t[w+1],b),f(t[w+2],L),c(y,b,L,x)}function c(x,y,b,L){const w=L+1,C=[];for(let E=0;E<=w;E++){C[E]=[];const v=x.clone().lerp(b,E/w),M=y.clone().lerp(b,E/w),P=w-E;for(let G=0;G<=P;G++)G===0&&E===w?C[E][G]=v:C[E][G]=v.clone().lerp(M,G/P)}for(let E=0;E<w;E++)for(let v=0;v<2*(w-E)-1;v++){const M=Math.floor(v/2);v%2===0?(d(C[E][M+1]),d(C[E+1][M]),d(C[E][M])):(d(C[E][M+1]),d(C[E+1][M+1]),d(C[E+1][M]))}}function l(x){const y=new I;for(let b=0;b<r.length;b+=3)y.x=r[b+0],y.y=r[b+1],y.z=r[b+2],y.normalize().multiplyScalar(x),r[b+0]=y.x,r[b+1]=y.y,r[b+2]=y.z}function u(){const x=new I;for(let y=0;y<r.length;y+=3){x.x=r[y+0],x.y=r[y+1],x.z=r[y+2];const b=m(x)/2/Math.PI+.5,L=p(x)/Math.PI+.5;a.push(b,1-L)}g(),h()}function h(){for(let x=0;x<a.length;x+=6){const y=a[x+0],b=a[x+2],L=a[x+4],w=Math.max(y,b,L),C=Math.min(y,b,L);w>.9&&C<.1&&(y<.2&&(a[x+0]+=1),b<.2&&(a[x+2]+=1),L<.2&&(a[x+4]+=1))}}function d(x){r.push(x.x,x.y,x.z)}function f(x,y){const b=x*3;y.x=e[b+0],y.y=e[b+1],y.z=e[b+2]}function g(){const x=new I,y=new I,b=new I,L=new I,w=new We,C=new We,E=new We;for(let v=0,M=0;v<r.length;v+=9,M+=6){x.set(r[v+0],r[v+1],r[v+2]),y.set(r[v+3],r[v+4],r[v+5]),b.set(r[v+6],r[v+7],r[v+8]),w.set(a[M+0],a[M+1]),C.set(a[M+2],a[M+3]),E.set(a[M+4],a[M+5]),L.copy(x).add(y).add(b).divideScalar(3);const P=m(L);_(w,M+0,x,P),_(C,M+2,y,P),_(E,M+4,b,P)}}function _(x,y,b,L){L<0&&x.x===1&&(a[y]=x.x-1),b.x===0&&b.z===0&&(a[y]=L/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fc(e.vertices,e.indices,e.radius,e.details)}}class Ai extends Fc{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ai(e.radius,e.detail)}}class eo extends Sn{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],c=[],l=[],u=[];let h=e;const d=(t-e)/i,f=new I,g=new We;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=h*Math.cos(p),f.y=h*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}h+=d}for(let _=0;_<i;_++){const m=_*(n+1);for(let p=0;p<n;p++){const x=p+m,y=x,b=x+n+1,L=x+n+2,w=x+1;o.push(y,b,w),o.push(b,L,w)}}this.setIndex(o),this.setAttribute("position",new Qt(c,3)),this.setAttribute("normal",new Qt(l,3)),this.setAttribute("uv",new Qt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new eo(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ti extends Sn{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new I,d=new I,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const x=[],y=p/n;let b=0;p===0&&a===0?b=.5/t:p===n&&c===Math.PI&&(b=-.5/t);for(let L=0;L<=t;L++){const w=L/t;h.x=-e*Math.cos(i+w*r)*Math.sin(a+y*o),h.y=e*Math.cos(a+y*o),h.z=e*Math.sin(i+w*r)*Math.sin(a+y*o),g.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),m.push(w+b,1-y),x.push(l++)}u.push(x)}for(let p=0;p<n;p++)for(let x=0;x<t;x++){const y=u[p][x+1],b=u[p][x],L=u[p+1][x],w=u[p+1][x+1];(p!==0||a>0)&&f.push(y,b,w),(p!==n-1||c<Math.PI)&&f.push(b,L,w)}this.setIndex(f),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(_,3)),this.setAttribute("uv",new Qt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ti(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ho extends Sn{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],c=[],l=[],u=new I,h=new I,d=new I;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const _=g/i*r,m=f/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(_),h.y=(e+t*Math.cos(m))*Math.sin(_),h.z=t*Math.sin(m),o.push(h.x,h.y,h.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),d.subVectors(h,u).normalize(),c.push(d.x,d.y,d.z),l.push(g/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const _=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,x=(i+1)*f+g;a.push(_,m,x),a.push(m,p,x)}this.setIndex(a),this.setAttribute("position",new Qt(o,3)),this.setAttribute("normal",new Qt(c,3)),this.setAttribute("uv",new Qt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ho(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ar extends Sn{constructor(e=new nu(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new I,c=new I,l=new We;let u=new I;const h=[],d=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Qt(h,3)),this.setAttribute("normal",new Qt(d,3)),this.setAttribute("uv",new Qt(f,2));function _(){for(let y=0;y<t;y++)m(y);m(r===!1?t:0),x(),p()}function m(y){u=e.getPointAt(y/t,u);const b=a.normals[y],L=a.binormals[y];for(let w=0;w<=i;w++){const C=w/i*Math.PI*2,E=Math.sin(C),v=-Math.cos(C);c.x=v*b.x+E*L.x,c.y=v*b.y+E*L.y,c.z=v*b.z+E*L.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=u.x+n*c.x,o.y=u.y+n*c.y,o.z=u.z+n*c.z,h.push(o.x,o.y,o.z)}}function p(){for(let y=1;y<=t;y++)for(let b=1;b<=i;b++){const L=(i+1)*(y-1)+(b-1),w=(i+1)*y+(b-1),C=(i+1)*y+b,E=(i+1)*(y-1)+b;g.push(L,w,E),g.push(w,C,E)}}function x(){for(let y=0;y<=t;y++)for(let b=0;b<=i;b++)l.x=y/t,l.y=b/i,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Ar(new fc[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class ms extends Di{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new st(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new st(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new We(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ci,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ji extends ms{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new We(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Hn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new st(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new st(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new st(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Fn extends Di{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new st(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new We(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ci,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function ka(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function w0(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function A0(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function $l(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function ru(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class aa{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class T0 extends aa{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case 2401:r=e,o=2*t-n;break;case 2402:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case 2401:a=e,c=2*n-t;break;case 2402:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,x=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,y=(-1-f)*m+(1.5+f)*_+.5*g,b=f*m-f*_;for(let L=0;L!==o;++L)r[L]=p*a[u+L]+x*a[l+L]+y*a[c+L]+b*a[h+L];return r}}class au extends aa{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(i-t),h=1-u;for(let d=0;d!==o;++d)r[d]=a[l+d]*h+a[c+d]*u;return r}}class R0 extends aa{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Zi{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ka(t,this.TimeBufferType),this.values=ka(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ka(e.times,Array),values:ka(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new R0(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new au(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new T0(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&w0(i))for(let o=0,c=i.length;o!==c;++o){const l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===2302,r=e.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(i)c=!0;else{const h=o*n,d=h-n,f=h+n;for(let g=0;g!==n;++g){const _=t[h+g];if(_!==t[d+g]||_!==t[f+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const h=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Zi.prototype.TimeBufferType=Float32Array;Zi.prototype.ValueBufferType=Float32Array;Zi.prototype.DefaultInterpolation=2301;class Tr extends Zi{constructor(e,t,n){super(e,t,n)}}Tr.prototype.ValueTypeName="bool";Tr.prototype.ValueBufferType=Array;Tr.prototype.DefaultInterpolation=2300;Tr.prototype.InterpolantFactoryMethodLinear=void 0;Tr.prototype.InterpolantFactoryMethodSmooth=void 0;class ou extends Zi{}ou.prototype.ValueTypeName="color";class yr extends Zi{}yr.prototype.ValueTypeName="number";class C0 extends aa{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t);let l=e*o;for(let u=l+o;l!==u;l+=4)An.slerpFlat(r,0,a,l-o,a,l,c);return r}}class Mr extends Zi{InterpolantFactoryMethodLinear(e){return new C0(this.times,this.values,this.getValueSize(),e)}}Mr.prototype.ValueTypeName="quaternion";Mr.prototype.InterpolantFactoryMethodSmooth=void 0;class Rr extends Zi{constructor(e,t,n){super(e,t,n)}}Rr.prototype.ValueTypeName="string";Rr.prototype.ValueBufferType=Array;Rr.prototype.DefaultInterpolation=2300;Rr.prototype.InterpolantFactoryMethodLinear=void 0;Rr.prototype.InterpolantFactoryMethodSmooth=void 0;class Sr extends Zi{}Sr.prototype.ValueTypeName="vector";class pc{constructor(e="",t=-1,n=[],i=2500){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=zi(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(L0(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(Zi.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const u=A0(c);c=$l(c,1,u),l=$l(l,1,u),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new yr(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],u=l.name.match(r);if(u&&u.length>1){const h=u[1];let d=i[h];d||(i[h]=d=[]),d.push(l)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,g,_){if(f.length!==0){const m=[],p=[];ru(f,m,p,g),m.length!==0&&_.push(new h(d,m,p))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let h=0;h<l.length;h++){const d=l[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let x=0;x!==d[g].morphTargets.length;++x){const y=d[g];m.push(y.time),p.push(y.morphTarget===_?1:0)}i.push(new yr(".morphTargetInfluence["+_+"]",m,p))}c=f.length*a}else{const f=".bones["+t[h].name+"]";n(Sr,f+".position",d,"pos",i),n(Mr,f+".quaternion",d,"rot",i),n(Sr,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,c,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function P0(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return yr;case"vector":case"vector2":case"vector3":case"vector4":return Sr;case"color":return ou;case"quaternion":return Mr;case"bool":case"boolean":return Tr;case"string":return Rr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function L0(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=P0(s.type);if(s.times===void 0){const t=[],n=[];ru(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Ps={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class I0{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,r===!1&&i.onStart!==void 0&&i.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){const f=l[h],g=l[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}}const cu=new I0;class Cr{constructor(e){this.manager=e!==void 0?e:cu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Cr.DEFAULT_MATERIAL_NAME="__DEFAULT";const ss={};class D0 extends Error{constructor(e,t){super(e),this.response=t}}class lu extends Cr{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Ps.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(ss[e]!==void 0){ss[e].push({onLoad:t,onProgress:n,onError:i});return}ss[e]=[],ss[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=ss[e],h=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){x();function x(){h.read().then(({done:y,value:b})=>{if(y)p.close();else{_+=b.byteLength;const L=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let w=0,C=u.length;w<C;w++){const E=u[w];E.onProgress&&E.onProgress(L)}p.enqueue(b),x()}},y=>{p.error(y)})}}});return new Response(m)}else throw new D0(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{Ps.add(e,l);const u=ss[e];delete ss[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(l)}}).catch(l=>{const u=ss[e];if(u===void 0)throw this.manager.itemError(e),l;delete ss[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class F0 extends Cr{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ps.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=na("img");function c(){u(),Ps.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(h){u(),i&&i(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class hu extends Cr{constructor(e){super(e)}load(e,t,n,i){const r=new Gn,a=new F0(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class uo extends Pn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new st(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class eh extends uo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new st(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Yo=new tt,th=new I,nh=new I;class Nc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new We(512,512),this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wc,this._frameExtents=new We(1,1),this._viewportCount=1,this._viewports=[new ln(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;th.setFromMatrixPosition(e.matrixWorld),t.position.copy(th),nh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(nh),t.updateMatrixWorld(),Yo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Yo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Yo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class N0 extends Nc{constructor(){super(new vi(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=xr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class U0 extends uo{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Pn.DEFAULT_UP),this.updateMatrix(),this.target=new Pn,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new N0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const ih=new tt,Hr=new I,Ko=new I;class O0 extends Nc{constructor(){super(new vi(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new We(4,2),this._viewportCount=6,this._viewports=[new ln(2,1,1,1),new ln(0,1,1,1),new ln(3,1,1,1),new ln(1,1,1,1),new ln(3,0,1,1),new ln(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Hr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Hr),Ko.copy(n.position),Ko.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ko),n.updateMatrixWorld(),i.makeTranslation(-Hr.x,-Hr.y,-Hr.z),ih.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ih)}}class fo extends uo{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new O0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class B0 extends Nc{constructor(){super(new ao(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class mc extends uo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pn.DEFAULT_UP),this.updateMatrix(),this.target=new Pn,this.shadow=new B0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ea{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class k0 extends Cr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ps.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Ps.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),Ps.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Ps.add(e,c),r.manager.itemStart(e)}}class z0{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,a;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,r=e*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[r+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const c=t*this._origIndex;this._mixBufferRegion(n,i,c,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){o.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,a=i;r!==a;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){An.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){const a=this._workIndex*r;An.multiplyQuaternionsFlat(e,a,e,t,e,n),An.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,r){const a=1-i;for(let o=0;o!==r;++o){const c=t+o;e[c]=e[c]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,r){for(let a=0;a!==r;++a){const o=t+a;e[o]=e[o]+e[n+a]*i}}}const Uc="\\[\\]\\.:\\/",G0=new RegExp("["+Uc+"]","g"),Oc="[^"+Uc+"]",H0="[^"+Uc.replace("\\.","")+"]",V0=/((?:WC+[\/:])*)/.source.replace("WC",Oc),W0=/(WCOD+)?/.source.replace("WCOD",H0),X0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Oc),j0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Oc),q0=new RegExp("^"+V0+W0+X0+j0+"$"),Y0=["material","materials","bones","map"];class K0{constructor(e,t,n){const i=n||gn.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class gn{constructor(e,t,n){this.path=t,this.parsedPath=n||gn.parseTrackName(t),this.node=gn.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new gn.Composite(e,t,n):new gn(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(G0,"")}static parseTrackName(e){const t=q0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);Y0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=gn.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[i];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}gn.Composite=K0;gn.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};gn.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};gn.prototype.GetterByBindingType=[gn.prototype._getValue_direct,gn.prototype._getValue_array,gn.prototype._getValue_arrayElement,gn.prototype._getValue_toArray];gn.prototype.SetterByBindingTypeAndVersioning=[[gn.prototype._setValue_direct,gn.prototype._setValue_direct_setNeedsUpdate,gn.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[gn.prototype._setValue_array,gn.prototype._setValue_array_setNeedsUpdate,gn.prototype._setValue_array_setMatrixWorldNeedsUpdate],[gn.prototype._setValue_arrayElement,gn.prototype._setValue_arrayElement_setNeedsUpdate,gn.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[gn.prototype._setValue_fromArray,gn.prototype._setValue_fromArray_setNeedsUpdate,gn.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class J0{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const r=t.tracks,a=r.length,o=new Array(a),c={endingStart:2400,endingEnd:2400};for(let l=0;l!==a;++l){const u=r[l].createInterpolant(null);o[l]=u,u.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=2201,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,r=e._clip.duration,a=r/i,o=i/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,r=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const c=o.parameterPositions,l=o.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/a,l[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case 2501:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(a),l[u].accumulateAdditive(o);break;case 2500:default:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(a),l[u].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,r=this._loopCount;const a=n===2202;if(e===0)return r===-1?i:a&&(r&1)===1?t-i:i;if(n===2200){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){const o=Math.floor(i/t);i-=t*o,r+=Math.abs(o);const c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){const l=e<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=2401,i.endingEnd=2401):(e?i.endingStart=this.zeroSlopeAtStart?2401:2400:i.endingStart=2402,t?i.endingEnd=this.zeroSlopeAtEnd?2401:2400:i.endingEnd=2402)}_scheduleFading(e,t,n){const i=this._mixer,r=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,c=a.sampleValues;return o[0]=r,c[0]=t,o[1]=r+e,c[1]=n,this}}const Z0=new Float32Array(1);class Q0 extends Ks{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,a=e._propertyBindings,o=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let u=l[c];u===void 0&&(u={},l[c]=u);for(let h=0;h!==r;++h){const d=i[h],f=d.name;let g=u[f];if(g!==void 0)++g.referenceCount,a[h]=g;else{if(g=a[h],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,f));continue}const _=t&&t._propertyBindings[h].binding.parsedPath;g=new z0(gn.create(n,f,_),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,f),a[h]=g}o[h].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,r=this._actionsByClip;let a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,a=this._actionsByClip,o=a[r],c=o.knownActions,l=c[c.length-1],u=e._byClipCacheIndex;l._byClipCacheIndex=u,c[u]=l,c.pop(),e._byClipCacheIndex=null;const h=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete h[d],c.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,r=this._bindings;let a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[i],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new au(new Float32Array(2),new Float32Array(2),1,Z0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const i=t||this._root,r=i.uuid;let a=typeof e=="string"?pc.findByName(i,e):e;const o=a!==null?a.uuid:e,c=this._actionsByClip[o];let l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=2500),c!==void 0){const h=c.actionByRoot[r];if(h!==void 0&&h.blendMode===n)return h;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;const u=new J0(this,a,t,n);return this._bindAction(u,l),this._addInactiveAction(u,o,r),u}existingAction(e,t){const n=t||this._root,i=n.uuid,r=typeof e=="string"?pc.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(i,e,r,a);const o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const a=r.knownActions;for(let o=0,c=a.length;o!==c;++o){const l=a[o];this._deactivateAction(l);const u=l._cacheIndex,h=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,c=o[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(const a in r){const o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");function qi(s,e=!1){const t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,c=new Sn;let l=0;for(let u=0;u<s.length;++u){const h=s[u];let d=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in h.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(h.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in h.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(h.morphAttributes[f])}if(e){let f;if(t)f=h.index.count;else if(h.attributes.position!==void 0)f=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,u),l+=f}}if(t){let u=0;const h=[];for(let d=0;d<s.length;++d){const f=s[d].index;for(let g=0;g<f.count;++g)h.push(f.getX(g)+u);u+=s[d].attributes.position.count}c.setIndex(h)}for(const u in r){const h=sh(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in a){const h=a[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let d=0;d<h;++d){const f=[];for(let _=0;_<a[u].length;++_)f.push(a[u][_][d]);const g=sh(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function sh(s){let e,t,n,i=-1,r=0;for(let l=0;l<s.length;++l){const u=s[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=u.gpuType),i!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}const a=new e(r),o=new fn(a,t,n);let c=0;for(let l=0;l<s.length;++l){const u=s[l];if(u.isInterleavedBufferAttribute){const h=c/t;for(let d=0,f=u.count;d<f;d++)for(let g=0;g<t;g++){const _=u.getComponent(d,g);o.setComponent(d+h,g,_)}}else a.set(u.array,c);c+=u.count*t}return i!==void 0&&(o.gpuType=i),o}function rh(s,e){if(e===0)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===2||e===1){let t=s.getIndex();if(t===null){const a=[],o=s.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===2)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}const ah='"Fredoka", "Bricolage Grotesque", sans-serif',$0="#cfdcc4",Jo="#d0a54e",Wi="#b98d5c",oh="#6e4a2c",eb="#f1ead6",ch="#6b2436";function tb(s,e,{box:t,span:n,material:i,model:r}){const a=e.shell;if(!a)return null;const o=new mt;s.add(o);const[c,l,u]=e.floors,h=()=>{const ne=new mt;return o.add(ne),ne},d=(ne,Q,Ee,ye,Te,Ne)=>r&&r(Q,Ee,ye,Te,($e,Ze)=>{ne.visible=!1,Ne&&Ne($e,Ze)}),f=a.plaster,g=a.tile,_=a.tileH,m=document.createElement("canvas");m.width=200,m.height=230;const p=m.getContext("2d");p.fillStyle=g,p.fillRect(0,0,200,230),p.fillStyle=$0;for(let ne=0;ne<200;ne+=200*a.tilePitch)p.fillRect(ne,12,2.4,218);p.fillRect(0,230-230/2,200,2.4),p.fillStyle="#dcc48e",p.fillRect(0,2,200,9);const x=new pi(m);x.colorSpace=rn,x.wrapS=1e3,x.anisotropy=4;const y=new Qn(1,1).translate(0,.5,0);function b(ne,Q,Ee,ye,Te=0){const Ne=x.clone();Ne.needsUpdate=!0,Ne.repeat.set(Math.abs(Ee-Q),1);const $e=new Ve(y,new Fn({map:Ne}));return $e.scale.set(Math.abs(Ee-Q),_,1),ne?($e.rotation.y=Math.PI/2,$e.position.set(ye+.006,Te,(Q+Ee)/2)):$e.position.set((Q+Ee)/2,Te,ye+.006),$e.receiveShadow=!0,o.add($e),$e}function L(ne,Q,Ee,ye,Te,Ne,$e,Ze=[]){const at=[...Ze].sort((wt,St)=>wt[0]-St[0]);let Lt=Q;const Et=(wt,St,sn,Jt)=>ne?n(o,ye-Te,ye,Ne+sn,Ne+Jt,wt,St,f):n(o,wt,St,Ne+sn,Ne+Jt,ye-Te,ye,f);at.forEach(([wt,St,sn])=>{wt>Lt&&(Et(Lt,wt,0,$e),b(ne,Lt,wt,ye,Ne)),Et(wt,St,sn,$e),Lt=St}),Ee>Lt&&(Et(Lt,Ee,0,$e),b(ne,Lt,Ee,ye,Ne))}const w=c.z-c.d/2;L(!1,(c.x||0)-c.w/2,(c.x||0)+c.w/2,w,.25,0,l.y-.32,[[a.exitDoor.x0,a.exitDoor.x1,a.exitDoor.h]]);const C=l.z-l.d/2,E=-l.w/2;L(!1,E,l.w/2,C,.25,l.y,u.y-l.y-.32),L(!0,C,C+3.5,E,.25,l.y,u.y-l.y-.32);const v=u.z-u.d/2,M=-u.w/2,P=e.rooftop?e.rooftop.y-.34-u.y:3.9,G=u.y+P,O=1.44,q=new ms({color:"#cfe6df",roughness:.1,metalness:0,transparent:!0,opacity:.26,depthWrite:!1});function ie(ne,Q,Ee,ye,Te){const Ne=Math.max(2,Math.round((Ee-Q)/a.glazingBay)),$e=(Ee-Q)/Ne,Ze=u.y;let at=null;if(Te!==void 0){const wt=Math.max(0,Math.min(Ne-2,Math.round((Te-Q)/$e)-1));at=[Q+wt*$e,Q+(wt+2)*$e]}const Lt=(wt,St,sn,Jt,dn=.09)=>ne?n(o,ye-dn,ye+dn*.3,sn,Jt,wt,St,"#2c5a44"):n(o,wt,St,sn,Jt,ye-dn,ye+dn*.3,"#2c5a44");Lt(Q,Ee,Ze,Ze+.3,.16);for(let wt=0;wt<=Ne;wt++){const St=Q+wt*$e;Lt(St-.035,St+.035,Ze+.3,Ze+P)}Lt(Q,Ee,Ze+2.92,Ze+2.98),Lt(Q,Ee,Ze+P-.08,Ze+P);const Et=ne?n(o,ye-.02,ye,Ze+.3,Ze+P,Q,Ee,"#cfe6df",{cast:!1}):n(o,Q,Ee,Ze+.3,Ze+P,ye-.02,ye,"#cfe6df",{cast:!1});return Et.material=q,Et.receiveShadow=!1,at&&n(o,at[0]+.035,at[1]-.035,Ze+.3,Ze+P-.08,ye-.06,ye-.02,"#2f5d4a"),at}const D=ie(!1,M,a.topLanding.outer,v,a.fanX);ie(!0,v,v+3.5,M);const X=new mt,k=D?(D[0]+D[1])/2:a.fanX;X.position.set(k,u.y+2.15,v+.02),o.add(X);let le=null;d(X,"exhaust_fan.glb",k,u.y+2.15,v+.02,ne=>{le=ne.getObjectByName("Rotor")}),t(X,0,-.72,.06,1.44,1.44,.14,"#2f6b52");const K=new Ve(new wn(.56,.56,.05,40).rotateX(Math.PI/2),i("#1d3028"));K.position.z=.14,X.add(K);const Z=new mt;Z.position.z=.18,X.add(Z);for(let ne=0;ne<4;ne++){const Q=new Ve(new yn(.44,.17,.02).translate(.27,0,0),i("#b9cbb4"));Q.rotation.z=ne*Math.PI/2,Q.rotation.x=.25,Z.add(Q)}const xe=new Ve(new wn(.1,.1,.06,20).rotateX(Math.PI/2),i("#d8c18b"));Z.add(xe);const Ce=1.46,te=e.rooftop?2:0,fe=1.8,De=Ce*fe,_e=.5,ot=a.topLanding.outer-.035,rt=ot-te*De,_t=G+O*fe/2,vt=v-.09,yt=e.rooftop?new hs(new I(.816,-1,0).normalize(),(G-.816*e.rooftop.x1)/Math.hypot(.816,1)):null,At=[],H=ne=>{const Q=ne.clone();return Q.clippingPlanes=At,Q},tn=new st("#2c5a44"),Ct=Array.from({length:te},(ne,Q)=>new tt().makeTranslation(rt+De*(Q+.5),_t,vt).scale(new I(fe,fe,fe*_e)));let ht=null;r&&te&&r("exhaust_fan.glb",0,0,0,(ne,Q)=>{const Ee=new tt().copy(Q.parent.matrixWorld).invert(),ye=new tt,Te=ne.getObjectByName("Rotor"),Ne=[];At.push(yt.clone().applyMatrix4(Q.parent.matrixWorld)),Q.updateMatrixWorld(!0),ne.traverse($e=>{if(!$e.isMesh)return;let Ze=!1;for(let Et=$e;Et;Et=Et.parent)Et===Te&&(Ze=!0);const at=/^(Housing|FrontFrame)/.test($e.name)?Object.assign($e.material.clone(),{color:tn}):$e.material,Lt=new fi($e.geometry,Array.isArray(at)?at.map(H):H(at),te);ye.multiplyMatrices(Ee,$e.matrixWorld),Ct.forEach((Et,wt)=>Lt.setMatrixAt(wt,new tt().multiplyMatrices(Et,ye))),Lt.computeBoundingSphere(),Lt.castShadow=!1,Lt.receiveShadow=!0,o.add(Lt),Ze&&Ne.push({part:$e,mesh:Lt})}),Q.parent.remove(Q),ht={rotor:Te,holder:Q,parentInverse:new tt,spinning:Ne}});const lt=new wn(.09,.09,.22,12).translate(0,.11,0),an=new yn(.18,.26,.07).translate(0,.13,0),ce=[],R=ne=>{const Q={g:ne,jars:[],pouches:[]};return ce.push(Q),Q};function S(ne,Q,Ee,ye,Te,Ne,$e,Ze,at){const{jars:Lt,pouches:Et}=R(ne);n(ne,Q,Ee,Ne,Ne+$e,ye,ye+.05,oh,{cast:!1}),n(ne,Q,Ee,Ne,Ne+.14,ye,ye+Te,Wi),n(ne,Q-.02,Ee+.02,Ne+$e-.1,Ne+$e,ye,ye+Te+.02,Wi);const wt=(Ee-Q)/Ze;for(let St=0;St<=Ze;St++)n(ne,Q+St*wt-.035,Q+St*wt+.035,Ne,Ne+$e,ye,ye+Te,Wi);for(let St=1;St<=at;St++){const sn=Ne+.14+($e-.24)*St/(at+1);n(ne,Q,Ee,sn-.04,sn,ye,ye+Te,"#c79f6c",{cast:!1});for(let Jt=0;Jt<Ze;Jt++)for(let dn=0;dn<4;dn++){const ni=Q+Jt*wt+wt*(dn+.5)/4,kn=ye+Te*.55;((Jt+St+dn)%3?Lt:Et).push([ni,sn,kn,(Jt*7+St*3+dn)%4])}if(St===1)for(let Jt=0;Jt<Ze;Jt++)for(let dn=0;dn<4;dn++)Lt.push([Q+Jt*wt+wt*(dn+.5)/4,Ne+.14,ye+Te*.55,(Jt+dn)%4])}}const B=a.loungeFront,se=B-.81,de=a.loungeDoor.x,re=a.loungeRight,Fe=l.y-.32;n(o,-11.03,de-.7,0,Fe,se,B,f),n(o,de-.7,de+.7,a.loungeHeader,Fe,se,B,f),n(o,de+.7,re+.16,0,Fe,se,B,f),b(!1,-11.03,de-.7,B),b(!1,de+.7,a.wallLeft,B),b(!1,a.wallLeft,re+.16,B),n(o,-11.5,-11.18,0,3.95,w,B,f),b(!0,w,B,-11.18);const ve=a.loungeExit.z,Pe=.92,Pt=2.84;n(o,re-.16,re+.16,0,Fe,w,ve-Pe,f),n(o,re-.16,re+.16,Pt,Fe,ve-Pe,ve+Pe,f),n(o,re-.16,re+.16,0,Fe,ve+Pe,B,f),b(!0,w,ve-Pe-.04,re+.16),b(!0,ve+Pe+.04,B,re+.16),n(o,re-.1,re+.1,0,Pt,ve-Pe,ve+Pe,"#0d1310",{cast:!1});const Se=[];e.rooftop||(n(o,-11.18,re-.16,.002,.012,w,se,"#2a1b22",{cast:!1}),n(o,-10.95,-9.25,.012,.022,-5.3,-2.9,"#5a2638",{cast:!1}),n(o,-10.75,-9.45,.022,.03,-5.1,-3.1,"#7a3a4c",{cast:!1}),[[-6.15,-5.55,1],[-2.65,-2.05,-1]].forEach(([ne,Q,Ee])=>{n(o,-10.9,-9.3,0,.48,ne,Q,ch);const ye=Ee>0?[ne,ne+.16]:[Q-.16,Q];n(o,-10.9,-9.3,.48,.95,ye[0],ye[1],"#5c1e30"),n(o,-10.9,-10.72,.48,.7,ne,Q,"#5c1e30"),n(o,-9.48,-9.3,.48,.7,ne,Q,"#5c1e30")}),n(o,-10.55,-9.65,0,.4,-4.35,-3.85,"#3a2a1e"),[[-10.7,-6.6],[-10.7,-1.55],[-9.6,-4.1]].forEach(([ne,Q])=>{t(o,ne,0,Q,.4,.62,.4,"#3a2a1e"),t(o,ne,.62,Q,.04,.4,.04,"#d8c18b",{cast:!1});const Ee=new Ve(new wn(.13,.2,.26,16).translate(0,.13,0),new Fn({color:"#f3d9a6",emissive:"#ffb36a",emissiveIntensity:0}));Ee.position.set(ne,1,Q),o.add(Ee),Se.push(Ee)}));const ze=i(ch);function nt(ne){const Q=ne?{centre:ve,plane:re+.2,scale:1.35,top:2.78}:{centre:de,plane:B+.05,scale:1,top:a.loungeHeader+.02},Ee=[-1,1].map(Te=>{const Ne=new Ve(dt,ze);return Ne.castShadow=!0,o.add(Ne),{side:Te,m:Ne}}),ye=ne?n(o,Q.plane-.05,Q.plane+.09,Q.top-.1,Q.top+.06,Q.centre-Pe-.02,Q.centre+Pe+.02,"#4a1b29"):n(o,Q.centre-.75,Q.centre+.75,Q.top-.1,Q.top+.06,Q.plane-.05,Q.plane+.09,"#4a1b29");return{pair:Ee,pelmet:ye,exit:ne,set(Te,Ne){ye.visible=Ne,Ee.forEach(({side:$e,m:Ze})=>{Ze.visible=Ne;const at=.68*Q.scale,Lt=(.07+(.5-.07)*Te)*Q.scale,Et=Math.max(.08,at-Lt),wt=$e*(Lt+Et/2);ne?(Ze.position.set(Q.plane,0,Q.centre+wt),Ze.scale.set(.08,Q.top-.08,Et)):(Ze.position.set(Q.centre+wt,0,Q.plane),Ze.scale.set(Et,Q.top-.08,.08))})}}}const dt=new yn(1,1,1).translate(0,.5,0),Ke=nt(!1),Gt=nt(!0);r&&r("lounge_drapes.glb",0,0,0,(ne,Q)=>{Q.removeFromParent(),ne.updateMatrixWorld(!0);const Ee=$e=>{const Ze=ne.getObjectByName($e),at=[];if(!Ze)return null;const Lt=new tt().copy(Ze.matrixWorld).invert();Ze.traverse(sn=>{if(!sn.isMesh)return;const Jt=sn.geometry.clone().applyMatrix4(new tt().multiplyMatrices(Lt,sn.matrixWorld)),dn=sn.material.color,ni=Jt.attributes.position.count,kn=new Float32Array(ni*3);for(let ii=0;ii<ni;ii++)kn.set([dn.r,dn.g,dn.b],ii*3);Jt.setAttribute("color",new fn(kn,3)),Object.keys(Jt.attributes).forEach(ii=>{["position","normal","color"].includes(ii)||Jt.deleteAttribute(ii)}),at.push(Jt)});const Et=qi(at);Et.computeBoundingBox();const wt=Et.boundingBox,St=wt.getSize(new I);return Et.translate(-(wt.min.x+wt.max.x)/2,-wt.min.y,-(wt.min.z+wt.max.z)/2).scale(1/St.x,1/St.y,1/St.z),Et.computeVertexNormals(),Et},ye=Ee("Drape"),Te=Ee("Pelmet");if(!ye||!Te)return;const Ne=i("#ffffff",{vertexColors:!0});[Ke,Gt].forEach($e=>{const Ze=at=>$e.exit?at.clone().rotateY(-Math.PI/2):at;$e.pair.forEach(({m:at})=>{at.geometry=Ze(ye),at.material=Ne}),$e.pelmet.geometry=Ze(Te),$e.pelmet.material=Ne})});const Tt=e.rooftop?null:n(o,de-.7,de+.7,0,a.loungeHeader,B,B+.08,"#2d6146"),jt=n(o,re+.16,re+.21,0,Pt-.24,ve-Pe+.15,ve+Pe-.15,"#3a2a1e"),V=document.createElement("canvas");V.width=512,V.height=184;const Re=new pi(V);Re.colorSpace=rn;const ue=new Cn({map:Re,transparent:!0}),ge=new Ve(new Qn(2,.72),ue);ge.position.set(a.loungeSign.x,a.loungeSign.y,B+.03),ge.scale.setScalar(a.loungeSign.scale),o.add(ge);let Oe=null;typeof FontFace=="function"&&document.fonts&&(new FontFace("Fredoka",`url(${new URL("../fonts/Fredoka-SemiBold.ttf",e.modelBase).href})`,{weight:"600"}).load().then(ne=>{document.fonts.add(ne),Oe=null,gi=null,Yn=!0}).catch(()=>{}),new FontFace("Yellowtail",`url(${new URL("../fonts/Yellowtail-Regular.woff2",e.modelBase).href})`).load().then(ne=>{document.fonts.add(ne),Oe=null}).catch(()=>{}));function Ge(ne){if(Oe===ne)return;Oe=ne;const Q=V.getContext("2d");Q.clearRect(0,0,512,184),Q.fillStyle="#1a1216",Q.beginPath(),Q.roundRect(6,8,500,168,22),Q.fill();const Ee=(ye,Te,Ne,$e,Ze,at)=>{ne?(Q.shadowColor=$e,Q.shadowBlur=22,Q.fillStyle=$e,Q.fillText(ye,Te,Ne),Q.shadowBlur=0,Q.fillStyle=Ze,Q.fillText(ye,Te,Ne)):(Q.fillStyle=at,Q.fillText(ye,Te,Ne))};Q.textAlign="center",Q.textBaseline="middle",Q.save(),Q.translate(256,56),Q.rotate(-.06),Q.font='400 88px "Yellowtail", cursive',Ee("Rooftop",0,0,"#ffbf5a","#fff1d6","#5d5040"),Q.restore(),Q.font=`600 72px ${ah}`,Ee("LOUNGE",256,128,"#ff8fbf","#fff4f8","#5a4750"),Re.needsUpdate=!0}const Xe={x0:a.loungeDoor.x+1.25,x1:a.shelfLeft-.78,y:1,h:1.9},nn=h();Xe.x=(Xe.x0+Xe.x1)/2,Xe.w=Xe.x1-Xe.x0,n(nn,Xe.x-Xe.w/2-.14,Xe.x+Xe.w/2+.14,Xe.y-.12,Xe.y+Xe.h+.12,B,B+.1,Wi),n(nn,Xe.x-Xe.w/2+.04,Xe.x+Xe.w/2-.04,Xe.y+.04,Xe.y+Xe.h-.04,B+.1,B+.12,Jo,{cast:!1});const Tn=document.createElement("canvas");Tn.width=1024,Tn.height=240;const Wt=new pi(Tn);Wt.colorSpace=rn,Wt.anisotropy=4;const pe=new Ve(new Qn(Xe.w-.14,Xe.h-.14),new Cn({map:Wt}));pe.position.set(Xe.x,Xe.y+Xe.h/2,B+.125),nn.add(pe),d(nn,"menu_board.glb",Xe.x,0,B,(ne,Q)=>{Q.scale.x=Xe.w/3.18,Q.scale.y=Xe.h/1.07,Q.position.y=Xe.y-1.218*Q.scale.y;const Ee=ne.getObjectByName("BoardFace");Ee&&Ee.traverse(ye=>{if(!ye.isMesh)return;const Te=ye.geometry.attributes.uv;for(let Ne=0;Ne<Te.count;Ne++)Te.setY(Ne,1-Te.getY(Ne));Te.needsUpdate=!0,ye.material=pe.material})});const Nn=" ABCDEFGHIJKLMNOPQRSTUVWXYZ$0123456789.,",qn=55,$n=9;let Ln=null,gi=null,Yn=!1;function Hi(ne,Q){const Ee=ne.length,ye=ne[0]?ne[0].length:21;if((!Ln||Ln.length!==Ee||Ln[0].length!==ye)&&(Ln=ne.map(at=>[...at].map(()=>({from:" ",to:" ",start:0})))),ne.forEach((at,Lt)=>[...at].forEach((Et,wt)=>{const St=Ln[Lt][wt];St.to!==Et&&(St.from=St.to,St.to=Et,St.start=Q+wt*35+Lt*90,Yn=!0)})),!Yn&&gi!==null)return;gi="";const Te=Tn.getContext("2d"),Ne=1024/ye,$e=240/Ee;Te.fillStyle="#131617",Te.fillRect(0,0,1024,240),Te.font=`600 ${Math.round($e*.66)}px ${ah}`,Te.textAlign="center",Te.textBaseline="middle";const Ze=(at,Lt,Et,wt,St)=>{const sn=Et+$e/2,Jt=($e/2-4)*St;Te.save(),Te.beginPath(),Te.rect(Lt+2,wt?sn-Jt:sn,Ne-4,Jt),Te.clip(),Te.fillStyle=wt?"#363c3e":"#2b3133",Te.fillRect(Lt+2,wt?sn-Jt:sn,Ne-4,Jt),at!==" "&&(Te.translate(0,sn),Te.scale(1,St),Te.fillStyle="#efe4c8",Te.fillText(at,Lt+Ne/2,1)),Te.restore()};Yn=!1,Ln.forEach((at,Lt)=>at.forEach((Et,wt)=>{const St=wt*Ne,sn=Lt*$e,Jt=Q-Et.start;let dn=Et.to,ni=Et.to,kn=1;if(Jt<0)dn=ni=Et.from,Yn=!0;else if(Et.from!==Et.to&&Jt<qn*$n){const ii=Math.floor(Jt/qn),gs=Nn.indexOf(Et.to)+Nn.length-$n;dn=ii?Nn[(gs+ii)%Nn.length]:Et.from,ni=Nn[(gs+ii+1)%Nn.length],kn=Jt%qn/qn,Yn=!0}else Et.from=Et.to;kn>=1?(Ze(dn,St,sn,!0,1),Ze(dn,St,sn,!1,1)):(Ze(ni,St,sn,!0,1),Ze(dn,St,sn,!1,1),kn<.5?Ze(dn,St,sn,!0,1-kn*2):Ze(ni,St,sn,!1,kn*2-1)),Te.fillStyle="#0d1113",Te.fillRect(St+2,sn+$e/2-1,Ne-4,2)})),Wt.needsUpdate=!0}const ci=h();S(ci,a.shelfLeft,a.wallRight,B,.64,0,3.3,5,4),d(ci,"product_shelving.glb",(a.shelfLeft+a.wallRight)/2,0,B+.32);const ei=h();S(ei,-9,9,C,.6,l.y,2.6,8,3),d(ei,"wall_shelving.glb",0,l.y,C+.3);const bn=h(),li=R(bn);d(bn,"arch_shelves.glb",-8.525,l.y,-4.85),n(bn,-8.85,-8.2,l.y,l.y+2.4,-5.9,-3.8,Wi);const Fi=new Ve(new wn(1.05,1.05,.65,32,1,!1,0,Math.PI).rotateZ(Math.PI/2),i(Wi));Fi.position.set(-8.525,l.y+2.4,-4.85),Fi.castShadow=!0,bn.add(Fi),n(bn,-8.21,-8.19,l.y+.2,l.y+2.3,-5.7,-4,"#e8dcc4",{cast:!1});for(let ne=0;ne<3;ne++)for(let Q=0;Q<3;Q++)li.jars.push([-8.35,l.y+.5+ne*.7,-5.45+Q*.6,(ne+Q)%4]);for(let ne=0;ne<3;ne++)n(bn,-8.85,-8.2,l.y+.45+ne*.7,l.y+.5+ne*.7,-5.8,-3.9,"#ecdbc1",{cast:!1});const Un=a.column,yi=h();t(yi,Un.x,0,Un.z,.78,1.73,.73,"#25523b"),t(yi,Un.x,1.73,Un.z,.8,.12,.76,"#e1dbc0"),t(yi,Un.x,1.85,Un.z,.75,Fe-1.85,.7,eb);const Mi=new Fn({color:"#fff2c8",emissive:"#ffd58a",emissiveIntensity:0}),T=new Ve(new Ti(.13,12,8),Mi);T.position.set(Un.x,2.6,Un.z+.42),yi.add(T);const W=(ne,Q,Ee)=>{const ye=ne.getObjectByName(Q);ye&&ye.traverse(Te=>{if(Te.isMesh){const Ne=Te.material.clone();Ne.emissive=Ee.emissive.clone(),Te.material=Ne,ae.push([Ne,Ee])}})},ae=[];d(yi,"shop_column.glb",Un.x,0,Un.z,ne=>W(ne,"Sconce",Mi));const ee=a.exitDoor,j=h();n(j,ee.x0-.14,ee.x0,0,ee.h+.14,w-.1,w+.12,"#1f4a35"),n(j,ee.x1,ee.x1+.14,0,ee.h+.14,w-.1,w+.12,"#1f4a35"),n(j,ee.x0-.14,ee.x1+.14,ee.h,ee.h+.2,w-.1,w+.12,"#1f4a35"),n(j,ee.x0,ee.x0+.06,.02,ee.h-.02,w+.1,w+.95,"#2d6146"),n(j,(ee.x0+ee.x1)/2-.4,(ee.x0+ee.x1)/2+.4,ee.h+.3,ee.h+.56,w,w+.08,"#1d3028");const we=new Ve(new yn(.66,.14,.04),new Fn({color:"#d84a3a",emissive:"#ff5a3c",emissiveIntensity:.4}));we.position.set((ee.x0+ee.x1)/2,ee.h+.43,w+.1),j.add(we),d(j,"exit_door.glb",(ee.x0+ee.x1)/2,0,w,ne=>{W(ne,"ExitLamp",we.material);const Q=ne.getObjectByName("DoorLeaf");Q&&(Q.rotation.y=-Q.rotation.y,Q.position.z=-Q.position.z)});const me=a.merchCabinet,He=h(),it=R(He);d(He,"merch_cabinet.glb",(me.back+me.face)/2,0,(me.z0+me.z1)/2,ne=>{const Q=ne.getObjectByName("CabinetGlass");Q&&Q.traverse(Ee=>{Ee.isMesh&&(Ee.material=q,Ee.castShadow=!1)})}),n(He,me.back,me.face,0,.2,me.z0,me.z1,oh),n(He,me.back,me.face,.2,2.6,me.z0,me.z0+.1,Wi),n(He,me.back,me.face,.2,2.6,me.z1-.1,me.z1,Wi),n(He,me.back,me.back+.12,.2,2.6,me.z0,me.z1,Wi);const Mt=new Ve(new wn((me.z1-me.z0)/2,(me.z1-me.z0)/2,me.face-me.back,32,1,!1,0,Math.PI).rotateZ(Math.PI/2),i(Wi));Mt.position.set((me.face+me.back)/2,2.6,(me.z0+me.z1)/2),Mt.castShadow=!0,He.add(Mt);for(let ne=0;ne<3;ne++){n(He,me.back+.12,me.face-.05,.55+ne*.68,.6+ne*.68,me.z0+.1,me.z1-.1,"#ecdbc1",{cast:!1});for(let Q=0;Q<4;Q++)(Q%2?it.pouches:it.jars).push([(me.back+me.face)/2,.6+ne*.68,me.z0+.35+Q*(me.z1-me.z0-.7)/3,(ne+Q)%4])}const It=n(He,me.face-.03,me.face,.2,2.6,me.z0+.1,me.z1-.1,"#cfe6df",{cast:!1});It.material=q;const je=e.marquee,Ht=je.zFront-je.zRear,qt=document.createElement("canvas");qt.width=2048,qt.height=192;const Ut=qt.getContext("2d");Ut.fillStyle="#f1e7cc",Ut.fillRect(0,0,2048,96),Ut.fillStyle="#1f6b47",Ut.fillRect(0,96,2048,96),Ut.font='800 54px "Bricolage Grotesque", sans-serif',Ut.textAlign="center",Ut.textBaseline="middle",je.top.forEach((ne,Q)=>{Ut.fillStyle="#1f5e40",Ut.fillText(ne,(Q+.5)*512,50)}),Ut.font='700 40px "Bricolage Grotesque", sans-serif',je.bottom.forEach((ne,Q)=>{Ut.fillStyle="#f1e7cc",Ut.fillText(ne,(Q+.5)*512,146)}),Ut.fillStyle="#1a1e20";for(let ne=1;ne<4;ne++)Ut.fillRect(ne*512-3,0,6,192);const Je=new pi(qt);Je.colorSpace=rn,Je.anisotropy=4;const $t=new Fn({map:Je,emissive:"#ffffff",emissiveMap:Je,emissiveIntensity:.15}),Be=new Ve(new Qn(Ht,je.y1-je.y0),$t);Be.rotation.y=Math.PI/2,Be.position.set(je.x+.17,(je.y0+je.y1)/2,(je.zFront+je.zRear)/2),e.wallFaces||o.add(Be);const kt=a.planter,Ot=h();d(Ot,"shop_planter.glb",(kt.x0+kt.x1)/2,0,(kt.z0+kt.z1)/2),n(Ot,kt.x0,kt.x1,0,.56,kt.z0,kt.z1,"#1f5e40"),n(Ot,kt.x0-.04,kt.x1+.04,.56,.63,kt.z0-.04,kt.z1+.04,"#2b302d"),n(Ot,kt.x0+.1,kt.x1-.1,.63,.66,kt.z0+.1,kt.z1-.1,"#514633",{cast:!1});const Yt=a.baseboard,Kt=.14;[[Yt.x0,Yt.x1,Yt.front-Kt,Yt.front],[Yt.x1-Kt,Yt.x1,Yt.rear,Yt.front-Kt]].forEach(([ne,Q,Ee,ye])=>{n(o,ne,Q,0,Yt.h-.1,Ee,ye,"#1f5e40"),n(o,ne-.01,Q+.01,Yt.h-.1,Yt.h-.07,Ee-.01,ye+.01,Jo,{cast:!1}),n(o,ne-.02,Q+.02,Yt.h-.07,Yt.h,Ee-.03,ye+.03,"#e1dbc0")});const Rn=[],ti=new Ai(1,1),on=(ne,Q,Ee,ye,Te)=>{const Ne=new Ve(ti,i(Te));Ne.position.set(ne,Q,Ee),Ne.scale.set(ye,ye*.8,ye),Ne.castShadow=Ne.receiveShadow=!0,Ot.add(Ne)};[-1.2,-.5,.2,.9,1.6].forEach((ne,Q)=>on((kt.x0+kt.x1)/2+(Q%2?.08:-.08),.9,(kt.z0+kt.z1)/2+ne,.3,Q%2?"#6b9250":"#5f8648")),t(Ot,kt.tree.x,.63,kt.tree.z,.16,2.4,.16,"#816747"),[[0,3.2,0,.75,"#769852"],[-.35,2.9,.3,.55,"#587c4d"],[.3,3.05,-.3,.55,"#98b96e"]].forEach(([ne,Q,Ee,ye,Te])=>on(kt.tree.x+ne,Q,kt.tree.z+Ee,ye,Te));const pn=a.hanging,hi=h(),Dn=[];n(hi,pn.x0,pn.x1,pn.y-.04,pn.y,pn.z-.03,pn.z+.03,Jo,{cast:!1});for(let ne=0;ne<18;ne++){const Q=pn.x0+(pn.x1-pn.x0)*(ne+.5)/18,Ee=.5+(1-Math.abs(ne-8.5)/9)*.7+ne%3*.12;for(let ye=0;ye<6;ye++){const Te=ye/5;Dn.push([Q+Math.sin(ne*1.7+Te*3)*.06,pn.y-.05-Ee*Te,pn.z+(ne%2?.06:-.06)+Te*.08,(ne+ye)%3,.8])}}Rn.push([hi,Dn]),d(hi,"pothos_rail.glb",(pn.x0+pn.x1)/2,pn.y,pn.z),[[l,C],[u,v]].forEach(([ne,Q])=>(ne===u?[-2,2]:[-7,5]).forEach(Ee=>{const ye=Q+.9,Te=ne.y+Math.min(3.95,ne===u?3.5:3.95),Ne=h(),$e=[];n(Ne,Ee-.01,Ee+.01,Te-.7,Te,ye-.01,ye+.01,"#343f33",{cast:!1}),t(Ne,Ee,Te-1,ye,.55,.3,.48,"#b6ac8a");for(let Ze=0;Ze<14;Ze++){const at=Ze*2.399;$e.push([Ee+Math.cos(at)*.28,Te-.72-Ze%4*.18,ye+Math.sin(at)*.22,Ze%3,.9])}Rn.push([Ne,$e]),d(Ne,"hanging_basket.glb",Ee,Te,ye)}));const un=["#5f8648","#7aa257","#9cc46e"].map(ne=>new st(ne)),mn=new Ai(.13,0),Mn=i("#ffffff"),Xn=new tt,hn=new An,Fs=new I,Vi=new I;Rn.forEach(([ne,Q])=>{const Ee=new fi(mn,Mn,Q.length);Q.forEach(([ye,Te,Ne,$e,Ze],at)=>{hn.setFromEuler(new Ci(at*.7,at*1.3,0)),Ee.setMatrixAt(at,Xn.compose(Fs.set(ye,Te,Ne),hn,Vi.set(1.3*Ze,.7*Ze,1*Ze))),Ee.setColorAt(at,un[$e])}),Ee.castShadow=!0,Ee.receiveShadow=!0,ne.add(Ee)});const Kn=["#527e60","#b28b64","#75999a","#d5bd8c"].map(ne=>new st(ne));ce.forEach(ne=>[[lt,ne.jars],[an,ne.pouches]].forEach(([Q,Ee])=>{if(!Ee.length)return;const ye=new fi(Q,i("#ffffff"),Ee.length);Ee.forEach(([Te,Ne,$e,Ze],at)=>{ye.setMatrixAt(at,Xn.compose(Fs.set(Te,Ne,$e),hn.identity(),Vi.set(1,1,1))),ye.setColorAt(at,Kn[Ze])}),ye.castShadow=!0,ne.g.add(ye)}));const bi=a.lamps.map(([ne,Q,Ee,ye])=>{const Te=new fo("#ffc98a",0,11,1.2);return Te.position.set(ne,Q,Ee),Te.userData.power=ye,s.add(Te),Te});return{update(ne){const Q=ne.night||0,Ee=!!ne.loungeOpen;Z.rotation.z=-(ne.time||0)*Math.PI*2/2500,le&&(le.rotation.z=Z.rotation.z),ht&&ht.rotor&&(ht.rotor.rotation.z=Z.rotation.z,ht.holder.updateMatrixWorld(!0),ht.spinning.forEach(({part:ye,mesh:Te})=>{const Ne=new tt().multiplyMatrices(ht.parentInverse,ye.matrixWorld),$e=new tt;Ct.forEach((Ze,at)=>Te.setMatrixAt(at,$e.multiplyMatrices(Ze,Ne))),Te.instanceMatrix.needsUpdate=!0})),Ke.set(ne.loungeCurtain||0,Ee),Gt.set(ne.loungeExitCurtain||0,Ee),Tt&&(Tt.visible=!Ee),jt.visible=!Ee,Ge(Ee),ue.color.setScalar(Ee?1:.8),ne.menuLines&&Hi(ne.menuLines,performance.now()),Se.forEach(ye=>{ye.material.emissiveIntensity=Ee?.5+Q*1.2:0}),T.material.emissiveIntensity=.3+Q*1.4,we.material.emissiveIntensity=.4+Q*1.2,ae.forEach(([ye,Te])=>{ye.emissiveIntensity=Te.emissiveIntensity}),$t.emissiveIntensity=.15+Q*.7,bi.forEach(ye=>{ye.intensity=ye.userData.power*(.2+Q*5)})}}}const gc=Math.asin(Math.tan(Math.PI/6)),Bn=1/Math.cos(gc),lh=240;function hh(){const s=new ao(-1,1,1,-1,1,lh*2.5),e=Math.SQRT1_2,t=Math.SQRT1_2,n=Math.sin(gc),i=Math.cos(gc);return s.up.set(-e*n,i,-t*n),s.position.set(e*i,n,t*i).multiplyScalar(lh),s.lookAt(0,0,0),s}function nb(s,{width:e,height:t,centerX:n,centerY:i,unit:r}){s.left=-n/r,s.right=(e-n)/r,s.top=i/r,s.bottom=-(t-i)/r,s.updateProjectionMatrix(),s.updateMatrixWorld()}const ib=/^(Rotor|Flame|DoorLeaf|StaffPlaque|Wheel(FL|FR|BL|BR)$)/,Zo=new tt,uh=new tt,dh=(s,e)=>!!s.userData.motion||ib.test(s.name)||e;function sb(s){return s.isMesh&&!s.isInstancedMesh&&!s.isSkinnedMesh&&s.visible&&!Array.isArray(s.material)&&!s.material.transparent&&!Object.keys(s.geometry.morphAttributes).length&&!s.geometry.groups.length&&s.children.length===0}function rb(s){return Object.keys(s.attributes).sort().map(e=>e+s.attributes[e].itemSize).join()+(s.index?"|i":"")}function ab(s){const e=new Sn;return Object.entries(s.attributes).forEach(([t,n])=>{const i=new Float32Array(n.count*n.itemSize);for(let r=0;r<n.count;r++)for(let a=0;a<n.itemSize;a++)i[r*n.itemSize+a]=n.getComponent(r,a);e.setAttribute(t,new fn(i,n.itemSize))}),s.index&&e.setIndex(new fn(s.index.array.slice(),1)),e}function ob(s){if(s.index){const e=s.index;for(let t=0;t<e.count;t+=3){const n=e.getX(t+1);e.setX(t+1,e.getX(t+2)),e.setX(t+2,n)}return}Object.values(s.attributes).forEach(e=>{for(let t=0;t<e.count;t+=3)for(let n=0;n<e.itemSize;n++){const i=e.getComponent(t+1,n);e.setComponent(t+1,n,e.getComponent(t+2,n)),e.setComponent(t+2,n,i)}})}function js(s,e){s.updateMatrixWorld(!0),uh.copy(s.matrixWorld).invert();const t=new Map,n=[],i=o=>o.children.forEach(c=>{if(c.visible){if(dh(c,e)){n.push(c);return}if(sb(c)){const l=c.material.uuid+(c.castShadow?"c":"")+(c.receiveShadow?"r":"")+rb(c.geometry);t.has(l)||t.set(l,[]),t.get(l).push(c)}i(c)}});i(s);let r=0;t.forEach(o=>{if(o.length<2)return;const c=o.map(d=>{const f=ab(d.geometry);return Zo.multiplyMatrices(uh,d.matrixWorld),f.applyMatrix4(Zo),Zo.determinant()<0&&ob(f),f}),l=qi(c);if(!l)return;const u=o[0],h=new Ve(l,u.material);h.name="Merged"+(u.material.name||""),h.castShadow=u.castShadow,h.receiveShadow=u.receiveShadow,s.add(h),o.forEach(d=>d.removeFromParent()),r+=o.length-1});const a=o=>[...o.children].forEach(c=>{dh(c,e)||!c.visible||(a(c),(c.type==="Group"||c.type==="Object3D")&&!c.children.length&&c.removeFromParent())});return a(s),n.forEach(o=>{o.children.length&&(r+=js(o,e))}),r}const xn="#d0a54e",pr="#b98d5c",Vr="#6e4a2c",_i="#1f4a35",As="#efe4cf",rs="#6b2436";function cb(s,e,{box:t,span:n,material:i}){const r=e.rooftop;if(!r)return null;const a=new mt;s.add(a);const{x0:o,x1:c,z0:l,z1:u,y:h}=r,d=r.lift,f=Array.from({length:9},()=>new mt);f.forEach(N=>a.add(N));const[g,_,m,p,x,y,b,L,w]=f,C=f.slice(1),[E,v,M,P,G,O,q,ie]=C.map(N=>{const J=new mt;return N.add(J),J}),D=new mt;a.add(D);const X=new ms({color:"#cfe6df",roughness:.1,metalness:0,transparent:!0,opacity:.28,depthWrite:!1}),k=N=>(N.material=X,N.castShadow=!1,N.receiveShadow=!1,N),le=(N,J)=>new Fn({color:N,emissive:J,emissiveIntensity:0}),K=[];n(a,o,c,h-.3,h,l,u,"#e4ddcc"),n(a,o-.05,c+.05,h-.34,h-.22,l-.05,u+.05,"#e1dbc0",{cast:!1});const Z=e.floors[2].y,xe=e.floors[0].z-e.floors[0].d/2;[[o+.3,u-.3],[c-.3,u-.3]].forEach(([N,J])=>t(a,N,Z,J,.3,h-.3-Z,.3,"#33372f")),l<xe&&([o+.3,0,c-.3].forEach(N=>t(a,N,0,l+.3,.32,h-.3,.32,_i)),n(a,o,c,h-.62,h-.3,l+.14,l+.46,_i));const Ce=document.createElement("canvas");Ce.width=256,Ce.height=256;const te=Ce.getContext("2d");te.fillStyle="#b98654",te.fillRect(0,0,256,256);for(let N=0;N<8;N++)te.fillStyle=["#bf8c59","#b4814f","#c39260","#b78552"][N%4],te.fillRect(0,N*32+1,256,30),te.fillStyle="#8f6038",te.fillRect(N*97%256,N*32,2,32);const fe=new pi(Ce);fe.colorSpace=rn,fe.wrapS=fe.wrapT=1e3,fe.anisotropy=4,fe.repeat.set((c-o)/2.4,(u-l)/2.4);const De=new Ve(new Qn(c-o-.2,u-l-.2).rotateX(-Math.PI/2),new Fn({map:fe}));De.position.set((o+c)/2,h+.004,(l+u)/2),De.receiveShadow=!0,D.add(De);const _e=1.05,ot=[d.z-.6,d.z+.6];function rt(N,J,Me,Ae,ut){const ct=Math.max(1,Math.round((Me-J)/1.6)),bt=(Me-J)/ct,Ue=(Le,et,Rt,ft,gt,Zt,In)=>N?n(ut,Ae-gt,Ae+gt,Rt,ft,Le,et,Zt,In):n(ut,Le,et,Rt,ft,Ae-gt,Ae+gt,Zt,In);for(let Le=0;Le<=ct;Le++){const et=J+Le*bt;Ue(et-.04,et+.04,h,h+_e,.04,_i)}Ue(J,Me,h+_e-.03,h+_e+.03,.06,xn,{cast:!1}),k(Ue(J,Me,h+.08,h+_e-.05,.01,"#cfe6df"))}rt(!1,o,c,u,D),rt(!1,o,c,l,D),rt(!0,l,u,c,D),rt(!0,ot[1],u,o,D);const _t=r.lift2?[r.lift2.z-.6,r.lift2.z+.6]:null,vt=new mt;D.add(vt),_t?(rt(!0,l,_t[0],o,D),rt(!0,_t[1],ot[0],o,D),rt(!0,_t[0],_t[1],o,vt)):rt(!0,l,ot[0],o,D);const yt=(N,J,Me,Ae)=>{const ut=Math.hypot(Me-N,Ae-J),ct=new Ve(new yn(ut,.06,.02),i("#e8b13a",{emissive:"#3a2a00"}));ct.position.set((N+Me)/2,h+.75,(J+Ae)/2),ct.rotation.y=-Math.atan2(Ae-J,Me-N),g.add(ct)},At=[[o+.2,l+.2],[c-.2,l+.2],[c-.2,u-.2],[o+.2,u-.2]];At.forEach(([N,J],Me)=>{t(g,N,h,J,.07,.8,.07,"#d8cfbd");const[Ae,ut]=At[(Me+1)%4];yt(N,J,Ae,ut)});const H=new mt;g.add(H),t(H,-2.2,h,-4.6,1.6,.18,1.1,"#9a7a52"),t(H,-2.2,h+.18,-4.6,1.5,.5,1,"#c9a978"),t(H,1.8,h,-5.4,1.2,.9,1.2,"#8e9a86"),t(H,3.6,h,-4.5,.9,.14,1.4,"#9a7a52");const tn=new mt;tn.visible=!1,a.add(tn);const Ct="#e8b13a",ht=c-1.3,lt=l+1.1,an=6.2;t(tn,ht,h,lt,.9,.25,.9,"#8d918a"),t(tn,ht,h+.25,lt,.32,an,.32,Ct);for(let N=1;N<an;N+=1.1)t(tn,ht,h+.25+N,lt,.38,.07,.38,"#6b5320");const ce=new mt;ce.position.set(ht,h+.25+an,lt),tn.add(ce),t(ce,0,0,0,.55,.45,.5,"#efe4cf"),t(ce,-3.6,.45,0,7.2,.18,.22,Ct),t(ce,1.2,.45,0,2.4,.18,.22,Ct),t(ce,2.1,.1,0,.7,.5,.5,"#8d918a"),t(ce,0,.45,0,.14,1,.14,Ct);const R=-4.6,S=.45,B=3.4;t(ce,R,S-B,0,.03,B,.03,"#2e3330"),t(ce,R,S-B-.45,0,1,.12,.7,"#9a7a52"),t(ce,R,S-B-.33,0,.9,.3,.6,"#c9a978");const se=new Ve(new Ti(.13,10,8),new Cn({color:"#ffb52e"}));se.position.set(0,1.55,0),ce.add(se);const de=o+.5,re=d.z;[[-.7,-.9],[.7,-.9],[-.7,.9],[.7,.9]].forEach(([N,J])=>t(tn,de+N,h,re+J,.06,2.6,.06,"#9aa39b")),[.9,1.8].forEach(N=>{t(tn,de,h+N,re-.9,1.46,.05,.06,"#9aa39b"),t(tn,de,h+N,re+.9,1.46,.05,.06,"#9aa39b"),t(tn,de,h+N-.04,re,1.4,.05,1.7,"#c9a978")});const Fe=Array.from({length:10},(N,J)=>{const Me=l+.1+(u-l-.2)*J/10;return t(tn,(o+c)/2,h+.01,Me+(u-l-.2)/20,c-o-.2,.03,(u-l-.2)/10-.04,pr,{cast:!1})}),ve=document.createElement("canvas");ve.width=160,ve.height=1600;function Pe(){const N=ve.getContext("2d"),J=ve.width,Me=ve.height,Ae=N.createLinearGradient(0,0,0,Me);Ae.addColorStop(0,"#24543d"),Ae.addColorStop(1,"#173a2a"),N.fillStyle=Ae,N.fillRect(0,0,J,Me),N.strokeStyle=xn,N.lineWidth=3,N.lineCap="round",N.lineJoin="round",N.save(),N.translate(J/2,150),[[0,54],[-.62,40],[.62,40]].forEach(([ut,ct])=>{N.save(),N.rotate(ut),N.beginPath(),N.ellipse(0,-ct/2,9,ct/2,0,0,Math.PI*2),N.stroke(),N.restore()}),N.beginPath(),N.moveTo(0,0),N.lineTo(0,22),N.stroke(),N.restore(),N.fillStyle=xn,N.fillRect(J/2-18,210,36,2),N.save(),N.translate(J/2+4,520),N.rotate(-Math.PI/2),N.fillStyle=As,N.font='600 72px "Bricolage Grotesque", "Helvetica Neue", sans-serif',N.textAlign="center",N.textBaseline="middle","letterSpacing"in N&&(N.letterSpacing="14px"),N.fillText("CANOPY",0,0),N.restore(),Pt&&(Pt.needsUpdate=!0)}let Pt=null;Pe(),Pt=new pi(ve),Pt.colorSpace=rn,Pt.anisotropy=4,document.fonts&&document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",Pe);const Se=new mt;a.add(Se);{const N=new Fn({map:Pt}),J=2.9,Me=h+2.75,Ae=ct=>new Ve(new Qn(ct,Me-J),N),ut=Ae(d.w+.06);ut.position.set(d.x,(J+Me)/2,d.z+d.d/2+.03),Se.add(ut),[-1,1].forEach(ct=>{const bt=Ae(d.d+.06);bt.rotation.y=ct*Math.PI/2,bt.position.set(d.x+ct*(d.w/2+.03),(J+Me)/2,d.z),Se.add(bt)}),Se.traverse(ct=>{ct.isMesh&&(ct.castShadow=!0,ct.receiveShadow=!0)})}const ze=d.w/2,nt=d.d/2,dt=h+2.9,Ke=.09;function Gt(N,J,Me){const Ae=d.x,ut=[N-.6,N+.6],ct=new mt,bt=new mt,Ue=new mt;J.add(ct),Me.add(bt),Me.add(Ue),[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([F,U])=>t(ct,Ae+F*(ze-Ke/2),0,N+U*(nt-Ke/2),Ke,dt,Ke,_i));const Le=(F,U,$,z=.01)=>{const Y=Ae-ze-z,he=Ae+ze+z,be=N-nt-z,Ie=N+nt+z,qe=.04;n(ct,Y,he,F,F+U,be,be+qe,$,{cast:!1}),n(ct,Y,he,F,F+U,Ie-qe,Ie,$,{cast:!1}),n(ct,Y,Y+qe,F,F+U,be,Ie,$,{cast:!1}),n(ct,he-qe,he,F,F+U,be,Ie,$,{cast:!1})};[0,e.floors[1].y,e.floors[2].y,h].forEach(F=>Le(F+2.62,.06,_i)),n(ct,Ae-ze-.03,Ae+ze+.03,dt,dt+.16,N-nt-.03,N+nt+.03,_i),Le(dt+.16,.025,xn,.03),n(ct,Ae+ze,Ae+ze+.6,h+2.5,h+2.55,N-nt+.05,N+nt-.05,_i),[[!1,N+nt],[!1,N-nt],[!0,Ae-ze],[!0,Ae+ze]].forEach(([F,U])=>{k(F?n(bt,U-.01,U+.01,.05,dt,N-nt+.06,N+nt-.06,"#cfe6df"):n(bt,Ae-ze+.06,Ae+ze-.06,.05,dt,U-.01,U+.01,"#cfe6df"))});const et=new mt;Me.add(et);const Rt=new mt;et.add(Rt);const ft=d.w-.3,gt=d.d-.3,Zt=2.35;n(Rt,-ft/2,ft/2,0,.12,-gt/2,gt/2,"#2b302d"),n(Rt,-ft/2,ft/2,Zt-.14,Zt,-gt/2,gt/2,xn),[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([F,U])=>t(Rt,F*(ft/2-.04),.12,U*(gt/2-.04),.08,Zt-.26,.08,xn)),n(Rt,-ft/2+.05,-ft/2+.1,.12,Zt-.14,-gt/2+.1,gt/2-.1,Vr,{cast:!1});const In=new Ve(new yn(ft-.3,.04,gt-.3),le("#fff2c8","#ffd58a"));In.position.y=Zt-.16,Rt.add(In),K.push([In.material,.4,1.2]),et.position.set(Ae,0,N);const si=Ae+ze,A=o;return n(Ue,si,A+.05,h-.26,h,ut[0],ut[1],"#e4ddcc"),ut.forEach(F=>{n(Ue,si,A,h+_e-.03,h+_e+.03,F-.05,F+.05,xn,{cast:!1}),k(n(Ue,si,A,h+.05,h+_e-.05,F-.01,F+.01,"#cfe6df"))}),n(Ue,si+.05,o+1.2,h+.006,h+.016,N-.38,N+.38,rs,{cast:!1}),n(Ue,si+.05,o+1.2,h+.004,h+.012,N-.45,N+.45,xn,{cast:!1}),{cab:et,cabK:Rt,kf:ct,ki:bt,kb:Ue,frame:J,inside:Me,lz:N,cabLamp:In}}const Tt=[Gt(d.z,a,D)],jt=new mt;D.add(jt),r.lift2&&Tt.push(Gt(r.lift2.z,jt,jt));const V=Tt[0].cab,Re=Tt[1]?Tt[1].cab:null,ue=new mt;D.add(ue);const ge=new Ai(1,1),Oe=(N,J,Me,Ae,ut,ct)=>{const bt=new Ve(ge,i(ct));bt.position.set(J,Me,Ae),bt.scale.set(ut,ut*.8,ut),bt.castShadow=bt.receiveShadow=!0,N.add(bt)},Ge=new mt;D.add(Ge);const Xe=[[o+.2,o+.9,l+.2,(r.lift2?r.lift2.z:d.z)-.9],[o+.2,o+.9,d.z+.9,u-.2]];Xe.forEach(([N,J,Me,Ae])=>{n(Ge,N,J,h,h+.55,Me,Ae,"#1f5e40"),n(Ge,N-.03,J+.03,h+.55,h+.6,Me-.03,Ae+.03,"#e1dbc0",{cast:!1});for(let ut=Me+.35;ut<Ae-.2;ut+=.55)Oe(Ge,(N+J)/2,h+.8,ut,.32,Math.round(ut*3)%2?"#6b9250":"#5f8648")}),[[c-.5,u-.5],[c-.6,l+.6]].forEach(([N,J])=>{const Me=new Ve(new wn(.34,.26,.7,20).translate(0,.35,0),i("#d9cdb4"));Me.position.set(N,h,J),Me.castShadow=Me.receiveShadow=!0,ue.add(Me),t(ue,N,h+.7,J,.1,1.1,.1,"#7a6142"),[[0,2.05,0,.55,"#8aa66a"],[-.25,1.8,.2,.4,"#7a9a5c"],[.22,1.9,-.2,.42,"#9cb57a"]].forEach(([Ae,ut,ct,bt,Ue])=>Oe(ue,N+Ae,h+ut,J+ct,bt,Ue))});const nn=[],Tn=new Fn({color:"#2b302d"});function Wt(N,J,Me,Ae,ut,ct,bt,Ue){const Le=[];for(let Rt=0;Rt<=Ue*2;Rt++){const ft=Rt/(Ue*2),gt=Math.sin(Math.PI*ft)*.45,Zt=[J+(ut-J)*ft,Ae+(bt-Ae)*ft-gt,Me+(ct-Me)*ft];Le.push(new I(...Zt)),Rt%2===0&&nn.push([N,Zt[0],Zt[1]-.07,Zt[2]])}const et=new Ve(new Ar(new co(Le),Ue*4,.014,4),Tn);N.add(et)}const pe={x0:o+1.4,x1:o+6.2,z0:l+.25,z1:l+3.4,h:2.75};[[pe.x0,pe.z0],[pe.x1,pe.z0],[pe.x1,pe.z1],[pe.x0,pe.z1]].forEach(([N,J])=>t(E,N,h,J,.14,pe.h,.14,_i)),n(E,pe.x0-.1,pe.x1+.1,h+pe.h,h+pe.h+.16,pe.z0-.07,pe.z0+.07,_i),n(E,pe.x0-.1,pe.x1+.1,h+pe.h,h+pe.h+.16,pe.z1-.07,pe.z1+.07,_i);for(let N=pe.x0+.1;N<pe.x1;N+=.38)n(E,N-.04,N+.04,h+pe.h+.16,h+pe.h+.26,pe.z0-.3,pe.z1+.3,pr);const Nn=(N,J,Me,Ae,ut,ct)=>{n(N,J,Me,h,h+.22,Ae,ut,Vr),n(N,J+.03,Me-.03,h+.22,h+.48,Ae+.03,ut-.03,As),ct==="z0"&&n(N,J,Me,h+.22,h+.92,Ae,Ae+.22,As),ct==="x0"&&n(N,J,J+.22,h+.22,h+.92,Ae,ut,As),ct==="x1"&&n(N,Me-.22,Me,h+.22,h+.92,Ae,ut,As)};Nn(E,pe.x0+.25,pe.x1-.5,pe.z0+.15,pe.z0+.95,"z0"),Nn(E,pe.x0+.25,pe.x0+1.05,pe.z0+.95,pe.z1-.3,"x0"),[[pe.x0+1,pe.z0+.45],[pe.x0+2.6,pe.z0+.45],[pe.x0+3.6,pe.z0+.45],[pe.x0+.55,pe.z0+1.7]].forEach(([N,J])=>t(E,N,h+.48,J,.32,.3,.14,rs));const qn=pe.x0+2.5,$n=pe.z0+2.05;n(E,qn-.9,qn+.9,h,h+.38,$n-.45,$n+.45,"#3a3f3a"),n(E,qn-.92,qn+.92,h+.38,h+.44,$n-.47,$n+.47,"#d8d2c2"),n(E,qn-.6,qn+.6,h+.44,h+.47,$n-.15,$n+.15,xn,{cast:!1});let Ln=new Ve(new yn(1.1,.12,.1).translate(0,.06,0),new Cn({color:"#ffb35a",transparent:!0,opacity:.9}));Ln.position.set(qn,h+.47,$n),E.add(Ln),Wt(_,pe.x0,pe.z1,h+pe.h,o+.25,u-.2,h+_e+.9,9),Wt(_,pe.x1,pe.z1,h+pe.h,c-.3,u-.2,h+_e+.9,12),t(_,o+.25,h,u-.2,.06,_e+.95,.06,_i),t(_,c-.3,h,u-.2,.06,_e+.95,.06,_i);const gi=new mt;_.add(gi);const Yn=new Ai(.17,0),Hi=new Fn({color:"#ffffff"}),ci=[];let ei=7;const bn=()=>(ei=ei*16807%2147483647,ei/2147483647),li=h+pe.h+.26,Fi=13;for(let N=0;N<Fi;N++){const J=pe.x0+.1+N*(pe.x1-pe.x0-.2)/(Fi-1);for(let Me=pe.z0-.25;Me<=pe.z1+.25;Me+=.3){const Ae=Math.min(Math.abs(Me-pe.z0),Math.abs(Me-pe.z1));bn()<.35+Ae*.25||ci.push([J+(bn()-.5)*.22,li+bn()*.08,Me+(bn()-.5)*.16,.7+bn()*.7])}}[pe.z0,pe.z1].forEach(N=>{for(let J=pe.x0-.05;J<=pe.x1+.05;J+=.22)ci.push([J,li-.04+bn()*.06,N+(bn()-.5)*.2,.8+bn()*.5])}),[[pe.x0,pe.z1,2.3],[pe.x1,pe.z1,2.1],[pe.x0,pe.z0,1.2],[pe.x1,pe.z0,1.4]].forEach(([N,J,Me])=>{for(let Ae=0;Ae<Me;Ae+=.16){const ut=Ae*4.2+N;ci.push([N+Math.cos(ut)*.12,h+pe.h+.1-Ae,J+Math.sin(ut)*.12,.55+bn()*.35-Ae*.1])}});const Un=new fi(Yn,Hi,ci.length),yi=new tt,Mi=new An,T=new Ci,W=new I,ae=new I,ee=new st,j=["#4f8a3a","#3f7a33","#6a9e45","#2f6a30"];ci.forEach(([N,J,Me,Ae],ut)=>{T.set(bn()*3,bn()*3,bn()*3),Mi.setFromEuler(T),W.set(Ae*1.2,Ae*.7/Bn,Ae),ae.set(N,J,Me),Un.setMatrixAt(ut,yi.compose(ae,Mi,W)),Un.setColorAt(ut,ee.set(j[ut%j.length]))}),Un.castShadow=!0,Un.receiveShadow=!0,gi.add(Un);const we=document.createElement("canvas");we.width=we.height=64;const me=we.getContext("2d"),He=me.createRadialGradient(32,32,0,32,32,32);He.addColorStop(0,"rgba(255,255,255,1)"),He.addColorStop(.5,"rgba(255,255,255,.6)"),He.addColorStop(1,"rgba(255,255,255,0)"),me.fillStyle=He,me.fillRect(0,0,64,64);const it=new pi(we),Mt=4,It=4400,je=4200,Ht=[],qt=new mt;D.add(qt);function Ut(N){for(;Ht.length<=N;){const J=new qh({map:it,color:"#e9e4dc",transparent:!0,depthWrite:!1,opacity:0}),Me=new o0(J);Me.renderOrder=5,qt.add(Me),Ht.push(Me)}return Ht[N]}const Je={x0:c-4.4,x1:c-1.2,z:l+1.5};n(v,Je.x0,Je.x1,h,h+1.05,Je.z-.45,Je.z,"#25523b"),n(v,Je.x0-.06,Je.x1+.06,h+1.05,h+1.12,Je.z-.55,Je.z+.1,"#ece4d2"),n(v,Je.x0,Je.x1,h+.18,h+.22,Je.z+.16,Je.z+.2,xn,{cast:!1}),n(v,Je.x0,Je.x1,h,h+1.9,l+.2,l+.55,Vr),[.8,1.35].forEach(N=>n(v,Je.x0+.1,Je.x1-.1,h+N,h+N+.05,l+.2,l+.7,pr,{cast:!1}));for(let N=Je.x0+.5;N<Je.x1-.2;N+=.6)[.85,1.4].forEach((J,Me)=>t(v,N+Me*.15,h+J+.05,l+.48,.14,.24,.14,["#527e60","#b28b64","#75999a","#d5bd8c"][Math.round(N*3+Me)&3]));[Je.x0+.6,(Je.x0+Je.x1)/2,Je.x1-.6].forEach(N=>{t(v,N,h,Je.z+.55,.06,.72,.06,xn);const J=new Ve(new wn(.2,.2,.08,16).translate(0,.04,0),i(rs));J.position.set(N,h+.72,Je.z+.55),J.castShadow=!0,v.add(J)});const $t=[Je.x0+.7,(Je.x0+Je.x1)/2,Je.x1-.7].map(N=>{t(v,N,h+1.95,Je.z-.25,.02,.6,.02,"#343f33",{cast:!1});const J=new Ve(new Ti(.13,12,8),le("#f3d9a6","#ffb36a"));return J.position.set(N,h+1.9,Je.z-.25),v.add(J),K.push([J.material,.3,1.4]),J});t(v,(Je.x0+Je.x1)/2,h+1.9,l+.2,.02,.7,Je.z-l,"#343f33",{cast:!1}),n(v,Je.x0-.1,Je.x1+.1,h+2.55,h+2.6,l+.2,Je.z-.2,_i,{cast:!1});const Be={x:c-.9,z:u-2.2};n(M,Be.x-.35,Be.x+.35,h,h+1,Be.z-.8,Be.z+.8,"#1d2422"),n(M,Be.x-.4,Be.x+.4,h+1,h+1.06,Be.z-.85,Be.z+.85,xn,{cast:!1}),[-.4,.4].forEach(N=>{const J=new Ve(new wn(.22,.22,.03,20),i("#2e3330"));J.position.set(Be.x,h+1.08,Be.z+N),M.add(J)}),[Be.z-1.05,Be.z+1.05].forEach(N=>{t(M,Be.x+.1,h,N,.45,1.35,.45,"#262b29");const J=new Ve(new lo(.15,16).rotateY(-Math.PI/2),i("#4a514d"));J.position.set(Be.x-.13,h+.9,N),M.add(J)});const kt=new Ve(new Qn(2.6,2.2).rotateX(-Math.PI/2),le("#4a3a33","#d06aa0"));kt.position.set(Be.x-2.4,h+.012,Be.z),kt.receiveShadow=!0,M.add(kt),K.push([kt.material,.05,.45]),Wt(p,c-.3,u-.2,h+_e+.9,c-.3,l+1,h+_e+1.6,10),t(p,c-.3,h,l+1,.06,_e+1.65,.06,_i),[[o+2.8,u-1.05],[o+5.6,u-1.05]].forEach(([N,J])=>{const Me=new Ve(new wn(.42,.42,.05,20).translate(0,.025,0),i("#ece4d2"));Me.position.set(N,h+.74,J),Me.castShadow=!0,P.add(Me),t(P,N,h,J,.07,.74,.07,"#2b302d"),[[-.62,0],[.62,0]].forEach(([ct,bt])=>{t(P,N+ct,h,J+bt,.38,.45,.38,pr),t(P,N+ct,h+.45,J+bt,.4,.05,.4,As)}),t(P,N,h+.79,J,.05,1.8,.05,"#e1dbc0");const Ae=new Ve(new $a(1.25,.45,8,1,!0).translate(0,-.22,0),new Fn({color:"#f1e7cc",side:2}));Ae.position.set(N,h+2.85,J),Ae.castShadow=!0,P.add(Ae);const ut=new Ve(new $a(1.27,.1,8,1,!0).translate(0,-.42,0),i("#1f6b47"));ut.position.copy(Ae.position),P.add(ut)});const Ot=(N,J,Me,Ae)=>{const ct=pe.h-.12,bt=.1*Ae,Ue=(Le,et,Rt,ft)=>Me?n(G,N+bt+Le*Ae,N+bt+et*Ae,h+Rt,h+ft,J-.06,J+.06,rs):n(G,N-.06,N+.06,h+Rt,h+ft,J+bt+Le*Ae,J+bt+et*Ae,rs);Ue(0,.42,ct-1.1,ct),Ue(0,.42*.45,.95,ct-1.1),Ue(0,.42*.8,0,.95),Me?n(G,N+bt,N+bt+.2*Ae,h+1.05,h+1.12,J-.08,J+.08,xn,{cast:!1}):n(G,N-.08,N+.08,h+1.05,h+1.12,J+bt,J+bt+.2*Ae,xn,{cast:!1})};Ot(pe.x0,pe.z1,!0,1),Ot(pe.x1,pe.z1,!0,-1),Ot(pe.x1,pe.z1,!1,-1),Ot(pe.x1,pe.z0,!1,1),n(y,pe.x0,pe.x1,h+pe.h-.1,h+pe.h-.05,pe.z1+.06,pe.z1+.1,xn,{cast:!1}),n(y,pe.x1+.06,pe.x1+.1,h+pe.h-.1,h+pe.h-.05,pe.z0,pe.z1,xn,{cast:!1});for(let N=0;N<4;N++){const J=Je.x0+.5+N*(Je.x1-Je.x0-1)/3,Me=Je.z-.22;n(O,J-.26,J+.26,h+1.12,h+1.15,Me-.13,Me+.13,pr),[-.13,.13].forEach((Ae,ut)=>{const ct=new Ve(new wn(.075,.075,.2,10).translate(0,.1,0),new Fn({color:"#d7ece4",transparent:!0,opacity:.5}));ct.position.set(J+Ae,h+1.15,Me),O.add(ct),t(O,J+Ae,h+1.16,Me,.09,.1,.09,["#5f8a3c","#7a9a42","#4f7a3a","#8c9a4a"][N+ut&3]),t(O,J+Ae,h+1.35,Me,.16,.03,.16,xn,{cast:!1})})}const Yt=(Je.x0+Je.x1)/2;n(O,Yt-.75,Yt+.75,h+1.97,h+2.47,l+.3,l+.36,"#22302a"),n(O,Yt-.8,Yt+.8,h+1.94,h+2.5,l+.26,l+.3,Vr);for(let N=0;N<4;N++)n(O,Yt-.6,Yt+(N&1?.25:.5),h+2.36-N*.1,h+2.38-N*.1,l+.36,l+.37,As,{cast:!1});const Kt={x0:o+6.9,x1:o+9.1,z:u-.85};n(q,Kt.x0,Kt.x1,h+.72,h+.78,Kt.z-.3,Kt.z+.3,pr),[[Kt.x0+.1,-.22],[Kt.x0+.1,.22],[Kt.x1-.1,-.22],[Kt.x1-.1,.22]].forEach(([N,J])=>t(q,N,h,Kt.z+J,.07,.72,.07,Vr)),n(q,Kt.x0+.1,Kt.x1-.1,h+.78,h+.79,Kt.z-.1,Kt.z+.1,As,{cast:!1});for(let N=0;N<4;N++){const J=Kt.x0+.3+N*(Kt.x1-Kt.x0-.6)/3,Me=new Ve(new wn(.12,.1,.02,14).translate(0,.01,0),i("#fbf8ee"));Me.position.set(J,h+.79,Kt.z-.17+(N&1)*.34),q.add(Me),t(q,J,h+.8,Kt.z-.17+(N&1)*.34,.08,.04,.08,"#6f9a45"),t(q,J,h,Kt.z+.46,.07,.5,.07,xn),t(q,J,h+.5,Kt.z+.46,.28,.06,.28,rs)}[Kt.x0+.55,Kt.x1-.55].forEach(N=>{t(q,N,h+.79,Kt.z,.05,.22,.05,xn,{cast:!1});const J=new Ve(new Ti(.07,10,6),le("#fff0c8","#ffc56a"));J.position.set(N,h+1.05,Kt.z),q.add(J),K.push([J.material,.3,1.6])}),[d.z-.55,d.z+.55].forEach(N=>{[o+.45,o+1.35].forEach(J=>{t(w,J,h,N,.07,.82,.07,xn),t(w,J,h+.82,N,.13,.08,.13,xn)}),n(w,o+.45,o+1.35,h+.66,h+.71,N-.025,N+.025,rs,{cast:!1})}),n(w,o+1.6,o+6.4,h+.006,h+.014,u-1.95,u-.25,xn,{cast:!1}),n(w,o+1.7,o+6.3,h+.008,h+.018,u-1.85,u-.35,rs,{cast:!1}),[[c-.35,u-1.1],[o+6.6,l+.35]].forEach(([N,J])=>{t(ie,N,h,J,.26,.1,.26,xn),t(ie,N,h+.1,J,.06,1.25,.06,xn);const Me=new Ve(new yn(.24,.34,.24).translate(0,.17,0),le("#fff1cf","#ffcf7a"));Me.position.set(N,h+1.35,J),Me.castShadow=!1,ie.add(Me),K.push([Me.material,.35,1.5]),t(ie,N,h+1.69,J,.3,.05,.3,xn,{cast:!1})});const Rn=new Ti(.06,8,6),ti=le("#fff1cf","#ffcf7a");K.push([ti,.2,1.6]);const on=new Map;nn.forEach(([N,...J])=>{on.has(N)||on.set(N,[]),on.get(N).push(J)});const pn=new tt,hi=[];on.forEach((N,J)=>{const Me=new fi(Rn,ti,N.length);N.forEach(([Ae,ut,ct],bt)=>Me.setMatrixAt(bt,pn.makeTranslation(Ae,ut,ct))),J.add(Me),hi.push(Me)});const Dn=new fo("#ffc98a",0,14,1.2);Dn.position.set((o+c)/2,h+2.6,(l+u)/2),s.add(Dn);const un=e.shell,mn=un.loungeFront,Mn=un.loungeDoor.x,Xn=un.loungeHeader,hn=.7,Fs=.81,Vi=new mt;a.add(Vi);const Kn=new mt;Vi.add(Kn),n(Kn,Mn-hn-.12,Mn-hn,0,Xn+.12,mn-.02,mn+.1,"#1f4a35"),n(Kn,Mn+hn,Mn+hn+.12,0,Xn+.12,mn-.02,mn+.1,"#1f4a35"),n(Kn,Mn-hn-.12,Mn+hn+.12,Xn,Xn+.14,mn-.02,mn+.1,"#1f4a35");const bi=mn-Fs-1.5;n(Kn,Mn-hn-.1,Mn-hn,0,Xn,bi,mn-.02,"#26302a",{cast:!1}),n(Kn,Mn+hn,Mn+hn+.1,0,Xn,bi,mn-.02,"#26302a",{cast:!1}),n(Kn,Mn-hn,Mn+hn,0,Xn,bi-.1,bi,"#2f3a32",{cast:!1}),n(Kn,Mn-hn,Mn+hn,Xn,Xn+.05,bi,mn-.02,"#1d241f",{cast:!1}),n(Kn,Mn-.38,Mn+.38,.004,.014,bi,mn-.02,rs,{cast:!1});const ne=new Ve(new Ti(.1,12,8),le("#fff2c8","#ffd58a"));ne.position.set(Mn,Xn-.45,bi+.06),Kn.add(ne),K.push([ne.material,.6,1.2]);const Q=new mt;Q.position.set(Mn-hn+.02,0,mn+.02),Kn.add(Q);const Ee=hn*2-.04,ye=Xn-.03;n(Q,0,Ee,.01,ye,-.03,.03,"#2d6146"),[[.32,.95],[1.15,1.85]].forEach(([N,J])=>n(Q,.14,Ee-.14,N,J,.03,.05,"#357052",{cast:!1})),n(Q,.08,Ee-.08,.02,.2,.03,.045,xn,{cast:!1}),n(Q,Ee-.2,Ee-.12,.95,1.1,.03,.1,xn,{cast:!1});const Te=document.createElement("canvas");Te.width=256,Te.height=96;const Ne=new pi(Te);Ne.colorSpace=rn;const $e=new Ve(new Qn(.66,.25),new Cn({map:Ne}));$e.position.set(Ee*.62,1.5,.056),Q.add($e);const Ze=document.createElement("canvas");Ze.width=512,Ze.height=64;const at=new pi(Ze);at.colorSpace=rn,at.anisotropy=4;const Lt=new Cn({map:at,transparent:!0}),Et=new mt;Et.position.set(un.loungeSign.x,un.loungeSign.y,mn+.05),Et.scale.setScalar(un.loungeSign.scale),Vi.add(Et),[.12,-.1].forEach((N,J)=>{const Me=new Ve(new Qn(2.3,.26),Lt);Me.rotation.z=N,Me.position.z=J*.006,Et.add(Me)});function wt(){const N='"Fredoka", "Bricolage Grotesque", sans-serif';let J=Te.getContext("2d");J.fillStyle="#ece4d2",J.fillRect(0,0,256,96),J.strokeStyle=xn,J.lineWidth=6,J.strokeRect(3,3,250,90),J.fillStyle="#1f3a2c",J.font=`600 40px ${N}`,J.textAlign="center",J.textBaseline="middle",J.fillText("STAFF ONLY",128,51),Ne.needsUpdate=!0,J=Ze.getContext("2d"),J.clearRect(0,0,512,64),J.fillStyle="#e8b13a",J.fillRect(0,6,512,52),J.fillStyle="#2b2414",J.font=`600 34px ${N}`,J.textAlign="center",J.textBaseline="middle",J.fillText("COMING SOON  ·  COMING SOON",256,33),at.needsUpdate=!0}wt(),document.fonts&&document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",wt);let St=0,sn=null,Jt=null;const dn=[],ni=[],kn=new Set,ii=new Set,gs=le("#fff0c8","#ffc56a");K.push([gs,.3,1.6]);function oa(N,J){const Me=[{file:"rooftop_site.glb",parent:g,hide:H,at:[[0,0]]},{file:"rooftop_speakeasy.glb",parent:_,hide:E,at:[[o+3.8,l+1.825]]},{file:"rooftop_pergola_vines.glb",parent:_,hide:gi,at:[[o+3.8,l+1.825]]},{file:"rooftop_bar.glb",parent:m,hide:v,at:[[(Je.x0+Je.x1)/2,Je.z-.225]]},{file:"rooftop_dj_booth.glb",parent:p,hide:M,at:[[Be.x,Be.z]]},{file:"rooftop_parasol_table.glb",parent:x,hide:P,at:[[o+2.8,u-1.05],[o+5.6,u-1.05]]},{file:"rooftop_olive.glb",parent:D,hide:ue,at:[[c-.5,u-.5],[c-.6,l+.6]]},{file:"rooftop_drapes.glb",parent:y,hide:G,at:[[pe.x0,pe.z1,0],[pe.x1,pe.z1,Math.PI],[pe.x1,pe.z1,Math.PI/2],[pe.x1,pe.z0,-Math.PI/2]]},{file:"rooftop_jar_flight.glb",parent:b,hide:O,at:[[(Je.x0+Je.x1)/2,Je.z-.225]]},{file:"rooftop_chefs_table.glb",parent:L,hide:q,at:[[o+8,u-.85]]},{file:"rooftop_lantern.glb",parent:w,hide:ie,at:[[c-.35,u-1.1],[o+6.6,l+.35]]}];Me.forEach(Ue=>ii.add(Ue.parent)),Me.forEach(Ue=>N.load(J+Ue.file,Le=>{const et=Le.scene;et.traverse(gt=>{gt.isMesh&&(gt.castShadow=gt.receiveShadow=!0)});const Rt=et.getObjectByName("Flame"),ft=et.getObjectByName("DanceFloor");et.traverse(gt=>{/^Sign/.test(gt.name)&&(gt.visible=!1)}),Rt&&Rt.traverse(gt=>{gt.isMesh&&(gt.material=Ln.material,gt.castShadow=!1)}),ft&&ft.traverse(gt=>{gt.isMesh&&(gt.material=kt.material)}),$t.forEach((gt,Zt)=>{const In=et.getObjectByName("BarLamp"+Zt);In&&In.traverse(si=>{si.isMesh&&(si.material=gt.material,si.castShadow=!1)})}),et.traverse(gt=>{gt.isMesh&&/^(CandleGlow|LanternGlow)/.test(gt.name)&&(gt.material=gs,gt.castShadow=!1)}),et.traverse(gt=>{const Zt=gt.isMesh&&gt.material;Zt&&/^Vine/.test(Zt.name)&&!ni.some(In=>In[0]===Zt)&&ni.push([Zt,Zt.color.clone()])}),js(et),Ue.at.forEach(([gt,Zt,In],si)=>{const A=new mt;In&&(A.rotation.y=In),A.add(si?et.clone():et),A.scale.set(1.69,1.69/Bn,1.69),A.position.set(gt,h,Zt),Ue.parent.add(A)}),Rt&&(Ln=Rt),Ue.hide.visible=!1,kn.add(Ue.parent)},void 0,Le=>console.warn("3D map: could not load "+Ue.file,Le))),N.load(J+"string_bulb.glb",Ue=>{const Le=Ue.scene;Le.updateMatrixWorld(!0);const et=Zt=>{const In=Le.getObjectByName(Zt),si=[];return In?(In.traverse(A=>{if(A.isMesh){const F=A.geometry.clone().applyMatrix4(A.matrixWorld);Object.keys(F.attributes).forEach(U=>{U!=="position"&&U!=="normal"&&F.deleteAttribute(U)}),si.push(F.index?F.toNonIndexed():F)}}),qi(si).scale(1.69,1.69/Bn,1.69)):null},Rt=et("Bulb"),ft=et("Socket");if(!Rt||!ft)return;const gt=new Fn({color:"#22262a"});hi.forEach(Zt=>{Zt.geometry=Rt;const In=new fi(ft,gt,Zt.count);In.instanceMatrix.copy(Zt.instanceMatrix),Zt.parent.add(In)})},void 0,Ue=>console.warn("3D map: could not load string_bulb.glb",Ue));const Ae=(Ue,Le,et,Rt,ft)=>{const gt=new mt;return gt.add(Le),gt.scale.set(1.69,1.69/Bn,1.69),gt.position.set(et,Rt,ft),Ue.add(gt),Le.traverse(Zt=>{Zt.isMesh&&(Zt.castShadow=Zt.receiveShadow=!0)}),js(Le),gt},ut=(Ue,Le)=>N.load(J+Ue,et=>Le(et.scene),void 0,et=>console.warn("3D map: could not load "+Ue,et));ut("lounge_elevator_shaft.glb",Ue=>Tt.forEach((Le,et)=>{const Rt=et?Ue.clone():Ue;Rt.traverse(ft=>{ft.isMesh&&ft.material&&/Glass/.test(ft.material.name)&&(ft.material=X,ft.castShadow=ft.receiveShadow=!1,et||dn.push(ft))}),Ae(Le.frame,Rt,d.x,0,Le.lz),Le.kf.visible=Le.ki.visible=!1})),ut("lounge_elevator_cab.glb",Ue=>Tt.forEach((Le,et)=>{const Rt=et?Ue.clone():Ue;Rt.traverse(ft=>{/^Rail/.test(ft.name)&&(ft.visible=!1),ft.name==="CabLamp"&&ft.traverse(gt=>{gt.isMesh&&(gt.material=Le.cabLamp.material,gt.castShadow=!1)})}),Ae(Le.cab,Rt,0,0,0),Le.cabK.visible=!1})),ut("lounge_bridge.glb",Ue=>Tt.forEach((Le,et)=>{const Rt=et?Ue.clone():Ue;Rt.traverse(ft=>{ft.isMesh&&ft.material&&/Glass/.test(ft.material.name)&&(ft.material=X,ft.castShadow=ft.receiveShadow=!1)}),Ae(Le.inside,Rt,(d.x+d.w/2+o)/2,h,Le.lz),Le.kb.visible=!1})),ut("lounge_door.glb",Ue=>{const Le=Ue.getObjectByName("DoorLeaf"),et=Ue.getObjectByName("StaffPlaque"),Rt=Ue.getObjectByName("Sconce");Le&&(Rt&&Rt.traverse(ft=>{ft.isMesh&&(ft.material=ne.material,ft.castShadow=!1)}),Ae(Vi,Ue,Mn,0,mn),sn=Le,Jt=et,Kn.visible=!1)});const ct=["deck_planter.glb","deck_planter_short.glb"];let bt=0;ct.forEach((Ue,Le)=>ut(Ue,et=>{const[Rt,ft,gt,Zt]=Xe[Le];Ae(D,et,(Rt+ft)/2,h,(gt+Zt)/2),++bt===ct.length&&(Ge.visible=!1)}))}function ca(N,J){const Me=Math.min(C.length,Math.max(1,N)),Ae=[...f,D,jt,vt,qt];if(!C.slice(0,Me).every(Le=>!ii.has(Le)||kn.has(Le))||!kn.has(D))return null;const ut=Ae.map(Le=>Le.visible);g.visible=!1,D.visible=!0,qt.visible=!1,C.forEach((Le,et)=>{Le.visible=et<Me}),jt.visible=!!J,vt.visible=!J;const ct=a.clone();Ae.forEach((Le,et)=>{Le.visible=ut[et]}),ct.updateMatrixWorld(!0);const bt=[],Ue=new Zn;return ct.traverse(Le=>{if(Le!==ct){if(!Le.visible||Le.isSprite){bt.push(Le);return}!Le.isMesh||Le.isInstancedMesh||(Le.geometry.boundingBox||Le.geometry.computeBoundingBox(),Ue.copy(Le.geometry.boundingBox).applyMatrix4(Le.matrixWorld),(Ue.max.y<h-.05||Ue.min.x<o-.2)&&bt.push(Le))}}),bt.forEach(Le=>Le.parent&&Le.parent.remove(Le)),ct}return{loadModels:oa,pictureCopy:ca,update(N){const J=N.loungeOpen?Math.max(1,N.loungeTier||1):0,Me=N.night||0;g.visible=!J,D.visible=!!J;const Ae=!J&&N.loungeBuild!=null;tn.visible=Ae,Se.visible=!J,Ae&&(Fe.forEach((Ue,Le)=>{Ue.visible=Le<Math.floor(N.loungeBuild*Fe.length)}),ce.rotation.y=Math.sin((N.time||0)/5e3)*.7,se.visible=Math.floor((N.time||0)/500)%2===0),C.forEach((Ue,Le)=>{Ue.visible=J>Le}),V.position.y=N.liftY||0,Re&&(Re.position.y=N.liftY2||0,jt.visible=!!N.loungeLift,vt.visible=!N.loungeLift),St+=((J?1.75:0)-St)*.15,Q.rotation.y=St,$e.visible=!J,Et.visible=!J,sn&&(sn.rotation.y=St,Jt&&(Jt.visible=!J)),dn.forEach(Ue=>{Ue.visible=!!J}),K.forEach(([Ue,Le,et])=>{Ue.emissiveIntensity=Le+Me*et}),Ln.scale.y=.8+Math.sin((N.time||0)/130)*.2+Math.sin((N.time||0)/53)*.1,Ln.visible=J>=1,Hi.color.setScalar(1-Me*.45),ni.forEach(([Ue,Le])=>Ue.color.copy(Le).multiplyScalar(1-Me*.45));const ut=J?N.loungeSmokers||[]:[],ct=N.time||0;let bt=0;ut.forEach(Ue=>{for(let Le=0;Le<Mt;Le++){const et=(ct+Ue.id*1777%It+Le*It/Mt)%It/je;if(et>=1)continue;const Rt=Ut(bt++),ft=.75+et*2.3,gt=Math.sin(et*3+Ue.id+Le)*.2;Rt.visible=!0,Rt.position.set(Ue.x+(Ue.facing||0)*.4+gt+et*.25,h+1.65+et*2,Ue.z+.1-et*.15),Rt.scale.set(ft,ft/Bn,1),Rt.material.opacity=Math.min(1,et*6)*Math.pow(1-et,.8)*.95,Rt.material.color.setScalar(.72-Me*.25)}});for(let Ue=bt;Ue<Ht.length;Ue++)Ht[Ue].visible=!1;Dn.intensity=J?Me*6:0}}}const Wr="#1f4a35",fh="#173a2a",xi="#d0a54e",za="#efe4cf",lb="#d8d0bf",hb="#a9a08f",Ga="#3c4a44",ph="#bfb8aa",Ha="#e8b13a",ub="#8f7a5e",Bi=3.4,as=2.9,os=5;function db(s,e,{material:t}){const n=e.flagshipLot;if(!n)return null;const i=e.plazaY,r=new mt;r.name="flagship",s.add(r);const a=n.x0+.45,o=n.x1-.45,c=n.z0+.45,l=n.z1-.45,u=(a+o)/2,h=(c+l)/2,d=i+Bi+os*as,f=new yn(1,1,1).translate(0,.5,0);function g(){const ce=new Map,R=new mt;return r.add(R),{group:R,add(S,B,se,de,re,Fe,ve){const Pe=f.clone();Pe.scale(de,re,Fe),Pe.translate(S,B,se),ce.has(ve)||ce.set(ve,[]),ce.get(ve).push(Pe)},span(S,B,se,de,re,Fe,ve){this.add((S+B)/2,se,(re+Fe)/2,B-S,de-se,Fe-re,ve)},seal(S={}){return ce.forEach((B,se)=>{const de=new Ve(qi(B),S[se]||t(se));de.castShadow=de.receiveShadow=!(S[se]&&S[se].transparent),R.add(de)}),R}}}const _=t("#9fc7b6",{emissive:"#ffd896",emissiveIntensity:.05,name:"flagshipShop"}),m=t("#7fae9c",{emissive:"#f2c675",emissiveIntensity:0,name:"flagshipCurtain"}),p=new Cn({color:xi}),x=g();x.span(n.x0+.2,n.x1-.2,i,i+.04,n.z0+.2,n.z1-.2,ub);const y=n.x0+.25,b=n.x1-.25,L=n.z0+.25,w=n.z1-.25,C=1.6,E=.1;[[y,b,w-E,w],[y,b,L,L+E],[y,y+E,L,w],[b-E,b,L,w]].forEach(([ce,R,S,B])=>{x.span(ce,R,i,i+C,S,B,Wr),x.span(ce-.02,R+.02,i+C,i+C+.08,S-.02,B+.02,xi)}),x.span(a+.4,a+2.4,i,i+1.9,c+.4,c+1.6,za),x.span(a+.3,a+2.5,i+1.9,i+2.02,c+.3,c+1.7,Ga);const v=x.seal(),M=document.createElement("canvas");M.width=512,M.height=192;const P=new pi(M);P.colorSpace=rn;function G(){const ce=M.getContext("2d"),R=512,S=192;ce.fillStyle=fh,ce.fillRect(0,0,R,S),ce.strokeStyle=xi,ce.lineWidth=4,ce.strokeRect(10,10,R-20,S-20),ce.fillStyle=za,ce.textAlign="center",ce.textBaseline="middle",ce.font='700 64px "Bricolage Grotesque", "Helvetica Neue", sans-serif',"letterSpacing"in ce&&(ce.letterSpacing="8px"),ce.fillText("CANOPY HQ",R/2,82),ce.fillStyle=xi,ce.font='600 28px "Bricolage Grotesque", "Helvetica Neue", sans-serif',"letterSpacing"in ce&&(ce.letterSpacing="6px"),ce.fillText("COMING SOON",R/2,140),P.needsUpdate=!0}G(),document.fonts&&document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",G);const O=new Ve(new Qn(4.4,1.65),new Fn({map:P}));O.rotation.y=Math.PI/2,O.position.set(b+.02,i+C+1.1,h),v.add(O);const q=g();[-1.6,1.6].forEach(ce=>q.add(b-.1,i+C,h+ce,.12,.4,.12,Ga)),v.add(q.seal());const ie=g();ie.span(a,o,i,i+Bi,c,l,lb),ie.span(a-.08,o+.08,i,i+.35,c-.08,l+.08,hb);const D=4;for(let ce=0;ce<D;ce++){const R=a+.35+ce*(o-a-.7)/D,S=R+(o-a-.7)/D;ie.span(R+.08,S-.08,i+.35,i+2.5,l,l+.06,Wr);const B=c+.35+ce*(l-c-.7)/D,se=B+(l-c-.7)/D;ie.span(o,o+.06,i+.35,i+2.5,B+.08,se-.08,Wr)}ie.span(a-.05,o+.12,i+2.75,i+3.05,l,l+.12,xi),ie.span(o,o+.12,i+2.75,i+3.05,c-.05,l+.12,xi),ie.span(a-.12,o+.12,i+Bi-.05,i+Bi+.2,c-.12,l+.12,ph);const X=ie.seal(),k=g();for(let ce=0;ce<D;ce++){const R=a+.35+ce*(o-a-.7)/D,S=R+(o-a-.7)/D,B=c+.35+ce*(l-c-.7)/D,se=B+(l-c-.7)/D;k.span(R+.2,S-.2,i+.5,i+2.35,l+.06,l+.08,"shop"),k.span(o+.06,o+.08,i+.5,i+2.35,B+.2,se-.2,"shop")}X.add(k.seal({shop:_}));const le=Array.from({length:os},(ce,R)=>{const S=g(),B=i+Bi+R*as,se=[a+.1,u,o-.1],de=[c+.1,h,l-.1];return se.forEach(re=>de.forEach(Fe=>{re===u&&Fe===h||S.add(re,B,Fe,.28,as,.28,Ga)})),S.span(a-.05,o+.05,B+as-.18,B+as,c-.05,l+.05,ph),S.seal()}),K=Array.from({length:os},(ce,R)=>{const S=g(),B=i+Bi+R*as,se=B+.02,de=B+as-.2;S.span(a+.12,o-.12,se,de,c+.12,l-.12,"glass");const re=5;for(let Fe=1;Fe<re;Fe++){const ve=a+(o-a)*Fe/re,Pe=c+(l-c)*Fe/re;S.add(ve,se,l-.08,.07,de-se,.06,xi),S.add(o-.08,se,Pe,.06,de-se,.07,xi)}return S.seal({glass:m})}),Z=g();Z.span(a+.6,o-.6,d,d+1.6,c+.6,l-.6,Wr),Z.span(a+.45,o-.45,d+1.6,d+1.8,c+.45,l-.45,xi);for(let ce=0;ce<=6;ce++){const R=a+.7+(o-a-1.4)*ce/6,S=c+.7+(l-c-1.4)*ce/6;Z.add(R,d,l-.55,.1,1.6,.14,xi),Z.add(o-.55,d,S,.14,1.6,.1,xi)}Z.span(u-.8,u+.8,d+1.8,d+2.6,h-.8,h+.8,fh),Z.add(a+1,d+1.8,c+1,.06,3,.06,Ga),Z.add(a+1.5,d+4.1,c+1,.9,.55,.03,"#b23b3b");const xe=Z.seal(),Ce=qi([[0,1.25],[-.6,.95],[.6,.95]].map(([ce,R])=>{const S=new Ti(.5,10,6);return S.scale(.32,R,.08),S.translate(0,R*.5,0),S.rotateZ(ce),S})),te=new Ve(Ce,p);te.position.set(u,d+2.6,h+.2),xe.add(te);const fe=document.createElement("canvas");fe.width=128,fe.height=768;const De=new pi(fe);De.colorSpace=rn;function _e(){const ce=fe.getContext("2d"),R=128,S=768;ce.fillStyle=Wr,ce.fillRect(0,0,R,S),ce.strokeStyle=xi,ce.lineWidth=6,ce.strokeRect(6,6,R-12,S-12),ce.save(),ce.translate(R/2+4,S/2),ce.rotate(-Math.PI/2),ce.fillStyle=za,ce.font='700 74px "Bricolage Grotesque", "Helvetica Neue", sans-serif',ce.textAlign="center",ce.textBaseline="middle","letterSpacing"in ce&&(ce.letterSpacing="16px"),ce.fillText("CANOPY",0,0),ce.restore(),De.needsUpdate=!0}_e(),document.fonts&&document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",_e);const ot=new Fn({map:De,emissive:"#ffffff",emissiveMap:De,emissiveIntensity:.15,side:2}),rt=new Ve(new Qn(1.3,7.8),ot);rt.rotation.y=Math.PI/4,rt.position.set(o+.55,i+Bi+4.6,l+.55),xe.add(rt);const _t=g();[1.2,7.6].forEach(ce=>_t.add(o+.25,i+Bi+ce,l+.25,.7,.1,.1,xi)),xe.add(_t.seal());const vt=new mt;r.add(vt);const yt=a-.1,At=c-.1,H=d+3.5-i,tn=g();tn.add(yt,i,At,1.1,.3,1.1,"#8d918a"),tn.add(yt,i+.3,At,.4,H,.4,Ha);for(let ce=1.4;ce<H;ce+=1.4)tn.add(yt,i+.3+ce,At,.46,.08,.46,"#6b5320");vt.add(tn.seal());const Ct=new mt;Ct.position.set(yt,i+.3+H,At),vt.add(Ct);const ht=g();ht.add(0,0,0,.7,.55,.6,za),ht.add(4.2,.55,0,8.4,.2,.26,Ha),ht.add(-1.5,.55,0,3,.2,.26,Ha),ht.add(-2.6,.1,0,.9,.6,.6,"#8d918a"),ht.add(0,.55,0,.16,1.3,.16,Ha),ht.add(5.6,-3.4,0,.04,4,.04,"#2e3330"),ht.add(5.6,-3.95,0,1.2,.14,.8,"#9a7a52"),ht.add(5.6,-3.8,0,1.1,.35,.7,"#c9a978"),Ct.add(ht.seal());const lt=new Ve(new Ti(.15,10,8),new Cn({color:"#ffb52e"}));lt.position.set(0,1.95,0),Ct.add(lt);const an=Array.from({length:os+1},(ce,R)=>{const S=g(),B=R?i+Bi+(R-1)*as:i,se=R?as:Bi;return S.span(a-.1,o+.1,B+se-.3,B+se-.24,l+.55,l+1.05,"#c9a978"),[a,u,o].forEach(de=>S.add(de,B,l+.95,.06,se,.06,"#9aa39b")),S.seal()});return{update(ce){const R=Math.max(0,Math.min(4,ce.flagship||0)),S=ce.flagshipBuild,B=S!=null,se=ce.night||0,de=ce.time||0;r.visible=!0,v.visible=R===0,X.visible=R>=1||B&&R===0,X.scale.y=R>=1?1:Math.max(.02,S||0);const re=R>=2?os:R===1&&B?Math.floor(S*(os+.999)):0;le.forEach((Pt,Se)=>{Pt.visible=Se<re});const Fe=R>=3?os:R===2&&B?Math.floor(S*(os+.999)):0;K.forEach((Pt,Se)=>{Pt.visible=Se<Fe});const ve=R===3&&B;xe.visible=R>=4||ve,ve?(xe.position.y=-(1-S)*2.6,rt.visible=S>.6,te.visible=S>.85):(xe.position.y=0,rt.visible=te.visible=!0),vt.visible=R<4&&(R>=1||B),Ct.rotation.y=B?Math.sin(de/5200)*.9+.6:.6,lt.visible=B&&Math.floor(de/500)%2===0;const Pe=B?R===0?1:R===1?re+1:os+1:0;an.forEach((Pt,Se)=>{Pt.visible=Se<Pe}),_.emissiveIntensity=.05+se*.6,m.emissiveIntensity=se*.26,ot.emissiveIntensity=.15+se*.75,p.color.set(xi).multiplyScalar(1+se*.4)},height(ce){return ce>=4?d+3:ce>=2?d+.5:ce>=1?i+Bi+1:i+C+2.2},centre:{x:u,z:h}}}const fb="#1f6b47",pb="#d0a54e";function mb(s,e,{span:t,model:n}){const i=e.entrance;if(!i)return null;const r=new mt;s.add(r);const a=i.x;function o(y,b,L){const w=new Sn;w.setAttribute("position",new Qt(y.flat(),3)),w.setAttribute("uv",new Qt(b.flat(),2)),w.setIndex(y.length===4?[0,1,2,0,2,3]:[0,1,2]),w.computeVertexNormals();const C=new Ve(w,L);return C.castShadow=C.receiveShadow=!0,r.add(C),C}const c=i.sign,l=new mt;r.add(l),t(l,c.x0,a,c.y1+.08,c.y1+.16,c.z-.05,c.z+.05,fb),[c.x0+.12,c.x1-.12].forEach(y=>t(l,y-.015,y+.015,c.y1,c.y1+.08,c.z-.015,c.z+.015,pb,{cast:!1})),t(l,c.x0-.04,c.x1+.04,c.y0-.04,c.y1+.04,c.z-.05,c.z+.05,"#1d211f");const u=document.createElement("canvas");u.width=256,u.height=284;const h=u.getContext("2d");h.fillStyle="#0d120f",h.fillRect(0,0,256,284);const d=128,f=150,g=(y,b)=>{const L=118*b,w=17*b,C=y-Math.PI/2,E=Math.cos(C),v=Math.sin(C),M=16,P=q=>Array.from({length:M+1},(ie,D)=>{const X=D/M,k=w*Math.pow(Math.sin(Math.PI*Math.min(1,X*1.08)),.9)*(D%2?1:.72);return[d+E*L*X-v*k*q,f+v*L*X+E*k*q]}),G=P(1),O=P(-1).reverse();h.moveTo(d,f),G.forEach(q=>h.lineTo(q[0],q[1])),O.forEach(q=>h.lineTo(q[0],q[1])),h.closePath()},_=()=>{h.beginPath(),[[0,1],[-.5,.84],[.5,.84],[-1.05,.7],[1.05,.7],[-1.6,.38],[1.6,.38]].forEach(([y,b])=>g(y,b))};h.lineJoin=h.lineCap="round",_(),h.shadowColor="#29ff6a",h.shadowBlur=18,h.strokeStyle="#3df27a",h.lineWidth=12,h.stroke(),_(),h.shadowBlur=0,h.strokeStyle="#e4ffe9",h.lineWidth=6,h.stroke(),_(),h.fillStyle="#0f1812",h.fill();const m=()=>{h.beginPath(),h.moveTo(d,f-6),h.lineTo(d,f+34)};m(),h.shadowBlur=14,h.strokeStyle="#3df27a",h.lineWidth=7,h.stroke(),m(),h.shadowBlur=0,h.strokeStyle="#e4ffe9",h.lineWidth=3,h.stroke(),h.font='300 54px "Fredoka", sans-serif',h.textAlign="center",h.textBaseline="alphabetic",h.lineWidth=2.5,h.shadowColor="#29ff6a",h.shadowBlur=16,h.strokeStyle="#7dff9f",h.strokeText("OPEN",d,262,210),h.shadowBlur=0,h.strokeStyle="#ecfff0",h.lineWidth=1.5,h.strokeText("OPEN",d,262,210);const p=new pi(u);p.colorSpace=rn;const x=new Cn({map:p,toneMapped:!1,side:2});return[c.z-.052,c.z+.052].forEach(y=>{const b=o([[c.x0,c.y1,y],[c.x1,c.y1,y],[c.x1,c.y0,y],[c.x0,c.y0,y]],[[0,1],[1,1],[1,0],[0,0]],x);b.castShadow=!1,l.attach(b)}),n&&n("blade_sign.glb",a,0,c.z,y=>{let b=0;const L=p.clone();L.flipY=!1,L.needsUpdate=!0;const w=x.clone();w.map=L,y.traverse(C=>{C.isMesh&&/^SignFace/.test(C.name)&&(C.material=w,C.castShadow=!1,b++)}),b?l.visible=!1:y.parent.visible=!1},r),r}const gb=5e3,bb=8e3,mh=4e3,Va=9e4,_b=8,Qo=256,$o=64,Wa=2,gh=new Map;function Xa(s){if(typeof s!="string")return null;let e=gh.get(s);if(e!==void 0)return e;if(e=null,s[0]==="#"){let t=s.slice(1);(t.length===3||t.length===4)&&(t=t.split("").map(n=>n+n).join("")),(t.length===6||t.length===8)&&(e=[new st("#"+t.slice(0,6)),t.length===8?parseInt(t.slice(6),16)/255:1])}else if(/^rgba?\(/.test(s)){const t=s.match(/[\d.]+/g).map(Number);e=[new st(`rgb(${t[0]},${t[1]},${t[2]})`),t.length>3?t[3]:1]}return gh.set(s,e),e}function xb(s){const e=new mt;e.visible=!1,s.add(e);const t=new tt,n=new I,i=new I,r=new An,a=new I(0,1,0),o=new I,c=new st("#ffffff");function l(D,X,k,le=!0){const K=new fi(D,k,X);return K.instanceMatrix.setUsage(35048),K.setColorAt(0,c),K.count=0,K.castShadow=le,K.receiveShadow=!0,K.frustumCulled=!1,e.add(K),K}const u=D=>new Fn({color:"#ffffff",...D}),h=D=>new Cn({color:"#ffffff",...D}),d={transparent:!0,opacity:.32,depthWrite:!1},f=new yn(1,1,1).translate(0,.5,0),g=new wn(.5,.5,1,8,1).translate(0,.5,0),_=new Ai(1,2),m=new wn(1,1,.02,20),p=new lo(1,24).rotateY(Math.PI/4),x={box:[l(f,gb,u()),l(f,800,h()),l(f,800,u(d),!1)],cord:[l(g,bb,u()),l(g,1500,h())],blob:[l(_,mh,u()),l(_,600,h())],disc:[l(m,mh,u(),!1),l(m,600,h(),!1)],facing:[l(p,600,u({side:2}),!1),l(p,300,h({side:2}),!1)]};function y(D,X){const k=new Sn;k.setAttribute("position",new fn(new Float32Array(Va*3),3).setUsage(35048)),k.setAttribute("normal",new fn(new Float32Array(Va*3),3).setUsage(35048)),k.setAttribute("color",new fn(new Float32Array(Va*(X?4:3)),X?4:3).setUsage(35048)),k.setDrawRange(0,0),Object.assign(D,{vertexColors:!0,side:2,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});const le=new Ve(k,D);return le.frustumCulled=!1,le.receiveShadow=!0,e.add(le),{mesh:le,g:k,alpha:X,n:0}}const b=[y(u(),!1),y(h(),!1),y(u({transparent:!0,depthWrite:!1}),!0)],L=new Map;function w(D,X){const k=D.x.toFixed(2)+","+D.y.toFixed(2)+","+D.z.toFixed(2)+","+D.alongZ;let le=L.get(k);if(!le){const K=document.createElement("canvas");K.width=Qo*Wa,K.height=$o*Wa;const Z=K.getContext("2d");Z.scale(Wa,Wa),Z.translate(Qo/2,$o/2);const xe=X*Math.SQRT1_2;try{D.draw(Z,xe)}catch{}const Ce=new pi(K);Ce.colorSpace=rn,Ce.anisotropy=4,le=new Ve(new Qn(Qo/xe,$o/X),h({map:Ce,transparent:!0,alphaTest:.05,side:2,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4})),le.position.set(D.x,D.y,D.z),D.alongZ&&(le.rotation.y=Math.PI/2),e.add(le),L.set(k,le)}return le}const C=[];for(let D=0;D<_b;D++){const X=new fo("#ffd9a0",0,9,1.4);e.add(X),C.push(X)}function E(D,X,k,le){const K=k?D[2]:D[X?1:0];return!K||K.count>=K.instanceMatrix.count?null:(le(t),K.setMatrixAt(K.count,t),[K,K.count++])}function v(D,X){D&&D[0].setColorAt(D[1],X[0])}function M(D,X){D.clearUpdateRanges(),X>0&&D.addUpdateRange(0,X*D.itemSize),D.needsUpdate=!0}function P(D,X){let k=2166136261^D.length;const le=Z=>{k=Math.imul(k^Z,16777619)},K=Z=>{if(typeof Z=="number")le(Math.round(Z*4096));else if(typeof Z=="string")for(let xe=0;xe<Z.length;xe++)le(Z.charCodeAt(xe));else Array.isArray(Z)?(le(Z.length),Z.forEach(K)):le(Z?1:0)};return D.forEach(Z=>X.forEach(xe=>K(Z[xe]))),k}const G={};function O(D,X,k){const le=P(X,k);return G[D]===le?!1:(G[D]=le,!0)}function q(D){D.forEach(X=>{X.count=0})}function ie(D){D.forEach(X=>{M(X.instanceMatrix,X.count),X.instanceColor&&M(X.instanceColor,X.count)})}return{group:e,update(D,X){if(O("boxes",D.boxes,["x","y","z","w","d","h","c","lit"])&&(q(x.box),D.boxes.forEach(K=>{const Z=Xa(K.c);!Z||Z[1]<.05||v(E(x.box,K.lit,Z[1]<.9,xe=>xe.compose(n.set(K.x,K.y,K.z),r.identity(),i.set(Math.max(.01,K.w),Math.max(.01,K.h),Math.max(.01,K.d)))),Z)}),ie(x.box)),O("lines",D.lines,["pts","c","w","lit"])&&(q(x.cord),D.lines.forEach(K=>{const Z=Xa(K.c);if(!Z||Z[1]<.5)return;const xe=Math.max(.02,K.w);for(let Ce=1;Ce<K.pts.length;Ce++){const te=K.pts[Ce-1],fe=K.pts[Ce];o.set(fe[0]-te[0],fe[1]-te[1],fe[2]-te[2]);const De=o.length();De<1e-4||(o.divideScalar(De),v(E(x.cord,K.lit,!1,_e=>_e.compose(n.set(te[0],te[1],te[2]),r.setFromUnitVectors(a,o),i.set(xe,De,xe))),Z))}}),ie(x.cord)),O("ellipses",D.ellipses,["at","rx","ry","c","lit"])){const K=x.blob.concat(x.disc,x.facing);q(K),D.ellipses.forEach((Z,xe)=>{const Ce=Xa(Z.c);if(!Ce||Ce[1]<.5)return;const te=Z.ry/Z.rx<.66,fe=Z.rx,De=.08+xe*.0015;Z.ry>Z.rx*1.05?v(E(x.facing,Z.lit,!1,_e=>_e.compose(n.set(Z.at[0]+De,Z.at[1],Z.at[2]+De),r.identity(),i.set(Z.rx,Z.ry,Z.rx))),Ce):v(te?E(x.disc,Z.lit,!1,_e=>_e.compose(n.set(Z.at[0],Z.at[1],Z.at[2]),r.identity(),i.set(fe,1,fe))):E(x.blob,Z.lit,!1,_e=>_e.compose(n.set(Z.at[0],Z.at[1],Z.at[2]),r.identity(),i.set(fe,Math.max(.4,Z.ry/Z.rx)*fe,fe))),Ce)}),ie(K)}if(O("polys",D.polys,["pts","c","lit"])){b.forEach(Z=>{Z.n=0});const K=new I;D.polys.forEach(Z=>{const xe=Xa(Z.c);if(!xe||xe[1]<.08||Z.pts.length<3)return;const Ce=b[xe[1]<.9?2:Z.lit?1:0],te=Z.pts.length-2;if(Ce.n+te*3>Va)return;const fe=Ce.g.attributes.position.array,De=Ce.g.attributes.normal.array,_e=Ce.g.attributes.color.array,ot=Ce.alpha?4:3,rt=Z.pts[0];K.set(0,0,0);for(let vt=0;vt<Z.pts.length;vt++){const yt=Z.pts[vt],At=Z.pts[(vt+1)%Z.pts.length];K.x+=(yt[1]-At[1])*(yt[2]+At[2]),K.y+=(yt[2]-At[2])*(yt[0]+At[0]),K.z+=(yt[0]-At[0])*(yt[1]+At[1])}if(K.lengthSq()<1e-12)return;const _t=K.y<-1e-6||Math.abs(K.y)<1e-6&&K.x+K.z<0;_t&&K.negate(),K.normalize();for(let vt=1;vt<=te;vt++)(_t?[rt,Z.pts[vt+1],Z.pts[vt]]:[rt,Z.pts[vt],Z.pts[vt+1]]).forEach(yt=>{const At=Ce.n++;fe[At*3]=yt[0],fe[At*3+1]=yt[1],fe[At*3+2]=yt[2],De[At*3]=K.x,De[At*3+1]=K.y,De[At*3+2]=K.z,_e[At*ot]=xe[0].r,_e[At*ot+1]=xe[0].g,_e[At*ot+2]=xe[0].b,Ce.alpha&&(_e[At*ot+3]=xe[1])})}),b.forEach(Z=>{Z.g.setDrawRange(0,Z.n),["position","normal","color"].forEach(xe=>M(Z.g.attributes[xe],Z.n))})}const k=new Set;D.faces.forEach(K=>k.add(w(K,D.unit))),L.forEach(K=>{K.visible=k.has(K)});const le=(D.fixtures||[]).slice().sort((K,Z)=>Z.size-K.size);C.forEach((K,Z)=>{const xe=le[Z];K.intensity=xe?X*6*Math.min(1.5,xe.size):0,xe&&K.position.set(xe.x,xe.y,xe.z)})}}}const Ja=[7,9,8,6,3,4],vb=/^(ReaderScreen|MonitorGlass|ScaleScreen|TillGlass)$/,yb=/^(LightPanel|GrowLightPurple|GrowLed)$/;let ja=null;function Mb(){if(!ja){const s=new Uint8Array(256);for(let e=0;e<64;e++){const t=e/63,n=Math.round(255*(t>.65?.53+.47*(t-.65)/.35:.53*t/.65));s.set([n,n,n,255],e*4)}ja=new Tc(s,1,64),ja.needsUpdate=!0}return ja}function Sb(s,e){s.geometry.boundingBox||s.geometry.computeBoundingBox(),s.updateMatrix();const t=Bc.copy(s.geometry.boundingBox).applyMatrix4(s.matrix),n=t.getSize(new I),i=t.min.y-e;if(!(i>.05)||n.y>Math.max(n.x,n.z)*.5)return;const r=new st().copy(s.material.emissive||s.material.color);r.multiplyScalar(1/Math.max(r.r,r.g,r.b,.001));const a=new wn(Math.SQRT1_2,Math.SQRT1_2*1.25,1,4,1,!0).rotateY(Math.PI/4),o=new Ve(a,new Cn({color:r,alphaMap:Mb(),transparent:!0,opacity:0,depthWrite:!1,blending:2,side:2}));o.name="LampFall",o.scale.set(Math.max(n.x,.02),i,Math.max(n.z,.02)),o.position.set((t.min.x+t.max.x)/2,e+i/2,(t.min.z+t.max.z)/2),o.castShadow=o.receiveShadow=!1,o.renderOrder=2,o.visible=!1,o.userData.motion={m:"fall"},s.parent.add(o)}const Ts=new Zn,Bc=new Zn,Eb=new I;function wb(s){return Ts.makeEmpty(),s.forEach(e=>{e.updateMatrix(),e.geometry?(e.geometry.boundingBox||e.geometry.computeBoundingBox(),Ts.union(Bc.copy(e.geometry.boundingBox).applyMatrix4(e.matrix))):Ts.expandByPoint(e.position)}),Eb.set((Ts.min.x+Ts.max.x)/2,Ts.min.y,(Ts.min.z+Ts.max.z)/2)}function ec(s,e){const t=new Map;return s.forEach(n=>{const i=e.exec(n.name);i&&(t.has(i[1])||t.set(i[1],[]),t.get(i[1]).push(n))}),[...t.keys()].sort().map(n=>t.get(n))}function tc(s,e){const t=s[0].parent,n=new mt,i=wb(s);return n.position.copy(i),n.userData.motion=Object.assign({rest:i.toArray()},e),t.add(n),s.forEach(r=>{r.position.sub(i),n.add(r)}),n}const Rs=(s,e)=>{s.userData.motion=Object.assign({rest:s.position.toArray(),size:s.scale.toArray()},e)},qa=(s,e)=>s.forEach((t,n)=>e(t,n,s.length));function Ab(s,e){const t=[];s.traverse(i=>{i!==s&&i.name&&t.push(i)});const n=i=>t.filter(r=>i.test(r.name));if(e===0&&ec(t,/^S(\d+)(?:Leaf|Stem|Top)/).forEach((i,r,a)=>tc(i,{m:"sprout",k:r,n:a.length})),e===1&&ec(t,/^P(\d+)(?:Stem|Leaf|Pet|Branch|Cola|SideCola|Sugar|TopSugar|Crown)/).forEach((i,r)=>{tc(i,{m:"plant",k:r}),i.forEach(a=>{/(Cola|Sugar)\d*$/.test(a.name)&&Rs(a,{m:"bud"})})}),e===1){const i=t.find(a=>a.name==="Top"&&a.isMesh),r=i?(i.updateMatrix(),Bc.copy(i.geometry.boundingBox||(i.geometry.computeBoundingBox(),i.geometry.boundingBox)).applyMatrix4(i.matrix).max.y):null;t.filter(a=>a.isMesh&&a.material&&yb.test(a.material.name)).forEach(a=>{a.userData.motion={m:"lamp",rest:a.material.emissiveIntensity},r!==null&&Sb(a,r)})}return e===2&&(qa(n(/^(?:T\dP\d|Plant|Corner)(?:Leaf|Pet|BranchLeaf)/),(i,r,a)=>Rs(i,{m:"trim",k:r*7%a,n:a})),qa(n(/^(?:Tray\d?Nug|BoardNug)\d+$/),(i,r,a)=>Rs(i,{m:"fill",k:r,n:a,from:.1,span:.75}))),e===3&&(n(/^Press(?:Ram|Head|Plate)$/).forEach(i=>Rs(i,{m:"press",amp:.03})),n(/^ScalePan$/).forEach(i=>Rs(i,{m:"press",amp:.008})),qa(n(/^(?:TopCratePouch|Box)\d+$/),(i,r,a)=>Rs(i,{m:"fill",k:r,n:a,from:.35,span:.5})),qa(n(/^TrayNug\d+$/),(i,r,a)=>Rs(i,{m:"drain",k:r,n:a}))),e===4&&n(/^Key\d+$/).forEach((i,r)=>Rs(i,{m:"key",k:r})),e===5&&ec(t,/^(?:Bag|FlatBag)(\d+)/).forEach((i,r,a)=>tc(i,{m:"handoff",k:r,n:a.length})),e!==6&&t.forEach(i=>{vb.test(i.name)&&i.isMesh&&(i.userData.motion={m:"screen"})}),s}function Tb(s,e){const t=[];return s.traverse(n=>{const i=n.userData.motion;i&&((i.m==="lamp"||i.m==="fall")&&(n.material=n.material.clone()),i.m==="screen"&&(n.material=n.material.clone(),n.material.emissive&&n.material.emissive.copy(n.material.color).lerp(new st("#bff5dc"),.5)),t.push(n))}),t.length?{index:e,parts:t,act:0,grow:[]}:null}const bc=s=>s<0?0:s>1?1:s,Gs=s=>(s=bc(s),s*s*(3-2*s));function Rb(s){return s<.72?s/.72:s>.86?(1-s)/.14:1}function Cb(s,e,t){const n=e.clock||0,i=Ja[s.index]||6,r=n/i%1,a=1-Math.exp(-t*4);s.act+=((e.act||0)-s.act)*a,s.boost=(s.boost||0)+((e.boost>0?1:0)-(s.boost||0))*(1-Math.exp(-t*3));const o=s.boost,c=.9+.1*Math.sin(n*2.3),l=s.parts;for(let u=0;u<l.length;u++){const h=l[u],d=h.userData.motion;switch(d.m){case"plant":{const f=Rb((n/i+d.k*.23)%1),g=s.grow[d.k]=s.grow[d.k]===void 0?f:s.grow[d.k]+(f-s.grow[d.k])*a;h.scale.setScalar(.2+.8*Gs(g)),h.userData.g=g,h.rotation.z=Math.sin(n*1.1+d.k*1.7)*.025;break}case"bud":{const f=Gs((h.parent.userData.g-.55)/.35);h.scale.set(d.size[0]*f,d.size[1]*f,d.size[2]*f);break}case"sprout":{const f=(n/i+d.k*.17)%1,g=f>.9?1-(f-.9)/.1:Gs(f/.8);h.scale.setScalar(.06+.94*g);break}case"trim":{const f=.1+.7*d.k/d.n,g=r>.92?(r-.92)/.08:1-bc((r-f)/.06);h.scale.set(d.size[0]*g,d.size[1]*g,d.size[2]*g);break}case"fill":case"drain":{const f=(d.m==="fill"?d.from:.35)+(d.m==="fill"?d.span:.5)*d.k/d.n,g=r>.93?1-(r-.93)/.07:Gs((r-f)/.05),_=d.m==="fill"?g:1-g;h.scale.set(d.size[0]*_,d.size[1]*_,d.size[2]*_);break}case"press":h.position.y=d.rest[1]-d.amp*Math.sin(Math.PI*bc((r-.1)/.25));break;case"key":h.position.y=d.rest[1]-(Math.floor(n*6)%9===d.k*4%9?.006*s.act:0);break;case"handoff":{const f=Math.floor(n/i)%d.n===d.k,g=f?Gs((r-.4)/.3):0,_=f?r<.85?Gs((r-.6)/.2):1-Gs((r-.85)/.15):0;h.position.y=d.rest[1]+(r<.85?.1*g:0),h.scale.setScalar(1-_);break}case"lamp":h.material.emissiveIntensity=d.rest*(1+o*1.6*c);break;case"fall":h.visible=o>.02,h.material.opacity=.7*o*c;break;case"screen":h.material.emissiveIntensity=Math.max(s.act,o)*(1+o)*(.35+.08*Math.sin(n*23)+(Math.sin(n*3.1)>.96?.15:0));break}}}const qs=96,sa=160,to=2,ds="#144d29",uu="#5c9e4d",ra="#ffe6a8",du="#f6dca2",kc="#e3c27f",Gi="#d9a441",fu="#f0c766",no="#fffaf0",pu=["bud","roll","gummy","vape","bud","gummy","roll","bud","vape","gummy"],Ls=[{tile:2,at:.14},{tile:4,at:.3},{tile:7,at:.46}],nc=.08,bh=.62,ic=.76,_c=.9,Pb=1.6,wi={x:[6,50],w:40,h:34,top:26,gap:6},Lb=s=>s<0?0:s>1?1:s,ta=s=>(s=Lb(s),s*s*(3-2*s));function Ib(s,e,t=null){if(t!=null||s>=_c){const o=Math.min(1,(t||0)/1.2);return{mode:"paid",q:o,key:"paid"+Math.round(o*12)}}if(s>=bh){const o=s>=ic?ta((s-ic)/.06):0,c=s>=ic+.06?Math.floor(e*6)%3:-1,l=ta((s-bh)/.06);return{mode:"pay",slide:l,press:o,wait:c,key:"pay"+Math.round(l*6)+Math.round(o*4)+c}}const n=Ls.filter(o=>s>=o.at+nc).length,i=Ls.find(o=>s>=o.at&&s<o.at+nc),r=i?(s-i.at)/nc:-1,a=Math.round(ta(s/.55)*60);return{mode:"browse",scroll:a,picked:n,tapping:i?i.tile:-1,ripple:r,key:"browse"+a+n+(i?i.tile+":"+Math.round(r*5):"")}}function fs(s,e,t,n,i,r){s.beginPath(),s.moveTo(e+r,t),s.arcTo(e+n,t,e+n,t+i,r),s.arcTo(e+n,t+i,e,t+i,r),s.arcTo(e,t+i,e,t,r),s.arcTo(e,t,e+n,t,r),s.closePath()}function mu(s,e,t,n,i){e==="bud"?(s.fillStyle=uu,[[-4,2],[4,2],[0,-3],[0,4]].forEach(([r,a])=>{s.beginPath(),s.arc(t+r*i,n+a*i,5*i,0,7),s.fill()}),s.fillStyle="#8cc46f",s.beginPath(),s.arc(t-1*i,n-2*i,2.5*i,0,7),s.fill()):e==="roll"?(s.save(),s.translate(t,n),s.rotate(-.6),s.fillStyle=no,s.fillRect(-10*i,-2.5*i,16*i,5*i),s.fillStyle=Gi,s.fillRect(6*i,-2.5*i,5*i,5*i),s.restore()):e==="gummy"?(s.fillStyle="#e07a5f",fs(s,t-9*i,n-4*i,8*i,8*i,2.5*i),s.fill(),s.fillStyle="#f2b134",fs(s,t+1*i,n-6*i,8*i,8*i,2.5*i),s.fill()):(s.fillStyle=ds,fs(s,t-3*i,n-9*i,6*i,18*i,2*i),s.fill(),s.fillStyle=Gi,s.fillRect(t-3*i,n-9*i,6*i,4*i))}function gu(s,e,t,n,i){s.strokeStyle=i,s.lineWidth=2.6*n,s.lineCap="round",s.lineJoin="round",s.beginPath(),s.moveTo(e-5*n,t),s.lineTo(e-1.5*n,t+4*n),s.lineTo(e+5.5*n,t-4*n),s.stroke()}function bu(s,e){if(s.fillStyle=ds,s.fillRect(0,0,qs,20),s.fillStyle=uu,s.beginPath(),s.ellipse(11,10,4,6,.5,0,7),s.fill(),s.fillStyle=ra,s.fillRect(20,8,30,4),s.strokeStyle=ra,s.lineWidth=2,s.beginPath(),s.moveTo(70,6),s.lineTo(73,6),s.lineTo(76,14),s.lineTo(84,14),s.lineTo(86,8),s.lineTo(74,8),s.stroke(),e){s.fillStyle=Gi,s.beginPath(),s.arc(87,6,5,0,7),s.fill(),s.fillStyle=ds;for(let t=0;t<e;t++)s.fillRect(84.5+t*2,5,1.2,2.5)}}function Db(s,e){s.fillStyle=ra,s.fillRect(0,0,qs,sa);const t=new Set(Ls.slice(0,e.picked).map(n=>n.tile));s.save(),s.beginPath(),s.rect(0,20,qs,116),s.clip(),pu.forEach((n,i)=>{const r=wi.x[i%2],a=wi.top+Math.floor(i/2)*(wi.h+wi.gap)-e.scroll;if(a>136||a+wi.h<20)return;const o=i===e.tapping;s.fillStyle=o?no:du,fs(s,r,a,wi.w,wi.h,4),s.fill(),mu(s,n,r+wi.w/2,a+13,.9),s.fillStyle=kc,s.fillRect(r+6,a+25,18,3),s.fillStyle=Gi,s.fillRect(r+27,a+25,8,3),o&&(s.strokeStyle=Gi,s.lineWidth=2,fs(s,r+1,a+1,wi.w-2,wi.h-2,4),s.stroke(),s.globalAlpha=1-e.ripple,s.beginPath(),s.arc(r+wi.w/2,a+14,4+e.ripple*16,0,7),s.stroke(),s.globalAlpha=1),t.has(i)&&(s.fillStyle=ds,s.beginPath(),s.arc(r+wi.w-6,a+6,5,0,7),s.fill(),gu(s,r+wi.w-6,a+6,.55,fu))}),s.restore(),bu(s,e.picked),s.fillStyle=e.picked===Ls.length?Gi:ds,fs(s,8,140,80,15,5),s.fill(),s.fillStyle=e.picked===Ls.length?ds:ra;for(let n=0;n<Ls.length;n++)s.globalAlpha=n<e.picked?1:.3,s.beginPath(),s.arc(20+n*8,147.5,2.5,0,7),s.fill();s.globalAlpha=1,s.fillRect(56,146,24,3)}function Fb(s,e){s.fillStyle=ra,s.fillRect(0,0,qs,sa),bu(s,Ls.length),s.save(),s.translate((1-e.slide)*qs,0),Ls.forEach((n,i)=>{const r=28+i*24;s.fillStyle=du,fs(s,6,r,84,20,4),s.fill(),mu(s,pu[n.tile],18,r+10,.6),s.fillStyle=kc,s.fillRect(32,r+8,28,4),s.fillStyle=Gi,s.fillRect(70,r+8,12,4)}),s.fillStyle=ds,s.fillRect(8,104,80,2),s.fillRect(10,110,26,5),s.fillStyle=Gi,s.fillRect(62,110,22,5);const t=e.press*2;if(s.fillStyle="#a87a24",fs(s,10,126,76,24,6),s.fill(),s.fillStyle=e.press?Gi:fu,fs(s,10,124+t,76,22-t,6),s.fill(),s.fillStyle=ds,e.wait<0)s.fillRect(34,133+t,28,4);else for(let n=0;n<3;n++)s.globalAlpha=n===e.wait?1:.35,s.beginPath(),s.arc(40+n*8,135+t,3,0,7),s.fill();s.globalAlpha=1,s.restore()}function Nb(s,e){s.fillStyle=ds,s.fillRect(0,0,qs,sa);const t=ta(e.q/.35),n=22*(.35+.65*t);s.fillStyle=Gi,s.beginPath(),s.arc(48,52,n,0,7),s.fill(),t>.5&&gu(s,48,52,1.6,no);const i=ta((e.q-.3)/.6),r=sa-i*62;s.fillStyle=no,s.fillRect(22,r,52,70),s.fillStyle=kc;for(let a=0;a<4;a++)s.fillRect(28,r+8+a*9,a===3?18:40,3);s.fillStyle=Gi,s.fillRect(52,r+35,16,3)}function Ub(s,e){s.setTransform(to,0,0,to,0,0),e.mode==="paid"?Nb(s,e):e.mode==="pay"?Fb(s,e):Db(s,e)}class Ob extends Cr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Hb(t)}),this.register(function(t){return new Vb(t)}),this.register(function(t){return new Qb(t)}),this.register(function(t){return new $b(t)}),this.register(function(t){return new e_(t)}),this.register(function(t){return new Xb(t)}),this.register(function(t){return new jb(t)}),this.register(function(t){return new qb(t)}),this.register(function(t){return new Yb(t)}),this.register(function(t){return new Gb(t)}),this.register(function(t){return new Kb(t)}),this.register(function(t){return new Wb(t)}),this.register(function(t){return new Zb(t)}),this.register(function(t){return new Jb(t)}),this.register(function(t){return new kb(t)}),this.register(function(t){return new t_(t)}),this.register(function(t){return new n_(t)})}load(e,t,n,i){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=ea.extractUrlBase(e);a=ea.resolveURL(l,this.path)}else a=ea.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new lu(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===_u){try{a[en.KHR_BINARY_GLTF]=new i_(e)}catch(h){i&&i(h);return}r=JSON.parse(a[en.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new g_(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case en.KHR_MATERIALS_UNLIT:a[h]=new zb;break;case en.KHR_DRACO_MESH_COMPRESSION:a[h]=new s_(r,this.dracoLoader);break;case en.KHR_TEXTURE_TRANSFORM:a[h]=new r_;break;case en.KHR_MESH_QUANTIZATION:a[h]=new a_;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function Bb(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const en={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class kb{constructor(e){this.parser=e,this.name=en.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const u=new st(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],mi);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new mc(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new fo(u),l.distance=h;break;case"spot":l=new U0(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,ls(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class zb{constructor(){this.name=en.KHR_MATERIALS_UNLIT}getMaterialType(){return Cn}extendParams(e,t,n){const i=[];e.color=new st(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],mi),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,rn))}return Promise.all(i)}}class Gb{constructor(e){this.parser=e,this.name=en.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Hb{constructor(e){this.parser=e,this.name=en.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ji}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new We(o,o)}return Promise.all(r)}}class Vb{constructor(e){this.parser=e,this.name=en.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ji}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class Wb{constructor(e){this.parser=e,this.name=en.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ji}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class Xb{constructor(e){this.parser=e,this.name=en.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ji}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new st(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],mi)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,rn)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class jb{constructor(e){this.parser=e,this.name=en.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ji}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class qb{constructor(e){this.parser=e,this.name=en.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ji}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new st().setRGB(o[0],o[1],o[2],mi),Promise.all(r)}}class Yb{constructor(e){this.parser=e,this.name=en.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ji}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Kb{constructor(e){this.parser=e,this.name=en.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ji}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new st().setRGB(o[0],o[1],o[2],mi),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,rn)),Promise.all(r)}}class Jb{constructor(e){this.parser=e,this.name=en.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ji}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class Zb{constructor(e){this.parser=e,this.name=en.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ji}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class Qb{constructor(e){this.parser=e,this.name=en.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class $b{constructor(e){this.parser=e,this.name=en.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class e_{constructor(e){this.parser=e,this.name=en.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class t_{constructor(e){this.name=en.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=i.byteOffset||0,l=i.byteLength||0,u=i.count,h=i.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(f),u,h,d,i.mode,i.filter),f})})}else return null}}class n_{constructor(e){this.name=en.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==Li.TRIANGLES&&l.mode!==Li.TRIANGLE_STRIP&&l.mode!==Li.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],d=l[0].count,f=[];for(const g of h){const _=new tt,m=new I,p=new An,x=new I(1,1,1),y=new fi(g.geometry,g.material,d);for(let b=0;b<d;b++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,b),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,b),c.SCALE&&x.fromBufferAttribute(c.SCALE,b),y.setMatrixAt(b,_.compose(m,p,x));for(const b in c)if(b==="_COLOR_0"){const L=c[b];y.instanceColor=new uc(L.array,L.itemSize,L.normalized)}else b!=="TRANSLATION"&&b!=="ROTATION"&&b!=="SCALE"&&g.geometry.setAttribute(b,c[b]);Pn.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),f.push(y)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const _u="glTF",Xr=12,_h={JSON:1313821514,BIN:5130562};class i_{constructor(e){this.name=en.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Xr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==_u)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Xr,r=new DataView(e,Xr);let a=0;for(;a<i;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===_h.JSON){const l=new Uint8Array(e,Xr+a,o);this.content=n.decode(l)}else if(c===_h.BIN){const l=Xr+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class s_{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=en.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const u in a){const h=xc[u]||u.toLowerCase();o[h]=a[u]}for(const u in e.attributes){const h=xc[u]||u.toLowerCase();if(a[u]!==void 0){const d=n.accessors[e.attributes[u]],f=_r[d.componentType];l[h]=f.name,c[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){i.decodeDracoFile(u,function(f){for(const g in f.attributes){const _=f.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}h(f)},o,l,mi,d)})})}}class r_{constructor(){this.name=en.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class a_{constructor(){this.name=en.KHR_MESH_QUANTIZATION}}class xu extends aa{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=i-t,h=(n-t)/u,d=h*h,f=d*h,g=e*l,_=g-l,m=-2*f+3*d,p=f-d,x=1-m,y=p-d+h;for(let b=0;b!==o;b++){const L=a[_+b+o],w=a[_+b+c]*u,C=a[g+b+o],E=a[g+b]*u;r[b]=x*L+y*w+m*C+p*E}return r}}const o_=new An;class c_ extends xu{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return o_.fromArray(r).normalize().toArray(r),r}}const Li={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},_r={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},xh={9728:1003,9729:1006,9984:1004,9985:1007,9986:1005,9987:1008},vh={33071:1001,33648:1002,10497:1e3},sc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},xc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Cs={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},l_={CUBICSPLINE:void 0,LINEAR:2301,STEP:2300},rc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function h_(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new ms({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),s.DefaultMaterial}function Hs(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ls(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function u_(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,u=e.length;l<u;l++){const h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];if(n){const d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):s.attributes.position;a.push(d)}if(i){const d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):s.attributes.normal;o.push(d)}if(r){const d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):s.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],d=l[2];return n&&(s.morphAttributes.position=u),i&&(s.morphAttributes.normal=h),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function d_(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function f_(s){let e;const t=s.extensions&&s.extensions[en.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ac(t.attributes):e=s.indices+":"+ac(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+ac(s.targets[n]);return e}function ac(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function vc(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function p_(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const m_=new tt;class g_{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Bb,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new hu(this.options.manager):this.textureLoader=new k0(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new lu(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return Hs(r,o,i),ls(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,u]of a.children.entries())r(u,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[en.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,a){n.load(ea.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=sc[i.type],o=_r[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new fn(l,a,c))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=sc[i.type],l=_r[i.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(f&&f!==h){const p=Math.floor(d/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let y=t.cache.get(x);y||(_=new l(o,p*f,i.count*f/u),y=new jh(_,f/u),t.cache.add(x,y)),m=new ia(y,c,d%f/u,g)}else o===null?_=new l(i.count*c):_=new l(o,d,i.count*c),m=new fn(_,c,g);if(i.sparse!==void 0){const p=sc.SCALAR,x=_r[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,b=i.sparse.values.byteOffset||0,L=new x(a[1],y,i.sparse.count*p),w=new l(a[2],b,i.sparse.count*c);o!==null&&(m=new fn(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let C=0,E=L.length;C<E;C++){const v=L[C];if(m.setX(v,w[C*c]),c>=2&&m.setY(v,w[C*c+1]),c>=3&&m.setZ(v,w[C*c+2]),c>=4&&m.setW(v,w[C*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return u.magFilter=xh[d.magFilter]||1006,u.minFilter=xh[d.minFilter]||1008,u.wrapS=vh[d.wrapS]||1e3,u.wrapT=vh[d.wrapT]||1e3,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==1003&&u.minFilter!==1006,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=i.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(h){l=!0;const d=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new Gn(_);m.needsUpdate=!0,d(m)}),t.load(ea.resolveURL(h,r.path),g,void 0,f)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),ls(h,a),h.userData.mimeType=a.mimeType||p_(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[en.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[en.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[en.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Zh,Di.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Jh,Di.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return ms}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let a;const o={},c=r.extensions||{},l=[];if(c[en.KHR_MATERIALS_UNLIT]){const h=i[en.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,r,t))}else{const h=r.pbrMetallicRoughness||{};if(o.color=new st(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],mi),o.opacity=d[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",h.baseColorTexture,rn)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=2);const u=r.alphaMode||rc.OPAQUE;if(u===rc.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===rc.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Cn&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new We(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;o.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&a!==Cn&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Cn){const h=r.emissiveFactor;o.emissive=new st().setRGB(h[0],h[1],h[2],mi)}return r.emissiveTexture!==void 0&&a!==Cn&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,rn)),Promise.all(l).then(function(){const h=new a(o);return r.name&&(h.name=r.name),ls(h,r),t.associations.set(h,{materials:e}),r.extensions&&Hs(i,h,r),h})}createUniqueName(e){const t=gn.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[en.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return yh(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],u=f_(l),h=i[u];if(h)a.push(h.promise);else{let d;l.extensions&&l.extensions[en.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=yh(new Sn,l,t),i[u]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const u=a[c].material===void 0?h_(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let f=0,g=u.length;f<g;f++){const _=u[f],m=a[f];let p;const x=l[f];if(m.mode===Li.TRIANGLES||m.mode===Li.TRIANGLE_STRIP||m.mode===Li.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new l0(_,x):new Ve(_,x),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Li.TRIANGLE_STRIP?p.geometry=rh(p.geometry,1):m.mode===Li.TRIANGLE_FAN&&(p.geometry=rh(p.geometry,2));else if(m.mode===Li.LINES)p=new d0(_,x);else if(m.mode===Li.LINE_STRIP)p=new Cc(_,x);else if(m.mode===Li.LINE_LOOP)p=new f0(_,x);else if(m.mode===Li.POINTS)p=new p0(_,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&d_(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),ls(p,r),m.extensions&&Hs(i,p,m),t.assignFinalMaterial(p),h.push(p)}for(let f=0,g=h.length;f<g;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return r.extensions&&Hs(i,h[0],r),h[0];const d=new mt;r.extensions&&Hs(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=h.length;f<g;f++)d.add(h[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new vi(ju.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new ao(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ls(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),a=i,o=[],c=[];for(let l=0,u=a.length;l<u;l++){const h=a[l];if(h){o.push(h);const d=new tt;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Rc(o,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let h=0,d=i.channels.length;h<d;h++){const f=i.channels[h],g=i.samplers[f.sampler],_=f.target,m=_.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,x=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",x)),l.push(g),u.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const d=h[0],f=h[1],g=h[2],_=h[3],m=h[4],p=[];for(let x=0,y=d.length;x<y;x++){const b=d[x],L=f[x],w=g[x],C=_[x],E=m[x];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();const v=n._createAnimationTracks(b,L,w,C,E);if(v)for(let M=0;M<v.length;M++)p.push(v[M])}return new pc(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const u=l[0],h=l[1],d=l[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,m_)});for(let f=0,g=h.length;f<g;f++)u.add(h[f]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new Kh:l.length>1?u=new mt:l.length===1?u=l[0]:u=new Pn,u!==l[0])for(let h=0,d=l.length;h<d;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=a),ls(u,r),r.extensions&&Hs(n,u,r),r.matrix!==void 0){const h=new tt;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new mt;n.name&&(r.name=i.createUniqueName(n.name)),ls(r,n),n.extensions&&Hs(t,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);const l=u=>{const h=new Map;for(const[d,f]of i.associations)(d instanceof Di||d instanceof Gn)&&h.set(d,f);return u.traverse(d=>{const f=i.associations.get(d);f!=null&&h.set(d,f)}),h};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){const a=[],o=e.name?e.name:e.uuid,c=[];Cs[r.path]===Cs.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(Cs[r.path]){case Cs.weights:l=yr;break;case Cs.rotation:l=Mr;break;case Cs.position:case Cs.scale:l=Sr;break;default:switch(n.itemSize){case 1:l=yr;break;case 2:case 3:default:l=Sr;break}break}const u=i.interpolation!==void 0?l_[i.interpolation]:2301,h=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const g=new l(c[d]+"."+Cs[r.path],t.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=vc(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Mr?c_:xu;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function b_(s,e,t){const n=e.attributes,i=new Zn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new I(c[0],c[1],c[2]),new I(l[0],l[1],l[2])),o.normalized){const u=vc(_r[o.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new I,c=new I;for(let l=0,u=r.length;l<u;l++){const h=r[l];if(h.POSITION!==void 0){const d=t.json.accessors[h.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=vc(_r[d.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;const a=new Yi;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function yh(s,e,t){const n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(const a in n){const o=xc[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){const a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return cn.workingColorSpace!==mi&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${cn.workingColorSpace}" not supported.`),ls(s,e),b_(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?u_(s,e.targets,t):s})}var __=(function(){var s="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var i=WebAssembly.validate(t)?e:s,r,a=WebAssembly.instantiate(o(i),{}).then(function(p){r=p.instance,r.exports.__wasm_call_ctors()});function o(p){for(var x=new Uint8Array(p.length),y=0;y<p.length;++y){var b=p.charCodeAt(y);x[y]=b>96?b-97:b>64?b-39:b+4}for(var L=0,y=0;y<p.length;++y)x[L++]=x[y]<60?n[x[y]]:(x[y]-60)*64+x[++y];return x.buffer.slice(0,L)}function c(p,x,y,b,L,w){var C=r.exports.sbrk,E=y+3&-4,v=C(E*b),M=C(L.length),P=new Uint8Array(r.exports.memory.buffer);P.set(L,M);var G=p(v,y,b,M,L.length);if(G==0&&w&&w(v,E,b),x.set(P.subarray(v,v+y*b)),C(v-C(0)),G!=0)throw new Error("Malformed buffer data: "+G)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},u={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},h=[],d=0;function f(p){var x={object:new Worker(p),pending:0,requests:{}};return x.object.onmessage=function(y){var b=y.data;x.pending-=b.count,x.requests[b.id][b.action](b.value),delete x.requests[b.id]},x}function g(p){for(var x="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(o(i))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+c.toString()+m.toString(),y=new Blob([x],{type:"text/javascript"}),b=URL.createObjectURL(y),L=0;L<p;++L)h[L]=f(b);URL.revokeObjectURL(b)}function _(p,x,y,b,L){for(var w=h[0],C=1;C<h.length;++C)h[C].pending<w.pending&&(w=h[C]);return new Promise(function(E,v){var M=new Uint8Array(y),P=d++;w.pending+=p,w.requests[P]={resolve:E,reject:v},w.object.postMessage({id:P,count:p,size:x,source:M,mode:b,filter:L},[M.buffer])})}function m(p){a.then(function(){var x=p.data;try{var y=new Uint8Array(x.count*x.size);c(r.exports[x.mode],y,x.count,x.size,x.source,r.exports[x.filter]),self.postMessage({id:x.id,count:x.count,action:"resolve",value:y},[y.buffer])}catch(b){self.postMessage({id:x.id,count:x.count,action:"reject",value:b})}})}return{ready:a,supported:!0,useWorkers:function(p){g(p)},decodeVertexBuffer:function(p,x,y,b,L){c(r.exports.meshopt_decodeVertexBuffer,p,x,y,b,r.exports[l[L]])},decodeIndexBuffer:function(p,x,y,b){c(r.exports.meshopt_decodeIndexBuffer,p,x,y,b)},decodeIndexSequence:function(p,x,y,b){c(r.exports.meshopt_decodeIndexSequence,p,x,y,b)},decodeGltfBuffer:function(p,x,y,b,L,w){c(r.exports[u[L]],p,x,y,b,r.exports[l[w]])},decodeGltfBufferAsync:function(p,x,y,b,L){return h.length>0?_(p,x,y,u[b],l[L]):a.then(function(){var w=new Uint8Array(p*x);return c(r.exports[u[b]],w,p,x,y,r.exports[l[L]]),w})}}})();function x_(s){const e=new Map,t=new Map,n=s.clone();return vu(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function vu(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)vu(s.children[n],e.children[n],t)}const yu=s=>s<0?0:s>1?1:s,cs=s=>(s=yu(s),s*s*(3-2*s)),Xi=(s,e,t)=>[s[0]+(e[0]-s[0])*t,s[1]+(e[1]-s[1])*t,s[2]+(e[2]-s[2])*t],mr=(s,e,t)=>Math.sin(Math.PI*yu((s-e)/(t-e))),Mh=(s,e,t)=>({lean:s.lean+(e.lean-s.lean)*t,yaw:s.yaw+(e.yaw-s.yaw)*t,pitch:s.pitch+(e.pitch-s.pitch)*t,left:Xi(s.left,e.left,t),right:Xi(s.right,e.right,t)}),oc=(s,e)=>{const t=Math.sin(s*12.9898+e*78.233)*43758.5453;return t-Math.floor(t)};function v_(s,e,t=1){const n=e||0;switch(s){case"seeds":{const i=n*1.3,r=Math.floor(i),a=i-r,o=mr(a,.25,.75),c=d=>(d%=8,-.25+.125*(d<5?d:8-d)),l=c(r),u=c(r+1),h=a>.75?l+(u-l)*cs((a-.75)/.25):l;return{lean:.22,yaw:-h*.5,pitch:.38,left:[.05,-.62,.5],right:[h,-.5-.14*o,.62]}}case"grow":{const r=Math.floor(n/3),a=(n-r*3)/3,o=u=>[-.2+.45*oc(u,1),-.42+.2*oc(u,2),.72+.12*oc(u,3)],c=a<.3?Xi(o(r-1),o(r),cs(a/.3)):o(r),l=a>.3?Math.sin((a-.3)*26)*.035:0;return c[0]+=l,c[1]+=Math.abs(l)*.6,{lean:.12,yaw:-c[0]*.6,pitch:.15-c[1]*.3,left:null,right:c}}case"harvest":{const i=Ja[2]/3,r=n%i/i,a=mr(r,.72,1),o=Math.sin(n*13)*.025,c=Math.sin(n*1.7)*.06,l=Xi([-.02+c,-.48+o,.5],[.32,-.62,.42],a);return{lean:.3,yaw:-.25*a,pitch:.45,left:[-.08,-.5,.55],right:l}}case"pack":{const i=n/Ja[3]%1,r=mr(i,.1,.35),a=c=>{const l=[.08,-.24-.26*c,.55];return{lean:.1+.18*c,yaw:0,pitch:.3,left:l,right:l.slice()}},o=c=>({lean:.2,yaw:-.35+.7*c,pitch:.4,left:[.08,-.55,.5],right:Xi([.36,-.6,.42],[-.02,-.52,.62],c)});if(i<.37)return a(r);if(i<.45)return Mh(a(0),o(0),cs((i-.37)/.08));if(i<.87){const c=(i-.45)/.42*4,l=c-Math.floor(c);return o(l<.5?cs(l/.5):1-cs((l-.5)/.5))}return Mh(o(0),a(0),cs((i-.87)/.1))}case"desk":{const i=t*.03;return{lean:.1,yaw:0,pitch:.3-.35*(t*(Math.sin(n*.9)>.6?1:0)),left:[.04,-.55+i*Math.max(0,Math.sin(n*19)),.55],right:[.04,-.55+i*Math.max(0,Math.sin(n*19+2.2)),.57]}}case"pickup":case"window":{const i=n/Ja[5]%1,r=t,a=[.12,-.62,.42],o=[.12,-.66,.55],c=[.08,-.22,.88];let l=a;return i<.4?l=Xi(a,o,cs((i-.25)/.15)):i<.7?l=Xi(o,c,cs((i-.4)/.3)):i<.85?l=c:l=Xi(c,a,cs((i-.85)/.15)),l=Xi(a,l,r),{lean:.12+.08*r*mr(i,.3,.9),yaw:0,pitch:.3-.25*r*mr(i,.45,.9),left:[.12,-.62,.4],right:l}}case"guard":{const i=Math.sin(n*.45)+.35*Math.sin(n*1.1);return{lean:-.04,yaw:.55*Math.max(-1,Math.min(1,i*1.2)),pitch:.05,left:[-.42,-.72,.32],right:[-.38,-.72,.36]}}case"host":{const r=n%9/9,a=mr(r,.6,.9);return{lean:0,yaw:.4*Math.sin(n*.35)+.3*a,pitch:.05,left:[-.38,-.62,.42],right:Xi([-.34,-.62,.45],[.45,-.32,.62],a)}}}return null}const oi="mixamorig",Ys={left:[oi+"LeftArm",oi+"LeftForeArm",oi+"LeftHand"],right:[oi+"RightArm",oi+"RightForeArm",oi+"RightHand"]},y_=0,M_=.3,io=[oi+"Spine",oi+"Spine2",oi+"Neck",oi+"Head",...Ys.left.slice(0,2),...Ys.right.slice(0,2)];function S_(s){const e={};return s.traverse(t=>{t.isBone&&t.name.startsWith(oi)&&(e[t.name.replace(":","")]=t)}),!io.every(t=>e[t])||!e[Ys.left[2]]||!e[Ys.right[2]]?null:{body:s,bones:e,idle:io.map(()=>new An),targets:{},weight:0}}const zc=new tt,E_=new tt,w_=new I,Sh=new An,yc=new An,Mu=new An,A_=new An,Jn=new I,ps=new I,Er=new I,Su=new I,jr=new I,Ya=new I,Mc=new I,Sc=new I,T_=new I,R_=new I,cc=new I(1,0,0),Eh=new I(0,1,0);function Ri(s,e,t){s.updateWorldMatrix(!0,!1),E_.multiplyMatrices(zc,s.matrixWorld).decompose(e||Su,t||yc,w_)}function Eu(s,e){Ri(s.parent,null,Sh),Ri(s,null,yc),s.quaternion.copy(Sh.invert().multiply(Mu.copy(e).multiply(yc)))}function qr(s,e,t){t&&Eu(s,A_.setFromAxisAngle(e,t))}function wh(s,e,t){Ri(s,Mc),Ri(e,Sc),Eu(s,Mu.setFromUnitVectors(Sc.sub(Mc).normalize(),t))}function wu(s,e,t,n){const i=s[e[0]],r=s[e[1]],a=s[e[2]];Ri(i,Jn),Ri(r,ps),Ri(a,Er);const o=ps.distanceTo(Jn),c=Er.distanceTo(ps),l=Math.max(.05*(o+c),Math.min((o+c)*.995,Su.copy(n).distanceTo(Jn)));jr.copy(n).sub(Jn).normalize();const u=Math.max(-1,Math.min(1,(o*o+l*l-c*c)/(2*o*l))),h=Math.sqrt(1-u*u);Ya.set(t*.55,-.45,-.5),Ya.addScaledVector(jr,-Ya.dot(jr)).normalize();const d=Mc.copy(Jn).addScaledVector(jr,o*u).addScaledVector(Ya,o*h),f=Sc.copy(Jn).addScaledVector(jr,l),g=T_.subVectors(d,Jn).normalize(),_=R_.subVectors(f,d).normalize();wh(i,r,g),wh(r,a,_)}function C_(s,e,t,n,i=1){const r=v_(e,t,n);if(!s||!r||i<=0)return null;const{body:a,bones:o}=s;io.forEach((d,f)=>s.idle[f].copy(o[d].quaternion)),a.updateWorldMatrix(!0,!1),zc.copy(a.matrixWorld).invert();const c=[o[oi+"Spine"],o[oi+"Spine2"]],l=d=>c.forEach(f=>qr(f,cc,d*.5));l(r.lean);const u={},h=[["left",1],["right",-1]].filter(([d])=>r[d]);return h.forEach(([d,f])=>{const g=r[d],_=Ys[d];Ri(o[_[0]],Jn),Ri(o[_[1]],ps),Ri(o[_[2]],Er);const m=ps.distanceTo(Jn)+Er.distanceTo(ps);u[d]=(s.targets[d]=s.targets[d]||new I).set(Jn.x+f*g[0]*m,Jn.y+g[1]*m,Jn.z+g[2]*m)}),c.forEach((d,f)=>d.quaternion.copy(s.idle[f])),l(r.lean*y_),qr(c[1],cc,-.06),qr(o[oi+"Neck"],Eh,r.yaw*.5),qr(o[oi+"Head"],Eh,r.yaw*.5),qr(o[oi+"Head"],cc,r.pitch*M_),h.forEach(([d,f])=>wu(o,Ys[d],f,u[d])),i<1&&io.forEach((d,f)=>o[d].quaternion.slerp(s.idle[f],1-i)),u}const P_=[.2,-.96,.03];function L_(s,e=0,t=1){if(!s||t<=0)return null;const{body:n,bones:i}=s,r=Ys.right,a=i[r[0]],o=i[r[1]],c=a.quaternion.clone(),l=o.quaternion.clone();n.updateWorldMatrix(!0,!1),zc.copy(n.matrixWorld).invert(),Ri(a,Jn),Ri(o,ps),Ri(i[r[2]],Er);const u=ps.distanceTo(Jn)+Er.distanceTo(ps),h=P_,d=(s.targets.carry=s.targets.carry||new I).set(Jn.x-h[0]*u,Jn.y+(h[1]+Math.abs(e)*.02)*u,Jn.z+(h[2]+e*.09)*u);return wu(i,r,-1,d),t<1&&(a.quaternion.slerp(c,1-t),o.quaternion.slerp(l,1-t)),d}const Vs=1.69,Ah=160,lc=32,Th="#fff1d6",Rh="#fffaf0",Ch="#b8ad94";function U_(s,e){let t;try{t=new a0({canvas:s,antialias:!0,alpha:!1,powerPreference:"high-performance"}),t.localClippingEnabled=!0}catch{return null}if(!t.getContext())return null;let n=0;const i=cu,r=(A,F,U)=>{n=U-F};i.onStart=i.onProgress=r,t.outputColorSpace=rn,t.shadowMap.enabled=!0,t.shadowMap.type=2;const a=new st().setRGB(e.haze.colour[0]/255,e.haze.colour[1]/255,e.haze.colour[2]/255,rn),o=new Nl;o.background=a.clone();const c=hh(),l=new mt;l.scale.y=Bn,o.add(l);const u=new eh(Rh,Ch,1.55);o.add(u);const h=new mc(Th,2.1),d=e.sun.reach,f=new I(-e.sun.x*d,1/Bn,-e.sun.z*d).normalize();h.castShadow=!0,h.shadow.mapSize.set(2048,2048),h.shadow.bias=-4e-4,h.shadow.normalBias=.03,Object.assign(h.shadow.camera,{left:-44,right:44,top:44,bottom:-44,near:1,far:260}),o.add(h,h.target);const g={hazeColour:{value:a},hazeX:{value:new ln(...e.haze.ramp.west,...e.haze.ramp.east)},hazeZ:{value:new ln(...e.haze.ramp.north,...e.haze.ramp.south)}},_=new Map;function m(A,F={}){const U=A+JSON.stringify(F);if(_.has(U))return _.get(U);const $=p(A,F);return _.set(U,$),$}function p(A,F={}){return x(new Fn({color:A,...F}))}function x(A){return A.onBeforeCompile=F=>{Object.assign(F.uniforms,g),F.vertexShader=`varying vec3 vHazeWorld;
`+F.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        vec4 hazeLocal = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          hazeLocal = instanceMatrix * hazeLocal;
        #endif
        vHazeWorld = (modelMatrix * hazeLocal).xyz;`),F.fragmentShader=`varying vec3 vHazeWorld;
uniform vec3 hazeColour;
uniform vec4 hazeX;
uniform vec4 hazeZ;
`+F.fragmentShader.replace("#include <dithering_fragment>",`
        // Measured at the ground point behind the fragment along the view ray (the camera looks down so that a point h
        // up covers the ground h further back on both x and z), the haze is the same for whatever stands on a pixel: a
        // tall far terrace fades up its height into the sky instead of standing as a flat haze-coloured block over a
        // clearer street, and no wall is cut off where it crosses the ramp. smoothstep eases both ends of each ramp.
        vec2 hazeGround = vHazeWorld.xz - vHazeWorld.y;
        float hazeClear = (1.0 - smoothstep(hazeX.x, hazeX.y, hazeGround.x)) * (1.0 - smoothstep(hazeX.z, hazeX.w, hazeGround.x))
          * (1.0 - smoothstep(hazeZ.x, hazeZ.y, hazeGround.y)) * (1.0 - smoothstep(hazeZ.z, hazeZ.w, hazeGround.y));
        float hazeAmount = 1.0 - hazeClear;
        // The colour is mixed in after the output conversion, so the haze is converted too: then a fully hazed wall,
        // the ground's far edge and the sky behind them are one colour and nothing shows where the geometry stops.
        gl_FragColor.rgb = mix(gl_FragColor.rgb, linearToOutputTexel(vec4(hazeColour, 1.0)).rgb, hazeAmount);
        #include <dithering_fragment>`)},A.customProgramCacheKey=()=>"haze",A}const y={},b=new hu;function L(A){const F=(e.floorTextures||{})[A];return F?(y[A]||(y[A]=b.load(new URL(F.url,document.baseURI).href),y[A].colorSpace=rn,y[A].wrapS=y[A].wrapT=1e3,y[A].anisotropy=8),{base:y[A],size:F.size}):null}function w(A,F){const U=L(F);if(!U)return A;const $=U.base.clone(),z=A.scale.x,Y=A.scale.z;return $.repeat.set(z/U.size,Y/U.size),$.offset.set((A.position.x-z/2)/U.size,-(A.position.z+Y/2)/U.size),A.material=p("#ffffff",{map:$}),A}const C=new yn(1,1,1).translate(0,.5,0);function E(A,F,U,$,z,Y,he,be,{cast:Ie=!0,receive:qe=!0,opts:xt}={}){const Dt=new Ve(C,m(be,xt));return Dt.position.set(F,U,$),Dt.scale.set(z,Y,he),Dt.castShadow=Ie,Dt.receiveShadow=qe,A.add(Dt),Dt}function v(A,F,U,$,z,Y,he,be,Ie){return E(A,(F+U)/2,$,(Y+he)/2,Math.max(.001,U-F),Math.max(.001,z-$),Math.max(.001,he-Y),be,Ie)}const M=new Ob().setMeshoptDecoder(__),P=M.load.bind(M),G=[];let O=0;function q(){O=0;const A=performance.now()+6;do{const F=G.shift();try{F()}catch(U){console.warn("3D map: model setup failed",U)}}while(G.length&&performance.now()<A);G.length&&(O=requestAnimationFrame(q))}M.load=(A,F,U,$)=>P(A,z=>{z.scene.userData.file=A.split("/").pop(),G.push(()=>F(z)),O||(O=requestAnimationFrame(q))},U,$);function ie(A,F,U,$,z,Y=l){M.load(e.modelBase+A,he=>{vt(he.scene);const be=new mt;be.add(he.scene),be.scale.set(Vs,Vs/Bn,Vs),be.position.set(F,U,$),Y.add(be),z&&z(he.scene,be),js(he.scene)},void 0,he=>console.warn("3D map: could not load "+A,he))}const D=[],X=I_(l,e,{box:E,span:v,material:m,textured:w,lampStandIns:D});F_(l,e,{box:E,span:v,material:m,textured:w,model:ie});const k=N_(o,l,e.transport,{box:E,material:m}),le=tb(l,e,{box:E,span:v,material:m,model:ie}),K=cb(l,e,{box:E,span:v,material:m}),Z=db(l,e,{material:m});mb(l,e,{span:v,model:ie});let xe=0;const Ce=[],te=new Ve(new eo(.86,1,48).rotateX(-Math.PI/2),new Cn({color:"#e2c68a",transparent:!0,opacity:.85,depthWrite:!1}));te.renderOrder=2,l.add(te);const fe=["#d8cfbd","#b8cdb2","#9cc4b8","#e2c68a"],De=(()=>{const A=document.createElement("canvas");A.width=A.height=64;const F=A.getContext("2d"),U=F.createRadialGradient(32,32,0,32,32,32);return U.addColorStop(0,"rgba(255,255,255,1)"),U.addColorStop(.6,"rgba(255,255,255,.8)"),U.addColorStop(1,"rgba(255,255,255,0)"),F.fillStyle=U,F.fillRect(0,0,64,64),new pi(A)})(),_e=[];function ot(A){if(!_e[A]){const F=(U,$)=>{const z=new Ve(U,new Cn(Object.assign({color:"#f0a010",transparent:!0,depthWrite:!1},$)));return z.renderOrder=2,l.add(z),z};_e[A]={pool:F(new Qn(1,1).rotateX(-Math.PI/2),{map:De}),ring:F(new eo(.86,1,48).rotateX(-Math.PI/2),{color:"#e8920a"})}}return _e[A]}function rt(A){if(!Ce[A]){const F=new mt,U=E(F,0,0,0,1,1,1,fe[1]),$=E(F,0,1,0,1,.08,1,"#efe7d4");F.userData={body:U,top:$},l.add(F),Ce[A]=F}return Ce[A]}const _t={};function vt(A){A.traverse(F=>{if(!F.isMesh)return;F.castShadow=F.receiveShadow=!0;const U=F.material;U&&U.transmission>0&&(F.material=new ms({color:U.color,roughness:.1,metalness:0,transparent:!0,opacity:.28,depthWrite:!1}),F.castShadow=!1)})}function yt(A){const F=new I,U=new I,$=new I;A.traverse(z=>{if(!z.isMesh||!/^Sign(Border)?$/.test(z.name))return;const Y=z.geometry,he=Y.attributes.position,be=Y.index;if(!be)return;let Ie=0;for(let xt=0;xt<be.count;xt+=3)F.fromBufferAttribute(he,be.getX(xt)),U.fromBufferAttribute(he,be.getX(xt+1)),$.fromBufferAttribute(he,be.getX(xt+2)),Ie+=F.dot(U.cross($));if(Ie>=0)return;for(let xt=0;xt<be.count;xt+=3){const Dt=be.getX(xt+1);be.setX(xt+1,be.getX(xt+2)),be.setX(xt+2,Dt)}const qe=Y.attributes.normal;if(qe)for(let xt=0;xt<qe.count;xt++)qe.setXYZ(xt,-qe.getX(xt),-qe.getY(xt),-qe.getZ(xt))})}function At(A){A.traverse(F=>{const U=F.isMesh&&F.material;U&&U.metalness>.5&&(U.metalness=.35,U.roughness=Math.max(.35,U.roughness))})}K&&K.loadModels(M,e.modelBase),k&&k.loadModels(M,e.modelBase);const H={},tn=[],Ct=[],ht={};(e.fixtures||[]).forEach(A=>{M.load(e.modelBase+A.file,F=>{vt(F.scene),(A.hide||[]).forEach($=>{const z=F.scene.getObjectByName($);z&&(z.visible=!1)}),A.glow&&F.scene.traverse($=>{const z=$.isMesh&&$.material;z&&z.name===A.glow&&!tn.includes(z)&&(z.emissive.set("#ffe3b0"),tn.push(z))}),A.screen&&F.scene.traverse($=>{const z=$.isMesh&&$.material;z&&z.name===A.screen&&!Ct.includes(z)&&(z.emissive.set("#ffffff"),z.emissiveMap=z.map,z.needsUpdate=!0,Ct.push(z))}),A.menu&&F.scene.traverse($=>{const z=$.isMesh&&$.material;z&&z.name===A.screen&&!ht[A.key]&&(ht[A.key]=lt(z))}),js(F.scene);const U=new mt;U.add(F.scene),U.scale.set(A.scale,A.scale/Bn,A.scale),U.position.set(A.x,A.y,A.z),U.visible=!1,l.add(U),H[A.key]=U},void 0,F=>console.warn("3D map: could not load "+A.file,F))});function lt(A){const F=document.createElement("canvas");F.width=qs*to,F.height=sa*to;const U=new pi(F);return U.flipY=!1,U.colorSpace=rn,{material:A,base:A.map,texture:U,ctx:F.getContext("2d"),key:"",paidAt:null}}function an(A,F,U){const $=A.material,z=F!=null&&F>=0;z&&F>=_c&&A.paidAt==null&&(A.paidAt=U),z&&F<_c&&(A.paidAt=null);const Y=A.paidAt==null?null:U-A.paidAt;!z&&Y!=null&&(Y>Pb||Y<0)&&(A.paidAt=null);const he=z||A.paidAt!=null;if(he){const Ie=Ib(z?F:1,U,A.paidAt==null?null:Y);Ie.key!==A.key&&(Ub(A.ctx,Ie),A.texture.needsUpdate=!0,A.key=Ie.key)}const be=he?A.texture:A.base;$.map!==be&&($.map=$.emissiveMap=be),he&&($.emissiveIntensity+=.2)}const ce={};function R(A){const F=(e.stationModels||{})[A];!F||ce[A]||(ce[A]=!0,M.load(e.modelBase+F,U=>{const $=U.scene,z=new Zn().setFromObject($),Y=z.getSize(new I),he=z.getCenter(new I),be=e.stationModelSize[A]||{w:Y.x+Y.z,ox:0},Ie=be.w/((Y.x+Y.z)*Math.SQRT1_2);$.position.set(-he.x,-z.min.y,-he.z),vt($),yt($),At($),Ab($,+A.split(".")[0]),js($);const qe=new mt;qe.add($),qe.scale.set(Ie,Ie/Bn,Ie),qe.position.set(be.ox*Math.SQRT1_2,0,-be.ox*Math.SQRT1_2),be.turn&&(qe.rotation.y=be.turn),_t[A]=qe},void 0,U=>console.warn("3D map: could not load "+F,U)))}const S={},B=hh(),se=new Nl;se.add(new eh(Rh,Ch,1.7));const de=new mc(Th,2.1);de.position.copy(f).multiplyScalar(50),se.add(de);function re(A){return S[A]?S[A]:_t[A]?S[A]=jt(_t[A].clone(),480,600):(R(A),null)}function Fe(A,F){A=Math.min(8,Math.max(1,A||1));const U="lounge."+A+"."+(F?2:1);if(S[U])return S[U];const $=K&&K.pictureCopy(A,F);return $?S[U]=jt($,600,480):null}const ve={},Pe=new Fn({color:"#9aa39b"}),Pt=new Fn({color:"#c9a978"}),Se=new Cn({color:"#ffb52e"});function ze(A,F){if(ve[A])return ve[A];const U=[];F.traverse(zt=>{zt.isMesh&&(zt.material=zt.material.clone(),U.push(zt.material))});const $=F.visible;F.visible=!0,F.updateMatrixWorld(!0);const z=new Zn().setFromObject(F);F.visible=$;const Y=z.min.y/Bn,he=z.max.y/Bn+.35,be=.3,Ie=z.min.x-be,qe=z.max.x+be,xt=z.min.z-be,Dt=z.max.z+be,oe=[],Qe=[],ke=.05,pt=(zt,Nt,On,bs,_s,Pr,xs=oe)=>xs.push(new yn(bs,_s,Pr).translate(zt,Nt,On)),Bt=(zt,Nt)=>{const On=Math.max(1,Math.round((Nt-zt)/1.6));return Array.from({length:On+1},(bs,_s)=>zt+(Nt-zt)*_s/On)};Bt(Ie,qe).forEach(zt=>[xt,Dt].forEach(Nt=>pt(zt,(Y+he)/2,Nt,ke,he-Y,ke))),Bt(xt,Dt).forEach(zt=>[Ie,qe].forEach(Nt=>pt(Nt,(Y+he)/2,zt,ke,he-Y,ke)));for(let zt=Y+.9;zt<=he+.01;zt+=.9)[xt,Dt].forEach(Nt=>pt((Ie+qe)/2,zt,Nt,qe-Ie,ke,ke)),[Ie,qe].forEach(Nt=>pt(Nt,zt,(xt+Dt)/2,ke,ke,Dt-xt)),pt((Ie+qe)/2,zt-.03,Dt-.18,qe-Ie,.05,.34,Qe);const Ft=new mt;Ft.add(new Ve(qi(oe),Pe),new Ve(qi(Qe),Pt));const En=new Ve(new Ti(.12,10,8),Se);return En.position.set(qe,he+.12,Dt),Ft.add(En),Ft.traverse(zt=>{zt.isMesh&&(zt.castShadow=!0)}),l.add(Ft),ve[A]={site:Ft,beacon:En,materials:U,plane:new hs(new I(0,-1,0),0),lo:z.min.y,hi:z.max.y}}function nt(A){const F=A.fixtureBuild||{};Object.entries(H).forEach(([U,$])=>{const z=F[U];if(z===void 0){const he=ve[U];he&&he.site.visible&&(he.site.visible=!1,he.materials.forEach(be=>{be.clippingPlanes=null,be.needsUpdate=!0}));return}const Y=ze(U,$);(!Y.site.visible||!Y.materials[0].clippingPlanes)&&(Y.site.visible=!0,Y.materials.forEach(he=>{he.clippingPlanes=[Y.plane],he.needsUpdate=!0})),Y.plane.constant=Y.lo+(Y.hi-Y.lo)*Math.max(0,Math.min(1,(z-.1)/.9)),$.visible=!0,Y.beacon.visible=Math.floor((A.time||0)/500)%2===0})}const dt={},Ke=new Cn({color:"#f1e6c6",transparent:!0,opacity:.3,depthWrite:!1});function Gt(A){const F=A.fixtureGhost||{};Object.entries(H).forEach(([U,$])=>{if(!(!!F[U]&&!$.visible)){dt[U]&&(dt[U].visible=!1);return}if(!dt[U]){const Y=$.clone();Y.traverse(he=>{he.isMesh&&(he.material=Ke,he.castShadow=!1,he.receiveShadow=!1)}),l.add(Y),dt[U]=Y}dt[U].visible=!0})}function Tt(A){if(S["fixture."+A])return S["fixture."+A];if(!H[A]||ve[A]&&ve[A].site.visible)return null;const F=H[A].clone();return F.visible=!0,S["fixture."+A]=jt(F,600,480)}function jt(A,F,U){const $=new mt;$.scale.y=Bn,$.add(A),se.add($),$.updateMatrixWorld(!0);const z=new Zn().setFromObject($),Y=[];for(let Nt=0;Nt<8;Nt++)Y.push(new I(Nt&1?z.max.x:z.min.x,Nt&2?z.max.y:z.min.y,Nt&4?z.max.z:z.min.z));B.updateMatrixWorld(!0);const he=B.matrixWorldInverse,be=[],Ie=[];Y.forEach(Nt=>{Nt.applyMatrix4(he),be.push(Nt.x),Ie.push(Nt.y)});const qe=(Math.min(...be)+Math.max(...be))/2,xt=(Math.min(...Ie)+Math.max(...Ie))/2,Dt=Math.max((Math.max(...be)-Math.min(...be))/2/F*U,(Math.max(...Ie)-Math.min(...Ie))/2)*1.04;B.left=qe-Dt*F/U,B.right=qe+Dt*F/U,B.top=xt+Dt,B.bottom=xt-Dt,B.updateProjectionMatrix();const oe=new Is(F,U,{samples:4});oe.texture.colorSpace=rn;const Qe=t.getClearColor(new st),ke=t.getClearAlpha(),pt=t.shadowMap.enabled;t.shadowMap.enabled=!1,t.setRenderTarget(oe),t.setClearColor(0,0),t.clear(),t.render(se,B);const Bt=new Uint8Array(F*U*4);t.readRenderTargetPixels(oe,0,0,F,U,Bt),t.setRenderTarget(null),t.setClearColor(Qe,ke),t.shadowMap.enabled=pt,oe.dispose(),se.remove($);const Ft=document.createElement("canvas");Ft.width=F,Ft.height=U;const En=Ft.getContext("2d"),zt=En.createImageData(F,U);for(let Nt=0;Nt<U;Nt++)zt.data.set(Bt.subarray((U-1-Nt)*F*4,(U-Nt)*F*4),Nt*F*4);return En.putImageData(zt,0,0),Ft}const V=new Dc(.24,1.55,4,10).translate(0,1.03,0),Re=new fi(V,m("#ffffff",{name:"people"}),Ah);Re.castShadow=!0,Re.count=0;const ue=new Map,ge=[],Oe=new fn(new Uint16Array([0,1,2,0,2,3]),1),Ge=8e3;let Xe=0,nn=0;function Tn(A){let F=ue.get(A);return F||(F=new Gn(A),F.colorSpace=rn,F.anisotropy=4,F.needsUpdate=!0,ue.set(A,F)),F.userData.used=nn,F}function Wt(){nn-Xe<2e3||(Xe=nn,ue.forEach((A,F)=>{nn-A.userData.used>Ge&&(A.dispose(),ue.delete(F))}))}const pe=[];function Nn(A){if(!pe[A]){const F=new Sn;F.setAttribute("position",new fn(new Float32Array(12),3)),F.setAttribute("uv",new fn(new Float32Array(8),2)),F.setIndex(Oe);const U=new Ve(F,x(new Cn({alphaTest:.5,side:2,depthTest:!1,depthWrite:!1})));U.frustumCulled=!1,U.renderOrder=-1,l.add(U),pe[A]=U}return pe[A]}function qn(A){if(!ge[A]){const F=new Sn;F.setAttribute("position",new fn(new Float32Array(12),3)),F.setAttribute("uv",new fn(new Float32Array(8),2)),F.setIndex(Oe);const U=new Ve(F,x(new Cn({alphaTest:.5,side:2})));U.frustumCulled=!1,l.add(U),ge[A]=U}return ge[A]}const $n=[],Ln=[];function gi(A,F,U){const $=new Sn;$.setAttribute("position",new fn(new Float32Array(12),3)),$.setAttribute("uv",new fn(new Float32Array(8),2)),$.setIndex(Oe);const z={alphaTest:.5,side:2},Y=x(F?new Fn({...z,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}):new Cn(z)),he=new Ve($,Y);return he.visible=!1,he.frustumCulled=!1,he.receiveShadow=F,l.add(he),b.load(new URL(A,document.baseURI).href,be=>{be.colorSpace=rn,be.anisotropy=8;const[Ie,qe]=U(be.image);$.attributes.position.array.set(Ie),$.attributes.position.needsUpdate=!0,$.attributes.uv.array.set(qe),$.attributes.uv.needsUpdate=!0,$.computeVertexNormals(),Y.map=be,Y.needsUpdate=!0,he.userData.ready=!0},void 0,()=>console.warn("3D map: could not load "+A)),he}(e.wallFaces||[]).forEach(A=>{const F=gi(A.url,!1,()=>[[A.x0,A.y0,A.z0,A.x1,A.y0,A.z1,A.x1,A.y0+A.h,A.z1,A.x0,A.y0+A.h,A.z0],[0,0,1,0,1,1,0,1]]);F.userData.model=A.model,$n.push(F)}),(e.decals||[]).forEach(A=>{const F=gi(A.url,!0,U=>{const $=A.pixels?A.image.map(([Bt,Ft])=>[Bt/U.naturalWidth,Ft/U.naturalHeight]):A.image,[z,Y,he]=$,[be,Ie,qe]=A.world,xt=Y[0]-z[0],Dt=he[0]-z[0],oe=Y[1]-z[1],Qe=he[1]-z[1],ke=xt*Qe-Dt*oe,pt=(Bt,Ft)=>{const En=Bt-z[0],zt=Ft-z[1],Nt=(Qe*En-Dt*zt)/ke,On=(xt*zt-oe*En)/ke;return[be[0]+(Ie[0]-be[0])*Nt+(qe[0]-be[0])*On,.012,be[1]+(Ie[1]-be[1])*Nt+(qe[1]-be[1])*On]};return[[...pt(0,1),...pt(1,1),...pt(1,0),...pt(0,0)],[0,0,1,0,1,1,0,1]]});F.userData.show=A.show,Ln.push(F)}),(e.casters||[]).forEach(A=>E(l,A.x,0,A.z,A.w,A.h,A.d,"#ffffff",{receive:!1,opts:{name:"street"}}));const Yn=new mt;l.add(Yn);let Hi="";function ci(A){Yn.children.forEach(U=>U.geometry.dispose()),Yn.clear();const F=new Set;A.forEach(U=>{const $=new co(U.points.map(Y=>new I(Y[0],Y[1],Y[2]))),z=new Ve(new Ar($,20,.045,8,!1),m(U.colour));z.castShadow=!0,Yn.add(z),[U.points[0],U.points[U.points.length-1]].forEach(Y=>{const he=Y[0].toFixed(2)+","+Y[2].toFixed(2);if(F.has(he))return;F.add(he);const be=new Ve(C.clone(),m("#ffffff",{name:"street"}));be.position.set(Y[0],0,Y[2]),be.scale.set(.07,1,.07),be.castShadow=!0,Yn.add(be)})})}Re.instanceMatrix.setUsage(35048),l.add(Re);const ei=new fi(C,m("#ffffff",{name:"street"}),lc),bn=new fi(C,m("#dfe8ea",{name:"street"}),lc);[ei,bn].forEach(A=>{A.castShadow=!0,A.count=0,A.instanceMatrix.setUsage(35048),l.add(A)});const li=1.69,Fi=new I(0,0,1),Un=new An,yi={},Mi=[];Object.entries(e.carModels||{}).forEach(([A,F])=>M.load(e.modelBase+F,U=>{vt(U.scene),js(U.scene);const $=U.scene.getObjectByName("WheelFL");yi[A]={scene:U.scene,radius:$?new Zn().setFromObject($).getSize(new I).y/2:.25}},void 0,U=>console.warn("3D map: could not load "+F,U)));const T=160,W={},ae={},ee=new Set;function j(A){A.updateMatrixWorld(!0);const F=new Map;A.traverse($=>{if(!$.isMesh)return;let z=$.geometry.index?$.geometry.toNonIndexed():$.geometry.clone();z.applyMatrix4($.matrixWorld),$.matrixWorld.determinant()<0&&Object.values(z.attributes).forEach(Y=>{for(let he=0;he<Y.count;he+=3)for(let be=0;be<Y.itemSize;be++){const Ie=Y.getComponent(he+1,be);Y.setComponent(he+1,be,Y.getComponent(he+2,be)),Y.setComponent(he+2,be,Ie)}}),Object.keys(z.attributes).forEach(Y=>{Y!=="position"&&Y!=="normal"&&Y!=="uv"&&Y!=="color"&&z.deleteAttribute(Y)}),z.attributes.normal||z.computeVertexNormals(),F.has($.material)||F.set($.material,[]),F.get($.material).push(z)});const U=[...F].map(([$,z])=>{["uv","color"].forEach(he=>{z.some(be=>!be.attributes[he])&&z.forEach(be=>be.deleteAttribute(he))}),/Paint$/.test($.name)&&($.userData.paint=$.color.clone(),$.color.set("#ffffff"));const Y=new fi(qi(z),x($),T);return Y.count=0,Y.castShadow=Y.receiveShadow=!0,Y.frustumCulled=!1,Y.userData.file=A.userData.file,Y.userData.prop=!0,l.add(Y),Y});return U.box=new Zn().setFromObject(A),U}function we(A){if(!ae[A]){ae[A]=!0;const[F,U]=A.split("#");M.load(e.modelBase+F,$=>{if(vt($.scene),U==="low"||U==="lawn"){const z=[],Y=U==="low"?/^(Crown|Trunk)/:/^Pit/;$.scene.traverse(he=>{Y.test(he.name)&&z.push(he)}),z.forEach(he=>he.parent&&he.parent.remove(he))}$.scene.traverse(z=>{z.isMesh&&z.material.name==="LampGlow"&&ee.add(z.material)}),At($.scene),W[A]=j($.scene)},void 0,$=>console.warn("3D map: could not load "+A,$))}return!!W[A]}const me=new I(li,li/Bn,li),He=new An,it=new I(0,1,0),Mt=new I;function It(A,F){Object.values(W).forEach(U=>U.forEach($=>{$.count=0})),(A||[]).forEach(U=>{const $=W[U.file];if(!(!$||$[0].count>=T)){if(He.setFromAxisAngle(it,U.rot||0),Lt.set(U.x,U.y===void 0?e.plazaY:U.y,U.z),Array.isArray(U.scale))at.compose(Lt,He,Mt.set(me.x*U.scale[0],me.y*U.scale[1],me.z*U.scale[2]));else if(U.scale)at.compose(Lt,He,Mt.copy(me).multiplyScalar(U.scale));else if(U.fit){const z=$.box,Y=U.fit.w/(z.max.x-z.min.x),he=U.fit.d/(z.max.z-z.min.z);Lt.x-=(z.min.x+z.max.x)/2*Y,Lt.z-=(z.min.z+z.max.z)/2*he,at.compose(Lt,He,Mt.set(Y,Y/Bn,he))}else at.compose(Lt,He,me);$.forEach(z=>{z.material.userData.paint&&z.setColorAt(z.count,U.tint?St.set(U.tint):z.material.userData.paint),z.setMatrixAt(z.count++,at)})}}),Object.values(W).forEach(U=>U.forEach($=>{$.instanceMatrix.needsUpdate=!0,$.instanceColor&&($.instanceColor.needsUpdate=!0),$.visible=$.count>0})),ee.forEach(U=>{U.emissive.set("#ffd9a0"),U.emissiveIntensity=F*2.5})}const je=1,Ht=1.1*Vs*je,qt=.16,Ut=.9,Je=1.2,$t=1,Be=1.12,kt={value:Ut},Ot=A=>A*A*(3-2*A),Yt={},Kt={},Rn=[],ti=new Map;function on(A){return Kt[A]||(Kt[A]=!0,M.load(e.modelBase+A,F=>{vt(F.scene);const U=[];F.scene.traverse($=>{if(!$.isMesh)return;$.frustumCulled=!1;const z=$.material.map||$.material.emissiveMap;$.material=new ms({map:z,emissiveMap:z,emissive:"#ffffff",emissiveIntensity:qt,roughness:.4,metalness:0,name:$.material.name}),$.material.onBeforeCompile=Y=>{Y.uniforms.characterRim=kt,Y.uniforms.characterSat={value:Je},Y.uniforms.characterBright={value:Be},Y.uniforms.characterFill={value:$t},Y.fragmentShader=Y.fragmentShader.replace("#include <common>",`#include <common>
uniform float characterRim, characterSat, characterFill, characterBright;`).replace("#include <map_fragment>",`#include <map_fragment>
              diffuseColor.rgb = max(mix(vec3(dot(diffuseColor.rgb, vec3(.2126, .7152, .0722))), diffuseColor.rgb, characterSat), 0.0) * characterBright;`).replace("#include <lights_fragment_end>",`#include <lights_fragment_end>
              reflectedLight.indirectDiffuse *= characterFill;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
              float rimFacing = 1.0 - abs(dot(normal, isOrthographic ? vec3(0.0, 0.0, 1.0) : normalize(vViewPosition)));
              totalEmissiveRadiance += diffuseColor.rgb * vec3(1.0, .93, .8) * pow(rimFacing, 3.0) * characterRim;`)},U.push($.material)}),Yt[A]={scene:F.scene,clips:F.animations,materials:U}},void 0,F=>console.warn("3D map: could not load "+A,F))),!!Yt[A]}function pn(A,F){let U=Rn[A];if(U&&U.file===F)return U;U&&l.remove(U.holder);const $=Yt[F],z=new mt,Y=x_($.scene);z.add(Y),z.scale.set(Vs*je,Vs*je/Bn,Vs*je),l.add(z);const he=new Q0(Y),be=Dt=>$.clips.find(oe=>Dt.test(oe.name)),Ie=he.clipAction(be(/^Idle/)),qe=he.clipAction(be(/^Walking$/));qe.timeScale=0,Ie.play(),qe.play();const xt=Dt=>Y.getObjectByName("mixamorig"+Dt);return Rn[A]={file:F,holder:z,mixer:he,idle:Ie,walk:qe,rig:S_(Y),hand:xt("RightHand"),fore:xt("RightForeArm"),carry:0}}const hi=64,Dn=1.05,un=new fi(k?k.bagGeometry():Au()[4].geometry,new Fn({vertexColors:!0}),hi);un.castShadow=!0,un.count=0,un.frustumCulled=!1,un.instanceMatrix.setUsage(35048),o.add(un);const mn=7,Mn=3.2,Xn=.32,hn=new I,Fs=new I,Vi=new I,Kn=new An,bi=new An,ne=new I,Q=new I,Ee=new tt,ye=new I(0,1,0);function Te(A,F,U){if(!A.hand||!A.fore||un.count>=hi)return;k&&un.geometry!==k.bagGeometry()&&(un.geometry=k.bagGeometry());const $=un.geometry;$.boundingBox||$.computeBoundingBox(),A.hand.updateWorldMatrix(!0,!1),hn.setFromMatrixPosition(A.hand.matrixWorld),Fs.setFromMatrixPosition(A.fore.matrixWorld),hn.addScaledVector(Fs.sub(hn).negate(),.32);const z=$.boundingBox.max.y*.94*Dn;let Y=A.sway;if((!Y||Math.hypot(hn.x-Y.px,hn.z-Y.pz)>.6)&&(Y=A.sway={px:hn.x,pz:hn.z,vx:0,vz:0,tx:0,tz:0,ox:0,oz:0}),U>0){const be=Math.min(U,.05),Ie=(hn.x-Y.px)/U,qe=(hn.z-Y.pz)/U,xt=(Ie-Y.vx)/U,Dt=(qe-Y.vz)/U;Y.ox+=(-mn*mn*Y.tx-Mn*Y.ox-xt/z*.5)*be,Y.oz+=(-mn*mn*Y.tz-Mn*Y.oz-Dt/z*.5)*be,Y.tx+=Y.ox*be,Y.tz+=Y.oz*be;const oe=Math.hypot(Y.tx,Y.tz);oe>Xn&&(Y.tx*=Xn/oe,Y.tz*=Xn/oe,Y.ox*=.5,Y.oz*=.5),Y.vx=Ie,Y.vz=qe}Y.px=hn.x,Y.pz=hn.z;const he=Math.hypot(Y.tx,Y.tz);he>1e-5?bi.setFromAxisAngle(ne.set(-Y.tz/he,0,Y.tx/he),he):bi.identity(),Kn.setFromAxisAngle(ye,F-Math.PI/2).premultiply(bi),Vi.set(0,-z,0).applyQuaternion(bi).add(hn),Q.setScalar(Dn),un.setMatrixAt(un.count++,Ee.compose(Vi,Kn,Q))}function Ne(A,F,U){Object.values(Yt).forEach(z=>z.materials.forEach(Y=>{Y.emissiveIntensity=qt*(1-U*.85)})),kt.value=Ut*(1-U*.7);const $=new Set;un.count=0,(A||[]).forEach((z,Y)=>{if(!Yt[z.file])return;const he=pn(Y,z.file),be=z.still?0:Math.max(0,Math.min(1,z.amount||0));he.holder.visible=!0,he.holder.position.set(z.x,z.y||0,z.z);let Ie,qe;const xt=be>.3?z.heading:z.look||z.heading;if(xt)Ie=xt.x,qe=xt.z;else{const Bt=(z.facing===void 0?.3:z.facing)>=0?.75:-.75;Ie=1+Bt,qe=1-Bt}const Dt=Math.atan2(Ie,qe),oe=ti.has(z.id)?ti.get(z.id):Dt;let Qe=Dt-oe;Qe-=Math.round(Qe/(2*Math.PI))*2*Math.PI;const ke=oe+Qe*Math.min(1,F*10);ti.set(z.id,ke),$.add(z.id),he.holder.rotation.y=ke;const pt=he.walk.getClip().duration;if(he.walk.time=((z.ground||0)/Ht%1+1)%1*pt,he.walk.setEffectiveWeight(be),he.idle.setEffectiveWeight(1-be),he.mixer.update(z.still?0:F),he.rig){const Bt=z.work&&z.work.role;he.rig.role!==Bt&&(he.rig.role=Bt,he.rig.weight=0),Bt&&(he.rig.weight=z.still?1:Math.min(1,he.rig.weight+F*2),C_(he.rig,Bt,z.work.clock,z.work.act,Ot(he.rig.weight)))}he.carry=z.bag?z.still?1:Math.min(1,he.carry+F*3):0,z.bag&&(L_(he.rig,be*Math.sin(he.walk.time/pt*2*Math.PI),Ot(he.carry)),Te(he,ke,z.still?0:F))}),un.instanceMatrix.needsUpdate=!0;for(let z=(A||[]).length;z<Rn.length;z++)Rn[z]&&(Rn[z].holder.visible=!1);ti.forEach((z,Y)=>{$.has(Y)||ti.delete(Y)})}const $e=()=>!!e.carModels&&Object.keys(e.carModels).every(A=>yi[A]);function Ze(A,F){const U=F.van?"van":"car",$=yi[U];let z=Mi[A];if(z&&z.kind===U&&z.paint===F.paint)return z;z&&l.remove(z.holder);const Y=new mt,he=$.scene.clone(!0);he.traverse(Ie=>{Ie.isMesh&&/Paint$/.test(Ie.material.name)&&(Ie.material=Ie.material.clone(),Ie.material.color.set(F.paint))}),Y.add(he),Y.scale.set(li,li/Bn,li),l.add(Y);const be=["WheelFL","WheelFR","WheelBL","WheelBR"].map(Ie=>he.getObjectByName(Ie)).filter(Boolean).map(Ie=>({w:Ie,rest:Ie.quaternion.clone()}));return Mi[A]={kind:U,paint:F.paint,holder:Y,wheels:be,radius:$.radius}}const at=new tt,Lt=new I,Et=new I,wt=new An,St=new st,sn=u.intensity,Jt=h.intensity,dn=new st("#2b3a48"),ni=a.clone();let kn=!1;s.addEventListener("webglcontextlost",A=>{A.preventDefault(),kn=!0}),s.addEventListener("webglcontextrestored",()=>{kn=!1});let ii=1;const gs=(A,F)=>{const U=F.geometry,$=U.attributes.position,z=U.attributes.uv,[Y,he,be,Ie]=A.uv;$.array.set(A.points),$.needsUpdate=!0,z.array.set([Y,he,be,he,be,Ie,Y,Ie]),z.needsUpdate=!0;const qe=F.material,xt=Tn(A.img),Dt=A.alpha<1;qe.map!==xt&&(qe.map||(qe.needsUpdate=!0),qe.map=xt),qe.transparent!==Dt&&(qe.transparent=Dt,qe.needsUpdate=!0),qe.opacity=A.alpha,qe.color.setScalar(ii),F.visible=!0};function oa(A,F){ii=1-F*.55,A.forEach((U,$)=>gs(U,qn($)));for(let U=A.length;U<ge.length;U++)ge[U].visible=!1}function ca(A,F){nn=performance.now(),Wt();const U=Math.min(A.dpr,2);t.getPixelRatio()!==U&&t.setPixelRatio(U);const $=t.getSize(new We);($.x!==A.width||$.y!==A.height)&&t.setSize(A.width,A.height,!1),nb(c,A);const z=A.lookAt||{x:0,z:0};h.target.position.set(z.x,0,z.z),h.position.copy(h.target.position).addScaledVector(f,120),h.target.updateMatrixWorld();const Y=A.night||0;return u.intensity=sn*(1-Y*.72),h.intensity=Jt*(1-Y*.9),o.background.copy(F).lerp(dn,Y),g.hazeColour.value.copy(o.background),Y}const N=xb(l),J=[],Me=new st,Ae={},ut=[g.hazeX.value.clone(),g.hazeZ.value.clone()];let ct=!1,bt=null;function Ue(A){if(A!==ct){if(ct=A,A){const F=new Set([l,u,h,h.target,N.group,...ge]);[...o.children,...l.children].forEach(U=>{!F.has(U)&&!U.userData.prop&&!U.userData.land&&U.visible&&(U.visible=!1,J.push(U))}),pe.forEach(U=>{U.visible=!1})}else J.forEach(F=>{F.visible=!0}),J.length=0,bt&&(bt.visible=!1),bt=null,g.hazeX.value.copy(ut[0]),g.hazeZ.value.copy(ut[1]);N.group.visible=A}}const Le=90,et=2,Rt=13;function ft(A,[F,U,$,z]){const Y=[];return A.forEach(([he,be,Ie,qe])=>{if(F>=be||U<=he||$>=qe||z<=Ie){Y.push([he,be,Ie,qe]);return}$>Ie&&Y.push([he,be,Ie,$]),z<qe&&Y.push([he,be,z,qe]);const xt=Math.max(Ie,$),Dt=Math.min(qe,z);F>he&&Y.push([he,F,xt,Dt]),U<be&&Y.push([U,be,xt,Dt])}),Y}function gt(A){const F=new mt,[U,$,z,Y]=A.plot,he=(U+$)/2,be=(z+Y)/2,Ie=Le;F.userData.land=!0;let qe=ft([[he-Ie,he+Ie,be-Ie,be+Ie]],A.plot);const xt=A.strips||[],Dt=xt.map(Qe=>[Qe.x0===void 0?he-Ie:Qe.x0,Qe.x1===void 0?he+Ie:Qe.x1,Qe.z0===void 0?be-Ie:Qe.z0,Qe.z1===void 0?be+Ie:Qe.z1]);Dt.forEach(Qe=>{qe=ft(qe,Qe)}),qe.forEach(([Qe,ke,pt,Bt])=>v(F,Qe,ke,A.y-1.2,A.y,pt,Bt,A.colour,{cast:!1})),xt.forEach((Qe,ke)=>ft([Dt[ke]],A.plot).forEach(([pt,Bt,Ft,En])=>v(F,pt,Bt,A.y-1.2,Qe.y,Ft,En,Qe.colour,{cast:!1})));const oe=[];if(A.trees){let Qe=7;const ke=()=>(Qe=Qe*16807%2147483647)/2147483647;for(let pt=0;pt<64;pt++){const Bt=pt%4,Ft=Bt===1||Bt===3,En=ke(),zt=Ft?7.5+ke()*4:2+ke()*8,Nt=Bt===0?U-zt:Bt===1?$+zt:U-8+En*($-U+16),On=Bt===2?z-zt:Bt===3?Y+zt:z-8+En*(Y-z+16);Nt>U-1.5&&Nt<$+1.5&&On>z-1.5&&On<Y+1.5||Nt>$&&On>Y-4||On>Y&&Nt>$-4||Dt.some(([bs,_s,Pr,xs])=>Nt>bs-1.6&&Nt<_s+1.6&&On>Pr-1.6&&On<xs+1.6)||oe.push({file:pt%3?"tree.glb#lawn":"street_tree.glb#lawn",x:Nt,y:A.y,z:On,rot:ke()*6.28,scale:(Ft?.6:.75)+ke()*.35})}}if(A.town){const Qe=["building_rowhouse_terracotta","building_townhouse_sage","building_low_stone","building_mid_stone","building_apartment_brick","building_shop_narrow","building_low_tan","building_corner"];let ke=0;for(let pt=U+4;pt<$+4;pt+=10.5)oe.push({file:Qe[ke++%Qe.length]+".glb",x:pt,y:A.y,z:z-6.5,rot:0});for(let pt=z+2;pt<Y+2;pt+=10.5)oe.push({file:Qe[ke++%Qe.length]+".glb",x:U-6.5,y:A.y,z:pt,rot:Math.PI/2});oe.push({file:"building_corner.glb",x:U-6.5,y:A.y,z:z-6.5,rot:Math.PI/4})}return F.userData.props=oe,F.userData.haze=[new ln(U-et,U-Rt,$+et,$+Rt),new ln(z-et,z-Rt,Y+et,Y+Rt)],l.add(F),F}function Zt(A){if(kn)return!1;Ue(!0);const F=A.land?Ae[A.landKey]||(Ae[A.landKey]=gt(A.land)):null;F!==bt&&(bt&&(bt.visible=!1),bt=F,bt&&(bt.visible=!0,g.hazeX.value.copy(bt.userData.haze[0]),g.hazeZ.value.copy(bt.userData.haze[1])));const U=ca(A,bt?ni:Me.set(A.background));N.update(A.branch,U);const $=(A.branch.props||[]).concat(bt?bt.userData.props:[]);$.forEach(he=>we(he.file)),It($,U),oa(A.figures||[],U);const z=performance.now(),Y=Math.min(.1,(z-(xe||z))/1e3);return xe=z,Ne(A.characters,Y,U),A.dry||t.render(o,c),!0}function In(A){if(kn)return!1;Ue(!1);const F=ca(A,ni),U=performance.now(),$=Math.min(.1,(U-(xe||U))/1e3);xe=U;let z=!1;A.stations.forEach((oe,Qe)=>{const ke=rt(Qe),{body:pt,top:Bt}=ke.userData;if(ke.visible=oe.visible!==!1,!ke.visible)return;const Ft=oe.index+"."+Math.max(1,oe.tier);oe.built&&(R(Ft),R(oe.index+".3"));const En=_t[Ft]?Ft:oe.index+".3",zt=oe.ghost?En+"|ghost":En,Nt=oe.built&&oe.index!==void 0&&_t[En],On=ke.userData.clones||(ke.userData.clones={}),bs=ke.userData.rigs||(ke.userData.rigs={});Nt&&!On[zt]&&(ke.add(On[zt]=Nt.clone()),oe.ghost?On[zt].traverse(Qi=>{Qi.isMesh&&(Qi.material=Ke,Qi.castShadow=!1,Qi.receiveShadow=!1)}):bs[zt]=Tb(On[zt],oe.index)),Nt&&bs[zt]&&Cb(bs[zt],oe,$),Object.entries(On).forEach(([Qi,Ru])=>{Ru.visible=!!Nt&&Qi===zt}),pt.visible=!Nt;const _s=oe.built?oe.h:.12,Pr=oe.rise?-oe.rise*oe.rise*1.1:0;ke.position.set(oe.x,oe.y+Pr,oe.z);const xs=oe.pop===void 0?1:oe.pop,Lr=xs-1,Tu=xs>=1?1:1+2.4*Lr*Lr*Lr+1.4*Lr*Lr;if(ke.scale.setScalar(Math.max(.001,Tu)),xs<=0&&(ke.visible=!1),pt.scale.set(oe.w,_s,oe.d),Bt.visible=oe.built&&!Nt,Bt.position.y=_s,Bt.scale.set(oe.w+.12,.08,oe.d+.12),pt.material=m(oe.built?fe[Math.min(3,oe.tier)]:"#e3b04b"),oe.selected&&!z&&xs>=1){z=!0,te.position.set(oe.x,oe.y+.03,oe.z);const Qi=Math.max(oe.w,oe.d)*.72;te.scale.set(Qi,1,Qi)}});for(let oe=A.stations.length;oe<Ce.length;oe++)Ce[oe]&&(Ce[oe].visible=!1);te.visible=z;let Y=0;const he=(A.time||0)/1e3;A.stations.forEach(oe=>{if(!(oe.boost>0)||oe.visible===!1||oe.pop!==void 0&&oe.pop<1)return;const{pool:Qe,ring:ke}=ot(Y++),pt=Math.max(oe.w,oe.d)*.75,Bt=.5+.5*Math.sin(he*3.2),Ft=he*.7%1;Qe.visible=ke.visible=!0,Qe.position.set(oe.x,oe.y+.025,oe.z),Qe.scale.set(pt*3.8,1,pt*3.8),Qe.material.opacity=.38+.25*Bt,ke.position.set(oe.x,oe.y+.05+Ft*1.4,oe.z),ke.scale.set(pt*(.9+Ft*.35),1,pt*(.9+Ft*.35)),ke.material.opacity=.7*(1-Ft)});for(let oe=Y;oe<_e.length;oe++)_e[oe].pool.visible=_e[oe].ring.visible=!1;const be=A.figures||[],Ie=1-F*.55;oa(be,F),$n.forEach(oe=>{oe.visible=!!oe.userData.ready&&!(oe.userData.model&&H[oe.userData.model]),oe.material.color.setScalar(Ie)}),Ln.forEach(oe=>{oe.visible=oe.userData.ready&&(oe.userData.show!=="loungeOpen"||!!A.loungeOpen)});const qe=JSON.stringify(A.ropes||[]);qe!==Hi&&(Hi=qe,ci(A.ropes||[]));const xt=A.backdrops||[];xt.forEach((oe,Qe)=>gs(oe,Nn(Qe)));for(let oe=xt.length;oe<pe.length;oe++)pe[oe].visible=!1;X.forEach(oe=>{oe.visible=!W[oe.userData.model],oe.renderOrder=A.backdrops?-2:0,oe.material.colorWrite=!A.backdrops}),Re.material.colorWrite=Re.material.depthWrite=!A.figures,_.forEach((oe,Qe)=>{Qe.endsWith('{"name":"street"}')&&(oe.colorWrite=oe.depthWrite=!A.figures)}),Re.count=Math.min(Ah,A.people.length);for(let oe=0;oe<Re.count;oe++){const Qe=A.people[oe];Lt.set(Qe.x,Qe.y||0,Qe.z),Et.set(1,1,1),at.compose(Lt,wt.identity(),Et),Re.setMatrixAt(oe,at),Re.setColorAt(oe,St.set(Qe.colour))}Re.instanceMatrix.needsUpdate=!0,Re.instanceColor&&(Re.instanceColor.needsUpdate=!0),It(A.props,F),Ne(A.characters,$,F),tn.forEach(oe=>{oe.emissiveIntensity=.16+F*.7}),Ct.forEach(oe=>{oe.emissiveIntensity=.35+F*.55}),Object.entries(ht).forEach(([oe,Qe])=>an(Qe,A.menus?A.menus[oe]:null,A.menuClock||0)),D.forEach(oe=>{oe.visible=!W["street_lamp.glb"]});const Dt=$e();A.cars.forEach((oe,Qe)=>{if(!Dt)return;const ke=Ze(Qe,oe),pt=oe.along==="x";ke.holder.visible=!0,ke.holder.position.set(oe.x,e.streetY,oe.z),ke.holder.rotation.y=pt?oe.dir>0?0:Math.PI:oe.dir>0?-Math.PI/2:Math.PI/2,Un.setFromAxisAngle(Fi,-oe.roll/(ke.radius*li)),ke.wheels.forEach(({w:Bt,rest:Ft})=>Bt.quaternion.multiplyQuaternions(Un,Ft))});for(let oe=Dt?A.cars.length:0;oe<Mi.length;oe++)Mi[oe]&&(Mi[oe].holder.visible=!1);ei.count=bn.count=Dt?0:Math.min(lc,A.cars.length);for(let oe=0;oe<ei.count;oe++){const Qe=A.cars[oe],ke=Qe.along==="x",pt=Qe.van,Bt=pt?4.6:4,Ft=1.8;Lt.set(Qe.x,e.streetY+.25,Qe.z),Et.set(ke?Bt:Ft,pt?1.7:.75,ke?Ft:Bt),ei.setMatrixAt(oe,at.compose(Lt,wt.identity(),Et)),ei.setColorAt(oe,St.set(Qe.paint)),Lt.y+=pt?1.7:.75,Et.set(ke?pt?1.4:2.1:Ft*.86,pt?.05:.55,ke?Ft*.86:pt?1.4:2.1),bn.setMatrixAt(oe,at.compose(Lt,wt.identity(),Et))}return[ei,bn].forEach(oe=>{oe.instanceMatrix.needsUpdate=!0,oe.instanceColor&&(oe.instanceColor.needsUpdate=!0)}),k&&A.cargo&&k.update(A.cargo,A.fixtures),le&&le.update(A),K&&K.update(A),Z&&Z.update(A),Object.entries(H).forEach(([oe,Qe])=>{Qe.visible=!!(A.fixtures&&A.fixtures[oe])}),nt(A),Gt(A),A.dry||t.render(o,c),!0}function si(A){const F=t.info,U=new Set,$=new Set,z={};let Y=0,he=0;o.traverse(ke=>{if(!ke.isMesh)return;Y++;let pt=!0,Bt=null;for(let Ft=ke;Ft;Ft=Ft.parent)Ft.visible||(pt=!1),!Bt&&Ft.userData.file&&(Bt=Ft.userData.file);if(pt&&(he++,A)){const Ft=z[Bt||"(code)"]=z[Bt||"(code)"]||{meshes:0,triangles:0},En=ke.geometry;Ft.meshes++,Ft.triangles+=(En.index?En.index.count:En.attributes.position.count)/3*(ke.isInstancedMesh?ke.count:1)}U.add(ke.geometry),(Array.isArray(ke.material)?ke.material:[ke.material]).forEach(Ft=>{for(const En in Ft)Ft[En]&&Ft[En].isTexture&&$.add(Ft[En].source)})});let be=0,Ie=0;U.forEach(ke=>{Object.values(ke.attributes).forEach(pt=>{be+=pt.array.byteLength}),ke.index&&(be+=ke.index.array.byteLength)}),o.traverse(ke=>{ke.isInstancedMesh&&(be+=ke.instanceMatrix.array.byteLength+(ke.instanceColor?ke.instanceColor.array.byteLength:0))}),$.forEach(ke=>{const pt=ke.data;pt&&pt.width&&(Ie+=pt.width*pt.height*4*4/3)});const qe=t.getDrawingBufferSize(new We),xt=h.shadow.mapSize,Dt=qe.x*qe.y*4*(t.getContext().getContextAttributes().antialias?9:2),oe=t.shadowMap.enabled?xt.x*xt.y*8:0,Qe=ke=>Math.round(ke/1048576*10)/10;return{calls:F.render.calls,triangles:F.render.triangles,meshes:Y,visible:he,programs:F.programs?F.programs.length:0,geometries:F.memory.geometries,textures:F.memory.textures,pixelRatio:t.getPixelRatio(),buffer:qe.x+"x"+qe.y,mb:{geometry:Qe(be),texture:Qe(Ie),buffer:Qe(Dt),shadow:Qe(oe),total:Qe(be+Ie+Dt+oe)},...A?{models:z}:{}}}return{render:In,renderBranch:Zt,carsModelled:$e,propReady:we,characterReady:on,hasFixture:A=>!!H[A],stationPicture:re,loungePicture:Fe,fixturePicture:Tt,stats:si,get ok(){return!kn},get loading(){return n+G.length},dispose(){cancelAnimationFrame(O),G.length=0,t.dispose(),_.forEach(A=>A.dispose())}}}function I_(s,e,{box:t,span:n,material:i,textured:r,lampStandIns:a}){const{roads:o,roadWidth:c,plazaY:l,streetY:u,extent:h}=e,d=e.holes||[],f=(E,v,M,P,G,O,q,ie)=>{let D=[[E,v,G,O]];d.forEach(X=>{D=D.flatMap(([k,le,K,Z])=>{if(X.x0>=le||X.x1<=k||X.z0>=Z||X.z1<=K)return[[k,le,K,Z]];const xe=Math.max(k,X.x0),Ce=Math.min(le,X.x1);return[[k,xe,K,Z],[Ce,le,K,Z],[xe,Ce,K,Math.max(K,X.z0)],[xe,Ce,Math.min(Z,X.z1),Z]].filter(([te,fe,De,_e])=>fe-te>1e-6&&_e-De>1e-6)})}),D.forEach(([X,k,le,K])=>r(n(s,X,k,M,P,le,K,q,{cast:!1}),ie))};f(-h,h,u-.4,u,-h,h,e.colours.asphalt,"asphalt");const g=E=>{const v=o.filter(G=>G.along===E).map(G=>G.at).sort((G,O)=>G-O),M=[];let P=-h;return v.forEach(G=>{M.push([P,G-c/2]),P=G+c/2}),M.push([P,h]),M},_=g("x");g("z").forEach(([E,v])=>_.forEach(([M,P])=>f(E,v,u,l,M,P,e.colours.paver,"sidewalk")));const p={};(e.marks||[]).forEach(E=>(p[E.colour]=p[E.colour]||[]).push(E));const x=new tt,y=new I,b=new I,L=new An;Object.entries(p).forEach(([E,v])=>{const M=/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/.exec(E),P=M?i("#"+[1,2,3].map(O=>(+M[O]).toString(16).padStart(2,"0")).join(""),{transparent:!0,opacity:+M[4],depthWrite:!1}):i(E),G=new fi(new yn(1,1,1).translate(0,.5,0),P,v.length);v.forEach((O,q)=>G.setMatrixAt(q,x.compose(y.set((O.x0+O.x1)/2,O.h?O.y:O.y-.004,(O.z0+O.z1)/2),L,b.set(O.x1-O.x0,O.h||.012,O.z1-O.z0)))),G.receiveShadow=!0,s.add(G)});const w=[];e.buildings.forEach(E=>{const v=n(s,E.x0,E.x1,l,E.h,E.z0,E.z1,E.wall,{opts:{name:"terrace"}}),M=n(s,E.x0-.15,E.x1+.15,E.h,E.h+.35,E.z0-.15,E.z1+.15,E.roof,{opts:{name:"terrace"}});v.userData.model=M.userData.model=E.model,w.push(v,M)}),s.add(D_(e.silhouettes||[],l,i));const C=new Ai(1.6,1);return e.trees.forEach(([E,v])=>{t(s,E,l,v,.35,2.2,.35,"#7a5a3e",{opts:{name:"street"}});const M=new Ve(C,i("#7fa35a",{name:"street"}));M.position.set(E,l+3.6,v),M.scale.set(1,.8,1),M.castShadow=M.receiveShadow=!0,s.add(M)}),e.lamps.forEach(([E,v])=>{a.push(t(s,E,l,v,.18,4.4,.18,"#3b4a43",{opts:{name:"street"}})),a.push(t(s,E,l+4.3,v,.5,.3,.5,"#f1e3b6",{opts:{name:"street"}}))}),w}function D_(s,e,t){const n=[],i=[],r=[],a=new st,o=new st,c=new st("#e6dcc6"),l=(m,p,x,y,b,L)=>{[m,p,x,m,x,y].forEach(w=>{n.push(...w),i.push(...b),r.push(L.r,L.g,L.b)})},u=(m,p,x,y,b,L,w)=>{l([m,y,L],[p,y,L],[p,y,b],[m,y,b],[0,1,0],w),l([m,x,L],[p,x,L],[p,y,L],[m,y,L],[0,0,1],w),l([p,x,L],[p,x,b],[p,y,b],[p,y,L],[1,0,0],w),l([p,x,b],[m,x,b],[m,y,b],[p,y,b],[0,0,-1],w),l([m,x,b],[m,x,L],[m,y,L],[m,y,b],[-1,0,0],w)},h=1.69/Bn,d=2.75*h,f=2.45*h;s.forEach(m=>{a.set(m.colour).convertSRGBToLinear(),o.copy(a).multiplyScalar(.62);const p=e+d+(m.storeys-1)*f+.35*h;u(m.x0,m.x1,e,p,m.z0,m.z1,a),u(m.x0-.12,m.x1+.12,p,p+.3,m.z0-.12,m.z1+.12,c);for(let x=0;x<m.storeys;x++){const y=e+(x?d+(x-1)*f:0)+(x?.9:.5)*h,b=y+(x?1.1:1.7)*h;l([m.x0+.5,y,m.z1+.03],[m.x1-.5,y,m.z1+.03],[m.x1-.5,b,m.z1+.03],[m.x0+.5,b,m.z1+.03],[0,0,1],o),l([m.x1+.03,y,m.z1-.5],[m.x1+.03,y,m.z0+.5],[m.x1+.03,b,m.z0+.5],[m.x1+.03,b,m.z1-.5],[1,0,0],o)}});const g=new Sn;g.setAttribute("position",new Qt(n,3)),g.setAttribute("normal",new Qt(i,3)),g.setAttribute("color",new Qt(r,3));const _=new Ve(g,t("#ffffff",{vertexColors:!0,name:"silhouette"}));return _.receiveShadow=!0,_.castShadow=!1,_}function F_(s,e,{box:t,span:n,material:i,textured:r,model:a}){const o=new mt;s.add(o),e.floors.forEach((L,w)=>{const C=(L.x||0)-L.w/2,E=(L.x||0)+L.w/2,v=L.z-L.d/2,M=L.z+L.d/2;r(n(o,C,E,L.y-(w?.32:.02),L.y,v,M,w===2?"#e9e4d8":w?"#e4ddcc":"#c9965f",{cast:w>0}),["herringbone","timber","concrete"][w]),w&&(n(o,C,E,L.y,L.y+1.05,M-.06,M,"#c9a35a",{opts:{transparent:!0,opacity:.55}}),(w===1?[C+.3,E-.3]:[C+.3,0,E-.3]).forEach(P=>t(o,P,e.floors[w-1].y,M-.3,.3,L.y-e.floors[w-1].y-.32,.3,"#33372f")))});const c=(L,w,C,E,v,M,P,G,O,q)=>{const ie=[];for(let X=0;X<=48;X++){const k=X/48,le=v+(M-v)*k;ie.push(new I(w+Math.cos(le)*E,(P+(G-P)*k)*Bn,C+Math.sin(le)*E))}const D=new Ve(new Ar(new co(ie),96,O,8,!1),i(q));D.castShadow=!0,L.add(D)},l=(L,w,C,E,v,M)=>{const P=new mt,G=new mt;G.scale.y=1/Bn,P.add(G),o.add(P),a("spiral_stair.glb",L,C,w,()=>{P.visible=!1});const O=1.15,q=Math.PI*24/180,ie=(E-C)/v,D=K=>M+(v-1-K)*q;t(P,L,C,w,.26,E-C+1,.26,"#1f5a3c"),t(P,L,C,w,.56,.06,.56,"#d0a54e",{cast:!1});const X=new Ve(new Ti(.13,16,10),i("#d0a54e"));X.position.set(L,E+1.05,w),X.castShadow=!0,P.add(X);for(let K=0;K<v-1;K++){const Z=D(K),xe=C+ie*(K+1),Ce=q*1.04,te=new Ve(new wn(O,O,.08,6,1,!1,Math.PI/2-Z-Ce/2,Ce),i("#d9a768"));te.position.set(L,xe-.04,w),te.castShadow=te.receiveShadow=!0,P.add(te);const fe=Z-q/2;t(P,L+Math.cos(fe)*(O-.06),xe,w+Math.sin(fe)*(O-.06),.05,.95,.05,"#1f5a3c",{cast:!1})}const k=D(0)+q/2,le=D(v-2)-q/2;c(G,L,w,O-.06,k,le,C+1,E-ie+1,.05,"#d0a54e"),c(G,L,w,O-.02,k,le,C+ie-.14,E-.14,.09,"#1f5a3c")},[,u,h]=e.floors,d=-Math.PI/2,f=(L,w,C,E,v)=>n(o,L,w,v,v+1.05,C,E,"#c9a35a",{opts:{transparent:!0,opacity:.55}});l(10.2,.35,0,u.y,14,d),r(n(o,8.93,11.35,u.y-.32,u.y,-2.8,-.8,"#e4ddcc",{cast:!0}),"timber"),f(11.29,11.35,-2.8,-.8,u.y),l(7.75,-4.4,u.y,h.y,14,d),r(n(o,6.45,9,h.y-.32,h.y,-6.9,-5.55,"#e9e4d8",{cast:!0}),"concrete"),f(8.94,9,-6.9,-5.55,h.y);const g=(L,w,C,E)=>f(L-.03,L+.03,w,C,E),_=(L,w,C,E)=>f(L,w,C-.03,C+.03,E),m=u.z-u.d/2,p=u.z+u.d/2,x=h.z-h.d/2,y=h.z+h.d/2;g(-u.w/2+.03,m+3.5,p-.06,u.y),g(u.w/2-.03,m,-2.8,u.y),g(u.w/2-.03,-.8,p-.06,u.y),_(9,11.35,-2.77,u.y),_(9,9.6,-.83,u.y),_(10.8,11.35,-.83,u.y),g(-h.w/2+.03,x+3.5,y-.06,h.y),g(h.w/2-.03,-5.55,y-.06,h.y),_(h.w/2,7.15,-5.58,h.y),_(8.35,9,-5.58,h.y);const b=e.marquee;e.wallFaces||(n(o,b.x-.13,b.x+.13,0,.9,b.zRear,b.zFront,"#1f6b47"),n(o,b.x-.04,b.x+.04,.9,b.y0,b.zRear,b.zFront,"#cfe3dc",{cast:!1,opts:{transparent:!0,opacity:.35}}),n(o,b.x-.16,b.x+.16,b.y0,b.y1,b.zRear,b.zFront,"#1f6b47"),[b.zRear,b.zFront].forEach(L=>t(o,b.x,0,L,.34,b.y1,.34,"#174f36")))}function N_(s,e,t,{box:n,material:i}){if(!t)return null;const r=Bn,a=t.bore/2,o=new ms({color:"#cfeee2",emissive:"#2f5a4a",emissiveIntensity:.25,roughness:.08,metalness:0,transparent:!0,opacity:.46,depthWrite:!1}),c=new ms({color:"#d0a54e",roughness:.3,metalness:.9}),l=(E,v,M)=>E.map((P,G)=>P+(v[G]-P)*M);function u(E){const v=[E[0]],M=.48;for(let P=1;P<E.length-1;P++){const G=E[P-1],O=E[P],q=E[P+1],ie=l(O,G,Math.min(.4,M/Math.hypot(...G.map((X,k)=>X-O[k])))),D=l(O,q,Math.min(.4,M/Math.hypot(...q.map((X,k)=>X-O[k]))));v.push(ie);for(let X=1;X<=8;X++){const k=X/8;v.push(ie.map((le,K)=>(1-k)*(1-k)*le+2*(1-k)*k*O[K]+k*k*D[K]))}}return v.push(E[E.length-1]),v}const h=E=>new I(E[0],E[1]*r,E[2]),d=(E,v,M,P,G)=>{const O=new Ve(new ho(M,P,10,32),G);return O.position.copy(h(E)),O.lookAt(O.position.clone().add(v)),O.castShadow=!0,s.add(O),O},f=t.tubes.map(E=>{const v=u(E.points),M=new su;for(let D=1;D<v.length;D++)M.add(new eu(h(v[D-1]),h(v[D])));const P=new Ve(new Ar(M,Math.max(24,v.length*3),a,18,!1),o);P.renderOrder=3,s.add(P);const G=[P];[[E.points[0],E.points[1]],[E.points[E.points.length-1],E.points[E.points.length-2]]].forEach(([D,X],k)=>{(k===0?E.noCap0:E.noCap1)||G.push(d(D,h(D).sub(h(X)).normalize(),a+.02,.07,c))}),(E.floorRings||[]).forEach(D=>G.push(d(D,new I(0,1,0),a+.1,.08,c)));const q=[];let ie=0;for(let D=1;D<v.length;D++){const X=Math.hypot(v[D][0]-v[D-1][0],v[D][1]-v[D-1][1],v[D][2]-v[D-1][2]);q.push({a:v[D-1],b:v[D],len:X}),ie+=X}return{tube:E,segments:q,total:ie,parts:G}}),g=new mt;e.add(g);const _=t.belts.map(E=>{const v=Math.abs(E.x2-E.x1),M=(E.x1+E.x2)/2;return[E.x1,E.x2].forEach(P=>n(g,P-Math.sign(E.x2-E.x1)*.25*(P===E.x1?-1:1),E.floor,E.z,.12,E.height-.1,.5,"#344a40")),n(g,M,E.floor+E.height-.18,E.z,v,.16,E.width,"#536c5b"),n(g,M,E.floor+E.height-.02,E.z,v-.1,.04,E.width-.2,"#2a4035",{cast:!1}),E}),m=Au(),p=m.map(E=>{const v=new fi(E.geometry,new Fn({vertexColors:!0}),32);return v.castShadow=!0,v.count=0,v.renderOrder=2,v.frustumCulled=!1,v.instanceMatrix.setUsage(35048),s.add(v),v}),x=new tt,y=new An,b=new I(0,1,0),L=new I,w=new I(1,1,1);function C(E,v,M,P,G){const O=Math.min(P,m.length-1),q=p[O];q.count>=32||(y.setFromAxisAngle(b,G),q.setMatrixAt(q.count++,x.compose(L.set(E,v*r,M),y,w)))}return{bagGeometry:()=>m[4].geometry,loadModels(E,v){E.load(v+"conveyor_parts.glb",M=>{const P=D=>{const X=M.scene.getObjectByName(D);return X&&X.position.set(0,0,0),X},G=P("Section"),O=P("End"),q=P("Leg");if(!G||!O||!q)return;const ie=(D,X,k,le,K,Z,xe)=>{const Ce=new mt,te=D.clone();te.traverse(fe=>{fe.isMesh&&(fe.castShadow=!0,fe.receiveShadow=!0)}),Ce.add(te),Ce.scale.set(1.69*K,1.69*Z/r,1.69),Ce.position.set(X,k,le),xe&&(Ce.rotation.y=xe),e.add(Ce)};_.forEach(D=>{const X=Math.min(D.x1,D.x2),k=Math.max(D.x1,D.x2),le=k-X,K=Math.max(1,Math.round(le)),Z=D.floor+D.height;for(let Ce=0;Ce<K;Ce++)ie(G,X+(Ce+.5)*le/K,Z,D.z,le/K,1);ie(O,k,Z,D.z,1,1),ie(O,X,Z,D.z,1,1,Math.PI),[X+.25,k-.25].concat(le>5?[(X+k)/2]:[]).forEach(Ce=>ie(q,Ce,D.floor,D.z,1,(D.height-.18)/.87))}),g.visible=!1},void 0,M=>console.warn("3D map: could not load conveyor_parts.glb",M)),E.load(v+"cargo_items.glb",M=>{M.scene.updateMatrixWorld(!0),m.forEach((P,G)=>{const O=M.scene.getObjectByName("Cargo"+G);if(!O)return;const q=O.matrixWorld.clone().invert().premultiply(new tt().makeScale(1.69,1.69,1.69)),ie=[];if(O.traverse(X=>{if(!X.isMesh)return;const k=X.geometry.clone().applyMatrix4(new tt().multiplyMatrices(q,X.matrixWorld)),le=X.material.color,K=k.attributes.position.count,Z=new Float32Array(K*3);for(let xe=0;xe<K;xe++)Z[xe*3]=le.r,Z[xe*3+1]=le.g,Z[xe*3+2]=le.b;k.setAttribute("color",new fn(Z,3)),Object.keys(k.attributes).forEach(xe=>{["position","normal","color"].includes(xe)||k.deleteAttribute(xe)}),ie.push(k.index?k.toNonIndexed():k)}),!ie.length)return;const D=qi(ie);D.computeBoundingBox(),p[G].geometry.dispose(),p[G].geometry=D,P.geometry=D,P.height=D.boundingBox.max.y})},void 0,M=>console.warn("3D map: could not load cargo_items.glb",M))},update({odo:E,running:v},M={}){p.forEach(P=>{P.count=0}),f.forEach(({tube:P,segments:G,total:O,parts:q})=>{const ie=!P.fixture||!!M[P.fixture];if(q.forEach(Z=>{Z.visible=ie}),!ie)return;const D=P.window?P.window.total:O,X=P.window?P.window.offset:0,k=Math.max(2,Math.round(D/t.gap)),le=D/k,K=v[P.stage]?E:0;for(let Z=0;Z<k;Z++){let xe=(K+Z*le)%D-X;if(!(xe<0||xe>=O))for(const Ce of G){if(xe>Ce.len){xe-=Ce.len;continue}const te=l(Ce.a,Ce.b,xe/Ce.len);C(te[0],te[1]-m[P.cargoStage].height/2/r,te[2],P.cargoStage,Z*2.1);break}}}),_.forEach(P=>{const G=Math.abs(P.x2-P.x1),O=Math.max(2,Math.round(G/t.gap)),q=v[P.stage]?E:0,ie=Math.sign(P.x2-P.x1);for(let D=0;D<O;D++)C(P.x1+ie*((q+D*G/O)%G),P.floor+P.height+.02,P.z,P.stage,D*2.1)}),p.forEach(P=>{P.instanceMatrix.needsUpdate=!0})}}}function Au(){const s=[],e=(a,o,c=0,l=0,u=0,{sx:h=1,sy:d=1,sz:f=1,rx:g=0,ry:_=0,rz:m=0}={})=>{const p=a.index?a.toNonIndexed():a;p.deleteAttribute("uv"),p.scale(h,d,f),p.rotateX(g),p.rotateZ(m),p.rotateY(_),p.translate(c,l,u);const x=new st(o),y=p.attributes.position.count,b=new Float32Array(y*3);for(let L=0;L<y;L++)b[L*3]=x.r,b[L*3+1]=x.g,b[L*3+2]=x.b;p.setAttribute("color",new fn(b,3)),s.push(p)},t=()=>{const a=qi(s.splice(0));return a.computeBoundingBox(),{geometry:a,height:a.boundingBox.max.y}},n=(a,o,c,l,u,h=.5)=>e(new Ti(1,7,4),a,Math.cos(o)*c,l,-Math.sin(o)*c,{sx:u,sy:u*.16,sz:u*.38,rz:h,ry:o}),i=(a,o)=>{e(new wn(a,a*.78,o,12),"#b8673f",0,o/2),e(new wn(a*1.08,a*1.08,o*.18,12),"#c97a50",0,o*.91),e(new wn(a*.92,a*.92,.012,12),"#4a3424",0,o*.97)},r=[];return i(.1,.13),e(new wn(.012,.014,.14,5),"#5b8a3c",0,.2),[[0,.22],[Math.PI,.23],[Math.PI/2,.28],[-Math.PI/2,.29]].forEach(([a,o],c)=>n(c<2?"#7fb552":"#a6d073",a,.06,o,.065)),r.push(t()),i(.12,.15),e(new wn(.016,.02,.34,6),"#4f7a35",0,.32),[.24,.32,.4].forEach((a,o)=>{for(let c=0;c<5;c++){const l=c*1.257+o*.6,u=.1-o*.02;n(o%2?"#4f8a3a":"#3f7a33",l,u,a,.1-o*.015,.35)}}),[[0,.47,0,.07],[.07,.4,.03,.05],[-.06,.41,-.04,.05]].forEach(([a,o,c,l])=>{e(new Ai(l,1),"#9fc06c",a,o,c,{sy:1.7}),e(new Ai(l*.45,0),"#d99a55",a+l*.4,o+l*.5,c+l*.3)}),r.push(t()),e(new yn(.42,.03,.3),"#c9a46a",0,.015),[[-.1,.04,"#86a85c"],[.1,-.03,"#7a9c52"],[0,.02,"#93b465"]].forEach(([a,o,c],l)=>{const u=l===2?.095:.085,h=.03+u*1.1+(l===2?.04:0);e(new Ai(u,1),c,a,h,o,{sy:1.25,ry:l}),e(new Ai(u*.3,0),"#d68f4a",a+u*.55,h+u*.4,o+u*.4),e(new Ai(u*.25,0),"#e0a560",a-u*.4,h+u*.7,o-u*.5)}),r.push(t()),e(new wn(.13,.13,.3,14),"#a9cdb3",0,.15),e(new wn(.14,.14,.07,14),"#d2b25e",0,.335),e(new yn(.14,.12,.02),"#f3efda",0,.14,.125),r.push(t()),e(new yn(.32,.38,.2),"#d9bd88",0,.19),e(new yn(.33,.05,.21),"#bf9f68",0,.36),[-.06,.06].forEach(a=>e(new ho(.07,.01,5,10,Math.PI),"#8a6e44",0,.385,a)),e(new yn(.16,.14,.01),"#496f50",0,.2,.101),e(new yn(.06,.06,.01),"#e7dcbc",0,.2,.106),r.push(t()),e(new yn(.38,.26,.3),"#c49a5e",0,.13),e(new yn(.08,.012,.31),"#e6d6ad",0,.262),[-1,1].forEach(a=>e(new yn(.08,.12,.01),"#e6d6ad",0,.2,a*.151)),e(new yn(.12,.09,.01),"#496f50",.1,.13,.152),r.push(t()),r}export{U_ as createMap3D};
