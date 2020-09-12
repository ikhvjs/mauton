import React , { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { 
	withRouter 
} from "react-router";

import { connect } from 'react-redux';

import BlogUpdate from './BlogUpdate';

import { 
	requestBlogAct,
	// requestBlogTagAct,
	updateBlogAct,
	exitUpdateBlogAct
} from './BlogAction';

import { transformDate } from '../../utility/utility';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Badge, Container,Button} from "react-bootstrap";
import './Blog.css';



const mapStateToProps = (state) => {
  return {
    blog:state.blogRdc.blog,
    // tags:state.blogRdc.tags,
    isPendingBlogByClick:state.blogRdc.isPendingBlogByClick,
    isUpdateBlog:state.blogRdc.isUpdateBlog
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestBlog:(blogPath)=>
    	dispatch(requestBlogAct(blogPath)),
    // onRequestBlogTag:(blogPath)=>
    // 	dispatch(requestBlogTagAct(blogPath)),
    onUpdateBlog:()=>
    	dispatch(updateBlogAct()),
    onExitUpdateBlog:()=>
    	dispatch(exitUpdateBlogAct())
  }
}

class Blog extends Component  {

	componentDidMount() {
		const { isPendingBlogByClick, onRequestBlog } = this.props;
		const { blogPath } = this.props.match.params;
		// console.log('DidMount blogPath',blogPath);
		if (isPendingBlogByClick === false){
	    	onRequestBlog(blogPath);
	    	// onRequestBlogTag(blogPath);
		}
	}

	componentWillUnmount() {
		if (this.props.isUpdateBlog === true) {
			this.props.onExitUpdateBlog();
		}
	}

	render(){
		const {
			blog,
			// tags,
			onUpdateBlog,
			isUpdateBlog
		}=this.props;

		// const html = blog[0].blog_content ;

		return(
			(blog.length === 1)?
				((isUpdateBlog)
					?(<BlogUpdate blog={blog[0]}/>
					)
					:(<Container>
						<Col className = "blog-container-wrapper">
							<Container>
							<h1>{blog[0].blog_title}</h1>
							
							<hr></hr>
							<h4>{blog[0].blog_desc}</h4>
			                <h5>Category: <Badge pill  variant="warning">{blog[0].blog_category_name}</Badge></h5>
			                <p>Tags: 
			                	{blog[0].tags.map((tag,index)=>{
			                		return(
			                			<Badge pill key={index} className="blog-tag"
			                				variant="primary">{tag.tag_name}</Badge>
			                		)
			                	})}
							</p>
			                <p>{`Last updated on ${transformDate(blog[0].last_updated_date)}`}</p>
			                <Button variant="success" size="sm" onClick={onUpdateBlog}>
			                	Update
			                </Button>{" "}
							<Button variant="danger" size="sm">Delete</Button>
							<hr></hr>
							</Container>
							<Container>
			                	{ ReactHtmlParser(blog[0].blog_content) }
			                </Container>	
		                </Col>
					</Container>)
				)
			:null


		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));