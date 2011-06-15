package("org.xwidgets.core");

org.xwidgets.core.Tab = function() {
  xw.Widget.call(this);
  this.container = null;
  this.registerProperty("name", null);
  this.registerProperty("enabled", true);
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
  this.registerEvent("beforeScroll");
  this.control = null;
  this.activeTabIndex = 0;
  this.tabs = [];
};

org.xwidgets.core.TabPanel.prototype = new xw.Widget();
  
org.xwidgets.core.TabPanel.prototype.render = function(container) {
  if (this.control == null) {  
    this.control = document.createElement("div");
    this.control.className = this.styleClass;    
    container.appendChild(this.control);  
        
    for (var i = 0; i < this.children.length; i++) {
      var tab = {control: this.children[i], container: document.createElement("div"), };
      this.tabs[i] = tab;
      tab.container.style.display = (i === 0 ? "block" : "none");
      this.control.appendChild(tab.container);      
      this.children[i].render(tab.container);
    }    
  }       
};

org.xwidgets.core.TabPanel.prototype.isTabEnabled = function(idx) {
  return this.tabs[idx].control.enabled;
};

org.xwidgets.core.TabPanel.prototype.setEnabled = function(idx, value) {
  this.tabs[idx].control.enabled = value;
};

org.xwidgets.core.TabPanel.prototype.next = function() {
  if (!xw.Sys.isUndefined(this.beforeScroll)) {
    this.beforeScroll.invoke(this);
  }
  
  if (this.activeTabIndex < this.tabs.length - 1) {
    for (var i = this.activeTabIndex + 1; i < this.tabs.length; i++) {
      if (this.isTabEnabled(i)) {
        this.setActiveTab(i);
        break;
      };
    }
  }
};
  
org.xwidgets.core.TabPanel.prototype.previous = function() {
  if (!xw.Sys.isUndefined(this.beforeScroll)) {
    this.beforeScroll.invoke(this);
  }

  if (this.activeTabIndex > 0) {
    for (var i = this.activeTabIndex - 1; i >= 0; i--) {
      if (this.isTabEnabled(i)) {
        this.setActiveTab(i);
        break;
      }
    }
  }
};  

org.xwidgets.core.TabPanel.prototype.setActiveTab = function(idx) {
  if (typeof idx === "string") {
    for (var i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].control.name == idx) {
        if (this.activeTabIndex === i) return;
        this.tabs[this.activeTabIndex].container.style.display = "none";
        this.tabs[i].container.style.display = "block";
        this.activeTabIndex = i;
        return;
      }    
    }
  } else if (idx != this.activeTabIndex && idx >= 0 && idx < this.tabs.length) {
    this.tabs[this.activeTabIndex].container.style.display = "none";
    this.tabs[idx].container.style.display = "block";
    this.activeTabIndex = idx;
  }
};
  
