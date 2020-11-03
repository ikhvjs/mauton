import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	requestTagAct,
	requestTagByClickAct,
	selectSearchTagAct,
	searchTagAct,
	// beforeUpdateTagAct,
	// afterUpdateTagAct,
	// updateTagAct,
	// updateCancelTagAct,
	clearSearchTagAct,
	selectCreateTagAct,
	selectDeleteTagAct
} from './TagConfigAction';

import { Table, Form, Button, Col, Row, Spinner } from "react-bootstrap";
import './TagConfig.css';

import TagConfigCreate from './TagConfigCreate';
import TagConfigDelete from './TagConfigDelete';
import TagErrorAlert from './TagErrorAlert';


const mapStateToProps = (state) => {
	return {
		tags: state.tagRdc.tags,
		beforeUpdateTag: state.tagRdc.beforeUpdateTag,
		isRefreshTagNeeded: state.tagRdc.isRefreshTagNeeded,
		isPendingRequestTag: state.tagRdc.isPendingRequestTag,
		isRequestTagFailed: state.tagRdc.isRequestTagFailed,
		requestTagErrMsg: state.tagRdc.requestTagErrMsg
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestTag: () =>
			dispatch(requestTagAct()),
		onRequestTagByClick: () =>
			dispatch(requestTagByClickAct()),
		onSearchTag: (event) =>
			dispatch(searchTagAct(selectSearchTagAct(event))),
		
		// onUpdateTag: (event) =>
		// 	dispatch(updateTagAct(afterUpdateTagAct(event))),
		// onCancelUpdateTag: (event) =>
		// 	dispatch(updateCancelTagAct(event)),
		onClearSearchTag: (event) =>
			dispatch(clearSearchTagAct(event)),
		onSelectCreateTag: () =>
			dispatch(selectCreateTagAct()),
		onSelectDeleteTag: (event) =>
			dispatch(selectDeleteTagAct(event)),
		// onSelectUpdateTag: (event) =>
		// 	dispatch(beforeUpdateTagAct(event)),


	}
}


class TagConfig extends Component {

	componentDidMount() {
		this.props.onRequestTag();
	}

	componentDidUpdate() {
		if (this.props.isRefreshTagNeeded === true) {
			this.props.onRequestTagByClick();
		}
	}


	render() {

		const { tags,
			onSearchTag,
			onClearSearchTag,
			onSelectCreateTag,
			onSelectUpdateTag,
			onSelectDeleteTag,
			isPendingRequestTag,
			isRequestTagFailed,
			requestTagErrMsg
		} = this.props;

		return (
			<Row id="tag-config-container">
				<Col id="tag-config-wrapper">
					<Row className="mb-1 px-3">
						<Col>
							<h3>Tag</h3>
						</Col>
					</Row>
					<Row className="mb-1 px-3">
						<Col xs={6} sm={4} md={5} className="mb-1">
							<Form.Control size="sm" name="tag_name"
								type="text" placeholder="Enter Tag Name" />
						</Col>
						<Col name='button' xs={3} sm={2} md={1}>
							<Button size="sm" onClick={onSearchTag}>Search</Button>
						</Col>
						<Col name='button' xs={3} sm={2} md={2}>
							<Button size="sm" variant="secondary" onClick={onClearSearchTag}>Clear</Button>
						</Col>
						<Col xs={2} sm={2} md={1}>
							<Button name="create" variant="success" size="sm" onClick={onSelectCreateTag}> Create </Button>
						</Col>
					</Row>
					<Row className="my-1 px-3">
						<Col>
							{(isPendingRequestTag)
								? (<div className="d-flex align-items-center justify-content-center">
									<Spinner
										as="span"
										animation="grow"
										size="sm"
										role="status"
										aria-hidden="true"
									/>
									Loading...
								</div>)
								: (isRequestTagFailed
									? (<TagErrorAlert errorAlertMsg={requestTagErrMsg} />)
									: (<Table striped hover bordered size="sm" className="tag-table">
										<thead>
											<tr>
												<th width="60%">Tag Name</th>
												<th width="20%">Seq</th>
												<th width="20%">Action</th>
											</tr>
										</thead>
										<tbody>
											{tags.map((tag) => {
												return (
													<tr tag-id={tag.tag_id} key={tag.tag_id}>
														<td name='tag-name'>{tag.tag_name}</td>
														<td name='tag-seq'>{tag.seq}</td>
														<td name='tag-action-button'>
															<Button tag-id={tag.tag_id} tag-name={tag.tag_name} className="mb-1 mx-1"
																variant="success" name="update"
																size="sm" onClick={onSelectUpdateTag}>
																Update
															</Button>
															<Button tag-id={tag.tag_id} tag-name={tag.tag_name} className="mb-1 mx-1"
																variant="danger" name="delete"
																size="sm" onClick={onSelectDeleteTag}>
																Delete
															</Button>
															{/* <Button className="hidden-button mb-1 mx-1" variant="primary" name="save"
																	size="sm" onClick={onUpdateTag}>
																	Save
																</Button>
																<Button className="hidden-button mb-1 mx-1" variant="secondary" name="cancel"
																	size="sm" onClick={onCancelUpdateTag}>
																	Cancel
																</Button> */
															}
														</td>
													</tr>
												)
											})
											}
										</tbody>
									</Table>
									)
								)
							}
						</Col>
					</Row>
				</Col>
				<TagConfigCreate />
				<TagConfigDelete />
			</Row>
		);
	}


}


export default connect(mapStateToProps, mapDispatchToProps)(TagConfig)