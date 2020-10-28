import {
    API_PORT,
    REQUEST_SIDEBAR_PENDING,
    REQUEST_SIDEBAR_SUCCESS,
    REQUEST_SIDEBAR_FAILED
   } from '../../constants';

export const requestSidebarAct = (topbarMenuID) => (dispatch) =>{
    dispatch({ type: REQUEST_SIDEBAR_PENDING })
      fetch(`${API_PORT}/sidebar/id/${topbarMenuID}`, {  
            method: 'get',
            headers: {'Content-Type': 'text/plain'}
          })
      .then(response => response.json())
      .then(data => dispatch({ type: REQUEST_SIDEBAR_SUCCESS, payload: data }))
      .catch(error => dispatch({ type: REQUEST_SIDEBAR_FAILED, payload: error }))
};
  