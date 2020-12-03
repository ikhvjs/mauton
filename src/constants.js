/*----------------API PORT----------------------*/
// export const API_PORT = 'https://floating-depths-39554.herokuapp.com';
export const API_PORT = 'http://localhost:3001';


/*----------------ReCaptchat----------------------*/
export const RECAPTCHAT_KEY = '6LcqXdgZAAAAAFoX6zuxeUH39LsB8JbFdd9TiVv0';
export const GET_CAPTCHA_TOKEN_SUCCESS = 'GET_CAPTCHA_TOKEN_SUCCESS';
export const GET_CAPTCHA_TOKEN_FAILED = 'GET_CAPTCHA_TOKEN_FAILED';


/*----------------TOPBAR----------------------*/
export const REQUEST_TOPBAR_PENDING = 'REQUEST_TOPBAR_PENDING';
export const REQUEST_TOPBAR_SUCCESS = 'REQUEST_TOPBAR_SUCCESS';
export const REQUEST_TOPBAR_FAILED = 'REQUEST_TOPBAR_FAILED';
export const SELECT_TOPBAR_MENU_ID = 'SELECT_TOPBAR_MENU_ID';
export const USER_LOG_OUT = 'USER_LOG_OUT';


/*----------------SIDEBAR----------------------*/
export const REQUEST_SIDEBAR_PENDING = 'REQUEST_SIDEBAR_PENDING';
export const REQUEST_SIDEBAR_SUCCESS = 'REQUEST_SIDEBAR_SUCCESS';
export const REQUEST_SIDEBAR_FAILED = 'REQUEST_SIDEBAR_FAILED';
export const SELECT_SIDEBAR = 'SELECT_SIDEBAR';



/*----------------ERROR----------------------*/
export const CLOSE_REQUEST_ERROR_ALERT = 'CLOSE_REQUEST_ERROR_ALERT';



/*----------------BLOGLIST----------------------*/
export const REQUEST_BLOGLIST_PENDING = 'REQUEST_BLOGLIST_PENDING';
export const REQUEST_BLOGLIST_SUCCESS = 'REQUEST_BLOGLIST_SUCCESS';
export const REQUEST_BLOGLIST_FAILED = 'REQUEST_BLOGLIST_FAILED';

export const REQUEST_BLOGLIST_C_PENDING = 'REQUEST_BLOGLIST_C_PENDING';
export const REQUEST_BLOGLIST_C_SUCCESS = 'REQUEST_BLOGLIST_C_SUCCESS';
export const REQUEST_BLOGLIST_C_FAILED = 'REQUEST_BLOGLIST_C_FAILED';

export const SEARCH_BLOGLIST_PENDING = 'SEARCH_BLOGLIST_PENDING';
export const SEARCH_BLOGLIST_SUCCESS = 'SEARCH_BLOGLIST_SUCCESS';
export const SEARCH_BLOGLIST_FAILED = 'SEARCH_BLOGLIST_FAILED';
export const ONCHANGE_SEARCH_BLOGLIST_BLOG_TITLE = 'ONCHANGE_SEARCH_BLOGLIST_BLOG_TITLE';
export const ONCHANGE_SEARCH_BLOGLIST_CATEGORY_NAME = 'ONCHANGE_SEARCH_BLOGLIST_CATEGORY_NAME';
export const ONCHANGE_SEARCH_BLOGLIST_TAG_NAME = 'ONCHANGE_SEARCH_BLOGLIST_TAG_NAME';

export const CLEAR_SEARCH_BLOGLIST = 'CLEAR_SEARCH_BLOGLIST';




/*----------------BLOG----------------------*/
//select blog
export const SELECT_BLOG = 'SELECT_BLOG';


//request blog
export const REQUEST_BLOG_PENDING = 'REQUEST_BLOG_PENDING';
export const REQUEST_BLOG_SUCCESS = 'REQUEST_BLOG_SUCCESS';
export const REQUEST_BLOG_FAILED = 'REQUEST_BLOG_FAILED';

