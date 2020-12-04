import * as constants from '../constants';

const initialStateBlog = {
    selectBlogID: "",
    blog: {},
    //request blog
    isPendingRequestBlog: false,
    isShowBlog: false,
    isRefreshBlogNeeded: false,
    //create blog
    isShowCreateBlog: false,
    isPendingPostBlog: false,
    isCreateBlogTitleValid: null,
    isCreateBlogCategoryValid: null,
    isCreateBlogTagValid: null,
    isCreateBlogSeqValid: null,
    createBlogTitle: "",
    createBlogCategory: { value: '', label: 'Select Category' },
    createBlogTag: [],
    createBlogSeq: "",
    createBlogTitleErrMsg: "",
    createBlogCategoryErrMsg: "",
    createBlogTagErrMsg: "",
    createBlogSeqErrMsg: "",
    //delete blog
    isShowDeleteBlog: false,
    deleteBlogTitle: null,
    isPendingDeleteBlog: false,
    isDeleteBlogFailed: false,
    deleteBlogErrMsg: "",
    //update blog
    isShowUpdateBlog: false,
    isPendingUpdateBlog: false,
    isUpdateBlogTitleValid: true,
    isUpdateBlogCategoryValid: true,
    isUpdateBlogTagValid: true,
    isUpdateBlogSeqValid: true,
    updateBlogTitle: "",
    updateBlogCategory: { value: '', label: 'Select Category' },
    updateBlogTag: [],
    updateBlogSeq: "",
    updateBlogTitleErrMsg: "",
    updateBlogCategoryErrMsg: "",
    updateBlogTagErrMsg: "",
    updateBlogSeqErrMsg: "",

}

