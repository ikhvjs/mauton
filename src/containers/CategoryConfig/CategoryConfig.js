import React , { Component } from 'react';
import { connect } from 'react-redux';
import { 
	requestCategoryAct,
	requestCategoryByClickAct,
	postCategoryAct,
	selectCreateCategoryAct,
	deleteCategoryAct,
	selectDeleteCategoryAct,
	selectSearchCategoryAct,
	searchCategoryAct,
	beforeUpdateCategoryAct,
	afterUpdateCategoryAct,
	updateCategoryAct,
	updateCancelCategoryAct,
	clearSearchCategoryAct
} from './CategoryConfigAction';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Form, Button, Col} from "react-bootstrap";
import './CategoryConfig.css'


const mapStateToProps = (state) => {
  return {
    categories: state.categoryRdc.categories,
    beforeUpdateCategory: state.categoryRdc.beforeUpdateCategory,
  	isRefreshCategoryNeeded:state.categoryRdc.isRefreshCategoryNeeded
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
	    onRequestCategory: () => 
	    	dispatch(requestCategoryAct()),
		onCreateCategory:(event) =>
			dispatch(postCategoryAct(selectCreateCategoryAct(event))),
		onRequestCategoryByClick:() =>
			dispatch(requestCategoryByClickAct()),
		onDeleteCategory:(event) =>
			dispatch(deleteCategoryAct(selectDeleteCategoryAct(event))),
		onSearchCategory:(event) =>
			dispatch(searchCategoryAct(selectSearchCategoryAct(event))),
		onSelectToUpdateCategory:(event) => 
			dispatch(beforeUpdateCategoryAct(event)),
		onUpdateCategory:(event) => 
			dispatch(updateCategoryAct(afterUpdateCategoryAct(event))),
		onCancelUpdateCategory:(event) =>
			dispatch(updateCancelCategoryAct(event)),
		onClearSearchCategory:(event) =>
			dispatch(clearSearchCategoryAct(event))

	}
}


// const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
//     return {
//         onUpdateCategory2:(event) => 
//         	propsFromDispatch.onUpdateCategory1(propsFromState.updatedCategory)(event)
//     };
// };

class CategoryConfig extends Component  {

	componentDidMount() {
		this.props.onRequestCategory();
	}

	componentDidUpdate(prevProps) {
		if (this.props.isRefreshCategoryNeeded === true) {
					this.props.onRequestCategoryByClick();
		}
	}


	render() {

		const { categories,
				onCreateCategory,
				onDeleteCategory,
				onSearchCategory,
				onSelectToUpdateCategory,
				onUpdateCategory,
				onCancelUpdateCategory,
				onClearSearchCategory
			} = this.props;




		return (
			<React.Fragment>
			<h3>Blog Category</h3>
			<br/>
			<Form.Row>
				<Col xs={3}>
					<Form.Control size="sm" name="blog_category_name"
						type="text" placeholder="Enter Category Name" />
				</Col>
				<Col xs={7}>
					<Form.Control size="sm" name="blog_category_desc"
						type="text" placeholder="Enter Category Description" />
				</Col>
				<Col name='button' xs={0.3}>
					<Button size="sm" onClick={onSearchCategory}>Search</Button>
				</Col>
				<Col name='button' xs={0.3}>
					<Button size="sm" variant="secondary" onClick={onClearSearchCategory}>Clear</Button>
				</Col>
			</Form.Row>
			<br/>
			<Table striped  hover size="sm" className="category-table">
			  <thead>
			    <tr>
			      <th width="20%">Category Name</th>
			      <th width="50%">Category Description</th>
			      <th width="10%">Seq</th>
			      <th width="20%">Action</th>
			    </tr>
			  </thead>
			  <tbody>
			  <tr id='new'>
			      <td><Form.Control  size="sm" name="blog_category_name" 
			      	type="text" placeholder="Enter Category Name" /></td>
			      <td><Form.Control  size="sm" name="blog_category_desc" 
			      	type="text" placeholder="Enter Category Description" /></td>
			      <td><Form.Control  size="sm" name="seq" 
			      	type="text" placeholder="Enter seq" /></td>
			      <td headers='button'>
			      	<Button name="create" onClick={onCreateCategory} 
			      		variant="primary" size="sm">
			      		Create
			      	</Button>
			      </td>
			    </tr>
			  	{categories.map((category)=>{
			  		return(
			  			<tr id={category.blog_category_id} key={category.blog_category_id}>
					      <td name='blog_category_name'>{category.blog_category_name}</td>
					      <td name='blog_category_desc'>{category.blog_category_desc}</td>
					      <td name='seq'>{category.seq}</td>
					      <td headers='button'>
					      	<Button variant="success" name="update"
					      	size="sm" onClick={onSelectToUpdateCategory}>
					      		Update
					      	</Button>{" "}
							<Button variant="danger" name="delete"
							size="sm" onClick={onDeleteCategory}>
								Delete
							</Button>{" "}
							<Button className="hidden-button" variant="primary" name="save"
							size="sm" onClick={onUpdateCategory}>
								Save
							</Button>{" "}
							<Button className="hidden-button" variant="secondary" name="cancel"
							size="sm" onClick={onCancelUpdateCategory}>
								Cancel
							</Button>
						  </td>
					    </tr>
			  		)})
			  	}
			  </tbody>
			</Table>
			</React.Fragment>
		);
	}


}

// export default CategoryConfig;
export default connect(mapStateToProps, mapDispatchToProps)(CategoryConfig)