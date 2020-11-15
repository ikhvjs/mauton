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
  ONCHANGE_SEARCH_BLOGLIST_TAG_NAME
 } from '../../constants';


export const requestBlogListAct = () => (dispatch,getState) =>{
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
            userID: getState().authRdc.userID,
            menu2ID:getState().sidebarRdc.sidebarMenuID
          })
        })
    .then(res => {
      resStatus = res.status
      return res.json()
    })
    .then(res => {
      switch (resStatus) {
        case 200:
          return dispatch({ type: REQUEST_BLOGLIST_SUCCESS, payload: res })
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
    // .then(data => dispatch({ type: REQUEST_BLOGLIST_SUCCESS, payload: data }))
    // .catch(error => dispatch({ type: REQUEST_BLOGLIST_FAILED, payload: error }))
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



export const searchBlogListAct = (searchBloglist) => (dispatch) => {
  console.log('searchBloglist ',searchBloglist);
  dispatch({ type: SEARCH_BLOGLIST_PENDING })
    fetch(`${API_PORT}/bloglist/search`, {
        method: 'post',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
          blog_title: searchBloglist.blog_title,
          blog_category_name: searchBloglist.blog_category_name,
          tag_name:searchBloglist.tag_name,
          menu_path:searchBloglist.menu_path
        })
      })
    .then(response => response.json())
    .then(data => dispatch({ type: SEARCH_BLOGLIST_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: SEARCH_BLOGLIST_FAILED, payload: error }))

}



