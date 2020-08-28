import React , { Component } from 'react';
import { connect } from 'react-redux';
import { 
	requestMenu2Act,
	requestMenu2ByClickAct,
	postMenu2Act,
	clearCreateMenu2Act,
	selectCreateMenu2Act,
	deleteMenu2Act,
	selectDeleteMenu2Act,
	selectSearchMenu2Act,
	searchMenu2Act,
	beforeUpdateMenu2Act,
	afterUpdateMenu2Act,
	updateMenu2Act,
	cancelUpdateMenu2Act,
	clearSearchMenu2Act,
	selectCreateParentMenuNameAct,
	selectUpdateParentMenuNameAct,
	setNotAllowUpdateParentMenuNameAct
	// changeParentMenuNameAct
} from './Menu2Action';

import ParentMenuModal from '../../components/ParentMenuModal/ParentMenuModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Form, Button, Col} from "react-bootstrap";
// import './Menu2.css'

const mapStateToProps = (state) => {
  return {
  	menus2: state.menuRdc.menus2,
  	isShowParentMenuModal: state.menuRdc.isShowParentMenuModal,
    beforeUpdateMenu2: state.menuRdc.beforeUpdateMenu2,
  	isRefreshMenu2Needed:state.menuRdc.isRefreshMenu2Needed,
  	createParentMenu: state.menuRdc.createParentMenu,
  	// updateParentMenu: state.menuRdc.updateParentMenu,
  	isAllowUpdateParentMenuName :state.menuRdc.isAllowUpdateParentMenuName,
  	isCreateActionMenu2:state.menuRdc.isCreateActionMenu2,
  	updateParentMenu:state.menuRdc.updateParentMenu
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
	    onRequestMenu2: () => 
	    	dispatch(requestMenu2Act()),
		onCreateMenu2:(event) =>
			dispatch(postMenu2Act(selectCreateMenu2Act(event))),
		onClearCreateMenu2:(event) =>
			dispatch(clearCreateMenu2Act(event)),
		onRequestMenu2ByClick:() =>
			dispatch(requestMenu2ByClickAct()),
		onDeleteMenu2:(event) =>
			dispatch(deleteMenu2Act(selectDeleteMenu2Act(event))),
		onSearchMenu2:(event) =>
			dispatch(searchMenu2Act(selectSearchMenu2Act(event))),
		onSelectToUpdateMenu2:(event) => 
			dispatch(beforeUpdateMenu2Act(event)),
		onUpdateMenu2:(event) => 
			dispatch(updateMenu2Act(afterUpdateMenu2Act(event))),
		onCancelUpdateMenu2:(event) =>
			dispatch(cancelUpdateMenu2Act(event)),
		onClearSearchMenu2:(event) =>
			dispatch(clearSearchMenu2Act(event)),
		onSelectCreateParentMenuName:() =>
			dispatch(selectCreateParentMenuNameAct()),
		onSelectUpdateParentMenuName:() =>
			dispatch(selectUpdateParentMenuNameAct()),
		setNotAllowUpdateParentMenuName:()=>
			dispatch(setNotAllowUpdateParentMenuNameAct()),
		// onChangeParentMenuName:(event)=>
		// 	dispatch(changeParentMenuNameAct(event))
	}
}

class Menu2 extends Component  {

	componentDidMount() {
		this.props.onRequestMenu2();
		this.props.setNotAllowUpdateParentMenuName();
	}

	componentDidUpdate(prevProps) {
		if (this.props.isRefreshMenu2Needed === true) {
			this.props.onRequestMenu2ByClick();
		}
	}

