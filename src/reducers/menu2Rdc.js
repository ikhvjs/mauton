import * as constants from '../constants';

const initialStateMenu2 = {
    menu2: [],
    displayMenu2: [],
    selectedPage: 1,
    itemPerPage: 10,
    isRefreshMenu2Needed: false,
    isRefreshTopbarNeeded: false,
    //request Menu2
    isPendingRequestMenu2: false,
    isRequestMenu2Failed: false,
    //search Menu2
    searchMenu2Name: "",
    searchMenu2ParentName: "",
    //create Menu2
    isShowCreateMenu2: false,
    createMenu2Name: "",
    createMenu2ParentMenuID: "",
    createMenu2Seq: "",
    isCreateMenu2NameValid: null,
    isCreateMenu2ParentMenuIDValid: null,
    isCreateMenu2SeqValid: null,
    createMenu2NameErrMsg: "",
    createMenu2ParentMenuIDErrMsg: "",
    createMenu2SeqErrMsg: "",
    isPendingPostMenu2: false,
    //delete Menu2
    isShowDeleteMenu2: false,
    deleteMenu2Name: null,
    deleteMenu2ID: null,
    isPendingDeleteMenu2: false,
    isDeleteMenu2Failed: false,
    deleteMenu2ErrMsg: "",
    //update Menu2
    isShowUpdateMenu2: false,
    isPendingUpdateMenu2: false,
    isUpdateMenu2NameValid: true,
    isUpdateMenu2ParentMenuIDValid: true,
    isUpdateMenu2SeqValid: true,
    updateMenu2ID: "",
    updateMenu2Name: "",
    updateMenu2ParentMenuID: "",
    updateMenu2ParentName: "",
    updateMenu2Seq: "",
    updateMenu2NameErrMsg: "",
    updateMenu2ParentMenuIDErrMsg: "",
    updateMenu2SeqErrMsg: ""
}

