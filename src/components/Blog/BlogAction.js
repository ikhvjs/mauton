import {
  REQUEST_BLOG_PENDING,
  REQUEST_BLOG_SUCCESS,
  REQUEST_BLOG_FAILED,
  REQUEST_BLOG_C_PENDING,
  REQUEST_BLOG_C_SUCCESS,
  REQUEST_BLOG_C_FAILED,
  REQUEST_BLOG_TAG_PENDING,
  REQUEST_BLOG_TAG_SUCCESS,
  REQUEST_BLOG_TAG_FAILED,
  REQUEST_BLOG_TAG_C_PENDING,
  REQUEST_BLOG_TAG_C_SUCCESS,
  REQUEST_BLOG_TAG_C_FAILED,
  SELECT_CREATE_BLOG,
  SELECT_CREATE_BLOG_C,
  CLICK_SAVE_BLOG,
  SELECT_UPDATE_BLOG_CATEGORY,
  CLEAR_BLOG_CATEGORY
 } from '../../constants';

import tinymce from 'tinymce/tinymce';

export const requestBlogAct = (blogPath) => (dispatch) =>{
  // console.log('normal blogPath',blogPath);
  dispatch({ type: REQUEST_BLOG_PENDING })
    fetch(`http://localhost:3001/blog/path/${blogPath}`, {
          method: 'get',
          headers: {'Content-Type': 'text/plain'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_BLOG_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_BLOG_FAILED, payload: error }))
};

export const requestBlogByClickAct = (blogPath) => (dispatch) =>{
  // console.log('BY click blogPath',blogPath);
  dispatch({ type: REQUEST_BLOG_C_PENDING })
    fetch(`http://localhost:3001/blog/path/${blogPath}`, {
          method: 'get',
          headers: {'Content-Type': 'text/plain'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_BLOG_C_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_BLOG_C_FAILED, payload: error }))
};

export const requestBlogTagAct =(blogPath)=>(dispatch)=>{
  dispatch({ type: REQUEST_BLOG_TAG_PENDING })
    fetch(`http://localhost:3001/blog/tag/path/${blogPath}`, {
          method: 'get',
          headers: {'Content-Type': 'text/plain'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_BLOG_TAG_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_BLOG_TAG_FAILED, payload: error }))
}

export const requestBlogTagByClickAct =(blogPath)=>(dispatch)=>{
  dispatch({ type: REQUEST_BLOG_TAG_C_PENDING })
    fetch(`http://localhost:3001/blog/tag/path/${blogPath}`, {
          method: 'get',
          headers: {'Content-Type': 'text/plain'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_BLOG_TAG_C_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_BLOG_TAG_C_FAILED, payload: error }))
}

export const selectCreateBlogByClickAct = ()  => {
  return ({type: SELECT_CREATE_BLOG_C})
}

export const selectCreateBlogAct =() => {
  return ({type: SELECT_CREATE_BLOG})
}

export const clickSaveBlogAct = (id) => {
  const editorContent = tinymce.get(`${id}`).getContent();
  return ({type:CLICK_SAVE_BLOG, payload:editorContent})
}

export const selectUpdateBlogCategoryAct = () =>{
  return { type: SELECT_UPDATE_BLOG_CATEGORY };
}

export const clearBlogCategoryAct = () =>{
  return ({ type:CLEAR_BLOG_CATEGORY });
}