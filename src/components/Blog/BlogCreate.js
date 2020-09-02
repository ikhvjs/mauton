import React , { Component } from 'react';

import { connect } from 'react-redux';

import { 
	selectCreateBlogAct
	} from '../../components/Blog/BlogAction';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Row,Col } from "react-bootstrap";
import './Blog.css';

import TinyEditorComponent from '../TinyEditorComponent/TinyEditorComponent';

// import tinymce from 'tinymce';
// import 'tinymce/tinymce.min.js'
// import 'tinymce/icons/default';
// import "tinymce/plugins/table";
// import { Editor } from '@tinymce/tinymce-react';

const mapStateToProps =(state) => {
	return {
	    bloglist:state.blogRdc.bloglist
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSelectBlogCreate:()=>
    		dispatch(selectCreateBlogAct())

    }

}

class BlogCreate extends Component  {

	componentDidMount() {
		this.props.onSelectBlogCreate();
	}

	

	render(){

		return(
			<Col>
			<Row>
				<h1>BlogCreate</h1>
			</Row>
			<Row>
				<TinyEditorComponent/>
			</Row>
			
	       </Col>
		)
			
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogCreate);