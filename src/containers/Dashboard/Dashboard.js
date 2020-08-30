import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import Sidebar from '../Sidebar/Sidebar';
import MenuConfig from '../MenuConfig/MenuConfig';
import CategoryConfig from '../CategoryConfig/CategoryConfig';
import TagConfig from '../TagConfig/TagConfig';
import Page404 from '../../components/Page404/Page404';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from "react-bootstrap";
import './Dashboard.css';


const Dashboard = ({onRequestTopbar}) => {
	const match = useRouteMatch();
	return (
	    <React.Fragment>
			<Col sm={1} md={2} lg={2} className="sidebar_container">
				<Sidebar url={match.url} />
			</Col>
			<Col className="page_container">
			    <Switch>
			        <Route exact path={match.path}>
			          <h3>Please select a topic.</h3>
			        </Route>
			        <Route exact path={`${match.path}/menu`}>
			        	<MenuConfig onRequestTopbar={onRequestTopbar} />
			        </Route>
			        <Route exact path={`${match.path}/category`}>
			        	<CategoryConfig/>
			        </Route>
			        <Route exact path={`${match.path}/tag`}>
			        	<TagConfig/>
			        </Route>
			        <Route path="*">
					    <Page404 />
					 </Route>
			    </Switch>
			</Col>     
		</React.Fragment>
	  );
}

export default Dashboard;
