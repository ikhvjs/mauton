import {
  REQUEST_TOPBAR_PENDING,
  REQUEST_TOPBAR_SUCCESS,
  REQUEST_TOPBAR_FAILED,
  REQUEST_SIDEBAR_PENDING,
  REQUEST_SIDEBAR_SUCCESS,
  REQUEST_SIDEBAR_FAILED,
  REQUEST_SIDEBAR_C_PENDING,
  REQUEST_SIDEBAR_C_SUCCESS,
  REQUEST_SIDEBAR_C_FAILED
 } from '../../constants';

export const requestTopbarAct = () => (dispatch) => {
	dispatch({ type: REQUEST_TOPBAR_PENDING })
	fetch('http://localhost:3001/topbar', {
	        method: 'get',
	        headers: {'Content-Type': 'text/plain'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_TOPBAR_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_TOPBAR_FAILED, payload: error }))
};

export const requestSidebarAct = (topbarMenuID) => (dispatch) =>{
  dispatch({ type: REQUEST_SIDEBAR_PENDING })
    fetch(`http://localhost:3001/sidebar/id/${topbarMenuID}`, {
          method: 'get',
          headers: {'Content-Type': 'text/plain'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_SIDEBAR_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_SIDEBAR_FAILED, payload: error }))
};

export const requestSidebarByClickAct = (topbarMenuPath) => (dispatch) =>{
  dispatch({ type: REQUEST_SIDEBAR_C_PENDING })
    fetch(`http://localhost:3001/sidebar/path${topbarMenuPath}`, {
          method: 'get',
          headers: {'Content-Type': 'text/plain'}
        })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_SIDEBAR_C_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_SIDEBAR_C_FAILED, payload: error }))
};

