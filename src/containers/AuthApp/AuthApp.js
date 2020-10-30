import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {  requestTopbarAct } from '../Topbar/TopbarAction';
import { Switch,  Route } from "react-router-dom";
import Home from '../Home/Home';
import Topbar from '../Topbar/Topbar';
import Content from '../Content/Content';
import Dashboard from '../Dashboard/Dashboard';
import Footer from '../../components/Footer/Footer';
import {Container, Row} from "react-bootstrap";

const mapStateToProps = (state) => {
  return {
    topbars: state.topbarRdc.topbars
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestTopbar: () => 
    	dispatch(requestTopbarAct())
  }
}


class AuthApp extends Component {

	componentDidMount() {
		this.props.onRequestTopbar();
	}

	render() {
		const { topbars,
				onRequestTopbar
			} = this.props;
						    
		return (
			<Container fluid >
				<Row id="topbar-container">
					<Topbar />
				</Row>	
				<Row id="content-container" className="min-vh-100">
					<Switch>
			          	<Route exact path="/">
			           		<Home />
			          	</Route>
			          	{topbars.map((topbar)=>{
								return(
									<Route key={topbar.menu_id} path={`/${topbar.menu_path}`}>
										<Content topbarMenuID={topbar.menu_id}
										/>
					    			</Route>
								)
							})
			          	}
			          	<Route path="/dashboard">
			           		<Dashboard onRequestTopbar={onRequestTopbar} />
			          	</Route>
					</Switch>
				</Row>	
				<Row id="footer-container">
					<Footer />
				</Row>
			</Container>
		);
	}	
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthApp)

