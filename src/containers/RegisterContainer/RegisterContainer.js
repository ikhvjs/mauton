import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { RECAPTCHAT_KEY } from '../../constants';
import Register from '../../components/Register/Register';


const mapStateToProps = (state) => {
    return {
        isAuth:state.authRdc.isAuth
    }
  }

class RegisterContainer extends Component {
    render() {
        return this.props.isAuth ? <Redirect to='/' />
                :(<GoogleReCaptchaProvider reCaptchaKey={RECAPTCHAT_KEY}>
                    <Register />
                </GoogleReCaptchaProvider>);
    }
}
  
export default connect(mapStateToProps, null)(RegisterContainer)