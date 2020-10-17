import { combineReducers } from 'redux';

import * as constants from './constants';


const initialStateAuth= {
  isAuth: false,
  onChangeUserName:"",
  onChangeEmail:"",
  onChangePassword:"",
  isPendingPostUser: false,
  token: null,
  userID: null,
  isShowAlert:false,
  alertMessage:"",
  captchaToken:null
}

export const authRdc = (state=initialStateAuth, action={}) => {
  switch (action.type) {
    case constants.GET_CAPTCHA_TOKEN_SUCCESS:
      return Object.assign({}, state, {captchaToken: action.payload})
    case constants.GET_CAPTCHA_TOKEN_FAILED:
      return Object.assign({}, state, {isAuth:false, alertMessage: action.payload, isShowAlert:true})
    case constants.ONCHANGE_REG_USER_NAME:
      return Object.assign({}, state, {onChangeUserName: action.payload})
    case constants.ONCHANGE_REG_EMAIL:
      return Object.assign({}, state, {onChangeEmail: action.payload})
    case constants.ONCHANGE_REG_PASSWORD:
      return Object.assign({}, state, {onChangePassword: action.payload})
    case constants.POST_USER_PENDING:
        return Object.assign({}, state, {})
    case constants.POST_USER_SUCCESS:
      return Object.assign({}, state, 
        { isAuth:true, 
          token:action.payload.access_token, 
          userID:action.payload.info.userID})
    case constants.POST_USER_FAILED:
      return Object.assign({}, state, 
        {isAuth:false, alertMessage: action.payload, isShowAlert:true})
    case constants.CLOSE_REG_ALERT:
      return Object.assign({}, state, {isShowAlert:false})
    case constants.CLEAR_REG_USER:
      return Object.assign({}, state, 
        { onChangeUserName: "", 
          onChangeEmail: "",
          onChangePassword:""})
    case constants.ONCHANGE_LOGIN_EMAIL:
      return Object.assign({}, state, {onChangeEmail: action.payload})
    case constants.ONCHANGE_LOGIN_PASSWORD:
      return Object.assign({}, state, {onChangePassword: action.payload})
    case constants.GET_USER_PENDING:
        return Object.assign({}, state, {})
    case constants.GET_USER_SUCCESS:
      return Object.assign({}, state, 
        { isAuth:true, 
          token:action.payload.access_token, 
          userID:action.payload.info.userID
          })
    case constants.GET_USER_FAILED:
      return Object.assign({}, state, {isAuth:false, alertMessage: action.payload, isShowAlert:true})
    case constants.CLEAR_LOGIN_USER:
      return Object.assign({}, state, 
        { onChangeEmail: "",
          onChangePassword:""})
    default:
      return state
  }
}



const initialStateHome= {
  homeIndex: 0
}

export const homeRdc = (state=initialStateHome, action={}) => {
  switch (action.type) {
    case constants.SELECT_HOME_INDEX:
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
  	case constants.REQUEST_TOPBAR_PENDING:
      return Object.assign({}, state, {isPendingTopbar: true})
    case constants.REQUEST_TOPBAR_SUCCESS:
      return Object.assign({}, state, {topbars: action.payload, isPendingTopbar: false})
    case constants.REQUEST_TOPBAR_FAILED:
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
	case constants.REQUEST_SIDEBAR_PENDING:
	  return Object.assign({}, state, {isPendingSidebar: true})
	case constants.REQUEST_SIDEBAR_SUCCESS:
	  return Object.assign({}, state, {sidebars: action.payload, isPendingSidebar: false})
	case constants.REQUEST_SIDEBAR_FAILED:
	  return Object.assign({}, state, {error: action.payload})
	case constants.REQUEST_SIDEBAR_C_PENDING:
	  return Object.assign({}, state, {isPendingSidebarByClick: true})
	case constants.REQUEST_SIDEBAR_C_SUCCESS:
	  return Object.assign({}, state, {sidebars: action.payload, isPendingSidebarByClick: false})
	case constants.REQUEST_SIDEBAR_C_FAILED:
	  return Object.assign({}, state, {error: action.payload})  
	default:
	  return state
  }
}


