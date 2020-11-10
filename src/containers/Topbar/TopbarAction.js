import {
    API_PORT,
    REQUEST_TOPBAR_PENDING,
    REQUEST_TOPBAR_SUCCESS,
    REQUEST_TOPBAR_FAILED
   } from '../../constants';

export const requestTopbarAct = () => (dispatch,getState) => {
  let resStatus;
  dispatch({ type: REQUEST_TOPBAR_PENDING })
  fetch(`${API_PORT}/topbar/request`, {
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
              return dispatch({ type: REQUEST_TOPBAR_SUCCESS, payload: res})
          case 500:
              return dispatch({ type: REQUEST_TOPBAR_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
          default:
              return dispatch({ type: REQUEST_TOPBAR_FAILED, payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:TOPBAR-REQUEST-1), please try again'} })
      }
  })
  .catch( 
    () =>dispatch({ type: REQUEST_TOPBAR_FAILED, 
      payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:TOPBAR-REQUEST-2), please try again'} })
  )
  // .then(response => response.json())
  // .then(data => dispatch({ type: REQUEST_TOPBAR_SUCCESS, payload: data }))
  // .catch(error => dispatch({ type: REQUEST_TOPBAR_FAILED, payload: error }))
};
  

