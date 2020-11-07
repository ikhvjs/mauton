import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from "react-bootstrap";
import { requestBloglistByClickAct } from '../Bloglist/BloglistAction';
import { requestSidebarAct } from '../Sidebar/SidebarAction';


const mapStateToProps = (state) => {
	return {
		sidebars: state.sidebarRdc.sidebars,
		isPendingSidebarByClick: state.sidebarRdc.isPendingSidebarByClick
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestBloglistByClick: (event) =>
			dispatch(requestBloglistByClickAct(event.target.getAttribute('id'))),
		onRequestSidebar: (id) =>
			dispatch(requestSidebarAct(id))
	}
}

class Sidebar extends Component {

	componentDidMount() {
		const { isPendingSidebarByClick, url, onRequestSidebar, topbarMenuID } = this.props;
		if (isPendingSidebarByClick === false && url !== "/dashboard") {
			onRequestSidebar(topbarMenuID);
		}
	}


	render() {
		const { url, sidebars, onRequestBloglistByClick } = this.props;
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
					<Navbar.Collapse id="sidebar-dynamic-collapse">
						<Nav className="flex-column">
							{sidebars.map((sidebar) => {
								return (
									<LinkContainer key={sidebar.menu_id} to={`${url}/${sidebar.menu_path}`}>
										<Nav.Link id={sidebar.menu_id} onClick={onRequestBloglistByClick}>
											{sidebar.menu_name}
										</Nav.Link>
									</LinkContainer>
								)
							})}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				));

	}

}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);