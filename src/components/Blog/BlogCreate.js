import React , { Component } from 'react';

import { connect } from 'react-redux';

import { 
	selectCreateBlogAct,
	clickSaveBlogAct
	} from '../../components/Blog/BlogAction';
import {
	initTinyEditorAct
	} from '../../components/TinyEditorComponent/TinyEditorComponentAction'

import 'bootstrap/dist/css/bootstrap.min.css';
import {Row,Col,Form, Button} from "react-bootstrap";
import './Blog.css';

import TinyEditorComponent from '../TinyEditorComponent/TinyEditorComponent';

// import tinymce from 'tinymce';
// import 'tinymce/tinymce.min.js'
// import 'tinymce/icons/default';
// import "tinymce/plugins/table";
// import { Editor } from '@tinymce/tinymce-react';

const mapStateToProps =(state) => {
	return {
	    bloglist:state.blogRdc.bloglist,
	    isCreateBlogByClick:state.blogRdc.isCreateBlogByClick,
	    isInitTinyEditorByClick:state.blogRdc.isInitTinyEditorByClick,
	    blogContent:state.blogRdc.blogContent
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
	return {
		onSelectBlogCreate:()=>
    		dispatch(selectCreateBlogAct()),
    	onInitTinyEditor:()=>
        	dispatch(initTinyEditorAct()),
        onClickSaveBlog:()=>
        	dispatch(clickSaveBlogAct(ownProps.blogContent))

    }

}

class BlogCreate extends Component  {

	componentDidMount() {
		console.log('BlogCreate componentDidMount');
		if (this.props.isCreateBlogByClick === false) {
			this.props.onSelectBlogCreate();
		}

		this.props.onInitTinyEditor();
	}

	


	render(){

		const {onClickSaveBlog}=this.props;

		return(
			<Col>
			<Row>
				<h1>Create Blog</h1>
			</Row>
			<Form>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Blog Title:</Form.Label>
					<Col sm="8">
					      <Form.Control size="sm" type="text" placeholder="Enter Blog Title" />
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Blog Description:</Form.Label>
					<Col sm="8">
					      <Form.Control size="sm" type="text" placeholder="Enter Blog Description" />
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Blog Path:</Form.Label>
					<Col sm="8">
					      <Form.Control size="sm" type="text" placeholder="Enter Blog Path" />
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Blog Category:</Form.Label>
					<Col sm="8">
					      <Form.Control size="sm" type="text" placeholder="Enter Blog Category" />
					</Col>
					<Col>
						<Button variant="secondary" size="sm">Clear</Button>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Blog Tag(s):</Form.Label>
					<Col sm="8">
					      <Form.Control size="sm" type="text" placeholder="Enter Blog Tags" />
					</Col>
					<Col>
						<Button variant="secondary" size="sm">Clear</Button>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Seq:</Form.Label>
					<Col sm="8">
					      <Form.Control size="sm" type="text" placeholder="Enter Seq" />
					</Col>
				</Form.Group>
				<Button variant="success" size="sm" onClick={onClickSaveBlog}>Save</Button>
			</Form>
			<br/>
			<Row>
				<TinyEditorComponent />
			</Row>
			
	       </Col>
		)
			
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogCreate);