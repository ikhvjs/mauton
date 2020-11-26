import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	closeBlogCreateAct,
	onchangeCreateBlogTitleAct,
	onchangeCreateBlogCategoryAct,
	onchangeCreateBlogTagAct,
	onchangeCreateBlogSeqAct,
	postBlogAct,
} from './BlogCreateAction';
import { customStyles } from './BlogCustomStyles';
import TinyEditorComponent from '../../components/TinyEditorComponent/TinyEditorComponent';

import { Form, Button, Row, Col, Modal, Spinner } from "react-bootstrap";
import Select from 'react-select';
import './Blog.css';

const mapStateToProps = (state) => {
	return {
		isShowCreateBlog: state.blogRdc.isShowCreateBlog,
		isCreateBlogTitleValid: state.blogRdc.isCreateBlogTitleValid,
		isCreateBlogCategoryValid: state.blogRdc.isCreateBlogCategoryValid,
		isCreateBlogTagValid: state.blogRdc.isCreateBlogTagValid,
		isCreateBlogSeqValid: state.blogRdc.isCreateBlogSeqValid,
		createBlogTitle: state.blogRdc.createBlogTitle,
		createBlogCategory: state.blogRdc.createBlogCategory,
		createBlogTag: state.blogRdc.createBlogTag,
		createBlogSeq: state.blogRdc.createBlogSeq,
		createBlogTitleErrMsg: state.blogRdc.createBlogTitleErrMsg,
		createBlogCategoryErrMsg: state.blogRdc.createBlogCategoryErrMsg,
		createBlogTagErrMsg: state.blogRdc.createBlogTagErrMsg,
		createBlogSeqErrMsg: state.blogRdc.createBlogSeqErrMsg,
		isPendingPostBlog: state.blogRdc.isPendingPostBlog,
		isPendingRequestCategory: state.categoryRdc.isPendingRequestCategory,
		isPendingRequestTag: state.tagRdc.isPendingRequestTag,
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
		onChangeCreateBlogCategory: (selectValue) =>
			dispatch(onchangeCreateBlogCategoryAct(selectValue)),
		onChangeCreateBlogTag: (selectValue) =>
			dispatch(onchangeCreateBlogTagAct(selectValue)),
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
			isCreateBlogCategoryValid,
			isCreateBlogTagValid,
			isCreateBlogSeqValid,
			createBlogTitle,
			createBlogCategory,
			createBlogTag,
			createBlogSeq,
			createBlogTitleErrMsg,
			createBlogCategoryErrMsg,
			createBlogTagErrMsg,
			createBlogSeqErrMsg,
			onChangeCreateBlogTitle,
			onChangeCreateBlogCategory,
			onChangeCreateBlogTag,
			onChangeCreateBlogSeq,
			isPendingPostBlog,
			onCreateBlog,
			categories,
			tags,
			isPendingRequestCategory,
			isPendingRequestTag,
		} = this.props;

		

		return (
			<Modal size="xl" show={isShowCreateBlog} onHide={onCloseBlogCreate} backdrop="static">
				<Modal.Header closeButton>
					<Modal.Title>Create Blog Section</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group as={Row} controlId="formBlogTitle">
							<Form.Label column sm={2}>
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
							<Form.Label column sm={2}>
								Category:
                                </Form.Label>
							<Col sm={8}>
								<Select
									className={`form-control form-control-sm p-0
										${(isCreateBlogCategoryValid === null)
											? null
											: (isCreateBlogCategoryValid
												? "is-valid"
												: "is-invalid")}`
									}
									value={createBlogCategory}
									isLoading={isPendingRequestCategory}
									isClearable={false}
									isSearchable={true}
									name="category"
									onChange={onChangeCreateBlogCategory}
									options={categories.map((
										{ blog_category_id: value, blog_category_name: label }) =>
										({ value, label })
									)}
									styles={customStyles}
								/>
								<Form.Control.Feedback type="invalid">
									{createBlogCategoryErrMsg}
								</Form.Control.Feedback>
								<Form.Control.Feedback type="valid">
									looks good
                                </Form.Control.Feedback>
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="formBlogTag">
							<Form.Label column sm={2}>
								Tag:
                                </Form.Label>
							<Col sm={8}>
								<Select
									className={`form-control form-control-sm p-0
										${(isCreateBlogTagValid === null)
											? null
											: (isCreateBlogTagValid
												? "is-valid"
												: "is-invalid")}`
									}
									isMulti
									value={createBlogTag}
									isLoading={isPendingRequestTag}
									isClearable={false}
									isSearchable={true}
									name="tag"
									onChange={onChangeCreateBlogTag}
									options={tags.map((
										{ tag_id: value, tag_name: label }) =>
										({ value, label })
									)}
									styles={customStyles}
								/>
								<Form.Control.Feedback type="invalid">
									{createBlogTagErrMsg}
								</Form.Control.Feedback>
								<Form.Control.Feedback type="valid">
									looks good
                                </Form.Control.Feedback>
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="formBlogSeq">
							<Form.Label column sm={2}>
								Seq:
                                </Form.Label>
							<Col sm={2}>
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


						<Form.Group as={Row} controlId="formBlogContent">
							<Col>
								<TinyEditorComponent id="blog-content"/>
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