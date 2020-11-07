import { combineReducers } from 'redux';

import * as constants from './constants';


const initialStateAuth= {
  isAuth: true,
  onChangeUserName:"",
  onChangeEmail:"",
  onChangePassword:"",
  isPendingPostUser: false,
  isPendingGetUser: false,
  token: null,
  userID: 24,
  isShowAlert:false,
  alertMessage:null,
  captchaToken:null
}

export const authRdc = (state=initialStateAuth, action={}) => {
  switch (action.type) {
    case constants.GET_CAPTCHA_TOKEN_SUCCESS:
      return Object.assign({}, state, {captchaToken: action.payload})
    case constants.GET_CAPTCHA_TOKEN_FAILED:
      switch (action.payload.actionCode){
        case 'Login':
          return Object.assign({}, state, 
            {isAuth:false, 
              isPendingGetUser:false,
              alertMessage: action.payload.errMessage,
              onChangePassword:"",
              isShowAlert:true})
        case 'Register':
          return Object.assign({}, state, 
            {isAuth:false, 
              isPendingPostUser:false,
              alertMessage: action.payload.errMessage,
              onChangePassword:"",
              isShowAlert:true})
        default:
          return state
      }  
    case constants.ONCHANGE_REG_USER_NAME:
      return Object.assign({}, state, {onChangeUserName: action.payload})
    case constants.ONCHANGE_REG_EMAIL:
      return Object.assign({}, state, {onChangeEmail: action.payload})
    case constants.ONCHANGE_REG_PASSWORD:
      return Object.assign({}, state, {onChangePassword: action.payload})
    case constants.POST_USER_PENDING:
        return Object.assign({}, state, {isPendingPostUser:true, isShowAlert:false})
    case constants.POST_USER_SUCCESS:
      return Object.assign({}, state, 
        { isAuth:true,
          isPendingPostUser:false,
          token:action.payload.access_token, 
          userID:action.payload.info.userID})
    case constants.POST_USER_FAILED:
      return Object.assign({}, state, 
        {isAuth:false, 
          isPendingPostUser:false,
          alertMessage: action.payload,
          onChangePassword: "", 
          isShowAlert:true})
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
        return Object.assign({}, state, {isPendingGetUser:true, isShowAlert:false})
    case constants.GET_USER_SUCCESS:
      return Object.assign({}, state, 
        { isAuth:true, 
          isPendingGetUser:false,
          token:action.payload.access_token, 
          userID:action.payload.info.userID
          })
    case constants.GET_USER_FAILED:
      return Object.assign({}, state, 
        {isAuth:false, 
          isPendingGetUser:false,
          alertMessage: action.payload,
          onChangePassword: "",
          isShowAlert:true})
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
  isPendingTopbar: false
}

export const topbarRdc = (state=initialStateTopbar, action={}) => {
  switch (action.type) {
  	case constants.REQUEST_TOPBAR_PENDING:
      return Object.assign({}, state, {isPendingTopbar: true})
    case constants.REQUEST_TOPBAR_SUCCESS:
      return Object.assign({}, state, {topbars: action.payload, isPendingTopbar: false})
    case constants.REQUEST_TOPBAR_FAILED:
      return Object.assign({}, state, {error: action.payload, isPendingTopbar: false})
    default:
      return state
  }
}


const initialStateSidebar = {
  sidebars: [],
  isPendingSidebar: false,
  isPendingSidebarByClick: false
}

export const sidebarRdc = (state=initialStateSidebar, action={}) => {
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
  isRefreshCategoryNeeded:false,
  //request ctgs
  isPendingRequestCategory: false,
  isRequestCategoryFailed: false,
  isShowRequestCategoryErrAlert:false,
  requestCategoryErrMsg:"",
  //search ctgs
  searchCategoryName:"",
  searchCategoryDesc:"",
  //create ctgs
  isShowCreateCategory:false,
  createCategoryName:"",
  createCategoryDesc:"",
  createCategorySeq:"",
  isCreateCategoryNameValid:null,
  isCreateCategoryDescValid:true,
  isCreateCategorySeqValid:null,
  createCategoryNameErrMsg:"",
  createCategoryDescErrMsg:"",
  createCategorySeqErrMsg:"",
  isPendingPostCategory:false,
  //delete ctgs
  isShowDeleteCategory:false,
  deleteCategoryName:null,
  deleteCategoryID:null,
  isPendingDeleteCategory:false,
  isDeleteCategoryFailed:false,
  deleteCategoryErrMsg:"",
  //updat ctgs
  isShowUpdateCategory:false,
  isPendingUpdateCategory:false,
  isUpdateCategoryNameValid:true,
  isUpdateCategoryDescValid:true,
  isUpdateCategorySeqValid:true,
  updateCategoryID:"",
  updateCategoryName:"",
  updateCategoryDesc:"",
  updateCategorySeq:"",
  updateCategoryNameErrMsg:"",
  updateCategoryDescErrMsg:"",
  updateCategorySeqErrMsg:"",
}

export const categoryRdc = (state=initialStateCategory, action={}) => {
  switch (action.type) {
  /*------------------------------------------request ctgs---------------------------------------*/
  case constants.REQUEST_CATEGORY_PENDING:
    return Object.assign({}, state, 
      {isPendingRequestCategory:true,isRequestCategoryFailed:false, isRefreshCategoryNeeded:false})
  case constants.REQUEST_CATEGORY_SUCCESS:
    return Object.assign({}, state, 
      {isPendingRequestCategory:false,isRequestCategoryFailed:false, categories: action.payload})
  case constants.REQUEST_CATEGORY_FAILED:
    switch(action.payload.Code){
      case 'INTERNAL_SERVER_ERROR_CATEGORY_REQUEST':
        return Object.assign({}, state, 
          {isPendingRequestCategory:false, isRequestCategoryFailed:true,
            isShowRequestCategoryErrAlert:true, requestCategoryErrMsg:action.payload.errMessage }) 
      case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
        return Object.assign({}, state, 
          {isPendingRequestCategory:false, isRequestCategoryFailed:true,
            isShowRequestCategoryErrAlert:true, requestCategoryErrMsg:action.payload.errMessage }) 
      default://unhandled error
        return Object.assign({}, state,  
          {error: action.payload, isPendingRequestCategory:false, isRequestCategoryFailed:true}) 
    }
  case constants.CLOSE_CATEGORY_ERROR_ALERT:
    return Object.assign({}, state, {isShowRequestCategoryErrAlert:false, requestCategoryErrMsg:""})
  /*------------------------------------------search ctgs---------------------------------------*/
  case constants.ONCHANGE_SEARCH_CATEGORY_NAME:
    return Object.assign({}, state, {searchCategoryName:action.payload})
  case constants.ONCHANGE_SEARCH_CATEGORY_DESC:
    return Object.assign({}, state, {searchCategoryDesc:action.payload})
  case constants.SEARCH_CATEGORY_PENDING:
    return Object.assign({}, state, {isPendingRequestCategory:true,isRequestCategoryFailed:false})
  case constants.SEARCH_CATEGORY_SUCCESS:
    return Object.assign({}, state, 
      {isPendingRequestCategory:false,isRequestCategoryFailed:false,
        categories: action.payload, isRefreshCategoryNeeded:false})
  case constants.SEARCH_CATEGORY_FAILED:
    switch(action.payload.Code){
      case 'INTERNAL_SERVER_ERROR_CATEGORY_SEARCH':
        return Object.assign({}, state, 
          {isPendingRequestCategory:false, isRequestCategoryFailed:true,
            isShowRequestCategoryErrAlert:true, requestCategoryErrMsg:action.payload.errMessage }) 
      case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
        return Object.assign({}, state, 
          {isPendingRequestCategory:false, isRequestCategoryFailed:true,
            isShowRequestCategoryErrAlert:true, requestCategoryErrMsg:action.payload.errMessage })
      default://unhandled error
        return Object.assign({}, state,  
          {error: action.payload, isPendingRequestCategory:false, isRequestCategoryFailed:true,
            isShowRequestCategoryErrAlert:true}) 
    }
  case constants.CLEAR_SEARCH_CATEGORY:
    return Object.assign({}, state, 
      {isRefreshCategoryNeeded:true,
      searchCategoryName:"",
      searchCategoryDesc:""})
/*------------------------------------------create ctgs---------------------------------------*/
  case constants.POST_CATEGORY_SUCCESS:
    return Object.assign({}, state, 
      {isRefreshCategoryNeeded:true,isPendingPostCategory:false,isShowCreateCategory:false,
        isCreateCategoryNameValid:null,createCategoryName:"",createCategoryNameErrMsg:"",
        isCreateCategoryDescValid:null,createCategoryDesc:"",createCategoryDescErrMsg:"",
        isCreateCategorySeqValid:null, createCategorySeq:"",createCategorySeqErrMsg:""})
  case constants.POST_CATEGORY_FAILED:
    switch(action.payload.Code){
      case 'CATEGORY_MANDATORY_FIELD':
        return Object.assign({}, state, 
          { isPendingPostCategory:false,
            isCreateCategoryNameValid:false, createCategoryNameErrMsg:action.payload.errMessage,
            isCreateCategorySeqValid:false, createCategorySeqErrMsg:action.payload.errMessage
          }) 
      case 'INTERNAL_SERVER_ERROR_CATEGORY_CHECK_DUP':
        return Object.assign({}, state, 
          { isPendingPostCategory:false,
            isCreateCategoryNameValid:false, createCategoryNameErrMsg:action.payload.errMessage,
            isCreateCategoryDescValid:false, createCategoryDescErrMsg:action.payload.errMessage,
            isCreateCategorySeqValid:false, createCategorySeqErrMsg:action.payload.errMessage
          }) 
      case 'CATEGORY_DUPLICATE_CATEGORY_NAME':
        return Object.assign({}, state, 
          { isPendingPostCategory:false,
            isCreateCategoryNameValid:false, createCategoryNameErrMsg:action.payload.errMessage
          }) 
      case 'INTERNAL_SERVER_ERROR_CATEGORY_INSERT':
        return Object.assign({}, state, 
          { isPendingPostCategory:false,
            isCreateCategoryNameValid:false, createCategoryNameErrMsg:action.payload.errMessage
          }) 
      case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
        return Object.assign({}, state, 
          { isPendingPostCategory:false,
            isCreateCategoryNameValid:false, createCategoryNameErrMsg:action.payload.errMessage,
            isCreateCategoryDescValid:false, createCategoryDescErrMsg:action.payload.errMessage,
            isCreateCategorySeqValid:false, createCategorySeqErrMsg:action.payload.errMessage
          }) 
      default://unhandled error
        return Object.assign({}, state, 
          {error: action.payload,
            isPendingPostCategory:false,
            createCategoryName:"",
            createCategoryDesc:"",
            createCategorySeq:"",
            isCreateCategoryNameValid:null,createCategoryNameErrMsg:"",
            isCreateCategoryDescValid:true, createCategoryDescErrMsg:"",
            isCreateCategorySeqValid:null,createCategorySeqErrMsg:""}) 
    }
  case constants.ONCHANGE_CREATE_CATEGORY_NAME:
    switch(action.payload.isValid){
      case false:
        return Object.assign({}, state, 
          {createCategoryName:action.payload.categoryName,
            createCategoryNameErrMsg:action.payload.errorMsg,
            isCreateCategoryNameValid:false})
      case true:
        return Object.assign({}, state, 
          {createCategoryName:action.payload.categoryName,
            createCategoryNameErrMsg:"",
            isCreateCategoryNameValid:true})
      default:
        return state
    }
  case constants.ONCHANGE_CREATE_CATEGORY_DESC:
    switch(action.payload.isValid){
      case false:
        return Object.assign({}, state, 
          {createCategoryDesc:action.payload.categoryDesc,
            createCategoryDescErrMsg:action.payload.errorMsg,
            isCreateCategoryDescValid:false})
      case true:
        return Object.assign({}, state, 
          {createCategoryDesc:action.payload.categoryDesc,
            createCategoryDescErrMsg:"",
            isCreateCategoryDescValid:true})
      default:
        return state
    }
  case constants.ONCHANGE_CREATE_CATEGORY_SEQ:
    switch(action.payload.isValid){
      case false:
        return Object.assign({}, state, 
          {createCategorySeq:action.payload.categorySeq,
            createCategorySeqErrMsg:action.payload.errorMsg,
            isCreateCategorySeqValid:false})
      case true:
        return Object.assign({}, state, 
          {createCategorySeq:action.payload.categorySeq,
            createCategorySeqErrMsg:"",
            isCreateCategorySeqValid:true})
      default:
        return state
    }
  case constants.SELECT_CREATE_CATEGORY:
    return Object.assign({}, state,  {isShowCreateCategory:true})
  case constants.CLOSE_CREATE_CATEGORY:
    return Object.assign({}, state,  
      {isShowCreateCategory:false,
        isCreateCategoryNameValid:null,createCategoryName:"",createCategoryNameErrMsg:"",
        isCreateCategoryDescValid:true,createCategoryDesc:"",createCategoryDescErrMsg:"",
        isCreateCategorySeqValid:null, createCategorySeq:"",createCategorySeqErrMsg:""})
  case constants.CLEAR_CREATE_CATEGORY:
    return Object.assign({}, state, 
      {isCreateCategoryNameValid:null,createCategoryName:"",createCategoryNameErrMsg:"",
      isCreateCategoryDescValid:true,createCategoryDesc:"",createCategoryDescErrMsg:"",
      isCreateCategorySeqValid:null, createCategorySeq:"",createCategorySeqErrMsg:""})
/*------------------------------------------delete ctgs---------------------------------------*/
  case constants.DELETE_CATEGORY_PENDING:
    return Object.assign({}, state, {isPendingDeleteCategory:true})
  case constants.DELETE_CATEGORY_SUCCESS:
    return Object.assign({}, state, 
      {isPendingDeleteCategory:false, isRefreshCategoryNeeded:true,isDeleteCategoryFailed:false,
        isShowDeleteCategory:false, deleteCategoryName:null, deleteCategoryID:null})
  case constants.DELETE_CATEGORY_FAILED:
    switch(action.payload.Code){
      case 'INTERNAL_SERVER_ERROR_CATEGORY_DELETE':
        return Object.assign({}, state, 
          { isPendingDeleteCategory:false,
            isDeleteCategoryFailed:true,
            deleteCategoryErrMsg:action.payload.errMessage
          }) 
      case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
        return Object.assign({}, state, 
          { isPendingDeleteCategory:false,
            isDeleteCategoryFailed:true,
            deleteCategoryErrMsg:action.payload.errMessage
          }) 
      case 'CATEGORY_FOREIGN_KEY_EXIST':
        return Object.assign({}, state, 
          { isPendingDeleteCategory:false,
            isDeleteCategoryFailed:true,
            deleteCategoryErrMsg:action.payload.errMessage
          }) 
      default://unhandled error
        return Object.assign({}, state, 
          { error: action.payload,
            isPendingDeleteCategory:false,
            isDeleteCategoryFailed:true
          })
    }
  case constants.SELECT_DELETE_CATEGORY:
    return Object.assign({}, state,  
      {isShowDeleteCategory:true, deleteCategoryName:action.payload.deleteCategoryName, 
        deleteCategoryID:action.payload.deleteCategoryID})
  case constants.CLOSE_DELETE_CATEGORY:
    return Object.assign({}, state,  
      {isShowDeleteCategory:false, isDeleteCategoryFailed:false, deleteCategoryName:null, 
        deleteCategoryID:null, deleteCategoryErrMsg:null})
/*------------------------------------------update ctgs---------------------------------------*/
case constants.SELECT_UPDATE_CATEGORY:
    return Object.assign({}, state, 
      {isShowUpdateCategory:true,
        updateCategoryID:action.payload.updateCategoryID,
        updateCategoryName:action.payload.updateCategoryName,
        updateCategoryDesc:action.payload.updateCategoryDesc,
        updateCategorySeq:action.payload.updateCategorySeq})
  case constants.CLOSE_UPDATE_CATEGORY:
    return Object.assign({}, state, 
      {isShowUpdateCategory:false,
        updateCategoryID:"",
        updateCategoryName:"",
        updateCategoryDesc:"",
        updateCategorySeq:"",
        isUpdateCategoryNameValid:true,
        isUpdateCategoryDescValid:true,
        isUpdateCategorySeqValid:true,
        updateCategoryNameErrMsg:"",
        updateCategoryDescErrMsg:"",
        updateCategorySeqErrMsg:""
        })
  case constants.ONCHANGE_UPDATE_CATEGORY_NAME:
    switch(action.payload.isValid){
      case false:
        return Object.assign({}, state, 
          { updateCategoryName:action.payload.categoryName,
            updateCategoryNameErrMsg:action.payload.errorMsg,
            isUpdateCategoryNameValid:false})
      case true:
        return Object.assign({}, state, 
          { updateCategoryName:action.payload.categoryName,
            updateCategoryNameErrMsg:"",
            isUpdateCategoryNameValid:true})
      default:
        return state
    }
  case constants.ONCHANGE_UPDATE_CATEGORY_DESC:
  switch(action.payload.isValid){
    case false:
      return Object.assign({}, state, 
        { updateCategoryDesc:action.payload.categoryDesc,
          updateCategoryDescErrMsg:action.payload.errorMsg,
          isUpdateCategoryDescValid:false})
    case true:
      return Object.assign({}, state, 
        { updateCategoryDesc:action.payload.categoryDesc,
          updateCategoryDescErrMsg:"",
          isUpdateCategoryDescValid:true})
    default:
      return state
  }
  case constants.ONCHANGE_UPDATE_CATEGORY_SEQ:
    switch(action.payload.isValid){
      case false:
        return Object.assign({}, state, 
          { updateCategorySeq:action.payload.categorySeq,
            updateCategorySeqErrMsg:action.payload.errorMsg,
            isUpdateCategorySeqValid:false})
      case true:
        return Object.assign({}, state, 
          { updateCategorySeq:action.payload.categorySeq,
            updateCategorySeqErrMsg:"",
            isUpdateCategorySeqValid:true})
      default:
        return state
    }
  case constants.UPDATE_CATEGORY_PENDING:
    return Object.assign({}, state, {isPendingUpdateCategory:true})
  case constants.UPDATE_CATEGORY_SUCCESS:
    return Object.assign({}, state, 
      {isRefreshCategoryNeeded:true,isPendingUpdateCategory:false,isShowUpdateCategory:false,
        isUpdateCategoryNameValid:true,updateCategoryName:"",updateCategoryNameErrMsg:"",
        isUpdateCategoryDescValid:true,updateCategoryDesc:"",updateCategoryDescErrMsg:"",
        isUpdateCategorySeqValid:true, updateCategorySeq:"",updateCategorySeqErrMsg:""})
  case constants.UPDATE_CATEGORY_FAILED:
    switch(action.payload.Code){
      case 'CATEGORY_MANDATORY_FIELD':
        return Object.assign({}, state, 
          { isPendingUpdateCategory:false,
            isUpdateCategoryNameValid:false, updateCategoryNameErrMsg:action.payload.errMessage,
            isUpdateCategorySeqValid:false, updateCategorySeqErrMsg:action.payload.errMessage
          }) 
      case 'INTERNAL_SERVER_ERROR_CATEGORY_CHECK_DUP':
        return Object.assign({}, state, 
          { isPendingUpdateCategory:false,
            isUpdateCategoryNameValid:false, updateCategoryNameErrMsg:action.payload.errMessage
          }) 
      case 'CATEGORY_DUPLICATE_CATEGORY_NAME':
        return Object.assign({}, state, 
          { isPendingUpdateCategory:false,
            isUpdateCategoryNameValid:false, updateCategoryNameErrMsg:action.payload.errMessage
          }) 
      case 'INTERNAL_SERVER_ERROR_CATEGORY_UPDATE':
        return Object.assign({}, state, 
          { isPendingUpdateCategory:false,
            isUpdateCategoryNameValid:false, updateCategoryNameErrMsg:action.payload.errMessage,
            isUpdateCategoryDescValid:false, updateCategoryDescErrMsg:action.payload.errMessage,
            isUpdateCategorySeqValid:false, updateCategorySeqErrMsg:action.payload.errMessage
          }) 
      case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
        return Object.assign({}, state, 
          { isPendingUpdateCategory:false,
            isUpdateCategoryNameValid:false, updateCategoryNameErrMsg:action.payload.errMessage,
            isUpdateCategoryDescValid:false, updateCategoryDescErrMsg:action.payload.errMessage,
            isUpdateCategorySeqValid:false, updateCategorySeqErrMsg:action.payload.errMessage
          }) 
      default://unhandled error
        return Object.assign({}, state, 
          {error: action.payload,
            isPendingUpdateCategory:false,
            updateCategoryName:"",
            updateCategoryDesc:"",
            updateCategorySeq:"",
            isUpdateCategoryNameValid:null,updateCategoryNameErrMsg:"",
            isUpdateCategoryDescValid:null,updateCategoryDescErrMsg:"",
            isUpdateCategorySeqValid:null,updateCategorySeqErrMsg:""}) 
    }
  default:
    return state
  }
}




const initialStateTag= {
  tags: [],
  //request tag
  isPendingRequestTag:false,
  isRequestTagFailed:false,
  requestTagErrMsg:"",
  isRefreshTagNeeded:false,
  isShowRequestTagErrAlert:false,
  //search tag
  searchTagName:"",
  //create tag
  isShowCreateTag:false,
  createTagName:"",
  createTagSeq:"",
  isCreateTagNameValid:null,
  isCreateTagSeqValid:null,
  createTagNameErrMsg:"",
  createTagSeqErrMsg:"",
  isPendingPostTag:false,
  //delete tag
  isShowDeleteTag:false,
  deleteTagName:null,
  deleteTagID:null,
  isPendingDeleteTag:false,
  isDeleteTagFailed:false,
  deleteTagErrMsg:"",
  //update tag
  isShowUpdateTag:false,
  isPendingUpdateTag:false,
  isUpdateTagNameValid:true,
  isUpdateTagSeqValid:true,
  updateTagID:"",
  updateTagName:"",
  updateTagNameErrMsg:"",
  updateTagSeq:"",
  updateTagSeqErrMsg:"",
}

export const tagRdc = (state=initialStateTag, action={}) => {
  switch (action.type) {
  /*------------------------------------------request tag---------------------------------------*/
  case constants.REQUEST_TAG_PENDING:
    return Object.assign({}, state, {isPendingRequestTag:true,isRequestTagFailed:false, isRefreshTagNeeded:false})
  case constants.REQUEST_TAG_SUCCESS:
    return Object.assign({}, state, {isPendingRequestTag:false,isRequestTagFailed:false, tags: action.payload})
  case constants.REQUEST_TAG_FAILED:
    switch(action.payload.Code){
      case 'INTERNAL_SERVER_ERROR_TAG_REQUEST':
        return Object.assign({}, state, 
          {isPendingRequestTag:false, isRequestTagFailed:true,
            isShowRequestTagErrAlert:true, requestTagErrMsg:action.payload.errMessage }) 
      case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
        return Object.assign({}, state, 
          {isPendingRequestTag:false, isRequestTagFailed:true,
            isShowRequestTagErrAlert:true, requestTagErrMsg:action.payload.errMessage }) 
      default://unhandled error
        return Object.assign({}, state,  
          {error: action.payload, isPendingRequestTag:false, isRequestTagFailed:true}) 
    }
  case constants.CLOSE_TAG_ERROR_ALERT:
    return Object.assign({}, state,  {isShowRequestTagErrAlert:false,requestTagErrMsg:""})
  /*------------------------------------------search tag---------------------------------------*/
  case constants.SEARCH_TAG_PENDING:
    return Object.assign({}, state, {isPendingRequestTag:true,isRequestTagFailed:false})
  case constants.SEARCH_TAG_SUCCESS:
    return Object.assign({}, state, 
      {isPendingRequestTag:false,isRequestTagFailed:false,tags: action.payload, isRefreshTagNeeded:false})
  case constants.SEARCH_TAG_FAILED:
    switch(action.payload.Code){
      case 'INTERNAL_SERVER_ERROR_TAG_SEARCH':
        return Object.assign({}, state, 
          {isPendingRequestTag:false, isRequestTagFailed:true,
            isShowRequestTagErrAlert:true, requestTagErrMsg:action.payload.errMessage }) 
      case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
        return Object.assign({}, state, 
          {isPendingRequestTag:false, isRequestTagFailed:true,
            isShowRequestTagErrAlert:true, requestTagErrMsg:action.payload.errMessage })
      default://unhandled error
        return Object.assign({}, state,  
          {error: action.payload, isPendingRequestTag:false, isRequestTagFailed:true,
            isShowRequestTagErrAlert:true}) 
    }
  case constants.ONCHANGE_SEARCH_TAG_NAME:
    return Object.assign({}, state, {searchTagName:action.payload})
  case constants.CLEAR_SEARCH_TAG:
    return Object.assign({}, state, {searchTagName:"", isRefreshTagNeeded:true})
  /*------------------------------------------create tag---------------------------------------*/
  case constants.POST_TAG_PENDING:
    return Object.assign({}, state, {isPendingPostTag:true})
  case constants.POST_TAG_SUCCESS:
    return Object.assign({}, state, 
      {isRefreshTagNeeded:true,isPendingPostTag:false,isShowCreateTag:false,
        isCreateTagNameValid:null,createTagName:"",createTagNameErrMsg:"",
        isCreateTagSeqValid:null, createTagSeq:"",createTagSeqErrMsg:""})
  case constants.POST_TAG_FAILED:
    switch(action.payload.Code){
      case 'TAG_MANDATORY_FIELD':
        return Object.assign({}, state, 
          { isPendingPostTag:false,
            isCreateTagNameValid:false, createTagNameErrMsg:action.payload.errMessage,
            isCreateTagSeqValid:false, createTagSeqErrMsg:action.payload.errMessage
          }) 
      case 'INTERNAL_SERVER_ERROR_TAG_CHECK_DUP':
        return Object.assign({}, state, 
          { isPendingPostTag:false,
            isCreateTagNameValid:false, createTagNameErrMsg:action.payload.errMessage,
            isCreateTagSeqValid:false, createTagSeqErrMsg:action.payload.errMessage
          }) 
      case 'TAG_DUPLICATE_TAG_NAME':
        return Object.assign({}, state, 
          { isPendingPostTag:false,
            isCreateTagNameValid:false, createTagNameErrMsg:action.payload.errMessage
          }) 
      case 'INTERNAL_SERVER_ERROR_TAG_INSERT':
        return Object.assign({}, state, 
          { isPendingPostTag:false,
            isCreateTagNameValid:false, createTagNameErrMsg:action.payload.errMessage
          }) 
      case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
        return Object.assign({}, state, 
          { isPendingPostTag:false,
            isCreateTagNameValid:false, createTagNameErrMsg:action.payload.errMessage,
            isCreateTagSeqValid:false, createTagSeqErrMsg:action.payload.errMessage
          }) 
      default://unhandled error
        return Object.assign({}, state, 
          {error: action.payload,
            isPendingPostTag:false,
            createTagName:"",
            createTagSeq:"",
            isCreateTagNameValid:null,createTagNameErrMsg:"",
            isCreateTagSeqValid:null,createTagSeqErrMsg:""}) 
    }
  case constants.CLEAR_CREATE_TAG:
    return Object.assign({}, state, 
      {isCreateTagNameValid:null,createTagName:"",createTagNameErrMsg:"",
      isCreateTagSeqValid:null, createTagSeq:"",createTagSeqErrMsg:""})
  case constants.ONCHANGE_CREATE_TAG_NAME:
    switch(action.payload.isValid){
      case false:
        return Object.assign({}, state, 
          {createTagName:action.payload.tagName,createTagNameErrMsg:action.payload.errorMsg,isCreateTagNameValid:false})
      case true:
        return Object.assign({}, state, 
          {createTagName:action.payload.tagName,isCreateTagNameValid:true})
      default:
        return state
    }
  case constants.ONCHANGE_CREATE_TAG_SEQ:
    switch(action.payload.isValid){
      case false:
        return Object.assign({}, state, 
          {createTagSeq:action.payload.tagSeq,createTagSeqErrMsg:action.payload.errorMsg,isCreateTagSeqValid:false})
      case true:
        return Object.assign({}, state, 
          {createTagSeq:action.payload.tagSeq,isCreateTagSeqValid:true})
      default:
        return state
    }
  case constants.SELECT_CREATE_TAG:
    return Object.assign({}, state,  {isShowCreateTag:true})
  case constants.CLOSE_CREATE_TAG:
    return Object.assign({}, state,  
      {isShowCreateTag:false,
      createTagName:"",
      createTagSeq:"",
      isCreateTagNameValid:null,
      isCreateTagSeqValid:null})
  /*------------------------------------------delete tag---------------------------------------*/
  case constants.DELETE_TAG_PENDING:
    return Object.assign({}, state, {isPendingDeleteTag:true})
  case constants.DELETE_TAG_SUCCESS:
    return Object.assign({}, state, 
      {isPendingDeleteTag:false, isRefreshTagNeeded:true,isDeleteTagFailed:false,
        isShowDeleteTag:false, deleteTagName:null, deleteTagID:null})
  case constants.DELETE_TAG_FAILED:
    switch(action.payload.Code){
      case 'INTERNAL_SERVER_ERROR_TAG_DELETE':
        return Object.assign({}, state, 
          { isPendingDeleteTag:false,
            isDeleteTagFailed:true,
            deleteTagErrMsg:action.payload.errMessage
          }) 
      case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
        return Object.assign({}, state, 
          { isPendingDeleteTag:false,
            isDeleteTagFailed:true,
            deleteTagErrMsg:action.payload.errMessage
          }) 
      case 'TAG_FOREIGN_KEY_EXIST':
        return Object.assign({}, state, 
          { isPendingDeleteTag:false,
            isDeleteTagFailed:true,
            deleteTagErrMsg:action.payload.errMessage
          }) 
      default://unhandled error
        return Object.assign({}, state, 
          { error: action.payload,
            isPendingDeleteTag:false,
            isDeleteTagFailed:true
          })
    }
  case constants.SELECT_DELETE_TAG:
    return Object.assign({}, state,  
      {isShowDeleteTag:true, deleteTagName:action.payload.deleteTagName, deleteTagID:action.payload.deleteTagID})
  case constants.CLOSE_DELETE_TAG:
    return Object.assign({}, state,  
      {isShowDeleteTag:false, isDeleteTagFailed:false, deleteTagName:null, 
        deleteTagID:null, deleteTagErrMsg:null})
  /*------------------------------------------update tag---------------------------------------*/
  case constants.SELECT_UPDATE_TAG:
    return Object.assign({}, state, 
      {isShowUpdateTag:true,
        updateTagID:action.payload.updateTagID,
        updateTagName:action.payload.updateTagName,
        updateTagSeq:action.payload.updateTagSeq})
  case constants.CLOSE_UPDATE_TAG:
    return Object.assign({}, state, 
      {isShowUpdateTag:false,
        updateTagID:"",
        updateTagName:"",
        updateTagSeq:"",
        isUpdateTagNameValid:true,
        isUpdateTagSeqValid:true,
        updateTagNameErrMsg:"",
        updateTagSeqErrMsg:""
        })
  case constants.ONCHANGE_UPDATE_TAG_NAME:
    switch(action.payload.isValid){
      case false:
        return Object.assign({}, state, 
          {updateTagName:action.payload.tagName,updateTagNameErrMsg:action.payload.errorMsg,isUpdateTagNameValid:false})
      case true:
        return Object.assign({}, state, 
          {updateTagName:action.payload.tagName,isUpdateTagNameValid:true})
      default:
        return state
    }
  case constants.ONCHANGE_UPDATE_TAG_SEQ:
    switch(action.payload.isValid){
      case false:
        return Object.assign({}, state, 
          {updateTagSeq:action.payload.tagSeq,updateTagSeqErrMsg:action.payload.errorMsg,isUpdateTagSeqValid:false})
      case true:
        return Object.assign({}, state, 
          {updateTagSeq:action.payload.tagSeq,isUpdateTagSeqValid:true})
      default:
        return state
    }
  case constants.UPDATE_TAG_PENDING:
    return Object.assign({}, state, {isPendingUpdateTag:true})
  case constants.UPDATE_TAG_SUCCESS:
    return Object.assign({}, state, 
      {isRefreshTagNeeded:true,isPendingUpdateTag:false,isShowUpdateTag:false,
        isUpdateTagNameValid:true,updateTagName:"",updateTagNameErrMsg:"",
        isUpdateTagSeqValid:true, updateTagSeq:"",updateTagSeqErrMsg:""})
  case constants.UPDATE_TAG_FAILED:
    switch(action.payload.Code){
      case 'TAG_MANDATORY_FIELD':
        return Object.assign({}, state, 
          { isPendingUpdateTag:false,
            isUpdateTagNameValid:false, updateTagNameErrMsg:action.payload.errMessage,
            isUpdateTagSeqValid:false, updateTagSeqErrMsg:action.payload.errMessage
          }) 
      case 'INTERNAL_SERVER_ERROR_TAG_CHECK_DUP':
        return Object.assign({}, state, 
          { isPendingUpdateTag:false,
            isUpdateTagNameValid:false, updateTagNameErrMsg:action.payload.errMessage,
            isUpdateTagSeqValid:false, updateTagSeqErrMsg:action.payload.errMessage
          }) 
      case 'TAG_DUPLICATE_TAG_NAME':
        return Object.assign({}, state, 
          { isPendingUpdateTag:false,
            isUpdateTagNameValid:false, updateTagNameErrMsg:action.payload.errMessage
          }) 
      case 'INTERNAL_SERVER_ERROR_TAG_UPDATE':
        return Object.assign({}, state, 
          { isPendingUpdateTag:false,
            isUpdateTagNameValid:false, updateTagNameErrMsg:action.payload.errMessage,
            isUpdateTagSeqValid:false, updateTagSeqErrMsg:action.payload.errMessage
          }) 
      case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
        return Object.assign({}, state, 
          { isPendingUpdateTag:false,
            isUpdateTagNameValid:false, updateTagNameErrMsg:action.payload.errMessage,
            isUpdateTagSeqValid:false, updateTagSeqErrMsg:action.payload.errMessage
          }) 
      default://unhandled error
        return Object.assign({}, state, 
          {error: action.payload,
            isPendingUpdateTag:false,
            updateTagName:"",
            updateTagSeq:"",
            isUpdateTagNameValid:null,updateTagNameErrMsg:"",
            isUpdateTagSeqValid:null,updateTagSeqErrMsg:""}) 
    }
  default:
    return state
  }
}

const initialStateMenu1= {
  menu1: [],
  isRefreshMenu1Needed:false,
  isRefreshTopbarNeeded:false,
  //request Menu1
  isPendingRequestMenu1: false,
  isRequestMenu1Failed: false,
  isShowRequestMenu1ErrAlert:false,
  requestMenu1ErrMsg:"",
  //search Menu1
  searchMenu1Name:""


  // menus2: [],
  // beforeUpdateMenu2:[],
  // isRefreshMenu2Needed:false,
  // isShowParentMenuModal:false,
  // parentMenus:[],
  // isRefreshParentMenuNeeded: false,
  // createParentMenu:[],
  // updateParentMenu:[],
  // isAllowUpdateParentMenuName:false,
  // isCreateActionMenu2:false,
  // isDisableMenuTab:false
}

export const menu1Rdc = (state=initialStateMenu1, action={}) => {
  switch (action.type) {
  /*------------------request Menu1----------------------- */
  case constants.REQUEST_MENU1_PENDING:
    return Object.assign({}, state, 
      {isPendingRequestMenu1:true,isRequestMenu1Failed:false, isRefreshMenu1Needed:false})
  case constants.REQUEST_MENU1_SUCCESS:
    return Object.assign({}, state, 
      {isPendingRequestMenu1:false,isRequestMenu1Failed:false, menu1: action.payload})
  case constants.REQUEST_MENU1_FAILED:
    switch(action.payload.Code){
      case 'INTERNAL_SERVER_ERROR_MENU1_REQUEST':
        return Object.assign({}, state, 
          {isPendingRequestMenu1:false, isRequestMenu1Failed:true,
            isShowRequestMenu1ErrAlert:true, requestMenu1ErrMsg:action.payload.errMessage }) 
      case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
        return Object.assign({}, state, 
          {isPendingRequestMenu1:false, isRequestMenu1Failed:true,
            isShowRequestMenu1ErrAlert:true, requestMenu1ErrMsg:action.payload.errMessage }) 
      default://unhandled error
        return Object.assign({}, state,  
          {error: action.payload, isPendingRequestMenu1:false, isRequestMenu1Failed:true}) 
    }
  case constants.CLOSE_MENU1_ERROR_ALERT:
    return Object.assign({}, state, {isShowRequestMenu1ErrAlert:false, requestMenu1ErrMsg:""})
  /*------------------search Menu1----------------------- */
  case constants.SEARCH_MENU1_PENDING:
    return Object.assign({}, state, {isPendingRequestMenu1:true,isRequestMenu1Failed:false})
  case constants.SEARCH_MENU1_SUCCESS:
    return Object.assign({}, state, 
      {isPendingRequestMenu1:false,isRequestMenu1Failed:false,menu1: action.payload, isRefreshMenu1Needed:false})
  case constants.SEARCH_MENU1_FAILED:
    switch(action.payload.Code){
      case 'INTERNAL_SERVER_ERROR_MENU1_SEARCH':
        return Object.assign({}, state, 
          {isPendingRequestMenu1:false, isRequestMenu1Failed:true,
            isShowRequestMenu1ErrAlert:true, requestMenu1ErrMsg:action.payload.errMessage }) 
      case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
        return Object.assign({}, state, 
          {isPendingRequestMenu1:false, isRequestMenu1Failed:true,
            isShowRequestMenu1ErrAlert:true, requestMenu1ErrMsg:action.payload.errMessage })
      default://unhandled error
        return Object.assign({}, state,  
          {error: action.payload, isPendingRequestMenu1:false, isRequestMenu1Failed:true,
            isShowRequestMenu1ErrAlert:true}) 
    }
  case constants.ONCHANGE_SEARCH_MENU1_NAME:
    return Object.assign({}, state, {searchMenu1Name:action.payload})
  case constants.CLEAR_SEARCH_MENU1:
    return Object.assign({}, state, 
      {searchMenu1Name:"", 
      isRefreshMenu1Needed:true
    })
  /*--------------------------create menu1------------------------------- */


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
	topbarRdc,
	sidebarRdc,
	blogRdc,
  categoryRdc,
  tagRdc,
  menu1Rdc
}); 

export default rootReducer;