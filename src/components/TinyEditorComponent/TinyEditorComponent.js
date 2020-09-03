import React, { Component } from "react";




import { connect } from 'react-redux';

import { 
  onChangeBlogContentAct
} from './TinyEditorComponentAction';


// import $ from 'jquery';

// import { Editor } from '@tinymce/tinymce-react';

const mapStateToProps =(state) => {
  return {
      blogContent:state.blogRdc.blogContent
  }
}


const mapDispatchToProps = (dispatch,ownProps) => {
  return {
      onChangeBlogContent:() => 
        dispatch(onChangeBlogContentAct(ownProps.blogContent)),

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
    // if (this.props.isInitTinyEditorNeeded === true) {
    //   this.props.onInitTinyEditor();
    // }
  }

  render() {
    const { blogContent, onChangeBlogContent} = this.props;


    return (
      <textarea id='frame1' value={blogContent} >
      </textarea>
    )
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(TinyEditorComponent);