import React, { Component } from "react";
import { connect } from 'react-redux';
import './Login.css';
import ValidationAlert from '../ValidationAlert/ValidationAlert';

import { 
    onChangeLoginEmailAct,
    onChangeLoginPasswordAct,
    getUserAct,
    clearLoginUserAct
} from './LoginAction';

const mapStateToProps = (state) => {
    return {
      onChangeEmail:        state.authRdc.onChangeEmail,
      onChangePassword:     state.authRdc.onChangePassword
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeLoginEmail:(event)=>
            dispatch(onChangeLoginEmailAct(event.target.value)),
        onChangeLoginPassword:(event)=>
            dispatch(onChangeLoginPasswordAct(event.target.value)),
        onGetUser: (event) => 
            dispatch(getUserAct(event)),
        onClearLoginUser :() =>
            dispatch(clearLoginUserAct())
    }
}


class Login extends Component {

    componentWillUnmount(){
        const {onClearLoginUser} = this.props;
        onClearLoginUser();
    }


    render() {
        const {
            onGetUser,
            onChangeLoginEmail,
            onChangeLoginPassword
            }=this.props;

        return (
            <section id="cover" className="min-vh-100">
                <div id="cover-caption">
                    <div className="container">
                    <h1 className="display-4 py-2 text-white text-truncate">Welcome to Mauton!</h1>
                        <div className="row text-white">
                            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto  form p-4">
                                <h1 className="display-4 py-2 text-truncate">Sign In</h1>
                                <div className="px-2">
                                    <form>
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input type="email" className="form-control" 
                                            placeholder="Enter email" 
                                            onChange={onChangeLoginEmail}/>
                                        </div>

                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password" className="form-control" 
                                            placeholder="Enter password" 
                                            onChange={onChangeLoginPassword}/>
                                        </div>
                                        {
                                        /*
                                            <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                            </div>
                                        </div>
                                            */
                                        }
                                        
                                        <ValidationAlert />
                                        <button type="submit" className="btn btn-primary btn-block"
                                            onClick={onGetUser}>
                                            Submit
                                        </button>
                                        <p className="forgot-password text-right">
                                            {/*
                                            Forgot <a href="/forgot">password</a>? Or 
                                            */
                                            }
                                            Not yet  <a href="/mauton/register">register</a>?
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)