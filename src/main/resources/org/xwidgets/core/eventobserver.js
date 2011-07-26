package("org.xwidgets.core");

org.xwidgets.core.EventObserver = function() {
  xw.NonVisual.call(this);
  this._className = "org.xwidgets.core.EventObserver";
  this.registerProperty("event", null);
  this.registerEvent("onFire", null);
  
  this.opened = false;
};

org.xwidgets.core.EventObserver.prototype = new xw.NonVisual();
   
org.xwidgets.core.EventObserver.prototype.open = function() {
  if (!this.opened) {
    this.opened = true;
    this.register();
  }
};

org.xwidgets.core.EventObserver.prototype.register = function() {
  if (typeof this.event === "string") {
    xw.Event.registerObserver(this.event, this);
  }
};

org.xwidgets.core.EventObserver.prototype.fire = function(params) {
  if (this.onFire) {
    this.onFire.invoke();
  }; 
};

org.xwidgets.core.EventObserver.prototype.setEvent = function(event) {
  if (typeof this.event === "string" && this.opened) {
    xw.Event.unregisterObserver(this);
  }
  this.event = event;
  
  if (this.opened) {
    this.register();
  }
};
