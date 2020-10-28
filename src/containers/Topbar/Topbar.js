import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { requestSidebarByClickAct } from './TopbarAction';
import logo from './logo.png'

const mapStateToProps = (state) => {
	return {
		topbars: state.topbarRdc.topbars
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestSidebarByClick: (event) =>
			dispatch(requestSidebarByClickAct(event.target.getAttribute('value')))
	}
}

class Topbar extends Component {
	render() {
		const { topbars, onRequestSidebarByClick } = this.props;
		return (
			<Navbar collapseOnSelect id="topbar" bg="light" variant="light" expand="lg"
				className="w-100 shadow my-1 mx-2 rounded">
					<LinkContainer to="/">
							<Navbar.Brand id="home">
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
				<Navbar.Toggle aria-controls="topbar-toggle" />
				<Navbar.Collapse id="topbar-collapse">
					<Nav className="mh-100 w-100">
						
						{topbars.map((topbar) => {
							return (
								<LinkContainer key={topbar.menu_id} to={`/${topbar.menu_path}`}>
									<Nav.Link key={topbar.menu_id}
										value={topbar.menu_id}
										onClick={onRequestSidebarByClick}>
										{topbar.menu_name}
									</Nav.Link>
								</LinkContainer>
							)
						})}
						<LinkContainer to="/dashboard">
							<Nav.Link id="dashboard" className='ml-auto'>Dashboard</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)