//create blog
export const SELECT_CREATE_BLOG = 'SELECT_CREATE_BLOG';
export const CLOSE_CREATE_BLOG = 'CLOSE_CREATE_BLOG';
export const ONCHANGE_CREATE_BLOG_TITLE = 'ONCHANGE_CREATE_BLOG_TITLE';
export const ONCHANGE_CREATE_BLOG_CATEGORY_NAME = 'ONCHANGE_CREATE_BLOG_CATEGORY_NAME';
export const ONCHANGE_CREATE_BLOG_TAG = 'ONCHANGE_CREATE_BLOG_TAG';
export const ONCHANGE_CREATE_BLOG_SEQ = 'ONCHANGE_CREATE_BLOG_SEQ';
export const POST_BLOG_PENDING = 'POST_BLOG_PENDING';
export const POST_BLOG_SUCCESS = 'POST_BLOG_SUCCESS';
export const POST_BLOG_FAILED = 'POST_BLOG_FAILED';

//delete blog
export const SELECT_DELETE_BLOG = 'SELECT_DELETE_BLOG';
export const CLOSE_DELETE_BLOG = 'CLOSE_DELETE_BLOG';
export const DELETE_BLOG_PENDING = 'DELETE_BLOG_PENDING';
export const DELETE_BLOG_SUCCESS = 'DELETE_BLOG_SUCCESS';
export const DELETE_BLOG_FAILED = 'DELETE_BLOG_FAILED';

//update blog
export const SELECT_UPDATE_BLOG = 'SELECT_UPDATE_BLOG';
export const CLOSE_UPDATE_BLOG = 'CLOSE_UPDATE_BLOG';
export const ONCHANGE_UPDATE_BLOG_TITLE = 'ONCHANGE_UPDATE_BLOG_TITLE';
export const ONCHANGE_UPDATE_BLOG_CATEGORY_NAME = 'ONCHANGE_UPDATE_BLOG_CATEGORY_NAME';
export const ONCHANGE_UPDATE_BLOG_TAG = 'ONCHANGE_UPDATE_BLOG_TAG';
export const ONCHANGE_UPDATE_BLOG_SEQ = 'ONCHANGE_UPDATE_BLOG_SEQ';
export const UPDATE_BLOG_PENDING = 'UPDATE_BLOG_PENDING';
export const UPDATE_BLOG_SUCCESS = 'UPDATE_BLOG_SUCCESS';
export const UPDATE_BLOG_FAILED = 'UPDATE_BLOG_FAILED';






/*----------------CATEGORY----------------------*/
//request category
export const REQUEST_CATEGORY_PENDING = 'REQUEST_CATEGORY_PENDING';
export const REQUEST_CATEGORY_SUCCESS = 'REQUEST_CATEGORY_SUCCESS';
export const REQUEST_CATEGORY_FAILED = 'REQUEST_CATEGORY_FAILED';

// export const CLOSE_CATEGORY_ERROR_ALERT  ='CLOSE_CATEGORY_ERROR_ALERT';

//search category
export const SEARCH_CATEGORY_PENDING = 'SEARCH_CATEGORY_PENDING';
export const SEARCH_CATEGORY_SUCCESS = 'SEARCH_CATEGORY_SUCCESS';
export const SEARCH_CATEGORY_FAILED = 'SEARCH_CATEGORY_FAILED';

export const CLEAR_SEARCH_CATEGORY = 'CLEAR_SEARCH_CATEGORY';
export const ONCHANGE_SEARCH_CATEGORY_NAME = 'ONCHANGE_SEARCH_CATEGORY_NAME';
export const ONCHANGE_SEARCH_CATEGORY_DESC = 'ONCHANGE_SEARCH_CATEGORY_DESC';


//create category
export const POST_CATEGORY_PENDING = 'POST_CATEGORY_PENDING';
export const POST_CATEGORY_SUCCESS = 'POST_CATEGORY_SUCCESS';
export const POST_CATEGORY_FAILED = 'POST_CATEGORY_FAILED';
export const SELECT_CREATE_CATEGORY = 'SELECT_CREATE_CATEGORY';
export const CLEAR_CREATE_CATEGORY = 'CLEAR_CREATE_CATEGORY';
export const CLOSE_CREATE_CATEGORY = 'CLOSE_CREATE_CATEGORY';
export const ONCHANGE_CREATE_CATEGORY_NAME = 'ONCHANGE_CREATE_CATEGORY_NAME';
export const ONCHANGE_CREATE_CATEGORY_DESC = 'ONCHANGE_CREATE_CATEGORY_DESC';
export const ONCHANGE_CREATE_CATEGORY_SEQ = 'ONCHANGE_CREATE_CATEGORY_SEQ';

//delete category
export const DELETE_CATEGORY_PENDING = 'DELETE_CATEGORY_PENDING';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILED = 'DELETE_CATEGORY_FAILED';
export const CLOSE_DELETE_CATEGORY = 'CLOSE_DELETE_CATEGORY';
export const SELECT_DELETE_CATEGORY = 'SELECT_DELETE_CATEGORY';

//update category
export const UPDATE_CATEGORY_PENDING = 'UPDATE_CATEGORY_PENDING';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAILED = 'UPDATE_CATEGORY_FAILED';
export const SELECT_UPDATE_CATEGORY = 'SELECT_UPDATE_CATEGORY';
export const CLOSE_UPDATE_CATEGORY = 'CLOSE_UPDATE_CATEGORY';
export const ONCHANGE_UPDATE_CATEGORY_NAME = 'ONCHANGE_UPDATE_CATEGORY_NAME';
export const ONCHANGE_UPDATE_CATEGORY_DESC = 'ONCHANGE_UPDATE_CATEGORY_DESC';
export const ONCHANGE_UPDATE_CATEGORY_SEQ = 'ONCHANGE_UPDATE_CATEGORY_SEQ';





/*----------------TAG----------------------*/
//request tag
export const REQUEST_TAG_PENDING = 'REQUEST_TAG_PENDING';
export const REQUEST_TAG_SUCCESS = 'REQUEST_TAG_SUCCESS';
export const REQUEST_TAG_FAILED = 'REQUEST_TAG_FAILED';

// export const CLOSE_TAG_ERROR_ALERT = 'CLOSE_TAG_ERROR_ALERT';
//search tag
export const SEARCH_TAG_PENDING = 'SEARCH_TAG_PENDING';
export const SEARCH_TAG_SUCCESS = 'SEARCH_TAG_SUCCESS';
export const SEARCH_TAG_FAILED = 'SEARCH_TAG_FAILED';
export const ONCHANGE_SEARCH_TAG_NAME = 'ONCHANGE_SEARCH_TAG_NAME';
export const CLEAR_SEARCH_TAG = 'CLEAR_SEARCH_TAG';

//create tag
export const SELECT_CREATE_TAG = 'SELECT_CREATE_TAG';
export const CLOSE_CREATE_TAG = 'CLOSE_CREATE_TAG';
export const POST_TAG_PENDING = 'POST_TAG_PENDING';
export const POST_TAG_SUCCESS = 'POST_TAG_SUCCESS';
export const POST_TAG_FAILED = 'POST_TAG_FAILED';
export const CLEAR_CREATE_TAG = 'CLEAR_CREATE_TAG';
export const ONCHANGE_CREATE_TAG_NAME = 'ONCHANGE_CREATE_TAG_NAME';
export const ONCHANGE_CREATE_TAG_SEQ = 'ONCHANGE_CREATE_TAG_SEQ';

//delete tag
export const SELECT_DELETE_TAG = 'SELECT_DELETE_TAG';
export const CLOSE_DELETE_TAG = 'CLOSE_DELETE_TAG';
export const DELETE_TAG_PENDING = 'DELETE_TAG_PENDING';
export const DELETE_TAG_SUCCESS = 'DELETE_TAG_SUCCESS';
export const DELETE_TAG_FAILED = 'DELETE_TAG_FAILED';

