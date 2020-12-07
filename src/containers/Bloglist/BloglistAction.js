import {
  API_PORT,
  REQUEST_BLOGLIST_PENDING,
  REQUEST_BLOGLIST_SUCCESS,
  REQUEST_BLOGLIST_FAILED,
  SEARCH_BLOGLIST_PENDING,
  SEARCH_BLOGLIST_SUCCESS,
  SEARCH_BLOGLIST_FAILED,
  CLEAR_SEARCH_BLOGLIST,
  ONCHANGE_SEARCH_BLOGLIST_BLOG_TITLE,
  ONCHANGE_SEARCH_BLOGLIST_CATEGORY_NAME,
  ONCHANGE_SEARCH_BLOGLIST_TAG_NAME,
  SET_BLOGLIST_PAGE
} from '../../constants';

import { getDisplayItems } from '../../utility/utility';

export const requestBlogListAct = () => (dispatch, getState) => {
  let resStatus;
  dispatch({ type: REQUEST_BLOGLIST_PENDING })
  fetch(`${API_PORT}/bloglist/request`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${getState().authRdc.token}`
    },
    body: JSON.stringify({
      menu2ID: getState().sidebarRdc.sidebarMenuID
    })
  })
    .then(res => {
      resStatus = res.status
      return res.json()
    })
    .then(res => {
      switch (resStatus) {
        case 200:
          dispatch({ type: REQUEST_BLOGLIST_SUCCESS, payload: res });
          const itemPerPage = getState().blogListRdc.itemPerPage;
          const blogList = getState().blogListRdc.blogList;
          const displayBlogList = getDisplayItems(1, itemPerPage, blogList);
          dispatch({ type: SET_BLOGLIST_PAGE, payload: { displayBlogList: displayBlogList, selectedPage: 1 } });
          break;
        case 500:
          return dispatch({ type: REQUEST_BLOGLIST_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
        default:
          return dispatch({ type: REQUEST_BLOGLIST_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:BLOGLIST-REQUEST-1), please try again' } })
      }
    })
    .catch(
      () => dispatch({
        type: REQUEST_BLOGLIST_FAILED,
        payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:BLOGLIST-REQUEST-2), please try again' }
      })
    )
};

export const clearSearchBlogListAct = (event) => {
  return { type: CLEAR_SEARCH_BLOGLIST };
}

export const onchangeSearchBlogTitleAct = (event) => {
  return ({ type: ONCHANGE_SEARCH_BLOGLIST_BLOG_TITLE, payload: event.target.value });
}

export const onchangeSearchCategoryNameAct = (event) => {
  return ({ type: ONCHANGE_SEARCH_BLOGLIST_CATEGORY_NAME, payload: event.target.value });
}

export const onchangeSearchTagNameAct = (event) => {
  return ({ type: ONCHANGE_SEARCH_BLOGLIST_TAG_NAME, payload: event.target.value });
}



export const searchBlogListAct = () => (dispatch, getState) => {
  let resStatus;
  dispatch({ type: SEARCH_BLOGLIST_PENDING })
  fetch(`${API_PORT}/bloglist/search`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${getState().authRdc.token}`
    },
    body: JSON.stringify({
      blogTitle: getState().blogListRdc.searchBlogTitle,
      categoryName: getState().blogListRdc.searchCategoryName,
      tagName: getState().blogListRdc.searchTagName,
      menuID: getState().sidebarRdc.sidebarMenuID
    })
  })
    .then(res => {
      resStatus = res.status
      return res.json()
    })
    .then(res => {
      switch (resStatus) {
        case 200:
          dispatch({ type: SEARCH_BLOGLIST_SUCCESS, payload: res });
          const itemPerPage = getState().blogListRdc.itemPerPage;
          const blogList = getState().blogListRdc.blogList;
          const displayBlogList = getDisplayItems(1, itemPerPage, blogList);
          dispatch({ type: SET_BLOGLIST_PAGE, payload: { displayBlogList: displayBlogList, selectedPage: 1 } });
          break;
        case 500:
          return dispatch({ type: SEARCH_BLOGLIST_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
        default:
          return dispatch({ type: SEARCH_BLOGLIST_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:BLOGLIST-SEARCH-1), please try again' } })
      }
    })
    .catch(
      () => dispatch({
        type: SEARCH_BLOGLIST_FAILED,
        payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:BLOGLIST-SEARCH-2), please try again' }
      })
    )

}

export const setPageAct = (selectedPage) => (dispatch, getState) => {
  const itemPerPage = getState().blogListRdc.itemPerPage;
  const blogList = getState().blogListRdc.blogList;

  const displayBlogList = getDisplayItems(selectedPage, itemPerPage, blogList);

  dispatch({ type: SET_BLOGLIST_PAGE, payload: { displayBlogList: displayBlogList, selectedPage: selectedPage } });
}
