import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	requestTagAct,
	onchangeSearchTagNameAct,
	searchTagAct,
	clearSearchTagAct,
	selectCreateTagAct,
	selectDeleteTagAct,
	selectUpdateTagAct,
	setPageAct
} from './TagConfigAction';
import { LoadingBar } from '../../components/LoadingBar/LoadingBar';
import { Table, Form, Button, Col, Row } from "react-bootstrap";
import './TagConfig.css';
import TagConfigCreate from './TagConfigCreate';
import TagConfigDelete from './TagConfigDelete';
import TagConfigUpdate from './TagConfigUpdate';
import RequestErrorAlert from '../../components/RequestErrorAlert/RequestErrorAlert';
import Pagination from "react-js-pagination";

const mapStateToProps = (state) => {
	return {
		tags: state.tagRdc.tags,
		isRefreshTagNeeded: state.tagRdc.isRefreshTagNeeded,
		isPendingRequestTag: state.tagRdc.isPendingRequestTag,
		isRequestTagFailed: state.tagRdc.isRequestTagFailed,
		searchTagName: state.tagRdc.searchTagName,
		itemPerPage: state.tagRdc.itemPerPage,
		displayTags: state.tagRdc.displayTags,
		selectedPage: state.tagRdc.selectedPage,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestTag: () =>
			dispatch(requestTagAct()),
		onSearchTag: () =>
			dispatch(searchTagAct()),
		onChangeSearchTagName: (event) =>
			dispatch(onchangeSearchTagNameAct(event)),
		onClearSearchTag: (event) =>
			dispatch(clearSearchTagAct(event)),
		onSelectCreateTag: () =>
			dispatch(selectCreateTagAct()),
		onSelectDeleteTag: (event) =>
			dispatch(selectDeleteTagAct(event)),
		onSelectUpdateTag: (event) =>
			dispatch(selectUpdateTagAct(event)),
		onSetPage: (page) =>
			dispatch(setPageAct(page))


	}
}


class TagConfig extends Component {

	componentDidMount() {
		this.props.onRequestTag();
	}

	componentDidUpdate() {
		if (this.props.isRefreshTagNeeded === true) {
			this.props.onRequestTag();
		}
	}


	render() {

		const { tags,
			searchTagName,
			onSearchTag,
			onChangeSearchTagName,
			onClearSearchTag,
			onSelectCreateTag,
			onSelectUpdateTag,
			onSelectDeleteTag,
			isPendingRequestTag,
			isRequestTagFailed,
			onSetPage,
			displayTags,
			itemPerPage,
			selectedPage,
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
							<Form.Control
								size="sm"
								name="tag-name"
								type="text"
								placeholder="Enter Tag Name"
								value={searchTagName}
								onChange={onChangeSearchTagName}
							/>
						</Col>
						<Col xs={3} sm={2} md={1}>
							<Button name="search" size="sm" onClick={onSearchTag}>Search</Button>
						</Col>
						<Col xs={3} sm={2} md={2}>
							<Button name="clear" size="sm" variant="secondary" onClick={onClearSearchTag}>Clear</Button>
						</Col>
						<Col xs={2} sm={2} md={1}>
							<Button name="create" variant="success" size="sm" onClick={onSelectCreateTag}> Create </Button>
						</Col>
					</Row>
					<Row className="my-1 px-3">
						<Col className="d-flex justify-content-center">
							{(isPendingRequestTag)
								? (<LoadingBar />)
								: (isRequestTagFailed
									? (<RequestErrorAlert />)
									: (<Table striped hover bordered size="sm">
										<thead>
											<tr>
												<th width="60%">Tag Name</th>
												<th width="20%">Seq</th>
												<th width="20%">Action</th>
											</tr>
										</thead>
										<tbody>
											{displayTags.map((tag) => {
												return (
													<tr tag-id={tag.tag_id} key={tag.tag_id}>
														<td name='tag-name'>{tag.tag_name}</td>
														<td name='tag-seq'>{tag.seq}</td>
														<td name='tag-action-button'>
															<Button
																tag-id={tag.tag_id}
																tag-name={tag.tag_name}
																tag-seq={tag.seq}
																className="mb-1 mx-1"
																variant="success"
																name="update"
																size="sm" onClick={onSelectUpdateTag}>
																Update
															</Button>
															<Button
																tag-id={tag.tag_id}
																tag-name={tag.tag_name}
																className="mb-1 mx-1"
																variant="danger"
																name="delete"
																size="sm" onClick={onSelectDeleteTag}>
																Delete
															</Button>
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
					<Row>
						<Col className="d-flex justify-content-center">
							<Pagination
								itemClass="page-item"
								linkClass="page-link"
								activePage={selectedPage}
								itemsCountPerPage={itemPerPage}
								totalItemsCount={tags.length}
								pageRangeDisplayed={5}
								onChange={onSetPage}
							/>
						</Col>
					</Row>
				</Col>
				<TagConfigCreate />
				<TagConfigDelete />
				<TagConfigUpdate />
			</Row>
		);
	}


}


export default connect(mapStateToProps, mapDispatchToProps)(TagConfig)