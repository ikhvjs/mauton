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
  SELECT_DELETE_MENU2,
  SELECT_UPDATE_MENU2
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
    }
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

export const clearSearchMenu2Act = () => {
  return ({ type: CLEAR_SEARCH_MENU2 });
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
      parentMenuName: getState().menu2Rdc.searchMenu2ParentName
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

export const selectDeleteMenu2Act = (event) => {
  const menu2ID = Number(event.target.getAttribute('menu2-id'));
  const menu2Name = event.target.getAttribute('menu2-name');
  return {type:SELECT_DELETE_MENU2, payload:{deleteMenu2Name:menu2Name,deleteMenu2ID:menu2ID}}
}

export const selectUpdateMenu2Act = (event) => {
  const menu2ID = Number(event.target.getAttribute('menu2-id'));
  const menu2Name = event.target.getAttribute('menu2-name');
  const menu2ParentMenuID = event.target.getAttribute('menu2-parent-menu-id');
  const menu2ParentName = event.target.getAttribute('menu2-parent-name');
  const menu2Seq = Number(event.target.getAttribute('menu2-seq'));
  return {type:SELECT_UPDATE_MENU2, 
    payload:{updateMenu2ID:menu2ID, 
      updateMenu2Name:menu2Name,
      updateMenu2ParentMenuID:menu2ParentMenuID,
      updateMenu2ParentName:menu2ParentName,
      updateMenu2Seq:menu2Seq}}
}
