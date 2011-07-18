package("org.xwidgets.core");

org.xwidgets.core.Radio = function() {
  xw.Visual.call(this);
  this._className = "org.xwidgets.core.Radio"; 
  this.registerProperty("styleClass", "");
  this.registerProperty("orientation", "horizontal");
  this.registerProperty("labelPosition", "left");
  this.control = null;
  this.name = null;
  this.controls = [];
};

org.xwidgets.core.Radio.prototype = new xw.Visual();
  
org.xwidgets.core.Radio.prototype.render = function(container) {
  if (this.control == null) {
    this.name = this.id === null ? "radio_" + xw.Sys.uid() : this.id + "_radio";
    this.control = document.createElement("div");
    container.appendChild(this.control);
    
    this.renderChildren();
  }
};

org.xwidgets.core.Radio.prototype.addItem = function(value, label) {
  var inp = document.createElement("input");
  var id = "radio_" + xw.Sys.uid();
  inp.id = id;
  inp.type = "radio";
  inp.name = this.name;
  inp.value = value;  
  inp.className = this.styleClass;
  
  // Select the first option
  if (this.controls.length == 0) {
    inp.checked = true;
  }
  
  var lbl = document.createElement("label");
  lbl.htmlFor = id;
  lbl.appendChild(document.createTextNode(label));
  
  if (this.orientation === "horizontal") {
    var div = document.createElement("div");
    div.appendChild(inp);
    div.appendChild(lbl);
    this.control.appendChild(div);
  } else {  
    this.control.appendChild(inp);
    this.control.appendChild(lbl);
  }
  
  this.controls.push(inp);
};

org.xwidgets.core.Radio.prototype.getValue = function() {
  for (var i = 0; i < this.controls.length; i++) {
    if (this.controls[i].checked) {
      return this.controls[i].value;
    }
  }
};

