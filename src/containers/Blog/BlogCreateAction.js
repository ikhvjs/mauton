import {
    API_PORT,
    CLOSE_CREATE_BLOG,
    ONCHANGE_CREATE_BLOG_TITLE,
    ONCHANGE_CREATE_BLOG_CATEGORY_NAME,
    ONCHANGE_CREATE_BLOG_TAG,
    ONCHANGE_CREATE_BLOG_SEQ,
    POST_BLOG_PENDING,
    POST_BLOG_SUCCESS,
    POST_BLOG_FAILED,
} from '../../constants';

import tinymce from 'tinymce/tinymce';

export const closeBlogCreateAct = () => {
    return ({ type: CLOSE_CREATE_BLOG })
}

const checkCreateBlogTitle = (blogTitle) => {
    if (!blogTitle) {
        return { isValid: false, errorMsg: `Please enter blog title` }
    } else if (blogTitle.length > 30) {
        return { isValid: false, errorMsg: `Blog name cannot be more than 30 characters` }
    }

    return { isValid: true };
}

export const onchangeCreateBlogTitleAct = (event) => {
    const blogTitle = event.target.value;
    const result = checkCreateBlogTitle(blogTitle);
    if (!result.isValid) {
        return { type: ONCHANGE_CREATE_BLOG_TITLE, payload: { blogTitle: blogTitle, isValid: false, errorMsg: result.errorMsg } };
    }
    return { type: ONCHANGE_CREATE_BLOG_TITLE, payload: { blogTitle: blogTitle, isValid: true } };
}

const checkCreateBlogCategory = (createBlogCategory) => {
    if (!createBlogCategory.value) {
        return { isValid: false, errorMsg: `please select category` }
    }

    return { isValid: true };
}

export const onchangeCreateBlogCategoryAct = (selectValue) => {
    const createBlogCategory = (selectValue===null)?{ value: '', label: 'Select Category' }:selectValue;
    const result = checkCreateBlogCategory(createBlogCategory);
    if (!result.isValid) {
        return {
            type: ONCHANGE_CREATE_BLOG_CATEGORY_NAME,
            payload: { createBlogCategory: createBlogCategory, isValid: false, errorMsg: result.errorMsg }
        };
    }
    return {
        type: ONCHANGE_CREATE_BLOG_CATEGORY_NAME,
        payload: { createBlogCategory: createBlogCategory, isValid: true }
    };
}

const checkCreateBlogTag = (createBlogTag) => {
    if (createBlogTag === null) {
        return { isValid: false, errorMsg: `please select tag` }
    }

    return { isValid: true };
}

export const onchangeCreateBlogTagAct = (selectValue) => {
    const createBlogTag = selectValue;
    const result = checkCreateBlogTag(createBlogTag);
    if (!result.isValid) {
        return { type: ONCHANGE_CREATE_BLOG_TAG, 
            payload: { createBlogTag: createBlogTag, isValid: false, errorMsg: result.errorMsg } };
    }
    return { type: ONCHANGE_CREATE_BLOG_TAG, 
        payload: { createBlogTag: createBlogTag, isValid: true } };
}


const checkCreateBlogSeq = (blogSeq) => {
    if (!blogSeq) {
        return { isValid: false, errorMsg: `Please enter seq` }
    } else if (isNaN(Number(blogSeq))) {
        return { isValid: false, errorMsg: `Seq must be a number` }
    } else if (Number(blogSeq) < 1 || Number(blogSeq) > 1000) {
        return { isValid: false, errorMsg: `Seq must be between 1 to 1000` }
    }

    return { isValid: true };
}

export const onchangeCreateBlogSeqAct = (event) => {
    const blogSeq = event.target.value;
    const result = checkCreateBlogSeq(blogSeq);
    if (!result.isValid) {
        return { type: ONCHANGE_CREATE_BLOG_SEQ, payload: { blogSeq: blogSeq, isValid: false, errorMsg: result.errorMsg } };
    }
    return { type: ONCHANGE_CREATE_BLOG_SEQ, payload: { blogSeq: Number(blogSeq), isValid: true } };
}


export const postBlogAct = () => (dispatch, getState) => {
    let resStatus;
    dispatch({ type: POST_BLOG_PENDING });
    fetch(`${API_PORT}/blog/create`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getState().authRdc.token}`
        },
        body: JSON.stringify({
            blogTitle: getState().blogRdc.createBlogTitle,
            blogCategoryID: getState().blogRdc.createBlogCategory.value,
            blogTag: getState().blogRdc.createBlogTag,
            blogSeq: getState().blogRdc.createBlogSeq,
            blogContent: tinymce.get('blog-content').getContent(),
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
                    return dispatch({ type: POST_BLOG_SUCCESS, payload: res })
                case 400:
                    return dispatch({ type: POST_BLOG_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
                case 500:
                    return dispatch({ type: POST_BLOG_FAILED, payload: { Code: res.Code, errMessage: res.errMessage } })
                default:
                    return dispatch({ type: POST_BLOG_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:BLOG-Create-1), please try again' } })
            }
        })
        .catch(
            () => dispatch({ type: POST_BLOG_FAILED, payload: { Code: 'UNEXPECTED_INTERNAL_SERVER_ERROR', errMessage: 'Internal Server Error(Code:BLOG-Create-2), please try again' } })
        )
}

