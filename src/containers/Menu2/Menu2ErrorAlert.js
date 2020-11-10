import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeMenu2ErrorAlertAct } from './Menu2ErrorAlertAction';
import { Modal } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        isShowRequestMenu2ErrAlert: state.menu2Rdc.isShowRequestMenu2ErrAlert,
        requestMenu2ErrMsg: state.menu2Rdc.requestMenu2ErrMsg,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseErrorAlert: () =>
            dispatch(closeMenu2ErrorAlertAct())
    }
}

class Menu2ErrorAlert extends Component {
    render() {
        const { isShowRequestMenu2ErrAlert,
                onCloseErrorAlert,
                requestMenu2ErrMsg
        } = this.props;

        return (
            <Modal size="md" show={isShowRequestMenu2ErrAlert} onHide={onCloseErrorAlert}>
                <Modal.Header className="modal-error-alert" closeButton>
                    <Modal.Title>Error, Cannot fetch Menu!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-error-alert">
                    {requestMenu2ErrMsg}
                </Modal.Body>
            </Modal>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu2ErrorAlert)