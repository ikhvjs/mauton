import {
    API_PORT,
    CLOSE_DELETE_CATEGORY,
    DELETE_CATEGORY_PENDING,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILED
   } from '../../constants';

export const closeDeleteCategoryAct = () => {
    return ({type:CLOSE_DELETE_CATEGORY})
}

export const deleteCategoryAct = () => (dispatch,getState) =>{
    let resStatus;
    dispatch({ type: DELETE_CATEGORY_PENDING })
    fetch(`${API_PORT}/category/delete`, {
          method: 'delete',
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${getState().authRdc.token}`},
          body: JSON.stringify({
            categoryID: getState().categoryRdc.deleteCategoryID
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
                return dispatch({ type: DELETE_CATEGORY_SUCCESS})
            case 400:
                return dispatch({ type: DELETE_CATEGORY_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
            case 500:
                return dispatch({ type: DELETE_CATEGORY_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
            default:
                return dispatch({ type: DELETE_CATEGORY_FAILED, payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:CATEGORY-DELETE-1), please try again'} })
        }
    })
    .catch( 
      () =>dispatch({ type: DELETE_CATEGORY_FAILED, 
        payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:CATEGORY-DELETE-2), please try again'} })
    )
  }

