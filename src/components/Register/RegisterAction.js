import {
    API_PORT,
    ONCHANGE_REG_USER_NAME,
    ONCHANGE_REG_EMAIL,
    ONCHANGE_REG_PASSWORD,
    POST_USER_PENDING,
    POST_USER_SUCCESS,
    POST_USER_FAILED,
    CLEAR_REG_USER
   } from '../../constants';


export const onChangeRegUserNameAct =(username)=>{
    return ({type:ONCHANGE_REG_USER_NAME, payload:username})
}

export const onChangeRegEmailAct =(email)=>{
    return ({type:ONCHANGE_REG_EMAIL, payload:email})
}

export const onChangeRegPasswordAct =(password)=>{
    return ({type:ONCHANGE_REG_PASSWORD, payload:password})
}

export const postUserAct = (event) => (dispatch, getState) =>{

    event.preventDefault();
    const username = getState().authRdc.onChangeUserName;
    const email  = getState().authRdc.onChangeEmail;
    const password  = getState().authRdc.onChangePassword;
    let resStatus = 0;

    dispatch({ type: POST_USER_PENDING });
    fetch(`${API_PORT}/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
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
                return dispatch({ type: POST_USER_SUCCESS, payload:res})
            case 400:
                return dispatch({ type: POST_USER_FAILED, payload: res.errMessage })
            case 500:
                return dispatch({ type: POST_USER_FAILED, payload: res.errMessage })
            default:
                return dispatch({ type: POST_USER_FAILED, payload: 'Exceptional Error, please try again' })
        }
    })
    .catch( () => dispatch({ type: POST_USER_FAILED, payload: 'Internal Server Error, please try again' }))
}

export const clearRegUserAct =()=>{
    return ({type:CLEAR_REG_USER})
}