import React , { Component } from 'react';
import { connect } from 'react-redux';

import { 
	setTabNotDisableAct
} from './MenuConfigAction';

import Menu1 from '../Menu1/Menu1';
import Menu2 from '../Menu2/Menu2';


import 'bootstrap/dist/css/bootstrap.min.css';
import {Tabs, Tab} from "react-bootstrap";
import './MenuConfig.css';

const mapStateToProps = (state) => {
  return {
  	isDisableMenuTab: state.menuRdc.isDisableMenuTab
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
	    setTabNotDisable: () => 
	    	dispatch(setTabNotDisableAct())
	}
}

class MenuConfig extends Component  {

	componentDidMount() {
		this.props.setTabNotDisable();
	}

	render() {
		const { onRequestTopbar,
				isDisableMenuTab
			} = this.props;
		return (
			<React.Fragment>
				<h3>Menu</h3>
				<Tabs  defaultActiveKey="menu1" 
					id="menu-tab" transition={false}>
				  <Tab eventKey="menu1" title="Topbar Menu" disabled={isDisableMenuTab}>
				    <Menu1 onRequestTopbar={onRequestTopbar} />
				  </Tab>
				  <Tab eventKey="menu2" title="Sidebar Menu" disabled={isDisableMenuTab}>
				    <Menu2  />
				  </Tab>
				</Tabs>
			</React.Fragment>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(MenuConfig)