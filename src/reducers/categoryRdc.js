import * as constants from '../constants';

const initialStateCategory = {
    categories: [],
    isRefreshCategoryNeeded: false,
    //request ctgs
    isPendingRequestCategory: false,
    isRequestCategoryFailed: false,
    //search ctgs
    searchCategoryName: "",
    searchCategoryDesc: "",
    //create ctgs
    isShowCreateCategory: false,
    createCategoryName: "",
    createCategoryDesc: "",
    createCategorySeq: "",
    isCreateCategoryNameValid: null,
    isCreateCategoryDescValid: true,
    isCreateCategorySeqValid: null,
    createCategoryNameErrMsg: "",
    createCategoryDescErrMsg: "",
    createCategorySeqErrMsg: "",
    isPendingPostCategory: false,
    //delete ctgs
    isShowDeleteCategory: false,
    deleteCategoryName: null,
    deleteCategoryID: null,
    isPendingDeleteCategory: false,
    isDeleteCategoryFailed: false,
    deleteCategoryErrMsg: "",
    //updat ctgs
    isShowUpdateCategory: false,
    isPendingUpdateCategory: false,
    isUpdateCategoryNameValid: true,
    isUpdateCategoryDescValid: true,
    isUpdateCategorySeqValid: true,
    updateCategoryID: "",
    updateCategoryName: "",
    updateCategoryDesc: "",
    updateCategorySeq: "",
    updateCategoryNameErrMsg: "",
    updateCategoryDescErrMsg: "",
    updateCategorySeqErrMsg: "",
}

