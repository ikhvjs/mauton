import {
    API_PORT,
    CLOSE_DELETE_MENU1,
    DELETE_MENU1_PENDING,
    DELETE_MENU1_SUCCESS,
    DELETE_MENU1_FAILED
   } from '../../constants';

export const closeDeleteMenu1Act = () => {
    return ({type:CLOSE_DELETE_MENU1})
}

export const deleteMenu1Act = () => (dispatch,getState) =>{
    let resStatus;
    dispatch({ type: DELETE_MENU1_PENDING })
    fetch(`${API_PORT}/menu1/delete`, {
          method: 'delete',
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${getState().authRdc.token}`},
          body: JSON.stringify({
            menu1ID: getState().menu1Rdc.deleteMenu1ID,
            userID: getState().authRdc.userID 
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
                return dispatch({ type: DELETE_MENU1_SUCCESS})
            case 400:
                return dispatch({ type: DELETE_MENU1_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
            case 500:
                return dispatch({ type: DELETE_MENU1_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
            default:
                return dispatch({ type: DELETE_MENU1_FAILED, payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:MENU1-DELETE-1), please try again'} })
        }
    })
    .catch( 
      () =>dispatch({ type: DELETE_MENU1_FAILED, 
        payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:MENU1-DELETE-2), please try again'} })
    )
  }

