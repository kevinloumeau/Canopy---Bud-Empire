/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const uo="attached",Pl="detached";const Ht="srgb",Cn="srgb-linear",Br="linear",Yt="srgb";const fo="300 es";class gs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const Mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let po=1234567;const Os=Math.PI/180,us=180/Math.PI;function Zn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Mn[s&255]+Mn[s>>8&255]+Mn[s>>16&255]+Mn[s>>24&255]+"-"+Mn[e&255]+Mn[e>>8&255]+"-"+Mn[e>>16&15|64]+Mn[e>>24&255]+"-"+Mn[t&63|128]+Mn[t>>8&255]+"-"+Mn[t>>16&255]+Mn[t>>24&255]+Mn[n&255]+Mn[n>>8&255]+Mn[n>>16&255]+Mn[n>>24&255]).toLowerCase()}function dn(s,e,t){return Math.max(e,Math.min(t,s))}function Ya(s,e){return(s%e+e)%e}function Ll(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Dl(s,e,t){return s!==e?(t-s)/(e-s):0}function Bs(s,e,t){return(1-t)*s+t*e}function Il(s,e,t,n){return Bs(s,e,1-Math.exp(-t*n))}function Fl(s,e=1){return e-Math.abs(Ya(s,e*2)-e)}function Nl(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Ul(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Ol(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Bl(s,e){return s+Math.random()*(e-s)}function kl(s){return s*(.5-Math.random())}function zl(s){s!==void 0&&(po=s);let e=po+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Gl(s){return s*Os}function Hl(s){return s*us}function Vl(s){return(s&s-1)===0&&s!==0}function Wl(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Xl(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function jl(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),f=a((e-n)/2),d=r((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":s.set(o*u,c*h,c*f,o*l);break;case"YZY":s.set(c*f,o*u,c*h,o*l);break;case"ZXZ":s.set(c*h,c*f,o*u,o*l);break;case"XZX":s.set(o*u,c*g,c*d,o*l);break;case"YXY":s.set(c*d,o*u,c*g,o*l);break;case"ZYZ":s.set(c*g,c*d,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Jn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Wt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const ql={DEG2RAD:Os,RAD2DEG:us,generateUUID:Zn,clamp:dn,euclideanModulo:Ya,mapLinear:Ll,inverseLerp:Dl,lerp:Bs,damp:Il,pingpong:Fl,smoothstep:Nl,smootherstep:Ul,randInt:Ol,randFloat:Bl,randFloatSpread:kl,seededRandom:zl,degToRad:Gl,radToDeg:Hl,isPowerOfTwo:Vl,ceilPowerOfTwo:Wl,floorPowerOfTwo:Xl,setQuaternionFromProperEuler:jl,normalize:Wt,denormalize:Jn};class De{constructor(e=0,t=0){De.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(dn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Pt{constructor(e,t,n,i,r,a,o,c,l){Pt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],b=i[0],m=i[3],p=i[6],v=i[1],M=i[4],_=i[7],I=i[2],R=i[5],T=i[8];return r[0]=a*b+o*v+c*I,r[3]=a*m+o*M+c*R,r[6]=a*p+o*_+c*T,r[1]=l*b+u*v+h*I,r[4]=l*m+u*M+h*R,r[7]=l*p+u*_+h*T,r[2]=f*b+d*v+g*I,r[5]=f*m+d*M+g*R,r[8]=f*p+d*_+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+i*r*l-i*a*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,f=o*c-u*r,d=l*r-a*c,g=t*h+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/g;return e[0]=h*b,e[1]=(i*l-u*n)*b,e[2]=(o*n-i*a)*b,e[3]=f*b,e[4]=(u*t-i*c)*b,e[5]=(i*r-o*t)*b,e[6]=d*b,e[7]=(n*c-l*t)*b,e[8]=(a*t-n*r)*b,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(qr.makeScale(e,t)),this}rotate(e){return this.premultiply(qr.makeRotation(-e)),this}translate(e,t){return this.premultiply(qr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const qr=new Pt;function Kc(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Hs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Kl(){const s=Hs("canvas");return s.style.display="block",s}const mo={};function Ns(s){s in mo||(mo[s]=!0,console.warn(s))}function Yl(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Jl(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Zl(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ot={enabled:!0,workingColorSpace:Cn,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Yt&&(s.r=bi(s.r),s.g=bi(s.g),s.b=bi(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Yt&&(s.r=ls(s.r),s.g=ls(s.g),s.b=ls(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===""?Br:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function bi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ls(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const go=[.64,.33,.3,.6,.15,.06],bo=[.2126,.7152,.0722],_o=[.3127,.329],xo=new Pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vo=new Pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ot.define({[Cn]:{primaries:go,whitePoint:_o,transfer:Br,toXYZ:xo,fromXYZ:vo,luminanceCoefficients:bo,workingColorSpaceConfig:{unpackColorSpace:Ht},outputColorSpaceConfig:{drawingBufferColorSpace:Ht}},[Ht]:{primaries:go,whitePoint:_o,transfer:Yt,toXYZ:xo,fromXYZ:vo,luminanceCoefficients:bo,outputColorSpaceConfig:{drawingBufferColorSpace:Ht}}});let Wi;class Ql{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Wi===void 0&&(Wi=Hs("canvas")),Wi.width=e.width,Wi.height=e.height;const n=Wi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Wi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Hs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=bi(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(bi(t[n]/255)*255):t[n]=bi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let $l=0;class Yc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:$l++}),this.uuid=Zn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Kr(i[a].image)):r.push(Kr(i[a]))}else r=Kr(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Kr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Ql.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let eh=0;class fn extends gs{constructor(e=fn.DEFAULT_IMAGE,t=fn.DEFAULT_MAPPING,n=1001,i=1001,r=1006,a=1008,o=1023,c=1009,l=fn.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:eh++}),this.uuid=Zn(),this.name="",this.source=new Yc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new De(0,0),this.repeat=new De(1,1),this.center=new De(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=300;fn.DEFAULT_ANISOTROPY=1;class Bt{constructor(e=0,t=0,n=0,i=1){Bt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],g=c[9],b=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-b)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+b)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(l+1)/2,_=(d+1)/2,I=(p+1)/2,R=(u+f)/4,T=(h+b)/4,w=(g+m)/4;return M>_&&M>I?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=R/n,r=T/n):_>I?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=R/i,r=w/i):I<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(I),n=T/r,i=w/r),this.set(n,i,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(h-b)*(h-b)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(h-b)/v,this.z=(f-u)/v,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class th extends gs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Bt(0,0,e,t),this.scissorTest=!1,this.viewport=new Bt(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new fn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Yc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ri extends th{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Jc extends fn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class nh extends fn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Tn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3];const f=r[a+0],d=r[a+1],g=r[a+2],b=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=b;return}if(h!==b||c!==f||l!==d||u!==g){let m=1-o;const p=c*f+l*d+u*g+h*b,v=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const I=Math.sqrt(M),R=Math.atan2(I,p*v);m=Math.sin(m*R)/I,o=Math.sin(o*R)/I}const _=o*v;if(c=c*m+f*_,l=l*m+d*_,u=u*m+g*_,h=h*m+b*_,m===1-o){const I=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=I,l*=I,u*=I,h*=I}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return e[t]=o*g+u*h+c*d-l*f,e[t+1]=c*g+u*f+l*h-o*d,e[t+2]=l*g+u*d+o*f-c*h,e[t+3]=u*g-o*h-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(i/2),h=o(r/2),f=c(n/2),d=c(i/2),g=c(r/2);switch(a){case"XYZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"YZX":this._x=f*u*h+l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h-f*d*g;break;case"XZY":this._x=f*u*h-l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=n+o+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(a-i)*d}else if(n>o&&n>h){const d=2*Math.sqrt(1+n-o-h);this._w=(u-c)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(r+l)/d}else if(o>h){const d=2*Math.sqrt(1+o-n-h);this._w=(r-l)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+h-n-o);this._w=(a-i)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(dn(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+i*l-r*c,this._y=i*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-i*o,this._w=a*u-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const d=1-t;return this._w=d*a+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=a*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,n=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Mo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Mo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),u=2*(o*t-r*i),h=2*(r*n-a*t);return this.x=t+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=i+c*h+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Yr.copy(this).projectOnVector(e),this.sub(Yr)}reflect(e){return this.sub(Yr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(dn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Yr=new F,Mo=new Tn;class En{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(qn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(qn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=qn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,qn):qn.fromBufferAttribute(r,a),qn.applyMatrix4(e.matrixWorld),this.expandByPoint(qn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),$s.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$s.copy(n.boundingBox)),$s.applyMatrix4(e.matrixWorld),this.union($s)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,qn),qn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ms),er.subVectors(this.max,Ms),Xi.subVectors(e.a,Ms),ji.subVectors(e.b,Ms),qi.subVectors(e.c,Ms),_i.subVectors(ji,Xi),xi.subVectors(qi,ji),Li.subVectors(Xi,qi);let t=[0,-_i.z,_i.y,0,-xi.z,xi.y,0,-Li.z,Li.y,_i.z,0,-_i.x,xi.z,0,-xi.x,Li.z,0,-Li.x,-_i.y,_i.x,0,-xi.y,xi.x,0,-Li.y,Li.x,0];return!Jr(t,Xi,ji,qi,er)||(t=[1,0,0,0,1,0,0,0,1],!Jr(t,Xi,ji,qi,er))?!1:(tr.crossVectors(_i,xi),t=[tr.x,tr.y,tr.z],Jr(t,Xi,ji,qi,er))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(qn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ci),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ci=[new F,new F,new F,new F,new F,new F,new F,new F],qn=new F,$s=new En,Xi=new F,ji=new F,qi=new F,_i=new F,xi=new F,Li=new F,Ms=new F,er=new F,tr=new F,Di=new F;function Jr(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Di.fromArray(s,r);const o=i.x*Math.abs(Di.x)+i.y*Math.abs(Di.y)+i.z*Math.abs(Di.z),c=e.dot(Di),l=t.dot(Di),u=n.dot(Di);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const ih=new En,ys=new F,Zr=new F;class ii{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):ih.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ys.subVectors(e,this.center);const t=ys.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ys,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ys.copy(e.center).add(Zr)),this.expandByPoint(ys.copy(e.center).sub(Zr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const li=new F,Qr=new F,nr=new F,vi=new F,$r=new F,ir=new F,ea=new F;class kr{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,li)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=li.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(li.copy(this.origin).addScaledVector(this.direction,t),li.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Qr.copy(e).add(t).multiplyScalar(.5),nr.copy(t).sub(e).normalize(),vi.copy(this.origin).sub(Qr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(nr),o=vi.dot(this.direction),c=-vi.dot(nr),l=vi.lengthSq(),u=Math.abs(1-a*a);let h,f,d,g;if(u>0)if(h=a*c-o,f=a*o-c,g=r*u,h>=0)if(f>=-g)if(f<=g){const b=1/u;h*=b,f*=b,d=h*(h+a*f+2*o)+f*(a*h+f+2*c)+l}else f=r,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-a*r+o)),f=h>0?-r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(h=Math.max(0,-(a*r+o)),f=h>0?r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l);else f=a>0?-r:r,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Qr).addScaledVector(nr,f),d}intersectSphere(e,t){li.subVectors(e.center,this.origin);const n=li.dot(this.direction),i=li.dot(li)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,i=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,i=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,li)!==null}intersectTriangle(e,t,n,i,r){$r.subVectors(t,e),ir.subVectors(n,e),ea.crossVectors($r,ir);let a=this.direction.dot(ea),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;vi.subVectors(this.origin,e);const c=o*this.direction.dot(ir.crossVectors(vi,ir));if(c<0)return null;const l=o*this.direction.dot($r.cross(vi));if(l<0||c+l>a)return null;const u=-o*vi.dot(ea);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class gt{constructor(e,t,n,i,r,a,o,c,l,u,h,f,d,g,b,m){gt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,u,h,f,d,g,b,m)}set(e,t,n,i,r,a,o,c,l,u,h,f,d,g,b,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=b,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new gt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Ki.setFromMatrixColumn(e,0).length(),r=1/Ki.setFromMatrixColumn(e,1).length(),a=1/Ki.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=a*u,d=a*h,g=o*u,b=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=d+g*l,t[5]=f-b*l,t[9]=-o*c,t[2]=b-f*l,t[6]=g+d*l,t[10]=a*c}else if(e.order==="YXZ"){const f=c*u,d=c*h,g=l*u,b=l*h;t[0]=f+b*o,t[4]=g*o-d,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=d*o-g,t[6]=b+f*o,t[10]=a*c}else if(e.order==="ZXY"){const f=c*u,d=c*h,g=l*u,b=l*h;t[0]=f-b*o,t[4]=-a*h,t[8]=g+d*o,t[1]=d+g*o,t[5]=a*u,t[9]=b-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const f=a*u,d=a*h,g=o*u,b=o*h;t[0]=c*u,t[4]=g*l-d,t[8]=f*l+b,t[1]=c*h,t[5]=b*l+f,t[9]=d*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const f=a*c,d=a*l,g=o*c,b=o*l;t[0]=c*u,t[4]=b-f*h,t[8]=g*h+d,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=d*h+g,t[10]=f-b*h}else if(e.order==="XZY"){const f=a*c,d=a*l,g=o*c,b=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+b,t[5]=a*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=o*u,t[10]=b*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(sh,e,rh)}lookAt(e,t,n){const i=this.elements;return Nn.subVectors(e,t),Nn.lengthSq()===0&&(Nn.z=1),Nn.normalize(),Mi.crossVectors(n,Nn),Mi.lengthSq()===0&&(Math.abs(n.z)===1?Nn.x+=1e-4:Nn.z+=1e-4,Nn.normalize(),Mi.crossVectors(n,Nn)),Mi.normalize(),sr.crossVectors(Nn,Mi),i[0]=Mi.x,i[4]=sr.x,i[8]=Nn.x,i[1]=Mi.y,i[5]=sr.y,i[9]=Nn.y,i[2]=Mi.z,i[6]=sr.z,i[10]=Nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],b=n[6],m=n[10],p=n[14],v=n[3],M=n[7],_=n[11],I=n[15],R=i[0],T=i[4],w=i[8],y=i[12],x=i[1],D=i[5],k=i[9],z=i[13],Y=i[2],se=i[6],N=i[10],Z=i[14],q=i[3],ce=i[7],J=i[11],re=i[15];return r[0]=a*R+o*x+c*Y+l*q,r[4]=a*T+o*D+c*se+l*ce,r[8]=a*w+o*k+c*N+l*J,r[12]=a*y+o*z+c*Z+l*re,r[1]=u*R+h*x+f*Y+d*q,r[5]=u*T+h*D+f*se+d*ce,r[9]=u*w+h*k+f*N+d*J,r[13]=u*y+h*z+f*Z+d*re,r[2]=g*R+b*x+m*Y+p*q,r[6]=g*T+b*D+m*se+p*ce,r[10]=g*w+b*k+m*N+p*J,r[14]=g*y+b*z+m*Z+p*re,r[3]=v*R+M*x+_*Y+I*q,r[7]=v*T+M*D+_*se+I*ce,r[11]=v*w+M*k+_*N+I*J,r[15]=v*y+M*z+_*Z+I*re,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],b=e[7],m=e[11],p=e[15];return g*(+r*c*h-i*l*h-r*o*f+n*l*f+i*o*d-n*c*d)+b*(+t*c*d-t*l*f+r*a*f-i*a*d+i*l*u-r*c*u)+m*(+t*l*h-t*o*d-r*a*h+n*a*d+r*o*u-n*l*u)+p*(-i*o*u-t*c*h+t*o*f+i*a*h-n*a*f+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],b=e[13],m=e[14],p=e[15],v=h*m*l-b*f*l+b*c*d-o*m*d-h*c*p+o*f*p,M=g*f*l-u*m*l-g*c*d+a*m*d+u*c*p-a*f*p,_=u*b*l-g*h*l+g*o*d-a*b*d-u*o*p+a*h*p,I=g*h*c-u*b*c-g*o*f+a*b*f+u*o*m-a*h*m,R=t*v+n*M+i*_+r*I;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/R;return e[0]=v*T,e[1]=(b*f*r-h*m*r-b*i*d+n*m*d+h*i*p-n*f*p)*T,e[2]=(o*m*r-b*c*r+b*i*l-n*m*l-o*i*p+n*c*p)*T,e[3]=(h*c*r-o*f*r-h*i*l+n*f*l+o*i*d-n*c*d)*T,e[4]=M*T,e[5]=(u*m*r-g*f*r+g*i*d-t*m*d-u*i*p+t*f*p)*T,e[6]=(g*c*r-a*m*r-g*i*l+t*m*l+a*i*p-t*c*p)*T,e[7]=(a*f*r-u*c*r+u*i*l-t*f*l-a*i*d+t*c*d)*T,e[8]=_*T,e[9]=(g*h*r-u*b*r-g*n*d+t*b*d+u*n*p-t*h*p)*T,e[10]=(a*b*r-g*o*r+g*n*l-t*b*l-a*n*p+t*o*p)*T,e[11]=(u*o*r-a*h*r-u*n*l+t*h*l+a*n*d-t*o*d)*T,e[12]=I*T,e[13]=(u*b*i-g*h*i+g*n*f-t*b*f-u*n*m+t*h*m)*T,e[14]=(g*o*i-a*b*i-g*n*c+t*b*c+a*n*m-t*o*m)*T,e[15]=(a*h*i-u*o*i+u*n*c-t*h*c-a*n*f+t*o*f)*T,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,u*o+n,u*c-i*a,0,l*c-i*o,u*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,h=o+o,f=r*l,d=r*u,g=r*h,b=a*u,m=a*h,p=o*h,v=c*l,M=c*u,_=c*h,I=n.x,R=n.y,T=n.z;return i[0]=(1-(b+p))*I,i[1]=(d+_)*I,i[2]=(g-M)*I,i[3]=0,i[4]=(d-_)*R,i[5]=(1-(f+p))*R,i[6]=(m+v)*R,i[7]=0,i[8]=(g+M)*T,i[9]=(m-v)*T,i[10]=(1-(f+b))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=Ki.set(i[0],i[1],i[2]).length();const a=Ki.set(i[4],i[5],i[6]).length(),o=Ki.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Kn.copy(this);const l=1/r,u=1/a,h=1/o;return Kn.elements[0]*=l,Kn.elements[1]*=l,Kn.elements[2]*=l,Kn.elements[4]*=u,Kn.elements[5]*=u,Kn.elements[6]*=u,Kn.elements[8]*=h,Kn.elements[9]*=h,Kn.elements[10]*=h,t.setFromRotationMatrix(Kn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=2e3){const c=this.elements,l=2*r/(t-e),u=2*r/(n-i),h=(t+e)/(t-e),f=(n+i)/(n-i);let d,g;if(o===2e3)d=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===2001)d=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=2e3){const c=this.elements,l=1/(t-e),u=1/(n-i),h=1/(a-r),f=(t+e)*l,d=(n+i)*u;let g,b;if(o===2e3)g=(a+r)*h,b=-2*h;else if(o===2001)g=r*h,b=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=b,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ki=new F,Kn=new gt,sh=new F(0,0,0),rh=new F(1,1,1),Mi=new F,sr=new F,Nn=new F,yo=new gt,So=new Tn;class kn{constructor(e=0,t=0,n=0,i=kn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(dn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-dn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(dn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-dn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(dn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-dn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return yo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(yo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return So.setFromEuler(this),this.setFromQuaternion(So,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}kn.DEFAULT_ORDER="XYZ";class Zc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ah=0;const Eo=new F,Yi=new Tn,hi=new gt,rr=new F,Ss=new F,oh=new F,ch=new Tn,To=new F(1,0,0),Ao=new F(0,1,0),wo=new F(0,0,1),Ro={type:"added"},lh={type:"removed"},Ji={type:"childadded",child:null},ta={type:"childremoved",child:null};class nn extends gs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ah++}),this.uuid=Zn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=nn.DEFAULT_UP.clone();const e=new F,t=new kn,n=new Tn,i=new F(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new gt},normalMatrix:{value:new Pt}}),this.matrix=new gt,this.matrixWorld=new gt,this.matrixAutoUpdate=nn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Yi.setFromAxisAngle(e,t),this.quaternion.multiply(Yi),this}rotateOnWorldAxis(e,t){return Yi.setFromAxisAngle(e,t),this.quaternion.premultiply(Yi),this}rotateX(e){return this.rotateOnAxis(To,e)}rotateY(e){return this.rotateOnAxis(Ao,e)}rotateZ(e){return this.rotateOnAxis(wo,e)}translateOnAxis(e,t){return Eo.copy(e).applyQuaternion(this.quaternion),this.position.add(Eo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(To,e)}translateY(e){return this.translateOnAxis(Ao,e)}translateZ(e){return this.translateOnAxis(wo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?rr.copy(e):rr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(Ss,rr,this.up):hi.lookAt(rr,Ss,this.up),this.quaternion.setFromRotationMatrix(hi),i&&(hi.extractRotation(i.matrixWorld),Yi.setFromRotationMatrix(hi),this.quaternion.premultiply(Yi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ro),Ji.child=e,this.dispatchEvent(Ji),Ji.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(lh),ta.child=e,this.dispatchEvent(ta),ta.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hi.multiply(e.parent.matrixWorld)),e.applyMatrix4(hi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ro),Ji.child=e,this.dispatchEvent(Ji),Ji.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,e,oh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,ch,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),d=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}nn.DEFAULT_UP=new F(0,1,0);nn.DEFAULT_MATRIX_AUTO_UPDATE=!0;nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Yn=new F,ui=new F,na=new F,fi=new F,Zi=new F,Qi=new F,Co=new F,ia=new F,sa=new F,ra=new F,aa=new Bt,oa=new Bt,ca=new Bt;class Vn{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Yn.subVectors(e,t),i.cross(Yn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Yn.subVectors(i,t),ui.subVectors(n,t),na.subVectors(e,t);const a=Yn.dot(Yn),o=Yn.dot(ui),c=Yn.dot(na),l=ui.dot(ui),u=ui.dot(na),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;const f=1/h,d=(l*c-o*u)*f,g=(a*u-o*c)*f;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,fi)===null?!1:fi.x>=0&&fi.y>=0&&fi.x+fi.y<=1}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,fi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,fi.x),c.addScaledVector(a,fi.y),c.addScaledVector(o,fi.z),c)}static getInterpolatedAttribute(e,t,n,i,r,a){return aa.setScalar(0),oa.setScalar(0),ca.setScalar(0),aa.fromBufferAttribute(e,t),oa.fromBufferAttribute(e,n),ca.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(aa,r.x),a.addScaledVector(oa,r.y),a.addScaledVector(ca,r.z),a}static isFrontFacing(e,t,n,i){return Yn.subVectors(n,t),ui.subVectors(e,t),Yn.cross(ui).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yn.subVectors(this.c,this.b),ui.subVectors(this.a,this.b),Yn.cross(ui).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Vn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return Vn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return Vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;Zi.subVectors(i,n),Qi.subVectors(r,n),ia.subVectors(e,n);const c=Zi.dot(ia),l=Qi.dot(ia);if(c<=0&&l<=0)return t.copy(n);sa.subVectors(e,i);const u=Zi.dot(sa),h=Qi.dot(sa);if(u>=0&&h<=u)return t.copy(i);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(Zi,a);ra.subVectors(e,r);const d=Zi.dot(ra),g=Qi.dot(ra);if(g>=0&&d<=g)return t.copy(r);const b=d*l-c*g;if(b<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(Qi,o);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return Co.subVectors(r,i),o=(h-u)/(h-u+(d-g)),t.copy(i).addScaledVector(Co,o);const p=1/(m+b+f);return a=b*p,o=f*p,t.copy(n).addScaledVector(Zi,a).addScaledVector(Qi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Qc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yi={h:0,s:0,l:0},ar={h:0,s:0,l:0};function la(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class rt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ot.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Ot.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ot.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Ot.workingColorSpace){if(e=Ya(e,1),t=dn(t,0,1),n=dn(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=la(a,r,e+1/3),this.g=la(a,r,e),this.b=la(a,r,e-1/3)}return Ot.toWorkingColorSpace(this,i),this}setStyle(e,t=Ht){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ht){const n=Qc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=bi(e.r),this.g=bi(e.g),this.b=bi(e.b),this}copyLinearToSRGB(e){return this.r=ls(e.r),this.g=ls(e.g),this.b=ls(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ht){return Ot.fromWorkingColorSpace(yn.copy(this),e),Math.round(dn(yn.r*255,0,255))*65536+Math.round(dn(yn.g*255,0,255))*256+Math.round(dn(yn.b*255,0,255))}getHexString(e=Ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ot.workingColorSpace){Ot.fromWorkingColorSpace(yn.copy(this),t);const n=yn.r,i=yn.g,r=yn.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(i-r)/h+(i<r?6:0);break;case i:c=(r-n)/h+2;break;case r:c=(n-i)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Ot.workingColorSpace){return Ot.fromWorkingColorSpace(yn.copy(this),t),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=Ht){Ot.fromWorkingColorSpace(yn.copy(this),e);const t=yn.r,n=yn.g,i=yn.b;return e!==Ht?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(yi),this.setHSL(yi.h+e,yi.s+t,yi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(yi),e.getHSL(ar);const n=Bs(yi.h,ar.h,t),i=Bs(yi.s,ar.s,t),r=Bs(yi.l,ar.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const yn=new rt;rt.NAMES=Qc;let hh=0;class Xn extends gs{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hh++}),this.uuid=Zn(),this.name="",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new rt(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class _n extends Xn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const un=new F,or=new De;class jt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)or.fromBufferAttribute(this,t),or.applyMatrix3(e),this.setXY(t,or.x,or.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyMatrix3(e),this.setXYZ(t,un.x,un.y,un.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyMatrix4(e),this.setXYZ(t,un.x,un.y,un.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyNormalMatrix(e),this.setXYZ(t,un.x,un.y,un.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.transformDirection(e),this.setXYZ(t,un.x,un.y,un.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Jn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Wt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Jn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Jn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Jn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Jn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),i=Wt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),i=Wt(i,this.array),r=Wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}}class $c extends jt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class el extends jt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class kt extends jt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let uh=0;const Gn=new gt,ha=new nn,$i=new F,Un=new En,Es=new En,bn=new F;class Jt extends gs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:uh++}),this.uuid=Zn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Kc(e)?el:$c)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Pt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Gn.makeRotationFromQuaternion(e),this.applyMatrix4(Gn),this}rotateX(e){return Gn.makeRotationX(e),this.applyMatrix4(Gn),this}rotateY(e){return Gn.makeRotationY(e),this.applyMatrix4(Gn),this}rotateZ(e){return Gn.makeRotationZ(e),this.applyMatrix4(Gn),this}translate(e,t,n){return Gn.makeTranslation(e,t,n),this.applyMatrix4(Gn),this}scale(e,t,n){return Gn.makeScale(e,t,n),this.applyMatrix4(Gn),this}lookAt(e){return ha.lookAt(e),ha.updateMatrix(),this.applyMatrix4(ha.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($i).negate(),this.translate($i.x,$i.y,$i.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new kt(n,3))}else{for(let n=0,i=t.count;n<i;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new En);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];Un.setFromBufferAttribute(r),this.morphTargetsRelative?(bn.addVectors(this.boundingBox.min,Un.min),this.boundingBox.expandByPoint(bn),bn.addVectors(this.boundingBox.max,Un.max),this.boundingBox.expandByPoint(bn)):(this.boundingBox.expandByPoint(Un.min),this.boundingBox.expandByPoint(Un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ii);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const n=this.boundingSphere.center;if(Un.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Es.setFromBufferAttribute(o),this.morphTargetsRelative?(bn.addVectors(Un.min,Es.min),Un.expandByPoint(bn),bn.addVectors(Un.max,Es.max),Un.expandByPoint(bn)):(Un.expandByPoint(Es.min),Un.expandByPoint(Es.max))}Un.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)bn.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(bn));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)bn.fromBufferAttribute(o,l),c&&($i.fromBufferAttribute(e,l),bn.add($i)),i=Math.max(i,n.distanceToSquared(bn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new jt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let w=0;w<n.count;w++)o[w]=new F,c[w]=new F;const l=new F,u=new F,h=new F,f=new De,d=new De,g=new De,b=new F,m=new F;function p(w,y,x){l.fromBufferAttribute(n,w),u.fromBufferAttribute(n,y),h.fromBufferAttribute(n,x),f.fromBufferAttribute(r,w),d.fromBufferAttribute(r,y),g.fromBufferAttribute(r,x),u.sub(l),h.sub(l),d.sub(f),g.sub(f);const D=1/(d.x*g.y-g.x*d.y);isFinite(D)&&(b.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(D),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(D),o[w].add(b),o[y].add(b),o[x].add(b),c[w].add(m),c[y].add(m),c[x].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let w=0,y=v.length;w<y;++w){const x=v[w],D=x.start,k=x.count;for(let z=D,Y=D+k;z<Y;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const M=new F,_=new F,I=new F,R=new F;function T(w){I.fromBufferAttribute(i,w),R.copy(I);const y=o[w];M.copy(y),M.sub(I.multiplyScalar(I.dot(y))).normalize(),_.crossVectors(R,y);const D=_.dot(c[w])<0?-1:1;a.setXYZW(w,M.x,M.y,M.z,D)}for(let w=0,y=v.length;w<y;++w){const x=v[w],D=x.start,k=x.count;for(let z=D,Y=D+k;z<Y;z+=3)T(e.getX(z+0)),T(e.getX(z+1)),T(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new jt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new F,r=new F,a=new F,o=new F,c=new F,l=new F,u=new F,h=new F;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),b=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,b),a.fromBufferAttribute(t,m),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,b),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(b,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)i.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)bn.fromBufferAttribute(e,t),bn.normalize(),e.setXYZ(t,bn.x,bn.y,bn.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,h=o.normalized,f=new l.constructor(c.length*u);let d=0,g=0;for(let b=0,m=c.length;b<m;b++){o.isInterleavedBufferAttribute?d=c[b]*o.data.stride+o.offset:d=c[b]*u;for(let p=0;p<u;p++)f[g++]=l[d++]}return new jt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Jt,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const f=l[u],d=e(f,n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const d=l[h];u.push(d.toJSON(e.data))}u.length>0&&(i[c]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const l in i){const u=i[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],h=r[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Po=new gt,Ii=new kr,cr=new ii,Lo=new F,lr=new F,hr=new F,ur=new F,ua=new F,fr=new F,Do=new F,dr=new F;class Je extends nn{constructor(e=new Jt,t=new _n){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){fr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(ua.fromBufferAttribute(h,e),a?fr.addScaledVector(ua,u):fr.addScaledVector(ua.sub(t),u))}t.add(fr)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),cr.copy(n.boundingSphere),cr.applyMatrix4(r),Ii.copy(e.ray).recast(e.near),!(cr.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(cr,Lo)===null||Ii.origin.distanceToSquared(Lo)>(e.far-e.near)**2))&&(Po.copy(r).invert(),Ii.copy(e.ray).applyMatrix4(Po),!(n.boundingBox!==null&&Ii.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ii)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,b=f.length;g<b;g++){const m=f[g],p=a[m.materialIndex],v=Math.max(m.start,d.start),M=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let _=v,I=M;_<I;_+=3){const R=o.getX(_),T=o.getX(_+1),w=o.getX(_+2);i=pr(this,p,e,n,l,u,h,R,T,w),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),b=Math.min(o.count,d.start+d.count);for(let m=g,p=b;m<p;m+=3){const v=o.getX(m),M=o.getX(m+1),_=o.getX(m+2);i=pr(this,a,e,n,l,u,h,v,M,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,b=f.length;g<b;g++){const m=f[g],p=a[m.materialIndex],v=Math.max(m.start,d.start),M=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let _=v,I=M;_<I;_+=3){const R=_,T=_+1,w=_+2;i=pr(this,p,e,n,l,u,h,R,T,w),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),b=Math.min(c.count,d.start+d.count);for(let m=g,p=b;m<p;m+=3){const v=m,M=m+1,_=m+2;i=pr(this,a,e,n,l,u,h,v,M,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function fh(s,e,t,n,i,r,a,o){let c;if(e.side===1?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===0,o),c===null)return null;dr.copy(o),dr.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(dr);return l<t.near||l>t.far?null:{distance:l,point:dr.clone(),object:s}}function pr(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,lr),s.getVertexPosition(c,hr),s.getVertexPosition(l,ur);const u=fh(s,e,t,n,lr,hr,ur,Do);if(u){const h=new F;Vn.getBarycoord(Do,lr,hr,ur,h),i&&(u.uv=Vn.getInterpolatedAttribute(i,o,c,l,h,new De)),r&&(u.uv1=Vn.getInterpolatedAttribute(r,o,c,l,h,new De)),a&&(u.normal=Vn.getInterpolatedAttribute(a,o,c,l,h,new F),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new F,materialIndex:0};Vn.getNormal(lr,hr,ur,f.normal),u.face=f,u.barycoord=h}return u}class Qt extends Jt{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new kt(l,3)),this.setAttribute("normal",new kt(u,3)),this.setAttribute("uv",new kt(h,2));function g(b,m,p,v,M,_,I,R,T,w,y){const x=_/T,D=I/w,k=_/2,z=I/2,Y=R/2,se=T+1,N=w+1;let Z=0,q=0;const ce=new F;for(let J=0;J<N;J++){const re=J*D-z;for(let Ee=0;Ee<se;Ee++){const ze=Ee*x-k;ce[b]=ze*v,ce[m]=re*M,ce[p]=Y,l.push(ce.x,ce.y,ce.z),ce[b]=0,ce[m]=0,ce[p]=R>0?1:-1,u.push(ce.x,ce.y,ce.z),h.push(Ee/T),h.push(1-J/w),Z+=1}}for(let J=0;J<w;J++)for(let re=0;re<T;re++){const Ee=f+re+se*J,ze=f+re+se*(J+1),oe=f+(re+1)+se*(J+1),de=f+(re+1)+se*J;c.push(Ee,ze,de),c.push(ze,oe,de),q+=6}o.addGroup(d,q,y),d+=q,f+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function fs(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Rn(s){const e={};for(let t=0;t<s.length;t++){const n=fs(s[t]);for(const i in n)e[i]=n[i]}return e}function dh(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function tl(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ot.workingColorSpace}const ph={clone:fs,merge:Rn};var mh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ci extends Xn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mh,this.fragmentShader=gh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=fs(e.uniforms),this.uniformsGroups=dh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class nl extends nn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new gt,this.projectionMatrix=new gt,this.projectionMatrixInverse=new gt,this.coordinateSystem=2e3}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Si=new F,Io=new De,Fo=new De;class Ln extends nl{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=us*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Os*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return us*2*Math.atan(Math.tan(Os*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Si.x,Si.y).multiplyScalar(-e/Si.z),Si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Si.x,Si.y).multiplyScalar(-e/Si.z)}getViewSize(e,t){return this.getViewBounds(e,Io,Fo),t.subVectors(Fo,Io)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Os*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const es=-90,ts=1;class bh extends nn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ln(es,ts,e,t);i.layers=this.layers,this.add(i);const r=new Ln(es,ts,e,t);r.layers=this.layers,this.add(r);const a=new Ln(es,ts,e,t);a.layers=this.layers,this.add(a);const o=new Ln(es,ts,e,t);o.layers=this.layers,this.add(o);const c=new Ln(es,ts,e,t);c.layers=this.layers,this.add(c);const l=new Ln(es,ts,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const b=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=b,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class il extends fn{constructor(e,t,n,i,r,a,o,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:301,super(e,t,n,i,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class _h extends Ri{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new il(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:1006}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Qt(5,5,5),r=new Ci({name:"CubemapFromEquirect",uniforms:fs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});r.uniforms.tEquirect.value=t;const a=new Je(i,r),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=1006),new bh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}const fa=new F,xh=new F,vh=new Pt;class zi{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=fa.subVectors(n,t).cross(xh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(fa),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||vh.getNormalMatrix(e),i=this.coplanarPoint(fa).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Fi=new ii,mr=new F;class Ja{constructor(e=new zi,t=new zi,n=new zi,i=new zi,r=new zi,a=new zi){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3){const n=this.planes,i=e.elements,r=i[0],a=i[1],o=i[2],c=i[3],l=i[4],u=i[5],h=i[6],f=i[7],d=i[8],g=i[9],b=i[10],m=i[11],p=i[12],v=i[13],M=i[14],_=i[15];if(n[0].setComponents(c-r,f-l,m-d,_-p).normalize(),n[1].setComponents(c+r,f+l,m+d,_+p).normalize(),n[2].setComponents(c+a,f+u,m+g,_+v).normalize(),n[3].setComponents(c-a,f-u,m-g,_-v).normalize(),n[4].setComponents(c-o,f-h,m-b,_-M).normalize(),t===2e3)n[5].setComponents(c+o,f+h,m+b,_+M).normalize();else if(t===2001)n[5].setComponents(o,h,b,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Fi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Fi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Fi)}intersectsSprite(e){return Fi.center.set(0,0,0),Fi.radius=.7071067811865476,Fi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(mr.x=i.normal.x>0?e.max.x:e.min.x,mr.y=i.normal.y>0?e.max.y:e.min.y,mr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(mr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function sl(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Mh(s){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,h=l.byteLength,f=s.createBuffer();s.bindBuffer(c,f),s.bufferData(c,l,u),o.onUploadCallback();let d;if(l instanceof Float32Array)d=s.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=s.SHORT;else if(l instanceof Uint32Array)d=s.UNSIGNED_INT;else if(l instanceof Int32Array)d=s.INT;else if(l instanceof Int8Array)d=s.BYTE;else if(l instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c.updateRanges;if(s.bindBuffer(l,o),h.length===0)s.bufferSubData(l,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],b=h[d];b.start<=g.start+g.count+1?g.count=Math.max(g.count,b.start+b.count-g.start):(++f,h[f]=b)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const b=h[d];s.bufferSubData(l,b.start*u.BYTES_PER_ELEMENT,u,b.start,b.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(s.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}class Bn extends Jt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,u=c+1,h=e/o,f=t/c,d=[],g=[],b=[],m=[];for(let p=0;p<u;p++){const v=p*f-a;for(let M=0;M<l;M++){const _=M*h-r;g.push(_,-v,0),b.push(0,0,1),m.push(M/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<o;v++){const M=v+l*p,_=v+l*(p+1),I=v+1+l*(p+1),R=v+1+l*p;d.push(M,_,R),d.push(_,I,R)}this.setIndex(d),this.setAttribute("position",new kt(g,3)),this.setAttribute("normal",new kt(b,3)),this.setAttribute("uv",new kt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bn(e.width,e.height,e.widthSegments,e.heightSegments)}}var yh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sh=`#ifdef USE_ALPHAHASH
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
#endif`,Eh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Th=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ah=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rh=`#ifdef USE_AOMAP
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
#endif`,Ch=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ph=`#ifdef USE_BATCHING
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
#endif`,Lh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Dh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ih=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Nh=`#ifdef USE_IRIDESCENCE
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
#endif`,Uh=`#ifdef USE_BUMPMAP
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
#endif`,Oh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Bh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,kh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Hh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Vh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Wh=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Xh=`#define PI 3.141592653589793
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
} // validated`,jh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,qh=`vec3 transformedNormal = objectNormal;
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
#endif`,Kh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Jh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qh="gl_FragColor = linearToOutputTexel( gl_FragColor );",$h=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,eu=`#ifdef USE_ENVMAP
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
#endif`,tu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,nu=`#ifdef USE_ENVMAP
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
#endif`,iu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,su=`#ifdef USE_ENVMAP
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
#endif`,ru=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,au=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ou=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lu=`#ifdef USE_GRADIENTMAP
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
}`,hu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,uu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,du=`uniform bool receiveShadow;
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
#endif`,pu=`#ifdef USE_ENVMAP
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
#endif`,mu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,bu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_u=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xu=`PhysicalMaterial material;
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
#endif`,vu=`struct PhysicalMaterial {
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
}`,Mu=`
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
#endif`,yu=`#if defined( RE_IndirectDiffuse )
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
#endif`,Su=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Eu=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tu=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Au=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wu=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ru=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Lu=`#if defined( USE_POINTS_UV )
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
#endif`,Du=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Iu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Nu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Uu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ou=`#ifdef USE_MORPHTARGETS
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
#endif`,Bu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ku=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,zu=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Gu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Wu=`#ifdef USE_NORMALMAP
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
#endif`,Xu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ju=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ku=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ju=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Zu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$u=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ef=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,af=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,of=`float getShadowMask() {
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
}`,cf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lf=`#ifdef USE_SKINNING
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
#endif`,hf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,uf=`#ifdef USE_SKINNING
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
#endif`,ff=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,df=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,gf=`#ifdef USE_TRANSMISSION
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
#endif`,bf=`#ifdef USE_TRANSMISSION
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
#endif`,_f=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const yf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sf=`uniform sampler2D t2D;
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
}`,Ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Af=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rf=`#include <common>
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
}`,Cf=`#if DEPTH_PACKING == 3200
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
}`,Pf=`#define DISTANCE
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
}`,Lf=`#define DISTANCE
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
}`,Df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,If=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ff=`uniform float scale;
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
}`,Nf=`uniform vec3 diffuse;
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
}`,Uf=`#include <common>
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
}`,Of=`uniform vec3 diffuse;
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
}`,Bf=`#define LAMBERT
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
}`,kf=`#define LAMBERT
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
}`,zf=`#define MATCAP
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
}`,Gf=`#define MATCAP
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
}`,Hf=`#define NORMAL
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
}`,Vf=`#define NORMAL
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
}`,Wf=`#define PHONG
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
}`,Xf=`#define PHONG
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
}`,jf=`#define STANDARD
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
}`,qf=`#define STANDARD
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
}`,Kf=`#define TOON
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
}`,Yf=`#define TOON
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
}`,Jf=`uniform float size;
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
}`,Zf=`uniform vec3 diffuse;
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
}`,Qf=`#include <common>
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
}`,$f=`uniform vec3 color;
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
}`,ed=`uniform float rotation;
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
}`,td=`uniform vec3 diffuse;
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
}`,Dt={alphahash_fragment:yh,alphahash_pars_fragment:Sh,alphamap_fragment:Eh,alphamap_pars_fragment:Th,alphatest_fragment:Ah,alphatest_pars_fragment:wh,aomap_fragment:Rh,aomap_pars_fragment:Ch,batching_pars_vertex:Ph,batching_vertex:Lh,begin_vertex:Dh,beginnormal_vertex:Ih,bsdfs:Fh,iridescence_fragment:Nh,bumpmap_pars_fragment:Uh,clipping_planes_fragment:Oh,clipping_planes_pars_fragment:Bh,clipping_planes_pars_vertex:kh,clipping_planes_vertex:zh,color_fragment:Gh,color_pars_fragment:Hh,color_pars_vertex:Vh,color_vertex:Wh,common:Xh,cube_uv_reflection_fragment:jh,defaultnormal_vertex:qh,displacementmap_pars_vertex:Kh,displacementmap_vertex:Yh,emissivemap_fragment:Jh,emissivemap_pars_fragment:Zh,colorspace_fragment:Qh,colorspace_pars_fragment:$h,envmap_fragment:eu,envmap_common_pars_fragment:tu,envmap_pars_fragment:nu,envmap_pars_vertex:iu,envmap_physical_pars_fragment:pu,envmap_vertex:su,fog_vertex:ru,fog_pars_vertex:au,fog_fragment:ou,fog_pars_fragment:cu,gradientmap_pars_fragment:lu,lightmap_pars_fragment:hu,lights_lambert_fragment:uu,lights_lambert_pars_fragment:fu,lights_pars_begin:du,lights_toon_fragment:mu,lights_toon_pars_fragment:gu,lights_phong_fragment:bu,lights_phong_pars_fragment:_u,lights_physical_fragment:xu,lights_physical_pars_fragment:vu,lights_fragment_begin:Mu,lights_fragment_maps:yu,lights_fragment_end:Su,logdepthbuf_fragment:Eu,logdepthbuf_pars_fragment:Tu,logdepthbuf_pars_vertex:Au,logdepthbuf_vertex:wu,map_fragment:Ru,map_pars_fragment:Cu,map_particle_fragment:Pu,map_particle_pars_fragment:Lu,metalnessmap_fragment:Du,metalnessmap_pars_fragment:Iu,morphinstance_vertex:Fu,morphcolor_vertex:Nu,morphnormal_vertex:Uu,morphtarget_pars_vertex:Ou,morphtarget_vertex:Bu,normal_fragment_begin:ku,normal_fragment_maps:zu,normal_pars_fragment:Gu,normal_pars_vertex:Hu,normal_vertex:Vu,normalmap_pars_fragment:Wu,clearcoat_normal_fragment_begin:Xu,clearcoat_normal_fragment_maps:ju,clearcoat_pars_fragment:qu,iridescence_pars_fragment:Ku,opaque_fragment:Yu,packing:Ju,premultiplied_alpha_fragment:Zu,project_vertex:Qu,dithering_fragment:$u,dithering_pars_fragment:ef,roughnessmap_fragment:tf,roughnessmap_pars_fragment:nf,shadowmap_pars_fragment:sf,shadowmap_pars_vertex:rf,shadowmap_vertex:af,shadowmask_pars_fragment:of,skinbase_vertex:cf,skinning_pars_vertex:lf,skinning_vertex:hf,skinnormal_vertex:uf,specularmap_fragment:ff,specularmap_pars_fragment:df,tonemapping_fragment:pf,tonemapping_pars_fragment:mf,transmission_fragment:gf,transmission_pars_fragment:bf,uv_pars_fragment:_f,uv_pars_vertex:xf,uv_vertex:vf,worldpos_vertex:Mf,background_vert:yf,background_frag:Sf,backgroundCube_vert:Ef,backgroundCube_frag:Tf,cube_vert:Af,cube_frag:wf,depth_vert:Rf,depth_frag:Cf,distanceRGBA_vert:Pf,distanceRGBA_frag:Lf,equirect_vert:Df,equirect_frag:If,linedashed_vert:Ff,linedashed_frag:Nf,meshbasic_vert:Uf,meshbasic_frag:Of,meshlambert_vert:Bf,meshlambert_frag:kf,meshmatcap_vert:zf,meshmatcap_frag:Gf,meshnormal_vert:Hf,meshnormal_frag:Vf,meshphong_vert:Wf,meshphong_frag:Xf,meshphysical_vert:jf,meshphysical_frag:qf,meshtoon_vert:Kf,meshtoon_frag:Yf,points_vert:Jf,points_frag:Zf,shadow_vert:Qf,shadow_frag:$f,sprite_vert:ed,sprite_frag:td},Ue={common:{diffuse:{value:new rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Pt}},envmap:{envMap:{value:null},envMapRotation:{value:new Pt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Pt},normalScale:{value:new De(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0},uvTransform:{value:new Pt}},sprite:{diffuse:{value:new rt(16777215)},opacity:{value:1},center:{value:new De(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}}},ti={basic:{uniforms:Rn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.fog]),vertexShader:Dt.meshbasic_vert,fragmentShader:Dt.meshbasic_frag},lambert:{uniforms:Rn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new rt(0)}}]),vertexShader:Dt.meshlambert_vert,fragmentShader:Dt.meshlambert_frag},phong:{uniforms:Rn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new rt(0)},specular:{value:new rt(1118481)},shininess:{value:30}}]),vertexShader:Dt.meshphong_vert,fragmentShader:Dt.meshphong_frag},standard:{uniforms:Rn([Ue.common,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.roughnessmap,Ue.metalnessmap,Ue.fog,Ue.lights,{emissive:{value:new rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Dt.meshphysical_vert,fragmentShader:Dt.meshphysical_frag},toon:{uniforms:Rn([Ue.common,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.gradientmap,Ue.fog,Ue.lights,{emissive:{value:new rt(0)}}]),vertexShader:Dt.meshtoon_vert,fragmentShader:Dt.meshtoon_frag},matcap:{uniforms:Rn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,{matcap:{value:null}}]),vertexShader:Dt.meshmatcap_vert,fragmentShader:Dt.meshmatcap_frag},points:{uniforms:Rn([Ue.points,Ue.fog]),vertexShader:Dt.points_vert,fragmentShader:Dt.points_frag},dashed:{uniforms:Rn([Ue.common,Ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Dt.linedashed_vert,fragmentShader:Dt.linedashed_frag},depth:{uniforms:Rn([Ue.common,Ue.displacementmap]),vertexShader:Dt.depth_vert,fragmentShader:Dt.depth_frag},normal:{uniforms:Rn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,{opacity:{value:1}}]),vertexShader:Dt.meshnormal_vert,fragmentShader:Dt.meshnormal_frag},sprite:{uniforms:Rn([Ue.sprite,Ue.fog]),vertexShader:Dt.sprite_vert,fragmentShader:Dt.sprite_frag},background:{uniforms:{uvTransform:{value:new Pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Dt.background_vert,fragmentShader:Dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Pt}},vertexShader:Dt.backgroundCube_vert,fragmentShader:Dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Dt.cube_vert,fragmentShader:Dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Dt.equirect_vert,fragmentShader:Dt.equirect_frag},distanceRGBA:{uniforms:Rn([Ue.common,Ue.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Dt.distanceRGBA_vert,fragmentShader:Dt.distanceRGBA_frag},shadow:{uniforms:Rn([Ue.lights,Ue.fog,{color:{value:new rt(0)},opacity:{value:1}}]),vertexShader:Dt.shadow_vert,fragmentShader:Dt.shadow_frag}};ti.physical={uniforms:Rn([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Pt},clearcoatNormalScale:{value:new De(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Pt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Pt},sheen:{value:0},sheenColor:{value:new rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Pt},transmissionSamplerSize:{value:new De},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Pt},attenuationDistance:{value:0},attenuationColor:{value:new rt(0)},specularColor:{value:new rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Pt},anisotropyVector:{value:new De},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Pt}}]),vertexShader:Dt.meshphysical_vert,fragmentShader:Dt.meshphysical_frag};const gr={r:0,b:0,g:0},Ni=new kn,nd=new gt;function id(s,e,t,n,i,r,a){const o=new rt(0);let c=r===!0?0:1,l,u,h=null,f=0,d=null;function g(v){let M=v.isScene===!0?v.background:null;return M&&M.isTexture&&(M=(v.backgroundBlurriness>0?t:e).get(M)),M}function b(v){let M=!1;const _=g(v);_===null?p(o,c):_&&_.isColor&&(p(_,1),M=!0);const I=s.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,a):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(v,M){const _=g(M);_&&(_.isCubeTexture||_.mapping===306)?(u===void 0&&(u=new Je(new Qt(1,1,1),new Ci({name:"BackgroundCubeMaterial",uniforms:fs(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(I,R,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Ni.copy(M.backgroundRotation),Ni.x*=-1,Ni.y*=-1,Ni.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ni.y*=-1,Ni.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(nd.makeRotationFromEuler(Ni)),u.material.toneMapped=Ot.getTransfer(_.colorSpace)!==Yt,(h!==_||f!==_.version||d!==s.toneMapping)&&(u.material.needsUpdate=!0,h=_,f=_.version,d=s.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Je(new Bn(2,2),new Ci({name:"BackgroundMaterial",uniforms:fs(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Ot.getTransfer(_.colorSpace)!==Yt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||f!==_.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=_,f=_.version,d=s.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,M){v.getRGB(gr,tl(s)),n.buffers.color.setClear(gr.r,gr.g,gr.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(v,M=1){o.set(v),c=M,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,p(o,c)},render:b,addToRenderList:m}}function sd(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null);let r=i,a=!1;function o(x,D,k,z,Y){let se=!1;const N=h(z,k,D);r!==N&&(r=N,l(r.object)),se=d(x,z,k,Y),se&&g(x,z,k,Y),Y!==null&&e.update(Y,s.ELEMENT_ARRAY_BUFFER),(se||a)&&(a=!1,_(x,D,k,z),Y!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function c(){return s.createVertexArray()}function l(x){return s.bindVertexArray(x)}function u(x){return s.deleteVertexArray(x)}function h(x,D,k){const z=k.wireframe===!0;let Y=n[x.id];Y===void 0&&(Y={},n[x.id]=Y);let se=Y[D.id];se===void 0&&(se={},Y[D.id]=se);let N=se[z];return N===void 0&&(N=f(c()),se[z]=N),N}function f(x){const D=[],k=[],z=[];for(let Y=0;Y<t;Y++)D[Y]=0,k[Y]=0,z[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:k,attributeDivisors:z,object:x,attributes:{},index:null}}function d(x,D,k,z){const Y=r.attributes,se=D.attributes;let N=0;const Z=k.getAttributes();for(const q in Z)if(Z[q].location>=0){const J=Y[q];let re=se[q];if(re===void 0&&(q==="instanceMatrix"&&x.instanceMatrix&&(re=x.instanceMatrix),q==="instanceColor"&&x.instanceColor&&(re=x.instanceColor)),J===void 0||J.attribute!==re||re&&J.data!==re.data)return!0;N++}return r.attributesNum!==N||r.index!==z}function g(x,D,k,z){const Y={},se=D.attributes;let N=0;const Z=k.getAttributes();for(const q in Z)if(Z[q].location>=0){let J=se[q];J===void 0&&(q==="instanceMatrix"&&x.instanceMatrix&&(J=x.instanceMatrix),q==="instanceColor"&&x.instanceColor&&(J=x.instanceColor));const re={};re.attribute=J,J&&J.data&&(re.data=J.data),Y[q]=re,N++}r.attributes=Y,r.attributesNum=N,r.index=z}function b(){const x=r.newAttributes;for(let D=0,k=x.length;D<k;D++)x[D]=0}function m(x){p(x,0)}function p(x,D){const k=r.newAttributes,z=r.enabledAttributes,Y=r.attributeDivisors;k[x]=1,z[x]===0&&(s.enableVertexAttribArray(x),z[x]=1),Y[x]!==D&&(s.vertexAttribDivisor(x,D),Y[x]=D)}function v(){const x=r.newAttributes,D=r.enabledAttributes;for(let k=0,z=D.length;k<z;k++)D[k]!==x[k]&&(s.disableVertexAttribArray(k),D[k]=0)}function M(x,D,k,z,Y,se,N){N===!0?s.vertexAttribIPointer(x,D,k,Y,se):s.vertexAttribPointer(x,D,k,z,Y,se)}function _(x,D,k,z){b();const Y=z.attributes,se=k.getAttributes(),N=D.defaultAttributeValues;for(const Z in se){const q=se[Z];if(q.location>=0){let ce=Y[Z];if(ce===void 0&&(Z==="instanceMatrix"&&x.instanceMatrix&&(ce=x.instanceMatrix),Z==="instanceColor"&&x.instanceColor&&(ce=x.instanceColor)),ce!==void 0){const J=ce.normalized,re=ce.itemSize,Ee=e.get(ce);if(Ee===void 0)continue;const ze=Ee.buffer,oe=Ee.type,de=Ee.bytesPerElement,_e=oe===s.INT||oe===s.UNSIGNED_INT||ce.gpuType===1013;if(ce.isInterleavedBufferAttribute){const ge=ce.data,He=ge.stride,Ne=ce.offset;if(ge.isInstancedInterleavedBuffer){for(let Ze=0;Ze<q.locationSize;Ze++)p(q.location+Ze,ge.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let Ze=0;Ze<q.locationSize;Ze++)m(q.location+Ze);s.bindBuffer(s.ARRAY_BUFFER,ze);for(let Ze=0;Ze<q.locationSize;Ze++)M(q.location+Ze,re/q.locationSize,oe,J,He*de,(Ne+re/q.locationSize*Ze)*de,_e)}else{if(ce.isInstancedBufferAttribute){for(let ge=0;ge<q.locationSize;ge++)p(q.location+ge,ce.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let ge=0;ge<q.locationSize;ge++)m(q.location+ge);s.bindBuffer(s.ARRAY_BUFFER,ze);for(let ge=0;ge<q.locationSize;ge++)M(q.location+ge,re/q.locationSize,oe,J,re*de,re/q.locationSize*ge*de,_e)}}else if(N!==void 0){const J=N[Z];if(J!==void 0)switch(J.length){case 2:s.vertexAttrib2fv(q.location,J);break;case 3:s.vertexAttrib3fv(q.location,J);break;case 4:s.vertexAttrib4fv(q.location,J);break;default:s.vertexAttrib1fv(q.location,J)}}}}v()}function I(){w();for(const x in n){const D=n[x];for(const k in D){const z=D[k];for(const Y in z)u(z[Y].object),delete z[Y];delete D[k]}delete n[x]}}function R(x){if(n[x.id]===void 0)return;const D=n[x.id];for(const k in D){const z=D[k];for(const Y in z)u(z[Y].object),delete z[Y];delete D[k]}delete n[x.id]}function T(x){for(const D in n){const k=n[D];if(k[x.id]===void 0)continue;const z=k[x.id];for(const Y in z)u(z[Y].object),delete z[Y];delete k[x.id]}}function w(){y(),a=!0,r!==i&&(r=i,l(r.object))}function y(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:w,resetDefaultState:y,dispose:I,releaseStatesOfGeometry:R,releaseStatesOfProgram:T,initAttributes:b,enableAttribute:m,disableUnusedAttributes:v}}function rd(s,e,t){let n;function i(l){n=l}function r(l,u){s.drawArrays(n,l,u),t.update(u,n,1)}function a(l,u,h){h!==0&&(s.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function o(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];t.update(d,n,1)}function c(l,u,h,f){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)a(l[g],u[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,h);let g=0;for(let b=0;b<h;b++)g+=u[b]*f[b];t.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function ad(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(T){return!(T!==1023&&n.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const w=T===1016&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==1009&&n.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==1015&&!w)}function c(T){if(T==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,R=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:b,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:_,vertexTextures:I,maxSamples:R}}function od(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new zi,o=new Pt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,b=h.clipIntersection,m=h.clipShadows,p=s.get(h);if(!i||g===null||g.length===0||r&&!m)r?u(null):l();else{const v=r?0:n,M=v*4;let _=p.clippingState||null;c.value=_,_=u(g,f,M,d);for(let I=0;I!==M;++I)_[I]=t[I];p.clippingState=_,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,g){const b=h!==null?h.length:0;let m=null;if(b!==0){if(m=c.value,g!==!0||m===null){const p=d+b*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,_=d;M!==b;++M,_+=4)a.copy(h[M]).applyMatrix4(v,o),a.normal.toArray(m,_),m[_+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,m}}function cd(s){let e=new WeakMap;function t(a,o){return o===303?a.mapping=301:o===304&&(a.mapping=302),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===303||o===304)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new _h(c.height);return l.fromEquirectangularTexture(s,a),e.set(a,l),a.addEventListener("dispose",i),t(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class zr extends nl{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const cs=4,No=[.125,.215,.35,.446,.526,.582],Hi=20,da=new zr,Uo=new rt;let pa=null,ma=0,ga=0,ba=!1;const Gi=(1+Math.sqrt(5))/2,ns=1/Gi,Oo=[new F(-Gi,ns,0),new F(Gi,ns,0),new F(-ns,0,Gi),new F(ns,0,Gi),new F(0,Gi,-ns),new F(0,Gi,ns),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)];class Bo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){pa=this._renderer.getRenderTarget(),ma=this._renderer.getActiveCubeFace(),ga=this._renderer.getActiveMipmapLevel(),ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Go(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(pa,ma,ga),this._renderer.xr.enabled=ba,e.scissorTest=!1,br(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),pa=this._renderer.getRenderTarget(),ma=this._renderer.getActiveCubeFace(),ga=this._renderer.getActiveMipmapLevel(),ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:Cn,depthBuffer:!1},i=ko(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ko(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ld(r)),this._blurMaterial=hd(r,e,t)}return i}_compileMaterial(e){const t=new Je(this._lodPlanes[0],e);this._renderer.compile(t,da)}_sceneToCubeUV(e,t,n,i){const o=new Ln(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Uo),u.toneMapping=0,u.autoClear=!1;const d=new _n({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),g=new Je(new Qt,d);let b=!1;const m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,b=!0):(d.color.copy(Uo),b=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):v===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));const M=this._cubeSize;br(i,v*M,p>2?M:0,M,M),u.setRenderTarget(i),b&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===301||e.mapping===302;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Go()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zo());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new Je(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;br(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,da)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Oo[(i-r-1)%Oo.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Je(this._lodPlanes[i],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Hi-1),b=r/g,m=isFinite(r)?1+Math.floor(u*b):Hi;m>Hi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Hi}`);const p=[];let v=0;for(let T=0;T<Hi;++T){const w=T/b,y=Math.exp(-w*w/2);p.push(y),T===0?v+=y:T<m&&(v+=2*y)}for(let T=0;T<p.length;T++)p[T]=p[T]/v;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-n;const _=this._sizeLods[i],I=3*_*(i>M-cs?i-M+cs:0),R=4*(this._cubeSize-_);br(t,I,R,3*_,2*_),c.setRenderTarget(t),c.render(h,da)}}function ld(s){const e=[],t=[],n=[];let i=s;const r=s-cs+1+No.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let c=1/o;a>s-cs?c=No[a-s+cs-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,b=3,m=2,p=1,v=new Float32Array(b*g*d),M=new Float32Array(m*g*d),_=new Float32Array(p*g*d);for(let R=0;R<d;R++){const T=R%3*2/3-1,w=R>2?0:-1,y=[T,w,0,T+2/3,w,0,T+2/3,w+1,0,T,w,0,T+2/3,w+1,0,T,w+1,0];v.set(y,b*g*R),M.set(f,m*g*R);const x=[R,R,R,R,R,R];_.set(x,p*g*R)}const I=new Jt;I.setAttribute("position",new jt(v,b)),I.setAttribute("uv",new jt(M,m)),I.setAttribute("faceIndex",new jt(_,p)),e.push(I),i>cs&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function ko(s,e,t){const n=new Ri(s,e,t);return n.texture.mapping=306,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function br(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function hd(s,e,t){const n=new Float32Array(Hi),i=new F(0,1,0);return new Ci({name:"SphericalGaussianBlur",defines:{n:Hi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Za(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function zo(){return new Ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Za(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Go(){return new Ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Za(){return`

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
	`}function ud(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===303||c===304,u=c===301||c===302;if(l||u){let h=e.get(o);const f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new Bo(s)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const d=o.image;return l&&d&&d.height>0||u&&d&&i(d)?(t===null&&(t=new Bo(s)),h=l?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function i(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function fd(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Ns("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function dd(s,e,t,n){const i={},r=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const b=f.morphAttributes[g];for(let m=0,p=b.length;m<p;m++)e.remove(b[m])}f.removeEventListener("dispose",a),delete i[f.id];const d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,t.memory.geometries++),f}function c(h){const f=h.attributes;for(const g in f)e.update(f[g],s.ARRAY_BUFFER);const d=h.morphAttributes;for(const g in d){const b=d[g];for(let m=0,p=b.length;m<p;m++)e.update(b[m],s.ARRAY_BUFFER)}}function l(h){const f=[],d=h.index,g=h.attributes.position;let b=0;if(d!==null){const v=d.array;b=d.version;for(let M=0,_=v.length;M<_;M+=3){const I=v[M+0],R=v[M+1],T=v[M+2];f.push(I,R,R,T,T,I)}}else if(g!==void 0){const v=g.array;b=g.version;for(let M=0,_=v.length/3-1;M<_;M+=3){const I=M+0,R=M+1,T=M+2;f.push(I,R,R,T,T,I)}}else return;const m=new(Kc(f)?el:$c)(f,1);m.version=b;const p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){const f=r.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function pd(s,e,t){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,d){s.drawElements(n,d,r,f*a),t.update(d,n,1)}function l(f,d,g){g!==0&&(s.drawElementsInstanced(n,d,r,f*a,g),t.update(d,n,g))}function u(f,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];t.update(m,n,1)}function h(f,d,g,b){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/a,d[p],b[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,b,0,g);let p=0;for(let v=0;v<g;v++)p+=d[v]*b[v];t.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function md(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function gd(s,e,t){const n=new WeakMap,i=new Bt;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(o);if(f===void 0||f.count!==h){let y=function(){T.dispose(),n.delete(o),o.removeEventListener("dispose",y)};f!==void 0&&f.texture.dispose();const d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,b=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let M=0;d===!0&&(M=1),g===!0&&(M=2),b===!0&&(M=3);let _=o.attributes.position.count*M,I=1;_>e.maxTextureSize&&(I=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);const R=new Float32Array(_*I*4*h),T=new Jc(R,_,I,h);T.type=1015,T.needsUpdate=!0;const w=M*4;for(let x=0;x<h;x++){const D=m[x],k=p[x],z=v[x],Y=_*I*4*x;for(let se=0;se<D.count;se++){const N=se*w;d===!0&&(i.fromBufferAttribute(D,se),R[Y+N+0]=i.x,R[Y+N+1]=i.y,R[Y+N+2]=i.z,R[Y+N+3]=0),g===!0&&(i.fromBufferAttribute(k,se),R[Y+N+4]=i.x,R[Y+N+5]=i.y,R[Y+N+6]=i.z,R[Y+N+7]=0),b===!0&&(i.fromBufferAttribute(z,se),R[Y+N+8]=i.x,R[Y+N+9]=i.y,R[Y+N+10]=i.z,R[Y+N+11]=z.itemSize===4?i.w:1)}}f={count:h,texture:T,size:new De(_,I)},n.set(o,f),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let d=0;for(let b=0;b<l.length;b++)d+=l[b];const g=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(s,"morphTargetBaseInfluence",g),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function bd(s,e,t,n){let i=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(i.get(h)!==l&&(e.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return h}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}class rl extends fn{constructor(e,t,n,i,r,a,o,c,l,u=1026){if(u!==1026&&u!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===1026&&(n=1014),n===void 0&&u===1027&&(n=1020),super(null,i,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:1003,this.minFilter=c!==void 0?c:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const al=new fn,Ho=new rl(1,1),ol=new Jc,cl=new nh,ll=new il,Vo=[],Wo=[],Xo=new Float32Array(16),jo=new Float32Array(9),qo=new Float32Array(4);function bs(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Vo[i];if(r===void 0&&(r=new Float32Array(i),Vo[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function pn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function mn(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Gr(s,e){let t=Wo[e];t===void 0&&(t=new Int32Array(e),Wo[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function _d(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function xd(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pn(t,e))return;s.uniform2fv(this.addr,e),mn(t,e)}}function vd(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pn(t,e))return;s.uniform3fv(this.addr,e),mn(t,e)}}function Md(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pn(t,e))return;s.uniform4fv(this.addr,e),mn(t,e)}}function yd(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(pn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),mn(t,e)}else{if(pn(t,n))return;qo.set(n),s.uniformMatrix2fv(this.addr,!1,qo),mn(t,n)}}function Sd(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(pn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),mn(t,e)}else{if(pn(t,n))return;jo.set(n),s.uniformMatrix3fv(this.addr,!1,jo),mn(t,n)}}function Ed(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(pn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),mn(t,e)}else{if(pn(t,n))return;Xo.set(n),s.uniformMatrix4fv(this.addr,!1,Xo),mn(t,n)}}function Td(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Ad(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pn(t,e))return;s.uniform2iv(this.addr,e),mn(t,e)}}function wd(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pn(t,e))return;s.uniform3iv(this.addr,e),mn(t,e)}}function Rd(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pn(t,e))return;s.uniform4iv(this.addr,e),mn(t,e)}}function Cd(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Pd(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pn(t,e))return;s.uniform2uiv(this.addr,e),mn(t,e)}}function Ld(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pn(t,e))return;s.uniform3uiv(this.addr,e),mn(t,e)}}function Dd(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pn(t,e))return;s.uniform4uiv(this.addr,e),mn(t,e)}}function Id(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Ho.compareFunction=515,r=Ho):r=al,t.setTexture2D(e||r,i)}function Fd(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||cl,i)}function Nd(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||ll,i)}function Ud(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||ol,i)}function Od(s){switch(s){case 5126:return _d;case 35664:return xd;case 35665:return vd;case 35666:return Md;case 35674:return yd;case 35675:return Sd;case 35676:return Ed;case 5124:case 35670:return Td;case 35667:case 35671:return Ad;case 35668:case 35672:return wd;case 35669:case 35673:return Rd;case 5125:return Cd;case 36294:return Pd;case 36295:return Ld;case 36296:return Dd;case 35678:case 36198:case 36298:case 36306:case 35682:return Id;case 35679:case 36299:case 36307:return Fd;case 35680:case 36300:case 36308:case 36293:return Nd;case 36289:case 36303:case 36311:case 36292:return Ud}}function Bd(s,e){s.uniform1fv(this.addr,e)}function kd(s,e){const t=bs(e,this.size,2);s.uniform2fv(this.addr,t)}function zd(s,e){const t=bs(e,this.size,3);s.uniform3fv(this.addr,t)}function Gd(s,e){const t=bs(e,this.size,4);s.uniform4fv(this.addr,t)}function Hd(s,e){const t=bs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Vd(s,e){const t=bs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Wd(s,e){const t=bs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Xd(s,e){s.uniform1iv(this.addr,e)}function jd(s,e){s.uniform2iv(this.addr,e)}function qd(s,e){s.uniform3iv(this.addr,e)}function Kd(s,e){s.uniform4iv(this.addr,e)}function Yd(s,e){s.uniform1uiv(this.addr,e)}function Jd(s,e){s.uniform2uiv(this.addr,e)}function Zd(s,e){s.uniform3uiv(this.addr,e)}function Qd(s,e){s.uniform4uiv(this.addr,e)}function $d(s,e,t){const n=this.cache,i=e.length,r=Gr(t,i);pn(n,r)||(s.uniform1iv(this.addr,r),mn(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||al,r[a])}function ep(s,e,t){const n=this.cache,i=e.length,r=Gr(t,i);pn(n,r)||(s.uniform1iv(this.addr,r),mn(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||cl,r[a])}function tp(s,e,t){const n=this.cache,i=e.length,r=Gr(t,i);pn(n,r)||(s.uniform1iv(this.addr,r),mn(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||ll,r[a])}function np(s,e,t){const n=this.cache,i=e.length,r=Gr(t,i);pn(n,r)||(s.uniform1iv(this.addr,r),mn(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||ol,r[a])}function ip(s){switch(s){case 5126:return Bd;case 35664:return kd;case 35665:return zd;case 35666:return Gd;case 35674:return Hd;case 35675:return Vd;case 35676:return Wd;case 5124:case 35670:return Xd;case 35667:case 35671:return jd;case 35668:case 35672:return qd;case 35669:case 35673:return Kd;case 5125:return Yd;case 36294:return Jd;case 36295:return Zd;case 36296:return Qd;case 35678:case 36198:case 36298:case 36306:case 35682:return $d;case 35679:case 36299:case 36307:return ep;case 35680:case 36300:case 36308:case 36293:return tp;case 36289:case 36303:case 36311:case 36292:return np}}class sp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Od(t.type)}}class rp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ip(t.type)}}class ap{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const _a=/(\w+)(\])?(\[|\.)?/g;function Ko(s,e){s.seq.push(e),s.map[e.id]=e}function op(s,e,t){const n=s.name,i=n.length;for(_a.lastIndex=0;;){const r=_a.exec(n),a=_a.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){Ko(t,l===void 0?new sp(o,s,e):new rp(o,s,e));break}else{let h=t.map[o];h===void 0&&(h=new ap(o),Ko(t,h)),t=h}}}class Fr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);op(r,a,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Yo(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const cp=37297;let lp=0;function hp(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Jo=new Pt;function up(s){Ot._getMatrix(Jo,Ot.workingColorSpace,s);const e=`mat3( ${Jo.elements.map(t=>t.toFixed(4))} )`;switch(Ot.getTransfer(s)){case Br:return[e,"LinearTransferOETF"];case Yt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Zo(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+hp(s.getShaderSource(e),a)}else return i}function fp(s,e){const t=up(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function dp(s,e){let t;switch(e){case 1:t="Linear";break;case 2:t="Reinhard";break;case 3:t="Cineon";break;case 4:t="ACESFilmic";break;case 6:t="AgX";break;case 7:t="Neutral";break;case 5:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const _r=new F;function pp(){Ot.getLuminanceCoefficients(_r);const s=_r.x.toFixed(4),e=_r.y.toFixed(4),t=_r.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function mp(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Us).join(`
`)}function gp(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function bp(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Us(s){return s!==""}function Qo(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function $o(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const _p=/^[ \t]*#include +<([\w\d./]+)>/gm;function za(s){return s.replace(_p,vp)}const xp=new Map;function vp(s,e){let t=Dt[e];if(t===void 0){const n=xp.get(e);if(n!==void 0)t=Dt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return za(t)}const Mp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ec(s){return s.replace(Mp,yp)}function yp(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function tc(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function Sp(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===1?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===2?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===3&&(e="SHADOWMAP_TYPE_VSM"),e}function Ep(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case 301:case 302:e="ENVMAP_TYPE_CUBE";break;case 306:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Tp(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case 302:e="ENVMAP_MODE_REFRACTION";break}return e}function Ap(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case 0:e="ENVMAP_BLENDING_MULTIPLY";break;case 1:e="ENVMAP_BLENDING_MIX";break;case 2:e="ENVMAP_BLENDING_ADD";break}return e}function wp(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Rp(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Sp(t),l=Ep(t),u=Tp(t),h=Ap(t),f=wp(t),d=mp(t),g=gp(r),b=i.createProgram();let m,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Us).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Us).join(`
`),p.length>0&&(p+=`
`)):(m=[tc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Us).join(`
`),p=[tc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?Dt.tonemapping_pars_fragment:"",t.toneMapping!==0?dp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Dt.colorspace_pars_fragment,fp("linearToOutputTexel",t.outputColorSpace),pp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Us).join(`
`)),a=za(a),a=Qo(a,t),a=$o(a,t),o=za(o),o=Qo(o,t),o=$o(o,t),a=ec(a),o=ec(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===fo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===fo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=v+m+a,_=v+p+o,I=Yo(i,i.VERTEX_SHADER,M),R=Yo(i,i.FRAGMENT_SHADER,_);i.attachShader(b,I),i.attachShader(b,R),t.index0AttributeName!==void 0?i.bindAttribLocation(b,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(b,0,"position"),i.linkProgram(b);function T(D){if(s.debug.checkShaderErrors){const k=i.getProgramInfoLog(b).trim(),z=i.getShaderInfoLog(I).trim(),Y=i.getShaderInfoLog(R).trim();let se=!0,N=!0;if(i.getProgramParameter(b,i.LINK_STATUS)===!1)if(se=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,b,I,R);else{const Z=Zo(i,I,"vertex"),q=Zo(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(b,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+k+`
`+Z+`
`+q)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(z===""||Y==="")&&(N=!1);N&&(D.diagnostics={runnable:se,programLog:k,vertexShader:{log:z,prefix:m},fragmentShader:{log:Y,prefix:p}})}i.deleteShader(I),i.deleteShader(R),w=new Fr(i,b),y=bp(i,b)}let w;this.getUniforms=function(){return w===void 0&&T(this),w};let y;this.getAttributes=function(){return y===void 0&&T(this),y};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=i.getProgramParameter(b,cp)),x},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=lp++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=I,this.fragmentShader=R,this}let Cp=0;class Pp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Lp(e),t.set(e,n)),n}}class Lp{constructor(e){this.id=Cp++,this.code=e,this.usedTimes=0}}function Dp(s,e,t,n,i,r,a){const o=new Zc,c=new Pp,l=new Set,u=[],h=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(y){return l.add(y),y===0?"uv":`uv${y}`}function m(y,x,D,k,z){const Y=k.fog,se=z.geometry,N=y.isMeshStandardMaterial?k.environment:null,Z=(y.isMeshStandardMaterial?t:e).get(y.envMap||N),q=Z&&Z.mapping===306?Z.image.height:null,ce=g[y.type];y.precision!==null&&(d=i.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const J=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,re=J!==void 0?J.length:0;let Ee=0;se.morphAttributes.position!==void 0&&(Ee=1),se.morphAttributes.normal!==void 0&&(Ee=2),se.morphAttributes.color!==void 0&&(Ee=3);let ze,oe,de,_e;if(ce){const It=ti[ce];ze=It.vertexShader,oe=It.fragmentShader}else ze=y.vertexShader,oe=y.fragmentShader,c.update(y),de=c.getVertexShaderID(y),_e=c.getFragmentShaderID(y);const ge=s.getRenderTarget(),He=s.state.buffers.depth.getReversed(),Ne=z.isInstancedMesh===!0,Ze=z.isBatchedMesh===!0,et=!!y.map,Ke=!!y.matcap,_t=!!Z,V=!!y.aoMap,qt=!!y.lightMap,Et=!!y.bumpMap,Tt=!!y.normalMap,ot=!!y.displacementMap,xt=!!y.emissiveMap,Ye=!!y.metalnessMap,P=!!y.roughnessMap,S=y.anisotropy>0,$=y.clearcoat>0,pe=y.dispersion>0,be=y.iridescence>0,le=y.sheen>0,$e=y.transmission>0,xe=S&&!!y.anisotropyMap,Be=$&&!!y.clearcoatMap,At=$&&!!y.clearcoatNormalMap,H=$&&!!y.clearcoatRoughnessMap,ke=be&&!!y.iridescenceMap,qe=be&&!!y.iridescenceThicknessMap,Qe=le&&!!y.sheenColorMap,Fe=le&&!!y.sheenRoughnessMap,St=!!y.specularMap,pt=!!y.specularColorMap,Ct=!!y.specularIntensityMap,G=$e&&!!y.transmissionMap,we=$e&&!!y.thicknessMap,ae=!!y.gradientMap,fe=!!y.alphaMap,Ce=y.alphaTest>0,Ae=!!y.alphaHash,tt=!!y.extensions;let zt=0;y.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(zt=s.toneMapping);const $t={shaderID:ce,shaderType:y.type,shaderName:y.name,vertexShader:ze,fragmentShader:oe,defines:y.defines,customVertexShaderID:de,customFragmentShaderID:_e,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:Ze,batchingColor:Ze&&z._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&z.instanceColor!==null,instancingMorph:Ne&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ge===null?s.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:Cn,alphaToCoverage:!!y.alphaToCoverage,map:et,matcap:Ke,envMap:_t,envMapMode:_t&&Z.mapping,envMapCubeUVHeight:q,aoMap:V,lightMap:qt,bumpMap:Et,normalMap:Tt,displacementMap:f&&ot,emissiveMap:xt,normalMapObjectSpace:Tt&&y.normalMapType===1,normalMapTangentSpace:Tt&&y.normalMapType===0,metalnessMap:Ye,roughnessMap:P,anisotropy:S,anisotropyMap:xe,clearcoat:$,clearcoatMap:Be,clearcoatNormalMap:At,clearcoatRoughnessMap:H,dispersion:pe,iridescence:be,iridescenceMap:ke,iridescenceThicknessMap:qe,sheen:le,sheenColorMap:Qe,sheenRoughnessMap:Fe,specularMap:St,specularColorMap:pt,specularIntensityMap:Ct,transmission:$e,transmissionMap:G,thicknessMap:we,gradientMap:ae,opaque:y.transparent===!1&&y.blending===1&&y.alphaToCoverage===!1,alphaMap:fe,alphaTest:Ce,alphaHash:Ae,combine:y.combine,mapUv:et&&b(y.map.channel),aoMapUv:V&&b(y.aoMap.channel),lightMapUv:qt&&b(y.lightMap.channel),bumpMapUv:Et&&b(y.bumpMap.channel),normalMapUv:Tt&&b(y.normalMap.channel),displacementMapUv:ot&&b(y.displacementMap.channel),emissiveMapUv:xt&&b(y.emissiveMap.channel),metalnessMapUv:Ye&&b(y.metalnessMap.channel),roughnessMapUv:P&&b(y.roughnessMap.channel),anisotropyMapUv:xe&&b(y.anisotropyMap.channel),clearcoatMapUv:Be&&b(y.clearcoatMap.channel),clearcoatNormalMapUv:At&&b(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:H&&b(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ke&&b(y.iridescenceMap.channel),iridescenceThicknessMapUv:qe&&b(y.iridescenceThicknessMap.channel),sheenColorMapUv:Qe&&b(y.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&b(y.sheenRoughnessMap.channel),specularMapUv:St&&b(y.specularMap.channel),specularColorMapUv:pt&&b(y.specularColorMap.channel),specularIntensityMapUv:Ct&&b(y.specularIntensityMap.channel),transmissionMapUv:G&&b(y.transmissionMap.channel),thicknessMapUv:we&&b(y.thicknessMap.channel),alphaMapUv:fe&&b(y.alphaMap.channel),vertexTangents:!!se.attributes.tangent&&(Tt||S),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!se.attributes.uv&&(et||fe),fog:!!Y,useFog:y.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:He,skinning:z.isSkinnedMesh===!0,morphTargets:se.morphAttributes.position!==void 0,morphNormals:se.morphAttributes.normal!==void 0,morphColors:se.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:Ee,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:zt,decodeVideoTexture:et&&y.map.isVideoTexture===!0&&Ot.getTransfer(y.map.colorSpace)===Yt,decodeVideoTextureEmissive:xt&&y.emissiveMap.isVideoTexture===!0&&Ot.getTransfer(y.emissiveMap.colorSpace)===Yt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===2,flipSided:y.side===1,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:tt&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(tt&&y.extensions.multiDraw===!0||Ze)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return $t.vertexUv1s=l.has(1),$t.vertexUv2s=l.has(2),$t.vertexUv3s=l.has(3),l.clear(),$t}function p(y){const x=[];if(y.shaderID?x.push(y.shaderID):(x.push(y.customVertexShaderID),x.push(y.customFragmentShaderID)),y.defines!==void 0)for(const D in y.defines)x.push(D),x.push(y.defines[D]);return y.isRawShaderMaterial===!1&&(v(x,y),M(x,y),x.push(s.outputColorSpace)),x.push(y.customProgramCacheKey),x.join()}function v(y,x){y.push(x.precision),y.push(x.outputColorSpace),y.push(x.envMapMode),y.push(x.envMapCubeUVHeight),y.push(x.mapUv),y.push(x.alphaMapUv),y.push(x.lightMapUv),y.push(x.aoMapUv),y.push(x.bumpMapUv),y.push(x.normalMapUv),y.push(x.displacementMapUv),y.push(x.emissiveMapUv),y.push(x.metalnessMapUv),y.push(x.roughnessMapUv),y.push(x.anisotropyMapUv),y.push(x.clearcoatMapUv),y.push(x.clearcoatNormalMapUv),y.push(x.clearcoatRoughnessMapUv),y.push(x.iridescenceMapUv),y.push(x.iridescenceThicknessMapUv),y.push(x.sheenColorMapUv),y.push(x.sheenRoughnessMapUv),y.push(x.specularMapUv),y.push(x.specularColorMapUv),y.push(x.specularIntensityMapUv),y.push(x.transmissionMapUv),y.push(x.thicknessMapUv),y.push(x.combine),y.push(x.fogExp2),y.push(x.sizeAttenuation),y.push(x.morphTargetsCount),y.push(x.morphAttributeCount),y.push(x.numDirLights),y.push(x.numPointLights),y.push(x.numSpotLights),y.push(x.numSpotLightMaps),y.push(x.numHemiLights),y.push(x.numRectAreaLights),y.push(x.numDirLightShadows),y.push(x.numPointLightShadows),y.push(x.numSpotLightShadows),y.push(x.numSpotLightShadowsWithMaps),y.push(x.numLightProbes),y.push(x.shadowMapType),y.push(x.toneMapping),y.push(x.numClippingPlanes),y.push(x.numClipIntersection),y.push(x.depthPacking)}function M(y,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),y.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),y.push(o.mask)}function _(y){const x=g[y.type];let D;if(x){const k=ti[x];D=ph.clone(k.uniforms)}else D=y.uniforms;return D}function I(y,x){let D;for(let k=0,z=u.length;k<z;k++){const Y=u[k];if(Y.cacheKey===x){D=Y,++D.usedTimes;break}}return D===void 0&&(D=new Rp(s,x,y,r),u.push(D)),D}function R(y){if(--y.usedTimes===0){const x=u.indexOf(y);u[x]=u[u.length-1],u.pop(),y.destroy()}}function T(y){c.remove(y)}function w(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:I,releaseProgram:R,releaseShaderCache:T,programs:u,dispose:w}}function Ip(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Fp(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function nc(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function ic(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(h,f,d,g,b,m){let p=s[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:b,group:m},s[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=b,p.group=m),e++,p}function o(h,f,d,g,b,m){const p=a(h,f,d,g,b,m);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):t.push(p)}function c(h,f,d,g,b,m){const p=a(h,f,d,g,b,m);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):t.unshift(p)}function l(h,f){t.length>1&&t.sort(h||Fp),n.length>1&&n.sort(f||nc),i.length>1&&i.sort(f||nc)}function u(){for(let h=e,f=s.length;h<f;h++){const d=s[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:c,finish:u,sort:l}}function Np(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new ic,s.set(n,[a])):i>=r.length?(a=new ic,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Up(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new rt};break;case"SpotLight":t={position:new F,direction:new F,color:new rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new rt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new rt,groundColor:new rt};break;case"RectAreaLight":t={color:new rt,position:new F,halfWidth:new F,halfHeight:new F};break}return s[e.id]=t,t}}}function Op(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Bp=0;function kp(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function zp(s){const e=new Up,t=Op(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);const i=new F,r=new gt,a=new gt;function o(l){let u=0,h=0,f=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let d=0,g=0,b=0,m=0,p=0,v=0,M=0,_=0,I=0,R=0,T=0;l.sort(kp);for(let y=0,x=l.length;y<x;y++){const D=l[y],k=D.color,z=D.intensity,Y=D.distance,se=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=k.r*z,h+=k.g*z,f+=k.b*z;else if(D.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(D.sh.coefficients[N],z);T++}else if(D.isDirectionalLight){const N=e.get(D);if(N.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const Z=D.shadow,q=t.get(D);q.shadowIntensity=Z.intensity,q.shadowBias=Z.bias,q.shadowNormalBias=Z.normalBias,q.shadowRadius=Z.radius,q.shadowMapSize=Z.mapSize,n.directionalShadow[d]=q,n.directionalShadowMap[d]=se,n.directionalShadowMatrix[d]=D.shadow.matrix,v++}n.directional[d]=N,d++}else if(D.isSpotLight){const N=e.get(D);N.position.setFromMatrixPosition(D.matrixWorld),N.color.copy(k).multiplyScalar(z),N.distance=Y,N.coneCos=Math.cos(D.angle),N.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),N.decay=D.decay,n.spot[b]=N;const Z=D.shadow;if(D.map&&(n.spotLightMap[I]=D.map,I++,Z.updateMatrices(D),D.castShadow&&R++),n.spotLightMatrix[b]=Z.matrix,D.castShadow){const q=t.get(D);q.shadowIntensity=Z.intensity,q.shadowBias=Z.bias,q.shadowNormalBias=Z.normalBias,q.shadowRadius=Z.radius,q.shadowMapSize=Z.mapSize,n.spotShadow[b]=q,n.spotShadowMap[b]=se,_++}b++}else if(D.isRectAreaLight){const N=e.get(D);N.color.copy(k).multiplyScalar(z),N.halfWidth.set(D.width*.5,0,0),N.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=N,m++}else if(D.isPointLight){const N=e.get(D);if(N.color.copy(D.color).multiplyScalar(D.intensity),N.distance=D.distance,N.decay=D.decay,D.castShadow){const Z=D.shadow,q=t.get(D);q.shadowIntensity=Z.intensity,q.shadowBias=Z.bias,q.shadowNormalBias=Z.normalBias,q.shadowRadius=Z.radius,q.shadowMapSize=Z.mapSize,q.shadowCameraNear=Z.camera.near,q.shadowCameraFar=Z.camera.far,n.pointShadow[g]=q,n.pointShadowMap[g]=se,n.pointShadowMatrix[g]=D.shadow.matrix,M++}n.point[g]=N,g++}else if(D.isHemisphereLight){const N=e.get(D);N.skyColor.copy(D.color).multiplyScalar(z),N.groundColor.copy(D.groundColor).multiplyScalar(z),n.hemi[p]=N,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ue.LTC_FLOAT_1,n.rectAreaLTC2=Ue.LTC_FLOAT_2):(n.rectAreaLTC1=Ue.LTC_HALF_1,n.rectAreaLTC2=Ue.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const w=n.hash;(w.directionalLength!==d||w.pointLength!==g||w.spotLength!==b||w.rectAreaLength!==m||w.hemiLength!==p||w.numDirectionalShadows!==v||w.numPointShadows!==M||w.numSpotShadows!==_||w.numSpotMaps!==I||w.numLightProbes!==T)&&(n.directional.length=d,n.spot.length=b,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=_+I-R,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=T,w.directionalLength=d,w.pointLength=g,w.spotLength=b,w.rectAreaLength=m,w.hemiLength=p,w.numDirectionalShadows=v,w.numPointShadows=M,w.numSpotShadows=_,w.numSpotMaps=I,w.numLightProbes=T,n.version=Bp++)}function c(l,u){let h=0,f=0,d=0,g=0,b=0;const m=u.matrixWorldInverse;for(let p=0,v=l.length;p<v;p++){const M=l[p];if(M.isDirectionalLight){const _=n.directional[h];_.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),h++}else if(M.isSpotLight){const _=n.spot[d];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),_.halfWidth.set(M.width*.5,0,0),_.halfHeight.set(0,M.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const _=n.point[f];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const _=n.hemi[b];_.direction.setFromMatrixPosition(M.matrixWorld),_.direction.transformDirection(m),b++}}}return{setup:o,setupView:c,state:n}}function sc(s){const e=new zp(s),t=[],n=[];function i(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Gp(s){let e=new WeakMap;function t(i,r=0){const a=e.get(i);let o;return a===void 0?(o=new sc(s),e.set(i,[o])):r>=a.length?(o=new sc(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class Hp extends Xn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Vp extends Xn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Wp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xp=`uniform sampler2D shadow_pass;
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
}`;function jp(s,e,t){let n=new Ja;const i=new De,r=new De,a=new Bt,o=new Hp({depthPacking:3201}),c=new Vp,l={},u=t.maxTextureSize,h={0:1,1:0,2:2},f=new Ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new De},radius:{value:4}},vertexShader:Wp,fragmentShader:Xp}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Jt;g.setAttribute("position",new jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Je(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let p=this.type;this.render=function(R,T,w){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const y=s.getRenderTarget(),x=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),k=s.state;k.setBlending(0),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const z=p!==3&&this.type===3,Y=p===3&&this.type!==3;for(let se=0,N=R.length;se<N;se++){const Z=R[se],q=Z.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;i.copy(q.mapSize);const ce=q.getFrameExtents();if(i.multiply(ce),r.copy(q.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/ce.x),i.x=r.x*ce.x,q.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/ce.y),i.y=r.y*ce.y,q.mapSize.y=r.y)),q.map===null||z===!0||Y===!0){const re=this.type!==3?{minFilter:1003,magFilter:1003}:{};q.map!==null&&q.map.dispose(),q.map=new Ri(i.x,i.y,re),q.map.texture.name=Z.name+".shadowMap",q.camera.updateProjectionMatrix()}s.setRenderTarget(q.map),s.clear();const J=q.getViewportCount();for(let re=0;re<J;re++){const Ee=q.getViewport(re);a.set(r.x*Ee.x,r.y*Ee.y,r.x*Ee.z,r.y*Ee.w),k.viewport(a),q.updateMatrices(Z,re),n=q.getFrustum(),_(T,w,q.camera,Z,this.type)}q.isPointLightShadow!==!0&&this.type===3&&v(q,w),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(y,x,D)};function v(R,T){const w=e.update(b);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,d.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Ri(i.x,i.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,s.setRenderTarget(R.mapPass),s.clear(),s.renderBufferDirect(T,null,w,f,b,null),d.uniforms.shadow_pass.value=R.mapPass.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,s.setRenderTarget(R.map),s.clear(),s.renderBufferDirect(T,null,w,d,b,null)}function M(R,T,w,y){let x=null;const D=w.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(D!==void 0)x=D;else if(x=w.isPointLight===!0?c:o,s.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const k=x.uuid,z=T.uuid;let Y=l[k];Y===void 0&&(Y={},l[k]=Y);let se=Y[z];se===void 0&&(se=x.clone(),Y[z]=se,T.addEventListener("dispose",I)),x=se}if(x.visible=T.visible,x.wireframe=T.wireframe,y===3?x.side=T.shadowSide!==null?T.shadowSide:T.side:x.side=T.shadowSide!==null?T.shadowSide:h[T.side],x.alphaMap=T.alphaMap,x.alphaTest=T.alphaTest,x.map=T.map,x.clipShadows=T.clipShadows,x.clippingPlanes=T.clippingPlanes,x.clipIntersection=T.clipIntersection,x.displacementMap=T.displacementMap,x.displacementScale=T.displacementScale,x.displacementBias=T.displacementBias,x.wireframeLinewidth=T.wireframeLinewidth,x.linewidth=T.linewidth,w.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const k=s.properties.get(x);k.light=w}return x}function _(R,T,w,y,x){if(R.visible===!1)return;if(R.layers.test(T.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&x===3)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,R.matrixWorld);const z=e.update(R),Y=R.material;if(Array.isArray(Y)){const se=z.groups;for(let N=0,Z=se.length;N<Z;N++){const q=se[N],ce=Y[q.materialIndex];if(ce&&ce.visible){const J=M(R,ce,y,x);R.onBeforeShadow(s,R,T,w,z,J,q),s.renderBufferDirect(w,null,z,J,R,q),R.onAfterShadow(s,R,T,w,z,J,q)}}}else if(Y.visible){const se=M(R,Y,y,x);R.onBeforeShadow(s,R,T,w,z,se,null),s.renderBufferDirect(w,null,z,se,R,null),R.onAfterShadow(s,R,T,w,z,se,null)}}const k=R.children;for(let z=0,Y=k.length;z<Y;z++)_(k[z],T,w,y,x)}function I(R){R.target.removeEventListener("dispose",I);for(const w in l){const y=l[w],x=R.target.uuid;x in y&&(y[x].dispose(),delete y[x])}}}const qp={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function Kp(s,e){function t(){let G=!1;const we=new Bt;let ae=null;const fe=new Bt(0,0,0,0);return{setMask:function(Ce){ae!==Ce&&!G&&(s.colorMask(Ce,Ce,Ce,Ce),ae=Ce)},setLocked:function(Ce){G=Ce},setClear:function(Ce,Ae,tt,zt,$t){$t===!0&&(Ce*=zt,Ae*=zt,tt*=zt),we.set(Ce,Ae,tt,zt),fe.equals(we)===!1&&(s.clearColor(Ce,Ae,tt,zt),fe.copy(we))},reset:function(){G=!1,ae=null,fe.set(-1,0,0,0)}}}function n(){let G=!1,we=!1,ae=null,fe=null,Ce=null;return{setReversed:function(Ae){if(we!==Ae){const tt=e.get("EXT_clip_control");we?tt.clipControlEXT(tt.LOWER_LEFT_EXT,tt.ZERO_TO_ONE_EXT):tt.clipControlEXT(tt.LOWER_LEFT_EXT,tt.NEGATIVE_ONE_TO_ONE_EXT);const zt=Ce;Ce=null,this.setClear(zt)}we=Ae},getReversed:function(){return we},setTest:function(Ae){Ae?ge(s.DEPTH_TEST):He(s.DEPTH_TEST)},setMask:function(Ae){ae!==Ae&&!G&&(s.depthMask(Ae),ae=Ae)},setFunc:function(Ae){if(we&&(Ae=qp[Ae]),fe!==Ae){switch(Ae){case 0:s.depthFunc(s.NEVER);break;case 1:s.depthFunc(s.ALWAYS);break;case 2:s.depthFunc(s.LESS);break;case 3:s.depthFunc(s.LEQUAL);break;case 4:s.depthFunc(s.EQUAL);break;case 5:s.depthFunc(s.GEQUAL);break;case 6:s.depthFunc(s.GREATER);break;case 7:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}fe=Ae}},setLocked:function(Ae){G=Ae},setClear:function(Ae){Ce!==Ae&&(we&&(Ae=1-Ae),s.clearDepth(Ae),Ce=Ae)},reset:function(){G=!1,ae=null,fe=null,Ce=null,we=!1}}}function i(){let G=!1,we=null,ae=null,fe=null,Ce=null,Ae=null,tt=null,zt=null,$t=null;return{setTest:function(It){G||(It?ge(s.STENCIL_TEST):He(s.STENCIL_TEST))},setMask:function(It){we!==It&&!G&&(s.stencilMask(It),we=It)},setFunc:function(It,on,cn){(ae!==It||fe!==on||Ce!==cn)&&(s.stencilFunc(It,on,cn),ae=It,fe=on,Ce=cn)},setOp:function(It,on,cn){(Ae!==It||tt!==on||zt!==cn)&&(s.stencilOp(It,on,cn),Ae=It,tt=on,zt=cn)},setLocked:function(It){G=It},setClear:function(It){$t!==It&&(s.clearStencil(It),$t=It)},reset:function(){G=!1,we=null,ae=null,fe=null,Ce=null,Ae=null,tt=null,zt=null,$t=null}}}const r=new t,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let u={},h={},f=new WeakMap,d=[],g=null,b=!1,m=null,p=null,v=null,M=null,_=null,I=null,R=null,T=new rt(0,0,0),w=0,y=!1,x=null,D=null,k=null,z=null,Y=null;const se=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,Z=0;const q=s.getParameter(s.VERSION);q.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(q)[1]),N=Z>=1):q.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),N=Z>=2);let ce=null,J={};const re=s.getParameter(s.SCISSOR_BOX),Ee=s.getParameter(s.VIEWPORT),ze=new Bt().fromArray(re),oe=new Bt().fromArray(Ee);function de(G,we,ae,fe){const Ce=new Uint8Array(4),Ae=s.createTexture();s.bindTexture(G,Ae),s.texParameteri(G,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(G,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let tt=0;tt<ae;tt++)G===s.TEXTURE_3D||G===s.TEXTURE_2D_ARRAY?s.texImage3D(we,0,s.RGBA,1,1,fe,0,s.RGBA,s.UNSIGNED_BYTE,Ce):s.texImage2D(we+tt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ce);return Ae}const _e={};_e[s.TEXTURE_2D]=de(s.TEXTURE_2D,s.TEXTURE_2D,1),_e[s.TEXTURE_CUBE_MAP]=de(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),_e[s.TEXTURE_2D_ARRAY]=de(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),_e[s.TEXTURE_3D]=de(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ge(s.DEPTH_TEST),a.setFunc(3),Et(!1),Tt(1),ge(s.CULL_FACE),V(0);function ge(G){u[G]!==!0&&(s.enable(G),u[G]=!0)}function He(G){u[G]!==!1&&(s.disable(G),u[G]=!1)}function Ne(G,we){return h[G]!==we?(s.bindFramebuffer(G,we),h[G]=we,G===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=we),G===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=we),!0):!1}function Ze(G,we){let ae=d,fe=!1;if(G){ae=f.get(we),ae===void 0&&(ae=[],f.set(we,ae));const Ce=G.textures;if(ae.length!==Ce.length||ae[0]!==s.COLOR_ATTACHMENT0){for(let Ae=0,tt=Ce.length;Ae<tt;Ae++)ae[Ae]=s.COLOR_ATTACHMENT0+Ae;ae.length=Ce.length,fe=!0}}else ae[0]!==s.BACK&&(ae[0]=s.BACK,fe=!0);fe&&s.drawBuffers(ae)}function et(G){return g!==G?(s.useProgram(G),g=G,!0):!1}const Ke={100:s.FUNC_ADD,101:s.FUNC_SUBTRACT,102:s.FUNC_REVERSE_SUBTRACT};Ke[103]=s.MIN,Ke[104]=s.MAX;const _t={200:s.ZERO,201:s.ONE,202:s.SRC_COLOR,204:s.SRC_ALPHA,210:s.SRC_ALPHA_SATURATE,208:s.DST_COLOR,206:s.DST_ALPHA,203:s.ONE_MINUS_SRC_COLOR,205:s.ONE_MINUS_SRC_ALPHA,209:s.ONE_MINUS_DST_COLOR,207:s.ONE_MINUS_DST_ALPHA,211:s.CONSTANT_COLOR,212:s.ONE_MINUS_CONSTANT_COLOR,213:s.CONSTANT_ALPHA,214:s.ONE_MINUS_CONSTANT_ALPHA};function V(G,we,ae,fe,Ce,Ae,tt,zt,$t,It){if(G===0){b===!0&&(He(s.BLEND),b=!1);return}if(b===!1&&(ge(s.BLEND),b=!0),G!==5){if(G!==m||It!==y){if((p!==100||_!==100)&&(s.blendEquation(s.FUNC_ADD),p=100,_=100),It)switch(G){case 1:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case 2:s.blendFunc(s.ONE,s.ONE);break;case 3:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case 4:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case 1:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case 2:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case 3:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case 4:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}v=null,M=null,I=null,R=null,T.set(0,0,0),w=0,m=G,y=It}return}Ce=Ce||we,Ae=Ae||ae,tt=tt||fe,(we!==p||Ce!==_)&&(s.blendEquationSeparate(Ke[we],Ke[Ce]),p=we,_=Ce),(ae!==v||fe!==M||Ae!==I||tt!==R)&&(s.blendFuncSeparate(_t[ae],_t[fe],_t[Ae],_t[tt]),v=ae,M=fe,I=Ae,R=tt),(zt.equals(T)===!1||$t!==w)&&(s.blendColor(zt.r,zt.g,zt.b,$t),T.copy(zt),w=$t),m=G,y=!1}function qt(G,we){G.side===2?He(s.CULL_FACE):ge(s.CULL_FACE);let ae=G.side===1;we&&(ae=!ae),Et(ae),G.blending===1&&G.transparent===!1?V(0):V(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),a.setFunc(G.depthFunc),a.setTest(G.depthTest),a.setMask(G.depthWrite),r.setMask(G.colorWrite);const fe=G.stencilWrite;o.setTest(fe),fe&&(o.setMask(G.stencilWriteMask),o.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),o.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),xt(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?ge(s.SAMPLE_ALPHA_TO_COVERAGE):He(s.SAMPLE_ALPHA_TO_COVERAGE)}function Et(G){x!==G&&(G?s.frontFace(s.CW):s.frontFace(s.CCW),x=G)}function Tt(G){G!==0?(ge(s.CULL_FACE),G!==D&&(G===1?s.cullFace(s.BACK):G===2?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):He(s.CULL_FACE),D=G}function ot(G){G!==k&&(N&&s.lineWidth(G),k=G)}function xt(G,we,ae){G?(ge(s.POLYGON_OFFSET_FILL),(z!==we||Y!==ae)&&(s.polygonOffset(we,ae),z=we,Y=ae)):He(s.POLYGON_OFFSET_FILL)}function Ye(G){G?ge(s.SCISSOR_TEST):He(s.SCISSOR_TEST)}function P(G){G===void 0&&(G=s.TEXTURE0+se-1),ce!==G&&(s.activeTexture(G),ce=G)}function S(G,we,ae){ae===void 0&&(ce===null?ae=s.TEXTURE0+se-1:ae=ce);let fe=J[ae];fe===void 0&&(fe={type:void 0,texture:void 0},J[ae]=fe),(fe.type!==G||fe.texture!==we)&&(ce!==ae&&(s.activeTexture(ae),ce=ae),s.bindTexture(G,we||_e[G]),fe.type=G,fe.texture=we)}function $(){const G=J[ce];G!==void 0&&G.type!==void 0&&(s.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function pe(){try{s.compressedTexImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function be(){try{s.compressedTexImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function le(){try{s.texSubImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function $e(){try{s.texSubImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function xe(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Be(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function At(){try{s.texStorage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function H(){try{s.texStorage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ke(){try{s.texImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function qe(){try{s.texImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Qe(G){ze.equals(G)===!1&&(s.scissor(G.x,G.y,G.z,G.w),ze.copy(G))}function Fe(G){oe.equals(G)===!1&&(s.viewport(G.x,G.y,G.z,G.w),oe.copy(G))}function St(G,we){let ae=l.get(we);ae===void 0&&(ae=new WeakMap,l.set(we,ae));let fe=ae.get(G);fe===void 0&&(fe=s.getUniformBlockIndex(we,G.name),ae.set(G,fe))}function pt(G,we){const fe=l.get(we).get(G);c.get(we)!==fe&&(s.uniformBlockBinding(we,fe,G.__bindingPointIndex),c.set(we,fe))}function Ct(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},ce=null,J={},h={},f=new WeakMap,d=[],g=null,b=!1,m=null,p=null,v=null,M=null,_=null,I=null,R=null,T=new rt(0,0,0),w=0,y=!1,x=null,D=null,k=null,z=null,Y=null,ze.set(0,0,s.canvas.width,s.canvas.height),oe.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ge,disable:He,bindFramebuffer:Ne,drawBuffers:Ze,useProgram:et,setBlending:V,setMaterial:qt,setFlipSided:Et,setCullFace:Tt,setLineWidth:ot,setPolygonOffset:xt,setScissorTest:Ye,activeTexture:P,bindTexture:S,unbindTexture:$,compressedTexImage2D:pe,compressedTexImage3D:be,texImage2D:ke,texImage3D:qe,updateUBOMapping:St,uniformBlockBinding:pt,texStorage2D:At,texStorage3D:H,texSubImage2D:le,texSubImage3D:$e,compressedTexSubImage2D:xe,compressedTexSubImage3D:Be,scissor:Qe,viewport:Fe,reset:Ct}}function rc(s,e,t,n){const i=Yp(n);switch(t){case 1021:return s*e;case 1024:return s*e;case 1025:return s*e*2;case 1028:return s*e/i.components*i.byteLength;case 1029:return s*e/i.components*i.byteLength;case 1030:return s*e*2/i.components*i.byteLength;case 1031:return s*e*2/i.components*i.byteLength;case 1022:return s*e*3/i.components*i.byteLength;case 1023:return s*e*4/i.components*i.byteLength;case 1033:return s*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(s,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(s,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case 37496:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case 37808:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(s/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(s/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Yp(s){switch(s){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function Jp(s,e,t,n,i,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new De,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,S){return d?new OffscreenCanvas(P,S):Hs("canvas")}function b(P,S,$){let pe=1;const be=Ye(P);if((be.width>$||be.height>$)&&(pe=$/Math.max(be.width,be.height)),pe<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const le=Math.floor(pe*be.width),$e=Math.floor(pe*be.height);h===void 0&&(h=g(le,$e));const xe=S?g(le,$e):h;return xe.width=le,xe.height=$e,xe.getContext("2d").drawImage(P,0,0,le,$e),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+be.width+"x"+be.height+") to ("+le+"x"+$e+")."),xe}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+be.width+"x"+be.height+")."),P;return P}function m(P){return P.generateMipmaps}function p(P){s.generateMipmap(P)}function v(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(P,S,$,pe,be=!1){if(P!==null){if(s[P]!==void 0)return s[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let le=S;if(S===s.RED&&($===s.FLOAT&&(le=s.R32F),$===s.HALF_FLOAT&&(le=s.R16F),$===s.UNSIGNED_BYTE&&(le=s.R8)),S===s.RED_INTEGER&&($===s.UNSIGNED_BYTE&&(le=s.R8UI),$===s.UNSIGNED_SHORT&&(le=s.R16UI),$===s.UNSIGNED_INT&&(le=s.R32UI),$===s.BYTE&&(le=s.R8I),$===s.SHORT&&(le=s.R16I),$===s.INT&&(le=s.R32I)),S===s.RG&&($===s.FLOAT&&(le=s.RG32F),$===s.HALF_FLOAT&&(le=s.RG16F),$===s.UNSIGNED_BYTE&&(le=s.RG8)),S===s.RG_INTEGER&&($===s.UNSIGNED_BYTE&&(le=s.RG8UI),$===s.UNSIGNED_SHORT&&(le=s.RG16UI),$===s.UNSIGNED_INT&&(le=s.RG32UI),$===s.BYTE&&(le=s.RG8I),$===s.SHORT&&(le=s.RG16I),$===s.INT&&(le=s.RG32I)),S===s.RGB_INTEGER&&($===s.UNSIGNED_BYTE&&(le=s.RGB8UI),$===s.UNSIGNED_SHORT&&(le=s.RGB16UI),$===s.UNSIGNED_INT&&(le=s.RGB32UI),$===s.BYTE&&(le=s.RGB8I),$===s.SHORT&&(le=s.RGB16I),$===s.INT&&(le=s.RGB32I)),S===s.RGBA_INTEGER&&($===s.UNSIGNED_BYTE&&(le=s.RGBA8UI),$===s.UNSIGNED_SHORT&&(le=s.RGBA16UI),$===s.UNSIGNED_INT&&(le=s.RGBA32UI),$===s.BYTE&&(le=s.RGBA8I),$===s.SHORT&&(le=s.RGBA16I),$===s.INT&&(le=s.RGBA32I)),S===s.RGB&&$===s.UNSIGNED_INT_5_9_9_9_REV&&(le=s.RGB9_E5),S===s.RGBA){const $e=be?Br:Ot.getTransfer(pe);$===s.FLOAT&&(le=s.RGBA32F),$===s.HALF_FLOAT&&(le=s.RGBA16F),$===s.UNSIGNED_BYTE&&(le=$e===Yt?s.SRGB8_ALPHA8:s.RGBA8),$===s.UNSIGNED_SHORT_4_4_4_4&&(le=s.RGBA4),$===s.UNSIGNED_SHORT_5_5_5_1&&(le=s.RGB5_A1)}return(le===s.R16F||le===s.R32F||le===s.RG16F||le===s.RG32F||le===s.RGBA16F||le===s.RGBA32F)&&e.get("EXT_color_buffer_float"),le}function _(P,S){let $;return P?S===null||S===1014||S===1020?$=s.DEPTH24_STENCIL8:S===1015?$=s.DEPTH32F_STENCIL8:S===1012&&($=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===1014||S===1020?$=s.DEPTH_COMPONENT24:S===1015?$=s.DEPTH_COMPONENT32F:S===1012&&($=s.DEPTH_COMPONENT16),$}function I(P,S){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==1003&&P.minFilter!==1006?Math.log2(Math.max(S.width,S.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?S.mipmaps.length:1}function R(P){const S=P.target;S.removeEventListener("dispose",R),w(S),S.isVideoTexture&&u.delete(S)}function T(P){const S=P.target;S.removeEventListener("dispose",T),x(S)}function w(P){const S=n.get(P);if(S.__webglInit===void 0)return;const $=P.source,pe=f.get($);if(pe){const be=pe[S.__cacheKey];be.usedTimes--,be.usedTimes===0&&y(P),Object.keys(pe).length===0&&f.delete($)}n.remove(P)}function y(P){const S=n.get(P);s.deleteTexture(S.__webglTexture);const $=P.source,pe=f.get($);delete pe[S.__cacheKey],a.memory.textures--}function x(P){const S=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let pe=0;pe<6;pe++){if(Array.isArray(S.__webglFramebuffer[pe]))for(let be=0;be<S.__webglFramebuffer[pe].length;be++)s.deleteFramebuffer(S.__webglFramebuffer[pe][be]);else s.deleteFramebuffer(S.__webglFramebuffer[pe]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[pe])}else{if(Array.isArray(S.__webglFramebuffer))for(let pe=0;pe<S.__webglFramebuffer.length;pe++)s.deleteFramebuffer(S.__webglFramebuffer[pe]);else s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let pe=0;pe<S.__webglColorRenderbuffer.length;pe++)S.__webglColorRenderbuffer[pe]&&s.deleteRenderbuffer(S.__webglColorRenderbuffer[pe]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const $=P.textures;for(let pe=0,be=$.length;pe<be;pe++){const le=n.get($[pe]);le.__webglTexture&&(s.deleteTexture(le.__webglTexture),a.memory.textures--),n.remove($[pe])}n.remove(P)}let D=0;function k(){D=0}function z(){const P=D;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),D+=1,P}function Y(P){const S=[];return S.push(P.wrapS),S.push(P.wrapT),S.push(P.wrapR||0),S.push(P.magFilter),S.push(P.minFilter),S.push(P.anisotropy),S.push(P.internalFormat),S.push(P.format),S.push(P.type),S.push(P.generateMipmaps),S.push(P.premultiplyAlpha),S.push(P.flipY),S.push(P.unpackAlignment),S.push(P.colorSpace),S.join()}function se(P,S){const $=n.get(P);if(P.isVideoTexture&&ot(P),P.isRenderTargetTexture===!1&&P.version>0&&$.__version!==P.version){const pe=P.image;if(pe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(pe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{oe($,P,S);return}}t.bindTexture(s.TEXTURE_2D,$.__webglTexture,s.TEXTURE0+S)}function N(P,S){const $=n.get(P);if(P.version>0&&$.__version!==P.version){oe($,P,S);return}t.bindTexture(s.TEXTURE_2D_ARRAY,$.__webglTexture,s.TEXTURE0+S)}function Z(P,S){const $=n.get(P);if(P.version>0&&$.__version!==P.version){oe($,P,S);return}t.bindTexture(s.TEXTURE_3D,$.__webglTexture,s.TEXTURE0+S)}function q(P,S){const $=n.get(P);if(P.version>0&&$.__version!==P.version){de($,P,S);return}t.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture,s.TEXTURE0+S)}const ce={1e3:s.REPEAT,1001:s.CLAMP_TO_EDGE,1002:s.MIRRORED_REPEAT},J={1003:s.NEAREST,1004:s.NEAREST_MIPMAP_NEAREST,1005:s.NEAREST_MIPMAP_LINEAR,1006:s.LINEAR,1007:s.LINEAR_MIPMAP_NEAREST,1008:s.LINEAR_MIPMAP_LINEAR},re={512:s.NEVER,519:s.ALWAYS,513:s.LESS,515:s.LEQUAL,514:s.EQUAL,518:s.GEQUAL,516:s.GREATER,517:s.NOTEQUAL};function Ee(P,S){if(S.type===1015&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===1006||S.magFilter===1007||S.magFilter===1005||S.magFilter===1008||S.minFilter===1006||S.minFilter===1007||S.minFilter===1005||S.minFilter===1008)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,ce[S.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,ce[S.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,ce[S.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,J[S.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,J[S.minFilter]),S.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,re[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===1003||S.minFilter!==1005&&S.minFilter!==1008||S.type===1015&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const $=e.get("EXT_texture_filter_anisotropic");s.texParameterf(P,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function ze(P,S){let $=!1;P.__webglInit===void 0&&(P.__webglInit=!0,S.addEventListener("dispose",R));const pe=S.source;let be=f.get(pe);be===void 0&&(be={},f.set(pe,be));const le=Y(S);if(le!==P.__cacheKey){be[le]===void 0&&(be[le]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,$=!0),be[le].usedTimes++;const $e=be[P.__cacheKey];$e!==void 0&&(be[P.__cacheKey].usedTimes--,$e.usedTimes===0&&y(S)),P.__cacheKey=le,P.__webglTexture=be[le].texture}return $}function oe(P,S,$){let pe=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(pe=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(pe=s.TEXTURE_3D);const be=ze(P,S),le=S.source;t.bindTexture(pe,P.__webglTexture,s.TEXTURE0+$);const $e=n.get(le);if(le.version!==$e.__version||be===!0){t.activeTexture(s.TEXTURE0+$);const xe=Ot.getPrimaries(Ot.workingColorSpace),Be=S.colorSpace===""?null:Ot.getPrimaries(S.colorSpace),At=S.colorSpace===""||xe===Be?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);let H=b(S.image,!1,i.maxTextureSize);H=xt(S,H);const ke=r.convert(S.format,S.colorSpace),qe=r.convert(S.type);let Qe=M(S.internalFormat,ke,qe,S.colorSpace,S.isVideoTexture);Ee(pe,S);let Fe;const St=S.mipmaps,pt=S.isVideoTexture!==!0,Ct=$e.__version===void 0||be===!0,G=le.dataReady,we=I(S,H);if(S.isDepthTexture)Qe=_(S.format===1027,S.type),Ct&&(pt?t.texStorage2D(s.TEXTURE_2D,1,Qe,H.width,H.height):t.texImage2D(s.TEXTURE_2D,0,Qe,H.width,H.height,0,ke,qe,null));else if(S.isDataTexture)if(St.length>0){pt&&Ct&&t.texStorage2D(s.TEXTURE_2D,we,Qe,St[0].width,St[0].height);for(let ae=0,fe=St.length;ae<fe;ae++)Fe=St[ae],pt?G&&t.texSubImage2D(s.TEXTURE_2D,ae,0,0,Fe.width,Fe.height,ke,qe,Fe.data):t.texImage2D(s.TEXTURE_2D,ae,Qe,Fe.width,Fe.height,0,ke,qe,Fe.data);S.generateMipmaps=!1}else pt?(Ct&&t.texStorage2D(s.TEXTURE_2D,we,Qe,H.width,H.height),G&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,H.width,H.height,ke,qe,H.data)):t.texImage2D(s.TEXTURE_2D,0,Qe,H.width,H.height,0,ke,qe,H.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){pt&&Ct&&t.texStorage3D(s.TEXTURE_2D_ARRAY,we,Qe,St[0].width,St[0].height,H.depth);for(let ae=0,fe=St.length;ae<fe;ae++)if(Fe=St[ae],S.format!==1023)if(ke!==null)if(pt){if(G)if(S.layerUpdates.size>0){const Ce=rc(Fe.width,Fe.height,S.format,S.type);for(const Ae of S.layerUpdates){const tt=Fe.data.subarray(Ae*Ce/Fe.data.BYTES_PER_ELEMENT,(Ae+1)*Ce/Fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ae,0,0,Ae,Fe.width,Fe.height,1,ke,tt)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ae,0,0,0,Fe.width,Fe.height,H.depth,ke,Fe.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ae,Qe,Fe.width,Fe.height,H.depth,0,Fe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else pt?G&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,ae,0,0,0,Fe.width,Fe.height,H.depth,ke,qe,Fe.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ae,Qe,Fe.width,Fe.height,H.depth,0,ke,qe,Fe.data)}else{pt&&Ct&&t.texStorage2D(s.TEXTURE_2D,we,Qe,St[0].width,St[0].height);for(let ae=0,fe=St.length;ae<fe;ae++)Fe=St[ae],S.format!==1023?ke!==null?pt?G&&t.compressedTexSubImage2D(s.TEXTURE_2D,ae,0,0,Fe.width,Fe.height,ke,Fe.data):t.compressedTexImage2D(s.TEXTURE_2D,ae,Qe,Fe.width,Fe.height,0,Fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):pt?G&&t.texSubImage2D(s.TEXTURE_2D,ae,0,0,Fe.width,Fe.height,ke,qe,Fe.data):t.texImage2D(s.TEXTURE_2D,ae,Qe,Fe.width,Fe.height,0,ke,qe,Fe.data)}else if(S.isDataArrayTexture)if(pt){if(Ct&&t.texStorage3D(s.TEXTURE_2D_ARRAY,we,Qe,H.width,H.height,H.depth),G)if(S.layerUpdates.size>0){const ae=rc(H.width,H.height,S.format,S.type);for(const fe of S.layerUpdates){const Ce=H.data.subarray(fe*ae/H.data.BYTES_PER_ELEMENT,(fe+1)*ae/H.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,fe,H.width,H.height,1,ke,qe,Ce)}S.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,H.width,H.height,H.depth,ke,qe,H.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Qe,H.width,H.height,H.depth,0,ke,qe,H.data);else if(S.isData3DTexture)pt?(Ct&&t.texStorage3D(s.TEXTURE_3D,we,Qe,H.width,H.height,H.depth),G&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,H.width,H.height,H.depth,ke,qe,H.data)):t.texImage3D(s.TEXTURE_3D,0,Qe,H.width,H.height,H.depth,0,ke,qe,H.data);else if(S.isFramebufferTexture){if(Ct)if(pt)t.texStorage2D(s.TEXTURE_2D,we,Qe,H.width,H.height);else{let ae=H.width,fe=H.height;for(let Ce=0;Ce<we;Ce++)t.texImage2D(s.TEXTURE_2D,Ce,Qe,ae,fe,0,ke,qe,null),ae>>=1,fe>>=1}}else if(St.length>0){if(pt&&Ct){const ae=Ye(St[0]);t.texStorage2D(s.TEXTURE_2D,we,Qe,ae.width,ae.height)}for(let ae=0,fe=St.length;ae<fe;ae++)Fe=St[ae],pt?G&&t.texSubImage2D(s.TEXTURE_2D,ae,0,0,ke,qe,Fe):t.texImage2D(s.TEXTURE_2D,ae,Qe,ke,qe,Fe);S.generateMipmaps=!1}else if(pt){if(Ct){const ae=Ye(H);t.texStorage2D(s.TEXTURE_2D,we,Qe,ae.width,ae.height)}G&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ke,qe,H)}else t.texImage2D(s.TEXTURE_2D,0,Qe,ke,qe,H);m(S)&&p(pe),$e.__version=le.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function de(P,S,$){if(S.image.length!==6)return;const pe=ze(P,S),be=S.source;t.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+$);const le=n.get(be);if(be.version!==le.__version||pe===!0){t.activeTexture(s.TEXTURE0+$);const $e=Ot.getPrimaries(Ot.workingColorSpace),xe=S.colorSpace===""?null:Ot.getPrimaries(S.colorSpace),Be=S.colorSpace===""||$e===xe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Be);const At=S.isCompressedTexture||S.image[0].isCompressedTexture,H=S.image[0]&&S.image[0].isDataTexture,ke=[];for(let fe=0;fe<6;fe++)!At&&!H?ke[fe]=b(S.image[fe],!0,i.maxCubemapSize):ke[fe]=H?S.image[fe].image:S.image[fe],ke[fe]=xt(S,ke[fe]);const qe=ke[0],Qe=r.convert(S.format,S.colorSpace),Fe=r.convert(S.type),St=M(S.internalFormat,Qe,Fe,S.colorSpace),pt=S.isVideoTexture!==!0,Ct=le.__version===void 0||pe===!0,G=be.dataReady;let we=I(S,qe);Ee(s.TEXTURE_CUBE_MAP,S);let ae;if(At){pt&&Ct&&t.texStorage2D(s.TEXTURE_CUBE_MAP,we,St,qe.width,qe.height);for(let fe=0;fe<6;fe++){ae=ke[fe].mipmaps;for(let Ce=0;Ce<ae.length;Ce++){const Ae=ae[Ce];S.format!==1023?Qe!==null?pt?G&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ce,0,0,Ae.width,Ae.height,Qe,Ae.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ce,St,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):pt?G&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ce,0,0,Ae.width,Ae.height,Qe,Fe,Ae.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ce,St,Ae.width,Ae.height,0,Qe,Fe,Ae.data)}}}else{if(ae=S.mipmaps,pt&&Ct){ae.length>0&&we++;const fe=Ye(ke[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,we,St,fe.width,fe.height)}for(let fe=0;fe<6;fe++)if(H){pt?G&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,ke[fe].width,ke[fe].height,Qe,Fe,ke[fe].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,St,ke[fe].width,ke[fe].height,0,Qe,Fe,ke[fe].data);for(let Ce=0;Ce<ae.length;Ce++){const tt=ae[Ce].image[fe].image;pt?G&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ce+1,0,0,tt.width,tt.height,Qe,Fe,tt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ce+1,St,tt.width,tt.height,0,Qe,Fe,tt.data)}}else{pt?G&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Qe,Fe,ke[fe]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,St,Qe,Fe,ke[fe]);for(let Ce=0;Ce<ae.length;Ce++){const Ae=ae[Ce];pt?G&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ce+1,0,0,Qe,Fe,Ae.image[fe]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ce+1,St,Qe,Fe,Ae.image[fe])}}}m(S)&&p(s.TEXTURE_CUBE_MAP),le.__version=be.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function _e(P,S,$,pe,be,le){const $e=r.convert($.format,$.colorSpace),xe=r.convert($.type),Be=M($.internalFormat,$e,xe,$.colorSpace),At=n.get(S),H=n.get($);if(H.__renderTarget=S,!At.__hasExternalTextures){const ke=Math.max(1,S.width>>le),qe=Math.max(1,S.height>>le);be===s.TEXTURE_3D||be===s.TEXTURE_2D_ARRAY?t.texImage3D(be,le,Be,ke,qe,S.depth,0,$e,xe,null):t.texImage2D(be,le,Be,ke,qe,0,$e,xe,null)}t.bindFramebuffer(s.FRAMEBUFFER,P),Tt(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,pe,be,H.__webglTexture,0,Et(S)):(be===s.TEXTURE_2D||be>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&be<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,pe,be,H.__webglTexture,le),t.bindFramebuffer(s.FRAMEBUFFER,null)}function ge(P,S,$){if(s.bindRenderbuffer(s.RENDERBUFFER,P),S.depthBuffer){const pe=S.depthTexture,be=pe&&pe.isDepthTexture?pe.type:null,le=_(S.stencilBuffer,be),$e=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,xe=Et(S);Tt(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,xe,le,S.width,S.height):$?s.renderbufferStorageMultisample(s.RENDERBUFFER,xe,le,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,le,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,$e,s.RENDERBUFFER,P)}else{const pe=S.textures;for(let be=0;be<pe.length;be++){const le=pe[be],$e=r.convert(le.format,le.colorSpace),xe=r.convert(le.type),Be=M(le.internalFormat,$e,xe,le.colorSpace),At=Et(S);$&&Tt(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,At,Be,S.width,S.height):Tt(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,At,Be,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,Be,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function He(P,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,P),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const pe=n.get(S.depthTexture);pe.__renderTarget=S,(!pe.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),se(S.depthTexture,0);const be=pe.__webglTexture,le=Et(S);if(S.depthTexture.format===1026)Tt(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,be,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,be,0);else if(S.depthTexture.format===1027)Tt(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,be,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,be,0);else throw new Error("Unknown depthTexture format")}function Ne(P){const S=n.get(P),$=P.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==P.depthTexture){const pe=P.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),pe){const be=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,pe.removeEventListener("dispose",be)};pe.addEventListener("dispose",be),S.__depthDisposeCallback=be}S.__boundDepthTexture=pe}if(P.depthTexture&&!S.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");He(S.__webglFramebuffer,P)}else if($){S.__webglDepthbuffer=[];for(let pe=0;pe<6;pe++)if(t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[pe]),S.__webglDepthbuffer[pe]===void 0)S.__webglDepthbuffer[pe]=s.createRenderbuffer(),ge(S.__webglDepthbuffer[pe],P,!1);else{const be=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,le=S.__webglDepthbuffer[pe];s.bindRenderbuffer(s.RENDERBUFFER,le),s.framebufferRenderbuffer(s.FRAMEBUFFER,be,s.RENDERBUFFER,le)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=s.createRenderbuffer(),ge(S.__webglDepthbuffer,P,!1);else{const pe=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,be=S.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,be),s.framebufferRenderbuffer(s.FRAMEBUFFER,pe,s.RENDERBUFFER,be)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ze(P,S,$){const pe=n.get(P);S!==void 0&&_e(pe.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),$!==void 0&&Ne(P)}function et(P){const S=P.texture,$=n.get(P),pe=n.get(S);P.addEventListener("dispose",T);const be=P.textures,le=P.isWebGLCubeRenderTarget===!0,$e=be.length>1;if($e||(pe.__webglTexture===void 0&&(pe.__webglTexture=s.createTexture()),pe.__version=S.version,a.memory.textures++),le){$.__webglFramebuffer=[];for(let xe=0;xe<6;xe++)if(S.mipmaps&&S.mipmaps.length>0){$.__webglFramebuffer[xe]=[];for(let Be=0;Be<S.mipmaps.length;Be++)$.__webglFramebuffer[xe][Be]=s.createFramebuffer()}else $.__webglFramebuffer[xe]=s.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){$.__webglFramebuffer=[];for(let xe=0;xe<S.mipmaps.length;xe++)$.__webglFramebuffer[xe]=s.createFramebuffer()}else $.__webglFramebuffer=s.createFramebuffer();if($e)for(let xe=0,Be=be.length;xe<Be;xe++){const At=n.get(be[xe]);At.__webglTexture===void 0&&(At.__webglTexture=s.createTexture(),a.memory.textures++)}if(P.samples>0&&Tt(P)===!1){$.__webglMultisampledFramebuffer=s.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let xe=0;xe<be.length;xe++){const Be=be[xe];$.__webglColorRenderbuffer[xe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,$.__webglColorRenderbuffer[xe]);const At=r.convert(Be.format,Be.colorSpace),H=r.convert(Be.type),ke=M(Be.internalFormat,At,H,Be.colorSpace,P.isXRRenderTarget===!0),qe=Et(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,qe,ke,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xe,s.RENDERBUFFER,$.__webglColorRenderbuffer[xe])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&($.__webglDepthRenderbuffer=s.createRenderbuffer(),ge($.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(le){t.bindTexture(s.TEXTURE_CUBE_MAP,pe.__webglTexture),Ee(s.TEXTURE_CUBE_MAP,S);for(let xe=0;xe<6;xe++)if(S.mipmaps&&S.mipmaps.length>0)for(let Be=0;Be<S.mipmaps.length;Be++)_e($.__webglFramebuffer[xe][Be],P,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Be);else _e($.__webglFramebuffer[xe],P,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0);m(S)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if($e){for(let xe=0,Be=be.length;xe<Be;xe++){const At=be[xe],H=n.get(At);t.bindTexture(s.TEXTURE_2D,H.__webglTexture),Ee(s.TEXTURE_2D,At),_e($.__webglFramebuffer,P,At,s.COLOR_ATTACHMENT0+xe,s.TEXTURE_2D,0),m(At)&&p(s.TEXTURE_2D)}t.unbindTexture()}else{let xe=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(xe=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(xe,pe.__webglTexture),Ee(xe,S),S.mipmaps&&S.mipmaps.length>0)for(let Be=0;Be<S.mipmaps.length;Be++)_e($.__webglFramebuffer[Be],P,S,s.COLOR_ATTACHMENT0,xe,Be);else _e($.__webglFramebuffer,P,S,s.COLOR_ATTACHMENT0,xe,0);m(S)&&p(xe),t.unbindTexture()}P.depthBuffer&&Ne(P)}function Ke(P){const S=P.textures;for(let $=0,pe=S.length;$<pe;$++){const be=S[$];if(m(be)){const le=v(P),$e=n.get(be).__webglTexture;t.bindTexture(le,$e),p(le),t.unbindTexture()}}}const _t=[],V=[];function qt(P){if(P.samples>0){if(Tt(P)===!1){const S=P.textures,$=P.width,pe=P.height;let be=s.COLOR_BUFFER_BIT;const le=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,$e=n.get(P),xe=S.length>1;if(xe)for(let Be=0;Be<S.length;Be++)t.bindFramebuffer(s.FRAMEBUFFER,$e.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Be,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,$e.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Be,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,$e.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,$e.__webglFramebuffer);for(let Be=0;Be<S.length;Be++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(be|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(be|=s.STENCIL_BUFFER_BIT)),xe){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,$e.__webglColorRenderbuffer[Be]);const At=n.get(S[Be]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,At,0)}s.blitFramebuffer(0,0,$,pe,0,0,$,pe,be,s.NEAREST),c===!0&&(_t.length=0,V.length=0,_t.push(s.COLOR_ATTACHMENT0+Be),P.depthBuffer&&P.resolveDepthBuffer===!1&&(_t.push(le),V.push(le),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,V)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,_t))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),xe)for(let Be=0;Be<S.length;Be++){t.bindFramebuffer(s.FRAMEBUFFER,$e.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Be,s.RENDERBUFFER,$e.__webglColorRenderbuffer[Be]);const At=n.get(S[Be]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,$e.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Be,s.TEXTURE_2D,At,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,$e.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const S=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function Et(P){return Math.min(i.maxSamples,P.samples)}function Tt(P){const S=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ot(P){const S=a.render.frame;u.get(P)!==S&&(u.set(P,S),P.update())}function xt(P,S){const $=P.colorSpace,pe=P.format,be=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||$!==Cn&&$!==""&&(Ot.getTransfer($)===Yt?(pe!==1023||be!==1009)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),S}function Ye(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=k,this.setTexture2D=se,this.setTexture2DArray=N,this.setTexture3D=Z,this.setTextureCube=q,this.rebindTextures=Ze,this.setupRenderTarget=et,this.updateRenderTargetMipmap=Ke,this.updateMultisampleRenderTarget=qt,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=Tt}function Zp(s,e){function t(n,i=""){let r;const a=Ot.getTransfer(i);if(n===1009)return s.UNSIGNED_BYTE;if(n===1017)return s.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return s.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===1010)return s.BYTE;if(n===1011)return s.SHORT;if(n===1012)return s.UNSIGNED_SHORT;if(n===1013)return s.INT;if(n===1014)return s.UNSIGNED_INT;if(n===1015)return s.FLOAT;if(n===1016)return s.HALF_FLOAT;if(n===1021)return s.ALPHA;if(n===1022)return s.RGB;if(n===1023)return s.RGBA;if(n===1024)return s.LUMINANCE;if(n===1025)return s.LUMINANCE_ALPHA;if(n===1026)return s.DEPTH_COMPONENT;if(n===1027)return s.DEPTH_STENCIL;if(n===1028)return s.RED;if(n===1029)return s.RED_INTEGER;if(n===1030)return s.RG;if(n===1031)return s.RG_INTEGER;if(n===1033)return s.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===Yt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===33776)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===33776)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===35840)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===36196||n===37492)return a===Yt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===37496)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===37808)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===36492)return a===Yt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===36492)return r.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class Qp extends Ln{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class yt extends nn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const $p={type:"move"};class xa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const b of e.hand.values()){const m=t.getJointPose(b,n),p=this._getHandJoint(l,b);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent($p)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new yt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const em=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,tm=`
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

}`;class nm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new fn,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ci({vertexShader:em,fragmentShader:tm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Je(new Bn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class im extends gs{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,g=null;const b=new nm,m=t.getContextAttributes();let p=null,v=null;const M=[],_=[],I=new De;let R=null;const T=new Ln;T.viewport=new Bt;const w=new Ln;w.viewport=new Bt;const y=[T,w],x=new Qp;let D=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(oe){let de=M[oe];return de===void 0&&(de=new xa,M[oe]=de),de.getTargetRaySpace()},this.getControllerGrip=function(oe){let de=M[oe];return de===void 0&&(de=new xa,M[oe]=de),de.getGripSpace()},this.getHand=function(oe){let de=M[oe];return de===void 0&&(de=new xa,M[oe]=de),de.getHandSpace()};function z(oe){const de=_.indexOf(oe.inputSource);if(de===-1)return;const _e=M[de];_e!==void 0&&(_e.update(oe.inputSource,oe.frame,l||a),_e.dispatchEvent({type:oe.type,data:oe.inputSource}))}function Y(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",Y),i.removeEventListener("inputsourceschange",se);for(let oe=0;oe<M.length;oe++){const de=_[oe];de!==null&&(_[oe]=null,M[oe].disconnect(de))}D=null,k=null,b.reset(),e.setRenderTarget(p),d=null,f=null,h=null,i=null,v=null,ze.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(oe){r=oe,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(oe){o=oe,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(oe){l=oe},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(oe){if(i=oe,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",Y),i.addEventListener("inputsourceschange",se),m.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(I),i.renderState.layers===void 0){const de={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,t,de),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new Ri(d.framebufferWidth,d.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let de=null,_e=null,ge=null;m.depth&&(ge=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=m.stencil?1027:1026,_e=m.stencil?1020:1014);const He={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:r};h=new XRWebGLBinding(i,t),f=h.createProjectionLayer(He),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new Ri(f.textureWidth,f.textureHeight,{format:1023,type:1009,depthTexture:new rl(f.textureWidth,f.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),ze.setContext(i),ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return b.getDepthTexture()};function se(oe){for(let de=0;de<oe.removed.length;de++){const _e=oe.removed[de],ge=_.indexOf(_e);ge>=0&&(_[ge]=null,M[ge].disconnect(_e))}for(let de=0;de<oe.added.length;de++){const _e=oe.added[de];let ge=_.indexOf(_e);if(ge===-1){for(let Ne=0;Ne<M.length;Ne++)if(Ne>=_.length){_.push(_e),ge=Ne;break}else if(_[Ne]===null){_[Ne]=_e,ge=Ne;break}if(ge===-1)break}const He=M[ge];He&&He.connect(_e)}}const N=new F,Z=new F;function q(oe,de,_e){N.setFromMatrixPosition(de.matrixWorld),Z.setFromMatrixPosition(_e.matrixWorld);const ge=N.distanceTo(Z),He=de.projectionMatrix.elements,Ne=_e.projectionMatrix.elements,Ze=He[14]/(He[10]-1),et=He[14]/(He[10]+1),Ke=(He[9]+1)/He[5],_t=(He[9]-1)/He[5],V=(He[8]-1)/He[0],qt=(Ne[8]+1)/Ne[0],Et=Ze*V,Tt=Ze*qt,ot=ge/(-V+qt),xt=ot*-V;if(de.matrixWorld.decompose(oe.position,oe.quaternion,oe.scale),oe.translateX(xt),oe.translateZ(ot),oe.matrixWorld.compose(oe.position,oe.quaternion,oe.scale),oe.matrixWorldInverse.copy(oe.matrixWorld).invert(),He[10]===-1)oe.projectionMatrix.copy(de.projectionMatrix),oe.projectionMatrixInverse.copy(de.projectionMatrixInverse);else{const Ye=Ze+ot,P=et+ot,S=Et-xt,$=Tt+(ge-xt),pe=Ke*et/P*Ye,be=_t*et/P*Ye;oe.projectionMatrix.makePerspective(S,$,pe,be,Ye,P),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert()}}function ce(oe,de){de===null?oe.matrixWorld.copy(oe.matrix):oe.matrixWorld.multiplyMatrices(de.matrixWorld,oe.matrix),oe.matrixWorldInverse.copy(oe.matrixWorld).invert()}this.updateCamera=function(oe){if(i===null)return;let de=oe.near,_e=oe.far;b.texture!==null&&(b.depthNear>0&&(de=b.depthNear),b.depthFar>0&&(_e=b.depthFar)),x.near=w.near=T.near=de,x.far=w.far=T.far=_e,(D!==x.near||k!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),D=x.near,k=x.far),T.layers.mask=oe.layers.mask|2,w.layers.mask=oe.layers.mask|4,x.layers.mask=T.layers.mask|w.layers.mask;const ge=oe.parent,He=x.cameras;ce(x,ge);for(let Ne=0;Ne<He.length;Ne++)ce(He[Ne],ge);He.length===2?q(x,T,w):x.projectionMatrix.copy(T.projectionMatrix),J(oe,x,ge)};function J(oe,de,_e){_e===null?oe.matrix.copy(de.matrixWorld):(oe.matrix.copy(_e.matrixWorld),oe.matrix.invert(),oe.matrix.multiply(de.matrixWorld)),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.updateMatrixWorld(!0),oe.projectionMatrix.copy(de.projectionMatrix),oe.projectionMatrixInverse.copy(de.projectionMatrixInverse),oe.isPerspectiveCamera&&(oe.fov=us*2*Math.atan(1/oe.projectionMatrix.elements[5]),oe.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(oe){c=oe,f!==null&&(f.fixedFoveation=oe),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=oe)},this.hasDepthSensing=function(){return b.texture!==null},this.getDepthSensingMesh=function(){return b.getMesh(x)};let re=null;function Ee(oe,de){if(u=de.getViewerPose(l||a),g=de,u!==null){const _e=u.views;d!==null&&(e.setRenderTargetFramebuffer(v,d.framebuffer),e.setRenderTarget(v));let ge=!1;_e.length!==x.cameras.length&&(x.cameras.length=0,ge=!0);for(let Ne=0;Ne<_e.length;Ne++){const Ze=_e[Ne];let et=null;if(d!==null)et=d.getViewport(Ze);else{const _t=h.getViewSubImage(f,Ze);et=_t.viewport,Ne===0&&(e.setRenderTargetTextures(v,_t.colorTexture,f.ignoreDepthValues?void 0:_t.depthStencilTexture),e.setRenderTarget(v))}let Ke=y[Ne];Ke===void 0&&(Ke=new Ln,Ke.layers.enable(Ne),Ke.viewport=new Bt,y[Ne]=Ke),Ke.matrix.fromArray(Ze.transform.matrix),Ke.matrix.decompose(Ke.position,Ke.quaternion,Ke.scale),Ke.projectionMatrix.fromArray(Ze.projectionMatrix),Ke.projectionMatrixInverse.copy(Ke.projectionMatrix).invert(),Ke.viewport.set(et.x,et.y,et.width,et.height),Ne===0&&(x.matrix.copy(Ke.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ge===!0&&x.cameras.push(Ke)}const He=i.enabledFeatures;if(He&&He.includes("depth-sensing")){const Ne=h.getDepthInformation(_e[0]);Ne&&Ne.isValid&&Ne.texture&&b.init(e,Ne,i.renderState)}}for(let _e=0;_e<M.length;_e++){const ge=_[_e],He=M[_e];ge!==null&&He!==void 0&&He.update(ge,de,l||a)}re&&re(oe,de),de.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:de}),g=null}const ze=new sl;ze.setAnimationLoop(Ee),this.setAnimationLoop=function(oe){re=oe},this.dispose=function(){}}}const Ui=new kn,sm=new gt;function rm(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,tl(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,v,M,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),b(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,v,M):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===1&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===1&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=e.get(p),M=v.envMap,_=v.envMapRotation;M&&(m.envMap.value=M,Ui.copy(_),Ui.x*=-1,Ui.y*=-1,Ui.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ui.y*=-1,Ui.z*=-1),m.envMapRotation.value.setFromMatrix4(sm.makeRotationFromEuler(Ui)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=M*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===1&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function b(m,p){const v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function am(s,e,t,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,M){const _=M.program;n.uniformBlockBinding(v,_)}function l(v,M){let _=i[v.id];_===void 0&&(g(v),_=u(v),i[v.id]=_,v.addEventListener("dispose",m));const I=M.program;n.updateUBOMapping(v,I);const R=e.render.frame;r[v.id]!==R&&(f(v),r[v.id]=R)}function u(v){const M=h();v.__bindingPointIndex=M;const _=s.createBuffer(),I=v.__size,R=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,_),s.bufferData(s.UNIFORM_BUFFER,I,R),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,_),_}function h(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const M=i[v.id],_=v.uniforms,I=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let R=0,T=_.length;R<T;R++){const w=Array.isArray(_[R])?_[R]:[_[R]];for(let y=0,x=w.length;y<x;y++){const D=w[y];if(d(D,R,y,I)===!0){const k=D.__offset,z=Array.isArray(D.value)?D.value:[D.value];let Y=0;for(let se=0;se<z.length;se++){const N=z[se],Z=b(N);typeof N=="number"||typeof N=="boolean"?(D.__data[0]=N,s.bufferSubData(s.UNIFORM_BUFFER,k+Y,D.__data)):N.isMatrix3?(D.__data[0]=N.elements[0],D.__data[1]=N.elements[1],D.__data[2]=N.elements[2],D.__data[3]=0,D.__data[4]=N.elements[3],D.__data[5]=N.elements[4],D.__data[6]=N.elements[5],D.__data[7]=0,D.__data[8]=N.elements[6],D.__data[9]=N.elements[7],D.__data[10]=N.elements[8],D.__data[11]=0):(N.toArray(D.__data,Y),Y+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,k,D.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(v,M,_,I){const R=v.value,T=M+"_"+_;if(I[T]===void 0)return typeof R=="number"||typeof R=="boolean"?I[T]=R:I[T]=R.clone(),!0;{const w=I[T];if(typeof R=="number"||typeof R=="boolean"){if(w!==R)return I[T]=R,!0}else if(w.equals(R)===!1)return w.copy(R),!0}return!1}function g(v){const M=v.uniforms;let _=0;const I=16;for(let T=0,w=M.length;T<w;T++){const y=Array.isArray(M[T])?M[T]:[M[T]];for(let x=0,D=y.length;x<D;x++){const k=y[x],z=Array.isArray(k.value)?k.value:[k.value];for(let Y=0,se=z.length;Y<se;Y++){const N=z[Y],Z=b(N),q=_%I,ce=q%Z.boundary,J=q+ce;_+=ce,J!==0&&I-J<Z.storage&&(_+=I-J),k.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=_,_+=Z.storage}}}const R=_%I;return R>0&&(_+=I-R),v.__size=_,v.__cache={},this}function b(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),M}function m(v){const M=v.target;M.removeEventListener("dispose",m);const _=a.indexOf(M.__bindingPointIndex);a.splice(_,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function p(){for(const v in i)s.deleteBuffer(i[v]);a=[],i={},r={}}return{bind:c,update:l,dispose:p}}class om{constructor(e={}){const{canvas:t=Kl(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const g=new Uint32Array(4),b=new Int32Array(4);let m=null,p=null;const v=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ht,this.toneMapping=0,this.toneMappingExposure=1;const _=this;let I=!1,R=0,T=0,w=null,y=-1,x=null;const D=new Bt,k=new Bt;let z=null;const Y=new rt(0);let se=0,N=t.width,Z=t.height,q=1,ce=null,J=null;const re=new Bt(0,0,N,Z),Ee=new Bt(0,0,N,Z);let ze=!1;const oe=new Ja;let de=!1,_e=!1;const ge=new gt,He=new gt,Ne=new F,Ze=new Bt,et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ke=!1;function _t(){return w===null?q:1}let V=n;function qt(A,O){return t.getContext(A,O)}try{const A={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r170"),t.addEventListener("webglcontextlost",fe,!1),t.addEventListener("webglcontextrestored",Ce,!1),t.addEventListener("webglcontextcreationerror",Ae,!1),V===null){const O="webgl2";if(V=qt(O,A),V===null)throw qt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Et,Tt,ot,xt,Ye,P,S,$,pe,be,le,$e,xe,Be,At,H,ke,qe,Qe,Fe,St,pt,Ct,G;function we(){Et=new fd(V),Et.init(),pt=new Zp(V,Et),Tt=new ad(V,Et,e,pt),ot=new Kp(V,Et),Tt.reverseDepthBuffer&&f&&ot.buffers.depth.setReversed(!0),xt=new md(V),Ye=new Ip,P=new Jp(V,Et,ot,Ye,Tt,pt,xt),S=new cd(_),$=new ud(_),pe=new Mh(V),Ct=new sd(V,pe),be=new dd(V,pe,xt,Ct),le=new bd(V,be,pe,xt),Qe=new gd(V,Tt,P),H=new od(Ye),$e=new Dp(_,S,$,Et,Tt,Ct,H),xe=new rm(_,Ye),Be=new Np,At=new Gp(Et),qe=new id(_,S,$,ot,le,d,c),ke=new jp(_,le,Tt),G=new am(V,xt,Tt,ot),Fe=new rd(V,Et,xt),St=new pd(V,Et,xt),xt.programs=$e.programs,_.capabilities=Tt,_.extensions=Et,_.properties=Ye,_.renderLists=Be,_.shadowMap=ke,_.state=ot,_.info=xt}we();const ae=new im(_,V);this.xr=ae,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const A=Et.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Et.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(A){A!==void 0&&(q=A,this.setSize(N,Z,!1))},this.getSize=function(A){return A.set(N,Z)},this.setSize=function(A,O,ie=!0){if(ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=A,Z=O,t.width=Math.floor(A*q),t.height=Math.floor(O*q),ie===!0&&(t.style.width=A+"px",t.style.height=O+"px"),this.setViewport(0,0,A,O)},this.getDrawingBufferSize=function(A){return A.set(N*q,Z*q).floor()},this.setDrawingBufferSize=function(A,O,ie){N=A,Z=O,q=ie,t.width=Math.floor(A*ie),t.height=Math.floor(O*ie),this.setViewport(0,0,A,O)},this.getCurrentViewport=function(A){return A.copy(D)},this.getViewport=function(A){return A.copy(re)},this.setViewport=function(A,O,ie,X){A.isVector4?re.set(A.x,A.y,A.z,A.w):re.set(A,O,ie,X),ot.viewport(D.copy(re).multiplyScalar(q).round())},this.getScissor=function(A){return A.copy(Ee)},this.setScissor=function(A,O,ie,X){A.isVector4?Ee.set(A.x,A.y,A.z,A.w):Ee.set(A,O,ie,X),ot.scissor(k.copy(Ee).multiplyScalar(q).round())},this.getScissorTest=function(){return ze},this.setScissorTest=function(A){ot.setScissorTest(ze=A)},this.setOpaqueSort=function(A){ce=A},this.setTransparentSort=function(A){J=A},this.getClearColor=function(A){return A.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor.apply(qe,arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha.apply(qe,arguments)},this.clear=function(A=!0,O=!0,ie=!0){let X=0;if(A){let W=!1;if(w!==null){const Me=w.texture.format;W=Me===1033||Me===1031||Me===1029}if(W){const Me=w.texture.type,Re=Me===1009||Me===1014||Me===1012||Me===1020||Me===1017||Me===1018,Xe=qe.getClearColor(),Pe=qe.getClearAlpha(),ft=Xe.r,nt=Xe.g,Te=Xe.b;Re?(g[0]=ft,g[1]=nt,g[2]=Te,g[3]=Pe,V.clearBufferuiv(V.COLOR,0,g)):(b[0]=ft,b[1]=nt,b[2]=Te,b[3]=Pe,V.clearBufferiv(V.COLOR,0,b))}else X|=V.COLOR_BUFFER_BIT}O&&(X|=V.DEPTH_BUFFER_BIT),ie&&(X|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",fe,!1),t.removeEventListener("webglcontextrestored",Ce,!1),t.removeEventListener("webglcontextcreationerror",Ae,!1),Be.dispose(),At.dispose(),Ye.dispose(),S.dispose(),$.dispose(),le.dispose(),Ct.dispose(),G.dispose(),$e.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",Ut),ae.removeEventListener("sessionend",xn),ln.stop()};function fe(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function Ce(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const A=xt.autoReset,O=ke.enabled,ie=ke.autoUpdate,X=ke.needsUpdate,W=ke.type;we(),xt.autoReset=A,ke.enabled=O,ke.autoUpdate=ie,ke.needsUpdate=X,ke.type=W}function Ae(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function tt(A){const O=A.target;O.removeEventListener("dispose",tt),zt(O)}function zt(A){$t(A),Ye.remove(A)}function $t(A){const O=Ye.get(A).programs;O!==void 0&&(O.forEach(function(ie){$e.releaseProgram(ie)}),A.isShaderMaterial&&$e.releaseShaderCache(A))}this.renderBufferDirect=function(A,O,ie,X,W,Me){O===null&&(O=et);const Re=W.isMesh&&W.matrixWorld.determinant()<0,Xe=We(A,O,ie,X,W);ot.setMaterial(X,Re);let Pe=ie.index,ft=1;if(X.wireframe===!0){if(Pe=be.getWireframeAttribute(ie),Pe===void 0)return;ft=2}const nt=ie.drawRange,Te=ie.attributes.position;let it=nt.start*ft,Mt=(nt.start+nt.count)*ft;Me!==null&&(it=Math.max(it,Me.start*ft),Mt=Math.min(Mt,(Me.start+Me.count)*ft)),Pe!==null?(it=Math.max(it,0),Mt=Math.min(Mt,Pe.count)):Te!=null&&(it=Math.max(it,0),Mt=Math.min(Mt,Te.count));const Gt=Mt-it;if(Gt<0||Gt===1/0)return;Ct.setup(W,X,Xe,ie,Pe);let Kt,bt=Fe;if(Pe!==null&&(Kt=pe.get(Pe),bt=St,bt.setIndex(Kt)),W.isMesh)X.wireframe===!0?(ot.setLineWidth(X.wireframeLinewidth*_t()),bt.setMode(V.LINES)):bt.setMode(V.TRIANGLES);else if(W.isLine){let Ge=X.linewidth;Ge===void 0&&(Ge=1),ot.setLineWidth(Ge*_t()),W.isLineSegments?bt.setMode(V.LINES):W.isLineLoop?bt.setMode(V.LINE_LOOP):bt.setMode(V.LINE_STRIP)}else W.isPoints?bt.setMode(V.POINTS):W.isSprite&&bt.setMode(V.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)bt.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(Et.get("WEBGL_multi_draw"))bt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Ge=W._multiDrawStarts,gn=W._multiDrawCounts,wt=W._multiDrawCount,te=Pe?pe.get(Pe).bytesPerElement:1,Q=Ye.get(X).currentProgram.getUniforms();for(let E=0;E<wt;E++)Q.setValue(V,"_gl_DrawID",E),bt.render(Ge[E]/te,gn[E])}else if(W.isInstancedMesh)bt.renderInstances(it,Gt,W.count);else if(ie.isInstancedBufferGeometry){const Ge=ie._maxInstanceCount!==void 0?ie._maxInstanceCount:1/0,gn=Math.min(ie.instanceCount,Ge);bt.renderInstances(it,Gt,gn)}else bt.render(it,Gt)};function It(A,O,ie){A.transparent===!0&&A.side===2&&A.forceSinglePass===!1?(A.side=1,A.needsUpdate=!0,Vt(A,O,ie),A.side=0,A.needsUpdate=!0,Vt(A,O,ie),A.side=2):Vt(A,O,ie)}this.compile=function(A,O,ie=null){ie===null&&(ie=A),p=At.get(ie),p.init(O),M.push(p),ie.traverseVisible(function(W){W.isLight&&W.layers.test(O.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),A!==ie&&A.traverseVisible(function(W){W.isLight&&W.layers.test(O.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),p.setupLights();const X=new Set;return A.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const Me=W.material;if(Me)if(Array.isArray(Me))for(let Re=0;Re<Me.length;Re++){const Xe=Me[Re];It(Xe,ie,W),X.add(Xe)}else It(Me,ie,W),X.add(Me)}),M.pop(),p=null,X},this.compileAsync=function(A,O,ie=null){const X=this.compile(A,O,ie);return new Promise(W=>{function Me(){if(X.forEach(function(Re){Ye.get(Re).currentProgram.isReady()&&X.delete(Re)}),X.size===0){W(A);return}setTimeout(Me,10)}Et.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let on=null;function cn(A){on&&on(A)}function Ut(){ln.stop()}function xn(){ln.start()}const ln=new sl;ln.setAnimationLoop(cn),typeof self<"u"&&ln.setContext(self),this.setAnimationLoop=function(A){on=A,ae.setAnimationLoop(A),A===null?ln.stop():ln.start()},ae.addEventListener("sessionstart",Ut),ae.addEventListener("sessionend",xn),this.render=function(A,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(O),O=ae.getCamera()),A.isScene===!0&&A.onBeforeRender(_,A,O,w),p=At.get(A,M.length),p.init(O),M.push(p),He.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),oe.setFromProjectionMatrix(He),_e=this.localClippingEnabled,de=H.init(this.clippingPlanes,_e),m=Be.get(A,v.length),m.init(),v.push(m),ae.enabled===!0&&ae.isPresenting===!0){const Me=_.xr.getDepthSensingMesh();Me!==null&&ut(Me,O,-1/0,_.sortObjects)}ut(A,O,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(ce,J),Ke=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,Ke&&qe.addToRenderList(m,A),this.info.render.frame++,de===!0&&H.beginShadows();const ie=p.state.shadowsArray;ke.render(ie,A,O),de===!0&&H.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=m.opaque,W=m.transmissive;if(p.setupLights(),O.isArrayCamera){const Me=O.cameras;if(W.length>0)for(let Re=0,Xe=Me.length;Re<Xe;Re++){const Pe=Me[Re];Qn(X,W,A,Pe)}Ke&&qe.render(A);for(let Re=0,Xe=Me.length;Re<Xe;Re++){const Pe=Me[Re];vn(m,A,Pe,Pe.viewport)}}else W.length>0&&Qn(X,W,A,O),Ke&&qe.render(A),vn(m,A,O);w!==null&&(P.updateMultisampleRenderTarget(w),P.updateRenderTargetMipmap(w)),A.isScene===!0&&A.onAfterRender(_,A,O),Ct.resetDefaultState(),y=-1,x=null,M.pop(),M.length>0?(p=M[M.length-1],de===!0&&H.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function ut(A,O,ie,X){if(A.visible===!1)return;if(A.layers.test(O.layers)){if(A.isGroup)ie=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(O);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||oe.intersectsSprite(A)){X&&Ze.setFromMatrixPosition(A.matrixWorld).applyMatrix4(He);const Re=le.update(A),Xe=A.material;Xe.visible&&m.push(A,Re,Xe,ie,Ze.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||oe.intersectsObject(A))){const Re=le.update(A),Xe=A.material;if(X&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ze.copy(A.boundingSphere.center)):(Re.boundingSphere===null&&Re.computeBoundingSphere(),Ze.copy(Re.boundingSphere.center)),Ze.applyMatrix4(A.matrixWorld).applyMatrix4(He)),Array.isArray(Xe)){const Pe=Re.groups;for(let ft=0,nt=Pe.length;ft<nt;ft++){const Te=Pe[ft],it=Xe[Te.materialIndex];it&&it.visible&&m.push(A,Re,it,ie,Ze.z,Te)}}else Xe.visible&&m.push(A,Re,Xe,ie,Ze.z,null)}}const Me=A.children;for(let Re=0,Xe=Me.length;Re<Xe;Re++)ut(Me[Re],O,ie,X)}function vn(A,O,ie,X){const W=A.opaque,Me=A.transmissive,Re=A.transparent;p.setupLightsView(ie),de===!0&&H.setGlobalState(_.clippingPlanes,ie),X&&ot.viewport(D.copy(X)),W.length>0&&rn(W,O,ie),Me.length>0&&rn(Me,O,ie),Re.length>0&&rn(Re,O,ie),ot.buffers.depth.setTest(!0),ot.buffers.depth.setMask(!0),ot.buffers.color.setMask(!0),ot.setPolygonOffset(!1)}function Qn(A,O,ie,X){if((ie.isScene===!0?ie.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[X.id]===void 0&&(p.state.transmissionRenderTarget[X.id]=new Ri(1,1,{generateMipmaps:!0,type:Et.has("EXT_color_buffer_half_float")||Et.has("EXT_color_buffer_float")?1016:1009,minFilter:1008,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ot.workingColorSpace}));const Me=p.state.transmissionRenderTarget[X.id],Re=X.viewport||D;Me.setSize(Re.z,Re.w);const Xe=_.getRenderTarget();_.setRenderTarget(Me),_.getClearColor(Y),se=_.getClearAlpha(),se<1&&_.setClearColor(16777215,.5),_.clear(),Ke&&qe.render(ie);const Pe=_.toneMapping;_.toneMapping=0;const ft=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),p.setupLightsView(X),de===!0&&H.setGlobalState(_.clippingPlanes,X),rn(A,ie,X),P.updateMultisampleRenderTarget(Me),P.updateRenderTargetMipmap(Me),Et.has("WEBGL_multisampled_render_to_texture")===!1){let nt=!1;for(let Te=0,it=O.length;Te<it;Te++){const Mt=O[Te],Gt=Mt.object,Kt=Mt.geometry,bt=Mt.material,Ge=Mt.group;if(bt.side===2&&Gt.layers.test(X.layers)){const gn=bt.side;bt.side=1,bt.needsUpdate=!0,hn(Gt,ie,X,Kt,bt,Ge),bt.side=gn,bt.needsUpdate=!0,nt=!0}}nt===!0&&(P.updateMultisampleRenderTarget(Me),P.updateRenderTargetMipmap(Me))}_.setRenderTarget(Xe),_.setClearColor(Y,se),ft!==void 0&&(X.viewport=ft),_.toneMapping=Pe}function rn(A,O,ie){const X=O.isScene===!0?O.overrideMaterial:null;for(let W=0,Me=A.length;W<Me;W++){const Re=A[W],Xe=Re.object,Pe=Re.geometry,ft=X===null?Re.material:X,nt=Re.group;Xe.layers.test(ie.layers)&&hn(Xe,O,ie,Pe,ft,nt)}}function hn(A,O,ie,X,W,Me){A.onBeforeRender(_,O,ie,X,W,Me),A.modelViewMatrix.multiplyMatrices(ie.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),W.onBeforeRender(_,O,ie,X,A,Me),W.transparent===!0&&W.side===2&&W.forceSinglePass===!1?(W.side=1,W.needsUpdate=!0,_.renderBufferDirect(ie,O,X,W,A,Me),W.side=0,W.needsUpdate=!0,_.renderBufferDirect(ie,O,X,W,A,Me),W.side=2):_.renderBufferDirect(ie,O,X,W,A,Me),A.onAfterRender(_,O,ie,X,W,Me)}function Vt(A,O,ie){O.isScene!==!0&&(O=et);const X=Ye.get(A),W=p.state.lights,Me=p.state.shadowsArray,Re=W.state.version,Xe=$e.getParameters(A,W.state,Me,O,ie),Pe=$e.getProgramCacheKey(Xe);let ft=X.programs;X.environment=A.isMeshStandardMaterial?O.environment:null,X.fog=O.fog,X.envMap=(A.isMeshStandardMaterial?$:S).get(A.envMap||X.environment),X.envMapRotation=X.environment!==null&&A.envMap===null?O.environmentRotation:A.envMapRotation,ft===void 0&&(A.addEventListener("dispose",tt),ft=new Map,X.programs=ft);let nt=ft.get(Pe);if(nt!==void 0){if(X.currentProgram===nt&&X.lightsStateVersion===Re)return zn(A,Xe),nt}else Xe.uniforms=$e.getUniforms(A),A.onBeforeCompile(Xe,_),nt=$e.acquireProgram(Xe,Pe),ft.set(Pe,nt),X.uniforms=Xe.uniforms;const Te=X.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Te.clippingPlanes=H.uniform),zn(A,Xe),X.needsLights=en(A),X.lightsStateVersion=Re,X.needsLights&&(Te.ambientLightColor.value=W.state.ambient,Te.lightProbe.value=W.state.probe,Te.directionalLights.value=W.state.directional,Te.directionalLightShadows.value=W.state.directionalShadow,Te.spotLights.value=W.state.spot,Te.spotLightShadows.value=W.state.spotShadow,Te.rectAreaLights.value=W.state.rectArea,Te.ltc_1.value=W.state.rectAreaLTC1,Te.ltc_2.value=W.state.rectAreaLTC2,Te.pointLights.value=W.state.point,Te.pointLightShadows.value=W.state.pointShadow,Te.hemisphereLights.value=W.state.hemi,Te.directionalShadowMap.value=W.state.directionalShadowMap,Te.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Te.spotShadowMap.value=W.state.spotShadowMap,Te.spotLightMatrix.value=W.state.spotLightMatrix,Te.spotLightMap.value=W.state.spotLightMap,Te.pointShadowMap.value=W.state.pointShadowMap,Te.pointShadowMatrix.value=W.state.pointShadowMatrix),X.currentProgram=nt,X.uniformsList=null,nt}function In(A){if(A.uniformsList===null){const O=A.currentProgram.getUniforms();A.uniformsList=Fr.seqWithValue(O.seq,A.uniforms)}return A.uniformsList}function zn(A,O){const ie=Ye.get(A);ie.outputColorSpace=O.outputColorSpace,ie.batching=O.batching,ie.batchingColor=O.batchingColor,ie.instancing=O.instancing,ie.instancingColor=O.instancingColor,ie.instancingMorph=O.instancingMorph,ie.skinning=O.skinning,ie.morphTargets=O.morphTargets,ie.morphNormals=O.morphNormals,ie.morphColors=O.morphColors,ie.morphTargetsCount=O.morphTargetsCount,ie.numClippingPlanes=O.numClippingPlanes,ie.numIntersection=O.numClipIntersection,ie.vertexAlphas=O.vertexAlphas,ie.vertexTangents=O.vertexTangents,ie.toneMapping=O.toneMapping}function We(A,O,ie,X,W){O.isScene!==!0&&(O=et),P.resetTextureUnits();const Me=O.fog,Re=X.isMeshStandardMaterial?O.environment:null,Xe=w===null?_.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Cn,Pe=(X.isMeshStandardMaterial?$:S).get(X.envMap||Re),ft=X.vertexColors===!0&&!!ie.attributes.color&&ie.attributes.color.itemSize===4,nt=!!ie.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Te=!!ie.morphAttributes.position,it=!!ie.morphAttributes.normal,Mt=!!ie.morphAttributes.color;let Gt=0;X.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Gt=_.toneMapping);const Kt=ie.morphAttributes.position||ie.morphAttributes.normal||ie.morphAttributes.color,bt=Kt!==void 0?Kt.length:0,Ge=Ye.get(X),gn=p.state.lights;if(de===!0&&(_e===!0||A!==x)){const ee=A===x&&X.id===y;H.setState(X,A,ee)}let wt=!1;X.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==gn.state.version||Ge.outputColorSpace!==Xe||W.isBatchedMesh&&Ge.batching===!1||!W.isBatchedMesh&&Ge.batching===!0||W.isBatchedMesh&&Ge.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Ge.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Ge.instancing===!1||!W.isInstancedMesh&&Ge.instancing===!0||W.isSkinnedMesh&&Ge.skinning===!1||!W.isSkinnedMesh&&Ge.skinning===!0||W.isInstancedMesh&&Ge.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ge.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ge.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ge.instancingMorph===!1&&W.morphTexture!==null||Ge.envMap!==Pe||X.fog===!0&&Ge.fog!==Me||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==H.numPlanes||Ge.numIntersection!==H.numIntersection)||Ge.vertexAlphas!==ft||Ge.vertexTangents!==nt||Ge.morphTargets!==Te||Ge.morphNormals!==it||Ge.morphColors!==Mt||Ge.toneMapping!==Gt||Ge.morphTargetsCount!==bt)&&(wt=!0):(wt=!0,Ge.__version=X.version);let te=Ge.currentProgram;wt===!0&&(te=Vt(X,O,W));let Q=!1,E=!1,L=!1;const C=te.getUniforms(),B=Ge.uniforms;if(ot.useProgram(te.program)&&(Q=!0,E=!0,L=!0),X.id!==y&&(y=X.id,E=!0),Q||x!==A){ot.buffers.depth.getReversed()?(ge.copy(A.projectionMatrix),Jl(ge),Zl(ge),C.setValue(V,"projectionMatrix",ge)):C.setValue(V,"projectionMatrix",A.projectionMatrix),C.setValue(V,"viewMatrix",A.matrixWorldInverse);const he=C.map.cameraPosition;he!==void 0&&he.setValue(V,Ne.setFromMatrixPosition(A.matrixWorld)),Tt.logarithmicDepthBuffer&&C.setValue(V,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&C.setValue(V,"isOrthographic",A.isOrthographicCamera===!0),x!==A&&(x=A,E=!0,L=!0)}if(W.isSkinnedMesh){C.setOptional(V,W,"bindMatrix"),C.setOptional(V,W,"bindMatrixInverse");const ee=W.skeleton;ee&&(ee.boneTexture===null&&ee.computeBoneTexture(),C.setValue(V,"boneTexture",ee.boneTexture,P))}W.isBatchedMesh&&(C.setOptional(V,W,"batchingTexture"),C.setValue(V,"batchingTexture",W._matricesTexture,P),C.setOptional(V,W,"batchingIdTexture"),C.setValue(V,"batchingIdTexture",W._indirectTexture,P),C.setOptional(V,W,"batchingColorTexture"),W._colorsTexture!==null&&C.setValue(V,"batchingColorTexture",W._colorsTexture,P));const j=ie.morphAttributes;if((j.position!==void 0||j.normal!==void 0||j.color!==void 0)&&Qe.update(W,ie,te),(E||Ge.receiveShadow!==W.receiveShadow)&&(Ge.receiveShadow=W.receiveShadow,C.setValue(V,"receiveShadow",W.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(B.envMap.value=Pe,B.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&O.environment!==null&&(B.envMapIntensity.value=O.environmentIntensity),E&&(C.setValue(V,"toneMappingExposure",_.toneMappingExposure),Ge.needsLights&&$n(B,L),Me&&X.fog===!0&&xe.refreshFogUniforms(B,Me),xe.refreshMaterialUniforms(B,X,q,Z,p.state.transmissionRenderTarget[A.id]),Fr.upload(V,In(Ge),B,P)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Fr.upload(V,In(Ge),B,P),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&C.setValue(V,"center",W.center),C.setValue(V,"modelViewMatrix",W.modelViewMatrix),C.setValue(V,"normalMatrix",W.normalMatrix),C.setValue(V,"modelMatrix",W.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const ee=X.uniformsGroups;for(let he=0,me=ee.length;he<me;he++){const ye=ee[he];G.update(ye,te),G.bind(ye,te)}}return te}function $n(A,O){A.ambientLightColor.needsUpdate=O,A.lightProbe.needsUpdate=O,A.directionalLights.needsUpdate=O,A.directionalLightShadows.needsUpdate=O,A.pointLights.needsUpdate=O,A.pointLightShadows.needsUpdate=O,A.spotLights.needsUpdate=O,A.spotLightShadows.needsUpdate=O,A.rectAreaLights.needsUpdate=O,A.hemisphereLights.needsUpdate=O}function en(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(A,O,ie){Ye.get(A.texture).__webglTexture=O,Ye.get(A.depthTexture).__webglTexture=ie;const X=Ye.get(A);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=ie===void 0,X.__autoAllocateDepthBuffer||Et.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,O){const ie=Ye.get(A);ie.__webglFramebuffer=O,ie.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(A,O=0,ie=0){w=A,R=O,T=ie;let X=!0,W=null,Me=!1,Re=!1;if(A){const Pe=Ye.get(A);if(Pe.__useDefaultFramebuffer!==void 0)ot.bindFramebuffer(V.FRAMEBUFFER,null),X=!1;else if(Pe.__webglFramebuffer===void 0)P.setupRenderTarget(A);else if(Pe.__hasExternalTextures)P.rebindTextures(A,Ye.get(A.texture).__webglTexture,Ye.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Te=A.depthTexture;if(Pe.__boundDepthTexture!==Te){if(Te!==null&&Ye.has(Te)&&(A.width!==Te.image.width||A.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(A)}}const ft=A.texture;(ft.isData3DTexture||ft.isDataArrayTexture||ft.isCompressedArrayTexture)&&(Re=!0);const nt=Ye.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(nt[O])?W=nt[O][ie]:W=nt[O],Me=!0):A.samples>0&&P.useMultisampledRTT(A)===!1?W=Ye.get(A).__webglMultisampledFramebuffer:Array.isArray(nt)?W=nt[ie]:W=nt,D.copy(A.viewport),k.copy(A.scissor),z=A.scissorTest}else D.copy(re).multiplyScalar(q).floor(),k.copy(Ee).multiplyScalar(q).floor(),z=ze;if(ot.bindFramebuffer(V.FRAMEBUFFER,W)&&X&&ot.drawBuffers(A,W),ot.viewport(D),ot.scissor(k),ot.setScissorTest(z),Me){const Pe=Ye.get(A.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+O,Pe.__webglTexture,ie)}else if(Re){const Pe=Ye.get(A.texture),ft=O||0;V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,Pe.__webglTexture,ie||0,ft)}y=-1},this.readRenderTargetPixels=function(A,O,ie,X,W,Me,Re){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Xe=Ye.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Re!==void 0&&(Xe=Xe[Re]),Xe){ot.bindFramebuffer(V.FRAMEBUFFER,Xe);try{const Pe=A.texture,ft=Pe.format,nt=Pe.type;if(!Tt.textureFormatReadable(ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Tt.textureTypeReadable(nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=A.width-X&&ie>=0&&ie<=A.height-W&&V.readPixels(O,ie,X,W,pt.convert(ft),pt.convert(nt),Me)}finally{const Pe=w!==null?Ye.get(w).__webglFramebuffer:null;ot.bindFramebuffer(V.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(A,O,ie,X,W,Me,Re){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Xe=Ye.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Re!==void 0&&(Xe=Xe[Re]),Xe){const Pe=A.texture,ft=Pe.format,nt=Pe.type;if(!Tt.textureFormatReadable(ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Tt.textureTypeReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=A.width-X&&ie>=0&&ie<=A.height-W){ot.bindFramebuffer(V.FRAMEBUFFER,Xe);const Te=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,Te),V.bufferData(V.PIXEL_PACK_BUFFER,Me.byteLength,V.STREAM_READ),V.readPixels(O,ie,X,W,pt.convert(ft),pt.convert(nt),0);const it=w!==null?Ye.get(w).__webglFramebuffer:null;ot.bindFramebuffer(V.FRAMEBUFFER,it);const Mt=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await Yl(V,Mt,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,Te),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,Me),V.deleteBuffer(Te),V.deleteSync(Mt),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,O=null,ie=0){A.isTexture!==!0&&(Ns("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,A=arguments[1]);const X=Math.pow(2,-ie),W=Math.floor(A.image.width*X),Me=Math.floor(A.image.height*X),Re=O!==null?O.x:0,Xe=O!==null?O.y:0;P.setTexture2D(A,0),V.copyTexSubImage2D(V.TEXTURE_2D,ie,0,0,Re,Xe,W,Me),ot.unbindTexture()},this.copyTextureToTexture=function(A,O,ie=null,X=null,W=0){A.isTexture!==!0&&(Ns("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,A=arguments[1],O=arguments[2],W=arguments[3]||0,ie=null);let Me,Re,Xe,Pe,ft,nt,Te,it,Mt;const Gt=A.isCompressedTexture?A.mipmaps[W]:A.image;ie!==null?(Me=ie.max.x-ie.min.x,Re=ie.max.y-ie.min.y,Xe=ie.isBox3?ie.max.z-ie.min.z:1,Pe=ie.min.x,ft=ie.min.y,nt=ie.isBox3?ie.min.z:0):(Me=Gt.width,Re=Gt.height,Xe=Gt.depth||1,Pe=0,ft=0,nt=0),X!==null?(Te=X.x,it=X.y,Mt=X.z):(Te=0,it=0,Mt=0);const Kt=pt.convert(O.format),bt=pt.convert(O.type);let Ge;O.isData3DTexture?(P.setTexture3D(O,0),Ge=V.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(P.setTexture2DArray(O,0),Ge=V.TEXTURE_2D_ARRAY):(P.setTexture2D(O,0),Ge=V.TEXTURE_2D),V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,O.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,O.unpackAlignment);const gn=V.getParameter(V.UNPACK_ROW_LENGTH),wt=V.getParameter(V.UNPACK_IMAGE_HEIGHT),te=V.getParameter(V.UNPACK_SKIP_PIXELS),Q=V.getParameter(V.UNPACK_SKIP_ROWS),E=V.getParameter(V.UNPACK_SKIP_IMAGES);V.pixelStorei(V.UNPACK_ROW_LENGTH,Gt.width),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,Gt.height),V.pixelStorei(V.UNPACK_SKIP_PIXELS,Pe),V.pixelStorei(V.UNPACK_SKIP_ROWS,ft),V.pixelStorei(V.UNPACK_SKIP_IMAGES,nt);const L=A.isDataArrayTexture||A.isData3DTexture,C=O.isDataArrayTexture||O.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){const B=Ye.get(A),j=Ye.get(O),ee=Ye.get(B.__renderTarget),he=Ye.get(j.__renderTarget);ot.bindFramebuffer(V.READ_FRAMEBUFFER,ee.__webglFramebuffer),ot.bindFramebuffer(V.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let me=0;me<Xe;me++)L&&V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,Ye.get(A).__webglTexture,W,nt+me),A.isDepthTexture?(C&&V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,Ye.get(O).__webglTexture,W,Mt+me),V.blitFramebuffer(Pe,ft,Me,Re,Te,it,Me,Re,V.DEPTH_BUFFER_BIT,V.NEAREST)):C?V.copyTexSubImage3D(Ge,W,Te,it,Mt+me,Pe,ft,Me,Re):V.copyTexSubImage2D(Ge,W,Te,it,Mt+me,Pe,ft,Me,Re);ot.bindFramebuffer(V.READ_FRAMEBUFFER,null),ot.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else C?A.isDataTexture||A.isData3DTexture?V.texSubImage3D(Ge,W,Te,it,Mt,Me,Re,Xe,Kt,bt,Gt.data):O.isCompressedArrayTexture?V.compressedTexSubImage3D(Ge,W,Te,it,Mt,Me,Re,Xe,Kt,Gt.data):V.texSubImage3D(Ge,W,Te,it,Mt,Me,Re,Xe,Kt,bt,Gt):A.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,W,Te,it,Me,Re,Kt,bt,Gt.data):A.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,W,Te,it,Gt.width,Gt.height,Kt,Gt.data):V.texSubImage2D(V.TEXTURE_2D,W,Te,it,Me,Re,Kt,bt,Gt);V.pixelStorei(V.UNPACK_ROW_LENGTH,gn),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,wt),V.pixelStorei(V.UNPACK_SKIP_PIXELS,te),V.pixelStorei(V.UNPACK_SKIP_ROWS,Q),V.pixelStorei(V.UNPACK_SKIP_IMAGES,E),W===0&&O.generateMipmaps&&V.generateMipmap(Ge),ot.unbindTexture()},this.copyTextureToTexture3D=function(A,O,ie=null,X=null,W=0){return A.isTexture!==!0&&(Ns("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ie=arguments[0]||null,X=arguments[1]||null,A=arguments[2],O=arguments[3],W=arguments[4]||0),Ns('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,O,ie,X,W)},this.initRenderTarget=function(A){Ye.get(A).__webglFramebuffer===void 0&&P.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?P.setTextureCube(A,0):A.isData3DTexture?P.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?P.setTexture2DArray(A,0):P.setTexture2D(A,0),ot.unbindTexture()},this.resetState=function(){R=0,T=0,w=null,ot.reset(),Ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Ot._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ot._getUnpackColorSpace()}}class ac extends nn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class hl{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=Zn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const wn=new F;class Vs{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyMatrix4(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyNormalMatrix(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.transformDirection(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Jn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Wt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Wt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Jn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Jn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Jn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Jn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),i=Wt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),i=Wt(i,this.array),r=Wt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new jt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Vs(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ul extends Xn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new rt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let is;const Ts=new F,ss=new F,rs=new F,as=new De,As=new De,fl=new gt,xr=new F,ws=new F,vr=new F,oc=new De,va=new De,cc=new De;class cm extends nn{constructor(e=new ul){if(super(),this.isSprite=!0,this.type="Sprite",is===void 0){is=new Jt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new hl(t,5);is.setIndex([0,1,2,0,2,3]),is.setAttribute("position",new Vs(n,3,0,!1)),is.setAttribute("uv",new Vs(n,2,3,!1))}this.geometry=is,this.material=e,this.center=new De(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ss.setFromMatrixScale(this.matrixWorld),fl.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),rs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ss.multiplyScalar(-rs.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Mr(xr.set(-.5,-.5,0),rs,a,ss,i,r),Mr(ws.set(.5,-.5,0),rs,a,ss,i,r),Mr(vr.set(.5,.5,0),rs,a,ss,i,r),oc.set(0,0),va.set(1,0),cc.set(1,1);let o=e.ray.intersectTriangle(xr,ws,vr,!1,Ts);if(o===null&&(Mr(ws.set(-.5,.5,0),rs,a,ss,i,r),va.set(0,1),o=e.ray.intersectTriangle(xr,vr,ws,!1,Ts),o===null))return;const c=e.ray.origin.distanceTo(Ts);c<e.near||c>e.far||t.push({distance:c,point:Ts.clone(),uv:Vn.getInterpolation(Ts,xr,ws,vr,oc,va,cc,new De),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Mr(s,e,t,n,i,r){as.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(As.x=r*as.x-i*as.y,As.y=i*as.x+r*as.y):As.copy(as),s.copy(e),s.x+=As.x,s.y+=As.y,s.applyMatrix4(fl)}const lc=new F,hc=new Bt,uc=new Bt,lm=new F,fc=new gt,yr=new F,Ma=new ii,dc=new gt,ya=new kr;class hm extends Je{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=uo,this.bindMatrix=new gt,this.bindMatrixInverse=new gt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new En),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,yr),this.boundingBox.expandByPoint(yr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ii),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,yr),this.boundingSphere.expandByPoint(yr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ma.copy(this.boundingSphere),Ma.applyMatrix4(i),e.ray.intersectsSphere(Ma)!==!1&&(dc.copy(i).invert(),ya.copy(e.ray).applyMatrix4(dc),!(this.boundingBox!==null&&ya.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ya)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Bt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===uo?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Pl?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;hc.fromBufferAttribute(i.attributes.skinIndex,e),uc.fromBufferAttribute(i.attributes.skinWeight,e),lc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=uc.getComponent(r);if(a!==0){const o=hc.getComponent(r);fc.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(lm.copy(lc).applyMatrix4(fc),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class dl extends nn{constructor(){super(),this.isBone=!0,this.type="Bone"}}class pl extends fn{constructor(e=null,t=1,n=1,i,r,a,o,c,l=1003,u=1003,h,f){super(null,a,o,c,l,u,i,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const pc=new gt,um=new gt;class Qa{constructor(e=[],t=[]){this.uuid=Zn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new gt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new gt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:um;pc.multiplyMatrices(o,t[r]),pc.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Qa(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new pl(t,e,e,1023,1015);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new dl),this.bones.push(a),this.boneInverses.push(new gt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class Ga extends jt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const os=new gt,mc=new gt,Sr=[],gc=new En,fm=new gt,Rs=new Je,Cs=new ii;class Wn extends Je{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ga(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,fm)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new En),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,os),gc.copy(e.boundingBox).applyMatrix4(os),this.boundingBox.union(gc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ii),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,os),Cs.copy(e.boundingSphere).applyMatrix4(os),this.boundingSphere.union(Cs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Rs.geometry=this.geometry,Rs.material=this.material,Rs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Cs.copy(this.boundingSphere),Cs.applyMatrix4(n),e.ray.intersectsSphere(Cs)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,os),mc.multiplyMatrices(n,os),Rs.matrixWorld=mc,Rs.raycast(e,Sr);for(let a=0,o=Sr.length;a<o;a++){const c=Sr[a];c.instanceId=r,c.object=this,t.push(c)}Sr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ga(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new pl(new Float32Array(i*this.count),i,this.count,1028,1015));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class $a extends Xn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new rt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Nr=new F,Ur=new F,bc=new gt,Ps=new kr,Er=new ii,Sa=new F,_c=new F;class Hr extends nn{constructor(e=new Jt,t=new $a){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Nr.fromBufferAttribute(t,i-1),Ur.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Nr.distanceTo(Ur);e.setAttribute("lineDistance",new kt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Er.copy(n.boundingSphere),Er.applyMatrix4(i),Er.radius+=r,e.ray.intersectsSphere(Er)===!1)return;bc.copy(i).invert(),Ps.copy(e.ray).applyMatrix4(bc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let b=d,m=g-1;b<m;b+=l){const p=u.getX(b),v=u.getX(b+1),M=Tr(this,e,Ps,c,p,v);M&&t.push(M)}if(this.isLineLoop){const b=u.getX(g-1),m=u.getX(d),p=Tr(this,e,Ps,c,b,m);p&&t.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let b=d,m=g-1;b<m;b+=l){const p=Tr(this,e,Ps,c,b,b+1);p&&t.push(p)}if(this.isLineLoop){const b=Tr(this,e,Ps,c,g-1,d);b&&t.push(b)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Tr(s,e,t,n,i,r){const a=s.geometry.attributes.position;if(Nr.fromBufferAttribute(a,i),Ur.fromBufferAttribute(a,r),t.distanceSqToSegment(Nr,Ur,Sa,_c)>n)return;Sa.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Sa);if(!(c<e.near||c>e.far))return{distance:c,point:_c.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const xc=new F,vc=new F;class dm extends Hr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)xc.fromBufferAttribute(t,i),vc.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+xc.distanceTo(vc);e.setAttribute("lineDistance",new kt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class pm extends Hr{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class ml extends Xn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new rt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Mc=new gt,Ha=new kr,Ar=new ii,wr=new F;class mm extends nn{constructor(e=new Jt,t=new ml){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere),Ar.applyMatrix4(i),Ar.radius+=r,e.ray.intersectsSphere(Ar)===!1)return;Mc.copy(i).invert(),Ha.copy(e.ray).applyMatrix4(Mc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){const f=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);for(let g=f,b=d;g<b;g++){const m=l.getX(g);wr.fromBufferAttribute(h,m),yc(wr,m,c,i,e,t,this)}}else{const f=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);for(let g=f,b=d;g<b;g++)wr.fromBufferAttribute(h,g),yc(wr,g,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function yc(s,e,t,n,i,r,a){const o=Ha.distanceSqToPoint(s);if(o<t){const c=new F;Ha.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class ni extends fn{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class si{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(r-1);const u=n[i],f=n[i+1]-u,d=(a-u)/f;return(i+d)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),c=t||(a.isVector2?new De:new F);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new F,i=[],r=[],a=[],o=new F,c=new gt;for(let d=0;d<=e;d++){const g=d/e;i[d]=this.getTangentAt(g,new F)}r[0]=new F,a[0]=new F;let l=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),f<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(dn(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(o,g))}a[d].crossVectors(i[d],r[d])}if(t===!0){let d=Math.acos(dn(r[0].dot(r[e]),-1,1));d/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(d=-d);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],d*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class eo extends si{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new De){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*u-d*h+this.aX,l=f*h+d*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class gm extends eo{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function to(){let s=0,e=0,t=0,n=0;function i(r,a,o,c){s=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){i(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,h){let f=(a-r)/l-(o-r)/(l+u)+(o-a)/u,d=(o-a)/u-(c-a)/(u+h)+(c-o)/h;f*=u,d*=u,i(a,o,f,d)},calc:function(r){const a=r*r,o=a*r;return s+e*r+t*a+n*o}}}const Rr=new F,Ea=new to,Ta=new to,Aa=new to;class no extends si{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new F){const n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=i[(o-1)%r]:(Rr.subVectors(i[0],i[1]).add(i[0]),l=Rr);const h=i[o%r],f=i[(o+1)%r];if(this.closed||o+2<r?u=i[(o+2)%r]:(Rr.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=Rr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),d),b=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);b<1e-4&&(b=1),g<1e-4&&(g=b),m<1e-4&&(m=b),Ea.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,g,b,m),Ta.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,g,b,m),Aa.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,g,b,m)}else this.curveType==="catmullrom"&&(Ea.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),Ta.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),Aa.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return n.set(Ea.calc(c),Ta.calc(c),Aa.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new F().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Sc(s,e,t,n,i){const r=(n-e)*.5,a=(i-t)*.5,o=s*s,c=s*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*s+t}function bm(s,e){const t=1-s;return t*t*e}function _m(s,e){return 2*(1-s)*s*e}function xm(s,e){return s*s*e}function ks(s,e,t,n){return bm(s,e)+_m(s,t)+xm(s,n)}function vm(s,e){const t=1-s;return t*t*t*e}function Mm(s,e){const t=1-s;return 3*t*t*s*e}function ym(s,e){return 3*(1-s)*s*s*e}function Sm(s,e){return s*s*s*e}function zs(s,e,t,n,i){return vm(s,e)+Mm(s,t)+ym(s,n)+Sm(s,i)}class gl extends si{constructor(e=new De,t=new De,n=new De,i=new De){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new De){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(zs(e,i.x,r.x,a.x,o.x),zs(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Em extends si{constructor(e=new F,t=new F,n=new F,i=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new F){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(zs(e,i.x,r.x,a.x,o.x),zs(e,i.y,r.y,a.y,o.y),zs(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class bl extends si{constructor(e=new De,t=new De){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new De){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new De){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class _l extends si{constructor(e=new F,t=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new F){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new F){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class xl extends si{constructor(e=new De,t=new De,n=new De){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new De){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(ks(e,i.x,r.x,a.x),ks(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class vl extends si{constructor(e=new F,t=new F,n=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new F){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(ks(e,i.x,r.x,a.x),ks(e,i.y,r.y,a.y),ks(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ml extends si{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new De){const n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,c=i[a===0?a:a-1],l=i[a],u=i[a>i.length-2?i.length-1:a+1],h=i[a>i.length-3?i.length-1:a+2];return n.set(Sc(o,c.x,l.x,u.x,h.x),Sc(o,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new De().fromArray(i))}return this}}var Va=Object.freeze({__proto__:null,ArcCurve:gm,CatmullRomCurve3:no,CubicBezierCurve:gl,CubicBezierCurve3:Em,EllipseCurve:eo,LineCurve:bl,LineCurve3:_l,QuadraticBezierCurve:xl,QuadraticBezierCurve3:vl,SplineCurve:Ml});class yl extends si{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Va[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Va[i.type]().fromJSON(i))}return this}}class Tm extends yl{constructor(e){super(),this.type="Path",this.currentPoint=new De,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new bl(this.currentPoint.clone(),new De(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new xl(this.currentPoint.clone(),new De(e,t),new De(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,a){const o=new gl(this.currentPoint.clone(),new De(e,t),new De(n,i),new De(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Ml(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,r,a),this}absarc(e,t,n,i,r,a){return this.absellipse(e,t,n,n,i,r,a),this}ellipse(e,t,n,i,r,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,i,r,a,o,c),this}absellipse(e,t,n,i,r,a,o,c){const l=new eo(e,t,n,i,r,a,o,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class io extends Jt{constructor(e=[new De(0,-.5),new De(.5,0),new De(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=dn(i,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],u=1/t,h=new F,f=new De,d=new F,g=new F,b=new F;let m=0,p=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:m=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,d.x=p*1,d.y=-m,d.z=p*0,b.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case e.length-1:c.push(b.x,b.y,b.z);break;default:m=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=b.x,d.y+=b.y,d.z+=b.z,d.normalize(),c.push(d.x,d.y,d.z),b.copy(g)}for(let v=0;v<=t;v++){const M=n+v*u*i,_=Math.sin(M),I=Math.cos(M);for(let R=0;R<=e.length-1;R++){h.x=e[R].x*_,h.y=e[R].y,h.z=e[R].x*I,a.push(h.x,h.y,h.z),f.x=v/t,f.y=R/(e.length-1),o.push(f.x,f.y);const T=c[3*R+0]*_,w=c[3*R+1],y=c[3*R+0]*I;l.push(T,w,y)}}for(let v=0;v<t;v++)for(let M=0;M<e.length-1;M++){const _=M+v*e.length,I=_,R=_+e.length,T=_+e.length+1,w=_+1;r.push(I,R,w),r.push(T,w,R)}this.setIndex(r),this.setAttribute("position",new kt(a,3)),this.setAttribute("uv",new kt(o,2)),this.setAttribute("normal",new kt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new io(e.points,e.segments,e.phiStart,e.phiLength)}}class so extends io{constructor(e=1,t=1,n=4,i=8){const r=new Tm;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new so(e.radius,e.length,e.capSegments,e.radialSegments)}}class Vr extends Jt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new F,u=new De;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){const d=n+h/t*i;l.x=e*Math.cos(d),l.y=e*Math.sin(d),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[f]/e+1)/2,u.y=(a[f+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new kt(a,3)),this.setAttribute("normal",new kt(o,3)),this.setAttribute("uv",new kt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vr(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class tn extends Jt{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const u=[],h=[],f=[],d=[];let g=0;const b=[],m=n/2;let p=0;v(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new kt(h,3)),this.setAttribute("normal",new kt(f,3)),this.setAttribute("uv",new kt(d,2));function v(){const _=new F,I=new F;let R=0;const T=(t-e)/n;for(let w=0;w<=r;w++){const y=[],x=w/r,D=x*(t-e)+e;for(let k=0;k<=i;k++){const z=k/i,Y=z*c+o,se=Math.sin(Y),N=Math.cos(Y);I.x=D*se,I.y=-x*n+m,I.z=D*N,h.push(I.x,I.y,I.z),_.set(se,T,N).normalize(),f.push(_.x,_.y,_.z),d.push(z,1-x),y.push(g++)}b.push(y)}for(let w=0;w<i;w++)for(let y=0;y<r;y++){const x=b[y][w],D=b[y+1][w],k=b[y+1][w+1],z=b[y][w+1];(e>0||y!==0)&&(u.push(x,D,z),R+=3),(t>0||y!==r-1)&&(u.push(D,k,z),R+=3)}l.addGroup(p,R,0),p+=R}function M(_){const I=g,R=new De,T=new F;let w=0;const y=_===!0?e:t,x=_===!0?1:-1;for(let k=1;k<=i;k++)h.push(0,m*x,0),f.push(0,x,0),d.push(.5,.5),g++;const D=g;for(let k=0;k<=i;k++){const Y=k/i*c+o,se=Math.cos(Y),N=Math.sin(Y);T.x=y*N,T.y=m*x,T.z=y*se,h.push(T.x,T.y,T.z),f.push(0,x,0),R.x=se*.5+.5,R.y=N*.5*x+.5,d.push(R.x,R.y),g++}for(let k=0;k<i;k++){const z=I+k,Y=D+k;_===!0?u.push(Y,Y+1,z):u.push(Y+1,Y,z),w+=3}l.addGroup(p,w,_===!0?1:2),p+=w}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Or extends tn{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Or(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ro extends Jt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],a=[];o(i),l(n),u(),this.setAttribute("position",new kt(r,3)),this.setAttribute("normal",new kt(r.slice(),3)),this.setAttribute("uv",new kt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const M=new F,_=new F,I=new F;for(let R=0;R<t.length;R+=3)d(t[R+0],M),d(t[R+1],_),d(t[R+2],I),c(M,_,I,v)}function c(v,M,_,I){const R=I+1,T=[];for(let w=0;w<=R;w++){T[w]=[];const y=v.clone().lerp(_,w/R),x=M.clone().lerp(_,w/R),D=R-w;for(let k=0;k<=D;k++)k===0&&w===R?T[w][k]=y:T[w][k]=y.clone().lerp(x,k/D)}for(let w=0;w<R;w++)for(let y=0;y<2*(R-w)-1;y++){const x=Math.floor(y/2);y%2===0?(f(T[w][x+1]),f(T[w+1][x]),f(T[w][x])):(f(T[w][x+1]),f(T[w+1][x+1]),f(T[w+1][x]))}}function l(v){const M=new F;for(let _=0;_<r.length;_+=3)M.x=r[_+0],M.y=r[_+1],M.z=r[_+2],M.normalize().multiplyScalar(v),r[_+0]=M.x,r[_+1]=M.y,r[_+2]=M.z}function u(){const v=new F;for(let M=0;M<r.length;M+=3){v.x=r[M+0],v.y=r[M+1],v.z=r[M+2];const _=m(v)/2/Math.PI+.5,I=p(v)/Math.PI+.5;a.push(_,1-I)}g(),h()}function h(){for(let v=0;v<a.length;v+=6){const M=a[v+0],_=a[v+2],I=a[v+4],R=Math.max(M,_,I),T=Math.min(M,_,I);R>.9&&T<.1&&(M<.2&&(a[v+0]+=1),_<.2&&(a[v+2]+=1),I<.2&&(a[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function d(v,M){const _=v*3;M.x=e[_+0],M.y=e[_+1],M.z=e[_+2]}function g(){const v=new F,M=new F,_=new F,I=new F,R=new De,T=new De,w=new De;for(let y=0,x=0;y<r.length;y+=9,x+=6){v.set(r[y+0],r[y+1],r[y+2]),M.set(r[y+3],r[y+4],r[y+5]),_.set(r[y+6],r[y+7],r[y+8]),R.set(a[x+0],a[x+1]),T.set(a[x+2],a[x+3]),w.set(a[x+4],a[x+5]),I.copy(v).add(M).add(_).divideScalar(3);const D=m(I);b(R,x+0,v,D),b(T,x+2,M,D),b(w,x+4,_,D)}}function b(v,M,_,I){I<0&&v.x===1&&(a[M]=v.x-1),_.x===0&&_.z===0&&(a[M]=I/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ro(e.vertices,e.indices,e.radius,e.details)}}class On extends ro{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new On(e.radius,e.detail)}}class ao extends Jt{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],c=[],l=[],u=[];let h=e;const f=(t-e)/i,d=new F,g=new De;for(let b=0;b<=i;b++){for(let m=0;m<=n;m++){const p=r+m/n*a;d.x=h*Math.cos(p),d.y=h*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/t+1)/2,g.y=(d.y/t+1)/2,u.push(g.x,g.y)}h+=f}for(let b=0;b<i;b++){const m=b*(n+1);for(let p=0;p<n;p++){const v=p+m,M=v,_=v+n+1,I=v+n+2,R=v+1;o.push(M,_,R),o.push(_,I,R)}}this.setIndex(o),this.setAttribute("position",new kt(c,3)),this.setAttribute("normal",new kt(l,3)),this.setAttribute("uv",new kt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ao(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class gi extends Jt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new F,f=new F,d=[],g=[],b=[],m=[];for(let p=0;p<=n;p++){const v=[],M=p/n;let _=0;p===0&&a===0?_=.5/t:p===n&&c===Math.PI&&(_=-.5/t);for(let I=0;I<=t;I++){const R=I/t;h.x=-e*Math.cos(i+R*r)*Math.sin(a+M*o),h.y=e*Math.cos(a+M*o),h.z=e*Math.sin(i+R*r)*Math.sin(a+M*o),g.push(h.x,h.y,h.z),f.copy(h).normalize(),b.push(f.x,f.y,f.z),m.push(R+_,1-M),v.push(l++)}u.push(v)}for(let p=0;p<n;p++)for(let v=0;v<t;v++){const M=u[p][v+1],_=u[p][v],I=u[p+1][v],R=u[p+1][v+1];(p!==0||a>0)&&d.push(M,_,R),(p!==n-1||c<Math.PI)&&d.push(_,I,R)}this.setIndex(d),this.setAttribute("position",new kt(g,3)),this.setAttribute("normal",new kt(b,3)),this.setAttribute("uv",new kt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Wr extends Jt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],c=[],l=[],u=new F,h=new F,f=new F;for(let d=0;d<=n;d++)for(let g=0;g<=i;g++){const b=g/i*r,m=d/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(b),h.y=(e+t*Math.cos(m))*Math.sin(b),h.z=t*Math.sin(m),o.push(h.x,h.y,h.z),u.x=e*Math.cos(b),u.y=e*Math.sin(b),f.subVectors(h,u).normalize(),c.push(f.x,f.y,f.z),l.push(g/i),l.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=i;g++){const b=(i+1)*d+g-1,m=(i+1)*(d-1)+g-1,p=(i+1)*(d-1)+g,v=(i+1)*d+g;a.push(b,m,v),a.push(m,p,v)}this.setIndex(a),this.setAttribute("position",new kt(o,3)),this.setAttribute("normal",new kt(c,3)),this.setAttribute("uv",new kt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ws extends Jt{constructor(e=new vl(new F(-1,-1,0),new F(-1,1,0),new F(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new F,c=new F,l=new De;let u=new F;const h=[],f=[],d=[],g=[];b(),this.setIndex(g),this.setAttribute("position",new kt(h,3)),this.setAttribute("normal",new kt(f,3)),this.setAttribute("uv",new kt(d,2));function b(){for(let M=0;M<t;M++)m(M);m(r===!1?t:0),v(),p()}function m(M){u=e.getPointAt(M/t,u);const _=a.normals[M],I=a.binormals[M];for(let R=0;R<=i;R++){const T=R/i*Math.PI*2,w=Math.sin(T),y=-Math.cos(T);c.x=y*_.x+w*I.x,c.y=y*_.y+w*I.y,c.z=y*_.z+w*I.z,c.normalize(),f.push(c.x,c.y,c.z),o.x=u.x+n*c.x,o.y=u.y+n*c.y,o.z=u.z+n*c.z,h.push(o.x,o.y,o.z)}}function p(){for(let M=1;M<=t;M++)for(let _=1;_<=i;_++){const I=(i+1)*(M-1)+(_-1),R=(i+1)*M+(_-1),T=(i+1)*M+_,w=(i+1)*(M-1)+_;g.push(I,R,w),g.push(R,T,w)}}function v(){for(let M=0;M<=t;M++)for(let _=0;_<=i;_++)l.x=M/t,l.y=_/i,d.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Ws(new Va[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Pi extends Xn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new rt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ri extends Pi{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new De(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return dn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new rt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new rt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new rt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Dn extends Xn{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function Cr(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Am(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function wm(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Ec(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function Sl(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class Xs{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Rm extends Xs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case 2401:r=e,o=2*t-n;break;case 2402:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case 2401:a=e,c=2*n-t;break;case 2402:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-t)/(i-t),b=g*g,m=b*g,p=-f*m+2*f*b-f*g,v=(1+f)*m+(-1.5-2*f)*b+(-.5+f)*g+1,M=(-1-d)*m+(1.5+d)*b+.5*g,_=d*m-d*b;for(let I=0;I!==o;++I)r[I]=p*a[u+I]+v*a[l+I]+M*a[c+I]+_*a[h+I];return r}}class Cm extends Xs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(i-t),h=1-u;for(let f=0;f!==o;++f)r[f]=a[l+f]*h+a[c+f]*u;return r}}class Pm extends Xs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class ai{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Cr(t,this.TimeBufferType),this.values=Cr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Cr(e.times,Array),values:Cr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Pm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Cm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Rm(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&Am(i))for(let o=0,c=i.length;o!==c;++o){const l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===2302,r=e.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(i)c=!0;else{const h=o*n,f=h-n,d=h+n;for(let g=0;g!==n;++g){const b=t[h+g];if(b!==t[f+g]||b!==t[d+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const h=o*n,f=a*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}ai.prototype.TimeBufferType=Float32Array;ai.prototype.ValueBufferType=Float32Array;ai.prototype.DefaultInterpolation=2301;class _s extends ai{constructor(e,t,n){super(e,t,n)}}_s.prototype.ValueTypeName="bool";_s.prototype.ValueBufferType=Array;_s.prototype.DefaultInterpolation=2300;_s.prototype.InterpolantFactoryMethodLinear=void 0;_s.prototype.InterpolantFactoryMethodSmooth=void 0;class El extends ai{}El.prototype.ValueTypeName="color";class ds extends ai{}ds.prototype.ValueTypeName="number";class Lm extends Xs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t);let l=e*o;for(let u=l+o;l!==u;l+=4)Tn.slerpFlat(r,0,a,l-o,a,l,c);return r}}class ps extends ai{InterpolantFactoryMethodLinear(e){return new Lm(this.times,this.values,this.getValueSize(),e)}}ps.prototype.ValueTypeName="quaternion";ps.prototype.InterpolantFactoryMethodSmooth=void 0;class xs extends ai{constructor(e,t,n){super(e,t,n)}}xs.prototype.ValueTypeName="string";xs.prototype.ValueBufferType=Array;xs.prototype.DefaultInterpolation=2300;xs.prototype.InterpolantFactoryMethodLinear=void 0;xs.prototype.InterpolantFactoryMethodSmooth=void 0;class ms extends ai{}ms.prototype.ValueTypeName="vector";class Dm{constructor(e="",t=-1,n=[],i=2500){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Zn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Fm(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(ai.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const u=wm(c);c=Ec(c,1,u),l=Ec(l,1,u),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new ds(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],u=l.name.match(r);if(u&&u.length>1){const h=u[1];let f=i[h];f||(i[h]=f=[]),f.push(l)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,f,d,g,b){if(d.length!==0){const m=[],p=[];Sl(d,m,p,g),m.length!==0&&b.push(new h(f,m,p))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let h=0;h<l.length;h++){const f=l[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const d={};let g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let b=0;b<f[g].morphTargets.length;b++)d[f[g].morphTargets[b]]=-1;for(const b in d){const m=[],p=[];for(let v=0;v!==f[g].morphTargets.length;++v){const M=f[g];m.push(M.time),p.push(M.morphTarget===b?1:0)}i.push(new ds(".morphTargetInfluence["+b+"]",m,p))}c=d.length*a}else{const d=".bones["+t[h].name+"]";n(ms,d+".position",f,"pos",i),n(ps,d+".quaternion",f,"rot",i),n(ms,d+".scale",f,"scl",i)}}return i.length===0?null:new this(r,c,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Im(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ds;case"vector":case"vector2":case"vector3":case"vector4":return ms;case"color":return El;case"quaternion":return ps;case"bool":case"boolean":return _s;case"string":return xs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Fm(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Im(s.type);if(s.times===void 0){const t=[],n=[];Sl(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const wi={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Nm{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,r===!1&&i.onStart!==void 0&&i.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){const d=l[h],g=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}}const Tl=new Nm;class vs{constructor(e){this.manager=e!==void 0?e:Tl,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}vs.DEFAULT_MATERIAL_NAME="__DEFAULT";const di={};class Um extends Error{constructor(e,t){super(e),this.response=t}}class Al extends vs{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=wi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(di[e]!==void 0){di[e].push({onLoad:t,onProgress:n,onError:i});return}di[e]=[],di[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=di[e],h=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,g=d!==0;let b=0;const m=new ReadableStream({start(p){v();function v(){h.read().then(({done:M,value:_})=>{if(M)p.close();else{b+=_.byteLength;const I=new ProgressEvent("progress",{lengthComputable:g,loaded:b,total:d});for(let R=0,T=u.length;R<T;R++){const w=u[R];w.onProgress&&w.onProgress(I)}p.enqueue(_),v()}},M=>{p.error(M)})}}});return new Response(m)}else throw new Um(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(g=>d.decode(g))}}}).then(l=>{wi.add(e,l);const u=di[e];delete di[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(l)}}).catch(l=>{const u=di[e];if(u===void 0)throw this.manager.itemError(e),l;delete di[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Om extends vs{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=wi.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=Hs("img");function c(){u(),wi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(h){u(),i&&i(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class wl extends vs{constructor(e){super(e)}load(e,t,n,i){const r=new fn,a=new Om(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class Xr extends nn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new rt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Tc extends Xr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new rt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const wa=new gt,Ac=new F,wc=new F;class oo{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new De(512,512),this.map=null,this.mapPass=null,this.matrix=new gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ja,this._frameExtents=new De(1,1),this._viewportCount=1,this._viewports=[new Bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Ac.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ac),wc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wc),t.updateMatrixWorld(),wa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(wa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Bm extends oo{constructor(){super(new Ln(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=us*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class km extends Xr{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.target=new nn,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Bm}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Rc=new gt,Ls=new F,Ra=new F;class zm extends oo{constructor(){super(new Ln(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new De(4,2),this._viewportCount=6,this._viewports=[new Bt(2,1,1,1),new Bt(0,1,1,1),new Bt(3,1,1,1),new Bt(1,1,1,1),new Bt(3,0,1,1),new Bt(1,0,1,1)],this._cubeDirections=[new F(1,0,0),new F(-1,0,0),new F(0,0,1),new F(0,0,-1),new F(0,1,0),new F(0,-1,0)],this._cubeUps=[new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,0,1),new F(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ls.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ls),Ra.copy(n.position),Ra.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ra),n.updateMatrixWorld(),i.makeTranslation(-Ls.x,-Ls.y,-Ls.z),Rc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Rc)}}class jr extends Xr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new zm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Gm extends oo{constructor(){super(new zr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wa extends Xr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.target=new nn,this.shadow=new Gm}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Gs{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Hm extends vs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=wi.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return wi.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),wi.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});wi.add(e,c),r.manager.itemStart(e)}}const co="\\[\\]\\.:\\/",Vm=new RegExp("["+co+"]","g"),lo="[^"+co+"]",Wm="[^"+co.replace("\\.","")+"]",Xm=/((?:WC+[\/:])*)/.source.replace("WC",lo),jm=/(WCOD+)?/.source.replace("WCOD",Wm),qm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",lo),Km=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",lo),Ym=new RegExp("^"+Xm+jm+qm+Km+"$"),Jm=["material","materials","bones","map"];class Zm{constructor(e,t,n){const i=n||Xt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Xt{constructor(e,t,n){this.path=t,this.parsedPath=n||Xt.parseTrackName(t),this.node=Xt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Xt.Composite(e,t,n):new Xt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Vm,"")}static parseTrackName(e){const t=Ym.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);Jm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=Xt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[i];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Xt.Composite=Zm;Xt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Xt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Xt.prototype.GetterByBindingType=[Xt.prototype._getValue_direct,Xt.prototype._getValue_array,Xt.prototype._getValue_arrayElement,Xt.prototype._getValue_toArray];Xt.prototype.SetterByBindingTypeAndVersioning=[[Xt.prototype._setValue_direct,Xt.prototype._setValue_direct_setNeedsUpdate,Xt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Xt.prototype._setValue_array,Xt.prototype._setValue_array_setNeedsUpdate,Xt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Xt.prototype._setValue_arrayElement,Xt.prototype._setValue_arrayElement_setNeedsUpdate,Xt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Xt.prototype._setValue_fromArray,Xt.prototype._setValue_fromArray_setNeedsUpdate,Xt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");const Cc='"Fredoka", "Bricolage Grotesque", sans-serif',Qm="#cfdcc4",Ca="#d0a54e",ei="#b98d5c",Pc="#6e4a2c",$m="#f1ead6",Lc="#6b2436";function eg(s,e,{box:t,span:n,material:i,model:r}){const a=e.shell;if(!a)return null;const o=new yt;s.add(o);const[c,l,u]=e.floors,h=()=>{const te=new yt;return o.add(te),te},f=(te,Q,E,L,C,B)=>r&&r(Q,E,L,C,(j,ee)=>{te.visible=!1,B&&B(j,ee)}),d=a.plaster,g=a.tile,b=a.tileH,m=document.createElement("canvas");m.width=200,m.height=230;const p=m.getContext("2d");p.fillStyle=g,p.fillRect(0,0,200,230),p.fillStyle=Qm;for(let te=0;te<200;te+=200*a.tilePitch)p.fillRect(te,12,2.4,218);p.fillRect(0,230-230/2,200,2.4),p.fillStyle="#dcc48e",p.fillRect(0,2,200,9);const v=new ni(m);v.colorSpace=Ht,v.wrapS=1e3,v.anisotropy=4;const M=new Bn(1,1).translate(0,.5,0);function _(te,Q,E,L,C=0){const B=v.clone();B.needsUpdate=!0,B.repeat.set(Math.abs(E-Q),1);const j=new Je(M,new Dn({map:B}));return j.scale.set(Math.abs(E-Q),b,1),te?(j.rotation.y=Math.PI/2,j.position.set(L+.006,C,(Q+E)/2)):j.position.set((Q+E)/2,C,L+.006),j.receiveShadow=!0,o.add(j),j}function I(te,Q,E,L,C,B,j,ee=[]){const he=[...ee].sort((Se,ne)=>Se[0]-ne[0]);let me=Q;const ye=(Se,ne,Ie,Ve)=>te?n(o,L-C,L,B+Ie,B+Ve,Se,ne,d):n(o,Se,ne,B+Ie,B+Ve,L-C,L,d);he.forEach(([Se,ne,Ie])=>{Se>me&&(ye(me,Se,0,j),_(te,me,Se,L,B)),ye(Se,ne,Ie,j),me=ne}),E>me&&(ye(me,E,0,j),_(te,me,E,L,B))}const R=c.z-c.d/2;I(!1,(c.x||0)-c.w/2,(c.x||0)+c.w/2,R,.25,0,l.y-.32,[[a.exitDoor.x0,a.exitDoor.x1,a.exitDoor.h]]);const T=l.z-l.d/2,w=-l.w/2;I(!1,w,l.w/2,T,.25,l.y,u.y-l.y-.32),I(!0,T,T+3.5,w,.25,l.y,u.y-l.y-.32);const y=u.z-u.d/2,x=-u.w/2,D=e.rooftop?e.rooftop.y-.34-u.y:3.9,k=new Pi({color:"#cfe6df",roughness:.1,metalness:0,transparent:!0,opacity:.26,depthWrite:!1});function z(te,Q,E,L,C){const B=Math.max(2,Math.round((E-Q)/a.glazingBay)),j=(E-Q)/B,ee=u.y;let he=null;if(C!==void 0){const Se=Math.max(0,Math.min(B-2,Math.round((C-Q)/j)-1));he=[Q+Se*j,Q+(Se+2)*j]}const me=(Se,ne,Ie,Ve,Oe=.09)=>te?n(o,L-Oe,L+Oe*.3,Ie,Ve,Se,ne,"#2c5a44"):n(o,Se,ne,Ie,Ve,L-Oe,L+Oe*.3,"#2c5a44");me(Q,E,ee,ee+.3,.16);for(let Se=0;Se<=B;Se++){const ne=Q+Se*j;me(ne-.035,ne+.035,ee+.3,ee+D)}me(Q,E,ee+2.92,ee+2.98),me(Q,E,ee+D-.08,ee+D);const ye=te?n(o,L-.02,L,ee+.3,ee+D,Q,E,"#cfe6df",{cast:!1}):n(o,Q,E,ee+.3,ee+D,L-.02,L,"#cfe6df",{cast:!1});return ye.material=k,ye.receiveShadow=!1,he&&n(o,he[0]+.035,he[1]-.035,ee+.3,ee+D-.08,L-.06,L-.02,"#2f5d4a"),he}const Y=z(!1,x,a.topLanding.outer,y,a.fanX);z(!0,y,y+3.5,x);const se=new yt,N=Y?(Y[0]+Y[1])/2:a.fanX;se.position.set(N,u.y+2.15,y+.02),o.add(se);let Z=null;f(se,"exhaust_fan.glb",N,u.y+2.15,y+.02,te=>{Z=te.getObjectByName("Rotor")}),t(se,0,-.72,.06,1.44,1.44,.14,"#2f6b52");const q=new Je(new tn(.56,.56,.05,40).rotateX(Math.PI/2),i("#1d3028"));q.position.z=.14,se.add(q);const ce=new yt;ce.position.z=.18,se.add(ce);for(let te=0;te<4;te++){const Q=new Je(new Qt(.44,.17,.02).translate(.27,0,0),i("#b9cbb4"));Q.rotation.z=te*Math.PI/2,Q.rotation.x=.25,ce.add(Q)}const J=new Je(new tn(.1,.1,.06,20).rotateX(Math.PI/2),i("#d8c18b"));ce.add(J);const re=new tn(.09,.09,.22,12).translate(0,.11,0),Ee=new Qt(.18,.26,.07).translate(0,.13,0),ze=[],oe=te=>{const Q={g:te,jars:[],pouches:[]};return ze.push(Q),Q};function de(te,Q,E,L,C,B,j,ee,he){const{jars:me,pouches:ye}=oe(te);n(te,Q,E,B,B+j,L,L+.05,Pc,{cast:!1}),n(te,Q,E,B,B+.14,L,L+C,ei),n(te,Q-.02,E+.02,B+j-.1,B+j,L,L+C+.02,ei);const Se=(E-Q)/ee;for(let ne=0;ne<=ee;ne++)n(te,Q+ne*Se-.035,Q+ne*Se+.035,B,B+j,L,L+C,ei);for(let ne=1;ne<=he;ne++){const Ie=B+.14+(j-.24)*ne/(he+1);n(te,Q,E,Ie-.04,Ie,L,L+C,"#c79f6c",{cast:!1});for(let Ve=0;Ve<ee;Ve++)for(let Oe=0;Oe<4;Oe++){const at=Q+Ve*Se+Se*(Oe+.5)/4,dt=L+C*.55;((Ve+ne+Oe)%3?me:ye).push([at,Ie,dt,(Ve*7+ne*3+Oe)%4])}if(ne===1)for(let Ve=0;Ve<ee;Ve++)for(let Oe=0;Oe<4;Oe++)me.push([Q+Ve*Se+Se*(Oe+.5)/4,B+.14,L+C*.55,(Ve+Oe)%4])}}const _e=a.loungeFront,ge=_e-.81,He=a.loungeDoor.x,Ne=a.loungeRight,Ze=l.y-.32;n(o,-11.03,He-.7,0,Ze,ge,_e,d),n(o,He-.7,He+.7,a.loungeHeader,Ze,ge,_e,d),n(o,He+.7,Ne+.16,0,Ze,ge,_e,d),_(!1,-11.03,He-.7,_e),_(!1,He+.7,a.wallLeft,_e),_(!1,a.wallLeft,Ne+.16,_e),n(o,-11.5,-11.18,0,3.95,R,_e,d),_(!0,R,_e,-11.18);const et=a.loungeExit.z,Ke=.92,_t=2.84;n(o,Ne-.16,Ne+.16,0,Ze,R,et-Ke,d),n(o,Ne-.16,Ne+.16,_t,Ze,et-Ke,et+Ke,d),n(o,Ne-.16,Ne+.16,0,Ze,et+Ke,_e,d),_(!0,R,et-Ke-.04,Ne+.16),_(!0,et+Ke+.04,_e,Ne+.16),n(o,Ne-.1,Ne+.1,0,_t,et-Ke,et+Ke,"#0d1310",{cast:!1});const V=[];e.rooftop||(n(o,-11.18,Ne-.16,.002,.012,R,ge,"#2a1b22",{cast:!1}),n(o,-10.95,-9.25,.012,.022,-5.3,-2.9,"#5a2638",{cast:!1}),n(o,-10.75,-9.45,.022,.03,-5.1,-3.1,"#7a3a4c",{cast:!1}),[[-6.15,-5.55,1],[-2.65,-2.05,-1]].forEach(([te,Q,E])=>{n(o,-10.9,-9.3,0,.48,te,Q,Lc);const L=E>0?[te,te+.16]:[Q-.16,Q];n(o,-10.9,-9.3,.48,.95,L[0],L[1],"#5c1e30"),n(o,-10.9,-10.72,.48,.7,te,Q,"#5c1e30"),n(o,-9.48,-9.3,.48,.7,te,Q,"#5c1e30")}),n(o,-10.55,-9.65,0,.4,-4.35,-3.85,"#3a2a1e"),[[-10.7,-6.6],[-10.7,-1.55],[-9.6,-4.1]].forEach(([te,Q])=>{t(o,te,0,Q,.4,.62,.4,"#3a2a1e"),t(o,te,.62,Q,.04,.4,.04,"#d8c18b",{cast:!1});const E=new Je(new tn(.13,.2,.26,16).translate(0,.13,0),new Dn({color:"#f3d9a6",emissive:"#ffb36a",emissiveIntensity:0}));E.position.set(te,1,Q),o.add(E),V.push(E)}));const qt=i(Lc);function Et(te){const Q=te?{centre:et,plane:Ne+.2,scale:1.35,top:2.78}:{centre:He,plane:_e+.05,scale:1,top:a.loungeHeader+.02},E=[-1,1].map(C=>{const B=new Je(Tt,qt);return B.castShadow=!0,o.add(B),{side:C,m:B}}),L=te?n(o,Q.plane-.05,Q.plane+.09,Q.top-.1,Q.top+.06,Q.centre-Ke-.02,Q.centre+Ke+.02,"#4a1b29"):n(o,Q.centre-.75,Q.centre+.75,Q.top-.1,Q.top+.06,Q.plane-.05,Q.plane+.09,"#4a1b29");return{set(C,B){L.visible=B,E.forEach(({side:j,m:ee})=>{ee.visible=B;const he=.68*Q.scale,me=(.07+(.5-.07)*C)*Q.scale,ye=Math.max(.08,he-me),Se=j*(me+ye/2);te?(ee.position.set(Q.plane,0,Q.centre+Se),ee.scale.set(.08,Q.top-.08,ye)):(ee.position.set(Q.centre+Se,0,Q.plane),ee.scale.set(ye,Q.top-.08,.08))})}}}const Tt=new Qt(1,1,1).translate(0,.5,0),ot=Et(!1),xt=Et(!0),Ye=e.rooftop?null:n(o,He-.7,He+.7,0,a.loungeHeader,_e,_e+.08,"#2d6146"),P=n(o,Ne+.16,Ne+.21,0,_t-.24,et-Ke+.15,et+Ke-.15,"#3a2a1e"),S=document.createElement("canvas");S.width=512,S.height=184;const $=new ni(S);$.colorSpace=Ht;const pe=new _n({map:$,transparent:!0}),be=new Je(new Bn(2,.72),pe);be.position.set(He+2.1,2.02,_e+.03),o.add(be);let le=null;typeof FontFace=="function"&&document.fonts&&(new FontFace("Fredoka",`url(${new URL("../fonts/Fredoka-SemiBold.ttf",e.modelBase).href})`,{weight:"600"}).load().then(te=>{document.fonts.add(te),le=null,pt=null,Ct=!0}).catch(()=>{}),new FontFace("Yellowtail",`url(${new URL("../fonts/Yellowtail-Regular.woff2",e.modelBase).href})`).load().then(te=>{document.fonts.add(te),le=null}).catch(()=>{}));function $e(te){if(le===te)return;le=te;const Q=S.getContext("2d");Q.clearRect(0,0,512,184),Q.fillStyle="#1a1216",Q.beginPath(),Q.roundRect(6,8,500,168,22),Q.fill();const E=(L,C,B,j,ee,he)=>{te?(Q.shadowColor=j,Q.shadowBlur=22,Q.fillStyle=j,Q.fillText(L,C,B),Q.shadowBlur=0,Q.fillStyle=ee,Q.fillText(L,C,B)):(Q.fillStyle=he,Q.fillText(L,C,B))};Q.textAlign="center",Q.textBaseline="middle",Q.save(),Q.translate(256,56),Q.rotate(-.06),Q.font='400 88px "Yellowtail", cursive',E("Rooftop",0,0,"#ffbf5a","#fff1d6","#5d5040"),Q.restore(),Q.font=`600 72px ${Cc}`,E("LOUNGE",256,128,"#ff8fbf","#fff4f8","#5a4750"),$.needsUpdate=!0}const xe={x:(a.wallLeft+a.shelfLeft)/2,y:1.8,w:5.1,h:1.24},Be=h();n(Be,xe.x-xe.w/2-.14,xe.x+xe.w/2+.14,xe.y-.12,xe.y+xe.h+.12,_e,_e+.1,ei),n(Be,xe.x-xe.w/2+.04,xe.x+xe.w/2-.04,xe.y+.04,xe.y+xe.h-.04,_e+.1,_e+.12,Ca,{cast:!1});const At=document.createElement("canvas");At.width=1024,At.height=240;const H=new ni(At);H.colorSpace=Ht,H.anisotropy=4;const ke=new Je(new Bn(xe.w-.14,xe.h-.14),new _n({map:H}));ke.position.set(xe.x,xe.y+xe.h/2,_e+.125),Be.add(ke),f(Be,"menu_board.glb",xe.x,0,_e,te=>{const Q=te.getObjectByName("BoardFace");Q&&Q.traverse(E=>{if(!E.isMesh)return;const L=E.geometry.attributes.uv;for(let C=0;C<L.count;C++)L.setY(C,1-L.getY(C));L.needsUpdate=!0,E.material=ke.material})});const qe=" ABCDEFGHIJKLMNOPQRSTUVWXYZ$0123456789.,",Qe=55,Fe=9;let St=null,pt=null,Ct=!1;function G(te,Q){const E=te.length,L=te[0]?te[0].length:21;if((!St||St.length!==E||St[0].length!==L)&&(St=te.map(he=>[...he].map(()=>({from:" ",to:" ",start:0})))),te.forEach((he,me)=>[...he].forEach((ye,Se)=>{const ne=St[me][Se];ne.to!==ye&&(ne.from=ne.to,ne.to=ye,ne.start=Q+Se*35+me*90,Ct=!0)})),!Ct&&pt!==null)return;pt="";const C=At.getContext("2d"),B=1024/L,j=240/E;C.fillStyle="#131617",C.fillRect(0,0,1024,240),C.font=`600 ${Math.round(j*.66)}px ${Cc}`,C.textAlign="center",C.textBaseline="middle";const ee=(he,me,ye,Se,ne)=>{const Ie=ye+j/2,Ve=(j/2-4)*ne;C.save(),C.beginPath(),C.rect(me+2,Se?Ie-Ve:Ie,B-4,Ve),C.clip(),C.fillStyle=Se?"#363c3e":"#2b3133",C.fillRect(me+2,Se?Ie-Ve:Ie,B-4,Ve),he!==" "&&(C.translate(0,Ie),C.scale(1,ne),C.fillStyle="#efe4c8",C.fillText(he,me+B/2,1)),C.restore()};Ct=!1,St.forEach((he,me)=>he.forEach((ye,Se)=>{const ne=Se*B,Ie=me*j,Ve=Q-ye.start;let Oe=ye.to,at=ye.to,dt=1;if(Ve<0)Oe=at=ye.from,Ct=!0;else if(ye.from!==ye.to&&Ve<Qe*Fe){const Ft=Math.floor(Ve/Qe),Lt=qe.indexOf(ye.to)+qe.length-Fe;Oe=Ft?qe[(Lt+Ft)%qe.length]:ye.from,at=qe[(Lt+Ft+1)%qe.length],dt=Ve%Qe/Qe,Ct=!0}else ye.from=ye.to;dt>=1?(ee(Oe,ne,Ie,!0,1),ee(Oe,ne,Ie,!1,1)):(ee(at,ne,Ie,!0,1),ee(Oe,ne,Ie,!1,1),dt<.5?ee(Oe,ne,Ie,!0,1-dt*2):ee(at,ne,Ie,!1,dt*2-1)),C.fillStyle="#0d1113",C.fillRect(ne+2,Ie+j/2-1,B-4,2)})),H.needsUpdate=!0}const we=h();de(we,a.shelfLeft,a.wallRight,_e,.64,0,3.3,5,4),f(we,"product_shelving.glb",(a.shelfLeft+a.wallRight)/2,0,_e+.32);const ae=h();de(ae,-9,9,T,.6,l.y,2.6,8,3),f(ae,"wall_shelving.glb",0,l.y,T+.3);const fe=h(),Ce=oe(fe);f(fe,"arch_shelves.glb",-8.525,l.y,-4.85),n(fe,-8.85,-8.2,l.y,l.y+2.4,-5.9,-3.8,ei);const Ae=new Je(new tn(1.05,1.05,.65,32,1,!1,0,Math.PI).rotateZ(Math.PI/2),i(ei));Ae.position.set(-8.525,l.y+2.4,-4.85),Ae.castShadow=!0,fe.add(Ae),n(fe,-8.21,-8.19,l.y+.2,l.y+2.3,-5.7,-4,"#e8dcc4",{cast:!1});for(let te=0;te<3;te++)for(let Q=0;Q<3;Q++)Ce.jars.push([-8.35,l.y+.5+te*.7,-5.45+Q*.6,(te+Q)%4]);for(let te=0;te<3;te++)n(fe,-8.85,-8.2,l.y+.45+te*.7,l.y+.5+te*.7,-5.8,-3.9,"#ecdbc1",{cast:!1});const tt=a.column,zt=h();t(zt,tt.x,0,tt.z,.78,1.73,.73,"#25523b"),t(zt,tt.x,1.73,tt.z,.8,.12,.76,"#e1dbc0"),t(zt,tt.x,1.85,tt.z,.75,Ze-1.85,.7,$m);const $t=new Dn({color:"#fff2c8",emissive:"#ffd58a",emissiveIntensity:0}),It=new Je(new gi(.13,12,8),$t);It.position.set(tt.x,2.6,tt.z+.42),zt.add(It);const on=(te,Q,E)=>{const L=te.getObjectByName(Q);L&&L.traverse(C=>{if(C.isMesh){const B=C.material.clone();B.emissive=E.emissive.clone(),C.material=B,cn.push([B,E])}})},cn=[];f(zt,"shop_column.glb",tt.x,0,tt.z,te=>on(te,"Sconce",$t));const Ut=a.exitDoor,xn=h();n(xn,Ut.x0-.14,Ut.x0,0,Ut.h+.14,R-.1,R+.12,"#1f4a35"),n(xn,Ut.x1,Ut.x1+.14,0,Ut.h+.14,R-.1,R+.12,"#1f4a35"),n(xn,Ut.x0-.14,Ut.x1+.14,Ut.h,Ut.h+.2,R-.1,R+.12,"#1f4a35"),n(xn,Ut.x0,Ut.x0+.06,.02,Ut.h-.02,R+.1,R+.95,"#2d6146"),n(xn,(Ut.x0+Ut.x1)/2-.4,(Ut.x0+Ut.x1)/2+.4,Ut.h+.3,Ut.h+.56,R,R+.08,"#1d3028");const ln=new Je(new Qt(.66,.14,.04),new Dn({color:"#d84a3a",emissive:"#ff5a3c",emissiveIntensity:.4}));ln.position.set((Ut.x0+Ut.x1)/2,Ut.h+.43,R+.1),xn.add(ln),f(xn,"exit_door.glb",(Ut.x0+Ut.x1)/2,0,R,te=>{on(te,"ExitLamp",ln.material);const Q=te.getObjectByName("DoorLeaf");Q&&(Q.rotation.y=-Q.rotation.y,Q.position.z=-Q.position.z)});const ut=a.merchCabinet,vn=h(),Qn=oe(vn);f(vn,"merch_cabinet.glb",(ut.back+ut.face)/2,0,(ut.z0+ut.z1)/2,te=>{const Q=te.getObjectByName("CabinetGlass");Q&&Q.traverse(E=>{E.isMesh&&(E.material=k,E.castShadow=!1)})}),n(vn,ut.back,ut.face,0,.2,ut.z0,ut.z1,Pc),n(vn,ut.back,ut.face,.2,2.6,ut.z0,ut.z0+.1,ei),n(vn,ut.back,ut.face,.2,2.6,ut.z1-.1,ut.z1,ei),n(vn,ut.back,ut.back+.12,.2,2.6,ut.z0,ut.z1,ei);const rn=new Je(new tn((ut.z1-ut.z0)/2,(ut.z1-ut.z0)/2,ut.face-ut.back,32,1,!1,0,Math.PI).rotateZ(Math.PI/2),i(ei));rn.position.set((ut.face+ut.back)/2,2.6,(ut.z0+ut.z1)/2),rn.castShadow=!0,vn.add(rn);for(let te=0;te<3;te++){n(vn,ut.back+.12,ut.face-.05,.55+te*.68,.6+te*.68,ut.z0+.1,ut.z1-.1,"#ecdbc1",{cast:!1});for(let Q=0;Q<4;Q++)(Q%2?Qn.pouches:Qn.jars).push([(ut.back+ut.face)/2,.6+te*.68,ut.z0+.35+Q*(ut.z1-ut.z0-.7)/3,(te+Q)%4])}const hn=n(vn,ut.face-.03,ut.face,.2,2.6,ut.z0+.1,ut.z1-.1,"#cfe6df",{cast:!1});hn.material=k;const Vt=e.marquee,In=Vt.zFront-Vt.zRear,zn=document.createElement("canvas");zn.width=2048,zn.height=192;const We=zn.getContext("2d");We.fillStyle="#f1e7cc",We.fillRect(0,0,2048,96),We.fillStyle="#1f6b47",We.fillRect(0,96,2048,96),We.font='800 54px "Bricolage Grotesque", sans-serif',We.textAlign="center",We.textBaseline="middle",Vt.top.forEach((te,Q)=>{We.fillStyle="#1f5e40",We.fillText(te,(Q+.5)*512,50)}),We.font='700 40px "Bricolage Grotesque", sans-serif',Vt.bottom.forEach((te,Q)=>{We.fillStyle="#f1e7cc",We.fillText(te,(Q+.5)*512,146)}),We.fillStyle="#1a1e20";for(let te=1;te<4;te++)We.fillRect(te*512-3,0,6,192);const $n=new ni(zn);$n.colorSpace=Ht,$n.anisotropy=4;const en=new Dn({map:$n,emissive:"#ffffff",emissiveMap:$n,emissiveIntensity:.15}),A=new Je(new Bn(In,Vt.y1-Vt.y0),en);A.rotation.y=Math.PI/2,A.position.set(Vt.x+.17,(Vt.y0+Vt.y1)/2,(Vt.zFront+Vt.zRear)/2),e.wallFaces||o.add(A);const O=a.planter,ie=h();f(ie,"shop_planter.glb",(O.x0+O.x1)/2,0,(O.z0+O.z1)/2),n(ie,O.x0,O.x1,0,.56,O.z0,O.z1,"#1f5e40"),n(ie,O.x0-.04,O.x1+.04,.56,.63,O.z0-.04,O.z1+.04,"#2b302d"),n(ie,O.x0+.1,O.x1-.1,.63,.66,O.z0+.1,O.z1-.1,"#514633",{cast:!1});const X=a.baseboard,W=.14;[[X.x0,X.x1,X.front-W,X.front],[X.x1-W,X.x1,X.rear,X.front-W]].forEach(([te,Q,E,L])=>{n(o,te,Q,0,X.h-.1,E,L,"#1f5e40"),n(o,te-.01,Q+.01,X.h-.1,X.h-.07,E-.01,L+.01,Ca,{cast:!1}),n(o,te-.02,Q+.02,X.h-.07,X.h,E-.03,L+.03,"#e1dbc0")});const Me=[],Re=new On(1,1),Xe=(te,Q,E,L,C)=>{const B=new Je(Re,i(C));B.position.set(te,Q,E),B.scale.set(L,L*.8,L),B.castShadow=B.receiveShadow=!0,ie.add(B)};[-1.2,-.5,.2,.9,1.6].forEach((te,Q)=>Xe((O.x0+O.x1)/2+(Q%2?.08:-.08),.9,(O.z0+O.z1)/2+te,.3,Q%2?"#6b9250":"#5f8648")),t(ie,O.tree.x,.63,O.tree.z,.16,2.4,.16,"#816747"),[[0,3.2,0,.75,"#769852"],[-.35,2.9,.3,.55,"#587c4d"],[.3,3.05,-.3,.55,"#98b96e"]].forEach(([te,Q,E,L,C])=>Xe(O.tree.x+te,Q,O.tree.z+E,L,C));const Pe=a.hanging,ft=h(),nt=[];n(ft,Pe.x0,Pe.x1,Pe.y-.04,Pe.y,Pe.z-.03,Pe.z+.03,Ca,{cast:!1});for(let te=0;te<18;te++){const Q=Pe.x0+(Pe.x1-Pe.x0)*(te+.5)/18,E=.5+(1-Math.abs(te-8.5)/9)*.7+te%3*.12;for(let L=0;L<6;L++){const C=L/5;nt.push([Q+Math.sin(te*1.7+C*3)*.06,Pe.y-.05-E*C,Pe.z+(te%2?.06:-.06)+C*.08,(te+L)%3,.8])}}Me.push([ft,nt]),f(ft,"pothos_rail.glb",(Pe.x0+Pe.x1)/2,Pe.y,Pe.z),[[l,T],[u,y]].forEach(([te,Q])=>(te===u?[-2,2]:[-7,5]).forEach(E=>{const L=Q+.9,C=te.y+Math.min(3.95,te===u?3.5:3.95),B=h(),j=[];n(B,E-.01,E+.01,C-.7,C,L-.01,L+.01,"#343f33",{cast:!1}),t(B,E,C-1,L,.55,.3,.48,"#b6ac8a");for(let ee=0;ee<14;ee++){const he=ee*2.399;j.push([E+Math.cos(he)*.28,C-.72-ee%4*.18,L+Math.sin(he)*.22,ee%3,.9])}Me.push([B,j]),f(B,"hanging_basket.glb",E,C,L)}));const Te=["#5f8648","#7aa257","#9cc46e"].map(te=>new rt(te)),it=new On(.13,0),Mt=i("#ffffff"),Gt=new gt,Kt=new Tn,bt=new F,Ge=new F;Me.forEach(([te,Q])=>{const E=new Wn(it,Mt,Q.length);Q.forEach(([L,C,B,j,ee],he)=>{Kt.setFromEuler(new kn(he*.7,he*1.3,0)),E.setMatrixAt(he,Gt.compose(bt.set(L,C,B),Kt,Ge.set(1.3*ee,.7*ee,1*ee))),E.setColorAt(he,Te[j])}),E.castShadow=!0,E.receiveShadow=!0,te.add(E)});const gn=["#527e60","#b28b64","#75999a","#d5bd8c"].map(te=>new rt(te));ze.forEach(te=>[[re,te.jars],[Ee,te.pouches]].forEach(([Q,E])=>{if(!E.length)return;const L=new Wn(Q,i("#ffffff"),E.length);E.forEach(([C,B,j,ee],he)=>{L.setMatrixAt(he,Gt.compose(bt.set(C,B,j),Kt.identity(),Ge.set(1,1,1))),L.setColorAt(he,gn[ee])}),L.castShadow=!0,te.g.add(L)}));const wt=a.lamps.map(([te,Q,E,L])=>{const C=new jr("#ffc98a",0,11,1.2);return C.position.set(te,Q,E),C.userData.power=L,s.add(C),C});return{update(te){const Q=te.night||0,E=!!te.loungeOpen;ce.rotation.z=-(te.time||0)*Math.PI*2/26e3,Z&&(Z.rotation.z=ce.rotation.z),ot.set(te.loungeCurtain||0,E),xt.set(te.loungeExitCurtain||0,E),Ye&&(Ye.visible=!E),P.visible=!E,$e(E),pe.color.setScalar(E?1:.8),te.menuLines&&G(te.menuLines,performance.now()),V.forEach(L=>{L.material.emissiveIntensity=E?.5+Q*1.2:0}),It.material.emissiveIntensity=.3+Q*1.4,ln.material.emissiveIntensity=.4+Q*1.2,cn.forEach(([L,C])=>{L.emissiveIntensity=C.emissiveIntensity}),en.emissiveIntensity=.15+Q*.7,wt.forEach(L=>{L.intensity=L.userData.power*(.2+Q*5)})}}}const Xa=Math.asin(Math.tan(Math.PI/6)),Sn=1/Math.cos(Xa),Dc=240;function Ic(){const s=new zr(-1,1,1,-1,1,Dc*2.5),e=Math.SQRT1_2,t=Math.SQRT1_2,n=Math.sin(Xa),i=Math.cos(Xa);return s.up.set(-e*n,i,-t*n),s.position.set(e*i,n,t*i).multiplyScalar(Dc),s.lookAt(0,0,0),s}function tg(s,{width:e,height:t,centerX:n,centerY:i,unit:r}){s.left=-n/r,s.right=(e-n)/r,s.top=i/r,s.bottom=-(t-i)/r,s.updateProjectionMatrix(),s.updateMatrixWorld()}function ho(s,e=!1){const t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,c=new Jt;let l=0;for(let u=0;u<s.length;++u){const h=s[u];let f=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(h.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(h.morphAttributes[d])}if(e){let d;if(t)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,u),l+=d}}if(t){let u=0;const h=[];for(let f=0;f<s.length;++f){const d=s[f].index;for(let g=0;g<d.count;++g)h.push(d.getX(g)+u);u+=s[f].attributes.position.count}c.setIndex(h)}for(const u in r){const h=Fc(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in a){const h=a[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let f=0;f<h;++f){const d=[];for(let b=0;b<a[u].length;++b)d.push(a[u][b][f]);const g=Fc(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function Fc(s){let e,t,n,i=-1,r=0;for(let l=0;l<s.length;++l){const u=s[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=u.gpuType),i!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}const a=new e(r),o=new jt(a,t,n);let c=0;for(let l=0;l<s.length;++l){const u=s[l];if(u.isInterleavedBufferAttribute){const h=c/t;for(let f=0,d=u.count;f<d;f++)for(let g=0;g<t;g++){const b=u.getComponent(f,g);o.setComponent(f+h,g,b)}}else a.set(u.array,c);c+=u.count*t}return i!==void 0&&(o.gpuType=i),o}function Nc(s,e){if(e===0)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===2||e===1){let t=s.getIndex();if(t===null){const a=[],o=s.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===2)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}const ng=/^(Rotor|Flame|DoorLeaf|StaffPlaque|Wheel(FL|FR|BL|BR)$)/,Pa=new gt,Uc=new gt,Oc=(s,e)=>!!s.userData.motion||ng.test(s.name)||e;function ig(s){return s.isMesh&&!s.isInstancedMesh&&!s.isSkinnedMesh&&s.visible&&!Array.isArray(s.material)&&!s.material.transparent&&!Object.keys(s.geometry.morphAttributes).length&&!s.geometry.groups.length&&s.children.length===0}function sg(s){return Object.keys(s.attributes).sort().map(e=>e+s.attributes[e].itemSize).join()+(s.index?"|i":"")}function rg(s){const e=new Jt;return Object.entries(s.attributes).forEach(([t,n])=>{const i=new Float32Array(n.count*n.itemSize);for(let r=0;r<n.count;r++)for(let a=0;a<n.itemSize;a++)i[r*n.itemSize+a]=n.getComponent(r,a);e.setAttribute(t,new jt(i,n.itemSize))}),s.index&&e.setIndex(new jt(s.index.array.slice(),1)),e}function ag(s){if(s.index){const e=s.index;for(let t=0;t<e.count;t+=3){const n=e.getX(t+1);e.setX(t+1,e.getX(t+2)),e.setX(t+2,n)}return}Object.values(s.attributes).forEach(e=>{for(let t=0;t<e.count;t+=3)for(let n=0;n<e.itemSize;n++){const i=e.getComponent(t+1,n);e.setComponent(t+1,n,e.getComponent(t+2,n)),e.setComponent(t+2,n,i)}})}function Vi(s,e){s.updateMatrixWorld(!0),Uc.copy(s.matrixWorld).invert();const t=new Map,n=[],i=o=>o.children.forEach(c=>{if(c.visible){if(Oc(c,e)){n.push(c);return}if(ig(c)){const l=c.material.uuid+(c.castShadow?"c":"")+(c.receiveShadow?"r":"")+sg(c.geometry);t.has(l)||t.set(l,[]),t.get(l).push(c)}i(c)}});i(s);let r=0;t.forEach(o=>{if(o.length<2)return;const c=o.map(f=>{const d=rg(f.geometry);return Pa.multiplyMatrices(Uc,f.matrixWorld),d.applyMatrix4(Pa),Pa.determinant()<0&&ag(d),d}),l=ho(c);if(!l)return;const u=o[0],h=new Je(l,u.material);h.name="Merged"+(u.material.name||""),h.castShadow=u.castShadow,h.receiveShadow=u.receiveShadow,s.add(h),o.forEach(f=>f.removeFromParent()),r+=o.length-1});const a=o=>[...o.children].forEach(c=>{Oc(c,e)||!c.visible||(a(c),(c.type==="Group"||c.type==="Object3D")&&!c.children.length&&c.removeFromParent())});return a(s),n.forEach(o=>{o.children.length&&(r+=Vi(o,e))}),r}const Zt="#d0a54e",Ds="#b98d5c",Is="#6e4a2c",Pn="#1f4a35",Oi="#efe4cf",pi="#6b2436";function og(s,e,{box:t,span:n,material:i}){const r=e.rooftop;if(!r)return null;const a=new yt;s.add(a);const{x0:o,x1:c,z0:l,z1:u,y:h}=r,f=r.lift,d=Array.from({length:9},()=>new yt);d.forEach(U=>a.add(U));const[g,b,m,p,v,M,_,I,R]=d,T=d.slice(1),[w,y,x,D,k,z,Y,se]=T.map(U=>{const K=new yt;return U.add(K),K}),N=new yt;a.add(N);const Z=new Pi({color:"#cfe6df",roughness:.1,metalness:0,transparent:!0,opacity:.28,depthWrite:!1}),q=U=>(U.material=Z,U.castShadow=!1,U.receiveShadow=!1,U),ce=(U,K)=>new Dn({color:U,emissive:K,emissiveIntensity:0}),J=[];n(a,o,c,h-.3,h,l,u,"#e4ddcc"),n(a,o-.05,c+.05,h-.34,h-.22,l-.05,u+.05,"#e1dbc0",{cast:!1});const re=e.floors[2].y,Ee=e.floors[0].z-e.floors[0].d/2;[[o+.3,u-.3],[c-.3,u-.3]].forEach(([U,K])=>t(a,U,re,K,.3,h-.3-re,.3,"#33372f")),l<Ee&&([o+.3,0,c-.3].forEach(U=>t(a,U,0,l+.3,.32,h-.3,.32,Pn)),n(a,o,c,h-.62,h-.3,l+.14,l+.46,Pn));const ze=document.createElement("canvas");ze.width=256,ze.height=256;const oe=ze.getContext("2d");oe.fillStyle="#b98654",oe.fillRect(0,0,256,256);for(let U=0;U<8;U++)oe.fillStyle=["#bf8c59","#b4814f","#c39260","#b78552"][U%4],oe.fillRect(0,U*32+1,256,30),oe.fillStyle="#8f6038",oe.fillRect(U*97%256,U*32,2,32);const de=new ni(ze);de.colorSpace=Ht,de.wrapS=de.wrapT=1e3,de.anisotropy=4,de.repeat.set((c-o)/2.4,(u-l)/2.4);const _e=new Je(new Bn(c-o-.2,u-l-.2).rotateX(-Math.PI/2),new Dn({map:de}));_e.position.set((o+c)/2,h+.004,(l+u)/2),_e.receiveShadow=!0,N.add(_e);const ge=1.05,He=[f.z-.6,f.z+.6];function Ne(U,K,ue,ve,st){const mt=Math.max(1,Math.round((ue-K)/1.6)),ct=(ue-K)/mt,je=(Le,lt,Rt,vt,ht,sn,An)=>U?n(st,ve-ht,ve+ht,Rt,vt,Le,lt,sn,An):n(st,Le,lt,Rt,vt,ve-ht,ve+ht,sn,An);for(let Le=0;Le<=mt;Le++){const lt=K+Le*ct;je(lt-.04,lt+.04,h,h+ge,.04,Pn)}je(K,ue,h+ge-.03,h+ge+.03,.06,Zt,{cast:!1}),q(je(K,ue,h+.08,h+ge-.05,.01,"#cfe6df"))}Ne(!1,o,c,u,N),Ne(!1,o,c,l,N),Ne(!0,l,u,c,N),Ne(!0,He[1],u,o,N);const Ze=r.lift2?[r.lift2.z-.6,r.lift2.z+.6]:null,et=new yt;N.add(et),Ze?(Ne(!0,l,Ze[0],o,N),Ne(!0,Ze[1],He[0],o,N),Ne(!0,Ze[0],Ze[1],o,et)):Ne(!0,l,He[0],o,N);const Ke=(U,K,ue,ve)=>{const st=Math.hypot(ue-U,ve-K),mt=new Je(new Qt(st,.06,.02),i("#e8b13a",{emissive:"#3a2a00"}));mt.position.set((U+ue)/2,h+.75,(K+ve)/2),mt.rotation.y=-Math.atan2(ve-K,ue-U),g.add(mt)},_t=[[o+.2,l+.2],[c-.2,l+.2],[c-.2,u-.2],[o+.2,u-.2]];_t.forEach(([U,K],ue)=>{t(g,U,h,K,.07,.8,.07,"#d8cfbd");const[ve,st]=_t[(ue+1)%4];Ke(U,K,ve,st)}),t(g,-2.2,h,-4.6,1.6,.18,1.1,"#9a7a52"),t(g,-2.2,h+.18,-4.6,1.5,.5,1,"#c9a978"),t(g,1.8,h,-5.4,1.2,.9,1.2,"#8e9a86"),t(g,3.6,h,-2.8,.9,.14,1.4,"#9a7a52");const V=f.w/2,qt=f.d/2,Et=h+2.9,Tt=.09;function ot(U,K,ue){const ve=f.x,st=[U-.6,U+.6],mt=new yt,ct=new yt,je=new yt;K.add(mt),ue.add(ct),ue.add(je),[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([an,Fn])=>t(mt,ve+an*(V-Tt/2),0,U+Fn*(qt-Tt/2),Tt,Et,Tt,Pn));const Le=(an,Fn,js,qs=.01)=>{const Ks=ve-V-qs,Ys=ve+V+qs,Js=U-qt-qs,Zs=U+qt+qs,Qs=.04;n(mt,Ks,Ys,an,an+Fn,Js,Js+Qs,js,{cast:!1}),n(mt,Ks,Ys,an,an+Fn,Zs-Qs,Zs,js,{cast:!1}),n(mt,Ks,Ks+Qs,an,an+Fn,Js,Zs,js,{cast:!1}),n(mt,Ys-Qs,Ys,an,an+Fn,Js,Zs,js,{cast:!1})};[0,e.floors[1].y,e.floors[2].y,h].forEach(an=>Le(an+2.62,.06,Pn)),n(mt,ve-V-.03,ve+V+.03,Et,Et+.16,U-qt-.03,U+qt+.03,Pn),Le(Et+.16,.025,Zt,.03),n(mt,ve+V,ve+V+.6,h+2.5,h+2.55,U-qt+.05,U+qt-.05,Pn),[[!1,U+qt],[!1,U-qt],[!0,ve-V],[!0,ve+V]].forEach(([an,Fn])=>{q(an?n(ct,Fn-.01,Fn+.01,.05,Et,U-qt+.06,U+qt-.06,"#cfe6df"):n(ct,ve-V+.06,ve+V-.06,.05,Et,Fn-.01,Fn+.01,"#cfe6df"))});const lt=new yt;ue.add(lt);const Rt=new yt;lt.add(Rt);const vt=f.w-.3,ht=f.d-.3,sn=2.35;n(Rt,-vt/2,vt/2,0,.12,-ht/2,ht/2,"#2b302d"),n(Rt,-vt/2,vt/2,sn-.14,sn,-ht/2,ht/2,Zt),[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([an,Fn])=>t(Rt,an*(vt/2-.04),.12,Fn*(ht/2-.04),.08,sn-.26,.08,Zt)),n(Rt,-vt/2+.05,-vt/2+.1,.12,sn-.14,-ht/2+.1,ht/2-.1,Is,{cast:!1});const An=new Je(new Qt(vt-.3,.04,ht-.3),ce("#fff2c8","#ffd58a"));An.position.y=sn-.16,Rt.add(An),J.push([An.material,.4,1.2]),lt.position.set(ve,0,U);const jn=ve+V,oi=o;return n(je,jn,oi+.05,h-.26,h,st[0],st[1],"#e4ddcc"),st.forEach(an=>{n(je,jn,oi,h+ge-.03,h+ge+.03,an-.05,an+.05,Zt,{cast:!1}),q(n(je,jn,oi,h+.05,h+ge-.05,an-.01,an+.01,"#cfe6df"))}),n(je,jn+.05,o+1.2,h+.006,h+.016,U-.38,U+.38,pi,{cast:!1}),n(je,jn+.05,o+1.2,h+.004,h+.012,U-.45,U+.45,Zt,{cast:!1}),{cab:lt,cabK:Rt,kf:mt,ki:ct,kb:je,frame:K,inside:ue,lz:U,cabLamp:An}}const xt=[ot(f.z,a,N)],Ye=new yt;N.add(Ye),r.lift2&&xt.push(ot(r.lift2.z,Ye,Ye));const P=xt[0].cab,S=xt[1]?xt[1].cab:null,$=new yt;N.add($);const pe=new On(1,1),be=(U,K,ue,ve,st,mt)=>{const ct=new Je(pe,i(mt));ct.position.set(K,ue,ve),ct.scale.set(st,st*.8,st),ct.castShadow=ct.receiveShadow=!0,U.add(ct)},le=new yt;N.add(le);const $e=[[o+.2,o+.9,l+.2,(r.lift2?r.lift2.z:f.z)-.9],[o+.2,o+.9,f.z+.9,u-.2]];$e.forEach(([U,K,ue,ve])=>{n(le,U,K,h,h+.55,ue,ve,"#1f5e40"),n(le,U-.03,K+.03,h+.55,h+.6,ue-.03,ve+.03,"#e1dbc0",{cast:!1});for(let st=ue+.35;st<ve-.2;st+=.55)be(le,(U+K)/2,h+.8,st,.32,Math.round(st*3)%2?"#6b9250":"#5f8648")}),[[c-.5,u-.5],[c-.6,l+.6]].forEach(([U,K])=>{const ue=new Je(new tn(.34,.26,.7,20).translate(0,.35,0),i("#d9cdb4"));ue.position.set(U,h,K),ue.castShadow=ue.receiveShadow=!0,$.add(ue),t($,U,h+.7,K,.1,1.1,.1,"#7a6142"),[[0,2.05,0,.55,"#8aa66a"],[-.25,1.8,.2,.4,"#7a9a5c"],[.22,1.9,-.2,.42,"#9cb57a"]].forEach(([ve,st,mt,ct,je])=>be($,U+ve,h+st,K+mt,ct,je))});const xe=[],Be=new $a({color:"#2b302d"});function At(U,K,ue,ve,st,mt,ct,je){const Le=[];for(let lt=0;lt<=je*2;lt++){const Rt=lt/(je*2),vt=Math.sin(Math.PI*Rt)*.45,ht=[K+(st-K)*Rt,ve+(ct-ve)*Rt-vt,ue+(mt-ue)*Rt];Le.push(new F(...ht)),lt%2===0&&xe.push([U,ht[0],ht[1]-.07,ht[2]])}U.add(new Hr(new Jt().setFromPoints(Le),Be))}const H={x0:o+1.4,x1:o+6.2,z0:l+.25,z1:l+3.4,h:2.75};[[H.x0,H.z0],[H.x1,H.z0],[H.x1,H.z1],[H.x0,H.z1]].forEach(([U,K])=>t(w,U,h,K,.14,H.h,.14,Pn)),n(w,H.x0-.1,H.x1+.1,h+H.h,h+H.h+.16,H.z0-.07,H.z0+.07,Pn),n(w,H.x0-.1,H.x1+.1,h+H.h,h+H.h+.16,H.z1-.07,H.z1+.07,Pn);for(let U=H.x0+.1;U<H.x1;U+=.38)n(w,U-.04,U+.04,h+H.h+.16,h+H.h+.26,H.z0-.3,H.z1+.3,Ds);const ke=(U,K,ue,ve,st,mt)=>{n(U,K,ue,h,h+.22,ve,st,Is),n(U,K+.03,ue-.03,h+.22,h+.48,ve+.03,st-.03,Oi),mt==="z0"&&n(U,K,ue,h+.22,h+.92,ve,ve+.22,Oi),mt==="x0"&&n(U,K,K+.22,h+.22,h+.92,ve,st,Oi),mt==="x1"&&n(U,ue-.22,ue,h+.22,h+.92,ve,st,Oi)};ke(w,H.x0+.25,H.x1-.5,H.z0+.15,H.z0+.95,"z0"),ke(w,H.x0+.25,H.x0+1.05,H.z0+.95,H.z1-.3,"x0"),[[H.x0+1,H.z0+.45],[H.x0+2.6,H.z0+.45],[H.x0+3.6,H.z0+.45],[H.x0+.55,H.z0+1.7]].forEach(([U,K])=>t(w,U,h+.48,K,.32,.3,.14,pi));const qe=H.x0+2.5,Qe=H.z0+2.05;n(w,qe-.9,qe+.9,h,h+.38,Qe-.45,Qe+.45,"#3a3f3a"),n(w,qe-.92,qe+.92,h+.38,h+.44,Qe-.47,Qe+.47,"#d8d2c2"),n(w,qe-.6,qe+.6,h+.44,h+.47,Qe-.15,Qe+.15,Zt,{cast:!1});let Fe=new Je(new Qt(1.1,.12,.1).translate(0,.06,0),new _n({color:"#ffb35a",transparent:!0,opacity:.9}));Fe.position.set(qe,h+.47,Qe),w.add(Fe),At(b,H.x0,H.z1,h+H.h,o+.25,u-.2,h+ge+.9,9),At(b,H.x1,H.z1,h+H.h,c-.3,u-.2,h+ge+.9,12),t(b,o+.25,h,u-.2,.06,ge+.95,.06,Pn),t(b,c-.3,h,u-.2,.06,ge+.95,.06,Pn);const St=new yt;b.add(St);const pt=new On(.17,0),Ct=new Dn({color:"#ffffff"}),G=[];let we=7;const ae=()=>(we=we*16807%2147483647,we/2147483647),fe=h+H.h+.26,Ce=13;for(let U=0;U<Ce;U++){const K=H.x0+.1+U*(H.x1-H.x0-.2)/(Ce-1);for(let ue=H.z0-.25;ue<=H.z1+.25;ue+=.3){const ve=Math.min(Math.abs(ue-H.z0),Math.abs(ue-H.z1));ae()<.35+ve*.25||G.push([K+(ae()-.5)*.22,fe+ae()*.08,ue+(ae()-.5)*.16,.7+ae()*.7])}}[H.z0,H.z1].forEach(U=>{for(let K=H.x0-.05;K<=H.x1+.05;K+=.22)G.push([K,fe-.04+ae()*.06,U+(ae()-.5)*.2,.8+ae()*.5])}),[[H.x0,H.z1,2.3],[H.x1,H.z1,2.1],[H.x0,H.z0,1.2],[H.x1,H.z0,1.4]].forEach(([U,K,ue])=>{for(let ve=0;ve<ue;ve+=.16){const st=ve*4.2+U;G.push([U+Math.cos(st)*.12,h+H.h+.1-ve,K+Math.sin(st)*.12,.55+ae()*.35-ve*.1])}});const Ae=new Wn(pt,Ct,G.length),tt=new gt,zt=new Tn,$t=new kn,It=new F,on=new F,cn=new rt,Ut=["#4f8a3a","#3f7a33","#6a9e45","#2f6a30"];G.forEach(([U,K,ue,ve],st)=>{$t.set(ae()*3,ae()*3,ae()*3),zt.setFromEuler($t),It.set(ve*1.2,ve*.7/Sn,ve),on.set(U,K,ue),Ae.setMatrixAt(st,tt.compose(on,zt,It)),Ae.setColorAt(st,cn.set(Ut[st%Ut.length]))}),Ae.castShadow=!0,Ae.receiveShadow=!0,St.add(Ae);const xn=document.createElement("canvas");xn.width=xn.height=64;const ln=xn.getContext("2d"),ut=ln.createRadialGradient(32,32,0,32,32,32);ut.addColorStop(0,"rgba(255,255,255,1)"),ut.addColorStop(.5,"rgba(255,255,255,.6)"),ut.addColorStop(1,"rgba(255,255,255,0)"),ln.fillStyle=ut,ln.fillRect(0,0,64,64);const vn=new ni(xn),Qn=4,rn=4400,hn=4200,Vt=[],In=new yt;N.add(In);function zn(U){for(;Vt.length<=U;){const K=new ul({map:vn,color:"#e9e4dc",transparent:!0,depthWrite:!1,opacity:0}),ue=new cm(K);ue.renderOrder=5,In.add(ue),Vt.push(ue)}return Vt[U]}const We={x0:c-4.4,x1:c-1.2,z:l+1.5};n(y,We.x0,We.x1,h,h+1.05,We.z-.45,We.z,"#25523b"),n(y,We.x0-.06,We.x1+.06,h+1.05,h+1.12,We.z-.55,We.z+.1,"#ece4d2"),n(y,We.x0,We.x1,h+.18,h+.22,We.z+.16,We.z+.2,Zt,{cast:!1}),n(y,We.x0,We.x1,h,h+1.9,l+.2,l+.55,Is),[.8,1.35].forEach(U=>n(y,We.x0+.1,We.x1-.1,h+U,h+U+.05,l+.2,l+.7,Ds,{cast:!1}));for(let U=We.x0+.5;U<We.x1-.2;U+=.6)[.85,1.4].forEach((K,ue)=>t(y,U+ue*.15,h+K+.05,l+.48,.14,.24,.14,["#527e60","#b28b64","#75999a","#d5bd8c"][Math.round(U*3+ue)&3]));[We.x0+.6,(We.x0+We.x1)/2,We.x1-.6].forEach(U=>{t(y,U,h,We.z+.55,.06,.72,.06,Zt);const K=new Je(new tn(.2,.2,.08,16).translate(0,.04,0),i(pi));K.position.set(U,h+.72,We.z+.55),K.castShadow=!0,y.add(K)});const $n=[We.x0+.7,(We.x0+We.x1)/2,We.x1-.7].map(U=>{t(y,U,h+1.95,We.z-.25,.02,.6,.02,"#343f33",{cast:!1});const K=new Je(new gi(.13,12,8),ce("#f3d9a6","#ffb36a"));return K.position.set(U,h+1.9,We.z-.25),y.add(K),J.push([K.material,.3,1.4]),K});t(y,(We.x0+We.x1)/2,h+1.9,l+.2,.02,.7,We.z-l,"#343f33",{cast:!1}),n(y,We.x0-.1,We.x1+.1,h+2.55,h+2.6,l+.2,We.z-.2,Pn,{cast:!1});const en={x:c-.9,z:u-2.2};n(x,en.x-.35,en.x+.35,h,h+1,en.z-.8,en.z+.8,"#1d2422"),n(x,en.x-.4,en.x+.4,h+1,h+1.06,en.z-.85,en.z+.85,Zt,{cast:!1}),[-.4,.4].forEach(U=>{const K=new Je(new tn(.22,.22,.03,20),i("#2e3330"));K.position.set(en.x,h+1.08,en.z+U),x.add(K)}),[en.z-1.05,en.z+1.05].forEach(U=>{t(x,en.x+.1,h,U,.45,1.35,.45,"#262b29");const K=new Je(new Vr(.15,16).rotateY(-Math.PI/2),i("#4a514d"));K.position.set(en.x-.13,h+.9,U),x.add(K)});const A=new Je(new Bn(2.6,2.2).rotateX(-Math.PI/2),ce("#4a3a33","#d06aa0"));A.position.set(en.x-2.4,h+.012,en.z),A.receiveShadow=!0,x.add(A),J.push([A.material,.05,.45]),At(p,c-.3,u-.2,h+ge+.9,c-.3,l+1,h+ge+1.6,10),t(p,c-.3,h,l+1,.06,ge+1.65,.06,Pn),[[o+2.8,u-1.05],[o+5.6,u-1.05]].forEach(([U,K])=>{const ue=new Je(new tn(.42,.42,.05,20).translate(0,.025,0),i("#ece4d2"));ue.position.set(U,h+.74,K),ue.castShadow=!0,D.add(ue),t(D,U,h,K,.07,.74,.07,"#2b302d"),[[-.62,0],[.62,0]].forEach(([mt,ct])=>{t(D,U+mt,h,K+ct,.38,.45,.38,Ds),t(D,U+mt,h+.45,K+ct,.4,.05,.4,Oi)}),t(D,U,h+.79,K,.05,1.8,.05,"#e1dbc0");const ve=new Je(new Or(1.25,.45,8,1,!0).translate(0,-.22,0),new Dn({color:"#f1e7cc",side:2}));ve.position.set(U,h+2.85,K),ve.castShadow=!0,D.add(ve);const st=new Je(new Or(1.27,.1,8,1,!0).translate(0,-.42,0),i("#1f6b47"));st.position.copy(ve.position),D.add(st)});const O=(U,K,ue,ve)=>{const mt=H.h-.12,ct=.1*ve,je=(Le,lt,Rt,vt)=>ue?n(k,U+ct+Le*ve,U+ct+lt*ve,h+Rt,h+vt,K-.06,K+.06,pi):n(k,U-.06,U+.06,h+Rt,h+vt,K+ct+Le*ve,K+ct+lt*ve,pi);je(0,.42,mt-1.1,mt),je(0,.42*.45,.95,mt-1.1),je(0,.42*.8,0,.95),ue?n(k,U+ct,U+ct+.2*ve,h+1.05,h+1.12,K-.08,K+.08,Zt,{cast:!1}):n(k,U-.08,U+.08,h+1.05,h+1.12,K+ct,K+ct+.2*ve,Zt,{cast:!1})};O(H.x0,H.z1,!0,1),O(H.x1,H.z1,!0,-1),O(H.x1,H.z1,!1,-1),O(H.x1,H.z0,!1,1),n(M,H.x0,H.x1,h+H.h-.1,h+H.h-.05,H.z1+.06,H.z1+.1,Zt,{cast:!1}),n(M,H.x1+.06,H.x1+.1,h+H.h-.1,h+H.h-.05,H.z0,H.z1,Zt,{cast:!1});for(let U=0;U<4;U++){const K=We.x0+.5+U*(We.x1-We.x0-1)/3,ue=We.z-.22;n(z,K-.26,K+.26,h+1.12,h+1.15,ue-.13,ue+.13,Ds),[-.13,.13].forEach((ve,st)=>{const mt=new Je(new tn(.075,.075,.2,10).translate(0,.1,0),new Dn({color:"#d7ece4",transparent:!0,opacity:.5}));mt.position.set(K+ve,h+1.15,ue),z.add(mt),t(z,K+ve,h+1.16,ue,.09,.1,.09,["#5f8a3c","#7a9a42","#4f7a3a","#8c9a4a"][U+st&3]),t(z,K+ve,h+1.35,ue,.16,.03,.16,Zt,{cast:!1})})}const ie=(We.x0+We.x1)/2;n(z,ie-.75,ie+.75,h+1.97,h+2.47,l+.3,l+.36,"#22302a"),n(z,ie-.8,ie+.8,h+1.94,h+2.5,l+.26,l+.3,Is);for(let U=0;U<4;U++)n(z,ie-.6,ie+(U&1?.25:.5),h+2.36-U*.1,h+2.38-U*.1,l+.36,l+.37,Oi,{cast:!1});const X={x0:o+6.9,x1:o+9.1,z:u-.85};n(Y,X.x0,X.x1,h+.72,h+.78,X.z-.3,X.z+.3,Ds),[[X.x0+.1,-.22],[X.x0+.1,.22],[X.x1-.1,-.22],[X.x1-.1,.22]].forEach(([U,K])=>t(Y,U,h,X.z+K,.07,.72,.07,Is)),n(Y,X.x0+.1,X.x1-.1,h+.78,h+.79,X.z-.1,X.z+.1,Oi,{cast:!1});for(let U=0;U<4;U++){const K=X.x0+.3+U*(X.x1-X.x0-.6)/3,ue=new Je(new tn(.12,.1,.02,14).translate(0,.01,0),i("#fbf8ee"));ue.position.set(K,h+.79,X.z-.17+(U&1)*.34),Y.add(ue),t(Y,K,h+.8,X.z-.17+(U&1)*.34,.08,.04,.08,"#6f9a45"),t(Y,K,h,X.z+.46,.07,.5,.07,Zt),t(Y,K,h+.5,X.z+.46,.28,.06,.28,pi)}[X.x0+.55,X.x1-.55].forEach(U=>{t(Y,U,h+.79,X.z,.05,.22,.05,Zt,{cast:!1});const K=new Je(new gi(.07,10,6),ce("#fff0c8","#ffc56a"));K.position.set(U,h+1.05,X.z),Y.add(K),J.push([K.material,.3,1.6])}),[f.z-.55,f.z+.55].forEach(U=>{[o+.45,o+1.35].forEach(K=>{t(R,K,h,U,.07,.82,.07,Zt),t(R,K,h+.82,U,.13,.08,.13,Zt)}),n(R,o+.45,o+1.35,h+.66,h+.71,U-.025,U+.025,pi,{cast:!1})}),n(R,o+1.6,o+6.4,h+.006,h+.014,u-1.95,u-.25,Zt,{cast:!1}),n(R,o+1.7,o+6.3,h+.008,h+.018,u-1.85,u-.35,pi,{cast:!1}),[[c-.35,u-1.1],[o+6.6,l+.35]].forEach(([U,K])=>{t(se,U,h,K,.26,.1,.26,Zt),t(se,U,h+.1,K,.06,1.25,.06,Zt);const ue=new Je(new Qt(.24,.34,.24).translate(0,.17,0),ce("#fff1cf","#ffcf7a"));ue.position.set(U,h+1.35,K),ue.castShadow=!1,se.add(ue),J.push([ue.material,.35,1.5]),t(se,U,h+1.69,K,.3,.05,.3,Zt,{cast:!1})});const W=new gi(.06,8,6),Me=ce("#fff1cf","#ffcf7a");J.push([Me,.2,1.6]);const Re=new Map;xe.forEach(([U,...K])=>{Re.has(U)||Re.set(U,[]),Re.get(U).push(K)});const Xe=new gt;Re.forEach((U,K)=>{const ue=new Wn(W,Me,U.length);U.forEach(([ve,st,mt],ct)=>ue.setMatrixAt(ct,Xe.makeTranslation(ve,st,mt))),K.add(ue)});const Pe=new jr("#ffc98a",0,14,1.2);Pe.position.set((o+c)/2,h+2.6,(l+u)/2),s.add(Pe);const ft=e.shell,nt=ft.loungeFront,Te=ft.loungeDoor.x,it=ft.loungeHeader,Mt=.7,Gt=.81,Kt=new yt;a.add(Kt);const bt=new yt;Kt.add(bt),n(bt,Te-Mt-.12,Te-Mt,0,it+.12,nt-.02,nt+.1,"#1f4a35"),n(bt,Te+Mt,Te+Mt+.12,0,it+.12,nt-.02,nt+.1,"#1f4a35"),n(bt,Te-Mt-.12,Te+Mt+.12,it,it+.14,nt-.02,nt+.1,"#1f4a35");const Ge=nt-Gt-1.5;n(bt,Te-Mt-.1,Te-Mt,0,it,Ge,nt-.02,"#26302a",{cast:!1}),n(bt,Te+Mt,Te+Mt+.1,0,it,Ge,nt-.02,"#26302a",{cast:!1}),n(bt,Te-Mt,Te+Mt,0,it,Ge-.1,Ge,"#2f3a32",{cast:!1}),n(bt,Te-Mt,Te+Mt,it,it+.05,Ge,nt-.02,"#1d241f",{cast:!1}),n(bt,Te-.38,Te+.38,.004,.014,Ge,nt-.02,pi,{cast:!1});const gn=new Je(new gi(.1,12,8),ce("#fff2c8","#ffd58a"));gn.position.set(Te,it-.45,Ge+.06),bt.add(gn),J.push([gn.material,.6,1.2]);const wt=new yt;wt.position.set(Te-Mt+.02,0,nt+.02),bt.add(wt);const te=Mt*2-.04,Q=it-.03;n(wt,0,te,.01,Q,-.03,.03,"#2d6146"),[[.32,.95],[1.15,1.85]].forEach(([U,K])=>n(wt,.14,te-.14,U,K,.03,.05,"#357052",{cast:!1})),n(wt,.08,te-.08,.02,.2,.03,.045,Zt,{cast:!1}),n(wt,te-.2,te-.12,.95,1.1,.03,.1,Zt,{cast:!1});const E=document.createElement("canvas");E.width=256,E.height=96;const L=new ni(E);L.colorSpace=Ht;const C=new Je(new Bn(.66,.25),new _n({map:L}));C.position.set(te*.62,1.5,.056),wt.add(C);const B=document.createElement("canvas");B.width=512,B.height=64;const j=new ni(B);j.colorSpace=Ht,j.anisotropy=4;const ee=new _n({map:j,transparent:!0}),he=new yt;he.position.set(Te+2.1,2.02,nt+.05),Kt.add(he),[.12,-.1].forEach((U,K)=>{const ue=new Je(new Bn(2.3,.26),ee);ue.rotation.z=U,ue.position.z=K*.006,he.add(ue)});function me(){const U='"Fredoka", "Bricolage Grotesque", sans-serif';let K=E.getContext("2d");K.fillStyle="#ece4d2",K.fillRect(0,0,256,96),K.strokeStyle=Zt,K.lineWidth=6,K.strokeRect(3,3,250,90),K.fillStyle="#1f3a2c",K.font=`600 40px ${U}`,K.textAlign="center",K.textBaseline="middle",K.fillText("STAFF ONLY",128,51),L.needsUpdate=!0,K=B.getContext("2d"),K.clearRect(0,0,512,64),K.fillStyle="#e8b13a",K.fillRect(0,6,512,52),K.fillStyle="#2b2414",K.font=`600 34px ${U}`,K.textAlign="center",K.textBaseline="middle",K.fillText("COMING SOON  ·  COMING SOON",256,33),j.needsUpdate=!0}me(),document.fonts&&document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",me);let ye=0,Se=null,ne=null;const Ie=[],Ve=[],Oe=new Set,at=new Set,dt=ce("#fff0c8","#ffc56a");J.push([dt,.3,1.6]);function Ft(U,K){const ue=[{file:"rooftop_speakeasy.glb",parent:b,hide:w,at:[[o+3.8,l+1.825]]},{file:"rooftop_pergola_vines.glb",parent:b,hide:St,at:[[o+3.8,l+1.825]]},{file:"rooftop_bar.glb",parent:m,hide:y,at:[[(We.x0+We.x1)/2,We.z-.225]]},{file:"rooftop_dj_booth.glb",parent:p,hide:x,at:[[en.x,en.z]]},{file:"rooftop_parasol_table.glb",parent:v,hide:D,at:[[o+2.8,u-1.05],[o+5.6,u-1.05]]},{file:"rooftop_olive.glb",parent:N,hide:$,at:[[c-.5,u-.5],[c-.6,l+.6]]},{file:"rooftop_drapes.glb",parent:M,hide:k,at:[[H.x0,H.z1,0],[H.x1,H.z1,Math.PI],[H.x1,H.z1,Math.PI/2],[H.x1,H.z0,-Math.PI/2]]},{file:"rooftop_jar_flight.glb",parent:_,hide:z,at:[[(We.x0+We.x1)/2,We.z-.225]]},{file:"rooftop_chefs_table.glb",parent:I,hide:Y,at:[[o+8,u-.85]]},{file:"rooftop_lantern.glb",parent:R,hide:se,at:[[c-.35,u-1.1],[o+6.6,l+.35]]}];ue.forEach(je=>at.add(je.parent)),ue.forEach(je=>U.load(K+je.file,Le=>{const lt=Le.scene;lt.traverse(ht=>{ht.isMesh&&(ht.castShadow=ht.receiveShadow=!0)});const Rt=lt.getObjectByName("Flame"),vt=lt.getObjectByName("DanceFloor");lt.traverse(ht=>{/^Sign/.test(ht.name)&&(ht.visible=!1)}),Rt&&Rt.traverse(ht=>{ht.isMesh&&(ht.material=Fe.material,ht.castShadow=!1)}),vt&&vt.traverse(ht=>{ht.isMesh&&(ht.material=A.material)}),$n.forEach((ht,sn)=>{const An=lt.getObjectByName("BarLamp"+sn);An&&An.traverse(jn=>{jn.isMesh&&(jn.material=ht.material,jn.castShadow=!1)})}),lt.traverse(ht=>{ht.isMesh&&/^(CandleGlow|LanternGlow)/.test(ht.name)&&(ht.material=dt,ht.castShadow=!1)}),lt.traverse(ht=>{const sn=ht.isMesh&&ht.material;sn&&/^Vine/.test(sn.name)&&!Ve.some(An=>An[0]===sn)&&Ve.push([sn,sn.color.clone()])}),Vi(lt),je.at.forEach(([ht,sn,An],jn)=>{const oi=new yt;An&&(oi.rotation.y=An),oi.add(jn?lt.clone():lt),oi.scale.set(1.69,1.69/Sn,1.69),oi.position.set(ht,h,sn),je.parent.add(oi)}),Rt&&(Fe=Rt),je.hide.visible=!1,Oe.add(je.parent)},void 0,Le=>console.warn("3D map: could not load "+je.file,Le)));const ve=(je,Le,lt,Rt,vt)=>{const ht=new yt;return ht.add(Le),ht.scale.set(1.69,1.69/Sn,1.69),ht.position.set(lt,Rt,vt),je.add(ht),Le.traverse(sn=>{sn.isMesh&&(sn.castShadow=sn.receiveShadow=!0)}),Vi(Le),ht},st=(je,Le)=>U.load(K+je,lt=>Le(lt.scene),void 0,lt=>console.warn("3D map: could not load "+je,lt));st("lounge_elevator_shaft.glb",je=>xt.forEach((Le,lt)=>{const Rt=lt?je.clone():je;Rt.traverse(vt=>{vt.isMesh&&vt.material&&/Glass/.test(vt.material.name)&&(vt.material=Z,vt.castShadow=vt.receiveShadow=!1,lt||Ie.push(vt))}),ve(Le.frame,Rt,f.x,0,Le.lz),Le.kf.visible=Le.ki.visible=!1})),st("lounge_elevator_cab.glb",je=>xt.forEach((Le,lt)=>{const Rt=lt?je.clone():je;Rt.traverse(vt=>{/^Rail/.test(vt.name)&&(vt.visible=!1),vt.name==="CabLamp"&&vt.traverse(ht=>{ht.isMesh&&(ht.material=Le.cabLamp.material,ht.castShadow=!1)})}),ve(Le.cab,Rt,0,0,0),Le.cabK.visible=!1})),st("lounge_bridge.glb",je=>xt.forEach((Le,lt)=>{const Rt=lt?je.clone():je;Rt.traverse(vt=>{vt.isMesh&&vt.material&&/Glass/.test(vt.material.name)&&(vt.material=Z,vt.castShadow=vt.receiveShadow=!1)}),ve(Le.inside,Rt,(f.x+f.w/2+o)/2,h,Le.lz),Le.kb.visible=!1})),st("lounge_door.glb",je=>{const Le=je.getObjectByName("DoorLeaf"),lt=je.getObjectByName("StaffPlaque"),Rt=je.getObjectByName("Sconce");Le&&(Rt&&Rt.traverse(vt=>{vt.isMesh&&(vt.material=gn.material,vt.castShadow=!1)}),ve(Kt,je,Te,0,nt),Se=Le,ne=lt,bt.visible=!1)});const mt=["deck_planter.glb","deck_planter_short.glb"];let ct=0;mt.forEach((je,Le)=>st(je,lt=>{const[Rt,vt,ht,sn]=$e[Le];ve(N,lt,(Rt+vt)/2,h,(ht+sn)/2),++ct===mt.length&&(le.visible=!1)}))}function Lt(U,K){const ue=Math.min(T.length,Math.max(1,U)),ve=[...d,N,Ye,et,In];if(!T.slice(0,ue).every(Le=>!at.has(Le)||Oe.has(Le))||!Oe.has(N))return null;const st=ve.map(Le=>Le.visible);g.visible=!1,N.visible=!0,In.visible=!1,T.forEach((Le,lt)=>{Le.visible=lt<ue}),Ye.visible=!!K,et.visible=!K;const mt=a.clone();ve.forEach((Le,lt)=>{Le.visible=st[lt]}),mt.updateMatrixWorld(!0);const ct=[],je=new En;return mt.traverse(Le=>{if(Le!==mt){if(!Le.visible||Le.isSprite){ct.push(Le);return}!Le.isMesh||Le.isInstancedMesh||(Le.geometry.boundingBox||Le.geometry.computeBoundingBox(),je.copy(Le.geometry.boundingBox).applyMatrix4(Le.matrixWorld),(je.max.y<h-.05||je.min.x<o-.2)&&ct.push(Le))}}),ct.forEach(Le=>Le.parent&&Le.parent.remove(Le)),mt}return{loadModels:Ft,pictureCopy:Lt,update(U){const K=U.loungeOpen?Math.max(1,U.loungeTier||1):0,ue=U.night||0;g.visible=!K,N.visible=!!K,T.forEach((ct,je)=>{ct.visible=K>je}),P.position.y=U.liftY||0,S&&(S.position.y=U.liftY2||0,Ye.visible=!!U.loungeLift,et.visible=!U.loungeLift),ye+=((K?1.75:0)-ye)*.15,wt.rotation.y=ye,C.visible=!K,he.visible=!K,Se&&(Se.rotation.y=ye,ne&&(ne.visible=!K)),Ie.forEach(ct=>{ct.visible=!!K}),J.forEach(([ct,je,Le])=>{ct.emissiveIntensity=je+ue*Le}),Fe.scale.y=.8+Math.sin((U.time||0)/130)*.2+Math.sin((U.time||0)/53)*.1,Fe.visible=K>=1,Ct.color.setScalar(1-ue*.45),Ve.forEach(([ct,je])=>ct.color.copy(je).multiplyScalar(1-ue*.45));const ve=K?U.loungeSmokers||[]:[],st=U.time||0;let mt=0;ve.forEach(ct=>{for(let je=0;je<Qn;je++){const Le=(st+ct.id*1777%rn+je*rn/Qn)%rn/hn;if(Le>=1)continue;const lt=zn(mt++),Rt=.75+Le*2.3,vt=Math.sin(Le*3+ct.id+je)*.2;lt.visible=!0,lt.position.set(ct.x+(ct.facing||0)*.4+vt+Le*.25,h+1.65+Le*2,ct.z+.1-Le*.15),lt.scale.set(Rt,Rt/Sn,1),lt.material.opacity=Math.min(1,Le*6)*Math.pow(1-Le,.8)*.95,lt.material.color.setScalar(.72-ue*.25)}});for(let ct=mt;ct<Vt.length;ct++)Vt[ct].visible=!1;Pe.intensity=K?ue*6:0}}}const cg="#1f6b47",lg="#d0a54e";function hg(s,e,{span:t,model:n}){const i=e.entrance;if(!i)return null;const r=new yt;s.add(r);const a=i.x;function o(M,_,I){const R=new Jt;R.setAttribute("position",new kt(M.flat(),3)),R.setAttribute("uv",new kt(_.flat(),2)),R.setIndex(M.length===4?[0,1,2,0,2,3]:[0,1,2]),R.computeVertexNormals();const T=new Je(R,I);return T.castShadow=T.receiveShadow=!0,r.add(T),T}const c=i.sign,l=new yt;r.add(l),t(l,c.x0,a,c.y1+.08,c.y1+.16,c.z-.05,c.z+.05,cg),[c.x0+.12,c.x1-.12].forEach(M=>t(l,M-.015,M+.015,c.y1,c.y1+.08,c.z-.015,c.z+.015,lg,{cast:!1})),t(l,c.x0-.04,c.x1+.04,c.y0-.04,c.y1+.04,c.z-.05,c.z+.05,"#1d211f");const u=document.createElement("canvas");u.width=256,u.height=284;const h=u.getContext("2d");h.fillStyle="#0d120f",h.fillRect(0,0,256,284);const f=128,d=150,g=(M,_)=>{const I=118*_,R=17*_,T=M-Math.PI/2,w=Math.cos(T),y=Math.sin(T),x=16,D=Y=>Array.from({length:x+1},(se,N)=>{const Z=N/x,q=R*Math.pow(Math.sin(Math.PI*Math.min(1,Z*1.08)),.9)*(N%2?1:.72);return[f+w*I*Z-y*q*Y,d+y*I*Z+w*q*Y]}),k=D(1),z=D(-1).reverse();h.moveTo(f,d),k.forEach(Y=>h.lineTo(Y[0],Y[1])),z.forEach(Y=>h.lineTo(Y[0],Y[1])),h.closePath()},b=()=>{h.beginPath(),[[0,1],[-.5,.84],[.5,.84],[-1.05,.7],[1.05,.7],[-1.6,.38],[1.6,.38]].forEach(([M,_])=>g(M,_))};h.lineJoin=h.lineCap="round",b(),h.shadowColor="#29ff6a",h.shadowBlur=18,h.strokeStyle="#3df27a",h.lineWidth=12,h.stroke(),b(),h.shadowBlur=0,h.strokeStyle="#e4ffe9",h.lineWidth=6,h.stroke(),b(),h.fillStyle="#0f1812",h.fill();const m=()=>{h.beginPath(),h.moveTo(f,d-6),h.lineTo(f,d+34)};m(),h.shadowBlur=14,h.strokeStyle="#3df27a",h.lineWidth=7,h.stroke(),m(),h.shadowBlur=0,h.strokeStyle="#e4ffe9",h.lineWidth=3,h.stroke(),h.font='300 54px "Fredoka", sans-serif',h.textAlign="center",h.textBaseline="alphabetic",h.lineWidth=2.5,h.shadowColor="#29ff6a",h.shadowBlur=16,h.strokeStyle="#7dff9f",h.strokeText("OPEN",f,262,210),h.shadowBlur=0,h.strokeStyle="#ecfff0",h.lineWidth=1.5,h.strokeText("OPEN",f,262,210);const p=new ni(u);p.colorSpace=Ht;const v=new _n({map:p,toneMapped:!1,side:2});return[c.z-.052,c.z+.052].forEach(M=>{const _=o([[c.x0,c.y1,M],[c.x1,c.y1,M],[c.x1,c.y0,M],[c.x0,c.y0,M]],[[0,1],[1,1],[1,0],[0,0]],v);_.castShadow=!1,l.attach(_)}),n&&n("blade_sign.glb",a,0,c.z,M=>{let _=0;const I=p.clone();I.flipY=!1,I.needsUpdate=!0;const R=v.clone();R.map=I,M.traverse(T=>{T.isMesh&&/^SignFace/.test(T.name)&&(T.material=R,T.castShadow=!1,_++)}),_?l.visible=!1:M.parent.visible=!1},r),r}const ug=5e3,fg=8e3,Bc=4e3,Pr=9e4,dg=8,La=256,Da=64,Lr=2,kc=new Map;function Dr(s){if(typeof s!="string")return null;let e=kc.get(s);if(e!==void 0)return e;if(e=null,s[0]==="#"){let t=s.slice(1);(t.length===3||t.length===4)&&(t=t.split("").map(n=>n+n).join("")),(t.length===6||t.length===8)&&(e=[new rt("#"+t.slice(0,6)),t.length===8?parseInt(t.slice(6),16)/255:1])}else if(/^rgba?\(/.test(s)){const t=s.match(/[\d.]+/g).map(Number);e=[new rt(`rgb(${t[0]},${t[1]},${t[2]})`),t.length>3?t[3]:1]}return kc.set(s,e),e}function pg(s){const e=new yt;e.visible=!1,s.add(e);const t=new gt,n=new F,i=new F,r=new Tn,a=new F(0,1,0),o=new F,c=new rt("#ffffff");function l(N,Z,q,ce=!0){const J=new Wn(N,q,Z);return J.instanceMatrix.setUsage(35048),J.setColorAt(0,c),J.count=0,J.castShadow=ce,J.receiveShadow=!0,J.frustumCulled=!1,e.add(J),J}const u=N=>new Dn({color:"#ffffff",...N}),h=N=>new _n({color:"#ffffff",...N}),f={transparent:!0,opacity:.32,depthWrite:!1},d=new Qt(1,1,1).translate(0,.5,0),g=new tn(.5,.5,1,8,1).translate(0,.5,0),b=new On(1,2),m=new tn(1,1,.02,20),p=new Vr(1,24).rotateY(Math.PI/4),v={box:[l(d,ug,u()),l(d,800,h()),l(d,800,u(f),!1)],cord:[l(g,fg,u()),l(g,1500,h())],blob:[l(b,Bc,u()),l(b,600,h())],disc:[l(m,Bc,u(),!1),l(m,600,h(),!1)],facing:[l(p,600,u({side:2}),!1),l(p,300,h({side:2}),!1)]};function M(N,Z){const q=new Jt;q.setAttribute("position",new jt(new Float32Array(Pr*3),3).setUsage(35048)),q.setAttribute("normal",new jt(new Float32Array(Pr*3),3).setUsage(35048)),q.setAttribute("color",new jt(new Float32Array(Pr*(Z?4:3)),Z?4:3).setUsage(35048)),q.setDrawRange(0,0),Object.assign(N,{vertexColors:!0,side:2,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});const ce=new Je(q,N);return ce.frustumCulled=!1,ce.receiveShadow=!0,e.add(ce),{mesh:ce,g:q,alpha:Z,n:0}}const _=[M(u(),!1),M(h(),!1),M(u({transparent:!0,depthWrite:!1}),!0)],I=new Map;function R(N,Z){const q=N.x.toFixed(2)+","+N.y.toFixed(2)+","+N.z.toFixed(2)+","+N.alongZ;let ce=I.get(q);if(!ce){const J=document.createElement("canvas");J.width=La*Lr,J.height=Da*Lr;const re=J.getContext("2d");re.scale(Lr,Lr),re.translate(La/2,Da/2);const Ee=Z*Math.SQRT1_2;try{N.draw(re,Ee)}catch{}const ze=new ni(J);ze.colorSpace=Ht,ze.anisotropy=4,ce=new Je(new Bn(La/Ee,Da/Z),h({map:ze,transparent:!0,alphaTest:.05,side:2,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4})),ce.position.set(N.x,N.y,N.z),N.alongZ&&(ce.rotation.y=Math.PI/2),e.add(ce),I.set(q,ce)}return ce}const T=[];for(let N=0;N<dg;N++){const Z=new jr("#ffd9a0",0,9,1.4);e.add(Z),T.push(Z)}function w(N,Z,q,ce){const J=q?N[2]:N[Z?1:0];return!J||J.count>=J.instanceMatrix.count?null:(ce(t),J.setMatrixAt(J.count,t),[J,J.count++])}function y(N,Z){N&&N[0].setColorAt(N[1],Z[0])}function x(N,Z){N.clearUpdateRanges(),Z>0&&N.addUpdateRange(0,Z*N.itemSize),N.needsUpdate=!0}function D(N,Z){let q=2166136261^N.length;const ce=re=>{q=Math.imul(q^re,16777619)},J=re=>{if(typeof re=="number")ce(Math.round(re*4096));else if(typeof re=="string")for(let Ee=0;Ee<re.length;Ee++)ce(re.charCodeAt(Ee));else Array.isArray(re)?(ce(re.length),re.forEach(J)):ce(re?1:0)};return N.forEach(re=>Z.forEach(Ee=>J(re[Ee]))),q}const k={};function z(N,Z,q){const ce=D(Z,q);return k[N]===ce?!1:(k[N]=ce,!0)}function Y(N){N.forEach(Z=>{Z.count=0})}function se(N){N.forEach(Z=>{x(Z.instanceMatrix,Z.count),Z.instanceColor&&x(Z.instanceColor,Z.count)})}return{group:e,update(N,Z){if(z("boxes",N.boxes,["x","y","z","w","d","h","c","lit"])&&(Y(v.box),N.boxes.forEach(J=>{const re=Dr(J.c);!re||re[1]<.05||y(w(v.box,J.lit,re[1]<.9,Ee=>Ee.compose(n.set(J.x,J.y,J.z),r.identity(),i.set(Math.max(.01,J.w),Math.max(.01,J.h),Math.max(.01,J.d)))),re)}),se(v.box)),z("lines",N.lines,["pts","c","w","lit"])&&(Y(v.cord),N.lines.forEach(J=>{const re=Dr(J.c);if(!re||re[1]<.5)return;const Ee=Math.max(.02,J.w);for(let ze=1;ze<J.pts.length;ze++){const oe=J.pts[ze-1],de=J.pts[ze];o.set(de[0]-oe[0],de[1]-oe[1],de[2]-oe[2]);const _e=o.length();_e<1e-4||(o.divideScalar(_e),y(w(v.cord,J.lit,!1,ge=>ge.compose(n.set(oe[0],oe[1],oe[2]),r.setFromUnitVectors(a,o),i.set(Ee,_e,Ee))),re))}}),se(v.cord)),z("ellipses",N.ellipses,["at","rx","ry","c","lit"])){const J=v.blob.concat(v.disc,v.facing);Y(J),N.ellipses.forEach((re,Ee)=>{const ze=Dr(re.c);if(!ze||ze[1]<.5)return;const oe=re.ry/re.rx<.66,de=re.rx,_e=.08+Ee*.0015;re.ry>re.rx*1.05?y(w(v.facing,re.lit,!1,ge=>ge.compose(n.set(re.at[0]+_e,re.at[1],re.at[2]+_e),r.identity(),i.set(re.rx,re.ry,re.rx))),ze):y(oe?w(v.disc,re.lit,!1,ge=>ge.compose(n.set(re.at[0],re.at[1],re.at[2]),r.identity(),i.set(de,1,de))):w(v.blob,re.lit,!1,ge=>ge.compose(n.set(re.at[0],re.at[1],re.at[2]),r.identity(),i.set(de,Math.max(.4,re.ry/re.rx)*de,de))),ze)}),se(J)}if(z("polys",N.polys,["pts","c","lit"])){_.forEach(re=>{re.n=0});const J=new F;N.polys.forEach(re=>{const Ee=Dr(re.c);if(!Ee||Ee[1]<.08||re.pts.length<3)return;const ze=_[Ee[1]<.9?2:re.lit?1:0],oe=re.pts.length-2;if(ze.n+oe*3>Pr)return;const de=ze.g.attributes.position.array,_e=ze.g.attributes.normal.array,ge=ze.g.attributes.color.array,He=ze.alpha?4:3,Ne=re.pts[0];J.set(0,0,0);for(let et=0;et<re.pts.length;et++){const Ke=re.pts[et],_t=re.pts[(et+1)%re.pts.length];J.x+=(Ke[1]-_t[1])*(Ke[2]+_t[2]),J.y+=(Ke[2]-_t[2])*(Ke[0]+_t[0]),J.z+=(Ke[0]-_t[0])*(Ke[1]+_t[1])}if(J.lengthSq()<1e-12)return;const Ze=J.y<-1e-6||Math.abs(J.y)<1e-6&&J.x+J.z<0;Ze&&J.negate(),J.normalize();for(let et=1;et<=oe;et++)(Ze?[Ne,re.pts[et+1],re.pts[et]]:[Ne,re.pts[et],re.pts[et+1]]).forEach(Ke=>{const _t=ze.n++;de[_t*3]=Ke[0],de[_t*3+1]=Ke[1],de[_t*3+2]=Ke[2],_e[_t*3]=J.x,_e[_t*3+1]=J.y,_e[_t*3+2]=J.z,ge[_t*He]=Ee[0].r,ge[_t*He+1]=Ee[0].g,ge[_t*He+2]=Ee[0].b,ze.alpha&&(ge[_t*He+3]=Ee[1])})}),_.forEach(re=>{re.g.setDrawRange(0,re.n),["position","normal","color"].forEach(Ee=>x(re.g.attributes[Ee],re.n))})}const q=new Set;N.faces.forEach(J=>q.add(R(J,N.unit))),I.forEach(J=>{J.visible=q.has(J)});const ce=(N.fixtures||[]).slice().sort((J,re)=>re.size-J.size);T.forEach((J,re)=>{const Ee=ce[re];J.intensity=Ee?Z*6*Math.min(1.5,Ee.size):0,Ee&&J.position.set(Ee.x,Ee.y,Ee.z)})}}}const mg=[7,9,8,6,3,4],gg=/^(ReaderScreen|MonitorGlass|ScaleScreen|TillGlass)$/,Ei=new En,bg=new En,_g=new F;function xg(s){return Ei.makeEmpty(),s.forEach(e=>{e.updateMatrix(),e.geometry?(e.geometry.boundingBox||e.geometry.computeBoundingBox(),Ei.union(bg.copy(e.geometry.boundingBox).applyMatrix4(e.matrix))):Ei.expandByPoint(e.position)}),_g.set((Ei.min.x+Ei.max.x)/2,Ei.min.y,(Ei.min.z+Ei.max.z)/2)}function Ia(s,e){const t=new Map;return s.forEach(n=>{const i=e.exec(n.name);i&&(t.has(i[1])||t.set(i[1],[]),t.get(i[1]).push(n))}),[...t.keys()].sort().map(n=>t.get(n))}function Fa(s,e){const t=s[0].parent,n=new yt,i=xg(s);return n.position.copy(i),n.userData.motion=Object.assign({rest:i.toArray()},e),t.add(n),s.forEach(r=>{r.position.sub(i),n.add(r)}),n}const Ti=(s,e)=>{s.userData.motion=Object.assign({rest:s.position.toArray(),size:s.scale.toArray()},e)},Ir=(s,e)=>s.forEach((t,n)=>e(t,n,s.length));function vg(s,e){const t=[];s.traverse(i=>{i!==s&&i.name&&t.push(i)});const n=i=>t.filter(r=>i.test(r.name));return e===0&&Ia(t,/^S(\d+)(?:Leaf|Stem|Top)/).forEach((i,r,a)=>Fa(i,{m:"sprout",k:r,n:a.length})),e===1&&Ia(t,/^P(\d+)(?:Stem|Leaf|Pet|Branch|Cola|SideCola|Sugar|TopSugar|Crown)/).forEach((i,r)=>{Fa(i,{m:"plant",k:r}),i.forEach(a=>{/(Cola|Sugar)\d*$/.test(a.name)&&Ti(a,{m:"bud"})})}),e===2&&(Ir(n(/^(?:T\dP\d|Plant|Corner)(?:Leaf|Pet|BranchLeaf)/),(i,r,a)=>Ti(i,{m:"trim",k:r*7%a,n:a})),Ir(n(/^(?:Tray\d?Nug|BoardNug)\d+$/),(i,r,a)=>Ti(i,{m:"fill",k:r,n:a,from:.1,span:.75}))),e===3&&(n(/^Press(?:Ram|Head|Plate)$/).forEach(i=>Ti(i,{m:"press",amp:.03})),n(/^ScalePan$/).forEach(i=>Ti(i,{m:"press",amp:.008})),Ir(n(/^(?:TopCratePouch|Box)\d+$/),(i,r,a)=>Ti(i,{m:"fill",k:r,n:a,from:.35,span:.5})),Ir(n(/^TrayNug\d+$/),(i,r,a)=>Ti(i,{m:"drain",k:r,n:a}))),e===4&&n(/^Key\d+$/).forEach((i,r)=>Ti(i,{m:"key",k:r})),e===5&&Ia(t,/^(?:Bag|FlatBag)(\d+)/).forEach((i,r,a)=>Fa(i,{m:"handoff",k:r,n:a.length})),e!==6&&t.forEach(i=>{gg.test(i.name)&&i.isMesh&&(i.userData.motion={m:"screen"})}),s}function Mg(s,e){const t=[];return s.traverse(n=>{const i=n.userData.motion;i&&(i.m==="screen"&&(n.material=n.material.clone(),n.material.emissive&&n.material.emissive.copy(n.material.color).lerp(new rt("#bff5dc"),.5)),t.push(n))}),t.length?{index:e,parts:t,act:0,grow:[]}:null}const ja=s=>s<0?0:s>1?1:s,Bi=s=>(s=ja(s),s*s*(3-2*s));function yg(s){return s<.72?s/.72:s>.86?(1-s)/.14:1}function Sg(s,e,t){const n=e.clock||0,i=mg[s.index]||6,r=n/i%1,a=1-Math.exp(-t*4);s.act+=((e.act||0)-s.act)*a;const o=s.parts;for(let c=0;c<o.length;c++){const l=o[c],u=l.userData.motion;switch(u.m){case"plant":{const h=yg((n/i+u.k*.23)%1),f=s.grow[u.k]=s.grow[u.k]===void 0?h:s.grow[u.k]+(h-s.grow[u.k])*a;l.scale.setScalar(.2+.8*Bi(f)),l.userData.g=f,l.rotation.z=Math.sin(n*1.1+u.k*1.7)*.025;break}case"bud":{const h=Bi((l.parent.userData.g-.55)/.35);l.scale.set(u.size[0]*h,u.size[1]*h,u.size[2]*h);break}case"sprout":{const h=(n/i+u.k*.17)%1,f=h>.9?1-(h-.9)/.1:Bi(h/.8);l.scale.setScalar(.06+.94*f);break}case"trim":{const h=.1+.7*u.k/u.n,f=r>.92?(r-.92)/.08:1-ja((r-h)/.06);l.scale.set(u.size[0]*f,u.size[1]*f,u.size[2]*f);break}case"fill":case"drain":{const h=(u.m==="fill"?u.from:.35)+(u.m==="fill"?u.span:.5)*u.k/u.n,f=r>.93?1-(r-.93)/.07:Bi((r-h)/.05),d=u.m==="fill"?f:1-f;l.scale.set(u.size[0]*d,u.size[1]*d,u.size[2]*d);break}case"press":l.position.y=u.rest[1]-u.amp*Math.sin(Math.PI*ja((r-.1)/.25));break;case"key":l.position.y=u.rest[1]-(Math.floor(n*6)%9===u.k*4%9?.006*s.act:0);break;case"handoff":{const h=Math.floor(n/i)%u.n===u.k,f=h?Bi((r-.4)/.3):0,d=h?r<.85?Bi((r-.6)/.2):1-Bi((r-.85)/.15):0;l.position.y=u.rest[1]+(r<.85?.1*f:0),l.scale.setScalar(1-d);break}case"screen":l.material.emissiveIntensity=s.act*(.35+.08*Math.sin(n*23)+(Math.sin(n*3.1)>.96?.15:0));break}}}class Eg extends vs{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Cg(t)}),this.register(function(t){return new Pg(t)}),this.register(function(t){return new kg(t)}),this.register(function(t){return new zg(t)}),this.register(function(t){return new Gg(t)}),this.register(function(t){return new Dg(t)}),this.register(function(t){return new Ig(t)}),this.register(function(t){return new Fg(t)}),this.register(function(t){return new Ng(t)}),this.register(function(t){return new Rg(t)}),this.register(function(t){return new Ug(t)}),this.register(function(t){return new Lg(t)}),this.register(function(t){return new Bg(t)}),this.register(function(t){return new Og(t)}),this.register(function(t){return new Ag(t)}),this.register(function(t){return new Hg(t)}),this.register(function(t){return new Vg(t)})}load(e,t,n,i){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=Gs.extractUrlBase(e);a=Gs.resolveURL(l,this.path)}else a=Gs.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Al(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Rl){try{a[Nt.KHR_BINARY_GLTF]=new Wg(e)}catch(h){i&&i(h);return}r=JSON.parse(a[Nt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new ib(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(h){case Nt.KHR_MATERIALS_UNLIT:a[h]=new wg;break;case Nt.KHR_DRACO_MESH_COMPRESSION:a[h]=new Xg(r,this.dracoLoader);break;case Nt.KHR_TEXTURE_TRANSFORM:a[h]=new jg;break;case Nt.KHR_MESH_QUANTIZATION:a[h]=new qg;break;default:f.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function Tg(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const Nt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Ag{constructor(e){this.parser=e,this.name=Nt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const u=new rt(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],Cn);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Wa(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new jr(u),l.distance=h;break;case"spot":l=new km(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,mi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class wg{constructor(){this.name=Nt.KHR_MATERIALS_UNLIT}getMaterialType(){return _n}extendParams(e,t,n){const i=[];e.color=new rt(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Cn),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Ht))}return Promise.all(i)}}class Rg{constructor(e){this.parser=e,this.name=Nt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Cg{constructor(e){this.parser=e,this.name=Nt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new De(o,o)}return Promise.all(r)}}class Pg{constructor(e){this.parser=e,this.name=Nt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class Lg{constructor(e){this.parser=e,this.name=Nt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class Dg{constructor(e){this.parser=e,this.name=Nt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new rt(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Cn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Ht)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class Ig{constructor(e){this.parser=e,this.name=Nt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class Fg{constructor(e){this.parser=e,this.name=Nt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new rt().setRGB(o[0],o[1],o[2],Cn),Promise.all(r)}}class Ng{constructor(e){this.parser=e,this.name=Nt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Ug{constructor(e){this.parser=e,this.name=Nt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new rt().setRGB(o[0],o[1],o[2],Cn),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,Ht)),Promise.all(r)}}class Og{constructor(e){this.parser=e,this.name=Nt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class Bg{constructor(e){this.parser=e,this.name=Nt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class kg{constructor(e){this.parser=e,this.name=Nt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class zg{constructor(e){this.parser=e,this.name=Nt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Gg{constructor(e){this.parser=e,this.name=Nt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Hg{constructor(e){this.name=Nt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=i.byteOffset||0,l=i.byteLength||0,u=i.count,h=i.byteStride,f=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,f,i.mode,i.filter).then(function(d){return d.buffer}):a.ready.then(function(){const d=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(d),u,h,f,i.mode,i.filter),d})})}else return null}}class Vg{constructor(e){this.name=Nt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==Hn.TRIANGLES&&l.mode!==Hn.TRIANGLE_STRIP&&l.mode!==Hn.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,d=[];for(const g of h){const b=new gt,m=new F,p=new Tn,v=new F(1,1,1),M=new Wn(g.geometry,g.material,f);for(let _=0;_<f;_++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,_),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,_),c.SCALE&&v.fromBufferAttribute(c.SCALE,_),M.setMatrixAt(_,b.compose(m,p,v));for(const _ in c)if(_==="_COLOR_0"){const I=c[_];M.instanceColor=new Ga(I.array,I.itemSize,I.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&g.geometry.setAttribute(_,c[_]);nn.prototype.copy.call(M,g),this.parser.assignFinalMaterial(M),d.push(M)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const Rl="glTF",Fs=12,zc={JSON:1313821514,BIN:5130562};class Wg{constructor(e){this.name=Nt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Fs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Rl)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Fs,r=new DataView(e,Fs);let a=0;for(;a<i;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===zc.JSON){const l=new Uint8Array(e,Fs+a,o);this.content=n.decode(l)}else if(c===zc.BIN){const l=Fs+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Xg{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Nt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const u in a){const h=qa[u]||u.toLowerCase();o[h]=a[u]}for(const u in e.attributes){const h=qa[u]||u.toLowerCase();if(a[u]!==void 0){const f=n.accessors[e.attributes[u]],d=hs[f.componentType];l[h]=d.name,c[h]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,f){i.decodeDracoFile(u,function(d){for(const g in d.attributes){const b=d.attributes[g],m=c[g];m!==void 0&&(b.normalized=m)}h(d)},o,l,Cn,f)})})}}class jg{constructor(){this.name=Nt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class qg{constructor(){this.name=Nt.KHR_MESH_QUANTIZATION}}class Cl extends Xs{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=i-t,h=(n-t)/u,f=h*h,d=f*h,g=e*l,b=g-l,m=-2*d+3*f,p=d-f,v=1-m,M=p-f+h;for(let _=0;_!==o;_++){const I=a[b+_+o],R=a[b+_+c]*u,T=a[g+_+o],w=a[g+_]*u;r[_]=v*I+M*R+m*T+p*w}return r}}const Kg=new Tn;class Yg extends Cl{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return Kg.fromArray(r).normalize().toArray(r),r}}const Hn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},hs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Gc={9728:1003,9729:1006,9984:1004,9985:1007,9986:1005,9987:1008},Hc={33071:1001,33648:1002,10497:1e3},Na={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},qa={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ai={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Jg={CUBICSPLINE:void 0,LINEAR:2301,STEP:2300},Ua={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Zg(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Pi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),s.DefaultMaterial}function ki(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function mi(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Qg(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,u=e.length;l<u;l++){const h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];if(n){const f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):s.attributes.position;a.push(f)}if(i){const f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):s.attributes.normal;o.push(f)}if(r){const f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):s.attributes.color;c.push(f)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],f=l[2];return n&&(s.morphAttributes.position=u),i&&(s.morphAttributes.normal=h),r&&(s.morphAttributes.color=f),s.morphTargetsRelative=!0,s})}function $g(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function eb(s){let e;const t=s.extensions&&s.extensions[Nt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Oa(t.attributes):e=s.indices+":"+Oa(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+Oa(s.targets[n]);return e}function Oa(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Ka(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function tb(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const nb=new gt;class ib{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Tg,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new wl(this.options.manager):this.textureLoader=new Hm(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Al(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return ki(r,o,i),mi(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,u]of a.children.entries())r(u,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Nt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,a){n.load(Gs.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=Na[i.type],o=hs[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new jt(l,a,c))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=Na[i.type],l=hs[i.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let b,m;if(d&&d!==h){const p=Math.floor(f/d),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let M=t.cache.get(v);M||(b=new l(o,p*d,i.count*d/u),M=new hl(b,d/u),t.cache.add(v,M)),m=new Vs(M,c,f%d/u,g)}else o===null?b=new l(i.count*c):b=new l(o,f,i.count*c),m=new jt(b,c,g);if(i.sparse!==void 0){const p=Na.SCALAR,v=hs[i.sparse.indices.componentType],M=i.sparse.indices.byteOffset||0,_=i.sparse.values.byteOffset||0,I=new v(a[1],M,i.sparse.count*p),R=new l(a[2],_,i.sparse.count*c);o!==null&&(m=new jt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let T=0,w=I.length;T<w;T++){const y=I[T];if(m.setX(y,R[T*c]),c>=2&&m.setY(y,R[T*c+1]),c>=3&&m.setZ(y,R[T*c+2]),c>=4&&m.setW(y,R[T*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const f=(r.samplers||{})[a.sampler]||{};return u.magFilter=Gc[f.magFilter]||1006,u.minFilter=Gc[f.minFilter]||1008,u.wrapS=Hc[f.wrapS]||1e3,u.wrapT=Hc[f.wrapT]||1e3,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==1003&&u.minFilter!==1006,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=i.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(h){l=!0;const f=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(f),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(f,d){let g=f;t.isImageBitmapLoader===!0&&(g=function(b){const m=new fn(b);m.needsUpdate=!0,f(m)}),t.load(Gs.resolveURL(h,r.path),g,void 0,d)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),mi(h,a),h.userData.mimeType=a.mimeType||tb(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Nt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Nt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[Nt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new ml,Xn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new $a,Xn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Pi}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let a;const o={},c=r.extensions||{},l=[];if(c[Nt.KHR_MATERIALS_UNLIT]){const h=i[Nt.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,r,t))}else{const h=r.pbrMetallicRoughness||{};if(o.color=new rt(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const f=h.baseColorFactor;o.color.setRGB(f[0],f[1],f[2],Cn),o.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",h.baseColorTexture,Ht)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=2);const u=r.alphaMode||Ua.OPAQUE;if(u===Ua.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Ua.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==_n&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new De(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;o.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&a!==_n&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==_n){const h=r.emissiveFactor;o.emissive=new rt().setRGB(h[0],h[1],h[2],Cn)}return r.emissiveTexture!==void 0&&a!==_n&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Ht)),Promise.all(l).then(function(){const h=new a(o);return r.name&&(h.name=r.name),mi(h,r),t.associations.set(h,{materials:e}),r.extensions&&ki(i,h,r),h})}createUniqueName(e){const t=Xt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[Nt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Vc(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],u=eb(l),h=i[u];if(h)a.push(h.promise);else{let f;l.extensions&&l.extensions[Nt.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Vc(new Jt,l,t),i[u]={primitive:l,promise:f},a.push(f)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const u=a[c].material===void 0?Zg(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let d=0,g=u.length;d<g;d++){const b=u[d],m=a[d];let p;const v=l[d];if(m.mode===Hn.TRIANGLES||m.mode===Hn.TRIANGLE_STRIP||m.mode===Hn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new hm(b,v):new Je(b,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Hn.TRIANGLE_STRIP?p.geometry=Nc(p.geometry,1):m.mode===Hn.TRIANGLE_FAN&&(p.geometry=Nc(p.geometry,2));else if(m.mode===Hn.LINES)p=new dm(b,v);else if(m.mode===Hn.LINE_STRIP)p=new Hr(b,v);else if(m.mode===Hn.LINE_LOOP)p=new pm(b,v);else if(m.mode===Hn.POINTS)p=new mm(b,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&$g(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),mi(p,r),m.extensions&&ki(i,p,m),t.assignFinalMaterial(p),h.push(p)}for(let d=0,g=h.length;d<g;d++)t.associations.set(h[d],{meshes:e,primitives:d});if(h.length===1)return r.extensions&&ki(i,h[0],r),h[0];const f=new yt;r.extensions&&ki(i,f,r),t.associations.set(f,{meshes:e});for(let d=0,g=h.length;d<g;d++)f.add(h[d]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ln(ql.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new zr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),mi(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),a=i,o=[],c=[];for(let l=0,u=a.length;l<u;l++){const h=a[l];if(h){o.push(h);const f=new gt;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Qa(o,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let h=0,f=i.channels.length;h<f;h++){const d=i.channels[h],g=i.samplers[d.sampler],b=d.target,m=b.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,v=i.parameters!==void 0?i.parameters[g.output]:g.output;b.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",v)),l.push(g),u.push(b))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const f=h[0],d=h[1],g=h[2],b=h[3],m=h[4],p=[];for(let v=0,M=f.length;v<M;v++){const _=f[v],I=d[v],R=g[v],T=b[v],w=m[v];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();const y=n._createAnimationTracks(_,I,R,T,w);if(y)for(let x=0;x<y.length;x++)p.push(y[x])}return new Dm(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(f,nb)});for(let d=0,g=h.length;d<g;d++)u.add(h[d]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new dl:l.length>1?u=new yt:l.length===1?u=l[0]:u=new nn,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=a),mi(u,r),r.extensions&&ki(n,u,r),r.matrix!==void 0){const h=new gt;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new yt;n.name&&(r.name=i.createUniqueName(n.name)),mi(r,n),n.extensions&&ki(t,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);const l=u=>{const h=new Map;for(const[f,d]of i.associations)(f instanceof Xn||f instanceof fn)&&h.set(f,d);return u.traverse(f=>{const d=i.associations.get(f);d!=null&&h.set(f,d)}),h};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){const a=[],o=e.name?e.name:e.uuid,c=[];Ai[r.path]===Ai.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(o);let l;switch(Ai[r.path]){case Ai.weights:l=ds;break;case Ai.rotation:l=ps;break;case Ai.position:case Ai.scale:l=ms;break;default:switch(n.itemSize){case 1:l=ds;break;case 2:case 3:default:l=ms;break}break}const u=i.interpolation!==void 0?Jg[i.interpolation]:2301,h=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){const g=new l(c[f]+"."+Ai[r.path],t.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Ka(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ps?Yg:Cl;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function sb(s,e,t){const n=e.attributes,i=new En;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new F(c[0],c[1],c[2]),new F(l[0],l[1],l[2])),o.normalized){const u=Ka(hs[o.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new F,c=new F;for(let l=0,u=r.length;l<u;l++){const h=r[l];if(h.POSITION!==void 0){const f=t.json.accessors[h.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){const b=Ka(hs[f.componentType]);c.multiplyScalar(b)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;const a=new ii;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function Vc(s,e,t){const n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(const a in n){const o=qa[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){const a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return Ot.workingColorSpace!==Cn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ot.workingColorSpace}" not supported.`),mi(s,e),sb(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Qg(s,e.targets,t):s})}var rb=(function(){var s="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var i=WebAssembly.validate(t)?e:s,r,a=WebAssembly.instantiate(o(i),{}).then(function(p){r=p.instance,r.exports.__wasm_call_ctors()});function o(p){for(var v=new Uint8Array(p.length),M=0;M<p.length;++M){var _=p.charCodeAt(M);v[M]=_>96?_-97:_>64?_-39:_+4}for(var I=0,M=0;M<p.length;++M)v[I++]=v[M]<60?n[v[M]]:(v[M]-60)*64+v[++M];return v.buffer.slice(0,I)}function c(p,v,M,_,I,R){var T=r.exports.sbrk,w=M+3&-4,y=T(w*_),x=T(I.length),D=new Uint8Array(r.exports.memory.buffer);D.set(I,x);var k=p(y,M,_,x,I.length);if(k==0&&R&&R(y,w,_),v.set(D.subarray(y,y+M*_)),T(y-T(0)),k!=0)throw new Error("Malformed buffer data: "+k)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},u={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},h=[],f=0;function d(p){var v={object:new Worker(p),pending:0,requests:{}};return v.object.onmessage=function(M){var _=M.data;v.pending-=_.count,v.requests[_.id][_.action](_.value),delete v.requests[_.id]},v}function g(p){for(var v="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(o(i))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+c.toString()+m.toString(),M=new Blob([v],{type:"text/javascript"}),_=URL.createObjectURL(M),I=0;I<p;++I)h[I]=d(_);URL.revokeObjectURL(_)}function b(p,v,M,_,I){for(var R=h[0],T=1;T<h.length;++T)h[T].pending<R.pending&&(R=h[T]);return new Promise(function(w,y){var x=new Uint8Array(M),D=f++;R.pending+=p,R.requests[D]={resolve:w,reject:y},R.object.postMessage({id:D,count:p,size:v,source:x,mode:_,filter:I},[x.buffer])})}function m(p){a.then(function(){var v=p.data;try{var M=new Uint8Array(v.count*v.size);c(r.exports[v.mode],M,v.count,v.size,v.source,r.exports[v.filter]),self.postMessage({id:v.id,count:v.count,action:"resolve",value:M},[M.buffer])}catch(_){self.postMessage({id:v.id,count:v.count,action:"reject",value:_})}})}return{ready:a,supported:!0,useWorkers:function(p){g(p)},decodeVertexBuffer:function(p,v,M,_,I){c(r.exports.meshopt_decodeVertexBuffer,p,v,M,_,r.exports[l[I]])},decodeIndexBuffer:function(p,v,M,_){c(r.exports.meshopt_decodeIndexBuffer,p,v,M,_)},decodeIndexSequence:function(p,v,M,_){c(r.exports.meshopt_decodeIndexSequence,p,v,M,_)},decodeGltfBuffer:function(p,v,M,_,I,R){c(r.exports[u[I]],p,v,M,_,r.exports[l[R]])},decodeGltfBufferAsync:function(p,v,M,_,I){return h.length>0?b(p,v,M,u[_],l[I]):a.then(function(){var R=new Uint8Array(p*v);return c(r.exports[u[_]],R,p,v,M,r.exports[l[I]]),R})}}})();const Ba=1.69,Wc=160,ka=32,Xc="#fff1d6",jc="#fffaf0",qc="#b8ad94";function hb(s,e){let t;try{t=new om({canvas:s,antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch{return null}if(!t.getContext())return null;let n=0;const i=Tl,r=(E,L,C)=>{n=C-L};i.onStart=i.onProgress=r,t.outputColorSpace=Ht,t.shadowMap.enabled=!0,t.shadowMap.type=2;const a=new rt().setRGB(e.haze.colour[0]/255,e.haze.colour[1]/255,e.haze.colour[2]/255,Ht),o=new ac;o.background=a.clone();const c=Ic(),l=new yt;l.scale.y=Sn,o.add(l);const u=new Tc(jc,qc,1.55);o.add(u);const h=new Wa(Xc,2.1),f=e.sun.reach,d=new F(-e.sun.x*f,1/Sn,-e.sun.z*f).normalize();h.castShadow=!0,h.shadow.mapSize.set(2048,2048),h.shadow.bias=-4e-4,h.shadow.normalBias=.03,Object.assign(h.shadow.camera,{left:-44,right:44,top:44,bottom:-44,near:1,far:260}),o.add(h,h.target);const g={hazeColour:{value:a},hazeX:{value:new Bt(...e.haze.ramp.west,...e.haze.ramp.east)},hazeZ:{value:new Bt(...e.haze.ramp.north,...e.haze.ramp.south)}},b=new Map;function m(E,L={}){const C=E+JSON.stringify(L);if(b.has(C))return b.get(C);const B=p(E,L);return b.set(C,B),B}function p(E,L={}){return v(new Dn({color:E,...L}))}function v(E){return E.onBeforeCompile=L=>{Object.assign(L.uniforms,g),L.vertexShader=`varying vec3 vHazeWorld;
`+L.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        vec4 hazeLocal = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          hazeLocal = instanceMatrix * hazeLocal;
        #endif
        vHazeWorld = (modelMatrix * hazeLocal).xyz;`),L.fragmentShader=`varying vec3 vHazeWorld;
uniform vec3 hazeColour;
uniform vec4 hazeX;
uniform vec4 hazeZ;
`+L.fragmentShader.replace("#include <dithering_fragment>",`
        float hazeAmount = max(max(clamp((vHazeWorld.x - hazeX.x) / (hazeX.y - hazeX.x), 0.0, 1.0), clamp((vHazeWorld.x - hazeX.z) / (hazeX.w - hazeX.z), 0.0, 1.0)),
          max(clamp((vHazeWorld.z - hazeZ.x) / (hazeZ.y - hazeZ.x), 0.0, 1.0), clamp((vHazeWorld.z - hazeZ.z) / (hazeZ.w - hazeZ.z), 0.0, 1.0)));
        gl_FragColor.rgb = mix(gl_FragColor.rgb, hazeColour, hazeAmount);
        #include <dithering_fragment>`)},E.customProgramCacheKey=()=>"haze",E}const M={},_=new wl;function I(E){const L=(e.floorTextures||{})[E];return L?(M[E]||(M[E]=_.load(new URL(L.url,document.baseURI).href),M[E].colorSpace=Ht,M[E].wrapS=M[E].wrapT=1e3,M[E].anisotropy=8),{base:M[E],size:L.size}):null}function R(E,L){const C=I(L);if(!C)return E;const B=C.base.clone(),j=E.scale.x,ee=E.scale.z;return B.repeat.set(j/C.size,ee/C.size),B.offset.set((E.position.x-j/2)/C.size,-(E.position.z+ee/2)/C.size),E.material=p("#ffffff",{map:B}),E}const T=new Qt(1,1,1).translate(0,.5,0);function w(E,L,C,B,j,ee,he,me,{cast:ye=!0,receive:Se=!0,opts:ne}={}){const Ie=new Je(T,m(me,ne));return Ie.position.set(L,C,B),Ie.scale.set(j,ee,he),Ie.castShadow=ye,Ie.receiveShadow=Se,E.add(Ie),Ie}function y(E,L,C,B,j,ee,he,me,ye){return w(E,(L+C)/2,B,(ee+he)/2,Math.max(.001,C-L),Math.max(.001,j-B),Math.max(.001,he-ee),me,ye)}const x=new Eg().setMeshoptDecoder(rb),D=x.load.bind(x);x.load=(E,L,C,B)=>D(E,j=>{j.scene.userData.file=E.split("/").pop(),L(j)},C,B);function k(E,L,C,B,j,ee=l){x.load(e.modelBase+E,he=>{oe(he.scene);const me=new yt;me.add(he.scene),me.scale.set(Ba,Ba/Sn,Ba),me.position.set(L,C,B),ee.add(me),j&&j(he.scene,me),Vi(he.scene)},void 0,he=>console.warn("3D map: could not load "+E,he))}const z=[],Y=ab(l,e,{box:w,span:y,material:m,textured:R,lampStandIns:z});ob(l,e,{box:w,span:y,material:m,textured:R,model:k});const se=cb(o,l,e.transport,{box:w,material:m}),N=eg(l,e,{box:w,span:y,material:m,model:k}),Z=og(l,e,{box:w,span:y,material:m});hg(l,e,{span:y,model:k});let q=0;const ce=[],J=new Je(new ao(.86,1,48).rotateX(-Math.PI/2),new _n({color:"#e2c68a",transparent:!0,opacity:.85,depthWrite:!1}));J.renderOrder=2,l.add(J);const re=["#d8cfbd","#b8cdb2","#9cc4b8","#e2c68a"];function Ee(E){if(!ce[E]){const L=new yt,C=w(L,0,0,0,1,1,1,re[1]),B=w(L,0,1,0,1,.08,1,"#efe7d4");L.userData={body:C,top:B},l.add(L),ce[E]=L}return ce[E]}const ze={};function oe(E){E.traverse(L=>{if(!L.isMesh)return;L.castShadow=L.receiveShadow=!0;const C=L.material;C&&C.transmission>0&&(L.material=new Pi({color:C.color,roughness:.1,metalness:0,transparent:!0,opacity:.28,depthWrite:!1}),L.castShadow=!1)})}Z&&Z.loadModels(x,e.modelBase);const de={},_e=[],ge=[];(e.fixtures||[]).forEach(E=>{x.load(e.modelBase+E.file,L=>{oe(L.scene),(E.hide||[]).forEach(B=>{const j=L.scene.getObjectByName(B);j&&(j.visible=!1)}),E.glow&&L.scene.traverse(B=>{const j=B.isMesh&&B.material;j&&j.name===E.glow&&!_e.includes(j)&&(j.emissive.set("#ffe3b0"),_e.push(j))}),E.screen&&L.scene.traverse(B=>{const j=B.isMesh&&B.material;j&&j.name===E.screen&&!ge.includes(j)&&(j.emissive.set("#ffffff"),j.emissiveMap=j.map,j.needsUpdate=!0,ge.push(j))}),Vi(L.scene);const C=new yt;C.add(L.scene),C.scale.set(E.scale,E.scale/Sn,E.scale),C.position.set(E.x,E.y,E.z),C.visible=!1,l.add(C),de[E.key]=C},void 0,L=>console.warn("3D map: could not load "+E.file,L))});const He={};function Ne(E){const L=(e.stationModels||{})[E];!L||He[E]||(He[E]=!0,x.load(e.modelBase+L,C=>{const B=C.scene,j=new En().setFromObject(B),ee=j.getSize(new F),he=j.getCenter(new F),me=e.stationModelSize[E]||{w:ee.x+ee.z,ox:0},ye=me.w/((ee.x+ee.z)*Math.SQRT1_2);B.position.set(-he.x,-j.min.y,-he.z),oe(B),vg(B,+E.split(".")[0]),Vi(B);const Se=new yt;Se.add(B),Se.scale.set(ye,ye/Sn,ye),Se.position.set(me.ox*Math.SQRT1_2,0,-me.ox*Math.SQRT1_2),me.turn&&(Se.rotation.y=me.turn),ze[E]=Se},void 0,C=>console.warn("3D map: could not load "+L,C)))}const Ze={},et=Ic(),Ke=new ac;Ke.add(new Tc(jc,qc,1.7));const _t=new Wa(Xc,2.1);_t.position.copy(d).multiplyScalar(50),Ke.add(_t);function V(E){return Ze[E]?Ze[E]:ze[E]?Ze[E]=Tt(ze[E].clone(),480,600):(Ne(E),null)}function qt(E,L){E=Math.min(8,Math.max(1,E||1));const C="lounge."+E+"."+(L?2:1);if(Ze[C])return Ze[C];const B=Z&&Z.pictureCopy(E,L);return B?Ze[C]=Tt(B,600,480):null}function Et(E){if(Ze["fixture."+E])return Ze["fixture."+E];if(!de[E])return null;const L=de[E].clone();return L.visible=!0,Ze["fixture."+E]=Tt(L,600,480)}function Tt(E,L,C){const B=new yt;B.scale.y=Sn,B.add(E),Ke.add(B),B.updateMatrixWorld(!0);const j=new En().setFromObject(B),ee=[];for(let ue=0;ue<8;ue++)ee.push(new F(ue&1?j.max.x:j.min.x,ue&2?j.max.y:j.min.y,ue&4?j.max.z:j.min.z));et.updateMatrixWorld(!0);const he=et.matrixWorldInverse,me=[],ye=[];ee.forEach(ue=>{ue.applyMatrix4(he),me.push(ue.x),ye.push(ue.y)});const Se=(Math.min(...me)+Math.max(...me))/2,ne=(Math.min(...ye)+Math.max(...ye))/2,Ie=Math.max((Math.max(...me)-Math.min(...me))/2/L*C,(Math.max(...ye)-Math.min(...ye))/2)*1.04;et.left=Se-Ie*L/C,et.right=Se+Ie*L/C,et.top=ne+Ie,et.bottom=ne-Ie,et.updateProjectionMatrix();const Ve=new Ri(L,C,{samples:4});Ve.texture.colorSpace=Ht;const Oe=t.getClearColor(new rt),at=t.getClearAlpha(),dt=t.shadowMap.enabled;t.shadowMap.enabled=!1,t.setRenderTarget(Ve),t.setClearColor(0,0),t.clear(),t.render(Ke,et);const Ft=new Uint8Array(L*C*4);t.readRenderTargetPixels(Ve,0,0,L,C,Ft),t.setRenderTarget(null),t.setClearColor(Oe,at),t.shadowMap.enabled=dt,Ve.dispose(),Ke.remove(B);const Lt=document.createElement("canvas");Lt.width=L,Lt.height=C;const U=Lt.getContext("2d"),K=U.createImageData(L,C);for(let ue=0;ue<C;ue++)K.data.set(Ft.subarray((C-1-ue)*L*4,(C-ue)*L*4),ue*L*4);return U.putImageData(K,0,0),Lt}const ot=new so(.24,1.55,4,10).translate(0,1.03,0),xt=new Wn(ot,m("#ffffff",{name:"people"}),Wc);xt.castShadow=!0,xt.count=0;const Ye=new Map,P=[],S=new jt(new Uint16Array([0,1,2,0,2,3]),1),$=8e3;let pe=0,be=0;function le(E){let L=Ye.get(E);return L||(L=new fn(E),L.colorSpace=Ht,L.anisotropy=4,L.needsUpdate=!0,Ye.set(E,L)),L.userData.used=be,L}function $e(){be-pe<2e3||(pe=be,Ye.forEach((E,L)=>{be-E.userData.used>$&&(E.dispose(),Ye.delete(L))}))}const xe=[];function Be(E){if(!xe[E]){const L=new Jt;L.setAttribute("position",new jt(new Float32Array(12),3)),L.setAttribute("uv",new jt(new Float32Array(8),2)),L.setIndex(S);const C=new Je(L,v(new _n({alphaTest:.5,side:2,depthTest:!1,depthWrite:!1})));C.frustumCulled=!1,C.renderOrder=-1,l.add(C),xe[E]=C}return xe[E]}function At(E){if(!P[E]){const L=new Jt;L.setAttribute("position",new jt(new Float32Array(12),3)),L.setAttribute("uv",new jt(new Float32Array(8),2)),L.setIndex(S);const C=new Je(L,v(new _n({alphaTest:.5,side:2})));C.frustumCulled=!1,l.add(C),P[E]=C}return P[E]}const H=[],ke=[];function qe(E,L,C){const B=new Jt;B.setAttribute("position",new jt(new Float32Array(12),3)),B.setAttribute("uv",new jt(new Float32Array(8),2)),B.setIndex(S);const j={alphaTest:.5,side:2},ee=v(L?new Dn({...j,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}):new _n(j)),he=new Je(B,ee);return he.visible=!1,he.frustumCulled=!1,he.receiveShadow=L,l.add(he),_.load(new URL(E,document.baseURI).href,me=>{me.colorSpace=Ht,me.anisotropy=8;const[ye,Se]=C(me.image);B.attributes.position.array.set(ye),B.attributes.position.needsUpdate=!0,B.attributes.uv.array.set(Se),B.attributes.uv.needsUpdate=!0,B.computeVertexNormals(),ee.map=me,ee.needsUpdate=!0,he.userData.ready=!0},void 0,()=>console.warn("3D map: could not load "+E)),he}(e.wallFaces||[]).forEach(E=>{const L=qe(E.url,!1,()=>[[E.x0,E.y0,E.z0,E.x1,E.y0,E.z1,E.x1,E.y0+E.h,E.z1,E.x0,E.y0+E.h,E.z0],[0,0,1,0,1,1,0,1]]);L.userData.model=E.model,H.push(L)}),(e.decals||[]).forEach(E=>{const L=qe(E.url,!0,C=>{const B=E.pixels?E.image.map(([Ft,Lt])=>[Ft/C.naturalWidth,Lt/C.naturalHeight]):E.image,[j,ee,he]=B,[me,ye,Se]=E.world,ne=ee[0]-j[0],Ie=he[0]-j[0],Ve=ee[1]-j[1],Oe=he[1]-j[1],at=ne*Oe-Ie*Ve,dt=(Ft,Lt)=>{const U=Ft-j[0],K=Lt-j[1],ue=(Oe*U-Ie*K)/at,ve=(ne*K-Ve*U)/at;return[me[0]+(ye[0]-me[0])*ue+(Se[0]-me[0])*ve,.012,me[1]+(ye[1]-me[1])*ue+(Se[1]-me[1])*ve]};return[[...dt(0,1),...dt(1,1),...dt(1,0),...dt(0,0)],[0,0,1,0,1,1,0,1]]});L.userData.show=E.show,ke.push(L)}),(e.casters||[]).forEach(E=>w(l,E.x,0,E.z,E.w,E.h,E.d,"#ffffff",{receive:!1,opts:{name:"street"}}));const Qe=new yt;l.add(Qe);let Fe="";function St(E){Qe.children.forEach(C=>C.geometry.dispose()),Qe.clear();const L=new Set;E.forEach(C=>{const B=new no(C.points.map(ee=>new F(ee[0],ee[1],ee[2]))),j=new Je(new Ws(B,20,.045,8,!1),m(C.colour));j.castShadow=!0,Qe.add(j),[C.points[0],C.points[C.points.length-1]].forEach(ee=>{const he=ee[0].toFixed(2)+","+ee[2].toFixed(2);if(L.has(he))return;L.add(he);const me=new Je(T.clone(),m("#ffffff",{name:"street"}));me.position.set(ee[0],0,ee[2]),me.scale.set(.07,1,.07),me.castShadow=!0,Qe.add(me)})})}xt.instanceMatrix.setUsage(35048),l.add(xt);const pt=new Wn(T,m("#ffffff",{name:"street"}),ka),Ct=new Wn(T,m("#dfe8ea",{name:"street"}),ka);[pt,Ct].forEach(E=>{E.castShadow=!0,E.count=0,E.instanceMatrix.setUsage(35048),l.add(E)});const G=1.69,we=new F(0,0,1),ae=new Tn,fe={},Ce=[];Object.entries(e.carModels||{}).forEach(([E,L])=>x.load(e.modelBase+L,C=>{oe(C.scene),Vi(C.scene);const B=C.scene.getObjectByName("WheelFL");fe[E]={scene:C.scene,radius:B?new En().setFromObject(B).getSize(new F).y/2:.25}},void 0,C=>console.warn("3D map: could not load "+L,C)));const Ae=64,tt={},zt={},$t=new Set;function It(E){E.updateMatrixWorld(!0);const L=new Map;E.traverse(B=>{if(!B.isMesh)return;let j=B.geometry.index?B.geometry.toNonIndexed():B.geometry.clone();j.applyMatrix4(B.matrixWorld),B.matrixWorld.determinant()<0&&Object.values(j.attributes).forEach(ee=>{for(let he=0;he<ee.count;he+=3)for(let me=0;me<ee.itemSize;me++){const ye=ee.getComponent(he+1,me);ee.setComponent(he+1,me,ee.getComponent(he+2,me)),ee.setComponent(he+2,me,ye)}}),Object.keys(j.attributes).forEach(ee=>{ee!=="position"&&ee!=="normal"&&ee!=="uv"&&j.deleteAttribute(ee)}),j.attributes.normal||j.computeVertexNormals(),L.has(B.material)||L.set(B.material,[]),L.get(B.material).push(j)});const C=[...L].map(([B,j])=>{j.some(he=>!he.attributes.uv)&&j.forEach(he=>he.deleteAttribute("uv"));const ee=new Wn(ho(j),v(B),Ae);return ee.count=0,ee.castShadow=ee.receiveShadow=!0,ee.frustumCulled=!1,ee.userData.file=E.userData.file,ee.userData.prop=!0,l.add(ee),ee});return C.box=new En().setFromObject(E),C}function on(E){if(!zt[E]){zt[E]=!0;const[L,C]=E.split("#");x.load(e.modelBase+L,B=>{if(oe(B.scene),C==="low"||C==="lawn"){const j=[],ee=C==="low"?/^(Crown|Trunk)/:/^Pit/;B.scene.traverse(he=>{ee.test(he.name)&&j.push(he)}),j.forEach(he=>he.parent&&he.parent.remove(he))}B.scene.traverse(j=>{j.isMesh&&(j.material.name==="LampGlow"&&$t.add(j.material),j.material.metalness>.5&&(j.material.metalness=.35,j.material.roughness=Math.max(.35,j.material.roughness)))}),tt[E]=It(B.scene)},void 0,B=>console.warn("3D map: could not load "+E,B))}return!!tt[E]}const cn=new F(G,G/Sn,G),Ut=new Tn,xn=new F(0,1,0),ln=new F;function ut(E,L){Object.values(tt).forEach(C=>C.forEach(B=>{B.count=0})),(E||[]).forEach(C=>{const B=tt[C.file];if(!(!B||B[0].count>=Ae)){if(Ut.setFromAxisAngle(xn,C.rot||0),hn.set(C.x,C.y===void 0?e.plazaY:C.y,C.z),Array.isArray(C.scale))rn.compose(hn,Ut,ln.set(cn.x*C.scale[0],cn.y*C.scale[1],cn.z*C.scale[2]));else if(C.scale)rn.compose(hn,Ut,ln.copy(cn).multiplyScalar(C.scale));else if(C.fit){const j=B.box,ee=C.fit.w/(j.max.x-j.min.x),he=C.fit.d/(j.max.z-j.min.z);hn.x-=(j.min.x+j.max.x)/2*ee,hn.z-=(j.min.z+j.max.z)/2*he,rn.compose(hn,Ut,ln.set(ee,ee/Sn,he))}else rn.compose(hn,Ut,cn);B.forEach(j=>j.setMatrixAt(j.count++,rn))}}),Object.values(tt).forEach(C=>C.forEach(B=>{B.instanceMatrix.needsUpdate=!0,B.visible=B.count>0})),$t.forEach(C=>{C.emissive.set("#ffd9a0"),C.emissiveIntensity=L*2.5})}const vn=()=>!!e.carModels&&Object.keys(e.carModels).every(E=>fe[E]);function Qn(E,L){const C=L.van?"van":"car",B=fe[C];let j=Ce[E];if(j&&j.kind===C&&j.paint===L.paint)return j;j&&l.remove(j.holder);const ee=new yt,he=B.scene.clone(!0);he.traverse(ye=>{ye.isMesh&&/Paint$/.test(ye.material.name)&&(ye.material=ye.material.clone(),ye.material.color.set(L.paint))}),ee.add(he),ee.scale.set(G,G/Sn,G),l.add(ee);const me=["WheelFL","WheelFR","WheelBL","WheelBR"].map(ye=>he.getObjectByName(ye)).filter(Boolean).map(ye=>({w:ye,rest:ye.quaternion.clone()}));return Ce[E]={kind:C,paint:L.paint,holder:ee,wheels:me,radius:B.radius}}const rn=new gt,hn=new F,Vt=new F,In=new Tn,zn=new rt,We=u.intensity,$n=h.intensity,en=new rt("#2b3a48"),A=a.clone();let O=!1;s.addEventListener("webglcontextlost",E=>{E.preventDefault(),O=!0}),s.addEventListener("webglcontextrestored",()=>{O=!1});let ie=1;const X=(E,L)=>{const C=L.geometry,B=C.attributes.position,j=C.attributes.uv,[ee,he,me,ye]=E.uv;B.array.set(E.points),B.needsUpdate=!0,j.array.set([ee,he,me,he,me,ye,ee,ye]),j.needsUpdate=!0;const Se=L.material,ne=le(E.img),Ie=E.alpha<1;Se.map!==ne&&(Se.map||(Se.needsUpdate=!0),Se.map=ne),Se.transparent!==Ie&&(Se.transparent=Ie,Se.needsUpdate=!0),Se.opacity=E.alpha,Se.color.setScalar(ie),L.visible=!0};function W(E,L){ie=1-L*.55,E.forEach((C,B)=>X(C,At(B)));for(let C=E.length;C<P.length;C++)P[C].visible=!1}function Me(E,L){be=performance.now(),$e();const C=Math.min(E.dpr,2);t.getPixelRatio()!==C&&t.setPixelRatio(C);const B=t.getSize(new De);(B.x!==E.width||B.y!==E.height)&&t.setSize(E.width,E.height,!1),tg(c,E);const j=E.lookAt||{x:0,z:0};h.target.position.set(j.x,0,j.z),h.position.copy(h.target.position).addScaledVector(d,120),h.target.updateMatrixWorld();const ee=E.night||0;return u.intensity=We*(1-ee*.72),h.intensity=$n*(1-ee*.9),o.background.copy(L).lerp(en,ee),g.hazeColour.value.copy(o.background),ee}const Re=pg(l),Xe=[],Pe=new rt,ft={},nt=[g.hazeX.value.clone(),g.hazeZ.value.clone()];let Te=!1,it=null;function Mt(E){if(E!==Te){if(Te=E,E){const L=new Set([l,u,h,h.target,Re.group,...P]);[...o.children,...l.children].forEach(C=>{!L.has(C)&&!C.userData.prop&&!C.userData.land&&C.visible&&(C.visible=!1,Xe.push(C))}),xe.forEach(C=>{C.visible=!1})}else Xe.forEach(L=>{L.visible=!0}),Xe.length=0,it&&(it.visible=!1),it=null,g.hazeX.value.copy(nt[0]),g.hazeZ.value.copy(nt[1]);Re.group.visible=E}}const Gt=90,Kt=2,bt=13;function Ge(E,[L,C,B,j]){const ee=[];return E.forEach(([he,me,ye,Se])=>{if(L>=me||C<=he||B>=Se||j<=ye){ee.push([he,me,ye,Se]);return}B>ye&&ee.push([he,me,ye,B]),j<Se&&ee.push([he,me,j,Se]);const ne=Math.max(ye,B),Ie=Math.min(Se,j);L>he&&ee.push([he,L,ne,Ie]),C<me&&ee.push([C,me,ne,Ie])}),ee}function gn(E){const L=new yt,[C,B,j,ee]=E.plot,he=(C+B)/2,me=(j+ee)/2,ye=Gt;L.userData.land=!0;let Se=Ge([[he-ye,he+ye,me-ye,me+ye]],E.plot);const ne=E.strips||[],Ie=ne.map(Oe=>[Oe.x0===void 0?he-ye:Oe.x0,Oe.x1===void 0?he+ye:Oe.x1,Oe.z0===void 0?me-ye:Oe.z0,Oe.z1===void 0?me+ye:Oe.z1]);Ie.forEach(Oe=>{Se=Ge(Se,Oe)}),Se.forEach(([Oe,at,dt,Ft])=>y(L,Oe,at,E.y-1.2,E.y,dt,Ft,E.colour,{cast:!1})),ne.forEach((Oe,at)=>Ge([Ie[at]],E.plot).forEach(([dt,Ft,Lt,U])=>y(L,dt,Ft,E.y-1.2,Oe.y,Lt,U,Oe.colour,{cast:!1})));const Ve=[];if(E.trees){let Oe=7;const at=()=>(Oe=Oe*16807%2147483647)/2147483647;for(let dt=0;dt<64;dt++){const Ft=dt%4,Lt=Ft===1||Ft===3,U=at(),K=Lt?7.5+at()*4:2+at()*8,ue=Ft===0?C-K:Ft===1?B+K:C-8+U*(B-C+16),ve=Ft===2?j-K:Ft===3?ee+K:j-8+U*(ee-j+16);ue>C-1.5&&ue<B+1.5&&ve>j-1.5&&ve<ee+1.5||ue>B&&ve>ee-4||ve>ee&&ue>B-4||Ie.some(([st,mt,ct,je])=>ue>st-1.6&&ue<mt+1.6&&ve>ct-1.6&&ve<je+1.6)||Ve.push({file:dt%3?"tree.glb#lawn":"street_tree.glb#lawn",x:ue,y:E.y,z:ve,rot:at()*6.28,scale:(Lt?.6:.75)+at()*.35})}}if(E.town){const Oe=["building_rowhouse_terracotta","building_townhouse_sage","building_low_stone","building_mid_stone","building_apartment_brick","building_shop_narrow","building_low_tan","building_corner"];let at=0;for(let dt=C+4;dt<B+4;dt+=10.5)Ve.push({file:Oe[at++%Oe.length]+".glb",x:dt,y:E.y,z:j-6.5,rot:0});for(let dt=j+2;dt<ee+2;dt+=10.5)Ve.push({file:Oe[at++%Oe.length]+".glb",x:C-6.5,y:E.y,z:dt,rot:Math.PI/2});Ve.push({file:"building_corner.glb",x:C-6.5,y:E.y,z:j-6.5,rot:Math.PI/4})}return L.userData.props=Ve,L.userData.haze=[new Bt(C-Kt,C-bt,B+Kt,B+bt),new Bt(j-Kt,j-bt,ee+Kt,ee+bt)],l.add(L),L}function wt(E){if(O)return!1;Mt(!0);const L=E.land?ft[E.landKey]||(ft[E.landKey]=gn(E.land)):null;L!==it&&(it&&(it.visible=!1),it=L,it&&(it.visible=!0,g.hazeX.value.copy(it.userData.haze[0]),g.hazeZ.value.copy(it.userData.haze[1])));const C=Me(E,it?A:Pe.set(E.background));Re.update(E.branch,C);const B=(E.branch.props||[]).concat(it?it.userData.props:[]);return B.forEach(j=>on(j.file)),ut(B,C),W(E.figures||[],C),E.dry||t.render(o,c),!0}function te(E){if(O)return!1;Mt(!1);const L=Me(E,A),C=performance.now(),B=Math.min(.1,(C-(q||C))/1e3);q=C;let j=!1;E.stations.forEach((ne,Ie)=>{const Ve=Ee(Ie),{body:Oe,top:at}=Ve.userData;if(Ve.visible=ne.visible!==!1,!Ve.visible)return;const dt=ne.index+"."+Math.max(1,ne.tier);ne.built&&(Ne(dt),Ne(ne.index+".3"));const Ft=ze[dt]?dt:ne.index+".3",Lt=ne.built&&ne.index!==void 0&&ze[Ft],U=Ve.userData.clones||(Ve.userData.clones={}),K=Ve.userData.rigs||(Ve.userData.rigs={});Lt&&!U[Ft]&&(Ve.add(U[Ft]=Lt.clone()),K[Ft]=Mg(U[Ft],ne.index)),Lt&&K[Ft]&&Sg(K[Ft],ne,B),Object.entries(U).forEach(([st,mt])=>{mt.visible=!!Lt&&st===Ft}),Oe.visible=!Lt;const ue=ne.built?ne.h:.12,ve=ne.rise?-ne.rise*ne.rise*1.1:0;if(Ve.position.set(ne.x,ne.y+ve,ne.z),Oe.scale.set(ne.w,ue,ne.d),at.visible=ne.built&&!Lt,at.position.y=ue,at.scale.set(ne.w+.12,.08,ne.d+.12),Oe.material=m(ne.built?re[Math.min(3,ne.tier)]:"#e3b04b"),ne.selected&&!j){j=!0,J.position.set(ne.x,ne.y+.03,ne.z);const st=Math.max(ne.w,ne.d)*.72;J.scale.set(st,1,st)}}),J.visible=j;const ee=E.figures||[],he=1-L*.55;W(ee,L),H.forEach(ne=>{ne.visible=!!ne.userData.ready&&!(ne.userData.model&&de[ne.userData.model]),ne.material.color.setScalar(he)}),ke.forEach(ne=>{ne.visible=ne.userData.ready&&(ne.userData.show!=="loungeOpen"||!!E.loungeOpen)});const me=JSON.stringify(E.ropes||[]);me!==Fe&&(Fe=me,St(E.ropes||[]));const ye=E.backdrops||[];ye.forEach((ne,Ie)=>X(ne,Be(Ie)));for(let ne=ye.length;ne<xe.length;ne++)xe[ne].visible=!1;Y.forEach(ne=>{ne.visible=!tt[ne.userData.model],ne.renderOrder=E.backdrops?-2:0,ne.material.colorWrite=!E.backdrops}),xt.material.colorWrite=xt.material.depthWrite=!E.figures,b.forEach((ne,Ie)=>{Ie.endsWith('{"name":"street"}')&&(ne.colorWrite=ne.depthWrite=!E.figures)}),xt.count=Math.min(Wc,E.people.length);for(let ne=0;ne<xt.count;ne++){const Ie=E.people[ne];hn.set(Ie.x,Ie.y||0,Ie.z),Vt.set(1,1,1),rn.compose(hn,In.identity(),Vt),xt.setMatrixAt(ne,rn),xt.setColorAt(ne,zn.set(Ie.colour))}xt.instanceMatrix.needsUpdate=!0,xt.instanceColor&&(xt.instanceColor.needsUpdate=!0),ut(E.props,L),_e.forEach(ne=>{ne.emissiveIntensity=.16+L*.7}),ge.forEach(ne=>{ne.emissiveIntensity=.35+L*.55}),z.forEach(ne=>{ne.visible=!tt["street_lamp.glb"]});const Se=vn();E.cars.forEach((ne,Ie)=>{if(!Se)return;const Ve=Qn(Ie,ne),Oe=ne.along==="x";Ve.holder.visible=!0,Ve.holder.position.set(ne.x,e.streetY,ne.z),Ve.holder.rotation.y=Oe?ne.dir>0?0:Math.PI:ne.dir>0?-Math.PI/2:Math.PI/2,ae.setFromAxisAngle(we,-ne.roll/(Ve.radius*G)),Ve.wheels.forEach(({w:at,rest:dt})=>at.quaternion.multiplyQuaternions(ae,dt))});for(let ne=Se?E.cars.length:0;ne<Ce.length;ne++)Ce[ne]&&(Ce[ne].holder.visible=!1);pt.count=Ct.count=Se?0:Math.min(ka,E.cars.length);for(let ne=0;ne<pt.count;ne++){const Ie=E.cars[ne],Ve=Ie.along==="x",Oe=Ie.van,at=Oe?4.6:4,dt=1.8;hn.set(Ie.x,e.streetY+.25,Ie.z),Vt.set(Ve?at:dt,Oe?1.7:.75,Ve?dt:at),pt.setMatrixAt(ne,rn.compose(hn,In.identity(),Vt)),pt.setColorAt(ne,zn.set(Ie.paint)),hn.y+=Oe?1.7:.75,Vt.set(Ve?Oe?1.4:2.1:dt*.86,Oe?.05:.55,Ve?dt*.86:Oe?1.4:2.1),Ct.setMatrixAt(ne,rn.compose(hn,In.identity(),Vt))}return[pt,Ct].forEach(ne=>{ne.instanceMatrix.needsUpdate=!0,ne.instanceColor&&(ne.instanceColor.needsUpdate=!0)}),se&&E.cargo&&se.update(E.cargo,E.fixtures),N&&N.update(E),Z&&Z.update(E),Object.entries(de).forEach(([ne,Ie])=>{Ie.visible=!!(E.fixtures&&E.fixtures[ne])}),E.dry||t.render(o,c),!0}function Q(E){const L=t.info,C=new Set,B=new Set,j={};let ee=0,he=0;o.traverse(at=>{if(!at.isMesh)return;ee++;let dt=!0,Ft=null;for(let Lt=at;Lt;Lt=Lt.parent)Lt.visible||(dt=!1),!Ft&&Lt.userData.file&&(Ft=Lt.userData.file);if(dt&&(he++,E)){const Lt=j[Ft||"(code)"]=j[Ft||"(code)"]||{meshes:0,triangles:0},U=at.geometry;Lt.meshes++,Lt.triangles+=(U.index?U.index.count:U.attributes.position.count)/3*(at.isInstancedMesh?at.count:1)}C.add(at.geometry),(Array.isArray(at.material)?at.material:[at.material]).forEach(Lt=>{for(const U in Lt)Lt[U]&&Lt[U].isTexture&&B.add(Lt[U].source)})});let me=0,ye=0;C.forEach(at=>{Object.values(at.attributes).forEach(dt=>{me+=dt.array.byteLength}),at.index&&(me+=at.index.array.byteLength)}),o.traverse(at=>{at.isInstancedMesh&&(me+=at.instanceMatrix.array.byteLength+(at.instanceColor?at.instanceColor.array.byteLength:0))}),B.forEach(at=>{const dt=at.data;dt&&dt.width&&(ye+=dt.width*dt.height*4*4/3)});const Se=t.getDrawingBufferSize(new De),ne=h.shadow.mapSize,Ie=Se.x*Se.y*4*(t.getContext().getContextAttributes().antialias?9:2),Ve=t.shadowMap.enabled?ne.x*ne.y*8:0,Oe=at=>Math.round(at/1048576*10)/10;return{calls:L.render.calls,triangles:L.render.triangles,meshes:ee,visible:he,programs:L.programs?L.programs.length:0,geometries:L.memory.geometries,textures:L.memory.textures,pixelRatio:t.getPixelRatio(),buffer:Se.x+"x"+Se.y,mb:{geometry:Oe(me),texture:Oe(ye),buffer:Oe(Ie),shadow:Oe(Ve),total:Oe(me+ye+Ie+Ve)},...E?{models:j}:{}}}return{render:te,renderBranch:wt,carsModelled:vn,propReady:on,hasFixture:E=>!!de[E],stationPicture:V,loungePicture:qt,fixturePicture:Et,stats:Q,get ok(){return!O},get loading(){return n},dispose(){t.dispose(),b.forEach(E=>E.dispose())}}}function ab(s,e,{box:t,span:n,material:i,textured:r,lampStandIns:a}){const{roads:o,roadWidth:c,plazaY:l,streetY:u,extent:h}=e,f=e.holes||[],d=(w,y,x,D,k,z,Y,se)=>{let N=[[w,y,k,z]];f.forEach(Z=>{N=N.flatMap(([q,ce,J,re])=>{if(Z.x0>=ce||Z.x1<=q||Z.z0>=re||Z.z1<=J)return[[q,ce,J,re]];const Ee=Math.max(q,Z.x0),ze=Math.min(ce,Z.x1);return[[q,Ee,J,re],[ze,ce,J,re],[Ee,ze,J,Math.max(J,Z.z0)],[Ee,ze,Math.min(re,Z.z1),re]].filter(([oe,de,_e,ge])=>de-oe>1e-6&&ge-_e>1e-6)})}),N.forEach(([Z,q,ce,J])=>r(n(s,Z,q,x,D,ce,J,Y,{cast:!1}),se))};d(-h,h,u-.4,u,-h,h,e.colours.asphalt,"asphalt");const g=w=>{const y=o.filter(k=>k.along===w).map(k=>k.at).sort((k,z)=>k-z),x=[];let D=-h;return y.forEach(k=>{x.push([D,k-c/2]),D=k+c/2}),x.push([D,h]),x},b=g("x");g("z").forEach(([w,y])=>b.forEach(([x,D])=>d(w,y,u,l,x,D,e.colours.paver,"sidewalk")));const p={};(e.marks||[]).forEach(w=>(p[w.colour]=p[w.colour]||[]).push(w));const v=new gt,M=new F,_=new F,I=new Tn;Object.entries(p).forEach(([w,y])=>{const x=/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/.exec(w),D=x?i("#"+[1,2,3].map(z=>(+x[z]).toString(16).padStart(2,"0")).join(""),{transparent:!0,opacity:+x[4],depthWrite:!1}):i(w),k=new Wn(new Qt(1,1,1).translate(0,.5,0),D,y.length);y.forEach((z,Y)=>k.setMatrixAt(Y,v.compose(M.set((z.x0+z.x1)/2,z.y-.004,(z.z0+z.z1)/2),I,_.set(z.x1-z.x0,.012,z.z1-z.z0)))),k.receiveShadow=!0,s.add(k)});const R=[];e.buildings.forEach(w=>{const y=n(s,w.x0,w.x1,l,w.h,w.z0,w.z1,w.wall,{opts:{name:"terrace"}}),x=n(s,w.x0-.15,w.x1+.15,w.h,w.h+.35,w.z0-.15,w.z1+.15,w.roof,{opts:{name:"terrace"}});y.userData.model=x.userData.model=w.model,R.push(y,x)});const T=new On(1.6,1);return e.trees.forEach(([w,y])=>{t(s,w,l,y,.35,2.2,.35,"#7a5a3e",{opts:{name:"street"}});const x=new Je(T,i("#7fa35a",{name:"street"}));x.position.set(w,l+3.6,y),x.scale.set(1,.8,1),x.castShadow=x.receiveShadow=!0,s.add(x)}),e.lamps.forEach(([w,y])=>{a.push(t(s,w,l,y,.18,4.4,.18,"#3b4a43",{opts:{name:"street"}})),a.push(t(s,w,l+4.3,y,.5,.3,.5,"#f1e3b6",{opts:{name:"street"}}))}),R}function ob(s,e,{box:t,span:n,material:i,textured:r,model:a}){const o=new yt;s.add(o),e.floors.forEach((b,m)=>{const p=(b.x||0)-b.w/2,v=(b.x||0)+b.w/2,M=b.z-b.d/2,_=b.z+b.d/2;r(n(o,p,v,b.y-(m?.32:.02),b.y,M,_,m===2?"#e9e4d8":m?"#e4ddcc":"#c9965f",{cast:m>0}),["herringbone","timber","concrete"][m]),m&&(n(o,p,v,b.y,b.y+1.05,_-.06,_,"#c9a35a",{opts:{transparent:!0,opacity:.55}}),(m===1?[p+.3,v-.3]:[p+.3,0,v-.3]).forEach(I=>t(o,I,e.floors[m-1].y,_-.3,.3,b.y-e.floors[m-1].y-.32,.3,"#33372f")))});const c=(b,m,p,v,M,_,I,R,T,w)=>{const y=[];for(let D=0;D<=48;D++){const k=D/48,z=M+(_-M)*k;y.push(new F(m+Math.cos(z)*v,(I+(R-I)*k)*Sn,p+Math.sin(z)*v))}const x=new Je(new Ws(new no(y),96,T,8,!1),i(w));x.castShadow=!0,b.add(x)},l=(b,m,p,v,M,_)=>{const I=new yt,R=new yt;R.scale.y=1/Sn,I.add(R),o.add(I),a("spiral_stair.glb",b,p,m,()=>{I.visible=!1});const T=1.15,w=Math.PI*24/180,y=(v-p)/M,x=Y=>_+(M-1-Y)*w;t(I,b,p,m,.26,v-p+1,.26,"#1f5a3c"),t(I,b,p,m,.56,.06,.56,"#d0a54e",{cast:!1});const D=new Je(new gi(.13,16,10),i("#d0a54e"));D.position.set(b,v+1.05,m),D.castShadow=!0,I.add(D);for(let Y=0;Y<M-1;Y++){const se=x(Y),N=p+y*(Y+1),Z=w*1.04,q=new Je(new tn(T,T,.08,6,1,!1,Math.PI/2-se-Z/2,Z),i("#d9a768"));q.position.set(b,N-.04,m),q.castShadow=q.receiveShadow=!0,I.add(q);const ce=se-w/2;t(I,b+Math.cos(ce)*(T-.06),N,m+Math.sin(ce)*(T-.06),.05,.95,.05,"#1f5a3c",{cast:!1})}const k=x(0)+w/2,z=x(M-2)-w/2;c(R,b,m,T-.06,k,z,p+1,v-y+1,.05,"#d0a54e"),c(R,b,m,T-.02,k,z,p+y-.14,v-.14,.09,"#1f5a3c")},[,u,h]=e.floors,f=-Math.PI/2,d=(b,m,p,v,M)=>n(o,b,m,M,M+1.05,p,v,"#c9a35a",{opts:{transparent:!0,opacity:.55}});l(10.2,.35,0,u.y,14,f),r(n(o,8.93,11.35,u.y-.32,u.y,-2.8,-.8,"#e4ddcc",{cast:!0}),"timber"),d(11.29,11.35,-2.8,-.8,u.y),l(7.75,-4.4,u.y,h.y,14,f),r(n(o,6.45,9,h.y-.32,h.y,-6.9,-5.55,"#e9e4d8",{cast:!0}),"concrete"),d(8.94,9,-6.9,-5.55,h.y);const g=e.marquee;e.wallFaces||(n(o,g.x-.13,g.x+.13,0,.9,g.zRear,g.zFront,"#1f6b47"),n(o,g.x-.04,g.x+.04,.9,g.y0,g.zRear,g.zFront,"#cfe3dc",{cast:!1,opts:{transparent:!0,opacity:.35}}),n(o,g.x-.16,g.x+.16,g.y0,g.y1,g.zRear,g.zFront,"#1f6b47"),[g.zRear,g.zFront].forEach(b=>t(o,g.x,0,b,.34,g.y1,.34,"#174f36")))}function cb(s,e,t,{box:n,material:i}){if(!t)return null;const r=Sn,a=t.bore/2,o=new Pi({color:"#cfeee2",emissive:"#2f5a4a",emissiveIntensity:.25,roughness:.08,metalness:0,transparent:!0,opacity:.46,depthWrite:!1}),c=new Pi({color:"#d0a54e",roughness:.3,metalness:.9}),l=(T,w,y)=>T.map((x,D)=>x+(w[D]-x)*y);function u(T){const w=[T[0]],y=.48;for(let x=1;x<T.length-1;x++){const D=T[x-1],k=T[x],z=T[x+1],Y=l(k,D,Math.min(.4,y/Math.hypot(...D.map((N,Z)=>N-k[Z])))),se=l(k,z,Math.min(.4,y/Math.hypot(...z.map((N,Z)=>N-k[Z]))));w.push(Y);for(let N=1;N<=8;N++){const Z=N/8;w.push(Y.map((q,ce)=>(1-Z)*(1-Z)*q+2*(1-Z)*Z*k[ce]+Z*Z*se[ce]))}}return w.push(T[T.length-1]),w}const h=T=>new F(T[0],T[1]*r,T[2]),f=(T,w,y,x,D)=>{const k=new Je(new Wr(y,x,10,32),D);return k.position.copy(h(T)),k.lookAt(k.position.clone().add(w)),k.castShadow=!0,s.add(k),k},d=t.tubes.map(T=>{const w=u(T.points),y=new yl;for(let se=1;se<w.length;se++)y.add(new _l(h(w[se-1]),h(w[se])));const x=new Je(new Ws(y,Math.max(24,w.length*3),a,18,!1),o);x.renderOrder=3,s.add(x);const D=[x];[[T.points[0],T.points[1]],[T.points[T.points.length-1],T.points[T.points.length-2]]].forEach(([se,N],Z)=>{Z===0&&T.noCap0||D.push(f(se,h(se).sub(h(N)).normalize(),a+.02,.07,c))}),(T.floorRings||[]).forEach(se=>D.push(f(se,new F(0,1,0),a+.1,.08,c)));const z=[];let Y=0;for(let se=1;se<w.length;se++){const N=Math.hypot(w[se][0]-w[se-1][0],w[se][1]-w[se-1][1],w[se][2]-w[se-1][2]);z.push({a:w[se-1],b:w[se],len:N}),Y+=N}return{tube:T,segments:z,total:Y,parts:D}}),g=t.belts.map(T=>{const w=Math.abs(T.x2-T.x1),y=(T.x1+T.x2)/2;return[T.x1,T.x2].forEach(x=>n(e,x-Math.sign(T.x2-T.x1)*.25*(x===T.x1?-1:1),T.floor,T.z,.12,T.height-.1,.5,"#344a40")),n(e,y,T.floor+T.height-.18,T.z,w,.16,T.width,"#536c5b"),n(e,y,T.floor+T.height-.02,T.z,w-.1,.04,T.width-.2,"#2a4035",{cast:!1}),T}),b=lb(),m=b.map(T=>{const w=new Wn(T.geometry,new Dn({vertexColors:!0}),32);return w.castShadow=!0,w.count=0,w.renderOrder=2,w.frustumCulled=!1,w.instanceMatrix.setUsage(35048),s.add(w),w}),p=new gt,v=new Tn,M=new F(0,1,0),_=new F,I=new F(1,1,1);function R(T,w,y,x,D){const k=Math.min(x,b.length-1),z=m[k];z.count>=32||(v.setFromAxisAngle(M,D),z.setMatrixAt(z.count++,p.compose(_.set(T,w*r,y),v,I)))}return{update({odo:T,running:w},y={}){m.forEach(x=>{x.count=0}),d.forEach(({tube:x,segments:D,total:k,parts:z})=>{const Y=!x.fixture||!!y[x.fixture];if(z.forEach(J=>{J.visible=Y}),!Y)return;const se=x.window?x.window.total:k,N=x.window?x.window.offset:0,Z=Math.max(2,Math.round(se/t.gap)),q=se/Z,ce=w[x.stage]?T:0;for(let J=0;J<Z;J++){let re=(ce+J*q)%se-N;if(!(re<0||re>=k))for(const Ee of D){if(re>Ee.len){re-=Ee.len;continue}const ze=l(Ee.a,Ee.b,re/Ee.len);R(ze[0],ze[1]-b[x.cargoStage].height/2/r,ze[2],x.cargoStage,J*2.1);break}}}),g.forEach(x=>{const D=Math.abs(x.x2-x.x1),k=Math.max(2,Math.round(D/t.gap)),z=w[x.stage]?T:0,Y=Math.sign(x.x2-x.x1);for(let se=0;se<k;se++)R(x.x1+Y*((z+se*D/k)%D),x.floor+x.height+.02,x.z,x.stage,se*2.1)}),m.forEach(x=>{x.instanceMatrix.needsUpdate=!0})}}}function lb(){const s=[],e=(a,o,c=0,l=0,u=0,{sx:h=1,sy:f=1,sz:d=1,rx:g=0,ry:b=0,rz:m=0}={})=>{const p=a.index?a.toNonIndexed():a;p.deleteAttribute("uv"),p.scale(h,f,d),p.rotateX(g),p.rotateZ(m),p.rotateY(b),p.translate(c,l,u);const v=new rt(o),M=p.attributes.position.count,_=new Float32Array(M*3);for(let I=0;I<M;I++)_[I*3]=v.r,_[I*3+1]=v.g,_[I*3+2]=v.b;p.setAttribute("color",new jt(_,3)),s.push(p)},t=()=>{const a=ho(s.splice(0));return a.computeBoundingBox(),{geometry:a,height:a.boundingBox.max.y}},n=(a,o,c,l,u,h=.5)=>e(new gi(1,7,4),a,Math.cos(o)*c,l,-Math.sin(o)*c,{sx:u,sy:u*.16,sz:u*.38,rz:h,ry:o}),i=(a,o)=>{e(new tn(a,a*.78,o,12),"#b8673f",0,o/2),e(new tn(a*1.08,a*1.08,o*.18,12),"#c97a50",0,o*.91),e(new tn(a*.92,a*.92,.012,12),"#4a3424",0,o*.97)},r=[];return i(.1,.13),e(new tn(.012,.014,.14,5),"#5b8a3c",0,.2),[[0,.22],[Math.PI,.23],[Math.PI/2,.28],[-Math.PI/2,.29]].forEach(([a,o],c)=>n(c<2?"#7fb552":"#a6d073",a,.06,o,.065)),r.push(t()),i(.12,.15),e(new tn(.016,.02,.34,6),"#4f7a35",0,.32),[.24,.32,.4].forEach((a,o)=>{for(let c=0;c<5;c++){const l=c*1.257+o*.6,u=.1-o*.02;n(o%2?"#4f8a3a":"#3f7a33",l,u,a,.1-o*.015,.35)}}),[[0,.47,0,.07],[.07,.4,.03,.05],[-.06,.41,-.04,.05]].forEach(([a,o,c,l])=>{e(new On(l,1),"#9fc06c",a,o,c,{sy:1.7}),e(new On(l*.45,0),"#d99a55",a+l*.4,o+l*.5,c+l*.3)}),r.push(t()),e(new Qt(.42,.03,.3),"#c9a46a",0,.015),[[-.1,.04,"#86a85c"],[.1,-.03,"#7a9c52"],[0,.02,"#93b465"]].forEach(([a,o,c],l)=>{const u=l===2?.095:.085,h=.03+u*1.1+(l===2?.04:0);e(new On(u,1),c,a,h,o,{sy:1.25,ry:l}),e(new On(u*.3,0),"#d68f4a",a+u*.55,h+u*.4,o+u*.4),e(new On(u*.25,0),"#e0a560",a-u*.4,h+u*.7,o-u*.5)}),r.push(t()),e(new tn(.13,.13,.3,14),"#a9cdb3",0,.15),e(new tn(.14,.14,.07,14),"#d2b25e",0,.335),e(new Qt(.14,.12,.02),"#f3efda",0,.14,.125),r.push(t()),e(new Qt(.32,.38,.2),"#d9bd88",0,.19),e(new Qt(.33,.05,.21),"#bf9f68",0,.36),[-.06,.06].forEach(a=>e(new Wr(.07,.01,5,10,Math.PI),"#8a6e44",0,.385,a)),e(new Qt(.16,.14,.01),"#496f50",0,.2,.101),e(new Qt(.06,.06,.01),"#e7dcbc",0,.2,.106),r.push(t()),e(new Qt(.38,.26,.3),"#c49a5e",0,.13),e(new Qt(.08,.012,.31),"#e6d6ad",0,.262),[-1,1].forEach(a=>e(new Qt(.08,.12,.01),"#e6d6ad",0,.2,a*.151)),e(new Qt(.12,.09,.01),"#496f50",.1,.13,.152),r.push(t()),r}export{hb as createMap3D};
