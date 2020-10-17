import React, { Component } from "react";
import { connect } from 'react-redux';

import { withGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { 
    setCaptchaTokenAct,
    handleCaptchaErrorAct
} from './CaptchaAction';
   
const mapStateToProps = (state) => {
    return {
        noOfVerification:state.authRdc.noOfVerification
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        onSetCaptchaToken :(token)=>
            dispatch(setCaptchaTokenAct(token)),
        onHandleCaptchaError :()=>
            dispatch(handleCaptchaErrorAct())
    }
}

class Captcha extends Component {

    async componentDidUpdate(prevProps) {
        if (prevProps.noOfVerification !== this.props.noOfVerification){
            try{
                const token = await this.props.googleReCaptchaProps.executeRecaptcha('submit');
                this.props.onSetCaptchaToken(token);
            }catch(err){
                this.props.onHandleCaptchaError();
            }
        }
    }

    render() {
        return(
            <div></div>
        )
        
    }
}
   

export default withGoogleReCaptcha(connect(mapStateToProps, mapDispatchToProps)(Captcha))