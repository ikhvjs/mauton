import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	requestTagAct,
	requestTagByClickAct,
	postTagAct,
	// selectCreateTagAct,
	deleteTagAct,
	selectDeleteTagAct,
	selectSearchTagAct,
	searchTagAct,
	beforeUpdateTagAct,
	afterUpdateTagAct,
	updateTagAct,
	updateCancelTagAct,
	clearSearchTagAct,
	onchangeCreateTagNameAct,
	onchangeCreateTagSeqAct,
	clearCreateTagAct
} from './TagConfigAction';

import { Table, Form, Button, Col, Row,Spinner } from "react-bootstrap";
import './TagConfig.css';

import ValidationAlert from '../../components/ValidationAlert/ValidationAlert';


const mapStateToProps = (state) => {
	return {
		tags: state.tagRdc.tags,
		beforeUpdateTag: state.tagRdc.beforeUpdateTag,
		isRefreshTagNeeded: state.tagRdc.isRefreshTagNeeded,
		createTagName: state.tagRdc.createTagName,
		isCreateTagNameValid: state.tagRdc.isCreateTagNameValid,
		createTagNameErrMsg: state.tagRdc.createTagNameErrMsg,
		createTagSeq: state.tagRdc.createTagSeq,
		isCreateTagSeqValid: state.tagRdc.isCreateTagSeqValid,
		createTagSeqErrMsg: state.tagRdc.createTagSeqErrMsg,
		isPendingPostTag:state.tagRdc.isPendingPostTag,
		error:state.tagRdc.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestTag: () =>
			dispatch(requestTagAct()),
		onChangeCreateTagName: (event)=>
			dispatch(onchangeCreateTagNameAct(event)),
		onChangeCreateTagSeq: (event)=>
			dispatch(onchangeCreateTagSeqAct(event)),
		onCreateTag: () =>
			dispatch(postTagAct()),
		onRequestTagByClick: () =>
			dispatch(requestTagByClickAct()),
		onDeleteTag: (event) =>
			dispatch(deleteTagAct(selectDeleteTagAct(event))),
		onSearchTag: (event) =>
			dispatch(searchTagAct(selectSearchTagAct(event))),
		onSelectToUpdateTag: (event) =>
			dispatch(beforeUpdateTagAct(event)),
		onUpdateTag: (event) =>
			dispatch(updateTagAct(afterUpdateTagAct(event))),
		onCancelUpdateTag: (event) =>
			dispatch(updateCancelTagAct(event)),
		onClearSearchTag: (event) =>
			dispatch(clearSearchTagAct(event)),
		onClearCreateTag: ()=>
			dispatch(clearCreateTagAct())

	}
}


class TagConfig extends Component {

	componentDidMount() {
		this.props.onRequestTag();
	}

	componentDidUpdate(prevProps) {
		if (this.props.isRefreshTagNeeded === true) {
			this.props.onRequestTagByClick();
		}
	}


	render() {

		const { tags,
			onCreateTag,
			onClearCreateTag,
			onDeleteTag,
			onSearchTag,
			onSelectToUpdateTag,
			onUpdateTag,
			onCancelUpdateTag,
			onClearSearchTag,
			createTagName,
			onChangeCreateTagName,
			createTagNameErrMsg,
			isCreateTagNameValid,
			createTagSeq,
			onChangeCreateTagSeq,
			createTagSeqErrMsg,
			isCreateTagSeqValid,
			isPendingPostTag

		} = this.props;

		return (
			<Row id="tag-config-container">
				<Col id="tag-config-wrapper">
					<Row className="mb-1 px-3">
						<h3>Tag</h3>
					</Row>
					<Row className="mb-1 px-3">
						<Col sm={4} className="mb-1 px-1">
							<Form.Control size="sm" name="tag_name"
								type="text" placeholder="Enter Tag Name" />
						</Col>
						<Col name='button' xs={3} sm={1} className="mb-1 px-1">
							<Button size="sm" onClick={onSearchTag}>Search</Button>
						</Col>
						<Col name='button' xs={9} sm={2} className="mb-1 px-1">
							<Button size="sm" variant="secondary" onClick={onClearSearchTag}>Clear</Button>
						</Col>
					</Row>
					<Row>
						
					</Row>
					<Row className="my-1 px-3">
						<Table striped hover bordered size="sm" className="tag-table">
							<thead>
								<tr>
									<th width="60%">Tag Name</th>
									<th width="20%">Seq</th>
									<th width="20%">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr id='newTag'>
									<td>
										<Form.Control size="sm" name="tag_name" 
										isValid={isCreateTagNameValid} 
										isInvalid={(isCreateTagNameValid===null)?null:!isCreateTagNameValid}
										type="text" placeholder="Enter Tag Name (Max. length: 20)"
										value={createTagName}
										onChange={onChangeCreateTagName}/>
										<Form.Control.Feedback type="invalid">
										 {createTagNameErrMsg}
										</Form.Control.Feedback>
										<Form.Control.Feedback type="valid">
										 looks good
										</Form.Control.Feedback>
									</td>
									<td>
										<Form.Control size="sm" name="seq"
										isValid={isCreateTagSeqValid} 
										isInvalid={(isCreateTagSeqValid===null)?null:!isCreateTagSeqValid}
										type="text" placeholder="Enter seq" 
										value={createTagSeq}
										onChange={onChangeCreateTagSeq}/>
										<Form.Control.Feedback type="invalid">
										 {createTagSeqErrMsg}
										</Form.Control.Feedback>
										<Form.Control.Feedback type="valid">
										 looks good
										</Form.Control.Feedback>
									</td>
									<td headers='button'>
										{isPendingPostTag?
											(<div className="d-flex align-items-center">
												<Spinner
													as="span"
													animation="grow"
													size="sm"
													role="status"
													aria-hidden="true"
											  	/>
											  	Loading...
											</div>)
											:(<div>
												<Button 
													className="mb-1 mx-1" 
													name="create" onClick={onCreateTag}
													variant="primary" size="sm"
													disabled={!isCreateTagNameValid||!isCreateTagSeqValid}>
													Create
												</Button>
												<Button 
													className="mb-1 mx-1" 
													name="clear-create" onClick={onClearCreateTag}
													variant="secondary"  size="sm">
														Clear
												</Button>
											</div>
											)
										}
										<ValidationAlert/>
									</td>
								</tr>
								{tags.map((tag) => {
									return (
										<tr id={tag.tag_id} key={tag.tag_id}>
											<td name='tag_name'>{tag.tag_name}</td>
											<td name='seq'>{tag.seq}</td>
											<td headers='button'>
												<Button className="mb-1 mx-1" 
													variant="success" name="update"
													size="sm" onClick={onSelectToUpdateTag}>
													Update
												</Button>
												<Button className="mb-1 mx-1"
													variant="danger" name="delete"
													size="sm" onClick={onDeleteTag}>
													Delete
												</Button>
												<Button className="hidden-button mb-1 mx-1" variant="primary" name="save"
													size="sm" onClick={onUpdateTag}>
													Save
												</Button>
												<Button className="hidden-button mb-1 mx-1" variant="secondary" name="cancel"
													size="sm" onClick={onCancelUpdateTag}>
													Cancel
												</Button>
											</td>
										</tr>
									)
								})
								}
							</tbody>
						</Table>
					</Row>
				</Col>
			</Row>
		);
	}


}


export default connect(mapStateToProps, mapDispatchToProps)(TagConfig)