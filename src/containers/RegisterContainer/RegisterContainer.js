import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import Register from '../../components/Register/Register';


const mapStateToProps = (state) => {
    return {
        isAuth:state.authRdc.isAuth
    }
  }
  
const mapDispatchToProps = () => {
    return {
    }
}

class RegisterContainer extends Component {
    render() {
        const { isAuth } = this.props;
        return isAuth? <Redirect to='/' />:<Register />;
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)