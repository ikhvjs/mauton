import {
  REQUEST_BLOGLIST_PENDING,
  REQUEST_BLOGLIST_SUCCESS,
  REQUEST_BLOGLIST_FAILED,
  REQUEST_BLOGLIST_C_PENDING,
  REQUEST_BLOGLIST_C_SUCCESS,
  REQUEST_BLOGLIST_C_FAILED,
  REQUEST_BLOG_C_PENDING,
  REQUEST_BLOG_C_SUCCESS,
  REQUEST_BLOG_C_FAILED,
  SEARCH_BLOGLIST_PENDING,
  SEARCH_BLOGLIST_SUCCESS,
  SEARCH_BLOGLIST_FAILED
 } from '../../constants';


export const requestBloglistAct = (sidebarMenuPath) => (dispatch) =>{
  dispatch({ type: REQUEST_BLOGLIST_PENDING })
    fetch(`http://localhost:3001/bloglist/path/${sidebarMenuPath}`, {
          method: 'get',
          headers: {'Content-Type': 'text/plain'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_BLOGLIST_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_BLOGLIST_FAILED, payload: error }))
};


export const requestBlogByClickAct = (blogPath) => (dispatch) =>{
  dispatch({ type: REQUEST_BLOG_C_PENDING })
    fetch(`http://localhost:3001/blog/path/${blogPath}`, {
          method: 'get',
          headers: {'Content-Type': 'text/plain'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_BLOG_C_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_BLOG_C_FAILED, payload: error }))
};


export const requestBloglistByClickAct = (sidebarMenuPath) => (dispatch) =>{
  dispatch({ type: REQUEST_BLOGLIST_C_PENDING })
    fetch(`http://localhost:3001/bloglist/path/${sidebarMenuPath}`, {
          method: 'get',
          headers: {'Content-Type': 'text/plain'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_BLOGLIST_C_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_BLOGLIST_C_FAILED, payload: error }))
};


export const selectSearchBloglistAct = (event) => {
  const searchBloglist ={};
  const inputNode = event.target.parentNode.parentNode.querySelectorAll("div > input.form-control")
  console.log('selectSearchBloglistAct inputNode',inputNode);
  inputNode.forEach((node)=>{
    Object.assign(searchBloglist,  {[node.name]: node.value})
  })
  console.log('searchBloglist ',searchBloglist);
  return searchBloglist;

}

export const searchBloglistAct = (searchBloglist) => (dispatch) => {
  dispatch({ type: SEARCH_BLOGLIST_PENDING })
    fetch(`http://localhost:3001/bloglist/search`, {
        method: 'post',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
          blog_title: searchBloglist.blog_title,
          blog_category_name: searchBloglist.blog_category_name,
          blog_tag:searchBloglist.blog_tag
        })
      })
    .then(response => response.json())
    .then(data => dispatch({ type: SEARCH_BLOGLIST_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: SEARCH_BLOGLIST_FAILED, payload: error }))
}
