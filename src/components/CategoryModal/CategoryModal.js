import React , { Component } from 'react';
import { connect } from 'react-redux';
import { 
	requestCategoryModalAct,
	closeCategoryModalAct,
	searchCategoryModalAct,
	selectSearchCategoryModalAct,
	clearSearchCategoryModalAct,
	selectCategoryModalAct
} from './CategoryModalAction';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Form, Button, Col, Modal} from "react-bootstrap";
// import './CategoryModal.css'

const mapStateToProps = (state) => {
  return {
  	blogCategory:state.blogRdc.blogCategory,
  	isShowCategoryModal:state.blogRdc.isShowCategoryModal,
  	isRefreshCategoryNeeded:state.blogRdc.isRefreshCategoryNeeded
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestCategoryModal:()=>
			dispatch(requestCategoryModalAct()),
		onCloseCategoryModal:() =>
			dispatch(closeCategoryModalAct()),
		onSearchCategoryModal:(event)=>
			dispatch(searchCategoryModalAct(selectSearchCategoryModalAct(event))),
		onClearSearchCategoryModal:(event) =>
			dispatch(clearSearchCategoryModalAct(event)),
		onSelectCategoryModal:(event)=>
			dispatch(selectCategoryModalAct(event))
	}	
}

class CategoryModal extends Component  {

	componentDidMount() {
		// this.props.onRequestCategoryModal();
	}

	componentDidUpdate() {
		if (this.props.isRefreshCategoryNeeded === true) {
			this.props.onRequestCategoryModal();
		}
	}

	render() {
		const { isShowCategoryModal,
				onCloseCategoryModal,
				blogCategory,
				onSearchCategoryModal,
				onClearSearchCategoryModal,
				onSelectCategoryModal
				// isCreateActionMenu2,
				// onSelectUpdateCategoryModal
			} = this.props;

		return (
			<Modal size="lg" show={isShowCategoryModal} onHide={onCloseCategoryModal}>
		        <Modal.Header closeButton>
		          <Modal.Title>Select Blog Category</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>
			        <Form.Row>
						<Col xs={3}>
							<Form.Control size="sm" name="blog_category_name"
								type="text" placeholder="Enter Category Name" />
						</Col>
						<Col xs={5}>
							<Form.Control size="sm" name="blog_category_desc"
								type="text" placeholder="Enter Category Description" />
						</Col>
						<Col name='button' xs={0.3}>   
							<Button size="sm" onClick={onSearchCategoryModal}>Search</Button>
						</Col>
						<Col name='button' xs={0.3}>
							<Button size="sm" variant="secondary" 
								onClick={onClearSearchCategoryModal}>
								Clear
							</Button>
						</Col>
					</Form.Row>
					<br/>
					<Table striped  hover size="sm" >
					  <thead>
					    <tr>
					      <th width="20%">Category Name</th>
					      <th width="30%">Category Description</th>
					      <th width="10%">Seq</th>
					      <th width="20%">Action</th>
					    </tr>
					  </thead>
					  <tbody>
					  	{blogCategory.map((category)=>{
					  		return(
					  			<tr id={category.blog_category_id} key={category.blog_category_id}>
							      <td name='blog_category_name'>{category.blog_category_name}</td>
							      <td name='blog_category_desc'>{category.blog_category_desc}</td>
							      <td name='seq'>{category.seq}</td>
							      <td headers='button'>
									<Button name="select" size="sm" 
										onClick={onSelectCategoryModal} >
										Select
									</Button>
								  </td>
							    </tr>
					  		)})
					  	}
					  </tbody>
					</Table>
		        </Modal.Body>
		        <Modal.Footer>
		          <Button variant="secondary" onClick={onCloseCategoryModal}>
		            Close
		          </Button>
		        </Modal.Footer>
		    </Modal>



		)


	}

}


export default connect(mapStateToProps, mapDispatchToProps)(CategoryModal)