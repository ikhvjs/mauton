import { combineReducers } from 'redux';

import {
//Home
  SELECT_HOME_INDEX,
//Topbar
  REQUEST_TOPBAR_PENDING,
  REQUEST_TOPBAR_SUCCESS,
  REQUEST_TOPBAR_FAILED,
//Sidebar
  REQUEST_SIDEBAR_PENDING,
  REQUEST_SIDEBAR_SUCCESS,
  REQUEST_SIDEBAR_FAILED,
  REQUEST_SIDEBAR_C_PENDING,
  REQUEST_SIDEBAR_C_SUCCESS,
  REQUEST_SIDEBAR_C_FAILED,
//Bloglist
  REQUEST_BLOGLIST_PENDING,
  REQUEST_BLOGLIST_SUCCESS,
  REQUEST_BLOGLIST_FAILED,
  REQUEST_BLOGLIST_C_PENDING,
  REQUEST_BLOGLIST_C_SUCCESS,
  REQUEST_BLOGLIST_C_FAILED,
  SEARCH_BLOGLIST_PENDING,
  SEARCH_BLOGLIST_SUCCESS,
  SEARCH_BLOGLIST_FAILED,
  CLEAR_SEARCH_BLOGLIST,
//Blog
  REQUEST_BLOG_C_PENDING,
  REQUEST_BLOG_C_SUCCESS,
  REQUEST_BLOG_C_FAILED,
  REQUEST_BLOG_PENDING,
  REQUEST_BLOG_SUCCESS,
  REQUEST_BLOG_FAILED,
  REQUEST_BLOG_TAG_PENDING,
  REQUEST_BLOG_TAG_SUCCESS,
  REQUEST_BLOG_TAG_FAILED,
  REQUEST_BLOG_TAG_C_PENDING,
  REQUEST_BLOG_TAG_C_SUCCESS,
  REQUEST_BLOG_TAG_C_FAILED,
  SELECT_CREATE_BLOG,
  SELECT_CREATE_BLOG_C,
  CLICK_SAVE_BLOG,
  ONCHANGE_BLOG_CONTENT,
//Category
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
  CLEAR_SEARCH_CATEGORY,
//TAG
  REQUEST_TAG_PENDING,
  REQUEST_TAG_SUCCESS,
  REQUEST_TAG_FAILED,
  REQUEST_TAG_C_PENDING,
  REQUEST_TAG_C_SUCCESS,
  REQUEST_TAG_C_FAILED,
  POST_TAG_PENDING,
  POST_TAG_SUCCESS,
  POST_TAG_FAILED,
  DELETE_TAG_PENDING,
  DELETE_TAG_SUCCESS,
  DELETE_TAG_FAILED,
  SEARCH_TAG_PENDING,
  SEARCH_TAG_SUCCESS,
  SEARCH_TAG_FAILED, 
  SELECT_UPDATE_TAG,
  UPDATE_TAG_PENDING,
  UPDATE_TAG_SUCCESS,
  UPDATE_TAG_FAILED, 
  CANCEL_UPDATE_TAG,
  CLEAR_SEARCH_TAG,
//MenuConfig
  SET_MENU_TAB_NOT_DISABLE,
//Menu1
  REQUEST_MENU1_PENDING,
  REQUEST_MENU1_SUCCESS,
  REQUEST_MENU1_FAILED, 
  REQUEST_MENU1_C_PENDING,
  REQUEST_MENU1_C_SUCCESS,
  REQUEST_MENU1_C_FAILED,
  POST_MENU1_PENDING,
  POST_MENU1_SUCCESS,
  POST_MENU1_FAILED,
  DELETE_MENU1_PENDING,
  DELETE_MENU1_SUCCESS,
  DELETE_MENU1_FAILED,
  SEARCH_MENU1_PENDING,
  SEARCH_MENU1_SUCCESS,
  SEARCH_MENU1_FAILED, 
  SELECT_UPDATE_MENU1,
  UPDATE_MENU1_PENDING,
  UPDATE_MENU1_SUCCESS,
  UPDATE_MENU1_FAILED, 
  CANCEL_UPDATE_MENU1,
  CLEAR_SEARCH_MENU1, 
//Menu2
  REQUEST_MENU2_PENDING,
  REQUEST_MENU2_SUCCESS,
  REQUEST_MENU2_FAILED, 
  REQUEST_MENU2_C_PENDING,
  REQUEST_MENU2_C_SUCCESS,
  REQUEST_MENU2_C_FAILED,
  POST_MENU2_PENDING,
  POST_MENU2_SUCCESS,
  POST_MENU2_FAILED,
  DELETE_MENU2_PENDING,
  DELETE_MENU2_SUCCESS,
  DELETE_MENU2_FAILED,
  SEARCH_MENU2_PENDING,
  SEARCH_MENU2_SUCCESS,
  SEARCH_MENU2_FAILED, 
  SELECT_UPDATE_MENU2,
  UPDATE_MENU2_PENDING,
  UPDATE_MENU2_SUCCESS,
  UPDATE_MENU2_FAILED, 
  CANCEL_UPDATE_MENU2,
  CLEAR_SEARCH_MENU2,
  SELECT_CREATE_PARENT_MENU_NAME,
  SELECT_UPDATE_PARENT_MENU_NAME,
  CLEAR_CREATE_MENU2,
  SET_NOT_ALLOW_UPDATE_PARENT_MENU_NAME,
  //Parent Menu Modal
  CLOSE_PARENT_MENU_MODAL,
  REQUEST_PARENT_MENU_PENDING,
  REQUEST_PARENT_MENU_SUCCESS,
  REQUEST_PARENT_MENU_FAILED,
  SEARCH_PARENT_MENU_PENDING,
  SEARCH_PARENT_MENU_SUCCESS,
  SEARCH_PARENT_MENU_FAILED,
  CLEAR_SEARCH_PARENT_MENU,
  SELECT_CREATE_PARENT_MENU,
  SELECT_UPDATE_PARENT_MENU,
//TINY EDITOR
  INIT_TINY_EDITOR
 } from './constants';



