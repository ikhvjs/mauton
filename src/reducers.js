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
  topbar: [],
  selectTopbarID:"",
  isPendingRequestTopbar: false,
  isRequestTopbarFailed:false,
}

export const topbarRdc = (state=initialStateTopbar, action={}) => {
  switch (action.type) {
  	case constants.SELECT_TOPBAR_MENU_ID:
    return Object.assign({}, state, {selectTopbarID:action.payload})
  	case constants.REQUEST_TOPBAR_PENDING:
    return Object.assign({}, state, 
      {topbar:[],
        isPendingRequestTopbar:true,
        isRequestTopbarFailed:false})
    case constants.REQUEST_TOPBAR_SUCCESS:
      return Object.assign({}, state, 
        {isPendingRequestTopbar:false,
          isRequestTopbarFailed:false, 
          topbar: action.payload})
    case constants.REQUEST_TOPBAR_FAILED:
      switch(action.payload.Code){
        case 'INTERNAL_SERVER_ERROR_TOPBAR_REQUEST':
          return Object.assign({}, state, 
            {isPendingRequestTopbar:false,
              isRequestTopbarFailed:true }) 
        case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
          return Object.assign({}, state, 
            {isPendingRequestTopbar:false,
              isRequestTopbarFailed:true}) 
        default://unhandled error
          return Object.assign({}, state,  
            {error: action.payload, 
              isPendingRequestTopbar:false, 
              isRequestTopbarFailed:true}) 
      }
    default:
      return state
  }
}


const initialStateSidebar = {
  sidebar: [],
  isPendingRequestSidebar: false,
  isRequestSidebarFailed:false,
}

export const sidebarRdc = (state=initialStateSidebar, action={}) => {
  switch (action.type) {
    case constants.REQUEST_SIDEBAR_PENDING:
      return Object.assign({}, state, 
        {sidebar:[],
          isPendingRequestSidebar:true,
          isRequestSidebarFailed:false})
      case constants.REQUEST_SIDEBAR_SUCCESS:
        return Object.assign({}, state, 
          {isPendingRequestSidebar:false,
            isRequestSidebarFailed:false, 
            sidebar: action.payload})
      case constants.REQUEST_SIDEBAR_FAILED:
        switch(action.payload.Code){
          case 'INTERNAL_SERVER_ERROR_SIDEBAR_REQUEST':
            return Object.assign({}, state, 
              {isPendingRequestSidebar:false,
                isRequestSidebarFailed:true }) 
          case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
            return Object.assign({}, state, 
              {isPendingRequestSidebar:false,
                isRequestSidebarFailed:true}) 
          default://unhandled error
            return Object.assign({}, state,  
              {error: action.payload, 
                isPendingRequestSidebar:false, 
                isRequestSidebarFailed:true}) 
        }
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
          {createTagSeq:action.payload.tagSeq,
            createTagSeqErrMsg:action.payload.errorMsg,
            isCreateTagSeqValid:false})
      case true:
        return Object.assign({}, state, 
          {createTagSeq:action.payload.tagSeq,
            createTagSeqErrMsg:"",
            isCreateTagSeqValid:true})
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
          {updateTagName:action.payload.tagName,
            updateTagNameErrMsg:action.payload.errorMsg,
            isUpdateTagNameValid:false})
      case true:
        return Object.assign({}, state, 
          {updateTagName:action.payload.tagName,
            updateTagNameErrMsg:"",
            isUpdateTagNameValid:true})
      default:
        return state
    }
  case constants.ONCHANGE_UPDATE_TAG_SEQ:
    switch(action.payload.isValid){
      case false:
        return Object.assign({}, state, 
          {updateTagSeq:action.payload.tagSeq,
            updateTagSeqErrMsg:action.payload.errorMsg,
            isUpdateTagSeqValid:false})
      case true:
        return Object.assign({}, state, 
          {updateTagSeq:action.payload.tagSeq,
            updateTagSeqErrMsg:"",
            isUpdateTagSeqValid:true})
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
  searchMenu1Name:"",
  //create Menu1
  isShowCreateMenu1:false,
  createMenu1Name:"",
  createMenu1Seq:"",
  isCreateMenu1NameValid:null,
  isCreateMenu1SeqValid:null,
  createMenu1NameErrMsg:"",
  createMenu1SeqErrMsg:"",
  isPendingPostMenu1:false,
  //delete Menu1
  isShowDeleteMenu1:false,
  deleteMenu1Name:null,
  deleteMenu1ID:null,
  isPendingDeleteMenu1:false,
  isDeleteMenu1Failed:false,
  deleteMenu1ErrMsg:"",
  //update Menu1
  isShowUpdateMenu1:false,
  isPendingUpdateMenu1:false,
  isUpdateMenu1NameValid:true,
  isUpdateMenu1SeqValid:true,
  updateMenu1ID:"",
  updateMenu1Name:"",
  updateMenu1NameErrMsg:"",
  updateMenu1Seq:"",
  updateMenu1SeqErrMsg:"",
}

