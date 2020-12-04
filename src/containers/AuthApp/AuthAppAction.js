import {
  API_PORT,
  REQUEST_TOPBAR_PENDING,
  REQUEST_TOPBAR_SUCCESS,
  REQUEST_TOPBAR_FAILED,
  REQUEST_SIDEBAR_PENDING,
  REQUEST_SIDEBAR_SUCCESS,
  REQUEST_SIDEBAR_FAILED,
  USER_START_SESSION,
  USER_STOP_SESSION,
  USER_SESSION_TIMEOUT,
} from '../../constants';

let timer;

export const startSessionTimeOutAct = () => (dispatch, getState) => {
  dispatch({ type: USER_START_SESSION });
  const timerOut = getState().authRdc.expireTime * 1000;
  timer = setTimeout(
    () => dispatch({ type: USER_SESSION_TIMEOUT }),
    timerOut
  );
}

export const stopSessionTimeOutAct = () => {
  clearTimeout(timer);
  return ({ type: USER_STOP_SESSION });
}


export const requestTopbarAct = () => (dispatch, getState) => {
  dispatch({ type: REQUEST_TOPBAR_PENDING })
  fetch(`${API_PORT}/topbar`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${getState().authRdc.token}`
    }
  })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_TOPBAR_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_TOPBAR_FAILED, payload: error }))
};

export const requestSidebarAct = (topbarMenuID) => (dispatch) => {
  dispatch({ type: REQUEST_SIDEBAR_PENDING })
  fetch(`${API_PORT}/sidebar/id/${topbarMenuID}`, {
    method: 'get',
    headers: { 'Content-Type': 'text/plain' }
  })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_SIDEBAR_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_SIDEBAR_FAILED, payload: error }))
};


