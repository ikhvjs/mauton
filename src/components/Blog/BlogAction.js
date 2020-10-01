import {
  API_PORT,
  REQUEST_BLOG_PENDING,
  REQUEST_BLOG_SUCCESS,
  REQUEST_BLOG_FAILED,
  REQUEST_BLOG_C_PENDING,
  REQUEST_BLOG_C_SUCCESS,
  REQUEST_BLOG_C_FAILED,
  SELECT_CREATE_BLOG_C,
  SELECT_UPDATE_BLOG_CATEGORY,
  CLEAR_SELECT_BLOG_CATEGORY,
  SELECT_ADD_BLOG_TAG,
  DELETE_BLOG_TAG,
  CLEAR_SELECT_BLOG_TAG,
  POST_BLOG_PENDING,
  POST_BLOG_SUCCESS,
  POST_BLOG_FAILED,
  UPDATE_BLOG,
  EXIT_UPDATE_BLOG,
  CLEAR_CREATE_BLOG_FLAG,
  INIT_SELECTED_BLOG_TAG,
  INIT_SELECTED_BLOG_CATEGORY,
  INIT_UPDATE_BLOG_TITLE,
  INIT_UPDATE_BLOG_DESC,
  INIT_UPDATE_BLOG_PATH,
  INIT_UPDATE_BLOG_SEQ,
  ONCHANGE_BLOG_TITLE,
  ONCHANGE_BLOG_DESC,
  ONCHANGE_BLOG_PATH,
  ONCHANGE_BLOG_SEQ,
  UPDATE_BLOG_PENDING,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_FAILED,
  CLEAR_ONCHANGE_BLOG,
  DELETE_BLOG_PENDING,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAILED
 } from '../../constants';

import tinymce from 'tinymce/tinymce';

import { isTagArrayEqual } from '../../utility/utility';

