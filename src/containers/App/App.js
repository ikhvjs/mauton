import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AuthApp from '../AuthApp/AuthApp';
import LoginContainer from '../LoginContainer/LoginContainer';
import RegisterContainer from '../RegisterContainer/RegisterContainer';
import { PrivateRoute } from '../../components/PrivateRoute/PrivateRoute';

// import $ from 'jquery';
// import Popper from 'popper.js';

const mapStateToProps = (state) => {
  return {
	isAuth: state.authRdc.isAuth
  }
}

class App extends Component {

	render() {

		return (
			<Router basename="mauton">
				<Switch>
					<Route path="/login">
						<LoginContainer />
					</Route>
					<Route path="/register">
						<RegisterContainer />
					</Route>
					<PrivateRoute isAuth={this.props.isAuth} path='/'>
						<AuthApp />
					</PrivateRoute>
				</Switch>
			</Router>
		);
	}
	
	
}

export default connect(mapStateToProps, null)(App)

