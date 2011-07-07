package("org.xwidgets.core");

org.xwidgets.core.Repeat = function() {
  xw.Visual.call(this);
  this.registerProperty("value", null); 
  this.registerProperty("var", null);
  this.container = null;
  this.currentItem = null;
};

org.xwidgets.core.Repeat.prototype = new xw.Visual();
  
org.xwidgets.core.Repeat.prototype.render = function(container) {
  this.container = container;
  this.renderChildren();
};

org.xwidgets.core.Repeat.prototype.renderChildren = function() {
  if (this.value != null) {
    // TODO clone the children
    for (var i = 0; i < this.value.length; i++) {
      this.currentItem = this.value[i];
      
      for (var j = 0; j < this.children.length; j++) {
        this.children[j].render(this.container);
      }
    }
  }
};

org.xwidgets.core.Repeat.prototype.resolve = function(name) {
  if (name == this.var) {
    return this.currentItem;
  }
};

org.xwidgets.core.Repeat.prototype.setValue = function(value) {
  if (xw.EL.isExpression(value)) {
    xw.EL.createBinding(this, "value", value);
  } else {
    this.value = value;
    this.renderChildren();
  }
};


