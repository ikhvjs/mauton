import { combineReducers } from 'redux';

import authRdc from './authRdc';
import topbarRdc from './topbarRdc';
import sidebarRdc from './sidebarRdc';
import blogRdc from './blogRdc';
import categoryRdc from './categoryRdc';
import tagRdc from './tagRdc';
import menu1Rdc from './menu1Rdc';
import menu2Rdc from './menu2Rdc';
import blogListRdc from './blogListRdc';
import errorRdc from './errorRdc';

const rootReducer = combineReducers({
    authRdc,
    topbarRdc,
    sidebarRdc,
    blogRdc,
    categoryRdc,
    tagRdc,
    menu1Rdc,
    menu2Rdc,
    blogListRdc,
    errorRdc
  });
  
  export default rootReducer;