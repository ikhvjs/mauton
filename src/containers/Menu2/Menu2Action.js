import {
  API_PORT,
  REQUEST_MENU2_PENDING,
  REQUEST_MENU2_SUCCESS,
  REQUEST_MENU2_FAILED,
  
  SEARCH_MENU2_PENDING,
  SEARCH_MENU2_SUCCESS,
  SEARCH_MENU2_FAILED,
  ONCHANGE_SEARCH_MENU2_NAME,
  ONCHANGE_SEARCH_MENU2_PARENT_NAME,
  CLEAR_SEARCH_MENU2,
  SELECT_CREATE_MENU2,

  POST_MENU2_PENDING,
  POST_MENU2_SUCCESS,
  POST_MENU2_FAILED,
  DELETE_MENU2_PENDING,
  DELETE_MENU2_SUCCESS,
  DELETE_MENU2_FAILED,
  SELECT_CREATE_PARENT_MENU_NAME,
  SELECT_UPDATE_PARENT_MENU_NAME,
  CLEAR_CREATE_MENU2,
  SET_NOT_ALLOW_UPDATE_PARENT_MENU_NAME,
  CLEAR_SELECT_PARENT_MENU
 } from '../../constants';

export const requestMenu2Act = () => (dispatch,getState) => {
  let resStatus;
  dispatch({ type: REQUEST_MENU2_PENDING })
  fetch(`${API_PORT}/menu2/request`, {
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
          return dispatch({ type: REQUEST_MENU2_SUCCESS, payload: res })
        case 500:
          return dispatch({ type: REQUEST_MENU2_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
        default:
          return dispatch({ type: REQUEST_MENU2_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:MENU2-REQUEST-1), please try again' } })
      }
    })
    .catch(
      () => dispatch({
        type: REQUEST_MENU2_FAILED,
        payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:MENU2-REQUEST-2), please try again' }
      })
    )
}


export const clearSearchMenu1Act = () => {
  return ({ type: CLEAR_SEARCH_MENU2 });
}

export const onchangeSearchMenu2NameAct = (event) => {
  return ({ type: ONCHANGE_SEARCH_MENU2_NAME, payload: event.target.value });
}

export const onchangeSearchMenu2ParentNameAct = (event) => {
  return ({ type: ONCHANGE_SEARCH_MENU2_PARENT_NAME, payload: event.target.value });
}

export const searchMenu2Act = () => (dispatch,getState) =>{
  let resStatus;
  dispatch({ type: SEARCH_MENU2_PENDING });
  fetch(`${API_PORT}/menu2/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${getState().authRdc.token}`
    },
    body: JSON.stringify({
      menuName: getState().menu2Rdc.searchMenu2Name,
      parentMenuName: getState().menu2Rdc.searchMenu2ParentName,
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
          return dispatch({ type: SEARCH_MENU2_SUCCESS, payload: res })
        case 400:
          return dispatch({ type: SEARCH_MENU2_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
        case 500:
          return dispatch({ type: SEARCH_MENU2_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
        default:
          return dispatch({ type: SEARCH_MENU2_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:MENU2-SEARCH-1), please try again' } })
      }
    })
    .catch(
      () => dispatch({
        type: SEARCH_MENU2_FAILED,
        payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:MENU2-SEARCH-2), please try again' }
      })
    )
}

export const selectCreateMenu2Act = () => {
  return ({type:SELECT_CREATE_MENU2})
}

export const postMenu2Act = (menu2) => (dispatch) =>{
  dispatch({ type: POST_MENU2_PENDING })
  fetch(`${API_PORT}/menu2/create`, {
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

export const clearCreateMenu2Act = () => {
  return ({ type: CLEAR_CREATE_MENU2 });
}

export const selectDeleteMenu2Act = (event) => {
  return event.target.parentNode.parentNode.id;
}

export const deleteMenu2Act = (menuID) => (dispatch) =>{
  dispatch({ type: DELETE_MENU2_PENDING })
  fetch(`${API_PORT}/menu2/delete`, {
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





export const clearSearchMenu2Act = () => {
  return ({ type: CLEAR_SEARCH_MENU2 });
}

export const selectCreateParentMenuNameAct = () =>{
  return { type: SELECT_CREATE_PARENT_MENU_NAME };
}

export const selectUpdateParentMenuNameAct = () =>{
  return { type: SELECT_UPDATE_PARENT_MENU_NAME };
}


export const setNotAllowUpdateParentMenuNameAct = () =>{
  return { type: SET_NOT_ALLOW_UPDATE_PARENT_MENU_NAME };
}

export const clearSelectedParentMenuAct = () => {
  return {type:CLEAR_SELECT_PARENT_MENU};
}