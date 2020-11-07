import {
    API_PORT,
    CLOSE_UPDATE_TAG,
    ONCHANGE_UPDATE_TAG_NAME,
    ONCHANGE_UPDATE_TAG_SEQ,
    UPDATE_TAG_PENDING,
    UPDATE_TAG_SUCCESS,
    UPDATE_TAG_FAILED
} from '../../constants';

export const closeUpdateTagAct = () => {
    return ({ type: CLOSE_UPDATE_TAG })
}

const checkUpdateTagName = (tagName) => {
    if (!tagName) {
        return { isValid: false, errorMsg: `Please enter tag name` }
    } else if (tagName.length > 20) {
        return { isValid: false, errorMsg: `Tag name cannot be more than 20 characters` }
    }

    return { isValid: true };
}

export const onchangeUpdateTagNameAct = (event) => {
    const tagName = event.target.value;
    const result = checkUpdateTagName(tagName);
    if (!result.isValid) {
        return { type: ONCHANGE_UPDATE_TAG_NAME, payload: { tagName: tagName, isValid: false, errorMsg: result.errorMsg } };
    }
    return { type: ONCHANGE_UPDATE_TAG_NAME, payload: { tagName: tagName, isValid: true } };
}


const checkUpdateTagSeq = (tagSeq) => {
    if (!tagSeq) {
        return { isValid: false, errorMsg: `Please enter seq` }
    } else if (isNaN(Number(tagSeq))) {
        return { isValid: false, errorMsg: `Seq must be a number` }
    }else if (Number(tagSeq)<0||Number(tagSeq)>1000){
        return {isValid:false, errorMsg: `Seq must be between 0 to 1000`}
    }

    return { isValid: true };
}

export const onchangeUpdateTagSeqAct = (event) => {
    const tagSeq = event.target.value;
    const result = checkUpdateTagSeq(tagSeq);
    if (!result.isValid) {
        return { type: ONCHANGE_UPDATE_TAG_SEQ, payload: { tagSeq: tagSeq, isValid: false, errorMsg: result.errorMsg } };
    }
    return { type: ONCHANGE_UPDATE_TAG_SEQ, payload: { tagSeq: Number(tagSeq), isValid: true } };
}


export const updateTagAct = () => (dispatch, getState) => {
    let resStatus;
    dispatch({ type: UPDATE_TAG_PENDING })
    fetch(`${API_PORT}/tag/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getState().authRdc.token}`
        },
        body: JSON.stringify({
            tagID: getState().tagRdc.updateTagID,
            tagName: getState().tagRdc.updateTagName,
            seq: getState().tagRdc.updateTagSeq,
            userID: getState().authRdc.userID
        })
    }
    )
        .then(res => {
            resStatus = res.status
            return res.json()
        })
        .then(res => {
            switch (resStatus) {
                case 200:
                    return dispatch({ type: UPDATE_TAG_SUCCESS, payload: `Updated rows:${res}` })
                case 400:
                    return dispatch({ type: UPDATE_TAG_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
                case 500:
                    return dispatch({ type: UPDATE_TAG_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
                default:
                    return dispatch({ type: UPDATE_TAG_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:TAG-Update-1), please try again' } })
            }
        })
        .catch(
            () => dispatch({ type: UPDATE_TAG_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:TAG-Update-2), please try again' } })
        )
}
