import {
  REQUEST_TOPBAR_PENDING,
  REQUEST_TOPBAR_SUCCESS,
  REQUEST_TOPBAR_FAILED,
  REQUEST_SIDEBAR_PENDING,
  REQUEST_SIDEBAR_SUCCESS,
  REQUEST_SIDEBAR_FAILED,
  REQUEST_SIDEBAR_C_PENDING,
  REQUEST_SIDEBAR_C_SUCCESS,
  REQUEST_SIDEBAR_C_FAILED,
  REQUEST_BLOG_PENDING,
  REQUEST_BLOG_SUCCESS,
  REQUEST_BLOG_FAILED,
  REQUEST_BLOG_C_PENDING,
  REQUEST_BLOG_C_SUCCESS,
  REQUEST_BLOG_C_FAILED,
  REQUEST_BLOG_S_PENDING,
  REQUEST_BLOG_S_SUCCESS,
  REQUEST_BLOG_S_FAILED
 } from './constants';

export const requestTopbarAct = () => (dispatch) => {
	dispatch({ type: REQUEST_TOPBAR_PENDING })
	fetch('http://localhost:3001/topbar', {
	        method: 'get',
	        headers: {'Content-Type': 'application/json'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_TOPBAR_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_TOPBAR_FAILED, payload: error }))
};

export const requestSidebarAct = (topbarMenuID) => (dispatch) =>{
  dispatch({ type: REQUEST_SIDEBAR_PENDING })
    fetch(`http://localhost:3001/sidebar/id/${topbarMenuID}`, {
          method: 'get',
          headers: {'Content-Type': 'application/json'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_SIDEBAR_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_SIDEBAR_FAILED, payload: error }))
};

export const requestSidebarByClickAct = (topbarMenuPath) => (dispatch) =>{
  dispatch({ type: REQUEST_SIDEBAR_C_PENDING })
    fetch(`http://localhost:3001/sidebar/path${topbarMenuPath}`, {
          method: 'get',
          headers: {'Content-Type': 'application/json'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_SIDEBAR_C_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_SIDEBAR_C_FAILED, payload: error }))
};

export const requestBlogAct = (sidebarMenuPath) => (dispatch) =>{
  dispatch({ type: REQUEST_BLOG_PENDING })
    fetch(`http://localhost:3001/bloglist/path/${sidebarMenuPath}`, {
          method: 'get',
          headers: {'Content-Type': 'application/json'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_BLOG_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_BLOG_FAILED, payload: error }))
};

export const requestBlogByClickAct = (sidebarMenuPath) => (dispatch) =>{
  dispatch({ type: REQUEST_BLOG_C_PENDING })
    fetch(`http://localhost:3001/bloglist/path/${sidebarMenuPath}`, {
          method: 'get',
          headers: {'Content-Type': 'application/json'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_BLOG_C_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_BLOG_C_FAILED, payload: error }))
};

export const requestSingleBlogByClickAct = (blogPath) => (dispatch) =>{
  dispatch({ type: REQUEST_BLOG_S_PENDING })
    fetch(`http://localhost:3001/blog/path/${blogPath}`, {
          method: 'get',
          headers: {'Content-Type': 'application/json'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_BLOG_S_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_BLOG_S_FAILED, payload: error }))
};