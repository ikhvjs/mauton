import React , { Component } from 'react';
import { withRouter } from "react-router";

import 'bootstrap/dist/css/bootstrap.min.css';
import {CardColumns, Card} from "react-bootstrap";
import './Bloglist.css';



class Bloglist extends Component  {

	componentDidMount() {
		if (this.props.isPendingBlogByClick === false){
	    	this.props.onRequestBlog(this.props.match.params.sidebarMenuPath);
		}
	}

	render(){
		const {blogs} = this.props;
		return (
			<CardColumns>
				{blogs.map(blog =>{
					return(
						<Card key={blog.blog_id} style={{ width: '18rem'}}
							className='bloglist'>
						  <Card.Body>
						    <Card.Title>{blog.blog_title}</Card.Title>
						    <Card.Subtitle className="mb-2 text-muted">Blog Category</Card.Subtitle>
						    <Card.Text>{blog.blog_content}</Card.Text>
						    <Card.Link href="#">Card Link</Card.Link>
						    <Card.Link href="#">Another Link</Card.Link>
						  </Card.Body>
						  <Card.Footer>
						  	<small className="text-muted">Last updated 3 mins ago</small>
						  </Card.Footer>
						</Card>
					)
				})}
			</CardColumns>
		)
	}

}

//withRouter() is used to fecth this.props.match.params
export default withRouter(Bloglist);