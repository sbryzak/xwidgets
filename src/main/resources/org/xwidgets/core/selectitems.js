package("org.xwidgets.core");

org.xwidgets.core.SelectItems = function() {
  xw.Visual.call(this);
  this.registerProperty("dataSource", null); 
  this.registerProperty("var", null);
  this.registerProperty("itemValue", null);
  this.registerProperty("itemLabel", null);
};

org.xwidgets.core.SelectItems.prototype = new xw.Visual();
  
org.xwidgets.core.SelectItems.prototype.render = function() {
  if (this.datasource !== null) {  
    this.dataSource.subscribe(this);
    this.renderOptions();
  }       
};

org.xwidgets.core.SelectItems.prototype.renderOptions = function() {
  if (this.dataSource.dataSet.isActive()) {
    for (var i = 0; i < this.dataSource.dataSet.values.length; i++) {
      var value = this.dataSource.dataSet.values[i];
      
      var locals = {}
      locals[this["var"]] = value;
      this.parent.addItem(xw.EL.eval(this.view, this.itemValue, locals), xw.EL.eval(this.view, this.itemLabel, locals));
    }
  }
};

org.xwidgets.core.SelectItems.prototype.notify = function() {
  this.renderOptions();
};
  
