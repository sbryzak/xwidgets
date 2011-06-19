package("org.xwidgets.core");

org.xwidgets.core.Label = function() {
  xw.Visual.call(this);
  this.registerProperty("value", "");
  this.control = null;
};

org.xwidgets.core.Label.prototype = new xw.Visual();
  
org.xwidgets.core.Label.prototype.render = function(container) {
  if (this.control == null) {
    var s = document.createElement("span");
    this.control = document.createTextNode(this.value);
    s.appendChild(this.control);
    container.appendChild(s);
  }       
};
  
org.xwidgets.core.Label.prototype.setValue = function(value) {
  this.value = value;
  if (this.control) this.control.data = value;
};

