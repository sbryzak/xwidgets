package("org.xwidgets.core");

org.xwidgets.core.Link = function() {
  xw.Visual.call(this);
  this._className = "org.xwidgets.core.Link"; 
  this.registerProperty("caption", "");
  this.registerProperty("styleClass", "");
  this.registerEvent("onclick", null);
  this.control = null;
};

org.xwidgets.core.Link.prototype = new xw.Visual();
  
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
  
