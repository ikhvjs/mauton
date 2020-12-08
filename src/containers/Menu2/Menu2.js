import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	requestMenu2Act,
	searchMenu2Act,
	onchangeSearchMenu2NameAct,
	onchangeSearchMenu2ParentNameAct,
	clearSearchMenu2Act,
	selectCreateMenu2Act,
	selectDeleteMenu2Act,
	selectUpdateMenu2Act,
	setPageAct
} from './Menu2Action';
import { LoadingBar } from '../../components/LoadingBar/LoadingBar';
import { requestMenu1Act } from '../Menu1/Menu1Action';
import { Table, Form, Button, Col, Row } from "react-bootstrap";
import './Menu2.css';
import Menu2Create from './Menu2Create';
import Menu2Delete from './Menu2Delete';
import Menu2Update from './Menu2Update';
import RequestErrorAlert from '../../components/RequestErrorAlert/RequestErrorAlert';
import Pagination from "react-js-pagination";

const mapStateToProps = (state) => {
	return {
		menu2: state.menu2Rdc.menu2,
		isRefreshMenu2Needed: state.menu2Rdc.isRefreshMenu2Needed,
		isPendingRequestMenu2: state.menu2Rdc.isPendingRequestMenu2,
		isRequestMenu2Failed: state.menu2Rdc.isRequestMenu2Failed,
		searchMenu2Name: state.menu2Rdc.searchMenu2Name,
		searchMenu2ParentName: state.menu2Rdc.searchMenu2ParentName,
		itemPerPage: state.menu2Rdc.itemPerPage,
		displayMenu2: state.menu2Rdc.displayMenu2,
		selectedPage: state.menu2Rdc.selectedPage,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestMenu2: () =>
			dispatch(requestMenu2Act()),
		onSearchMenu2: () =>
			dispatch(searchMenu2Act()),
		onChangeSearchMenu2Name: (event) =>
			dispatch(onchangeSearchMenu2NameAct(event)),
		onChangeSearchMenu2ParentName: (event) =>
			dispatch(onchangeSearchMenu2ParentNameAct(event)),
		onClearSearchMenu2: () =>
			dispatch(clearSearchMenu2Act()),
		onSelectCreateMenu2: () => {
			dispatch(requestMenu1Act());
			dispatch(selectCreateMenu2Act());
		},
		onSelectDeleteMenu2: (event) =>
			dispatch(selectDeleteMenu2Act(event)),
		onSelectUpdateMenu2: (event) => {
			dispatch(requestMenu1Act());
			dispatch(selectUpdateMenu2Act(event));
		},
		onSetPage: (page) =>
			dispatch(setPageAct(page))

	}
}

class Menu2 extends Component {

	componentDidMount() {
		this.props.onRequestMenu2();
	}

	componentDidUpdate() {
		if (this.props.isRefreshMenu2Needed === true) {
			this.props.onRequestMenu2();
		}
	}

	render() {

		const { menu2,
			onSearchMenu2,
			searchMenu2Name,
			searchMenu2ParentName,
			onChangeSearchMenu2Name,
			onChangeSearchMenu2ParentName,
			onClearSearchMenu2,
			onSelectCreateMenu2,
			onSelectUpdateMenu2,
			onSelectDeleteMenu2,
			isPendingRequestMenu2,
			isRequestMenu2Failed,
			onSetPage,
			displayMenu2,
			itemPerPage,
			selectedPage,
		} = this.props;

		return (
			<Row id="menu2-config-container">
				<Col id="menu2-config-wrapper">
					<Row className="mb-1 px-3">
						<Col>
							<h3>Sidebar Menu</h3>
						</Col>
					</Row>
					<Row className="mb-1 px-3">
						<Col xs={4} sm={4} md={3} className="mb-1">
							<Form.Control
								size="sm"
								name="menu2-name"
								type="text"
								placeholder="Menu Name"
								value={searchMenu2Name}
								onChange={onChangeSearchMenu2Name}
							/>
						</Col>
						<Col xs={4} sm={4} md={3} className="mb-1">
							<Form.Control
								size="sm"
								name="menu2-parent-name"
								type="text"
								placeholder="Parent Menu Name"
								value={searchMenu2ParentName}
								onChange={onChangeSearchMenu2ParentName}
							/>
						</Col>
						<Col name='button' xs={2} sm={2} md={1}>
							<Button name="search" size="sm" onClick={onSearchMenu2}>Search</Button>
						</Col>
						<Col name='button' xs={2} sm={2} md={2}>
							<Button name="clear" size="sm" variant="secondary" onClick={onClearSearchMenu2}>Clear</Button>
						</Col>
						<Col xs={6} sm={2} md={3}>
							<Button name="create" variant="success" size="sm" onClick={onSelectCreateMenu2}> Create </Button>
						</Col>
					</Row>

					<Row className="my-1 px-3">
						<Col>
							{(isPendingRequestMenu2)
								? (<LoadingBar />)
								: (isRequestMenu2Failed
									? (<RequestErrorAlert />)
									: (<Table striped hover bordered size="sm">
										<thead>
											<tr>
												<th width="35%">Menu Name</th>
												<th width="35%">Parent Menu Name</th>
												<th width="10%">Seq</th>
												<th width="20%">Action</th>
											</tr>
										</thead>
										<tbody>
											{displayMenu2.map((menu2) => {
												return (
													<tr id={menu2.menu_id} key={menu2.menu_id}>
														<td name='menu2-name'>{menu2.menu_name}</td>
														<td name='menu2-parent-menu-name'>{menu2.parent_menu_name}</td>
														<td name='seq'>{menu2.seq}</td>
														<td name='menu2-action-button'>
															<Button
																menu2-id={menu2.menu_id}
																menu2-name={menu2.menu_name}
																menu2-parent-menu-id={menu2.parent_menu_id}
																menu2-parent-name={menu2.parent_menu_name}
																menu2-seq={menu2.seq}
																className="mb-1 mx-1"
																variant="success"
																name="update"
																size="sm" onClick={onSelectUpdateMenu2}>
																Update
															</Button>
															<Button
																menu2-id={menu2.menu_id}
																menu2-name={menu2.menu_name}
																className="mb-1 mx-1"
																variant="danger"
																name="delete"
																size="sm" onClick={onSelectDeleteMenu2}>
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
					<Row>
						<Col className="d-flex justify-content-center">
							<Pagination
								itemClass="page-item"
								linkClass="page-link"
								activePage={selectedPage}
								itemsCountPerPage={itemPerPage}
								totalItemsCount={menu2.length}
								pageRangeDisplayed={5}
								onChange={onSetPage}
							/>
						</Col>
					</Row>
				</Col>
				<Menu2Create />
				<Menu2Delete />
				<Menu2Update />
			</Row>
		)
	}


}

export default connect(mapStateToProps, mapDispatchToProps)(Menu2)