package("org.xwidgets.core");

org.xwidgets.core.InputSecret = function() {
  xw.Visual.call(this);
  this._className = "org.xwidgets.core.InputSecret"; 
  this.registerProperty("value", null);
  this.registerProperty("styleClass", "");
  this.control = null;
};

org.xwidgets.core.InputSecret.prototype = new xw.Visual();
   
org.xwidgets.core.InputSecret.prototype.render = function(container) {
  if (this.control == null) {
    this.control = document.createElement("input");
    this.control.type = "password";
    this.control.className = this.styleClass;
    container.appendChild(this.control);
  }    
};

org.xwidgets.core.InputSecret.prototype.getValue = function() {
  return this.control.value;
};

org.xwidgets.core.InputSecret.prototype.toString = function() {
  return "org.xwidgets.core.InputSecret[" + this.id + "]";
};
