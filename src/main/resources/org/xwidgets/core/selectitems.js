package("org.xwidgets.core");

org.xwidgets.core.SelectItems = function() {
  xw.Visual.call(this);
  this.registerProperty("value", null); 
  this.registerProperty("var", null);
  this.registerProperty("itemValue", null);
  this.registerProperty("itemLabel", null);
};

org.xwidgets.core.SelectItems.prototype = new xw.Visual();
  
org.xwidgets.core.SelectItems.prototype.render = function() {
  this.renderOptions();
};

org.xwidgets.core.SelectItems.prototype.renderOptions = function() {
  if (this.value != null) {
    for (var i = 0; i < this.value.length; i++) {     
      var locals = {}
      locals[this["var"]] = this.value[i];
      this.parent.addItem(xw.EL.eval(this.view, this.itemValue, locals), 
        xw.EL.eval(this.view, this.itemLabel, locals), this.value[i]);
    }
  }
};

org.xwidgets.core.SelectItems.prototype.setValue = function(value) {
  if (xw.EL.isExpression(value)) {
    xw.EL.createBinding(this, "value", value);
  } else {
    this.value = value;
    this.renderOptions();
  }
};

