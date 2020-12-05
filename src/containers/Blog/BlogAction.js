import {
  API_PORT,
  REQUEST_BLOG_PENDING,
  REQUEST_BLOG_SUCCESS,
  REQUEST_BLOG_FAILED,
  SELECT_BLOG,
  SELECT_CREATE_BLOG,
  SELECT_DELETE_BLOG,
  SELECT_UPDATE_BLOG,
} from '../../constants';


export const selectBlogAct = (blogID) => {
  return ({ type: SELECT_BLOG, payload: Number(blogID) })
}

export const selectCreateBlogAct = () => {
  return ({ type: SELECT_CREATE_BLOG })
}

export const selectDeleteBlogAct = () => {
  return ({ type: SELECT_DELETE_BLOG })
}

export const selectUpdateBlogAct = () => (dispatch, getState) => {
  const blogID = getState().blogRdc.blog.blog_id;
  const blogTitle = getState().blogRdc.blog.blog_title;
  const blogCategoryID = getState().blogRdc.blog.blog_category_id;
  const blogCategoryName = getState().blogRdc.blog.blog_category_name;
  const blogTag = getState().blogRdc.blog.tags;
  const blogSeq = getState().blogRdc.blog.seq;
  return dispatch({
    type: SELECT_UPDATE_BLOG,
    payload: {
      updateBlogID: blogID,
      updateBlogTitle: blogTitle,
      updateBlogCategory: {value: blogCategoryID, label:blogCategoryName},
      updateBlogTag: blogTag.map(({ tag_id: value, tag_name: label }) => ({ value, label })),
      updateBlogSeq: blogSeq
    }
  })
}

export const requestBlogAct = () => (dispatch, getState) => {
  let resStatus;
  dispatch({ type: REQUEST_BLOG_PENDING })
  fetch(`${API_PORT}/blog/request`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${getState().authRdc.token}`
    },
    body: JSON.stringify({
      blogID: getState().blogRdc.selectBlogID
    })
  })
    .then(res => {
      resStatus = res.status
      return res.json()
    })
    .then(res => {
      switch (resStatus) {
        case 200:
          return dispatch({ type: REQUEST_BLOG_SUCCESS, payload: res })
        case 500:
          return dispatch({ type: REQUEST_BLOG_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
        default:
          return dispatch({ type: REQUEST_BLOG_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:BLOG-REQUEST-1), please try again' } })
      }
    })
    .catch(
      () => dispatch({
        type: REQUEST_BLOG_FAILED,
        payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:BLOG-REQUEST-2), please try again' }
      })
    )
};
