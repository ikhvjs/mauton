import React , { Component } from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import {Row} from "react-bootstrap";


class Home extends Component  {

	render(){
		
		return (
				<Row className='home_container'>Welcome Home</Row>
		)
	}

}

export default Home;