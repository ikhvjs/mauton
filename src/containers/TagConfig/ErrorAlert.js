import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeErrorAlertAct } from './TagModalAction';
import { Modal } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        isShowErrorAlert: state.alertRdc.isShowErrorAlert
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseErrorAlert: () =>
            dispatch(closeErrorAlertAct())
    }
}

class ErrorAlert extends Component {
    render() {
        const { isShowAlert,
            onCloseAlert,
            errorMsg
        } = this.props;

        return (
            <Modal size="md" show={isShowAlert} onHide={onCloseAlert}>
                <Modal.Header closeButton>
                    <Modal.Title>You got an Error!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMsg}
                </Modal.Body>
            </Modal>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ErrorAlert)