import * as constants from '../constants';

const initialStateMenu1 = {
    menu1: [],
    displayMenu1: [],
    selectedPage: 1,
    itemPerPage: 10,
    isRefreshMenu1Needed: false,
    isRefreshTopbarNeeded: false,
    //request Menu1
    isPendingRequestMenu1: false,
    isRequestMenu1Failed: false,
    //search Menu1
    searchMenu1Name: "",
    //create Menu1
    isShowCreateMenu1: false,
    createMenu1Name: "",
    createMenu1Seq: "",
    isCreateMenu1NameValid: null,
    isCreateMenu1SeqValid: null,
    createMenu1NameErrMsg: "",
    createMenu1SeqErrMsg: "",
    isPendingPostMenu1: false,
    //delete Menu1
    isShowDeleteMenu1: false,
    deleteMenu1Name: null,
    deleteMenu1ID: null,
    isPendingDeleteMenu1: false,
    isDeleteMenu1Failed: false,
    deleteMenu1ErrMsg: "",
    //update Menu1
    isShowUpdateMenu1: false,
    isPendingUpdateMenu1: false,
    isUpdateMenu1NameValid: true,
    isUpdateMenu1SeqValid: true,
    updateMenu1ID: "",
    updateMenu1Name: "",
    updateMenu1NameErrMsg: "",
    updateMenu1Seq: "",
    updateMenu1SeqErrMsg: "",
}

