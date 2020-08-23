import {
  REQUEST_CATEGORY_PENDING,
  REQUEST_CATEGORY_SUCCESS,
  REQUEST_CATEGORY_FAILED,
  REQUEST_CATEGORY_C_PENDING,
  REQUEST_CATEGORY_C_SUCCESS,
  REQUEST_CATEGORY_C_FAILED,
  POST_CATEGORY_PENDING,
  POST_CATEGORY_SUCCESS,
  POST_CATEGORY_FAILED,
  DELETE_CATEGORY_PENDING,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILED,
  SEARCH_CATEGORY_PENDING,
  SEARCH_CATEGORY_SUCCESS,
  SEARCH_CATEGORY_FAILED,
  SELECT_UPDATE_CATEGORY,
  UPDATE_CATEGORY_PENDING,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILED ,
  CANCEL_UPDATE_CATEGORY,
  CLEAR_SEARCH_CATEGORY 
 } from '../../constants';

export const requestCategoryAct = () => (dispatch) => {
  dispatch({ type: REQUEST_CATEGORY_PENDING })
  fetch('http://localhost:3001/category/get', {
          method: 'get',
          headers: {'Content-Type': 'text/plain'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_CATEGORY_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_CATEGORY_FAILED, payload: error }))
}

export const requestCategoryByClickAct = () => (dispatch) => {
  dispatch({ type: REQUEST_CATEGORY_C_PENDING })
  fetch('http://localhost:3001/category/get', {
          method: 'get',
          headers: {'Content-Type': 'text/plain'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_CATEGORY_C_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_CATEGORY_C_FAILED, payload: error }))
}

export const selectCreateCategoryAct = (event) => {
  const category ={};
  const childrenNode = event.target.parentNode.parentNode.querySelectorAll("td > input.form-control");
  childrenNode.forEach((node)=>{
    Object.assign(category,  {[node.name]: node.value})
    node.value = "";
  })
  
  return category;
}

export const postCategoryAct = (category) => (dispatch) =>{
  dispatch({ type: POST_CATEGORY_PENDING })
  fetch('http://localhost:3001/category/create', {
        method: 'post',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
          blog_category_name: category.blog_category_name,
          blog_category_desc: category.blog_category_desc,
          seq:category.seq
        })
      }
  )
  .then(response => response.json())
  .then(data => dispatch({ type: POST_CATEGORY_SUCCESS, payload:data }))
  .catch(error => dispatch({ type: POST_CATEGORY_FAILED, payload: error }))

}

export const selectDeleteCategoryAct = (event) => {
  return event.target.parentNode.parentNode.id;
}

export const deleteCategoryAct = (categoryID) => (dispatch) =>{
  dispatch({ type: DELETE_CATEGORY_PENDING })
  fetch('http://localhost:3001/category/delete', {
        method: 'delete',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
          blog_category_id: categoryID
        })
      }
  )
  .then(response => response.json())
  .then(data => dispatch({ type: DELETE_CATEGORY_SUCCESS}))
  .catch(error => dispatch({ type: DELETE_CATEGORY_FAILED, payload: error }))
}


export const selectSearchCategoryAct = (event) => {
  const category ={};
  const childrenNode = event.target.parentNode.parentNode.querySelectorAll("div > input.form-control");
  // console.log('selectSearchCategoryAct childrenNode',childrenNode);
  childrenNode.forEach((node)=>{
    Object.assign(category,  {[node.name]: node.value})
  })
  // console.log('selectSearchCategoryAct category',category);
  return category;

}

export const searchCategoryAct = (category) => (dispatch) =>{
  dispatch({ type: SEARCH_CATEGORY_PENDING })
  fetch('http://localhost:3001/category/search', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
          blog_category_name: category.blog_category_name,
          blog_category_desc: category.blog_category_desc
        })
      }
  )
  .then(response => response.json())
  .then(data => dispatch({ type: SEARCH_CATEGORY_SUCCESS, payload: data}))
  .catch(error => dispatch({ type: SEARCH_CATEGORY_FAILED, payload: error }))
}


