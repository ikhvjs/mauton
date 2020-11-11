import {
    API_PORT,
    CLOSE_CREATE_MENU2,
    ONCHANGE_CREATE_MENU2_NAME,
    ONCHANGE_CREATE_MENU2_PARENT_NAME,
    ONCHANGE_CREATE_MENU2_SEQ,
    POST_MENU2_PENDING,
    POST_MENU2_SUCCESS,
    POST_MENU2_FAILED,
    CLEAR_CREATE_MENU2
   } from '../../constants';

export const closeMenu2CreateAct = () => {
    return ({type:CLOSE_CREATE_MENU2})
}

const checkCreateMenu2Name = (menu2Name) => {
    if (!menu2Name){
      return {isValid:false, errorMsg: `Please enter menu name`}
    }else if (menu2Name.length > 20){
      return {isValid:false, errorMsg: `Menu2 name cannot be more than 20 characters`}
    }
  
    return {isValid:true};
  }
  
  export const onchangeCreateMenu2NameAct = (event) => {
    const menu2Name = event.target.value;
    const result = checkCreateMenu2Name(menu2Name);
    if (!result.isValid){
      return { type: ONCHANGE_CREATE_MENU2_NAME, payload: {menu2Name:menu2Name,isValid:false, errorMsg:result.errorMsg}};
    }
    return { type: ONCHANGE_CREATE_MENU2_NAME, payload: {menu2Name:menu2Name,isValid:true}};
  }

  const checkCreateMenu2ParentMenuID = (menu2ParentMenuID) => {
    if (!menu2ParentMenuID){
      return {isValid:false, errorMsg: `Please select a Parent Menu Name`}
    }
  
    return {isValid:true};
  }
  
  export const onchangeCreateMenu2ParentMenuIDAct = (event) => {
    const menu2ParentMenuID = event.target.value;
    const result = checkCreateMenu2ParentMenuID(menu2ParentMenuID);
    if (!result.isValid){
      return { type: ONCHANGE_CREATE_MENU2_PARENT_NAME, payload: {menu2ParentMenuID:menu2ParentMenuID,isValid:false, errorMsg:result.errorMsg}};
    }
    return { type: ONCHANGE_CREATE_MENU2_PARENT_NAME, payload: {menu2ParentMenuID:menu2ParentMenuID,isValid:true}};
  }
  
  
  const checkCreateMenu2Seq = (menu2Seq) => {
    if (!menu2Seq){
      return {isValid:false, errorMsg: `Please enter seq`}
    }else if (isNaN(Number(menu2Seq))){
      return {isValid:false, errorMsg: `Seq must be a number`}
    }else if (Number(menu2Seq)<1||Number(menu2Seq)>1000){
      return {isValid:false, errorMsg: `Seq must be between 1 to 1000`}
    }
  
    return {isValid:true};
  }
  
  export const onchangeCreateMenu2SeqAct = (event) => {
    const menu2Seq = event.target.value;
    const result = checkCreateMenu2Seq(menu2Seq);
    if (!result.isValid){
      return { type: ONCHANGE_CREATE_MENU2_SEQ, payload: {menu2Seq:menu2Seq,isValid:false, errorMsg:result.errorMsg}};
    }
    return { type: ONCHANGE_CREATE_MENU2_SEQ, payload: {menu2Seq:Number(menu2Seq),isValid:true}};
  }
  

export const postMenu2Act = () => (dispatch,getState) =>{
  let resStatus;
  dispatch({ type: POST_MENU2_PENDING });
  fetch(`${API_PORT}/menu2/create`, {
        method: 'post',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${getState().authRdc.token}`},
        body: JSON.stringify({
          menu2Name: getState().menu2Rdc.createMenu2Name,
          menu2ParentMenuID: getState().menu2Rdc.createMenu2ParentMenuID,
          seq: getState().menu2Rdc.createMenu2Seq,
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
              return dispatch({ type: POST_MENU2_SUCCESS, payload:res})
          case 400:
              return dispatch({ type: POST_MENU2_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
          case 500:
              return dispatch({ type: POST_MENU2_FAILED, payload: {Code:res.Code, errMessage:res.errMessage} })
          default:
              return dispatch({ type: POST_MENU2_FAILED, payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:MENU2-Create-1), please try again'} })
      }
  })
  .catch( 
    () =>dispatch({ type: POST_MENU2_FAILED, payload: {Code:'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage:'Internal Server Error(Code:MENU2-Create-2), please try again'} })
  )
}

export const clearCreateMenu2Act = () => {
    return ({type: CLEAR_CREATE_MENU2});
}