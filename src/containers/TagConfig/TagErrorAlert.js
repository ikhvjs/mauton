import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeErrorAlertAct } from './TagErrorAlertAction';
import { Modal } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        isShowRequestTagErrAlert: state.tagRdc.isShowRequestTagErrAlert,
        requestTagErrMsg: state.tagRdc.requestTagErrMsg,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseErrorAlert: () =>
            dispatch(closeErrorAlertAct())
    }
}

class TagErrorAlert extends Component {
    render() {
        const { isShowRequestTagErrAlert,
                onCloseErrorAlert,
                requestTagErrMsg
        } = this.props;

        return (
            <Modal size="md" show={isShowRequestTagErrAlert} onHide={onCloseErrorAlert}>
                <Modal.Header className="modal-error-alert" closeButton>
                    <Modal.Title>You got an Error!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-error-alert">
                    {requestTagErrMsg}
                </Modal.Body>
            </Modal>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TagErrorAlert)