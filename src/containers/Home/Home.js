import React, { Component } from 'react';
import './Home.css';
import { Container } from "react-bootstrap";

class Home extends Component {

	render() {
		return (
			<div className="home d-flex mx-2">
				<Container className="text-center my-auto">
					<h1 className="mb-1">Make your Blog</h1>
					<h3 className="mb-5">
						<em>Manage your blogs in a easy way</em>
					</h3>
				</Container>
			</div>
		)
	}

}

export default Home;