export const menu1Rdc = (state=initialStateMenu1, action={}) => {
  switch (action.type) {
  /*------------------request Menu1----------------------- */
  case constants.REQUEST_MENU1_PENDING:
    return Object.assign({}, state, 
      {isPendingRequestMenu1:true,
        isRequestMenu1Failed:false, 
        isRefreshMenu1Needed:false})
  case constants.REQUEST_MENU1_SUCCESS:
    return Object.assign({}, state, 
      {isPendingRequestMenu1:false,
        isRequestMenu1Failed:false, 
        menu1: action.payload})
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
    return Object.assign({}, state, {isPendingPostMenu1:true,isRefreshTopbarNeeded:false})
  case constants.POST_MENU1_SUCCESS:
    return Object.assign({}, state, 
      {isRefreshMenu1Needed:true,
        isRefreshTopbarNeeded:true,
        isPendingPostMenu1:false,
        isShowCreateMenu1:false,
        isCreateMenu1NameValid:null,createMenu1Name:"",createMenu1NameErrMsg:"",
        isCreateMenu1SeqValid:null, createMenu1Seq:"",createMenu1SeqErrMsg:""})
  case constants.POST_MENU1_FAILED:
    switch(action.payload.Code){
      case 'MENU1_MANDATORY_FIELD':
        return Object.assign({}, state, 
          { isPendingPostMenu1:false,
            isCreateMenu1NameValid:false, createMenu1NameErrMsg:action.payload.errMessage,
            isCreateMenu1SeqValid:false, createMenu1SeqErrMsg:action.payload.errMessage
          }) 
      case 'INTERNAL_SERVER_ERROR_MENU1_CHECK_DUP':
        return Object.assign({}, state, 
          { isPendingPostMenu1:false,
            isCreateMenu1NameValid:false, createMenu1NameErrMsg:action.payload.errMessage,
            isCreateMenu1SeqValid:false, createMenu1SeqErrMsg:action.payload.errMessage
          }) 
      case 'MENU1_DUPLICATE_MENU1_NAME':
        return Object.assign({}, state, 
          { isPendingPostMenu1:false,
            isCreateMenu1NameValid:false, createMenu1NameErrMsg:action.payload.errMessage
          }) 
      case 'INTERNAL_SERVER_ERROR_MENU1_INSERT':
        return Object.assign({}, state, 
          { isPendingPostMenu1:false,
            isCreateMenu1NameValid:false, createMenu1NameErrMsg:action.payload.errMessage
          }) 
      case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
        return Object.assign({}, state, 
          { isPendingPostMenu1:false,
            isCreateMenu1NameValid:false, createMenu1NameErrMsg:action.payload.errMessage,
            isCreateMenu1SeqValid:false, createMenu1SeqErrMsg:action.payload.errMessage
          }) 
      default://unhandled error
        return Object.assign({}, state, 
          {error: action.payload,
            isPendingPostMenu1:false,
            createMenu1Name:"",
            createMenu1Seq:"",
            isCreateMenu1NameValid:null,createMenu1NameErrMsg:"",
            isCreateMenu1SeqValid:null,createMenu1SeqErrMsg:""}) 
    }
  case constants.CLEAR_CREATE_MENU1:
    return Object.assign({}, state, 
      {isCreateMenu1NameValid:null,createMenu1Name:"",createMenu1NameErrMsg:"",
      isCreateMenu1SeqValid:null, createMenu1Seq:"",createMenu1SeqErrMsg:""})
  case constants.ONCHANGE_CREATE_MENU1_NAME:
    switch(action.payload.isValid){
      case false:
        return Object.assign({}, state, 
          {createMenu1Name:action.payload.menu1Name,
            createMenu1NameErrMsg:action.payload.errorMsg,
            isCreateMenu1NameValid:false})
      case true:
        return Object.assign({}, state, 
          {createMenu1Name:action.payload.menu1Name,
            createMenu1NameErrMsg:"",
            isCreateMenu1NameValid:true})
      default:
        return state
    }
  case constants.ONCHANGE_CREATE_MENU1_SEQ:
    switch(action.payload.isValid){
      case false:
        return Object.assign({}, state, 
          {createMenu1Seq:action.payload.menu1Seq,
            createMenu1SeqErrMsg:action.payload.errorMsg,
            isCreateMenu1SeqValid:false})
      case true:
        return Object.assign({}, state, 
          {createMenu1Seq:action.payload.menu1Seq,
            createMenu1SeqErrMsg:"",
            isCreateMenu1SeqValid:true})
      default:
        return state
    }
  case constants.SELECT_CREATE_MENU1:
    return Object.assign({}, state,  {isShowCreateMenu1:true})
  case constants.CLOSE_CREATE_MENU1:
    return Object.assign({}, state,  
      {isShowCreateMenu1:false,
      createMenu1Name:"",
      createMenu1Seq:"",
      isCreateMenu1NameValid:null,
      isCreateMenu1SeqValid:null})
/*--------------------------delete menu1------------------------------- */
case constants.DELETE_MENU1_PENDING:
  return Object.assign({}, state, {isPendingDeleteMenu1:true,isRefreshTopbarNeeded:false})
case constants.DELETE_MENU1_SUCCESS:
  return Object.assign({}, state, 
    {isPendingDeleteMenu1:false, 
      isRefreshMenu1Needed:true,
      isRefreshTopbarNeeded:true,
      isDeleteMenu1Failed:false,
      isShowDeleteMenu1:false,
      deleteMenu1Name:null, 
      deleteMenu1ID:null})
case constants.DELETE_MENU1_FAILED:
  switch(action.payload.Code){
    case 'INTERNAL_SERVER_ERROR_MENU1_DELETE':
      return Object.assign({}, state, 
        { isPendingDeleteMenu1:false,
          isDeleteMenu1Failed:true,
          deleteMenu1ErrMsg:action.payload.errMessage
        }) 
    case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
      return Object.assign({}, state, 
        { isPendingDeleteMenu1:false,
          isDeleteMenu1Failed:true,
          deleteMenu1ErrMsg:action.payload.errMessage
        }) 
    case 'MENU1_FOREIGN_KEY_EXIST':
      return Object.assign({}, state, 
        { isPendingDeleteMenu1:false,
          isDeleteMenu1Failed:true,
          deleteMenu1ErrMsg:action.payload.errMessage
        }) 
    default://unhandled error
      return Object.assign({}, state, 
        { error: action.payload,
          isPendingDeleteMenu1:false,
          isDeleteMenu1Failed:true
        })
  }
case constants.SELECT_DELETE_MENU1:
  return Object.assign({}, state,  
    {isShowDeleteMenu1:true, deleteMenu1Name:action.payload.deleteMenu1Name, deleteMenu1ID:action.payload.deleteMenu1ID})
case constants.CLOSE_DELETE_MENU1:
  return Object.assign({}, state,  
    {isShowDeleteMenu1:false, isDeleteMenu1Failed:false, deleteMenu1Name:null, 
      deleteMenu1ID:null, deleteMenu1ErrMsg:null})
/*--------------------------update menu1------------------------------- */
case constants.SELECT_UPDATE_MENU1:
  return Object.assign({}, state, 
    {isShowUpdateMenu1:true,
      updateMenu1ID:action.payload.updateMenu1ID,
      updateMenu1Name:action.payload.updateMenu1Name,
      updateMenu1Seq:action.payload.updateMenu1Seq})
case constants.CLOSE_UPDATE_MENU1:
  return Object.assign({}, state, 
    {isShowUpdateMenu1:false,
      updateMenu1ID:"",
      updateMenu1Name:"",
      updateMenu1Seq:"",
      isUpdateMenu1NameValid:true,
      isUpdateMenu1SeqValid:true,
      updateMenu1NameErrMsg:"",
      updateMenu1SeqErrMsg:""
      })
case constants.ONCHANGE_UPDATE_MENU1_NAME:
  switch(action.payload.isValid){
    case false:
      return Object.assign({}, state, 
        {updateMenu1Name:action.payload.menu1Name,
          updateMenu1NameErrMsg:action.payload.errorMsg,
          isUpdateMenu1NameValid:false})
    case true:
      return Object.assign({}, state, 
        {updateMenu1Name:action.payload.menu1Name,
          updateMenu1NameErrMsg:"",
          isUpdateMenu1NameValid:true})
    default:
      return state
  }
case constants.ONCHANGE_UPDATE_MENU1_SEQ:
  switch(action.payload.isValid){
    case false:
      return Object.assign({}, state, 
        {updateMenu1Seq:action.payload.menu1Seq,
          updateMenu1SeqErrMsg:action.payload.errorMsg,
          isUpdateMenu1SeqValid:false})
    case true:
      return Object.assign({}, state, 
        {updateMenu1Seq:action.payload.menu1Seq,
          updateMenu1SeqErrMsg:"",
          isUpdateMenu1SeqValid:true})
    default:
      return state
  }
case constants.UPDATE_MENU1_PENDING:
  return Object.assign({}, state, {isPendingUpdateMenu1:true,isRefreshTopbarNeeded:false})
case constants.UPDATE_MENU1_SUCCESS:
  return Object.assign({}, state, 
    {isRefreshMenu1Needed:true,
      isRefreshTopbarNeeded:true,
      isPendingUpdateMenu1:false,
      isShowUpdateMenu1:false,
      isUpdateMenu1NameValid:true,updateMenu1Name:"",updateMenu1NameErrMsg:"",
      isUpdateMenu1SeqValid:true, updateMenu1Seq:"",updateMenu1SeqErrMsg:""})
case constants.UPDATE_MENU1_FAILED:
  switch(action.payload.Code){
    case 'MENU1_MANDATORY_FIELD':
      return Object.assign({}, state, 
        { isPendingUpdateMenu1:false,
          isUpdateMenu1NameValid:false, updateMenu1NameErrMsg:action.payload.errMessage,
          isUpdateMenu1SeqValid:false, updateMenu1SeqErrMsg:action.payload.errMessage
        }) 
    case 'INTERNAL_SERVER_ERROR_MENU1_CHECK_DUP':
      return Object.assign({}, state, 
        { isPendingUpdateMenu1:false,
          isUpdateMenu1NameValid:false, updateMenu1NameErrMsg:action.payload.errMessage,
          isUpdateMenu1SeqValid:false, updateMenu1SeqErrMsg:action.payload.errMessage
        }) 
    case 'MENU1_DUPLICATE_MENU1_NAME':
      return Object.assign({}, state, 
        { isPendingUpdateMenu1:false,
          isUpdateMenu1NameValid:false, updateMenu1NameErrMsg:action.payload.errMessage
        }) 
    case 'INTERNAL_SERVER_ERROR_MENU1_UPDATE':
      return Object.assign({}, state, 
        { isPendingUpdateMenu1:false,
          isUpdateMenu1NameValid:false, updateMenu1NameErrMsg:action.payload.errMessage,
          isUpdateMenu1SeqValid:false, updateMenu1SeqErrMsg:action.payload.errMessage
        }) 
    case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
      return Object.assign({}, state, 
        { isPendingUpdateMenu1:false,
          isUpdateMenu1NameValid:false, updateMenu1NameErrMsg:action.payload.errMessage,
          isUpdateMenu1SeqValid:false, updateMenu1SeqErrMsg:action.payload.errMessage
        }) 
    default://unhandled error
      return Object.assign({}, state, 
        {error: action.payload,
          isPendingUpdateMenu1:false,
          updateMenu1Name:"",
          updateMenu1Seq:"",
          isUpdateMenu1NameValid:null,updateMenu1NameErrMsg:"",
          isUpdateMenu1SeqValid:null,updateMenu1SeqErrMsg:""}) 
  }

default:
    return state
  }
}


