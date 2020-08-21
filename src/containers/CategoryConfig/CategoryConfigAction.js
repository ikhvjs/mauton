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
  .then(data => {
    console.log('searchCategoryAct data',data);
    dispatch({ type: SEARCH_CATEGORY_SUCCESS, payload: data})
  }
    )
  .catch(error => dispatch({ type: SEARCH_CATEGORY_FAILED, payload: error }))
}



export const selectUpdateCategoryAct = (event) => {
  const category ={};

  const inputTag = document.createElement("input");
  inputTag.classList.add("form-control");
  inputTag.classList.add("form-control-sm");

  const childrenNode = event.target.parentNode.parentNode.querySelectorAll("td[name]");
  console.log('selectUpdateCategoryAct childrenNode',childrenNode);
  childrenNode.forEach((node)=>{
    let inputTagClone = inputTag.cloneNode(false);
    inputTagClone.setAttribute('name', node.getAttribute('name'));
    inputTagClone.value = node.innerHTML;
    node.innerHTML="";
    node.appendChild(inputTagClone);
    Object.assign(category,  {[node.getAttribute('name')]: node.innerHTML})

    // console.log('node.name',node.getAttribute('name'));
    // console.log('node.value',node.innerHTML);
  })
  console.log('selectUpdateCategoryAct category',category);
  // return category;

}



export const updateCategoryAct = (category) => (dispatch) =>{


}


