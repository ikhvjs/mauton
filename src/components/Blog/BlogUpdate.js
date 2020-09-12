import React , { Component } from 'react';

import { connect } from 'react-redux';

import tinymce from 'tinymce/tinymce';

// import { LinkContainer } from 'react-router-bootstrap';

import { 
	clickUpdateBlogAct,
	selectUpdateBlogCategoryAct,
	clearSelectedBlogCategoryAct,
	selectAddBlogTagAct,
	deleteBlogTagAct,
	clearSelectedBlogTagAct,
	initSelectedBlogTagAct,
	initSelectedBlogCategoryAct
	} from '../../components/Blog/BlogAction';

import {
	initTinyEditorAct
} from '../TinyEditorComponent/TinyEditorComponentAction';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Row,Col,Form, Button, Badge,Container} from "react-bootstrap";
import './Blog.css';

import TinyEditorComponent from '../TinyEditorComponent/TinyEditorComponent';
import CategoryModal from '../CategoryModal/CategoryModal';
import TagModal from '../TagModal/TagModal';


const mapStateToProps =(state) => {
	return {
	    selectedCategory:state.blogRdc.selectedCategory,
	    selectedTag:state.blogRdc.selectedTag
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
        onSelectUpdateBlogCategory:()=>
        	dispatch(selectUpdateBlogCategoryAct()),
        onClearSelectedBlogCategory:()=>
        	dispatch(clearSelectedBlogCategoryAct()),
        onSelectAddBlogTag:()=>
        	dispatch(selectAddBlogTagAct()),
        onDeleteBlogTag:(event)=>
        	dispatch(deleteBlogTagAct(event)),
        onClearSelectedBlogTag:()=>
        	dispatch(clearSelectedBlogTagAct()),
        onClickUpdateBlog:(event)=>
        	dispatch(clickUpdateBlogAct(event)),
        onInitSelectedBlogTag:()=>
        	dispatch(initSelectedBlogTagAct()),
        onInitSelectedBlogCategory:()=>
        	dispatch(initSelectedBlogCategoryAct())

    }

}

class BlogUpdate extends Component  {

	componentDidMount() {
		initTinyEditorAct('blogUpdateEditor');
		tinymce.get('blogUpdateEditor').setContent(this.props.blog.blog_content);
		this.props.onInitSelectedBlogTag();
		this.props.onInitSelectedBlogCategory();
	}

	componentWillUnmount() {
	}

	


	render(){

		const {
			onClickUpdateBlog,
			onSelectUpdateBlogCategory,
			selectedCategory,
			onSelectAddBlogTag,
			selectedTag,
			onDeleteBlogTag,
			blog,
			onInitSelectedBlogCategory,
			onInitSelectedBlogTag
			}=this.props;



		return(
			<Container>
			<Row>
				<h1>Update Blog</h1>
			</Row>
			<Form>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Blog Title:</Form.Label>
					<Col sm="8">
					      <Form.Control name="blog_title" size="sm" 
					      	type="text" placeholder="Enter Blog Title" 
					      	defaultValue={blog.blog_title}/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Blog Description:</Form.Label>
					<Col sm="8">
					      <Form.Control name="blog_desc" size="sm" 
					      	type="text" placeholder="Enter Blog Description" 
					      	defaultValue={blog.blog_desc}/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Blog Path:</Form.Label>
					<Col sm="5">
					      <Form.Control name="blog_path" size="sm" 
					      	type="text" placeholder="Enter Blog Path" 
					      	defaultValue={blog.blog_path}/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Blog Category:</Form.Label>
					<Col sm="0.5">
						{
						  <div className="ml-3 pl-1 pr-1 pt-1 rounded border"
						  	id={selectedCategory.blog_category_id}>
					      		{selectedCategory.blog_category_name}
						  </div>
						}
					</Col>
					<Col sm="0.5">
						<Button variant="link" size="sm" 
							onClick={onSelectUpdateBlogCategory}>Change</Button>
					</Col>
					<Col sm="1">
						<Button variant="secondary" size="sm" 
							onClick={onInitSelectedBlogCategory}>
							Reset
						</Button>
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
										<Badge pill variant="primary">{`${tag.tag_name} `}</Badge>
										<Button onClick={onDeleteBlogTag} 
											className="pl-0 pb-0" variant="link">x</Button>
									</Col>
								)
							})
						}
						</Row>
					</Col>
					<Col sm="0.5">
						<Button variant="link" size="sm" onClick={onSelectAddBlogTag}>
							Add Tags
						</Button>
					</Col>
					<Col sm="0.5">
						<Button variant="secondary" size="sm" onClick={onInitSelectedBlogTag}>
							Reset
						</Button>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Seq:</Form.Label>
					<Col sm="2">
					      <Form.Control name="seq" defaultValue={blog.seq}
					      size="sm" type="text" placeholder="Enter Seq" />
					</Col>
				</Form.Group>
				<Button variant="success" size="sm" onClick={onClickUpdateBlog}>Update</Button>
			</Form>
			<br/>
			<Row>
				<TinyEditorComponent id='blogUpdateEditor' />
			</Row>
			<CategoryModal />
			<TagModal />
	       </Container>
		)
			
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogUpdate);