package("org.xwidgets.core");

org.xwidgets.core.InputSearch = function() {
  xw.Visual.call(this);
  this._className = "org.xwidgets.core.InputSearch"; 
  this.registerProperty("value", null);
  this.registerProperty("styleClass", "");
  this.registerEvent("onsearch", null);
  this.control = null;
};

org.xwidgets.core.InputSearch.prototype = new xw.Visual();
   
org.xwidgets.core.InputSearch.prototype.render = function(container) {
  if (this.control == null) {
    
    var that = this;

    this.control = document.createElement("input");    
    this.control.type = "text";
    this.control.className = this.styleClass;
    if (this.value != null) {
      this.control.value = this.value;
    }
    
    var that = this;
    this.control.onkeypress = function() {
      that.checkEnter(event);
    };
    
    var inp = document.createElement("input");
    inp.type = "submit";
    inp.style.display = "none";
    
    container.appendChild(this.control);
  }    
};

org.xwidgets.core.InputSearch.prototype.checkEnter = function(event) {
  var key;
  if (window.event) {
    key = window.event.keyCode;
  } else if (event) {
    key = event.which;
  }
  
  if (key == 13) {
    if (xw.Sys.isDefined(this.onsearch)) {
      this.onsearch.invoke();
    }
  }
};

org.xwidgets.core.InputSearch.prototype.getValue = function() {
  return this.control.value;
};

org.xwidgets.core.InputSearch.prototype.setValue = function(value) {
  this.value = value;
  if (this.control != null) {
    this.control.value = this.value;
  }
};

org.xwidgets.core.InputSearch.prototype.toString = function() {
  return "org.xwidgets.core.InputSearch[" + this.id + "]";
};
