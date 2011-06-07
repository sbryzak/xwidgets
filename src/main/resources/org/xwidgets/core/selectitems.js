package("org.xwidgets.core");

org.xwidgets.core.SelectItems = function() {
  xw.Widget.call(this);
  this.registerProperty("dataSource", null); 
  this.registerProperty("var", null);
  this.registerProperty("itemValue", null);
  this.registerProperty("itemLabel", null);
  
  // The select control that the items belong to
  this.select = null;
  this.controls = null;
};

org.xwidgets.core.SelectItems.prototype = new xw.Widget();
  
org.xwidgets.core.SelectItems.prototype.render = function(container) {
  if (this.controls == null && this.datasource !== null) {  
    this.dataSource.subscribe(this);
    this.select = container;
    this.renderOptions();
  }       
};

org.xwidgets.core.SelectItems.prototype.renderOptions = function() {
  if (this.dataSource.isActive()) {
    for (var i = 0; i < this.dataSource.dataSet.values.length; i++) {
      var value = this.dataSource.dataSet.values[i];
      
      this.control = document.createElement("option");      
      var locals = {};
      locals[this["var"]] = value;
      
      this.control.value = xw.EL.eval(this.view, this.itemValue, locals);
      this.control.text = xw.EL.eval(this.view, this.itemLabel, locals);
      this.select.add(this.control, null);
    }
  } else {
    this.clear();
  }
};

org.xwidgets.core.SelectItems.prototype.clear = function() {
  this.select.options.length = 0;
  if (this.controls != null) {
    this.controls.length = 0;
  }
};

org.xwidgets.core.SelectItems.prototype.notify = function() {
  this.renderOptions();
};
  
