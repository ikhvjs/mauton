import {
    API_PORT,
    CLOSE_UPDATE_BLOG,
    ONCHANGE_UPDATE_BLOG_TITLE,
    ONCHANGE_UPDATE_BLOG_CATEGORY_NAME,
    ONCHANGE_UPDATE_BLOG_TAG,
    ONCHANGE_UPDATE_BLOG_SEQ,
    UPDATE_BLOG_PENDING,
    UPDATE_BLOG_SUCCESS,
    UPDATE_BLOG_FAILED,
} from '../../constants';

import tinymce from 'tinymce/tinymce';

export const closeBlogUpdateAct = () => {
    return ({ type: CLOSE_UPDATE_BLOG })
}

const checkUpdateBlogTitle = (blogTitle) => {
    if (!blogTitle) {
        return { isValid: false, errorMsg: `Please enter blog title` }
    } else if (blogTitle.length > 30) {
        return { isValid: false, errorMsg: `Blog Title cannot be more than 30 characters` }
    }

    return { isValid: true };
}

export const onchangeUpdateBlogTitleAct = (event) => {
    const blogTitle = event.target.value;
    const result = checkUpdateBlogTitle(blogTitle);
    if (!result.isValid) {
        return { type: ONCHANGE_UPDATE_BLOG_TITLE, payload: { blogTitle: blogTitle, isValid: false, errorMsg: result.errorMsg } };
    }
    return { type: ONCHANGE_UPDATE_BLOG_TITLE, payload: { blogTitle: blogTitle, isValid: true } };
}

const checkUpdateBlogCategory = (updateBlogCategory) => {
    if (!updateBlogCategory.value) {
        return { isValid: false, errorMsg: `please select category` }
    }

    return { isValid: true };
}

export const onchangeUpdateBlogCategoryAct = (selectValue) => {
    const updateBlogCategory = (selectValue===null)?{ value: '', label: 'Select Category' }:selectValue;
    const result = checkUpdateBlogCategory(updateBlogCategory);
    if (!result.isValid) {
        return {
            type: ONCHANGE_UPDATE_BLOG_CATEGORY_NAME,
            payload: { updateBlogCategory: updateBlogCategory, isValid: false, errorMsg: result.errorMsg }
        };
    }
    return {
        type: ONCHANGE_UPDATE_BLOG_CATEGORY_NAME,
        payload: { updateBlogCategory: updateBlogCategory, isValid: true }
    };
}

const checkUpdateBlogTag = (updateBlogTag) => {
    if (updateBlogTag === null) {
        return { isValid: false, errorMsg: `please select tag` }
    }

    return { isValid: true };
}

export const onchangeUpdateBlogTagAct = (selectValue) => {
    const updateBlogTag = selectValue;
    const result = checkUpdateBlogTag(updateBlogTag);
    if (!result.isValid) {
        return { type: ONCHANGE_UPDATE_BLOG_TAG, 
            payload: { updateBlogTag: updateBlogTag, isValid: false, errorMsg: result.errorMsg } };
    }
    return { type: ONCHANGE_UPDATE_BLOG_TAG, 
        payload: { updateBlogTag: updateBlogTag, isValid: true } };
}


const checkUpdateBlogSeq = (blogSeq) => {
    if (!blogSeq) {
        return { isValid: false, errorMsg: `Please enter seq` }
    } else if (isNaN(Number(blogSeq))) {
        return { isValid: false, errorMsg: `Seq must be a number` }
    } else if (Number(blogSeq) < 1 || Number(blogSeq) > 1000) {
        return { isValid: false, errorMsg: `Seq must be between 1 to 1000` }
    }

    return { isValid: true };
}

export const onchangeUpdateBlogSeqAct = (event) => {
    const blogSeq = event.target.value;
    const result = checkUpdateBlogSeq(blogSeq);
    if (!result.isValid) {
        return { type: ONCHANGE_UPDATE_BLOG_SEQ, payload: { blogSeq: blogSeq, isValid: false, errorMsg: result.errorMsg } };
    }
    return { type: ONCHANGE_UPDATE_BLOG_SEQ, payload: { blogSeq: Number(blogSeq), isValid: true } };
}


export const updateBlogAct = () => (dispatch, getState) => {
    let resStatus;
    dispatch({ type: UPDATE_BLOG_PENDING });
    fetch(`${API_PORT}/blog/update`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getState().authRdc.token}`
        },
        body: JSON.stringify({
            blogTitle: getState().blogRdc.updateBlogTitle,
            blogCategoryID: getState().blogRdc.updateBlogCategory.value,
            blogTag: getState().blogRdc.updateBlogTag,
            blogSeq: getState().blogRdc.updateBlogSeq,
            blogContent: tinymce.get('update-blog-content').getContent(),
            userID: getState().authRdc.userID,
            sidebarMenuID: getState().sidebarRdc.sidebarMenuID
        })
    })
        .then(res => {
            resStatus = res.status
            return res.json()
        })
        .then(res => {
            switch (resStatus) {
                case 200:
                    return dispatch({ type: UPDATE_BLOG_SUCCESS, payload: res })
                case 400:
                    return dispatch({ type: UPDATE_BLOG_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
                case 500:
                    return dispatch({ type: UPDATE_BLOG_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
                default:
                    return dispatch({ type: UPDATE_BLOG_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:BLOG-Update-1), please try again' } })
            }
        })
        .catch(
            () => dispatch({ type: UPDATE_BLOG_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:BLOG-Update-2), please try again' } })
        )
}

