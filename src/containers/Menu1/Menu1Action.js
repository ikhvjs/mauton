import {
  API_PORT,
  REQUEST_MENU1_PENDING,
  REQUEST_MENU1_SUCCESS,
  REQUEST_MENU1_FAILED,

  SEARCH_MENU1_PENDING,
  SEARCH_MENU1_SUCCESS,
  SEARCH_MENU1_FAILED,
  ONCHANGE_SEARCH_MENU1_NAME,

  POST_MENU1_PENDING,
  POST_MENU1_SUCCESS,
  POST_MENU1_FAILED,
  DELETE_MENU1_PENDING,
  DELETE_MENU1_SUCCESS,
  DELETE_MENU1_FAILED,

  SELECT_UPDATE_MENU1,
  UPDATE_MENU1_PENDING,
  UPDATE_MENU1_SUCCESS,
  UPDATE_MENU1_FAILED,
  CANCEL_UPDATE_MENU1,
  CLEAR_SEARCH_MENU1
} from '../../constants';


export const requestMenu1Act = () => (dispatch, getState) => {
  let resStatus;
  dispatch({ type: REQUEST_MENU1_PENDING })
  fetch(`${API_PORT}/menu1/request`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
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
          return dispatch({ type: REQUEST_MENU1_SUCCESS, payload: res })
        case 500:
          return dispatch({ type: REQUEST_MENU1_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
        default:
          return dispatch({ type: REQUEST_MENU1_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:MENU1-REQUEST-1), please try again' } })
      }
    })
    .catch(
      () => dispatch({
        type: REQUEST_MENU1_FAILED,
        payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:MENU1-REQUEST-2), please try again' }
      })
    )
}


export const selectCreateMenu1Act = (event) => {
  const menu1 = {};
  const childrenNode = event.target.parentNode.parentNode.querySelectorAll("td > input.form-control");
  childrenNode.forEach((node) => {
    Object.assign(menu1, { [node.name]: node.value })
    node.value = "";
  })

  return menu1;
}

export const clearSearchMenu1Act = () => {
  return ({ type: CLEAR_SEARCH_MENU1 });
}

export const onchangeSearchMenu1NameAct = (event) => {
  return ({ type: ONCHANGE_SEARCH_MENU1_NAME, payload: event.target.value });
}


export const searchMenu1Act = () => (dispatch, getState) => {
  let resStatus;
  dispatch({ type: SEARCH_MENU1_PENDING });
  fetch(`${API_PORT}/menu1/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${getState().authRdc.token}`
    },
    body: JSON.stringify({
      menuName: getState().menu1Rdc.searchMenu1Name,
      seq: getState().menu1Rdc.searchMenu1Seq,
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
          return dispatch({ type: SEARCH_MENU1_SUCCESS, payload: res })
        case 400:
          return dispatch({ type: SEARCH_MENU1_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
        case 500:
          return dispatch({ type: SEARCH_MENU1_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
        default:
          return dispatch({ type: SEARCH_MENU1_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:MENU1-SEARCH-1), please try again' } })
      }
    })
    .catch(
      () => dispatch({
        type: SEARCH_MENU1_FAILED,
        payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:MENU1-SEARCH-2), please try again' }
      })
    )
}


export const postMenu1Act = (menu1) => (dispatch) => {
  dispatch({ type: POST_MENU1_PENDING })
  fetch(`${API_PORT}/menu1/create`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      menu_name: menu1.menu_name,
      menu_path: menu1.menu_path,
      seq: menu1.seq
    })
  }
  )
    .then(response => response.json())
    .then(data => dispatch({ type: POST_MENU1_SUCCESS }))
    .catch(error => dispatch({ type: POST_MENU1_FAILED, payload: error }))

}

export const selectDeleteMenu1Act = (event) => {
  return event.target.parentNode.parentNode.id;
}

export const deleteMenu1Act = (menuID) => (dispatch) => {
  dispatch({ type: DELETE_MENU1_PENDING })
  fetch(`${API_PORT}/menu1/delete`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      menu_id: menuID
    })
  }
  )
    .then(response => response.json())
    .then(data => dispatch({ type: DELETE_MENU1_SUCCESS }))
    .catch(error => dispatch({ type: DELETE_MENU1_FAILED, payload: error }))
}


export const selectSearchMenu1Act = (event) => {
  const menu1 = {};
  const childrenNode = event.target.parentNode.parentNode.querySelectorAll("div > input.form-control");
  // console.log('selectSearchCategoryAct childrenNode',childrenNode);
  childrenNode.forEach((node) => {
    Object.assign(menu1, { [node.name]: node.value })
  })
  // console.log('selectSearchCategoryAct category',category);
  return menu1;

}




