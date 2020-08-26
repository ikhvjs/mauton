import React , { Component } from 'react';
import { connect } from 'react-redux';

import Menu1 from '../Menu1/Menu1';
import Menu2 from '../Menu2/Menu2';

import { 
	selectMenuLevelAct
} from './MenuConfigAction';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Tabs, Tab} from "react-bootstrap";

const mapStateToProps = (state) => {
  return {
  	menuLevel: state.menuRdc.menuLevel
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
	    onSelectMenuLevel: (key) => 
	    	dispatch(selectMenuLevelAct(key))
	}
}

class MenuConfig extends Component  {

	render() {
		const { onRequestTopbar,
				onSelectMenuLevel,
				menuLevel
			} = this.props;
		return (
			<React.Fragment>
				<h3>Menu</h3>
				<Tabs onSelect={onSelectMenuLevel} defaultActiveKey="menu2" 
					id="menu-tab" transition={false}>
				  <Tab eventKey="menu1" title="Topbar Menu">
				    <Menu1 onRequestTopbar={onRequestTopbar} 
				    	menuLevel={menuLevel}/>
				  </Tab>
				  <Tab eventKey="menu2" title="Sidebar Menu">
				    <Menu2 menuLevel={menuLevel}/>
				  </Tab>
				</Tabs>
			</React.Fragment>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(MenuConfig)