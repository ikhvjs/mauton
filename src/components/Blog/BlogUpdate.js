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
	initSelectedBlogCategoryAct,
	exitUpdateBlogAct,
	// initUpdateBlogAct,
	initUpdateBlogTitleAct,
	initUpdateBlogDescAct,
	onChangeUpdateBlogTitleAct,
	onChangeUpdateBlogDescAct,
	initUpdateBlogPathAct,
	initUpdateBlogSeqAct,
	onChangeUpdateBlogPathAct,
	onChangeUpdateBlogSeqAct
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
	    selectedTag:state.blogRdc.selectedTag,
	    updateBlogTitle:state.blogRdc.updateBlogTitle,
	    updateBlogDesc:state.blogRdc.updateBlogDesc,
	    updateBlogPath:state.blogRdc.updateBlogPath,
	    updateBlogSeq:state.blogRdc.updateBlogSeq
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
        onClickUpdateBlog:()=>
        	dispatch(clickUpdateBlogAct()),
        onCancelUpdateBlog:()=>
        	dispatch(exitUpdateBlogAct()),
        onInitSelectedBlogTag:()=>
        	dispatch(initSelectedBlogTagAct()),
        onInitSelectedBlogCategory:()=>
        	dispatch(initSelectedBlogCategoryAct()),
        onInitUpdateBlog:()=>{
        	dispatch(initSelectedBlogTagAct());
        	dispatch(initSelectedBlogCategoryAct());
        	dispatch(initUpdateBlogTitleAct());
        	dispatch(initUpdateBlogDescAct());
        	dispatch(initUpdateBlogPathAct());
        	dispatch(initUpdateBlogSeqAct());
        },
        onChangeUpdateBlogTitle: (event)=>
        	dispatch(onChangeUpdateBlogTitleAct(event.target.value)),
        onChangeUpdateBlogDesc: (event)=>
        	dispatch(onChangeUpdateBlogDescAct(event.target.value)),
        onChangeUpdateBlogPath:(event)=>
        	dispatch(onChangeUpdateBlogPathAct(event.target.value)),
        onChangeUpdateBlogSeq:(event)=>
        	dispatch(onChangeUpdateBlogSeqAct(event.target.value))

    }

}

class BlogUpdate extends Component  {

	componentDidMount() {
		initTinyEditorAct('blogUpdateEditor');
		tinymce.get('blogUpdateEditor').setContent(this.props.blogContent);
		// this.props.onInitSelectedBlogTag();
		// this.props.onInitSelectedBlogCategory();
		this.props.onInitUpdateBlog();
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
			onInitSelectedBlogCategory,
			onInitSelectedBlogTag,
			onCancelUpdateBlog,
			onChangeUpdateBlogTitle,
			onChangeUpdateBlogDesc,
			onChangeUpdateBlogPath,
			onChangeUpdateBlogSeq,
			updateBlogTitle,
			updateBlogDesc,
			updateBlogPath,
			updateBlogSeq
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
					      	value={updateBlogTitle}
					      	onChange={onChangeUpdateBlogTitle}/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Blog Description:</Form.Label>
					<Col sm="8">
					      <Form.Control name="blog_desc" size="sm" 
					      	type="text" placeholder="Enter Blog Description" 
					      	value={updateBlogDesc}
					      	onChange={onChangeUpdateBlogDesc}/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Blog Path:</Form.Label>
					<Col sm="5">
					      <Form.Control name="blog_path" size="sm" 
					      	type="text" placeholder="Enter Blog Path" 
					      	value={updateBlogPath}
					      	onChange={onChangeUpdateBlogPath}/>
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
					      <Form.Control name="seq" size="sm" type="text" 
					     	placeholder="Enter Seq" 
					      	value={updateBlogSeq}
					      	onChange={onChangeUpdateBlogSeq}/>
					</Col>
				</Form.Group>
				<Row>
					<Col sm="1">
						<Button variant="success" size="sm" onClick={onClickUpdateBlog}>
							Update
						</Button>
					</Col>
					<Col sm="0.3">
						<Button variant="secondary" size="sm" onClick={onCancelUpdateBlog}>
							Cancel
						</Button>
					</Col>
				</Row>
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