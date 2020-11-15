import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
// import { withRouter } from "react-router";

import { connect } from 'react-redux';

// import BlogUpdate from './BlogUpdate';

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

		// const html = blog[0].blog_content ;

		return (


			<Col id="blog-col-container">
				<Row>{blog[0].blog_title}</Row>
				<Row>Category: <Badge pill variant="warning">{blog[0].blog_category_name}</Badge></Row>
				<Row>Tags:
				    {blog[0].tags.map((tag, index) => {
					return (
						<Badge pill key={index} className="blog-tag"
							variant="primary">{tag.tag_name}</Badge>
					)
				})}
				</Row>
				<Row>{`Last updated on ${transformDate(blog[0].last_updated_date)}`}</Row>
				<Row>
					<Col xs={2}>
						<Button variant="success" size="sm">
							Update
						</Button>
					</Col>
					<Col xs={2}>
						<Button variant="danger" size="sm">
							Delete
						</Button>
					</Col>
					<Col xs="auto">
					</Col>
				</Row>
				<Row>
					{ReactHtmlParser(blog[0].blog_content)}
				</Row>
			</Col>



		)
	}
}

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));
export default connect(mapStateToProps, mapDispatchToProps)(Blog);