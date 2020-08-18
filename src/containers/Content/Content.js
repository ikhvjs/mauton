import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import Bloglist from '../Bloglist/Bloglist';
import Sidebar from '../Sidebar/Sidebar';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Col} from "react-bootstrap";
import './Content.css';



//userRouteMatch only be allowed to use in function.
//Content component need to be a function
const Content = ({ sidebars, 
		onRequestBlog, 
		blogs,
		topbarMenuID,
		onRequestSidebar,
		isPendingSidebarByClick,
		onRequestBlogByClick,
		isPendingBlogByClick
	}) => {
	
	
	const match = useRouteMatch();
	return (
		<React.Fragment>
			<Col sm={1} md={2} lg={2} className="sidebar_container">
				<Sidebar url={match.url} 
					sidebars={sidebars}
					onRequestBlogByClick={onRequestBlogByClick}
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
			        	<Bloglist blogs={blogs}
			        	onRequestBlog={onRequestBlog}
			        	isPendingBlogByClick={isPendingBlogByClick}
			        	/>
			        </Route>
			    </Switch>
			</Col>     
		</React.Fragment>
	  );
	
}

export default Content;