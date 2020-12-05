import React , { Component } from 'react';

import { connect } from 'react-redux';
// import {  selectHomeIndexAct } from './HomeAction';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { Container} from "react-bootstrap";


const mapStateToProps = (state) => {
  return {
    // homeIndex:state.homeRdc.homeIndex
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onSelectHomeIndex:(selectedIndex) => 
    // 	dispatch(selectHomeIndexAct(selectedIndex))
  }
}


class Home extends Component  {

	render(){

		// const {	
		// 		homeIndex,
		// 		onSelectHomeIndex
		// 	} = this.props;
		
		return (
				<Container className="home_container">
			    </Container>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);