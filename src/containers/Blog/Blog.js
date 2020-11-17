import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

import { connect } from 'react-redux';

import {
	requestBlogAct,
	// updateBlogAct,
	// exitUpdateBlogAct
	// deleteBlogAct
} from './BlogAction';

// import {
// 	showDeleteBlogAlertAct
// } from '../DeleteBlogAlert/DeleteBlogAlertAction';

// import DeleteBlogAlert from '../../components/DeleteBlogAlert/DeleteBlogAlert';

import { transformDate } from '../../utility/utility';


import { Col, Badge, Button, Row } from "react-bootstrap";
import './Blog.css';



const mapStateToProps = (state) => {
	return {
		blog: state.blogRdc.blog,
		// isPendingBlogByClick: state.blogRdc.isPendingBlogByClick,
		// isUpdateBlog: state.blogRdc.isUpdateBlog
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestBlog: () =>
			dispatch(requestBlogAct()),
		// onUpdateBlog:()=>
		// 	dispatch(updateBlogAct()),
		// onExitUpdateBlog:()=>
		// 	dispatch(exitUpdateBlogAct()),
		// onDeleteBlog:()=>
		// 	dispatch(deleteBlogAct()),
		// onShowDeleteBlogAlert:()=>
		// 	dispatch(showDeleteBlogAlertAct())
	}
}

class Blog extends Component {

	componentDidMount() {
		// const { isPendingBlogByClick, onRequestBlog } = this.props;
		// const { blogPath } = this.props.match.params;
		// if (isPendingBlogByClick === false){
		// 	onRequestBlog(blogPath);
		// }
	}

	componentDidUpdate(prevProps) {
		// const {isUpdateBlog, onRequestBlog} = this.props;
		// const { blogPath } = this.props.match.params;

		// if (isUpdateBlog !== prevProps.isUpdateBlog) {
		// 	if (isUpdateBlog === false){
		// 		onRequestBlog(blogPath);
		// 	}
		// }

	}

	componentWillUnmount() {
		// if (this.props.isUpdateBlog === true) {
		// 	this.props.onExitUpdateBlog();
		// }
	}

	render() {
		const {
			blog,
			// onUpdateBlog,
			// onDeleteBlog,
			// isUpdateBlog,
			// onShowDeleteBlogAlert
		} = this.props;

		// const html = blog.blog_content ;

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
							<Button variant="success" size="sm">
								Update
							</Button>
						</Col>
						<Col xs={2} md={1}>
							<Button variant="danger" size="sm">
								Delete
							</Button>
						</Col>
					</Row>
				</Col>
				
			</Row>
		)
	}
}

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));
export default connect(mapStateToProps, mapDispatchToProps)(Blog);