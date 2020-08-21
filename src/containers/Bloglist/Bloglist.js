import React , { Component } from 'react';
import {  
	// Switch,
	// Route, 
	withRouter 
} from "react-router";
// import { LinkContainer } from 'react-router-bootstrap'

import Blog from '../../components/Blog/Blog';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardColumns, Card, Button} from "react-bootstrap";
import './Bloglist.css';



class Bloglist extends Component  {

	componentDidMount() {
		const {
			isPendingBlogByClick,
			onRequestBlog,
			isSingleBlogRequest
		}=this.props;

		if (isPendingBlogByClick === false
			&& isSingleBlogRequest === false){
	    	onRequestBlog(this.props.match.params.sidebarMenuPath);
		}
	}

	render(){
		const {
			blogs,
			onRequestSingleBlogByClick,
			isSingleBlogRequest
			} = this.props;

		return (
			<CardColumns>

				{ isSingleBlogRequest ?
					(<Blog blogs={blogs}/>)
					:
					(blogs.map(blog =>{
						return(
							<Card key={blog.blog_id} style={{ width: '18rem'}}
								className='bloglist'>
							  <Card.Body>
							    <Card.Title>{blog.blog_title}</Card.Title>
							    <Card.Subtitle className="mb-2 text-muted">{blog.blog_category_name}</Card.Subtitle>
							    <Card.Subtitle className="mb-2 text-muted">Blog tag</Card.Subtitle>
							    <Card.Text>{blog.blog_content.substr(0, 100)+'...'}</Card.Text>
							    <Button variant="link" 
							    	value={blog.blog_path}
							    	onClick={onRequestSingleBlogByClick}>
							    	Click for details...
							    </Button>
							    <Button onClick={()=>console.log(blog.blog_path)}>
							    	Check
							    </Button>

							  </Card.Body>
							  <Card.Footer>
							  	<small className="text-muted">Last updated 3 mins ago</small>
							  </Card.Footer>
							</Card>
						)
					}))

				}
			</CardColumns>
		)
	}

}

//withRouter() is used to access this.props.match.params
export default withRouter(Bloglist);