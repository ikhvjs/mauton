import {
    API_PORT,
    CLOSE_UPDATE_MENU1,
    ONCHANGE_UPDATE_MENU1_NAME,
    ONCHANGE_UPDATE_MENU1_SEQ,
    UPDATE_MENU1_PENDING,
    UPDATE_MENU1_SUCCESS,
    UPDATE_MENU1_FAILED
} from '../../constants';

export const closeUpdateMenu1Act = () => {
    return ({ type: CLOSE_UPDATE_MENU1 })
}

const checkUpdateMenu1Name = (menu1Name) => {
    if (!menu1Name) {
        return { isValid: false, errorMsg: `Please enter menu name` }
    } else if (menu1Name.length > 20) {
        return { isValid: false, errorMsg: `Menu name cannot be more than 20 characters` }
    }

    return { isValid: true };
}

export const onchangeUpdateMenu1NameAct = (event) => {
    const menu1Name = event.target.value;
    const result = checkUpdateMenu1Name(menu1Name);
    if (!result.isValid) {
        return { type: ONCHANGE_UPDATE_MENU1_NAME, payload: { menu1Name: menu1Name, isValid: false, errorMsg: result.errorMsg } };
    }
    return { type: ONCHANGE_UPDATE_MENU1_NAME, payload: { menu1Name: menu1Name, isValid: true } };
}


const checkUpdateMenu1Seq = (menu1Seq) => {
    if (!menu1Seq) {
        return { isValid: false, errorMsg: `Please enter seq` }
    } else if (isNaN(Number(menu1Seq))) {
        return { isValid: false, errorMsg: `Seq must be a number` }
    } else if (Number(menu1Seq) < 1 || Number(menu1Seq) > 1000) {
        return { isValid: false, errorMsg: `Seq must be between 1 to 1000` }
    }

    return { isValid: true };
}

export const onchangeUpdateMenu1SeqAct = (event) => {
    const menu1Seq = event.target.value;
    const result = checkUpdateMenu1Seq(menu1Seq);
    if (!result.isValid) {
        return { type: ONCHANGE_UPDATE_MENU1_SEQ, payload: { menu1Seq: menu1Seq, isValid: false, errorMsg: result.errorMsg } };
    }
    return { type: ONCHANGE_UPDATE_MENU1_SEQ, payload: { menu1Seq: Number(menu1Seq), isValid: true } };
}


export const updateMenu1Act = () => (dispatch, getState) => {
    let resStatus;
    dispatch({ type: UPDATE_MENU1_PENDING })
    fetch(`${API_PORT}/menu1/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getState().authRdc.token}`
        },
        body: JSON.stringify({
            menu1ID: getState().menu1Rdc.updateMenu1ID,
            menu1Name: getState().menu1Rdc.updateMenu1Name,
            seq: getState().menu1Rdc.updateMenu1Seq
        })
    })
    .then(res => {
        resStatus = res.status
        return res.json()
    })
    .then(res => {
        switch (resStatus) {
            case 200:
                return dispatch({ type: UPDATE_MENU1_SUCCESS, payload: `Updated rows:${res}` })
            case 400:
                return dispatch({ type: UPDATE_MENU1_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
            case 500:
                return dispatch({ type: UPDATE_MENU1_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
            default:
                return dispatch({ type: UPDATE_MENU1_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:MENU1-Update-1), please try again' } })
        }
    })
    .catch(
        () => dispatch({ type: UPDATE_MENU1_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:MENU1-Update-2), please try again' } })
    )
}
