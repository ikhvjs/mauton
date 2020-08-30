import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import Bloglist from '../Bloglist/Bloglist';
import Sidebar from '../Sidebar/Sidebar';
import Page404 from '../../components/Page404/Page404';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col} from "react-bootstrap";
import './Content.css';




const Content = ({ sidebars, 
		topbarMenuID,
		onRequestSidebar,
		isPendingSidebarByClick
	}) => {
	
	//userRouteMatch only be allowed to use in function.
	//Content component need to be a function
	const match = useRouteMatch();
	return (
		<React.Fragment>
			<Col sm={1} md={2} lg={2} className="sidebar_container">
				<Sidebar url={match.url} 
					sidebars={sidebars}
					topbarMenuID={topbarMenuID}
					onRequestSidebar={onRequestSidebar}
					isPendingSidebarByClick={isPendingSidebarByClick}
					/>
			</Col>
			<Col className="bloglist_container">
			    <Switch>
			        <Route exact path={match.path}>
			          <h3>Please select a topic.</h3>
			        </Route>
			        <Route path={`${match.path}/:sidebarMenuPath`}>
			        	<Bloglist />
			        </Route>
			        <Route path="*">
					    <Page404 />
					 </Route>
			    </Switch>
			</Col>     
		</React.Fragment>
	  );
	
}

export default Content;