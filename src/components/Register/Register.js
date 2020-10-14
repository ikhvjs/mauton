import React, { Component } from "react";
import { connect } from 'react-redux';

import './Register.css';
import { 
    onChangeRegUserNameAct,
    onChangeRegEmailAct,
    onChangeRegPasswordAct,
    postUserAct,
    clearRegUserAct
} from './RegisterAction';

const mapStateToProps = (state) => {
    return {
      onChangeUserName:     state.authRdc.onChangeUserName,
      onChangeEmail:        state.authRdc.onChangeEmail,
      onChangePassword:     state.authRdc.onChangePassword
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        onChangeRegUserName: (event)=>
            dispatch(onChangeRegUserNameAct(event.target.value)),
        onChangeRegEmail:(event)=>
            dispatch(onChangeRegEmailAct(event.target.value)),
        onChangeRegPassword:(event)=>
            dispatch(onChangeRegPasswordAct(event.target.value)),
        onPostUser: (event) => 
            dispatch(postUserAct(event)),
        onClearRegUser :() =>
            dispatch(clearRegUserAct())
    }
}

class Register extends Component {

    componentWillUnmount(){
        const {onClearRegUser} = this.props;
        onClearRegUser();
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)