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
	updateCategoryAct,
	selectUpdateCategoryAct
} from './CategoryConfigAction';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Form, Button, Col} from "react-bootstrap";
import './CategoryConfig.css'


const mapStateToProps = (state) => {
  return {
    categories: state.categoryRdc.categories,
  	isRefreshNeeded:state.categoryRdc.isRefreshNeeded
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
		onUpdateCategory:(event) =>
			dispatch(updateCategoryAct(selectUpdateCategoryAct(event)))
	}
}



class CategoryConfig extends Component  {

	componentDidMount() {
		this.props.onRequestCategory();
	}

	componentDidUpdate(prevProps) {
		if (this.props.isRefreshNeeded === true) {
					this.props.onRequestCategoryByClick();
		}
	}

	render() {

		const { categories,
				onCreateCategory,
				onDeleteCategory,
				onSearchCategory,
				onUpdateCategory
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
				<Col>
					<Button size="sm" onClick={onSearchCategory}>Search</Button>
				</Col>
			</Form.Row>
			<br/>
			<Table striped  hover size="sm" className="category-table">
			  <thead>
			    <tr>
			      <th width="20%">Category Name</th>
			      <th width="50%">Category Description</th>
			      <th width="10%">Seq</th>
			      <th width="20%"></th>
			    </tr>
			  </thead>
			  <tbody>
			  <tr type='new'>
			      <td><Form.Control  size="sm" name="blog_category_name" 
			      	type="text" placeholder="Enter Category Name" /></td>
			      <td><Form.Control  size="sm" name="blog_category_desc" 
			      	type="text" placeholder="Enter Category Description" /></td>
			      <td><Form.Control  size="sm" name="seq" 
			      	type="text" placeholder="Enter seq" /></td>
			      <td>
			      	<Button onClick={onCreateCategory} variant="primary" size="sm">
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
					      <td>
					      	<Button variant="success" size="sm" onClick={onUpdateCategory}>
					      		Update
					      	</Button>{" "}
							<Button variant="danger" size="sm" onClick={onDeleteCategory}>
								Delete
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