	render() {

		const { menus2,
				onCreateMenu2,
				onDeleteMenu2,
				onSearchMenu2,
				onSelectToUpdateMenu2,
				onUpdateMenu2,
				onCancelUpdateMenu2,
				onClearSearchMenu2,
				isShowParentMenuModal,
				onSelectCreateParentMenuName,
				createParentMenu,
				onClearCreateMenu2,
				isAllowUpdateParentMenuName,
				isCreateActionMenu2,
				updateParentMenu,
				onSelectUpdateParentMenuName,
				beforeUpdateMenu2
				// onChangeParentMenuName
			} = this.props;

			// console.log('updateParentMenu', updateParentMenu);
			console.log('beforeUpdateMenu2', beforeUpdateMenu2);
			console.log('isAllowUpdateParentMenuName', isAllowUpdateParentMenuName);
			// menus2.map((menu)=>{
			// 	// isAllowUpdateParentMenuName&&(beforeUpdateMenu2.menu_id === menu.menu_id)
			// 	console.log('beforeUpdateMenu2.menu_id', beforeUpdateMenu2.menu_id);
			// 	console.log('menu.menu_id',menu.menu_id);
			// 	console.log('===',Number(beforeUpdateMenu2.menu_id) === Number(menu.menu_id));
			// 	console.log('updateParentMenu.menu_id', updateParentMenu.menu_id);
			// 	console.log('===2',Number(updateParentMenu.menu_id) === Number(menu.menu_id));

			// });

		return (
			<React.Fragment>
				<br/>
				<Form.Row>
					<Col xs={3}>
						<Form.Control size="sm" name="menu_name"
							type="text" placeholder="Enter Menu Name" />
					</Col>
					<Col xs={3}>
						<Form.Control size="sm" name="parent_menu_name"
							type="text" placeholder="Enter Parent Menu Name" />
					</Col>
					<Col xs={2}>
						<Form.Control size="sm" name="menu_path"
							type="text" placeholder="Enter Menu Path" />
					</Col>
					<Col name='button' xs={0.3}>   
						<Button size="sm" onClick={onSearchMenu2}>Search</Button>
					</Col>
					<Col name='button' xs={0.3}>
						<Button size="sm" variant="secondary" onClick={onClearSearchMenu2}>Clear</Button>
					</Col>
				</Form.Row>
				<br/>
				<Table striped  hover size="sm" className="menu2-table">
				  <thead>
				    <tr>
				      <th width="20%">Menu Name</th>
				      <th width="20%">Parent Menu Name</th>
				      <th width="10%">Menu Path</th>
				      <th width="10%">Seq</th>
				      <th width="10%">Action</th>
				    </tr>
				  </thead>
				  <tbody>
				  <tr id='new'>
				      <td><Form.Control  size="sm" name="menu_name" 
				      	type="text" placeholder="Enter Menu Name" /></td>
				      <td id={createParentMenu.menu_id}>
				      	<Form.Control  onClick={onSelectCreateParentMenuName} 
				      		size="sm" name="parent_menu_name" type="text" 
				      		placeholder="Click to select Parent Menu" 
				      		defaultValue={createParentMenu.menu_name}
				      		readOnly
				      	/>
				      </td>
				      <td><Form.Control  size="sm" name="menu_path" 
				      	type="text" placeholder="Enter Menu Path" /></td>
				      <td><Form.Control  size="sm" name="seq" 
				      	type="text" placeholder="Enter seq" /></td>
				      <td headers='button'>
				      	<Button name="create" onClick={onCreateMenu2} 
				      		variant="primary" size="sm">
				      		Create
				      	</Button>{" "}
				      	<Button name="create" onClick={onClearCreateMenu2} 
				      		variant="secondary" size="sm">
				      		Clear
				      	</Button>
				      </td>
				    </tr>
				  	{menus2.map((menu)=>{
				  		return(
				  			<tr id={menu.menu_id} key={menu.menu_id}>
						      <td name='menu_name'>{menu.menu_name}</td>
						      <td id={updateParentMenu.menu_id?updateParentMenu.menu_id:menu.parent_menu_id} 
						      	name='parent_menu_name' 
						      	onClick={( isAllowUpdateParentMenuName
						      				&&( Number(beforeUpdateMenu2.menu_id) === Number(menu.menu_id) ))
						      				?onSelectUpdateParentMenuName
						      				:null
						      			}
						      >
						      		{(isAllowUpdateParentMenuName
						      			&&( Number(beforeUpdateMenu2.menu_id) === Number(menu.menu_id) ))
						      			?(updateParentMenu.menu_name?
						      				updateParentMenu.menu_name
						      				:beforeUpdateMenu2.parent_menu_name)
						      			:(menu.parent_menu_name)}
						      </td>
						      <td name='menu_path'>{menu.menu_path}</td>
						      <td name='seq'>{menu.seq}</td>
						      <td headers='button'>
						      	<Button variant="success" name="update"
						      	size="sm" onClick={onSelectToUpdateMenu2}>
						      		Update
						      	</Button>{" "}
								<Button variant="danger" name="delete"
								size="sm" onClick={onDeleteMenu2}>
									Delete
								</Button>{" "}
								<Button className="hidden-button" variant="primary" name="save"
								size="sm" onClick={onUpdateMenu2}>
									Save
								</Button>{" "}
								<Button className="hidden-button" variant="secondary" name="cancel"
								size="sm" onClick={onCancelUpdateMenu2}>
									Cancel
								</Button>
							  </td>
						    </tr>
				  		)})
				  	}
				  </tbody>
				</Table>
				<ParentMenuModal isShowParentMenuModal={isShowParentMenuModal}
					isCreateActionMenu2={isCreateActionMenu2}/>
			</React.Fragment>
		)
	}


}

export default connect(mapStateToProps, mapDispatchToProps)(Menu2)