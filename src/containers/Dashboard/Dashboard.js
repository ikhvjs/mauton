import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import Sidebar from '../Sidebar/Sidebar';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from "react-bootstrap";


const Dashboard = () => {
	const match = useRouteMatch();
	return (
	    <React.Fragment>
			<Col sm={1} md={2} lg={2} className="sidebar_container">
				<Sidebar url={match.url} />
			</Col>
			<Col className="article_container">
			    <Switch>
			        <Route exact path={match.path}>
			          <h3>Please select a topic.</h3>
			        </Route>
			        <Route path={`${match.path}`}>
			        	<h3>working on it</h3>
			        </Route>
			    </Switch>
			</Col>     
		</React.Fragment>
	  );
}

export default Dashboard;
