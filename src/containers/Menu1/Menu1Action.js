import {
  API_PORT,
  REQUEST_MENU1_PENDING,
  REQUEST_MENU1_SUCCESS,
  REQUEST_MENU1_FAILED,
  SEARCH_MENU1_PENDING,
  SEARCH_MENU1_SUCCESS,
  SEARCH_MENU1_FAILED,
  ONCHANGE_SEARCH_MENU1_NAME,
  CLEAR_SEARCH_MENU1,
  SELECT_CREATE_MENU1,
  SELECT_DELETE_MENU1,
  SELECT_UPDATE_MENU1,
  SET_MENU1_PAGE
} from '../../constants';

import { getDisplayItems } from '../../utility/utility';

export const requestMenu1Act = () => (dispatch, getState) => {
  let resStatus;
  dispatch({ type: REQUEST_MENU1_PENDING })
  fetch(`${API_PORT}/menu1/request`, {
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
          dispatch({ type: REQUEST_MENU1_SUCCESS, payload: res });
          const itemPerPage = getState().menu1Rdc.itemPerPage;
          const menu1 = getState().menu1Rdc.menu1;
          const displayMenu1 = getDisplayItems(1, itemPerPage, menu1);
          dispatch({ type: SET_MENU1_PAGE, payload: { displayMenu1: displayMenu1, selectedPage: 1 } });
          break;
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


export const selectCreateMenu1Act = () => {
  return { type: SELECT_CREATE_MENU1 }
}

export const selectDeleteMenu1Act = (event) => {
  const menu1ID = Number(event.target.getAttribute('menu1-id'));
  const menu1Name = event.target.getAttribute('menu1-name');
  return { type: SELECT_DELETE_MENU1, payload: { deleteMenu1Name: menu1Name, deleteMenu1ID: menu1ID } }
}

export const selectUpdateMenu1Act = (event) => {
  const menu1ID = Number(event.target.getAttribute('menu1-id'));
  const menu1Name = event.target.getAttribute('menu1-name');
  const menu1Seq = Number(event.target.getAttribute('menu1-seq'));
  return { type: SELECT_UPDATE_MENU1, payload: { updateMenu1ID: menu1ID, updateMenu1Name: menu1Name, updateMenu1Seq: menu1Seq } }
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
    })
  })
    .then(res => {
      resStatus = res.status
      return res.json()
    })
    .then(res => {
      switch (resStatus) {
        case 200:
          dispatch({ type: SEARCH_MENU1_SUCCESS, payload: res });
          const itemPerPage = getState().menu1Rdc.itemPerPage;
          const menu1 = getState().menu1Rdc.menu1;
          const displayMenu1 = getDisplayItems(1, itemPerPage, menu1);
          dispatch({ type: SET_MENU1_PAGE, payload: { displayMenu1: displayMenu1, selectedPage: 1 } });
          break;
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

export const setPageAct = (selectedPage) => (dispatch, getState) => {
  const itemPerPage = getState().menu1Rdc.itemPerPage;
  const menu1 = getState().menu1Rdc.menu1;

  const displayMenu1 = getDisplayItems(selectedPage, itemPerPage, menu1);

  dispatch({ type: SET_MENU1_PAGE, payload: { displayMenu1: displayMenu1, selectedPage: selectedPage } });
}
