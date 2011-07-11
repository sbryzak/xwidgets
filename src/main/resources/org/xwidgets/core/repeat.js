package("org.xwidgets.core");

org.xwidgets.core.Surrogate = function() {
  xw.NonVisual.call(this);
};

org.xwidgets.core.Surrogate.prototype = new xw.NonVisual();

org.xwidgets.core.Repeat = function() {
  xw.Visual.call(this);
  this._className = "org.xwidgets.core.Repeat";
  this.registerProperty("value", null); 
  this.registerProperty("var", null);
  this.container = null;
  this.currentItem = null;
  this.surrogates = null;
};

org.xwidgets.core.Repeat.prototype = new xw.Visual();
  
org.xwidgets.core.Repeat.prototype.render = function(container) {
  this.container = container;
  this.renderChildren();
};

org.xwidgets.core.Repeat.prototype.renderChildren = function() {
  if (this.value != null) {
    this.surrogates = [];  

    for (var i = 0; i < this.value.length; i++) {
      this.currentItem = this.value[i];
            
      var surrogate = new org.xwidgets.core.Surrogate();
      surrogate.parent = this;
      this.surrogates.push(surrogate);
      
      for (var j = 0; j < this.children.length; j++) {
        var clone = this.children[j].clone(surrogate);
        surrogate.children.push(clone);

        clone.render(this.container);
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


