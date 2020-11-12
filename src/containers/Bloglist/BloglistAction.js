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


export const requestBlogListAct = (sidebarMenuID) => (dispatch,getState) =>{
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
            menu2ID:sidebarMenuID
          })
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_BLOGLIST_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_BLOGLIST_FAILED, payload: error }))
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



