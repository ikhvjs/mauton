import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, Spinner, Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { requestTopbarAct, selectTopbarAct, userLogOutAct } from './TopbarAction';
import { requestSidebarAct } from '../Sidebar/SidebarAction';
import './Topbar.css';
import logo from '../../img/logo.png';


const mapStateToProps = (state) => {
	return {
		topbar: state.topbarRdc.topbar,
		isPendingRequestTopbar: state.topbarRdc.isPendingRequestTopbar,
		isRequestTopbarFailed: state.topbarRdc.isRequestTopbarFailed,
		userName: state.authRdc.userName,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestTopbar: () =>
			dispatch(requestTopbarAct()),
		onSelectTopbar: (event) => {
			dispatch(selectTopbarAct(event.target.getAttribute('menu-id')));
			dispatch(requestSidebarAct());
		},
		onUserLogOut: () =>
			dispatch(userLogOutAct())
	}
}


class Topbar extends Component {
	render() {
		const { topbar,
			isPendingRequestTopbar,
			onRequestTopbar,
			isRequestTopbarFailed,
			onSelectTopbar,
			userName,
			onUserLogOut
		} = this.props;
		return (
			<Navbar collapseOnSelect id="topbar" bg="light" variant="light" expand="sm"
				className="w-100 shadow my-1 mx-2 rounded ">
				<LinkContainer to="/">
					<Navbar.Brand id="home" >
						<img
							src={logo}
							width="30"
							height="30"
							className="d-inline-block align-top"
							alt="Mauton logo"
						/>
						      Mauton
			    		</Navbar.Brand>
				</LinkContainer>
				{(isPendingRequestTopbar)
					? (<div className="d-flex align-items-center"><Spinner
						as="span"
						animation="grow"
						size="sm"
						role="status"
						aria-hidden="true"
					/>
					  Loading...
					</div>)
					: ((isRequestTopbarFailed)
						? (<Button variant="primary"
							size='sm' onClick={onRequestTopbar}>
							something wrong, Refresh Topbar
						</Button>)
						: null)
				}
				<Navbar.Toggle aria-controls="topbar-toggle" />
				<Navbar.Collapse id="topbar-collapse" className="justify-content-between">
					<Nav id="link-container">
						{(isPendingRequestTopbar) ?
							(null)
							: (topbar.map((topbar) => {
								return (
									<LinkContainer key={topbar.menu_id} to={`/${topbar.menu_id}`}>
										<Nav.Link key={topbar.menu_id}
											menu-id={topbar.menu_id}
											onClick={onSelectTopbar}>
											{topbar.menu_name}
										</Nav.Link>
									</LinkContainer>
								)
							}))
						}
					</Nav>
					<div className="d-flex">
						<Nav>
							<LinkContainer to="/dashboard">
								<Nav.Link id="dashboard">Dashboard</Nav.Link>
							</LinkContainer>
						</Nav>
						<Button variant="link">{userName}</Button>
						<Button variant="outline-secondary" onClick={onUserLogOut}>LogOut</Button>
					</div>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)