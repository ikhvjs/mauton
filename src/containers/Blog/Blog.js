import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';

import { requestBlogAct, selectDeleteBlogAct, selectUpdateBlogAct} from './BlogAction';
import { requestCategoryAct } from '../CategoryConfig/CategoryConfigAction';
import { requestTagAct } from '../TagConfig/TagConfigAction';

import BlogDelete from './BlogDelete';
import BlogUpdate from './BlogUpdate';

import { transformDate } from '../../utility/utility';

import { Col, Badge, Button, Row } from "react-bootstrap";
import './Blog.css';



const mapStateToProps = (state) => {
	return {
		blog: state.blogRdc.blog,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestBlog: () =>
			dispatch(requestBlogAct()),
		onSelectDeleteBlog:()=>
			dispatch(selectDeleteBlogAct()),
		onSelectUpdateBlog:()=>{
			dispatch(selectUpdateBlogAct());
			dispatch(requestCategoryAct());
			dispatch(requestTagAct());
		}
			
	}
}

class Blog extends Component {

	render() {
		const {
			blog,
			onSelectDeleteBlog,
			onSelectUpdateBlog,
		} = this.props;

		return (
			<Row id="blog-row-container">
				<Col id="blog-col-container">
					<Row>
						<Col>
							Blog Title: {blog.blog_title}
						</Col>
					</Row>
					<Row>
						<Col>
							{ReactHtmlParser(blog.blog_content)}
						</Col>
					</Row>
					<hr />
					<Row>
						<Col>
							Category:
							<Badge pill variant="warning" className="ml-1">
								{blog.blog_category_name}
							</Badge>
						</Col>
					</Row>
					<Row>
						<Col>
							Tags:
							{blog.tags.map((tag, index) => {
							return (
								<Badge pill key={index} variant="primary" className="ml-1">
									{tag.tag_name}
								</Badge>
							)
						})}
						</Col>
					</Row>
					<Row>
						<Col>
							{`Last updated on ${transformDate(blog.last_updated_date)}`}
						</Col>
					</Row>
					<Row>
						<Col xs={2} md={1}>
							<Button variant="success" size="sm"
							onClick={onSelectUpdateBlog}>
								Update
							</Button>
						</Col>
						<Col xs={2} md={1}>
							<Button variant="danger" size="sm" 
								onClick={onSelectDeleteBlog}
							>
								Delete
							</Button>
						</Col>
					</Row>
				</Col>
				<BlogDelete />
				<BlogUpdate />
			</Row>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);