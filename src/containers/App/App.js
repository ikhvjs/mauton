import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
  // Redirect
} from "react-router-dom";

import AuthApp from '../AuthApp/AuthApp';
import LoginContainer from '../LoginContainer/LoginContainer';
import RegisterContainer from '../RegisterContainer/RegisterContainer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { PrivateRoute } from '../../components/PrivateRoute/PrivateRoute';

// import $ from 'jquery';
// import Popper from 'popper.js';

const mapStateToProps = (state) => {
  return {
	isAuth: 			state.authRdc.isAuth,
	isPendingPostUser:  state.authRdc.isPendingPostUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}


class App extends Component {

	componentDidMount() {
		
	}

	render() {
		const { isAuth
			} = this.props;
						    
		return (
			<Router basename="/mauton">
				<Switch>
					<Route path="/login">
						<LoginContainer />
					</Route>
					<Route path="/register">
						<RegisterContainer />
					</Route>
					<PrivateRoute isAuth={isAuth} path="/">
						<AuthApp />
					</PrivateRoute>
					
				</Switch>
			</Router>
		);
	}
	
	
}

// action done from mapDispatchToProps will channge state from mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(App)

