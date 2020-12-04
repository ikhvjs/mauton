import * as constants from '../constants';

const initialStateTopbar = {
  topbar: [],
  selectTopbarID: "",
  isPendingRequestTopbar: false,
  isRequestTopbarFailed: false,
}

const topbarRdc = (state = initialStateTopbar, action = {}) => {
  switch (action.type) {
    case constants.SELECT_TOPBAR_MENU_ID:
      return Object.assign({}, state, { selectTopbarID: action.payload })
    case constants.REQUEST_TOPBAR_PENDING:
      return Object.assign({}, state,
        {
          topbar: [],
          isPendingRequestTopbar: true,
          isRequestTopbarFailed: false
        })
    case constants.REQUEST_TOPBAR_SUCCESS:
      return Object.assign({}, state,
        {
          isPendingRequestTopbar: false,
          isRequestTopbarFailed: false,
          topbar: action.payload
        })
    case constants.REQUEST_TOPBAR_FAILED:
      switch (action.payload.Code) {
        case 'INTERNAL_SERVER_ERROR_TOPBAR_REQUEST':
          return Object.assign({}, state,
            {
              isPendingRequestTopbar: false,
              isRequestTopbarFailed: true
            })
        case 'UNEXPECTED_INTERNAL_SERVER_ERROR':
          return Object.assign({}, state,
            {
              isPendingRequestTopbar: false,
              isRequestTopbarFailed: true
            })
        default://unhandled error
          return Object.assign({}, state,
            {
              error: action.payload,
              isPendingRequestTopbar: false,
              isRequestTopbarFailed: true
            })
      }
    /*-------------------------user logout-------------------------*/
    case constants.USER_LOG_OUT:
      return Object.assign({}, state, initialStateTopbar)
    default:
      return state
  }
}

export default topbarRdc;