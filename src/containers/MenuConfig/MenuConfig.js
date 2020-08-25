import React , { Component } from 'react';

import Menu1 from '../Menu1/Menu1'

import 'bootstrap/dist/css/bootstrap.min.css';
import {Tabs, Tab} from "react-bootstrap";



class MenuConfig extends Component  {

	render() {
		return (
			<React.Fragment>
				<h3>Menu</h3>
				<Tabs defaultActiveKey="menu1" id="menu-tab" transition={false}>
				  <Tab eventKey="menu1" title="Topbar Menu">
				    <Menu1 />
				  </Tab>
				  <Tab eventKey="menu2" title="Sidebar Menu">
				    <h1>hello 2</h1>
				  </Tab>
				</Tabs>
			</React.Fragment>
		)
	}

}

export default MenuConfig