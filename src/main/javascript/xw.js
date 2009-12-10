function Package(fullName)
{
  var pkg = window;
  var parts = fullName.split(".");
  for (var i = 0; i < parts.length; i++)
  {
    if (typeof pkg[parts[i]] == "undefined")
      pkg[parts[i]] = {};
    pkg = pkg[parts[i]]; 
  }
}

Package("xw");

/**
 * Browser info - based on Prototype JS
 */
xw.Browser = function()
{
  var ua = navigator.userAgent;
  var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
  return {
    IE:             !!window.attachEvent && !isOpera,
    Opera:          isOpera,
    WebKit:         ua.indexOf('AppleWebKit/') > -1,
    Gecko:          ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
    MobileSafari:   /Apple.*Mobile.*Safari/.test(ua)
  }
} 

/**
 * System Utils 
 */ 
xw.Sys = {};
xw.Sys.getObject = function(id)
{
  if (document.getElementById && document.getElementById(id))
    return document.getElementById(id);
  else if (document.all && document.all(id))
    return document.all(id);
  else if (document.layers && document.layers[id])
    return document.layers[id];
  else
    return false;  
}

xw.Sys.createHttpRequest = function(mimeType)
{  
  if (window.XMLHttpRequest)
  {
    var req = new XMLHttpRequest();
    if (mimeType != null && req.overrideMimeType) req.overrideMimeType(mimeType);
    return req;
  }
  else
  {
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
}  

/**
 * Asynchronously loads the javascript source from the specified url
 */
xw.Sys.loadSource = function(url, callback)
{
  var req = xw.Sys.createHttpRequest("text/plain");
  req.onreadystatechange = function() {
    if (req.readyState == 4)
    {
      if (req.status == 200 || req.status == 0)
      {
        var e = document.createElement("script");
        e.language = "javascript";
        e.text = req.responseText;
        e.type = "text/javascript";
        var head = document.getElementsByTagName("head")[0];
        if (head == null)
        {
          head = document.createElement("head");          
          var html = document.getElementsByTagName("html")[0];
          html.insertBefore(head, html.firstChild);          
        }
        head.appendChild(e);           
        if (callback) callback();
      }
    }
    else
    {
      //alert("There was an error processing your request.  Error code: " + req.status);
    }
  };
  
  req.open("GET", url, true);
  req.send(null);
}

xw.Sys.isUndefined = function(value) 
{ 
  return value == null && value !== null; 
}

xw.Sys.arrayContains = function(arrayVal, value)
{
  for (var i = 0; i < arrayVal.length; i++)
  {
    if (arrayVal[i] == value) return true; 
  } 
  return false;
}

xw.Sys.capitalize = function(value)
{
  return value.substring(0, 1).toUpperCase() + value.substring(1, value.length); 
}

xw.Sys.chainEvent = function(ctl, eventName, eventFunc)
{
  if (ctl.addEventListener)
  {
    // normal browsers like firefox, chrome and safari support this
    ctl.addEventListener(eventName, eventFunc, false);
  }
  else if (ctl.attachEvent)
  {
    // irregular browsers such as IE don't support standard functions
    ctl.attachEvent("on" + eventName, eventFunc);
  }
  else
  {
    // really old browsers
    // alert("your browser doesn't support adding event listeners");
  }
}

/**
 * Returns the specified style for an element
 *
 * TODO - probably need to fix this up for safari - use xw.Sys.getBorder() as an example
 */ 
xw.Sys.getStyle = function(element, cssRule)
{
	var strValue = "";
	if (document.defaultView && document.defaultView.getComputedStyle)
	{
		strValue = document.defaultView.getComputedStyle(element, "").getPropertyValue(cssRule);
	}
	else if (element.currentStyle)
	{
		cssRule = cssRule.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		strValue = element.currentStyle[cssRule];
	}
	return strValue;
}

xw.Sys.getBorder = function(control)
{
  var border = {};
  if (window.navigator.userAgent.indexOf('Safari') == -1)
  {
    if (control.currentStyle)
    {
      border.top = parseInt(control.currentStyle.borderTopWidth);
      border.right = parseInt(control.currentStyle.borderRightWidth);
      border.bottom = parseInt(control.currentStyle.borderBottomWidth);
      border.left = parseInt(control.currentStyle.borderLeftWidth);
    } 
    else 
    {    
      try
      {
        border.top = parseInt(getComputedStyle(control,null).getPropertyValue('border-top-width'));
        border.right = parseInt(getComputedStyle(control,null).getPropertyValue('border-right-width'));
        border.bottom = parseInt(getComputedStyle(control,null).getPropertyValue('border-bottom-width'));
        border.left = parseInt(getComputedStyle(control,null).getPropertyValue('border-left-width'));
      }
      catch (e) // last resort
      {
        border.top = parseInt(control.style.borderTopWidth);
        border.right = parseInt(control.style.borderRightWidth);
        border.bottom = parseInt(control.style.borderBottomWidth);
        border.left = parseInt(control.style.borderLeftWidth);
      }
    }
  } 
  else 
  {
    border.top = parseInt(control.style.getPropertyValue('border-top-width'));
    border.right = parseInt(control.style.getPropertyValue('border-right-width'));
    border.bottom = parseInt(control.style.getPropertyValue('border-bottom-width'));
    border.left = parseInt(control.style.getPropertyValue('border-left-width'));
  }
  return border;
}

xw.Sys.parseXml = function(body)
{
  try
  {
    var doc = new ActiveXObject("Microsoft.XMLDOM");
    doc.async = "false";
    doc.loadXML(body);
    return doc;
  }
  catch (e)
  {
    var doc = new DOMParser().parseFromString(body, "text/xml");
    return doc;
  }
}

/**
 * A Map implementation
 */
xw.Map = function()
{
  this.elements = new Array();

  xw.Map.prototype.size = function()
  {
    return this.elements.length;
  }

  xw.Map.prototype.isEmpty = function()
  {
    return this.elements.length == 0;
  }

  xw.Map.prototype.keySet = function()
  {
    var keySet = new Array();
    for (var i = 0; i < this.elements.length; i++)
      keySet[keySet.length] = this.elements[i].key;
    return keySet;
  }

  xw.Map.prototype.values = function()
  {
    var values = new Array();
    for (var i = 0; i < this.elements.length; i++)
      values[values.length] = this.elements[i].value;
    return values;
  }

  xw.Map.prototype.get = function(key)
  {
    for (var i = 0; i < this.elements.length; i++)
    {
      if (this.elements[i].key == key)
        return this.elements[i].value;
    }
    return null;
  }

  xw.Map.prototype.put = function(key, value)
  {
    for (var i = 0; i < this.elements.length; i++)
    {
      if (this.elements[i].key == key)
      {
        this.elements[i].value = value;
        return;
      }
    }
    this.elements.push({key:key,value:value});
  }

  xw.Map.prototype.remove = function(key)
  {
    for (var i = 0; i < this.elements.length; i++)
    {
      if (this.elements[i].key == key)
        this.elements.splice(i, 1);
    }
  }

  xw.Map.prototype.contains = function(key)
  {
    for (var i = 0; i < this.elements.length; i++)
    {
      if (this.elements[i].key == key)
        return true;
    }
    return false;
  }
}

/**
 * Control manager 
 */
xw.ControlManager = {};
xw.ControlManager.controls = new Array();
xw.ControlManager.pendingControls = new Array();
xw.ControlManager.initControl = function(controlName)
{      
  if (xw.Sys.isUndefined(xw.controls) ||
     xw.Sys.isUndefined(eval("xw.controls." + controlName)))
  {
    var url = xw.getResourceBase() + "xw." + xw.Sys.capitalize(controlName) + ".js";
    var callback = function() { xw.ControlManager.processPendingControls(); };
    xw.Sys.loadSource(url, callback);
  }  
}

xw.ControlManager.processPendingControls = function()
{
  if (xw.ControlManager.pendingControls.length > 0)
  {
    var controlName = xw.ControlManager.pendingControls.shift();
    xw.ControlManager.initControl(controlName);
  }
  else
  {
    xw.ViewManager.signalControlsLoaded();
  }      
}

xw.ControlManager.loadControls = function(controls)
{
  for (var i = 0; i < controls.length; i++)
  {
    if (!xw.ControlManager.isControlLoaded(controls[i]))
    {
      xw.ControlManager.pendingControls.push(controls[i]); 
    }    
  }
    
  xw.ControlManager.processPendingControls();
}
xw.ControlManager.isControlLoaded = function(controlName)
{
  for (var i = 0; i < xw.ControlManager.controls.length; i++)
  {
    if (xw.ControlManager.controls[i] == controlName) return true;
  }   
  return false;
}

/**
 * View Loader - loads view definitions from a URL
 */
xw.ViewLoader = {};
xw.ViewLoader.load = function(viewName, callback)
{
  var req = xw.Sys.createHttpRequest("text/xml");
  req.onreadystatechange = function() { callback(req) };
  req.open("GET", viewName, true);
  req.send(null);
  return req;        
}

/**
 * Parses the XML view definition and creates a View instance
 */
xw.ViewParser = function(viewRoot, container)
{
  this.viewRoot = viewRoot;
  this.container = container;
  this.controls = new Array();
  
  /**
   * Parses the XML and builds a list of controls
   */
  xw.ViewParser.prototype.parse = function()
  {        
    this.parseChildNodes(this.viewRoot.childNodes);    
  }
  
  xw.ViewParser.prototype.parseChildNodes = function(elements)
  {
    for (var i = 0; i < elements.length; i++)
    {
      var element = elements.item(i);    
      if (element.nodeType != 1) continue; // not an element
      if (element.tagName == "event") continue; // ignore events
      var controlName = xw.Sys.capitalize(element.tagName);                                
      if (!xw.Sys.arrayContains(this.controls, controlName))
      {
        this.controls.push(controlName);
      }        
      
      this.parseChildNodes(element.childNodes);    
    }
  }    
  
  xw.ViewParser.prototype.createView = function()
  {
    var view = new xw.View();
    view.container = this.container;     
    this.parseChildren(this.viewRoot.childNodes, view);
    return view;    
  }
  
  xw.ViewParser.prototype.parseChildren = function(children, parentControl)
  {
    for (var i = 0; i < children.length; i++)
    {      
      var element = children.item(i);
      if (element.nodeType != 1) continue; // not an element
      this.parseControl(element, parentControl);
    }       
  }
  
  xw.ViewParser.prototype.parseControl = function(element, parentControl)
  {    
    var tag = element.tagName;
    
    if (tag == "event")
    {
      if (xw.Sys.isUndefined(parentControl.events))
      {        
        parentControl.events = {};
      }
      xw.EventParser.parse(element, parentControl.events);
    }
    else
    {            
      var controlName = xw.Sys.capitalize(tag);
      var control = new xw.controls[controlName]();
      control.parent = parentControl;
      
      if (xw.Sys.isUndefined(parentControl.children))
      {
        parentControl.children = new Array();
      }
      parentControl.children.push(control);
      
      // Set control properties
      for (var i = 0; i < element.attributes.length; i++)
      {
        var name = element.attributes[i].name;
        var value = element.getAttribute(name);
        control[name] = value;
      }
    
      this.parseChildren(element.childNodes, control);      
    }    
  }
}

xw.EventParser = {};
xw.EventParser.parse = function(element, events)
{
  var eventType = element.getAttribute("type");
  for (var i = 0; i < element.childNodes.length; i++)
  {
    var child = element.childNodes.item(i);
    if (child.nodeType != 1) continue; // not an element
    if (child.tagName != "action") continue; // not an action
    if (child.getAttribute("type") != "script") continue; // not a script

    // get all the text content of the action node, textContent would be
    // easier but IE doesn't support that
    var actionScript = "";
    for (var j = 0; j < child.childNodes.length; j++)
    {
      var grandChild = child.childNodes[j];
      var nodeType = grandChild.nodeType;
      if (nodeType != 3 && nodeType != 4) continue; // not TEXT or CDATA
      actionScript = actionScript + grandChild.nodeValue;
    }
    var action = new xw.Action();
    action.script = actionScript;
    events[eventType] = action;
    break; 
  }
}

/**
 * View manager - responsible for caching views
 */
xw.ViewManager = {};
xw.ViewManager.viewCache = {};
xw.ViewManager.pendingViews = new Array();
xw.ViewManager.loadViewCallback = function(req, viewName, container)
{  
  if (req.readyState == 4)
  {
    if (req.status == 200 || req.status == 0)
    {
      var viewRoot;
      if (req.responseXml) viewRoot = req.responseXML.documentElement;
      else viewRoot = xw.Sys.parseXml(req.responseText).documentElement;
      
      if (viewRoot.tagName == "view")
      {
        xw.ViewManager.createView(viewRoot, container);
      }
      else
      {
        alert("Invalid view definition - document root is not 'view' element");
      }           
    }
    else
    {
      alert("There was an error processing your request.  Error code: " + req.status);
    }
  }  
}

xw.ViewManager.createView = function(viewRoot, container)
{
  var parser = new xw.ViewParser(viewRoot, container);
  parser.parse();
  
  xw.ViewManager.pendingViews.push(parser);
  
  // next we want to load all of the controls
  xw.ControlManager.loadControls(parser.controls);
}

xw.ViewManager.signalControlsLoaded = function()
{
  if (xw.ViewManager.pendingViews.length > 0)
  {
    var parser = xw.ViewManager.pendingViews.shift();
    parser.createView().paint(); 
  }   
}

xw.ViewManager.openView = function(viewName, container)
{
  // If we haven't previously loaded the view, do it now
  if (xw.Sys.isUndefined(xw.ViewManager.viewCache[viewName]))
  {
    var callback = function(req) { 
      xw.ViewManager.loadViewCallback(req, viewName, container); 
    };
    xw.ViewLoader.load(viewName, callback); 
  }
  else
  {
    xw.ViewLoader.createView(xw.ViewManager.viewCache[viewName], container);
  }
}

/**
 * Base class for controls - TODO implement control inheritance
 */
xw.Control = function()
{
  this.parent = null;
  this.children = new Array(); 
  
  xw.Control.prototype.setParent = function(parent)
  {
    this.parent = parent;
  }
}

xw.Action = function()
{
  this.script = null;
  
  xw.Action.prototype.invoke = function()
  {
    if (!xw.Sys.isUndefined(this.script))
    {
      return eval(this.script);
    }
  }
}

/**
 * Defines the physical bounds of a control
 */
xw.Bounds = function(top, left, height, width)
{
  this.top = top;
  this.left = left;
  this.height = height;
  this.width = width;
  this.style = new Object();
  
  xw.Bounds.prototype.getTop = function()
  {
    return this.top;
  }
  
  xw.Bounds.prototype.getLeft = function()
  {
    return this.left;
  }
  
  xw.Bounds.prototype.getHeight = function()
  {
    return this.height;
  }
  
  xw.Bounds.prototype.getWidth = function()
  {
    return this.width;
  }    
  
  xw.Bounds.prototype.addStyleProperty = function(property, value)
  {
    this.style[property] = value;
    return this;
  }
}

/** LAYOUT MANAGERS **/

xw.DefaultLayout = function(container)
{
  this.container = container;
  
  xw.DefaultLayout.prototype.layout = function()
  {
    if (this.container.children)
    {
      for (var i = 0; i < this.container.children.length; i++)
      {
        this.container.children[i].paint();
      }
    }
  }
}

xw.BorderLayout = function(container)
{
  this.container = container;
  this.bounds = new xw.Map();
    
  xw.BorderLayout.prototype.layout = function()
  {      
    // TODO - support percentage widths
  
    // TODO invert this somehow
    this.container.getContainingControl().style.position = "relative";
    
    var topControls = new Array();
    var bottomControls = new Array();
    var leftControls = new Array();
    var rightControls = new Array();
    var clientControls = new Array();       

    for (var i = 0; i < this.container.children.length; i++)
    {
      var child = this.container.children[i];
      if ("top" == child.align) topControls.push(child);
      else if ("bottom" == child.align) bottomControls.push(child);
      else if ("left" == child.align) leftControls.push(child);
      else if ("right" == child.align) rightControls.push(child);
      else if ("client" == child.align) clientControls.push(child);
    }
  
    var topSpace = 0;
    var bottomSpace = 0;
    var leftSpace = 0;
    var rightSpace = 0;
    
    for (var i = 0; i < topControls.length; i++)
    {
      var bounds = new xw.Bounds(null, null, topControls[i].height, null)
        .addStyleProperty("position", "absolute")
        .addStyleProperty("top", topSpace + "px")
        .addStyleProperty("left", "0")
        .addStyleProperty("right", "0");      
    
      this.bounds.put(topControls[i], bounds);
      topSpace += 1.0 * topControls[i].height;
    }
    
    for (var i = 0; i < bottomControls.length; i++)
    {
      var bounds = new xw.Bounds(null, null, bottomControls[i].height, null)
        .addStyleProperty("position","absolute")
        .addStyleProperty("bottom", bottomSpace)
        .addStyleProperty("left", "0")
        .addStyleProperty("right", "0");
        
      this.bounds.put(bottomControls[i], bounds);    
      bottomSpace += 1.0 * bottomControls[i].height;          
    }
    
    for (var i = 0; i < leftControls.length; i++)
    {
      this.bounds.put(leftControls[i], new xw.Bounds(null, null, null, leftControls[i].width)
        .addStyleProperty("position", "absolute")
        .addStyleProperty("left", leftSpace + "px")
        .addStyleProperty("top", topSpace + "px")
        .addStyleProperty("bottom", bottomSpace + "px")
      );
      leftSpace += 1.0 * leftControls[i].width;        
    }
    
    for (var i = 0; i < rightControls.length; i++)
    {
      this.bounds.put(rightControls[i], new xw.Bounds(null, null, null, rightControls[i].width)
        .addStyleProperty("position", "absolute")
        .addStyleProperty("right", rightSpace + "px")
        .addStyleProperty("top", topSpace + "px")
        .addStyleProperty("bottom", bottomSpace + "px")
      );
      rightSpace += 1.0 * rightControls[i].width;
    }
    
    for (var i = 0; i < clientControls.length; i++)
    {
      this.bounds.put(clientControls[i], new xw.Bounds(null, null, null, null)
        .addStyleProperty("position", "absolute")
        .addStyleProperty("left", leftSpace + "px")
        .addStyleProperty("right", rightSpace + "px")
        .addStyleProperty("top", topSpace + "px")
        .addStyleProperty("bottom", bottomSpace + "px")
      );    
    }
  
    for (var i = 0; i < this.container.children.length; i++)
    {
      this.container.children[i].paint(this); 
    }
  }
  
  xw.BorderLayout.prototype.getBounds = function(ctl)
  {
    return this.bounds.get(ctl);
  }  
}

xw.layoutManagers = new Object();
xw.layoutManagers["border"] = xw.BorderLayout;

/**
 * A single instance of a view
 */
xw.View = function()
{
  this.container = null;  
  this.children = new Array();
  
  this.layout = null;
  this.layoutManager = null;
    
  /**
   * Callback for window resize events
   */
  xw.View.prototype.resize = function()
  {
    // bubble the resize event through the component tree
  }  
  
  xw.View.prototype.setLayout = function(layout)
  {
    if ("string" == (typeof layout))
      this.layoutManager = new xw.layoutManagers[layout](this);
    else
      this.layoutManager = layout;
  }
  
  xw.View.prototype.paint = function()
  {       
    // Determine the container control
    if ("string" == (typeof this.container))
      this.control = xw.Sys.getObject(this.container);
    else
      this.control = this.container;           
    
    // Set the window resize callback so that we can respond to resize events
    var target = this; 
    var callback = function() { target.resize(); };
    xw.Sys.chainEvent(window, "resize", callback);    
    
    // Create the appropriate layout manager and layout the child controls
    if (this.layout == null) this.layoutManager = new xw.BorderLayout(this);
    this.layoutManager.layout();            
  }  
  
  xw.View.prototype.appendChild = function(child)
  {
    this.control.appendChild(child);
  }
  
  xw.View.prototype.getContainingControl = function()
  {
    return this.control;
  }
}

/**
 ******* General methods *******
 */
 
/**
 * Opens a view in the specified container - this call is asynchronous
 */ 
xw.openView = function(viewName, container)
{
  xw.ViewManager.openView(viewName, container);
}

xw.setResourceBase = function(resourceBase)
{
  xw.resourceBase = resourceBase;
}

xw.getResourceBase = function()
{
  return xw.Sys.isUndefined(xw.resourceBase) ? "" : xw.resourceBase + "/";
}
