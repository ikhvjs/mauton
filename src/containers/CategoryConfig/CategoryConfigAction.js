import {
  API_PORT,
  //request category
  REQUEST_CATEGORY_PENDING,
  REQUEST_CATEGORY_SUCCESS,
  REQUEST_CATEGORY_FAILED,
  //search category
  SEARCH_CATEGORY_PENDING,
  SEARCH_CATEGORY_SUCCESS,
  SEARCH_CATEGORY_FAILED,
  CLEAR_SEARCH_CATEGORY,
  ONCHANGE_SEARCH_CATEGORY_NAME,
  ONCHANGE_SEARCH_CATEGORY_DESC,
  SELECT_CREATE_CATEGORY,
  SELECT_DELETE_CATEGORY,
  SELECT_UPDATE_CATEGORY
} from '../../constants';

export const selectCreateCategoryAct = () => {
  return { type: SELECT_CREATE_CATEGORY }
}

export const selectDeleteCategoryAct = (event) => {
  const categoryID = Number(event.target.getAttribute('category-id'));
  const categoryName = event.target.getAttribute('category-name');
  return { type: SELECT_DELETE_CATEGORY, payload: { deleteCategoryName: categoryName, deleteCategoryID: categoryID } }
}

export const selectUpdateCategoryAct = (event) => {
  const categoryID = Number(event.target.getAttribute('category-id'));
  const categoryName = event.target.getAttribute('category-name');
  const categoryDesc = event.target.getAttribute('category-desc');
  const categorySeq = Number(event.target.getAttribute('category-seq'));
  return {type:SELECT_UPDATE_CATEGORY, payload:
    {updateCategoryID:categoryID, 
      updateCategoryName:categoryName,
      updateCategoryDesc:categoryDesc,
      updateCategorySeq:categorySeq}}
}

export const requestCategoryAct = () => (dispatch, getState) => {
  let resStatus;
  dispatch({ type: REQUEST_CATEGORY_PENDING })
  fetch(`${API_PORT}/category/request`, {
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
          return dispatch({ type: REQUEST_CATEGORY_SUCCESS, payload: res })
        case 500:
          return dispatch({ type: REQUEST_CATEGORY_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
        default:
          return dispatch({ type: REQUEST_CATEGORY_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:CATEGORY-REQUEST-1), please try again' } })
      }
    })
    .catch(
      () => dispatch({
        type: REQUEST_CATEGORY_FAILED,
        payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:CATEGORY-REQUEST-2), please try again' }
      })
    )
}


export const clearSearchCategoryAct = () => {
  return ({ type: CLEAR_SEARCH_CATEGORY });
}

export const onchangeSearchCategoryNameAct = (event) => {
  return ({ type: ONCHANGE_SEARCH_CATEGORY_NAME, payload: event.target.value });
}

export const onchangeSearchCategoryDescAct = (event) => {
  return ({ type: ONCHANGE_SEARCH_CATEGORY_DESC, payload: event.target.value });
}

export const searchCategoryAct = () => (dispatch, getState) => {
  let resStatus;
  dispatch({ type: SEARCH_CATEGORY_PENDING })
  fetch(`${API_PORT}/category/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${getState().authRdc.token}`
    },
    body: JSON.stringify({
      categoryName: getState().categoryRdc.searchCategoryName,
      categoryDesc: getState().categoryRdc.searchCategoryDesc,
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
          return dispatch({ type: SEARCH_CATEGORY_SUCCESS, payload: res })
        case 500:
          return dispatch({ type: SEARCH_CATEGORY_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
        default:
          return dispatch({ type: SEARCH_CATEGORY_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:CATEGORY-SEARCH-1), please try again' } })
      }
    })
    .catch(
      () => dispatch({
        type: SEARCH_CATEGORY_FAILED,
        payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:CATEGORY-SEARCH-2), please try again' }
      })
    )
}

