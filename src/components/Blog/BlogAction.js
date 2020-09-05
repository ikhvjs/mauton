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
  // CLICK_SAVE_BLOG,
  SELECT_UPDATE_BLOG_CATEGORY,
  CLEAR_BLOG_CATEGORY,
  CLEAR_SELECT_BLOG_CATEGORY,
  SELECT_ADD_BLOG_TAG,
  DELETE_BLOG_TAG,
  CLEAR_SELECT_BLOG_TAG,
  POST_BLOG_PENDING,
  POST_BLOG_SUCCESS,
  POST_BLOG_FAILED
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


export const selectUpdateBlogCategoryAct = () =>{
  return { type: SELECT_UPDATE_BLOG_CATEGORY };
}

export const clearBlogCategoryAct = () =>{
  return ({ type:CLEAR_BLOG_CATEGORY });
}


export const clearSelectedBlogCategoryAct = () =>{
  return ({ type:CLEAR_SELECT_BLOG_CATEGORY });
}

export const selectAddBlogTagAct = () => {
  return { type: SELECT_ADD_BLOG_TAG };
}

export const deleteBlogTagAct = (event) =>(dispatch,getState)=> {

  const selectedIndex = event.target.parentNode.title;
  const currentSelectedTag = getState().blogRdc.selectedTag;
  const cloneTag = [...currentSelectedTag];
  cloneTag.splice(selectedIndex, 1);

  dispatch ({type: DELETE_BLOG_TAG, payload:cloneTag});
}

export const clearSelectedBlogTagAct = () =>{
  return ({ type:CLEAR_SELECT_BLOG_TAG });
}



export const clickSaveBlogAct = (event,sidebarMenuPath) => (dispatch,getState) =>{
  dispatch({ type: POST_BLOG_PENDING })
  const newBlog = {tag:[]};

  const formNode = event.target.parentNode;
  const inputNode = formNode.querySelectorAll('div > input');

  const blogCategory = getState().blogRdc.selectedCategory;
  const blogTag = getState().blogRdc.selectedTag;

  Object.assign(newBlog, blogCategory);
  Object.assign(newBlog.tag, blogTag);
  

  inputNode.forEach((node)=>{
    const nodeAttribute = node.getAttribute('name');
    if (nodeAttribute!=='blog_category_name'){
      Object.assign(newBlog,{[nodeAttribute]:node.value});
    }
  })


  console.log('newBlog',newBlog);

  const blogContent = tinymce.get('blogeditor').getContent();

  fetch('http://localhost:3001/blog/create', {
        method: 'post',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
          blogContent: blogContent
        })
      }
  )
  .then(response => response.json())
  .then(data => dispatch({ type: POST_BLOG_SUCCESS }))
  .catch(error => dispatch({ type: POST_BLOG_FAILED, payload: error }))

}