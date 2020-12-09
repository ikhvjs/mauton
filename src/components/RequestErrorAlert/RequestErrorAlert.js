import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeRequestErrorAlertAct } from './RequestErrorAlertAction';
import { Modal } from "react-bootstrap";
import './RequestErrorAlert.css';

const mapStateToProps = (state) => {
    return {
        isShowRequestErrAlert: state.alertRdc.isShowRequestErrAlert,
        requestErrMsg: state.alertRdc.requestErrMsg,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseRequestErrorAlert: () =>
            dispatch(closeRequestErrorAlertAct())
    }
}

class RequestErrorAlert extends Component {
    render() {
        const { isShowRequestErrAlert,
                onCloseRequestErrorAlert,
                requestErrMsg
        } = this.props;


        return (
            <Modal size="md" show={isShowRequestErrAlert} onHide={onCloseRequestErrorAlert}>
                <Modal.Header className="modal-error-alert" closeButton>
                    <Modal.Title>Error, Cannot fetch data!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-error-alert">
                    {requestErrMsg}
                </Modal.Body>
            </Modal>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RequestErrorAlert)