//update tag
export const SELECT_UPDATE_TAG = 'SELECT_UPDATE_TAG';
export const CLOSE_UPDATE_TAG = 'CLOSE_UPDATE_TAG';
export const UPDATE_TAG_PENDING = 'UPDATE_TAG_PENDING';
export const UPDATE_TAG_SUCCESS = 'UPDATE_TAG_SUCCESS';
export const UPDATE_TAG_FAILED = 'UPDATE_TAG_FAILED';
export const ONCHANGE_UPDATE_TAG_NAME = 'ONCHANGE_UPDATE_TAG_NAME';
export const ONCHANGE_UPDATE_TAG_SEQ = 'ONCHANGE_UPDATE_TAG_SEQ';

/*-------------------MENU1---------------------------*/
//request menu1
export const REQUEST_MENU1_PENDING = 'REQUEST_MENU1_PENDING';
export const REQUEST_MENU1_SUCCESS = 'REQUEST_MENU1_SUCCESS';
export const REQUEST_MENU1_FAILED = 'REQUEST_MENU1_FAILED';
export const CLOSE_MENU1_ERROR_ALERT = 'CLOSE_MENU1_ERROR_ALERT';

//search menu1
export const ONCHANGE_SEARCH_MENU1_NAME = 'ONCHANGE_SEARCH_MENU1_NAME';
export const SEARCH_MENU1_PENDING = 'SEARCH_MENU1_PENDING';
export const SEARCH_MENU1_SUCCESS = 'SEARCH_MENU1_SUCCESS';
export const SEARCH_MENU1_FAILED = 'SEARCH_MENU1_FAILED';
export const CLEAR_SEARCH_MENU1 = 'CLEAR_SEARCH_MENU1';

//create menu1
export const POST_MENU1_PENDING = 'POST_MENU1_PENDING';
export const POST_MENU1_SUCCESS = 'POST_MENU1_SUCCESS';
export const POST_MENU1_FAILED = 'POST_MENU1_FAILED';
export const CLEAR_CREATE_MENU1 = 'CLEAR_CREATE_MENU1';
export const SELECT_CREATE_MENU1 = 'SELECT_CREATE_MENU1';
export const CLOSE_CREATE_MENU1 = 'CLOSE_CREATE_MENU1';
export const ONCHANGE_CREATE_MENU1_NAME = 'ONCHANGE_CREATE_MENU1_NAME';
export const ONCHANGE_CREATE_MENU1_SEQ = 'ONCHANGE_CREATE_MENU1_SEQ';

//delete menu1
export const DELETE_MENU1_PENDING = 'DELETE_MENU1_PENDING';
export const DELETE_MENU1_SUCCESS = 'DELETE_MENU1_SUCCESS';
export const DELETE_MENU1_FAILED = 'DELETE_MENU1_FAILED';
export const SELECT_DELETE_MENU1 = 'SELECT_DELETE_MENU1';
export const CLOSE_DELETE_MENU1 = 'CLOSE_DELETE_MENU1';

//update menu1
export const SELECT_UPDATE_MENU1 = 'SELECT_UPDATE_MENU1';
export const UPDATE_MENU1_PENDING = 'UPDATE_MENU1_PENDING';
export const UPDATE_MENU1_SUCCESS = 'UPDATE_MENU1_SUCCESS';
export const UPDATE_MENU1_FAILED = 'UPDATE_MENU1_FAILED';
export const ONCHANGE_UPDATE_MENU1_NAME = 'ONCHANGE_UPDATE_MENU1_NAME';
export const ONCHANGE_UPDATE_MENU1_SEQ = 'ONCHANGE_UPDATE_MENU1_SEQ';
export const CLOSE_UPDATE_MENU1 = 'CLOSE_UPDATE_MENU1';



/*-------------------MENU2---------------------------*/
//request menu2
export const REQUEST_MENU2_PENDING = 'REQUEST_MENU2_PENDING';
export const REQUEST_MENU2_SUCCESS = 'REQUEST_MENU2_SUCCESS';
export const REQUEST_MENU2_FAILED = 'REQUEST_MENU2_FAILED';
export const CLOSE_MENU2_ERROR_ALERT = 'CLOSE_MENU2_ERROR_ALERT';