const initialStateMenu2= {
  menu2: [],
  isRefreshMenu2Needed:false,
  isRefreshTopbarNeeded:false,
  //request Menu2
  isPendingRequestMenu2: false,
  isRequestMenu2Failed: false,
  isShowRequestMenu2ErrAlert:false,
  requestMenu2ErrMsg:"",
  //search Menu2
  searchMenu2Name:"",
  searchMenu2ParentName:"",
  //create Menu2
  isShowCreateMenu2:false,
  createMenu2Name:"",
  createMenu2ParentMenuID:"",
  createMenu2Seq:"",
  isCreateMenu2NameValid:null,
  isCreateMenu2ParentMenuIDValid:null,
  isCreateMenu2SeqValid:null,
  createMenu2NameErrMsg:"",
  createMenu2ParentMenuIDErrMsg:"",
  createMenu2SeqErrMsg:"",
  isPendingPostMenu2:false,
  //delete Menu2
  isShowDeleteMenu2:false,
  deleteMenu2Name:null,
  deleteMenu2ID:null,
  isPendingDeleteMenu2:false,
  isDeleteMenu2Failed:false,
  deleteMenu2ErrMsg:"",
  //update Menu2
  isShowUpdateMenu2:false,
  isPendingUpdateMenu2:false,
  isUpdateMenu2NameValid:true,
  isUpdateMenu2SeqValid:true,
  updateMenu2ID:"",
  updateMenu2Name:"",
  updateMenu2NameErrMsg:"",
  updateMenu2Seq:"",
  updateMenu2SeqErrMsg:""
}

