package("org.xwidgets.core");

org.xwidgets.core.SelectItems = function() {
  xw.Visual.call(this);
  this.registerProperty("value", null); 
  this.registerProperty("var", null);
  this.registerProperty("itemValue", null);
  this.registerProperty("itemLabel", null);
  this.rendered = false;

  this.currentItem = null;
};

org.xwidgets.core.SelectItems.prototype = new xw.Visual();
  
org.xwidgets.core.SelectItems.prototype.render = function() {
  this.renderOptions();
  this.rendered = true;
};

org.xwidgets.core.SelectItems.prototype.renderOptions = function() {
  if (this.value != null) {
    for (var i = 0; i < this.value.length; i++) {
      this.currentItem = this.value[i];
      this.parent.addItem(xw.EL.eval(this, this.itemValue), 
        xw.EL.eval(this, this.itemLabel), this.value[i]);
    }
  }
};

org.xwidgets.core.SelectItems.prototype.resolve = function(name) {
  if (name == this.var) {
    return this.currentItem;
  }
};

org.xwidgets.core.SelectItems.prototype.setValue = function(value) {
  if (xw.EL.isExpression(value)) {
    xw.EL.createBinding(this, "value", value);
  } else {
    this.value = value;
    if (this.rendered) {
      this.renderOptions();
    }
  }
};

