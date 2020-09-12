import React , { Component } from 'react';
import {  
	Switch,
	Route, 
	withRouter 
} from "react-router";
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { 
	requestBloglistAct,
	selectSearchBloglistAct,
	searchBloglistAct,
	clearSearchBloglistAct
} from './BloglistAction';

import { 
	requestBlogByClickAct,
	// requestBlogTagByClickAct,
	selectCreateBlogByClickAct
	} from '../../components/Blog/BlogAction';

// import {
// 	initTinyEditorAct
// 	} from '../../components/TinyEditorComponent/TinyEditorComponentAction';

import { transformDate } from '../../utility/utility';

import Blog from '../../components/Blog/Blog';
import BlogCreate from '../../components/Blog/BlogCreate';

// import TinyEditorComponent from '../../components/TinyEditorComponent/TinyEditorComponent';
// import Page404 from '../../components/Page404/Page404';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardColumns, Card, Button, Row, Form, Col,Container, Badge} from "react-bootstrap";
import './Bloglist.css';

const mapStateToProps = (state) => {
  return {
    bloglist:state.blogRdc.bloglist,
    isPendingBloglistByClick:state.blogRdc.isPendingBloglistByClick,
    isHiddenBloglist:state.blogRdc.isHiddenBloglist,
    isRefreshBloglistNeeded: state.blogRdc.isRefreshBloglistNeeded,
    blog:state.blogRdc.blog,
    isCreateBlog:state.blogRdc.isCreateBlog
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    onRequestBloglist:(sidebarMenuPath) => 
    	dispatch(requestBloglistAct(sidebarMenuPath)),
    onRequestBlogByClick:(event)=>{
    //event.target.getAttribute('value') is blog_path
    	dispatch(requestBlogByClickAct(event.target.getAttribute('value')));
    	// dispatch(requestBlogTagByClickAct(event.target.getAttribute('value')));
    },
    onSearchBloglist:(event)=>
    	dispatch(searchBloglistAct(
    		selectSearchBloglistAct(event,ownProps.match.params.sidebarMenuPath))),
    onClearSearchBloglist:(event)=>
    	dispatch(clearSearchBloglistAct(event)),
    onSelectCreateBlogByClick:()=> {
    	dispatch(selectCreateBlogByClickAct());
    }
  }
}


class Bloglist extends Component  {

	componentDidMount() {
		const { isPendingBloglistByClick, onRequestBloglist } = this.props;
		const { sidebarMenuPath }=this.props.match.params;

		if (isPendingBloglistByClick === false){
	    	onRequestBloglist(sidebarMenuPath);
		}

	}


	componentDidUpdate(prevProps) {
		const { onRequestBloglist, isRefreshBloglistNeeded } = this.props;
		const { sidebarMenuPath }=this.props.match.params;

		if (isRefreshBloglistNeeded === true) {
			onRequestBloglist(sidebarMenuPath);
		}
		
	}


	render(){
		const {
			bloglist,
			blog,
			// isHiddenBloglist,
			onRequestBlogByClick,
			onSearchBloglist,
			onClearSearchBloglist,
			onSelectCreateBlogByClick,
			isCreateBlog
			} = this.props;

		const { sidebarMenuPath }=this.props.match.params;
		

		return (
			<React.Fragment>
			
				<Container name="bloglist-control-wrapper" 
					className={
						(isCreateBlog)?"hidden-container":
							((blog.length ===1)?"hidden-container":null)
					}>
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
								<Button size="sm" variant="secondary" 
									onClick={onClearSearchBloglist}>Clear</Button>
						</Col>
						<Col name='button' xs={1}>
						</Col>
						<Col name='button' xs={0.3}>
							{
							// <LinkContainer to={`${this.props.match.url}/blogcreate`}>
							// 	<Button size="sm" variant="success" 
							// 	onClick={onSelectCreateBlogByClick}>Create</Button>
							// </LinkContainer>
							}
							<Button size="sm" variant="success" 
								onClick={onSelectCreateBlogByClick}>Create</Button>
						</Col>
					</Form.Row>
					<br/>
					<Row name="bloglist-container" >
						<CardColumns>
							{ bloglist.map(blog =>{
								return(
									<Card bg="dark" text="white" border="warning"
										key={blog.blog_id} style={{ width: '18rem'}}
										id={blog.blog_id} className='bloglist' >
									  <Card.Header as="h5">
									  	{blog.blog_title}
									  </Card.Header>
									  <Card.Body>
									    <Card.Title as="h6">
									    	Category:
									    	<Badge pill variant="warning">
									    		{blog.blog_category_name}
									    	</Badge>
									    </Card.Title>
									    <Card.Text>
									    	{blog.blog_desc}
									    </Card.Text>
									    <Card.Text>Tags: 
						                	{blog.tags.map((tag,index)=>{
						                		return(
						                			<Badge pill key={index} className="blog-tag"
						                				variant="primary">{tag.tag_name}</Badge>
						                		)
						                	})}
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
									    	<small >
									  			{`last updated:${transformDate(blog.last_updated_date)}`}
									  		</small>
									    </Card.Text>
									  </Card.Body>
									</Card>
								)
							})}
						</CardColumns>
					</Row>
				</Container>
				<Container name="createblog-wrapper" className={isCreateBlog?null:"hidden-container"}>
					<Row name="createblog" >
						<BlogCreate sidebarMenuPath={sidebarMenuPath}/>
					</Row>
				</Container>
				<Container name="blog-content">
					<Switch>
						<Route path={`${this.props.match.url}/:blogPath`}>
							<Row name="showblog" 
								className={(isCreateBlog)?"hidden-container":
									((blog.length ===1)?null:"hidden-container")
							}>
								<Blog />
							</Row>
						</Route>
					</Switch>
				</Container>
			</React.Fragment>
		)
	}

}

//withRouter() is used to access this.props.match.params
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Bloglist));