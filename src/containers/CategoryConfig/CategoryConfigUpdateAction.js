import {
    API_PORT,
    CLOSE_UPDATE_CATEGORY,
    ONCHANGE_UPDATE_CATEGORY_NAME,
    ONCHANGE_UPDATE_CATEGORY_DESC,
    ONCHANGE_UPDATE_CATEGORY_SEQ,
    UPDATE_CATEGORY_PENDING,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILED
} from '../../constants';

export const closeUpdateCategoryAct = () => {
    return ({ type: CLOSE_UPDATE_CATEGORY })
}

const checkUpdateCategoryName = (categoryName) => {
    if (!categoryName) {
        return { isValid: false, errorMsg: `Please enter category name` }
    } else if (categoryName.length > 20) {
        return { isValid: false, errorMsg: `Category name cannot be more than 20 characters` }
    }

    return { isValid: true };
}

export const onchangeUpdateCategoryNameAct = (event) => {
    const categoryName = event.target.value;
    const result = checkUpdateCategoryName(categoryName);
    if (!result.isValid) {
        return { type: ONCHANGE_UPDATE_CATEGORY_NAME, payload: { categoryName: categoryName, isValid: false, errorMsg: result.errorMsg } };
    }
    return { type: ONCHANGE_UPDATE_CATEGORY_NAME, payload: { categoryName: categoryName, isValid: true } };
}

const checkUpdateCategoryDesc = (categoryDesc) => {
    if (categoryDesc.length > 20) {
        return { isValid: false, errorMsg: `Category name cannot be more than 20 characters` }
    }

    return { isValid: true };
}

export const onchangeUpdateCategoryDescAct = (event) => {
    const categoryDesc = event.target.value;
    const result = checkUpdateCategoryDesc(categoryDesc);
    if (!result.isValid) {
        return { type: ONCHANGE_UPDATE_CATEGORY_DESC, 
            payload: { categoryDesc: categoryDesc, isValid: false, errorMsg: result.errorMsg } };
    }
    return { type: ONCHANGE_UPDATE_CATEGORY_DESC, 
        payload: { categoryDesc: categoryDesc, isValid: true } };
}


const checkUpdateCategorySeq = (categorySeq) => {
    if (!categorySeq) {
        return { isValid: false, errorMsg: `Please enter seq` }
    } else if (isNaN(Number(categorySeq))) {
        return { isValid: false, errorMsg: `Seq must be a number` }
    }else if (Number(categorySeq)<1||Number(categorySeq)>1000){
        return {isValid:false, errorMsg: `Seq must be between 1 to 1000`}
    }

    return { isValid: true };
}

export const onchangeUpdateCategorySeqAct = (event) => {
    const categorySeq = event.target.value;
    const result = checkUpdateCategorySeq(categorySeq);
    if (!result.isValid) {
        return { type: ONCHANGE_UPDATE_CATEGORY_SEQ, payload: { categorySeq: categorySeq, isValid: false, errorMsg: result.errorMsg } };
    }
    return { type: ONCHANGE_UPDATE_CATEGORY_SEQ, payload: { categorySeq: Number(categorySeq), isValid: true } };
}


export const updateCategoryAct = () => (dispatch, getState) => {
    let resStatus;
    dispatch({ type: UPDATE_CATEGORY_PENDING })
    fetch(`${API_PORT}/category/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getState().authRdc.token}`
        },
        body: JSON.stringify({
            categoryID: getState().categoryRdc.updateCategoryID,
            categoryDesc: getState().categoryRdc.updateCategoryDesc,
            categoryName: getState().categoryRdc.updateCategoryName,
            seq: getState().categoryRdc.updateCategorySeq
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
                    return dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: `Updated rows:${res}` })
                case 400:
                    return dispatch({ type: UPDATE_CATEGORY_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
                case 500:
                    return dispatch({ type: UPDATE_CATEGORY_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
                default:
                    return dispatch({ type: UPDATE_CATEGORY_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:CATEGORY-Update-1), please try again' } })
            }
        })
        .catch(
            () => dispatch({ type: UPDATE_CATEGORY_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:CATEGORY-Update-2), please try again' } })
        )
}
