package("org.xwidgets.core");

org.xwidgets.core.SelectItems = function() {
  xw.Widget.call(this);
  this.registerProperty("datasource", null); 
  this.registerProperty("var", null);
  this.registerProperty("itemValue", null);
  this.registerProperty("itemLabel", null);
  this.controls = null;
  this.select = null;
};

org.xwidgets.core.SelectItems.prototype = new xw.Widget();
  
org.xwidgets.core.SelectItems.prototype.render = function(container) {
  if (this.controls == null && this.datasource !== null) {  
    this.select = container;
    this.renderOptions();
  }       
};

org.xwidgets.core.SelectItems.prototype.renderOptions = function() {
  if (this.datasource.isActive()) {
    for (var i = 0; i < this.datasource.values().length; i++) {

      this.control = document.createElement("option");
      this.control.text = this.text;
      this.control.value = this.value;
      this.select.add(this.control, null);
    }
  } else {
    this.clear();
  }
};

org.xwidgets.core.SelectItems.prototype.clear = function() {
  this.select.options.length = 0;
  this.controls.length = 0;
};

org.xwidgets.core.SelectItems.prototype.notify = function() {
  this.renderOptions();
};
  
