import {
  API_PORT,
  REQUEST_SIDEBAR_PENDING,
  REQUEST_SIDEBAR_SUCCESS,
  REQUEST_SIDEBAR_FAILED,
  SELECT_SIDEBAR
} from '../../constants';


export const selectSidebarAct = (sidebarMenuID) => {
  return ({type:SELECT_SIDEBAR, payload:sidebarMenuID})
}

export const requestSidebarAct = () => (dispatch,getState) => {
  let resStatus;
  dispatch({ type: REQUEST_SIDEBAR_PENDING });
  fetch(`${API_PORT}/sidebar/request`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${getState().authRdc.token}`
    },
    body: JSON.stringify({
      userID: getState().authRdc.userID,
      topbarMenuID: getState().topbarRdc.selectTopbarID
    })
  })
    .then(res => {
      resStatus = res.status
      return res.json()
    })
    .then(res => {
      switch (resStatus) {
        case 200:
          return dispatch({ type: REQUEST_SIDEBAR_SUCCESS, payload: res })
        case 500:
          return dispatch({ type: REQUEST_SIDEBAR_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
        default:
          return dispatch({ type: REQUEST_SIDEBAR_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:SIDEBAR-REQUEST-1), please try again' } })
      }
    })
    .catch(
      () => dispatch({
        type: REQUEST_SIDEBAR_FAILED,
        payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:SIDEBAR-REQUEST-2), please try again' }
      })
    )
};

