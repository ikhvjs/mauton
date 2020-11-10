import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Spinner, Button } from "react-bootstrap";
import { requestBloglistByClickAct } from '../Bloglist/BloglistAction';
import { requestSidebarAct } from './SidebarAction';


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
		onRequestBloglistByClick: (event) =>
			dispatch(requestBloglistByClickAct(event.target.getAttribute('menu-id')))
	}
}

class Sidebar extends Component {


	render() {
		const { url,
			sidebar,
			onRequestSidebar,
			isPendingRequestSidebar,
			isRequestSidebarFailed,
			onRequestBloglistByClick
		} = this.props;
		return (
			(url === "/dashboard") ?
				(<Navbar id="dashboard-siderbar" bg="primary" variant="dark" expand="sm"
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
							{/* <LinkContainer to={`${url}/menu`}>
								<Nav.Link>Menu</Nav.Link>
							</LinkContainer> */}
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
				(<Navbar id="dynamic-siderbar" bg="primary" variant="dark" expand="sm"
					className="h-100 align-items-start justify-content-center shadow rounded">
					<Navbar.Toggle aria-controls="sidebar-dynamic-toggle" />
					{(isPendingRequestSidebar)
						? (<div className="d-flex align-items-center"><Spinner
							as="span"
							animation="grow"
							size="sm"
							role="status"
							aria-hidden="true"
						/>
					  		Loading...
						</div>)
						: ((isRequestSidebarFailed)
							? (<Button variant="secondary"
								size='sm' onClick={onRequestSidebar}>
								something wrong, Refresh Sidebar
							</Button>)
							: null)
					}
					<Navbar.Collapse id="sidebar-dynamic-collapse">
						<Nav className="flex-column">

							{(isPendingRequestSidebar) ?
								(null)
								: (sidebar.map((sidebar) => {
									return (
										<LinkContainer key={sidebar.menu_id}
											to={`${url}/${sidebar.menu_id}`}>
											<Nav.Link menu-id={sidebar.menu_id}
												onClick={onRequestBloglistByClick}>
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