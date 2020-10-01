import {
  API_PORT,
  REQUEST_CATEGORY_MODAL_PENDING,
  REQUEST_CATEGORY_MODAL_SUCCESS,
  REQUEST_CATEGORY_MODAL_FAILED,
  CLOSE_CATEGORY_MODAL,
  SEARCH_CATEGORY_MODAL_PENDING,
  SEARCH_CATEGORY_MODAL_SUCCESS,
  SEARCH_CATEGORY_MODAL_FAILED,
  CLEAR_SEARCH_CATEGORY_MODAL,
  SELECT_CATEGORY_MODAL
 } from '../../constants';

export const requestCategoryModalAct = () => (dispatch) => {
	dispatch({ type: REQUEST_CATEGORY_MODAL_PENDING })
	fetch(`${API_PORT}/blog/category/get`, {
	      method: 'get',
	      headers: {'Content-Type': 'text/plain'}
	    })
	.then(response => response.json())
	.then(data => dispatch({ type: REQUEST_CATEGORY_MODAL_SUCCESS, payload: data }))
	.catch(error => dispatch({ type: REQUEST_CATEGORY_MODAL_FAILED, payload: error }))
}

export const closeCategoryModalAct =()=>{
  return { type: CLOSE_CATEGORY_MODAL };
}


export const selectSearchCategoryModalAct = (event) => {
  const selectedCategory ={};
  const childrenNode = event.target.parentNode.parentNode.querySelectorAll("div > input.form-control");
  // console.log('selectSearchCategoryAct childrenNode',childrenNode);
  childrenNode.forEach((node)=>{
    Object.assign(selectedCategory,  {[node.name]: node.value})
  })
  // console.log('selectedCategory',selectedCategory);
  return selectedCategory;
}

export const searchCategoryModalAct = (selectedCategory) => (dispatch) =>{
   // console.log('selectedCategory',selectedCategory);
  dispatch({ type: SEARCH_CATEGORY_MODAL_PENDING })
  fetch(`${API_PORT}/blog/category/search`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
          blog_category_name: selectedCategory.blog_category_name,
          blog_category_desc: selectedCategory.blog_category_desc
        })
      }
  )
  .then(response => response.json())
  .then(data => dispatch({ type: SEARCH_CATEGORY_MODAL_SUCCESS, payload: data}))
  .catch(error => dispatch({ type: SEARCH_CATEGORY_MODAL_FAILED, payload: error }))
}

export const clearSearchCategoryModalAct = (event) => {
  const selectedNode = event.target.parentNode.parentNode;
  const inputNode = selectedNode.querySelectorAll('div > input[name]');

  inputNode.forEach((node)=>{
    node.value="";
  })

  return { type: CLEAR_SEARCH_CATEGORY_MODAL };

}

export const selectCategoryModalAct = (event) => {
	const selectedCategory = {};
	const selectedNode = event.target.parentNode.parentNode;
	const categoryID = selectedNode.id;
	const categoryName = selectedNode.querySelector('td[name="blog_category_name"]').innerHTML;

	Object.assign(selectedCategory,  {"blog_category_id": categoryID, "blog_category_name":categoryName})

	return { type: SELECT_CATEGORY_MODAL, payload:selectedCategory };
}

