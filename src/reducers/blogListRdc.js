import * as constants from '../constants';

const initialStateBlogList = {
    blogList: [],
    isPendingRequestBlogList: false,
    isRequestBlogListFailed: false,
    isRefreshBlogListNeeded: false,
    searchBlogTitle: "",
    searchCategoryName: "",
    searchTagName: "",
}

const blogListRdc = (state = initialStateBlogList, action = {}) => {
    switch (action.type) {
        /*----------------------request bloglist------------------------*/
        case constants.REQUEST_BLOGLIST_PENDING:
            return Object.assign({}, state,
                {
                    isPendingRequestBlogList: true,
                    isRequestBlogListFailed: false,
                    isRefreshBlogListNeeded: false,
                })
        case constants.REQUEST_BLOGLIST_SUCCESS:
            return Object.assign({}, state,
                {
                    isPendingRequestBlogList: false,
                    isRequestBlogListFailed: false,
                    blogList: action.payload
                })
        case constants.REQUEST_BLOGLIST_FAILED:
            switch (action.payload.Code) {
                case 'INTERNAL_SERVER_ERROR_BLOGLIST_REQUEST':
                    return Object.assign({}, state,
                        {
                            isPendingRequestBlogList: false,
                            isRequestBlogListFailed: true
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingRequestBlogList: false,
                            isRequestBlogListFailed: true
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        {
                            error: action.payload,
                            isPendingRequestBlogList: false,
                            isRequestBlogListFailed: true
                        })
            }
        /*------------------Search Bloglsit-----------------*/
        case constants.ONCHANGE_SEARCH_BLOGLIST_BLOG_TITLE:
            return Object.assign({}, state, { searchBlogTitle: action.payload })
        case constants.ONCHANGE_SEARCH_BLOGLIST_CATEGORY_NAME:
            return Object.assign({}, state, { searchCategoryName: action.payload })
        case constants.ONCHANGE_SEARCH_BLOGLIST_TAG_NAME:
            return Object.assign({}, state, { searchTagName: action.payload })
        case constants.SEARCH_BLOGLIST_PENDING:
            return Object.assign({}, state,
                {
                    isPendingRequestBlogList: true,
                    isRequestBlogListFailed: false
                })
        case constants.SEARCH_BLOGLIST_SUCCESS:
            return Object.assign({}, state,
                {
                    isPendingRequestBlogList: false,
                    isRequestBlogListFailed: false,
                    blogList: action.payload
                })
        case constants.SEARCH_BLOGLIST_FAILED:
            switch (action.payload.Code) {
                case 'INTERNAL_SERVER_ERROR_BLOGLIST_SEARCH':
                    return Object.assign({}, state,
                        {
                            isPendingRequestBlogList: false, isRequestBlogListFailed: true
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingRequestBlogList: false, isRequestBlogListFailed: true
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        {
                            error: action.payload,
                            isPendingRequestBlogList: false,
                            isRequestBlogListFailed: true,
                        })
            }
        case constants.CLEAR_SEARCH_BLOGLIST:
            return Object.assign({}, state,
                {
                    isRefreshBlogListNeeded: true,
                    searchBlogTitle: "",
                    searchCategoryName: "",
                    searchTagName: ""
                })
        /*-------------------------post Blog---------------------------*/
        case constants.POST_BLOG_SUCCESS:
            return Object.assign({}, state, { isRefreshBlogListNeeded: true })
        /*-------------------------delete Blog---------------------------*/
        case constants.DELETE_BLOG_SUCCESS:
            return Object.assign({}, state, { isRefreshBlogListNeeded: true })
        default:
            return state

    }
}

export default blogListRdc;