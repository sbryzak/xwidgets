package("org.xwidgets.core");

org.xwidgets.core.Fragment = function() {
  xw.Visual.call(this);
  this._className = "org.xwidgets.core.Fragment";
  this.registerProperty("rendered", true);
  
  this.childrenRendered = false;
  this.control = null;
};

org.xwidgets.core.Fragment.prototype = new xw.Visual();
   
org.xwidgets.core.Fragment.prototype.render = function(container) {
   if (this.control == null) {
     this.control = document.createElement("span");
     container.appendChild(this.control);
     this.doRender();
   }    
};

org.xwidgets.core.Fragment.prototype.doRender = function() {
  if (this.control === null) return;
  
  if (this.rendered === true) {
    if (!this.childrenRendered) {
      this.renderChildren(this.control);
      this.childrenRendered = true;      
    }
    this.control.style.display = "";
  } else {
    this.control.style.display = "none";
  }
};

org.xwidgets.core.Fragment.prototype.setRendered = function(rendered) {
  if (xw.EL.isExpression(rendered)) {
    this.rendered = xw.EL.createBinding(this, "rendered", rendered) === true;
  } else {
    this.rendered = rendered;
  }
  
  this.doRender();
};
