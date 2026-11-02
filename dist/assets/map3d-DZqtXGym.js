/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ec="attached",uu="detached";const jt="srgb",Zn="srgb-linear",za="linear",an="srgb";const wc="300 es";class Is{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const Gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ac=1234567;const Dr=Math.PI/180,ir=180/Math.PI;function Ai(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Gn[s&255]+Gn[s>>8&255]+Gn[s>>16&255]+Gn[s>>24&255]+"-"+Gn[e&255]+Gn[e>>8&255]+"-"+Gn[e>>16&15|64]+Gn[e>>24&255]+"-"+Gn[t&63|128]+Gn[t>>8&255]+"-"+Gn[t>>16&255]+Gn[t>>24&255]+Gn[n&255]+Gn[n>>8&255]+Gn[n>>16&255]+Gn[n>>24&255]).toLowerCase()}function Tn(s,e,t){return Math.max(e,Math.min(t,s))}function cc(s,e){return(s%e+e)%e}function du(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function fu(s,e,t){return s!==e?(t-s)/(e-s):0}function Fr(s,e,t){return(1-t)*s+t*e}function pu(s,e,t,n){return Fr(s,e,1-Math.exp(-t*n))}function mu(s,e=1){return e-Math.abs(cc(s,e*2)-e)}function gu(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function bu(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function _u(s,e){return s+Math.floor(Math.random()*(e-s+1))}function vu(s,e){return s+Math.random()*(e-s)}function xu(s){return s*(.5-Math.random())}function yu(s){s!==void 0&&(Ac=s);let e=Ac+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Mu(s){return s*Dr}function Su(s){return s*ir}function Eu(s){return(s&s-1)===0&&s!==0}function wu(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Au(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Tu(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),b=a((n-e)/2);switch(i){case"XYX":s.set(o*u,c*h,c*d,o*l);break;case"YZY":s.set(c*d,o*u,c*h,o*l);break;case"ZXZ":s.set(c*h,c*d,o*u,o*l);break;case"XZX":s.set(o*u,c*b,c*f,o*l);break;case"YXY":s.set(c*f,o*u,c*b,o*l);break;case"ZYZ":s.set(c*b,c*f,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function wi(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function sn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Ru={DEG2RAD:Dr,RAD2DEG:ir,generateUUID:Ai,clamp:Tn,euclideanModulo:cc,mapLinear:du,inverseLerp:fu,lerp:Fr,damp:pu,pingpong:mu,smoothstep:gu,smootherstep:bu,randInt:_u,randFloat:vu,randFloatSpread:xu,seededRandom:yu,degToRad:Mu,radToDeg:Su,isPowerOfTwo:Eu,ceilPowerOfTwo:wu,floorPowerOfTwo:Au,setQuaternionFromProperEuler:Tu,normalize:sn,denormalize:wi};class He{constructor(e=0,t=0){He.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Tn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Lt{constructor(e,t,n,i,r,a,o,c,l){Lt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],f=n[5],b=n[8],v=i[0],m=i[3],p=i[6],x=i[1],M=i[4],_=i[7],D=i[2],T=i[5],L=i[8];return r[0]=a*v+o*x+c*D,r[3]=a*m+o*M+c*T,r[6]=a*p+o*_+c*L,r[1]=l*v+u*x+h*D,r[4]=l*m+u*M+h*T,r[7]=l*p+u*_+h*L,r[2]=d*v+f*x+b*D,r[5]=d*m+f*M+b*T,r[8]=d*p+f*_+b*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+i*r*l-i*a*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,d=o*c-u*r,f=l*r-a*c,b=t*h+n*d+i*f;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/b;return e[0]=h*v,e[1]=(i*l-u*n)*v,e[2]=(o*n-i*a)*v,e[3]=d*v,e[4]=(u*t-i*c)*v,e[5]=(i*r-o*t)*v,e[6]=f*v,e[7]=(n*c-l*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Za.makeScale(e,t)),this}rotate(e){return this.premultiply(Za.makeRotation(-e)),this}translate(e,t){return this.premultiply(Za.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Za=new Lt;function fh(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function kr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Cu(){const s=kr("canvas");return s.style.display="block",s}const Tc={};function Lr(s){s in Tc||(Tc[s]=!0,console.warn(s))}function Pu(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Lu(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Iu(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Jt={enabled:!0,workingColorSpace:Zn,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===an&&(s.r=$i(s.r),s.g=$i(s.g),s.b=$i(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===an&&(s.r=er(s.r),s.g=er(s.g),s.b=er(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===""?za:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function $i(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function er(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Rc=[.64,.33,.3,.6,.15,.06],Cc=[.2126,.7152,.0722],Pc=[.3127,.329],Lc=new Lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ic=new Lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Jt.define({[Zn]:{primaries:Rc,whitePoint:Pc,transfer:za,toXYZ:Lc,fromXYZ:Ic,luminanceCoefficients:Cc,workingColorSpaceConfig:{unpackColorSpace:jt},outputColorSpaceConfig:{drawingBufferColorSpace:jt}},[jt]:{primaries:Rc,whitePoint:Pc,transfer:an,toXYZ:Lc,fromXYZ:Ic,luminanceCoefficients:Cc,outputColorSpaceConfig:{drawingBufferColorSpace:jt}}});let Ds;class Du{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ds===void 0&&(Ds=kr("canvas")),Ds.width=e.width,Ds.height=e.height;const n=Ds.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ds}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=kr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=$i(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor($i(t[n]/255)*255):t[n]=$i(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Fu=0;class ph{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fu++}),this.uuid=Ai(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Qa(i[a].image)):r.push(Qa(i[a]))}else r=Qa(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Qa(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Du.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Nu=0;class wn extends Is{constructor(e=wn.DEFAULT_IMAGE,t=wn.DEFAULT_MAPPING,n=1001,i=1001,r=1006,a=1008,o=1023,c=1009,l=wn.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=Ai(),this.name="",this.source=new ph(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new He(0,0),this.repeat=new He(1,1),this.center=new He(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}wn.DEFAULT_IMAGE=null;wn.DEFAULT_MAPPING=300;wn.DEFAULT_ANISOTROPY=1;class Zt{constructor(e=0,t=0,n=0,i=1){Zt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const c=e.elements,l=c[0],u=c[4],h=c[8],d=c[1],f=c[5],b=c[9],v=c[2],m=c[6],p=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-v)<.01&&Math.abs(b-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+v)<.1&&Math.abs(b+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(l+1)/2,_=(f+1)/2,D=(p+1)/2,T=(u+d)/4,L=(h+v)/4,A=(b+m)/4;return M>_&&M>D?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=T/n,r=L/n):_>D?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=T/i,r=A/i):D<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(D),n=L/r,i=A/r),this.set(n,i,r,t),this}let x=Math.sqrt((m-b)*(m-b)+(h-v)*(h-v)+(d-u)*(d-u));return Math.abs(x)<.001&&(x=1),this.x=(m-b)/x,this.y=(h-v)/x,this.z=(d-u)/x,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Uu extends Is{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Zt(0,0,e,t),this.scissorTest=!1,this.viewport=new Zt(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new wn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ph(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class gs extends Uu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class mh extends wn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ou extends wn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3];const d=r[a+0],f=r[a+1],b=r[a+2],v=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=b,e[t+3]=v;return}if(h!==v||c!==d||l!==f||u!==b){let m=1-o;const p=c*d+l*f+u*b+h*v,x=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const D=Math.sqrt(M),T=Math.atan2(D,p*x);m=Math.sin(m*T)/D,o=Math.sin(o*T)/D}const _=o*x;if(c=c*m+d*_,l=l*m+f*_,u=u*m+b*_,h=h*m+v*_,m===1-o){const D=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=D,l*=D,u*=D,h*=D}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=r[a],d=r[a+1],f=r[a+2],b=r[a+3];return e[t]=o*b+u*h+c*f-l*d,e[t+1]=c*b+u*d+l*h-o*f,e[t+2]=l*b+u*f+o*d-c*h,e[t+3]=u*b-o*h-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(i/2),h=o(r/2),d=c(n/2),f=c(i/2),b=c(r/2);switch(a){case"XYZ":this._x=d*u*h+l*f*b,this._y=l*f*h-d*u*b,this._z=l*u*b+d*f*h,this._w=l*u*h-d*f*b;break;case"YXZ":this._x=d*u*h+l*f*b,this._y=l*f*h-d*u*b,this._z=l*u*b-d*f*h,this._w=l*u*h+d*f*b;break;case"ZXY":this._x=d*u*h-l*f*b,this._y=l*f*h+d*u*b,this._z=l*u*b+d*f*h,this._w=l*u*h-d*f*b;break;case"ZYX":this._x=d*u*h-l*f*b,this._y=l*f*h+d*u*b,this._z=l*u*b-d*f*h,this._w=l*u*h+d*f*b;break;case"YZX":this._x=d*u*h+l*f*b,this._y=l*f*h+d*u*b,this._z=l*u*b-d*f*h,this._w=l*u*h-d*f*b;break;case"XZY":this._x=d*u*h-l*f*b,this._y=l*f*h-d*u*b,this._z=l*u*b+d*f*h,this._w=l*u*h+d*f*b;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(a-i)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-c)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+l)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-l)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-i)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Tn(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+i*l-r*c,this._y=i*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-i*o,this._w=a*u-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-t)*u)/l,d=Math.sin(t*u)/l;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=i*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Dc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Dc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),u=2*(o*t-r*i),h=2*(r*n-a*t);return this.x=t+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=i+c*h+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return $a.copy(this).projectOnVector(e),this.sub($a)}reflect(e){return this.sub($a.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Tn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const $a=new N,Dc=new bn;class Nn{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(yi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(yi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=yi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,yi):yi.fromBufferAttribute(r,a),yi.applyMatrix4(e.matrixWorld),this.expandByPoint(yi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Wr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Wr.copy(n.boundingBox)),Wr.applyMatrix4(e.matrixWorld),this.union(Wr)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,yi),yi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(mr),Xr.subVectors(this.max,mr),Fs.subVectors(e.a,mr),Ns.subVectors(e.b,mr),Us.subVectors(e.c,mr),ss.subVectors(Ns,Fs),rs.subVectors(Us,Ns),vs.subVectors(Fs,Us);let t=[0,-ss.z,ss.y,0,-rs.z,rs.y,0,-vs.z,vs.y,ss.z,0,-ss.x,rs.z,0,-rs.x,vs.z,0,-vs.x,-ss.y,ss.x,0,-rs.y,rs.x,0,-vs.y,vs.x,0];return!eo(t,Fs,Ns,Us,Xr)||(t=[1,0,0,0,1,0,0,0,1],!eo(t,Fs,Ns,Us,Xr))?!1:(jr.crossVectors(ss,rs),t=[jr.x,jr.y,jr.z],eo(t,Fs,Ns,Us,Xr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Gi=[new N,new N,new N,new N,new N,new N,new N,new N],yi=new N,Wr=new Nn,Fs=new N,Ns=new N,Us=new N,ss=new N,rs=new N,vs=new N,mr=new N,Xr=new N,jr=new N,xs=new N;function eo(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){xs.fromArray(s,r);const o=i.x*Math.abs(xs.x)+i.y*Math.abs(xs.y)+i.z*Math.abs(xs.z),c=e.dot(xs),l=t.dot(xs),u=n.dot(xs);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Bu=new Nn,gr=new N,to=new N;class Ni{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Bu.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;gr.subVectors(e,this.center);const t=gr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(gr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(to.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(gr.copy(e.center).add(to)),this.expandByPoint(gr.copy(e.center).sub(to))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Hi=new N,no=new N,qr=new N,as=new N,io=new N,Kr=new N,so=new N;class Ga{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Hi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Hi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Hi.copy(this.origin).addScaledVector(this.direction,t),Hi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){no.copy(e).add(t).multiplyScalar(.5),qr.copy(t).sub(e).normalize(),as.copy(this.origin).sub(no);const r=e.distanceTo(t)*.5,a=-this.direction.dot(qr),o=as.dot(this.direction),c=-as.dot(qr),l=as.lengthSq(),u=Math.abs(1-a*a);let h,d,f,b;if(u>0)if(h=a*c-o,d=a*o-c,b=r*u,h>=0)if(d>=-b)if(d<=b){const v=1/u;h*=v,d*=v,f=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d<=-b?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l):d<=b?(h=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(no).addScaledVector(qr,d),f}intersectSphere(e,t){Hi.subVectors(e.center,this.origin);const n=Hi.dot(this.direction),i=Hi.dot(Hi)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Hi)!==null}intersectTriangle(e,t,n,i,r){io.subVectors(t,e),Kr.subVectors(n,e),so.crossVectors(io,Kr);let a=this.direction.dot(so),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;as.subVectors(this.origin,e);const c=o*this.direction.dot(Kr.crossVectors(as,Kr));if(c<0)return null;const l=o*this.direction.dot(io.cross(as));if(l<0||c+l>a)return null;const u=-o*as.dot(so);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class tt{constructor(e,t,n,i,r,a,o,c,l,u,h,d,f,b,v,m){tt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,u,h,d,f,b,v,m)}set(e,t,n,i,r,a,o,c,l,u,h,d,f,b,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=b,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Os.setFromMatrixColumn(e,0).length(),r=1/Os.setFromMatrixColumn(e,1).length(),a=1/Os.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=a*u,f=a*h,b=o*u,v=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=f+b*l,t[5]=d-v*l,t[9]=-o*c,t[2]=v-d*l,t[6]=b+f*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*u,f=c*h,b=l*u,v=l*h;t[0]=d+v*o,t[4]=b*o-f,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-b,t[6]=v+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*u,f=c*h,b=l*u,v=l*h;t[0]=d-v*o,t[4]=-a*h,t[8]=b+f*o,t[1]=f+b*o,t[5]=a*u,t[9]=v-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*u,f=a*h,b=o*u,v=o*h;t[0]=c*u,t[4]=b*l-f,t[8]=d*l+v,t[1]=c*h,t[5]=v*l+d,t[9]=f*l-b,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,f=a*l,b=o*c,v=o*l;t[0]=c*u,t[4]=v-d*h,t[8]=b*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=f*h+b,t[10]=d-v*h}else if(e.order==="XZY"){const d=a*c,f=a*l,b=o*c,v=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=d*h+v,t[5]=a*u,t[9]=f*h-b,t[2]=b*h-f,t[6]=o*u,t[10]=v*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ku,e,zu)}lookAt(e,t,n){const i=this.elements;return ci.subVectors(e,t),ci.lengthSq()===0&&(ci.z=1),ci.normalize(),os.crossVectors(n,ci),os.lengthSq()===0&&(Math.abs(n.z)===1?ci.x+=1e-4:ci.z+=1e-4,ci.normalize(),os.crossVectors(n,ci)),os.normalize(),Yr.crossVectors(ci,os),i[0]=os.x,i[4]=Yr.x,i[8]=ci.x,i[1]=os.y,i[5]=Yr.y,i[9]=ci.y,i[2]=os.z,i[6]=Yr.z,i[10]=ci.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],f=n[13],b=n[2],v=n[6],m=n[10],p=n[14],x=n[3],M=n[7],_=n[11],D=n[15],T=i[0],L=i[4],A=i[8],y=i[12],S=i[1],I=i[5],z=i[9],B=i[13],Y=i[2],re=i[6],F=i[10],q=i[14],G=i[3],he=i[7],J=i[11],$=i[15];return r[0]=a*T+o*S+c*Y+l*G,r[4]=a*L+o*I+c*re+l*he,r[8]=a*A+o*z+c*F+l*J,r[12]=a*y+o*B+c*q+l*$,r[1]=u*T+h*S+d*Y+f*G,r[5]=u*L+h*I+d*re+f*he,r[9]=u*A+h*z+d*F+f*J,r[13]=u*y+h*B+d*q+f*$,r[2]=b*T+v*S+m*Y+p*G,r[6]=b*L+v*I+m*re+p*he,r[10]=b*A+v*z+m*F+p*J,r[14]=b*y+v*B+m*q+p*$,r[3]=x*T+M*S+_*Y+D*G,r[7]=x*L+M*I+_*re+D*he,r[11]=x*A+M*z+_*F+D*J,r[15]=x*y+M*B+_*q+D*$,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],d=e[10],f=e[14],b=e[3],v=e[7],m=e[11],p=e[15];return b*(+r*c*h-i*l*h-r*o*d+n*l*d+i*o*f-n*c*f)+v*(+t*c*f-t*l*d+r*a*d-i*a*f+i*l*u-r*c*u)+m*(+t*l*h-t*o*f-r*a*h+n*a*f+r*o*u-n*l*u)+p*(-i*o*u-t*c*h+t*o*d+i*a*h-n*a*d+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],d=e[10],f=e[11],b=e[12],v=e[13],m=e[14],p=e[15],x=h*m*l-v*d*l+v*c*f-o*m*f-h*c*p+o*d*p,M=b*d*l-u*m*l-b*c*f+a*m*f+u*c*p-a*d*p,_=u*v*l-b*h*l+b*o*f-a*v*f-u*o*p+a*h*p,D=b*h*c-u*v*c-b*o*d+a*v*d+u*o*m-a*h*m,T=t*x+n*M+i*_+r*D;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/T;return e[0]=x*L,e[1]=(v*d*r-h*m*r-v*i*f+n*m*f+h*i*p-n*d*p)*L,e[2]=(o*m*r-v*c*r+v*i*l-n*m*l-o*i*p+n*c*p)*L,e[3]=(h*c*r-o*d*r-h*i*l+n*d*l+o*i*f-n*c*f)*L,e[4]=M*L,e[5]=(u*m*r-b*d*r+b*i*f-t*m*f-u*i*p+t*d*p)*L,e[6]=(b*c*r-a*m*r-b*i*l+t*m*l+a*i*p-t*c*p)*L,e[7]=(a*d*r-u*c*r+u*i*l-t*d*l-a*i*f+t*c*f)*L,e[8]=_*L,e[9]=(b*h*r-u*v*r-b*n*f+t*v*f+u*n*p-t*h*p)*L,e[10]=(a*v*r-b*o*r+b*n*l-t*v*l-a*n*p+t*o*p)*L,e[11]=(u*o*r-a*h*r-u*n*l+t*h*l+a*n*f-t*o*f)*L,e[12]=D*L,e[13]=(u*v*i-b*h*i+b*n*d-t*v*d-u*n*m+t*h*m)*L,e[14]=(b*o*i-a*v*i-b*n*c+t*v*c+a*n*m-t*o*m)*L,e[15]=(a*h*i-u*o*i+u*n*c-t*h*c-a*n*d+t*o*d)*L,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,u*o+n,u*c-i*a,0,l*c-i*o,u*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,h=o+o,d=r*l,f=r*u,b=r*h,v=a*u,m=a*h,p=o*h,x=c*l,M=c*u,_=c*h,D=n.x,T=n.y,L=n.z;return i[0]=(1-(v+p))*D,i[1]=(f+_)*D,i[2]=(b-M)*D,i[3]=0,i[4]=(f-_)*T,i[5]=(1-(d+p))*T,i[6]=(m+x)*T,i[7]=0,i[8]=(b+M)*L,i[9]=(m-x)*L,i[10]=(1-(d+v))*L,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=Os.set(i[0],i[1],i[2]).length();const a=Os.set(i[4],i[5],i[6]).length(),o=Os.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Mi.copy(this);const l=1/r,u=1/a,h=1/o;return Mi.elements[0]*=l,Mi.elements[1]*=l,Mi.elements[2]*=l,Mi.elements[4]*=u,Mi.elements[5]*=u,Mi.elements[6]*=u,Mi.elements[8]*=h,Mi.elements[9]*=h,Mi.elements[10]*=h,t.setFromRotationMatrix(Mi),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=2e3){const c=this.elements,l=2*r/(t-e),u=2*r/(n-i),h=(t+e)/(t-e),d=(n+i)/(n-i);let f,b;if(o===2e3)f=-(a+r)/(a-r),b=-2*a*r/(a-r);else if(o===2001)f=-a/(a-r),b=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=2e3){const c=this.elements,l=1/(t-e),u=1/(n-i),h=1/(a-r),d=(t+e)*l,f=(n+i)*u;let b,v;if(o===2e3)b=(a+r)*h,v=-2*h;else if(o===2001)b=r*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=v,c[14]=-b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Os=new N,Mi=new tt,ku=new N(0,0,0),zu=new N(1,1,1),os=new N,Yr=new N,ci=new N,Fc=new tt,Nc=new bn;class fi{constructor(e=0,t=0,n=0,i=fi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Tn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Tn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Tn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Tn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Tn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Tn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Fc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Fc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Nc.setFromEuler(this),this.setFromQuaternion(Nc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fi.DEFAULT_ORDER="XYZ";class gh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Gu=0;const Uc=new N,Bs=new bn,Vi=new tt,Jr=new N,br=new N,Hu=new N,Vu=new bn,Oc=new N(1,0,0),Bc=new N(0,1,0),kc=new N(0,0,1),zc={type:"added"},Wu={type:"removed"},ks={type:"childadded",child:null},ro={type:"childremoved",child:null};class pn extends Is{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gu++}),this.uuid=Ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pn.DEFAULT_UP.clone();const e=new N,t=new fi,n=new bn,i=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new tt},normalMatrix:{value:new Lt}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=pn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Bs.setFromAxisAngle(e,t),this.quaternion.multiply(Bs),this}rotateOnWorldAxis(e,t){return Bs.setFromAxisAngle(e,t),this.quaternion.premultiply(Bs),this}rotateX(e){return this.rotateOnAxis(Oc,e)}rotateY(e){return this.rotateOnAxis(Bc,e)}rotateZ(e){return this.rotateOnAxis(kc,e)}translateOnAxis(e,t){return Uc.copy(e).applyQuaternion(this.quaternion),this.position.add(Uc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Oc,e)}translateY(e){return this.translateOnAxis(Bc,e)}translateZ(e){return this.translateOnAxis(kc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Vi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Jr.copy(e):Jr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),br.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vi.lookAt(br,Jr,this.up):Vi.lookAt(Jr,br,this.up),this.quaternion.setFromRotationMatrix(Vi),i&&(Vi.extractRotation(i.matrixWorld),Bs.setFromRotationMatrix(Vi),this.quaternion.premultiply(Bs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zc),ks.child=e,this.dispatchEvent(ks),ks.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Wu),ro.child=e,this.dispatchEvent(ro),ro.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Vi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Vi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Vi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zc),ks.child=e,this.dispatchEvent(ks),ks.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,e,Hu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,Vu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),b=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),b.length>0&&(n.nodes=b)}return n.object=i,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}pn.DEFAULT_UP=new N(0,1,0);pn.DEFAULT_MATRIX_AUTO_UPDATE=!0;pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Si=new N,Wi=new N,ao=new N,Xi=new N,zs=new N,Gs=new N,Gc=new N,oo=new N,co=new N,lo=new N,ho=new Zt,uo=new Zt,fo=new Zt;class bi{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Si.subVectors(e,t),i.cross(Si);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Si.subVectors(i,t),Wi.subVectors(n,t),ao.subVectors(e,t);const a=Si.dot(Si),o=Si.dot(Wi),c=Si.dot(ao),l=Wi.dot(Wi),u=Wi.dot(ao),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(l*c-o*u)*d,b=(a*u-o*c)*d;return r.set(1-f-b,b,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Xi)===null?!1:Xi.x>=0&&Xi.y>=0&&Xi.x+Xi.y<=1}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,Xi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Xi.x),c.addScaledVector(a,Xi.y),c.addScaledVector(o,Xi.z),c)}static getInterpolatedAttribute(e,t,n,i,r,a){return ho.setScalar(0),uo.setScalar(0),fo.setScalar(0),ho.fromBufferAttribute(e,t),uo.fromBufferAttribute(e,n),fo.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(ho,r.x),a.addScaledVector(uo,r.y),a.addScaledVector(fo,r.z),a}static isFrontFacing(e,t,n,i){return Si.subVectors(n,t),Wi.subVectors(e,t),Si.cross(Wi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Si.subVectors(this.c,this.b),Wi.subVectors(this.a,this.b),Si.cross(Wi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return bi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return bi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return bi.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return bi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return bi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;zs.subVectors(i,n),Gs.subVectors(r,n),oo.subVectors(e,n);const c=zs.dot(oo),l=Gs.dot(oo);if(c<=0&&l<=0)return t.copy(n);co.subVectors(e,i);const u=zs.dot(co),h=Gs.dot(co);if(u>=0&&h<=u)return t.copy(i);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(zs,a);lo.subVectors(e,r);const f=zs.dot(lo),b=Gs.dot(lo);if(b>=0&&f<=b)return t.copy(r);const v=f*l-c*b;if(v<=0&&l>=0&&b<=0)return o=l/(l-b),t.copy(n).addScaledVector(Gs,o);const m=u*b-f*h;if(m<=0&&h-u>=0&&f-b>=0)return Gc.subVectors(r,i),o=(h-u)/(h-u+(f-b)),t.copy(i).addScaledVector(Gc,o);const p=1/(m+v+d);return a=v*p,o=d*p,t.copy(n).addScaledVector(zs,a).addScaledVector(Gs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const bh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},cs={h:0,s:0,l:0},Zr={h:0,s:0,l:0};function po(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class nt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Jt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Jt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Jt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Jt.workingColorSpace){if(e=cc(e,1),t=Tn(t,0,1),n=Tn(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=po(a,r,e+1/3),this.g=po(a,r,e),this.b=po(a,r,e-1/3)}return Jt.toWorkingColorSpace(this,i),this}setStyle(e,t=jt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=jt){const n=bh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$i(e.r),this.g=$i(e.g),this.b=$i(e.b),this}copyLinearToSRGB(e){return this.r=er(e.r),this.g=er(e.g),this.b=er(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jt){return Jt.fromWorkingColorSpace(Hn.copy(this),e),Math.round(Tn(Hn.r*255,0,255))*65536+Math.round(Tn(Hn.g*255,0,255))*256+Math.round(Tn(Hn.b*255,0,255))}getHexString(e=jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Jt.workingColorSpace){Jt.fromWorkingColorSpace(Hn.copy(this),t);const n=Hn.r,i=Hn.g,r=Hn.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(i-r)/h+(i<r?6:0);break;case i:c=(r-n)/h+2;break;case r:c=(n-i)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Jt.workingColorSpace){return Jt.fromWorkingColorSpace(Hn.copy(this),t),e.r=Hn.r,e.g=Hn.g,e.b=Hn.b,e}getStyle(e=jt){Jt.fromWorkingColorSpace(Hn.copy(this),e);const t=Hn.r,n=Hn.g,i=Hn.b;return e!==jt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(cs),this.setHSL(cs.h+e,cs.s+t,cs.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(cs),e.getHSL(Zr);const n=Fr(cs.h,Zr.h,t),i=Fr(cs.s,Zr.s,t),r=Fr(cs.l,Zr.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Hn=new nt;nt.NAMES=bh;let Xu=0;class _i extends Is{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xu++}),this.uuid=Ai(),this.name="",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class fn extends _i{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const En=new N,Qr=new He;class $t{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Qr.fromBufferAttribute(this,t),Qr.applyMatrix3(e),this.setXY(t,Qr.x,Qr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)En.fromBufferAttribute(this,t),En.applyMatrix3(e),this.setXYZ(t,En.x,En.y,En.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)En.fromBufferAttribute(this,t),En.applyMatrix4(e),this.setXYZ(t,En.x,En.y,En.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)En.fromBufferAttribute(this,t),En.applyNormalMatrix(e),this.setXYZ(t,En.x,En.y,En.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)En.fromBufferAttribute(this,t),En.transformDirection(e),this.setXYZ(t,En.x,En.y,En.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=wi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=sn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wi(t,this.array)),t}setX(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wi(t,this.array)),t}setY(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wi(t,this.array)),t}setW(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array),i=sn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array),i=sn(i,this.array),r=sn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}}class _h extends $t{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class vh extends $t{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class zt extends $t{constructor(e,t,n){super(new Float32Array(e),t,n)}}let ju=0;const pi=new tt,mo=new pn,Hs=new N,li=new Nn,_r=new Nn,In=new N;class cn extends Is{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ju++}),this.uuid=Ai(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(fh(e)?vh:_h)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Lt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return pi.makeRotationFromQuaternion(e),this.applyMatrix4(pi),this}rotateX(e){return pi.makeRotationX(e),this.applyMatrix4(pi),this}rotateY(e){return pi.makeRotationY(e),this.applyMatrix4(pi),this}rotateZ(e){return pi.makeRotationZ(e),this.applyMatrix4(pi),this}translate(e,t,n){return pi.makeTranslation(e,t,n),this.applyMatrix4(pi),this}scale(e,t,n){return pi.makeScale(e,t,n),this.applyMatrix4(pi),this}lookAt(e){return mo.lookAt(e),mo.updateMatrix(),this.applyMatrix4(mo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hs).negate(),this.translate(Hs.x,Hs.y,Hs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new zt(n,3))}else{for(let n=0,i=t.count;n<i;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Nn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];li.setFromBufferAttribute(r),this.morphTargetsRelative?(In.addVectors(this.boundingBox.min,li.min),this.boundingBox.expandByPoint(In),In.addVectors(this.boundingBox.max,li.max),this.boundingBox.expandByPoint(In)):(this.boundingBox.expandByPoint(li.min),this.boundingBox.expandByPoint(li.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ni);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(li.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];_r.setFromBufferAttribute(o),this.morphTargetsRelative?(In.addVectors(li.min,_r.min),li.expandByPoint(In),In.addVectors(li.max,_r.max),li.expandByPoint(In)):(li.expandByPoint(_r.min),li.expandByPoint(_r.max))}li.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)In.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(In));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)In.fromBufferAttribute(o,l),c&&(Hs.fromBufferAttribute(e,l),In.add(Hs)),i=Math.max(i,n.distanceToSquared(In))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $t(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let A=0;A<n.count;A++)o[A]=new N,c[A]=new N;const l=new N,u=new N,h=new N,d=new He,f=new He,b=new He,v=new N,m=new N;function p(A,y,S){l.fromBufferAttribute(n,A),u.fromBufferAttribute(n,y),h.fromBufferAttribute(n,S),d.fromBufferAttribute(r,A),f.fromBufferAttribute(r,y),b.fromBufferAttribute(r,S),u.sub(l),h.sub(l),f.sub(d),b.sub(d);const I=1/(f.x*b.y-b.x*f.y);isFinite(I)&&(v.copy(u).multiplyScalar(b.y).addScaledVector(h,-f.y).multiplyScalar(I),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-b.x).multiplyScalar(I),o[A].add(v),o[y].add(v),o[S].add(v),c[A].add(m),c[y].add(m),c[S].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let A=0,y=x.length;A<y;++A){const S=x[A],I=S.start,z=S.count;for(let B=I,Y=I+z;B<Y;B+=3)p(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const M=new N,_=new N,D=new N,T=new N;function L(A){D.fromBufferAttribute(i,A),T.copy(D);const y=o[A];M.copy(y),M.sub(D.multiplyScalar(D.dot(y))).normalize(),_.crossVectors(T,y);const I=_.dot(c[A])<0?-1:1;a.setXYZW(A,M.x,M.y,M.z,I)}for(let A=0,y=x.length;A<y;++A){const S=x[A],I=S.start,z=S.count;for(let B=I,Y=I+z;B<Y;B+=3)L(e.getX(B+0)),L(e.getX(B+1)),L(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new $t(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new N,r=new N,a=new N,o=new N,c=new N,l=new N,u=new N,h=new N;if(e)for(let d=0,f=e.count;d<f;d+=3){const b=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,b),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),o.fromBufferAttribute(n,b),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(b,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)In.fromBufferAttribute(e,t),In.normalize(),e.setXYZ(t,In.x,In.y,In.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,h=o.normalized,d=new l.constructor(c.length*u);let f=0,b=0;for(let v=0,m=c.length;v<m;v++){o.isInterleavedBufferAttribute?f=c[v]*o.data.stride+o.offset:f=c[v]*u;for(let p=0;p<u;p++)d[b++]=l[f++]}return new $t(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new cn,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const d=l[u],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const f=l[h];u.push(f.toJSON(e.data))}u.length>0&&(i[c]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const l in i){const u=i[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Hc=new tt,ys=new Ga,$r=new Ni,Vc=new N,ea=new N,ta=new N,na=new N,go=new N,ia=new N,Wc=new N,sa=new N;class Ge extends pn{constructor(e=new cn,t=new fn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){ia.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(go.fromBufferAttribute(h,e),a?ia.addScaledVector(go,u):ia.addScaledVector(go.sub(t),u))}t.add(ia)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$r.copy(n.boundingSphere),$r.applyMatrix4(r),ys.copy(e.ray).recast(e.near),!($r.containsPoint(ys.origin)===!1&&(ys.intersectSphere($r,Vc)===null||ys.origin.distanceToSquared(Vc)>(e.far-e.near)**2))&&(Hc.copy(r).invert(),ys.copy(e.ray).applyMatrix4(Hc),!(n.boundingBox!==null&&ys.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ys)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let b=0,v=d.length;b<v;b++){const m=d[b],p=a[m.materialIndex],x=Math.max(m.start,f.start),M=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let _=x,D=M;_<D;_+=3){const T=o.getX(_),L=o.getX(_+1),A=o.getX(_+2);i=ra(this,p,e,n,l,u,h,T,L,A),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const b=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=b,p=v;m<p;m+=3){const x=o.getX(m),M=o.getX(m+1),_=o.getX(m+2);i=ra(this,a,e,n,l,u,h,x,M,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let b=0,v=d.length;b<v;b++){const m=d[b],p=a[m.materialIndex],x=Math.max(m.start,f.start),M=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let _=x,D=M;_<D;_+=3){const T=_,L=_+1,A=_+2;i=ra(this,p,e,n,l,u,h,T,L,A),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const b=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let m=b,p=v;m<p;m+=3){const x=m,M=m+1,_=m+2;i=ra(this,a,e,n,l,u,h,x,M,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function qu(s,e,t,n,i,r,a,o){let c;if(e.side===1?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===0,o),c===null)return null;sa.copy(o),sa.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(sa);return l<t.near||l>t.far?null:{distance:l,point:sa.clone(),object:s}}function ra(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,ea),s.getVertexPosition(c,ta),s.getVertexPosition(l,na);const u=qu(s,e,t,n,ea,ta,na,Wc);if(u){const h=new N;bi.getBarycoord(Wc,ea,ta,na,h),i&&(u.uv=bi.getInterpolatedAttribute(i,o,c,l,h,new He)),r&&(u.uv1=bi.getInterpolatedAttribute(r,o,c,l,h,new He)),a&&(u.normal=bi.getInterpolatedAttribute(a,o,c,l,h,new N),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new N,materialIndex:0};bi.getNormal(ea,ta,na,d.normal),u.face=d,u.barycoord=h}return u}class on extends cn{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],h=[];let d=0,f=0;b("z","y","x",-1,-1,n,t,e,a,r,0),b("z","y","x",1,-1,n,t,-e,a,r,1),b("x","z","y",1,1,e,n,t,i,a,2),b("x","z","y",1,-1,e,n,-t,i,a,3),b("x","y","z",1,-1,e,t,n,i,r,4),b("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new zt(l,3)),this.setAttribute("normal",new zt(u,3)),this.setAttribute("uv",new zt(h,2));function b(v,m,p,x,M,_,D,T,L,A,y){const S=_/L,I=D/A,z=_/2,B=D/2,Y=T/2,re=L+1,F=A+1;let q=0,G=0;const he=new N;for(let J=0;J<F;J++){const $=J*I-B;for(let ve=0;ve<re;ve++){const Le=ve*S-z;he[v]=Le*x,he[m]=$*M,he[p]=Y,l.push(he.x,he.y,he.z),he[v]=0,he[m]=0,he[p]=T>0?1:-1,u.push(he.x,he.y,he.z),h.push(ve/L),h.push(1-J/A),q+=1}}for(let J=0;J<A;J++)for(let $=0;$<L;$++){const ve=d+$+re*J,Le=d+$+re*(J+1),ie=d+($+1)+re*(J+1),pe=d+($+1)+re*J;c.push(ve,Le,pe),c.push(Le,ie,pe),G+=6}o.addGroup(f,G,y),f+=G,d+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new on(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function sr(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Yn(s){const e={};for(let t=0;t<s.length;t++){const n=sr(s[t]);for(const i in n)e[i]=n[i]}return e}function Ku(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function xh(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Jt.workingColorSpace}const Yu={clone:sr,merge:Yn};var Ju=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bs extends _i{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ju,this.fragmentShader=Zu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=sr(e.uniforms),this.uniformsGroups=Ku(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class yh extends pn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=2e3}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ls=new N,Xc=new He,jc=new He;class ti extends yh{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ir*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Dr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ir*2*Math.atan(Math.tan(Dr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ls.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ls.x,ls.y).multiplyScalar(-e/ls.z),ls.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ls.x,ls.y).multiplyScalar(-e/ls.z)}getViewSize(e,t){return this.getViewBounds(e,Xc,jc),t.subVectors(jc,Xc)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Dr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Vs=-90,Ws=1;class Qu extends pn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new ti(Vs,Ws,e,t);i.layers=this.layers,this.add(i);const r=new ti(Vs,Ws,e,t);r.layers=this.layers,this.add(r);const a=new ti(Vs,Ws,e,t);a.layers=this.layers,this.add(a);const o=new ti(Vs,Ws,e,t);o.layers=this.layers,this.add(o);const c=new ti(Vs,Ws,e,t);c.layers=this.layers,this.add(c);const l=new ti(Vs,Ws,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),b=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=b,n.texture.needsPMREMUpdate=!0}}class Mh extends wn{constructor(e,t,n,i,r,a,o,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:301,super(e,t,n,i,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class $u extends gs{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Mh(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:1006}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new on(5,5,5),r=new bs({name:"CubemapFromEquirect",uniforms:sr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});r.uniforms.tEquirect.value=t;const a=new Ge(i,r),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=1006),new Qu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}const bo=new N,ed=new N,td=new Lt;class Qi{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=bo.subVectors(n,t).cross(ed.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(bo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||td.getNormalMatrix(e),i=this.coplanarPoint(bo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ms=new Ni,aa=new N;class lc{constructor(e=new Qi,t=new Qi,n=new Qi,i=new Qi,r=new Qi,a=new Qi){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3){const n=this.planes,i=e.elements,r=i[0],a=i[1],o=i[2],c=i[3],l=i[4],u=i[5],h=i[6],d=i[7],f=i[8],b=i[9],v=i[10],m=i[11],p=i[12],x=i[13],M=i[14],_=i[15];if(n[0].setComponents(c-r,d-l,m-f,_-p).normalize(),n[1].setComponents(c+r,d+l,m+f,_+p).normalize(),n[2].setComponents(c+a,d+u,m+b,_+x).normalize(),n[3].setComponents(c-a,d-u,m-b,_-x).normalize(),n[4].setComponents(c-o,d-h,m-v,_-M).normalize(),t===2e3)n[5].setComponents(c+o,d+h,m+v,_+M).normalize();else if(t===2001)n[5].setComponents(o,h,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ms.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ms.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ms)}intersectsSprite(e){return Ms.center.set(0,0,0),Ms.radius=.7071067811865476,Ms.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ms)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(aa.x=i.normal.x>0?e.max.x:e.min.x,aa.y=i.normal.y>0?e.max.y:e.min.y,aa.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(aa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Sh(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function nd(s){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,h=l.byteLength,d=s.createBuffer();s.bindBuffer(c,d),s.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c.updateRanges;if(s.bindBuffer(l,o),h.length===0)s.bufferSubData(l,0,u);else{h.sort((f,b)=>f.start-b.start);let d=0;for(let f=1;f<h.length;f++){const b=h[d],v=h[f];v.start<=b.start+b.count+1?b.count=Math.max(b.count,v.start+v.count-b.start):(++d,h[d]=v)}h.length=d+1;for(let f=0,b=h.length;f<b;f++){const v=h[f];s.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(s.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}class Un extends cn{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,u=c+1,h=e/o,d=t/c,f=[],b=[],v=[],m=[];for(let p=0;p<u;p++){const x=p*d-a;for(let M=0;M<l;M++){const _=M*h-r;b.push(_,-x,0),v.push(0,0,1),m.push(M/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let x=0;x<o;x++){const M=x+l*p,_=x+l*(p+1),D=x+1+l*(p+1),T=x+1+l*p;f.push(M,_,T),f.push(_,D,T)}this.setIndex(f),this.setAttribute("position",new zt(b,3)),this.setAttribute("normal",new zt(v,3)),this.setAttribute("uv",new zt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Un(e.width,e.height,e.widthSegments,e.heightSegments)}}var id=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sd=`#ifdef USE_ALPHAHASH
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
#endif`,rd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ad=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,od=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ld=`#ifdef USE_AOMAP
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
#endif`,hd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ud=`#ifdef USE_BATCHING
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
#endif`,dd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,md=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,gd=`#ifdef USE_IRIDESCENCE
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
#endif`,bd=`#ifdef USE_BUMPMAP
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
#endif`,_d=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,vd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Md=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Sd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ed=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,wd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ad=`#define PI 3.141592653589793
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
} // validated`,Td=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Rd=`vec3 transformedNormal = objectNormal;
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
#endif`,Cd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Pd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ld=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Id=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Dd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Fd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Nd=`#ifdef USE_ENVMAP
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
#endif`,Ud=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Od=`#ifdef USE_ENVMAP
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
#endif`,Bd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,kd=`#ifdef USE_ENVMAP
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
#endif`,zd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Vd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wd=`#ifdef USE_GRADIENTMAP
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
}`,Xd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Kd=`uniform bool receiveShadow;
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
#endif`,Yd=`#ifdef USE_ENVMAP
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
#endif`,Jd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$d=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ef=`PhysicalMaterial material;
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
#endif`,tf=`struct PhysicalMaterial {
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
}`,nf=`
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
#endif`,sf=`#if defined( RE_IndirectDiffuse )
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
#endif`,rf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,af=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,of=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,uf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,df=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ff=`#if defined( USE_POINTS_UV )
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
#endif`,pf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_f=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vf=`#ifdef USE_MORPHTARGETS
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
#endif`,xf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Mf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Sf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ef=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Af=`#ifdef USE_NORMALMAP
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
#endif`,Tf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Rf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Cf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Pf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Lf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,If=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Df=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ff=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Nf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Uf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Of=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Bf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,kf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Gf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Hf=`float getShadowMask() {
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
}`,Vf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Wf=`#ifdef USE_SKINNING
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
#endif`,Xf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jf=`#ifdef USE_SKINNING
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
#endif`,qf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Kf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zf=`#ifdef USE_TRANSMISSION
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
#endif`,Qf=`#ifdef USE_TRANSMISSION
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
#endif`,$f=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ep=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,np=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ip=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sp=`uniform sampler2D t2D;
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
}`,rp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ap=`#ifdef ENVMAP_TYPE_CUBE
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
}`,op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lp=`#include <common>
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
}`,hp=`#if DEPTH_PACKING == 3200
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
}`,up=`#define DISTANCE
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
}`,dp=`#define DISTANCE
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
}`,fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mp=`uniform float scale;
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
}`,gp=`uniform vec3 diffuse;
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
}`,bp=`#include <common>
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
}`,_p=`uniform vec3 diffuse;
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
}`,vp=`#define LAMBERT
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
}`,xp=`#define LAMBERT
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
}`,yp=`#define MATCAP
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
}`,Mp=`#define MATCAP
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
}`,Sp=`#define NORMAL
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
}`,Ep=`#define NORMAL
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
}`,wp=`#define PHONG
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
}`,Ap=`#define PHONG
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
}`,Tp=`#define STANDARD
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
}`,Rp=`#define STANDARD
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
}`,Cp=`#define TOON
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
}`,Pp=`#define TOON
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
}`,Lp=`uniform float size;
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
}`,Ip=`uniform vec3 diffuse;
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
}`,Dp=`#include <common>
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
}`,Fp=`uniform vec3 color;
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
}`,Np=`uniform float rotation;
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
}`,Up=`uniform vec3 diffuse;
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
}`,Dt={alphahash_fragment:id,alphahash_pars_fragment:sd,alphamap_fragment:rd,alphamap_pars_fragment:ad,alphatest_fragment:od,alphatest_pars_fragment:cd,aomap_fragment:ld,aomap_pars_fragment:hd,batching_pars_vertex:ud,batching_vertex:dd,begin_vertex:fd,beginnormal_vertex:pd,bsdfs:md,iridescence_fragment:gd,bumpmap_pars_fragment:bd,clipping_planes_fragment:_d,clipping_planes_pars_fragment:vd,clipping_planes_pars_vertex:xd,clipping_planes_vertex:yd,color_fragment:Md,color_pars_fragment:Sd,color_pars_vertex:Ed,color_vertex:wd,common:Ad,cube_uv_reflection_fragment:Td,defaultnormal_vertex:Rd,displacementmap_pars_vertex:Cd,displacementmap_vertex:Pd,emissivemap_fragment:Ld,emissivemap_pars_fragment:Id,colorspace_fragment:Dd,colorspace_pars_fragment:Fd,envmap_fragment:Nd,envmap_common_pars_fragment:Ud,envmap_pars_fragment:Od,envmap_pars_vertex:Bd,envmap_physical_pars_fragment:Yd,envmap_vertex:kd,fog_vertex:zd,fog_pars_vertex:Gd,fog_fragment:Hd,fog_pars_fragment:Vd,gradientmap_pars_fragment:Wd,lightmap_pars_fragment:Xd,lights_lambert_fragment:jd,lights_lambert_pars_fragment:qd,lights_pars_begin:Kd,lights_toon_fragment:Jd,lights_toon_pars_fragment:Zd,lights_phong_fragment:Qd,lights_phong_pars_fragment:$d,lights_physical_fragment:ef,lights_physical_pars_fragment:tf,lights_fragment_begin:nf,lights_fragment_maps:sf,lights_fragment_end:rf,logdepthbuf_fragment:af,logdepthbuf_pars_fragment:of,logdepthbuf_pars_vertex:cf,logdepthbuf_vertex:lf,map_fragment:hf,map_pars_fragment:uf,map_particle_fragment:df,map_particle_pars_fragment:ff,metalnessmap_fragment:pf,metalnessmap_pars_fragment:mf,morphinstance_vertex:gf,morphcolor_vertex:bf,morphnormal_vertex:_f,morphtarget_pars_vertex:vf,morphtarget_vertex:xf,normal_fragment_begin:yf,normal_fragment_maps:Mf,normal_pars_fragment:Sf,normal_pars_vertex:Ef,normal_vertex:wf,normalmap_pars_fragment:Af,clearcoat_normal_fragment_begin:Tf,clearcoat_normal_fragment_maps:Rf,clearcoat_pars_fragment:Cf,iridescence_pars_fragment:Pf,opaque_fragment:Lf,packing:If,premultiplied_alpha_fragment:Df,project_vertex:Ff,dithering_fragment:Nf,dithering_pars_fragment:Uf,roughnessmap_fragment:Of,roughnessmap_pars_fragment:Bf,shadowmap_pars_fragment:kf,shadowmap_pars_vertex:zf,shadowmap_vertex:Gf,shadowmask_pars_fragment:Hf,skinbase_vertex:Vf,skinning_pars_vertex:Wf,skinning_vertex:Xf,skinnormal_vertex:jf,specularmap_fragment:qf,specularmap_pars_fragment:Kf,tonemapping_fragment:Yf,tonemapping_pars_fragment:Jf,transmission_fragment:Zf,transmission_pars_fragment:Qf,uv_pars_fragment:$f,uv_pars_vertex:ep,uv_vertex:tp,worldpos_vertex:np,background_vert:ip,background_frag:sp,backgroundCube_vert:rp,backgroundCube_frag:ap,cube_vert:op,cube_frag:cp,depth_vert:lp,depth_frag:hp,distanceRGBA_vert:up,distanceRGBA_frag:dp,equirect_vert:fp,equirect_frag:pp,linedashed_vert:mp,linedashed_frag:gp,meshbasic_vert:bp,meshbasic_frag:_p,meshlambert_vert:vp,meshlambert_frag:xp,meshmatcap_vert:yp,meshmatcap_frag:Mp,meshnormal_vert:Sp,meshnormal_frag:Ep,meshphong_vert:wp,meshphong_frag:Ap,meshphysical_vert:Tp,meshphysical_frag:Rp,meshtoon_vert:Cp,meshtoon_frag:Pp,points_vert:Lp,points_frag:Ip,shadow_vert:Dp,shadow_frag:Fp,sprite_vert:Np,sprite_frag:Up},je={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Lt}},envmap:{envMap:{value:null},envMapRotation:{value:new Lt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Lt},normalScale:{value:new He(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0},uvTransform:{value:new Lt}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new He(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}}},Ii={basic:{uniforms:Yn([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.fog]),vertexShader:Dt.meshbasic_vert,fragmentShader:Dt.meshbasic_frag},lambert:{uniforms:Yn([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.fog,je.lights,{emissive:{value:new nt(0)}}]),vertexShader:Dt.meshlambert_vert,fragmentShader:Dt.meshlambert_frag},phong:{uniforms:Yn([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.fog,je.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30}}]),vertexShader:Dt.meshphong_vert,fragmentShader:Dt.meshphong_frag},standard:{uniforms:Yn([je.common,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.roughnessmap,je.metalnessmap,je.fog,je.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Dt.meshphysical_vert,fragmentShader:Dt.meshphysical_frag},toon:{uniforms:Yn([je.common,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.gradientmap,je.fog,je.lights,{emissive:{value:new nt(0)}}]),vertexShader:Dt.meshtoon_vert,fragmentShader:Dt.meshtoon_frag},matcap:{uniforms:Yn([je.common,je.bumpmap,je.normalmap,je.displacementmap,je.fog,{matcap:{value:null}}]),vertexShader:Dt.meshmatcap_vert,fragmentShader:Dt.meshmatcap_frag},points:{uniforms:Yn([je.points,je.fog]),vertexShader:Dt.points_vert,fragmentShader:Dt.points_frag},dashed:{uniforms:Yn([je.common,je.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Dt.linedashed_vert,fragmentShader:Dt.linedashed_frag},depth:{uniforms:Yn([je.common,je.displacementmap]),vertexShader:Dt.depth_vert,fragmentShader:Dt.depth_frag},normal:{uniforms:Yn([je.common,je.bumpmap,je.normalmap,je.displacementmap,{opacity:{value:1}}]),vertexShader:Dt.meshnormal_vert,fragmentShader:Dt.meshnormal_frag},sprite:{uniforms:Yn([je.sprite,je.fog]),vertexShader:Dt.sprite_vert,fragmentShader:Dt.sprite_frag},background:{uniforms:{uvTransform:{value:new Lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Dt.background_vert,fragmentShader:Dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Lt}},vertexShader:Dt.backgroundCube_vert,fragmentShader:Dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Dt.cube_vert,fragmentShader:Dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Dt.equirect_vert,fragmentShader:Dt.equirect_frag},distanceRGBA:{uniforms:Yn([je.common,je.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Dt.distanceRGBA_vert,fragmentShader:Dt.distanceRGBA_frag},shadow:{uniforms:Yn([je.lights,je.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:Dt.shadow_vert,fragmentShader:Dt.shadow_frag}};Ii.physical={uniforms:Yn([Ii.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Lt},clearcoatNormalScale:{value:new He(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Lt},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Lt},transmissionSamplerSize:{value:new He},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Lt},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Lt},anisotropyVector:{value:new He},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Lt}}]),vertexShader:Dt.meshphysical_vert,fragmentShader:Dt.meshphysical_frag};const oa={r:0,b:0,g:0},Ss=new fi,Op=new tt;function Bp(s,e,t,n,i,r,a){const o=new nt(0);let c=r===!0?0:1,l,u,h=null,d=0,f=null;function b(x){let M=x.isScene===!0?x.background:null;return M&&M.isTexture&&(M=(x.backgroundBlurriness>0?t:e).get(M)),M}function v(x){let M=!1;const _=b(x);_===null?p(o,c):_&&_.isColor&&(p(_,1),M=!0);const D=s.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,a):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(x,M){const _=b(M);_&&(_.isCubeTexture||_.mapping===306)?(u===void 0&&(u=new Ge(new on(1,1,1),new bs({name:"BackgroundCubeMaterial",uniforms:sr(Ii.backgroundCube.uniforms),vertexShader:Ii.backgroundCube.vertexShader,fragmentShader:Ii.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(D,T,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Ss.copy(M.backgroundRotation),Ss.x*=-1,Ss.y*=-1,Ss.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ss.y*=-1,Ss.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Op.makeRotationFromEuler(Ss)),u.material.toneMapped=Jt.getTransfer(_.colorSpace)!==an,(h!==_||d!==_.version||f!==s.toneMapping)&&(u.material.needsUpdate=!0,h=_,d=_.version,f=s.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Ge(new Un(2,2),new bs({name:"BackgroundMaterial",uniforms:sr(Ii.background.uniforms),vertexShader:Ii.background.vertexShader,fragmentShader:Ii.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Jt.getTransfer(_.colorSpace)!==an,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,h=_,d=_.version,f=s.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,M){x.getRGB(oa,xh(s)),n.buffers.color.setClear(oa.r,oa.g,oa.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(x,M=1){o.set(x),c=M,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,p(o,c)},render:v,addToRenderList:m}}function kp(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(S,I,z,B,Y){let re=!1;const F=h(B,z,I);r!==F&&(r=F,l(r.object)),re=f(S,B,z,Y),re&&b(S,B,z,Y),Y!==null&&e.update(Y,s.ELEMENT_ARRAY_BUFFER),(re||a)&&(a=!1,_(S,I,z,B),Y!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function c(){return s.createVertexArray()}function l(S){return s.bindVertexArray(S)}function u(S){return s.deleteVertexArray(S)}function h(S,I,z){const B=z.wireframe===!0;let Y=n[S.id];Y===void 0&&(Y={},n[S.id]=Y);let re=Y[I.id];re===void 0&&(re={},Y[I.id]=re);let F=re[B];return F===void 0&&(F=d(c()),re[B]=F),F}function d(S){const I=[],z=[],B=[];for(let Y=0;Y<t;Y++)I[Y]=0,z[Y]=0,B[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:z,attributeDivisors:B,object:S,attributes:{},index:null}}function f(S,I,z,B){const Y=r.attributes,re=I.attributes;let F=0;const q=z.getAttributes();for(const G in q)if(q[G].location>=0){const J=Y[G];let $=re[G];if($===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&($=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&($=S.instanceColor)),J===void 0||J.attribute!==$||$&&J.data!==$.data)return!0;F++}return r.attributesNum!==F||r.index!==B}function b(S,I,z,B){const Y={},re=I.attributes;let F=0;const q=z.getAttributes();for(const G in q)if(q[G].location>=0){let J=re[G];J===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(J=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(J=S.instanceColor));const $={};$.attribute=J,J&&J.data&&($.data=J.data),Y[G]=$,F++}r.attributes=Y,r.attributesNum=F,r.index=B}function v(){const S=r.newAttributes;for(let I=0,z=S.length;I<z;I++)S[I]=0}function m(S){p(S,0)}function p(S,I){const z=r.newAttributes,B=r.enabledAttributes,Y=r.attributeDivisors;z[S]=1,B[S]===0&&(s.enableVertexAttribArray(S),B[S]=1),Y[S]!==I&&(s.vertexAttribDivisor(S,I),Y[S]=I)}function x(){const S=r.newAttributes,I=r.enabledAttributes;for(let z=0,B=I.length;z<B;z++)I[z]!==S[z]&&(s.disableVertexAttribArray(z),I[z]=0)}function M(S,I,z,B,Y,re,F){F===!0?s.vertexAttribIPointer(S,I,z,Y,re):s.vertexAttribPointer(S,I,z,B,Y,re)}function _(S,I,z,B){v();const Y=B.attributes,re=z.getAttributes(),F=I.defaultAttributeValues;for(const q in re){const G=re[q];if(G.location>=0){let he=Y[q];if(he===void 0&&(q==="instanceMatrix"&&S.instanceMatrix&&(he=S.instanceMatrix),q==="instanceColor"&&S.instanceColor&&(he=S.instanceColor)),he!==void 0){const J=he.normalized,$=he.itemSize,ve=e.get(he);if(ve===void 0)continue;const Le=ve.buffer,ie=ve.type,pe=ve.bytesPerElement,De=ie===s.INT||ie===s.UNSIGNED_INT||he.gpuType===1013;if(he.isInterleavedBufferAttribute){const _e=he.data,st=_e.stride,it=he.offset;if(_e.isInstancedInterleavedBuffer){for(let ht=0;ht<G.locationSize;ht++)p(G.location+ht,_e.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let ht=0;ht<G.locationSize;ht++)m(G.location+ht);s.bindBuffer(s.ARRAY_BUFFER,Le);for(let ht=0;ht<G.locationSize;ht++)M(G.location+ht,$/G.locationSize,ie,J,st*pe,(it+$/G.locationSize*ht)*pe,De)}else{if(he.isInstancedBufferAttribute){for(let _e=0;_e<G.locationSize;_e++)p(G.location+_e,he.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let _e=0;_e<G.locationSize;_e++)m(G.location+_e);s.bindBuffer(s.ARRAY_BUFFER,Le);for(let _e=0;_e<G.locationSize;_e++)M(G.location+_e,$/G.locationSize,ie,J,$*pe,$/G.locationSize*_e*pe,De)}}else if(F!==void 0){const J=F[q];if(J!==void 0)switch(J.length){case 2:s.vertexAttrib2fv(G.location,J);break;case 3:s.vertexAttrib3fv(G.location,J);break;case 4:s.vertexAttrib4fv(G.location,J);break;default:s.vertexAttrib1fv(G.location,J)}}}}x()}function D(){A();for(const S in n){const I=n[S];for(const z in I){const B=I[z];for(const Y in B)u(B[Y].object),delete B[Y];delete I[z]}delete n[S]}}function T(S){if(n[S.id]===void 0)return;const I=n[S.id];for(const z in I){const B=I[z];for(const Y in B)u(B[Y].object),delete B[Y];delete I[z]}delete n[S.id]}function L(S){for(const I in n){const z=n[I];if(z[S.id]===void 0)continue;const B=z[S.id];for(const Y in B)u(B[Y].object),delete B[Y];delete z[S.id]}}function A(){y(),a=!0,r!==i&&(r=i,l(r.object))}function y(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:A,resetDefaultState:y,dispose:D,releaseStatesOfGeometry:T,releaseStatesOfProgram:L,initAttributes:v,enableAttribute:m,disableUnusedAttributes:x}}function zp(s,e,t){let n;function i(l){n=l}function r(l,u){s.drawArrays(n,l,u),t.update(u,n,1)}function a(l,u,h){h!==0&&(s.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function o(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let f=0;for(let b=0;b<h;b++)f+=u[b];t.update(f,n,1)}function c(l,u,h,d){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let b=0;b<l.length;b++)a(l[b],u[b],d[b]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,u,0,d,0,h);let b=0;for(let v=0;v<h;v++)b+=u[v]*d[v];t.update(b,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Gp(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(L){return!(L!==1023&&n.convert(L)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const A=L===1016&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==1009&&n.convert(L)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==1015&&!A)}function c(L){if(L==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),b=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),D=b>0,T=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:b,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:_,vertexTextures:D,maxSamples:T}}function Hp(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new Qi,o=new Lt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||i;return i=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const b=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,p=s.get(h);if(!i||b===null||b.length===0||r&&!m)r?u(null):l();else{const x=r?0:n,M=x*4;let _=p.clippingState||null;c.value=_,_=u(b,d,M,f);for(let D=0;D!==M;++D)_[D]=t[D];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,b){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=c.value,b!==!0||m===null){const p=f+v*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,_=f;M!==v;++M,_+=4)a.copy(h[M]).applyMatrix4(x,o),a.normal.toArray(m,_),m[_+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function Vp(s){let e=new WeakMap;function t(a,o){return o===303?a.mapping=301:o===304&&(a.mapping=302),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===303||o===304)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new $u(c.height);return l.fromEquirectangularTexture(s,a),e.set(a,l),a.addEventListener("dispose",i),t(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Ha extends yh{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const $s=4,qc=[.125,.215,.35,.446,.526,.582],Cs=20,_o=new Ha,Kc=new nt;let vo=null,xo=0,yo=0,Mo=!1;const Rs=(1+Math.sqrt(5))/2,Xs=1/Rs,Yc=[new N(-Rs,Xs,0),new N(Rs,Xs,0),new N(-Xs,0,Rs),new N(Xs,0,Rs),new N(0,Rs,-Xs),new N(0,Rs,Xs),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class Jc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){vo=this._renderer.getRenderTarget(),xo=this._renderer.getActiveCubeFace(),yo=this._renderer.getActiveMipmapLevel(),Mo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$c(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(vo,xo,yo),this._renderer.xr.enabled=Mo,e.scissorTest=!1,ca(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),vo=this._renderer.getRenderTarget(),xo=this._renderer.getActiveCubeFace(),yo=this._renderer.getActiveMipmapLevel(),Mo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:Zn,depthBuffer:!1},i=Zc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zc(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Wp(r)),this._blurMaterial=Xp(r,e,t)}return i}_compileMaterial(e){const t=new Ge(this._lodPlanes[0],e);this._renderer.compile(t,_o)}_sceneToCubeUV(e,t,n,i){const o=new ti(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(Kc),u.toneMapping=0,u.autoClear=!1;const f=new fn({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),b=new Ge(new on,f);let v=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,v=!0):(f.color.copy(Kc),v=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):x===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));const M=this._cubeSize;ca(i,x*M,p>2?M:0,M,M),u.setRenderTarget(i),v&&u.render(b,o),u.render(e,o)}b.geometry.dispose(),b.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===301||e.mapping===302;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=$c()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qc());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new Ge(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;ca(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,_o)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Yc[(i-r-1)%Yc.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Ge(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,b=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Cs-1),v=r/b,m=isFinite(r)?1+Math.floor(u*v):Cs;m>Cs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Cs}`);const p=[];let x=0;for(let L=0;L<Cs;++L){const A=L/v,y=Math.exp(-A*A/2);p.push(y),L===0?x+=y:L<m&&(x+=2*y)}for(let L=0;L<p.length;L++)p[L]=p[L]/x;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=b,d.mipInt.value=M-n;const _=this._sizeLods[i],D=3*_*(i>M-$s?i-M+$s:0),T=4*(this._cubeSize-_);ca(t,D,T,3*_,2*_),c.setRenderTarget(t),c.render(h,_o)}}function Wp(s){const e=[],t=[],n=[];let i=s;const r=s-$s+1+qc.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let c=1/o;a>s-$s?c=qc[a-s+$s-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,b=6,v=3,m=2,p=1,x=new Float32Array(v*b*f),M=new Float32Array(m*b*f),_=new Float32Array(p*b*f);for(let T=0;T<f;T++){const L=T%3*2/3-1,A=T>2?0:-1,y=[L,A,0,L+2/3,A,0,L+2/3,A+1,0,L,A,0,L+2/3,A+1,0,L,A+1,0];x.set(y,v*b*T),M.set(d,m*b*T);const S=[T,T,T,T,T,T];_.set(S,p*b*T)}const D=new cn;D.setAttribute("position",new $t(x,v)),D.setAttribute("uv",new $t(M,m)),D.setAttribute("faceIndex",new $t(_,p)),e.push(D),i>$s&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Zc(s,e,t){const n=new gs(s,e,t);return n.texture.mapping=306,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ca(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Xp(s,e,t){const n=new Float32Array(Cs),i=new N(0,1,0);return new bs({name:"SphericalGaussianBlur",defines:{n:Cs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:hc(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Qc(){return new bs({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:hc(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function $c(){return new bs({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:hc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function hc(){return`

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
	`}function jp(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===303||c===304,u=c===301||c===302;if(l||u){let h=e.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Jc(s)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return l&&f&&f.height>0||u&&f&&i(f)?(t===null&&(t=new Jc(s)),h=l?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function i(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function qp(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Lr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Kp(s,e,t,n){const i={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const b in d.attributes)e.remove(d.attributes[b]);for(const b in d.morphAttributes){const v=d.morphAttributes[b];for(let m=0,p=v.length;m<p;m++)e.remove(v[m])}d.removeEventListener("dispose",a),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function c(h){const d=h.attributes;for(const b in d)e.update(d[b],s.ARRAY_BUFFER);const f=h.morphAttributes;for(const b in f){const v=f[b];for(let m=0,p=v.length;m<p;m++)e.update(v[m],s.ARRAY_BUFFER)}}function l(h){const d=[],f=h.index,b=h.attributes.position;let v=0;if(f!==null){const x=f.array;v=f.version;for(let M=0,_=x.length;M<_;M+=3){const D=x[M+0],T=x[M+1],L=x[M+2];d.push(D,T,T,L,L,D)}}else if(b!==void 0){const x=b.array;v=b.version;for(let M=0,_=x.length/3-1;M<_;M+=3){const D=M+0,T=M+1,L=M+2;d.push(D,T,T,L,L,D)}}else return;const m=new(fh(d)?vh:_h)(d,1);m.version=v;const p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function Yp(s,e,t){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){s.drawElements(n,f,r,d*a),t.update(f,n,1)}function l(d,f,b){b!==0&&(s.drawElementsInstanced(n,f,r,d*a,b),t.update(f,n,b))}function u(d,f,b){if(b===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,b);let m=0;for(let p=0;p<b;p++)m+=f[p];t.update(m,n,1)}function h(d,f,b,v){if(b===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,v,0,b);let p=0;for(let x=0;x<b;x++)p+=f[x]*v[x];t.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Jp(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Zp(s,e,t){const n=new WeakMap,i=new Zt;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let y=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",y)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,b=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let M=0;f===!0&&(M=1),b===!0&&(M=2),v===!0&&(M=3);let _=o.attributes.position.count*M,D=1;_>e.maxTextureSize&&(D=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);const T=new Float32Array(_*D*4*h),L=new mh(T,_,D,h);L.type=1015,L.needsUpdate=!0;const A=M*4;for(let S=0;S<h;S++){const I=m[S],z=p[S],B=x[S],Y=_*D*4*S;for(let re=0;re<I.count;re++){const F=re*A;f===!0&&(i.fromBufferAttribute(I,re),T[Y+F+0]=i.x,T[Y+F+1]=i.y,T[Y+F+2]=i.z,T[Y+F+3]=0),b===!0&&(i.fromBufferAttribute(z,re),T[Y+F+4]=i.x,T[Y+F+5]=i.y,T[Y+F+6]=i.z,T[Y+F+7]=0),v===!0&&(i.fromBufferAttribute(B,re),T[Y+F+8]=i.x,T[Y+F+9]=i.y,T[Y+F+10]=i.z,T[Y+F+11]=B.itemSize===4?i.w:1)}}d={count:h,texture:L,size:new He(_,D)},n.set(o,d),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<l.length;v++)f+=l[v];const b=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(s,"morphTargetBaseInfluence",b),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function Qp(s,e,t,n){let i=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(i.get(h)!==l&&(e.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return h}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}class Eh extends wn{constructor(e,t,n,i,r,a,o,c,l,u=1026){if(u!==1026&&u!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===1026&&(n=1014),n===void 0&&u===1027&&(n=1020),super(null,i,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:1003,this.minFilter=c!==void 0?c:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const wh=new wn,el=new Eh(1,1),Ah=new mh,Th=new Ou,Rh=new Mh,tl=[],nl=[],il=new Float32Array(16),sl=new Float32Array(9),rl=new Float32Array(4);function lr(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=tl[i];if(r===void 0&&(r=new Float32Array(i),tl[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Rn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Cn(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Va(s,e){let t=nl[e];t===void 0&&(t=new Int32Array(e),nl[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function $p(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function em(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rn(t,e))return;s.uniform2fv(this.addr,e),Cn(t,e)}}function tm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rn(t,e))return;s.uniform3fv(this.addr,e),Cn(t,e)}}function nm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rn(t,e))return;s.uniform4fv(this.addr,e),Cn(t,e)}}function im(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Cn(t,e)}else{if(Rn(t,n))return;rl.set(n),s.uniformMatrix2fv(this.addr,!1,rl),Cn(t,n)}}function sm(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Cn(t,e)}else{if(Rn(t,n))return;sl.set(n),s.uniformMatrix3fv(this.addr,!1,sl),Cn(t,n)}}function rm(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Cn(t,e)}else{if(Rn(t,n))return;il.set(n),s.uniformMatrix4fv(this.addr,!1,il),Cn(t,n)}}function am(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function om(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rn(t,e))return;s.uniform2iv(this.addr,e),Cn(t,e)}}function cm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rn(t,e))return;s.uniform3iv(this.addr,e),Cn(t,e)}}function lm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rn(t,e))return;s.uniform4iv(this.addr,e),Cn(t,e)}}function hm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function um(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rn(t,e))return;s.uniform2uiv(this.addr,e),Cn(t,e)}}function dm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rn(t,e))return;s.uniform3uiv(this.addr,e),Cn(t,e)}}function fm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rn(t,e))return;s.uniform4uiv(this.addr,e),Cn(t,e)}}function pm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(el.compareFunction=515,r=el):r=wh,t.setTexture2D(e||r,i)}function mm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Th,i)}function gm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Rh,i)}function bm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Ah,i)}function _m(s){switch(s){case 5126:return $p;case 35664:return em;case 35665:return tm;case 35666:return nm;case 35674:return im;case 35675:return sm;case 35676:return rm;case 5124:case 35670:return am;case 35667:case 35671:return om;case 35668:case 35672:return cm;case 35669:case 35673:return lm;case 5125:return hm;case 36294:return um;case 36295:return dm;case 36296:return fm;case 35678:case 36198:case 36298:case 36306:case 35682:return pm;case 35679:case 36299:case 36307:return mm;case 35680:case 36300:case 36308:case 36293:return gm;case 36289:case 36303:case 36311:case 36292:return bm}}function vm(s,e){s.uniform1fv(this.addr,e)}function xm(s,e){const t=lr(e,this.size,2);s.uniform2fv(this.addr,t)}function ym(s,e){const t=lr(e,this.size,3);s.uniform3fv(this.addr,t)}function Mm(s,e){const t=lr(e,this.size,4);s.uniform4fv(this.addr,t)}function Sm(s,e){const t=lr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Em(s,e){const t=lr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function wm(s,e){const t=lr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Am(s,e){s.uniform1iv(this.addr,e)}function Tm(s,e){s.uniform2iv(this.addr,e)}function Rm(s,e){s.uniform3iv(this.addr,e)}function Cm(s,e){s.uniform4iv(this.addr,e)}function Pm(s,e){s.uniform1uiv(this.addr,e)}function Lm(s,e){s.uniform2uiv(this.addr,e)}function Im(s,e){s.uniform3uiv(this.addr,e)}function Dm(s,e){s.uniform4uiv(this.addr,e)}function Fm(s,e,t){const n=this.cache,i=e.length,r=Va(t,i);Rn(n,r)||(s.uniform1iv(this.addr,r),Cn(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||wh,r[a])}function Nm(s,e,t){const n=this.cache,i=e.length,r=Va(t,i);Rn(n,r)||(s.uniform1iv(this.addr,r),Cn(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Th,r[a])}function Um(s,e,t){const n=this.cache,i=e.length,r=Va(t,i);Rn(n,r)||(s.uniform1iv(this.addr,r),Cn(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Rh,r[a])}function Om(s,e,t){const n=this.cache,i=e.length,r=Va(t,i);Rn(n,r)||(s.uniform1iv(this.addr,r),Cn(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Ah,r[a])}function Bm(s){switch(s){case 5126:return vm;case 35664:return xm;case 35665:return ym;case 35666:return Mm;case 35674:return Sm;case 35675:return Em;case 35676:return wm;case 5124:case 35670:return Am;case 35667:case 35671:return Tm;case 35668:case 35672:return Rm;case 35669:case 35673:return Cm;case 5125:return Pm;case 36294:return Lm;case 36295:return Im;case 36296:return Dm;case 35678:case 36198:case 36298:case 36306:case 35682:return Fm;case 35679:case 36299:case 36307:return Nm;case 35680:case 36300:case 36308:case 36293:return Um;case 36289:case 36303:case 36311:case 36292:return Om}}class km{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=_m(t.type)}}class zm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Bm(t.type)}}class Gm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const So=/(\w+)(\])?(\[|\.)?/g;function al(s,e){s.seq.push(e),s.map[e.id]=e}function Hm(s,e,t){const n=s.name,i=n.length;for(So.lastIndex=0;;){const r=So.exec(n),a=So.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){al(t,l===void 0?new km(o,s,e):new zm(o,s,e));break}else{let h=t.map[o];h===void 0&&(h=new Gm(o),al(t,h)),t=h}}}class Pa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);Hm(r,a,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function ol(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const Vm=37297;let Wm=0;function Xm(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const cl=new Lt;function jm(s){Jt._getMatrix(cl,Jt.workingColorSpace,s);const e=`mat3( ${cl.elements.map(t=>t.toFixed(4))} )`;switch(Jt.getTransfer(s)){case za:return[e,"LinearTransferOETF"];case an:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function ll(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+Xm(s.getShaderSource(e),a)}else return i}function qm(s,e){const t=jm(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Km(s,e){let t;switch(e){case 1:t="Linear";break;case 2:t="Reinhard";break;case 3:t="Cineon";break;case 4:t="ACESFilmic";break;case 6:t="AgX";break;case 7:t="Neutral";break;case 5:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const la=new N;function Ym(){Jt.getLuminanceCoefficients(la);const s=la.x.toFixed(4),e=la.y.toFixed(4),t=la.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Jm(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ir).join(`
`)}function Zm(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Qm(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Ir(s){return s!==""}function hl(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ul(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const $m=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ko(s){return s.replace($m,tg)}const eg=new Map;function tg(s,e){let t=Dt[e];if(t===void 0){const n=eg.get(e);if(n!==void 0)t=Dt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ko(t)}const ng=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dl(s){return s.replace(ng,ig)}function ig(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function fl(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function sg(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===1?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===2?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===3&&(e="SHADOWMAP_TYPE_VSM"),e}function rg(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case 301:case 302:e="ENVMAP_TYPE_CUBE";break;case 306:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ag(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case 302:e="ENVMAP_MODE_REFRACTION";break}return e}function og(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case 0:e="ENVMAP_BLENDING_MULTIPLY";break;case 1:e="ENVMAP_BLENDING_MIX";break;case 2:e="ENVMAP_BLENDING_ADD";break}return e}function cg(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function lg(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=sg(t),l=rg(t),u=ag(t),h=og(t),d=cg(t),f=Jm(t),b=Zm(r),v=i.createProgram();let m,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(Ir).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(Ir).join(`
`),p.length>0&&(p+=`
`)):(m=[fl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ir).join(`
`),p=[fl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?Dt.tonemapping_pars_fragment:"",t.toneMapping!==0?Km("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Dt.colorspace_pars_fragment,qm("linearToOutputTexel",t.outputColorSpace),Ym(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ir).join(`
`)),a=Ko(a),a=hl(a,t),a=ul(a,t),o=Ko(o),o=hl(o,t),o=ul(o,t),a=dl(a),o=dl(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===wc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===wc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=x+m+a,_=x+p+o,D=ol(i,i.VERTEX_SHADER,M),T=ol(i,i.FRAGMENT_SHADER,_);i.attachShader(v,D),i.attachShader(v,T),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function L(I){if(s.debug.checkShaderErrors){const z=i.getProgramInfoLog(v).trim(),B=i.getShaderInfoLog(D).trim(),Y=i.getShaderInfoLog(T).trim();let re=!0,F=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(re=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,D,T);else{const q=ll(i,D,"vertex"),G=ll(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+z+`
`+q+`
`+G)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(B===""||Y==="")&&(F=!1);F&&(I.diagnostics={runnable:re,programLog:z,vertexShader:{log:B,prefix:m},fragmentShader:{log:Y,prefix:p}})}i.deleteShader(D),i.deleteShader(T),A=new Pa(i,v),y=Qm(i,v)}let A;this.getUniforms=function(){return A===void 0&&L(this),A};let y;this.getAttributes=function(){return y===void 0&&L(this),y};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(v,Vm)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Wm++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=D,this.fragmentShader=T,this}let hg=0;class ug{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new dg(e),t.set(e,n)),n}}class dg{constructor(e){this.id=hg++,this.code=e,this.usedTimes=0}}function fg(s,e,t,n,i,r,a){const o=new gh,c=new ug,l=new Set,u=[],h=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return l.add(y),y===0?"uv":`uv${y}`}function m(y,S,I,z,B){const Y=z.fog,re=B.geometry,F=y.isMeshStandardMaterial?z.environment:null,q=(y.isMeshStandardMaterial?t:e).get(y.envMap||F),G=q&&q.mapping===306?q.image.height:null,he=b[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const J=re.morphAttributes.position||re.morphAttributes.normal||re.morphAttributes.color,$=J!==void 0?J.length:0;let ve=0;re.morphAttributes.position!==void 0&&(ve=1),re.morphAttributes.normal!==void 0&&(ve=2),re.morphAttributes.color!==void 0&&(ve=3);let Le,ie,pe,De;if(he){const It=Ii[he];Le=It.vertexShader,ie=It.fragmentShader}else Le=y.vertexShader,ie=y.fragmentShader,c.update(y),pe=c.getVertexShaderID(y),De=c.getFragmentShaderID(y);const _e=s.getRenderTarget(),st=s.state.buffers.depth.getReversed(),it=B.isInstancedMesh===!0,ht=B.isBatchedMesh===!0,dt=!!y.map,ft=!!y.matcap,mt=!!q,W=!!y.aoMap,Wt=!!y.lightMap,_t=!!y.bumpMap,at=!!y.normalMap,rt=!!y.displacementMap,qt=!!y.emissiveMap,le=!!y.metalnessMap,C=!!y.roughnessMap,E=y.anisotropy>0,k=y.clearcoat>0,ae=y.dispersion>0,de=y.iridescence>0,oe=y.sheen>0,Fe=y.transmission>0,xe=E&&!!y.anisotropyMap,Ie=k&&!!y.clearcoatMap,vt=k&&!!y.clearcoatNormalMap,Se=k&&!!y.clearcoatRoughnessMap,Be=de&&!!y.iridescenceMap,$e=de&&!!y.iridescenceThicknessMap,ot=oe&&!!y.sheenColorMap,qe=oe&&!!y.sheenRoughnessMap,Rt=!!y.specularMap,gt=!!y.specularColorMap,Ft=!!y.specularIntensityMap,X=Fe&&!!y.transmissionMap,Pe=Fe&&!!y.thicknessMap,ue=!!y.gradientMap,be=!!y.alphaMap,Ue=y.alphaTest>0,ke=!!y.alphaHash,We=!!y.extensions;let Xt=0;y.toneMapped&&(_e===null||_e.isXRRenderTarget===!0)&&(Xt=s.toneMapping);const un={shaderID:he,shaderType:y.type,shaderName:y.name,vertexShader:Le,fragmentShader:ie,defines:y.defines,customVertexShaderID:pe,customFragmentShaderID:De,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:ht,batchingColor:ht&&B._colorsTexture!==null,instancing:it,instancingColor:it&&B.instanceColor!==null,instancingMorph:it&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:_e===null?s.outputColorSpace:_e.isXRRenderTarget===!0?_e.texture.colorSpace:Zn,alphaToCoverage:!!y.alphaToCoverage,map:dt,matcap:ft,envMap:mt,envMapMode:mt&&q.mapping,envMapCubeUVHeight:G,aoMap:W,lightMap:Wt,bumpMap:_t,normalMap:at,displacementMap:d&&rt,emissiveMap:qt,normalMapObjectSpace:at&&y.normalMapType===1,normalMapTangentSpace:at&&y.normalMapType===0,metalnessMap:le,roughnessMap:C,anisotropy:E,anisotropyMap:xe,clearcoat:k,clearcoatMap:Ie,clearcoatNormalMap:vt,clearcoatRoughnessMap:Se,dispersion:ae,iridescence:de,iridescenceMap:Be,iridescenceThicknessMap:$e,sheen:oe,sheenColorMap:ot,sheenRoughnessMap:qe,specularMap:Rt,specularColorMap:gt,specularIntensityMap:Ft,transmission:Fe,transmissionMap:X,thicknessMap:Pe,gradientMap:ue,opaque:y.transparent===!1&&y.blending===1&&y.alphaToCoverage===!1,alphaMap:be,alphaTest:Ue,alphaHash:ke,combine:y.combine,mapUv:dt&&v(y.map.channel),aoMapUv:W&&v(y.aoMap.channel),lightMapUv:Wt&&v(y.lightMap.channel),bumpMapUv:_t&&v(y.bumpMap.channel),normalMapUv:at&&v(y.normalMap.channel),displacementMapUv:rt&&v(y.displacementMap.channel),emissiveMapUv:qt&&v(y.emissiveMap.channel),metalnessMapUv:le&&v(y.metalnessMap.channel),roughnessMapUv:C&&v(y.roughnessMap.channel),anisotropyMapUv:xe&&v(y.anisotropyMap.channel),clearcoatMapUv:Ie&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:vt&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Be&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:$e&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:ot&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:qe&&v(y.sheenRoughnessMap.channel),specularMapUv:Rt&&v(y.specularMap.channel),specularColorMapUv:gt&&v(y.specularColorMap.channel),specularIntensityMapUv:Ft&&v(y.specularIntensityMap.channel),transmissionMapUv:X&&v(y.transmissionMap.channel),thicknessMapUv:Pe&&v(y.thicknessMap.channel),alphaMapUv:be&&v(y.alphaMap.channel),vertexTangents:!!re.attributes.tangent&&(at||E),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!re.attributes.color&&re.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!re.attributes.uv&&(dt||be),fog:!!Y,useFog:y.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:st,skinning:B.isSkinnedMesh===!0,morphTargets:re.morphAttributes.position!==void 0,morphNormals:re.morphAttributes.normal!==void 0,morphColors:re.morphAttributes.color!==void 0,morphTargetsCount:$,morphTextureStride:ve,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:Xt,decodeVideoTexture:dt&&y.map.isVideoTexture===!0&&Jt.getTransfer(y.map.colorSpace)===an,decodeVideoTextureEmissive:qt&&y.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(y.emissiveMap.colorSpace)===an,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===2,flipSided:y.side===1,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:We&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(We&&y.extensions.multiDraw===!0||ht)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return un.vertexUv1s=l.has(1),un.vertexUv2s=l.has(2),un.vertexUv3s=l.has(3),l.clear(),un}function p(y){const S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(const I in y.defines)S.push(I),S.push(y.defines[I]);return y.isRawShaderMaterial===!1&&(x(S,y),M(S,y),S.push(s.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function x(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function M(y,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),y.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),y.push(o.mask)}function _(y){const S=b[y.type];let I;if(S){const z=Ii[S];I=Yu.clone(z.uniforms)}else I=y.uniforms;return I}function D(y,S){let I;for(let z=0,B=u.length;z<B;z++){const Y=u[z];if(Y.cacheKey===S){I=Y,++I.usedTimes;break}}return I===void 0&&(I=new lg(s,S,y,r),u.push(I)),I}function T(y){if(--y.usedTimes===0){const S=u.indexOf(y);u[S]=u[u.length-1],u.pop(),y.destroy()}}function L(y){c.remove(y)}function A(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:D,releaseProgram:T,releaseShaderCache:L,programs:u,dispose:A}}function pg(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function mg(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function pl(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function ml(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(h,d,f,b,v,m){let p=s[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:b,renderOrder:h.renderOrder,z:v,group:m},s[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=b,p.renderOrder=h.renderOrder,p.z=v,p.group=m),e++,p}function o(h,d,f,b,v,m){const p=a(h,d,f,b,v,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function c(h,d,f,b,v,m){const p=a(h,d,f,b,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function l(h,d){t.length>1&&t.sort(h||mg),n.length>1&&n.sort(d||pl),i.length>1&&i.sort(d||pl)}function u(){for(let h=e,d=s.length;h<d;h++){const f=s[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:c,finish:u,sort:l}}function gg(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new ml,s.set(n,[a])):i>=r.length?(a=new ml,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function bg(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new nt};break;case"SpotLight":t={position:new N,direction:new N,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new nt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":t={color:new nt,position:new N,halfWidth:new N,halfHeight:new N};break}return s[e.id]=t,t}}}function _g(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let vg=0;function xg(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function yg(s){const e=new bg,t=_g(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);const i=new N,r=new tt,a=new tt;function o(l){let u=0,h=0,d=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let f=0,b=0,v=0,m=0,p=0,x=0,M=0,_=0,D=0,T=0,L=0;l.sort(xg);for(let y=0,S=l.length;y<S;y++){const I=l[y],z=I.color,B=I.intensity,Y=I.distance,re=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=z.r*B,h+=z.g*B,d+=z.b*B;else if(I.isLightProbe){for(let F=0;F<9;F++)n.probe[F].addScaledVector(I.sh.coefficients[F],B);L++}else if(I.isDirectionalLight){const F=e.get(I);if(F.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const q=I.shadow,G=t.get(I);G.shadowIntensity=q.intensity,G.shadowBias=q.bias,G.shadowNormalBias=q.normalBias,G.shadowRadius=q.radius,G.shadowMapSize=q.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=re,n.directionalShadowMatrix[f]=I.shadow.matrix,x++}n.directional[f]=F,f++}else if(I.isSpotLight){const F=e.get(I);F.position.setFromMatrixPosition(I.matrixWorld),F.color.copy(z).multiplyScalar(B),F.distance=Y,F.coneCos=Math.cos(I.angle),F.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),F.decay=I.decay,n.spot[v]=F;const q=I.shadow;if(I.map&&(n.spotLightMap[D]=I.map,D++,q.updateMatrices(I),I.castShadow&&T++),n.spotLightMatrix[v]=q.matrix,I.castShadow){const G=t.get(I);G.shadowIntensity=q.intensity,G.shadowBias=q.bias,G.shadowNormalBias=q.normalBias,G.shadowRadius=q.radius,G.shadowMapSize=q.mapSize,n.spotShadow[v]=G,n.spotShadowMap[v]=re,_++}v++}else if(I.isRectAreaLight){const F=e.get(I);F.color.copy(z).multiplyScalar(B),F.halfWidth.set(I.width*.5,0,0),F.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=F,m++}else if(I.isPointLight){const F=e.get(I);if(F.color.copy(I.color).multiplyScalar(I.intensity),F.distance=I.distance,F.decay=I.decay,I.castShadow){const q=I.shadow,G=t.get(I);G.shadowIntensity=q.intensity,G.shadowBias=q.bias,G.shadowNormalBias=q.normalBias,G.shadowRadius=q.radius,G.shadowMapSize=q.mapSize,G.shadowCameraNear=q.camera.near,G.shadowCameraFar=q.camera.far,n.pointShadow[b]=G,n.pointShadowMap[b]=re,n.pointShadowMatrix[b]=I.shadow.matrix,M++}n.point[b]=F,b++}else if(I.isHemisphereLight){const F=e.get(I);F.skyColor.copy(I.color).multiplyScalar(B),F.groundColor.copy(I.groundColor).multiplyScalar(B),n.hemi[p]=F,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=je.LTC_FLOAT_1,n.rectAreaLTC2=je.LTC_FLOAT_2):(n.rectAreaLTC1=je.LTC_HALF_1,n.rectAreaLTC2=je.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const A=n.hash;(A.directionalLength!==f||A.pointLength!==b||A.spotLength!==v||A.rectAreaLength!==m||A.hemiLength!==p||A.numDirectionalShadows!==x||A.numPointShadows!==M||A.numSpotShadows!==_||A.numSpotMaps!==D||A.numLightProbes!==L)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=b,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=_+D-T,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=L,A.directionalLength=f,A.pointLength=b,A.spotLength=v,A.rectAreaLength=m,A.hemiLength=p,A.numDirectionalShadows=x,A.numPointShadows=M,A.numSpotShadows=_,A.numSpotMaps=D,A.numLightProbes=L,n.version=vg++)}function c(l,u){let h=0,d=0,f=0,b=0,v=0;const m=u.matrixWorldInverse;for(let p=0,x=l.length;p<x;p++){const M=l[p];if(M.isDirectionalLight){const _=n.directional[h];_.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),h++}else if(M.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),f++}else if(M.isRectAreaLight){const _=n.rectArea[b];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),_.halfWidth.set(M.width*.5,0,0),_.halfHeight.set(0,M.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),b++}else if(M.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),d++}else if(M.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(M.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:o,setupView:c,state:n}}function gl(s){const e=new yg(s),t=[],n=[];function i(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Mg(s){let e=new WeakMap;function t(i,r=0){const a=e.get(i);let o;return a===void 0?(o=new gl(s),e.set(i,[o])):r>=a.length?(o=new gl(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class Sg extends _i{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Eg extends _i{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const wg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ag=`uniform sampler2D shadow_pass;
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
}`;function Tg(s,e,t){let n=new lc;const i=new He,r=new He,a=new Zt,o=new Sg({depthPacking:3201}),c=new Eg,l={},u=t.maxTextureSize,h={0:1,1:0,2:2},d=new bs({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new He},radius:{value:4}},vertexShader:wg,fragmentShader:Ag}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const b=new cn;b.setAttribute("position",new $t(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ge(b,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let p=this.type;this.render=function(T,L,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const y=s.getRenderTarget(),S=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),z=s.state;z.setBlending(0),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const B=p!==3&&this.type===3,Y=p===3&&this.type!==3;for(let re=0,F=T.length;re<F;re++){const q=T[re],G=q.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const he=G.getFrameExtents();if(i.multiply(he),r.copy(G.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/he.x),i.x=r.x*he.x,G.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/he.y),i.y=r.y*he.y,G.mapSize.y=r.y)),G.map===null||B===!0||Y===!0){const $=this.type!==3?{minFilter:1003,magFilter:1003}:{};G.map!==null&&G.map.dispose(),G.map=new gs(i.x,i.y,$),G.map.texture.name=q.name+".shadowMap",G.camera.updateProjectionMatrix()}s.setRenderTarget(G.map),s.clear();const J=G.getViewportCount();for(let $=0;$<J;$++){const ve=G.getViewport($);a.set(r.x*ve.x,r.y*ve.y,r.x*ve.z,r.y*ve.w),z.viewport(a),G.updateMatrices(q,$),n=G.getFrustum(),_(L,A,G.camera,q,this.type)}G.isPointLightShadow!==!0&&this.type===3&&x(G,A),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(y,S,I)};function x(T,L){const A=e.update(v);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new gs(i.x,i.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(L,null,A,d,v,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(L,null,A,f,v,null)}function M(T,L,A,y){let S=null;const I=A.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)S=I;else if(S=A.isPointLight===!0?c:o,s.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0){const z=S.uuid,B=L.uuid;let Y=l[z];Y===void 0&&(Y={},l[z]=Y);let re=Y[B];re===void 0&&(re=S.clone(),Y[B]=re,L.addEventListener("dispose",D)),S=re}if(S.visible=L.visible,S.wireframe=L.wireframe,y===3?S.side=L.shadowSide!==null?L.shadowSide:L.side:S.side=L.shadowSide!==null?L.shadowSide:h[L.side],S.alphaMap=L.alphaMap,S.alphaTest=L.alphaTest,S.map=L.map,S.clipShadows=L.clipShadows,S.clippingPlanes=L.clippingPlanes,S.clipIntersection=L.clipIntersection,S.displacementMap=L.displacementMap,S.displacementScale=L.displacementScale,S.displacementBias=L.displacementBias,S.wireframeLinewidth=L.wireframeLinewidth,S.linewidth=L.linewidth,A.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const z=s.properties.get(S);z.light=A}return S}function _(T,L,A,y,S){if(T.visible===!1)return;if(T.layers.test(L.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===3)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,T.matrixWorld);const B=e.update(T),Y=T.material;if(Array.isArray(Y)){const re=B.groups;for(let F=0,q=re.length;F<q;F++){const G=re[F],he=Y[G.materialIndex];if(he&&he.visible){const J=M(T,he,y,S);T.onBeforeShadow(s,T,L,A,B,J,G),s.renderBufferDirect(A,null,B,J,T,G),T.onAfterShadow(s,T,L,A,B,J,G)}}}else if(Y.visible){const re=M(T,Y,y,S);T.onBeforeShadow(s,T,L,A,B,re,null),s.renderBufferDirect(A,null,B,re,T,null),T.onAfterShadow(s,T,L,A,B,re,null)}}const z=T.children;for(let B=0,Y=z.length;B<Y;B++)_(z[B],L,A,y,S)}function D(T){T.target.removeEventListener("dispose",D);for(const A in l){const y=l[A],S=T.target.uuid;S in y&&(y[S].dispose(),delete y[S])}}}const Rg={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function Cg(s,e){function t(){let X=!1;const Pe=new Zt;let ue=null;const be=new Zt(0,0,0,0);return{setMask:function(Ue){ue!==Ue&&!X&&(s.colorMask(Ue,Ue,Ue,Ue),ue=Ue)},setLocked:function(Ue){X=Ue},setClear:function(Ue,ke,We,Xt,un){un===!0&&(Ue*=Xt,ke*=Xt,We*=Xt),Pe.set(Ue,ke,We,Xt),be.equals(Pe)===!1&&(s.clearColor(Ue,ke,We,Xt),be.copy(Pe))},reset:function(){X=!1,ue=null,be.set(-1,0,0,0)}}}function n(){let X=!1,Pe=!1,ue=null,be=null,Ue=null;return{setReversed:function(ke){if(Pe!==ke){const We=e.get("EXT_clip_control");Pe?We.clipControlEXT(We.LOWER_LEFT_EXT,We.ZERO_TO_ONE_EXT):We.clipControlEXT(We.LOWER_LEFT_EXT,We.NEGATIVE_ONE_TO_ONE_EXT);const Xt=Ue;Ue=null,this.setClear(Xt)}Pe=ke},getReversed:function(){return Pe},setTest:function(ke){ke?_e(s.DEPTH_TEST):st(s.DEPTH_TEST)},setMask:function(ke){ue!==ke&&!X&&(s.depthMask(ke),ue=ke)},setFunc:function(ke){if(Pe&&(ke=Rg[ke]),be!==ke){switch(ke){case 0:s.depthFunc(s.NEVER);break;case 1:s.depthFunc(s.ALWAYS);break;case 2:s.depthFunc(s.LESS);break;case 3:s.depthFunc(s.LEQUAL);break;case 4:s.depthFunc(s.EQUAL);break;case 5:s.depthFunc(s.GEQUAL);break;case 6:s.depthFunc(s.GREATER);break;case 7:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}be=ke}},setLocked:function(ke){X=ke},setClear:function(ke){Ue!==ke&&(Pe&&(ke=1-ke),s.clearDepth(ke),Ue=ke)},reset:function(){X=!1,ue=null,be=null,Ue=null,Pe=!1}}}function i(){let X=!1,Pe=null,ue=null,be=null,Ue=null,ke=null,We=null,Xt=null,un=null;return{setTest:function(It){X||(It?_e(s.STENCIL_TEST):st(s.STENCIL_TEST))},setMask:function(It){Pe!==It&&!X&&(s.stencilMask(It),Pe=It)},setFunc:function(It,me,vn){(ue!==It||be!==me||Ue!==vn)&&(s.stencilFunc(It,me,vn),ue=It,be=me,Ue=vn)},setOp:function(It,me,vn){(ke!==It||We!==me||Xt!==vn)&&(s.stencilOp(It,me,vn),ke=It,We=me,Xt=vn)},setLocked:function(It){X=It},setClear:function(It){un!==It&&(s.clearStencil(It),un=It)},reset:function(){X=!1,Pe=null,ue=null,be=null,Ue=null,ke=null,We=null,Xt=null,un=null}}}const r=new t,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let u={},h={},d=new WeakMap,f=[],b=null,v=!1,m=null,p=null,x=null,M=null,_=null,D=null,T=null,L=new nt(0,0,0),A=0,y=!1,S=null,I=null,z=null,B=null,Y=null;const re=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,q=0;const G=s.getParameter(s.VERSION);G.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(G)[1]),F=q>=1):G.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),F=q>=2);let he=null,J={};const $=s.getParameter(s.SCISSOR_BOX),ve=s.getParameter(s.VIEWPORT),Le=new Zt().fromArray($),ie=new Zt().fromArray(ve);function pe(X,Pe,ue,be){const Ue=new Uint8Array(4),ke=s.createTexture();s.bindTexture(X,ke),s.texParameteri(X,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(X,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let We=0;We<ue;We++)X===s.TEXTURE_3D||X===s.TEXTURE_2D_ARRAY?s.texImage3D(Pe,0,s.RGBA,1,1,be,0,s.RGBA,s.UNSIGNED_BYTE,Ue):s.texImage2D(Pe+We,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ue);return ke}const De={};De[s.TEXTURE_2D]=pe(s.TEXTURE_2D,s.TEXTURE_2D,1),De[s.TEXTURE_CUBE_MAP]=pe(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),De[s.TEXTURE_2D_ARRAY]=pe(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),De[s.TEXTURE_3D]=pe(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),_e(s.DEPTH_TEST),a.setFunc(3),_t(!1),at(1),_e(s.CULL_FACE),W(0);function _e(X){u[X]!==!0&&(s.enable(X),u[X]=!0)}function st(X){u[X]!==!1&&(s.disable(X),u[X]=!1)}function it(X,Pe){return h[X]!==Pe?(s.bindFramebuffer(X,Pe),h[X]=Pe,X===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=Pe),X===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=Pe),!0):!1}function ht(X,Pe){let ue=f,be=!1;if(X){ue=d.get(Pe),ue===void 0&&(ue=[],d.set(Pe,ue));const Ue=X.textures;if(ue.length!==Ue.length||ue[0]!==s.COLOR_ATTACHMENT0){for(let ke=0,We=Ue.length;ke<We;ke++)ue[ke]=s.COLOR_ATTACHMENT0+ke;ue.length=Ue.length,be=!0}}else ue[0]!==s.BACK&&(ue[0]=s.BACK,be=!0);be&&s.drawBuffers(ue)}function dt(X){return b!==X?(s.useProgram(X),b=X,!0):!1}const ft={100:s.FUNC_ADD,101:s.FUNC_SUBTRACT,102:s.FUNC_REVERSE_SUBTRACT};ft[103]=s.MIN,ft[104]=s.MAX;const mt={200:s.ZERO,201:s.ONE,202:s.SRC_COLOR,204:s.SRC_ALPHA,210:s.SRC_ALPHA_SATURATE,208:s.DST_COLOR,206:s.DST_ALPHA,203:s.ONE_MINUS_SRC_COLOR,205:s.ONE_MINUS_SRC_ALPHA,209:s.ONE_MINUS_DST_COLOR,207:s.ONE_MINUS_DST_ALPHA,211:s.CONSTANT_COLOR,212:s.ONE_MINUS_CONSTANT_COLOR,213:s.CONSTANT_ALPHA,214:s.ONE_MINUS_CONSTANT_ALPHA};function W(X,Pe,ue,be,Ue,ke,We,Xt,un,It){if(X===0){v===!0&&(st(s.BLEND),v=!1);return}if(v===!1&&(_e(s.BLEND),v=!0),X!==5){if(X!==m||It!==y){if((p!==100||_!==100)&&(s.blendEquation(s.FUNC_ADD),p=100,_=100),It)switch(X){case 1:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case 2:s.blendFunc(s.ONE,s.ONE);break;case 3:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case 4:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}else switch(X){case 1:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case 2:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case 3:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case 4:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}x=null,M=null,D=null,T=null,L.set(0,0,0),A=0,m=X,y=It}return}Ue=Ue||Pe,ke=ke||ue,We=We||be,(Pe!==p||Ue!==_)&&(s.blendEquationSeparate(ft[Pe],ft[Ue]),p=Pe,_=Ue),(ue!==x||be!==M||ke!==D||We!==T)&&(s.blendFuncSeparate(mt[ue],mt[be],mt[ke],mt[We]),x=ue,M=be,D=ke,T=We),(Xt.equals(L)===!1||un!==A)&&(s.blendColor(Xt.r,Xt.g,Xt.b,un),L.copy(Xt),A=un),m=X,y=!1}function Wt(X,Pe){X.side===2?st(s.CULL_FACE):_e(s.CULL_FACE);let ue=X.side===1;Pe&&(ue=!ue),_t(ue),X.blending===1&&X.transparent===!1?W(0):W(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),a.setFunc(X.depthFunc),a.setTest(X.depthTest),a.setMask(X.depthWrite),r.setMask(X.colorWrite);const be=X.stencilWrite;o.setTest(be),be&&(o.setMask(X.stencilWriteMask),o.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),o.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),qt(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?_e(s.SAMPLE_ALPHA_TO_COVERAGE):st(s.SAMPLE_ALPHA_TO_COVERAGE)}function _t(X){S!==X&&(X?s.frontFace(s.CW):s.frontFace(s.CCW),S=X)}function at(X){X!==0?(_e(s.CULL_FACE),X!==I&&(X===1?s.cullFace(s.BACK):X===2?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):st(s.CULL_FACE),I=X}function rt(X){X!==z&&(F&&s.lineWidth(X),z=X)}function qt(X,Pe,ue){X?(_e(s.POLYGON_OFFSET_FILL),(B!==Pe||Y!==ue)&&(s.polygonOffset(Pe,ue),B=Pe,Y=ue)):st(s.POLYGON_OFFSET_FILL)}function le(X){X?_e(s.SCISSOR_TEST):st(s.SCISSOR_TEST)}function C(X){X===void 0&&(X=s.TEXTURE0+re-1),he!==X&&(s.activeTexture(X),he=X)}function E(X,Pe,ue){ue===void 0&&(he===null?ue=s.TEXTURE0+re-1:ue=he);let be=J[ue];be===void 0&&(be={type:void 0,texture:void 0},J[ue]=be),(be.type!==X||be.texture!==Pe)&&(he!==ue&&(s.activeTexture(ue),he=ue),s.bindTexture(X,Pe||De[X]),be.type=X,be.texture=Pe)}function k(){const X=J[he];X!==void 0&&X.type!==void 0&&(s.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function ae(){try{s.compressedTexImage2D.apply(s,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function de(){try{s.compressedTexImage3D.apply(s,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function oe(){try{s.texSubImage2D.apply(s,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Fe(){try{s.texSubImage3D.apply(s,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function xe(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Ie(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function vt(){try{s.texStorage2D.apply(s,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Se(){try{s.texStorage3D.apply(s,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Be(){try{s.texImage2D.apply(s,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function $e(){try{s.texImage3D.apply(s,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function ot(X){Le.equals(X)===!1&&(s.scissor(X.x,X.y,X.z,X.w),Le.copy(X))}function qe(X){ie.equals(X)===!1&&(s.viewport(X.x,X.y,X.z,X.w),ie.copy(X))}function Rt(X,Pe){let ue=l.get(Pe);ue===void 0&&(ue=new WeakMap,l.set(Pe,ue));let be=ue.get(X);be===void 0&&(be=s.getUniformBlockIndex(Pe,X.name),ue.set(X,be))}function gt(X,Pe){const be=l.get(Pe).get(X);c.get(Pe)!==be&&(s.uniformBlockBinding(Pe,be,X.__bindingPointIndex),c.set(Pe,be))}function Ft(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},he=null,J={},h={},d=new WeakMap,f=[],b=null,v=!1,m=null,p=null,x=null,M=null,_=null,D=null,T=null,L=new nt(0,0,0),A=0,y=!1,S=null,I=null,z=null,B=null,Y=null,Le.set(0,0,s.canvas.width,s.canvas.height),ie.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:_e,disable:st,bindFramebuffer:it,drawBuffers:ht,useProgram:dt,setBlending:W,setMaterial:Wt,setFlipSided:_t,setCullFace:at,setLineWidth:rt,setPolygonOffset:qt,setScissorTest:le,activeTexture:C,bindTexture:E,unbindTexture:k,compressedTexImage2D:ae,compressedTexImage3D:de,texImage2D:Be,texImage3D:$e,updateUBOMapping:Rt,uniformBlockBinding:gt,texStorage2D:vt,texStorage3D:Se,texSubImage2D:oe,texSubImage3D:Fe,compressedTexSubImage2D:xe,compressedTexSubImage3D:Ie,scissor:ot,viewport:qe,reset:Ft}}function bl(s,e,t,n){const i=Pg(n);switch(t){case 1021:return s*e;case 1024:return s*e;case 1025:return s*e*2;case 1028:return s*e/i.components*i.byteLength;case 1029:return s*e/i.components*i.byteLength;case 1030:return s*e*2/i.components*i.byteLength;case 1031:return s*e*2/i.components*i.byteLength;case 1022:return s*e*3/i.components*i.byteLength;case 1023:return s*e*4/i.components*i.byteLength;case 1033:return s*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(s,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(s,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case 37496:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case 37808:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(s/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(s/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Pg(s){switch(s){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function Lg(s,e,t,n,i,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new He,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(C,E){return f?new OffscreenCanvas(C,E):kr("canvas")}function v(C,E,k){let ae=1;const de=le(C);if((de.width>k||de.height>k)&&(ae=k/Math.max(de.width,de.height)),ae<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const oe=Math.floor(ae*de.width),Fe=Math.floor(ae*de.height);h===void 0&&(h=b(oe,Fe));const xe=E?b(oe,Fe):h;return xe.width=oe,xe.height=Fe,xe.getContext("2d").drawImage(C,0,0,oe,Fe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+de.width+"x"+de.height+") to ("+oe+"x"+Fe+")."),xe}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+de.width+"x"+de.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){s.generateMipmap(C)}function x(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(C,E,k,ae,de=!1){if(C!==null){if(s[C]!==void 0)return s[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let oe=E;if(E===s.RED&&(k===s.FLOAT&&(oe=s.R32F),k===s.HALF_FLOAT&&(oe=s.R16F),k===s.UNSIGNED_BYTE&&(oe=s.R8)),E===s.RED_INTEGER&&(k===s.UNSIGNED_BYTE&&(oe=s.R8UI),k===s.UNSIGNED_SHORT&&(oe=s.R16UI),k===s.UNSIGNED_INT&&(oe=s.R32UI),k===s.BYTE&&(oe=s.R8I),k===s.SHORT&&(oe=s.R16I),k===s.INT&&(oe=s.R32I)),E===s.RG&&(k===s.FLOAT&&(oe=s.RG32F),k===s.HALF_FLOAT&&(oe=s.RG16F),k===s.UNSIGNED_BYTE&&(oe=s.RG8)),E===s.RG_INTEGER&&(k===s.UNSIGNED_BYTE&&(oe=s.RG8UI),k===s.UNSIGNED_SHORT&&(oe=s.RG16UI),k===s.UNSIGNED_INT&&(oe=s.RG32UI),k===s.BYTE&&(oe=s.RG8I),k===s.SHORT&&(oe=s.RG16I),k===s.INT&&(oe=s.RG32I)),E===s.RGB_INTEGER&&(k===s.UNSIGNED_BYTE&&(oe=s.RGB8UI),k===s.UNSIGNED_SHORT&&(oe=s.RGB16UI),k===s.UNSIGNED_INT&&(oe=s.RGB32UI),k===s.BYTE&&(oe=s.RGB8I),k===s.SHORT&&(oe=s.RGB16I),k===s.INT&&(oe=s.RGB32I)),E===s.RGBA_INTEGER&&(k===s.UNSIGNED_BYTE&&(oe=s.RGBA8UI),k===s.UNSIGNED_SHORT&&(oe=s.RGBA16UI),k===s.UNSIGNED_INT&&(oe=s.RGBA32UI),k===s.BYTE&&(oe=s.RGBA8I),k===s.SHORT&&(oe=s.RGBA16I),k===s.INT&&(oe=s.RGBA32I)),E===s.RGB&&k===s.UNSIGNED_INT_5_9_9_9_REV&&(oe=s.RGB9_E5),E===s.RGBA){const Fe=de?za:Jt.getTransfer(ae);k===s.FLOAT&&(oe=s.RGBA32F),k===s.HALF_FLOAT&&(oe=s.RGBA16F),k===s.UNSIGNED_BYTE&&(oe=Fe===an?s.SRGB8_ALPHA8:s.RGBA8),k===s.UNSIGNED_SHORT_4_4_4_4&&(oe=s.RGBA4),k===s.UNSIGNED_SHORT_5_5_5_1&&(oe=s.RGB5_A1)}return(oe===s.R16F||oe===s.R32F||oe===s.RG16F||oe===s.RG32F||oe===s.RGBA16F||oe===s.RGBA32F)&&e.get("EXT_color_buffer_float"),oe}function _(C,E){let k;return C?E===null||E===1014||E===1020?k=s.DEPTH24_STENCIL8:E===1015?k=s.DEPTH32F_STENCIL8:E===1012&&(k=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===1014||E===1020?k=s.DEPTH_COMPONENT24:E===1015?k=s.DEPTH_COMPONENT32F:E===1012&&(k=s.DEPTH_COMPONENT16),k}function D(C,E){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==1003&&C.minFilter!==1006?Math.log2(Math.max(E.width,E.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?E.mipmaps.length:1}function T(C){const E=C.target;E.removeEventListener("dispose",T),A(E),E.isVideoTexture&&u.delete(E)}function L(C){const E=C.target;E.removeEventListener("dispose",L),S(E)}function A(C){const E=n.get(C);if(E.__webglInit===void 0)return;const k=C.source,ae=d.get(k);if(ae){const de=ae[E.__cacheKey];de.usedTimes--,de.usedTimes===0&&y(C),Object.keys(ae).length===0&&d.delete(k)}n.remove(C)}function y(C){const E=n.get(C);s.deleteTexture(E.__webglTexture);const k=C.source,ae=d.get(k);delete ae[E.__cacheKey],a.memory.textures--}function S(C){const E=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let ae=0;ae<6;ae++){if(Array.isArray(E.__webglFramebuffer[ae]))for(let de=0;de<E.__webglFramebuffer[ae].length;de++)s.deleteFramebuffer(E.__webglFramebuffer[ae][de]);else s.deleteFramebuffer(E.__webglFramebuffer[ae]);E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer[ae])}else{if(Array.isArray(E.__webglFramebuffer))for(let ae=0;ae<E.__webglFramebuffer.length;ae++)s.deleteFramebuffer(E.__webglFramebuffer[ae]);else s.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&s.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let ae=0;ae<E.__webglColorRenderbuffer.length;ae++)E.__webglColorRenderbuffer[ae]&&s.deleteRenderbuffer(E.__webglColorRenderbuffer[ae]);E.__webglDepthRenderbuffer&&s.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const k=C.textures;for(let ae=0,de=k.length;ae<de;ae++){const oe=n.get(k[ae]);oe.__webglTexture&&(s.deleteTexture(oe.__webglTexture),a.memory.textures--),n.remove(k[ae])}n.remove(C)}let I=0;function z(){I=0}function B(){const C=I;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),I+=1,C}function Y(C){const E=[];return E.push(C.wrapS),E.push(C.wrapT),E.push(C.wrapR||0),E.push(C.magFilter),E.push(C.minFilter),E.push(C.anisotropy),E.push(C.internalFormat),E.push(C.format),E.push(C.type),E.push(C.generateMipmaps),E.push(C.premultiplyAlpha),E.push(C.flipY),E.push(C.unpackAlignment),E.push(C.colorSpace),E.join()}function re(C,E){const k=n.get(C);if(C.isVideoTexture&&rt(C),C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){const ae=C.image;if(ae===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ae.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ie(k,C,E);return}}t.bindTexture(s.TEXTURE_2D,k.__webglTexture,s.TEXTURE0+E)}function F(C,E){const k=n.get(C);if(C.version>0&&k.__version!==C.version){ie(k,C,E);return}t.bindTexture(s.TEXTURE_2D_ARRAY,k.__webglTexture,s.TEXTURE0+E)}function q(C,E){const k=n.get(C);if(C.version>0&&k.__version!==C.version){ie(k,C,E);return}t.bindTexture(s.TEXTURE_3D,k.__webglTexture,s.TEXTURE0+E)}function G(C,E){const k=n.get(C);if(C.version>0&&k.__version!==C.version){pe(k,C,E);return}t.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture,s.TEXTURE0+E)}const he={1e3:s.REPEAT,1001:s.CLAMP_TO_EDGE,1002:s.MIRRORED_REPEAT},J={1003:s.NEAREST,1004:s.NEAREST_MIPMAP_NEAREST,1005:s.NEAREST_MIPMAP_LINEAR,1006:s.LINEAR,1007:s.LINEAR_MIPMAP_NEAREST,1008:s.LINEAR_MIPMAP_LINEAR},$={512:s.NEVER,519:s.ALWAYS,513:s.LESS,515:s.LEQUAL,514:s.EQUAL,518:s.GEQUAL,516:s.GREATER,517:s.NOTEQUAL};function ve(C,E){if(E.type===1015&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===1006||E.magFilter===1007||E.magFilter===1005||E.magFilter===1008||E.minFilter===1006||E.minFilter===1007||E.minFilter===1005||E.minFilter===1008)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,he[E.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,he[E.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,he[E.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,J[E.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,J[E.minFilter]),E.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,$[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===1003||E.minFilter!==1005&&E.minFilter!==1008||E.type===1015&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");s.texParameterf(C,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Le(C,E){let k=!1;C.__webglInit===void 0&&(C.__webglInit=!0,E.addEventListener("dispose",T));const ae=E.source;let de=d.get(ae);de===void 0&&(de={},d.set(ae,de));const oe=Y(E);if(oe!==C.__cacheKey){de[oe]===void 0&&(de[oe]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,k=!0),de[oe].usedTimes++;const Fe=de[C.__cacheKey];Fe!==void 0&&(de[C.__cacheKey].usedTimes--,Fe.usedTimes===0&&y(E)),C.__cacheKey=oe,C.__webglTexture=de[oe].texture}return k}function ie(C,E,k){let ae=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ae=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ae=s.TEXTURE_3D);const de=Le(C,E),oe=E.source;t.bindTexture(ae,C.__webglTexture,s.TEXTURE0+k);const Fe=n.get(oe);if(oe.version!==Fe.__version||de===!0){t.activeTexture(s.TEXTURE0+k);const xe=Jt.getPrimaries(Jt.workingColorSpace),Ie=E.colorSpace===""?null:Jt.getPrimaries(E.colorSpace),vt=E.colorSpace===""||xe===Ie?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let Se=v(E.image,!1,i.maxTextureSize);Se=qt(E,Se);const Be=r.convert(E.format,E.colorSpace),$e=r.convert(E.type);let ot=M(E.internalFormat,Be,$e,E.colorSpace,E.isVideoTexture);ve(ae,E);let qe;const Rt=E.mipmaps,gt=E.isVideoTexture!==!0,Ft=Fe.__version===void 0||de===!0,X=oe.dataReady,Pe=D(E,Se);if(E.isDepthTexture)ot=_(E.format===1027,E.type),Ft&&(gt?t.texStorage2D(s.TEXTURE_2D,1,ot,Se.width,Se.height):t.texImage2D(s.TEXTURE_2D,0,ot,Se.width,Se.height,0,Be,$e,null));else if(E.isDataTexture)if(Rt.length>0){gt&&Ft&&t.texStorage2D(s.TEXTURE_2D,Pe,ot,Rt[0].width,Rt[0].height);for(let ue=0,be=Rt.length;ue<be;ue++)qe=Rt[ue],gt?X&&t.texSubImage2D(s.TEXTURE_2D,ue,0,0,qe.width,qe.height,Be,$e,qe.data):t.texImage2D(s.TEXTURE_2D,ue,ot,qe.width,qe.height,0,Be,$e,qe.data);E.generateMipmaps=!1}else gt?(Ft&&t.texStorage2D(s.TEXTURE_2D,Pe,ot,Se.width,Se.height),X&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Se.width,Se.height,Be,$e,Se.data)):t.texImage2D(s.TEXTURE_2D,0,ot,Se.width,Se.height,0,Be,$e,Se.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){gt&&Ft&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Pe,ot,Rt[0].width,Rt[0].height,Se.depth);for(let ue=0,be=Rt.length;ue<be;ue++)if(qe=Rt[ue],E.format!==1023)if(Be!==null)if(gt){if(X)if(E.layerUpdates.size>0){const Ue=bl(qe.width,qe.height,E.format,E.type);for(const ke of E.layerUpdates){const We=qe.data.subarray(ke*Ue/qe.data.BYTES_PER_ELEMENT,(ke+1)*Ue/qe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ue,0,0,ke,qe.width,qe.height,1,Be,We)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ue,0,0,0,qe.width,qe.height,Se.depth,Be,qe.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ue,ot,qe.width,qe.height,Se.depth,0,qe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else gt?X&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,ue,0,0,0,qe.width,qe.height,Se.depth,Be,$e,qe.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ue,ot,qe.width,qe.height,Se.depth,0,Be,$e,qe.data)}else{gt&&Ft&&t.texStorage2D(s.TEXTURE_2D,Pe,ot,Rt[0].width,Rt[0].height);for(let ue=0,be=Rt.length;ue<be;ue++)qe=Rt[ue],E.format!==1023?Be!==null?gt?X&&t.compressedTexSubImage2D(s.TEXTURE_2D,ue,0,0,qe.width,qe.height,Be,qe.data):t.compressedTexImage2D(s.TEXTURE_2D,ue,ot,qe.width,qe.height,0,qe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):gt?X&&t.texSubImage2D(s.TEXTURE_2D,ue,0,0,qe.width,qe.height,Be,$e,qe.data):t.texImage2D(s.TEXTURE_2D,ue,ot,qe.width,qe.height,0,Be,$e,qe.data)}else if(E.isDataArrayTexture)if(gt){if(Ft&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Pe,ot,Se.width,Se.height,Se.depth),X)if(E.layerUpdates.size>0){const ue=bl(Se.width,Se.height,E.format,E.type);for(const be of E.layerUpdates){const Ue=Se.data.subarray(be*ue/Se.data.BYTES_PER_ELEMENT,(be+1)*ue/Se.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,be,Se.width,Se.height,1,Be,$e,Ue)}E.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Se.width,Se.height,Se.depth,Be,$e,Se.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,ot,Se.width,Se.height,Se.depth,0,Be,$e,Se.data);else if(E.isData3DTexture)gt?(Ft&&t.texStorage3D(s.TEXTURE_3D,Pe,ot,Se.width,Se.height,Se.depth),X&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Se.width,Se.height,Se.depth,Be,$e,Se.data)):t.texImage3D(s.TEXTURE_3D,0,ot,Se.width,Se.height,Se.depth,0,Be,$e,Se.data);else if(E.isFramebufferTexture){if(Ft)if(gt)t.texStorage2D(s.TEXTURE_2D,Pe,ot,Se.width,Se.height);else{let ue=Se.width,be=Se.height;for(let Ue=0;Ue<Pe;Ue++)t.texImage2D(s.TEXTURE_2D,Ue,ot,ue,be,0,Be,$e,null),ue>>=1,be>>=1}}else if(Rt.length>0){if(gt&&Ft){const ue=le(Rt[0]);t.texStorage2D(s.TEXTURE_2D,Pe,ot,ue.width,ue.height)}for(let ue=0,be=Rt.length;ue<be;ue++)qe=Rt[ue],gt?X&&t.texSubImage2D(s.TEXTURE_2D,ue,0,0,Be,$e,qe):t.texImage2D(s.TEXTURE_2D,ue,ot,Be,$e,qe);E.generateMipmaps=!1}else if(gt){if(Ft){const ue=le(Se);t.texStorage2D(s.TEXTURE_2D,Pe,ot,ue.width,ue.height)}X&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Be,$e,Se)}else t.texImage2D(s.TEXTURE_2D,0,ot,Be,$e,Se);m(E)&&p(ae),Fe.__version=oe.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function pe(C,E,k){if(E.image.length!==6)return;const ae=Le(C,E),de=E.source;t.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+k);const oe=n.get(de);if(de.version!==oe.__version||ae===!0){t.activeTexture(s.TEXTURE0+k);const Fe=Jt.getPrimaries(Jt.workingColorSpace),xe=E.colorSpace===""?null:Jt.getPrimaries(E.colorSpace),Ie=E.colorSpace===""||Fe===xe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);const vt=E.isCompressedTexture||E.image[0].isCompressedTexture,Se=E.image[0]&&E.image[0].isDataTexture,Be=[];for(let be=0;be<6;be++)!vt&&!Se?Be[be]=v(E.image[be],!0,i.maxCubemapSize):Be[be]=Se?E.image[be].image:E.image[be],Be[be]=qt(E,Be[be]);const $e=Be[0],ot=r.convert(E.format,E.colorSpace),qe=r.convert(E.type),Rt=M(E.internalFormat,ot,qe,E.colorSpace),gt=E.isVideoTexture!==!0,Ft=oe.__version===void 0||ae===!0,X=de.dataReady;let Pe=D(E,$e);ve(s.TEXTURE_CUBE_MAP,E);let ue;if(vt){gt&&Ft&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Pe,Rt,$e.width,$e.height);for(let be=0;be<6;be++){ue=Be[be].mipmaps;for(let Ue=0;Ue<ue.length;Ue++){const ke=ue[Ue];E.format!==1023?ot!==null?gt?X&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Ue,0,0,ke.width,ke.height,ot,ke.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Ue,Rt,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):gt?X&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Ue,0,0,ke.width,ke.height,ot,qe,ke.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Ue,Rt,ke.width,ke.height,0,ot,qe,ke.data)}}}else{if(ue=E.mipmaps,gt&&Ft){ue.length>0&&Pe++;const be=le(Be[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Pe,Rt,be.width,be.height)}for(let be=0;be<6;be++)if(Se){gt?X&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,Be[be].width,Be[be].height,ot,qe,Be[be].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,Rt,Be[be].width,Be[be].height,0,ot,qe,Be[be].data);for(let Ue=0;Ue<ue.length;Ue++){const We=ue[Ue].image[be].image;gt?X&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Ue+1,0,0,We.width,We.height,ot,qe,We.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Ue+1,Rt,We.width,We.height,0,ot,qe,We.data)}}else{gt?X&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,ot,qe,Be[be]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,Rt,ot,qe,Be[be]);for(let Ue=0;Ue<ue.length;Ue++){const ke=ue[Ue];gt?X&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Ue+1,0,0,ot,qe,ke.image[be]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Ue+1,Rt,ot,qe,ke.image[be])}}}m(E)&&p(s.TEXTURE_CUBE_MAP),oe.__version=de.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function De(C,E,k,ae,de,oe){const Fe=r.convert(k.format,k.colorSpace),xe=r.convert(k.type),Ie=M(k.internalFormat,Fe,xe,k.colorSpace),vt=n.get(E),Se=n.get(k);if(Se.__renderTarget=E,!vt.__hasExternalTextures){const Be=Math.max(1,E.width>>oe),$e=Math.max(1,E.height>>oe);de===s.TEXTURE_3D||de===s.TEXTURE_2D_ARRAY?t.texImage3D(de,oe,Ie,Be,$e,E.depth,0,Fe,xe,null):t.texImage2D(de,oe,Ie,Be,$e,0,Fe,xe,null)}t.bindFramebuffer(s.FRAMEBUFFER,C),at(E)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ae,de,Se.__webglTexture,0,_t(E)):(de===s.TEXTURE_2D||de>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&de<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ae,de,Se.__webglTexture,oe),t.bindFramebuffer(s.FRAMEBUFFER,null)}function _e(C,E,k){if(s.bindRenderbuffer(s.RENDERBUFFER,C),E.depthBuffer){const ae=E.depthTexture,de=ae&&ae.isDepthTexture?ae.type:null,oe=_(E.stencilBuffer,de),Fe=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,xe=_t(E);at(E)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,xe,oe,E.width,E.height):k?s.renderbufferStorageMultisample(s.RENDERBUFFER,xe,oe,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,oe,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Fe,s.RENDERBUFFER,C)}else{const ae=E.textures;for(let de=0;de<ae.length;de++){const oe=ae[de],Fe=r.convert(oe.format,oe.colorSpace),xe=r.convert(oe.type),Ie=M(oe.internalFormat,Fe,xe,oe.colorSpace),vt=_t(E);k&&at(E)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,vt,Ie,E.width,E.height):at(E)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,vt,Ie,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,Ie,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function st(C,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,C),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ae=n.get(E.depthTexture);ae.__renderTarget=E,(!ae.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),re(E.depthTexture,0);const de=ae.__webglTexture,oe=_t(E);if(E.depthTexture.format===1026)at(E)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,de,0,oe):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,de,0);else if(E.depthTexture.format===1027)at(E)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,de,0,oe):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,de,0);else throw new Error("Unknown depthTexture format")}function it(C){const E=n.get(C),k=C.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==C.depthTexture){const ae=C.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),ae){const de=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,ae.removeEventListener("dispose",de)};ae.addEventListener("dispose",de),E.__depthDisposeCallback=de}E.__boundDepthTexture=ae}if(C.depthTexture&&!E.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");st(E.__webglFramebuffer,C)}else if(k){E.__webglDepthbuffer=[];for(let ae=0;ae<6;ae++)if(t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[ae]),E.__webglDepthbuffer[ae]===void 0)E.__webglDepthbuffer[ae]=s.createRenderbuffer(),_e(E.__webglDepthbuffer[ae],C,!1);else{const de=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,oe=E.__webglDepthbuffer[ae];s.bindRenderbuffer(s.RENDERBUFFER,oe),s.framebufferRenderbuffer(s.FRAMEBUFFER,de,s.RENDERBUFFER,oe)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=s.createRenderbuffer(),_e(E.__webglDepthbuffer,C,!1);else{const ae=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,de=E.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,de),s.framebufferRenderbuffer(s.FRAMEBUFFER,ae,s.RENDERBUFFER,de)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function ht(C,E,k){const ae=n.get(C);E!==void 0&&De(ae.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),k!==void 0&&it(C)}function dt(C){const E=C.texture,k=n.get(C),ae=n.get(E);C.addEventListener("dispose",L);const de=C.textures,oe=C.isWebGLCubeRenderTarget===!0,Fe=de.length>1;if(Fe||(ae.__webglTexture===void 0&&(ae.__webglTexture=s.createTexture()),ae.__version=E.version,a.memory.textures++),oe){k.__webglFramebuffer=[];for(let xe=0;xe<6;xe++)if(E.mipmaps&&E.mipmaps.length>0){k.__webglFramebuffer[xe]=[];for(let Ie=0;Ie<E.mipmaps.length;Ie++)k.__webglFramebuffer[xe][Ie]=s.createFramebuffer()}else k.__webglFramebuffer[xe]=s.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){k.__webglFramebuffer=[];for(let xe=0;xe<E.mipmaps.length;xe++)k.__webglFramebuffer[xe]=s.createFramebuffer()}else k.__webglFramebuffer=s.createFramebuffer();if(Fe)for(let xe=0,Ie=de.length;xe<Ie;xe++){const vt=n.get(de[xe]);vt.__webglTexture===void 0&&(vt.__webglTexture=s.createTexture(),a.memory.textures++)}if(C.samples>0&&at(C)===!1){k.__webglMultisampledFramebuffer=s.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let xe=0;xe<de.length;xe++){const Ie=de[xe];k.__webglColorRenderbuffer[xe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,k.__webglColorRenderbuffer[xe]);const vt=r.convert(Ie.format,Ie.colorSpace),Se=r.convert(Ie.type),Be=M(Ie.internalFormat,vt,Se,Ie.colorSpace,C.isXRRenderTarget===!0),$e=_t(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,$e,Be,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xe,s.RENDERBUFFER,k.__webglColorRenderbuffer[xe])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(k.__webglDepthRenderbuffer=s.createRenderbuffer(),_e(k.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(oe){t.bindTexture(s.TEXTURE_CUBE_MAP,ae.__webglTexture),ve(s.TEXTURE_CUBE_MAP,E);for(let xe=0;xe<6;xe++)if(E.mipmaps&&E.mipmaps.length>0)for(let Ie=0;Ie<E.mipmaps.length;Ie++)De(k.__webglFramebuffer[xe][Ie],C,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ie);else De(k.__webglFramebuffer[xe],C,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0);m(E)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Fe){for(let xe=0,Ie=de.length;xe<Ie;xe++){const vt=de[xe],Se=n.get(vt);t.bindTexture(s.TEXTURE_2D,Se.__webglTexture),ve(s.TEXTURE_2D,vt),De(k.__webglFramebuffer,C,vt,s.COLOR_ATTACHMENT0+xe,s.TEXTURE_2D,0),m(vt)&&p(s.TEXTURE_2D)}t.unbindTexture()}else{let xe=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(xe=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(xe,ae.__webglTexture),ve(xe,E),E.mipmaps&&E.mipmaps.length>0)for(let Ie=0;Ie<E.mipmaps.length;Ie++)De(k.__webglFramebuffer[Ie],C,E,s.COLOR_ATTACHMENT0,xe,Ie);else De(k.__webglFramebuffer,C,E,s.COLOR_ATTACHMENT0,xe,0);m(E)&&p(xe),t.unbindTexture()}C.depthBuffer&&it(C)}function ft(C){const E=C.textures;for(let k=0,ae=E.length;k<ae;k++){const de=E[k];if(m(de)){const oe=x(C),Fe=n.get(de).__webglTexture;t.bindTexture(oe,Fe),p(oe),t.unbindTexture()}}}const mt=[],W=[];function Wt(C){if(C.samples>0){if(at(C)===!1){const E=C.textures,k=C.width,ae=C.height;let de=s.COLOR_BUFFER_BIT;const oe=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Fe=n.get(C),xe=E.length>1;if(xe)for(let Ie=0;Ie<E.length;Ie++)t.bindFramebuffer(s.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Fe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer);for(let Ie=0;Ie<E.length;Ie++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(de|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(de|=s.STENCIL_BUFFER_BIT)),xe){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Fe.__webglColorRenderbuffer[Ie]);const vt=n.get(E[Ie]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,vt,0)}s.blitFramebuffer(0,0,k,ae,0,0,k,ae,de,s.NEAREST),c===!0&&(mt.length=0,W.length=0,mt.push(s.COLOR_ATTACHMENT0+Ie),C.depthBuffer&&C.resolveDepthBuffer===!1&&(mt.push(oe),W.push(oe),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,W)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,mt))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),xe)for(let Ie=0;Ie<E.length;Ie++){t.bindFramebuffer(s.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.RENDERBUFFER,Fe.__webglColorRenderbuffer[Ie]);const vt=n.get(E[Ie]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Fe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.TEXTURE_2D,vt,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const E=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[E])}}}function _t(C){return Math.min(i.maxSamples,C.samples)}function at(C){const E=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function rt(C){const E=a.render.frame;u.get(C)!==E&&(u.set(C,E),C.update())}function qt(C,E){const k=C.colorSpace,ae=C.format,de=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||k!==Zn&&k!==""&&(Jt.getTransfer(k)===an?(ae!==1023||de!==1009)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),E}function le(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=z,this.setTexture2D=re,this.setTexture2DArray=F,this.setTexture3D=q,this.setTextureCube=G,this.rebindTextures=ht,this.setupRenderTarget=dt,this.updateRenderTargetMipmap=ft,this.updateMultisampleRenderTarget=Wt,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=De,this.useMultisampledRTT=at}function Ig(s,e){function t(n,i=""){let r;const a=Jt.getTransfer(i);if(n===1009)return s.UNSIGNED_BYTE;if(n===1017)return s.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return s.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===1010)return s.BYTE;if(n===1011)return s.SHORT;if(n===1012)return s.UNSIGNED_SHORT;if(n===1013)return s.INT;if(n===1014)return s.UNSIGNED_INT;if(n===1015)return s.FLOAT;if(n===1016)return s.HALF_FLOAT;if(n===1021)return s.ALPHA;if(n===1022)return s.RGB;if(n===1023)return s.RGBA;if(n===1024)return s.LUMINANCE;if(n===1025)return s.LUMINANCE_ALPHA;if(n===1026)return s.DEPTH_COMPONENT;if(n===1027)return s.DEPTH_STENCIL;if(n===1028)return s.RED;if(n===1029)return s.RED_INTEGER;if(n===1030)return s.RG;if(n===1031)return s.RG_INTEGER;if(n===1033)return s.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===an)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===33776)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===33776)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===35840)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===36196||n===37492)return a===an?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===37496)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===37808)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===an?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===36492)return a===an?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===36492)return r.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class Dg extends ti{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ct extends pn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Fg={type:"move"};class Eo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ct,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ct,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ct,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,b=.005;l.inputState.pinching&&d>f+b?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-b&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Fg)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ct;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Ng=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ug=`
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

}`;class Og{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new wn,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new bs({vertexShader:Ng,fragmentShader:Ug,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ge(new Un(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Bg extends Is{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,d=null,f=null,b=null;const v=new Og,m=t.getContextAttributes();let p=null,x=null;const M=[],_=[],D=new He;let T=null;const L=new ti;L.viewport=new Zt;const A=new ti;A.viewport=new Zt;const y=[L,A],S=new Dg;let I=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let pe=M[ie];return pe===void 0&&(pe=new Eo,M[ie]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(ie){let pe=M[ie];return pe===void 0&&(pe=new Eo,M[ie]=pe),pe.getGripSpace()},this.getHand=function(ie){let pe=M[ie];return pe===void 0&&(pe=new Eo,M[ie]=pe),pe.getHandSpace()};function B(ie){const pe=_.indexOf(ie.inputSource);if(pe===-1)return;const De=M[pe];De!==void 0&&(De.update(ie.inputSource,ie.frame,l||a),De.dispatchEvent({type:ie.type,data:ie.inputSource}))}function Y(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",Y),i.removeEventListener("inputsourceschange",re);for(let ie=0;ie<M.length;ie++){const pe=_[ie];pe!==null&&(_[ie]=null,M[ie].disconnect(pe))}I=null,z=null,v.reset(),e.setRenderTarget(p),f=null,d=null,h=null,i=null,x=null,Le.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){r=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){o=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ie){l=ie},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return b},this.getSession=function(){return i},this.setSession=async function(ie){if(i=ie,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",Y),i.addEventListener("inputsourceschange",re),m.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(D),i.renderState.layers===void 0){const pe={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,pe),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new gs(f.framebufferWidth,f.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let pe=null,De=null,_e=null;m.depth&&(_e=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=m.stencil?1027:1026,De=m.stencil?1020:1014);const st={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:r};h=new XRWebGLBinding(i,t),d=h.createProjectionLayer(st),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new gs(d.textureWidth,d.textureHeight,{format:1023,type:1009,depthTexture:new Eh(d.textureWidth,d.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Le.setContext(i),Le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function re(ie){for(let pe=0;pe<ie.removed.length;pe++){const De=ie.removed[pe],_e=_.indexOf(De);_e>=0&&(_[_e]=null,M[_e].disconnect(De))}for(let pe=0;pe<ie.added.length;pe++){const De=ie.added[pe];let _e=_.indexOf(De);if(_e===-1){for(let it=0;it<M.length;it++)if(it>=_.length){_.push(De),_e=it;break}else if(_[it]===null){_[it]=De,_e=it;break}if(_e===-1)break}const st=M[_e];st&&st.connect(De)}}const F=new N,q=new N;function G(ie,pe,De){F.setFromMatrixPosition(pe.matrixWorld),q.setFromMatrixPosition(De.matrixWorld);const _e=F.distanceTo(q),st=pe.projectionMatrix.elements,it=De.projectionMatrix.elements,ht=st[14]/(st[10]-1),dt=st[14]/(st[10]+1),ft=(st[9]+1)/st[5],mt=(st[9]-1)/st[5],W=(st[8]-1)/st[0],Wt=(it[8]+1)/it[0],_t=ht*W,at=ht*Wt,rt=_e/(-W+Wt),qt=rt*-W;if(pe.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(qt),ie.translateZ(rt),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert(),st[10]===-1)ie.projectionMatrix.copy(pe.projectionMatrix),ie.projectionMatrixInverse.copy(pe.projectionMatrixInverse);else{const le=ht+rt,C=dt+rt,E=_t-qt,k=at+(_e-qt),ae=ft*dt/C*le,de=mt*dt/C*le;ie.projectionMatrix.makePerspective(E,k,ae,de,le,C),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}}function he(ie,pe){pe===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(pe.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(i===null)return;let pe=ie.near,De=ie.far;v.texture!==null&&(v.depthNear>0&&(pe=v.depthNear),v.depthFar>0&&(De=v.depthFar)),S.near=A.near=L.near=pe,S.far=A.far=L.far=De,(I!==S.near||z!==S.far)&&(i.updateRenderState({depthNear:S.near,depthFar:S.far}),I=S.near,z=S.far),L.layers.mask=ie.layers.mask|2,A.layers.mask=ie.layers.mask|4,S.layers.mask=L.layers.mask|A.layers.mask;const _e=ie.parent,st=S.cameras;he(S,_e);for(let it=0;it<st.length;it++)he(st[it],_e);st.length===2?G(S,L,A):S.projectionMatrix.copy(L.projectionMatrix),J(ie,S,_e)};function J(ie,pe,De){De===null?ie.matrix.copy(pe.matrixWorld):(ie.matrix.copy(De.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(pe.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(pe.projectionMatrix),ie.projectionMatrixInverse.copy(pe.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=ir*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(ie){c=ie,d!==null&&(d.fixedFoveation=ie),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ie)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(S)};let $=null;function ve(ie,pe){if(u=pe.getViewerPose(l||a),b=pe,u!==null){const De=u.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let _e=!1;De.length!==S.cameras.length&&(S.cameras.length=0,_e=!0);for(let it=0;it<De.length;it++){const ht=De[it];let dt=null;if(f!==null)dt=f.getViewport(ht);else{const mt=h.getViewSubImage(d,ht);dt=mt.viewport,it===0&&(e.setRenderTargetTextures(x,mt.colorTexture,d.ignoreDepthValues?void 0:mt.depthStencilTexture),e.setRenderTarget(x))}let ft=y[it];ft===void 0&&(ft=new ti,ft.layers.enable(it),ft.viewport=new Zt,y[it]=ft),ft.matrix.fromArray(ht.transform.matrix),ft.matrix.decompose(ft.position,ft.quaternion,ft.scale),ft.projectionMatrix.fromArray(ht.projectionMatrix),ft.projectionMatrixInverse.copy(ft.projectionMatrix).invert(),ft.viewport.set(dt.x,dt.y,dt.width,dt.height),it===0&&(S.matrix.copy(ft.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),_e===!0&&S.cameras.push(ft)}const st=i.enabledFeatures;if(st&&st.includes("depth-sensing")){const it=h.getDepthInformation(De[0]);it&&it.isValid&&it.texture&&v.init(e,it,i.renderState)}}for(let De=0;De<M.length;De++){const _e=_[De],st=M[De];_e!==null&&st!==void 0&&st.update(_e,pe,l||a)}$&&$(ie,pe),pe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:pe}),b=null}const Le=new Sh;Le.setAnimationLoop(ve),this.setAnimationLoop=function(ie){$=ie},this.dispose=function(){}}}const Es=new fi,kg=new tt;function zg(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,xh(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,x,M,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),b(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,x,M):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===1&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===1&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p),M=x.envMap,_=x.envMapRotation;M&&(m.envMap.value=M,Es.copy(_),Es.x*=-1,Es.y*=-1,Es.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Es.y*=-1,Es.z*=-1),m.envMapRotation.value.setFromMatrix4(kg.makeRotationFromEuler(Es)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,x,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=M*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===1&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function b(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Gg(s,e,t,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,M){const _=M.program;n.uniformBlockBinding(x,_)}function l(x,M){let _=i[x.id];_===void 0&&(b(x),_=u(x),i[x.id]=_,x.addEventListener("dispose",m));const D=M.program;n.updateUBOMapping(x,D);const T=e.render.frame;r[x.id]!==T&&(d(x),r[x.id]=T)}function u(x){const M=h();x.__bindingPointIndex=M;const _=s.createBuffer(),D=x.__size,T=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,_),s.bufferData(s.UNIFORM_BUFFER,D,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,_),_}function h(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const M=i[x.id],_=x.uniforms,D=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let T=0,L=_.length;T<L;T++){const A=Array.isArray(_[T])?_[T]:[_[T]];for(let y=0,S=A.length;y<S;y++){const I=A[y];if(f(I,T,y,D)===!0){const z=I.__offset,B=Array.isArray(I.value)?I.value:[I.value];let Y=0;for(let re=0;re<B.length;re++){const F=B[re],q=v(F);typeof F=="number"||typeof F=="boolean"?(I.__data[0]=F,s.bufferSubData(s.UNIFORM_BUFFER,z+Y,I.__data)):F.isMatrix3?(I.__data[0]=F.elements[0],I.__data[1]=F.elements[1],I.__data[2]=F.elements[2],I.__data[3]=0,I.__data[4]=F.elements[3],I.__data[5]=F.elements[4],I.__data[6]=F.elements[5],I.__data[7]=0,I.__data[8]=F.elements[6],I.__data[9]=F.elements[7],I.__data[10]=F.elements[8],I.__data[11]=0):(F.toArray(I.__data,Y),Y+=q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,z,I.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,M,_,D){const T=x.value,L=M+"_"+_;if(D[L]===void 0)return typeof T=="number"||typeof T=="boolean"?D[L]=T:D[L]=T.clone(),!0;{const A=D[L];if(typeof T=="number"||typeof T=="boolean"){if(A!==T)return D[L]=T,!0}else if(A.equals(T)===!1)return A.copy(T),!0}return!1}function b(x){const M=x.uniforms;let _=0;const D=16;for(let L=0,A=M.length;L<A;L++){const y=Array.isArray(M[L])?M[L]:[M[L]];for(let S=0,I=y.length;S<I;S++){const z=y[S],B=Array.isArray(z.value)?z.value:[z.value];for(let Y=0,re=B.length;Y<re;Y++){const F=B[Y],q=v(F),G=_%D,he=G%q.boundary,J=G+he;_+=he,J!==0&&D-J<q.storage&&(_+=D-J),z.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=_,_+=q.storage}}}const T=_%D;return T>0&&(_+=D-T),x.__size=_,x.__cache={},this}function v(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),M}function m(x){const M=x.target;M.removeEventListener("dispose",m);const _=a.indexOf(M.__bindingPointIndex);a.splice(_,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function p(){for(const x in i)s.deleteBuffer(i[x]);a=[],i={},r={}}return{bind:c,update:l,dispose:p}}class Hg{constructor(e={}){const{canvas:t=Cu(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const b=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const x=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=jt,this.toneMapping=0,this.toneMappingExposure=1;const _=this;let D=!1,T=0,L=0,A=null,y=-1,S=null;const I=new Zt,z=new Zt;let B=null;const Y=new nt(0);let re=0,F=t.width,q=t.height,G=1,he=null,J=null;const $=new Zt(0,0,F,q),ve=new Zt(0,0,F,q);let Le=!1;const ie=new lc;let pe=!1,De=!1;const _e=new tt,st=new tt,it=new N,ht=new Zt,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ft=!1;function mt(){return A===null?G:1}let W=n;function Wt(R,j){return t.getContext(R,j)}try{const R={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r170"),t.addEventListener("webglcontextlost",be,!1),t.addEventListener("webglcontextrestored",Ue,!1),t.addEventListener("webglcontextcreationerror",ke,!1),W===null){const j="webgl2";if(W=Wt(j,R),W===null)throw Wt(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let _t,at,rt,qt,le,C,E,k,ae,de,oe,Fe,xe,Ie,vt,Se,Be,$e,ot,qe,Rt,gt,Ft,X;function Pe(){_t=new qp(W),_t.init(),gt=new Ig(W,_t),at=new Gp(W,_t,e,gt),rt=new Cg(W,_t),at.reverseDepthBuffer&&d&&rt.buffers.depth.setReversed(!0),qt=new Jp(W),le=new pg,C=new Lg(W,_t,rt,le,at,gt,qt),E=new Vp(_),k=new jp(_),ae=new nd(W),Ft=new kp(W,ae),de=new Kp(W,ae,qt,Ft),oe=new Qp(W,de,ae,qt),ot=new Zp(W,at,C),Se=new Hp(le),Fe=new fg(_,E,k,_t,at,Ft,Se),xe=new zg(_,le),Ie=new gg,vt=new Mg(_t),$e=new Bp(_,E,k,rt,oe,f,c),Be=new Tg(_,oe,at),X=new Gg(W,qt,at,rt),qe=new zp(W,_t,qt),Rt=new Yp(W,_t,qt),qt.programs=Fe.programs,_.capabilities=at,_.extensions=_t,_.properties=le,_.renderLists=Ie,_.shadowMap=Be,_.state=rt,_.info=qt}Pe();const ue=new Bg(_,W);this.xr=ue,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const R=_t.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=_t.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(R){R!==void 0&&(G=R,this.setSize(F,q,!1))},this.getSize=function(R){return R.set(F,q)},this.setSize=function(R,j,ce=!0){if(ue.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=R,q=j,t.width=Math.floor(R*G),t.height=Math.floor(j*G),ce===!0&&(t.style.width=R+"px",t.style.height=j+"px"),this.setViewport(0,0,R,j)},this.getDrawingBufferSize=function(R){return R.set(F*G,q*G).floor()},this.setDrawingBufferSize=function(R,j,ce){F=R,q=j,G=ce,t.width=Math.floor(R*ce),t.height=Math.floor(j*ce),this.setViewport(0,0,R,j)},this.getCurrentViewport=function(R){return R.copy(I)},this.getViewport=function(R){return R.copy($)},this.setViewport=function(R,j,ce,ee){R.isVector4?$.set(R.x,R.y,R.z,R.w):$.set(R,j,ce,ee),rt.viewport(I.copy($).multiplyScalar(G).round())},this.getScissor=function(R){return R.copy(ve)},this.setScissor=function(R,j,ce,ee){R.isVector4?ve.set(R.x,R.y,R.z,R.w):ve.set(R,j,ce,ee),rt.scissor(z.copy(ve).multiplyScalar(G).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(R){rt.setScissorTest(Le=R)},this.setOpaqueSort=function(R){he=R},this.setTransparentSort=function(R){J=R},this.getClearColor=function(R){return R.copy($e.getClearColor())},this.setClearColor=function(){$e.setClearColor.apply($e,arguments)},this.getClearAlpha=function(){return $e.getClearAlpha()},this.setClearAlpha=function(){$e.setClearAlpha.apply($e,arguments)},this.clear=function(R=!0,j=!0,ce=!0){let ee=0;if(R){let K=!1;if(A!==null){const Re=A.texture.format;K=Re===1033||Re===1031||Re===1029}if(K){const Re=A.texture.type,ge=Re===1009||Re===1014||Re===1012||Re===1020||Re===1017||Re===1018,ze=$e.getClearColor(),et=$e.getClearAlpha(),pt=ze.r,yt=ze.g,Xe=ze.b;ge?(b[0]=pt,b[1]=yt,b[2]=Xe,b[3]=et,W.clearBufferuiv(W.COLOR,0,b)):(v[0]=pt,v[1]=yt,v[2]=Xe,v[3]=et,W.clearBufferiv(W.COLOR,0,v))}else ee|=W.COLOR_BUFFER_BIT}j&&(ee|=W.DEPTH_BUFFER_BIT),ce&&(ee|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",be,!1),t.removeEventListener("webglcontextrestored",Ue,!1),t.removeEventListener("webglcontextcreationerror",ke,!1),Ie.dispose(),vt.dispose(),le.dispose(),E.dispose(),k.dispose(),oe.dispose(),Ft.dispose(),X.dispose(),Fe.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",Dn),ue.removeEventListener("sessionend",On),mn.stop()};function be(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function Ue(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const R=qt.autoReset,j=Be.enabled,ce=Be.autoUpdate,ee=Be.needsUpdate,K=Be.type;Pe(),qt.autoReset=R,Be.enabled=j,Be.autoUpdate=ce,Be.needsUpdate=ee,Be.type=K}function ke(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function We(R){const j=R.target;j.removeEventListener("dispose",We),Xt(j)}function Xt(R){un(R),le.remove(R)}function un(R){const j=le.get(R).programs;j!==void 0&&(j.forEach(function(ce){Fe.releaseProgram(ce)}),R.isShaderMaterial&&Fe.releaseShaderCache(R))}this.renderBufferDirect=function(R,j,ce,ee,K,Re){j===null&&(j=dt);const ge=K.isMesh&&K.matrixWorld.determinant()<0,ze=xn(R,j,ce,ee,K);rt.setMaterial(ee,ge);let et=ce.index,pt=1;if(ee.wireframe===!0){if(et=de.getWireframeAttribute(ce),et===void 0)return;pt=2}const yt=ce.drawRange,Xe=ce.attributes.position;let Ct=yt.start*pt,Nt=(yt.start+yt.count)*pt;Re!==null&&(Ct=Math.max(Ct,Re.start*pt),Nt=Math.min(Nt,(Re.start+Re.count)*pt)),et!==null?(Ct=Math.max(Ct,0),Nt=Math.min(Nt,et.count)):Xe!=null&&(Ct=Math.max(Ct,0),Nt=Math.min(Nt,Xe.count));const Et=Nt-Ct;if(Et<0||Et===1/0)return;Ft.setup(K,ee,ze,ce,et);let Je,Gt=qe;if(et!==null&&(Je=ae.get(et),Gt=Rt,Gt.setIndex(Je)),K.isMesh)ee.wireframe===!0?(rt.setLineWidth(ee.wireframeLinewidth*mt()),Gt.setMode(W.LINES)):Gt.setMode(W.TRIANGLES);else if(K.isLine){let Oe=ee.linewidth;Oe===void 0&&(Oe=1),rt.setLineWidth(Oe*mt()),K.isLineSegments?Gt.setMode(W.LINES):K.isLineLoop?Gt.setMode(W.LINE_LOOP):Gt.setMode(W.LINE_STRIP)}else K.isPoints?Gt.setMode(W.POINTS):K.isSprite&&Gt.setMode(W.TRIANGLES);if(K.isBatchedMesh)if(K._multiDrawInstances!==null)Gt.renderMultiDrawInstances(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount,K._multiDrawInstances);else if(_t.get("WEBGL_multi_draw"))Gt.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Oe=K._multiDrawStarts,Tt=K._multiDrawCounts,wt=K._multiDrawCount,Ut=et?ae.get(et).bytesPerElement:1,Ot=le.get(ee).currentProgram.getUniforms();for(let dn=0;dn<wt;dn++)Ot.setValue(W,"_gl_DrawID",dn),Gt.render(Oe[dn]/Ut,Tt[dn])}else if(K.isInstancedMesh)Gt.renderInstances(Ct,Et,K.count);else if(ce.isInstancedBufferGeometry){const Oe=ce._maxInstanceCount!==void 0?ce._maxInstanceCount:1/0,Tt=Math.min(ce.instanceCount,Oe);Gt.renderInstances(Ct,Et,Tt)}else Gt.render(Ct,Et)};function It(R,j,ce){R.transparent===!0&&R.side===2&&R.forceSinglePass===!1?(R.side=1,R.needsUpdate=!0,nn(R,j,ce),R.side=0,R.needsUpdate=!0,nn(R,j,ce),R.side=2):nn(R,j,ce)}this.compile=function(R,j,ce=null){ce===null&&(ce=R),p=vt.get(ce),p.init(j),M.push(p),ce.traverseVisible(function(K){K.isLight&&K.layers.test(j.layers)&&(p.pushLight(K),K.castShadow&&p.pushShadow(K))}),R!==ce&&R.traverseVisible(function(K){K.isLight&&K.layers.test(j.layers)&&(p.pushLight(K),K.castShadow&&p.pushShadow(K))}),p.setupLights();const ee=new Set;return R.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Re=K.material;if(Re)if(Array.isArray(Re))for(let ge=0;ge<Re.length;ge++){const ze=Re[ge];It(ze,ce,K),ee.add(ze)}else It(Re,ce,K),ee.add(Re)}),M.pop(),p=null,ee},this.compileAsync=function(R,j,ce=null){const ee=this.compile(R,j,ce);return new Promise(K=>{function Re(){if(ee.forEach(function(ge){le.get(ge).currentProgram.isReady()&&ee.delete(ge)}),ee.size===0){K(R);return}setTimeout(Re,10)}_t.get("KHR_parallel_shader_compile")!==null?Re():setTimeout(Re,10)})};let me=null;function vn(R){me&&me(R)}function Dn(){mn.stop()}function On(){mn.start()}const mn=new Sh;mn.setAnimationLoop(vn),typeof self<"u"&&mn.setContext(self),this.setAnimationLoop=function(R){me=R,ue.setAnimationLoop(R),R===null?mn.stop():mn.start()},ue.addEventListener("sessionstart",Dn),ue.addEventListener("sessionend",On),this.render=function(R,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(ue.cameraAutoUpdate===!0&&ue.updateCamera(j),j=ue.getCamera()),R.isScene===!0&&R.onBeforeRender(_,R,j,A),p=vt.get(R,M.length),p.init(j),M.push(p),st.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),ie.setFromProjectionMatrix(st),De=this.localClippingEnabled,pe=Se.init(this.clippingPlanes,De),m=Ie.get(R,x.length),m.init(),x.push(m),ue.enabled===!0&&ue.isPresenting===!0){const Re=_.xr.getDepthSensingMesh();Re!==null&&Qn(Re,j,-1/0,_.sortObjects)}Qn(R,j,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(he,J),ft=ue.enabled===!1||ue.isPresenting===!1||ue.hasDepthSensing()===!1,ft&&$e.addToRenderList(m,R),this.info.render.frame++,pe===!0&&Se.beginShadows();const ce=p.state.shadowsArray;Be.render(ce,R,j),pe===!0&&Se.endShadows(),this.info.autoReset===!0&&this.info.reset();const ee=m.opaque,K=m.transmissive;if(p.setupLights(),j.isArrayCamera){const Re=j.cameras;if(K.length>0)for(let ge=0,ze=Re.length;ge<ze;ge++){const et=Re[ge];Ri(ee,K,R,et)}ft&&$e.render(R);for(let ge=0,ze=Re.length;ge<ze;ge++){const et=Re[ge];Fn(m,R,et,et.viewport)}}else K.length>0&&Ri(ee,K,R,j),ft&&$e.render(R),Fn(m,R,j);A!==null&&(C.updateMultisampleRenderTarget(A),C.updateRenderTargetMipmap(A)),R.isScene===!0&&R.onAfterRender(_,R,j),Ft.resetDefaultState(),y=-1,S=null,M.pop(),M.length>0?(p=M[M.length-1],pe===!0&&Se.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function Qn(R,j,ce,ee){if(R.visible===!1)return;if(R.layers.test(j.layers)){if(R.isGroup)ce=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(j);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||ie.intersectsSprite(R)){ee&&ht.setFromMatrixPosition(R.matrixWorld).applyMatrix4(st);const ge=oe.update(R),ze=R.material;ze.visible&&m.push(R,ge,ze,ce,ht.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||ie.intersectsObject(R))){const ge=oe.update(R),ze=R.material;if(ee&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),ht.copy(R.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),ht.copy(ge.boundingSphere.center)),ht.applyMatrix4(R.matrixWorld).applyMatrix4(st)),Array.isArray(ze)){const et=ge.groups;for(let pt=0,yt=et.length;pt<yt;pt++){const Xe=et[pt],Ct=ze[Xe.materialIndex];Ct&&Ct.visible&&m.push(R,ge,Ct,ce,ht.z,Xe)}}else ze.visible&&m.push(R,ge,ze,ce,ht.z,null)}}const Re=R.children;for(let ge=0,ze=Re.length;ge<ze;ge++)Qn(Re[ge],j,ce,ee)}function Fn(R,j,ce,ee){const K=R.opaque,Re=R.transmissive,ge=R.transparent;p.setupLightsView(ce),pe===!0&&Se.setGlobalState(_.clippingPlanes,ce),ee&&rt.viewport(I.copy(ee)),K.length>0&&Wn(K,j,ce),Re.length>0&&Wn(Re,j,ce),ge.length>0&&Wn(ge,j,ce),rt.buffers.depth.setTest(!0),rt.buffers.depth.setMask(!0),rt.buffers.color.setMask(!0),rt.setPolygonOffset(!1)}function Ri(R,j,ce,ee){if((ce.isScene===!0?ce.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[ee.id]===void 0&&(p.state.transmissionRenderTarget[ee.id]=new gs(1,1,{generateMipmaps:!0,type:_t.has("EXT_color_buffer_half_float")||_t.has("EXT_color_buffer_float")?1016:1009,minFilter:1008,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));const Re=p.state.transmissionRenderTarget[ee.id],ge=ee.viewport||I;Re.setSize(ge.z,ge.w);const ze=_.getRenderTarget();_.setRenderTarget(Re),_.getClearColor(Y),re=_.getClearAlpha(),re<1&&_.setClearColor(16777215,.5),_.clear(),ft&&$e.render(ce);const et=_.toneMapping;_.toneMapping=0;const pt=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),p.setupLightsView(ee),pe===!0&&Se.setGlobalState(_.clippingPlanes,ee),Wn(R,ce,ee),C.updateMultisampleRenderTarget(Re),C.updateRenderTargetMipmap(Re),_t.has("WEBGL_multisampled_render_to_texture")===!1){let yt=!1;for(let Xe=0,Ct=j.length;Xe<Ct;Xe++){const Nt=j[Xe],Et=Nt.object,Je=Nt.geometry,Gt=Nt.material,Oe=Nt.group;if(Gt.side===2&&Et.layers.test(ee.layers)){const Tt=Gt.side;Gt.side=1,Gt.needsUpdate=!0,Bn(Et,ce,ee,Je,Gt,Oe),Gt.side=Tt,Gt.needsUpdate=!0,yt=!0}}yt===!0&&(C.updateMultisampleRenderTarget(Re),C.updateRenderTargetMipmap(Re))}_.setRenderTarget(ze),_.setClearColor(Y,re),pt!==void 0&&(ee.viewport=pt),_.toneMapping=et}function Wn(R,j,ce){const ee=j.isScene===!0?j.overrideMaterial:null;for(let K=0,Re=R.length;K<Re;K++){const ge=R[K],ze=ge.object,et=ge.geometry,pt=ee===null?ge.material:ee,yt=ge.group;ze.layers.test(ce.layers)&&Bn(ze,j,ce,et,pt,yt)}}function Bn(R,j,ce,ee,K,Re){R.onBeforeRender(_,j,ce,ee,K,Re),R.modelViewMatrix.multiplyMatrices(ce.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),K.onBeforeRender(_,j,ce,ee,R,Re),K.transparent===!0&&K.side===2&&K.forceSinglePass===!1?(K.side=1,K.needsUpdate=!0,_.renderBufferDirect(ce,j,ee,K,R,Re),K.side=0,K.needsUpdate=!0,_.renderBufferDirect(ce,j,ee,K,R,Re),K.side=2):_.renderBufferDirect(ce,j,ee,K,R,Re),R.onAfterRender(_,j,ce,ee,K,Re)}function nn(R,j,ce){j.isScene!==!0&&(j=dt);const ee=le.get(R),K=p.state.lights,Re=p.state.shadowsArray,ge=K.state.version,ze=Fe.getParameters(R,K.state,Re,j,ce),et=Fe.getProgramCacheKey(ze);let pt=ee.programs;ee.environment=R.isMeshStandardMaterial?j.environment:null,ee.fog=j.fog,ee.envMap=(R.isMeshStandardMaterial?k:E).get(R.envMap||ee.environment),ee.envMapRotation=ee.environment!==null&&R.envMap===null?j.environmentRotation:R.envMapRotation,pt===void 0&&(R.addEventListener("dispose",We),pt=new Map,ee.programs=pt);let yt=pt.get(et);if(yt!==void 0){if(ee.currentProgram===yt&&ee.lightsStateVersion===ge)return vi(R,ze),yt}else ze.uniforms=Fe.getUniforms(R),R.onBeforeCompile(ze,_),yt=Fe.acquireProgram(ze,et),pt.set(et,yt),ee.uniforms=ze.uniforms;const Xe=ee.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Xe.clippingPlanes=Se.uniform),vi(R,ze),ee.needsLights=si(R),ee.lightsStateVersion=ge,ee.needsLights&&(Xe.ambientLightColor.value=K.state.ambient,Xe.lightProbe.value=K.state.probe,Xe.directionalLights.value=K.state.directional,Xe.directionalLightShadows.value=K.state.directionalShadow,Xe.spotLights.value=K.state.spot,Xe.spotLightShadows.value=K.state.spotShadow,Xe.rectAreaLights.value=K.state.rectArea,Xe.ltc_1.value=K.state.rectAreaLTC1,Xe.ltc_2.value=K.state.rectAreaLTC2,Xe.pointLights.value=K.state.point,Xe.pointLightShadows.value=K.state.pointShadow,Xe.hemisphereLights.value=K.state.hemi,Xe.directionalShadowMap.value=K.state.directionalShadowMap,Xe.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Xe.spotShadowMap.value=K.state.spotShadowMap,Xe.spotLightMatrix.value=K.state.spotLightMatrix,Xe.spotLightMap.value=K.state.spotLightMap,Xe.pointShadowMap.value=K.state.pointShadowMap,Xe.pointShadowMatrix.value=K.state.pointShadowMatrix),ee.currentProgram=yt,ee.uniformsList=null,yt}function Xn(R){if(R.uniformsList===null){const j=R.currentProgram.getUniforms();R.uniformsList=Pa.seqWithValue(j.seq,R.uniforms)}return R.uniformsList}function vi(R,j){const ce=le.get(R);ce.outputColorSpace=j.outputColorSpace,ce.batching=j.batching,ce.batchingColor=j.batchingColor,ce.instancing=j.instancing,ce.instancingColor=j.instancingColor,ce.instancingMorph=j.instancingMorph,ce.skinning=j.skinning,ce.morphTargets=j.morphTargets,ce.morphNormals=j.morphNormals,ce.morphColors=j.morphColors,ce.morphTargetsCount=j.morphTargetsCount,ce.numClippingPlanes=j.numClippingPlanes,ce.numIntersection=j.numClipIntersection,ce.vertexAlphas=j.vertexAlphas,ce.vertexTangents=j.vertexTangents,ce.toneMapping=j.toneMapping}function xn(R,j,ce,ee,K){j.isScene!==!0&&(j=dt),C.resetTextureUnits();const Re=j.fog,ge=ee.isMeshStandardMaterial?j.environment:null,ze=A===null?_.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Zn,et=(ee.isMeshStandardMaterial?k:E).get(ee.envMap||ge),pt=ee.vertexColors===!0&&!!ce.attributes.color&&ce.attributes.color.itemSize===4,yt=!!ce.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),Xe=!!ce.morphAttributes.position,Ct=!!ce.morphAttributes.normal,Nt=!!ce.morphAttributes.color;let Et=0;ee.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Et=_.toneMapping);const Je=ce.morphAttributes.position||ce.morphAttributes.normal||ce.morphAttributes.color,Gt=Je!==void 0?Je.length:0,Oe=le.get(ee),Tt=p.state.lights;if(pe===!0&&(De===!0||R!==S)){const _n=R===S&&ee.id===y;Se.setState(ee,R,_n)}let wt=!1;ee.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==Tt.state.version||Oe.outputColorSpace!==ze||K.isBatchedMesh&&Oe.batching===!1||!K.isBatchedMesh&&Oe.batching===!0||K.isBatchedMesh&&Oe.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&Oe.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&Oe.instancing===!1||!K.isInstancedMesh&&Oe.instancing===!0||K.isSkinnedMesh&&Oe.skinning===!1||!K.isSkinnedMesh&&Oe.skinning===!0||K.isInstancedMesh&&Oe.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Oe.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Oe.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Oe.instancingMorph===!1&&K.morphTexture!==null||Oe.envMap!==et||ee.fog===!0&&Oe.fog!==Re||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==Se.numPlanes||Oe.numIntersection!==Se.numIntersection)||Oe.vertexAlphas!==pt||Oe.vertexTangents!==yt||Oe.morphTargets!==Xe||Oe.morphNormals!==Ct||Oe.morphColors!==Nt||Oe.toneMapping!==Et||Oe.morphTargetsCount!==Gt)&&(wt=!0):(wt=!0,Oe.__version=ee.version);let Ut=Oe.currentProgram;wt===!0&&(Ut=nn(ee,j,K));let Ot=!1,dn=!1,kn=!1;const Kt=Ut.getUniforms(),en=Oe.uniforms;if(rt.useProgram(Ut.program)&&(Ot=!0,dn=!0,kn=!0),ee.id!==y&&(y=ee.id,dn=!0),Ot||S!==R){rt.buffers.depth.getReversed()?(_e.copy(R.projectionMatrix),Lu(_e),Iu(_e),Kt.setValue(W,"projectionMatrix",_e)):Kt.setValue(W,"projectionMatrix",R.projectionMatrix),Kt.setValue(W,"viewMatrix",R.matrixWorldInverse);const An=Kt.map.cameraPosition;An!==void 0&&An.setValue(W,it.setFromMatrixPosition(R.matrixWorld)),at.logarithmicDepthBuffer&&Kt.setValue(W,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&Kt.setValue(W,"isOrthographic",R.isOrthographicCamera===!0),S!==R&&(S=R,dn=!0,kn=!0)}if(K.isSkinnedMesh){Kt.setOptional(W,K,"bindMatrix"),Kt.setOptional(W,K,"bindMatrixInverse");const _n=K.skeleton;_n&&(_n.boneTexture===null&&_n.computeBoneTexture(),Kt.setValue(W,"boneTexture",_n.boneTexture,C))}K.isBatchedMesh&&(Kt.setOptional(W,K,"batchingTexture"),Kt.setValue(W,"batchingTexture",K._matricesTexture,C),Kt.setOptional(W,K,"batchingIdTexture"),Kt.setValue(W,"batchingIdTexture",K._indirectTexture,C),Kt.setOptional(W,K,"batchingColorTexture"),K._colorsTexture!==null&&Kt.setValue(W,"batchingColorTexture",K._colorsTexture,C));const jn=ce.morphAttributes;if((jn.position!==void 0||jn.normal!==void 0||jn.color!==void 0)&&ot.update(K,ce,Ut),(dn||Oe.receiveShadow!==K.receiveShadow)&&(Oe.receiveShadow=K.receiveShadow,Kt.setValue(W,"receiveShadow",K.receiveShadow)),ee.isMeshGouraudMaterial&&ee.envMap!==null&&(en.envMap.value=et,en.flipEnvMap.value=et.isCubeTexture&&et.isRenderTargetTexture===!1?-1:1),ee.isMeshStandardMaterial&&ee.envMap===null&&j.environment!==null&&(en.envMapIntensity.value=j.environmentIntensity),dn&&(Kt.setValue(W,"toneMappingExposure",_.toneMappingExposure),Oe.needsLights&&ii(en,kn),Re&&ee.fog===!0&&xe.refreshFogUniforms(en,Re),xe.refreshMaterialUniforms(en,ee,G,q,p.state.transmissionRenderTarget[R.id]),Pa.upload(W,Xn(Oe),en,C)),ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(Pa.upload(W,Xn(Oe),en,C),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&Kt.setValue(W,"center",K.center),Kt.setValue(W,"modelViewMatrix",K.modelViewMatrix),Kt.setValue(W,"normalMatrix",K.normalMatrix),Kt.setValue(W,"modelMatrix",K.matrixWorld),ee.isShaderMaterial||ee.isRawShaderMaterial){const _n=ee.uniformsGroups;for(let An=0,Yt=_n.length;An<Yt;An++){const Bt=_n[An];X.update(Bt,Ut),X.bind(Bt,Ut)}}return Ut}function ii(R,j){R.ambientLightColor.needsUpdate=j,R.lightProbe.needsUpdate=j,R.directionalLights.needsUpdate=j,R.directionalLightShadows.needsUpdate=j,R.pointLights.needsUpdate=j,R.pointLightShadows.needsUpdate=j,R.spotLights.needsUpdate=j,R.spotLightShadows.needsUpdate=j,R.rectAreaLights.needsUpdate=j,R.hemisphereLights.needsUpdate=j}function si(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(R,j,ce){le.get(R.texture).__webglTexture=j,le.get(R.depthTexture).__webglTexture=ce;const ee=le.get(R);ee.__hasExternalTextures=!0,ee.__autoAllocateDepthBuffer=ce===void 0,ee.__autoAllocateDepthBuffer||_t.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ee.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,j){const ce=le.get(R);ce.__webglFramebuffer=j,ce.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(R,j=0,ce=0){A=R,T=j,L=ce;let ee=!0,K=null,Re=!1,ge=!1;if(R){const et=le.get(R);if(et.__useDefaultFramebuffer!==void 0)rt.bindFramebuffer(W.FRAMEBUFFER,null),ee=!1;else if(et.__webglFramebuffer===void 0)C.setupRenderTarget(R);else if(et.__hasExternalTextures)C.rebindTextures(R,le.get(R.texture).__webglTexture,le.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Xe=R.depthTexture;if(et.__boundDepthTexture!==Xe){if(Xe!==null&&le.has(Xe)&&(R.width!==Xe.image.width||R.height!==Xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(R)}}const pt=R.texture;(pt.isData3DTexture||pt.isDataArrayTexture||pt.isCompressedArrayTexture)&&(ge=!0);const yt=le.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(yt[j])?K=yt[j][ce]:K=yt[j],Re=!0):R.samples>0&&C.useMultisampledRTT(R)===!1?K=le.get(R).__webglMultisampledFramebuffer:Array.isArray(yt)?K=yt[ce]:K=yt,I.copy(R.viewport),z.copy(R.scissor),B=R.scissorTest}else I.copy($).multiplyScalar(G).floor(),z.copy(ve).multiplyScalar(G).floor(),B=Le;if(rt.bindFramebuffer(W.FRAMEBUFFER,K)&&ee&&rt.drawBuffers(R,K),rt.viewport(I),rt.scissor(z),rt.setScissorTest(B),Re){const et=le.get(R.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+j,et.__webglTexture,ce)}else if(ge){const et=le.get(R.texture),pt=j||0;W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,et.__webglTexture,ce||0,pt)}y=-1},this.readRenderTargetPixels=function(R,j,ce,ee,K,Re,ge){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ze=le.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ge!==void 0&&(ze=ze[ge]),ze){rt.bindFramebuffer(W.FRAMEBUFFER,ze);try{const et=R.texture,pt=et.format,yt=et.type;if(!at.textureFormatReadable(pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!at.textureTypeReadable(yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=R.width-ee&&ce>=0&&ce<=R.height-K&&W.readPixels(j,ce,ee,K,gt.convert(pt),gt.convert(yt),Re)}finally{const et=A!==null?le.get(A).__webglFramebuffer:null;rt.bindFramebuffer(W.FRAMEBUFFER,et)}}},this.readRenderTargetPixelsAsync=async function(R,j,ce,ee,K,Re,ge){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ze=le.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ge!==void 0&&(ze=ze[ge]),ze){const et=R.texture,pt=et.format,yt=et.type;if(!at.textureFormatReadable(pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!at.textureTypeReadable(yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(j>=0&&j<=R.width-ee&&ce>=0&&ce<=R.height-K){rt.bindFramebuffer(W.FRAMEBUFFER,ze);const Xe=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,Xe),W.bufferData(W.PIXEL_PACK_BUFFER,Re.byteLength,W.STREAM_READ),W.readPixels(j,ce,ee,K,gt.convert(pt),gt.convert(yt),0);const Ct=A!==null?le.get(A).__webglFramebuffer:null;rt.bindFramebuffer(W.FRAMEBUFFER,Ct);const Nt=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await Pu(W,Nt,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,Xe),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,Re),W.deleteBuffer(Xe),W.deleteSync(Nt),Re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,j=null,ce=0){R.isTexture!==!0&&(Lr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),j=arguments[0]||null,R=arguments[1]);const ee=Math.pow(2,-ce),K=Math.floor(R.image.width*ee),Re=Math.floor(R.image.height*ee),ge=j!==null?j.x:0,ze=j!==null?j.y:0;C.setTexture2D(R,0),W.copyTexSubImage2D(W.TEXTURE_2D,ce,0,0,ge,ze,K,Re),rt.unbindTexture()},this.copyTextureToTexture=function(R,j,ce=null,ee=null,K=0){R.isTexture!==!0&&(Lr("WebGLRenderer: copyTextureToTexture function signature has changed."),ee=arguments[0]||null,R=arguments[1],j=arguments[2],K=arguments[3]||0,ce=null);let Re,ge,ze,et,pt,yt,Xe,Ct,Nt;const Et=R.isCompressedTexture?R.mipmaps[K]:R.image;ce!==null?(Re=ce.max.x-ce.min.x,ge=ce.max.y-ce.min.y,ze=ce.isBox3?ce.max.z-ce.min.z:1,et=ce.min.x,pt=ce.min.y,yt=ce.isBox3?ce.min.z:0):(Re=Et.width,ge=Et.height,ze=Et.depth||1,et=0,pt=0,yt=0),ee!==null?(Xe=ee.x,Ct=ee.y,Nt=ee.z):(Xe=0,Ct=0,Nt=0);const Je=gt.convert(j.format),Gt=gt.convert(j.type);let Oe;j.isData3DTexture?(C.setTexture3D(j,0),Oe=W.TEXTURE_3D):j.isDataArrayTexture||j.isCompressedArrayTexture?(C.setTexture2DArray(j,0),Oe=W.TEXTURE_2D_ARRAY):(C.setTexture2D(j,0),Oe=W.TEXTURE_2D),W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,j.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,j.unpackAlignment);const Tt=W.getParameter(W.UNPACK_ROW_LENGTH),wt=W.getParameter(W.UNPACK_IMAGE_HEIGHT),Ut=W.getParameter(W.UNPACK_SKIP_PIXELS),Ot=W.getParameter(W.UNPACK_SKIP_ROWS),dn=W.getParameter(W.UNPACK_SKIP_IMAGES);W.pixelStorei(W.UNPACK_ROW_LENGTH,Et.width),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,Et.height),W.pixelStorei(W.UNPACK_SKIP_PIXELS,et),W.pixelStorei(W.UNPACK_SKIP_ROWS,pt),W.pixelStorei(W.UNPACK_SKIP_IMAGES,yt);const kn=R.isDataArrayTexture||R.isData3DTexture,Kt=j.isDataArrayTexture||j.isData3DTexture;if(R.isRenderTargetTexture||R.isDepthTexture){const en=le.get(R),jn=le.get(j),_n=le.get(en.__renderTarget),An=le.get(jn.__renderTarget);rt.bindFramebuffer(W.READ_FRAMEBUFFER,_n.__webglFramebuffer),rt.bindFramebuffer(W.DRAW_FRAMEBUFFER,An.__webglFramebuffer);for(let Yt=0;Yt<ze;Yt++)kn&&W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,le.get(R).__webglTexture,K,yt+Yt),R.isDepthTexture?(Kt&&W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,le.get(j).__webglTexture,K,Nt+Yt),W.blitFramebuffer(et,pt,Re,ge,Xe,Ct,Re,ge,W.DEPTH_BUFFER_BIT,W.NEAREST)):Kt?W.copyTexSubImage3D(Oe,K,Xe,Ct,Nt+Yt,et,pt,Re,ge):W.copyTexSubImage2D(Oe,K,Xe,Ct,Nt+Yt,et,pt,Re,ge);rt.bindFramebuffer(W.READ_FRAMEBUFFER,null),rt.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else Kt?R.isDataTexture||R.isData3DTexture?W.texSubImage3D(Oe,K,Xe,Ct,Nt,Re,ge,ze,Je,Gt,Et.data):j.isCompressedArrayTexture?W.compressedTexSubImage3D(Oe,K,Xe,Ct,Nt,Re,ge,ze,Je,Et.data):W.texSubImage3D(Oe,K,Xe,Ct,Nt,Re,ge,ze,Je,Gt,Et):R.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,K,Xe,Ct,Re,ge,Je,Gt,Et.data):R.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,K,Xe,Ct,Et.width,Et.height,Je,Et.data):W.texSubImage2D(W.TEXTURE_2D,K,Xe,Ct,Re,ge,Je,Gt,Et);W.pixelStorei(W.UNPACK_ROW_LENGTH,Tt),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,wt),W.pixelStorei(W.UNPACK_SKIP_PIXELS,Ut),W.pixelStorei(W.UNPACK_SKIP_ROWS,Ot),W.pixelStorei(W.UNPACK_SKIP_IMAGES,dn),K===0&&j.generateMipmaps&&W.generateMipmap(Oe),rt.unbindTexture()},this.copyTextureToTexture3D=function(R,j,ce=null,ee=null,K=0){return R.isTexture!==!0&&(Lr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ce=arguments[0]||null,ee=arguments[1]||null,R=arguments[2],j=arguments[3],K=arguments[4]||0),Lr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,j,ce,ee,K)},this.initRenderTarget=function(R){le.get(R).__webglFramebuffer===void 0&&C.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?C.setTextureCube(R,0):R.isData3DTexture?C.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?C.setTexture2DArray(R,0):C.setTexture2D(R,0),rt.unbindTexture()},this.resetState=function(){T=0,L=0,A=null,rt.reset(),Ft.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Jt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Jt._getUnpackColorSpace()}}class _l extends pn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fi,this.environmentIntensity=1,this.environmentRotation=new fi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Ch{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=Ai()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ai()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ai()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Kn=new N;class zr{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Kn.fromBufferAttribute(this,t),Kn.applyMatrix4(e),this.setXYZ(t,Kn.x,Kn.y,Kn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kn.fromBufferAttribute(this,t),Kn.applyNormalMatrix(e),this.setXYZ(t,Kn.x,Kn.y,Kn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kn.fromBufferAttribute(this,t),Kn.transformDirection(e),this.setXYZ(t,Kn.x,Kn.y,Kn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=wi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=sn(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=sn(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=sn(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=sn(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=sn(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=wi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=wi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=wi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=wi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array),i=sn(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array),i=sn(i,this.array),r=sn(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new $t(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new zr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ph extends _i{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new nt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let js;const vr=new N,qs=new N,Ks=new N,Ys=new He,xr=new He,Lh=new tt,ha=new N,yr=new N,ua=new N,vl=new He,wo=new He,xl=new He;class Vg extends pn{constructor(e=new Ph){if(super(),this.isSprite=!0,this.type="Sprite",js===void 0){js=new cn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ch(t,5);js.setIndex([0,1,2,0,2,3]),js.setAttribute("position",new zr(n,3,0,!1)),js.setAttribute("uv",new zr(n,2,3,!1))}this.geometry=js,this.material=e,this.center=new He(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),qs.setFromMatrixScale(this.matrixWorld),Lh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ks.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&qs.multiplyScalar(-Ks.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;da(ha.set(-.5,-.5,0),Ks,a,qs,i,r),da(yr.set(.5,-.5,0),Ks,a,qs,i,r),da(ua.set(.5,.5,0),Ks,a,qs,i,r),vl.set(0,0),wo.set(1,0),xl.set(1,1);let o=e.ray.intersectTriangle(ha,yr,ua,!1,vr);if(o===null&&(da(yr.set(-.5,.5,0),Ks,a,qs,i,r),wo.set(0,1),o=e.ray.intersectTriangle(ha,ua,yr,!1,vr),o===null))return;const c=e.ray.origin.distanceTo(vr);c<e.near||c>e.far||t.push({distance:c,point:vr.clone(),uv:bi.getInterpolation(vr,ha,yr,ua,vl,wo,xl,new He),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function da(s,e,t,n,i,r){Ys.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(xr.x=r*Ys.x-i*Ys.y,xr.y=i*Ys.x+r*Ys.y):xr.copy(Ys),s.copy(e),s.x+=xr.x,s.y+=xr.y,s.applyMatrix4(Lh)}const yl=new N,Ml=new Zt,Sl=new Zt,Wg=new N,El=new tt,fa=new N,Ao=new Ni,wl=new tt,To=new Ga;class Xg extends Ge{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ec,this.bindMatrix=new tt,this.bindMatrixInverse=new tt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Nn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fa),this.boundingBox.expandByPoint(fa)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ni),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fa),this.boundingSphere.expandByPoint(fa)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ao.copy(this.boundingSphere),Ao.applyMatrix4(i),e.ray.intersectsSphere(Ao)!==!1&&(wl.copy(i).invert(),To.copy(e.ray).applyMatrix4(wl),!(this.boundingBox!==null&&To.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,To)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Zt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ec?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===uu?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Ml.fromBufferAttribute(i.attributes.skinIndex,e),Sl.fromBufferAttribute(i.attributes.skinWeight,e),yl.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=Sl.getComponent(r);if(a!==0){const o=Ml.getComponent(r);El.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Wg.copy(yl).applyMatrix4(El),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Ih extends pn{constructor(){super(),this.isBone=!0,this.type="Bone"}}class uc extends wn{constructor(e=null,t=1,n=1,i,r,a,o,c,l=1003,u=1003,h,d){super(null,a,o,c,l,u,i,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Al=new tt,jg=new tt;class dc{constructor(e=[],t=[]){this.uuid=Ai(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new tt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new tt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:jg;Al.multiplyMatrices(o,t[r]),Al.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new dc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new uc(t,e,e,1023,1015);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Ih),this.bones.push(a),this.boneInverses.push(new tt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class Yo extends $t{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Js=new tt,Tl=new tt,pa=[],Rl=new Nn,qg=new tt,Mr=new Ge,Sr=new Ni;class ni extends Ge{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Yo(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,qg)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Nn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Js),Rl.copy(e.boundingBox).applyMatrix4(Js),this.boundingBox.union(Rl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ni),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Js),Sr.copy(e.boundingSphere).applyMatrix4(Js),this.boundingSphere.union(Sr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Mr.geometry=this.geometry,Mr.material=this.material,Mr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Sr.copy(this.boundingSphere),Sr.applyMatrix4(n),e.ray.intersectsSphere(Sr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Js),Tl.multiplyMatrices(n,Js),Mr.matrixWorld=Tl,Mr.raycast(e,pa);for(let a=0,o=pa.length;a<o;a++){const c=pa[a];c.instanceId=r,c.object=this,t.push(c)}pa.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Yo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new uc(new Float32Array(i*this.count),i,this.count,1028,1015));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Dh extends _i{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ia=new N,Da=new N,Cl=new tt,Er=new Ga,ma=new Ni,Ro=new N,Pl=new N;class fc extends pn{constructor(e=new cn,t=new Dh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Ia.fromBufferAttribute(t,i-1),Da.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Ia.distanceTo(Da);e.setAttribute("lineDistance",new zt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ma.copy(n.boundingSphere),ma.applyMatrix4(i),ma.radius+=r,e.ray.intersectsSphere(ma)===!1)return;Cl.copy(i).invert(),Er.copy(e.ray).applyMatrix4(Cl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),b=Math.min(u.count,a.start+a.count);for(let v=f,m=b-1;v<m;v+=l){const p=u.getX(v),x=u.getX(v+1),M=ga(this,e,Er,c,p,x);M&&t.push(M)}if(this.isLineLoop){const v=u.getX(b-1),m=u.getX(f),p=ga(this,e,Er,c,v,m);p&&t.push(p)}}else{const f=Math.max(0,a.start),b=Math.min(d.count,a.start+a.count);for(let v=f,m=b-1;v<m;v+=l){const p=ga(this,e,Er,c,v,v+1);p&&t.push(p)}if(this.isLineLoop){const v=ga(this,e,Er,c,b-1,f);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ga(s,e,t,n,i,r){const a=s.geometry.attributes.position;if(Ia.fromBufferAttribute(a,i),Da.fromBufferAttribute(a,r),t.distanceSqToSegment(Ia,Da,Ro,Pl)>n)return;Ro.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Ro);if(!(c<e.near||c>e.far))return{distance:c,point:Pl.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const Ll=new N,Il=new N;class Kg extends fc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Ll.fromBufferAttribute(t,i),Il.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ll.distanceTo(Il);e.setAttribute("lineDistance",new zt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Yg extends fc{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Fh extends _i{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new nt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Dl=new tt,Jo=new Ga,ba=new Ni,_a=new N;class Jg extends pn{constructor(e=new cn,t=new Fh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ba.copy(n.boundingSphere),ba.applyMatrix4(i),ba.radius+=r,e.ray.intersectsSphere(ba)===!1)return;Dl.copy(i).invert(),Jo.copy(e.ray).applyMatrix4(Dl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let b=d,v=f;b<v;b++){const m=l.getX(b);_a.fromBufferAttribute(h,m),Fl(_a,m,c,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let b=d,v=f;b<v;b++)_a.fromBufferAttribute(h,b),Fl(_a,b,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Fl(s,e,t,n,i,r,a){const o=Jo.distanceSqToPoint(s);if(o<t){const c=new N;Jo.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Jn extends wn{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ui{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(r-1);const u=n[i],d=n[i+1]-u,f=(a-u)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),c=t||(a.isVector2?new He:new N);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new N,i=[],r=[],a=[],o=new N,c=new tt;for(let f=0;f<=e;f++){const b=f/e;i[f]=this.getTangentAt(b,new N)}r[0]=new N,a[0]=new N;let l=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),d=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const b=Math.acos(Tn(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,b))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(Tn(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let b=1;b<=e;b++)r[b].applyMatrix4(c.makeRotationAxis(i[b],f*b)),a[b].crossVectors(i[b],r[b])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class pc extends Ui{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new He){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*u-f*h+this.aX,l=d*h+f*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Zg extends pc{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function mc(){let s=0,e=0,t=0,n=0;function i(r,a,o,c){s=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){i(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,h){let d=(a-r)/l-(o-r)/(l+u)+(o-a)/u,f=(o-a)/u-(c-a)/(u+h)+(c-o)/h;d*=u,f*=u,i(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return s+e*r+t*a+n*o}}}const va=new N,Co=new mc,Po=new mc,Lo=new mc;class Wa extends Ui{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new N){const n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=i[(o-1)%r]:(va.subVectors(i[0],i[1]).add(i[0]),l=va);const h=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?u=i[(o+2)%r]:(va.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=va),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let b=Math.pow(l.distanceToSquared(h),f),v=Math.pow(h.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(u),f);v<1e-4&&(v=1),b<1e-4&&(b=v),m<1e-4&&(m=v),Co.initNonuniformCatmullRom(l.x,h.x,d.x,u.x,b,v,m),Po.initNonuniformCatmullRom(l.y,h.y,d.y,u.y,b,v,m),Lo.initNonuniformCatmullRom(l.z,h.z,d.z,u.z,b,v,m)}else this.curveType==="catmullrom"&&(Co.initCatmullRom(l.x,h.x,d.x,u.x,this.tension),Po.initCatmullRom(l.y,h.y,d.y,u.y,this.tension),Lo.initCatmullRom(l.z,h.z,d.z,u.z,this.tension));return n.set(Co.calc(c),Po.calc(c),Lo.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new N().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Nl(s,e,t,n,i){const r=(n-e)*.5,a=(i-t)*.5,o=s*s,c=s*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*s+t}function Qg(s,e){const t=1-s;return t*t*e}function $g(s,e){return 2*(1-s)*s*e}function e0(s,e){return s*s*e}function Nr(s,e,t,n){return Qg(s,e)+$g(s,t)+e0(s,n)}function t0(s,e){const t=1-s;return t*t*t*e}function n0(s,e){const t=1-s;return 3*t*t*s*e}function i0(s,e){return 3*(1-s)*s*s*e}function s0(s,e){return s*s*s*e}function Ur(s,e,t,n,i){return t0(s,e)+n0(s,t)+i0(s,n)+s0(s,i)}class Nh extends Ui{constructor(e=new He,t=new He,n=new He,i=new He){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new He){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ur(e,i.x,r.x,a.x,o.x),Ur(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class r0 extends Ui{constructor(e=new N,t=new N,n=new N,i=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new N){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ur(e,i.x,r.x,a.x,o.x),Ur(e,i.y,r.y,a.y,o.y),Ur(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Uh extends Ui{constructor(e=new He,t=new He){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new He){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new He){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Oh extends Ui{constructor(e=new N,t=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new N){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new N){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Bh extends Ui{constructor(e=new He,t=new He,n=new He){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new He){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(Nr(e,i.x,r.x,a.x),Nr(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class kh extends Ui{constructor(e=new N,t=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new N){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(Nr(e,i.x,r.x,a.x),Nr(e,i.y,r.y,a.y),Nr(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class zh extends Ui{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new He){const n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,c=i[a===0?a:a-1],l=i[a],u=i[a>i.length-2?i.length-1:a+1],h=i[a>i.length-3?i.length-1:a+2];return n.set(Nl(o,c.x,l.x,u.x,h.x),Nl(o,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new He().fromArray(i))}return this}}var Zo=Object.freeze({__proto__:null,ArcCurve:Zg,CatmullRomCurve3:Wa,CubicBezierCurve:Nh,CubicBezierCurve3:r0,EllipseCurve:pc,LineCurve:Uh,LineCurve3:Oh,QuadraticBezierCurve:Bh,QuadraticBezierCurve3:kh,SplineCurve:zh});class Gh extends Ui{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Zo[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Zo[i.type]().fromJSON(i))}return this}}class a0 extends Gh{constructor(e){super(),this.type="Path",this.currentPoint=new He,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Uh(this.currentPoint.clone(),new He(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new Bh(this.currentPoint.clone(),new He(e,t),new He(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,a){const o=new Nh(this.currentPoint.clone(),new He(e,t),new He(n,i),new He(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new zh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,r,a),this}absarc(e,t,n,i,r,a){return this.absellipse(e,t,n,n,i,r,a),this}ellipse(e,t,n,i,r,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,i,r,a,o,c),this}absellipse(e,t,n,i,r,a,o,c){const l=new pc(e,t,n,i,r,a,o,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class gc extends cn{constructor(e=[new He(0,-.5),new He(.5,0),new He(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Tn(i,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],u=1/t,h=new N,d=new He,f=new N,b=new N,v=new N;let m=0,p=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-m,f.z=p*0,v.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(v.x,v.y,v.z);break;default:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-m,f.z=p*0,b.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),c.push(f.x,f.y,f.z),v.copy(b)}for(let x=0;x<=t;x++){const M=n+x*u*i,_=Math.sin(M),D=Math.cos(M);for(let T=0;T<=e.length-1;T++){h.x=e[T].x*_,h.y=e[T].y,h.z=e[T].x*D,a.push(h.x,h.y,h.z),d.x=x/t,d.y=T/(e.length-1),o.push(d.x,d.y);const L=c[3*T+0]*_,A=c[3*T+1],y=c[3*T+0]*D;l.push(L,A,y)}}for(let x=0;x<t;x++)for(let M=0;M<e.length-1;M++){const _=M+x*e.length,D=_,T=_+e.length,L=_+e.length+1,A=_+1;r.push(D,T,A),r.push(L,A,T)}this.setIndex(r),this.setAttribute("position",new zt(a,3)),this.setAttribute("uv",new zt(o,2)),this.setAttribute("normal",new zt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gc(e.points,e.segments,e.phiStart,e.phiLength)}}class bc extends gc{constructor(e=1,t=1,n=4,i=8){const r=new a0;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new bc(e.radius,e.length,e.capSegments,e.radialSegments)}}class Xa extends cn{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new N,u=new He;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const f=n+h/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[d]/e+1)/2,u.y=(a[d+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new zt(a,3)),this.setAttribute("normal",new zt(o,3)),this.setAttribute("uv",new zt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xa(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class hn extends cn{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const u=[],h=[],d=[],f=[];let b=0;const v=[],m=n/2;let p=0;x(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new zt(h,3)),this.setAttribute("normal",new zt(d,3)),this.setAttribute("uv",new zt(f,2));function x(){const _=new N,D=new N;let T=0;const L=(t-e)/n;for(let A=0;A<=r;A++){const y=[],S=A/r,I=S*(t-e)+e;for(let z=0;z<=i;z++){const B=z/i,Y=B*c+o,re=Math.sin(Y),F=Math.cos(Y);D.x=I*re,D.y=-S*n+m,D.z=I*F,h.push(D.x,D.y,D.z),_.set(re,L,F).normalize(),d.push(_.x,_.y,_.z),f.push(B,1-S),y.push(b++)}v.push(y)}for(let A=0;A<i;A++)for(let y=0;y<r;y++){const S=v[y][A],I=v[y+1][A],z=v[y+1][A+1],B=v[y][A+1];(e>0||y!==0)&&(u.push(S,I,B),T+=3),(t>0||y!==r-1)&&(u.push(I,z,B),T+=3)}l.addGroup(p,T,0),p+=T}function M(_){const D=b,T=new He,L=new N;let A=0;const y=_===!0?e:t,S=_===!0?1:-1;for(let z=1;z<=i;z++)h.push(0,m*S,0),d.push(0,S,0),f.push(.5,.5),b++;const I=b;for(let z=0;z<=i;z++){const Y=z/i*c+o,re=Math.cos(Y),F=Math.sin(Y);L.x=y*F,L.y=m*S,L.z=y*re,h.push(L.x,L.y,L.z),d.push(0,S,0),T.x=re*.5+.5,T.y=F*.5*S+.5,f.push(T.x,T.y),b++}for(let z=0;z<i;z++){const B=D+z,Y=I+z;_===!0?u.push(Y,Y+1,B):u.push(Y+1,Y,B),A+=3}l.addGroup(p,A,_===!0?1:2),p+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Fa extends hn{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Fa(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class _c extends cn{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],a=[];o(i),l(n),u(),this.setAttribute("position",new zt(r,3)),this.setAttribute("normal",new zt(r.slice(),3)),this.setAttribute("uv",new zt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const M=new N,_=new N,D=new N;for(let T=0;T<t.length;T+=3)f(t[T+0],M),f(t[T+1],_),f(t[T+2],D),c(M,_,D,x)}function c(x,M,_,D){const T=D+1,L=[];for(let A=0;A<=T;A++){L[A]=[];const y=x.clone().lerp(_,A/T),S=M.clone().lerp(_,A/T),I=T-A;for(let z=0;z<=I;z++)z===0&&A===T?L[A][z]=y:L[A][z]=y.clone().lerp(S,z/I)}for(let A=0;A<T;A++)for(let y=0;y<2*(T-A)-1;y++){const S=Math.floor(y/2);y%2===0?(d(L[A][S+1]),d(L[A+1][S]),d(L[A][S])):(d(L[A][S+1]),d(L[A+1][S+1]),d(L[A+1][S]))}}function l(x){const M=new N;for(let _=0;_<r.length;_+=3)M.x=r[_+0],M.y=r[_+1],M.z=r[_+2],M.normalize().multiplyScalar(x),r[_+0]=M.x,r[_+1]=M.y,r[_+2]=M.z}function u(){const x=new N;for(let M=0;M<r.length;M+=3){x.x=r[M+0],x.y=r[M+1],x.z=r[M+2];const _=m(x)/2/Math.PI+.5,D=p(x)/Math.PI+.5;a.push(_,1-D)}b(),h()}function h(){for(let x=0;x<a.length;x+=6){const M=a[x+0],_=a[x+2],D=a[x+4],T=Math.max(M,_,D),L=Math.min(M,_,D);T>.9&&L<.1&&(M<.2&&(a[x+0]+=1),_<.2&&(a[x+2]+=1),D<.2&&(a[x+4]+=1))}}function d(x){r.push(x.x,x.y,x.z)}function f(x,M){const _=x*3;M.x=e[_+0],M.y=e[_+1],M.z=e[_+2]}function b(){const x=new N,M=new N,_=new N,D=new N,T=new He,L=new He,A=new He;for(let y=0,S=0;y<r.length;y+=9,S+=6){x.set(r[y+0],r[y+1],r[y+2]),M.set(r[y+3],r[y+4],r[y+5]),_.set(r[y+6],r[y+7],r[y+8]),T.set(a[S+0],a[S+1]),L.set(a[S+2],a[S+3]),A.set(a[S+4],a[S+5]),D.copy(x).add(M).add(_).divideScalar(3);const I=m(D);v(T,S+0,x,I),v(L,S+2,M,I),v(A,S+4,_,I)}}function v(x,M,_,D){D<0&&x.x===1&&(a[M]=x.x-1),_.x===0&&_.z===0&&(a[M]=D/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _c(e.vertices,e.indices,e.radius,e.details)}}class ui extends _c{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ui(e.radius,e.detail)}}class Na extends cn{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],c=[],l=[],u=[];let h=e;const d=(t-e)/i,f=new N,b=new He;for(let v=0;v<=i;v++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=h*Math.cos(p),f.y=h*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),b.x=(f.x/t+1)/2,b.y=(f.y/t+1)/2,u.push(b.x,b.y)}h+=d}for(let v=0;v<i;v++){const m=v*(n+1);for(let p=0;p<n;p++){const x=p+m,M=x,_=x+n+1,D=x+n+2,T=x+1;o.push(M,_,T),o.push(_,D,T)}}this.setIndex(o),this.setAttribute("position",new zt(c,3)),this.setAttribute("normal",new zt(l,3)),this.setAttribute("uv",new zt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Na(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class di extends cn{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new N,d=new N,f=[],b=[],v=[],m=[];for(let p=0;p<=n;p++){const x=[],M=p/n;let _=0;p===0&&a===0?_=.5/t:p===n&&c===Math.PI&&(_=-.5/t);for(let D=0;D<=t;D++){const T=D/t;h.x=-e*Math.cos(i+T*r)*Math.sin(a+M*o),h.y=e*Math.cos(a+M*o),h.z=e*Math.sin(i+T*r)*Math.sin(a+M*o),b.push(h.x,h.y,h.z),d.copy(h).normalize(),v.push(d.x,d.y,d.z),m.push(T+_,1-M),x.push(l++)}u.push(x)}for(let p=0;p<n;p++)for(let x=0;x<t;x++){const M=u[p][x+1],_=u[p][x],D=u[p+1][x],T=u[p+1][x+1];(p!==0||a>0)&&f.push(M,_,T),(p!==n-1||c<Math.PI)&&f.push(_,D,T)}this.setIndex(f),this.setAttribute("position",new zt(b,3)),this.setAttribute("normal",new zt(v,3)),this.setAttribute("uv",new zt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new di(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ja extends cn{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],c=[],l=[],u=new N,h=new N,d=new N;for(let f=0;f<=n;f++)for(let b=0;b<=i;b++){const v=b/i*r,m=f/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(v),h.y=(e+t*Math.cos(m))*Math.sin(v),h.z=t*Math.sin(m),o.push(h.x,h.y,h.z),u.x=e*Math.cos(v),u.y=e*Math.sin(v),d.subVectors(h,u).normalize(),c.push(d.x,d.y,d.z),l.push(b/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let b=1;b<=i;b++){const v=(i+1)*f+b-1,m=(i+1)*(f-1)+b-1,p=(i+1)*(f-1)+b,x=(i+1)*f+b;a.push(v,m,x),a.push(m,p,x)}this.setIndex(a),this.setAttribute("position",new zt(o,3)),this.setAttribute("normal",new zt(c,3)),this.setAttribute("uv",new zt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ja(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class hr extends cn{constructor(e=new kh(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new N,c=new N,l=new He;let u=new N;const h=[],d=[],f=[],b=[];v(),this.setIndex(b),this.setAttribute("position",new zt(h,3)),this.setAttribute("normal",new zt(d,3)),this.setAttribute("uv",new zt(f,2));function v(){for(let M=0;M<t;M++)m(M);m(r===!1?t:0),x(),p()}function m(M){u=e.getPointAt(M/t,u);const _=a.normals[M],D=a.binormals[M];for(let T=0;T<=i;T++){const L=T/i*Math.PI*2,A=Math.sin(L),y=-Math.cos(L);c.x=y*_.x+A*D.x,c.y=y*_.y+A*D.y,c.z=y*_.z+A*D.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=u.x+n*c.x,o.y=u.y+n*c.y,o.z=u.z+n*c.z,h.push(o.x,o.y,o.z)}}function p(){for(let M=1;M<=t;M++)for(let _=1;_<=i;_++){const D=(i+1)*(M-1)+(_-1),T=(i+1)*M+(_-1),L=(i+1)*M+_,A=(i+1)*(M-1)+_;b.push(D,T,A),b.push(T,L,A)}}function x(){for(let M=0;M<=t;M++)for(let _=0;_<=i;_++)l.x=M/t,l.y=_/i,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new hr(new Zo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class ns extends _i{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new He(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Oi extends ns{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new He(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Tn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new nt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new nt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new nt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Sn extends _i{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new He(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function xa(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function o0(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function c0(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Ul(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function Hh(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class Vr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class l0 extends Vr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case 2401:r=e,o=2*t-n;break;case 2402:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case 2401:a=e,c=2*n-t;break;case 2402:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,b=(n-t)/(i-t),v=b*b,m=v*b,p=-d*m+2*d*v-d*b,x=(1+d)*m+(-1.5-2*d)*v+(-.5+d)*b+1,M=(-1-f)*m+(1.5+f)*v+.5*b,_=f*m-f*v;for(let D=0;D!==o;++D)r[D]=p*a[u+D]+x*a[l+D]+M*a[c+D]+_*a[h+D];return r}}class Vh extends Vr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(i-t),h=1-u;for(let d=0;d!==o;++d)r[d]=a[l+d]*h+a[c+d]*u;return r}}class h0 extends Vr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Bi{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=xa(t,this.TimeBufferType),this.values=xa(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:xa(e.times,Array),values:xa(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new h0(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Vh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new l0(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&o0(i))for(let o=0,c=i.length;o!==c;++o){const l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===2302,r=e.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(i)c=!0;else{const h=o*n,d=h-n,f=h+n;for(let b=0;b!==n;++b){const v=t[h+b];if(v!==t[d+b]||v!==t[f+b]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const h=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Bi.prototype.TimeBufferType=Float32Array;Bi.prototype.ValueBufferType=Float32Array;Bi.prototype.DefaultInterpolation=2301;class ur extends Bi{constructor(e,t,n){super(e,t,n)}}ur.prototype.ValueTypeName="bool";ur.prototype.ValueBufferType=Array;ur.prototype.DefaultInterpolation=2300;ur.prototype.InterpolantFactoryMethodLinear=void 0;ur.prototype.InterpolantFactoryMethodSmooth=void 0;class Wh extends Bi{}Wh.prototype.ValueTypeName="color";class rr extends Bi{}rr.prototype.ValueTypeName="number";class u0 extends Vr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t);let l=e*o;for(let u=l+o;l!==u;l+=4)bn.slerpFlat(r,0,a,l-o,a,l,c);return r}}class ar extends Bi{InterpolantFactoryMethodLinear(e){return new u0(this.times,this.values,this.getValueSize(),e)}}ar.prototype.ValueTypeName="quaternion";ar.prototype.InterpolantFactoryMethodSmooth=void 0;class dr extends Bi{constructor(e,t,n){super(e,t,n)}}dr.prototype.ValueTypeName="string";dr.prototype.ValueBufferType=Array;dr.prototype.DefaultInterpolation=2300;dr.prototype.InterpolantFactoryMethodLinear=void 0;dr.prototype.InterpolantFactoryMethodSmooth=void 0;class or extends Bi{}or.prototype.ValueTypeName="vector";class Qo{constructor(e="",t=-1,n=[],i=2500){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Ai(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(f0(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(Bi.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const u=c0(c);c=Ul(c,1,u),l=Ul(l,1,u),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new rr(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],u=l.name.match(r);if(u&&u.length>1){const h=u[1];let d=i[h];d||(i[h]=d=[]),d.push(l)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,b,v){if(f.length!==0){const m=[],p=[];Hh(f,m,p,b),m.length!==0&&v.push(new h(d,m,p))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let h=0;h<l.length;h++){const d=l[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let b;for(b=0;b<d.length;b++)if(d[b].morphTargets)for(let v=0;v<d[b].morphTargets.length;v++)f[d[b].morphTargets[v]]=-1;for(const v in f){const m=[],p=[];for(let x=0;x!==d[b].morphTargets.length;++x){const M=d[b];m.push(M.time),p.push(M.morphTarget===v?1:0)}i.push(new rr(".morphTargetInfluence["+v+"]",m,p))}c=f.length*a}else{const f=".bones["+t[h].name+"]";n(or,f+".position",d,"pos",i),n(ar,f+".quaternion",d,"rot",i),n(or,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,c,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function d0(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return rr;case"vector":case"vector2":case"vector3":case"vector4":return or;case"color":return Wh;case"quaternion":return ar;case"bool":case"boolean":return ur;case"string":return dr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function f0(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=d0(s.type);if(s.times===void 0){const t=[],n=[];Hh(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const ps={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class p0{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,r===!1&&i.onStart!==void 0&&i.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){const f=l[h],b=l[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return b}return null}}}const Xh=new p0;class fr{constructor(e){this.manager=e!==void 0?e:Xh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}fr.DEFAULT_MATERIAL_NAME="__DEFAULT";const ji={};class m0 extends Error{constructor(e,t){super(e),this.response=t}}class jh extends fr{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=ps.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(ji[e]!==void 0){ji[e].push({onLoad:t,onProgress:n,onError:i});return}ji[e]=[],ji[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=ji[e],h=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,b=f!==0;let v=0;const m=new ReadableStream({start(p){x();function x(){h.read().then(({done:M,value:_})=>{if(M)p.close();else{v+=_.byteLength;const D=new ProgressEvent("progress",{lengthComputable:b,loaded:v,total:f});for(let T=0,L=u.length;T<L;T++){const A=u[T];A.onProgress&&A.onProgress(D)}p.enqueue(_),x()}},M=>{p.error(M)})}}});return new Response(m)}else throw new m0(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(b=>f.decode(b))}}}).then(l=>{ps.add(e,l);const u=ji[e];delete ji[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(l)}}).catch(l=>{const u=ji[e];if(u===void 0)throw this.manager.itemError(e),l;delete ji[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class g0 extends fr{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=ps.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=kr("img");function c(){u(),ps.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(h){u(),i&&i(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class qh extends fr{constructor(e){super(e)}load(e,t,n,i){const r=new wn,a=new g0(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class qa extends pn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new nt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Ol extends qa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new nt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Io=new tt,Bl=new N,kl=new N;class vc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new He(512,512),this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new lc,this._frameExtents=new He(1,1),this._viewportCount=1,this._viewports=[new Zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Bl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bl),kl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(kl),t.updateMatrixWorld(),Io.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Io),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Io)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class b0 extends vc{constructor(){super(new ti(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=ir*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class _0 extends qa{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(pn.DEFAULT_UP),this.updateMatrix(),this.target=new pn,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new b0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const zl=new tt,wr=new N,Do=new N;class v0 extends vc{constructor(){super(new ti(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new He(4,2),this._viewportCount=6,this._viewports=[new Zt(2,1,1,1),new Zt(0,1,1,1),new Zt(3,1,1,1),new Zt(1,1,1,1),new Zt(3,0,1,1),new Zt(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),wr.setFromMatrixPosition(e.matrixWorld),n.position.copy(wr),Do.copy(n.position),Do.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Do),n.updateMatrixWorld(),i.makeTranslation(-wr.x,-wr.y,-wr.z),zl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zl)}}class Ka extends qa{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new v0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class x0 extends vc{constructor(){super(new Ha(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class $o extends qa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pn.DEFAULT_UP),this.updateMatrix(),this.target=new pn,this.shadow=new x0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Or{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class y0 extends fr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=ps.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return ps.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),ps.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});ps.add(e,c),r.manager.itemStart(e)}}class M0{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,a;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,r=e*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[r+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const c=t*this._origIndex;this._mixBufferRegion(n,i,c,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){o.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,a=i;r!==a;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){bn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){const a=this._workIndex*r;bn.multiplyQuaternionsFlat(e,a,e,t,e,n),bn.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,r){const a=1-i;for(let o=0;o!==r;++o){const c=t+o;e[c]=e[c]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,r){for(let a=0;a!==r;++a){const o=t+a;e[o]=e[o]+e[n+a]*i}}}const xc="\\[\\]\\.:\\/",S0=new RegExp("["+xc+"]","g"),yc="[^"+xc+"]",E0="[^"+xc.replace("\\.","")+"]",w0=/((?:WC+[\/:])*)/.source.replace("WC",yc),A0=/(WCOD+)?/.source.replace("WCOD",E0),T0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",yc),R0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",yc),C0=new RegExp("^"+w0+A0+T0+R0+"$"),P0=["material","materials","bones","map"];class L0{constructor(e,t,n){const i=n||tn.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class tn{constructor(e,t,n){this.path=t,this.parsedPath=n||tn.parseTrackName(t),this.node=tn.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new tn.Composite(e,t,n):new tn(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(S0,"")}static parseTrackName(e){const t=C0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);P0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=tn.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[i];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}tn.Composite=L0;tn.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};tn.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};tn.prototype.GetterByBindingType=[tn.prototype._getValue_direct,tn.prototype._getValue_array,tn.prototype._getValue_arrayElement,tn.prototype._getValue_toArray];tn.prototype.SetterByBindingTypeAndVersioning=[[tn.prototype._setValue_direct,tn.prototype._setValue_direct_setNeedsUpdate,tn.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[tn.prototype._setValue_array,tn.prototype._setValue_array_setNeedsUpdate,tn.prototype._setValue_array_setMatrixWorldNeedsUpdate],[tn.prototype._setValue_arrayElement,tn.prototype._setValue_arrayElement_setNeedsUpdate,tn.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[tn.prototype._setValue_fromArray,tn.prototype._setValue_fromArray_setNeedsUpdate,tn.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class I0{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const r=t.tracks,a=r.length,o=new Array(a),c={endingStart:2400,endingEnd:2400};for(let l=0;l!==a;++l){const u=r[l].createInterpolant(null);o[l]=u,u.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=2201,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,r=e._clip.duration,a=r/i,o=i/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,r=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const c=o.parameterPositions,l=o.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/a,l[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case 2501:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(a),l[u].accumulateAdditive(o);break;case 2500:default:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(a),l[u].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,r=this._loopCount;const a=n===2202;if(e===0)return r===-1?i:a&&(r&1)===1?t-i:i;if(n===2200){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){const o=Math.floor(i/t);i-=t*o,r+=Math.abs(o);const c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){const l=e<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=2401,i.endingEnd=2401):(e?i.endingStart=this.zeroSlopeAtStart?2401:2400:i.endingStart=2402,t?i.endingEnd=this.zeroSlopeAtEnd?2401:2400:i.endingEnd=2402)}_scheduleFading(e,t,n){const i=this._mixer,r=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,c=a.sampleValues;return o[0]=r,c[0]=t,o[1]=r+e,c[1]=n,this}}const D0=new Float32Array(1);class F0 extends Is{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,a=e._propertyBindings,o=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let u=l[c];u===void 0&&(u={},l[c]=u);for(let h=0;h!==r;++h){const d=i[h],f=d.name;let b=u[f];if(b!==void 0)++b.referenceCount,a[h]=b;else{if(b=a[h],b!==void 0){b._cacheIndex===null&&(++b.referenceCount,this._addInactiveBinding(b,c,f));continue}const v=t&&t._propertyBindings[h].binding.parsedPath;b=new M0(tn.create(n,f,v),d.ValueTypeName,d.getValueSize()),++b.referenceCount,this._addInactiveBinding(b,c,f),a[h]=b}o[h].resultBuffer=b.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,r=this._actionsByClip;let a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,a=this._actionsByClip,o=a[r],c=o.knownActions,l=c[c.length-1],u=e._byClipCacheIndex;l._byClipCacheIndex=u,c[u]=l,c.pop(),e._byClipCacheIndex=null;const h=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete h[d],c.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,r=this._bindings;let a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[i],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Vh(new Float32Array(2),new Float32Array(2),1,D0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const i=t||this._root,r=i.uuid;let a=typeof e=="string"?Qo.findByName(i,e):e;const o=a!==null?a.uuid:e,c=this._actionsByClip[o];let l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=2500),c!==void 0){const h=c.actionByRoot[r];if(h!==void 0&&h.blendMode===n)return h;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;const u=new I0(this,a,t,n);return this._bindAction(u,l),this._addInactiveAction(u,o,r),u}existingAction(e,t){const n=t||this._root,i=n.uuid,r=typeof e=="string"?Qo.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(i,e,r,a);const o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const a=r.knownActions;for(let o=0,c=a.length;o!==c;++o){const l=a[o];this._deactivateAction(l);const u=l._cacheIndex,h=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,c=o[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(const a in r){const o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");function Di(s,e=!1){const t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,c=new cn;let l=0;for(let u=0;u<s.length;++u){const h=s[u];let d=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in h.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(h.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in h.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(h.morphAttributes[f])}if(e){let f;if(t)f=h.index.count;else if(h.attributes.position!==void 0)f=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,u),l+=f}}if(t){let u=0;const h=[];for(let d=0;d<s.length;++d){const f=s[d].index;for(let b=0;b<f.count;++b)h.push(f.getX(b)+u);u+=s[d].attributes.position.count}c.setIndex(h)}for(const u in r){const h=Gl(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in a){const h=a[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let d=0;d<h;++d){const f=[];for(let v=0;v<a[u].length;++v)f.push(a[u][v][d]);const b=Gl(f);if(!b)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(b)}}return c}function Gl(s){let e,t,n,i=-1,r=0;for(let l=0;l<s.length;++l){const u=s[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=u.gpuType),i!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}const a=new e(r),o=new $t(a,t,n);let c=0;for(let l=0;l<s.length;++l){const u=s[l];if(u.isInterleavedBufferAttribute){const h=c/t;for(let d=0,f=u.count;d<f;d++)for(let b=0;b<t;b++){const v=u.getComponent(d,b);o.setComponent(d+h,b,v)}}else a.set(u.array,c);c+=u.count*t}return i!==void 0&&(o.gpuType=i),o}function Hl(s,e){if(e===0)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===2||e===1){let t=s.getIndex();if(t===null){const a=[],o=s.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===2)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}const Vl='"Fredoka", "Bricolage Grotesque", sans-serif',N0="#cfdcc4",Fo="#d0a54e",Pi="#b98d5c",Wl="#6e4a2c",U0="#f1ead6",Xl="#6b2436";function O0(s,e,{box:t,span:n,material:i,model:r}){const a=e.shell;if(!a)return null;const o=new ct;s.add(o);const[c,l,u]=e.floors,h=()=>{const se=new ct;return o.add(se),se},d=(se,Q,Te,Me,Ce,Ne)=>r&&r(Q,Te,Me,Ce,(Ze,Ye)=>{se.visible=!1,Ne&&Ne(Ze,Ye)}),f=a.plaster,b=a.tile,v=a.tileH,m=document.createElement("canvas");m.width=200,m.height=230;const p=m.getContext("2d");p.fillStyle=b,p.fillRect(0,0,200,230),p.fillStyle=N0;for(let se=0;se<200;se+=200*a.tilePitch)p.fillRect(se,12,2.4,218);p.fillRect(0,230-230/2,200,2.4),p.fillStyle="#dcc48e",p.fillRect(0,2,200,9);const x=new Jn(m);x.colorSpace=jt,x.wrapS=1e3,x.anisotropy=4;const M=new Un(1,1).translate(0,.5,0);function _(se,Q,Te,Me,Ce=0){const Ne=x.clone();Ne.needsUpdate=!0,Ne.repeat.set(Math.abs(Te-Q),1);const Ze=new Ge(M,new Sn({map:Ne}));return Ze.scale.set(Math.abs(Te-Q),v,1),se?(Ze.rotation.y=Math.PI/2,Ze.position.set(Me+.006,Ce,(Q+Te)/2)):Ze.position.set((Q+Te)/2,Ce,Me+.006),Ze.receiveShadow=!0,o.add(Ze),Ze}function D(se,Q,Te,Me,Ce,Ne,Ze,Ye=[]){const ut=[...Ye].sort((bt,Qe)=>bt[0]-Qe[0]);let Pt=Q;const Mt=(bt,Qe,Ht,kt)=>se?n(o,Me-Ce,Me,Ne+Ht,Ne+kt,bt,Qe,f):n(o,bt,Qe,Ne+Ht,Ne+kt,Me-Ce,Me,f);ut.forEach(([bt,Qe,Ht])=>{bt>Pt&&(Mt(Pt,bt,0,Ze),_(se,Pt,bt,Me,Ne)),Mt(bt,Qe,Ht,Ze),Pt=Qe}),Te>Pt&&(Mt(Pt,Te,0,Ze),_(se,Pt,Te,Me,Ne))}const T=c.z-c.d/2;D(!1,(c.x||0)-c.w/2,(c.x||0)+c.w/2,T,.25,0,l.y-.32,[[a.exitDoor.x0,a.exitDoor.x1,a.exitDoor.h]]);const L=l.z-l.d/2,A=-l.w/2;D(!1,A,l.w/2,L,.25,l.y,u.y-l.y-.32),D(!0,L,L+3.5,A,.25,l.y,u.y-l.y-.32);const y=u.z-u.d/2,S=-u.w/2,I=e.rooftop?e.rooftop.y-.34-u.y:3.9,z=u.y+I,B=1.44,Y=new ns({color:"#cfe6df",roughness:.1,metalness:0,transparent:!0,opacity:.26,depthWrite:!1});function re(se,Q,Te,Me,Ce){const Ne=Math.max(2,Math.round((Te-Q)/a.glazingBay)),Ze=(Te-Q)/Ne,Ye=u.y;let ut=null;if(Ce!==void 0){const bt=Math.max(0,Math.min(Ne-2,Math.round((Ce-Q)/Ze)-1));ut=[Q+bt*Ze,Q+(bt+2)*Ze]}const Pt=(bt,Qe,Ht,kt,Qt=.09)=>se?n(o,Me-Qt,Me+Qt*.3,Ht,kt,bt,Qe,"#2c5a44"):n(o,bt,Qe,Ht,kt,Me-Qt,Me+Qt*.3,"#2c5a44");Pt(Q,Te,Ye,Ye+.3,.16);for(let bt=0;bt<=Ne;bt++){const Qe=Q+bt*Ze;Pt(Qe-.035,Qe+.035,Ye+.3,Ye+I)}Pt(Q,Te,Ye+2.92,Ye+2.98),Pt(Q,Te,Ye+I-.08,Ye+I);const Mt=se?n(o,Me-.02,Me,Ye+.3,Ye+I,Q,Te,"#cfe6df",{cast:!1}):n(o,Q,Te,Ye+.3,Ye+I,Me-.02,Me,"#cfe6df",{cast:!1});return Mt.material=Y,Mt.receiveShadow=!1,ut&&n(o,ut[0]+.035,ut[1]-.035,Ye+.3,Ye+I-.08,Me-.06,Me-.02,"#2f5d4a"),ut}const F=re(!1,S,a.topLanding.outer,y,a.fanX);re(!0,y,y+3.5,S);const q=new ct,G=F?(F[0]+F[1])/2:a.fanX;q.position.set(G,u.y+2.15,y+.02),o.add(q);let he=null;d(q,"exhaust_fan.glb",G,u.y+2.15,y+.02,se=>{he=se.getObjectByName("Rotor")}),t(q,0,-.72,.06,1.44,1.44,.14,"#2f6b52");const J=new Ge(new hn(.56,.56,.05,40).rotateX(Math.PI/2),i("#1d3028"));J.position.z=.14,q.add(J);const $=new ct;$.position.z=.18,q.add($);for(let se=0;se<4;se++){const Q=new Ge(new on(.44,.17,.02).translate(.27,0,0),i("#b9cbb4"));Q.rotation.z=se*Math.PI/2,Q.rotation.x=.25,$.add(Q)}const ve=new Ge(new hn(.1,.1,.06,20).rotateX(Math.PI/2),i("#d8c18b"));$.add(ve);const Le=1.46,ie=e.rooftop?2:0,pe=1.8,De=Le*pe,_e=.5,st=a.topLanding.outer-.035,it=st-ie*De,ht=z+B*pe/2,dt=y-.09,ft=e.rooftop?new Qi(new N(.816,-1,0).normalize(),(z-.816*e.rooftop.x1)/Math.hypot(.816,1)):null,mt=[],W=se=>{const Q=se.clone();return Q.clippingPlanes=mt,Q},Wt=new nt("#2c5a44"),_t=Array.from({length:ie},(se,Q)=>new tt().makeTranslation(it+De*(Q+.5),ht,dt).scale(new N(pe,pe,pe*_e)));let at=null;r&&ie&&r("exhaust_fan.glb",0,0,0,(se,Q)=>{const Te=new tt().copy(Q.parent.matrixWorld).invert(),Me=new tt,Ce=se.getObjectByName("Rotor"),Ne=[];mt.push(ft.clone().applyMatrix4(Q.parent.matrixWorld)),Q.updateMatrixWorld(!0),se.traverse(Ze=>{if(!Ze.isMesh)return;let Ye=!1;for(let Mt=Ze;Mt;Mt=Mt.parent)Mt===Ce&&(Ye=!0);const ut=/^(Housing|FrontFrame)/.test(Ze.name)?Object.assign(Ze.material.clone(),{color:Wt}):Ze.material,Pt=new ni(Ze.geometry,Array.isArray(ut)?ut.map(W):W(ut),ie);Me.multiplyMatrices(Te,Ze.matrixWorld),_t.forEach((Mt,bt)=>Pt.setMatrixAt(bt,new tt().multiplyMatrices(Mt,Me))),Pt.computeBoundingSphere(),Pt.castShadow=!1,Pt.receiveShadow=!0,o.add(Pt),Ye&&Ne.push({part:Ze,mesh:Pt})}),Q.parent.remove(Q),at={rotor:Ce,holder:Q,parentInverse:new tt,spinning:Ne}});const rt=new hn(.09,.09,.22,12).translate(0,.11,0),qt=new on(.18,.26,.07).translate(0,.13,0),le=[],C=se=>{const Q={g:se,jars:[],pouches:[]};return le.push(Q),Q};function E(se,Q,Te,Me,Ce,Ne,Ze,Ye,ut){const{jars:Pt,pouches:Mt}=C(se);n(se,Q,Te,Ne,Ne+Ze,Me,Me+.05,Wl,{cast:!1}),n(se,Q,Te,Ne,Ne+.14,Me,Me+Ce,Pi),n(se,Q-.02,Te+.02,Ne+Ze-.1,Ne+Ze,Me,Me+Ce+.02,Pi);const bt=(Te-Q)/Ye;for(let Qe=0;Qe<=Ye;Qe++)n(se,Q+Qe*bt-.035,Q+Qe*bt+.035,Ne,Ne+Ze,Me,Me+Ce,Pi);for(let Qe=1;Qe<=ut;Qe++){const Ht=Ne+.14+(Ze-.24)*Qe/(ut+1);n(se,Q,Te,Ht-.04,Ht,Me,Me+Ce,"#c79f6c",{cast:!1});for(let kt=0;kt<Ye;kt++)for(let Qt=0;Qt<4;Qt++){const Pn=Q+kt*bt+bt*(Qt+.5)/4,Ln=Me+Ce*.55;((kt+Qe+Qt)%3?Pt:Mt).push([Pn,Ht,Ln,(kt*7+Qe*3+Qt)%4])}if(Qe===1)for(let kt=0;kt<Ye;kt++)for(let Qt=0;Qt<4;Qt++)Pt.push([Q+kt*bt+bt*(Qt+.5)/4,Ne+.14,Me+Ce*.55,(kt+Qt)%4])}}const k=a.loungeFront,ae=k-.81,de=a.loungeDoor.x,oe=a.loungeRight,Fe=l.y-.32;n(o,-11.03,de-.7,0,Fe,ae,k,f),n(o,de-.7,de+.7,a.loungeHeader,Fe,ae,k,f),n(o,de+.7,oe+.16,0,Fe,ae,k,f),_(!1,-11.03,de-.7,k),_(!1,de+.7,a.wallLeft,k),_(!1,a.wallLeft,oe+.16,k),n(o,-11.5,-11.18,0,3.95,T,k,f),_(!0,T,k,-11.18);const xe=a.loungeExit.z,Ie=.92,vt=2.84;n(o,oe-.16,oe+.16,0,Fe,T,xe-Ie,f),n(o,oe-.16,oe+.16,vt,Fe,xe-Ie,xe+Ie,f),n(o,oe-.16,oe+.16,0,Fe,xe+Ie,k,f),_(!0,T,xe-Ie-.04,oe+.16),_(!0,xe+Ie+.04,k,oe+.16),n(o,oe-.1,oe+.1,0,vt,xe-Ie,xe+Ie,"#0d1310",{cast:!1});const Se=[];e.rooftop||(n(o,-11.18,oe-.16,.002,.012,T,ae,"#2a1b22",{cast:!1}),n(o,-10.95,-9.25,.012,.022,-5.3,-2.9,"#5a2638",{cast:!1}),n(o,-10.75,-9.45,.022,.03,-5.1,-3.1,"#7a3a4c",{cast:!1}),[[-6.15,-5.55,1],[-2.65,-2.05,-1]].forEach(([se,Q,Te])=>{n(o,-10.9,-9.3,0,.48,se,Q,Xl);const Me=Te>0?[se,se+.16]:[Q-.16,Q];n(o,-10.9,-9.3,.48,.95,Me[0],Me[1],"#5c1e30"),n(o,-10.9,-10.72,.48,.7,se,Q,"#5c1e30"),n(o,-9.48,-9.3,.48,.7,se,Q,"#5c1e30")}),n(o,-10.55,-9.65,0,.4,-4.35,-3.85,"#3a2a1e"),[[-10.7,-6.6],[-10.7,-1.55],[-9.6,-4.1]].forEach(([se,Q])=>{t(o,se,0,Q,.4,.62,.4,"#3a2a1e"),t(o,se,.62,Q,.04,.4,.04,"#d8c18b",{cast:!1});const Te=new Ge(new hn(.13,.2,.26,16).translate(0,.13,0),new Sn({color:"#f3d9a6",emissive:"#ffb36a",emissiveIntensity:0}));Te.position.set(se,1,Q),o.add(Te),Se.push(Te)}));const Be=i(Xl);function $e(se){const Q=se?{centre:xe,plane:oe+.2,scale:1.35,top:2.78}:{centre:de,plane:k+.05,scale:1,top:a.loungeHeader+.02},Te=[-1,1].map(Ce=>{const Ne=new Ge(ot,Be);return Ne.castShadow=!0,o.add(Ne),{side:Ce,m:Ne}}),Me=se?n(o,Q.plane-.05,Q.plane+.09,Q.top-.1,Q.top+.06,Q.centre-Ie-.02,Q.centre+Ie+.02,"#4a1b29"):n(o,Q.centre-.75,Q.centre+.75,Q.top-.1,Q.top+.06,Q.plane-.05,Q.plane+.09,"#4a1b29");return{pair:Te,pelmet:Me,exit:se,set(Ce,Ne){Me.visible=Ne,Te.forEach(({side:Ze,m:Ye})=>{Ye.visible=Ne;const ut=.68*Q.scale,Pt=(.07+(.5-.07)*Ce)*Q.scale,Mt=Math.max(.08,ut-Pt),bt=Ze*(Pt+Mt/2);se?(Ye.position.set(Q.plane,0,Q.centre+bt),Ye.scale.set(.08,Q.top-.08,Mt)):(Ye.position.set(Q.centre+bt,0,Q.plane),Ye.scale.set(Mt,Q.top-.08,.08))})}}}const ot=new on(1,1,1).translate(0,.5,0),qe=$e(!1),Rt=$e(!0);r&&r("lounge_drapes.glb",0,0,0,(se,Q)=>{Q.removeFromParent(),se.updateMatrixWorld(!0);const Te=Ze=>{const Ye=se.getObjectByName(Ze),ut=[];if(!Ye)return null;const Pt=new tt().copy(Ye.matrixWorld).invert();Ye.traverse(Ht=>{if(!Ht.isMesh)return;const kt=Ht.geometry.clone().applyMatrix4(new tt().multiplyMatrices(Pt,Ht.matrixWorld)),Qt=Ht.material.color,Pn=kt.attributes.position.count,Ln=new Float32Array(Pn*3);for(let qn=0;qn<Pn;qn++)Ln.set([Qt.r,Qt.g,Qt.b],qn*3);kt.setAttribute("color",new $t(Ln,3)),Object.keys(kt.attributes).forEach(qn=>{["position","normal","color"].includes(qn)||kt.deleteAttribute(qn)}),ut.push(kt)});const Mt=Di(ut);Mt.computeBoundingBox();const bt=Mt.boundingBox,Qe=bt.getSize(new N);return Mt.translate(-(bt.min.x+bt.max.x)/2,-bt.min.y,-(bt.min.z+bt.max.z)/2).scale(1/Qe.x,1/Qe.y,1/Qe.z),Mt.computeVertexNormals(),Mt},Me=Te("Drape"),Ce=Te("Pelmet");if(!Me||!Ce)return;const Ne=i("#ffffff",{vertexColors:!0});[qe,Rt].forEach(Ze=>{const Ye=ut=>Ze.exit?ut.clone().rotateY(-Math.PI/2):ut;Ze.pair.forEach(({m:ut})=>{ut.geometry=Ye(Me),ut.material=Ne}),Ze.pelmet.geometry=Ye(Ce),Ze.pelmet.material=Ne})});const gt=e.rooftop?null:n(o,de-.7,de+.7,0,a.loungeHeader,k,k+.08,"#2d6146"),Ft=n(o,oe+.16,oe+.21,0,vt-.24,xe-Ie+.15,xe+Ie-.15,"#3a2a1e"),X=document.createElement("canvas");X.width=512,X.height=184;const Pe=new Jn(X);Pe.colorSpace=jt;const ue=new fn({map:Pe,transparent:!0}),be=new Ge(new Un(2,.72),ue);be.position.set(a.loungeSign.x,a.loungeSign.y,k+.03),be.scale.setScalar(a.loungeSign.scale),o.add(be);let Ue=null;typeof FontFace=="function"&&document.fonts&&(new FontFace("Fredoka",`url(${new URL("../fonts/Fredoka-SemiBold.ttf",e.modelBase).href})`,{weight:"600"}).load().then(se=>{document.fonts.add(se),Ue=null,Qn=null,Fn=!0}).catch(()=>{}),new FontFace("Yellowtail",`url(${new URL("../fonts/Yellowtail-Regular.woff2",e.modelBase).href})`).load().then(se=>{document.fonts.add(se),Ue=null}).catch(()=>{}));function ke(se){if(Ue===se)return;Ue=se;const Q=X.getContext("2d");Q.clearRect(0,0,512,184),Q.fillStyle="#1a1216",Q.beginPath(),Q.roundRect(6,8,500,168,22),Q.fill();const Te=(Me,Ce,Ne,Ze,Ye,ut)=>{se?(Q.shadowColor=Ze,Q.shadowBlur=22,Q.fillStyle=Ze,Q.fillText(Me,Ce,Ne),Q.shadowBlur=0,Q.fillStyle=Ye,Q.fillText(Me,Ce,Ne)):(Q.fillStyle=ut,Q.fillText(Me,Ce,Ne))};Q.textAlign="center",Q.textBaseline="middle",Q.save(),Q.translate(256,56),Q.rotate(-.06),Q.font='400 88px "Yellowtail", cursive',Te("Rooftop",0,0,"#ffbf5a","#fff1d6","#5d5040"),Q.restore(),Q.font=`600 72px ${Vl}`,Te("LOUNGE",256,128,"#ff8fbf","#fff4f8","#5a4750"),Pe.needsUpdate=!0}const We={x0:a.loungeDoor.x+1.25,x1:a.shelfLeft-.78,y:1,h:1.9},Xt=h();We.x=(We.x0+We.x1)/2,We.w=We.x1-We.x0,n(Xt,We.x-We.w/2-.14,We.x+We.w/2+.14,We.y-.12,We.y+We.h+.12,k,k+.1,Pi),n(Xt,We.x-We.w/2+.04,We.x+We.w/2-.04,We.y+.04,We.y+We.h-.04,k+.1,k+.12,Fo,{cast:!1});const un=document.createElement("canvas");un.width=1024,un.height=240;const It=new Jn(un);It.colorSpace=jt,It.anisotropy=4;const me=new Ge(new Un(We.w-.14,We.h-.14),new fn({map:It}));me.position.set(We.x,We.y+We.h/2,k+.125),Xt.add(me),d(Xt,"menu_board.glb",We.x,0,k,(se,Q)=>{Q.scale.x=We.w/3.18,Q.scale.y=We.h/1.07,Q.position.y=We.y-1.218*Q.scale.y;const Te=se.getObjectByName("BoardFace");Te&&Te.traverse(Me=>{if(!Me.isMesh)return;const Ce=Me.geometry.attributes.uv;for(let Ne=0;Ne<Ce.count;Ne++)Ce.setY(Ne,1-Ce.getY(Ne));Ce.needsUpdate=!0,Me.material=me.material})});const vn=" ABCDEFGHIJKLMNOPQRSTUVWXYZ$0123456789.,",Dn=55,On=9;let mn=null,Qn=null,Fn=!1;function Ri(se,Q){const Te=se.length,Me=se[0]?se[0].length:21;if((!mn||mn.length!==Te||mn[0].length!==Me)&&(mn=se.map(ut=>[...ut].map(()=>({from:" ",to:" ",start:0})))),se.forEach((ut,Pt)=>[...ut].forEach((Mt,bt)=>{const Qe=mn[Pt][bt];Qe.to!==Mt&&(Qe.from=Qe.to,Qe.to=Mt,Qe.start=Q+bt*35+Pt*90,Fn=!0)})),!Fn&&Qn!==null)return;Qn="";const Ce=un.getContext("2d"),Ne=1024/Me,Ze=240/Te;Ce.fillStyle="#131617",Ce.fillRect(0,0,1024,240),Ce.font=`600 ${Math.round(Ze*.66)}px ${Vl}`,Ce.textAlign="center",Ce.textBaseline="middle";const Ye=(ut,Pt,Mt,bt,Qe)=>{const Ht=Mt+Ze/2,kt=(Ze/2-4)*Qe;Ce.save(),Ce.beginPath(),Ce.rect(Pt+2,bt?Ht-kt:Ht,Ne-4,kt),Ce.clip(),Ce.fillStyle=bt?"#363c3e":"#2b3133",Ce.fillRect(Pt+2,bt?Ht-kt:Ht,Ne-4,kt),ut!==" "&&(Ce.translate(0,Ht),Ce.scale(1,Qe),Ce.fillStyle="#efe4c8",Ce.fillText(ut,Pt+Ne/2,1)),Ce.restore()};Fn=!1,mn.forEach((ut,Pt)=>ut.forEach((Mt,bt)=>{const Qe=bt*Ne,Ht=Pt*Ze,kt=Q-Mt.start;let Qt=Mt.to,Pn=Mt.to,Ln=1;if(kt<0)Qt=Pn=Mt.from,Fn=!0;else if(Mt.from!==Mt.to&&kt<Dn*On){const qn=Math.floor(kt/Dn),_s=vn.indexOf(Mt.to)+vn.length-On;Qt=qn?vn[(_s+qn)%vn.length]:Mt.from,Pn=vn[(_s+qn+1)%vn.length],Ln=kt%Dn/Dn,Fn=!0}else Mt.from=Mt.to;Ln>=1?(Ye(Qt,Qe,Ht,!0,1),Ye(Qt,Qe,Ht,!1,1)):(Ye(Pn,Qe,Ht,!0,1),Ye(Qt,Qe,Ht,!1,1),Ln<.5?Ye(Qt,Qe,Ht,!0,1-Ln*2):Ye(Pn,Qe,Ht,!1,Ln*2-1)),Ce.fillStyle="#0d1113",Ce.fillRect(Qe+2,Ht+Ze/2-1,Ne-4,2)})),It.needsUpdate=!0}const Wn=h();E(Wn,a.shelfLeft,a.wallRight,k,.64,0,3.3,5,4),d(Wn,"product_shelving.glb",(a.shelfLeft+a.wallRight)/2,0,k+.32);const Bn=h();E(Bn,-9,9,L,.6,l.y,2.6,8,3),d(Bn,"wall_shelving.glb",0,l.y,L+.3);const nn=h(),Xn=C(nn);d(nn,"arch_shelves.glb",-8.525,l.y,-4.85),n(nn,-8.85,-8.2,l.y,l.y+2.4,-5.9,-3.8,Pi);const vi=new Ge(new hn(1.05,1.05,.65,32,1,!1,0,Math.PI).rotateZ(Math.PI/2),i(Pi));vi.position.set(-8.525,l.y+2.4,-4.85),vi.castShadow=!0,nn.add(vi),n(nn,-8.21,-8.19,l.y+.2,l.y+2.3,-5.7,-4,"#e8dcc4",{cast:!1});for(let se=0;se<3;se++)for(let Q=0;Q<3;Q++)Xn.jars.push([-8.35,l.y+.5+se*.7,-5.45+Q*.6,(se+Q)%4]);for(let se=0;se<3;se++)n(nn,-8.85,-8.2,l.y+.45+se*.7,l.y+.5+se*.7,-5.8,-3.9,"#ecdbc1",{cast:!1});const xn=a.column,ii=h();t(ii,xn.x,0,xn.z,.78,1.73,.73,"#25523b"),t(ii,xn.x,1.73,xn.z,.8,.12,.76,"#e1dbc0"),t(ii,xn.x,1.85,xn.z,.75,Fe-1.85,.7,U0);const si=new Sn({color:"#fff2c8",emissive:"#ffd58a",emissiveIntensity:0}),R=new Ge(new di(.13,12,8),si);R.position.set(xn.x,2.6,xn.z+.42),ii.add(R);const j=(se,Q,Te)=>{const Me=se.getObjectByName(Q);Me&&Me.traverse(Ce=>{if(Ce.isMesh){const Ne=Ce.material.clone();Ne.emissive=Te.emissive.clone(),Ce.material=Ne,ce.push([Ne,Te])}})},ce=[];d(ii,"shop_column.glb",xn.x,0,xn.z,se=>j(se,"Sconce",si));const ee=a.exitDoor,K=h();n(K,ee.x0-.14,ee.x0,0,ee.h+.14,T-.1,T+.12,"#1f4a35"),n(K,ee.x1,ee.x1+.14,0,ee.h+.14,T-.1,T+.12,"#1f4a35"),n(K,ee.x0-.14,ee.x1+.14,ee.h,ee.h+.2,T-.1,T+.12,"#1f4a35"),n(K,ee.x0,ee.x0+.06,.02,ee.h-.02,T+.1,T+.95,"#2d6146"),n(K,(ee.x0+ee.x1)/2-.4,(ee.x0+ee.x1)/2+.4,ee.h+.3,ee.h+.56,T,T+.08,"#1d3028");const Re=new Ge(new on(.66,.14,.04),new Sn({color:"#d84a3a",emissive:"#ff5a3c",emissiveIntensity:.4}));Re.position.set((ee.x0+ee.x1)/2,ee.h+.43,T+.1),K.add(Re),d(K,"exit_door.glb",(ee.x0+ee.x1)/2,0,T,se=>{j(se,"ExitLamp",Re.material);const Q=se.getObjectByName("DoorLeaf");Q&&(Q.rotation.y=-Q.rotation.y,Q.position.z=-Q.position.z)});const ge=a.merchCabinet,ze=h(),et=C(ze);d(ze,"merch_cabinet.glb",(ge.back+ge.face)/2,0,(ge.z0+ge.z1)/2,se=>{const Q=se.getObjectByName("CabinetGlass");Q&&Q.traverse(Te=>{Te.isMesh&&(Te.material=Y,Te.castShadow=!1)})}),n(ze,ge.back,ge.face,0,.2,ge.z0,ge.z1,Wl),n(ze,ge.back,ge.face,.2,2.6,ge.z0,ge.z0+.1,Pi),n(ze,ge.back,ge.face,.2,2.6,ge.z1-.1,ge.z1,Pi),n(ze,ge.back,ge.back+.12,.2,2.6,ge.z0,ge.z1,Pi);const pt=new Ge(new hn((ge.z1-ge.z0)/2,(ge.z1-ge.z0)/2,ge.face-ge.back,32,1,!1,0,Math.PI).rotateZ(Math.PI/2),i(Pi));pt.position.set((ge.face+ge.back)/2,2.6,(ge.z0+ge.z1)/2),pt.castShadow=!0,ze.add(pt);for(let se=0;se<3;se++){n(ze,ge.back+.12,ge.face-.05,.55+se*.68,.6+se*.68,ge.z0+.1,ge.z1-.1,"#ecdbc1",{cast:!1});for(let Q=0;Q<4;Q++)(Q%2?et.pouches:et.jars).push([(ge.back+ge.face)/2,.6+se*.68,ge.z0+.35+Q*(ge.z1-ge.z0-.7)/3,(se+Q)%4])}const yt=n(ze,ge.face-.03,ge.face,.2,2.6,ge.z0+.1,ge.z1-.1,"#cfe6df",{cast:!1});yt.material=Y;const Xe=e.marquee,Ct=Xe.zFront-Xe.zRear,Nt=document.createElement("canvas");Nt.width=2048,Nt.height=192;const Et=Nt.getContext("2d");Et.fillStyle="#f1e7cc",Et.fillRect(0,0,2048,96),Et.fillStyle="#1f6b47",Et.fillRect(0,96,2048,96),Et.font='800 54px "Bricolage Grotesque", sans-serif',Et.textAlign="center",Et.textBaseline="middle",Xe.top.forEach((se,Q)=>{Et.fillStyle="#1f5e40",Et.fillText(se,(Q+.5)*512,50)}),Et.font='700 40px "Bricolage Grotesque", sans-serif',Xe.bottom.forEach((se,Q)=>{Et.fillStyle="#f1e7cc",Et.fillText(se,(Q+.5)*512,146)}),Et.fillStyle="#1a1e20";for(let se=1;se<4;se++)Et.fillRect(se*512-3,0,6,192);const Je=new Jn(Nt);Je.colorSpace=jt,Je.anisotropy=4;const Gt=new Sn({map:Je,emissive:"#ffffff",emissiveMap:Je,emissiveIntensity:.15}),Oe=new Ge(new Un(Ct,Xe.y1-Xe.y0),Gt);Oe.rotation.y=Math.PI/2,Oe.position.set(Xe.x+.17,(Xe.y0+Xe.y1)/2,(Xe.zFront+Xe.zRear)/2),e.wallFaces||o.add(Oe);const Tt=a.planter,wt=h();d(wt,"shop_planter.glb",(Tt.x0+Tt.x1)/2,0,(Tt.z0+Tt.z1)/2),n(wt,Tt.x0,Tt.x1,0,.56,Tt.z0,Tt.z1,"#1f5e40"),n(wt,Tt.x0-.04,Tt.x1+.04,.56,.63,Tt.z0-.04,Tt.z1+.04,"#2b302d"),n(wt,Tt.x0+.1,Tt.x1-.1,.63,.66,Tt.z0+.1,Tt.z1-.1,"#514633",{cast:!1});const Ut=a.baseboard,Ot=.14;[[Ut.x0,Ut.x1,Ut.front-Ot,Ut.front],[Ut.x1-Ot,Ut.x1,Ut.rear,Ut.front-Ot]].forEach(([se,Q,Te,Me])=>{n(o,se,Q,0,Ut.h-.1,Te,Me,"#1f5e40"),n(o,se-.01,Q+.01,Ut.h-.1,Ut.h-.07,Te-.01,Me+.01,Fo,{cast:!1}),n(o,se-.02,Q+.02,Ut.h-.07,Ut.h,Te-.03,Me+.03,"#e1dbc0")});const dn=[],kn=new ui(1,1),Kt=(se,Q,Te,Me,Ce)=>{const Ne=new Ge(kn,i(Ce));Ne.position.set(se,Q,Te),Ne.scale.set(Me,Me*.8,Me),Ne.castShadow=Ne.receiveShadow=!0,wt.add(Ne)};[-1.2,-.5,.2,.9,1.6].forEach((se,Q)=>Kt((Tt.x0+Tt.x1)/2+(Q%2?.08:-.08),.9,(Tt.z0+Tt.z1)/2+se,.3,Q%2?"#6b9250":"#5f8648")),t(wt,Tt.tree.x,.63,Tt.tree.z,.16,2.4,.16,"#816747"),[[0,3.2,0,.75,"#769852"],[-.35,2.9,.3,.55,"#587c4d"],[.3,3.05,-.3,.55,"#98b96e"]].forEach(([se,Q,Te,Me,Ce])=>Kt(Tt.tree.x+se,Q,Tt.tree.z+Te,Me,Ce));const en=a.hanging,jn=h(),_n=[];n(jn,en.x0,en.x1,en.y-.04,en.y,en.z-.03,en.z+.03,Fo,{cast:!1});for(let se=0;se<18;se++){const Q=en.x0+(en.x1-en.x0)*(se+.5)/18,Te=.5+(1-Math.abs(se-8.5)/9)*.7+se%3*.12;for(let Me=0;Me<6;Me++){const Ce=Me/5;_n.push([Q+Math.sin(se*1.7+Ce*3)*.06,en.y-.05-Te*Ce,en.z+(se%2?.06:-.06)+Ce*.08,(se+Me)%3,.8])}}dn.push([jn,_n]),d(jn,"pothos_rail.glb",(en.x0+en.x1)/2,en.y,en.z),[[l,L],[u,y]].forEach(([se,Q])=>(se===u?[-2,2]:[-7,5]).forEach(Te=>{const Me=Q+.9,Ce=se.y+Math.min(3.95,se===u?3.5:3.95),Ne=h(),Ze=[];n(Ne,Te-.01,Te+.01,Ce-.7,Ce,Me-.01,Me+.01,"#343f33",{cast:!1}),t(Ne,Te,Ce-1,Me,.55,.3,.48,"#b6ac8a");for(let Ye=0;Ye<14;Ye++){const ut=Ye*2.399;Ze.push([Te+Math.cos(ut)*.28,Ce-.72-Ye%4*.18,Me+Math.sin(ut)*.22,Ye%3,.9])}dn.push([Ne,Ze]),d(Ne,"hanging_basket.glb",Te,Ce,Me)}));const An=["#5f8648","#7aa257","#9cc46e"].map(se=>new nt(se)),Yt=new ui(.13,0),Bt=i("#ffffff"),yn=new tt,gn=new bn,is=new N,ki=new N;dn.forEach(([se,Q])=>{const Te=new ni(Yt,Bt,Q.length);Q.forEach(([Me,Ce,Ne,Ze,Ye],ut)=>{gn.setFromEuler(new fi(ut*.7,ut*1.3,0)),Te.setMatrixAt(ut,yn.compose(is.set(Me,Ce,Ne),gn,ki.set(1.3*Ye,.7*Ye,1*Ye))),Te.setColorAt(ut,An[Ze])}),Te.castShadow=!0,Te.receiveShadow=!0,se.add(Te)});const zn=["#527e60","#b28b64","#75999a","#d5bd8c"].map(se=>new nt(se));le.forEach(se=>[[rt,se.jars],[qt,se.pouches]].forEach(([Q,Te])=>{if(!Te.length)return;const Me=new ni(Q,i("#ffffff"),Te.length);Te.forEach(([Ce,Ne,Ze,Ye],ut)=>{Me.setMatrixAt(ut,yn.compose(is.set(Ce,Ne,Ze),gn.identity(),ki.set(1,1,1))),Me.setColorAt(ut,zn[Ye])}),Me.castShadow=!0,se.g.add(Me)}));const xi=a.lamps.map(([se,Q,Te,Me])=>{const Ce=new Ka("#ffc98a",0,11,1.2);return Ce.position.set(se,Q,Te),Ce.userData.power=Me,s.add(Ce),Ce});return{update(se){const Q=se.night||0,Te=!!se.loungeOpen;$.rotation.z=-(se.time||0)*Math.PI*2/2500,he&&(he.rotation.z=$.rotation.z),at&&at.rotor&&(at.rotor.rotation.z=$.rotation.z,at.holder.updateMatrixWorld(!0),at.spinning.forEach(({part:Me,mesh:Ce})=>{const Ne=new tt().multiplyMatrices(at.parentInverse,Me.matrixWorld),Ze=new tt;_t.forEach((Ye,ut)=>Ce.setMatrixAt(ut,Ze.multiplyMatrices(Ye,Ne))),Ce.instanceMatrix.needsUpdate=!0})),qe.set(se.loungeCurtain||0,Te),Rt.set(se.loungeExitCurtain||0,Te),gt&&(gt.visible=!Te),Ft.visible=!Te,ke(Te),ue.color.setScalar(Te?1:.8),se.menuLines&&Ri(se.menuLines,performance.now()),Se.forEach(Me=>{Me.material.emissiveIntensity=Te?.5+Q*1.2:0}),R.material.emissiveIntensity=.3+Q*1.4,Re.material.emissiveIntensity=.4+Q*1.2,ce.forEach(([Me,Ce])=>{Me.emissiveIntensity=Ce.emissiveIntensity}),Gt.emissiveIntensity=.15+Q*.7,xi.forEach(Me=>{Me.intensity=Me.userData.power*(.2+Q*5)})}}}const ec=Math.asin(Math.tan(Math.PI/6)),Mn=1/Math.cos(ec),jl=240;function ql(){const s=new Ha(-1,1,1,-1,1,jl*2.5),e=Math.SQRT1_2,t=Math.SQRT1_2,n=Math.sin(ec),i=Math.cos(ec);return s.up.set(-e*n,i,-t*n),s.position.set(e*i,n,t*i).multiplyScalar(jl),s.lookAt(0,0,0),s}function B0(s,{width:e,height:t,centerX:n,centerY:i,unit:r}){s.left=-n/r,s.right=(e-n)/r,s.top=i/r,s.bottom=-(t-i)/r,s.updateProjectionMatrix(),s.updateMatrixWorld()}const k0=/^(Rotor|Flame|DoorLeaf|StaffPlaque|Wheel(FL|FR|BL|BR)$)/,No=new tt,Kl=new tt,Yl=(s,e)=>!!s.userData.motion||k0.test(s.name)||e;function z0(s){return s.isMesh&&!s.isInstancedMesh&&!s.isSkinnedMesh&&s.visible&&!Array.isArray(s.material)&&!s.material.transparent&&!Object.keys(s.geometry.morphAttributes).length&&!s.geometry.groups.length&&s.children.length===0}function G0(s){return Object.keys(s.attributes).sort().map(e=>e+s.attributes[e].itemSize).join()+(s.index?"|i":"")}function H0(s){const e=new cn;return Object.entries(s.attributes).forEach(([t,n])=>{const i=new Float32Array(n.count*n.itemSize);for(let r=0;r<n.count;r++)for(let a=0;a<n.itemSize;a++)i[r*n.itemSize+a]=n.getComponent(r,a);e.setAttribute(t,new $t(i,n.itemSize))}),s.index&&e.setIndex(new $t(s.index.array.slice(),1)),e}function V0(s){if(s.index){const e=s.index;for(let t=0;t<e.count;t+=3){const n=e.getX(t+1);e.setX(t+1,e.getX(t+2)),e.setX(t+2,n)}return}Object.values(s.attributes).forEach(e=>{for(let t=0;t<e.count;t+=3)for(let n=0;n<e.itemSize;n++){const i=e.getComponent(t+1,n);e.setComponent(t+1,n,e.getComponent(t+2,n)),e.setComponent(t+2,n,i)}})}function Ps(s,e){s.updateMatrixWorld(!0),Kl.copy(s.matrixWorld).invert();const t=new Map,n=[],i=o=>o.children.forEach(c=>{if(c.visible){if(Yl(c,e)){n.push(c);return}if(z0(c)){const l=c.material.uuid+(c.castShadow?"c":"")+(c.receiveShadow?"r":"")+G0(c.geometry);t.has(l)||t.set(l,[]),t.get(l).push(c)}i(c)}});i(s);let r=0;t.forEach(o=>{if(o.length<2)return;const c=o.map(d=>{const f=H0(d.geometry);return No.multiplyMatrices(Kl,d.matrixWorld),f.applyMatrix4(No),No.determinant()<0&&V0(f),f}),l=Di(c);if(!l)return;const u=o[0],h=new Ge(l,u.material);h.name="Merged"+(u.material.name||""),h.castShadow=u.castShadow,h.receiveShadow=u.receiveShadow,s.add(h),o.forEach(d=>d.removeFromParent()),r+=o.length-1});const a=o=>[...o.children].forEach(c=>{Yl(c,e)||!c.visible||(a(c),(c.type==="Group"||c.type==="Object3D")&&!c.children.length&&c.removeFromParent())});return a(s),n.forEach(o=>{o.children.length&&(r+=Ps(o,e))}),r}const rn="#d0a54e",Zs="#b98d5c",Ar="#6e4a2c",$n="#1f4a35",hs="#efe4cf",qi="#6b2436";function W0(s,e,{box:t,span:n,material:i}){const r=e.rooftop;if(!r)return null;const a=new ct;s.add(a);const{x0:o,x1:c,z0:l,z1:u,y:h}=r,d=r.lift,f=Array.from({length:9},()=>new ct);f.forEach(g=>a.add(g));const[b,v,m,p,x,M,_,D,T]=f,L=f.slice(1),[A,y,S,I,z,B,Y,re]=L.map(g=>{const w=new ct;return g.add(w),w}),F=new ct;a.add(F);const q=new ns({color:"#cfe6df",roughness:.1,metalness:0,transparent:!0,opacity:.28,depthWrite:!1}),G=g=>(g.material=q,g.castShadow=!1,g.receiveShadow=!1,g),he=(g,w)=>new Sn({color:g,emissive:w,emissiveIntensity:0}),J=[];n(a,o,c,h-.3,h,l,u,"#e4ddcc"),n(a,o-.05,c+.05,h-.34,h-.22,l-.05,u+.05,"#e1dbc0",{cast:!1});const $=e.floors[2].y,ve=e.floors[0].z-e.floors[0].d/2;[[o+.3,u-.3],[c-.3,u-.3]].forEach(([g,w])=>t(a,g,$,w,.3,h-.3-$,.3,"#33372f")),l<ve&&([o+.3,0,c-.3].forEach(g=>t(a,g,0,l+.3,.32,h-.3,.32,$n)),n(a,o,c,h-.62,h-.3,l+.14,l+.46,$n));const Le=document.createElement("canvas");Le.width=256,Le.height=256;const ie=Le.getContext("2d");ie.fillStyle="#b98654",ie.fillRect(0,0,256,256);for(let g=0;g<8;g++)ie.fillStyle=["#bf8c59","#b4814f","#c39260","#b78552"][g%4],ie.fillRect(0,g*32+1,256,30),ie.fillStyle="#8f6038",ie.fillRect(g*97%256,g*32,2,32);const pe=new Jn(Le);pe.colorSpace=jt,pe.wrapS=pe.wrapT=1e3,pe.anisotropy=4,pe.repeat.set((c-o)/2.4,(u-l)/2.4);const De=new Ge(new Un(c-o-.2,u-l-.2).rotateX(-Math.PI/2),new Sn({map:pe}));De.position.set((o+c)/2,h+.004,(l+u)/2),De.receiveShadow=!0,F.add(De);const _e=1.05,st=[d.z-.6,d.z+.6];function it(g,w,P,U,O){const H=Math.max(1,Math.round((P-w)/1.6)),te=(P-w)/H,Z=(ne,fe,Ee,we,V,ye,Ae)=>g?n(O,U-V,U+V,Ee,we,ne,fe,ye,Ae):n(O,ne,fe,Ee,we,U-V,U+V,ye,Ae);for(let ne=0;ne<=H;ne++){const fe=w+ne*te;Z(fe-.04,fe+.04,h,h+_e,.04,$n)}Z(w,P,h+_e-.03,h+_e+.03,.06,rn,{cast:!1}),G(Z(w,P,h+.08,h+_e-.05,.01,"#cfe6df"))}it(!1,o,c,u,F),it(!1,o,c,l,F),it(!0,l,u,c,F),it(!0,st[1],u,o,F);const ht=r.lift2?[r.lift2.z-.6,r.lift2.z+.6]:null,dt=new ct;F.add(dt),ht?(it(!0,l,ht[0],o,F),it(!0,ht[1],st[0],o,F),it(!0,ht[0],ht[1],o,dt)):it(!0,l,st[0],o,F);const ft=(g,w,P,U)=>{const O=Math.hypot(P-g,U-w),H=new Ge(new on(O,.06,.02),i("#e8b13a",{emissive:"#3a2a00"}));H.position.set((g+P)/2,h+.75,(w+U)/2),H.rotation.y=-Math.atan2(U-w,P-g),b.add(H)},mt=[[o+.2,l+.2],[c-.2,l+.2],[c-.2,u-.2],[o+.2,u-.2]];mt.forEach(([g,w],P)=>{t(b,g,h,w,.07,.8,.07,"#d8cfbd");const[U,O]=mt[(P+1)%4];ft(g,w,U,O)});const W=new ct;b.add(W),t(W,-2.2,h,-4.6,1.6,.18,1.1,"#9a7a52"),t(W,-2.2,h+.18,-4.6,1.5,.5,1,"#c9a978"),t(W,1.8,h,-5.4,1.2,.9,1.2,"#8e9a86"),t(W,3.6,h,-4.5,.9,.14,1.4,"#9a7a52");const Wt=new ct;Wt.visible=!1,a.add(Wt);const _t="#e8b13a",at=c-1.3,rt=l+1.1,qt=6.2;t(Wt,at,h,rt,.9,.25,.9,"#8d918a"),t(Wt,at,h+.25,rt,.32,qt,.32,_t);for(let g=1;g<qt;g+=1.1)t(Wt,at,h+.25+g,rt,.38,.07,.38,"#6b5320");const le=new ct;le.position.set(at,h+.25+qt,rt),Wt.add(le),t(le,0,0,0,.55,.45,.5,"#efe4cf"),t(le,-3.6,.45,0,7.2,.18,.22,_t),t(le,1.2,.45,0,2.4,.18,.22,_t),t(le,2.1,.1,0,.7,.5,.5,"#8d918a"),t(le,0,.45,0,.14,1,.14,_t);const C=-4.6,E=.45,k=3.4;t(le,C,E-k,0,.03,k,.03,"#2e3330"),t(le,C,E-k-.45,0,1,.12,.7,"#9a7a52"),t(le,C,E-k-.33,0,.9,.3,.6,"#c9a978");const ae=new Ge(new di(.13,10,8),new fn({color:"#ffb52e"}));ae.position.set(0,1.55,0),le.add(ae);const de=o+.5,oe=d.z;[[-.7,-.9],[.7,-.9],[-.7,.9],[.7,.9]].forEach(([g,w])=>t(Wt,de+g,h,oe+w,.06,2.6,.06,"#9aa39b")),[.9,1.8].forEach(g=>{t(Wt,de,h+g,oe-.9,1.46,.05,.06,"#9aa39b"),t(Wt,de,h+g,oe+.9,1.46,.05,.06,"#9aa39b"),t(Wt,de,h+g-.04,oe,1.4,.05,1.7,"#c9a978")});const Fe=Array.from({length:10},(g,w)=>{const P=l+.1+(u-l-.2)*w/10;return t(Wt,(o+c)/2,h+.01,P+(u-l-.2)/20,c-o-.2,.03,(u-l-.2)/10-.04,Zs,{cast:!1})}),xe=document.createElement("canvas");xe.width=160,xe.height=1600;function Ie(){const g=xe.getContext("2d"),w=xe.width,P=xe.height,U=g.createLinearGradient(0,0,0,P);U.addColorStop(0,"#24543d"),U.addColorStop(1,"#173a2a"),g.fillStyle=U,g.fillRect(0,0,w,P),g.strokeStyle=rn,g.lineWidth=3,g.lineCap="round",g.lineJoin="round",g.save(),g.translate(w/2,150),[[0,54],[-.62,40],[.62,40]].forEach(([O,H])=>{g.save(),g.rotate(O),g.beginPath(),g.ellipse(0,-H/2,9,H/2,0,0,Math.PI*2),g.stroke(),g.restore()}),g.beginPath(),g.moveTo(0,0),g.lineTo(0,22),g.stroke(),g.restore(),g.fillStyle=rn,g.fillRect(w/2-18,210,36,2),g.save(),g.translate(w/2+4,520),g.rotate(-Math.PI/2),g.fillStyle=hs,g.font='600 72px "Bricolage Grotesque", "Helvetica Neue", sans-serif',g.textAlign="center",g.textBaseline="middle","letterSpacing"in g&&(g.letterSpacing="14px"),g.fillText("CANOPY",0,0),g.restore(),vt&&(vt.needsUpdate=!0)}let vt=null;Ie(),vt=new Jn(xe),vt.colorSpace=jt,vt.anisotropy=4,document.fonts&&document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",Ie);const Se=new ct;a.add(Se);{const g=new Sn({map:vt}),w=2.9,P=h+2.75,U=H=>new Ge(new Un(H,P-w),g),O=U(d.w+.06);O.position.set(d.x,(w+P)/2,d.z+d.d/2+.03),Se.add(O),[-1,1].forEach(H=>{const te=U(d.d+.06);te.rotation.y=H*Math.PI/2,te.position.set(d.x+H*(d.w/2+.03),(w+P)/2,d.z),Se.add(te)}),Se.traverse(H=>{H.isMesh&&(H.castShadow=!0,H.receiveShadow=!0)})}const Be=d.w/2,$e=d.d/2,ot=h+2.9,qe=.09;function Rt(g,w,P){const U=d.x,O=[g-.6,g+.6],H=new ct,te=new ct,Z=new ct;w.add(H),P.add(te),P.add(Z),[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([Ve,At])=>t(H,U+Ve*(Be-qe/2),0,g+At*($e-qe/2),qe,ot,qe,$n));const ne=(Ve,At,St,xt=.01)=>{const ln=U-Be-xt,ri=U+Be+xt,ai=g-$e-xt,Ci=g+$e+xt,oi=.04;n(H,ln,ri,Ve,Ve+At,ai,ai+oi,St,{cast:!1}),n(H,ln,ri,Ve,Ve+At,Ci-oi,Ci,St,{cast:!1}),n(H,ln,ln+oi,Ve,Ve+At,ai,Ci,St,{cast:!1}),n(H,ri-oi,ri,Ve,Ve+At,ai,Ci,St,{cast:!1})};[0,e.floors[1].y,e.floors[2].y,h].forEach(Ve=>ne(Ve+2.62,.06,$n)),n(H,U-Be-.03,U+Be+.03,ot,ot+.16,g-$e-.03,g+$e+.03,$n),ne(ot+.16,.025,rn,.03),n(H,U+Be,U+Be+.6,h+2.5,h+2.55,g-$e+.05,g+$e-.05,$n),[[!1,g+$e],[!1,g-$e],[!0,U-Be],[!0,U+Be]].forEach(([Ve,At])=>{G(Ve?n(te,At-.01,At+.01,.05,ot,g-$e+.06,g+$e-.06,"#cfe6df"):n(te,U-Be+.06,U+Be-.06,.05,ot,At-.01,At+.01,"#cfe6df"))});const fe=new ct;P.add(fe);const Ee=new ct;fe.add(Ee);const we=d.w-.3,V=d.d-.3,ye=2.35;n(Ee,-we/2,we/2,0,.12,-V/2,V/2,"#2b302d"),n(Ee,-we/2,we/2,ye-.14,ye,-V/2,V/2,rn),[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([Ve,At])=>t(Ee,Ve*(we/2-.04),.12,At*(V/2-.04),.08,ye-.26,.08,rn)),n(Ee,-we/2+.05,-we/2+.1,.12,ye-.14,-V/2+.1,V/2-.1,Ar,{cast:!1});const Ae=new Ge(new on(we-.3,.04,V-.3),he("#fff2c8","#ffd58a"));Ae.position.y=ye-.16,Ee.add(Ae),J.push([Ae.material,.4,1.2]),fe.position.set(U,0,g);const Ke=U+Be,lt=o;return n(Z,Ke,lt+.05,h-.26,h,O[0],O[1],"#e4ddcc"),O.forEach(Ve=>{n(Z,Ke,lt,h+_e-.03,h+_e+.03,Ve-.05,Ve+.05,rn,{cast:!1}),G(n(Z,Ke,lt,h+.05,h+_e-.05,Ve-.01,Ve+.01,"#cfe6df"))}),n(Z,Ke+.05,o+1.2,h+.006,h+.016,g-.38,g+.38,qi,{cast:!1}),n(Z,Ke+.05,o+1.2,h+.004,h+.012,g-.45,g+.45,rn,{cast:!1}),{cab:fe,cabK:Ee,kf:H,ki:te,kb:Z,frame:w,inside:P,lz:g,cabLamp:Ae}}const gt=[Rt(d.z,a,F)],Ft=new ct;F.add(Ft),r.lift2&&gt.push(Rt(r.lift2.z,Ft,Ft));const X=gt[0].cab,Pe=gt[1]?gt[1].cab:null,ue=new ct;F.add(ue);const be=new ui(1,1),Ue=(g,w,P,U,O,H)=>{const te=new Ge(be,i(H));te.position.set(w,P,U),te.scale.set(O,O*.8,O),te.castShadow=te.receiveShadow=!0,g.add(te)},ke=new ct;F.add(ke);const We=[[o+.2,o+.9,l+.2,(r.lift2?r.lift2.z:d.z)-.9],[o+.2,o+.9,d.z+.9,u-.2]];We.forEach(([g,w,P,U])=>{n(ke,g,w,h,h+.55,P,U,"#1f5e40"),n(ke,g-.03,w+.03,h+.55,h+.6,P-.03,U+.03,"#e1dbc0",{cast:!1});for(let O=P+.35;O<U-.2;O+=.55)Ue(ke,(g+w)/2,h+.8,O,.32,Math.round(O*3)%2?"#6b9250":"#5f8648")}),[[c-.5,u-.5],[c-.6,l+.6]].forEach(([g,w])=>{const P=new Ge(new hn(.34,.26,.7,20).translate(0,.35,0),i("#d9cdb4"));P.position.set(g,h,w),P.castShadow=P.receiveShadow=!0,ue.add(P),t(ue,g,h+.7,w,.1,1.1,.1,"#7a6142"),[[0,2.05,0,.55,"#8aa66a"],[-.25,1.8,.2,.4,"#7a9a5c"],[.22,1.9,-.2,.42,"#9cb57a"]].forEach(([U,O,H,te,Z])=>Ue(ue,g+U,h+O,w+H,te,Z))});const Xt=[],un=new Sn({color:"#2b302d"});function It(g,w,P,U,O,H,te,Z){const ne=[];for(let Ee=0;Ee<=Z*2;Ee++){const we=Ee/(Z*2),V=Math.sin(Math.PI*we)*.45,ye=[w+(O-w)*we,U+(te-U)*we-V,P+(H-P)*we];ne.push(new N(...ye)),Ee%2===0&&Xt.push([g,ye[0],ye[1]-.07,ye[2]])}const fe=new Ge(new hr(new Wa(ne),Z*4,.014,4),un);g.add(fe)}const me={x0:o+1.4,x1:o+6.2,z0:l+.25,z1:l+3.4,h:2.75};[[me.x0,me.z0],[me.x1,me.z0],[me.x1,me.z1],[me.x0,me.z1]].forEach(([g,w])=>t(A,g,h,w,.14,me.h,.14,$n)),n(A,me.x0-.1,me.x1+.1,h+me.h,h+me.h+.16,me.z0-.07,me.z0+.07,$n),n(A,me.x0-.1,me.x1+.1,h+me.h,h+me.h+.16,me.z1-.07,me.z1+.07,$n);for(let g=me.x0+.1;g<me.x1;g+=.38)n(A,g-.04,g+.04,h+me.h+.16,h+me.h+.26,me.z0-.3,me.z1+.3,Zs);const vn=(g,w,P,U,O,H)=>{n(g,w,P,h,h+.22,U,O,Ar),n(g,w+.03,P-.03,h+.22,h+.48,U+.03,O-.03,hs),H==="z0"&&n(g,w,P,h+.22,h+.92,U,U+.22,hs),H==="x0"&&n(g,w,w+.22,h+.22,h+.92,U,O,hs),H==="x1"&&n(g,P-.22,P,h+.22,h+.92,U,O,hs)};vn(A,me.x0+.25,me.x1-.5,me.z0+.15,me.z0+.95,"z0"),vn(A,me.x0+.25,me.x0+1.05,me.z0+.95,me.z1-.3,"x0"),[[me.x0+1,me.z0+.45],[me.x0+2.6,me.z0+.45],[me.x0+3.6,me.z0+.45],[me.x0+.55,me.z0+1.7]].forEach(([g,w])=>t(A,g,h+.48,w,.32,.3,.14,qi));const Dn=me.x0+2.5,On=me.z0+2.05;n(A,Dn-.9,Dn+.9,h,h+.38,On-.45,On+.45,"#3a3f3a"),n(A,Dn-.92,Dn+.92,h+.38,h+.44,On-.47,On+.47,"#d8d2c2"),n(A,Dn-.6,Dn+.6,h+.44,h+.47,On-.15,On+.15,rn,{cast:!1});let mn=new Ge(new on(1.1,.12,.1).translate(0,.06,0),new fn({color:"#ffb35a",transparent:!0,opacity:.9}));mn.position.set(Dn,h+.47,On),A.add(mn),It(v,me.x0,me.z1,h+me.h,o+.25,u-.2,h+_e+.9,9),It(v,me.x1,me.z1,h+me.h,c-.3,u-.2,h+_e+.9,12),t(v,o+.25,h,u-.2,.06,_e+.95,.06,$n),t(v,c-.3,h,u-.2,.06,_e+.95,.06,$n);const Qn=new ct;v.add(Qn);const Fn=new ui(.17,0),Ri=new Sn({color:"#ffffff"}),Wn=[];let Bn=7;const nn=()=>(Bn=Bn*16807%2147483647,Bn/2147483647),Xn=h+me.h+.26,vi=13;for(let g=0;g<vi;g++){const w=me.x0+.1+g*(me.x1-me.x0-.2)/(vi-1);for(let P=me.z0-.25;P<=me.z1+.25;P+=.3){const U=Math.min(Math.abs(P-me.z0),Math.abs(P-me.z1));nn()<.35+U*.25||Wn.push([w+(nn()-.5)*.22,Xn+nn()*.08,P+(nn()-.5)*.16,.7+nn()*.7])}}[me.z0,me.z1].forEach(g=>{for(let w=me.x0-.05;w<=me.x1+.05;w+=.22)Wn.push([w,Xn-.04+nn()*.06,g+(nn()-.5)*.2,.8+nn()*.5])}),[[me.x0,me.z1,2.3],[me.x1,me.z1,2.1],[me.x0,me.z0,1.2],[me.x1,me.z0,1.4]].forEach(([g,w,P])=>{for(let U=0;U<P;U+=.16){const O=U*4.2+g;Wn.push([g+Math.cos(O)*.12,h+me.h+.1-U,w+Math.sin(O)*.12,.55+nn()*.35-U*.1])}});const xn=new ni(Fn,Ri,Wn.length),ii=new tt,si=new bn,R=new fi,j=new N,ce=new N,ee=new nt,K=["#4f8a3a","#3f7a33","#6a9e45","#2f6a30"];Wn.forEach(([g,w,P,U],O)=>{R.set(nn()*3,nn()*3,nn()*3),si.setFromEuler(R),j.set(U*1.2,U*.7/Mn,U),ce.set(g,w,P),xn.setMatrixAt(O,ii.compose(ce,si,j)),xn.setColorAt(O,ee.set(K[O%K.length]))}),xn.castShadow=!0,xn.receiveShadow=!0,Qn.add(xn);const Re=document.createElement("canvas");Re.width=Re.height=64;const ge=Re.getContext("2d"),ze=ge.createRadialGradient(32,32,0,32,32,32);ze.addColorStop(0,"rgba(255,255,255,1)"),ze.addColorStop(.5,"rgba(255,255,255,.6)"),ze.addColorStop(1,"rgba(255,255,255,0)"),ge.fillStyle=ze,ge.fillRect(0,0,64,64);const et=new Jn(Re),pt=4,yt=4400,Xe=4200,Ct=[],Nt=new ct;F.add(Nt);function Et(g){for(;Ct.length<=g;){const w=new Ph({map:et,color:"#e9e4dc",transparent:!0,depthWrite:!1,opacity:0}),P=new Vg(w);P.renderOrder=5,Nt.add(P),Ct.push(P)}return Ct[g]}const Je={x0:c-4.4,x1:c-1.2,z:l+1.5};n(y,Je.x0,Je.x1,h,h+1.05,Je.z-.45,Je.z,"#25523b"),n(y,Je.x0-.06,Je.x1+.06,h+1.05,h+1.12,Je.z-.55,Je.z+.1,"#ece4d2"),n(y,Je.x0,Je.x1,h+.18,h+.22,Je.z+.16,Je.z+.2,rn,{cast:!1}),n(y,Je.x0,Je.x1,h,h+1.9,l+.2,l+.55,Ar),[.8,1.35].forEach(g=>n(y,Je.x0+.1,Je.x1-.1,h+g,h+g+.05,l+.2,l+.7,Zs,{cast:!1}));for(let g=Je.x0+.5;g<Je.x1-.2;g+=.6)[.85,1.4].forEach((w,P)=>t(y,g+P*.15,h+w+.05,l+.48,.14,.24,.14,["#527e60","#b28b64","#75999a","#d5bd8c"][Math.round(g*3+P)&3]));[Je.x0+.6,(Je.x0+Je.x1)/2,Je.x1-.6].forEach(g=>{t(y,g,h,Je.z+.55,.06,.72,.06,rn);const w=new Ge(new hn(.2,.2,.08,16).translate(0,.04,0),i(qi));w.position.set(g,h+.72,Je.z+.55),w.castShadow=!0,y.add(w)});const Gt=[Je.x0+.7,(Je.x0+Je.x1)/2,Je.x1-.7].map(g=>{t(y,g,h+1.95,Je.z-.25,.02,.6,.02,"#343f33",{cast:!1});const w=new Ge(new di(.13,12,8),he("#f3d9a6","#ffb36a"));return w.position.set(g,h+1.9,Je.z-.25),y.add(w),J.push([w.material,.3,1.4]),w});t(y,(Je.x0+Je.x1)/2,h+1.9,l+.2,.02,.7,Je.z-l,"#343f33",{cast:!1}),n(y,Je.x0-.1,Je.x1+.1,h+2.55,h+2.6,l+.2,Je.z-.2,$n,{cast:!1});const Oe={x:c-.9,z:u-2.2};n(S,Oe.x-.35,Oe.x+.35,h,h+1,Oe.z-.8,Oe.z+.8,"#1d2422"),n(S,Oe.x-.4,Oe.x+.4,h+1,h+1.06,Oe.z-.85,Oe.z+.85,rn,{cast:!1}),[-.4,.4].forEach(g=>{const w=new Ge(new hn(.22,.22,.03,20),i("#2e3330"));w.position.set(Oe.x,h+1.08,Oe.z+g),S.add(w)}),[Oe.z-1.05,Oe.z+1.05].forEach(g=>{t(S,Oe.x+.1,h,g,.45,1.35,.45,"#262b29");const w=new Ge(new Xa(.15,16).rotateY(-Math.PI/2),i("#4a514d"));w.position.set(Oe.x-.13,h+.9,g),S.add(w)});const Tt=new Ge(new Un(2.6,2.2).rotateX(-Math.PI/2),he("#4a3a33","#d06aa0"));Tt.position.set(Oe.x-2.4,h+.012,Oe.z),Tt.receiveShadow=!0,S.add(Tt),J.push([Tt.material,.05,.45]),It(p,c-.3,u-.2,h+_e+.9,c-.3,l+1,h+_e+1.6,10),t(p,c-.3,h,l+1,.06,_e+1.65,.06,$n),[[o+2.8,u-1.05],[o+5.6,u-1.05]].forEach(([g,w])=>{const P=new Ge(new hn(.42,.42,.05,20).translate(0,.025,0),i("#ece4d2"));P.position.set(g,h+.74,w),P.castShadow=!0,I.add(P),t(I,g,h,w,.07,.74,.07,"#2b302d"),[[-.62,0],[.62,0]].forEach(([H,te])=>{t(I,g+H,h,w+te,.38,.45,.38,Zs),t(I,g+H,h+.45,w+te,.4,.05,.4,hs)}),t(I,g,h+.79,w,.05,1.8,.05,"#e1dbc0");const U=new Ge(new Fa(1.25,.45,8,1,!0).translate(0,-.22,0),new Sn({color:"#f1e7cc",side:2}));U.position.set(g,h+2.85,w),U.castShadow=!0,I.add(U);const O=new Ge(new Fa(1.27,.1,8,1,!0).translate(0,-.42,0),i("#1f6b47"));O.position.copy(U.position),I.add(O)});const wt=(g,w,P,U)=>{const H=me.h-.12,te=.1*U,Z=(ne,fe,Ee,we)=>P?n(z,g+te+ne*U,g+te+fe*U,h+Ee,h+we,w-.06,w+.06,qi):n(z,g-.06,g+.06,h+Ee,h+we,w+te+ne*U,w+te+fe*U,qi);Z(0,.42,H-1.1,H),Z(0,.42*.45,.95,H-1.1),Z(0,.42*.8,0,.95),P?n(z,g+te,g+te+.2*U,h+1.05,h+1.12,w-.08,w+.08,rn,{cast:!1}):n(z,g-.08,g+.08,h+1.05,h+1.12,w+te,w+te+.2*U,rn,{cast:!1})};wt(me.x0,me.z1,!0,1),wt(me.x1,me.z1,!0,-1),wt(me.x1,me.z1,!1,-1),wt(me.x1,me.z0,!1,1),n(M,me.x0,me.x1,h+me.h-.1,h+me.h-.05,me.z1+.06,me.z1+.1,rn,{cast:!1}),n(M,me.x1+.06,me.x1+.1,h+me.h-.1,h+me.h-.05,me.z0,me.z1,rn,{cast:!1});for(let g=0;g<4;g++){const w=Je.x0+.5+g*(Je.x1-Je.x0-1)/3,P=Je.z-.22;n(B,w-.26,w+.26,h+1.12,h+1.15,P-.13,P+.13,Zs),[-.13,.13].forEach((U,O)=>{const H=new Ge(new hn(.075,.075,.2,10).translate(0,.1,0),new Sn({color:"#d7ece4",transparent:!0,opacity:.5}));H.position.set(w+U,h+1.15,P),B.add(H),t(B,w+U,h+1.16,P,.09,.1,.09,["#5f8a3c","#7a9a42","#4f7a3a","#8c9a4a"][g+O&3]),t(B,w+U,h+1.35,P,.16,.03,.16,rn,{cast:!1})})}const Ut=(Je.x0+Je.x1)/2;n(B,Ut-.75,Ut+.75,h+1.97,h+2.47,l+.3,l+.36,"#22302a"),n(B,Ut-.8,Ut+.8,h+1.94,h+2.5,l+.26,l+.3,Ar);for(let g=0;g<4;g++)n(B,Ut-.6,Ut+(g&1?.25:.5),h+2.36-g*.1,h+2.38-g*.1,l+.36,l+.37,hs,{cast:!1});const Ot={x0:o+6.9,x1:o+9.1,z:u-.85};n(Y,Ot.x0,Ot.x1,h+.72,h+.78,Ot.z-.3,Ot.z+.3,Zs),[[Ot.x0+.1,-.22],[Ot.x0+.1,.22],[Ot.x1-.1,-.22],[Ot.x1-.1,.22]].forEach(([g,w])=>t(Y,g,h,Ot.z+w,.07,.72,.07,Ar)),n(Y,Ot.x0+.1,Ot.x1-.1,h+.78,h+.79,Ot.z-.1,Ot.z+.1,hs,{cast:!1});for(let g=0;g<4;g++){const w=Ot.x0+.3+g*(Ot.x1-Ot.x0-.6)/3,P=new Ge(new hn(.12,.1,.02,14).translate(0,.01,0),i("#fbf8ee"));P.position.set(w,h+.79,Ot.z-.17+(g&1)*.34),Y.add(P),t(Y,w,h+.8,Ot.z-.17+(g&1)*.34,.08,.04,.08,"#6f9a45"),t(Y,w,h,Ot.z+.46,.07,.5,.07,rn),t(Y,w,h+.5,Ot.z+.46,.28,.06,.28,qi)}[Ot.x0+.55,Ot.x1-.55].forEach(g=>{t(Y,g,h+.79,Ot.z,.05,.22,.05,rn,{cast:!1});const w=new Ge(new di(.07,10,6),he("#fff0c8","#ffc56a"));w.position.set(g,h+1.05,Ot.z),Y.add(w),J.push([w.material,.3,1.6])}),[d.z-.55,d.z+.55].forEach(g=>{[o+.45,o+1.35].forEach(w=>{t(T,w,h,g,.07,.82,.07,rn),t(T,w,h+.82,g,.13,.08,.13,rn)}),n(T,o+.45,o+1.35,h+.66,h+.71,g-.025,g+.025,qi,{cast:!1})}),n(T,o+1.6,o+6.4,h+.006,h+.014,u-1.95,u-.25,rn,{cast:!1}),n(T,o+1.7,o+6.3,h+.008,h+.018,u-1.85,u-.35,qi,{cast:!1}),[[c-.35,u-1.1],[o+6.6,l+.35]].forEach(([g,w])=>{t(re,g,h,w,.26,.1,.26,rn),t(re,g,h+.1,w,.06,1.25,.06,rn);const P=new Ge(new on(.24,.34,.24).translate(0,.17,0),he("#fff1cf","#ffcf7a"));P.position.set(g,h+1.35,w),P.castShadow=!1,re.add(P),J.push([P.material,.35,1.5]),t(re,g,h+1.69,w,.3,.05,.3,rn,{cast:!1})});const dn=new di(.06,8,6),kn=he("#fff1cf","#ffcf7a");J.push([kn,.2,1.6]);const Kt=new Map;Xt.forEach(([g,...w])=>{Kt.has(g)||Kt.set(g,[]),Kt.get(g).push(w)});const en=new tt,jn=[];Kt.forEach((g,w)=>{const P=new ni(dn,kn,g.length);g.forEach(([U,O,H],te)=>P.setMatrixAt(te,en.makeTranslation(U,O,H))),w.add(P),jn.push(P)});const _n=new Ka("#ffc98a",0,14,1.2);_n.position.set((o+c)/2,h+2.6,(l+u)/2),s.add(_n);const An=e.shell,Yt=An.loungeFront,Bt=An.loungeDoor.x,yn=An.loungeHeader,gn=.7,is=.81,ki=new ct;a.add(ki);const zn=new ct;ki.add(zn),n(zn,Bt-gn-.12,Bt-gn,0,yn+.12,Yt-.02,Yt+.1,"#1f4a35"),n(zn,Bt+gn,Bt+gn+.12,0,yn+.12,Yt-.02,Yt+.1,"#1f4a35"),n(zn,Bt-gn-.12,Bt+gn+.12,yn,yn+.14,Yt-.02,Yt+.1,"#1f4a35");const xi=Yt-is-1.5;n(zn,Bt-gn-.1,Bt-gn,0,yn,xi,Yt-.02,"#26302a",{cast:!1}),n(zn,Bt+gn,Bt+gn+.1,0,yn,xi,Yt-.02,"#26302a",{cast:!1}),n(zn,Bt-gn,Bt+gn,0,yn,xi-.1,xi,"#2f3a32",{cast:!1}),n(zn,Bt-gn,Bt+gn,yn,yn+.05,xi,Yt-.02,"#1d241f",{cast:!1}),n(zn,Bt-.38,Bt+.38,.004,.014,xi,Yt-.02,qi,{cast:!1});const se=new Ge(new di(.1,12,8),he("#fff2c8","#ffd58a"));se.position.set(Bt,yn-.45,xi+.06),zn.add(se),J.push([se.material,.6,1.2]);const Q=new ct;Q.position.set(Bt-gn+.02,0,Yt+.02),zn.add(Q);const Te=gn*2-.04,Me=yn-.03;n(Q,0,Te,.01,Me,-.03,.03,"#2d6146"),[[.32,.95],[1.15,1.85]].forEach(([g,w])=>n(Q,.14,Te-.14,g,w,.03,.05,"#357052",{cast:!1})),n(Q,.08,Te-.08,.02,.2,.03,.045,rn,{cast:!1}),n(Q,Te-.2,Te-.12,.95,1.1,.03,.1,rn,{cast:!1});const Ce=document.createElement("canvas");Ce.width=256,Ce.height=96;const Ne=new Jn(Ce);Ne.colorSpace=jt;const Ze=new Ge(new Un(.66,.25),new fn({map:Ne}));Ze.position.set(Te*.62,1.5,.056),Q.add(Ze);const Ye=document.createElement("canvas");Ye.width=512,Ye.height=64;const ut=new Jn(Ye);ut.colorSpace=jt,ut.anisotropy=4;const Pt=new fn({map:ut,transparent:!0}),Mt=new ct;Mt.position.set(An.loungeSign.x,An.loungeSign.y,Yt+.05),Mt.scale.setScalar(An.loungeSign.scale),ki.add(Mt),[.12,-.1].forEach((g,w)=>{const P=new Ge(new Un(2.3,.26),Pt);P.rotation.z=g,P.position.z=w*.006,Mt.add(P)});function bt(){const g='"Fredoka", "Bricolage Grotesque", sans-serif';let w=Ce.getContext("2d");w.fillStyle="#ece4d2",w.fillRect(0,0,256,96),w.strokeStyle=rn,w.lineWidth=6,w.strokeRect(3,3,250,90),w.fillStyle="#1f3a2c",w.font=`600 40px ${g}`,w.textAlign="center",w.textBaseline="middle",w.fillText("STAFF ONLY",128,51),Ne.needsUpdate=!0,w=Ye.getContext("2d"),w.clearRect(0,0,512,64),w.fillStyle="#e8b13a",w.fillRect(0,6,512,52),w.fillStyle="#2b2414",w.font=`600 34px ${g}`,w.textAlign="center",w.textBaseline="middle",w.fillText("COMING SOON  ·  COMING SOON",256,33),ut.needsUpdate=!0}bt(),document.fonts&&document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",bt);let Qe=0,Ht=null,kt=null;const Qt=[],Pn=[],Ln=new Set,qn=new Set,_s=he("#fff0c8","#ffc56a");J.push([_s,.3,1.6]);function Ya(g,w){const P=[{file:"rooftop_site.glb",parent:b,hide:W,at:[[0,0]]},{file:"rooftop_speakeasy.glb",parent:v,hide:A,at:[[o+3.8,l+1.825]]},{file:"rooftop_pergola_vines.glb",parent:v,hide:Qn,at:[[o+3.8,l+1.825]]},{file:"rooftop_bar.glb",parent:m,hide:y,at:[[(Je.x0+Je.x1)/2,Je.z-.225]]},{file:"rooftop_dj_booth.glb",parent:p,hide:S,at:[[Oe.x,Oe.z]]},{file:"rooftop_parasol_table.glb",parent:x,hide:I,at:[[o+2.8,u-1.05],[o+5.6,u-1.05]]},{file:"rooftop_olive.glb",parent:F,hide:ue,at:[[c-.5,u-.5],[c-.6,l+.6]]},{file:"rooftop_drapes.glb",parent:M,hide:z,at:[[me.x0,me.z1,0],[me.x1,me.z1,Math.PI],[me.x1,me.z1,Math.PI/2],[me.x1,me.z0,-Math.PI/2]]},{file:"rooftop_jar_flight.glb",parent:_,hide:B,at:[[(Je.x0+Je.x1)/2,Je.z-.225]]},{file:"rooftop_chefs_table.glb",parent:D,hide:Y,at:[[o+8,u-.85]]},{file:"rooftop_lantern.glb",parent:T,hide:re,at:[[c-.35,u-1.1],[o+6.6,l+.35]]}];P.forEach(Z=>qn.add(Z.parent)),P.forEach(Z=>g.load(w+Z.file,ne=>{const fe=ne.scene;fe.traverse(V=>{V.isMesh&&(V.castShadow=V.receiveShadow=!0)});const Ee=fe.getObjectByName("Flame"),we=fe.getObjectByName("DanceFloor");fe.traverse(V=>{/^Sign/.test(V.name)&&(V.visible=!1)}),Ee&&Ee.traverse(V=>{V.isMesh&&(V.material=mn.material,V.castShadow=!1)}),we&&we.traverse(V=>{V.isMesh&&(V.material=Tt.material)}),Gt.forEach((V,ye)=>{const Ae=fe.getObjectByName("BarLamp"+ye);Ae&&Ae.traverse(Ke=>{Ke.isMesh&&(Ke.material=V.material,Ke.castShadow=!1)})}),fe.traverse(V=>{V.isMesh&&/^(CandleGlow|LanternGlow)/.test(V.name)&&(V.material=_s,V.castShadow=!1)}),fe.traverse(V=>{const ye=V.isMesh&&V.material;ye&&/^Vine/.test(ye.name)&&!Pn.some(Ae=>Ae[0]===ye)&&Pn.push([ye,ye.color.clone()])}),Ps(fe),Z.at.forEach(([V,ye,Ae],Ke)=>{const lt=new ct;Ae&&(lt.rotation.y=Ae),lt.add(Ke?fe.clone():fe),lt.scale.set(1.69,1.69/Mn,1.69),lt.position.set(V,h,ye),Z.parent.add(lt)}),Ee&&(mn=Ee),Z.hide.visible=!1,Ln.add(Z.parent)},void 0,ne=>console.warn("3D map: could not load "+Z.file,ne))),g.load(w+"string_bulb.glb",Z=>{const ne=Z.scene;ne.updateMatrixWorld(!0);const fe=ye=>{const Ae=ne.getObjectByName(ye),Ke=[];return Ae?(Ae.traverse(lt=>{if(lt.isMesh){const Ve=lt.geometry.clone().applyMatrix4(lt.matrixWorld);Object.keys(Ve.attributes).forEach(At=>{At!=="position"&&At!=="normal"&&Ve.deleteAttribute(At)}),Ke.push(Ve.index?Ve.toNonIndexed():Ve)}}),Di(Ke).scale(1.69,1.69/Mn,1.69)):null},Ee=fe("Bulb"),we=fe("Socket");if(!Ee||!we)return;const V=new Sn({color:"#22262a"});jn.forEach(ye=>{ye.geometry=Ee;const Ae=new ni(we,V,ye.count);Ae.instanceMatrix.copy(ye.instanceMatrix),ye.parent.add(Ae)})},void 0,Z=>console.warn("3D map: could not load string_bulb.glb",Z));const U=(Z,ne,fe,Ee,we)=>{const V=new ct;return V.add(ne),V.scale.set(1.69,1.69/Mn,1.69),V.position.set(fe,Ee,we),Z.add(V),ne.traverse(ye=>{ye.isMesh&&(ye.castShadow=ye.receiveShadow=!0)}),Ps(ne),V},O=(Z,ne)=>g.load(w+Z,fe=>ne(fe.scene),void 0,fe=>console.warn("3D map: could not load "+Z,fe));O("lounge_elevator_shaft.glb",Z=>gt.forEach((ne,fe)=>{const Ee=fe?Z.clone():Z;Ee.traverse(we=>{we.isMesh&&we.material&&/Glass/.test(we.material.name)&&(we.material=q,we.castShadow=we.receiveShadow=!1,fe||Qt.push(we))}),U(ne.frame,Ee,d.x,0,ne.lz),ne.kf.visible=ne.ki.visible=!1})),O("lounge_elevator_cab.glb",Z=>gt.forEach((ne,fe)=>{const Ee=fe?Z.clone():Z;Ee.traverse(we=>{/^Rail/.test(we.name)&&(we.visible=!1),we.name==="CabLamp"&&we.traverse(V=>{V.isMesh&&(V.material=ne.cabLamp.material,V.castShadow=!1)})}),U(ne.cab,Ee,0,0,0),ne.cabK.visible=!1})),O("lounge_bridge.glb",Z=>gt.forEach((ne,fe)=>{const Ee=fe?Z.clone():Z;Ee.traverse(we=>{we.isMesh&&we.material&&/Glass/.test(we.material.name)&&(we.material=q,we.castShadow=we.receiveShadow=!1)}),U(ne.inside,Ee,(d.x+d.w/2+o)/2,h,ne.lz),ne.kb.visible=!1})),O("lounge_door.glb",Z=>{const ne=Z.getObjectByName("DoorLeaf"),fe=Z.getObjectByName("StaffPlaque"),Ee=Z.getObjectByName("Sconce");ne&&(Ee&&Ee.traverse(we=>{we.isMesh&&(we.material=se.material,we.castShadow=!1)}),U(ki,Z,Bt,0,Yt),Ht=ne,kt=fe,zn.visible=!1)});const H=["deck_planter.glb","deck_planter_short.glb"];let te=0;H.forEach((Z,ne)=>O(Z,fe=>{const[Ee,we,V,ye]=We[ne];U(F,fe,(Ee+we)/2,h,(V+ye)/2),++te===H.length&&(ke.visible=!1)}))}function Ja(g,w){const P=Math.min(L.length,Math.max(1,g)),U=[...f,F,Ft,dt,Nt];if(!L.slice(0,P).every(ne=>!qn.has(ne)||Ln.has(ne))||!Ln.has(F))return null;const O=U.map(ne=>ne.visible);b.visible=!1,F.visible=!0,Nt.visible=!1,L.forEach((ne,fe)=>{ne.visible=fe<P}),Ft.visible=!!w,dt.visible=!w;const H=a.clone();U.forEach((ne,fe)=>{ne.visible=O[fe]}),H.updateMatrixWorld(!0);const te=[],Z=new Nn;return H.traverse(ne=>{if(ne!==H){if(!ne.visible||ne.isSprite){te.push(ne);return}!ne.isMesh||ne.isInstancedMesh||(ne.geometry.boundingBox||ne.geometry.computeBoundingBox(),Z.copy(ne.geometry.boundingBox).applyMatrix4(ne.matrixWorld),(Z.max.y<h-.05||Z.min.x<o-.2)&&te.push(ne))}}),te.forEach(ne=>ne.parent&&ne.parent.remove(ne)),H}return{loadModels:Ya,pictureCopy:Ja,update(g){const w=g.loungeOpen?Math.max(1,g.loungeTier||1):0,P=g.night||0;b.visible=!w,F.visible=!!w;const U=!w&&g.loungeBuild!=null;Wt.visible=U,Se.visible=!w,U&&(Fe.forEach((Z,ne)=>{Z.visible=ne<Math.floor(g.loungeBuild*Fe.length)}),le.rotation.y=Math.sin((g.time||0)/5e3)*.7,ae.visible=Math.floor((g.time||0)/500)%2===0),L.forEach((Z,ne)=>{Z.visible=w>ne}),X.position.y=g.liftY||0,Pe&&(Pe.position.y=g.liftY2||0,Ft.visible=!!g.loungeLift,dt.visible=!g.loungeLift),Qe+=((w?1.75:0)-Qe)*.15,Q.rotation.y=Qe,Ze.visible=!w,Mt.visible=!w,Ht&&(Ht.rotation.y=Qe,kt&&(kt.visible=!w)),Qt.forEach(Z=>{Z.visible=!!w}),J.forEach(([Z,ne,fe])=>{Z.emissiveIntensity=ne+P*fe}),mn.scale.y=.8+Math.sin((g.time||0)/130)*.2+Math.sin((g.time||0)/53)*.1,mn.visible=w>=1,Ri.color.setScalar(1-P*.45),Pn.forEach(([Z,ne])=>Z.color.copy(ne).multiplyScalar(1-P*.45));const O=w?g.loungeSmokers||[]:[],H=g.time||0;let te=0;O.forEach(Z=>{for(let ne=0;ne<pt;ne++){const fe=(H+Z.id*1777%yt+ne*yt/pt)%yt/Xe;if(fe>=1)continue;const Ee=Et(te++),we=.75+fe*2.3,V=Math.sin(fe*3+Z.id+ne)*.2;Ee.visible=!0,Ee.position.set(Z.x+(Z.facing||0)*.4+V+fe*.25,h+1.65+fe*2,Z.z+.1-fe*.15),Ee.scale.set(we,we/Mn,1),Ee.material.opacity=Math.min(1,fe*6)*Math.pow(1-fe,.8)*.95,Ee.material.color.setScalar(.72-P*.25)}});for(let Z=te;Z<Ct.length;Z++)Ct[Z].visible=!1;_n.intensity=w?P*6:0}}}const Tr="#1f4a35",Jl="#173a2a",ei="#d0a54e",ya="#efe4cf",X0="#d8d0bf",j0="#a9a08f",Ma="#3c4a44",Zl="#bfb8aa",Sa="#e8b13a",q0="#8f7a5e",Ei=3.4,Ki=2.9,Yi=5;function K0(s,e,{material:t}){const n=e.flagshipLot;if(!n)return null;const i=e.plazaY,r=new ct;r.name="flagship",s.add(r);const a=n.x0+.45,o=n.x1-.45,c=n.z0+.45,l=n.z1-.45,u=(a+o)/2,h=(c+l)/2,d=i+Ei+Yi*Ki,f=new on(1,1,1).translate(0,.5,0);function b(){const le=new Map,C=new ct;return r.add(C),{group:C,add(E,k,ae,de,oe,Fe,xe){const Ie=f.clone();Ie.scale(de,oe,Fe),Ie.translate(E,k,ae),le.has(xe)||le.set(xe,[]),le.get(xe).push(Ie)},span(E,k,ae,de,oe,Fe,xe){this.add((E+k)/2,ae,(oe+Fe)/2,k-E,de-ae,Fe-oe,xe)},seal(E={}){return le.forEach((k,ae)=>{const de=new Ge(Di(k),E[ae]||t(ae));de.castShadow=de.receiveShadow=!(E[ae]&&E[ae].transparent),C.add(de)}),C}}}const v=t("#9fc7b6",{emissive:"#ffd896",emissiveIntensity:.05,name:"flagshipShop"}),m=t("#7fae9c",{emissive:"#f2c675",emissiveIntensity:0,name:"flagshipCurtain"}),p=new fn({color:ei}),x=b();x.span(n.x0+.2,n.x1-.2,i,i+.04,n.z0+.2,n.z1-.2,q0);const M=n.x0+.25,_=n.x1-.25,D=n.z0+.25,T=n.z1-.25,L=1.6,A=.1;[[M,_,T-A,T],[M,_,D,D+A],[M,M+A,D,T],[_-A,_,D,T]].forEach(([le,C,E,k])=>{x.span(le,C,i,i+L,E,k,Tr),x.span(le-.02,C+.02,i+L,i+L+.08,E-.02,k+.02,ei)}),x.span(a+.4,a+2.4,i,i+1.9,c+.4,c+1.6,ya),x.span(a+.3,a+2.5,i+1.9,i+2.02,c+.3,c+1.7,Ma);const y=x.seal(),S=document.createElement("canvas");S.width=512,S.height=192;const I=new Jn(S);I.colorSpace=jt;function z(){const le=S.getContext("2d"),C=512,E=192;le.fillStyle=Jl,le.fillRect(0,0,C,E),le.strokeStyle=ei,le.lineWidth=4,le.strokeRect(10,10,C-20,E-20),le.fillStyle=ya,le.textAlign="center",le.textBaseline="middle",le.font='700 64px "Bricolage Grotesque", "Helvetica Neue", sans-serif',"letterSpacing"in le&&(le.letterSpacing="8px"),le.fillText("CANOPY HQ",C/2,82),le.fillStyle=ei,le.font='600 28px "Bricolage Grotesque", "Helvetica Neue", sans-serif',"letterSpacing"in le&&(le.letterSpacing="6px"),le.fillText("COMING SOON",C/2,140),I.needsUpdate=!0}z(),document.fonts&&document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",z);const B=new Ge(new Un(4.4,1.65),new Sn({map:I}));B.rotation.y=Math.PI/2,B.position.set(_+.02,i+L+1.1,h),y.add(B);const Y=b();[-1.6,1.6].forEach(le=>Y.add(_-.1,i+L,h+le,.12,.4,.12,Ma)),y.add(Y.seal());const re=b();re.span(a,o,i,i+Ei,c,l,X0),re.span(a-.08,o+.08,i,i+.35,c-.08,l+.08,j0);const F=4;for(let le=0;le<F;le++){const C=a+.35+le*(o-a-.7)/F,E=C+(o-a-.7)/F;re.span(C+.08,E-.08,i+.35,i+2.5,l,l+.06,Tr);const k=c+.35+le*(l-c-.7)/F,ae=k+(l-c-.7)/F;re.span(o,o+.06,i+.35,i+2.5,k+.08,ae-.08,Tr)}re.span(a-.05,o+.12,i+2.75,i+3.05,l,l+.12,ei),re.span(o,o+.12,i+2.75,i+3.05,c-.05,l+.12,ei),re.span(a-.12,o+.12,i+Ei-.05,i+Ei+.2,c-.12,l+.12,Zl);const q=re.seal(),G=b();for(let le=0;le<F;le++){const C=a+.35+le*(o-a-.7)/F,E=C+(o-a-.7)/F,k=c+.35+le*(l-c-.7)/F,ae=k+(l-c-.7)/F;G.span(C+.2,E-.2,i+.5,i+2.35,l+.06,l+.08,"shop"),G.span(o+.06,o+.08,i+.5,i+2.35,k+.2,ae-.2,"shop")}q.add(G.seal({shop:v}));const he=Array.from({length:Yi},(le,C)=>{const E=b(),k=i+Ei+C*Ki,ae=[a+.1,u,o-.1],de=[c+.1,h,l-.1];return ae.forEach(oe=>de.forEach(Fe=>{oe===u&&Fe===h||E.add(oe,k,Fe,.28,Ki,.28,Ma)})),E.span(a-.05,o+.05,k+Ki-.18,k+Ki,c-.05,l+.05,Zl),E.seal()}),J=Array.from({length:Yi},(le,C)=>{const E=b(),k=i+Ei+C*Ki,ae=k+.02,de=k+Ki-.2;E.span(a+.12,o-.12,ae,de,c+.12,l-.12,"glass");const oe=5;for(let Fe=1;Fe<oe;Fe++){const xe=a+(o-a)*Fe/oe,Ie=c+(l-c)*Fe/oe;E.add(xe,ae,l-.08,.07,de-ae,.06,ei),E.add(o-.08,ae,Ie,.06,de-ae,.07,ei)}return E.seal({glass:m})}),$=b();$.span(a+.6,o-.6,d,d+1.6,c+.6,l-.6,Tr),$.span(a+.45,o-.45,d+1.6,d+1.8,c+.45,l-.45,ei);for(let le=0;le<=6;le++){const C=a+.7+(o-a-1.4)*le/6,E=c+.7+(l-c-1.4)*le/6;$.add(C,d,l-.55,.1,1.6,.14,ei),$.add(o-.55,d,E,.14,1.6,.1,ei)}$.span(u-.8,u+.8,d+1.8,d+2.6,h-.8,h+.8,Jl),$.add(a+1,d+1.8,c+1,.06,3,.06,Ma),$.add(a+1.5,d+4.1,c+1,.9,.55,.03,"#b23b3b");const ve=$.seal(),Le=Di([[0,1.25],[-.6,.95],[.6,.95]].map(([le,C])=>{const E=new di(.5,10,6);return E.scale(.32,C,.08),E.translate(0,C*.5,0),E.rotateZ(le),E})),ie=new Ge(Le,p);ie.position.set(u,d+2.6,h+.2),ve.add(ie);const pe=document.createElement("canvas");pe.width=128,pe.height=768;const De=new Jn(pe);De.colorSpace=jt;function _e(){const le=pe.getContext("2d"),C=128,E=768;le.fillStyle=Tr,le.fillRect(0,0,C,E),le.strokeStyle=ei,le.lineWidth=6,le.strokeRect(6,6,C-12,E-12),le.save(),le.translate(C/2+4,E/2),le.rotate(-Math.PI/2),le.fillStyle=ya,le.font='700 74px "Bricolage Grotesque", "Helvetica Neue", sans-serif',le.textAlign="center",le.textBaseline="middle","letterSpacing"in le&&(le.letterSpacing="16px"),le.fillText("CANOPY",0,0),le.restore(),De.needsUpdate=!0}_e(),document.fonts&&document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",_e);const st=new Sn({map:De,emissive:"#ffffff",emissiveMap:De,emissiveIntensity:.15,side:2}),it=new Ge(new Un(1.3,7.8),st);it.rotation.y=Math.PI/4,it.position.set(o+.55,i+Ei+4.6,l+.55),ve.add(it);const ht=b();[1.2,7.6].forEach(le=>ht.add(o+.25,i+Ei+le,l+.25,.7,.1,.1,ei)),ve.add(ht.seal());const dt=new ct;r.add(dt);const ft=a-.1,mt=c-.1,W=d+3.5-i,Wt=b();Wt.add(ft,i,mt,1.1,.3,1.1,"#8d918a"),Wt.add(ft,i+.3,mt,.4,W,.4,Sa);for(let le=1.4;le<W;le+=1.4)Wt.add(ft,i+.3+le,mt,.46,.08,.46,"#6b5320");dt.add(Wt.seal());const _t=new ct;_t.position.set(ft,i+.3+W,mt),dt.add(_t);const at=b();at.add(0,0,0,.7,.55,.6,ya),at.add(4.2,.55,0,8.4,.2,.26,Sa),at.add(-1.5,.55,0,3,.2,.26,Sa),at.add(-2.6,.1,0,.9,.6,.6,"#8d918a"),at.add(0,.55,0,.16,1.3,.16,Sa),at.add(5.6,-3.4,0,.04,4,.04,"#2e3330"),at.add(5.6,-3.95,0,1.2,.14,.8,"#9a7a52"),at.add(5.6,-3.8,0,1.1,.35,.7,"#c9a978"),_t.add(at.seal());const rt=new Ge(new di(.15,10,8),new fn({color:"#ffb52e"}));rt.position.set(0,1.95,0),_t.add(rt);const qt=Array.from({length:Yi+1},(le,C)=>{const E=b(),k=C?i+Ei+(C-1)*Ki:i,ae=C?Ki:Ei;return E.span(a-.1,o+.1,k+ae-.3,k+ae-.24,l+.55,l+1.05,"#c9a978"),[a,u,o].forEach(de=>E.add(de,k,l+.95,.06,ae,.06,"#9aa39b")),E.seal()});return{update(le){const C=Math.max(0,Math.min(4,le.flagship||0)),E=le.flagshipBuild,k=E!=null,ae=le.night||0,de=le.time||0;r.visible=!0,y.visible=C===0,q.visible=C>=1||k&&C===0,q.scale.y=C>=1?1:Math.max(.02,E||0);const oe=C>=2?Yi:C===1&&k?Math.floor(E*(Yi+.999)):0;he.forEach((vt,Se)=>{vt.visible=Se<oe});const Fe=C>=3?Yi:C===2&&k?Math.floor(E*(Yi+.999)):0;J.forEach((vt,Se)=>{vt.visible=Se<Fe});const xe=C===3&&k;ve.visible=C>=4||xe,xe?(ve.position.y=-(1-E)*2.6,it.visible=E>.6,ie.visible=E>.85):(ve.position.y=0,it.visible=ie.visible=!0),dt.visible=C<4&&(C>=1||k),_t.rotation.y=k?Math.sin(de/5200)*.9+.6:.6,rt.visible=k&&Math.floor(de/500)%2===0;const Ie=k?C===0?1:C===1?oe+1:Yi+1:0;qt.forEach((vt,Se)=>{vt.visible=Se<Ie}),v.emissiveIntensity=.05+ae*.6,m.emissiveIntensity=ae*.26,st.emissiveIntensity=.15+ae*.75,p.color.set(ei).multiplyScalar(1+ae*.4)},height(le){return le>=4?d+3:le>=2?d+.5:le>=1?i+Ei+1:i+L+2.2},centre:{x:u,z:h}}}const Y0="#1f6b47",J0="#d0a54e";function Z0(s,e,{span:t,model:n}){const i=e.entrance;if(!i)return null;const r=new ct;s.add(r);const a=i.x;function o(M,_,D){const T=new cn;T.setAttribute("position",new zt(M.flat(),3)),T.setAttribute("uv",new zt(_.flat(),2)),T.setIndex(M.length===4?[0,1,2,0,2,3]:[0,1,2]),T.computeVertexNormals();const L=new Ge(T,D);return L.castShadow=L.receiveShadow=!0,r.add(L),L}const c=i.sign,l=new ct;r.add(l),t(l,c.x0,a,c.y1+.08,c.y1+.16,c.z-.05,c.z+.05,Y0),[c.x0+.12,c.x1-.12].forEach(M=>t(l,M-.015,M+.015,c.y1,c.y1+.08,c.z-.015,c.z+.015,J0,{cast:!1})),t(l,c.x0-.04,c.x1+.04,c.y0-.04,c.y1+.04,c.z-.05,c.z+.05,"#1d211f");const u=document.createElement("canvas");u.width=256,u.height=284;const h=u.getContext("2d");h.fillStyle="#0d120f",h.fillRect(0,0,256,284);const d=128,f=150,b=(M,_)=>{const D=118*_,T=17*_,L=M-Math.PI/2,A=Math.cos(L),y=Math.sin(L),S=16,I=Y=>Array.from({length:S+1},(re,F)=>{const q=F/S,G=T*Math.pow(Math.sin(Math.PI*Math.min(1,q*1.08)),.9)*(F%2?1:.72);return[d+A*D*q-y*G*Y,f+y*D*q+A*G*Y]}),z=I(1),B=I(-1).reverse();h.moveTo(d,f),z.forEach(Y=>h.lineTo(Y[0],Y[1])),B.forEach(Y=>h.lineTo(Y[0],Y[1])),h.closePath()},v=()=>{h.beginPath(),[[0,1],[-.5,.84],[.5,.84],[-1.05,.7],[1.05,.7],[-1.6,.38],[1.6,.38]].forEach(([M,_])=>b(M,_))};h.lineJoin=h.lineCap="round",v(),h.shadowColor="#29ff6a",h.shadowBlur=18,h.strokeStyle="#3df27a",h.lineWidth=12,h.stroke(),v(),h.shadowBlur=0,h.strokeStyle="#e4ffe9",h.lineWidth=6,h.stroke(),v(),h.fillStyle="#0f1812",h.fill();const m=()=>{h.beginPath(),h.moveTo(d,f-6),h.lineTo(d,f+34)};m(),h.shadowBlur=14,h.strokeStyle="#3df27a",h.lineWidth=7,h.stroke(),m(),h.shadowBlur=0,h.strokeStyle="#e4ffe9",h.lineWidth=3,h.stroke(),h.font='300 54px "Fredoka", sans-serif',h.textAlign="center",h.textBaseline="alphabetic",h.lineWidth=2.5,h.shadowColor="#29ff6a",h.shadowBlur=16,h.strokeStyle="#7dff9f",h.strokeText("OPEN",d,262,210),h.shadowBlur=0,h.strokeStyle="#ecfff0",h.lineWidth=1.5,h.strokeText("OPEN",d,262,210);const p=new Jn(u);p.colorSpace=jt;const x=new fn({map:p,toneMapped:!1,side:2});return[c.z-.052,c.z+.052].forEach(M=>{const _=o([[c.x0,c.y1,M],[c.x1,c.y1,M],[c.x1,c.y0,M],[c.x0,c.y0,M]],[[0,1],[1,1],[1,0],[0,0]],x);_.castShadow=!1,l.attach(_)}),n&&n("blade_sign.glb",a,0,c.z,M=>{let _=0;const D=p.clone();D.flipY=!1,D.needsUpdate=!0;const T=x.clone();T.map=D,M.traverse(L=>{L.isMesh&&/^SignFace/.test(L.name)&&(L.material=T,L.castShadow=!1,_++)}),_?l.visible=!1:M.parent.visible=!1},r),r}const Q0=5e3,$0=8e3,Ql=4e3,Ea=9e4,eb=8,Uo=256,Oo=64,wa=2,$l=new Map;function Aa(s){if(typeof s!="string")return null;let e=$l.get(s);if(e!==void 0)return e;if(e=null,s[0]==="#"){let t=s.slice(1);(t.length===3||t.length===4)&&(t=t.split("").map(n=>n+n).join("")),(t.length===6||t.length===8)&&(e=[new nt("#"+t.slice(0,6)),t.length===8?parseInt(t.slice(6),16)/255:1])}else if(/^rgba?\(/.test(s)){const t=s.match(/[\d.]+/g).map(Number);e=[new nt(`rgb(${t[0]},${t[1]},${t[2]})`),t.length>3?t[3]:1]}return $l.set(s,e),e}function tb(s){const e=new ct;e.visible=!1,s.add(e);const t=new tt,n=new N,i=new N,r=new bn,a=new N(0,1,0),o=new N,c=new nt("#ffffff");function l(F,q,G,he=!0){const J=new ni(F,G,q);return J.instanceMatrix.setUsage(35048),J.setColorAt(0,c),J.count=0,J.castShadow=he,J.receiveShadow=!0,J.frustumCulled=!1,e.add(J),J}const u=F=>new Sn({color:"#ffffff",...F}),h=F=>new fn({color:"#ffffff",...F}),d={transparent:!0,opacity:.32,depthWrite:!1},f=new on(1,1,1).translate(0,.5,0),b=new hn(.5,.5,1,8,1).translate(0,.5,0),v=new ui(1,2),m=new hn(1,1,.02,20),p=new Xa(1,24).rotateY(Math.PI/4),x={box:[l(f,Q0,u()),l(f,800,h()),l(f,800,u(d),!1)],cord:[l(b,$0,u()),l(b,1500,h())],blob:[l(v,Ql,u()),l(v,600,h())],disc:[l(m,Ql,u(),!1),l(m,600,h(),!1)],facing:[l(p,600,u({side:2}),!1),l(p,300,h({side:2}),!1)]};function M(F,q){const G=new cn;G.setAttribute("position",new $t(new Float32Array(Ea*3),3).setUsage(35048)),G.setAttribute("normal",new $t(new Float32Array(Ea*3),3).setUsage(35048)),G.setAttribute("color",new $t(new Float32Array(Ea*(q?4:3)),q?4:3).setUsage(35048)),G.setDrawRange(0,0),Object.assign(F,{vertexColors:!0,side:2,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});const he=new Ge(G,F);return he.frustumCulled=!1,he.receiveShadow=!0,e.add(he),{mesh:he,g:G,alpha:q,n:0}}const _=[M(u(),!1),M(h(),!1),M(u({transparent:!0,depthWrite:!1}),!0)],D=new Map;function T(F,q){const G=F.x.toFixed(2)+","+F.y.toFixed(2)+","+F.z.toFixed(2)+","+F.alongZ;let he=D.get(G);if(!he){const J=document.createElement("canvas");J.width=Uo*wa,J.height=Oo*wa;const $=J.getContext("2d");$.scale(wa,wa),$.translate(Uo/2,Oo/2);const ve=q*Math.SQRT1_2;try{F.draw($,ve)}catch{}const Le=new Jn(J);Le.colorSpace=jt,Le.anisotropy=4,he=new Ge(new Un(Uo/ve,Oo/q),h({map:Le,transparent:!0,alphaTest:.05,side:2,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4})),he.position.set(F.x,F.y,F.z),F.alongZ&&(he.rotation.y=Math.PI/2),e.add(he),D.set(G,he)}return he}const L=[];for(let F=0;F<eb;F++){const q=new Ka("#ffd9a0",0,9,1.4);e.add(q),L.push(q)}function A(F,q,G,he){const J=G?F[2]:F[q?1:0];return!J||J.count>=J.instanceMatrix.count?null:(he(t),J.setMatrixAt(J.count,t),[J,J.count++])}function y(F,q){F&&F[0].setColorAt(F[1],q[0])}function S(F,q){F.clearUpdateRanges(),q>0&&F.addUpdateRange(0,q*F.itemSize),F.needsUpdate=!0}function I(F,q){let G=2166136261^F.length;const he=$=>{G=Math.imul(G^$,16777619)},J=$=>{if(typeof $=="number")he(Math.round($*4096));else if(typeof $=="string")for(let ve=0;ve<$.length;ve++)he($.charCodeAt(ve));else Array.isArray($)?(he($.length),$.forEach(J)):he($?1:0)};return F.forEach($=>q.forEach(ve=>J($[ve]))),G}const z={};function B(F,q,G){const he=I(q,G);return z[F]===he?!1:(z[F]=he,!0)}function Y(F){F.forEach(q=>{q.count=0})}function re(F){F.forEach(q=>{S(q.instanceMatrix,q.count),q.instanceColor&&S(q.instanceColor,q.count)})}return{group:e,update(F,q){if(B("boxes",F.boxes,["x","y","z","w","d","h","c","lit"])&&(Y(x.box),F.boxes.forEach(J=>{const $=Aa(J.c);!$||$[1]<.05||y(A(x.box,J.lit,$[1]<.9,ve=>ve.compose(n.set(J.x,J.y,J.z),r.identity(),i.set(Math.max(.01,J.w),Math.max(.01,J.h),Math.max(.01,J.d)))),$)}),re(x.box)),B("lines",F.lines,["pts","c","w","lit"])&&(Y(x.cord),F.lines.forEach(J=>{const $=Aa(J.c);if(!$||$[1]<.5)return;const ve=Math.max(.02,J.w);for(let Le=1;Le<J.pts.length;Le++){const ie=J.pts[Le-1],pe=J.pts[Le];o.set(pe[0]-ie[0],pe[1]-ie[1],pe[2]-ie[2]);const De=o.length();De<1e-4||(o.divideScalar(De),y(A(x.cord,J.lit,!1,_e=>_e.compose(n.set(ie[0],ie[1],ie[2]),r.setFromUnitVectors(a,o),i.set(ve,De,ve))),$))}}),re(x.cord)),B("ellipses",F.ellipses,["at","rx","ry","c","lit"])){const J=x.blob.concat(x.disc,x.facing);Y(J),F.ellipses.forEach(($,ve)=>{const Le=Aa($.c);if(!Le||Le[1]<.5)return;const ie=$.ry/$.rx<.66,pe=$.rx,De=.08+ve*.0015;$.ry>$.rx*1.05?y(A(x.facing,$.lit,!1,_e=>_e.compose(n.set($.at[0]+De,$.at[1],$.at[2]+De),r.identity(),i.set($.rx,$.ry,$.rx))),Le):y(ie?A(x.disc,$.lit,!1,_e=>_e.compose(n.set($.at[0],$.at[1],$.at[2]),r.identity(),i.set(pe,1,pe))):A(x.blob,$.lit,!1,_e=>_e.compose(n.set($.at[0],$.at[1],$.at[2]),r.identity(),i.set(pe,Math.max(.4,$.ry/$.rx)*pe,pe))),Le)}),re(J)}if(B("polys",F.polys,["pts","c","lit"])){_.forEach($=>{$.n=0});const J=new N;F.polys.forEach($=>{const ve=Aa($.c);if(!ve||ve[1]<.08||$.pts.length<3)return;const Le=_[ve[1]<.9?2:$.lit?1:0],ie=$.pts.length-2;if(Le.n+ie*3>Ea)return;const pe=Le.g.attributes.position.array,De=Le.g.attributes.normal.array,_e=Le.g.attributes.color.array,st=Le.alpha?4:3,it=$.pts[0];J.set(0,0,0);for(let dt=0;dt<$.pts.length;dt++){const ft=$.pts[dt],mt=$.pts[(dt+1)%$.pts.length];J.x+=(ft[1]-mt[1])*(ft[2]+mt[2]),J.y+=(ft[2]-mt[2])*(ft[0]+mt[0]),J.z+=(ft[0]-mt[0])*(ft[1]+mt[1])}if(J.lengthSq()<1e-12)return;const ht=J.y<-1e-6||Math.abs(J.y)<1e-6&&J.x+J.z<0;ht&&J.negate(),J.normalize();for(let dt=1;dt<=ie;dt++)(ht?[it,$.pts[dt+1],$.pts[dt]]:[it,$.pts[dt],$.pts[dt+1]]).forEach(ft=>{const mt=Le.n++;pe[mt*3]=ft[0],pe[mt*3+1]=ft[1],pe[mt*3+2]=ft[2],De[mt*3]=J.x,De[mt*3+1]=J.y,De[mt*3+2]=J.z,_e[mt*st]=ve[0].r,_e[mt*st+1]=ve[0].g,_e[mt*st+2]=ve[0].b,Le.alpha&&(_e[mt*st+3]=ve[1])})}),_.forEach($=>{$.g.setDrawRange(0,$.n),["position","normal","color"].forEach(ve=>S($.g.attributes[ve],$.n))})}const G=new Set;F.faces.forEach(J=>G.add(T(J,F.unit))),D.forEach(J=>{J.visible=G.has(J)});const he=(F.fixtures||[]).slice().sort((J,$)=>$.size-J.size);L.forEach((J,$)=>{const ve=he[$];J.intensity=ve?q*6*Math.min(1.5,ve.size):0,ve&&J.position.set(ve.x,ve.y,ve.z)})}}}const La=[7,9,8,6,3,4],nb=/^(ReaderScreen|MonitorGlass|ScaleScreen|TillGlass)$/,ib=/^(LightPanel|GrowLightPurple|GrowLed)$/;let Ta=null;function sb(){if(!Ta){const s=new Uint8Array(256);for(let e=0;e<64;e++){const t=e/63,n=Math.round(255*(t>.65?.53+.47*(t-.65)/.35:.53*t/.65));s.set([n,n,n,255],e*4)}Ta=new uc(s,1,64),Ta.needsUpdate=!0}return Ta}function rb(s,e){s.geometry.boundingBox||s.geometry.computeBoundingBox(),s.updateMatrix();const t=Mc.copy(s.geometry.boundingBox).applyMatrix4(s.matrix),n=t.getSize(new N),i=t.min.y-e;if(!(i>.05)||n.y>Math.max(n.x,n.z)*.5)return;const r=new nt().copy(s.material.emissive||s.material.color);r.multiplyScalar(1/Math.max(r.r,r.g,r.b,.001));const a=new hn(Math.SQRT1_2,Math.SQRT1_2*1.25,1,4,1,!0).rotateY(Math.PI/4),o=new Ge(a,new fn({color:r,alphaMap:sb(),transparent:!0,opacity:0,depthWrite:!1,blending:2,side:2}));o.name="LampFall",o.scale.set(Math.max(n.x,.02),i,Math.max(n.z,.02)),o.position.set((t.min.x+t.max.x)/2,e+i/2,(t.min.z+t.max.z)/2),o.castShadow=o.receiveShadow=!1,o.renderOrder=2,o.visible=!1,o.userData.motion={m:"fall"},s.parent.add(o)}const us=new Nn,Mc=new Nn,ab=new N;function ob(s){return us.makeEmpty(),s.forEach(e=>{e.updateMatrix(),e.geometry?(e.geometry.boundingBox||e.geometry.computeBoundingBox(),us.union(Mc.copy(e.geometry.boundingBox).applyMatrix4(e.matrix))):us.expandByPoint(e.position)}),ab.set((us.min.x+us.max.x)/2,us.min.y,(us.min.z+us.max.z)/2)}function Bo(s,e){const t=new Map;return s.forEach(n=>{const i=e.exec(n.name);i&&(t.has(i[1])||t.set(i[1],[]),t.get(i[1]).push(n))}),[...t.keys()].sort().map(n=>t.get(n))}function ko(s,e){const t=s[0].parent,n=new ct,i=ob(s);return n.position.copy(i),n.userData.motion=Object.assign({rest:i.toArray()},e),t.add(n),s.forEach(r=>{r.position.sub(i),n.add(r)}),n}const ds=(s,e)=>{s.userData.motion=Object.assign({rest:s.position.toArray(),size:s.scale.toArray()},e)},Ra=(s,e)=>s.forEach((t,n)=>e(t,n,s.length));function cb(s,e){const t=[];s.traverse(i=>{i!==s&&i.name&&t.push(i)});const n=i=>t.filter(r=>i.test(r.name));if(e===0&&Bo(t,/^S(\d+)(?:Leaf|Stem|Top)/).forEach((i,r,a)=>ko(i,{m:"sprout",k:r,n:a.length})),e===1&&Bo(t,/^P(\d+)(?:Stem|Leaf|Pet|Branch|Cola|SideCola|Sugar|TopSugar|Crown)/).forEach((i,r)=>{ko(i,{m:"plant",k:r}),i.forEach(a=>{/(Cola|Sugar)\d*$/.test(a.name)&&ds(a,{m:"bud"})})}),e===1){const i=t.find(a=>a.name==="Top"&&a.isMesh),r=i?(i.updateMatrix(),Mc.copy(i.geometry.boundingBox||(i.geometry.computeBoundingBox(),i.geometry.boundingBox)).applyMatrix4(i.matrix).max.y):null;t.filter(a=>a.isMesh&&a.material&&ib.test(a.material.name)).forEach(a=>{a.userData.motion={m:"lamp",rest:a.material.emissiveIntensity},r!==null&&rb(a,r)})}return e===2&&(Ra(n(/^(?:T\dP\d|Plant|Corner)(?:Leaf|Pet|BranchLeaf)/),(i,r,a)=>ds(i,{m:"trim",k:r*7%a,n:a})),Ra(n(/^(?:Tray\d?Nug|BoardNug)\d+$/),(i,r,a)=>ds(i,{m:"fill",k:r,n:a,from:.1,span:.75}))),e===3&&(n(/^Press(?:Ram|Head|Plate)$/).forEach(i=>ds(i,{m:"press",amp:.03})),n(/^ScalePan$/).forEach(i=>ds(i,{m:"press",amp:.008})),Ra(n(/^(?:TopCratePouch|Box)\d+$/),(i,r,a)=>ds(i,{m:"fill",k:r,n:a,from:.35,span:.5})),Ra(n(/^TrayNug\d+$/),(i,r,a)=>ds(i,{m:"drain",k:r,n:a}))),e===4&&n(/^Key\d+$/).forEach((i,r)=>ds(i,{m:"key",k:r})),e===5&&Bo(t,/^(?:Bag|FlatBag)(\d+)/).forEach((i,r,a)=>ko(i,{m:"handoff",k:r,n:a.length})),e!==6&&t.forEach(i=>{nb.test(i.name)&&i.isMesh&&(i.userData.motion={m:"screen"})}),s}function lb(s,e){const t=[];return s.traverse(n=>{const i=n.userData.motion;i&&((i.m==="lamp"||i.m==="fall")&&(n.material=n.material.clone()),i.m==="screen"&&(n.material=n.material.clone(),n.material.emissive&&n.material.emissive.copy(n.material.color).lerp(new nt("#bff5dc"),.5)),t.push(n))}),t.length?{index:e,parts:t,act:0,grow:[]}:null}const tc=s=>s<0?0:s>1?1:s,ws=s=>(s=tc(s),s*s*(3-2*s));function hb(s){return s<.72?s/.72:s>.86?(1-s)/.14:1}function ub(s,e,t){const n=e.clock||0,i=La[s.index]||6,r=n/i%1,a=1-Math.exp(-t*4);s.act+=((e.act||0)-s.act)*a,s.boost=(s.boost||0)+((e.boost>0?1:0)-(s.boost||0))*(1-Math.exp(-t*3));const o=s.boost,c=.9+.1*Math.sin(n*2.3),l=s.parts;for(let u=0;u<l.length;u++){const h=l[u],d=h.userData.motion;switch(d.m){case"plant":{const f=hb((n/i+d.k*.23)%1),b=s.grow[d.k]=s.grow[d.k]===void 0?f:s.grow[d.k]+(f-s.grow[d.k])*a;h.scale.setScalar(.2+.8*ws(b)),h.userData.g=b,h.rotation.z=Math.sin(n*1.1+d.k*1.7)*.025;break}case"bud":{const f=ws((h.parent.userData.g-.55)/.35);h.scale.set(d.size[0]*f,d.size[1]*f,d.size[2]*f);break}case"sprout":{const f=(n/i+d.k*.17)%1,b=f>.9?1-(f-.9)/.1:ws(f/.8);h.scale.setScalar(.06+.94*b);break}case"trim":{const f=.1+.7*d.k/d.n,b=r>.92?(r-.92)/.08:1-tc((r-f)/.06);h.scale.set(d.size[0]*b,d.size[1]*b,d.size[2]*b);break}case"fill":case"drain":{const f=(d.m==="fill"?d.from:.35)+(d.m==="fill"?d.span:.5)*d.k/d.n,b=r>.93?1-(r-.93)/.07:ws((r-f)/.05),v=d.m==="fill"?b:1-b;h.scale.set(d.size[0]*v,d.size[1]*v,d.size[2]*v);break}case"press":h.position.y=d.rest[1]-d.amp*Math.sin(Math.PI*tc((r-.1)/.25));break;case"key":h.position.y=d.rest[1]-(Math.floor(n*6)%9===d.k*4%9?.006*s.act:0);break;case"handoff":{const f=Math.floor(n/i)%d.n===d.k,b=f?ws((r-.4)/.3):0,v=f?r<.85?ws((r-.6)/.2):1-ws((r-.85)/.15):0;h.position.y=d.rest[1]+(r<.85?.1*b:0),h.scale.setScalar(1-v);break}case"lamp":h.material.emissiveIntensity=d.rest*(1+o*1.6*c);break;case"fall":h.visible=o>.02,h.material.opacity=.7*o*c;break;case"screen":h.material.emissiveIntensity=Math.max(s.act,o)*(1+o)*(.35+.08*Math.sin(n*23)+(Math.sin(n*3.1)>.96?.15:0));break}}}const Ls=96,Gr=160,Ua=2,es="#144d29",Kh="#5c9e4d",Hr="#ffe6a8",Yh="#f6dca2",Sc="#e3c27f",Ti="#d9a441",Jh="#f0c766",Oa="#fffaf0",Zh=["bud","roll","gummy","vape","bud","gummy","roll","bud","vape","gummy"],ms=[{tile:2,at:.14},{tile:4,at:.3},{tile:7,at:.46}],zo=.08,eh=.62,Go=.76,nc=.9,db=1.6,hi={x:[6,50],w:40,h:34,top:26,gap:6},fb=s=>s<0?0:s>1?1:s,Br=s=>(s=fb(s),s*s*(3-2*s));function pb(s,e,t=null){if(t!=null||s>=nc){const o=Math.min(1,(t||0)/1.2);return{mode:"paid",q:o,key:"paid"+Math.round(o*12)}}if(s>=eh){const o=s>=Go?Br((s-Go)/.06):0,c=s>=Go+.06?Math.floor(e*6)%3:-1,l=Br((s-eh)/.06);return{mode:"pay",slide:l,press:o,wait:c,key:"pay"+Math.round(l*6)+Math.round(o*4)+c}}const n=ms.filter(o=>s>=o.at+zo).length,i=ms.find(o=>s>=o.at&&s<o.at+zo),r=i?(s-i.at)/zo:-1,a=Math.round(Br(s/.55)*60);return{mode:"browse",scroll:a,picked:n,tapping:i?i.tile:-1,ripple:r,key:"browse"+a+n+(i?i.tile+":"+Math.round(r*5):"")}}function ts(s,e,t,n,i,r){s.beginPath(),s.moveTo(e+r,t),s.arcTo(e+n,t,e+n,t+i,r),s.arcTo(e+n,t+i,e,t+i,r),s.arcTo(e,t+i,e,t,r),s.arcTo(e,t,e+n,t,r),s.closePath()}function Qh(s,e,t,n,i){e==="bud"?(s.fillStyle=Kh,[[-4,2],[4,2],[0,-3],[0,4]].forEach(([r,a])=>{s.beginPath(),s.arc(t+r*i,n+a*i,5*i,0,7),s.fill()}),s.fillStyle="#8cc46f",s.beginPath(),s.arc(t-1*i,n-2*i,2.5*i,0,7),s.fill()):e==="roll"?(s.save(),s.translate(t,n),s.rotate(-.6),s.fillStyle=Oa,s.fillRect(-10*i,-2.5*i,16*i,5*i),s.fillStyle=Ti,s.fillRect(6*i,-2.5*i,5*i,5*i),s.restore()):e==="gummy"?(s.fillStyle="#e07a5f",ts(s,t-9*i,n-4*i,8*i,8*i,2.5*i),s.fill(),s.fillStyle="#f2b134",ts(s,t+1*i,n-6*i,8*i,8*i,2.5*i),s.fill()):(s.fillStyle=es,ts(s,t-3*i,n-9*i,6*i,18*i,2*i),s.fill(),s.fillStyle=Ti,s.fillRect(t-3*i,n-9*i,6*i,4*i))}function $h(s,e,t,n,i){s.strokeStyle=i,s.lineWidth=2.6*n,s.lineCap="round",s.lineJoin="round",s.beginPath(),s.moveTo(e-5*n,t),s.lineTo(e-1.5*n,t+4*n),s.lineTo(e+5.5*n,t-4*n),s.stroke()}function eu(s,e){if(s.fillStyle=es,s.fillRect(0,0,Ls,20),s.fillStyle=Kh,s.beginPath(),s.ellipse(11,10,4,6,.5,0,7),s.fill(),s.fillStyle=Hr,s.fillRect(20,8,30,4),s.strokeStyle=Hr,s.lineWidth=2,s.beginPath(),s.moveTo(70,6),s.lineTo(73,6),s.lineTo(76,14),s.lineTo(84,14),s.lineTo(86,8),s.lineTo(74,8),s.stroke(),e){s.fillStyle=Ti,s.beginPath(),s.arc(87,6,5,0,7),s.fill(),s.fillStyle=es;for(let t=0;t<e;t++)s.fillRect(84.5+t*2,5,1.2,2.5)}}function mb(s,e){s.fillStyle=Hr,s.fillRect(0,0,Ls,Gr);const t=new Set(ms.slice(0,e.picked).map(n=>n.tile));s.save(),s.beginPath(),s.rect(0,20,Ls,116),s.clip(),Zh.forEach((n,i)=>{const r=hi.x[i%2],a=hi.top+Math.floor(i/2)*(hi.h+hi.gap)-e.scroll;if(a>136||a+hi.h<20)return;const o=i===e.tapping;s.fillStyle=o?Oa:Yh,ts(s,r,a,hi.w,hi.h,4),s.fill(),Qh(s,n,r+hi.w/2,a+13,.9),s.fillStyle=Sc,s.fillRect(r+6,a+25,18,3),s.fillStyle=Ti,s.fillRect(r+27,a+25,8,3),o&&(s.strokeStyle=Ti,s.lineWidth=2,ts(s,r+1,a+1,hi.w-2,hi.h-2,4),s.stroke(),s.globalAlpha=1-e.ripple,s.beginPath(),s.arc(r+hi.w/2,a+14,4+e.ripple*16,0,7),s.stroke(),s.globalAlpha=1),t.has(i)&&(s.fillStyle=es,s.beginPath(),s.arc(r+hi.w-6,a+6,5,0,7),s.fill(),$h(s,r+hi.w-6,a+6,.55,Jh))}),s.restore(),eu(s,e.picked),s.fillStyle=e.picked===ms.length?Ti:es,ts(s,8,140,80,15,5),s.fill(),s.fillStyle=e.picked===ms.length?es:Hr;for(let n=0;n<ms.length;n++)s.globalAlpha=n<e.picked?1:.3,s.beginPath(),s.arc(20+n*8,147.5,2.5,0,7),s.fill();s.globalAlpha=1,s.fillRect(56,146,24,3)}function gb(s,e){s.fillStyle=Hr,s.fillRect(0,0,Ls,Gr),eu(s,ms.length),s.save(),s.translate((1-e.slide)*Ls,0),ms.forEach((n,i)=>{const r=28+i*24;s.fillStyle=Yh,ts(s,6,r,84,20,4),s.fill(),Qh(s,Zh[n.tile],18,r+10,.6),s.fillStyle=Sc,s.fillRect(32,r+8,28,4),s.fillStyle=Ti,s.fillRect(70,r+8,12,4)}),s.fillStyle=es,s.fillRect(8,104,80,2),s.fillRect(10,110,26,5),s.fillStyle=Ti,s.fillRect(62,110,22,5);const t=e.press*2;if(s.fillStyle="#a87a24",ts(s,10,126,76,24,6),s.fill(),s.fillStyle=e.press?Ti:Jh,ts(s,10,124+t,76,22-t,6),s.fill(),s.fillStyle=es,e.wait<0)s.fillRect(34,133+t,28,4);else for(let n=0;n<3;n++)s.globalAlpha=n===e.wait?1:.35,s.beginPath(),s.arc(40+n*8,135+t,3,0,7),s.fill();s.globalAlpha=1,s.restore()}function bb(s,e){s.fillStyle=es,s.fillRect(0,0,Ls,Gr);const t=Br(e.q/.35),n=22*(.35+.65*t);s.fillStyle=Ti,s.beginPath(),s.arc(48,52,n,0,7),s.fill(),t>.5&&$h(s,48,52,1.6,Oa);const i=Br((e.q-.3)/.6),r=Gr-i*62;s.fillStyle=Oa,s.fillRect(22,r,52,70),s.fillStyle=Sc;for(let a=0;a<4;a++)s.fillRect(28,r+8+a*9,a===3?18:40,3);s.fillStyle=Ti,s.fillRect(52,r+35,16,3)}function _b(s,e){s.setTransform(Ua,0,0,Ua,0,0),e.mode==="paid"?bb(s,e):e.mode==="pay"?gb(s,e):mb(s,e)}class vb extends fr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Eb(t)}),this.register(function(t){return new wb(t)}),this.register(function(t){return new Fb(t)}),this.register(function(t){return new Nb(t)}),this.register(function(t){return new Ub(t)}),this.register(function(t){return new Tb(t)}),this.register(function(t){return new Rb(t)}),this.register(function(t){return new Cb(t)}),this.register(function(t){return new Pb(t)}),this.register(function(t){return new Sb(t)}),this.register(function(t){return new Lb(t)}),this.register(function(t){return new Ab(t)}),this.register(function(t){return new Db(t)}),this.register(function(t){return new Ib(t)}),this.register(function(t){return new yb(t)}),this.register(function(t){return new Ob(t)}),this.register(function(t){return new Bb(t)})}load(e,t,n,i){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=Or.extractUrlBase(e);a=Or.resolveURL(l,this.path)}else a=Or.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new jh(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===tu){try{a[Vt.KHR_BINARY_GLTF]=new kb(e)}catch(h){i&&i(h);return}r=JSON.parse(a[Vt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new Qb(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case Vt.KHR_MATERIALS_UNLIT:a[h]=new Mb;break;case Vt.KHR_DRACO_MESH_COMPRESSION:a[h]=new zb(r,this.dracoLoader);break;case Vt.KHR_TEXTURE_TRANSFORM:a[h]=new Gb;break;case Vt.KHR_MESH_QUANTIZATION:a[h]=new Hb;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function xb(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const Vt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class yb{constructor(e){this.parser=e,this.name=Vt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const u=new nt(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],Zn);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new $o(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Ka(u),l.distance=h;break;case"spot":l=new _0(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Zi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class Mb{constructor(){this.name=Vt.KHR_MATERIALS_UNLIT}getMaterialType(){return fn}extendParams(e,t,n){const i=[];e.color=new nt(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Zn),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,jt))}return Promise.all(i)}}class Sb{constructor(e){this.parser=e,this.name=Vt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Eb{constructor(e){this.parser=e,this.name=Vt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Oi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new He(o,o)}return Promise.all(r)}}class wb{constructor(e){this.parser=e,this.name=Vt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Oi}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class Ab{constructor(e){this.parser=e,this.name=Vt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Oi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class Tb{constructor(e){this.parser=e,this.name=Vt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Oi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new nt(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Zn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,jt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class Rb{constructor(e){this.parser=e,this.name=Vt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Oi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class Cb{constructor(e){this.parser=e,this.name=Vt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Oi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new nt().setRGB(o[0],o[1],o[2],Zn),Promise.all(r)}}class Pb{constructor(e){this.parser=e,this.name=Vt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Oi}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Lb{constructor(e){this.parser=e,this.name=Vt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Oi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new nt().setRGB(o[0],o[1],o[2],Zn),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,jt)),Promise.all(r)}}class Ib{constructor(e){this.parser=e,this.name=Vt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Oi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class Db{constructor(e){this.parser=e,this.name=Vt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Oi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class Fb{constructor(e){this.parser=e,this.name=Vt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class Nb{constructor(e){this.parser=e,this.name=Vt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Ub{constructor(e){this.parser=e,this.name=Vt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Ob{constructor(e){this.name=Vt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=i.byteOffset||0,l=i.byteLength||0,u=i.count,h=i.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(f),u,h,d,i.mode,i.filter),f})})}else return null}}class Bb{constructor(e){this.name=Vt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==mi.TRIANGLES&&l.mode!==mi.TRIANGLE_STRIP&&l.mode!==mi.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],d=l[0].count,f=[];for(const b of h){const v=new tt,m=new N,p=new bn,x=new N(1,1,1),M=new ni(b.geometry,b.material,d);for(let _=0;_<d;_++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,_),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,_),c.SCALE&&x.fromBufferAttribute(c.SCALE,_),M.setMatrixAt(_,v.compose(m,p,x));for(const _ in c)if(_==="_COLOR_0"){const D=c[_];M.instanceColor=new Yo(D.array,D.itemSize,D.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&b.geometry.setAttribute(_,c[_]);pn.prototype.copy.call(M,b),this.parser.assignFinalMaterial(M),f.push(M)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const tu="glTF",Rr=12,th={JSON:1313821514,BIN:5130562};class kb{constructor(e){this.name=Vt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Rr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==tu)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Rr,r=new DataView(e,Rr);let a=0;for(;a<i;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===th.JSON){const l=new Uint8Array(e,Rr+a,o);this.content=n.decode(l)}else if(c===th.BIN){const l=Rr+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class zb{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Vt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const u in a){const h=ic[u]||u.toLowerCase();o[h]=a[u]}for(const u in e.attributes){const h=ic[u]||u.toLowerCase();if(a[u]!==void 0){const d=n.accessors[e.attributes[u]],f=tr[d.componentType];l[h]=f.name,c[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){i.decodeDracoFile(u,function(f){for(const b in f.attributes){const v=f.attributes[b],m=c[b];m!==void 0&&(v.normalized=m)}h(f)},o,l,Zn,d)})})}}class Gb{constructor(){this.name=Vt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Hb{constructor(){this.name=Vt.KHR_MESH_QUANTIZATION}}class nu extends Vr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=i-t,h=(n-t)/u,d=h*h,f=d*h,b=e*l,v=b-l,m=-2*f+3*d,p=f-d,x=1-m,M=p-d+h;for(let _=0;_!==o;_++){const D=a[v+_+o],T=a[v+_+c]*u,L=a[b+_+o],A=a[b+_]*u;r[_]=x*D+M*T+m*L+p*A}return r}}const Vb=new bn;class Wb extends nu{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return Vb.fromArray(r).normalize().toArray(r),r}}const mi={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},tr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},nh={9728:1003,9729:1006,9984:1004,9985:1007,9986:1005,9987:1008},ih={33071:1001,33648:1002,10497:1e3},Ho={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ic={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},fs={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Xb={CUBICSPLINE:void 0,LINEAR:2301,STEP:2300},Vo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function jb(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new ns({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),s.DefaultMaterial}function As(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Zi(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function qb(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,u=e.length;l<u;l++){const h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];if(n){const d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):s.attributes.position;a.push(d)}if(i){const d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):s.attributes.normal;o.push(d)}if(r){const d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):s.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],d=l[2];return n&&(s.morphAttributes.position=u),i&&(s.morphAttributes.normal=h),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function Kb(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Yb(s){let e;const t=s.extensions&&s.extensions[Vt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Wo(t.attributes):e=s.indices+":"+Wo(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+Wo(s.targets[n]);return e}function Wo(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function sc(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Jb(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Zb=new tt;class Qb{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new xb,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new qh(this.options.manager):this.textureLoader=new y0(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new jh(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return As(r,o,i),Zi(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,u]of a.children.entries())r(u,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Vt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,a){n.load(Or.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=Ho[i.type],o=tr[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new $t(l,a,c))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=Ho[i.type],l=tr[i.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,b=i.normalized===!0;let v,m;if(f&&f!==h){const p=Math.floor(d/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let M=t.cache.get(x);M||(v=new l(o,p*f,i.count*f/u),M=new Ch(v,f/u),t.cache.add(x,M)),m=new zr(M,c,d%f/u,b)}else o===null?v=new l(i.count*c):v=new l(o,d,i.count*c),m=new $t(v,c,b);if(i.sparse!==void 0){const p=Ho.SCALAR,x=tr[i.sparse.indices.componentType],M=i.sparse.indices.byteOffset||0,_=i.sparse.values.byteOffset||0,D=new x(a[1],M,i.sparse.count*p),T=new l(a[2],_,i.sparse.count*c);o!==null&&(m=new $t(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let L=0,A=D.length;L<A;L++){const y=D[L];if(m.setX(y,T[L*c]),c>=2&&m.setY(y,T[L*c+1]),c>=3&&m.setZ(y,T[L*c+2]),c>=4&&m.setW(y,T[L*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=b}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return u.magFilter=nh[d.magFilter]||1006,u.minFilter=nh[d.minFilter]||1008,u.wrapS=ih[d.wrapS]||1e3,u.wrapT=ih[d.wrapT]||1e3,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==1003&&u.minFilter!==1006,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=i.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(h){l=!0;const d=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(d,f){let b=d;t.isImageBitmapLoader===!0&&(b=function(v){const m=new wn(v);m.needsUpdate=!0,d(m)}),t.load(Or.resolveURL(h,r.path),b,void 0,f)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),Zi(h,a),h.userData.mimeType=a.mimeType||Jb(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Vt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Vt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[Vt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Fh,_i.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Dh,_i.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return ns}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let a;const o={},c=r.extensions||{},l=[];if(c[Vt.KHR_MATERIALS_UNLIT]){const h=i[Vt.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,r,t))}else{const h=r.pbrMetallicRoughness||{};if(o.color=new nt(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Zn),o.opacity=d[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",h.baseColorTexture,jt)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=2);const u=r.alphaMode||Vo.OPAQUE;if(u===Vo.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Vo.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==fn&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new He(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;o.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&a!==fn&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==fn){const h=r.emissiveFactor;o.emissive=new nt().setRGB(h[0],h[1],h[2],Zn)}return r.emissiveTexture!==void 0&&a!==fn&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,jt)),Promise.all(l).then(function(){const h=new a(o);return r.name&&(h.name=r.name),Zi(h,r),t.associations.set(h,{materials:e}),r.extensions&&As(i,h,r),h})}createUniqueName(e){const t=tn.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[Vt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return sh(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],u=Yb(l),h=i[u];if(h)a.push(h.promise);else{let d;l.extensions&&l.extensions[Vt.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=sh(new cn,l,t),i[u]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const u=a[c].material===void 0?jb(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let f=0,b=u.length;f<b;f++){const v=u[f],m=a[f];let p;const x=l[f];if(m.mode===mi.TRIANGLES||m.mode===mi.TRIANGLE_STRIP||m.mode===mi.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Xg(v,x):new Ge(v,x),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===mi.TRIANGLE_STRIP?p.geometry=Hl(p.geometry,1):m.mode===mi.TRIANGLE_FAN&&(p.geometry=Hl(p.geometry,2));else if(m.mode===mi.LINES)p=new Kg(v,x);else if(m.mode===mi.LINE_STRIP)p=new fc(v,x);else if(m.mode===mi.LINE_LOOP)p=new Yg(v,x);else if(m.mode===mi.POINTS)p=new Jg(v,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&Kb(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Zi(p,r),m.extensions&&As(i,p,m),t.assignFinalMaterial(p),h.push(p)}for(let f=0,b=h.length;f<b;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return r.extensions&&As(i,h[0],r),h[0];const d=new ct;r.extensions&&As(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,b=h.length;f<b;f++)d.add(h[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new ti(Ru.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ha(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Zi(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),a=i,o=[],c=[];for(let l=0,u=a.length;l<u;l++){const h=a[l];if(h){o.push(h);const d=new tt;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new dc(o,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let h=0,d=i.channels.length;h<d;h++){const f=i.channels[h],b=i.samplers[f.sampler],v=f.target,m=v.node,p=i.parameters!==void 0?i.parameters[b.input]:b.input,x=i.parameters!==void 0?i.parameters[b.output]:b.output;v.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",x)),l.push(b),u.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const d=h[0],f=h[1],b=h[2],v=h[3],m=h[4],p=[];for(let x=0,M=d.length;x<M;x++){const _=d[x],D=f[x],T=b[x],L=v[x],A=m[x];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();const y=n._createAnimationTracks(_,D,T,L,A);if(y)for(let S=0;S<y.length;S++)p.push(y[S])}return new Qo(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const u=l[0],h=l[1],d=l[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Zb)});for(let f=0,b=h.length;f<b;f++)u.add(h[f]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new Ih:l.length>1?u=new ct:l.length===1?u=l[0]:u=new pn,u!==l[0])for(let h=0,d=l.length;h<d;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=a),Zi(u,r),r.extensions&&As(n,u,r),r.matrix!==void 0){const h=new tt;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new ct;n.name&&(r.name=i.createUniqueName(n.name)),Zi(r,n),n.extensions&&As(t,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);const l=u=>{const h=new Map;for(const[d,f]of i.associations)(d instanceof _i||d instanceof wn)&&h.set(d,f);return u.traverse(d=>{const f=i.associations.get(d);f!=null&&h.set(d,f)}),h};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){const a=[],o=e.name?e.name:e.uuid,c=[];fs[r.path]===fs.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(fs[r.path]){case fs.weights:l=rr;break;case fs.rotation:l=ar;break;case fs.position:case fs.scale:l=or;break;default:switch(n.itemSize){case 1:l=rr;break;case 2:case 3:default:l=or;break}break}const u=i.interpolation!==void 0?Xb[i.interpolation]:2301,h=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const b=new l(c[d]+"."+fs[r.path],t.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(b),a.push(b)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=sc(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ar?Wb:nu;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function $b(s,e,t){const n=e.attributes,i=new Nn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new N(c[0],c[1],c[2]),new N(l[0],l[1],l[2])),o.normalized){const u=sc(tr[o.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new N,c=new N;for(let l=0,u=r.length;l<u;l++){const h=r[l];if(h.POSITION!==void 0){const d=t.json.accessors[h.POSITION],f=d.min,b=d.max;if(f!==void 0&&b!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(b[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(b[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(b[2]))),d.normalized){const v=sc(tr[d.componentType]);c.multiplyScalar(v)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;const a=new Ni;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function sh(s,e,t){const n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(const a in n){const o=ic[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){const a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return Jt.workingColorSpace!==Zn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Jt.workingColorSpace}" not supported.`),Zi(s,e),$b(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?qb(s,e.targets,t):s})}var e_=(function(){var s="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var i=WebAssembly.validate(t)?e:s,r,a=WebAssembly.instantiate(o(i),{}).then(function(p){r=p.instance,r.exports.__wasm_call_ctors()});function o(p){for(var x=new Uint8Array(p.length),M=0;M<p.length;++M){var _=p.charCodeAt(M);x[M]=_>96?_-97:_>64?_-39:_+4}for(var D=0,M=0;M<p.length;++M)x[D++]=x[M]<60?n[x[M]]:(x[M]-60)*64+x[++M];return x.buffer.slice(0,D)}function c(p,x,M,_,D,T){var L=r.exports.sbrk,A=M+3&-4,y=L(A*_),S=L(D.length),I=new Uint8Array(r.exports.memory.buffer);I.set(D,S);var z=p(y,M,_,S,D.length);if(z==0&&T&&T(y,A,_),x.set(I.subarray(y,y+M*_)),L(y-L(0)),z!=0)throw new Error("Malformed buffer data: "+z)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},u={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},h=[],d=0;function f(p){var x={object:new Worker(p),pending:0,requests:{}};return x.object.onmessage=function(M){var _=M.data;x.pending-=_.count,x.requests[_.id][_.action](_.value),delete x.requests[_.id]},x}function b(p){for(var x="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(o(i))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+c.toString()+m.toString(),M=new Blob([x],{type:"text/javascript"}),_=URL.createObjectURL(M),D=0;D<p;++D)h[D]=f(_);URL.revokeObjectURL(_)}function v(p,x,M,_,D){for(var T=h[0],L=1;L<h.length;++L)h[L].pending<T.pending&&(T=h[L]);return new Promise(function(A,y){var S=new Uint8Array(M),I=d++;T.pending+=p,T.requests[I]={resolve:A,reject:y},T.object.postMessage({id:I,count:p,size:x,source:S,mode:_,filter:D},[S.buffer])})}function m(p){a.then(function(){var x=p.data;try{var M=new Uint8Array(x.count*x.size);c(r.exports[x.mode],M,x.count,x.size,x.source,r.exports[x.filter]),self.postMessage({id:x.id,count:x.count,action:"resolve",value:M},[M.buffer])}catch(_){self.postMessage({id:x.id,count:x.count,action:"reject",value:_})}})}return{ready:a,supported:!0,useWorkers:function(p){b(p)},decodeVertexBuffer:function(p,x,M,_,D){c(r.exports.meshopt_decodeVertexBuffer,p,x,M,_,r.exports[l[D]])},decodeIndexBuffer:function(p,x,M,_){c(r.exports.meshopt_decodeIndexBuffer,p,x,M,_)},decodeIndexSequence:function(p,x,M,_){c(r.exports.meshopt_decodeIndexSequence,p,x,M,_)},decodeGltfBuffer:function(p,x,M,_,D,T){c(r.exports[u[D]],p,x,M,_,r.exports[l[T]])},decodeGltfBufferAsync:function(p,x,M,_,D){return h.length>0?v(p,x,M,u[_],l[D]):a.then(function(){var T=new Uint8Array(p*x);return c(r.exports[u[_]],T,p,x,M,r.exports[l[D]]),T})}}})();function t_(s){const e=new Map,t=new Map,n=s.clone();return iu(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function iu(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)iu(s.children[n],e.children[n],t)}const su=s=>s<0?0:s>1?1:s,Ji=s=>(s=su(s),s*s*(3-2*s)),Li=(s,e,t)=>[s[0]+(e[0]-s[0])*t,s[1]+(e[1]-s[1])*t,s[2]+(e[2]-s[2])*t],Qs=(s,e,t)=>Math.sin(Math.PI*su((s-e)/(t-e))),rh=(s,e,t)=>({lean:s.lean+(e.lean-s.lean)*t,yaw:s.yaw+(e.yaw-s.yaw)*t,pitch:s.pitch+(e.pitch-s.pitch)*t,left:Li(s.left,e.left,t),right:Li(s.right,e.right,t)}),Xo=(s,e)=>{const t=Math.sin(s*12.9898+e*78.233)*43758.5453;return t-Math.floor(t)};function n_(s,e,t=1){const n=e||0;switch(s){case"seeds":{const i=n*1.3,r=Math.floor(i),a=i-r,o=Qs(a,.25,.75),c=d=>(d%=8,-.25+.125*(d<5?d:8-d)),l=c(r),u=c(r+1),h=a>.75?l+(u-l)*Ji((a-.75)/.25):l;return{lean:.22,yaw:-h*.5,pitch:.38,left:[.05,-.62,.5],right:[h,-.5-.14*o,.62]}}case"grow":{const r=Math.floor(n/3),a=(n-r*3)/3,o=u=>[-.2+.45*Xo(u,1),-.42+.2*Xo(u,2),.72+.12*Xo(u,3)],c=a<.3?Li(o(r-1),o(r),Ji(a/.3)):o(r),l=a>.3?Math.sin((a-.3)*26)*.035:0;return c[0]+=l,c[1]+=Math.abs(l)*.6,{lean:.12,yaw:-c[0]*.6,pitch:.15-c[1]*.3,left:null,right:c}}case"harvest":{const i=La[2]/3,r=n%i/i,a=Qs(r,.72,1),o=Math.sin(n*13)*.025,c=Math.sin(n*1.7)*.06,l=Li([-.02+c,-.48+o,.5],[.32,-.62,.42],a);return{lean:.3,yaw:-.25*a,pitch:.45,left:[-.08,-.5,.55],right:l}}case"pack":{const i=n/La[3]%1,r=Qs(i,.1,.35),a=c=>{const l=[.08,-.24-.26*c,.55];return{lean:.1+.18*c,yaw:0,pitch:.3,left:l,right:l.slice()}},o=c=>({lean:.2,yaw:-.35+.7*c,pitch:.4,left:[.08,-.55,.5],right:Li([.36,-.6,.42],[-.02,-.52,.62],c)});if(i<.37)return a(r);if(i<.45)return rh(a(0),o(0),Ji((i-.37)/.08));if(i<.87){const c=(i-.45)/.42*4,l=c-Math.floor(c);return o(l<.5?Ji(l/.5):1-Ji((l-.5)/.5))}return rh(o(0),a(0),Ji((i-.87)/.1))}case"desk":{const i=t*.03;return{lean:.1,yaw:0,pitch:.3-.35*(t*(Math.sin(n*.9)>.6?1:0)),left:[.04,-.55+i*Math.max(0,Math.sin(n*19)),.55],right:[.04,-.55+i*Math.max(0,Math.sin(n*19+2.2)),.57]}}case"pickup":case"window":{const i=n/La[5]%1,r=t,a=[.12,-.62,.42],o=[.12,-.66,.55],c=[.08,-.22,.88];let l=a;return i<.4?l=Li(a,o,Ji((i-.25)/.15)):i<.7?l=Li(o,c,Ji((i-.4)/.3)):i<.85?l=c:l=Li(c,a,Ji((i-.85)/.15)),l=Li(a,l,r),{lean:.12+.08*r*Qs(i,.3,.9),yaw:0,pitch:.3-.25*r*Qs(i,.45,.9),left:[.12,-.62,.4],right:l}}case"guard":{const i=Math.sin(n*.45)+.35*Math.sin(n*1.1);return{lean:-.04,yaw:.55*Math.max(-1,Math.min(1,i*1.2)),pitch:.05,left:[-.42,-.72,.32],right:[-.38,-.72,.36]}}case"host":{const r=n%9/9,a=Qs(r,.6,.9);return{lean:0,yaw:.4*Math.sin(n*.35)+.3*a,pitch:.05,left:[-.38,-.62,.42],right:Li([-.34,-.62,.45],[.45,-.32,.62],a)}}}return null}const Vn="mixamorig",cr={left:[Vn+"LeftArm",Vn+"LeftForeArm",Vn+"LeftHand"],right:[Vn+"RightArm",Vn+"RightForeArm",Vn+"RightHand"]},i_=0,s_=.3,Ba=[Vn+"Spine",Vn+"Spine2",Vn+"Neck",Vn+"Head",...cr.left.slice(0,2),...cr.right.slice(0,2)];function r_(s){const e={};return s.traverse(t=>{t.isBone&&t.name.startsWith(Vn)&&(e[t.name.replace(":","")]=t)}),!Ba.every(t=>e[t])||!e[cr.left[2]]||!e[cr.right[2]]?null:{body:s,bones:e,idle:Ba.map(()=>new bn),targets:{},weight:0}}const ru=new tt,a_=new tt,o_=new N,ah=new bn,rc=new bn,au=new bn,c_=new bn,gi=new N,nr=new N,ka=new N,ou=new N,Cr=new N,Ca=new N,ac=new N,oc=new N,l_=new N,h_=new N,jo=new N(1,0,0),oh=new N(0,1,0);function Fi(s,e,t){s.updateWorldMatrix(!0,!1),a_.multiplyMatrices(ru,s.matrixWorld).decompose(e||ou,t||rc,o_)}function cu(s,e){Fi(s.parent,null,ah),Fi(s,null,rc),s.quaternion.copy(ah.invert().multiply(au.copy(e).multiply(rc)))}function Pr(s,e,t){t&&cu(s,c_.setFromAxisAngle(e,t))}function ch(s,e,t){Fi(s,ac),Fi(e,oc),cu(s,au.setFromUnitVectors(oc.sub(ac).normalize(),t))}function u_(s,e,t,n){const i=s[e[0]],r=s[e[1]],a=s[e[2]];Fi(i,gi),Fi(r,nr),Fi(a,ka);const o=nr.distanceTo(gi),c=ka.distanceTo(nr),l=Math.max(.05*(o+c),Math.min((o+c)*.995,ou.copy(n).distanceTo(gi)));Cr.copy(n).sub(gi).normalize();const u=Math.max(-1,Math.min(1,(o*o+l*l-c*c)/(2*o*l))),h=Math.sqrt(1-u*u);Ca.set(t*.55,-.45,-.5),Ca.addScaledVector(Cr,-Ca.dot(Cr)).normalize();const d=ac.copy(gi).addScaledVector(Cr,o*u).addScaledVector(Ca,o*h),f=oc.copy(gi).addScaledVector(Cr,l),b=l_.subVectors(d,gi).normalize(),v=h_.subVectors(f,d).normalize();ch(i,r,b),ch(r,a,v)}function d_(s,e,t,n,i=1){const r=n_(e,t,n);if(!s||!r||i<=0)return null;const{body:a,bones:o}=s;Ba.forEach((d,f)=>s.idle[f].copy(o[d].quaternion)),a.updateWorldMatrix(!0,!1),ru.copy(a.matrixWorld).invert();const c=[o[Vn+"Spine"],o[Vn+"Spine2"]],l=d=>c.forEach(f=>Pr(f,jo,d*.5));l(r.lean);const u={},h=[["left",1],["right",-1]].filter(([d])=>r[d]);return h.forEach(([d,f])=>{const b=r[d],v=cr[d];Fi(o[v[0]],gi),Fi(o[v[1]],nr),Fi(o[v[2]],ka);const m=nr.distanceTo(gi)+ka.distanceTo(nr);u[d]=(s.targets[d]=s.targets[d]||new N).set(gi.x+f*b[0]*m,gi.y+b[1]*m,gi.z+b[2]*m)}),c.forEach((d,f)=>d.quaternion.copy(s.idle[f])),l(r.lean*i_),Pr(c[1],jo,-.06),Pr(o[Vn+"Neck"],oh,r.yaw*.5),Pr(o[Vn+"Head"],oh,r.yaw*.5),Pr(o[Vn+"Head"],jo,r.pitch*s_),h.forEach(([d,f])=>u_(o,cr[d],f,u[d])),i<1&&Ba.forEach((d,f)=>o[d].quaternion.slerp(s.idle[f],1-i)),u}const Ts=1.69,lh=160,qo=32,hh="#fff1d6",uh="#fffaf0",dh="#b8ad94";function __(s,e){let t;try{t=new Hg({canvas:s,antialias:!0,alpha:!1,powerPreference:"high-performance"}),t.localClippingEnabled=!0}catch{return null}if(!t.getContext())return null;let n=0;const i=Xh,r=(g,w,P)=>{n=P-w};i.onStart=i.onProgress=r,t.outputColorSpace=jt,t.shadowMap.enabled=!0,t.shadowMap.type=2;const a=new nt().setRGB(e.haze.colour[0]/255,e.haze.colour[1]/255,e.haze.colour[2]/255,jt),o=new _l;o.background=a.clone();const c=ql(),l=new ct;l.scale.y=Mn,o.add(l);const u=new Ol(uh,dh,1.55);o.add(u);const h=new $o(hh,2.1),d=e.sun.reach,f=new N(-e.sun.x*d,1/Mn,-e.sun.z*d).normalize();h.castShadow=!0,h.shadow.mapSize.set(2048,2048),h.shadow.bias=-4e-4,h.shadow.normalBias=.03,Object.assign(h.shadow.camera,{left:-44,right:44,top:44,bottom:-44,near:1,far:260}),o.add(h,h.target);const b={hazeColour:{value:a},hazeX:{value:new Zt(...e.haze.ramp.west,...e.haze.ramp.east)},hazeZ:{value:new Zt(...e.haze.ramp.north,...e.haze.ramp.south)}},v=new Map;function m(g,w={}){const P=g+JSON.stringify(w);if(v.has(P))return v.get(P);const U=p(g,w);return v.set(P,U),U}function p(g,w={}){return x(new Sn({color:g,...w}))}function x(g){return g.onBeforeCompile=w=>{Object.assign(w.uniforms,b),w.vertexShader=`varying vec3 vHazeWorld;
`+w.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        vec4 hazeLocal = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          hazeLocal = instanceMatrix * hazeLocal;
        #endif
        vHazeWorld = (modelMatrix * hazeLocal).xyz;`),w.fragmentShader=`varying vec3 vHazeWorld;
uniform vec3 hazeColour;
uniform vec4 hazeX;
uniform vec4 hazeZ;
`+w.fragmentShader.replace("#include <dithering_fragment>",`
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
        #include <dithering_fragment>`)},g.customProgramCacheKey=()=>"haze",g}const M={},_=new qh;function D(g){const w=(e.floorTextures||{})[g];return w?(M[g]||(M[g]=_.load(new URL(w.url,document.baseURI).href),M[g].colorSpace=jt,M[g].wrapS=M[g].wrapT=1e3,M[g].anisotropy=8),{base:M[g],size:w.size}):null}function T(g,w){const P=D(w);if(!P)return g;const U=P.base.clone(),O=g.scale.x,H=g.scale.z;return U.repeat.set(O/P.size,H/P.size),U.offset.set((g.position.x-O/2)/P.size,-(g.position.z+H/2)/P.size),g.material=p("#ffffff",{map:U}),g}const L=new on(1,1,1).translate(0,.5,0);function A(g,w,P,U,O,H,te,Z,{cast:ne=!0,receive:fe=!0,opts:Ee}={}){const we=new Ge(L,m(Z,Ee));return we.position.set(w,P,U),we.scale.set(O,H,te),we.castShadow=ne,we.receiveShadow=fe,g.add(we),we}function y(g,w,P,U,O,H,te,Z,ne){return A(g,(w+P)/2,U,(H+te)/2,Math.max(.001,P-w),Math.max(.001,O-U),Math.max(.001,te-H),Z,ne)}const S=new vb().setMeshoptDecoder(e_),I=S.load.bind(S),z=[];let B=0;function Y(){B=0;const g=performance.now()+6;do{const w=z.shift();try{w()}catch(P){console.warn("3D map: model setup failed",P)}}while(z.length&&performance.now()<g);z.length&&(B=requestAnimationFrame(Y))}S.load=(g,w,P,U)=>I(g,O=>{O.scene.userData.file=g.split("/").pop(),z.push(()=>w(O)),B||(B=requestAnimationFrame(Y))},P,U);function re(g,w,P,U,O,H=l){S.load(e.modelBase+g,te=>{dt(te.scene);const Z=new ct;Z.add(te.scene),Z.scale.set(Ts,Ts/Mn,Ts),Z.position.set(w,P,U),H.add(Z),O&&O(te.scene,Z),Ps(te.scene)},void 0,te=>console.warn("3D map: could not load "+g,te))}const F=[],q=f_(l,e,{box:A,span:y,material:m,textured:T,lampStandIns:F});m_(l,e,{box:A,span:y,material:m,textured:T,model:re});const G=g_(o,l,e.transport,{box:A,material:m}),he=O0(l,e,{box:A,span:y,material:m,model:re}),J=W0(l,e,{box:A,span:y,material:m}),$=K0(l,e,{material:m});Z0(l,e,{span:y,model:re});let ve=0;const Le=[],ie=new Ge(new Na(.86,1,48).rotateX(-Math.PI/2),new fn({color:"#e2c68a",transparent:!0,opacity:.85,depthWrite:!1}));ie.renderOrder=2,l.add(ie);const pe=["#d8cfbd","#b8cdb2","#9cc4b8","#e2c68a"],De=(()=>{const g=document.createElement("canvas");g.width=g.height=64;const w=g.getContext("2d"),P=w.createRadialGradient(32,32,0,32,32,32);return P.addColorStop(0,"rgba(255,255,255,1)"),P.addColorStop(.6,"rgba(255,255,255,.8)"),P.addColorStop(1,"rgba(255,255,255,0)"),w.fillStyle=P,w.fillRect(0,0,64,64),new Jn(g)})(),_e=[];function st(g){if(!_e[g]){const w=(P,U)=>{const O=new Ge(P,new fn(Object.assign({color:"#f0a010",transparent:!0,depthWrite:!1},U)));return O.renderOrder=2,l.add(O),O};_e[g]={pool:w(new Un(1,1).rotateX(-Math.PI/2),{map:De}),ring:w(new Na(.86,1,48).rotateX(-Math.PI/2),{color:"#e8920a"})}}return _e[g]}function it(g){if(!Le[g]){const w=new ct,P=A(w,0,0,0,1,1,1,pe[1]),U=A(w,0,1,0,1,.08,1,"#efe7d4");w.userData={body:P,top:U},l.add(w),Le[g]=w}return Le[g]}const ht={};function dt(g){g.traverse(w=>{if(!w.isMesh)return;w.castShadow=w.receiveShadow=!0;const P=w.material;P&&P.transmission>0&&(w.material=new ns({color:P.color,roughness:.1,metalness:0,transparent:!0,opacity:.28,depthWrite:!1}),w.castShadow=!1)})}function ft(g){const w=new N,P=new N,U=new N;g.traverse(O=>{if(!O.isMesh||!/^Sign(Border)?$/.test(O.name))return;const H=O.geometry,te=H.attributes.position,Z=H.index;if(!Z)return;let ne=0;for(let Ee=0;Ee<Z.count;Ee+=3)w.fromBufferAttribute(te,Z.getX(Ee)),P.fromBufferAttribute(te,Z.getX(Ee+1)),U.fromBufferAttribute(te,Z.getX(Ee+2)),ne+=w.dot(P.cross(U));if(ne>=0)return;for(let Ee=0;Ee<Z.count;Ee+=3){const we=Z.getX(Ee+1);Z.setX(Ee+1,Z.getX(Ee+2)),Z.setX(Ee+2,we)}const fe=H.attributes.normal;if(fe)for(let Ee=0;Ee<fe.count;Ee++)fe.setXYZ(Ee,-fe.getX(Ee),-fe.getY(Ee),-fe.getZ(Ee))})}function mt(g){g.traverse(w=>{const P=w.isMesh&&w.material;P&&P.metalness>.5&&(P.metalness=.35,P.roughness=Math.max(.35,P.roughness))})}J&&J.loadModels(S,e.modelBase),G&&G.loadModels(S,e.modelBase);const W={},Wt=[],_t=[],at={};(e.fixtures||[]).forEach(g=>{S.load(e.modelBase+g.file,w=>{dt(w.scene),(g.hide||[]).forEach(U=>{const O=w.scene.getObjectByName(U);O&&(O.visible=!1)}),g.glow&&w.scene.traverse(U=>{const O=U.isMesh&&U.material;O&&O.name===g.glow&&!Wt.includes(O)&&(O.emissive.set("#ffe3b0"),Wt.push(O))}),g.screen&&w.scene.traverse(U=>{const O=U.isMesh&&U.material;O&&O.name===g.screen&&!_t.includes(O)&&(O.emissive.set("#ffffff"),O.emissiveMap=O.map,O.needsUpdate=!0,_t.push(O))}),g.menu&&w.scene.traverse(U=>{const O=U.isMesh&&U.material;O&&O.name===g.screen&&!at[g.key]&&(at[g.key]=rt(O))}),Ps(w.scene);const P=new ct;P.add(w.scene),P.scale.set(g.scale,g.scale/Mn,g.scale),P.position.set(g.x,g.y,g.z),P.visible=!1,l.add(P),W[g.key]=P},void 0,w=>console.warn("3D map: could not load "+g.file,w))});function rt(g){const w=document.createElement("canvas");w.width=Ls*Ua,w.height=Gr*Ua;const P=new Jn(w);return P.flipY=!1,P.colorSpace=jt,{material:g,base:g.map,texture:P,ctx:w.getContext("2d"),key:"",paidAt:null}}function qt(g,w,P){const U=g.material,O=w!=null&&w>=0;O&&w>=nc&&g.paidAt==null&&(g.paidAt=P),O&&w<nc&&(g.paidAt=null);const H=g.paidAt==null?null:P-g.paidAt;!O&&H!=null&&(H>db||H<0)&&(g.paidAt=null);const te=O||g.paidAt!=null;if(te){const ne=pb(O?w:1,P,g.paidAt==null?null:H);ne.key!==g.key&&(_b(g.ctx,ne),g.texture.needsUpdate=!0,g.key=ne.key)}const Z=te?g.texture:g.base;U.map!==Z&&(U.map=U.emissiveMap=Z),te&&(U.emissiveIntensity+=.2)}const le={};function C(g){const w=(e.stationModels||{})[g];!w||le[g]||(le[g]=!0,S.load(e.modelBase+w,P=>{const U=P.scene,O=new Nn().setFromObject(U),H=O.getSize(new N),te=O.getCenter(new N),Z=e.stationModelSize[g]||{w:H.x+H.z,ox:0},ne=Z.w/((H.x+H.z)*Math.SQRT1_2);U.position.set(-te.x,-O.min.y,-te.z),dt(U),ft(U),mt(U),cb(U,+g.split(".")[0]),Ps(U);const fe=new ct;fe.add(U),fe.scale.set(ne,ne/Mn,ne),fe.position.set(Z.ox*Math.SQRT1_2,0,-Z.ox*Math.SQRT1_2),Z.turn&&(fe.rotation.y=Z.turn),ht[g]=fe},void 0,P=>console.warn("3D map: could not load "+w,P)))}const E={},k=ql(),ae=new _l;ae.add(new Ol(uh,dh,1.7));const de=new $o(hh,2.1);de.position.copy(f).multiplyScalar(50),ae.add(de);function oe(g){return E[g]?E[g]:ht[g]?E[g]=Ft(ht[g].clone(),480,600):(C(g),null)}function Fe(g,w){g=Math.min(8,Math.max(1,g||1));const P="lounge."+g+"."+(w?2:1);if(E[P])return E[P];const U=J&&J.pictureCopy(g,w);return U?E[P]=Ft(U,600,480):null}const xe={},Ie=new Sn({color:"#9aa39b"}),vt=new Sn({color:"#c9a978"}),Se=new fn({color:"#ffb52e"});function Be(g,w){if(xe[g])return xe[g];const P=[];w.traverse(St=>{St.isMesh&&(St.material=St.material.clone(),P.push(St.material))});const U=w.visible;w.visible=!0,w.updateMatrixWorld(!0);const O=new Nn().setFromObject(w);w.visible=U;const H=O.min.y/Mn,te=O.max.y/Mn+.35,Z=.3,ne=O.min.x-Z,fe=O.max.x+Z,Ee=O.min.z-Z,we=O.max.z+Z,V=[],ye=[],Ae=.05,Ke=(St,xt,ln,ri,ai,Ci,oi=V)=>oi.push(new on(ri,ai,Ci).translate(St,xt,ln)),lt=(St,xt)=>{const ln=Math.max(1,Math.round((xt-St)/1.6));return Array.from({length:ln+1},(ri,ai)=>St+(xt-St)*ai/ln)};lt(ne,fe).forEach(St=>[Ee,we].forEach(xt=>Ke(St,(H+te)/2,xt,Ae,te-H,Ae))),lt(Ee,we).forEach(St=>[ne,fe].forEach(xt=>Ke(xt,(H+te)/2,St,Ae,te-H,Ae)));for(let St=H+.9;St<=te+.01;St+=.9)[Ee,we].forEach(xt=>Ke((ne+fe)/2,St,xt,fe-ne,Ae,Ae)),[ne,fe].forEach(xt=>Ke(xt,St,(Ee+we)/2,Ae,Ae,we-Ee)),Ke((ne+fe)/2,St-.03,we-.18,fe-ne,.05,.34,ye);const Ve=new ct;Ve.add(new Ge(Di(V),Ie),new Ge(Di(ye),vt));const At=new Ge(new di(.12,10,8),Se);return At.position.set(fe,te+.12,we),Ve.add(At),Ve.traverse(St=>{St.isMesh&&(St.castShadow=!0)}),l.add(Ve),xe[g]={site:Ve,beacon:At,materials:P,plane:new Qi(new N(0,-1,0),0),lo:O.min.y,hi:O.max.y}}function $e(g){const w=g.fixtureBuild||{};Object.entries(W).forEach(([P,U])=>{const O=w[P];if(O===void 0){const te=xe[P];te&&te.site.visible&&(te.site.visible=!1,te.materials.forEach(Z=>{Z.clippingPlanes=null,Z.needsUpdate=!0}));return}const H=Be(P,U);(!H.site.visible||!H.materials[0].clippingPlanes)&&(H.site.visible=!0,H.materials.forEach(te=>{te.clippingPlanes=[H.plane],te.needsUpdate=!0})),H.plane.constant=H.lo+(H.hi-H.lo)*Math.max(0,Math.min(1,(O-.1)/.9)),U.visible=!0,H.beacon.visible=Math.floor((g.time||0)/500)%2===0})}const ot={},qe=new fn({color:"#f1e6c6",transparent:!0,opacity:.3,depthWrite:!1});function Rt(g){const w=g.fixtureGhost||{};Object.entries(W).forEach(([P,U])=>{if(!(!!w[P]&&!U.visible)){ot[P]&&(ot[P].visible=!1);return}if(!ot[P]){const H=U.clone();H.traverse(te=>{te.isMesh&&(te.material=qe,te.castShadow=!1,te.receiveShadow=!1)}),l.add(H),ot[P]=H}ot[P].visible=!0})}function gt(g){if(E["fixture."+g])return E["fixture."+g];if(!W[g]||xe[g]&&xe[g].site.visible)return null;const w=W[g].clone();return w.visible=!0,E["fixture."+g]=Ft(w,600,480)}function Ft(g,w,P){const U=new ct;U.scale.y=Mn,U.add(g),ae.add(U),U.updateMatrixWorld(!0);const O=new Nn().setFromObject(U),H=[];for(let xt=0;xt<8;xt++)H.push(new N(xt&1?O.max.x:O.min.x,xt&2?O.max.y:O.min.y,xt&4?O.max.z:O.min.z));k.updateMatrixWorld(!0);const te=k.matrixWorldInverse,Z=[],ne=[];H.forEach(xt=>{xt.applyMatrix4(te),Z.push(xt.x),ne.push(xt.y)});const fe=(Math.min(...Z)+Math.max(...Z))/2,Ee=(Math.min(...ne)+Math.max(...ne))/2,we=Math.max((Math.max(...Z)-Math.min(...Z))/2/w*P,(Math.max(...ne)-Math.min(...ne))/2)*1.04;k.left=fe-we*w/P,k.right=fe+we*w/P,k.top=Ee+we,k.bottom=Ee-we,k.updateProjectionMatrix();const V=new gs(w,P,{samples:4});V.texture.colorSpace=jt;const ye=t.getClearColor(new nt),Ae=t.getClearAlpha(),Ke=t.shadowMap.enabled;t.shadowMap.enabled=!1,t.setRenderTarget(V),t.setClearColor(0,0),t.clear(),t.render(ae,k);const lt=new Uint8Array(w*P*4);t.readRenderTargetPixels(V,0,0,w,P,lt),t.setRenderTarget(null),t.setClearColor(ye,Ae),t.shadowMap.enabled=Ke,V.dispose(),ae.remove(U);const Ve=document.createElement("canvas");Ve.width=w,Ve.height=P;const At=Ve.getContext("2d"),St=At.createImageData(w,P);for(let xt=0;xt<P;xt++)St.data.set(lt.subarray((P-1-xt)*w*4,(P-xt)*w*4),xt*w*4);return At.putImageData(St,0,0),Ve}const X=new bc(.24,1.55,4,10).translate(0,1.03,0),Pe=new ni(X,m("#ffffff",{name:"people"}),lh);Pe.castShadow=!0,Pe.count=0;const ue=new Map,be=[],Ue=new $t(new Uint16Array([0,1,2,0,2,3]),1),ke=8e3;let We=0,Xt=0;function un(g){let w=ue.get(g);return w||(w=new wn(g),w.colorSpace=jt,w.anisotropy=4,w.needsUpdate=!0,ue.set(g,w)),w.userData.used=Xt,w}function It(){Xt-We<2e3||(We=Xt,ue.forEach((g,w)=>{Xt-g.userData.used>ke&&(g.dispose(),ue.delete(w))}))}const me=[];function vn(g){if(!me[g]){const w=new cn;w.setAttribute("position",new $t(new Float32Array(12),3)),w.setAttribute("uv",new $t(new Float32Array(8),2)),w.setIndex(Ue);const P=new Ge(w,x(new fn({alphaTest:.5,side:2,depthTest:!1,depthWrite:!1})));P.frustumCulled=!1,P.renderOrder=-1,l.add(P),me[g]=P}return me[g]}function Dn(g){if(!be[g]){const w=new cn;w.setAttribute("position",new $t(new Float32Array(12),3)),w.setAttribute("uv",new $t(new Float32Array(8),2)),w.setIndex(Ue);const P=new Ge(w,x(new fn({alphaTest:.5,side:2})));P.frustumCulled=!1,l.add(P),be[g]=P}return be[g]}const On=[],mn=[];function Qn(g,w,P){const U=new cn;U.setAttribute("position",new $t(new Float32Array(12),3)),U.setAttribute("uv",new $t(new Float32Array(8),2)),U.setIndex(Ue);const O={alphaTest:.5,side:2},H=x(w?new Sn({...O,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}):new fn(O)),te=new Ge(U,H);return te.visible=!1,te.frustumCulled=!1,te.receiveShadow=w,l.add(te),_.load(new URL(g,document.baseURI).href,Z=>{Z.colorSpace=jt,Z.anisotropy=8;const[ne,fe]=P(Z.image);U.attributes.position.array.set(ne),U.attributes.position.needsUpdate=!0,U.attributes.uv.array.set(fe),U.attributes.uv.needsUpdate=!0,U.computeVertexNormals(),H.map=Z,H.needsUpdate=!0,te.userData.ready=!0},void 0,()=>console.warn("3D map: could not load "+g)),te}(e.wallFaces||[]).forEach(g=>{const w=Qn(g.url,!1,()=>[[g.x0,g.y0,g.z0,g.x1,g.y0,g.z1,g.x1,g.y0+g.h,g.z1,g.x0,g.y0+g.h,g.z0],[0,0,1,0,1,1,0,1]]);w.userData.model=g.model,On.push(w)}),(e.decals||[]).forEach(g=>{const w=Qn(g.url,!0,P=>{const U=g.pixels?g.image.map(([lt,Ve])=>[lt/P.naturalWidth,Ve/P.naturalHeight]):g.image,[O,H,te]=U,[Z,ne,fe]=g.world,Ee=H[0]-O[0],we=te[0]-O[0],V=H[1]-O[1],ye=te[1]-O[1],Ae=Ee*ye-we*V,Ke=(lt,Ve)=>{const At=lt-O[0],St=Ve-O[1],xt=(ye*At-we*St)/Ae,ln=(Ee*St-V*At)/Ae;return[Z[0]+(ne[0]-Z[0])*xt+(fe[0]-Z[0])*ln,.012,Z[1]+(ne[1]-Z[1])*xt+(fe[1]-Z[1])*ln]};return[[...Ke(0,1),...Ke(1,1),...Ke(1,0),...Ke(0,0)],[0,0,1,0,1,1,0,1]]});w.userData.show=g.show,mn.push(w)}),(e.casters||[]).forEach(g=>A(l,g.x,0,g.z,g.w,g.h,g.d,"#ffffff",{receive:!1,opts:{name:"street"}}));const Fn=new ct;l.add(Fn);let Ri="";function Wn(g){Fn.children.forEach(P=>P.geometry.dispose()),Fn.clear();const w=new Set;g.forEach(P=>{const U=new Wa(P.points.map(H=>new N(H[0],H[1],H[2]))),O=new Ge(new hr(U,20,.045,8,!1),m(P.colour));O.castShadow=!0,Fn.add(O),[P.points[0],P.points[P.points.length-1]].forEach(H=>{const te=H[0].toFixed(2)+","+H[2].toFixed(2);if(w.has(te))return;w.add(te);const Z=new Ge(L.clone(),m("#ffffff",{name:"street"}));Z.position.set(H[0],0,H[2]),Z.scale.set(.07,1,.07),Z.castShadow=!0,Fn.add(Z)})})}Pe.instanceMatrix.setUsage(35048),l.add(Pe);const Bn=new ni(L,m("#ffffff",{name:"street"}),qo),nn=new ni(L,m("#dfe8ea",{name:"street"}),qo);[Bn,nn].forEach(g=>{g.castShadow=!0,g.count=0,g.instanceMatrix.setUsage(35048),l.add(g)});const Xn=1.69,vi=new N(0,0,1),xn=new bn,ii={},si=[];Object.entries(e.carModels||{}).forEach(([g,w])=>S.load(e.modelBase+w,P=>{dt(P.scene),Ps(P.scene);const U=P.scene.getObjectByName("WheelFL");ii[g]={scene:P.scene,radius:U?new Nn().setFromObject(U).getSize(new N).y/2:.25}},void 0,P=>console.warn("3D map: could not load "+w,P)));const R=160,j={},ce={},ee=new Set;function K(g){g.updateMatrixWorld(!0);const w=new Map;g.traverse(U=>{if(!U.isMesh)return;let O=U.geometry.index?U.geometry.toNonIndexed():U.geometry.clone();O.applyMatrix4(U.matrixWorld),U.matrixWorld.determinant()<0&&Object.values(O.attributes).forEach(H=>{for(let te=0;te<H.count;te+=3)for(let Z=0;Z<H.itemSize;Z++){const ne=H.getComponent(te+1,Z);H.setComponent(te+1,Z,H.getComponent(te+2,Z)),H.setComponent(te+2,Z,ne)}}),Object.keys(O.attributes).forEach(H=>{H!=="position"&&H!=="normal"&&H!=="uv"&&H!=="color"&&O.deleteAttribute(H)}),O.attributes.normal||O.computeVertexNormals(),w.has(U.material)||w.set(U.material,[]),w.get(U.material).push(O)});const P=[...w].map(([U,O])=>{["uv","color"].forEach(te=>{O.some(Z=>!Z.attributes[te])&&O.forEach(Z=>Z.deleteAttribute(te))}),/Paint$/.test(U.name)&&(U.userData.paint=U.color.clone(),U.color.set("#ffffff"));const H=new ni(Di(O),x(U),R);return H.count=0,H.castShadow=H.receiveShadow=!0,H.frustumCulled=!1,H.userData.file=g.userData.file,H.userData.prop=!0,l.add(H),H});return P.box=new Nn().setFromObject(g),P}function Re(g){if(!ce[g]){ce[g]=!0;const[w,P]=g.split("#");S.load(e.modelBase+w,U=>{if(dt(U.scene),P==="low"||P==="lawn"){const O=[],H=P==="low"?/^(Crown|Trunk)/:/^Pit/;U.scene.traverse(te=>{H.test(te.name)&&O.push(te)}),O.forEach(te=>te.parent&&te.parent.remove(te))}U.scene.traverse(O=>{O.isMesh&&O.material.name==="LampGlow"&&ee.add(O.material)}),mt(U.scene),j[g]=K(U.scene)},void 0,U=>console.warn("3D map: could not load "+g,U))}return!!j[g]}const ge=new N(Xn,Xn/Mn,Xn),ze=new bn,et=new N(0,1,0),pt=new N;function yt(g,w){Object.values(j).forEach(P=>P.forEach(U=>{U.count=0})),(g||[]).forEach(P=>{const U=j[P.file];if(!(!U||U[0].count>=R)){if(ze.setFromAxisAngle(et,P.rot||0),Bt.set(P.x,P.y===void 0?e.plazaY:P.y,P.z),Array.isArray(P.scale))Yt.compose(Bt,ze,pt.set(ge.x*P.scale[0],ge.y*P.scale[1],ge.z*P.scale[2]));else if(P.scale)Yt.compose(Bt,ze,pt.copy(ge).multiplyScalar(P.scale));else if(P.fit){const O=U.box,H=P.fit.w/(O.max.x-O.min.x),te=P.fit.d/(O.max.z-O.min.z);Bt.x-=(O.min.x+O.max.x)/2*H,Bt.z-=(O.min.z+O.max.z)/2*te,Yt.compose(Bt,ze,pt.set(H,H/Mn,te))}else Yt.compose(Bt,ze,ge);U.forEach(O=>{O.material.userData.paint&&O.setColorAt(O.count,P.tint?is.set(P.tint):O.material.userData.paint),O.setMatrixAt(O.count++,Yt)})}}),Object.values(j).forEach(P=>P.forEach(U=>{U.instanceMatrix.needsUpdate=!0,U.instanceColor&&(U.instanceColor.needsUpdate=!0),U.visible=U.count>0})),ee.forEach(P=>{P.emissive.set("#ffd9a0"),P.emissiveIntensity=w*2.5})}const Xe=1,Ct=1.1*Ts*Xe,Nt=.16,Et=.9,Je=1.2,Gt=1,Oe=1.12,Tt={value:Et},wt=g=>g*g*(3-2*g),Ut={},Ot={},dn=[],kn=new Map;function Kt(g){return Ot[g]||(Ot[g]=!0,S.load(e.modelBase+g,w=>{dt(w.scene);const P=[];w.scene.traverse(U=>{if(!U.isMesh)return;U.frustumCulled=!1;const O=U.material.map||U.material.emissiveMap;U.material=new ns({map:O,emissiveMap:O,emissive:"#ffffff",emissiveIntensity:Nt,roughness:.4,metalness:0,name:U.material.name}),U.material.onBeforeCompile=H=>{H.uniforms.characterRim=Tt,H.uniforms.characterSat={value:Je},H.uniforms.characterBright={value:Oe},H.uniforms.characterFill={value:Gt},H.fragmentShader=H.fragmentShader.replace("#include <common>",`#include <common>
uniform float characterRim, characterSat, characterFill, characterBright;`).replace("#include <map_fragment>",`#include <map_fragment>
              diffuseColor.rgb = max(mix(vec3(dot(diffuseColor.rgb, vec3(.2126, .7152, .0722))), diffuseColor.rgb, characterSat), 0.0) * characterBright;`).replace("#include <lights_fragment_end>",`#include <lights_fragment_end>
              reflectedLight.indirectDiffuse *= characterFill;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
              float rimFacing = 1.0 - abs(dot(normal, isOrthographic ? vec3(0.0, 0.0, 1.0) : normalize(vViewPosition)));
              totalEmissiveRadiance += diffuseColor.rgb * vec3(1.0, .93, .8) * pow(rimFacing, 3.0) * characterRim;`)},P.push(U.material)}),Ut[g]={scene:w.scene,clips:w.animations,materials:P}},void 0,w=>console.warn("3D map: could not load "+g,w))),!!Ut[g]}function en(g,w){let P=dn[g];if(P&&P.file===w)return P;P&&l.remove(P.holder);const U=Ut[w],O=new ct,H=t_(U.scene);O.add(H),O.scale.set(Ts*Xe,Ts*Xe/Mn,Ts*Xe),l.add(O);const te=new F0(H),Z=Ee=>U.clips.find(we=>Ee.test(we.name)),ne=te.clipAction(Z(/^Idle/)),fe=te.clipAction(Z(/^Walking$/));return fe.timeScale=0,ne.play(),fe.play(),dn[g]={file:w,holder:O,mixer:te,idle:ne,walk:fe,rig:r_(H)}}function jn(g,w,P){Object.values(Ut).forEach(O=>O.materials.forEach(H=>{H.emissiveIntensity=Nt*(1-P*.85)})),Tt.value=Et*(1-P*.7);const U=new Set;(g||[]).forEach((O,H)=>{if(!Ut[O.file])return;const te=en(H,O.file),Z=O.still?0:Math.max(0,Math.min(1,O.amount||0));te.holder.visible=!0,te.holder.position.set(O.x,O.y||0,O.z);let ne,fe;const Ee=Z>.3?O.heading:O.look||O.heading;if(Ee)ne=Ee.x,fe=Ee.z;else{const lt=(O.facing===void 0?.3:O.facing)>=0?.75:-.75;ne=1+lt,fe=1-lt}const we=Math.atan2(ne,fe),V=kn.has(O.id)?kn.get(O.id):we;let ye=we-V;ye-=Math.round(ye/(2*Math.PI))*2*Math.PI;const Ae=V+ye*Math.min(1,w*10);kn.set(O.id,Ae),U.add(O.id),te.holder.rotation.y=Ae;const Ke=te.walk.getClip().duration;if(te.walk.time=((O.ground||0)/Ct%1+1)%1*Ke,te.walk.setEffectiveWeight(Z),te.idle.setEffectiveWeight(1-Z),te.mixer.update(O.still?0:w),te.rig){const lt=O.work&&O.work.role;te.rig.role!==lt&&(te.rig.role=lt,te.rig.weight=0),lt&&(te.rig.weight=O.still?1:Math.min(1,te.rig.weight+w*2),d_(te.rig,lt,O.work.clock,O.work.act,wt(te.rig.weight)))}});for(let O=(g||[]).length;O<dn.length;O++)dn[O]&&(dn[O].holder.visible=!1);kn.forEach((O,H)=>{U.has(H)||kn.delete(H)})}const _n=()=>!!e.carModels&&Object.keys(e.carModels).every(g=>ii[g]);function An(g,w){const P=w.van?"van":"car",U=ii[P];let O=si[g];if(O&&O.kind===P&&O.paint===w.paint)return O;O&&l.remove(O.holder);const H=new ct,te=U.scene.clone(!0);te.traverse(ne=>{ne.isMesh&&/Paint$/.test(ne.material.name)&&(ne.material=ne.material.clone(),ne.material.color.set(w.paint))}),H.add(te),H.scale.set(Xn,Xn/Mn,Xn),l.add(H);const Z=["WheelFL","WheelFR","WheelBL","WheelBR"].map(ne=>te.getObjectByName(ne)).filter(Boolean).map(ne=>({w:ne,rest:ne.quaternion.clone()}));return si[g]={kind:P,paint:w.paint,holder:H,wheels:Z,radius:U.radius}}const Yt=new tt,Bt=new N,yn=new N,gn=new bn,is=new nt,ki=u.intensity,zn=h.intensity,xi=new nt("#2b3a48"),se=a.clone();let Q=!1;s.addEventListener("webglcontextlost",g=>{g.preventDefault(),Q=!0}),s.addEventListener("webglcontextrestored",()=>{Q=!1});let Te=1;const Me=(g,w)=>{const P=w.geometry,U=P.attributes.position,O=P.attributes.uv,[H,te,Z,ne]=g.uv;U.array.set(g.points),U.needsUpdate=!0,O.array.set([H,te,Z,te,Z,ne,H,ne]),O.needsUpdate=!0;const fe=w.material,Ee=un(g.img),we=g.alpha<1;fe.map!==Ee&&(fe.map||(fe.needsUpdate=!0),fe.map=Ee),fe.transparent!==we&&(fe.transparent=we,fe.needsUpdate=!0),fe.opacity=g.alpha,fe.color.setScalar(Te),w.visible=!0};function Ce(g,w){Te=1-w*.55,g.forEach((P,U)=>Me(P,Dn(U)));for(let P=g.length;P<be.length;P++)be[P].visible=!1}function Ne(g,w){Xt=performance.now(),It();const P=Math.min(g.dpr,2);t.getPixelRatio()!==P&&t.setPixelRatio(P);const U=t.getSize(new He);(U.x!==g.width||U.y!==g.height)&&t.setSize(g.width,g.height,!1),B0(c,g);const O=g.lookAt||{x:0,z:0};h.target.position.set(O.x,0,O.z),h.position.copy(h.target.position).addScaledVector(f,120),h.target.updateMatrixWorld();const H=g.night||0;return u.intensity=ki*(1-H*.72),h.intensity=zn*(1-H*.9),o.background.copy(w).lerp(xi,H),b.hazeColour.value.copy(o.background),H}const Ze=tb(l),Ye=[],ut=new nt,Pt={},Mt=[b.hazeX.value.clone(),b.hazeZ.value.clone()];let bt=!1,Qe=null;function Ht(g){if(g!==bt){if(bt=g,g){const w=new Set([l,u,h,h.target,Ze.group,...be]);[...o.children,...l.children].forEach(P=>{!w.has(P)&&!P.userData.prop&&!P.userData.land&&P.visible&&(P.visible=!1,Ye.push(P))}),me.forEach(P=>{P.visible=!1})}else Ye.forEach(w=>{w.visible=!0}),Ye.length=0,Qe&&(Qe.visible=!1),Qe=null,b.hazeX.value.copy(Mt[0]),b.hazeZ.value.copy(Mt[1]);Ze.group.visible=g}}const kt=90,Qt=2,Pn=13;function Ln(g,[w,P,U,O]){const H=[];return g.forEach(([te,Z,ne,fe])=>{if(w>=Z||P<=te||U>=fe||O<=ne){H.push([te,Z,ne,fe]);return}U>ne&&H.push([te,Z,ne,U]),O<fe&&H.push([te,Z,O,fe]);const Ee=Math.max(ne,U),we=Math.min(fe,O);w>te&&H.push([te,w,Ee,we]),P<Z&&H.push([P,Z,Ee,we])}),H}function qn(g){const w=new ct,[P,U,O,H]=g.plot,te=(P+U)/2,Z=(O+H)/2,ne=kt;w.userData.land=!0;let fe=Ln([[te-ne,te+ne,Z-ne,Z+ne]],g.plot);const Ee=g.strips||[],we=Ee.map(ye=>[ye.x0===void 0?te-ne:ye.x0,ye.x1===void 0?te+ne:ye.x1,ye.z0===void 0?Z-ne:ye.z0,ye.z1===void 0?Z+ne:ye.z1]);we.forEach(ye=>{fe=Ln(fe,ye)}),fe.forEach(([ye,Ae,Ke,lt])=>y(w,ye,Ae,g.y-1.2,g.y,Ke,lt,g.colour,{cast:!1})),Ee.forEach((ye,Ae)=>Ln([we[Ae]],g.plot).forEach(([Ke,lt,Ve,At])=>y(w,Ke,lt,g.y-1.2,ye.y,Ve,At,ye.colour,{cast:!1})));const V=[];if(g.trees){let ye=7;const Ae=()=>(ye=ye*16807%2147483647)/2147483647;for(let Ke=0;Ke<64;Ke++){const lt=Ke%4,Ve=lt===1||lt===3,At=Ae(),St=Ve?7.5+Ae()*4:2+Ae()*8,xt=lt===0?P-St:lt===1?U+St:P-8+At*(U-P+16),ln=lt===2?O-St:lt===3?H+St:O-8+At*(H-O+16);xt>P-1.5&&xt<U+1.5&&ln>O-1.5&&ln<H+1.5||xt>U&&ln>H-4||ln>H&&xt>U-4||we.some(([ri,ai,Ci,oi])=>xt>ri-1.6&&xt<ai+1.6&&ln>Ci-1.6&&ln<oi+1.6)||V.push({file:Ke%3?"tree.glb#lawn":"street_tree.glb#lawn",x:xt,y:g.y,z:ln,rot:Ae()*6.28,scale:(Ve?.6:.75)+Ae()*.35})}}if(g.town){const ye=["building_rowhouse_terracotta","building_townhouse_sage","building_low_stone","building_mid_stone","building_apartment_brick","building_shop_narrow","building_low_tan","building_corner"];let Ae=0;for(let Ke=P+4;Ke<U+4;Ke+=10.5)V.push({file:ye[Ae++%ye.length]+".glb",x:Ke,y:g.y,z:O-6.5,rot:0});for(let Ke=O+2;Ke<H+2;Ke+=10.5)V.push({file:ye[Ae++%ye.length]+".glb",x:P-6.5,y:g.y,z:Ke,rot:Math.PI/2});V.push({file:"building_corner.glb",x:P-6.5,y:g.y,z:O-6.5,rot:Math.PI/4})}return w.userData.props=V,w.userData.haze=[new Zt(P-Qt,P-Pn,U+Qt,U+Pn),new Zt(O-Qt,O-Pn,H+Qt,H+Pn)],l.add(w),w}function _s(g){if(Q)return!1;Ht(!0);const w=g.land?Pt[g.landKey]||(Pt[g.landKey]=qn(g.land)):null;w!==Qe&&(Qe&&(Qe.visible=!1),Qe=w,Qe&&(Qe.visible=!0,b.hazeX.value.copy(Qe.userData.haze[0]),b.hazeZ.value.copy(Qe.userData.haze[1])));const P=Ne(g,Qe?se:ut.set(g.background));Ze.update(g.branch,P);const U=(g.branch.props||[]).concat(Qe?Qe.userData.props:[]);U.forEach(te=>Re(te.file)),yt(U,P),Ce(g.figures||[],P);const O=performance.now(),H=Math.min(.1,(O-(ve||O))/1e3);return ve=O,jn(g.characters,H,P),g.dry||t.render(o,c),!0}function Ya(g){if(Q)return!1;Ht(!1);const w=Ne(g,se),P=performance.now(),U=Math.min(.1,(P-(ve||P))/1e3);ve=P;let O=!1;g.stations.forEach((V,ye)=>{const Ae=it(ye),{body:Ke,top:lt}=Ae.userData;if(Ae.visible=V.visible!==!1,!Ae.visible)return;const Ve=V.index+"."+Math.max(1,V.tier);V.built&&(C(Ve),C(V.index+".3"));const At=ht[Ve]?Ve:V.index+".3",St=V.ghost?At+"|ghost":At,xt=V.built&&V.index!==void 0&&ht[At],ln=Ae.userData.clones||(Ae.userData.clones={}),ri=Ae.userData.rigs||(Ae.userData.rigs={});xt&&!ln[St]&&(Ae.add(ln[St]=xt.clone()),V.ghost?ln[St].traverse(zi=>{zi.isMesh&&(zi.material=qe,zi.castShadow=!1,zi.receiveShadow=!1)}):ri[St]=lb(ln[St],V.index)),xt&&ri[St]&&ub(ri[St],V,U),Object.entries(ln).forEach(([zi,hu])=>{hu.visible=!!xt&&zi===St}),Ke.visible=!xt;const ai=V.built?V.h:.12,Ci=V.rise?-V.rise*V.rise*1.1:0;Ae.position.set(V.x,V.y+Ci,V.z);const oi=V.pop===void 0?1:V.pop,pr=oi-1,lu=oi>=1?1:1+2.4*pr*pr*pr+1.4*pr*pr;if(Ae.scale.setScalar(Math.max(.001,lu)),oi<=0&&(Ae.visible=!1),Ke.scale.set(V.w,ai,V.d),lt.visible=V.built&&!xt,lt.position.y=ai,lt.scale.set(V.w+.12,.08,V.d+.12),Ke.material=m(V.built?pe[Math.min(3,V.tier)]:"#e3b04b"),V.selected&&!O&&oi>=1){O=!0,ie.position.set(V.x,V.y+.03,V.z);const zi=Math.max(V.w,V.d)*.72;ie.scale.set(zi,1,zi)}});for(let V=g.stations.length;V<Le.length;V++)Le[V]&&(Le[V].visible=!1);ie.visible=O;let H=0;const te=(g.time||0)/1e3;g.stations.forEach(V=>{if(!(V.boost>0)||V.visible===!1||V.pop!==void 0&&V.pop<1)return;const{pool:ye,ring:Ae}=st(H++),Ke=Math.max(V.w,V.d)*.75,lt=.5+.5*Math.sin(te*3.2),Ve=te*.7%1;ye.visible=Ae.visible=!0,ye.position.set(V.x,V.y+.025,V.z),ye.scale.set(Ke*3.8,1,Ke*3.8),ye.material.opacity=.38+.25*lt,Ae.position.set(V.x,V.y+.05+Ve*1.4,V.z),Ae.scale.set(Ke*(.9+Ve*.35),1,Ke*(.9+Ve*.35)),Ae.material.opacity=.7*(1-Ve)});for(let V=H;V<_e.length;V++)_e[V].pool.visible=_e[V].ring.visible=!1;const Z=g.figures||[],ne=1-w*.55;Ce(Z,w),On.forEach(V=>{V.visible=!!V.userData.ready&&!(V.userData.model&&W[V.userData.model]),V.material.color.setScalar(ne)}),mn.forEach(V=>{V.visible=V.userData.ready&&(V.userData.show!=="loungeOpen"||!!g.loungeOpen)});const fe=JSON.stringify(g.ropes||[]);fe!==Ri&&(Ri=fe,Wn(g.ropes||[]));const Ee=g.backdrops||[];Ee.forEach((V,ye)=>Me(V,vn(ye)));for(let V=Ee.length;V<me.length;V++)me[V].visible=!1;q.forEach(V=>{V.visible=!j[V.userData.model],V.renderOrder=g.backdrops?-2:0,V.material.colorWrite=!g.backdrops}),Pe.material.colorWrite=Pe.material.depthWrite=!g.figures,v.forEach((V,ye)=>{ye.endsWith('{"name":"street"}')&&(V.colorWrite=V.depthWrite=!g.figures)}),Pe.count=Math.min(lh,g.people.length);for(let V=0;V<Pe.count;V++){const ye=g.people[V];Bt.set(ye.x,ye.y||0,ye.z),yn.set(1,1,1),Yt.compose(Bt,gn.identity(),yn),Pe.setMatrixAt(V,Yt),Pe.setColorAt(V,is.set(ye.colour))}Pe.instanceMatrix.needsUpdate=!0,Pe.instanceColor&&(Pe.instanceColor.needsUpdate=!0),yt(g.props,w),jn(g.characters,U,w),Wt.forEach(V=>{V.emissiveIntensity=.16+w*.7}),_t.forEach(V=>{V.emissiveIntensity=.35+w*.55}),Object.entries(at).forEach(([V,ye])=>qt(ye,g.menus?g.menus[V]:null,g.menuClock||0)),F.forEach(V=>{V.visible=!j["street_lamp.glb"]});const we=_n();g.cars.forEach((V,ye)=>{if(!we)return;const Ae=An(ye,V),Ke=V.along==="x";Ae.holder.visible=!0,Ae.holder.position.set(V.x,e.streetY,V.z),Ae.holder.rotation.y=Ke?V.dir>0?0:Math.PI:V.dir>0?-Math.PI/2:Math.PI/2,xn.setFromAxisAngle(vi,-V.roll/(Ae.radius*Xn)),Ae.wheels.forEach(({w:lt,rest:Ve})=>lt.quaternion.multiplyQuaternions(xn,Ve))});for(let V=we?g.cars.length:0;V<si.length;V++)si[V]&&(si[V].holder.visible=!1);Bn.count=nn.count=we?0:Math.min(qo,g.cars.length);for(let V=0;V<Bn.count;V++){const ye=g.cars[V],Ae=ye.along==="x",Ke=ye.van,lt=Ke?4.6:4,Ve=1.8;Bt.set(ye.x,e.streetY+.25,ye.z),yn.set(Ae?lt:Ve,Ke?1.7:.75,Ae?Ve:lt),Bn.setMatrixAt(V,Yt.compose(Bt,gn.identity(),yn)),Bn.setColorAt(V,is.set(ye.paint)),Bt.y+=Ke?1.7:.75,yn.set(Ae?Ke?1.4:2.1:Ve*.86,Ke?.05:.55,Ae?Ve*.86:Ke?1.4:2.1),nn.setMatrixAt(V,Yt.compose(Bt,gn.identity(),yn))}return[Bn,nn].forEach(V=>{V.instanceMatrix.needsUpdate=!0,V.instanceColor&&(V.instanceColor.needsUpdate=!0)}),G&&g.cargo&&G.update(g.cargo,g.fixtures),he&&he.update(g),J&&J.update(g),$&&$.update(g),Object.entries(W).forEach(([V,ye])=>{ye.visible=!!(g.fixtures&&g.fixtures[V])}),$e(g),Rt(g),g.dry||t.render(o,c),!0}function Ja(g){const w=t.info,P=new Set,U=new Set,O={};let H=0,te=0;o.traverse(Ae=>{if(!Ae.isMesh)return;H++;let Ke=!0,lt=null;for(let Ve=Ae;Ve;Ve=Ve.parent)Ve.visible||(Ke=!1),!lt&&Ve.userData.file&&(lt=Ve.userData.file);if(Ke&&(te++,g)){const Ve=O[lt||"(code)"]=O[lt||"(code)"]||{meshes:0,triangles:0},At=Ae.geometry;Ve.meshes++,Ve.triangles+=(At.index?At.index.count:At.attributes.position.count)/3*(Ae.isInstancedMesh?Ae.count:1)}P.add(Ae.geometry),(Array.isArray(Ae.material)?Ae.material:[Ae.material]).forEach(Ve=>{for(const At in Ve)Ve[At]&&Ve[At].isTexture&&U.add(Ve[At].source)})});let Z=0,ne=0;P.forEach(Ae=>{Object.values(Ae.attributes).forEach(Ke=>{Z+=Ke.array.byteLength}),Ae.index&&(Z+=Ae.index.array.byteLength)}),o.traverse(Ae=>{Ae.isInstancedMesh&&(Z+=Ae.instanceMatrix.array.byteLength+(Ae.instanceColor?Ae.instanceColor.array.byteLength:0))}),U.forEach(Ae=>{const Ke=Ae.data;Ke&&Ke.width&&(ne+=Ke.width*Ke.height*4*4/3)});const fe=t.getDrawingBufferSize(new He),Ee=h.shadow.mapSize,we=fe.x*fe.y*4*(t.getContext().getContextAttributes().antialias?9:2),V=t.shadowMap.enabled?Ee.x*Ee.y*8:0,ye=Ae=>Math.round(Ae/1048576*10)/10;return{calls:w.render.calls,triangles:w.render.triangles,meshes:H,visible:te,programs:w.programs?w.programs.length:0,geometries:w.memory.geometries,textures:w.memory.textures,pixelRatio:t.getPixelRatio(),buffer:fe.x+"x"+fe.y,mb:{geometry:ye(Z),texture:ye(ne),buffer:ye(we),shadow:ye(V),total:ye(Z+ne+we+V)},...g?{models:O}:{}}}return{render:Ya,renderBranch:_s,carsModelled:_n,propReady:Re,characterReady:Kt,hasFixture:g=>!!W[g],stationPicture:oe,loungePicture:Fe,fixturePicture:gt,stats:Ja,get ok(){return!Q},get loading(){return n+z.length},dispose(){cancelAnimationFrame(B),z.length=0,t.dispose(),v.forEach(g=>g.dispose())}}}function f_(s,e,{box:t,span:n,material:i,textured:r,lampStandIns:a}){const{roads:o,roadWidth:c,plazaY:l,streetY:u,extent:h}=e,d=e.holes||[],f=(A,y,S,I,z,B,Y,re)=>{let F=[[A,y,z,B]];d.forEach(q=>{F=F.flatMap(([G,he,J,$])=>{if(q.x0>=he||q.x1<=G||q.z0>=$||q.z1<=J)return[[G,he,J,$]];const ve=Math.max(G,q.x0),Le=Math.min(he,q.x1);return[[G,ve,J,$],[Le,he,J,$],[ve,Le,J,Math.max(J,q.z0)],[ve,Le,Math.min($,q.z1),$]].filter(([ie,pe,De,_e])=>pe-ie>1e-6&&_e-De>1e-6)})}),F.forEach(([q,G,he,J])=>r(n(s,q,G,S,I,he,J,Y,{cast:!1}),re))};f(-h,h,u-.4,u,-h,h,e.colours.asphalt,"asphalt");const b=A=>{const y=o.filter(z=>z.along===A).map(z=>z.at).sort((z,B)=>z-B),S=[];let I=-h;return y.forEach(z=>{S.push([I,z-c/2]),I=z+c/2}),S.push([I,h]),S},v=b("x");b("z").forEach(([A,y])=>v.forEach(([S,I])=>f(A,y,u,l,S,I,e.colours.paver,"sidewalk")));const p={};(e.marks||[]).forEach(A=>(p[A.colour]=p[A.colour]||[]).push(A));const x=new tt,M=new N,_=new N,D=new bn;Object.entries(p).forEach(([A,y])=>{const S=/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/.exec(A),I=S?i("#"+[1,2,3].map(B=>(+S[B]).toString(16).padStart(2,"0")).join(""),{transparent:!0,opacity:+S[4],depthWrite:!1}):i(A),z=new ni(new on(1,1,1).translate(0,.5,0),I,y.length);y.forEach((B,Y)=>z.setMatrixAt(Y,x.compose(M.set((B.x0+B.x1)/2,B.h?B.y:B.y-.004,(B.z0+B.z1)/2),D,_.set(B.x1-B.x0,B.h||.012,B.z1-B.z0)))),z.receiveShadow=!0,s.add(z)});const T=[];e.buildings.forEach(A=>{const y=n(s,A.x0,A.x1,l,A.h,A.z0,A.z1,A.wall,{opts:{name:"terrace"}}),S=n(s,A.x0-.15,A.x1+.15,A.h,A.h+.35,A.z0-.15,A.z1+.15,A.roof,{opts:{name:"terrace"}});y.userData.model=S.userData.model=A.model,T.push(y,S)}),s.add(p_(e.silhouettes||[],l,i));const L=new ui(1.6,1);return e.trees.forEach(([A,y])=>{t(s,A,l,y,.35,2.2,.35,"#7a5a3e",{opts:{name:"street"}});const S=new Ge(L,i("#7fa35a",{name:"street"}));S.position.set(A,l+3.6,y),S.scale.set(1,.8,1),S.castShadow=S.receiveShadow=!0,s.add(S)}),e.lamps.forEach(([A,y])=>{a.push(t(s,A,l,y,.18,4.4,.18,"#3b4a43",{opts:{name:"street"}})),a.push(t(s,A,l+4.3,y,.5,.3,.5,"#f1e3b6",{opts:{name:"street"}}))}),T}function p_(s,e,t){const n=[],i=[],r=[],a=new nt,o=new nt,c=new nt("#e6dcc6"),l=(m,p,x,M,_,D)=>{[m,p,x,m,x,M].forEach(T=>{n.push(...T),i.push(..._),r.push(D.r,D.g,D.b)})},u=(m,p,x,M,_,D,T)=>{l([m,M,D],[p,M,D],[p,M,_],[m,M,_],[0,1,0],T),l([m,x,D],[p,x,D],[p,M,D],[m,M,D],[0,0,1],T),l([p,x,D],[p,x,_],[p,M,_],[p,M,D],[1,0,0],T),l([p,x,_],[m,x,_],[m,M,_],[p,M,_],[0,0,-1],T),l([m,x,_],[m,x,D],[m,M,D],[m,M,_],[-1,0,0],T)},h=1.69/Mn,d=2.75*h,f=2.45*h;s.forEach(m=>{a.set(m.colour).convertSRGBToLinear(),o.copy(a).multiplyScalar(.62);const p=e+d+(m.storeys-1)*f+.35*h;u(m.x0,m.x1,e,p,m.z0,m.z1,a),u(m.x0-.12,m.x1+.12,p,p+.3,m.z0-.12,m.z1+.12,c);for(let x=0;x<m.storeys;x++){const M=e+(x?d+(x-1)*f:0)+(x?.9:.5)*h,_=M+(x?1.1:1.7)*h;l([m.x0+.5,M,m.z1+.03],[m.x1-.5,M,m.z1+.03],[m.x1-.5,_,m.z1+.03],[m.x0+.5,_,m.z1+.03],[0,0,1],o),l([m.x1+.03,M,m.z1-.5],[m.x1+.03,M,m.z0+.5],[m.x1+.03,_,m.z0+.5],[m.x1+.03,_,m.z1-.5],[1,0,0],o)}});const b=new cn;b.setAttribute("position",new zt(n,3)),b.setAttribute("normal",new zt(i,3)),b.setAttribute("color",new zt(r,3));const v=new Ge(b,t("#ffffff",{vertexColors:!0,name:"silhouette"}));return v.receiveShadow=!0,v.castShadow=!1,v}function m_(s,e,{box:t,span:n,material:i,textured:r,model:a}){const o=new ct;s.add(o),e.floors.forEach((D,T)=>{const L=(D.x||0)-D.w/2,A=(D.x||0)+D.w/2,y=D.z-D.d/2,S=D.z+D.d/2;r(n(o,L,A,D.y-(T?.32:.02),D.y,y,S,T===2?"#e9e4d8":T?"#e4ddcc":"#c9965f",{cast:T>0}),["herringbone","timber","concrete"][T]),T&&(n(o,L,A,D.y,D.y+1.05,S-.06,S,"#c9a35a",{opts:{transparent:!0,opacity:.55}}),(T===1?[L+.3,A-.3]:[L+.3,0,A-.3]).forEach(I=>t(o,I,e.floors[T-1].y,S-.3,.3,D.y-e.floors[T-1].y-.32,.3,"#33372f")))});const c=(D,T,L,A,y,S,I,z,B,Y)=>{const re=[];for(let q=0;q<=48;q++){const G=q/48,he=y+(S-y)*G;re.push(new N(T+Math.cos(he)*A,(I+(z-I)*G)*Mn,L+Math.sin(he)*A))}const F=new Ge(new hr(new Wa(re),96,B,8,!1),i(Y));F.castShadow=!0,D.add(F)},l=(D,T,L,A,y,S)=>{const I=new ct,z=new ct;z.scale.y=1/Mn,I.add(z),o.add(I),a("spiral_stair.glb",D,L,T,()=>{I.visible=!1});const B=1.15,Y=Math.PI*24/180,re=(A-L)/y,F=J=>S+(y-1-J)*Y;t(I,D,L,T,.26,A-L+1,.26,"#1f5a3c"),t(I,D,L,T,.56,.06,.56,"#d0a54e",{cast:!1});const q=new Ge(new di(.13,16,10),i("#d0a54e"));q.position.set(D,A+1.05,T),q.castShadow=!0,I.add(q);for(let J=0;J<y-1;J++){const $=F(J),ve=L+re*(J+1),Le=Y*1.04,ie=new Ge(new hn(B,B,.08,6,1,!1,Math.PI/2-$-Le/2,Le),i("#d9a768"));ie.position.set(D,ve-.04,T),ie.castShadow=ie.receiveShadow=!0,I.add(ie);const pe=$-Y/2;t(I,D+Math.cos(pe)*(B-.06),ve,T+Math.sin(pe)*(B-.06),.05,.95,.05,"#1f5a3c",{cast:!1})}const G=F(0)+Y/2,he=F(y-2)-Y/2;c(z,D,T,B-.06,G,he,L+1,A-re+1,.05,"#d0a54e"),c(z,D,T,B-.02,G,he,L+re-.14,A-.14,.09,"#1f5a3c")},[,u,h]=e.floors,d=-Math.PI/2,f=(D,T,L,A,y)=>n(o,D,T,y,y+1.05,L,A,"#c9a35a",{opts:{transparent:!0,opacity:.55}});l(10.2,.35,0,u.y,14,d),r(n(o,8.93,11.35,u.y-.32,u.y,-2.8,-.8,"#e4ddcc",{cast:!0}),"timber"),f(11.29,11.35,-2.8,-.8,u.y),l(7.75,-4.4,u.y,h.y,14,d),r(n(o,6.45,9,h.y-.32,h.y,-6.9,-5.55,"#e9e4d8",{cast:!0}),"concrete"),f(8.94,9,-6.9,-5.55,h.y);const b=(D,T,L,A)=>f(D-.03,D+.03,T,L,A),v=(D,T,L,A)=>f(D,T,L-.03,L+.03,A),m=u.z-u.d/2,p=u.z+u.d/2,x=h.z-h.d/2,M=h.z+h.d/2;b(-u.w/2+.03,m+3.5,p-.06,u.y),b(u.w/2-.03,m,-2.8,u.y),b(u.w/2-.03,-.8,p-.06,u.y),v(9,11.35,-2.77,u.y),v(9,9.6,-.83,u.y),v(10.8,11.35,-.83,u.y),b(-h.w/2+.03,x+3.5,M-.06,h.y),b(h.w/2-.03,-5.55,M-.06,h.y),v(h.w/2,7.15,-5.58,h.y),v(8.35,9,-5.58,h.y);const _=e.marquee;e.wallFaces||(n(o,_.x-.13,_.x+.13,0,.9,_.zRear,_.zFront,"#1f6b47"),n(o,_.x-.04,_.x+.04,.9,_.y0,_.zRear,_.zFront,"#cfe3dc",{cast:!1,opts:{transparent:!0,opacity:.35}}),n(o,_.x-.16,_.x+.16,_.y0,_.y1,_.zRear,_.zFront,"#1f6b47"),[_.zRear,_.zFront].forEach(D=>t(o,_.x,0,D,.34,_.y1,.34,"#174f36")))}function g_(s,e,t,{box:n,material:i}){if(!t)return null;const r=Mn,a=t.bore/2,o=new ns({color:"#cfeee2",emissive:"#2f5a4a",emissiveIntensity:.25,roughness:.08,metalness:0,transparent:!0,opacity:.46,depthWrite:!1}),c=new ns({color:"#d0a54e",roughness:.3,metalness:.9}),l=(A,y,S)=>A.map((I,z)=>I+(y[z]-I)*S);function u(A){const y=[A[0]],S=.48;for(let I=1;I<A.length-1;I++){const z=A[I-1],B=A[I],Y=A[I+1],re=l(B,z,Math.min(.4,S/Math.hypot(...z.map((q,G)=>q-B[G])))),F=l(B,Y,Math.min(.4,S/Math.hypot(...Y.map((q,G)=>q-B[G]))));y.push(re);for(let q=1;q<=8;q++){const G=q/8;y.push(re.map((he,J)=>(1-G)*(1-G)*he+2*(1-G)*G*B[J]+G*G*F[J]))}}return y.push(A[A.length-1]),y}const h=A=>new N(A[0],A[1]*r,A[2]),d=(A,y,S,I,z)=>{const B=new Ge(new ja(S,I,10,32),z);return B.position.copy(h(A)),B.lookAt(B.position.clone().add(y)),B.castShadow=!0,s.add(B),B},f=t.tubes.map(A=>{const y=u(A.points),S=new Gh;for(let F=1;F<y.length;F++)S.add(new Oh(h(y[F-1]),h(y[F])));const I=new Ge(new hr(S,Math.max(24,y.length*3),a,18,!1),o);I.renderOrder=3,s.add(I);const z=[I];[[A.points[0],A.points[1]],[A.points[A.points.length-1],A.points[A.points.length-2]]].forEach(([F,q],G)=>{(G===0?A.noCap0:A.noCap1)||z.push(d(F,h(F).sub(h(q)).normalize(),a+.02,.07,c))}),(A.floorRings||[]).forEach(F=>z.push(d(F,new N(0,1,0),a+.1,.08,c)));const Y=[];let re=0;for(let F=1;F<y.length;F++){const q=Math.hypot(y[F][0]-y[F-1][0],y[F][1]-y[F-1][1],y[F][2]-y[F-1][2]);Y.push({a:y[F-1],b:y[F],len:q}),re+=q}return{tube:A,segments:Y,total:re,parts:z}}),b=new ct;e.add(b);const v=t.belts.map(A=>{const y=Math.abs(A.x2-A.x1),S=(A.x1+A.x2)/2;return[A.x1,A.x2].forEach(I=>n(b,I-Math.sign(A.x2-A.x1)*.25*(I===A.x1?-1:1),A.floor,A.z,.12,A.height-.1,.5,"#344a40")),n(b,S,A.floor+A.height-.18,A.z,y,.16,A.width,"#536c5b"),n(b,S,A.floor+A.height-.02,A.z,y-.1,.04,A.width-.2,"#2a4035",{cast:!1}),A}),m=b_(),p=m.map(A=>{const y=new ni(A.geometry,new Sn({vertexColors:!0}),32);return y.castShadow=!0,y.count=0,y.renderOrder=2,y.frustumCulled=!1,y.instanceMatrix.setUsage(35048),s.add(y),y}),x=new tt,M=new bn,_=new N(0,1,0),D=new N,T=new N(1,1,1);function L(A,y,S,I,z){const B=Math.min(I,m.length-1),Y=p[B];Y.count>=32||(M.setFromAxisAngle(_,z),Y.setMatrixAt(Y.count++,x.compose(D.set(A,y*r,S),M,T)))}return{loadModels(A,y){A.load(y+"conveyor_parts.glb",S=>{const I=F=>{const q=S.scene.getObjectByName(F);return q&&q.position.set(0,0,0),q},z=I("Section"),B=I("End"),Y=I("Leg");if(!z||!B||!Y)return;const re=(F,q,G,he,J,$,ve)=>{const Le=new ct,ie=F.clone();ie.traverse(pe=>{pe.isMesh&&(pe.castShadow=!0,pe.receiveShadow=!0)}),Le.add(ie),Le.scale.set(1.69*J,1.69*$/r,1.69),Le.position.set(q,G,he),ve&&(Le.rotation.y=ve),e.add(Le)};v.forEach(F=>{const q=Math.min(F.x1,F.x2),G=Math.max(F.x1,F.x2),he=G-q,J=Math.max(1,Math.round(he)),$=F.floor+F.height;for(let Le=0;Le<J;Le++)re(z,q+(Le+.5)*he/J,$,F.z,he/J,1);re(B,G,$,F.z,1,1),re(B,q,$,F.z,1,1,Math.PI),[q+.25,G-.25].concat(he>5?[(q+G)/2]:[]).forEach(Le=>re(Y,Le,F.floor,F.z,1,(F.height-.18)/.87))}),b.visible=!1},void 0,S=>console.warn("3D map: could not load conveyor_parts.glb",S)),A.load(y+"cargo_items.glb",S=>{S.scene.updateMatrixWorld(!0),m.forEach((I,z)=>{const B=S.scene.getObjectByName("Cargo"+z);if(!B)return;const Y=B.matrixWorld.clone().invert().premultiply(new tt().makeScale(1.69,1.69,1.69)),re=[];if(B.traverse(q=>{if(!q.isMesh)return;const G=q.geometry.clone().applyMatrix4(new tt().multiplyMatrices(Y,q.matrixWorld)),he=q.material.color,J=G.attributes.position.count,$=new Float32Array(J*3);for(let ve=0;ve<J;ve++)$[ve*3]=he.r,$[ve*3+1]=he.g,$[ve*3+2]=he.b;G.setAttribute("color",new $t($,3)),Object.keys(G.attributes).forEach(ve=>{["position","normal","color"].includes(ve)||G.deleteAttribute(ve)}),re.push(G.index?G.toNonIndexed():G)}),!re.length)return;const F=Di(re);F.computeBoundingBox(),p[z].geometry.dispose(),p[z].geometry=F,I.geometry=F,I.height=F.boundingBox.max.y})},void 0,S=>console.warn("3D map: could not load cargo_items.glb",S))},update({odo:A,running:y},S={}){p.forEach(I=>{I.count=0}),f.forEach(({tube:I,segments:z,total:B,parts:Y})=>{const re=!I.fixture||!!S[I.fixture];if(Y.forEach($=>{$.visible=re}),!re)return;const F=I.window?I.window.total:B,q=I.window?I.window.offset:0,G=Math.max(2,Math.round(F/t.gap)),he=F/G,J=y[I.stage]?A:0;for(let $=0;$<G;$++){let ve=(J+$*he)%F-q;if(!(ve<0||ve>=B))for(const Le of z){if(ve>Le.len){ve-=Le.len;continue}const ie=l(Le.a,Le.b,ve/Le.len);L(ie[0],ie[1]-m[I.cargoStage].height/2/r,ie[2],I.cargoStage,$*2.1);break}}}),v.forEach(I=>{const z=Math.abs(I.x2-I.x1),B=Math.max(2,Math.round(z/t.gap)),Y=y[I.stage]?A:0,re=Math.sign(I.x2-I.x1);for(let F=0;F<B;F++)L(I.x1+re*((Y+F*z/B)%z),I.floor+I.height+.02,I.z,I.stage,F*2.1)}),p.forEach(I=>{I.instanceMatrix.needsUpdate=!0})}}}function b_(){const s=[],e=(a,o,c=0,l=0,u=0,{sx:h=1,sy:d=1,sz:f=1,rx:b=0,ry:v=0,rz:m=0}={})=>{const p=a.index?a.toNonIndexed():a;p.deleteAttribute("uv"),p.scale(h,d,f),p.rotateX(b),p.rotateZ(m),p.rotateY(v),p.translate(c,l,u);const x=new nt(o),M=p.attributes.position.count,_=new Float32Array(M*3);for(let D=0;D<M;D++)_[D*3]=x.r,_[D*3+1]=x.g,_[D*3+2]=x.b;p.setAttribute("color",new $t(_,3)),s.push(p)},t=()=>{const a=Di(s.splice(0));return a.computeBoundingBox(),{geometry:a,height:a.boundingBox.max.y}},n=(a,o,c,l,u,h=.5)=>e(new di(1,7,4),a,Math.cos(o)*c,l,-Math.sin(o)*c,{sx:u,sy:u*.16,sz:u*.38,rz:h,ry:o}),i=(a,o)=>{e(new hn(a,a*.78,o,12),"#b8673f",0,o/2),e(new hn(a*1.08,a*1.08,o*.18,12),"#c97a50",0,o*.91),e(new hn(a*.92,a*.92,.012,12),"#4a3424",0,o*.97)},r=[];return i(.1,.13),e(new hn(.012,.014,.14,5),"#5b8a3c",0,.2),[[0,.22],[Math.PI,.23],[Math.PI/2,.28],[-Math.PI/2,.29]].forEach(([a,o],c)=>n(c<2?"#7fb552":"#a6d073",a,.06,o,.065)),r.push(t()),i(.12,.15),e(new hn(.016,.02,.34,6),"#4f7a35",0,.32),[.24,.32,.4].forEach((a,o)=>{for(let c=0;c<5;c++){const l=c*1.257+o*.6,u=.1-o*.02;n(o%2?"#4f8a3a":"#3f7a33",l,u,a,.1-o*.015,.35)}}),[[0,.47,0,.07],[.07,.4,.03,.05],[-.06,.41,-.04,.05]].forEach(([a,o,c,l])=>{e(new ui(l,1),"#9fc06c",a,o,c,{sy:1.7}),e(new ui(l*.45,0),"#d99a55",a+l*.4,o+l*.5,c+l*.3)}),r.push(t()),e(new on(.42,.03,.3),"#c9a46a",0,.015),[[-.1,.04,"#86a85c"],[.1,-.03,"#7a9c52"],[0,.02,"#93b465"]].forEach(([a,o,c],l)=>{const u=l===2?.095:.085,h=.03+u*1.1+(l===2?.04:0);e(new ui(u,1),c,a,h,o,{sy:1.25,ry:l}),e(new ui(u*.3,0),"#d68f4a",a+u*.55,h+u*.4,o+u*.4),e(new ui(u*.25,0),"#e0a560",a-u*.4,h+u*.7,o-u*.5)}),r.push(t()),e(new hn(.13,.13,.3,14),"#a9cdb3",0,.15),e(new hn(.14,.14,.07,14),"#d2b25e",0,.335),e(new on(.14,.12,.02),"#f3efda",0,.14,.125),r.push(t()),e(new on(.32,.38,.2),"#d9bd88",0,.19),e(new on(.33,.05,.21),"#bf9f68",0,.36),[-.06,.06].forEach(a=>e(new ja(.07,.01,5,10,Math.PI),"#8a6e44",0,.385,a)),e(new on(.16,.14,.01),"#496f50",0,.2,.101),e(new on(.06,.06,.01),"#e7dcbc",0,.2,.106),r.push(t()),e(new on(.38,.26,.3),"#c49a5e",0,.13),e(new on(.08,.012,.31),"#e6d6ad",0,.262),[-1,1].forEach(a=>e(new on(.08,.12,.01),"#e6d6ad",0,.2,a*.151)),e(new on(.12,.09,.01),"#496f50",.1,.13,.152),r.push(t()),r}export{__ as createMap3D};
