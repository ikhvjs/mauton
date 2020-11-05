import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	requestCategoryAct,
	requestCategoryByClickAct,
	searchCategoryAct,
	onchangeSearchCategoryNameAct,
	onchangeSearchCategoryDescAct,
	clearSearchCategoryAct,
	selectCreateCategoryAct
	// selectDeleteCategoryAct,
	// selectUpdateCategoryAct

	// postCategoryAct,
	// deleteCategoryAct,
	// selectSearchCategoryAct,
	// beforeUpdateCategoryAct,
	// afterUpdateCategoryAct,
	// updateCategoryAct,
	// updateCancelCategoryAct,
	
} from './CategoryConfigAction';

import { Table, Form, Button, Col, Row, Spinner } from "react-bootstrap";
import './CategoryConfig.css'

import CategoryConfigCreate from './CategoryConfigCreate';
// import CategoryConfigDelete from './CategoryConfigDelete';
// import CategoryConfigUpdate from './CategoryConfigUpdate';
import CategoryConfigErrorAlert   from './CategoryConfigErrorAlert';

const mapStateToProps = (state) => {
	return {
		categories: state.categoryRdc.categories,
		isRefreshCategoryNeeded: state.categoryRdc.isRefreshCategoryNeeded,
		isPendingRequestCategory: state.categoryRdc.isPendingRequestCategory,
		isRequestCategoryFailed: state.categoryRdc.isRequestCategoryFailed,
		searchCategoryName: state.categoryRdc.searchCategoryName,
		searchCategoryDesc: state.categoryRdc.searchCategoryDesc
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestCategory: () =>
			dispatch(requestCategoryAct()),
		onRequestCategoryByClick: () =>
			dispatch(requestCategoryByClickAct()),
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
		// onSelectDeleteCategory: (event) =>
		// 	dispatch(selectDeleteCategoryAct(event)),
		// onSelectUpdateCategory: (event) =>
		// 	dispatch(selectUpdateCategoryAct(event))

		// onCreateCategory:(event) =>
		// 	dispatch(postCategoryAct(selectCreateCategoryAct(event))),	
		// onDeleteCategory:(event) =>
		// 	dispatch(deleteCategoryAct(selectDeleteCategoryAct(event))),
		// onSelectToUpdateCategory:(event) => 
		// 	dispatch(beforeUpdateCategoryAct(event)),
		// onUpdateCategory:(event) => 
		// 	dispatch(updateCategoryAct(afterUpdateCategoryAct(event))),
		// onCancelUpdateCategory:(event) =>
		// 	dispatch(updateCancelCategoryAct(event)),

	}
}


// const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
//     return {
//         onUpdateCategory2:(event) => 
//         	propsFromDispatch.onUpdateCategory1(propsFromState.updatedCategory)(event)
//     };
// };

class CategoryConfig extends Component {

	componentDidMount() {
		this.props.onRequestCategory();
	}

	componentDidUpdate() {
		if (this.props.isRefreshCategoryNeeded === true) {
			this.props.onRequestCategoryByClick();
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
			isRequestCategoryFailed
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
								: (isRequestCategoryFailed
									? (<CategoryConfigErrorAlert />)
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
												{categories.map((category) => {
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
				</Col>
				<CategoryConfigCreate/>
			</Row>

		);
	}


}

// export default CategoryConfig;
export default connect(mapStateToProps, mapDispatchToProps)(CategoryConfig)