import * as constants from '../constants';

const initialStateError = {
    isShowRequestErrAlert: false,
    requestErrMsg: "",
    isShowValidationErrAlert: false,
    ValidationErrMsg: "",
    isShowLoginAlert: false,
}

const alertRdc = (state = initialStateError, action = {}) => {
    switch (action.type) {
        case constants.REQUEST_BLOGLIST_FAILED:
            return Object.assign({}, state,
                {
                    isShowRequestErrAlert: true,
                    requestErrMsg: action.payload.errMessage
                })
        case constants.REQUEST_TAG_FAILED:
            return Object.assign({}, state,
                {
                    isShowRequestErrAlert: true,
                    requestErrMsg: action.payload.errMessage
                })
        case constants.SEARCH_TAG_FAILED:
            return Object.assign({}, state,
                {
                    isShowRequestErrAlert: true,
                    requestErrMsg: action.payload.errMessage
                })
        case constants.REQUEST_CATEGORY_FAILED:
            return Object.assign({}, state,
                {
                    isShowRequestErrAlert: true,
                    requestErrMsg: action.payload.errMessage
                })
        case constants.SEARCH_CATEGORY_FAILED:
            return Object.assign({}, state,
                {
                    isShowRequestErrAlert: true,
                    requestErrMsg: action.payload.errMessage
                })
        case constants.REQUEST_MENU1_FAILED:
            return Object.assign({}, state,
                {
                    isShowRequestErrAlert: true,
                    requestErrMsg: action.payload.errMessage
                })
        case constants.SEARCH_MENU1_FAILED:
            return Object.assign({}, state,
                {
                    isShowRequestErrAlert: true,
                    requestErrMsg: action.payload.errMessage
                })
        case constants.REQUEST_MENU2_FAILED:
            return Object.assign({}, state,
                {
                    isShowRequestErrAlert: true,
                    requestErrMsg: action.payload.errMessage
                })
        case constants.SEARCH_MENU2_FAILED:
            return Object.assign({}, state,
                {
                    isShowRequestErrAlert: true,
                    requestErrMsg: action.payload.errMessage
                })
        case constants.SEARCH_BLOGLIST_FAILED:
            return Object.assign({}, state,
                {
                    isShowRequestErrAlert: true,
                    requestErrMsg: action.payload.errMessage
                })
        case constants.CLOSE_REQUEST_ERROR_ALERT:
            return Object.assign({}, state,
                {
                    isShowRequestErrAlert: false,
                    requestErrMsg: ""
                })
        case constants.CLOSE_VALIDATION_ERROR_ALERT:
            return Object.assign({}, state,
                {
                    isShowValidationErrAlert: false,
                    ValidationErrMsg: ""
                })
        case constants.POST_USER_PENDING:
            return Object.assign({}, state, { isShowValidationErrAlert: false })
        case constants.POST_USER_FAILED:
            return Object.assign({}, state,
                {
                    isShowValidationErrAlert: true,
                    ValidationErrMsg: action.payload
                })
        case constants.GET_USER_PENDING:
            return Object.assign({}, state, { isShowValidationErrAlert: false })
        case constants.GET_USER_FAILED:
            return Object.assign({}, state,
                {
                    isShowValidationErrAlert: true,
                    ValidationErrMsg: action.payload
                })
        case constants.GET_LOGIN_ALERT_USER_PENDING:
            return Object.assign({}, state, { isShowValidationErrAlert: false })
        case constants.GET_LOGIN_ALERT_USER_SUCCESS:
            return Object.assign({}, state, { isShowLoginAlert: false })
        case constants.GET_LOGIN_ALERT_USER_FAILED:
            return Object.assign({}, state,
                {
                    isShowValidationErrAlert: true,
                    ValidationErrMsg: action.payload
                })
        case constants.GET_CAPTCHA_TOKEN_FAILED:
            return Object.assign({}, state,
                {
                    isShowValidationErrAlert: true,
                    ValidationErrMsg: action.payload.errMessage
                })
        case constants.GET_LOGIN_ALERT_CAPTCHA_TOKEN_FAILED:
            return Object.assign({}, state,
                {
                    isShowValidationErrAlert: true,
                    ValidationErrMsg: action.payload
                })
        /*----------user logout------------------*/
        case constants.USER_LOG_OUT:
            return Object.assign({}, state, initialStateError)
        /*-----------user login alert----------------------*/
        case constants.CLOSE_LOGIN_ALERT:
            return Object.assign({}, state, { isShowLoginAlert: false })
        /*---------session timeOut---------*/
        case constants.USER_START_SESSION:
            return Object.assign({}, state)
        case constants.USER_STOP_SESSION:
            return Object.assign({}, state)
        case constants.USER_SESSION_TIMEOUT:
            return Object.assign({}, state, { isShowLoginAlert: true })
        default:
            return state
    }
}

export default alertRdc;