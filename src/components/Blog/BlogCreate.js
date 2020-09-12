import React , { Component } from 'react';

import { connect } from 'react-redux';

import {  
	withRouter 
} from "react-router";

// import { LinkContainer } from 'react-router-bootstrap';

import { 
	// selectCreateBlogAct,
	clickSaveBlogAct,
	selectUpdateBlogCategoryAct,
	clearBlogCategoryAct,
	clearSelectedBlogCategoryAct,
	selectAddBlogTagAct,
	deleteBlogTagAct,
	clearSelectedBlogTagAct,
	clearCreateBlogFlagAct
	} from '../../components/Blog/BlogAction';

import {
	initTinyEditorAct
	} from '../../components/TinyEditorComponent/TinyEditorComponentAction';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Row,Col,Form, Button, Badge,Container} from "react-bootstrap";
import './Blog.css';

import TinyEditorComponent from '../TinyEditorComponent/TinyEditorComponent';
import CategoryModal from '../CategoryModal/CategoryModal';
import TagModal from '../TagModal/TagModal';


const mapStateToProps =(state) => {
	return {
	    isCreateBlogByClick:state.blogRdc.isCreateBlogByClick,
	    // isInitTinyEditorByClick:state.blogRdc.isInitTinyEditorByClick,
	    selectedCategory:state.blogRdc.selectedCategory,
	    selectedTag:state.blogRdc.selectedTag
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
	return {
		// onSelectBlogCreate:()=>
  //   		dispatch(selectCreateBlogAct()),
        onSelectUpdateBlogCategory:()=>
        	dispatch(selectUpdateBlogCategoryAct()),
        onClearBlogCategory:()=>
        	dispatch(clearBlogCategoryAct()),
        onClearSelectedBlogCategory:()=>
        	dispatch(clearSelectedBlogCategoryAct()),
        onSelectAddBlogTag:()=>
        	dispatch(selectAddBlogTagAct()),
        onDeleteBlogTag:(event)=>
        	dispatch(deleteBlogTagAct(event)),
        onClearSelectedBlogTag:()=>
        	dispatch(clearSelectedBlogTagAct()),
        onClickSaveBlog:(event)=>
        	dispatch(clickSaveBlogAct(event,ownProps.sidebarMenuPath)),
        onClearCreateBlogFlag:()=>
        	dispatch(clearCreateBlogFlagAct())

    }

}

class BlogCreate extends Component  {

	componentDidMount() {
		initTinyEditorAct('blogCreateEditor');
		// if (this.props.isCreateBlogByClick === false) {
		// 	this.props.onSelectBlogCreate();
		// }
	}

	componentWillUnmount() {
		this.props.onClearSelectedBlogCategory();
		this.props.onClearSelectedBlogTag();
		this.props.onClearCreateBlogFlag();
	}

	


	render(){

		const {
			onClickSaveBlog,
			onSelectUpdateBlogCategory,
			selectedCategory,
			onClearBlogCategory,
			onSelectAddBlogTag,
			selectedTag,
			onDeleteBlogTag
			}=this.props;

			// console.log('match',this.props.match);


		return(
			<Container>
			<Row>
				<h1>Create Blog</h1>
			</Row>
			<Form>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Blog Title:</Form.Label>
					<Col sm="8">
					      <Form.Control name="blog_title" size="sm" 
					      	type="text" placeholder="Enter Blog Title" />
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Blog Description:</Form.Label>
					<Col sm="8">
					      <Form.Control name="blog_desc" size="sm" 
					      	type="text" placeholder="Enter Blog Description" />
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Blog Path:</Form.Label>
					<Col sm="5">
					      <Form.Control name="blog_path" size="sm" 
					      	type="text" placeholder="Enter Blog Path" />
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Blog Category:</Form.Label>
					<Col sm="5">
					      <Form.Control readOnly size="sm" 
					      	type="text" placeholder="Change Blog Category" 
					      	name="blog_category_name"
					      	id={selectedCategory.blog_category_id}
					      	defaultValue={selectedCategory.blog_category_name}
					      	/>
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
					<Col name="blogtag" sm="auto">
						<Row className="pl-3">
						{selectedTag.map((tag,index)=>{
							return (
								<Col className="px-0 mr-2" sm="auto" 
									id={tag.tag_id} key={index} 
									name={tag.tag_name} title={index}>
									<Badge variant="primary">{`${tag.tag_name} `}</Badge>
									<Button onClick={onDeleteBlogTag} 
										className="pl-0 pb-0" variant="link">x</Button>
								</Col>
							)
						})}
						</Row>
					</Col>
					<Col sm="0.5">
						<Button variant="link" size="sm" onClick={onSelectAddBlogTag}>
							Add Tags
						</Button>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Seq:</Form.Label>
					<Col sm="2">
					      <Form.Control name="seq" 
					      size="sm" type="text" placeholder="Enter Seq" />
					</Col>
				</Form.Group>
				<Button variant="success" size="sm" onClick={onClickSaveBlog}>Save</Button>
			</Form>
			<br/>
			<Row>
				<TinyEditorComponent id='blogCreateEditor' />
			</Row>
			<CategoryModal />
			<TagModal />
	       </Container>
		)
			
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogCreate));