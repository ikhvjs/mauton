import React , { Component } from 'react';
import { connect } from 'react-redux';
import { 
	requestMenu1Act,
	searchMenu1Act,
	onchangeSearchMenu1NameAct,
	clearSearchMenu1Act,
	selectCreateMenu1Act,
	selectDeleteMenu1Act,
	selectUpdateMenu1Act
} from './Menu1Action';
import {  requestTopbarAct } from '../Topbar/TopbarAction';

import { Table, Form, Button, Col, Row, Spinner } from "react-bootstrap";
import './Menu1.css';
import Menu1Create from './Menu1Create';
import Menu1Delete from './Menu1Delete';
import Menu1Update from './Menu1Update';
import RequestErrorAlert from '../../components/RequestErrorAlert/RequestErrorAlert';

const mapStateToProps = (state) => {
  return {
	menu1: state.menu1Rdc.menu1,
	isRefreshMenu1Needed: state.menu1Rdc.isRefreshMenu1Needed,
	isRefreshTopbarNeeded: state.menu1Rdc.isRefreshTopbarNeeded,
	isPendingRequestMenu1: state.menu1Rdc.isPendingRequestMenu1,
	isRequestMenu1Failed: state.menu1Rdc.isRequestMenu1Failed,
	searchMenu1Name: state.menu1Rdc.searchMenu1Name
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
	    onRequestMenu1: () => 
	    	dispatch(requestMenu1Act()),
		onSearchMenu1:() =>
			dispatch(searchMenu1Act()),
		onChangeSearchMenu1Name: (event) =>
			dispatch(onchangeSearchMenu1NameAct(event)),
		onClearSearchMenu1:() =>
			dispatch(clearSearchMenu1Act()),
		onRequestTopbar:()=>
			dispatch(requestTopbarAct()),
		onSelectCreateMenu1: () =>
			dispatch(selectCreateMenu1Act()),
		onSelectDeleteMenu1: (event) =>
			dispatch(selectDeleteMenu1Act(event)),
		onSelectUpdateMenu1: (event) =>
			dispatch(selectUpdateMenu1Act(event))
	}
}

class Menu1 extends Component  {

	componentDidMount() {
		this.props.onRequestMenu1();
	}

	componentDidUpdate() {
		if (this.props.isRefreshMenu1Needed === true) {
			this.props.onRequestMenu1();
			if(this.props.isRefreshTopbarNeeded === true) {
				this.props.onRequestTopbar();
			}
		}
		
	}

	render() {

		const { menu1,
			onSearchMenu1,
			searchMenu1Name,
			onChangeSearchMenu1Name,
			onClearSearchMenu1,
			onSelectCreateMenu1,
			onSelectUpdateMenu1,
			onSelectDeleteMenu1,
			isPendingRequestMenu1,
			isRequestMenu1Failed
		} = this.props;




		return (
			<Row id="menu1-config-container">
				<Col id="menu1-config-wrapper">
					<Row className="mb-1 px-3">
						<Col>
							<h3>Topbar Menu</h3>
						</Col>
					</Row>
					<Row className="mb-1 px-3">
						<Col xs={4} sm={4} md={3} className="mb-1">
							<Form.Control
								size="sm"
								name="menu1-name"
								type="text"
								placeholder="Menu Name"
								value={searchMenu1Name}
								onChange={onChangeSearchMenu1Name}
							/>
						</Col>
						<Col name='button' xs={2} sm={2} md={1}>
							<Button name="search" size="sm" onClick={onSearchMenu1}>Search</Button>
						</Col>
						<Col name='button' xs={2} sm={2} md={2}>
							<Button name="clear" size="sm" variant="secondary" onClick={onClearSearchMenu1}>Clear</Button>
						</Col>
						<Col xs={6} sm={2} md={3}>
							<Button name="create" variant="success" size="sm" onClick={onSelectCreateMenu1}> Create </Button>
						</Col>
					</Row>

					<Row className="my-1 px-3">
						<Col>
							{(isPendingRequestMenu1)
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
								: (isRequestMenu1Failed
									? (<RequestErrorAlert />)
									: (<Table striped hover bordered size="sm">
											<thead>
												<tr>
													<th width="50%">Menu Name</th>
													<th width="20%">Seq</th>
													<th width="30%">Action</th>
												</tr>
											</thead>
											<tbody>
												{menu1.map((menu1) => {
													return (
														<tr id={menu1.menu_id} key={menu1.menu_id}>
															<td name='menu1-name'>{menu1.menu_name}</td>
															<td name='menu1-seq'>{menu1.seq}</td>
															<td name='menu1-action-button'>
															<Button 
																menu1-id={menu1.menu_id} 
																menu1-name={menu1.menu_name} 
																menu1-seq={menu1.seq}
																className="mb-1 mx-1"
																variant="success" 
																name="update"
																size="sm" onClick={onSelectUpdateMenu1}>
																Update
															</Button>
															<Button 
																menu1-id={menu1.menu_id} 
																menu1-name={menu1.menu_name} 
																className="mb-1 mx-1"
																variant="danger" 
																name="delete"
																size="sm" onClick={onSelectDeleteMenu1}>
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
				<Menu1Create/>
				<Menu1Delete/>
				<Menu1Update/>
			</Row>

		);
	}


}

export default connect(mapStateToProps, mapDispatchToProps)(Menu1)