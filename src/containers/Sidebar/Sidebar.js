import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { LoadingBar } from '../../components/LoadingBar/LoadingBar';
import { Navbar, Nav, Button } from "react-bootstrap";
import { requestBlogListAct } from '../BlogList/BlogListAction';
import { requestSidebarAct, selectSidebarAct } from './SidebarAction';
import './Sidebar.css';


const mapStateToProps = (state) => {
	return {
		sidebar: state.sidebarRdc.sidebar,
		isPendingRequestSidebar: state.sidebarRdc.isPendingRequestSidebar,
		isRequestSidebarFailed: state.sidebarRdc.isRequestSidebarFailed
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestSidebar: () =>
			dispatch(requestSidebarAct()),
		onSelectSidebar: (event) =>{
			dispatch(selectSidebarAct(event.target.getAttribute('menu-id')));
			dispatch(requestBlogListAct());
		}
			
	}
}

class Sidebar extends Component {


	render() {
		const { url,
			sidebar,
			onRequestSidebar,
			isPendingRequestSidebar,
			isRequestSidebarFailed,
			onSelectSidebar
		} = this.props;
		return (
			(url === "/dashboard") ?
				(<Navbar collapseOnSelect id="dashboard-siderbar" bg="primary" variant="dark" expand="sm"
					className="h-100 align-items-start justify-content-end shadow rounded">
					<Navbar.Toggle aria-controls="sidebar-dashboard-toggle" />
					<Navbar.Collapse id="sidebar-dashboard-collapse">
						<Nav className="flex-column">
							<LinkContainer to={`${url}/category`}>
								<Nav.Link>Category</Nav.Link>
							</LinkContainer>
							<LinkContainer to={`${url}/tag`}>
								<Nav.Link>Tag</Nav.Link>
							</LinkContainer>
							<LinkContainer to={`${url}/menu1`}>
								<Nav.Link>Topbar Menu</Nav.Link>
							</LinkContainer>
							<LinkContainer to={`${url}/menu2`}>
								<Nav.Link>Sidebar Menu</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				) :
				(<Navbar collapseOnSelect id="dynamic-siderbar" bg="primary" variant="dark" expand="sm"
					className="h-100 align-items-start justify-content-center shadow rounded">
					{(isPendingRequestSidebar)
						? (<LoadingBar />)
						: ((isRequestSidebarFailed)
							? (<Button variant="light" className="mr-1"
								size='sm' onClick={onRequestSidebar}>
								something wrong, Refresh Sidebar
							</Button>)
							: null)
					}
					<Navbar.Toggle aria-controls="sidebar-dynamic-toggle" />
					<Navbar.Collapse id="sidebar-dynamic-collapse">
						<Nav className="flex-column">
							{(isPendingRequestSidebar) ?
								(null)
								: (sidebar.map((sidebar) => {
									return (
										<LinkContainer key={sidebar.menu_id}
											to={`${url}/${sidebar.menu_id}`}>
											<Nav.Link menu-id={sidebar.menu_id}
												onClick={onSelectSidebar}>
												{sidebar.menu_name}
											</Nav.Link>
										</LinkContainer>
									)
								}))
							}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				));

	}

}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);