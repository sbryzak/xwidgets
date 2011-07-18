package("org.xwidgets.core");

org.xwidgets.core.Panel = function() {
  xw.Container.call(this);
  this._className = "org.xwidgets.core.Panel"; 
  this.width = 200;
  this.height = 100; 
  
  // the outer div
  this.control = null;
  
  // the inner div
  this.inner = null;
  
  this.align = null;
};
  
org.xwidgets.core.Panel.prototype = new xw.Container();

org.xwidgets.core.Panel.prototype.setAlign = function(align) {
  this.align = align;
};

org.xwidgets.core.Panel.prototype.setWidth = function(width) {
  this.width = width;
};

org.xwidgets.core.Panel.prototype.setHeight = function(height) {
  this.height = height;
};

//
// Render the panel
// 
org.xwidgets.core.Panel.prototype.render = function(container) {
  if (this.control == null) {
    this.control = document.createElement("div");
    this.control.widget = this;              
    this.control.style.backgroundColor = "#ece9d6";
     
    // TODO make the border more configurable (or allow it to be turned off etc)
    this.control.style.borderTop = "1px solid white";
    this.control.style.borderLeft = "1px solid white";
    this.control.style.borderBottom = "1px solid #555555";
    this.control.style.borderRight = "1px solid #555555";
    
    this.control.style.padding = "0px";
    this.control.style.margin = "0px";
     
    if (this.parent.layout != null) {
      var bounds = this.parent.layout.getBounds(this);
      if (bounds != null) this.applyBounds(bounds);
    } else {
      this.control.style.width = this.width;
      this.control.style.height = this.height;         
      this.control.style.display = "inline";
    }

    container.appendChild(this.control);
  }    
      
  if (this.inner == null) {
    this.inner = document.createElement("div");
    this.inner.widget = this;
    this.inner.style.width = "100%";
    this.inner.style.height = "100%";
    this.inner.style.position = "relative";
    this.inner.style.border = "0px";    
    container.appendChild(this.inner);      
  }
   
   // FIXME
  // Create the appropriate layout manager and layout the child controls
  //if (this.layoutManager == null && this.layout != null) {
//    this.layoutManager = new xw.layoutManagers[this.layout](this);  
  //} else {
    this.layoutManager = new xw.BorderLayout(this);
  //}
    
  this.layoutManager.calculateLayout(this.children);
  
  this.renderChildren(this.inner);
};  

org.xwidgets.core.Panel.prototype.appendChild = function(child) {
  this.inner.appendChild(child);
};

org.xwidgets.core.Panel.prototype.applyBounds = function(bounds) {  
  if (bounds.left != null) this.control.style.left = bounds.left + "px";
  if (bounds.top != null) this.control.style.top = bounds.top + "px";
  
  for (var i in bounds.style) this.control.style[i] = bounds.style[i];

  var b = xw.Sys.getBorder(this.control);
 
  if (bounds.height != null) {
    if (bounds.height.indexOf("%") == -1) {
      this.control.style.height = (bounds.height - b.top - b.bottom) + "px";
    }
    else {
      this.control.style.height = bounds.height;
    }
  }
  
  if (bounds.width != null) {
    if (bounds.width.indexOf("%") == -1) {
      this.control.style.width = (bounds.width - b.left - b.right) + "px";
    }
    else {
      this.control.style.width = bounds.width;
    }
  }
}; 
