import React , { Component } from 'react';
import { connect } from 'react-redux';
import { 
	closeDeleteBlogAlertAct
} from './DeleteBlogAlertAction';

import { 
	deleteBlogAct
} from '../Blog/BlogAction';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Button} from "react-bootstrap";


const mapStateToProps = (state) => {
  return {
  	isShowDeleteBlogAlert:state.blogRdc.isShowDeleteBlogAlert
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onCloseDeleteBlogAlert:()=>
			dispatch(closeDeleteBlogAlertAct()),
		onDeleteBlog:()=>
			dispatch(deleteBlogAct())
	}	
}

class DeleteBlogAlert extends Component  {

	
	componentWillUnmount() {
		if (this.props.isShowDeleteBlogAlert===true){
			this.props.onCloseDeleteBlogAlert();
		}
	}

	render() {
		const { 
			isShowDeleteBlogAlert,
			onCloseDeleteBlogAlert,
			onDeleteBlog
			} = this.props;

		return (
			
				(<Alert variant="danger" show={isShowDeleteBlogAlert} 
					onClose={onCloseDeleteBlogAlert} dismissible>
			        <Alert.Heading>Are you sure to delete the Blog?</Alert.Heading>
			        <p>
			          Once you delete the blog, you no longer recover it.
			        </p>
			        <hr />
			        <div className="d-flex justify-content-end">
				       	<Button onClick={onDeleteBlog} variant="outline-danger">
				            Delete
				        </Button>
				        <Button className="ml-2" onClick={onCloseDeleteBlogAlert} variant="outline-secondary">
				            Cancel
				        </Button>
			        </div>
			    </Alert>)
		)


	}

}


export default connect(mapStateToProps, mapDispatchToProps)(DeleteBlogAlert)