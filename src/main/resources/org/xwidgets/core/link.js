package("org.xwidgets.core");

org.xwidgets.core.Link = function() {
  xw.Widget.call(this);
  this.registerProperty("caption", "");
  this.registerProperty("className", "");
  this.control = null;
};

org.xwidgets.core.Link.prototype = new xw.Widget();
  
org.xwidgets.core.Link.prototype.render = function(container) {
  if (this.control == null) {  
    this.control = document.createElement("a");
    this.control.className = this.className;
    this.control.appendChild(document.createTextNode(this.caption));
    this.control.href = "#";
    container.appendChild(this.control);  
  }       
};
  
