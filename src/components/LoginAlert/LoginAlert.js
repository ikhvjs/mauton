import React, { Component } from "react";
import { connect } from 'react-redux';
import { withGoogleReCaptcha } from 'react-google-recaptcha-v3';
import ValidationErrorAlert from '../ValidationErrorAlert/ValidationErrorAlert';

import { 
    onChangeLoginAlertPasswordAct,
    getLoginAlertUserAct,
    clearLoginAlertUserAct,
    loginAlertUserLogOutAct,
    closeLoginAlertAct,
} from './LoginAlertAction';

import { Form, Button, Modal, Spinner } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        userEmail: state.authRdc.userEmail,
        loginAlertPassword: state.authRdc.loginAlertPassword,
        isPendingGetLoginAlertUser: state.authRdc.isPendingGetLoginAlertUser,
        isShowLoginAlert: state.alertRdc.isShowLoginAlert
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChangeLoginAlertPassword: (event) =>
            dispatch(onChangeLoginAlertPasswordAct(event.target.value)),
        onGetLoginAlertUser: (event) =>
            dispatch(getLoginAlertUserAct(event, ownProps)),
        onClearLoginAlertUser: () =>
            dispatch(clearLoginAlertUserAct()),
        onCloseLoginAlert: () => {
            dispatch(closeLoginAlertAct());
            dispatch(loginAlertUserLogOutAct());
        }

    }
}

class LoginAlert extends Component {

    componentWillUnmount() {
        const { onClearLoginAlertUser } = this.props;
        onClearLoginAlertUser();
    }

    render() {
        const {
            isShowLoginAlert,
            onCloseLoginAlert,
            onGetLoginAlertUser,
            userEmail,
            loginAlertPassword,
            onChangeLoginAlertPassword,
            isPendingGetLoginAlertUser,
        } = this.props;

        return (
            <Modal size="md" show={isShowLoginAlert} onHide={onCloseLoginAlert} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Session Time Out, please Sign In again</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formEmail">
                            <Form.Label >
                                Email Address
                                        </Form.Label>
                            <Form.Control name="email"
                                type="email" placeholder="Enter Email" disabled
                                defaultValue={userEmail} />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>
                                Password
                                        </Form.Label>
                            <Form.Control name="password" disabled={isPendingGetLoginAlertUser}
                                type="password" placeholder="Enter Password"
                                value={loginAlertPassword}
                                onChange={onChangeLoginAlertPassword} />
                        </Form.Group>
                        <Button type="submit" disabled={isPendingGetLoginAlertUser} block
                            onClick={onGetLoginAlertUser}
                            className='d-flex align-items-center justify-content-center my-1'>
                            {(isPendingGetLoginAlertUser)
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
                    <ValidationErrorAlert/>
                </Modal.Body>
            </Modal>
        )


    }

}


export default withGoogleReCaptcha(connect(mapStateToProps, mapDispatchToProps)(LoginAlert))