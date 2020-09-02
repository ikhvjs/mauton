import {
  INIT_TINY_EDITOR
 } from '../../constants';

// Import TinyMCE
import tinymce from 'tinymce/tinymce';
//import skin
import 'tinymce/skins/ui/oxide/skin.css';
import 'tinymce/skins/ui/oxide/content.css';

// // Default icons are required for TinyMCE 5.3 or above
import 'tinymce/icons/default';

// // A theme is also required
import 'tinymce/themes/silver';

// // Any plugins you want to use has to be imported
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';

export const initTinyEditorAct = ()  => {
	tinymce.init({
        selector: '#frame1',
        height: 500,
        menubar: true,
        skin:false,
        content_css:false,
        plugins: [
          'link image code'
        ],
        toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      });
  return ({type:INIT_TINY_EDITOR})
}
