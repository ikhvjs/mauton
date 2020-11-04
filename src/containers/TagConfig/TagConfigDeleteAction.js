import {
    API_PORT,
    CLOSE_DELETE_TAG,
    DELETE_TAG_PENDING,
    DELETE_TAG_SUCCESS,
    DELETE_TAG_FAILED
   } from '../../constants';

export const closeDeleteTagAct = () => {
    return ({type:CLOSE_DELETE_TAG})
}

export const deleteTagAct = () => (dispatch,getState) =>{
    let resStatus;
    dispatch({ type: DELETE_TAG_PENDING })
    fetch(`${API_PORT}/tag/delete`, {
          method: 'delete',
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${getState().authRdc.token}`},
          body: JSON.stringify({
            tagID: getState().tagRdc.deleteTagID,
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
                return dispatch({ type: DELETE_TAG_SUCCESS})
            case 400:
                return dispatch({ type: DELETE_TAG_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
            case 500:
                return dispatch({ type: DELETE_TAG_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
            default:
                return dispatch({ type: DELETE_TAG_FAILED, payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:TAG-DELETE-1), please try again'} })
        }
    })
    .catch( 
      () =>dispatch({ type: DELETE_TAG_FAILED, 
        payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:TAG-DELETE-2), please try again'} })
    )
    // .then(response => response.json())
    // .then(data => dispatch({ type: DELETE_TAG_SUCCESS}))
    // .catch(error => dispatch({ type: DELETE_TAG_FAILED, payload: error }))
  }

