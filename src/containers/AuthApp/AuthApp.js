import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestTopbarAct } from '../Topbar/TopbarAction';
import { startSessionTimeOutAct, stopSessionTimeOutAct } from './AuthAppAction';
import { Switch, Route } from "react-router-dom";
import Home from '../Home/Home';
import Topbar from '../Topbar/Topbar';
import Content from '../Content/Content';
import Dashboard from '../Dashboard/Dashboard';
import Footer from '../../components/Footer/Footer';
import { Container, Row } from "react-bootstrap";
import LoginAlert from '../../components/LoginAlert/LoginAlert';
import { RECAPTCHAT_KEY } from '../../constants';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const mapStateToProps = (state) => {
	return {
		topbar: state.topbarRdc.topbar,
		expireTime: state.authRdc.expireTime,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestTopbar: () =>
			dispatch(requestTopbarAct()),
		onStartSessionTimeOut: () =>
			dispatch(startSessionTimeOutAct()),
		onStopSessionTimeOut: () =>
			dispatch(stopSessionTimeOutAct())
	}
}


class AuthApp extends Component {

	componentDidMount() {
		this.props.onRequestTopbar();
		this.props.onStartSessionTimeOut();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.expireTime !== this.props.expireTime) {
			this.props.onStopSessionTimeOut();
			this.props.onStartSessionTimeOut();
		}
	}

	componentWillUnmount() {
		this.props.onStopSessionTimeOut();
	}

	render() {
		const { topbar } = this.props;

		return (
			<Container fluid >
				<Row id="topbar-container">
					<Topbar />
				</Row>
				<Row id="content-container" className="min-vh-100">
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						{topbar.map((topbar) => {
							return (
								<Route key={topbar.menu_id} path={`/${topbar.menu_id}`}>
									<Content />
								</Route>
							)
						})
						}
						<Route path="/dashboard">
							<Dashboard />
						</Route>
					</Switch>
				</Row>
				<Row id="footer-container">
					<Footer />
				</Row>
				<GoogleReCaptchaProvider reCaptchaKey={RECAPTCHAT_KEY}>
					<LoginAlert />
				</GoogleReCaptchaProvider>
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthApp)

