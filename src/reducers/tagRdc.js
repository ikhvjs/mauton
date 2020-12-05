import * as constants from '../constants';

const initialStateTag = {
    tags: [],
    displayTags: [],
    selectedPage: 1,
    itemPerPage: 3,
    //request tag
    isPendingRequestTag: false,
    isRequestTagFailed: false,
    isRefreshTagNeeded: false,
    //search tag
    searchTagName: "",
    //create tag
    isShowCreateTag: false,
    createTagName: "",
    createTagSeq: "",
    isCreateTagNameValid: null,
    isCreateTagSeqValid: null,
    createTagNameErrMsg: "",
    createTagSeqErrMsg: "",
    isPendingPostTag: false,
    //delete tag
    isShowDeleteTag: false,
    deleteTagName: null,
    deleteTagID: null,
    isPendingDeleteTag: false,
    isDeleteTagFailed: false,
    deleteTagErrMsg: "",
    //update tag
    isShowUpdateTag: false,
    isPendingUpdateTag: false,
    isUpdateTagNameValid: true,
    isUpdateTagSeqValid: true,
    updateTagID: "",
    updateTagName: "",
    updateTagNameErrMsg: "",
    updateTagSeq: "",
    updateTagSeqErrMsg: "",
}

const tagRdc = (state = initialStateTag, action = {}) => {
    switch (action.type) {
        /*------------------------------------------request tag---------------------------------------*/
        case constants.REQUEST_TAG_PENDING:
            return Object.assign({}, state, { isPendingRequestTag: true, isRequestTagFailed: false, isRefreshTagNeeded: false })
        case constants.REQUEST_TAG_SUCCESS:
            return Object.assign({}, state, { isPendingRequestTag: false, isRequestTagFailed: false, tags: action.payload })
        case constants.REQUEST_TAG_FAILED:
            switch (action.payload.Code) {
                case 'INTERNAL_SERVER_ERROR_TAG_REQUEST':
                    return Object.assign({}, state,
                        { isPendingRequestTag: false, isRequestTagFailed: true })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        { isPendingRequestTag: false, isRequestTagFailed: true })
                default://unhandled error
                    return Object.assign({}, state,
                        { error: action.payload, isPendingRequestTag: false, isRequestTagFailed: true })
            }
        /*------------------------------------------search tag---------------------------------------*/
        case constants.SEARCH_TAG_PENDING:
            return Object.assign({}, state, { isPendingRequestTag: true, isRequestTagFailed: false })
        case constants.SEARCH_TAG_SUCCESS:
            return Object.assign({}, state,
                { isPendingRequestTag: false, isRequestTagFailed: false, tags: action.payload, isRefreshTagNeeded: false })
        case constants.SEARCH_TAG_FAILED:
            switch (action.payload.Code) {
                case 'INTERNAL_SERVER_ERROR_TAG_SEARCH':
                    return Object.assign({}, state,
                        { isPendingRequestTag: false, isRequestTagFailed: true })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        { isPendingRequestTag: false, isRequestTagFailed: true })
                default://unhandled error
                    return Object.assign({}, state,
                        { error: action.payload, isPendingRequestTag: false })
            }
        case constants.ONCHANGE_SEARCH_TAG_NAME:
            return Object.assign({}, state, { searchTagName: action.payload })
        case constants.CLEAR_SEARCH_TAG:
            return Object.assign({}, state, { searchTagName: "", isRefreshTagNeeded: true })
        /*------------------------------------------create tag---------------------------------------*/
        case constants.POST_TAG_PENDING:
            return Object.assign({}, state, { isPendingPostTag: true })
        case constants.POST_TAG_SUCCESS:
            return Object.assign({}, state,
                {
                    isRefreshTagNeeded: true, isPendingPostTag: false, isShowCreateTag: false,
                    isCreateTagNameValid: null, createTagName: "", createTagNameErrMsg: "",
                    isCreateTagSeqValid: null, createTagSeq: "", createTagSeqErrMsg: ""
                })
        case constants.POST_TAG_FAILED:
            switch (action.payload.Code) {
                case 'TAG_MANDATORY_FIELD':
                    return Object.assign({}, state,
                        {
                            isPendingPostTag: false,
                            isCreateTagNameValid: false, createTagNameErrMsg: action.payload.errMessage,
                            isCreateTagSeqValid: false, createTagSeqErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_TAG_CHECK_DUP':
                    return Object.assign({}, state,
                        {
                            isPendingPostTag: false,
                            isCreateTagNameValid: false, createTagNameErrMsg: action.payload.errMessage,
                            isCreateTagSeqValid: false, createTagSeqErrMsg: action.payload.errMessage
                        })
                case 'TAG_DUPLICATE_TAG_NAME':
                    return Object.assign({}, state,
                        {
                            isPendingPostTag: false,
                            isCreateTagNameValid: false, createTagNameErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_TAG_INSERT':
                    return Object.assign({}, state,
                        {
                            isPendingPostTag: false,
                            isCreateTagNameValid: false, createTagNameErrMsg: action.payload.errMessage
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingPostTag: false,
                            isCreateTagNameValid: false, createTagNameErrMsg: action.payload.errMessage,
                            isCreateTagSeqValid: false, createTagSeqErrMsg: action.payload.errMessage
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        {
                            error: action.payload,
                            isPendingPostTag: false,
                            createTagName: "",
                            createTagSeq: "",
                            isCreateTagNameValid: null, createTagNameErrMsg: "",
                            isCreateTagSeqValid: null, createTagSeqErrMsg: ""
                        })
            }
        case constants.CLEAR_CREATE_TAG:
            return Object.assign({}, state,
                {
                    isCreateTagNameValid: null, createTagName: "", createTagNameErrMsg: "",
                    isCreateTagSeqValid: null, createTagSeq: "", createTagSeqErrMsg: ""
                })
        case constants.ONCHANGE_CREATE_TAG_NAME:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        { createTagName: action.payload.tagName, createTagNameErrMsg: action.payload.errorMsg, isCreateTagNameValid: false })
                case true:
                    return Object.assign({}, state,
                        { createTagName: action.payload.tagName, isCreateTagNameValid: true })
                default:
                    return state
            }
        case constants.ONCHANGE_CREATE_TAG_SEQ:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            createTagSeq: action.payload.tagSeq,
                            createTagSeqErrMsg: action.payload.errorMsg,
                            isCreateTagSeqValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            createTagSeq: action.payload.tagSeq,
                            createTagSeqErrMsg: "",
                            isCreateTagSeqValid: true
                        })
                default:
                    return state
            }
        case constants.SELECT_CREATE_TAG:
            return Object.assign({}, state, { isShowCreateTag: true })
        case constants.CLOSE_CREATE_TAG:
            return Object.assign({}, state,
                {
                    isShowCreateTag: false,
                    createTagName: "",
                    createTagSeq: "",
                    isCreateTagNameValid: null,
                    isCreateTagSeqValid: null
                })
        /*------------------------------------------delete tag---------------------------------------*/
        case constants.DELETE_TAG_PENDING:
            return Object.assign({}, state, { isPendingDeleteTag: true })
        case constants.DELETE_TAG_SUCCESS:
            return Object.assign({}, state,
                {
                    isPendingDeleteTag: false, isRefreshTagNeeded: true, isDeleteTagFailed: false,
                    isShowDeleteTag: false, deleteTagName: null, deleteTagID: null
                })
        case constants.DELETE_TAG_FAILED:
            switch (action.payload.Code) {
                case 'INTERNAL_SERVER_ERROR_TAG_DELETE':
                    return Object.assign({}, state,
                        {
                            isPendingDeleteTag: false,
                            isDeleteTagFailed: true,
                            deleteTagErrMsg: action.payload.errMessage
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingDeleteTag: false,
                            isDeleteTagFailed: true,
                            deleteTagErrMsg: action.payload.errMessage
                        })
                case 'TAG_FOREIGN_KEY_EXIST':
                    return Object.assign({}, state,
                        {
                            isPendingDeleteTag: false,
                            isDeleteTagFailed: true,
                            deleteTagErrMsg: action.payload.errMessage
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        {
                            error: action.payload,
                            isPendingDeleteTag: false,
                            isDeleteTagFailed: true
                        })
            }
        case constants.SELECT_DELETE_TAG:
            return Object.assign({}, state,
                { isShowDeleteTag: true, deleteTagName: action.payload.deleteTagName, deleteTagID: action.payload.deleteTagID })
        case constants.CLOSE_DELETE_TAG:
            return Object.assign({}, state,
                {
                    isShowDeleteTag: false, isDeleteTagFailed: false, deleteTagName: null,
                    deleteTagID: null, deleteTagErrMsg: null
                })
        /*------------------------------------------update tag---------------------------------------*/
        case constants.SELECT_UPDATE_TAG:
            return Object.assign({}, state,
                {
                    isShowUpdateTag: true,
                    updateTagID: action.payload.updateTagID,
                    updateTagName: action.payload.updateTagName,
                    updateTagSeq: action.payload.updateTagSeq
                })
        case constants.CLOSE_UPDATE_TAG:
            return Object.assign({}, state,
                {
                    isShowUpdateTag: false,
                    updateTagID: "",
                    updateTagName: "",
                    updateTagSeq: "",
                    isUpdateTagNameValid: true,
                    isUpdateTagSeqValid: true,
                    updateTagNameErrMsg: "",
                    updateTagSeqErrMsg: ""
                })
        case constants.ONCHANGE_UPDATE_TAG_NAME:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            updateTagName: action.payload.tagName,
                            updateTagNameErrMsg: action.payload.errorMsg,
                            isUpdateTagNameValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            updateTagName: action.payload.tagName,
                            updateTagNameErrMsg: "",
                            isUpdateTagNameValid: true
                        })
                default:
                    return state
            }
        case constants.ONCHANGE_UPDATE_TAG_SEQ:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            updateTagSeq: action.payload.tagSeq,
                            updateTagSeqErrMsg: action.payload.errorMsg,
                            isUpdateTagSeqValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            updateTagSeq: action.payload.tagSeq,
                            updateTagSeqErrMsg: "",
                            isUpdateTagSeqValid: true
                        })
                default:
                    return state
            }
        case constants.UPDATE_TAG_PENDING:
            return Object.assign({}, state, { isPendingUpdateTag: true })
        case constants.UPDATE_TAG_SUCCESS:
            return Object.assign({}, state,
                {
                    isRefreshTagNeeded: true, isPendingUpdateTag: false, isShowUpdateTag: false,
                    isUpdateTagNameValid: true, updateTagName: "", updateTagNameErrMsg: "",
                    isUpdateTagSeqValid: true, updateTagSeq: "", updateTagSeqErrMsg: ""
                })
        case constants.UPDATE_TAG_FAILED:
            switch (action.payload.Code) {
                case 'TAG_MANDATORY_FIELD':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateTag: false,
                            isUpdateTagNameValid: false, updateTagNameErrMsg: action.payload.errMessage,
                            isUpdateTagSeqValid: false, updateTagSeqErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_TAG_CHECK_DUP':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateTag: false,
                            isUpdateTagNameValid: false, updateTagNameErrMsg: action.payload.errMessage,
                            isUpdateTagSeqValid: false, updateTagSeqErrMsg: action.payload.errMessage
                        })
                case 'TAG_DUPLICATE_TAG_NAME':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateTag: false,
                            isUpdateTagNameValid: false, updateTagNameErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_TAG_UPDATE':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateTag: false,
                            isUpdateTagNameValid: false, updateTagNameErrMsg: action.payload.errMessage,
                            isUpdateTagSeqValid: false, updateTagSeqErrMsg: action.payload.errMessage
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateTag: false,
                            isUpdateTagNameValid: false, updateTagNameErrMsg: action.payload.errMessage,
                            isUpdateTagSeqValid: false, updateTagSeqErrMsg: action.payload.errMessage
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        {
                            error: action.payload,
                            isPendingUpdateTag: false,
                            updateTagName: "",
                            updateTagSeq: "",
                            isUpdateTagNameValid: null, updateTagNameErrMsg: "",
                            isUpdateTagSeqValid: null, updateTagSeqErrMsg: ""
                        })
            }
        /*----------user logout------------------*/
        case constants.SET_TAG_PAGE:
            return Object.assign({}, state,
                {
                    displayTags: action.payload.displayTags,
                    selectedPage: action.payload.selectedPage
                })
        case constants.USER_LOG_OUT:
            return Object.assign({}, state, initialStateTag)
        default:
            return state
    }
}

export default tagRdc;