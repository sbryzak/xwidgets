package("org.xwidgets.core");

org.xwidgets.core.Tab = function() {
  xw.Visual.call(this);
  this._className = "org.xwidgets.core.Tab"; 
  this.container = null;
  this.registerProperty("name", null);
  this.registerProperty("enabled", true);
};

org.xwidgets.core.Tab.prototype = new xw.Visual();

org.xwidgets.core.Tab.prototype.render = function(container) {
  if (this.container == null) {
    this.container = container;
    this.renderChildren(this.container);
  }
};

org.xwidgets.core.TabPanel = function() {
  xw.Visual.call(this);
  this._className = "org.xwidgets.core.TabPanel"; 
  this.registerProperty("styleClass", "");
  this.registerEvent("beforeScroll");
  this.control = null;
  this.activeTab = null;
  this.tabs = [];
};

org.xwidgets.core.TabPanel.prototype = new xw.Visual();
  
org.xwidgets.core.TabPanel.prototype.render = function(container) {
  if (this.control == null) {  
    this.control = document.createElement("div");
    this.control.className = this.styleClass;    
    container.appendChild(this.control);  
        
    for (var i = 0; i < this.children.length; i++) {
      var tab = {control: this.children[i], container: document.createElement("div"), };
      this.tabs[i] = tab;
      if (i === 0) {
        this.activeTab = tab;
        tab.container.style.display = "block";
      } else {
        tab.container.style.display = "none";
      }

      this.control.appendChild(tab.container);      
      this.children[i].render(tab.container);
    }    
  }       
};

org.xwidgets.core.TabPanel.prototype.isTabEnabled = function(idx) {
  return this.tabs[idx].control.enabled;
};

org.xwidgets.core.TabPanel.prototype.setEnabled = function(idx, value) {
  var tab = (typeof idx === "string") ? this.getTabByName(idx) : this.tabs[idx];
  if (tab != null) tab.control.enabled = value;
};

org.xwidgets.core.TabPanel.prototype.next = function() {
  if (!xw.Sys.isUndefined(this.beforeScroll)) {
    this.beforeScroll.invoke(this);
  }
  
  var idx = this.getActiveTabIndex();
  
  if (idx < this.tabs.length - 1) {
    for (var i = idx + 1; i < this.tabs.length; i++) {
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
  
  var idx = this.getActiveTabIndex();
  
  if (idx > 0) {
    for (var i = idx - 1; i >= 0; i--) {
      if (this.isTabEnabled(i)) {
        this.setActiveTab(i);
        break;
      }
    }
  }
};  

org.xwidgets.core.TabPanel.prototype.getTabByName = function(name) {
  for (var i = 0; i < this.tabs.length; i++) {
    if (this.tabs[i].control.name == name) {
      return this.tabs[i];
    }
  }
};

org.xwidgets.core.TabPanel.prototype.getActiveTabIndex = function() {
  for (var i = 0; i < this.tabs.length; i++) {
    if (this.tabs[i] == this.activeTab) return i;    
  }
  return -1;
};

org.xwidgets.core.TabPanel.prototype.setActiveTab = function(idx) {
  var tab = null;

  if (typeof idx === "string") {
    tab = this.getTabByName(idx);
  } else if (idx != this.getActiveTabIndex() && idx >= 0 && idx < this.tabs.length) {
    tab = this.tabs[idx];
  }
  
  if (tab != null && tab != this.activeTab) {
    this.activeTab.container.style.display = "none";
    tab.container.style.display = "block";
    this.activeTab = tab;
  }  
};

org.xwidgets.core.TabPanel.prototype.toString = function() {
  return "org.xwidgets.core.TabPanel[" + this.id + "]";
};