const initialStateHome= {
  homeIndex: 0
}

export const homeRdc = (state=initialStateHome, action={}) => {
  switch (action.type) {
    case SELECT_HOME_INDEX:
      return Object.assign({}, state, {homeIndex: action.payload})
    default:
      return state
  }
}


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
  bloglist: [],
  isPendingBloglistByClick: false,
  blog: [],
  isPendingBlogByClick: false,
  isRefreshBloglistNeeded:false,
  tags:[],
  isCreateBlog:false,
  editorContent:[],
  isCreateBlogByClick:false,
  blogContent:[]
}

export const blogRdc = (state=initialStateBlog, action={}) => {
  switch (action.type) {
// Bloglist
	case REQUEST_BLOGLIST_PENDING:
	  return Object.assign({}, state, { blog:{} })
	case REQUEST_BLOGLIST_SUCCESS:
	  return Object.assign({}, state, 
      {bloglist: action.payload,isRefreshBloglistNeeded:false})
	case REQUEST_BLOGLIST_FAILED:
	  return Object.assign({}, state, {error: action.payload})
	case REQUEST_BLOGLIST_C_PENDING:
	  return Object.assign({}, state, 
      {isPendingBloglistByClick: true,blog:{}, 
      isCreateBlog:false, isCreateBlogByClick:false})
	case REQUEST_BLOGLIST_C_SUCCESS:
	  return Object.assign({}, state, 
      {bloglist: action.payload, isPendingBloglistByClick: false,
        isRefreshBloglistNeeded:false})
	case REQUEST_BLOGLIST_C_FAILED:
	  return Object.assign({}, state, {error: action.payload})
  case SEARCH_BLOGLIST_PENDING:
    return Object.assign({}, state, {})
  case SEARCH_BLOGLIST_SUCCESS:
    return Object.assign({}, state, {bloglist:action.payload,isRefreshBloglistNeeded:false})
  case SEARCH_BLOGLIST_FAILED:
    return Object.assign({}, state, {error: action.payload}) 
  case CLEAR_SEARCH_BLOGLIST:
    return Object.assign({}, state, {isRefreshBloglistNeeded:true}) 
//Blog
  case REQUEST_BLOG_C_PENDING:
    return Object.assign({}, state, {isPendingBlogByClick: true})
  case REQUEST_BLOG_C_SUCCESS:
    return Object.assign({}, state,  {blog: action.payload, isPendingBlogByClick: false})
  case REQUEST_BLOG_C_FAILED:
    return Object.assign({}, state, {error: action.payload}) 
  case REQUEST_BLOG_PENDING:
    return Object.assign({}, state, {})
  case REQUEST_BLOG_SUCCESS:
    return Object.assign({}, state, {blog: action.payload})
  case REQUEST_BLOG_FAILED:
    return Object.assign({}, state, {error: action.payload}) 
  case REQUEST_BLOG_TAG_PENDING:
    return Object.assign({}, state, {})
  case REQUEST_BLOG_TAG_SUCCESS:
    return Object.assign({}, state,  {tags: action.payload})
  case REQUEST_BLOG_TAG_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case REQUEST_BLOG_TAG_C_PENDING:
    return Object.assign({}, state, {})
  case REQUEST_BLOG_TAG_C_SUCCESS:
    return Object.assign({}, state,  {tags: action.payload})
  case REQUEST_BLOG_TAG_C_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case SELECT_CREATE_BLOG:
    return Object.assign({}, state, {isCreateBlog: true})
  case SELECT_CREATE_BLOG_C:
    return Object.assign({}, state, 
      {isCreateBlog: true, isCreateBlogByClick:true})
  case CLICK_SAVE_BLOG:
    return Object.assign({}, state, {})
  case ONCHANGE_BLOG_CONTENT:
    return Object.assign({}, state, {blogContent: action.payload})
//TinyMCE Editor
  case INIT_TINY_EDITOR:
      return Object.assign({}, state, {})
  default:
    return state  
  }
}




