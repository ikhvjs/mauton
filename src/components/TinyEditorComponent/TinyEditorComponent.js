import React, { Component } from "react";
import { connect } from 'react-redux';

import { 
  initTinyEditorAct
} from './TinyEditorComponentAction';


// import $ from 'jquery';

// import { Editor } from '@tinymce/tinymce-react';

const mapStateToProps =(state) => {
  return {
      
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onInitTinyEditor:(EditorID)=>
      dispatch(initTinyEditorAct(EditorID))
  }

}


class TinyEditorComponent extends Component {

  componentDidMount() {
    const { id, onInitTinyEditor } = this.props;
    // console.log('tiny didMount id',id);
    onInitTinyEditor(id);
  }


  render() {
    const { id } = this.props;
    return (
      <textarea id={id}  onChange={()=>null} >
      </textarea>
    )
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(TinyEditorComponent);