import {
  REQUEST_MENU2_PENDING,
  REQUEST_MENU2_SUCCESS,
  REQUEST_MENU2_FAILED,
  REQUEST_MENU2_C_PENDING,
  REQUEST_MENU2_C_SUCCESS,
  REQUEST_MENU2_C_FAILED,
  POST_MENU2_PENDING,
  POST_MENU2_SUCCESS,
  POST_MENU2_FAILED,
  DELETE_MENU2_PENDING,
  DELETE_MENU2_SUCCESS,
  DELETE_MENU2_FAILED,
  SEARCH_MENU2_PENDING,
  SEARCH_MENU2_SUCCESS,
  SEARCH_MENU2_FAILED,
  SELECT_UPDATE_MENU2,
  UPDATE_MENU2_PENDING,
  UPDATE_MENU2_SUCCESS,
  UPDATE_MENU2_FAILED ,
  CANCEL_UPDATE_MENU2,
  CLEAR_SEARCH_MENU2,
  SELECT_CREATE_PARENT_MENU_NAME,
  SELECT_UPDATE_PARENT_MENU_NAME,
  CLEAR_CREATE_MENU2,
  SET_NOT_ALLOW_UPDATE_PARENT_MENU_NAME
 } from '../../constants';

export const requestMenu2Act = () => (dispatch) => {
  dispatch({ type: REQUEST_MENU2_PENDING })
  fetch('http://localhost:3001/menu2/get', {
          method: 'get',
          headers: {'Content-Type': 'text/plain'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_MENU2_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_MENU2_FAILED, payload: error }))
}

export const requestMenu2ByClickAct = () => (dispatch) => {
  dispatch({ type: REQUEST_MENU2_C_PENDING })
  fetch('http://localhost:3001/menu2/get', {
          method: 'get',
          headers: {'Content-Type': 'text/plain'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_MENU2_C_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_MENU2_C_FAILED, payload: error }))
}

export const selectCreateMenu2Act = (event) => {
  const menu2 ={};
  const selectedParentMenuID = event.target.parentNode.parentNode.querySelector("td[id]").id;
  const childrenNode = event.target.parentNode.parentNode.querySelectorAll("td > input.form-control");


  Object.assign(menu2,  {"parent_menu_id": selectedParentMenuID})
  childrenNode.forEach((node)=>{
    Object.assign(menu2,  {[node.name]: node.value})
    node.value = "";
    node.defaultValue  = "";
  })
  console.log('create menu2',menu2);
  return menu2;
}

export const postMenu2Act = (menu2) => (dispatch) =>{
  dispatch({ type: POST_MENU2_PENDING })
  fetch('http://localhost:3001/menu2/create', {
        method: 'post',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
          menu_name: menu2.menu_name,
          menu_path: menu2.menu_path,
          seq:menu2.seq,
          parent_menu_id:menu2.parent_menu_id
        })
      }
  )
  .then(response => response.json())
  .then(data => dispatch({ type: POST_MENU2_SUCCESS }))
  .catch(error => dispatch({ type: POST_MENU2_FAILED, payload: error }))

}

export const clearCreateMenu2Act = (event) => {
  const childrenNode = event.target.parentNode.parentNode.querySelectorAll("td > input.form-control");

  childrenNode.forEach((node)=>{
    node.value = "";
    node.defaultValue  = "";
  });

  return { type: CLEAR_CREATE_MENU2 };
}

export const selectDeleteMenu2Act = (event) => {
  return event.target.parentNode.parentNode.id;
}

export const deleteMenu2Act = (menuID) => (dispatch) =>{
  dispatch({ type: DELETE_MENU2_PENDING })
  fetch('http://localhost:3001/menu2/delete', {
        method: 'delete',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
          menu_id: menuID
        })
      }
  )
  .then(response => response.json())
  .then(data => dispatch({ type: DELETE_MENU2_SUCCESS}))
  .catch(error => dispatch({ type: DELETE_MENU2_FAILED, payload: error }))
}


