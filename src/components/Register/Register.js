import React, { Component } from "react";
import { connect } from 'react-redux';
import { withGoogleReCaptcha } from 'react-google-recaptcha-v3';

import './Register.css';
import { 
    onChangeRegUserNameAct,
    onChangeRegEmailAct,
    onChangeRegPasswordAct,
    postUserAct,
    clearRegUserAct
} from './RegisterAction';

import ValidationAlert from '../ValidationAlert/ValidationAlert';


const mapStateToProps = (state) => {
    return {
      onChangeUserName:     state.authRdc.onChangeUserName,
      onChangeEmail:        state.authRdc.onChangeEmail,
      onChangePassword:     state.authRdc.onChangePassword
    }
  }
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        onChangeRegUserName: (event)=>
            dispatch(onChangeRegUserNameAct(event.target.value)),
        onChangeRegEmail:(event)=>
            dispatch(onChangeRegEmailAct(event.target.value)),
        onChangeRegPassword:(event)=>
            dispatch(onChangeRegPasswordAct(event.target.value)),
        onPostUser: (event) => 
            dispatch(postUserAct(event,ownProps)),
        onClearRegUser :() =>
            dispatch(clearRegUserAct())
    }
}

class Register extends Component {

    componentWillUnmount(){
        const { onClearRegUser } = this.props;
        onClearRegUser();
    }

    componentDidUpdate(){
       
    }

    componentDidMount() {
    }

    render() {

        const {
            onPostUser,
            onChangeRegUserName,
            onChangeRegEmail,
            onChangeRegPassword
            }=this.props;

        return (
            <section id="cover" className="min-vh-100">
                <div id="cover-caption">
                    <div className="container">
                        <h1 className="display-4 py-2 text-white text-truncate">Welcome to Mauton!</h1>
                        <div className="row text-white">
                            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto  form p-4">
                                <h1 className="display-4 py-2 text-truncate">Sign Up</h1>
                                <div className="px-2">
                                    <form>
                                        <div className="form-group">
                                            <label>User Name</label>
                                            <input type="text" className="form-control" 
                                                placeholder="User Name" 
                                                onChange={onChangeRegUserName}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input type="email" className="form-control" 
                                                placeholder="Enter email" 
                                                onChange={onChangeRegEmail}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password" className="form-control" 
                                                placeholder="Enter password"
                                                onChange={onChangeRegPassword}
                                            />
                                        </div>
                                        <ValidationAlert />
                                        <button type="submit" 
                                            className="btn btn-primary btn-block"
                                            onClick = {onPostUser}
                                        >
                                            Sign Up
                                        </button>
                                        <p className="forgot-password text-right">
                                            Already registered <a href="/mauton/login">sign in?</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default withGoogleReCaptcha(connect(mapStateToProps, mapDispatchToProps)(Register))