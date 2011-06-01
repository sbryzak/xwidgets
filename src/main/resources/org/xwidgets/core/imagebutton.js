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
     this.control = document.createElement("a");
     this.control.href = "#";
     if (!xw.Sys.isUndefined(this.image)) {
       var img = document.createElement("img");
       img.src = this.image;
       this.control.appendChild(img);
     } 
     if (!xw.Sys.isUndefined(this.styleClass)) {
       this.control.appendChild(document.createTextNode(" a "));
       this.control.className = this.styleClass;
     }

     container.appendChild(this.control);
     this.addEvent(this.control, "click", this.onclick);
   }    
};
