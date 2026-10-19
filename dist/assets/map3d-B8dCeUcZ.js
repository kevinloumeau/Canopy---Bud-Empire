/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const mo="attached",Ul="detached";const Ot="srgb",An="srgb-linear",kr="linear",Vt="srgb";const go="300 es";class gs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const xn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let bo=1234567;const Os=Math.PI/180,us=180/Math.PI;function ei(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(xn[s&255]+xn[s>>8&255]+xn[s>>16&255]+xn[s>>24&255]+"-"+xn[e&255]+xn[e>>8&255]+"-"+xn[e>>16&15|64]+xn[e>>24&255]+"-"+xn[t&63|128]+xn[t>>8&255]+"-"+xn[t>>16&255]+xn[t>>24&255]+xn[n&255]+xn[n>>8&255]+xn[n>>16&255]+xn[n>>24&255]).toLowerCase()}function ln(s,e,t){return Math.max(e,Math.min(t,s))}function Qa(s,e){return(s%e+e)%e}function Ol(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Bl(s,e,t){return s!==e?(t-s)/(e-s):0}function Bs(s,e,t){return(1-t)*s+t*e}function kl(s,e,t,n){return Bs(s,e,1-Math.exp(-t*n))}function zl(s,e=1){return e-Math.abs(Qa(s,e*2)-e)}function Gl(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Hl(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Vl(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Wl(s,e){return s+Math.random()*(e-s)}function Xl(s){return s*(.5-Math.random())}function jl(s){s!==void 0&&(bo=s);let e=bo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ql(s){return s*Os}function Kl(s){return s*us}function Yl(s){return(s&s-1)===0&&s!==0}function Jl(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Zl(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Ql(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),f=a((e-n)/2),p=r((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":s.set(o*u,c*h,c*f,o*l);break;case"YZY":s.set(c*f,o*u,c*h,o*l);break;case"ZXZ":s.set(c*h,c*f,o*u,o*l);break;case"XZX":s.set(o*u,c*g,c*p,o*l);break;case"YXY":s.set(c*p,o*u,c*g,o*l);break;case"ZYZ":s.set(c*g,c*p,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Qn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function zt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const $l={DEG2RAD:Os,RAD2DEG:us,generateUUID:ei,clamp:ln,euclideanModulo:Qa,mapLinear:Ol,inverseLerp:Bl,lerp:Bs,damp:kl,pingpong:zl,smoothstep:Gl,smootherstep:Hl,randInt:Vl,randFloat:Wl,randFloatSpread:Xl,seededRandom:jl,degToRad:ql,radToDeg:Kl,isPowerOfTwo:Yl,ceilPowerOfTwo:Jl,floorPowerOfTwo:Zl,setQuaternionFromProperEuler:Ql,normalize:zt,denormalize:Qn};class Oe{constructor(e=0,t=0){Oe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ln(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Et{constructor(e,t,n,i,r,a,o,c,l){Et.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],p=n[5],g=n[8],_=i[0],m=i[3],d=i[6],x=i[1],M=i[4],b=i[7],D=i[2],A=i[5],E=i[8];return r[0]=a*_+o*x+c*D,r[3]=a*m+o*M+c*A,r[6]=a*d+o*b+c*E,r[1]=l*_+u*x+h*D,r[4]=l*m+u*M+h*A,r[7]=l*d+u*b+h*E,r[2]=f*_+p*x+g*D,r[5]=f*m+p*M+g*A,r[8]=f*d+p*b+g*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+i*r*l-i*a*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,f=o*c-u*r,p=l*r-a*c,g=t*h+n*f+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(i*l-u*n)*_,e[2]=(o*n-i*a)*_,e[3]=f*_,e[4]=(u*t-i*c)*_,e[5]=(i*r-o*t)*_,e[6]=p*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Kr.makeScale(e,t)),this}rotate(e){return this.premultiply(Kr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Kr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Kr=new Et;function Qc(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Hs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function eh(){const s=Hs("canvas");return s.style.display="block",s}const _o={};function Ns(s){s in _o||(_o[s]=!0,console.warn(s))}function th(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function nh(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function ih(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Lt={enabled:!0,workingColorSpace:An,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Vt&&(s.r=bi(s.r),s.g=bi(s.g),s.b=bi(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Vt&&(s.r=ls(s.r),s.g=ls(s.g),s.b=ls(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===""?kr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function bi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ls(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const xo=[.64,.33,.3,.6,.15,.06],vo=[.2126,.7152,.0722],Mo=[.3127,.329],yo=new Et().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),So=new Et().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Lt.define({[An]:{primaries:xo,whitePoint:Mo,transfer:kr,toXYZ:yo,fromXYZ:So,luminanceCoefficients:vo,workingColorSpaceConfig:{unpackColorSpace:Ot},outputColorSpaceConfig:{drawingBufferColorSpace:Ot}},[Ot]:{primaries:xo,whitePoint:Mo,transfer:Vt,toXYZ:yo,fromXYZ:So,luminanceCoefficients:vo,outputColorSpaceConfig:{drawingBufferColorSpace:Ot}}});let Wi;class sh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Wi===void 0&&(Wi=Hs("canvas")),Wi.width=e.width,Wi.height=e.height;const n=Wi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Wi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Hs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=bi(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(bi(t[n]/255)*255):t[n]=bi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let rh=0;class $c{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rh++}),this.uuid=ei(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Yr(i[a].image)):r.push(Yr(i[a]))}else r=Yr(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Yr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?sh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ah=0;class an extends gs{constructor(e=an.DEFAULT_IMAGE,t=an.DEFAULT_MAPPING,n=1001,i=1001,r=1006,a=1008,o=1023,c=1009,l=an.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ah++}),this.uuid=ei(),this.name="",this.source=new $c(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Oe(0,0),this.repeat=new Oe(1,1),this.center=new Oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}an.DEFAULT_IMAGE=null;an.DEFAULT_MAPPING=300;an.DEFAULT_ANISOTROPY=1;class Dt{constructor(e=0,t=0,n=0,i=1){Dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],p=c[5],g=c[9],_=c[2],m=c[6],d=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(l+1)/2,b=(p+1)/2,D=(d+1)/2,A=(u+f)/4,E=(h+_)/4,w=(g+m)/4;return M>b&&M>D?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=A/n,r=E/n):b>D?b<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(b),n=A/i,r=w/i):D<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(D),n=E/r,i=w/r),this.set(n,i,r,t),this}let x=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(h-_)/x,this.z=(f-u)/x,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class oh extends gs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Dt(0,0,e,t),this.scissorTest=!1,this.viewport=new Dt(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new an(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new $c(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ci extends oh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class el extends an{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ch extends an{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3];const f=r[a+0],p=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(h!==_||c!==f||l!==p||u!==g){let m=1-o;const d=c*f+l*p+u*g+h*_,x=d>=0?1:-1,M=1-d*d;if(M>Number.EPSILON){const D=Math.sqrt(M),A=Math.atan2(D,d*x);m=Math.sin(m*A)/D,o=Math.sin(o*A)/D}const b=o*x;if(c=c*m+f*b,l=l*m+p*b,u=u*m+g*b,h=h*m+_*b,m===1-o){const D=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=D,l*=D,u*=D,h*=D}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=r[a],f=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+u*h+c*p-l*f,e[t+1]=c*g+u*f+l*h-o*p,e[t+2]=l*g+u*p+o*f-c*h,e[t+3]=u*g-o*h-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(i/2),h=o(r/2),f=c(n/2),p=c(i/2),g=c(r/2);switch(a){case"XYZ":this._x=f*u*h+l*p*g,this._y=l*p*h-f*u*g,this._z=l*u*g+f*p*h,this._w=l*u*h-f*p*g;break;case"YXZ":this._x=f*u*h+l*p*g,this._y=l*p*h-f*u*g,this._z=l*u*g-f*p*h,this._w=l*u*h+f*p*g;break;case"ZXY":this._x=f*u*h-l*p*g,this._y=l*p*h+f*u*g,this._z=l*u*g+f*p*h,this._w=l*u*h-f*p*g;break;case"ZYX":this._x=f*u*h-l*p*g,this._y=l*p*h+f*u*g,this._z=l*u*g-f*p*h,this._w=l*u*h+f*p*g;break;case"YZX":this._x=f*u*h+l*p*g,this._y=l*p*h+f*u*g,this._z=l*u*g-f*p*h,this._w=l*u*h-f*p*g;break;case"XZY":this._x=f*u*h-l*p*g,this._y=l*p*h-f*u*g,this._z=l*u*g+f*p*h,this._w=l*u*h+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=n+o+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(a-i)*p}else if(n>o&&n>h){const p=2*Math.sqrt(1+n-o-h);this._w=(u-c)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(r+l)/p}else if(o>h){const p=2*Math.sqrt(1+o-n-h);this._w=(r-l)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+h-n-o);this._w=(a-i)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ln(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+i*l-r*c,this._y=i*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-i*o,this._w=a*u-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=a*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Eo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Eo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),u=2*(o*t-r*i),h=2*(r*n-a*t);return this.x=t+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=i+c*h+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Jr.copy(this).projectOnVector(e),this.sub(Jr)}reflect(e){return this.sub(Jr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ln(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Jr=new N,Eo=new yn;class Mn{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Yn):Yn.fromBufferAttribute(r,a),Yn.applyMatrix4(e.matrixWorld),this.expandByPoint(Yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),$s.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$s.copy(n.boundingBox)),$s.applyMatrix4(e.matrixWorld),this.union($s)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yn),Yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ms),er.subVectors(this.max,Ms),Xi.subVectors(e.a,Ms),ji.subVectors(e.b,Ms),qi.subVectors(e.c,Ms),_i.subVectors(ji,Xi),xi.subVectors(qi,ji),Di.subVectors(Xi,qi);let t=[0,-_i.z,_i.y,0,-xi.z,xi.y,0,-Di.z,Di.y,_i.z,0,-_i.x,xi.z,0,-xi.x,Di.z,0,-Di.x,-_i.y,_i.x,0,-xi.y,xi.x,0,-Di.y,Di.x,0];return!Zr(t,Xi,ji,qi,er)||(t=[1,0,0,0,1,0,0,0,1],!Zr(t,Xi,ji,qi,er))?!1:(tr.crossVectors(_i,xi),t=[tr.x,tr.y,tr.z],Zr(t,Xi,ji,qi,er))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ci),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ci=[new N,new N,new N,new N,new N,new N,new N,new N],Yn=new N,$s=new Mn,Xi=new N,ji=new N,qi=new N,_i=new N,xi=new N,Di=new N,Ms=new N,er=new N,tr=new N,Ii=new N;function Zr(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Ii.fromArray(s,r);const o=i.x*Math.abs(Ii.x)+i.y*Math.abs(Ii.y)+i.z*Math.abs(Ii.z),c=e.dot(Ii),l=t.dot(Ii),u=n.dot(Ii);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const lh=new Mn,ys=new N,Qr=new N;class ii{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):lh.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ys.subVectors(e,this.center);const t=ys.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ys,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Qr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ys.copy(e.center).add(Qr)),this.expandByPoint(ys.copy(e.center).sub(Qr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const li=new N,$r=new N,nr=new N,vi=new N,ea=new N,ir=new N,ta=new N;class zr{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,li)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=li.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(li.copy(this.origin).addScaledVector(this.direction,t),li.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){$r.copy(e).add(t).multiplyScalar(.5),nr.copy(t).sub(e).normalize(),vi.copy(this.origin).sub($r);const r=e.distanceTo(t)*.5,a=-this.direction.dot(nr),o=vi.dot(this.direction),c=-vi.dot(nr),l=vi.lengthSq(),u=Math.abs(1-a*a);let h,f,p,g;if(u>0)if(h=a*c-o,f=a*o-c,g=r*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,p=h*(h+a*f+2*o)+f*(a*h+f+2*c)+l}else f=r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-a*r+o)),f=h>0?-r:Math.min(Math.max(-r,-c),r),p=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(h=Math.max(0,-(a*r+o)),f=h>0?r:Math.min(Math.max(-r,-c),r),p=-h*h+f*(f+2*c)+l);else f=a>0?-r:r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy($r).addScaledVector(nr,f),p}intersectSphere(e,t){li.subVectors(e.center,this.origin);const n=li.dot(this.direction),i=li.dot(li)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,i=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,i=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,li)!==null}intersectTriangle(e,t,n,i,r){ea.subVectors(t,e),ir.subVectors(n,e),ta.crossVectors(ea,ir);let a=this.direction.dot(ta),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;vi.subVectors(this.origin,e);const c=o*this.direction.dot(ir.crossVectors(vi,ir));if(c<0)return null;const l=o*this.direction.dot(ea.cross(vi));if(l<0||c+l>a)return null;const u=-o*vi.dot(ta);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt{constructor(e,t,n,i,r,a,o,c,l,u,h,f,p,g,_,m){rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,u,h,f,p,g,_,m)}set(e,t,n,i,r,a,o,c,l,u,h,f,p,g,_,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=i,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Ki.setFromMatrixColumn(e,0).length(),r=1/Ki.setFromMatrixColumn(e,1).length(),a=1/Ki.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=a*u,p=a*h,g=o*u,_=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=p+g*l,t[5]=f-_*l,t[9]=-o*c,t[2]=_-f*l,t[6]=g+p*l,t[10]=a*c}else if(e.order==="YXZ"){const f=c*u,p=c*h,g=l*u,_=l*h;t[0]=f+_*o,t[4]=g*o-p,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=p*o-g,t[6]=_+f*o,t[10]=a*c}else if(e.order==="ZXY"){const f=c*u,p=c*h,g=l*u,_=l*h;t[0]=f-_*o,t[4]=-a*h,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*u,t[9]=_-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const f=a*u,p=a*h,g=o*u,_=o*h;t[0]=c*u,t[4]=g*l-p,t[8]=f*l+_,t[1]=c*h,t[5]=_*l+f,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const f=a*c,p=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=_-f*h,t[8]=g*h+p,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=p*h+g,t[10]=f-_*h}else if(e.order==="XZY"){const f=a*c,p=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+_,t[5]=a*u,t[9]=p*h-g,t[2]=g*h-p,t[6]=o*u,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(hh,e,uh)}lookAt(e,t,n){const i=this.elements;return Un.subVectors(e,t),Un.lengthSq()===0&&(Un.z=1),Un.normalize(),Mi.crossVectors(n,Un),Mi.lengthSq()===0&&(Math.abs(n.z)===1?Un.x+=1e-4:Un.z+=1e-4,Un.normalize(),Mi.crossVectors(n,Un)),Mi.normalize(),sr.crossVectors(Un,Mi),i[0]=Mi.x,i[4]=sr.x,i[8]=Un.x,i[1]=Mi.y,i[5]=sr.y,i[9]=Un.y,i[2]=Mi.z,i[6]=sr.z,i[10]=Un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],p=n[13],g=n[2],_=n[6],m=n[10],d=n[14],x=n[3],M=n[7],b=n[11],D=n[15],A=i[0],E=i[4],w=i[8],y=i[12],v=i[1],F=i[5],B=i[9],k=i[13],Q=i[2],ie=i[6],U=i[10],ee=i[14],Z=i[3],fe=i[7],$=i[11],te=i[15];return r[0]=a*A+o*v+c*Q+l*Z,r[4]=a*E+o*F+c*ie+l*fe,r[8]=a*w+o*B+c*U+l*$,r[12]=a*y+o*k+c*ee+l*te,r[1]=u*A+h*v+f*Q+p*Z,r[5]=u*E+h*F+f*ie+p*fe,r[9]=u*w+h*B+f*U+p*$,r[13]=u*y+h*k+f*ee+p*te,r[2]=g*A+_*v+m*Q+d*Z,r[6]=g*E+_*F+m*ie+d*fe,r[10]=g*w+_*B+m*U+d*$,r[14]=g*y+_*k+m*ee+d*te,r[3]=x*A+M*v+b*Q+D*Z,r[7]=x*E+M*F+b*ie+D*fe,r[11]=x*w+M*B+b*U+D*$,r[15]=x*y+M*k+b*ee+D*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],p=e[14],g=e[3],_=e[7],m=e[11],d=e[15];return g*(+r*c*h-i*l*h-r*o*f+n*l*f+i*o*p-n*c*p)+_*(+t*c*p-t*l*f+r*a*f-i*a*p+i*l*u-r*c*u)+m*(+t*l*h-t*o*p-r*a*h+n*a*p+r*o*u-n*l*u)+d*(-i*o*u-t*c*h+t*o*f+i*a*h-n*a*f+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],p=e[11],g=e[12],_=e[13],m=e[14],d=e[15],x=h*m*l-_*f*l+_*c*p-o*m*p-h*c*d+o*f*d,M=g*f*l-u*m*l-g*c*p+a*m*p+u*c*d-a*f*d,b=u*_*l-g*h*l+g*o*p-a*_*p-u*o*d+a*h*d,D=g*h*c-u*_*c-g*o*f+a*_*f+u*o*m-a*h*m,A=t*x+n*M+i*b+r*D;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/A;return e[0]=x*E,e[1]=(_*f*r-h*m*r-_*i*p+n*m*p+h*i*d-n*f*d)*E,e[2]=(o*m*r-_*c*r+_*i*l-n*m*l-o*i*d+n*c*d)*E,e[3]=(h*c*r-o*f*r-h*i*l+n*f*l+o*i*p-n*c*p)*E,e[4]=M*E,e[5]=(u*m*r-g*f*r+g*i*p-t*m*p-u*i*d+t*f*d)*E,e[6]=(g*c*r-a*m*r-g*i*l+t*m*l+a*i*d-t*c*d)*E,e[7]=(a*f*r-u*c*r+u*i*l-t*f*l-a*i*p+t*c*p)*E,e[8]=b*E,e[9]=(g*h*r-u*_*r-g*n*p+t*_*p+u*n*d-t*h*d)*E,e[10]=(a*_*r-g*o*r+g*n*l-t*_*l-a*n*d+t*o*d)*E,e[11]=(u*o*r-a*h*r-u*n*l+t*h*l+a*n*p-t*o*p)*E,e[12]=D*E,e[13]=(u*_*i-g*h*i+g*n*f-t*_*f-u*n*m+t*h*m)*E,e[14]=(g*o*i-a*_*i-g*n*c+t*_*c+a*n*m-t*o*m)*E,e[15]=(a*h*i-u*o*i+u*n*c-t*h*c-a*n*f+t*o*f)*E,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,u*o+n,u*c-i*a,0,l*c-i*o,u*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,h=o+o,f=r*l,p=r*u,g=r*h,_=a*u,m=a*h,d=o*h,x=c*l,M=c*u,b=c*h,D=n.x,A=n.y,E=n.z;return i[0]=(1-(_+d))*D,i[1]=(p+b)*D,i[2]=(g-M)*D,i[3]=0,i[4]=(p-b)*A,i[5]=(1-(f+d))*A,i[6]=(m+x)*A,i[7]=0,i[8]=(g+M)*E,i[9]=(m-x)*E,i[10]=(1-(f+_))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=Ki.set(i[0],i[1],i[2]).length();const a=Ki.set(i[4],i[5],i[6]).length(),o=Ki.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Jn.copy(this);const l=1/r,u=1/a,h=1/o;return Jn.elements[0]*=l,Jn.elements[1]*=l,Jn.elements[2]*=l,Jn.elements[4]*=u,Jn.elements[5]*=u,Jn.elements[6]*=u,Jn.elements[8]*=h,Jn.elements[9]*=h,Jn.elements[10]*=h,t.setFromRotationMatrix(Jn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=2e3){const c=this.elements,l=2*r/(t-e),u=2*r/(n-i),h=(t+e)/(t-e),f=(n+i)/(n-i);let p,g;if(o===2e3)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===2001)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=2e3){const c=this.elements,l=1/(t-e),u=1/(n-i),h=1/(a-r),f=(t+e)*l,p=(n+i)*u;let g,_;if(o===2e3)g=(a+r)*h,_=-2*h;else if(o===2001)g=r*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ki=new N,Jn=new rt,hh=new N(0,0,0),uh=new N(1,1,1),Mi=new N,sr=new N,Un=new N,To=new rt,wo=new yn;class Gn{constructor(e=0,t=0,n=0,i=Gn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],u=i[9],h=i[2],f=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(ln(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ln(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(ln(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ln(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ln(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ln(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return To.makeRotationFromQuaternion(e),this.setFromRotationMatrix(To,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return wo.setFromEuler(this),this.setFromQuaternion(wo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Gn.DEFAULT_ORDER="XYZ";class tl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let fh=0;const Ao=new N,Yi=new yn,hi=new rt,rr=new N,Ss=new N,dh=new N,ph=new yn,Ro=new N(1,0,0),Co=new N(0,1,0),Po=new N(0,0,1),Lo={type:"added"},mh={type:"removed"},Ji={type:"childadded",child:null},na={type:"childremoved",child:null};class Qt extends gs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fh++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Qt.DEFAULT_UP.clone();const e=new N,t=new Gn,n=new yn,i=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new rt},normalMatrix:{value:new Et}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=Qt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new tl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Yi.setFromAxisAngle(e,t),this.quaternion.multiply(Yi),this}rotateOnWorldAxis(e,t){return Yi.setFromAxisAngle(e,t),this.quaternion.premultiply(Yi),this}rotateX(e){return this.rotateOnAxis(Ro,e)}rotateY(e){return this.rotateOnAxis(Co,e)}rotateZ(e){return this.rotateOnAxis(Po,e)}translateOnAxis(e,t){return Ao.copy(e).applyQuaternion(this.quaternion),this.position.add(Ao.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ro,e)}translateY(e){return this.translateOnAxis(Co,e)}translateZ(e){return this.translateOnAxis(Po,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?rr.copy(e):rr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(Ss,rr,this.up):hi.lookAt(rr,Ss,this.up),this.quaternion.setFromRotationMatrix(hi),i&&(hi.extractRotation(i.matrixWorld),Yi.setFromRotationMatrix(hi),this.quaternion.premultiply(Yi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Lo),Ji.child=e,this.dispatchEvent(Ji),Ji.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(mh),na.child=e,this.dispatchEvent(na),na.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hi.multiply(e.parent.matrixWorld)),e.applyMatrix4(hi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Lo),Ji.child=e,this.dispatchEvent(Ji),Ji.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,e,dh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,ph,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Qt.DEFAULT_UP=new N(0,1,0);Qt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Zn=new N,ui=new N,ia=new N,fi=new N,Zi=new N,Qi=new N,Do=new N,sa=new N,ra=new N,aa=new N,oa=new Dt,ca=new Dt,la=new Dt;class jn{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Zn.subVectors(e,t),i.cross(Zn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Zn.subVectors(i,t),ui.subVectors(n,t),ia.subVectors(e,t);const a=Zn.dot(Zn),o=Zn.dot(ui),c=Zn.dot(ia),l=ui.dot(ui),u=ui.dot(ia),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;const f=1/h,p=(l*c-o*u)*f,g=(a*u-o*c)*f;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,fi)===null?!1:fi.x>=0&&fi.y>=0&&fi.x+fi.y<=1}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,fi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,fi.x),c.addScaledVector(a,fi.y),c.addScaledVector(o,fi.z),c)}static getInterpolatedAttribute(e,t,n,i,r,a){return oa.setScalar(0),ca.setScalar(0),la.setScalar(0),oa.fromBufferAttribute(e,t),ca.fromBufferAttribute(e,n),la.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(oa,r.x),a.addScaledVector(ca,r.y),a.addScaledVector(la,r.z),a}static isFrontFacing(e,t,n,i){return Zn.subVectors(n,t),ui.subVectors(e,t),Zn.cross(ui).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zn.subVectors(this.c,this.b),ui.subVectors(this.a,this.b),Zn.cross(ui).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return jn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return jn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return jn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return jn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return jn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;Zi.subVectors(i,n),Qi.subVectors(r,n),sa.subVectors(e,n);const c=Zi.dot(sa),l=Qi.dot(sa);if(c<=0&&l<=0)return t.copy(n);ra.subVectors(e,i);const u=Zi.dot(ra),h=Qi.dot(ra);if(u>=0&&h<=u)return t.copy(i);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(Zi,a);aa.subVectors(e,r);const p=Zi.dot(aa),g=Qi.dot(aa);if(g>=0&&p<=g)return t.copy(r);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(Qi,o);const m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return Do.subVectors(r,i),o=(h-u)/(h-u+(p-g)),t.copy(i).addScaledVector(Do,o);const d=1/(m+_+f);return a=_*d,o=f*d,t.copy(n).addScaledVector(Zi,a).addScaledVector(Qi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const nl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yi={h:0,s:0,l:0},ar={h:0,s:0,l:0};function ha(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Je{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Lt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Lt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Lt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Lt.workingColorSpace){if(e=Qa(e,1),t=ln(t,0,1),n=ln(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ha(a,r,e+1/3),this.g=ha(a,r,e),this.b=ha(a,r,e-1/3)}return Lt.toWorkingColorSpace(this,i),this}setStyle(e,t=Ot){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ot){const n=nl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=bi(e.r),this.g=bi(e.g),this.b=bi(e.b),this}copyLinearToSRGB(e){return this.r=ls(e.r),this.g=ls(e.g),this.b=ls(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ot){return Lt.fromWorkingColorSpace(vn.copy(this),e),Math.round(ln(vn.r*255,0,255))*65536+Math.round(ln(vn.g*255,0,255))*256+Math.round(ln(vn.b*255,0,255))}getHexString(e=Ot){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Lt.workingColorSpace){Lt.fromWorkingColorSpace(vn.copy(this),t);const n=vn.r,i=vn.g,r=vn.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(i-r)/h+(i<r?6:0);break;case i:c=(r-n)/h+2;break;case r:c=(n-i)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Lt.workingColorSpace){return Lt.fromWorkingColorSpace(vn.copy(this),t),e.r=vn.r,e.g=vn.g,e.b=vn.b,e}getStyle(e=Ot){Lt.fromWorkingColorSpace(vn.copy(this),e);const t=vn.r,n=vn.g,i=vn.b;return e!==Ot?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(yi),this.setHSL(yi.h+e,yi.s+t,yi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(yi),e.getHSL(ar);const n=Bs(yi.h,ar.h,t),i=Bs(yi.s,ar.s,t),r=Bs(yi.l,ar.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const vn=new Je;Je.NAMES=nl;let gh=0;class qn extends gs{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gh++}),this.uuid=ei(),this.name="",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class pn extends qn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const rn=new N,or=new Oe;class Ht{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)or.fromBufferAttribute(this,t),or.applyMatrix3(e),this.setXY(t,or.x,or.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix3(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix4(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.applyNormalMatrix(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.transformDirection(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Qn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=zt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Qn(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Qn(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Qn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Qn(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),i=zt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),i=zt(i,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}}class il extends Ht{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class sl extends Ht{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Rt extends Ht{constructor(e,t,n){super(new Float32Array(e),t,n)}}let bh=0;const Wn=new rt,ua=new Qt,$i=new N,On=new Mn,Es=new Mn,dn=new N;class Wt extends gs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bh++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Qc(e)?sl:il)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Et().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Wn.makeRotationFromQuaternion(e),this.applyMatrix4(Wn),this}rotateX(e){return Wn.makeRotationX(e),this.applyMatrix4(Wn),this}rotateY(e){return Wn.makeRotationY(e),this.applyMatrix4(Wn),this}rotateZ(e){return Wn.makeRotationZ(e),this.applyMatrix4(Wn),this}translate(e,t,n){return Wn.makeTranslation(e,t,n),this.applyMatrix4(Wn),this}scale(e,t,n){return Wn.makeScale(e,t,n),this.applyMatrix4(Wn),this}lookAt(e){return ua.lookAt(e),ua.updateMatrix(),this.applyMatrix4(ua.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($i).negate(),this.translate($i.x,$i.y,$i.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Rt(n,3))}else{for(let n=0,i=t.count;n<i;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];On.setFromBufferAttribute(r),this.morphTargetsRelative?(dn.addVectors(this.boundingBox.min,On.min),this.boundingBox.expandByPoint(dn),dn.addVectors(this.boundingBox.max,On.max),this.boundingBox.expandByPoint(dn)):(this.boundingBox.expandByPoint(On.min),this.boundingBox.expandByPoint(On.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ii);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(On.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Es.setFromBufferAttribute(o),this.morphTargetsRelative?(dn.addVectors(On.min,Es.min),On.expandByPoint(dn),dn.addVectors(On.max,Es.max),On.expandByPoint(dn)):(On.expandByPoint(Es.min),On.expandByPoint(Es.max))}On.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)dn.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(dn));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)dn.fromBufferAttribute(o,l),c&&($i.fromBufferAttribute(e,l),dn.add($i)),i=Math.max(i,n.distanceToSquared(dn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ht(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let w=0;w<n.count;w++)o[w]=new N,c[w]=new N;const l=new N,u=new N,h=new N,f=new Oe,p=new Oe,g=new Oe,_=new N,m=new N;function d(w,y,v){l.fromBufferAttribute(n,w),u.fromBufferAttribute(n,y),h.fromBufferAttribute(n,v),f.fromBufferAttribute(r,w),p.fromBufferAttribute(r,y),g.fromBufferAttribute(r,v),u.sub(l),h.sub(l),p.sub(f),g.sub(f);const F=1/(p.x*g.y-g.x*p.y);isFinite(F)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(F),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(F),o[w].add(_),o[y].add(_),o[v].add(_),c[w].add(m),c[y].add(m),c[v].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let w=0,y=x.length;w<y;++w){const v=x[w],F=v.start,B=v.count;for(let k=F,Q=F+B;k<Q;k+=3)d(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const M=new N,b=new N,D=new N,A=new N;function E(w){D.fromBufferAttribute(i,w),A.copy(D);const y=o[w];M.copy(y),M.sub(D.multiplyScalar(D.dot(y))).normalize(),b.crossVectors(A,y);const F=b.dot(c[w])<0?-1:1;a.setXYZW(w,M.x,M.y,M.z,F)}for(let w=0,y=x.length;w<y;++w){const v=x[w],F=v.start,B=v.count;for(let k=F,Q=F+B;k<Q;k+=3)E(e.getX(k+0)),E(e.getX(k+1)),E(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ht(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const i=new N,r=new N,a=new N,o=new N,c=new N,l=new N,u=new N,h=new N;if(e)for(let f=0,p=e.count;f<p;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)i.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)dn.fromBufferAttribute(e,t),dn.normalize(),e.setXYZ(t,dn.x,dn.y,dn.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,h=o.normalized,f=new l.constructor(c.length*u);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?p=c[_]*o.data.stride+o.offset:p=c[_]*u;for(let d=0;d<u;d++)f[g++]=l[p++]}return new Ht(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Wt,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const f=l[u],p=e(f,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const p=l[h];u.push(p.toJSON(e.data))}u.length>0&&(i[c]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const l in i){const u=i[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],h=r[l];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Io=new rt,Fi=new zr,cr=new ii,Fo=new N,lr=new N,hr=new N,ur=new N,fa=new N,fr=new N,No=new N,dr=new N;class Ke extends Qt{constructor(e=new Wt,t=new pn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){fr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(fa.fromBufferAttribute(h,e),a?fr.addScaledVector(fa,u):fr.addScaledVector(fa.sub(t),u))}t.add(fr)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),cr.copy(n.boundingSphere),cr.applyMatrix4(r),Fi.copy(e.ray).recast(e.near),!(cr.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(cr,Fo)===null||Fi.origin.distanceToSquared(Fo)>(e.far-e.near)**2))&&(Io.copy(r).invert(),Fi.copy(e.ray).applyMatrix4(Io),!(n.boundingBox!==null&&Fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Fi)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=a[m.materialIndex],x=Math.max(m.start,p.start),M=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let b=x,D=M;b<D;b+=3){const A=o.getX(b),E=o.getX(b+1),w=o.getX(b+2);i=pr(this,d,e,n,l,u,h,A,E,w),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const x=o.getX(m),M=o.getX(m+1),b=o.getX(m+2);i=pr(this,a,e,n,l,u,h,x,M,b),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=a[m.materialIndex],x=Math.max(m.start,p.start),M=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let b=x,D=M;b<D;b+=3){const A=b,E=b+1,w=b+2;i=pr(this,d,e,n,l,u,h,A,E,w),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const x=m,M=m+1,b=m+2;i=pr(this,a,e,n,l,u,h,x,M,b),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function _h(s,e,t,n,i,r,a,o){let c;if(e.side===1?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===0,o),c===null)return null;dr.copy(o),dr.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(dr);return l<t.near||l>t.far?null:{distance:l,point:dr.clone(),object:s}}function pr(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,lr),s.getVertexPosition(c,hr),s.getVertexPosition(l,ur);const u=_h(s,e,t,n,lr,hr,ur,No);if(u){const h=new N;jn.getBarycoord(No,lr,hr,ur,h),i&&(u.uv=jn.getInterpolatedAttribute(i,o,c,l,h,new Oe)),r&&(u.uv1=jn.getInterpolatedAttribute(r,o,c,l,h,new Oe)),a&&(u.normal=jn.getInterpolatedAttribute(a,o,c,l,h,new N),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new N,materialIndex:0};jn.getNormal(lr,hr,ur,f.normal),u.face=f,u.barycoord=h}return u}class Yt extends Wt{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],h=[];let f=0,p=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Rt(l,3)),this.setAttribute("normal",new Rt(u,3)),this.setAttribute("uv",new Rt(h,2));function g(_,m,d,x,M,b,D,A,E,w,y){const v=b/E,F=D/w,B=b/2,k=D/2,Q=A/2,ie=E+1,U=w+1;let ee=0,Z=0;const fe=new N;for(let $=0;$<U;$++){const te=$*F-k;for(let Ae=0;Ae<ie;Ae++){const We=Ae*v-B;fe[_]=We*x,fe[m]=te*M,fe[d]=Q,l.push(fe.x,fe.y,fe.z),fe[_]=0,fe[m]=0,fe[d]=A>0?1:-1,u.push(fe.x,fe.y,fe.z),h.push(Ae/E),h.push(1-$/w),ee+=1}}for(let $=0;$<w;$++)for(let te=0;te<E;te++){const Ae=f+te+ie*$,We=f+te+ie*($+1),ce=f+(te+1)+ie*($+1),_e=f+(te+1)+ie*$;c.push(Ae,We,_e),c.push(We,ce,_e),Z+=6}o.addGroup(p,Z,y),p+=Z,f+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function fs(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function wn(s){const e={};for(let t=0;t<s.length;t++){const n=fs(s[t]);for(const i in n)e[i]=n[i]}return e}function xh(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function rl(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Lt.workingColorSpace}const vh={clone:fs,merge:wn};var Mh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pi extends qn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Mh,this.fragmentShader=yh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=fs(e.uniforms),this.uniformsGroups=xh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class al extends Qt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=2e3}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Si=new N,Uo=new Oe,Oo=new Oe;class Ln extends al{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=us*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Os*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return us*2*Math.atan(Math.tan(Os*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Si.x,Si.y).multiplyScalar(-e/Si.z),Si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Si.x,Si.y).multiplyScalar(-e/Si.z)}getViewSize(e,t){return this.getViewBounds(e,Uo,Oo),t.subVectors(Oo,Uo)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Os*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const es=-90,ts=1;class Sh extends Qt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ln(es,ts,e,t);i.layers=this.layers,this.add(i);const r=new Ln(es,ts,e,t);r.layers=this.layers,this.add(r);const a=new Ln(es,ts,e,t);a.layers=this.layers,this.add(a);const o=new Ln(es,ts,e,t);o.layers=this.layers,this.add(o);const c=new Ln(es,ts,e,t);c.layers=this.layers,this.add(c);const l=new Ln(es,ts,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,f,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class ol extends an{constructor(e,t,n,i,r,a,o,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:301,super(e,t,n,i,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Eh extends Ci{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new ol(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:1006}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Yt(5,5,5),r=new Pi({name:"CubemapFromEquirect",uniforms:fs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});r.uniforms.tEquirect.value=t;const a=new Ke(i,r),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=1006),new Sh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}const da=new N,Th=new N,wh=new Et;class Ai{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=da.subVectors(n,t).cross(Th.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(da),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||wh.getNormalMatrix(e),i=this.coplanarPoint(da).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ni=new ii,mr=new N;class $a{constructor(e=new Ai,t=new Ai,n=new Ai,i=new Ai,r=new Ai,a=new Ai){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3){const n=this.planes,i=e.elements,r=i[0],a=i[1],o=i[2],c=i[3],l=i[4],u=i[5],h=i[6],f=i[7],p=i[8],g=i[9],_=i[10],m=i[11],d=i[12],x=i[13],M=i[14],b=i[15];if(n[0].setComponents(c-r,f-l,m-p,b-d).normalize(),n[1].setComponents(c+r,f+l,m+p,b+d).normalize(),n[2].setComponents(c+a,f+u,m+g,b+x).normalize(),n[3].setComponents(c-a,f-u,m-g,b-x).normalize(),n[4].setComponents(c-o,f-h,m-_,b-M).normalize(),t===2e3)n[5].setComponents(c+o,f+h,m+_,b+M).normalize();else if(t===2001)n[5].setComponents(o,h,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ni.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ni)}intersectsSprite(e){return Ni.center.set(0,0,0),Ni.radius=.7071067811865476,Ni.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ni)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(mr.x=i.normal.x>0?e.max.x:e.min.x,mr.y=i.normal.y>0?e.max.y:e.min.y,mr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(mr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function cl(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Ah(s){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,h=l.byteLength,f=s.createBuffer();s.bindBuffer(c,f),s.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=s.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=s.SHORT;else if(l instanceof Uint32Array)p=s.UNSIGNED_INT;else if(l instanceof Int32Array)p=s.INT;else if(l instanceof Int8Array)p=s.BYTE;else if(l instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c.updateRanges;if(s.bindBuffer(l,o),h.length===0)s.bufferSubData(l,0,u);else{h.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<h.length;p++){const g=h[f],_=h[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,h[f]=_)}h.length=f+1;for(let p=0,g=h.length;p<g;p++){const _=h[p];s.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(s.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}class kn extends Wt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,u=c+1,h=e/o,f=t/c,p=[],g=[],_=[],m=[];for(let d=0;d<u;d++){const x=d*f-a;for(let M=0;M<l;M++){const b=M*h-r;g.push(b,-x,0),_.push(0,0,1),m.push(M/o),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let x=0;x<o;x++){const M=x+l*d,b=x+l*(d+1),D=x+1+l*(d+1),A=x+1+l*d;p.push(M,b,A),p.push(b,D,A)}this.setIndex(p),this.setAttribute("position",new Rt(g,3)),this.setAttribute("normal",new Rt(_,3)),this.setAttribute("uv",new Rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kn(e.width,e.height,e.widthSegments,e.heightSegments)}}var Rh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ch=`#ifdef USE_ALPHAHASH
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
#endif`,Ph=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ih=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fh=`#ifdef USE_AOMAP
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
#endif`,Nh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Uh=`#ifdef USE_BATCHING
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
#endif`,Oh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Gh=`#ifdef USE_IRIDESCENCE
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
#endif`,Hh=`#ifdef USE_BUMPMAP
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
#endif`,Vh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Wh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Kh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Yh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Jh=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Zh=`#define PI 3.141592653589793
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
} // validated`,Qh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,$h=`vec3 transformedNormal = objectNormal;
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
#endif`,eu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,iu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,su="gl_FragColor = linearToOutputTexel( gl_FragColor );",ru=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,au=`#ifdef USE_ENVMAP
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
#endif`,ou=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,cu=`#ifdef USE_ENVMAP
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
#endif`,lu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hu=`#ifdef USE_ENVMAP
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
#endif`,uu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,du=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mu=`#ifdef USE_GRADIENTMAP
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
}`,gu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_u=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xu=`uniform bool receiveShadow;
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
#endif`,vu=`#ifdef USE_ENVMAP
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
#endif`,Mu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,yu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Su=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Eu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tu=`PhysicalMaterial material;
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
#endif`,wu=`struct PhysicalMaterial {
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
}`,Au=`
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
#endif`,Ru=`#if defined( RE_IndirectDiffuse )
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
#endif`,Cu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Pu=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lu=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Du=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Iu=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Fu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Nu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Uu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ou=`#if defined( USE_POINTS_UV )
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
#endif`,Bu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ku=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vu=`#ifdef USE_MORPHTARGETS
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
#endif`,Wu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ju=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,qu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ku=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ju=`#ifdef USE_NORMALMAP
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
#endif`,Zu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$u=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ef=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,sf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,af=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,of=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,uf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ff=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,df=`float getShadowMask() {
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
}`,pf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mf=`#ifdef USE_SKINNING
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
#endif`,gf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bf=`#ifdef USE_SKINNING
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
#endif`,_f=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,yf=`#ifdef USE_TRANSMISSION
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
#endif`,Sf=`#ifdef USE_TRANSMISSION
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
#endif`,Ef=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Af=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Rf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cf=`uniform sampler2D t2D;
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
}`,Pf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,If=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ff=`#include <common>
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
}`,Nf=`#if DEPTH_PACKING == 3200
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
}`,Uf=`#define DISTANCE
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
}`,Of=`#define DISTANCE
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
}`,Bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,kf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zf=`uniform float scale;
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
}`,Gf=`uniform vec3 diffuse;
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
}`,Hf=`#include <common>
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
}`,Vf=`uniform vec3 diffuse;
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
}`,Wf=`#define LAMBERT
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
}`,Xf=`#define LAMBERT
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
}`,jf=`#define MATCAP
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
}`,qf=`#define MATCAP
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
}`,Kf=`#define NORMAL
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
}`,Yf=`#define NORMAL
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
}`,Jf=`#define PHONG
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
}`,Zf=`#define PHONG
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
}`,Qf=`#define STANDARD
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
}`,$f=`#define STANDARD
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
}`,ed=`#define TOON
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
}`,td=`#define TOON
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
}`,nd=`uniform float size;
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
}`,id=`uniform vec3 diffuse;
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
}`,sd=`#include <common>
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
}`,rd=`uniform vec3 color;
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
}`,ad=`uniform float rotation;
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
}`,od=`uniform vec3 diffuse;
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
}`,Tt={alphahash_fragment:Rh,alphahash_pars_fragment:Ch,alphamap_fragment:Ph,alphamap_pars_fragment:Lh,alphatest_fragment:Dh,alphatest_pars_fragment:Ih,aomap_fragment:Fh,aomap_pars_fragment:Nh,batching_pars_vertex:Uh,batching_vertex:Oh,begin_vertex:Bh,beginnormal_vertex:kh,bsdfs:zh,iridescence_fragment:Gh,bumpmap_pars_fragment:Hh,clipping_planes_fragment:Vh,clipping_planes_pars_fragment:Wh,clipping_planes_pars_vertex:Xh,clipping_planes_vertex:jh,color_fragment:qh,color_pars_fragment:Kh,color_pars_vertex:Yh,color_vertex:Jh,common:Zh,cube_uv_reflection_fragment:Qh,defaultnormal_vertex:$h,displacementmap_pars_vertex:eu,displacementmap_vertex:tu,emissivemap_fragment:nu,emissivemap_pars_fragment:iu,colorspace_fragment:su,colorspace_pars_fragment:ru,envmap_fragment:au,envmap_common_pars_fragment:ou,envmap_pars_fragment:cu,envmap_pars_vertex:lu,envmap_physical_pars_fragment:vu,envmap_vertex:hu,fog_vertex:uu,fog_pars_vertex:fu,fog_fragment:du,fog_pars_fragment:pu,gradientmap_pars_fragment:mu,lightmap_pars_fragment:gu,lights_lambert_fragment:bu,lights_lambert_pars_fragment:_u,lights_pars_begin:xu,lights_toon_fragment:Mu,lights_toon_pars_fragment:yu,lights_phong_fragment:Su,lights_phong_pars_fragment:Eu,lights_physical_fragment:Tu,lights_physical_pars_fragment:wu,lights_fragment_begin:Au,lights_fragment_maps:Ru,lights_fragment_end:Cu,logdepthbuf_fragment:Pu,logdepthbuf_pars_fragment:Lu,logdepthbuf_pars_vertex:Du,logdepthbuf_vertex:Iu,map_fragment:Fu,map_pars_fragment:Nu,map_particle_fragment:Uu,map_particle_pars_fragment:Ou,metalnessmap_fragment:Bu,metalnessmap_pars_fragment:ku,morphinstance_vertex:zu,morphcolor_vertex:Gu,morphnormal_vertex:Hu,morphtarget_pars_vertex:Vu,morphtarget_vertex:Wu,normal_fragment_begin:Xu,normal_fragment_maps:ju,normal_pars_fragment:qu,normal_pars_vertex:Ku,normal_vertex:Yu,normalmap_pars_fragment:Ju,clearcoat_normal_fragment_begin:Zu,clearcoat_normal_fragment_maps:Qu,clearcoat_pars_fragment:$u,iridescence_pars_fragment:ef,opaque_fragment:tf,packing:nf,premultiplied_alpha_fragment:sf,project_vertex:rf,dithering_fragment:af,dithering_pars_fragment:of,roughnessmap_fragment:cf,roughnessmap_pars_fragment:lf,shadowmap_pars_fragment:hf,shadowmap_pars_vertex:uf,shadowmap_vertex:ff,shadowmask_pars_fragment:df,skinbase_vertex:pf,skinning_pars_vertex:mf,skinning_vertex:gf,skinnormal_vertex:bf,specularmap_fragment:_f,specularmap_pars_fragment:xf,tonemapping_fragment:vf,tonemapping_pars_fragment:Mf,transmission_fragment:yf,transmission_pars_fragment:Sf,uv_pars_fragment:Ef,uv_pars_vertex:Tf,uv_vertex:wf,worldpos_vertex:Af,background_vert:Rf,background_frag:Cf,backgroundCube_vert:Pf,backgroundCube_frag:Lf,cube_vert:Df,cube_frag:If,depth_vert:Ff,depth_frag:Nf,distanceRGBA_vert:Uf,distanceRGBA_frag:Of,equirect_vert:Bf,equirect_frag:kf,linedashed_vert:zf,linedashed_frag:Gf,meshbasic_vert:Hf,meshbasic_frag:Vf,meshlambert_vert:Wf,meshlambert_frag:Xf,meshmatcap_vert:jf,meshmatcap_frag:qf,meshnormal_vert:Kf,meshnormal_frag:Yf,meshphong_vert:Jf,meshphong_frag:Zf,meshphysical_vert:Qf,meshphysical_frag:$f,meshtoon_vert:ed,meshtoon_frag:td,points_vert:nd,points_frag:id,shadow_vert:sd,shadow_frag:rd,sprite_vert:ad,sprite_frag:od},ze={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Et},alphaMap:{value:null},alphaMapTransform:{value:new Et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Et}},envmap:{envMap:{value:null},envMapRotation:{value:new Et},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Et},normalScale:{value:new Oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Et},alphaTest:{value:0},uvTransform:{value:new Et}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new Oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Et},alphaMap:{value:null},alphaMapTransform:{value:new Et},alphaTest:{value:0}}},ni={basic:{uniforms:wn([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.fog]),vertexShader:Tt.meshbasic_vert,fragmentShader:Tt.meshbasic_frag},lambert:{uniforms:wn([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,ze.lights,{emissive:{value:new Je(0)}}]),vertexShader:Tt.meshlambert_vert,fragmentShader:Tt.meshlambert_frag},phong:{uniforms:wn([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,ze.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30}}]),vertexShader:Tt.meshphong_vert,fragmentShader:Tt.meshphong_frag},standard:{uniforms:wn([ze.common,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.roughnessmap,ze.metalnessmap,ze.fog,ze.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Tt.meshphysical_vert,fragmentShader:Tt.meshphysical_frag},toon:{uniforms:wn([ze.common,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.gradientmap,ze.fog,ze.lights,{emissive:{value:new Je(0)}}]),vertexShader:Tt.meshtoon_vert,fragmentShader:Tt.meshtoon_frag},matcap:{uniforms:wn([ze.common,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,{matcap:{value:null}}]),vertexShader:Tt.meshmatcap_vert,fragmentShader:Tt.meshmatcap_frag},points:{uniforms:wn([ze.points,ze.fog]),vertexShader:Tt.points_vert,fragmentShader:Tt.points_frag},dashed:{uniforms:wn([ze.common,ze.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Tt.linedashed_vert,fragmentShader:Tt.linedashed_frag},depth:{uniforms:wn([ze.common,ze.displacementmap]),vertexShader:Tt.depth_vert,fragmentShader:Tt.depth_frag},normal:{uniforms:wn([ze.common,ze.bumpmap,ze.normalmap,ze.displacementmap,{opacity:{value:1}}]),vertexShader:Tt.meshnormal_vert,fragmentShader:Tt.meshnormal_frag},sprite:{uniforms:wn([ze.sprite,ze.fog]),vertexShader:Tt.sprite_vert,fragmentShader:Tt.sprite_frag},background:{uniforms:{uvTransform:{value:new Et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Tt.background_vert,fragmentShader:Tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Et}},vertexShader:Tt.backgroundCube_vert,fragmentShader:Tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Tt.cube_vert,fragmentShader:Tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Tt.equirect_vert,fragmentShader:Tt.equirect_frag},distanceRGBA:{uniforms:wn([ze.common,ze.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Tt.distanceRGBA_vert,fragmentShader:Tt.distanceRGBA_frag},shadow:{uniforms:wn([ze.lights,ze.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:Tt.shadow_vert,fragmentShader:Tt.shadow_frag}};ni.physical={uniforms:wn([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Et},clearcoatNormalScale:{value:new Oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Et},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Et},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Et},transmissionSamplerSize:{value:new Oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Et},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Et},anisotropyVector:{value:new Oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Et}}]),vertexShader:Tt.meshphysical_vert,fragmentShader:Tt.meshphysical_frag};const gr={r:0,b:0,g:0},Ui=new Gn,cd=new rt;function ld(s,e,t,n,i,r,a){const o=new Je(0);let c=r===!0?0:1,l,u,h=null,f=0,p=null;function g(x){let M=x.isScene===!0?x.background:null;return M&&M.isTexture&&(M=(x.backgroundBlurriness>0?t:e).get(M)),M}function _(x){let M=!1;const b=g(x);b===null?d(o,c):b&&b.isColor&&(d(b,1),M=!0);const D=s.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,a):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(x,M){const b=g(M);b&&(b.isCubeTexture||b.mapping===306)?(u===void 0&&(u=new Ke(new Yt(1,1,1),new Pi({name:"BackgroundCubeMaterial",uniforms:fs(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(D,A,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Ui.copy(M.backgroundRotation),Ui.x*=-1,Ui.y*=-1,Ui.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Ui.y*=-1,Ui.z*=-1),u.material.uniforms.envMap.value=b,u.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(cd.makeRotationFromEuler(Ui)),u.material.toneMapped=Lt.getTransfer(b.colorSpace)!==Vt,(h!==b||f!==b.version||p!==s.toneMapping)&&(u.material.needsUpdate=!0,h=b,f=b.version,p=s.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new Ke(new kn(2,2),new Pi({name:"BackgroundMaterial",uniforms:fs(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Lt.getTransfer(b.colorSpace)!==Vt,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||f!==b.version||p!==s.toneMapping)&&(l.material.needsUpdate=!0,h=b,f=b.version,p=s.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function d(x,M){x.getRGB(gr,rl(s)),n.buffers.color.setClear(gr.r,gr.g,gr.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(x,M=1){o.set(x),c=M,d(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,d(o,c)},render:_,addToRenderList:m}}function hd(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null);let r=i,a=!1;function o(v,F,B,k,Q){let ie=!1;const U=h(k,B,F);r!==U&&(r=U,l(r.object)),ie=p(v,k,B,Q),ie&&g(v,k,B,Q),Q!==null&&e.update(Q,s.ELEMENT_ARRAY_BUFFER),(ie||a)&&(a=!1,b(v,F,B,k),Q!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(Q).buffer))}function c(){return s.createVertexArray()}function l(v){return s.bindVertexArray(v)}function u(v){return s.deleteVertexArray(v)}function h(v,F,B){const k=B.wireframe===!0;let Q=n[v.id];Q===void 0&&(Q={},n[v.id]=Q);let ie=Q[F.id];ie===void 0&&(ie={},Q[F.id]=ie);let U=ie[k];return U===void 0&&(U=f(c()),ie[k]=U),U}function f(v){const F=[],B=[],k=[];for(let Q=0;Q<t;Q++)F[Q]=0,B[Q]=0,k[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:B,attributeDivisors:k,object:v,attributes:{},index:null}}function p(v,F,B,k){const Q=r.attributes,ie=F.attributes;let U=0;const ee=B.getAttributes();for(const Z in ee)if(ee[Z].location>=0){const $=Q[Z];let te=ie[Z];if(te===void 0&&(Z==="instanceMatrix"&&v.instanceMatrix&&(te=v.instanceMatrix),Z==="instanceColor"&&v.instanceColor&&(te=v.instanceColor)),$===void 0||$.attribute!==te||te&&$.data!==te.data)return!0;U++}return r.attributesNum!==U||r.index!==k}function g(v,F,B,k){const Q={},ie=F.attributes;let U=0;const ee=B.getAttributes();for(const Z in ee)if(ee[Z].location>=0){let $=ie[Z];$===void 0&&(Z==="instanceMatrix"&&v.instanceMatrix&&($=v.instanceMatrix),Z==="instanceColor"&&v.instanceColor&&($=v.instanceColor));const te={};te.attribute=$,$&&$.data&&(te.data=$.data),Q[Z]=te,U++}r.attributes=Q,r.attributesNum=U,r.index=k}function _(){const v=r.newAttributes;for(let F=0,B=v.length;F<B;F++)v[F]=0}function m(v){d(v,0)}function d(v,F){const B=r.newAttributes,k=r.enabledAttributes,Q=r.attributeDivisors;B[v]=1,k[v]===0&&(s.enableVertexAttribArray(v),k[v]=1),Q[v]!==F&&(s.vertexAttribDivisor(v,F),Q[v]=F)}function x(){const v=r.newAttributes,F=r.enabledAttributes;for(let B=0,k=F.length;B<k;B++)F[B]!==v[B]&&(s.disableVertexAttribArray(B),F[B]=0)}function M(v,F,B,k,Q,ie,U){U===!0?s.vertexAttribIPointer(v,F,B,Q,ie):s.vertexAttribPointer(v,F,B,k,Q,ie)}function b(v,F,B,k){_();const Q=k.attributes,ie=B.getAttributes(),U=F.defaultAttributeValues;for(const ee in ie){const Z=ie[ee];if(Z.location>=0){let fe=Q[ee];if(fe===void 0&&(ee==="instanceMatrix"&&v.instanceMatrix&&(fe=v.instanceMatrix),ee==="instanceColor"&&v.instanceColor&&(fe=v.instanceColor)),fe!==void 0){const $=fe.normalized,te=fe.itemSize,Ae=e.get(fe);if(Ae===void 0)continue;const We=Ae.buffer,ce=Ae.type,_e=Ae.bytesPerElement,De=ce===s.INT||ce===s.UNSIGNED_INT||fe.gpuType===1013;if(fe.isInterleavedBufferAttribute){const ye=fe.data,Ye=ye.stride,it=fe.offset;if(ye.isInstancedInterleavedBuffer){for(let ht=0;ht<Z.locationSize;ht++)d(Z.location+ht,ye.meshPerAttribute);v.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let ht=0;ht<Z.locationSize;ht++)m(Z.location+ht);s.bindBuffer(s.ARRAY_BUFFER,We);for(let ht=0;ht<Z.locationSize;ht++)M(Z.location+ht,te/Z.locationSize,ce,$,Ye*_e,(it+te/Z.locationSize*ht)*_e,De)}else{if(fe.isInstancedBufferAttribute){for(let ye=0;ye<Z.locationSize;ye++)d(Z.location+ye,fe.meshPerAttribute);v.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ye=0;ye<Z.locationSize;ye++)m(Z.location+ye);s.bindBuffer(s.ARRAY_BUFFER,We);for(let ye=0;ye<Z.locationSize;ye++)M(Z.location+ye,te/Z.locationSize,ce,$,te*_e,te/Z.locationSize*ye*_e,De)}}else if(U!==void 0){const $=U[ee];if($!==void 0)switch($.length){case 2:s.vertexAttrib2fv(Z.location,$);break;case 3:s.vertexAttrib3fv(Z.location,$);break;case 4:s.vertexAttrib4fv(Z.location,$);break;default:s.vertexAttrib1fv(Z.location,$)}}}}x()}function D(){w();for(const v in n){const F=n[v];for(const B in F){const k=F[B];for(const Q in k)u(k[Q].object),delete k[Q];delete F[B]}delete n[v]}}function A(v){if(n[v.id]===void 0)return;const F=n[v.id];for(const B in F){const k=F[B];for(const Q in k)u(k[Q].object),delete k[Q];delete F[B]}delete n[v.id]}function E(v){for(const F in n){const B=n[F];if(B[v.id]===void 0)continue;const k=B[v.id];for(const Q in k)u(k[Q].object),delete k[Q];delete B[v.id]}}function w(){y(),a=!0,r!==i&&(r=i,l(r.object))}function y(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:w,resetDefaultState:y,dispose:D,releaseStatesOfGeometry:A,releaseStatesOfProgram:E,initAttributes:_,enableAttribute:m,disableUnusedAttributes:x}}function ud(s,e,t){let n;function i(l){n=l}function r(l,u){s.drawArrays(n,l,u),t.update(u,n,1)}function a(l,u,h){h!==0&&(s.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function o(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let p=0;for(let g=0;g<h;g++)p+=u[g];t.update(p,n,1)}function c(l,u,h,f){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)a(l[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*f[_];t.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function fd(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(E){return!(E!==1023&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){const w=E===1016&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==1009&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==1015&&!w)}function c(E){if(E==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),d=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),D=g>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:b,vertexTextures:D,maxSamples:A}}function dd(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new Ai,o=new Et,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||n!==0||i;return i=f,n=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,p){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,d=s.get(h);if(!i||g===null||g.length===0||r&&!m)r?u(null):l();else{const x=r?0:n,M=x*4;let b=d.clippingState||null;c.value=b,b=u(g,f,M,p);for(let D=0;D!==M;++D)b[D]=t[D];d.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,p,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const d=p+_*4,x=f.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<d)&&(m=new Float32Array(d));for(let M=0,b=p;M!==_;++M,b+=4)a.copy(h[M]).applyMatrix4(x,o),a.normal.toArray(m,b),m[b+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function pd(s){let e=new WeakMap;function t(a,o){return o===303?a.mapping=301:o===304&&(a.mapping=302),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===303||o===304)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Eh(c.height);return l.fromEquirectangularTexture(s,a),e.set(a,l),a.addEventListener("dispose",i),t(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Gr extends al{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const cs=4,Bo=[.125,.215,.35,.446,.526,.582],Hi=20,pa=new Gr,ko=new Je;let ma=null,ga=0,ba=0,_a=!1;const Gi=(1+Math.sqrt(5))/2,ns=1/Gi,zo=[new N(-Gi,ns,0),new N(Gi,ns,0),new N(-ns,0,Gi),new N(ns,0,Gi),new N(0,Gi,-ns),new N(0,Gi,ns),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class Go{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){ma=this._renderer.getRenderTarget(),ga=this._renderer.getActiveCubeFace(),ba=this._renderer.getActiveMipmapLevel(),_a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ma,ga,ba),this._renderer.xr.enabled=_a,e.scissorTest=!1,br(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ma=this._renderer.getRenderTarget(),ga=this._renderer.getActiveCubeFace(),ba=this._renderer.getActiveMipmapLevel(),_a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:An,depthBuffer:!1},i=Ho(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ho(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=md(r)),this._blurMaterial=gd(r,e,t)}return i}_compileMaterial(e){const t=new Ke(this._lodPlanes[0],e);this._renderer.compile(t,pa)}_sceneToCubeUV(e,t,n,i){const o=new Ln(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(ko),u.toneMapping=0,u.autoClear=!1;const p=new pn({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),g=new Ke(new Yt,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(ko),_=!0);for(let d=0;d<6;d++){const x=d%3;x===0?(o.up.set(0,c[d],0),o.lookAt(l[d],0,0)):x===1?(o.up.set(0,0,c[d]),o.lookAt(0,l[d],0)):(o.up.set(0,c[d],0),o.lookAt(0,0,l[d]));const M=this._cubeSize;br(i,x*M,d>2?M:0,M,M),u.setRenderTarget(i),_&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===301||e.mapping===302;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vo());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new Ke(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;br(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,pa)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=zo[(i-r-1)%zo.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Ke(this._lodPlanes[i],l),f=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Hi-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):Hi;m>Hi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Hi}`);const d=[];let x=0;for(let E=0;E<Hi;++E){const w=E/_,y=Math.exp(-w*w/2);d.push(y),E===0?x+=y:E<m&&(x+=2*y)}for(let E=0;E<d.length;E++)d[E]=d[E]/x;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-n;const b=this._sizeLods[i],D=3*b*(i>M-cs?i-M+cs:0),A=4*(this._cubeSize-b);br(t,D,A,3*b,2*b),c.setRenderTarget(t),c.render(h,pa)}}function md(s){const e=[],t=[],n=[];let i=s;const r=s-cs+1+Bo.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let c=1/o;a>s-cs?c=Bo[a-s+cs-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,_=3,m=2,d=1,x=new Float32Array(_*g*p),M=new Float32Array(m*g*p),b=new Float32Array(d*g*p);for(let A=0;A<p;A++){const E=A%3*2/3-1,w=A>2?0:-1,y=[E,w,0,E+2/3,w,0,E+2/3,w+1,0,E,w,0,E+2/3,w+1,0,E,w+1,0];x.set(y,_*g*A),M.set(f,m*g*A);const v=[A,A,A,A,A,A];b.set(v,d*g*A)}const D=new Wt;D.setAttribute("position",new Ht(x,_)),D.setAttribute("uv",new Ht(M,m)),D.setAttribute("faceIndex",new Ht(b,d)),e.push(D),i>cs&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ho(s,e,t){const n=new Ci(s,e,t);return n.texture.mapping=306,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function br(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function gd(s,e,t){const n=new Float32Array(Hi),i=new N(0,1,0);return new Pi({name:"SphericalGaussianBlur",defines:{n:Hi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:eo(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Vo(){return new Pi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:eo(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Wo(){return new Pi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function eo(){return`

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
	`}function bd(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===303||c===304,u=c===301||c===302;if(l||u){let h=e.get(o);const f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new Go(s)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const p=o.image;return l&&p&&p.height>0||u&&p&&i(p)?(t===null&&(t=new Go(s)),h=l?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function i(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function _d(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Ns("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function xd(s,e,t,n){const i={},r=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,d=_.length;m<d;m++)e.remove(_[m])}f.removeEventListener("dispose",a),delete i[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,t.memory.geometries++),f}function c(h){const f=h.attributes;for(const g in f)e.update(f[g],s.ARRAY_BUFFER);const p=h.morphAttributes;for(const g in p){const _=p[g];for(let m=0,d=_.length;m<d;m++)e.update(_[m],s.ARRAY_BUFFER)}}function l(h){const f=[],p=h.index,g=h.attributes.position;let _=0;if(p!==null){const x=p.array;_=p.version;for(let M=0,b=x.length;M<b;M+=3){const D=x[M+0],A=x[M+1],E=x[M+2];f.push(D,A,A,E,E,D)}}else if(g!==void 0){const x=g.array;_=g.version;for(let M=0,b=x.length/3-1;M<b;M+=3){const D=M+0,A=M+1,E=M+2;f.push(D,A,A,E,E,D)}}else return;const m=new(Qc(f)?sl:il)(f,1);m.version=_;const d=r.get(h);d&&e.remove(d),r.set(h,m)}function u(h){const f=r.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function vd(s,e,t){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,p){s.drawElements(n,p,r,f*a),t.update(p,n,1)}function l(f,p,g){g!==0&&(s.drawElementsInstanced(n,p,r,f*a,g),t.update(p,n,g))}function u(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];t.update(m,n,1)}function h(f,p,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)l(f[d]/a,p[d],_[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,_,0,g);let d=0;for(let x=0;x<g;x++)d+=p[x]*_[x];t.update(d,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Md(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function yd(s,e,t){const n=new WeakMap,i=new Dt;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(o);if(f===void 0||f.count!==h){let y=function(){E.dispose(),n.delete(o),o.removeEventListener("dispose",y)};f!==void 0&&f.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let M=0;p===!0&&(M=1),g===!0&&(M=2),_===!0&&(M=3);let b=o.attributes.position.count*M,D=1;b>e.maxTextureSize&&(D=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const A=new Float32Array(b*D*4*h),E=new el(A,b,D,h);E.type=1015,E.needsUpdate=!0;const w=M*4;for(let v=0;v<h;v++){const F=m[v],B=d[v],k=x[v],Q=b*D*4*v;for(let ie=0;ie<F.count;ie++){const U=ie*w;p===!0&&(i.fromBufferAttribute(F,ie),A[Q+U+0]=i.x,A[Q+U+1]=i.y,A[Q+U+2]=i.z,A[Q+U+3]=0),g===!0&&(i.fromBufferAttribute(B,ie),A[Q+U+4]=i.x,A[Q+U+5]=i.y,A[Q+U+6]=i.z,A[Q+U+7]=0),_===!0&&(i.fromBufferAttribute(k,ie),A[Q+U+8]=i.x,A[Q+U+9]=i.y,A[Q+U+10]=i.z,A[Q+U+11]=k.itemSize===4?i.w:1)}}f={count:h,texture:E,size:new Oe(b,D)},n.set(o,f),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let p=0;for(let _=0;_<l.length;_++)p+=l[_];const g=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(s,"morphTargetBaseInfluence",g),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function Sd(s,e,t,n){let i=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(i.get(h)!==l&&(e.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return h}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}class ll extends an{constructor(e,t,n,i,r,a,o,c,l,u=1026){if(u!==1026&&u!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===1026&&(n=1014),n===void 0&&u===1027&&(n=1020),super(null,i,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:1003,this.minFilter=c!==void 0?c:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const hl=new an,Xo=new ll(1,1),ul=new el,fl=new ch,dl=new ol,jo=[],qo=[],Ko=new Float32Array(16),Yo=new Float32Array(9),Jo=new Float32Array(4);function bs(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=jo[i];if(r===void 0&&(r=new Float32Array(i),jo[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function hn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function un(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Hr(s,e){let t=qo[e];t===void 0&&(t=new Int32Array(e),qo[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Ed(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Td(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;s.uniform2fv(this.addr,e),un(t,e)}}function wd(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(hn(t,e))return;s.uniform3fv(this.addr,e),un(t,e)}}function Ad(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;s.uniform4fv(this.addr,e),un(t,e)}}function Rd(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(hn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),un(t,e)}else{if(hn(t,n))return;Jo.set(n),s.uniformMatrix2fv(this.addr,!1,Jo),un(t,n)}}function Cd(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(hn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),un(t,e)}else{if(hn(t,n))return;Yo.set(n),s.uniformMatrix3fv(this.addr,!1,Yo),un(t,n)}}function Pd(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(hn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),un(t,e)}else{if(hn(t,n))return;Ko.set(n),s.uniformMatrix4fv(this.addr,!1,Ko),un(t,n)}}function Ld(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Dd(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;s.uniform2iv(this.addr,e),un(t,e)}}function Id(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(hn(t,e))return;s.uniform3iv(this.addr,e),un(t,e)}}function Fd(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;s.uniform4iv(this.addr,e),un(t,e)}}function Nd(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Ud(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;s.uniform2uiv(this.addr,e),un(t,e)}}function Od(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(hn(t,e))return;s.uniform3uiv(this.addr,e),un(t,e)}}function Bd(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;s.uniform4uiv(this.addr,e),un(t,e)}}function kd(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Xo.compareFunction=515,r=Xo):r=hl,t.setTexture2D(e||r,i)}function zd(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||fl,i)}function Gd(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||dl,i)}function Hd(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||ul,i)}function Vd(s){switch(s){case 5126:return Ed;case 35664:return Td;case 35665:return wd;case 35666:return Ad;case 35674:return Rd;case 35675:return Cd;case 35676:return Pd;case 5124:case 35670:return Ld;case 35667:case 35671:return Dd;case 35668:case 35672:return Id;case 35669:case 35673:return Fd;case 5125:return Nd;case 36294:return Ud;case 36295:return Od;case 36296:return Bd;case 35678:case 36198:case 36298:case 36306:case 35682:return kd;case 35679:case 36299:case 36307:return zd;case 35680:case 36300:case 36308:case 36293:return Gd;case 36289:case 36303:case 36311:case 36292:return Hd}}function Wd(s,e){s.uniform1fv(this.addr,e)}function Xd(s,e){const t=bs(e,this.size,2);s.uniform2fv(this.addr,t)}function jd(s,e){const t=bs(e,this.size,3);s.uniform3fv(this.addr,t)}function qd(s,e){const t=bs(e,this.size,4);s.uniform4fv(this.addr,t)}function Kd(s,e){const t=bs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Yd(s,e){const t=bs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Jd(s,e){const t=bs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Zd(s,e){s.uniform1iv(this.addr,e)}function Qd(s,e){s.uniform2iv(this.addr,e)}function $d(s,e){s.uniform3iv(this.addr,e)}function ep(s,e){s.uniform4iv(this.addr,e)}function tp(s,e){s.uniform1uiv(this.addr,e)}function np(s,e){s.uniform2uiv(this.addr,e)}function ip(s,e){s.uniform3uiv(this.addr,e)}function sp(s,e){s.uniform4uiv(this.addr,e)}function rp(s,e,t){const n=this.cache,i=e.length,r=Hr(t,i);hn(n,r)||(s.uniform1iv(this.addr,r),un(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||hl,r[a])}function ap(s,e,t){const n=this.cache,i=e.length,r=Hr(t,i);hn(n,r)||(s.uniform1iv(this.addr,r),un(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||fl,r[a])}function op(s,e,t){const n=this.cache,i=e.length,r=Hr(t,i);hn(n,r)||(s.uniform1iv(this.addr,r),un(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||dl,r[a])}function cp(s,e,t){const n=this.cache,i=e.length,r=Hr(t,i);hn(n,r)||(s.uniform1iv(this.addr,r),un(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||ul,r[a])}function lp(s){switch(s){case 5126:return Wd;case 35664:return Xd;case 35665:return jd;case 35666:return qd;case 35674:return Kd;case 35675:return Yd;case 35676:return Jd;case 5124:case 35670:return Zd;case 35667:case 35671:return Qd;case 35668:case 35672:return $d;case 35669:case 35673:return ep;case 5125:return tp;case 36294:return np;case 36295:return ip;case 36296:return sp;case 35678:case 36198:case 36298:case 36306:case 35682:return rp;case 35679:case 36299:case 36307:return ap;case 35680:case 36300:case 36308:case 36293:return op;case 36289:case 36303:case 36311:case 36292:return cp}}class hp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Vd(t.type)}}class up{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=lp(t.type)}}class fp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const xa=/(\w+)(\])?(\[|\.)?/g;function Zo(s,e){s.seq.push(e),s.map[e.id]=e}function dp(s,e,t){const n=s.name,i=n.length;for(xa.lastIndex=0;;){const r=xa.exec(n),a=xa.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){Zo(t,l===void 0?new hp(o,s,e):new up(o,s,e));break}else{let h=t.map[o];h===void 0&&(h=new fp(o),Zo(t,h)),t=h}}}class Nr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);dp(r,a,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Qo(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const pp=37297;let mp=0;function gp(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const $o=new Et;function bp(s){Lt._getMatrix($o,Lt.workingColorSpace,s);const e=`mat3( ${$o.elements.map(t=>t.toFixed(4))} )`;switch(Lt.getTransfer(s)){case kr:return[e,"LinearTransferOETF"];case Vt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function ec(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+gp(s.getShaderSource(e),a)}else return i}function _p(s,e){const t=bp(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function xp(s,e){let t;switch(e){case 1:t="Linear";break;case 2:t="Reinhard";break;case 3:t="Cineon";break;case 4:t="ACESFilmic";break;case 6:t="AgX";break;case 7:t="Neutral";break;case 5:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const _r=new N;function vp(){Lt.getLuminanceCoefficients(_r);const s=_r.x.toFixed(4),e=_r.y.toFixed(4),t=_r.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Mp(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Us).join(`
`)}function yp(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Sp(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Us(s){return s!==""}function tc(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function nc(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ep=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ha(s){return s.replace(Ep,wp)}const Tp=new Map;function wp(s,e){let t=Tt[e];if(t===void 0){const n=Tp.get(e);if(n!==void 0)t=Tt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ha(t)}const Ap=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ic(s){return s.replace(Ap,Rp)}function Rp(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function sc(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function Cp(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===1?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===2?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===3&&(e="SHADOWMAP_TYPE_VSM"),e}function Pp(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case 301:case 302:e="ENVMAP_TYPE_CUBE";break;case 306:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Lp(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case 302:e="ENVMAP_MODE_REFRACTION";break}return e}function Dp(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case 0:e="ENVMAP_BLENDING_MULTIPLY";break;case 1:e="ENVMAP_BLENDING_MIX";break;case 2:e="ENVMAP_BLENDING_ADD";break}return e}function Ip(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Fp(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Cp(t),l=Pp(t),u=Lp(t),h=Dp(t),f=Ip(t),p=Mp(t),g=yp(r),_=i.createProgram();let m,d,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Us).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Us).join(`
`),d.length>0&&(d+=`
`)):(m=[sc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Us).join(`
`),d=[sc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?Tt.tonemapping_pars_fragment:"",t.toneMapping!==0?xp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Tt.colorspace_pars_fragment,_p("linearToOutputTexel",t.outputColorSpace),vp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Us).join(`
`)),a=Ha(a),a=tc(a,t),a=nc(a,t),o=Ha(o),o=tc(o,t),o=nc(o,t),a=ic(a),o=ic(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===go?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===go?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const M=x+m+a,b=x+d+o,D=Qo(i,i.VERTEX_SHADER,M),A=Qo(i,i.FRAGMENT_SHADER,b);i.attachShader(_,D),i.attachShader(_,A),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function E(F){if(s.debug.checkShaderErrors){const B=i.getProgramInfoLog(_).trim(),k=i.getShaderInfoLog(D).trim(),Q=i.getShaderInfoLog(A).trim();let ie=!0,U=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(ie=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,D,A);else{const ee=ec(i,D,"vertex"),Z=ec(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+B+`
`+ee+`
`+Z)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(k===""||Q==="")&&(U=!1);U&&(F.diagnostics={runnable:ie,programLog:B,vertexShader:{log:k,prefix:m},fragmentShader:{log:Q,prefix:d}})}i.deleteShader(D),i.deleteShader(A),w=new Nr(i,_),y=Sp(i,_)}let w;this.getUniforms=function(){return w===void 0&&E(this),w};let y;this.getAttributes=function(){return y===void 0&&E(this),y};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=i.getProgramParameter(_,pp)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=mp++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=D,this.fragmentShader=A,this}let Np=0;class Up{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Op(e),t.set(e,n)),n}}class Op{constructor(e){this.id=Np++,this.code=e,this.usedTimes=0}}function Bp(s,e,t,n,i,r,a){const o=new tl,c=new Up,l=new Set,u=[],h=i.logarithmicDepthBuffer,f=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return l.add(y),y===0?"uv":`uv${y}`}function m(y,v,F,B,k){const Q=B.fog,ie=k.geometry,U=y.isMeshStandardMaterial?B.environment:null,ee=(y.isMeshStandardMaterial?t:e).get(y.envMap||U),Z=ee&&ee.mapping===306?ee.image.height:null,fe=g[y.type];y.precision!==null&&(p=i.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const $=ie.morphAttributes.position||ie.morphAttributes.normal||ie.morphAttributes.color,te=$!==void 0?$.length:0;let Ae=0;ie.morphAttributes.position!==void 0&&(Ae=1),ie.morphAttributes.normal!==void 0&&(Ae=2),ie.morphAttributes.color!==void 0&&(Ae=3);let We,ce,_e,De;if(fe){const St=ni[fe];We=St.vertexShader,ce=St.fragmentShader}else We=y.vertexShader,ce=y.fragmentShader,c.update(y),_e=c.getVertexShaderID(y),De=c.getFragmentShaderID(y);const ye=s.getRenderTarget(),Ye=s.state.buffers.depth.getReversed(),it=k.isInstancedMesh===!0,ht=k.isBatchedMesh===!0,_t=!!y.map,ft=!!y.matcap,xt=!!ee,W=!!y.aoMap,kt=!!y.lightMap,ct=!!y.bumpMap,at=!!y.normalMap,st=!!y.displacementMap,wt=!!y.emissiveMap,Qe=!!y.metalnessMap,I=!!y.roughnessMap,S=y.anisotropy>0,Y=y.clearcoat>0,be=y.dispersion>0,de=y.iridescence>0,he=y.sheen>0,Ge=y.transmission>0,we=S&&!!y.anisotropyMap,Ne=Y&&!!y.clearcoatMap,vt=Y&&!!y.clearcoatNormalMap,z=Y&&!!y.clearcoatRoughnessMap,je=de&&!!y.iridescenceMap,et=de&&!!y.iridescenceThicknessMap,$e=he&&!!y.sheenColorMap,He=he&&!!y.sheenRoughnessMap,yt=!!y.specularMap,gt=!!y.specularColorMap,It=!!y.specularIntensityMap,G=Ge&&!!y.transmissionMap,Re=Ge&&!!y.thicknessMap,ae=!!y.gradientMap,xe=!!y.alphaMap,Ce=y.alphaTest>0,Ie=!!y.alphaHash,Ve=!!y.extensions;let Bt=0;y.toneMapped&&(ye===null||ye.isXRRenderTarget===!0)&&(Bt=s.toneMapping);const Xt={shaderID:fe,shaderType:y.type,shaderName:y.name,vertexShader:We,fragmentShader:ce,defines:y.defines,customVertexShaderID:_e,customFragmentShaderID:De,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:ht,batchingColor:ht&&k._colorsTexture!==null,instancing:it,instancingColor:it&&k.instanceColor!==null,instancingMorph:it&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ye===null?s.outputColorSpace:ye.isXRRenderTarget===!0?ye.texture.colorSpace:An,alphaToCoverage:!!y.alphaToCoverage,map:_t,matcap:ft,envMap:xt,envMapMode:xt&&ee.mapping,envMapCubeUVHeight:Z,aoMap:W,lightMap:kt,bumpMap:ct,normalMap:at,displacementMap:f&&st,emissiveMap:wt,normalMapObjectSpace:at&&y.normalMapType===1,normalMapTangentSpace:at&&y.normalMapType===0,metalnessMap:Qe,roughnessMap:I,anisotropy:S,anisotropyMap:we,clearcoat:Y,clearcoatMap:Ne,clearcoatNormalMap:vt,clearcoatRoughnessMap:z,dispersion:be,iridescence:de,iridescenceMap:je,iridescenceThicknessMap:et,sheen:he,sheenColorMap:$e,sheenRoughnessMap:He,specularMap:yt,specularColorMap:gt,specularIntensityMap:It,transmission:Ge,transmissionMap:G,thicknessMap:Re,gradientMap:ae,opaque:y.transparent===!1&&y.blending===1&&y.alphaToCoverage===!1,alphaMap:xe,alphaTest:Ce,alphaHash:Ie,combine:y.combine,mapUv:_t&&_(y.map.channel),aoMapUv:W&&_(y.aoMap.channel),lightMapUv:kt&&_(y.lightMap.channel),bumpMapUv:ct&&_(y.bumpMap.channel),normalMapUv:at&&_(y.normalMap.channel),displacementMapUv:st&&_(y.displacementMap.channel),emissiveMapUv:wt&&_(y.emissiveMap.channel),metalnessMapUv:Qe&&_(y.metalnessMap.channel),roughnessMapUv:I&&_(y.roughnessMap.channel),anisotropyMapUv:we&&_(y.anisotropyMap.channel),clearcoatMapUv:Ne&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:vt&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:z&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:je&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:et&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:$e&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:He&&_(y.sheenRoughnessMap.channel),specularMapUv:yt&&_(y.specularMap.channel),specularColorMapUv:gt&&_(y.specularColorMap.channel),specularIntensityMapUv:It&&_(y.specularIntensityMap.channel),transmissionMapUv:G&&_(y.transmissionMap.channel),thicknessMapUv:Re&&_(y.thicknessMap.channel),alphaMapUv:xe&&_(y.alphaMap.channel),vertexTangents:!!ie.attributes.tangent&&(at||S),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!ie.attributes.color&&ie.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!ie.attributes.uv&&(_t||xe),fog:!!Q,useFog:y.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Ye,skinning:k.isSkinnedMesh===!0,morphTargets:ie.morphAttributes.position!==void 0,morphNormals:ie.morphAttributes.normal!==void 0,morphColors:ie.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:Ae,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&F.length>0,shadowMapType:s.shadowMap.type,toneMapping:Bt,decodeVideoTexture:_t&&y.map.isVideoTexture===!0&&Lt.getTransfer(y.map.colorSpace)===Vt,decodeVideoTextureEmissive:wt&&y.emissiveMap.isVideoTexture===!0&&Lt.getTransfer(y.emissiveMap.colorSpace)===Vt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===2,flipSided:y.side===1,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Ve&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ve&&y.extensions.multiDraw===!0||ht)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Xt.vertexUv1s=l.has(1),Xt.vertexUv2s=l.has(2),Xt.vertexUv3s=l.has(3),l.clear(),Xt}function d(y){const v=[];if(y.shaderID?v.push(y.shaderID):(v.push(y.customVertexShaderID),v.push(y.customFragmentShaderID)),y.defines!==void 0)for(const F in y.defines)v.push(F),v.push(y.defines[F]);return y.isRawShaderMaterial===!1&&(x(v,y),M(v,y),v.push(s.outputColorSpace)),v.push(y.customProgramCacheKey),v.join()}function x(y,v){y.push(v.precision),y.push(v.outputColorSpace),y.push(v.envMapMode),y.push(v.envMapCubeUVHeight),y.push(v.mapUv),y.push(v.alphaMapUv),y.push(v.lightMapUv),y.push(v.aoMapUv),y.push(v.bumpMapUv),y.push(v.normalMapUv),y.push(v.displacementMapUv),y.push(v.emissiveMapUv),y.push(v.metalnessMapUv),y.push(v.roughnessMapUv),y.push(v.anisotropyMapUv),y.push(v.clearcoatMapUv),y.push(v.clearcoatNormalMapUv),y.push(v.clearcoatRoughnessMapUv),y.push(v.iridescenceMapUv),y.push(v.iridescenceThicknessMapUv),y.push(v.sheenColorMapUv),y.push(v.sheenRoughnessMapUv),y.push(v.specularMapUv),y.push(v.specularColorMapUv),y.push(v.specularIntensityMapUv),y.push(v.transmissionMapUv),y.push(v.thicknessMapUv),y.push(v.combine),y.push(v.fogExp2),y.push(v.sizeAttenuation),y.push(v.morphTargetsCount),y.push(v.morphAttributeCount),y.push(v.numDirLights),y.push(v.numPointLights),y.push(v.numSpotLights),y.push(v.numSpotLightMaps),y.push(v.numHemiLights),y.push(v.numRectAreaLights),y.push(v.numDirLightShadows),y.push(v.numPointLightShadows),y.push(v.numSpotLightShadows),y.push(v.numSpotLightShadowsWithMaps),y.push(v.numLightProbes),y.push(v.shadowMapType),y.push(v.toneMapping),y.push(v.numClippingPlanes),y.push(v.numClipIntersection),y.push(v.depthPacking)}function M(y,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),y.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reverseDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.decodeVideoTextureEmissive&&o.enable(20),v.alphaToCoverage&&o.enable(21),y.push(o.mask)}function b(y){const v=g[y.type];let F;if(v){const B=ni[v];F=vh.clone(B.uniforms)}else F=y.uniforms;return F}function D(y,v){let F;for(let B=0,k=u.length;B<k;B++){const Q=u[B];if(Q.cacheKey===v){F=Q,++F.usedTimes;break}}return F===void 0&&(F=new Fp(s,v,y,r),u.push(F)),F}function A(y){if(--y.usedTimes===0){const v=u.indexOf(y);u[v]=u[u.length-1],u.pop(),y.destroy()}}function E(y){c.remove(y)}function w(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:b,acquireProgram:D,releaseProgram:A,releaseShaderCache:E,programs:u,dispose:w}}function kp(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function zp(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function rc(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function ac(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(h,f,p,g,_,m){let d=s[e];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},s[e]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=_,d.group=m),e++,d}function o(h,f,p,g,_,m){const d=a(h,f,p,g,_,m);p.transmission>0?n.push(d):p.transparent===!0?i.push(d):t.push(d)}function c(h,f,p,g,_,m){const d=a(h,f,p,g,_,m);p.transmission>0?n.unshift(d):p.transparent===!0?i.unshift(d):t.unshift(d)}function l(h,f){t.length>1&&t.sort(h||zp),n.length>1&&n.sort(f||rc),i.length>1&&i.sort(f||rc)}function u(){for(let h=e,f=s.length;h<f;h++){const p=s[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:c,finish:u,sort:l}}function Gp(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new ac,s.set(n,[a])):i>=r.length?(a=new ac,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Hp(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new Je};break;case"SpotLight":t={position:new N,direction:new N,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new N,halfWidth:new N,halfHeight:new N};break}return s[e.id]=t,t}}}function Vp(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Wp=0;function Xp(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function jp(s){const e=new Hp,t=Vp(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);const i=new N,r=new rt,a=new rt;function o(l){let u=0,h=0,f=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,x=0,M=0,b=0,D=0,A=0,E=0;l.sort(Xp);for(let y=0,v=l.length;y<v;y++){const F=l[y],B=F.color,k=F.intensity,Q=F.distance,ie=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)u+=B.r*k,h+=B.g*k,f+=B.b*k;else if(F.isLightProbe){for(let U=0;U<9;U++)n.probe[U].addScaledVector(F.sh.coefficients[U],k);E++}else if(F.isDirectionalLight){const U=e.get(F);if(U.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const ee=F.shadow,Z=t.get(F);Z.shadowIntensity=ee.intensity,Z.shadowBias=ee.bias,Z.shadowNormalBias=ee.normalBias,Z.shadowRadius=ee.radius,Z.shadowMapSize=ee.mapSize,n.directionalShadow[p]=Z,n.directionalShadowMap[p]=ie,n.directionalShadowMatrix[p]=F.shadow.matrix,x++}n.directional[p]=U,p++}else if(F.isSpotLight){const U=e.get(F);U.position.setFromMatrixPosition(F.matrixWorld),U.color.copy(B).multiplyScalar(k),U.distance=Q,U.coneCos=Math.cos(F.angle),U.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),U.decay=F.decay,n.spot[_]=U;const ee=F.shadow;if(F.map&&(n.spotLightMap[D]=F.map,D++,ee.updateMatrices(F),F.castShadow&&A++),n.spotLightMatrix[_]=ee.matrix,F.castShadow){const Z=t.get(F);Z.shadowIntensity=ee.intensity,Z.shadowBias=ee.bias,Z.shadowNormalBias=ee.normalBias,Z.shadowRadius=ee.radius,Z.shadowMapSize=ee.mapSize,n.spotShadow[_]=Z,n.spotShadowMap[_]=ie,b++}_++}else if(F.isRectAreaLight){const U=e.get(F);U.color.copy(B).multiplyScalar(k),U.halfWidth.set(F.width*.5,0,0),U.halfHeight.set(0,F.height*.5,0),n.rectArea[m]=U,m++}else if(F.isPointLight){const U=e.get(F);if(U.color.copy(F.color).multiplyScalar(F.intensity),U.distance=F.distance,U.decay=F.decay,F.castShadow){const ee=F.shadow,Z=t.get(F);Z.shadowIntensity=ee.intensity,Z.shadowBias=ee.bias,Z.shadowNormalBias=ee.normalBias,Z.shadowRadius=ee.radius,Z.shadowMapSize=ee.mapSize,Z.shadowCameraNear=ee.camera.near,Z.shadowCameraFar=ee.camera.far,n.pointShadow[g]=Z,n.pointShadowMap[g]=ie,n.pointShadowMatrix[g]=F.shadow.matrix,M++}n.point[g]=U,g++}else if(F.isHemisphereLight){const U=e.get(F);U.skyColor.copy(F.color).multiplyScalar(k),U.groundColor.copy(F.groundColor).multiplyScalar(k),n.hemi[d]=U,d++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ze.LTC_FLOAT_1,n.rectAreaLTC2=ze.LTC_FLOAT_2):(n.rectAreaLTC1=ze.LTC_HALF_1,n.rectAreaLTC2=ze.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const w=n.hash;(w.directionalLength!==p||w.pointLength!==g||w.spotLength!==_||w.rectAreaLength!==m||w.hemiLength!==d||w.numDirectionalShadows!==x||w.numPointShadows!==M||w.numSpotShadows!==b||w.numSpotMaps!==D||w.numLightProbes!==E)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=b+D-A,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=E,w.directionalLength=p,w.pointLength=g,w.spotLength=_,w.rectAreaLength=m,w.hemiLength=d,w.numDirectionalShadows=x,w.numPointShadows=M,w.numSpotShadows=b,w.numSpotMaps=D,w.numLightProbes=E,n.version=Wp++)}function c(l,u){let h=0,f=0,p=0,g=0,_=0;const m=u.matrixWorldInverse;for(let d=0,x=l.length;d<x;d++){const M=l[d];if(M.isDirectionalLight){const b=n.directional[h];b.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(m),h++}else if(M.isSpotLight){const b=n.spot[p];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const b=n.rectArea[g];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),b.halfWidth.set(M.width*.5,0,0),b.halfHeight.set(0,M.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const b=n.point[f];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const b=n.hemi[_];b.direction.setFromMatrixPosition(M.matrixWorld),b.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:n}}function oc(s){const e=new jp(s),t=[],n=[];function i(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function qp(s){let e=new WeakMap;function t(i,r=0){const a=e.get(i);let o;return a===void 0?(o=new oc(s),e.set(i,[o])):r>=a.length?(o=new oc(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class Kp extends qn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Yp extends qn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Jp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Zp=`uniform sampler2D shadow_pass;
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
}`;function Qp(s,e,t){let n=new $a;const i=new Oe,r=new Oe,a=new Dt,o=new Kp({depthPacking:3201}),c=new Yp,l={},u=t.maxTextureSize,h={0:1,1:0,2:2},f=new Pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Oe},radius:{value:4}},vertexShader:Jp,fragmentShader:Zp}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new Wt;g.setAttribute("position",new Ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ke(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let d=this.type;this.render=function(A,E,w){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const y=s.getRenderTarget(),v=s.getActiveCubeFace(),F=s.getActiveMipmapLevel(),B=s.state;B.setBlending(0),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const k=d!==3&&this.type===3,Q=d===3&&this.type!==3;for(let ie=0,U=A.length;ie<U;ie++){const ee=A[ie],Z=ee.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;i.copy(Z.mapSize);const fe=Z.getFrameExtents();if(i.multiply(fe),r.copy(Z.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/fe.x),i.x=r.x*fe.x,Z.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/fe.y),i.y=r.y*fe.y,Z.mapSize.y=r.y)),Z.map===null||k===!0||Q===!0){const te=this.type!==3?{minFilter:1003,magFilter:1003}:{};Z.map!==null&&Z.map.dispose(),Z.map=new Ci(i.x,i.y,te),Z.map.texture.name=ee.name+".shadowMap",Z.camera.updateProjectionMatrix()}s.setRenderTarget(Z.map),s.clear();const $=Z.getViewportCount();for(let te=0;te<$;te++){const Ae=Z.getViewport(te);a.set(r.x*Ae.x,r.y*Ae.y,r.x*Ae.z,r.y*Ae.w),B.viewport(a),Z.updateMatrices(ee,te),n=Z.getFrustum(),b(E,w,Z.camera,ee,this.type)}Z.isPointLightShadow!==!0&&this.type===3&&x(Z,w),Z.needsUpdate=!1}d=this.type,m.needsUpdate=!1,s.setRenderTarget(y,v,F)};function x(A,E){const w=e.update(_);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Ci(i.x,i.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(E,null,w,f,_,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(E,null,w,p,_,null)}function M(A,E,w,y){let v=null;const F=w.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(F!==void 0)v=F;else if(v=w.isPointLight===!0?c:o,s.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const B=v.uuid,k=E.uuid;let Q=l[B];Q===void 0&&(Q={},l[B]=Q);let ie=Q[k];ie===void 0&&(ie=v.clone(),Q[k]=ie,E.addEventListener("dispose",D)),v=ie}if(v.visible=E.visible,v.wireframe=E.wireframe,y===3?v.side=E.shadowSide!==null?E.shadowSide:E.side:v.side=E.shadowSide!==null?E.shadowSide:h[E.side],v.alphaMap=E.alphaMap,v.alphaTest=E.alphaTest,v.map=E.map,v.clipShadows=E.clipShadows,v.clippingPlanes=E.clippingPlanes,v.clipIntersection=E.clipIntersection,v.displacementMap=E.displacementMap,v.displacementScale=E.displacementScale,v.displacementBias=E.displacementBias,v.wireframeLinewidth=E.wireframeLinewidth,v.linewidth=E.linewidth,w.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const B=s.properties.get(v);B.light=w}return v}function b(A,E,w,y,v){if(A.visible===!1)return;if(A.layers.test(E.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&v===3)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,A.matrixWorld);const k=e.update(A),Q=A.material;if(Array.isArray(Q)){const ie=k.groups;for(let U=0,ee=ie.length;U<ee;U++){const Z=ie[U],fe=Q[Z.materialIndex];if(fe&&fe.visible){const $=M(A,fe,y,v);A.onBeforeShadow(s,A,E,w,k,$,Z),s.renderBufferDirect(w,null,k,$,A,Z),A.onAfterShadow(s,A,E,w,k,$,Z)}}}else if(Q.visible){const ie=M(A,Q,y,v);A.onBeforeShadow(s,A,E,w,k,ie,null),s.renderBufferDirect(w,null,k,ie,A,null),A.onAfterShadow(s,A,E,w,k,ie,null)}}const B=A.children;for(let k=0,Q=B.length;k<Q;k++)b(B[k],E,w,y,v)}function D(A){A.target.removeEventListener("dispose",D);for(const w in l){const y=l[w],v=A.target.uuid;v in y&&(y[v].dispose(),delete y[v])}}}const $p={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function em(s,e){function t(){let G=!1;const Re=new Dt;let ae=null;const xe=new Dt(0,0,0,0);return{setMask:function(Ce){ae!==Ce&&!G&&(s.colorMask(Ce,Ce,Ce,Ce),ae=Ce)},setLocked:function(Ce){G=Ce},setClear:function(Ce,Ie,Ve,Bt,Xt){Xt===!0&&(Ce*=Bt,Ie*=Bt,Ve*=Bt),Re.set(Ce,Ie,Ve,Bt),xe.equals(Re)===!1&&(s.clearColor(Ce,Ie,Ve,Bt),xe.copy(Re))},reset:function(){G=!1,ae=null,xe.set(-1,0,0,0)}}}function n(){let G=!1,Re=!1,ae=null,xe=null,Ce=null;return{setReversed:function(Ie){if(Re!==Ie){const Ve=e.get("EXT_clip_control");Re?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT);const Bt=Ce;Ce=null,this.setClear(Bt)}Re=Ie},getReversed:function(){return Re},setTest:function(Ie){Ie?ye(s.DEPTH_TEST):Ye(s.DEPTH_TEST)},setMask:function(Ie){ae!==Ie&&!G&&(s.depthMask(Ie),ae=Ie)},setFunc:function(Ie){if(Re&&(Ie=$p[Ie]),xe!==Ie){switch(Ie){case 0:s.depthFunc(s.NEVER);break;case 1:s.depthFunc(s.ALWAYS);break;case 2:s.depthFunc(s.LESS);break;case 3:s.depthFunc(s.LEQUAL);break;case 4:s.depthFunc(s.EQUAL);break;case 5:s.depthFunc(s.GEQUAL);break;case 6:s.depthFunc(s.GREATER);break;case 7:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}xe=Ie}},setLocked:function(Ie){G=Ie},setClear:function(Ie){Ce!==Ie&&(Re&&(Ie=1-Ie),s.clearDepth(Ie),Ce=Ie)},reset:function(){G=!1,ae=null,xe=null,Ce=null,Re=!1}}}function i(){let G=!1,Re=null,ae=null,xe=null,Ce=null,Ie=null,Ve=null,Bt=null,Xt=null;return{setTest:function(St){G||(St?ye(s.STENCIL_TEST):Ye(s.STENCIL_TEST))},setMask:function(St){Re!==St&&!G&&(s.stencilMask(St),Re=St)},setFunc:function(St,$t,en){(ae!==St||xe!==$t||Ce!==en)&&(s.stencilFunc(St,$t,en),ae=St,xe=$t,Ce=en)},setOp:function(St,$t,en){(Ie!==St||Ve!==$t||Bt!==en)&&(s.stencilOp(St,$t,en),Ie=St,Ve=$t,Bt=en)},setLocked:function(St){G=St},setClear:function(St){Xt!==St&&(s.clearStencil(St),Xt=St)},reset:function(){G=!1,Re=null,ae=null,xe=null,Ce=null,Ie=null,Ve=null,Bt=null,Xt=null}}}const r=new t,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let u={},h={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,x=null,M=null,b=null,D=null,A=null,E=new Je(0,0,0),w=0,y=!1,v=null,F=null,B=null,k=null,Q=null;const ie=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,ee=0;const Z=s.getParameter(s.VERSION);Z.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(Z)[1]),U=ee>=1):Z.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),U=ee>=2);let fe=null,$={};const te=s.getParameter(s.SCISSOR_BOX),Ae=s.getParameter(s.VIEWPORT),We=new Dt().fromArray(te),ce=new Dt().fromArray(Ae);function _e(G,Re,ae,xe){const Ce=new Uint8Array(4),Ie=s.createTexture();s.bindTexture(G,Ie),s.texParameteri(G,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(G,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ve=0;Ve<ae;Ve++)G===s.TEXTURE_3D||G===s.TEXTURE_2D_ARRAY?s.texImage3D(Re,0,s.RGBA,1,1,xe,0,s.RGBA,s.UNSIGNED_BYTE,Ce):s.texImage2D(Re+Ve,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ce);return Ie}const De={};De[s.TEXTURE_2D]=_e(s.TEXTURE_2D,s.TEXTURE_2D,1),De[s.TEXTURE_CUBE_MAP]=_e(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),De[s.TEXTURE_2D_ARRAY]=_e(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),De[s.TEXTURE_3D]=_e(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ye(s.DEPTH_TEST),a.setFunc(3),ct(!1),at(1),ye(s.CULL_FACE),W(0);function ye(G){u[G]!==!0&&(s.enable(G),u[G]=!0)}function Ye(G){u[G]!==!1&&(s.disable(G),u[G]=!1)}function it(G,Re){return h[G]!==Re?(s.bindFramebuffer(G,Re),h[G]=Re,G===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=Re),G===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=Re),!0):!1}function ht(G,Re){let ae=p,xe=!1;if(G){ae=f.get(Re),ae===void 0&&(ae=[],f.set(Re,ae));const Ce=G.textures;if(ae.length!==Ce.length||ae[0]!==s.COLOR_ATTACHMENT0){for(let Ie=0,Ve=Ce.length;Ie<Ve;Ie++)ae[Ie]=s.COLOR_ATTACHMENT0+Ie;ae.length=Ce.length,xe=!0}}else ae[0]!==s.BACK&&(ae[0]=s.BACK,xe=!0);xe&&s.drawBuffers(ae)}function _t(G){return g!==G?(s.useProgram(G),g=G,!0):!1}const ft={100:s.FUNC_ADD,101:s.FUNC_SUBTRACT,102:s.FUNC_REVERSE_SUBTRACT};ft[103]=s.MIN,ft[104]=s.MAX;const xt={200:s.ZERO,201:s.ONE,202:s.SRC_COLOR,204:s.SRC_ALPHA,210:s.SRC_ALPHA_SATURATE,208:s.DST_COLOR,206:s.DST_ALPHA,203:s.ONE_MINUS_SRC_COLOR,205:s.ONE_MINUS_SRC_ALPHA,209:s.ONE_MINUS_DST_COLOR,207:s.ONE_MINUS_DST_ALPHA,211:s.CONSTANT_COLOR,212:s.ONE_MINUS_CONSTANT_COLOR,213:s.CONSTANT_ALPHA,214:s.ONE_MINUS_CONSTANT_ALPHA};function W(G,Re,ae,xe,Ce,Ie,Ve,Bt,Xt,St){if(G===0){_===!0&&(Ye(s.BLEND),_=!1);return}if(_===!1&&(ye(s.BLEND),_=!0),G!==5){if(G!==m||St!==y){if((d!==100||b!==100)&&(s.blendEquation(s.FUNC_ADD),d=100,b=100),St)switch(G){case 1:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case 2:s.blendFunc(s.ONE,s.ONE);break;case 3:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case 4:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case 1:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case 2:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case 3:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case 4:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}x=null,M=null,D=null,A=null,E.set(0,0,0),w=0,m=G,y=St}return}Ce=Ce||Re,Ie=Ie||ae,Ve=Ve||xe,(Re!==d||Ce!==b)&&(s.blendEquationSeparate(ft[Re],ft[Ce]),d=Re,b=Ce),(ae!==x||xe!==M||Ie!==D||Ve!==A)&&(s.blendFuncSeparate(xt[ae],xt[xe],xt[Ie],xt[Ve]),x=ae,M=xe,D=Ie,A=Ve),(Bt.equals(E)===!1||Xt!==w)&&(s.blendColor(Bt.r,Bt.g,Bt.b,Xt),E.copy(Bt),w=Xt),m=G,y=!1}function kt(G,Re){G.side===2?Ye(s.CULL_FACE):ye(s.CULL_FACE);let ae=G.side===1;Re&&(ae=!ae),ct(ae),G.blending===1&&G.transparent===!1?W(0):W(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),a.setFunc(G.depthFunc),a.setTest(G.depthTest),a.setMask(G.depthWrite),r.setMask(G.colorWrite);const xe=G.stencilWrite;o.setTest(xe),xe&&(o.setMask(G.stencilWriteMask),o.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),o.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),wt(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?ye(s.SAMPLE_ALPHA_TO_COVERAGE):Ye(s.SAMPLE_ALPHA_TO_COVERAGE)}function ct(G){v!==G&&(G?s.frontFace(s.CW):s.frontFace(s.CCW),v=G)}function at(G){G!==0?(ye(s.CULL_FACE),G!==F&&(G===1?s.cullFace(s.BACK):G===2?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ye(s.CULL_FACE),F=G}function st(G){G!==B&&(U&&s.lineWidth(G),B=G)}function wt(G,Re,ae){G?(ye(s.POLYGON_OFFSET_FILL),(k!==Re||Q!==ae)&&(s.polygonOffset(Re,ae),k=Re,Q=ae)):Ye(s.POLYGON_OFFSET_FILL)}function Qe(G){G?ye(s.SCISSOR_TEST):Ye(s.SCISSOR_TEST)}function I(G){G===void 0&&(G=s.TEXTURE0+ie-1),fe!==G&&(s.activeTexture(G),fe=G)}function S(G,Re,ae){ae===void 0&&(fe===null?ae=s.TEXTURE0+ie-1:ae=fe);let xe=$[ae];xe===void 0&&(xe={type:void 0,texture:void 0},$[ae]=xe),(xe.type!==G||xe.texture!==Re)&&(fe!==ae&&(s.activeTexture(ae),fe=ae),s.bindTexture(G,Re||De[G]),xe.type=G,xe.texture=Re)}function Y(){const G=$[fe];G!==void 0&&G.type!==void 0&&(s.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function be(){try{s.compressedTexImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function de(){try{s.compressedTexImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function he(){try{s.texSubImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ge(){try{s.texSubImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function we(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ne(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function vt(){try{s.texStorage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function z(){try{s.texStorage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function je(){try{s.texImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function et(){try{s.texImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function $e(G){We.equals(G)===!1&&(s.scissor(G.x,G.y,G.z,G.w),We.copy(G))}function He(G){ce.equals(G)===!1&&(s.viewport(G.x,G.y,G.z,G.w),ce.copy(G))}function yt(G,Re){let ae=l.get(Re);ae===void 0&&(ae=new WeakMap,l.set(Re,ae));let xe=ae.get(G);xe===void 0&&(xe=s.getUniformBlockIndex(Re,G.name),ae.set(G,xe))}function gt(G,Re){const xe=l.get(Re).get(G);c.get(Re)!==xe&&(s.uniformBlockBinding(Re,xe,G.__bindingPointIndex),c.set(Re,xe))}function It(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},fe=null,$={},h={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,x=null,M=null,b=null,D=null,A=null,E=new Je(0,0,0),w=0,y=!1,v=null,F=null,B=null,k=null,Q=null,We.set(0,0,s.canvas.width,s.canvas.height),ce.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ye,disable:Ye,bindFramebuffer:it,drawBuffers:ht,useProgram:_t,setBlending:W,setMaterial:kt,setFlipSided:ct,setCullFace:at,setLineWidth:st,setPolygonOffset:wt,setScissorTest:Qe,activeTexture:I,bindTexture:S,unbindTexture:Y,compressedTexImage2D:be,compressedTexImage3D:de,texImage2D:je,texImage3D:et,updateUBOMapping:yt,uniformBlockBinding:gt,texStorage2D:vt,texStorage3D:z,texSubImage2D:he,texSubImage3D:Ge,compressedTexSubImage2D:we,compressedTexSubImage3D:Ne,scissor:$e,viewport:He,reset:It}}function cc(s,e,t,n){const i=tm(n);switch(t){case 1021:return s*e;case 1024:return s*e;case 1025:return s*e*2;case 1028:return s*e/i.components*i.byteLength;case 1029:return s*e/i.components*i.byteLength;case 1030:return s*e*2/i.components*i.byteLength;case 1031:return s*e*2/i.components*i.byteLength;case 1022:return s*e*3/i.components*i.byteLength;case 1023:return s*e*4/i.components*i.byteLength;case 1033:return s*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(s,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(s,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case 37496:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case 37808:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(s/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(s/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function tm(s){switch(s){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function nm(s,e,t,n,i,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Oe,u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,S){return p?new OffscreenCanvas(I,S):Hs("canvas")}function _(I,S,Y){let be=1;const de=Qe(I);if((de.width>Y||de.height>Y)&&(be=Y/Math.max(de.width,de.height)),be<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const he=Math.floor(be*de.width),Ge=Math.floor(be*de.height);h===void 0&&(h=g(he,Ge));const we=S?g(he,Ge):h;return we.width=he,we.height=Ge,we.getContext("2d").drawImage(I,0,0,he,Ge),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+de.width+"x"+de.height+") to ("+he+"x"+Ge+")."),we}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+de.width+"x"+de.height+")."),I;return I}function m(I){return I.generateMipmaps}function d(I){s.generateMipmap(I)}function x(I){return I.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?s.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(I,S,Y,be,de=!1){if(I!==null){if(s[I]!==void 0)return s[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let he=S;if(S===s.RED&&(Y===s.FLOAT&&(he=s.R32F),Y===s.HALF_FLOAT&&(he=s.R16F),Y===s.UNSIGNED_BYTE&&(he=s.R8)),S===s.RED_INTEGER&&(Y===s.UNSIGNED_BYTE&&(he=s.R8UI),Y===s.UNSIGNED_SHORT&&(he=s.R16UI),Y===s.UNSIGNED_INT&&(he=s.R32UI),Y===s.BYTE&&(he=s.R8I),Y===s.SHORT&&(he=s.R16I),Y===s.INT&&(he=s.R32I)),S===s.RG&&(Y===s.FLOAT&&(he=s.RG32F),Y===s.HALF_FLOAT&&(he=s.RG16F),Y===s.UNSIGNED_BYTE&&(he=s.RG8)),S===s.RG_INTEGER&&(Y===s.UNSIGNED_BYTE&&(he=s.RG8UI),Y===s.UNSIGNED_SHORT&&(he=s.RG16UI),Y===s.UNSIGNED_INT&&(he=s.RG32UI),Y===s.BYTE&&(he=s.RG8I),Y===s.SHORT&&(he=s.RG16I),Y===s.INT&&(he=s.RG32I)),S===s.RGB_INTEGER&&(Y===s.UNSIGNED_BYTE&&(he=s.RGB8UI),Y===s.UNSIGNED_SHORT&&(he=s.RGB16UI),Y===s.UNSIGNED_INT&&(he=s.RGB32UI),Y===s.BYTE&&(he=s.RGB8I),Y===s.SHORT&&(he=s.RGB16I),Y===s.INT&&(he=s.RGB32I)),S===s.RGBA_INTEGER&&(Y===s.UNSIGNED_BYTE&&(he=s.RGBA8UI),Y===s.UNSIGNED_SHORT&&(he=s.RGBA16UI),Y===s.UNSIGNED_INT&&(he=s.RGBA32UI),Y===s.BYTE&&(he=s.RGBA8I),Y===s.SHORT&&(he=s.RGBA16I),Y===s.INT&&(he=s.RGBA32I)),S===s.RGB&&Y===s.UNSIGNED_INT_5_9_9_9_REV&&(he=s.RGB9_E5),S===s.RGBA){const Ge=de?kr:Lt.getTransfer(be);Y===s.FLOAT&&(he=s.RGBA32F),Y===s.HALF_FLOAT&&(he=s.RGBA16F),Y===s.UNSIGNED_BYTE&&(he=Ge===Vt?s.SRGB8_ALPHA8:s.RGBA8),Y===s.UNSIGNED_SHORT_4_4_4_4&&(he=s.RGBA4),Y===s.UNSIGNED_SHORT_5_5_5_1&&(he=s.RGB5_A1)}return(he===s.R16F||he===s.R32F||he===s.RG16F||he===s.RG32F||he===s.RGBA16F||he===s.RGBA32F)&&e.get("EXT_color_buffer_float"),he}function b(I,S){let Y;return I?S===null||S===1014||S===1020?Y=s.DEPTH24_STENCIL8:S===1015?Y=s.DEPTH32F_STENCIL8:S===1012&&(Y=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===1014||S===1020?Y=s.DEPTH_COMPONENT24:S===1015?Y=s.DEPTH_COMPONENT32F:S===1012&&(Y=s.DEPTH_COMPONENT16),Y}function D(I,S){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==1003&&I.minFilter!==1006?Math.log2(Math.max(S.width,S.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?S.mipmaps.length:1}function A(I){const S=I.target;S.removeEventListener("dispose",A),w(S),S.isVideoTexture&&u.delete(S)}function E(I){const S=I.target;S.removeEventListener("dispose",E),v(S)}function w(I){const S=n.get(I);if(S.__webglInit===void 0)return;const Y=I.source,be=f.get(Y);if(be){const de=be[S.__cacheKey];de.usedTimes--,de.usedTimes===0&&y(I),Object.keys(be).length===0&&f.delete(Y)}n.remove(I)}function y(I){const S=n.get(I);s.deleteTexture(S.__webglTexture);const Y=I.source,be=f.get(Y);delete be[S.__cacheKey],a.memory.textures--}function v(I){const S=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let be=0;be<6;be++){if(Array.isArray(S.__webglFramebuffer[be]))for(let de=0;de<S.__webglFramebuffer[be].length;de++)s.deleteFramebuffer(S.__webglFramebuffer[be][de]);else s.deleteFramebuffer(S.__webglFramebuffer[be]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[be])}else{if(Array.isArray(S.__webglFramebuffer))for(let be=0;be<S.__webglFramebuffer.length;be++)s.deleteFramebuffer(S.__webglFramebuffer[be]);else s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let be=0;be<S.__webglColorRenderbuffer.length;be++)S.__webglColorRenderbuffer[be]&&s.deleteRenderbuffer(S.__webglColorRenderbuffer[be]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const Y=I.textures;for(let be=0,de=Y.length;be<de;be++){const he=n.get(Y[be]);he.__webglTexture&&(s.deleteTexture(he.__webglTexture),a.memory.textures--),n.remove(Y[be])}n.remove(I)}let F=0;function B(){F=0}function k(){const I=F;return I>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+i.maxTextures),F+=1,I}function Q(I){const S=[];return S.push(I.wrapS),S.push(I.wrapT),S.push(I.wrapR||0),S.push(I.magFilter),S.push(I.minFilter),S.push(I.anisotropy),S.push(I.internalFormat),S.push(I.format),S.push(I.type),S.push(I.generateMipmaps),S.push(I.premultiplyAlpha),S.push(I.flipY),S.push(I.unpackAlignment),S.push(I.colorSpace),S.join()}function ie(I,S){const Y=n.get(I);if(I.isVideoTexture&&st(I),I.isRenderTargetTexture===!1&&I.version>0&&Y.__version!==I.version){const be=I.image;if(be===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(be.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(Y,I,S);return}}t.bindTexture(s.TEXTURE_2D,Y.__webglTexture,s.TEXTURE0+S)}function U(I,S){const Y=n.get(I);if(I.version>0&&Y.__version!==I.version){ce(Y,I,S);return}t.bindTexture(s.TEXTURE_2D_ARRAY,Y.__webglTexture,s.TEXTURE0+S)}function ee(I,S){const Y=n.get(I);if(I.version>0&&Y.__version!==I.version){ce(Y,I,S);return}t.bindTexture(s.TEXTURE_3D,Y.__webglTexture,s.TEXTURE0+S)}function Z(I,S){const Y=n.get(I);if(I.version>0&&Y.__version!==I.version){_e(Y,I,S);return}t.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture,s.TEXTURE0+S)}const fe={1e3:s.REPEAT,1001:s.CLAMP_TO_EDGE,1002:s.MIRRORED_REPEAT},$={1003:s.NEAREST,1004:s.NEAREST_MIPMAP_NEAREST,1005:s.NEAREST_MIPMAP_LINEAR,1006:s.LINEAR,1007:s.LINEAR_MIPMAP_NEAREST,1008:s.LINEAR_MIPMAP_LINEAR},te={512:s.NEVER,519:s.ALWAYS,513:s.LESS,515:s.LEQUAL,514:s.EQUAL,518:s.GEQUAL,516:s.GREATER,517:s.NOTEQUAL};function Ae(I,S){if(S.type===1015&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===1006||S.magFilter===1007||S.magFilter===1005||S.magFilter===1008||S.minFilter===1006||S.minFilter===1007||S.minFilter===1005||S.minFilter===1008)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(I,s.TEXTURE_WRAP_S,fe[S.wrapS]),s.texParameteri(I,s.TEXTURE_WRAP_T,fe[S.wrapT]),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,fe[S.wrapR]),s.texParameteri(I,s.TEXTURE_MAG_FILTER,$[S.magFilter]),s.texParameteri(I,s.TEXTURE_MIN_FILTER,$[S.minFilter]),S.compareFunction&&(s.texParameteri(I,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(I,s.TEXTURE_COMPARE_FUNC,te[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===1003||S.minFilter!==1005&&S.minFilter!==1008||S.type===1015&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const Y=e.get("EXT_texture_filter_anisotropic");s.texParameterf(I,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function We(I,S){let Y=!1;I.__webglInit===void 0&&(I.__webglInit=!0,S.addEventListener("dispose",A));const be=S.source;let de=f.get(be);de===void 0&&(de={},f.set(be,de));const he=Q(S);if(he!==I.__cacheKey){de[he]===void 0&&(de[he]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,Y=!0),de[he].usedTimes++;const Ge=de[I.__cacheKey];Ge!==void 0&&(de[I.__cacheKey].usedTimes--,Ge.usedTimes===0&&y(S)),I.__cacheKey=he,I.__webglTexture=de[he].texture}return Y}function ce(I,S,Y){let be=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(be=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(be=s.TEXTURE_3D);const de=We(I,S),he=S.source;t.bindTexture(be,I.__webglTexture,s.TEXTURE0+Y);const Ge=n.get(he);if(he.version!==Ge.__version||de===!0){t.activeTexture(s.TEXTURE0+Y);const we=Lt.getPrimaries(Lt.workingColorSpace),Ne=S.colorSpace===""?null:Lt.getPrimaries(S.colorSpace),vt=S.colorSpace===""||we===Ne?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let z=_(S.image,!1,i.maxTextureSize);z=wt(S,z);const je=r.convert(S.format,S.colorSpace),et=r.convert(S.type);let $e=M(S.internalFormat,je,et,S.colorSpace,S.isVideoTexture);Ae(be,S);let He;const yt=S.mipmaps,gt=S.isVideoTexture!==!0,It=Ge.__version===void 0||de===!0,G=he.dataReady,Re=D(S,z);if(S.isDepthTexture)$e=b(S.format===1027,S.type),It&&(gt?t.texStorage2D(s.TEXTURE_2D,1,$e,z.width,z.height):t.texImage2D(s.TEXTURE_2D,0,$e,z.width,z.height,0,je,et,null));else if(S.isDataTexture)if(yt.length>0){gt&&It&&t.texStorage2D(s.TEXTURE_2D,Re,$e,yt[0].width,yt[0].height);for(let ae=0,xe=yt.length;ae<xe;ae++)He=yt[ae],gt?G&&t.texSubImage2D(s.TEXTURE_2D,ae,0,0,He.width,He.height,je,et,He.data):t.texImage2D(s.TEXTURE_2D,ae,$e,He.width,He.height,0,je,et,He.data);S.generateMipmaps=!1}else gt?(It&&t.texStorage2D(s.TEXTURE_2D,Re,$e,z.width,z.height),G&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,z.width,z.height,je,et,z.data)):t.texImage2D(s.TEXTURE_2D,0,$e,z.width,z.height,0,je,et,z.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){gt&&It&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Re,$e,yt[0].width,yt[0].height,z.depth);for(let ae=0,xe=yt.length;ae<xe;ae++)if(He=yt[ae],S.format!==1023)if(je!==null)if(gt){if(G)if(S.layerUpdates.size>0){const Ce=cc(He.width,He.height,S.format,S.type);for(const Ie of S.layerUpdates){const Ve=He.data.subarray(Ie*Ce/He.data.BYTES_PER_ELEMENT,(Ie+1)*Ce/He.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ae,0,0,Ie,He.width,He.height,1,je,Ve)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ae,0,0,0,He.width,He.height,z.depth,je,He.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ae,$e,He.width,He.height,z.depth,0,He.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else gt?G&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,ae,0,0,0,He.width,He.height,z.depth,je,et,He.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ae,$e,He.width,He.height,z.depth,0,je,et,He.data)}else{gt&&It&&t.texStorage2D(s.TEXTURE_2D,Re,$e,yt[0].width,yt[0].height);for(let ae=0,xe=yt.length;ae<xe;ae++)He=yt[ae],S.format!==1023?je!==null?gt?G&&t.compressedTexSubImage2D(s.TEXTURE_2D,ae,0,0,He.width,He.height,je,He.data):t.compressedTexImage2D(s.TEXTURE_2D,ae,$e,He.width,He.height,0,He.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):gt?G&&t.texSubImage2D(s.TEXTURE_2D,ae,0,0,He.width,He.height,je,et,He.data):t.texImage2D(s.TEXTURE_2D,ae,$e,He.width,He.height,0,je,et,He.data)}else if(S.isDataArrayTexture)if(gt){if(It&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Re,$e,z.width,z.height,z.depth),G)if(S.layerUpdates.size>0){const ae=cc(z.width,z.height,S.format,S.type);for(const xe of S.layerUpdates){const Ce=z.data.subarray(xe*ae/z.data.BYTES_PER_ELEMENT,(xe+1)*ae/z.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,xe,z.width,z.height,1,je,et,Ce)}S.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,z.width,z.height,z.depth,je,et,z.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,$e,z.width,z.height,z.depth,0,je,et,z.data);else if(S.isData3DTexture)gt?(It&&t.texStorage3D(s.TEXTURE_3D,Re,$e,z.width,z.height,z.depth),G&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,z.width,z.height,z.depth,je,et,z.data)):t.texImage3D(s.TEXTURE_3D,0,$e,z.width,z.height,z.depth,0,je,et,z.data);else if(S.isFramebufferTexture){if(It)if(gt)t.texStorage2D(s.TEXTURE_2D,Re,$e,z.width,z.height);else{let ae=z.width,xe=z.height;for(let Ce=0;Ce<Re;Ce++)t.texImage2D(s.TEXTURE_2D,Ce,$e,ae,xe,0,je,et,null),ae>>=1,xe>>=1}}else if(yt.length>0){if(gt&&It){const ae=Qe(yt[0]);t.texStorage2D(s.TEXTURE_2D,Re,$e,ae.width,ae.height)}for(let ae=0,xe=yt.length;ae<xe;ae++)He=yt[ae],gt?G&&t.texSubImage2D(s.TEXTURE_2D,ae,0,0,je,et,He):t.texImage2D(s.TEXTURE_2D,ae,$e,je,et,He);S.generateMipmaps=!1}else if(gt){if(It){const ae=Qe(z);t.texStorage2D(s.TEXTURE_2D,Re,$e,ae.width,ae.height)}G&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,je,et,z)}else t.texImage2D(s.TEXTURE_2D,0,$e,je,et,z);m(S)&&d(be),Ge.__version=he.version,S.onUpdate&&S.onUpdate(S)}I.__version=S.version}function _e(I,S,Y){if(S.image.length!==6)return;const be=We(I,S),de=S.source;t.bindTexture(s.TEXTURE_CUBE_MAP,I.__webglTexture,s.TEXTURE0+Y);const he=n.get(de);if(de.version!==he.__version||be===!0){t.activeTexture(s.TEXTURE0+Y);const Ge=Lt.getPrimaries(Lt.workingColorSpace),we=S.colorSpace===""?null:Lt.getPrimaries(S.colorSpace),Ne=S.colorSpace===""||Ge===we?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);const vt=S.isCompressedTexture||S.image[0].isCompressedTexture,z=S.image[0]&&S.image[0].isDataTexture,je=[];for(let xe=0;xe<6;xe++)!vt&&!z?je[xe]=_(S.image[xe],!0,i.maxCubemapSize):je[xe]=z?S.image[xe].image:S.image[xe],je[xe]=wt(S,je[xe]);const et=je[0],$e=r.convert(S.format,S.colorSpace),He=r.convert(S.type),yt=M(S.internalFormat,$e,He,S.colorSpace),gt=S.isVideoTexture!==!0,It=he.__version===void 0||be===!0,G=de.dataReady;let Re=D(S,et);Ae(s.TEXTURE_CUBE_MAP,S);let ae;if(vt){gt&&It&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Re,yt,et.width,et.height);for(let xe=0;xe<6;xe++){ae=je[xe].mipmaps;for(let Ce=0;Ce<ae.length;Ce++){const Ie=ae[Ce];S.format!==1023?$e!==null?gt?G&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ce,0,0,Ie.width,Ie.height,$e,Ie.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ce,yt,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):gt?G&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ce,0,0,Ie.width,Ie.height,$e,He,Ie.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ce,yt,Ie.width,Ie.height,0,$e,He,Ie.data)}}}else{if(ae=S.mipmaps,gt&&It){ae.length>0&&Re++;const xe=Qe(je[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Re,yt,xe.width,xe.height)}for(let xe=0;xe<6;xe++)if(z){gt?G&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,je[xe].width,je[xe].height,$e,He,je[xe].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,yt,je[xe].width,je[xe].height,0,$e,He,je[xe].data);for(let Ce=0;Ce<ae.length;Ce++){const Ve=ae[Ce].image[xe].image;gt?G&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ce+1,0,0,Ve.width,Ve.height,$e,He,Ve.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ce+1,yt,Ve.width,Ve.height,0,$e,He,Ve.data)}}else{gt?G&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,$e,He,je[xe]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,yt,$e,He,je[xe]);for(let Ce=0;Ce<ae.length;Ce++){const Ie=ae[Ce];gt?G&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ce+1,0,0,$e,He,Ie.image[xe]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ce+1,yt,$e,He,Ie.image[xe])}}}m(S)&&d(s.TEXTURE_CUBE_MAP),he.__version=de.version,S.onUpdate&&S.onUpdate(S)}I.__version=S.version}function De(I,S,Y,be,de,he){const Ge=r.convert(Y.format,Y.colorSpace),we=r.convert(Y.type),Ne=M(Y.internalFormat,Ge,we,Y.colorSpace),vt=n.get(S),z=n.get(Y);if(z.__renderTarget=S,!vt.__hasExternalTextures){const je=Math.max(1,S.width>>he),et=Math.max(1,S.height>>he);de===s.TEXTURE_3D||de===s.TEXTURE_2D_ARRAY?t.texImage3D(de,he,Ne,je,et,S.depth,0,Ge,we,null):t.texImage2D(de,he,Ne,je,et,0,Ge,we,null)}t.bindFramebuffer(s.FRAMEBUFFER,I),at(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,be,de,z.__webglTexture,0,ct(S)):(de===s.TEXTURE_2D||de>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&de<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,be,de,z.__webglTexture,he),t.bindFramebuffer(s.FRAMEBUFFER,null)}function ye(I,S,Y){if(s.bindRenderbuffer(s.RENDERBUFFER,I),S.depthBuffer){const be=S.depthTexture,de=be&&be.isDepthTexture?be.type:null,he=b(S.stencilBuffer,de),Ge=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,we=ct(S);at(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,we,he,S.width,S.height):Y?s.renderbufferStorageMultisample(s.RENDERBUFFER,we,he,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,he,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ge,s.RENDERBUFFER,I)}else{const be=S.textures;for(let de=0;de<be.length;de++){const he=be[de],Ge=r.convert(he.format,he.colorSpace),we=r.convert(he.type),Ne=M(he.internalFormat,Ge,we,he.colorSpace),vt=ct(S);Y&&at(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,vt,Ne,S.width,S.height):at(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,vt,Ne,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,Ne,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ye(I,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,I),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const be=n.get(S.depthTexture);be.__renderTarget=S,(!be.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),ie(S.depthTexture,0);const de=be.__webglTexture,he=ct(S);if(S.depthTexture.format===1026)at(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,de,0,he):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,de,0);else if(S.depthTexture.format===1027)at(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,de,0,he):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,de,0);else throw new Error("Unknown depthTexture format")}function it(I){const S=n.get(I),Y=I.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==I.depthTexture){const be=I.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),be){const de=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,be.removeEventListener("dispose",de)};be.addEventListener("dispose",de),S.__depthDisposeCallback=de}S.__boundDepthTexture=be}if(I.depthTexture&&!S.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");Ye(S.__webglFramebuffer,I)}else if(Y){S.__webglDepthbuffer=[];for(let be=0;be<6;be++)if(t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[be]),S.__webglDepthbuffer[be]===void 0)S.__webglDepthbuffer[be]=s.createRenderbuffer(),ye(S.__webglDepthbuffer[be],I,!1);else{const de=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,he=S.__webglDepthbuffer[be];s.bindRenderbuffer(s.RENDERBUFFER,he),s.framebufferRenderbuffer(s.FRAMEBUFFER,de,s.RENDERBUFFER,he)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=s.createRenderbuffer(),ye(S.__webglDepthbuffer,I,!1);else{const be=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,de=S.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,de),s.framebufferRenderbuffer(s.FRAMEBUFFER,be,s.RENDERBUFFER,de)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function ht(I,S,Y){const be=n.get(I);S!==void 0&&De(be.__webglFramebuffer,I,I.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),Y!==void 0&&it(I)}function _t(I){const S=I.texture,Y=n.get(I),be=n.get(S);I.addEventListener("dispose",E);const de=I.textures,he=I.isWebGLCubeRenderTarget===!0,Ge=de.length>1;if(Ge||(be.__webglTexture===void 0&&(be.__webglTexture=s.createTexture()),be.__version=S.version,a.memory.textures++),he){Y.__webglFramebuffer=[];for(let we=0;we<6;we++)if(S.mipmaps&&S.mipmaps.length>0){Y.__webglFramebuffer[we]=[];for(let Ne=0;Ne<S.mipmaps.length;Ne++)Y.__webglFramebuffer[we][Ne]=s.createFramebuffer()}else Y.__webglFramebuffer[we]=s.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){Y.__webglFramebuffer=[];for(let we=0;we<S.mipmaps.length;we++)Y.__webglFramebuffer[we]=s.createFramebuffer()}else Y.__webglFramebuffer=s.createFramebuffer();if(Ge)for(let we=0,Ne=de.length;we<Ne;we++){const vt=n.get(de[we]);vt.__webglTexture===void 0&&(vt.__webglTexture=s.createTexture(),a.memory.textures++)}if(I.samples>0&&at(I)===!1){Y.__webglMultisampledFramebuffer=s.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let we=0;we<de.length;we++){const Ne=de[we];Y.__webglColorRenderbuffer[we]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,Y.__webglColorRenderbuffer[we]);const vt=r.convert(Ne.format,Ne.colorSpace),z=r.convert(Ne.type),je=M(Ne.internalFormat,vt,z,Ne.colorSpace,I.isXRRenderTarget===!0),et=ct(I);s.renderbufferStorageMultisample(s.RENDERBUFFER,et,je,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+we,s.RENDERBUFFER,Y.__webglColorRenderbuffer[we])}s.bindRenderbuffer(s.RENDERBUFFER,null),I.depthBuffer&&(Y.__webglDepthRenderbuffer=s.createRenderbuffer(),ye(Y.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(he){t.bindTexture(s.TEXTURE_CUBE_MAP,be.__webglTexture),Ae(s.TEXTURE_CUBE_MAP,S);for(let we=0;we<6;we++)if(S.mipmaps&&S.mipmaps.length>0)for(let Ne=0;Ne<S.mipmaps.length;Ne++)De(Y.__webglFramebuffer[we][Ne],I,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Ne);else De(Y.__webglFramebuffer[we],I,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+we,0);m(S)&&d(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ge){for(let we=0,Ne=de.length;we<Ne;we++){const vt=de[we],z=n.get(vt);t.bindTexture(s.TEXTURE_2D,z.__webglTexture),Ae(s.TEXTURE_2D,vt),De(Y.__webglFramebuffer,I,vt,s.COLOR_ATTACHMENT0+we,s.TEXTURE_2D,0),m(vt)&&d(s.TEXTURE_2D)}t.unbindTexture()}else{let we=s.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(we=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(we,be.__webglTexture),Ae(we,S),S.mipmaps&&S.mipmaps.length>0)for(let Ne=0;Ne<S.mipmaps.length;Ne++)De(Y.__webglFramebuffer[Ne],I,S,s.COLOR_ATTACHMENT0,we,Ne);else De(Y.__webglFramebuffer,I,S,s.COLOR_ATTACHMENT0,we,0);m(S)&&d(we),t.unbindTexture()}I.depthBuffer&&it(I)}function ft(I){const S=I.textures;for(let Y=0,be=S.length;Y<be;Y++){const de=S[Y];if(m(de)){const he=x(I),Ge=n.get(de).__webglTexture;t.bindTexture(he,Ge),d(he),t.unbindTexture()}}}const xt=[],W=[];function kt(I){if(I.samples>0){if(at(I)===!1){const S=I.textures,Y=I.width,be=I.height;let de=s.COLOR_BUFFER_BIT;const he=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ge=n.get(I),we=S.length>1;if(we)for(let Ne=0;Ne<S.length;Ne++)t.bindFramebuffer(s.FRAMEBUFFER,Ge.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ne,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ge.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ne,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ge.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ge.__webglFramebuffer);for(let Ne=0;Ne<S.length;Ne++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(de|=s.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(de|=s.STENCIL_BUFFER_BIT)),we){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ge.__webglColorRenderbuffer[Ne]);const vt=n.get(S[Ne]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,vt,0)}s.blitFramebuffer(0,0,Y,be,0,0,Y,be,de,s.NEAREST),c===!0&&(xt.length=0,W.length=0,xt.push(s.COLOR_ATTACHMENT0+Ne),I.depthBuffer&&I.resolveDepthBuffer===!1&&(xt.push(he),W.push(he),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,W)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,xt))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),we)for(let Ne=0;Ne<S.length;Ne++){t.bindFramebuffer(s.FRAMEBUFFER,Ge.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ne,s.RENDERBUFFER,Ge.__webglColorRenderbuffer[Ne]);const vt=n.get(S[Ne]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ge.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ne,s.TEXTURE_2D,vt,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ge.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&c){const S=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function ct(I){return Math.min(i.maxSamples,I.samples)}function at(I){const S=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function st(I){const S=a.render.frame;u.get(I)!==S&&(u.set(I,S),I.update())}function wt(I,S){const Y=I.colorSpace,be=I.format,de=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||Y!==An&&Y!==""&&(Lt.getTransfer(Y)===Vt?(be!==1023||de!==1009)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),S}function Qe(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=B,this.setTexture2D=ie,this.setTexture2DArray=U,this.setTexture3D=ee,this.setTextureCube=Z,this.rebindTextures=ht,this.setupRenderTarget=_t,this.updateRenderTargetMipmap=ft,this.updateMultisampleRenderTarget=kt,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=De,this.useMultisampledRTT=at}function im(s,e){function t(n,i=""){let r;const a=Lt.getTransfer(i);if(n===1009)return s.UNSIGNED_BYTE;if(n===1017)return s.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return s.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===1010)return s.BYTE;if(n===1011)return s.SHORT;if(n===1012)return s.UNSIGNED_SHORT;if(n===1013)return s.INT;if(n===1014)return s.UNSIGNED_INT;if(n===1015)return s.FLOAT;if(n===1016)return s.HALF_FLOAT;if(n===1021)return s.ALPHA;if(n===1022)return s.RGB;if(n===1023)return s.RGBA;if(n===1024)return s.LUMINANCE;if(n===1025)return s.LUMINANCE_ALPHA;if(n===1026)return s.DEPTH_COMPONENT;if(n===1027)return s.DEPTH_STENCIL;if(n===1028)return s.RED;if(n===1029)return s.RED_INTEGER;if(n===1030)return s.RG;if(n===1031)return s.RG_INTEGER;if(n===1033)return s.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===Vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===33776)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===33776)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===35840)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===36196||n===37492)return a===Vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===37496)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===37808)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===36492)return a===Vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===36492)return r.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class sm extends Ln{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class bt extends Qt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const rm={type:"move"};class va{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),d=this._getHandJoint(l,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,g=.005;l.inputState.pinching&&f>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(rm)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new bt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const am=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,om=`
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

}`;class cm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new an,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Pi({vertexShader:am,fragmentShader:om,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ke(new kn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class lm extends gs{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,f=null,p=null,g=null;const _=new cm,m=t.getContextAttributes();let d=null,x=null;const M=[],b=[],D=new Oe;let A=null;const E=new Ln;E.viewport=new Dt;const w=new Ln;w.viewport=new Dt;const y=[E,w],v=new sm;let F=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ce){let _e=M[ce];return _e===void 0&&(_e=new va,M[ce]=_e),_e.getTargetRaySpace()},this.getControllerGrip=function(ce){let _e=M[ce];return _e===void 0&&(_e=new va,M[ce]=_e),_e.getGripSpace()},this.getHand=function(ce){let _e=M[ce];return _e===void 0&&(_e=new va,M[ce]=_e),_e.getHandSpace()};function k(ce){const _e=b.indexOf(ce.inputSource);if(_e===-1)return;const De=M[_e];De!==void 0&&(De.update(ce.inputSource,ce.frame,l||a),De.dispatchEvent({type:ce.type,data:ce.inputSource}))}function Q(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",Q),i.removeEventListener("inputsourceschange",ie);for(let ce=0;ce<M.length;ce++){const _e=b[ce];_e!==null&&(b[ce]=null,M[ce].disconnect(_e))}F=null,B=null,_.reset(),e.setRenderTarget(d),p=null,f=null,h=null,i=null,x=null,We.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ce){r=ce,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ce){o=ce,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ce){l=ce},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(ce){if(i=ce,i!==null){if(d=e.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",Q),i.addEventListener("inputsourceschange",ie),m.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(D),i.renderState.layers===void 0){const _e={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,t,_e),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new Ci(p.framebufferWidth,p.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let _e=null,De=null,ye=null;m.depth&&(ye=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,_e=m.stencil?1027:1026,De=m.stencil?1020:1014);const Ye={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};h=new XRWebGLBinding(i,t),f=h.createProjectionLayer(Ye),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new Ci(f.textureWidth,f.textureHeight,{format:1023,type:1009,depthTexture:new ll(f.textureWidth,f.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),We.setContext(i),We.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ie(ce){for(let _e=0;_e<ce.removed.length;_e++){const De=ce.removed[_e],ye=b.indexOf(De);ye>=0&&(b[ye]=null,M[ye].disconnect(De))}for(let _e=0;_e<ce.added.length;_e++){const De=ce.added[_e];let ye=b.indexOf(De);if(ye===-1){for(let it=0;it<M.length;it++)if(it>=b.length){b.push(De),ye=it;break}else if(b[it]===null){b[it]=De,ye=it;break}if(ye===-1)break}const Ye=M[ye];Ye&&Ye.connect(De)}}const U=new N,ee=new N;function Z(ce,_e,De){U.setFromMatrixPosition(_e.matrixWorld),ee.setFromMatrixPosition(De.matrixWorld);const ye=U.distanceTo(ee),Ye=_e.projectionMatrix.elements,it=De.projectionMatrix.elements,ht=Ye[14]/(Ye[10]-1),_t=Ye[14]/(Ye[10]+1),ft=(Ye[9]+1)/Ye[5],xt=(Ye[9]-1)/Ye[5],W=(Ye[8]-1)/Ye[0],kt=(it[8]+1)/it[0],ct=ht*W,at=ht*kt,st=ye/(-W+kt),wt=st*-W;if(_e.matrixWorld.decompose(ce.position,ce.quaternion,ce.scale),ce.translateX(wt),ce.translateZ(st),ce.matrixWorld.compose(ce.position,ce.quaternion,ce.scale),ce.matrixWorldInverse.copy(ce.matrixWorld).invert(),Ye[10]===-1)ce.projectionMatrix.copy(_e.projectionMatrix),ce.projectionMatrixInverse.copy(_e.projectionMatrixInverse);else{const Qe=ht+st,I=_t+st,S=ct-wt,Y=at+(ye-wt),be=ft*_t/I*Qe,de=xt*_t/I*Qe;ce.projectionMatrix.makePerspective(S,Y,be,de,Qe,I),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert()}}function fe(ce,_e){_e===null?ce.matrixWorld.copy(ce.matrix):ce.matrixWorld.multiplyMatrices(_e.matrixWorld,ce.matrix),ce.matrixWorldInverse.copy(ce.matrixWorld).invert()}this.updateCamera=function(ce){if(i===null)return;let _e=ce.near,De=ce.far;_.texture!==null&&(_.depthNear>0&&(_e=_.depthNear),_.depthFar>0&&(De=_.depthFar)),v.near=w.near=E.near=_e,v.far=w.far=E.far=De,(F!==v.near||B!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),F=v.near,B=v.far),E.layers.mask=ce.layers.mask|2,w.layers.mask=ce.layers.mask|4,v.layers.mask=E.layers.mask|w.layers.mask;const ye=ce.parent,Ye=v.cameras;fe(v,ye);for(let it=0;it<Ye.length;it++)fe(Ye[it],ye);Ye.length===2?Z(v,E,w):v.projectionMatrix.copy(E.projectionMatrix),$(ce,v,ye)};function $(ce,_e,De){De===null?ce.matrix.copy(_e.matrixWorld):(ce.matrix.copy(De.matrixWorld),ce.matrix.invert(),ce.matrix.multiply(_e.matrixWorld)),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.updateMatrixWorld(!0),ce.projectionMatrix.copy(_e.projectionMatrix),ce.projectionMatrixInverse.copy(_e.projectionMatrixInverse),ce.isPerspectiveCamera&&(ce.fov=us*2*Math.atan(1/ce.projectionMatrix.elements[5]),ce.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(ce){c=ce,f!==null&&(f.fixedFoveation=ce),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=ce)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let te=null;function Ae(ce,_e){if(u=_e.getViewerPose(l||a),g=_e,u!==null){const De=u.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let ye=!1;De.length!==v.cameras.length&&(v.cameras.length=0,ye=!0);for(let it=0;it<De.length;it++){const ht=De[it];let _t=null;if(p!==null)_t=p.getViewport(ht);else{const xt=h.getViewSubImage(f,ht);_t=xt.viewport,it===0&&(e.setRenderTargetTextures(x,xt.colorTexture,f.ignoreDepthValues?void 0:xt.depthStencilTexture),e.setRenderTarget(x))}let ft=y[it];ft===void 0&&(ft=new Ln,ft.layers.enable(it),ft.viewport=new Dt,y[it]=ft),ft.matrix.fromArray(ht.transform.matrix),ft.matrix.decompose(ft.position,ft.quaternion,ft.scale),ft.projectionMatrix.fromArray(ht.projectionMatrix),ft.projectionMatrixInverse.copy(ft.projectionMatrix).invert(),ft.viewport.set(_t.x,_t.y,_t.width,_t.height),it===0&&(v.matrix.copy(ft.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ye===!0&&v.cameras.push(ft)}const Ye=i.enabledFeatures;if(Ye&&Ye.includes("depth-sensing")){const it=h.getDepthInformation(De[0]);it&&it.isValid&&it.texture&&_.init(e,it,i.renderState)}}for(let De=0;De<M.length;De++){const ye=b[De],Ye=M[De];ye!==null&&Ye!==void 0&&Ye.update(ye,_e,l||a)}te&&te(ce,_e),_e.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:_e}),g=null}const We=new cl;We.setAnimationLoop(Ae),this.setAnimationLoop=function(ce){te=ce},this.dispose=function(){}}}const Oi=new Gn,hm=new rt;function um(s,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,rl(s)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function i(m,d,x,M,b){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),h(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,b)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),_(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?c(m,d,x,M):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===1&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===1&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const x=e.get(d),M=x.envMap,b=x.envMapRotation;M&&(m.envMap.value=M,Oi.copy(b),Oi.x*=-1,Oi.y*=-1,Oi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Oi.y*=-1,Oi.z*=-1),m.envMapRotation.value.setFromMatrix4(hm.makeRotationFromEuler(Oi)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,x,M){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*x,m.scale.value=M*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,x){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===1&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const x=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function fm(s,e,t,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,M){const b=M.program;n.uniformBlockBinding(x,b)}function l(x,M){let b=i[x.id];b===void 0&&(g(x),b=u(x),i[x.id]=b,x.addEventListener("dispose",m));const D=M.program;n.updateUBOMapping(x,D);const A=e.render.frame;r[x.id]!==A&&(f(x),r[x.id]=A)}function u(x){const M=h();x.__bindingPointIndex=M;const b=s.createBuffer(),D=x.__size,A=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,D,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,b),b}function h(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const M=i[x.id],b=x.uniforms,D=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let A=0,E=b.length;A<E;A++){const w=Array.isArray(b[A])?b[A]:[b[A]];for(let y=0,v=w.length;y<v;y++){const F=w[y];if(p(F,A,y,D)===!0){const B=F.__offset,k=Array.isArray(F.value)?F.value:[F.value];let Q=0;for(let ie=0;ie<k.length;ie++){const U=k[ie],ee=_(U);typeof U=="number"||typeof U=="boolean"?(F.__data[0]=U,s.bufferSubData(s.UNIFORM_BUFFER,B+Q,F.__data)):U.isMatrix3?(F.__data[0]=U.elements[0],F.__data[1]=U.elements[1],F.__data[2]=U.elements[2],F.__data[3]=0,F.__data[4]=U.elements[3],F.__data[5]=U.elements[4],F.__data[6]=U.elements[5],F.__data[7]=0,F.__data[8]=U.elements[6],F.__data[9]=U.elements[7],F.__data[10]=U.elements[8],F.__data[11]=0):(U.toArray(F.__data,Q),Q+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,B,F.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(x,M,b,D){const A=x.value,E=M+"_"+b;if(D[E]===void 0)return typeof A=="number"||typeof A=="boolean"?D[E]=A:D[E]=A.clone(),!0;{const w=D[E];if(typeof A=="number"||typeof A=="boolean"){if(w!==A)return D[E]=A,!0}else if(w.equals(A)===!1)return w.copy(A),!0}return!1}function g(x){const M=x.uniforms;let b=0;const D=16;for(let E=0,w=M.length;E<w;E++){const y=Array.isArray(M[E])?M[E]:[M[E]];for(let v=0,F=y.length;v<F;v++){const B=y[v],k=Array.isArray(B.value)?B.value:[B.value];for(let Q=0,ie=k.length;Q<ie;Q++){const U=k[Q],ee=_(U),Z=b%D,fe=Z%ee.boundary,$=Z+fe;b+=fe,$!==0&&D-$<ee.storage&&(b+=D-$),B.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=b,b+=ee.storage}}}const A=b%D;return A>0&&(b+=D-A),x.__size=b,x.__cache={},this}function _(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),M}function m(x){const M=x.target;M.removeEventListener("dispose",m);const b=a.indexOf(M.__bindingPointIndex);a.splice(b,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function d(){for(const x in i)s.deleteBuffer(i[x]);a=[],i={},r={}}return{bind:c,update:l,dispose:d}}class dm{constructor(e={}){const{canvas:t=eh(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,d=null;const x=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ot,this.toneMapping=0,this.toneMappingExposure=1;const b=this;let D=!1,A=0,E=0,w=null,y=-1,v=null;const F=new Dt,B=new Dt;let k=null;const Q=new Je(0);let ie=0,U=t.width,ee=t.height,Z=1,fe=null,$=null;const te=new Dt(0,0,U,ee),Ae=new Dt(0,0,U,ee);let We=!1;const ce=new $a;let _e=!1,De=!1;const ye=new rt,Ye=new rt,it=new N,ht=new Dt,_t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ft=!1;function xt(){return w===null?Z:1}let W=n;function kt(T,X){return t.getContext(T,X)}try{const T={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r170"),t.addEventListener("webglcontextlost",xe,!1),t.addEventListener("webglcontextrestored",Ce,!1),t.addEventListener("webglcontextcreationerror",Ie,!1),W===null){const X="webgl2";if(W=kt(X,T),W===null)throw kt(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let ct,at,st,wt,Qe,I,S,Y,be,de,he,Ge,we,Ne,vt,z,je,et,$e,He,yt,gt,It,G;function Re(){ct=new _d(W),ct.init(),gt=new im(W,ct),at=new fd(W,ct,e,gt),st=new em(W,ct),at.reverseDepthBuffer&&f&&st.buffers.depth.setReversed(!0),wt=new Md(W),Qe=new kp,I=new nm(W,ct,st,Qe,at,gt,wt),S=new pd(b),Y=new bd(b),be=new Ah(W),It=new hd(W,be),de=new xd(W,be,wt,It),he=new Sd(W,de,be,wt),$e=new yd(W,at,I),z=new dd(Qe),Ge=new Bp(b,S,Y,ct,at,It,z),we=new um(b,Qe),Ne=new Gp,vt=new qp(ct),et=new ld(b,S,Y,st,he,p,c),je=new Qp(b,he,at),G=new fm(W,wt,at,st),He=new ud(W,ct,wt),yt=new vd(W,ct,wt),wt.programs=Ge.programs,b.capabilities=at,b.extensions=ct,b.properties=Qe,b.renderLists=Ne,b.shadowMap=je,b.state=st,b.info=wt}Re();const ae=new lm(b,W);this.xr=ae,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const T=ct.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=ct.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(T){T!==void 0&&(Z=T,this.setSize(U,ee,!1))},this.getSize=function(T){return T.set(U,ee)},this.setSize=function(T,X,ne=!0){if(ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=T,ee=X,t.width=Math.floor(T*Z),t.height=Math.floor(X*Z),ne===!0&&(t.style.width=T+"px",t.style.height=X+"px"),this.setViewport(0,0,T,X)},this.getDrawingBufferSize=function(T){return T.set(U*Z,ee*Z).floor()},this.setDrawingBufferSize=function(T,X,ne){U=T,ee=X,Z=ne,t.width=Math.floor(T*ne),t.height=Math.floor(X*ne),this.setViewport(0,0,T,X)},this.getCurrentViewport=function(T){return T.copy(F)},this.getViewport=function(T){return T.copy(te)},this.setViewport=function(T,X,ne,H){T.isVector4?te.set(T.x,T.y,T.z,T.w):te.set(T,X,ne,H),st.viewport(F.copy(te).multiplyScalar(Z).round())},this.getScissor=function(T){return T.copy(Ae)},this.setScissor=function(T,X,ne,H){T.isVector4?Ae.set(T.x,T.y,T.z,T.w):Ae.set(T,X,ne,H),st.scissor(B.copy(Ae).multiplyScalar(Z).round())},this.getScissorTest=function(){return We},this.setScissorTest=function(T){st.setScissorTest(We=T)},this.setOpaqueSort=function(T){fe=T},this.setTransparentSort=function(T){$=T},this.getClearColor=function(T){return T.copy(et.getClearColor())},this.setClearColor=function(){et.setClearColor.apply(et,arguments)},this.getClearAlpha=function(){return et.getClearAlpha()},this.setClearAlpha=function(){et.setClearAlpha.apply(et,arguments)},this.clear=function(T=!0,X=!0,ne=!0){let H=0;if(T){let j=!1;if(w!==null){const Ee=w.texture.format;j=Ee===1033||Ee===1031||Ee===1029}if(j){const Ee=w.texture.type,me=Ee===1009||Ee===1014||Ee===1012||Ee===1020||Ee===1017||Ee===1018,Be=et.getClearColor(),qe=et.getClearAlpha(),ot=Be.r,tt=Be.g,Te=Be.b;me?(g[0]=ot,g[1]=tt,g[2]=Te,g[3]=qe,W.clearBufferuiv(W.COLOR,0,g)):(_[0]=ot,_[1]=tt,_[2]=Te,_[3]=qe,W.clearBufferiv(W.COLOR,0,_))}else H|=W.COLOR_BUFFER_BIT}X&&(H|=W.DEPTH_BUFFER_BIT),ne&&(H|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",xe,!1),t.removeEventListener("webglcontextrestored",Ce,!1),t.removeEventListener("webglcontextcreationerror",Ie,!1),Ne.dispose(),vt.dispose(),Qe.dispose(),S.dispose(),Y.dispose(),he.dispose(),It.dispose(),G.dispose(),Ge.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",fn),ae.removeEventListener("sessionend",In),tn.stop()};function xe(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function Ce(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const T=wt.autoReset,X=je.enabled,ne=je.autoUpdate,H=je.needsUpdate,j=je.type;Re(),wt.autoReset=T,je.enabled=X,je.autoUpdate=ne,je.needsUpdate=H,je.type=j}function Ie(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ve(T){const X=T.target;X.removeEventListener("dispose",Ve),Bt(X)}function Bt(T){Xt(T),Qe.remove(T)}function Xt(T){const X=Qe.get(T).programs;X!==void 0&&(X.forEach(function(ne){Ge.releaseProgram(ne)}),T.isShaderMaterial&&Ge.releaseShaderCache(T))}this.renderBufferDirect=function(T,X,ne,H,j,Ee){X===null&&(X=_t);const me=j.isMesh&&j.matrixWorld.determinant()<0,Be=Ze(T,X,ne,H,j);st.setMaterial(H,me);let qe=ne.index,ot=1;if(H.wireframe===!0){if(qe=de.getWireframeAttribute(ne),qe===void 0)return;ot=2}const tt=ne.drawRange,Te=ne.attributes.position;let dt=tt.start*ot,ut=(tt.start+tt.count)*ot;Ee!==null&&(dt=Math.max(dt,Ee.start*ot),ut=Math.min(ut,(Ee.start+Ee.count)*ot)),qe!==null?(dt=Math.max(dt,0),ut=Math.min(ut,qe.count)):Te!=null&&(dt=Math.max(dt,0),ut=Math.min(ut,Te.count));const Mt=ut-dt;if(Mt<0||Mt===1/0)return;It.setup(j,H,Be,ne,qe);let jt,pt=He;if(qe!==null&&(jt=be.get(qe),pt=yt,pt.setIndex(jt)),j.isMesh)H.wireframe===!0?(st.setLineWidth(H.wireframeLinewidth*xt()),pt.setMode(W.LINES)):pt.setMode(W.TRIANGLES);else if(j.isLine){let Xe=H.linewidth;Xe===void 0&&(Xe=1),st.setLineWidth(Xe*xt()),j.isLineSegments?pt.setMode(W.LINES):j.isLineLoop?pt.setMode(W.LINE_LOOP):pt.setMode(W.LINE_STRIP)}else j.isPoints?pt.setMode(W.POINTS):j.isSprite&&pt.setMode(W.TRIANGLES);if(j.isBatchedMesh)if(j._multiDrawInstances!==null)pt.renderMultiDrawInstances(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount,j._multiDrawInstances);else if(ct.get("WEBGL_multi_draw"))pt.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{const Xe=j._multiDrawStarts,lt=j._multiDrawCounts,mt=j._multiDrawCount,Ft=qe?be.get(qe).bytesPerElement:1,gn=Qe.get(H).currentProgram.getUniforms();for(let qt=0;qt<mt;qt++)gn.setValue(W,"_gl_DrawID",qt),pt.render(Xe[qt]/Ft,lt[qt])}else if(j.isInstancedMesh)pt.renderInstances(dt,Mt,j.count);else if(ne.isInstancedBufferGeometry){const Xe=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,lt=Math.min(ne.instanceCount,Xe);pt.renderInstances(dt,Mt,lt)}else pt.render(dt,Mt)};function St(T,X,ne){T.transparent===!0&&T.side===2&&T.forceSinglePass===!1?(T.side=1,T.needsUpdate=!0,nn(T,X,ne),T.side=0,T.needsUpdate=!0,nn(T,X,ne),T.side=2):nn(T,X,ne)}this.compile=function(T,X,ne=null){ne===null&&(ne=T),d=vt.get(ne),d.init(X),M.push(d),ne.traverseVisible(function(j){j.isLight&&j.layers.test(X.layers)&&(d.pushLight(j),j.castShadow&&d.pushShadow(j))}),T!==ne&&T.traverseVisible(function(j){j.isLight&&j.layers.test(X.layers)&&(d.pushLight(j),j.castShadow&&d.pushShadow(j))}),d.setupLights();const H=new Set;return T.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;const Ee=j.material;if(Ee)if(Array.isArray(Ee))for(let me=0;me<Ee.length;me++){const Be=Ee[me];St(Be,ne,j),H.add(Be)}else St(Ee,ne,j),H.add(Ee)}),M.pop(),d=null,H},this.compileAsync=function(T,X,ne=null){const H=this.compile(T,X,ne);return new Promise(j=>{function Ee(){if(H.forEach(function(me){Qe.get(me).currentProgram.isReady()&&H.delete(me)}),H.size===0){j(T);return}setTimeout(Ee,10)}ct.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let $t=null;function en(T){$t&&$t(T)}function fn(){tn.stop()}function In(){tn.start()}const tn=new cl;tn.setAnimationLoop(en),typeof self<"u"&&tn.setContext(self),this.setAnimationLoop=function(T){$t=T,ae.setAnimationLoop(T),T===null?tn.stop():tn.start()},ae.addEventListener("sessionstart",fn),ae.addEventListener("sessionend",In),this.render=function(T,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(X),X=ae.getCamera()),T.isScene===!0&&T.onBeforeRender(b,T,X,w),d=vt.get(T,M.length),d.init(X),M.push(d),Ye.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),ce.setFromProjectionMatrix(Ye),De=this.localClippingEnabled,_e=z.init(this.clippingPlanes,De),m=Ne.get(T,x.length),m.init(),x.push(m),ae.enabled===!0&&ae.isPresenting===!0){const Ee=b.xr.getDepthSensingMesh();Ee!==null&&Rn(Ee,X,-1/0,b.sortObjects)}Rn(T,X,0,b.sortObjects),m.finish(),b.sortObjects===!0&&m.sort(fe,$),ft=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,ft&&et.addToRenderList(m,T),this.info.render.frame++,_e===!0&&z.beginShadows();const ne=d.state.shadowsArray;je.render(ne,T,X),_e===!0&&z.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,j=m.transmissive;if(d.setupLights(),X.isArrayCamera){const Ee=X.cameras;if(j.length>0)for(let me=0,Be=Ee.length;me<Be;me++){const qe=Ee[me];Fn(H,j,T,qe)}ft&&et.render(T);for(let me=0,Be=Ee.length;me<Be;me++){const qe=Ee[me];Cn(m,T,qe,qe.viewport)}}else j.length>0&&Fn(H,j,T,X),ft&&et.render(T),Cn(m,T,X);w!==null&&(I.updateMultisampleRenderTarget(w),I.updateRenderTargetMipmap(w)),T.isScene===!0&&T.onAfterRender(b,T,X),It.resetDefaultState(),y=-1,v=null,M.pop(),M.length>0?(d=M[M.length-1],_e===!0&&z.setGlobalState(b.clippingPlanes,d.state.camera)):d=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function Rn(T,X,ne,H){if(T.visible===!1)return;if(T.layers.test(X.layers)){if(T.isGroup)ne=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(X);else if(T.isLight)d.pushLight(T),T.castShadow&&d.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||ce.intersectsSprite(T)){H&&ht.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ye);const me=he.update(T),Be=T.material;Be.visible&&m.push(T,me,Be,ne,ht.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||ce.intersectsObject(T))){const me=he.update(T),Be=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ht.copy(T.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),ht.copy(me.boundingSphere.center)),ht.applyMatrix4(T.matrixWorld).applyMatrix4(Ye)),Array.isArray(Be)){const qe=me.groups;for(let ot=0,tt=qe.length;ot<tt;ot++){const Te=qe[ot],dt=Be[Te.materialIndex];dt&&dt.visible&&m.push(T,me,dt,ne,ht.z,Te)}}else Be.visible&&m.push(T,me,Be,ne,ht.z,null)}}const Ee=T.children;for(let me=0,Be=Ee.length;me<Be;me++)Rn(Ee[me],X,ne,H)}function Cn(T,X,ne,H){const j=T.opaque,Ee=T.transmissive,me=T.transparent;d.setupLightsView(ne),_e===!0&&z.setGlobalState(b.clippingPlanes,ne),H&&st.viewport(F.copy(H)),j.length>0&&mn(j,X,ne),Ee.length>0&&mn(Ee,X,ne),me.length>0&&mn(me,X,ne),st.buffers.depth.setTest(!0),st.buffers.depth.setMask(!0),st.buffers.color.setMask(!0),st.setPolygonOffset(!1)}function Fn(T,X,ne,H){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[H.id]===void 0&&(d.state.transmissionRenderTarget[H.id]=new Ci(1,1,{generateMipmaps:!0,type:ct.has("EXT_color_buffer_half_float")||ct.has("EXT_color_buffer_float")?1016:1009,minFilter:1008,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Lt.workingColorSpace}));const Ee=d.state.transmissionRenderTarget[H.id],me=H.viewport||F;Ee.setSize(me.z,me.w);const Be=b.getRenderTarget();b.setRenderTarget(Ee),b.getClearColor(Q),ie=b.getClearAlpha(),ie<1&&b.setClearColor(16777215,.5),b.clear(),ft&&et.render(ne);const qe=b.toneMapping;b.toneMapping=0;const ot=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),d.setupLightsView(H),_e===!0&&z.setGlobalState(b.clippingPlanes,H),mn(T,ne,H),I.updateMultisampleRenderTarget(Ee),I.updateRenderTargetMipmap(Ee),ct.has("WEBGL_multisampled_render_to_texture")===!1){let tt=!1;for(let Te=0,dt=X.length;Te<dt;Te++){const ut=X[Te],Mt=ut.object,jt=ut.geometry,pt=ut.material,Xe=ut.group;if(pt.side===2&&Mt.layers.test(H.layers)){const lt=pt.side;pt.side=1,pt.needsUpdate=!0,oi(Mt,ne,H,jt,pt,Xe),pt.side=lt,pt.needsUpdate=!0,tt=!0}}tt===!0&&(I.updateMultisampleRenderTarget(Ee),I.updateRenderTargetMipmap(Ee))}b.setRenderTarget(Be),b.setClearColor(Q,ie),ot!==void 0&&(H.viewport=ot),b.toneMapping=qe}function mn(T,X,ne){const H=X.isScene===!0?X.overrideMaterial:null;for(let j=0,Ee=T.length;j<Ee;j++){const me=T[j],Be=me.object,qe=me.geometry,ot=H===null?me.material:H,tt=me.group;Be.layers.test(ne.layers)&&oi(Be,X,ne,qe,ot,tt)}}function oi(T,X,ne,H,j,Ee){T.onBeforeRender(b,X,ne,H,j,Ee),T.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),j.onBeforeRender(b,X,ne,H,T,Ee),j.transparent===!0&&j.side===2&&j.forceSinglePass===!1?(j.side=1,j.needsUpdate=!0,b.renderBufferDirect(ne,X,H,j,T,Ee),j.side=0,j.needsUpdate=!0,b.renderBufferDirect(ne,X,H,j,T,Ee),j.side=2):b.renderBufferDirect(ne,X,H,j,T,Ee),T.onAfterRender(b,X,ne,H,j,Ee)}function nn(T,X,ne){X.isScene!==!0&&(X=_t);const H=Qe.get(T),j=d.state.lights,Ee=d.state.shadowsArray,me=j.state.version,Be=Ge.getParameters(T,j.state,Ee,X,ne),qe=Ge.getProgramCacheKey(Be);let ot=H.programs;H.environment=T.isMeshStandardMaterial?X.environment:null,H.fog=X.fog,H.envMap=(T.isMeshStandardMaterial?Y:S).get(T.envMap||H.environment),H.envMapRotation=H.environment!==null&&T.envMap===null?X.environmentRotation:T.envMapRotation,ot===void 0&&(T.addEventListener("dispose",Ve),ot=new Map,H.programs=ot);let tt=ot.get(qe);if(tt!==void 0){if(H.currentProgram===tt&&H.lightsStateVersion===me)return Kn(T,Be),tt}else Be.uniforms=Ge.getUniforms(T),T.onBeforeCompile(Be,b),tt=Ge.acquireProgram(Be,qe),ot.set(qe,tt),H.uniforms=Be.uniforms;const Te=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Te.clippingPlanes=z.uniform),Kn(T,Be),H.needsLights=Ct(T),H.lightsStateVersion=me,H.needsLights&&(Te.ambientLightColor.value=j.state.ambient,Te.lightProbe.value=j.state.probe,Te.directionalLights.value=j.state.directional,Te.directionalLightShadows.value=j.state.directionalShadow,Te.spotLights.value=j.state.spot,Te.spotLightShadows.value=j.state.spotShadow,Te.rectAreaLights.value=j.state.rectArea,Te.ltc_1.value=j.state.rectAreaLTC1,Te.ltc_2.value=j.state.rectAreaLTC2,Te.pointLights.value=j.state.point,Te.pointLightShadows.value=j.state.pointShadow,Te.hemisphereLights.value=j.state.hemi,Te.directionalShadowMap.value=j.state.directionalShadowMap,Te.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Te.spotShadowMap.value=j.state.spotShadowMap,Te.spotLightMatrix.value=j.state.spotLightMatrix,Te.spotLightMap.value=j.state.spotLightMap,Te.pointShadowMap.value=j.state.pointShadowMap,Te.pointShadowMatrix.value=j.state.pointShadowMatrix),H.currentProgram=tt,H.uniformsList=null,tt}function Hn(T){if(T.uniformsList===null){const X=T.currentProgram.getUniforms();T.uniformsList=Nr.seqWithValue(X.seq,T.uniforms)}return T.uniformsList}function Kn(T,X){const ne=Qe.get(T);ne.outputColorSpace=X.outputColorSpace,ne.batching=X.batching,ne.batchingColor=X.batchingColor,ne.instancing=X.instancing,ne.instancingColor=X.instancingColor,ne.instancingMorph=X.instancingMorph,ne.skinning=X.skinning,ne.morphTargets=X.morphTargets,ne.morphNormals=X.morphNormals,ne.morphColors=X.morphColors,ne.morphTargetsCount=X.morphTargetsCount,ne.numClippingPlanes=X.numClippingPlanes,ne.numIntersection=X.numClipIntersection,ne.vertexAlphas=X.vertexAlphas,ne.vertexTangents=X.vertexTangents,ne.toneMapping=X.toneMapping}function Ze(T,X,ne,H,j){X.isScene!==!0&&(X=_t),I.resetTextureUnits();const Ee=X.fog,me=H.isMeshStandardMaterial?X.environment:null,Be=w===null?b.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:An,qe=(H.isMeshStandardMaterial?Y:S).get(H.envMap||me),ot=H.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,tt=!!ne.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Te=!!ne.morphAttributes.position,dt=!!ne.morphAttributes.normal,ut=!!ne.morphAttributes.color;let Mt=0;H.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Mt=b.toneMapping);const jt=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,pt=jt!==void 0?jt.length:0,Xe=Qe.get(H),lt=d.state.lights;if(_e===!0&&(De===!0||T!==v)){const cn=T===v&&H.id===y;z.setState(H,T,cn)}let mt=!1;H.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==lt.state.version||Xe.outputColorSpace!==Be||j.isBatchedMesh&&Xe.batching===!1||!j.isBatchedMesh&&Xe.batching===!0||j.isBatchedMesh&&Xe.batchingColor===!0&&j.colorTexture===null||j.isBatchedMesh&&Xe.batchingColor===!1&&j.colorTexture!==null||j.isInstancedMesh&&Xe.instancing===!1||!j.isInstancedMesh&&Xe.instancing===!0||j.isSkinnedMesh&&Xe.skinning===!1||!j.isSkinnedMesh&&Xe.skinning===!0||j.isInstancedMesh&&Xe.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&Xe.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&Xe.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&Xe.instancingMorph===!1&&j.morphTexture!==null||Xe.envMap!==qe||H.fog===!0&&Xe.fog!==Ee||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==z.numPlanes||Xe.numIntersection!==z.numIntersection)||Xe.vertexAlphas!==ot||Xe.vertexTangents!==tt||Xe.morphTargets!==Te||Xe.morphNormals!==dt||Xe.morphColors!==ut||Xe.toneMapping!==Mt||Xe.morphTargetsCount!==pt)&&(mt=!0):(mt=!0,Xe.__version=H.version);let Ft=Xe.currentProgram;mt===!0&&(Ft=nn(H,X,j));let gn=!1,qt=!1,Sn=!1;const Nt=Ft.getUniforms(),Ut=Xe.uniforms;if(st.useProgram(Ft.program)&&(gn=!0,qt=!0,Sn=!0),H.id!==y&&(y=H.id,qt=!0),gn||v!==T){st.buffers.depth.getReversed()?(ye.copy(T.projectionMatrix),nh(ye),ih(ye),Nt.setValue(W,"projectionMatrix",ye)):Nt.setValue(W,"projectionMatrix",T.projectionMatrix),Nt.setValue(W,"viewMatrix",T.matrixWorldInverse);const P=Nt.map.cameraPosition;P!==void 0&&P.setValue(W,it.setFromMatrixPosition(T.matrixWorld)),at.logarithmicDepthBuffer&&Nt.setValue(W,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Nt.setValue(W,"isOrthographic",T.isOrthographicCamera===!0),v!==T&&(v=T,qt=!0,Sn=!0)}if(j.isSkinnedMesh){Nt.setOptional(W,j,"bindMatrix"),Nt.setOptional(W,j,"bindMatrixInverse");const cn=j.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),Nt.setValue(W,"boneTexture",cn.boneTexture,I))}j.isBatchedMesh&&(Nt.setOptional(W,j,"batchingTexture"),Nt.setValue(W,"batchingTexture",j._matricesTexture,I),Nt.setOptional(W,j,"batchingIdTexture"),Nt.setValue(W,"batchingIdTexture",j._indirectTexture,I),Nt.setOptional(W,j,"batchingColorTexture"),j._colorsTexture!==null&&Nt.setValue(W,"batchingColorTexture",j._colorsTexture,I));const _n=ne.morphAttributes;if((_n.position!==void 0||_n.normal!==void 0||_n.color!==void 0)&&$e.update(j,ne,Ft),(qt||Xe.receiveShadow!==j.receiveShadow)&&(Xe.receiveShadow=j.receiveShadow,Nt.setValue(W,"receiveShadow",j.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Ut.envMap.value=qe,Ut.flipEnvMap.value=qe.isCubeTexture&&qe.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&X.environment!==null&&(Ut.envMapIntensity.value=X.environmentIntensity),qt&&(Nt.setValue(W,"toneMappingExposure",b.toneMappingExposure),Xe.needsLights&&on(Ut,Sn),Ee&&H.fog===!0&&we.refreshFogUniforms(Ut,Ee),we.refreshMaterialUniforms(Ut,H,Z,ee,d.state.transmissionRenderTarget[T.id]),Nr.upload(W,Hn(Xe),Ut,I)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Nr.upload(W,Hn(Xe),Ut,I),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Nt.setValue(W,"center",j.center),Nt.setValue(W,"modelViewMatrix",j.modelViewMatrix),Nt.setValue(W,"normalMatrix",j.normalMatrix),Nt.setValue(W,"modelMatrix",j.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const cn=H.uniformsGroups;for(let P=0,q=cn.length;P<q;P++){const K=cn[P];G.update(K,Ft),G.bind(K,Ft)}}return Ft}function on(T,X){T.ambientLightColor.needsUpdate=X,T.lightProbe.needsUpdate=X,T.directionalLights.needsUpdate=X,T.directionalLightShadows.needsUpdate=X,T.pointLights.needsUpdate=X,T.pointLightShadows.needsUpdate=X,T.spotLights.needsUpdate=X,T.spotLightShadows.needsUpdate=X,T.rectAreaLights.needsUpdate=X,T.hemisphereLights.needsUpdate=X}function Ct(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(T,X,ne){Qe.get(T.texture).__webglTexture=X,Qe.get(T.depthTexture).__webglTexture=ne;const H=Qe.get(T);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=ne===void 0,H.__autoAllocateDepthBuffer||ct.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,X){const ne=Qe.get(T);ne.__webglFramebuffer=X,ne.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(T,X=0,ne=0){w=T,A=X,E=ne;let H=!0,j=null,Ee=!1,me=!1;if(T){const qe=Qe.get(T);if(qe.__useDefaultFramebuffer!==void 0)st.bindFramebuffer(W.FRAMEBUFFER,null),H=!1;else if(qe.__webglFramebuffer===void 0)I.setupRenderTarget(T);else if(qe.__hasExternalTextures)I.rebindTextures(T,Qe.get(T.texture).__webglTexture,Qe.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Te=T.depthTexture;if(qe.__boundDepthTexture!==Te){if(Te!==null&&Qe.has(Te)&&(T.width!==Te.image.width||T.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(T)}}const ot=T.texture;(ot.isData3DTexture||ot.isDataArrayTexture||ot.isCompressedArrayTexture)&&(me=!0);const tt=Qe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(tt[X])?j=tt[X][ne]:j=tt[X],Ee=!0):T.samples>0&&I.useMultisampledRTT(T)===!1?j=Qe.get(T).__webglMultisampledFramebuffer:Array.isArray(tt)?j=tt[ne]:j=tt,F.copy(T.viewport),B.copy(T.scissor),k=T.scissorTest}else F.copy(te).multiplyScalar(Z).floor(),B.copy(Ae).multiplyScalar(Z).floor(),k=We;if(st.bindFramebuffer(W.FRAMEBUFFER,j)&&H&&st.drawBuffers(T,j),st.viewport(F),st.scissor(B),st.setScissorTest(k),Ee){const qe=Qe.get(T.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+X,qe.__webglTexture,ne)}else if(me){const qe=Qe.get(T.texture),ot=X||0;W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,qe.__webglTexture,ne||0,ot)}y=-1},this.readRenderTargetPixels=function(T,X,ne,H,j,Ee,me){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Be=Qe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&me!==void 0&&(Be=Be[me]),Be){st.bindFramebuffer(W.FRAMEBUFFER,Be);try{const qe=T.texture,ot=qe.format,tt=qe.type;if(!at.textureFormatReadable(ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!at.textureTypeReadable(tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=T.width-H&&ne>=0&&ne<=T.height-j&&W.readPixels(X,ne,H,j,gt.convert(ot),gt.convert(tt),Ee)}finally{const qe=w!==null?Qe.get(w).__webglFramebuffer:null;st.bindFramebuffer(W.FRAMEBUFFER,qe)}}},this.readRenderTargetPixelsAsync=async function(T,X,ne,H,j,Ee,me){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Be=Qe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&me!==void 0&&(Be=Be[me]),Be){const qe=T.texture,ot=qe.format,tt=qe.type;if(!at.textureFormatReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!at.textureTypeReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(X>=0&&X<=T.width-H&&ne>=0&&ne<=T.height-j){st.bindFramebuffer(W.FRAMEBUFFER,Be);const Te=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,Te),W.bufferData(W.PIXEL_PACK_BUFFER,Ee.byteLength,W.STREAM_READ),W.readPixels(X,ne,H,j,gt.convert(ot),gt.convert(tt),0);const dt=w!==null?Qe.get(w).__webglFramebuffer:null;st.bindFramebuffer(W.FRAMEBUFFER,dt);const ut=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await th(W,ut,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,Te),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,Ee),W.deleteBuffer(Te),W.deleteSync(ut),Ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,X=null,ne=0){T.isTexture!==!0&&(Ns("WebGLRenderer: copyFramebufferToTexture function signature has changed."),X=arguments[0]||null,T=arguments[1]);const H=Math.pow(2,-ne),j=Math.floor(T.image.width*H),Ee=Math.floor(T.image.height*H),me=X!==null?X.x:0,Be=X!==null?X.y:0;I.setTexture2D(T,0),W.copyTexSubImage2D(W.TEXTURE_2D,ne,0,0,me,Be,j,Ee),st.unbindTexture()},this.copyTextureToTexture=function(T,X,ne=null,H=null,j=0){T.isTexture!==!0&&(Ns("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,T=arguments[1],X=arguments[2],j=arguments[3]||0,ne=null);let Ee,me,Be,qe,ot,tt,Te,dt,ut;const Mt=T.isCompressedTexture?T.mipmaps[j]:T.image;ne!==null?(Ee=ne.max.x-ne.min.x,me=ne.max.y-ne.min.y,Be=ne.isBox3?ne.max.z-ne.min.z:1,qe=ne.min.x,ot=ne.min.y,tt=ne.isBox3?ne.min.z:0):(Ee=Mt.width,me=Mt.height,Be=Mt.depth||1,qe=0,ot=0,tt=0),H!==null?(Te=H.x,dt=H.y,ut=H.z):(Te=0,dt=0,ut=0);const jt=gt.convert(X.format),pt=gt.convert(X.type);let Xe;X.isData3DTexture?(I.setTexture3D(X,0),Xe=W.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(I.setTexture2DArray(X,0),Xe=W.TEXTURE_2D_ARRAY):(I.setTexture2D(X,0),Xe=W.TEXTURE_2D),W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,X.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,X.unpackAlignment);const lt=W.getParameter(W.UNPACK_ROW_LENGTH),mt=W.getParameter(W.UNPACK_IMAGE_HEIGHT),Ft=W.getParameter(W.UNPACK_SKIP_PIXELS),gn=W.getParameter(W.UNPACK_SKIP_ROWS),qt=W.getParameter(W.UNPACK_SKIP_IMAGES);W.pixelStorei(W.UNPACK_ROW_LENGTH,Mt.width),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,Mt.height),W.pixelStorei(W.UNPACK_SKIP_PIXELS,qe),W.pixelStorei(W.UNPACK_SKIP_ROWS,ot),W.pixelStorei(W.UNPACK_SKIP_IMAGES,tt);const Sn=T.isDataArrayTexture||T.isData3DTexture,Nt=X.isDataArrayTexture||X.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const Ut=Qe.get(T),_n=Qe.get(X),cn=Qe.get(Ut.__renderTarget),P=Qe.get(_n.__renderTarget);st.bindFramebuffer(W.READ_FRAMEBUFFER,cn.__webglFramebuffer),st.bindFramebuffer(W.DRAW_FRAMEBUFFER,P.__webglFramebuffer);for(let q=0;q<Be;q++)Sn&&W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Qe.get(T).__webglTexture,j,tt+q),T.isDepthTexture?(Nt&&W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Qe.get(X).__webglTexture,j,ut+q),W.blitFramebuffer(qe,ot,Ee,me,Te,dt,Ee,me,W.DEPTH_BUFFER_BIT,W.NEAREST)):Nt?W.copyTexSubImage3D(Xe,j,Te,dt,ut+q,qe,ot,Ee,me):W.copyTexSubImage2D(Xe,j,Te,dt,ut+q,qe,ot,Ee,me);st.bindFramebuffer(W.READ_FRAMEBUFFER,null),st.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else Nt?T.isDataTexture||T.isData3DTexture?W.texSubImage3D(Xe,j,Te,dt,ut,Ee,me,Be,jt,pt,Mt.data):X.isCompressedArrayTexture?W.compressedTexSubImage3D(Xe,j,Te,dt,ut,Ee,me,Be,jt,Mt.data):W.texSubImage3D(Xe,j,Te,dt,ut,Ee,me,Be,jt,pt,Mt):T.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,j,Te,dt,Ee,me,jt,pt,Mt.data):T.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,j,Te,dt,Mt.width,Mt.height,jt,Mt.data):W.texSubImage2D(W.TEXTURE_2D,j,Te,dt,Ee,me,jt,pt,Mt);W.pixelStorei(W.UNPACK_ROW_LENGTH,lt),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,mt),W.pixelStorei(W.UNPACK_SKIP_PIXELS,Ft),W.pixelStorei(W.UNPACK_SKIP_ROWS,gn),W.pixelStorei(W.UNPACK_SKIP_IMAGES,qt),j===0&&X.generateMipmaps&&W.generateMipmap(Xe),st.unbindTexture()},this.copyTextureToTexture3D=function(T,X,ne=null,H=null,j=0){return T.isTexture!==!0&&(Ns("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ne=arguments[0]||null,H=arguments[1]||null,T=arguments[2],X=arguments[3],j=arguments[4]||0),Ns('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,X,ne,H,j)},this.initRenderTarget=function(T){Qe.get(T).__webglFramebuffer===void 0&&I.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?I.setTextureCube(T,0):T.isData3DTexture?I.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?I.setTexture2DArray(T,0):I.setTexture2D(T,0),st.unbindTexture()},this.resetState=function(){A=0,E=0,w=null,st.reset(),It.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Lt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Lt._getUnpackColorSpace()}}class lc extends Qt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Gn,this.environmentIntensity=1,this.environmentRotation=new Gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class pl{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=ei()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Tn=new N;class Vs{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.applyMatrix4(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.applyNormalMatrix(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.transformDirection(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Qn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=zt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Qn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Qn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Qn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Qn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),i=zt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),i=zt(i,this.array),r=zt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Ht(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Vs(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ml extends qn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Je(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let is;const Ts=new N,ss=new N,rs=new N,as=new Oe,ws=new Oe,gl=new rt,xr=new N,As=new N,vr=new N,hc=new Oe,Ma=new Oe,uc=new Oe;class pm extends Qt{constructor(e=new ml){if(super(),this.isSprite=!0,this.type="Sprite",is===void 0){is=new Wt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new pl(t,5);is.setIndex([0,1,2,0,2,3]),is.setAttribute("position",new Vs(n,3,0,!1)),is.setAttribute("uv",new Vs(n,2,3,!1))}this.geometry=is,this.material=e,this.center=new Oe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ss.setFromMatrixScale(this.matrixWorld),gl.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),rs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ss.multiplyScalar(-rs.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Mr(xr.set(-.5,-.5,0),rs,a,ss,i,r),Mr(As.set(.5,-.5,0),rs,a,ss,i,r),Mr(vr.set(.5,.5,0),rs,a,ss,i,r),hc.set(0,0),Ma.set(1,0),uc.set(1,1);let o=e.ray.intersectTriangle(xr,As,vr,!1,Ts);if(o===null&&(Mr(As.set(-.5,.5,0),rs,a,ss,i,r),Ma.set(0,1),o=e.ray.intersectTriangle(xr,vr,As,!1,Ts),o===null))return;const c=e.ray.origin.distanceTo(Ts);c<e.near||c>e.far||t.push({distance:c,point:Ts.clone(),uv:jn.getInterpolation(Ts,xr,As,vr,hc,Ma,uc,new Oe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Mr(s,e,t,n,i,r){as.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(ws.x=r*as.x-i*as.y,ws.y=i*as.x+r*as.y):ws.copy(as),s.copy(e),s.x+=ws.x,s.y+=ws.y,s.applyMatrix4(gl)}const fc=new N,dc=new Dt,pc=new Dt,mm=new N,mc=new rt,yr=new N,ya=new ii,gc=new rt,Sa=new zr;class gm extends Ke{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=mo,this.bindMatrix=new rt,this.bindMatrixInverse=new rt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Mn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,yr),this.boundingBox.expandByPoint(yr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ii),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,yr),this.boundingSphere.expandByPoint(yr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ya.copy(this.boundingSphere),ya.applyMatrix4(i),e.ray.intersectsSphere(ya)!==!1&&(gc.copy(i).invert(),Sa.copy(e.ray).applyMatrix4(gc),!(this.boundingBox!==null&&Sa.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Sa)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Dt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===mo?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Ul?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;dc.fromBufferAttribute(i.attributes.skinIndex,e),pc.fromBufferAttribute(i.attributes.skinWeight,e),fc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=pc.getComponent(r);if(a!==0){const o=dc.getComponent(r);mc.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(mm.copy(fc).applyMatrix4(mc),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class bl extends Qt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class _l extends an{constructor(e=null,t=1,n=1,i,r,a,o,c,l=1003,u=1003,h,f){super(null,a,o,c,l,u,i,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const bc=new rt,bm=new rt;class to{constructor(e=[],t=[]){this.uuid=ei(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new rt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new rt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:bm;bc.multiplyMatrices(o,t[r]),bc.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new to(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new _l(t,e,e,1023,1015);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new bl),this.bones.push(a),this.boneInverses.push(new rt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class Va extends Ht{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const os=new rt,_c=new rt,Sr=[],xc=new Mn,_m=new rt,Rs=new Ke,Cs=new ii;class zn extends Ke{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Va(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,_m)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Mn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,os),xc.copy(e.boundingBox).applyMatrix4(os),this.boundingBox.union(xc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ii),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,os),Cs.copy(e.boundingSphere).applyMatrix4(os),this.boundingSphere.union(Cs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Rs.geometry=this.geometry,Rs.material=this.material,Rs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Cs.copy(this.boundingSphere),Cs.applyMatrix4(n),e.ray.intersectsSphere(Cs)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,os),_c.multiplyMatrices(n,os),Rs.matrixWorld=_c,Rs.raycast(e,Sr);for(let a=0,o=Sr.length;a<o;a++){const c=Sr[a];c.instanceId=r,c.object=this,t.push(c)}Sr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Va(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new _l(new Float32Array(i*this.count),i,this.count,1028,1015));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class no extends qn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ur=new N,Or=new N,vc=new rt,Ps=new zr,Er=new ii,Ea=new N,Mc=new N;class Vr extends Qt{constructor(e=new Wt,t=new no){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Ur.fromBufferAttribute(t,i-1),Or.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Ur.distanceTo(Or);e.setAttribute("lineDistance",new Rt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Er.copy(n.boundingSphere),Er.applyMatrix4(i),Er.radius+=r,e.ray.intersectsSphere(Er)===!1)return;vc.copy(i).invert(),Ps.copy(e.ray).applyMatrix4(vc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=p,m=g-1;_<m;_+=l){const d=u.getX(_),x=u.getX(_+1),M=Tr(this,e,Ps,c,d,x);M&&t.push(M)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(p),d=Tr(this,e,Ps,c,_,m);d&&t.push(d)}}else{const p=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let _=p,m=g-1;_<m;_+=l){const d=Tr(this,e,Ps,c,_,_+1);d&&t.push(d)}if(this.isLineLoop){const _=Tr(this,e,Ps,c,g-1,p);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Tr(s,e,t,n,i,r){const a=s.geometry.attributes.position;if(Ur.fromBufferAttribute(a,i),Or.fromBufferAttribute(a,r),t.distanceSqToSegment(Ur,Or,Ea,Mc)>n)return;Ea.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Ea);if(!(c<e.near||c>e.far))return{distance:c,point:Mc.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const yc=new N,Sc=new N;class xm extends Vr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)yc.fromBufferAttribute(t,i),Sc.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+yc.distanceTo(Sc);e.setAttribute("lineDistance",new Rt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class vm extends Vr{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class xl extends qn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ec=new rt,Wa=new zr,wr=new ii,Ar=new N;class Mm extends Qt{constructor(e=new Wt,t=new xl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wr.copy(n.boundingSphere),wr.applyMatrix4(i),wr.radius+=r,e.ray.intersectsSphere(wr)===!1)return;Ec.copy(i).invert(),Wa.copy(e.ray).applyMatrix4(Ec);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){const f=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let g=f,_=p;g<_;g++){const m=l.getX(g);Ar.fromBufferAttribute(h,m),Tc(Ar,m,c,i,e,t,this)}}else{const f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let g=f,_=p;g<_;g++)Ar.fromBufferAttribute(h,g),Tc(Ar,g,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Tc(s,e,t,n,i,r,a){const o=Wa.distanceSqToPoint(s);if(o<t){const c=new N;Wa.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class $n extends an{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class si{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(r-1);const u=n[i],f=n[i+1]-u,p=(a-u)/f;return(i+p)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),c=t||(a.isVector2?new Oe:new N);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new N,i=[],r=[],a=[],o=new N,c=new rt;for(let p=0;p<=e;p++){const g=p/e;i[p]=this.getTangentAt(g,new N)}r[0]=new N,a[0]=new N;let l=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),f<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(i[p-1],i[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(ln(i[p-1].dot(i[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(o,g))}a[p].crossVectors(i[p],r[p])}if(t===!0){let p=Math.acos(ln(r[0].dot(r[e]),-1,1));p/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(p=-p);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],p*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class io extends si{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new Oe){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,p=l-this.aY;c=f*u-p*h+this.aX,l=f*h+p*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class ym extends io{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function so(){let s=0,e=0,t=0,n=0;function i(r,a,o,c){s=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){i(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,h){let f=(a-r)/l-(o-r)/(l+u)+(o-a)/u,p=(o-a)/u-(c-a)/(u+h)+(c-o)/h;f*=u,p*=u,i(a,o,f,p)},calc:function(r){const a=r*r,o=a*r;return s+e*r+t*a+n*o}}}const Rr=new N,Ta=new so,wa=new so,Aa=new so;class ro extends si{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new N){const n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=i[(o-1)%r]:(Rr.subVectors(i[0],i[1]).add(i[0]),l=Rr);const h=i[o%r],f=i[(o+1)%r];if(this.closed||o+2<r?u=i[(o+2)%r]:(Rr.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=Rr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),p),_=Math.pow(h.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(u),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Ta.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,g,_,m),wa.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,g,_,m),Aa.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(Ta.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),wa.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),Aa.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return n.set(Ta.calc(c),wa.calc(c),Aa.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new N().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function wc(s,e,t,n,i){const r=(n-e)*.5,a=(i-t)*.5,o=s*s,c=s*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*s+t}function Sm(s,e){const t=1-s;return t*t*e}function Em(s,e){return 2*(1-s)*s*e}function Tm(s,e){return s*s*e}function ks(s,e,t,n){return Sm(s,e)+Em(s,t)+Tm(s,n)}function wm(s,e){const t=1-s;return t*t*t*e}function Am(s,e){const t=1-s;return 3*t*t*s*e}function Rm(s,e){return 3*(1-s)*s*s*e}function Cm(s,e){return s*s*s*e}function zs(s,e,t,n,i){return wm(s,e)+Am(s,t)+Rm(s,n)+Cm(s,i)}class vl extends si{constructor(e=new Oe,t=new Oe,n=new Oe,i=new Oe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new Oe){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(zs(e,i.x,r.x,a.x,o.x),zs(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Pm extends si{constructor(e=new N,t=new N,n=new N,i=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new N){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(zs(e,i.x,r.x,a.x,o.x),zs(e,i.y,r.y,a.y,o.y),zs(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ml extends si{constructor(e=new Oe,t=new Oe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Oe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Oe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class yl extends si{constructor(e=new N,t=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new N){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new N){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Sl extends si{constructor(e=new Oe,t=new Oe,n=new Oe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Oe){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(ks(e,i.x,r.x,a.x),ks(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class El extends si{constructor(e=new N,t=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new N){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(ks(e,i.x,r.x,a.x),ks(e,i.y,r.y,a.y),ks(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Tl extends si{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Oe){const n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,c=i[a===0?a:a-1],l=i[a],u=i[a>i.length-2?i.length-1:a+1],h=i[a>i.length-3?i.length-1:a+2];return n.set(wc(o,c.x,l.x,u.x,h.x),wc(o,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new Oe().fromArray(i))}return this}}var Xa=Object.freeze({__proto__:null,ArcCurve:ym,CatmullRomCurve3:ro,CubicBezierCurve:vl,CubicBezierCurve3:Pm,EllipseCurve:io,LineCurve:Ml,LineCurve3:yl,QuadraticBezierCurve:Sl,QuadraticBezierCurve3:El,SplineCurve:Tl});class wl extends si{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Xa[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Xa[i.type]().fromJSON(i))}return this}}class Lm extends wl{constructor(e){super(),this.type="Path",this.currentPoint=new Oe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Ml(this.currentPoint.clone(),new Oe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new Sl(this.currentPoint.clone(),new Oe(e,t),new Oe(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,a){const o=new vl(this.currentPoint.clone(),new Oe(e,t),new Oe(n,i),new Oe(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Tl(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,r,a),this}absarc(e,t,n,i,r,a){return this.absellipse(e,t,n,n,i,r,a),this}ellipse(e,t,n,i,r,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,i,r,a,o,c),this}absellipse(e,t,n,i,r,a,o,c){const l=new io(e,t,n,i,r,a,o,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class ao extends Wt{constructor(e=[new Oe(0,-.5),new Oe(.5,0),new Oe(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=ln(i,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],u=1/t,h=new N,f=new Oe,p=new N,g=new N,_=new N;let m=0,d=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:m=e[x+1].x-e[x].x,d=e[x+1].y-e[x].y,p.x=d*1,p.y=-m,p.z=d*0,_.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:m=e[x+1].x-e[x].x,d=e[x+1].y-e[x].y,p.x=d*1,p.y=-m,p.z=d*0,g.copy(p),p.x+=_.x,p.y+=_.y,p.z+=_.z,p.normalize(),c.push(p.x,p.y,p.z),_.copy(g)}for(let x=0;x<=t;x++){const M=n+x*u*i,b=Math.sin(M),D=Math.cos(M);for(let A=0;A<=e.length-1;A++){h.x=e[A].x*b,h.y=e[A].y,h.z=e[A].x*D,a.push(h.x,h.y,h.z),f.x=x/t,f.y=A/(e.length-1),o.push(f.x,f.y);const E=c[3*A+0]*b,w=c[3*A+1],y=c[3*A+0]*D;l.push(E,w,y)}}for(let x=0;x<t;x++)for(let M=0;M<e.length-1;M++){const b=M+x*e.length,D=b,A=b+e.length,E=b+e.length+1,w=b+1;r.push(D,A,w),r.push(E,w,A)}this.setIndex(r),this.setAttribute("position",new Rt(a,3)),this.setAttribute("uv",new Rt(o,2)),this.setAttribute("normal",new Rt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ao(e.points,e.segments,e.phiStart,e.phiLength)}}class oo extends ao{constructor(e=1,t=1,n=4,i=8){const r=new Lm;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new oo(e.radius,e.length,e.capSegments,e.radialSegments)}}class Wr extends Wt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new N,u=new Oe;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){const p=n+h/t*i;l.x=e*Math.cos(p),l.y=e*Math.sin(p),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[f]/e+1)/2,u.y=(a[f+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Rt(a,3)),this.setAttribute("normal",new Rt(o,3)),this.setAttribute("uv",new Rt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wr(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Zt extends Wt{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const u=[],h=[],f=[],p=[];let g=0;const _=[],m=n/2;let d=0;x(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new Rt(h,3)),this.setAttribute("normal",new Rt(f,3)),this.setAttribute("uv",new Rt(p,2));function x(){const b=new N,D=new N;let A=0;const E=(t-e)/n;for(let w=0;w<=r;w++){const y=[],v=w/r,F=v*(t-e)+e;for(let B=0;B<=i;B++){const k=B/i,Q=k*c+o,ie=Math.sin(Q),U=Math.cos(Q);D.x=F*ie,D.y=-v*n+m,D.z=F*U,h.push(D.x,D.y,D.z),b.set(ie,E,U).normalize(),f.push(b.x,b.y,b.z),p.push(k,1-v),y.push(g++)}_.push(y)}for(let w=0;w<i;w++)for(let y=0;y<r;y++){const v=_[y][w],F=_[y+1][w],B=_[y+1][w+1],k=_[y][w+1];(e>0||y!==0)&&(u.push(v,F,k),A+=3),(t>0||y!==r-1)&&(u.push(F,B,k),A+=3)}l.addGroup(d,A,0),d+=A}function M(b){const D=g,A=new Oe,E=new N;let w=0;const y=b===!0?e:t,v=b===!0?1:-1;for(let B=1;B<=i;B++)h.push(0,m*v,0),f.push(0,v,0),p.push(.5,.5),g++;const F=g;for(let B=0;B<=i;B++){const Q=B/i*c+o,ie=Math.cos(Q),U=Math.sin(Q);E.x=y*U,E.y=m*v,E.z=y*ie,h.push(E.x,E.y,E.z),f.push(0,v,0),A.x=ie*.5+.5,A.y=U*.5*v+.5,p.push(A.x,A.y),g++}for(let B=0;B<i;B++){const k=D+B,Q=F+B;b===!0?u.push(Q,Q+1,k):u.push(Q+1,Q,k),w+=3}l.addGroup(d,w,b===!0?1:2),d+=w}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Br extends Zt{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Br(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class co extends Wt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],a=[];o(i),l(n),u(),this.setAttribute("position",new Rt(r,3)),this.setAttribute("normal",new Rt(r.slice(),3)),this.setAttribute("uv",new Rt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const M=new N,b=new N,D=new N;for(let A=0;A<t.length;A+=3)p(t[A+0],M),p(t[A+1],b),p(t[A+2],D),c(M,b,D,x)}function c(x,M,b,D){const A=D+1,E=[];for(let w=0;w<=A;w++){E[w]=[];const y=x.clone().lerp(b,w/A),v=M.clone().lerp(b,w/A),F=A-w;for(let B=0;B<=F;B++)B===0&&w===A?E[w][B]=y:E[w][B]=y.clone().lerp(v,B/F)}for(let w=0;w<A;w++)for(let y=0;y<2*(A-w)-1;y++){const v=Math.floor(y/2);y%2===0?(f(E[w][v+1]),f(E[w+1][v]),f(E[w][v])):(f(E[w][v+1]),f(E[w+1][v+1]),f(E[w+1][v]))}}function l(x){const M=new N;for(let b=0;b<r.length;b+=3)M.x=r[b+0],M.y=r[b+1],M.z=r[b+2],M.normalize().multiplyScalar(x),r[b+0]=M.x,r[b+1]=M.y,r[b+2]=M.z}function u(){const x=new N;for(let M=0;M<r.length;M+=3){x.x=r[M+0],x.y=r[M+1],x.z=r[M+2];const b=m(x)/2/Math.PI+.5,D=d(x)/Math.PI+.5;a.push(b,1-D)}g(),h()}function h(){for(let x=0;x<a.length;x+=6){const M=a[x+0],b=a[x+2],D=a[x+4],A=Math.max(M,b,D),E=Math.min(M,b,D);A>.9&&E<.1&&(M<.2&&(a[x+0]+=1),b<.2&&(a[x+2]+=1),D<.2&&(a[x+4]+=1))}}function f(x){r.push(x.x,x.y,x.z)}function p(x,M){const b=x*3;M.x=e[b+0],M.y=e[b+1],M.z=e[b+2]}function g(){const x=new N,M=new N,b=new N,D=new N,A=new Oe,E=new Oe,w=new Oe;for(let y=0,v=0;y<r.length;y+=9,v+=6){x.set(r[y+0],r[y+1],r[y+2]),M.set(r[y+3],r[y+4],r[y+5]),b.set(r[y+6],r[y+7],r[y+8]),A.set(a[v+0],a[v+1]),E.set(a[v+2],a[v+3]),w.set(a[v+4],a[v+5]),D.copy(x).add(M).add(b).divideScalar(3);const F=m(D);_(A,v+0,x,F),_(E,v+2,M,F),_(w,v+4,b,F)}}function _(x,M,b,D){D<0&&x.x===1&&(a[M]=x.x-1),b.x===0&&b.z===0&&(a[M]=D/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function d(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new co(e.vertices,e.indices,e.radius,e.details)}}class Bn extends co{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Bn(e.radius,e.detail)}}class lo extends Wt{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],c=[],l=[],u=[];let h=e;const f=(t-e)/i,p=new N,g=new Oe;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const d=r+m/n*a;p.x=h*Math.cos(d),p.y=h*Math.sin(d),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,u.push(g.x,g.y)}h+=f}for(let _=0;_<i;_++){const m=_*(n+1);for(let d=0;d<n;d++){const x=d+m,M=x,b=x+n+1,D=x+n+2,A=x+1;o.push(M,b,A),o.push(b,D,A)}}this.setIndex(o),this.setAttribute("position",new Rt(c,3)),this.setAttribute("normal",new Rt(l,3)),this.setAttribute("uv",new Rt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lo(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class gi extends Wt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new N,f=new N,p=[],g=[],_=[],m=[];for(let d=0;d<=n;d++){const x=[],M=d/n;let b=0;d===0&&a===0?b=.5/t:d===n&&c===Math.PI&&(b=-.5/t);for(let D=0;D<=t;D++){const A=D/t;h.x=-e*Math.cos(i+A*r)*Math.sin(a+M*o),h.y=e*Math.cos(a+M*o),h.z=e*Math.sin(i+A*r)*Math.sin(a+M*o),g.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),m.push(A+b,1-M),x.push(l++)}u.push(x)}for(let d=0;d<n;d++)for(let x=0;x<t;x++){const M=u[d][x+1],b=u[d][x],D=u[d+1][x],A=u[d+1][x+1];(d!==0||a>0)&&p.push(M,b,A),(d!==n-1||c<Math.PI)&&p.push(b,D,A)}this.setIndex(p),this.setAttribute("position",new Rt(g,3)),this.setAttribute("normal",new Rt(_,3)),this.setAttribute("uv",new Rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Xr extends Wt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],c=[],l=[],u=new N,h=new N,f=new N;for(let p=0;p<=n;p++)for(let g=0;g<=i;g++){const _=g/i*r,m=p/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(_),h.y=(e+t*Math.cos(m))*Math.sin(_),h.z=t*Math.sin(m),o.push(h.x,h.y,h.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),f.subVectors(h,u).normalize(),c.push(f.x,f.y,f.z),l.push(g/i),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=i;g++){const _=(i+1)*p+g-1,m=(i+1)*(p-1)+g-1,d=(i+1)*(p-1)+g,x=(i+1)*p+g;a.push(_,m,x),a.push(m,d,x)}this.setIndex(a),this.setAttribute("position",new Rt(o,3)),this.setAttribute("normal",new Rt(c,3)),this.setAttribute("uv",new Rt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ws extends Wt{constructor(e=new El(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new N,c=new N,l=new Oe;let u=new N;const h=[],f=[],p=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Rt(h,3)),this.setAttribute("normal",new Rt(f,3)),this.setAttribute("uv",new Rt(p,2));function _(){for(let M=0;M<t;M++)m(M);m(r===!1?t:0),x(),d()}function m(M){u=e.getPointAt(M/t,u);const b=a.normals[M],D=a.binormals[M];for(let A=0;A<=i;A++){const E=A/i*Math.PI*2,w=Math.sin(E),y=-Math.cos(E);c.x=y*b.x+w*D.x,c.y=y*b.y+w*D.y,c.z=y*b.z+w*D.z,c.normalize(),f.push(c.x,c.y,c.z),o.x=u.x+n*c.x,o.y=u.y+n*c.y,o.z=u.z+n*c.z,h.push(o.x,o.y,o.z)}}function d(){for(let M=1;M<=t;M++)for(let b=1;b<=i;b++){const D=(i+1)*(M-1)+(b-1),A=(i+1)*M+(b-1),E=(i+1)*M+b,w=(i+1)*(M-1)+b;g.push(D,A,w),g.push(A,E,w)}}function x(){for(let M=0;M<=t;M++)for(let b=0;b<=i;b++)l.x=M/t,l.y=b/i,p.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Ws(new Xa[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Li extends qn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ri extends Li{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Oe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ln(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Je(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Je(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Je(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Dn extends qn{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function Cr(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Dm(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Im(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Ac(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function Al(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class Xs{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Fm extends Xs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case 2401:r=e,o=2*t-n;break;case 2402:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case 2401:a=e,c=2*n-t;break;case 2402:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,p=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,d=-f*m+2*f*_-f*g,x=(1+f)*m+(-1.5-2*f)*_+(-.5+f)*g+1,M=(-1-p)*m+(1.5+p)*_+.5*g,b=p*m-p*_;for(let D=0;D!==o;++D)r[D]=d*a[u+D]+x*a[l+D]+M*a[c+D]+b*a[h+D];return r}}class Nm extends Xs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(i-t),h=1-u;for(let f=0;f!==o;++f)r[f]=a[l+f]*h+a[c+f]*u;return r}}class Um extends Xs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class ai{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Cr(t,this.TimeBufferType),this.values=Cr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Cr(e.times,Array),values:Cr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Um(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Nm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Fm(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&Dm(i))for(let o=0,c=i.length;o!==c;++o){const l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===2302,r=e.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(i)c=!0;else{const h=o*n,f=h-n,p=h+n;for(let g=0;g!==n;++g){const _=t[h+g];if(_!==t[f+g]||_!==t[p+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const h=o*n,f=a*n;for(let p=0;p!==n;++p)t[f+p]=t[h+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}ai.prototype.TimeBufferType=Float32Array;ai.prototype.ValueBufferType=Float32Array;ai.prototype.DefaultInterpolation=2301;class _s extends ai{constructor(e,t,n){super(e,t,n)}}_s.prototype.ValueTypeName="bool";_s.prototype.ValueBufferType=Array;_s.prototype.DefaultInterpolation=2300;_s.prototype.InterpolantFactoryMethodLinear=void 0;_s.prototype.InterpolantFactoryMethodSmooth=void 0;class Rl extends ai{}Rl.prototype.ValueTypeName="color";class ds extends ai{}ds.prototype.ValueTypeName="number";class Om extends Xs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t);let l=e*o;for(let u=l+o;l!==u;l+=4)yn.slerpFlat(r,0,a,l-o,a,l,c);return r}}class ps extends ai{InterpolantFactoryMethodLinear(e){return new Om(this.times,this.values,this.getValueSize(),e)}}ps.prototype.ValueTypeName="quaternion";ps.prototype.InterpolantFactoryMethodSmooth=void 0;class xs extends ai{constructor(e,t,n){super(e,t,n)}}xs.prototype.ValueTypeName="string";xs.prototype.ValueBufferType=Array;xs.prototype.DefaultInterpolation=2300;xs.prototype.InterpolantFactoryMethodLinear=void 0;xs.prototype.InterpolantFactoryMethodSmooth=void 0;class ms extends ai{}ms.prototype.ValueTypeName="vector";class Bm{constructor(e="",t=-1,n=[],i=2500){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=ei(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(zm(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(ai.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const u=Im(c);c=Ac(c,1,u),l=Ac(l,1,u),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new ds(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],u=l.name.match(r);if(u&&u.length>1){const h=u[1];let f=i[h];f||(i[h]=f=[]),f.push(l)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,f,p,g,_){if(p.length!==0){const m=[],d=[];Al(p,m,d,g),m.length!==0&&_.push(new h(f,m,d))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let h=0;h<l.length;h++){const f=l[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const p={};let g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let _=0;_<f[g].morphTargets.length;_++)p[f[g].morphTargets[_]]=-1;for(const _ in p){const m=[],d=[];for(let x=0;x!==f[g].morphTargets.length;++x){const M=f[g];m.push(M.time),d.push(M.morphTarget===_?1:0)}i.push(new ds(".morphTargetInfluence["+_+"]",m,d))}c=p.length*a}else{const p=".bones["+t[h].name+"]";n(ms,p+".position",f,"pos",i),n(ps,p+".quaternion",f,"rot",i),n(ms,p+".scale",f,"scl",i)}}return i.length===0?null:new this(r,c,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function km(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ds;case"vector":case"vector2":case"vector3":case"vector4":return ms;case"color":return Rl;case"quaternion":return ps;case"bool":case"boolean":return _s;case"string":return xs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function zm(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=km(s.type);if(s.times===void 0){const t=[],n=[];Al(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Ri={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Gm{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,r===!1&&i.onStart!==void 0&&i.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){const p=l[h],g=l[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null}}}const Cl=new Gm;class vs{constructor(e){this.manager=e!==void 0?e:Cl,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}vs.DEFAULT_MATERIAL_NAME="__DEFAULT";const di={};class Hm extends Error{constructor(e,t){super(e),this.response=t}}class Pl extends vs{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Ri.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(di[e]!==void 0){di[e].push({onLoad:t,onProgress:n,onError:i});return}di[e]=[],di[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=di[e],h=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=f?parseInt(f):0,g=p!==0;let _=0;const m=new ReadableStream({start(d){x();function x(){h.read().then(({done:M,value:b})=>{if(M)d.close();else{_+=b.byteLength;const D=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:p});for(let A=0,E=u.length;A<E;A++){const w=u[A];w.onProgress&&w.onProgress(D)}d.enqueue(b),x()}},M=>{d.error(M)})}}});return new Response(m)}else throw new Hm(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),f=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(f);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{Ri.add(e,l);const u=di[e];delete di[e];for(let h=0,f=u.length;h<f;h++){const p=u[h];p.onLoad&&p.onLoad(l)}}).catch(l=>{const u=di[e];if(u===void 0)throw this.manager.itemError(e),l;delete di[e];for(let h=0,f=u.length;h<f;h++){const p=u[h];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Vm extends vs{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ri.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=Hs("img");function c(){u(),Ri.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(h){u(),i&&i(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class Ll extends vs{constructor(e){super(e)}load(e,t,n,i){const r=new an,a=new Vm(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class jr extends Qt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Rc extends jr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Qt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ra=new rt,Cc=new N,Pc=new N;class ho{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Oe(512,512),this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $a,this._frameExtents=new Oe(1,1),this._viewportCount=1,this._viewports=[new Dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Cc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Cc),Pc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Pc),t.updateMatrixWorld(),Ra.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ra),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ra)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Wm extends ho{constructor(){super(new Ln(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=us*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Xm extends jr{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Qt.DEFAULT_UP),this.updateMatrix(),this.target=new Qt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Wm}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Lc=new rt,Ls=new N,Ca=new N;class jm extends ho{constructor(){super(new Ln(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Oe(4,2),this._viewportCount=6,this._viewports=[new Dt(2,1,1,1),new Dt(0,1,1,1),new Dt(3,1,1,1),new Dt(1,1,1,1),new Dt(3,0,1,1),new Dt(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ls.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ls),Ca.copy(n.position),Ca.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ca),n.updateMatrixWorld(),i.makeTranslation(-Ls.x,-Ls.y,-Ls.z),Lc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lc)}}class qr extends jr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new jm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class qm extends ho{constructor(){super(new Gr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ja extends jr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Qt.DEFAULT_UP),this.updateMatrix(),this.target=new Qt,this.shadow=new qm}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Gs{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Km extends vs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ri.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Ri.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),Ri.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Ri.add(e,c),r.manager.itemStart(e)}}const uo="\\[\\]\\.:\\/",Ym=new RegExp("["+uo+"]","g"),fo="[^"+uo+"]",Jm="[^"+uo.replace("\\.","")+"]",Zm=/((?:WC+[\/:])*)/.source.replace("WC",fo),Qm=/(WCOD+)?/.source.replace("WCOD",Jm),$m=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",fo),eg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",fo),tg=new RegExp("^"+Zm+Qm+$m+eg+"$"),ng=["material","materials","bones","map"];class ig{constructor(e,t,n){const i=n||Gt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Gt{constructor(e,t,n){this.path=t,this.parsedPath=n||Gt.parseTrackName(t),this.node=Gt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Gt.Composite(e,t,n):new Gt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Ym,"")}static parseTrackName(e){const t=tg.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);ng.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=Gt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[i];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Gt.Composite=ig;Gt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Gt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Gt.prototype.GetterByBindingType=[Gt.prototype._getValue_direct,Gt.prototype._getValue_array,Gt.prototype._getValue_arrayElement,Gt.prototype._getValue_toArray];Gt.prototype.SetterByBindingTypeAndVersioning=[[Gt.prototype._setValue_direct,Gt.prototype._setValue_direct_setNeedsUpdate,Gt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Gt.prototype._setValue_array,Gt.prototype._setValue_array_setNeedsUpdate,Gt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Gt.prototype._setValue_arrayElement,Gt.prototype._setValue_arrayElement_setNeedsUpdate,Gt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Gt.prototype._setValue_fromArray,Gt.prototype._setValue_fromArray_setNeedsUpdate,Gt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");const Dc='"Fredoka", "Bricolage Grotesque", sans-serif',sg="#cfdcc4",Pa="#d0a54e",ti="#b98d5c",Ic="#6e4a2c",rg="#f1ead6",Fc="#6b2436";function ag(s,e,{box:t,span:n,material:i,model:r}){const a=e.shell;if(!a)return null;const o=new bt;s.add(o);const[c,l,u]=e.floors,h=()=>{const V=new bt;return o.add(V),V},f=(V,L,ue,R,C,O)=>r&&r(L,ue,R,C,(J,le)=>{V.visible=!1,O&&O(J,le)}),p=a.plaster,g=a.tile,_=a.tileH,m=document.createElement("canvas");m.width=200,m.height=230;const d=m.getContext("2d");d.fillStyle=g,d.fillRect(0,0,200,230),d.fillStyle=sg;for(let V=0;V<200;V+=200*a.tilePitch)d.fillRect(V,12,2.4,218);d.fillRect(0,230-230/2,200,2.4),d.fillStyle="#dcc48e",d.fillRect(0,2,200,9);const x=new $n(m);x.colorSpace=Ot,x.wrapS=1e3,x.anisotropy=4;const M=new kn(1,1).translate(0,.5,0);function b(V,L,ue,R,C=0){const O=x.clone();O.needsUpdate=!0,O.repeat.set(Math.abs(ue-L),1);const J=new Ke(M,new Dn({map:O}));return J.scale.set(Math.abs(ue-L),_,1),V?(J.rotation.y=Math.PI/2,J.position.set(R+.006,C,(L+ue)/2)):J.position.set((L+ue)/2,C,R+.006),J.receiveShadow=!0,o.add(J),J}function D(V,L,ue,R,C,O,J,le=[]){const pe=[...le].sort((se,Me)=>se[0]-Me[0]);let ve=L;const ge=(se,Me,ke,Le)=>V?n(o,R-C,R,O+ke,O+Le,se,Me,p):n(o,se,Me,O+ke,O+Le,R-C,R,p);pe.forEach(([se,Me,ke])=>{se>ve&&(ge(ve,se,0,J),b(V,ve,se,R,O)),ge(se,Me,ke,J),ve=Me}),ue>ve&&(ge(ve,ue,0,J),b(V,ve,ue,R,O))}const A=c.z-c.d/2;D(!1,(c.x||0)-c.w/2,(c.x||0)+c.w/2,A,.25,0,l.y-.32,[[a.exitDoor.x0,a.exitDoor.x1,a.exitDoor.h]]);const E=l.z-l.d/2,w=-l.w/2;D(!1,w,l.w/2,E,.25,l.y,u.y-l.y-.32),D(!0,E,E+3.5,w,.25,l.y,u.y-l.y-.32);const y=u.z-u.d/2,v=-u.w/2,F=e.rooftop?e.rooftop.y-.34-u.y:3.9,B=u.y+F,k=1.44,Q=new Li({color:"#cfe6df",roughness:.1,metalness:0,transparent:!0,opacity:.26,depthWrite:!1});function ie(V,L,ue,R,C){const O=Math.max(2,Math.round((ue-L)/a.glazingBay)),J=(ue-L)/O,le=u.y;let pe=null;if(C!==void 0){const se=Math.max(0,Math.min(O-2,Math.round((C-L)/J)-1));pe=[L+se*J,L+(se+2)*J]}const ve=(se,Me,ke,Le,Fe=.09)=>V?n(o,R-Fe,R+Fe*.3,ke,Le,se,Me,"#2c5a44"):n(o,se,Me,ke,Le,R-Fe,R+Fe*.3,"#2c5a44");ve(L,ue,le,le+.3,.16);for(let se=0;se<=O;se++){const Me=L+se*J;ve(Me-.035,Me+.035,le+.3,le+F)}ve(L,ue,le+2.92,le+2.98),ve(L,ue,le+F-.08,le+F);const ge=V?n(o,R-.02,R,le+.3,le+F,L,ue,"#cfe6df",{cast:!1}):n(o,L,ue,le+.3,le+F,R-.02,R,"#cfe6df",{cast:!1});return ge.material=Q,ge.receiveShadow=!1,pe&&n(o,pe[0]+.035,pe[1]-.035,le+.3,le+F-.08,R-.06,R-.02,"#2f5d4a"),pe}const U=ie(!1,v,a.topLanding.outer,y,a.fanX);ie(!0,y,y+3.5,v);const ee=new bt,Z=U?(U[0]+U[1])/2:a.fanX;ee.position.set(Z,u.y+2.15,y+.02),o.add(ee);let fe=null;f(ee,"exhaust_fan.glb",Z,u.y+2.15,y+.02,V=>{fe=V.getObjectByName("Rotor")}),t(ee,0,-.72,.06,1.44,1.44,.14,"#2f6b52");const $=new Ke(new Zt(.56,.56,.05,40).rotateX(Math.PI/2),i("#1d3028"));$.position.z=.14,ee.add($);const te=new bt;te.position.z=.18,ee.add(te);for(let V=0;V<4;V++){const L=new Ke(new Yt(.44,.17,.02).translate(.27,0,0),i("#b9cbb4"));L.rotation.z=V*Math.PI/2,L.rotation.x=.25,te.add(L)}const Ae=new Ke(new Zt(.1,.1,.06,20).rotateX(Math.PI/2),i("#d8c18b"));te.add(Ae);const We=1.46,ce=e.rooftop?2:0,_e=1.8,De=We*_e,ye=.5,Ye=a.topLanding.outer-.035,it=Ye-ce*De,ht=B+k*_e/2,_t=y-.09,ft=e.rooftop?new Ai(new N(.816,-1,0).normalize(),(B-.816*e.rooftop.x1)/Math.hypot(.816,1)):null,xt=[],W=V=>{const L=V.clone();return L.clippingPlanes=xt,L},kt=new Je("#2c5a44"),ct=Array.from({length:ce},(V,L)=>new rt().makeTranslation(it+De*(L+.5),ht,_t).scale(new N(_e,_e,_e*ye)));let at=null;r&&ce&&r("exhaust_fan.glb",0,0,0,(V,L)=>{const ue=new rt().copy(L.parent.matrixWorld).invert(),R=new rt,C=V.getObjectByName("Rotor"),O=[];xt.push(ft.clone().applyMatrix4(L.parent.matrixWorld)),L.updateMatrixWorld(!0),V.traverse(J=>{if(!J.isMesh)return;let le=!1;for(let ge=J;ge;ge=ge.parent)ge===C&&(le=!0);const pe=/^(Housing|FrontFrame)/.test(J.name)?Object.assign(J.material.clone(),{color:kt}):J.material,ve=new zn(J.geometry,Array.isArray(pe)?pe.map(W):W(pe),ce);R.multiplyMatrices(ue,J.matrixWorld),ct.forEach((ge,se)=>ve.setMatrixAt(se,new rt().multiplyMatrices(ge,R))),ve.computeBoundingSphere(),ve.castShadow=!1,ve.receiveShadow=!0,o.add(ve),le&&O.push({part:J,mesh:ve})}),L.parent.remove(L),at={rotor:C,holder:L,parentInverse:new rt,spinning:O}});const st=new Zt(.09,.09,.22,12).translate(0,.11,0),wt=new Yt(.18,.26,.07).translate(0,.13,0),Qe=[],I=V=>{const L={g:V,jars:[],pouches:[]};return Qe.push(L),L};function S(V,L,ue,R,C,O,J,le,pe){const{jars:ve,pouches:ge}=I(V);n(V,L,ue,O,O+J,R,R+.05,Ic,{cast:!1}),n(V,L,ue,O,O+.14,R,R+C,ti),n(V,L-.02,ue+.02,O+J-.1,O+J,R,R+C+.02,ti);const se=(ue-L)/le;for(let Me=0;Me<=le;Me++)n(V,L+Me*se-.035,L+Me*se+.035,O,O+J,R,R+C,ti);for(let Me=1;Me<=pe;Me++){const ke=O+.14+(J-.24)*Me/(pe+1);n(V,L,ue,ke-.04,ke,R,R+C,"#c79f6c",{cast:!1});for(let Le=0;Le<le;Le++)for(let Fe=0;Fe<4;Fe++){const At=L+Le*se+se*(Fe+.5)/4,Jt=R+C*.55;((Le+Me+Fe)%3?ve:ge).push([At,ke,Jt,(Le*7+Me*3+Fe)%4])}if(Me===1)for(let Le=0;Le<le;Le++)for(let Fe=0;Fe<4;Fe++)ve.push([L+Le*se+se*(Fe+.5)/4,O+.14,R+C*.55,(Le+Fe)%4])}}const Y=a.loungeFront,be=Y-.81,de=a.loungeDoor.x,he=a.loungeRight,Ge=l.y-.32;n(o,-11.03,de-.7,0,Ge,be,Y,p),n(o,de-.7,de+.7,a.loungeHeader,Ge,be,Y,p),n(o,de+.7,he+.16,0,Ge,be,Y,p),b(!1,-11.03,de-.7,Y),b(!1,de+.7,a.wallLeft,Y),b(!1,a.wallLeft,he+.16,Y),n(o,-11.5,-11.18,0,3.95,A,Y,p),b(!0,A,Y,-11.18);const we=a.loungeExit.z,Ne=.92,vt=2.84;n(o,he-.16,he+.16,0,Ge,A,we-Ne,p),n(o,he-.16,he+.16,vt,Ge,we-Ne,we+Ne,p),n(o,he-.16,he+.16,0,Ge,we+Ne,Y,p),b(!0,A,we-Ne-.04,he+.16),b(!0,we+Ne+.04,Y,he+.16),n(o,he-.1,he+.1,0,vt,we-Ne,we+Ne,"#0d1310",{cast:!1});const z=[];e.rooftop||(n(o,-11.18,he-.16,.002,.012,A,be,"#2a1b22",{cast:!1}),n(o,-10.95,-9.25,.012,.022,-5.3,-2.9,"#5a2638",{cast:!1}),n(o,-10.75,-9.45,.022,.03,-5.1,-3.1,"#7a3a4c",{cast:!1}),[[-6.15,-5.55,1],[-2.65,-2.05,-1]].forEach(([V,L,ue])=>{n(o,-10.9,-9.3,0,.48,V,L,Fc);const R=ue>0?[V,V+.16]:[L-.16,L];n(o,-10.9,-9.3,.48,.95,R[0],R[1],"#5c1e30"),n(o,-10.9,-10.72,.48,.7,V,L,"#5c1e30"),n(o,-9.48,-9.3,.48,.7,V,L,"#5c1e30")}),n(o,-10.55,-9.65,0,.4,-4.35,-3.85,"#3a2a1e"),[[-10.7,-6.6],[-10.7,-1.55],[-9.6,-4.1]].forEach(([V,L])=>{t(o,V,0,L,.4,.62,.4,"#3a2a1e"),t(o,V,.62,L,.04,.4,.04,"#d8c18b",{cast:!1});const ue=new Ke(new Zt(.13,.2,.26,16).translate(0,.13,0),new Dn({color:"#f3d9a6",emissive:"#ffb36a",emissiveIntensity:0}));ue.position.set(V,1,L),o.add(ue),z.push(ue)}));const je=i(Fc);function et(V){const L=V?{centre:we,plane:he+.2,scale:1.35,top:2.78}:{centre:de,plane:Y+.05,scale:1,top:a.loungeHeader+.02},ue=[-1,1].map(C=>{const O=new Ke($e,je);return O.castShadow=!0,o.add(O),{side:C,m:O}}),R=V?n(o,L.plane-.05,L.plane+.09,L.top-.1,L.top+.06,L.centre-Ne-.02,L.centre+Ne+.02,"#4a1b29"):n(o,L.centre-.75,L.centre+.75,L.top-.1,L.top+.06,L.plane-.05,L.plane+.09,"#4a1b29");return{set(C,O){R.visible=O,ue.forEach(({side:J,m:le})=>{le.visible=O;const pe=.68*L.scale,ve=(.07+(.5-.07)*C)*L.scale,ge=Math.max(.08,pe-ve),se=J*(ve+ge/2);V?(le.position.set(L.plane,0,L.centre+se),le.scale.set(.08,L.top-.08,ge)):(le.position.set(L.centre+se,0,L.plane),le.scale.set(ge,L.top-.08,.08))})}}}const $e=new Yt(1,1,1).translate(0,.5,0),He=et(!1),yt=et(!0),gt=e.rooftop?null:n(o,de-.7,de+.7,0,a.loungeHeader,Y,Y+.08,"#2d6146"),It=n(o,he+.16,he+.21,0,vt-.24,we-Ne+.15,we+Ne-.15,"#3a2a1e"),G=document.createElement("canvas");G.width=512,G.height=184;const Re=new $n(G);Re.colorSpace=Ot;const ae=new pn({map:Re,transparent:!0}),xe=new Ke(new kn(2,.72),ae);xe.position.set(de+2.1,2.02,Y+.03),o.add(xe);let Ce=null;typeof FontFace=="function"&&document.fonts&&(new FontFace("Fredoka",`url(${new URL("../fonts/Fredoka-SemiBold.ttf",e.modelBase).href})`,{weight:"600"}).load().then(V=>{document.fonts.add(V),Ce=null,Rn=null,Cn=!0}).catch(()=>{}),new FontFace("Yellowtail",`url(${new URL("../fonts/Yellowtail-Regular.woff2",e.modelBase).href})`).load().then(V=>{document.fonts.add(V),Ce=null}).catch(()=>{}));function Ie(V){if(Ce===V)return;Ce=V;const L=G.getContext("2d");L.clearRect(0,0,512,184),L.fillStyle="#1a1216",L.beginPath(),L.roundRect(6,8,500,168,22),L.fill();const ue=(R,C,O,J,le,pe)=>{V?(L.shadowColor=J,L.shadowBlur=22,L.fillStyle=J,L.fillText(R,C,O),L.shadowBlur=0,L.fillStyle=le,L.fillText(R,C,O)):(L.fillStyle=pe,L.fillText(R,C,O))};L.textAlign="center",L.textBaseline="middle",L.save(),L.translate(256,56),L.rotate(-.06),L.font='400 88px "Yellowtail", cursive',ue("Rooftop",0,0,"#ffbf5a","#fff1d6","#5d5040"),L.restore(),L.font=`600 72px ${Dc}`,ue("LOUNGE",256,128,"#ff8fbf","#fff4f8","#5a4750"),Re.needsUpdate=!0}const Ve={x:(a.wallLeft+a.shelfLeft)/2,y:1.8,w:5.1,h:1.24},Bt=h();n(Bt,Ve.x-Ve.w/2-.14,Ve.x+Ve.w/2+.14,Ve.y-.12,Ve.y+Ve.h+.12,Y,Y+.1,ti),n(Bt,Ve.x-Ve.w/2+.04,Ve.x+Ve.w/2-.04,Ve.y+.04,Ve.y+Ve.h-.04,Y+.1,Y+.12,Pa,{cast:!1});const Xt=document.createElement("canvas");Xt.width=1024,Xt.height=240;const St=new $n(Xt);St.colorSpace=Ot,St.anisotropy=4;const $t=new Ke(new kn(Ve.w-.14,Ve.h-.14),new pn({map:St}));$t.position.set(Ve.x,Ve.y+Ve.h/2,Y+.125),Bt.add($t),f(Bt,"menu_board.glb",Ve.x,0,Y,V=>{const L=V.getObjectByName("BoardFace");L&&L.traverse(ue=>{if(!ue.isMesh)return;const R=ue.geometry.attributes.uv;for(let C=0;C<R.count;C++)R.setY(C,1-R.getY(C));R.needsUpdate=!0,ue.material=$t.material})});const en=" ABCDEFGHIJKLMNOPQRSTUVWXYZ$0123456789.,",fn=55,In=9;let tn=null,Rn=null,Cn=!1;function Fn(V,L){const ue=V.length,R=V[0]?V[0].length:21;if((!tn||tn.length!==ue||tn[0].length!==R)&&(tn=V.map(pe=>[...pe].map(()=>({from:" ",to:" ",start:0})))),V.forEach((pe,ve)=>[...pe].forEach((ge,se)=>{const Me=tn[ve][se];Me.to!==ge&&(Me.from=Me.to,Me.to=ge,Me.start=L+se*35+ve*90,Cn=!0)})),!Cn&&Rn!==null)return;Rn="";const C=Xt.getContext("2d"),O=1024/R,J=240/ue;C.fillStyle="#131617",C.fillRect(0,0,1024,240),C.font=`600 ${Math.round(J*.66)}px ${Dc}`,C.textAlign="center",C.textBaseline="middle";const le=(pe,ve,ge,se,Me)=>{const ke=ge+J/2,Le=(J/2-4)*Me;C.save(),C.beginPath(),C.rect(ve+2,se?ke-Le:ke,O-4,Le),C.clip(),C.fillStyle=se?"#363c3e":"#2b3133",C.fillRect(ve+2,se?ke-Le:ke,O-4,Le),pe!==" "&&(C.translate(0,ke),C.scale(1,Me),C.fillStyle="#efe4c8",C.fillText(pe,ve+O/2,1)),C.restore()};Cn=!1,tn.forEach((pe,ve)=>pe.forEach((ge,se)=>{const Me=se*O,ke=ve*J,Le=L-ge.start;let Fe=ge.to,At=ge.to,Jt=1;if(Le<0)Fe=At=ge.from,Cn=!0;else if(ge.from!==ge.to&&Le<fn*In){const En=Math.floor(Le/fn),Vn=en.indexOf(ge.to)+en.length-In;Fe=En?en[(Vn+En)%en.length]:ge.from,At=en[(Vn+En+1)%en.length],Jt=Le%fn/fn,Cn=!0}else ge.from=ge.to;Jt>=1?(le(Fe,Me,ke,!0,1),le(Fe,Me,ke,!1,1)):(le(At,Me,ke,!0,1),le(Fe,Me,ke,!1,1),Jt<.5?le(Fe,Me,ke,!0,1-Jt*2):le(At,Me,ke,!1,Jt*2-1)),C.fillStyle="#0d1113",C.fillRect(Me+2,ke+J/2-1,O-4,2)})),St.needsUpdate=!0}const mn=h();S(mn,a.shelfLeft,a.wallRight,Y,.64,0,3.3,5,4),f(mn,"product_shelving.glb",(a.shelfLeft+a.wallRight)/2,0,Y+.32);const oi=h();S(oi,-9,9,E,.6,l.y,2.6,8,3),f(oi,"wall_shelving.glb",0,l.y,E+.3);const nn=h(),Hn=I(nn);f(nn,"arch_shelves.glb",-8.525,l.y,-4.85),n(nn,-8.85,-8.2,l.y,l.y+2.4,-5.9,-3.8,ti);const Kn=new Ke(new Zt(1.05,1.05,.65,32,1,!1,0,Math.PI).rotateZ(Math.PI/2),i(ti));Kn.position.set(-8.525,l.y+2.4,-4.85),Kn.castShadow=!0,nn.add(Kn),n(nn,-8.21,-8.19,l.y+.2,l.y+2.3,-5.7,-4,"#e8dcc4",{cast:!1});for(let V=0;V<3;V++)for(let L=0;L<3;L++)Hn.jars.push([-8.35,l.y+.5+V*.7,-5.45+L*.6,(V+L)%4]);for(let V=0;V<3;V++)n(nn,-8.85,-8.2,l.y+.45+V*.7,l.y+.5+V*.7,-5.8,-3.9,"#ecdbc1",{cast:!1});const Ze=a.column,on=h();t(on,Ze.x,0,Ze.z,.78,1.73,.73,"#25523b"),t(on,Ze.x,1.73,Ze.z,.8,.12,.76,"#e1dbc0"),t(on,Ze.x,1.85,Ze.z,.75,Ge-1.85,.7,rg);const Ct=new Dn({color:"#fff2c8",emissive:"#ffd58a",emissiveIntensity:0}),T=new Ke(new gi(.13,12,8),Ct);T.position.set(Ze.x,2.6,Ze.z+.42),on.add(T);const X=(V,L,ue)=>{const R=V.getObjectByName(L);R&&R.traverse(C=>{if(C.isMesh){const O=C.material.clone();O.emissive=ue.emissive.clone(),C.material=O,ne.push([O,ue])}})},ne=[];f(on,"shop_column.glb",Ze.x,0,Ze.z,V=>X(V,"Sconce",Ct));const H=a.exitDoor,j=h();n(j,H.x0-.14,H.x0,0,H.h+.14,A-.1,A+.12,"#1f4a35"),n(j,H.x1,H.x1+.14,0,H.h+.14,A-.1,A+.12,"#1f4a35"),n(j,H.x0-.14,H.x1+.14,H.h,H.h+.2,A-.1,A+.12,"#1f4a35"),n(j,H.x0,H.x0+.06,.02,H.h-.02,A+.1,A+.95,"#2d6146"),n(j,(H.x0+H.x1)/2-.4,(H.x0+H.x1)/2+.4,H.h+.3,H.h+.56,A,A+.08,"#1d3028");const Ee=new Ke(new Yt(.66,.14,.04),new Dn({color:"#d84a3a",emissive:"#ff5a3c",emissiveIntensity:.4}));Ee.position.set((H.x0+H.x1)/2,H.h+.43,A+.1),j.add(Ee),f(j,"exit_door.glb",(H.x0+H.x1)/2,0,A,V=>{X(V,"ExitLamp",Ee.material);const L=V.getObjectByName("DoorLeaf");L&&(L.rotation.y=-L.rotation.y,L.position.z=-L.position.z)});const me=a.merchCabinet,Be=h(),qe=I(Be);f(Be,"merch_cabinet.glb",(me.back+me.face)/2,0,(me.z0+me.z1)/2,V=>{const L=V.getObjectByName("CabinetGlass");L&&L.traverse(ue=>{ue.isMesh&&(ue.material=Q,ue.castShadow=!1)})}),n(Be,me.back,me.face,0,.2,me.z0,me.z1,Ic),n(Be,me.back,me.face,.2,2.6,me.z0,me.z0+.1,ti),n(Be,me.back,me.face,.2,2.6,me.z1-.1,me.z1,ti),n(Be,me.back,me.back+.12,.2,2.6,me.z0,me.z1,ti);const ot=new Ke(new Zt((me.z1-me.z0)/2,(me.z1-me.z0)/2,me.face-me.back,32,1,!1,0,Math.PI).rotateZ(Math.PI/2),i(ti));ot.position.set((me.face+me.back)/2,2.6,(me.z0+me.z1)/2),ot.castShadow=!0,Be.add(ot);for(let V=0;V<3;V++){n(Be,me.back+.12,me.face-.05,.55+V*.68,.6+V*.68,me.z0+.1,me.z1-.1,"#ecdbc1",{cast:!1});for(let L=0;L<4;L++)(L%2?qe.pouches:qe.jars).push([(me.back+me.face)/2,.6+V*.68,me.z0+.35+L*(me.z1-me.z0-.7)/3,(V+L)%4])}const tt=n(Be,me.face-.03,me.face,.2,2.6,me.z0+.1,me.z1-.1,"#cfe6df",{cast:!1});tt.material=Q;const Te=e.marquee,dt=Te.zFront-Te.zRear,ut=document.createElement("canvas");ut.width=2048,ut.height=192;const Mt=ut.getContext("2d");Mt.fillStyle="#f1e7cc",Mt.fillRect(0,0,2048,96),Mt.fillStyle="#1f6b47",Mt.fillRect(0,96,2048,96),Mt.font='800 54px "Bricolage Grotesque", sans-serif',Mt.textAlign="center",Mt.textBaseline="middle",Te.top.forEach((V,L)=>{Mt.fillStyle="#1f5e40",Mt.fillText(V,(L+.5)*512,50)}),Mt.font='700 40px "Bricolage Grotesque", sans-serif',Te.bottom.forEach((V,L)=>{Mt.fillStyle="#f1e7cc",Mt.fillText(V,(L+.5)*512,146)}),Mt.fillStyle="#1a1e20";for(let V=1;V<4;V++)Mt.fillRect(V*512-3,0,6,192);const jt=new $n(ut);jt.colorSpace=Ot,jt.anisotropy=4;const pt=new Dn({map:jt,emissive:"#ffffff",emissiveMap:jt,emissiveIntensity:.15}),Xe=new Ke(new kn(dt,Te.y1-Te.y0),pt);Xe.rotation.y=Math.PI/2,Xe.position.set(Te.x+.17,(Te.y0+Te.y1)/2,(Te.zFront+Te.zRear)/2),e.wallFaces||o.add(Xe);const lt=a.planter,mt=h();f(mt,"shop_planter.glb",(lt.x0+lt.x1)/2,0,(lt.z0+lt.z1)/2),n(mt,lt.x0,lt.x1,0,.56,lt.z0,lt.z1,"#1f5e40"),n(mt,lt.x0-.04,lt.x1+.04,.56,.63,lt.z0-.04,lt.z1+.04,"#2b302d"),n(mt,lt.x0+.1,lt.x1-.1,.63,.66,lt.z0+.1,lt.z1-.1,"#514633",{cast:!1});const Ft=a.baseboard,gn=.14;[[Ft.x0,Ft.x1,Ft.front-gn,Ft.front],[Ft.x1-gn,Ft.x1,Ft.rear,Ft.front-gn]].forEach(([V,L,ue,R])=>{n(o,V,L,0,Ft.h-.1,ue,R,"#1f5e40"),n(o,V-.01,L+.01,Ft.h-.1,Ft.h-.07,ue-.01,R+.01,Pa,{cast:!1}),n(o,V-.02,L+.02,Ft.h-.07,Ft.h,ue-.03,R+.03,"#e1dbc0")});const qt=[],Sn=new Bn(1,1),Nt=(V,L,ue,R,C)=>{const O=new Ke(Sn,i(C));O.position.set(V,L,ue),O.scale.set(R,R*.8,R),O.castShadow=O.receiveShadow=!0,mt.add(O)};[-1.2,-.5,.2,.9,1.6].forEach((V,L)=>Nt((lt.x0+lt.x1)/2+(L%2?.08:-.08),.9,(lt.z0+lt.z1)/2+V,.3,L%2?"#6b9250":"#5f8648")),t(mt,lt.tree.x,.63,lt.tree.z,.16,2.4,.16,"#816747"),[[0,3.2,0,.75,"#769852"],[-.35,2.9,.3,.55,"#587c4d"],[.3,3.05,-.3,.55,"#98b96e"]].forEach(([V,L,ue,R,C])=>Nt(lt.tree.x+V,L,lt.tree.z+ue,R,C));const Ut=a.hanging,_n=h(),cn=[];n(_n,Ut.x0,Ut.x1,Ut.y-.04,Ut.y,Ut.z-.03,Ut.z+.03,Pa,{cast:!1});for(let V=0;V<18;V++){const L=Ut.x0+(Ut.x1-Ut.x0)*(V+.5)/18,ue=.5+(1-Math.abs(V-8.5)/9)*.7+V%3*.12;for(let R=0;R<6;R++){const C=R/5;cn.push([L+Math.sin(V*1.7+C*3)*.06,Ut.y-.05-ue*C,Ut.z+(V%2?.06:-.06)+C*.08,(V+R)%3,.8])}}qt.push([_n,cn]),f(_n,"pothos_rail.glb",(Ut.x0+Ut.x1)/2,Ut.y,Ut.z),[[l,E],[u,y]].forEach(([V,L])=>(V===u?[-2,2]:[-7,5]).forEach(ue=>{const R=L+.9,C=V.y+Math.min(3.95,V===u?3.5:3.95),O=h(),J=[];n(O,ue-.01,ue+.01,C-.7,C,R-.01,R+.01,"#343f33",{cast:!1}),t(O,ue,C-1,R,.55,.3,.48,"#b6ac8a");for(let le=0;le<14;le++){const pe=le*2.399;J.push([ue+Math.cos(pe)*.28,C-.72-le%4*.18,R+Math.sin(pe)*.22,le%3,.9])}qt.push([O,J]),f(O,"hanging_basket.glb",ue,C,R)}));const P=["#5f8648","#7aa257","#9cc46e"].map(V=>new Je(V)),q=new Bn(.13,0),K=i("#ffffff"),oe=new rt,re=new yn,Se=new N,Pe=new N;qt.forEach(([V,L])=>{const ue=new zn(q,K,L.length);L.forEach(([R,C,O,J,le],pe)=>{re.setFromEuler(new Gn(pe*.7,pe*1.3,0)),ue.setMatrixAt(pe,oe.compose(Se.set(R,C,O),re,Pe.set(1.3*le,.7*le,1*le))),ue.setColorAt(pe,P[J])}),ue.castShadow=!0,ue.receiveShadow=!0,V.add(ue)});const Ue=["#527e60","#b28b64","#75999a","#d5bd8c"].map(V=>new Je(V));Qe.forEach(V=>[[st,V.jars],[wt,V.pouches]].forEach(([L,ue])=>{if(!ue.length)return;const R=new zn(L,i("#ffffff"),ue.length);ue.forEach(([C,O,J,le],pe)=>{R.setMatrixAt(pe,oe.compose(Se.set(C,O,J),re.identity(),Pe.set(1,1,1))),R.setColorAt(pe,Ue[le])}),R.castShadow=!0,V.g.add(R)}));const nt=a.lamps.map(([V,L,ue,R])=>{const C=new qr("#ffc98a",0,11,1.2);return C.position.set(V,L,ue),C.userData.power=R,s.add(C),C});return{update(V){const L=V.night||0,ue=!!V.loungeOpen;te.rotation.z=-(V.time||0)*Math.PI*2/2500,fe&&(fe.rotation.z=te.rotation.z),at&&at.rotor&&(at.rotor.rotation.z=te.rotation.z,at.holder.updateMatrixWorld(!0),at.spinning.forEach(({part:R,mesh:C})=>{const O=new rt().multiplyMatrices(at.parentInverse,R.matrixWorld),J=new rt;ct.forEach((le,pe)=>C.setMatrixAt(pe,J.multiplyMatrices(le,O))),C.instanceMatrix.needsUpdate=!0})),He.set(V.loungeCurtain||0,ue),yt.set(V.loungeExitCurtain||0,ue),gt&&(gt.visible=!ue),It.visible=!ue,Ie(ue),ae.color.setScalar(ue?1:.8),V.menuLines&&Fn(V.menuLines,performance.now()),z.forEach(R=>{R.material.emissiveIntensity=ue?.5+L*1.2:0}),T.material.emissiveIntensity=.3+L*1.4,Ee.material.emissiveIntensity=.4+L*1.2,ne.forEach(([R,C])=>{R.emissiveIntensity=C.emissiveIntensity}),pt.emissiveIntensity=.15+L*.7,nt.forEach(R=>{R.intensity=R.userData.power*(.2+L*5)})}}}const qa=Math.asin(Math.tan(Math.PI/6)),bn=1/Math.cos(qa),Nc=240;function Uc(){const s=new Gr(-1,1,1,-1,1,Nc*2.5),e=Math.SQRT1_2,t=Math.SQRT1_2,n=Math.sin(qa),i=Math.cos(qa);return s.up.set(-e*n,i,-t*n),s.position.set(e*i,n,t*i).multiplyScalar(Nc),s.lookAt(0,0,0),s}function og(s,{width:e,height:t,centerX:n,centerY:i,unit:r}){s.left=-n/r,s.right=(e-n)/r,s.top=i/r,s.bottom=-(t-i)/r,s.updateProjectionMatrix(),s.updateMatrixWorld()}function po(s,e=!1){const t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,c=new Wt;let l=0;for(let u=0;u<s.length;++u){const h=s[u];let f=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in h.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(h.attributes[p]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in h.morphAttributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(h.morphAttributes[p])}if(e){let p;if(t)p=h.index.count;else if(h.attributes.position!==void 0)p=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,u),l+=p}}if(t){let u=0;const h=[];for(let f=0;f<s.length;++f){const p=s[f].index;for(let g=0;g<p.count;++g)h.push(p.getX(g)+u);u+=s[f].attributes.position.count}c.setIndex(h)}for(const u in r){const h=Oc(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in a){const h=a[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let f=0;f<h;++f){const p=[];for(let _=0;_<a[u].length;++_)p.push(a[u][_][f]);const g=Oc(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function Oc(s){let e,t,n,i=-1,r=0;for(let l=0;l<s.length;++l){const u=s[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=u.gpuType),i!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}const a=new e(r),o=new Ht(a,t,n);let c=0;for(let l=0;l<s.length;++l){const u=s[l];if(u.isInterleavedBufferAttribute){const h=c/t;for(let f=0,p=u.count;f<p;f++)for(let g=0;g<t;g++){const _=u.getComponent(f,g);o.setComponent(f+h,g,_)}}else a.set(u.array,c);c+=u.count*t}return i!==void 0&&(o.gpuType=i),o}function Bc(s,e){if(e===0)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===2||e===1){let t=s.getIndex();if(t===null){const a=[],o=s.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===2)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}const cg=/^(Rotor|Flame|DoorLeaf|StaffPlaque|Wheel(FL|FR|BL|BR)$)/,La=new rt,kc=new rt,zc=(s,e)=>!!s.userData.motion||cg.test(s.name)||e;function lg(s){return s.isMesh&&!s.isInstancedMesh&&!s.isSkinnedMesh&&s.visible&&!Array.isArray(s.material)&&!s.material.transparent&&!Object.keys(s.geometry.morphAttributes).length&&!s.geometry.groups.length&&s.children.length===0}function hg(s){return Object.keys(s.attributes).sort().map(e=>e+s.attributes[e].itemSize).join()+(s.index?"|i":"")}function ug(s){const e=new Wt;return Object.entries(s.attributes).forEach(([t,n])=>{const i=new Float32Array(n.count*n.itemSize);for(let r=0;r<n.count;r++)for(let a=0;a<n.itemSize;a++)i[r*n.itemSize+a]=n.getComponent(r,a);e.setAttribute(t,new Ht(i,n.itemSize))}),s.index&&e.setIndex(new Ht(s.index.array.slice(),1)),e}function fg(s){if(s.index){const e=s.index;for(let t=0;t<e.count;t+=3){const n=e.getX(t+1);e.setX(t+1,e.getX(t+2)),e.setX(t+2,n)}return}Object.values(s.attributes).forEach(e=>{for(let t=0;t<e.count;t+=3)for(let n=0;n<e.itemSize;n++){const i=e.getComponent(t+1,n);e.setComponent(t+1,n,e.getComponent(t+2,n)),e.setComponent(t+2,n,i)}})}function Vi(s,e){s.updateMatrixWorld(!0),kc.copy(s.matrixWorld).invert();const t=new Map,n=[],i=o=>o.children.forEach(c=>{if(c.visible){if(zc(c,e)){n.push(c);return}if(lg(c)){const l=c.material.uuid+(c.castShadow?"c":"")+(c.receiveShadow?"r":"")+hg(c.geometry);t.has(l)||t.set(l,[]),t.get(l).push(c)}i(c)}});i(s);let r=0;t.forEach(o=>{if(o.length<2)return;const c=o.map(f=>{const p=ug(f.geometry);return La.multiplyMatrices(kc,f.matrixWorld),p.applyMatrix4(La),La.determinant()<0&&fg(p),p}),l=po(c);if(!l)return;const u=o[0],h=new Ke(l,u.material);h.name="Merged"+(u.material.name||""),h.castShadow=u.castShadow,h.receiveShadow=u.receiveShadow,s.add(h),o.forEach(f=>f.removeFromParent()),r+=o.length-1});const a=o=>[...o.children].forEach(c=>{zc(c,e)||!c.visible||(a(c),(c.type==="Group"||c.type==="Object3D")&&!c.children.length&&c.removeFromParent())});return a(s),n.forEach(o=>{o.children.length&&(r+=Vi(o,e))}),r}const Kt="#d0a54e",Ds="#b98d5c",Is="#6e4a2c",Pn="#1f4a35",Bi="#efe4cf",pi="#6b2436";function dg(s,e,{box:t,span:n,material:i}){const r=e.rooftop;if(!r)return null;const a=new bt;s.add(a);const{x0:o,x1:c,z0:l,z1:u,y:h}=r,f=r.lift,p=Array.from({length:9},()=>new bt);p.forEach(R=>a.add(R));const[g,_,m,d,x,M,b,D,A]=p,E=p.slice(1),[w,y,v,F,B,k,Q,ie]=E.map(R=>{const C=new bt;return R.add(C),C}),U=new bt;a.add(U);const ee=new Li({color:"#cfe6df",roughness:.1,metalness:0,transparent:!0,opacity:.28,depthWrite:!1}),Z=R=>(R.material=ee,R.castShadow=!1,R.receiveShadow=!1,R),fe=(R,C)=>new Dn({color:R,emissive:C,emissiveIntensity:0}),$=[];n(a,o,c,h-.3,h,l,u,"#e4ddcc"),n(a,o-.05,c+.05,h-.34,h-.22,l-.05,u+.05,"#e1dbc0",{cast:!1});const te=e.floors[2].y,Ae=e.floors[0].z-e.floors[0].d/2;[[o+.3,u-.3],[c-.3,u-.3]].forEach(([R,C])=>t(a,R,te,C,.3,h-.3-te,.3,"#33372f")),l<Ae&&([o+.3,0,c-.3].forEach(R=>t(a,R,0,l+.3,.32,h-.3,.32,Pn)),n(a,o,c,h-.62,h-.3,l+.14,l+.46,Pn));const We=document.createElement("canvas");We.width=256,We.height=256;const ce=We.getContext("2d");ce.fillStyle="#b98654",ce.fillRect(0,0,256,256);for(let R=0;R<8;R++)ce.fillStyle=["#bf8c59","#b4814f","#c39260","#b78552"][R%4],ce.fillRect(0,R*32+1,256,30),ce.fillStyle="#8f6038",ce.fillRect(R*97%256,R*32,2,32);const _e=new $n(We);_e.colorSpace=Ot,_e.wrapS=_e.wrapT=1e3,_e.anisotropy=4,_e.repeat.set((c-o)/2.4,(u-l)/2.4);const De=new Ke(new kn(c-o-.2,u-l-.2).rotateX(-Math.PI/2),new Dn({map:_e}));De.position.set((o+c)/2,h+.004,(l+u)/2),De.receiveShadow=!0,U.add(De);const ye=1.05,Ye=[f.z-.6,f.z+.6];function it(R,C,O,J,le){const pe=Math.max(1,Math.round((O-C)/1.6)),ve=(O-C)/pe,ge=(se,Me,ke,Le,Fe,At,Jt)=>R?n(le,J-Fe,J+Fe,ke,Le,se,Me,At,Jt):n(le,se,Me,ke,Le,J-Fe,J+Fe,At,Jt);for(let se=0;se<=pe;se++){const Me=C+se*ve;ge(Me-.04,Me+.04,h,h+ye,.04,Pn)}ge(C,O,h+ye-.03,h+ye+.03,.06,Kt,{cast:!1}),Z(ge(C,O,h+.08,h+ye-.05,.01,"#cfe6df"))}it(!1,o,c,u,U),it(!1,o,c,l,U),it(!0,l,u,c,U),it(!0,Ye[1],u,o,U);const ht=r.lift2?[r.lift2.z-.6,r.lift2.z+.6]:null,_t=new bt;U.add(_t),ht?(it(!0,l,ht[0],o,U),it(!0,ht[1],Ye[0],o,U),it(!0,ht[0],ht[1],o,_t)):it(!0,l,Ye[0],o,U);const ft=(R,C,O,J)=>{const le=Math.hypot(O-R,J-C),pe=new Ke(new Yt(le,.06,.02),i("#e8b13a",{emissive:"#3a2a00"}));pe.position.set((R+O)/2,h+.75,(C+J)/2),pe.rotation.y=-Math.atan2(J-C,O-R),g.add(pe)},xt=[[o+.2,l+.2],[c-.2,l+.2],[c-.2,u-.2],[o+.2,u-.2]];xt.forEach(([R,C],O)=>{t(g,R,h,C,.07,.8,.07,"#d8cfbd");const[J,le]=xt[(O+1)%4];ft(R,C,J,le)}),t(g,-2.2,h,-4.6,1.6,.18,1.1,"#9a7a52"),t(g,-2.2,h+.18,-4.6,1.5,.5,1,"#c9a978"),t(g,1.8,h,-5.4,1.2,.9,1.2,"#8e9a86"),t(g,3.6,h,-2.8,.9,.14,1.4,"#9a7a52");const W=f.w/2,kt=f.d/2,ct=h+2.9,at=.09;function st(R,C,O){const J=f.x,le=[R-.6,R+.6],pe=new bt,ve=new bt,ge=new bt;C.add(pe),O.add(ve),O.add(ge),[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([sn,Nn])=>t(pe,J+sn*(W-at/2),0,R+Nn*(kt-at/2),at,ct,at,Pn));const se=(sn,Nn,js,qs=.01)=>{const Ks=J-W-qs,Ys=J+W+qs,Js=R-kt-qs,Zs=R+kt+qs,Qs=.04;n(pe,Ks,Ys,sn,sn+Nn,Js,Js+Qs,js,{cast:!1}),n(pe,Ks,Ys,sn,sn+Nn,Zs-Qs,Zs,js,{cast:!1}),n(pe,Ks,Ks+Qs,sn,sn+Nn,Js,Zs,js,{cast:!1}),n(pe,Ys-Qs,Ys,sn,sn+Nn,Js,Zs,js,{cast:!1})};[0,e.floors[1].y,e.floors[2].y,h].forEach(sn=>se(sn+2.62,.06,Pn)),n(pe,J-W-.03,J+W+.03,ct,ct+.16,R-kt-.03,R+kt+.03,Pn),se(ct+.16,.025,Kt,.03),n(pe,J+W,J+W+.6,h+2.5,h+2.55,R-kt+.05,R+kt-.05,Pn),[[!1,R+kt],[!1,R-kt],[!0,J-W],[!0,J+W]].forEach(([sn,Nn])=>{Z(sn?n(ve,Nn-.01,Nn+.01,.05,ct,R-kt+.06,R+kt-.06,"#cfe6df"):n(ve,J-W+.06,J+W-.06,.05,ct,Nn-.01,Nn+.01,"#cfe6df"))});const Me=new bt;O.add(Me);const ke=new bt;Me.add(ke);const Le=f.w-.3,Fe=f.d-.3,At=2.35;n(ke,-Le/2,Le/2,0,.12,-Fe/2,Fe/2,"#2b302d"),n(ke,-Le/2,Le/2,At-.14,At,-Fe/2,Fe/2,Kt),[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([sn,Nn])=>t(ke,sn*(Le/2-.04),.12,Nn*(Fe/2-.04),.08,At-.26,.08,Kt)),n(ke,-Le/2+.05,-Le/2+.1,.12,At-.14,-Fe/2+.1,Fe/2-.1,Is,{cast:!1});const Jt=new Ke(new Yt(Le-.3,.04,Fe-.3),fe("#fff2c8","#ffd58a"));Jt.position.y=At-.16,ke.add(Jt),$.push([Jt.material,.4,1.2]),Me.position.set(J,0,R);const En=J+W,Vn=o;return n(ge,En,Vn+.05,h-.26,h,le[0],le[1],"#e4ddcc"),le.forEach(sn=>{n(ge,En,Vn,h+ye-.03,h+ye+.03,sn-.05,sn+.05,Kt,{cast:!1}),Z(n(ge,En,Vn,h+.05,h+ye-.05,sn-.01,sn+.01,"#cfe6df"))}),n(ge,En+.05,o+1.2,h+.006,h+.016,R-.38,R+.38,pi,{cast:!1}),n(ge,En+.05,o+1.2,h+.004,h+.012,R-.45,R+.45,Kt,{cast:!1}),{cab:Me,cabK:ke,kf:pe,ki:ve,kb:ge,frame:C,inside:O,lz:R,cabLamp:Jt}}const wt=[st(f.z,a,U)],Qe=new bt;U.add(Qe),r.lift2&&wt.push(st(r.lift2.z,Qe,Qe));const I=wt[0].cab,S=wt[1]?wt[1].cab:null,Y=new bt;U.add(Y);const be=new Bn(1,1),de=(R,C,O,J,le,pe)=>{const ve=new Ke(be,i(pe));ve.position.set(C,O,J),ve.scale.set(le,le*.8,le),ve.castShadow=ve.receiveShadow=!0,R.add(ve)},he=new bt;U.add(he);const Ge=[[o+.2,o+.9,l+.2,(r.lift2?r.lift2.z:f.z)-.9],[o+.2,o+.9,f.z+.9,u-.2]];Ge.forEach(([R,C,O,J])=>{n(he,R,C,h,h+.55,O,J,"#1f5e40"),n(he,R-.03,C+.03,h+.55,h+.6,O-.03,J+.03,"#e1dbc0",{cast:!1});for(let le=O+.35;le<J-.2;le+=.55)de(he,(R+C)/2,h+.8,le,.32,Math.round(le*3)%2?"#6b9250":"#5f8648")}),[[c-.5,u-.5],[c-.6,l+.6]].forEach(([R,C])=>{const O=new Ke(new Zt(.34,.26,.7,20).translate(0,.35,0),i("#d9cdb4"));O.position.set(R,h,C),O.castShadow=O.receiveShadow=!0,Y.add(O),t(Y,R,h+.7,C,.1,1.1,.1,"#7a6142"),[[0,2.05,0,.55,"#8aa66a"],[-.25,1.8,.2,.4,"#7a9a5c"],[.22,1.9,-.2,.42,"#9cb57a"]].forEach(([J,le,pe,ve,ge])=>de(Y,R+J,h+le,C+pe,ve,ge))});const we=[],Ne=new no({color:"#2b302d"});function vt(R,C,O,J,le,pe,ve,ge){const se=[];for(let Me=0;Me<=ge*2;Me++){const ke=Me/(ge*2),Le=Math.sin(Math.PI*ke)*.45,Fe=[C+(le-C)*ke,J+(ve-J)*ke-Le,O+(pe-O)*ke];se.push(new N(...Fe)),Me%2===0&&we.push([R,Fe[0],Fe[1]-.07,Fe[2]])}R.add(new Vr(new Wt().setFromPoints(se),Ne))}const z={x0:o+1.4,x1:o+6.2,z0:l+.25,z1:l+3.4,h:2.75};[[z.x0,z.z0],[z.x1,z.z0],[z.x1,z.z1],[z.x0,z.z1]].forEach(([R,C])=>t(w,R,h,C,.14,z.h,.14,Pn)),n(w,z.x0-.1,z.x1+.1,h+z.h,h+z.h+.16,z.z0-.07,z.z0+.07,Pn),n(w,z.x0-.1,z.x1+.1,h+z.h,h+z.h+.16,z.z1-.07,z.z1+.07,Pn);for(let R=z.x0+.1;R<z.x1;R+=.38)n(w,R-.04,R+.04,h+z.h+.16,h+z.h+.26,z.z0-.3,z.z1+.3,Ds);const je=(R,C,O,J,le,pe)=>{n(R,C,O,h,h+.22,J,le,Is),n(R,C+.03,O-.03,h+.22,h+.48,J+.03,le-.03,Bi),pe==="z0"&&n(R,C,O,h+.22,h+.92,J,J+.22,Bi),pe==="x0"&&n(R,C,C+.22,h+.22,h+.92,J,le,Bi),pe==="x1"&&n(R,O-.22,O,h+.22,h+.92,J,le,Bi)};je(w,z.x0+.25,z.x1-.5,z.z0+.15,z.z0+.95,"z0"),je(w,z.x0+.25,z.x0+1.05,z.z0+.95,z.z1-.3,"x0"),[[z.x0+1,z.z0+.45],[z.x0+2.6,z.z0+.45],[z.x0+3.6,z.z0+.45],[z.x0+.55,z.z0+1.7]].forEach(([R,C])=>t(w,R,h+.48,C,.32,.3,.14,pi));const et=z.x0+2.5,$e=z.z0+2.05;n(w,et-.9,et+.9,h,h+.38,$e-.45,$e+.45,"#3a3f3a"),n(w,et-.92,et+.92,h+.38,h+.44,$e-.47,$e+.47,"#d8d2c2"),n(w,et-.6,et+.6,h+.44,h+.47,$e-.15,$e+.15,Kt,{cast:!1});let He=new Ke(new Yt(1.1,.12,.1).translate(0,.06,0),new pn({color:"#ffb35a",transparent:!0,opacity:.9}));He.position.set(et,h+.47,$e),w.add(He),vt(_,z.x0,z.z1,h+z.h,o+.25,u-.2,h+ye+.9,9),vt(_,z.x1,z.z1,h+z.h,c-.3,u-.2,h+ye+.9,12),t(_,o+.25,h,u-.2,.06,ye+.95,.06,Pn),t(_,c-.3,h,u-.2,.06,ye+.95,.06,Pn);const yt=new bt;_.add(yt);const gt=new Bn(.17,0),It=new Dn({color:"#ffffff"}),G=[];let Re=7;const ae=()=>(Re=Re*16807%2147483647,Re/2147483647),xe=h+z.h+.26,Ce=13;for(let R=0;R<Ce;R++){const C=z.x0+.1+R*(z.x1-z.x0-.2)/(Ce-1);for(let O=z.z0-.25;O<=z.z1+.25;O+=.3){const J=Math.min(Math.abs(O-z.z0),Math.abs(O-z.z1));ae()<.35+J*.25||G.push([C+(ae()-.5)*.22,xe+ae()*.08,O+(ae()-.5)*.16,.7+ae()*.7])}}[z.z0,z.z1].forEach(R=>{for(let C=z.x0-.05;C<=z.x1+.05;C+=.22)G.push([C,xe-.04+ae()*.06,R+(ae()-.5)*.2,.8+ae()*.5])}),[[z.x0,z.z1,2.3],[z.x1,z.z1,2.1],[z.x0,z.z0,1.2],[z.x1,z.z0,1.4]].forEach(([R,C,O])=>{for(let J=0;J<O;J+=.16){const le=J*4.2+R;G.push([R+Math.cos(le)*.12,h+z.h+.1-J,C+Math.sin(le)*.12,.55+ae()*.35-J*.1])}});const Ie=new zn(gt,It,G.length),Ve=new rt,Bt=new yn,Xt=new Gn,St=new N,$t=new N,en=new Je,fn=["#4f8a3a","#3f7a33","#6a9e45","#2f6a30"];G.forEach(([R,C,O,J],le)=>{Xt.set(ae()*3,ae()*3,ae()*3),Bt.setFromEuler(Xt),St.set(J*1.2,J*.7/bn,J),$t.set(R,C,O),Ie.setMatrixAt(le,Ve.compose($t,Bt,St)),Ie.setColorAt(le,en.set(fn[le%fn.length]))}),Ie.castShadow=!0,Ie.receiveShadow=!0,yt.add(Ie);const In=document.createElement("canvas");In.width=In.height=64;const tn=In.getContext("2d"),Rn=tn.createRadialGradient(32,32,0,32,32,32);Rn.addColorStop(0,"rgba(255,255,255,1)"),Rn.addColorStop(.5,"rgba(255,255,255,.6)"),Rn.addColorStop(1,"rgba(255,255,255,0)"),tn.fillStyle=Rn,tn.fillRect(0,0,64,64);const Cn=new $n(In),Fn=4,mn=4400,oi=4200,nn=[],Hn=new bt;U.add(Hn);function Kn(R){for(;nn.length<=R;){const C=new ml({map:Cn,color:"#e9e4dc",transparent:!0,depthWrite:!1,opacity:0}),O=new pm(C);O.renderOrder=5,Hn.add(O),nn.push(O)}return nn[R]}const Ze={x0:c-4.4,x1:c-1.2,z:l+1.5};n(y,Ze.x0,Ze.x1,h,h+1.05,Ze.z-.45,Ze.z,"#25523b"),n(y,Ze.x0-.06,Ze.x1+.06,h+1.05,h+1.12,Ze.z-.55,Ze.z+.1,"#ece4d2"),n(y,Ze.x0,Ze.x1,h+.18,h+.22,Ze.z+.16,Ze.z+.2,Kt,{cast:!1}),n(y,Ze.x0,Ze.x1,h,h+1.9,l+.2,l+.55,Is),[.8,1.35].forEach(R=>n(y,Ze.x0+.1,Ze.x1-.1,h+R,h+R+.05,l+.2,l+.7,Ds,{cast:!1}));for(let R=Ze.x0+.5;R<Ze.x1-.2;R+=.6)[.85,1.4].forEach((C,O)=>t(y,R+O*.15,h+C+.05,l+.48,.14,.24,.14,["#527e60","#b28b64","#75999a","#d5bd8c"][Math.round(R*3+O)&3]));[Ze.x0+.6,(Ze.x0+Ze.x1)/2,Ze.x1-.6].forEach(R=>{t(y,R,h,Ze.z+.55,.06,.72,.06,Kt);const C=new Ke(new Zt(.2,.2,.08,16).translate(0,.04,0),i(pi));C.position.set(R,h+.72,Ze.z+.55),C.castShadow=!0,y.add(C)});const on=[Ze.x0+.7,(Ze.x0+Ze.x1)/2,Ze.x1-.7].map(R=>{t(y,R,h+1.95,Ze.z-.25,.02,.6,.02,"#343f33",{cast:!1});const C=new Ke(new gi(.13,12,8),fe("#f3d9a6","#ffb36a"));return C.position.set(R,h+1.9,Ze.z-.25),y.add(C),$.push([C.material,.3,1.4]),C});t(y,(Ze.x0+Ze.x1)/2,h+1.9,l+.2,.02,.7,Ze.z-l,"#343f33",{cast:!1}),n(y,Ze.x0-.1,Ze.x1+.1,h+2.55,h+2.6,l+.2,Ze.z-.2,Pn,{cast:!1});const Ct={x:c-.9,z:u-2.2};n(v,Ct.x-.35,Ct.x+.35,h,h+1,Ct.z-.8,Ct.z+.8,"#1d2422"),n(v,Ct.x-.4,Ct.x+.4,h+1,h+1.06,Ct.z-.85,Ct.z+.85,Kt,{cast:!1}),[-.4,.4].forEach(R=>{const C=new Ke(new Zt(.22,.22,.03,20),i("#2e3330"));C.position.set(Ct.x,h+1.08,Ct.z+R),v.add(C)}),[Ct.z-1.05,Ct.z+1.05].forEach(R=>{t(v,Ct.x+.1,h,R,.45,1.35,.45,"#262b29");const C=new Ke(new Wr(.15,16).rotateY(-Math.PI/2),i("#4a514d"));C.position.set(Ct.x-.13,h+.9,R),v.add(C)});const T=new Ke(new kn(2.6,2.2).rotateX(-Math.PI/2),fe("#4a3a33","#d06aa0"));T.position.set(Ct.x-2.4,h+.012,Ct.z),T.receiveShadow=!0,v.add(T),$.push([T.material,.05,.45]),vt(d,c-.3,u-.2,h+ye+.9,c-.3,l+1,h+ye+1.6,10),t(d,c-.3,h,l+1,.06,ye+1.65,.06,Pn),[[o+2.8,u-1.05],[o+5.6,u-1.05]].forEach(([R,C])=>{const O=new Ke(new Zt(.42,.42,.05,20).translate(0,.025,0),i("#ece4d2"));O.position.set(R,h+.74,C),O.castShadow=!0,F.add(O),t(F,R,h,C,.07,.74,.07,"#2b302d"),[[-.62,0],[.62,0]].forEach(([pe,ve])=>{t(F,R+pe,h,C+ve,.38,.45,.38,Ds),t(F,R+pe,h+.45,C+ve,.4,.05,.4,Bi)}),t(F,R,h+.79,C,.05,1.8,.05,"#e1dbc0");const J=new Ke(new Br(1.25,.45,8,1,!0).translate(0,-.22,0),new Dn({color:"#f1e7cc",side:2}));J.position.set(R,h+2.85,C),J.castShadow=!0,F.add(J);const le=new Ke(new Br(1.27,.1,8,1,!0).translate(0,-.42,0),i("#1f6b47"));le.position.copy(J.position),F.add(le)});const X=(R,C,O,J)=>{const pe=z.h-.12,ve=.1*J,ge=(se,Me,ke,Le)=>O?n(B,R+ve+se*J,R+ve+Me*J,h+ke,h+Le,C-.06,C+.06,pi):n(B,R-.06,R+.06,h+ke,h+Le,C+ve+se*J,C+ve+Me*J,pi);ge(0,.42,pe-1.1,pe),ge(0,.42*.45,.95,pe-1.1),ge(0,.42*.8,0,.95),O?n(B,R+ve,R+ve+.2*J,h+1.05,h+1.12,C-.08,C+.08,Kt,{cast:!1}):n(B,R-.08,R+.08,h+1.05,h+1.12,C+ve,C+ve+.2*J,Kt,{cast:!1})};X(z.x0,z.z1,!0,1),X(z.x1,z.z1,!0,-1),X(z.x1,z.z1,!1,-1),X(z.x1,z.z0,!1,1),n(M,z.x0,z.x1,h+z.h-.1,h+z.h-.05,z.z1+.06,z.z1+.1,Kt,{cast:!1}),n(M,z.x1+.06,z.x1+.1,h+z.h-.1,h+z.h-.05,z.z0,z.z1,Kt,{cast:!1});for(let R=0;R<4;R++){const C=Ze.x0+.5+R*(Ze.x1-Ze.x0-1)/3,O=Ze.z-.22;n(k,C-.26,C+.26,h+1.12,h+1.15,O-.13,O+.13,Ds),[-.13,.13].forEach((J,le)=>{const pe=new Ke(new Zt(.075,.075,.2,10).translate(0,.1,0),new Dn({color:"#d7ece4",transparent:!0,opacity:.5}));pe.position.set(C+J,h+1.15,O),k.add(pe),t(k,C+J,h+1.16,O,.09,.1,.09,["#5f8a3c","#7a9a42","#4f7a3a","#8c9a4a"][R+le&3]),t(k,C+J,h+1.35,O,.16,.03,.16,Kt,{cast:!1})})}const ne=(Ze.x0+Ze.x1)/2;n(k,ne-.75,ne+.75,h+1.97,h+2.47,l+.3,l+.36,"#22302a"),n(k,ne-.8,ne+.8,h+1.94,h+2.5,l+.26,l+.3,Is);for(let R=0;R<4;R++)n(k,ne-.6,ne+(R&1?.25:.5),h+2.36-R*.1,h+2.38-R*.1,l+.36,l+.37,Bi,{cast:!1});const H={x0:o+6.9,x1:o+9.1,z:u-.85};n(Q,H.x0,H.x1,h+.72,h+.78,H.z-.3,H.z+.3,Ds),[[H.x0+.1,-.22],[H.x0+.1,.22],[H.x1-.1,-.22],[H.x1-.1,.22]].forEach(([R,C])=>t(Q,R,h,H.z+C,.07,.72,.07,Is)),n(Q,H.x0+.1,H.x1-.1,h+.78,h+.79,H.z-.1,H.z+.1,Bi,{cast:!1});for(let R=0;R<4;R++){const C=H.x0+.3+R*(H.x1-H.x0-.6)/3,O=new Ke(new Zt(.12,.1,.02,14).translate(0,.01,0),i("#fbf8ee"));O.position.set(C,h+.79,H.z-.17+(R&1)*.34),Q.add(O),t(Q,C,h+.8,H.z-.17+(R&1)*.34,.08,.04,.08,"#6f9a45"),t(Q,C,h,H.z+.46,.07,.5,.07,Kt),t(Q,C,h+.5,H.z+.46,.28,.06,.28,pi)}[H.x0+.55,H.x1-.55].forEach(R=>{t(Q,R,h+.79,H.z,.05,.22,.05,Kt,{cast:!1});const C=new Ke(new gi(.07,10,6),fe("#fff0c8","#ffc56a"));C.position.set(R,h+1.05,H.z),Q.add(C),$.push([C.material,.3,1.6])}),[f.z-.55,f.z+.55].forEach(R=>{[o+.45,o+1.35].forEach(C=>{t(A,C,h,R,.07,.82,.07,Kt),t(A,C,h+.82,R,.13,.08,.13,Kt)}),n(A,o+.45,o+1.35,h+.66,h+.71,R-.025,R+.025,pi,{cast:!1})}),n(A,o+1.6,o+6.4,h+.006,h+.014,u-1.95,u-.25,Kt,{cast:!1}),n(A,o+1.7,o+6.3,h+.008,h+.018,u-1.85,u-.35,pi,{cast:!1}),[[c-.35,u-1.1],[o+6.6,l+.35]].forEach(([R,C])=>{t(ie,R,h,C,.26,.1,.26,Kt),t(ie,R,h+.1,C,.06,1.25,.06,Kt);const O=new Ke(new Yt(.24,.34,.24).translate(0,.17,0),fe("#fff1cf","#ffcf7a"));O.position.set(R,h+1.35,C),O.castShadow=!1,ie.add(O),$.push([O.material,.35,1.5]),t(ie,R,h+1.69,C,.3,.05,.3,Kt,{cast:!1})});const j=new gi(.06,8,6),Ee=fe("#fff1cf","#ffcf7a");$.push([Ee,.2,1.6]);const me=new Map;we.forEach(([R,...C])=>{me.has(R)||me.set(R,[]),me.get(R).push(C)});const Be=new rt;me.forEach((R,C)=>{const O=new zn(j,Ee,R.length);R.forEach(([J,le,pe],ve)=>O.setMatrixAt(ve,Be.makeTranslation(J,le,pe))),C.add(O)});const qe=new qr("#ffc98a",0,14,1.2);qe.position.set((o+c)/2,h+2.6,(l+u)/2),s.add(qe);const ot=e.shell,tt=ot.loungeFront,Te=ot.loungeDoor.x,dt=ot.loungeHeader,ut=.7,Mt=.81,jt=new bt;a.add(jt);const pt=new bt;jt.add(pt),n(pt,Te-ut-.12,Te-ut,0,dt+.12,tt-.02,tt+.1,"#1f4a35"),n(pt,Te+ut,Te+ut+.12,0,dt+.12,tt-.02,tt+.1,"#1f4a35"),n(pt,Te-ut-.12,Te+ut+.12,dt,dt+.14,tt-.02,tt+.1,"#1f4a35");const Xe=tt-Mt-1.5;n(pt,Te-ut-.1,Te-ut,0,dt,Xe,tt-.02,"#26302a",{cast:!1}),n(pt,Te+ut,Te+ut+.1,0,dt,Xe,tt-.02,"#26302a",{cast:!1}),n(pt,Te-ut,Te+ut,0,dt,Xe-.1,Xe,"#2f3a32",{cast:!1}),n(pt,Te-ut,Te+ut,dt,dt+.05,Xe,tt-.02,"#1d241f",{cast:!1}),n(pt,Te-.38,Te+.38,.004,.014,Xe,tt-.02,pi,{cast:!1});const lt=new Ke(new gi(.1,12,8),fe("#fff2c8","#ffd58a"));lt.position.set(Te,dt-.45,Xe+.06),pt.add(lt),$.push([lt.material,.6,1.2]);const mt=new bt;mt.position.set(Te-ut+.02,0,tt+.02),pt.add(mt);const Ft=ut*2-.04,gn=dt-.03;n(mt,0,Ft,.01,gn,-.03,.03,"#2d6146"),[[.32,.95],[1.15,1.85]].forEach(([R,C])=>n(mt,.14,Ft-.14,R,C,.03,.05,"#357052",{cast:!1})),n(mt,.08,Ft-.08,.02,.2,.03,.045,Kt,{cast:!1}),n(mt,Ft-.2,Ft-.12,.95,1.1,.03,.1,Kt,{cast:!1});const qt=document.createElement("canvas");qt.width=256,qt.height=96;const Sn=new $n(qt);Sn.colorSpace=Ot;const Nt=new Ke(new kn(.66,.25),new pn({map:Sn}));Nt.position.set(Ft*.62,1.5,.056),mt.add(Nt);const Ut=document.createElement("canvas");Ut.width=512,Ut.height=64;const _n=new $n(Ut);_n.colorSpace=Ot,_n.anisotropy=4;const cn=new pn({map:_n,transparent:!0}),P=new bt;P.position.set(Te+2.1,2.02,tt+.05),jt.add(P),[.12,-.1].forEach((R,C)=>{const O=new Ke(new kn(2.3,.26),cn);O.rotation.z=R,O.position.z=C*.006,P.add(O)});function q(){const R='"Fredoka", "Bricolage Grotesque", sans-serif';let C=qt.getContext("2d");C.fillStyle="#ece4d2",C.fillRect(0,0,256,96),C.strokeStyle=Kt,C.lineWidth=6,C.strokeRect(3,3,250,90),C.fillStyle="#1f3a2c",C.font=`600 40px ${R}`,C.textAlign="center",C.textBaseline="middle",C.fillText("STAFF ONLY",128,51),Sn.needsUpdate=!0,C=Ut.getContext("2d"),C.clearRect(0,0,512,64),C.fillStyle="#e8b13a",C.fillRect(0,6,512,52),C.fillStyle="#2b2414",C.font=`600 34px ${R}`,C.textAlign="center",C.textBaseline="middle",C.fillText("COMING SOON  ·  COMING SOON",256,33),_n.needsUpdate=!0}q(),document.fonts&&document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",q);let K=0,oe=null,re=null;const Se=[],Pe=[],Ue=new Set,nt=new Set,V=fe("#fff0c8","#ffc56a");$.push([V,.3,1.6]);function L(R,C){const O=[{file:"rooftop_speakeasy.glb",parent:_,hide:w,at:[[o+3.8,l+1.825]]},{file:"rooftop_pergola_vines.glb",parent:_,hide:yt,at:[[o+3.8,l+1.825]]},{file:"rooftop_bar.glb",parent:m,hide:y,at:[[(Ze.x0+Ze.x1)/2,Ze.z-.225]]},{file:"rooftop_dj_booth.glb",parent:d,hide:v,at:[[Ct.x,Ct.z]]},{file:"rooftop_parasol_table.glb",parent:x,hide:F,at:[[o+2.8,u-1.05],[o+5.6,u-1.05]]},{file:"rooftop_olive.glb",parent:U,hide:Y,at:[[c-.5,u-.5],[c-.6,l+.6]]},{file:"rooftop_drapes.glb",parent:M,hide:B,at:[[z.x0,z.z1,0],[z.x1,z.z1,Math.PI],[z.x1,z.z1,Math.PI/2],[z.x1,z.z0,-Math.PI/2]]},{file:"rooftop_jar_flight.glb",parent:b,hide:k,at:[[(Ze.x0+Ze.x1)/2,Ze.z-.225]]},{file:"rooftop_chefs_table.glb",parent:D,hide:Q,at:[[o+8,u-.85]]},{file:"rooftop_lantern.glb",parent:A,hide:ie,at:[[c-.35,u-1.1],[o+6.6,l+.35]]}];O.forEach(ge=>nt.add(ge.parent)),O.forEach(ge=>R.load(C+ge.file,se=>{const Me=se.scene;Me.traverse(Fe=>{Fe.isMesh&&(Fe.castShadow=Fe.receiveShadow=!0)});const ke=Me.getObjectByName("Flame"),Le=Me.getObjectByName("DanceFloor");Me.traverse(Fe=>{/^Sign/.test(Fe.name)&&(Fe.visible=!1)}),ke&&ke.traverse(Fe=>{Fe.isMesh&&(Fe.material=He.material,Fe.castShadow=!1)}),Le&&Le.traverse(Fe=>{Fe.isMesh&&(Fe.material=T.material)}),on.forEach((Fe,At)=>{const Jt=Me.getObjectByName("BarLamp"+At);Jt&&Jt.traverse(En=>{En.isMesh&&(En.material=Fe.material,En.castShadow=!1)})}),Me.traverse(Fe=>{Fe.isMesh&&/^(CandleGlow|LanternGlow)/.test(Fe.name)&&(Fe.material=V,Fe.castShadow=!1)}),Me.traverse(Fe=>{const At=Fe.isMesh&&Fe.material;At&&/^Vine/.test(At.name)&&!Pe.some(Jt=>Jt[0]===At)&&Pe.push([At,At.color.clone()])}),Vi(Me),ge.at.forEach(([Fe,At,Jt],En)=>{const Vn=new bt;Jt&&(Vn.rotation.y=Jt),Vn.add(En?Me.clone():Me),Vn.scale.set(1.69,1.69/bn,1.69),Vn.position.set(Fe,h,At),ge.parent.add(Vn)}),ke&&(He=ke),ge.hide.visible=!1,Ue.add(ge.parent)},void 0,se=>console.warn("3D map: could not load "+ge.file,se)));const J=(ge,se,Me,ke,Le)=>{const Fe=new bt;return Fe.add(se),Fe.scale.set(1.69,1.69/bn,1.69),Fe.position.set(Me,ke,Le),ge.add(Fe),se.traverse(At=>{At.isMesh&&(At.castShadow=At.receiveShadow=!0)}),Vi(se),Fe},le=(ge,se)=>R.load(C+ge,Me=>se(Me.scene),void 0,Me=>console.warn("3D map: could not load "+ge,Me));le("lounge_elevator_shaft.glb",ge=>wt.forEach((se,Me)=>{const ke=Me?ge.clone():ge;ke.traverse(Le=>{Le.isMesh&&Le.material&&/Glass/.test(Le.material.name)&&(Le.material=ee,Le.castShadow=Le.receiveShadow=!1,Me||Se.push(Le))}),J(se.frame,ke,f.x,0,se.lz),se.kf.visible=se.ki.visible=!1})),le("lounge_elevator_cab.glb",ge=>wt.forEach((se,Me)=>{const ke=Me?ge.clone():ge;ke.traverse(Le=>{/^Rail/.test(Le.name)&&(Le.visible=!1),Le.name==="CabLamp"&&Le.traverse(Fe=>{Fe.isMesh&&(Fe.material=se.cabLamp.material,Fe.castShadow=!1)})}),J(se.cab,ke,0,0,0),se.cabK.visible=!1})),le("lounge_bridge.glb",ge=>wt.forEach((se,Me)=>{const ke=Me?ge.clone():ge;ke.traverse(Le=>{Le.isMesh&&Le.material&&/Glass/.test(Le.material.name)&&(Le.material=ee,Le.castShadow=Le.receiveShadow=!1)}),J(se.inside,ke,(f.x+f.w/2+o)/2,h,se.lz),se.kb.visible=!1})),le("lounge_door.glb",ge=>{const se=ge.getObjectByName("DoorLeaf"),Me=ge.getObjectByName("StaffPlaque"),ke=ge.getObjectByName("Sconce");se&&(ke&&ke.traverse(Le=>{Le.isMesh&&(Le.material=lt.material,Le.castShadow=!1)}),J(jt,ge,Te,0,tt),oe=se,re=Me,pt.visible=!1)});const pe=["deck_planter.glb","deck_planter_short.glb"];let ve=0;pe.forEach((ge,se)=>le(ge,Me=>{const[ke,Le,Fe,At]=Ge[se];J(U,Me,(ke+Le)/2,h,(Fe+At)/2),++ve===pe.length&&(he.visible=!1)}))}function ue(R,C){const O=Math.min(E.length,Math.max(1,R)),J=[...p,U,Qe,_t,Hn];if(!E.slice(0,O).every(se=>!nt.has(se)||Ue.has(se))||!Ue.has(U))return null;const le=J.map(se=>se.visible);g.visible=!1,U.visible=!0,Hn.visible=!1,E.forEach((se,Me)=>{se.visible=Me<O}),Qe.visible=!!C,_t.visible=!C;const pe=a.clone();J.forEach((se,Me)=>{se.visible=le[Me]}),pe.updateMatrixWorld(!0);const ve=[],ge=new Mn;return pe.traverse(se=>{if(se!==pe){if(!se.visible||se.isSprite){ve.push(se);return}!se.isMesh||se.isInstancedMesh||(se.geometry.boundingBox||se.geometry.computeBoundingBox(),ge.copy(se.geometry.boundingBox).applyMatrix4(se.matrixWorld),(ge.max.y<h-.05||ge.min.x<o-.2)&&ve.push(se))}}),ve.forEach(se=>se.parent&&se.parent.remove(se)),pe}return{loadModels:L,pictureCopy:ue,update(R){const C=R.loungeOpen?Math.max(1,R.loungeTier||1):0,O=R.night||0;g.visible=!C,U.visible=!!C,E.forEach((ve,ge)=>{ve.visible=C>ge}),I.position.y=R.liftY||0,S&&(S.position.y=R.liftY2||0,Qe.visible=!!R.loungeLift,_t.visible=!R.loungeLift),K+=((C?1.75:0)-K)*.15,mt.rotation.y=K,Nt.visible=!C,P.visible=!C,oe&&(oe.rotation.y=K,re&&(re.visible=!C)),Se.forEach(ve=>{ve.visible=!!C}),$.forEach(([ve,ge,se])=>{ve.emissiveIntensity=ge+O*se}),He.scale.y=.8+Math.sin((R.time||0)/130)*.2+Math.sin((R.time||0)/53)*.1,He.visible=C>=1,It.color.setScalar(1-O*.45),Pe.forEach(([ve,ge])=>ve.color.copy(ge).multiplyScalar(1-O*.45));const J=C?R.loungeSmokers||[]:[],le=R.time||0;let pe=0;J.forEach(ve=>{for(let ge=0;ge<Fn;ge++){const se=(le+ve.id*1777%mn+ge*mn/Fn)%mn/oi;if(se>=1)continue;const Me=Kn(pe++),ke=.75+se*2.3,Le=Math.sin(se*3+ve.id+ge)*.2;Me.visible=!0,Me.position.set(ve.x+(ve.facing||0)*.4+Le+se*.25,h+1.65+se*2,ve.z+.1-se*.15),Me.scale.set(ke,ke/bn,1),Me.material.opacity=Math.min(1,se*6)*Math.pow(1-se,.8)*.95,Me.material.color.setScalar(.72-O*.25)}});for(let ve=pe;ve<nn.length;ve++)nn[ve].visible=!1;qe.intensity=C?O*6:0}}}const pg="#1f6b47",mg="#d0a54e";function gg(s,e,{span:t,model:n}){const i=e.entrance;if(!i)return null;const r=new bt;s.add(r);const a=i.x;function o(M,b,D){const A=new Wt;A.setAttribute("position",new Rt(M.flat(),3)),A.setAttribute("uv",new Rt(b.flat(),2)),A.setIndex(M.length===4?[0,1,2,0,2,3]:[0,1,2]),A.computeVertexNormals();const E=new Ke(A,D);return E.castShadow=E.receiveShadow=!0,r.add(E),E}const c=i.sign,l=new bt;r.add(l),t(l,c.x0,a,c.y1+.08,c.y1+.16,c.z-.05,c.z+.05,pg),[c.x0+.12,c.x1-.12].forEach(M=>t(l,M-.015,M+.015,c.y1,c.y1+.08,c.z-.015,c.z+.015,mg,{cast:!1})),t(l,c.x0-.04,c.x1+.04,c.y0-.04,c.y1+.04,c.z-.05,c.z+.05,"#1d211f");const u=document.createElement("canvas");u.width=256,u.height=284;const h=u.getContext("2d");h.fillStyle="#0d120f",h.fillRect(0,0,256,284);const f=128,p=150,g=(M,b)=>{const D=118*b,A=17*b,E=M-Math.PI/2,w=Math.cos(E),y=Math.sin(E),v=16,F=Q=>Array.from({length:v+1},(ie,U)=>{const ee=U/v,Z=A*Math.pow(Math.sin(Math.PI*Math.min(1,ee*1.08)),.9)*(U%2?1:.72);return[f+w*D*ee-y*Z*Q,p+y*D*ee+w*Z*Q]}),B=F(1),k=F(-1).reverse();h.moveTo(f,p),B.forEach(Q=>h.lineTo(Q[0],Q[1])),k.forEach(Q=>h.lineTo(Q[0],Q[1])),h.closePath()},_=()=>{h.beginPath(),[[0,1],[-.5,.84],[.5,.84],[-1.05,.7],[1.05,.7],[-1.6,.38],[1.6,.38]].forEach(([M,b])=>g(M,b))};h.lineJoin=h.lineCap="round",_(),h.shadowColor="#29ff6a",h.shadowBlur=18,h.strokeStyle="#3df27a",h.lineWidth=12,h.stroke(),_(),h.shadowBlur=0,h.strokeStyle="#e4ffe9",h.lineWidth=6,h.stroke(),_(),h.fillStyle="#0f1812",h.fill();const m=()=>{h.beginPath(),h.moveTo(f,p-6),h.lineTo(f,p+34)};m(),h.shadowBlur=14,h.strokeStyle="#3df27a",h.lineWidth=7,h.stroke(),m(),h.shadowBlur=0,h.strokeStyle="#e4ffe9",h.lineWidth=3,h.stroke(),h.font='300 54px "Fredoka", sans-serif',h.textAlign="center",h.textBaseline="alphabetic",h.lineWidth=2.5,h.shadowColor="#29ff6a",h.shadowBlur=16,h.strokeStyle="#7dff9f",h.strokeText("OPEN",f,262,210),h.shadowBlur=0,h.strokeStyle="#ecfff0",h.lineWidth=1.5,h.strokeText("OPEN",f,262,210);const d=new $n(u);d.colorSpace=Ot;const x=new pn({map:d,toneMapped:!1,side:2});return[c.z-.052,c.z+.052].forEach(M=>{const b=o([[c.x0,c.y1,M],[c.x1,c.y1,M],[c.x1,c.y0,M],[c.x0,c.y0,M]],[[0,1],[1,1],[1,0],[0,0]],x);b.castShadow=!1,l.attach(b)}),n&&n("blade_sign.glb",a,0,c.z,M=>{let b=0;const D=d.clone();D.flipY=!1,D.needsUpdate=!0;const A=x.clone();A.map=D,M.traverse(E=>{E.isMesh&&/^SignFace/.test(E.name)&&(E.material=A,E.castShadow=!1,b++)}),b?l.visible=!1:M.parent.visible=!1},r),r}const bg=5e3,_g=8e3,Gc=4e3,Pr=9e4,xg=8,Da=256,Ia=64,Lr=2,Hc=new Map;function Dr(s){if(typeof s!="string")return null;let e=Hc.get(s);if(e!==void 0)return e;if(e=null,s[0]==="#"){let t=s.slice(1);(t.length===3||t.length===4)&&(t=t.split("").map(n=>n+n).join("")),(t.length===6||t.length===8)&&(e=[new Je("#"+t.slice(0,6)),t.length===8?parseInt(t.slice(6),16)/255:1])}else if(/^rgba?\(/.test(s)){const t=s.match(/[\d.]+/g).map(Number);e=[new Je(`rgb(${t[0]},${t[1]},${t[2]})`),t.length>3?t[3]:1]}return Hc.set(s,e),e}function vg(s){const e=new bt;e.visible=!1,s.add(e);const t=new rt,n=new N,i=new N,r=new yn,a=new N(0,1,0),o=new N,c=new Je("#ffffff");function l(U,ee,Z,fe=!0){const $=new zn(U,Z,ee);return $.instanceMatrix.setUsage(35048),$.setColorAt(0,c),$.count=0,$.castShadow=fe,$.receiveShadow=!0,$.frustumCulled=!1,e.add($),$}const u=U=>new Dn({color:"#ffffff",...U}),h=U=>new pn({color:"#ffffff",...U}),f={transparent:!0,opacity:.32,depthWrite:!1},p=new Yt(1,1,1).translate(0,.5,0),g=new Zt(.5,.5,1,8,1).translate(0,.5,0),_=new Bn(1,2),m=new Zt(1,1,.02,20),d=new Wr(1,24).rotateY(Math.PI/4),x={box:[l(p,bg,u()),l(p,800,h()),l(p,800,u(f),!1)],cord:[l(g,_g,u()),l(g,1500,h())],blob:[l(_,Gc,u()),l(_,600,h())],disc:[l(m,Gc,u(),!1),l(m,600,h(),!1)],facing:[l(d,600,u({side:2}),!1),l(d,300,h({side:2}),!1)]};function M(U,ee){const Z=new Wt;Z.setAttribute("position",new Ht(new Float32Array(Pr*3),3).setUsage(35048)),Z.setAttribute("normal",new Ht(new Float32Array(Pr*3),3).setUsage(35048)),Z.setAttribute("color",new Ht(new Float32Array(Pr*(ee?4:3)),ee?4:3).setUsage(35048)),Z.setDrawRange(0,0),Object.assign(U,{vertexColors:!0,side:2,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});const fe=new Ke(Z,U);return fe.frustumCulled=!1,fe.receiveShadow=!0,e.add(fe),{mesh:fe,g:Z,alpha:ee,n:0}}const b=[M(u(),!1),M(h(),!1),M(u({transparent:!0,depthWrite:!1}),!0)],D=new Map;function A(U,ee){const Z=U.x.toFixed(2)+","+U.y.toFixed(2)+","+U.z.toFixed(2)+","+U.alongZ;let fe=D.get(Z);if(!fe){const $=document.createElement("canvas");$.width=Da*Lr,$.height=Ia*Lr;const te=$.getContext("2d");te.scale(Lr,Lr),te.translate(Da/2,Ia/2);const Ae=ee*Math.SQRT1_2;try{U.draw(te,Ae)}catch{}const We=new $n($);We.colorSpace=Ot,We.anisotropy=4,fe=new Ke(new kn(Da/Ae,Ia/ee),h({map:We,transparent:!0,alphaTest:.05,side:2,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4})),fe.position.set(U.x,U.y,U.z),U.alongZ&&(fe.rotation.y=Math.PI/2),e.add(fe),D.set(Z,fe)}return fe}const E=[];for(let U=0;U<xg;U++){const ee=new qr("#ffd9a0",0,9,1.4);e.add(ee),E.push(ee)}function w(U,ee,Z,fe){const $=Z?U[2]:U[ee?1:0];return!$||$.count>=$.instanceMatrix.count?null:(fe(t),$.setMatrixAt($.count,t),[$,$.count++])}function y(U,ee){U&&U[0].setColorAt(U[1],ee[0])}function v(U,ee){U.clearUpdateRanges(),ee>0&&U.addUpdateRange(0,ee*U.itemSize),U.needsUpdate=!0}function F(U,ee){let Z=2166136261^U.length;const fe=te=>{Z=Math.imul(Z^te,16777619)},$=te=>{if(typeof te=="number")fe(Math.round(te*4096));else if(typeof te=="string")for(let Ae=0;Ae<te.length;Ae++)fe(te.charCodeAt(Ae));else Array.isArray(te)?(fe(te.length),te.forEach($)):fe(te?1:0)};return U.forEach(te=>ee.forEach(Ae=>$(te[Ae]))),Z}const B={};function k(U,ee,Z){const fe=F(ee,Z);return B[U]===fe?!1:(B[U]=fe,!0)}function Q(U){U.forEach(ee=>{ee.count=0})}function ie(U){U.forEach(ee=>{v(ee.instanceMatrix,ee.count),ee.instanceColor&&v(ee.instanceColor,ee.count)})}return{group:e,update(U,ee){if(k("boxes",U.boxes,["x","y","z","w","d","h","c","lit"])&&(Q(x.box),U.boxes.forEach($=>{const te=Dr($.c);!te||te[1]<.05||y(w(x.box,$.lit,te[1]<.9,Ae=>Ae.compose(n.set($.x,$.y,$.z),r.identity(),i.set(Math.max(.01,$.w),Math.max(.01,$.h),Math.max(.01,$.d)))),te)}),ie(x.box)),k("lines",U.lines,["pts","c","w","lit"])&&(Q(x.cord),U.lines.forEach($=>{const te=Dr($.c);if(!te||te[1]<.5)return;const Ae=Math.max(.02,$.w);for(let We=1;We<$.pts.length;We++){const ce=$.pts[We-1],_e=$.pts[We];o.set(_e[0]-ce[0],_e[1]-ce[1],_e[2]-ce[2]);const De=o.length();De<1e-4||(o.divideScalar(De),y(w(x.cord,$.lit,!1,ye=>ye.compose(n.set(ce[0],ce[1],ce[2]),r.setFromUnitVectors(a,o),i.set(Ae,De,Ae))),te))}}),ie(x.cord)),k("ellipses",U.ellipses,["at","rx","ry","c","lit"])){const $=x.blob.concat(x.disc,x.facing);Q($),U.ellipses.forEach((te,Ae)=>{const We=Dr(te.c);if(!We||We[1]<.5)return;const ce=te.ry/te.rx<.66,_e=te.rx,De=.08+Ae*.0015;te.ry>te.rx*1.05?y(w(x.facing,te.lit,!1,ye=>ye.compose(n.set(te.at[0]+De,te.at[1],te.at[2]+De),r.identity(),i.set(te.rx,te.ry,te.rx))),We):y(ce?w(x.disc,te.lit,!1,ye=>ye.compose(n.set(te.at[0],te.at[1],te.at[2]),r.identity(),i.set(_e,1,_e))):w(x.blob,te.lit,!1,ye=>ye.compose(n.set(te.at[0],te.at[1],te.at[2]),r.identity(),i.set(_e,Math.max(.4,te.ry/te.rx)*_e,_e))),We)}),ie($)}if(k("polys",U.polys,["pts","c","lit"])){b.forEach(te=>{te.n=0});const $=new N;U.polys.forEach(te=>{const Ae=Dr(te.c);if(!Ae||Ae[1]<.08||te.pts.length<3)return;const We=b[Ae[1]<.9?2:te.lit?1:0],ce=te.pts.length-2;if(We.n+ce*3>Pr)return;const _e=We.g.attributes.position.array,De=We.g.attributes.normal.array,ye=We.g.attributes.color.array,Ye=We.alpha?4:3,it=te.pts[0];$.set(0,0,0);for(let _t=0;_t<te.pts.length;_t++){const ft=te.pts[_t],xt=te.pts[(_t+1)%te.pts.length];$.x+=(ft[1]-xt[1])*(ft[2]+xt[2]),$.y+=(ft[2]-xt[2])*(ft[0]+xt[0]),$.z+=(ft[0]-xt[0])*(ft[1]+xt[1])}if($.lengthSq()<1e-12)return;const ht=$.y<-1e-6||Math.abs($.y)<1e-6&&$.x+$.z<0;ht&&$.negate(),$.normalize();for(let _t=1;_t<=ce;_t++)(ht?[it,te.pts[_t+1],te.pts[_t]]:[it,te.pts[_t],te.pts[_t+1]]).forEach(ft=>{const xt=We.n++;_e[xt*3]=ft[0],_e[xt*3+1]=ft[1],_e[xt*3+2]=ft[2],De[xt*3]=$.x,De[xt*3+1]=$.y,De[xt*3+2]=$.z,ye[xt*Ye]=Ae[0].r,ye[xt*Ye+1]=Ae[0].g,ye[xt*Ye+2]=Ae[0].b,We.alpha&&(ye[xt*Ye+3]=Ae[1])})}),b.forEach(te=>{te.g.setDrawRange(0,te.n),["position","normal","color"].forEach(Ae=>v(te.g.attributes[Ae],te.n))})}const Z=new Set;U.faces.forEach($=>Z.add(A($,U.unit))),D.forEach($=>{$.visible=Z.has($)});const fe=(U.fixtures||[]).slice().sort(($,te)=>te.size-$.size);E.forEach(($,te)=>{const Ae=fe[te];$.intensity=Ae?ee*6*Math.min(1.5,Ae.size):0,Ae&&$.position.set(Ae.x,Ae.y,Ae.z)})}}}const Mg=[7,9,8,6,3,4],yg=/^(ReaderScreen|MonitorGlass|ScaleScreen|TillGlass)$/,Ei=new Mn,Sg=new Mn,Eg=new N;function Tg(s){return Ei.makeEmpty(),s.forEach(e=>{e.updateMatrix(),e.geometry?(e.geometry.boundingBox||e.geometry.computeBoundingBox(),Ei.union(Sg.copy(e.geometry.boundingBox).applyMatrix4(e.matrix))):Ei.expandByPoint(e.position)}),Eg.set((Ei.min.x+Ei.max.x)/2,Ei.min.y,(Ei.min.z+Ei.max.z)/2)}function Fa(s,e){const t=new Map;return s.forEach(n=>{const i=e.exec(n.name);i&&(t.has(i[1])||t.set(i[1],[]),t.get(i[1]).push(n))}),[...t.keys()].sort().map(n=>t.get(n))}function Na(s,e){const t=s[0].parent,n=new bt,i=Tg(s);return n.position.copy(i),n.userData.motion=Object.assign({rest:i.toArray()},e),t.add(n),s.forEach(r=>{r.position.sub(i),n.add(r)}),n}const Ti=(s,e)=>{s.userData.motion=Object.assign({rest:s.position.toArray(),size:s.scale.toArray()},e)},Ir=(s,e)=>s.forEach((t,n)=>e(t,n,s.length));function wg(s,e){const t=[];s.traverse(i=>{i!==s&&i.name&&t.push(i)});const n=i=>t.filter(r=>i.test(r.name));return e===0&&Fa(t,/^S(\d+)(?:Leaf|Stem|Top)/).forEach((i,r,a)=>Na(i,{m:"sprout",k:r,n:a.length})),e===1&&Fa(t,/^P(\d+)(?:Stem|Leaf|Pet|Branch|Cola|SideCola|Sugar|TopSugar|Crown)/).forEach((i,r)=>{Na(i,{m:"plant",k:r}),i.forEach(a=>{/(Cola|Sugar)\d*$/.test(a.name)&&Ti(a,{m:"bud"})})}),e===2&&(Ir(n(/^(?:T\dP\d|Plant|Corner)(?:Leaf|Pet|BranchLeaf)/),(i,r,a)=>Ti(i,{m:"trim",k:r*7%a,n:a})),Ir(n(/^(?:Tray\d?Nug|BoardNug)\d+$/),(i,r,a)=>Ti(i,{m:"fill",k:r,n:a,from:.1,span:.75}))),e===3&&(n(/^Press(?:Ram|Head|Plate)$/).forEach(i=>Ti(i,{m:"press",amp:.03})),n(/^ScalePan$/).forEach(i=>Ti(i,{m:"press",amp:.008})),Ir(n(/^(?:TopCratePouch|Box)\d+$/),(i,r,a)=>Ti(i,{m:"fill",k:r,n:a,from:.35,span:.5})),Ir(n(/^TrayNug\d+$/),(i,r,a)=>Ti(i,{m:"drain",k:r,n:a}))),e===4&&n(/^Key\d+$/).forEach((i,r)=>Ti(i,{m:"key",k:r})),e===5&&Fa(t,/^(?:Bag|FlatBag)(\d+)/).forEach((i,r,a)=>Na(i,{m:"handoff",k:r,n:a.length})),e!==6&&t.forEach(i=>{yg.test(i.name)&&i.isMesh&&(i.userData.motion={m:"screen"})}),s}function Ag(s,e){const t=[];return s.traverse(n=>{const i=n.userData.motion;i&&(i.m==="screen"&&(n.material=n.material.clone(),n.material.emissive&&n.material.emissive.copy(n.material.color).lerp(new Je("#bff5dc"),.5)),t.push(n))}),t.length?{index:e,parts:t,act:0,grow:[]}:null}const Ka=s=>s<0?0:s>1?1:s,ki=s=>(s=Ka(s),s*s*(3-2*s));function Rg(s){return s<.72?s/.72:s>.86?(1-s)/.14:1}function Cg(s,e,t){const n=e.clock||0,i=Mg[s.index]||6,r=n/i%1,a=1-Math.exp(-t*4);s.act+=((e.act||0)-s.act)*a;const o=s.parts;for(let c=0;c<o.length;c++){const l=o[c],u=l.userData.motion;switch(u.m){case"plant":{const h=Rg((n/i+u.k*.23)%1),f=s.grow[u.k]=s.grow[u.k]===void 0?h:s.grow[u.k]+(h-s.grow[u.k])*a;l.scale.setScalar(.2+.8*ki(f)),l.userData.g=f,l.rotation.z=Math.sin(n*1.1+u.k*1.7)*.025;break}case"bud":{const h=ki((l.parent.userData.g-.55)/.35);l.scale.set(u.size[0]*h,u.size[1]*h,u.size[2]*h);break}case"sprout":{const h=(n/i+u.k*.17)%1,f=h>.9?1-(h-.9)/.1:ki(h/.8);l.scale.setScalar(.06+.94*f);break}case"trim":{const h=.1+.7*u.k/u.n,f=r>.92?(r-.92)/.08:1-Ka((r-h)/.06);l.scale.set(u.size[0]*f,u.size[1]*f,u.size[2]*f);break}case"fill":case"drain":{const h=(u.m==="fill"?u.from:.35)+(u.m==="fill"?u.span:.5)*u.k/u.n,f=r>.93?1-(r-.93)/.07:ki((r-h)/.05),p=u.m==="fill"?f:1-f;l.scale.set(u.size[0]*p,u.size[1]*p,u.size[2]*p);break}case"press":l.position.y=u.rest[1]-u.amp*Math.sin(Math.PI*Ka((r-.1)/.25));break;case"key":l.position.y=u.rest[1]-(Math.floor(n*6)%9===u.k*4%9?.006*s.act:0);break;case"handoff":{const h=Math.floor(n/i)%u.n===u.k,f=h?ki((r-.4)/.3):0,p=h?r<.85?ki((r-.6)/.2):1-ki((r-.85)/.15):0;l.position.y=u.rest[1]+(r<.85?.1*f:0),l.scale.setScalar(1-p);break}case"screen":l.material.emissiveIntensity=s.act*(.35+.08*Math.sin(n*23)+(Math.sin(n*3.1)>.96?.15:0));break}}}const Ya=96,Dl=160,Pg="#ffe6a8",Lg="#5c9e4d",Ua="#144d29",Dg="#edcc8f",Ig="#d6ecc0",Vc="#d9a441",Fg="#ffffff",Il=[34,62,90],Fr={x:16,y:130,w:64,h:16};function Ng(s,e){const t=Il.map((i,r)=>{const a=.1+r*.2;return s<a?0:s<a+.08?1:2}),n=s<.72?0:1+Math.floor(e*4)%2;return{rows:t,pay:n,key:t.join("")+n}}function Ug(s,e){s.fillStyle=Pg,s.fillRect(0,0,Ya,Dl),s.fillStyle=Ua,s.fillRect(0,0,Ya,20),Il.forEach((n,i)=>{const r=e?e.rows[i]:0;s.fillStyle=Lg,s.fillRect(8,n,22,22),s.fillStyle=r===2?Ig:r===1?Fg:Dg,s.fillRect(30,n,58,22),r&&(s.strokeStyle=Vc,s.lineWidth=2,s.strokeRect(9,n+1,78,20)),r===2&&(s.strokeStyle=Ua,s.lineWidth=3,s.beginPath(),s.moveTo(72,n+11),s.lineTo(77,n+16),s.lineTo(84,n+6),s.stroke())});const t=e?e.pay:0;s.fillStyle=t===2?"#f0c766":t?Vc:Ua,s.fillRect(Fr.x,Fr.y,Fr.w,Fr.h)}class Og extends vs{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Hg(t)}),this.register(function(t){return new Vg(t)}),this.register(function(t){return new Qg(t)}),this.register(function(t){return new $g(t)}),this.register(function(t){return new eb(t)}),this.register(function(t){return new Xg(t)}),this.register(function(t){return new jg(t)}),this.register(function(t){return new qg(t)}),this.register(function(t){return new Kg(t)}),this.register(function(t){return new Gg(t)}),this.register(function(t){return new Yg(t)}),this.register(function(t){return new Wg(t)}),this.register(function(t){return new Zg(t)}),this.register(function(t){return new Jg(t)}),this.register(function(t){return new kg(t)}),this.register(function(t){return new tb(t)}),this.register(function(t){return new nb(t)})}load(e,t,n,i){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=Gs.extractUrlBase(e);a=Gs.resolveURL(l,this.path)}else a=Gs.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Pl(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Fl){try{a[Pt.KHR_BINARY_GLTF]=new ib(e)}catch(h){i&&i(h);return}r=JSON.parse(a[Pt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new gb(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(h){case Pt.KHR_MATERIALS_UNLIT:a[h]=new zg;break;case Pt.KHR_DRACO_MESH_COMPRESSION:a[h]=new sb(r,this.dracoLoader);break;case Pt.KHR_TEXTURE_TRANSFORM:a[h]=new rb;break;case Pt.KHR_MESH_QUANTIZATION:a[h]=new ab;break;default:f.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function Bg(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const Pt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class kg{constructor(e){this.parser=e,this.name=Pt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const u=new Je(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],An);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new ja(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new qr(u),l.distance=h;break;case"spot":l=new Xm(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,mi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class zg{constructor(){this.name=Pt.KHR_MATERIALS_UNLIT}getMaterialType(){return pn}extendParams(e,t,n){const i=[];e.color=new Je(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],An),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Ot))}return Promise.all(i)}}class Gg{constructor(e){this.parser=e,this.name=Pt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Hg{constructor(e){this.parser=e,this.name=Pt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Oe(o,o)}return Promise.all(r)}}class Vg{constructor(e){this.parser=e,this.name=Pt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class Wg{constructor(e){this.parser=e,this.name=Pt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class Xg{constructor(e){this.parser=e,this.name=Pt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Je(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],An)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Ot)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class jg{constructor(e){this.parser=e,this.name=Pt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class qg{constructor(e){this.parser=e,this.name=Pt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Je().setRGB(o[0],o[1],o[2],An),Promise.all(r)}}class Kg{constructor(e){this.parser=e,this.name=Pt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Yg{constructor(e){this.parser=e,this.name=Pt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Je().setRGB(o[0],o[1],o[2],An),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,Ot)),Promise.all(r)}}class Jg{constructor(e){this.parser=e,this.name=Pt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class Zg{constructor(e){this.parser=e,this.name=Pt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class Qg{constructor(e){this.parser=e,this.name=Pt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class $g{constructor(e){this.parser=e,this.name=Pt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class eb{constructor(e){this.parser=e,this.name=Pt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class tb{constructor(e){this.name=Pt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=i.byteOffset||0,l=i.byteLength||0,u=i.count,h=i.byteStride,f=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,f,i.mode,i.filter).then(function(p){return p.buffer}):a.ready.then(function(){const p=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(p),u,h,f,i.mode,i.filter),p})})}else return null}}class nb{constructor(e){this.name=Pt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==Xn.TRIANGLES&&l.mode!==Xn.TRIANGLE_STRIP&&l.mode!==Xn.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,p=[];for(const g of h){const _=new rt,m=new N,d=new yn,x=new N(1,1,1),M=new zn(g.geometry,g.material,f);for(let b=0;b<f;b++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,b),c.ROTATION&&d.fromBufferAttribute(c.ROTATION,b),c.SCALE&&x.fromBufferAttribute(c.SCALE,b),M.setMatrixAt(b,_.compose(m,d,x));for(const b in c)if(b==="_COLOR_0"){const D=c[b];M.instanceColor=new Va(D.array,D.itemSize,D.normalized)}else b!=="TRANSLATION"&&b!=="ROTATION"&&b!=="SCALE"&&g.geometry.setAttribute(b,c[b]);Qt.prototype.copy.call(M,g),this.parser.assignFinalMaterial(M),p.push(M)}return u.isGroup?(u.clear(),u.add(...p),u):p[0]}))}}const Fl="glTF",Fs=12,Wc={JSON:1313821514,BIN:5130562};class ib{constructor(e){this.name=Pt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Fs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Fl)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Fs,r=new DataView(e,Fs);let a=0;for(;a<i;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===Wc.JSON){const l=new Uint8Array(e,Fs+a,o);this.content=n.decode(l)}else if(c===Wc.BIN){const l=Fs+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class sb{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Pt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const u in a){const h=Ja[u]||u.toLowerCase();o[h]=a[u]}for(const u in e.attributes){const h=Ja[u]||u.toLowerCase();if(a[u]!==void 0){const f=n.accessors[e.attributes[u]],p=hs[f.componentType];l[h]=p.name,c[h]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,f){i.decodeDracoFile(u,function(p){for(const g in p.attributes){const _=p.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}h(p)},o,l,An,f)})})}}class rb{constructor(){this.name=Pt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class ab{constructor(){this.name=Pt.KHR_MESH_QUANTIZATION}}class Nl extends Xs{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=i-t,h=(n-t)/u,f=h*h,p=f*h,g=e*l,_=g-l,m=-2*p+3*f,d=p-f,x=1-m,M=d-f+h;for(let b=0;b!==o;b++){const D=a[_+b+o],A=a[_+b+c]*u,E=a[g+b+o],w=a[g+b]*u;r[b]=x*D+M*A+m*E+d*w}return r}}const ob=new yn;class cb extends Nl{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return ob.fromArray(r).normalize().toArray(r),r}}const Xn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},hs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Xc={9728:1003,9729:1006,9984:1004,9985:1007,9986:1005,9987:1008},jc={33071:1001,33648:1002,10497:1e3},Oa={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ja={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},wi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},lb={CUBICSPLINE:void 0,LINEAR:2301,STEP:2300},Ba={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function hb(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Li({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),s.DefaultMaterial}function zi(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function mi(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function ub(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,u=e.length;l<u;l++){const h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];if(n){const f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):s.attributes.position;a.push(f)}if(i){const f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):s.attributes.normal;o.push(f)}if(r){const f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):s.attributes.color;c.push(f)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],f=l[2];return n&&(s.morphAttributes.position=u),i&&(s.morphAttributes.normal=h),r&&(s.morphAttributes.color=f),s.morphTargetsRelative=!0,s})}function fb(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function db(s){let e;const t=s.extensions&&s.extensions[Pt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ka(t.attributes):e=s.indices+":"+ka(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+ka(s.targets[n]);return e}function ka(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Za(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function pb(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const mb=new rt;class gb{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Bg,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new Ll(this.options.manager):this.textureLoader=new Km(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Pl(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return zi(r,o,i),mi(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,u]of a.children.entries())r(u,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Pt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,a){n.load(Gs.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=Oa[i.type],o=hs[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new Ht(l,a,c))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=Oa[i.type],l=hs[i.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=i.byteOffset||0,p=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(p&&p!==h){const d=Math.floor(f/p),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+d+":"+i.count;let M=t.cache.get(x);M||(_=new l(o,d*p,i.count*p/u),M=new pl(_,p/u),t.cache.add(x,M)),m=new Vs(M,c,f%p/u,g)}else o===null?_=new l(i.count*c):_=new l(o,f,i.count*c),m=new Ht(_,c,g);if(i.sparse!==void 0){const d=Oa.SCALAR,x=hs[i.sparse.indices.componentType],M=i.sparse.indices.byteOffset||0,b=i.sparse.values.byteOffset||0,D=new x(a[1],M,i.sparse.count*d),A=new l(a[2],b,i.sparse.count*c);o!==null&&(m=new Ht(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let E=0,w=D.length;E<w;E++){const y=D[E];if(m.setX(y,A[E*c]),c>=2&&m.setY(y,A[E*c+1]),c>=3&&m.setZ(y,A[E*c+2]),c>=4&&m.setW(y,A[E*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const f=(r.samplers||{})[a.sampler]||{};return u.magFilter=Xc[f.magFilter]||1006,u.minFilter=Xc[f.minFilter]||1008,u.wrapS=jc[f.wrapS]||1e3,u.wrapT=jc[f.wrapT]||1e3,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==1003&&u.minFilter!==1006,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=i.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(h){l=!0;const f=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(f),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(f,p){let g=f;t.isImageBitmapLoader===!0&&(g=function(_){const m=new an(_);m.needsUpdate=!0,f(m)}),t.load(Gs.resolveURL(h,r.path),g,void 0,p)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),mi(h,a),h.userData.mimeType=a.mimeType||pb(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Pt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Pt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[Pt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new xl,qn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new no,qn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Li}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let a;const o={},c=r.extensions||{},l=[];if(c[Pt.KHR_MATERIALS_UNLIT]){const h=i[Pt.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,r,t))}else{const h=r.pbrMetallicRoughness||{};if(o.color=new Je(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const f=h.baseColorFactor;o.color.setRGB(f[0],f[1],f[2],An),o.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",h.baseColorTexture,Ot)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=2);const u=r.alphaMode||Ba.OPAQUE;if(u===Ba.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Ba.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==pn&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Oe(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;o.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&a!==pn&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==pn){const h=r.emissiveFactor;o.emissive=new Je().setRGB(h[0],h[1],h[2],An)}return r.emissiveTexture!==void 0&&a!==pn&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Ot)),Promise.all(l).then(function(){const h=new a(o);return r.name&&(h.name=r.name),mi(h,r),t.associations.set(h,{materials:e}),r.extensions&&zi(i,h,r),h})}createUniqueName(e){const t=Gt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[Pt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return qc(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],u=db(l),h=i[u];if(h)a.push(h.promise);else{let f;l.extensions&&l.extensions[Pt.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=qc(new Wt,l,t),i[u]={primitive:l,promise:f},a.push(f)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const u=a[c].material===void 0?hb(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let p=0,g=u.length;p<g;p++){const _=u[p],m=a[p];let d;const x=l[p];if(m.mode===Xn.TRIANGLES||m.mode===Xn.TRIANGLE_STRIP||m.mode===Xn.TRIANGLE_FAN||m.mode===void 0)d=r.isSkinnedMesh===!0?new gm(_,x):new Ke(_,x),d.isSkinnedMesh===!0&&d.normalizeSkinWeights(),m.mode===Xn.TRIANGLE_STRIP?d.geometry=Bc(d.geometry,1):m.mode===Xn.TRIANGLE_FAN&&(d.geometry=Bc(d.geometry,2));else if(m.mode===Xn.LINES)d=new xm(_,x);else if(m.mode===Xn.LINE_STRIP)d=new Vr(_,x);else if(m.mode===Xn.LINE_LOOP)d=new vm(_,x);else if(m.mode===Xn.POINTS)d=new Mm(_,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(d.geometry.morphAttributes).length>0&&fb(d,r),d.name=t.createUniqueName(r.name||"mesh_"+e),mi(d,r),m.extensions&&zi(i,d,m),t.assignFinalMaterial(d),h.push(d)}for(let p=0,g=h.length;p<g;p++)t.associations.set(h[p],{meshes:e,primitives:p});if(h.length===1)return r.extensions&&zi(i,h[0],r),h[0];const f=new bt;r.extensions&&zi(i,f,r),t.associations.set(f,{meshes:e});for(let p=0,g=h.length;p<g;p++)f.add(h[p]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ln($l.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Gr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),mi(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),a=i,o=[],c=[];for(let l=0,u=a.length;l<u;l++){const h=a[l];if(h){o.push(h);const f=new rt;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new to(o,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let h=0,f=i.channels.length;h<f;h++){const p=i.channels[h],g=i.samplers[p.sampler],_=p.target,m=_.node,d=i.parameters!==void 0?i.parameters[g.input]:g.input,x=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",d)),c.push(this.getDependency("accessor",x)),l.push(g),u.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const f=h[0],p=h[1],g=h[2],_=h[3],m=h[4],d=[];for(let x=0,M=f.length;x<M;x++){const b=f[x],D=p[x],A=g[x],E=_[x],w=m[x];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();const y=n._createAnimationTracks(b,D,A,E,w);if(y)for(let v=0;v<y.length;v++)d.push(y[v])}return new Bm(r,void 0,d)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(p){p.isSkinnedMesh&&p.bind(f,mb)});for(let p=0,g=h.length;p<g;p++)u.add(h[p]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new bl:l.length>1?u=new bt:l.length===1?u=l[0]:u=new Qt,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=a),mi(u,r),r.extensions&&zi(n,u,r),r.matrix!==void 0){const h=new rt;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new bt;n.name&&(r.name=i.createUniqueName(n.name)),mi(r,n),n.extensions&&zi(t,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);const l=u=>{const h=new Map;for(const[f,p]of i.associations)(f instanceof qn||f instanceof an)&&h.set(f,p);return u.traverse(f=>{const p=i.associations.get(f);p!=null&&h.set(f,p)}),h};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){const a=[],o=e.name?e.name:e.uuid,c=[];wi[r.path]===wi.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(o);let l;switch(wi[r.path]){case wi.weights:l=ds;break;case wi.rotation:l=ps;break;case wi.position:case wi.scale:l=ms;break;default:switch(n.itemSize){case 1:l=ds;break;case 2:case 3:default:l=ms;break}break}const u=i.interpolation!==void 0?lb[i.interpolation]:2301,h=this._getArrayFromAccessor(n);for(let f=0,p=c.length;f<p;f++){const g=new l(c[f]+"."+wi[r.path],t.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Za(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ps?cb:Nl;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function bb(s,e,t){const n=e.attributes,i=new Mn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new N(c[0],c[1],c[2]),new N(l[0],l[1],l[2])),o.normalized){const u=Za(hs[o.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new N,c=new N;for(let l=0,u=r.length;l<u;l++){const h=r[l];if(h.POSITION!==void 0){const f=t.json.accessors[h.POSITION],p=f.min,g=f.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),f.normalized){const _=Za(hs[f.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;const a=new ii;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function qc(s,e,t){const n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(const a in n){const o=Ja[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){const a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return Lt.workingColorSpace!==An&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Lt.workingColorSpace}" not supported.`),mi(s,e),bb(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?ub(s,e.targets,t):s})}var _b=(function(){var s="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var i=WebAssembly.validate(t)?e:s,r,a=WebAssembly.instantiate(o(i),{}).then(function(d){r=d.instance,r.exports.__wasm_call_ctors()});function o(d){for(var x=new Uint8Array(d.length),M=0;M<d.length;++M){var b=d.charCodeAt(M);x[M]=b>96?b-97:b>64?b-39:b+4}for(var D=0,M=0;M<d.length;++M)x[D++]=x[M]<60?n[x[M]]:(x[M]-60)*64+x[++M];return x.buffer.slice(0,D)}function c(d,x,M,b,D,A){var E=r.exports.sbrk,w=M+3&-4,y=E(w*b),v=E(D.length),F=new Uint8Array(r.exports.memory.buffer);F.set(D,v);var B=d(y,M,b,v,D.length);if(B==0&&A&&A(y,w,b),x.set(F.subarray(y,y+M*b)),E(y-E(0)),B!=0)throw new Error("Malformed buffer data: "+B)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},u={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},h=[],f=0;function p(d){var x={object:new Worker(d),pending:0,requests:{}};return x.object.onmessage=function(M){var b=M.data;x.pending-=b.count,x.requests[b.id][b.action](b.value),delete x.requests[b.id]},x}function g(d){for(var x="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(o(i))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+c.toString()+m.toString(),M=new Blob([x],{type:"text/javascript"}),b=URL.createObjectURL(M),D=0;D<d;++D)h[D]=p(b);URL.revokeObjectURL(b)}function _(d,x,M,b,D){for(var A=h[0],E=1;E<h.length;++E)h[E].pending<A.pending&&(A=h[E]);return new Promise(function(w,y){var v=new Uint8Array(M),F=f++;A.pending+=d,A.requests[F]={resolve:w,reject:y},A.object.postMessage({id:F,count:d,size:x,source:v,mode:b,filter:D},[v.buffer])})}function m(d){a.then(function(){var x=d.data;try{var M=new Uint8Array(x.count*x.size);c(r.exports[x.mode],M,x.count,x.size,x.source,r.exports[x.filter]),self.postMessage({id:x.id,count:x.count,action:"resolve",value:M},[M.buffer])}catch(b){self.postMessage({id:x.id,count:x.count,action:"reject",value:b})}})}return{ready:a,supported:!0,useWorkers:function(d){g(d)},decodeVertexBuffer:function(d,x,M,b,D){c(r.exports.meshopt_decodeVertexBuffer,d,x,M,b,r.exports[l[D]])},decodeIndexBuffer:function(d,x,M,b){c(r.exports.meshopt_decodeIndexBuffer,d,x,M,b)},decodeIndexSequence:function(d,x,M,b){c(r.exports.meshopt_decodeIndexSequence,d,x,M,b)},decodeGltfBuffer:function(d,x,M,b,D,A){c(r.exports[u[D]],d,x,M,b,r.exports[l[A]])},decodeGltfBufferAsync:function(d,x,M,b,D){return h.length>0?_(d,x,M,u[b],l[D]):a.then(function(){var A=new Uint8Array(d*x);return c(r.exports[u[b]],A,d,x,M,r.exports[l[D]]),A})}}})();const za=1.69,Kc=160,Ga=32,Yc="#fff1d6",Jc="#fffaf0",Zc="#b8ad94";function Eb(s,e){let t;try{t=new dm({canvas:s,antialias:!0,alpha:!1,powerPreference:"high-performance"}),t.localClippingEnabled=!0}catch{return null}if(!t.getContext())return null;let n=0;const i=Cl,r=(P,q,K)=>{n=K-q};i.onStart=i.onProgress=r,t.outputColorSpace=Ot,t.shadowMap.enabled=!0,t.shadowMap.type=2;const a=new Je().setRGB(e.haze.colour[0]/255,e.haze.colour[1]/255,e.haze.colour[2]/255,Ot),o=new lc;o.background=a.clone();const c=Uc(),l=new bt;l.scale.y=bn,o.add(l);const u=new Rc(Jc,Zc,1.55);o.add(u);const h=new ja(Yc,2.1),f=e.sun.reach,p=new N(-e.sun.x*f,1/bn,-e.sun.z*f).normalize();h.castShadow=!0,h.shadow.mapSize.set(2048,2048),h.shadow.bias=-4e-4,h.shadow.normalBias=.03,Object.assign(h.shadow.camera,{left:-44,right:44,top:44,bottom:-44,near:1,far:260}),o.add(h,h.target);const g={hazeColour:{value:a},hazeX:{value:new Dt(...e.haze.ramp.west,...e.haze.ramp.east)},hazeZ:{value:new Dt(...e.haze.ramp.north,...e.haze.ramp.south)}},_=new Map;function m(P,q={}){const K=P+JSON.stringify(q);if(_.has(K))return _.get(K);const oe=d(P,q);return _.set(K,oe),oe}function d(P,q={}){return x(new Dn({color:P,...q}))}function x(P){return P.onBeforeCompile=q=>{Object.assign(q.uniforms,g),q.vertexShader=`varying vec3 vHazeWorld;
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
        #include <dithering_fragment>`)},P.customProgramCacheKey=()=>"haze",P}const M={},b=new Ll;function D(P){const q=(e.floorTextures||{})[P];return q?(M[P]||(M[P]=b.load(new URL(q.url,document.baseURI).href),M[P].colorSpace=Ot,M[P].wrapS=M[P].wrapT=1e3,M[P].anisotropy=8),{base:M[P],size:q.size}):null}function A(P,q){const K=D(q);if(!K)return P;const oe=K.base.clone(),re=P.scale.x,Se=P.scale.z;return oe.repeat.set(re/K.size,Se/K.size),oe.offset.set((P.position.x-re/2)/K.size,-(P.position.z+Se/2)/K.size),P.material=d("#ffffff",{map:oe}),P}const E=new Yt(1,1,1).translate(0,.5,0);function w(P,q,K,oe,re,Se,Pe,Ue,{cast:nt=!0,receive:V=!0,opts:L}={}){const ue=new Ke(E,m(Ue,L));return ue.position.set(q,K,oe),ue.scale.set(re,Se,Pe),ue.castShadow=nt,ue.receiveShadow=V,P.add(ue),ue}function y(P,q,K,oe,re,Se,Pe,Ue,nt){return w(P,(q+K)/2,oe,(Se+Pe)/2,Math.max(.001,K-q),Math.max(.001,re-oe),Math.max(.001,Pe-Se),Ue,nt)}const v=new Og().setMeshoptDecoder(_b),F=v.load.bind(v),B=[];let k=0;function Q(){k=0;const P=performance.now()+6;do{const q=B.shift();try{q()}catch(K){console.warn("3D map: model setup failed",K)}}while(B.length&&performance.now()<P);B.length&&(k=requestAnimationFrame(Q))}v.load=(P,q,K,oe)=>F(P,re=>{re.scene.userData.file=P.split("/").pop(),B.push(()=>q(re)),k||(k=requestAnimationFrame(Q))},K,oe);function ie(P,q,K,oe,re,Se=l){v.load(e.modelBase+P,Pe=>{ye(Pe.scene);const Ue=new bt;Ue.add(Pe.scene),Ue.scale.set(za,za/bn,za),Ue.position.set(q,K,oe),Se.add(Ue),re&&re(Pe.scene,Ue),Vi(Pe.scene)},void 0,Pe=>console.warn("3D map: could not load "+P,Pe))}const U=[],ee=xb(l,e,{box:w,span:y,material:m,textured:A,lampStandIns:U});Mb(l,e,{box:w,span:y,material:m,textured:A,model:ie});const Z=yb(o,l,e.transport,{box:w,material:m}),fe=ag(l,e,{box:w,span:y,material:m,model:ie}),$=dg(l,e,{box:w,span:y,material:m});gg(l,e,{span:y,model:ie});let te=0;const Ae=[],We=new Ke(new lo(.86,1,48).rotateX(-Math.PI/2),new pn({color:"#e2c68a",transparent:!0,opacity:.85,depthWrite:!1}));We.renderOrder=2,l.add(We);const ce=["#d8cfbd","#b8cdb2","#9cc4b8","#e2c68a"];function _e(P){if(!Ae[P]){const q=new bt,K=w(q,0,0,0,1,1,1,ce[1]),oe=w(q,0,1,0,1,.08,1,"#efe7d4");q.userData={body:K,top:oe},l.add(q),Ae[P]=q}return Ae[P]}const De={};function ye(P){P.traverse(q=>{if(!q.isMesh)return;q.castShadow=q.receiveShadow=!0;const K=q.material;K&&K.transmission>0&&(q.material=new Li({color:K.color,roughness:.1,metalness:0,transparent:!0,opacity:.28,depthWrite:!1}),q.castShadow=!1)})}$&&$.loadModels(v,e.modelBase);const Ye={},it=[],ht=[],_t={};(e.fixtures||[]).forEach(P=>{v.load(e.modelBase+P.file,q=>{ye(q.scene),(P.hide||[]).forEach(oe=>{const re=q.scene.getObjectByName(oe);re&&(re.visible=!1)}),P.glow&&q.scene.traverse(oe=>{const re=oe.isMesh&&oe.material;re&&re.name===P.glow&&!it.includes(re)&&(re.emissive.set("#ffe3b0"),it.push(re))}),P.screen&&q.scene.traverse(oe=>{const re=oe.isMesh&&oe.material;re&&re.name===P.screen&&!ht.includes(re)&&(re.emissive.set("#ffffff"),re.emissiveMap=re.map,re.needsUpdate=!0,ht.push(re))}),P.menu&&q.scene.traverse(oe=>{const re=oe.isMesh&&oe.material;re&&re.name===P.screen&&!_t[P.key]&&(_t[P.key]=ft(re))}),Vi(q.scene);const K=new bt;K.add(q.scene),K.scale.set(P.scale,P.scale/bn,P.scale),K.position.set(P.x,P.y,P.z),K.visible=!1,l.add(K),Ye[P.key]=K},void 0,q=>console.warn("3D map: could not load "+P.file,q))});function ft(P){const q=document.createElement("canvas");q.width=Ya,q.height=Dl;const K=new $n(q);return K.flipY=!1,K.colorSpace=Ot,K.magFilter=1003,{material:P,base:P.map,texture:K,ctx:q.getContext("2d"),key:""}}function xt(P,q,K){const oe=P.material,re=q!=null&&q>=0;if(re){const Pe=Ng(q,K);Pe.key!==P.key&&(Ug(P.ctx,Pe),P.texture.needsUpdate=!0,P.key=Pe.key)}const Se=re?P.texture:P.base;oe.map!==Se&&(oe.map=oe.emissiveMap=Se),re&&(oe.emissiveIntensity+=.15)}const W={};function kt(P){const q=(e.stationModels||{})[P];!q||W[P]||(W[P]=!0,v.load(e.modelBase+q,K=>{const oe=K.scene,re=new Mn().setFromObject(oe),Se=re.getSize(new N),Pe=re.getCenter(new N),Ue=e.stationModelSize[P]||{w:Se.x+Se.z,ox:0},nt=Ue.w/((Se.x+Se.z)*Math.SQRT1_2);oe.position.set(-Pe.x,-re.min.y,-Pe.z),ye(oe),wg(oe,+P.split(".")[0]),Vi(oe);const V=new bt;V.add(oe),V.scale.set(nt,nt/bn,nt),V.position.set(Ue.ox*Math.SQRT1_2,0,-Ue.ox*Math.SQRT1_2),Ue.turn&&(V.rotation.y=Ue.turn),De[P]=V},void 0,K=>console.warn("3D map: could not load "+q,K)))}const ct={},at=Uc(),st=new lc;st.add(new Rc(Jc,Zc,1.7));const wt=new ja(Yc,2.1);wt.position.copy(p).multiplyScalar(50),st.add(wt);function Qe(P){return ct[P]?ct[P]:De[P]?ct[P]=Y(De[P].clone(),480,600):(kt(P),null)}function I(P,q){P=Math.min(8,Math.max(1,P||1));const K="lounge."+P+"."+(q?2:1);if(ct[K])return ct[K];const oe=$&&$.pictureCopy(P,q);return oe?ct[K]=Y(oe,600,480):null}function S(P){if(ct["fixture."+P])return ct["fixture."+P];if(!Ye[P])return null;const q=Ye[P].clone();return q.visible=!0,ct["fixture."+P]=Y(q,600,480)}function Y(P,q,K){const oe=new bt;oe.scale.y=bn,oe.add(P),st.add(oe),oe.updateMatrixWorld(!0);const re=new Mn().setFromObject(oe),Se=[];for(let se=0;se<8;se++)Se.push(new N(se&1?re.max.x:re.min.x,se&2?re.max.y:re.min.y,se&4?re.max.z:re.min.z));at.updateMatrixWorld(!0);const Pe=at.matrixWorldInverse,Ue=[],nt=[];Se.forEach(se=>{se.applyMatrix4(Pe),Ue.push(se.x),nt.push(se.y)});const V=(Math.min(...Ue)+Math.max(...Ue))/2,L=(Math.min(...nt)+Math.max(...nt))/2,ue=Math.max((Math.max(...Ue)-Math.min(...Ue))/2/q*K,(Math.max(...nt)-Math.min(...nt))/2)*1.04;at.left=V-ue*q/K,at.right=V+ue*q/K,at.top=L+ue,at.bottom=L-ue,at.updateProjectionMatrix();const R=new Ci(q,K,{samples:4});R.texture.colorSpace=Ot;const C=t.getClearColor(new Je),O=t.getClearAlpha(),J=t.shadowMap.enabled;t.shadowMap.enabled=!1,t.setRenderTarget(R),t.setClearColor(0,0),t.clear(),t.render(st,at);const le=new Uint8Array(q*K*4);t.readRenderTargetPixels(R,0,0,q,K,le),t.setRenderTarget(null),t.setClearColor(C,O),t.shadowMap.enabled=J,R.dispose(),st.remove(oe);const pe=document.createElement("canvas");pe.width=q,pe.height=K;const ve=pe.getContext("2d"),ge=ve.createImageData(q,K);for(let se=0;se<K;se++)ge.data.set(le.subarray((K-1-se)*q*4,(K-se)*q*4),se*q*4);return ve.putImageData(ge,0,0),pe}const be=new oo(.24,1.55,4,10).translate(0,1.03,0),de=new zn(be,m("#ffffff",{name:"people"}),Kc);de.castShadow=!0,de.count=0;const he=new Map,Ge=[],we=new Ht(new Uint16Array([0,1,2,0,2,3]),1),Ne=8e3;let vt=0,z=0;function je(P){let q=he.get(P);return q||(q=new an(P),q.colorSpace=Ot,q.anisotropy=4,q.needsUpdate=!0,he.set(P,q)),q.userData.used=z,q}function et(){z-vt<2e3||(vt=z,he.forEach((P,q)=>{z-P.userData.used>Ne&&(P.dispose(),he.delete(q))}))}const $e=[];function He(P){if(!$e[P]){const q=new Wt;q.setAttribute("position",new Ht(new Float32Array(12),3)),q.setAttribute("uv",new Ht(new Float32Array(8),2)),q.setIndex(we);const K=new Ke(q,x(new pn({alphaTest:.5,side:2,depthTest:!1,depthWrite:!1})));K.frustumCulled=!1,K.renderOrder=-1,l.add(K),$e[P]=K}return $e[P]}function yt(P){if(!Ge[P]){const q=new Wt;q.setAttribute("position",new Ht(new Float32Array(12),3)),q.setAttribute("uv",new Ht(new Float32Array(8),2)),q.setIndex(we);const K=new Ke(q,x(new pn({alphaTest:.5,side:2})));K.frustumCulled=!1,l.add(K),Ge[P]=K}return Ge[P]}const gt=[],It=[];function G(P,q,K){const oe=new Wt;oe.setAttribute("position",new Ht(new Float32Array(12),3)),oe.setAttribute("uv",new Ht(new Float32Array(8),2)),oe.setIndex(we);const re={alphaTest:.5,side:2},Se=x(q?new Dn({...re,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}):new pn(re)),Pe=new Ke(oe,Se);return Pe.visible=!1,Pe.frustumCulled=!1,Pe.receiveShadow=q,l.add(Pe),b.load(new URL(P,document.baseURI).href,Ue=>{Ue.colorSpace=Ot,Ue.anisotropy=8;const[nt,V]=K(Ue.image);oe.attributes.position.array.set(nt),oe.attributes.position.needsUpdate=!0,oe.attributes.uv.array.set(V),oe.attributes.uv.needsUpdate=!0,oe.computeVertexNormals(),Se.map=Ue,Se.needsUpdate=!0,Pe.userData.ready=!0},void 0,()=>console.warn("3D map: could not load "+P)),Pe}(e.wallFaces||[]).forEach(P=>{const q=G(P.url,!1,()=>[[P.x0,P.y0,P.z0,P.x1,P.y0,P.z1,P.x1,P.y0+P.h,P.z1,P.x0,P.y0+P.h,P.z0],[0,0,1,0,1,1,0,1]]);q.userData.model=P.model,gt.push(q)}),(e.decals||[]).forEach(P=>{const q=G(P.url,!0,K=>{const oe=P.pixels?P.image.map(([le,pe])=>[le/K.naturalWidth,pe/K.naturalHeight]):P.image,[re,Se,Pe]=oe,[Ue,nt,V]=P.world,L=Se[0]-re[0],ue=Pe[0]-re[0],R=Se[1]-re[1],C=Pe[1]-re[1],O=L*C-ue*R,J=(le,pe)=>{const ve=le-re[0],ge=pe-re[1],se=(C*ve-ue*ge)/O,Me=(L*ge-R*ve)/O;return[Ue[0]+(nt[0]-Ue[0])*se+(V[0]-Ue[0])*Me,.012,Ue[1]+(nt[1]-Ue[1])*se+(V[1]-Ue[1])*Me]};return[[...J(0,1),...J(1,1),...J(1,0),...J(0,0)],[0,0,1,0,1,1,0,1]]});q.userData.show=P.show,It.push(q)}),(e.casters||[]).forEach(P=>w(l,P.x,0,P.z,P.w,P.h,P.d,"#ffffff",{receive:!1,opts:{name:"street"}}));const Re=new bt;l.add(Re);let ae="";function xe(P){Re.children.forEach(K=>K.geometry.dispose()),Re.clear();const q=new Set;P.forEach(K=>{const oe=new ro(K.points.map(Se=>new N(Se[0],Se[1],Se[2]))),re=new Ke(new Ws(oe,20,.045,8,!1),m(K.colour));re.castShadow=!0,Re.add(re),[K.points[0],K.points[K.points.length-1]].forEach(Se=>{const Pe=Se[0].toFixed(2)+","+Se[2].toFixed(2);if(q.has(Pe))return;q.add(Pe);const Ue=new Ke(E.clone(),m("#ffffff",{name:"street"}));Ue.position.set(Se[0],0,Se[2]),Ue.scale.set(.07,1,.07),Ue.castShadow=!0,Re.add(Ue)})})}de.instanceMatrix.setUsage(35048),l.add(de);const Ce=new zn(E,m("#ffffff",{name:"street"}),Ga),Ie=new zn(E,m("#dfe8ea",{name:"street"}),Ga);[Ce,Ie].forEach(P=>{P.castShadow=!0,P.count=0,P.instanceMatrix.setUsage(35048),l.add(P)});const Ve=1.69,Bt=new N(0,0,1),Xt=new yn,St={},$t=[];Object.entries(e.carModels||{}).forEach(([P,q])=>v.load(e.modelBase+q,K=>{ye(K.scene),Vi(K.scene);const oe=K.scene.getObjectByName("WheelFL");St[P]={scene:K.scene,radius:oe?new Mn().setFromObject(oe).getSize(new N).y/2:.25}},void 0,K=>console.warn("3D map: could not load "+q,K)));const en=160,fn={},In={},tn=new Set;function Rn(P){P.updateMatrixWorld(!0);const q=new Map;P.traverse(oe=>{if(!oe.isMesh)return;let re=oe.geometry.index?oe.geometry.toNonIndexed():oe.geometry.clone();re.applyMatrix4(oe.matrixWorld),oe.matrixWorld.determinant()<0&&Object.values(re.attributes).forEach(Se=>{for(let Pe=0;Pe<Se.count;Pe+=3)for(let Ue=0;Ue<Se.itemSize;Ue++){const nt=Se.getComponent(Pe+1,Ue);Se.setComponent(Pe+1,Ue,Se.getComponent(Pe+2,Ue)),Se.setComponent(Pe+2,Ue,nt)}}),Object.keys(re.attributes).forEach(Se=>{Se!=="position"&&Se!=="normal"&&Se!=="uv"&&Se!=="color"&&re.deleteAttribute(Se)}),re.attributes.normal||re.computeVertexNormals(),q.has(oe.material)||q.set(oe.material,[]),q.get(oe.material).push(re)});const K=[...q].map(([oe,re])=>{["uv","color"].forEach(Pe=>{re.some(Ue=>!Ue.attributes[Pe])&&re.forEach(Ue=>Ue.deleteAttribute(Pe))}),/Paint$/.test(oe.name)&&(oe.userData.paint=oe.color.clone(),oe.color.set("#ffffff"));const Se=new zn(po(re),x(oe),en);return Se.count=0,Se.castShadow=Se.receiveShadow=!0,Se.frustumCulled=!1,Se.userData.file=P.userData.file,Se.userData.prop=!0,l.add(Se),Se});return K.box=new Mn().setFromObject(P),K}function Cn(P){if(!In[P]){In[P]=!0;const[q,K]=P.split("#");v.load(e.modelBase+q,oe=>{if(ye(oe.scene),K==="low"||K==="lawn"){const re=[],Se=K==="low"?/^(Crown|Trunk)/:/^Pit/;oe.scene.traverse(Pe=>{Se.test(Pe.name)&&re.push(Pe)}),re.forEach(Pe=>Pe.parent&&Pe.parent.remove(Pe))}oe.scene.traverse(re=>{re.isMesh&&(re.material.name==="LampGlow"&&tn.add(re.material),re.material.metalness>.5&&(re.material.metalness=.35,re.material.roughness=Math.max(.35,re.material.roughness)))}),fn[P]=Rn(oe.scene)},void 0,oe=>console.warn("3D map: could not load "+P,oe))}return!!fn[P]}const Fn=new N(Ve,Ve/bn,Ve),mn=new yn,oi=new N(0,1,0),nn=new N;function Hn(P,q){Object.values(fn).forEach(K=>K.forEach(oe=>{oe.count=0})),(P||[]).forEach(K=>{const oe=fn[K.file];if(!(!oe||oe[0].count>=en)){if(mn.setFromAxisAngle(oi,K.rot||0),Ct.set(K.x,K.y===void 0?e.plazaY:K.y,K.z),Array.isArray(K.scale))on.compose(Ct,mn,nn.set(Fn.x*K.scale[0],Fn.y*K.scale[1],Fn.z*K.scale[2]));else if(K.scale)on.compose(Ct,mn,nn.copy(Fn).multiplyScalar(K.scale));else if(K.fit){const re=oe.box,Se=K.fit.w/(re.max.x-re.min.x),Pe=K.fit.d/(re.max.z-re.min.z);Ct.x-=(re.min.x+re.max.x)/2*Se,Ct.z-=(re.min.z+re.max.z)/2*Pe,on.compose(Ct,mn,nn.set(Se,Se/bn,Pe))}else on.compose(Ct,mn,Fn);oe.forEach(re=>{re.material.userData.paint&&re.setColorAt(re.count,K.tint?ne.set(K.tint):re.material.userData.paint),re.setMatrixAt(re.count++,on)})}}),Object.values(fn).forEach(K=>K.forEach(oe=>{oe.instanceMatrix.needsUpdate=!0,oe.instanceColor&&(oe.instanceColor.needsUpdate=!0),oe.visible=oe.count>0})),tn.forEach(K=>{K.emissive.set("#ffd9a0"),K.emissiveIntensity=q*2.5})}const Kn=()=>!!e.carModels&&Object.keys(e.carModels).every(P=>St[P]);function Ze(P,q){const K=q.van?"van":"car",oe=St[K];let re=$t[P];if(re&&re.kind===K&&re.paint===q.paint)return re;re&&l.remove(re.holder);const Se=new bt,Pe=oe.scene.clone(!0);Pe.traverse(nt=>{nt.isMesh&&/Paint$/.test(nt.material.name)&&(nt.material=nt.material.clone(),nt.material.color.set(q.paint))}),Se.add(Pe),Se.scale.set(Ve,Ve/bn,Ve),l.add(Se);const Ue=["WheelFL","WheelFR","WheelBL","WheelBR"].map(nt=>Pe.getObjectByName(nt)).filter(Boolean).map(nt=>({w:nt,rest:nt.quaternion.clone()}));return $t[P]={kind:K,paint:q.paint,holder:Se,wheels:Ue,radius:oe.radius}}const on=new rt,Ct=new N,T=new N,X=new yn,ne=new Je,H=u.intensity,j=h.intensity,Ee=new Je("#2b3a48"),me=a.clone();let Be=!1;s.addEventListener("webglcontextlost",P=>{P.preventDefault(),Be=!0}),s.addEventListener("webglcontextrestored",()=>{Be=!1});let qe=1;const ot=(P,q)=>{const K=q.geometry,oe=K.attributes.position,re=K.attributes.uv,[Se,Pe,Ue,nt]=P.uv;oe.array.set(P.points),oe.needsUpdate=!0,re.array.set([Se,Pe,Ue,Pe,Ue,nt,Se,nt]),re.needsUpdate=!0;const V=q.material,L=je(P.img),ue=P.alpha<1;V.map!==L&&(V.map||(V.needsUpdate=!0),V.map=L),V.transparent!==ue&&(V.transparent=ue,V.needsUpdate=!0),V.opacity=P.alpha,V.color.setScalar(qe),q.visible=!0};function tt(P,q){qe=1-q*.55,P.forEach((K,oe)=>ot(K,yt(oe)));for(let K=P.length;K<Ge.length;K++)Ge[K].visible=!1}function Te(P,q){z=performance.now(),et();const K=Math.min(P.dpr,2);t.getPixelRatio()!==K&&t.setPixelRatio(K);const oe=t.getSize(new Oe);(oe.x!==P.width||oe.y!==P.height)&&t.setSize(P.width,P.height,!1),og(c,P);const re=P.lookAt||{x:0,z:0};h.target.position.set(re.x,0,re.z),h.position.copy(h.target.position).addScaledVector(p,120),h.target.updateMatrixWorld();const Se=P.night||0;return u.intensity=H*(1-Se*.72),h.intensity=j*(1-Se*.9),o.background.copy(q).lerp(Ee,Se),g.hazeColour.value.copy(o.background),Se}const dt=vg(l),ut=[],Mt=new Je,jt={},pt=[g.hazeX.value.clone(),g.hazeZ.value.clone()];let Xe=!1,lt=null;function mt(P){if(P!==Xe){if(Xe=P,P){const q=new Set([l,u,h,h.target,dt.group,...Ge]);[...o.children,...l.children].forEach(K=>{!q.has(K)&&!K.userData.prop&&!K.userData.land&&K.visible&&(K.visible=!1,ut.push(K))}),$e.forEach(K=>{K.visible=!1})}else ut.forEach(q=>{q.visible=!0}),ut.length=0,lt&&(lt.visible=!1),lt=null,g.hazeX.value.copy(pt[0]),g.hazeZ.value.copy(pt[1]);dt.group.visible=P}}const Ft=90,gn=2,qt=13;function Sn(P,[q,K,oe,re]){const Se=[];return P.forEach(([Pe,Ue,nt,V])=>{if(q>=Ue||K<=Pe||oe>=V||re<=nt){Se.push([Pe,Ue,nt,V]);return}oe>nt&&Se.push([Pe,Ue,nt,oe]),re<V&&Se.push([Pe,Ue,re,V]);const L=Math.max(nt,oe),ue=Math.min(V,re);q>Pe&&Se.push([Pe,q,L,ue]),K<Ue&&Se.push([K,Ue,L,ue])}),Se}function Nt(P){const q=new bt,[K,oe,re,Se]=P.plot,Pe=(K+oe)/2,Ue=(re+Se)/2,nt=Ft;q.userData.land=!0;let V=Sn([[Pe-nt,Pe+nt,Ue-nt,Ue+nt]],P.plot);const L=P.strips||[],ue=L.map(C=>[C.x0===void 0?Pe-nt:C.x0,C.x1===void 0?Pe+nt:C.x1,C.z0===void 0?Ue-nt:C.z0,C.z1===void 0?Ue+nt:C.z1]);ue.forEach(C=>{V=Sn(V,C)}),V.forEach(([C,O,J,le])=>y(q,C,O,P.y-1.2,P.y,J,le,P.colour,{cast:!1})),L.forEach((C,O)=>Sn([ue[O]],P.plot).forEach(([J,le,pe,ve])=>y(q,J,le,P.y-1.2,C.y,pe,ve,C.colour,{cast:!1})));const R=[];if(P.trees){let C=7;const O=()=>(C=C*16807%2147483647)/2147483647;for(let J=0;J<64;J++){const le=J%4,pe=le===1||le===3,ve=O(),ge=pe?7.5+O()*4:2+O()*8,se=le===0?K-ge:le===1?oe+ge:K-8+ve*(oe-K+16),Me=le===2?re-ge:le===3?Se+ge:re-8+ve*(Se-re+16);se>K-1.5&&se<oe+1.5&&Me>re-1.5&&Me<Se+1.5||se>oe&&Me>Se-4||Me>Se&&se>oe-4||ue.some(([ke,Le,Fe,At])=>se>ke-1.6&&se<Le+1.6&&Me>Fe-1.6&&Me<At+1.6)||R.push({file:J%3?"tree.glb#lawn":"street_tree.glb#lawn",x:se,y:P.y,z:Me,rot:O()*6.28,scale:(pe?.6:.75)+O()*.35})}}if(P.town){const C=["building_rowhouse_terracotta","building_townhouse_sage","building_low_stone","building_mid_stone","building_apartment_brick","building_shop_narrow","building_low_tan","building_corner"];let O=0;for(let J=K+4;J<oe+4;J+=10.5)R.push({file:C[O++%C.length]+".glb",x:J,y:P.y,z:re-6.5,rot:0});for(let J=re+2;J<Se+2;J+=10.5)R.push({file:C[O++%C.length]+".glb",x:K-6.5,y:P.y,z:J,rot:Math.PI/2});R.push({file:"building_corner.glb",x:K-6.5,y:P.y,z:re-6.5,rot:Math.PI/4})}return q.userData.props=R,q.userData.haze=[new Dt(K-gn,K-qt,oe+gn,oe+qt),new Dt(re-gn,re-qt,Se+gn,Se+qt)],l.add(q),q}function Ut(P){if(Be)return!1;mt(!0);const q=P.land?jt[P.landKey]||(jt[P.landKey]=Nt(P.land)):null;q!==lt&&(lt&&(lt.visible=!1),lt=q,lt&&(lt.visible=!0,g.hazeX.value.copy(lt.userData.haze[0]),g.hazeZ.value.copy(lt.userData.haze[1])));const K=Te(P,lt?me:Mt.set(P.background));dt.update(P.branch,K);const oe=(P.branch.props||[]).concat(lt?lt.userData.props:[]);return oe.forEach(re=>Cn(re.file)),Hn(oe,K),tt(P.figures||[],K),P.dry||t.render(o,c),!0}function _n(P){if(Be)return!1;mt(!1);const q=Te(P,me),K=performance.now(),oe=Math.min(.1,(K-(te||K))/1e3);te=K;let re=!1;P.stations.forEach((L,ue)=>{const R=_e(ue),{body:C,top:O}=R.userData;if(R.visible=L.visible!==!1,!R.visible)return;const J=L.index+"."+Math.max(1,L.tier);L.built&&(kt(J),kt(L.index+".3"));const le=De[J]?J:L.index+".3",pe=L.built&&L.index!==void 0&&De[le],ve=R.userData.clones||(R.userData.clones={}),ge=R.userData.rigs||(R.userData.rigs={});pe&&!ve[le]&&(R.add(ve[le]=pe.clone()),ge[le]=Ag(ve[le],L.index)),pe&&ge[le]&&Cg(ge[le],L,oe),Object.entries(ve).forEach(([At,Jt])=>{Jt.visible=!!pe&&At===le}),C.visible=!pe;const se=L.built?L.h:.12,Me=L.rise?-L.rise*L.rise*1.1:0;R.position.set(L.x,L.y+Me,L.z);const ke=L.pop===void 0?1:L.pop,Le=ke-1,Fe=ke>=1?1:1+2.4*Le*Le*Le+1.4*Le*Le;if(R.scale.setScalar(Math.max(.001,Fe)),ke<=0&&(R.visible=!1),C.scale.set(L.w,se,L.d),O.visible=L.built&&!pe,O.position.y=se,O.scale.set(L.w+.12,.08,L.d+.12),C.material=m(L.built?ce[Math.min(3,L.tier)]:"#e3b04b"),L.selected&&!re&&ke>=1){re=!0,We.position.set(L.x,L.y+.03,L.z);const At=Math.max(L.w,L.d)*.72;We.scale.set(At,1,At)}}),We.visible=re;const Se=P.figures||[],Pe=1-q*.55;tt(Se,q),gt.forEach(L=>{L.visible=!!L.userData.ready&&!(L.userData.model&&Ye[L.userData.model]),L.material.color.setScalar(Pe)}),It.forEach(L=>{L.visible=L.userData.ready&&(L.userData.show!=="loungeOpen"||!!P.loungeOpen)});const Ue=JSON.stringify(P.ropes||[]);Ue!==ae&&(ae=Ue,xe(P.ropes||[]));const nt=P.backdrops||[];nt.forEach((L,ue)=>ot(L,He(ue)));for(let L=nt.length;L<$e.length;L++)$e[L].visible=!1;ee.forEach(L=>{L.visible=!fn[L.userData.model],L.renderOrder=P.backdrops?-2:0,L.material.colorWrite=!P.backdrops}),de.material.colorWrite=de.material.depthWrite=!P.figures,_.forEach((L,ue)=>{ue.endsWith('{"name":"street"}')&&(L.colorWrite=L.depthWrite=!P.figures)}),de.count=Math.min(Kc,P.people.length);for(let L=0;L<de.count;L++){const ue=P.people[L];Ct.set(ue.x,ue.y||0,ue.z),T.set(1,1,1),on.compose(Ct,X.identity(),T),de.setMatrixAt(L,on),de.setColorAt(L,ne.set(ue.colour))}de.instanceMatrix.needsUpdate=!0,de.instanceColor&&(de.instanceColor.needsUpdate=!0),Hn(P.props,q),it.forEach(L=>{L.emissiveIntensity=.16+q*.7}),ht.forEach(L=>{L.emissiveIntensity=.35+q*.55}),Object.entries(_t).forEach(([L,ue])=>xt(ue,P.menus?P.menus[L]:null,P.time||0)),U.forEach(L=>{L.visible=!fn["street_lamp.glb"]});const V=Kn();P.cars.forEach((L,ue)=>{if(!V)return;const R=Ze(ue,L),C=L.along==="x";R.holder.visible=!0,R.holder.position.set(L.x,e.streetY,L.z),R.holder.rotation.y=C?L.dir>0?0:Math.PI:L.dir>0?-Math.PI/2:Math.PI/2,Xt.setFromAxisAngle(Bt,-L.roll/(R.radius*Ve)),R.wheels.forEach(({w:O,rest:J})=>O.quaternion.multiplyQuaternions(Xt,J))});for(let L=V?P.cars.length:0;L<$t.length;L++)$t[L]&&($t[L].holder.visible=!1);Ce.count=Ie.count=V?0:Math.min(Ga,P.cars.length);for(let L=0;L<Ce.count;L++){const ue=P.cars[L],R=ue.along==="x",C=ue.van,O=C?4.6:4,J=1.8;Ct.set(ue.x,e.streetY+.25,ue.z),T.set(R?O:J,C?1.7:.75,R?J:O),Ce.setMatrixAt(L,on.compose(Ct,X.identity(),T)),Ce.setColorAt(L,ne.set(ue.paint)),Ct.y+=C?1.7:.75,T.set(R?C?1.4:2.1:J*.86,C?.05:.55,R?J*.86:C?1.4:2.1),Ie.setMatrixAt(L,on.compose(Ct,X.identity(),T))}return[Ce,Ie].forEach(L=>{L.instanceMatrix.needsUpdate=!0,L.instanceColor&&(L.instanceColor.needsUpdate=!0)}),Z&&P.cargo&&Z.update(P.cargo,P.fixtures),fe&&fe.update(P),$&&$.update(P),Object.entries(Ye).forEach(([L,ue])=>{ue.visible=!!(P.fixtures&&P.fixtures[L])}),P.dry||t.render(o,c),!0}function cn(P){const q=t.info,K=new Set,oe=new Set,re={};let Se=0,Pe=0;o.traverse(O=>{if(!O.isMesh)return;Se++;let J=!0,le=null;for(let pe=O;pe;pe=pe.parent)pe.visible||(J=!1),!le&&pe.userData.file&&(le=pe.userData.file);if(J&&(Pe++,P)){const pe=re[le||"(code)"]=re[le||"(code)"]||{meshes:0,triangles:0},ve=O.geometry;pe.meshes++,pe.triangles+=(ve.index?ve.index.count:ve.attributes.position.count)/3*(O.isInstancedMesh?O.count:1)}K.add(O.geometry),(Array.isArray(O.material)?O.material:[O.material]).forEach(pe=>{for(const ve in pe)pe[ve]&&pe[ve].isTexture&&oe.add(pe[ve].source)})});let Ue=0,nt=0;K.forEach(O=>{Object.values(O.attributes).forEach(J=>{Ue+=J.array.byteLength}),O.index&&(Ue+=O.index.array.byteLength)}),o.traverse(O=>{O.isInstancedMesh&&(Ue+=O.instanceMatrix.array.byteLength+(O.instanceColor?O.instanceColor.array.byteLength:0))}),oe.forEach(O=>{const J=O.data;J&&J.width&&(nt+=J.width*J.height*4*4/3)});const V=t.getDrawingBufferSize(new Oe),L=h.shadow.mapSize,ue=V.x*V.y*4*(t.getContext().getContextAttributes().antialias?9:2),R=t.shadowMap.enabled?L.x*L.y*8:0,C=O=>Math.round(O/1048576*10)/10;return{calls:q.render.calls,triangles:q.render.triangles,meshes:Se,visible:Pe,programs:q.programs?q.programs.length:0,geometries:q.memory.geometries,textures:q.memory.textures,pixelRatio:t.getPixelRatio(),buffer:V.x+"x"+V.y,mb:{geometry:C(Ue),texture:C(nt),buffer:C(ue),shadow:C(R),total:C(Ue+nt+ue+R)},...P?{models:re}:{}}}return{render:_n,renderBranch:Ut,carsModelled:Kn,propReady:Cn,hasFixture:P=>!!Ye[P],stationPicture:Qe,loungePicture:I,fixturePicture:S,stats:cn,get ok(){return!Be},get loading(){return n+B.length},dispose(){cancelAnimationFrame(k),B.length=0,t.dispose(),_.forEach(P=>P.dispose())}}}function xb(s,e,{box:t,span:n,material:i,textured:r,lampStandIns:a}){const{roads:o,roadWidth:c,plazaY:l,streetY:u,extent:h}=e,f=e.holes||[],p=(w,y,v,F,B,k,Q,ie)=>{let U=[[w,y,B,k]];f.forEach(ee=>{U=U.flatMap(([Z,fe,$,te])=>{if(ee.x0>=fe||ee.x1<=Z||ee.z0>=te||ee.z1<=$)return[[Z,fe,$,te]];const Ae=Math.max(Z,ee.x0),We=Math.min(fe,ee.x1);return[[Z,Ae,$,te],[We,fe,$,te],[Ae,We,$,Math.max($,ee.z0)],[Ae,We,Math.min(te,ee.z1),te]].filter(([ce,_e,De,ye])=>_e-ce>1e-6&&ye-De>1e-6)})}),U.forEach(([ee,Z,fe,$])=>r(n(s,ee,Z,v,F,fe,$,Q,{cast:!1}),ie))};p(-h,h,u-.4,u,-h,h,e.colours.asphalt,"asphalt");const g=w=>{const y=o.filter(B=>B.along===w).map(B=>B.at).sort((B,k)=>B-k),v=[];let F=-h;return y.forEach(B=>{v.push([F,B-c/2]),F=B+c/2}),v.push([F,h]),v},_=g("x");g("z").forEach(([w,y])=>_.forEach(([v,F])=>p(w,y,u,l,v,F,e.colours.paver,"sidewalk")));const d={};(e.marks||[]).forEach(w=>(d[w.colour]=d[w.colour]||[]).push(w));const x=new rt,M=new N,b=new N,D=new yn;Object.entries(d).forEach(([w,y])=>{const v=/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/.exec(w),F=v?i("#"+[1,2,3].map(k=>(+v[k]).toString(16).padStart(2,"0")).join(""),{transparent:!0,opacity:+v[4],depthWrite:!1}):i(w),B=new zn(new Yt(1,1,1).translate(0,.5,0),F,y.length);y.forEach((k,Q)=>B.setMatrixAt(Q,x.compose(M.set((k.x0+k.x1)/2,k.h?k.y:k.y-.004,(k.z0+k.z1)/2),D,b.set(k.x1-k.x0,k.h||.012,k.z1-k.z0)))),B.receiveShadow=!0,s.add(B)});const A=[];e.buildings.forEach(w=>{const y=n(s,w.x0,w.x1,l,w.h,w.z0,w.z1,w.wall,{opts:{name:"terrace"}}),v=n(s,w.x0-.15,w.x1+.15,w.h,w.h+.35,w.z0-.15,w.z1+.15,w.roof,{opts:{name:"terrace"}});y.userData.model=v.userData.model=w.model,A.push(y,v)}),s.add(vb(e.silhouettes||[],l,i));const E=new Bn(1.6,1);return e.trees.forEach(([w,y])=>{t(s,w,l,y,.35,2.2,.35,"#7a5a3e",{opts:{name:"street"}});const v=new Ke(E,i("#7fa35a",{name:"street"}));v.position.set(w,l+3.6,y),v.scale.set(1,.8,1),v.castShadow=v.receiveShadow=!0,s.add(v)}),e.lamps.forEach(([w,y])=>{a.push(t(s,w,l,y,.18,4.4,.18,"#3b4a43",{opts:{name:"street"}})),a.push(t(s,w,l+4.3,y,.5,.3,.5,"#f1e3b6",{opts:{name:"street"}}))}),A}function vb(s,e,t){const n=[],i=[],r=[],a=new Je,o=new Je,c=new Je("#e6dcc6"),l=(m,d,x,M,b,D)=>{[m,d,x,m,x,M].forEach(A=>{n.push(...A),i.push(...b),r.push(D.r,D.g,D.b)})},u=(m,d,x,M,b,D,A)=>{l([m,M,D],[d,M,D],[d,M,b],[m,M,b],[0,1,0],A),l([m,x,D],[d,x,D],[d,M,D],[m,M,D],[0,0,1],A),l([d,x,D],[d,x,b],[d,M,b],[d,M,D],[1,0,0],A),l([d,x,b],[m,x,b],[m,M,b],[d,M,b],[0,0,-1],A),l([m,x,b],[m,x,D],[m,M,D],[m,M,b],[-1,0,0],A)},h=1.69/bn,f=2.75*h,p=2.45*h;s.forEach(m=>{a.set(m.colour).convertSRGBToLinear(),o.copy(a).multiplyScalar(.62);const d=e+f+(m.storeys-1)*p+.35*h;u(m.x0,m.x1,e,d,m.z0,m.z1,a),u(m.x0-.12,m.x1+.12,d,d+.3,m.z0-.12,m.z1+.12,c);for(let x=0;x<m.storeys;x++){const M=e+(x?f+(x-1)*p:0)+(x?.9:.5)*h,b=M+(x?1.1:1.7)*h;l([m.x0+.5,M,m.z1+.03],[m.x1-.5,M,m.z1+.03],[m.x1-.5,b,m.z1+.03],[m.x0+.5,b,m.z1+.03],[0,0,1],o),l([m.x1+.03,M,m.z1-.5],[m.x1+.03,M,m.z0+.5],[m.x1+.03,b,m.z0+.5],[m.x1+.03,b,m.z1-.5],[1,0,0],o)}});const g=new Wt;g.setAttribute("position",new Rt(n,3)),g.setAttribute("normal",new Rt(i,3)),g.setAttribute("color",new Rt(r,3));const _=new Ke(g,t("#ffffff",{vertexColors:!0,name:"silhouette"}));return _.receiveShadow=!0,_.castShadow=!1,_}function Mb(s,e,{box:t,span:n,material:i,textured:r,model:a}){const o=new bt;s.add(o),e.floors.forEach((_,m)=>{const d=(_.x||0)-_.w/2,x=(_.x||0)+_.w/2,M=_.z-_.d/2,b=_.z+_.d/2;r(n(o,d,x,_.y-(m?.32:.02),_.y,M,b,m===2?"#e9e4d8":m?"#e4ddcc":"#c9965f",{cast:m>0}),["herringbone","timber","concrete"][m]),m&&(n(o,d,x,_.y,_.y+1.05,b-.06,b,"#c9a35a",{opts:{transparent:!0,opacity:.55}}),(m===1?[d+.3,x-.3]:[d+.3,0,x-.3]).forEach(D=>t(o,D,e.floors[m-1].y,b-.3,.3,_.y-e.floors[m-1].y-.32,.3,"#33372f")))});const c=(_,m,d,x,M,b,D,A,E,w)=>{const y=[];for(let F=0;F<=48;F++){const B=F/48,k=M+(b-M)*B;y.push(new N(m+Math.cos(k)*x,(D+(A-D)*B)*bn,d+Math.sin(k)*x))}const v=new Ke(new Ws(new ro(y),96,E,8,!1),i(w));v.castShadow=!0,_.add(v)},l=(_,m,d,x,M,b)=>{const D=new bt,A=new bt;A.scale.y=1/bn,D.add(A),o.add(D),a("spiral_stair.glb",_,d,m,()=>{D.visible=!1});const E=1.15,w=Math.PI*24/180,y=(x-d)/M,v=Q=>b+(M-1-Q)*w;t(D,_,d,m,.26,x-d+1,.26,"#1f5a3c"),t(D,_,d,m,.56,.06,.56,"#d0a54e",{cast:!1});const F=new Ke(new gi(.13,16,10),i("#d0a54e"));F.position.set(_,x+1.05,m),F.castShadow=!0,D.add(F);for(let Q=0;Q<M-1;Q++){const ie=v(Q),U=d+y*(Q+1),ee=w*1.04,Z=new Ke(new Zt(E,E,.08,6,1,!1,Math.PI/2-ie-ee/2,ee),i("#d9a768"));Z.position.set(_,U-.04,m),Z.castShadow=Z.receiveShadow=!0,D.add(Z);const fe=ie-w/2;t(D,_+Math.cos(fe)*(E-.06),U,m+Math.sin(fe)*(E-.06),.05,.95,.05,"#1f5a3c",{cast:!1})}const B=v(0)+w/2,k=v(M-2)-w/2;c(A,_,m,E-.06,B,k,d+1,x-y+1,.05,"#d0a54e"),c(A,_,m,E-.02,B,k,d+y-.14,x-.14,.09,"#1f5a3c")},[,u,h]=e.floors,f=-Math.PI/2,p=(_,m,d,x,M)=>n(o,_,m,M,M+1.05,d,x,"#c9a35a",{opts:{transparent:!0,opacity:.55}});l(10.2,.35,0,u.y,14,f),r(n(o,8.93,11.35,u.y-.32,u.y,-2.8,-.8,"#e4ddcc",{cast:!0}),"timber"),p(11.29,11.35,-2.8,-.8,u.y),l(7.75,-4.4,u.y,h.y,14,f),r(n(o,6.45,9,h.y-.32,h.y,-6.9,-5.55,"#e9e4d8",{cast:!0}),"concrete"),p(8.94,9,-6.9,-5.55,h.y);const g=e.marquee;e.wallFaces||(n(o,g.x-.13,g.x+.13,0,.9,g.zRear,g.zFront,"#1f6b47"),n(o,g.x-.04,g.x+.04,.9,g.y0,g.zRear,g.zFront,"#cfe3dc",{cast:!1,opts:{transparent:!0,opacity:.35}}),n(o,g.x-.16,g.x+.16,g.y0,g.y1,g.zRear,g.zFront,"#1f6b47"),[g.zRear,g.zFront].forEach(_=>t(o,g.x,0,_,.34,g.y1,.34,"#174f36")))}function yb(s,e,t,{box:n,material:i}){if(!t)return null;const r=bn,a=t.bore/2,o=new Li({color:"#cfeee2",emissive:"#2f5a4a",emissiveIntensity:.25,roughness:.08,metalness:0,transparent:!0,opacity:.46,depthWrite:!1}),c=new Li({color:"#d0a54e",roughness:.3,metalness:.9}),l=(E,w,y)=>E.map((v,F)=>v+(w[F]-v)*y);function u(E){const w=[E[0]],y=.48;for(let v=1;v<E.length-1;v++){const F=E[v-1],B=E[v],k=E[v+1],Q=l(B,F,Math.min(.4,y/Math.hypot(...F.map((U,ee)=>U-B[ee])))),ie=l(B,k,Math.min(.4,y/Math.hypot(...k.map((U,ee)=>U-B[ee]))));w.push(Q);for(let U=1;U<=8;U++){const ee=U/8;w.push(Q.map((Z,fe)=>(1-ee)*(1-ee)*Z+2*(1-ee)*ee*B[fe]+ee*ee*ie[fe]))}}return w.push(E[E.length-1]),w}const h=E=>new N(E[0],E[1]*r,E[2]),f=(E,w,y,v,F)=>{const B=new Ke(new Xr(y,v,10,32),F);return B.position.copy(h(E)),B.lookAt(B.position.clone().add(w)),B.castShadow=!0,s.add(B),B},p=t.tubes.map(E=>{const w=u(E.points),y=new wl;for(let ie=1;ie<w.length;ie++)y.add(new yl(h(w[ie-1]),h(w[ie])));const v=new Ke(new Ws(y,Math.max(24,w.length*3),a,18,!1),o);v.renderOrder=3,s.add(v);const F=[v];[[E.points[0],E.points[1]],[E.points[E.points.length-1],E.points[E.points.length-2]]].forEach(([ie,U],ee)=>{ee===0&&E.noCap0||F.push(f(ie,h(ie).sub(h(U)).normalize(),a+.02,.07,c))}),(E.floorRings||[]).forEach(ie=>F.push(f(ie,new N(0,1,0),a+.1,.08,c)));const k=[];let Q=0;for(let ie=1;ie<w.length;ie++){const U=Math.hypot(w[ie][0]-w[ie-1][0],w[ie][1]-w[ie-1][1],w[ie][2]-w[ie-1][2]);k.push({a:w[ie-1],b:w[ie],len:U}),Q+=U}return{tube:E,segments:k,total:Q,parts:F}}),g=t.belts.map(E=>{const w=Math.abs(E.x2-E.x1),y=(E.x1+E.x2)/2;return[E.x1,E.x2].forEach(v=>n(e,v-Math.sign(E.x2-E.x1)*.25*(v===E.x1?-1:1),E.floor,E.z,.12,E.height-.1,.5,"#344a40")),n(e,y,E.floor+E.height-.18,E.z,w,.16,E.width,"#536c5b"),n(e,y,E.floor+E.height-.02,E.z,w-.1,.04,E.width-.2,"#2a4035",{cast:!1}),E}),_=Sb(),m=_.map(E=>{const w=new zn(E.geometry,new Dn({vertexColors:!0}),32);return w.castShadow=!0,w.count=0,w.renderOrder=2,w.frustumCulled=!1,w.instanceMatrix.setUsage(35048),s.add(w),w}),d=new rt,x=new yn,M=new N(0,1,0),b=new N,D=new N(1,1,1);function A(E,w,y,v,F){const B=Math.min(v,_.length-1),k=m[B];k.count>=32||(x.setFromAxisAngle(M,F),k.setMatrixAt(k.count++,d.compose(b.set(E,w*r,y),x,D)))}return{update({odo:E,running:w},y={}){m.forEach(v=>{v.count=0}),p.forEach(({tube:v,segments:F,total:B,parts:k})=>{const Q=!v.fixture||!!y[v.fixture];if(k.forEach($=>{$.visible=Q}),!Q)return;const ie=v.window?v.window.total:B,U=v.window?v.window.offset:0,ee=Math.max(2,Math.round(ie/t.gap)),Z=ie/ee,fe=w[v.stage]?E:0;for(let $=0;$<ee;$++){let te=(fe+$*Z)%ie-U;if(!(te<0||te>=B))for(const Ae of F){if(te>Ae.len){te-=Ae.len;continue}const We=l(Ae.a,Ae.b,te/Ae.len);A(We[0],We[1]-_[v.cargoStage].height/2/r,We[2],v.cargoStage,$*2.1);break}}}),g.forEach(v=>{const F=Math.abs(v.x2-v.x1),B=Math.max(2,Math.round(F/t.gap)),k=w[v.stage]?E:0,Q=Math.sign(v.x2-v.x1);for(let ie=0;ie<B;ie++)A(v.x1+Q*((k+ie*F/B)%F),v.floor+v.height+.02,v.z,v.stage,ie*2.1)}),m.forEach(v=>{v.instanceMatrix.needsUpdate=!0})}}}function Sb(){const s=[],e=(a,o,c=0,l=0,u=0,{sx:h=1,sy:f=1,sz:p=1,rx:g=0,ry:_=0,rz:m=0}={})=>{const d=a.index?a.toNonIndexed():a;d.deleteAttribute("uv"),d.scale(h,f,p),d.rotateX(g),d.rotateZ(m),d.rotateY(_),d.translate(c,l,u);const x=new Je(o),M=d.attributes.position.count,b=new Float32Array(M*3);for(let D=0;D<M;D++)b[D*3]=x.r,b[D*3+1]=x.g,b[D*3+2]=x.b;d.setAttribute("color",new Ht(b,3)),s.push(d)},t=()=>{const a=po(s.splice(0));return a.computeBoundingBox(),{geometry:a,height:a.boundingBox.max.y}},n=(a,o,c,l,u,h=.5)=>e(new gi(1,7,4),a,Math.cos(o)*c,l,-Math.sin(o)*c,{sx:u,sy:u*.16,sz:u*.38,rz:h,ry:o}),i=(a,o)=>{e(new Zt(a,a*.78,o,12),"#b8673f",0,o/2),e(new Zt(a*1.08,a*1.08,o*.18,12),"#c97a50",0,o*.91),e(new Zt(a*.92,a*.92,.012,12),"#4a3424",0,o*.97)},r=[];return i(.1,.13),e(new Zt(.012,.014,.14,5),"#5b8a3c",0,.2),[[0,.22],[Math.PI,.23],[Math.PI/2,.28],[-Math.PI/2,.29]].forEach(([a,o],c)=>n(c<2?"#7fb552":"#a6d073",a,.06,o,.065)),r.push(t()),i(.12,.15),e(new Zt(.016,.02,.34,6),"#4f7a35",0,.32),[.24,.32,.4].forEach((a,o)=>{for(let c=0;c<5;c++){const l=c*1.257+o*.6,u=.1-o*.02;n(o%2?"#4f8a3a":"#3f7a33",l,u,a,.1-o*.015,.35)}}),[[0,.47,0,.07],[.07,.4,.03,.05],[-.06,.41,-.04,.05]].forEach(([a,o,c,l])=>{e(new Bn(l,1),"#9fc06c",a,o,c,{sy:1.7}),e(new Bn(l*.45,0),"#d99a55",a+l*.4,o+l*.5,c+l*.3)}),r.push(t()),e(new Yt(.42,.03,.3),"#c9a46a",0,.015),[[-.1,.04,"#86a85c"],[.1,-.03,"#7a9c52"],[0,.02,"#93b465"]].forEach(([a,o,c],l)=>{const u=l===2?.095:.085,h=.03+u*1.1+(l===2?.04:0);e(new Bn(u,1),c,a,h,o,{sy:1.25,ry:l}),e(new Bn(u*.3,0),"#d68f4a",a+u*.55,h+u*.4,o+u*.4),e(new Bn(u*.25,0),"#e0a560",a-u*.4,h+u*.7,o-u*.5)}),r.push(t()),e(new Zt(.13,.13,.3,14),"#a9cdb3",0,.15),e(new Zt(.14,.14,.07,14),"#d2b25e",0,.335),e(new Yt(.14,.12,.02),"#f3efda",0,.14,.125),r.push(t()),e(new Yt(.32,.38,.2),"#d9bd88",0,.19),e(new Yt(.33,.05,.21),"#bf9f68",0,.36),[-.06,.06].forEach(a=>e(new Xr(.07,.01,5,10,Math.PI),"#8a6e44",0,.385,a)),e(new Yt(.16,.14,.01),"#496f50",0,.2,.101),e(new Yt(.06,.06,.01),"#e7dcbc",0,.2,.106),r.push(t()),e(new Yt(.38,.26,.3),"#c49a5e",0,.13),e(new Yt(.08,.012,.31),"#e6d6ad",0,.262),[-1,1].forEach(a=>e(new Yt(.08,.12,.01),"#e6d6ad",0,.2,a*.151)),e(new Yt(.12,.09,.01),"#496f50",.1,.13,.152),r.push(t()),r}export{Eb as createMap3D};