const menu1Rdc = (state = initialStateMenu1, action = {}) => {
    switch (action.type) {
        /*------------------request Menu1----------------------- */
        case constants.REQUEST_MENU1_PENDING:
            return Object.assign({}, state,
                {
                    isPendingRequestMenu1: true,
                    isRequestMenu1Failed: false,
                    isRefreshMenu1Needed: false
                })
        case constants.REQUEST_MENU1_SUCCESS:
            return Object.assign({}, state,
                {
                    isPendingRequestMenu1: false,
                    isRequestMenu1Failed: false,
                    menu1: action.payload
                })
        case constants.REQUEST_MENU1_FAILED:
            switch (action.payload.Code) {
                case 'INTERNAL_SERVER_ERROR_MENU1_REQUEST':
                    return Object.assign({}, state,
                        { isPendingRequestMenu1: false, isRequestMenu1Failed: true })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        { isPendingRequestMenu1: false, isRequestMenu1Failed: true })
                default://unhandled error
                    return Object.assign({}, state,
                        { error: action.payload, isPendingRequestMenu1: false, isRequestMenu1Failed: true })
            }
        /*------------------search Menu1----------------------- */
        case constants.SEARCH_MENU1_PENDING:
            return Object.assign({}, state, { isPendingRequestMenu1: true, isRequestMenu1Failed: false })
        case constants.SEARCH_MENU1_SUCCESS:
            return Object.assign({}, state,
                { isPendingRequestMenu1: false, isRequestMenu1Failed: false, menu1: action.payload, isRefreshMenu1Needed: false })
        case constants.SEARCH_MENU1_FAILED:
            switch (action.payload.Code) {
                case 'INTERNAL_SERVER_ERROR_MENU1_SEARCH':
                    return Object.assign({}, state,
                        { isPendingRequestMenu1: false, isRequestMenu1Failed: true })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        { isPendingRequestMenu1: false, isRequestMenu1Failed: true })
                default://unhandled error
                    return Object.assign({}, state,
                        { error: action.payload, isPendingRequestMenu1: false, isRequestMenu1Failed: true })
            }
        case constants.ONCHANGE_SEARCH_MENU1_NAME:
            return Object.assign({}, state, { searchMenu1Name: action.payload })
        case constants.CLEAR_SEARCH_MENU1:
            return Object.assign({}, state,
                {
                    searchMenu1Name: "",
                    isRefreshMenu1Needed: true
                })
        /*--------------------------create menu1------------------------------- */
        case constants.POST_MENU1_PENDING:
            return Object.assign({}, state, { isPendingPostMenu1: true, isRefreshTopbarNeeded: false })
        case constants.POST_MENU1_SUCCESS:
            return Object.assign({}, state,
                {
                    isRefreshMenu1Needed: true,
                    isRefreshTopbarNeeded: true,
                    isPendingPostMenu1: false,
                    isShowCreateMenu1: false,
                    isCreateMenu1NameValid: null, createMenu1Name: "", createMenu1NameErrMsg: "",
                    isCreateMenu1SeqValid: null, createMenu1Seq: "", createMenu1SeqErrMsg: ""
                })
        case constants.POST_MENU1_FAILED:
            switch (action.payload.Code) {
                case 'MENU1_MANDATORY_FIELD':
                    return Object.assign({}, state,
                        {
                            isPendingPostMenu1: false,
                            isCreateMenu1NameValid: false, createMenu1NameErrMsg: action.payload.errMessage,
                            isCreateMenu1SeqValid: false, createMenu1SeqErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_MENU1_CHECK_DUP':
                    return Object.assign({}, state,
                        {
                            isPendingPostMenu1: false,
                            isCreateMenu1NameValid: false, createMenu1NameErrMsg: action.payload.errMessage,
                            isCreateMenu1SeqValid: false, createMenu1SeqErrMsg: action.payload.errMessage
                        })
                case 'MENU1_DUPLICATE_MENU1_NAME':
                    return Object.assign({}, state,
                        {
                            isPendingPostMenu1: false,
                            isCreateMenu1NameValid: false, createMenu1NameErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_MENU1_INSERT':
                    return Object.assign({}, state,
                        {
                            isPendingPostMenu1: false,
                            isCreateMenu1NameValid: false, createMenu1NameErrMsg: action.payload.errMessage
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingPostMenu1: false,
                            isCreateMenu1NameValid: false, createMenu1NameErrMsg: action.payload.errMessage,
                            isCreateMenu1SeqValid: false, createMenu1SeqErrMsg: action.payload.errMessage
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        {
                            error: action.payload,
                            isPendingPostMenu1: false,
                            createMenu1Name: "",
                            createMenu1Seq: "",
                            isCreateMenu1NameValid: null, createMenu1NameErrMsg: "",
                            isCreateMenu1SeqValid: null, createMenu1SeqErrMsg: ""
                        })
            }
        case constants.CLEAR_CREATE_MENU1:
            return Object.assign({}, state,
                {
                    isCreateMenu1NameValid: null, createMenu1Name: "", createMenu1NameErrMsg: "",
                    isCreateMenu1SeqValid: null, createMenu1Seq: "", createMenu1SeqErrMsg: ""
                })
        case constants.ONCHANGE_CREATE_MENU1_NAME:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            createMenu1Name: action.payload.menu1Name,
                            createMenu1NameErrMsg: action.payload.errorMsg,
                            isCreateMenu1NameValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            createMenu1Name: action.payload.menu1Name,
                            createMenu1NameErrMsg: "",
                            isCreateMenu1NameValid: true
                        })
                default:
                    return state
            }
        case constants.ONCHANGE_CREATE_MENU1_SEQ:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            createMenu1Seq: action.payload.menu1Seq,
                            createMenu1SeqErrMsg: action.payload.errorMsg,
                            isCreateMenu1SeqValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            createMenu1Seq: action.payload.menu1Seq,
                            createMenu1SeqErrMsg: "",
                            isCreateMenu1SeqValid: true
                        })
                default:
                    return state
            }
        case constants.SELECT_CREATE_MENU1:
            return Object.assign({}, state, { isShowCreateMenu1: true })
        case constants.CLOSE_CREATE_MENU1:
            return Object.assign({}, state,
                {
                    isShowCreateMenu1: false,
                    createMenu1Name: "",
                    createMenu1Seq: "",
                    isCreateMenu1NameValid: null,
                    isCreateMenu1SeqValid: null
                })
        /*--------------------------delete menu1------------------------------- */
        case constants.DELETE_MENU1_PENDING:
            return Object.assign({}, state, { isPendingDeleteMenu1: true, isRefreshTopbarNeeded: false })
        case constants.DELETE_MENU1_SUCCESS:
            return Object.assign({}, state,
                {
                    isPendingDeleteMenu1: false,
                    isRefreshMenu1Needed: true,
                    isRefreshTopbarNeeded: true,
                    isDeleteMenu1Failed: false,
                    isShowDeleteMenu1: false,
                    deleteMenu1Name: null,
                    deleteMenu1ID: null
                })
        case constants.DELETE_MENU1_FAILED:
            switch (action.payload.Code) {
                case 'INTERNAL_SERVER_ERROR_MENU1_DELETE':
                    return Object.assign({}, state,
                        {
                            isPendingDeleteMenu1: false,
                            isDeleteMenu1Failed: true,
                            deleteMenu1ErrMsg: action.payload.errMessage
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingDeleteMenu1: false,
                            isDeleteMenu1Failed: true,
                            deleteMenu1ErrMsg: action.payload.errMessage
                        })
                case 'MENU1_FOREIGN_KEY_EXIST':
                    return Object.assign({}, state,
                        {
                            isPendingDeleteMenu1: false,
                            isDeleteMenu1Failed: true,
                            deleteMenu1ErrMsg: action.payload.errMessage
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        {
                            error: action.payload,
                            isPendingDeleteMenu1: false,
                            isDeleteMenu1Failed: true
                        })
            }
        case constants.SELECT_DELETE_MENU1:
            return Object.assign({}, state,
                { isShowDeleteMenu1: true, deleteMenu1Name: action.payload.deleteMenu1Name, deleteMenu1ID: action.payload.deleteMenu1ID })
        case constants.CLOSE_DELETE_MENU1:
            return Object.assign({}, state,
                {
                    isShowDeleteMenu1: false, isDeleteMenu1Failed: false, deleteMenu1Name: null,
                    deleteMenu1ID: null, deleteMenu1ErrMsg: null
                })
        /*--------------------------update menu1------------------------------- */
        case constants.SELECT_UPDATE_MENU1:
            return Object.assign({}, state,
                {
                    isShowUpdateMenu1: true,
                    updateMenu1ID: action.payload.updateMenu1ID,
                    updateMenu1Name: action.payload.updateMenu1Name,
                    updateMenu1Seq: action.payload.updateMenu1Seq
                })
        case constants.CLOSE_UPDATE_MENU1:
            return Object.assign({}, state,
                {
                    isShowUpdateMenu1: false,
                    updateMenu1ID: "",
                    updateMenu1Name: "",
                    updateMenu1Seq: "",
                    isUpdateMenu1NameValid: true,
                    isUpdateMenu1SeqValid: true,
                    updateMenu1NameErrMsg: "",
                    updateMenu1SeqErrMsg: ""
                })
        case constants.ONCHANGE_UPDATE_MENU1_NAME:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            updateMenu1Name: action.payload.menu1Name,
                            updateMenu1NameErrMsg: action.payload.errorMsg,
                            isUpdateMenu1NameValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            updateMenu1Name: action.payload.menu1Name,
                            updateMenu1NameErrMsg: "",
                            isUpdateMenu1NameValid: true
                        })
                default:
                    return state
            }
        case constants.ONCHANGE_UPDATE_MENU1_SEQ:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            updateMenu1Seq: action.payload.menu1Seq,
                            updateMenu1SeqErrMsg: action.payload.errorMsg,
                            isUpdateMenu1SeqValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            updateMenu1Seq: action.payload.menu1Seq,
                            updateMenu1SeqErrMsg: "",
                            isUpdateMenu1SeqValid: true
                        })
                default:
                    return state
            }
        case constants.UPDATE_MENU1_PENDING:
            return Object.assign({}, state, { isPendingUpdateMenu1: true, isRefreshTopbarNeeded: false })
        case constants.UPDATE_MENU1_SUCCESS:
            return Object.assign({}, state,
                {
                    isRefreshMenu1Needed: true,
                    isRefreshTopbarNeeded: true,
                    isPendingUpdateMenu1: false,
                    isShowUpdateMenu1: false,
                    isUpdateMenu1NameValid: true, updateMenu1Name: "", updateMenu1NameErrMsg: "",
                    isUpdateMenu1SeqValid: true, updateMenu1Seq: "", updateMenu1SeqErrMsg: ""
                })
        case constants.UPDATE_MENU1_FAILED:
            switch (action.payload.Code) {
                case 'MENU1_MANDATORY_FIELD':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateMenu1: false,
                            isUpdateMenu1NameValid: false, updateMenu1NameErrMsg: action.payload.errMessage,
                            isUpdateMenu1SeqValid: false, updateMenu1SeqErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_MENU1_CHECK_DUP':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateMenu1: false,
                            isUpdateMenu1NameValid: false, updateMenu1NameErrMsg: action.payload.errMessage,
                            isUpdateMenu1SeqValid: false, updateMenu1SeqErrMsg: action.payload.errMessage
                        })
                case 'MENU1_DUPLICATE_MENU1_NAME':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateMenu1: false,
                            isUpdateMenu1NameValid: false, updateMenu1NameErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_MENU1_UPDATE':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateMenu1: false,
                            isUpdateMenu1NameValid: false, updateMenu1NameErrMsg: action.payload.errMessage,
                            isUpdateMenu1SeqValid: false, updateMenu1SeqErrMsg: action.payload.errMessage
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateMenu1: false,
                            isUpdateMenu1NameValid: false, updateMenu1NameErrMsg: action.payload.errMessage,
                            isUpdateMenu1SeqValid: false, updateMenu1SeqErrMsg: action.payload.errMessage
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        {
                            error: action.payload,
                            isPendingUpdateMenu1: false,
                            updateMenu1Name: "",
                            updateMenu1Seq: "",
                            isUpdateMenu1NameValid: null, updateMenu1NameErrMsg: "",
                            isUpdateMenu1SeqValid: null, updateMenu1SeqErrMsg: ""
                        })
            }
        /*--------select page--------------*/
        case constants.SET_MENU1_PAGE:
            return Object.assign({}, state,
                {
                    displayMenu1: action.payload.displayMenu1,
                    selectedPage: action.payload.selectedPage
                })
        /*----------user logout------------------*/
        case constants.USER_LOG_OUT:
            return Object.assign({}, state, initialStateMenu1)
        default:
            return state
    }
}

export default menu1Rdc;