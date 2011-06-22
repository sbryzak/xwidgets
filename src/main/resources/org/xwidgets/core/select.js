package("org.xwidgets.core");

org.xwidgets.core.Select = function() {
  xw.Visual.call(this);
  this.registerProperty("styleClass", "");
  this.control = null;
  this.objectValues = [];
};

org.xwidgets.core.Select.prototype = new xw.Visual();
  
org.xwidgets.core.Select.prototype.render = function(container) {
  if (this.control == null) {  
    this.control = document.createElement("select");
    this.control.className = this.styleClass;
    container.appendChild(this.control);  
    
    this.renderChildren(this.control);
  }       
};

org.xwidgets.core.Select.prototype.addItem = function(value, label, obj) {
  var opt = document.createElement("option");
  opt.value = value;
  opt.text = label;
  this.control.add(opt, null);
  this.objectValues.push({value: value, object: obj});
};

org.xwidgets.core.Select.prototype.removeItem = function(value) {
  // TODO implement this 
};

org.xwidgets.core.Select.prototype.getValue = function() {
  return this.control.options[this.control.selectedIndex].value;
};

org.xwidgets.core.Select.prototype.getObjectValue = function() {
  var value = this.getValue();
  for (var i = 0; i < this.objectValues.length; i++) {
    if (this.objectValues[i].value == value) {
      return this.objectValues[i].object;
    }
  }
  return undefined;
};
  
org.xwidgets.core.Select.prototype.toString = function() {
  return "org.xwidgets.core.Select[" + this.id + "]";
};