const initialStateBlog = {
  isPendingBloglistByClick: false,
  isPendingBlogByClick: false,
  isRefreshBloglistNeeded:false,
  isCreateBlog:false,
  isShowCategoryModal:false,
  isShowTagModal:false,
  isUpdateBlog:false,
  isShowDeleteBlogAlert:false,
  blogCategory:[],
  blogTag:[],
  blog: [],
  bloglist: [],
  selectedTag:[],
  selectedCategory:[],
  onChangeBlogTitle:[],
  onChangeBlogDesc:[],
  onChangeBlogPath:[],
  onChangeBlogSeq:[]

}

export const blogRdc = (state=initialStateBlog, action={}) => {
  switch (action.type) {
// Bloglist
	case constants.REQUEST_BLOGLIST_PENDING:
	  return Object.assign({}, state, { blog:{}, isRefreshBloglistNeeded:false })
	case constants.REQUEST_BLOGLIST_SUCCESS:
	  return Object.assign({}, state, 
      {bloglist: action.payload})
	case constants.REQUEST_BLOGLIST_FAILED:
	  return Object.assign({}, state, {error: action.payload})
	case constants.REQUEST_BLOGLIST_C_PENDING:
	  return Object.assign({}, state, 
      {isPendingBloglistByClick: true, blog:{}, isRefreshBloglistNeeded:false, isCreateBlog:false})
	case constants.REQUEST_BLOGLIST_C_SUCCESS:
	  return Object.assign({}, state, 
      {bloglist: action.payload, isPendingBloglistByClick: false})
	case constants.REQUEST_BLOGLIST_C_FAILED:
	  return Object.assign({}, state, {error: action.payload})
  case constants.SEARCH_BLOGLIST_PENDING:
    return Object.assign({}, state, {isRefreshBloglistNeeded:false})
  case constants.SEARCH_BLOGLIST_SUCCESS:
    return Object.assign({}, state, {bloglist:action.payload})
  case constants.SEARCH_BLOGLIST_FAILED:
    return Object.assign({}, state, {error: action.payload}) 
  case constants.CLEAR_SEARCH_BLOGLIST:
    return Object.assign({}, state, {isRefreshBloglistNeeded:true}) 
//Blog
  case constants.REQUEST_BLOG_C_PENDING:
    return Object.assign({}, state, {isPendingBlogByClick: true})
  case constants.REQUEST_BLOG_C_SUCCESS:
    return Object.assign({}, state,  {blog: action.payload, isPendingBlogByClick: false})
  case constants.REQUEST_BLOG_C_FAILED:
    return Object.assign({}, state, {error: action.payload}) 
  case constants.REQUEST_BLOG_PENDING:
    return Object.assign({}, state, {})
  case constants.REQUEST_BLOG_SUCCESS:
    return Object.assign({}, state, {blog: action.payload})
  case constants.REQUEST_BLOG_FAILED:
    return Object.assign({}, state, {error: action.payload}) 
  case constants.SELECT_CREATE_BLOG_C:
    return Object.assign({}, state, { isCreateBlog: true })
  case constants.CLEAR_CREATE_BLOG_FLAG:
    return Object.assign({}, state, {isCreateBlog:false}) 
  case constants.SELECT_UPDATE_BLOG_CATEGORY:
    return Object.assign({}, state, {isShowCategoryModal:true})
  case constants.CLEAR_SELECT_BLOG_CATEGORY:
    return Object.assign({},state,{selectedCategory:{}})
  case constants.SELECT_ADD_BLOG_TAG:
    return Object.assign({}, state, {isShowTagModal:true})
  case constants.DELETE_BLOG_TAG:
    return Object.assign({},state,{selectedTag: action.payload}) 
  case constants.CLEAR_SELECT_BLOG_TAG:
    return Object.assign({},state,{selectedTag:[]})
  case constants.POST_BLOG_PENDING:
    return Object.assign({}, state, {})
  case constants.POST_BLOG_SUCCESS:
    return Object.assign({}, state, {isCreateBlog:false, isRefreshBloglistNeeded:true})
  case constants.POST_BLOG_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.UPDATE_BLOG:
    return Object.assign({}, state, {isUpdateBlog:true})
  case constants.EXIT_UPDATE_BLOG:
    return Object.assign({}, state, {isUpdateBlog:false})
  case constants.INIT_SELECTED_BLOG_TAG:
    return Object.assign({}, state, {selectedTag:[...action.payload]})
  case constants.INIT_SELECTED_BLOG_CATEGORY:
    return Object.assign({}, state, {selectedCategory:action.payload})
  case constants.ONCHANGE_BLOG_TITLE:
    return Object.assign({}, state, {onChangeBlogTitle:action.payload})
  case constants.ONCHANGE_BLOG_DESC:
    return Object.assign({}, state, {onChangeBlogDesc:action.payload})
  case constants.ONCHANGE_BLOG_PATH:
    return Object.assign({}, state, {onChangeBlogPath:action.payload})
  case constants.ONCHANGE_BLOG_SEQ:
    return Object.assign({}, state, {onChangeBlogSeq:action.payload})
  case constants.CLEAR_ONCHANGE_BLOG:
    return Object.assign({}, state, { selectedTag:[],
                                      selectedCategory:{},
                                      onChangeBlogTitle:"",
                                      onChangeBlogDesc:"",
                                      onChangeBlogPath:"",
                                      onChangeBlogSeq:""})
  case constants.INIT_UPDATE_BLOG_TITLE:
    return Object.assign({}, state, {onChangeBlogTitle:action.payload});
  case constants.INIT_UPDATE_BLOG_DESC:
    return Object.assign({}, state, {onChangeBlogDesc:action.payload});
  case constants.INIT_UPDATE_BLOG_PATH:
    return Object.assign({}, state, {onChangeBlogPath:action.payload});
  case constants.INIT_UPDATE_BLOG_SEQ:
    return Object.assign({}, state, {onChangeBlogSeq:action.payload});
  case constants.UPDATE_BLOG_PENDING:
    return Object.assign({}, state, {});
  case constants.UPDATE_BLOG_SUCCESS:
    return Object.assign({}, state, {isUpdateBlog:false});
  case constants.UPDATE_BLOG_FAILED:
    return Object.assign({}, state, {error: action.payload});
  case constants.DELETE_BLOG_PENDING:
    return Object.assign({}, state, {});
  case constants.DELETE_BLOG_SUCCESS:
    return Object.assign({}, state, {blog:[],isRefreshBloglistNeeded:true});
  case constants.DELETE_BLOG_FAILED:
    return Object.assign({}, state, {error: action.payload});
//Blog Category Modal
  case constants.REQUEST_CATEGORY_MODAL_PENDING:
    return Object.assign({}, state, {isRefreshCategoryNeeded:false})
  case constants.REQUEST_CATEGORY_MODAL_SUCCESS:
    return Object.assign({}, state, {blogCategory: action.payload})
  case constants.REQUEST_CATEGORY_MODAL_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.SEARCH_CATEGORY_MODAL_PENDING:
    return Object.assign({}, state, {})
  case constants.SEARCH_CATEGORY_MODAL_SUCCESS:
    return Object.assign({}, state, {blogCategory: action.payload})
  case constants.SEARCH_CATEGORY_MODAL_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.CLEAR_SEARCH_CATEGORY_MODAL:
    return Object.assign({}, state, {isRefreshCategoryNeeded:true})
  case constants.SELECT_CATEGORY_MODAL:
    return Object.assign({}, state, 
      {selectedCategory:action.payload, isShowCategoryModal:false})
  case constants.CLOSE_CATEGORY_MODAL:
    return Object.assign({}, state, {isShowCategoryModal:false})
//Tag Modal
  case constants.REQUEST_TAG_MODAL_PENDING:
    return Object.assign({}, state, {isRefreshTagNeeded:false})
  case constants.REQUEST_TAG_MODAL_SUCCESS:
    return Object.assign({}, state, {blogTag: action.payload})
  case constants.REQUEST_TAG_MODAL_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.SEARCH_TAG_MODAL_PENDING:
    return Object.assign({}, state, {})
  case constants.SEARCH_TAG_MODAL_SUCCESS:
    return Object.assign({}, state, {blogTag: action.payload})
  case constants.SEARCH_TAG_MODAL_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.CLEAR_SEARCH_TAG_MODAL:
    return Object.assign({}, state, {isRefreshTagNeeded:true})
  case constants.SELECT_TAG_MODAL:
    return Object.assign({}, state, 
      {selectedTag: [...state.selectedTag, action.payload], isShowTagModal:false})
  case constants.CLOSE_TAG_MODAL:
    return Object.assign({}, state, {isShowTagModal:false})
//TinyMCE Editor
  case constants.INIT_TINY_EDITOR:
    return Object.assign({}, state, {})
  default:
    return state  
//Delete Blog Alert
  case constants.CLOSE_DELETE_BLOG_ALERT:
    return Object.assign({}, state, {isShowDeleteBlogAlert:false})
  case constants.SHOW_DELETE_BLOG_ALERT:
    return Object.assign({}, state, {isShowDeleteBlogAlert:true})
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
  case constants.REQUEST_CATEGORY_PENDING:
    return Object.assign({}, state, {isRefreshCategoryNeeded:false})
  case constants.REQUEST_CATEGORY_SUCCESS:
    return Object.assign({}, state, {categories: action.payload})
  case constants.REQUEST_CATEGORY_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.REQUEST_CATEGORY_C_PENDING:
    return Object.assign({}, state, {isRefreshCategoryNeeded:false})
  case constants.REQUEST_CATEGORY_C_SUCCESS:
    return Object.assign({}, state, {categories: action.payload})
  case constants.REQUEST_CATEGORY_C_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.POST_CATEGORY_PENDING:
    return Object.assign({}, state, {})
  case constants.POST_CATEGORY_SUCCESS:
    return Object.assign({}, state, {isRefreshCategoryNeeded:true})
  case constants.POST_CATEGORY_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.DELETE_CATEGORY_PENDING:
    return Object.assign({}, state, {})
  case constants.DELETE_CATEGORY_SUCCESS:
    return Object.assign({}, state, {isRefreshCategoryNeeded:true})
  case constants.DELETE_CATEGORY_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.SEARCH_CATEGORY_PENDING:
    return Object.assign({}, state, {})
  case constants.SEARCH_CATEGORY_SUCCESS:
    return Object.assign({}, state, {categories: action.payload, isRefreshCategoryNeeded:false})
  case constants.SEARCH_CATEGORY_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.SELECT_UPDATE_CATEGORY:
    return Object.assign({}, state, {beforeUpdateCategory: action.payload, isRefreshCategoryNeeded:false})
  case constants.UPDATE_CATEGORY_PENDING:
    return Object.assign({}, state, {})
  case constants.UPDATE_CATEGORY_SUCCESS:
    return Object.assign({}, state, {isRefreshCategoryNeeded:true})
  case constants.UPDATE_CATEGORY_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.CANCEL_UPDATE_CATEGORY:
    return Object.assign({}, state, {isRefreshCategoryNeeded:true})
  case constants.CLEAR_SEARCH_CATEGORY:
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
  case constants.REQUEST_TAG_PENDING:
    return Object.assign({}, state, {isRefreshTagNeeded:false})
  case constants.REQUEST_TAG_SUCCESS:
    return Object.assign({}, state, {tags: action.payload})
  case constants.REQUEST_TAG_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.REQUEST_TAG_C_PENDING:
    return Object.assign({}, state, {isRefreshTagNeeded:false})
  case constants.REQUEST_TAG_C_SUCCESS:
    return Object.assign({}, state, {tags: action.payload})
  case constants.REQUEST_TAG_C_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.POST_TAG_PENDING:
    return Object.assign({}, state, {})
  case constants.POST_TAG_SUCCESS:
    return Object.assign({}, state, {isRefreshTagNeeded:true})
  case constants.POST_TAG_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.DELETE_TAG_PENDING:
    return Object.assign({}, state, {})
  case constants.DELETE_TAG_SUCCESS:
    return Object.assign({}, state, {isRefreshTagNeeded:true})
  case constants.DELETE_TAG_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.SEARCH_TAG_PENDING:
    return Object.assign({}, state, {})
  case constants.SEARCH_TAG_SUCCESS:
    return Object.assign({}, state, {tags: action.payload, isRefreshTagNeeded:false})
  case constants.SEARCH_TAG_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.SELECT_UPDATE_TAG:
    return Object.assign({}, state, {beforeUpdateCategory: action.payload, isRefreshTagNeeded:false})
  case constants.UPDATE_TAG_PENDING:
    return Object.assign({}, state, {})
  case constants.UPDATE_TAG_SUCCESS:
    return Object.assign({}, state, {isRefreshTagNeeded:true})
  case constants.UPDATE_TAG_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.CANCEL_UPDATE_TAG:
    return Object.assign({}, state, {isRefreshTagNeeded:true})
  case constants.CLEAR_SEARCH_TAG:
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
  case constants.SET_MENU_TAB_NOT_DISABLE:
    return Object.assign({}, state, {isDisableMenuTab:false})
  //Menu1
  case constants.REQUEST_MENU1_PENDING:
    return Object.assign({}, state, {isRefreshMenu1Needed:false})
  case constants.REQUEST_MENU1_SUCCESS:
    return Object.assign({}, state, {menus1: action.payload})
  case constants.REQUEST_MENU1_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.REQUEST_MENU1_C_PENDING:
    return Object.assign({}, state, {isRefreshMenu1Needed:false})
  case constants.REQUEST_MENU1_C_SUCCESS:
    return Object.assign({}, state, {menus1: action.payload})
  case constants.REQUEST_MENU1_C_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.POST_MENU1_PENDING:
    return Object.assign({}, state, {})
  case constants.POST_MENU1_SUCCESS:
    return Object.assign({}, state, 
      {isRefreshMenu1Needed:true, isRefreshTopbarNeeded:true, isRefreshParentMenuNeeded:true})
  case constants.POST_MENU1_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.DELETE_MENU1_PENDING:
    return Object.assign({}, state, {})
  case constants.DELETE_MENU1_SUCCESS:
    return Object.assign({}, state, 
      {isRefreshMenu1Needed:true, isRefreshTopbarNeeded:true, isRefreshParentMenuNeeded:true})
  case constants.DELETE_MENU1_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.SEARCH_MENU1_PENDING:
    return Object.assign({}, state, {})
  case constants.SEARCH_MENU1_SUCCESS:
    return Object.assign({}, state, {menus1: action.payload, isRefreshMenu1Needed:false})
  case constants.SEARCH_MENU1_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.SELECT_UPDATE_MENU1:
    return Object.assign({}, state, 
      {beforeUpdateMenu1: action.payload, isRefreshMenu1Needed:false, isDisableMenuTab:true})
  case constants.UPDATE_MENU1_PENDING:
    return Object.assign({}, state, {})
  case constants.UPDATE_MENU1_SUCCESS:
    return Object.assign({}, state, 
      {isRefreshMenu1Needed:true, isRefreshTopbarNeeded:true
        , isRefreshParentMenuNeeded:true,isDisableMenuTab:false})
  case constants.UPDATE_MENU1_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.CANCEL_UPDATE_MENU1:
    return Object.assign({}, state, 
      {isRefreshMenu1Needed:true, isRefreshTopbarNeeded:false, isDisableMenuTab:false})
  case constants.CLEAR_SEARCH_MENU1:
    return Object.assign({}, state, {isRefreshMenu1Needed:true, isRefreshTopbarNeeded:false})
  //Menu2
  case constants.REQUEST_MENU2_PENDING:
    return Object.assign({}, state, {isRefreshMenu2Needed:false})
  case constants.REQUEST_MENU2_SUCCESS:
    return Object.assign({}, state, {menus2: action.payload})
  case constants.REQUEST_MENU2_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.REQUEST_MENU2_C_PENDING:
    return Object.assign({}, state, {isRefreshMenu2Needed:false})
  case constants.REQUEST_MENU2_C_SUCCESS:
    return Object.assign({}, state, {menus2: action.payload})
  case constants.REQUEST_MENU2_C_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.POST_MENU2_PENDING:
    return Object.assign({}, state, {})
  case constants.POST_MENU2_SUCCESS:
    return Object.assign({}, state, {createParentMenu:{}, isRefreshMenu2Needed:true})
  case constants.POST_MENU2_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.DELETE_MENU2_PENDING:
    return Object.assign({}, state, {})
  case constants.DELETE_MENU2_SUCCESS:
    return Object.assign({}, state, {isRefreshMenu2Needed:true})
  case constants.DELETE_MENU2_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.SEARCH_MENU2_PENDING:
    return Object.assign({}, state, {})
  case constants.SEARCH_MENU2_SUCCESS:
    return Object.assign({}, state, {menus2: action.payload, isRefreshMenu2Needed:false})
  case constants.SEARCH_MENU2_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.SELECT_UPDATE_MENU2:
    return Object.assign({}, state, 
      {beforeUpdateMenu2: action.payload, isRefreshMenu2Needed:false,
         isAllowUpdateParentMenuName:true, isDisableMenuTab:true })
  case constants.UPDATE_MENU2_PENDING:
    return Object.assign({}, state, {})
  case constants.UPDATE_MENU2_SUCCESS:
    return Object.assign({}, state, {isRefreshMenu2Needed:true})
  case constants.UPDATE_MENU2_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.CANCEL_UPDATE_MENU2:
    return Object.assign({}, state, 
      {isRefreshMenu2Needed:true, isAllowUpdateParentMenuName:false,
        beforeUpdateMenu2:{} , updateParentMenu:{},  isDisableMenuTab:false })
  case constants.CLEAR_SEARCH_MENU2:
    return Object.assign({}, state, {isRefreshMenu2Needed:true})
  case constants.SELECT_CREATE_PARENT_MENU_NAME:
    return Object.assign({}, state, {isShowParentMenuModal:true, isCreateActionMenu2:true})
  case constants.SELECT_UPDATE_PARENT_MENU_NAME:
    return Object.assign({}, state, 
      {isShowParentMenuModal:true, isCreateActionMenu2:false})
  case constants.CLOSE_PARENT_MENU_MODAL:
    return Object.assign({}, state, {isShowParentMenuModal:false})
  // case constants.CHANGE_PARENT_MENU_NAME:
  //   return Object.assign({}, state, {updateParentMenu:action.payload})
//PARENT MENU MODAL
  case constants.REQUEST_PARENT_MENU_PENDING:
    return Object.assign({}, state, {isRefreshParentMenuNeeded:false})
  case constants.REQUEST_PARENT_MENU_SUCCESS:
    return Object.assign({}, state, {parentMenus: action.payload})
  case constants.REQUEST_PARENT_MENU_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.SEARCH_PARENT_MENU_PENDING:
    return Object.assign({}, state, {})
  case constants.SEARCH_PARENT_MENU_SUCCESS:
    return Object.assign({}, state, {parentMenus: action.payload})
  case constants.SEARCH_PARENT_MENU_FAILED:
    return Object.assign({}, state, {error: action.payload})
  case constants.CLEAR_SEARCH_PARENT_MENU:
    return Object.assign({}, state, {isRefreshParentMenuNeeded:true})
  case constants.SELECT_CREATE_PARENT_MENU:
    return Object.assign({}, state, 
      {createParentMenu:action.payload, isShowParentMenuModal:false})
  case constants.SELECT_UPDATE_PARENT_MENU:
    return Object.assign({}, state, 
      {updateParentMenu:action.payload, isShowParentMenuModal:false})
  case constants.CLEAR_CREATE_MENU2:
    return Object.assign({}, state, {})
  case constants.SET_NOT_ALLOW_UPDATE_PARENT_MENU_NAME:
    return Object.assign({}, state, {isAllowUpdateParentMenuName:false})
  case constants.CLEAR_SELECT_PARENT_MENU:
    return Object.assign({}, state, {createParentMenu:{},updateParentMenu:{}})
  default:
    return state
  }
}




const rootReducer = combineReducers({
  authRdc,
  homeRdc,
	requestTopbarRdc,
	requestSidebarRdc,
	blogRdc,
  categoryRdc,
  tagRdc,
  menuRdc
}); 

export default rootReducer;