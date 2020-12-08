import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	requestCategoryAct,
	searchCategoryAct,
	onchangeSearchCategoryNameAct,
	onchangeSearchCategoryDescAct,
	clearSearchCategoryAct,
	selectCreateCategoryAct,
	selectDeleteCategoryAct,
	selectUpdateCategoryAct,
	setPageAct
} from './CategoryConfigAction';
import { LoadingBar } from '../../components/LoadingBar/LoadingBar';
import { Table, Form, Button, Col, Row} from "react-bootstrap";
import './CategoryConfig.css'

import CategoryConfigCreate from './CategoryConfigCreate';
import CategoryConfigDelete from './CategoryConfigDelete';
import CategoryConfigUpdate from './CategoryConfigUpdate';
import RequestErrorAlert from '../../components/RequestErrorAlert/RequestErrorAlert';
import Pagination from "react-js-pagination";

const mapStateToProps = (state) => {
	return {
		categories: state.categoryRdc.categories,
		isRefreshCategoryNeeded: state.categoryRdc.isRefreshCategoryNeeded,
		isPendingRequestCategory: state.categoryRdc.isPendingRequestCategory,
		isRequestCategoryFailed: state.categoryRdc.isRequestCategoryFailed,
		searchCategoryName: state.categoryRdc.searchCategoryName,
		searchCategoryDesc: state.categoryRdc.searchCategoryDesc,
		itemPerPage: state.categoryRdc.itemPerPage,
		displayCategories: state.categoryRdc.displayCategories,
		selectedPage: state.categoryRdc.selectedPage,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestCategory: () =>
			dispatch(requestCategoryAct()),
		onSearchCategory: () =>
			dispatch(searchCategoryAct()),
		onChangeSearchCategoryName: (event) =>
			dispatch(onchangeSearchCategoryNameAct(event)),
		onChangeSearchCategoryDesc: (event) =>
			dispatch(onchangeSearchCategoryDescAct(event)),
		onClearSearchCategory: () =>
			dispatch(clearSearchCategoryAct()),
		onSelectCreateCategory: () =>
			dispatch(selectCreateCategoryAct()),
		onSelectDeleteCategory: (event) =>
			dispatch(selectDeleteCategoryAct(event)),
		onSelectUpdateCategory: (event) =>
			dispatch(selectUpdateCategoryAct(event)),
		onSetPage: (page) =>
			dispatch(setPageAct(page))
	}
}

class CategoryConfig extends Component {

	componentDidMount() {
		this.props.onRequestCategory();
	}

	componentDidUpdate() {
		if (this.props.isRefreshCategoryNeeded === true) {
			this.props.onRequestCategory();
		}
	}


	render() {

		const { categories,
			searchCategoryName,
			searchCategoryDesc,
			onSearchCategory,
			onChangeSearchCategoryName,
			onChangeSearchCategoryDesc,
			onClearSearchCategory,
			onSelectCreateCategory,
			onSelectUpdateCategory,
			onSelectDeleteCategory,
			isPendingRequestCategory,
			isRequestCategoryFailed,
			onSetPage,
			displayCategories,
			itemPerPage,
			selectedPage,
		} = this.props;




		return (
			<Row id="category-config-container">
				<Col id="category-config-wrapper">
					<Row className="mb-1 px-3">
						<Col>
							<h3>Category</h3>
						</Col>
					</Row>
					<Row className="mb-1 px-3">
						<Col xs={4} sm={4} md={3} className="mb-1">
							<Form.Control
								size="sm"
								name="category-name"
								type="text"
								placeholder="Category Name"
								value={searchCategoryName}
								onChange={onChangeSearchCategoryName}
							/>
						</Col>
						<Col xs={4} sm={4} md={3} className="mb-1">
							<Form.Control
								size="sm"
								name="category-desc"
								type="text"
								placeholder="Category Desc"
								value={searchCategoryDesc}
								onChange={onChangeSearchCategoryDesc}
							/>
						</Col>
						<Col name='button' xs={2} sm={2} md={1}>
							<Button name="search" size="sm" onClick={onSearchCategory}>Search</Button>
						</Col>
						<Col name='button' xs={2} sm={2} md={2}>
							<Button name="clear" size="sm" variant="secondary" onClick={onClearSearchCategory}>Clear</Button>
						</Col>
						<Col xs={6} sm={2} md={3}>
							<Button name="create" variant="success" size="sm" onClick={onSelectCreateCategory}> Create </Button>
						</Col>
					</Row>

					<Row className="my-1 px-3">
						<Col>
							{(isPendingRequestCategory)
								? (<LoadingBar />)
								: (isRequestCategoryFailed
									? (<RequestErrorAlert />)
									: (<Table striped hover bordered size="sm">
										<thead>
											<tr>
												<th width="30%">Category Name</th>
												<th width="40%">Category Desc</th>
												<th width="10%">Seq</th>
												<th width="20%">Action</th>
											</tr>
										</thead>
										<tbody>
											{displayCategories.map((category) => {
												return (
													<tr id={category.blog_category_id} key={category.blog_category_id}>
														<td name='category-name'>{category.blog_category_name}</td>
														<td name='category-desc'>{category.blog_category_desc}</td>
														<td name='category-seq'>{category.seq}</td>
														<td name='category-action-button'>
															<Button
																category-id={category.blog_category_id}
																category-name={category.blog_category_name}
																category-desc={category.blog_category_desc}
																category-seq={category.seq}
																className="mb-1 mx-1"
																variant="success"
																name="update"
																size="sm" onClick={onSelectUpdateCategory}>
																Update
															</Button>
															<Button
																category-id={category.blog_category_id}
																category-name={category.blog_category_name}
																className="mb-1 mx-1"
																variant="danger"
																name="delete"
																size="sm" onClick={onSelectDeleteCategory}>
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
								totalItemsCount={categories.length}
								pageRangeDisplayed={5}
								onChange={onSetPage}
							/>
						</Col>
					</Row>
				</Col>
				<CategoryConfigCreate />
				<CategoryConfigDelete />
				<CategoryConfigUpdate />
			</Row>

		);
	}


}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryConfig)