import {
  REQUEST_BLOG_PENDING,
  REQUEST_BLOG_SUCCESS,
  REQUEST_BLOG_FAILED,
  REQUEST_BLOG_C_PENDING,
  REQUEST_BLOG_C_SUCCESS,
  REQUEST_BLOG_C_FAILED,
  // REQUEST_BLOG_TAG_PENDING,
  // REQUEST_BLOG_TAG_SUCCESS,
  // REQUEST_BLOG_TAG_FAILED,
  // REQUEST_BLOG_TAG_C_PENDING,
  // REQUEST_BLOG_TAG_C_SUCCESS,
  // REQUEST_BLOG_TAG_C_FAILED,
  // SELECT_CREATE_BLOG,
  SELECT_CREATE_BLOG_C,
  SELECT_UPDATE_BLOG_CATEGORY,
  CLEAR_BLOG_CATEGORY,
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
  ONCHANGE_UPDATE_BLOG_TITLE,
  ONCHANGE_UPDATE_BLOG_DESC,
  INIT_UPDATE_BLOG_TITLE,
  INIT_UPDATE_BLOG_DESC,
  INIT_UPDATE_BLOG_PATH,
  INIT_UPDATE_BLOG_SEQ,
  ONCHANGE_UPDATE_BLOG_PATH,
  ONCHANGE_UPDATE_BLOG_SEQ,
  UPDATE_BLOG_PENDING,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_FAILED
 } from '../../constants';

import tinymce from 'tinymce/tinymce';

import { isTagArrayEqual } from '../../utility/utility';

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
  dispatch({ type: POST_BLOG_PENDING });
  const newBlog = {};

  const formNode = event.target.parentNode;
  const inputNode = formNode.querySelectorAll('div > input');

  const blogCategory = getState().blogRdc.selectedCategory;
  const blogTag = getState().blogRdc.selectedTag;

  Object.assign(newBlog, blogCategory);
  Object.assign(newBlog, {tags:[...blogTag]});
  Object.assign(newBlog, {menu_path:sidebarMenuPath});

  

  inputNode.forEach((node)=>{
    const nodeAttribute = node.getAttribute('name');
    if (nodeAttribute!=='blog_category_name'){
      Object.assign(newBlog,{[nodeAttribute]:node.value});
    }
  })

  const blogContent = tinymce.get('blogCreateEditor').getContent();

  Object.assign(newBlog,{blog_content:blogContent})

  console.log('newBlog',newBlog);

  fetch('http://localhost:3001/blog/create', {
        method: 'post',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({newBlog})
      }
  )
  .then(response => response.json())
  .then(data => dispatch({ type: POST_BLOG_SUCCESS}))
  .catch(error => dispatch({ type: POST_BLOG_FAILED, payload: error }))

}

export const clickUpdateBlogAct=()=>(dispatch,getState)=>{
  

  const currentBlogTitle = getState().blogRdc.blog[0].blog_title;
  const currentBlogDesc = getState().blogRdc.blog[0].blog_desc;
  const currentBlogPath = getState().blogRdc.blog[0].blog_path;
  const currentBlogSeq = getState().blogRdc.blog[0].seq;
  const currentBlogCategoryID = getState().blogRdc.blog[0].blog_category_id;
  const currentBlogTags = getState().blogRdc.blog[0].tags;
  const currentBlogContent = getState().blogRdc.blog[0].blog_content;

  const updateBlogTitle = getState().blogRdc.updateBlogTitle;
  const updateBlogDesc = getState().blogRdc.updateBlogDesc;
  const updateBlogPath = getState().blogRdc.updateBlogPath;
  const updateBlogSeq = getState().blogRdc.updateBlogSeq;
  const updateBlogCategoryID = getState().blogRdc.selectedCategory.blog_category_id;
  const updateBlogTags = getState().blogRdc.selectedTag;
  const updateBlogContent = tinymce.get('blogUpdateEditor').getContent();

  let isBlogUpdated = false;


  if (currentBlogTitle!==updateBlogTitle){
    // console.log('currentBlogTitle',currentBlogTitle);
    // console.log('updateBlogTitle',updateBlogTitle);
    isBlogUpdated = true;
  }else if (currentBlogDesc!==updateBlogDesc){
    // console.log('currentBlogDesc',currentBlogDesc);
    // console.log('updateBlogDesc',updateBlogDesc);
    isBlogUpdated = true;
  }else if (currentBlogPath!==updateBlogPath){
    // console.log('currentBlogPath',currentBlogPath);
    // console.log('updateBlogPath',updateBlogPath);
    isBlogUpdated = true;
  }else if (Number(currentBlogSeq)!==Number(updateBlogSeq)){
    // console.log('currentBlogSeq',currentBlogSeq);
    // console.log('updateBlogSeq',updateBlogSeq);
    isBlogUpdated = true;
  }else if (Number(currentBlogCategoryID)!==Number(updateBlogCategoryID)){
    // console.log('currentBlogCategoryID',currentBlogCategoryID);
    // console.log('updateBlogCategoryID',updateBlogCategoryID);
    isBlogUpdated = true;
  }else if (!isTagArrayEqual(currentBlogTags,updateBlogTags)){
    // console.log('currentBlogTags',currentBlogTags);
    // console.log('updateBlogTags',updateBlogTags);

    isBlogUpdated = true;
  }else if (currentBlogContent!==updateBlogContent){
    isBlogUpdated = true;
  }


  if(isBlogUpdated){
    dispatch({ type: UPDATE_BLOG_PENDING });
    fetch('http://localhost:3001/blog/update', {
        method: 'put',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
          blog_title:updateBlogTitle,
          blog_desc:updateBlogDesc,
          blog_path:updateBlogPath,
          blog_category_id:updateBlogCategoryID,
          seq:updateBlogSeq,
          blog_content:updateBlogContent
        })
      }
    )
    .then(response => response.json())
    .then(data => dispatch({ type: UPDATE_BLOG_SUCCESS}))
    .catch(error => dispatch({ type: UPDATE_BLOG_FAILED, payload: error }))
    }

}



export const onChangeUpdateBlogTitleAct =(blogTitle)=>{
  // console.log('blogTitle',blogTitle);
  return ({type:ONCHANGE_UPDATE_BLOG_TITLE, payload:blogTitle})
}

export const onChangeUpdateBlogDescAct = (blogDesc)=>{
  return ({type:ONCHANGE_UPDATE_BLOG_DESC, payload:blogDesc})
}

export const onChangeUpdateBlogPathAct = (blogPath)=>{
  return ({type:ONCHANGE_UPDATE_BLOG_PATH, payload:blogPath})
}

export const onChangeUpdateBlogSeqAct = (blogSeq)=>{
  return ({type:ONCHANGE_UPDATE_BLOG_SEQ, payload:blogSeq})
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