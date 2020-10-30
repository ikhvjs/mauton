import {
    API_PORT,
    REQUEST_TOPBAR_PENDING,
    REQUEST_TOPBAR_SUCCESS,
    REQUEST_TOPBAR_FAILED
   } from '../../constants';

export const requestTopbarAct = () => (dispatch,getState) => {
  dispatch({ type: REQUEST_TOPBAR_PENDING })
  fetch(`${API_PORT}/topbar`, {
    method: 'post',
    headers: {'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${getState().authRdc.token}`
            }
  })
  .then(response => response.json())
  .then(data => dispatch({ type: REQUEST_TOPBAR_SUCCESS, payload: data }))
  .catch(error => dispatch({ type: REQUEST_TOPBAR_FAILED, payload: error }))
};
  

