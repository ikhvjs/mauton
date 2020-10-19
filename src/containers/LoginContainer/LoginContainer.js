import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { RECAPTCHAT_KEY } from '../../constants';

import Login from '../../components/Login/Login';


const mapStateToProps = (state) => {
    return {
      isAuth:state.authRdc.isAuth
    }
  }
  
const mapDispatchToProps = () => {
    return {
    }
}

class LoginContainer extends Component {
    render() {
        const { isAuth } = this.props;
        return isAuth 
        ?<Redirect to='/' />
        :(<GoogleReCaptchaProvider reCaptchaKey={RECAPTCHAT_KEY}>
            <Login />
          </GoogleReCaptchaProvider>);
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)