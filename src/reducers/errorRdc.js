import * as constants from '../constants';

const initialStateError = {
    isShowRequestErrAlert: false,
    requestErrMsg: "",
}

const errorRdc = (state = initialStateError, action = {}) => {
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
        default:
            return state
    }
}

export default errorRdc;