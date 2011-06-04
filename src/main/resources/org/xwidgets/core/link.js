package("org.xwidgets.core");

org.xwidgets.core.Link = function() {
  xw.Widget.call(this);
  this.registerProperty("caption", "");
  this.registerProperty("styleClass", "");
  this.registerEvent("onclick", null);
  this.control = null;
};

org.xwidgets.core.Link.prototype = new xw.Widget();
  
org.xwidgets.core.Link.prototype.render = function(container) {
  if (this.control == null) {  
    this.control = document.createElement("a");
    this.control.className = this.styleClass;
    this.control.appendChild(document.createTextNode(this.caption));
    this.control.href = "#";
    this.addEvent(this.control, "click", this.onclick);    
    container.appendChild(this.control);  
  }       
};
  
