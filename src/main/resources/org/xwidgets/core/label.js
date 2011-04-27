package("org.xwidgets.core");

org.xwidgets.core.Label = function() {
  this.value = "";
  this.control = null;
  this.textNode = null;  
};

org.xwidgets.core.Label.prototype = new xw.Widget();
  
org.xwidgets.core.Label.prototype.render = function(container) {
  if (this.control == null) {
    this.control = document.createElement("span");
    this.textNode = document.createTextNode(this.value);
    this.control.appendChild(this.textNode);
    this.control.widget = this;
    container.appendChild(this.control);
  }       
};
  
org.xwidgets.core.Label.prototype.setValue = function(value) {
  this.value = value;
  if (this.textNode) this.textNode.data = value;
};