const toggleDisplayMenu1Button = (selectedNode) => {

  const searchNode = selectedNode.parentNode.parentNode.parentNode.querySelectorAll('div.form-row > div[name="button"]');

  //toggle the display of search Menu1 Button 
  searchNode.forEach((node) => {
    let searchButtonNode = node.querySelector('button');
    searchButtonNode.classList.contains('hidden-button') ?
      searchButtonNode.classList.remove('hidden-button') :
      searchButtonNode.classList.add('hidden-button');
  })

  const selectedMenuID = selectedNode.id;
  const notSelectedNodes = selectedNode.parentNode
    .querySelectorAll(`tr[id]:not([id=${CSS.escape(selectedMenuID)}])`);
  // console.log('beforeUpdateCategoryAct notSelectedNodes',notSelectedNodes);

  const createMenuInputNode = selectedNode.parentNode
    .querySelector('tr[id="new"]').querySelectorAll('td > input');

  const selectedButtonNodes = selectedNode.querySelector("td[headers]").querySelectorAll('button[name]');
  // console.log('beforeUpdateCategoryAct selectedButtonNodes',selectedButtonNodes);

  //toggle the display of input of create Menu1 record 
  createMenuInputNode.forEach((node) => {
    node.disabled ? (node.disabled = false) : (node.disabled = true);
  })


  //toggle all the non-selected node 
  notSelectedNodes.forEach((notSelectedNode) => {
    let buttonNodes = notSelectedNode.querySelectorAll('button[name]');
    buttonNodes.forEach((buttonNode) => {
      (buttonNode.classList.contains('hidden-button')
        && (buttonNode.getAttribute('name') !== "save")
        && (buttonNode.getAttribute('name') !== "cancel")
      ) ?
        buttonNode.classList.remove('hidden-button') :
        buttonNode.classList.add('hidden-button');


    })
  });

  //Toggle'Save to change', 'Update' and 'Delete' button of the selected Node
  selectedButtonNodes.forEach((node) => {
    node.classList.contains('hidden-button') ?
      node.classList.remove('hidden-button') :
      node.classList.add('hidden-button')
  });

}



export const beforeUpdateMenu1Act = (event) => {
  const beforeUpdateMenu1 = {};

  //declare a input field
  const inputTag = document.createElement("input");
  inputTag.classList.add("form-control");
  inputTag.classList.add("form-control-sm");


  const selectedNode = event.target.parentNode.parentNode;
  const selectedMenuID = selectedNode.id;
  Object.assign(beforeUpdateMenu1, { "menu_id": selectedMenuID });
  // console.log('beforeUpdateCategoryAct selectedCategoryID',selectedCategoryID);

  const tdNode = selectedNode.querySelectorAll("td[name]");
  // console.log('beforeUpdateCategoryAct tdNode',tdNode);



  //Add inline edit when click 'Update' Button
  tdNode.forEach((node) => {
    let nodeValue = node.innerHTML;
    let nodeAttribute = node.getAttribute('name');
    let inputTagClone = inputTag.cloneNode(false);

    inputTagClone.setAttribute('name', nodeAttribute);
    inputTagClone.value = nodeValue;
    node.innerHTML = "";
    node.appendChild(inputTagClone);
    Object.assign(beforeUpdateMenu1, { [nodeAttribute]: nodeValue })
  })

  toggleDisplayMenu1Button(selectedNode);

  // console.log('beforeUpdateCategoryAct beforeUpdateCategory',beforeUpdateCategory);
  return { type: SELECT_UPDATE_MENU1, payload: beforeUpdateMenu1 };

}


export const afterUpdateMenu1Act = (event) => {
  const afterUpdateMenu1 = {};
  const selectedNode = event.target.parentNode.parentNode;
  const menuID = selectedNode.id;

  Object.assign(afterUpdateMenu1, { "menu_id": menuID });
  // console.log('afterUpdateCategoryAct categoryID',categoryID);

  const tdNode = selectedNode.querySelectorAll("td[name]");
  // console.log('afterUpdateCategoryAct tdNode',tdNode);

  tdNode.forEach((node) => {
    let inputNode = node.querySelector("input");
    let nodeValue = inputNode.value;
    let nodeAttribute = inputNode.getAttribute('name');
    Object.assign(afterUpdateMenu1, { [nodeAttribute]: nodeValue })

    node.removeChild(inputNode);

  });

  toggleDisplayMenu1Button(selectedNode);


  // console.log('afterUpdateCategoryAct afterUpdateCategory',afterUpdateCategory);
  return afterUpdateMenu1;

}

export const cancelUpdateMenu1Act = (event) => (dispatch, getState) => {
  const selectedNode = event.target.parentNode.parentNode;

  const tdNode = selectedNode.querySelectorAll("td[name]");

  tdNode.forEach((node) => {
    let inputNode = node.querySelector("input");
    let nodeAttribute = node.getAttribute('name');

    node.removeChild(inputNode);

    node.innerHTML = getState().menuRdc.beforeUpdateMenu1[nodeAttribute];

  });

  toggleDisplayMenu1Button(selectedNode);

  dispatch({ type: CANCEL_UPDATE_MENU1 });
}


export const updateMenu1Act = (afterUpdateMenu1) => (dispatch, getState) => {

  const { beforeUpdateMenu1 } = getState().menuRdc;

  if (JSON.stringify(afterUpdateMenu1) !==
    JSON.stringify(beforeUpdateMenu1)) {
    dispatch({ type: UPDATE_MENU1_PENDING })
    fetch(`${API_PORT}/menu1/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        menu_id: afterUpdateMenu1.menu_id,
        menu_name: afterUpdateMenu1.menu_name,
        menu_path: afterUpdateMenu1.menu_path,
        seq: afterUpdateMenu1.seq
      })
    }
    )
      .then(response => response.json())
      .then(data => dispatch({ type: UPDATE_MENU1_SUCCESS, payload: data }))
      .catch(error => dispatch({ type: UPDATE_MENU1_FAILED, payload: error }))
  }

}