export const menu2Rdc = (state=initialStateMenu2, action={}) => {
  switch (action.type) {
  /*------------------request Menu2----------------------- */
  case constants.REQUEST_MENU2_PENDING:
    return Object.assign({}, state, 
      {isPendingRequestMenu2:true,
        isRequestMenu2Failed:false, 
        isRefreshMenu2Needed:false})
  case constants.REQUEST_MENU2_SUCCESS:
    return Object.assign({}, state, 
      {isPendingRequestMenu2:false,
        isRequestMenu2Failed:false, 
        menu2: action.payload})
  case constants.REQUEST_MENU2_FAILED:
    switch(action.payload.Code){
      case 'INTERNAL_SERVER_ERROR_MENU2_REQUEST':
        return Object.assign({}, state, 
          {isPendingRequestMenu2:false, isRequestMenu2Failed:true,
            isShowRequestMenu2ErrAlert:true, requestMenu2ErrMsg:action.payload.errMessage }) 
      case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
        return Object.assign({}, state, 
          {isPendingRequestMenu2:false, isRequestMenu2Failed:true,
            isShowRequestMenu2ErrAlert:true, requestMenu2ErrMsg:action.payload.errMessage }) 
      default://unhandled error
        return Object.assign({}, state,  
          {error: action.payload, isPendingRequestMenu2:false, isRequestMenu2Failed:true}) 
    }
  case constants.CLOSE_MENU2_ERROR_ALERT:
    return Object.assign({}, state, {isShowRequestMenu2ErrAlert:false, requestMenu2ErrMsg:""})
  /*------------------search Menu2----------------------- */
  case constants.SEARCH_MENU2_PENDING:
    return Object.assign({}, state, {isPendingRequestMenu2:true,isRequestMenu2Failed:false})
  case constants.SEARCH_MENU2_SUCCESS:
    return Object.assign({}, state, 
      {isPendingRequestMenu2:false,isRequestMenu2Failed:false,menu2: action.payload, isRefreshMenu2Needed:false})
  case constants.SEARCH_MENU2_FAILED:
    switch(action.payload.Code){
      case 'INTERNAL_SERVER_ERROR_MENU2_SEARCH':
        return Object.assign({}, state, 
          {isPendingRequestMenu2:false, isRequestMenu2Failed:true,
            isShowRequestMenu2ErrAlert:true, requestMenu2ErrMsg:action.payload.errMessage }) 
      case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
        return Object.assign({}, state, 
          {isPendingRequestMenu2:false, isRequestMenu2Failed:true,
            isShowRequestMenu2ErrAlert:true, requestMenu2ErrMsg:action.payload.errMessage })
      default://unhandled error
        return Object.assign({}, state,  
          {error: action.payload, isPendingRequestMenu2:false, isRequestMenu2Failed:true,
            isShowRequestMenu2ErrAlert:true}) 
    }
  case constants.ONCHANGE_SEARCH_MENU2_NAME:
    return Object.assign({}, state, {searchMenu2Name:action.payload})
  case constants.ONCHANGE_SEARCH_MENU2_PARENT_NAME:
    return Object.assign({}, state, {searchMenu2ParentName:action.payload})
  case constants.CLEAR_SEARCH_MENU2:
    return Object.assign({}, state, 
      {searchMenu2Name:"", 
      searchMenu2ParentName:"",
      isRefreshMenu2Needed:true
    })
  /*--------------------------create Menu2------------------------------- */
  case constants.POST_MENU2_PENDING:
    return Object.assign({}, state, {isPendingPostMenu2:true})
  case constants.POST_MENU2_SUCCESS:
    return Object.assign({}, state, 
      {isRefreshMenu2Needed:true,
        isPendingPostMenu2:false,
        isShowCreateMenu2:false,
        isCreateMenu2NameValid:null,createMenu2Name:"",createMenu2NameErrMsg:"",
        isCreateMenu2ParentMenuIDValid:null,createMenu2ParentMenuID:"",createMenu2ParentMenuIDErrMsg:"",
        isCreateMenu2SeqValid:null, createMenu2Seq:"",createMenu2SeqErrMsg:""})
  case constants.POST_MENU2_FAILED:
    switch(action.payload.Code){
      case 'MENU2_MANDATORY_FIELD':
        return Object.assign({}, state, 
          { isPendingPostMenu2:false,
            isCreateMenu2NameValid:false, createMenu2NameErrMsg:action.payload.errMessage,
            isCreateMenu2ParentMenuIDValid:false, createMenu2ParentMenuIDErrMsg:action.payload.errMessage,
            isCreateMenu2SeqValid:false, createMenu2SeqErrMsg:action.payload.errMessage
          }) 
      case 'INTERNAL_SERVER_ERROR_MENU2_CHECK_DUP':
        return Object.assign({}, state, 
          { isPendingPostMenu2:false,
            isCreateMenu2NameValid:false, createMenu2NameErrMsg:action.payload.errMessage,
            isCreateMenu2ParentMenuIDValid:false, createMenu2ParentMenuIDErrMsg:action.payload.errMessage,
            isCreateMenu2SeqValid:false, createMenu2SeqErrMsg:action.payload.errMessage
          }) 
      case 'MENU2_DUPLICATE_MENU2_NAME':
        return Object.assign({}, state, 
          { isPendingPostMenu2:false,
            isCreateMenu2NameValid:false, createMenu2NameErrMsg:action.payload.errMessage
          })
      case 'INTERNAL_SERVER_ERROR_MENU2_INSERT':
        return Object.assign({}, state, 
          { isPendingPostMenu2:false,
            isCreateMenu2NameValid:false, createMenu2NameErrMsg:action.payload.errMessage
          }) 
      case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
        return Object.assign({}, state, 
          { isPendingPostMenu2:false,
            isCreateMenu2NameValid:false, createMenu2NameErrMsg:action.payload.errMessage,
            isCreateMenu2ParentMenuIDValid:false, createMenu2ParentMenuIDErrMsg:action.payload.errMessage,
            isCreateMenu2SeqValid:false, createMenu2SeqErrMsg:action.payload.errMessage
          }) 
      default://unhandled error
        return Object.assign({}, state, 
          {error: action.payload,
            isPendingPostMenu2:false,
            createMenu2Name:"",
            createMenu2Seq:"",
            isCreateMenu2NameValid:null,createMenu2NameErrMsg:"",
            isCreateMenu2ParentMenuIDValid:null,createMenu2ParentMenuIDErrMsg:"",
            isCreateMenu2SeqValid:null,createMenu2SeqErrMsg:""}) 
    }
  case constants.CLEAR_CREATE_MENU2:
    return Object.assign({}, state, 
      {isCreateMenu2NameValid:null,createMenu2Name:"",createMenu2NameErrMsg:"",
      isCreateMenu2ParentMenuIDValid:null,createMenu2ParentMenuID:"",createMenu2ParentMenuIDErrMsg:"",
      isCreateMenu2SeqValid:null, createMenu2Seq:"",createMenu2SeqErrMsg:""})
  case constants.ONCHANGE_CREATE_MENU2_NAME:
    switch(action.payload.isValid){
      case false:
        return Object.assign({}, state, 
          {createMenu2Name:action.payload.menu2Name,
            createMenu2NameErrMsg:action.payload.errorMsg,
            isCreateMenu2NameValid:false})
      case true:
        return Object.assign({}, state, 
          {createMenu2Name:action.payload.menu2Name,
            createMenu2NameErrMsg:"",
            isCreateMenu2NameValid:true})
      default:
        return state
    }
  case constants.ONCHANGE_CREATE_MENU2_PARENT_NAME:
    switch(action.payload.isValid){
      case false:
        return Object.assign({}, state, 
          {createMenu2ParentMenuID:action.payload.menu2ParentMenuID,
            createMenu2ParentMenuIDErrMsg:action.payload.errorMsg,
            isCreateMenu2ParentMenuIDValid:false})
      case true:
        return Object.assign({}, state, 
          {createMenu2ParentMenuID:action.payload.menu2ParentMenuID,
            createMenu2ParentMenuIDErrMsg:"",
            isCreateMenu2ParentMenuIDValid:true})
      default:
        return state
    }
  case constants.ONCHANGE_CREATE_MENU2_SEQ:
    switch(action.payload.isValid){
      case false:
        return Object.assign({}, state, 
          {createMenu2Seq:action.payload.menu2Seq,
            createMenu2SeqErrMsg:action.payload.errorMsg,
            isCreateMenu2SeqValid:false})
      case true:
        return Object.assign({}, state, 
          {createMenu2Seq:action.payload.menu2Seq,
            createMenu2SeqErrMsg:"",
            isCreateMenu2SeqValid:true})
      default:
        return state
    }
  case constants.SELECT_CREATE_MENU2:
    return Object.assign({}, state,  {isShowCreateMenu2:true})
  case constants.CLOSE_CREATE_MENU2:
    return Object.assign({}, state,  
      {isShowCreateMenu2:false,
      createMenu2Name:"",
      createMenu2ParentMenuID:"",
      createMenu2Seq:"",
      isCreateMenu2NameValid:null,
      isCreateMenu2ParentMenuIDValid:null,
      isCreateMenu2SeqValid:null})
/*--------------------------delete Menu2------------------------------- */
case constants.DELETE_MENU2_PENDING:
  return Object.assign({}, state, {isPendingDeleteMenu2:true,isRefreshTopbarNeeded:false})
case constants.DELETE_MENU2_SUCCESS:
  return Object.assign({}, state, 
    {isPendingDeleteMenu2:false, 
      isRefreshMenu2Needed:true,
      isRefreshTopbarNeeded:true,
      isDeleteMenu2Failed:false,
      isShowDeleteMenu2:false,
      deleteMenu2Name:null, 
      deleteMenu2ID:null})
case constants.DELETE_MENU2_FAILED:
  switch(action.payload.Code){
    case 'INTERNAL_SERVER_ERROR_MENU2_DELETE':
      return Object.assign({}, state, 
        { isPendingDeleteMenu2:false,
          isDeleteMenu2Failed:true,
          deleteMenu2ErrMsg:action.payload.errMessage
        }) 
    case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
      return Object.assign({}, state, 
        { isPendingDeleteMenu2:false,
          isDeleteMenu2Failed:true,
          deleteMenu2ErrMsg:action.payload.errMessage
        }) 
    case 'MENU2_FOREIGN_KEY_EXIST':
      return Object.assign({}, state, 
        { isPendingDeleteMenu2:false,
          isDeleteMenu2Failed:true,
          deleteMenu2ErrMsg:action.payload.errMessage
        }) 
    default://unhandled error
      return Object.assign({}, state, 
        { error: action.payload,
          isPendingDeleteMenu2:false,
          isDeleteMenu2Failed:true
        })
  }
case constants.SELECT_DELETE_MENU2:
  return Object.assign({}, state,  
    {isShowDeleteMenu2:true, deleteMenu2Name:action.payload.deleteMenu2Name, deleteMenu2ID:action.payload.deleteMenu2ID})
case constants.CLOSE_DELETE_MENU2:
  return Object.assign({}, state,  
    {isShowDeleteMenu2:false, isDeleteMenu2Failed:false, deleteMenu2Name:null, 
      deleteMenu2ID:null, deleteMenu2ErrMsg:null})
/*--------------------------update Menu2------------------------------- */
case constants.SELECT_UPDATE_MENU2:
  return Object.assign({}, state, 
    {isShowUpdateMenu2:true,
      updateMenu2ID:action.payload.updateMenu2ID,
      updateMenu2Name:action.payload.updateMenu2Name,
      updateMenu2Seq:action.payload.updateMenu2Seq})
case constants.CLOSE_UPDATE_MENU2:
  return Object.assign({}, state, 
    {isShowUpdateMenu2:false,
      updateMenu2ID:"",
      updateMenu2Name:"",
      updateMenu2Seq:"",
      isUpdateMenu2NameValid:true,
      isUpdateMenu2SeqValid:true,
      updateMenu2NameErrMsg:"",
      updateMenu2SeqErrMsg:""
      })
case constants.ONCHANGE_UPDATE_MENU2_NAME:
  switch(action.payload.isValid){
    case false:
      return Object.assign({}, state, 
        {updateMenu2Name:action.payload.menu2Name,
          updateMenu2NameErrMsg:action.payload.errorMsg,
          isUpdateMenu2NameValid:false})
    case true:
      return Object.assign({}, state, 
        {updateMenu2Name:action.payload.menu2Name,
          updateMenu2NameErrMsg:"",
          isUpdateMenu2NameValid:true})
    default:
      return state
  }
case constants.ONCHANGE_UPDATE_MENU2_SEQ:
  switch(action.payload.isValid){
    case false:
      return Object.assign({}, state, 
        {updateMenu2Seq:action.payload.menu2Seq,
          updateMenu2SeqErrMsg:action.payload.errorMsg,
          isUpdateMenu2SeqValid:false})
    case true:
      return Object.assign({}, state, 
        {updateMenu2Seq:action.payload.menu2Seq,
          updateMenu2SeqErrMsg:"",
          isUpdateMenu2SeqValid:true})
    default:
      return state
  }
case constants.UPDATE_MENU2_PENDING:
  return Object.assign({}, state, {isPendingUpdateMenu2:true,isRefreshTopbarNeeded:false})
case constants.UPDATE_MENU2_SUCCESS:
  return Object.assign({}, state, 
    {isRefreshMenu2Needed:true,
      isRefreshTopbarNeeded:true,
      isPendingUpdateMenu2:false,
      isShowUpdateMenu2:false,
      isUpdateMenu2NameValid:true,updateMenu2Name:"",updateMenu2NameErrMsg:"",
      isUpdateMenu2SeqValid:true, updateMenu2Seq:"",updateMenu2SeqErrMsg:""})
case constants.UPDATE_MENU2_FAILED:
  switch(action.payload.Code){
    case 'MENU2_MANDATORY_FIELD':
      return Object.assign({}, state, 
        { isPendingUpdateMenu2:false,
          isUpdateMenu2NameValid:false, updateMenu2NameErrMsg:action.payload.errMessage,
          isUpdateMenu2SeqValid:false, updateMenu2SeqErrMsg:action.payload.errMessage
        }) 
    case 'INTERNAL_SERVER_ERROR_MENU2_CHECK_DUP':
      return Object.assign({}, state, 
        { isPendingUpdateMenu2:false,
          isUpdateMenu2NameValid:false, updateMenu2NameErrMsg:action.payload.errMessage,
          isUpdateMenu2SeqValid:false, updateMenu2SeqErrMsg:action.payload.errMessage
        }) 
    case 'MENU2_DUPLICATE_MENU2_NAME':
      return Object.assign({}, state, 
        { isPendingUpdateMenu2:false,
          isUpdateMenu2NameValid:false, updateMenu2NameErrMsg:action.payload.errMessage
        }) 
    case 'INTERNAL_SERVER_ERROR_MENU2_UPDATE':
      return Object.assign({}, state, 
        { isPendingUpdateMenu2:false,
          isUpdateMenu2NameValid:false, updateMenu2NameErrMsg:action.payload.errMessage,
          isUpdateMenu2SeqValid:false, updateMenu2SeqErrMsg:action.payload.errMessage
        }) 
    case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
      return Object.assign({}, state, 
        { isPendingUpdateMenu2:false,
          isUpdateMenu2NameValid:false, updateMenu2NameErrMsg:action.payload.errMessage,
          isUpdateMenu2SeqValid:false, updateMenu2SeqErrMsg:action.payload.errMessage
        }) 
    default://unhandled error
      return Object.assign({}, state, 
        {error: action.payload,
          isPendingUpdateMenu2:false,
          updateMenu2Name:"",
          updateMenu2Seq:"",
          isUpdateMenu2NameValid:null,updateMenu2NameErrMsg:"",
          isUpdateMenu2SeqValid:null,updateMenu2SeqErrMsg:""}) 
    }
  //Parent Menu Modal
  case constants.CLOSE_PARENT_MENU_MODAL:
    return Object.assign({}, state, {isShowParentMenuModal:false})
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
  menu1Rdc,
  menu2Rdc
}); 

export default rootReducer;