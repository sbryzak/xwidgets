package("org.xwidgets.core");

org.xwidgets.core.InputText = function() {
  xw.Widget.call(this);
  this.registerProperty("value", null);
  this.control = null;
};

org.xwidgets.core.InputText.prototype = new xw.Widget();
   
org.xwidgets.core.InputText.prototype.render = function(container) {
   if (this.control == null) {
     this.control = document.createElement("input");
     this.control.type = "text";
     container.appendChild(this.control);
   }    
};
