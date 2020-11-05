import {
  API_PORT,
  //request category
  REQUEST_CATEGORY_PENDING,
  REQUEST_CATEGORY_SUCCESS,
  REQUEST_CATEGORY_FAILED,
  REQUEST_CATEGORY_C_PENDING,
  REQUEST_CATEGORY_C_SUCCESS,
  REQUEST_CATEGORY_C_FAILED,
  //search category
  SEARCH_CATEGORY_PENDING,
  SEARCH_CATEGORY_SUCCESS,
  SEARCH_CATEGORY_FAILED,
  CLEAR_SEARCH_CATEGORY,
  ONCHANGE_SEARCH_CATEGORY_NAME,
  ONCHANGE_SEARCH_CATEGORY_DESC,
  //create category
  POST_CATEGORY_PENDING,
  POST_CATEGORY_SUCCESS,
  POST_CATEGORY_FAILED,
  SELECT_CREATE_CATEGORY,


  DELETE_CATEGORY_PENDING,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILED,

  SELECT_UPDATE_CATEGORY,
  UPDATE_CATEGORY_PENDING,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILED ,
  CANCEL_UPDATE_CATEGORY
   
 } from '../../constants';

export const requestCategoryAct = () => (dispatch,getState) => {
  let resStatus;
  dispatch({ type: REQUEST_CATEGORY_PENDING })
  fetch(`${API_PORT}/category/request`, {
          method: 'post',
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${getState().authRdc.token}`
                  },
          body: JSON.stringify({
            userID: getState().authRdc.userID
          })
        })
  .then(res => {
    resStatus = res.status
    return res.json()
  })
  .then(res => {
      switch (resStatus) {
          case 200:
              return dispatch({ type: REQUEST_CATEGORY_SUCCESS, payload: res})
          // case 400:
          //     return dispatch({ type: REQUEST_TAG_C_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
          case 500:
              return dispatch({ type: REQUEST_CATEGORY_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
          default:
              return dispatch({ type: REQUEST_CATEGORY_FAILED, payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:CATEGORY-REQUEST-1), please try again'} })
      }
  })
  .catch( 
    () =>dispatch({ type: REQUEST_CATEGORY_FAILED, 
      payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:CATEGORY-REQUEST-2), please try again'} })
  )
}
//     .then(response => response.json())
//     .then(data => dispatch({ type: REQUEST_CATEGORY_SUCCESS, payload: data }))
//     .catch(error => dispatch({ type: REQUEST_CATEGORY_FAILED, payload: error }))
// }

export const requestCategoryByClickAct = () => (dispatch,getState) => {
  let resStatus;
  dispatch({ type: REQUEST_CATEGORY_C_PENDING })
  fetch(`${API_PORT}/category/request`, {
          method: 'post',
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${getState().authRdc.token}`
                  },
          body: JSON.stringify({
            userID: getState().authRdc.userID
          })
    })
    .then(res => {
      resStatus = res.status
      return res.json()
    })
    .then(res => {
        switch (resStatus) {
            case 200:
                return dispatch({ type: REQUEST_CATEGORY_C_SUCCESS, payload: res})
            // case 400:
            //     return dispatch({ type: REQUEST_TAG_C_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
            case 500:
                return dispatch({ type: REQUEST_CATEGORY_C_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
            default:
                return dispatch({ type: REQUEST_CATEGORY_C_FAILED, payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:CATEGORY-REQUEST-1), please try again'} })
        }
    })
    .catch( 
      () =>dispatch({ type: REQUEST_CATEGORY_C_FAILED, 
        payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:CATEGORY-REQUEST-2), please try again'} })
    )
    // .then(response => response.json())
    // .then(data => dispatch({ type: REQUEST_CATEGORY_C_SUCCESS, payload: data }))
    // .catch(error => dispatch({ type: REQUEST_CATEGORY_C_FAILED, payload: error }))
}

export const selectCreateCategoryAct = () => {
  return {type:SELECT_CREATE_CATEGORY}
}

export const postCategoryAct = (category) => (dispatch) =>{
  dispatch({ type: POST_CATEGORY_PENDING })
  fetch(`${API_PORT}/category/create`, {
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
  .then(data => dispatch({ type: POST_CATEGORY_SUCCESS }))
  .catch(error => dispatch({ type: POST_CATEGORY_FAILED, payload: error }))

}

export const selectDeleteCategoryAct = (event) => {
  return event.target.parentNode.parentNode.id;
}

export const deleteCategoryAct = (categoryID) => (dispatch) =>{
  dispatch({ type: DELETE_CATEGORY_PENDING })
  fetch(`${API_PORT}/category/delete`, {
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

export const clearSearchCategoryAct = () => {
  return ({ type: CLEAR_SEARCH_CATEGORY });
}

export const onchangeSearchCategoryNameAct = (event) => {
  return ({type:ONCHANGE_SEARCH_CATEGORY_NAME, payload:event.target.value});
}

export const onchangeSearchCategoryDescAct = (event) => {
  return ({type:ONCHANGE_SEARCH_CATEGORY_DESC, payload:event.target.value});
}

export const searchCategoryAct = () => (dispatch,getState) =>{
  let resStatus;
  dispatch({ type: SEARCH_CATEGORY_PENDING })
  fetch(`${API_PORT}/category/search`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${getState().authRdc.token}`},
        body: JSON.stringify({
          categoryName: getState().categoryRdc.searchCategoryName,
          categoryDesc: getState().categoryRdc.searchCategoryDesc,
          userID:getState().authRdc.userID
        })
      }
  )
  .then(res => {
    resStatus = res.status
    return res.json()
  })
  .then(res => {
    switch (resStatus) {
        case 200:
            return dispatch({ type: SEARCH_CATEGORY_SUCCESS, payload: res})
        // case 400:
        //     return dispatch({ type: REQUEST_TAG_C_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
        case 500:
            return dispatch({ type: SEARCH_CATEGORY_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
        default:
            return dispatch({ type: SEARCH_CATEGORY_FAILED, payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:CATEGORY-SEARCH-1), please try again'} })
    }
  })
  .catch( 
    () =>dispatch({ type: SEARCH_CATEGORY_FAILED, 
      payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:CATEGORY-SEARCH-2), please try again'} })
  )
  // .then(response => response.json())
  // .then(data => dispatch({ type: SEARCH_CATEGORY_SUCCESS, payload: data}))
  // .catch(error => dispatch({ type: SEARCH_CATEGORY_FAILED, payload: error }))
}


const toggleDisplayCategoryButton = (selectedNode) => {

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

  toggleDisplayCategoryButton(selectedNode);

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

  toggleDisplayCategoryButton(selectedNode);

  
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

  toggleDisplayCategoryButton(selectedNode);

  return ({ type: CANCEL_UPDATE_CATEGORY });
}


export const updateCategoryAct = (afterUpdateCategory)  => (dispatch, getState) =>{

  const {beforeUpdateCategory} = getState().categoryRdc;

  if (JSON.stringify(afterUpdateCategory) !==
    JSON.stringify(beforeUpdateCategory)) {
    dispatch({ type: UPDATE_CATEGORY_PENDING })
    fetch(`${API_PORT}/category/update`, {
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

