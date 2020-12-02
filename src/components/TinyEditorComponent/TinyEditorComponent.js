import React, { Component } from "react";
import { initTinyEditorAct, removeTinyEditorAct } from './TinyEditorComponentAction';



class TinyEditorComponent extends Component {

  componentDidMount() {
    const { id, blogContent } = this.props;
    initTinyEditorAct(id, blogContent);
  }

  componentWillUnmount() {
    removeTinyEditorAct();
  }

  render() {
    const { id } = this.props;
    return (
      <textarea id={id} onChange={() => null} >
      </textarea>
    )
  }

}

export default TinyEditorComponent