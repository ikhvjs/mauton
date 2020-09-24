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
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/table';
// import 'tinymce/plugins/wordcount';
// import 'tinymce/plugins/tinydrive';
import 'tinymce/plugins/autoresize';




export const initTinyEditorAct = (id, actiontype)  => {


  tinymce.remove(`#${id}`);
  
  tinymce.init({
      selector: `#${id}`,
      width: '100%',
      min_height: 800,
      max_height: 800,
      menubar: false,
      skin:false,
      content_css:false,
      branding: false,
      // images_upload_url: 'postAcceptor.php',
      plugins: [
        'image imagetools',
      ' lists link preview',
      'table'
      ],
      toolbar: 'undo redo | formatselect | ' +
      'bold italic | forecolor backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | link image  |table|preview',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      
  });

  if (actiontype === 'CREATE'){
    setTimeout(function () {
      // clear content 
      tinymce.get(id).setContent("");
    },1)
  }
  
  return ({type:INIT_TINY_EDITOR})
}

// export const onRemoveTinyEditorAct =()=>{
//   tinymce.remove();
//   return ({type:REMOVE_TINY_EDITOR})
// }