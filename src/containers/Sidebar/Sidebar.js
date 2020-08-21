import React ,{ Component } from 'react';

// import SidebarItem from '../../components/SidebarItem/SidebarItem';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';


import './Sidebar.css';

class Sidebar extends Component {

	componentDidMount() {
		if (this.props.isPendingSidebarByClick === false) {
	    	this.props.onRequestSidebar(this.props.topbarMenuID);
	    }
	}


	render() {
		const { url, sidebars, onRequestBlogByClick} = this.props;
		return (
			( url ==="/dashboard" )?
			(	<Navbar  bg="primary" variant="dark" expand="lg" className="sidebar" >
					<Nav className ="flex-column">
			          	<LinkContainer to={`${url}/menu`}>
							<Nav.Link>Menu</Nav.Link>
						</LinkContainer>
						<LinkContainer to={`${url}/category`}>
							<Nav.Link>Blog Category</Nav.Link>
						</LinkContainer>	
						<LinkContainer to={`${url}/tag`}>
							<Nav.Link>Tag</Nav.Link>
						</LinkContainer>		
					</Nav>
				</Navbar>
			):
			(	<Navbar  bg="primary" variant="dark" expand="lg" className="sidebar" >
					<Nav className ="flex-column">
					{sidebars.map((sidebar)=>{
						return(
							<LinkContainer key={sidebar.menu_id} to={`${url}/${sidebar.menu_path}`}>
								<Nav.Link value={sidebar.menu_path} onClick={onRequestBlogByClick}>
									{sidebar.menu_name}
								</Nav.Link>	
							</LinkContainer>	
						)
					})}
					</Nav>
				</Navbar>
		));
	
	}
	
}

export default Sidebar;