const categoryRdc = (state = initialStateCategory, action = {}) => {
    switch (action.type) {
        /*------------------------------------------request ctgs---------------------------------------*/
        case constants.REQUEST_CATEGORY_PENDING:
            return Object.assign({}, state,
                { isPendingRequestCategory: true, isRequestCategoryFailed: false, isRefreshCategoryNeeded: false })
        case constants.REQUEST_CATEGORY_SUCCESS:
            return Object.assign({}, state,
                { isPendingRequestCategory: false, isRequestCategoryFailed: false, categories: action.payload })
        case constants.REQUEST_CATEGORY_FAILED:
            switch (action.payload.Code) {
                case 'INTERNAL_SERVER_ERROR_CATEGORY_REQUEST':
                    return Object.assign({}, state,
                        { isPendingRequestCategory: false, isRequestCategoryFailed: true })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        { isPendingRequestCategory: false, isRequestCategoryFailed: true })
                default://unhandled error
                    return Object.assign({}, state,
                        { error: action.payload, isPendingRequestCategory: false, isRequestCategoryFailed: true })
            }
        /*------------------------------------------search ctgs---------------------------------------*/
        case constants.ONCHANGE_SEARCH_CATEGORY_NAME:
            return Object.assign({}, state, { searchCategoryName: action.payload })
        case constants.ONCHANGE_SEARCH_CATEGORY_DESC:
            return Object.assign({}, state, { searchCategoryDesc: action.payload })
        case constants.SEARCH_CATEGORY_PENDING:
            return Object.assign({}, state, { isPendingRequestCategory: true, isRequestCategoryFailed: false })
        case constants.SEARCH_CATEGORY_SUCCESS:
            return Object.assign({}, state,
                {
                    isPendingRequestCategory: false, isRequestCategoryFailed: false,
                    categories: action.payload, isRefreshCategoryNeeded: false
                })
        case constants.SEARCH_CATEGORY_FAILED:
            switch (action.payload.Code) {
                case 'INTERNAL_SERVER_ERROR_CATEGORY_SEARCH':
                    return Object.assign({}, state,
                        { isPendingRequestCategory: false, isRequestCategoryFailed: true })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        { isPendingRequestCategory: false, isRequestCategoryFailed: true })
                default://unhandled error
                    return Object.assign({}, state,
                        { error: action.payload, isPendingRequestCategory: false, isRequestCategoryFailed: true })
            }
        case constants.CLEAR_SEARCH_CATEGORY:
            return Object.assign({}, state,
                {
                    isRefreshCategoryNeeded: true,
                    searchCategoryName: "",
                    searchCategoryDesc: ""
                })
        /*------------------------------------------create ctgs---------------------------------------*/
        case constants.POST_CATEGORY_SUCCESS:
            return Object.assign({}, state,
                {
                    isRefreshCategoryNeeded: true, isPendingPostCategory: false, isShowCreateCategory: false,
                    isCreateCategoryNameValid: null, createCategoryName: "", createCategoryNameErrMsg: "",
                    isCreateCategoryDescValid: true, createCategoryDesc: "", createCategoryDescErrMsg: "",
                    isCreateCategorySeqValid: null, createCategorySeq: "", createCategorySeqErrMsg: ""
                })
        case constants.POST_CATEGORY_FAILED:
            switch (action.payload.Code) {
                case 'CATEGORY_MANDATORY_FIELD':
                    return Object.assign({}, state,
                        {
                            isPendingPostCategory: false,
                            isCreateCategoryNameValid: false, createCategoryNameErrMsg: action.payload.errMessage,
                            isCreateCategorySeqValid: false, createCategorySeqErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_CATEGORY_CHECK_DUP':
                    return Object.assign({}, state,
                        {
                            isPendingPostCategory: false,
                            isCreateCategoryNameValid: false, createCategoryNameErrMsg: action.payload.errMessage,
                            isCreateCategoryDescValid: false, createCategoryDescErrMsg: action.payload.errMessage,
                            isCreateCategorySeqValid: false, createCategorySeqErrMsg: action.payload.errMessage
                        })
                case 'CATEGORY_DUPLICATE_CATEGORY_NAME':
                    return Object.assign({}, state,
                        {
                            isPendingPostCategory: false,
                            isCreateCategoryNameValid: false, createCategoryNameErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_CATEGORY_INSERT':
                    return Object.assign({}, state,
                        {
                            isPendingPostCategory: false,
                            isCreateCategoryNameValid: false, createCategoryNameErrMsg: action.payload.errMessage
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingPostCategory: false,
                            isCreateCategoryNameValid: false, createCategoryNameErrMsg: action.payload.errMessage,
                            isCreateCategoryDescValid: false, createCategoryDescErrMsg: action.payload.errMessage,
                            isCreateCategorySeqValid: false, createCategorySeqErrMsg: action.payload.errMessage
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        {
                            error: action.payload,
                            isPendingPostCategory: false,
                            createCategoryName: "",
                            createCategoryDesc: "",
                            createCategorySeq: "",
                            isCreateCategoryNameValid: null, createCategoryNameErrMsg: "",
                            isCreateCategoryDescValid: null, createCategoryDescErrMsg: "",
                            isCreateCategorySeqValid: null, createCategorySeqErrMsg: ""
                        })
            }
        case constants.ONCHANGE_CREATE_CATEGORY_NAME:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            createCategoryName: action.payload.categoryName,
                            createCategoryNameErrMsg: action.payload.errorMsg,
                            isCreateCategoryNameValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            createCategoryName: action.payload.categoryName,
                            createCategoryNameErrMsg: "",
                            isCreateCategoryNameValid: true
                        })
                default:
                    return state
            }
        case constants.ONCHANGE_CREATE_CATEGORY_DESC:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            createCategoryDesc: action.payload.categoryDesc,
                            createCategoryDescErrMsg: action.payload.errorMsg,
                            isCreateCategoryDescValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            createCategoryDesc: action.payload.categoryDesc,
                            createCategoryDescErrMsg: "",
                            isCreateCategoryDescValid: true
                        })
                default:
                    return state
            }
        case constants.ONCHANGE_CREATE_CATEGORY_SEQ:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            createCategorySeq: action.payload.categorySeq,
                            createCategorySeqErrMsg: action.payload.errorMsg,
                            isCreateCategorySeqValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            createCategorySeq: action.payload.categorySeq,
                            createCategorySeqErrMsg: "",
                            isCreateCategorySeqValid: true
                        })
                default:
                    return state
            }
        case constants.SELECT_CREATE_CATEGORY:
            return Object.assign({}, state, { isShowCreateCategory: true })
        case constants.CLOSE_CREATE_CATEGORY:
            return Object.assign({}, state,
                {
                    isShowCreateCategory: false,
                    isCreateCategoryNameValid: null, createCategoryName: "", createCategoryNameErrMsg: "",
                    isCreateCategoryDescValid: true, createCategoryDesc: "", createCategoryDescErrMsg: "",
                    isCreateCategorySeqValid: null, createCategorySeq: "", createCategorySeqErrMsg: ""
                })
        case constants.CLEAR_CREATE_CATEGORY:
            return Object.assign({}, state,
                {
                    isCreateCategoryNameValid: null, createCategoryName: "", createCategoryNameErrMsg: "",
                    isCreateCategoryDescValid: true, createCategoryDesc: "", createCategoryDescErrMsg: "",
                    isCreateCategorySeqValid: null, createCategorySeq: "", createCategorySeqErrMsg: ""
                })
        /*------------------------------------------delete ctgs---------------------------------------*/
        case constants.DELETE_CATEGORY_PENDING:
            return Object.assign({}, state, { isPendingDeleteCategory: true })
        case constants.DELETE_CATEGORY_SUCCESS:
            return Object.assign({}, state,
                {
                    isPendingDeleteCategory: false, isRefreshCategoryNeeded: true, isDeleteCategoryFailed: false,
                    isShowDeleteCategory: false, deleteCategoryName: null, deleteCategoryID: null
                })
        case constants.DELETE_CATEGORY_FAILED:
            switch (action.payload.Code) {
                case 'INTERNAL_SERVER_ERROR_CATEGORY_DELETE':
                    return Object.assign({}, state,
                        {
                            isPendingDeleteCategory: false,
                            isDeleteCategoryFailed: true,
                            deleteCategoryErrMsg: action.payload.errMessage
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingDeleteCategory: false,
                            isDeleteCategoryFailed: true,
                            deleteCategoryErrMsg: action.payload.errMessage
                        })
                case 'CATEGORY_FOREIGN_KEY_EXIST':
                    return Object.assign({}, state,
                        {
                            isPendingDeleteCategory: false,
                            isDeleteCategoryFailed: true,
                            deleteCategoryErrMsg: action.payload.errMessage
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        {
                            error: action.payload,
                            isPendingDeleteCategory: false,
                            isDeleteCategoryFailed: true
                        })
            }
        case constants.SELECT_DELETE_CATEGORY:
            return Object.assign({}, state,
                {
                    isShowDeleteCategory: true, deleteCategoryName: action.payload.deleteCategoryName,
                    deleteCategoryID: action.payload.deleteCategoryID
                })
        case constants.CLOSE_DELETE_CATEGORY:
            return Object.assign({}, state,
                {
                    isShowDeleteCategory: false, isDeleteCategoryFailed: false, deleteCategoryName: null,
                    deleteCategoryID: null, deleteCategoryErrMsg: null
                })
        /*------------------------------------------update ctgs---------------------------------------*/
        case constants.SELECT_UPDATE_CATEGORY:
            return Object.assign({}, state,
                {
                    isShowUpdateCategory: true,
                    updateCategoryID: action.payload.updateCategoryID,
                    updateCategoryName: action.payload.updateCategoryName,
                    updateCategoryDesc: action.payload.updateCategoryDesc,
                    updateCategorySeq: action.payload.updateCategorySeq
                })
        case constants.CLOSE_UPDATE_CATEGORY:
            return Object.assign({}, state,
                {
                    isShowUpdateCategory: false,
                    updateCategoryID: "",
                    updateCategoryName: "",
                    updateCategoryDesc: "",
                    updateCategorySeq: "",
                    isUpdateCategoryNameValid: true,
                    isUpdateCategoryDescValid: true,
                    isUpdateCategorySeqValid: true,
                    updateCategoryNameErrMsg: "",
                    updateCategoryDescErrMsg: "",
                    updateCategorySeqErrMsg: ""
                })
        case constants.ONCHANGE_UPDATE_CATEGORY_NAME:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            updateCategoryName: action.payload.categoryName,
                            updateCategoryNameErrMsg: action.payload.errorMsg,
                            isUpdateCategoryNameValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            updateCategoryName: action.payload.categoryName,
                            updateCategoryNameErrMsg: "",
                            isUpdateCategoryNameValid: true
                        })
                default:
                    return state
            }
        case constants.ONCHANGE_UPDATE_CATEGORY_DESC:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            updateCategoryDesc: action.payload.categoryDesc,
                            updateCategoryDescErrMsg: action.payload.errorMsg,
                            isUpdateCategoryDescValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            updateCategoryDesc: action.payload.categoryDesc,
                            updateCategoryDescErrMsg: "",
                            isUpdateCategoryDescValid: true
                        })
                default:
                    return state
            }
        case constants.ONCHANGE_UPDATE_CATEGORY_SEQ:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            updateCategorySeq: action.payload.categorySeq,
                            updateCategorySeqErrMsg: action.payload.errorMsg,
                            isUpdateCategorySeqValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            updateCategorySeq: action.payload.categorySeq,
                            updateCategorySeqErrMsg: "",
                            isUpdateCategorySeqValid: true
                        })
                default:
                    return state
            }
        case constants.UPDATE_CATEGORY_PENDING:
            return Object.assign({}, state, { isPendingUpdateCategory: true })
        case constants.UPDATE_CATEGORY_SUCCESS:
            return Object.assign({}, state,
                {
                    isRefreshCategoryNeeded: true, isPendingUpdateCategory: false, isShowUpdateCategory: false,
                    isUpdateCategoryNameValid: true, updateCategoryName: "", updateCategoryNameErrMsg: "",
                    isUpdateCategoryDescValid: true, updateCategoryDesc: "", updateCategoryDescErrMsg: "",
                    isUpdateCategorySeqValid: true, updateCategorySeq: "", updateCategorySeqErrMsg: ""
                })
        case constants.UPDATE_CATEGORY_FAILED:
            switch (action.payload.Code) {
                case 'CATEGORY_MANDATORY_FIELD':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateCategory: false,
                            isUpdateCategoryNameValid: false, updateCategoryNameErrMsg: action.payload.errMessage,
                            isUpdateCategorySeqValid: false, updateCategorySeqErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_CATEGORY_CHECK_DUP':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateCategory: false,
                            isUpdateCategoryNameValid: false, updateCategoryNameErrMsg: action.payload.errMessage
                        })
                case 'CATEGORY_DUPLICATE_CATEGORY_NAME':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateCategory: false,
                            isUpdateCategoryNameValid: false, updateCategoryNameErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_CATEGORY_UPDATE':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateCategory: false,
                            isUpdateCategoryNameValid: false, updateCategoryNameErrMsg: action.payload.errMessage,
                            isUpdateCategoryDescValid: false, updateCategoryDescErrMsg: action.payload.errMessage,
                            isUpdateCategorySeqValid: false, updateCategorySeqErrMsg: action.payload.errMessage
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateCategory: false,
                            isUpdateCategoryNameValid: false, updateCategoryNameErrMsg: action.payload.errMessage,
                            isUpdateCategoryDescValid: false, updateCategoryDescErrMsg: action.payload.errMessage,
                            isUpdateCategorySeqValid: false, updateCategorySeqErrMsg: action.payload.errMessage
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        {
                            error: action.payload,
                            isPendingUpdateCategory: false,
                            updateCategoryName: "",
                            updateCategoryDesc: "",
                            updateCategorySeq: "",
                            isUpdateCategoryNameValid: null, updateCategoryNameErrMsg: "",
                            isUpdateCategoryDescValid: null, updateCategoryDescErrMsg: "",
                            isUpdateCategorySeqValid: null, updateCategorySeqErrMsg: ""
                        })
            }
        /*----------user logout------------------*/
        case constants.USER_LOG_OUT:
            return Object.assign({}, state, initialStateCategory)
        default:
            return state
    }
}

export default categoryRdc;