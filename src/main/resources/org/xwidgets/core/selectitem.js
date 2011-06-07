package("org.xwidgets.core");

org.xwidgets.core.SelectItem = function() {
  xw.Widget.call(this);
  this.registerProperty("text", null);
  this.registerProperty("value", null);
  this.control = null;
  this.select = null;
};

org.xwidgets.core.SelectItem.prototype = new xw.Widget();
  
org.xwidgets.core.SelectItem.prototype.render = function(container) {
  if (this.control == null) {  
    this.select = container;
    this.control = document.createElement("option");
    this.control.text = this.text;
    this.control.value = this.value;
    this.select.add(this.control, null);
  }       
};
  
