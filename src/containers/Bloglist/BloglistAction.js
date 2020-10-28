import {
  API_PORT,
  REQUEST_BLOGLIST_PENDING,
  REQUEST_BLOGLIST_SUCCESS,
  REQUEST_BLOGLIST_FAILED,
  REQUEST_BLOGLIST_C_PENDING,
  REQUEST_BLOGLIST_C_SUCCESS,
  REQUEST_BLOGLIST_C_FAILED,
  SEARCH_BLOGLIST_PENDING,
  SEARCH_BLOGLIST_SUCCESS,
  SEARCH_BLOGLIST_FAILED,
  CLEAR_SEARCH_BLOGLIST
 } from '../../constants';


export const requestBloglistAct = (sidebarMenuPath) => (dispatch) =>{
  dispatch({ type: REQUEST_BLOGLIST_PENDING })
    fetch(`${API_PORT}/bloglist/path/${sidebarMenuPath}`, {
          method: 'get',
          headers: {'Content-Type': 'text/plain'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_BLOGLIST_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_BLOGLIST_FAILED, payload: error }))
};



export const requestBloglistByClickAct = (sidebarMenuID) => (dispatch) =>{
  dispatch({ type: REQUEST_BLOGLIST_C_PENDING })
    fetch(`${API_PORT}/bloglist/id/${sidebarMenuID}`, {
          method: 'get',
          headers: {'Content-Type': 'text/plain'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_BLOGLIST_C_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_BLOGLIST_C_FAILED, payload: error }))
};


export const selectSearchBloglistAct = (event,sidebarMenuPath) => {
  const searchBloglist ={};
  Object.assign(searchBloglist,{menu_path:sidebarMenuPath});
  const inputNode = event.target.parentNode.parentNode.querySelectorAll("div > input.form-control")
  console.log('selectSearchBloglistAct inputNode',inputNode);
  inputNode.forEach((node)=>{
    Object.assign(searchBloglist,  {[node.name]: node.value})
  })
  
  return searchBloglist;

}

export const searchBloglistAct = (searchBloglist) => (dispatch) => {
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



export const clearSearchBloglistAct = (event) => {
  const selectedNode = event.target.parentNode.parentNode;
  const inputNode = selectedNode.querySelectorAll('div > input[name]');

  inputNode.forEach((node)=>{
    node.value="";
  })

  return { type: CLEAR_SEARCH_BLOGLIST };

}