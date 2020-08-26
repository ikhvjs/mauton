import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { 
	requestTopbarAct,
	requestSidebarAct,
	requestBlogAct,
	requestSidebarByClickAct,
	requestBlogByClickAct,
	requestSingleBlogByClickAct
} from '../../actions';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from '../Home/Home';
import Topbar from '../Topbar/Topbar';
import Content from '../Content/Content';
import Dashboard from '../Dashboard/Dashboard';
import Footer from '../Footer/Footer';


//CSS import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row} from "react-bootstrap";
import './App.css';

// import $ from 'jquery';
// import Popper from 'popper.js';

const mapStateToProps = (state) => {
  return {
    topbars: state.requestTopbarRdc.topbars,
    isPendingTopbar: state.requestTopbarRdc.isPendingTopbar,
    sidebars:state.requestSidebarRdc.sidebars,
    isPendingSidebar:state.requestSidebarRdc.isPendingSidebar,
    isPendingSidebarByClick:state.requestSidebarRdc.isPendingSidebarByClick,
    blogs:state.requestBlogRdc.blogs,
    isPendingBlog:state.requestBlogRdc.isPendingBlog,
    isPendingBlogByClick:state.requestBlogRdc.isPendingBlogByClick,
    isSingleBlogRequest:state.requestBlogRdc.isSingleBlogRequest,
 	isPendingSingleBlog:state.requestBlogRdc.isPendingSingleBlog

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestTopbar: () => 
    	dispatch(requestTopbarAct()),
    onRequestSidebar:(topbarMenuID) => 
    	dispatch(requestSidebarAct(topbarMenuID)),
    onRequestSidebarByClick:(event) => 
    	dispatch(requestSidebarByClickAct(event.target.getAttribute('href'))),
    onRequestBlog:(sidebarMenuPath) => 
    	dispatch(requestBlogAct(sidebarMenuPath)),
    onRequestBlogByClick:(event) => 
    	//getAttribute('value') is the sideMenuPath 
    	dispatch(requestBlogByClickAct(event.target.getAttribute('value'))),
    onRequestSingleBlogByClick:(event) => 
    	dispatch(requestSingleBlogByClickAct(event.target.getAttribute('value')))
  }
}


class App extends Component {

	componentDidMount() {
		this.props.onRequestTopbar();
	}

	render() {
		const { topbars,
				sidebars,
				blogs,
				onRequestSidebar,
				onRequestBlog,
				onRequestSidebarByClick,
				isPendingSidebarByClick,
				onRequestBlogByClick,
				isPendingBlogByClick,
				isSingleBlogRequest,
				isPendingSingleBlog,
				onRequestSingleBlogByClick,
				onRequestTopbar
			} = this.props;

						    
		return (
			<Router>
				<Container fluid className = "main_container">
					<Row className = "topbar_container">
						<Topbar topbars={topbars} 
							onRequestSidebarByClick={onRequestSidebarByClick}/>
					</Row>	
					<Row className = "content_container">
						<Switch>
				          	<Route exact path="/">
				           		<Home />
				          	</Route>
				          	{topbars.map((topbar)=>{
									return(
										<Route key={topbar.menu_id} path={`/${topbar.menu_path}`}>
											<Content sidebars={sidebars} 
												onRequestBlog={onRequestBlog}
												onRequestBlogByClick={onRequestBlogByClick}
												isPendingBlogByClick={isPendingBlogByClick}
												blogs={blogs}
												topbarMenuID={topbar.menu_id}
												onRequestSidebar={onRequestSidebar}
												isPendingSidebarByClick={isPendingSidebarByClick}
												onRequestSingleBlogByClick={onRequestSingleBlogByClick}
												isSingleBlogRequest={isSingleBlogRequest}
												isPendingSingleBlog={isPendingSingleBlog}
											/>
						    			</Route>
									)
								})
				          	}
				          	<Route path="/dashboard">
				           		<Dashboard onRequestTopbar={onRequestTopbar} />
				          	</Route>
				          	<Route path="*">
					            <Home />
					        </Route>
						</Switch>
					</Row>	
					<Row className = "footer_container">
						<Footer />
					</Row>
				</Container>
			</Router>
		);
	}	
}

// action done from mapDispatchToProps will channge state from mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(App)

