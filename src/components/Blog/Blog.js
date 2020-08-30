import React , { Component } from 'react';
import { 
	withRouter 
} from "react-router";

import { connect } from 'react-redux';

import { 
	requestBlogAct
} from './BlogAction';



const mapStateToProps = (state) => {
  return {
    blog:state.blogRdc.blog,
    isPendingBlogByClick:state.blogRdc.isPendingBlogByClick
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestBlog:(blogPath)=>
    	dispatch(requestBlogAct(blogPath))
  }
}

class Blog extends Component  {

	componentDidMount() {
		const {
			isPendingBlogByClick,
			onRequestBlog
			} = this.props;

		if (isPendingBlogByClick === false){
	    	onRequestBlog(this.props.match.params.blogPath);
		}
	}

	render(){
		return(
			<h1>blog page</h1>


		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));