const menu2Rdc = (state = initialStateMenu2, action = {}) => {
    switch (action.type) {
        /*------------------request Menu2----------------------- */
        case constants.REQUEST_MENU2_PENDING:
            return Object.assign({}, state,
                {
                    isPendingRequestMenu2: true,
                    isRequestMenu2Failed: false,
                    isRefreshMenu2Needed: false
                })
        case constants.REQUEST_MENU2_SUCCESS:
            return Object.assign({}, state,
                {
                    isPendingRequestMenu2: false,
                    isRequestMenu2Failed: false,
                    menu2: action.payload
                })
        case constants.REQUEST_MENU2_FAILED:
            switch (action.payload.Code) {
                case 'INTERNAL_SERVER_ERROR_MENU2_REQUEST':
                    return Object.assign({}, state,
                        {
                            isPendingRequestMenu2: false, isRequestMenu2Failed: true
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingRequestMenu2: false, isRequestMenu2Failed: true
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        { error: action.payload, isPendingRequestMenu2: false, isRequestMenu2Failed: true })
            }
        /*------------------search Menu2----------------------- */
        case constants.SEARCH_MENU2_PENDING:
            return Object.assign({}, state, { isPendingRequestMenu2: true, isRequestMenu2Failed: false })
        case constants.SEARCH_MENU2_SUCCESS:
            return Object.assign({}, state,
                { isPendingRequestMenu2: false, isRequestMenu2Failed: false, menu2: action.payload, isRefreshMenu2Needed: false })
        case constants.SEARCH_MENU2_FAILED:
            switch (action.payload.Code) {
                case 'INTERNAL_SERVER_ERROR_MENU2_SEARCH':
                    return Object.assign({}, state,
                        {
                            isPendingRequestMenu2: false, isRequestMenu2Failed: true
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingRequestMenu2: false, isRequestMenu2Failed: true
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        {
                            error: action.payload, isPendingRequestMenu2: false, isRequestMenu2Failed: true
                        })
            }
        case constants.ONCHANGE_SEARCH_MENU2_NAME:
            return Object.assign({}, state, { searchMenu2Name: action.payload })
        case constants.ONCHANGE_SEARCH_MENU2_PARENT_NAME:
            return Object.assign({}, state, { searchMenu2ParentName: action.payload })
        case constants.CLEAR_SEARCH_MENU2:
            return Object.assign({}, state,
                {
                    searchMenu2Name: "",
                    searchMenu2ParentName: "",
                    isRefreshMenu2Needed: true
                })
        /*--------------------------create Menu2------------------------------- */
        case constants.POST_MENU2_PENDING:
            return Object.assign({}, state, { isPendingPostMenu2: true })
        case constants.POST_MENU2_SUCCESS:
            return Object.assign({}, state,
                {
                    isRefreshMenu2Needed: true,
                    isPendingPostMenu2: false,
                    isShowCreateMenu2: false,
                    isCreateMenu2NameValid: null, createMenu2Name: "", createMenu2NameErrMsg: "",
                    isCreateMenu2ParentMenuIDValid: null, createMenu2ParentMenuID: "", createMenu2ParentMenuIDErrMsg: "",
                    isCreateMenu2SeqValid: null, createMenu2Seq: "", createMenu2SeqErrMsg: ""
                })
        case constants.POST_MENU2_FAILED:
            switch (action.payload.Code) {
                case 'MENU2_MANDATORY_FIELD':
                    return Object.assign({}, state,
                        {
                            isPendingPostMenu2: false,
                            isCreateMenu2NameValid: false, createMenu2NameErrMsg: action.payload.errMessage,
                            isCreateMenu2ParentMenuIDValid: false, createMenu2ParentMenuIDErrMsg: action.payload.errMessage,
                            isCreateMenu2SeqValid: false, createMenu2SeqErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_MENU2_CHECK_DUP':
                    return Object.assign({}, state,
                        {
                            isPendingPostMenu2: false,
                            isCreateMenu2NameValid: false, createMenu2NameErrMsg: action.payload.errMessage,
                            isCreateMenu2ParentMenuIDValid: false, createMenu2ParentMenuIDErrMsg: action.payload.errMessage,
                            isCreateMenu2SeqValid: false, createMenu2SeqErrMsg: action.payload.errMessage
                        })
                case 'MENU2_DUPLICATE_MENU2_NAME':
                    return Object.assign({}, state,
                        {
                            isPendingPostMenu2: false,
                            isCreateMenu2NameValid: false, createMenu2NameErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_MENU2_INSERT':
                    return Object.assign({}, state,
                        {
                            isPendingPostMenu2: false,
                            isCreateMenu2NameValid: false, createMenu2NameErrMsg: action.payload.errMessage
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingPostMenu2: false,
                            isCreateMenu2NameValid: false, createMenu2NameErrMsg: action.payload.errMessage,
                            isCreateMenu2ParentMenuIDValid: false, createMenu2ParentMenuIDErrMsg: action.payload.errMessage,
                            isCreateMenu2SeqValid: false, createMenu2SeqErrMsg: action.payload.errMessage
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        {
                            error: action.payload,
                            isPendingPostMenu2: false,
                            createMenu2Name: "",
                            createMenu2Seq: "",
                            isCreateMenu2NameValid: null, createMenu2NameErrMsg: "",
                            isCreateMenu2ParentMenuIDValid: null, createMenu2ParentMenuIDErrMsg: "",
                            isCreateMenu2SeqValid: null, createMenu2SeqErrMsg: ""
                        })
            }
        case constants.CLEAR_CREATE_MENU2:
            return Object.assign({}, state,
                {
                    isCreateMenu2NameValid: null, createMenu2Name: "", createMenu2NameErrMsg: "",
                    isCreateMenu2ParentMenuIDValid: null, createMenu2ParentMenuID: "", createMenu2ParentMenuIDErrMsg: "",
                    isCreateMenu2SeqValid: null, createMenu2Seq: "", createMenu2SeqErrMsg: ""
                })
        case constants.ONCHANGE_CREATE_MENU2_NAME:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            createMenu2Name: action.payload.menu2Name,
                            createMenu2NameErrMsg: action.payload.errorMsg,
                            isCreateMenu2NameValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            createMenu2Name: action.payload.menu2Name,
                            createMenu2NameErrMsg: "",
                            isCreateMenu2NameValid: true
                        })
                default:
                    return state
            }
        case constants.ONCHANGE_CREATE_MENU2_PARENT_NAME:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            createMenu2ParentMenuID: action.payload.menu2ParentMenuID,
                            createMenu2ParentMenuIDErrMsg: action.payload.errorMsg,
                            isCreateMenu2ParentMenuIDValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            createMenu2ParentMenuID: action.payload.menu2ParentMenuID,
                            createMenu2ParentMenuIDErrMsg: "",
                            isCreateMenu2ParentMenuIDValid: true
                        })
                default:
                    return state
            }
        case constants.ONCHANGE_CREATE_MENU2_SEQ:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            createMenu2Seq: action.payload.menu2Seq,
                            createMenu2SeqErrMsg: action.payload.errorMsg,
                            isCreateMenu2SeqValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            createMenu2Seq: action.payload.menu2Seq,
                            createMenu2SeqErrMsg: "",
                            isCreateMenu2SeqValid: true
                        })
                default:
                    return state
            }
        case constants.SELECT_CREATE_MENU2:
            return Object.assign({}, state, { isShowCreateMenu2: true })
        case constants.CLOSE_CREATE_MENU2:
            return Object.assign({}, state,
                {
                    isShowCreateMenu2: false,
                    createMenu2Name: "",
                    createMenu2ParentMenuID: "",
                    createMenu2Seq: "",
                    isCreateMenu2NameValid: null,
                    isCreateMenu2ParentMenuIDValid: null,
                    isCreateMenu2SeqValid: null
                })
        /*--------------------------delete Menu2------------------------------- */
        case constants.DELETE_MENU2_PENDING:
            return Object.assign({}, state, { isPendingDeleteMenu2: true, isRefreshTopbarNeeded: false })
        case constants.DELETE_MENU2_SUCCESS:
            return Object.assign({}, state,
                {
                    isPendingDeleteMenu2: false,
                    isRefreshMenu2Needed: true,
                    isRefreshTopbarNeeded: true,
                    isDeleteMenu2Failed: false,
                    isShowDeleteMenu2: false,
                    deleteMenu2Name: null,
                    deleteMenu2ID: null
                })
        case constants.DELETE_MENU2_FAILED:
            switch (action.payload.Code) {
                case 'INTERNAL_SERVER_ERROR_MENU2_DELETE':
                    return Object.assign({}, state,
                        {
                            isPendingDeleteMenu2: false,
                            isDeleteMenu2Failed: true,
                            deleteMenu2ErrMsg: action.payload.errMessage
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingDeleteMenu2: false,
                            isDeleteMenu2Failed: true,
                            deleteMenu2ErrMsg: action.payload.errMessage
                        })
                case 'MENU2_FOREIGN_KEY_EXIST':
                    return Object.assign({}, state,
                        {
                            isPendingDeleteMenu2: false,
                            isDeleteMenu2Failed: true,
                            deleteMenu2ErrMsg: action.payload.errMessage
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        {
                            error: action.payload,
                            isPendingDeleteMenu2: false,
                            isDeleteMenu2Failed: true
                        })
            }
        case constants.SELECT_DELETE_MENU2:
            return Object.assign({}, state,
                {
                    isShowDeleteMenu2: true,
                    deleteMenu2Name: action.payload.deleteMenu2Name,
                    deleteMenu2ID: action.payload.deleteMenu2ID
                })
        case constants.CLOSE_DELETE_MENU2:
            return Object.assign({}, state,
                {
                    isShowDeleteMenu2: false, isDeleteMenu2Failed: false, deleteMenu2Name: null,
                    deleteMenu2ID: null, deleteMenu2ErrMsg: null
                })
        /*--------------------------update Menu2------------------------------- */
        case constants.SELECT_UPDATE_MENU2:
            return Object.assign({}, state,
                {
                    isShowUpdateMenu2: true,
                    updateMenu2ID: action.payload.updateMenu2ID,
                    updateMenu2Name: action.payload.updateMenu2Name,
                    updateMenu2ParentMenuID: action.payload.updateMenu2ParentMenuID,
                    updateMenu2ParentName: action.payload.updateMenu2ParentName,
                    updateMenu2Seq: action.payload.updateMenu2Seq
                })
        case constants.CLOSE_UPDATE_MENU2:
            return Object.assign({}, state,
                {
                    isShowUpdateMenu2: false,
                    updateMenu2ID: "",
                    updateMenu2Name: "",
                    updateMenu2Seq: "",
                    isUpdateMenu2NameValid: true,
                    isUpdateMenu2ParentMenuIDValid: true,
                    isUpdateMenu2SeqValid: true,
                    updateMenu2NameErrMsg: "",
                    updateMenu2ParentMenuIDErrMsg: "",
                    updateMenu2SeqErrMsg: ""
                })
        case constants.ONCHANGE_UPDATE_MENU2_NAME:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            updateMenu2Name: action.payload.menu2Name,
                            updateMenu2NameErrMsg: action.payload.errorMsg,
                            isUpdateMenu2NameValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            updateMenu2Name: action.payload.menu2Name,
                            updateMenu2NameErrMsg: "",
                            isUpdateMenu2NameValid: true
                        })
                default:
                    return state
            }
        case constants.ONCHANGE_UPDATE_MENU2_PARENT_NAME:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            updateMenu2ParentMenuID: action.payload.menu2ParentMenuID,
                            updateMenu2ParentName: action.payload.menu2ParentName,
                            updateMenu2ParentMenuIDErrMsg: action.payload.errorMsg,
                            isUpdateMenu2ParentMenuIDValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            updateMenu2ParentMenuID: action.payload.menu2ParentMenuID,
                            updateMenu2ParentMenuIDErrMsg: "",
                            isUpdateMenu2ParentMenuIDValid: true
                        })
                default:
                    return state
            }
        case constants.ONCHANGE_UPDATE_MENU2_SEQ:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            updateMenu2Seq: action.payload.menu2Seq,
                            updateMenu2SeqErrMsg: action.payload.errorMsg,
                            isUpdateMenu2SeqValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            updateMenu2Seq: action.payload.menu2Seq,
                            updateMenu2SeqErrMsg: "",
                            isUpdateMenu2SeqValid: true
                        })
                default:
                    return state
            }
        case constants.UPDATE_MENU2_PENDING:
            return Object.assign({}, state, { isPendingUpdateMenu2: true })
        case constants.UPDATE_MENU2_SUCCESS:
            return Object.assign({}, state,
                {
                    isRefreshMenu2Needed: true,
                    isPendingUpdateMenu2: false,
                    isShowUpdateMenu2: false,
                    isUpdateMenu2NameValid: true, updateMenu2Name: "", updateMenu2NameErrMsg: "",
                    isUpdateMenu2ParentMenuIDValid: true, updateMenu2ParentMenuID: "", updateMenu2ParentMenuIDErrMsg: "",
                    isUpdateMenu2SeqValid: true, updateMenu2Seq: "", updateMenu2SeqErrMsg: ""
                })
        case constants.UPDATE_MENU2_FAILED:
            switch (action.payload.Code) {
                case 'MENU2_MANDATORY_FIELD':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateMenu2: false,
                            isUpdateMenu2NameValid: false, updateMenu2NameErrMsg: action.payload.errMessage,
                            isUpdateMenu2ParentMenuIDValid: false, updateMenu2ParentMenuIDErrMsg: action.payload.errMessage,
                            isUpdateMenu2SeqValid: false, updateMenu2SeqErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_MENU2_CHECK_DUP':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateMenu2: false,
                            isUpdateMenu2NameValid: false, updateMenu2NameErrMsg: action.payload.errMessage,
                            isUpdateMenu2ParentMenuIDValid: false, updateMenu2ParentMenuIDErrMsg: action.payload.errMessage,
                            isUpdateMenu2SeqValid: false, updateMenu2SeqErrMsg: action.payload.errMessage
                        })
                case 'MENU2_DUPLICATE_MENU2_NAME':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateMenu2: false,
                            isUpdateMenu2NameValid: false, updateMenu2NameErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_MENU2_UPDATE':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateMenu2: false,
                            isUpdateMenu2NameValid: false, updateMenu2NameErrMsg: action.payload.errMessage,
                            isUpdateMenu2ParentMenuIDValid: false, updateMenu2ParentMenuIDErrMsg: action.payload.errMessage,
                            isUpdateMenu2SeqValid: false, updateMenu2SeqErrMsg: action.payload.errMessage
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateMenu2: false,
                            isUpdateMenu2NameValid: false, updateMenu2NameErrMsg: action.payload.errMessage,
                            isUpdateMenu2ParentMenuIDValid: false, updateMenu2ParentMenuIDErrMsg: action.payload.errMessage,
                            isUpdateMenu2SeqValid: false, updateMenu2SeqErrMsg: action.payload.errMessage
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        {
                            error: action.payload,
                            isPendingUpdateMenu2: false,
                            updateMenu2Name: "",
                            updateMenu2ParentMenuID: "",
                            updateMenu2Seq: "",
                            isUpdateMenu2NameValid: null, updateMenu2NameErrMsg: "",
                            isUpdateMenu2ParentMenuIDValid: null, updateMenu2ParentMenuIDErrMsg: "",
                            isUpdateMenu2SeqValid: null, updateMenu2SeqErrMsg: ""
                        })
            }
        /*--------select page--------------*/
        case constants.SET_MENU2_PAGE:
            return Object.assign({}, state,
                {
                    displayMenu2: action.payload.displayMenu2,
                    selectedPage: action.payload.selectedPage
                })
        /*----------user logout------------------*/
        case constants.USER_LOG_OUT:
            return Object.assign({}, state, initialStateMenu2)
        default:
            return state
    }
}

export default menu2Rdc;