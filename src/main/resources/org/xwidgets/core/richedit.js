package("org.xwidgets.core");

org.xwidgets.core.RichEdit = function() {
  xw.Widget.call(this);
  this.registerProperty("value", null);
  this.registerProperty("enableResize", false);
  this.registerProperty("resizeMaxWidth", -1);
  this.control = null;
};

org.xwidgets.core.RichEdit.prototype = new xw.Widget();
  
org.xwidgets.core.RichEdit.prototype.render = function(container) {
  if (this.control == null) {
    this.control = document.createElement("div");  
    var config = {};   
    config.resize_enabled = this.enableResize;
    if (this.resizeMaxWidth != -1) {
      config.resize_maxWidth = parseInt(this.resizeMaxWidth);
    }
    config.toolbar = "XWidgets";
    config.toolbar_XWidgets = [
	    //{ name: 'document', items : [ 'Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates' ] },
	    { name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
	    { name: 'editing', items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
	    //{ name: 'forms', items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
	    '/',
	    { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
	    { name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
	    { name: 'links', items : [ 'Link','Unlink','Anchor' ] },
	    { name: 'insert', items : [ 'Image','Table','HorizontalRule','Smiley' ] },
	    '/',
	    { name: 'styles', items : [ 'Styles','Format','Font','FontSize' ] },
	    { name: 'colors', items : [ 'TextColor','BGColor' ] },
	    { name: 'tools', items : [ 'Maximize', 'ShowBlocks','-','About' ] }
    ];      

    editor = CKEDITOR.appendTo(this.control, config, this.value);
    container.appendChild(this.control);
  }
};


