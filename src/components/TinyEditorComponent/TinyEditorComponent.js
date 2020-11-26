import React, { Component } from "react";
import { connect } from 'react-redux';

import {  initTinyEditorAct, removeTinyEditorAct } from './TinyEditorComponentAction';


// import $ from 'jquery';

// import { Editor } from '@tinymce/tinymce-react';

const mapStateToProps =(state) => {
  return {
      // isCreateBlog:state.blogRdc.isCreateBlog,
      // isUpdateBlog:state.blogRdc.isUpdateBlog
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onInitTinyEditor:(id)=>
      dispatch(initTinyEditorAct(id)),
    onRemoveTinyEditor:(id)=>
      dispatch(removeTinyEditorAct(id))
  }

}


class TinyEditorComponent extends Component {

  componentDidMount() {
    const { id, onInitTinyEditor } = this.props;
    onInitTinyEditor(id);
  }

  componentDidUpdate() {
    // const { id, onInitTinyEditor,isCreateBlog,isUpdateBlog } = this.props;
    // if (isCreateBlog === true) {
    //   onInitTinyEditor(id);
    // }else if (isUpdateBlog === true) {
    //   console.log('UpdateBlog init tiny');
    //   onInitTinyEditor(id);
    // }
  }

  componentWillUnmount(){
    const { id, onRemoveTinyEditor } = this.props;
    onRemoveTinyEditor(id);
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