import * as constants from '../constants';


const initialStateAuth = {
    isAuth: false,
    userID: null,
    userName: null,
    userEmail: null,
    captchaToken: null,
    token: null,
    expireTime: null,
    //login
    loginEmail: "",
    loginPassword: "",
    isPendingGetUser: false,
    isShowLoginAlert: false,
    //register
    registerUserName: "",
    registerEmail: "",
    registerPassword: "",
    isPendingPostUser: false,
    //login alert
    loginAlertPassword: "",
    isPendingGetLoginAlertUser: false,
}

const authRdc = (state = initialStateAuth, action = {}) => {
    switch (action.type) {
        /*---------------Google Captchat---------------------*/
        case constants.GET_CAPTCHA_TOKEN_SUCCESS:
            return Object.assign({}, state, { captchaToken: action.payload })
        case constants.GET_CAPTCHA_TOKEN_FAILED:
            switch (action.payload.actionCode) {
                case 'Login':
                    return Object.assign({}, state,
                        {
                            isAuth: false,
                            isPendingGetUser: false,
                            loginPassword: "",
                        })
                case 'Register':
                    return Object.assign({}, state,
                        {
                            isAuth: false,
                            isPendingPostUser: false,
                            registerPassword: "",
                        })
                default:
                    return state
            }
        case constants.GET_LOGIN_ALERT_CAPTCHA_TOKEN_SUCCESS:
            return Object.assign({}, state, { captchaToken: action.payload })
        case constants.GET_LOGIN_ALERT_CAPTCHA_TOKEN_FAILED:
            switch (action.payload.actionCode) {
                case 'Login':
                    return Object.assign({}, state,
                        {
                            isPendingGetLoginAlertUser: false,
                            loginAlertPassword: "",
                        })
                default:
                    return state
            }
        /*--------------Register User------------------------*/
        case constants.ONCHANGE_REG_USER_NAME:
            return Object.assign({}, state, { registerUserName: action.payload })
        case constants.ONCHANGE_REG_EMAIL:
            return Object.assign({}, state, { registerEmail: action.payload })
        case constants.ONCHANGE_REG_PASSWORD:
            return Object.assign({}, state, { registerPassword: action.payload })
        case constants.POST_USER_PENDING:
            return Object.assign({}, state, { isPendingPostUser: true })
        case constants.POST_USER_SUCCESS:
            return Object.assign({}, state,
                {
                    isAuth: true,
                    isPendingPostUser: false,
                    token: action.payload.access_token,
                    userID: action.payload.info.userID,
                    userName: action.payload.info.userName,
                    userEmail: action.payload.info.userEmail,
                    expireTime: action.payload.expires_in,
                })
        case constants.POST_USER_FAILED:
            return Object.assign({}, state,
                {
                    isAuth: false,
                    isPendingPostUser: false,
                    registerPassword: "",
                })
        case constants.CLEAR_REG_USER:
            return Object.assign({}, state,
                {
                    registerUserName: "",
                    registerEmail: "",
                    registerPassword: ""
                })
        /*--------------Login User------------------------*/
        case constants.ONCHANGE_LOGIN_EMAIL:
            return Object.assign({}, state, { loginEmail: action.payload })
        case constants.ONCHANGE_LOGIN_PASSWORD:
            return Object.assign({}, state, { loginPassword: action.payload })
        case constants.GET_USER_PENDING:
            return Object.assign({}, state, { isPendingGetUser: true })
        case constants.GET_USER_SUCCESS:
            return Object.assign({}, state,
                {
                    isAuth: true,
                    isPendingGetUser: false,
                    token: action.payload.access_token,
                    userID: action.payload.info.userID,
                    userName: action.payload.info.userName,
                    userEmail: action.payload.info.userEmail,
                    expireTime: action.payload.expires_in,
                })
        case constants.GET_USER_FAILED:
            return Object.assign({}, state,
                {
                    isAuth: false,
                    isPendingGetUser: false,
                    loginPassword: "",
                })
        case constants.CLEAR_LOGIN_USER:
            return Object.assign({}, state,
                {
                    loginEmail: "",
                    loginPassword: ""
                })
        /*----------------Login Alert User-----------------*/
        case constants.ONCHANGE_LOGIN_ALERT_PASSWORD:
            return Object.assign({}, state, { loginAlertPassword: action.payload })
        case constants.GET_LOGIN_ALERT_USER_PENDING:
            return Object.assign({}, state, { isPendingGetLoginAlertUser: true })
        case constants.GET_LOGIN_ALERT_USER_SUCCESS:
            return Object.assign({}, state,
                {
                    isPendingGetLoginAlertUser: false,
                    loginAlertPassword: "",
                    token: action.payload.access_token,
                    expireTime: action.payload.expires_in,
                })
        case constants.GET_LOGIN_ALERT_USER_FAILED:
            return Object.assign({}, state,
                {
                    isPendingGetLoginAlertUser: false,
                    loginAlertPassword: "",
                })
        case constants.CLEAR_LOGIN_ALERT_USER:
            return Object.assign({}, state,
                {
                    loginAlertPassword: ""
                })
        /*------------Log out User----------------*/
        case constants.USER_LOG_OUT:
            return Object.assign({}, state, initialStateAuth)
        case constants.LOGIN_ALERT_USER_LOG_OUT:
            return Object.assign({}, state, initialStateAuth)
        default:
            return state
    }
}

export default authRdc;