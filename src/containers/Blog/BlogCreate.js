import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	closeBlogCreateAct,
	onchangeCreateBlogTitleAct,
	onchangeCreateBlogCategoryIDAct,
	onchangeCreateBlogTagAct,
	onchangeCreateBlogSeqAct,
	postBlogAct,
} from './BlogCreateAction';

import { Form, Button, Row, Col, Modal, Spinner } from "react-bootstrap";

const mapStateToProps = (state) => {
	return {
		isShowCreateBlog: state.blogRdc.isShowCreateBlog,
		isCreateBlogTitleValid: state.blogRdc.isCreateBlogTitleValid,
		isCreateBlogCategoryIDValid: state.blogRdc.isCreateBlogCategoryIDValid,
		isCreateBlogTagValid: state.blogRdc.isCreateBlogTagValid,
		isCreateBlogSeqValid: state.blogRdc.isCreateBlogSeqValid,
		createBlogTitle: state.blogRdc.createBlogTitle,
		createBlogCategoryID: state.blogRdc.createBlogCategoryID,
		createBlogTag: state.blogRdc.createBlogTag,
		createBlogSeq: state.blogRdc.createBlogSeq,
		createBlogTitleErrMsg: state.blogRdc.createBlogTitleErrMsg,
		createBlogCategoryIDErrMsg: state.blogRdc.createBlogCategoryIDErrMsg,
		createBlogTagErrMsg: state.blogRdc.createBlogTagErrMsg,
		createBlogSeqErrMsg: state.blogRdc.createBlogSeqErrMsg,
		isPendingPostBlog: state.blogRdc.isPendingPostBlog,
		categories: state.categoryRdc.categories,
		tags: state.tagRdc.tags,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onCloseBlogCreate: () =>
			dispatch(closeBlogCreateAct()),
		onChangeCreateBlogTitle: (event) =>
			dispatch(onchangeCreateBlogTitleAct(event)),
		onChangeCreateBlogCategoryID: (event) =>
			dispatch(onchangeCreateBlogCategoryIDAct(event)),
		onChangeCreateBlogTag: (event) =>
			dispatch(onchangeCreateBlogTagAct(event)),
		onChangeCreateBlogSeq: (event) =>
			dispatch(onchangeCreateBlogSeqAct(event)),
		onCreateBlog: () =>
			dispatch(postBlogAct()),
	}
}

class BlogCreate extends Component {

	render() {
		const {
			isShowCreateBlog,
			onCloseBlogCreate,
			isCreateBlogTitleValid,
			isCreateBlogCategoryIDValid,
			isCreateBlogTagValid,
			isCreateBlogSeqValid,
			createBlogTitle,
			createBlogCategoryID,
			createBlogTag,
			createBlogSeq,
			createBlogTitleErrMsg,
			createBlogCategoryIDErrMsg,
			createBlogTagErrMsg,
			createBlogSeqErrMsg,
			onChangeCreateBlogTitle,
			onChangeCreateBlogCategoryID,
			onChangeCreateBlogTag,
			onChangeCreateBlogSeq,
			isPendingPostBlog,
			onCreateBlog,
			categories,
			tags,
		} = this.props;

		return (
			<Modal size="xl" show={isShowCreateBlog} onHide={onCloseBlogCreate} backdrop="static">
				<Modal.Header closeButton>
					<Modal.Title>Create Blog Section</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group as={Row} controlId="formBlogTitle">
							<Form.Label column sm={4}>
								Blog Title:
                                </Form.Label>
							<Col sm={8}>
								<Form.Control size="sm" name="blog-title"
									isValid={isCreateBlogTitleValid}
									isInvalid={(isCreateBlogTitleValid === null)
										? null
										: !isCreateBlogTitleValid}
									type="text" placeholder="Enter Blog Title"
									value={createBlogTitle}
									onChange={onChangeCreateBlogTitle} />
								<Form.Control.Feedback type="invalid">
									{createBlogTitleErrMsg}
								</Form.Control.Feedback>
								<Form.Control.Feedback type="valid">
									looks good
                                </Form.Control.Feedback>
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="formBlogCategory">
							<Form.Label column sm={4}>
								Category:
                                </Form.Label>
							<Col sm={8}>
								<Form.Control as="select"
									size="sm" name="category-name"
									isValid={isCreateBlogCategoryIDValid}
									isInvalid={(isCreateBlogCategoryIDValid === null)
										? null
										: !isCreateBlogCategoryIDValid}
									value={createBlogCategoryID}
									onChange={onChangeCreateBlogCategoryID}
								>
									<option value="" disabled={true}>Select Category</option>
									{categories.map((category) => {
										return (
											<option key={category.blog_category_id}
												value={category.blog_category_id}>
												{category.blog_category_name}
											</option>)
									})}
								</Form.Control>
								<Form.Control.Feedback type="invalid">
									{createBlogCategoryIDErrMsg}
								</Form.Control.Feedback>
								<Form.Control.Feedback type="valid">
									looks good
                                </Form.Control.Feedback>
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="formBlogTag">
							<Form.Label column sm={4}>
								Tag:
                                </Form.Label>
							<Col sm={8}>
								<Form.Control as="select"  multiple
									size="sm" name="category-name"
									isValid={isCreateBlogTagValid}
									isInvalid={(isCreateBlogTagValid === null)
										? null
										: !isCreateBlogTagValid}
									value={createBlogTag}
									onChange={onChangeCreateBlogTag}
								>
									<option value="" disabled={true}>Select Category</option>
									{tags.map((tag) => {
										return (
											<option key={tag.tag_id}
												value={tag.tag_id}>
												{tag.tag_name}
											</option>)
									})}
								</Form.Control>
								<Form.Control.Feedback type="invalid">
									{createBlogTagErrMsg}
								</Form.Control.Feedback>
								<Form.Control.Feedback type="valid">
									looks good
                                </Form.Control.Feedback>
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="formBlogSeq">
							<Form.Label column sm={4}>
								Seq:
                                </Form.Label>
							<Col sm={8}>
								<Form.Control size="sm" name="seq"
									isValid={isCreateBlogSeqValid}
									isInvalid={(isCreateBlogSeqValid === null)
										? null
										: !isCreateBlogSeqValid}
									type="text" placeholder="Enter seq"
									value={createBlogSeq}
									onChange={onChangeCreateBlogSeq} />
								<Form.Control.Feedback type="invalid">
									{createBlogSeqErrMsg}
								</Form.Control.Feedback>
								<Form.Control.Feedback type="valid">
									looks good
                                </Form.Control.Feedback>
							</Col>
						</Form.Group>
						{
							isPendingPostBlog
								? (<div className="row d-flex align-items-center justify-content-end">
									<Spinner
										as="span"
										animation="grow"
										size="sm"
										role="status"
										aria-hidden="true"
									/>
									Loading...
								</div>)
								: (<Row className="d-flex justify-content-end">
									<Button
										className="mb-1 mx-1"
										name="create" onClick={onCreateBlog}
										variant="primary" size="sm"
										disabled={!isCreateBlogTitleValid
											|| !isCreateBlogSeqValid
											}>
										Create
                                </Button>
									<Button
										className="mb-1 mx-1"
										name="cancel-create" onClick={onCloseBlogCreate}
										variant="secondary" size="sm">
										Cancel
                                </Button>
								</Row>)
						}

					</Form>
				</Modal.Body>
			</Modal>
		)


	}

}


export default connect(mapStateToProps, mapDispatchToProps)(BlogCreate)