import React , { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav} from "react-bootstrap";


import './SidebarItem.css';




class SidebarItem extends Component {

	render() {
		const { url,sidebar} = this.props;
		return (
			<LinkContainer to={`${url}${sidebar.menu_path}`}>
				<Nav.Link className='sidebar_item' value={sidebar.menu_id}>
						{sidebar.menu_name}
				</Nav.Link>
			</LinkContainer>	
		  );
	}	
}

export default SidebarItem;