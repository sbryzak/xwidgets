package("org.xwidgets.core");

org.xwidgets.core.InputText = function() {
  xw.Visual.call(this);
  this.registerProperty("value", null);
  this.control = null;
};

org.xwidgets.core.InputText.prototype = new xw.Visual();
   
org.xwidgets.core.InputText.prototype.render = function(container) {
   if (this.control == null) {
     this.control = document.createElement("input");
     this.control.type = "text";
     container.appendChild(this.control);
   }    
};

org.xwidgets.core.InputText.prototype.getValue = function() {
  return this.control.value;
};

org.xwidgets.core.InputText.prototype.toString = function() {
  return "org.xwidgets.core.InputText[" + this.id + "]";
};
