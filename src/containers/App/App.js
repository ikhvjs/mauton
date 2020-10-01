import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { 
	requestTopbarAct,
	requestSidebarAct,
	requestSidebarByClickAct
} from './AppActions';
import {
  BrowserRouter as Router,
  Switch,
  Route
  // Redirect
} from "react-router-dom";

import Home from '../Home/Home';
import Topbar from '../Topbar/Topbar';
import Content from '../Content/Content';
import Dashboard from '../Dashboard/Dashboard';
// import Page404 from '../../components/Page404/Page404';
import Footer from '../Footer/Footer';

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
    isPendingSidebarByClick:state.requestSidebarRdc.isPendingSidebarByClick
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestTopbar: () => 
    	dispatch(requestTopbarAct()),
    onRequestSidebar:(topbarMenuID) => 
    	dispatch(requestSidebarAct(topbarMenuID)),
    onRequestSidebarByClick:(event) => 
    	dispatch(requestSidebarByClickAct(event.target.getAttribute('href')))
    
  }
}


class App extends Component {

	componentDidMount() {
		this.props.onRequestTopbar();
	}

	render() {
		const { topbars,
				sidebars,
				onRequestTopbar,
				onRequestSidebar,
				onRequestSidebarByClick,
				isPendingSidebarByClick
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
												topbarMenuID={topbar.menu_id}
												onRequestSidebar={onRequestSidebar}
												isPendingSidebarByClick={isPendingSidebarByClick}
											/>
						    			</Route>
									)
								})
				          	}
				          	<Route path="/dashboard">
				           		<Dashboard onRequestTopbar={onRequestTopbar} />
				          	</Route>
				          	{
					         //  	<Route path="*">
						        //     <Page404 />
						        // </Route>
					    	}
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

