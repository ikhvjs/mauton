import React , { Component } from 'react';
import {  
	Switch,
	Route, 
	withRouter 
} from "react-router";
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import { 
	requestBloglistAct,
	requestBlogByClickAct,
	selectSearchBloglistAct,
	searchBloglistAct
} from './BloglistAction';

import Blog from '../../components/Blog/Blog';
// import Page404 from '../../components/Page404/Page404';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardColumns, Card, Button, Row, Form, Col} from "react-bootstrap";
import './Bloglist.css';

const mapStateToProps = (state) => {
  return {
    bloglist:state.blogRdc.bloglist,
    isPendingBloglistByClick:state.blogRdc.isPendingBloglistByClick,
    isHiddenBloglist:state.blogRdc.isHiddenBloglist
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestBloglist:(sidebarMenuPath) => 
    	dispatch(requestBloglistAct(sidebarMenuPath)),
    onRequestBlogByClick:(event)=>
    //event.target.value is blog_path
    	dispatch(requestBlogByClickAct(event.target.value)),
    onSearchBloglist:(event)=>
    	dispatch(searchBloglistAct(selectSearchBloglistAct(event)))
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
			bloglist,
			isHiddenBloglist,
			onRequestBlogByClick,
			onSearchBloglist
			} = this.props;

		this.transformDate = (dateInput) =>{
			var date = new Date(dateInput);
			
			function pad(n) {
				return n<10 ? '0'+n : n
			}
			return  date.getFullYear() +
	   				 "-" +
	   				 pad(date.getMonth()+1) +
	   				 "-" +
	   				 pad(date.getDate()) 
		}
		

		return (
			<React.Fragment>
				<div name="bloglist-control-wrapper" 
					className={isHiddenBloglist?"hidden-container":""}>
					<Form.Row name="search_blog">
						<Col xs={4}>
							<Form.Control size="sm" name="blog_title"
								type="text" placeholder="Enter Blog Title" />
						</Col>
						<Col xs={2}>
							<Form.Control size="sm" name="blog_category_name"
								type="text" placeholder="Enter Category Name" />
						</Col>
						<Col xs={2}>
							<Form.Control size="sm" name="tag_name"
								type="text" placeholder="Enter Tag Name" />
						</Col>
						<Col name='button' xs={0.3}>   
							<Button size="sm" onClick={onSearchBloglist}>Search</Button>
						</Col>
						<Col name='button' xs={0.3}>
							<Button size="sm" variant="secondary" onClick={null}>Clear</Button>
						</Col>
					</Form.Row>
					<br/>
					<Form.Row>
						<Col name='button' xs={0.3}>
							<Button size="sm" variant="success" onClick={null}>Create</Button>
						</Col>
					</Form.Row>
					<br/>
					<Row name="bloglist-container" >
						<CardColumns>
							{ bloglist.map(blog =>{
								return(
									<Card key={blog.blog_id} style={{ width: '18rem'}}
										id={blog.blog_id} className='bloglist' >
									  <Card.Header as="h5">{blog.blog_title}</Card.Header>
									  <Card.Body>
									    <Card.Title>{blog.blog_category_name}</Card.Title>
									    <Card.Text>
									    	{blog.blog_desc}
									    	{
									    		// .substr(0, 100)+'...'
									    	}
									    </Card.Text>
									    <LinkContainer to={`${this.props.match.url}/${blog.blog_path}`}>
									    	<Button size="sm" variant="link" 
										    	value={blog.blog_path}
										    	onClick={onRequestBlogByClick}
										    >
										    Click here for details...
										    </Button>
									    </LinkContainer>
									    <Card.Text>
									    	<small className="text-muted">
									  			{`last updated:${this.transformDate(blog.last_updated_date)}`}
									  		</small>
									    </Card.Text>
									  </Card.Body>
									</Card>
								)
							})}
						</CardColumns>
					</Row>
				</div>
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