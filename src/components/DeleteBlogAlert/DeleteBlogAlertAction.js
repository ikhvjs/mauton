import {
  SHOW_DELETE_BLOG_ALERT,
  CLOSE_DELETE_BLOG_ALERT
 } from '../../constants';

export const closeDeleteBlogAlertAct = ()  => {
  return ({type: CLOSE_DELETE_BLOG_ALERT})
}

export const showDeleteBlogAlertAct = ()  => {
  return ({type: SHOW_DELETE_BLOG_ALERT})
}