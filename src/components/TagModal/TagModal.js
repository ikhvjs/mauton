import React , { Component } from 'react';
import { connect } from 'react-redux';
import { 
	requestTagModalAct,
	closeTagModalAct,
	searchTagModalAct,
	selectSearchTagModalAct,
	clearSearchTagModalAct,
	selectTagModalAct
} from './TagModalAction';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Form, Button, Col, Modal} from "react-bootstrap";
// import './TagModal.css'

const mapStateToProps = (state) => {
  return {
  	blogCategory:state.blogRdc.blogCategory,
  	isShowTagModal:state.blogRdc.isShowTagModal,
  	isRefreshCategoryNeeded:state.blogRdc.isRefreshCategoryNeeded
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestTagModal:()=>
			dispatch(requestTagModalAct()),
		onCloseTagModal:() =>
			dispatch(closeTagModalAct()),
		onSearchTagModal:(event)=>
			dispatch(searchTagModalAct(selectSearchTagModalAct(event))),
		onClearSearchTagModal:(event) =>
			dispatch(clearSearchTagModalAct(event)),
		onSelectTagModal:(event)=>
			dispatch(selectTagModalAct(event))
	}	
}

class TagModal extends Component  {

	componentDidMount() {
		this.props.onRequestTagModal();
	}

	componentDidUpdate() {
		if (this.props.isRefreshCategoryNeeded === true) {
			this.props.onRequestTagModal();
		}
	}

	render() {
		const { isShowTagModal,
				onCloseTagModal,
				blogCategory,
				onSearchTagModal,
				onClearSearchTagModal,
				onSelectTagModal
				// isCreateActionMenu2,
				// onSelectUpdateTagModal
			} = this.props;

		return (
			<Modal size="lg" show={isShowTagModal} onHide={onCloseTagModal}>
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
							<Button size="sm" onClick={onSearchTagModal}>Search</Button>
						</Col>
						<Col name='button' xs={0.3}>
							<Button size="sm" variant="secondary" 
								onClick={onClearSearchTagModal}>
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
										onClick={onSelectTagModal} >
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
		          <Button variant="secondary" onClick={onCloseTagModal}>
		            Close
		          </Button>
		        </Modal.Footer>
		    </Modal>



		)


	}

}


export default connect(mapStateToProps, mapDispatchToProps)(TagModal)