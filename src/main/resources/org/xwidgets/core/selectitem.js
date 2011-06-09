package("org.xwidgets.core");

org.xwidgets.core.SelectItem = function() {
  xw.Widget.call(this);
  this.registerProperty("itemValue", null);
  this.registerProperty("itemLabel", null);
  this.rendered = false;
};

org.xwidgets.core.SelectItem.prototype = new xw.Widget();
  
org.xwidgets.core.SelectItem.prototype.render = function() { 
  if (!this.rendered) {
    this.parent.addItem(this.itemValue, this.itemLabel);
    this.rendered = true;
  }
};
  
