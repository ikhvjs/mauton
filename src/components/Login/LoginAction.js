import {
    API_PORT,
    ONCHANGE_LOGIN_EMAIL,
    ONCHANGE_LOGIN_PASSWORD,
    GET_USER_PENDING,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    CLEAR_LOGIN_USER,
    GET_CAPTCHA_TOKEN_SUCCESS,
    GET_CAPTCHA_TOKEN_FAILED
   } from '../../constants';



export const onChangeLoginEmailAct =(email)=>{
    return ({type:ONCHANGE_LOGIN_EMAIL, payload:email})
}

export const onChangeLoginPasswordAct =(password)=>{
    return ({type:ONCHANGE_LOGIN_PASSWORD, payload:password})
}

export const getUserAct = (event,ownProps) => async (dispatch, getState) =>{
    event.preventDefault();
    const email  = getState().authRdc.onChangeEmail;
    const password  = getState().authRdc.onChangePassword;
    let resStatus = 0;

    dispatch({ type: GET_USER_PENDING });

    try{
        const token = await ownProps.googleReCaptchaProps.executeRecaptcha('login');
        dispatch({ type: GET_CAPTCHA_TOKEN_SUCCESS, payload:token});
        fetch(`${API_PORT}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                      'Accept': 'application/json'},
            body: JSON.stringify({
                grant_type: 'password', //oAuth2 standard
                email: email,
                password: password,
                captchaToken: token
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
                    return dispatch({ type: GET_USER_SUCCESS, payload:res})
                case 400:
                    return dispatch({ type: GET_USER_FAILED, payload: res.errMessage })
                case 500:
                    return dispatch({ type: GET_USER_FAILED, payload: res.errMessage })
                default:
                    return dispatch({ type: GET_USER_FAILED, payload: 'Exceptional Error, please try again' })
            }
        })
        .catch( () => dispatch({ type: GET_USER_FAILED, payload: 'Internal Server Error, please try again' }))

    }catch(err){
        dispatch({ type: GET_CAPTCHA_TOKEN_FAILED, 
            payload:{actionCode:'Login',errMessage:'Captcha Error, please try again'}});
    }
    
    // .then(data => dispatch({ type: GET_USER_SUCCESS, payload:data}))
    // .catch(error => dispatch({ type: GET_USER_FAILED, payload: error }))
}

export const clearLoginUserAct =()=>{
    return ({type:CLEAR_LOGIN_USER})
}