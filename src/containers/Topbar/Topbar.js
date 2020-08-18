import React ,{Component}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import './Topbar.css';


class Topbar extends Component {
	render(){
		const { topbars,onRequestSidebarByClick} = this.props;
		return (
		    <Navbar  bg="light" variant="light" expand="lg" className="topbar">
				<Nav className = "topbar_nav">
					<LinkContainer to="/">
			    		<Navbar.Brand id="home">Home</Navbar.Brand>
			    	</LinkContainer>
			    	{topbars.map((topbar)=>{
						return(
							<LinkContainer key={topbar.menu_id} to={`/${topbar.menu_path}`}>
			    				<Nav.Link key={topbar.menu_id}
			    					value={topbar.menu_path}	
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
			</Navbar>
		);
	}
}

export default Topbar;