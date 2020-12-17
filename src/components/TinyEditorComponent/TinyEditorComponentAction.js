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
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/table';
import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';




export const initTinyEditorAct = (id,blogContent="") => {
    tinymce.init({
      selector: `#${id}`,
      width: '100%',
      min_height: 400,
      max_height: 400,
      // menubar: false,
      menubar:"edit insert view format table tools help",
      skin: false,
      content_css: false,
      branding: false,
      plugins: [
        'image imagetools',
        ' lists link preview',
        'table','code','codesample'
      ],
      toolbar: 'undo redo | formatselect | fontsizeselect | ' +
        'bold italic | forecolor backcolor | alignleft aligncenter | ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | link image  | table | code codesample | preview',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

    });

    setTimeout(function () {
      tinymce.get(id).setContent(blogContent);
    },300)
}

export const removeTinyEditorAct = () => {
  tinymce.remove();
}