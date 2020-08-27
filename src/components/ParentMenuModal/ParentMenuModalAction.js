import {
  REQUEST_PARENT_MENU_PENDING,
  REQUEST_PARENT_MENU_SUCCESS,
  REQUEST_PARENT_MENU_FAILED,
  CLOSE_PARENT_MENU_MODAL,
  SEARCH_PARENT_MENU_PENDING,
  SEARCH_PARENT_MENU_SUCCESS,
  SEARCH_PARENT_MENU_FAILED,
  CLEAR_SEARCH_PARENT_MENU,
  SELECT_CREATE_PARENT_MENU,
  SELECT_UPDATE_PARENT_MENU
 } from '../../constants';

export const requestParentMenuModalAct = () => (dispatch) => {
	dispatch({ type: REQUEST_PARENT_MENU_PENDING })
	fetch('http://localhost:3001/menu1/get', {
	      method: 'get',
	      headers: {'Content-Type': 'text/plain'}
	    })
	.then(response => response.json())
	.then(data => dispatch({ type: REQUEST_PARENT_MENU_SUCCESS, payload: data }))
	.catch(error => dispatch({ type: REQUEST_PARENT_MENU_FAILED, payload: error }))
}

export const closeParentMenuModalAct =()=>{
  return { type: CLOSE_PARENT_MENU_MODAL };
}


export const selectSearchParentMenuModalAct = (event) => {
  const parentMenu ={};
  const childrenNode = event.target.parentNode.parentNode.querySelectorAll("div > input.form-control");
  // console.log('selectSearchCategoryAct childrenNode',childrenNode);
  childrenNode.forEach((node)=>{
    Object.assign(parentMenu,  {[node.name]: node.value})
  })
  // console.log('selectSearchCategoryAct category',category);
  return parentMenu;
}

export const searchParentMenuModalAct = (menu) => (dispatch) =>{
  dispatch({ type: SEARCH_PARENT_MENU_PENDING })
  fetch('http://localhost:3001/menu1/search', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
          menu_name: menu.menu_name,
          menu_path: menu.menu_path
        })
      }
  )
  .then(response => response.json())
  .then(data => dispatch({ type: SEARCH_PARENT_MENU_SUCCESS, payload: data}))
  .catch(error => dispatch({ type: SEARCH_PARENT_MENU_FAILED, payload: error }))
}

export const clearSearchParentMenuModalAct = (event) => {
  const selectedNode = event.target.parentNode.parentNode;
  const inputNode = selectedNode.querySelectorAll('div > input[name]');

  inputNode.forEach((node)=>{
    node.value="";
  })

  return { type: CLEAR_SEARCH_PARENT_MENU };

}

export const selectCreateParentMenuModalAct = (event) => {
	const selectedCreateParentMenu = {};
	const selectedNode = event.target.parentNode.parentNode;
	const parentMenuID = selectedNode.id;
	const parentMenuName = selectedNode.querySelector('td[name="menu_name"]').innerHTML;

	Object.assign(selectedCreateParentMenu,  {"menu_id": parentMenuID, "menu_name":parentMenuName})

	return { type: SELECT_CREATE_PARENT_MENU, payload:selectedCreateParentMenu };
}

export const selectUpdateParentMenuModalAct = (event) => {

  const updateParentMenu = {};
  const selectedNode = event.target.parentNode.parentNode;
  const parentMenuID = selectedNode.id;
  const parentMenuName = selectedNode.querySelector('td[name="menu_name"]').innerHTML;



  Object.assign(updateParentMenu,  {"menu_id": parentMenuID, "menu_name":parentMenuName})

  console.log('selectedNode',selectedNode);
  console.log('updateParentMenu',updateParentMenu);

  return { type: SELECT_UPDATE_PARENT_MENU, payload:updateParentMenu };
}
