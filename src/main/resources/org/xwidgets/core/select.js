package("org.xwidgets.core");

org.xwidgets.core.Select = function() {
  xw.Widget.call(this);
  this.registerProperty("styleClass", "");
  this.control = null;
};

org.xwidgets.core.Select.prototype = new xw.Widget();
  
org.xwidgets.core.Select.prototype.render = function(container) {
  if (this.control == null) {  
    this.control = document.createElement("select");
    this.control.className = this.styleClass;
    container.appendChild(this.control);  
    
    this.renderChildren(this.control);
  }       
};
  
