import {
  REQUEST_BLOGLIST_PENDING,
  REQUEST_BLOGLIST_SUCCESS,
  REQUEST_BLOGLIST_FAILED,
  REQUEST_BLOGLIST_C_PENDING,
  REQUEST_BLOGLIST_C_SUCCESS,
  REQUEST_BLOGLIST_C_FAILED
 } from '../../constants';


export const requestBloglistAct = (sidebarMenuPath) => (dispatch) =>{
  dispatch({ type: REQUEST_BLOGLIST_PENDING })
    fetch(`http://localhost:3001/bloglist/path/${sidebarMenuPath}`, {
          method: 'get',
          headers: {'Content-Type': 'application/json'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_BLOGLIST_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_BLOGLIST_FAILED, payload: error }))
};

export const requestBloglistByClickAct = (sidebarMenuPath) => (dispatch) =>{
  console.log('sidebarMenuPath', sidebarMenuPath);
  dispatch({ type: REQUEST_BLOGLIST_C_PENDING })
    fetch(`http://localhost:3001/bloglist/path/${sidebarMenuPath}`, {
          method: 'get',
          headers: {'Content-Type': 'application/json'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_BLOGLIST_C_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_BLOGLIST_C_FAILED, payload: error }))
};