const initialStateCategory= {
  categories: [],
  beforeUpdateCategory:[],
  isRefreshCategoryNeeded:false,
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
    return Object.assign({}, state, {categories: action.payload, isRefreshCategoryNeeded:false})
  case REQUEST_CATEGORY_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case REQUEST_CATEGORY_C_PENDING:
    return Object.assign({}, state, {})
  case REQUEST_CATEGORY_C_SUCCESS:
    return Object.assign({}, state, {categories: action.payload, isRefreshCategoryNeeded:false})
  case REQUEST_CATEGORY_C_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case POST_CATEGORY_PENDING:
    return Object.assign({}, state, {})
  case POST_CATEGORY_SUCCESS:
    return Object.assign({}, state, {isRefreshCategoryNeeded:true})
  case POST_CATEGORY_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case DELETE_CATEGORY_PENDING:
    return Object.assign({}, state, {})
  case DELETE_CATEGORY_SUCCESS:
    return Object.assign({}, state, {isRefreshCategoryNeeded:true})
  case DELETE_CATEGORY_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case SEARCH_CATEGORY_PENDING:
    return Object.assign({}, state, {})
  case SEARCH_CATEGORY_SUCCESS:
    return Object.assign({}, state, {categories: action.payload, isRefreshCategoryNeeded:false})
  case SEARCH_CATEGORY_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case SELECT_UPDATE_CATEGORY:
    return Object.assign({}, state, {beforeUpdateCategory: action.payload, isRefreshCategoryNeeded:false})
  case UPDATE_CATEGORY_PENDING:
    return Object.assign({}, state, {})
  case UPDATE_CATEGORY_SUCCESS:
    return Object.assign({}, state, {isRefreshCategoryNeeded:true})
  case UPDATE_CATEGORY_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case CANCEL_UPDATE_CATEGORY:
    return Object.assign({}, state, {isRefreshCategoryNeeded:true})
  case CLEAR_SEARCH_CATEGORY:
    return Object.assign({}, state, {isRefreshCategoryNeeded:true})
  default:
    return state
  }
}




const initialStateTag= {
  tags: [],
  beforeUpdateTag:[],
  isRefreshTagNeeded:false
  // isPendingRequestCategory: false,
  // isPendingRequestCategoryByClick: false,
  // isPendingDeleteCategory:false,
  // isPendingPostCategory:false
}

