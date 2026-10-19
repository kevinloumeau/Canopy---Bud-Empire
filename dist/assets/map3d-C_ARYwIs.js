/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ro="attached",th="detached";const Ot="srgb",Cn="srgb-linear",Qs="linear",Wt="srgb";const Co="300 es";class Er{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const _n=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Po=1234567;const qr=Math.PI/180,xr=180/Math.PI;function ni(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(_n[r&255]+_n[r>>8&255]+_n[r>>16&255]+_n[r>>24&255]+"-"+_n[e&255]+_n[e>>8&255]+"-"+_n[e>>16&15|64]+_n[e>>24&255]+"-"+_n[t&63|128]+_n[t>>8&255]+"-"+_n[t>>16&255]+_n[t>>24&255]+_n[n&255]+_n[n>>8&255]+_n[n>>16&255]+_n[n>>24&255]).toLowerCase()}function cn(r,e,t){return Math.max(e,Math.min(t,r))}function fo(r,e){return(r%e+e)%e}function nh(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function ih(r,e,t){return r!==e?(t-r)/(e-r):0}function Kr(r,e,t){return(1-t)*r+t*e}function rh(r,e,t,n){return Kr(r,e,1-Math.exp(-t*n))}function sh(r,e=1){return e-Math.abs(fo(r,e*2)-e)}function ah(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function oh(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function ch(r,e){return r+Math.floor(Math.random()*(e-r+1))}function lh(r,e){return r+Math.random()*(e-r)}function hh(r){return r*(.5-Math.random())}function uh(r){r!==void 0&&(Po=r);let e=Po+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function fh(r){return r*qr}function dh(r){return r*xr}function ph(r){return(r&r-1)===0&&r!==0}function mh(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function gh(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function bh(r,e,t,n,i){const s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+n)/2),u=a((e+n)/2),h=s((e-n)/2),f=a((e-n)/2),d=s((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":r.set(o*u,c*h,c*f,o*l);break;case"YZY":r.set(c*f,o*u,c*h,o*l);break;case"ZXZ":r.set(c*h,c*f,o*u,o*l);break;case"XZX":r.set(o*u,c*g,c*d,o*l);break;case"YXY":r.set(c*d,o*u,c*g,o*l);break;case"ZYZ":r.set(c*g,c*d,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function ei(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Ht(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const _h={DEG2RAD:qr,RAD2DEG:xr,generateUUID:ni,clamp:cn,euclideanModulo:fo,mapLinear:nh,inverseLerp:ih,lerp:Kr,damp:rh,pingpong:sh,smoothstep:ah,smootherstep:oh,randInt:ch,randFloat:lh,randFloatSpread:hh,seededRandom:uh,degToRad:fh,radToDeg:dh,isPowerOfTwo:ph,ceilPowerOfTwo:mh,floorPowerOfTwo:gh,setQuaternionFromProperEuler:bh,normalize:Ht,denormalize:ei};class Be{constructor(e=0,t=0){Be.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(cn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Et{constructor(e,t,n,i,s,a,o,c,l){Et.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],_=i[0],m=i[3],p=i[6],v=i[1],M=i[4],b=i[7],P=i[2],T=i[5],C=i[8];return s[0]=a*_+o*v+c*P,s[3]=a*m+o*M+c*T,s[6]=a*p+o*b+c*C,s[1]=l*_+u*v+h*P,s[4]=l*m+u*M+h*T,s[7]=l*p+u*b+h*C,s[2]=f*_+d*v+g*P,s[5]=f*m+d*M+g*T,s[8]=f*p+d*b+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*s*u+n*o*c+i*s*l-i*a*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,f=o*c-u*s,d=l*s-a*c,g=t*h+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(i*l-u*n)*_,e[2]=(o*n-i*a)*_,e[3]=f*_,e[4]=(u*t-i*c)*_,e[5]=(i*s-o*t)*_,e[6]=d*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(oa.makeScale(e,t)),this}rotate(e){return this.premultiply(oa.makeRotation(-e)),this}translate(e,t){return this.premultiply(oa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const oa=new Et;function ul(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function $r(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function xh(){const r=$r("canvas");return r.style.display="block",r}const Lo={};function Xr(r){r in Lo||(Lo[r]=!0,console.warn(r))}function vh(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function Mh(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function yh(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const It={enabled:!0,workingColorSpace:Cn,spaces:{},convert:function(r,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Wt&&(r.r=xi(r.r),r.g=xi(r.g),r.b=xi(r.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(r.applyMatrix3(this.spaces[e].toXYZ),r.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Wt&&(r.r=br(r.r),r.g=br(r.g),r.b=br(r.b))),r},fromWorkingColorSpace:function(r,e){return this.convert(r,this.workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===""?Qs:this.spaces[r].transfer},getLuminanceCoefficients:function(r,e=this.workingColorSpace){return r.fromArray(this.spaces[e].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,e,t){return r.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function xi(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function br(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const Do=[.64,.33,.3,.6,.15,.06],Io=[.2126,.7152,.0722],Fo=[.3127,.329],No=new Et().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Uo=new Et().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);It.define({[Cn]:{primaries:Do,whitePoint:Fo,transfer:Qs,toXYZ:No,fromXYZ:Uo,luminanceCoefficients:Io,workingColorSpaceConfig:{unpackColorSpace:Ot},outputColorSpaceConfig:{drawingBufferColorSpace:Ot}},[Ot]:{primaries:Do,whitePoint:Fo,transfer:Wt,toXYZ:No,fromXYZ:Uo,luminanceCoefficients:Io,outputColorSpaceConfig:{drawingBufferColorSpace:Ot}}});let Qi;class Sh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Qi===void 0&&(Qi=$r("canvas")),Qi.width=e.width,Qi.height=e.height;const n=Qi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Qi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=$r("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=xi(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(xi(t[n]/255)*255):t[n]=xi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Eh=0;class fl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Eh++}),this.uuid=ni(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(ca(i[a].image)):s.push(ca(i[a]))}else s=ca(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function ca(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Sh.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Th=0;class an extends Er{constructor(e=an.DEFAULT_IMAGE,t=an.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,c=1009,l=an.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Th++}),this.uuid=ni(),this.name="",this.source=new fl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Be(0,0),this.repeat=new Be(1,1),this.center=new Be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}an.DEFAULT_IMAGE=null;an.DEFAULT_MAPPING=300;an.DEFAULT_ANISOTROPY=1;class Ft{constructor(e=0,t=0,n=0,i=1){Ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(l+1)/2,b=(d+1)/2,P=(p+1)/2,T=(u+f)/4,C=(h+_)/4,S=(g+m)/4;return M>b&&M>P?M<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(M),i=T/n,s=C/n):b>P?b<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(b),n=T/i,s=S/i):P<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(P),n=C/s,i=S/s),this.set(n,i,s,t),this}let v=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(h-_)/v,this.z=(f-u)/v,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class wh extends Er{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ft(0,0,e,t),this.scissorTest=!1,this.viewport=new Ft(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new an(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new fl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ui extends wh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class dl extends an{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ah extends an{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3];const f=s[a+0],d=s[a+1],g=s[a+2],_=s[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(h!==_||c!==f||l!==d||u!==g){let m=1-o;const p=c*f+l*d+u*g+h*_,v=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const P=Math.sqrt(M),T=Math.atan2(P,p*v);m=Math.sin(m*T)/P,o=Math.sin(o*T)/P}const b=o*v;if(c=c*m+f*b,l=l*m+d*b,u=u*m+g*b,h=h*m+_*b,m===1-o){const P=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=P,l*=P,u*=P,h*=P}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=s[a],f=s[a+1],d=s[a+2],g=s[a+3];return e[t]=o*g+u*h+c*d-l*f,e[t+1]=c*g+u*f+l*h-o*d,e[t+2]=l*g+u*d+o*f-c*h,e[t+3]=u*g-o*h-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(i/2),h=o(s/2),f=c(n/2),d=c(i/2),g=c(s/2);switch(a){case"XYZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"YZX":this._x=f*u*h+l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h-f*d*g;break;case"XZY":this._x=f*u*h-l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=n+o+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(s-l)*d,this._z=(a-i)*d}else if(n>o&&n>h){const d=2*Math.sqrt(1+n-o-h);this._w=(u-c)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(s+l)/d}else if(o>h){const d=2*Math.sqrt(1+o-n-h);this._w=(s-l)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+h-n-o);this._w=(a-i)/d,this._x=(s+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(cn(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+i*l-s*c,this._y=i*u+a*c+s*o-n*l,this._z=s*u+a*l+n*c-i*o,this._w=a*u-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const d=1-t;return this._w=d*a+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=a*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Oo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Oo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),u=2*(o*t-s*i),h=2*(s*n-a*t);return this.x=t+c*l+a*h-o*u,this.y=n+c*u+o*l-s*h,this.z=i+c*h+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return la.copy(this).projectOnVector(e),this.sub(la)}reflect(e){return this.sub(la.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(cn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const la=new N,Oo=new yn;class Mn{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Zn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Zn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Zn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Zn):Zn.fromBufferAttribute(s,a),Zn.applyMatrix4(e.matrixWorld),this.expandByPoint(Zn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),us.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),us.copy(n.boundingBox)),us.applyMatrix4(e.matrixWorld),this.union(us)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Zn),Zn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Lr),fs.subVectors(this.max,Lr),$i.subVectors(e.a,Lr),er.subVectors(e.b,Lr),tr.subVectors(e.c,Lr),Ei.subVectors(er,$i),Ti.subVectors(tr,er),ki.subVectors($i,tr);let t=[0,-Ei.z,Ei.y,0,-Ti.z,Ti.y,0,-ki.z,ki.y,Ei.z,0,-Ei.x,Ti.z,0,-Ti.x,ki.z,0,-ki.x,-Ei.y,Ei.x,0,-Ti.y,Ti.x,0,-ki.y,ki.x,0];return!ha(t,$i,er,tr,fs)||(t=[1,0,0,0,1,0,0,0,1],!ha(t,$i,er,tr,fs))?!1:(ds.crossVectors(Ei,Ti),t=[ds.x,ds.y,ds.z],ha(t,$i,er,tr,fs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Zn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(hi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const hi=[new N,new N,new N,new N,new N,new N,new N,new N],Zn=new N,us=new Mn,$i=new N,er=new N,tr=new N,Ei=new N,Ti=new N,ki=new N,Lr=new N,fs=new N,ds=new N,zi=new N;function ha(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){zi.fromArray(r,s);const o=i.x*Math.abs(zi.x)+i.y*Math.abs(zi.y)+i.z*Math.abs(zi.z),c=e.dot(zi),l=t.dot(zi),u=n.dot(zi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Rh=new Mn,Dr=new N,ua=new N;class ai{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Rh.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Dr.subVectors(e,this.center);const t=Dr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Dr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ua.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Dr.copy(e.center).add(ua)),this.expandByPoint(Dr.copy(e.center).sub(ua))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ui=new N,fa=new N,ps=new N,wi=new N,da=new N,ms=new N,pa=new N;class $s{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ui)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ui.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ui.copy(this.origin).addScaledVector(this.direction,t),ui.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){fa.copy(e).add(t).multiplyScalar(.5),ps.copy(t).sub(e).normalize(),wi.copy(this.origin).sub(fa);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ps),o=wi.dot(this.direction),c=-wi.dot(ps),l=wi.lengthSq(),u=Math.abs(1-a*a);let h,f,d,g;if(u>0)if(h=a*c-o,f=a*o-c,g=s*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,d=h*(h+a*f+2*o)+f*(a*h+f+2*c)+l}else f=s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;else f=-s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-s,-c),s),d=f*(f+2*c)+l):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(fa).addScaledVector(ps,f),d}intersectSphere(e,t){ui.subVectors(e.center,this.origin);const n=ui.dot(this.direction),i=ui.dot(ui)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,i=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,i=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,ui)!==null}intersectTriangle(e,t,n,i,s){da.subVectors(t,e),ms.subVectors(n,e),pa.crossVectors(da,ms);let a=this.direction.dot(pa),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;wi.subVectors(this.origin,e);const c=o*this.direction.dot(ms.crossVectors(wi,ms));if(c<0)return null;const l=o*this.direction.dot(da.cross(wi));if(l<0||c+l>a)return null;const u=-o*wi.dot(pa);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class $e{constructor(e,t,n,i,s,a,o,c,l,u,h,f,d,g,_,m){$e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,u,h,f,d,g,_,m)}set(e,t,n,i,s,a,o,c,l,u,h,f,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $e().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/nr.setFromMatrixColumn(e,0).length(),s=1/nr.setFromMatrixColumn(e,1).length(),a=1/nr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=a*u,d=a*h,g=o*u,_=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=d+g*l,t[5]=f-_*l,t[9]=-o*c,t[2]=_-f*l,t[6]=g+d*l,t[10]=a*c}else if(e.order==="YXZ"){const f=c*u,d=c*h,g=l*u,_=l*h;t[0]=f+_*o,t[4]=g*o-d,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=d*o-g,t[6]=_+f*o,t[10]=a*c}else if(e.order==="ZXY"){const f=c*u,d=c*h,g=l*u,_=l*h;t[0]=f-_*o,t[4]=-a*h,t[8]=g+d*o,t[1]=d+g*o,t[5]=a*u,t[9]=_-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const f=a*u,d=a*h,g=o*u,_=o*h;t[0]=c*u,t[4]=g*l-d,t[8]=f*l+_,t[1]=c*h,t[5]=_*l+f,t[9]=d*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const f=a*c,d=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=_-f*h,t[8]=g*h+d,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=d*h+g,t[10]=f-_*h}else if(e.order==="XZY"){const f=a*c,d=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+_,t[5]=a*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=o*u,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ch,e,Ph)}lookAt(e,t,n){const i=this.elements;return kn.subVectors(e,t),kn.lengthSq()===0&&(kn.z=1),kn.normalize(),Ai.crossVectors(n,kn),Ai.lengthSq()===0&&(Math.abs(n.z)===1?kn.x+=1e-4:kn.z+=1e-4,kn.normalize(),Ai.crossVectors(n,kn)),Ai.normalize(),gs.crossVectors(kn,Ai),i[0]=Ai.x,i[4]=gs.x,i[8]=kn.x,i[1]=Ai.y,i[5]=gs.y,i[9]=kn.y,i[2]=Ai.z,i[6]=gs.z,i[10]=kn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],v=n[3],M=n[7],b=n[11],P=n[15],T=i[0],C=i[4],S=i[8],x=i[12],y=i[1],R=i[5],G=i[9],k=i[13],K=i[2],oe=i[6],D=i[10],Y=i[14],H=i[3],he=i[7],Z=i[11],te=i[15];return s[0]=a*T+o*y+c*K+l*H,s[4]=a*C+o*R+c*oe+l*he,s[8]=a*S+o*G+c*D+l*Z,s[12]=a*x+o*k+c*Y+l*te,s[1]=u*T+h*y+f*K+d*H,s[5]=u*C+h*R+f*oe+d*he,s[9]=u*S+h*G+f*D+d*Z,s[13]=u*x+h*k+f*Y+d*te,s[2]=g*T+_*y+m*K+p*H,s[6]=g*C+_*R+m*oe+p*he,s[10]=g*S+_*G+m*D+p*Z,s[14]=g*x+_*k+m*Y+p*te,s[3]=v*T+M*y+b*K+P*H,s[7]=v*C+M*R+b*oe+P*he,s[11]=v*S+M*G+b*D+P*Z,s[15]=v*x+M*k+b*Y+P*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*c*h-i*l*h-s*o*f+n*l*f+i*o*d-n*c*d)+_*(+t*c*d-t*l*f+s*a*f-i*a*d+i*l*u-s*c*u)+m*(+t*l*h-t*o*d-s*a*h+n*a*d+s*o*u-n*l*u)+p*(-i*o*u-t*c*h+t*o*f+i*a*h-n*a*f+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],v=h*m*l-_*f*l+_*c*d-o*m*d-h*c*p+o*f*p,M=g*f*l-u*m*l-g*c*d+a*m*d+u*c*p-a*f*p,b=u*_*l-g*h*l+g*o*d-a*_*d-u*o*p+a*h*p,P=g*h*c-u*_*c-g*o*f+a*_*f+u*o*m-a*h*m,T=t*v+n*M+i*b+s*P;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/T;return e[0]=v*C,e[1]=(_*f*s-h*m*s-_*i*d+n*m*d+h*i*p-n*f*p)*C,e[2]=(o*m*s-_*c*s+_*i*l-n*m*l-o*i*p+n*c*p)*C,e[3]=(h*c*s-o*f*s-h*i*l+n*f*l+o*i*d-n*c*d)*C,e[4]=M*C,e[5]=(u*m*s-g*f*s+g*i*d-t*m*d-u*i*p+t*f*p)*C,e[6]=(g*c*s-a*m*s-g*i*l+t*m*l+a*i*p-t*c*p)*C,e[7]=(a*f*s-u*c*s+u*i*l-t*f*l-a*i*d+t*c*d)*C,e[8]=b*C,e[9]=(g*h*s-u*_*s-g*n*d+t*_*d+u*n*p-t*h*p)*C,e[10]=(a*_*s-g*o*s+g*n*l-t*_*l-a*n*p+t*o*p)*C,e[11]=(u*o*s-a*h*s-u*n*l+t*h*l+a*n*d-t*o*d)*C,e[12]=P*C,e[13]=(u*_*i-g*h*i+g*n*f-t*_*f-u*n*m+t*h*m)*C,e[14]=(g*o*i-a*_*i-g*n*c+t*_*c+a*n*m-t*o*m)*C,e[15]=(a*h*i-u*o*i+u*n*c-t*h*c-a*n*f+t*o*f)*C,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,u*o+n,u*c-i*a,0,l*c-i*o,u*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,h=o+o,f=s*l,d=s*u,g=s*h,_=a*u,m=a*h,p=o*h,v=c*l,M=c*u,b=c*h,P=n.x,T=n.y,C=n.z;return i[0]=(1-(_+p))*P,i[1]=(d+b)*P,i[2]=(g-M)*P,i[3]=0,i[4]=(d-b)*T,i[5]=(1-(f+p))*T,i[6]=(m+v)*T,i[7]=0,i[8]=(g+M)*C,i[9]=(m-v)*C,i[10]=(1-(f+_))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=nr.set(i[0],i[1],i[2]).length();const a=nr.set(i[4],i[5],i[6]).length(),o=nr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Qn.copy(this);const l=1/s,u=1/a,h=1/o;return Qn.elements[0]*=l,Qn.elements[1]*=l,Qn.elements[2]*=l,Qn.elements[4]*=u,Qn.elements[5]*=u,Qn.elements[6]*=u,Qn.elements[8]*=h,Qn.elements[9]*=h,Qn.elements[10]*=h,t.setFromRotationMatrix(Qn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3){const c=this.elements,l=2*s/(t-e),u=2*s/(n-i),h=(t+e)/(t-e),f=(n+i)/(n-i);let d,g;if(o===2e3)d=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===2001)d=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3){const c=this.elements,l=1/(t-e),u=1/(n-i),h=1/(a-s),f=(t+e)*l,d=(n+i)*u;let g,_;if(o===2e3)g=(a+s)*h,_=-2*h;else if(o===2001)g=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const nr=new N,Qn=new $e,Ch=new N(0,0,0),Ph=new N(1,1,1),Ai=new N,gs=new N,kn=new N,Bo=new $e,ko=new yn;class Wn{constructor(e=0,t=0,n=0,i=Wn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(cn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-cn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(cn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-cn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(cn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-cn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Bo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ko.setFromEuler(this),this.setFromQuaternion(ko,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wn.DEFAULT_ORDER="XYZ";class pl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Lh=0;const zo=new N,ir=new yn,fi=new $e,bs=new N,Ir=new N,Dh=new N,Ih=new yn,Go=new N(1,0,0),Ho=new N(0,1,0),Vo=new N(0,0,1),Wo={type:"added"},Fh={type:"removed"},rr={type:"childadded",child:null},ma={type:"childremoved",child:null};class $t extends Er{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Lh++}),this.uuid=ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=$t.DEFAULT_UP.clone();const e=new N,t=new Wn,n=new yn,i=new N(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new $e},normalMatrix:{value:new Et}}),this.matrix=new $e,this.matrixWorld=new $e,this.matrixAutoUpdate=$t.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=$t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ir.setFromAxisAngle(e,t),this.quaternion.multiply(ir),this}rotateOnWorldAxis(e,t){return ir.setFromAxisAngle(e,t),this.quaternion.premultiply(ir),this}rotateX(e){return this.rotateOnAxis(Go,e)}rotateY(e){return this.rotateOnAxis(Ho,e)}rotateZ(e){return this.rotateOnAxis(Vo,e)}translateOnAxis(e,t){return zo.copy(e).applyQuaternion(this.quaternion),this.position.add(zo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Go,e)}translateY(e){return this.translateOnAxis(Ho,e)}translateZ(e){return this.translateOnAxis(Vo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(fi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?bs.copy(e):bs.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fi.lookAt(Ir,bs,this.up):fi.lookAt(bs,Ir,this.up),this.quaternion.setFromRotationMatrix(fi),i&&(fi.extractRotation(i.matrixWorld),ir.setFromRotationMatrix(fi),this.quaternion.premultiply(ir.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Wo),rr.child=e,this.dispatchEvent(rr),rr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Fh),ma.child=e,this.dispatchEvent(ma),ma.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),fi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),fi.multiply(e.parent.matrixWorld)),e.applyMatrix4(fi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Wo),rr.child=e,this.dispatchEvent(rr),rr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,e,Dh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,Ih,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),d=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}$t.DEFAULT_UP=new N(0,1,0);$t.DEFAULT_MATRIX_AUTO_UPDATE=!0;$t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const $n=new N,di=new N,ga=new N,pi=new N,sr=new N,ar=new N,Xo=new N,ba=new N,_a=new N,xa=new N,va=new Ft,Ma=new Ft,ya=new Ft;class Kn{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),$n.subVectors(e,t),i.cross($n);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){$n.subVectors(i,t),di.subVectors(n,t),ga.subVectors(e,t);const a=$n.dot($n),o=$n.dot(di),c=$n.dot(ga),l=di.dot(di),u=di.dot(ga),h=a*l-o*o;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(l*c-o*u)*f,g=(a*u-o*c)*f;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,pi)===null?!1:pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,pi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,pi.x),c.addScaledVector(a,pi.y),c.addScaledVector(o,pi.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return va.setScalar(0),Ma.setScalar(0),ya.setScalar(0),va.fromBufferAttribute(e,t),Ma.fromBufferAttribute(e,n),ya.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(va,s.x),a.addScaledVector(Ma,s.y),a.addScaledVector(ya,s.z),a}static isFrontFacing(e,t,n,i){return $n.subVectors(n,t),di.subVectors(e,t),$n.cross(di).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $n.subVectors(this.c,this.b),di.subVectors(this.a,this.b),$n.cross(di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Kn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Kn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Kn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Kn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Kn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;sr.subVectors(i,n),ar.subVectors(s,n),ba.subVectors(e,n);const c=sr.dot(ba),l=ar.dot(ba);if(c<=0&&l<=0)return t.copy(n);_a.subVectors(e,i);const u=sr.dot(_a),h=ar.dot(_a);if(u>=0&&h<=u)return t.copy(i);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(sr,a);xa.subVectors(e,s);const d=sr.dot(xa),g=ar.dot(xa);if(g>=0&&d<=g)return t.copy(s);const _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(ar,o);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return Xo.subVectors(s,i),o=(h-u)/(h-u+(d-g)),t.copy(i).addScaledVector(Xo,o);const p=1/(m+_+f);return a=_*p,o=f*p,t.copy(n).addScaledVector(sr,a).addScaledVector(ar,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ml={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ri={h:0,s:0,l:0},_s={h:0,s:0,l:0};function Sa(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Qe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,It.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=It.workingColorSpace){return this.r=e,this.g=t,this.b=n,It.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=It.workingColorSpace){if(e=fo(e,1),t=cn(t,0,1),n=cn(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Sa(a,s,e+1/3),this.g=Sa(a,s,e),this.b=Sa(a,s,e-1/3)}return It.toWorkingColorSpace(this,i),this}setStyle(e,t=Ot){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ot){const n=ml[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=xi(e.r),this.g=xi(e.g),this.b=xi(e.b),this}copyLinearToSRGB(e){return this.r=br(e.r),this.g=br(e.g),this.b=br(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ot){return It.fromWorkingColorSpace(xn.copy(this),e),Math.round(cn(xn.r*255,0,255))*65536+Math.round(cn(xn.g*255,0,255))*256+Math.round(cn(xn.b*255,0,255))}getHexString(e=Ot){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=It.workingColorSpace){It.fromWorkingColorSpace(xn.copy(this),t);const n=xn.r,i=xn.g,s=xn.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(i-s)/h+(i<s?6:0);break;case i:c=(s-n)/h+2;break;case s:c=(n-i)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=It.workingColorSpace){return It.fromWorkingColorSpace(xn.copy(this),t),e.r=xn.r,e.g=xn.g,e.b=xn.b,e}getStyle(e=Ot){It.fromWorkingColorSpace(xn.copy(this),e);const t=xn.r,n=xn.g,i=xn.b;return e!==Ot?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ri),this.setHSL(Ri.h+e,Ri.s+t,Ri.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ri),e.getHSL(_s);const n=Kr(Ri.h,_s.h,t),i=Kr(Ri.s,_s.s,t),s=Kr(Ri.l,_s.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const xn=new Qe;Qe.NAMES=ml;let Nh=0;class Yn extends Er{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nh++}),this.uuid=ni(),this.name="",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class dn extends Yn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const sn=new N,xs=new Be;class zt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)xs.fromBufferAttribute(this,t),xs.applyMatrix3(e),this.setXY(t,xs.x,xs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix3(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix4(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyNormalMatrix(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.transformDirection(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ei(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ht(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ei(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ei(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ei(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ei(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array),i=Ht(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array),i=Ht(i,this.array),s=Ht(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}}class gl extends zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class bl extends zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Pt extends zt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Uh=0;const jn=new $e,Ea=new $t,or=new N,zn=new Mn,Fr=new Mn,un=new N;class qt extends Er{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=ni(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ul(e)?bl:gl)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Et().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return jn.makeRotationFromQuaternion(e),this.applyMatrix4(jn),this}rotateX(e){return jn.makeRotationX(e),this.applyMatrix4(jn),this}rotateY(e){return jn.makeRotationY(e),this.applyMatrix4(jn),this}rotateZ(e){return jn.makeRotationZ(e),this.applyMatrix4(jn),this}translate(e,t,n){return jn.makeTranslation(e,t,n),this.applyMatrix4(jn),this}scale(e,t,n){return jn.makeScale(e,t,n),this.applyMatrix4(jn),this}lookAt(e){return Ea.lookAt(e),Ea.updateMatrix(),this.applyMatrix4(Ea.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(or).negate(),this.translate(or.x,or.y,or.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Pt(n,3))}else{for(let n=0,i=t.count;n<i;n++){const s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];zn.setFromBufferAttribute(s),this.morphTargetsRelative?(un.addVectors(this.boundingBox.min,zn.min),this.boundingBox.expandByPoint(un),un.addVectors(this.boundingBox.max,zn.max),this.boundingBox.expandByPoint(un)):(this.boundingBox.expandByPoint(zn.min),this.boundingBox.expandByPoint(zn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ai);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(zn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Fr.setFromBufferAttribute(o),this.morphTargetsRelative?(un.addVectors(zn.min,Fr.min),zn.expandByPoint(un),un.addVectors(zn.max,Fr.max),zn.expandByPoint(un)):(zn.expandByPoint(Fr.min),zn.expandByPoint(Fr.max))}zn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)un.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(un));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)un.fromBufferAttribute(o,l),c&&(or.fromBufferAttribute(e,l),un.add(or)),i=Math.max(i,n.distanceToSquared(un))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new zt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let S=0;S<n.count;S++)o[S]=new N,c[S]=new N;const l=new N,u=new N,h=new N,f=new Be,d=new Be,g=new Be,_=new N,m=new N;function p(S,x,y){l.fromBufferAttribute(n,S),u.fromBufferAttribute(n,x),h.fromBufferAttribute(n,y),f.fromBufferAttribute(s,S),d.fromBufferAttribute(s,x),g.fromBufferAttribute(s,y),u.sub(l),h.sub(l),d.sub(f),g.sub(f);const R=1/(d.x*g.y-g.x*d.y);isFinite(R)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(R),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(R),o[S].add(_),o[x].add(_),o[y].add(_),c[S].add(m),c[x].add(m),c[y].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let S=0,x=v.length;S<x;++S){const y=v[S],R=y.start,G=y.count;for(let k=R,K=R+G;k<K;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const M=new N,b=new N,P=new N,T=new N;function C(S){P.fromBufferAttribute(i,S),T.copy(P);const x=o[S];M.copy(x),M.sub(P.multiplyScalar(P.dot(x))).normalize(),b.crossVectors(T,x);const R=b.dot(c[S])<0?-1:1;a.setXYZW(S,M.x,M.y,M.z,R)}for(let S=0,x=v.length;S<x;++S){const y=v[S],R=y.start,G=y.count;for(let k=R,K=R+G;k<K;k+=3)C(e.getX(k+0)),C(e.getX(k+1)),C(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new N,s=new N,a=new N,o=new N,c=new N,l=new N,u=new N,h=new N;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)un.fromBufferAttribute(e,t),un.normalize(),e.setXYZ(t,un.x,un.y,un.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,h=o.normalized,f=new l.constructor(c.length*u);let d=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?d=c[_]*o.data.stride+o.offset:d=c[_]*u;for(let p=0;p<u;p++)f[g++]=l[d++]}return new zt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new qt,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=e(c,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,h=l.length;u<h;u++){const f=l[u],d=e(f,n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const d=l[h];u.push(d.toJSON(e.data))}u.length>0&&(i[c]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const l in i){const u=i[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],h=s[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const jo=new $e,Gi=new $s,vs=new ai,qo=new N,Ms=new N,ys=new N,Ss=new N,Ta=new N,Es=new N,Ko=new N,Ts=new N;class Ye extends $t{constructor(e=new qt,t=new dn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){Es.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],h=s[c];u!==0&&(Ta.fromBufferAttribute(h,e),a?Es.addScaledVector(Ta,u):Es.addScaledVector(Ta.sub(t),u))}t.add(Es)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),vs.copy(n.boundingSphere),vs.applyMatrix4(s),Gi.copy(e.ray).recast(e.near),!(vs.containsPoint(Gi.origin)===!1&&(Gi.intersectSphere(vs,qo)===null||Gi.origin.distanceToSquared(qo)>(e.far-e.near)**2))&&(jo.copy(s).invert(),Gi.copy(e.ray).applyMatrix4(jo),!(n.boundingBox!==null&&Gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Gi)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=a[m.materialIndex],v=Math.max(m.start,d.start),M=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let b=v,P=M;b<P;b+=3){const T=o.getX(b),C=o.getX(b+1),S=o.getX(b+2);i=ws(this,p,e,n,l,u,h,T,C,S),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const v=o.getX(m),M=o.getX(m+1),b=o.getX(m+2);i=ws(this,a,e,n,l,u,h,v,M,b),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=a[m.materialIndex],v=Math.max(m.start,d.start),M=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let b=v,P=M;b<P;b+=3){const T=b,C=b+1,S=b+2;i=ws(this,p,e,n,l,u,h,T,C,S),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const v=m,M=m+1,b=m+2;i=ws(this,a,e,n,l,u,h,v,M,b),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Oh(r,e,t,n,i,s,a,o){let c;if(e.side===1?c=n.intersectTriangle(a,s,i,!0,o):c=n.intersectTriangle(i,s,a,e.side===0,o),c===null)return null;Ts.copy(o),Ts.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(Ts);return l<t.near||l>t.far?null:{distance:l,point:Ts.clone(),object:r}}function ws(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,Ms),r.getVertexPosition(c,ys),r.getVertexPosition(l,Ss);const u=Oh(r,e,t,n,Ms,ys,Ss,Ko);if(u){const h=new N;Kn.getBarycoord(Ko,Ms,ys,Ss,h),i&&(u.uv=Kn.getInterpolatedAttribute(i,o,c,l,h,new Be)),s&&(u.uv1=Kn.getInterpolatedAttribute(s,o,c,l,h,new Be)),a&&(u.normal=Kn.getInterpolatedAttribute(a,o,c,l,h,new N),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new N,materialIndex:0};Kn.getNormal(Ms,ys,Ss,f.normal),u.face=f,u.barycoord=h}return u}class Zt extends qt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Pt(l,3)),this.setAttribute("normal",new Pt(u,3)),this.setAttribute("uv",new Pt(h,2));function g(_,m,p,v,M,b,P,T,C,S,x){const y=b/C,R=P/S,G=b/2,k=P/2,K=T/2,oe=C+1,D=S+1;let Y=0,H=0;const he=new N;for(let Z=0;Z<D;Z++){const te=Z*R-k;for(let Te=0;Te<oe;Te++){const Pe=Te*y-G;he[_]=Pe*v,he[m]=te*M,he[p]=K,l.push(he.x,he.y,he.z),he[_]=0,he[m]=0,he[p]=T>0?1:-1,u.push(he.x,he.y,he.z),h.push(Te/C),h.push(1-Z/S),Y+=1}}for(let Z=0;Z<S;Z++)for(let te=0;te<C;te++){const Te=f+te+oe*Z,Pe=f+te+oe*(Z+1),re=f+(te+1)+oe*(Z+1),xe=f+(te+1)+oe*Z;c.push(Te,Pe,xe),c.push(Pe,re,xe),H+=6}o.addGroup(d,H,x),d+=H,f+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function vr(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Rn(r){const e={};for(let t=0;t<r.length;t++){const n=vr(r[t]);for(const i in n)e[i]=n[i]}return e}function Bh(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function _l(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:It.workingColorSpace}const kh={clone:vr,merge:Rn};var zh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Gh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Oi extends Yn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zh,this.fragmentShader=Gh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vr(e.uniforms),this.uniformsGroups=Bh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class xl extends $t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $e,this.projectionMatrix=new $e,this.projectionMatrixInverse=new $e,this.coordinateSystem=2e3}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ci=new N,Yo=new Be,Jo=new Be;class Nn extends xl{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=xr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(qr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xr*2*Math.atan(Math.tan(qr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z)}getViewSize(e,t){return this.getViewBounds(e,Yo,Jo),t.subVectors(Jo,Yo)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(qr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const cr=-90,lr=1;class Hh extends $t{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Nn(cr,lr,e,t);i.layers=this.layers,this.add(i);const s=new Nn(cr,lr,e,t);s.layers=this.layers,this.add(s);const a=new Nn(cr,lr,e,t);a.layers=this.layers,this.add(a);const o=new Nn(cr,lr,e,t);o.layers=this.layers,this.add(o);const c=new Nn(cr,lr,e,t);c.layers=this.layers,this.add(c);const l=new Nn(cr,lr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class vl extends an{constructor(e,t,n,i,s,a,o,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:301,super(e,t,n,i,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Vh extends Ui{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new vl(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:1006}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Zt(5,5,5),s=new Oi({name:"CubemapFromEquirect",uniforms:vr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;const a=new Ye(i,s),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=1006),new Hh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}const wa=new N,Wh=new N,Xh=new Et;class Ii{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=wa.subVectors(n,t).cross(Wh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(wa),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Xh.getNormalMatrix(e),i=this.coplanarPoint(wa).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hi=new ai,As=new N;class po{constructor(e=new Ii,t=new Ii,n=new Ii,i=new Ii,s=new Ii,a=new Ii){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3){const n=this.planes,i=e.elements,s=i[0],a=i[1],o=i[2],c=i[3],l=i[4],u=i[5],h=i[6],f=i[7],d=i[8],g=i[9],_=i[10],m=i[11],p=i[12],v=i[13],M=i[14],b=i[15];if(n[0].setComponents(c-s,f-l,m-d,b-p).normalize(),n[1].setComponents(c+s,f+l,m+d,b+p).normalize(),n[2].setComponents(c+a,f+u,m+g,b+v).normalize(),n[3].setComponents(c-a,f-u,m-g,b-v).normalize(),n[4].setComponents(c-o,f-h,m-_,b-M).normalize(),t===2e3)n[5].setComponents(c+o,f+h,m+_,b+M).normalize();else if(t===2001)n[5].setComponents(o,h,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hi)}intersectsSprite(e){return Hi.center.set(0,0,0),Hi.radius=.7071067811865476,Hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(As.x=i.normal.x>0?e.max.x:e.min.x,As.y=i.normal.y>0?e.max.y:e.min.y,As.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(As)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ml(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function jh(r){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,h=l.byteLength,f=r.createBuffer();r.bindBuffer(c,f),r.bufferData(c,l,u),o.onUploadCallback();let d;if(l instanceof Float32Array)d=r.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=r.SHORT;else if(l instanceof Uint32Array)d=r.UNSIGNED_INT;else if(l instanceof Int32Array)d=r.INT;else if(l instanceof Int8Array)d=r.BYTE;else if(l instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c.updateRanges;if(r.bindBuffer(l,o),h.length===0)r.bufferSubData(l,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],_=h[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,h[f]=_)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const _=h[d];r.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(r.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:s,update:a}}class Vn extends qt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,u=c+1,h=e/o,f=t/c,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const v=p*f-a;for(let M=0;M<l;M++){const b=M*h-s;g.push(b,-v,0),_.push(0,0,1),m.push(M/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<o;v++){const M=v+l*p,b=v+l*(p+1),P=v+1+l*(p+1),T=v+1+l*p;d.push(M,b,T),d.push(b,P,T)}this.setIndex(d),this.setAttribute("position",new Pt(g,3)),this.setAttribute("normal",new Pt(_,3)),this.setAttribute("uv",new Pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vn(e.width,e.height,e.widthSegments,e.heightSegments)}}var qh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kh=`#ifdef USE_ALPHAHASH
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
#endif`,Yh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Qh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$h=`#ifdef USE_AOMAP
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
#endif`,eu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tu=`#ifdef USE_BATCHING
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
#endif`,nu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,iu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ru=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,su=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,au=`#ifdef USE_IRIDESCENCE
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
#endif`,ou=`#ifdef USE_BUMPMAP
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
#endif`,cu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,lu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,uu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,du=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,pu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,mu=`#if defined( USE_COLOR_ALPHA )
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
#endif`,gu=`#define PI 3.141592653589793
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
} // validated`,bu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,_u=`vec3 transformedNormal = objectNormal;
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
#endif`,xu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Mu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Su="gl_FragColor = linearToOutputTexel( gl_FragColor );",Eu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Tu=`#ifdef USE_ENVMAP
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
#endif`,wu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Au=`#ifdef USE_ENVMAP
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
#endif`,Ru=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cu=`#ifdef USE_ENVMAP
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
#endif`,Pu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Lu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Du=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Iu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fu=`#ifdef USE_GRADIENTMAP
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
}`,Nu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Uu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ou=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Bu=`uniform bool receiveShadow;
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
#endif`,ku=`#ifdef USE_ENVMAP
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
#endif`,zu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Hu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Wu=`PhysicalMaterial material;
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
#endif`,Xu=`struct PhysicalMaterial {
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
}`,ju=`
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
#endif`,qu=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ku=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Yu=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ju=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zu=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qu=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$u=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ef=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,nf=`#if defined( USE_POINTS_UV )
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
#endif`,rf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,af=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,of=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lf=`#ifdef USE_MORPHTARGETS
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
#endif`,hf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ff=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,df=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gf=`#ifdef USE_NORMALMAP
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
#endif`,bf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_f=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Sf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ef=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Af=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Rf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Cf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Pf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Df=`float getShadowMask() {
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
}`,If=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ff=`#ifdef USE_SKINNING
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
#endif`,Nf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Uf=`#ifdef USE_SKINNING
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
#endif`,Of=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gf=`#ifdef USE_TRANSMISSION
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
#endif`,Hf=`#ifdef USE_TRANSMISSION
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
#endif`,Vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const qf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Kf=`uniform sampler2D t2D;
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
}`,Yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Zf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$f=`#include <common>
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
}`,ed=`#if DEPTH_PACKING == 3200
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
}`,td=`#define DISTANCE
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
}`,nd=`#define DISTANCE
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
}`,id=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sd=`uniform float scale;
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
}`,ad=`uniform vec3 diffuse;
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
}`,od=`#include <common>
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
}`,cd=`uniform vec3 diffuse;
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
}`,ld=`#define LAMBERT
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
}`,hd=`#define LAMBERT
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
}`,ud=`#define MATCAP
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
}`,fd=`#define MATCAP
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
}`,dd=`#define NORMAL
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
}`,pd=`#define NORMAL
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
}`,md=`#define PHONG
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
}`,gd=`#define PHONG
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
}`,bd=`#define STANDARD
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
}`,_d=`#define STANDARD
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
}`,xd=`#define TOON
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
}`,vd=`#define TOON
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
}`,Md=`uniform float size;
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
}`,yd=`uniform vec3 diffuse;
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
}`,Sd=`#include <common>
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
}`,Ed=`uniform vec3 color;
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
}`,Td=`uniform float rotation;
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
}`,wd=`uniform vec3 diffuse;
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
}`,wt={alphahash_fragment:qh,alphahash_pars_fragment:Kh,alphamap_fragment:Yh,alphamap_pars_fragment:Jh,alphatest_fragment:Zh,alphatest_pars_fragment:Qh,aomap_fragment:$h,aomap_pars_fragment:eu,batching_pars_vertex:tu,batching_vertex:nu,begin_vertex:iu,beginnormal_vertex:ru,bsdfs:su,iridescence_fragment:au,bumpmap_pars_fragment:ou,clipping_planes_fragment:cu,clipping_planes_pars_fragment:lu,clipping_planes_pars_vertex:hu,clipping_planes_vertex:uu,color_fragment:fu,color_pars_fragment:du,color_pars_vertex:pu,color_vertex:mu,common:gu,cube_uv_reflection_fragment:bu,defaultnormal_vertex:_u,displacementmap_pars_vertex:xu,displacementmap_vertex:vu,emissivemap_fragment:Mu,emissivemap_pars_fragment:yu,colorspace_fragment:Su,colorspace_pars_fragment:Eu,envmap_fragment:Tu,envmap_common_pars_fragment:wu,envmap_pars_fragment:Au,envmap_pars_vertex:Ru,envmap_physical_pars_fragment:ku,envmap_vertex:Cu,fog_vertex:Pu,fog_pars_vertex:Lu,fog_fragment:Du,fog_pars_fragment:Iu,gradientmap_pars_fragment:Fu,lightmap_pars_fragment:Nu,lights_lambert_fragment:Uu,lights_lambert_pars_fragment:Ou,lights_pars_begin:Bu,lights_toon_fragment:zu,lights_toon_pars_fragment:Gu,lights_phong_fragment:Hu,lights_phong_pars_fragment:Vu,lights_physical_fragment:Wu,lights_physical_pars_fragment:Xu,lights_fragment_begin:ju,lights_fragment_maps:qu,lights_fragment_end:Ku,logdepthbuf_fragment:Yu,logdepthbuf_pars_fragment:Ju,logdepthbuf_pars_vertex:Zu,logdepthbuf_vertex:Qu,map_fragment:$u,map_pars_fragment:ef,map_particle_fragment:tf,map_particle_pars_fragment:nf,metalnessmap_fragment:rf,metalnessmap_pars_fragment:sf,morphinstance_vertex:af,morphcolor_vertex:of,morphnormal_vertex:cf,morphtarget_pars_vertex:lf,morphtarget_vertex:hf,normal_fragment_begin:uf,normal_fragment_maps:ff,normal_pars_fragment:df,normal_pars_vertex:pf,normal_vertex:mf,normalmap_pars_fragment:gf,clearcoat_normal_fragment_begin:bf,clearcoat_normal_fragment_maps:_f,clearcoat_pars_fragment:xf,iridescence_pars_fragment:vf,opaque_fragment:Mf,packing:yf,premultiplied_alpha_fragment:Sf,project_vertex:Ef,dithering_fragment:Tf,dithering_pars_fragment:wf,roughnessmap_fragment:Af,roughnessmap_pars_fragment:Rf,shadowmap_pars_fragment:Cf,shadowmap_pars_vertex:Pf,shadowmap_vertex:Lf,shadowmask_pars_fragment:Df,skinbase_vertex:If,skinning_pars_vertex:Ff,skinning_vertex:Nf,skinnormal_vertex:Uf,specularmap_fragment:Of,specularmap_pars_fragment:Bf,tonemapping_fragment:kf,tonemapping_pars_fragment:zf,transmission_fragment:Gf,transmission_pars_fragment:Hf,uv_pars_fragment:Vf,uv_pars_vertex:Wf,uv_vertex:Xf,worldpos_vertex:jf,background_vert:qf,background_frag:Kf,backgroundCube_vert:Yf,backgroundCube_frag:Jf,cube_vert:Zf,cube_frag:Qf,depth_vert:$f,depth_frag:ed,distanceRGBA_vert:td,distanceRGBA_frag:nd,equirect_vert:id,equirect_frag:rd,linedashed_vert:sd,linedashed_frag:ad,meshbasic_vert:od,meshbasic_frag:cd,meshlambert_vert:ld,meshlambert_frag:hd,meshmatcap_vert:ud,meshmatcap_frag:fd,meshnormal_vert:dd,meshnormal_frag:pd,meshphong_vert:md,meshphong_frag:gd,meshphysical_vert:bd,meshphysical_frag:_d,meshtoon_vert:xd,meshtoon_frag:vd,points_vert:Md,points_frag:yd,shadow_vert:Sd,shadow_frag:Ed,sprite_vert:Td,sprite_frag:wd},We={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Et},alphaMap:{value:null},alphaMapTransform:{value:new Et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Et}},envmap:{envMap:{value:null},envMapRotation:{value:new Et},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Et},normalScale:{value:new Be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Et},alphaTest:{value:0},uvTransform:{value:new Et}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new Be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Et},alphaMap:{value:null},alphaMapTransform:{value:new Et},alphaTest:{value:0}}},si={basic:{uniforms:Rn([We.common,We.specularmap,We.envmap,We.aomap,We.lightmap,We.fog]),vertexShader:wt.meshbasic_vert,fragmentShader:wt.meshbasic_frag},lambert:{uniforms:Rn([We.common,We.specularmap,We.envmap,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.fog,We.lights,{emissive:{value:new Qe(0)}}]),vertexShader:wt.meshlambert_vert,fragmentShader:wt.meshlambert_frag},phong:{uniforms:Rn([We.common,We.specularmap,We.envmap,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.fog,We.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30}}]),vertexShader:wt.meshphong_vert,fragmentShader:wt.meshphong_frag},standard:{uniforms:Rn([We.common,We.envmap,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.roughnessmap,We.metalnessmap,We.fog,We.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:wt.meshphysical_vert,fragmentShader:wt.meshphysical_frag},toon:{uniforms:Rn([We.common,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.gradientmap,We.fog,We.lights,{emissive:{value:new Qe(0)}}]),vertexShader:wt.meshtoon_vert,fragmentShader:wt.meshtoon_frag},matcap:{uniforms:Rn([We.common,We.bumpmap,We.normalmap,We.displacementmap,We.fog,{matcap:{value:null}}]),vertexShader:wt.meshmatcap_vert,fragmentShader:wt.meshmatcap_frag},points:{uniforms:Rn([We.points,We.fog]),vertexShader:wt.points_vert,fragmentShader:wt.points_frag},dashed:{uniforms:Rn([We.common,We.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:wt.linedashed_vert,fragmentShader:wt.linedashed_frag},depth:{uniforms:Rn([We.common,We.displacementmap]),vertexShader:wt.depth_vert,fragmentShader:wt.depth_frag},normal:{uniforms:Rn([We.common,We.bumpmap,We.normalmap,We.displacementmap,{opacity:{value:1}}]),vertexShader:wt.meshnormal_vert,fragmentShader:wt.meshnormal_frag},sprite:{uniforms:Rn([We.sprite,We.fog]),vertexShader:wt.sprite_vert,fragmentShader:wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:wt.background_vert,fragmentShader:wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Et}},vertexShader:wt.backgroundCube_vert,fragmentShader:wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:wt.cube_vert,fragmentShader:wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:wt.equirect_vert,fragmentShader:wt.equirect_frag},distanceRGBA:{uniforms:Rn([We.common,We.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:wt.distanceRGBA_vert,fragmentShader:wt.distanceRGBA_frag},shadow:{uniforms:Rn([We.lights,We.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:wt.shadow_vert,fragmentShader:wt.shadow_frag}};si.physical={uniforms:Rn([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Et},clearcoatNormalScale:{value:new Be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Et},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Et},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Et},transmissionSamplerSize:{value:new Be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Et},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Et},anisotropyVector:{value:new Be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Et}}]),vertexShader:wt.meshphysical_vert,fragmentShader:wt.meshphysical_frag};const Rs={r:0,b:0,g:0},Vi=new Wn,Ad=new $e;function Rd(r,e,t,n,i,s,a){const o=new Qe(0);let c=s===!0?0:1,l,u,h=null,f=0,d=null;function g(v){let M=v.isScene===!0?v.background:null;return M&&M.isTexture&&(M=(v.backgroundBlurriness>0?t:e).get(M)),M}function _(v){let M=!1;const b=g(v);b===null?p(o,c):b&&b.isColor&&(p(b,1),M=!0);const P=r.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(v,M){const b=g(M);b&&(b.isCubeTexture||b.mapping===306)?(u===void 0&&(u=new Ye(new Zt(1,1,1),new Oi({name:"BackgroundCubeMaterial",uniforms:vr(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(P,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Vi.copy(M.backgroundRotation),Vi.x*=-1,Vi.y*=-1,Vi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Vi.y*=-1,Vi.z*=-1),u.material.uniforms.envMap.value=b,u.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Ad.makeRotationFromEuler(Vi)),u.material.toneMapped=It.getTransfer(b.colorSpace)!==Wt,(h!==b||f!==b.version||d!==r.toneMapping)&&(u.material.needsUpdate=!0,h=b,f=b.version,d=r.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new Ye(new Vn(2,2),new Oi({name:"BackgroundMaterial",uniforms:vr(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=It.getTransfer(b.colorSpace)!==Wt,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||f!==b.version||d!==r.toneMapping)&&(l.material.needsUpdate=!0,h=b,f=b.version,d=r.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,M){v.getRGB(Rs,_l(r)),n.buffers.color.setClear(Rs.r,Rs.g,Rs.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(v,M=1){o.set(v),c=M,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,p(o,c)},render:_,addToRenderList:m}}function Cd(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,a=!1;function o(y,R,G,k,K){let oe=!1;const D=h(k,G,R);s!==D&&(s=D,l(s.object)),oe=d(y,k,G,K),oe&&g(y,k,G,K),K!==null&&e.update(K,r.ELEMENT_ARRAY_BUFFER),(oe||a)&&(a=!1,b(y,R,G,k),K!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(K).buffer))}function c(){return r.createVertexArray()}function l(y){return r.bindVertexArray(y)}function u(y){return r.deleteVertexArray(y)}function h(y,R,G){const k=G.wireframe===!0;let K=n[y.id];K===void 0&&(K={},n[y.id]=K);let oe=K[R.id];oe===void 0&&(oe={},K[R.id]=oe);let D=oe[k];return D===void 0&&(D=f(c()),oe[k]=D),D}function f(y){const R=[],G=[],k=[];for(let K=0;K<t;K++)R[K]=0,G[K]=0,k[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:G,attributeDivisors:k,object:y,attributes:{},index:null}}function d(y,R,G,k){const K=s.attributes,oe=R.attributes;let D=0;const Y=G.getAttributes();for(const H in Y)if(Y[H].location>=0){const Z=K[H];let te=oe[H];if(te===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(te=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(te=y.instanceColor)),Z===void 0||Z.attribute!==te||te&&Z.data!==te.data)return!0;D++}return s.attributesNum!==D||s.index!==k}function g(y,R,G,k){const K={},oe=R.attributes;let D=0;const Y=G.getAttributes();for(const H in Y)if(Y[H].location>=0){let Z=oe[H];Z===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(Z=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(Z=y.instanceColor));const te={};te.attribute=Z,Z&&Z.data&&(te.data=Z.data),K[H]=te,D++}s.attributes=K,s.attributesNum=D,s.index=k}function _(){const y=s.newAttributes;for(let R=0,G=y.length;R<G;R++)y[R]=0}function m(y){p(y,0)}function p(y,R){const G=s.newAttributes,k=s.enabledAttributes,K=s.attributeDivisors;G[y]=1,k[y]===0&&(r.enableVertexAttribArray(y),k[y]=1),K[y]!==R&&(r.vertexAttribDivisor(y,R),K[y]=R)}function v(){const y=s.newAttributes,R=s.enabledAttributes;for(let G=0,k=R.length;G<k;G++)R[G]!==y[G]&&(r.disableVertexAttribArray(G),R[G]=0)}function M(y,R,G,k,K,oe,D){D===!0?r.vertexAttribIPointer(y,R,G,K,oe):r.vertexAttribPointer(y,R,G,k,K,oe)}function b(y,R,G,k){_();const K=k.attributes,oe=G.getAttributes(),D=R.defaultAttributeValues;for(const Y in oe){const H=oe[Y];if(H.location>=0){let he=K[Y];if(he===void 0&&(Y==="instanceMatrix"&&y.instanceMatrix&&(he=y.instanceMatrix),Y==="instanceColor"&&y.instanceColor&&(he=y.instanceColor)),he!==void 0){const Z=he.normalized,te=he.itemSize,Te=e.get(he);if(Te===void 0)continue;const Pe=Te.buffer,re=Te.type,xe=Te.bytesPerElement,Ne=re===r.INT||re===r.UNSIGNED_INT||he.gpuType===1013;if(he.isInterleavedBufferAttribute){const Ee=he.data,et=Ee.stride,nt=he.offset;if(Ee.isInstancedInterleavedBuffer){for(let ot=0;ot<H.locationSize;ot++)p(H.location+ot,Ee.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=Ee.meshPerAttribute*Ee.count)}else for(let ot=0;ot<H.locationSize;ot++)m(H.location+ot);r.bindBuffer(r.ARRAY_BUFFER,Pe);for(let ot=0;ot<H.locationSize;ot++)M(H.location+ot,te/H.locationSize,re,Z,et*xe,(nt+te/H.locationSize*ot)*xe,Ne)}else{if(he.isInstancedBufferAttribute){for(let Ee=0;Ee<H.locationSize;Ee++)p(H.location+Ee,he.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let Ee=0;Ee<H.locationSize;Ee++)m(H.location+Ee);r.bindBuffer(r.ARRAY_BUFFER,Pe);for(let Ee=0;Ee<H.locationSize;Ee++)M(H.location+Ee,te/H.locationSize,re,Z,te*xe,te/H.locationSize*Ee*xe,Ne)}}else if(D!==void 0){const Z=D[Y];if(Z!==void 0)switch(Z.length){case 2:r.vertexAttrib2fv(H.location,Z);break;case 3:r.vertexAttrib3fv(H.location,Z);break;case 4:r.vertexAttrib4fv(H.location,Z);break;default:r.vertexAttrib1fv(H.location,Z)}}}}v()}function P(){S();for(const y in n){const R=n[y];for(const G in R){const k=R[G];for(const K in k)u(k[K].object),delete k[K];delete R[G]}delete n[y]}}function T(y){if(n[y.id]===void 0)return;const R=n[y.id];for(const G in R){const k=R[G];for(const K in k)u(k[K].object),delete k[K];delete R[G]}delete n[y.id]}function C(y){for(const R in n){const G=n[R];if(G[y.id]===void 0)continue;const k=G[y.id];for(const K in k)u(k[K].object),delete k[K];delete G[y.id]}}function S(){x(),a=!0,s!==i&&(s=i,l(s.object))}function x(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:S,resetDefaultState:x,dispose:P,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:v}}function Pd(r,e,t){let n;function i(l){n=l}function s(l,u){r.drawArrays(n,l,u),t.update(u,n,1)}function a(l,u,h){h!==0&&(r.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function o(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];t.update(d,n,1)}function c(l,u,h,f){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)a(l[g],u[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*f[_];t.update(g,n,1)}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Ld(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==1023&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const S=C===1016&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==1009&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==1015&&!S)}function c(C){if(C==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),v=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),M=r.getParameter(r.MAX_VARYING_VECTORS),b=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,T=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:b,vertexTextures:P,maxSamples:T}}function Dd(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new Ii,o=new Et,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=r.get(h);if(!i||g===null||g.length===0||s&&!m)s?u(null):l();else{const v=s?0:n,M=v*4;let b=p.clippingState||null;c.value=b,b=u(g,f,M,d);for(let P=0;P!==M;++P)b[P]=t[P];p.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=d+_*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,b=d;M!==_;++M,b+=4)a.copy(h[M]).applyMatrix4(v,o),a.normal.toArray(m,b),m[b+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Id(r){let e=new WeakMap;function t(a,o){return o===303?a.mapping=301:o===304&&(a.mapping=302),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===303||o===304)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Vh(c.height);return l.fromEquirectangularTexture(r,a),e.set(a,l),a.addEventListener("dispose",i),t(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class ea extends xl{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const gr=4,Zo=[.125,.215,.35,.446,.526,.582],Yi=20,Aa=new ea,Qo=new Qe;let Ra=null,Ca=0,Pa=0,La=!1;const Ki=(1+Math.sqrt(5))/2,hr=1/Ki,$o=[new N(-Ki,hr,0),new N(Ki,hr,0),new N(-hr,0,Ki),new N(hr,0,Ki),new N(0,Ki,-hr),new N(0,Ki,hr),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class ec{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Ra=this._renderer.getRenderTarget(),Ca=this._renderer.getActiveCubeFace(),Pa=this._renderer.getActiveMipmapLevel(),La=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ic(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ra,Ca,Pa),this._renderer.xr.enabled=La,e.scissorTest=!1,Cs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ra=this._renderer.getRenderTarget(),Ca=this._renderer.getActiveCubeFace(),Pa=this._renderer.getActiveMipmapLevel(),La=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:Cn,depthBuffer:!1},i=tc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tc(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Fd(s)),this._blurMaterial=Nd(s,e,t)}return i}_compileMaterial(e){const t=new Ye(this._lodPlanes[0],e);this._renderer.compile(t,Aa)}_sceneToCubeUV(e,t,n,i){const o=new Nn(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Qo),u.toneMapping=0,u.autoClear=!1;const d=new dn({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),g=new Ye(new Zt,d);let _=!1;const m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,_=!0):(d.color.copy(Qo),_=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):v===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));const M=this._cubeSize;Cs(i,v*M,p>2?M:0,M,M),u.setRenderTarget(i),_&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===301||e.mapping===302;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=ic()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nc());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new Ye(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Cs(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Aa)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=$o[(i-s-1)%$o.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Ye(this._lodPlanes[i],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Yi-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):Yi;m>Yi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Yi}`);const p=[];let v=0;for(let C=0;C<Yi;++C){const S=C/_,x=Math.exp(-S*S/2);p.push(x),C===0?v+=x:C<m&&(v+=2*x)}for(let C=0;C<p.length;C++)p[C]=p[C]/v;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-n;const b=this._sizeLods[i],P=3*b*(i>M-gr?i-M+gr:0),T=4*(this._cubeSize-b);Cs(t,P,T,3*b,2*b),c.setRenderTarget(t),c.render(h,Aa)}}function Fd(r){const e=[],t=[],n=[];let i=r;const s=r-gr+1+Zo.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);t.push(o);let c=1/o;a>r-gr?c=Zo[a-r+gr-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,_=3,m=2,p=1,v=new Float32Array(_*g*d),M=new Float32Array(m*g*d),b=new Float32Array(p*g*d);for(let T=0;T<d;T++){const C=T%3*2/3-1,S=T>2?0:-1,x=[C,S,0,C+2/3,S,0,C+2/3,S+1,0,C,S,0,C+2/3,S+1,0,C,S+1,0];v.set(x,_*g*T),M.set(f,m*g*T);const y=[T,T,T,T,T,T];b.set(y,p*g*T)}const P=new qt;P.setAttribute("position",new zt(v,_)),P.setAttribute("uv",new zt(M,m)),P.setAttribute("faceIndex",new zt(b,p)),e.push(P),i>gr&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function tc(r,e,t){const n=new Ui(r,e,t);return n.texture.mapping=306,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Cs(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Nd(r,e,t){const n=new Float32Array(Yi),i=new N(0,1,0);return new Oi({name:"SphericalGaussianBlur",defines:{n:Yi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:mo(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function nc(){return new Oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:mo(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function ic(){return new Oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function mo(){return`

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
	`}function Ud(r){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===303||c===304,u=c===301||c===302;if(l||u){let h=e.get(o);const f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new ec(r)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const d=o.image;return l&&d&&d.height>0||u&&d&&i(d)?(t===null&&(t=new ec(r)),h=l?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function i(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Od(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Xr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Bd(r,e,t,n){const i={},s=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}f.removeEventListener("dispose",a),delete i[f.id];const d=s.get(f);d&&(e.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,t.memory.geometries++),f}function c(h){const f=h.attributes;for(const g in f)e.update(f[g],r.ARRAY_BUFFER);const d=h.morphAttributes;for(const g in d){const _=d[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],r.ARRAY_BUFFER)}}function l(h){const f=[],d=h.index,g=h.attributes.position;let _=0;if(d!==null){const v=d.array;_=d.version;for(let M=0,b=v.length;M<b;M+=3){const P=v[M+0],T=v[M+1],C=v[M+2];f.push(P,T,T,C,C,P)}}else if(g!==void 0){const v=g.array;_=g.version;for(let M=0,b=v.length/3-1;M<b;M+=3){const P=M+0,T=M+1,C=M+2;f.push(P,T,T,C,C,P)}}else return;const m=new(ul(f)?bl:gl)(f,1);m.version=_;const p=s.get(h);p&&e.remove(p),s.set(h,m)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function kd(r,e,t){let n;function i(f){n=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function c(f,d){r.drawElements(n,d,s,f*a),t.update(d,n,1)}function l(f,d,g){g!==0&&(r.drawElementsInstanced(n,d,s,f*a,g),t.update(d,n,g))}function u(f,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];t.update(m,n,1)}function h(f,d,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/a,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,f,0,_,0,g);let p=0;for(let v=0;v<g;v++)p+=d[v]*_[v];t.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function zd(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Gd(r,e,t){const n=new WeakMap,i=new Ft;function s(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(o);if(f===void 0||f.count!==h){let x=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",x)};f!==void 0&&f.texture.dispose();const d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let M=0;d===!0&&(M=1),g===!0&&(M=2),_===!0&&(M=3);let b=o.attributes.position.count*M,P=1;b>e.maxTextureSize&&(P=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const T=new Float32Array(b*P*4*h),C=new dl(T,b,P,h);C.type=1015,C.needsUpdate=!0;const S=M*4;for(let y=0;y<h;y++){const R=m[y],G=p[y],k=v[y],K=b*P*4*y;for(let oe=0;oe<R.count;oe++){const D=oe*S;d===!0&&(i.fromBufferAttribute(R,oe),T[K+D+0]=i.x,T[K+D+1]=i.y,T[K+D+2]=i.z,T[K+D+3]=0),g===!0&&(i.fromBufferAttribute(G,oe),T[K+D+4]=i.x,T[K+D+5]=i.y,T[K+D+6]=i.z,T[K+D+7]=0),_===!0&&(i.fromBufferAttribute(k,oe),T[K+D+8]=i.x,T[K+D+9]=i.y,T[K+D+10]=i.z,T[K+D+11]=k.itemSize===4?i.w:1)}}f={count:h,texture:C,size:new Be(b,P)},n.set(o,f),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];const g=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(r,"morphTargetBaseInfluence",g),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function Hd(r,e,t,n){let i=new WeakMap;function s(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(i.get(h)!==l&&(e.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return h}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:a}}class yl extends an{constructor(e,t,n,i,s,a,o,c,l,u=1026){if(u!==1026&&u!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===1026&&(n=1014),n===void 0&&u===1027&&(n=1020),super(null,i,s,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:1003,this.minFilter=c!==void 0?c:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Sl=new an,rc=new yl(1,1),El=new dl,Tl=new Ah,wl=new vl,sc=[],ac=[],oc=new Float32Array(16),cc=new Float32Array(9),lc=new Float32Array(4);function Tr(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=sc[i];if(s===void 0&&(s=new Float32Array(i),sc[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function ln(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function hn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function ta(r,e){let t=ac[e];t===void 0&&(t=new Int32Array(e),ac[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Vd(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Wd(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ln(t,e))return;r.uniform2fv(this.addr,e),hn(t,e)}}function Xd(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ln(t,e))return;r.uniform3fv(this.addr,e),hn(t,e)}}function jd(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ln(t,e))return;r.uniform4fv(this.addr,e),hn(t,e)}}function qd(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(ln(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),hn(t,e)}else{if(ln(t,n))return;lc.set(n),r.uniformMatrix2fv(this.addr,!1,lc),hn(t,n)}}function Kd(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(ln(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),hn(t,e)}else{if(ln(t,n))return;cc.set(n),r.uniformMatrix3fv(this.addr,!1,cc),hn(t,n)}}function Yd(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(ln(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),hn(t,e)}else{if(ln(t,n))return;oc.set(n),r.uniformMatrix4fv(this.addr,!1,oc),hn(t,n)}}function Jd(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Zd(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ln(t,e))return;r.uniform2iv(this.addr,e),hn(t,e)}}function Qd(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ln(t,e))return;r.uniform3iv(this.addr,e),hn(t,e)}}function $d(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ln(t,e))return;r.uniform4iv(this.addr,e),hn(t,e)}}function ep(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function tp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ln(t,e))return;r.uniform2uiv(this.addr,e),hn(t,e)}}function np(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ln(t,e))return;r.uniform3uiv(this.addr,e),hn(t,e)}}function ip(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ln(t,e))return;r.uniform4uiv(this.addr,e),hn(t,e)}}function rp(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(rc.compareFunction=515,s=rc):s=Sl,t.setTexture2D(e||s,i)}function sp(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Tl,i)}function ap(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||wl,i)}function op(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||El,i)}function cp(r){switch(r){case 5126:return Vd;case 35664:return Wd;case 35665:return Xd;case 35666:return jd;case 35674:return qd;case 35675:return Kd;case 35676:return Yd;case 5124:case 35670:return Jd;case 35667:case 35671:return Zd;case 35668:case 35672:return Qd;case 35669:case 35673:return $d;case 5125:return ep;case 36294:return tp;case 36295:return np;case 36296:return ip;case 35678:case 36198:case 36298:case 36306:case 35682:return rp;case 35679:case 36299:case 36307:return sp;case 35680:case 36300:case 36308:case 36293:return ap;case 36289:case 36303:case 36311:case 36292:return op}}function lp(r,e){r.uniform1fv(this.addr,e)}function hp(r,e){const t=Tr(e,this.size,2);r.uniform2fv(this.addr,t)}function up(r,e){const t=Tr(e,this.size,3);r.uniform3fv(this.addr,t)}function fp(r,e){const t=Tr(e,this.size,4);r.uniform4fv(this.addr,t)}function dp(r,e){const t=Tr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function pp(r,e){const t=Tr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function mp(r,e){const t=Tr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function gp(r,e){r.uniform1iv(this.addr,e)}function bp(r,e){r.uniform2iv(this.addr,e)}function _p(r,e){r.uniform3iv(this.addr,e)}function xp(r,e){r.uniform4iv(this.addr,e)}function vp(r,e){r.uniform1uiv(this.addr,e)}function Mp(r,e){r.uniform2uiv(this.addr,e)}function yp(r,e){r.uniform3uiv(this.addr,e)}function Sp(r,e){r.uniform4uiv(this.addr,e)}function Ep(r,e,t){const n=this.cache,i=e.length,s=ta(t,i);ln(n,s)||(r.uniform1iv(this.addr,s),hn(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Sl,s[a])}function Tp(r,e,t){const n=this.cache,i=e.length,s=ta(t,i);ln(n,s)||(r.uniform1iv(this.addr,s),hn(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Tl,s[a])}function wp(r,e,t){const n=this.cache,i=e.length,s=ta(t,i);ln(n,s)||(r.uniform1iv(this.addr,s),hn(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||wl,s[a])}function Ap(r,e,t){const n=this.cache,i=e.length,s=ta(t,i);ln(n,s)||(r.uniform1iv(this.addr,s),hn(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||El,s[a])}function Rp(r){switch(r){case 5126:return lp;case 35664:return hp;case 35665:return up;case 35666:return fp;case 35674:return dp;case 35675:return pp;case 35676:return mp;case 5124:case 35670:return gp;case 35667:case 35671:return bp;case 35668:case 35672:return _p;case 35669:case 35673:return xp;case 5125:return vp;case 36294:return Mp;case 36295:return yp;case 36296:return Sp;case 35678:case 36198:case 36298:case 36306:case 35682:return Ep;case 35679:case 36299:case 36307:return Tp;case 35680:case 36300:case 36308:case 36293:return wp;case 36289:case 36303:case 36311:case 36292:return Ap}}class Cp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=cp(t.type)}}class Pp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Rp(t.type)}}class Lp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const Da=/(\w+)(\])?(\[|\.)?/g;function hc(r,e){r.seq.push(e),r.map[e.id]=e}function Dp(r,e,t){const n=r.name,i=n.length;for(Da.lastIndex=0;;){const s=Da.exec(n),a=Da.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){hc(t,l===void 0?new Cp(o,r,e):new Pp(o,r,e));break}else{let h=t.map[o];h===void 0&&(h=new Lp(o),hc(t,h)),t=h}}}class js{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),a=e.getUniformLocation(t,s.name);Dp(s,a,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function uc(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const Ip=37297;let Fp=0;function Np(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const fc=new Et;function Up(r){It._getMatrix(fc,It.workingColorSpace,r);const e=`mat3( ${fc.elements.map(t=>t.toFixed(4))} )`;switch(It.getTransfer(r)){case Qs:return[e,"LinearTransferOETF"];case Wt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function dc(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+Np(r.getShaderSource(e),a)}else return i}function Op(r,e){const t=Up(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Bp(r,e){let t;switch(e){case 1:t="Linear";break;case 2:t="Reinhard";break;case 3:t="Cineon";break;case 4:t="ACESFilmic";break;case 6:t="AgX";break;case 7:t="Neutral";break;case 5:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ps=new N;function kp(){It.getLuminanceCoefficients(Ps);const r=Ps.x.toFixed(4),e=Ps.y.toFixed(4),t=Ps.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function zp(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(jr).join(`
`)}function Gp(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Hp(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function jr(r){return r!==""}function pc(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function mc(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Vp=/^[ \t]*#include +<([\w\d./]+)>/gm;function no(r){return r.replace(Vp,Xp)}const Wp=new Map;function Xp(r,e){let t=wt[e];if(t===void 0){const n=Wp.get(e);if(n!==void 0)t=wt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return no(t)}const jp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gc(r){return r.replace(jp,qp)}function qp(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function bc(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Kp(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===1?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===2?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===3&&(e="SHADOWMAP_TYPE_VSM"),e}function Yp(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case 301:case 302:e="ENVMAP_TYPE_CUBE";break;case 306:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Jp(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case 302:e="ENVMAP_MODE_REFRACTION";break}return e}function Zp(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case 0:e="ENVMAP_BLENDING_MULTIPLY";break;case 1:e="ENVMAP_BLENDING_MIX";break;case 2:e="ENVMAP_BLENDING_ADD";break}return e}function Qp(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function $p(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Kp(t),l=Yp(t),u=Jp(t),h=Zp(t),f=Qp(t),d=zp(t),g=Gp(s),_=i.createProgram();let m,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(jr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(jr).join(`
`),p.length>0&&(p+=`
`)):(m=[bc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(jr).join(`
`),p=[bc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?wt.tonemapping_pars_fragment:"",t.toneMapping!==0?Bp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",wt.colorspace_pars_fragment,Op("linearToOutputTexel",t.outputColorSpace),kp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(jr).join(`
`)),a=no(a),a=pc(a,t),a=mc(a,t),o=no(o),o=pc(o,t),o=mc(o,t),a=gc(a),o=gc(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Co?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Co?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=v+m+a,b=v+p+o,P=uc(i,i.VERTEX_SHADER,M),T=uc(i,i.FRAGMENT_SHADER,b);i.attachShader(_,P),i.attachShader(_,T),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function C(R){if(r.debug.checkShaderErrors){const G=i.getProgramInfoLog(_).trim(),k=i.getShaderInfoLog(P).trim(),K=i.getShaderInfoLog(T).trim();let oe=!0,D=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(oe=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,P,T);else{const Y=dc(i,P,"vertex"),H=dc(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+G+`
`+Y+`
`+H)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(k===""||K==="")&&(D=!1);D&&(R.diagnostics={runnable:oe,programLog:G,vertexShader:{log:k,prefix:m},fragmentShader:{log:K,prefix:p}})}i.deleteShader(P),i.deleteShader(T),S=new js(i,_),x=Hp(i,_)}let S;this.getUniforms=function(){return S===void 0&&C(this),S};let x;this.getAttributes=function(){return x===void 0&&C(this),x};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(_,Ip)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Fp++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=T,this}let em=0;class tm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new nm(e),t.set(e,n)),n}}class nm{constructor(e){this.id=em++,this.code=e,this.usedTimes=0}}function im(r,e,t,n,i,s,a){const o=new pl,c=new tm,l=new Set,u=[],h=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,y,R,G,k){const K=G.fog,oe=k.geometry,D=x.isMeshStandardMaterial?G.environment:null,Y=(x.isMeshStandardMaterial?t:e).get(x.envMap||D),H=Y&&Y.mapping===306?Y.image.height:null,he=g[x.type];x.precision!==null&&(d=i.getMaxPrecision(x.precision),d!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const Z=oe.morphAttributes.position||oe.morphAttributes.normal||oe.morphAttributes.color,te=Z!==void 0?Z.length:0;let Te=0;oe.morphAttributes.position!==void 0&&(Te=1),oe.morphAttributes.normal!==void 0&&(Te=2),oe.morphAttributes.color!==void 0&&(Te=3);let Pe,re,xe,Ne;if(he){const Rt=si[he];Pe=Rt.vertexShader,re=Rt.fragmentShader}else Pe=x.vertexShader,re=x.fragmentShader,c.update(x),xe=c.getVertexShaderID(x),Ne=c.getFragmentShaderID(x);const Ee=r.getRenderTarget(),et=r.state.buffers.depth.getReversed(),nt=k.isInstancedMesh===!0,ot=k.isBatchedMesh===!0,Mt=!!x.map,ut=!!x.matcap,_t=!!Y,J=!!x.aoMap,Gt=!!x.lightMap,ft=!!x.bumpMap,ht=!!x.normalMap,Je=!!x.displacementMap,At=!!x.emissiveMap,Ke=!!x.metalnessMap,I=!!x.roughnessMap,w=x.anisotropy>0,$=x.clearcoat>0,ve=x.dispersion>0,ye=x.iridescence>0,de=x.sheen>0,Fe=x.transmission>0,Ce=w&&!!x.anisotropyMap,Le=$&&!!x.clearcoatMap,St=$&&!!x.clearcoatNormalMap,Ae=$&&!!x.clearcoatRoughnessMap,ne=ye&&!!x.iridescenceMap,tt=ye&&!!x.iridescenceThicknessMap,rt=de&&!!x.sheenColorMap,Ge=de&&!!x.sheenRoughnessMap,pt=!!x.specularMap,xt=!!x.specularColorMap,Bt=!!x.specularIntensityMap,j=Fe&&!!x.transmissionMap,Ie=Fe&&!!x.thicknessMap,fe=!!x.gradientMap,me=!!x.alphaMap,Ue=x.alphaTest>0,ke=!!x.alphaHash,He=!!x.extensions;let Nt=0;x.toneMapped&&(Ee===null||Ee.isXRRenderTarget===!0)&&(Nt=r.toneMapping);const kt={shaderID:he,shaderType:x.type,shaderName:x.name,vertexShader:Pe,fragmentShader:re,defines:x.defines,customVertexShaderID:xe,customFragmentShaderID:Ne,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:ot,batchingColor:ot&&k._colorsTexture!==null,instancing:nt,instancingColor:nt&&k.instanceColor!==null,instancingMorph:nt&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Ee===null?r.outputColorSpace:Ee.isXRRenderTarget===!0?Ee.texture.colorSpace:Cn,alphaToCoverage:!!x.alphaToCoverage,map:Mt,matcap:ut,envMap:_t,envMapMode:_t&&Y.mapping,envMapCubeUVHeight:H,aoMap:J,lightMap:Gt,bumpMap:ft,normalMap:ht,displacementMap:f&&Je,emissiveMap:At,normalMapObjectSpace:ht&&x.normalMapType===1,normalMapTangentSpace:ht&&x.normalMapType===0,metalnessMap:Ke,roughnessMap:I,anisotropy:w,anisotropyMap:Ce,clearcoat:$,clearcoatMap:Le,clearcoatNormalMap:St,clearcoatRoughnessMap:Ae,dispersion:ve,iridescence:ye,iridescenceMap:ne,iridescenceThicknessMap:tt,sheen:de,sheenColorMap:rt,sheenRoughnessMap:Ge,specularMap:pt,specularColorMap:xt,specularIntensityMap:Bt,transmission:Fe,transmissionMap:j,thicknessMap:Ie,gradientMap:fe,opaque:x.transparent===!1&&x.blending===1&&x.alphaToCoverage===!1,alphaMap:me,alphaTest:Ue,alphaHash:ke,combine:x.combine,mapUv:Mt&&_(x.map.channel),aoMapUv:J&&_(x.aoMap.channel),lightMapUv:Gt&&_(x.lightMap.channel),bumpMapUv:ft&&_(x.bumpMap.channel),normalMapUv:ht&&_(x.normalMap.channel),displacementMapUv:Je&&_(x.displacementMap.channel),emissiveMapUv:At&&_(x.emissiveMap.channel),metalnessMapUv:Ke&&_(x.metalnessMap.channel),roughnessMapUv:I&&_(x.roughnessMap.channel),anisotropyMapUv:Ce&&_(x.anisotropyMap.channel),clearcoatMapUv:Le&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:St&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:rt&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:Ge&&_(x.sheenRoughnessMap.channel),specularMapUv:pt&&_(x.specularMap.channel),specularColorMapUv:xt&&_(x.specularColorMap.channel),specularIntensityMapUv:Bt&&_(x.specularIntensityMap.channel),transmissionMapUv:j&&_(x.transmissionMap.channel),thicknessMapUv:Ie&&_(x.thicknessMap.channel),alphaMapUv:me&&_(x.alphaMap.channel),vertexTangents:!!oe.attributes.tangent&&(ht||w),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!oe.attributes.color&&oe.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!oe.attributes.uv&&(Mt||me),fog:!!K,useFog:x.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:et,skinning:k.isSkinnedMesh===!0,morphTargets:oe.morphAttributes.position!==void 0,morphNormals:oe.morphAttributes.normal!==void 0,morphColors:oe.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:Te,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:r.shadowMap.enabled&&R.length>0,shadowMapType:r.shadowMap.type,toneMapping:Nt,decodeVideoTexture:Mt&&x.map.isVideoTexture===!0&&It.getTransfer(x.map.colorSpace)===Wt,decodeVideoTextureEmissive:At&&x.emissiveMap.isVideoTexture===!0&&It.getTransfer(x.emissiveMap.colorSpace)===Wt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===2,flipSided:x.side===1,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:He&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(He&&x.extensions.multiDraw===!0||ot)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return kt.vertexUv1s=l.has(1),kt.vertexUv2s=l.has(2),kt.vertexUv3s=l.has(3),l.clear(),kt}function p(x){const y=[];if(x.shaderID?y.push(x.shaderID):(y.push(x.customVertexShaderID),y.push(x.customFragmentShaderID)),x.defines!==void 0)for(const R in x.defines)y.push(R),y.push(x.defines[R]);return x.isRawShaderMaterial===!1&&(v(y,x),M(y,x),y.push(r.outputColorSpace)),y.push(x.customProgramCacheKey),y.join()}function v(x,y){x.push(y.precision),x.push(y.outputColorSpace),x.push(y.envMapMode),x.push(y.envMapCubeUVHeight),x.push(y.mapUv),x.push(y.alphaMapUv),x.push(y.lightMapUv),x.push(y.aoMapUv),x.push(y.bumpMapUv),x.push(y.normalMapUv),x.push(y.displacementMapUv),x.push(y.emissiveMapUv),x.push(y.metalnessMapUv),x.push(y.roughnessMapUv),x.push(y.anisotropyMapUv),x.push(y.clearcoatMapUv),x.push(y.clearcoatNormalMapUv),x.push(y.clearcoatRoughnessMapUv),x.push(y.iridescenceMapUv),x.push(y.iridescenceThicknessMapUv),x.push(y.sheenColorMapUv),x.push(y.sheenRoughnessMapUv),x.push(y.specularMapUv),x.push(y.specularColorMapUv),x.push(y.specularIntensityMapUv),x.push(y.transmissionMapUv),x.push(y.thicknessMapUv),x.push(y.combine),x.push(y.fogExp2),x.push(y.sizeAttenuation),x.push(y.morphTargetsCount),x.push(y.morphAttributeCount),x.push(y.numDirLights),x.push(y.numPointLights),x.push(y.numSpotLights),x.push(y.numSpotLightMaps),x.push(y.numHemiLights),x.push(y.numRectAreaLights),x.push(y.numDirLightShadows),x.push(y.numPointLightShadows),x.push(y.numSpotLightShadows),x.push(y.numSpotLightShadowsWithMaps),x.push(y.numLightProbes),x.push(y.shadowMapType),x.push(y.toneMapping),x.push(y.numClippingPlanes),x.push(y.numClipIntersection),x.push(y.depthPacking)}function M(x,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),x.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),x.push(o.mask)}function b(x){const y=g[x.type];let R;if(y){const G=si[y];R=kh.clone(G.uniforms)}else R=x.uniforms;return R}function P(x,y){let R;for(let G=0,k=u.length;G<k;G++){const K=u[G];if(K.cacheKey===y){R=K,++R.usedTimes;break}}return R===void 0&&(R=new $p(r,y,x,s),u.push(R)),R}function T(x){if(--x.usedTimes===0){const y=u.indexOf(x);u[y]=u[u.length-1],u.pop(),x.destroy()}}function C(x){c.remove(x)}function S(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:b,acquireProgram:P,releaseProgram:T,releaseShaderCache:C,programs:u,dispose:S}}function rm(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,c){r.get(a)[o]=c}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function sm(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function _c(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function xc(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(h,f,d,g,_,m){let p=r[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},r[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),e++,p}function o(h,f,d,g,_,m){const p=a(h,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):t.push(p)}function c(h,f,d,g,_,m){const p=a(h,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):t.unshift(p)}function l(h,f){t.length>1&&t.sort(h||sm),n.length>1&&n.sort(f||_c),i.length>1&&i.sort(f||_c)}function u(){for(let h=e,f=r.length;h<f;h++){const d=r[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:c,finish:u,sort:l}}function am(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new xc,r.set(n,[a])):i>=s.length?(a=new xc,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function om(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new Qe};break;case"SpotLight":t={position:new N,direction:new N,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new N,halfWidth:new N,halfHeight:new N};break}return r[e.id]=t,t}}}function cm(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let lm=0;function hm(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function um(r){const e=new om,t=cm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);const i=new N,s=new $e,a=new $e;function o(l){let u=0,h=0,f=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,v=0,M=0,b=0,P=0,T=0,C=0;l.sort(hm);for(let x=0,y=l.length;x<y;x++){const R=l[x],G=R.color,k=R.intensity,K=R.distance,oe=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=G.r*k,h+=G.g*k,f+=G.b*k;else if(R.isLightProbe){for(let D=0;D<9;D++)n.probe[D].addScaledVector(R.sh.coefficients[D],k);C++}else if(R.isDirectionalLight){const D=e.get(R);if(D.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const Y=R.shadow,H=t.get(R);H.shadowIntensity=Y.intensity,H.shadowBias=Y.bias,H.shadowNormalBias=Y.normalBias,H.shadowRadius=Y.radius,H.shadowMapSize=Y.mapSize,n.directionalShadow[d]=H,n.directionalShadowMap[d]=oe,n.directionalShadowMatrix[d]=R.shadow.matrix,v++}n.directional[d]=D,d++}else if(R.isSpotLight){const D=e.get(R);D.position.setFromMatrixPosition(R.matrixWorld),D.color.copy(G).multiplyScalar(k),D.distance=K,D.coneCos=Math.cos(R.angle),D.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),D.decay=R.decay,n.spot[_]=D;const Y=R.shadow;if(R.map&&(n.spotLightMap[P]=R.map,P++,Y.updateMatrices(R),R.castShadow&&T++),n.spotLightMatrix[_]=Y.matrix,R.castShadow){const H=t.get(R);H.shadowIntensity=Y.intensity,H.shadowBias=Y.bias,H.shadowNormalBias=Y.normalBias,H.shadowRadius=Y.radius,H.shadowMapSize=Y.mapSize,n.spotShadow[_]=H,n.spotShadowMap[_]=oe,b++}_++}else if(R.isRectAreaLight){const D=e.get(R);D.color.copy(G).multiplyScalar(k),D.halfWidth.set(R.width*.5,0,0),D.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=D,m++}else if(R.isPointLight){const D=e.get(R);if(D.color.copy(R.color).multiplyScalar(R.intensity),D.distance=R.distance,D.decay=R.decay,R.castShadow){const Y=R.shadow,H=t.get(R);H.shadowIntensity=Y.intensity,H.shadowBias=Y.bias,H.shadowNormalBias=Y.normalBias,H.shadowRadius=Y.radius,H.shadowMapSize=Y.mapSize,H.shadowCameraNear=Y.camera.near,H.shadowCameraFar=Y.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=oe,n.pointShadowMatrix[g]=R.shadow.matrix,M++}n.point[g]=D,g++}else if(R.isHemisphereLight){const D=e.get(R);D.skyColor.copy(R.color).multiplyScalar(k),D.groundColor.copy(R.groundColor).multiplyScalar(k),n.hemi[p]=D,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=We.LTC_FLOAT_1,n.rectAreaLTC2=We.LTC_FLOAT_2):(n.rectAreaLTC1=We.LTC_HALF_1,n.rectAreaLTC2=We.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const S=n.hash;(S.directionalLength!==d||S.pointLength!==g||S.spotLength!==_||S.rectAreaLength!==m||S.hemiLength!==p||S.numDirectionalShadows!==v||S.numPointShadows!==M||S.numSpotShadows!==b||S.numSpotMaps!==P||S.numLightProbes!==C)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=b+P-T,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=C,S.directionalLength=d,S.pointLength=g,S.spotLength=_,S.rectAreaLength=m,S.hemiLength=p,S.numDirectionalShadows=v,S.numPointShadows=M,S.numSpotShadows=b,S.numSpotMaps=P,S.numLightProbes=C,n.version=lm++)}function c(l,u){let h=0,f=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,v=l.length;p<v;p++){const M=l[p];if(M.isDirectionalLight){const b=n.directional[h];b.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(m),h++}else if(M.isSpotLight){const b=n.spot[d];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const b=n.rectArea[g];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(m),a.identity(),s.copy(M.matrixWorld),s.premultiply(m),a.extractRotation(s),b.halfWidth.set(M.width*.5,0,0),b.halfHeight.set(0,M.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const b=n.point[f];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const b=n.hemi[_];b.direction.setFromMatrixPosition(M.matrixWorld),b.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:n}}function vc(r){const e=new um(r),t=[],n=[];function i(u){l.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function fm(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new vc(r),e.set(i,[o])):s>=a.length?(o=new vc(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class dm extends Yn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class pm extends Yn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const mm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gm=`uniform sampler2D shadow_pass;
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
}`;function bm(r,e,t){let n=new po;const i=new Be,s=new Be,a=new Ft,o=new dm({depthPacking:3201}),c=new pm,l={},u=t.maxTextureSize,h={0:1,1:0,2:2},f=new Oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Be},radius:{value:4}},vertexShader:mm,fragmentShader:gm}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new qt;g.setAttribute("position",new zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ye(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let p=this.type;this.render=function(T,C,S){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const x=r.getRenderTarget(),y=r.getActiveCubeFace(),R=r.getActiveMipmapLevel(),G=r.state;G.setBlending(0),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const k=p!==3&&this.type===3,K=p===3&&this.type!==3;for(let oe=0,D=T.length;oe<D;oe++){const Y=T[oe],H=Y.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const he=H.getFrameExtents();if(i.multiply(he),s.copy(H.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/he.x),i.x=s.x*he.x,H.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/he.y),i.y=s.y*he.y,H.mapSize.y=s.y)),H.map===null||k===!0||K===!0){const te=this.type!==3?{minFilter:1003,magFilter:1003}:{};H.map!==null&&H.map.dispose(),H.map=new Ui(i.x,i.y,te),H.map.texture.name=Y.name+".shadowMap",H.camera.updateProjectionMatrix()}r.setRenderTarget(H.map),r.clear();const Z=H.getViewportCount();for(let te=0;te<Z;te++){const Te=H.getViewport(te);a.set(s.x*Te.x,s.y*Te.y,s.x*Te.z,s.y*Te.w),G.viewport(a),H.updateMatrices(Y,te),n=H.getFrustum(),b(C,S,H.camera,Y,this.type)}H.isPointLightShadow!==!0&&this.type===3&&v(H,S),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(x,y,R)};function v(T,C){const S=e.update(_);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Ui(i.x,i.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(C,null,S,f,_,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(C,null,S,d,_,null)}function M(T,C,S,x){let y=null;const R=S.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)y=R;else if(y=S.isPointLight===!0?c:o,r.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const G=y.uuid,k=C.uuid;let K=l[G];K===void 0&&(K={},l[G]=K);let oe=K[k];oe===void 0&&(oe=y.clone(),K[k]=oe,C.addEventListener("dispose",P)),y=oe}if(y.visible=C.visible,y.wireframe=C.wireframe,x===3?y.side=C.shadowSide!==null?C.shadowSide:C.side:y.side=C.shadowSide!==null?C.shadowSide:h[C.side],y.alphaMap=C.alphaMap,y.alphaTest=C.alphaTest,y.map=C.map,y.clipShadows=C.clipShadows,y.clippingPlanes=C.clippingPlanes,y.clipIntersection=C.clipIntersection,y.displacementMap=C.displacementMap,y.displacementScale=C.displacementScale,y.displacementBias=C.displacementBias,y.wireframeLinewidth=C.wireframeLinewidth,y.linewidth=C.linewidth,S.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const G=r.properties.get(y);G.light=S}return y}function b(T,C,S,x,y){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&y===3)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,T.matrixWorld);const k=e.update(T),K=T.material;if(Array.isArray(K)){const oe=k.groups;for(let D=0,Y=oe.length;D<Y;D++){const H=oe[D],he=K[H.materialIndex];if(he&&he.visible){const Z=M(T,he,x,y);T.onBeforeShadow(r,T,C,S,k,Z,H),r.renderBufferDirect(S,null,k,Z,T,H),T.onAfterShadow(r,T,C,S,k,Z,H)}}}else if(K.visible){const oe=M(T,K,x,y);T.onBeforeShadow(r,T,C,S,k,oe,null),r.renderBufferDirect(S,null,k,oe,T,null),T.onAfterShadow(r,T,C,S,k,oe,null)}}const G=T.children;for(let k=0,K=G.length;k<K;k++)b(G[k],C,S,x,y)}function P(T){T.target.removeEventListener("dispose",P);for(const S in l){const x=l[S],y=T.target.uuid;y in x&&(x[y].dispose(),delete x[y])}}}const _m={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function xm(r,e){function t(){let j=!1;const Ie=new Ft;let fe=null;const me=new Ft(0,0,0,0);return{setMask:function(Ue){fe!==Ue&&!j&&(r.colorMask(Ue,Ue,Ue,Ue),fe=Ue)},setLocked:function(Ue){j=Ue},setClear:function(Ue,ke,He,Nt,kt){kt===!0&&(Ue*=Nt,ke*=Nt,He*=Nt),Ie.set(Ue,ke,He,Nt),me.equals(Ie)===!1&&(r.clearColor(Ue,ke,He,Nt),me.copy(Ie))},reset:function(){j=!1,fe=null,me.set(-1,0,0,0)}}}function n(){let j=!1,Ie=!1,fe=null,me=null,Ue=null;return{setReversed:function(ke){if(Ie!==ke){const He=e.get("EXT_clip_control");Ie?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT);const Nt=Ue;Ue=null,this.setClear(Nt)}Ie=ke},getReversed:function(){return Ie},setTest:function(ke){ke?Ee(r.DEPTH_TEST):et(r.DEPTH_TEST)},setMask:function(ke){fe!==ke&&!j&&(r.depthMask(ke),fe=ke)},setFunc:function(ke){if(Ie&&(ke=_m[ke]),me!==ke){switch(ke){case 0:r.depthFunc(r.NEVER);break;case 1:r.depthFunc(r.ALWAYS);break;case 2:r.depthFunc(r.LESS);break;case 3:r.depthFunc(r.LEQUAL);break;case 4:r.depthFunc(r.EQUAL);break;case 5:r.depthFunc(r.GEQUAL);break;case 6:r.depthFunc(r.GREATER);break;case 7:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}me=ke}},setLocked:function(ke){j=ke},setClear:function(ke){Ue!==ke&&(Ie&&(ke=1-ke),r.clearDepth(ke),Ue=ke)},reset:function(){j=!1,fe=null,me=null,Ue=null,Ie=!1}}}function i(){let j=!1,Ie=null,fe=null,me=null,Ue=null,ke=null,He=null,Nt=null,kt=null;return{setTest:function(Rt){j||(Rt?Ee(r.STENCIL_TEST):et(r.STENCIL_TEST))},setMask:function(Rt){Ie!==Rt&&!j&&(r.stencilMask(Rt),Ie=Rt)},setFunc:function(Rt,rn,en){(fe!==Rt||me!==rn||Ue!==en)&&(r.stencilFunc(Rt,rn,en),fe=Rt,me=rn,Ue=en)},setOp:function(Rt,rn,en){(ke!==Rt||He!==rn||Nt!==en)&&(r.stencilOp(Rt,rn,en),ke=Rt,He=rn,Nt=en)},setLocked:function(Rt){j=Rt},setClear:function(Rt){kt!==Rt&&(r.clearStencil(Rt),kt=Rt)},reset:function(){j=!1,Ie=null,fe=null,me=null,Ue=null,ke=null,He=null,Nt=null,kt=null}}}const s=new t,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let u={},h={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,v=null,M=null,b=null,P=null,T=null,C=new Qe(0,0,0),S=0,x=!1,y=null,R=null,G=null,k=null,K=null;const oe=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let D=!1,Y=0;const H=r.getParameter(r.VERSION);H.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(H)[1]),D=Y>=1):H.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),D=Y>=2);let he=null,Z={};const te=r.getParameter(r.SCISSOR_BOX),Te=r.getParameter(r.VIEWPORT),Pe=new Ft().fromArray(te),re=new Ft().fromArray(Te);function xe(j,Ie,fe,me){const Ue=new Uint8Array(4),ke=r.createTexture();r.bindTexture(j,ke),r.texParameteri(j,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(j,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let He=0;He<fe;He++)j===r.TEXTURE_3D||j===r.TEXTURE_2D_ARRAY?r.texImage3D(Ie,0,r.RGBA,1,1,me,0,r.RGBA,r.UNSIGNED_BYTE,Ue):r.texImage2D(Ie+He,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ue);return ke}const Ne={};Ne[r.TEXTURE_2D]=xe(r.TEXTURE_2D,r.TEXTURE_2D,1),Ne[r.TEXTURE_CUBE_MAP]=xe(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ne[r.TEXTURE_2D_ARRAY]=xe(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Ne[r.TEXTURE_3D]=xe(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Ee(r.DEPTH_TEST),a.setFunc(3),ft(!1),ht(1),Ee(r.CULL_FACE),J(0);function Ee(j){u[j]!==!0&&(r.enable(j),u[j]=!0)}function et(j){u[j]!==!1&&(r.disable(j),u[j]=!1)}function nt(j,Ie){return h[j]!==Ie?(r.bindFramebuffer(j,Ie),h[j]=Ie,j===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=Ie),j===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=Ie),!0):!1}function ot(j,Ie){let fe=d,me=!1;if(j){fe=f.get(Ie),fe===void 0&&(fe=[],f.set(Ie,fe));const Ue=j.textures;if(fe.length!==Ue.length||fe[0]!==r.COLOR_ATTACHMENT0){for(let ke=0,He=Ue.length;ke<He;ke++)fe[ke]=r.COLOR_ATTACHMENT0+ke;fe.length=Ue.length,me=!0}}else fe[0]!==r.BACK&&(fe[0]=r.BACK,me=!0);me&&r.drawBuffers(fe)}function Mt(j){return g!==j?(r.useProgram(j),g=j,!0):!1}const ut={100:r.FUNC_ADD,101:r.FUNC_SUBTRACT,102:r.FUNC_REVERSE_SUBTRACT};ut[103]=r.MIN,ut[104]=r.MAX;const _t={200:r.ZERO,201:r.ONE,202:r.SRC_COLOR,204:r.SRC_ALPHA,210:r.SRC_ALPHA_SATURATE,208:r.DST_COLOR,206:r.DST_ALPHA,203:r.ONE_MINUS_SRC_COLOR,205:r.ONE_MINUS_SRC_ALPHA,209:r.ONE_MINUS_DST_COLOR,207:r.ONE_MINUS_DST_ALPHA,211:r.CONSTANT_COLOR,212:r.ONE_MINUS_CONSTANT_COLOR,213:r.CONSTANT_ALPHA,214:r.ONE_MINUS_CONSTANT_ALPHA};function J(j,Ie,fe,me,Ue,ke,He,Nt,kt,Rt){if(j===0){_===!0&&(et(r.BLEND),_=!1);return}if(_===!1&&(Ee(r.BLEND),_=!0),j!==5){if(j!==m||Rt!==x){if((p!==100||b!==100)&&(r.blendEquation(r.FUNC_ADD),p=100,b=100),Rt)switch(j){case 1:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case 2:r.blendFunc(r.ONE,r.ONE);break;case 3:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case 4:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",j);break}else switch(j){case 1:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case 2:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case 3:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case 4:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",j);break}v=null,M=null,P=null,T=null,C.set(0,0,0),S=0,m=j,x=Rt}return}Ue=Ue||Ie,ke=ke||fe,He=He||me,(Ie!==p||Ue!==b)&&(r.blendEquationSeparate(ut[Ie],ut[Ue]),p=Ie,b=Ue),(fe!==v||me!==M||ke!==P||He!==T)&&(r.blendFuncSeparate(_t[fe],_t[me],_t[ke],_t[He]),v=fe,M=me,P=ke,T=He),(Nt.equals(C)===!1||kt!==S)&&(r.blendColor(Nt.r,Nt.g,Nt.b,kt),C.copy(Nt),S=kt),m=j,x=!1}function Gt(j,Ie){j.side===2?et(r.CULL_FACE):Ee(r.CULL_FACE);let fe=j.side===1;Ie&&(fe=!fe),ft(fe),j.blending===1&&j.transparent===!1?J(0):J(j.blending,j.blendEquation,j.blendSrc,j.blendDst,j.blendEquationAlpha,j.blendSrcAlpha,j.blendDstAlpha,j.blendColor,j.blendAlpha,j.premultipliedAlpha),a.setFunc(j.depthFunc),a.setTest(j.depthTest),a.setMask(j.depthWrite),s.setMask(j.colorWrite);const me=j.stencilWrite;o.setTest(me),me&&(o.setMask(j.stencilWriteMask),o.setFunc(j.stencilFunc,j.stencilRef,j.stencilFuncMask),o.setOp(j.stencilFail,j.stencilZFail,j.stencilZPass)),At(j.polygonOffset,j.polygonOffsetFactor,j.polygonOffsetUnits),j.alphaToCoverage===!0?Ee(r.SAMPLE_ALPHA_TO_COVERAGE):et(r.SAMPLE_ALPHA_TO_COVERAGE)}function ft(j){y!==j&&(j?r.frontFace(r.CW):r.frontFace(r.CCW),y=j)}function ht(j){j!==0?(Ee(r.CULL_FACE),j!==R&&(j===1?r.cullFace(r.BACK):j===2?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):et(r.CULL_FACE),R=j}function Je(j){j!==G&&(D&&r.lineWidth(j),G=j)}function At(j,Ie,fe){j?(Ee(r.POLYGON_OFFSET_FILL),(k!==Ie||K!==fe)&&(r.polygonOffset(Ie,fe),k=Ie,K=fe)):et(r.POLYGON_OFFSET_FILL)}function Ke(j){j?Ee(r.SCISSOR_TEST):et(r.SCISSOR_TEST)}function I(j){j===void 0&&(j=r.TEXTURE0+oe-1),he!==j&&(r.activeTexture(j),he=j)}function w(j,Ie,fe){fe===void 0&&(he===null?fe=r.TEXTURE0+oe-1:fe=he);let me=Z[fe];me===void 0&&(me={type:void 0,texture:void 0},Z[fe]=me),(me.type!==j||me.texture!==Ie)&&(he!==fe&&(r.activeTexture(fe),he=fe),r.bindTexture(j,Ie||Ne[j]),me.type=j,me.texture=Ie)}function $(){const j=Z[he];j!==void 0&&j.type!==void 0&&(r.bindTexture(j.type,null),j.type=void 0,j.texture=void 0)}function ve(){try{r.compressedTexImage2D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function ye(){try{r.compressedTexImage3D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function de(){try{r.texSubImage2D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Fe(){try{r.texSubImage3D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Ce(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Le(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function St(){try{r.texStorage2D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Ae(){try{r.texStorage3D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function ne(){try{r.texImage2D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function tt(){try{r.texImage3D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function rt(j){Pe.equals(j)===!1&&(r.scissor(j.x,j.y,j.z,j.w),Pe.copy(j))}function Ge(j){re.equals(j)===!1&&(r.viewport(j.x,j.y,j.z,j.w),re.copy(j))}function pt(j,Ie){let fe=l.get(Ie);fe===void 0&&(fe=new WeakMap,l.set(Ie,fe));let me=fe.get(j);me===void 0&&(me=r.getUniformBlockIndex(Ie,j.name),fe.set(j,me))}function xt(j,Ie){const me=l.get(Ie).get(j);c.get(Ie)!==me&&(r.uniformBlockBinding(Ie,me,j.__bindingPointIndex),c.set(Ie,me))}function Bt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},he=null,Z={},h={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,v=null,M=null,b=null,P=null,T=null,C=new Qe(0,0,0),S=0,x=!1,y=null,R=null,G=null,k=null,K=null,Pe.set(0,0,r.canvas.width,r.canvas.height),re.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:Ee,disable:et,bindFramebuffer:nt,drawBuffers:ot,useProgram:Mt,setBlending:J,setMaterial:Gt,setFlipSided:ft,setCullFace:ht,setLineWidth:Je,setPolygonOffset:At,setScissorTest:Ke,activeTexture:I,bindTexture:w,unbindTexture:$,compressedTexImage2D:ve,compressedTexImage3D:ye,texImage2D:ne,texImage3D:tt,updateUBOMapping:pt,uniformBlockBinding:xt,texStorage2D:St,texStorage3D:Ae,texSubImage2D:de,texSubImage3D:Fe,compressedTexSubImage2D:Ce,compressedTexSubImage3D:Le,scissor:rt,viewport:Ge,reset:Bt}}function Mc(r,e,t,n){const i=vm(n);switch(t){case 1021:return r*e;case 1024:return r*e;case 1025:return r*e*2;case 1028:return r*e/i.components*i.byteLength;case 1029:return r*e/i.components*i.byteLength;case 1030:return r*e*2/i.components*i.byteLength;case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case 1023:return r*e*4/i.components*i.byteLength;case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function vm(r){switch(r){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function Mm(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Be,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,w){return d?new OffscreenCanvas(I,w):$r("canvas")}function _(I,w,$){let ve=1;const ye=Ke(I);if((ye.width>$||ye.height>$)&&(ve=$/Math.max(ye.width,ye.height)),ve<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const de=Math.floor(ve*ye.width),Fe=Math.floor(ve*ye.height);h===void 0&&(h=g(de,Fe));const Ce=w?g(de,Fe):h;return Ce.width=de,Ce.height=Fe,Ce.getContext("2d").drawImage(I,0,0,de,Fe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ye.width+"x"+ye.height+") to ("+de+"x"+Fe+")."),Ce}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ye.width+"x"+ye.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){r.generateMipmap(I)}function v(I){return I.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?r.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function M(I,w,$,ve,ye=!1){if(I!==null){if(r[I]!==void 0)return r[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let de=w;if(w===r.RED&&($===r.FLOAT&&(de=r.R32F),$===r.HALF_FLOAT&&(de=r.R16F),$===r.UNSIGNED_BYTE&&(de=r.R8)),w===r.RED_INTEGER&&($===r.UNSIGNED_BYTE&&(de=r.R8UI),$===r.UNSIGNED_SHORT&&(de=r.R16UI),$===r.UNSIGNED_INT&&(de=r.R32UI),$===r.BYTE&&(de=r.R8I),$===r.SHORT&&(de=r.R16I),$===r.INT&&(de=r.R32I)),w===r.RG&&($===r.FLOAT&&(de=r.RG32F),$===r.HALF_FLOAT&&(de=r.RG16F),$===r.UNSIGNED_BYTE&&(de=r.RG8)),w===r.RG_INTEGER&&($===r.UNSIGNED_BYTE&&(de=r.RG8UI),$===r.UNSIGNED_SHORT&&(de=r.RG16UI),$===r.UNSIGNED_INT&&(de=r.RG32UI),$===r.BYTE&&(de=r.RG8I),$===r.SHORT&&(de=r.RG16I),$===r.INT&&(de=r.RG32I)),w===r.RGB_INTEGER&&($===r.UNSIGNED_BYTE&&(de=r.RGB8UI),$===r.UNSIGNED_SHORT&&(de=r.RGB16UI),$===r.UNSIGNED_INT&&(de=r.RGB32UI),$===r.BYTE&&(de=r.RGB8I),$===r.SHORT&&(de=r.RGB16I),$===r.INT&&(de=r.RGB32I)),w===r.RGBA_INTEGER&&($===r.UNSIGNED_BYTE&&(de=r.RGBA8UI),$===r.UNSIGNED_SHORT&&(de=r.RGBA16UI),$===r.UNSIGNED_INT&&(de=r.RGBA32UI),$===r.BYTE&&(de=r.RGBA8I),$===r.SHORT&&(de=r.RGBA16I),$===r.INT&&(de=r.RGBA32I)),w===r.RGB&&$===r.UNSIGNED_INT_5_9_9_9_REV&&(de=r.RGB9_E5),w===r.RGBA){const Fe=ye?Qs:It.getTransfer(ve);$===r.FLOAT&&(de=r.RGBA32F),$===r.HALF_FLOAT&&(de=r.RGBA16F),$===r.UNSIGNED_BYTE&&(de=Fe===Wt?r.SRGB8_ALPHA8:r.RGBA8),$===r.UNSIGNED_SHORT_4_4_4_4&&(de=r.RGBA4),$===r.UNSIGNED_SHORT_5_5_5_1&&(de=r.RGB5_A1)}return(de===r.R16F||de===r.R32F||de===r.RG16F||de===r.RG32F||de===r.RGBA16F||de===r.RGBA32F)&&e.get("EXT_color_buffer_float"),de}function b(I,w){let $;return I?w===null||w===1014||w===1020?$=r.DEPTH24_STENCIL8:w===1015?$=r.DEPTH32F_STENCIL8:w===1012&&($=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===1014||w===1020?$=r.DEPTH_COMPONENT24:w===1015?$=r.DEPTH_COMPONENT32F:w===1012&&($=r.DEPTH_COMPONENT16),$}function P(I,w){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==1003&&I.minFilter!==1006?Math.log2(Math.max(w.width,w.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?w.mipmaps.length:1}function T(I){const w=I.target;w.removeEventListener("dispose",T),S(w),w.isVideoTexture&&u.delete(w)}function C(I){const w=I.target;w.removeEventListener("dispose",C),y(w)}function S(I){const w=n.get(I);if(w.__webglInit===void 0)return;const $=I.source,ve=f.get($);if(ve){const ye=ve[w.__cacheKey];ye.usedTimes--,ye.usedTimes===0&&x(I),Object.keys(ve).length===0&&f.delete($)}n.remove(I)}function x(I){const w=n.get(I);r.deleteTexture(w.__webglTexture);const $=I.source,ve=f.get($);delete ve[w.__cacheKey],a.memory.textures--}function y(I){const w=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let ve=0;ve<6;ve++){if(Array.isArray(w.__webglFramebuffer[ve]))for(let ye=0;ye<w.__webglFramebuffer[ve].length;ye++)r.deleteFramebuffer(w.__webglFramebuffer[ve][ye]);else r.deleteFramebuffer(w.__webglFramebuffer[ve]);w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer[ve])}else{if(Array.isArray(w.__webglFramebuffer))for(let ve=0;ve<w.__webglFramebuffer.length;ve++)r.deleteFramebuffer(w.__webglFramebuffer[ve]);else r.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&r.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ve=0;ve<w.__webglColorRenderbuffer.length;ve++)w.__webglColorRenderbuffer[ve]&&r.deleteRenderbuffer(w.__webglColorRenderbuffer[ve]);w.__webglDepthRenderbuffer&&r.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const $=I.textures;for(let ve=0,ye=$.length;ve<ye;ve++){const de=n.get($[ve]);de.__webglTexture&&(r.deleteTexture(de.__webglTexture),a.memory.textures--),n.remove($[ve])}n.remove(I)}let R=0;function G(){R=0}function k(){const I=R;return I>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+i.maxTextures),R+=1,I}function K(I){const w=[];return w.push(I.wrapS),w.push(I.wrapT),w.push(I.wrapR||0),w.push(I.magFilter),w.push(I.minFilter),w.push(I.anisotropy),w.push(I.internalFormat),w.push(I.format),w.push(I.type),w.push(I.generateMipmaps),w.push(I.premultiplyAlpha),w.push(I.flipY),w.push(I.unpackAlignment),w.push(I.colorSpace),w.join()}function oe(I,w){const $=n.get(I);if(I.isVideoTexture&&Je(I),I.isRenderTargetTexture===!1&&I.version>0&&$.__version!==I.version){const ve=I.image;if(ve===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ve.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{re($,I,w);return}}t.bindTexture(r.TEXTURE_2D,$.__webglTexture,r.TEXTURE0+w)}function D(I,w){const $=n.get(I);if(I.version>0&&$.__version!==I.version){re($,I,w);return}t.bindTexture(r.TEXTURE_2D_ARRAY,$.__webglTexture,r.TEXTURE0+w)}function Y(I,w){const $=n.get(I);if(I.version>0&&$.__version!==I.version){re($,I,w);return}t.bindTexture(r.TEXTURE_3D,$.__webglTexture,r.TEXTURE0+w)}function H(I,w){const $=n.get(I);if(I.version>0&&$.__version!==I.version){xe($,I,w);return}t.bindTexture(r.TEXTURE_CUBE_MAP,$.__webglTexture,r.TEXTURE0+w)}const he={1e3:r.REPEAT,1001:r.CLAMP_TO_EDGE,1002:r.MIRRORED_REPEAT},Z={1003:r.NEAREST,1004:r.NEAREST_MIPMAP_NEAREST,1005:r.NEAREST_MIPMAP_LINEAR,1006:r.LINEAR,1007:r.LINEAR_MIPMAP_NEAREST,1008:r.LINEAR_MIPMAP_LINEAR},te={512:r.NEVER,519:r.ALWAYS,513:r.LESS,515:r.LEQUAL,514:r.EQUAL,518:r.GEQUAL,516:r.GREATER,517:r.NOTEQUAL};function Te(I,w){if(w.type===1015&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===1006||w.magFilter===1007||w.magFilter===1005||w.magFilter===1008||w.minFilter===1006||w.minFilter===1007||w.minFilter===1005||w.minFilter===1008)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(I,r.TEXTURE_WRAP_S,he[w.wrapS]),r.texParameteri(I,r.TEXTURE_WRAP_T,he[w.wrapT]),(I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY)&&r.texParameteri(I,r.TEXTURE_WRAP_R,he[w.wrapR]),r.texParameteri(I,r.TEXTURE_MAG_FILTER,Z[w.magFilter]),r.texParameteri(I,r.TEXTURE_MIN_FILTER,Z[w.minFilter]),w.compareFunction&&(r.texParameteri(I,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(I,r.TEXTURE_COMPARE_FUNC,te[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===1003||w.minFilter!==1005&&w.minFilter!==1008||w.type===1015&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const $=e.get("EXT_texture_filter_anisotropic");r.texParameterf(I,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Pe(I,w){let $=!1;I.__webglInit===void 0&&(I.__webglInit=!0,w.addEventListener("dispose",T));const ve=w.source;let ye=f.get(ve);ye===void 0&&(ye={},f.set(ve,ye));const de=K(w);if(de!==I.__cacheKey){ye[de]===void 0&&(ye[de]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,$=!0),ye[de].usedTimes++;const Fe=ye[I.__cacheKey];Fe!==void 0&&(ye[I.__cacheKey].usedTimes--,Fe.usedTimes===0&&x(w)),I.__cacheKey=de,I.__webglTexture=ye[de].texture}return $}function re(I,w,$){let ve=r.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ve=r.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ve=r.TEXTURE_3D);const ye=Pe(I,w),de=w.source;t.bindTexture(ve,I.__webglTexture,r.TEXTURE0+$);const Fe=n.get(de);if(de.version!==Fe.__version||ye===!0){t.activeTexture(r.TEXTURE0+$);const Ce=It.getPrimaries(It.workingColorSpace),Le=w.colorSpace===""?null:It.getPrimaries(w.colorSpace),St=w.colorSpace===""||Ce===Le?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);let Ae=_(w.image,!1,i.maxTextureSize);Ae=At(w,Ae);const ne=s.convert(w.format,w.colorSpace),tt=s.convert(w.type);let rt=M(w.internalFormat,ne,tt,w.colorSpace,w.isVideoTexture);Te(ve,w);let Ge;const pt=w.mipmaps,xt=w.isVideoTexture!==!0,Bt=Fe.__version===void 0||ye===!0,j=de.dataReady,Ie=P(w,Ae);if(w.isDepthTexture)rt=b(w.format===1027,w.type),Bt&&(xt?t.texStorage2D(r.TEXTURE_2D,1,rt,Ae.width,Ae.height):t.texImage2D(r.TEXTURE_2D,0,rt,Ae.width,Ae.height,0,ne,tt,null));else if(w.isDataTexture)if(pt.length>0){xt&&Bt&&t.texStorage2D(r.TEXTURE_2D,Ie,rt,pt[0].width,pt[0].height);for(let fe=0,me=pt.length;fe<me;fe++)Ge=pt[fe],xt?j&&t.texSubImage2D(r.TEXTURE_2D,fe,0,0,Ge.width,Ge.height,ne,tt,Ge.data):t.texImage2D(r.TEXTURE_2D,fe,rt,Ge.width,Ge.height,0,ne,tt,Ge.data);w.generateMipmaps=!1}else xt?(Bt&&t.texStorage2D(r.TEXTURE_2D,Ie,rt,Ae.width,Ae.height),j&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ae.width,Ae.height,ne,tt,Ae.data)):t.texImage2D(r.TEXTURE_2D,0,rt,Ae.width,Ae.height,0,ne,tt,Ae.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){xt&&Bt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ie,rt,pt[0].width,pt[0].height,Ae.depth);for(let fe=0,me=pt.length;fe<me;fe++)if(Ge=pt[fe],w.format!==1023)if(ne!==null)if(xt){if(j)if(w.layerUpdates.size>0){const Ue=Mc(Ge.width,Ge.height,w.format,w.type);for(const ke of w.layerUpdates){const He=Ge.data.subarray(ke*Ue/Ge.data.BYTES_PER_ELEMENT,(ke+1)*Ue/Ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,fe,0,0,ke,Ge.width,Ge.height,1,ne,He)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,fe,0,0,0,Ge.width,Ge.height,Ae.depth,ne,Ge.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,fe,rt,Ge.width,Ge.height,Ae.depth,0,Ge.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else xt?j&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,fe,0,0,0,Ge.width,Ge.height,Ae.depth,ne,tt,Ge.data):t.texImage3D(r.TEXTURE_2D_ARRAY,fe,rt,Ge.width,Ge.height,Ae.depth,0,ne,tt,Ge.data)}else{xt&&Bt&&t.texStorage2D(r.TEXTURE_2D,Ie,rt,pt[0].width,pt[0].height);for(let fe=0,me=pt.length;fe<me;fe++)Ge=pt[fe],w.format!==1023?ne!==null?xt?j&&t.compressedTexSubImage2D(r.TEXTURE_2D,fe,0,0,Ge.width,Ge.height,ne,Ge.data):t.compressedTexImage2D(r.TEXTURE_2D,fe,rt,Ge.width,Ge.height,0,Ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):xt?j&&t.texSubImage2D(r.TEXTURE_2D,fe,0,0,Ge.width,Ge.height,ne,tt,Ge.data):t.texImage2D(r.TEXTURE_2D,fe,rt,Ge.width,Ge.height,0,ne,tt,Ge.data)}else if(w.isDataArrayTexture)if(xt){if(Bt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ie,rt,Ae.width,Ae.height,Ae.depth),j)if(w.layerUpdates.size>0){const fe=Mc(Ae.width,Ae.height,w.format,w.type);for(const me of w.layerUpdates){const Ue=Ae.data.subarray(me*fe/Ae.data.BYTES_PER_ELEMENT,(me+1)*fe/Ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,me,Ae.width,Ae.height,1,ne,tt,Ue)}w.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Ae.width,Ae.height,Ae.depth,ne,tt,Ae.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,rt,Ae.width,Ae.height,Ae.depth,0,ne,tt,Ae.data);else if(w.isData3DTexture)xt?(Bt&&t.texStorage3D(r.TEXTURE_3D,Ie,rt,Ae.width,Ae.height,Ae.depth),j&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Ae.width,Ae.height,Ae.depth,ne,tt,Ae.data)):t.texImage3D(r.TEXTURE_3D,0,rt,Ae.width,Ae.height,Ae.depth,0,ne,tt,Ae.data);else if(w.isFramebufferTexture){if(Bt)if(xt)t.texStorage2D(r.TEXTURE_2D,Ie,rt,Ae.width,Ae.height);else{let fe=Ae.width,me=Ae.height;for(let Ue=0;Ue<Ie;Ue++)t.texImage2D(r.TEXTURE_2D,Ue,rt,fe,me,0,ne,tt,null),fe>>=1,me>>=1}}else if(pt.length>0){if(xt&&Bt){const fe=Ke(pt[0]);t.texStorage2D(r.TEXTURE_2D,Ie,rt,fe.width,fe.height)}for(let fe=0,me=pt.length;fe<me;fe++)Ge=pt[fe],xt?j&&t.texSubImage2D(r.TEXTURE_2D,fe,0,0,ne,tt,Ge):t.texImage2D(r.TEXTURE_2D,fe,rt,ne,tt,Ge);w.generateMipmaps=!1}else if(xt){if(Bt){const fe=Ke(Ae);t.texStorage2D(r.TEXTURE_2D,Ie,rt,fe.width,fe.height)}j&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ne,tt,Ae)}else t.texImage2D(r.TEXTURE_2D,0,rt,ne,tt,Ae);m(w)&&p(ve),Fe.__version=de.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function xe(I,w,$){if(w.image.length!==6)return;const ve=Pe(I,w),ye=w.source;t.bindTexture(r.TEXTURE_CUBE_MAP,I.__webglTexture,r.TEXTURE0+$);const de=n.get(ye);if(ye.version!==de.__version||ve===!0){t.activeTexture(r.TEXTURE0+$);const Fe=It.getPrimaries(It.workingColorSpace),Ce=w.colorSpace===""?null:It.getPrimaries(w.colorSpace),Le=w.colorSpace===""||Fe===Ce?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);const St=w.isCompressedTexture||w.image[0].isCompressedTexture,Ae=w.image[0]&&w.image[0].isDataTexture,ne=[];for(let me=0;me<6;me++)!St&&!Ae?ne[me]=_(w.image[me],!0,i.maxCubemapSize):ne[me]=Ae?w.image[me].image:w.image[me],ne[me]=At(w,ne[me]);const tt=ne[0],rt=s.convert(w.format,w.colorSpace),Ge=s.convert(w.type),pt=M(w.internalFormat,rt,Ge,w.colorSpace),xt=w.isVideoTexture!==!0,Bt=de.__version===void 0||ve===!0,j=ye.dataReady;let Ie=P(w,tt);Te(r.TEXTURE_CUBE_MAP,w);let fe;if(St){xt&&Bt&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Ie,pt,tt.width,tt.height);for(let me=0;me<6;me++){fe=ne[me].mipmaps;for(let Ue=0;Ue<fe.length;Ue++){const ke=fe[Ue];w.format!==1023?rt!==null?xt?j&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ue,0,0,ke.width,ke.height,rt,ke.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ue,pt,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):xt?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ue,0,0,ke.width,ke.height,rt,Ge,ke.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ue,pt,ke.width,ke.height,0,rt,Ge,ke.data)}}}else{if(fe=w.mipmaps,xt&&Bt){fe.length>0&&Ie++;const me=Ke(ne[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Ie,pt,me.width,me.height)}for(let me=0;me<6;me++)if(Ae){xt?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,ne[me].width,ne[me].height,rt,Ge,ne[me].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,pt,ne[me].width,ne[me].height,0,rt,Ge,ne[me].data);for(let Ue=0;Ue<fe.length;Ue++){const He=fe[Ue].image[me].image;xt?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ue+1,0,0,He.width,He.height,rt,Ge,He.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ue+1,pt,He.width,He.height,0,rt,Ge,He.data)}}else{xt?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,rt,Ge,ne[me]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,pt,rt,Ge,ne[me]);for(let Ue=0;Ue<fe.length;Ue++){const ke=fe[Ue];xt?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ue+1,0,0,rt,Ge,ke.image[me]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ue+1,pt,rt,Ge,ke.image[me])}}}m(w)&&p(r.TEXTURE_CUBE_MAP),de.__version=ye.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function Ne(I,w,$,ve,ye,de){const Fe=s.convert($.format,$.colorSpace),Ce=s.convert($.type),Le=M($.internalFormat,Fe,Ce,$.colorSpace),St=n.get(w),Ae=n.get($);if(Ae.__renderTarget=w,!St.__hasExternalTextures){const ne=Math.max(1,w.width>>de),tt=Math.max(1,w.height>>de);ye===r.TEXTURE_3D||ye===r.TEXTURE_2D_ARRAY?t.texImage3D(ye,de,Le,ne,tt,w.depth,0,Fe,Ce,null):t.texImage2D(ye,de,Le,ne,tt,0,Fe,Ce,null)}t.bindFramebuffer(r.FRAMEBUFFER,I),ht(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ve,ye,Ae.__webglTexture,0,ft(w)):(ye===r.TEXTURE_2D||ye>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ye<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ve,ye,Ae.__webglTexture,de),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ee(I,w,$){if(r.bindRenderbuffer(r.RENDERBUFFER,I),w.depthBuffer){const ve=w.depthTexture,ye=ve&&ve.isDepthTexture?ve.type:null,de=b(w.stencilBuffer,ye),Fe=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ce=ft(w);ht(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ce,de,w.width,w.height):$?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ce,de,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,de,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Fe,r.RENDERBUFFER,I)}else{const ve=w.textures;for(let ye=0;ye<ve.length;ye++){const de=ve[ye],Fe=s.convert(de.format,de.colorSpace),Ce=s.convert(de.type),Le=M(de.internalFormat,Fe,Ce,de.colorSpace),St=ft(w);$&&ht(w)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,St,Le,w.width,w.height):ht(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,St,Le,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,Le,w.width,w.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function et(I,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,I),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ve=n.get(w.depthTexture);ve.__renderTarget=w,(!ve.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),oe(w.depthTexture,0);const ye=ve.__webglTexture,de=ft(w);if(w.depthTexture.format===1026)ht(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ye,0,de):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ye,0);else if(w.depthTexture.format===1027)ht(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ye,0,de):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ye,0);else throw new Error("Unknown depthTexture format")}function nt(I){const w=n.get(I),$=I.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==I.depthTexture){const ve=I.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),ve){const ye=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,ve.removeEventListener("dispose",ye)};ve.addEventListener("dispose",ye),w.__depthDisposeCallback=ye}w.__boundDepthTexture=ve}if(I.depthTexture&&!w.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");et(w.__webglFramebuffer,I)}else if($){w.__webglDepthbuffer=[];for(let ve=0;ve<6;ve++)if(t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[ve]),w.__webglDepthbuffer[ve]===void 0)w.__webglDepthbuffer[ve]=r.createRenderbuffer(),Ee(w.__webglDepthbuffer[ve],I,!1);else{const ye=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,de=w.__webglDepthbuffer[ve];r.bindRenderbuffer(r.RENDERBUFFER,de),r.framebufferRenderbuffer(r.FRAMEBUFFER,ye,r.RENDERBUFFER,de)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=r.createRenderbuffer(),Ee(w.__webglDepthbuffer,I,!1);else{const ve=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ye=w.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ye),r.framebufferRenderbuffer(r.FRAMEBUFFER,ve,r.RENDERBUFFER,ye)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function ot(I,w,$){const ve=n.get(I);w!==void 0&&Ne(ve.__webglFramebuffer,I,I.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),$!==void 0&&nt(I)}function Mt(I){const w=I.texture,$=n.get(I),ve=n.get(w);I.addEventListener("dispose",C);const ye=I.textures,de=I.isWebGLCubeRenderTarget===!0,Fe=ye.length>1;if(Fe||(ve.__webglTexture===void 0&&(ve.__webglTexture=r.createTexture()),ve.__version=w.version,a.memory.textures++),de){$.__webglFramebuffer=[];for(let Ce=0;Ce<6;Ce++)if(w.mipmaps&&w.mipmaps.length>0){$.__webglFramebuffer[Ce]=[];for(let Le=0;Le<w.mipmaps.length;Le++)$.__webglFramebuffer[Ce][Le]=r.createFramebuffer()}else $.__webglFramebuffer[Ce]=r.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){$.__webglFramebuffer=[];for(let Ce=0;Ce<w.mipmaps.length;Ce++)$.__webglFramebuffer[Ce]=r.createFramebuffer()}else $.__webglFramebuffer=r.createFramebuffer();if(Fe)for(let Ce=0,Le=ye.length;Ce<Le;Ce++){const St=n.get(ye[Ce]);St.__webglTexture===void 0&&(St.__webglTexture=r.createTexture(),a.memory.textures++)}if(I.samples>0&&ht(I)===!1){$.__webglMultisampledFramebuffer=r.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let Ce=0;Ce<ye.length;Ce++){const Le=ye[Ce];$.__webglColorRenderbuffer[Ce]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,$.__webglColorRenderbuffer[Ce]);const St=s.convert(Le.format,Le.colorSpace),Ae=s.convert(Le.type),ne=M(Le.internalFormat,St,Ae,Le.colorSpace,I.isXRRenderTarget===!0),tt=ft(I);r.renderbufferStorageMultisample(r.RENDERBUFFER,tt,ne,I.width,I.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ce,r.RENDERBUFFER,$.__webglColorRenderbuffer[Ce])}r.bindRenderbuffer(r.RENDERBUFFER,null),I.depthBuffer&&($.__webglDepthRenderbuffer=r.createRenderbuffer(),Ee($.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(de){t.bindTexture(r.TEXTURE_CUBE_MAP,ve.__webglTexture),Te(r.TEXTURE_CUBE_MAP,w);for(let Ce=0;Ce<6;Ce++)if(w.mipmaps&&w.mipmaps.length>0)for(let Le=0;Le<w.mipmaps.length;Le++)Ne($.__webglFramebuffer[Ce][Le],I,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,Le);else Ne($.__webglFramebuffer[Ce],I,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0);m(w)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Fe){for(let Ce=0,Le=ye.length;Ce<Le;Ce++){const St=ye[Ce],Ae=n.get(St);t.bindTexture(r.TEXTURE_2D,Ae.__webglTexture),Te(r.TEXTURE_2D,St),Ne($.__webglFramebuffer,I,St,r.COLOR_ATTACHMENT0+Ce,r.TEXTURE_2D,0),m(St)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let Ce=r.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Ce=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(Ce,ve.__webglTexture),Te(Ce,w),w.mipmaps&&w.mipmaps.length>0)for(let Le=0;Le<w.mipmaps.length;Le++)Ne($.__webglFramebuffer[Le],I,w,r.COLOR_ATTACHMENT0,Ce,Le);else Ne($.__webglFramebuffer,I,w,r.COLOR_ATTACHMENT0,Ce,0);m(w)&&p(Ce),t.unbindTexture()}I.depthBuffer&&nt(I)}function ut(I){const w=I.textures;for(let $=0,ve=w.length;$<ve;$++){const ye=w[$];if(m(ye)){const de=v(I),Fe=n.get(ye).__webglTexture;t.bindTexture(de,Fe),p(de),t.unbindTexture()}}}const _t=[],J=[];function Gt(I){if(I.samples>0){if(ht(I)===!1){const w=I.textures,$=I.width,ve=I.height;let ye=r.COLOR_BUFFER_BIT;const de=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Fe=n.get(I),Ce=w.length>1;if(Ce)for(let Le=0;Le<w.length;Le++)t.bindFramebuffer(r.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Fe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer);for(let Le=0;Le<w.length;Le++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ye|=r.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ye|=r.STENCIL_BUFFER_BIT)),Ce){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Fe.__webglColorRenderbuffer[Le]);const St=n.get(w[Le]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,St,0)}r.blitFramebuffer(0,0,$,ve,0,0,$,ve,ye,r.NEAREST),c===!0&&(_t.length=0,J.length=0,_t.push(r.COLOR_ATTACHMENT0+Le),I.depthBuffer&&I.resolveDepthBuffer===!1&&(_t.push(de),J.push(de),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,J)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,_t))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Ce)for(let Le=0;Le<w.length;Le++){t.bindFramebuffer(r.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.RENDERBUFFER,Fe.__webglColorRenderbuffer[Le]);const St=n.get(w[Le]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Fe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.TEXTURE_2D,St,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&c){const w=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[w])}}}function ft(I){return Math.min(i.maxSamples,I.samples)}function ht(I){const w=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Je(I){const w=a.render.frame;u.get(I)!==w&&(u.set(I,w),I.update())}function At(I,w){const $=I.colorSpace,ve=I.format,ye=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||$!==Cn&&$!==""&&(It.getTransfer($)===Wt?(ve!==1023||ye!==1009)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),w}function Ke(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=G,this.setTexture2D=oe,this.setTexture2DArray=D,this.setTexture3D=Y,this.setTextureCube=H,this.rebindTextures=ot,this.setupRenderTarget=Mt,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=Gt,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=Ne,this.useMultisampledRTT=ht}function ym(r,e){function t(n,i=""){let s;const a=It.getTransfer(i);if(n===1009)return r.UNSIGNED_BYTE;if(n===1017)return r.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return r.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===1010)return r.BYTE;if(n===1011)return r.SHORT;if(n===1012)return r.UNSIGNED_SHORT;if(n===1013)return r.INT;if(n===1014)return r.UNSIGNED_INT;if(n===1015)return r.FLOAT;if(n===1016)return r.HALF_FLOAT;if(n===1021)return r.ALPHA;if(n===1022)return r.RGB;if(n===1023)return r.RGBA;if(n===1024)return r.LUMINANCE;if(n===1025)return r.LUMINANCE_ALPHA;if(n===1026)return r.DEPTH_COMPONENT;if(n===1027)return r.DEPTH_STENCIL;if(n===1028)return r.RED;if(n===1029)return r.RED_INTEGER;if(n===1030)return r.RG;if(n===1031)return r.RG_INTEGER;if(n===1033)return r.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===Wt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===33776)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===33776)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===35840)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===36196||n===37492)return a===Wt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===37496)return a===Wt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===37808)return a===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===36492)return a===Wt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===36492)return s.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}class Sm extends Nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class mt extends $t{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Em={type:"move"};class Ia{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Em)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new mt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Tm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,wm=`
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

}`;class Am{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new an,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Oi({vertexShader:Tm,fragmentShader:wm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ye(new Vn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Rm extends Er{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,g=null;const _=new Am,m=t.getContextAttributes();let p=null,v=null;const M=[],b=[],P=new Be;let T=null;const C=new Nn;C.viewport=new Ft;const S=new Nn;S.viewport=new Ft;const x=[C,S],y=new Sm;let R=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let xe=M[re];return xe===void 0&&(xe=new Ia,M[re]=xe),xe.getTargetRaySpace()},this.getControllerGrip=function(re){let xe=M[re];return xe===void 0&&(xe=new Ia,M[re]=xe),xe.getGripSpace()},this.getHand=function(re){let xe=M[re];return xe===void 0&&(xe=new Ia,M[re]=xe),xe.getHandSpace()};function k(re){const xe=b.indexOf(re.inputSource);if(xe===-1)return;const Ne=M[xe];Ne!==void 0&&(Ne.update(re.inputSource,re.frame,l||a),Ne.dispatchEvent({type:re.type,data:re.inputSource}))}function K(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",K),i.removeEventListener("inputsourceschange",oe);for(let re=0;re<M.length;re++){const xe=b[re];xe!==null&&(b[re]=null,M[re].disconnect(xe))}R=null,G=null,_.reset(),e.setRenderTarget(p),d=null,f=null,h=null,i=null,v=null,Pe.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(re){s=re,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){o=re,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(re){l=re},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(re){if(i=re,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",K),i.addEventListener("inputsourceschange",oe),m.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(P),i.renderState.layers===void 0){const xe={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,t,xe),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new Ui(d.framebufferWidth,d.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let xe=null,Ne=null,Ee=null;m.depth&&(Ee=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,xe=m.stencil?1027:1026,Ne=m.stencil?1020:1014);const et={colorFormat:t.RGBA8,depthFormat:Ee,scaleFactor:s};h=new XRWebGLBinding(i,t),f=h.createProjectionLayer(et),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new Ui(f.textureWidth,f.textureHeight,{format:1023,type:1009,depthTexture:new yl(f.textureWidth,f.textureHeight,Ne,void 0,void 0,void 0,void 0,void 0,void 0,xe),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Pe.setContext(i),Pe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function oe(re){for(let xe=0;xe<re.removed.length;xe++){const Ne=re.removed[xe],Ee=b.indexOf(Ne);Ee>=0&&(b[Ee]=null,M[Ee].disconnect(Ne))}for(let xe=0;xe<re.added.length;xe++){const Ne=re.added[xe];let Ee=b.indexOf(Ne);if(Ee===-1){for(let nt=0;nt<M.length;nt++)if(nt>=b.length){b.push(Ne),Ee=nt;break}else if(b[nt]===null){b[nt]=Ne,Ee=nt;break}if(Ee===-1)break}const et=M[Ee];et&&et.connect(Ne)}}const D=new N,Y=new N;function H(re,xe,Ne){D.setFromMatrixPosition(xe.matrixWorld),Y.setFromMatrixPosition(Ne.matrixWorld);const Ee=D.distanceTo(Y),et=xe.projectionMatrix.elements,nt=Ne.projectionMatrix.elements,ot=et[14]/(et[10]-1),Mt=et[14]/(et[10]+1),ut=(et[9]+1)/et[5],_t=(et[9]-1)/et[5],J=(et[8]-1)/et[0],Gt=(nt[8]+1)/nt[0],ft=ot*J,ht=ot*Gt,Je=Ee/(-J+Gt),At=Je*-J;if(xe.matrixWorld.decompose(re.position,re.quaternion,re.scale),re.translateX(At),re.translateZ(Je),re.matrixWorld.compose(re.position,re.quaternion,re.scale),re.matrixWorldInverse.copy(re.matrixWorld).invert(),et[10]===-1)re.projectionMatrix.copy(xe.projectionMatrix),re.projectionMatrixInverse.copy(xe.projectionMatrixInverse);else{const Ke=ot+Je,I=Mt+Je,w=ft-At,$=ht+(Ee-At),ve=ut*Mt/I*Ke,ye=_t*Mt/I*Ke;re.projectionMatrix.makePerspective(w,$,ve,ye,Ke,I),re.projectionMatrixInverse.copy(re.projectionMatrix).invert()}}function he(re,xe){xe===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(xe.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(i===null)return;let xe=re.near,Ne=re.far;_.texture!==null&&(_.depthNear>0&&(xe=_.depthNear),_.depthFar>0&&(Ne=_.depthFar)),y.near=S.near=C.near=xe,y.far=S.far=C.far=Ne,(R!==y.near||G!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),R=y.near,G=y.far),C.layers.mask=re.layers.mask|2,S.layers.mask=re.layers.mask|4,y.layers.mask=C.layers.mask|S.layers.mask;const Ee=re.parent,et=y.cameras;he(y,Ee);for(let nt=0;nt<et.length;nt++)he(et[nt],Ee);et.length===2?H(y,C,S):y.projectionMatrix.copy(C.projectionMatrix),Z(re,y,Ee)};function Z(re,xe,Ne){Ne===null?re.matrix.copy(xe.matrixWorld):(re.matrix.copy(Ne.matrixWorld),re.matrix.invert(),re.matrix.multiply(xe.matrixWorld)),re.matrix.decompose(re.position,re.quaternion,re.scale),re.updateMatrixWorld(!0),re.projectionMatrix.copy(xe.projectionMatrix),re.projectionMatrixInverse.copy(xe.projectionMatrixInverse),re.isPerspectiveCamera&&(re.fov=xr*2*Math.atan(1/re.projectionMatrix.elements[5]),re.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(re){c=re,f!==null&&(f.fixedFoveation=re),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=re)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let te=null;function Te(re,xe){if(u=xe.getViewerPose(l||a),g=xe,u!==null){const Ne=u.views;d!==null&&(e.setRenderTargetFramebuffer(v,d.framebuffer),e.setRenderTarget(v));let Ee=!1;Ne.length!==y.cameras.length&&(y.cameras.length=0,Ee=!0);for(let nt=0;nt<Ne.length;nt++){const ot=Ne[nt];let Mt=null;if(d!==null)Mt=d.getViewport(ot);else{const _t=h.getViewSubImage(f,ot);Mt=_t.viewport,nt===0&&(e.setRenderTargetTextures(v,_t.colorTexture,f.ignoreDepthValues?void 0:_t.depthStencilTexture),e.setRenderTarget(v))}let ut=x[nt];ut===void 0&&(ut=new Nn,ut.layers.enable(nt),ut.viewport=new Ft,x[nt]=ut),ut.matrix.fromArray(ot.transform.matrix),ut.matrix.decompose(ut.position,ut.quaternion,ut.scale),ut.projectionMatrix.fromArray(ot.projectionMatrix),ut.projectionMatrixInverse.copy(ut.projectionMatrix).invert(),ut.viewport.set(Mt.x,Mt.y,Mt.width,Mt.height),nt===0&&(y.matrix.copy(ut.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),Ee===!0&&y.cameras.push(ut)}const et=i.enabledFeatures;if(et&&et.includes("depth-sensing")){const nt=h.getDepthInformation(Ne[0]);nt&&nt.isValid&&nt.texture&&_.init(e,nt,i.renderState)}}for(let Ne=0;Ne<M.length;Ne++){const Ee=b[Ne],et=M[Ne];Ee!==null&&et!==void 0&&et.update(Ee,xe,l||a)}te&&te(re,xe),xe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:xe}),g=null}const Pe=new Ml;Pe.setAnimationLoop(Te),this.setAnimationLoop=function(re){te=re},this.dispose=function(){}}}const Wi=new Wn,Cm=new $e;function Pm(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,_l(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,v,M,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,b)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,v,M):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===1&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===1&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=e.get(p),M=v.envMap,b=v.envMapRotation;M&&(m.envMap.value=M,Wi.copy(b),Wi.x*=-1,Wi.y*=-1,Wi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Wi.y*=-1,Wi.z*=-1),m.envMapRotation.value.setFromMatrix4(Cm.makeRotationFromEuler(Wi)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=M*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===1&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Lm(r,e,t,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,M){const b=M.program;n.uniformBlockBinding(v,b)}function l(v,M){let b=i[v.id];b===void 0&&(g(v),b=u(v),i[v.id]=b,v.addEventListener("dispose",m));const P=M.program;n.updateUBOMapping(v,P);const T=e.render.frame;s[v.id]!==T&&(f(v),s[v.id]=T)}function u(v){const M=h();v.__bindingPointIndex=M;const b=r.createBuffer(),P=v.__size,T=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,b),r.bufferData(r.UNIFORM_BUFFER,P,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,M,b),b}function h(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const M=i[v.id],b=v.uniforms,P=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,M);for(let T=0,C=b.length;T<C;T++){const S=Array.isArray(b[T])?b[T]:[b[T]];for(let x=0,y=S.length;x<y;x++){const R=S[x];if(d(R,T,x,P)===!0){const G=R.__offset,k=Array.isArray(R.value)?R.value:[R.value];let K=0;for(let oe=0;oe<k.length;oe++){const D=k[oe],Y=_(D);typeof D=="number"||typeof D=="boolean"?(R.__data[0]=D,r.bufferSubData(r.UNIFORM_BUFFER,G+K,R.__data)):D.isMatrix3?(R.__data[0]=D.elements[0],R.__data[1]=D.elements[1],R.__data[2]=D.elements[2],R.__data[3]=0,R.__data[4]=D.elements[3],R.__data[5]=D.elements[4],R.__data[6]=D.elements[5],R.__data[7]=0,R.__data[8]=D.elements[6],R.__data[9]=D.elements[7],R.__data[10]=D.elements[8],R.__data[11]=0):(D.toArray(R.__data,K),K+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,G,R.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(v,M,b,P){const T=v.value,C=M+"_"+b;if(P[C]===void 0)return typeof T=="number"||typeof T=="boolean"?P[C]=T:P[C]=T.clone(),!0;{const S=P[C];if(typeof T=="number"||typeof T=="boolean"){if(S!==T)return P[C]=T,!0}else if(S.equals(T)===!1)return S.copy(T),!0}return!1}function g(v){const M=v.uniforms;let b=0;const P=16;for(let C=0,S=M.length;C<S;C++){const x=Array.isArray(M[C])?M[C]:[M[C]];for(let y=0,R=x.length;y<R;y++){const G=x[y],k=Array.isArray(G.value)?G.value:[G.value];for(let K=0,oe=k.length;K<oe;K++){const D=k[K],Y=_(D),H=b%P,he=H%Y.boundary,Z=H+he;b+=he,Z!==0&&P-Z<Y.storage&&(b+=P-Z),G.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=b,b+=Y.storage}}}const T=b%P;return T>0&&(b+=P-T),v.__size=b,v.__cache={},this}function _(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),M}function m(v){const M=v.target;M.removeEventListener("dispose",m);const b=a.indexOf(M.__bindingPointIndex);a.splice(b,1),r.deleteBuffer(i[M.id]),delete i[M.id],delete s[M.id]}function p(){for(const v in i)r.deleteBuffer(i[v]);a=[],i={},s={}}return{bind:c,update:l,dispose:p}}class Dm{constructor(e={}){const{canvas:t=xh(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const v=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ot,this.toneMapping=0,this.toneMappingExposure=1;const b=this;let P=!1,T=0,C=0,S=null,x=-1,y=null;const R=new Ft,G=new Ft;let k=null;const K=new Qe(0);let oe=0,D=t.width,Y=t.height,H=1,he=null,Z=null;const te=new Ft(0,0,D,Y),Te=new Ft(0,0,D,Y);let Pe=!1;const re=new po;let xe=!1,Ne=!1;const Ee=new $e,et=new $e,nt=new N,ot=new Ft,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ut=!1;function _t(){return S===null?H:1}let J=n;function Gt(E,W){return t.getContext(E,W)}try{const E={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r170"),t.addEventListener("webglcontextlost",me,!1),t.addEventListener("webglcontextrestored",Ue,!1),t.addEventListener("webglcontextcreationerror",ke,!1),J===null){const W="webgl2";if(J=Gt(W,E),J===null)throw Gt(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let ft,ht,Je,At,Ke,I,w,$,ve,ye,de,Fe,Ce,Le,St,Ae,ne,tt,rt,Ge,pt,xt,Bt,j;function Ie(){ft=new Od(J),ft.init(),xt=new ym(J,ft),ht=new Ld(J,ft,e,xt),Je=new xm(J,ft),ht.reverseDepthBuffer&&f&&Je.buffers.depth.setReversed(!0),At=new zd(J),Ke=new rm,I=new Mm(J,ft,Je,Ke,ht,xt,At),w=new Id(b),$=new Ud(b),ve=new jh(J),Bt=new Cd(J,ve),ye=new Bd(J,ve,At,Bt),de=new Hd(J,ye,ve,At),rt=new Gd(J,ht,I),Ae=new Dd(Ke),Fe=new im(b,w,$,ft,ht,Bt,Ae),Ce=new Pm(b,Ke),Le=new am,St=new fm(ft),tt=new Rd(b,w,$,Je,de,d,c),ne=new bm(b,de,ht),j=new Lm(J,At,ht,Je),Ge=new Pd(J,ft,At),pt=new kd(J,ft,At),At.programs=Fe.programs,b.capabilities=ht,b.extensions=ft,b.properties=Ke,b.renderLists=Le,b.shadowMap=ne,b.state=Je,b.info=At}Ie();const fe=new Rm(b,J);this.xr=fe,this.getContext=function(){return J},this.getContextAttributes=function(){return J.getContextAttributes()},this.forceContextLoss=function(){const E=ft.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=ft.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(E){E!==void 0&&(H=E,this.setSize(D,Y,!1))},this.getSize=function(E){return E.set(D,Y)},this.setSize=function(E,W,ie=!0){if(fe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}D=E,Y=W,t.width=Math.floor(E*H),t.height=Math.floor(W*H),ie===!0&&(t.style.width=E+"px",t.style.height=W+"px"),this.setViewport(0,0,E,W)},this.getDrawingBufferSize=function(E){return E.set(D*H,Y*H).floor()},this.setDrawingBufferSize=function(E,W,ie){D=E,Y=W,H=ie,t.width=Math.floor(E*ie),t.height=Math.floor(W*ie),this.setViewport(0,0,E,W)},this.getCurrentViewport=function(E){return E.copy(R)},this.getViewport=function(E){return E.copy(te)},this.setViewport=function(E,W,ie,ee){E.isVector4?te.set(E.x,E.y,E.z,E.w):te.set(E,W,ie,ee),Je.viewport(R.copy(te).multiplyScalar(H).round())},this.getScissor=function(E){return E.copy(Te)},this.setScissor=function(E,W,ie,ee){E.isVector4?Te.set(E.x,E.y,E.z,E.w):Te.set(E,W,ie,ee),Je.scissor(G.copy(Te).multiplyScalar(H).round())},this.getScissorTest=function(){return Pe},this.setScissorTest=function(E){Je.setScissorTest(Pe=E)},this.setOpaqueSort=function(E){he=E},this.setTransparentSort=function(E){Z=E},this.getClearColor=function(E){return E.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor.apply(tt,arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha.apply(tt,arguments)},this.clear=function(E=!0,W=!0,ie=!0){let ee=0;if(E){let z=!1;if(S!==null){const Re=S.texture.format;z=Re===1033||Re===1031||Re===1029}if(z){const Re=S.texture.type,Me=Re===1009||Re===1014||Re===1012||Re===1020||Re===1017||Re===1018,Ve=tt.getClearColor(),Ze=tt.getClearAlpha(),st=Ve.r,gt=Ve.g,ze=Ve.b;Me?(g[0]=st,g[1]=gt,g[2]=ze,g[3]=Ze,J.clearBufferuiv(J.COLOR,0,g)):(_[0]=st,_[1]=gt,_[2]=ze,_[3]=Ze,J.clearBufferiv(J.COLOR,0,_))}else ee|=J.COLOR_BUFFER_BIT}W&&(ee|=J.DEPTH_BUFFER_BIT),ie&&(ee|=J.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),J.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",me,!1),t.removeEventListener("webglcontextrestored",Ue,!1),t.removeEventListener("webglcontextcreationerror",ke,!1),Le.dispose(),St.dispose(),Ke.dispose(),w.dispose(),$.dispose(),de.dispose(),Bt.dispose(),j.dispose(),Fe.dispose(),fe.dispose(),fe.removeEventListener("sessionstart",Sn),fe.removeEventListener("sessionend",Jn),Xt.stop()};function me(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function Ue(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const E=At.autoReset,W=ne.enabled,ie=ne.autoUpdate,ee=ne.needsUpdate,z=ne.type;Ie(),At.autoReset=E,ne.enabled=W,ne.autoUpdate=ie,ne.needsUpdate=ee,ne.type=z}function ke(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function He(E){const W=E.target;W.removeEventListener("dispose",He),Nt(W)}function Nt(E){kt(E),Ke.remove(E)}function kt(E){const W=Ke.get(E).programs;W!==void 0&&(W.forEach(function(ie){Fe.releaseProgram(ie)}),E.isShaderMaterial&&Fe.releaseShaderCache(E))}this.renderBufferDirect=function(E,W,ie,ee,z,Re){W===null&&(W=Mt);const Me=z.isMesh&&z.matrixWorld.determinant()<0,Ve=mn(E,W,ie,ee,z);Je.setMaterial(ee,Me);let Ze=ie.index,st=1;if(ee.wireframe===!0){if(Ze=ye.getWireframeAttribute(ie),Ze===void 0)return;st=2}const gt=ie.drawRange,ze=ie.attributes.position;let dt=gt.start*st,ct=(gt.start+gt.count)*st;Re!==null&&(dt=Math.max(dt,Re.start*st),ct=Math.min(ct,(Re.start+Re.count)*st)),Ze!==null?(dt=Math.max(dt,0),ct=Math.min(ct,Ze.count)):ze!=null&&(dt=Math.max(dt,0),ct=Math.min(ct,ze.count));const at=ct-dt;if(at<0||at===1/0)return;Bt.setup(z,ee,Ve,ie,Ze);let Tt,Lt=Ge;if(Ze!==null&&(Tt=ve.get(Ze),Lt=pt,Lt.setIndex(Tt)),z.isMesh)ee.wireframe===!0?(Je.setLineWidth(ee.wireframeLinewidth*_t()),Lt.setMode(J.LINES)):Lt.setMode(J.TRIANGLES);else if(z.isLine){let qe=ee.linewidth;qe===void 0&&(qe=1),Je.setLineWidth(qe*_t()),z.isLineSegments?Lt.setMode(J.LINES):z.isLineLoop?Lt.setMode(J.LINE_LOOP):Lt.setMode(J.LINE_STRIP)}else z.isPoints?Lt.setMode(J.POINTS):z.isSprite&&Lt.setMode(J.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)Lt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(ft.get("WEBGL_multi_draw"))Lt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const qe=z._multiDrawStarts,bt=z._multiDrawCounts,vt=z._multiDrawCount,yt=Ze?ve.get(Ze).bytesPerElement:1,tn=Ke.get(ee).currentProgram.getUniforms();for(let Kt=0;Kt<vt;Kt++)tn.setValue(J,"_gl_DrawID",Kt),Lt.render(qe[Kt]/yt,bt[Kt])}else if(z.isInstancedMesh)Lt.renderInstances(dt,at,z.count);else if(ie.isInstancedBufferGeometry){const qe=ie._maxInstanceCount!==void 0?ie._maxInstanceCount:1/0,bt=Math.min(ie.instanceCount,qe);Lt.renderInstances(dt,at,bt)}else Lt.render(dt,at)};function Rt(E,W,ie){E.transparent===!0&&E.side===2&&E.forceSinglePass===!1?(E.side=1,E.needsUpdate=!0,on(E,W,ie),E.side=0,E.needsUpdate=!0,on(E,W,ie),E.side=2):on(E,W,ie)}this.compile=function(E,W,ie=null){ie===null&&(ie=E),p=St.get(ie),p.init(W),M.push(p),ie.traverseVisible(function(z){z.isLight&&z.layers.test(W.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),E!==ie&&E.traverseVisible(function(z){z.isLight&&z.layers.test(W.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const ee=new Set;return E.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const Re=z.material;if(Re)if(Array.isArray(Re))for(let Me=0;Me<Re.length;Me++){const Ve=Re[Me];Rt(Ve,ie,z),ee.add(Ve)}else Rt(Re,ie,z),ee.add(Re)}),M.pop(),p=null,ee},this.compileAsync=function(E,W,ie=null){const ee=this.compile(E,W,ie);return new Promise(z=>{function Re(){if(ee.forEach(function(Me){Ke.get(Me).currentProgram.isReady()&&ee.delete(Me)}),ee.size===0){z(E);return}setTimeout(Re,10)}ft.get("KHR_parallel_shader_compile")!==null?Re():setTimeout(Re,10)})};let rn=null;function en(E){rn&&rn(E)}function Sn(){Xt.stop()}function Jn(){Xt.start()}const Xt=new Ml;Xt.setAnimationLoop(en),typeof self<"u"&&Xt.setContext(self),this.setAnimationLoop=function(E){rn=E,fe.setAnimationLoop(E),E===null?Xt.stop():Xt.start()},fe.addEventListener("sessionstart",Sn),fe.addEventListener("sessionend",Jn),this.render=function(E,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),fe.enabled===!0&&fe.isPresenting===!0&&(fe.cameraAutoUpdate===!0&&fe.updateCamera(W),W=fe.getCamera()),E.isScene===!0&&E.onBeforeRender(b,E,W,S),p=St.get(E,M.length),p.init(W),M.push(p),et.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),re.setFromProjectionMatrix(et),Ne=this.localClippingEnabled,xe=Ae.init(this.clippingPlanes,Ne),m=Le.get(E,v.length),m.init(),v.push(m),fe.enabled===!0&&fe.isPresenting===!0){const Re=b.xr.getDepthSensingMesh();Re!==null&&Pn(Re,W,-1/0,b.sortObjects)}Pn(E,W,0,b.sortObjects),m.finish(),b.sortObjects===!0&&m.sort(he,Z),ut=fe.enabled===!1||fe.isPresenting===!1||fe.hasDepthSensing()===!1,ut&&tt.addToRenderList(m,E),this.info.render.frame++,xe===!0&&Ae.beginShadows();const ie=p.state.shadowsArray;ne.render(ie,E,W),xe===!0&&Ae.endShadows(),this.info.autoReset===!0&&this.info.reset();const ee=m.opaque,z=m.transmissive;if(p.setupLights(),W.isArrayCamera){const Re=W.cameras;if(z.length>0)for(let Me=0,Ve=Re.length;Me<Ve;Me++){const Ze=Re[Me];yi(ee,z,E,Ze)}ut&&tt.render(E);for(let Me=0,Ve=Re.length;Me<Ve;Me++){const Ze=Re[Me];pn(m,E,Ze,Ze.viewport)}}else z.length>0&&yi(ee,z,E,W),ut&&tt.render(E),pn(m,E,W);S!==null&&(I.updateMultisampleRenderTarget(S),I.updateRenderTargetMipmap(S)),E.isScene===!0&&E.onAfterRender(b,E,W),Bt.resetDefaultState(),x=-1,y=null,M.pop(),M.length>0?(p=M[M.length-1],xe===!0&&Ae.setGlobalState(b.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function Pn(E,W,ie,ee){if(E.visible===!1)return;if(E.layers.test(W.layers)){if(E.isGroup)ie=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(W);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||re.intersectsSprite(E)){ee&&ot.setFromMatrixPosition(E.matrixWorld).applyMatrix4(et);const Me=de.update(E),Ve=E.material;Ve.visible&&m.push(E,Me,Ve,ie,ot.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||re.intersectsObject(E))){const Me=de.update(E),Ve=E.material;if(ee&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),ot.copy(E.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),ot.copy(Me.boundingSphere.center)),ot.applyMatrix4(E.matrixWorld).applyMatrix4(et)),Array.isArray(Ve)){const Ze=Me.groups;for(let st=0,gt=Ze.length;st<gt;st++){const ze=Ze[st],dt=Ve[ze.materialIndex];dt&&dt.visible&&m.push(E,Me,dt,ie,ot.z,ze)}}else Ve.visible&&m.push(E,Me,Ve,ie,ot.z,null)}}const Re=E.children;for(let Me=0,Ve=Re.length;Me<Ve;Me++)Pn(Re[Me],W,ie,ee)}function pn(E,W,ie,ee){const z=E.opaque,Re=E.transmissive,Me=E.transparent;p.setupLightsView(ie),xe===!0&&Ae.setGlobalState(b.clippingPlanes,ie),ee&&Je.viewport(R.copy(ee)),z.length>0&&On(z,W,ie),Re.length>0&&On(Re,W,ie),Me.length>0&&On(Me,W,ie),Je.buffers.depth.setTest(!0),Je.buffers.depth.setMask(!0),Je.buffers.color.setMask(!0),Je.setPolygonOffset(!1)}function yi(E,W,ie,ee){if((ie.isScene===!0?ie.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[ee.id]===void 0&&(p.state.transmissionRenderTarget[ee.id]=new Ui(1,1,{generateMipmaps:!0,type:ft.has("EXT_color_buffer_half_float")||ft.has("EXT_color_buffer_float")?1016:1009,minFilter:1008,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:It.workingColorSpace}));const Re=p.state.transmissionRenderTarget[ee.id],Me=ee.viewport||R;Re.setSize(Me.z,Me.w);const Ve=b.getRenderTarget();b.setRenderTarget(Re),b.getClearColor(K),oe=b.getClearAlpha(),oe<1&&b.setClearColor(16777215,.5),b.clear(),ut&&tt.render(ie);const Ze=b.toneMapping;b.toneMapping=0;const st=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),p.setupLightsView(ee),xe===!0&&Ae.setGlobalState(b.clippingPlanes,ee),On(E,ie,ee),I.updateMultisampleRenderTarget(Re),I.updateRenderTargetMipmap(Re),ft.has("WEBGL_multisampled_render_to_texture")===!1){let gt=!1;for(let ze=0,dt=W.length;ze<dt;ze++){const ct=W[ze],at=ct.object,Tt=ct.geometry,Lt=ct.material,qe=ct.group;if(Lt.side===2&&at.layers.test(ee.layers)){const bt=Lt.side;Lt.side=1,Lt.needsUpdate=!0,En(at,ie,ee,Tt,Lt,qe),Lt.side=bt,Lt.needsUpdate=!0,gt=!0}}gt===!0&&(I.updateMultisampleRenderTarget(Re),I.updateRenderTargetMipmap(Re))}b.setRenderTarget(Ve),b.setClearColor(K,oe),st!==void 0&&(ee.viewport=st),b.toneMapping=Ze}function On(E,W,ie){const ee=W.isScene===!0?W.overrideMaterial:null;for(let z=0,Re=E.length;z<Re;z++){const Me=E[z],Ve=Me.object,Ze=Me.geometry,st=ee===null?Me.material:ee,gt=Me.group;Ve.layers.test(ie.layers)&&En(Ve,W,ie,Ze,st,gt)}}function En(E,W,ie,ee,z,Re){E.onBeforeRender(b,W,ie,ee,z,Re),E.modelViewMatrix.multiplyMatrices(ie.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),z.onBeforeRender(b,W,ie,ee,E,Re),z.transparent===!0&&z.side===2&&z.forceSinglePass===!1?(z.side=1,z.needsUpdate=!0,b.renderBufferDirect(ie,W,ee,z,E,Re),z.side=0,z.needsUpdate=!0,b.renderBufferDirect(ie,W,ee,z,E,Re),z.side=2):b.renderBufferDirect(ie,W,ee,z,E,Re),E.onAfterRender(b,W,ie,ee,z,Re)}function on(E,W,ie){W.isScene!==!0&&(W=Mt);const ee=Ke.get(E),z=p.state.lights,Re=p.state.shadowsArray,Me=z.state.version,Ve=Fe.getParameters(E,z.state,Re,W,ie),Ze=Fe.getProgramCacheKey(Ve);let st=ee.programs;ee.environment=E.isMeshStandardMaterial?W.environment:null,ee.fog=W.fog,ee.envMap=(E.isMeshStandardMaterial?$:w).get(E.envMap||ee.environment),ee.envMapRotation=ee.environment!==null&&E.envMap===null?W.environmentRotation:E.envMapRotation,st===void 0&&(E.addEventListener("dispose",He),st=new Map,ee.programs=st);let gt=st.get(Ze);if(gt!==void 0){if(ee.currentProgram===gt&&ee.lightsStateVersion===Me)return Tn(E,Ve),gt}else Ve.uniforms=Fe.getUniforms(E),E.onBeforeCompile(Ve,b),gt=Fe.acquireProgram(Ve,Ze),st.set(Ze,gt),ee.uniforms=Ve.uniforms;const ze=ee.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(ze.clippingPlanes=Ae.uniform),Tn(E,Ve),ee.needsLights=Si(E),ee.lightsStateVersion=Me,ee.needsLights&&(ze.ambientLightColor.value=z.state.ambient,ze.lightProbe.value=z.state.probe,ze.directionalLights.value=z.state.directional,ze.directionalLightShadows.value=z.state.directionalShadow,ze.spotLights.value=z.state.spot,ze.spotLightShadows.value=z.state.spotShadow,ze.rectAreaLights.value=z.state.rectArea,ze.ltc_1.value=z.state.rectAreaLTC1,ze.ltc_2.value=z.state.rectAreaLTC2,ze.pointLights.value=z.state.point,ze.pointLightShadows.value=z.state.pointShadow,ze.hemisphereLights.value=z.state.hemi,ze.directionalShadowMap.value=z.state.directionalShadowMap,ze.directionalShadowMatrix.value=z.state.directionalShadowMatrix,ze.spotShadowMap.value=z.state.spotShadowMap,ze.spotLightMatrix.value=z.state.spotLightMatrix,ze.spotLightMap.value=z.state.spotLightMap,ze.pointShadowMap.value=z.state.pointShadowMap,ze.pointShadowMatrix.value=z.state.pointShadowMatrix),ee.currentProgram=gt,ee.uniformsList=null,gt}function Xn(E){if(E.uniformsList===null){const W=E.currentProgram.getUniforms();E.uniformsList=js.seqWithValue(W.seq,E.uniforms)}return E.uniformsList}function Tn(E,W){const ie=Ke.get(E);ie.outputColorSpace=W.outputColorSpace,ie.batching=W.batching,ie.batchingColor=W.batchingColor,ie.instancing=W.instancing,ie.instancingColor=W.instancingColor,ie.instancingMorph=W.instancingMorph,ie.skinning=W.skinning,ie.morphTargets=W.morphTargets,ie.morphNormals=W.morphNormals,ie.morphColors=W.morphColors,ie.morphTargetsCount=W.morphTargetsCount,ie.numClippingPlanes=W.numClippingPlanes,ie.numIntersection=W.numClipIntersection,ie.vertexAlphas=W.vertexAlphas,ie.vertexTangents=W.vertexTangents,ie.toneMapping=W.toneMapping}function mn(E,W,ie,ee,z){W.isScene!==!0&&(W=Mt),I.resetTextureUnits();const Re=W.fog,Me=ee.isMeshStandardMaterial?W.environment:null,Ve=S===null?b.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:Cn,Ze=(ee.isMeshStandardMaterial?$:w).get(ee.envMap||Me),st=ee.vertexColors===!0&&!!ie.attributes.color&&ie.attributes.color.itemSize===4,gt=!!ie.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),ze=!!ie.morphAttributes.position,dt=!!ie.morphAttributes.normal,ct=!!ie.morphAttributes.color;let at=0;ee.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(at=b.toneMapping);const Tt=ie.morphAttributes.position||ie.morphAttributes.normal||ie.morphAttributes.color,Lt=Tt!==void 0?Tt.length:0,qe=Ke.get(ee),bt=p.state.lights;if(xe===!0&&(Ne===!0||E!==y)){const nn=E===y&&ee.id===x;Ae.setState(ee,E,nn)}let vt=!1;ee.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==bt.state.version||qe.outputColorSpace!==Ve||z.isBatchedMesh&&qe.batching===!1||!z.isBatchedMesh&&qe.batching===!0||z.isBatchedMesh&&qe.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&qe.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&qe.instancing===!1||!z.isInstancedMesh&&qe.instancing===!0||z.isSkinnedMesh&&qe.skinning===!1||!z.isSkinnedMesh&&qe.skinning===!0||z.isInstancedMesh&&qe.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&qe.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&qe.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&qe.instancingMorph===!1&&z.morphTexture!==null||qe.envMap!==Ze||ee.fog===!0&&qe.fog!==Re||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==Ae.numPlanes||qe.numIntersection!==Ae.numIntersection)||qe.vertexAlphas!==st||qe.vertexTangents!==gt||qe.morphTargets!==ze||qe.morphNormals!==dt||qe.morphColors!==ct||qe.toneMapping!==at||qe.morphTargetsCount!==Lt)&&(vt=!0):(vt=!0,qe.__version=ee.version);let yt=qe.currentProgram;vt===!0&&(yt=on(ee,W,z));let tn=!1,Kt=!1,Ln=!1;const Ct=yt.getUniforms(),Ut=qe.uniforms;if(Je.useProgram(yt.program)&&(tn=!0,Kt=!0,Ln=!0),ee.id!==x&&(x=ee.id,Kt=!0),tn||y!==E){Je.buffers.depth.getReversed()?(Ee.copy(E.projectionMatrix),Mh(Ee),yh(Ee),Ct.setValue(J,"projectionMatrix",Ee)):Ct.setValue(J,"projectionMatrix",E.projectionMatrix),Ct.setValue(J,"viewMatrix",E.matrixWorldInverse);const gn=Ct.map.cameraPosition;gn!==void 0&&gn.setValue(J,nt.setFromMatrixPosition(E.matrixWorld)),ht.logarithmicDepthBuffer&&Ct.setValue(J,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&Ct.setValue(J,"isOrthographic",E.isOrthographicCamera===!0),y!==E&&(y=E,Kt=!0,Ln=!0)}if(z.isSkinnedMesh){Ct.setOptional(J,z,"bindMatrix"),Ct.setOptional(J,z,"bindMatrixInverse");const nn=z.skeleton;nn&&(nn.boneTexture===null&&nn.computeBoneTexture(),Ct.setValue(J,"boneTexture",nn.boneTexture,I))}z.isBatchedMesh&&(Ct.setOptional(J,z,"batchingTexture"),Ct.setValue(J,"batchingTexture",z._matricesTexture,I),Ct.setOptional(J,z,"batchingIdTexture"),Ct.setValue(J,"batchingIdTexture",z._indirectTexture,I),Ct.setOptional(J,z,"batchingColorTexture"),z._colorsTexture!==null&&Ct.setValue(J,"batchingColorTexture",z._colorsTexture,I));const wn=ie.morphAttributes;if((wn.position!==void 0||wn.normal!==void 0||wn.color!==void 0)&&rt.update(z,ie,yt),(Kt||qe.receiveShadow!==z.receiveShadow)&&(qe.receiveShadow=z.receiveShadow,Ct.setValue(J,"receiveShadow",z.receiveShadow)),ee.isMeshGouraudMaterial&&ee.envMap!==null&&(Ut.envMap.value=Ze,Ut.flipEnvMap.value=Ze.isCubeTexture&&Ze.isRenderTargetTexture===!1?-1:1),ee.isMeshStandardMaterial&&ee.envMap===null&&W.environment!==null&&(Ut.envMapIntensity.value=W.environmentIntensity),Kt&&(Ct.setValue(J,"toneMappingExposure",b.toneMappingExposure),qe.needsLights&&it(Ut,Ln),Re&&ee.fog===!0&&Ce.refreshFogUniforms(Ut,Re),Ce.refreshMaterialUniforms(Ut,ee,H,Y,p.state.transmissionRenderTarget[E.id]),js.upload(J,Xn(qe),Ut,I)),ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(js.upload(J,Xn(qe),Ut,I),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&Ct.setValue(J,"center",z.center),Ct.setValue(J,"modelViewMatrix",z.modelViewMatrix),Ct.setValue(J,"normalMatrix",z.normalMatrix),Ct.setValue(J,"modelMatrix",z.matrixWorld),ee.isShaderMaterial||ee.isRawShaderMaterial){const nn=ee.uniformsGroups;for(let gn=0,Dn=nn.length;gn<Dn;gn++){const L=nn[gn];j.update(L,yt),j.bind(L,yt)}}return yt}function it(E,W){E.ambientLightColor.needsUpdate=W,E.lightProbe.needsUpdate=W,E.directionalLights.needsUpdate=W,E.directionalLightShadows.needsUpdate=W,E.pointLights.needsUpdate=W,E.pointLightShadows.needsUpdate=W,E.spotLights.needsUpdate=W,E.spotLightShadows.needsUpdate=W,E.rectAreaLights.needsUpdate=W,E.hemisphereLights.needsUpdate=W}function Si(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(E,W,ie){Ke.get(E.texture).__webglTexture=W,Ke.get(E.depthTexture).__webglTexture=ie;const ee=Ke.get(E);ee.__hasExternalTextures=!0,ee.__autoAllocateDepthBuffer=ie===void 0,ee.__autoAllocateDepthBuffer||ft.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ee.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,W){const ie=Ke.get(E);ie.__webglFramebuffer=W,ie.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(E,W=0,ie=0){S=E,T=W,C=ie;let ee=!0,z=null,Re=!1,Me=!1;if(E){const Ze=Ke.get(E);if(Ze.__useDefaultFramebuffer!==void 0)Je.bindFramebuffer(J.FRAMEBUFFER,null),ee=!1;else if(Ze.__webglFramebuffer===void 0)I.setupRenderTarget(E);else if(Ze.__hasExternalTextures)I.rebindTextures(E,Ke.get(E.texture).__webglTexture,Ke.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const ze=E.depthTexture;if(Ze.__boundDepthTexture!==ze){if(ze!==null&&Ke.has(ze)&&(E.width!==ze.image.width||E.height!==ze.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(E)}}const st=E.texture;(st.isData3DTexture||st.isDataArrayTexture||st.isCompressedArrayTexture)&&(Me=!0);const gt=Ke.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(gt[W])?z=gt[W][ie]:z=gt[W],Re=!0):E.samples>0&&I.useMultisampledRTT(E)===!1?z=Ke.get(E).__webglMultisampledFramebuffer:Array.isArray(gt)?z=gt[ie]:z=gt,R.copy(E.viewport),G.copy(E.scissor),k=E.scissorTest}else R.copy(te).multiplyScalar(H).floor(),G.copy(Te).multiplyScalar(H).floor(),k=Pe;if(Je.bindFramebuffer(J.FRAMEBUFFER,z)&&ee&&Je.drawBuffers(E,z),Je.viewport(R),Je.scissor(G),Je.setScissorTest(k),Re){const Ze=Ke.get(E.texture);J.framebufferTexture2D(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ze.__webglTexture,ie)}else if(Me){const Ze=Ke.get(E.texture),st=W||0;J.framebufferTextureLayer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0,Ze.__webglTexture,ie||0,st)}x=-1},this.readRenderTargetPixels=function(E,W,ie,ee,z,Re,Me){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ve=Ke.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Me!==void 0&&(Ve=Ve[Me]),Ve){Je.bindFramebuffer(J.FRAMEBUFFER,Ve);try{const Ze=E.texture,st=Ze.format,gt=Ze.type;if(!ht.textureFormatReadable(st)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ht.textureTypeReadable(gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=E.width-ee&&ie>=0&&ie<=E.height-z&&J.readPixels(W,ie,ee,z,xt.convert(st),xt.convert(gt),Re)}finally{const Ze=S!==null?Ke.get(S).__webglFramebuffer:null;Je.bindFramebuffer(J.FRAMEBUFFER,Ze)}}},this.readRenderTargetPixelsAsync=async function(E,W,ie,ee,z,Re,Me){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ve=Ke.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Me!==void 0&&(Ve=Ve[Me]),Ve){const Ze=E.texture,st=Ze.format,gt=Ze.type;if(!ht.textureFormatReadable(st))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ht.textureTypeReadable(gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(W>=0&&W<=E.width-ee&&ie>=0&&ie<=E.height-z){Je.bindFramebuffer(J.FRAMEBUFFER,Ve);const ze=J.createBuffer();J.bindBuffer(J.PIXEL_PACK_BUFFER,ze),J.bufferData(J.PIXEL_PACK_BUFFER,Re.byteLength,J.STREAM_READ),J.readPixels(W,ie,ee,z,xt.convert(st),xt.convert(gt),0);const dt=S!==null?Ke.get(S).__webglFramebuffer:null;Je.bindFramebuffer(J.FRAMEBUFFER,dt);const ct=J.fenceSync(J.SYNC_GPU_COMMANDS_COMPLETE,0);return J.flush(),await vh(J,ct,4),J.bindBuffer(J.PIXEL_PACK_BUFFER,ze),J.getBufferSubData(J.PIXEL_PACK_BUFFER,0,Re),J.deleteBuffer(ze),J.deleteSync(ct),Re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,W=null,ie=0){E.isTexture!==!0&&(Xr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),W=arguments[0]||null,E=arguments[1]);const ee=Math.pow(2,-ie),z=Math.floor(E.image.width*ee),Re=Math.floor(E.image.height*ee),Me=W!==null?W.x:0,Ve=W!==null?W.y:0;I.setTexture2D(E,0),J.copyTexSubImage2D(J.TEXTURE_2D,ie,0,0,Me,Ve,z,Re),Je.unbindTexture()},this.copyTextureToTexture=function(E,W,ie=null,ee=null,z=0){E.isTexture!==!0&&(Xr("WebGLRenderer: copyTextureToTexture function signature has changed."),ee=arguments[0]||null,E=arguments[1],W=arguments[2],z=arguments[3]||0,ie=null);let Re,Me,Ve,Ze,st,gt,ze,dt,ct;const at=E.isCompressedTexture?E.mipmaps[z]:E.image;ie!==null?(Re=ie.max.x-ie.min.x,Me=ie.max.y-ie.min.y,Ve=ie.isBox3?ie.max.z-ie.min.z:1,Ze=ie.min.x,st=ie.min.y,gt=ie.isBox3?ie.min.z:0):(Re=at.width,Me=at.height,Ve=at.depth||1,Ze=0,st=0,gt=0),ee!==null?(ze=ee.x,dt=ee.y,ct=ee.z):(ze=0,dt=0,ct=0);const Tt=xt.convert(W.format),Lt=xt.convert(W.type);let qe;W.isData3DTexture?(I.setTexture3D(W,0),qe=J.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(I.setTexture2DArray(W,0),qe=J.TEXTURE_2D_ARRAY):(I.setTexture2D(W,0),qe=J.TEXTURE_2D),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,W.flipY),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),J.pixelStorei(J.UNPACK_ALIGNMENT,W.unpackAlignment);const bt=J.getParameter(J.UNPACK_ROW_LENGTH),vt=J.getParameter(J.UNPACK_IMAGE_HEIGHT),yt=J.getParameter(J.UNPACK_SKIP_PIXELS),tn=J.getParameter(J.UNPACK_SKIP_ROWS),Kt=J.getParameter(J.UNPACK_SKIP_IMAGES);J.pixelStorei(J.UNPACK_ROW_LENGTH,at.width),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,at.height),J.pixelStorei(J.UNPACK_SKIP_PIXELS,Ze),J.pixelStorei(J.UNPACK_SKIP_ROWS,st),J.pixelStorei(J.UNPACK_SKIP_IMAGES,gt);const Ln=E.isDataArrayTexture||E.isData3DTexture,Ct=W.isDataArrayTexture||W.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const Ut=Ke.get(E),wn=Ke.get(W),nn=Ke.get(Ut.__renderTarget),gn=Ke.get(wn.__renderTarget);Je.bindFramebuffer(J.READ_FRAMEBUFFER,nn.__webglFramebuffer),Je.bindFramebuffer(J.DRAW_FRAMEBUFFER,gn.__webglFramebuffer);for(let Dn=0;Dn<Ve;Dn++)Ln&&J.framebufferTextureLayer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,Ke.get(E).__webglTexture,z,gt+Dn),E.isDepthTexture?(Ct&&J.framebufferTextureLayer(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,Ke.get(W).__webglTexture,z,ct+Dn),J.blitFramebuffer(Ze,st,Re,Me,ze,dt,Re,Me,J.DEPTH_BUFFER_BIT,J.NEAREST)):Ct?J.copyTexSubImage3D(qe,z,ze,dt,ct+Dn,Ze,st,Re,Me):J.copyTexSubImage2D(qe,z,ze,dt,ct+Dn,Ze,st,Re,Me);Je.bindFramebuffer(J.READ_FRAMEBUFFER,null),Je.bindFramebuffer(J.DRAW_FRAMEBUFFER,null)}else Ct?E.isDataTexture||E.isData3DTexture?J.texSubImage3D(qe,z,ze,dt,ct,Re,Me,Ve,Tt,Lt,at.data):W.isCompressedArrayTexture?J.compressedTexSubImage3D(qe,z,ze,dt,ct,Re,Me,Ve,Tt,at.data):J.texSubImage3D(qe,z,ze,dt,ct,Re,Me,Ve,Tt,Lt,at):E.isDataTexture?J.texSubImage2D(J.TEXTURE_2D,z,ze,dt,Re,Me,Tt,Lt,at.data):E.isCompressedTexture?J.compressedTexSubImage2D(J.TEXTURE_2D,z,ze,dt,at.width,at.height,Tt,at.data):J.texSubImage2D(J.TEXTURE_2D,z,ze,dt,Re,Me,Tt,Lt,at);J.pixelStorei(J.UNPACK_ROW_LENGTH,bt),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,vt),J.pixelStorei(J.UNPACK_SKIP_PIXELS,yt),J.pixelStorei(J.UNPACK_SKIP_ROWS,tn),J.pixelStorei(J.UNPACK_SKIP_IMAGES,Kt),z===0&&W.generateMipmaps&&J.generateMipmap(qe),Je.unbindTexture()},this.copyTextureToTexture3D=function(E,W,ie=null,ee=null,z=0){return E.isTexture!==!0&&(Xr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ie=arguments[0]||null,ee=arguments[1]||null,E=arguments[2],W=arguments[3],z=arguments[4]||0),Xr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,W,ie,ee,z)},this.initRenderTarget=function(E){Ke.get(E).__webglFramebuffer===void 0&&I.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?I.setTextureCube(E,0):E.isData3DTexture?I.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?I.setTexture2DArray(E,0):I.setTexture2D(E,0),Je.unbindTexture()},this.resetState=function(){T=0,C=0,S=null,Je.reset(),Bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=It._getDrawingBufferColorSpace(e),t.unpackColorSpace=It._getUnpackColorSpace()}}class yc extends $t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wn,this.environmentIntensity=1,this.environmentRotation=new Wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Al{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=ni()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const An=new N;class es{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)An.fromBufferAttribute(this,t),An.applyMatrix4(e),this.setXYZ(t,An.x,An.y,An.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)An.fromBufferAttribute(this,t),An.applyNormalMatrix(e),this.setXYZ(t,An.x,An.y,An.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)An.fromBufferAttribute(this,t),An.transformDirection(e),this.setXYZ(t,An.x,An.y,An.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ei(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ht(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ht(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ei(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ei(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ei(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ei(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array),i=Ht(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array),i=Ht(i,this.array),s=Ht(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new es(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Rl extends Yn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Qe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ur;const Nr=new N,fr=new N,dr=new N,pr=new Be,Ur=new Be,Cl=new $e,Ls=new N,Or=new N,Ds=new N,Sc=new Be,Fa=new Be,Ec=new Be;class Im extends $t{constructor(e=new Rl){if(super(),this.isSprite=!0,this.type="Sprite",ur===void 0){ur=new qt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Al(t,5);ur.setIndex([0,1,2,0,2,3]),ur.setAttribute("position",new es(n,3,0,!1)),ur.setAttribute("uv",new es(n,2,3,!1))}this.geometry=ur,this.material=e,this.center=new Be(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),fr.setFromMatrixScale(this.matrixWorld),Cl.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),dr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&fr.multiplyScalar(-dr.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const a=this.center;Is(Ls.set(-.5,-.5,0),dr,a,fr,i,s),Is(Or.set(.5,-.5,0),dr,a,fr,i,s),Is(Ds.set(.5,.5,0),dr,a,fr,i,s),Sc.set(0,0),Fa.set(1,0),Ec.set(1,1);let o=e.ray.intersectTriangle(Ls,Or,Ds,!1,Nr);if(o===null&&(Is(Or.set(-.5,.5,0),dr,a,fr,i,s),Fa.set(0,1),o=e.ray.intersectTriangle(Ls,Ds,Or,!1,Nr),o===null))return;const c=e.ray.origin.distanceTo(Nr);c<e.near||c>e.far||t.push({distance:c,point:Nr.clone(),uv:Kn.getInterpolation(Nr,Ls,Or,Ds,Sc,Fa,Ec,new Be),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Is(r,e,t,n,i,s){pr.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(Ur.x=s*pr.x-i*pr.y,Ur.y=i*pr.x+s*pr.y):Ur.copy(pr),r.copy(e),r.x+=Ur.x,r.y+=Ur.y,r.applyMatrix4(Cl)}const Tc=new N,wc=new Ft,Ac=new Ft,Fm=new N,Rc=new $e,Fs=new N,Na=new ai,Cc=new $e,Ua=new $s;class Nm extends Ye{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ro,this.bindMatrix=new $e,this.bindMatrixInverse=new $e,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Mn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Fs),this.boundingBox.expandByPoint(Fs)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ai),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Fs),this.boundingSphere.expandByPoint(Fs)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Na.copy(this.boundingSphere),Na.applyMatrix4(i),e.ray.intersectsSphere(Na)!==!1&&(Cc.copy(i).invert(),Ua.copy(e.ray).applyMatrix4(Cc),!(this.boundingBox!==null&&Ua.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ua)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Ft,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ro?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===th?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;wc.fromBufferAttribute(i.attributes.skinIndex,e),Ac.fromBufferAttribute(i.attributes.skinWeight,e),Tc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const a=Ac.getComponent(s);if(a!==0){const o=wc.getComponent(s);Rc.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Fm.copy(Tc).applyMatrix4(Rc),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Pl extends $t{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Ll extends an{constructor(e=null,t=1,n=1,i,s,a,o,c,l=1003,u=1003,h,f){super(null,a,o,c,l,u,i,s,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Pc=new $e,Um=new $e;class go{constructor(e=[],t=[]){this.uuid=ni(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new $e)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new $e;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:Um;Pc.multiplyMatrices(o,t[s]),Pc.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new go(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Ll(t,e,e,1023,1015);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new Pl),this.bones.push(a),this.boneInverses.push(new $e().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class io extends zt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const mr=new $e,Lc=new $e,Ns=[],Dc=new Mn,Om=new $e,Br=new Ye,kr=new ai;class Un extends Ye{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new io(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Om)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Mn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,mr),Dc.copy(e.boundingBox).applyMatrix4(mr),this.boundingBox.union(Dc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ai),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,mr),kr.copy(e.boundingSphere).applyMatrix4(mr),this.boundingSphere.union(kr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Br.geometry=this.geometry,Br.material=this.material,Br.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),kr.copy(this.boundingSphere),kr.applyMatrix4(n),e.ray.intersectsSphere(kr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,mr),Lc.multiplyMatrices(n,mr),Br.matrixWorld=Lc,Br.raycast(e,Ns);for(let a=0,o=Ns.length;a<o;a++){const c=Ns[a];c.instanceId=s,c.object=this,t.push(c)}Ns.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new io(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ll(new Float32Array(i*this.count),i,this.count,1028,1015));const s=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Dl extends Yn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const qs=new N,Ks=new N,Ic=new $e,zr=new $s,Us=new ai,Oa=new N,Fc=new N;class bo extends $t{constructor(e=new qt,t=new Dl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)qs.fromBufferAttribute(t,i-1),Ks.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=qs.distanceTo(Ks);e.setAttribute("lineDistance",new Pt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Us.copy(n.boundingSphere),Us.applyMatrix4(i),Us.radius+=s,e.ray.intersectsSphere(Us)===!1)return;Ic.copy(i).invert(),zr.copy(e.ray).applyMatrix4(Ic);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){const p=u.getX(_),v=u.getX(_+1),M=Os(this,e,zr,c,p,v);M&&t.push(M)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(d),p=Os(this,e,zr,c,_,m);p&&t.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){const p=Os(this,e,zr,c,_,_+1);p&&t.push(p)}if(this.isLineLoop){const _=Os(this,e,zr,c,g-1,d);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Os(r,e,t,n,i,s){const a=r.geometry.attributes.position;if(qs.fromBufferAttribute(a,i),Ks.fromBufferAttribute(a,s),t.distanceSqToSegment(qs,Ks,Oa,Fc)>n)return;Oa.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Oa);if(!(c<e.near||c>e.far))return{distance:c,point:Fc.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}const Nc=new N,Uc=new N;class Bm extends bo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Nc.fromBufferAttribute(t,i),Uc.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Nc.distanceTo(Uc);e.setAttribute("lineDistance",new Pt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class km extends bo{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Il extends Yn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Oc=new $e,ro=new $s,Bs=new ai,ks=new N;class zm extends $t{constructor(e=new qt,t=new Il){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Bs.copy(n.boundingSphere),Bs.applyMatrix4(i),Bs.radius+=s,e.ray.intersectsSphere(Bs)===!1)return;Oc.copy(i).invert(),ro.copy(e.ray).applyMatrix4(Oc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){const f=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);for(let g=f,_=d;g<_;g++){const m=l.getX(g);ks.fromBufferAttribute(h,m),Bc(ks,m,c,i,e,t,this)}}else{const f=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);for(let g=f,_=d;g<_;g++)ks.fromBufferAttribute(h,g),Bc(ks,g,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Bc(r,e,t,n,i,s,a){const o=ro.distanceSqToPoint(r);if(o<t){const c=new N;ro.closestPointToPoint(r,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class ti extends an{constructor(e,t,n,i,s,a,o,c,l){super(e,t,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class oi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,c=s-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(s-1);const u=n[i],f=n[i+1]-u,d=(a-u)/f;return(i+d)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const a=this.getPoint(i),o=this.getPoint(s),c=t||(a.isVector2?new Be:new N);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new N,i=[],s=[],a=[],o=new N,c=new $e;for(let d=0;d<=e;d++){const g=d/e;i[d]=this.getTangentAt(g,new N)}s[0]=new N,a[0]=new N;let l=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),f<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(cn(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(c.makeRotationAxis(o,g))}a[d].crossVectors(i[d],s[d])}if(t===!0){let d=Math.acos(cn(s[0].dot(s[e]),-1,1));d/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(d=-d);for(let g=1;g<=e;g++)s[g].applyMatrix4(c.makeRotationAxis(i[g],d*g)),a[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class _o extends oi{constructor(e=0,t=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new Be){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);const o=this.aStartAngle+e*s;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*u-d*h+this.aX,l=f*h+d*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Gm extends _o{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function xo(){let r=0,e=0,t=0,n=0;function i(s,a,o,c){r=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){i(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,u,h){let f=(a-s)/l-(o-s)/(l+u)+(o-a)/u,d=(o-a)/u-(c-a)/(u+h)+(c-o)/h;f*=u,d*=u,i(a,o,f,d)},calc:function(s){const a=s*s,o=a*s;return r+e*s+t*a+n*o}}}const zs=new N,Ba=new xo,ka=new xo,za=new xo;class na extends oi{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new N){const n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:c===0&&o===s-1&&(o=s-2,c=1);let l,u;this.closed||o>0?l=i[(o-1)%s]:(zs.subVectors(i[0],i[1]).add(i[0]),l=zs);const h=i[o%s],f=i[(o+1)%s];if(this.closed||o+2<s?u=i[(o+2)%s]:(zs.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=zs),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),d),_=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Ba.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,g,_,m),ka.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,g,_,m),za.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(Ba.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),ka.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),za.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return n.set(Ba.calc(c),ka.calc(c),za.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new N().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function kc(r,e,t,n,i){const s=(n-e)*.5,a=(i-t)*.5,o=r*r,c=r*o;return(2*t-2*n+s+a)*c+(-3*t+3*n-2*s-a)*o+s*r+t}function Hm(r,e){const t=1-r;return t*t*e}function Vm(r,e){return 2*(1-r)*r*e}function Wm(r,e){return r*r*e}function Yr(r,e,t,n){return Hm(r,e)+Vm(r,t)+Wm(r,n)}function Xm(r,e){const t=1-r;return t*t*t*e}function jm(r,e){const t=1-r;return 3*t*t*r*e}function qm(r,e){return 3*(1-r)*r*r*e}function Km(r,e){return r*r*r*e}function Jr(r,e,t,n,i){return Xm(r,e)+jm(r,t)+qm(r,n)+Km(r,i)}class Fl extends oi{constructor(e=new Be,t=new Be,n=new Be,i=new Be){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new Be){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Jr(e,i.x,s.x,a.x,o.x),Jr(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ym extends oi{constructor(e=new N,t=new N,n=new N,i=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new N){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Jr(e,i.x,s.x,a.x,o.x),Jr(e,i.y,s.y,a.y,o.y),Jr(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Nl extends oi{constructor(e=new Be,t=new Be){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Be){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Be){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ul extends oi{constructor(e=new N,t=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new N){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new N){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ol extends oi{constructor(e=new Be,t=new Be,n=new Be){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Be){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Yr(e,i.x,s.x,a.x),Yr(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Bl extends oi{constructor(e=new N,t=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new N){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Yr(e,i.x,s.x,a.x),Yr(e,i.y,s.y,a.y),Yr(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class kl extends oi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Be){const n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,c=i[a===0?a:a-1],l=i[a],u=i[a>i.length-2?i.length-1:a+1],h=i[a>i.length-3?i.length-1:a+2];return n.set(kc(o,c.x,l.x,u.x,h.x),kc(o,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new Be().fromArray(i))}return this}}var so=Object.freeze({__proto__:null,ArcCurve:Gm,CatmullRomCurve3:na,CubicBezierCurve:Fl,CubicBezierCurve3:Ym,EllipseCurve:_o,LineCurve:Nl,LineCurve3:Ul,QuadraticBezierCurve:Ol,QuadraticBezierCurve3:Bl,SplineCurve:kl});class zl extends oi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new so[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const a=i[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const a=s[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new so[i.type]().fromJSON(i))}return this}}class Jm extends zl{constructor(e){super(),this.type="Path",this.currentPoint=new Be,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Nl(this.currentPoint.clone(),new Be(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new Ol(this.currentPoint.clone(),new Be(e,t),new Be(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){const o=new Fl(this.currentPoint.clone(),new Be(e,t),new Be(n,i),new Be(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new kl(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,i,s,a,o,c),this}absellipse(e,t,n,i,s,a,o,c){const l=new _o(e,t,n,i,s,a,o,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class vo extends qt{constructor(e=[new Be(0,-.5),new Be(.5,0),new Be(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=cn(i,0,Math.PI*2);const s=[],a=[],o=[],c=[],l=[],u=1/t,h=new N,f=new Be,d=new N,g=new N,_=new N;let m=0,p=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:m=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,d.x=p*1,d.y=-m,d.z=p*0,_.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:m=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),c.push(d.x,d.y,d.z),_.copy(g)}for(let v=0;v<=t;v++){const M=n+v*u*i,b=Math.sin(M),P=Math.cos(M);for(let T=0;T<=e.length-1;T++){h.x=e[T].x*b,h.y=e[T].y,h.z=e[T].x*P,a.push(h.x,h.y,h.z),f.x=v/t,f.y=T/(e.length-1),o.push(f.x,f.y);const C=c[3*T+0]*b,S=c[3*T+1],x=c[3*T+0]*P;l.push(C,S,x)}}for(let v=0;v<t;v++)for(let M=0;M<e.length-1;M++){const b=M+v*e.length,P=b,T=b+e.length,C=b+e.length+1,S=b+1;s.push(P,T,S),s.push(C,S,T)}this.setIndex(s),this.setAttribute("position",new Pt(a,3)),this.setAttribute("uv",new Pt(o,2)),this.setAttribute("normal",new Pt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vo(e.points,e.segments,e.phiStart,e.phiLength)}}class Mo extends vo{constructor(e=1,t=1,n=4,i=8){const s=new Jm;s.absarc(0,-t/2,e,Math.PI*1.5,0),s.absarc(0,t/2,e,0,Math.PI*.5),super(s.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new Mo(e.radius,e.length,e.capSegments,e.radialSegments)}}class ia extends qt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],a=[],o=[],c=[],l=new N,u=new Be;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){const d=n+h/t*i;l.x=e*Math.cos(d),l.y=e*Math.sin(d),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[f]/e+1)/2,u.y=(a[f+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new Pt(a,3)),this.setAttribute("normal",new Pt(o,3)),this.setAttribute("uv",new Pt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ia(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Qt extends qt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const u=[],h=[],f=[],d=[];let g=0;const _=[],m=n/2;let p=0;v(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new Pt(h,3)),this.setAttribute("normal",new Pt(f,3)),this.setAttribute("uv",new Pt(d,2));function v(){const b=new N,P=new N;let T=0;const C=(t-e)/n;for(let S=0;S<=s;S++){const x=[],y=S/s,R=y*(t-e)+e;for(let G=0;G<=i;G++){const k=G/i,K=k*c+o,oe=Math.sin(K),D=Math.cos(K);P.x=R*oe,P.y=-y*n+m,P.z=R*D,h.push(P.x,P.y,P.z),b.set(oe,C,D).normalize(),f.push(b.x,b.y,b.z),d.push(k,1-y),x.push(g++)}_.push(x)}for(let S=0;S<i;S++)for(let x=0;x<s;x++){const y=_[x][S],R=_[x+1][S],G=_[x+1][S+1],k=_[x][S+1];(e>0||x!==0)&&(u.push(y,R,k),T+=3),(t>0||x!==s-1)&&(u.push(R,G,k),T+=3)}l.addGroup(p,T,0),p+=T}function M(b){const P=g,T=new Be,C=new N;let S=0;const x=b===!0?e:t,y=b===!0?1:-1;for(let G=1;G<=i;G++)h.push(0,m*y,0),f.push(0,y,0),d.push(.5,.5),g++;const R=g;for(let G=0;G<=i;G++){const K=G/i*c+o,oe=Math.cos(K),D=Math.sin(K);C.x=x*D,C.y=m*y,C.z=x*oe,h.push(C.x,C.y,C.z),f.push(0,y,0),T.x=oe*.5+.5,T.y=D*.5*y+.5,d.push(T.x,T.y),g++}for(let G=0;G<i;G++){const k=P+G,K=R+G;b===!0?u.push(K,K+1,k):u.push(K+1,K,k),S+=3}l.addGroup(p,S,b===!0?1:2),p+=S}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ys extends Qt{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Ys(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class yo extends qt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],a=[];o(i),l(n),u(),this.setAttribute("position",new Pt(s,3)),this.setAttribute("normal",new Pt(s.slice(),3)),this.setAttribute("uv",new Pt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const M=new N,b=new N,P=new N;for(let T=0;T<t.length;T+=3)d(t[T+0],M),d(t[T+1],b),d(t[T+2],P),c(M,b,P,v)}function c(v,M,b,P){const T=P+1,C=[];for(let S=0;S<=T;S++){C[S]=[];const x=v.clone().lerp(b,S/T),y=M.clone().lerp(b,S/T),R=T-S;for(let G=0;G<=R;G++)G===0&&S===T?C[S][G]=x:C[S][G]=x.clone().lerp(y,G/R)}for(let S=0;S<T;S++)for(let x=0;x<2*(T-S)-1;x++){const y=Math.floor(x/2);x%2===0?(f(C[S][y+1]),f(C[S+1][y]),f(C[S][y])):(f(C[S][y+1]),f(C[S+1][y+1]),f(C[S+1][y]))}}function l(v){const M=new N;for(let b=0;b<s.length;b+=3)M.x=s[b+0],M.y=s[b+1],M.z=s[b+2],M.normalize().multiplyScalar(v),s[b+0]=M.x,s[b+1]=M.y,s[b+2]=M.z}function u(){const v=new N;for(let M=0;M<s.length;M+=3){v.x=s[M+0],v.y=s[M+1],v.z=s[M+2];const b=m(v)/2/Math.PI+.5,P=p(v)/Math.PI+.5;a.push(b,1-P)}g(),h()}function h(){for(let v=0;v<a.length;v+=6){const M=a[v+0],b=a[v+2],P=a[v+4],T=Math.max(M,b,P),C=Math.min(M,b,P);T>.9&&C<.1&&(M<.2&&(a[v+0]+=1),b<.2&&(a[v+2]+=1),P<.2&&(a[v+4]+=1))}}function f(v){s.push(v.x,v.y,v.z)}function d(v,M){const b=v*3;M.x=e[b+0],M.y=e[b+1],M.z=e[b+2]}function g(){const v=new N,M=new N,b=new N,P=new N,T=new Be,C=new Be,S=new Be;for(let x=0,y=0;x<s.length;x+=9,y+=6){v.set(s[x+0],s[x+1],s[x+2]),M.set(s[x+3],s[x+4],s[x+5]),b.set(s[x+6],s[x+7],s[x+8]),T.set(a[y+0],a[y+1]),C.set(a[y+2],a[y+3]),S.set(a[y+4],a[y+5]),P.copy(v).add(M).add(b).divideScalar(3);const R=m(P);_(T,y+0,v,R),_(C,y+2,M,R),_(S,y+4,b,R)}}function _(v,M,b,P){P<0&&v.x===1&&(a[M]=v.x-1),b.x===0&&b.z===0&&(a[M]=P/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yo(e.vertices,e.indices,e.radius,e.details)}}class Hn extends yo{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Hn(e.radius,e.detail)}}class So extends qt{constructor(e=.5,t=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],c=[],l=[],u=[];let h=e;const f=(t-e)/i,d=new N,g=new Be;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const p=s+m/n*a;d.x=h*Math.cos(p),d.y=h*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/t+1)/2,g.y=(d.y/t+1)/2,u.push(g.x,g.y)}h+=f}for(let _=0;_<i;_++){const m=_*(n+1);for(let p=0;p<n;p++){const v=p+m,M=v,b=v+n+1,P=v+n+2,T=v+1;o.push(M,b,T),o.push(b,P,T)}}this.setIndex(o),this.setAttribute("position",new Pt(c,3)),this.setAttribute("normal",new Pt(l,3)),this.setAttribute("uv",new Pt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new So(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class _i extends qt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new N,f=new N,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const v=[],M=p/n;let b=0;p===0&&a===0?b=.5/t:p===n&&c===Math.PI&&(b=-.5/t);for(let P=0;P<=t;P++){const T=P/t;h.x=-e*Math.cos(i+T*s)*Math.sin(a+M*o),h.y=e*Math.cos(a+M*o),h.z=e*Math.sin(i+T*s)*Math.sin(a+M*o),g.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),m.push(T+b,1-M),v.push(l++)}u.push(v)}for(let p=0;p<n;p++)for(let v=0;v<t;v++){const M=u[p][v+1],b=u[p][v],P=u[p+1][v],T=u[p+1][v+1];(p!==0||a>0)&&d.push(M,b,T),(p!==n-1||c<Math.PI)&&d.push(b,P,T)}this.setIndex(d),this.setAttribute("position",new Pt(g,3)),this.setAttribute("normal",new Pt(_,3)),this.setAttribute("uv",new Pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ra extends qt{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],c=[],l=[],u=new N,h=new N,f=new N;for(let d=0;d<=n;d++)for(let g=0;g<=i;g++){const _=g/i*s,m=d/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(_),h.y=(e+t*Math.cos(m))*Math.sin(_),h.z=t*Math.sin(m),o.push(h.x,h.y,h.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),f.subVectors(h,u).normalize(),c.push(f.x,f.y,f.z),l.push(g/i),l.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=i;g++){const _=(i+1)*d+g-1,m=(i+1)*(d-1)+g-1,p=(i+1)*(d-1)+g,v=(i+1)*d+g;a.push(_,m,v),a.push(m,p,v)}this.setIndex(a),this.setAttribute("position",new Pt(o,3)),this.setAttribute("normal",new Pt(c,3)),this.setAttribute("uv",new Pt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ra(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class wr extends qt{constructor(e=new Bl(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new N,c=new N,l=new Be;let u=new N;const h=[],f=[],d=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Pt(h,3)),this.setAttribute("normal",new Pt(f,3)),this.setAttribute("uv",new Pt(d,2));function _(){for(let M=0;M<t;M++)m(M);m(s===!1?t:0),v(),p()}function m(M){u=e.getPointAt(M/t,u);const b=a.normals[M],P=a.binormals[M];for(let T=0;T<=i;T++){const C=T/i*Math.PI*2,S=Math.sin(C),x=-Math.cos(C);c.x=x*b.x+S*P.x,c.y=x*b.y+S*P.y,c.z=x*b.z+S*P.z,c.normalize(),f.push(c.x,c.y,c.z),o.x=u.x+n*c.x,o.y=u.y+n*c.y,o.z=u.z+n*c.z,h.push(o.x,o.y,o.z)}}function p(){for(let M=1;M<=t;M++)for(let b=1;b<=i;b++){const P=(i+1)*(M-1)+(b-1),T=(i+1)*M+(b-1),C=(i+1)*M+b,S=(i+1)*(M-1)+b;g.push(P,T,S),g.push(T,C,S)}}function v(){for(let M=0;M<=t;M++)for(let b=0;b<=i;b++)l.x=M/t,l.y=b/i,d.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new wr(new so[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Bi extends Yn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ci extends Bi{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Be(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return cn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Qe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Qe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Qe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class vn extends Yn{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function Gs(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Zm(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Qm(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function zc(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let c=0;c!==e;++c)i[a++]=r[o+c]}return i}function Gl(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push.apply(t,a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}class is{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class $m extends is{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case 2401:s=e,o=2*t-n;break;case 2402:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case 2401:a=e,c=2*n-t;break;case 2402:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,p=-f*m+2*f*_-f*g,v=(1+f)*m+(-1.5-2*f)*_+(-.5+f)*g+1,M=(-1-d)*m+(1.5+d)*_+.5*g,b=d*m-d*_;for(let P=0;P!==o;++P)s[P]=p*a[u+P]+v*a[l+P]+M*a[c+P]+b*a[h+P];return s}}class eg extends is{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(i-t),h=1-u;for(let f=0;f!==o;++f)s[f]=a[l+f]*h+a[c+f]*u;return s}}class tg extends is{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class li{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Gs(t,this.TimeBufferType),this.values=Gs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Gs(e.times,Array),values:Gs(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new tg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new eg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new $m(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&Zm(i))for(let o=0,c=i.length;o!==c;++o){const l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===2302,s=e.length-1;let a=1;for(let o=1;o<s;++o){let c=!1;const l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(i)c=!0;else{const h=o*n,f=h-n,d=h+n;for(let g=0;g!==n;++g){const _=t[h+g];if(_!==t[f+g]||_!==t[d+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const h=o*n,f=a*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}li.prototype.TimeBufferType=Float32Array;li.prototype.ValueBufferType=Float32Array;li.prototype.DefaultInterpolation=2301;class Ar extends li{constructor(e,t,n){super(e,t,n)}}Ar.prototype.ValueTypeName="bool";Ar.prototype.ValueBufferType=Array;Ar.prototype.DefaultInterpolation=2300;Ar.prototype.InterpolantFactoryMethodLinear=void 0;Ar.prototype.InterpolantFactoryMethodSmooth=void 0;class Hl extends li{}Hl.prototype.ValueTypeName="color";class Mr extends li{}Mr.prototype.ValueTypeName="number";class ng extends is{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t);let l=e*o;for(let u=l+o;l!==u;l+=4)yn.slerpFlat(s,0,a,l-o,a,l,c);return s}}class yr extends li{InterpolantFactoryMethodLinear(e){return new ng(this.times,this.values,this.getValueSize(),e)}}yr.prototype.ValueTypeName="quaternion";yr.prototype.InterpolantFactoryMethodSmooth=void 0;class Rr extends li{constructor(e,t,n){super(e,t,n)}}Rr.prototype.ValueTypeName="string";Rr.prototype.ValueBufferType=Array;Rr.prototype.DefaultInterpolation=2300;Rr.prototype.InterpolantFactoryMethodLinear=void 0;Rr.prototype.InterpolantFactoryMethodSmooth=void 0;class Sr extends li{}Sr.prototype.ValueTypeName="vector";class ig{constructor(e="",t=-1,n=[],i=2500){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=ni(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(sg(n[a]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,a=n.length;s!==a;++s)t.push(li.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,a=[];for(let o=0;o<s;o++){let c=[],l=[];c.push((o+s-1)%s,o,(o+1)%s),l.push(0,1,0);const u=Qm(c);c=zc(c,1,u),l=zc(l,1,u),!i&&c[0]===0&&(c.push(s),l.push(l[0])),a.push(new Mr(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],u=l.name.match(s);if(u&&u.length>1){const h=u[1];let f=i[h];f||(i[h]=f=[]),f.push(l)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,f,d,g,_){if(d.length!==0){const m=[],p=[];Gl(d,m,p,g),m.length!==0&&_.push(new h(f,m,p))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let h=0;h<l.length;h++){const f=l[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const d={};let g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let _=0;_<f[g].morphTargets.length;_++)d[f[g].morphTargets[_]]=-1;for(const _ in d){const m=[],p=[];for(let v=0;v!==f[g].morphTargets.length;++v){const M=f[g];m.push(M.time),p.push(M.morphTarget===_?1:0)}i.push(new Mr(".morphTargetInfluence["+_+"]",m,p))}c=d.length*a}else{const d=".bones["+t[h].name+"]";n(Sr,d+".position",f,"pos",i),n(yr,d+".quaternion",f,"rot",i),n(Sr,d+".scale",f,"scl",i)}}return i.length===0?null:new this(s,c,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function rg(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Mr;case"vector":case"vector2":case"vector3":case"vector4":return Sr;case"color":return Hl;case"quaternion":return yr;case"bool":case"boolean":return Ar;case"string":return Rr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function sg(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=rg(r.type);if(r.times===void 0){const t=[],n=[];Gl(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Fi={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class ag{constructor(e,t,n){const i=this;let s=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,s===!1&&i.onStart!==void 0&&i.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){const d=l[h],g=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}}const Vl=new ag;class Cr{constructor(e){this.manager=e!==void 0?e:Vl,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Cr.DEFAULT_MATERIAL_NAME="__DEFAULT";const mi={};class og extends Error{constructor(e,t){super(e),this.response=t}}class Wl extends Cr{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Fi.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(mi[e]!==void 0){mi[e].push({onLoad:t,onProgress:n,onError:i});return}mi[e]=[],mi[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=mi[e],h=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,g=d!==0;let _=0;const m=new ReadableStream({start(p){v();function v(){h.read().then(({done:M,value:b})=>{if(M)p.close();else{_+=b.byteLength;const P=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:d});for(let T=0,C=u.length;T<C;T++){const S=u[T];S.onProgress&&S.onProgress(P)}p.enqueue(b),v()}},M=>{p.error(M)})}}});return new Response(m)}else throw new og(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(g=>d.decode(g))}}}).then(l=>{Fi.add(e,l);const u=mi[e];delete mi[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(l)}}).catch(l=>{const u=mi[e];if(u===void 0)throw this.manager.itemError(e),l;delete mi[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class cg extends Cr{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Fi.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;const o=$r("img");function c(){u(),Fi.add(e,this),t&&t(this),s.manager.itemEnd(e)}function l(h){u(),i&&i(h),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class Xl extends Cr{constructor(e){super(e)}load(e,t,n,i){const s=new an,a=new cg(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class sa extends $t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Gc extends sa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy($t.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ga=new $e,Hc=new N,Vc=new N;class Eo{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Be(512,512),this.map=null,this.mapPass=null,this.matrix=new $e,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new po,this._frameExtents=new Be(1,1),this._viewportCount=1,this._viewports=[new Ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Hc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Hc),Vc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Vc),t.updateMatrixWorld(),Ga.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ga),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ga)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class lg extends Eo{constructor(){super(new Nn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=xr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class hg extends sa{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy($t.DEFAULT_UP),this.updateMatrix(),this.target=new $t,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new lg}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Wc=new $e,Gr=new N,Ha=new N;class ug extends Eo{constructor(){super(new Nn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Be(4,2),this._viewportCount=6,this._viewports=[new Ft(2,1,1,1),new Ft(0,1,1,1),new Ft(3,1,1,1),new Ft(1,1,1,1),new Ft(3,0,1,1),new Ft(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Gr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Gr),Ha.copy(n.position),Ha.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ha),n.updateMatrixWorld(),i.makeTranslation(-Gr.x,-Gr.y,-Gr.z),Wc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wc)}}class aa extends sa{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new ug}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class fg extends Eo{constructor(){super(new ea(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ao extends sa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($t.DEFAULT_UP),this.updateMatrix(),this.target=new $t,this.shadow=new fg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Zr{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class dg extends Cr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Fi.get(e);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(l=>{t&&t(l),s.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return Fi.add(e,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){i&&i(l),Fi.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});Fi.add(e,c),s.manager.itemStart(e)}}const To="\\[\\]\\.:\\/",pg=new RegExp("["+To+"]","g"),wo="[^"+To+"]",mg="[^"+To.replace("\\.","")+"]",gg=/((?:WC+[\/:])*)/.source.replace("WC",wo),bg=/(WCOD+)?/.source.replace("WCOD",mg),_g=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",wo),xg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",wo),vg=new RegExp("^"+gg+bg+_g+xg+"$"),Mg=["material","materials","bones","map"];class yg{constructor(e,t,n){const i=n||Vt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Vt{constructor(e,t,n){this.path=t,this.parsedPath=n||Vt.parseTrackName(t),this.node=Vt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Vt.Composite(e,t,n):new Vt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(pg,"")}static parseTrackName(e){const t=vg.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Mg.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Vt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[i];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Vt.Composite=yg;Vt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Vt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Vt.prototype.GetterByBindingType=[Vt.prototype._getValue_direct,Vt.prototype._getValue_array,Vt.prototype._getValue_arrayElement,Vt.prototype._getValue_toArray];Vt.prototype.SetterByBindingTypeAndVersioning=[[Vt.prototype._setValue_direct,Vt.prototype._setValue_direct_setNeedsUpdate,Vt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_array,Vt.prototype._setValue_array_setNeedsUpdate,Vt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_arrayElement,Vt.prototype._setValue_arrayElement_setNeedsUpdate,Vt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_fromArray,Vt.prototype._setValue_fromArray_setNeedsUpdate,Vt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");function Pr(r,e=!1){const t=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),i=new Set(Object.keys(r[0].morphAttributes)),s={},a={},o=r[0].morphTargetsRelative,c=new qt;let l=0;for(let u=0;u<r.length;++u){const h=r[u];let f=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;s[d]===void 0&&(s[d]=[]),s[d].push(h.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(h.morphAttributes[d])}if(e){let d;if(t)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,u),l+=d}}if(t){let u=0;const h=[];for(let f=0;f<r.length;++f){const d=r[f].index;for(let g=0;g<d.count;++g)h.push(d.getX(g)+u);u+=r[f].attributes.position.count}c.setIndex(h)}for(const u in s){const h=Xc(s[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in a){const h=a[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let f=0;f<h;++f){const d=[];for(let _=0;_<a[u].length;++_)d.push(a[u][_][f]);const g=Xc(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function Xc(r){let e,t,n,i=-1,s=0;for(let l=0;l<r.length;++l){const u=r[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=u.gpuType),i!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*t}const a=new e(s),o=new zt(a,t,n);let c=0;for(let l=0;l<r.length;++l){const u=r[l];if(u.isInterleavedBufferAttribute){const h=c/t;for(let f=0,d=u.count;f<d;f++)for(let g=0;g<t;g++){const _=u.getComponent(f,g);o.setComponent(f+h,g,_)}}else a.set(u.array,c);c+=u.count*t}return i!==void 0&&(o.gpuType=i),o}function jc(r,e){if(e===0)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===2||e===1){let t=r.getIndex();if(t===null){const a=[],o=r.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===2)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}const qc='"Fredoka", "Bricolage Grotesque", sans-serif',Sg="#cfdcc4",Va="#d0a54e",ri="#b98d5c",Kc="#6e4a2c",Eg="#f1ead6",Yc="#6b2436";function Tg(r,e,{box:t,span:n,material:i,model:s}){const a=e.shell;if(!a)return null;const o=new mt;r.add(o);const[c,l,u]=e.floors,h=()=>{const U=new mt;return o.add(U),U},f=(U,B,ce,O,ue,A)=>s&&s(B,ce,O,ue,(F,V)=>{U.visible=!1,A&&A(F,V)}),d=a.plaster,g=a.tile,_=a.tileH,m=document.createElement("canvas");m.width=200,m.height=230;const p=m.getContext("2d");p.fillStyle=g,p.fillRect(0,0,200,230),p.fillStyle=Sg;for(let U=0;U<200;U+=200*a.tilePitch)p.fillRect(U,12,2.4,218);p.fillRect(0,230-230/2,200,2.4),p.fillStyle="#dcc48e",p.fillRect(0,2,200,9);const v=new ti(m);v.colorSpace=Ot,v.wrapS=1e3,v.anisotropy=4;const M=new Vn(1,1).translate(0,.5,0);function b(U,B,ce,O,ue=0){const A=v.clone();A.needsUpdate=!0,A.repeat.set(Math.abs(ce-B),1);const F=new Ye(M,new vn({map:A}));return F.scale.set(Math.abs(ce-B),_,1),U?(F.rotation.y=Math.PI/2,F.position.set(O+.006,ue,(B+ce)/2)):F.position.set((B+ce)/2,ue,O+.006),F.receiveShadow=!0,o.add(F),F}function P(U,B,ce,O,ue,A,F,V=[]){const Q=[...V].sort((be,pe)=>be[0]-pe[0]);let _e=B;const ge=(be,pe,le,we)=>U?n(o,O-ue,O,A+le,A+we,be,pe,d):n(o,be,pe,A+le,A+we,O-ue,O,d);Q.forEach(([be,pe,le])=>{be>_e&&(ge(_e,be,0,F),b(U,_e,be,O,A)),ge(be,pe,le,F),_e=pe}),ce>_e&&(ge(_e,ce,0,F),b(U,_e,ce,O,A))}const T=c.z-c.d/2;P(!1,(c.x||0)-c.w/2,(c.x||0)+c.w/2,T,.25,0,l.y-.32,[[a.exitDoor.x0,a.exitDoor.x1,a.exitDoor.h]]);const C=l.z-l.d/2,S=-l.w/2;P(!1,S,l.w/2,C,.25,l.y,u.y-l.y-.32),P(!0,C,C+3.5,S,.25,l.y,u.y-l.y-.32);const x=u.z-u.d/2,y=-u.w/2,R=e.rooftop?e.rooftop.y-.34-u.y:3.9,G=u.y+R,k=1.44,K=new Bi({color:"#cfe6df",roughness:.1,metalness:0,transparent:!0,opacity:.26,depthWrite:!1});function oe(U,B,ce,O,ue){const A=Math.max(2,Math.round((ce-B)/a.glazingBay)),F=(ce-B)/A,V=u.y;let Q=null;if(ue!==void 0){const be=Math.max(0,Math.min(A-2,Math.round((ue-B)/F)-1));Q=[B+be*F,B+(be+2)*F]}const _e=(be,pe,le,we,Oe=.09)=>U?n(o,O-Oe,O+Oe*.3,le,we,be,pe,"#2c5a44"):n(o,be,pe,le,we,O-Oe,O+Oe*.3,"#2c5a44");_e(B,ce,V,V+.3,.16);for(let be=0;be<=A;be++){const pe=B+be*F;_e(pe-.035,pe+.035,V+.3,V+R)}_e(B,ce,V+2.92,V+2.98),_e(B,ce,V+R-.08,V+R);const ge=U?n(o,O-.02,O,V+.3,V+R,B,ce,"#cfe6df",{cast:!1}):n(o,B,ce,V+.3,V+R,O-.02,O,"#cfe6df",{cast:!1});return ge.material=K,ge.receiveShadow=!1,Q&&n(o,Q[0]+.035,Q[1]-.035,V+.3,V+R-.08,O-.06,O-.02,"#2f5d4a"),Q}const D=oe(!1,y,a.topLanding.outer,x,a.fanX);oe(!0,x,x+3.5,y);const Y=new mt,H=D?(D[0]+D[1])/2:a.fanX;Y.position.set(H,u.y+2.15,x+.02),o.add(Y);let he=null;f(Y,"exhaust_fan.glb",H,u.y+2.15,x+.02,U=>{he=U.getObjectByName("Rotor")}),t(Y,0,-.72,.06,1.44,1.44,.14,"#2f6b52");const Z=new Ye(new Qt(.56,.56,.05,40).rotateX(Math.PI/2),i("#1d3028"));Z.position.z=.14,Y.add(Z);const te=new mt;te.position.z=.18,Y.add(te);for(let U=0;U<4;U++){const B=new Ye(new Zt(.44,.17,.02).translate(.27,0,0),i("#b9cbb4"));B.rotation.z=U*Math.PI/2,B.rotation.x=.25,te.add(B)}const Te=new Ye(new Qt(.1,.1,.06,20).rotateX(Math.PI/2),i("#d8c18b"));te.add(Te);const Pe=1.46,re=e.rooftop?2:0,xe=1.8,Ne=Pe*xe,Ee=.5,et=a.topLanding.outer-.035,nt=et-re*Ne,ot=G+k*xe/2,Mt=x-.09,ut=e.rooftop?new Ii(new N(.816,-1,0).normalize(),(G-.816*e.rooftop.x1)/Math.hypot(.816,1)):null,_t=[],J=U=>{const B=U.clone();return B.clippingPlanes=_t,B},Gt=new Qe("#2c5a44"),ft=Array.from({length:re},(U,B)=>new $e().makeTranslation(nt+Ne*(B+.5),ot,Mt).scale(new N(xe,xe,xe*Ee)));let ht=null;s&&re&&s("exhaust_fan.glb",0,0,0,(U,B)=>{const ce=new $e().copy(B.parent.matrixWorld).invert(),O=new $e,ue=U.getObjectByName("Rotor"),A=[];_t.push(ut.clone().applyMatrix4(B.parent.matrixWorld)),B.updateMatrixWorld(!0),U.traverse(F=>{if(!F.isMesh)return;let V=!1;for(let ge=F;ge;ge=ge.parent)ge===ue&&(V=!0);const Q=/^(Housing|FrontFrame)/.test(F.name)?Object.assign(F.material.clone(),{color:Gt}):F.material,_e=new Un(F.geometry,Array.isArray(Q)?Q.map(J):J(Q),re);O.multiplyMatrices(ce,F.matrixWorld),ft.forEach((ge,be)=>_e.setMatrixAt(be,new $e().multiplyMatrices(ge,O))),_e.computeBoundingSphere(),_e.castShadow=!1,_e.receiveShadow=!0,o.add(_e),V&&A.push({part:F,mesh:_e})}),B.parent.remove(B),ht={rotor:ue,holder:B,parentInverse:new $e,spinning:A}});const Je=new Qt(.09,.09,.22,12).translate(0,.11,0),At=new Zt(.18,.26,.07).translate(0,.13,0),Ke=[],I=U=>{const B={g:U,jars:[],pouches:[]};return Ke.push(B),B};function w(U,B,ce,O,ue,A,F,V,Q){const{jars:_e,pouches:ge}=I(U);n(U,B,ce,A,A+F,O,O+.05,Kc,{cast:!1}),n(U,B,ce,A,A+.14,O,O+ue,ri),n(U,B-.02,ce+.02,A+F-.1,A+F,O,O+ue+.02,ri);const be=(ce-B)/V;for(let pe=0;pe<=V;pe++)n(U,B+pe*be-.035,B+pe*be+.035,A,A+F,O,O+ue,ri);for(let pe=1;pe<=Q;pe++){const le=A+.14+(F-.24)*pe/(Q+1);n(U,B,ce,le-.04,le,O,O+ue,"#c79f6c",{cast:!1});for(let we=0;we<V;we++)for(let Oe=0;Oe<4;Oe++){const Xe=B+we*be+be*(Oe+.5)/4,je=O+ue*.55;((we+pe+Oe)%3?_e:ge).push([Xe,le,je,(we*7+pe*3+Oe)%4])}if(pe===1)for(let we=0;we<V;we++)for(let Oe=0;Oe<4;Oe++)_e.push([B+we*be+be*(Oe+.5)/4,A+.14,O+ue*.55,(we+Oe)%4])}}const $=a.loungeFront,ve=$-.81,ye=a.loungeDoor.x,de=a.loungeRight,Fe=l.y-.32;n(o,-11.03,ye-.7,0,Fe,ve,$,d),n(o,ye-.7,ye+.7,a.loungeHeader,Fe,ve,$,d),n(o,ye+.7,de+.16,0,Fe,ve,$,d),b(!1,-11.03,ye-.7,$),b(!1,ye+.7,a.wallLeft,$),b(!1,a.wallLeft,de+.16,$),n(o,-11.5,-11.18,0,3.95,T,$,d),b(!0,T,$,-11.18);const Ce=a.loungeExit.z,Le=.92,St=2.84;n(o,de-.16,de+.16,0,Fe,T,Ce-Le,d),n(o,de-.16,de+.16,St,Fe,Ce-Le,Ce+Le,d),n(o,de-.16,de+.16,0,Fe,Ce+Le,$,d),b(!0,T,Ce-Le-.04,de+.16),b(!0,Ce+Le+.04,$,de+.16),n(o,de-.1,de+.1,0,St,Ce-Le,Ce+Le,"#0d1310",{cast:!1});const Ae=[];e.rooftop||(n(o,-11.18,de-.16,.002,.012,T,ve,"#2a1b22",{cast:!1}),n(o,-10.95,-9.25,.012,.022,-5.3,-2.9,"#5a2638",{cast:!1}),n(o,-10.75,-9.45,.022,.03,-5.1,-3.1,"#7a3a4c",{cast:!1}),[[-6.15,-5.55,1],[-2.65,-2.05,-1]].forEach(([U,B,ce])=>{n(o,-10.9,-9.3,0,.48,U,B,Yc);const O=ce>0?[U,U+.16]:[B-.16,B];n(o,-10.9,-9.3,.48,.95,O[0],O[1],"#5c1e30"),n(o,-10.9,-10.72,.48,.7,U,B,"#5c1e30"),n(o,-9.48,-9.3,.48,.7,U,B,"#5c1e30")}),n(o,-10.55,-9.65,0,.4,-4.35,-3.85,"#3a2a1e"),[[-10.7,-6.6],[-10.7,-1.55],[-9.6,-4.1]].forEach(([U,B])=>{t(o,U,0,B,.4,.62,.4,"#3a2a1e"),t(o,U,.62,B,.04,.4,.04,"#d8c18b",{cast:!1});const ce=new Ye(new Qt(.13,.2,.26,16).translate(0,.13,0),new vn({color:"#f3d9a6",emissive:"#ffb36a",emissiveIntensity:0}));ce.position.set(U,1,B),o.add(ce),Ae.push(ce)}));const ne=i(Yc);function tt(U){const B=U?{centre:Ce,plane:de+.2,scale:1.35,top:2.78}:{centre:ye,plane:$+.05,scale:1,top:a.loungeHeader+.02},ce=[-1,1].map(ue=>{const A=new Ye(rt,ne);return A.castShadow=!0,o.add(A),{side:ue,m:A}}),O=U?n(o,B.plane-.05,B.plane+.09,B.top-.1,B.top+.06,B.centre-Le-.02,B.centre+Le+.02,"#4a1b29"):n(o,B.centre-.75,B.centre+.75,B.top-.1,B.top+.06,B.plane-.05,B.plane+.09,"#4a1b29");return{pair:ce,pelmet:O,exit:U,set(ue,A){O.visible=A,ce.forEach(({side:F,m:V})=>{V.visible=A;const Q=.68*B.scale,_e=(.07+(.5-.07)*ue)*B.scale,ge=Math.max(.08,Q-_e),be=F*(_e+ge/2);U?(V.position.set(B.plane,0,B.centre+be),V.scale.set(.08,B.top-.08,ge)):(V.position.set(B.centre+be,0,B.plane),V.scale.set(ge,B.top-.08,.08))})}}}const rt=new Zt(1,1,1).translate(0,.5,0),Ge=tt(!1),pt=tt(!0);s&&s("lounge_drapes.glb",0,0,0,(U,B)=>{B.removeFromParent(),U.updateMatrixWorld(!0);const ce=F=>{const V=U.getObjectByName(F),Q=[];if(!V)return null;const _e=new $e().copy(V.matrixWorld).invert();V.traverse(le=>{if(!le.isMesh)return;const we=le.geometry.clone().applyMatrix4(new $e().multiplyMatrices(_e,le.matrixWorld)),Oe=le.material.color,Xe=we.attributes.position.count,je=new Float32Array(Xe*3);for(let lt=0;lt<Xe;lt++)je.set([Oe.r,Oe.g,Oe.b],lt*3);we.setAttribute("color",new zt(je,3)),Object.keys(we.attributes).forEach(lt=>{["position","normal","color"].includes(lt)||we.deleteAttribute(lt)}),Q.push(we)});const ge=Pr(Q);ge.computeBoundingBox();const be=ge.boundingBox,pe=be.getSize(new N);return ge.translate(-(be.min.x+be.max.x)/2,-be.min.y,-(be.min.z+be.max.z)/2).scale(1/pe.x,1/pe.y,1/pe.z),ge.computeVertexNormals(),ge},O=ce("Drape"),ue=ce("Pelmet");if(!O||!ue)return;const A=i("#ffffff",{vertexColors:!0});[Ge,pt].forEach(F=>{const V=Q=>F.exit?Q.clone().rotateY(-Math.PI/2):Q;F.pair.forEach(({m:Q})=>{Q.geometry=V(O),Q.material=A}),F.pelmet.geometry=V(ue),F.pelmet.material=A})});const xt=e.rooftop?null:n(o,ye-.7,ye+.7,0,a.loungeHeader,$,$+.08,"#2d6146"),Bt=n(o,de+.16,de+.21,0,St-.24,Ce-Le+.15,Ce+Le-.15,"#3a2a1e"),j=document.createElement("canvas");j.width=512,j.height=184;const Ie=new ti(j);Ie.colorSpace=Ot;const fe=new dn({map:Ie,transparent:!0}),me=new Ye(new Vn(2,.72),fe);me.position.set(ye+2.1,2.02,$+.03),o.add(me);let Ue=null;typeof FontFace=="function"&&document.fonts&&(new FontFace("Fredoka",`url(${new URL("../fonts/Fredoka-SemiBold.ttf",e.modelBase).href})`,{weight:"600"}).load().then(U=>{document.fonts.add(U),Ue=null,Pn=null,pn=!0}).catch(()=>{}),new FontFace("Yellowtail",`url(${new URL("../fonts/Yellowtail-Regular.woff2",e.modelBase).href})`).load().then(U=>{document.fonts.add(U),Ue=null}).catch(()=>{}));function ke(U){if(Ue===U)return;Ue=U;const B=j.getContext("2d");B.clearRect(0,0,512,184),B.fillStyle="#1a1216",B.beginPath(),B.roundRect(6,8,500,168,22),B.fill();const ce=(O,ue,A,F,V,Q)=>{U?(B.shadowColor=F,B.shadowBlur=22,B.fillStyle=F,B.fillText(O,ue,A),B.shadowBlur=0,B.fillStyle=V,B.fillText(O,ue,A)):(B.fillStyle=Q,B.fillText(O,ue,A))};B.textAlign="center",B.textBaseline="middle",B.save(),B.translate(256,56),B.rotate(-.06),B.font='400 88px "Yellowtail", cursive',ce("Rooftop",0,0,"#ffbf5a","#fff1d6","#5d5040"),B.restore(),B.font=`600 72px ${qc}`,ce("LOUNGE",256,128,"#ff8fbf","#fff4f8","#5a4750"),Ie.needsUpdate=!0}const He={x:(a.wallLeft+a.shelfLeft)/2,y:1.8,w:5.1,h:1.24},Nt=h();n(Nt,He.x-He.w/2-.14,He.x+He.w/2+.14,He.y-.12,He.y+He.h+.12,$,$+.1,ri),n(Nt,He.x-He.w/2+.04,He.x+He.w/2-.04,He.y+.04,He.y+He.h-.04,$+.1,$+.12,Va,{cast:!1});const kt=document.createElement("canvas");kt.width=1024,kt.height=240;const Rt=new ti(kt);Rt.colorSpace=Ot,Rt.anisotropy=4;const rn=new Ye(new Vn(He.w-.14,He.h-.14),new dn({map:Rt}));rn.position.set(He.x,He.y+He.h/2,$+.125),Nt.add(rn),f(Nt,"menu_board.glb",He.x,0,$,U=>{const B=U.getObjectByName("BoardFace");B&&B.traverse(ce=>{if(!ce.isMesh)return;const O=ce.geometry.attributes.uv;for(let ue=0;ue<O.count;ue++)O.setY(ue,1-O.getY(ue));O.needsUpdate=!0,ce.material=rn.material})});const en=" ABCDEFGHIJKLMNOPQRSTUVWXYZ$0123456789.,",Sn=55,Jn=9;let Xt=null,Pn=null,pn=!1;function yi(U,B){const ce=U.length,O=U[0]?U[0].length:21;if((!Xt||Xt.length!==ce||Xt[0].length!==O)&&(Xt=U.map(Q=>[...Q].map(()=>({from:" ",to:" ",start:0})))),U.forEach((Q,_e)=>[...Q].forEach((ge,be)=>{const pe=Xt[_e][be];pe.to!==ge&&(pe.from=pe.to,pe.to=ge,pe.start=B+be*35+_e*90,pn=!0)})),!pn&&Pn!==null)return;Pn="";const ue=kt.getContext("2d"),A=1024/O,F=240/ce;ue.fillStyle="#131617",ue.fillRect(0,0,1024,240),ue.font=`600 ${Math.round(F*.66)}px ${qc}`,ue.textAlign="center",ue.textBaseline="middle";const V=(Q,_e,ge,be,pe)=>{const le=ge+F/2,we=(F/2-4)*pe;ue.save(),ue.beginPath(),ue.rect(_e+2,be?le-we:le,A-4,we),ue.clip(),ue.fillStyle=be?"#363c3e":"#2b3133",ue.fillRect(_e+2,be?le-we:le,A-4,we),Q!==" "&&(ue.translate(0,le),ue.scale(1,pe),ue.fillStyle="#efe4c8",ue.fillText(Q,_e+A/2,1)),ue.restore()};pn=!1,Xt.forEach((Q,_e)=>Q.forEach((ge,be)=>{const pe=be*A,le=_e*F,we=B-ge.start;let Oe=ge.to,Xe=ge.to,je=1;if(we<0)Oe=Xe=ge.from,pn=!0;else if(ge.from!==ge.to&&we<Sn*Jn){const lt=Math.floor(we/Sn),Yt=en.indexOf(ge.to)+en.length-Jn;Oe=lt?en[(Yt+lt)%en.length]:ge.from,Xe=en[(Yt+lt+1)%en.length],je=we%Sn/Sn,pn=!0}else ge.from=ge.to;je>=1?(V(Oe,pe,le,!0,1),V(Oe,pe,le,!1,1)):(V(Xe,pe,le,!0,1),V(Oe,pe,le,!1,1),je<.5?V(Oe,pe,le,!0,1-je*2):V(Xe,pe,le,!1,je*2-1)),ue.fillStyle="#0d1113",ue.fillRect(pe+2,le+F/2-1,A-4,2)})),Rt.needsUpdate=!0}const On=h();w(On,a.shelfLeft,a.wallRight,$,.64,0,3.3,5,4),f(On,"product_shelving.glb",(a.shelfLeft+a.wallRight)/2,0,$+.32);const En=h();w(En,-9,9,C,.6,l.y,2.6,8,3),f(En,"wall_shelving.glb",0,l.y,C+.3);const on=h(),Xn=I(on);f(on,"arch_shelves.glb",-8.525,l.y,-4.85),n(on,-8.85,-8.2,l.y,l.y+2.4,-5.9,-3.8,ri);const Tn=new Ye(new Qt(1.05,1.05,.65,32,1,!1,0,Math.PI).rotateZ(Math.PI/2),i(ri));Tn.position.set(-8.525,l.y+2.4,-4.85),Tn.castShadow=!0,on.add(Tn),n(on,-8.21,-8.19,l.y+.2,l.y+2.3,-5.7,-4,"#e8dcc4",{cast:!1});for(let U=0;U<3;U++)for(let B=0;B<3;B++)Xn.jars.push([-8.35,l.y+.5+U*.7,-5.45+B*.6,(U+B)%4]);for(let U=0;U<3;U++)n(on,-8.85,-8.2,l.y+.45+U*.7,l.y+.5+U*.7,-5.8,-3.9,"#ecdbc1",{cast:!1});const mn=a.column,it=h();t(it,mn.x,0,mn.z,.78,1.73,.73,"#25523b"),t(it,mn.x,1.73,mn.z,.8,.12,.76,"#e1dbc0"),t(it,mn.x,1.85,mn.z,.75,Fe-1.85,.7,Eg);const Si=new vn({color:"#fff2c8",emissive:"#ffd58a",emissiveIntensity:0}),E=new Ye(new _i(.13,12,8),Si);E.position.set(mn.x,2.6,mn.z+.42),it.add(E);const W=(U,B,ce)=>{const O=U.getObjectByName(B);O&&O.traverse(ue=>{if(ue.isMesh){const A=ue.material.clone();A.emissive=ce.emissive.clone(),ue.material=A,ie.push([A,ce])}})},ie=[];f(it,"shop_column.glb",mn.x,0,mn.z,U=>W(U,"Sconce",Si));const ee=a.exitDoor,z=h();n(z,ee.x0-.14,ee.x0,0,ee.h+.14,T-.1,T+.12,"#1f4a35"),n(z,ee.x1,ee.x1+.14,0,ee.h+.14,T-.1,T+.12,"#1f4a35"),n(z,ee.x0-.14,ee.x1+.14,ee.h,ee.h+.2,T-.1,T+.12,"#1f4a35"),n(z,ee.x0,ee.x0+.06,.02,ee.h-.02,T+.1,T+.95,"#2d6146"),n(z,(ee.x0+ee.x1)/2-.4,(ee.x0+ee.x1)/2+.4,ee.h+.3,ee.h+.56,T,T+.08,"#1d3028");const Re=new Ye(new Zt(.66,.14,.04),new vn({color:"#d84a3a",emissive:"#ff5a3c",emissiveIntensity:.4}));Re.position.set((ee.x0+ee.x1)/2,ee.h+.43,T+.1),z.add(Re),f(z,"exit_door.glb",(ee.x0+ee.x1)/2,0,T,U=>{W(U,"ExitLamp",Re.material);const B=U.getObjectByName("DoorLeaf");B&&(B.rotation.y=-B.rotation.y,B.position.z=-B.position.z)});const Me=a.merchCabinet,Ve=h(),Ze=I(Ve);f(Ve,"merch_cabinet.glb",(Me.back+Me.face)/2,0,(Me.z0+Me.z1)/2,U=>{const B=U.getObjectByName("CabinetGlass");B&&B.traverse(ce=>{ce.isMesh&&(ce.material=K,ce.castShadow=!1)})}),n(Ve,Me.back,Me.face,0,.2,Me.z0,Me.z1,Kc),n(Ve,Me.back,Me.face,.2,2.6,Me.z0,Me.z0+.1,ri),n(Ve,Me.back,Me.face,.2,2.6,Me.z1-.1,Me.z1,ri),n(Ve,Me.back,Me.back+.12,.2,2.6,Me.z0,Me.z1,ri);const st=new Ye(new Qt((Me.z1-Me.z0)/2,(Me.z1-Me.z0)/2,Me.face-Me.back,32,1,!1,0,Math.PI).rotateZ(Math.PI/2),i(ri));st.position.set((Me.face+Me.back)/2,2.6,(Me.z0+Me.z1)/2),st.castShadow=!0,Ve.add(st);for(let U=0;U<3;U++){n(Ve,Me.back+.12,Me.face-.05,.55+U*.68,.6+U*.68,Me.z0+.1,Me.z1-.1,"#ecdbc1",{cast:!1});for(let B=0;B<4;B++)(B%2?Ze.pouches:Ze.jars).push([(Me.back+Me.face)/2,.6+U*.68,Me.z0+.35+B*(Me.z1-Me.z0-.7)/3,(U+B)%4])}const gt=n(Ve,Me.face-.03,Me.face,.2,2.6,Me.z0+.1,Me.z1-.1,"#cfe6df",{cast:!1});gt.material=K;const ze=e.marquee,dt=ze.zFront-ze.zRear,ct=document.createElement("canvas");ct.width=2048,ct.height=192;const at=ct.getContext("2d");at.fillStyle="#f1e7cc",at.fillRect(0,0,2048,96),at.fillStyle="#1f6b47",at.fillRect(0,96,2048,96),at.font='800 54px "Bricolage Grotesque", sans-serif',at.textAlign="center",at.textBaseline="middle",ze.top.forEach((U,B)=>{at.fillStyle="#1f5e40",at.fillText(U,(B+.5)*512,50)}),at.font='700 40px "Bricolage Grotesque", sans-serif',ze.bottom.forEach((U,B)=>{at.fillStyle="#f1e7cc",at.fillText(U,(B+.5)*512,146)}),at.fillStyle="#1a1e20";for(let U=1;U<4;U++)at.fillRect(U*512-3,0,6,192);const Tt=new ti(ct);Tt.colorSpace=Ot,Tt.anisotropy=4;const Lt=new vn({map:Tt,emissive:"#ffffff",emissiveMap:Tt,emissiveIntensity:.15}),qe=new Ye(new Vn(dt,ze.y1-ze.y0),Lt);qe.rotation.y=Math.PI/2,qe.position.set(ze.x+.17,(ze.y0+ze.y1)/2,(ze.zFront+ze.zRear)/2),e.wallFaces||o.add(qe);const bt=a.planter,vt=h();f(vt,"shop_planter.glb",(bt.x0+bt.x1)/2,0,(bt.z0+bt.z1)/2),n(vt,bt.x0,bt.x1,0,.56,bt.z0,bt.z1,"#1f5e40"),n(vt,bt.x0-.04,bt.x1+.04,.56,.63,bt.z0-.04,bt.z1+.04,"#2b302d"),n(vt,bt.x0+.1,bt.x1-.1,.63,.66,bt.z0+.1,bt.z1-.1,"#514633",{cast:!1});const yt=a.baseboard,tn=.14;[[yt.x0,yt.x1,yt.front-tn,yt.front],[yt.x1-tn,yt.x1,yt.rear,yt.front-tn]].forEach(([U,B,ce,O])=>{n(o,U,B,0,yt.h-.1,ce,O,"#1f5e40"),n(o,U-.01,B+.01,yt.h-.1,yt.h-.07,ce-.01,O+.01,Va,{cast:!1}),n(o,U-.02,B+.02,yt.h-.07,yt.h,ce-.03,O+.03,"#e1dbc0")});const Kt=[],Ln=new Hn(1,1),Ct=(U,B,ce,O,ue)=>{const A=new Ye(Ln,i(ue));A.position.set(U,B,ce),A.scale.set(O,O*.8,O),A.castShadow=A.receiveShadow=!0,vt.add(A)};[-1.2,-.5,.2,.9,1.6].forEach((U,B)=>Ct((bt.x0+bt.x1)/2+(B%2?.08:-.08),.9,(bt.z0+bt.z1)/2+U,.3,B%2?"#6b9250":"#5f8648")),t(vt,bt.tree.x,.63,bt.tree.z,.16,2.4,.16,"#816747"),[[0,3.2,0,.75,"#769852"],[-.35,2.9,.3,.55,"#587c4d"],[.3,3.05,-.3,.55,"#98b96e"]].forEach(([U,B,ce,O,ue])=>Ct(bt.tree.x+U,B,bt.tree.z+ce,O,ue));const Ut=a.hanging,wn=h(),nn=[];n(wn,Ut.x0,Ut.x1,Ut.y-.04,Ut.y,Ut.z-.03,Ut.z+.03,Va,{cast:!1});for(let U=0;U<18;U++){const B=Ut.x0+(Ut.x1-Ut.x0)*(U+.5)/18,ce=.5+(1-Math.abs(U-8.5)/9)*.7+U%3*.12;for(let O=0;O<6;O++){const ue=O/5;nn.push([B+Math.sin(U*1.7+ue*3)*.06,Ut.y-.05-ce*ue,Ut.z+(U%2?.06:-.06)+ue*.08,(U+O)%3,.8])}}Kt.push([wn,nn]),f(wn,"pothos_rail.glb",(Ut.x0+Ut.x1)/2,Ut.y,Ut.z),[[l,C],[u,x]].forEach(([U,B])=>(U===u?[-2,2]:[-7,5]).forEach(ce=>{const O=B+.9,ue=U.y+Math.min(3.95,U===u?3.5:3.95),A=h(),F=[];n(A,ce-.01,ce+.01,ue-.7,ue,O-.01,O+.01,"#343f33",{cast:!1}),t(A,ce,ue-1,O,.55,.3,.48,"#b6ac8a");for(let V=0;V<14;V++){const Q=V*2.399;F.push([ce+Math.cos(Q)*.28,ue-.72-V%4*.18,O+Math.sin(Q)*.22,V%3,.9])}Kt.push([A,F]),f(A,"hanging_basket.glb",ce,ue,O)}));const gn=["#5f8648","#7aa257","#9cc46e"].map(U=>new Qe(U)),Dn=new Hn(.13,0),L=i("#ffffff"),q=new $e,X=new yn,se=new N,ae=new N;Kt.forEach(([U,B])=>{const ce=new Un(Dn,L,B.length);B.forEach(([O,ue,A,F,V],Q)=>{X.setFromEuler(new Wn(Q*.7,Q*1.3,0)),ce.setMatrixAt(Q,q.compose(se.set(O,ue,A),X,ae.set(1.3*V,.7*V,1*V))),ce.setColorAt(Q,gn[F])}),ce.castShadow=!0,ce.receiveShadow=!0,U.add(ce)});const Se=["#527e60","#b28b64","#75999a","#d5bd8c"].map(U=>new Qe(U));Ke.forEach(U=>[[Je,U.jars],[At,U.pouches]].forEach(([B,ce])=>{if(!ce.length)return;const O=new Un(B,i("#ffffff"),ce.length);ce.forEach(([ue,A,F,V],Q)=>{O.setMatrixAt(Q,q.compose(se.set(ue,A,F),X.identity(),ae.set(1,1,1))),O.setColorAt(Q,Se[V])}),O.castShadow=!0,U.g.add(O)}));const De=a.lamps.map(([U,B,ce,O])=>{const ue=new aa("#ffc98a",0,11,1.2);return ue.position.set(U,B,ce),ue.userData.power=O,r.add(ue),ue});return{update(U){const B=U.night||0,ce=!!U.loungeOpen;te.rotation.z=-(U.time||0)*Math.PI*2/2500,he&&(he.rotation.z=te.rotation.z),ht&&ht.rotor&&(ht.rotor.rotation.z=te.rotation.z,ht.holder.updateMatrixWorld(!0),ht.spinning.forEach(({part:O,mesh:ue})=>{const A=new $e().multiplyMatrices(ht.parentInverse,O.matrixWorld),F=new $e;ft.forEach((V,Q)=>ue.setMatrixAt(Q,F.multiplyMatrices(V,A))),ue.instanceMatrix.needsUpdate=!0})),Ge.set(U.loungeCurtain||0,ce),pt.set(U.loungeExitCurtain||0,ce),xt&&(xt.visible=!ce),Bt.visible=!ce,ke(ce),fe.color.setScalar(ce?1:.8),U.menuLines&&yi(U.menuLines,performance.now()),Ae.forEach(O=>{O.material.emissiveIntensity=ce?.5+B*1.2:0}),E.material.emissiveIntensity=.3+B*1.4,Re.material.emissiveIntensity=.4+B*1.2,ie.forEach(([O,ue])=>{O.emissiveIntensity=ue.emissiveIntensity}),Lt.emissiveIntensity=.15+B*.7,De.forEach(O=>{O.intensity=O.userData.power*(.2+B*5)})}}}const oo=Math.asin(Math.tan(Math.PI/6)),fn=1/Math.cos(oo),Jc=240;function Zc(){const r=new ea(-1,1,1,-1,1,Jc*2.5),e=Math.SQRT1_2,t=Math.SQRT1_2,n=Math.sin(oo),i=Math.cos(oo);return r.up.set(-e*n,i,-t*n),r.position.set(e*i,n,t*i).multiplyScalar(Jc),r.lookAt(0,0,0),r}function wg(r,{width:e,height:t,centerX:n,centerY:i,unit:s}){r.left=-n/s,r.right=(e-n)/s,r.top=i/s,r.bottom=-(t-i)/s,r.updateProjectionMatrix(),r.updateMatrixWorld()}const Ag=/^(Rotor|Flame|DoorLeaf|StaffPlaque|Wheel(FL|FR|BL|BR)$)/,Wa=new $e,Qc=new $e,$c=(r,e)=>!!r.userData.motion||Ag.test(r.name)||e;function Rg(r){return r.isMesh&&!r.isInstancedMesh&&!r.isSkinnedMesh&&r.visible&&!Array.isArray(r.material)&&!r.material.transparent&&!Object.keys(r.geometry.morphAttributes).length&&!r.geometry.groups.length&&r.children.length===0}function Cg(r){return Object.keys(r.attributes).sort().map(e=>e+r.attributes[e].itemSize).join()+(r.index?"|i":"")}function Pg(r){const e=new qt;return Object.entries(r.attributes).forEach(([t,n])=>{const i=new Float32Array(n.count*n.itemSize);for(let s=0;s<n.count;s++)for(let a=0;a<n.itemSize;a++)i[s*n.itemSize+a]=n.getComponent(s,a);e.setAttribute(t,new zt(i,n.itemSize))}),r.index&&e.setIndex(new zt(r.index.array.slice(),1)),e}function Lg(r){if(r.index){const e=r.index;for(let t=0;t<e.count;t+=3){const n=e.getX(t+1);e.setX(t+1,e.getX(t+2)),e.setX(t+2,n)}return}Object.values(r.attributes).forEach(e=>{for(let t=0;t<e.count;t+=3)for(let n=0;n<e.itemSize;n++){const i=e.getComponent(t+1,n);e.setComponent(t+1,n,e.getComponent(t+2,n)),e.setComponent(t+2,n,i)}})}function Ji(r,e){r.updateMatrixWorld(!0),Qc.copy(r.matrixWorld).invert();const t=new Map,n=[],i=o=>o.children.forEach(c=>{if(c.visible){if($c(c,e)){n.push(c);return}if(Rg(c)){const l=c.material.uuid+(c.castShadow?"c":"")+(c.receiveShadow?"r":"")+Cg(c.geometry);t.has(l)||t.set(l,[]),t.get(l).push(c)}i(c)}});i(r);let s=0;t.forEach(o=>{if(o.length<2)return;const c=o.map(f=>{const d=Pg(f.geometry);return Wa.multiplyMatrices(Qc,f.matrixWorld),d.applyMatrix4(Wa),Wa.determinant()<0&&Lg(d),d}),l=Pr(c);if(!l)return;const u=o[0],h=new Ye(l,u.material);h.name="Merged"+(u.material.name||""),h.castShadow=u.castShadow,h.receiveShadow=u.receiveShadow,r.add(h),o.forEach(f=>f.removeFromParent()),s+=o.length-1});const a=o=>[...o.children].forEach(c=>{$c(c,e)||!c.visible||(a(c),(c.type==="Group"||c.type==="Object3D")&&!c.children.length&&c.removeFromParent())});return a(r),n.forEach(o=>{o.children.length&&(s+=Ji(o,e))}),s}const Jt="#d0a54e",Hr="#b98d5c",Vr="#6e4a2c",Fn="#1f4a35",Xi="#efe4cf",gi="#6b2436";function Dg(r,e,{box:t,span:n,material:i}){const s=e.rooftop;if(!s)return null;const a=new mt;r.add(a);const{x0:o,x1:c,z0:l,z1:u,y:h}=s,f=s.lift,d=Array.from({length:9},()=>new mt);d.forEach(A=>a.add(A));const[g,_,m,p,v,M,b,P,T]=d,C=d.slice(1),[S,x,y,R,G,k,K,oe]=C.map(A=>{const F=new mt;return A.add(F),F}),D=new mt;a.add(D);const Y=new Bi({color:"#cfe6df",roughness:.1,metalness:0,transparent:!0,opacity:.28,depthWrite:!1}),H=A=>(A.material=Y,A.castShadow=!1,A.receiveShadow=!1,A),he=(A,F)=>new vn({color:A,emissive:F,emissiveIntensity:0}),Z=[];n(a,o,c,h-.3,h,l,u,"#e4ddcc"),n(a,o-.05,c+.05,h-.34,h-.22,l-.05,u+.05,"#e1dbc0",{cast:!1});const te=e.floors[2].y,Te=e.floors[0].z-e.floors[0].d/2;[[o+.3,u-.3],[c-.3,u-.3]].forEach(([A,F])=>t(a,A,te,F,.3,h-.3-te,.3,"#33372f")),l<Te&&([o+.3,0,c-.3].forEach(A=>t(a,A,0,l+.3,.32,h-.3,.32,Fn)),n(a,o,c,h-.62,h-.3,l+.14,l+.46,Fn));const Pe=document.createElement("canvas");Pe.width=256,Pe.height=256;const re=Pe.getContext("2d");re.fillStyle="#b98654",re.fillRect(0,0,256,256);for(let A=0;A<8;A++)re.fillStyle=["#bf8c59","#b4814f","#c39260","#b78552"][A%4],re.fillRect(0,A*32+1,256,30),re.fillStyle="#8f6038",re.fillRect(A*97%256,A*32,2,32);const xe=new ti(Pe);xe.colorSpace=Ot,xe.wrapS=xe.wrapT=1e3,xe.anisotropy=4,xe.repeat.set((c-o)/2.4,(u-l)/2.4);const Ne=new Ye(new Vn(c-o-.2,u-l-.2).rotateX(-Math.PI/2),new vn({map:xe}));Ne.position.set((o+c)/2,h+.004,(l+u)/2),Ne.receiveShadow=!0,D.add(Ne);const Ee=1.05,et=[f.z-.6,f.z+.6];function nt(A,F,V,Q,_e){const ge=Math.max(1,Math.round((V-F)/1.6)),be=(V-F)/ge,pe=(le,we,Oe,Xe,je,lt,Yt)=>A?n(_e,Q-je,Q+je,Oe,Xe,le,we,lt,Yt):n(_e,le,we,Oe,Xe,Q-je,Q+je,lt,Yt);for(let le=0;le<=ge;le++){const we=F+le*be;pe(we-.04,we+.04,h,h+Ee,.04,Fn)}pe(F,V,h+Ee-.03,h+Ee+.03,.06,Jt,{cast:!1}),H(pe(F,V,h+.08,h+Ee-.05,.01,"#cfe6df"))}nt(!1,o,c,u,D),nt(!1,o,c,l,D),nt(!0,l,u,c,D),nt(!0,et[1],u,o,D);const ot=s.lift2?[s.lift2.z-.6,s.lift2.z+.6]:null,Mt=new mt;D.add(Mt),ot?(nt(!0,l,ot[0],o,D),nt(!0,ot[1],et[0],o,D),nt(!0,ot[0],ot[1],o,Mt)):nt(!0,l,et[0],o,D);const ut=(A,F,V,Q)=>{const _e=Math.hypot(V-A,Q-F),ge=new Ye(new Zt(_e,.06,.02),i("#e8b13a",{emissive:"#3a2a00"}));ge.position.set((A+V)/2,h+.75,(F+Q)/2),ge.rotation.y=-Math.atan2(Q-F,V-A),g.add(ge)},_t=[[o+.2,l+.2],[c-.2,l+.2],[c-.2,u-.2],[o+.2,u-.2]];_t.forEach(([A,F],V)=>{t(g,A,h,F,.07,.8,.07,"#d8cfbd");const[Q,_e]=_t[(V+1)%4];ut(A,F,Q,_e)});const J=new mt;g.add(J),t(J,-2.2,h,-4.6,1.6,.18,1.1,"#9a7a52"),t(J,-2.2,h+.18,-4.6,1.5,.5,1,"#c9a978"),t(J,1.8,h,-5.4,1.2,.9,1.2,"#8e9a86"),t(J,3.6,h,-4.5,.9,.14,1.4,"#9a7a52");const Gt=f.w/2,ft=f.d/2,ht=h+2.9,Je=.09;function At(A,F,V){const Q=f.x,_e=[A-.6,A+.6],ge=new mt,be=new mt,pe=new mt;F.add(ge),V.add(be),V.add(pe),[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([jt,bn])=>t(ge,Q+jt*(Gt-Je/2),0,A+bn*(ft-Je/2),Je,ht,Je,Fn));const le=(jt,bn,rs,ss=.01)=>{const as=Q-Gt-ss,os=Q+Gt+ss,cs=A-ft-ss,ls=A+ft+ss,hs=.04;n(ge,as,os,jt,jt+bn,cs,cs+hs,rs,{cast:!1}),n(ge,as,os,jt,jt+bn,ls-hs,ls,rs,{cast:!1}),n(ge,as,as+hs,jt,jt+bn,cs,ls,rs,{cast:!1}),n(ge,os-hs,os,jt,jt+bn,cs,ls,rs,{cast:!1})};[0,e.floors[1].y,e.floors[2].y,h].forEach(jt=>le(jt+2.62,.06,Fn)),n(ge,Q-Gt-.03,Q+Gt+.03,ht,ht+.16,A-ft-.03,A+ft+.03,Fn),le(ht+.16,.025,Jt,.03),n(ge,Q+Gt,Q+Gt+.6,h+2.5,h+2.55,A-ft+.05,A+ft-.05,Fn),[[!1,A+ft],[!1,A-ft],[!0,Q-Gt],[!0,Q+Gt]].forEach(([jt,bn])=>{H(jt?n(be,bn-.01,bn+.01,.05,ht,A-ft+.06,A+ft-.06,"#cfe6df"):n(be,Q-Gt+.06,Q+Gt-.06,.05,ht,bn-.01,bn+.01,"#cfe6df"))});const we=new mt;V.add(we);const Oe=new mt;we.add(Oe);const Xe=f.w-.3,je=f.d-.3,lt=2.35;n(Oe,-Xe/2,Xe/2,0,.12,-je/2,je/2,"#2b302d"),n(Oe,-Xe/2,Xe/2,lt-.14,lt,-je/2,je/2,Jt),[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([jt,bn])=>t(Oe,jt*(Xe/2-.04),.12,bn*(je/2-.04),.08,lt-.26,.08,Jt)),n(Oe,-Xe/2+.05,-Xe/2+.1,.12,lt-.14,-je/2+.1,je/2-.1,Vr,{cast:!1});const Yt=new Ye(new Zt(Xe-.3,.04,je-.3),he("#fff2c8","#ffd58a"));Yt.position.y=lt-.16,Oe.add(Yt),Z.push([Yt.material,.4,1.2]),we.position.set(Q,0,A);const In=Q+Gt,Bn=o;return n(pe,In,Bn+.05,h-.26,h,_e[0],_e[1],"#e4ddcc"),_e.forEach(jt=>{n(pe,In,Bn,h+Ee-.03,h+Ee+.03,jt-.05,jt+.05,Jt,{cast:!1}),H(n(pe,In,Bn,h+.05,h+Ee-.05,jt-.01,jt+.01,"#cfe6df"))}),n(pe,In+.05,o+1.2,h+.006,h+.016,A-.38,A+.38,gi,{cast:!1}),n(pe,In+.05,o+1.2,h+.004,h+.012,A-.45,A+.45,Jt,{cast:!1}),{cab:we,cabK:Oe,kf:ge,ki:be,kb:pe,frame:F,inside:V,lz:A,cabLamp:Yt}}const Ke=[At(f.z,a,D)],I=new mt;D.add(I),s.lift2&&Ke.push(At(s.lift2.z,I,I));const w=Ke[0].cab,$=Ke[1]?Ke[1].cab:null,ve=new mt;D.add(ve);const ye=new Hn(1,1),de=(A,F,V,Q,_e,ge)=>{const be=new Ye(ye,i(ge));be.position.set(F,V,Q),be.scale.set(_e,_e*.8,_e),be.castShadow=be.receiveShadow=!0,A.add(be)},Fe=new mt;D.add(Fe);const Ce=[[o+.2,o+.9,l+.2,(s.lift2?s.lift2.z:f.z)-.9],[o+.2,o+.9,f.z+.9,u-.2]];Ce.forEach(([A,F,V,Q])=>{n(Fe,A,F,h,h+.55,V,Q,"#1f5e40"),n(Fe,A-.03,F+.03,h+.55,h+.6,V-.03,Q+.03,"#e1dbc0",{cast:!1});for(let _e=V+.35;_e<Q-.2;_e+=.55)de(Fe,(A+F)/2,h+.8,_e,.32,Math.round(_e*3)%2?"#6b9250":"#5f8648")}),[[c-.5,u-.5],[c-.6,l+.6]].forEach(([A,F])=>{const V=new Ye(new Qt(.34,.26,.7,20).translate(0,.35,0),i("#d9cdb4"));V.position.set(A,h,F),V.castShadow=V.receiveShadow=!0,ve.add(V),t(ve,A,h+.7,F,.1,1.1,.1,"#7a6142"),[[0,2.05,0,.55,"#8aa66a"],[-.25,1.8,.2,.4,"#7a9a5c"],[.22,1.9,-.2,.42,"#9cb57a"]].forEach(([Q,_e,ge,be,pe])=>de(ve,A+Q,h+_e,F+ge,be,pe))});const Le=[],St=new vn({color:"#2b302d"});function Ae(A,F,V,Q,_e,ge,be,pe){const le=[];for(let Oe=0;Oe<=pe*2;Oe++){const Xe=Oe/(pe*2),je=Math.sin(Math.PI*Xe)*.45,lt=[F+(_e-F)*Xe,Q+(be-Q)*Xe-je,V+(ge-V)*Xe];le.push(new N(...lt)),Oe%2===0&&Le.push([A,lt[0],lt[1]-.07,lt[2]])}const we=new Ye(new wr(new na(le),pe*4,.014,4),St);A.add(we)}const ne={x0:o+1.4,x1:o+6.2,z0:l+.25,z1:l+3.4,h:2.75};[[ne.x0,ne.z0],[ne.x1,ne.z0],[ne.x1,ne.z1],[ne.x0,ne.z1]].forEach(([A,F])=>t(S,A,h,F,.14,ne.h,.14,Fn)),n(S,ne.x0-.1,ne.x1+.1,h+ne.h,h+ne.h+.16,ne.z0-.07,ne.z0+.07,Fn),n(S,ne.x0-.1,ne.x1+.1,h+ne.h,h+ne.h+.16,ne.z1-.07,ne.z1+.07,Fn);for(let A=ne.x0+.1;A<ne.x1;A+=.38)n(S,A-.04,A+.04,h+ne.h+.16,h+ne.h+.26,ne.z0-.3,ne.z1+.3,Hr);const tt=(A,F,V,Q,_e,ge)=>{n(A,F,V,h,h+.22,Q,_e,Vr),n(A,F+.03,V-.03,h+.22,h+.48,Q+.03,_e-.03,Xi),ge==="z0"&&n(A,F,V,h+.22,h+.92,Q,Q+.22,Xi),ge==="x0"&&n(A,F,F+.22,h+.22,h+.92,Q,_e,Xi),ge==="x1"&&n(A,V-.22,V,h+.22,h+.92,Q,_e,Xi)};tt(S,ne.x0+.25,ne.x1-.5,ne.z0+.15,ne.z0+.95,"z0"),tt(S,ne.x0+.25,ne.x0+1.05,ne.z0+.95,ne.z1-.3,"x0"),[[ne.x0+1,ne.z0+.45],[ne.x0+2.6,ne.z0+.45],[ne.x0+3.6,ne.z0+.45],[ne.x0+.55,ne.z0+1.7]].forEach(([A,F])=>t(S,A,h+.48,F,.32,.3,.14,gi));const rt=ne.x0+2.5,Ge=ne.z0+2.05;n(S,rt-.9,rt+.9,h,h+.38,Ge-.45,Ge+.45,"#3a3f3a"),n(S,rt-.92,rt+.92,h+.38,h+.44,Ge-.47,Ge+.47,"#d8d2c2"),n(S,rt-.6,rt+.6,h+.44,h+.47,Ge-.15,Ge+.15,Jt,{cast:!1});let pt=new Ye(new Zt(1.1,.12,.1).translate(0,.06,0),new dn({color:"#ffb35a",transparent:!0,opacity:.9}));pt.position.set(rt,h+.47,Ge),S.add(pt),Ae(_,ne.x0,ne.z1,h+ne.h,o+.25,u-.2,h+Ee+.9,9),Ae(_,ne.x1,ne.z1,h+ne.h,c-.3,u-.2,h+Ee+.9,12),t(_,o+.25,h,u-.2,.06,Ee+.95,.06,Fn),t(_,c-.3,h,u-.2,.06,Ee+.95,.06,Fn);const xt=new mt;_.add(xt);const Bt=new Hn(.17,0),j=new vn({color:"#ffffff"}),Ie=[];let fe=7;const me=()=>(fe=fe*16807%2147483647,fe/2147483647),Ue=h+ne.h+.26,ke=13;for(let A=0;A<ke;A++){const F=ne.x0+.1+A*(ne.x1-ne.x0-.2)/(ke-1);for(let V=ne.z0-.25;V<=ne.z1+.25;V+=.3){const Q=Math.min(Math.abs(V-ne.z0),Math.abs(V-ne.z1));me()<.35+Q*.25||Ie.push([F+(me()-.5)*.22,Ue+me()*.08,V+(me()-.5)*.16,.7+me()*.7])}}[ne.z0,ne.z1].forEach(A=>{for(let F=ne.x0-.05;F<=ne.x1+.05;F+=.22)Ie.push([F,Ue-.04+me()*.06,A+(me()-.5)*.2,.8+me()*.5])}),[[ne.x0,ne.z1,2.3],[ne.x1,ne.z1,2.1],[ne.x0,ne.z0,1.2],[ne.x1,ne.z0,1.4]].forEach(([A,F,V])=>{for(let Q=0;Q<V;Q+=.16){const _e=Q*4.2+A;Ie.push([A+Math.cos(_e)*.12,h+ne.h+.1-Q,F+Math.sin(_e)*.12,.55+me()*.35-Q*.1])}});const He=new Un(Bt,j,Ie.length),Nt=new $e,kt=new yn,Rt=new Wn,rn=new N,en=new N,Sn=new Qe,Jn=["#4f8a3a","#3f7a33","#6a9e45","#2f6a30"];Ie.forEach(([A,F,V,Q],_e)=>{Rt.set(me()*3,me()*3,me()*3),kt.setFromEuler(Rt),rn.set(Q*1.2,Q*.7/fn,Q),en.set(A,F,V),He.setMatrixAt(_e,Nt.compose(en,kt,rn)),He.setColorAt(_e,Sn.set(Jn[_e%Jn.length]))}),He.castShadow=!0,He.receiveShadow=!0,xt.add(He);const Xt=document.createElement("canvas");Xt.width=Xt.height=64;const Pn=Xt.getContext("2d"),pn=Pn.createRadialGradient(32,32,0,32,32,32);pn.addColorStop(0,"rgba(255,255,255,1)"),pn.addColorStop(.5,"rgba(255,255,255,.6)"),pn.addColorStop(1,"rgba(255,255,255,0)"),Pn.fillStyle=pn,Pn.fillRect(0,0,64,64);const yi=new ti(Xt),On=4,En=4400,on=4200,Xn=[],Tn=new mt;D.add(Tn);function mn(A){for(;Xn.length<=A;){const F=new Rl({map:yi,color:"#e9e4dc",transparent:!0,depthWrite:!1,opacity:0}),V=new Im(F);V.renderOrder=5,Tn.add(V),Xn.push(V)}return Xn[A]}const it={x0:c-4.4,x1:c-1.2,z:l+1.5};n(x,it.x0,it.x1,h,h+1.05,it.z-.45,it.z,"#25523b"),n(x,it.x0-.06,it.x1+.06,h+1.05,h+1.12,it.z-.55,it.z+.1,"#ece4d2"),n(x,it.x0,it.x1,h+.18,h+.22,it.z+.16,it.z+.2,Jt,{cast:!1}),n(x,it.x0,it.x1,h,h+1.9,l+.2,l+.55,Vr),[.8,1.35].forEach(A=>n(x,it.x0+.1,it.x1-.1,h+A,h+A+.05,l+.2,l+.7,Hr,{cast:!1}));for(let A=it.x0+.5;A<it.x1-.2;A+=.6)[.85,1.4].forEach((F,V)=>t(x,A+V*.15,h+F+.05,l+.48,.14,.24,.14,["#527e60","#b28b64","#75999a","#d5bd8c"][Math.round(A*3+V)&3]));[it.x0+.6,(it.x0+it.x1)/2,it.x1-.6].forEach(A=>{t(x,A,h,it.z+.55,.06,.72,.06,Jt);const F=new Ye(new Qt(.2,.2,.08,16).translate(0,.04,0),i(gi));F.position.set(A,h+.72,it.z+.55),F.castShadow=!0,x.add(F)});const Si=[it.x0+.7,(it.x0+it.x1)/2,it.x1-.7].map(A=>{t(x,A,h+1.95,it.z-.25,.02,.6,.02,"#343f33",{cast:!1});const F=new Ye(new _i(.13,12,8),he("#f3d9a6","#ffb36a"));return F.position.set(A,h+1.9,it.z-.25),x.add(F),Z.push([F.material,.3,1.4]),F});t(x,(it.x0+it.x1)/2,h+1.9,l+.2,.02,.7,it.z-l,"#343f33",{cast:!1}),n(x,it.x0-.1,it.x1+.1,h+2.55,h+2.6,l+.2,it.z-.2,Fn,{cast:!1});const E={x:c-.9,z:u-2.2};n(y,E.x-.35,E.x+.35,h,h+1,E.z-.8,E.z+.8,"#1d2422"),n(y,E.x-.4,E.x+.4,h+1,h+1.06,E.z-.85,E.z+.85,Jt,{cast:!1}),[-.4,.4].forEach(A=>{const F=new Ye(new Qt(.22,.22,.03,20),i("#2e3330"));F.position.set(E.x,h+1.08,E.z+A),y.add(F)}),[E.z-1.05,E.z+1.05].forEach(A=>{t(y,E.x+.1,h,A,.45,1.35,.45,"#262b29");const F=new Ye(new ia(.15,16).rotateY(-Math.PI/2),i("#4a514d"));F.position.set(E.x-.13,h+.9,A),y.add(F)});const W=new Ye(new Vn(2.6,2.2).rotateX(-Math.PI/2),he("#4a3a33","#d06aa0"));W.position.set(E.x-2.4,h+.012,E.z),W.receiveShadow=!0,y.add(W),Z.push([W.material,.05,.45]),Ae(p,c-.3,u-.2,h+Ee+.9,c-.3,l+1,h+Ee+1.6,10),t(p,c-.3,h,l+1,.06,Ee+1.65,.06,Fn),[[o+2.8,u-1.05],[o+5.6,u-1.05]].forEach(([A,F])=>{const V=new Ye(new Qt(.42,.42,.05,20).translate(0,.025,0),i("#ece4d2"));V.position.set(A,h+.74,F),V.castShadow=!0,R.add(V),t(R,A,h,F,.07,.74,.07,"#2b302d"),[[-.62,0],[.62,0]].forEach(([ge,be])=>{t(R,A+ge,h,F+be,.38,.45,.38,Hr),t(R,A+ge,h+.45,F+be,.4,.05,.4,Xi)}),t(R,A,h+.79,F,.05,1.8,.05,"#e1dbc0");const Q=new Ye(new Ys(1.25,.45,8,1,!0).translate(0,-.22,0),new vn({color:"#f1e7cc",side:2}));Q.position.set(A,h+2.85,F),Q.castShadow=!0,R.add(Q);const _e=new Ye(new Ys(1.27,.1,8,1,!0).translate(0,-.42,0),i("#1f6b47"));_e.position.copy(Q.position),R.add(_e)});const ie=(A,F,V,Q)=>{const ge=ne.h-.12,be=.1*Q,pe=(le,we,Oe,Xe)=>V?n(G,A+be+le*Q,A+be+we*Q,h+Oe,h+Xe,F-.06,F+.06,gi):n(G,A-.06,A+.06,h+Oe,h+Xe,F+be+le*Q,F+be+we*Q,gi);pe(0,.42,ge-1.1,ge),pe(0,.42*.45,.95,ge-1.1),pe(0,.42*.8,0,.95),V?n(G,A+be,A+be+.2*Q,h+1.05,h+1.12,F-.08,F+.08,Jt,{cast:!1}):n(G,A-.08,A+.08,h+1.05,h+1.12,F+be,F+be+.2*Q,Jt,{cast:!1})};ie(ne.x0,ne.z1,!0,1),ie(ne.x1,ne.z1,!0,-1),ie(ne.x1,ne.z1,!1,-1),ie(ne.x1,ne.z0,!1,1),n(M,ne.x0,ne.x1,h+ne.h-.1,h+ne.h-.05,ne.z1+.06,ne.z1+.1,Jt,{cast:!1}),n(M,ne.x1+.06,ne.x1+.1,h+ne.h-.1,h+ne.h-.05,ne.z0,ne.z1,Jt,{cast:!1});for(let A=0;A<4;A++){const F=it.x0+.5+A*(it.x1-it.x0-1)/3,V=it.z-.22;n(k,F-.26,F+.26,h+1.12,h+1.15,V-.13,V+.13,Hr),[-.13,.13].forEach((Q,_e)=>{const ge=new Ye(new Qt(.075,.075,.2,10).translate(0,.1,0),new vn({color:"#d7ece4",transparent:!0,opacity:.5}));ge.position.set(F+Q,h+1.15,V),k.add(ge),t(k,F+Q,h+1.16,V,.09,.1,.09,["#5f8a3c","#7a9a42","#4f7a3a","#8c9a4a"][A+_e&3]),t(k,F+Q,h+1.35,V,.16,.03,.16,Jt,{cast:!1})})}const ee=(it.x0+it.x1)/2;n(k,ee-.75,ee+.75,h+1.97,h+2.47,l+.3,l+.36,"#22302a"),n(k,ee-.8,ee+.8,h+1.94,h+2.5,l+.26,l+.3,Vr);for(let A=0;A<4;A++)n(k,ee-.6,ee+(A&1?.25:.5),h+2.36-A*.1,h+2.38-A*.1,l+.36,l+.37,Xi,{cast:!1});const z={x0:o+6.9,x1:o+9.1,z:u-.85};n(K,z.x0,z.x1,h+.72,h+.78,z.z-.3,z.z+.3,Hr),[[z.x0+.1,-.22],[z.x0+.1,.22],[z.x1-.1,-.22],[z.x1-.1,.22]].forEach(([A,F])=>t(K,A,h,z.z+F,.07,.72,.07,Vr)),n(K,z.x0+.1,z.x1-.1,h+.78,h+.79,z.z-.1,z.z+.1,Xi,{cast:!1});for(let A=0;A<4;A++){const F=z.x0+.3+A*(z.x1-z.x0-.6)/3,V=new Ye(new Qt(.12,.1,.02,14).translate(0,.01,0),i("#fbf8ee"));V.position.set(F,h+.79,z.z-.17+(A&1)*.34),K.add(V),t(K,F,h+.8,z.z-.17+(A&1)*.34,.08,.04,.08,"#6f9a45"),t(K,F,h,z.z+.46,.07,.5,.07,Jt),t(K,F,h+.5,z.z+.46,.28,.06,.28,gi)}[z.x0+.55,z.x1-.55].forEach(A=>{t(K,A,h+.79,z.z,.05,.22,.05,Jt,{cast:!1});const F=new Ye(new _i(.07,10,6),he("#fff0c8","#ffc56a"));F.position.set(A,h+1.05,z.z),K.add(F),Z.push([F.material,.3,1.6])}),[f.z-.55,f.z+.55].forEach(A=>{[o+.45,o+1.35].forEach(F=>{t(T,F,h,A,.07,.82,.07,Jt),t(T,F,h+.82,A,.13,.08,.13,Jt)}),n(T,o+.45,o+1.35,h+.66,h+.71,A-.025,A+.025,gi,{cast:!1})}),n(T,o+1.6,o+6.4,h+.006,h+.014,u-1.95,u-.25,Jt,{cast:!1}),n(T,o+1.7,o+6.3,h+.008,h+.018,u-1.85,u-.35,gi,{cast:!1}),[[c-.35,u-1.1],[o+6.6,l+.35]].forEach(([A,F])=>{t(oe,A,h,F,.26,.1,.26,Jt),t(oe,A,h+.1,F,.06,1.25,.06,Jt);const V=new Ye(new Zt(.24,.34,.24).translate(0,.17,0),he("#fff1cf","#ffcf7a"));V.position.set(A,h+1.35,F),V.castShadow=!1,oe.add(V),Z.push([V.material,.35,1.5]),t(oe,A,h+1.69,F,.3,.05,.3,Jt,{cast:!1})});const Re=new _i(.06,8,6),Me=he("#fff1cf","#ffcf7a");Z.push([Me,.2,1.6]);const Ve=new Map;Le.forEach(([A,...F])=>{Ve.has(A)||Ve.set(A,[]),Ve.get(A).push(F)});const Ze=new $e,st=[];Ve.forEach((A,F)=>{const V=new Un(Re,Me,A.length);A.forEach(([Q,_e,ge],be)=>V.setMatrixAt(be,Ze.makeTranslation(Q,_e,ge))),F.add(V),st.push(V)});const gt=new aa("#ffc98a",0,14,1.2);gt.position.set((o+c)/2,h+2.6,(l+u)/2),r.add(gt);const ze=e.shell,dt=ze.loungeFront,ct=ze.loungeDoor.x,at=ze.loungeHeader,Tt=.7,Lt=.81,qe=new mt;a.add(qe);const bt=new mt;qe.add(bt),n(bt,ct-Tt-.12,ct-Tt,0,at+.12,dt-.02,dt+.1,"#1f4a35"),n(bt,ct+Tt,ct+Tt+.12,0,at+.12,dt-.02,dt+.1,"#1f4a35"),n(bt,ct-Tt-.12,ct+Tt+.12,at,at+.14,dt-.02,dt+.1,"#1f4a35");const vt=dt-Lt-1.5;n(bt,ct-Tt-.1,ct-Tt,0,at,vt,dt-.02,"#26302a",{cast:!1}),n(bt,ct+Tt,ct+Tt+.1,0,at,vt,dt-.02,"#26302a",{cast:!1}),n(bt,ct-Tt,ct+Tt,0,at,vt-.1,vt,"#2f3a32",{cast:!1}),n(bt,ct-Tt,ct+Tt,at,at+.05,vt,dt-.02,"#1d241f",{cast:!1}),n(bt,ct-.38,ct+.38,.004,.014,vt,dt-.02,gi,{cast:!1});const yt=new Ye(new _i(.1,12,8),he("#fff2c8","#ffd58a"));yt.position.set(ct,at-.45,vt+.06),bt.add(yt),Z.push([yt.material,.6,1.2]);const tn=new mt;tn.position.set(ct-Tt+.02,0,dt+.02),bt.add(tn);const Kt=Tt*2-.04,Ln=at-.03;n(tn,0,Kt,.01,Ln,-.03,.03,"#2d6146"),[[.32,.95],[1.15,1.85]].forEach(([A,F])=>n(tn,.14,Kt-.14,A,F,.03,.05,"#357052",{cast:!1})),n(tn,.08,Kt-.08,.02,.2,.03,.045,Jt,{cast:!1}),n(tn,Kt-.2,Kt-.12,.95,1.1,.03,.1,Jt,{cast:!1});const Ct=document.createElement("canvas");Ct.width=256,Ct.height=96;const Ut=new ti(Ct);Ut.colorSpace=Ot;const wn=new Ye(new Vn(.66,.25),new dn({map:Ut}));wn.position.set(Kt*.62,1.5,.056),tn.add(wn);const nn=document.createElement("canvas");nn.width=512,nn.height=64;const gn=new ti(nn);gn.colorSpace=Ot,gn.anisotropy=4;const Dn=new dn({map:gn,transparent:!0}),L=new mt;L.position.set(ct+2.1,2.02,dt+.05),qe.add(L),[.12,-.1].forEach((A,F)=>{const V=new Ye(new Vn(2.3,.26),Dn);V.rotation.z=A,V.position.z=F*.006,L.add(V)});function q(){const A='"Fredoka", "Bricolage Grotesque", sans-serif';let F=Ct.getContext("2d");F.fillStyle="#ece4d2",F.fillRect(0,0,256,96),F.strokeStyle=Jt,F.lineWidth=6,F.strokeRect(3,3,250,90),F.fillStyle="#1f3a2c",F.font=`600 40px ${A}`,F.textAlign="center",F.textBaseline="middle",F.fillText("STAFF ONLY",128,51),Ut.needsUpdate=!0,F=nn.getContext("2d"),F.clearRect(0,0,512,64),F.fillStyle="#e8b13a",F.fillRect(0,6,512,52),F.fillStyle="#2b2414",F.font=`600 34px ${A}`,F.textAlign="center",F.textBaseline="middle",F.fillText("COMING SOON  ·  COMING SOON",256,33),gn.needsUpdate=!0}q(),document.fonts&&document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",q);let X=0,se=null,ae=null;const Se=[],De=[],U=new Set,B=new Set,ce=he("#fff0c8","#ffc56a");Z.push([ce,.3,1.6]);function O(A,F){const V=[{file:"rooftop_site.glb",parent:g,hide:J,at:[[0,0]]},{file:"rooftop_speakeasy.glb",parent:_,hide:S,at:[[o+3.8,l+1.825]]},{file:"rooftop_pergola_vines.glb",parent:_,hide:xt,at:[[o+3.8,l+1.825]]},{file:"rooftop_bar.glb",parent:m,hide:x,at:[[(it.x0+it.x1)/2,it.z-.225]]},{file:"rooftop_dj_booth.glb",parent:p,hide:y,at:[[E.x,E.z]]},{file:"rooftop_parasol_table.glb",parent:v,hide:R,at:[[o+2.8,u-1.05],[o+5.6,u-1.05]]},{file:"rooftop_olive.glb",parent:D,hide:ve,at:[[c-.5,u-.5],[c-.6,l+.6]]},{file:"rooftop_drapes.glb",parent:M,hide:G,at:[[ne.x0,ne.z1,0],[ne.x1,ne.z1,Math.PI],[ne.x1,ne.z1,Math.PI/2],[ne.x1,ne.z0,-Math.PI/2]]},{file:"rooftop_jar_flight.glb",parent:b,hide:k,at:[[(it.x0+it.x1)/2,it.z-.225]]},{file:"rooftop_chefs_table.glb",parent:P,hide:K,at:[[o+8,u-.85]]},{file:"rooftop_lantern.glb",parent:T,hide:oe,at:[[c-.35,u-1.1],[o+6.6,l+.35]]}];V.forEach(pe=>B.add(pe.parent)),V.forEach(pe=>A.load(F+pe.file,le=>{const we=le.scene;we.traverse(je=>{je.isMesh&&(je.castShadow=je.receiveShadow=!0)});const Oe=we.getObjectByName("Flame"),Xe=we.getObjectByName("DanceFloor");we.traverse(je=>{/^Sign/.test(je.name)&&(je.visible=!1)}),Oe&&Oe.traverse(je=>{je.isMesh&&(je.material=pt.material,je.castShadow=!1)}),Xe&&Xe.traverse(je=>{je.isMesh&&(je.material=W.material)}),Si.forEach((je,lt)=>{const Yt=we.getObjectByName("BarLamp"+lt);Yt&&Yt.traverse(In=>{In.isMesh&&(In.material=je.material,In.castShadow=!1)})}),we.traverse(je=>{je.isMesh&&/^(CandleGlow|LanternGlow)/.test(je.name)&&(je.material=ce,je.castShadow=!1)}),we.traverse(je=>{const lt=je.isMesh&&je.material;lt&&/^Vine/.test(lt.name)&&!De.some(Yt=>Yt[0]===lt)&&De.push([lt,lt.color.clone()])}),Ji(we),pe.at.forEach(([je,lt,Yt],In)=>{const Bn=new mt;Yt&&(Bn.rotation.y=Yt),Bn.add(In?we.clone():we),Bn.scale.set(1.69,1.69/fn,1.69),Bn.position.set(je,h,lt),pe.parent.add(Bn)}),Oe&&(pt=Oe),pe.hide.visible=!1,U.add(pe.parent)},void 0,le=>console.warn("3D map: could not load "+pe.file,le))),A.load(F+"string_bulb.glb",pe=>{const le=pe.scene;le.updateMatrixWorld(!0);const we=lt=>{const Yt=le.getObjectByName(lt),In=[];return Yt?(Yt.traverse(Bn=>{if(Bn.isMesh){const jt=Bn.geometry.clone().applyMatrix4(Bn.matrixWorld);Object.keys(jt.attributes).forEach(bn=>{bn!=="position"&&bn!=="normal"&&jt.deleteAttribute(bn)}),In.push(jt.index?jt.toNonIndexed():jt)}}),Pr(In).scale(1.69,1.69/fn,1.69)):null},Oe=we("Bulb"),Xe=we("Socket");if(!Oe||!Xe)return;const je=new vn({color:"#22262a"});st.forEach(lt=>{lt.geometry=Oe;const Yt=new Un(Xe,je,lt.count);Yt.instanceMatrix.copy(lt.instanceMatrix),lt.parent.add(Yt)})},void 0,pe=>console.warn("3D map: could not load string_bulb.glb",pe));const Q=(pe,le,we,Oe,Xe)=>{const je=new mt;return je.add(le),je.scale.set(1.69,1.69/fn,1.69),je.position.set(we,Oe,Xe),pe.add(je),le.traverse(lt=>{lt.isMesh&&(lt.castShadow=lt.receiveShadow=!0)}),Ji(le),je},_e=(pe,le)=>A.load(F+pe,we=>le(we.scene),void 0,we=>console.warn("3D map: could not load "+pe,we));_e("lounge_elevator_shaft.glb",pe=>Ke.forEach((le,we)=>{const Oe=we?pe.clone():pe;Oe.traverse(Xe=>{Xe.isMesh&&Xe.material&&/Glass/.test(Xe.material.name)&&(Xe.material=Y,Xe.castShadow=Xe.receiveShadow=!1,we||Se.push(Xe))}),Q(le.frame,Oe,f.x,0,le.lz),le.kf.visible=le.ki.visible=!1})),_e("lounge_elevator_cab.glb",pe=>Ke.forEach((le,we)=>{const Oe=we?pe.clone():pe;Oe.traverse(Xe=>{/^Rail/.test(Xe.name)&&(Xe.visible=!1),Xe.name==="CabLamp"&&Xe.traverse(je=>{je.isMesh&&(je.material=le.cabLamp.material,je.castShadow=!1)})}),Q(le.cab,Oe,0,0,0),le.cabK.visible=!1})),_e("lounge_bridge.glb",pe=>Ke.forEach((le,we)=>{const Oe=we?pe.clone():pe;Oe.traverse(Xe=>{Xe.isMesh&&Xe.material&&/Glass/.test(Xe.material.name)&&(Xe.material=Y,Xe.castShadow=Xe.receiveShadow=!1)}),Q(le.inside,Oe,(f.x+f.w/2+o)/2,h,le.lz),le.kb.visible=!1})),_e("lounge_door.glb",pe=>{const le=pe.getObjectByName("DoorLeaf"),we=pe.getObjectByName("StaffPlaque"),Oe=pe.getObjectByName("Sconce");le&&(Oe&&Oe.traverse(Xe=>{Xe.isMesh&&(Xe.material=yt.material,Xe.castShadow=!1)}),Q(qe,pe,ct,0,dt),se=le,ae=we,bt.visible=!1)});const ge=["deck_planter.glb","deck_planter_short.glb"];let be=0;ge.forEach((pe,le)=>_e(pe,we=>{const[Oe,Xe,je,lt]=Ce[le];Q(D,we,(Oe+Xe)/2,h,(je+lt)/2),++be===ge.length&&(Fe.visible=!1)}))}function ue(A,F){const V=Math.min(C.length,Math.max(1,A)),Q=[...d,D,I,Mt,Tn];if(!C.slice(0,V).every(le=>!B.has(le)||U.has(le))||!U.has(D))return null;const _e=Q.map(le=>le.visible);g.visible=!1,D.visible=!0,Tn.visible=!1,C.forEach((le,we)=>{le.visible=we<V}),I.visible=!!F,Mt.visible=!F;const ge=a.clone();Q.forEach((le,we)=>{le.visible=_e[we]}),ge.updateMatrixWorld(!0);const be=[],pe=new Mn;return ge.traverse(le=>{if(le!==ge){if(!le.visible||le.isSprite){be.push(le);return}!le.isMesh||le.isInstancedMesh||(le.geometry.boundingBox||le.geometry.computeBoundingBox(),pe.copy(le.geometry.boundingBox).applyMatrix4(le.matrixWorld),(pe.max.y<h-.05||pe.min.x<o-.2)&&be.push(le))}}),be.forEach(le=>le.parent&&le.parent.remove(le)),ge}return{loadModels:O,pictureCopy:ue,update(A){const F=A.loungeOpen?Math.max(1,A.loungeTier||1):0,V=A.night||0;g.visible=!F,D.visible=!!F,C.forEach((be,pe)=>{be.visible=F>pe}),w.position.y=A.liftY||0,$&&($.position.y=A.liftY2||0,I.visible=!!A.loungeLift,Mt.visible=!A.loungeLift),X+=((F?1.75:0)-X)*.15,tn.rotation.y=X,wn.visible=!F,L.visible=!F,se&&(se.rotation.y=X,ae&&(ae.visible=!F)),Se.forEach(be=>{be.visible=!!F}),Z.forEach(([be,pe,le])=>{be.emissiveIntensity=pe+V*le}),pt.scale.y=.8+Math.sin((A.time||0)/130)*.2+Math.sin((A.time||0)/53)*.1,pt.visible=F>=1,j.color.setScalar(1-V*.45),De.forEach(([be,pe])=>be.color.copy(pe).multiplyScalar(1-V*.45));const Q=F?A.loungeSmokers||[]:[],_e=A.time||0;let ge=0;Q.forEach(be=>{for(let pe=0;pe<On;pe++){const le=(_e+be.id*1777%En+pe*En/On)%En/on;if(le>=1)continue;const we=mn(ge++),Oe=.75+le*2.3,Xe=Math.sin(le*3+be.id+pe)*.2;we.visible=!0,we.position.set(be.x+(be.facing||0)*.4+Xe+le*.25,h+1.65+le*2,be.z+.1-le*.15),we.scale.set(Oe,Oe/fn,1),we.material.opacity=Math.min(1,le*6)*Math.pow(1-le,.8)*.95,we.material.color.setScalar(.72-V*.25)}});for(let be=ge;be<Xn.length;be++)Xn[be].visible=!1;gt.intensity=F?V*6:0}}}const Ig="#1f6b47",Fg="#d0a54e";function Ng(r,e,{span:t,model:n}){const i=e.entrance;if(!i)return null;const s=new mt;r.add(s);const a=i.x;function o(M,b,P){const T=new qt;T.setAttribute("position",new Pt(M.flat(),3)),T.setAttribute("uv",new Pt(b.flat(),2)),T.setIndex(M.length===4?[0,1,2,0,2,3]:[0,1,2]),T.computeVertexNormals();const C=new Ye(T,P);return C.castShadow=C.receiveShadow=!0,s.add(C),C}const c=i.sign,l=new mt;s.add(l),t(l,c.x0,a,c.y1+.08,c.y1+.16,c.z-.05,c.z+.05,Ig),[c.x0+.12,c.x1-.12].forEach(M=>t(l,M-.015,M+.015,c.y1,c.y1+.08,c.z-.015,c.z+.015,Fg,{cast:!1})),t(l,c.x0-.04,c.x1+.04,c.y0-.04,c.y1+.04,c.z-.05,c.z+.05,"#1d211f");const u=document.createElement("canvas");u.width=256,u.height=284;const h=u.getContext("2d");h.fillStyle="#0d120f",h.fillRect(0,0,256,284);const f=128,d=150,g=(M,b)=>{const P=118*b,T=17*b,C=M-Math.PI/2,S=Math.cos(C),x=Math.sin(C),y=16,R=K=>Array.from({length:y+1},(oe,D)=>{const Y=D/y,H=T*Math.pow(Math.sin(Math.PI*Math.min(1,Y*1.08)),.9)*(D%2?1:.72);return[f+S*P*Y-x*H*K,d+x*P*Y+S*H*K]}),G=R(1),k=R(-1).reverse();h.moveTo(f,d),G.forEach(K=>h.lineTo(K[0],K[1])),k.forEach(K=>h.lineTo(K[0],K[1])),h.closePath()},_=()=>{h.beginPath(),[[0,1],[-.5,.84],[.5,.84],[-1.05,.7],[1.05,.7],[-1.6,.38],[1.6,.38]].forEach(([M,b])=>g(M,b))};h.lineJoin=h.lineCap="round",_(),h.shadowColor="#29ff6a",h.shadowBlur=18,h.strokeStyle="#3df27a",h.lineWidth=12,h.stroke(),_(),h.shadowBlur=0,h.strokeStyle="#e4ffe9",h.lineWidth=6,h.stroke(),_(),h.fillStyle="#0f1812",h.fill();const m=()=>{h.beginPath(),h.moveTo(f,d-6),h.lineTo(f,d+34)};m(),h.shadowBlur=14,h.strokeStyle="#3df27a",h.lineWidth=7,h.stroke(),m(),h.shadowBlur=0,h.strokeStyle="#e4ffe9",h.lineWidth=3,h.stroke(),h.font='300 54px "Fredoka", sans-serif',h.textAlign="center",h.textBaseline="alphabetic",h.lineWidth=2.5,h.shadowColor="#29ff6a",h.shadowBlur=16,h.strokeStyle="#7dff9f",h.strokeText("OPEN",f,262,210),h.shadowBlur=0,h.strokeStyle="#ecfff0",h.lineWidth=1.5,h.strokeText("OPEN",f,262,210);const p=new ti(u);p.colorSpace=Ot;const v=new dn({map:p,toneMapped:!1,side:2});return[c.z-.052,c.z+.052].forEach(M=>{const b=o([[c.x0,c.y1,M],[c.x1,c.y1,M],[c.x1,c.y0,M],[c.x0,c.y0,M]],[[0,1],[1,1],[1,0],[0,0]],v);b.castShadow=!1,l.attach(b)}),n&&n("blade_sign.glb",a,0,c.z,M=>{let b=0;const P=p.clone();P.flipY=!1,P.needsUpdate=!0;const T=v.clone();T.map=P,M.traverse(C=>{C.isMesh&&/^SignFace/.test(C.name)&&(C.material=T,C.castShadow=!1,b++)}),b?l.visible=!1:M.parent.visible=!1},s),s}const Ug=5e3,Og=8e3,el=4e3,Hs=9e4,Bg=8,Xa=256,ja=64,Vs=2,tl=new Map;function Ws(r){if(typeof r!="string")return null;let e=tl.get(r);if(e!==void 0)return e;if(e=null,r[0]==="#"){let t=r.slice(1);(t.length===3||t.length===4)&&(t=t.split("").map(n=>n+n).join("")),(t.length===6||t.length===8)&&(e=[new Qe("#"+t.slice(0,6)),t.length===8?parseInt(t.slice(6),16)/255:1])}else if(/^rgba?\(/.test(r)){const t=r.match(/[\d.]+/g).map(Number);e=[new Qe(`rgb(${t[0]},${t[1]},${t[2]})`),t.length>3?t[3]:1]}return tl.set(r,e),e}function kg(r){const e=new mt;e.visible=!1,r.add(e);const t=new $e,n=new N,i=new N,s=new yn,a=new N(0,1,0),o=new N,c=new Qe("#ffffff");function l(D,Y,H,he=!0){const Z=new Un(D,H,Y);return Z.instanceMatrix.setUsage(35048),Z.setColorAt(0,c),Z.count=0,Z.castShadow=he,Z.receiveShadow=!0,Z.frustumCulled=!1,e.add(Z),Z}const u=D=>new vn({color:"#ffffff",...D}),h=D=>new dn({color:"#ffffff",...D}),f={transparent:!0,opacity:.32,depthWrite:!1},d=new Zt(1,1,1).translate(0,.5,0),g=new Qt(.5,.5,1,8,1).translate(0,.5,0),_=new Hn(1,2),m=new Qt(1,1,.02,20),p=new ia(1,24).rotateY(Math.PI/4),v={box:[l(d,Ug,u()),l(d,800,h()),l(d,800,u(f),!1)],cord:[l(g,Og,u()),l(g,1500,h())],blob:[l(_,el,u()),l(_,600,h())],disc:[l(m,el,u(),!1),l(m,600,h(),!1)],facing:[l(p,600,u({side:2}),!1),l(p,300,h({side:2}),!1)]};function M(D,Y){const H=new qt;H.setAttribute("position",new zt(new Float32Array(Hs*3),3).setUsage(35048)),H.setAttribute("normal",new zt(new Float32Array(Hs*3),3).setUsage(35048)),H.setAttribute("color",new zt(new Float32Array(Hs*(Y?4:3)),Y?4:3).setUsage(35048)),H.setDrawRange(0,0),Object.assign(D,{vertexColors:!0,side:2,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});const he=new Ye(H,D);return he.frustumCulled=!1,he.receiveShadow=!0,e.add(he),{mesh:he,g:H,alpha:Y,n:0}}const b=[M(u(),!1),M(h(),!1),M(u({transparent:!0,depthWrite:!1}),!0)],P=new Map;function T(D,Y){const H=D.x.toFixed(2)+","+D.y.toFixed(2)+","+D.z.toFixed(2)+","+D.alongZ;let he=P.get(H);if(!he){const Z=document.createElement("canvas");Z.width=Xa*Vs,Z.height=ja*Vs;const te=Z.getContext("2d");te.scale(Vs,Vs),te.translate(Xa/2,ja/2);const Te=Y*Math.SQRT1_2;try{D.draw(te,Te)}catch{}const Pe=new ti(Z);Pe.colorSpace=Ot,Pe.anisotropy=4,he=new Ye(new Vn(Xa/Te,ja/Y),h({map:Pe,transparent:!0,alphaTest:.05,side:2,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4})),he.position.set(D.x,D.y,D.z),D.alongZ&&(he.rotation.y=Math.PI/2),e.add(he),P.set(H,he)}return he}const C=[];for(let D=0;D<Bg;D++){const Y=new aa("#ffd9a0",0,9,1.4);e.add(Y),C.push(Y)}function S(D,Y,H,he){const Z=H?D[2]:D[Y?1:0];return!Z||Z.count>=Z.instanceMatrix.count?null:(he(t),Z.setMatrixAt(Z.count,t),[Z,Z.count++])}function x(D,Y){D&&D[0].setColorAt(D[1],Y[0])}function y(D,Y){D.clearUpdateRanges(),Y>0&&D.addUpdateRange(0,Y*D.itemSize),D.needsUpdate=!0}function R(D,Y){let H=2166136261^D.length;const he=te=>{H=Math.imul(H^te,16777619)},Z=te=>{if(typeof te=="number")he(Math.round(te*4096));else if(typeof te=="string")for(let Te=0;Te<te.length;Te++)he(te.charCodeAt(Te));else Array.isArray(te)?(he(te.length),te.forEach(Z)):he(te?1:0)};return D.forEach(te=>Y.forEach(Te=>Z(te[Te]))),H}const G={};function k(D,Y,H){const he=R(Y,H);return G[D]===he?!1:(G[D]=he,!0)}function K(D){D.forEach(Y=>{Y.count=0})}function oe(D){D.forEach(Y=>{y(Y.instanceMatrix,Y.count),Y.instanceColor&&y(Y.instanceColor,Y.count)})}return{group:e,update(D,Y){if(k("boxes",D.boxes,["x","y","z","w","d","h","c","lit"])&&(K(v.box),D.boxes.forEach(Z=>{const te=Ws(Z.c);!te||te[1]<.05||x(S(v.box,Z.lit,te[1]<.9,Te=>Te.compose(n.set(Z.x,Z.y,Z.z),s.identity(),i.set(Math.max(.01,Z.w),Math.max(.01,Z.h),Math.max(.01,Z.d)))),te)}),oe(v.box)),k("lines",D.lines,["pts","c","w","lit"])&&(K(v.cord),D.lines.forEach(Z=>{const te=Ws(Z.c);if(!te||te[1]<.5)return;const Te=Math.max(.02,Z.w);for(let Pe=1;Pe<Z.pts.length;Pe++){const re=Z.pts[Pe-1],xe=Z.pts[Pe];o.set(xe[0]-re[0],xe[1]-re[1],xe[2]-re[2]);const Ne=o.length();Ne<1e-4||(o.divideScalar(Ne),x(S(v.cord,Z.lit,!1,Ee=>Ee.compose(n.set(re[0],re[1],re[2]),s.setFromUnitVectors(a,o),i.set(Te,Ne,Te))),te))}}),oe(v.cord)),k("ellipses",D.ellipses,["at","rx","ry","c","lit"])){const Z=v.blob.concat(v.disc,v.facing);K(Z),D.ellipses.forEach((te,Te)=>{const Pe=Ws(te.c);if(!Pe||Pe[1]<.5)return;const re=te.ry/te.rx<.66,xe=te.rx,Ne=.08+Te*.0015;te.ry>te.rx*1.05?x(S(v.facing,te.lit,!1,Ee=>Ee.compose(n.set(te.at[0]+Ne,te.at[1],te.at[2]+Ne),s.identity(),i.set(te.rx,te.ry,te.rx))),Pe):x(re?S(v.disc,te.lit,!1,Ee=>Ee.compose(n.set(te.at[0],te.at[1],te.at[2]),s.identity(),i.set(xe,1,xe))):S(v.blob,te.lit,!1,Ee=>Ee.compose(n.set(te.at[0],te.at[1],te.at[2]),s.identity(),i.set(xe,Math.max(.4,te.ry/te.rx)*xe,xe))),Pe)}),oe(Z)}if(k("polys",D.polys,["pts","c","lit"])){b.forEach(te=>{te.n=0});const Z=new N;D.polys.forEach(te=>{const Te=Ws(te.c);if(!Te||Te[1]<.08||te.pts.length<3)return;const Pe=b[Te[1]<.9?2:te.lit?1:0],re=te.pts.length-2;if(Pe.n+re*3>Hs)return;const xe=Pe.g.attributes.position.array,Ne=Pe.g.attributes.normal.array,Ee=Pe.g.attributes.color.array,et=Pe.alpha?4:3,nt=te.pts[0];Z.set(0,0,0);for(let Mt=0;Mt<te.pts.length;Mt++){const ut=te.pts[Mt],_t=te.pts[(Mt+1)%te.pts.length];Z.x+=(ut[1]-_t[1])*(ut[2]+_t[2]),Z.y+=(ut[2]-_t[2])*(ut[0]+_t[0]),Z.z+=(ut[0]-_t[0])*(ut[1]+_t[1])}if(Z.lengthSq()<1e-12)return;const ot=Z.y<-1e-6||Math.abs(Z.y)<1e-6&&Z.x+Z.z<0;ot&&Z.negate(),Z.normalize();for(let Mt=1;Mt<=re;Mt++)(ot?[nt,te.pts[Mt+1],te.pts[Mt]]:[nt,te.pts[Mt],te.pts[Mt+1]]).forEach(ut=>{const _t=Pe.n++;xe[_t*3]=ut[0],xe[_t*3+1]=ut[1],xe[_t*3+2]=ut[2],Ne[_t*3]=Z.x,Ne[_t*3+1]=Z.y,Ne[_t*3+2]=Z.z,Ee[_t*et]=Te[0].r,Ee[_t*et+1]=Te[0].g,Ee[_t*et+2]=Te[0].b,Pe.alpha&&(Ee[_t*et+3]=Te[1])})}),b.forEach(te=>{te.g.setDrawRange(0,te.n),["position","normal","color"].forEach(Te=>y(te.g.attributes[Te],te.n))})}const H=new Set;D.faces.forEach(Z=>H.add(T(Z,D.unit))),P.forEach(Z=>{Z.visible=H.has(Z)});const he=(D.fixtures||[]).slice().sort((Z,te)=>te.size-Z.size);C.forEach((Z,te)=>{const Te=he[te];Z.intensity=Te?Y*6*Math.min(1.5,Te.size):0,Te&&Z.position.set(Te.x,Te.y,Te.z)})}}}const zg=[7,9,8,6,3,4],Gg=/^(ReaderScreen|MonitorGlass|ScaleScreen|TillGlass)$/,Pi=new Mn,Hg=new Mn,Vg=new N;function Wg(r){return Pi.makeEmpty(),r.forEach(e=>{e.updateMatrix(),e.geometry?(e.geometry.boundingBox||e.geometry.computeBoundingBox(),Pi.union(Hg.copy(e.geometry.boundingBox).applyMatrix4(e.matrix))):Pi.expandByPoint(e.position)}),Vg.set((Pi.min.x+Pi.max.x)/2,Pi.min.y,(Pi.min.z+Pi.max.z)/2)}function qa(r,e){const t=new Map;return r.forEach(n=>{const i=e.exec(n.name);i&&(t.has(i[1])||t.set(i[1],[]),t.get(i[1]).push(n))}),[...t.keys()].sort().map(n=>t.get(n))}function Ka(r,e){const t=r[0].parent,n=new mt,i=Wg(r);return n.position.copy(i),n.userData.motion=Object.assign({rest:i.toArray()},e),t.add(n),r.forEach(s=>{s.position.sub(i),n.add(s)}),n}const Li=(r,e)=>{r.userData.motion=Object.assign({rest:r.position.toArray(),size:r.scale.toArray()},e)},Xs=(r,e)=>r.forEach((t,n)=>e(t,n,r.length));function Xg(r,e){const t=[];r.traverse(i=>{i!==r&&i.name&&t.push(i)});const n=i=>t.filter(s=>i.test(s.name));return e===0&&qa(t,/^S(\d+)(?:Leaf|Stem|Top)/).forEach((i,s,a)=>Ka(i,{m:"sprout",k:s,n:a.length})),e===1&&qa(t,/^P(\d+)(?:Stem|Leaf|Pet|Branch|Cola|SideCola|Sugar|TopSugar|Crown)/).forEach((i,s)=>{Ka(i,{m:"plant",k:s}),i.forEach(a=>{/(Cola|Sugar)\d*$/.test(a.name)&&Li(a,{m:"bud"})})}),e===2&&(Xs(n(/^(?:T\dP\d|Plant|Corner)(?:Leaf|Pet|BranchLeaf)/),(i,s,a)=>Li(i,{m:"trim",k:s*7%a,n:a})),Xs(n(/^(?:Tray\d?Nug|BoardNug)\d+$/),(i,s,a)=>Li(i,{m:"fill",k:s,n:a,from:.1,span:.75}))),e===3&&(n(/^Press(?:Ram|Head|Plate)$/).forEach(i=>Li(i,{m:"press",amp:.03})),n(/^ScalePan$/).forEach(i=>Li(i,{m:"press",amp:.008})),Xs(n(/^(?:TopCratePouch|Box)\d+$/),(i,s,a)=>Li(i,{m:"fill",k:s,n:a,from:.35,span:.5})),Xs(n(/^TrayNug\d+$/),(i,s,a)=>Li(i,{m:"drain",k:s,n:a}))),e===4&&n(/^Key\d+$/).forEach((i,s)=>Li(i,{m:"key",k:s})),e===5&&qa(t,/^(?:Bag|FlatBag)(\d+)/).forEach((i,s,a)=>Ka(i,{m:"handoff",k:s,n:a.length})),e!==6&&t.forEach(i=>{Gg.test(i.name)&&i.isMesh&&(i.userData.motion={m:"screen"})}),r}function jg(r,e){const t=[];return r.traverse(n=>{const i=n.userData.motion;i&&(i.m==="screen"&&(n.material=n.material.clone(),n.material.emissive&&n.material.emissive.copy(n.material.color).lerp(new Qe("#bff5dc"),.5)),t.push(n))}),t.length?{index:e,parts:t,act:0,grow:[]}:null}const co=r=>r<0?0:r>1?1:r,ji=r=>(r=co(r),r*r*(3-2*r));function qg(r){return r<.72?r/.72:r>.86?(1-r)/.14:1}function Kg(r,e,t){const n=e.clock||0,i=zg[r.index]||6,s=n/i%1,a=1-Math.exp(-t*4);r.act+=((e.act||0)-r.act)*a;const o=r.parts;for(let c=0;c<o.length;c++){const l=o[c],u=l.userData.motion;switch(u.m){case"plant":{const h=qg((n/i+u.k*.23)%1),f=r.grow[u.k]=r.grow[u.k]===void 0?h:r.grow[u.k]+(h-r.grow[u.k])*a;l.scale.setScalar(.2+.8*ji(f)),l.userData.g=f,l.rotation.z=Math.sin(n*1.1+u.k*1.7)*.025;break}case"bud":{const h=ji((l.parent.userData.g-.55)/.35);l.scale.set(u.size[0]*h,u.size[1]*h,u.size[2]*h);break}case"sprout":{const h=(n/i+u.k*.17)%1,f=h>.9?1-(h-.9)/.1:ji(h/.8);l.scale.setScalar(.06+.94*f);break}case"trim":{const h=.1+.7*u.k/u.n,f=s>.92?(s-.92)/.08:1-co((s-h)/.06);l.scale.set(u.size[0]*f,u.size[1]*f,u.size[2]*f);break}case"fill":case"drain":{const h=(u.m==="fill"?u.from:.35)+(u.m==="fill"?u.span:.5)*u.k/u.n,f=s>.93?1-(s-.93)/.07:ji((s-h)/.05),d=u.m==="fill"?f:1-f;l.scale.set(u.size[0]*d,u.size[1]*d,u.size[2]*d);break}case"press":l.position.y=u.rest[1]-u.amp*Math.sin(Math.PI*co((s-.1)/.25));break;case"key":l.position.y=u.rest[1]-(Math.floor(n*6)%9===u.k*4%9?.006*r.act:0);break;case"handoff":{const h=Math.floor(n/i)%u.n===u.k,f=h?ji((s-.4)/.3):0,d=h?s<.85?ji((s-.6)/.2):1-ji((s-.85)/.15):0;l.position.y=u.rest[1]+(s<.85?.1*f:0),l.scale.setScalar(1-d);break}case"screen":l.material.emissiveIntensity=r.act*(.35+.08*Math.sin(n*23)+(Math.sin(n*3.1)>.96?.15:0));break}}}const Zi=96,ts=160,Js=2,vi="#144d29",jl="#5c9e4d",ns="#ffe6a8",ql="#f6dca2",Ao="#e3c27f",ii="#d9a441",Kl="#f0c766",Zs="#fffaf0",Yl=["bud","roll","gummy","vape","bud","gummy","roll","bud","vape","gummy"],Ni=[{tile:2,at:.14},{tile:4,at:.3},{tile:7,at:.46}],Ya=.08,nl=.62,Ja=.76,lo=.9,Yg=1.6,Gn={x:[6,50],w:40,h:34,top:26,gap:6},Jg=r=>r<0?0:r>1?1:r,Qr=r=>(r=Jg(r),r*r*(3-2*r));function Zg(r,e,t=null){if(t!=null||r>=lo){const o=Math.min(1,(t||0)/1.2);return{mode:"paid",q:o,key:"paid"+Math.round(o*12)}}if(r>=nl){const o=r>=Ja?Qr((r-Ja)/.06):0,c=r>=Ja+.06?Math.floor(e*6)%3:-1,l=Qr((r-nl)/.06);return{mode:"pay",slide:l,press:o,wait:c,key:"pay"+Math.round(l*6)+Math.round(o*4)+c}}const n=Ni.filter(o=>r>=o.at+Ya).length,i=Ni.find(o=>r>=o.at&&r<o.at+Ya),s=i?(r-i.at)/Ya:-1,a=Math.round(Qr(r/.55)*60);return{mode:"browse",scroll:a,picked:n,tapping:i?i.tile:-1,ripple:s,key:"browse"+a+n+(i?i.tile+":"+Math.round(s*5):"")}}function Mi(r,e,t,n,i,s){r.beginPath(),r.moveTo(e+s,t),r.arcTo(e+n,t,e+n,t+i,s),r.arcTo(e+n,t+i,e,t+i,s),r.arcTo(e,t+i,e,t,s),r.arcTo(e,t,e+n,t,s),r.closePath()}function Jl(r,e,t,n,i){e==="bud"?(r.fillStyle=jl,[[-4,2],[4,2],[0,-3],[0,4]].forEach(([s,a])=>{r.beginPath(),r.arc(t+s*i,n+a*i,5*i,0,7),r.fill()}),r.fillStyle="#8cc46f",r.beginPath(),r.arc(t-1*i,n-2*i,2.5*i,0,7),r.fill()):e==="roll"?(r.save(),r.translate(t,n),r.rotate(-.6),r.fillStyle=Zs,r.fillRect(-10*i,-2.5*i,16*i,5*i),r.fillStyle=ii,r.fillRect(6*i,-2.5*i,5*i,5*i),r.restore()):e==="gummy"?(r.fillStyle="#e07a5f",Mi(r,t-9*i,n-4*i,8*i,8*i,2.5*i),r.fill(),r.fillStyle="#f2b134",Mi(r,t+1*i,n-6*i,8*i,8*i,2.5*i),r.fill()):(r.fillStyle=vi,Mi(r,t-3*i,n-9*i,6*i,18*i,2*i),r.fill(),r.fillStyle=ii,r.fillRect(t-3*i,n-9*i,6*i,4*i))}function Zl(r,e,t,n,i){r.strokeStyle=i,r.lineWidth=2.6*n,r.lineCap="round",r.lineJoin="round",r.beginPath(),r.moveTo(e-5*n,t),r.lineTo(e-1.5*n,t+4*n),r.lineTo(e+5.5*n,t-4*n),r.stroke()}function Ql(r,e){if(r.fillStyle=vi,r.fillRect(0,0,Zi,20),r.fillStyle=jl,r.beginPath(),r.ellipse(11,10,4,6,.5,0,7),r.fill(),r.fillStyle=ns,r.fillRect(20,8,30,4),r.strokeStyle=ns,r.lineWidth=2,r.beginPath(),r.moveTo(70,6),r.lineTo(73,6),r.lineTo(76,14),r.lineTo(84,14),r.lineTo(86,8),r.lineTo(74,8),r.stroke(),e){r.fillStyle=ii,r.beginPath(),r.arc(87,6,5,0,7),r.fill(),r.fillStyle=vi;for(let t=0;t<e;t++)r.fillRect(84.5+t*2,5,1.2,2.5)}}function Qg(r,e){r.fillStyle=ns,r.fillRect(0,0,Zi,ts);const t=new Set(Ni.slice(0,e.picked).map(n=>n.tile));r.save(),r.beginPath(),r.rect(0,20,Zi,116),r.clip(),Yl.forEach((n,i)=>{const s=Gn.x[i%2],a=Gn.top+Math.floor(i/2)*(Gn.h+Gn.gap)-e.scroll;if(a>136||a+Gn.h<20)return;const o=i===e.tapping;r.fillStyle=o?Zs:ql,Mi(r,s,a,Gn.w,Gn.h,4),r.fill(),Jl(r,n,s+Gn.w/2,a+13,.9),r.fillStyle=Ao,r.fillRect(s+6,a+25,18,3),r.fillStyle=ii,r.fillRect(s+27,a+25,8,3),o&&(r.strokeStyle=ii,r.lineWidth=2,Mi(r,s+1,a+1,Gn.w-2,Gn.h-2,4),r.stroke(),r.globalAlpha=1-e.ripple,r.beginPath(),r.arc(s+Gn.w/2,a+14,4+e.ripple*16,0,7),r.stroke(),r.globalAlpha=1),t.has(i)&&(r.fillStyle=vi,r.beginPath(),r.arc(s+Gn.w-6,a+6,5,0,7),r.fill(),Zl(r,s+Gn.w-6,a+6,.55,Kl))}),r.restore(),Ql(r,e.picked),r.fillStyle=e.picked===Ni.length?ii:vi,Mi(r,8,140,80,15,5),r.fill(),r.fillStyle=e.picked===Ni.length?vi:ns;for(let n=0;n<Ni.length;n++)r.globalAlpha=n<e.picked?1:.3,r.beginPath(),r.arc(20+n*8,147.5,2.5,0,7),r.fill();r.globalAlpha=1,r.fillRect(56,146,24,3)}function $g(r,e){r.fillStyle=ns,r.fillRect(0,0,Zi,ts),Ql(r,Ni.length),r.save(),r.translate((1-e.slide)*Zi,0),Ni.forEach((n,i)=>{const s=28+i*24;r.fillStyle=ql,Mi(r,6,s,84,20,4),r.fill(),Jl(r,Yl[n.tile],18,s+10,.6),r.fillStyle=Ao,r.fillRect(32,s+8,28,4),r.fillStyle=ii,r.fillRect(70,s+8,12,4)}),r.fillStyle=vi,r.fillRect(8,104,80,2),r.fillRect(10,110,26,5),r.fillStyle=ii,r.fillRect(62,110,22,5);const t=e.press*2;if(r.fillStyle="#a87a24",Mi(r,10,126,76,24,6),r.fill(),r.fillStyle=e.press?ii:Kl,Mi(r,10,124+t,76,22-t,6),r.fill(),r.fillStyle=vi,e.wait<0)r.fillRect(34,133+t,28,4);else for(let n=0;n<3;n++)r.globalAlpha=n===e.wait?1:.35,r.beginPath(),r.arc(40+n*8,135+t,3,0,7),r.fill();r.globalAlpha=1,r.restore()}function e0(r,e){r.fillStyle=vi,r.fillRect(0,0,Zi,ts);const t=Qr(e.q/.35),n=22*(.35+.65*t);r.fillStyle=ii,r.beginPath(),r.arc(48,52,n,0,7),r.fill(),t>.5&&Zl(r,48,52,1.6,Zs);const i=Qr((e.q-.3)/.6),s=ts-i*62;r.fillStyle=Zs,r.fillRect(22,s,52,70),r.fillStyle=Ao;for(let a=0;a<4;a++)r.fillRect(28,s+8+a*9,a===3?18:40,3);r.fillStyle=ii,r.fillRect(52,s+35,16,3)}function t0(r,e){r.setTransform(Js,0,0,Js,0,0),e.mode==="paid"?e0(r,e):e.mode==="pay"?$g(r,e):Qg(r,e)}class n0 extends Cr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new o0(t)}),this.register(function(t){return new c0(t)}),this.register(function(t){return new b0(t)}),this.register(function(t){return new _0(t)}),this.register(function(t){return new x0(t)}),this.register(function(t){return new h0(t)}),this.register(function(t){return new u0(t)}),this.register(function(t){return new f0(t)}),this.register(function(t){return new d0(t)}),this.register(function(t){return new a0(t)}),this.register(function(t){return new p0(t)}),this.register(function(t){return new l0(t)}),this.register(function(t){return new g0(t)}),this.register(function(t){return new m0(t)}),this.register(function(t){return new r0(t)}),this.register(function(t){return new v0(t)}),this.register(function(t){return new M0(t)})}load(e,t,n,i){const s=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=Zr.extractUrlBase(e);a=Zr.resolveURL(l,this.path)}else a=Zr.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){i?i(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new Wl(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,a,function(u){t(u),s.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const a={},o={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===$l){try{a[Dt.KHR_BINARY_GLTF]=new y0(e)}catch(h){i&&i(h);return}s=JSON.parse(a[Dt.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new N0(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const h=s.extensionsUsed[u],f=s.extensionsRequired||[];switch(h){case Dt.KHR_MATERIALS_UNLIT:a[h]=new s0;break;case Dt.KHR_DRACO_MESH_COMPRESSION:a[h]=new S0(s,this.dracoLoader);break;case Dt.KHR_TEXTURE_TRANSFORM:a[h]=new E0;break;case Dt.KHR_MESH_QUANTIZATION:a[h]=new T0;break;default:f.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function i0(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const Dt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class r0{constructor(e){this.parser=e,this.name=Dt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let l;const u=new Qe(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],Cn);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new ao(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new aa(u),l.distance=h;break;case"spot":l=new hg(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,bi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class s0{constructor(){this.name=Dt.KHR_MATERIALS_UNLIT}getMaterialType(){return dn}extendParams(e,t,n){const i=[];e.color=new Qe(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Cn),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Ot))}return Promise.all(i)}}class a0{constructor(e){this.parser=e,this.name=Dt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class o0{constructor(e){this.parser=e,this.name=Dt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Be(o,o)}return Promise.all(s)}}class c0{constructor(e){this.parser=e,this.name=Dt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class l0{constructor(e){this.parser=e,this.name=Dt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}}class h0{constructor(e){this.parser=e,this.name=Dt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Qe(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Cn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Ot)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}}class u0{constructor(e){this.parser=e,this.name=Dt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}}class f0{constructor(e){this.parser=e,this.name=Dt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Qe().setRGB(o[0],o[1],o[2],Cn),Promise.all(s)}}class d0{constructor(e){this.parser=e,this.name=Dt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class p0{constructor(e){this.parser=e,this.name=Dt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Qe().setRGB(o[0],o[1],o[2],Cn),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,Ot)),Promise.all(s)}}class m0{constructor(e){this.parser=e,this.name=Dt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}}class g0{constructor(e){this.parser=e,this.name=Dt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}}class b0{constructor(e){this.parser=e,this.name=Dt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}}class _0{constructor(e){this.parser=e,this.name=Dt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class x0{constructor(e){this.parser=e,this.name=Dt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class v0{constructor(e){this.name=Dt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const c=i.byteOffset||0,l=i.byteLength||0,u=i.count,h=i.byteStride,f=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,f,i.mode,i.filter).then(function(d){return d.buffer}):a.ready.then(function(){const d=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(d),u,h,f,i.mode,i.filter),d})})}else return null}}class M0{constructor(e){this.name=Dt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==qn.TRIANGLES&&l.mode!==qn.TRIANGLE_STRIP&&l.mode!==qn.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,d=[];for(const g of h){const _=new $e,m=new N,p=new yn,v=new N(1,1,1),M=new Un(g.geometry,g.material,f);for(let b=0;b<f;b++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,b),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,b),c.SCALE&&v.fromBufferAttribute(c.SCALE,b),M.setMatrixAt(b,_.compose(m,p,v));for(const b in c)if(b==="_COLOR_0"){const P=c[b];M.instanceColor=new io(P.array,P.itemSize,P.normalized)}else b!=="TRANSLATION"&&b!=="ROTATION"&&b!=="SCALE"&&g.geometry.setAttribute(b,c[b]);$t.prototype.copy.call(M,g),this.parser.assignFinalMaterial(M),d.push(M)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const $l="glTF",Wr=12,il={JSON:1313821514,BIN:5130562};class y0{constructor(e){this.name=Dt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Wr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==$l)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Wr,s=new DataView(e,Wr);let a=0;for(;a<i;){const o=s.getUint32(a,!0);a+=4;const c=s.getUint32(a,!0);if(a+=4,c===il.JSON){const l=new Uint8Array(e,Wr+a,o);this.content=n.decode(l)}else if(c===il.BIN){const l=Wr+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class S0{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Dt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const u in a){const h=ho[u]||u.toLowerCase();o[h]=a[u]}for(const u in e.attributes){const h=ho[u]||u.toLowerCase();if(a[u]!==void 0){const f=n.accessors[e.attributes[u]],d=_r[f.componentType];l[h]=d.name,c[h]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h,f){i.decodeDracoFile(u,function(d){for(const g in d.attributes){const _=d.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}h(d)},o,l,Cn,f)})})}}class E0{constructor(){this.name=Dt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class T0{constructor(){this.name=Dt.KHR_MESH_QUANTIZATION}}class eh extends is{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=i-t,h=(n-t)/u,f=h*h,d=f*h,g=e*l,_=g-l,m=-2*d+3*f,p=d-f,v=1-m,M=p-f+h;for(let b=0;b!==o;b++){const P=a[_+b+o],T=a[_+b+c]*u,C=a[g+b+o],S=a[g+b]*u;s[b]=v*P+M*T+m*C+p*S}return s}}const w0=new yn;class A0 extends eh{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return w0.fromArray(s).normalize().toArray(s),s}}const qn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},_r={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},rl={9728:1003,9729:1006,9984:1004,9985:1007,9986:1005,9987:1008},sl={33071:1001,33648:1002,10497:1e3},Za={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ho={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Di={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},R0={CUBICSPLINE:void 0,LINEAR:2301,STEP:2300},Qa={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function C0(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Bi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),r.DefaultMaterial}function qi(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function bi(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function P0(r,e,t){let n=!1,i=!1,s=!1;for(let l=0,u=e.length;l<u;l++){const h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];if(n){const f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):r.attributes.position;a.push(f)}if(i){const f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):r.attributes.normal;o.push(f)}if(s){const f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):r.attributes.color;c.push(f)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],f=l[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=h),s&&(r.morphAttributes.color=f),r.morphTargetsRelative=!0,r})}function L0(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function D0(r){let e;const t=r.extensions&&r.extensions[Dt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+$a(t.attributes):e=r.indices+":"+$a(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+$a(r.targets[n]);return e}function $a(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function uo(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function I0(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const F0=new $e;class N0{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new i0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&a<98?this.textureLoader=new Xl(this.options.manager):this.textureLoader=new dg(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Wl(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return qi(s,o,i),bi(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,u]of a.children.entries())s(u,o.children[l])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Dt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,a){n.load(Zr.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=Za[i.type],o=_r[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new zt(l,a,c))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){const o=a[0],c=Za[i.type],l=_r[i.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(d&&d!==h){const p=Math.floor(f/d),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let M=t.cache.get(v);M||(_=new l(o,p*d,i.count*d/u),M=new Al(_,d/u),t.cache.add(v,M)),m=new es(M,c,f%d/u,g)}else o===null?_=new l(i.count*c):_=new l(o,f,i.count*c),m=new zt(_,c,g);if(i.sparse!==void 0){const p=Za.SCALAR,v=_r[i.sparse.indices.componentType],M=i.sparse.indices.byteOffset||0,b=i.sparse.values.byteOffset||0,P=new v(a[1],M,i.sparse.count*p),T=new l(a[2],b,i.sparse.count*c);o!==null&&(m=new zt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let C=0,S=P.length;C<S;C++){const x=P[C];if(m.setX(x,T[C*c]),c>=2&&m.setY(x,T[C*c+1]),c>=3&&m.setZ(x,T[C*c+2]),c>=4&&m.setW(x,T[C*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){const i=this,s=this.json,a=s.textures[e],o=s.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const f=(s.samplers||{})[a.sampler]||{};return u.magFilter=rl[f.magFilter]||1006,u.minFilter=rl[f.minFilter]||1008,u.wrapS=sl[f.wrapS]||1e3,u.wrapT=sl[f.wrapT]||1e3,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==1003&&u.minFilter!==1006,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=i.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(h){l=!0;const f=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(f),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(f,d){let g=f;t.isImageBitmapLoader===!0&&(g=function(_){const m=new an(_);m.needsUpdate=!0,f(m)}),t.load(Zr.resolveURL(h,s.path),g,void 0,d)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),bi(h,a),h.userData.mimeType=a.mimeType||I0(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[Dt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Dt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=s.associations.get(a);a=s.extensions[Dt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Il,Yn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Dl,Yn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),s&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Bi}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let a;const o={},c=s.extensions||{},l=[];if(c[Dt.KHR_MATERIALS_UNLIT]){const h=i[Dt.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,s,t))}else{const h=s.pbrMetallicRoughness||{};if(o.color=new Qe(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const f=h.baseColorFactor;o.color.setRGB(f[0],f[1],f[2],Cn),o.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",h.baseColorTexture,Ot)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=2);const u=s.alphaMode||Qa.OPAQUE;if(u===Qa.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Qa.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==dn&&(l.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new Be(1,1),s.normalTexture.scale!==void 0)){const h=s.normalTexture.scale;o.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&a!==dn&&(l.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==dn){const h=s.emissiveFactor;o.emissive=new Qe().setRGB(h[0],h[1],h[2],Cn)}return s.emissiveTexture!==void 0&&a!==dn&&l.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,Ot)),Promise.all(l).then(function(){const h=new a(o);return s.name&&(h.name=s.name),bi(h,s),t.associations.set(h,{materials:e}),s.extensions&&qi(i,h,s),h})}createUniqueName(e){const t=Vt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[Dt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return al(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],u=D0(l),h=i[u];if(h)a.push(h.promise);else{let f;l.extensions&&l.extensions[Dt.KHR_DRACO_MESH_COMPRESSION]?f=s(l):f=al(new qt,l,t),i[u]={primitive:l,promise:f},a.push(f)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const u=a[c].material===void 0?C0(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let d=0,g=u.length;d<g;d++){const _=u[d],m=a[d];let p;const v=l[d];if(m.mode===qn.TRIANGLES||m.mode===qn.TRIANGLE_STRIP||m.mode===qn.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new Nm(_,v):new Ye(_,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===qn.TRIANGLE_STRIP?p.geometry=jc(p.geometry,1):m.mode===qn.TRIANGLE_FAN&&(p.geometry=jc(p.geometry,2));else if(m.mode===qn.LINES)p=new Bm(_,v);else if(m.mode===qn.LINE_STRIP)p=new bo(_,v);else if(m.mode===qn.LINE_LOOP)p=new km(_,v);else if(m.mode===qn.POINTS)p=new zm(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&L0(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),bi(p,s),m.extensions&&qi(i,p,m),t.assignFinalMaterial(p),h.push(p)}for(let d=0,g=h.length;d<g;d++)t.associations.set(h[d],{meshes:e,primitives:d});if(h.length===1)return s.extensions&&qi(i,h[0],s),h[0];const f=new mt;s.extensions&&qi(i,f,s),t.associations.set(f,{meshes:e});for(let d=0,g=h.length;d<g;d++)f.add(h[d]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Nn(_h.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new ea(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),bi(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),a=i,o=[],c=[];for(let l=0,u=a.length;l<u;l++){const h=a[l];if(h){o.push(h);const f=new $e;s!==null&&f.fromArray(s.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new go(o,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let h=0,f=i.channels.length;h<f;h++){const d=i.channels[h],g=i.samplers[d.sampler],_=d.target,m=_.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,v=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",v)),l.push(g),u.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const f=h[0],d=h[1],g=h[2],_=h[3],m=h[4],p=[];for(let v=0,M=f.length;v<M;v++){const b=f[v],P=d[v],T=g[v],C=_[v],S=m[v];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();const x=n._createAnimationTracks(b,P,T,C,S);if(x)for(let y=0;y<x.length;y++)p.push(x[y])}return new ig(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),c]).then(function(l){const u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(f,F0)});for(let d=0,g=h.length;d<g;d++)u.add(h[d]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(s.isBone===!0?u=new Pl:l.length>1?u=new mt:l.length===1?u=l[0]:u=new $t,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(s.name&&(u.userData.name=s.name,u.name=a),bi(u,s),s.extensions&&qi(n,u,s),s.matrix!==void 0){const h=new $e;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new mt;n.name&&(s.name=i.createUniqueName(n.name)),bi(s,n),n.extensions&&qi(t,s,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++)s.add(c[u]);const l=u=>{const h=new Map;for(const[f,d]of i.associations)(f instanceof Yn||f instanceof an)&&h.set(f,d);return u.traverse(f=>{const d=i.associations.get(f);d!=null&&h.set(f,d)}),h};return i.associations=l(s),s})}_createAnimationTracks(e,t,n,i,s){const a=[],o=e.name?e.name:e.uuid,c=[];Di[s.path]===Di.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(o);let l;switch(Di[s.path]){case Di.weights:l=Mr;break;case Di.rotation:l=yr;break;case Di.position:case Di.scale:l=Sr;break;default:switch(n.itemSize){case 1:l=Mr;break;case 2:case 3:default:l=Sr;break}break}const u=i.interpolation!==void 0?R0[i.interpolation]:2301,h=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){const g=new l(c[f]+"."+Di[s.path],t.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=uo(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof yr?A0:eh;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function U0(r,e,t){const n=e.attributes,i=new Mn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new N(c[0],c[1],c[2]),new N(l[0],l[1],l[2])),o.normalized){const u=uo(_r[o.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const o=new N,c=new N;for(let l=0,u=s.length;l<u;l++){const h=s[l];if(h.POSITION!==void 0){const f=t.json.accessors[h.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){const _=uo(_r[f.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;const a=new ai;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function al(r,e,t){const n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(c){r.setAttribute(o,c)})}for(const a in n){const o=ho[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){const a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return It.workingColorSpace!==Cn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${It.workingColorSpace}" not supported.`),bi(r,e),U0(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?P0(r,e.targets,t):r})}var O0=(function(){var r="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var i=WebAssembly.validate(t)?e:r,s,a=WebAssembly.instantiate(o(i),{}).then(function(p){s=p.instance,s.exports.__wasm_call_ctors()});function o(p){for(var v=new Uint8Array(p.length),M=0;M<p.length;++M){var b=p.charCodeAt(M);v[M]=b>96?b-97:b>64?b-39:b+4}for(var P=0,M=0;M<p.length;++M)v[P++]=v[M]<60?n[v[M]]:(v[M]-60)*64+v[++M];return v.buffer.slice(0,P)}function c(p,v,M,b,P,T){var C=s.exports.sbrk,S=M+3&-4,x=C(S*b),y=C(P.length),R=new Uint8Array(s.exports.memory.buffer);R.set(P,y);var G=p(x,M,b,y,P.length);if(G==0&&T&&T(x,S,b),v.set(R.subarray(x,x+M*b)),C(x-C(0)),G!=0)throw new Error("Malformed buffer data: "+G)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},u={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},h=[],f=0;function d(p){var v={object:new Worker(p),pending:0,requests:{}};return v.object.onmessage=function(M){var b=M.data;v.pending-=b.count,v.requests[b.id][b.action](b.value),delete v.requests[b.id]},v}function g(p){for(var v="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(o(i))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+c.toString()+m.toString(),M=new Blob([v],{type:"text/javascript"}),b=URL.createObjectURL(M),P=0;P<p;++P)h[P]=d(b);URL.revokeObjectURL(b)}function _(p,v,M,b,P){for(var T=h[0],C=1;C<h.length;++C)h[C].pending<T.pending&&(T=h[C]);return new Promise(function(S,x){var y=new Uint8Array(M),R=f++;T.pending+=p,T.requests[R]={resolve:S,reject:x},T.object.postMessage({id:R,count:p,size:v,source:y,mode:b,filter:P},[y.buffer])})}function m(p){a.then(function(){var v=p.data;try{var M=new Uint8Array(v.count*v.size);c(s.exports[v.mode],M,v.count,v.size,v.source,s.exports[v.filter]),self.postMessage({id:v.id,count:v.count,action:"resolve",value:M},[M.buffer])}catch(b){self.postMessage({id:v.id,count:v.count,action:"reject",value:b})}})}return{ready:a,supported:!0,useWorkers:function(p){g(p)},decodeVertexBuffer:function(p,v,M,b,P){c(s.exports.meshopt_decodeVertexBuffer,p,v,M,b,s.exports[l[P]])},decodeIndexBuffer:function(p,v,M,b){c(s.exports.meshopt_decodeIndexBuffer,p,v,M,b)},decodeIndexSequence:function(p,v,M,b){c(s.exports.meshopt_decodeIndexSequence,p,v,M,b)},decodeGltfBuffer:function(p,v,M,b,P,T){c(s.exports[u[P]],p,v,M,b,s.exports[l[T]])},decodeGltfBufferAsync:function(p,v,M,b,P){return h.length>0?_(p,v,M,u[b],l[P]):a.then(function(){var T=new Uint8Array(p*v);return c(s.exports[u[b]],T,p,v,M,s.exports[l[P]]),T})}}})();const eo=1.69,ol=160,to=32,cl="#fff1d6",ll="#fffaf0",hl="#b8ad94";function V0(r,e){let t;try{t=new Dm({canvas:r,antialias:!0,alpha:!1,powerPreference:"high-performance"}),t.localClippingEnabled=!0}catch{return null}if(!t.getContext())return null;let n=0;const i=Vl,s=(L,q,X)=>{n=X-q};i.onStart=i.onProgress=s,t.outputColorSpace=Ot,t.shadowMap.enabled=!0,t.shadowMap.type=2;const a=new Qe().setRGB(e.haze.colour[0]/255,e.haze.colour[1]/255,e.haze.colour[2]/255,Ot),o=new yc;o.background=a.clone();const c=Zc(),l=new mt;l.scale.y=fn,o.add(l);const u=new Gc(ll,hl,1.55);o.add(u);const h=new ao(cl,2.1),f=e.sun.reach,d=new N(-e.sun.x*f,1/fn,-e.sun.z*f).normalize();h.castShadow=!0,h.shadow.mapSize.set(2048,2048),h.shadow.bias=-4e-4,h.shadow.normalBias=.03,Object.assign(h.shadow.camera,{left:-44,right:44,top:44,bottom:-44,near:1,far:260}),o.add(h,h.target);const g={hazeColour:{value:a},hazeX:{value:new Ft(...e.haze.ramp.west,...e.haze.ramp.east)},hazeZ:{value:new Ft(...e.haze.ramp.north,...e.haze.ramp.south)}},_=new Map;function m(L,q={}){const X=L+JSON.stringify(q);if(_.has(X))return _.get(X);const se=p(L,q);return _.set(X,se),se}function p(L,q={}){return v(new vn({color:L,...q}))}function v(L){return L.onBeforeCompile=q=>{Object.assign(q.uniforms,g),q.vertexShader=`varying vec3 vHazeWorld;
`+q.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        vec4 hazeLocal = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          hazeLocal = instanceMatrix * hazeLocal;
        #endif
        vHazeWorld = (modelMatrix * hazeLocal).xyz;`),q.fragmentShader=`varying vec3 vHazeWorld;
uniform vec3 hazeColour;
uniform vec4 hazeX;
uniform vec4 hazeZ;
`+q.fragmentShader.replace("#include <dithering_fragment>",`
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
        #include <dithering_fragment>`)},L.customProgramCacheKey=()=>"haze",L}const M={},b=new Xl;function P(L){const q=(e.floorTextures||{})[L];return q?(M[L]||(M[L]=b.load(new URL(q.url,document.baseURI).href),M[L].colorSpace=Ot,M[L].wrapS=M[L].wrapT=1e3,M[L].anisotropy=8),{base:M[L],size:q.size}):null}function T(L,q){const X=P(q);if(!X)return L;const se=X.base.clone(),ae=L.scale.x,Se=L.scale.z;return se.repeat.set(ae/X.size,Se/X.size),se.offset.set((L.position.x-ae/2)/X.size,-(L.position.z+Se/2)/X.size),L.material=p("#ffffff",{map:se}),L}const C=new Zt(1,1,1).translate(0,.5,0);function S(L,q,X,se,ae,Se,De,U,{cast:B=!0,receive:ce=!0,opts:O}={}){const ue=new Ye(C,m(U,O));return ue.position.set(q,X,se),ue.scale.set(ae,Se,De),ue.castShadow=B,ue.receiveShadow=ce,L.add(ue),ue}function x(L,q,X,se,ae,Se,De,U,B){return S(L,(q+X)/2,se,(Se+De)/2,Math.max(.001,X-q),Math.max(.001,ae-se),Math.max(.001,De-Se),U,B)}const y=new n0().setMeshoptDecoder(O0),R=y.load.bind(y),G=[];let k=0;function K(){k=0;const L=performance.now()+6;do{const q=G.shift();try{q()}catch(X){console.warn("3D map: model setup failed",X)}}while(G.length&&performance.now()<L);G.length&&(k=requestAnimationFrame(K))}y.load=(L,q,X,se)=>R(L,ae=>{ae.scene.userData.file=L.split("/").pop(),G.push(()=>q(ae)),k||(k=requestAnimationFrame(K))},X,se);function oe(L,q,X,se,ae,Se=l){y.load(e.modelBase+L,De=>{Ee(De.scene);const U=new mt;U.add(De.scene),U.scale.set(eo,eo/fn,eo),U.position.set(q,X,se),Se.add(U),ae&&ae(De.scene,U),Ji(De.scene)},void 0,De=>console.warn("3D map: could not load "+L,De))}const D=[],Y=B0(l,e,{box:S,span:x,material:m,textured:T,lampStandIns:D});z0(l,e,{box:S,span:x,material:m,textured:T,model:oe});const H=G0(o,l,e.transport,{box:S,material:m}),he=Tg(l,e,{box:S,span:x,material:m,model:oe}),Z=Dg(l,e,{box:S,span:x,material:m});Ng(l,e,{span:x,model:oe});let te=0;const Te=[],Pe=new Ye(new So(.86,1,48).rotateX(-Math.PI/2),new dn({color:"#e2c68a",transparent:!0,opacity:.85,depthWrite:!1}));Pe.renderOrder=2,l.add(Pe);const re=["#d8cfbd","#b8cdb2","#9cc4b8","#e2c68a"];function xe(L){if(!Te[L]){const q=new mt,X=S(q,0,0,0,1,1,1,re[1]),se=S(q,0,1,0,1,.08,1,"#efe7d4");q.userData={body:X,top:se},l.add(q),Te[L]=q}return Te[L]}const Ne={};function Ee(L){L.traverse(q=>{if(!q.isMesh)return;q.castShadow=q.receiveShadow=!0;const X=q.material;X&&X.transmission>0&&(q.material=new Bi({color:X.color,roughness:.1,metalness:0,transparent:!0,opacity:.28,depthWrite:!1}),q.castShadow=!1)})}function et(L){const q=new N,X=new N,se=new N;L.traverse(ae=>{if(!ae.isMesh||!/^Sign(Border)?$/.test(ae.name))return;const Se=ae.geometry,De=Se.attributes.position,U=Se.index;if(!U)return;let B=0;for(let O=0;O<U.count;O+=3)q.fromBufferAttribute(De,U.getX(O)),X.fromBufferAttribute(De,U.getX(O+1)),se.fromBufferAttribute(De,U.getX(O+2)),B+=q.dot(X.cross(se));if(B>=0)return;for(let O=0;O<U.count;O+=3){const ue=U.getX(O+1);U.setX(O+1,U.getX(O+2)),U.setX(O+2,ue)}const ce=Se.attributes.normal;if(ce)for(let O=0;O<ce.count;O++)ce.setXYZ(O,-ce.getX(O),-ce.getY(O),-ce.getZ(O))})}function nt(L){L.traverse(q=>{const X=q.isMesh&&q.material;X&&X.metalness>.5&&(X.metalness=.35,X.roughness=Math.max(.35,X.roughness))})}Z&&Z.loadModels(y,e.modelBase),H&&H.loadModels(y,e.modelBase);const ot={},Mt=[],ut=[],_t={};(e.fixtures||[]).forEach(L=>{y.load(e.modelBase+L.file,q=>{Ee(q.scene),(L.hide||[]).forEach(se=>{const ae=q.scene.getObjectByName(se);ae&&(ae.visible=!1)}),L.glow&&q.scene.traverse(se=>{const ae=se.isMesh&&se.material;ae&&ae.name===L.glow&&!Mt.includes(ae)&&(ae.emissive.set("#ffe3b0"),Mt.push(ae))}),L.screen&&q.scene.traverse(se=>{const ae=se.isMesh&&se.material;ae&&ae.name===L.screen&&!ut.includes(ae)&&(ae.emissive.set("#ffffff"),ae.emissiveMap=ae.map,ae.needsUpdate=!0,ut.push(ae))}),L.menu&&q.scene.traverse(se=>{const ae=se.isMesh&&se.material;ae&&ae.name===L.screen&&!_t[L.key]&&(_t[L.key]=J(ae))}),Ji(q.scene);const X=new mt;X.add(q.scene),X.scale.set(L.scale,L.scale/fn,L.scale),X.position.set(L.x,L.y,L.z),X.visible=!1,l.add(X),ot[L.key]=X},void 0,q=>console.warn("3D map: could not load "+L.file,q))});function J(L){const q=document.createElement("canvas");q.width=Zi*Js,q.height=ts*Js;const X=new ti(q);return X.flipY=!1,X.colorSpace=Ot,{material:L,base:L.map,texture:X,ctx:q.getContext("2d"),key:"",paidAt:null}}function Gt(L,q,X){const se=L.material,ae=q!=null&&q>=0;ae&&q>=lo&&L.paidAt==null&&(L.paidAt=X),ae&&q<lo&&(L.paidAt=null);const Se=L.paidAt==null?null:X-L.paidAt;!ae&&Se!=null&&(Se>Yg||Se<0)&&(L.paidAt=null);const De=ae||L.paidAt!=null;if(De){const B=Zg(ae?q:1,X,L.paidAt==null?null:Se);B.key!==L.key&&(t0(L.ctx,B),L.texture.needsUpdate=!0,L.key=B.key)}const U=De?L.texture:L.base;se.map!==U&&(se.map=se.emissiveMap=U),De&&(se.emissiveIntensity+=.2)}const ft={};function ht(L){const q=(e.stationModels||{})[L];!q||ft[L]||(ft[L]=!0,y.load(e.modelBase+q,X=>{const se=X.scene,ae=new Mn().setFromObject(se),Se=ae.getSize(new N),De=ae.getCenter(new N),U=e.stationModelSize[L]||{w:Se.x+Se.z,ox:0},B=U.w/((Se.x+Se.z)*Math.SQRT1_2);se.position.set(-De.x,-ae.min.y,-De.z),Ee(se),et(se),nt(se),Xg(se,+L.split(".")[0]),Ji(se);const ce=new mt;ce.add(se),ce.scale.set(B,B/fn,B),ce.position.set(U.ox*Math.SQRT1_2,0,-U.ox*Math.SQRT1_2),U.turn&&(ce.rotation.y=U.turn),Ne[L]=ce},void 0,X=>console.warn("3D map: could not load "+q,X)))}const Je={},At=Zc(),Ke=new yc;Ke.add(new Gc(ll,hl,1.7));const I=new ao(cl,2.1);I.position.copy(d).multiplyScalar(50),Ke.add(I);function w(L){return Je[L]?Je[L]:Ne[L]?Je[L]=ye(Ne[L].clone(),480,600):(ht(L),null)}function $(L,q){L=Math.min(8,Math.max(1,L||1));const X="lounge."+L+"."+(q?2:1);if(Je[X])return Je[X];const se=Z&&Z.pictureCopy(L,q);return se?Je[X]=ye(se,600,480):null}function ve(L){if(Je["fixture."+L])return Je["fixture."+L];if(!ot[L])return null;const q=ot[L].clone();return q.visible=!0,Je["fixture."+L]=ye(q,600,480)}function ye(L,q,X){const se=new mt;se.scale.y=fn,se.add(L),Ke.add(se),se.updateMatrixWorld(!0);const ae=new Mn().setFromObject(se),Se=[];for(let le=0;le<8;le++)Se.push(new N(le&1?ae.max.x:ae.min.x,le&2?ae.max.y:ae.min.y,le&4?ae.max.z:ae.min.z));At.updateMatrixWorld(!0);const De=At.matrixWorldInverse,U=[],B=[];Se.forEach(le=>{le.applyMatrix4(De),U.push(le.x),B.push(le.y)});const ce=(Math.min(...U)+Math.max(...U))/2,O=(Math.min(...B)+Math.max(...B))/2,ue=Math.max((Math.max(...U)-Math.min(...U))/2/q*X,(Math.max(...B)-Math.min(...B))/2)*1.04;At.left=ce-ue*q/X,At.right=ce+ue*q/X,At.top=O+ue,At.bottom=O-ue,At.updateProjectionMatrix();const A=new Ui(q,X,{samples:4});A.texture.colorSpace=Ot;const F=t.getClearColor(new Qe),V=t.getClearAlpha(),Q=t.shadowMap.enabled;t.shadowMap.enabled=!1,t.setRenderTarget(A),t.setClearColor(0,0),t.clear(),t.render(Ke,At);const _e=new Uint8Array(q*X*4);t.readRenderTargetPixels(A,0,0,q,X,_e),t.setRenderTarget(null),t.setClearColor(F,V),t.shadowMap.enabled=Q,A.dispose(),Ke.remove(se);const ge=document.createElement("canvas");ge.width=q,ge.height=X;const be=ge.getContext("2d"),pe=be.createImageData(q,X);for(let le=0;le<X;le++)pe.data.set(_e.subarray((X-1-le)*q*4,(X-le)*q*4),le*q*4);return be.putImageData(pe,0,0),ge}const de=new Mo(.24,1.55,4,10).translate(0,1.03,0),Fe=new Un(de,m("#ffffff",{name:"people"}),ol);Fe.castShadow=!0,Fe.count=0;const Ce=new Map,Le=[],St=new zt(new Uint16Array([0,1,2,0,2,3]),1),Ae=8e3;let ne=0,tt=0;function rt(L){let q=Ce.get(L);return q||(q=new an(L),q.colorSpace=Ot,q.anisotropy=4,q.needsUpdate=!0,Ce.set(L,q)),q.userData.used=tt,q}function Ge(){tt-ne<2e3||(ne=tt,Ce.forEach((L,q)=>{tt-L.userData.used>Ae&&(L.dispose(),Ce.delete(q))}))}const pt=[];function xt(L){if(!pt[L]){const q=new qt;q.setAttribute("position",new zt(new Float32Array(12),3)),q.setAttribute("uv",new zt(new Float32Array(8),2)),q.setIndex(St);const X=new Ye(q,v(new dn({alphaTest:.5,side:2,depthTest:!1,depthWrite:!1})));X.frustumCulled=!1,X.renderOrder=-1,l.add(X),pt[L]=X}return pt[L]}function Bt(L){if(!Le[L]){const q=new qt;q.setAttribute("position",new zt(new Float32Array(12),3)),q.setAttribute("uv",new zt(new Float32Array(8),2)),q.setIndex(St);const X=new Ye(q,v(new dn({alphaTest:.5,side:2})));X.frustumCulled=!1,l.add(X),Le[L]=X}return Le[L]}const j=[],Ie=[];function fe(L,q,X){const se=new qt;se.setAttribute("position",new zt(new Float32Array(12),3)),se.setAttribute("uv",new zt(new Float32Array(8),2)),se.setIndex(St);const ae={alphaTest:.5,side:2},Se=v(q?new vn({...ae,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}):new dn(ae)),De=new Ye(se,Se);return De.visible=!1,De.frustumCulled=!1,De.receiveShadow=q,l.add(De),b.load(new URL(L,document.baseURI).href,U=>{U.colorSpace=Ot,U.anisotropy=8;const[B,ce]=X(U.image);se.attributes.position.array.set(B),se.attributes.position.needsUpdate=!0,se.attributes.uv.array.set(ce),se.attributes.uv.needsUpdate=!0,se.computeVertexNormals(),Se.map=U,Se.needsUpdate=!0,De.userData.ready=!0},void 0,()=>console.warn("3D map: could not load "+L)),De}(e.wallFaces||[]).forEach(L=>{const q=fe(L.url,!1,()=>[[L.x0,L.y0,L.z0,L.x1,L.y0,L.z1,L.x1,L.y0+L.h,L.z1,L.x0,L.y0+L.h,L.z0],[0,0,1,0,1,1,0,1]]);q.userData.model=L.model,j.push(q)}),(e.decals||[]).forEach(L=>{const q=fe(L.url,!0,X=>{const se=L.pixels?L.image.map(([_e,ge])=>[_e/X.naturalWidth,ge/X.naturalHeight]):L.image,[ae,Se,De]=se,[U,B,ce]=L.world,O=Se[0]-ae[0],ue=De[0]-ae[0],A=Se[1]-ae[1],F=De[1]-ae[1],V=O*F-ue*A,Q=(_e,ge)=>{const be=_e-ae[0],pe=ge-ae[1],le=(F*be-ue*pe)/V,we=(O*pe-A*be)/V;return[U[0]+(B[0]-U[0])*le+(ce[0]-U[0])*we,.012,U[1]+(B[1]-U[1])*le+(ce[1]-U[1])*we]};return[[...Q(0,1),...Q(1,1),...Q(1,0),...Q(0,0)],[0,0,1,0,1,1,0,1]]});q.userData.show=L.show,Ie.push(q)}),(e.casters||[]).forEach(L=>S(l,L.x,0,L.z,L.w,L.h,L.d,"#ffffff",{receive:!1,opts:{name:"street"}}));const me=new mt;l.add(me);let Ue="";function ke(L){me.children.forEach(X=>X.geometry.dispose()),me.clear();const q=new Set;L.forEach(X=>{const se=new na(X.points.map(Se=>new N(Se[0],Se[1],Se[2]))),ae=new Ye(new wr(se,20,.045,8,!1),m(X.colour));ae.castShadow=!0,me.add(ae),[X.points[0],X.points[X.points.length-1]].forEach(Se=>{const De=Se[0].toFixed(2)+","+Se[2].toFixed(2);if(q.has(De))return;q.add(De);const U=new Ye(C.clone(),m("#ffffff",{name:"street"}));U.position.set(Se[0],0,Se[2]),U.scale.set(.07,1,.07),U.castShadow=!0,me.add(U)})})}Fe.instanceMatrix.setUsage(35048),l.add(Fe);const He=new Un(C,m("#ffffff",{name:"street"}),to),Nt=new Un(C,m("#dfe8ea",{name:"street"}),to);[He,Nt].forEach(L=>{L.castShadow=!0,L.count=0,L.instanceMatrix.setUsage(35048),l.add(L)});const kt=1.69,Rt=new N(0,0,1),rn=new yn,en={},Sn=[];Object.entries(e.carModels||{}).forEach(([L,q])=>y.load(e.modelBase+q,X=>{Ee(X.scene),Ji(X.scene);const se=X.scene.getObjectByName("WheelFL");en[L]={scene:X.scene,radius:se?new Mn().setFromObject(se).getSize(new N).y/2:.25}},void 0,X=>console.warn("3D map: could not load "+q,X)));const Jn=160,Xt={},Pn={},pn=new Set;function yi(L){L.updateMatrixWorld(!0);const q=new Map;L.traverse(se=>{if(!se.isMesh)return;let ae=se.geometry.index?se.geometry.toNonIndexed():se.geometry.clone();ae.applyMatrix4(se.matrixWorld),se.matrixWorld.determinant()<0&&Object.values(ae.attributes).forEach(Se=>{for(let De=0;De<Se.count;De+=3)for(let U=0;U<Se.itemSize;U++){const B=Se.getComponent(De+1,U);Se.setComponent(De+1,U,Se.getComponent(De+2,U)),Se.setComponent(De+2,U,B)}}),Object.keys(ae.attributes).forEach(Se=>{Se!=="position"&&Se!=="normal"&&Se!=="uv"&&Se!=="color"&&ae.deleteAttribute(Se)}),ae.attributes.normal||ae.computeVertexNormals(),q.has(se.material)||q.set(se.material,[]),q.get(se.material).push(ae)});const X=[...q].map(([se,ae])=>{["uv","color"].forEach(De=>{ae.some(U=>!U.attributes[De])&&ae.forEach(U=>U.deleteAttribute(De))}),/Paint$/.test(se.name)&&(se.userData.paint=se.color.clone(),se.color.set("#ffffff"));const Se=new Un(Pr(ae),v(se),Jn);return Se.count=0,Se.castShadow=Se.receiveShadow=!0,Se.frustumCulled=!1,Se.userData.file=L.userData.file,Se.userData.prop=!0,l.add(Se),Se});return X.box=new Mn().setFromObject(L),X}function On(L){if(!Pn[L]){Pn[L]=!0;const[q,X]=L.split("#");y.load(e.modelBase+q,se=>{if(Ee(se.scene),X==="low"||X==="lawn"){const ae=[],Se=X==="low"?/^(Crown|Trunk)/:/^Pit/;se.scene.traverse(De=>{Se.test(De.name)&&ae.push(De)}),ae.forEach(De=>De.parent&&De.parent.remove(De))}se.scene.traverse(ae=>{ae.isMesh&&ae.material.name==="LampGlow"&&pn.add(ae.material)}),nt(se.scene),Xt[L]=yi(se.scene)},void 0,se=>console.warn("3D map: could not load "+L,se))}return!!Xt[L]}const En=new N(kt,kt/fn,kt),on=new yn,Xn=new N(0,1,0),Tn=new N;function mn(L,q){Object.values(Xt).forEach(X=>X.forEach(se=>{se.count=0})),(L||[]).forEach(X=>{const se=Xt[X.file];if(!(!se||se[0].count>=Jn)){if(on.setFromAxisAngle(Xn,X.rot||0),W.set(X.x,X.y===void 0?e.plazaY:X.y,X.z),Array.isArray(X.scale))E.compose(W,on,Tn.set(En.x*X.scale[0],En.y*X.scale[1],En.z*X.scale[2]));else if(X.scale)E.compose(W,on,Tn.copy(En).multiplyScalar(X.scale));else if(X.fit){const ae=se.box,Se=X.fit.w/(ae.max.x-ae.min.x),De=X.fit.d/(ae.max.z-ae.min.z);W.x-=(ae.min.x+ae.max.x)/2*Se,W.z-=(ae.min.z+ae.max.z)/2*De,E.compose(W,on,Tn.set(Se,Se/fn,De))}else E.compose(W,on,En);se.forEach(ae=>{ae.material.userData.paint&&ae.setColorAt(ae.count,X.tint?z.set(X.tint):ae.material.userData.paint),ae.setMatrixAt(ae.count++,E)})}}),Object.values(Xt).forEach(X=>X.forEach(se=>{se.instanceMatrix.needsUpdate=!0,se.instanceColor&&(se.instanceColor.needsUpdate=!0),se.visible=se.count>0})),pn.forEach(X=>{X.emissive.set("#ffd9a0"),X.emissiveIntensity=q*2.5})}const it=()=>!!e.carModels&&Object.keys(e.carModels).every(L=>en[L]);function Si(L,q){const X=q.van?"van":"car",se=en[X];let ae=Sn[L];if(ae&&ae.kind===X&&ae.paint===q.paint)return ae;ae&&l.remove(ae.holder);const Se=new mt,De=se.scene.clone(!0);De.traverse(B=>{B.isMesh&&/Paint$/.test(B.material.name)&&(B.material=B.material.clone(),B.material.color.set(q.paint))}),Se.add(De),Se.scale.set(kt,kt/fn,kt),l.add(Se);const U=["WheelFL","WheelFR","WheelBL","WheelBR"].map(B=>De.getObjectByName(B)).filter(Boolean).map(B=>({w:B,rest:B.quaternion.clone()}));return Sn[L]={kind:X,paint:q.paint,holder:Se,wheels:U,radius:se.radius}}const E=new $e,W=new N,ie=new N,ee=new yn,z=new Qe,Re=u.intensity,Me=h.intensity,Ve=new Qe("#2b3a48"),Ze=a.clone();let st=!1;r.addEventListener("webglcontextlost",L=>{L.preventDefault(),st=!0}),r.addEventListener("webglcontextrestored",()=>{st=!1});let gt=1;const ze=(L,q)=>{const X=q.geometry,se=X.attributes.position,ae=X.attributes.uv,[Se,De,U,B]=L.uv;se.array.set(L.points),se.needsUpdate=!0,ae.array.set([Se,De,U,De,U,B,Se,B]),ae.needsUpdate=!0;const ce=q.material,O=rt(L.img),ue=L.alpha<1;ce.map!==O&&(ce.map||(ce.needsUpdate=!0),ce.map=O),ce.transparent!==ue&&(ce.transparent=ue,ce.needsUpdate=!0),ce.opacity=L.alpha,ce.color.setScalar(gt),q.visible=!0};function dt(L,q){gt=1-q*.55,L.forEach((X,se)=>ze(X,Bt(se)));for(let X=L.length;X<Le.length;X++)Le[X].visible=!1}function ct(L,q){tt=performance.now(),Ge();const X=Math.min(L.dpr,2);t.getPixelRatio()!==X&&t.setPixelRatio(X);const se=t.getSize(new Be);(se.x!==L.width||se.y!==L.height)&&t.setSize(L.width,L.height,!1),wg(c,L);const ae=L.lookAt||{x:0,z:0};h.target.position.set(ae.x,0,ae.z),h.position.copy(h.target.position).addScaledVector(d,120),h.target.updateMatrixWorld();const Se=L.night||0;return u.intensity=Re*(1-Se*.72),h.intensity=Me*(1-Se*.9),o.background.copy(q).lerp(Ve,Se),g.hazeColour.value.copy(o.background),Se}const at=kg(l),Tt=[],Lt=new Qe,qe={},bt=[g.hazeX.value.clone(),g.hazeZ.value.clone()];let vt=!1,yt=null;function tn(L){if(L!==vt){if(vt=L,L){const q=new Set([l,u,h,h.target,at.group,...Le]);[...o.children,...l.children].forEach(X=>{!q.has(X)&&!X.userData.prop&&!X.userData.land&&X.visible&&(X.visible=!1,Tt.push(X))}),pt.forEach(X=>{X.visible=!1})}else Tt.forEach(q=>{q.visible=!0}),Tt.length=0,yt&&(yt.visible=!1),yt=null,g.hazeX.value.copy(bt[0]),g.hazeZ.value.copy(bt[1]);at.group.visible=L}}const Kt=90,Ln=2,Ct=13;function Ut(L,[q,X,se,ae]){const Se=[];return L.forEach(([De,U,B,ce])=>{if(q>=U||X<=De||se>=ce||ae<=B){Se.push([De,U,B,ce]);return}se>B&&Se.push([De,U,B,se]),ae<ce&&Se.push([De,U,ae,ce]);const O=Math.max(B,se),ue=Math.min(ce,ae);q>De&&Se.push([De,q,O,ue]),X<U&&Se.push([X,U,O,ue])}),Se}function wn(L){const q=new mt,[X,se,ae,Se]=L.plot,De=(X+se)/2,U=(ae+Se)/2,B=Kt;q.userData.land=!0;let ce=Ut([[De-B,De+B,U-B,U+B]],L.plot);const O=L.strips||[],ue=O.map(F=>[F.x0===void 0?De-B:F.x0,F.x1===void 0?De+B:F.x1,F.z0===void 0?U-B:F.z0,F.z1===void 0?U+B:F.z1]);ue.forEach(F=>{ce=Ut(ce,F)}),ce.forEach(([F,V,Q,_e])=>x(q,F,V,L.y-1.2,L.y,Q,_e,L.colour,{cast:!1})),O.forEach((F,V)=>Ut([ue[V]],L.plot).forEach(([Q,_e,ge,be])=>x(q,Q,_e,L.y-1.2,F.y,ge,be,F.colour,{cast:!1})));const A=[];if(L.trees){let F=7;const V=()=>(F=F*16807%2147483647)/2147483647;for(let Q=0;Q<64;Q++){const _e=Q%4,ge=_e===1||_e===3,be=V(),pe=ge?7.5+V()*4:2+V()*8,le=_e===0?X-pe:_e===1?se+pe:X-8+be*(se-X+16),we=_e===2?ae-pe:_e===3?Se+pe:ae-8+be*(Se-ae+16);le>X-1.5&&le<se+1.5&&we>ae-1.5&&we<Se+1.5||le>se&&we>Se-4||we>Se&&le>se-4||ue.some(([Oe,Xe,je,lt])=>le>Oe-1.6&&le<Xe+1.6&&we>je-1.6&&we<lt+1.6)||A.push({file:Q%3?"tree.glb#lawn":"street_tree.glb#lawn",x:le,y:L.y,z:we,rot:V()*6.28,scale:(ge?.6:.75)+V()*.35})}}if(L.town){const F=["building_rowhouse_terracotta","building_townhouse_sage","building_low_stone","building_mid_stone","building_apartment_brick","building_shop_narrow","building_low_tan","building_corner"];let V=0;for(let Q=X+4;Q<se+4;Q+=10.5)A.push({file:F[V++%F.length]+".glb",x:Q,y:L.y,z:ae-6.5,rot:0});for(let Q=ae+2;Q<Se+2;Q+=10.5)A.push({file:F[V++%F.length]+".glb",x:X-6.5,y:L.y,z:Q,rot:Math.PI/2});A.push({file:"building_corner.glb",x:X-6.5,y:L.y,z:ae-6.5,rot:Math.PI/4})}return q.userData.props=A,q.userData.haze=[new Ft(X-Ln,X-Ct,se+Ln,se+Ct),new Ft(ae-Ln,ae-Ct,Se+Ln,Se+Ct)],l.add(q),q}function nn(L){if(st)return!1;tn(!0);const q=L.land?qe[L.landKey]||(qe[L.landKey]=wn(L.land)):null;q!==yt&&(yt&&(yt.visible=!1),yt=q,yt&&(yt.visible=!0,g.hazeX.value.copy(yt.userData.haze[0]),g.hazeZ.value.copy(yt.userData.haze[1])));const X=ct(L,yt?Ze:Lt.set(L.background));at.update(L.branch,X);const se=(L.branch.props||[]).concat(yt?yt.userData.props:[]);return se.forEach(ae=>On(ae.file)),mn(se,X),dt(L.figures||[],X),L.dry||t.render(o,c),!0}function gn(L){if(st)return!1;tn(!1);const q=ct(L,Ze),X=performance.now(),se=Math.min(.1,(X-(te||X))/1e3);te=X;let ae=!1;L.stations.forEach((O,ue)=>{const A=xe(ue),{body:F,top:V}=A.userData;if(A.visible=O.visible!==!1,!A.visible)return;const Q=O.index+"."+Math.max(1,O.tier);O.built&&(ht(Q),ht(O.index+".3"));const _e=Ne[Q]?Q:O.index+".3",ge=O.built&&O.index!==void 0&&Ne[_e],be=A.userData.clones||(A.userData.clones={}),pe=A.userData.rigs||(A.userData.rigs={});ge&&!be[_e]&&(A.add(be[_e]=ge.clone()),pe[_e]=jg(be[_e],O.index)),ge&&pe[_e]&&Kg(pe[_e],O,se),Object.entries(be).forEach(([lt,Yt])=>{Yt.visible=!!ge&&lt===_e}),F.visible=!ge;const le=O.built?O.h:.12,we=O.rise?-O.rise*O.rise*1.1:0;A.position.set(O.x,O.y+we,O.z);const Oe=O.pop===void 0?1:O.pop,Xe=Oe-1,je=Oe>=1?1:1+2.4*Xe*Xe*Xe+1.4*Xe*Xe;if(A.scale.setScalar(Math.max(.001,je)),Oe<=0&&(A.visible=!1),F.scale.set(O.w,le,O.d),V.visible=O.built&&!ge,V.position.y=le,V.scale.set(O.w+.12,.08,O.d+.12),F.material=m(O.built?re[Math.min(3,O.tier)]:"#e3b04b"),O.selected&&!ae&&Oe>=1){ae=!0,Pe.position.set(O.x,O.y+.03,O.z);const lt=Math.max(O.w,O.d)*.72;Pe.scale.set(lt,1,lt)}}),Pe.visible=ae;const Se=L.figures||[],De=1-q*.55;dt(Se,q),j.forEach(O=>{O.visible=!!O.userData.ready&&!(O.userData.model&&ot[O.userData.model]),O.material.color.setScalar(De)}),Ie.forEach(O=>{O.visible=O.userData.ready&&(O.userData.show!=="loungeOpen"||!!L.loungeOpen)});const U=JSON.stringify(L.ropes||[]);U!==Ue&&(Ue=U,ke(L.ropes||[]));const B=L.backdrops||[];B.forEach((O,ue)=>ze(O,xt(ue)));for(let O=B.length;O<pt.length;O++)pt[O].visible=!1;Y.forEach(O=>{O.visible=!Xt[O.userData.model],O.renderOrder=L.backdrops?-2:0,O.material.colorWrite=!L.backdrops}),Fe.material.colorWrite=Fe.material.depthWrite=!L.figures,_.forEach((O,ue)=>{ue.endsWith('{"name":"street"}')&&(O.colorWrite=O.depthWrite=!L.figures)}),Fe.count=Math.min(ol,L.people.length);for(let O=0;O<Fe.count;O++){const ue=L.people[O];W.set(ue.x,ue.y||0,ue.z),ie.set(1,1,1),E.compose(W,ee.identity(),ie),Fe.setMatrixAt(O,E),Fe.setColorAt(O,z.set(ue.colour))}Fe.instanceMatrix.needsUpdate=!0,Fe.instanceColor&&(Fe.instanceColor.needsUpdate=!0),mn(L.props,q),Mt.forEach(O=>{O.emissiveIntensity=.16+q*.7}),ut.forEach(O=>{O.emissiveIntensity=.35+q*.55}),Object.entries(_t).forEach(([O,ue])=>Gt(ue,L.menus?L.menus[O]:null,L.menuClock||0)),D.forEach(O=>{O.visible=!Xt["street_lamp.glb"]});const ce=it();L.cars.forEach((O,ue)=>{if(!ce)return;const A=Si(ue,O),F=O.along==="x";A.holder.visible=!0,A.holder.position.set(O.x,e.streetY,O.z),A.holder.rotation.y=F?O.dir>0?0:Math.PI:O.dir>0?-Math.PI/2:Math.PI/2,rn.setFromAxisAngle(Rt,-O.roll/(A.radius*kt)),A.wheels.forEach(({w:V,rest:Q})=>V.quaternion.multiplyQuaternions(rn,Q))});for(let O=ce?L.cars.length:0;O<Sn.length;O++)Sn[O]&&(Sn[O].holder.visible=!1);He.count=Nt.count=ce?0:Math.min(to,L.cars.length);for(let O=0;O<He.count;O++){const ue=L.cars[O],A=ue.along==="x",F=ue.van,V=F?4.6:4,Q=1.8;W.set(ue.x,e.streetY+.25,ue.z),ie.set(A?V:Q,F?1.7:.75,A?Q:V),He.setMatrixAt(O,E.compose(W,ee.identity(),ie)),He.setColorAt(O,z.set(ue.paint)),W.y+=F?1.7:.75,ie.set(A?F?1.4:2.1:Q*.86,F?.05:.55,A?Q*.86:F?1.4:2.1),Nt.setMatrixAt(O,E.compose(W,ee.identity(),ie))}return[He,Nt].forEach(O=>{O.instanceMatrix.needsUpdate=!0,O.instanceColor&&(O.instanceColor.needsUpdate=!0)}),H&&L.cargo&&H.update(L.cargo,L.fixtures),he&&he.update(L),Z&&Z.update(L),Object.entries(ot).forEach(([O,ue])=>{ue.visible=!!(L.fixtures&&L.fixtures[O])}),L.dry||t.render(o,c),!0}function Dn(L){const q=t.info,X=new Set,se=new Set,ae={};let Se=0,De=0;o.traverse(V=>{if(!V.isMesh)return;Se++;let Q=!0,_e=null;for(let ge=V;ge;ge=ge.parent)ge.visible||(Q=!1),!_e&&ge.userData.file&&(_e=ge.userData.file);if(Q&&(De++,L)){const ge=ae[_e||"(code)"]=ae[_e||"(code)"]||{meshes:0,triangles:0},be=V.geometry;ge.meshes++,ge.triangles+=(be.index?be.index.count:be.attributes.position.count)/3*(V.isInstancedMesh?V.count:1)}X.add(V.geometry),(Array.isArray(V.material)?V.material:[V.material]).forEach(ge=>{for(const be in ge)ge[be]&&ge[be].isTexture&&se.add(ge[be].source)})});let U=0,B=0;X.forEach(V=>{Object.values(V.attributes).forEach(Q=>{U+=Q.array.byteLength}),V.index&&(U+=V.index.array.byteLength)}),o.traverse(V=>{V.isInstancedMesh&&(U+=V.instanceMatrix.array.byteLength+(V.instanceColor?V.instanceColor.array.byteLength:0))}),se.forEach(V=>{const Q=V.data;Q&&Q.width&&(B+=Q.width*Q.height*4*4/3)});const ce=t.getDrawingBufferSize(new Be),O=h.shadow.mapSize,ue=ce.x*ce.y*4*(t.getContext().getContextAttributes().antialias?9:2),A=t.shadowMap.enabled?O.x*O.y*8:0,F=V=>Math.round(V/1048576*10)/10;return{calls:q.render.calls,triangles:q.render.triangles,meshes:Se,visible:De,programs:q.programs?q.programs.length:0,geometries:q.memory.geometries,textures:q.memory.textures,pixelRatio:t.getPixelRatio(),buffer:ce.x+"x"+ce.y,mb:{geometry:F(U),texture:F(B),buffer:F(ue),shadow:F(A),total:F(U+B+ue+A)},...L?{models:ae}:{}}}return{render:gn,renderBranch:nn,carsModelled:it,propReady:On,hasFixture:L=>!!ot[L],stationPicture:w,loungePicture:$,fixturePicture:ve,stats:Dn,get ok(){return!st},get loading(){return n+G.length},dispose(){cancelAnimationFrame(k),G.length=0,t.dispose(),_.forEach(L=>L.dispose())}}}function B0(r,e,{box:t,span:n,material:i,textured:s,lampStandIns:a}){const{roads:o,roadWidth:c,plazaY:l,streetY:u,extent:h}=e,f=e.holes||[],d=(S,x,y,R,G,k,K,oe)=>{let D=[[S,x,G,k]];f.forEach(Y=>{D=D.flatMap(([H,he,Z,te])=>{if(Y.x0>=he||Y.x1<=H||Y.z0>=te||Y.z1<=Z)return[[H,he,Z,te]];const Te=Math.max(H,Y.x0),Pe=Math.min(he,Y.x1);return[[H,Te,Z,te],[Pe,he,Z,te],[Te,Pe,Z,Math.max(Z,Y.z0)],[Te,Pe,Math.min(te,Y.z1),te]].filter(([re,xe,Ne,Ee])=>xe-re>1e-6&&Ee-Ne>1e-6)})}),D.forEach(([Y,H,he,Z])=>s(n(r,Y,H,y,R,he,Z,K,{cast:!1}),oe))};d(-h,h,u-.4,u,-h,h,e.colours.asphalt,"asphalt");const g=S=>{const x=o.filter(G=>G.along===S).map(G=>G.at).sort((G,k)=>G-k),y=[];let R=-h;return x.forEach(G=>{y.push([R,G-c/2]),R=G+c/2}),y.push([R,h]),y},_=g("x");g("z").forEach(([S,x])=>_.forEach(([y,R])=>d(S,x,u,l,y,R,e.colours.paver,"sidewalk")));const p={};(e.marks||[]).forEach(S=>(p[S.colour]=p[S.colour]||[]).push(S));const v=new $e,M=new N,b=new N,P=new yn;Object.entries(p).forEach(([S,x])=>{const y=/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/.exec(S),R=y?i("#"+[1,2,3].map(k=>(+y[k]).toString(16).padStart(2,"0")).join(""),{transparent:!0,opacity:+y[4],depthWrite:!1}):i(S),G=new Un(new Zt(1,1,1).translate(0,.5,0),R,x.length);x.forEach((k,K)=>G.setMatrixAt(K,v.compose(M.set((k.x0+k.x1)/2,k.h?k.y:k.y-.004,(k.z0+k.z1)/2),P,b.set(k.x1-k.x0,k.h||.012,k.z1-k.z0)))),G.receiveShadow=!0,r.add(G)});const T=[];e.buildings.forEach(S=>{const x=n(r,S.x0,S.x1,l,S.h,S.z0,S.z1,S.wall,{opts:{name:"terrace"}}),y=n(r,S.x0-.15,S.x1+.15,S.h,S.h+.35,S.z0-.15,S.z1+.15,S.roof,{opts:{name:"terrace"}});x.userData.model=y.userData.model=S.model,T.push(x,y)}),r.add(k0(e.silhouettes||[],l,i));const C=new Hn(1.6,1);return e.trees.forEach(([S,x])=>{t(r,S,l,x,.35,2.2,.35,"#7a5a3e",{opts:{name:"street"}});const y=new Ye(C,i("#7fa35a",{name:"street"}));y.position.set(S,l+3.6,x),y.scale.set(1,.8,1),y.castShadow=y.receiveShadow=!0,r.add(y)}),e.lamps.forEach(([S,x])=>{a.push(t(r,S,l,x,.18,4.4,.18,"#3b4a43",{opts:{name:"street"}})),a.push(t(r,S,l+4.3,x,.5,.3,.5,"#f1e3b6",{opts:{name:"street"}}))}),T}function k0(r,e,t){const n=[],i=[],s=[],a=new Qe,o=new Qe,c=new Qe("#e6dcc6"),l=(m,p,v,M,b,P)=>{[m,p,v,m,v,M].forEach(T=>{n.push(...T),i.push(...b),s.push(P.r,P.g,P.b)})},u=(m,p,v,M,b,P,T)=>{l([m,M,P],[p,M,P],[p,M,b],[m,M,b],[0,1,0],T),l([m,v,P],[p,v,P],[p,M,P],[m,M,P],[0,0,1],T),l([p,v,P],[p,v,b],[p,M,b],[p,M,P],[1,0,0],T),l([p,v,b],[m,v,b],[m,M,b],[p,M,b],[0,0,-1],T),l([m,v,b],[m,v,P],[m,M,P],[m,M,b],[-1,0,0],T)},h=1.69/fn,f=2.75*h,d=2.45*h;r.forEach(m=>{a.set(m.colour).convertSRGBToLinear(),o.copy(a).multiplyScalar(.62);const p=e+f+(m.storeys-1)*d+.35*h;u(m.x0,m.x1,e,p,m.z0,m.z1,a),u(m.x0-.12,m.x1+.12,p,p+.3,m.z0-.12,m.z1+.12,c);for(let v=0;v<m.storeys;v++){const M=e+(v?f+(v-1)*d:0)+(v?.9:.5)*h,b=M+(v?1.1:1.7)*h;l([m.x0+.5,M,m.z1+.03],[m.x1-.5,M,m.z1+.03],[m.x1-.5,b,m.z1+.03],[m.x0+.5,b,m.z1+.03],[0,0,1],o),l([m.x1+.03,M,m.z1-.5],[m.x1+.03,M,m.z0+.5],[m.x1+.03,b,m.z0+.5],[m.x1+.03,b,m.z1-.5],[1,0,0],o)}});const g=new qt;g.setAttribute("position",new Pt(n,3)),g.setAttribute("normal",new Pt(i,3)),g.setAttribute("color",new Pt(s,3));const _=new Ye(g,t("#ffffff",{vertexColors:!0,name:"silhouette"}));return _.receiveShadow=!0,_.castShadow=!1,_}function z0(r,e,{box:t,span:n,material:i,textured:s,model:a}){const o=new mt;r.add(o),e.floors.forEach((P,T)=>{const C=(P.x||0)-P.w/2,S=(P.x||0)+P.w/2,x=P.z-P.d/2,y=P.z+P.d/2;s(n(o,C,S,P.y-(T?.32:.02),P.y,x,y,T===2?"#e9e4d8":T?"#e4ddcc":"#c9965f",{cast:T>0}),["herringbone","timber","concrete"][T]),T&&(n(o,C,S,P.y,P.y+1.05,y-.06,y,"#c9a35a",{opts:{transparent:!0,opacity:.55}}),(T===1?[C+.3,S-.3]:[C+.3,0,S-.3]).forEach(R=>t(o,R,e.floors[T-1].y,y-.3,.3,P.y-e.floors[T-1].y-.32,.3,"#33372f")))});const c=(P,T,C,S,x,y,R,G,k,K)=>{const oe=[];for(let Y=0;Y<=48;Y++){const H=Y/48,he=x+(y-x)*H;oe.push(new N(T+Math.cos(he)*S,(R+(G-R)*H)*fn,C+Math.sin(he)*S))}const D=new Ye(new wr(new na(oe),96,k,8,!1),i(K));D.castShadow=!0,P.add(D)},l=(P,T,C,S,x,y)=>{const R=new mt,G=new mt;G.scale.y=1/fn,R.add(G),o.add(R),a("spiral_stair.glb",P,C,T,()=>{R.visible=!1});const k=1.15,K=Math.PI*24/180,oe=(S-C)/x,D=Z=>y+(x-1-Z)*K;t(R,P,C,T,.26,S-C+1,.26,"#1f5a3c"),t(R,P,C,T,.56,.06,.56,"#d0a54e",{cast:!1});const Y=new Ye(new _i(.13,16,10),i("#d0a54e"));Y.position.set(P,S+1.05,T),Y.castShadow=!0,R.add(Y);for(let Z=0;Z<x-1;Z++){const te=D(Z),Te=C+oe*(Z+1),Pe=K*1.04,re=new Ye(new Qt(k,k,.08,6,1,!1,Math.PI/2-te-Pe/2,Pe),i("#d9a768"));re.position.set(P,Te-.04,T),re.castShadow=re.receiveShadow=!0,R.add(re);const xe=te-K/2;t(R,P+Math.cos(xe)*(k-.06),Te,T+Math.sin(xe)*(k-.06),.05,.95,.05,"#1f5a3c",{cast:!1})}const H=D(0)+K/2,he=D(x-2)-K/2;c(G,P,T,k-.06,H,he,C+1,S-oe+1,.05,"#d0a54e"),c(G,P,T,k-.02,H,he,C+oe-.14,S-.14,.09,"#1f5a3c")},[,u,h]=e.floors,f=-Math.PI/2,d=(P,T,C,S,x)=>n(o,P,T,x,x+1.05,C,S,"#c9a35a",{opts:{transparent:!0,opacity:.55}});l(10.2,.35,0,u.y,14,f),s(n(o,8.93,11.35,u.y-.32,u.y,-2.8,-.8,"#e4ddcc",{cast:!0}),"timber"),d(11.29,11.35,-2.8,-.8,u.y),l(7.75,-4.4,u.y,h.y,14,f),s(n(o,6.45,9,h.y-.32,h.y,-6.9,-5.55,"#e9e4d8",{cast:!0}),"concrete"),d(8.94,9,-6.9,-5.55,h.y);const g=(P,T,C,S)=>d(P-.03,P+.03,T,C,S),_=(P,T,C,S)=>d(P,T,C-.03,C+.03,S),m=u.z-u.d/2,p=u.z+u.d/2,v=h.z-h.d/2,M=h.z+h.d/2;g(-u.w/2+.03,m+3.5,p-.06,u.y),g(u.w/2-.03,m,-2.8,u.y),g(u.w/2-.03,-.8,p-.06,u.y),_(9,11.35,-2.77,u.y),_(9,9.6,-.83,u.y),_(10.8,11.35,-.83,u.y),g(-h.w/2+.03,v+3.5,M-.06,h.y),g(h.w/2-.03,-5.55,M-.06,h.y),_(h.w/2,7.15,-5.58,h.y),_(8.35,9,-5.58,h.y);const b=e.marquee;e.wallFaces||(n(o,b.x-.13,b.x+.13,0,.9,b.zRear,b.zFront,"#1f6b47"),n(o,b.x-.04,b.x+.04,.9,b.y0,b.zRear,b.zFront,"#cfe3dc",{cast:!1,opts:{transparent:!0,opacity:.35}}),n(o,b.x-.16,b.x+.16,b.y0,b.y1,b.zRear,b.zFront,"#1f6b47"),[b.zRear,b.zFront].forEach(P=>t(o,b.x,0,P,.34,b.y1,.34,"#174f36")))}function G0(r,e,t,{box:n,material:i}){if(!t)return null;const s=fn,a=t.bore/2,o=new Bi({color:"#cfeee2",emissive:"#2f5a4a",emissiveIntensity:.25,roughness:.08,metalness:0,transparent:!0,opacity:.46,depthWrite:!1}),c=new Bi({color:"#d0a54e",roughness:.3,metalness:.9}),l=(S,x,y)=>S.map((R,G)=>R+(x[G]-R)*y);function u(S){const x=[S[0]],y=.48;for(let R=1;R<S.length-1;R++){const G=S[R-1],k=S[R],K=S[R+1],oe=l(k,G,Math.min(.4,y/Math.hypot(...G.map((Y,H)=>Y-k[H])))),D=l(k,K,Math.min(.4,y/Math.hypot(...K.map((Y,H)=>Y-k[H]))));x.push(oe);for(let Y=1;Y<=8;Y++){const H=Y/8;x.push(oe.map((he,Z)=>(1-H)*(1-H)*he+2*(1-H)*H*k[Z]+H*H*D[Z]))}}return x.push(S[S.length-1]),x}const h=S=>new N(S[0],S[1]*s,S[2]),f=(S,x,y,R,G)=>{const k=new Ye(new ra(y,R,10,32),G);return k.position.copy(h(S)),k.lookAt(k.position.clone().add(x)),k.castShadow=!0,r.add(k),k},d=t.tubes.map(S=>{const x=u(S.points),y=new zl;for(let D=1;D<x.length;D++)y.add(new Ul(h(x[D-1]),h(x[D])));const R=new Ye(new wr(y,Math.max(24,x.length*3),a,18,!1),o);R.renderOrder=3,r.add(R);const G=[R];[[S.points[0],S.points[1]],[S.points[S.points.length-1],S.points[S.points.length-2]]].forEach(([D,Y],H)=>{(H===0?S.noCap0:S.noCap1)||G.push(f(D,h(D).sub(h(Y)).normalize(),a+.02,.07,c))}),(S.floorRings||[]).forEach(D=>G.push(f(D,new N(0,1,0),a+.1,.08,c)));const K=[];let oe=0;for(let D=1;D<x.length;D++){const Y=Math.hypot(x[D][0]-x[D-1][0],x[D][1]-x[D-1][1],x[D][2]-x[D-1][2]);K.push({a:x[D-1],b:x[D],len:Y}),oe+=Y}return{tube:S,segments:K,total:oe,parts:G}}),g=new mt;e.add(g);const _=t.belts.map(S=>{const x=Math.abs(S.x2-S.x1),y=(S.x1+S.x2)/2;return[S.x1,S.x2].forEach(R=>n(g,R-Math.sign(S.x2-S.x1)*.25*(R===S.x1?-1:1),S.floor,S.z,.12,S.height-.1,.5,"#344a40")),n(g,y,S.floor+S.height-.18,S.z,x,.16,S.width,"#536c5b"),n(g,y,S.floor+S.height-.02,S.z,x-.1,.04,S.width-.2,"#2a4035",{cast:!1}),S}),m=H0(),p=m.map(S=>{const x=new Un(S.geometry,new vn({vertexColors:!0}),32);return x.castShadow=!0,x.count=0,x.renderOrder=2,x.frustumCulled=!1,x.instanceMatrix.setUsage(35048),r.add(x),x}),v=new $e,M=new yn,b=new N(0,1,0),P=new N,T=new N(1,1,1);function C(S,x,y,R,G){const k=Math.min(R,m.length-1),K=p[k];K.count>=32||(M.setFromAxisAngle(b,G),K.setMatrixAt(K.count++,v.compose(P.set(S,x*s,y),M,T)))}return{loadModels(S,x){S.load(x+"conveyor_parts.glb",y=>{const R=D=>{const Y=y.scene.getObjectByName(D);return Y&&Y.position.set(0,0,0),Y},G=R("Section"),k=R("End"),K=R("Leg");if(!G||!k||!K)return;const oe=(D,Y,H,he,Z,te,Te)=>{const Pe=new mt,re=D.clone();re.traverse(xe=>{xe.isMesh&&(xe.castShadow=!0,xe.receiveShadow=!0)}),Pe.add(re),Pe.scale.set(1.69*Z,1.69*te/s,1.69),Pe.position.set(Y,H,he),Te&&(Pe.rotation.y=Te),e.add(Pe)};_.forEach(D=>{const Y=Math.min(D.x1,D.x2),H=Math.max(D.x1,D.x2),he=H-Y,Z=Math.max(1,Math.round(he)),te=D.floor+D.height;for(let Pe=0;Pe<Z;Pe++)oe(G,Y+(Pe+.5)*he/Z,te,D.z,he/Z,1);oe(k,H,te,D.z,1,1),oe(k,Y,te,D.z,1,1,Math.PI),[Y+.25,H-.25].concat(he>5?[(Y+H)/2]:[]).forEach(Pe=>oe(K,Pe,D.floor,D.z,1,(D.height-.18)/.87))}),g.visible=!1},void 0,y=>console.warn("3D map: could not load conveyor_parts.glb",y)),S.load(x+"cargo_items.glb",y=>{y.scene.updateMatrixWorld(!0),m.forEach((R,G)=>{const k=y.scene.getObjectByName("Cargo"+G);if(!k)return;const K=k.matrixWorld.clone().invert().premultiply(new $e().makeScale(1.69,1.69,1.69)),oe=[];if(k.traverse(Y=>{if(!Y.isMesh)return;const H=Y.geometry.clone().applyMatrix4(new $e().multiplyMatrices(K,Y.matrixWorld)),he=Y.material.color,Z=H.attributes.position.count,te=new Float32Array(Z*3);for(let Te=0;Te<Z;Te++)te[Te*3]=he.r,te[Te*3+1]=he.g,te[Te*3+2]=he.b;H.setAttribute("color",new zt(te,3)),Object.keys(H.attributes).forEach(Te=>{["position","normal","color"].includes(Te)||H.deleteAttribute(Te)}),oe.push(H.index?H.toNonIndexed():H)}),!oe.length)return;const D=Pr(oe);D.computeBoundingBox(),p[G].geometry.dispose(),p[G].geometry=D,R.geometry=D,R.height=D.boundingBox.max.y})},void 0,y=>console.warn("3D map: could not load cargo_items.glb",y))},update({odo:S,running:x},y={}){p.forEach(R=>{R.count=0}),d.forEach(({tube:R,segments:G,total:k,parts:K})=>{const oe=!R.fixture||!!y[R.fixture];if(K.forEach(te=>{te.visible=oe}),!oe)return;const D=R.window?R.window.total:k,Y=R.window?R.window.offset:0,H=Math.max(2,Math.round(D/t.gap)),he=D/H,Z=x[R.stage]?S:0;for(let te=0;te<H;te++){let Te=(Z+te*he)%D-Y;if(!(Te<0||Te>=k))for(const Pe of G){if(Te>Pe.len){Te-=Pe.len;continue}const re=l(Pe.a,Pe.b,Te/Pe.len);C(re[0],re[1]-m[R.cargoStage].height/2/s,re[2],R.cargoStage,te*2.1);break}}}),_.forEach(R=>{const G=Math.abs(R.x2-R.x1),k=Math.max(2,Math.round(G/t.gap)),K=x[R.stage]?S:0,oe=Math.sign(R.x2-R.x1);for(let D=0;D<k;D++)C(R.x1+oe*((K+D*G/k)%G),R.floor+R.height+.02,R.z,R.stage,D*2.1)}),p.forEach(R=>{R.instanceMatrix.needsUpdate=!0})}}}function H0(){const r=[],e=(a,o,c=0,l=0,u=0,{sx:h=1,sy:f=1,sz:d=1,rx:g=0,ry:_=0,rz:m=0}={})=>{const p=a.index?a.toNonIndexed():a;p.deleteAttribute("uv"),p.scale(h,f,d),p.rotateX(g),p.rotateZ(m),p.rotateY(_),p.translate(c,l,u);const v=new Qe(o),M=p.attributes.position.count,b=new Float32Array(M*3);for(let P=0;P<M;P++)b[P*3]=v.r,b[P*3+1]=v.g,b[P*3+2]=v.b;p.setAttribute("color",new zt(b,3)),r.push(p)},t=()=>{const a=Pr(r.splice(0));return a.computeBoundingBox(),{geometry:a,height:a.boundingBox.max.y}},n=(a,o,c,l,u,h=.5)=>e(new _i(1,7,4),a,Math.cos(o)*c,l,-Math.sin(o)*c,{sx:u,sy:u*.16,sz:u*.38,rz:h,ry:o}),i=(a,o)=>{e(new Qt(a,a*.78,o,12),"#b8673f",0,o/2),e(new Qt(a*1.08,a*1.08,o*.18,12),"#c97a50",0,o*.91),e(new Qt(a*.92,a*.92,.012,12),"#4a3424",0,o*.97)},s=[];return i(.1,.13),e(new Qt(.012,.014,.14,5),"#5b8a3c",0,.2),[[0,.22],[Math.PI,.23],[Math.PI/2,.28],[-Math.PI/2,.29]].forEach(([a,o],c)=>n(c<2?"#7fb552":"#a6d073",a,.06,o,.065)),s.push(t()),i(.12,.15),e(new Qt(.016,.02,.34,6),"#4f7a35",0,.32),[.24,.32,.4].forEach((a,o)=>{for(let c=0;c<5;c++){const l=c*1.257+o*.6,u=.1-o*.02;n(o%2?"#4f8a3a":"#3f7a33",l,u,a,.1-o*.015,.35)}}),[[0,.47,0,.07],[.07,.4,.03,.05],[-.06,.41,-.04,.05]].forEach(([a,o,c,l])=>{e(new Hn(l,1),"#9fc06c",a,o,c,{sy:1.7}),e(new Hn(l*.45,0),"#d99a55",a+l*.4,o+l*.5,c+l*.3)}),s.push(t()),e(new Zt(.42,.03,.3),"#c9a46a",0,.015),[[-.1,.04,"#86a85c"],[.1,-.03,"#7a9c52"],[0,.02,"#93b465"]].forEach(([a,o,c],l)=>{const u=l===2?.095:.085,h=.03+u*1.1+(l===2?.04:0);e(new Hn(u,1),c,a,h,o,{sy:1.25,ry:l}),e(new Hn(u*.3,0),"#d68f4a",a+u*.55,h+u*.4,o+u*.4),e(new Hn(u*.25,0),"#e0a560",a-u*.4,h+u*.7,o-u*.5)}),s.push(t()),e(new Qt(.13,.13,.3,14),"#a9cdb3",0,.15),e(new Qt(.14,.14,.07,14),"#d2b25e",0,.335),e(new Zt(.14,.12,.02),"#f3efda",0,.14,.125),s.push(t()),e(new Zt(.32,.38,.2),"#d9bd88",0,.19),e(new Zt(.33,.05,.21),"#bf9f68",0,.36),[-.06,.06].forEach(a=>e(new ra(.07,.01,5,10,Math.PI),"#8a6e44",0,.385,a)),e(new Zt(.16,.14,.01),"#496f50",0,.2,.101),e(new Zt(.06,.06,.01),"#e7dcbc",0,.2,.106),s.push(t()),e(new Zt(.38,.26,.3),"#c49a5e",0,.13),e(new Zt(.08,.012,.31),"#e6d6ad",0,.262),[-1,1].forEach(a=>e(new Zt(.08,.12,.01),"#e6d6ad",0,.2,a*.151)),e(new Zt(.12,.09,.01),"#496f50",.1,.13,.152),s.push(t()),s}export{V0 as createMap3D};
