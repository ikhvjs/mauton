import { combineReducers } from 'redux';

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
  REQUEST_BLOG_C_FAILED  
 } from './constants';


const initialStateTopbar = {
  topbars: [],
  isPendingTopbar: true
}

export const requestTopbarRdc = (state=initialStateTopbar, action={}) => {
  switch (action.type) {
  	case REQUEST_TOPBAR_PENDING:
      return Object.assign({}, state, {isPendingTopbar: true})
    case REQUEST_TOPBAR_SUCCESS:
      return Object.assign({}, state, {topbars: action.payload, isPendingTopbar: false})
    case REQUEST_TOPBAR_FAILED:
      return Object.assign({}, state, {error: action.payload})
    default:
      return state
  }
}


const initialStateSidebar = {
  sidebars: [],
  isPendingSidebar: false,
  isPendingSidebarByClick: false
}

export const requestSidebarRdc = (state=initialStateSidebar, action={}) => {
  switch (action.type) {
	case REQUEST_SIDEBAR_PENDING:
	  return Object.assign({}, state, {isPendingSidebar: true})
	case REQUEST_SIDEBAR_SUCCESS:
	  return Object.assign({}, state, {sidebars: action.payload, isPendingSidebar: false})
	case REQUEST_SIDEBAR_FAILED:
	  return Object.assign({}, state, {error: action.payload})
	case REQUEST_SIDEBAR_C_PENDING:
	  return Object.assign({}, state, {isPendingSidebarByClick: true})
	case REQUEST_SIDEBAR_C_SUCCESS:
	  return Object.assign({}, state, {sidebars: action.payload, isPendingSidebarByClick: false})
	case REQUEST_SIDEBAR_C_FAILED:
	  return Object.assign({}, state, {error: action.payload})  
	default:
	  return state
  }
}



const initialStateBlog = {
  blogs: [],
  isPendingBlog: false,
  isPendingBlogByClick: false
}

export const requestBlogRdc = (state=initialStateBlog, action={}) => {
  switch (action.type) {
	case REQUEST_BLOG_PENDING:
	  return Object.assign({}, state, {isPendingBlog: true})
	case REQUEST_BLOG_SUCCESS:
	  return Object.assign({}, state, {blogs: action.payload, isPendingBlog: false})
	case REQUEST_BLOG_FAILED:
	  return Object.assign({}, state, {error: action.payload})
	case REQUEST_BLOG_C_PENDING:
	  return Object.assign({}, state, {isPendingBlogByClick: true})
	case REQUEST_BLOG_C_SUCCESS:
	  return Object.assign({}, state, {blogs: action.payload, isPendingBlogByClick: false})
	case REQUEST_BLOG_C_FAILED:
	  return Object.assign({}, state, {error: action.payload})  
	default:
	  return state
  }
}

const rootReducer = combineReducers({
	requestTopbarRdc,
	requestSidebarRdc,
	requestBlogRdc
});

export default rootReducer;