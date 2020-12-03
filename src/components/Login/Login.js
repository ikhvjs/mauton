import React, { Component } from "react";
import { connect } from 'react-redux';
import { withGoogleReCaptcha } from 'react-google-recaptcha-v3';

import './Login.css';
import ValidationAlert from '../ValidationAlert/ValidationAlert';
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";

import {
    onChangeLoginEmailAct,
    onChangeLoginPasswordAct,
    getUserAct,
    clearLoginUserAct
} from './LoginAction';

const mapStateToProps = (state) => {
    return {
        loginEmail: state.authRdc.loginEmail,
        loginPassword: state.authRdc.loginPassword,
        isPendingGetUser: state.authRdc.isPendingGetUser
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChangeLoginEmail: (event) =>
            dispatch(onChangeLoginEmailAct(event.target.value)),
        onChangeLoginPassword: (event) =>
            dispatch(onChangeLoginPasswordAct(event.target.value)),
        onGetUser: (event) =>
            dispatch(getUserAct(event, ownProps)),
        onClearLoginUser: () =>
            dispatch(clearLoginUserAct())
    }
}


class Login extends Component {

    componentWillUnmount() {
        const { onClearLoginUser } = this.props;
        onClearLoginUser();
    }


    render() {
        const {
            onGetUser,
            loginEmail,
            loginPassword,
            onChangeLoginEmail,
            onChangeLoginPassword,
            isPendingGetUser
        } = this.props;

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
                            <h1 className="py-2 text-center">Sign In</h1>
                            <Form>
                                <Form.Group controlId="formEmail">
                                    <Form.Label >
                                        Email Address
                                        </Form.Label>
                                    <Form.Control name="email"
                                        type="email" placeholder="Enter Email"
                                        value={loginEmail}
                                        onChange={onChangeLoginEmail} />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>
                                        Password
                                        </Form.Label>
                                    <Form.Control name="password"
                                        type="password" placeholder="Enter Password"
                                        value={loginPassword}
                                        onChange={onChangeLoginPassword} />
                                </Form.Group>
                                <Button type="submit" disabled={isPendingGetUser} block
                                    onClick={onGetUser}
                                    className='d-flex align-items-center justify-content-center my-1'>
                                    {(isPendingGetUser)
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
                                    Sign in
                                </Button>
                            </Form>
                            <ValidationAlert />
                            <p className="text-right">
                                Not yet
                                <a href="/mauton/register">
                                    {` register`}
                                </a>
                                ?
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section >
        );
    }
}

export default withGoogleReCaptcha(connect(mapStateToProps, mapDispatchToProps)(Login))