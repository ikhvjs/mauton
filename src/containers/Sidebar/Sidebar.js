import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from "react-bootstrap";

import { 
	requestBloglistByClickAct
} from '../Bloglist/BloglistAction';

import './Sidebar.css';

const mapStateToProps = (state) => {
  return {
    bloglist:state.blogRdc.bloglist
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestBloglistByClick:(event) => 
    	//getAttribute('value') is the sideMenuPath 
    	dispatch(requestBloglistByClickAct(event.target.getAttribute('value')))
  }
}

class Sidebar extends Component {

	componentDidMount() {
		if (this.props.isPendingSidebarByClick === false) {
	    	this.props.onRequestSidebar(this.props.topbarMenuID);
	    }
	}


	render() {
		const { url, sidebars, onRequestBloglistByClick} = this.props;
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
								<Nav.Link value={sidebar.menu_path} onClick={onRequestBloglistByClick}>
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


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);