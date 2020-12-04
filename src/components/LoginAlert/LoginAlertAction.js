import {
    API_PORT,
    ONCHANGE_LOGIN_ALERT_PASSWORD,
    GET_LOGIN_ALERT_CAPTCHA_TOKEN_SUCCESS,
    GET_LOGIN_ALERT_CAPTCHA_TOKEN_FAILED,
    GET_LOGIN_ALERT_USER_PENDING,
    GET_LOGIN_ALERT_USER_SUCCESS,
    GET_LOGIN_ALERT_USER_FAILED,
    CLOSE_LOGIN_ALERT,
    CLEAR_LOGIN_ALERT_USER,
    LOGIN_ALERT_USER_LOG_OUT,
} from '../../constants';



export const onChangeLoginAlertPasswordAct = (password) => {
    return ({ type: ONCHANGE_LOGIN_ALERT_PASSWORD, payload: password })
}


export const getLoginAlertUserAct = (event, ownProps) => async (dispatch, getState) => {
    event.preventDefault();
    const email = getState().authRdc.userEmail;
    const password = getState().authRdc.loginAlertPassword;
    let resStatus = 0;

    dispatch({ type: GET_LOGIN_ALERT_USER_PENDING });

    try {
        const token = await ownProps.googleReCaptchaProps.executeRecaptcha('login');
        dispatch({ type: GET_LOGIN_ALERT_CAPTCHA_TOKEN_SUCCESS, payload: token });
        fetch(`${API_PORT}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
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
                        return dispatch({ type: GET_LOGIN_ALERT_USER_SUCCESS, payload: res })
                    case 400:
                        return dispatch({ type: GET_LOGIN_ALERT_USER_FAILED, payload: res.errMessage })
                    case 500:
                        return dispatch({ type: GET_LOGIN_ALERT_USER_FAILED, payload: res.errMessage })
                    default:
                        return dispatch({ type: GET_LOGIN_ALERT_USER_FAILED, payload: 'Exceptional Error, please try again' })
                }
            })
            .catch(() => dispatch({ type: GET_LOGIN_ALERT_USER_FAILED, payload: 'Internal Server Error, please try again' }))

    } catch (err) {
        console.log({err});
        dispatch({
            type: GET_LOGIN_ALERT_CAPTCHA_TOKEN_FAILED,
            payload: { actionCode: 'Login', errMessage: 'Internal Server Error(Captcha), please try again' }
        });
    }
}


export const closeLoginAlertAct = () => {
    return ({ type: CLOSE_LOGIN_ALERT })
}

export const clearLoginAlertUserAct = () => {
    return ({ type: CLEAR_LOGIN_ALERT_USER })
}

export const loginAlertUserLogOutAct = () => {
    return ({ type: LOGIN_ALERT_USER_LOG_OUT })
};