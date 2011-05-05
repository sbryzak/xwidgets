package("org.xwidgets.core");

org.xwidgets.core.Button = function() {
  xw.Widget.call(this);
  this.control = null;
  this.registerProperty("label", null);
  this.registerEvent("onclick", null);
};

org.xwidgets.core.Button.prototype = new xw.Widget();
   
org.xwidgets.core.Button.prototype.render = function(container) {
   if (this.control == null) {
     this.control = document.createElement("button");
     container.appendChild(this.control);
     this.control.appendChild(document.createTextNode(this.label));
     this.addEvent(this.control, "click", this.onclick);
   }    
};