//search menu2
export const SEARCH_MENU2_PENDING = 'SEARCH_MENU2_PENDING';
export const SEARCH_MENU2_SUCCESS = 'SEARCH_MENU2_SUCCESS';
export const SEARCH_MENU2_FAILED = 'SEARCH_MENU2_FAILED';
export const CLEAR_SEARCH_MENU2 = 'CLEAR_SEARCH_MENU2';
export const ONCHANGE_SEARCH_MENU2_NAME = 'ONCHANGE_SEARCH_MENU2_NAME';
export const ONCHANGE_SEARCH_MENU2_PARENT_NAME = 'ONCHANGE_SEARCH_MENU2_PARENT_NAME';


//create menu2
export const SELECT_CREATE_MENU2 = 'SELECT_CREATE_MENU2';
export const POST_MENU2_PENDING = 'POST_MENU2_PENDING';
export const POST_MENU2_SUCCESS = 'POST_MENU2_SUCCESS';
export const POST_MENU2_FAILED = 'POST_MENU2_FAILED';
export const CLOSE_CREATE_MENU2 = 'CLOSE_CREATE_MENU2';
export const ONCHANGE_CREATE_MENU2_NAME = 'ONCHANGE_CREATE_MENU2_NAME';
export const ONCHANGE_CREATE_MENU2_PARENT_NAME = 'ONCHANGE_CREATE_MENU2_PARENT_NAME';
export const ONCHANGE_CREATE_MENU2_SEQ = 'ONCHANGE_CREATE_MENU2_SEQ';

//delete menu2
export const SELECT_DELETE_MENU2 = 'SELECT_DELETE_MENU2';
export const DELETE_MENU2_PENDING = 'DELETE_MENU2_PENDING';
export const DELETE_MENU2_SUCCESS = 'DELETE_MENU2_SUCCESS';
export const DELETE_MENU2_FAILED = 'DELETE_MENU2_FAILED';
export const CLOSE_DELETE_MENU2 = 'CLOSE_DELETE_MENU2';


//updat menu2
export const SELECT_UPDATE_MENU2 = 'SELECT_UPDATE_MENU2';
export const UPDATE_MENU2_PENDING = 'UPDATE_MENU2_PENDING';
export const UPDATE_MENU2_SUCCESS = 'UPDATE_MENU2_SUCCESS';
export const UPDATE_MENU2_FAILED = 'UPDATE_MENU2_FAILED';
export const CLOSE_UPDATE_MENU2 = 'CLOSE_UPDATE_MENU2';
export const ONCHANGE_UPDATE_MENU2_NAME = 'ONCHANGE_UPDATE_MENU2_NAME';
export const ONCHANGE_UPDATE_MENU2_PARENT_NAME = 'ONCHANGE_UPDATE_MENU2_PARENT_NAME';
export const ONCHANGE_UPDATE_MENU2_SEQ = 'ONCHANGE_UPDATE_MENU2_SEQ';
export const CLEAR_CREATE_MENU2 = 'CLEAR_CREATE_MENU2';



//ALERT
export const SHOW_DELETE_BLOG_ALERT = 'SHOW_DELETE_BLOG_ALERT';
export const CLOSE_DELETE_BLOG_ALERT = 'CLOSE_DELETE_BLOG_ALERT';

//AUTH
export const ONCHANGE_REG_USER_NAME = 'ONCHANGE_REG_USER_NAME';
export const ONCHANGE_REG_EMAIL = 'ONCHANGE_REG_EMAIL';
export const ONCHANGE_REG_PASSWORD = 'ONCHANGE_REG_PASSWORD';

export const POST_USER_PENDING = 'POST_USER_PENDING';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const POST_USER_FAILED = 'POST_USER_FAILED';

export const CLEAR_REG_USER = 'CLEAR_REG_USER';

export const ONCHANGE_LOGIN_EMAIL = 'ONCHANGE_LOGIN_EMAIL';
export const ONCHANGE_LOGIN_PASSWORD = 'ONCHANGE_LOGIN_PASSWORD';

export const GET_USER_PENDING = 'GET_USER_PENDING';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const CLEAR_LOGIN_USER = 'CLEAR_LOGIN_USER';

export const CLOSE_REG_ALERT = 'CLOSE_REG_ALERT';
