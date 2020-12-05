import {
    API_PORT,
    CLOSE_DELETE_MENU2,
    DELETE_MENU2_PENDING,
    DELETE_MENU2_SUCCESS,
    DELETE_MENU2_FAILED
   } from '../../constants';

export const closeDeleteMenu2Act = () => {
    return ({type:CLOSE_DELETE_MENU2})
}

export const deleteMenu2Act = () => (dispatch,getState) =>{
    let resStatus;
    dispatch({ type: DELETE_MENU2_PENDING })
    fetch(`${API_PORT}/menu2/delete`, {
          method: 'delete',
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${getState().authRdc.token}`},
          body: JSON.stringify({
            menu2ID: getState().menu2Rdc.deleteMenu2ID
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
                return dispatch({ type: DELETE_MENU2_SUCCESS})
            case 400:
                return dispatch({ type: DELETE_MENU2_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
            case 500:
                return dispatch({ type: DELETE_MENU2_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
            default:
                return dispatch({ type: DELETE_MENU2_FAILED, payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:MENU2-DELETE-1), please try again'} })
        }
    })
    .catch( 
      () =>dispatch({ type: DELETE_MENU2_FAILED, 
        payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:MENU2-DELETE-2), please try again'} })
    )
  }

