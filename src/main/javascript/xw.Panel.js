Package("xw.controls");

xw.controls.Panel = function()
{
  this.width = 200;
  this.height = 100; 
  this.parent = null;
  
  // the outer div
  this.control = null;
  
  // the inner div
  this.inner = null;
  
  this.align = null;
  this.layout = null;
  this.layoutManager = null;
    
  xw.controls.Panel.prototype.setParent = function(parent)
  {
    this.parent = parent;
  }
  
  xw.controls.Panel.prototype.setAlign = function(align)
  {
    this.align = align;
  }
  
  xw.controls.Panel.prototype.setWidth = function(width)
  {
    this.width = width;
  }
  
  xw.controls.Panel.prototype.setHeight = function(height)
  {
    this.height = height;
  }
  
  /*
   * Paint the control
   *
   * layout - an overriding layout to use
   *
   */ 
  xw.controls.Panel.prototype.paint = function(layout)
  {
    if (this.control == null)
    {
      this.control = document.createElement("div");
      this.control.widget = this;              
      this.control.style.backgroundColor = "#ece9d6";
       
      // TODO make the border more configurable (or allow it to be turned off etc)
      this.control.style.borderTop = "1px solid white";
      this.control.style.borderLeft = "1px solid white";
      this.control.style.borderBottom = "1px solid #555555";
      this.control.style.borderRight = "1px solid #555555";
      
      this.control.style.padding = "0px";
      this.control.style.margin = "0px";
       
      if (layout != null)
      {
        var bounds = layout.getBounds(this);
        if (bounds != null) this.applyBounds(bounds);
      }
      else
      {
        this.control.style.width = this.width;
        this.control.style.height = this.height;         
        this.control.style.display = "inline";
      }

      this.parent.appendChild(this.control);
    }    
        
    if (this.inner == null)
    {
      this.inner = document.createElement("div");
      this.inner.widget = this;
      this.inner.style.width = "100%";
      this.inner.style.height = "100%";
      this.inner.style.position = "relative";
      this.inner.style.border = "0px";    
      this.control.appendChild(this.inner);      
    }
     
    // Create the appropriate layout manager and layout the child controls
    if (this.layoutManager == null && this.layout != null) 
    {
      this.layoutManager = new xw.layoutManagers[this.layout](this);  
    }
    else
    {
      this.layoutManager = new xw.BorderLayout(this);
    }
      
    this.layoutManager.layout(this);           
  }  
  
  xw.controls.Panel.prototype.appendChild = function(child)
  {
    this.inner.appendChild(child);
  }
  
  // TODO this has *got* to be renamed
  xw.controls.Panel.prototype.getContainingControl = function()
  {
    return this.inner;
  }
  
  xw.controls.Panel.prototype.applyBounds = function(bounds)
  {  
    if (bounds.left != null) this.control.style.left = bounds.left + "px";
    if (bounds.top != null) this.control.style.top = bounds.top + "px";
    
    for (var i in bounds.style) this.control.style[i] = bounds.style[i];
  
    var b = xw.Sys.getBorder(this.control);
   
    if (bounds.height != null) 
    {
      if (bounds.height.indexOf("%") == -1)
      {
        this.control.style.height = (bounds.height - b.top - b.bottom) + "px";
      }
      else
      {
        this.control.style.height = bounds.height;
      }
    }
    
    if (bounds.width != null) 
    {
      if (bounds.width.indexOf("%") == -1)
      {
        this.control.style.width = (bounds.width - b.left - b.right) + "px";
      }
      else
      {
        this.control.style.width = bounds.width;
      }
    }
  }  
}
