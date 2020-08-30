import React , { Component } from 'react';

import { connect } from 'react-redux';
import { 
	selectHomeIndexAct
} from './HomeAction';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import image1 from "../../img/cat1.png";
import image2 from "../../img/cat2.png";
import image3 from "../../img/cat3.png";

import {Carousel, Container} from "react-bootstrap";


const mapStateToProps = (state) => {
  return {
    homeIndex:state.homeRdc.homeIndex
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectHomeIndex:(selectedIndex) => 
    	dispatch(selectHomeIndexAct(selectedIndex))
  }
}


class Home extends Component  {

	render(){

		const {	homeIndex,
				onSelectHomeIndex
			} = this.props;
		
		return (
				<Container className="home_container">
					<Carousel activeIndex={homeIndex} onSelect={onSelectHomeIndex}>
				      <Carousel.Item>
				        <img
				          className="d-block w-100 img-fluid"
				          src={image1}
				          alt="First slide"
				        />
				        <Carousel.Caption>
				          <h1>No worry, you are fine</h1>
				        </Carousel.Caption>
				      </Carousel.Item>
				      <Carousel.Item>
				        <img
				          className="d-block w-100 img-fluid"
				          src={image2}
				          alt="Second slide"
				        />

				        <Carousel.Caption>
				          <h1>No worry, you are fine</h1>
				        </Carousel.Caption>
				      </Carousel.Item>
				      <Carousel.Item>
				        <img
				          className="d-block w-100 img-fluid"
				          src={image3}
				          alt="Third slide"
				        />

				        <Carousel.Caption>
				          <h1>No worry, you are fine</h1>
				        </Carousel.Caption>
				      </Carousel.Item>
				    </Carousel>
			    </Container>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);