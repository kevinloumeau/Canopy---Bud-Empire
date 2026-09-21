// Quiet DOM: the UI is refreshed every 250ms by writing every label, badge and attribute again, and measured on a
// developed shop that was about 1,900 nodes recreated and 1,900 attributes rewritten per second with nothing visible
// changing. These guards skip a write only when the result would be identical, so the render code stays as it is
// while idle frames stop invalidating style and layout. Everything else about the DOM behaves normally.
export function installQuietDom(){
 if(typeof Element==='undefined'||Element.prototype.__quiet)return;
 const element=Element.prototype,html=typeof HTMLElement!=='undefined'?HTMLElement.prototype:null;
 const define=(proto,name,make)=>{const d=proto&&Object.getOwnPropertyDescriptor(proto,name);if(!d||!d.set)return;Object.defineProperty(proto,name,{configurable:true,enumerable:d.enumerable,get:d.get,set:make(d.set,d.get)})};
 const same=(setter,getter)=>function(value){if(getter.call(this)!==value)setter.call(this,value)};

 const setAttribute=element.setAttribute;
 element.setAttribute=function(name,value){value=String(value);if(this.getAttribute(name)!==value)setAttribute.call(this,name,value)};

 // textContent: skip when the node already holds exactly that one text node (or is empty and stays empty).
 define(Node.prototype,'textContent',set=>function(value){if(this.nodeType!==1)return set.call(this,value);value=value==null?'':String(value);const first=this.firstChild;
  if(first?(first.nodeType===3&&!first.nextSibling&&first.data===value):value==='')return;set.call(this,value)});

 // innerHTML: skip when the current serialisation already equals the markup, unless live form state could hide behind it.
 define(element,'innerHTML',(set,get)=>function(value){value=String(value);
  if(this.firstChild&&get.call(this)===value&&!this.querySelector('input,select,textarea,progress,canvas'))return;set.call(this,value)});

 if(html){['hidden','title','className'].forEach(name=>define(name==='className'?element:html,name,same));}
 if(typeof HTMLButtonElement!=='undefined')define(HTMLButtonElement.prototype,'disabled',same);
 if(typeof HTMLProgressElement!=='undefined')define(HTMLProgressElement.prototype,'value',same);
 if(typeof CSSStyleDeclaration!=='undefined'){const setProperty=CSSStyleDeclaration.prototype.setProperty;
  CSSStyleDeclaration.prototype.setProperty=function(name,value,priority){value=String(value);
   if(this.getPropertyValue(name)===value&&this.getPropertyPriority(name)===(priority||''))return;setProperty.call(this,name,value,priority)}}
 element.__quiet=true;
}
