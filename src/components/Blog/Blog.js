import React , { Component } from 'react';
import { 
	withRouter 
} from "react-router";

import { connect } from 'react-redux';

import { 
	requestBlogByClickAct
} from './BlogAction';



const mapStateToProps = (state) => {
  return {
    blog:state.requestBlogRdc.blog,
    isPendingBlog:state.requestBlogRdc.isPendingBlog
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  	onRequestSingleBlogByClick:(event) => 
    	dispatch(requestBlogByClickAct(event.target.getAttribute('value')))
  }
}

class Blog extends Component  {

	render(){
		console.log('this.props.match', this.props.match);
		// const { blog 
		// 	} = this.props;
		return(
			<h1>blog page</h1>


		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));