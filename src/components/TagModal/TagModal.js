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
  	blogTag:state.blogRdc.blogTag,
  	isShowTagModal:state.blogRdc.isShowTagModal,
  	isRefreshTagNeeded:state.blogRdc.isRefreshTagNeeded
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
		if (this.props.isRefreshTagNeeded === true) {
			this.props.onRequestTagModal();
		}
	}

	render() {
		const { isShowTagModal,
				onCloseTagModal,
				blogTag,
				onSearchTagModal,
				onClearSearchTagModal,
				onSelectTagModal
			} = this.props;

		return (
			<Modal size="lg" show={isShowTagModal} onHide={onCloseTagModal}>
		        <Modal.Header closeButton>
		          <Modal.Title>Select Blog Category</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>
			        <Form.Row>
						<Col xs={3}>
							<Form.Control size="sm" name="tag_name"
								type="text" placeholder="Enter Tag Name" />
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
					      <th width="20%">Tag Name</th>
					      <th width="10%">Seq</th>
					      <th width="20%">Action</th>
					    </tr>
					  </thead>
					  <tbody>
					  	{blogTag.map((tag)=>{
					  		return(
					  			<tr id={tag.tag_id} key={tag.tag_id}>
							      <td name='tag_name'>{tag.tag_name}</td>
							      <td name='seq'>{tag.seq}</td>
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