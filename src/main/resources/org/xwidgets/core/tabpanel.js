package("org.xwidgets.core");

org.xwidgets.core.Tab = function() {
  xw.Widget.call(this);
  this.container = null;
};

org.xwidgets.core.Tab.prototype = new xw.Widget();

org.xwidgets.core.Tab.prototype.render = function(container) {
  if (this.container == null) {
    this.container = container;
    this.renderChildren(this.container);
  }
};

org.xwidgets.core.TabPanel = function() {
  xw.Widget.call(this);
  this.registerProperty("styleClass", "");
  this.control = null;
  this.childContainers = [];
  this.activeTabIndex = 0;
};

org.xwidgets.core.TabPanel.prototype = new xw.Widget();
  
org.xwidgets.core.TabPanel.prototype.render = function(container) {
  if (this.control == null) {  
    this.control = document.createElement("div");
    this.control.className = this.styleClass;

    for (var i = 0; i < this.children.length; i++) {
      this.childContainers[i] = document.createElement("div");
      this.childContainers[i].style.display = (i === 0 ? "block" : "none");
      this.children[i].render(this.childContainers[i]);    
      this.control.appendChild(this.childContainers[i]);
    }
    
    container.appendChild(this.control);  
  }       
};

org.xwidgets.core.TabPanel.prototype.next = function() {
  if (this.activeTabIndex < this.childContainers.length - 1) {
    this.setActiveTab(this.activeTabIndex + 1);
  }
};
  
org.xwidgets.core.TabPanel.prototype.previous = function() {
  if (this.activeTabIndex > 0) {
    this.setActiveTab(this.activeTabIndex - 1);
  }
};  

org.xwidgets.core.TabPanel.prototype.setActiveTab = function(idx) {
  if (idx != this.activeTabIndex && idx >= 0 && idx < this.childContainers.length) {
    this.childContainers[this.activeTabIndex].style.display = "none";
    this.childContainers[idx].style.display = "block";
    this.activeTabIndex = idx;
  }
};
  
