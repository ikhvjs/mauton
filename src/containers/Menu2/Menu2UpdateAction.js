import {
    API_PORT,
    CLOSE_UPDATE_MENU2,
    ONCHANGE_UPDATE_MENU2_NAME,
    ONCHANGE_UPDATE_MENU2_PARENT_NAME,
    ONCHANGE_UPDATE_MENU2_SEQ,
    UPDATE_MENU2_PENDING,
    UPDATE_MENU2_SUCCESS,
    UPDATE_MENU2_FAILED
} from '../../constants';

export const closeUpdateMenu2Act = () => {
    return ({ type: CLOSE_UPDATE_MENU2 })
}

const checkUpdateMenu2Name = (menu2Name) => {
    if (!menu2Name) {
        return { isValid: false, errorMsg: `Please enter menu name` }
    } else if (menu2Name.length > 20) {
        return { isValid: false, errorMsg: `Menu name cannot be more than 20 characters` }
    }

    return { isValid: true };
}

export const onchangeUpdateMenu2NameAct = (event) => {
    const menu2Name = event.target.value;
    const result = checkUpdateMenu2Name(menu2Name);
    if (!result.isValid) {
        return { type: ONCHANGE_UPDATE_MENU2_NAME, payload: { menu2Name: menu2Name, isValid: false, errorMsg: result.errorMsg } };
    }
    return { type: ONCHANGE_UPDATE_MENU2_NAME, payload: { menu2Name: menu2Name, isValid: true } };
}

const checkUpdateMenu2ParentMenuID = (menu2ParentMenuID) => {
    if (!menu2ParentMenuID) {
        return { isValid: false, errorMsg: `Please enter Parent Menu name` }
    }

    return { isValid: true };
}

export const onchangeUpdateMenu2ParentMenuIDAct = (event) => {
    const menu2ParentMenuID = event.target.value;
    const result = checkUpdateMenu2ParentMenuID(menu2ParentMenuID);
    if (!result.isValid) {
        return { type: ONCHANGE_UPDATE_MENU2_PARENT_NAME, payload: { menu2ParentMenuID: menu2ParentMenuID, isValid: false, errorMsg: result.errorMsg } };
    }
    return { type: ONCHANGE_UPDATE_MENU2_PARENT_NAME, payload: { menu2ParentMenuID: menu2ParentMenuID, isValid: true } };
}


const checkUpdateMenu2Seq = (menu2Seq) => {
    if (!menu2Seq) {
        return { isValid: false, errorMsg: `Please enter seq` }
    } else if (isNaN(Number(menu2Seq))) {
        return { isValid: false, errorMsg: `Seq must be a number` }
    } else if (Number(menu2Seq) < 1 || Number(menu2Seq) > 1000) {
        return { isValid: false, errorMsg: `Seq must be between 1 to 1000` }
    }

    return { isValid: true };
}

export const onchangeUpdateMenu2SeqAct = (event) => {
    const menu2Seq = event.target.value;
    const result = checkUpdateMenu2Seq(menu2Seq);
    if (!result.isValid) {
        return { type: ONCHANGE_UPDATE_MENU2_SEQ, payload: { menu2Seq: menu2Seq, isValid: false, errorMsg: result.errorMsg } };
    }
    return { type: ONCHANGE_UPDATE_MENU2_SEQ, payload: { menu2Seq: Number(menu2Seq), isValid: true } };
}


export const updateMenu2Act = () => (dispatch, getState) => {
    let resStatus;
    dispatch({ type: UPDATE_MENU2_PENDING })
    fetch(`${API_PORT}/menu2/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getState().authRdc.token}`
        },
        body: JSON.stringify({
            menu2ID: getState().menu2Rdc.updateMenu2ID,
            menu2Name: getState().menu2Rdc.updateMenu2Name,
            menu2ParentMenuID: getState().menu2Rdc.updateMenu2ParentMenuID,
            seq: getState().menu2Rdc.updateMenu2Seq
        })
    })
    .then(res => {
        resStatus = res.status
        return res.json()
    })
    .then(res => {
        switch (resStatus) {
            case 200:
                return dispatch({ type: UPDATE_MENU2_SUCCESS, payload: `Updated rows:${res}` })
            case 400:
                return dispatch({ type: UPDATE_MENU2_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
            case 500:
                return dispatch({ type: UPDATE_MENU2_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
            default:
                return dispatch({ type: UPDATE_MENU2_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:MENU2-Update-1), please try again' } })
        }
    })
    .catch(
        () => dispatch({ type: UPDATE_MENU2_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:MENU2-Update-2), please try again' } })
    )
}
