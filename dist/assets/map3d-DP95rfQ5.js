/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const jo="attached",yh="detached";const qt="srgb",Hn="srgb-linear",ga="linear",an="srgb";const qo="300 es";class gs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const Bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ko=1234567;const ur=Math.PI/180,zs=180/Math.PI;function vi(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Bn[s&255]+Bn[s>>8&255]+Bn[s>>16&255]+Bn[s>>24&255]+"-"+Bn[e&255]+Bn[e>>8&255]+"-"+Bn[e>>16&15|64]+Bn[e>>24&255]+"-"+Bn[t&63|128]+Bn[t>>8&255]+"-"+Bn[t>>16&255]+Bn[t>>24&255]+Bn[n&255]+Bn[n>>8&255]+Bn[n>>16&255]+Bn[n>>24&255]).toLowerCase()}function wn(s,e,t){return Math.max(e,Math.min(t,s))}function Lo(s,e){return(s%e+e)%e}function Mh(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Sh(s,e,t){return s!==e?(t-s)/(e-s):0}function dr(s,e,t){return(1-t)*s+t*e}function Eh(s,e,t,n){return dr(s,e,1-Math.exp(-t*n))}function Ah(s,e=1){return e-Math.abs(Lo(s,e*2)-e)}function wh(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Th(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Rh(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Ch(s,e){return s+Math.random()*(e-s)}function Ph(s){return s*(.5-Math.random())}function Lh(s){s!==void 0&&(Ko=s);let e=Ko+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ih(s){return s*ur}function Dh(s){return s*zs}function Fh(s){return(s&s-1)===0&&s!==0}function Nh(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Uh(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Oh(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":s.set(o*u,c*h,c*d,o*l);break;case"YZY":s.set(c*d,o*u,c*h,o*l);break;case"ZXZ":s.set(c*h,c*d,o*u,o*l);break;case"XZX":s.set(o*u,c*g,c*f,o*l);break;case"YXY":s.set(c*f,o*u,c*g,o*l);break;case"ZYZ":s.set(c*g,c*f,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function _i(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function tn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Bh={DEG2RAD:ur,RAD2DEG:zs,generateUUID:vi,clamp:wn,euclideanModulo:Lo,mapLinear:Mh,inverseLerp:Sh,lerp:dr,damp:Eh,pingpong:Ah,smoothstep:wh,smootherstep:Th,randInt:Rh,randFloat:Ch,randFloatSpread:Ph,seededRandom:Lh,degToRad:Ih,radToDeg:Dh,isPowerOfTwo:Fh,ceilPowerOfTwo:Nh,floorPowerOfTwo:Uh,setQuaternionFromProperEuler:Oh,normalize:tn,denormalize:_i};class He{constructor(e=0,t=0){He.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(wn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Dt{constructor(e,t,n,i,r,a,o,c,l){Dt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],b=i[0],m=i[3],p=i[6],x=i[1],y=i[4],_=i[7],P=i[2],w=i[5],C=i[8];return r[0]=a*b+o*x+c*P,r[3]=a*m+o*y+c*w,r[6]=a*p+o*_+c*C,r[1]=l*b+u*x+h*P,r[4]=l*m+u*y+h*w,r[7]=l*p+u*_+h*C,r[2]=d*b+f*x+g*P,r[5]=d*m+f*y+g*w,r[8]=d*p+f*_+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+i*r*l-i*a*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,d=o*c-u*r,f=l*r-a*c,g=t*h+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/g;return e[0]=h*b,e[1]=(i*l-u*n)*b,e[2]=(o*n-i*a)*b,e[3]=d*b,e[4]=(u*t-i*c)*b,e[5]=(i*r-o*t)*b,e[6]=f*b,e[7]=(n*c-l*t)*b,e[8]=(a*t-n*r)*b,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Aa.makeScale(e,t)),this}rotate(e){return this.premultiply(Aa.makeRotation(-e)),this}translate(e,t){return this.premultiply(Aa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Aa=new Dt;function Cl(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function _r(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function kh(){const s=_r("canvas");return s.style.display="block",s}const Yo={};function lr(s){s in Yo||(Yo[s]=!0,console.warn(s))}function zh(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Gh(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Hh(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Xt={enabled:!0,workingColorSpace:Hn,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===an&&(s.r=Bi(s.r),s.g=Bi(s.g),s.b=Bi(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===an&&(s.r=Bs(s.r),s.g=Bs(s.g),s.b=Bs(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===""?ga:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Bi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Bs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Jo=[.64,.33,.3,.6,.15,.06],Zo=[.2126,.7152,.0722],Qo=[.3127,.329],$o=new Dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ec=new Dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Xt.define({[Hn]:{primaries:Jo,whitePoint:Qo,transfer:ga,toXYZ:$o,fromXYZ:ec,luminanceCoefficients:Zo,workingColorSpaceConfig:{unpackColorSpace:qt},outputColorSpaceConfig:{drawingBufferColorSpace:qt}},[qt]:{primaries:Jo,whitePoint:Qo,transfer:an,toXYZ:$o,fromXYZ:ec,luminanceCoefficients:Zo,outputColorSpaceConfig:{drawingBufferColorSpace:qt}}});let bs;class Vh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{bs===void 0&&(bs=_r("canvas")),bs.width=e.width,bs.height=e.height;const n=bs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=bs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=_r("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Bi(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Bi(t[n]/255)*255):t[n]=Bi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Wh=0;class Pl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=vi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(wa(i[a].image)):r.push(wa(i[a]))}else r=wa(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function wa(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Vh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Xh=0;class Sn extends gs{constructor(e=Sn.DEFAULT_IMAGE,t=Sn.DEFAULT_MAPPING,n=1001,i=1001,r=1006,a=1008,o=1023,c=1009,l=Sn.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xh++}),this.uuid=vi(),this.name="",this.source=new Pl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new He(0,0),this.repeat=new He(1,1),this.center=new He(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Sn.DEFAULT_IMAGE=null;Sn.DEFAULT_MAPPING=300;Sn.DEFAULT_ANISOTROPY=1;class jt{constructor(e=0,t=0,n=0,i=1){jt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const c=e.elements,l=c[0],u=c[4],h=c[8],d=c[1],f=c[5],g=c[9],b=c[2],m=c[6],p=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-b)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+b)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,_=(f+1)/2,P=(p+1)/2,w=(u+d)/4,C=(h+b)/4,S=(g+m)/4;return y>_&&y>P?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=w/n,r=C/n):_>P?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=w/i,r=S/i):P<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(P),n=C/r,i=S/r),this.set(n,i,r,t),this}let x=Math.sqrt((m-g)*(m-g)+(h-b)*(h-b)+(d-u)*(d-u));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(h-b)/x,this.z=(d-u)/x,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class jh extends gs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new jt(0,0,e,t),this.scissorTest=!1,this.viewport=new jt(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Sn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Pl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ts extends jh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ll extends Sn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class qh extends Sn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Tn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3];const d=r[a+0],f=r[a+1],g=r[a+2],b=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=b;return}if(h!==b||c!==d||l!==f||u!==g){let m=1-o;const p=c*d+l*f+u*g+h*b,x=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const P=Math.sqrt(y),w=Math.atan2(P,p*x);m=Math.sin(m*w)/P,o=Math.sin(o*w)/P}const _=o*x;if(c=c*m+d*_,l=l*m+f*_,u=u*m+g*_,h=h*m+b*_,m===1-o){const P=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=P,l*=P,u*=P,h*=P}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+u*h+c*f-l*d,e[t+1]=c*g+u*d+l*h-o*f,e[t+2]=l*g+u*f+o*d-c*h,e[t+3]=u*g-o*h-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(i/2),h=o(r/2),d=c(n/2),f=c(i/2),g=c(r/2);switch(a){case"XYZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"YZX":this._x=d*u*h+l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h-d*f*g;break;case"XZY":this._x=d*u*h-l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(a-i)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-c)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+l)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-l)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-i)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(wn(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+i*l-r*c,this._y=i*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-i*o,this._w=a*u-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-t)*u)/l,d=Math.sin(t*u)/l;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=i*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,n=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(tc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(tc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),u=2*(o*t-r*i),h=2*(r*n-a*t);return this.x=t+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=i+c*h+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ta.copy(this).projectOnVector(e),this.sub(Ta)}reflect(e){return this.sub(Ta.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(wn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ta=new F,tc=new Tn;class On{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(pi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(pi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=pi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,pi):pi.fromBufferAttribute(r,a),pi.applyMatrix4(e.matrixWorld),this.expandByPoint(pi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Cr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Cr.copy(n.boundingBox)),Cr.applyMatrix4(e.matrixWorld),this.union(Cr)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,pi),pi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Js),Pr.subVectors(this.max,Js),vs.subVectors(e.a,Js),xs.subVectors(e.b,Js),ys.subVectors(e.c,Js),Hi.subVectors(xs,vs),Vi.subVectors(ys,xs),is.subVectors(vs,ys);let t=[0,-Hi.z,Hi.y,0,-Vi.z,Vi.y,0,-is.z,is.y,Hi.z,0,-Hi.x,Vi.z,0,-Vi.x,is.z,0,-is.x,-Hi.y,Hi.x,0,-Vi.y,Vi.x,0,-is.y,is.x,0];return!Ra(t,vs,xs,ys,Pr)||(t=[1,0,0,0,1,0,0,0,1],!Ra(t,vs,xs,ys,Pr))?!1:(Lr.crossVectors(Hi,Vi),t=[Lr.x,Lr.y,Lr.z],Ra(t,vs,xs,ys,Pr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,pi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(pi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ci),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ci=[new F,new F,new F,new F,new F,new F,new F,new F],pi=new F,Cr=new On,vs=new F,xs=new F,ys=new F,Hi=new F,Vi=new F,is=new F,Js=new F,Pr=new F,Lr=new F,ss=new F;function Ra(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){ss.fromArray(s,r);const o=i.x*Math.abs(ss.x)+i.y*Math.abs(ss.y)+i.z*Math.abs(ss.z),c=e.dot(ss),l=t.dot(ss),u=n.dot(ss);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Kh=new On,Zs=new F,Ca=new F;class Ai{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Kh.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Zs.subVectors(e,this.center);const t=Zs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Zs,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ca.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Zs.copy(e.center).add(Ca)),this.expandByPoint(Zs.copy(e.center).sub(Ca))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Pi=new F,Pa=new F,Ir=new F,Wi=new F,La=new F,Dr=new F,Ia=new F;class _a{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Pi.copy(this.origin).addScaledVector(this.direction,t),Pi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Pa.copy(e).add(t).multiplyScalar(.5),Ir.copy(t).sub(e).normalize(),Wi.copy(this.origin).sub(Pa);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ir),o=Wi.dot(this.direction),c=-Wi.dot(Ir),l=Wi.lengthSq(),u=Math.abs(1-a*a);let h,d,f,g;if(u>0)if(h=a*c-o,d=a*o-c,g=r*u,h>=0)if(d>=-g)if(d<=g){const b=1/u;h*=b,d*=b,f=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d<=-g?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l):d<=g?(h=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Pa).addScaledVector(Ir,d),f}intersectSphere(e,t){Pi.subVectors(e.center,this.origin);const n=Pi.dot(this.direction),i=Pi.dot(Pi)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Pi)!==null}intersectTriangle(e,t,n,i,r){La.subVectors(t,e),Dr.subVectors(n,e),Ia.crossVectors(La,Dr);let a=this.direction.dot(Ia),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Wi.subVectors(this.origin,e);const c=o*this.direction.dot(Dr.crossVectors(Wi,Dr));if(c<0)return null;const l=o*this.direction.dot(La.cross(Wi));if(l<0||c+l>a)return null;const u=-o*Wi.dot(Ia);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class lt{constructor(e,t,n,i,r,a,o,c,l,u,h,d,f,g,b,m){lt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,u,h,d,f,g,b,m)}set(e,t,n,i,r,a,o,c,l,u,h,d,f,g,b,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=g,p[11]=b,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new lt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Ms.setFromMatrixColumn(e,0).length(),r=1/Ms.setFromMatrixColumn(e,1).length(),a=1/Ms.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=a*u,f=a*h,g=o*u,b=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=f+g*l,t[5]=d-b*l,t[9]=-o*c,t[2]=b-d*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*u,f=c*h,g=l*u,b=l*h;t[0]=d+b*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-g,t[6]=b+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*u,f=c*h,g=l*u,b=l*h;t[0]=d-b*o,t[4]=-a*h,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*u,t[9]=b-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*u,f=a*h,g=o*u,b=o*h;t[0]=c*u,t[4]=g*l-f,t[8]=d*l+b,t[1]=c*h,t[5]=b*l+d,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,f=a*l,g=o*c,b=o*l;t[0]=c*u,t[4]=b-d*h,t[8]=g*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=f*h+g,t[10]=d-b*h}else if(e.order==="XZY"){const d=a*c,f=a*l,g=o*c,b=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=d*h+b,t[5]=a*u,t[9]=f*h-g,t[2]=g*h-f,t[6]=o*u,t[10]=b*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Yh,e,Jh)}lookAt(e,t,n){const i=this.elements;return Qn.subVectors(e,t),Qn.lengthSq()===0&&(Qn.z=1),Qn.normalize(),Xi.crossVectors(n,Qn),Xi.lengthSq()===0&&(Math.abs(n.z)===1?Qn.x+=1e-4:Qn.z+=1e-4,Qn.normalize(),Xi.crossVectors(n,Qn)),Xi.normalize(),Fr.crossVectors(Qn,Xi),i[0]=Xi.x,i[4]=Fr.x,i[8]=Qn.x,i[1]=Xi.y,i[5]=Fr.y,i[9]=Qn.y,i[2]=Xi.z,i[6]=Fr.z,i[10]=Qn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],b=n[6],m=n[10],p=n[14],x=n[3],y=n[7],_=n[11],P=n[15],w=i[0],C=i[4],S=i[8],v=i[12],M=i[1],R=i[5],z=i[9],k=i[13],X=i[2],ae=i[6],I=i[10],j=i[14],G=i[3],ce=i[7],Y=i[11],Q=i[15];return r[0]=a*w+o*M+c*X+l*G,r[4]=a*C+o*R+c*ae+l*ce,r[8]=a*S+o*z+c*I+l*Y,r[12]=a*v+o*k+c*j+l*Q,r[1]=u*w+h*M+d*X+f*G,r[5]=u*C+h*R+d*ae+f*ce,r[9]=u*S+h*z+d*I+f*Y,r[13]=u*v+h*k+d*j+f*Q,r[2]=g*w+b*M+m*X+p*G,r[6]=g*C+b*R+m*ae+p*ce,r[10]=g*S+b*z+m*I+p*Y,r[14]=g*v+b*k+m*j+p*Q,r[3]=x*w+y*M+_*X+P*G,r[7]=x*C+y*R+_*ae+P*ce,r[11]=x*S+y*z+_*I+P*Y,r[15]=x*v+y*k+_*j+P*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],d=e[10],f=e[14],g=e[3],b=e[7],m=e[11],p=e[15];return g*(+r*c*h-i*l*h-r*o*d+n*l*d+i*o*f-n*c*f)+b*(+t*c*f-t*l*d+r*a*d-i*a*f+i*l*u-r*c*u)+m*(+t*l*h-t*o*f-r*a*h+n*a*f+r*o*u-n*l*u)+p*(-i*o*u-t*c*h+t*o*d+i*a*h-n*a*d+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],d=e[10],f=e[11],g=e[12],b=e[13],m=e[14],p=e[15],x=h*m*l-b*d*l+b*c*f-o*m*f-h*c*p+o*d*p,y=g*d*l-u*m*l-g*c*f+a*m*f+u*c*p-a*d*p,_=u*b*l-g*h*l+g*o*f-a*b*f-u*o*p+a*h*p,P=g*h*c-u*b*c-g*o*d+a*b*d+u*o*m-a*h*m,w=t*x+n*y+i*_+r*P;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/w;return e[0]=x*C,e[1]=(b*d*r-h*m*r-b*i*f+n*m*f+h*i*p-n*d*p)*C,e[2]=(o*m*r-b*c*r+b*i*l-n*m*l-o*i*p+n*c*p)*C,e[3]=(h*c*r-o*d*r-h*i*l+n*d*l+o*i*f-n*c*f)*C,e[4]=y*C,e[5]=(u*m*r-g*d*r+g*i*f-t*m*f-u*i*p+t*d*p)*C,e[6]=(g*c*r-a*m*r-g*i*l+t*m*l+a*i*p-t*c*p)*C,e[7]=(a*d*r-u*c*r+u*i*l-t*d*l-a*i*f+t*c*f)*C,e[8]=_*C,e[9]=(g*h*r-u*b*r-g*n*f+t*b*f+u*n*p-t*h*p)*C,e[10]=(a*b*r-g*o*r+g*n*l-t*b*l-a*n*p+t*o*p)*C,e[11]=(u*o*r-a*h*r-u*n*l+t*h*l+a*n*f-t*o*f)*C,e[12]=P*C,e[13]=(u*b*i-g*h*i+g*n*d-t*b*d-u*n*m+t*h*m)*C,e[14]=(g*o*i-a*b*i-g*n*c+t*b*c+a*n*m-t*o*m)*C,e[15]=(a*h*i-u*o*i+u*n*c-t*h*c-a*n*d+t*o*d)*C,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,u*o+n,u*c-i*a,0,l*c-i*o,u*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,h=o+o,d=r*l,f=r*u,g=r*h,b=a*u,m=a*h,p=o*h,x=c*l,y=c*u,_=c*h,P=n.x,w=n.y,C=n.z;return i[0]=(1-(b+p))*P,i[1]=(f+_)*P,i[2]=(g-y)*P,i[3]=0,i[4]=(f-_)*w,i[5]=(1-(d+p))*w,i[6]=(m+x)*w,i[7]=0,i[8]=(g+y)*C,i[9]=(m-x)*C,i[10]=(1-(d+b))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=Ms.set(i[0],i[1],i[2]).length();const a=Ms.set(i[4],i[5],i[6]).length(),o=Ms.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],mi.copy(this);const l=1/r,u=1/a,h=1/o;return mi.elements[0]*=l,mi.elements[1]*=l,mi.elements[2]*=l,mi.elements[4]*=u,mi.elements[5]*=u,mi.elements[6]*=u,mi.elements[8]*=h,mi.elements[9]*=h,mi.elements[10]*=h,t.setFromRotationMatrix(mi),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=2e3){const c=this.elements,l=2*r/(t-e),u=2*r/(n-i),h=(t+e)/(t-e),d=(n+i)/(n-i);let f,g;if(o===2e3)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===2001)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=2e3){const c=this.elements,l=1/(t-e),u=1/(n-i),h=1/(a-r),d=(t+e)*l,f=(n+i)*u;let g,b;if(o===2e3)g=(a+r)*h,b=-2*h;else if(o===2001)g=r*h,b=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=b,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ms=new F,mi=new lt,Yh=new F(0,0,0),Jh=new F(1,1,1),Xi=new F,Fr=new F,Qn=new F,nc=new lt,ic=new Tn;class ni{constructor(e=0,t=0,n=0,i=ni.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(wn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-wn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(wn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-wn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(wn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-wn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return nc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ic.setFromEuler(this),this.setFromQuaternion(ic,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ni.DEFAULT_ORDER="XYZ";class Il{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Zh=0;const sc=new F,Ss=new Tn,Li=new lt,Nr=new F,Qs=new F,Qh=new F,$h=new Tn,rc=new F(1,0,0),ac=new F(0,1,0),oc=new F(0,0,1),cc={type:"added"},eu={type:"removed"},Es={type:"childadded",child:null},Da={type:"childremoved",child:null};class dn extends gs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zh++}),this.uuid=vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dn.DEFAULT_UP.clone();const e=new F,t=new ni,n=new Tn,i=new F(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new lt},normalMatrix:{value:new Dt}}),this.matrix=new lt,this.matrixWorld=new lt,this.matrixAutoUpdate=dn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Il,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ss.setFromAxisAngle(e,t),this.quaternion.multiply(Ss),this}rotateOnWorldAxis(e,t){return Ss.setFromAxisAngle(e,t),this.quaternion.premultiply(Ss),this}rotateX(e){return this.rotateOnAxis(rc,e)}rotateY(e){return this.rotateOnAxis(ac,e)}rotateZ(e){return this.rotateOnAxis(oc,e)}translateOnAxis(e,t){return sc.copy(e).applyQuaternion(this.quaternion),this.position.add(sc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(rc,e)}translateY(e){return this.translateOnAxis(ac,e)}translateZ(e){return this.translateOnAxis(oc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Nr.copy(e):Nr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(Qs,Nr,this.up):Li.lookAt(Nr,Qs,this.up),this.quaternion.setFromRotationMatrix(Li),i&&(Li.extractRotation(i.matrixWorld),Ss.setFromRotationMatrix(Li),this.quaternion.premultiply(Ss.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(cc),Es.child=e,this.dispatchEvent(Es),Es.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(eu),Da.child=e,this.dispatchEvent(Da),Da.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Li.multiply(e.parent.matrixWorld)),e.applyMatrix4(Li),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(cc),Es.child=e,this.dispatchEvent(Es),Es.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,e,Qh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,$h,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}dn.DEFAULT_UP=new F(0,1,0);dn.DEFAULT_MATRIX_AUTO_UPDATE=!0;dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const gi=new F,Ii=new F,Fa=new F,Di=new F,As=new F,ws=new F,lc=new F,Na=new F,Ua=new F,Oa=new F,Ba=new jt,ka=new jt,za=new jt;class hi{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),gi.subVectors(e,t),i.cross(gi);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){gi.subVectors(i,t),Ii.subVectors(n,t),Fa.subVectors(e,t);const a=gi.dot(gi),o=gi.dot(Ii),c=gi.dot(Fa),l=Ii.dot(Ii),u=Ii.dot(Fa),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(l*c-o*u)*d,g=(a*u-o*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Di)===null?!1:Di.x>=0&&Di.y>=0&&Di.x+Di.y<=1}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,Di)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Di.x),c.addScaledVector(a,Di.y),c.addScaledVector(o,Di.z),c)}static getInterpolatedAttribute(e,t,n,i,r,a){return Ba.setScalar(0),ka.setScalar(0),za.setScalar(0),Ba.fromBufferAttribute(e,t),ka.fromBufferAttribute(e,n),za.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Ba,r.x),a.addScaledVector(ka,r.y),a.addScaledVector(za,r.z),a}static isFrontFacing(e,t,n,i){return gi.subVectors(n,t),Ii.subVectors(e,t),gi.cross(Ii).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return gi.subVectors(this.c,this.b),Ii.subVectors(this.a,this.b),gi.cross(Ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return hi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return hi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return hi.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return hi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return hi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;As.subVectors(i,n),ws.subVectors(r,n),Na.subVectors(e,n);const c=As.dot(Na),l=ws.dot(Na);if(c<=0&&l<=0)return t.copy(n);Ua.subVectors(e,i);const u=As.dot(Ua),h=ws.dot(Ua);if(u>=0&&h<=u)return t.copy(i);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(As,a);Oa.subVectors(e,r);const f=As.dot(Oa),g=ws.dot(Oa);if(g>=0&&f<=g)return t.copy(r);const b=f*l-c*g;if(b<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(ws,o);const m=u*g-f*h;if(m<=0&&h-u>=0&&f-g>=0)return lc.subVectors(r,i),o=(h-u)/(h-u+(f-g)),t.copy(i).addScaledVector(lc,o);const p=1/(m+b+d);return a=b*p,o=d*p,t.copy(n).addScaledVector(As,a).addScaledVector(ws,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Dl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ji={h:0,s:0,l:0},Ur={h:0,s:0,l:0};function Ga(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class ot{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Xt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Xt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Xt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Xt.workingColorSpace){if(e=Lo(e,1),t=wn(t,0,1),n=wn(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Ga(a,r,e+1/3),this.g=Ga(a,r,e),this.b=Ga(a,r,e-1/3)}return Xt.toWorkingColorSpace(this,i),this}setStyle(e,t=qt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){const n=Dl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bi(e.r),this.g=Bi(e.g),this.b=Bi(e.b),this}copyLinearToSRGB(e){return this.r=Bs(e.r),this.g=Bs(e.g),this.b=Bs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return Xt.fromWorkingColorSpace(kn.copy(this),e),Math.round(wn(kn.r*255,0,255))*65536+Math.round(wn(kn.g*255,0,255))*256+Math.round(wn(kn.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Xt.workingColorSpace){Xt.fromWorkingColorSpace(kn.copy(this),t);const n=kn.r,i=kn.g,r=kn.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(i-r)/h+(i<r?6:0);break;case i:c=(r-n)/h+2;break;case r:c=(n-i)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Xt.workingColorSpace){return Xt.fromWorkingColorSpace(kn.copy(this),t),e.r=kn.r,e.g=kn.g,e.b=kn.b,e}getStyle(e=qt){Xt.fromWorkingColorSpace(kn.copy(this),e);const t=kn.r,n=kn.g,i=kn.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ji),this.setHSL(ji.h+e,ji.s+t,ji.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ji),e.getHSL(Ur);const n=dr(ji.h,Ur.h,t),i=dr(ji.s,Ur.s,t),r=dr(ji.l,Ur.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const kn=new ot;ot.NAMES=Dl;let tu=0;class di extends gs{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tu++}),this.uuid=vi(),this.name="",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Mn extends di{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const yn=new F,Or=new He;class Zt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Or.fromBufferAttribute(this,t),Or.applyMatrix3(e),this.setXY(t,Or.x,Or.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)yn.fromBufferAttribute(this,t),yn.applyMatrix3(e),this.setXYZ(t,yn.x,yn.y,yn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)yn.fromBufferAttribute(this,t),yn.applyMatrix4(e),this.setXYZ(t,yn.x,yn.y,yn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yn.fromBufferAttribute(this,t),yn.applyNormalMatrix(e),this.setXYZ(t,yn.x,yn.y,yn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yn.fromBufferAttribute(this,t),yn.transformDirection(e),this.setXYZ(t,yn.x,yn.y,yn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=_i(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=_i(t,this.array)),t}setX(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=_i(t,this.array)),t}setY(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=_i(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=_i(t,this.array)),t}setW(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),i=tn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),i=tn(i,this.array),r=tn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}}class Fl extends Zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Nl extends Zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class zt extends Zt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let nu=0;const ci=new lt,Ha=new dn,Ts=new F,$n=new On,$s=new On,Dn=new F;class ln extends gs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nu++}),this.uuid=vi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Cl(e)?Nl:Fl)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Dt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ci.makeRotationFromQuaternion(e),this.applyMatrix4(ci),this}rotateX(e){return ci.makeRotationX(e),this.applyMatrix4(ci),this}rotateY(e){return ci.makeRotationY(e),this.applyMatrix4(ci),this}rotateZ(e){return ci.makeRotationZ(e),this.applyMatrix4(ci),this}translate(e,t,n){return ci.makeTranslation(e,t,n),this.applyMatrix4(ci),this}scale(e,t,n){return ci.makeScale(e,t,n),this.applyMatrix4(ci),this}lookAt(e){return Ha.lookAt(e),Ha.updateMatrix(),this.applyMatrix4(Ha.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ts).negate(),this.translate(Ts.x,Ts.y,Ts.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new zt(n,3))}else{for(let n=0,i=t.count;n<i;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new On);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];$n.setFromBufferAttribute(r),this.morphTargetsRelative?(Dn.addVectors(this.boundingBox.min,$n.min),this.boundingBox.expandByPoint(Dn),Dn.addVectors(this.boundingBox.max,$n.max),this.boundingBox.expandByPoint(Dn)):(this.boundingBox.expandByPoint($n.min),this.boundingBox.expandByPoint($n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ai);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const n=this.boundingSphere.center;if($n.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];$s.setFromBufferAttribute(o),this.morphTargetsRelative?(Dn.addVectors($n.min,$s.min),$n.expandByPoint(Dn),Dn.addVectors($n.max,$s.max),$n.expandByPoint(Dn)):($n.expandByPoint($s.min),$n.expandByPoint($s.max))}$n.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)Dn.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Dn));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Dn.fromBufferAttribute(o,l),c&&(Ts.fromBufferAttribute(e,l),Dn.add(Ts)),i=Math.max(i,n.distanceToSquared(Dn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let S=0;S<n.count;S++)o[S]=new F,c[S]=new F;const l=new F,u=new F,h=new F,d=new He,f=new He,g=new He,b=new F,m=new F;function p(S,v,M){l.fromBufferAttribute(n,S),u.fromBufferAttribute(n,v),h.fromBufferAttribute(n,M),d.fromBufferAttribute(r,S),f.fromBufferAttribute(r,v),g.fromBufferAttribute(r,M),u.sub(l),h.sub(l),f.sub(d),g.sub(d);const R=1/(f.x*g.y-g.x*f.y);isFinite(R)&&(b.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(R),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(R),o[S].add(b),o[v].add(b),o[M].add(b),c[S].add(m),c[v].add(m),c[M].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let S=0,v=x.length;S<v;++S){const M=x[S],R=M.start,z=M.count;for(let k=R,X=R+z;k<X;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const y=new F,_=new F,P=new F,w=new F;function C(S){P.fromBufferAttribute(i,S),w.copy(P);const v=o[S];y.copy(v),y.sub(P.multiplyScalar(P.dot(v))).normalize(),_.crossVectors(w,v);const R=_.dot(c[S])<0?-1:1;a.setXYZW(S,y.x,y.y,y.z,R)}for(let S=0,v=x.length;S<v;++S){const M=x[S],R=M.start,z=M.count;for(let k=R,X=R+z;k<X;k+=3)C(e.getX(k+0)),C(e.getX(k+1)),C(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new F,r=new F,a=new F,o=new F,c=new F,l=new F,u=new F,h=new F;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),b=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,b),a.fromBufferAttribute(t,m),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,b),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(b,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Dn.fromBufferAttribute(e,t),Dn.normalize(),e.setXYZ(t,Dn.x,Dn.y,Dn.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,h=o.normalized,d=new l.constructor(c.length*u);let f=0,g=0;for(let b=0,m=c.length;b<m;b++){o.isInterleavedBufferAttribute?f=c[b]*o.data.stride+o.offset:f=c[b]*u;for(let p=0;p<u;p++)d[g++]=l[f++]}return new Zt(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ln,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const d=l[u],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const f=l[h];u.push(f.toJSON(e.data))}u.length>0&&(i[c]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const l in i){const u=i[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const hc=new lt,rs=new _a,Br=new Ai,uc=new F,kr=new F,zr=new F,Gr=new F,Va=new F,Hr=new F,dc=new F,Vr=new F;class Je extends dn{constructor(e=new ln,t=new Mn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){Hr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(Va.fromBufferAttribute(h,e),a?Hr.addScaledVector(Va,u):Hr.addScaledVector(Va.sub(t),u))}t.add(Hr)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Br.copy(n.boundingSphere),Br.applyMatrix4(r),rs.copy(e.ray).recast(e.near),!(Br.containsPoint(rs.origin)===!1&&(rs.intersectSphere(Br,uc)===null||rs.origin.distanceToSquared(uc)>(e.far-e.near)**2))&&(hc.copy(r).invert(),rs.copy(e.ray).applyMatrix4(hc),!(n.boundingBox!==null&&rs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,rs)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,b=d.length;g<b;g++){const m=d[g],p=a[m.materialIndex],x=Math.max(m.start,f.start),y=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let _=x,P=y;_<P;_+=3){const w=o.getX(_),C=o.getX(_+1),S=o.getX(_+2);i=Wr(this,p,e,n,l,u,h,w,C,S),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),b=Math.min(o.count,f.start+f.count);for(let m=g,p=b;m<p;m+=3){const x=o.getX(m),y=o.getX(m+1),_=o.getX(m+2);i=Wr(this,a,e,n,l,u,h,x,y,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,b=d.length;g<b;g++){const m=d[g],p=a[m.materialIndex],x=Math.max(m.start,f.start),y=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let _=x,P=y;_<P;_+=3){const w=_,C=_+1,S=_+2;i=Wr(this,p,e,n,l,u,h,w,C,S),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),b=Math.min(c.count,f.start+f.count);for(let m=g,p=b;m<p;m+=3){const x=m,y=m+1,_=m+2;i=Wr(this,a,e,n,l,u,h,x,y,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function iu(s,e,t,n,i,r,a,o){let c;if(e.side===1?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===0,o),c===null)return null;Vr.copy(o),Vr.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(Vr);return l<t.near||l>t.far?null:{distance:l,point:Vr.clone(),object:s}}function Wr(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,kr),s.getVertexPosition(c,zr),s.getVertexPosition(l,Gr);const u=iu(s,e,t,n,kr,zr,Gr,dc);if(u){const h=new F;hi.getBarycoord(dc,kr,zr,Gr,h),i&&(u.uv=hi.getInterpolatedAttribute(i,o,c,l,h,new He)),r&&(u.uv1=hi.getInterpolatedAttribute(r,o,c,l,h,new He)),a&&(u.normal=hi.getInterpolatedAttribute(a,o,c,l,h,new F),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new F,materialIndex:0};hi.getNormal(kr,zr,Gr,d.normal),u.face=d,u.barycoord=h}return u}class cn extends ln{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],h=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new zt(l,3)),this.setAttribute("normal",new zt(u,3)),this.setAttribute("uv",new zt(h,2));function g(b,m,p,x,y,_,P,w,C,S,v){const M=_/C,R=P/S,z=_/2,k=P/2,X=w/2,ae=C+1,I=S+1;let j=0,G=0;const ce=new F;for(let Y=0;Y<I;Y++){const Q=Y*R-k;for(let Se=0;Se<ae;Se++){const De=Se*M-z;ce[b]=De*x,ce[m]=Q*y,ce[p]=X,l.push(ce.x,ce.y,ce.z),ce[b]=0,ce[m]=0,ce[p]=w>0?1:-1,u.push(ce.x,ce.y,ce.z),h.push(Se/C),h.push(1-Y/S),j+=1}}for(let Y=0;Y<S;Y++)for(let Q=0;Q<C;Q++){const Se=d+Q+ae*Y,De=d+Q+ae*(Y+1),ie=d+(Q+1)+ae*(Y+1),pe=d+(Q+1)+ae*Y;c.push(Se,De,pe),c.push(De,ie,pe),G+=6}o.addGroup(f,G,v),f+=G,d+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Gs(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Gn(s){const e={};for(let t=0;t<s.length;t++){const n=Gs(s[t]);for(const i in n)e[i]=n[i]}return e}function su(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Ul(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Xt.workingColorSpace}const ru={clone:Gs,merge:Gn};var au=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ou=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ns extends di{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=au,this.fragmentShader=ou,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Gs(e.uniforms),this.uniformsGroups=su(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Ol extends dn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new lt,this.projectionMatrix=new lt,this.projectionMatrixInverse=new lt,this.coordinateSystem=2e3}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const qi=new F,fc=new He,pc=new He;class jn extends Ol{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=zs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ur*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zs*2*Math.atan(Math.tan(ur*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(qi.x,qi.y).multiplyScalar(-e/qi.z),qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qi.x,qi.y).multiplyScalar(-e/qi.z)}getViewSize(e,t){return this.getViewBounds(e,fc,pc),t.subVectors(pc,fc)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ur*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Rs=-90,Cs=1;class cu extends dn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new jn(Rs,Cs,e,t);i.layers=this.layers,this.add(i);const r=new jn(Rs,Cs,e,t);r.layers=this.layers,this.add(r);const a=new jn(Rs,Cs,e,t);a.layers=this.layers,this.add(a);const o=new jn(Rs,Cs,e,t);o.layers=this.layers,this.add(o);const c=new jn(Rs,Cs,e,t);c.layers=this.layers,this.add(c);const l=new jn(Rs,Cs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const b=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=b,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Bl extends Sn{constructor(e,t,n,i,r,a,o,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:301,super(e,t,n,i,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class lu extends ts{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Bl(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:1006}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new cn(5,5,5),r=new ns({name:"CubemapFromEquirect",uniforms:Gs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});r.uniforms.tEquirect.value=t;const a=new Je(i,r),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=1006),new cu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}const Wa=new F,hu=new F,uu=new Dt;class Oi{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Wa.subVectors(n,t).cross(hu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Wa),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||uu.getNormalMatrix(e),i=this.coplanarPoint(Wa).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const as=new Ai,Xr=new F;class Io{constructor(e=new Oi,t=new Oi,n=new Oi,i=new Oi,r=new Oi,a=new Oi){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3){const n=this.planes,i=e.elements,r=i[0],a=i[1],o=i[2],c=i[3],l=i[4],u=i[5],h=i[6],d=i[7],f=i[8],g=i[9],b=i[10],m=i[11],p=i[12],x=i[13],y=i[14],_=i[15];if(n[0].setComponents(c-r,d-l,m-f,_-p).normalize(),n[1].setComponents(c+r,d+l,m+f,_+p).normalize(),n[2].setComponents(c+a,d+u,m+g,_+x).normalize(),n[3].setComponents(c-a,d-u,m-g,_-x).normalize(),n[4].setComponents(c-o,d-h,m-b,_-y).normalize(),t===2e3)n[5].setComponents(c+o,d+h,m+b,_+y).normalize();else if(t===2001)n[5].setComponents(o,h,b,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),as.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),as.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(as)}intersectsSprite(e){return as.center.set(0,0,0),as.radius=.7071067811865476,as.applyMatrix4(e.matrixWorld),this.intersectsSphere(as)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Xr.x=i.normal.x>0?e.max.x:e.min.x,Xr.y=i.normal.y>0?e.max.y:e.min.y,Xr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Xr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function kl(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function du(s){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,h=l.byteLength,d=s.createBuffer();s.bindBuffer(c,d),s.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c.updateRanges;if(s.bindBuffer(l,o),h.length===0)s.bufferSubData(l,0,u);else{h.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<h.length;f++){const g=h[d],b=h[f];b.start<=g.start+g.count+1?g.count=Math.max(g.count,b.start+b.count-g.start):(++d,h[d]=b)}h.length=d+1;for(let f=0,g=h.length;f<g;f++){const b=h[f];s.bufferSubData(l,b.start*u.BYTES_PER_ELEMENT,u,b.start,b.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(s.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}class qn extends ln{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,u=c+1,h=e/o,d=t/c,f=[],g=[],b=[],m=[];for(let p=0;p<u;p++){const x=p*d-a;for(let y=0;y<l;y++){const _=y*h-r;g.push(_,-x,0),b.push(0,0,1),m.push(y/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let x=0;x<o;x++){const y=x+l*p,_=x+l*(p+1),P=x+1+l*(p+1),w=x+1+l*p;f.push(y,_,w),f.push(_,P,w)}this.setIndex(f),this.setAttribute("position",new zt(g,3)),this.setAttribute("normal",new zt(b,3)),this.setAttribute("uv",new zt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qn(e.width,e.height,e.widthSegments,e.heightSegments)}}var fu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pu=`#ifdef USE_ALPHAHASH
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
#endif`,mu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_u=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vu=`#ifdef USE_AOMAP
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
#endif`,xu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yu=`#ifdef USE_BATCHING
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
#endif`,Mu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Su=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Eu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Au=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,wu=`#ifdef USE_IRIDESCENCE
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
#endif`,Tu=`#ifdef USE_BUMPMAP
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
#endif`,Ru=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Cu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Iu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Du=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Fu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Nu=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Uu=`#define PI 3.141592653589793
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
} // validated`,Ou=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Bu=`vec3 transformedNormal = objectNormal;
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
#endif`,ku=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Vu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xu=`#ifdef USE_ENVMAP
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
#endif`,ju=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,qu=`#ifdef USE_ENVMAP
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
#endif`,Ku=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Yu=`#ifdef USE_ENVMAP
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
#endif`,Ju=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Zu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$u=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ed=`#ifdef USE_GRADIENTMAP
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
}`,td=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,id=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sd=`uniform bool receiveShadow;
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
#endif`,rd=`#ifdef USE_ENVMAP
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
#endif`,ad=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,od=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ld=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hd=`PhysicalMaterial material;
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
#endif`,ud=`struct PhysicalMaterial {
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
}`,dd=`
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
#endif`,fd=`#if defined( RE_IndirectDiffuse )
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
#endif`,pd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,md=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_d=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,yd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Md=`#if defined( USE_POINTS_UV )
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
#endif`,Sd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ed=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ad=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Td=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rd=`#ifdef USE_MORPHTARGETS
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
#endif`,Cd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ld=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Id=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Nd=`#ifdef USE_NORMALMAP
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
#endif`,Ud=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Od=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Hd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Vd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Zd=`float getShadowMask() {
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
}`,Qd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$d=`#ifdef USE_SKINNING
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
#endif`,ef=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tf=`#ifdef USE_SKINNING
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
#endif`,nf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,af=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,of=`#ifdef USE_TRANSMISSION
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
#endif`,cf=`#ifdef USE_TRANSMISSION
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
#endif`,lf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,df=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ff=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pf=`uniform sampler2D t2D;
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
}`,mf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,_f=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vf=`#include <common>
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
}`,xf=`#if DEPTH_PACKING == 3200
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
}`,yf=`#define DISTANCE
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
}`,Mf=`#define DISTANCE
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
}`,Sf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ef=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Af=`uniform float scale;
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
}`,wf=`uniform vec3 diffuse;
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
}`,Tf=`#include <common>
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
}`,Rf=`uniform vec3 diffuse;
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
}`,Cf=`#define LAMBERT
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
}`,Pf=`#define LAMBERT
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
}`,Lf=`#define MATCAP
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
}`,If=`#define MATCAP
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
}`,Df=`#define NORMAL
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
}`,Ff=`#define NORMAL
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
}`,Nf=`#define PHONG
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
}`,Uf=`#define PHONG
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
}`,Of=`#define STANDARD
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
}`,Bf=`#define STANDARD
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
}`,kf=`#define TOON
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
}`,zf=`#define TOON
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
}`,Gf=`uniform float size;
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
}`,Hf=`uniform vec3 diffuse;
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
}`,Vf=`#include <common>
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
}`,Wf=`uniform vec3 color;
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
}`,Xf=`uniform float rotation;
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
}`,jf=`uniform vec3 diffuse;
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
}`,Ut={alphahash_fragment:fu,alphahash_pars_fragment:pu,alphamap_fragment:mu,alphamap_pars_fragment:gu,alphatest_fragment:_u,alphatest_pars_fragment:bu,aomap_fragment:vu,aomap_pars_fragment:xu,batching_pars_vertex:yu,batching_vertex:Mu,begin_vertex:Su,beginnormal_vertex:Eu,bsdfs:Au,iridescence_fragment:wu,bumpmap_pars_fragment:Tu,clipping_planes_fragment:Ru,clipping_planes_pars_fragment:Cu,clipping_planes_pars_vertex:Pu,clipping_planes_vertex:Lu,color_fragment:Iu,color_pars_fragment:Du,color_pars_vertex:Fu,color_vertex:Nu,common:Uu,cube_uv_reflection_fragment:Ou,defaultnormal_vertex:Bu,displacementmap_pars_vertex:ku,displacementmap_vertex:zu,emissivemap_fragment:Gu,emissivemap_pars_fragment:Hu,colorspace_fragment:Vu,colorspace_pars_fragment:Wu,envmap_fragment:Xu,envmap_common_pars_fragment:ju,envmap_pars_fragment:qu,envmap_pars_vertex:Ku,envmap_physical_pars_fragment:rd,envmap_vertex:Yu,fog_vertex:Ju,fog_pars_vertex:Zu,fog_fragment:Qu,fog_pars_fragment:$u,gradientmap_pars_fragment:ed,lightmap_pars_fragment:td,lights_lambert_fragment:nd,lights_lambert_pars_fragment:id,lights_pars_begin:sd,lights_toon_fragment:ad,lights_toon_pars_fragment:od,lights_phong_fragment:cd,lights_phong_pars_fragment:ld,lights_physical_fragment:hd,lights_physical_pars_fragment:ud,lights_fragment_begin:dd,lights_fragment_maps:fd,lights_fragment_end:pd,logdepthbuf_fragment:md,logdepthbuf_pars_fragment:gd,logdepthbuf_pars_vertex:_d,logdepthbuf_vertex:bd,map_fragment:vd,map_pars_fragment:xd,map_particle_fragment:yd,map_particle_pars_fragment:Md,metalnessmap_fragment:Sd,metalnessmap_pars_fragment:Ed,morphinstance_vertex:Ad,morphcolor_vertex:wd,morphnormal_vertex:Td,morphtarget_pars_vertex:Rd,morphtarget_vertex:Cd,normal_fragment_begin:Pd,normal_fragment_maps:Ld,normal_pars_fragment:Id,normal_pars_vertex:Dd,normal_vertex:Fd,normalmap_pars_fragment:Nd,clearcoat_normal_fragment_begin:Ud,clearcoat_normal_fragment_maps:Od,clearcoat_pars_fragment:Bd,iridescence_pars_fragment:kd,opaque_fragment:zd,packing:Gd,premultiplied_alpha_fragment:Hd,project_vertex:Vd,dithering_fragment:Wd,dithering_pars_fragment:Xd,roughnessmap_fragment:jd,roughnessmap_pars_fragment:qd,shadowmap_pars_fragment:Kd,shadowmap_pars_vertex:Yd,shadowmap_vertex:Jd,shadowmask_pars_fragment:Zd,skinbase_vertex:Qd,skinning_pars_vertex:$d,skinning_vertex:ef,skinnormal_vertex:tf,specularmap_fragment:nf,specularmap_pars_fragment:sf,tonemapping_fragment:rf,tonemapping_pars_fragment:af,transmission_fragment:of,transmission_pars_fragment:cf,uv_pars_fragment:lf,uv_pars_vertex:hf,uv_vertex:uf,worldpos_vertex:df,background_vert:ff,background_frag:pf,backgroundCube_vert:mf,backgroundCube_frag:gf,cube_vert:_f,cube_frag:bf,depth_vert:vf,depth_frag:xf,distanceRGBA_vert:yf,distanceRGBA_frag:Mf,equirect_vert:Sf,equirect_frag:Ef,linedashed_vert:Af,linedashed_frag:wf,meshbasic_vert:Tf,meshbasic_frag:Rf,meshlambert_vert:Cf,meshlambert_frag:Pf,meshmatcap_vert:Lf,meshmatcap_frag:If,meshnormal_vert:Df,meshnormal_frag:Ff,meshphong_vert:Nf,meshphong_frag:Uf,meshphysical_vert:Of,meshphysical_frag:Bf,meshtoon_vert:kf,meshtoon_frag:zf,points_vert:Gf,points_frag:Hf,shadow_vert:Vf,shadow_frag:Wf,sprite_vert:Xf,sprite_frag:jf},qe={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Dt},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Dt}},envmap:{envMap:{value:null},envMapRotation:{value:new Dt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Dt},normalScale:{value:new He(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0},uvTransform:{value:new Dt}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new He(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Dt},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0}}},Ei={basic:{uniforms:Gn([qe.common,qe.specularmap,qe.envmap,qe.aomap,qe.lightmap,qe.fog]),vertexShader:Ut.meshbasic_vert,fragmentShader:Ut.meshbasic_frag},lambert:{uniforms:Gn([qe.common,qe.specularmap,qe.envmap,qe.aomap,qe.lightmap,qe.emissivemap,qe.bumpmap,qe.normalmap,qe.displacementmap,qe.fog,qe.lights,{emissive:{value:new ot(0)}}]),vertexShader:Ut.meshlambert_vert,fragmentShader:Ut.meshlambert_frag},phong:{uniforms:Gn([qe.common,qe.specularmap,qe.envmap,qe.aomap,qe.lightmap,qe.emissivemap,qe.bumpmap,qe.normalmap,qe.displacementmap,qe.fog,qe.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30}}]),vertexShader:Ut.meshphong_vert,fragmentShader:Ut.meshphong_frag},standard:{uniforms:Gn([qe.common,qe.envmap,qe.aomap,qe.lightmap,qe.emissivemap,qe.bumpmap,qe.normalmap,qe.displacementmap,qe.roughnessmap,qe.metalnessmap,qe.fog,qe.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag},toon:{uniforms:Gn([qe.common,qe.aomap,qe.lightmap,qe.emissivemap,qe.bumpmap,qe.normalmap,qe.displacementmap,qe.gradientmap,qe.fog,qe.lights,{emissive:{value:new ot(0)}}]),vertexShader:Ut.meshtoon_vert,fragmentShader:Ut.meshtoon_frag},matcap:{uniforms:Gn([qe.common,qe.bumpmap,qe.normalmap,qe.displacementmap,qe.fog,{matcap:{value:null}}]),vertexShader:Ut.meshmatcap_vert,fragmentShader:Ut.meshmatcap_frag},points:{uniforms:Gn([qe.points,qe.fog]),vertexShader:Ut.points_vert,fragmentShader:Ut.points_frag},dashed:{uniforms:Gn([qe.common,qe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ut.linedashed_vert,fragmentShader:Ut.linedashed_frag},depth:{uniforms:Gn([qe.common,qe.displacementmap]),vertexShader:Ut.depth_vert,fragmentShader:Ut.depth_frag},normal:{uniforms:Gn([qe.common,qe.bumpmap,qe.normalmap,qe.displacementmap,{opacity:{value:1}}]),vertexShader:Ut.meshnormal_vert,fragmentShader:Ut.meshnormal_frag},sprite:{uniforms:Gn([qe.sprite,qe.fog]),vertexShader:Ut.sprite_vert,fragmentShader:Ut.sprite_frag},background:{uniforms:{uvTransform:{value:new Dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ut.background_vert,fragmentShader:Ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Dt}},vertexShader:Ut.backgroundCube_vert,fragmentShader:Ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ut.cube_vert,fragmentShader:Ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ut.equirect_vert,fragmentShader:Ut.equirect_frag},distanceRGBA:{uniforms:Gn([qe.common,qe.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ut.distanceRGBA_vert,fragmentShader:Ut.distanceRGBA_frag},shadow:{uniforms:Gn([qe.lights,qe.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:Ut.shadow_vert,fragmentShader:Ut.shadow_frag}};Ei.physical={uniforms:Gn([Ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Dt},clearcoatNormalScale:{value:new He(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Dt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Dt},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Dt},transmissionSamplerSize:{value:new He},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Dt},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Dt},anisotropyVector:{value:new He},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Dt}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag};const jr={r:0,b:0,g:0},os=new ni,qf=new lt;function Kf(s,e,t,n,i,r,a){const o=new ot(0);let c=r===!0?0:1,l,u,h=null,d=0,f=null;function g(x){let y=x.isScene===!0?x.background:null;return y&&y.isTexture&&(y=(x.backgroundBlurriness>0?t:e).get(y)),y}function b(x){let y=!1;const _=g(x);_===null?p(o,c):_&&_.isColor&&(p(_,1),y=!0);const P=s.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(x,y){const _=g(y);_&&(_.isCubeTexture||_.mapping===306)?(u===void 0&&(u=new Je(new cn(1,1,1),new ns({name:"BackgroundCubeMaterial",uniforms:Gs(Ei.backgroundCube.uniforms),vertexShader:Ei.backgroundCube.vertexShader,fragmentShader:Ei.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(P,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),os.copy(y.backgroundRotation),os.x*=-1,os.y*=-1,os.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(os.y*=-1,os.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(qf.makeRotationFromEuler(os)),u.material.toneMapped=Xt.getTransfer(_.colorSpace)!==an,(h!==_||d!==_.version||f!==s.toneMapping)&&(u.material.needsUpdate=!0,h=_,d=_.version,f=s.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Je(new qn(2,2),new ns({name:"BackgroundMaterial",uniforms:Gs(Ei.background.uniforms),vertexShader:Ei.background.vertexShader,fragmentShader:Ei.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=Xt.getTransfer(_.colorSpace)!==an,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,h=_,d=_.version,f=s.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,y){x.getRGB(jr,Ul(s)),n.buffers.color.setClear(jr.r,jr.g,jr.b,y,a)}return{getClearColor:function(){return o},setClearColor:function(x,y=1){o.set(x),c=y,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,p(o,c)},render:b,addToRenderList:m}}function Yf(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(M,R,z,k,X){let ae=!1;const I=h(k,z,R);r!==I&&(r=I,l(r.object)),ae=f(M,k,z,X),ae&&g(M,k,z,X),X!==null&&e.update(X,s.ELEMENT_ARRAY_BUFFER),(ae||a)&&(a=!1,_(M,R,z,k),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function c(){return s.createVertexArray()}function l(M){return s.bindVertexArray(M)}function u(M){return s.deleteVertexArray(M)}function h(M,R,z){const k=z.wireframe===!0;let X=n[M.id];X===void 0&&(X={},n[M.id]=X);let ae=X[R.id];ae===void 0&&(ae={},X[R.id]=ae);let I=ae[k];return I===void 0&&(I=d(c()),ae[k]=I),I}function d(M){const R=[],z=[],k=[];for(let X=0;X<t;X++)R[X]=0,z[X]=0,k[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:z,attributeDivisors:k,object:M,attributes:{},index:null}}function f(M,R,z,k){const X=r.attributes,ae=R.attributes;let I=0;const j=z.getAttributes();for(const G in j)if(j[G].location>=0){const Y=X[G];let Q=ae[G];if(Q===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(Q=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(Q=M.instanceColor)),Y===void 0||Y.attribute!==Q||Q&&Y.data!==Q.data)return!0;I++}return r.attributesNum!==I||r.index!==k}function g(M,R,z,k){const X={},ae=R.attributes;let I=0;const j=z.getAttributes();for(const G in j)if(j[G].location>=0){let Y=ae[G];Y===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(Y=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(Y=M.instanceColor));const Q={};Q.attribute=Y,Y&&Y.data&&(Q.data=Y.data),X[G]=Q,I++}r.attributes=X,r.attributesNum=I,r.index=k}function b(){const M=r.newAttributes;for(let R=0,z=M.length;R<z;R++)M[R]=0}function m(M){p(M,0)}function p(M,R){const z=r.newAttributes,k=r.enabledAttributes,X=r.attributeDivisors;z[M]=1,k[M]===0&&(s.enableVertexAttribArray(M),k[M]=1),X[M]!==R&&(s.vertexAttribDivisor(M,R),X[M]=R)}function x(){const M=r.newAttributes,R=r.enabledAttributes;for(let z=0,k=R.length;z<k;z++)R[z]!==M[z]&&(s.disableVertexAttribArray(z),R[z]=0)}function y(M,R,z,k,X,ae,I){I===!0?s.vertexAttribIPointer(M,R,z,X,ae):s.vertexAttribPointer(M,R,z,k,X,ae)}function _(M,R,z,k){b();const X=k.attributes,ae=z.getAttributes(),I=R.defaultAttributeValues;for(const j in ae){const G=ae[j];if(G.location>=0){let ce=X[j];if(ce===void 0&&(j==="instanceMatrix"&&M.instanceMatrix&&(ce=M.instanceMatrix),j==="instanceColor"&&M.instanceColor&&(ce=M.instanceColor)),ce!==void 0){const Y=ce.normalized,Q=ce.itemSize,Se=e.get(ce);if(Se===void 0)continue;const De=Se.buffer,ie=Se.type,pe=Se.bytesPerElement,Fe=ie===s.INT||ie===s.UNSIGNED_INT||ce.gpuType===1013;if(ce.isInterleavedBufferAttribute){const ye=ce.data,ht=ye.stride,ut=ce.offset;if(ye.isInstancedInterleavedBuffer){for(let pt=0;pt<G.locationSize;pt++)p(G.location+pt,ye.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let pt=0;pt<G.locationSize;pt++)m(G.location+pt);s.bindBuffer(s.ARRAY_BUFFER,De);for(let pt=0;pt<G.locationSize;pt++)y(G.location+pt,Q/G.locationSize,ie,Y,ht*pe,(ut+Q/G.locationSize*pt)*pe,Fe)}else{if(ce.isInstancedBufferAttribute){for(let ye=0;ye<G.locationSize;ye++)p(G.location+ye,ce.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let ye=0;ye<G.locationSize;ye++)m(G.location+ye);s.bindBuffer(s.ARRAY_BUFFER,De);for(let ye=0;ye<G.locationSize;ye++)y(G.location+ye,Q/G.locationSize,ie,Y,Q*pe,Q/G.locationSize*ye*pe,Fe)}}else if(I!==void 0){const Y=I[j];if(Y!==void 0)switch(Y.length){case 2:s.vertexAttrib2fv(G.location,Y);break;case 3:s.vertexAttrib3fv(G.location,Y);break;case 4:s.vertexAttrib4fv(G.location,Y);break;default:s.vertexAttrib1fv(G.location,Y)}}}}x()}function P(){S();for(const M in n){const R=n[M];for(const z in R){const k=R[z];for(const X in k)u(k[X].object),delete k[X];delete R[z]}delete n[M]}}function w(M){if(n[M.id]===void 0)return;const R=n[M.id];for(const z in R){const k=R[z];for(const X in k)u(k[X].object),delete k[X];delete R[z]}delete n[M.id]}function C(M){for(const R in n){const z=n[R];if(z[M.id]===void 0)continue;const k=z[M.id];for(const X in k)u(k[X].object),delete k[X];delete z[M.id]}}function S(){v(),a=!0,r!==i&&(r=i,l(r.object))}function v(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:S,resetDefaultState:v,dispose:P,releaseStatesOfGeometry:w,releaseStatesOfProgram:C,initAttributes:b,enableAttribute:m,disableUnusedAttributes:x}}function Jf(s,e,t){let n;function i(l){n=l}function r(l,u){s.drawArrays(n,l,u),t.update(u,n,1)}function a(l,u,h){h!==0&&(s.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function o(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let f=0;for(let g=0;g<h;g++)f+=u[g];t.update(f,n,1)}function c(l,u,h,d){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],u[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,u,0,d,0,h);let g=0;for(let b=0;b<h;b++)g+=u[b]*d[b];t.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Zf(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==1023&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const S=C===1016&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==1009&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==1015&&!S)}function c(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,w=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:b,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:P,maxSamples:w}}function Qf(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new Oi,o=new Dt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||i;return i=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const g=h.clippingPlanes,b=h.clipIntersection,m=h.clipShadows,p=s.get(h);if(!i||g===null||g.length===0||r&&!m)r?u(null):l();else{const x=r?0:n,y=x*4;let _=p.clippingState||null;c.value=_,_=u(g,d,y,f);for(let P=0;P!==y;++P)_[P]=t[P];p.clippingState=_,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,g){const b=h!==null?h.length:0;let m=null;if(b!==0){if(m=c.value,g!==!0||m===null){const p=f+b*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,_=f;y!==b;++y,_+=4)a.copy(h[y]).applyMatrix4(x,o),a.normal.toArray(m,_),m[_+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,m}}function $f(s){let e=new WeakMap;function t(a,o){return o===303?a.mapping=301:o===304&&(a.mapping=302),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===303||o===304)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new lu(c.height);return l.fromEquirectangularTexture(s,a),e.set(a,l),a.addEventListener("dispose",i),t(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class ba extends Ol{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Os=4,mc=[.125,.215,.35,.446,.526,.582],fs=20,Xa=new ba,gc=new ot;let ja=null,qa=0,Ka=0,Ya=!1;const ds=(1+Math.sqrt(5))/2,Ps=1/ds,_c=[new F(-ds,Ps,0),new F(ds,Ps,0),new F(-Ps,0,ds),new F(Ps,0,ds),new F(0,ds,-Ps),new F(0,ds,Ps),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)];class bc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){ja=this._renderer.getRenderTarget(),qa=this._renderer.getActiveCubeFace(),Ka=this._renderer.getActiveMipmapLevel(),Ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ja,qa,Ka),this._renderer.xr.enabled=Ya,e.scissorTest=!1,qr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ja=this._renderer.getRenderTarget(),qa=this._renderer.getActiveCubeFace(),Ka=this._renderer.getActiveMipmapLevel(),Ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:Hn,depthBuffer:!1},i=vc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vc(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ep(r)),this._blurMaterial=tp(r,e,t)}return i}_compileMaterial(e){const t=new Je(this._lodPlanes[0],e);this._renderer.compile(t,Xa)}_sceneToCubeUV(e,t,n,i){const o=new jn(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(gc),u.toneMapping=0,u.autoClear=!1;const f=new Mn({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),g=new Je(new cn,f);let b=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,b=!0):(f.color.copy(gc),b=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):x===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));const y=this._cubeSize;qr(i,x*y,p>2?y:0,y,y),u.setRenderTarget(i),b&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===301||e.mapping===302;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=yc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xc());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new Je(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;qr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Xa)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=_c[(i-r-1)%_c.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Je(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*fs-1),b=r/g,m=isFinite(r)?1+Math.floor(u*b):fs;m>fs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${fs}`);const p=[];let x=0;for(let C=0;C<fs;++C){const S=C/b,v=Math.exp(-S*S/2);p.push(v),C===0?x+=v:C<m&&(x+=2*v)}for(let C=0;C<p.length;C++)p[C]=p[C]/x;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;const _=this._sizeLods[i],P=3*_*(i>y-Os?i-y+Os:0),w=4*(this._cubeSize-_);qr(t,P,w,3*_,2*_),c.setRenderTarget(t),c.render(h,Xa)}}function ep(s){const e=[],t=[],n=[];let i=s;const r=s-Os+1+mc.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let c=1/o;a>s-Os?c=mc[a-s+Os-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,b=3,m=2,p=1,x=new Float32Array(b*g*f),y=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let w=0;w<f;w++){const C=w%3*2/3-1,S=w>2?0:-1,v=[C,S,0,C+2/3,S,0,C+2/3,S+1,0,C,S,0,C+2/3,S+1,0,C,S+1,0];x.set(v,b*g*w),y.set(d,m*g*w);const M=[w,w,w,w,w,w];_.set(M,p*g*w)}const P=new ln;P.setAttribute("position",new Zt(x,b)),P.setAttribute("uv",new Zt(y,m)),P.setAttribute("faceIndex",new Zt(_,p)),e.push(P),i>Os&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function vc(s,e,t){const n=new ts(s,e,t);return n.texture.mapping=306,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function qr(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function tp(s,e,t){const n=new Float32Array(fs),i=new F(0,1,0);return new ns({name:"SphericalGaussianBlur",defines:{n:fs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Do(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function xc(){return new ns({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Do(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function yc(){return new ns({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Do(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Do(){return`

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
	`}function np(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===303||c===304,u=c===301||c===302;if(l||u){let h=e.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new bc(s)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return l&&f&&f.height>0||u&&f&&i(f)?(t===null&&(t=new bc(s)),h=l?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function i(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function ip(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&lr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function sp(s,e,t,n){const i={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const b=d.morphAttributes[g];for(let m=0,p=b.length;m<p;m++)e.remove(b[m])}d.removeEventListener("dispose",a),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function c(h){const d=h.attributes;for(const g in d)e.update(d[g],s.ARRAY_BUFFER);const f=h.morphAttributes;for(const g in f){const b=f[g];for(let m=0,p=b.length;m<p;m++)e.update(b[m],s.ARRAY_BUFFER)}}function l(h){const d=[],f=h.index,g=h.attributes.position;let b=0;if(f!==null){const x=f.array;b=f.version;for(let y=0,_=x.length;y<_;y+=3){const P=x[y+0],w=x[y+1],C=x[y+2];d.push(P,w,w,C,C,P)}}else if(g!==void 0){const x=g.array;b=g.version;for(let y=0,_=x.length/3-1;y<_;y+=3){const P=y+0,w=y+1,C=y+2;d.push(P,w,w,C,C,P)}}else return;const m=new(Cl(d)?Nl:Fl)(d,1);m.version=b;const p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function rp(s,e,t){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){s.drawElements(n,f,r,d*a),t.update(f,n,1)}function l(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*a,g),t.update(f,n,g))}function u(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function h(d,f,g,b){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],b[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,b,0,g);let p=0;for(let x=0;x<g;x++)p+=f[x]*b[x];t.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function ap(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function op(s,e,t){const n=new WeakMap,i=new jt;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let v=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",v)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,b=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let y=0;f===!0&&(y=1),g===!0&&(y=2),b===!0&&(y=3);let _=o.attributes.position.count*y,P=1;_>e.maxTextureSize&&(P=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);const w=new Float32Array(_*P*4*h),C=new Ll(w,_,P,h);C.type=1015,C.needsUpdate=!0;const S=y*4;for(let M=0;M<h;M++){const R=m[M],z=p[M],k=x[M],X=_*P*4*M;for(let ae=0;ae<R.count;ae++){const I=ae*S;f===!0&&(i.fromBufferAttribute(R,ae),w[X+I+0]=i.x,w[X+I+1]=i.y,w[X+I+2]=i.z,w[X+I+3]=0),g===!0&&(i.fromBufferAttribute(z,ae),w[X+I+4]=i.x,w[X+I+5]=i.y,w[X+I+6]=i.z,w[X+I+7]=0),b===!0&&(i.fromBufferAttribute(k,ae),w[X+I+8]=i.x,w[X+I+9]=i.y,w[X+I+10]=i.z,w[X+I+11]=k.itemSize===4?i.w:1)}}d={count:h,texture:C,size:new He(_,P)},n.set(o,d),o.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let b=0;b<l.length;b++)f+=l[b];const g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(s,"morphTargetBaseInfluence",g),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function cp(s,e,t,n){let i=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(i.get(h)!==l&&(e.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return h}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}class zl extends Sn{constructor(e,t,n,i,r,a,o,c,l,u=1026){if(u!==1026&&u!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===1026&&(n=1014),n===void 0&&u===1027&&(n=1020),super(null,i,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:1003,this.minFilter=c!==void 0?c:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Gl=new Sn,Mc=new zl(1,1),Hl=new Ll,Vl=new qh,Wl=new Bl,Sc=[],Ec=[],Ac=new Float32Array(16),wc=new Float32Array(9),Tc=new Float32Array(4);function Xs(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Sc[i];if(r===void 0&&(r=new Float32Array(i),Sc[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Rn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Cn(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function va(s,e){let t=Ec[e];t===void 0&&(t=new Int32Array(e),Ec[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function lp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function hp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rn(t,e))return;s.uniform2fv(this.addr,e),Cn(t,e)}}function up(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rn(t,e))return;s.uniform3fv(this.addr,e),Cn(t,e)}}function dp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rn(t,e))return;s.uniform4fv(this.addr,e),Cn(t,e)}}function fp(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Cn(t,e)}else{if(Rn(t,n))return;Tc.set(n),s.uniformMatrix2fv(this.addr,!1,Tc),Cn(t,n)}}function pp(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Cn(t,e)}else{if(Rn(t,n))return;wc.set(n),s.uniformMatrix3fv(this.addr,!1,wc),Cn(t,n)}}function mp(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Cn(t,e)}else{if(Rn(t,n))return;Ac.set(n),s.uniformMatrix4fv(this.addr,!1,Ac),Cn(t,n)}}function gp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function _p(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rn(t,e))return;s.uniform2iv(this.addr,e),Cn(t,e)}}function bp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rn(t,e))return;s.uniform3iv(this.addr,e),Cn(t,e)}}function vp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rn(t,e))return;s.uniform4iv(this.addr,e),Cn(t,e)}}function xp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function yp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rn(t,e))return;s.uniform2uiv(this.addr,e),Cn(t,e)}}function Mp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rn(t,e))return;s.uniform3uiv(this.addr,e),Cn(t,e)}}function Sp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rn(t,e))return;s.uniform4uiv(this.addr,e),Cn(t,e)}}function Ep(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Mc.compareFunction=515,r=Mc):r=Gl,t.setTexture2D(e||r,i)}function Ap(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Vl,i)}function wp(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Wl,i)}function Tp(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Hl,i)}function Rp(s){switch(s){case 5126:return lp;case 35664:return hp;case 35665:return up;case 35666:return dp;case 35674:return fp;case 35675:return pp;case 35676:return mp;case 5124:case 35670:return gp;case 35667:case 35671:return _p;case 35668:case 35672:return bp;case 35669:case 35673:return vp;case 5125:return xp;case 36294:return yp;case 36295:return Mp;case 36296:return Sp;case 35678:case 36198:case 36298:case 36306:case 35682:return Ep;case 35679:case 36299:case 36307:return Ap;case 35680:case 36300:case 36308:case 36293:return wp;case 36289:case 36303:case 36311:case 36292:return Tp}}function Cp(s,e){s.uniform1fv(this.addr,e)}function Pp(s,e){const t=Xs(e,this.size,2);s.uniform2fv(this.addr,t)}function Lp(s,e){const t=Xs(e,this.size,3);s.uniform3fv(this.addr,t)}function Ip(s,e){const t=Xs(e,this.size,4);s.uniform4fv(this.addr,t)}function Dp(s,e){const t=Xs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Fp(s,e){const t=Xs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Np(s,e){const t=Xs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Up(s,e){s.uniform1iv(this.addr,e)}function Op(s,e){s.uniform2iv(this.addr,e)}function Bp(s,e){s.uniform3iv(this.addr,e)}function kp(s,e){s.uniform4iv(this.addr,e)}function zp(s,e){s.uniform1uiv(this.addr,e)}function Gp(s,e){s.uniform2uiv(this.addr,e)}function Hp(s,e){s.uniform3uiv(this.addr,e)}function Vp(s,e){s.uniform4uiv(this.addr,e)}function Wp(s,e,t){const n=this.cache,i=e.length,r=va(t,i);Rn(n,r)||(s.uniform1iv(this.addr,r),Cn(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Gl,r[a])}function Xp(s,e,t){const n=this.cache,i=e.length,r=va(t,i);Rn(n,r)||(s.uniform1iv(this.addr,r),Cn(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Vl,r[a])}function jp(s,e,t){const n=this.cache,i=e.length,r=va(t,i);Rn(n,r)||(s.uniform1iv(this.addr,r),Cn(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Wl,r[a])}function qp(s,e,t){const n=this.cache,i=e.length,r=va(t,i);Rn(n,r)||(s.uniform1iv(this.addr,r),Cn(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Hl,r[a])}function Kp(s){switch(s){case 5126:return Cp;case 35664:return Pp;case 35665:return Lp;case 35666:return Ip;case 35674:return Dp;case 35675:return Fp;case 35676:return Np;case 5124:case 35670:return Up;case 35667:case 35671:return Op;case 35668:case 35672:return Bp;case 35669:case 35673:return kp;case 5125:return zp;case 36294:return Gp;case 36295:return Hp;case 36296:return Vp;case 35678:case 36198:case 36298:case 36306:case 35682:return Wp;case 35679:case 36299:case 36307:return Xp;case 35680:case 36300:case 36308:case 36293:return jp;case 36289:case 36303:case 36311:case 36292:return qp}}class Yp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Rp(t.type)}}class Jp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Kp(t.type)}}class Zp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const Ja=/(\w+)(\])?(\[|\.)?/g;function Rc(s,e){s.seq.push(e),s.map[e.id]=e}function Qp(s,e,t){const n=s.name,i=n.length;for(Ja.lastIndex=0;;){const r=Ja.exec(n),a=Ja.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){Rc(t,l===void 0?new Yp(o,s,e):new Jp(o,s,e));break}else{let h=t.map[o];h===void 0&&(h=new Zp(o),Rc(t,h)),t=h}}}class ha{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);Qp(r,a,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Cc(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const $p=37297;let em=0;function tm(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Pc=new Dt;function nm(s){Xt._getMatrix(Pc,Xt.workingColorSpace,s);const e=`mat3( ${Pc.elements.map(t=>t.toFixed(4))} )`;switch(Xt.getTransfer(s)){case ga:return[e,"LinearTransferOETF"];case an:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Lc(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+tm(s.getShaderSource(e),a)}else return i}function im(s,e){const t=nm(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function sm(s,e){let t;switch(e){case 1:t="Linear";break;case 2:t="Reinhard";break;case 3:t="Cineon";break;case 4:t="ACESFilmic";break;case 6:t="AgX";break;case 7:t="Neutral";break;case 5:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Kr=new F;function rm(){Xt.getLuminanceCoefficients(Kr);const s=Kr.x.toFixed(4),e=Kr.y.toFixed(4),t=Kr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function am(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(hr).join(`
`)}function om(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function cm(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function hr(s){return s!==""}function Ic(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Dc(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const lm=/^[ \t]*#include +<([\w\d./]+)>/gm;function xo(s){return s.replace(lm,um)}const hm=new Map;function um(s,e){let t=Ut[e];if(t===void 0){const n=hm.get(e);if(n!==void 0)t=Ut[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return xo(t)}const dm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fc(s){return s.replace(dm,fm)}function fm(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Nc(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function pm(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===1?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===2?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===3&&(e="SHADOWMAP_TYPE_VSM"),e}function mm(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case 301:case 302:e="ENVMAP_TYPE_CUBE";break;case 306:e="ENVMAP_TYPE_CUBE_UV";break}return e}function gm(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case 302:e="ENVMAP_MODE_REFRACTION";break}return e}function _m(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case 0:e="ENVMAP_BLENDING_MULTIPLY";break;case 1:e="ENVMAP_BLENDING_MIX";break;case 2:e="ENVMAP_BLENDING_ADD";break}return e}function bm(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function vm(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=pm(t),l=mm(t),u=gm(t),h=_m(t),d=bm(t),f=am(t),g=om(r),b=i.createProgram();let m,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(hr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(hr).join(`
`),p.length>0&&(p+=`
`)):(m=[Nc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hr).join(`
`),p=[Nc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?Ut.tonemapping_pars_fragment:"",t.toneMapping!==0?sm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ut.colorspace_pars_fragment,im("linearToOutputTexel",t.outputColorSpace),rm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(hr).join(`
`)),a=xo(a),a=Ic(a,t),a=Dc(a,t),o=xo(o),o=Ic(o,t),o=Dc(o,t),a=Fc(a),o=Fc(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===qo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===qo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=x+m+a,_=x+p+o,P=Cc(i,i.VERTEX_SHADER,y),w=Cc(i,i.FRAGMENT_SHADER,_);i.attachShader(b,P),i.attachShader(b,w),t.index0AttributeName!==void 0?i.bindAttribLocation(b,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(b,0,"position"),i.linkProgram(b);function C(R){if(s.debug.checkShaderErrors){const z=i.getProgramInfoLog(b).trim(),k=i.getShaderInfoLog(P).trim(),X=i.getShaderInfoLog(w).trim();let ae=!0,I=!0;if(i.getProgramParameter(b,i.LINK_STATUS)===!1)if(ae=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,b,P,w);else{const j=Lc(i,P,"vertex"),G=Lc(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(b,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+z+`
`+j+`
`+G)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(k===""||X==="")&&(I=!1);I&&(R.diagnostics={runnable:ae,programLog:z,vertexShader:{log:k,prefix:m},fragmentShader:{log:X,prefix:p}})}i.deleteShader(P),i.deleteShader(w),S=new ha(i,b),v=cm(i,b)}let S;this.getUniforms=function(){return S===void 0&&C(this),S};let v;this.getAttributes=function(){return v===void 0&&C(this),v};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(b,$p)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=em++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=P,this.fragmentShader=w,this}let xm=0;class ym{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Mm(e),t.set(e,n)),n}}class Mm{constructor(e){this.id=xm++,this.code=e,this.usedTimes=0}}function Sm(s,e,t,n,i,r,a){const o=new Il,c=new ym,l=new Set,u=[],h=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(v){return l.add(v),v===0?"uv":`uv${v}`}function m(v,M,R,z,k){const X=z.fog,ae=k.geometry,I=v.isMeshStandardMaterial?z.environment:null,j=(v.isMeshStandardMaterial?t:e).get(v.envMap||I),G=j&&j.mapping===306?j.image.height:null,ce=g[v.type];v.precision!==null&&(f=i.getMaxPrecision(v.precision),f!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const Y=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,Q=Y!==void 0?Y.length:0;let Se=0;ae.morphAttributes.position!==void 0&&(Se=1),ae.morphAttributes.normal!==void 0&&(Se=2),ae.morphAttributes.color!==void 0&&(Se=3);let De,ie,pe,Fe;if(ce){const Pt=Ei[ce];De=Pt.vertexShader,ie=Pt.fragmentShader}else De=v.vertexShader,ie=v.fragmentShader,c.update(v),pe=c.getVertexShaderID(v),Fe=c.getFragmentShaderID(v);const ye=s.getRenderTarget(),ht=s.state.buffers.depth.getReversed(),ut=k.isInstancedMesh===!0,pt=k.isBatchedMesh===!0,At=!!v.map,yt=!!v.matcap,St=!!j,q=!!v.aoMap,$t=!!v.lightMap,Tt=!!v.bumpMap,Mt=!!v.normalMap,rt=!!v.displacementMap,Ft=!!v.emissiveMap,Ye=!!v.metalnessMap,D=!!v.roughnessMap,A=v.anisotropy>0,J=v.clearcoat>0,fe=v.dispersion>0,xe=v.iridescence>0,he=v.sheen>0,$e=v.transmission>0,Pe=A&&!!v.anisotropyMap,Ne=J&&!!v.clearcoatMap,wt=J&&!!v.clearcoatNormalMap,we=J&&!!v.clearcoatRoughnessMap,Oe=xe&&!!v.iridescenceMap,Xe=xe&&!!v.iridescenceThicknessMap,dt=he&&!!v.sheenColorMap,Ve=he&&!!v.sheenRoughnessMap,Ct=!!v.specularMap,vt=!!v.specularColorMap,Bt=!!v.specularIntensityMap,V=$e&&!!v.transmissionMap,Ue=$e&&!!v.thicknessMap,le=!!v.gradientMap,be=!!v.alphaMap,ze=v.alphaTest>0,Be=!!v.alphaHash,nt=!!v.extensions;let Kt=0;v.toneMapped&&(ye===null||ye.isXRRenderTarget===!0)&&(Kt=s.toneMapping);const hn={shaderID:ce,shaderType:v.type,shaderName:v.name,vertexShader:De,fragmentShader:ie,defines:v.defines,customVertexShaderID:pe,customFragmentShaderID:Fe,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:pt,batchingColor:pt&&k._colorsTexture!==null,instancing:ut,instancingColor:ut&&k.instanceColor!==null,instancingMorph:ut&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ye===null?s.outputColorSpace:ye.isXRRenderTarget===!0?ye.texture.colorSpace:Hn,alphaToCoverage:!!v.alphaToCoverage,map:At,matcap:yt,envMap:St,envMapMode:St&&j.mapping,envMapCubeUVHeight:G,aoMap:q,lightMap:$t,bumpMap:Tt,normalMap:Mt,displacementMap:d&&rt,emissiveMap:Ft,normalMapObjectSpace:Mt&&v.normalMapType===1,normalMapTangentSpace:Mt&&v.normalMapType===0,metalnessMap:Ye,roughnessMap:D,anisotropy:A,anisotropyMap:Pe,clearcoat:J,clearcoatMap:Ne,clearcoatNormalMap:wt,clearcoatRoughnessMap:we,dispersion:fe,iridescence:xe,iridescenceMap:Oe,iridescenceThicknessMap:Xe,sheen:he,sheenColorMap:dt,sheenRoughnessMap:Ve,specularMap:Ct,specularColorMap:vt,specularIntensityMap:Bt,transmission:$e,transmissionMap:V,thicknessMap:Ue,gradientMap:le,opaque:v.transparent===!1&&v.blending===1&&v.alphaToCoverage===!1,alphaMap:be,alphaTest:ze,alphaHash:Be,combine:v.combine,mapUv:At&&b(v.map.channel),aoMapUv:q&&b(v.aoMap.channel),lightMapUv:$t&&b(v.lightMap.channel),bumpMapUv:Tt&&b(v.bumpMap.channel),normalMapUv:Mt&&b(v.normalMap.channel),displacementMapUv:rt&&b(v.displacementMap.channel),emissiveMapUv:Ft&&b(v.emissiveMap.channel),metalnessMapUv:Ye&&b(v.metalnessMap.channel),roughnessMapUv:D&&b(v.roughnessMap.channel),anisotropyMapUv:Pe&&b(v.anisotropyMap.channel),clearcoatMapUv:Ne&&b(v.clearcoatMap.channel),clearcoatNormalMapUv:wt&&b(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&b(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Oe&&b(v.iridescenceMap.channel),iridescenceThicknessMapUv:Xe&&b(v.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&b(v.sheenColorMap.channel),sheenRoughnessMapUv:Ve&&b(v.sheenRoughnessMap.channel),specularMapUv:Ct&&b(v.specularMap.channel),specularColorMapUv:vt&&b(v.specularColorMap.channel),specularIntensityMapUv:Bt&&b(v.specularIntensityMap.channel),transmissionMapUv:V&&b(v.transmissionMap.channel),thicknessMapUv:Ue&&b(v.thicknessMap.channel),alphaMapUv:be&&b(v.alphaMap.channel),vertexTangents:!!ae.attributes.tangent&&(Mt||A),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!ae.attributes.uv&&(At||be),fog:!!X,useFog:v.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:ht,skinning:k.isSkinnedMesh===!0,morphTargets:ae.morphAttributes.position!==void 0,morphNormals:ae.morphAttributes.normal!==void 0,morphColors:ae.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:Se,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:Kt,decodeVideoTexture:At&&v.map.isVideoTexture===!0&&Xt.getTransfer(v.map.colorSpace)===an,decodeVideoTextureEmissive:Ft&&v.emissiveMap.isVideoTexture===!0&&Xt.getTransfer(v.emissiveMap.colorSpace)===an,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===2,flipSided:v.side===1,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:nt&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(nt&&v.extensions.multiDraw===!0||pt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return hn.vertexUv1s=l.has(1),hn.vertexUv2s=l.has(2),hn.vertexUv3s=l.has(3),l.clear(),hn}function p(v){const M=[];if(v.shaderID?M.push(v.shaderID):(M.push(v.customVertexShaderID),M.push(v.customFragmentShaderID)),v.defines!==void 0)for(const R in v.defines)M.push(R),M.push(v.defines[R]);return v.isRawShaderMaterial===!1&&(x(M,v),y(M,v),M.push(s.outputColorSpace)),M.push(v.customProgramCacheKey),M.join()}function x(v,M){v.push(M.precision),v.push(M.outputColorSpace),v.push(M.envMapMode),v.push(M.envMapCubeUVHeight),v.push(M.mapUv),v.push(M.alphaMapUv),v.push(M.lightMapUv),v.push(M.aoMapUv),v.push(M.bumpMapUv),v.push(M.normalMapUv),v.push(M.displacementMapUv),v.push(M.emissiveMapUv),v.push(M.metalnessMapUv),v.push(M.roughnessMapUv),v.push(M.anisotropyMapUv),v.push(M.clearcoatMapUv),v.push(M.clearcoatNormalMapUv),v.push(M.clearcoatRoughnessMapUv),v.push(M.iridescenceMapUv),v.push(M.iridescenceThicknessMapUv),v.push(M.sheenColorMapUv),v.push(M.sheenRoughnessMapUv),v.push(M.specularMapUv),v.push(M.specularColorMapUv),v.push(M.specularIntensityMapUv),v.push(M.transmissionMapUv),v.push(M.thicknessMapUv),v.push(M.combine),v.push(M.fogExp2),v.push(M.sizeAttenuation),v.push(M.morphTargetsCount),v.push(M.morphAttributeCount),v.push(M.numDirLights),v.push(M.numPointLights),v.push(M.numSpotLights),v.push(M.numSpotLightMaps),v.push(M.numHemiLights),v.push(M.numRectAreaLights),v.push(M.numDirLightShadows),v.push(M.numPointLightShadows),v.push(M.numSpotLightShadows),v.push(M.numSpotLightShadowsWithMaps),v.push(M.numLightProbes),v.push(M.shadowMapType),v.push(M.toneMapping),v.push(M.numClippingPlanes),v.push(M.numClipIntersection),v.push(M.depthPacking)}function y(v,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),v.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),v.push(o.mask)}function _(v){const M=g[v.type];let R;if(M){const z=Ei[M];R=ru.clone(z.uniforms)}else R=v.uniforms;return R}function P(v,M){let R;for(let z=0,k=u.length;z<k;z++){const X=u[z];if(X.cacheKey===M){R=X,++R.usedTimes;break}}return R===void 0&&(R=new vm(s,M,v,r),u.push(R)),R}function w(v){if(--v.usedTimes===0){const M=u.indexOf(v);u[M]=u[u.length-1],u.pop(),v.destroy()}}function C(v){c.remove(v)}function S(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:P,releaseProgram:w,releaseShaderCache:C,programs:u,dispose:S}}function Em(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Am(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Uc(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Oc(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(h,d,f,g,b,m){let p=s[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:b,group:m},s[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=b,p.group=m),e++,p}function o(h,d,f,g,b,m){const p=a(h,d,f,g,b,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function c(h,d,f,g,b,m){const p=a(h,d,f,g,b,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function l(h,d){t.length>1&&t.sort(h||Am),n.length>1&&n.sort(d||Uc),i.length>1&&i.sort(d||Uc)}function u(){for(let h=e,d=s.length;h<d;h++){const f=s[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:c,finish:u,sort:l}}function wm(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new Oc,s.set(n,[a])):i>=r.length?(a=new Oc,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Tm(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new ot};break;case"SpotLight":t={position:new F,direction:new F,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new ot,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":t={color:new ot,position:new F,halfWidth:new F,halfHeight:new F};break}return s[e.id]=t,t}}}function Rm(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Cm=0;function Pm(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Lm(s){const e=new Tm,t=Rm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);const i=new F,r=new lt,a=new lt;function o(l){let u=0,h=0,d=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let f=0,g=0,b=0,m=0,p=0,x=0,y=0,_=0,P=0,w=0,C=0;l.sort(Pm);for(let v=0,M=l.length;v<M;v++){const R=l[v],z=R.color,k=R.intensity,X=R.distance,ae=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=z.r*k,h+=z.g*k,d+=z.b*k;else if(R.isLightProbe){for(let I=0;I<9;I++)n.probe[I].addScaledVector(R.sh.coefficients[I],k);C++}else if(R.isDirectionalLight){const I=e.get(R);if(I.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const j=R.shadow,G=t.get(R);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=ae,n.directionalShadowMatrix[f]=R.shadow.matrix,x++}n.directional[f]=I,f++}else if(R.isSpotLight){const I=e.get(R);I.position.setFromMatrixPosition(R.matrixWorld),I.color.copy(z).multiplyScalar(k),I.distance=X,I.coneCos=Math.cos(R.angle),I.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),I.decay=R.decay,n.spot[b]=I;const j=R.shadow;if(R.map&&(n.spotLightMap[P]=R.map,P++,j.updateMatrices(R),R.castShadow&&w++),n.spotLightMatrix[b]=j.matrix,R.castShadow){const G=t.get(R);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,n.spotShadow[b]=G,n.spotShadowMap[b]=ae,_++}b++}else if(R.isRectAreaLight){const I=e.get(R);I.color.copy(z).multiplyScalar(k),I.halfWidth.set(R.width*.5,0,0),I.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=I,m++}else if(R.isPointLight){const I=e.get(R);if(I.color.copy(R.color).multiplyScalar(R.intensity),I.distance=R.distance,I.decay=R.decay,R.castShadow){const j=R.shadow,G=t.get(R);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,G.shadowCameraNear=j.camera.near,G.shadowCameraFar=j.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=ae,n.pointShadowMatrix[g]=R.shadow.matrix,y++}n.point[g]=I,g++}else if(R.isHemisphereLight){const I=e.get(R);I.skyColor.copy(R.color).multiplyScalar(k),I.groundColor.copy(R.groundColor).multiplyScalar(k),n.hemi[p]=I,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=qe.LTC_FLOAT_1,n.rectAreaLTC2=qe.LTC_FLOAT_2):(n.rectAreaLTC1=qe.LTC_HALF_1,n.rectAreaLTC2=qe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const S=n.hash;(S.directionalLength!==f||S.pointLength!==g||S.spotLength!==b||S.rectAreaLength!==m||S.hemiLength!==p||S.numDirectionalShadows!==x||S.numPointShadows!==y||S.numSpotShadows!==_||S.numSpotMaps!==P||S.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=b,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+P-w,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=C,S.directionalLength=f,S.pointLength=g,S.spotLength=b,S.rectAreaLength=m,S.hemiLength=p,S.numDirectionalShadows=x,S.numPointShadows=y,S.numSpotShadows=_,S.numSpotMaps=P,S.numLightProbes=C,n.version=Cm++)}function c(l,u){let h=0,d=0,f=0,g=0,b=0;const m=u.matrixWorldInverse;for(let p=0,x=l.length;p<x;p++){const y=l[p];if(y.isDirectionalLight){const _=n.directional[h];_.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),h++}else if(y.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),f++}else if(y.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),a.identity(),r.copy(y.matrixWorld),r.premultiply(m),a.extractRotation(r),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){const _=n.hemi[b];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(m),b++}}}return{setup:o,setupView:c,state:n}}function Bc(s){const e=new Lm(s),t=[],n=[];function i(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Im(s){let e=new WeakMap;function t(i,r=0){const a=e.get(i);let o;return a===void 0?(o=new Bc(s),e.set(i,[o])):r>=a.length?(o=new Bc(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class Dm extends di{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Fm extends di{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Nm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Um=`uniform sampler2D shadow_pass;
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
}`;function Om(s,e,t){let n=new Io;const i=new He,r=new He,a=new jt,o=new Dm({depthPacking:3201}),c=new Fm,l={},u=t.maxTextureSize,h={0:1,1:0,2:2},d=new ns({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new He},radius:{value:4}},vertexShader:Nm,fragmentShader:Um}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new ln;g.setAttribute("position",new Zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Je(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let p=this.type;this.render=function(w,C,S){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const v=s.getRenderTarget(),M=s.getActiveCubeFace(),R=s.getActiveMipmapLevel(),z=s.state;z.setBlending(0),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const k=p!==3&&this.type===3,X=p===3&&this.type!==3;for(let ae=0,I=w.length;ae<I;ae++){const j=w[ae],G=j.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const ce=G.getFrameExtents();if(i.multiply(ce),r.copy(G.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/ce.x),i.x=r.x*ce.x,G.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/ce.y),i.y=r.y*ce.y,G.mapSize.y=r.y)),G.map===null||k===!0||X===!0){const Q=this.type!==3?{minFilter:1003,magFilter:1003}:{};G.map!==null&&G.map.dispose(),G.map=new ts(i.x,i.y,Q),G.map.texture.name=j.name+".shadowMap",G.camera.updateProjectionMatrix()}s.setRenderTarget(G.map),s.clear();const Y=G.getViewportCount();for(let Q=0;Q<Y;Q++){const Se=G.getViewport(Q);a.set(r.x*Se.x,r.y*Se.y,r.x*Se.z,r.y*Se.w),z.viewport(a),G.updateMatrices(j,Q),n=G.getFrustum(),_(C,S,G.camera,j,this.type)}G.isPointLightShadow!==!0&&this.type===3&&x(G,S),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(v,M,R)};function x(w,C){const S=e.update(b);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ts(i.x,i.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(C,null,S,d,b,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(C,null,S,f,b,null)}function y(w,C,S,v){let M=null;const R=S.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(R!==void 0)M=R;else if(M=S.isPointLight===!0?c:o,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const z=M.uuid,k=C.uuid;let X=l[z];X===void 0&&(X={},l[z]=X);let ae=X[k];ae===void 0&&(ae=M.clone(),X[k]=ae,C.addEventListener("dispose",P)),M=ae}if(M.visible=C.visible,M.wireframe=C.wireframe,v===3?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:h[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,S.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const z=s.properties.get(M);z.light=S}return M}function _(w,C,S,v,M){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===3)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,w.matrixWorld);const k=e.update(w),X=w.material;if(Array.isArray(X)){const ae=k.groups;for(let I=0,j=ae.length;I<j;I++){const G=ae[I],ce=X[G.materialIndex];if(ce&&ce.visible){const Y=y(w,ce,v,M);w.onBeforeShadow(s,w,C,S,k,Y,G),s.renderBufferDirect(S,null,k,Y,w,G),w.onAfterShadow(s,w,C,S,k,Y,G)}}}else if(X.visible){const ae=y(w,X,v,M);w.onBeforeShadow(s,w,C,S,k,ae,null),s.renderBufferDirect(S,null,k,ae,w,null),w.onAfterShadow(s,w,C,S,k,ae,null)}}const z=w.children;for(let k=0,X=z.length;k<X;k++)_(z[k],C,S,v,M)}function P(w){w.target.removeEventListener("dispose",P);for(const S in l){const v=l[S],M=w.target.uuid;M in v&&(v[M].dispose(),delete v[M])}}}const Bm={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function km(s,e){function t(){let V=!1;const Ue=new jt;let le=null;const be=new jt(0,0,0,0);return{setMask:function(ze){le!==ze&&!V&&(s.colorMask(ze,ze,ze,ze),le=ze)},setLocked:function(ze){V=ze},setClear:function(ze,Be,nt,Kt,hn){hn===!0&&(ze*=Kt,Be*=Kt,nt*=Kt),Ue.set(ze,Be,nt,Kt),be.equals(Ue)===!1&&(s.clearColor(ze,Be,nt,Kt),be.copy(Ue))},reset:function(){V=!1,le=null,be.set(-1,0,0,0)}}}function n(){let V=!1,Ue=!1,le=null,be=null,ze=null;return{setReversed:function(Be){if(Ue!==Be){const nt=e.get("EXT_clip_control");Ue?nt.clipControlEXT(nt.LOWER_LEFT_EXT,nt.ZERO_TO_ONE_EXT):nt.clipControlEXT(nt.LOWER_LEFT_EXT,nt.NEGATIVE_ONE_TO_ONE_EXT);const Kt=ze;ze=null,this.setClear(Kt)}Ue=Be},getReversed:function(){return Ue},setTest:function(Be){Be?ye(s.DEPTH_TEST):ht(s.DEPTH_TEST)},setMask:function(Be){le!==Be&&!V&&(s.depthMask(Be),le=Be)},setFunc:function(Be){if(Ue&&(Be=Bm[Be]),be!==Be){switch(Be){case 0:s.depthFunc(s.NEVER);break;case 1:s.depthFunc(s.ALWAYS);break;case 2:s.depthFunc(s.LESS);break;case 3:s.depthFunc(s.LEQUAL);break;case 4:s.depthFunc(s.EQUAL);break;case 5:s.depthFunc(s.GEQUAL);break;case 6:s.depthFunc(s.GREATER);break;case 7:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}be=Be}},setLocked:function(Be){V=Be},setClear:function(Be){ze!==Be&&(Ue&&(Be=1-Be),s.clearDepth(Be),ze=Be)},reset:function(){V=!1,le=null,be=null,ze=null,Ue=!1}}}function i(){let V=!1,Ue=null,le=null,be=null,ze=null,Be=null,nt=null,Kt=null,hn=null;return{setTest:function(Pt){V||(Pt?ye(s.STENCIL_TEST):ht(s.STENCIL_TEST))},setMask:function(Pt){Ue!==Pt&&!V&&(s.stencilMask(Pt),Ue=Pt)},setFunc:function(Pt,ge,_n){(le!==Pt||be!==ge||ze!==_n)&&(s.stencilFunc(Pt,ge,_n),le=Pt,be=ge,ze=_n)},setOp:function(Pt,ge,_n){(Be!==Pt||nt!==ge||Kt!==_n)&&(s.stencilOp(Pt,ge,_n),Be=Pt,nt=ge,Kt=_n)},setLocked:function(Pt){V=Pt},setClear:function(Pt){hn!==Pt&&(s.clearStencil(Pt),hn=Pt)},reset:function(){V=!1,Ue=null,le=null,be=null,ze=null,Be=null,nt=null,Kt=null,hn=null}}}const r=new t,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let u={},h={},d=new WeakMap,f=[],g=null,b=!1,m=null,p=null,x=null,y=null,_=null,P=null,w=null,C=new ot(0,0,0),S=0,v=!1,M=null,R=null,z=null,k=null,X=null;const ae=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let I=!1,j=0;const G=s.getParameter(s.VERSION);G.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(G)[1]),I=j>=1):G.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),I=j>=2);let ce=null,Y={};const Q=s.getParameter(s.SCISSOR_BOX),Se=s.getParameter(s.VIEWPORT),De=new jt().fromArray(Q),ie=new jt().fromArray(Se);function pe(V,Ue,le,be){const ze=new Uint8Array(4),Be=s.createTexture();s.bindTexture(V,Be),s.texParameteri(V,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(V,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let nt=0;nt<le;nt++)V===s.TEXTURE_3D||V===s.TEXTURE_2D_ARRAY?s.texImage3D(Ue,0,s.RGBA,1,1,be,0,s.RGBA,s.UNSIGNED_BYTE,ze):s.texImage2D(Ue+nt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ze);return Be}const Fe={};Fe[s.TEXTURE_2D]=pe(s.TEXTURE_2D,s.TEXTURE_2D,1),Fe[s.TEXTURE_CUBE_MAP]=pe(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Fe[s.TEXTURE_2D_ARRAY]=pe(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Fe[s.TEXTURE_3D]=pe(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ye(s.DEPTH_TEST),a.setFunc(3),Tt(!1),Mt(1),ye(s.CULL_FACE),q(0);function ye(V){u[V]!==!0&&(s.enable(V),u[V]=!0)}function ht(V){u[V]!==!1&&(s.disable(V),u[V]=!1)}function ut(V,Ue){return h[V]!==Ue?(s.bindFramebuffer(V,Ue),h[V]=Ue,V===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=Ue),V===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=Ue),!0):!1}function pt(V,Ue){let le=f,be=!1;if(V){le=d.get(Ue),le===void 0&&(le=[],d.set(Ue,le));const ze=V.textures;if(le.length!==ze.length||le[0]!==s.COLOR_ATTACHMENT0){for(let Be=0,nt=ze.length;Be<nt;Be++)le[Be]=s.COLOR_ATTACHMENT0+Be;le.length=ze.length,be=!0}}else le[0]!==s.BACK&&(le[0]=s.BACK,be=!0);be&&s.drawBuffers(le)}function At(V){return g!==V?(s.useProgram(V),g=V,!0):!1}const yt={100:s.FUNC_ADD,101:s.FUNC_SUBTRACT,102:s.FUNC_REVERSE_SUBTRACT};yt[103]=s.MIN,yt[104]=s.MAX;const St={200:s.ZERO,201:s.ONE,202:s.SRC_COLOR,204:s.SRC_ALPHA,210:s.SRC_ALPHA_SATURATE,208:s.DST_COLOR,206:s.DST_ALPHA,203:s.ONE_MINUS_SRC_COLOR,205:s.ONE_MINUS_SRC_ALPHA,209:s.ONE_MINUS_DST_COLOR,207:s.ONE_MINUS_DST_ALPHA,211:s.CONSTANT_COLOR,212:s.ONE_MINUS_CONSTANT_COLOR,213:s.CONSTANT_ALPHA,214:s.ONE_MINUS_CONSTANT_ALPHA};function q(V,Ue,le,be,ze,Be,nt,Kt,hn,Pt){if(V===0){b===!0&&(ht(s.BLEND),b=!1);return}if(b===!1&&(ye(s.BLEND),b=!0),V!==5){if(V!==m||Pt!==v){if((p!==100||_!==100)&&(s.blendEquation(s.FUNC_ADD),p=100,_=100),Pt)switch(V){case 1:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case 2:s.blendFunc(s.ONE,s.ONE);break;case 3:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case 4:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case 1:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case 2:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case 3:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case 4:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}x=null,y=null,P=null,w=null,C.set(0,0,0),S=0,m=V,v=Pt}return}ze=ze||Ue,Be=Be||le,nt=nt||be,(Ue!==p||ze!==_)&&(s.blendEquationSeparate(yt[Ue],yt[ze]),p=Ue,_=ze),(le!==x||be!==y||Be!==P||nt!==w)&&(s.blendFuncSeparate(St[le],St[be],St[Be],St[nt]),x=le,y=be,P=Be,w=nt),(Kt.equals(C)===!1||hn!==S)&&(s.blendColor(Kt.r,Kt.g,Kt.b,hn),C.copy(Kt),S=hn),m=V,v=!1}function $t(V,Ue){V.side===2?ht(s.CULL_FACE):ye(s.CULL_FACE);let le=V.side===1;Ue&&(le=!le),Tt(le),V.blending===1&&V.transparent===!1?q(0):q(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),a.setFunc(V.depthFunc),a.setTest(V.depthTest),a.setMask(V.depthWrite),r.setMask(V.colorWrite);const be=V.stencilWrite;o.setTest(be),be&&(o.setMask(V.stencilWriteMask),o.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),o.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Ft(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?ye(s.SAMPLE_ALPHA_TO_COVERAGE):ht(s.SAMPLE_ALPHA_TO_COVERAGE)}function Tt(V){M!==V&&(V?s.frontFace(s.CW):s.frontFace(s.CCW),M=V)}function Mt(V){V!==0?(ye(s.CULL_FACE),V!==R&&(V===1?s.cullFace(s.BACK):V===2?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ht(s.CULL_FACE),R=V}function rt(V){V!==z&&(I&&s.lineWidth(V),z=V)}function Ft(V,Ue,le){V?(ye(s.POLYGON_OFFSET_FILL),(k!==Ue||X!==le)&&(s.polygonOffset(Ue,le),k=Ue,X=le)):ht(s.POLYGON_OFFSET_FILL)}function Ye(V){V?ye(s.SCISSOR_TEST):ht(s.SCISSOR_TEST)}function D(V){V===void 0&&(V=s.TEXTURE0+ae-1),ce!==V&&(s.activeTexture(V),ce=V)}function A(V,Ue,le){le===void 0&&(ce===null?le=s.TEXTURE0+ae-1:le=ce);let be=Y[le];be===void 0&&(be={type:void 0,texture:void 0},Y[le]=be),(be.type!==V||be.texture!==Ue)&&(ce!==le&&(s.activeTexture(le),ce=le),s.bindTexture(V,Ue||Fe[V]),be.type=V,be.texture=Ue)}function J(){const V=Y[ce];V!==void 0&&V.type!==void 0&&(s.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function fe(){try{s.compressedTexImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function xe(){try{s.compressedTexImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function he(){try{s.texSubImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function $e(){try{s.texSubImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Pe(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ne(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function wt(){try{s.texStorage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function we(){try{s.texStorage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Oe(){try{s.texImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Xe(){try{s.texImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function dt(V){De.equals(V)===!1&&(s.scissor(V.x,V.y,V.z,V.w),De.copy(V))}function Ve(V){ie.equals(V)===!1&&(s.viewport(V.x,V.y,V.z,V.w),ie.copy(V))}function Ct(V,Ue){let le=l.get(Ue);le===void 0&&(le=new WeakMap,l.set(Ue,le));let be=le.get(V);be===void 0&&(be=s.getUniformBlockIndex(Ue,V.name),le.set(V,be))}function vt(V,Ue){const be=l.get(Ue).get(V);c.get(Ue)!==be&&(s.uniformBlockBinding(Ue,be,V.__bindingPointIndex),c.set(Ue,be))}function Bt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},ce=null,Y={},h={},d=new WeakMap,f=[],g=null,b=!1,m=null,p=null,x=null,y=null,_=null,P=null,w=null,C=new ot(0,0,0),S=0,v=!1,M=null,R=null,z=null,k=null,X=null,De.set(0,0,s.canvas.width,s.canvas.height),ie.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ye,disable:ht,bindFramebuffer:ut,drawBuffers:pt,useProgram:At,setBlending:q,setMaterial:$t,setFlipSided:Tt,setCullFace:Mt,setLineWidth:rt,setPolygonOffset:Ft,setScissorTest:Ye,activeTexture:D,bindTexture:A,unbindTexture:J,compressedTexImage2D:fe,compressedTexImage3D:xe,texImage2D:Oe,texImage3D:Xe,updateUBOMapping:Ct,uniformBlockBinding:vt,texStorage2D:wt,texStorage3D:we,texSubImage2D:he,texSubImage3D:$e,compressedTexSubImage2D:Pe,compressedTexSubImage3D:Ne,scissor:dt,viewport:Ve,reset:Bt}}function kc(s,e,t,n){const i=zm(n);switch(t){case 1021:return s*e;case 1024:return s*e;case 1025:return s*e*2;case 1028:return s*e/i.components*i.byteLength;case 1029:return s*e/i.components*i.byteLength;case 1030:return s*e*2/i.components*i.byteLength;case 1031:return s*e*2/i.components*i.byteLength;case 1022:return s*e*3/i.components*i.byteLength;case 1023:return s*e*4/i.components*i.byteLength;case 1033:return s*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(s,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(s,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case 37496:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case 37808:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(s/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(s/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function zm(s){switch(s){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function Gm(s,e,t,n,i,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new He,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(D,A){return f?new OffscreenCanvas(D,A):_r("canvas")}function b(D,A,J){let fe=1;const xe=Ye(D);if((xe.width>J||xe.height>J)&&(fe=J/Math.max(xe.width,xe.height)),fe<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const he=Math.floor(fe*xe.width),$e=Math.floor(fe*xe.height);h===void 0&&(h=g(he,$e));const Pe=A?g(he,$e):h;return Pe.width=he,Pe.height=$e,Pe.getContext("2d").drawImage(D,0,0,he,$e),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+xe.width+"x"+xe.height+") to ("+he+"x"+$e+")."),Pe}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+xe.width+"x"+xe.height+")."),D;return D}function m(D){return D.generateMipmaps}function p(D){s.generateMipmap(D)}function x(D){return D.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?s.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(D,A,J,fe,xe=!1){if(D!==null){if(s[D]!==void 0)return s[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let he=A;if(A===s.RED&&(J===s.FLOAT&&(he=s.R32F),J===s.HALF_FLOAT&&(he=s.R16F),J===s.UNSIGNED_BYTE&&(he=s.R8)),A===s.RED_INTEGER&&(J===s.UNSIGNED_BYTE&&(he=s.R8UI),J===s.UNSIGNED_SHORT&&(he=s.R16UI),J===s.UNSIGNED_INT&&(he=s.R32UI),J===s.BYTE&&(he=s.R8I),J===s.SHORT&&(he=s.R16I),J===s.INT&&(he=s.R32I)),A===s.RG&&(J===s.FLOAT&&(he=s.RG32F),J===s.HALF_FLOAT&&(he=s.RG16F),J===s.UNSIGNED_BYTE&&(he=s.RG8)),A===s.RG_INTEGER&&(J===s.UNSIGNED_BYTE&&(he=s.RG8UI),J===s.UNSIGNED_SHORT&&(he=s.RG16UI),J===s.UNSIGNED_INT&&(he=s.RG32UI),J===s.BYTE&&(he=s.RG8I),J===s.SHORT&&(he=s.RG16I),J===s.INT&&(he=s.RG32I)),A===s.RGB_INTEGER&&(J===s.UNSIGNED_BYTE&&(he=s.RGB8UI),J===s.UNSIGNED_SHORT&&(he=s.RGB16UI),J===s.UNSIGNED_INT&&(he=s.RGB32UI),J===s.BYTE&&(he=s.RGB8I),J===s.SHORT&&(he=s.RGB16I),J===s.INT&&(he=s.RGB32I)),A===s.RGBA_INTEGER&&(J===s.UNSIGNED_BYTE&&(he=s.RGBA8UI),J===s.UNSIGNED_SHORT&&(he=s.RGBA16UI),J===s.UNSIGNED_INT&&(he=s.RGBA32UI),J===s.BYTE&&(he=s.RGBA8I),J===s.SHORT&&(he=s.RGBA16I),J===s.INT&&(he=s.RGBA32I)),A===s.RGB&&J===s.UNSIGNED_INT_5_9_9_9_REV&&(he=s.RGB9_E5),A===s.RGBA){const $e=xe?ga:Xt.getTransfer(fe);J===s.FLOAT&&(he=s.RGBA32F),J===s.HALF_FLOAT&&(he=s.RGBA16F),J===s.UNSIGNED_BYTE&&(he=$e===an?s.SRGB8_ALPHA8:s.RGBA8),J===s.UNSIGNED_SHORT_4_4_4_4&&(he=s.RGBA4),J===s.UNSIGNED_SHORT_5_5_5_1&&(he=s.RGB5_A1)}return(he===s.R16F||he===s.R32F||he===s.RG16F||he===s.RG32F||he===s.RGBA16F||he===s.RGBA32F)&&e.get("EXT_color_buffer_float"),he}function _(D,A){let J;return D?A===null||A===1014||A===1020?J=s.DEPTH24_STENCIL8:A===1015?J=s.DEPTH32F_STENCIL8:A===1012&&(J=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===1014||A===1020?J=s.DEPTH_COMPONENT24:A===1015?J=s.DEPTH_COMPONENT32F:A===1012&&(J=s.DEPTH_COMPONENT16),J}function P(D,A){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==1003&&D.minFilter!==1006?Math.log2(Math.max(A.width,A.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?A.mipmaps.length:1}function w(D){const A=D.target;A.removeEventListener("dispose",w),S(A),A.isVideoTexture&&u.delete(A)}function C(D){const A=D.target;A.removeEventListener("dispose",C),M(A)}function S(D){const A=n.get(D);if(A.__webglInit===void 0)return;const J=D.source,fe=d.get(J);if(fe){const xe=fe[A.__cacheKey];xe.usedTimes--,xe.usedTimes===0&&v(D),Object.keys(fe).length===0&&d.delete(J)}n.remove(D)}function v(D){const A=n.get(D);s.deleteTexture(A.__webglTexture);const J=D.source,fe=d.get(J);delete fe[A.__cacheKey],a.memory.textures--}function M(D){const A=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let fe=0;fe<6;fe++){if(Array.isArray(A.__webglFramebuffer[fe]))for(let xe=0;xe<A.__webglFramebuffer[fe].length;xe++)s.deleteFramebuffer(A.__webglFramebuffer[fe][xe]);else s.deleteFramebuffer(A.__webglFramebuffer[fe]);A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer[fe])}else{if(Array.isArray(A.__webglFramebuffer))for(let fe=0;fe<A.__webglFramebuffer.length;fe++)s.deleteFramebuffer(A.__webglFramebuffer[fe]);else s.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&s.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let fe=0;fe<A.__webglColorRenderbuffer.length;fe++)A.__webglColorRenderbuffer[fe]&&s.deleteRenderbuffer(A.__webglColorRenderbuffer[fe]);A.__webglDepthRenderbuffer&&s.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const J=D.textures;for(let fe=0,xe=J.length;fe<xe;fe++){const he=n.get(J[fe]);he.__webglTexture&&(s.deleteTexture(he.__webglTexture),a.memory.textures--),n.remove(J[fe])}n.remove(D)}let R=0;function z(){R=0}function k(){const D=R;return D>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+i.maxTextures),R+=1,D}function X(D){const A=[];return A.push(D.wrapS),A.push(D.wrapT),A.push(D.wrapR||0),A.push(D.magFilter),A.push(D.minFilter),A.push(D.anisotropy),A.push(D.internalFormat),A.push(D.format),A.push(D.type),A.push(D.generateMipmaps),A.push(D.premultiplyAlpha),A.push(D.flipY),A.push(D.unpackAlignment),A.push(D.colorSpace),A.join()}function ae(D,A){const J=n.get(D);if(D.isVideoTexture&&rt(D),D.isRenderTargetTexture===!1&&D.version>0&&J.__version!==D.version){const fe=D.image;if(fe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(fe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ie(J,D,A);return}}t.bindTexture(s.TEXTURE_2D,J.__webglTexture,s.TEXTURE0+A)}function I(D,A){const J=n.get(D);if(D.version>0&&J.__version!==D.version){ie(J,D,A);return}t.bindTexture(s.TEXTURE_2D_ARRAY,J.__webglTexture,s.TEXTURE0+A)}function j(D,A){const J=n.get(D);if(D.version>0&&J.__version!==D.version){ie(J,D,A);return}t.bindTexture(s.TEXTURE_3D,J.__webglTexture,s.TEXTURE0+A)}function G(D,A){const J=n.get(D);if(D.version>0&&J.__version!==D.version){pe(J,D,A);return}t.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture,s.TEXTURE0+A)}const ce={1e3:s.REPEAT,1001:s.CLAMP_TO_EDGE,1002:s.MIRRORED_REPEAT},Y={1003:s.NEAREST,1004:s.NEAREST_MIPMAP_NEAREST,1005:s.NEAREST_MIPMAP_LINEAR,1006:s.LINEAR,1007:s.LINEAR_MIPMAP_NEAREST,1008:s.LINEAR_MIPMAP_LINEAR},Q={512:s.NEVER,519:s.ALWAYS,513:s.LESS,515:s.LEQUAL,514:s.EQUAL,518:s.GEQUAL,516:s.GREATER,517:s.NOTEQUAL};function Se(D,A){if(A.type===1015&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===1006||A.magFilter===1007||A.magFilter===1005||A.magFilter===1008||A.minFilter===1006||A.minFilter===1007||A.minFilter===1005||A.minFilter===1008)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(D,s.TEXTURE_WRAP_S,ce[A.wrapS]),s.texParameteri(D,s.TEXTURE_WRAP_T,ce[A.wrapT]),(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)&&s.texParameteri(D,s.TEXTURE_WRAP_R,ce[A.wrapR]),s.texParameteri(D,s.TEXTURE_MAG_FILTER,Y[A.magFilter]),s.texParameteri(D,s.TEXTURE_MIN_FILTER,Y[A.minFilter]),A.compareFunction&&(s.texParameteri(D,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(D,s.TEXTURE_COMPARE_FUNC,Q[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===1003||A.minFilter!==1005&&A.minFilter!==1008||A.type===1015&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const J=e.get("EXT_texture_filter_anisotropic");s.texParameterf(D,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function De(D,A){let J=!1;D.__webglInit===void 0&&(D.__webglInit=!0,A.addEventListener("dispose",w));const fe=A.source;let xe=d.get(fe);xe===void 0&&(xe={},d.set(fe,xe));const he=X(A);if(he!==D.__cacheKey){xe[he]===void 0&&(xe[he]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,J=!0),xe[he].usedTimes++;const $e=xe[D.__cacheKey];$e!==void 0&&(xe[D.__cacheKey].usedTimes--,$e.usedTimes===0&&v(A)),D.__cacheKey=he,D.__webglTexture=xe[he].texture}return J}function ie(D,A,J){let fe=s.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(fe=s.TEXTURE_2D_ARRAY),A.isData3DTexture&&(fe=s.TEXTURE_3D);const xe=De(D,A),he=A.source;t.bindTexture(fe,D.__webglTexture,s.TEXTURE0+J);const $e=n.get(he);if(he.version!==$e.__version||xe===!0){t.activeTexture(s.TEXTURE0+J);const Pe=Xt.getPrimaries(Xt.workingColorSpace),Ne=A.colorSpace===""?null:Xt.getPrimaries(A.colorSpace),wt=A.colorSpace===""||Pe===Ne?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);let we=b(A.image,!1,i.maxTextureSize);we=Ft(A,we);const Oe=r.convert(A.format,A.colorSpace),Xe=r.convert(A.type);let dt=y(A.internalFormat,Oe,Xe,A.colorSpace,A.isVideoTexture);Se(fe,A);let Ve;const Ct=A.mipmaps,vt=A.isVideoTexture!==!0,Bt=$e.__version===void 0||xe===!0,V=he.dataReady,Ue=P(A,we);if(A.isDepthTexture)dt=_(A.format===1027,A.type),Bt&&(vt?t.texStorage2D(s.TEXTURE_2D,1,dt,we.width,we.height):t.texImage2D(s.TEXTURE_2D,0,dt,we.width,we.height,0,Oe,Xe,null));else if(A.isDataTexture)if(Ct.length>0){vt&&Bt&&t.texStorage2D(s.TEXTURE_2D,Ue,dt,Ct[0].width,Ct[0].height);for(let le=0,be=Ct.length;le<be;le++)Ve=Ct[le],vt?V&&t.texSubImage2D(s.TEXTURE_2D,le,0,0,Ve.width,Ve.height,Oe,Xe,Ve.data):t.texImage2D(s.TEXTURE_2D,le,dt,Ve.width,Ve.height,0,Oe,Xe,Ve.data);A.generateMipmaps=!1}else vt?(Bt&&t.texStorage2D(s.TEXTURE_2D,Ue,dt,we.width,we.height),V&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,we.width,we.height,Oe,Xe,we.data)):t.texImage2D(s.TEXTURE_2D,0,dt,we.width,we.height,0,Oe,Xe,we.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){vt&&Bt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ue,dt,Ct[0].width,Ct[0].height,we.depth);for(let le=0,be=Ct.length;le<be;le++)if(Ve=Ct[le],A.format!==1023)if(Oe!==null)if(vt){if(V)if(A.layerUpdates.size>0){const ze=kc(Ve.width,Ve.height,A.format,A.type);for(const Be of A.layerUpdates){const nt=Ve.data.subarray(Be*ze/Ve.data.BYTES_PER_ELEMENT,(Be+1)*ze/Ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,le,0,0,Be,Ve.width,Ve.height,1,Oe,nt)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,le,0,0,0,Ve.width,Ve.height,we.depth,Oe,Ve.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,le,dt,Ve.width,Ve.height,we.depth,0,Ve.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else vt?V&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,le,0,0,0,Ve.width,Ve.height,we.depth,Oe,Xe,Ve.data):t.texImage3D(s.TEXTURE_2D_ARRAY,le,dt,Ve.width,Ve.height,we.depth,0,Oe,Xe,Ve.data)}else{vt&&Bt&&t.texStorage2D(s.TEXTURE_2D,Ue,dt,Ct[0].width,Ct[0].height);for(let le=0,be=Ct.length;le<be;le++)Ve=Ct[le],A.format!==1023?Oe!==null?vt?V&&t.compressedTexSubImage2D(s.TEXTURE_2D,le,0,0,Ve.width,Ve.height,Oe,Ve.data):t.compressedTexImage2D(s.TEXTURE_2D,le,dt,Ve.width,Ve.height,0,Ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):vt?V&&t.texSubImage2D(s.TEXTURE_2D,le,0,0,Ve.width,Ve.height,Oe,Xe,Ve.data):t.texImage2D(s.TEXTURE_2D,le,dt,Ve.width,Ve.height,0,Oe,Xe,Ve.data)}else if(A.isDataArrayTexture)if(vt){if(Bt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ue,dt,we.width,we.height,we.depth),V)if(A.layerUpdates.size>0){const le=kc(we.width,we.height,A.format,A.type);for(const be of A.layerUpdates){const ze=we.data.subarray(be*le/we.data.BYTES_PER_ELEMENT,(be+1)*le/we.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,be,we.width,we.height,1,Oe,Xe,ze)}A.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,we.width,we.height,we.depth,Oe,Xe,we.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,dt,we.width,we.height,we.depth,0,Oe,Xe,we.data);else if(A.isData3DTexture)vt?(Bt&&t.texStorage3D(s.TEXTURE_3D,Ue,dt,we.width,we.height,we.depth),V&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,we.width,we.height,we.depth,Oe,Xe,we.data)):t.texImage3D(s.TEXTURE_3D,0,dt,we.width,we.height,we.depth,0,Oe,Xe,we.data);else if(A.isFramebufferTexture){if(Bt)if(vt)t.texStorage2D(s.TEXTURE_2D,Ue,dt,we.width,we.height);else{let le=we.width,be=we.height;for(let ze=0;ze<Ue;ze++)t.texImage2D(s.TEXTURE_2D,ze,dt,le,be,0,Oe,Xe,null),le>>=1,be>>=1}}else if(Ct.length>0){if(vt&&Bt){const le=Ye(Ct[0]);t.texStorage2D(s.TEXTURE_2D,Ue,dt,le.width,le.height)}for(let le=0,be=Ct.length;le<be;le++)Ve=Ct[le],vt?V&&t.texSubImage2D(s.TEXTURE_2D,le,0,0,Oe,Xe,Ve):t.texImage2D(s.TEXTURE_2D,le,dt,Oe,Xe,Ve);A.generateMipmaps=!1}else if(vt){if(Bt){const le=Ye(we);t.texStorage2D(s.TEXTURE_2D,Ue,dt,le.width,le.height)}V&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Oe,Xe,we)}else t.texImage2D(s.TEXTURE_2D,0,dt,Oe,Xe,we);m(A)&&p(fe),$e.__version=he.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function pe(D,A,J){if(A.image.length!==6)return;const fe=De(D,A),xe=A.source;t.bindTexture(s.TEXTURE_CUBE_MAP,D.__webglTexture,s.TEXTURE0+J);const he=n.get(xe);if(xe.version!==he.__version||fe===!0){t.activeTexture(s.TEXTURE0+J);const $e=Xt.getPrimaries(Xt.workingColorSpace),Pe=A.colorSpace===""?null:Xt.getPrimaries(A.colorSpace),Ne=A.colorSpace===""||$e===Pe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);const wt=A.isCompressedTexture||A.image[0].isCompressedTexture,we=A.image[0]&&A.image[0].isDataTexture,Oe=[];for(let be=0;be<6;be++)!wt&&!we?Oe[be]=b(A.image[be],!0,i.maxCubemapSize):Oe[be]=we?A.image[be].image:A.image[be],Oe[be]=Ft(A,Oe[be]);const Xe=Oe[0],dt=r.convert(A.format,A.colorSpace),Ve=r.convert(A.type),Ct=y(A.internalFormat,dt,Ve,A.colorSpace),vt=A.isVideoTexture!==!0,Bt=he.__version===void 0||fe===!0,V=xe.dataReady;let Ue=P(A,Xe);Se(s.TEXTURE_CUBE_MAP,A);let le;if(wt){vt&&Bt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Ue,Ct,Xe.width,Xe.height);for(let be=0;be<6;be++){le=Oe[be].mipmaps;for(let ze=0;ze<le.length;ze++){const Be=le[ze];A.format!==1023?dt!==null?vt?V&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,ze,0,0,Be.width,Be.height,dt,Be.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,ze,Ct,Be.width,Be.height,0,Be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):vt?V&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,ze,0,0,Be.width,Be.height,dt,Ve,Be.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,ze,Ct,Be.width,Be.height,0,dt,Ve,Be.data)}}}else{if(le=A.mipmaps,vt&&Bt){le.length>0&&Ue++;const be=Ye(Oe[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Ue,Ct,be.width,be.height)}for(let be=0;be<6;be++)if(we){vt?V&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,Oe[be].width,Oe[be].height,dt,Ve,Oe[be].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,Ct,Oe[be].width,Oe[be].height,0,dt,Ve,Oe[be].data);for(let ze=0;ze<le.length;ze++){const nt=le[ze].image[be].image;vt?V&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,ze+1,0,0,nt.width,nt.height,dt,Ve,nt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,ze+1,Ct,nt.width,nt.height,0,dt,Ve,nt.data)}}else{vt?V&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,dt,Ve,Oe[be]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,Ct,dt,Ve,Oe[be]);for(let ze=0;ze<le.length;ze++){const Be=le[ze];vt?V&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,ze+1,0,0,dt,Ve,Be.image[be]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,ze+1,Ct,dt,Ve,Be.image[be])}}}m(A)&&p(s.TEXTURE_CUBE_MAP),he.__version=xe.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function Fe(D,A,J,fe,xe,he){const $e=r.convert(J.format,J.colorSpace),Pe=r.convert(J.type),Ne=y(J.internalFormat,$e,Pe,J.colorSpace),wt=n.get(A),we=n.get(J);if(we.__renderTarget=A,!wt.__hasExternalTextures){const Oe=Math.max(1,A.width>>he),Xe=Math.max(1,A.height>>he);xe===s.TEXTURE_3D||xe===s.TEXTURE_2D_ARRAY?t.texImage3D(xe,he,Ne,Oe,Xe,A.depth,0,$e,Pe,null):t.texImage2D(xe,he,Ne,Oe,Xe,0,$e,Pe,null)}t.bindFramebuffer(s.FRAMEBUFFER,D),Mt(A)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,fe,xe,we.__webglTexture,0,Tt(A)):(xe===s.TEXTURE_2D||xe>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&xe<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,fe,xe,we.__webglTexture,he),t.bindFramebuffer(s.FRAMEBUFFER,null)}function ye(D,A,J){if(s.bindRenderbuffer(s.RENDERBUFFER,D),A.depthBuffer){const fe=A.depthTexture,xe=fe&&fe.isDepthTexture?fe.type:null,he=_(A.stencilBuffer,xe),$e=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Pe=Tt(A);Mt(A)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Pe,he,A.width,A.height):J?s.renderbufferStorageMultisample(s.RENDERBUFFER,Pe,he,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,he,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,$e,s.RENDERBUFFER,D)}else{const fe=A.textures;for(let xe=0;xe<fe.length;xe++){const he=fe[xe],$e=r.convert(he.format,he.colorSpace),Pe=r.convert(he.type),Ne=y(he.internalFormat,$e,Pe,he.colorSpace),wt=Tt(A);J&&Mt(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,wt,Ne,A.width,A.height):Mt(A)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,wt,Ne,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,Ne,A.width,A.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ht(D,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,D),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const fe=n.get(A.depthTexture);fe.__renderTarget=A,(!fe.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),ae(A.depthTexture,0);const xe=fe.__webglTexture,he=Tt(A);if(A.depthTexture.format===1026)Mt(A)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,xe,0,he):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,xe,0);else if(A.depthTexture.format===1027)Mt(A)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,xe,0,he):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,xe,0);else throw new Error("Unknown depthTexture format")}function ut(D){const A=n.get(D),J=D.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==D.depthTexture){const fe=D.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),fe){const xe=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,fe.removeEventListener("dispose",xe)};fe.addEventListener("dispose",xe),A.__depthDisposeCallback=xe}A.__boundDepthTexture=fe}if(D.depthTexture&&!A.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");ht(A.__webglFramebuffer,D)}else if(J){A.__webglDepthbuffer=[];for(let fe=0;fe<6;fe++)if(t.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer[fe]),A.__webglDepthbuffer[fe]===void 0)A.__webglDepthbuffer[fe]=s.createRenderbuffer(),ye(A.__webglDepthbuffer[fe],D,!1);else{const xe=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,he=A.__webglDepthbuffer[fe];s.bindRenderbuffer(s.RENDERBUFFER,he),s.framebufferRenderbuffer(s.FRAMEBUFFER,xe,s.RENDERBUFFER,he)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=s.createRenderbuffer(),ye(A.__webglDepthbuffer,D,!1);else{const fe=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,xe=A.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,xe),s.framebufferRenderbuffer(s.FRAMEBUFFER,fe,s.RENDERBUFFER,xe)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function pt(D,A,J){const fe=n.get(D);A!==void 0&&Fe(fe.__webglFramebuffer,D,D.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),J!==void 0&&ut(D)}function At(D){const A=D.texture,J=n.get(D),fe=n.get(A);D.addEventListener("dispose",C);const xe=D.textures,he=D.isWebGLCubeRenderTarget===!0,$e=xe.length>1;if($e||(fe.__webglTexture===void 0&&(fe.__webglTexture=s.createTexture()),fe.__version=A.version,a.memory.textures++),he){J.__webglFramebuffer=[];for(let Pe=0;Pe<6;Pe++)if(A.mipmaps&&A.mipmaps.length>0){J.__webglFramebuffer[Pe]=[];for(let Ne=0;Ne<A.mipmaps.length;Ne++)J.__webglFramebuffer[Pe][Ne]=s.createFramebuffer()}else J.__webglFramebuffer[Pe]=s.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){J.__webglFramebuffer=[];for(let Pe=0;Pe<A.mipmaps.length;Pe++)J.__webglFramebuffer[Pe]=s.createFramebuffer()}else J.__webglFramebuffer=s.createFramebuffer();if($e)for(let Pe=0,Ne=xe.length;Pe<Ne;Pe++){const wt=n.get(xe[Pe]);wt.__webglTexture===void 0&&(wt.__webglTexture=s.createTexture(),a.memory.textures++)}if(D.samples>0&&Mt(D)===!1){J.__webglMultisampledFramebuffer=s.createFramebuffer(),J.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let Pe=0;Pe<xe.length;Pe++){const Ne=xe[Pe];J.__webglColorRenderbuffer[Pe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,J.__webglColorRenderbuffer[Pe]);const wt=r.convert(Ne.format,Ne.colorSpace),we=r.convert(Ne.type),Oe=y(Ne.internalFormat,wt,we,Ne.colorSpace,D.isXRRenderTarget===!0),Xe=Tt(D);s.renderbufferStorageMultisample(s.RENDERBUFFER,Xe,Oe,D.width,D.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Pe,s.RENDERBUFFER,J.__webglColorRenderbuffer[Pe])}s.bindRenderbuffer(s.RENDERBUFFER,null),D.depthBuffer&&(J.__webglDepthRenderbuffer=s.createRenderbuffer(),ye(J.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(he){t.bindTexture(s.TEXTURE_CUBE_MAP,fe.__webglTexture),Se(s.TEXTURE_CUBE_MAP,A);for(let Pe=0;Pe<6;Pe++)if(A.mipmaps&&A.mipmaps.length>0)for(let Ne=0;Ne<A.mipmaps.length;Ne++)Fe(J.__webglFramebuffer[Pe][Ne],D,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,Ne);else Fe(J.__webglFramebuffer[Pe],D,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0);m(A)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if($e){for(let Pe=0,Ne=xe.length;Pe<Ne;Pe++){const wt=xe[Pe],we=n.get(wt);t.bindTexture(s.TEXTURE_2D,we.__webglTexture),Se(s.TEXTURE_2D,wt),Fe(J.__webglFramebuffer,D,wt,s.COLOR_ATTACHMENT0+Pe,s.TEXTURE_2D,0),m(wt)&&p(s.TEXTURE_2D)}t.unbindTexture()}else{let Pe=s.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Pe=D.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Pe,fe.__webglTexture),Se(Pe,A),A.mipmaps&&A.mipmaps.length>0)for(let Ne=0;Ne<A.mipmaps.length;Ne++)Fe(J.__webglFramebuffer[Ne],D,A,s.COLOR_ATTACHMENT0,Pe,Ne);else Fe(J.__webglFramebuffer,D,A,s.COLOR_ATTACHMENT0,Pe,0);m(A)&&p(Pe),t.unbindTexture()}D.depthBuffer&&ut(D)}function yt(D){const A=D.textures;for(let J=0,fe=A.length;J<fe;J++){const xe=A[J];if(m(xe)){const he=x(D),$e=n.get(xe).__webglTexture;t.bindTexture(he,$e),p(he),t.unbindTexture()}}}const St=[],q=[];function $t(D){if(D.samples>0){if(Mt(D)===!1){const A=D.textures,J=D.width,fe=D.height;let xe=s.COLOR_BUFFER_BIT;const he=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,$e=n.get(D),Pe=A.length>1;if(Pe)for(let Ne=0;Ne<A.length;Ne++)t.bindFramebuffer(s.FRAMEBUFFER,$e.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ne,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,$e.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ne,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,$e.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,$e.__webglFramebuffer);for(let Ne=0;Ne<A.length;Ne++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(xe|=s.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(xe|=s.STENCIL_BUFFER_BIT)),Pe){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,$e.__webglColorRenderbuffer[Ne]);const wt=n.get(A[Ne]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,wt,0)}s.blitFramebuffer(0,0,J,fe,0,0,J,fe,xe,s.NEAREST),c===!0&&(St.length=0,q.length=0,St.push(s.COLOR_ATTACHMENT0+Ne),D.depthBuffer&&D.resolveDepthBuffer===!1&&(St.push(he),q.push(he),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,q)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,St))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Pe)for(let Ne=0;Ne<A.length;Ne++){t.bindFramebuffer(s.FRAMEBUFFER,$e.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ne,s.RENDERBUFFER,$e.__webglColorRenderbuffer[Ne]);const wt=n.get(A[Ne]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,$e.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ne,s.TEXTURE_2D,wt,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,$e.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&c){const A=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[A])}}}function Tt(D){return Math.min(i.maxSamples,D.samples)}function Mt(D){const A=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function rt(D){const A=a.render.frame;u.get(D)!==A&&(u.set(D,A),D.update())}function Ft(D,A){const J=D.colorSpace,fe=D.format,xe=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||J!==Hn&&J!==""&&(Xt.getTransfer(J)===an?(fe!==1023||xe!==1009)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",J)),A}function Ye(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=z,this.setTexture2D=ae,this.setTexture2DArray=I,this.setTexture3D=j,this.setTextureCube=G,this.rebindTextures=pt,this.setupRenderTarget=At,this.updateRenderTargetMipmap=yt,this.updateMultisampleRenderTarget=$t,this.setupDepthRenderbuffer=ut,this.setupFrameBufferTexture=Fe,this.useMultisampledRTT=Mt}function Hm(s,e){function t(n,i=""){let r;const a=Xt.getTransfer(i);if(n===1009)return s.UNSIGNED_BYTE;if(n===1017)return s.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return s.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===1010)return s.BYTE;if(n===1011)return s.SHORT;if(n===1012)return s.UNSIGNED_SHORT;if(n===1013)return s.INT;if(n===1014)return s.UNSIGNED_INT;if(n===1015)return s.FLOAT;if(n===1016)return s.HALF_FLOAT;if(n===1021)return s.ALPHA;if(n===1022)return s.RGB;if(n===1023)return s.RGBA;if(n===1024)return s.LUMINANCE;if(n===1025)return s.LUMINANCE_ALPHA;if(n===1026)return s.DEPTH_COMPONENT;if(n===1027)return s.DEPTH_STENCIL;if(n===1028)return s.RED;if(n===1029)return s.RED_INTEGER;if(n===1030)return s.RG;if(n===1031)return s.RG_INTEGER;if(n===1033)return s.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===an)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===33776)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===33776)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===35840)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===36196||n===37492)return a===an?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===37496)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===37808)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===36492)return a===an?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===36492)return r.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class Vm extends jn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class gt extends dn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Wm={type:"move"};class Za{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const b of e.hand.values()){const m=t.getJointPose(b,n),p=this._getHandJoint(l,b);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Wm)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new gt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Xm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jm=`
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

}`;class qm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Sn,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ns({vertexShader:Xm,fragmentShader:jm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Je(new qn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Km extends gs{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,d=null,f=null,g=null;const b=new qm,m=t.getContextAttributes();let p=null,x=null;const y=[],_=[],P=new He;let w=null;const C=new jn;C.viewport=new jt;const S=new jn;S.viewport=new jt;const v=[C,S],M=new Vm;let R=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let pe=y[ie];return pe===void 0&&(pe=new Za,y[ie]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(ie){let pe=y[ie];return pe===void 0&&(pe=new Za,y[ie]=pe),pe.getGripSpace()},this.getHand=function(ie){let pe=y[ie];return pe===void 0&&(pe=new Za,y[ie]=pe),pe.getHandSpace()};function k(ie){const pe=_.indexOf(ie.inputSource);if(pe===-1)return;const Fe=y[pe];Fe!==void 0&&(Fe.update(ie.inputSource,ie.frame,l||a),Fe.dispatchEvent({type:ie.type,data:ie.inputSource}))}function X(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",ae);for(let ie=0;ie<y.length;ie++){const pe=_[ie];pe!==null&&(_[ie]=null,y[ie].disconnect(pe))}R=null,z=null,b.reset(),e.setRenderTarget(p),f=null,d=null,h=null,i=null,x=null,De.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){r=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){o=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ie){l=ie},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(ie){if(i=ie,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",X),i.addEventListener("inputsourceschange",ae),m.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(P),i.renderState.layers===void 0){const pe={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,pe),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new ts(f.framebufferWidth,f.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let pe=null,Fe=null,ye=null;m.depth&&(ye=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=m.stencil?1027:1026,Fe=m.stencil?1020:1014);const ht={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};h=new XRWebGLBinding(i,t),d=h.createProjectionLayer(ht),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new ts(d.textureWidth,d.textureHeight,{format:1023,type:1009,depthTexture:new zl(d.textureWidth,d.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),De.setContext(i),De.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return b.getDepthTexture()};function ae(ie){for(let pe=0;pe<ie.removed.length;pe++){const Fe=ie.removed[pe],ye=_.indexOf(Fe);ye>=0&&(_[ye]=null,y[ye].disconnect(Fe))}for(let pe=0;pe<ie.added.length;pe++){const Fe=ie.added[pe];let ye=_.indexOf(Fe);if(ye===-1){for(let ut=0;ut<y.length;ut++)if(ut>=_.length){_.push(Fe),ye=ut;break}else if(_[ut]===null){_[ut]=Fe,ye=ut;break}if(ye===-1)break}const ht=y[ye];ht&&ht.connect(Fe)}}const I=new F,j=new F;function G(ie,pe,Fe){I.setFromMatrixPosition(pe.matrixWorld),j.setFromMatrixPosition(Fe.matrixWorld);const ye=I.distanceTo(j),ht=pe.projectionMatrix.elements,ut=Fe.projectionMatrix.elements,pt=ht[14]/(ht[10]-1),At=ht[14]/(ht[10]+1),yt=(ht[9]+1)/ht[5],St=(ht[9]-1)/ht[5],q=(ht[8]-1)/ht[0],$t=(ut[8]+1)/ut[0],Tt=pt*q,Mt=pt*$t,rt=ye/(-q+$t),Ft=rt*-q;if(pe.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(Ft),ie.translateZ(rt),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert(),ht[10]===-1)ie.projectionMatrix.copy(pe.projectionMatrix),ie.projectionMatrixInverse.copy(pe.projectionMatrixInverse);else{const Ye=pt+rt,D=At+rt,A=Tt-Ft,J=Mt+(ye-Ft),fe=yt*At/D*Ye,xe=St*At/D*Ye;ie.projectionMatrix.makePerspective(A,J,fe,xe,Ye,D),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}}function ce(ie,pe){pe===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(pe.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(i===null)return;let pe=ie.near,Fe=ie.far;b.texture!==null&&(b.depthNear>0&&(pe=b.depthNear),b.depthFar>0&&(Fe=b.depthFar)),M.near=S.near=C.near=pe,M.far=S.far=C.far=Fe,(R!==M.near||z!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),R=M.near,z=M.far),C.layers.mask=ie.layers.mask|2,S.layers.mask=ie.layers.mask|4,M.layers.mask=C.layers.mask|S.layers.mask;const ye=ie.parent,ht=M.cameras;ce(M,ye);for(let ut=0;ut<ht.length;ut++)ce(ht[ut],ye);ht.length===2?G(M,C,S):M.projectionMatrix.copy(C.projectionMatrix),Y(ie,M,ye)};function Y(ie,pe,Fe){Fe===null?ie.matrix.copy(pe.matrixWorld):(ie.matrix.copy(Fe.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(pe.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(pe.projectionMatrix),ie.projectionMatrixInverse.copy(pe.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=zs*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(ie){c=ie,d!==null&&(d.fixedFoveation=ie),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ie)},this.hasDepthSensing=function(){return b.texture!==null},this.getDepthSensingMesh=function(){return b.getMesh(M)};let Q=null;function Se(ie,pe){if(u=pe.getViewerPose(l||a),g=pe,u!==null){const Fe=u.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let ye=!1;Fe.length!==M.cameras.length&&(M.cameras.length=0,ye=!0);for(let ut=0;ut<Fe.length;ut++){const pt=Fe[ut];let At=null;if(f!==null)At=f.getViewport(pt);else{const St=h.getViewSubImage(d,pt);At=St.viewport,ut===0&&(e.setRenderTargetTextures(x,St.colorTexture,d.ignoreDepthValues?void 0:St.depthStencilTexture),e.setRenderTarget(x))}let yt=v[ut];yt===void 0&&(yt=new jn,yt.layers.enable(ut),yt.viewport=new jt,v[ut]=yt),yt.matrix.fromArray(pt.transform.matrix),yt.matrix.decompose(yt.position,yt.quaternion,yt.scale),yt.projectionMatrix.fromArray(pt.projectionMatrix),yt.projectionMatrixInverse.copy(yt.projectionMatrix).invert(),yt.viewport.set(At.x,At.y,At.width,At.height),ut===0&&(M.matrix.copy(yt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ye===!0&&M.cameras.push(yt)}const ht=i.enabledFeatures;if(ht&&ht.includes("depth-sensing")){const ut=h.getDepthInformation(Fe[0]);ut&&ut.isValid&&ut.texture&&b.init(e,ut,i.renderState)}}for(let Fe=0;Fe<y.length;Fe++){const ye=_[Fe],ht=y[Fe];ye!==null&&ht!==void 0&&ht.update(ye,pe,l||a)}Q&&Q(ie,pe),pe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:pe}),g=null}const De=new kl;De.setAnimationLoop(Se),this.setAnimationLoop=function(ie){Q=ie},this.dispose=function(){}}}const cs=new ni,Ym=new lt;function Jm(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Ul(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,x,y,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),b(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,x,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===1&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===1&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p),y=x.envMap,_=x.envMapRotation;y&&(m.envMap.value=y,cs.copy(_),cs.x*=-1,cs.y*=-1,cs.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(cs.y*=-1,cs.z*=-1),m.envMapRotation.value.setFromMatrix4(Ym.makeRotationFromEuler(cs)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,x,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===1&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function b(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Zm(s,e,t,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,y){const _=y.program;n.uniformBlockBinding(x,_)}function l(x,y){let _=i[x.id];_===void 0&&(g(x),_=u(x),i[x.id]=_,x.addEventListener("dispose",m));const P=y.program;n.updateUBOMapping(x,P);const w=e.render.frame;r[x.id]!==w&&(d(x),r[x.id]=w)}function u(x){const y=h();x.__bindingPointIndex=y;const _=s.createBuffer(),P=x.__size,w=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,_),s.bufferData(s.UNIFORM_BUFFER,P,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,_),_}function h(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const y=i[x.id],_=x.uniforms,P=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let w=0,C=_.length;w<C;w++){const S=Array.isArray(_[w])?_[w]:[_[w]];for(let v=0,M=S.length;v<M;v++){const R=S[v];if(f(R,w,v,P)===!0){const z=R.__offset,k=Array.isArray(R.value)?R.value:[R.value];let X=0;for(let ae=0;ae<k.length;ae++){const I=k[ae],j=b(I);typeof I=="number"||typeof I=="boolean"?(R.__data[0]=I,s.bufferSubData(s.UNIFORM_BUFFER,z+X,R.__data)):I.isMatrix3?(R.__data[0]=I.elements[0],R.__data[1]=I.elements[1],R.__data[2]=I.elements[2],R.__data[3]=0,R.__data[4]=I.elements[3],R.__data[5]=I.elements[4],R.__data[6]=I.elements[5],R.__data[7]=0,R.__data[8]=I.elements[6],R.__data[9]=I.elements[7],R.__data[10]=I.elements[8],R.__data[11]=0):(I.toArray(R.__data,X),X+=j.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,z,R.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,y,_,P){const w=x.value,C=y+"_"+_;if(P[C]===void 0)return typeof w=="number"||typeof w=="boolean"?P[C]=w:P[C]=w.clone(),!0;{const S=P[C];if(typeof w=="number"||typeof w=="boolean"){if(S!==w)return P[C]=w,!0}else if(S.equals(w)===!1)return S.copy(w),!0}return!1}function g(x){const y=x.uniforms;let _=0;const P=16;for(let C=0,S=y.length;C<S;C++){const v=Array.isArray(y[C])?y[C]:[y[C]];for(let M=0,R=v.length;M<R;M++){const z=v[M],k=Array.isArray(z.value)?z.value:[z.value];for(let X=0,ae=k.length;X<ae;X++){const I=k[X],j=b(I),G=_%P,ce=G%j.boundary,Y=G+ce;_+=ce,Y!==0&&P-Y<j.storage&&(_+=P-Y),z.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=_,_+=j.storage}}}const w=_%P;return w>0&&(_+=P-w),x.__size=_,x.__cache={},this}function b(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),y}function m(x){const y=x.target;y.removeEventListener("dispose",m);const _=a.indexOf(y.__bindingPointIndex);a.splice(_,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function p(){for(const x in i)s.deleteBuffer(i[x]);a=[],i={},r={}}return{bind:c,update:l,dispose:p}}class Qm{constructor(e={}){const{canvas:t=kh(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),b=new Int32Array(4);let m=null,p=null;const x=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=qt,this.toneMapping=0,this.toneMappingExposure=1;const _=this;let P=!1,w=0,C=0,S=null,v=-1,M=null;const R=new jt,z=new jt;let k=null;const X=new ot(0);let ae=0,I=t.width,j=t.height,G=1,ce=null,Y=null;const Q=new jt(0,0,I,j),Se=new jt(0,0,I,j);let De=!1;const ie=new Io;let pe=!1,Fe=!1;const ye=new lt,ht=new lt,ut=new F,pt=new jt,At={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let yt=!1;function St(){return S===null?G:1}let q=n;function $t(T,K){return t.getContext(T,K)}try{const T={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r170"),t.addEventListener("webglcontextlost",be,!1),t.addEventListener("webglcontextrestored",ze,!1),t.addEventListener("webglcontextcreationerror",Be,!1),q===null){const K="webgl2";if(q=$t(K,T),q===null)throw $t(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Tt,Mt,rt,Ft,Ye,D,A,J,fe,xe,he,$e,Pe,Ne,wt,we,Oe,Xe,dt,Ve,Ct,vt,Bt,V;function Ue(){Tt=new ip(q),Tt.init(),vt=new Hm(q,Tt),Mt=new Zf(q,Tt,e,vt),rt=new km(q,Tt),Mt.reverseDepthBuffer&&d&&rt.buffers.depth.setReversed(!0),Ft=new ap(q),Ye=new Em,D=new Gm(q,Tt,rt,Ye,Mt,vt,Ft),A=new $f(_),J=new np(_),fe=new du(q),Bt=new Yf(q,fe),xe=new sp(q,fe,Ft,Bt),he=new cp(q,xe,fe,Ft),dt=new op(q,Mt,D),we=new Qf(Ye),$e=new Sm(_,A,J,Tt,Mt,Bt,we),Pe=new Jm(_,Ye),Ne=new wm,wt=new Im(Tt),Xe=new Kf(_,A,J,rt,he,f,c),Oe=new Om(_,he,Mt),V=new Zm(q,Ft,Mt,rt),Ve=new Jf(q,Tt,Ft),Ct=new rp(q,Tt,Ft),Ft.programs=$e.programs,_.capabilities=Mt,_.extensions=Tt,_.properties=Ye,_.renderLists=Ne,_.shadowMap=Oe,_.state=rt,_.info=Ft}Ue();const le=new Km(_,q);this.xr=le,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const T=Tt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Tt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(T){T!==void 0&&(G=T,this.setSize(I,j,!1))},this.getSize=function(T){return T.set(I,j)},this.setSize=function(T,K,se=!0){if(le.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=T,j=K,t.width=Math.floor(T*G),t.height=Math.floor(K*G),se===!0&&(t.style.width=T+"px",t.style.height=K+"px"),this.setViewport(0,0,T,K)},this.getDrawingBufferSize=function(T){return T.set(I*G,j*G).floor()},this.setDrawingBufferSize=function(T,K,se){I=T,j=K,G=se,t.width=Math.floor(T*se),t.height=Math.floor(K*se),this.setViewport(0,0,T,K)},this.getCurrentViewport=function(T){return T.copy(R)},this.getViewport=function(T){return T.copy(Q)},this.setViewport=function(T,K,se,$){T.isVector4?Q.set(T.x,T.y,T.z,T.w):Q.set(T,K,se,$),rt.viewport(R.copy(Q).multiplyScalar(G).round())},this.getScissor=function(T){return T.copy(Se)},this.setScissor=function(T,K,se,$){T.isVector4?Se.set(T.x,T.y,T.z,T.w):Se.set(T,K,se,$),rt.scissor(z.copy(Se).multiplyScalar(G).round())},this.getScissorTest=function(){return De},this.setScissorTest=function(T){rt.setScissorTest(De=T)},this.setOpaqueSort=function(T){ce=T},this.setTransparentSort=function(T){Y=T},this.getClearColor=function(T){return T.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor.apply(Xe,arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha.apply(Xe,arguments)},this.clear=function(T=!0,K=!0,se=!0){let $=0;if(T){let W=!1;if(S!==null){const Te=S.texture.format;W=Te===1033||Te===1031||Te===1029}if(W){const Te=S.texture.type,me=Te===1009||Te===1014||Te===1012||Te===1020||Te===1017||Te===1018,je=Xe.getClearColor(),et=Xe.getClearAlpha(),_t=je.r,xt=je.g,We=je.b;me?(g[0]=_t,g[1]=xt,g[2]=We,g[3]=et,q.clearBufferuiv(q.COLOR,0,g)):(b[0]=_t,b[1]=xt,b[2]=We,b[3]=et,q.clearBufferiv(q.COLOR,0,b))}else $|=q.COLOR_BUFFER_BIT}K&&($|=q.DEPTH_BUFFER_BIT),se&&($|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",be,!1),t.removeEventListener("webglcontextrestored",ze,!1),t.removeEventListener("webglcontextcreationerror",Be,!1),Ne.dispose(),wt.dispose(),Ye.dispose(),A.dispose(),J.dispose(),he.dispose(),Bt.dispose(),V.dispose(),$e.dispose(),le.dispose(),le.removeEventListener("sessionstart",mn),le.removeEventListener("sessionend",Pn),en.stop()};function be(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function ze(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const T=Ft.autoReset,K=Oe.enabled,se=Oe.autoUpdate,$=Oe.needsUpdate,W=Oe.type;Ue(),Ft.autoReset=T,Oe.enabled=K,Oe.autoUpdate=se,Oe.needsUpdate=$,Oe.type=W}function Be(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function nt(T){const K=T.target;K.removeEventListener("dispose",nt),Kt(K)}function Kt(T){hn(T),Ye.remove(T)}function hn(T){const K=Ye.get(T).programs;K!==void 0&&(K.forEach(function(se){$e.releaseProgram(se)}),T.isShaderMaterial&&$e.releaseShaderCache(T))}this.renderBufferDirect=function(T,K,se,$,W,Te){K===null&&(K=At);const me=W.isMesh&&W.matrixWorld.determinant()<0,je=xn(T,K,se,$,W);rt.setMaterial($,me);let et=se.index,_t=1;if($.wireframe===!0){if(et=xe.getWireframeAttribute(se),et===void 0)return;_t=2}const xt=se.drawRange,We=se.attributes.position;let It=xt.start*_t,kt=(xt.start+xt.count)*_t;Te!==null&&(It=Math.max(It,Te.start*_t),kt=Math.min(kt,(Te.start+Te.count)*_t)),et!==null?(It=Math.max(It,0),kt=Math.min(kt,et.count)):We!=null&&(It=Math.max(It,0),kt=Math.min(kt,We.count));const Lt=kt-It;if(Lt<0||Lt===1/0)return;Bt.setup(W,$,je,se,et);let Ze,Gt=Ve;if(et!==null&&(Ze=fe.get(et),Gt=Ct,Gt.setIndex(Ze)),W.isMesh)$.wireframe===!0?(rt.setLineWidth($.wireframeLinewidth*St()),Gt.setMode(q.LINES)):Gt.setMode(q.TRIANGLES);else if(W.isLine){let Ie=$.linewidth;Ie===void 0&&(Ie=1),rt.setLineWidth(Ie*St()),W.isLineSegments?Gt.setMode(q.LINES):W.isLineLoop?Gt.setMode(q.LINE_LOOP):Gt.setMode(q.LINE_STRIP)}else W.isPoints?Gt.setMode(q.POINTS):W.isSprite&&Gt.setMode(q.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)Gt.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(Tt.get("WEBGL_multi_draw"))Gt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Ie=W._multiDrawStarts,bt=W._multiDrawCounts,Et=W._multiDrawCount,Vt=et?fe.get(et).bytesPerElement:1,Ot=Ye.get($).currentProgram.getUniforms();for(let bn=0;bn<Et;bn++)Ot.setValue(q,"_gl_DrawID",bn),Gt.render(Ie[bn]/Vt,bt[bn])}else if(W.isInstancedMesh)Gt.renderInstances(It,Lt,W.count);else if(se.isInstancedBufferGeometry){const Ie=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,bt=Math.min(se.instanceCount,Ie);Gt.renderInstances(It,Lt,bt)}else Gt.render(It,Lt)};function Pt(T,K,se){T.transparent===!0&&T.side===2&&T.forceSinglePass===!1?(T.side=1,T.needsUpdate=!0,Yt(T,K,se),T.side=0,T.needsUpdate=!0,Yt(T,K,se),T.side=2):Yt(T,K,se)}this.compile=function(T,K,se=null){se===null&&(se=T),p=wt.get(se),p.init(K),y.push(p),se.traverseVisible(function(W){W.isLight&&W.layers.test(K.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),T!==se&&T.traverseVisible(function(W){W.isLight&&W.layers.test(K.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),p.setupLights();const $=new Set;return T.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const Te=W.material;if(Te)if(Array.isArray(Te))for(let me=0;me<Te.length;me++){const je=Te[me];Pt(je,se,W),$.add(je)}else Pt(Te,se,W),$.add(Te)}),y.pop(),p=null,$},this.compileAsync=function(T,K,se=null){const $=this.compile(T,K,se);return new Promise(W=>{function Te(){if($.forEach(function(me){Ye.get(me).currentProgram.isReady()&&$.delete(me)}),$.size===0){W(T);return}setTimeout(Te,10)}Tt.get("KHR_parallel_shader_compile")!==null?Te():setTimeout(Te,10)})};let ge=null;function _n(T){ge&&ge(T)}function mn(){en.stop()}function Pn(){en.start()}const en=new kl;en.setAnimationLoop(_n),typeof self<"u"&&en.setContext(self),this.setAnimationLoop=function(T){ge=T,le.setAnimationLoop(T),T===null?en.stop():en.start()},le.addEventListener("sessionstart",mn),le.addEventListener("sessionend",Pn),this.render=function(T,K){if(K!==void 0&&K.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(le.cameraAutoUpdate===!0&&le.updateCamera(K),K=le.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,K,S),p=wt.get(T,y.length),p.init(K),y.push(p),ht.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),ie.setFromProjectionMatrix(ht),Fe=this.localClippingEnabled,pe=we.init(this.clippingPlanes,Fe),m=Ne.get(T,x.length),m.init(),x.push(m),le.enabled===!0&&le.isPresenting===!0){const Te=_.xr.getDepthSensingMesh();Te!==null&&Yn(Te,K,-1/0,_.sortObjects)}Yn(T,K,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(ce,Y),yt=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,yt&&Xe.addToRenderList(m,T),this.info.render.frame++,pe===!0&&we.beginShadows();const se=p.state.shadowsArray;Oe.render(se,T,K),pe===!0&&we.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=m.opaque,W=m.transmissive;if(p.setupLights(),K.isArrayCamera){const Te=K.cameras;if(W.length>0)for(let me=0,je=Te.length;me<je;me++){const et=Te[me];fi($,W,T,et)}yt&&Xe.render(T);for(let me=0,je=Te.length;me<je;me++){const et=Te[me];Vn(m,T,et,et.viewport)}}else W.length>0&&fi($,W,T,K),yt&&Xe.render(T),Vn(m,T,K);S!==null&&(D.updateMultisampleRenderTarget(S),D.updateRenderTargetMipmap(S)),T.isScene===!0&&T.onAfterRender(_,T,K),Bt.resetDefaultState(),v=-1,M=null,y.pop(),y.length>0?(p=y[y.length-1],pe===!0&&we.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function Yn(T,K,se,$){if(T.visible===!1)return;if(T.layers.test(K.layers)){if(T.isGroup)se=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(K);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||ie.intersectsSprite(T)){$&&pt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ht);const me=he.update(T),je=T.material;je.visible&&m.push(T,me,je,se,pt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||ie.intersectsObject(T))){const me=he.update(T),je=T.material;if($&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),pt.copy(T.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),pt.copy(me.boundingSphere.center)),pt.applyMatrix4(T.matrixWorld).applyMatrix4(ht)),Array.isArray(je)){const et=me.groups;for(let _t=0,xt=et.length;_t<xt;_t++){const We=et[_t],It=je[We.materialIndex];It&&It.visible&&m.push(T,me,It,se,pt.z,We)}}else je.visible&&m.push(T,me,je,se,pt.z,null)}}const Te=T.children;for(let me=0,je=Te.length;me<je;me++)Yn(Te[me],K,se,$)}function Vn(T,K,se,$){const W=T.opaque,Te=T.transmissive,me=T.transparent;p.setupLightsView(se),pe===!0&&we.setGlobalState(_.clippingPlanes,se),$&&rt.viewport(R.copy($)),W.length>0&&En(W,K,se),Te.length>0&&En(Te,K,se),me.length>0&&En(me,K,se),rt.buffers.depth.setTest(!0),rt.buffers.depth.setMask(!0),rt.buffers.color.setMask(!0),rt.setPolygonOffset(!1)}function fi(T,K,se,$){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[$.id]===void 0&&(p.state.transmissionRenderTarget[$.id]=new ts(1,1,{generateMipmaps:!0,type:Tt.has("EXT_color_buffer_half_float")||Tt.has("EXT_color_buffer_float")?1016:1009,minFilter:1008,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xt.workingColorSpace}));const Te=p.state.transmissionRenderTarget[$.id],me=$.viewport||R;Te.setSize(me.z,me.w);const je=_.getRenderTarget();_.setRenderTarget(Te),_.getClearColor(X),ae=_.getClearAlpha(),ae<1&&_.setClearColor(16777215,.5),_.clear(),yt&&Xe.render(se);const et=_.toneMapping;_.toneMapping=0;const _t=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),p.setupLightsView($),pe===!0&&we.setGlobalState(_.clippingPlanes,$),En(T,se,$),D.updateMultisampleRenderTarget(Te),D.updateRenderTargetMipmap(Te),Tt.has("WEBGL_multisampled_render_to_texture")===!1){let xt=!1;for(let We=0,It=K.length;We<It;We++){const kt=K[We],Lt=kt.object,Ze=kt.geometry,Gt=kt.material,Ie=kt.group;if(Gt.side===2&&Lt.layers.test($.layers)){const bt=Gt.side;Gt.side=1,Gt.needsUpdate=!0,ii(Lt,se,$,Ze,Gt,Ie),Gt.side=bt,Gt.needsUpdate=!0,xt=!0}}xt===!0&&(D.updateMultisampleRenderTarget(Te),D.updateRenderTargetMipmap(Te))}_.setRenderTarget(je),_.setClearColor(X,ae),_t!==void 0&&($.viewport=_t),_.toneMapping=et}function En(T,K,se){const $=K.isScene===!0?K.overrideMaterial:null;for(let W=0,Te=T.length;W<Te;W++){const me=T[W],je=me.object,et=me.geometry,_t=$===null?me.material:$,xt=me.group;je.layers.test(se.layers)&&ii(je,K,se,et,_t,xt)}}function ii(T,K,se,$,W,Te){T.onBeforeRender(_,K,se,$,W,Te),T.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),W.onBeforeRender(_,K,se,$,T,Te),W.transparent===!0&&W.side===2&&W.forceSinglePass===!1?(W.side=1,W.needsUpdate=!0,_.renderBufferDirect(se,K,$,W,T,Te),W.side=0,W.needsUpdate=!0,_.renderBufferDirect(se,K,$,W,T,Te),W.side=2):_.renderBufferDirect(se,K,$,W,T,Te),T.onAfterRender(_,K,se,$,W,Te)}function Yt(T,K,se){K.isScene!==!0&&(K=At);const $=Ye.get(T),W=p.state.lights,Te=p.state.shadowsArray,me=W.state.version,je=$e.getParameters(T,W.state,Te,K,se),et=$e.getProgramCacheKey(je);let _t=$.programs;$.environment=T.isMeshStandardMaterial?K.environment:null,$.fog=K.fog,$.envMap=(T.isMeshStandardMaterial?J:A).get(T.envMap||$.environment),$.envMapRotation=$.environment!==null&&T.envMap===null?K.environmentRotation:T.envMapRotation,_t===void 0&&(T.addEventListener("dispose",nt),_t=new Map,$.programs=_t);let xt=_t.get(et);if(xt!==void 0){if($.currentProgram===xt&&$.lightsStateVersion===me)return si(T,je),xt}else je.uniforms=$e.getUniforms(T),T.onBeforeCompile(je,_),xt=$e.acquireProgram(je,et),_t.set(et,xt),$.uniforms=je.uniforms;const We=$.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(We.clippingPlanes=we.uniform),si(T,je),$.needsLights=Jn(T),$.lightsStateVersion=me,$.needsLights&&(We.ambientLightColor.value=W.state.ambient,We.lightProbe.value=W.state.probe,We.directionalLights.value=W.state.directional,We.directionalLightShadows.value=W.state.directionalShadow,We.spotLights.value=W.state.spot,We.spotLightShadows.value=W.state.spotShadow,We.rectAreaLights.value=W.state.rectArea,We.ltc_1.value=W.state.rectAreaLTC1,We.ltc_2.value=W.state.rectAreaLTC2,We.pointLights.value=W.state.point,We.pointLightShadows.value=W.state.pointShadow,We.hemisphereLights.value=W.state.hemi,We.directionalShadowMap.value=W.state.directionalShadowMap,We.directionalShadowMatrix.value=W.state.directionalShadowMatrix,We.spotShadowMap.value=W.state.spotShadowMap,We.spotLightMatrix.value=W.state.spotLightMatrix,We.spotLightMap.value=W.state.spotLightMap,We.pointShadowMap.value=W.state.pointShadowMap,We.pointShadowMatrix.value=W.state.pointShadowMatrix),$.currentProgram=xt,$.uniformsList=null,xt}function yi(T){if(T.uniformsList===null){const K=T.currentProgram.getUniforms();T.uniformsList=ha.seqWithValue(K.seq,T.uniforms)}return T.uniformsList}function si(T,K){const se=Ye.get(T);se.outputColorSpace=K.outputColorSpace,se.batching=K.batching,se.batchingColor=K.batchingColor,se.instancing=K.instancing,se.instancingColor=K.instancingColor,se.instancingMorph=K.instancingMorph,se.skinning=K.skinning,se.morphTargets=K.morphTargets,se.morphNormals=K.morphNormals,se.morphColors=K.morphColors,se.morphTargetsCount=K.morphTargetsCount,se.numClippingPlanes=K.numClippingPlanes,se.numIntersection=K.numClipIntersection,se.vertexAlphas=K.vertexAlphas,se.vertexTangents=K.vertexTangents,se.toneMapping=K.toneMapping}function xn(T,K,se,$,W){K.isScene!==!0&&(K=At),D.resetTextureUnits();const Te=K.fog,me=$.isMeshStandardMaterial?K.environment:null,je=S===null?_.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:Hn,et=($.isMeshStandardMaterial?J:A).get($.envMap||me),_t=$.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,xt=!!se.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),We=!!se.morphAttributes.position,It=!!se.morphAttributes.normal,kt=!!se.morphAttributes.color;let Lt=0;$.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(Lt=_.toneMapping);const Ze=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,Gt=Ze!==void 0?Ze.length:0,Ie=Ye.get($),bt=p.state.lights;if(pe===!0&&(Fe===!0||T!==M)){const gn=T===M&&$.id===v;we.setState($,T,gn)}let Et=!1;$.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==bt.state.version||Ie.outputColorSpace!==je||W.isBatchedMesh&&Ie.batching===!1||!W.isBatchedMesh&&Ie.batching===!0||W.isBatchedMesh&&Ie.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Ie.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Ie.instancing===!1||!W.isInstancedMesh&&Ie.instancing===!0||W.isSkinnedMesh&&Ie.skinning===!1||!W.isSkinnedMesh&&Ie.skinning===!0||W.isInstancedMesh&&Ie.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ie.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ie.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ie.instancingMorph===!1&&W.morphTexture!==null||Ie.envMap!==et||$.fog===!0&&Ie.fog!==Te||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==we.numPlanes||Ie.numIntersection!==we.numIntersection)||Ie.vertexAlphas!==_t||Ie.vertexTangents!==xt||Ie.morphTargets!==We||Ie.morphNormals!==It||Ie.morphColors!==kt||Ie.toneMapping!==Lt||Ie.morphTargetsCount!==Gt)&&(Et=!0):(Et=!0,Ie.__version=$.version);let Vt=Ie.currentProgram;Et===!0&&(Vt=Yt($,K,W));let Ot=!1,bn=!1,ai=!1;const Wt=Vt.getUniforms(),Jt=Ie.uniforms;if(rt.useProgram(Vt.program)&&(Ot=!0,bn=!0,ai=!0),$.id!==v&&(v=$.id,bn=!0),Ot||M!==T){rt.buffers.depth.getReversed()?(ye.copy(T.projectionMatrix),Gh(ye),Hh(ye),Wt.setValue(q,"projectionMatrix",ye)):Wt.setValue(q,"projectionMatrix",T.projectionMatrix),Wt.setValue(q,"viewMatrix",T.matrixWorldInverse);const Fn=Wt.map.cameraPosition;Fn!==void 0&&Fn.setValue(q,ut.setFromMatrixPosition(T.matrixWorld)),Mt.logarithmicDepthBuffer&&Wt.setValue(q,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&Wt.setValue(q,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,bn=!0,ai=!0)}if(W.isSkinnedMesh){Wt.setOptional(q,W,"bindMatrix"),Wt.setOptional(q,W,"bindMatrixInverse");const gn=W.skeleton;gn&&(gn.boneTexture===null&&gn.computeBoneTexture(),Wt.setValue(q,"boneTexture",gn.boneTexture,D))}W.isBatchedMesh&&(Wt.setOptional(q,W,"batchingTexture"),Wt.setValue(q,"batchingTexture",W._matricesTexture,D),Wt.setOptional(q,W,"batchingIdTexture"),Wt.setValue(q,"batchingIdTexture",W._indirectTexture,D),Wt.setOptional(q,W,"batchingColorTexture"),W._colorsTexture!==null&&Wt.setValue(q,"batchingColorTexture",W._colorsTexture,D));const Ln=se.morphAttributes;if((Ln.position!==void 0||Ln.normal!==void 0||Ln.color!==void 0)&&dt.update(W,se,Vt),(bn||Ie.receiveShadow!==W.receiveShadow)&&(Ie.receiveShadow=W.receiveShadow,Wt.setValue(q,"receiveShadow",W.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(Jt.envMap.value=et,Jt.flipEnvMap.value=et.isCubeTexture&&et.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&K.environment!==null&&(Jt.envMapIntensity.value=K.environmentIntensity),bn&&(Wt.setValue(q,"toneMappingExposure",_.toneMappingExposure),Ie.needsLights&&ri(Jt,ai),Te&&$.fog===!0&&Pe.refreshFogUniforms(Jt,Te),Pe.refreshMaterialUniforms(Jt,$,G,j,p.state.transmissionRenderTarget[T.id]),ha.upload(q,yi(Ie),Jt,D)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(ha.upload(q,yi(Ie),Jt,D),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&Wt.setValue(q,"center",W.center),Wt.setValue(q,"modelViewMatrix",W.modelViewMatrix),Wt.setValue(q,"normalMatrix",W.normalMatrix),Wt.setValue(q,"modelMatrix",W.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const gn=$.uniformsGroups;for(let Fn=0,nn=gn.length;Fn<nn;Fn++){const sn=gn[Fn];V.update(sn,Vt),V.bind(sn,Vt)}}return Vt}function ri(T,K){T.ambientLightColor.needsUpdate=K,T.lightProbe.needsUpdate=K,T.directionalLights.needsUpdate=K,T.directionalLightShadows.needsUpdate=K,T.pointLights.needsUpdate=K,T.pointLightShadows.needsUpdate=K,T.spotLights.needsUpdate=K,T.spotLightShadows.needsUpdate=K,T.rectAreaLights.needsUpdate=K,T.hemisphereLights.needsUpdate=K}function Jn(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(T,K,se){Ye.get(T.texture).__webglTexture=K,Ye.get(T.depthTexture).__webglTexture=se;const $=Ye.get(T);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=se===void 0,$.__autoAllocateDepthBuffer||Tt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,K){const se=Ye.get(T);se.__webglFramebuffer=K,se.__useDefaultFramebuffer=K===void 0},this.setRenderTarget=function(T,K=0,se=0){S=T,w=K,C=se;let $=!0,W=null,Te=!1,me=!1;if(T){const et=Ye.get(T);if(et.__useDefaultFramebuffer!==void 0)rt.bindFramebuffer(q.FRAMEBUFFER,null),$=!1;else if(et.__webglFramebuffer===void 0)D.setupRenderTarget(T);else if(et.__hasExternalTextures)D.rebindTextures(T,Ye.get(T.texture).__webglTexture,Ye.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const We=T.depthTexture;if(et.__boundDepthTexture!==We){if(We!==null&&Ye.has(We)&&(T.width!==We.image.width||T.height!==We.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(T)}}const _t=T.texture;(_t.isData3DTexture||_t.isDataArrayTexture||_t.isCompressedArrayTexture)&&(me=!0);const xt=Ye.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(xt[K])?W=xt[K][se]:W=xt[K],Te=!0):T.samples>0&&D.useMultisampledRTT(T)===!1?W=Ye.get(T).__webglMultisampledFramebuffer:Array.isArray(xt)?W=xt[se]:W=xt,R.copy(T.viewport),z.copy(T.scissor),k=T.scissorTest}else R.copy(Q).multiplyScalar(G).floor(),z.copy(Se).multiplyScalar(G).floor(),k=De;if(rt.bindFramebuffer(q.FRAMEBUFFER,W)&&$&&rt.drawBuffers(T,W),rt.viewport(R),rt.scissor(z),rt.setScissorTest(k),Te){const et=Ye.get(T.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+K,et.__webglTexture,se)}else if(me){const et=Ye.get(T.texture),_t=K||0;q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,et.__webglTexture,se||0,_t)}v=-1},this.readRenderTargetPixels=function(T,K,se,$,W,Te,me){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let je=Ye.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&me!==void 0&&(je=je[me]),je){rt.bindFramebuffer(q.FRAMEBUFFER,je);try{const et=T.texture,_t=et.format,xt=et.type;if(!Mt.textureFormatReadable(_t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Mt.textureTypeReadable(xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=T.width-$&&se>=0&&se<=T.height-W&&q.readPixels(K,se,$,W,vt.convert(_t),vt.convert(xt),Te)}finally{const et=S!==null?Ye.get(S).__webglFramebuffer:null;rt.bindFramebuffer(q.FRAMEBUFFER,et)}}},this.readRenderTargetPixelsAsync=async function(T,K,se,$,W,Te,me){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let je=Ye.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&me!==void 0&&(je=je[me]),je){const et=T.texture,_t=et.format,xt=et.type;if(!Mt.textureFormatReadable(_t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Mt.textureTypeReadable(xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(K>=0&&K<=T.width-$&&se>=0&&se<=T.height-W){rt.bindFramebuffer(q.FRAMEBUFFER,je);const We=q.createBuffer();q.bindBuffer(q.PIXEL_PACK_BUFFER,We),q.bufferData(q.PIXEL_PACK_BUFFER,Te.byteLength,q.STREAM_READ),q.readPixels(K,se,$,W,vt.convert(_t),vt.convert(xt),0);const It=S!==null?Ye.get(S).__webglFramebuffer:null;rt.bindFramebuffer(q.FRAMEBUFFER,It);const kt=q.fenceSync(q.SYNC_GPU_COMMANDS_COMPLETE,0);return q.flush(),await zh(q,kt,4),q.bindBuffer(q.PIXEL_PACK_BUFFER,We),q.getBufferSubData(q.PIXEL_PACK_BUFFER,0,Te),q.deleteBuffer(We),q.deleteSync(kt),Te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,K=null,se=0){T.isTexture!==!0&&(lr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),K=arguments[0]||null,T=arguments[1]);const $=Math.pow(2,-se),W=Math.floor(T.image.width*$),Te=Math.floor(T.image.height*$),me=K!==null?K.x:0,je=K!==null?K.y:0;D.setTexture2D(T,0),q.copyTexSubImage2D(q.TEXTURE_2D,se,0,0,me,je,W,Te),rt.unbindTexture()},this.copyTextureToTexture=function(T,K,se=null,$=null,W=0){T.isTexture!==!0&&(lr("WebGLRenderer: copyTextureToTexture function signature has changed."),$=arguments[0]||null,T=arguments[1],K=arguments[2],W=arguments[3]||0,se=null);let Te,me,je,et,_t,xt,We,It,kt;const Lt=T.isCompressedTexture?T.mipmaps[W]:T.image;se!==null?(Te=se.max.x-se.min.x,me=se.max.y-se.min.y,je=se.isBox3?se.max.z-se.min.z:1,et=se.min.x,_t=se.min.y,xt=se.isBox3?se.min.z:0):(Te=Lt.width,me=Lt.height,je=Lt.depth||1,et=0,_t=0,xt=0),$!==null?(We=$.x,It=$.y,kt=$.z):(We=0,It=0,kt=0);const Ze=vt.convert(K.format),Gt=vt.convert(K.type);let Ie;K.isData3DTexture?(D.setTexture3D(K,0),Ie=q.TEXTURE_3D):K.isDataArrayTexture||K.isCompressedArrayTexture?(D.setTexture2DArray(K,0),Ie=q.TEXTURE_2D_ARRAY):(D.setTexture2D(K,0),Ie=q.TEXTURE_2D),q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,K.flipY),q.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),q.pixelStorei(q.UNPACK_ALIGNMENT,K.unpackAlignment);const bt=q.getParameter(q.UNPACK_ROW_LENGTH),Et=q.getParameter(q.UNPACK_IMAGE_HEIGHT),Vt=q.getParameter(q.UNPACK_SKIP_PIXELS),Ot=q.getParameter(q.UNPACK_SKIP_ROWS),bn=q.getParameter(q.UNPACK_SKIP_IMAGES);q.pixelStorei(q.UNPACK_ROW_LENGTH,Lt.width),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Lt.height),q.pixelStorei(q.UNPACK_SKIP_PIXELS,et),q.pixelStorei(q.UNPACK_SKIP_ROWS,_t),q.pixelStorei(q.UNPACK_SKIP_IMAGES,xt);const ai=T.isDataArrayTexture||T.isData3DTexture,Wt=K.isDataArrayTexture||K.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const Jt=Ye.get(T),Ln=Ye.get(K),gn=Ye.get(Jt.__renderTarget),Fn=Ye.get(Ln.__renderTarget);rt.bindFramebuffer(q.READ_FRAMEBUFFER,gn.__webglFramebuffer),rt.bindFramebuffer(q.DRAW_FRAMEBUFFER,Fn.__webglFramebuffer);for(let nn=0;nn<je;nn++)ai&&q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Ye.get(T).__webglTexture,W,xt+nn),T.isDepthTexture?(Wt&&q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Ye.get(K).__webglTexture,W,kt+nn),q.blitFramebuffer(et,_t,Te,me,We,It,Te,me,q.DEPTH_BUFFER_BIT,q.NEAREST)):Wt?q.copyTexSubImage3D(Ie,W,We,It,kt+nn,et,_t,Te,me):q.copyTexSubImage2D(Ie,W,We,It,kt+nn,et,_t,Te,me);rt.bindFramebuffer(q.READ_FRAMEBUFFER,null),rt.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else Wt?T.isDataTexture||T.isData3DTexture?q.texSubImage3D(Ie,W,We,It,kt,Te,me,je,Ze,Gt,Lt.data):K.isCompressedArrayTexture?q.compressedTexSubImage3D(Ie,W,We,It,kt,Te,me,je,Ze,Lt.data):q.texSubImage3D(Ie,W,We,It,kt,Te,me,je,Ze,Gt,Lt):T.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,W,We,It,Te,me,Ze,Gt,Lt.data):T.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,W,We,It,Lt.width,Lt.height,Ze,Lt.data):q.texSubImage2D(q.TEXTURE_2D,W,We,It,Te,me,Ze,Gt,Lt);q.pixelStorei(q.UNPACK_ROW_LENGTH,bt),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Et),q.pixelStorei(q.UNPACK_SKIP_PIXELS,Vt),q.pixelStorei(q.UNPACK_SKIP_ROWS,Ot),q.pixelStorei(q.UNPACK_SKIP_IMAGES,bn),W===0&&K.generateMipmaps&&q.generateMipmap(Ie),rt.unbindTexture()},this.copyTextureToTexture3D=function(T,K,se=null,$=null,W=0){return T.isTexture!==!0&&(lr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),se=arguments[0]||null,$=arguments[1]||null,T=arguments[2],K=arguments[3],W=arguments[4]||0),lr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,K,se,$,W)},this.initRenderTarget=function(T){Ye.get(T).__webglFramebuffer===void 0&&D.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?D.setTextureCube(T,0):T.isData3DTexture?D.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?D.setTexture2DArray(T,0):D.setTexture2D(T,0),rt.unbindTexture()},this.resetState=function(){w=0,C=0,S=null,rt.reset(),Bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Xt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Xt._getUnpackColorSpace()}}class zc extends dn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ni,this.environmentIntensity=1,this.environmentRotation=new ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Xl{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=vi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const zn=new F;class br{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)zn.fromBufferAttribute(this,t),zn.applyMatrix4(e),this.setXYZ(t,zn.x,zn.y,zn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zn.fromBufferAttribute(this,t),zn.applyNormalMatrix(e),this.setXYZ(t,zn.x,zn.y,zn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zn.fromBufferAttribute(this,t),zn.transformDirection(e),this.setXYZ(t,zn.x,zn.y,zn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=_i(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tn(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=tn(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=tn(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=tn(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=tn(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=_i(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=_i(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=_i(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=_i(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),i=tn(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),i=tn(i,this.array),r=tn(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new br(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class jl extends di{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new ot(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ls;const er=new F,Is=new F,Ds=new F,Fs=new He,tr=new He,ql=new lt,Yr=new F,nr=new F,Jr=new F,Gc=new He,Qa=new He,Hc=new He;class $m extends dn{constructor(e=new jl){if(super(),this.isSprite=!0,this.type="Sprite",Ls===void 0){Ls=new ln;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Xl(t,5);Ls.setIndex([0,1,2,0,2,3]),Ls.setAttribute("position",new br(n,3,0,!1)),Ls.setAttribute("uv",new br(n,2,3,!1))}this.geometry=Ls,this.material=e,this.center=new He(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Is.setFromMatrixScale(this.matrixWorld),ql.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ds.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Is.multiplyScalar(-Ds.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Zr(Yr.set(-.5,-.5,0),Ds,a,Is,i,r),Zr(nr.set(.5,-.5,0),Ds,a,Is,i,r),Zr(Jr.set(.5,.5,0),Ds,a,Is,i,r),Gc.set(0,0),Qa.set(1,0),Hc.set(1,1);let o=e.ray.intersectTriangle(Yr,nr,Jr,!1,er);if(o===null&&(Zr(nr.set(-.5,.5,0),Ds,a,Is,i,r),Qa.set(0,1),o=e.ray.intersectTriangle(Yr,Jr,nr,!1,er),o===null))return;const c=e.ray.origin.distanceTo(er);c<e.near||c>e.far||t.push({distance:c,point:er.clone(),uv:hi.getInterpolation(er,Yr,nr,Jr,Gc,Qa,Hc,new He),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Zr(s,e,t,n,i,r){Fs.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(tr.x=r*Fs.x-i*Fs.y,tr.y=i*Fs.x+r*Fs.y):tr.copy(Fs),s.copy(e),s.x+=tr.x,s.y+=tr.y,s.applyMatrix4(ql)}const Vc=new F,Wc=new jt,Xc=new jt,eg=new F,jc=new lt,Qr=new F,$a=new Ai,qc=new lt,eo=new _a;class tg extends Je{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=jo,this.bindMatrix=new lt,this.bindMatrixInverse=new lt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new On),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Qr),this.boundingBox.expandByPoint(Qr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ai),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Qr),this.boundingSphere.expandByPoint(Qr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$a.copy(this.boundingSphere),$a.applyMatrix4(i),e.ray.intersectsSphere($a)!==!1&&(qc.copy(i).invert(),eo.copy(e.ray).applyMatrix4(qc),!(this.boundingBox!==null&&eo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,eo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new jt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===jo?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===yh?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Wc.fromBufferAttribute(i.attributes.skinIndex,e),Xc.fromBufferAttribute(i.attributes.skinWeight,e),Vc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=Xc.getComponent(r);if(a!==0){const o=Wc.getComponent(r);jc.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(eg.copy(Vc).applyMatrix4(jc),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Kl extends dn{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Yl extends Sn{constructor(e=null,t=1,n=1,i,r,a,o,c,l=1003,u=1003,h,d){super(null,a,o,c,l,u,i,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Kc=new lt,ng=new lt;class Fo{constructor(e=[],t=[]){this.uuid=vi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new lt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new lt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:ng;Kc.multiplyMatrices(o,t[r]),Kc.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Fo(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Yl(t,e,e,1023,1015);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Kl),this.bones.push(a),this.boneInverses.push(new lt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class yo extends Zt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ns=new lt,Yc=new lt,$r=[],Jc=new On,ig=new lt,ir=new Je,sr=new Ai;class Kn extends Je{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new yo(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,ig)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new On),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ns),Jc.copy(e.boundingBox).applyMatrix4(Ns),this.boundingBox.union(Jc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ai),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ns),sr.copy(e.boundingSphere).applyMatrix4(Ns),this.boundingSphere.union(sr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(ir.geometry=this.geometry,ir.material=this.material,ir.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sr.copy(this.boundingSphere),sr.applyMatrix4(n),e.ray.intersectsSphere(sr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Ns),Yc.multiplyMatrices(n,Ns),ir.matrixWorld=Yc,ir.raycast(e,$r);for(let a=0,o=$r.length;a<o;a++){const c=$r[a];c.instanceId=r,c.object=this,t.push(c)}$r.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new yo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Yl(new Float32Array(i*this.count),i,this.count,1028,1015));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Jl extends di{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new ot(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ua=new F,da=new F,Zc=new lt,rr=new _a,ea=new Ai,to=new F,Qc=new F;class No extends dn{constructor(e=new ln,t=new Jl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)ua.fromBufferAttribute(t,i-1),da.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=ua.distanceTo(da);e.setAttribute("lineDistance",new zt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ea.copy(n.boundingSphere),ea.applyMatrix4(i),ea.radius+=r,e.ray.intersectsSphere(ea)===!1)return;Zc.copy(i).invert(),rr.copy(e.ray).applyMatrix4(Zc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let b=f,m=g-1;b<m;b+=l){const p=u.getX(b),x=u.getX(b+1),y=ta(this,e,rr,c,p,x);y&&t.push(y)}if(this.isLineLoop){const b=u.getX(g-1),m=u.getX(f),p=ta(this,e,rr,c,b,m);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let b=f,m=g-1;b<m;b+=l){const p=ta(this,e,rr,c,b,b+1);p&&t.push(p)}if(this.isLineLoop){const b=ta(this,e,rr,c,g-1,f);b&&t.push(b)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ta(s,e,t,n,i,r){const a=s.geometry.attributes.position;if(ua.fromBufferAttribute(a,i),da.fromBufferAttribute(a,r),t.distanceSqToSegment(ua,da,to,Qc)>n)return;to.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(to);if(!(c<e.near||c>e.far))return{distance:c,point:Qc.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const $c=new F,el=new F;class sg extends No{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)$c.fromBufferAttribute(t,i),el.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+$c.distanceTo(el);e.setAttribute("lineDistance",new zt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class rg extends No{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Zl extends di{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new ot(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const tl=new lt,Mo=new _a,na=new Ai,ia=new F;class ag extends dn{constructor(e=new ln,t=new Zl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),na.copy(n.boundingSphere),na.applyMatrix4(i),na.radius+=r,e.ray.intersectsSphere(na)===!1)return;tl.copy(i).invert(),Mo.copy(e.ray).applyMatrix4(tl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=d,b=f;g<b;g++){const m=l.getX(g);ia.fromBufferAttribute(h,m),nl(ia,m,c,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let g=d,b=f;g<b;g++)ia.fromBufferAttribute(h,g),nl(ia,g,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function nl(s,e,t,n,i,r,a){const o=Mo.distanceSqToPoint(s);if(o<t){const c=new F;Mo.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class ui extends Sn{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class wi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(r-1);const u=n[i],d=n[i+1]-u,f=(a-u)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),c=t||(a.isVector2?new He:new F);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new F,i=[],r=[],a=[],o=new F,c=new lt;for(let f=0;f<=e;f++){const g=f/e;i[f]=this.getTangentAt(g,new F)}r[0]=new F,a[0]=new F;let l=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),d=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(wn(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(wn(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Uo extends wi{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new He){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*u-f*h+this.aX,l=d*h+f*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class og extends Uo{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Oo(){let s=0,e=0,t=0,n=0;function i(r,a,o,c){s=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){i(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,h){let d=(a-r)/l-(o-r)/(l+u)+(o-a)/u,f=(o-a)/u-(c-a)/(u+h)+(c-o)/h;d*=u,f*=u,i(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return s+e*r+t*a+n*o}}}const sa=new F,no=new Oo,io=new Oo,so=new Oo;class xa extends wi{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new F){const n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=i[(o-1)%r]:(sa.subVectors(i[0],i[1]).add(i[0]),l=sa);const h=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?u=i[(o+2)%r]:(sa.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=sa),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),f),b=Math.pow(h.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(u),f);b<1e-4&&(b=1),g<1e-4&&(g=b),m<1e-4&&(m=b),no.initNonuniformCatmullRom(l.x,h.x,d.x,u.x,g,b,m),io.initNonuniformCatmullRom(l.y,h.y,d.y,u.y,g,b,m),so.initNonuniformCatmullRom(l.z,h.z,d.z,u.z,g,b,m)}else this.curveType==="catmullrom"&&(no.initCatmullRom(l.x,h.x,d.x,u.x,this.tension),io.initCatmullRom(l.y,h.y,d.y,u.y,this.tension),so.initCatmullRom(l.z,h.z,d.z,u.z,this.tension));return n.set(no.calc(c),io.calc(c),so.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new F().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function il(s,e,t,n,i){const r=(n-e)*.5,a=(i-t)*.5,o=s*s,c=s*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*s+t}function cg(s,e){const t=1-s;return t*t*e}function lg(s,e){return 2*(1-s)*s*e}function hg(s,e){return s*s*e}function fr(s,e,t,n){return cg(s,e)+lg(s,t)+hg(s,n)}function ug(s,e){const t=1-s;return t*t*t*e}function dg(s,e){const t=1-s;return 3*t*t*s*e}function fg(s,e){return 3*(1-s)*s*s*e}function pg(s,e){return s*s*s*e}function pr(s,e,t,n,i){return ug(s,e)+dg(s,t)+fg(s,n)+pg(s,i)}class Ql extends wi{constructor(e=new He,t=new He,n=new He,i=new He){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new He){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(pr(e,i.x,r.x,a.x,o.x),pr(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class mg extends wi{constructor(e=new F,t=new F,n=new F,i=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new F){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(pr(e,i.x,r.x,a.x,o.x),pr(e,i.y,r.y,a.y,o.y),pr(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class $l extends wi{constructor(e=new He,t=new He){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new He){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new He){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class eh extends wi{constructor(e=new F,t=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new F){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new F){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class th extends wi{constructor(e=new He,t=new He,n=new He){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new He){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(fr(e,i.x,r.x,a.x),fr(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class nh extends wi{constructor(e=new F,t=new F,n=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new F){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(fr(e,i.x,r.x,a.x),fr(e,i.y,r.y,a.y),fr(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ih extends wi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new He){const n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,c=i[a===0?a:a-1],l=i[a],u=i[a>i.length-2?i.length-1:a+1],h=i[a>i.length-3?i.length-1:a+2];return n.set(il(o,c.x,l.x,u.x,h.x),il(o,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new He().fromArray(i))}return this}}var So=Object.freeze({__proto__:null,ArcCurve:og,CatmullRomCurve3:xa,CubicBezierCurve:Ql,CubicBezierCurve3:mg,EllipseCurve:Uo,LineCurve:$l,LineCurve3:eh,QuadraticBezierCurve:th,QuadraticBezierCurve3:nh,SplineCurve:ih});class sh extends wi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new So[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new So[i.type]().fromJSON(i))}return this}}class gg extends sh{constructor(e){super(),this.type="Path",this.currentPoint=new He,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new $l(this.currentPoint.clone(),new He(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new th(this.currentPoint.clone(),new He(e,t),new He(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,a){const o=new Ql(this.currentPoint.clone(),new He(e,t),new He(n,i),new He(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new ih(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,r,a),this}absarc(e,t,n,i,r,a){return this.absellipse(e,t,n,n,i,r,a),this}ellipse(e,t,n,i,r,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,i,r,a,o,c),this}absellipse(e,t,n,i,r,a,o,c){const l=new Uo(e,t,n,i,r,a,o,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Bo extends ln{constructor(e=[new He(0,-.5),new He(.5,0),new He(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=wn(i,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],u=1/t,h=new F,d=new He,f=new F,g=new F,b=new F;let m=0,p=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-m,f.z=p*0,b.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(b.x,b.y,b.z);break;default:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=b.x,f.y+=b.y,f.z+=b.z,f.normalize(),c.push(f.x,f.y,f.z),b.copy(g)}for(let x=0;x<=t;x++){const y=n+x*u*i,_=Math.sin(y),P=Math.cos(y);for(let w=0;w<=e.length-1;w++){h.x=e[w].x*_,h.y=e[w].y,h.z=e[w].x*P,a.push(h.x,h.y,h.z),d.x=x/t,d.y=w/(e.length-1),o.push(d.x,d.y);const C=c[3*w+0]*_,S=c[3*w+1],v=c[3*w+0]*P;l.push(C,S,v)}}for(let x=0;x<t;x++)for(let y=0;y<e.length-1;y++){const _=y+x*e.length,P=_,w=_+e.length,C=_+e.length+1,S=_+1;r.push(P,w,S),r.push(C,S,w)}this.setIndex(r),this.setAttribute("position",new zt(a,3)),this.setAttribute("uv",new zt(o,2)),this.setAttribute("normal",new zt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bo(e.points,e.segments,e.phiStart,e.phiLength)}}class ko extends Bo{constructor(e=1,t=1,n=4,i=8){const r=new gg;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new ko(e.radius,e.length,e.capSegments,e.radialSegments)}}class ya extends ln{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new F,u=new He;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const f=n+h/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[d]/e+1)/2,u.y=(a[d+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new zt(a,3)),this.setAttribute("normal",new zt(o,3)),this.setAttribute("uv",new zt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ya(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class un extends ln{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const u=[],h=[],d=[],f=[];let g=0;const b=[],m=n/2;let p=0;x(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new zt(h,3)),this.setAttribute("normal",new zt(d,3)),this.setAttribute("uv",new zt(f,2));function x(){const _=new F,P=new F;let w=0;const C=(t-e)/n;for(let S=0;S<=r;S++){const v=[],M=S/r,R=M*(t-e)+e;for(let z=0;z<=i;z++){const k=z/i,X=k*c+o,ae=Math.sin(X),I=Math.cos(X);P.x=R*ae,P.y=-M*n+m,P.z=R*I,h.push(P.x,P.y,P.z),_.set(ae,C,I).normalize(),d.push(_.x,_.y,_.z),f.push(k,1-M),v.push(g++)}b.push(v)}for(let S=0;S<i;S++)for(let v=0;v<r;v++){const M=b[v][S],R=b[v+1][S],z=b[v+1][S+1],k=b[v][S+1];(e>0||v!==0)&&(u.push(M,R,k),w+=3),(t>0||v!==r-1)&&(u.push(R,z,k),w+=3)}l.addGroup(p,w,0),p+=w}function y(_){const P=g,w=new He,C=new F;let S=0;const v=_===!0?e:t,M=_===!0?1:-1;for(let z=1;z<=i;z++)h.push(0,m*M,0),d.push(0,M,0),f.push(.5,.5),g++;const R=g;for(let z=0;z<=i;z++){const X=z/i*c+o,ae=Math.cos(X),I=Math.sin(X);C.x=v*I,C.y=m*M,C.z=v*ae,h.push(C.x,C.y,C.z),d.push(0,M,0),w.x=ae*.5+.5,w.y=I*.5*M+.5,f.push(w.x,w.y),g++}for(let z=0;z<i;z++){const k=P+z,X=R+z;_===!0?u.push(X,X+1,k):u.push(X+1,X,k),S+=3}l.addGroup(p,S,_===!0?1:2),p+=S}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new un(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class fa extends un{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new fa(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class zo extends ln{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],a=[];o(i),l(n),u(),this.setAttribute("position",new zt(r,3)),this.setAttribute("normal",new zt(r.slice(),3)),this.setAttribute("uv",new zt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const y=new F,_=new F,P=new F;for(let w=0;w<t.length;w+=3)f(t[w+0],y),f(t[w+1],_),f(t[w+2],P),c(y,_,P,x)}function c(x,y,_,P){const w=P+1,C=[];for(let S=0;S<=w;S++){C[S]=[];const v=x.clone().lerp(_,S/w),M=y.clone().lerp(_,S/w),R=w-S;for(let z=0;z<=R;z++)z===0&&S===w?C[S][z]=v:C[S][z]=v.clone().lerp(M,z/R)}for(let S=0;S<w;S++)for(let v=0;v<2*(w-S)-1;v++){const M=Math.floor(v/2);v%2===0?(d(C[S][M+1]),d(C[S+1][M]),d(C[S][M])):(d(C[S][M+1]),d(C[S+1][M+1]),d(C[S+1][M]))}}function l(x){const y=new F;for(let _=0;_<r.length;_+=3)y.x=r[_+0],y.y=r[_+1],y.z=r[_+2],y.normalize().multiplyScalar(x),r[_+0]=y.x,r[_+1]=y.y,r[_+2]=y.z}function u(){const x=new F;for(let y=0;y<r.length;y+=3){x.x=r[y+0],x.y=r[y+1],x.z=r[y+2];const _=m(x)/2/Math.PI+.5,P=p(x)/Math.PI+.5;a.push(_,1-P)}g(),h()}function h(){for(let x=0;x<a.length;x+=6){const y=a[x+0],_=a[x+2],P=a[x+4],w=Math.max(y,_,P),C=Math.min(y,_,P);w>.9&&C<.1&&(y<.2&&(a[x+0]+=1),_<.2&&(a[x+2]+=1),P<.2&&(a[x+4]+=1))}}function d(x){r.push(x.x,x.y,x.z)}function f(x,y){const _=x*3;y.x=e[_+0],y.y=e[_+1],y.z=e[_+2]}function g(){const x=new F,y=new F,_=new F,P=new F,w=new He,C=new He,S=new He;for(let v=0,M=0;v<r.length;v+=9,M+=6){x.set(r[v+0],r[v+1],r[v+2]),y.set(r[v+3],r[v+4],r[v+5]),_.set(r[v+6],r[v+7],r[v+8]),w.set(a[M+0],a[M+1]),C.set(a[M+2],a[M+3]),S.set(a[M+4],a[M+5]),P.copy(x).add(y).add(_).divideScalar(3);const R=m(P);b(w,M+0,x,R),b(C,M+2,y,R),b(S,M+4,_,R)}}function b(x,y,_,P){P<0&&x.x===1&&(a[y]=x.x-1),_.x===0&&_.z===0&&(a[y]=P/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zo(e.vertices,e.indices,e.radius,e.details)}}class ti extends zo{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ti(e.radius,e.detail)}}class Go extends ln{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],c=[],l=[],u=[];let h=e;const d=(t-e)/i,f=new F,g=new He;for(let b=0;b<=i;b++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=h*Math.cos(p),f.y=h*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}h+=d}for(let b=0;b<i;b++){const m=b*(n+1);for(let p=0;p<n;p++){const x=p+m,y=x,_=x+n+1,P=x+n+2,w=x+1;o.push(y,_,w),o.push(_,P,w)}}this.setIndex(o),this.setAttribute("position",new zt(c,3)),this.setAttribute("normal",new zt(l,3)),this.setAttribute("uv",new zt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Go(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class bi extends ln{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new F,d=new F,f=[],g=[],b=[],m=[];for(let p=0;p<=n;p++){const x=[],y=p/n;let _=0;p===0&&a===0?_=.5/t:p===n&&c===Math.PI&&(_=-.5/t);for(let P=0;P<=t;P++){const w=P/t;h.x=-e*Math.cos(i+w*r)*Math.sin(a+y*o),h.y=e*Math.cos(a+y*o),h.z=e*Math.sin(i+w*r)*Math.sin(a+y*o),g.push(h.x,h.y,h.z),d.copy(h).normalize(),b.push(d.x,d.y,d.z),m.push(w+_,1-y),x.push(l++)}u.push(x)}for(let p=0;p<n;p++)for(let x=0;x<t;x++){const y=u[p][x+1],_=u[p][x],P=u[p+1][x],w=u[p+1][x+1];(p!==0||a>0)&&f.push(y,_,w),(p!==n-1||c<Math.PI)&&f.push(_,P,w)}this.setIndex(f),this.setAttribute("position",new zt(g,3)),this.setAttribute("normal",new zt(b,3)),this.setAttribute("uv",new zt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ma extends ln{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],c=[],l=[],u=new F,h=new F,d=new F;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const b=g/i*r,m=f/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(b),h.y=(e+t*Math.cos(m))*Math.sin(b),h.z=t*Math.sin(m),o.push(h.x,h.y,h.z),u.x=e*Math.cos(b),u.y=e*Math.sin(b),d.subVectors(h,u).normalize(),c.push(d.x,d.y,d.z),l.push(g/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const b=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,x=(i+1)*f+g;a.push(b,m,x),a.push(m,p,x)}this.setIndex(a),this.setAttribute("position",new zt(o,3)),this.setAttribute("normal",new zt(c,3)),this.setAttribute("uv",new zt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ma(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class js extends ln{constructor(e=new nh(new F(-1,-1,0),new F(-1,1,0),new F(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new F,c=new F,l=new He;let u=new F;const h=[],d=[],f=[],g=[];b(),this.setIndex(g),this.setAttribute("position",new zt(h,3)),this.setAttribute("normal",new zt(d,3)),this.setAttribute("uv",new zt(f,2));function b(){for(let y=0;y<t;y++)m(y);m(r===!1?t:0),x(),p()}function m(y){u=e.getPointAt(y/t,u);const _=a.normals[y],P=a.binormals[y];for(let w=0;w<=i;w++){const C=w/i*Math.PI*2,S=Math.sin(C),v=-Math.cos(C);c.x=v*_.x+S*P.x,c.y=v*_.y+S*P.y,c.z=v*_.z+S*P.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=u.x+n*c.x,o.y=u.y+n*c.y,o.z=u.z+n*c.z,h.push(o.x,o.y,o.z)}}function p(){for(let y=1;y<=t;y++)for(let _=1;_<=i;_++){const P=(i+1)*(y-1)+(_-1),w=(i+1)*y+(_-1),C=(i+1)*y+_,S=(i+1)*(y-1)+_;g.push(P,w,S),g.push(w,C,S)}}function x(){for(let y=0;y<=t;y++)for(let _=0;_<=i;_++)l.x=y/t,l.y=_/i,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new js(new So[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Gi extends di{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new He(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ti extends Gi{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new He(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return wn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ot(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ot(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ot(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class An extends di{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new He(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function ra(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function _g(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function bg(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function sl(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function rh(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class yr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class vg extends yr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case 2401:r=e,o=2*t-n;break;case 2402:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case 2401:a=e,c=2*n-t;break;case 2402:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),b=g*g,m=b*g,p=-d*m+2*d*b-d*g,x=(1+d)*m+(-1.5-2*d)*b+(-.5+d)*g+1,y=(-1-f)*m+(1.5+f)*b+.5*g,_=f*m-f*b;for(let P=0;P!==o;++P)r[P]=p*a[u+P]+x*a[l+P]+y*a[c+P]+_*a[h+P];return r}}class ah extends yr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(i-t),h=1-u;for(let d=0;d!==o;++d)r[d]=a[l+d]*h+a[c+d]*u;return r}}class xg extends yr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Ri{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ra(t,this.TimeBufferType),this.values=ra(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ra(e.times,Array),values:ra(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new xg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ah(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new vg(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&_g(i))for(let o=0,c=i.length;o!==c;++o){const l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===2302,r=e.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(i)c=!0;else{const h=o*n,d=h-n,f=h+n;for(let g=0;g!==n;++g){const b=t[h+g];if(b!==t[d+g]||b!==t[f+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const h=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Ri.prototype.TimeBufferType=Float32Array;Ri.prototype.ValueBufferType=Float32Array;Ri.prototype.DefaultInterpolation=2301;class qs extends Ri{constructor(e,t,n){super(e,t,n)}}qs.prototype.ValueTypeName="bool";qs.prototype.ValueBufferType=Array;qs.prototype.DefaultInterpolation=2300;qs.prototype.InterpolantFactoryMethodLinear=void 0;qs.prototype.InterpolantFactoryMethodSmooth=void 0;class oh extends Ri{}oh.prototype.ValueTypeName="color";class Hs extends Ri{}Hs.prototype.ValueTypeName="number";class yg extends yr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t);let l=e*o;for(let u=l+o;l!==u;l+=4)Tn.slerpFlat(r,0,a,l-o,a,l,c);return r}}class Vs extends Ri{InterpolantFactoryMethodLinear(e){return new yg(this.times,this.values,this.getValueSize(),e)}}Vs.prototype.ValueTypeName="quaternion";Vs.prototype.InterpolantFactoryMethodSmooth=void 0;class Ks extends Ri{constructor(e,t,n){super(e,t,n)}}Ks.prototype.ValueTypeName="string";Ks.prototype.ValueBufferType=Array;Ks.prototype.DefaultInterpolation=2300;Ks.prototype.InterpolantFactoryMethodLinear=void 0;Ks.prototype.InterpolantFactoryMethodSmooth=void 0;class Ws extends Ri{}Ws.prototype.ValueTypeName="vector";class Eo{constructor(e="",t=-1,n=[],i=2500){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=vi(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Sg(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(Ri.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const u=bg(c);c=sl(c,1,u),l=sl(l,1,u),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Hs(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],u=l.name.match(r);if(u&&u.length>1){const h=u[1];let d=i[h];d||(i[h]=d=[]),d.push(l)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,g,b){if(f.length!==0){const m=[],p=[];rh(f,m,p,g),m.length!==0&&b.push(new h(d,m,p))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let h=0;h<l.length;h++){const d=l[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let b=0;b<d[g].morphTargets.length;b++)f[d[g].morphTargets[b]]=-1;for(const b in f){const m=[],p=[];for(let x=0;x!==d[g].morphTargets.length;++x){const y=d[g];m.push(y.time),p.push(y.morphTarget===b?1:0)}i.push(new Hs(".morphTargetInfluence["+b+"]",m,p))}c=f.length*a}else{const f=".bones["+t[h].name+"]";n(Ws,f+".position",d,"pos",i),n(Vs,f+".quaternion",d,"rot",i),n(Ws,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,c,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Mg(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Hs;case"vector":case"vector2":case"vector3":case"vector4":return Ws;case"color":return oh;case"quaternion":return Vs;case"bool":case"boolean":return qs;case"string":return Ks}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Sg(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Mg(s.type);if(s.times===void 0){const t=[],n=[];rh(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Qi={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Eg{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,r===!1&&i.onStart!==void 0&&i.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){const f=l[h],g=l[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}}const ch=new Eg;class Ys{constructor(e){this.manager=e!==void 0?e:ch,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Ys.DEFAULT_MATERIAL_NAME="__DEFAULT";const Fi={};class Ag extends Error{constructor(e,t){super(e),this.response=t}}class lh extends Ys{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Qi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Fi[e]!==void 0){Fi[e].push({onLoad:t,onProgress:n,onError:i});return}Fi[e]=[],Fi[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=Fi[e],h=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let b=0;const m=new ReadableStream({start(p){x();function x(){h.read().then(({done:y,value:_})=>{if(y)p.close();else{b+=_.byteLength;const P=new ProgressEvent("progress",{lengthComputable:g,loaded:b,total:f});for(let w=0,C=u.length;w<C;w++){const S=u[w];S.onProgress&&S.onProgress(P)}p.enqueue(_),x()}},y=>{p.error(y)})}}});return new Response(m)}else throw new Ag(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{Qi.add(e,l);const u=Fi[e];delete Fi[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(l)}}).catch(l=>{const u=Fi[e];if(u===void 0)throw this.manager.itemError(e),l;delete Fi[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class wg extends Ys{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Qi.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=_r("img");function c(){u(),Qi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(h){u(),i&&i(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class hh extends Ys{constructor(e){super(e)}load(e,t,n,i){const r=new Sn,a=new wg(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class Sa extends dn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ot(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class rl extends Sa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(dn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ot(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const ro=new lt,al=new F,ol=new F;class Ho{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new He(512,512),this.map=null,this.mapPass=null,this.matrix=new lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Io,this._frameExtents=new He(1,1),this._viewportCount=1,this._viewports=[new jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;al.setFromMatrixPosition(e.matrixWorld),t.position.copy(al),ol.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ol),t.updateMatrixWorld(),ro.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ro),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ro)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Tg extends Ho{constructor(){super(new jn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=zs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Rg extends Sa{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(dn.DEFAULT_UP),this.updateMatrix(),this.target=new dn,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Tg}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const cl=new lt,ar=new F,ao=new F;class Cg extends Ho{constructor(){super(new jn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new He(4,2),this._viewportCount=6,this._viewports=[new jt(2,1,1,1),new jt(0,1,1,1),new jt(3,1,1,1),new jt(1,1,1,1),new jt(3,0,1,1),new jt(1,0,1,1)],this._cubeDirections=[new F(1,0,0),new F(-1,0,0),new F(0,0,1),new F(0,0,-1),new F(0,1,0),new F(0,-1,0)],this._cubeUps=[new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,0,1),new F(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ar.setFromMatrixPosition(e.matrixWorld),n.position.copy(ar),ao.copy(n.position),ao.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ao),n.updateMatrixWorld(),i.makeTranslation(-ar.x,-ar.y,-ar.z),cl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(cl)}}class Ea extends Sa{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Cg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Pg extends Ho{constructor(){super(new ba(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ao extends Sa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dn.DEFAULT_UP),this.updateMatrix(),this.target=new dn,this.shadow=new Pg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class mr{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Lg extends Ys{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Qi.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Qi.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),Qi.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Qi.add(e,c),r.manager.itemStart(e)}}class Ig{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,a;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,r=e*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[r+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const c=t*this._origIndex;this._mixBufferRegion(n,i,c,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){o.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,a=i;r!==a;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){Tn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){const a=this._workIndex*r;Tn.multiplyQuaternionsFlat(e,a,e,t,e,n),Tn.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,r){const a=1-i;for(let o=0;o!==r;++o){const c=t+o;e[c]=e[c]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,r){for(let a=0;a!==r;++a){const o=t+a;e[o]=e[o]+e[n+a]*i}}}const Vo="\\[\\]\\.:\\/",Dg=new RegExp("["+Vo+"]","g"),Wo="[^"+Vo+"]",Fg="[^"+Vo.replace("\\.","")+"]",Ng=/((?:WC+[\/:])*)/.source.replace("WC",Wo),Ug=/(WCOD+)?/.source.replace("WCOD",Fg),Og=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Wo),Bg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Wo),kg=new RegExp("^"+Ng+Ug+Og+Bg+"$"),zg=["material","materials","bones","map"];class Gg{constructor(e,t,n){const i=n||Qt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Qt{constructor(e,t,n){this.path=t,this.parsedPath=n||Qt.parseTrackName(t),this.node=Qt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Qt.Composite(e,t,n):new Qt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Dg,"")}static parseTrackName(e){const t=kg.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);zg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=Qt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[i];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Qt.Composite=Gg;Qt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Qt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Qt.prototype.GetterByBindingType=[Qt.prototype._getValue_direct,Qt.prototype._getValue_array,Qt.prototype._getValue_arrayElement,Qt.prototype._getValue_toArray];Qt.prototype.SetterByBindingTypeAndVersioning=[[Qt.prototype._setValue_direct,Qt.prototype._setValue_direct_setNeedsUpdate,Qt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Qt.prototype._setValue_array,Qt.prototype._setValue_array_setNeedsUpdate,Qt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Qt.prototype._setValue_arrayElement,Qt.prototype._setValue_arrayElement_setNeedsUpdate,Qt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Qt.prototype._setValue_fromArray,Qt.prototype._setValue_fromArray_setNeedsUpdate,Qt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Hg{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const r=t.tracks,a=r.length,o=new Array(a),c={endingStart:2400,endingEnd:2400};for(let l=0;l!==a;++l){const u=r[l].createInterpolant(null);o[l]=u,u.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=2201,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,r=e._clip.duration,a=r/i,o=i/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,r=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const c=o.parameterPositions,l=o.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/a,l[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case 2501:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(a),l[u].accumulateAdditive(o);break;case 2500:default:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(a),l[u].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,r=this._loopCount;const a=n===2202;if(e===0)return r===-1?i:a&&(r&1)===1?t-i:i;if(n===2200){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){const o=Math.floor(i/t);i-=t*o,r+=Math.abs(o);const c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){const l=e<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=2401,i.endingEnd=2401):(e?i.endingStart=this.zeroSlopeAtStart?2401:2400:i.endingStart=2402,t?i.endingEnd=this.zeroSlopeAtEnd?2401:2400:i.endingEnd=2402)}_scheduleFading(e,t,n){const i=this._mixer,r=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,c=a.sampleValues;return o[0]=r,c[0]=t,o[1]=r+e,c[1]=n,this}}const Vg=new Float32Array(1);class Wg extends gs{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,a=e._propertyBindings,o=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let u=l[c];u===void 0&&(u={},l[c]=u);for(let h=0;h!==r;++h){const d=i[h],f=d.name;let g=u[f];if(g!==void 0)++g.referenceCount,a[h]=g;else{if(g=a[h],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,f));continue}const b=t&&t._propertyBindings[h].binding.parsedPath;g=new Ig(Qt.create(n,f,b),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,f),a[h]=g}o[h].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,r=this._actionsByClip;let a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,a=this._actionsByClip,o=a[r],c=o.knownActions,l=c[c.length-1],u=e._byClipCacheIndex;l._byClipCacheIndex=u,c[u]=l,c.pop(),e._byClipCacheIndex=null;const h=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete h[d],c.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,r=this._bindings;let a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[i],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new ah(new Float32Array(2),new Float32Array(2),1,Vg),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const i=t||this._root,r=i.uuid;let a=typeof e=="string"?Eo.findByName(i,e):e;const o=a!==null?a.uuid:e,c=this._actionsByClip[o];let l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=2500),c!==void 0){const h=c.actionByRoot[r];if(h!==void 0&&h.blendMode===n)return h;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;const u=new Hg(this,a,t,n);return this._bindAction(u,l),this._addInactiveAction(u,o,r),u}existingAction(e,t){const n=t||this._root,i=n.uuid,r=typeof e=="string"?Eo.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(i,e,r,a);const o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const a=r.knownActions;for(let o=0,c=a.length;o!==c;++o){const l=a[o];this._deactivateAction(l);const u=l._cacheIndex,h=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,c=o[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(const a in r){const o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");function es(s,e=!1){const t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,c=new ln;let l=0;for(let u=0;u<s.length;++u){const h=s[u];let d=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in h.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(h.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in h.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(h.morphAttributes[f])}if(e){let f;if(t)f=h.index.count;else if(h.attributes.position!==void 0)f=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,u),l+=f}}if(t){let u=0;const h=[];for(let d=0;d<s.length;++d){const f=s[d].index;for(let g=0;g<f.count;++g)h.push(f.getX(g)+u);u+=s[d].attributes.position.count}c.setIndex(h)}for(const u in r){const h=ll(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in a){const h=a[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let d=0;d<h;++d){const f=[];for(let b=0;b<a[u].length;++b)f.push(a[u][b][d]);const g=ll(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function ll(s){let e,t,n,i=-1,r=0;for(let l=0;l<s.length;++l){const u=s[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=u.gpuType),i!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}const a=new e(r),o=new Zt(a,t,n);let c=0;for(let l=0;l<s.length;++l){const u=s[l];if(u.isInterleavedBufferAttribute){const h=c/t;for(let d=0,f=u.count;d<f;d++)for(let g=0;g<t;g++){const b=u.getComponent(d,g);o.setComponent(d+h,g,b)}}else a.set(u.array,c);c+=u.count*t}return i!==void 0&&(o.gpuType=i),o}function hl(s,e){if(e===0)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===2||e===1){let t=s.getIndex();if(t===null){const a=[],o=s.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===2)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}const ul='"Fredoka", "Bricolage Grotesque", sans-serif',Xg="#cfdcc4",oo="#d0a54e",Si="#b98d5c",dl="#6e4a2c",jg="#f1ead6",fl="#6b2436";function qg(s,e,{box:t,span:n,material:i,model:r}){const a=e.shell;if(!a)return null;const o=new gt;s.add(o);const[c,l,u]=e.floors,h=()=>{const ee=new gt;return o.add(ee),ee},d=(ee,Z,Ae,Me,Re,ke)=>r&&r(Z,Ae,Me,Re,(at,tt)=>{ee.visible=!1,ke&&ke(at,tt)}),f=a.plaster,g=a.tile,b=a.tileH,m=document.createElement("canvas");m.width=200,m.height=230;const p=m.getContext("2d");p.fillStyle=g,p.fillRect(0,0,200,230),p.fillStyle=Xg;for(let ee=0;ee<200;ee+=200*a.tilePitch)p.fillRect(ee,12,2.4,218);p.fillRect(0,230-230/2,200,2.4),p.fillStyle="#dcc48e",p.fillRect(0,2,200,9);const x=new ui(m);x.colorSpace=qt,x.wrapS=1e3,x.anisotropy=4;const y=new qn(1,1).translate(0,.5,0);function _(ee,Z,Ae,Me,Re=0){const ke=x.clone();ke.needsUpdate=!0,ke.repeat.set(Math.abs(Ae-Z),1);const at=new Je(y,new An({map:ke}));return at.scale.set(Math.abs(Ae-Z),b,1),ee?(at.rotation.y=Math.PI/2,at.position.set(Me+.006,Re,(Z+Ae)/2)):at.position.set((Z+Ae)/2,Re,Me+.006),at.receiveShadow=!0,o.add(at),at}function P(ee,Z,Ae,Me,Re,ke,at,tt=[]){const mt=[...tt].sort((N,U)=>N[0]-U[0]);let Nt=Z;const E=(N,U,H,B)=>ee?n(o,Me-Re,Me,ke+H,ke+B,N,U,f):n(o,N,U,ke+H,ke+B,Me-Re,Me,f);mt.forEach(([N,U,H])=>{N>Nt&&(E(Nt,N,0,at),_(ee,Nt,N,Me,ke)),E(N,U,H,at),Nt=U}),Ae>Nt&&(E(Nt,Ae,0,at),_(ee,Nt,Ae,Me,ke))}const w=c.z-c.d/2;P(!1,(c.x||0)-c.w/2,(c.x||0)+c.w/2,w,.25,0,l.y-.32,[[a.exitDoor.x0,a.exitDoor.x1,a.exitDoor.h]]);const C=l.z-l.d/2,S=-l.w/2;P(!1,S,l.w/2,C,.25,l.y,u.y-l.y-.32),P(!0,C,C+3.5,S,.25,l.y,u.y-l.y-.32);const v=u.z-u.d/2,M=-u.w/2,R=e.rooftop?e.rooftop.y-.34-u.y:3.9,z=u.y+R,k=1.44,X=new Gi({color:"#cfe6df",roughness:.1,metalness:0,transparent:!0,opacity:.26,depthWrite:!1});function ae(ee,Z,Ae,Me,Re){const ke=Math.max(2,Math.round((Ae-Z)/a.glazingBay)),at=(Ae-Z)/ke,tt=u.y;let mt=null;if(Re!==void 0){const N=Math.max(0,Math.min(ke-2,Math.round((Re-Z)/at)-1));mt=[Z+N*at,Z+(N+2)*at]}const Nt=(N,U,H,B,te=.09)=>ee?n(o,Me-te,Me+te*.3,H,B,N,U,"#2c5a44"):n(o,N,U,H,B,Me-te,Me+te*.3,"#2c5a44");Nt(Z,Ae,tt,tt+.3,.16);for(let N=0;N<=ke;N++){const U=Z+N*at;Nt(U-.035,U+.035,tt+.3,tt+R)}Nt(Z,Ae,tt+2.92,tt+2.98),Nt(Z,Ae,tt+R-.08,tt+R);const E=ee?n(o,Me-.02,Me,tt+.3,tt+R,Z,Ae,"#cfe6df",{cast:!1}):n(o,Z,Ae,tt+.3,tt+R,Me-.02,Me,"#cfe6df",{cast:!1});return E.material=X,E.receiveShadow=!1,mt&&n(o,mt[0]+.035,mt[1]-.035,tt+.3,tt+R-.08,Me-.06,Me-.02,"#2f5d4a"),mt}const I=ae(!1,M,a.topLanding.outer,v,a.fanX);ae(!0,v,v+3.5,M);const j=new gt,G=I?(I[0]+I[1])/2:a.fanX;j.position.set(G,u.y+2.15,v+.02),o.add(j);let ce=null;d(j,"exhaust_fan.glb",G,u.y+2.15,v+.02,ee=>{ce=ee.getObjectByName("Rotor")}),t(j,0,-.72,.06,1.44,1.44,.14,"#2f6b52");const Y=new Je(new un(.56,.56,.05,40).rotateX(Math.PI/2),i("#1d3028"));Y.position.z=.14,j.add(Y);const Q=new gt;Q.position.z=.18,j.add(Q);for(let ee=0;ee<4;ee++){const Z=new Je(new cn(.44,.17,.02).translate(.27,0,0),i("#b9cbb4"));Z.rotation.z=ee*Math.PI/2,Z.rotation.x=.25,Q.add(Z)}const Se=new Je(new un(.1,.1,.06,20).rotateX(Math.PI/2),i("#d8c18b"));Q.add(Se);const De=1.46,ie=e.rooftop?2:0,pe=1.8,Fe=De*pe,ye=.5,ht=a.topLanding.outer-.035,ut=ht-ie*Fe,pt=z+k*pe/2,At=v-.09,yt=e.rooftop?new Oi(new F(.816,-1,0).normalize(),(z-.816*e.rooftop.x1)/Math.hypot(.816,1)):null,St=[],q=ee=>{const Z=ee.clone();return Z.clippingPlanes=St,Z},$t=new ot("#2c5a44"),Tt=Array.from({length:ie},(ee,Z)=>new lt().makeTranslation(ut+Fe*(Z+.5),pt,At).scale(new F(pe,pe,pe*ye)));let Mt=null;r&&ie&&r("exhaust_fan.glb",0,0,0,(ee,Z)=>{const Ae=new lt().copy(Z.parent.matrixWorld).invert(),Me=new lt,Re=ee.getObjectByName("Rotor"),ke=[];St.push(yt.clone().applyMatrix4(Z.parent.matrixWorld)),Z.updateMatrixWorld(!0),ee.traverse(at=>{if(!at.isMesh)return;let tt=!1;for(let E=at;E;E=E.parent)E===Re&&(tt=!0);const mt=/^(Housing|FrontFrame)/.test(at.name)?Object.assign(at.material.clone(),{color:$t}):at.material,Nt=new Kn(at.geometry,Array.isArray(mt)?mt.map(q):q(mt),ie);Me.multiplyMatrices(Ae,at.matrixWorld),Tt.forEach((E,N)=>Nt.setMatrixAt(N,new lt().multiplyMatrices(E,Me))),Nt.computeBoundingSphere(),Nt.castShadow=!1,Nt.receiveShadow=!0,o.add(Nt),tt&&ke.push({part:at,mesh:Nt})}),Z.parent.remove(Z),Mt={rotor:Re,holder:Z,parentInverse:new lt,spinning:ke}});const rt=new un(.09,.09,.22,12).translate(0,.11,0),Ft=new cn(.18,.26,.07).translate(0,.13,0),Ye=[],D=ee=>{const Z={g:ee,jars:[],pouches:[]};return Ye.push(Z),Z};function A(ee,Z,Ae,Me,Re,ke,at,tt,mt){const{jars:Nt,pouches:E}=D(ee);n(ee,Z,Ae,ke,ke+at,Me,Me+.05,dl,{cast:!1}),n(ee,Z,Ae,ke,ke+.14,Me,Me+Re,Si),n(ee,Z-.02,Ae+.02,ke+at-.1,ke+at,Me,Me+Re+.02,Si);const N=(Ae-Z)/tt;for(let U=0;U<=tt;U++)n(ee,Z+U*N-.035,Z+U*N+.035,ke,ke+at,Me,Me+Re,Si);for(let U=1;U<=mt;U++){const H=ke+.14+(at-.24)*U/(mt+1);n(ee,Z,Ae,H-.04,H,Me,Me+Re,"#c79f6c",{cast:!1});for(let B=0;B<tt;B++)for(let te=0;te<4;te++){const de=Z+B*N+N*(te+.5)/4,_e=Me+Re*.55;((B+U+te)%3?Nt:E).push([de,H,_e,(B*7+U*3+te)%4])}if(U===1)for(let B=0;B<tt;B++)for(let te=0;te<4;te++)Nt.push([Z+B*N+N*(te+.5)/4,ke+.14,Me+Re*.55,(B+te)%4])}}const J=a.loungeFront,fe=J-.81,xe=a.loungeDoor.x,he=a.loungeRight,$e=l.y-.32;n(o,-11.03,xe-.7,0,$e,fe,J,f),n(o,xe-.7,xe+.7,a.loungeHeader,$e,fe,J,f),n(o,xe+.7,he+.16,0,$e,fe,J,f),_(!1,-11.03,xe-.7,J),_(!1,xe+.7,a.wallLeft,J),_(!1,a.wallLeft,he+.16,J),n(o,-11.5,-11.18,0,3.95,w,J,f),_(!0,w,J,-11.18);const Pe=a.loungeExit.z,Ne=.92,wt=2.84;n(o,he-.16,he+.16,0,$e,w,Pe-Ne,f),n(o,he-.16,he+.16,wt,$e,Pe-Ne,Pe+Ne,f),n(o,he-.16,he+.16,0,$e,Pe+Ne,J,f),_(!0,w,Pe-Ne-.04,he+.16),_(!0,Pe+Ne+.04,J,he+.16),n(o,he-.1,he+.1,0,wt,Pe-Ne,Pe+Ne,"#0d1310",{cast:!1});const we=[];e.rooftop||(n(o,-11.18,he-.16,.002,.012,w,fe,"#2a1b22",{cast:!1}),n(o,-10.95,-9.25,.012,.022,-5.3,-2.9,"#5a2638",{cast:!1}),n(o,-10.75,-9.45,.022,.03,-5.1,-3.1,"#7a3a4c",{cast:!1}),[[-6.15,-5.55,1],[-2.65,-2.05,-1]].forEach(([ee,Z,Ae])=>{n(o,-10.9,-9.3,0,.48,ee,Z,fl);const Me=Ae>0?[ee,ee+.16]:[Z-.16,Z];n(o,-10.9,-9.3,.48,.95,Me[0],Me[1],"#5c1e30"),n(o,-10.9,-10.72,.48,.7,ee,Z,"#5c1e30"),n(o,-9.48,-9.3,.48,.7,ee,Z,"#5c1e30")}),n(o,-10.55,-9.65,0,.4,-4.35,-3.85,"#3a2a1e"),[[-10.7,-6.6],[-10.7,-1.55],[-9.6,-4.1]].forEach(([ee,Z])=>{t(o,ee,0,Z,.4,.62,.4,"#3a2a1e"),t(o,ee,.62,Z,.04,.4,.04,"#d8c18b",{cast:!1});const Ae=new Je(new un(.13,.2,.26,16).translate(0,.13,0),new An({color:"#f3d9a6",emissive:"#ffb36a",emissiveIntensity:0}));Ae.position.set(ee,1,Z),o.add(Ae),we.push(Ae)}));const Oe=i(fl);function Xe(ee){const Z=ee?{centre:Pe,plane:he+.2,scale:1.35,top:2.78}:{centre:xe,plane:J+.05,scale:1,top:a.loungeHeader+.02},Ae=[-1,1].map(Re=>{const ke=new Je(dt,Oe);return ke.castShadow=!0,o.add(ke),{side:Re,m:ke}}),Me=ee?n(o,Z.plane-.05,Z.plane+.09,Z.top-.1,Z.top+.06,Z.centre-Ne-.02,Z.centre+Ne+.02,"#4a1b29"):n(o,Z.centre-.75,Z.centre+.75,Z.top-.1,Z.top+.06,Z.plane-.05,Z.plane+.09,"#4a1b29");return{pair:Ae,pelmet:Me,exit:ee,set(Re,ke){Me.visible=ke,Ae.forEach(({side:at,m:tt})=>{tt.visible=ke;const mt=.68*Z.scale,Nt=(.07+(.5-.07)*Re)*Z.scale,E=Math.max(.08,mt-Nt),N=at*(Nt+E/2);ee?(tt.position.set(Z.plane,0,Z.centre+N),tt.scale.set(.08,Z.top-.08,E)):(tt.position.set(Z.centre+N,0,Z.plane),tt.scale.set(E,Z.top-.08,.08))})}}}const dt=new cn(1,1,1).translate(0,.5,0),Ve=Xe(!1),Ct=Xe(!0);r&&r("lounge_drapes.glb",0,0,0,(ee,Z)=>{Z.removeFromParent(),ee.updateMatrixWorld(!0);const Ae=at=>{const tt=ee.getObjectByName(at),mt=[];if(!tt)return null;const Nt=new lt().copy(tt.matrixWorld).invert();tt.traverse(H=>{if(!H.isMesh)return;const B=H.geometry.clone().applyMatrix4(new lt().multiplyMatrices(Nt,H.matrixWorld)),te=H.material.color,de=B.attributes.position.count,_e=new Float32Array(de*3);for(let Le=0;Le<de;Le++)_e.set([te.r,te.g,te.b],Le*3);B.setAttribute("color",new Zt(_e,3)),Object.keys(B.attributes).forEach(Le=>{["position","normal","color"].includes(Le)||B.deleteAttribute(Le)}),mt.push(B)});const E=es(mt);E.computeBoundingBox();const N=E.boundingBox,U=N.getSize(new F);return E.translate(-(N.min.x+N.max.x)/2,-N.min.y,-(N.min.z+N.max.z)/2).scale(1/U.x,1/U.y,1/U.z),E.computeVertexNormals(),E},Me=Ae("Drape"),Re=Ae("Pelmet");if(!Me||!Re)return;const ke=i("#ffffff",{vertexColors:!0});[Ve,Ct].forEach(at=>{const tt=mt=>at.exit?mt.clone().rotateY(-Math.PI/2):mt;at.pair.forEach(({m:mt})=>{mt.geometry=tt(Me),mt.material=ke}),at.pelmet.geometry=tt(Re),at.pelmet.material=ke})});const vt=e.rooftop?null:n(o,xe-.7,xe+.7,0,a.loungeHeader,J,J+.08,"#2d6146"),Bt=n(o,he+.16,he+.21,0,wt-.24,Pe-Ne+.15,Pe+Ne-.15,"#3a2a1e"),V=document.createElement("canvas");V.width=512,V.height=184;const Ue=new ui(V);Ue.colorSpace=qt;const le=new Mn({map:Ue,transparent:!0}),be=new Je(new qn(2,.72),le);be.position.set(xe+2.1,2.02,J+.03),o.add(be);let ze=null;typeof FontFace=="function"&&document.fonts&&(new FontFace("Fredoka",`url(${new URL("../fonts/Fredoka-SemiBold.ttf",e.modelBase).href})`,{weight:"600"}).load().then(ee=>{document.fonts.add(ee),ze=null,Yn=null,Vn=!0}).catch(()=>{}),new FontFace("Yellowtail",`url(${new URL("../fonts/Yellowtail-Regular.woff2",e.modelBase).href})`).load().then(ee=>{document.fonts.add(ee),ze=null}).catch(()=>{}));function Be(ee){if(ze===ee)return;ze=ee;const Z=V.getContext("2d");Z.clearRect(0,0,512,184),Z.fillStyle="#1a1216",Z.beginPath(),Z.roundRect(6,8,500,168,22),Z.fill();const Ae=(Me,Re,ke,at,tt,mt)=>{ee?(Z.shadowColor=at,Z.shadowBlur=22,Z.fillStyle=at,Z.fillText(Me,Re,ke),Z.shadowBlur=0,Z.fillStyle=tt,Z.fillText(Me,Re,ke)):(Z.fillStyle=mt,Z.fillText(Me,Re,ke))};Z.textAlign="center",Z.textBaseline="middle",Z.save(),Z.translate(256,56),Z.rotate(-.06),Z.font='400 88px "Yellowtail", cursive',Ae("Rooftop",0,0,"#ffbf5a","#fff1d6","#5d5040"),Z.restore(),Z.font=`600 72px ${ul}`,Ae("LOUNGE",256,128,"#ff8fbf","#fff4f8","#5a4750"),Ue.needsUpdate=!0}const nt={x:(a.wallLeft+a.shelfLeft)/2,y:1.8,w:5.1,h:1.24},Kt=h();n(Kt,nt.x-nt.w/2-.14,nt.x+nt.w/2+.14,nt.y-.12,nt.y+nt.h+.12,J,J+.1,Si),n(Kt,nt.x-nt.w/2+.04,nt.x+nt.w/2-.04,nt.y+.04,nt.y+nt.h-.04,J+.1,J+.12,oo,{cast:!1});const hn=document.createElement("canvas");hn.width=1024,hn.height=240;const Pt=new ui(hn);Pt.colorSpace=qt,Pt.anisotropy=4;const ge=new Je(new qn(nt.w-.14,nt.h-.14),new Mn({map:Pt}));ge.position.set(nt.x,nt.y+nt.h/2,J+.125),Kt.add(ge),d(Kt,"menu_board.glb",nt.x,0,J,ee=>{const Z=ee.getObjectByName("BoardFace");Z&&Z.traverse(Ae=>{if(!Ae.isMesh)return;const Me=Ae.geometry.attributes.uv;for(let Re=0;Re<Me.count;Re++)Me.setY(Re,1-Me.getY(Re));Me.needsUpdate=!0,Ae.material=ge.material})});const _n=" ABCDEFGHIJKLMNOPQRSTUVWXYZ$0123456789.,",mn=55,Pn=9;let en=null,Yn=null,Vn=!1;function fi(ee,Z){const Ae=ee.length,Me=ee[0]?ee[0].length:21;if((!en||en.length!==Ae||en[0].length!==Me)&&(en=ee.map(mt=>[...mt].map(()=>({from:" ",to:" ",start:0})))),ee.forEach((mt,Nt)=>[...mt].forEach((E,N)=>{const U=en[Nt][N];U.to!==E&&(U.from=U.to,U.to=E,U.start=Z+N*35+Nt*90,Vn=!0)})),!Vn&&Yn!==null)return;Yn="";const Re=hn.getContext("2d"),ke=1024/Me,at=240/Ae;Re.fillStyle="#131617",Re.fillRect(0,0,1024,240),Re.font=`600 ${Math.round(at*.66)}px ${ul}`,Re.textAlign="center",Re.textBaseline="middle";const tt=(mt,Nt,E,N,U)=>{const H=E+at/2,B=(at/2-4)*U;Re.save(),Re.beginPath(),Re.rect(Nt+2,N?H-B:H,ke-4,B),Re.clip(),Re.fillStyle=N?"#363c3e":"#2b3133",Re.fillRect(Nt+2,N?H-B:H,ke-4,B),mt!==" "&&(Re.translate(0,H),Re.scale(1,U),Re.fillStyle="#efe4c8",Re.fillText(mt,Nt+ke/2,1)),Re.restore()};Vn=!1,en.forEach((mt,Nt)=>mt.forEach((E,N)=>{const U=N*ke,H=Nt*at,B=Z-E.start;let te=E.to,de=E.to,_e=1;if(B<0)te=de=E.from,Vn=!0;else if(E.from!==E.to&&B<mn*Pn){const Le=Math.floor(B/mn),Ke=_n.indexOf(E.to)+_n.length-Pn;te=Le?_n[(Ke+Le)%_n.length]:E.from,de=_n[(Ke+Le+1)%_n.length],_e=B%mn/mn,Vn=!0}else E.from=E.to;_e>=1?(tt(te,U,H,!0,1),tt(te,U,H,!1,1)):(tt(de,U,H,!0,1),tt(te,U,H,!1,1),_e<.5?tt(te,U,H,!0,1-_e*2):tt(de,U,H,!1,_e*2-1)),Re.fillStyle="#0d1113",Re.fillRect(U+2,H+at/2-1,ke-4,2)})),Pt.needsUpdate=!0}const En=h();A(En,a.shelfLeft,a.wallRight,J,.64,0,3.3,5,4),d(En,"product_shelving.glb",(a.shelfLeft+a.wallRight)/2,0,J+.32);const ii=h();A(ii,-9,9,C,.6,l.y,2.6,8,3),d(ii,"wall_shelving.glb",0,l.y,C+.3);const Yt=h(),yi=D(Yt);d(Yt,"arch_shelves.glb",-8.525,l.y,-4.85),n(Yt,-8.85,-8.2,l.y,l.y+2.4,-5.9,-3.8,Si);const si=new Je(new un(1.05,1.05,.65,32,1,!1,0,Math.PI).rotateZ(Math.PI/2),i(Si));si.position.set(-8.525,l.y+2.4,-4.85),si.castShadow=!0,Yt.add(si),n(Yt,-8.21,-8.19,l.y+.2,l.y+2.3,-5.7,-4,"#e8dcc4",{cast:!1});for(let ee=0;ee<3;ee++)for(let Z=0;Z<3;Z++)yi.jars.push([-8.35,l.y+.5+ee*.7,-5.45+Z*.6,(ee+Z)%4]);for(let ee=0;ee<3;ee++)n(Yt,-8.85,-8.2,l.y+.45+ee*.7,l.y+.5+ee*.7,-5.8,-3.9,"#ecdbc1",{cast:!1});const xn=a.column,ri=h();t(ri,xn.x,0,xn.z,.78,1.73,.73,"#25523b"),t(ri,xn.x,1.73,xn.z,.8,.12,.76,"#e1dbc0"),t(ri,xn.x,1.85,xn.z,.75,$e-1.85,.7,jg);const Jn=new An({color:"#fff2c8",emissive:"#ffd58a",emissiveIntensity:0}),T=new Je(new bi(.13,12,8),Jn);T.position.set(xn.x,2.6,xn.z+.42),ri.add(T);const K=(ee,Z,Ae)=>{const Me=ee.getObjectByName(Z);Me&&Me.traverse(Re=>{if(Re.isMesh){const ke=Re.material.clone();ke.emissive=Ae.emissive.clone(),Re.material=ke,se.push([ke,Ae])}})},se=[];d(ri,"shop_column.glb",xn.x,0,xn.z,ee=>K(ee,"Sconce",Jn));const $=a.exitDoor,W=h();n(W,$.x0-.14,$.x0,0,$.h+.14,w-.1,w+.12,"#1f4a35"),n(W,$.x1,$.x1+.14,0,$.h+.14,w-.1,w+.12,"#1f4a35"),n(W,$.x0-.14,$.x1+.14,$.h,$.h+.2,w-.1,w+.12,"#1f4a35"),n(W,$.x0,$.x0+.06,.02,$.h-.02,w+.1,w+.95,"#2d6146"),n(W,($.x0+$.x1)/2-.4,($.x0+$.x1)/2+.4,$.h+.3,$.h+.56,w,w+.08,"#1d3028");const Te=new Je(new cn(.66,.14,.04),new An({color:"#d84a3a",emissive:"#ff5a3c",emissiveIntensity:.4}));Te.position.set(($.x0+$.x1)/2,$.h+.43,w+.1),W.add(Te),d(W,"exit_door.glb",($.x0+$.x1)/2,0,w,ee=>{K(ee,"ExitLamp",Te.material);const Z=ee.getObjectByName("DoorLeaf");Z&&(Z.rotation.y=-Z.rotation.y,Z.position.z=-Z.position.z)});const me=a.merchCabinet,je=h(),et=D(je);d(je,"merch_cabinet.glb",(me.back+me.face)/2,0,(me.z0+me.z1)/2,ee=>{const Z=ee.getObjectByName("CabinetGlass");Z&&Z.traverse(Ae=>{Ae.isMesh&&(Ae.material=X,Ae.castShadow=!1)})}),n(je,me.back,me.face,0,.2,me.z0,me.z1,dl),n(je,me.back,me.face,.2,2.6,me.z0,me.z0+.1,Si),n(je,me.back,me.face,.2,2.6,me.z1-.1,me.z1,Si),n(je,me.back,me.back+.12,.2,2.6,me.z0,me.z1,Si);const _t=new Je(new un((me.z1-me.z0)/2,(me.z1-me.z0)/2,me.face-me.back,32,1,!1,0,Math.PI).rotateZ(Math.PI/2),i(Si));_t.position.set((me.face+me.back)/2,2.6,(me.z0+me.z1)/2),_t.castShadow=!0,je.add(_t);for(let ee=0;ee<3;ee++){n(je,me.back+.12,me.face-.05,.55+ee*.68,.6+ee*.68,me.z0+.1,me.z1-.1,"#ecdbc1",{cast:!1});for(let Z=0;Z<4;Z++)(Z%2?et.pouches:et.jars).push([(me.back+me.face)/2,.6+ee*.68,me.z0+.35+Z*(me.z1-me.z0-.7)/3,(ee+Z)%4])}const xt=n(je,me.face-.03,me.face,.2,2.6,me.z0+.1,me.z1-.1,"#cfe6df",{cast:!1});xt.material=X;const We=e.marquee,It=We.zFront-We.zRear,kt=document.createElement("canvas");kt.width=2048,kt.height=192;const Lt=kt.getContext("2d");Lt.fillStyle="#f1e7cc",Lt.fillRect(0,0,2048,96),Lt.fillStyle="#1f6b47",Lt.fillRect(0,96,2048,96),Lt.font='800 54px "Bricolage Grotesque", sans-serif',Lt.textAlign="center",Lt.textBaseline="middle",We.top.forEach((ee,Z)=>{Lt.fillStyle="#1f5e40",Lt.fillText(ee,(Z+.5)*512,50)}),Lt.font='700 40px "Bricolage Grotesque", sans-serif',We.bottom.forEach((ee,Z)=>{Lt.fillStyle="#f1e7cc",Lt.fillText(ee,(Z+.5)*512,146)}),Lt.fillStyle="#1a1e20";for(let ee=1;ee<4;ee++)Lt.fillRect(ee*512-3,0,6,192);const Ze=new ui(kt);Ze.colorSpace=qt,Ze.anisotropy=4;const Gt=new An({map:Ze,emissive:"#ffffff",emissiveMap:Ze,emissiveIntensity:.15}),Ie=new Je(new qn(It,We.y1-We.y0),Gt);Ie.rotation.y=Math.PI/2,Ie.position.set(We.x+.17,(We.y0+We.y1)/2,(We.zFront+We.zRear)/2),e.wallFaces||o.add(Ie);const bt=a.planter,Et=h();d(Et,"shop_planter.glb",(bt.x0+bt.x1)/2,0,(bt.z0+bt.z1)/2),n(Et,bt.x0,bt.x1,0,.56,bt.z0,bt.z1,"#1f5e40"),n(Et,bt.x0-.04,bt.x1+.04,.56,.63,bt.z0-.04,bt.z1+.04,"#2b302d"),n(Et,bt.x0+.1,bt.x1-.1,.63,.66,bt.z0+.1,bt.z1-.1,"#514633",{cast:!1});const Vt=a.baseboard,Ot=.14;[[Vt.x0,Vt.x1,Vt.front-Ot,Vt.front],[Vt.x1-Ot,Vt.x1,Vt.rear,Vt.front-Ot]].forEach(([ee,Z,Ae,Me])=>{n(o,ee,Z,0,Vt.h-.1,Ae,Me,"#1f5e40"),n(o,ee-.01,Z+.01,Vt.h-.1,Vt.h-.07,Ae-.01,Me+.01,oo,{cast:!1}),n(o,ee-.02,Z+.02,Vt.h-.07,Vt.h,Ae-.03,Me+.03,"#e1dbc0")});const bn=[],ai=new ti(1,1),Wt=(ee,Z,Ae,Me,Re)=>{const ke=new Je(ai,i(Re));ke.position.set(ee,Z,Ae),ke.scale.set(Me,Me*.8,Me),ke.castShadow=ke.receiveShadow=!0,Et.add(ke)};[-1.2,-.5,.2,.9,1.6].forEach((ee,Z)=>Wt((bt.x0+bt.x1)/2+(Z%2?.08:-.08),.9,(bt.z0+bt.z1)/2+ee,.3,Z%2?"#6b9250":"#5f8648")),t(Et,bt.tree.x,.63,bt.tree.z,.16,2.4,.16,"#816747"),[[0,3.2,0,.75,"#769852"],[-.35,2.9,.3,.55,"#587c4d"],[.3,3.05,-.3,.55,"#98b96e"]].forEach(([ee,Z,Ae,Me,Re])=>Wt(bt.tree.x+ee,Z,bt.tree.z+Ae,Me,Re));const Jt=a.hanging,Ln=h(),gn=[];n(Ln,Jt.x0,Jt.x1,Jt.y-.04,Jt.y,Jt.z-.03,Jt.z+.03,oo,{cast:!1});for(let ee=0;ee<18;ee++){const Z=Jt.x0+(Jt.x1-Jt.x0)*(ee+.5)/18,Ae=.5+(1-Math.abs(ee-8.5)/9)*.7+ee%3*.12;for(let Me=0;Me<6;Me++){const Re=Me/5;gn.push([Z+Math.sin(ee*1.7+Re*3)*.06,Jt.y-.05-Ae*Re,Jt.z+(ee%2?.06:-.06)+Re*.08,(ee+Me)%3,.8])}}bn.push([Ln,gn]),d(Ln,"pothos_rail.glb",(Jt.x0+Jt.x1)/2,Jt.y,Jt.z),[[l,C],[u,v]].forEach(([ee,Z])=>(ee===u?[-2,2]:[-7,5]).forEach(Ae=>{const Me=Z+.9,Re=ee.y+Math.min(3.95,ee===u?3.5:3.95),ke=h(),at=[];n(ke,Ae-.01,Ae+.01,Re-.7,Re,Me-.01,Me+.01,"#343f33",{cast:!1}),t(ke,Ae,Re-1,Me,.55,.3,.48,"#b6ac8a");for(let tt=0;tt<14;tt++){const mt=tt*2.399;at.push([Ae+Math.cos(mt)*.28,Re-.72-tt%4*.18,Me+Math.sin(mt)*.22,tt%3,.9])}bn.push([ke,at]),d(ke,"hanging_basket.glb",Ae,Re,Me)}));const Fn=["#5f8648","#7aa257","#9cc46e"].map(ee=>new ot(ee)),nn=new ti(.13,0),sn=i("#ffffff"),In=new lt,fn=new Tn,_s=new F,Mi=new F;bn.forEach(([ee,Z])=>{const Ae=new Kn(nn,sn,Z.length);Z.forEach(([Me,Re,ke,at,tt],mt)=>{fn.setFromEuler(new ni(mt*.7,mt*1.3,0)),Ae.setMatrixAt(mt,In.compose(_s.set(Me,Re,ke),fn,Mi.set(1.3*tt,.7*tt,1*tt))),Ae.setColorAt(mt,Fn[at])}),Ae.castShadow=!0,Ae.receiveShadow=!0,ee.add(Ae)});const Nn=["#527e60","#b28b64","#75999a","#d5bd8c"].map(ee=>new ot(ee));Ye.forEach(ee=>[[rt,ee.jars],[Ft,ee.pouches]].forEach(([Z,Ae])=>{if(!Ae.length)return;const Me=new Kn(Z,i("#ffffff"),Ae.length);Ae.forEach(([Re,ke,at,tt],mt)=>{Me.setMatrixAt(mt,In.compose(_s.set(Re,ke,at),fn.identity(),Mi.set(1,1,1))),Me.setColorAt(mt,Nn[tt])}),Me.castShadow=!0,ee.g.add(Me)}));const oi=a.lamps.map(([ee,Z,Ae,Me])=>{const Re=new Ea("#ffc98a",0,11,1.2);return Re.position.set(ee,Z,Ae),Re.userData.power=Me,s.add(Re),Re});return{update(ee){const Z=ee.night||0,Ae=!!ee.loungeOpen;Q.rotation.z=-(ee.time||0)*Math.PI*2/2500,ce&&(ce.rotation.z=Q.rotation.z),Mt&&Mt.rotor&&(Mt.rotor.rotation.z=Q.rotation.z,Mt.holder.updateMatrixWorld(!0),Mt.spinning.forEach(({part:Me,mesh:Re})=>{const ke=new lt().multiplyMatrices(Mt.parentInverse,Me.matrixWorld),at=new lt;Tt.forEach((tt,mt)=>Re.setMatrixAt(mt,at.multiplyMatrices(tt,ke))),Re.instanceMatrix.needsUpdate=!0})),Ve.set(ee.loungeCurtain||0,Ae),Ct.set(ee.loungeExitCurtain||0,Ae),vt&&(vt.visible=!Ae),Bt.visible=!Ae,Be(Ae),le.color.setScalar(Ae?1:.8),ee.menuLines&&fi(ee.menuLines,performance.now()),we.forEach(Me=>{Me.material.emissiveIntensity=Ae?.5+Z*1.2:0}),T.material.emissiveIntensity=.3+Z*1.4,Te.material.emissiveIntensity=.4+Z*1.2,se.forEach(([Me,Re])=>{Me.emissiveIntensity=Re.emissiveIntensity}),Gt.emissiveIntensity=.15+Z*.7,oi.forEach(Me=>{Me.intensity=Me.userData.power*(.2+Z*5)})}}}const wo=Math.asin(Math.tan(Math.PI/6)),vn=1/Math.cos(wo),pl=240;function ml(){const s=new ba(-1,1,1,-1,1,pl*2.5),e=Math.SQRT1_2,t=Math.SQRT1_2,n=Math.sin(wo),i=Math.cos(wo);return s.up.set(-e*n,i,-t*n),s.position.set(e*i,n,t*i).multiplyScalar(pl),s.lookAt(0,0,0),s}function Kg(s,{width:e,height:t,centerX:n,centerY:i,unit:r}){s.left=-n/r,s.right=(e-n)/r,s.top=i/r,s.bottom=-(t-i)/r,s.updateProjectionMatrix(),s.updateMatrixWorld()}const Yg=/^(Rotor|Flame|DoorLeaf|StaffPlaque|Wheel(FL|FR|BL|BR)$)/,co=new lt,gl=new lt,_l=(s,e)=>!!s.userData.motion||Yg.test(s.name)||e;function Jg(s){return s.isMesh&&!s.isInstancedMesh&&!s.isSkinnedMesh&&s.visible&&!Array.isArray(s.material)&&!s.material.transparent&&!Object.keys(s.geometry.morphAttributes).length&&!s.geometry.groups.length&&s.children.length===0}function Zg(s){return Object.keys(s.attributes).sort().map(e=>e+s.attributes[e].itemSize).join()+(s.index?"|i":"")}function Qg(s){const e=new ln;return Object.entries(s.attributes).forEach(([t,n])=>{const i=new Float32Array(n.count*n.itemSize);for(let r=0;r<n.count;r++)for(let a=0;a<n.itemSize;a++)i[r*n.itemSize+a]=n.getComponent(r,a);e.setAttribute(t,new Zt(i,n.itemSize))}),s.index&&e.setIndex(new Zt(s.index.array.slice(),1)),e}function $g(s){if(s.index){const e=s.index;for(let t=0;t<e.count;t+=3){const n=e.getX(t+1);e.setX(t+1,e.getX(t+2)),e.setX(t+2,n)}return}Object.values(s.attributes).forEach(e=>{for(let t=0;t<e.count;t+=3)for(let n=0;n<e.itemSize;n++){const i=e.getComponent(t+1,n);e.setComponent(t+1,n,e.getComponent(t+2,n)),e.setComponent(t+2,n,i)}})}function ps(s,e){s.updateMatrixWorld(!0),gl.copy(s.matrixWorld).invert();const t=new Map,n=[],i=o=>o.children.forEach(c=>{if(c.visible){if(_l(c,e)){n.push(c);return}if(Jg(c)){const l=c.material.uuid+(c.castShadow?"c":"")+(c.receiveShadow?"r":"")+Zg(c.geometry);t.has(l)||t.set(l,[]),t.get(l).push(c)}i(c)}});i(s);let r=0;t.forEach(o=>{if(o.length<2)return;const c=o.map(d=>{const f=Qg(d.geometry);return co.multiplyMatrices(gl,d.matrixWorld),f.applyMatrix4(co),co.determinant()<0&&$g(f),f}),l=es(c);if(!l)return;const u=o[0],h=new Je(l,u.material);h.name="Merged"+(u.material.name||""),h.castShadow=u.castShadow,h.receiveShadow=u.receiveShadow,s.add(h),o.forEach(d=>d.removeFromParent()),r+=o.length-1});const a=o=>[...o.children].forEach(c=>{_l(c,e)||!c.visible||(a(c),(c.type==="Group"||c.type==="Object3D")&&!c.children.length&&c.removeFromParent())});return a(s),n.forEach(o=>{o.children.length&&(r+=ps(o,e))}),r}const rn="#d0a54e",Us="#b98d5c",or="#6e4a2c",Xn="#1f4a35",Ki="#efe4cf",Ni="#6b2436";function e0(s,e,{box:t,span:n,material:i}){const r=e.rooftop;if(!r)return null;const a=new gt;s.add(a);const{x0:o,x1:c,z0:l,z1:u,y:h}=r,d=r.lift,f=Array.from({length:9},()=>new gt);f.forEach(L=>a.add(L));const[g,b,m,p,x,y,_,P,w]=f,C=f.slice(1),[S,v,M,R,z,k,X,ae]=C.map(L=>{const O=new gt;return L.add(O),O}),I=new gt;a.add(I);const j=new Gi({color:"#cfe6df",roughness:.1,metalness:0,transparent:!0,opacity:.28,depthWrite:!1}),G=L=>(L.material=j,L.castShadow=!1,L.receiveShadow=!1,L),ce=(L,O)=>new An({color:L,emissive:O,emissiveIntensity:0}),Y=[];n(a,o,c,h-.3,h,l,u,"#e4ddcc"),n(a,o-.05,c+.05,h-.34,h-.22,l-.05,u+.05,"#e1dbc0",{cast:!1});const Q=e.floors[2].y,Se=e.floors[0].z-e.floors[0].d/2;[[o+.3,u-.3],[c-.3,u-.3]].forEach(([L,O])=>t(a,L,Q,O,.3,h-.3-Q,.3,"#33372f")),l<Se&&([o+.3,0,c-.3].forEach(L=>t(a,L,0,l+.3,.32,h-.3,.32,Xn)),n(a,o,c,h-.62,h-.3,l+.14,l+.46,Xn));const De=document.createElement("canvas");De.width=256,De.height=256;const ie=De.getContext("2d");ie.fillStyle="#b98654",ie.fillRect(0,0,256,256);for(let L=0;L<8;L++)ie.fillStyle=["#bf8c59","#b4814f","#c39260","#b78552"][L%4],ie.fillRect(0,L*32+1,256,30),ie.fillStyle="#8f6038",ie.fillRect(L*97%256,L*32,2,32);const pe=new ui(De);pe.colorSpace=qt,pe.wrapS=pe.wrapT=1e3,pe.anisotropy=4,pe.repeat.set((c-o)/2.4,(u-l)/2.4);const Fe=new Je(new qn(c-o-.2,u-l-.2).rotateX(-Math.PI/2),new An({map:pe}));Fe.position.set((o+c)/2,h+.004,(l+u)/2),Fe.receiveShadow=!0,I.add(Fe);const ye=1.05,ht=[d.z-.6,d.z+.6];function ut(L,O,ne,oe,Ce){const Ee=Math.max(1,Math.round((ne-O)/1.6)),Qe=(ne-O)/Ee,ve=(ue,Ge,ft,it,ct,Rt,pn)=>L?n(Ce,oe-ct,oe+ct,ft,it,ue,Ge,Rt,pn):n(Ce,ue,Ge,ft,it,oe-ct,oe+ct,Rt,pn);for(let ue=0;ue<=Ee;ue++){const Ge=O+ue*Qe;ve(Ge-.04,Ge+.04,h,h+ye,.04,Xn)}ve(O,ne,h+ye-.03,h+ye+.03,.06,rn,{cast:!1}),G(ve(O,ne,h+.08,h+ye-.05,.01,"#cfe6df"))}ut(!1,o,c,u,I),ut(!1,o,c,l,I),ut(!0,l,u,c,I),ut(!0,ht[1],u,o,I);const pt=r.lift2?[r.lift2.z-.6,r.lift2.z+.6]:null,At=new gt;I.add(At),pt?(ut(!0,l,pt[0],o,I),ut(!0,pt[1],ht[0],o,I),ut(!0,pt[0],pt[1],o,At)):ut(!0,l,ht[0],o,I);const yt=(L,O,ne,oe)=>{const Ce=Math.hypot(ne-L,oe-O),Ee=new Je(new cn(Ce,.06,.02),i("#e8b13a",{emissive:"#3a2a00"}));Ee.position.set((L+ne)/2,h+.75,(O+oe)/2),Ee.rotation.y=-Math.atan2(oe-O,ne-L),g.add(Ee)},St=[[o+.2,l+.2],[c-.2,l+.2],[c-.2,u-.2],[o+.2,u-.2]];St.forEach(([L,O],ne)=>{t(g,L,h,O,.07,.8,.07,"#d8cfbd");const[oe,Ce]=St[(ne+1)%4];yt(L,O,oe,Ce)});const q=new gt;g.add(q),t(q,-2.2,h,-4.6,1.6,.18,1.1,"#9a7a52"),t(q,-2.2,h+.18,-4.6,1.5,.5,1,"#c9a978"),t(q,1.8,h,-5.4,1.2,.9,1.2,"#8e9a86"),t(q,3.6,h,-4.5,.9,.14,1.4,"#9a7a52");const $t=new gt;$t.visible=!1,a.add($t);const Tt="#e8b13a",Mt=c-1.3,rt=l+1.1,Ft=6.2;t($t,Mt,h,rt,.9,.25,.9,"#8d918a"),t($t,Mt,h+.25,rt,.32,Ft,.32,Tt);for(let L=1;L<Ft;L+=1.1)t($t,Mt,h+.25+L,rt,.38,.07,.38,"#6b5320");const Ye=new gt;Ye.position.set(Mt,h+.25+Ft,rt),$t.add(Ye),t(Ye,0,0,0,.55,.45,.5,"#efe4cf"),t(Ye,-3.6,.45,0,7.2,.18,.22,Tt),t(Ye,1.2,.45,0,2.4,.18,.22,Tt),t(Ye,2.1,.1,0,.7,.5,.5,"#8d918a"),t(Ye,0,.45,0,.14,1,.14,Tt);const D=-4.6,A=.45,J=3.4;t(Ye,D,A-J,0,.03,J,.03,"#2e3330"),t(Ye,D,A-J-.45,0,1,.12,.7,"#9a7a52"),t(Ye,D,A-J-.33,0,.9,.3,.6,"#c9a978");const fe=new Je(new bi(.13,10,8),new Mn({color:"#ffb52e"}));fe.position.set(0,1.55,0),Ye.add(fe);const xe=o+.5,he=d.z;[[-.7,-.9],[.7,-.9],[-.7,.9],[.7,.9]].forEach(([L,O])=>t($t,xe+L,h,he+O,.06,2.6,.06,"#9aa39b")),[.9,1.8].forEach(L=>{t($t,xe,h+L,he-.9,1.46,.05,.06,"#9aa39b"),t($t,xe,h+L,he+.9,1.46,.05,.06,"#9aa39b"),t($t,xe,h+L-.04,he,1.4,.05,1.7,"#c9a978")});const $e=Array.from({length:10},(L,O)=>{const ne=l+.1+(u-l-.2)*O/10;return t($t,(o+c)/2,h+.01,ne+(u-l-.2)/20,c-o-.2,.03,(u-l-.2)/10-.04,Us,{cast:!1})}),Pe=document.createElement("canvas");Pe.width=160,Pe.height=1600;function Ne(){const L=Pe.getContext("2d"),O=Pe.width,ne=Pe.height,oe=L.createLinearGradient(0,0,0,ne);oe.addColorStop(0,"#24543d"),oe.addColorStop(1,"#173a2a"),L.fillStyle=oe,L.fillRect(0,0,O,ne),L.strokeStyle=rn,L.lineWidth=3,L.lineCap="round",L.lineJoin="round",L.save(),L.translate(O/2,150),[[0,54],[-.62,40],[.62,40]].forEach(([Ce,Ee])=>{L.save(),L.rotate(Ce),L.beginPath(),L.ellipse(0,-Ee/2,9,Ee/2,0,0,Math.PI*2),L.stroke(),L.restore()}),L.beginPath(),L.moveTo(0,0),L.lineTo(0,22),L.stroke(),L.restore(),L.fillStyle=rn,L.fillRect(O/2-18,210,36,2),L.save(),L.translate(O/2+4,520),L.rotate(-Math.PI/2),L.fillStyle=Ki,L.font='600 72px "Bricolage Grotesque", "Helvetica Neue", sans-serif',L.textAlign="center",L.textBaseline="middle","letterSpacing"in L&&(L.letterSpacing="14px"),L.fillText("CANOPY",0,0),L.restore(),wt&&(wt.needsUpdate=!0)}let wt=null;Ne(),wt=new ui(Pe),wt.colorSpace=qt,wt.anisotropy=4,document.fonts&&document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",Ne);const we=new gt;a.add(we);{const L=new An({map:wt}),O=2.9,ne=h+2.75,oe=Ee=>new Je(new qn(Ee,ne-O),L),Ce=oe(d.w+.06);Ce.position.set(d.x,(O+ne)/2,d.z+d.d/2+.03),we.add(Ce),[-1,1].forEach(Ee=>{const Qe=oe(d.d+.06);Qe.rotation.y=Ee*Math.PI/2,Qe.position.set(d.x+Ee*(d.w/2+.03),(O+ne)/2,d.z),we.add(Qe)}),we.traverse(Ee=>{Ee.isMesh&&(Ee.castShadow=!0,Ee.receiveShadow=!0)})}const Oe=d.w/2,Xe=d.d/2,dt=h+2.9,Ve=.09;function Ct(L,O,ne){const oe=d.x,Ce=[L-.6,L+.6],Ee=new gt,Qe=new gt,ve=new gt;O.add(Ee),ne.add(Qe),ne.add(ve),[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([on,Un])=>t(Ee,oe+on*(Oe-Ve/2),0,L+Un*(Xe-Ve/2),Ve,dt,Ve,Xn));const ue=(on,Un,Mr,Sr=.01)=>{const Er=oe-Oe-Sr,Ar=oe+Oe+Sr,wr=L-Xe-Sr,Tr=L+Xe+Sr,Rr=.04;n(Ee,Er,Ar,on,on+Un,wr,wr+Rr,Mr,{cast:!1}),n(Ee,Er,Ar,on,on+Un,Tr-Rr,Tr,Mr,{cast:!1}),n(Ee,Er,Er+Rr,on,on+Un,wr,Tr,Mr,{cast:!1}),n(Ee,Ar-Rr,Ar,on,on+Un,wr,Tr,Mr,{cast:!1})};[0,e.floors[1].y,e.floors[2].y,h].forEach(on=>ue(on+2.62,.06,Xn)),n(Ee,oe-Oe-.03,oe+Oe+.03,dt,dt+.16,L-Xe-.03,L+Xe+.03,Xn),ue(dt+.16,.025,rn,.03),n(Ee,oe+Oe,oe+Oe+.6,h+2.5,h+2.55,L-Xe+.05,L+Xe-.05,Xn),[[!1,L+Xe],[!1,L-Xe],[!0,oe-Oe],[!0,oe+Oe]].forEach(([on,Un])=>{G(on?n(Qe,Un-.01,Un+.01,.05,dt,L-Xe+.06,L+Xe-.06,"#cfe6df"):n(Qe,oe-Oe+.06,oe+Oe-.06,.05,dt,Un-.01,Un+.01,"#cfe6df"))});const Ge=new gt;ne.add(Ge);const ft=new gt;Ge.add(ft);const it=d.w-.3,ct=d.d-.3,Rt=2.35;n(ft,-it/2,it/2,0,.12,-ct/2,ct/2,"#2b302d"),n(ft,-it/2,it/2,Rt-.14,Rt,-ct/2,ct/2,rn),[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([on,Un])=>t(ft,on*(it/2-.04),.12,Un*(ct/2-.04),.08,Rt-.26,.08,rn)),n(ft,-it/2+.05,-it/2+.1,.12,Rt-.14,-ct/2+.1,ct/2-.1,or,{cast:!1});const pn=new Je(new cn(it-.3,.04,ct-.3),ce("#fff2c8","#ffd58a"));pn.position.y=Rt-.16,ft.add(pn),Y.push([pn.material,.4,1.2]),Ge.position.set(oe,0,L);const Wn=oe+Oe,Zn=o;return n(ve,Wn,Zn+.05,h-.26,h,Ce[0],Ce[1],"#e4ddcc"),Ce.forEach(on=>{n(ve,Wn,Zn,h+ye-.03,h+ye+.03,on-.05,on+.05,rn,{cast:!1}),G(n(ve,Wn,Zn,h+.05,h+ye-.05,on-.01,on+.01,"#cfe6df"))}),n(ve,Wn+.05,o+1.2,h+.006,h+.016,L-.38,L+.38,Ni,{cast:!1}),n(ve,Wn+.05,o+1.2,h+.004,h+.012,L-.45,L+.45,rn,{cast:!1}),{cab:Ge,cabK:ft,kf:Ee,ki:Qe,kb:ve,frame:O,inside:ne,lz:L,cabLamp:pn}}const vt=[Ct(d.z,a,I)],Bt=new gt;I.add(Bt),r.lift2&&vt.push(Ct(r.lift2.z,Bt,Bt));const V=vt[0].cab,Ue=vt[1]?vt[1].cab:null,le=new gt;I.add(le);const be=new ti(1,1),ze=(L,O,ne,oe,Ce,Ee)=>{const Qe=new Je(be,i(Ee));Qe.position.set(O,ne,oe),Qe.scale.set(Ce,Ce*.8,Ce),Qe.castShadow=Qe.receiveShadow=!0,L.add(Qe)},Be=new gt;I.add(Be);const nt=[[o+.2,o+.9,l+.2,(r.lift2?r.lift2.z:d.z)-.9],[o+.2,o+.9,d.z+.9,u-.2]];nt.forEach(([L,O,ne,oe])=>{n(Be,L,O,h,h+.55,ne,oe,"#1f5e40"),n(Be,L-.03,O+.03,h+.55,h+.6,ne-.03,oe+.03,"#e1dbc0",{cast:!1});for(let Ce=ne+.35;Ce<oe-.2;Ce+=.55)ze(Be,(L+O)/2,h+.8,Ce,.32,Math.round(Ce*3)%2?"#6b9250":"#5f8648")}),[[c-.5,u-.5],[c-.6,l+.6]].forEach(([L,O])=>{const ne=new Je(new un(.34,.26,.7,20).translate(0,.35,0),i("#d9cdb4"));ne.position.set(L,h,O),ne.castShadow=ne.receiveShadow=!0,le.add(ne),t(le,L,h+.7,O,.1,1.1,.1,"#7a6142"),[[0,2.05,0,.55,"#8aa66a"],[-.25,1.8,.2,.4,"#7a9a5c"],[.22,1.9,-.2,.42,"#9cb57a"]].forEach(([oe,Ce,Ee,Qe,ve])=>ze(le,L+oe,h+Ce,O+Ee,Qe,ve))});const Kt=[],hn=new An({color:"#2b302d"});function Pt(L,O,ne,oe,Ce,Ee,Qe,ve){const ue=[];for(let ft=0;ft<=ve*2;ft++){const it=ft/(ve*2),ct=Math.sin(Math.PI*it)*.45,Rt=[O+(Ce-O)*it,oe+(Qe-oe)*it-ct,ne+(Ee-ne)*it];ue.push(new F(...Rt)),ft%2===0&&Kt.push([L,Rt[0],Rt[1]-.07,Rt[2]])}const Ge=new Je(new js(new xa(ue),ve*4,.014,4),hn);L.add(Ge)}const ge={x0:o+1.4,x1:o+6.2,z0:l+.25,z1:l+3.4,h:2.75};[[ge.x0,ge.z0],[ge.x1,ge.z0],[ge.x1,ge.z1],[ge.x0,ge.z1]].forEach(([L,O])=>t(S,L,h,O,.14,ge.h,.14,Xn)),n(S,ge.x0-.1,ge.x1+.1,h+ge.h,h+ge.h+.16,ge.z0-.07,ge.z0+.07,Xn),n(S,ge.x0-.1,ge.x1+.1,h+ge.h,h+ge.h+.16,ge.z1-.07,ge.z1+.07,Xn);for(let L=ge.x0+.1;L<ge.x1;L+=.38)n(S,L-.04,L+.04,h+ge.h+.16,h+ge.h+.26,ge.z0-.3,ge.z1+.3,Us);const _n=(L,O,ne,oe,Ce,Ee)=>{n(L,O,ne,h,h+.22,oe,Ce,or),n(L,O+.03,ne-.03,h+.22,h+.48,oe+.03,Ce-.03,Ki),Ee==="z0"&&n(L,O,ne,h+.22,h+.92,oe,oe+.22,Ki),Ee==="x0"&&n(L,O,O+.22,h+.22,h+.92,oe,Ce,Ki),Ee==="x1"&&n(L,ne-.22,ne,h+.22,h+.92,oe,Ce,Ki)};_n(S,ge.x0+.25,ge.x1-.5,ge.z0+.15,ge.z0+.95,"z0"),_n(S,ge.x0+.25,ge.x0+1.05,ge.z0+.95,ge.z1-.3,"x0"),[[ge.x0+1,ge.z0+.45],[ge.x0+2.6,ge.z0+.45],[ge.x0+3.6,ge.z0+.45],[ge.x0+.55,ge.z0+1.7]].forEach(([L,O])=>t(S,L,h+.48,O,.32,.3,.14,Ni));const mn=ge.x0+2.5,Pn=ge.z0+2.05;n(S,mn-.9,mn+.9,h,h+.38,Pn-.45,Pn+.45,"#3a3f3a"),n(S,mn-.92,mn+.92,h+.38,h+.44,Pn-.47,Pn+.47,"#d8d2c2"),n(S,mn-.6,mn+.6,h+.44,h+.47,Pn-.15,Pn+.15,rn,{cast:!1});let en=new Je(new cn(1.1,.12,.1).translate(0,.06,0),new Mn({color:"#ffb35a",transparent:!0,opacity:.9}));en.position.set(mn,h+.47,Pn),S.add(en),Pt(b,ge.x0,ge.z1,h+ge.h,o+.25,u-.2,h+ye+.9,9),Pt(b,ge.x1,ge.z1,h+ge.h,c-.3,u-.2,h+ye+.9,12),t(b,o+.25,h,u-.2,.06,ye+.95,.06,Xn),t(b,c-.3,h,u-.2,.06,ye+.95,.06,Xn);const Yn=new gt;b.add(Yn);const Vn=new ti(.17,0),fi=new An({color:"#ffffff"}),En=[];let ii=7;const Yt=()=>(ii=ii*16807%2147483647,ii/2147483647),yi=h+ge.h+.26,si=13;for(let L=0;L<si;L++){const O=ge.x0+.1+L*(ge.x1-ge.x0-.2)/(si-1);for(let ne=ge.z0-.25;ne<=ge.z1+.25;ne+=.3){const oe=Math.min(Math.abs(ne-ge.z0),Math.abs(ne-ge.z1));Yt()<.35+oe*.25||En.push([O+(Yt()-.5)*.22,yi+Yt()*.08,ne+(Yt()-.5)*.16,.7+Yt()*.7])}}[ge.z0,ge.z1].forEach(L=>{for(let O=ge.x0-.05;O<=ge.x1+.05;O+=.22)En.push([O,yi-.04+Yt()*.06,L+(Yt()-.5)*.2,.8+Yt()*.5])}),[[ge.x0,ge.z1,2.3],[ge.x1,ge.z1,2.1],[ge.x0,ge.z0,1.2],[ge.x1,ge.z0,1.4]].forEach(([L,O,ne])=>{for(let oe=0;oe<ne;oe+=.16){const Ce=oe*4.2+L;En.push([L+Math.cos(Ce)*.12,h+ge.h+.1-oe,O+Math.sin(Ce)*.12,.55+Yt()*.35-oe*.1])}});const xn=new Kn(Vn,fi,En.length),ri=new lt,Jn=new Tn,T=new ni,K=new F,se=new F,$=new ot,W=["#4f8a3a","#3f7a33","#6a9e45","#2f6a30"];En.forEach(([L,O,ne,oe],Ce)=>{T.set(Yt()*3,Yt()*3,Yt()*3),Jn.setFromEuler(T),K.set(oe*1.2,oe*.7/vn,oe),se.set(L,O,ne),xn.setMatrixAt(Ce,ri.compose(se,Jn,K)),xn.setColorAt(Ce,$.set(W[Ce%W.length]))}),xn.castShadow=!0,xn.receiveShadow=!0,Yn.add(xn);const Te=document.createElement("canvas");Te.width=Te.height=64;const me=Te.getContext("2d"),je=me.createRadialGradient(32,32,0,32,32,32);je.addColorStop(0,"rgba(255,255,255,1)"),je.addColorStop(.5,"rgba(255,255,255,.6)"),je.addColorStop(1,"rgba(255,255,255,0)"),me.fillStyle=je,me.fillRect(0,0,64,64);const et=new ui(Te),_t=4,xt=4400,We=4200,It=[],kt=new gt;I.add(kt);function Lt(L){for(;It.length<=L;){const O=new jl({map:et,color:"#e9e4dc",transparent:!0,depthWrite:!1,opacity:0}),ne=new $m(O);ne.renderOrder=5,kt.add(ne),It.push(ne)}return It[L]}const Ze={x0:c-4.4,x1:c-1.2,z:l+1.5};n(v,Ze.x0,Ze.x1,h,h+1.05,Ze.z-.45,Ze.z,"#25523b"),n(v,Ze.x0-.06,Ze.x1+.06,h+1.05,h+1.12,Ze.z-.55,Ze.z+.1,"#ece4d2"),n(v,Ze.x0,Ze.x1,h+.18,h+.22,Ze.z+.16,Ze.z+.2,rn,{cast:!1}),n(v,Ze.x0,Ze.x1,h,h+1.9,l+.2,l+.55,or),[.8,1.35].forEach(L=>n(v,Ze.x0+.1,Ze.x1-.1,h+L,h+L+.05,l+.2,l+.7,Us,{cast:!1}));for(let L=Ze.x0+.5;L<Ze.x1-.2;L+=.6)[.85,1.4].forEach((O,ne)=>t(v,L+ne*.15,h+O+.05,l+.48,.14,.24,.14,["#527e60","#b28b64","#75999a","#d5bd8c"][Math.round(L*3+ne)&3]));[Ze.x0+.6,(Ze.x0+Ze.x1)/2,Ze.x1-.6].forEach(L=>{t(v,L,h,Ze.z+.55,.06,.72,.06,rn);const O=new Je(new un(.2,.2,.08,16).translate(0,.04,0),i(Ni));O.position.set(L,h+.72,Ze.z+.55),O.castShadow=!0,v.add(O)});const Gt=[Ze.x0+.7,(Ze.x0+Ze.x1)/2,Ze.x1-.7].map(L=>{t(v,L,h+1.95,Ze.z-.25,.02,.6,.02,"#343f33",{cast:!1});const O=new Je(new bi(.13,12,8),ce("#f3d9a6","#ffb36a"));return O.position.set(L,h+1.9,Ze.z-.25),v.add(O),Y.push([O.material,.3,1.4]),O});t(v,(Ze.x0+Ze.x1)/2,h+1.9,l+.2,.02,.7,Ze.z-l,"#343f33",{cast:!1}),n(v,Ze.x0-.1,Ze.x1+.1,h+2.55,h+2.6,l+.2,Ze.z-.2,Xn,{cast:!1});const Ie={x:c-.9,z:u-2.2};n(M,Ie.x-.35,Ie.x+.35,h,h+1,Ie.z-.8,Ie.z+.8,"#1d2422"),n(M,Ie.x-.4,Ie.x+.4,h+1,h+1.06,Ie.z-.85,Ie.z+.85,rn,{cast:!1}),[-.4,.4].forEach(L=>{const O=new Je(new un(.22,.22,.03,20),i("#2e3330"));O.position.set(Ie.x,h+1.08,Ie.z+L),M.add(O)}),[Ie.z-1.05,Ie.z+1.05].forEach(L=>{t(M,Ie.x+.1,h,L,.45,1.35,.45,"#262b29");const O=new Je(new ya(.15,16).rotateY(-Math.PI/2),i("#4a514d"));O.position.set(Ie.x-.13,h+.9,L),M.add(O)});const bt=new Je(new qn(2.6,2.2).rotateX(-Math.PI/2),ce("#4a3a33","#d06aa0"));bt.position.set(Ie.x-2.4,h+.012,Ie.z),bt.receiveShadow=!0,M.add(bt),Y.push([bt.material,.05,.45]),Pt(p,c-.3,u-.2,h+ye+.9,c-.3,l+1,h+ye+1.6,10),t(p,c-.3,h,l+1,.06,ye+1.65,.06,Xn),[[o+2.8,u-1.05],[o+5.6,u-1.05]].forEach(([L,O])=>{const ne=new Je(new un(.42,.42,.05,20).translate(0,.025,0),i("#ece4d2"));ne.position.set(L,h+.74,O),ne.castShadow=!0,R.add(ne),t(R,L,h,O,.07,.74,.07,"#2b302d"),[[-.62,0],[.62,0]].forEach(([Ee,Qe])=>{t(R,L+Ee,h,O+Qe,.38,.45,.38,Us),t(R,L+Ee,h+.45,O+Qe,.4,.05,.4,Ki)}),t(R,L,h+.79,O,.05,1.8,.05,"#e1dbc0");const oe=new Je(new fa(1.25,.45,8,1,!0).translate(0,-.22,0),new An({color:"#f1e7cc",side:2}));oe.position.set(L,h+2.85,O),oe.castShadow=!0,R.add(oe);const Ce=new Je(new fa(1.27,.1,8,1,!0).translate(0,-.42,0),i("#1f6b47"));Ce.position.copy(oe.position),R.add(Ce)});const Et=(L,O,ne,oe)=>{const Ee=ge.h-.12,Qe=.1*oe,ve=(ue,Ge,ft,it)=>ne?n(z,L+Qe+ue*oe,L+Qe+Ge*oe,h+ft,h+it,O-.06,O+.06,Ni):n(z,L-.06,L+.06,h+ft,h+it,O+Qe+ue*oe,O+Qe+Ge*oe,Ni);ve(0,.42,Ee-1.1,Ee),ve(0,.42*.45,.95,Ee-1.1),ve(0,.42*.8,0,.95),ne?n(z,L+Qe,L+Qe+.2*oe,h+1.05,h+1.12,O-.08,O+.08,rn,{cast:!1}):n(z,L-.08,L+.08,h+1.05,h+1.12,O+Qe,O+Qe+.2*oe,rn,{cast:!1})};Et(ge.x0,ge.z1,!0,1),Et(ge.x1,ge.z1,!0,-1),Et(ge.x1,ge.z1,!1,-1),Et(ge.x1,ge.z0,!1,1),n(y,ge.x0,ge.x1,h+ge.h-.1,h+ge.h-.05,ge.z1+.06,ge.z1+.1,rn,{cast:!1}),n(y,ge.x1+.06,ge.x1+.1,h+ge.h-.1,h+ge.h-.05,ge.z0,ge.z1,rn,{cast:!1});for(let L=0;L<4;L++){const O=Ze.x0+.5+L*(Ze.x1-Ze.x0-1)/3,ne=Ze.z-.22;n(k,O-.26,O+.26,h+1.12,h+1.15,ne-.13,ne+.13,Us),[-.13,.13].forEach((oe,Ce)=>{const Ee=new Je(new un(.075,.075,.2,10).translate(0,.1,0),new An({color:"#d7ece4",transparent:!0,opacity:.5}));Ee.position.set(O+oe,h+1.15,ne),k.add(Ee),t(k,O+oe,h+1.16,ne,.09,.1,.09,["#5f8a3c","#7a9a42","#4f7a3a","#8c9a4a"][L+Ce&3]),t(k,O+oe,h+1.35,ne,.16,.03,.16,rn,{cast:!1})})}const Vt=(Ze.x0+Ze.x1)/2;n(k,Vt-.75,Vt+.75,h+1.97,h+2.47,l+.3,l+.36,"#22302a"),n(k,Vt-.8,Vt+.8,h+1.94,h+2.5,l+.26,l+.3,or);for(let L=0;L<4;L++)n(k,Vt-.6,Vt+(L&1?.25:.5),h+2.36-L*.1,h+2.38-L*.1,l+.36,l+.37,Ki,{cast:!1});const Ot={x0:o+6.9,x1:o+9.1,z:u-.85};n(X,Ot.x0,Ot.x1,h+.72,h+.78,Ot.z-.3,Ot.z+.3,Us),[[Ot.x0+.1,-.22],[Ot.x0+.1,.22],[Ot.x1-.1,-.22],[Ot.x1-.1,.22]].forEach(([L,O])=>t(X,L,h,Ot.z+O,.07,.72,.07,or)),n(X,Ot.x0+.1,Ot.x1-.1,h+.78,h+.79,Ot.z-.1,Ot.z+.1,Ki,{cast:!1});for(let L=0;L<4;L++){const O=Ot.x0+.3+L*(Ot.x1-Ot.x0-.6)/3,ne=new Je(new un(.12,.1,.02,14).translate(0,.01,0),i("#fbf8ee"));ne.position.set(O,h+.79,Ot.z-.17+(L&1)*.34),X.add(ne),t(X,O,h+.8,Ot.z-.17+(L&1)*.34,.08,.04,.08,"#6f9a45"),t(X,O,h,Ot.z+.46,.07,.5,.07,rn),t(X,O,h+.5,Ot.z+.46,.28,.06,.28,Ni)}[Ot.x0+.55,Ot.x1-.55].forEach(L=>{t(X,L,h+.79,Ot.z,.05,.22,.05,rn,{cast:!1});const O=new Je(new bi(.07,10,6),ce("#fff0c8","#ffc56a"));O.position.set(L,h+1.05,Ot.z),X.add(O),Y.push([O.material,.3,1.6])}),[d.z-.55,d.z+.55].forEach(L=>{[o+.45,o+1.35].forEach(O=>{t(w,O,h,L,.07,.82,.07,rn),t(w,O,h+.82,L,.13,.08,.13,rn)}),n(w,o+.45,o+1.35,h+.66,h+.71,L-.025,L+.025,Ni,{cast:!1})}),n(w,o+1.6,o+6.4,h+.006,h+.014,u-1.95,u-.25,rn,{cast:!1}),n(w,o+1.7,o+6.3,h+.008,h+.018,u-1.85,u-.35,Ni,{cast:!1}),[[c-.35,u-1.1],[o+6.6,l+.35]].forEach(([L,O])=>{t(ae,L,h,O,.26,.1,.26,rn),t(ae,L,h+.1,O,.06,1.25,.06,rn);const ne=new Je(new cn(.24,.34,.24).translate(0,.17,0),ce("#fff1cf","#ffcf7a"));ne.position.set(L,h+1.35,O),ne.castShadow=!1,ae.add(ne),Y.push([ne.material,.35,1.5]),t(ae,L,h+1.69,O,.3,.05,.3,rn,{cast:!1})});const bn=new bi(.06,8,6),ai=ce("#fff1cf","#ffcf7a");Y.push([ai,.2,1.6]);const Wt=new Map;Kt.forEach(([L,...O])=>{Wt.has(L)||Wt.set(L,[]),Wt.get(L).push(O)});const Jt=new lt,Ln=[];Wt.forEach((L,O)=>{const ne=new Kn(bn,ai,L.length);L.forEach(([oe,Ce,Ee],Qe)=>ne.setMatrixAt(Qe,Jt.makeTranslation(oe,Ce,Ee))),O.add(ne),Ln.push(ne)});const gn=new Ea("#ffc98a",0,14,1.2);gn.position.set((o+c)/2,h+2.6,(l+u)/2),s.add(gn);const Fn=e.shell,nn=Fn.loungeFront,sn=Fn.loungeDoor.x,In=Fn.loungeHeader,fn=.7,_s=.81,Mi=new gt;a.add(Mi);const Nn=new gt;Mi.add(Nn),n(Nn,sn-fn-.12,sn-fn,0,In+.12,nn-.02,nn+.1,"#1f4a35"),n(Nn,sn+fn,sn+fn+.12,0,In+.12,nn-.02,nn+.1,"#1f4a35"),n(Nn,sn-fn-.12,sn+fn+.12,In,In+.14,nn-.02,nn+.1,"#1f4a35");const oi=nn-_s-1.5;n(Nn,sn-fn-.1,sn-fn,0,In,oi,nn-.02,"#26302a",{cast:!1}),n(Nn,sn+fn,sn+fn+.1,0,In,oi,nn-.02,"#26302a",{cast:!1}),n(Nn,sn-fn,sn+fn,0,In,oi-.1,oi,"#2f3a32",{cast:!1}),n(Nn,sn-fn,sn+fn,In,In+.05,oi,nn-.02,"#1d241f",{cast:!1}),n(Nn,sn-.38,sn+.38,.004,.014,oi,nn-.02,Ni,{cast:!1});const ee=new Je(new bi(.1,12,8),ce("#fff2c8","#ffd58a"));ee.position.set(sn,In-.45,oi+.06),Nn.add(ee),Y.push([ee.material,.6,1.2]);const Z=new gt;Z.position.set(sn-fn+.02,0,nn+.02),Nn.add(Z);const Ae=fn*2-.04,Me=In-.03;n(Z,0,Ae,.01,Me,-.03,.03,"#2d6146"),[[.32,.95],[1.15,1.85]].forEach(([L,O])=>n(Z,.14,Ae-.14,L,O,.03,.05,"#357052",{cast:!1})),n(Z,.08,Ae-.08,.02,.2,.03,.045,rn,{cast:!1}),n(Z,Ae-.2,Ae-.12,.95,1.1,.03,.1,rn,{cast:!1});const Re=document.createElement("canvas");Re.width=256,Re.height=96;const ke=new ui(Re);ke.colorSpace=qt;const at=new Je(new qn(.66,.25),new Mn({map:ke}));at.position.set(Ae*.62,1.5,.056),Z.add(at);const tt=document.createElement("canvas");tt.width=512,tt.height=64;const mt=new ui(tt);mt.colorSpace=qt,mt.anisotropy=4;const Nt=new Mn({map:mt,transparent:!0}),E=new gt;E.position.set(sn+2.1,2.02,nn+.05),Mi.add(E),[.12,-.1].forEach((L,O)=>{const ne=new Je(new qn(2.3,.26),Nt);ne.rotation.z=L,ne.position.z=O*.006,E.add(ne)});function N(){const L='"Fredoka", "Bricolage Grotesque", sans-serif';let O=Re.getContext("2d");O.fillStyle="#ece4d2",O.fillRect(0,0,256,96),O.strokeStyle=rn,O.lineWidth=6,O.strokeRect(3,3,250,90),O.fillStyle="#1f3a2c",O.font=`600 40px ${L}`,O.textAlign="center",O.textBaseline="middle",O.fillText("STAFF ONLY",128,51),ke.needsUpdate=!0,O=tt.getContext("2d"),O.clearRect(0,0,512,64),O.fillStyle="#e8b13a",O.fillRect(0,6,512,52),O.fillStyle="#2b2414",O.font=`600 34px ${L}`,O.textAlign="center",O.textBaseline="middle",O.fillText("COMING SOON  ·  COMING SOON",256,33),mt.needsUpdate=!0}N(),document.fonts&&document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",N);let U=0,H=null,B=null;const te=[],de=[],_e=new Set,Le=new Set,Ke=ce("#fff0c8","#ffc56a");Y.push([Ke,.3,1.6]);function re(L,O){const ne=[{file:"rooftop_site.glb",parent:g,hide:q,at:[[0,0]]},{file:"rooftop_speakeasy.glb",parent:b,hide:S,at:[[o+3.8,l+1.825]]},{file:"rooftop_pergola_vines.glb",parent:b,hide:Yn,at:[[o+3.8,l+1.825]]},{file:"rooftop_bar.glb",parent:m,hide:v,at:[[(Ze.x0+Ze.x1)/2,Ze.z-.225]]},{file:"rooftop_dj_booth.glb",parent:p,hide:M,at:[[Ie.x,Ie.z]]},{file:"rooftop_parasol_table.glb",parent:x,hide:R,at:[[o+2.8,u-1.05],[o+5.6,u-1.05]]},{file:"rooftop_olive.glb",parent:I,hide:le,at:[[c-.5,u-.5],[c-.6,l+.6]]},{file:"rooftop_drapes.glb",parent:y,hide:z,at:[[ge.x0,ge.z1,0],[ge.x1,ge.z1,Math.PI],[ge.x1,ge.z1,Math.PI/2],[ge.x1,ge.z0,-Math.PI/2]]},{file:"rooftop_jar_flight.glb",parent:_,hide:k,at:[[(Ze.x0+Ze.x1)/2,Ze.z-.225]]},{file:"rooftop_chefs_table.glb",parent:P,hide:X,at:[[o+8,u-.85]]},{file:"rooftop_lantern.glb",parent:w,hide:ae,at:[[c-.35,u-1.1],[o+6.6,l+.35]]}];ne.forEach(ve=>Le.add(ve.parent)),ne.forEach(ve=>L.load(O+ve.file,ue=>{const Ge=ue.scene;Ge.traverse(ct=>{ct.isMesh&&(ct.castShadow=ct.receiveShadow=!0)});const ft=Ge.getObjectByName("Flame"),it=Ge.getObjectByName("DanceFloor");Ge.traverse(ct=>{/^Sign/.test(ct.name)&&(ct.visible=!1)}),ft&&ft.traverse(ct=>{ct.isMesh&&(ct.material=en.material,ct.castShadow=!1)}),it&&it.traverse(ct=>{ct.isMesh&&(ct.material=bt.material)}),Gt.forEach((ct,Rt)=>{const pn=Ge.getObjectByName("BarLamp"+Rt);pn&&pn.traverse(Wn=>{Wn.isMesh&&(Wn.material=ct.material,Wn.castShadow=!1)})}),Ge.traverse(ct=>{ct.isMesh&&/^(CandleGlow|LanternGlow)/.test(ct.name)&&(ct.material=Ke,ct.castShadow=!1)}),Ge.traverse(ct=>{const Rt=ct.isMesh&&ct.material;Rt&&/^Vine/.test(Rt.name)&&!de.some(pn=>pn[0]===Rt)&&de.push([Rt,Rt.color.clone()])}),ps(Ge),ve.at.forEach(([ct,Rt,pn],Wn)=>{const Zn=new gt;pn&&(Zn.rotation.y=pn),Zn.add(Wn?Ge.clone():Ge),Zn.scale.set(1.69,1.69/vn,1.69),Zn.position.set(ct,h,Rt),ve.parent.add(Zn)}),ft&&(en=ft),ve.hide.visible=!1,_e.add(ve.parent)},void 0,ue=>console.warn("3D map: could not load "+ve.file,ue))),L.load(O+"string_bulb.glb",ve=>{const ue=ve.scene;ue.updateMatrixWorld(!0);const Ge=Rt=>{const pn=ue.getObjectByName(Rt),Wn=[];return pn?(pn.traverse(Zn=>{if(Zn.isMesh){const on=Zn.geometry.clone().applyMatrix4(Zn.matrixWorld);Object.keys(on.attributes).forEach(Un=>{Un!=="position"&&Un!=="normal"&&on.deleteAttribute(Un)}),Wn.push(on.index?on.toNonIndexed():on)}}),es(Wn).scale(1.69,1.69/vn,1.69)):null},ft=Ge("Bulb"),it=Ge("Socket");if(!ft||!it)return;const ct=new An({color:"#22262a"});Ln.forEach(Rt=>{Rt.geometry=ft;const pn=new Kn(it,ct,Rt.count);pn.instanceMatrix.copy(Rt.instanceMatrix),Rt.parent.add(pn)})},void 0,ve=>console.warn("3D map: could not load string_bulb.glb",ve));const oe=(ve,ue,Ge,ft,it)=>{const ct=new gt;return ct.add(ue),ct.scale.set(1.69,1.69/vn,1.69),ct.position.set(Ge,ft,it),ve.add(ct),ue.traverse(Rt=>{Rt.isMesh&&(Rt.castShadow=Rt.receiveShadow=!0)}),ps(ue),ct},Ce=(ve,ue)=>L.load(O+ve,Ge=>ue(Ge.scene),void 0,Ge=>console.warn("3D map: could not load "+ve,Ge));Ce("lounge_elevator_shaft.glb",ve=>vt.forEach((ue,Ge)=>{const ft=Ge?ve.clone():ve;ft.traverse(it=>{it.isMesh&&it.material&&/Glass/.test(it.material.name)&&(it.material=j,it.castShadow=it.receiveShadow=!1,Ge||te.push(it))}),oe(ue.frame,ft,d.x,0,ue.lz),ue.kf.visible=ue.ki.visible=!1})),Ce("lounge_elevator_cab.glb",ve=>vt.forEach((ue,Ge)=>{const ft=Ge?ve.clone():ve;ft.traverse(it=>{/^Rail/.test(it.name)&&(it.visible=!1),it.name==="CabLamp"&&it.traverse(ct=>{ct.isMesh&&(ct.material=ue.cabLamp.material,ct.castShadow=!1)})}),oe(ue.cab,ft,0,0,0),ue.cabK.visible=!1})),Ce("lounge_bridge.glb",ve=>vt.forEach((ue,Ge)=>{const ft=Ge?ve.clone():ve;ft.traverse(it=>{it.isMesh&&it.material&&/Glass/.test(it.material.name)&&(it.material=j,it.castShadow=it.receiveShadow=!1)}),oe(ue.inside,ft,(d.x+d.w/2+o)/2,h,ue.lz),ue.kb.visible=!1})),Ce("lounge_door.glb",ve=>{const ue=ve.getObjectByName("DoorLeaf"),Ge=ve.getObjectByName("StaffPlaque"),ft=ve.getObjectByName("Sconce");ue&&(ft&&ft.traverse(it=>{it.isMesh&&(it.material=ee.material,it.castShadow=!1)}),oe(Mi,ve,sn,0,nn),H=ue,B=Ge,Nn.visible=!1)});const Ee=["deck_planter.glb","deck_planter_short.glb"];let Qe=0;Ee.forEach((ve,ue)=>Ce(ve,Ge=>{const[ft,it,ct,Rt]=nt[ue];oe(I,Ge,(ft+it)/2,h,(ct+Rt)/2),++Qe===Ee.length&&(Be.visible=!1)}))}function st(L,O){const ne=Math.min(C.length,Math.max(1,L)),oe=[...f,I,Bt,At,kt];if(!C.slice(0,ne).every(ue=>!Le.has(ue)||_e.has(ue))||!_e.has(I))return null;const Ce=oe.map(ue=>ue.visible);g.visible=!1,I.visible=!0,kt.visible=!1,C.forEach((ue,Ge)=>{ue.visible=Ge<ne}),Bt.visible=!!O,At.visible=!O;const Ee=a.clone();oe.forEach((ue,Ge)=>{ue.visible=Ce[Ge]}),Ee.updateMatrixWorld(!0);const Qe=[],ve=new On;return Ee.traverse(ue=>{if(ue!==Ee){if(!ue.visible||ue.isSprite){Qe.push(ue);return}!ue.isMesh||ue.isInstancedMesh||(ue.geometry.boundingBox||ue.geometry.computeBoundingBox(),ve.copy(ue.geometry.boundingBox).applyMatrix4(ue.matrixWorld),(ve.max.y<h-.05||ve.min.x<o-.2)&&Qe.push(ue))}}),Qe.forEach(ue=>ue.parent&&ue.parent.remove(ue)),Ee}return{loadModels:re,pictureCopy:st,update(L){const O=L.loungeOpen?Math.max(1,L.loungeTier||1):0,ne=L.night||0;g.visible=!O,I.visible=!!O;const oe=!O&&L.loungeBuild!=null;$t.visible=oe,we.visible=!O,oe&&($e.forEach((ve,ue)=>{ve.visible=ue<Math.floor(L.loungeBuild*$e.length)}),Ye.rotation.y=Math.sin((L.time||0)/5e3)*.7,fe.visible=Math.floor((L.time||0)/500)%2===0),C.forEach((ve,ue)=>{ve.visible=O>ue}),V.position.y=L.liftY||0,Ue&&(Ue.position.y=L.liftY2||0,Bt.visible=!!L.loungeLift,At.visible=!L.loungeLift),U+=((O?1.75:0)-U)*.15,Z.rotation.y=U,at.visible=!O,E.visible=!O,H&&(H.rotation.y=U,B&&(B.visible=!O)),te.forEach(ve=>{ve.visible=!!O}),Y.forEach(([ve,ue,Ge])=>{ve.emissiveIntensity=ue+ne*Ge}),en.scale.y=.8+Math.sin((L.time||0)/130)*.2+Math.sin((L.time||0)/53)*.1,en.visible=O>=1,fi.color.setScalar(1-ne*.45),de.forEach(([ve,ue])=>ve.color.copy(ue).multiplyScalar(1-ne*.45));const Ce=O?L.loungeSmokers||[]:[],Ee=L.time||0;let Qe=0;Ce.forEach(ve=>{for(let ue=0;ue<_t;ue++){const Ge=(Ee+ve.id*1777%xt+ue*xt/_t)%xt/We;if(Ge>=1)continue;const ft=Lt(Qe++),it=.75+Ge*2.3,ct=Math.sin(Ge*3+ve.id+ue)*.2;ft.visible=!0,ft.position.set(ve.x+(ve.facing||0)*.4+ct+Ge*.25,h+1.65+Ge*2,ve.z+.1-Ge*.15),ft.scale.set(it,it/vn,1),ft.material.opacity=Math.min(1,Ge*6)*Math.pow(1-Ge,.8)*.95,ft.material.color.setScalar(.72-ne*.25)}});for(let ve=Qe;ve<It.length;ve++)It[ve].visible=!1;gn.intensity=O?ne*6:0}}}const t0="#1f6b47",n0="#d0a54e";function i0(s,e,{span:t,model:n}){const i=e.entrance;if(!i)return null;const r=new gt;s.add(r);const a=i.x;function o(y,_,P){const w=new ln;w.setAttribute("position",new zt(y.flat(),3)),w.setAttribute("uv",new zt(_.flat(),2)),w.setIndex(y.length===4?[0,1,2,0,2,3]:[0,1,2]),w.computeVertexNormals();const C=new Je(w,P);return C.castShadow=C.receiveShadow=!0,r.add(C),C}const c=i.sign,l=new gt;r.add(l),t(l,c.x0,a,c.y1+.08,c.y1+.16,c.z-.05,c.z+.05,t0),[c.x0+.12,c.x1-.12].forEach(y=>t(l,y-.015,y+.015,c.y1,c.y1+.08,c.z-.015,c.z+.015,n0,{cast:!1})),t(l,c.x0-.04,c.x1+.04,c.y0-.04,c.y1+.04,c.z-.05,c.z+.05,"#1d211f");const u=document.createElement("canvas");u.width=256,u.height=284;const h=u.getContext("2d");h.fillStyle="#0d120f",h.fillRect(0,0,256,284);const d=128,f=150,g=(y,_)=>{const P=118*_,w=17*_,C=y-Math.PI/2,S=Math.cos(C),v=Math.sin(C),M=16,R=X=>Array.from({length:M+1},(ae,I)=>{const j=I/M,G=w*Math.pow(Math.sin(Math.PI*Math.min(1,j*1.08)),.9)*(I%2?1:.72);return[d+S*P*j-v*G*X,f+v*P*j+S*G*X]}),z=R(1),k=R(-1).reverse();h.moveTo(d,f),z.forEach(X=>h.lineTo(X[0],X[1])),k.forEach(X=>h.lineTo(X[0],X[1])),h.closePath()},b=()=>{h.beginPath(),[[0,1],[-.5,.84],[.5,.84],[-1.05,.7],[1.05,.7],[-1.6,.38],[1.6,.38]].forEach(([y,_])=>g(y,_))};h.lineJoin=h.lineCap="round",b(),h.shadowColor="#29ff6a",h.shadowBlur=18,h.strokeStyle="#3df27a",h.lineWidth=12,h.stroke(),b(),h.shadowBlur=0,h.strokeStyle="#e4ffe9",h.lineWidth=6,h.stroke(),b(),h.fillStyle="#0f1812",h.fill();const m=()=>{h.beginPath(),h.moveTo(d,f-6),h.lineTo(d,f+34)};m(),h.shadowBlur=14,h.strokeStyle="#3df27a",h.lineWidth=7,h.stroke(),m(),h.shadowBlur=0,h.strokeStyle="#e4ffe9",h.lineWidth=3,h.stroke(),h.font='300 54px "Fredoka", sans-serif',h.textAlign="center",h.textBaseline="alphabetic",h.lineWidth=2.5,h.shadowColor="#29ff6a",h.shadowBlur=16,h.strokeStyle="#7dff9f",h.strokeText("OPEN",d,262,210),h.shadowBlur=0,h.strokeStyle="#ecfff0",h.lineWidth=1.5,h.strokeText("OPEN",d,262,210);const p=new ui(u);p.colorSpace=qt;const x=new Mn({map:p,toneMapped:!1,side:2});return[c.z-.052,c.z+.052].forEach(y=>{const _=o([[c.x0,c.y1,y],[c.x1,c.y1,y],[c.x1,c.y0,y],[c.x0,c.y0,y]],[[0,1],[1,1],[1,0],[0,0]],x);_.castShadow=!1,l.attach(_)}),n&&n("blade_sign.glb",a,0,c.z,y=>{let _=0;const P=p.clone();P.flipY=!1,P.needsUpdate=!0;const w=x.clone();w.map=P,y.traverse(C=>{C.isMesh&&/^SignFace/.test(C.name)&&(C.material=w,C.castShadow=!1,_++)}),_?l.visible=!1:y.parent.visible=!1},r),r}const s0=5e3,r0=8e3,bl=4e3,aa=9e4,a0=8,lo=256,ho=64,oa=2,vl=new Map;function ca(s){if(typeof s!="string")return null;let e=vl.get(s);if(e!==void 0)return e;if(e=null,s[0]==="#"){let t=s.slice(1);(t.length===3||t.length===4)&&(t=t.split("").map(n=>n+n).join("")),(t.length===6||t.length===8)&&(e=[new ot("#"+t.slice(0,6)),t.length===8?parseInt(t.slice(6),16)/255:1])}else if(/^rgba?\(/.test(s)){const t=s.match(/[\d.]+/g).map(Number);e=[new ot(`rgb(${t[0]},${t[1]},${t[2]})`),t.length>3?t[3]:1]}return vl.set(s,e),e}function o0(s){const e=new gt;e.visible=!1,s.add(e);const t=new lt,n=new F,i=new F,r=new Tn,a=new F(0,1,0),o=new F,c=new ot("#ffffff");function l(I,j,G,ce=!0){const Y=new Kn(I,G,j);return Y.instanceMatrix.setUsage(35048),Y.setColorAt(0,c),Y.count=0,Y.castShadow=ce,Y.receiveShadow=!0,Y.frustumCulled=!1,e.add(Y),Y}const u=I=>new An({color:"#ffffff",...I}),h=I=>new Mn({color:"#ffffff",...I}),d={transparent:!0,opacity:.32,depthWrite:!1},f=new cn(1,1,1).translate(0,.5,0),g=new un(.5,.5,1,8,1).translate(0,.5,0),b=new ti(1,2),m=new un(1,1,.02,20),p=new ya(1,24).rotateY(Math.PI/4),x={box:[l(f,s0,u()),l(f,800,h()),l(f,800,u(d),!1)],cord:[l(g,r0,u()),l(g,1500,h())],blob:[l(b,bl,u()),l(b,600,h())],disc:[l(m,bl,u(),!1),l(m,600,h(),!1)],facing:[l(p,600,u({side:2}),!1),l(p,300,h({side:2}),!1)]};function y(I,j){const G=new ln;G.setAttribute("position",new Zt(new Float32Array(aa*3),3).setUsage(35048)),G.setAttribute("normal",new Zt(new Float32Array(aa*3),3).setUsage(35048)),G.setAttribute("color",new Zt(new Float32Array(aa*(j?4:3)),j?4:3).setUsage(35048)),G.setDrawRange(0,0),Object.assign(I,{vertexColors:!0,side:2,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});const ce=new Je(G,I);return ce.frustumCulled=!1,ce.receiveShadow=!0,e.add(ce),{mesh:ce,g:G,alpha:j,n:0}}const _=[y(u(),!1),y(h(),!1),y(u({transparent:!0,depthWrite:!1}),!0)],P=new Map;function w(I,j){const G=I.x.toFixed(2)+","+I.y.toFixed(2)+","+I.z.toFixed(2)+","+I.alongZ;let ce=P.get(G);if(!ce){const Y=document.createElement("canvas");Y.width=lo*oa,Y.height=ho*oa;const Q=Y.getContext("2d");Q.scale(oa,oa),Q.translate(lo/2,ho/2);const Se=j*Math.SQRT1_2;try{I.draw(Q,Se)}catch{}const De=new ui(Y);De.colorSpace=qt,De.anisotropy=4,ce=new Je(new qn(lo/Se,ho/j),h({map:De,transparent:!0,alphaTest:.05,side:2,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4})),ce.position.set(I.x,I.y,I.z),I.alongZ&&(ce.rotation.y=Math.PI/2),e.add(ce),P.set(G,ce)}return ce}const C=[];for(let I=0;I<a0;I++){const j=new Ea("#ffd9a0",0,9,1.4);e.add(j),C.push(j)}function S(I,j,G,ce){const Y=G?I[2]:I[j?1:0];return!Y||Y.count>=Y.instanceMatrix.count?null:(ce(t),Y.setMatrixAt(Y.count,t),[Y,Y.count++])}function v(I,j){I&&I[0].setColorAt(I[1],j[0])}function M(I,j){I.clearUpdateRanges(),j>0&&I.addUpdateRange(0,j*I.itemSize),I.needsUpdate=!0}function R(I,j){let G=2166136261^I.length;const ce=Q=>{G=Math.imul(G^Q,16777619)},Y=Q=>{if(typeof Q=="number")ce(Math.round(Q*4096));else if(typeof Q=="string")for(let Se=0;Se<Q.length;Se++)ce(Q.charCodeAt(Se));else Array.isArray(Q)?(ce(Q.length),Q.forEach(Y)):ce(Q?1:0)};return I.forEach(Q=>j.forEach(Se=>Y(Q[Se]))),G}const z={};function k(I,j,G){const ce=R(j,G);return z[I]===ce?!1:(z[I]=ce,!0)}function X(I){I.forEach(j=>{j.count=0})}function ae(I){I.forEach(j=>{M(j.instanceMatrix,j.count),j.instanceColor&&M(j.instanceColor,j.count)})}return{group:e,update(I,j){if(k("boxes",I.boxes,["x","y","z","w","d","h","c","lit"])&&(X(x.box),I.boxes.forEach(Y=>{const Q=ca(Y.c);!Q||Q[1]<.05||v(S(x.box,Y.lit,Q[1]<.9,Se=>Se.compose(n.set(Y.x,Y.y,Y.z),r.identity(),i.set(Math.max(.01,Y.w),Math.max(.01,Y.h),Math.max(.01,Y.d)))),Q)}),ae(x.box)),k("lines",I.lines,["pts","c","w","lit"])&&(X(x.cord),I.lines.forEach(Y=>{const Q=ca(Y.c);if(!Q||Q[1]<.5)return;const Se=Math.max(.02,Y.w);for(let De=1;De<Y.pts.length;De++){const ie=Y.pts[De-1],pe=Y.pts[De];o.set(pe[0]-ie[0],pe[1]-ie[1],pe[2]-ie[2]);const Fe=o.length();Fe<1e-4||(o.divideScalar(Fe),v(S(x.cord,Y.lit,!1,ye=>ye.compose(n.set(ie[0],ie[1],ie[2]),r.setFromUnitVectors(a,o),i.set(Se,Fe,Se))),Q))}}),ae(x.cord)),k("ellipses",I.ellipses,["at","rx","ry","c","lit"])){const Y=x.blob.concat(x.disc,x.facing);X(Y),I.ellipses.forEach((Q,Se)=>{const De=ca(Q.c);if(!De||De[1]<.5)return;const ie=Q.ry/Q.rx<.66,pe=Q.rx,Fe=.08+Se*.0015;Q.ry>Q.rx*1.05?v(S(x.facing,Q.lit,!1,ye=>ye.compose(n.set(Q.at[0]+Fe,Q.at[1],Q.at[2]+Fe),r.identity(),i.set(Q.rx,Q.ry,Q.rx))),De):v(ie?S(x.disc,Q.lit,!1,ye=>ye.compose(n.set(Q.at[0],Q.at[1],Q.at[2]),r.identity(),i.set(pe,1,pe))):S(x.blob,Q.lit,!1,ye=>ye.compose(n.set(Q.at[0],Q.at[1],Q.at[2]),r.identity(),i.set(pe,Math.max(.4,Q.ry/Q.rx)*pe,pe))),De)}),ae(Y)}if(k("polys",I.polys,["pts","c","lit"])){_.forEach(Q=>{Q.n=0});const Y=new F;I.polys.forEach(Q=>{const Se=ca(Q.c);if(!Se||Se[1]<.08||Q.pts.length<3)return;const De=_[Se[1]<.9?2:Q.lit?1:0],ie=Q.pts.length-2;if(De.n+ie*3>aa)return;const pe=De.g.attributes.position.array,Fe=De.g.attributes.normal.array,ye=De.g.attributes.color.array,ht=De.alpha?4:3,ut=Q.pts[0];Y.set(0,0,0);for(let At=0;At<Q.pts.length;At++){const yt=Q.pts[At],St=Q.pts[(At+1)%Q.pts.length];Y.x+=(yt[1]-St[1])*(yt[2]+St[2]),Y.y+=(yt[2]-St[2])*(yt[0]+St[0]),Y.z+=(yt[0]-St[0])*(yt[1]+St[1])}if(Y.lengthSq()<1e-12)return;const pt=Y.y<-1e-6||Math.abs(Y.y)<1e-6&&Y.x+Y.z<0;pt&&Y.negate(),Y.normalize();for(let At=1;At<=ie;At++)(pt?[ut,Q.pts[At+1],Q.pts[At]]:[ut,Q.pts[At],Q.pts[At+1]]).forEach(yt=>{const St=De.n++;pe[St*3]=yt[0],pe[St*3+1]=yt[1],pe[St*3+2]=yt[2],Fe[St*3]=Y.x,Fe[St*3+1]=Y.y,Fe[St*3+2]=Y.z,ye[St*ht]=Se[0].r,ye[St*ht+1]=Se[0].g,ye[St*ht+2]=Se[0].b,De.alpha&&(ye[St*ht+3]=Se[1])})}),_.forEach(Q=>{Q.g.setDrawRange(0,Q.n),["position","normal","color"].forEach(Se=>M(Q.g.attributes[Se],Q.n))})}const G=new Set;I.faces.forEach(Y=>G.add(w(Y,I.unit))),P.forEach(Y=>{Y.visible=G.has(Y)});const ce=(I.fixtures||[]).slice().sort((Y,Q)=>Q.size-Y.size);C.forEach((Y,Q)=>{const Se=ce[Q];Y.intensity=Se?j*6*Math.min(1.5,Se.size):0,Se&&Y.position.set(Se.x,Se.y,Se.z)})}}}const c0=[7,9,8,6,3,4],l0=/^(ReaderScreen|MonitorGlass|ScaleScreen|TillGlass)$/,Yi=new On,h0=new On,u0=new F;function d0(s){return Yi.makeEmpty(),s.forEach(e=>{e.updateMatrix(),e.geometry?(e.geometry.boundingBox||e.geometry.computeBoundingBox(),Yi.union(h0.copy(e.geometry.boundingBox).applyMatrix4(e.matrix))):Yi.expandByPoint(e.position)}),u0.set((Yi.min.x+Yi.max.x)/2,Yi.min.y,(Yi.min.z+Yi.max.z)/2)}function uo(s,e){const t=new Map;return s.forEach(n=>{const i=e.exec(n.name);i&&(t.has(i[1])||t.set(i[1],[]),t.get(i[1]).push(n))}),[...t.keys()].sort().map(n=>t.get(n))}function fo(s,e){const t=s[0].parent,n=new gt,i=d0(s);return n.position.copy(i),n.userData.motion=Object.assign({rest:i.toArray()},e),t.add(n),s.forEach(r=>{r.position.sub(i),n.add(r)}),n}const Ji=(s,e)=>{s.userData.motion=Object.assign({rest:s.position.toArray(),size:s.scale.toArray()},e)},la=(s,e)=>s.forEach((t,n)=>e(t,n,s.length));function f0(s,e){const t=[];s.traverse(i=>{i!==s&&i.name&&t.push(i)});const n=i=>t.filter(r=>i.test(r.name));return e===0&&uo(t,/^S(\d+)(?:Leaf|Stem|Top)/).forEach((i,r,a)=>fo(i,{m:"sprout",k:r,n:a.length})),e===1&&uo(t,/^P(\d+)(?:Stem|Leaf|Pet|Branch|Cola|SideCola|Sugar|TopSugar|Crown)/).forEach((i,r)=>{fo(i,{m:"plant",k:r}),i.forEach(a=>{/(Cola|Sugar)\d*$/.test(a.name)&&Ji(a,{m:"bud"})})}),e===2&&(la(n(/^(?:T\dP\d|Plant|Corner)(?:Leaf|Pet|BranchLeaf)/),(i,r,a)=>Ji(i,{m:"trim",k:r*7%a,n:a})),la(n(/^(?:Tray\d?Nug|BoardNug)\d+$/),(i,r,a)=>Ji(i,{m:"fill",k:r,n:a,from:.1,span:.75}))),e===3&&(n(/^Press(?:Ram|Head|Plate)$/).forEach(i=>Ji(i,{m:"press",amp:.03})),n(/^ScalePan$/).forEach(i=>Ji(i,{m:"press",amp:.008})),la(n(/^(?:TopCratePouch|Box)\d+$/),(i,r,a)=>Ji(i,{m:"fill",k:r,n:a,from:.35,span:.5})),la(n(/^TrayNug\d+$/),(i,r,a)=>Ji(i,{m:"drain",k:r,n:a}))),e===4&&n(/^Key\d+$/).forEach((i,r)=>Ji(i,{m:"key",k:r})),e===5&&uo(t,/^(?:Bag|FlatBag)(\d+)/).forEach((i,r,a)=>fo(i,{m:"handoff",k:r,n:a.length})),e!==6&&t.forEach(i=>{l0.test(i.name)&&i.isMesh&&(i.userData.motion={m:"screen"})}),s}function p0(s,e){const t=[];return s.traverse(n=>{const i=n.userData.motion;i&&(i.m==="screen"&&(n.material=n.material.clone(),n.material.emissive&&n.material.emissive.copy(n.material.color).lerp(new ot("#bff5dc"),.5)),t.push(n))}),t.length?{index:e,parts:t,act:0,grow:[]}:null}const To=s=>s<0?0:s>1?1:s,ls=s=>(s=To(s),s*s*(3-2*s));function m0(s){return s<.72?s/.72:s>.86?(1-s)/.14:1}function g0(s,e,t){const n=e.clock||0,i=c0[s.index]||6,r=n/i%1,a=1-Math.exp(-t*4);s.act+=((e.act||0)-s.act)*a;const o=s.parts;for(let c=0;c<o.length;c++){const l=o[c],u=l.userData.motion;switch(u.m){case"plant":{const h=m0((n/i+u.k*.23)%1),d=s.grow[u.k]=s.grow[u.k]===void 0?h:s.grow[u.k]+(h-s.grow[u.k])*a;l.scale.setScalar(.2+.8*ls(d)),l.userData.g=d,l.rotation.z=Math.sin(n*1.1+u.k*1.7)*.025;break}case"bud":{const h=ls((l.parent.userData.g-.55)/.35);l.scale.set(u.size[0]*h,u.size[1]*h,u.size[2]*h);break}case"sprout":{const h=(n/i+u.k*.17)%1,d=h>.9?1-(h-.9)/.1:ls(h/.8);l.scale.setScalar(.06+.94*d);break}case"trim":{const h=.1+.7*u.k/u.n,d=r>.92?(r-.92)/.08:1-To((r-h)/.06);l.scale.set(u.size[0]*d,u.size[1]*d,u.size[2]*d);break}case"fill":case"drain":{const h=(u.m==="fill"?u.from:.35)+(u.m==="fill"?u.span:.5)*u.k/u.n,d=r>.93?1-(r-.93)/.07:ls((r-h)/.05),f=u.m==="fill"?d:1-d;l.scale.set(u.size[0]*f,u.size[1]*f,u.size[2]*f);break}case"press":l.position.y=u.rest[1]-u.amp*Math.sin(Math.PI*To((r-.1)/.25));break;case"key":l.position.y=u.rest[1]-(Math.floor(n*6)%9===u.k*4%9?.006*s.act:0);break;case"handoff":{const h=Math.floor(n/i)%u.n===u.k,d=h?ls((r-.4)/.3):0,f=h?r<.85?ls((r-.6)/.2):1-ls((r-.85)/.15):0;l.position.y=u.rest[1]+(r<.85?.1*d:0),l.scale.setScalar(1-f);break}case"screen":l.material.emissiveIntensity=s.act*(.35+.08*Math.sin(n*23)+(Math.sin(n*3.1)>.96?.15:0));break}}}const ms=96,vr=160,pa=2,ki="#144d29",uh="#5c9e4d",xr="#ffe6a8",dh="#f6dca2",Xo="#e3c27f",xi="#d9a441",fh="#f0c766",ma="#fffaf0",ph=["bud","roll","gummy","vape","bud","gummy","roll","bud","vape","gummy"],$i=[{tile:2,at:.14},{tile:4,at:.3},{tile:7,at:.46}],po=.08,xl=.62,mo=.76,Ro=.9,_0=1.6,ei={x:[6,50],w:40,h:34,top:26,gap:6},b0=s=>s<0?0:s>1?1:s,gr=s=>(s=b0(s),s*s*(3-2*s));function v0(s,e,t=null){if(t!=null||s>=Ro){const o=Math.min(1,(t||0)/1.2);return{mode:"paid",q:o,key:"paid"+Math.round(o*12)}}if(s>=xl){const o=s>=mo?gr((s-mo)/.06):0,c=s>=mo+.06?Math.floor(e*6)%3:-1,l=gr((s-xl)/.06);return{mode:"pay",slide:l,press:o,wait:c,key:"pay"+Math.round(l*6)+Math.round(o*4)+c}}const n=$i.filter(o=>s>=o.at+po).length,i=$i.find(o=>s>=o.at&&s<o.at+po),r=i?(s-i.at)/po:-1,a=Math.round(gr(s/.55)*60);return{mode:"browse",scroll:a,picked:n,tapping:i?i.tile:-1,ripple:r,key:"browse"+a+n+(i?i.tile+":"+Math.round(r*5):"")}}function zi(s,e,t,n,i,r){s.beginPath(),s.moveTo(e+r,t),s.arcTo(e+n,t,e+n,t+i,r),s.arcTo(e+n,t+i,e,t+i,r),s.arcTo(e,t+i,e,t,r),s.arcTo(e,t,e+n,t,r),s.closePath()}function mh(s,e,t,n,i){e==="bud"?(s.fillStyle=uh,[[-4,2],[4,2],[0,-3],[0,4]].forEach(([r,a])=>{s.beginPath(),s.arc(t+r*i,n+a*i,5*i,0,7),s.fill()}),s.fillStyle="#8cc46f",s.beginPath(),s.arc(t-1*i,n-2*i,2.5*i,0,7),s.fill()):e==="roll"?(s.save(),s.translate(t,n),s.rotate(-.6),s.fillStyle=ma,s.fillRect(-10*i,-2.5*i,16*i,5*i),s.fillStyle=xi,s.fillRect(6*i,-2.5*i,5*i,5*i),s.restore()):e==="gummy"?(s.fillStyle="#e07a5f",zi(s,t-9*i,n-4*i,8*i,8*i,2.5*i),s.fill(),s.fillStyle="#f2b134",zi(s,t+1*i,n-6*i,8*i,8*i,2.5*i),s.fill()):(s.fillStyle=ki,zi(s,t-3*i,n-9*i,6*i,18*i,2*i),s.fill(),s.fillStyle=xi,s.fillRect(t-3*i,n-9*i,6*i,4*i))}function gh(s,e,t,n,i){s.strokeStyle=i,s.lineWidth=2.6*n,s.lineCap="round",s.lineJoin="round",s.beginPath(),s.moveTo(e-5*n,t),s.lineTo(e-1.5*n,t+4*n),s.lineTo(e+5.5*n,t-4*n),s.stroke()}function _h(s,e){if(s.fillStyle=ki,s.fillRect(0,0,ms,20),s.fillStyle=uh,s.beginPath(),s.ellipse(11,10,4,6,.5,0,7),s.fill(),s.fillStyle=xr,s.fillRect(20,8,30,4),s.strokeStyle=xr,s.lineWidth=2,s.beginPath(),s.moveTo(70,6),s.lineTo(73,6),s.lineTo(76,14),s.lineTo(84,14),s.lineTo(86,8),s.lineTo(74,8),s.stroke(),e){s.fillStyle=xi,s.beginPath(),s.arc(87,6,5,0,7),s.fill(),s.fillStyle=ki;for(let t=0;t<e;t++)s.fillRect(84.5+t*2,5,1.2,2.5)}}function x0(s,e){s.fillStyle=xr,s.fillRect(0,0,ms,vr);const t=new Set($i.slice(0,e.picked).map(n=>n.tile));s.save(),s.beginPath(),s.rect(0,20,ms,116),s.clip(),ph.forEach((n,i)=>{const r=ei.x[i%2],a=ei.top+Math.floor(i/2)*(ei.h+ei.gap)-e.scroll;if(a>136||a+ei.h<20)return;const o=i===e.tapping;s.fillStyle=o?ma:dh,zi(s,r,a,ei.w,ei.h,4),s.fill(),mh(s,n,r+ei.w/2,a+13,.9),s.fillStyle=Xo,s.fillRect(r+6,a+25,18,3),s.fillStyle=xi,s.fillRect(r+27,a+25,8,3),o&&(s.strokeStyle=xi,s.lineWidth=2,zi(s,r+1,a+1,ei.w-2,ei.h-2,4),s.stroke(),s.globalAlpha=1-e.ripple,s.beginPath(),s.arc(r+ei.w/2,a+14,4+e.ripple*16,0,7),s.stroke(),s.globalAlpha=1),t.has(i)&&(s.fillStyle=ki,s.beginPath(),s.arc(r+ei.w-6,a+6,5,0,7),s.fill(),gh(s,r+ei.w-6,a+6,.55,fh))}),s.restore(),_h(s,e.picked),s.fillStyle=e.picked===$i.length?xi:ki,zi(s,8,140,80,15,5),s.fill(),s.fillStyle=e.picked===$i.length?ki:xr;for(let n=0;n<$i.length;n++)s.globalAlpha=n<e.picked?1:.3,s.beginPath(),s.arc(20+n*8,147.5,2.5,0,7),s.fill();s.globalAlpha=1,s.fillRect(56,146,24,3)}function y0(s,e){s.fillStyle=xr,s.fillRect(0,0,ms,vr),_h(s,$i.length),s.save(),s.translate((1-e.slide)*ms,0),$i.forEach((n,i)=>{const r=28+i*24;s.fillStyle=dh,zi(s,6,r,84,20,4),s.fill(),mh(s,ph[n.tile],18,r+10,.6),s.fillStyle=Xo,s.fillRect(32,r+8,28,4),s.fillStyle=xi,s.fillRect(70,r+8,12,4)}),s.fillStyle=ki,s.fillRect(8,104,80,2),s.fillRect(10,110,26,5),s.fillStyle=xi,s.fillRect(62,110,22,5);const t=e.press*2;if(s.fillStyle="#a87a24",zi(s,10,126,76,24,6),s.fill(),s.fillStyle=e.press?xi:fh,zi(s,10,124+t,76,22-t,6),s.fill(),s.fillStyle=ki,e.wait<0)s.fillRect(34,133+t,28,4);else for(let n=0;n<3;n++)s.globalAlpha=n===e.wait?1:.35,s.beginPath(),s.arc(40+n*8,135+t,3,0,7),s.fill();s.globalAlpha=1,s.restore()}function M0(s,e){s.fillStyle=ki,s.fillRect(0,0,ms,vr);const t=gr(e.q/.35),n=22*(.35+.65*t);s.fillStyle=xi,s.beginPath(),s.arc(48,52,n,0,7),s.fill(),t>.5&&gh(s,48,52,1.6,ma);const i=gr((e.q-.3)/.6),r=vr-i*62;s.fillStyle=ma,s.fillRect(22,r,52,70),s.fillStyle=Xo;for(let a=0;a<4;a++)s.fillRect(28,r+8+a*9,a===3?18:40,3);s.fillStyle=xi,s.fillRect(52,r+35,16,3)}function S0(s,e){s.setTransform(pa,0,0,pa,0,0),e.mode==="paid"?M0(s,e):e.mode==="pay"?y0(s,e):x0(s,e)}class E0 extends Ys{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new C0(t)}),this.register(function(t){return new P0(t)}),this.register(function(t){return new k0(t)}),this.register(function(t){return new z0(t)}),this.register(function(t){return new G0(t)}),this.register(function(t){return new I0(t)}),this.register(function(t){return new D0(t)}),this.register(function(t){return new F0(t)}),this.register(function(t){return new N0(t)}),this.register(function(t){return new R0(t)}),this.register(function(t){return new U0(t)}),this.register(function(t){return new L0(t)}),this.register(function(t){return new B0(t)}),this.register(function(t){return new O0(t)}),this.register(function(t){return new w0(t)}),this.register(function(t){return new H0(t)}),this.register(function(t){return new V0(t)})}load(e,t,n,i){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=mr.extractUrlBase(e);a=mr.resolveURL(l,this.path)}else a=mr.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new lh(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===bh){try{a[Ht.KHR_BINARY_GLTF]=new W0(e)}catch(h){i&&i(h);return}r=JSON.parse(a[Ht.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new i_(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case Ht.KHR_MATERIALS_UNLIT:a[h]=new T0;break;case Ht.KHR_DRACO_MESH_COMPRESSION:a[h]=new X0(r,this.dracoLoader);break;case Ht.KHR_TEXTURE_TRANSFORM:a[h]=new j0;break;case Ht.KHR_MESH_QUANTIZATION:a[h]=new q0;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function A0(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const Ht={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class w0{constructor(e){this.parser=e,this.name=Ht.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const u=new ot(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],Hn);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Ao(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Ea(u),l.distance=h;break;case"spot":l=new Rg(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Ui(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class T0{constructor(){this.name=Ht.KHR_MATERIALS_UNLIT}getMaterialType(){return Mn}extendParams(e,t,n){const i=[];e.color=new ot(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Hn),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,qt))}return Promise.all(i)}}class R0{constructor(e){this.parser=e,this.name=Ht.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class C0{constructor(e){this.parser=e,this.name=Ht.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new He(o,o)}return Promise.all(r)}}class P0{constructor(e){this.parser=e,this.name=Ht.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class L0{constructor(e){this.parser=e,this.name=Ht.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class I0{constructor(e){this.parser=e,this.name=Ht.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new ot(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Hn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,qt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class D0{constructor(e){this.parser=e,this.name=Ht.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class F0{constructor(e){this.parser=e,this.name=Ht.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new ot().setRGB(o[0],o[1],o[2],Hn),Promise.all(r)}}class N0{constructor(e){this.parser=e,this.name=Ht.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class U0{constructor(e){this.parser=e,this.name=Ht.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new ot().setRGB(o[0],o[1],o[2],Hn),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,qt)),Promise.all(r)}}class O0{constructor(e){this.parser=e,this.name=Ht.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class B0{constructor(e){this.parser=e,this.name=Ht.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class k0{constructor(e){this.parser=e,this.name=Ht.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class z0{constructor(e){this.parser=e,this.name=Ht.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class G0{constructor(e){this.parser=e,this.name=Ht.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class H0{constructor(e){this.name=Ht.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=i.byteOffset||0,l=i.byteLength||0,u=i.count,h=i.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(f),u,h,d,i.mode,i.filter),f})})}else return null}}class V0{constructor(e){this.name=Ht.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==li.TRIANGLES&&l.mode!==li.TRIANGLE_STRIP&&l.mode!==li.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],d=l[0].count,f=[];for(const g of h){const b=new lt,m=new F,p=new Tn,x=new F(1,1,1),y=new Kn(g.geometry,g.material,d);for(let _=0;_<d;_++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,_),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,_),c.SCALE&&x.fromBufferAttribute(c.SCALE,_),y.setMatrixAt(_,b.compose(m,p,x));for(const _ in c)if(_==="_COLOR_0"){const P=c[_];y.instanceColor=new yo(P.array,P.itemSize,P.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&g.geometry.setAttribute(_,c[_]);dn.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),f.push(y)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const bh="glTF",cr=12,yl={JSON:1313821514,BIN:5130562};class W0{constructor(e){this.name=Ht.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,cr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==bh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-cr,r=new DataView(e,cr);let a=0;for(;a<i;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===yl.JSON){const l=new Uint8Array(e,cr+a,o);this.content=n.decode(l)}else if(c===yl.BIN){const l=cr+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class X0{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ht.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const u in a){const h=Co[u]||u.toLowerCase();o[h]=a[u]}for(const u in e.attributes){const h=Co[u]||u.toLowerCase();if(a[u]!==void 0){const d=n.accessors[e.attributes[u]],f=ks[d.componentType];l[h]=f.name,c[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){i.decodeDracoFile(u,function(f){for(const g in f.attributes){const b=f.attributes[g],m=c[g];m!==void 0&&(b.normalized=m)}h(f)},o,l,Hn,d)})})}}class j0{constructor(){this.name=Ht.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class q0{constructor(){this.name=Ht.KHR_MESH_QUANTIZATION}}class vh extends yr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=i-t,h=(n-t)/u,d=h*h,f=d*h,g=e*l,b=g-l,m=-2*f+3*d,p=f-d,x=1-m,y=p-d+h;for(let _=0;_!==o;_++){const P=a[b+_+o],w=a[b+_+c]*u,C=a[g+_+o],S=a[g+_]*u;r[_]=x*P+y*w+m*C+p*S}return r}}const K0=new Tn;class Y0 extends vh{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return K0.fromArray(r).normalize().toArray(r),r}}const li={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ks={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ml={9728:1003,9729:1006,9984:1004,9985:1007,9986:1005,9987:1008},Sl={33071:1001,33648:1002,10497:1e3},go={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Co={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Zi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},J0={CUBICSPLINE:void 0,LINEAR:2301,STEP:2300},_o={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Z0(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Gi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),s.DefaultMaterial}function hs(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ui(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Q0(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,u=e.length;l<u;l++){const h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];if(n){const d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):s.attributes.position;a.push(d)}if(i){const d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):s.attributes.normal;o.push(d)}if(r){const d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):s.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],d=l[2];return n&&(s.morphAttributes.position=u),i&&(s.morphAttributes.normal=h),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function $0(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function e_(s){let e;const t=s.extensions&&s.extensions[Ht.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+bo(t.attributes):e=s.indices+":"+bo(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+bo(s.targets[n]);return e}function bo(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Po(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function t_(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const n_=new lt;class i_{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new A0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new hh(this.options.manager):this.textureLoader=new Lg(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new lh(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return hs(r,o,i),Ui(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,u]of a.children.entries())r(u,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ht.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,a){n.load(mr.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=go[i.type],o=ks[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new Zt(l,a,c))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=go[i.type],l=ks[i.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let b,m;if(f&&f!==h){const p=Math.floor(d/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let y=t.cache.get(x);y||(b=new l(o,p*f,i.count*f/u),y=new Xl(b,f/u),t.cache.add(x,y)),m=new br(y,c,d%f/u,g)}else o===null?b=new l(i.count*c):b=new l(o,d,i.count*c),m=new Zt(b,c,g);if(i.sparse!==void 0){const p=go.SCALAR,x=ks[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,_=i.sparse.values.byteOffset||0,P=new x(a[1],y,i.sparse.count*p),w=new l(a[2],_,i.sparse.count*c);o!==null&&(m=new Zt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let C=0,S=P.length;C<S;C++){const v=P[C];if(m.setX(v,w[C*c]),c>=2&&m.setY(v,w[C*c+1]),c>=3&&m.setZ(v,w[C*c+2]),c>=4&&m.setW(v,w[C*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return u.magFilter=Ml[d.magFilter]||1006,u.minFilter=Ml[d.minFilter]||1008,u.wrapS=Sl[d.wrapS]||1e3,u.wrapT=Sl[d.wrapT]||1e3,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==1003&&u.minFilter!==1006,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=i.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(h){l=!0;const d=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(b){const m=new Sn(b);m.needsUpdate=!0,d(m)}),t.load(mr.resolveURL(h,r.path),g,void 0,f)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),Ui(h,a),h.userData.mimeType=a.mimeType||t_(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Ht.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Ht.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[Ht.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Zl,di.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Jl,di.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Gi}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let a;const o={},c=r.extensions||{},l=[];if(c[Ht.KHR_MATERIALS_UNLIT]){const h=i[Ht.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,r,t))}else{const h=r.pbrMetallicRoughness||{};if(o.color=new ot(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Hn),o.opacity=d[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",h.baseColorTexture,qt)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=2);const u=r.alphaMode||_o.OPAQUE;if(u===_o.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===_o.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Mn&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new He(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;o.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&a!==Mn&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Mn){const h=r.emissiveFactor;o.emissive=new ot().setRGB(h[0],h[1],h[2],Hn)}return r.emissiveTexture!==void 0&&a!==Mn&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,qt)),Promise.all(l).then(function(){const h=new a(o);return r.name&&(h.name=r.name),Ui(h,r),t.associations.set(h,{materials:e}),r.extensions&&hs(i,h,r),h})}createUniqueName(e){const t=Qt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[Ht.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return El(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],u=e_(l),h=i[u];if(h)a.push(h.promise);else{let d;l.extensions&&l.extensions[Ht.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=El(new ln,l,t),i[u]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const u=a[c].material===void 0?Z0(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let f=0,g=u.length;f<g;f++){const b=u[f],m=a[f];let p;const x=l[f];if(m.mode===li.TRIANGLES||m.mode===li.TRIANGLE_STRIP||m.mode===li.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new tg(b,x):new Je(b,x),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===li.TRIANGLE_STRIP?p.geometry=hl(p.geometry,1):m.mode===li.TRIANGLE_FAN&&(p.geometry=hl(p.geometry,2));else if(m.mode===li.LINES)p=new sg(b,x);else if(m.mode===li.LINE_STRIP)p=new No(b,x);else if(m.mode===li.LINE_LOOP)p=new rg(b,x);else if(m.mode===li.POINTS)p=new ag(b,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&$0(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Ui(p,r),m.extensions&&hs(i,p,m),t.assignFinalMaterial(p),h.push(p)}for(let f=0,g=h.length;f<g;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return r.extensions&&hs(i,h[0],r),h[0];const d=new gt;r.extensions&&hs(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=h.length;f<g;f++)d.add(h[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new jn(Bh.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new ba(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ui(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),a=i,o=[],c=[];for(let l=0,u=a.length;l<u;l++){const h=a[l];if(h){o.push(h);const d=new lt;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Fo(o,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let h=0,d=i.channels.length;h<d;h++){const f=i.channels[h],g=i.samplers[f.sampler],b=f.target,m=b.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,x=i.parameters!==void 0?i.parameters[g.output]:g.output;b.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",x)),l.push(g),u.push(b))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const d=h[0],f=h[1],g=h[2],b=h[3],m=h[4],p=[];for(let x=0,y=d.length;x<y;x++){const _=d[x],P=f[x],w=g[x],C=b[x],S=m[x];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();const v=n._createAnimationTracks(_,P,w,C,S);if(v)for(let M=0;M<v.length;M++)p.push(v[M])}return new Eo(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const u=l[0],h=l[1],d=l[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,n_)});for(let f=0,g=h.length;f<g;f++)u.add(h[f]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new Kl:l.length>1?u=new gt:l.length===1?u=l[0]:u=new dn,u!==l[0])for(let h=0,d=l.length;h<d;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=a),Ui(u,r),r.extensions&&hs(n,u,r),r.matrix!==void 0){const h=new lt;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new gt;n.name&&(r.name=i.createUniqueName(n.name)),Ui(r,n),n.extensions&&hs(t,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);const l=u=>{const h=new Map;for(const[d,f]of i.associations)(d instanceof di||d instanceof Sn)&&h.set(d,f);return u.traverse(d=>{const f=i.associations.get(d);f!=null&&h.set(d,f)}),h};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){const a=[],o=e.name?e.name:e.uuid,c=[];Zi[r.path]===Zi.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(Zi[r.path]){case Zi.weights:l=Hs;break;case Zi.rotation:l=Vs;break;case Zi.position:case Zi.scale:l=Ws;break;default:switch(n.itemSize){case 1:l=Hs;break;case 2:case 3:default:l=Ws;break}break}const u=i.interpolation!==void 0?J0[i.interpolation]:2301,h=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const g=new l(c[d]+"."+Zi[r.path],t.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Po(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Vs?Y0:vh;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function s_(s,e,t){const n=e.attributes,i=new On;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new F(c[0],c[1],c[2]),new F(l[0],l[1],l[2])),o.normalized){const u=Po(ks[o.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new F,c=new F;for(let l=0,u=r.length;l<u;l++){const h=r[l];if(h.POSITION!==void 0){const d=t.json.accessors[h.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const b=Po(ks[d.componentType]);c.multiplyScalar(b)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;const a=new Ai;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function El(s,e,t){const n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(const a in n){const o=Co[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){const a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return Xt.workingColorSpace!==Hn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Xt.workingColorSpace}" not supported.`),Ui(s,e),s_(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Q0(s,e.targets,t):s})}var r_=(function(){var s="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var i=WebAssembly.validate(t)?e:s,r,a=WebAssembly.instantiate(o(i),{}).then(function(p){r=p.instance,r.exports.__wasm_call_ctors()});function o(p){for(var x=new Uint8Array(p.length),y=0;y<p.length;++y){var _=p.charCodeAt(y);x[y]=_>96?_-97:_>64?_-39:_+4}for(var P=0,y=0;y<p.length;++y)x[P++]=x[y]<60?n[x[y]]:(x[y]-60)*64+x[++y];return x.buffer.slice(0,P)}function c(p,x,y,_,P,w){var C=r.exports.sbrk,S=y+3&-4,v=C(S*_),M=C(P.length),R=new Uint8Array(r.exports.memory.buffer);R.set(P,M);var z=p(v,y,_,M,P.length);if(z==0&&w&&w(v,S,_),x.set(R.subarray(v,v+y*_)),C(v-C(0)),z!=0)throw new Error("Malformed buffer data: "+z)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},u={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},h=[],d=0;function f(p){var x={object:new Worker(p),pending:0,requests:{}};return x.object.onmessage=function(y){var _=y.data;x.pending-=_.count,x.requests[_.id][_.action](_.value),delete x.requests[_.id]},x}function g(p){for(var x="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(o(i))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+c.toString()+m.toString(),y=new Blob([x],{type:"text/javascript"}),_=URL.createObjectURL(y),P=0;P<p;++P)h[P]=f(_);URL.revokeObjectURL(_)}function b(p,x,y,_,P){for(var w=h[0],C=1;C<h.length;++C)h[C].pending<w.pending&&(w=h[C]);return new Promise(function(S,v){var M=new Uint8Array(y),R=d++;w.pending+=p,w.requests[R]={resolve:S,reject:v},w.object.postMessage({id:R,count:p,size:x,source:M,mode:_,filter:P},[M.buffer])})}function m(p){a.then(function(){var x=p.data;try{var y=new Uint8Array(x.count*x.size);c(r.exports[x.mode],y,x.count,x.size,x.source,r.exports[x.filter]),self.postMessage({id:x.id,count:x.count,action:"resolve",value:y},[y.buffer])}catch(_){self.postMessage({id:x.id,count:x.count,action:"reject",value:_})}})}return{ready:a,supported:!0,useWorkers:function(p){g(p)},decodeVertexBuffer:function(p,x,y,_,P){c(r.exports.meshopt_decodeVertexBuffer,p,x,y,_,r.exports[l[P]])},decodeIndexBuffer:function(p,x,y,_){c(r.exports.meshopt_decodeIndexBuffer,p,x,y,_)},decodeIndexSequence:function(p,x,y,_){c(r.exports.meshopt_decodeIndexSequence,p,x,y,_)},decodeGltfBuffer:function(p,x,y,_,P,w){c(r.exports[u[P]],p,x,y,_,r.exports[l[w]])},decodeGltfBufferAsync:function(p,x,y,_,P){return h.length>0?b(p,x,y,u[_],l[P]):a.then(function(){var w=new Uint8Array(p*x);return c(r.exports[u[_]],w,p,x,y,r.exports[l[P]]),w})}}})();function a_(s){const e=new Map,t=new Map,n=s.clone();return xh(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function xh(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)xh(s.children[n],e.children[n],t)}const us=1.69,Al=160,vo=32,wl="#fff1d6",Tl="#fffaf0",Rl="#b8ad94";function d_(s,e){let t;try{t=new Qm({canvas:s,antialias:!0,alpha:!1,powerPreference:"high-performance"}),t.localClippingEnabled=!0}catch{return null}if(!t.getContext())return null;let n=0;const i=ch,r=(E,N,U)=>{n=U-N};i.onStart=i.onProgress=r,t.outputColorSpace=qt,t.shadowMap.enabled=!0,t.shadowMap.type=2;const a=new ot().setRGB(e.haze.colour[0]/255,e.haze.colour[1]/255,e.haze.colour[2]/255,qt),o=new zc;o.background=a.clone();const c=ml(),l=new gt;l.scale.y=vn,o.add(l);const u=new rl(Tl,Rl,1.55);o.add(u);const h=new Ao(wl,2.1),d=e.sun.reach,f=new F(-e.sun.x*d,1/vn,-e.sun.z*d).normalize();h.castShadow=!0,h.shadow.mapSize.set(2048,2048),h.shadow.bias=-4e-4,h.shadow.normalBias=.03,Object.assign(h.shadow.camera,{left:-44,right:44,top:44,bottom:-44,near:1,far:260}),o.add(h,h.target);const g={hazeColour:{value:a},hazeX:{value:new jt(...e.haze.ramp.west,...e.haze.ramp.east)},hazeZ:{value:new jt(...e.haze.ramp.north,...e.haze.ramp.south)}},b=new Map;function m(E,N={}){const U=E+JSON.stringify(N);if(b.has(U))return b.get(U);const H=p(E,N);return b.set(U,H),H}function p(E,N={}){return x(new An({color:E,...N}))}function x(E){return E.onBeforeCompile=N=>{Object.assign(N.uniforms,g),N.vertexShader=`varying vec3 vHazeWorld;
`+N.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        vec4 hazeLocal = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          hazeLocal = instanceMatrix * hazeLocal;
        #endif
        vHazeWorld = (modelMatrix * hazeLocal).xyz;`),N.fragmentShader=`varying vec3 vHazeWorld;
uniform vec3 hazeColour;
uniform vec4 hazeX;
uniform vec4 hazeZ;
`+N.fragmentShader.replace("#include <dithering_fragment>",`
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
        #include <dithering_fragment>`)},E.customProgramCacheKey=()=>"haze",E}const y={},_=new hh;function P(E){const N=(e.floorTextures||{})[E];return N?(y[E]||(y[E]=_.load(new URL(N.url,document.baseURI).href),y[E].colorSpace=qt,y[E].wrapS=y[E].wrapT=1e3,y[E].anisotropy=8),{base:y[E],size:N.size}):null}function w(E,N){const U=P(N);if(!U)return E;const H=U.base.clone(),B=E.scale.x,te=E.scale.z;return H.repeat.set(B/U.size,te/U.size),H.offset.set((E.position.x-B/2)/U.size,-(E.position.z+te/2)/U.size),E.material=p("#ffffff",{map:H}),E}const C=new cn(1,1,1).translate(0,.5,0);function S(E,N,U,H,B,te,de,_e,{cast:Le=!0,receive:Ke=!0,opts:re}={}){const st=new Je(C,m(_e,re));return st.position.set(N,U,H),st.scale.set(B,te,de),st.castShadow=Le,st.receiveShadow=Ke,E.add(st),st}function v(E,N,U,H,B,te,de,_e,Le){return S(E,(N+U)/2,H,(te+de)/2,Math.max(.001,U-N),Math.max(.001,B-H),Math.max(.001,de-te),_e,Le)}const M=new E0().setMeshoptDecoder(r_),R=M.load.bind(M),z=[];let k=0;function X(){k=0;const E=performance.now()+6;do{const N=z.shift();try{N()}catch(U){console.warn("3D map: model setup failed",U)}}while(z.length&&performance.now()<E);z.length&&(k=requestAnimationFrame(X))}M.load=(E,N,U,H)=>R(E,B=>{B.scene.userData.file=E.split("/").pop(),z.push(()=>N(B)),k||(k=requestAnimationFrame(X))},U,H);function ae(E,N,U,H,B,te=l){M.load(e.modelBase+E,de=>{ye(de.scene);const _e=new gt;_e.add(de.scene),_e.scale.set(us,us/vn,us),_e.position.set(N,U,H),te.add(_e),B&&B(de.scene,_e),ps(de.scene)},void 0,de=>console.warn("3D map: could not load "+E,de))}const I=[],j=o_(l,e,{box:S,span:v,material:m,textured:w,lampStandIns:I});l_(l,e,{box:S,span:v,material:m,textured:w,model:ae});const G=h_(o,l,e.transport,{box:S,material:m}),ce=qg(l,e,{box:S,span:v,material:m,model:ae}),Y=e0(l,e,{box:S,span:v,material:m});i0(l,e,{span:v,model:ae});let Q=0;const Se=[],De=new Je(new Go(.86,1,48).rotateX(-Math.PI/2),new Mn({color:"#e2c68a",transparent:!0,opacity:.85,depthWrite:!1}));De.renderOrder=2,l.add(De);const ie=["#d8cfbd","#b8cdb2","#9cc4b8","#e2c68a"];function pe(E){if(!Se[E]){const N=new gt,U=S(N,0,0,0,1,1,1,ie[1]),H=S(N,0,1,0,1,.08,1,"#efe7d4");N.userData={body:U,top:H},l.add(N),Se[E]=N}return Se[E]}const Fe={};function ye(E){E.traverse(N=>{if(!N.isMesh)return;N.castShadow=N.receiveShadow=!0;const U=N.material;U&&U.transmission>0&&(N.material=new Gi({color:U.color,roughness:.1,metalness:0,transparent:!0,opacity:.28,depthWrite:!1}),N.castShadow=!1)})}function ht(E){const N=new F,U=new F,H=new F;E.traverse(B=>{if(!B.isMesh||!/^Sign(Border)?$/.test(B.name))return;const te=B.geometry,de=te.attributes.position,_e=te.index;if(!_e)return;let Le=0;for(let re=0;re<_e.count;re+=3)N.fromBufferAttribute(de,_e.getX(re)),U.fromBufferAttribute(de,_e.getX(re+1)),H.fromBufferAttribute(de,_e.getX(re+2)),Le+=N.dot(U.cross(H));if(Le>=0)return;for(let re=0;re<_e.count;re+=3){const st=_e.getX(re+1);_e.setX(re+1,_e.getX(re+2)),_e.setX(re+2,st)}const Ke=te.attributes.normal;if(Ke)for(let re=0;re<Ke.count;re++)Ke.setXYZ(re,-Ke.getX(re),-Ke.getY(re),-Ke.getZ(re))})}function ut(E){E.traverse(N=>{const U=N.isMesh&&N.material;U&&U.metalness>.5&&(U.metalness=.35,U.roughness=Math.max(.35,U.roughness))})}Y&&Y.loadModels(M,e.modelBase),G&&G.loadModels(M,e.modelBase);const pt={},At=[],yt=[],St={};(e.fixtures||[]).forEach(E=>{M.load(e.modelBase+E.file,N=>{ye(N.scene),(E.hide||[]).forEach(H=>{const B=N.scene.getObjectByName(H);B&&(B.visible=!1)}),E.glow&&N.scene.traverse(H=>{const B=H.isMesh&&H.material;B&&B.name===E.glow&&!At.includes(B)&&(B.emissive.set("#ffe3b0"),At.push(B))}),E.screen&&N.scene.traverse(H=>{const B=H.isMesh&&H.material;B&&B.name===E.screen&&!yt.includes(B)&&(B.emissive.set("#ffffff"),B.emissiveMap=B.map,B.needsUpdate=!0,yt.push(B))}),E.menu&&N.scene.traverse(H=>{const B=H.isMesh&&H.material;B&&B.name===E.screen&&!St[E.key]&&(St[E.key]=q(B))}),ps(N.scene);const U=new gt;U.add(N.scene),U.scale.set(E.scale,E.scale/vn,E.scale),U.position.set(E.x,E.y,E.z),U.visible=!1,l.add(U),pt[E.key]=U},void 0,N=>console.warn("3D map: could not load "+E.file,N))});function q(E){const N=document.createElement("canvas");N.width=ms*pa,N.height=vr*pa;const U=new ui(N);return U.flipY=!1,U.colorSpace=qt,{material:E,base:E.map,texture:U,ctx:N.getContext("2d"),key:"",paidAt:null}}function $t(E,N,U){const H=E.material,B=N!=null&&N>=0;B&&N>=Ro&&E.paidAt==null&&(E.paidAt=U),B&&N<Ro&&(E.paidAt=null);const te=E.paidAt==null?null:U-E.paidAt;!B&&te!=null&&(te>_0||te<0)&&(E.paidAt=null);const de=B||E.paidAt!=null;if(de){const Le=v0(B?N:1,U,E.paidAt==null?null:te);Le.key!==E.key&&(S0(E.ctx,Le),E.texture.needsUpdate=!0,E.key=Le.key)}const _e=de?E.texture:E.base;H.map!==_e&&(H.map=H.emissiveMap=_e),de&&(H.emissiveIntensity+=.2)}const Tt={};function Mt(E){const N=(e.stationModels||{})[E];!N||Tt[E]||(Tt[E]=!0,M.load(e.modelBase+N,U=>{const H=U.scene,B=new On().setFromObject(H),te=B.getSize(new F),de=B.getCenter(new F),_e=e.stationModelSize[E]||{w:te.x+te.z,ox:0},Le=_e.w/((te.x+te.z)*Math.SQRT1_2);H.position.set(-de.x,-B.min.y,-de.z),ye(H),ht(H),ut(H),f0(H,+E.split(".")[0]),ps(H);const Ke=new gt;Ke.add(H),Ke.scale.set(Le,Le/vn,Le),Ke.position.set(_e.ox*Math.SQRT1_2,0,-_e.ox*Math.SQRT1_2),_e.turn&&(Ke.rotation.y=_e.turn),Fe[E]=Ke},void 0,U=>console.warn("3D map: could not load "+N,U)))}const rt={},Ft=ml(),Ye=new zc;Ye.add(new rl(Tl,Rl,1.7));const D=new Ao(wl,2.1);D.position.copy(f).multiplyScalar(50),Ye.add(D);function A(E){return rt[E]?rt[E]:Fe[E]?rt[E]=we(Fe[E].clone(),480,600):(Mt(E),null)}function J(E,N){E=Math.min(8,Math.max(1,E||1));const U="lounge."+E+"."+(N?2:1);if(rt[U])return rt[U];const H=Y&&Y.pictureCopy(E,N);return H?rt[U]=we(H,600,480):null}const fe={},xe=new An({color:"#9aa39b"}),he=new An({color:"#c9a978"}),$e=new Mn({color:"#ffb52e"});function Pe(E,N){if(fe[E])return fe[E];const U=[];N.traverse(ve=>{ve.isMesh&&(ve.material=ve.material.clone(),U.push(ve.material))});const H=N.visible;N.visible=!0,N.updateMatrixWorld(!0);const B=new On().setFromObject(N);N.visible=H;const te=B.min.y/vn,de=B.max.y/vn+.35,_e=.3,Le=B.min.x-_e,Ke=B.max.x+_e,re=B.min.z-_e,st=B.max.z+_e,L=[],O=[],ne=.05,oe=(ve,ue,Ge,ft,it,ct,Rt=L)=>Rt.push(new cn(ft,it,ct).translate(ve,ue,Ge)),Ce=(ve,ue)=>{const Ge=Math.max(1,Math.round((ue-ve)/1.6));return Array.from({length:Ge+1},(ft,it)=>ve+(ue-ve)*it/Ge)};Ce(Le,Ke).forEach(ve=>[re,st].forEach(ue=>oe(ve,(te+de)/2,ue,ne,de-te,ne))),Ce(re,st).forEach(ve=>[Le,Ke].forEach(ue=>oe(ue,(te+de)/2,ve,ne,de-te,ne)));for(let ve=te+.9;ve<=de+.01;ve+=.9)[re,st].forEach(ue=>oe((Le+Ke)/2,ve,ue,Ke-Le,ne,ne)),[Le,Ke].forEach(ue=>oe(ue,ve,(re+st)/2,ne,ne,st-re)),oe((Le+Ke)/2,ve-.03,st-.18,Ke-Le,.05,.34,O);const Ee=new gt;Ee.add(new Je(es(L),xe),new Je(es(O),he));const Qe=new Je(new bi(.12,10,8),$e);return Qe.position.set(Ke,de+.12,st),Ee.add(Qe),Ee.traverse(ve=>{ve.isMesh&&(ve.castShadow=!0)}),l.add(Ee),fe[E]={site:Ee,beacon:Qe,materials:U,plane:new Oi(new F(0,-1,0),0),lo:B.min.y,hi:B.max.y}}function Ne(E){const N=E.fixtureBuild||{};Object.entries(pt).forEach(([U,H])=>{const B=N[U];if(B===void 0){const de=fe[U];de&&de.site.visible&&(de.site.visible=!1,de.materials.forEach(_e=>{_e.clippingPlanes=null,_e.needsUpdate=!0}));return}const te=Pe(U,H);(!te.site.visible||!te.materials[0].clippingPlanes)&&(te.site.visible=!0,te.materials.forEach(de=>{de.clippingPlanes=[te.plane],de.needsUpdate=!0})),te.plane.constant=te.lo+(te.hi-te.lo)*Math.max(0,Math.min(1,(B-.1)/.9)),H.visible=!0,te.beacon.visible=Math.floor((E.time||0)/500)%2===0})}function wt(E){if(rt["fixture."+E])return rt["fixture."+E];if(!pt[E]||fe[E]&&fe[E].site.visible)return null;const N=pt[E].clone();return N.visible=!0,rt["fixture."+E]=we(N,600,480)}function we(E,N,U){const H=new gt;H.scale.y=vn,H.add(E),Ye.add(H),H.updateMatrixWorld(!0);const B=new On().setFromObject(H),te=[];for(let ue=0;ue<8;ue++)te.push(new F(ue&1?B.max.x:B.min.x,ue&2?B.max.y:B.min.y,ue&4?B.max.z:B.min.z));Ft.updateMatrixWorld(!0);const de=Ft.matrixWorldInverse,_e=[],Le=[];te.forEach(ue=>{ue.applyMatrix4(de),_e.push(ue.x),Le.push(ue.y)});const Ke=(Math.min(..._e)+Math.max(..._e))/2,re=(Math.min(...Le)+Math.max(...Le))/2,st=Math.max((Math.max(..._e)-Math.min(..._e))/2/N*U,(Math.max(...Le)-Math.min(...Le))/2)*1.04;Ft.left=Ke-st*N/U,Ft.right=Ke+st*N/U,Ft.top=re+st,Ft.bottom=re-st,Ft.updateProjectionMatrix();const L=new ts(N,U,{samples:4});L.texture.colorSpace=qt;const O=t.getClearColor(new ot),ne=t.getClearAlpha(),oe=t.shadowMap.enabled;t.shadowMap.enabled=!1,t.setRenderTarget(L),t.setClearColor(0,0),t.clear(),t.render(Ye,Ft);const Ce=new Uint8Array(N*U*4);t.readRenderTargetPixels(L,0,0,N,U,Ce),t.setRenderTarget(null),t.setClearColor(O,ne),t.shadowMap.enabled=oe,L.dispose(),Ye.remove(H);const Ee=document.createElement("canvas");Ee.width=N,Ee.height=U;const Qe=Ee.getContext("2d"),ve=Qe.createImageData(N,U);for(let ue=0;ue<U;ue++)ve.data.set(Ce.subarray((U-1-ue)*N*4,(U-ue)*N*4),ue*N*4);return Qe.putImageData(ve,0,0),Ee}const Oe=new ko(.24,1.55,4,10).translate(0,1.03,0),Xe=new Kn(Oe,m("#ffffff",{name:"people"}),Al);Xe.castShadow=!0,Xe.count=0;const dt=new Map,Ve=[],Ct=new Zt(new Uint16Array([0,1,2,0,2,3]),1),vt=8e3;let Bt=0,V=0;function Ue(E){let N=dt.get(E);return N||(N=new Sn(E),N.colorSpace=qt,N.anisotropy=4,N.needsUpdate=!0,dt.set(E,N)),N.userData.used=V,N}function le(){V-Bt<2e3||(Bt=V,dt.forEach((E,N)=>{V-E.userData.used>vt&&(E.dispose(),dt.delete(N))}))}const be=[];function ze(E){if(!be[E]){const N=new ln;N.setAttribute("position",new Zt(new Float32Array(12),3)),N.setAttribute("uv",new Zt(new Float32Array(8),2)),N.setIndex(Ct);const U=new Je(N,x(new Mn({alphaTest:.5,side:2,depthTest:!1,depthWrite:!1})));U.frustumCulled=!1,U.renderOrder=-1,l.add(U),be[E]=U}return be[E]}function Be(E){if(!Ve[E]){const N=new ln;N.setAttribute("position",new Zt(new Float32Array(12),3)),N.setAttribute("uv",new Zt(new Float32Array(8),2)),N.setIndex(Ct);const U=new Je(N,x(new Mn({alphaTest:.5,side:2})));U.frustumCulled=!1,l.add(U),Ve[E]=U}return Ve[E]}const nt=[],Kt=[];function hn(E,N,U){const H=new ln;H.setAttribute("position",new Zt(new Float32Array(12),3)),H.setAttribute("uv",new Zt(new Float32Array(8),2)),H.setIndex(Ct);const B={alphaTest:.5,side:2},te=x(N?new An({...B,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}):new Mn(B)),de=new Je(H,te);return de.visible=!1,de.frustumCulled=!1,de.receiveShadow=N,l.add(de),_.load(new URL(E,document.baseURI).href,_e=>{_e.colorSpace=qt,_e.anisotropy=8;const[Le,Ke]=U(_e.image);H.attributes.position.array.set(Le),H.attributes.position.needsUpdate=!0,H.attributes.uv.array.set(Ke),H.attributes.uv.needsUpdate=!0,H.computeVertexNormals(),te.map=_e,te.needsUpdate=!0,de.userData.ready=!0},void 0,()=>console.warn("3D map: could not load "+E)),de}(e.wallFaces||[]).forEach(E=>{const N=hn(E.url,!1,()=>[[E.x0,E.y0,E.z0,E.x1,E.y0,E.z1,E.x1,E.y0+E.h,E.z1,E.x0,E.y0+E.h,E.z0],[0,0,1,0,1,1,0,1]]);N.userData.model=E.model,nt.push(N)}),(e.decals||[]).forEach(E=>{const N=hn(E.url,!0,U=>{const H=E.pixels?E.image.map(([Ce,Ee])=>[Ce/U.naturalWidth,Ee/U.naturalHeight]):E.image,[B,te,de]=H,[_e,Le,Ke]=E.world,re=te[0]-B[0],st=de[0]-B[0],L=te[1]-B[1],O=de[1]-B[1],ne=re*O-st*L,oe=(Ce,Ee)=>{const Qe=Ce-B[0],ve=Ee-B[1],ue=(O*Qe-st*ve)/ne,Ge=(re*ve-L*Qe)/ne;return[_e[0]+(Le[0]-_e[0])*ue+(Ke[0]-_e[0])*Ge,.012,_e[1]+(Le[1]-_e[1])*ue+(Ke[1]-_e[1])*Ge]};return[[...oe(0,1),...oe(1,1),...oe(1,0),...oe(0,0)],[0,0,1,0,1,1,0,1]]});N.userData.show=E.show,Kt.push(N)}),(e.casters||[]).forEach(E=>S(l,E.x,0,E.z,E.w,E.h,E.d,"#ffffff",{receive:!1,opts:{name:"street"}}));const Pt=new gt;l.add(Pt);let ge="";function _n(E){Pt.children.forEach(U=>U.geometry.dispose()),Pt.clear();const N=new Set;E.forEach(U=>{const H=new xa(U.points.map(te=>new F(te[0],te[1],te[2]))),B=new Je(new js(H,20,.045,8,!1),m(U.colour));B.castShadow=!0,Pt.add(B),[U.points[0],U.points[U.points.length-1]].forEach(te=>{const de=te[0].toFixed(2)+","+te[2].toFixed(2);if(N.has(de))return;N.add(de);const _e=new Je(C.clone(),m("#ffffff",{name:"street"}));_e.position.set(te[0],0,te[2]),_e.scale.set(.07,1,.07),_e.castShadow=!0,Pt.add(_e)})})}Xe.instanceMatrix.setUsage(35048),l.add(Xe);const mn=new Kn(C,m("#ffffff",{name:"street"}),vo),Pn=new Kn(C,m("#dfe8ea",{name:"street"}),vo);[mn,Pn].forEach(E=>{E.castShadow=!0,E.count=0,E.instanceMatrix.setUsage(35048),l.add(E)});const en=1.69,Yn=new F(0,0,1),Vn=new Tn,fi={},En=[];Object.entries(e.carModels||{}).forEach(([E,N])=>M.load(e.modelBase+N,U=>{ye(U.scene),ps(U.scene);const H=U.scene.getObjectByName("WheelFL");fi[E]={scene:U.scene,radius:H?new On().setFromObject(H).getSize(new F).y/2:.25}},void 0,U=>console.warn("3D map: could not load "+N,U)));const ii=160,Yt={},yi={},si=new Set;function xn(E){E.updateMatrixWorld(!0);const N=new Map;E.traverse(H=>{if(!H.isMesh)return;let B=H.geometry.index?H.geometry.toNonIndexed():H.geometry.clone();B.applyMatrix4(H.matrixWorld),H.matrixWorld.determinant()<0&&Object.values(B.attributes).forEach(te=>{for(let de=0;de<te.count;de+=3)for(let _e=0;_e<te.itemSize;_e++){const Le=te.getComponent(de+1,_e);te.setComponent(de+1,_e,te.getComponent(de+2,_e)),te.setComponent(de+2,_e,Le)}}),Object.keys(B.attributes).forEach(te=>{te!=="position"&&te!=="normal"&&te!=="uv"&&te!=="color"&&B.deleteAttribute(te)}),B.attributes.normal||B.computeVertexNormals(),N.has(H.material)||N.set(H.material,[]),N.get(H.material).push(B)});const U=[...N].map(([H,B])=>{["uv","color"].forEach(de=>{B.some(_e=>!_e.attributes[de])&&B.forEach(_e=>_e.deleteAttribute(de))}),/Paint$/.test(H.name)&&(H.userData.paint=H.color.clone(),H.color.set("#ffffff"));const te=new Kn(es(B),x(H),ii);return te.count=0,te.castShadow=te.receiveShadow=!0,te.frustumCulled=!1,te.userData.file=E.userData.file,te.userData.prop=!0,l.add(te),te});return U.box=new On().setFromObject(E),U}function ri(E){if(!yi[E]){yi[E]=!0;const[N,U]=E.split("#");M.load(e.modelBase+N,H=>{if(ye(H.scene),U==="low"||U==="lawn"){const B=[],te=U==="low"?/^(Crown|Trunk)/:/^Pit/;H.scene.traverse(de=>{te.test(de.name)&&B.push(de)}),B.forEach(de=>de.parent&&de.parent.remove(de))}H.scene.traverse(B=>{B.isMesh&&B.material.name==="LampGlow"&&si.add(B.material)}),ut(H.scene),Yt[E]=xn(H.scene)},void 0,H=>console.warn("3D map: could not load "+E,H))}return!!Yt[E]}const Jn=new F(en,en/vn,en),T=new Tn,K=new F(0,1,0),se=new F;function $(E,N){Object.values(Yt).forEach(U=>U.forEach(H=>{H.count=0})),(E||[]).forEach(U=>{const H=Yt[U.file];if(!(!H||H[0].count>=ii)){if(T.setFromAxisAngle(K,U.rot||0),bt.set(U.x,U.y===void 0?e.plazaY:U.y,U.z),Array.isArray(U.scale))Ie.compose(bt,T,se.set(Jn.x*U.scale[0],Jn.y*U.scale[1],Jn.z*U.scale[2]));else if(U.scale)Ie.compose(bt,T,se.copy(Jn).multiplyScalar(U.scale));else if(U.fit){const B=H.box,te=U.fit.w/(B.max.x-B.min.x),de=U.fit.d/(B.max.z-B.min.z);bt.x-=(B.min.x+B.max.x)/2*te,bt.z-=(B.min.z+B.max.z)/2*de,Ie.compose(bt,T,se.set(te,te/vn,de))}else Ie.compose(bt,T,Jn);H.forEach(B=>{B.material.userData.paint&&B.setColorAt(B.count,U.tint?Ot.set(U.tint):B.material.userData.paint),B.setMatrixAt(B.count++,Ie)})}}),Object.values(Yt).forEach(U=>U.forEach(H=>{H.instanceMatrix.needsUpdate=!0,H.instanceColor&&(H.instanceColor.needsUpdate=!0),H.visible=H.count>0})),si.forEach(U=>{U.emissive.set("#ffd9a0"),U.emissiveIntensity=N*2.5})}const W=1.1*us,Te=.16,me=.9,je={value:me},et={},_t={},xt=[],We=new Map;function It(E){return _t[E]||(_t[E]=!0,M.load(e.modelBase+E,N=>{ye(N.scene);const U=[];N.scene.traverse(H=>{if(!H.isMesh)return;H.frustumCulled=!1;const B=H.material.map||H.material.emissiveMap;H.material=new Gi({map:B,emissiveMap:B,emissive:"#ffffff",emissiveIntensity:Te,roughness:.62,metalness:0,name:H.material.name}),H.material.onBeforeCompile=te=>{te.uniforms.characterRim=je,te.fragmentShader=te.fragmentShader.replace("#include <common>",`#include <common>
uniform float characterRim;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
              float rimFacing = 1.0 - abs(dot(normal, isOrthographic ? vec3(0.0, 0.0, 1.0) : normalize(vViewPosition)));
              totalEmissiveRadiance += diffuseColor.rgb * vec3(1.0, .93, .8) * pow(rimFacing, 3.0) * characterRim;`)},U.push(H.material)}),et[E]={scene:N.scene,clips:N.animations,materials:U}},void 0,N=>console.warn("3D map: could not load "+E,N))),!!et[E]}function kt(E,N){let U=xt[E];if(U&&U.file===N)return U;U&&l.remove(U.holder);const H=et[N],B=new gt,te=a_(H.scene);B.add(te),B.scale.set(us,us/vn,us),l.add(B);const de=new Wg(te),_e=re=>H.clips.find(st=>re.test(st.name)),Le=de.clipAction(_e(/^Idle/)),Ke=de.clipAction(_e(/^Walking$/));return Ke.timeScale=0,Le.play(),Ke.play(),xt[E]={file:N,holder:B,mixer:de,idle:Le,walk:Ke}}function Lt(E,N,U){Object.values(et).forEach(B=>B.materials.forEach(te=>{te.emissiveIntensity=Te*(1-U*.85)})),je.value=me*(1-U*.7);const H=new Set;(E||[]).forEach((B,te)=>{if(!et[B.file])return;const de=kt(te,B.file),_e=B.still?0:Math.max(0,Math.min(1,B.amount||0));de.holder.visible=!0,de.holder.position.set(B.x,B.y||0,B.z);let Le,Ke;const re=_e>.3?B.heading:B.look||B.heading;if(re)Le=re.x,Ke=re.z;else{const Ce=(B.facing===void 0?.3:B.facing)>=0?.75:-.75;Le=1+Ce,Ke=1-Ce}const st=Math.atan2(Le,Ke),L=We.has(B.id)?We.get(B.id):st;let O=st-L;O-=Math.round(O/(2*Math.PI))*2*Math.PI;const ne=L+O*Math.min(1,N*10);We.set(B.id,ne),H.add(B.id),de.holder.rotation.y=ne;const oe=de.walk.getClip().duration;de.walk.time=((B.ground||0)/W%1+1)%1*oe,de.walk.setEffectiveWeight(_e),de.idle.setEffectiveWeight(1-_e),de.mixer.update(B.still?0:N)});for(let B=(E||[]).length;B<xt.length;B++)xt[B]&&(xt[B].holder.visible=!1);We.forEach((B,te)=>{H.has(te)||We.delete(te)})}const Ze=()=>!!e.carModels&&Object.keys(e.carModels).every(E=>fi[E]);function Gt(E,N){const U=N.van?"van":"car",H=fi[U];let B=En[E];if(B&&B.kind===U&&B.paint===N.paint)return B;B&&l.remove(B.holder);const te=new gt,de=H.scene.clone(!0);de.traverse(Le=>{Le.isMesh&&/Paint$/.test(Le.material.name)&&(Le.material=Le.material.clone(),Le.material.color.set(N.paint))}),te.add(de),te.scale.set(en,en/vn,en),l.add(te);const _e=["WheelFL","WheelFR","WheelBL","WheelBR"].map(Le=>de.getObjectByName(Le)).filter(Boolean).map(Le=>({w:Le,rest:Le.quaternion.clone()}));return En[E]={kind:U,paint:N.paint,holder:te,wheels:_e,radius:H.radius}}const Ie=new lt,bt=new F,Et=new F,Vt=new Tn,Ot=new ot,bn=u.intensity,ai=h.intensity,Wt=new ot("#2b3a48"),Jt=a.clone();let Ln=!1;s.addEventListener("webglcontextlost",E=>{E.preventDefault(),Ln=!0}),s.addEventListener("webglcontextrestored",()=>{Ln=!1});let gn=1;const Fn=(E,N)=>{const U=N.geometry,H=U.attributes.position,B=U.attributes.uv,[te,de,_e,Le]=E.uv;H.array.set(E.points),H.needsUpdate=!0,B.array.set([te,de,_e,de,_e,Le,te,Le]),B.needsUpdate=!0;const Ke=N.material,re=Ue(E.img),st=E.alpha<1;Ke.map!==re&&(Ke.map||(Ke.needsUpdate=!0),Ke.map=re),Ke.transparent!==st&&(Ke.transparent=st,Ke.needsUpdate=!0),Ke.opacity=E.alpha,Ke.color.setScalar(gn),N.visible=!0};function nn(E,N){gn=1-N*.55,E.forEach((U,H)=>Fn(U,Be(H)));for(let U=E.length;U<Ve.length;U++)Ve[U].visible=!1}function sn(E,N){V=performance.now(),le();const U=Math.min(E.dpr,2);t.getPixelRatio()!==U&&t.setPixelRatio(U);const H=t.getSize(new He);(H.x!==E.width||H.y!==E.height)&&t.setSize(E.width,E.height,!1),Kg(c,E);const B=E.lookAt||{x:0,z:0};h.target.position.set(B.x,0,B.z),h.position.copy(h.target.position).addScaledVector(f,120),h.target.updateMatrixWorld();const te=E.night||0;return u.intensity=bn*(1-te*.72),h.intensity=ai*(1-te*.9),o.background.copy(N).lerp(Wt,te),g.hazeColour.value.copy(o.background),te}const In=o0(l),fn=[],_s=new ot,Mi={},Nn=[g.hazeX.value.clone(),g.hazeZ.value.clone()];let oi=!1,ee=null;function Z(E){if(E!==oi){if(oi=E,E){const N=new Set([l,u,h,h.target,In.group,...Ve]);[...o.children,...l.children].forEach(U=>{!N.has(U)&&!U.userData.prop&&!U.userData.land&&U.visible&&(U.visible=!1,fn.push(U))}),be.forEach(U=>{U.visible=!1})}else fn.forEach(N=>{N.visible=!0}),fn.length=0,ee&&(ee.visible=!1),ee=null,g.hazeX.value.copy(Nn[0]),g.hazeZ.value.copy(Nn[1]);In.group.visible=E}}const Ae=90,Me=2,Re=13;function ke(E,[N,U,H,B]){const te=[];return E.forEach(([de,_e,Le,Ke])=>{if(N>=_e||U<=de||H>=Ke||B<=Le){te.push([de,_e,Le,Ke]);return}H>Le&&te.push([de,_e,Le,H]),B<Ke&&te.push([de,_e,B,Ke]);const re=Math.max(Le,H),st=Math.min(Ke,B);N>de&&te.push([de,N,re,st]),U<_e&&te.push([U,_e,re,st])}),te}function at(E){const N=new gt,[U,H,B,te]=E.plot,de=(U+H)/2,_e=(B+te)/2,Le=Ae;N.userData.land=!0;let Ke=ke([[de-Le,de+Le,_e-Le,_e+Le]],E.plot);const re=E.strips||[],st=re.map(O=>[O.x0===void 0?de-Le:O.x0,O.x1===void 0?de+Le:O.x1,O.z0===void 0?_e-Le:O.z0,O.z1===void 0?_e+Le:O.z1]);st.forEach(O=>{Ke=ke(Ke,O)}),Ke.forEach(([O,ne,oe,Ce])=>v(N,O,ne,E.y-1.2,E.y,oe,Ce,E.colour,{cast:!1})),re.forEach((O,ne)=>ke([st[ne]],E.plot).forEach(([oe,Ce,Ee,Qe])=>v(N,oe,Ce,E.y-1.2,O.y,Ee,Qe,O.colour,{cast:!1})));const L=[];if(E.trees){let O=7;const ne=()=>(O=O*16807%2147483647)/2147483647;for(let oe=0;oe<64;oe++){const Ce=oe%4,Ee=Ce===1||Ce===3,Qe=ne(),ve=Ee?7.5+ne()*4:2+ne()*8,ue=Ce===0?U-ve:Ce===1?H+ve:U-8+Qe*(H-U+16),Ge=Ce===2?B-ve:Ce===3?te+ve:B-8+Qe*(te-B+16);ue>U-1.5&&ue<H+1.5&&Ge>B-1.5&&Ge<te+1.5||ue>H&&Ge>te-4||Ge>te&&ue>H-4||st.some(([ft,it,ct,Rt])=>ue>ft-1.6&&ue<it+1.6&&Ge>ct-1.6&&Ge<Rt+1.6)||L.push({file:oe%3?"tree.glb#lawn":"street_tree.glb#lawn",x:ue,y:E.y,z:Ge,rot:ne()*6.28,scale:(Ee?.6:.75)+ne()*.35})}}if(E.town){const O=["building_rowhouse_terracotta","building_townhouse_sage","building_low_stone","building_mid_stone","building_apartment_brick","building_shop_narrow","building_low_tan","building_corner"];let ne=0;for(let oe=U+4;oe<H+4;oe+=10.5)L.push({file:O[ne++%O.length]+".glb",x:oe,y:E.y,z:B-6.5,rot:0});for(let oe=B+2;oe<te+2;oe+=10.5)L.push({file:O[ne++%O.length]+".glb",x:U-6.5,y:E.y,z:oe,rot:Math.PI/2});L.push({file:"building_corner.glb",x:U-6.5,y:E.y,z:B-6.5,rot:Math.PI/4})}return N.userData.props=L,N.userData.haze=[new jt(U-Me,U-Re,H+Me,H+Re),new jt(B-Me,B-Re,te+Me,te+Re)],l.add(N),N}function tt(E){if(Ln)return!1;Z(!0);const N=E.land?Mi[E.landKey]||(Mi[E.landKey]=at(E.land)):null;N!==ee&&(ee&&(ee.visible=!1),ee=N,ee&&(ee.visible=!0,g.hazeX.value.copy(ee.userData.haze[0]),g.hazeZ.value.copy(ee.userData.haze[1])));const U=sn(E,ee?Jt:_s.set(E.background));In.update(E.branch,U);const H=(E.branch.props||[]).concat(ee?ee.userData.props:[]);return H.forEach(B=>ri(B.file)),$(H,U),nn(E.figures||[],U),E.dry||t.render(o,c),!0}function mt(E){if(Ln)return!1;Z(!1);const N=sn(E,Jt),U=performance.now(),H=Math.min(.1,(U-(Q||U))/1e3);Q=U;let B=!1;E.stations.forEach((re,st)=>{const L=pe(st),{body:O,top:ne}=L.userData;if(L.visible=re.visible!==!1,!L.visible)return;const oe=re.index+"."+Math.max(1,re.tier);re.built&&(Mt(oe),Mt(re.index+".3"));const Ce=Fe[oe]?oe:re.index+".3",Ee=re.built&&re.index!==void 0&&Fe[Ce],Qe=L.userData.clones||(L.userData.clones={}),ve=L.userData.rigs||(L.userData.rigs={});Ee&&!Qe[Ce]&&(L.add(Qe[Ce]=Ee.clone()),ve[Ce]=p0(Qe[Ce],re.index)),Ee&&ve[Ce]&&g0(ve[Ce],re,H),Object.entries(Qe).forEach(([Rt,pn])=>{pn.visible=!!Ee&&Rt===Ce}),O.visible=!Ee;const ue=re.built?re.h:.12,Ge=re.rise?-re.rise*re.rise*1.1:0;L.position.set(re.x,re.y+Ge,re.z);const ft=re.pop===void 0?1:re.pop,it=ft-1,ct=ft>=1?1:1+2.4*it*it*it+1.4*it*it;if(L.scale.setScalar(Math.max(.001,ct)),ft<=0&&(L.visible=!1),O.scale.set(re.w,ue,re.d),ne.visible=re.built&&!Ee,ne.position.y=ue,ne.scale.set(re.w+.12,.08,re.d+.12),O.material=m(re.built?ie[Math.min(3,re.tier)]:"#e3b04b"),re.selected&&!B&&ft>=1){B=!0,De.position.set(re.x,re.y+.03,re.z);const Rt=Math.max(re.w,re.d)*.72;De.scale.set(Rt,1,Rt)}}),De.visible=B;const te=E.figures||[],de=1-N*.55;nn(te,N),nt.forEach(re=>{re.visible=!!re.userData.ready&&!(re.userData.model&&pt[re.userData.model]),re.material.color.setScalar(de)}),Kt.forEach(re=>{re.visible=re.userData.ready&&(re.userData.show!=="loungeOpen"||!!E.loungeOpen)});const _e=JSON.stringify(E.ropes||[]);_e!==ge&&(ge=_e,_n(E.ropes||[]));const Le=E.backdrops||[];Le.forEach((re,st)=>Fn(re,ze(st)));for(let re=Le.length;re<be.length;re++)be[re].visible=!1;j.forEach(re=>{re.visible=!Yt[re.userData.model],re.renderOrder=E.backdrops?-2:0,re.material.colorWrite=!E.backdrops}),Xe.material.colorWrite=Xe.material.depthWrite=!E.figures,b.forEach((re,st)=>{st.endsWith('{"name":"street"}')&&(re.colorWrite=re.depthWrite=!E.figures)}),Xe.count=Math.min(Al,E.people.length);for(let re=0;re<Xe.count;re++){const st=E.people[re];bt.set(st.x,st.y||0,st.z),Et.set(1,1,1),Ie.compose(bt,Vt.identity(),Et),Xe.setMatrixAt(re,Ie),Xe.setColorAt(re,Ot.set(st.colour))}Xe.instanceMatrix.needsUpdate=!0,Xe.instanceColor&&(Xe.instanceColor.needsUpdate=!0),$(E.props,N),Lt(E.characters,H,N),At.forEach(re=>{re.emissiveIntensity=.16+N*.7}),yt.forEach(re=>{re.emissiveIntensity=.35+N*.55}),Object.entries(St).forEach(([re,st])=>$t(st,E.menus?E.menus[re]:null,E.menuClock||0)),I.forEach(re=>{re.visible=!Yt["street_lamp.glb"]});const Ke=Ze();E.cars.forEach((re,st)=>{if(!Ke)return;const L=Gt(st,re),O=re.along==="x";L.holder.visible=!0,L.holder.position.set(re.x,e.streetY,re.z),L.holder.rotation.y=O?re.dir>0?0:Math.PI:re.dir>0?-Math.PI/2:Math.PI/2,Vn.setFromAxisAngle(Yn,-re.roll/(L.radius*en)),L.wheels.forEach(({w:ne,rest:oe})=>ne.quaternion.multiplyQuaternions(Vn,oe))});for(let re=Ke?E.cars.length:0;re<En.length;re++)En[re]&&(En[re].holder.visible=!1);mn.count=Pn.count=Ke?0:Math.min(vo,E.cars.length);for(let re=0;re<mn.count;re++){const st=E.cars[re],L=st.along==="x",O=st.van,ne=O?4.6:4,oe=1.8;bt.set(st.x,e.streetY+.25,st.z),Et.set(L?ne:oe,O?1.7:.75,L?oe:ne),mn.setMatrixAt(re,Ie.compose(bt,Vt.identity(),Et)),mn.setColorAt(re,Ot.set(st.paint)),bt.y+=O?1.7:.75,Et.set(L?O?1.4:2.1:oe*.86,O?.05:.55,L?oe*.86:O?1.4:2.1),Pn.setMatrixAt(re,Ie.compose(bt,Vt.identity(),Et))}return[mn,Pn].forEach(re=>{re.instanceMatrix.needsUpdate=!0,re.instanceColor&&(re.instanceColor.needsUpdate=!0)}),G&&E.cargo&&G.update(E.cargo,E.fixtures),ce&&ce.update(E),Y&&Y.update(E),Object.entries(pt).forEach(([re,st])=>{st.visible=!!(E.fixtures&&E.fixtures[re])}),Ne(E),E.dry||t.render(o,c),!0}function Nt(E){const N=t.info,U=new Set,H=new Set,B={};let te=0,de=0;o.traverse(ne=>{if(!ne.isMesh)return;te++;let oe=!0,Ce=null;for(let Ee=ne;Ee;Ee=Ee.parent)Ee.visible||(oe=!1),!Ce&&Ee.userData.file&&(Ce=Ee.userData.file);if(oe&&(de++,E)){const Ee=B[Ce||"(code)"]=B[Ce||"(code)"]||{meshes:0,triangles:0},Qe=ne.geometry;Ee.meshes++,Ee.triangles+=(Qe.index?Qe.index.count:Qe.attributes.position.count)/3*(ne.isInstancedMesh?ne.count:1)}U.add(ne.geometry),(Array.isArray(ne.material)?ne.material:[ne.material]).forEach(Ee=>{for(const Qe in Ee)Ee[Qe]&&Ee[Qe].isTexture&&H.add(Ee[Qe].source)})});let _e=0,Le=0;U.forEach(ne=>{Object.values(ne.attributes).forEach(oe=>{_e+=oe.array.byteLength}),ne.index&&(_e+=ne.index.array.byteLength)}),o.traverse(ne=>{ne.isInstancedMesh&&(_e+=ne.instanceMatrix.array.byteLength+(ne.instanceColor?ne.instanceColor.array.byteLength:0))}),H.forEach(ne=>{const oe=ne.data;oe&&oe.width&&(Le+=oe.width*oe.height*4*4/3)});const Ke=t.getDrawingBufferSize(new He),re=h.shadow.mapSize,st=Ke.x*Ke.y*4*(t.getContext().getContextAttributes().antialias?9:2),L=t.shadowMap.enabled?re.x*re.y*8:0,O=ne=>Math.round(ne/1048576*10)/10;return{calls:N.render.calls,triangles:N.render.triangles,meshes:te,visible:de,programs:N.programs?N.programs.length:0,geometries:N.memory.geometries,textures:N.memory.textures,pixelRatio:t.getPixelRatio(),buffer:Ke.x+"x"+Ke.y,mb:{geometry:O(_e),texture:O(Le),buffer:O(st),shadow:O(L),total:O(_e+Le+st+L)},...E?{models:B}:{}}}return{render:mt,renderBranch:tt,carsModelled:Ze,propReady:ri,characterReady:It,hasFixture:E=>!!pt[E],stationPicture:A,loungePicture:J,fixturePicture:wt,stats:Nt,get ok(){return!Ln},get loading(){return n+z.length},dispose(){cancelAnimationFrame(k),z.length=0,t.dispose(),b.forEach(E=>E.dispose())}}}function o_(s,e,{box:t,span:n,material:i,textured:r,lampStandIns:a}){const{roads:o,roadWidth:c,plazaY:l,streetY:u,extent:h}=e,d=e.holes||[],f=(S,v,M,R,z,k,X,ae)=>{let I=[[S,v,z,k]];d.forEach(j=>{I=I.flatMap(([G,ce,Y,Q])=>{if(j.x0>=ce||j.x1<=G||j.z0>=Q||j.z1<=Y)return[[G,ce,Y,Q]];const Se=Math.max(G,j.x0),De=Math.min(ce,j.x1);return[[G,Se,Y,Q],[De,ce,Y,Q],[Se,De,Y,Math.max(Y,j.z0)],[Se,De,Math.min(Q,j.z1),Q]].filter(([ie,pe,Fe,ye])=>pe-ie>1e-6&&ye-Fe>1e-6)})}),I.forEach(([j,G,ce,Y])=>r(n(s,j,G,M,R,ce,Y,X,{cast:!1}),ae))};f(-h,h,u-.4,u,-h,h,e.colours.asphalt,"asphalt");const g=S=>{const v=o.filter(z=>z.along===S).map(z=>z.at).sort((z,k)=>z-k),M=[];let R=-h;return v.forEach(z=>{M.push([R,z-c/2]),R=z+c/2}),M.push([R,h]),M},b=g("x");g("z").forEach(([S,v])=>b.forEach(([M,R])=>f(S,v,u,l,M,R,e.colours.paver,"sidewalk")));const p={};(e.marks||[]).forEach(S=>(p[S.colour]=p[S.colour]||[]).push(S));const x=new lt,y=new F,_=new F,P=new Tn;Object.entries(p).forEach(([S,v])=>{const M=/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/.exec(S),R=M?i("#"+[1,2,3].map(k=>(+M[k]).toString(16).padStart(2,"0")).join(""),{transparent:!0,opacity:+M[4],depthWrite:!1}):i(S),z=new Kn(new cn(1,1,1).translate(0,.5,0),R,v.length);v.forEach((k,X)=>z.setMatrixAt(X,x.compose(y.set((k.x0+k.x1)/2,k.h?k.y:k.y-.004,(k.z0+k.z1)/2),P,_.set(k.x1-k.x0,k.h||.012,k.z1-k.z0)))),z.receiveShadow=!0,s.add(z)});const w=[];e.buildings.forEach(S=>{const v=n(s,S.x0,S.x1,l,S.h,S.z0,S.z1,S.wall,{opts:{name:"terrace"}}),M=n(s,S.x0-.15,S.x1+.15,S.h,S.h+.35,S.z0-.15,S.z1+.15,S.roof,{opts:{name:"terrace"}});v.userData.model=M.userData.model=S.model,w.push(v,M)}),s.add(c_(e.silhouettes||[],l,i));const C=new ti(1.6,1);return e.trees.forEach(([S,v])=>{t(s,S,l,v,.35,2.2,.35,"#7a5a3e",{opts:{name:"street"}});const M=new Je(C,i("#7fa35a",{name:"street"}));M.position.set(S,l+3.6,v),M.scale.set(1,.8,1),M.castShadow=M.receiveShadow=!0,s.add(M)}),e.lamps.forEach(([S,v])=>{a.push(t(s,S,l,v,.18,4.4,.18,"#3b4a43",{opts:{name:"street"}})),a.push(t(s,S,l+4.3,v,.5,.3,.5,"#f1e3b6",{opts:{name:"street"}}))}),w}function c_(s,e,t){const n=[],i=[],r=[],a=new ot,o=new ot,c=new ot("#e6dcc6"),l=(m,p,x,y,_,P)=>{[m,p,x,m,x,y].forEach(w=>{n.push(...w),i.push(..._),r.push(P.r,P.g,P.b)})},u=(m,p,x,y,_,P,w)=>{l([m,y,P],[p,y,P],[p,y,_],[m,y,_],[0,1,0],w),l([m,x,P],[p,x,P],[p,y,P],[m,y,P],[0,0,1],w),l([p,x,P],[p,x,_],[p,y,_],[p,y,P],[1,0,0],w),l([p,x,_],[m,x,_],[m,y,_],[p,y,_],[0,0,-1],w),l([m,x,_],[m,x,P],[m,y,P],[m,y,_],[-1,0,0],w)},h=1.69/vn,d=2.75*h,f=2.45*h;s.forEach(m=>{a.set(m.colour).convertSRGBToLinear(),o.copy(a).multiplyScalar(.62);const p=e+d+(m.storeys-1)*f+.35*h;u(m.x0,m.x1,e,p,m.z0,m.z1,a),u(m.x0-.12,m.x1+.12,p,p+.3,m.z0-.12,m.z1+.12,c);for(let x=0;x<m.storeys;x++){const y=e+(x?d+(x-1)*f:0)+(x?.9:.5)*h,_=y+(x?1.1:1.7)*h;l([m.x0+.5,y,m.z1+.03],[m.x1-.5,y,m.z1+.03],[m.x1-.5,_,m.z1+.03],[m.x0+.5,_,m.z1+.03],[0,0,1],o),l([m.x1+.03,y,m.z1-.5],[m.x1+.03,y,m.z0+.5],[m.x1+.03,_,m.z0+.5],[m.x1+.03,_,m.z1-.5],[1,0,0],o)}});const g=new ln;g.setAttribute("position",new zt(n,3)),g.setAttribute("normal",new zt(i,3)),g.setAttribute("color",new zt(r,3));const b=new Je(g,t("#ffffff",{vertexColors:!0,name:"silhouette"}));return b.receiveShadow=!0,b.castShadow=!1,b}function l_(s,e,{box:t,span:n,material:i,textured:r,model:a}){const o=new gt;s.add(o),e.floors.forEach((P,w)=>{const C=(P.x||0)-P.w/2,S=(P.x||0)+P.w/2,v=P.z-P.d/2,M=P.z+P.d/2;r(n(o,C,S,P.y-(w?.32:.02),P.y,v,M,w===2?"#e9e4d8":w?"#e4ddcc":"#c9965f",{cast:w>0}),["herringbone","timber","concrete"][w]),w&&(n(o,C,S,P.y,P.y+1.05,M-.06,M,"#c9a35a",{opts:{transparent:!0,opacity:.55}}),(w===1?[C+.3,S-.3]:[C+.3,0,S-.3]).forEach(R=>t(o,R,e.floors[w-1].y,M-.3,.3,P.y-e.floors[w-1].y-.32,.3,"#33372f")))});const c=(P,w,C,S,v,M,R,z,k,X)=>{const ae=[];for(let j=0;j<=48;j++){const G=j/48,ce=v+(M-v)*G;ae.push(new F(w+Math.cos(ce)*S,(R+(z-R)*G)*vn,C+Math.sin(ce)*S))}const I=new Je(new js(new xa(ae),96,k,8,!1),i(X));I.castShadow=!0,P.add(I)},l=(P,w,C,S,v,M)=>{const R=new gt,z=new gt;z.scale.y=1/vn,R.add(z),o.add(R),a("spiral_stair.glb",P,C,w,()=>{R.visible=!1});const k=1.15,X=Math.PI*24/180,ae=(S-C)/v,I=Y=>M+(v-1-Y)*X;t(R,P,C,w,.26,S-C+1,.26,"#1f5a3c"),t(R,P,C,w,.56,.06,.56,"#d0a54e",{cast:!1});const j=new Je(new bi(.13,16,10),i("#d0a54e"));j.position.set(P,S+1.05,w),j.castShadow=!0,R.add(j);for(let Y=0;Y<v-1;Y++){const Q=I(Y),Se=C+ae*(Y+1),De=X*1.04,ie=new Je(new un(k,k,.08,6,1,!1,Math.PI/2-Q-De/2,De),i("#d9a768"));ie.position.set(P,Se-.04,w),ie.castShadow=ie.receiveShadow=!0,R.add(ie);const pe=Q-X/2;t(R,P+Math.cos(pe)*(k-.06),Se,w+Math.sin(pe)*(k-.06),.05,.95,.05,"#1f5a3c",{cast:!1})}const G=I(0)+X/2,ce=I(v-2)-X/2;c(z,P,w,k-.06,G,ce,C+1,S-ae+1,.05,"#d0a54e"),c(z,P,w,k-.02,G,ce,C+ae-.14,S-.14,.09,"#1f5a3c")},[,u,h]=e.floors,d=-Math.PI/2,f=(P,w,C,S,v)=>n(o,P,w,v,v+1.05,C,S,"#c9a35a",{opts:{transparent:!0,opacity:.55}});l(10.2,.35,0,u.y,14,d),r(n(o,8.93,11.35,u.y-.32,u.y,-2.8,-.8,"#e4ddcc",{cast:!0}),"timber"),f(11.29,11.35,-2.8,-.8,u.y),l(7.75,-4.4,u.y,h.y,14,d),r(n(o,6.45,9,h.y-.32,h.y,-6.9,-5.55,"#e9e4d8",{cast:!0}),"concrete"),f(8.94,9,-6.9,-5.55,h.y);const g=(P,w,C,S)=>f(P-.03,P+.03,w,C,S),b=(P,w,C,S)=>f(P,w,C-.03,C+.03,S),m=u.z-u.d/2,p=u.z+u.d/2,x=h.z-h.d/2,y=h.z+h.d/2;g(-u.w/2+.03,m+3.5,p-.06,u.y),g(u.w/2-.03,m,-2.8,u.y),g(u.w/2-.03,-.8,p-.06,u.y),b(9,11.35,-2.77,u.y),b(9,9.6,-.83,u.y),b(10.8,11.35,-.83,u.y),g(-h.w/2+.03,x+3.5,y-.06,h.y),g(h.w/2-.03,-5.55,y-.06,h.y),b(h.w/2,7.15,-5.58,h.y),b(8.35,9,-5.58,h.y);const _=e.marquee;e.wallFaces||(n(o,_.x-.13,_.x+.13,0,.9,_.zRear,_.zFront,"#1f6b47"),n(o,_.x-.04,_.x+.04,.9,_.y0,_.zRear,_.zFront,"#cfe3dc",{cast:!1,opts:{transparent:!0,opacity:.35}}),n(o,_.x-.16,_.x+.16,_.y0,_.y1,_.zRear,_.zFront,"#1f6b47"),[_.zRear,_.zFront].forEach(P=>t(o,_.x,0,P,.34,_.y1,.34,"#174f36")))}function h_(s,e,t,{box:n,material:i}){if(!t)return null;const r=vn,a=t.bore/2,o=new Gi({color:"#cfeee2",emissive:"#2f5a4a",emissiveIntensity:.25,roughness:.08,metalness:0,transparent:!0,opacity:.46,depthWrite:!1}),c=new Gi({color:"#d0a54e",roughness:.3,metalness:.9}),l=(S,v,M)=>S.map((R,z)=>R+(v[z]-R)*M);function u(S){const v=[S[0]],M=.48;for(let R=1;R<S.length-1;R++){const z=S[R-1],k=S[R],X=S[R+1],ae=l(k,z,Math.min(.4,M/Math.hypot(...z.map((j,G)=>j-k[G])))),I=l(k,X,Math.min(.4,M/Math.hypot(...X.map((j,G)=>j-k[G]))));v.push(ae);for(let j=1;j<=8;j++){const G=j/8;v.push(ae.map((ce,Y)=>(1-G)*(1-G)*ce+2*(1-G)*G*k[Y]+G*G*I[Y]))}}return v.push(S[S.length-1]),v}const h=S=>new F(S[0],S[1]*r,S[2]),d=(S,v,M,R,z)=>{const k=new Je(new Ma(M,R,10,32),z);return k.position.copy(h(S)),k.lookAt(k.position.clone().add(v)),k.castShadow=!0,s.add(k),k},f=t.tubes.map(S=>{const v=u(S.points),M=new sh;for(let I=1;I<v.length;I++)M.add(new eh(h(v[I-1]),h(v[I])));const R=new Je(new js(M,Math.max(24,v.length*3),a,18,!1),o);R.renderOrder=3,s.add(R);const z=[R];[[S.points[0],S.points[1]],[S.points[S.points.length-1],S.points[S.points.length-2]]].forEach(([I,j],G)=>{(G===0?S.noCap0:S.noCap1)||z.push(d(I,h(I).sub(h(j)).normalize(),a+.02,.07,c))}),(S.floorRings||[]).forEach(I=>z.push(d(I,new F(0,1,0),a+.1,.08,c)));const X=[];let ae=0;for(let I=1;I<v.length;I++){const j=Math.hypot(v[I][0]-v[I-1][0],v[I][1]-v[I-1][1],v[I][2]-v[I-1][2]);X.push({a:v[I-1],b:v[I],len:j}),ae+=j}return{tube:S,segments:X,total:ae,parts:z}}),g=new gt;e.add(g);const b=t.belts.map(S=>{const v=Math.abs(S.x2-S.x1),M=(S.x1+S.x2)/2;return[S.x1,S.x2].forEach(R=>n(g,R-Math.sign(S.x2-S.x1)*.25*(R===S.x1?-1:1),S.floor,S.z,.12,S.height-.1,.5,"#344a40")),n(g,M,S.floor+S.height-.18,S.z,v,.16,S.width,"#536c5b"),n(g,M,S.floor+S.height-.02,S.z,v-.1,.04,S.width-.2,"#2a4035",{cast:!1}),S}),m=u_(),p=m.map(S=>{const v=new Kn(S.geometry,new An({vertexColors:!0}),32);return v.castShadow=!0,v.count=0,v.renderOrder=2,v.frustumCulled=!1,v.instanceMatrix.setUsage(35048),s.add(v),v}),x=new lt,y=new Tn,_=new F(0,1,0),P=new F,w=new F(1,1,1);function C(S,v,M,R,z){const k=Math.min(R,m.length-1),X=p[k];X.count>=32||(y.setFromAxisAngle(_,z),X.setMatrixAt(X.count++,x.compose(P.set(S,v*r,M),y,w)))}return{loadModels(S,v){S.load(v+"conveyor_parts.glb",M=>{const R=I=>{const j=M.scene.getObjectByName(I);return j&&j.position.set(0,0,0),j},z=R("Section"),k=R("End"),X=R("Leg");if(!z||!k||!X)return;const ae=(I,j,G,ce,Y,Q,Se)=>{const De=new gt,ie=I.clone();ie.traverse(pe=>{pe.isMesh&&(pe.castShadow=!0,pe.receiveShadow=!0)}),De.add(ie),De.scale.set(1.69*Y,1.69*Q/r,1.69),De.position.set(j,G,ce),Se&&(De.rotation.y=Se),e.add(De)};b.forEach(I=>{const j=Math.min(I.x1,I.x2),G=Math.max(I.x1,I.x2),ce=G-j,Y=Math.max(1,Math.round(ce)),Q=I.floor+I.height;for(let De=0;De<Y;De++)ae(z,j+(De+.5)*ce/Y,Q,I.z,ce/Y,1);ae(k,G,Q,I.z,1,1),ae(k,j,Q,I.z,1,1,Math.PI),[j+.25,G-.25].concat(ce>5?[(j+G)/2]:[]).forEach(De=>ae(X,De,I.floor,I.z,1,(I.height-.18)/.87))}),g.visible=!1},void 0,M=>console.warn("3D map: could not load conveyor_parts.glb",M)),S.load(v+"cargo_items.glb",M=>{M.scene.updateMatrixWorld(!0),m.forEach((R,z)=>{const k=M.scene.getObjectByName("Cargo"+z);if(!k)return;const X=k.matrixWorld.clone().invert().premultiply(new lt().makeScale(1.69,1.69,1.69)),ae=[];if(k.traverse(j=>{if(!j.isMesh)return;const G=j.geometry.clone().applyMatrix4(new lt().multiplyMatrices(X,j.matrixWorld)),ce=j.material.color,Y=G.attributes.position.count,Q=new Float32Array(Y*3);for(let Se=0;Se<Y;Se++)Q[Se*3]=ce.r,Q[Se*3+1]=ce.g,Q[Se*3+2]=ce.b;G.setAttribute("color",new Zt(Q,3)),Object.keys(G.attributes).forEach(Se=>{["position","normal","color"].includes(Se)||G.deleteAttribute(Se)}),ae.push(G.index?G.toNonIndexed():G)}),!ae.length)return;const I=es(ae);I.computeBoundingBox(),p[z].geometry.dispose(),p[z].geometry=I,R.geometry=I,R.height=I.boundingBox.max.y})},void 0,M=>console.warn("3D map: could not load cargo_items.glb",M))},update({odo:S,running:v},M={}){p.forEach(R=>{R.count=0}),f.forEach(({tube:R,segments:z,total:k,parts:X})=>{const ae=!R.fixture||!!M[R.fixture];if(X.forEach(Q=>{Q.visible=ae}),!ae)return;const I=R.window?R.window.total:k,j=R.window?R.window.offset:0,G=Math.max(2,Math.round(I/t.gap)),ce=I/G,Y=v[R.stage]?S:0;for(let Q=0;Q<G;Q++){let Se=(Y+Q*ce)%I-j;if(!(Se<0||Se>=k))for(const De of z){if(Se>De.len){Se-=De.len;continue}const ie=l(De.a,De.b,Se/De.len);C(ie[0],ie[1]-m[R.cargoStage].height/2/r,ie[2],R.cargoStage,Q*2.1);break}}}),b.forEach(R=>{const z=Math.abs(R.x2-R.x1),k=Math.max(2,Math.round(z/t.gap)),X=v[R.stage]?S:0,ae=Math.sign(R.x2-R.x1);for(let I=0;I<k;I++)C(R.x1+ae*((X+I*z/k)%z),R.floor+R.height+.02,R.z,R.stage,I*2.1)}),p.forEach(R=>{R.instanceMatrix.needsUpdate=!0})}}}function u_(){const s=[],e=(a,o,c=0,l=0,u=0,{sx:h=1,sy:d=1,sz:f=1,rx:g=0,ry:b=0,rz:m=0}={})=>{const p=a.index?a.toNonIndexed():a;p.deleteAttribute("uv"),p.scale(h,d,f),p.rotateX(g),p.rotateZ(m),p.rotateY(b),p.translate(c,l,u);const x=new ot(o),y=p.attributes.position.count,_=new Float32Array(y*3);for(let P=0;P<y;P++)_[P*3]=x.r,_[P*3+1]=x.g,_[P*3+2]=x.b;p.setAttribute("color",new Zt(_,3)),s.push(p)},t=()=>{const a=es(s.splice(0));return a.computeBoundingBox(),{geometry:a,height:a.boundingBox.max.y}},n=(a,o,c,l,u,h=.5)=>e(new bi(1,7,4),a,Math.cos(o)*c,l,-Math.sin(o)*c,{sx:u,sy:u*.16,sz:u*.38,rz:h,ry:o}),i=(a,o)=>{e(new un(a,a*.78,o,12),"#b8673f",0,o/2),e(new un(a*1.08,a*1.08,o*.18,12),"#c97a50",0,o*.91),e(new un(a*.92,a*.92,.012,12),"#4a3424",0,o*.97)},r=[];return i(.1,.13),e(new un(.012,.014,.14,5),"#5b8a3c",0,.2),[[0,.22],[Math.PI,.23],[Math.PI/2,.28],[-Math.PI/2,.29]].forEach(([a,o],c)=>n(c<2?"#7fb552":"#a6d073",a,.06,o,.065)),r.push(t()),i(.12,.15),e(new un(.016,.02,.34,6),"#4f7a35",0,.32),[.24,.32,.4].forEach((a,o)=>{for(let c=0;c<5;c++){const l=c*1.257+o*.6,u=.1-o*.02;n(o%2?"#4f8a3a":"#3f7a33",l,u,a,.1-o*.015,.35)}}),[[0,.47,0,.07],[.07,.4,.03,.05],[-.06,.41,-.04,.05]].forEach(([a,o,c,l])=>{e(new ti(l,1),"#9fc06c",a,o,c,{sy:1.7}),e(new ti(l*.45,0),"#d99a55",a+l*.4,o+l*.5,c+l*.3)}),r.push(t()),e(new cn(.42,.03,.3),"#c9a46a",0,.015),[[-.1,.04,"#86a85c"],[.1,-.03,"#7a9c52"],[0,.02,"#93b465"]].forEach(([a,o,c],l)=>{const u=l===2?.095:.085,h=.03+u*1.1+(l===2?.04:0);e(new ti(u,1),c,a,h,o,{sy:1.25,ry:l}),e(new ti(u*.3,0),"#d68f4a",a+u*.55,h+u*.4,o+u*.4),e(new ti(u*.25,0),"#e0a560",a-u*.4,h+u*.7,o-u*.5)}),r.push(t()),e(new un(.13,.13,.3,14),"#a9cdb3",0,.15),e(new un(.14,.14,.07,14),"#d2b25e",0,.335),e(new cn(.14,.12,.02),"#f3efda",0,.14,.125),r.push(t()),e(new cn(.32,.38,.2),"#d9bd88",0,.19),e(new cn(.33,.05,.21),"#bf9f68",0,.36),[-.06,.06].forEach(a=>e(new Ma(.07,.01,5,10,Math.PI),"#8a6e44",0,.385,a)),e(new cn(.16,.14,.01),"#496f50",0,.2,.101),e(new cn(.06,.06,.01),"#e7dcbc",0,.2,.106),r.push(t()),e(new cn(.38,.26,.3),"#c49a5e",0,.13),e(new cn(.08,.012,.31),"#e6d6ad",0,.262),[-1,1].forEach(a=>e(new cn(.08,.12,.01),"#e6d6ad",0,.2,a*.151)),e(new cn(.12,.09,.01),"#496f50",.1,.13,.152),r.push(t()),r}export{d_ as createMap3D};
