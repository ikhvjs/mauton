import React, { Component } from "react";
import { connect } from 'react-redux';
import { initTinyEditorAct, removeTinyEditorAct } from './TinyEditorComponentAction';


const mapStateToProps = (state) => {
  return {
    blogContent: state.blogRdc.blog.blog_content
  }
}

class TinyEditorComponent extends Component {

  componentDidMount() {
    const { id, blogContent } = this.props;
    initTinyEditorAct(id, blogContent);
  }

  componentWillUnmount() {
    const { id } = this.props;
    removeTinyEditorAct(id);
  }

  render() {
    const { id } = this.props;
    return (
      <textarea id={id} onChange={() => null} >
      </textarea>
    )
  }

}

export default connect(mapStateToProps, null)(TinyEditorComponent)