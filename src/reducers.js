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
  REQUEST_BLOG_C_FAILED,
  REQUEST_BLOG_S_PENDING,
  REQUEST_BLOG_S_SUCCESS,
  REQUEST_BLOG_S_FAILED,
  REQUEST_CATEGORY_PENDING,
  REQUEST_CATEGORY_SUCCESS,
  REQUEST_CATEGORY_FAILED,
  REQUEST_CATEGORY_C_PENDING,
  REQUEST_CATEGORY_C_SUCCESS,
  REQUEST_CATEGORY_C_FAILED,
  POST_CATEGORY_PENDING,
  POST_CATEGORY_SUCCESS,
  POST_CATEGORY_FAILED,
  DELETE_CATEGORY_PENDING,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILED,
  SEARCH_CATEGORY_PENDING,
  SEARCH_CATEGORY_SUCCESS,
  SEARCH_CATEGORY_FAILED, 
  SELECT_UPDATE_CATEGORY,
  UPDATE_CATEGORY_PENDING,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILED, 
  CANCEL_UPDATE_CATEGORY,
  CLEAR_SEARCH_CATEGORY
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
  isPendingBlogByClick: false,
  isSingleBlogRequest: false,
  isPendingSingleBlog: false
}

export const requestBlogRdc = (state=initialStateBlog, action={}) => {
  switch (action.type) {
	case REQUEST_BLOG_PENDING:
	  return Object.assign({}, state, {isPendingBlog: true, isSingleBlogRequest: false})
	case REQUEST_BLOG_SUCCESS:
	  return Object.assign({}, state, {blogs: action.payload, isPendingBlog: false})
	case REQUEST_BLOG_FAILED:
	  return Object.assign({}, state, {error: action.payload})
	case REQUEST_BLOG_C_PENDING:
	  return Object.assign({}, state, {isPendingBlogByClick: true, isSingleBlogRequest: false})
	case REQUEST_BLOG_C_SUCCESS:
	  return Object.assign({}, state, {blogs: action.payload, isPendingBlogByClick: false})
	case REQUEST_BLOG_C_FAILED:
	  return Object.assign({}, state, {error: action.payload})  
  case REQUEST_BLOG_S_PENDING:
    return Object.assign({}, state, {isPendingSingleBlog: true, isSingleBlogRequest:true})
  case REQUEST_BLOG_S_SUCCESS:
    return Object.assign({}, state, {blogs: action.payload, isPendingSingleBlog: false})
  case REQUEST_BLOG_S_FAILED:
    return Object.assign({}, state, {error: action.payload}) 
	default:
	  return state
  }
}

const initialStateCategory= {
  categories: [],
  beforeUpdateCategory:[],
  isRefreshNeeded:false,
  // isPendingRequestCategory: false,
  // isPendingRequestCategoryByClick: false,
  // isPendingDeleteCategory:false,
  // isPendingPostCategory:false
}

export const categoryRdc = (state=initialStateCategory, action={}) => {
  switch (action.type) {
  case REQUEST_CATEGORY_PENDING:
    return Object.assign({}, state, {})
  case REQUEST_CATEGORY_SUCCESS:
    return Object.assign({}, state, {categories: action.payload, isRefreshNeeded:false})
  case REQUEST_CATEGORY_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case REQUEST_CATEGORY_C_PENDING:
    return Object.assign({}, state, {})
  case REQUEST_CATEGORY_C_SUCCESS:
    return Object.assign({}, state, {categories: action.payload, isRefreshNeeded:false})
  case REQUEST_CATEGORY_C_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case POST_CATEGORY_PENDING:
    return Object.assign({}, state, {})
  case POST_CATEGORY_SUCCESS:
    return Object.assign({}, state, {isRefreshNeeded:true})
  case POST_CATEGORY_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case DELETE_CATEGORY_PENDING:
    return Object.assign({}, state, {})
  case DELETE_CATEGORY_SUCCESS:
    return Object.assign({}, state, {isRefreshNeeded:true})
  case DELETE_CATEGORY_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case SEARCH_CATEGORY_PENDING:
    return Object.assign({}, state, {})
  case SEARCH_CATEGORY_SUCCESS:
    return Object.assign({}, state, {categories: action.payload, isRefreshNeeded:false})
  case SEARCH_CATEGORY_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case SELECT_UPDATE_CATEGORY:
    return Object.assign({}, state, {beforeUpdateCategory: action.payload, isRefreshNeeded:false})
  case UPDATE_CATEGORY_PENDING:
    return Object.assign({}, state, {})
  case UPDATE_CATEGORY_SUCCESS:
    return Object.assign({}, state, {isRefreshNeeded:true})
  case UPDATE_CATEGORY_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case CANCEL_UPDATE_CATEGORY:
    return Object.assign({}, state, {isRefreshNeeded:true})
  case CLEAR_SEARCH_CATEGORY:
    return Object.assign({}, state, {isRefreshNeeded:true})
  default:
    return state
  }
}





const rootReducer = combineReducers({
	requestTopbarRdc,
	requestSidebarRdc,
	requestBlogRdc,
  categoryRdc
});

export default rootReducer;