const toggleDisplayButton = (selectedNode) => {

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



export const beforeUpdateCategoryAct = (event) => {
  const beforeUpdateCategory ={};

  //declare a input field
  const inputTag = document.createElement("input");
  inputTag.classList.add("form-control");
  inputTag.classList.add("form-control-sm");


  const selectedNode = event.target.parentNode.parentNode;
  const selectedCategoryID = selectedNode.id;
  Object.assign(beforeUpdateCategory,  {"blog_category_id": selectedCategoryID});
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
    Object.assign(beforeUpdateCategory,  {[nodeAttribute]: nodeValue})
  })

  toggleDisplayButton(selectedNode);

  // console.log('beforeUpdateCategoryAct beforeUpdateCategory',beforeUpdateCategory);
  return {type: SELECT_UPDATE_CATEGORY, payload: beforeUpdateCategory };

}


export const afterUpdateCategoryAct = (event) =>{
  const afterUpdateCategory ={};
  const selectedNode=event.target.parentNode.parentNode;
  const categoryID=selectedNode.id;

  Object.assign(afterUpdateCategory,  {"blog_category_id": categoryID});
  // console.log('afterUpdateCategoryAct categoryID',categoryID);

  const tdNode = selectedNode.querySelectorAll("td[name]");
  // console.log('afterUpdateCategoryAct tdNode',tdNode);

  tdNode.forEach((node)=>{
    let inputNode = node.querySelector("input");
    let nodeValue = inputNode.value;
    let nodeAttribute = inputNode.getAttribute('name');
    Object.assign(afterUpdateCategory,  {[nodeAttribute]: nodeValue})

    node.removeChild(inputNode);
    node.innerHTML = nodeValue;

  });

  toggleDisplayButton(selectedNode);

  
  // console.log('afterUpdateCategoryAct afterUpdateCategory',afterUpdateCategory);
  return afterUpdateCategory;

}

export const updateCancelCategoryAct =(event) => {
  const selectedNode = event.target.parentNode.parentNode;

  const tdNode = selectedNode.querySelectorAll("td[name]");

  tdNode.forEach((node)=>{
    let inputNode = node.querySelector("input");
    let nodeValue = inputNode.value;

    node.removeChild(inputNode);
    node.innerHTML = nodeValue;

  });

  toggleDisplayButton(selectedNode);

  return ({ type: CANCEL_UPDATE_CATEGORY });
}


export const updateCategoryAct = (afterUpdateCategory)  => (dispatch, getState) =>{
  let isChangeNeeded = false;
  const {beforeUpdateCategory} = getState().categoryRdc;
  if (JSON.stringify(afterUpdateCategory) ===
    JSON.stringify(beforeUpdateCategory)){
    console.log('Same value, no changes updated');
  } else{
    isChangeNeeded = true;
  }
  if (isChangeNeeded === true) {
    dispatch({ type: UPDATE_CATEGORY_PENDING })
    fetch('http://localhost:3001/category/update', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json'},
          body: JSON.stringify({
            blog_category_id:afterUpdateCategory.blog_category_id,
            blog_category_name: afterUpdateCategory.blog_category_name,
            blog_category_desc: afterUpdateCategory.blog_category_desc,
            seq:afterUpdateCategory.seq
          })
        }
    )
    .then(response => response.json())
    .then(data => dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data}))
    .catch(error => dispatch({ type: UPDATE_CATEGORY_FAILED, payload: error }))
  }

}

export const clearSearchCategoryAct = (event) => {
  const selectedNode = event.target.parentNode.parentNode;
  const inputNode = selectedNode.querySelectorAll('div > input[name]');

  inputNode.forEach((node)=>{
    node.value="";
  })

  return { type: CLEAR_SEARCH_CATEGORY };

}

