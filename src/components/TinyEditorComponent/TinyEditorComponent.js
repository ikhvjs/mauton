import React, { Component } from "react";




import { connect } from 'react-redux';

import { 
  initTinyEditorAct
  } from '../../components/TinyEditorComponent/TinyEditorComponentAction';



// import $ from 'jquery';

// import { Editor } from '@tinymce/tinymce-react';

const mapStateToProps =(state) => {
  return {
      isInitTinyEditorNeeded:state.blogRdc.isInitTinyEditorNeeded
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onInitTinyEditor:()=>
        dispatch(initTinyEditorAct())

    }

}

class TinyEditorComponent extends Component {

  // handleEditorChange = (content, editor) => {
  //    console.log('Content was updated:', content)
  // }

  componentDidMount() {
    // if (this.props.isInitTinyEditorNeeded === true){
    //   this.props.onInitTinyEditor();
    // }
    
  }

  componentDidUpdate() {
    if (this.props.isInitTinyEditorNeeded === true) {
      this.props.onInitTinyEditor();
    }
  }

  render() {
      

    return (
      <React.Fragment>
      <div id='frame1'  style={{ width: '50rem', height:'18rem'}} >Helloooooo</div>
      

      </React.Fragment>
    )
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(TinyEditorComponent);