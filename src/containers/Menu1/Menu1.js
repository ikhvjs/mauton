import React , { Component } from 'react';
import { connect } from 'react-redux';
import { 
	requestMenu1Act,
	requestMenu1ByClickAct,
	postMenu1Act,
	selectCreateMenu1Act,
	deleteMenu1Act,
	selectDeleteMenu1Act,
	selectSearchMenu1Act,
	searchMenu1Act,
	beforeUpdateMenu1Act,
	afterUpdateMenu1Act,
	updateMenu1Act,
	cancelUpdateMenu1Act,
	clearSearchMenu1Act
} from './Menu1Action';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Form, Button, Col} from "react-bootstrap";
// import './Menu1.css'

const mapStateToProps = (state) => {
  return {
  	menus1: state.menuRdc.menus1,
    beforeUpdateMenu1: state.menuRdc.beforeUpdateMenu1,
  	isRefreshMenu1Needed:state.menuRdc.isRefreshMenu1Needed,
  	isRefreshTopbarNeeded:state.menuRdc.isRefreshTopbarNeeded
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
	    onRequestMenu1: () => 
	    	dispatch(requestMenu1Act()),
		onCreateMenu1:(event) =>
			dispatch(postMenu1Act(selectCreateMenu1Act(event))),
		onRequestMenu1ByClick:() =>
			dispatch(requestMenu1ByClickAct()),
		onDeleteMenu1:(event) =>
			dispatch(deleteMenu1Act(selectDeleteMenu1Act(event))),
		onSearchMenu1:(event) =>
			dispatch(searchMenu1Act(selectSearchMenu1Act(event))),
		onSelectToUpdateMenu1:(event) => 
			dispatch(beforeUpdateMenu1Act(event)),
		onUpdateMenu1:(event) => 
			dispatch(updateMenu1Act(afterUpdateMenu1Act(event))),
		onCancelUpdateMenu1:(event) =>
			dispatch(cancelUpdateMenu1Act(event)),
		onClearSearchMenu1:(event) =>
			dispatch(clearSearchMenu1Act(event))
	}
}

class Menu1 extends Component  {

	componentDidMount() {
		this.props.onRequestMenu1();
	}

	componentDidUpdate(prevProps) {
		if (this.props.isRefreshMenu1Needed === true) {
			this.props.onRequestMenu1ByClick();

			if(this.props.isRefreshTopbarNeeded === true) {
				this.props.onRequestTopbar();
			}
		}
		
	}

	render() {

		const { menus1,
				onCreateMenu1,
				onDeleteMenu1,
				onSearchMenu1,
				onSelectToUpdateMenu1,
				onUpdateMenu1,
				onCancelUpdateMenu1,
				onClearSearchMenu1
			} = this.props;

		return (
			<React.Fragment>
				<br/>
				<Form.Row>
					<Col xs={3}>
						<Form.Control size="sm" name="menu_name"
							type="text" placeholder="Enter Menu Name" />
					</Col>
					<Col xs={7}>
						<Form.Control size="sm" name="menu_path"
							type="text" placeholder="Enter Menu Path" />
					</Col>
					<Col name='button' xs={0.3}>   
						<Button size="sm" onClick={onSearchMenu1}>Search</Button>
					</Col>
					<Col name='button' xs={0.3}>
						<Button size="sm" variant="secondary" onClick={onClearSearchMenu1}>Clear</Button>
					</Col>
				</Form.Row>
				<br/>
				<Table striped  hover size="sm" className="menu1-table">
				  <thead>
				    <tr>
				      <th width="20%">Menu Name</th>
				      <th width="50%">Menu Path</th>
				      <th width="10%">Seq</th>
				      <th width="20%">Action</th>
				    </tr>
				  </thead>
				  <tbody>
				  <tr id='new'>
				      <td><Form.Control  size="sm" name="menu_name" 
				      	type="text" placeholder="Enter Menu Name" /></td>
				      <td><Form.Control  size="sm" name="menu_path" 
				      	type="text" placeholder="Enter Menu Path" /></td>
				      <td><Form.Control  size="sm" name="seq" 
				      	type="text" placeholder="Enter seq" /></td>
				      <td headers='button'>
				      	<Button name="create" onClick={onCreateMenu1} 
				      		variant="primary" size="sm">
				      		Create
				      	</Button>
				      </td>
				    </tr>
				  	{menus1.map((menu)=>{
				  		return(
				  			<tr id={menu.menu_id} key={menu.menu_id}>
						      <td name='menu_name'>{menu.menu_name}</td>
						      <td name='menu_path'>{menu.menu_path}</td>
						      <td name='seq'>{menu.seq}</td>
						      <td headers='button'>
						      	<Button variant="success" name="update"
						      	size="sm" onClick={onSelectToUpdateMenu1}>
						      		Update
						      	</Button>{" "}
								<Button variant="danger" name="delete"
								size="sm" onClick={onDeleteMenu1}>
									Delete
								</Button>{" "}
								<Button className="hidden-button" variant="primary" name="save"
								size="sm" onClick={onUpdateMenu1}>
									Save
								</Button>{" "}
								<Button className="hidden-button" variant="secondary" name="cancel"
								size="sm" onClick={onCancelUpdateMenu1}>
									Cancel
								</Button>
							  </td>
						    </tr>
				  		)})
				  	}
				  </tbody>
				</Table>
			</React.Fragment>
		)
	}


}

export default connect(mapStateToProps, mapDispatchToProps)(Menu1)