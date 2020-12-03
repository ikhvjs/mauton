import React, { Component } from 'react';
import { Switch, Route, withRouter } from "react-router";
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
	requestBlogListAct,
	searchBlogListAct,
	clearSearchBlogListAct,
	onchangeSearchBlogTitleAct,
	onchangeSearchCategoryNameAct,
	onchangeSearchTagNameAct,
} from './BlogListAction';
import { requestCategoryAct } from '../CategoryConfig/CategoryConfigAction';
import { requestTagAct } from '../TagConfig/TagConfigAction';
import { selectBlogAct, requestBlogAct, selectCreateBlogAct } from '../Blog/BlogAction';

import RequestErrorAlert from '../../components/RequestErrorAlert/RequestErrorAlert';
import Blog from '../Blog/Blog';
import BlogCreate from '../Blog/BlogCreate';

import { transformDate } from '../../utility/utility';
import { CardColumns, Card, Button, Row, Form, Col, Badge, Spinner } from "react-bootstrap";
import './BlogList.css';

const mapStateToProps = (state) => {
	return {
		blogList: state.blogListRdc.blogList,
		isPendingRequestBlogList: state.blogListRdc.isPendingRequestBlogList,
		isRequestBlogListFailed: state.blogListRdc.isRequestBlogListFailed,
		isRefreshBlogListNeeded: state.blogListRdc.isRefreshBlogListNeeded,
		searchBlogTitle: state.blogListRdc.searchBlogTitle,
		searchCategoryName: state.blogListRdc.searchCategoryName,
		searchTagName: state.blogListRdc.searchTagName,
		isShowBlog: state.blogRdc.isShowBlog,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestBlogList: () =>
			dispatch(requestBlogListAct()),
		onSelectBlog: (event) => {
			dispatch(selectBlogAct(event.target.getAttribute('blog-id')));
			dispatch(requestBlogAct());
		},
		onSearchBlogList: () =>
			dispatch(searchBlogListAct()),
		onClearSearchBlogList: (event) =>
			dispatch(clearSearchBlogListAct(event)),
		onChangeSearchBlogTitle: (event) =>
			dispatch(onchangeSearchBlogTitleAct(event)),
		onChangeCategoryName: (event) =>
			dispatch(onchangeSearchCategoryNameAct(event)),
		onChangeSearchTagName: (event) =>
			dispatch(onchangeSearchTagNameAct(event)),
		onSelectCreateBlog: () =>{
			dispatch(selectCreateBlogAct());
			dispatch(requestCategoryAct());
			dispatch(requestTagAct());
		}
			
	}
}


class BlogList extends Component {

	componentDidUpdate(prevProps) {
		if (this.props.isRefreshBlogListNeeded) {
			this.props.onRequestBlogList();
		}

		//scroll to top when click a blog
		if (this.props.location.pathname !== prevProps.location.pathname) {
			window.scrollTo(0, 0);
		}

	}


	render() {
		const {
			blogList,
			searchBlogTitle,
			onChangeSearchBlogTitle,
			searchCategoryName,
			onChangeCategoryName,
			searchTagName,
			onChangeSearchTagName,
			onSearchBlogList,
			onClearSearchBlogList,
			onSelectCreateBlog,
			isPendingRequestBlogList,
			isRequestBlogListFailed,
			onSelectBlog,
			isShowBlog
		} = this.props;

		return (
			<React.Fragment>
				{(isShowBlog)
					? (null)
					: (<Row id="blogist-row-container">
						<Col id="blogist-col-container">
							<Row className="mb-1 px-3">
								<Col xs={12} sm={4} md={3} className="my-1">
									<Form.Control
										size="sm"
										name="blog-title"
										type="text"
										placeholder="Blog Title"
										value={searchBlogTitle}
										onChange={onChangeSearchBlogTitle}
									/>
								</Col>
								<Col xs={12} sm={4} md={3} className="my-1">
									<Form.Control
										size="sm"
										name="category-name"
										type="text"
										placeholder="Category Name"
										value={searchCategoryName}
										onChange={onChangeCategoryName}
									/>
								</Col>
								<Col xs={12} sm={4} md={3} className="my-1">
									<Form.Control
										size="sm"
										name="tag-name"
										type="text"
										placeholder="Tag Name"
										value={searchTagName}
										onChange={onChangeSearchTagName}
									/>
								</Col>
								<Col name='button' xs={2} sm={2} md={1} className="my-1">
									<Button name="search" size="sm"
										onClick={onSearchBlogList}>Search</Button>
								</Col>
								<Col name='button' xs={2} sm={2} md={2} className="my-1">
									<Button name="clear" size="sm" variant="secondary"
										onClick={onClearSearchBlogList}>Clear</Button>
								</Col>
								<Col xs={6} sm={2} md={3} className="my-1">
									<Button name="create" variant="success" size="sm"
										onClick={onSelectCreateBlog}> Create </Button>
								</Col>
							</Row>

							<Row className="my-1 px-3">
								<Col>
									{(isPendingRequestBlogList)
										? (<div className="d-flex align-items-center justify-content-center">
											<Spinner
												as="span"
												animation="grow"
												size="sm"
												role="status"
												aria-hidden="true"
											/>
										Loading...
										</div>)
										: (isRequestBlogListFailed
											? (<RequestErrorAlert />)
											: (<CardColumns>
												{blogList.map(blog => {
													return (
														<Card bg="light" text="dark" border="warning"
															key={blog.blog_id} style={{ width: '18rem' }}
															id={blog.blog_id} >
															<Card.Header className="card-header-bloglist" as="h5">
																{blog.blog_title}
															</Card.Header>
															<Card.Body>
																<Card.Title as="h6">
																	Category:
																	<Badge pill className="ml-1" variant="warning">
																		{blog.blog_category_name}
																	</Badge>
																</Card.Title>
																<Card.Text>Tags:
																	{blog.tags.map((tag, index) => {
																	return (
																		<Badge pill key={index}
																			className="ml-1" variant="primary">
																			{tag.tag_name}
																		</Badge>
																	)
																})}
																</Card.Text>
																<Card.Text>
																	Seq:<Badge pill className="ml-1" variant="secondary">{blog.seq}</Badge>
																</Card.Text>
																<LinkContainer to={`${this.props.match.url}/${blog.blog_id}`}>
																	<Button size="sm" variant="link"
																		blog-id={blog.blog_id}
																		onClick={onSelectBlog}>
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
											)
										)
									}
								</Col>
							</Row>
						</Col>
					</Row>
					)}
				<Switch>
					<Route path={`${this.props.match.url}/:blogID`}>
						{(isShowBlog)
							? (<Blog />)
							: (null)
						}
					</Route>
				</Switch>
				<BlogCreate/>
			</React.Fragment>
		)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogList));