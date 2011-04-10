Package("xw.controls");

xw.controls.Button = function() {
  this.control = null;
  this.value = null;
  
  xw.controls.Button.prototype.setParent = function(parent) {
    this.parent = parent;
  }
  
  xw.controls.Button.prototype.paint = function() {
     if (this.control == null) {
       this.control = document.createElement("button");
       this.control.widget = this;
       this.parent.appendChild(this.control);
       var text = document.createTextNode(this.value);
       this.control.appendChild(text);       
       
       if (!xw.Sys.isUndefined(this.events)) {        
         if (!xw.Sys.isUndefined(this.events.onclick)) {
           var events = this.events;
           var sender = this;
           var action = function() {
             events.onclick.invoke(sender);
           };
           xw.Sys.chainEvent(this.control, "click", action);
         }
       }
     }    
  }
}
