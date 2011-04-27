package("org.xwidgets.core");

org.xwidgets.core.Button = function() {
  this.control = null;
  this.value = null;

  org.xwidgets.core.Button.prototype = new xw.Widget();
    
  org.xwidgets.core.Button.prototype.render = function(container) {
     if (this.control == null) {
       this.control = document.createElement("button");
       this.control.widget = this;
       container.appendChild(this.control);
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
