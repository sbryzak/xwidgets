Package("xw.controls");

xw.controls.Label = function()
{
  this.value = "";
  this.parent = null;
  this.control = null;
  this.textNode = null;
  
  xw.controls.Label.prototype.setParent = function(parent)
  {
    this.parent = parent;
  }
  
  xw.controls.Label.prototype.paint = function(layout)
  {
    if (this.control == null)
    {
      this.control = document.createElement("span");
      this.textNode = document.createTextNode(this.value);
      this.control.appendChild(this.textNode);
      this.control.widget = this;
      this.parent.appendChild(this.control);
    }       
  }
}
