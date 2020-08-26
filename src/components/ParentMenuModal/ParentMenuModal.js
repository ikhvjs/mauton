import React , { Component } from 'react';
import { connect } from 'react-redux';
import { 
	requestParentMenuAct,
	closeParentMenuModalAct,
	searchParentMenuAct,
	selectSearchParentMenuAct,
	clearSearchParentMenuAct,
	selectParentMenuAct
} from './ParentMenuModalAction';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Form, Button, Col, Modal} from "react-bootstrap";
// import './ParentMenuModal.css'

const mapStateToProps = (state) => {
  return {
  	parentMenus:state.menuRdc.parentMenus,
  	isRefreshParentMenuNeeded:state.menuRdc.isRefreshParentMenuNeeded
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestParentMenu:()=>
			dispatch(requestParentMenuAct()),
		onCloseParentMenuModal:() =>
			dispatch(closeParentMenuModalAct()),
		onSearchParentMenu:(event)=>
			dispatch(searchParentMenuAct(selectSearchParentMenuAct(event))),
		onClearSearchParentMenu:(event) =>
			dispatch(clearSearchParentMenuAct(event)),
		onSelectParentMenu:(event)=>
			dispatch(selectParentMenuAct(event))
	}
}

class ParentMenuModal extends Component  {

	componentDidMount() {
		this.props.onRequestParentMenu();
	}

	componentDidUpdate(prevProps) {
		if (this.props.isRefreshParentMenuNeeded === true) {
			this.props.onRequestParentMenu();
		}
	}

	render() {
		const { isShowParentMenuModal,
				onCloseParentMenuModal,
				parentMenus,
				onSearchParentMenu,
				onClearSearchParentMenu,
				onSelectParentMenu
			} = this.props;

		return (
			<Modal size="lg" show={isShowParentMenuModal} onHide={onCloseParentMenuModal}>
		        <Modal.Header closeButton>
		          <Modal.Title>Parent Menu</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>
			        <Form.Row>
						<Col xs={3}>
							<Form.Control size="sm" name="menu_name"
								type="text" placeholder="Enter Menu Name" />
						</Col>
						<Col xs={2}>
							<Form.Control size="sm" name="menu_path"
								type="text" placeholder="Enter Menu Path" />
						</Col>
						<Col name='button' xs={0.3}>   
							<Button size="sm" onClick={onSearchParentMenu}>Search</Button>
						</Col>
						<Col name='button' xs={0.3}>
							<Button size="sm" variant="secondary" 
								onClick={onClearSearchParentMenu}>
								Clear
							</Button>
						</Col>
					</Form.Row>
					<br/>
					<Table striped  hover size="sm" className="menu2-table">
					  <thead>
					    <tr>
					      <th width="20%">Menu Name</th>
					      <th width="30%">Menu Path</th>
					      <th width="10%">Seq</th>
					      <th width="20%">Action</th>
					    </tr>
					  </thead>
					  <tbody>
					  	{parentMenus.map((menu)=>{
					  		return(
					  			<tr id={menu.menu_id} key={menu.menu_id}>
							      <td name='menu_name'>{menu.menu_name}</td>
							      <td name='menu_path'>{menu.menu_path}</td>
							      <td name='seq'>{menu.seq}</td>
							      <td headers='button'>
									<Button name="select" size="sm" onClick={onSelectParentMenu} >
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
		          <Button variant="secondary" onClick={onCloseParentMenuModal}>
		            Close
		          </Button>
		        </Modal.Footer>
		    </Modal>



		)


	}

}


export default connect(mapStateToProps, mapDispatchToProps)(ParentMenuModal)