const blogRdc = (state = initialStateBlog, action = {}) => {
    switch (action.type) {
        /*-----------------select Sidebar---------------------*/
        case constants.SELECT_SIDEBAR:
            return Object.assign({}, state, { isShowBlog: false })
        /*-----------------select Blog---------------------*/
        case constants.SELECT_BLOG:
            return Object.assign({}, state, { selectBlogID: action.payload })
        /*-----------------request Blog---------------------*/
        case constants.REQUEST_BLOG_PENDING:
            return Object.assign({}, state,
                {
                    isPendingRequestBlog: true,
                    isRequestBlogFailed: false,
                    isShowBlog: false,
                    isRefreshBlogNeeded: false
                })
        case constants.REQUEST_BLOG_SUCCESS:
            return Object.assign({}, state,
                {
                    isPendingRequestBlog: false,
                    isRequestBlogFailed: false,
                    blog: action.payload,
                    isShowBlog: true
                })
        case constants.REQUEST_BLOG_FAILED:
            switch (action.payload.Code) {
                case 'INTERNAL_SERVER_ERROR_BLOG_REQUEST':
                    return Object.assign({}, state,
                        { isPendingRequestBlog: false, isRequestBlogFailed: true })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        { isPendingRequestBlog: false, isRequestBlogFailed: true })
                default://unhandled error
                    return Object.assign({}, state,
                        { error: action.payload, isPendingRequestBlog: false, isRequestBlogFailed: true })
            }
        /*----------------create Blog-----------------------*/
        case constants.SELECT_CREATE_BLOG:
            return Object.assign({}, state, { isShowCreateBlog: true })
        case constants.CLOSE_CREATE_BLOG:
            return Object.assign({}, state,
                {
                    isShowCreateBlog: false,
                    isCreateBlogTitleValid: null, createBlogTitle: "", createBlogTitleErrMsg: "",
                    isCreateBlogCategoryValid: null, createBlogCategory: { value: '', label: 'Select Category' }, createBlogCategoryErrMsg: "",
                    isCreateBlogTagValid: null, createBlogTag: [], createBlogTagErrMsg: "",
                    isCreateBlogSeqValid: null, createBlogSeq: "", createBlogSeqErrMsg: ""
                })
        case constants.POST_BLOG_PENDING:
            return Object.assign({}, state, { isPendingPostBlog: true })


        case constants.POST_BLOG_SUCCESS:
            return Object.assign({}, state,
                {
                    isPendingPostBlog: false, isShowCreateBlog: false,
                    isCreateBlogTitleValid: null, createBlogTitle: "", createBlogTitleErrMsg: "",
                    isCreateBlogCategoryValid: null, createBlogCategory: { value: '', label: 'Select Category' }, createBlogCategoryErrMsg: "",
                    isCreateBlogTagValid: null, createBlogTag: [], createBlogTagErrMsg: "",
                    isCreateBlogSeqValid: null, createBlogSeq: "", createBlogSeqErrMsg: ""
                })
        case constants.POST_BLOG_FAILED:
            switch (action.payload.Code) {
                case 'BLOG_MANDATORY_FIELD':
                    return Object.assign({}, state,
                        {
                            isPendingPostBlog: false,
                            isCreateBlogTitleValid: false, createBlogTitleErrMsg: action.payload.errMessage,
                            isCreateBlogCategoryValid: false, createBlogCategoryErrMsg: action.payload.errMessage,
                            isCreateBlogTagValid: false, createBlogTagErrMsg: action.payload.errMessage,
                            isCreateBlogSeqValid: false, createBlogSeqErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_BLOG_CHECK_DUP':
                    return Object.assign({}, state,
                        {
                            isPendingPostBlog: false,
                            isCreateBlogTitleValid: false, createBlogTitleErrMsg: action.payload.errMessage,
                            isCreateBlogCategoryValid: false, createBlogCategoryErrMsg: action.payload.errMessage,
                            isCreateBlogTagValid: false, createBlogTagErrMsg: action.payload.errMessage,
                            isCreateBlogSeqValid: false, createBlogSeqErrMsg: action.payload.errMessage
                        })
                case 'BLOG_DUPLICATE_BLOG_TITLE':
                    return Object.assign({}, state,
                        {
                            isPendingPostBlog: false,
                            isCreateBlogTitleValid: false, createBlogTitleErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_BLOG_INSERT':
                    return Object.assign({}, state,
                        {
                            isPendingPostBlog: false,
                            isCreateBlogTitleValid: false, createBlogTitleErrMsg: action.payload.errMessage,
                            isCreateBlogCategoryValid: false, createBlogCategoryErrMsg: action.payload.errMessage,
                            isCreateBlogTagValid: false, createBlogTagErrMsg: action.payload.errMessage,
                            isCreateBlogSeqValid: false, createBlogSeqErrMsg: action.payload.errMessage
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingPostBlog: false,
                            isCreateBlogTitleValid: false, createBlogTitleErrMsg: action.payload.errMessage,
                            isCreateBlogCategoryValid: false, createBlogCategoryErrMsg: action.payload.errMessage,
                            isCreateBlogTagValid: false, createBlogTagErrMsg: action.payload.errMessage,
                            isCreateBlogSeqValid: false, createBlogSeqErrMsg: action.payload.errMessage
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        {
                            error: action.payload,
                            isPendingPostBlog: false,
                            createBlogTitle: "",
                            createBlogCategory: { value: '', label: 'Select Category' },
                            createBlogTag: [],
                            createBlogSeq: "",
                            isCreateBlogTitleValid: null, createBlogTitleErrMsg: "",
                            isCreateBlogCategoryValid: null, createBlogCategoryErrMsg: "",
                            isCreateBlogTagValid: null, createBlogTagErrMsg: "",
                            isCreateBlogSeqValid: null, createBlogSeqErrMsg: ""
                        })
            }
        case constants.ONCHANGE_CREATE_BLOG_TITLE:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            createBlogTitle: action.payload.blogTitle,
                            createBlogTitleErrMsg: action.payload.errorMsg,
                            isCreateBlogTitleValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            createBlogTitle: action.payload.blogTitle,
                            createBlogTitleErrMsg: "",
                            isCreateBlogTitleValid: true
                        })
                default:
                    return state
            }
        case constants.ONCHANGE_CREATE_BLOG_CATEGORY_NAME:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            createBlogCategory: action.payload.createBlogCategory,
                            createBlogCategoryErrMsg: action.payload.errorMsg,
                            isCreateBlogCategoryValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            createBlogCategory: action.payload.createBlogCategory,
                            createBlogCategoryErrMsg: "",
                            isCreateBlogCategoryValid: true
                        })
                default:
                    return state
            }
        case constants.ONCHANGE_CREATE_BLOG_TAG:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            createBlogTag: action.payload.createBlogTag,
                            createBlogTagErrMsg: action.payload.errorMsg,
                            isCreateBlogTagValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            createBlogTag: action.payload.createBlogTag,
                            createBlogTagErrMsg: "",
                            isCreateBlogTagValid: true
                        })
                default:
                    return state
            }
        case constants.ONCHANGE_CREATE_BLOG_SEQ:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            createBlogSeq: action.payload.blogSeq,
                            createBlogSeqErrMsg: action.payload.errorMsg,
                            isCreateBlogSeqValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            createBlogSeq: action.payload.blogSeq,
                            createBlogSeqErrMsg: "",
                            isCreateBlogSeqValid: true
                        })
                default:
                    return state
            }
        /*----------------delete Blog-----------------------*/
        case constants.DELETE_BLOG_PENDING:
            return Object.assign({}, state, { isPendingDeleteBlog: true })
        case constants.DELETE_BLOG_SUCCESS:
            return Object.assign({}, state,
                {
                    isPendingDeleteBlog: false, isDeleteBlogFailed: false, isShowBlog: false,
                    isShowDeleteBlog: false, deleteBlogTitle: null, deleteBlogID: null
                })
        case constants.DELETE_BLOG_FAILED:
            switch (action.payload.Code) {
                case 'INTERNAL_SERVER_ERROR_BLOG_DELETE':
                    return Object.assign({}, state,
                        {
                            isPendingDeleteBlog: false,
                            isDeleteBlogFailed: true,
                            deleteBlogErrMsg: action.payload.errMessage
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingDeleteBlog: false,
                            isDeleteBlogFailed: true,
                            deleteBlogErrMsg: action.payload.errMessage
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        {
                            error: action.payload,
                            isPendingDeleteBlog: false,
                            isDeleteBlogFailed: true
                        })
            }
        case constants.SELECT_DELETE_BLOG:
            return Object.assign({}, state, { isShowDeleteBlog: true })
        case constants.CLOSE_DELETE_BLOG:
            return Object.assign({}, state,
                {
                    isShowDeleteBlog: false, isDeleteBlogFailed: false, deleteBlogErrMsg: null
                })
        /*----------------update Blog-----------------------*/
        case constants.SELECT_UPDATE_BLOG:
            return Object.assign({}, state,
                {
                    isShowUpdateBlog: true,
                    isUpdateBlogTitleValid: true, updateBlogTitle: action.payload.updateBlogTitle,
                    isUpdateBlogCategoryValid: true, updateBlogCategory: action.payload.updateBlogCategory,
                    isUpdateBlogTagValid: true, updateBlogTag: action.payload.updateBlogTag,
                    isUpdateBlogSeqValid: true, updateBlogSeq: action.payload.updateBlogSeq,
                })
        case constants.CLOSE_UPDATE_BLOG:
            return Object.assign({}, state,
                {
                    isShowUpdateBlog: false,
                    isUpdateBlogTitleValid: true, updateBlogTitle: "", updateBlogTitleErrMsg: "",
                    isUpdateBlogCategoryValid: true, updateBlogCategory: { value: '', label: 'Select Category' }, updateBlogCategoryErrMsg: "",
                    isUpdateBlogTagValid: true, updateBlogTag: [], updateBlogTagErrMsg: "",
                    isUpdateBlogSeqValid: true, updateBlogSeq: "", UpdateBlogSeqErrMsg: ""
                })
        case constants.ONCHANGE_UPDATE_BLOG_TITLE:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            updateBlogTitle: action.payload.blogTitle,
                            updateBlogTitleErrMsg: action.payload.errorMsg,
                            isUpdateBlogTitleValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            updateBlogTitle: action.payload.blogTitle,
                            updateBlogTitleErrMsg: "",
                            isUpdateBlogTitleValid: true
                        })
                default:
                    return state
            }
        case constants.ONCHANGE_UPDATE_BLOG_CATEGORY_NAME:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            updateBlogCategory: action.payload.updateBlogCategory,
                            updateBlogCategoryErrMsg: action.payload.errorMsg,
                            isUpdateBlogCategoryValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            updateBlogCategory: action.payload.updateBlogCategory,
                            updateBlogCategoryErrMsg: "",
                            isUpdateBlogCategoryValid: true
                        })
                default:
                    return state
            }
        case constants.ONCHANGE_UPDATE_BLOG_TAG:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            updateBlogTag: action.payload.updateBlogTag,
                            updateBlogTagErrMsg: action.payload.errorMsg,
                            isUpdateBlogTagValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            updateBlogTag: action.payload.updateBlogTag,
                            updateBlogTagErrMsg: "",
                            isUpdateBlogTagValid: true
                        })
                default:
                    return state
            }
        case constants.ONCHANGE_UPDATE_BLOG_SEQ:
            switch (action.payload.isValid) {
                case false:
                    return Object.assign({}, state,
                        {
                            updateBlogSeq: action.payload.blogSeq,
                            updateBlogSeqErrMsg: action.payload.errorMsg,
                            isUpdateBlogSeqValid: false
                        })
                case true:
                    return Object.assign({}, state,
                        {
                            updateBlogSeq: action.payload.blogSeq,
                            updateBlogSeqErrMsg: "",
                            isUpdateBlogSeqValid: true
                        })
                default:
                    return state
            }
        case constants.UPDATE_BLOG_PENDING:
            return Object.assign({}, state, { isPendingUpdateBlog: true })
        case constants.UPDATE_BLOG_SUCCESS:
            return Object.assign({}, state,
                {
                    isPendingUpdateBlog: false,
                    isShowUpdateBlog: false,
                    isRefreshBlogNeeded: true,
                    isUpdateBlogTitleValid: true, updateBlogTitle: "", updateBlogTitleErrMsg: "",
                    isUpdateBlogCategoryValid: true, updateBlogCategory: { value: "", label: "Select Category" }, updateBlogCategoryErrMsg: "",
                    isUpdateBlogTagValid: true, updateBlogTag: [], updateBlogTagErrMsg: "",
                    isUpdateBlogSeqValid: true, updateBlogSeq: "", updateBlogSeqErrMsg: ""
                })
        case constants.UPDATE_BLOG_FAILED:
            switch (action.payload.Code) {
                case 'BLOG_MANDATORY_FIELD':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateBlog: false,
                            isUpdateBlogTitleValid: false, updateBlogTitleErrMsg: action.payload.errMessage,
                            isUpdateBlogSeqValid: false, updateBlogSeqErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_BLOG_CHECK_DUP':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateBlog: false,
                            isUpdateBlogTitleValid: false, updateBlogTitleErrMsg: action.payload.errMessage
                        })
                case 'BLOG_DUPLICATE_BLOG_TITLE':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateBlog: false,
                            isUpdateBlogTitleValid: false, updateBlogTitleErrMsg: action.payload.errMessage
                        })
                case 'INTERNAL_SERVER_ERROR_BLOG_UPDATE':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateBlog: false,
                            isUpdateBlogTitleValid: false, updateBlogTitleErrMsg: action.payload.errMessage,
                            isUpdateBlogCategoryValid: false, updateBlogCategoryErrMsg: action.payload.errMessage,
                            isUpdateBlogTagValid: false, updateBlogTagErrMsg: action.payload.errMessage,
                            isUpdateBlogSeqValid: false, updateBlogSeqErrMsg: action.payload.errMessage
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingUpdateBlog: false,
                            isUpdateBlogTitleValid: false, updateBlogTitleErrMsg: action.payload.errMessage,
                            isUpdateBlogCategoryValid: false, updateBlogCategoryErrMsg: action.payload.errMessage,
                            isUpdateBlogTagValid: false, updateBlogTagErrMsg: action.payload.errMessage,
                            isUpdateBlogSeqValid: false, updateBlogSeqErrMsg: action.payload.errMessage
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        {
                            error: action.payload,
                            isPendingUpdateBlog: false,
                            isUpdateBlogTitleValid: null, updateBlogTitleErrMsg: "",
                            isUpdateBlogCategoryValid: null, updateBlogCategoryErrMsg: "",
                            isUpdateBlogTagValid: null, updateBlogTagErrMsg: "",
                            isUpdateBlogSeqValid: null, updateBlogSeqErrMsg: ""
                        })
            }
        case constants.USER_LOG_OUT:
            return Object.assign({}, state, initialStateBlog)
        default:
            return state
    }
}


export default blogRdc;