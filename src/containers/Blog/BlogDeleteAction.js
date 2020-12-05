import {
    API_PORT,
    CLOSE_DELETE_BLOG,
    DELETE_BLOG_PENDING,
    DELETE_BLOG_SUCCESS,
    DELETE_BLOG_FAILED
   } from '../../constants';

export const closeDeleteBlogAct = () => {
    return ({type:CLOSE_DELETE_BLOG})
}

export const deleteBlogAct = () => (dispatch,getState) =>{
    let resStatus;
    dispatch({ type: DELETE_BLOG_PENDING })
    fetch(`${API_PORT}/blog/delete`, {
          method: 'delete',
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${getState().authRdc.token}`},
          body: JSON.stringify({
            blogID: getState().blogRdc.selectBlogID,
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
                return dispatch({ type: DELETE_BLOG_SUCCESS})
            case 400:
                return dispatch({ type: DELETE_BLOG_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
            case 500:
                return dispatch({ type: DELETE_BLOG_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
            default:
                return dispatch({ type: DELETE_BLOG_FAILED, payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:BLOG-DELETE-1), please try again'} })
        }
    })
    .catch( 
      () =>dispatch({ type: DELETE_BLOG_FAILED, 
        payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:BLOG-DELETE-2), please try again'} })
    )
  }

