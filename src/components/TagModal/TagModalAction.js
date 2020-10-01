import {
  API_PORT,
  REQUEST_TAG_MODAL_PENDING,
  REQUEST_TAG_MODAL_SUCCESS,
  REQUEST_TAG_MODAL_FAILED,
  CLOSE_TAG_MODAL,
  SEARCH_TAG_MODAL_PENDING,
  SEARCH_TAG_MODAL_SUCCESS,
  SEARCH_TAG_MODAL_FAILED,
  CLEAR_SEARCH_TAG_MODAL,
  SELECT_TAG_MODAL
 } from '../../constants';

export const requestTagModalAct = () => (dispatch) => {
	dispatch({ type: REQUEST_TAG_MODAL_PENDING })
	fetch(`${API_PORT}/blog/tag/get`, {
	      method: 'get',
	      headers: {'Content-Type': 'text/plain'}
	    })
	.then(response => response.json())
	.then(data => dispatch({ type: REQUEST_TAG_MODAL_SUCCESS, payload: data }))
	.catch(error => dispatch({ type: REQUEST_TAG_MODAL_FAILED, payload: error }))
}

export const closeTagModalAct =()=>{
  return { type: CLOSE_TAG_MODAL };
}


export const selectSearchTagModalAct = (event) => {
  const selectedTag ={};
  const childrenNode = event.target.parentNode.parentNode.querySelectorAll("div > input.form-control");
  // console.log('selectSearchCategoryAct childrenNode',childrenNode);
  childrenNode.forEach((node)=>{
    Object.assign(selectedTag,  {[node.name]: node.value})
  })
  // console.log('selectedCategory',selectedCategory);
  return selectedTag;
}

export const searchTagModalAct = (selectedTag) => (dispatch) =>{
   // console.log('selectedTag',selectedTag);
  dispatch({ type: SEARCH_TAG_MODAL_PENDING })
  fetch(`${API_PORT}/blog/tag/search`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
          tag_name: selectedTag.tag_name
        })
      }
  )
  .then(response => response.json())
  .then(data => dispatch({ type: SEARCH_TAG_MODAL_SUCCESS, payload: data}))
  .catch(error => dispatch({ type: SEARCH_TAG_MODAL_FAILED, payload: error }))
}

export const clearSearchTagModalAct = (event) => {
  const selectedNode = event.target.parentNode.parentNode;
  const inputNode = selectedNode.querySelectorAll('div > input[name]');

  inputNode.forEach((node)=>{
    node.value="";
  })

  return { type: CLEAR_SEARCH_TAG_MODAL };

}

export const selectTagModalAct = (event) => (dispatch,getState) => {
	const selectedTag = {};
  // console.log('selectedTag 0',selectedTag);
  // const currentSelectedTag = getState().blogRdc.selectedTag;
  // selectedTag.push(currentSelectedTag);
  
  // Object.assign(selectedTag,currentSelectedTag);
  // console.log('selectedTag 1',selectedTag);

	const selectedNode = event.target.parentNode.parentNode;
	const tagID = selectedNode.id;
	const tagName = selectedNode.querySelector('td[name="tag_name"]').innerHTML;

  // selectedTag.push({"tag_id": tagID, "tag_name":tagName});
	Object.assign(selectedTag, {"tag_id": tagID, "tag_name":tagName})

  // console.log('selectedTag 2',selectedTag);


	dispatch ({ type: SELECT_TAG_MODAL, payload:selectedTag });
}

