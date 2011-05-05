package("org.xwidgets.core");

org.xwidgets.core.ImageButton = function() {
  xw.Widget.call(this);
  this.control = null;
  this.registerProperty("image");
  this.registerProperty("styleClass");
  this.registerEvent("onclick");
};

org.xwidgets.core.ImageButton.prototype = new xw.Widget();
   
org.xwidgets.core.ImageButton.prototype.render = function(container) {
   if (this.control == null) {
     this.control = document.createElement("button");
     container.appendChild(this.control);
     this.addEvent(this.control, "click", this.onclick);
   }    
};