export const requestBlogAct = (blogPath) => (dispatch) =>{
  // console.log('normal blogPath',blogPath);
  dispatch({ type: REQUEST_BLOG_PENDING })
    fetch(`${API_PORT}/blog/path/${blogPath}`, {
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
    fetch(`${API_PORT}/blog/path/${blogPath}`, {
          method: 'get',
          headers: {'Content-Type': 'text/plain'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_BLOG_C_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_BLOG_C_FAILED, payload: error }))
};

// export const requestBlogTagAct =(blogPath)=>(dispatch)=>{
//   dispatch({ type: REQUEST_BLOG_TAG_PENDING })
//     fetch(`http://localhost:3001/blog/tag/path/${blogPath}`, {
//           method: 'get',
//           headers: {'Content-Type': 'text/plain'}
//         })
//     .then(response => response.json())
//     .then(data => dispatch({ type: REQUEST_BLOG_TAG_SUCCESS, payload: data }))
//     .catch(error => dispatch({ type: REQUEST_BLOG_TAG_FAILED, payload: error }))
// }

// export const requestBlogTagByClickAct =(blogPath)=>(dispatch)=>{
//   dispatch({ type: REQUEST_BLOG_TAG_C_PENDING })
//     fetch(`http://localhost:3001/blog/tag/path/${blogPath}`, {
//           method: 'get',
//           headers: {'Content-Type': 'text/plain'}
//         })
//     .then(response => response.json())
//     .then(data => dispatch({ type: REQUEST_BLOG_TAG_C_SUCCESS, payload: data }))
//     .catch(error => dispatch({ type: REQUEST_BLOG_TAG_C_FAILED, payload: error }))
// }

export const selectCreateBlogByClickAct = ()  => {
  return ({type: SELECT_CREATE_BLOG_C})
}

// export const selectCreateBlogAct =() => {
//   return ({type: SELECT_CREATE_BLOG})
// }


export const selectUpdateBlogCategoryAct = () =>{
  return { type: SELECT_UPDATE_BLOG_CATEGORY };
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
  dispatch({ type: POST_BLOG_PENDING });
  
  const blogTitle     =  getState().blogRdc.onChangeBlogTitle;
  const blogDesc      =  getState().blogRdc.onChangeBlogDesc;
  const blogPath      =  getState().blogRdc.onChangeBlogPath;
  const blogSeq       =  getState().blogRdc.onChangeBlogSeq;
  const blogContent   =  tinymce.get('blogCreateEditor').getContent();
  const blogCategory  =  getState().blogRdc.selectedCategory;
  const blogTag       =  getState().blogRdc.selectedTag;


  // console.log('newBlog',newBlog);

  fetch(`${API_PORT}/blog/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
          blog_title:blogTitle,
          blog_desc: blogDesc,
          blog_path: blogPath,
          seq: Number(blogSeq),
          blog_content:blogContent,
          blog_category_id: Number(blogCategory.blog_category_id),
          tags:[...blogTag],
          menu_path:sidebarMenuPath
        })
      }
  )
  .then(response => response.json())
  .then(data => dispatch({ type: POST_BLOG_SUCCESS}))
  .catch(error => dispatch({ type: POST_BLOG_FAILED, payload: error }))

}

export const clickUpdateBlogAct=()=>(dispatch,getState)=>{

  const currentBlog = getState().blogRdc.blog[0];
  
  const currentBlogTitle      = currentBlog.blog_title;
  const currentBlogDesc       = currentBlog.blog_desc;
  const currentBlogPath       = currentBlog.blog_path;
  const currentBlogSeq        = currentBlog.seq;
  const currentBlogCategoryID = currentBlog.blog_category_id;
  const currentBlogTags       = currentBlog.tags;
  const currentBlogContent    = currentBlog.blog_content;

  const updateBlogTitle       = getState().blogRdc.updateBlogTitle;
  const updateBlogDesc        = getState().blogRdc.updateBlogDesc;
  const updateBlogPath        = getState().blogRdc.updateBlogPath;
  const updateBlogSeq         = getState().blogRdc.updateBlogSeq;
  const updateBlogCategoryID  = getState().blogRdc.selectedCategory.blog_category_id;
  const updateBlogTags        = getState().blogRdc.selectedTag;
  const updateBlogContent     = tinymce.get('blogUpdateEditor').getContent();

  let isBlogUpdated = false;

  const updateBlog = {};

  Object.assign(updateBlog, currentBlog);


  if (currentBlogTitle!==updateBlogTitle){
    isBlogUpdated = true;
    Object.assign(updateBlog,{blog_title:updateBlogTitle});
  }
  if (currentBlogDesc!==updateBlogDesc){
    isBlogUpdated = true;
    Object.assign(updateBlog,{blog_desc:updateBlogDesc});
  } 
  if (currentBlogPath!==updateBlogPath){
    isBlogUpdated = true;
    Object.assign(updateBlog,{blog_path:updateBlogPath});
  }
  if (Number(currentBlogSeq)!==Number(updateBlogSeq)){
    isBlogUpdated = true;
    Object.assign(updateBlog,{seq:updateBlogSeq});
  }
  if (Number(currentBlogCategoryID)!==Number(updateBlogCategoryID)){
    isBlogUpdated = true;
    Object.assign(updateBlog,{blog_category_id:updateBlogCategoryID});
  }
  if (!isTagArrayEqual(currentBlogTags,updateBlogTags)){
    isBlogUpdated = true;
    Object.assign(updateBlog,{tags:[...updateBlogTags]});
  }
  if (currentBlogContent!==updateBlogContent){
    isBlogUpdated = true;
    Object.assign(updateBlog,{blog_content:updateBlogContent});
  }

  // console.log('updateBlog',updateBlog);

  if(isBlogUpdated){
    dispatch({ type: UPDATE_BLOG_PENDING });
    fetch(`${API_PORT}/blog/update`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({updateBlog})
      }
    )
    .then(response => response.json())
    .then(data => dispatch({ type: UPDATE_BLOG_SUCCESS}))
    .catch(error => dispatch({ type: UPDATE_BLOG_FAILED, payload: error }))
    }


}


export const clearCreatedBlogAct = (event) => {
  return ({type:CLEAR_ONCHANGE_BLOG})
}


export const onChangeBlogTitleAct =(blogTitle)=>{
  // console.log('blogTitle',blogTitle);
  return ({type:ONCHANGE_BLOG_TITLE, payload:blogTitle})
}

export const onChangeBlogDescAct = (blogDesc)=>{
  return ({type:ONCHANGE_BLOG_DESC, payload:blogDesc})
}

export const onChangeBlogPathAct = (blogPath)=>{
  return ({type:ONCHANGE_BLOG_PATH, payload:blogPath})
}

export const onChangeBlogSeqAct = (blogSeq)=>{
  return ({type:ONCHANGE_BLOG_SEQ, payload:blogSeq})
}

export const initUpdateBlogTitleAct=()=>(dispatch,getState)=>{
  const currentBlogTitle = getState().blogRdc.blog[0].blog_title;
  dispatch({type:INIT_UPDATE_BLOG_TITLE, payload:currentBlogTitle});
}

export const initUpdateBlogDescAct=()=>(dispatch,getState)=>{
  const currentBlogDesc = getState().blogRdc.blog[0].blog_desc;
  dispatch({type:INIT_UPDATE_BLOG_DESC, payload:currentBlogDesc});
}

export const initUpdateBlogPathAct=()=>(dispatch,getState)=>{
  const currentBlogPath = getState().blogRdc.blog[0].blog_path;
  dispatch({type:INIT_UPDATE_BLOG_PATH, payload:currentBlogPath});
}

export const initUpdateBlogSeqAct=()=>(dispatch,getState)=>{
  const currentBlogSeq = getState().blogRdc.blog[0].seq;
  dispatch({type:INIT_UPDATE_BLOG_SEQ, payload:currentBlogSeq});
}

export const initSelectedBlogTagAct =()=>(dispatch,getState)=>{
  
  const currentTags = getState().blogRdc.blog[0].tags;
  const cloneTags = [...currentTags];
  // console.log('cloneTags', cloneTags);
  dispatch({type:INIT_SELECTED_BLOG_TAG, payload:cloneTags});
}

export const initSelectedBlogCategoryAct =()=>(dispatch,getState)=>{

  const currentCategoryName = getState().blogRdc.blog[0].blog_category_name;
  const currentCategoryID = getState().blogRdc.blog[0].blog_category_id;
  const currentCategory ={};
  Object.assign(currentCategory,
    {blog_category_id:currentCategoryID, blog_category_name:currentCategoryName});
  dispatch({type:INIT_SELECTED_BLOG_CATEGORY, payload:currentCategory});

}


export const updateBlogAct =()=>{
  return ({type:UPDATE_BLOG});
}

export const exitUpdateBlogAct=()=>{
  return({type:EXIT_UPDATE_BLOG});
}

export const clearCreateBlogFlagAct=()=>{
  return ({type:CLEAR_CREATE_BLOG_FLAG});
}

export const deleteBlogAct =()=>(dispatch,getState)=>{
  dispatch({ type: DELETE_BLOG_PENDING })

  const blogID = getState().blogRdc.blog[0].blog_id;
  
  fetch(`${API_PORT}/blog/delete`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
          blog_id: blogID
        })
      }
  )
  .then(response => response.json())
  .then(data => dispatch({ type: DELETE_BLOG_SUCCESS}))
  .catch(error => dispatch({ type: DELETE_BLOG_FAILED, payload: error }))
}
