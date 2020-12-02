import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	closeBlogUpdateAct,
	onchangeUpdateBlogTitleAct,
	onchangeUpdateBlogCategoryAct,
	onchangeUpdateBlogTagAct,
	onchangeUpdateBlogSeqAct,
	updateBlogAct,
} from './BlogUpdateAction';
import { customStyles } from './BlogCustomStyles';
import TinyEditorComponent from '../../components/TinyEditorComponent/TinyEditorComponent';

import { Form, Button, Row, Col, Modal, Spinner } from "react-bootstrap";
import Select from 'react-select';
import './Blog.css';

const mapStateToProps = (state) => {
	return {
		isShowUpdateBlog: state.blogRdc.isShowUpdateBlog,
		isUpdateBlogTitleValid: state.blogRdc.isUpdateBlogTitleValid,
		isUpdateBlogCategoryValid: state.blogRdc.isUpdateBlogCategoryValid,
		isUpdateBlogTagValid: state.blogRdc.isUpdateBlogTagValid,
		isUpdateBlogSeqValid: state.blogRdc.isUpdateBlogSeqValid,
		updateBlogTitle: state.blogRdc.updateBlogTitle,
		updateBlogCategory: state.blogRdc.updateBlogCategory,
		updateBlogTag: state.blogRdc.updateBlogTag,
		updateBlogSeq: state.blogRdc.updateBlogSeq,
		updateBlogTitleErrMsg: state.blogRdc.updateBlogTitleErrMsg,
		updateBlogCategoryErrMsg: state.blogRdc.updateBlogCategoryErrMsg,
		updateBlogTagErrMsg: state.blogRdc.updateBlogTagErrMsg,
		updateBlogSeqErrMsg: state.blogRdc.updateBlogSeqErrMsg,
		isPendingPostBlog: state.blogRdc.isPendingPostBlog,
		isPendingRequestCategory: state.categoryRdc.isPendingRequestCategory,
		isPendingRequestTag: state.tagRdc.isPendingRequestTag,
		categories: state.categoryRdc.categories,
		tags: state.tagRdc.tags,
		updateBlogContent: state.blogRdc.blog.blog_content,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onCloseBlogUpdate: () =>
			dispatch(closeBlogUpdateAct()),
		onChangeUpdateBlogTitle: (event) =>
			dispatch(onchangeUpdateBlogTitleAct(event)),
		onChangeUpdateBlogCategory: (selectValue) =>
			dispatch(onchangeUpdateBlogCategoryAct(selectValue)),
		onChangeUpdateBlogTag: (selectValue) =>
			dispatch(onchangeUpdateBlogTagAct(selectValue)),
		onChangeUpdateBlogSeq: (event) =>
			dispatch(onchangeUpdateBlogSeqAct(event)),
		onUpdateBlog: () =>
			dispatch(updateBlogAct()),
	}
}

class BlogUpdate extends Component {

	render() {
		const {
			isShowUpdateBlog,
			onCloseBlogUpdate,
			isUpdateBlogTitleValid,
			isUpdateBlogCategoryValid,
			isUpdateBlogTagValid,
			isUpdateBlogSeqValid,
			updateBlogTitle,
			updateBlogCategory,
			updateBlogTag,
			updateBlogSeq,
			updateBlogTitleErrMsg,
			updateBlogCategoryErrMsg,
			updateBlogTagErrMsg,
			updateBlogSeqErrMsg,
			onChangeUpdateBlogTitle,
			onChangeUpdateBlogCategory,
			onChangeUpdateBlogTag,
			onChangeUpdateBlogSeq,
			isPendingPostBlog,
			onUpdateBlog,
			categories,
			tags,
			isPendingRequestCategory,
			isPendingRequestTag,
			updateBlogContent,
		} = this.props;



		return (
			<Modal size="xl" show={isShowUpdateBlog} onHide={onCloseBlogUpdate} backdrop="static">
				<Modal.Header closeButton>
					<Modal.Title>Update Blog Section</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group as={Row} controlId="formBlogTitle">
							<Form.Label column sm={2}>
								Blog Title:
                                </Form.Label>
							<Col sm={8}>
								<Form.Control size="sm" name="blog-title"
									isValid={isUpdateBlogTitleValid}
									isInvalid={(isUpdateBlogTitleValid === null)
										? null
										: !isUpdateBlogTitleValid}
									type="text" placeholder="Enter Blog Title"
									value={updateBlogTitle}
									onChange={onChangeUpdateBlogTitle} />
								<Form.Control.Feedback type="invalid">
									{updateBlogTitleErrMsg}
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
										${(isUpdateBlogCategoryValid === null)
											? null
											: (isUpdateBlogCategoryValid
												? "is-valid"
												: "is-invalid")}`
									}
									value={updateBlogCategory}
									isLoading={isPendingRequestCategory}
									isClearable={true}
									isSearchable={true}
									name="category"
									onChange={onChangeUpdateBlogCategory}
									options={categories.map((
										{ blog_category_id: value, blog_category_name: label }) =>
										({ value, label })
									)}
									styles={customStyles}
								/>
								<Form.Control.Feedback type="invalid">
									{updateBlogCategoryErrMsg}
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
										${(isUpdateBlogTagValid === null)
											? null
											: (isUpdateBlogTagValid
												? "is-valid"
												: "is-invalid")}`
									}
									isMulti
									value={updateBlogTag}
									isLoading={isPendingRequestTag}
									isClearable={false}
									isSearchable={true}
									name="tag"
									onChange={onChangeUpdateBlogTag}
									options={tags.map((
										{ tag_id: value, tag_name: label }) =>
										({ value, label })
									)}
									styles={customStyles}
								/>
								<Form.Control.Feedback type="invalid">
									{updateBlogTagErrMsg}
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
									isValid={isUpdateBlogSeqValid}
									isInvalid={(isUpdateBlogSeqValid === null)
										? null
										: !isUpdateBlogSeqValid}
									type="text" placeholder="Enter seq"
									value={updateBlogSeq}
									onChange={onChangeUpdateBlogSeq} />
								<Form.Control.Feedback type="invalid">
									{updateBlogSeqErrMsg}
								</Form.Control.Feedback>
								<Form.Control.Feedback type="valid">
									looks good
                                </Form.Control.Feedback>
							</Col>
						</Form.Group>


						<Form.Group as={Row} controlId="formBlogContent">
							<Col className="tiny-container">
								<TinyEditorComponent id="blog-content" blogContent={updateBlogContent} />
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
										name="update" onClick={onUpdateBlog}
										variant="primary" size="sm"
										disabled={!isUpdateBlogTitleValid
											|| !isUpdateBlogSeqValid
											|| !isUpdateBlogCategoryValid
											|| !isUpdateBlogTagValid
										}>
										Update
                                </Button>
									<Button
										className="mb-1 mx-1"
										name="cancel-update" onClick={onCloseBlogUpdate}
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


export default connect(mapStateToProps, mapDispatchToProps)(BlogUpdate)