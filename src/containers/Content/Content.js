import React, { Component } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Bloglist from '../Bloglist/Bloglist';
import Sidebar from '../Sidebar/Sidebar';
import { Row, Col } from "react-bootstrap";


const mapStateToProps = (state) => {
	return {
		sidebar: state.sidebarRdc.sidebar,
	}
}

class Content extends Component {

	render() {

		const match = this.props.match;
		const { sidebar } = this.props;

		return (
			<React.Fragment>
				<Col sm={2} id="sidebar-container" className="align-items-start mx-2 p-0" >
					<Sidebar url={match.url} />
				</Col>
				<Col id="blog-container" className="min-vh-100" >
					<Switch>
						<Route exact path={match.path}>
							<Row className="vh-100">
								<Col className='d-flex align-items-center justify-content-center'>
									{(sidebar.length > 0)
										? <h3>Please select a topic in the blue menu</h3>
										: <h3>There is no item in the blue menu, please create one.</h3>
									}

								</Col>
							</Row>
						</Route>
						<Route path={`${match.path}/:sidebarMenuID`}>
							<Bloglist />
						</Route>
					</Switch>
				</Col>
			</React.Fragment>
		);
	}



}

export default withRouter(connect(mapStateToProps, null)(Content));