export const selectSearchMenu2Act = (event) => {
  const menu2 ={};
  const childrenNode = event.target.parentNode.parentNode.querySelectorAll("div > input.form-control");
  // console.log('selectSearchCategoryAct childrenNode',childrenNode);
  childrenNode.forEach((node)=>{
    Object.assign(menu2,  {[node.name]: node.value})
  })
  // console.log('selectSearchCategoryAct category',category);
  return menu2;
}

export const searchMenu2Act = (menu) => (dispatch) =>{
  dispatch({ type: SEARCH_MENU2_PENDING })
  fetch('http://localhost:3001/menu2/search', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
          menu_name: menu.menu_name,
          menu_path: menu.menu_path,
          parent_menu_name:menu.parent_menu_name
        })
      }
  )
  .then(response => response.json())
  .then(data => dispatch({ type: SEARCH_MENU2_SUCCESS, payload: data}))
  .catch(error => dispatch({ type: SEARCH_MENU2_FAILED, payload: error }))
}


const toggleDisplayMenu2Button = (selectedNode) => {

  const searchNode = selectedNode.parentNode.parentNode.parentNode
    .querySelectorAll('div.form-row > div[name="button"]');

   //toggle the display of search Menu2 Button 
  searchNode.forEach((node)=>{
    let searchButtonNode = node.querySelector('button');
    searchButtonNode.classList.contains('hidden-button')?
      searchButtonNode.classList.remove('hidden-button'):
      searchButtonNode.classList.add('hidden-button');
  })

  const selectedMenuID = selectedNode.id;
  
  
  const notSelectedNodes =  selectedNode.parentNode
    .querySelectorAll(`tr[id]:not([id=${CSS.escape(selectedMenuID)}])`);

  const createMenuInputNode = selectedNode.parentNode
    .querySelector('tr[id="new"]').querySelectorAll('td > input');

  const selectedButtonNodes = selectedNode
    .querySelector("td[headers]").querySelectorAll('button[name]');
  
  // const selectedParentMenuInput = selectedNode
  //   .querySelector('td[name="parent_menu_name"] > input');

  //toggle the display of input of create Menu2 record 
  createMenuInputNode.forEach((node)=>{
    node.disabled ? (node.disabled = false) : (node.disabled = true);
  })

  //toggle the display of parent menu input of  Menu2  record 
  // selectedParentMenuInput.classList.contains('hidden-button')?
  //   selectedParentMenuInput.classList.remove('hidden-button'):
  //     selectedParentMenuInput.classList.add('hidden-button');

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



export const beforeUpdateMenu2Act = (event) => {
  const beforeUpdateMenu2 ={};

  //dump a input field
  const inputTag = document.createElement("input");
  inputTag.classList.add("form-control");
  inputTag.classList.add("form-control-sm");

  const selectedNode = event.target.parentNode.parentNode;
  const selectedMenuID = selectedNode.id;
  Object.assign(beforeUpdateMenu2,  {"menu_id": selectedMenuID});

  const tdNode = selectedNode.querySelectorAll("td[name]");


    //Add inline edit when click 'Update' Button
  tdNode.forEach((node)=>{
    console.log('Node',node);
    let nodeAttribute = node.getAttribute('name');
    let nodeValue;

    nodeValue = node.innerHTML;
    if (nodeAttribute ==='parent_menu_name'){
      Object.assign(beforeUpdateMenu2,  {parent_menu_id: node.id});
    }

    let inputTagClone = inputTag.cloneNode(false);

    inputTagClone.setAttribute('name', nodeAttribute);
    inputTagClone.value = nodeValue;
    if (nodeAttribute!=='parent_menu_name') {
      node.innerHTML="";
      node.appendChild(inputTagClone);
    }
    
    Object.assign(beforeUpdateMenu2,  {[nodeAttribute]: nodeValue})
  })

  toggleDisplayMenu2Button(selectedNode);

  console.log('beforeUpdate ',beforeUpdateMenu2);
  return {type: SELECT_UPDATE_MENU2, payload: beforeUpdateMenu2 };

}


export const afterUpdateMenu2Act = (event) =>{
  const afterUpdateMenu2 ={};
  const selectedNode=event.target.parentNode.parentNode;
  const menuID=selectedNode.id;

  Object.assign(afterUpdateMenu2,  {"menu_id": menuID});
  // console.log('afterUpdateCategoryAct categoryID',categoryID);

  const tdNode = selectedNode.querySelectorAll("td[name]");
  // console.log('afterUpdateCategoryAct tdNode',tdNode);

  tdNode.forEach((node)=>{
    let inputNode;
    let nodeValue;
    let nodeAttribute = node.getAttribute('name');

    if (nodeAttribute !=='parent_menu_name'){
      inputNode = node.querySelector("input");
      nodeValue = inputNode.value;
    } else {
      nodeValue=node.innerText;
      Object.assign(afterUpdateMenu2,  {parent_menu_id: node.id});
    }


    Object.assign(afterUpdateMenu2,  {[nodeAttribute]: nodeValue})

    if (nodeAttribute !=='parent_menu_name') {
      node.removeChild(inputNode);
    }
    
    node.innerHTML = nodeValue;

  });

  toggleDisplayMenu2Button(selectedNode);

  
  // console.log('afterUpdateCategoryAct afterUpdateCategory',afterUpdateCategory);
  return afterUpdateMenu2;

}

export const cancelUpdateMenu2Act =(event) => (dispatch, getState) => {
  const selectedNode = event.target.parentNode.parentNode;
  
  const tdNode = selectedNode.querySelectorAll('td[name]:not([name="parent_menu_name"])');

  tdNode.forEach((node)=>{
    
    let nodeAttribute = node.getAttribute('name');

    if (nodeAttribute!=='parent_menu_name') {
      node.removeChild(node.querySelector("input"));
    }else{
      node.id = getState().menuRdc.beforeUpdateMenu2['parent_menu_id'];
    }
    node.innerHTML = getState().menuRdc.beforeUpdateMenu2[nodeAttribute];
    

  });

  toggleDisplayMenu2Button(selectedNode);

  dispatch ({ type: CANCEL_UPDATE_MENU2 });
}


export const updateMenu2Act = (afterUpdateMenu2)  => (dispatch, getState) =>{
  
  const {beforeUpdateMenu2} = getState().menuRdc;

  if (JSON.stringify(afterUpdateMenu2) !==
    JSON.stringify(beforeUpdateMenu2)) {
    dispatch({ type: UPDATE_MENU2_PENDING })
    fetch('http://localhost:3001/menu2/update', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json'},
          body: JSON.stringify({
            menu_id:afterUpdateMenu2.menu_id,
            menu_name: afterUpdateMenu2.menu_name,
            menu_path: afterUpdateMenu2.menu_path,
            seq:afterUpdateMenu2.seq,
            parent_menu_id:afterUpdateMenu2.parent_menu_id
          })
        }
    )
    .then(response => response.json())
    .then(data => dispatch({ type: UPDATE_MENU2_SUCCESS, payload: data}))
    .catch(error => dispatch({ type: UPDATE_MENU2_FAILED, payload: error }))
  }

}

export const clearSearchMenu2Act = (event) => {
  const selectedNode = event.target.parentNode.parentNode;
  const inputNode = selectedNode.querySelectorAll('div > input[name]');

  inputNode.forEach((node)=>{
    node.value="";
  })

  return { type: CLEAR_SEARCH_MENU2 };

}

export const selectCreateParentMenuNameAct = () =>{
  return { type: SELECT_CREATE_PARENT_MENU_NAME };
}

export const selectUpdateParentMenuNameAct = (event) =>{
  return { type: SELECT_UPDATE_PARENT_MENU_NAME };
}


export const setNotAllowUpdateParentMenuNameAct = () =>{
  return { type: SET_NOT_ALLOW_UPDATE_PARENT_MENU_NAME };
}

// export const changeParentMenuNameAct = (event) => {
//   const updateParentMenu = {};
//   const value = event.target.value;
//   const id = event.target.parentNode.id;

//   Object.assign(updateParentMenu,  {menu_id: id, menu_name:value});

//   return { type: CHANGE_PARENT_MENU_NAME,  payload:updateParentMenu};
// }