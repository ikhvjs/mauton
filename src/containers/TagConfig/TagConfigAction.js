import {
  API_PORT,
  REQUEST_TAG_PENDING,
  REQUEST_TAG_SUCCESS,
  REQUEST_TAG_FAILED,
  REQUEST_TAG_C_PENDING,
  REQUEST_TAG_C_SUCCESS,
  REQUEST_TAG_C_FAILED,
  SEARCH_TAG_PENDING,
  SEARCH_TAG_SUCCESS,
  SEARCH_TAG_FAILED,
  ONCHANGE_SEARCH_TAG_NAME,
  CLEAR_SEARCH_TAG, 
  SELECT_CREATE_TAG,
  SELECT_DELETE_TAG,
  SELECT_UPDATE_TAG
 } from '../../constants';

export const requestTagAct = () => (dispatch,getState) => {
  let resStatus;
  dispatch({ type: REQUEST_TAG_PENDING })
  fetch(`${API_PORT}/tag/request`, {
          method: 'post',
          headers: {'Content-Type': 'application/json',
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
              return dispatch({ type: REQUEST_TAG_SUCCESS, payload: res})
          // case 400:
          //     return dispatch({ type: REQUEST_TAG_C_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
          case 500:
              return dispatch({ type: REQUEST_TAG_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
          default:
              return dispatch({ type: REQUEST_TAG_FAILED, payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:TAG-REQUEST-1), please try again'} })
      }
  })
  .catch( 
    () =>dispatch({ type: REQUEST_TAG_FAILED, 
      payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:TAG-REQUEST-2), please try again'} })
  )
}

export const requestTagByClickAct = () => (dispatch,getState) => {
  let resStatus;
  dispatch({ type: REQUEST_TAG_C_PENDING })
  fetch(`${API_PORT}/tag/request`, {
          method: 'post',
          headers: {'Content-Type': 'application/json',
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
              return dispatch({ type: REQUEST_TAG_C_SUCCESS, payload: res})
          // case 400:
          //     return dispatch({ type: REQUEST_TAG_C_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
          case 500:
              return dispatch({ type: REQUEST_TAG_C_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
          default:
              return dispatch({ type: REQUEST_TAG_C_FAILED, payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:TAG-REQUEST-C-1), please try again'} })
      }
  })
  .catch( 
    () =>dispatch({ type: REQUEST_TAG_C_FAILED, 
      payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:TAG-REQUEST-C-2), please try again'} })
  )
}

export const searchTagAct = () => (dispatch,getState) =>{
  let resStatus;
  dispatch({ type: SEARCH_TAG_PENDING })
  fetch(`${API_PORT}/tag/search`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${getState().authRdc.token}`
                  },
        body: JSON.stringify({
          tagName: getState().tagRdc.searchTagName,
          userID:getState().authRdc.userID
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
              return dispatch({ type: SEARCH_TAG_SUCCESS, payload: res})
          // case 400:
          //     return dispatch({ type: REQUEST_TAG_C_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
          case 500:
              return dispatch({ type: SEARCH_TAG_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
          default:
              return dispatch({ type: SEARCH_TAG_FAILED, payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:TAG-SEARCH-1), please try again'} })
      }
  })
  .catch( 
    () =>dispatch({ type: SEARCH_TAG_FAILED, 
      payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:TAG-SEARCH-2), please try again'} })
  )
}


export const clearSearchTagAct = () => {
  return { type: CLEAR_SEARCH_TAG };
}


export const onchangeSearchTagNameAct = (event) => {
  return {type:ONCHANGE_SEARCH_TAG_NAME, payload:event.target.value}
}

export const selectCreateTagAct = () => {
  return {type:SELECT_CREATE_TAG}
}

export const selectDeleteTagAct = (event) => {
  const tagID = Number(event.target.getAttribute('tag-id'));
  const tagName = event.target.getAttribute('tag-name');
  return {type:SELECT_DELETE_TAG, payload:{deleteTagName:tagName,deleteTagID:tagID}}
}

export const selectUpdateTagAct = (event) => {
  const tagID = Number(event.target.getAttribute('tag-id'));
  const tagName = event.target.getAttribute('tag-name');
  const tagSeq = Number(event.target.getAttribute('tag-seq'));
  return {type:SELECT_UPDATE_TAG, payload:{updateTagID:tagID, updateTagName:tagName,updateTagSeq:tagSeq}}
}


