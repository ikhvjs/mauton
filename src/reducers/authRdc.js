import * as constants from '../constants';


const initialStateAuth = {
    isAuth: false,
    userID: null,
    userName: null,
    captchaToken: null,
    token: null,
    isShowAlert: false,
    alertMessage: null,
    //login
    loginEmail: "",
    loginPassword: "",
    isPendingGetUser: false,
    //register
    registerUserName: "",
    registerEmail: "",
    registerPassword: "",
    isPendingPostUser: false,
}

const authRdc = (state = initialStateAuth, action = {}) => {
    switch (action.type) {
        case constants.GET_CAPTCHA_TOKEN_SUCCESS:
            return Object.assign({}, state, { captchaToken: action.payload })
        case constants.GET_CAPTCHA_TOKEN_FAILED:
            switch (action.payload.actionCode) {
                case 'Login':
                    return Object.assign({}, state,
                        {
                            isAuth: false,
                            isPendingGetUser: false,
                            alertMessage: action.payload.errMessage,
                            onChangePassword: "",
                            isShowAlert: true
                        })
                case 'Register':
                    return Object.assign({}, state,
                        {
                            isAuth: false,
                            isPendingPostUser: false,
                            alertMessage: action.payload.errMessage,
                            onChangePassword: "",
                            isShowAlert: true
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
            return Object.assign({}, state, { isPendingPostUser: true, isShowAlert: false })
        case constants.POST_USER_SUCCESS:
            return Object.assign({}, state,
                {
                    isAuth: true,
                    isPendingPostUser: false,
                    token: action.payload.access_token,
                    userID: action.payload.info.userID,
                    userName: action.payload.info.userName,
                })
        case constants.POST_USER_FAILED:
            return Object.assign({}, state,
                {
                    isAuth: false,
                    isPendingPostUser: false,
                    alertMessage: action.payload,
                    registerPassword: "",
                    isShowAlert: true
                })
        case constants.CLOSE_REG_ALERT:
            return Object.assign({}, state, { isShowAlert: false })
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
            return Object.assign({}, state, { isPendingGetUser: true, isShowAlert: false })
        case constants.GET_USER_SUCCESS:
            return Object.assign({}, state,
                {
                    isAuth: true,
                    isPendingGetUser: false,
                    token: action.payload.access_token,
                    userID: action.payload.info.userID,
                    userName: action.payload.info.userName,
                })
        case constants.GET_USER_FAILED:
            return Object.assign({}, state,
                {
                    isAuth: false,
                    isPendingGetUser: false,
                    alertMessage: action.payload,
                    loginPassword: "",
                    isShowAlert: true
                })
        case constants.CLEAR_LOGIN_USER:
            return Object.assign({}, state,
                {
                    loginEmail: "",
                    loginPassword: ""
                })
        /*------------Log out User----------------*/
        case constants.USER_LOG_OUT:
            return Object.assign({}, state,
                {
                    isAuth: false,
                    userID: null,
                    userName: null
                })
        default:
            return state
    }
}

export default authRdc;