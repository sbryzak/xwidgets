Package("xw.controls");

xw.controls.Label = function()
{
  this.value = "";
  this.parent = null;
  this.control = null;
  
  xw.controls.Label.prototype.setParent = function(parent)
  {
    this.parent = parent;
  }
  
  xw.controls.Label.prototype.paint = function(layout)
  {
    if (this.control == null)
    {
      this.control = document.createTextNode(this.value);
      // IE doesn't support setting random properties on text nodes
      // this.control.widget = this;
      this.parent.appendChild(this.control);
    }       
  }
}
