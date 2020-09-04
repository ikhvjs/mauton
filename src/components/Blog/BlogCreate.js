import React , { Component } from 'react';

import { connect } from 'react-redux';

import { SELECTED_EDITOR_ID } from '../../constants';

import { 
	selectCreateBlogAct,
	clickSaveBlogAct,
	selectUpdateBlogCategoryAct,
	clearBlogCategoryAct
	} from '../../components/Blog/BlogAction';
// import {
// 	initTinyEditorAct
// 	} from '../../components/TinyEditorComponent/TinyEditorComponentAction'

import 'bootstrap/dist/css/bootstrap.min.css';
import {Row,Col,Form, Button, Badge} from "react-bootstrap";
import './Blog.css';

import TinyEditorComponent from '../TinyEditorComponent/TinyEditorComponent';
import CategoryModal from '../CategoryModal/CategoryModal';

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
	    blogContent:state.blogRdc.blogContent,
	    selectedCategory:state.blogRdc.selectedCategory
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
	return {
		onSelectBlogCreate:()=>
    		dispatch(selectCreateBlogAct()),
        onClickSaveBlog:()=>
        	dispatch(clickSaveBlogAct(SELECTED_EDITOR_ID)),
        onSelectUpdateBlogCategory:()=>
        	dispatch(selectUpdateBlogCategoryAct()),
        onClearBlogCategory:()=>
        	dispatch(clearBlogCategoryAct())

    }

}

class BlogCreate extends Component  {

	componentDidMount() {

		if (this.props.isCreateBlogByClick === false) {
			this.props.onSelectBlogCreate();
		}
	}

	


	render(){

		const {
			onClickSaveBlog,
			onSelectUpdateBlogCategory,
			selectedCategory,
			onClearBlogCategory
			}=this.props;


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
					<Col sm="5">
					      <Form.Control size="sm" type="text" placeholder="Enter Blog Path" />
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Blog Category:</Form.Label>
					<Col sm="5">
					      <Form.Control readOnly size="sm" 
					      	type="text" placeholder="Change Blog Category" 
					      	id={selectedCategory.blog_category_id}
					      	defaultValue={selectedCategory.blog_category_name}/>
					</Col>
					<Col sm="0.5">
						<Button variant="link" size="sm" 
							onClick={onSelectUpdateBlogCategory}>Change</Button>
					</Col>
					<Col sm="1">
						<Button variant="secondary" size="sm" onClick={onClearBlogCategory}>
							Clear</Button>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Blog Tag(s):</Form.Label>
					<Col sm="auto">
						<Row className="pl-3">
							<Col className="px-0" sm="auto">
								<Badge className="align-bottom" variant="primary">{`Primary `}</Badge>
								<Badge className="align-bottom blog-tag" variant="light" onClick={()=>console.log('hello')}>x</Badge>
							</Col> 
							<Col className="px-0" sm="auto">
								<Badge className="align-bottom" variant="primary">{`Primary `}</Badge>
								<Badge className="align-bottom blog-tag" variant="light">x</Badge>
							</Col> 
							<Col className="px-0" sm="auto">
								<Badge className="align-bottom" variant="primary">{`Primary `}</Badge>
								<Badge className="align-bottom blog-tag" variant="light">x</Badge>
							</Col>
						</Row>
					</Col>
					<Col sm="0.5">
						<Button variant="link" size="sm">Add Tags</Button>
					</Col>
					<Col>
						<Button variant="secondary" size="sm">Clear</Button>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Seq:</Form.Label>
					<Col sm="2">
					      <Form.Control size="sm" type="text" placeholder="Enter Seq" />
					</Col>
				</Form.Group>
				<Button variant="success" size="sm" onClick={onClickSaveBlog}>Save</Button>
			</Form>
			<br/>
			<Row>
				<TinyEditorComponent id={SELECTED_EDITOR_ID} />
			</Row>
			<CategoryModal />
	       </Col>
		)
			
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogCreate);