import React, { Component } from "react";
import { connect } from 'react-redux';
import { withGoogleReCaptcha } from 'react-google-recaptcha-v3';

import './Register.css';

import { 
    onChangeRegisterUserNameAct,
    onChangeRegisterEmailAct,
    onChangeRegisterPasswordAct,
    postUserAct,
    clearRegisterUserAct
} from './RegisterAction';

import ValidationErrorAlert from '../ValidationErrorAlert/ValidationErrorAlert';

import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";


const mapStateToProps = (state) => {
    return {
      registerUserName:     state.authRdc.registerUserName,
      registerEmail:        state.authRdc.registerEmail,
      registerPassword:     state.authRdc.registerPassword,
      isPendingPostUser:    state.authRdc.isPendingPostUser
    }
  }
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        onChangeRegisterUserName: (event)=>
            dispatch(onChangeRegisterUserNameAct(event.target.value)),
        onChangeRegisterEmail:(event)=>
            dispatch(onChangeRegisterEmailAct(event.target.value)),
        onChangeRegisterPassword:(event)=>
            dispatch(onChangeRegisterPasswordAct(event.target.value)),
        onPostUser: (event) => 
            dispatch(postUserAct(event,ownProps)),
        onClearRegisterUser :() =>
            dispatch(clearRegisterUserAct())
    }
}

class Register extends Component {

    componentWillUnmount(){
        const { onClearRegisterUser } = this.props;
        onClearRegisterUser();
    }

    render() {

        const {
            onPostUser,
            registerUserName,
            registerEmail,
            registerPassword,
            onChangeRegisterUserName,
            onChangeRegisterEmail,
            onChangeRegisterPassword,
            isPendingPostUser
            }=this.props;

        return (
            <section id="cover" className="min-vh-100">
                <Container id="cover-caption">
                    <Row>
                        <Col>
                            <h1 className="text-center text-white">Welcome to Mauton!</h1>
                        </Col>
                    </Row>
                    <Row className="text-white">
                        <Col sm={10} md={8} lg={6} xl={5} className="mx-auto">
                            <h1 className="py-2 text-center">Sign Up</h1>
                            <Form>
                                <Form.Group controlId="formUserName">
                                    <Form.Label >
                                        User Name
                                        </Form.Label>
                                    <Form.Control name="username" disabled={isPendingPostUser}
                                        type="text" placeholder="Enter Username"
                                        value={registerUserName}
                                        onChange={onChangeRegisterUserName} />
                                </Form.Group>

                                <Form.Group controlId="formEmail">
                                    <Form.Label >
                                        Email Address
                                        </Form.Label>
                                    <Form.Control name="email" disabled={isPendingPostUser}
                                        type="email" placeholder="Enter Email"
                                        value={registerEmail}
                                        onChange={onChangeRegisterEmail} />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>
                                        Password
                                        </Form.Label>
                                    <Form.Control name="password" disabled={isPendingPostUser}
                                        type="password" placeholder="Enter Password"
                                        value={registerPassword}
                                        onChange={onChangeRegisterPassword} />
                                </Form.Group>
                                <Button type="submit" disabled={isPendingPostUser} block
                                    onClick={onPostUser}
                                    className='d-flex align-items-center justify-content-center my-1'>
                                    {(isPendingPostUser)
                                        ? (<Spinner className='mr-1'
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        )
                                        : null
                                    }
                                    Register
                                </Button>
                            </Form>
                            <ValidationErrorAlert />
                            <p className="text-right">
                                Already register?
                                <a href="/mauton/#/login">
                                    {` Sign in`}
                                </a>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section >
        );
    }
}

export default withGoogleReCaptcha(connect(mapStateToProps, mapDispatchToProps)(Register))