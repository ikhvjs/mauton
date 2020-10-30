import {
  API_PORT,
  REQUEST_TAG_PENDING,
  REQUEST_TAG_SUCCESS,
  REQUEST_TAG_FAILED,
  REQUEST_TAG_C_PENDING,
  REQUEST_TAG_C_SUCCESS,
  REQUEST_TAG_C_FAILED,
  POST_TAG_PENDING,
  POST_TAG_SUCCESS,
  POST_TAG_FAILED,
  DELETE_TAG_PENDING,
  DELETE_TAG_SUCCESS,
  DELETE_TAG_FAILED,
  SEARCH_TAG_PENDING,
  SEARCH_TAG_SUCCESS,
  SEARCH_TAG_FAILED,
  SELECT_UPDATE_TAG,
  UPDATE_TAG_PENDING,
  UPDATE_TAG_SUCCESS,
  UPDATE_TAG_FAILED ,
  CANCEL_UPDATE_TAG,
  CLEAR_SEARCH_TAG, 
  ONCHANGE_CREATE_TAG_NAME,
  ONCHANGE_CREATE_TAG_SEQ
 } from '../../constants';

export const requestTagAct = () => (dispatch,getState) => {
  dispatch({ type: REQUEST_TAG_PENDING })
  fetch(`${API_PORT}/tag/request`, {
          method: 'post',
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${getState().authRdc.token}`
                  },
          body: JSON.stringify({
            userID: getState().authRdc.userID
          })
  })
  .then(response => response.json())
  .then(data => dispatch({ type: REQUEST_TAG_SUCCESS, payload: data }))
  .catch(error => dispatch({ type: REQUEST_TAG_FAILED, payload: error }))
}

export const requestTagByClickAct = () => (dispatch,getState) => {
  dispatch({ type: REQUEST_TAG_C_PENDING })
  fetch(`${API_PORT}/tag/request`, {
          method: 'post',
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${getState().authRdc.token}`
                  },
          body: JSON.stringify({
            userID: getState().authRdc.userID
          })
  })
  .then(response => response.json())
  .then(data => dispatch({ type: REQUEST_TAG_C_SUCCESS, payload: data }))
  .catch(error => dispatch({ type: REQUEST_TAG_C_FAILED, payload: error }))
}

// export const selectCreateTagAct = (event) => {
//   const tag ={};
//   const childrenNode = event.target.parentNode.parentNode.querySelectorAll("td > input.form-control");
//   childrenNode.forEach((node)=>{
//     Object.assign(tag,  {[node.name]: node.value})
//     node.value = "";
//   })
  
//   return tag;
// }

