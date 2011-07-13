//
// File upload widget, based on Andrew Valums file uploader http://github.com/valums/file-uploader
//
package("org.xwidgets.core");

org.xwidgets.core.FileUpload = function() {
  xw.Visual.call(this);
  this.registerProperty("caption", "Upload a file");
  this.registerProperty("uploadPath", null);
  this.control = null;
  this.uploader = null;
};

org.xwidgets.core.FileUpload.prototype = new xw.Visual();

org.xwidgets.core.FileUpload.prototype.render = function(container) {
  if (this.control == null) {
    this.control = document.createElement("div");  
    container.appendChild(this.control);

    if (xw.Sys.isUndefined(window.qq)) {
      // Load the source for the fileupload control before rendering it
      var that = this;
      var cb = function() { that.renderFileUploader(); };
      xw.Sys.loadSource(xw.Sys.getBasePath() + "fileuploader/fileuploader.js", cb);
    } else {
      this.renderFileUploader();
    }
  }
};

org.xwidgets.core.FileUpload.prototype.renderFileUploader = function() {
    this.uploader = new qq.FileUploader({
      element: this.control,
      action: this.uploadPath,
      template: this.buildTemplate()
    });    
};

org.xwidgets.core.FileUpload.prototype.buildTemplate = function() {
  return "<div class=\"qq-uploader\">" + 
         "<div class=\"qq-upload-drop-area\"><span>Drop files here to upload</span></div>" +
         "<div class=\"qq-upload-link\">" + this.caption + "</div>" +
         "<ul class=\"qq-upload-list\"></ul>" + 
         "</div>";
};

