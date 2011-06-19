package("org.xwidgets.core");

org.xwidgets.core.Button = function() {
  xw.Visual.call(this);
  this.control = null;
  this.registerProperty("label", null);
  this.registerProperty("styleClass", null);
  this.registerEvent("onclick", null);
};

org.xwidgets.core.Button.prototype = new xw.Visual();
   
org.xwidgets.core.Button.prototype.render = function(container) {
   if (this.control == null) {
     this.control = document.createElement("button");
     var span = document.createElement("span");
     span.appendChild(document.createTextNode(this.label));
     this.control.appendChild(span);
     this.control.className = this.styleClass;
     container.appendChild(this.control);
     this.addEvent(this.control, "click", this.onclick);
   }    
};