export const postTagAct = (tag) => (dispatch,getState) =>{
  let resStatus = "";
  dispatch({ type: POST_TAG_PENDING });
  fetch(`${API_PORT}/tag/create`, {
        method: 'post',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${getState().authRdc.token}`},
        body: JSON.stringify({
          tag_name: getState().tagRdc.createTagName,
          seq: getState().tagRdc.createTagSeq,
          user_id:getState().authRdc.userID
        })
      }
  )
  .then(response => response.json())
  .then(res => {
    console.log('tag config res.status',res.status);
    resStatus = res.status
    return res.json()
  })
  .then(res => {
      switch (resStatus) {
          case 200:
              return dispatch({ type: POST_TAG_SUCCESS, payload:res})
          case 400:
              return dispatch({ type: POST_TAG_FAILED, payload: res.errMessage })
          case 500:
              return dispatch({ type: POST_TAG_FAILED, payload: res.errMessage })
          default:
              return dispatch({ type: POST_TAG_FAILED, payload: 'Exceptional Error, please try again' })
      }
  })
  .catch( 
    (error) =>{
      if (!error.response) {
        dispatch({ type: POST_TAG_FAILED, payload: 'Internal Server Error1, please try again' })
      } else {
        dispatch({ type: POST_TAG_FAILED, payload: 'Internal Server Error2, please try again' })
      }
    }
  )
  // .then(data => dispatch({ type: POST_TAG_SUCCESS }))
  // .catch(error => dispatch({ type: POST_TAG_FAILED, payload: error }))

}

export const selectDeleteTagAct = (event) => {
  return event.target.parentNode.parentNode.id;
}

export const deleteTagAct = (tagID) => (dispatch) =>{
  dispatch({ type: DELETE_TAG_PENDING })
  fetch(`${API_PORT}/tag/delete`, {
        method: 'delete',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
          tag_id: tagID
        })
      }
  )
  .then(response => response.json())
  .then(data => dispatch({ type: DELETE_TAG_SUCCESS}))
  .catch(error => dispatch({ type: DELETE_TAG_FAILED, payload: error }))
}


export const selectSearchTagAct = (event) => {
  const tag ={};
  const childrenNode = event.target.parentNode.parentNode.querySelectorAll("div > input.form-control");
  // console.log('selectSearchCategoryAct childrenNode',childrenNode);
  childrenNode.forEach((node)=>{
    Object.assign(tag,  {[node.name]: node.value})
  })
  // console.log('selectSearchCategoryAct category',category);
  return tag;

}

export const searchTagAct = (tag) => (dispatch) =>{
  dispatch({ type: SEARCH_TAG_PENDING })
  fetch(`${API_PORT}/tag/search`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
          tag_name: tag.tag_name
        })
      }
  )
  .then(response => response.json())
  .then(data => dispatch({ type: SEARCH_TAG_SUCCESS, payload: data}))
  .catch(error => dispatch({ type: SEARCH_TAG_FAILED, payload: error }))
}


const toggleDisplayTagButton = (selectedNode) => {

  const searchNode = selectedNode.parentNode.parentNode.parentNode.querySelectorAll('div.form-row > div[name="button"]');

   //toggle the display of search Tag Button 
  searchNode.forEach((node)=>{
    let searchButtonNode = node.querySelector('button');
    searchButtonNode.classList.contains('hidden-button')?
      searchButtonNode.classList.remove('hidden-button'):
      searchButtonNode.classList.add('hidden-button');
  })

  const selectedTagID = selectedNode.id;
  const notSelectedNodes =  selectedNode.parentNode
    .querySelectorAll(`tr[id]:not([id=${CSS.escape(selectedTagID)}])`);
  // console.log('beforeUpdateCategoryAct notSelectedNodes',notSelectedNodes);

  const createTagInputNode = selectedNode.parentNode
    .querySelector('tr[id="newTag"]').querySelectorAll('td > input');

  const selectedButtonNodes = selectedNode.querySelector("td[headers]").querySelectorAll('button[name]');
  // console.log('beforeUpdateCategoryAct selectedButtonNodes',selectedButtonNodes);

  //toggle the display of input of create Tag record 
  createTagInputNode.forEach((node)=>{
    node.disabled ? (node.disabled = false) : (node.disabled = true);
  })


//toggle all the non-selected node 
  notSelectedNodes.forEach((notSelectedNode)=>{
    let buttonNodes = notSelectedNode.querySelectorAll('button[name]');
    buttonNodes.forEach((buttonNode)=>{
      ( buttonNode.classList.contains('hidden-button')
          && (buttonNode.getAttribute('name')!=="save") 
            && (buttonNode.getAttribute('name')!=="cancel")
      )? 
        buttonNode.classList.remove('hidden-button'):
        buttonNode.classList.add('hidden-button');


    })
  });

//Toggle'Save to change', 'Update' and 'Delete' button of the selected Node
  selectedButtonNodes.forEach((node)=>{
    node.classList.contains('hidden-button')? 
      node.classList.remove('hidden-button'):
      node.classList.add('hidden-button')
  });

}



export const beforeUpdateTagAct = (event) => {
  const beforeUpdateTag ={};

  //declare a input field
  const inputTag = document.createElement("input");
  inputTag.classList.add("form-control");
  inputTag.classList.add("form-control-sm");


  const selectedNode = event.target.parentNode.parentNode;
  const selectedTagID = selectedNode.id;
  Object.assign(beforeUpdateTag,  {"blog_category_id": selectedTagID});
  // console.log('beforeUpdateCategoryAct selectedCategoryID',selectedCategoryID);

  const tdNode = selectedNode.querySelectorAll("td[name]");
  // console.log('beforeUpdateCategoryAct tdNode',tdNode);

  
  
  //Add inline edit when click 'Update' Button
  tdNode.forEach((node)=>{
    let nodeValue = node.innerHTML;
    let nodeAttribute = node.getAttribute('name');
    let inputTagClone = inputTag.cloneNode(false);

    inputTagClone.setAttribute('name', nodeAttribute);
    inputTagClone.value = nodeValue;
    node.innerHTML="";
    node.appendChild(inputTagClone);
    Object.assign(beforeUpdateTag,  {[nodeAttribute]: nodeValue})
  })

  toggleDisplayTagButton(selectedNode);

  // console.log('beforeUpdateCategoryAct beforeUpdateCategory',beforeUpdateCategory);
  return {type: SELECT_UPDATE_TAG, payload: beforeUpdateTag };

}


export const afterUpdateTagAct = (event) =>{
  const afterUpdateTag ={};
  const selectedNode=event.target.parentNode.parentNode;
  const TagID=selectedNode.id;

  Object.assign(afterUpdateTag,  {"tag_id": TagID});
  // console.log('afterUpdateCategoryAct categoryID',categoryID);

  const tdNode = selectedNode.querySelectorAll("td[name]");
  // console.log('afterUpdateCategoryAct tdNode',tdNode);

  tdNode.forEach((node)=>{
    let inputNode = node.querySelector("input");
    let nodeValue = inputNode.value;
    let nodeAttribute = inputNode.getAttribute('name');
    Object.assign(afterUpdateTag,  {[nodeAttribute]: nodeValue})

    node.removeChild(inputNode);
    node.innerHTML = nodeValue;

  });

  toggleDisplayTagButton(selectedNode);

  
  // console.log('afterUpdateCategoryAct afterUpdateCategory',afterUpdateCategory);
  return afterUpdateTag;

}

export const updateCancelTagAct =(event) => {
  const selectedNode = event.target.parentNode.parentNode;

  const tdNode = selectedNode.querySelectorAll("td[name]");

  tdNode.forEach((node)=>{
    let inputNode = node.querySelector("input");
    let nodeValue = inputNode.value;

    node.removeChild(inputNode);
    node.innerHTML = nodeValue;

  });

  toggleDisplayTagButton(selectedNode);

  return ({ type: CANCEL_UPDATE_TAG });
}


export const updateTagAct = (afterUpdateTag)  => (dispatch, getState) =>{
  const {beforeUpdateTag} = getState().tagRdc;

  if (JSON.stringify(afterUpdateTag) !==
    JSON.stringify(beforeUpdateTag)) {
    dispatch({ type: UPDATE_TAG_PENDING })
    fetch(`${API_PORT}/tag/update`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json'},
          body: JSON.stringify({
            tag_id:afterUpdateTag.tag_id,
            tag_name: afterUpdateTag.tag_name,
            seq:afterUpdateTag.seq
          })
        }
    )
    .then(response => response.json())
    .then(data => dispatch({ type: UPDATE_TAG_SUCCESS, payload: data}))
    .catch(error => dispatch({ type: UPDATE_TAG_FAILED, payload: error }))
  }

}

export const clearSearchTagAct = (event) => {
  const selectedNode = event.target.parentNode.parentNode;
  const inputNode = selectedNode.querySelectorAll('div > input[name]');

  inputNode.forEach((node)=>{
    node.value="";
  })

  return { type: CLEAR_SEARCH_TAG };

}

const checkTagName = (tagName) => {
  if (!tagName){
    return {isValid:false, errorMsg: `Please enter tag name`}
  }else if (tagName.length > 20){
    return {isValid:false, errorMsg: `Tag name cannot be more than 20 characters`}
  }

  return {isValid:true};
}

export const onchangeCreateTagNameAct = (event) => {
  const tagName = event.target.value;
  const result = checkTagName(tagName);
  if (!result.isValid){
    return { type: ONCHANGE_CREATE_TAG_NAME, payload: {tagName:tagName,isValid:false, errorMsg:result.errorMsg}};
  }
  return { type: ONCHANGE_CREATE_TAG_NAME, payload: {tagName:tagName,isValid:true}};
}


const checkTagSeq = (tagSeq) => {
  if (!tagSeq){
    return {isValid:false, errorMsg: `Please enter seq`}
  }else if (isNaN(Number(tagSeq))){
    return {isValid:false, errorMsg: `Seq must be a number`}
  }

  return {isValid:true};
}

export const onchangeCreateTagSeqAct = (event) => {
  const tagSeq = event.target.value;
  const result = checkTagSeq(tagSeq);
  if (!result.isValid){
    return { type: ONCHANGE_CREATE_TAG_SEQ, payload: {tagSeq:tagSeq,isValid:false, errorMsg:result.errorMsg}};
  }
  return { type: ONCHANGE_CREATE_TAG_SEQ, payload: {tagSeq:tagSeq,isValid:true}};
}