export const tagRdc = (state=initialStateTag, action={}) => {
  switch (action.type) {
  case REQUEST_TAG_PENDING:
    return Object.assign({}, state, {})
  case REQUEST_TAG_SUCCESS:
    return Object.assign({}, state, {tags: action.payload, isRefreshTagNeeded:false})
  case REQUEST_TAG_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case REQUEST_TAG_C_PENDING:
    return Object.assign({}, state, {})
  case REQUEST_TAG_C_SUCCESS:
    return Object.assign({}, state, {tags: action.payload, isRefreshTagNeeded:false})
  case REQUEST_TAG_C_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case POST_TAG_PENDING:
    return Object.assign({}, state, {})
  case POST_TAG_SUCCESS:
    return Object.assign({}, state, {isRefreshTagNeeded:true})
  case POST_TAG_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case DELETE_TAG_PENDING:
    return Object.assign({}, state, {})
  case DELETE_TAG_SUCCESS:
    return Object.assign({}, state, {isRefreshTagNeeded:true})
  case DELETE_TAG_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case SEARCH_TAG_PENDING:
    return Object.assign({}, state, {})
  case SEARCH_TAG_SUCCESS:
    return Object.assign({}, state, {tags: action.payload, isRefreshTagNeeded:false})
  case SEARCH_TAG_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case SELECT_UPDATE_TAG:
    return Object.assign({}, state, {beforeUpdateCategory: action.payload, isRefreshTagNeeded:false})
  case UPDATE_TAG_PENDING:
    return Object.assign({}, state, {})
  case UPDATE_TAG_SUCCESS:
    return Object.assign({}, state, {isRefreshTagNeeded:true})
  case UPDATE_TAG_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case CANCEL_UPDATE_TAG:
    return Object.assign({}, state, {isRefreshTagNeeded:true})
  case CLEAR_SEARCH_TAG:
    return Object.assign({}, state, {isRefreshTagNeeded:true})
  default:
    return state
  }
}

const initialStateMenu= {
  menus1: [],
  beforeUpdateMenu1:[],
  isRefreshMenu1Needed:false,
  isRefreshTopbarNeeded:false,
  menus2: [],
  beforeUpdateMenu2:[],
  isRefreshMenu2Needed:false,
  menuLevel:1,
  isShowParentMenuModal:false,
  parentMenus:[],
  isRefreshParentMenuNeeded: false,
  createParentMenu:[],
  updateParentMenu:[],
  isAllowUpdateParentMenuName:false,
  isCreateActionMenu2:false,
  isDisableMenuTab:false
}

