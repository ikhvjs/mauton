import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar';
import Menu1 from '../Menu1/Menu1';
import Menu2 from '../Menu2/Menu2';
import CategoryConfig from '../CategoryConfig/CategoryConfig';
import TagConfig from '../TagConfig/TagConfig';
import { Row, Col } from "react-bootstrap";


const Dashboard = () => {
	const match = useRouteMatch();
	return (
		<React.Fragment>
			<Col id="dashboard-sidebar-container" sm={2} className="mx-2 px-0">
				<Sidebar url={match.url} />
			</Col>
			<Col id="dashboard-content-container" className="min-vh-100 mx-2 px-0">
				<Switch>
					<Route exact path={match.path}>
						<Row className="vh-100">
							<Col className='d-flex align-items-center justify-content-center'>
								<h3>Please select a topic in the blue menu</h3>
							</Col>
						</Row>
					</Route>
					<Route exact path={`${match.path}/menu1`}>
						<Menu1 />
					</Route>
					<Route exact path={`${match.path}/menu2`}>
						<Menu2 />
					</Route>
					<Route exact path={`${match.path}/category`}>
						<CategoryConfig />
					</Route>
					<Route exact path={`${match.path}/tag`}>
						<TagConfig />
					</Route>
				</Switch>
			</Col>
		</React.Fragment>
	);
}

export default Dashboard;
