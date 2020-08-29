import React , { Component } from 'react';
import {  
	Switch,
	Route, 
	withRouter 
} from "react-router";
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import { 
	requestBloglistAct
} from './BloglistAction';

import Blog from '../../components/Blog/Blog';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardColumns, Card, Button, Row} from "react-bootstrap";
import './Bloglist.css';

const mapStateToProps = (state) => {
  return {
    bloglist:state.requestBloglistRdc.bloglist,
    isPendingBloglistByClick:state.requestBloglistRdc.isPendingBloglistByClick
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestBloglist:(sidebarMenuPath) => 
    	dispatch(requestBloglistAct(sidebarMenuPath))
  }
}

class Bloglist extends Component  {

	componentDidMount() {
		const {
			isPendingBloglistByClick,
			onRequestBloglist
			} = this.props;

		if (isPendingBloglistByClick === false){
	    	onRequestBloglist(this.props.match.params.sidebarMenuPath);
		}
	}

	render(){
		const {
			bloglist
			} = this.props;

		return (
			<React.Fragment>
				<Row name="bloglist-container">
					<CardColumns>
						{ bloglist.map(blog =>{
								return(
									<Card key={blog.blog_id} style={{ width: '18rem'}}
										className='bloglist'>
									  <Card.Body>
									    <Card.Title>{blog.blog_title}</Card.Title>
									    <Card.Subtitle className="mb-2 text-muted">
									    	{blog.blog_category_name}
									    </Card.Subtitle>
									    <Card.Subtitle className="mb-2 text-muted">
									    	Blog tag
									    </Card.Subtitle>
									    <Card.Text>
									    	{blog.blog_content.substr(0, 100)+'...'}
									    </Card.Text>
									    <LinkContainer to={`${this.props.match.url}/${blog.blog_path}`}>
									    	<Button variant="link" 
										    	value={blog.blog_path}
										    	// onClick={onRequestSingleBlogByClick}
										    >
										    	
										    		Click for details...
										    		
										    </Button>
									    </LinkContainer>
									    
									    <Button onClick={()=>console.log(blog.blog_path)}>
									    	Check
									    </Button>

									  </Card.Body>
									  <Card.Footer>
									  	<small className="text-muted">
									  		Last updated 3 mins ago
									  	</small>
									  </Card.Footer>
									</Card>
								)
							})

						}
					</CardColumns>
				</Row>
				<Row name="blog-container">
					<Switch>
						<Route path={`${this.props.match.url}/:blogPath`}>
							<Blog />
						</Route>
					</Switch>
				</Row>
			</React.Fragment>
		)
	}

}

//withRouter() is used to access this.props.match.params
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Bloglist));