export const menuRdc = (state=initialStateMenu, action={}) => {
  switch (action.type) {
  //MenuConfig
  case SET_MENU_TAB_NOT_DISABLE:
    return Object.assign({}, state, {isDisableMenuTab:false})
  //Menu1
  case REQUEST_MENU1_PENDING:
    return Object.assign({}, state, {})
  case REQUEST_MENU1_SUCCESS:
    return Object.assign({}, state, {menus1: action.payload, isRefreshMenu1Needed:false})
  case REQUEST_MENU1_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case REQUEST_MENU1_C_PENDING:
    return Object.assign({}, state, {})
  case REQUEST_MENU1_C_SUCCESS:
    return Object.assign({}, state, {menus1: action.payload, isRefreshMenu1Needed:false})
  case REQUEST_MENU1_C_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case POST_MENU1_PENDING:
    return Object.assign({}, state, {})
  case POST_MENU1_SUCCESS:
    return Object.assign({}, state, 
      {isRefreshMenu1Needed:true, isRefreshTopbarNeeded:true, isRefreshParentMenuNeeded:true})
  case POST_MENU1_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case DELETE_MENU1_PENDING:
    return Object.assign({}, state, {})
  case DELETE_MENU1_SUCCESS:
    return Object.assign({}, state, 
      {isRefreshMenu1Needed:true, isRefreshTopbarNeeded:true, isRefreshParentMenuNeeded:true})
  case DELETE_MENU1_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case SEARCH_MENU1_PENDING:
    return Object.assign({}, state, {})
  case SEARCH_MENU1_SUCCESS:
    return Object.assign({}, state, {menus1: action.payload, isRefreshMenu1Needed:false})
  case SEARCH_MENU1_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case SELECT_UPDATE_MENU1:
    return Object.assign({}, state, 
      {beforeUpdateMenu1: action.payload, isRefreshMenu1Needed:false, isDisableMenuTab:true})
  case UPDATE_MENU1_PENDING:
    return Object.assign({}, state, {})
  case UPDATE_MENU1_SUCCESS:
    return Object.assign({}, state, 
      {isRefreshMenu1Needed:true, isRefreshTopbarNeeded:true
        , isRefreshParentMenuNeeded:true,isDisableMenuTab:false})
  case UPDATE_MENU1_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case CANCEL_UPDATE_MENU1:
    return Object.assign({}, state, 
      {isRefreshMenu1Needed:true, isRefreshTopbarNeeded:false, isDisableMenuTab:false})
  case CLEAR_SEARCH_MENU1:
    return Object.assign({}, state, {isRefreshMenu1Needed:true, isRefreshTopbarNeeded:false})
  //Menu2
  case REQUEST_MENU2_PENDING:
    return Object.assign({}, state, {})
  case REQUEST_MENU2_SUCCESS:
    return Object.assign({}, state, {menus2: action.payload, isRefreshMenu2Needed:false})
  case REQUEST_MENU2_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case REQUEST_MENU2_C_PENDING:
    return Object.assign({}, state, {})
  case REQUEST_MENU2_C_SUCCESS:
    return Object.assign({}, state, {menus2: action.payload, isRefreshMenu2Needed:false})
  case REQUEST_MENU2_C_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case POST_MENU2_PENDING:
    return Object.assign({}, state, {})
  case POST_MENU2_SUCCESS:
    return Object.assign({}, state, {createParentMenu:{}, isRefreshMenu2Needed:true})
  case POST_MENU2_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case DELETE_MENU2_PENDING:
    return Object.assign({}, state, {})
  case DELETE_MENU2_SUCCESS:
    return Object.assign({}, state, {isRefreshMenu2Needed:true})
  case DELETE_MENU2_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case SEARCH_MENU2_PENDING:
    return Object.assign({}, state, {})
  case SEARCH_MENU2_SUCCESS:
    return Object.assign({}, state, {menus2: action.payload, isRefreshMenu2Needed:false})
  case SEARCH_MENU2_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case SELECT_UPDATE_MENU2:
    return Object.assign({}, state, 
      {beforeUpdateMenu2: action.payload, isRefreshMenu2Needed:false,
         isAllowUpdateParentMenuName:true, isDisableMenuTab:true })
  case UPDATE_MENU2_PENDING:
    return Object.assign({}, state, {})
  case UPDATE_MENU2_SUCCESS:
    return Object.assign({}, state, {isRefreshMenu2Needed:true})
  case UPDATE_MENU2_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case CANCEL_UPDATE_MENU2:
    return Object.assign({}, state, 
      {isRefreshMenu2Needed:true, isAllowUpdateParentMenuName:false,
        beforeUpdateMenu2:{} , updateParentMenu:{},  isDisableMenuTab:false })
  case CLEAR_SEARCH_MENU2:
    return Object.assign({}, state, {isRefreshMenu2Needed:true})
  case SELECT_CREATE_PARENT_MENU_NAME:
    return Object.assign({}, state, {isShowParentMenuModal:true, isCreateActionMenu2:true})
  case SELECT_UPDATE_PARENT_MENU_NAME:
    return Object.assign({}, state, 
      {isShowParentMenuModal:true, isCreateActionMenu2:false})
  case CLOSE_PARENT_MENU_MODAL:
    return Object.assign({}, state, {isShowParentMenuModal:false})
  // case CHANGE_PARENT_MENU_NAME:
  //   return Object.assign({}, state, {updateParentMenu:action.payload})
//PARENT MENU MODAL
  case REQUEST_PARENT_MENU_PENDING:
    return Object.assign({}, state, {})
  case REQUEST_PARENT_MENU_SUCCESS:
    return Object.assign({}, state, {parentMenus: action.payload, isRefreshParentMenuNeeded:false})
  case REQUEST_PARENT_MENU_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case SEARCH_PARENT_MENU_PENDING:
    return Object.assign({}, state, {})
  case SEARCH_PARENT_MENU_SUCCESS:
    return Object.assign({}, state, {parentMenus: action.payload})
  case SEARCH_PARENT_MENU_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case CLEAR_SEARCH_PARENT_MENU:
    return Object.assign({}, state, {isRefreshParentMenuNeeded:true})
  case SELECT_CREATE_PARENT_MENU:
    return Object.assign({}, state, 
      {createParentMenu:action.payload, isShowParentMenuModal:false})
  case SELECT_UPDATE_PARENT_MENU:
    return Object.assign({}, state, 
      {updateParentMenu:action.payload, isShowParentMenuModal:false})
  case CLEAR_CREATE_MENU2:
    return Object.assign({}, state, {})
  case SET_NOT_ALLOW_UPDATE_PARENT_MENU_NAME:
    return Object.assign({}, state, {isAllowUpdateParentMenuName:false})
  default:
    return state
  }
}




const rootReducer = combineReducers({
  homeRdc,
	requestTopbarRdc,
	requestSidebarRdc,
	blogRdc,
  categoryRdc,
  tagRdc,
  menuRdc
}); 

export default rootReducer;