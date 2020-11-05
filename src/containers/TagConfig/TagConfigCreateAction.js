import {
    API_PORT,
    CLOSE_CREATE_TAG,
    ONCHANGE_CREATE_TAG_NAME,
    ONCHANGE_CREATE_TAG_SEQ,
    POST_TAG_PENDING,
    POST_TAG_SUCCESS,
    POST_TAG_FAILED,
    CLEAR_CREATE_TAG
   } from '../../constants';

export const closeTagCreateAct = () => {
    return ({type:CLOSE_CREATE_TAG})
}

const checkCreateTagName = (tagName) => {
    if (!tagName){
      return {isValid:false, errorMsg: `Please enter tag name`}
    }else if (tagName.length > 20){
      return {isValid:false, errorMsg: `Tag name cannot be more than 20 characters`}
    }
  
    return {isValid:true};
  }
  
  export const onchangeCreateTagNameAct = (event) => {
    const tagName = event.target.value;
    const result = checkCreateTagName(tagName);
    if (!result.isValid){
      return { type: ONCHANGE_CREATE_TAG_NAME, payload: {tagName:tagName,isValid:false, errorMsg:result.errorMsg}};
    }
    return { type: ONCHANGE_CREATE_TAG_NAME, payload: {tagName:tagName,isValid:true}};
  }
  
  
  const checkCreateTagSeq = (tagSeq) => {
    if (!tagSeq){
      return {isValid:false, errorMsg: `Please enter seq`}
    }else if (isNaN(Number(tagSeq))){
      return {isValid:false, errorMsg: `Seq must be a number`}
    }
  
    return {isValid:true};
  }
  
  export const onchangeCreateTagSeqAct = (event) => {
    const tagSeq = event.target.value;
    const result = checkCreateTagSeq(tagSeq);
    if (!result.isValid){
      return { type: ONCHANGE_CREATE_TAG_SEQ, payload: {tagSeq:tagSeq,isValid:false, errorMsg:result.errorMsg}};
    }
    return { type: ONCHANGE_CREATE_TAG_SEQ, payload: {tagSeq:tagSeq,isValid:true}};
  }
  

export const postTagAct = () => (dispatch,getState) =>{
  let resStatus;
  dispatch({ type: POST_TAG_PENDING });
  fetch(`${API_PORT}/tag/create`, {
        method: 'post',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${getState().authRdc.token}`},
        body: JSON.stringify({
          tagName: getState().tagRdc.createTagName,
          seq: getState().tagRdc.createTagSeq,
          userID:getState().authRdc.userID
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
              return dispatch({ type: POST_TAG_SUCCESS, payload:res})
          case 400:
              return dispatch({ type: POST_TAG_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
          case 500:
              return dispatch({ type: POST_TAG_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
          default:
              return dispatch({ type: POST_TAG_FAILED, payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:TAG-Create-1), please try again'} })
      }
  })
  .catch( 
    () =>dispatch({ type: POST_TAG_FAILED, payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:TAG-Create-2), please try again'} })
  )
}

export const clearCreateTagAct = () => {
    return ({type: CLEAR_CREATE_TAG});
}