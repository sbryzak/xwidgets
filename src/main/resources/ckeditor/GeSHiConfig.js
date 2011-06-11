// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

CKEDITOR.editorConfig = function(config) {
	config.extraPlugins = 'GeSHi';
        config.toolbar = [
	['Copy', 'Paste', 'Cut', 'Find', '-', 'Font', '-', 'FontSize', '-', 'Outdent', 'Indent', '-', 'ShowBlocks', 'Templates', '-', 'HiddenField', 'Select', 'Textarea', 'Form', 'TextField', 'Checkbox', 'Radio', 'Button', '-', 'Anchor', 'HorizontalRule', 'Blockquote', 'Flash', '-', 'SelectAll', '-', 'NewPage', '-', 'Preview', '-', 'GeSHi', '-', 'About' ],
	'/',
	['Bold', 'Underline', 'Italic', 'Strike', '-', 'Styles', '-', 'Format', '-', 'NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'Link', 'Unlink', 'Image', 'SpecialChar', 'Smiley', 'BGColor', 'TextColor', '-', 'Scayt', '-', 'RemoveFormat', 'Undo', 'Redo', '-', 'Maximize', '-', 'Source']
        ];
};
