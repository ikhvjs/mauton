import {
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
  CLEAR_SEARCH_TAG 
 } from '../../constants';

export const requestTagAct = () => (dispatch) => {
  dispatch({ type: REQUEST_TAG_PENDING })
  fetch('http://localhost:3001/tag/get', {
          method: 'get',
          headers: {'Content-Type': 'text/plain'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_TAG_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_TAG_FAILED, payload: error }))
}

export const requestTagByClickAct = () => (dispatch) => {
  dispatch({ type: REQUEST_TAG_C_PENDING })
  fetch('http://localhost:3001/tag/get', {
          method: 'get',
          headers: {'Content-Type': 'text/plain'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_TAG_C_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_TAG_C_FAILED, payload: error }))
}

export const selectCreateTagAct = (event) => {
  const tag ={};
  const childrenNode = event.target.parentNode.parentNode.querySelectorAll("td > input.form-control");
  childrenNode.forEach((node)=>{
    Object.assign(tag,  {[node.name]: node.value})
    node.value = "";
  })
  
  return tag;
}

export const postTagAct = (tag) => (dispatch) =>{
  dispatch({ type: POST_TAG_PENDING })
  fetch('http://localhost:3001/tag/create', {
        method: 'post',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
          tag_name: tag.tag_name,
          seq:tag.seq
        })
      }
  )
  .then(response => response.json())
  .then(data => dispatch({ type: POST_TAG_SUCCESS }))
  .catch(error => dispatch({ type: POST_TAG_FAILED, payload: error }))

}

export const selectDeleteTagAct = (event) => {
  return event.target.parentNode.parentNode.id;
}

export const deleteTagAct = (tagID) => (dispatch) =>{
  dispatch({ type: DELETE_TAG_PENDING })
  fetch('http://localhost:3001/tag/delete', {
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
  fetch('http://localhost:3001/tag/search', {
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


const toggleDisplayButton = (selectedNode) => {

  const searchNode = selectedNode.parentNode.parentNode.parentNode.querySelectorAll('div.form-row > div[name="button"]');

   //toggle the display of search Category Button 
  searchNode.forEach((node)=>{
    let searchButtonNode = node.querySelector('button');
    searchButtonNode.classList.contains('hidden-button')?
      searchButtonNode.classList.remove('hidden-button'):
      searchButtonNode.classList.add('hidden-button');
  })

  const selectedCategoryID = selectedNode.id;
  const notSelectedNodes =  selectedNode.parentNode
    .querySelectorAll(`tr[id]:not([id=${CSS.escape(selectedCategoryID)}])`);
  // console.log('beforeUpdateCategoryAct notSelectedNodes',notSelectedNodes);

  const createCategoryInputNode = selectedNode.parentNode
    .querySelector('tr[id="new"]').querySelectorAll('td > input');

  const selectedButtonNodes = selectedNode.querySelector("td[headers]").querySelectorAll('button[name]');
  // console.log('beforeUpdateCategoryAct selectedButtonNodes',selectedButtonNodes);

  //toggle the display of input of create Category record 
  createCategoryInputNode.forEach((node)=>{
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

  toggleDisplayButton(selectedNode);

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

  toggleDisplayButton(selectedNode);

  
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

  toggleDisplayButton(selectedNode);

  return ({ type: CANCEL_UPDATE_TAG });
}


export const updateTagAct = (afterUpdateTag)  => (dispatch, getState) =>{
  const {beforeUpdateTag} = getState().tagRdc;

  if (JSON.stringify(afterUpdateTag) !==
    JSON.stringify(beforeUpdateTag)) {
    dispatch({ type: UPDATE_TAG_PENDING })
    fetch('http://localhost:3001/tag/update', {
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

