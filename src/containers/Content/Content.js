import React, {Component} from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import BlogList from '../BlogList/BlogList';
import Sidebar from '../Sidebar/Sidebar';
import { Col} from "react-bootstrap";

class Content extends Component {

	render() {
		
		const match = this.props.match;

		return (
			<React.Fragment>
				<Col sm={2} id="sidebar-container" className="align-items-start mx-2 p-0" >
					<Sidebar url={match.url} />
				</Col>
				<Col id="blog-container" className="min-vh-100" >
					<Switch>
						<Route exact path={match.path}>
							<h3>Please select a topic in the blue menu</h3>
						</Route>
						<Route path={`${match.path}/:sidebarMenuID`}>
							<BlogList/>
						</Route>
						{/* <Route path="*">
							<Page404 />
						</Route> */}
					</Switch>
				</Col>
			</React.Fragment>
		);
	}



}

export default withRouter(Content);