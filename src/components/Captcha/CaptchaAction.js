import {
    SET_CAPTCHA_TOKEN,
    POST_USER_FAILED
   } from '../../constants';


export const setCaptchaTokenAct =(token)=>{
    return ({type:SET_CAPTCHA_TOKEN, payload:token})
}

export const handleCaptchaErrorAct =()=>{
    return ({type:POST_USER_FAILED, payload:'Captcha Error, please try again'})
}