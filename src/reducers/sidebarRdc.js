import * as constants from '../constants';

const initialStateSidebar = {
    sidebar: [],
    sidebarMenuID: "",
    isPendingRequestSidebar: false,
    isRequestSidebarFailed: false,
}

const sidebarRdc = (state = initialStateSidebar, action = {}) => {
    switch (action.type) {
        case constants.SELECT_SIDEBAR:
            return Object.assign({}, state, { sidebarMenuID: action.payload })
        case constants.REQUEST_SIDEBAR_PENDING:
            return Object.assign({}, state,
                {
                    sidebar: [],
                    isPendingRequestSidebar: true,
                    isRequestSidebarFailed: false
                })
        case constants.REQUEST_SIDEBAR_SUCCESS:
            return Object.assign({}, state,
                {
                    isPendingRequestSidebar: false,
                    isRequestSidebarFailed: false,
                    sidebar: action.payload
                })
        case constants.REQUEST_SIDEBAR_FAILED:
            switch (action.payload.Code) {
                case 'INTERNAL_SERVER_ERROR_SIDEBAR_REQUEST':
                    return Object.assign({}, state,
                        {
                            isPendingRequestSidebar: false,
                            isRequestSidebarFailed: true
                        })
                case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
                    return Object.assign({}, state,
                        {
                            isPendingRequestSidebar: false,
                            isRequestSidebarFailed: true
                        })
                default://unhandled error
                    return Object.assign({}, state,
                        {
                            error: action.payload,
                            isPendingRequestSidebar: false,
                            isRequestSidebarFailed: true
                        })
            }
        default:
            return state
    }
}

export default sidebarRdc;