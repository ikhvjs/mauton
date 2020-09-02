import React , { Component } from 'react';
import { 
	withRouter 
} from "react-router";

import { connect } from 'react-redux';

import { 
	requestBlogAct,
	requestBlogTagAct
} from './BlogAction';

import { transformDate } from '../../utility/utility';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Badge } from "react-bootstrap";
import './Blog.css';



const mapStateToProps = (state) => {
  return {
    blog:state.blogRdc.blog,
    tags:state.blogRdc.tags,
    isPendingBlogByClick:state.blogRdc.isPendingBlogByClick
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestBlog:(blogPath)=>
    	dispatch(requestBlogAct(blogPath)),
    onRequestBlogTag:(blogPath)=>
    	dispatch(requestBlogTagAct(blogPath))
  }
}

class Blog extends Component  {

	componentDidMount() {
		const { isPendingBlogByClick, onRequestBlog, onRequestBlogTag } = this.props;
		const { blogPath } = this.props.match.params;
		// console.log('DidMount blogPath',blogPath);
		if (isPendingBlogByClick === false){
	    	onRequestBlog(blogPath);
	    	onRequestBlogTag(blogPath);
		}
	}

	render(){
		const {
			blog,
			tags
		}=this.props;

		return(
			(blog.length === 1)?
			<React.Fragment>
				<Col className = "blog-container-wrapper">
					<h1>{blog[0].blog_title}</h1>
					<hr></hr>
					<h4>{blog[0].blog_desc}</h4>
	                <p>{`Category: ${blog[0].blog_category_name}`}</p>
	                <p>Tags: 
	                	{tags.map((tag)=>{
	                		return(
	                			<Badge key={tag.tag_id} className="blog-tag" variant="primary">{tag.tag_name}</Badge>
	                		)
	                	})}
					</p>
	                <p>{`Last updated on ${transformDate(blog[0].last_updated_date)}`}</p>
					<hr></hr>
	                <div>{blog[0].blog_content}</div>		
                </Col>
			</React.Fragment>
			:null


		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));