import {
    API_PORT,
    CLOSE_CREATE_CATEGORY,
    ONCHANGE_CREATE_CATEGORY_NAME,
    ONCHANGE_CREATE_CATEGORY_DESC,
    ONCHANGE_CREATE_CATEGORY_SEQ,
    POST_CATEGORY_PENDING,
    POST_CATEGORY_SUCCESS,
    POST_CATEGORY_FAILED,
    CLEAR_CREATE_CATEGORY
} from '../../constants';

export const closeCategoryCreateAct = () => {
    return ({ type: CLOSE_CREATE_CATEGORY })
}

const checkCreateCategoryName = (categoryName) => {
    if (!categoryName) {
        return { isValid: false, errorMsg: `Please enter category name` }
    } else if (categoryName.length > 20) {
        return { isValid: false, errorMsg: `Category name cannot be more than 20 characters` }
    }

    return { isValid: true };
}

export const onchangeCreateCategoryNameAct = (event) => {
    const categoryName = event.target.value;
    const result = checkCreateCategoryName(categoryName);
    if (!result.isValid) {
        return { type: ONCHANGE_CREATE_CATEGORY_NAME, payload: { categoryName: categoryName, isValid: false, errorMsg: result.errorMsg } };
    }
    return { type: ONCHANGE_CREATE_CATEGORY_NAME, payload: { categoryName: categoryName, isValid: true } };
}

const checkCreateCategoryDesc = (categoryDesc) => {
    if (categoryDesc.length > 20) {
        return { isValid: false, errorMsg: `Category name cannot be more than 20 characters` }
    }

    return { isValid: true };
}

export const onchangeCreateCategoryDescAct = (event) => {
    const categoryDesc = event.target.value;
    const result = checkCreateCategoryDesc(categoryDesc);
    if (!result.isValid) {
        return { type: ONCHANGE_CREATE_CATEGORY_DESC, payload: { categoryDesc: categoryDesc, isValid: false, errorMsg: result.errorMsg } };
    }
    return { type: ONCHANGE_CREATE_CATEGORY_DESC, payload: { categoryDesc: categoryDesc, isValid: true } };
}


const checkCreateCategorySeq = (categorySeq) => {
    if (!categorySeq) {
        return { isValid: false, errorMsg: `Please enter seq` }
    }else if(isNaN(Number(categorySeq))) {
        return { isValid: false, errorMsg: `Seq must be a number` }
    }else if (Number(categorySeq)<0||Number(categorySeq)>1000){
        return {isValid:false, errorMsg: `Seq must be between 0 to 1000`}
    }

    return { isValid: true };
}

export const onchangeCreateCategorySeqAct = (event) => {
    const categorySeq = event.target.value;
    const result = checkCreateCategorySeq(categorySeq);
    if (!result.isValid) {
        return { type: ONCHANGE_CREATE_CATEGORY_SEQ, payload: { categorySeq: categorySeq, isValid: false, errorMsg: result.errorMsg } };
    }
    return { type: ONCHANGE_CREATE_CATEGORY_SEQ, payload: { categorySeq: Number(categorySeq), isValid: true } };
}


export const postCategoryAct = () => (dispatch, getState) => {
    let resStatus;
    dispatch({ type: POST_CATEGORY_PENDING });
    fetch(`${API_PORT}/category/create`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getState().authRdc.token}`
        },
        body: JSON.stringify({
            categoryName: getState().categoryRdc.createCategoryName,
            categoryDesc: getState().categoryRdc.createCategoryDesc,
            seq: getState().categoryRdc.createCategorySeq,
            userID: getState().authRdc.userID
        })
    })
    .then(res => {
        resStatus = res.status
        return res.json()
    })
    .then(res => {
        switch (resStatus) {
            case 200:
                return dispatch({ type: POST_CATEGORY_SUCCESS, payload: res })
            case 400:
                return dispatch({ type: POST_CATEGORY_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
            case 500:
                return dispatch({ type: POST_CATEGORY_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
            default:
                return dispatch({ type: POST_CATEGORY_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:CATEGORY-Create-1), please try again' } })
        }
    })
    .catch(
        () => dispatch({ type: POST_CATEGORY_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:CATEGORY-Create-2), please try again' } })
    )
}

export const clearCreateCategoryAct = () => {
    return ({ type: CLEAR_CREATE_CATEGORY });
}