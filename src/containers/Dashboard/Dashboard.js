import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar';
import MenuConfig from '../MenuConfig/MenuConfig';
import CategoryConfig from '../CategoryConfig/CategoryConfig';
import TagConfig from '../TagConfig/TagConfig';
import Page404 from '../../components/Page404/Page404';
import { Col} from "react-bootstrap";


const Dashboard = ({ onRequestTopbar }) => {
	const match = useRouteMatch();
	return (
		<React.Fragment>
			<Col id="dashboard-sidebar-container" sm={2} className="mx-2 px-0">
				<Sidebar url={match.url} />
			</Col>
			<Col id="dashboard-content-container" className="min-vh-100 mx-2 px-0">
				<Switch>
					<Route exact path={match.path}>
						<h3>Please select a topic in the blue menu</h3>
					</Route>
					<Route exact path={`${match.path}/menu`}>
						<MenuConfig onRequestTopbar={onRequestTopbar} />
					</Route>
					<Route exact path={`${match.path}/category`}>
						<CategoryConfig />
					</Route>
					<Route exact path={`${match.path}/tag`}>
						<TagConfig />
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
