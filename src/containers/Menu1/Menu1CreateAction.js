import {
    API_PORT,
    CLOSE_CREATE_MENU1,
    ONCHANGE_CREATE_MENU1_NAME,
    ONCHANGE_CREATE_MENU1_SEQ,
    POST_MENU1_PENDING,
    POST_MENU1_SUCCESS,
    POST_MENU1_FAILED,
    CLEAR_CREATE_MENU1
   } from '../../constants';

export const closeMenu1CreateAct = () => {
    return ({type:CLOSE_CREATE_MENU1})
}

const checkCreateMenu1Name = (menu1Name) => {
    if (!menu1Name){
      return {isValid:false, errorMsg: `Please enter menu name`}
    }else if (menu1Name.length > 20){
      return {isValid:false, errorMsg: `Menu1 name cannot be more than 20 characters`}
    }
  
    return {isValid:true};
  }
  
  export const onchangeCreateMenu1NameAct = (event) => {
    const menu1Name = event.target.value;
    const result = checkCreateMenu1Name(menu1Name);
    if (!result.isValid){
      return { type: ONCHANGE_CREATE_MENU1_NAME, payload: {menu1Name:menu1Name,isValid:false, errorMsg:result.errorMsg}};
    }
    return { type: ONCHANGE_CREATE_MENU1_NAME, payload: {menu1Name:menu1Name,isValid:true}};
  }
  
  
  const checkCreateMenu1Seq = (menu1Seq) => {
    if (!menu1Seq){
      return {isValid:false, errorMsg: `Please enter seq`}
    }else if (isNaN(Number(menu1Seq))){
      return {isValid:false, errorMsg: `Seq must be a number`}
    }else if (Number(menu1Seq)<1||Number(menu1Seq)>1000){
      return {isValid:false, errorMsg: `Seq must be between 1 to 1000`}
    }
  
    return {isValid:true};
  }
  
  export const onchangeCreateMenu1SeqAct = (event) => {
    const menu1Seq = event.target.value;
    const result = checkCreateMenu1Seq(menu1Seq);
    if (!result.isValid){
      return { type: ONCHANGE_CREATE_MENU1_SEQ, payload: {menu1Seq:menu1Seq,isValid:false, errorMsg:result.errorMsg}};
    }
    return { type: ONCHANGE_CREATE_MENU1_SEQ, payload: {menu1Seq:Number(menu1Seq),isValid:true}};
  }
  

export const postMenu1Act = () => (dispatch,getState) =>{
  let resStatus;
  dispatch({ type: POST_MENU1_PENDING });
  fetch(`${API_PORT}/menu1/create`, {
        method: 'post',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${getState().authRdc.token}`},
        body: JSON.stringify({
          menu1Name: getState().menu1Rdc.createMenu1Name,
          seq: getState().menu1Rdc.createMenu1Seq,
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
              return dispatch({ type: POST_MENU1_SUCCESS, payload:res})
          case 400:
              return dispatch({ type: POST_MENU1_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
          case 500:
              return dispatch({ type: POST_MENU1_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
          default:
              return dispatch({ type: POST_MENU1_FAILED, payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:MENU1-Create-1), please try again'} })
      }
  })
  .catch( 
    () =>dispatch({ type: POST_MENU1_FAILED, payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:MENU1-Create-2), please try again'} })
  )
}

export const clearCreateMenu1Act = () => {
    return ({type: CLEAR_CREATE_MENU1});
}