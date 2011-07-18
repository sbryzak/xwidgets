package("org.xwidgets.core");

org.xwidgets.core.Button = function() {
  xw.Visual.call(this);
  this._className = "org.xwidgets.core.Button";  
  this.registerProperty("label", "");
  this.registerProperty("styleClass", null);
  this.registerEvent("onclick", null);
  
  this.control = null;
  this.textNode = null;  
};

org.xwidgets.core.Button.prototype = new xw.Visual();
   
org.xwidgets.core.Button.prototype.render = function(container) {
   if (this.control == null) {
     this.control = document.createElement("button");
     var span = document.createElement("span");
     span.appendChild(document.createTextNode(this.label === null ? "" : this.label));
     this.control.appendChild(span);
     this.control.className = this.styleClass;
     container.appendChild(this.control);
     this.addEvent(this.control, "click", this.onclick);
   }    
};

org.xwidgets.core.Button.prototype.setLabel = function(value) {
  this.label = value;
  if (this.textNode !== null) {
    this.textNode.data = this.label === null ? "" : this.label;
  }
};
