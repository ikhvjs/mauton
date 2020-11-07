import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeMenu1ErrorAlertAct } from './Menu1ErrorAlertAction';
import { Modal } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        isShowRequestMenu1ErrAlert: state.menu1Rdc.isShowRequestMenu1ErrAlert,
        requestMenu1ErrMsg: state.menu1Rdc.requestMenu1ErrMsg,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseErrorAlert: () =>
            dispatch(closeMenu1ErrorAlertAct())
    }
}

class Menu1ErrorAlert extends Component {
    render() {
        const { isShowRequestMenu1ErrAlert,
                onCloseErrorAlert,
                requestMenu1ErrMsg
        } = this.props;

        return (
            <Modal size="md" show={isShowRequestMenu1ErrAlert} onHide={onCloseErrorAlert}>
                <Modal.Header className="modal-error-alert" closeButton>
                    <Modal.Title>Error, Cannot fetch Menu!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-error-alert">
                    {requestMenu1ErrMsg}
                </Modal.Body>
            </Modal>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu1ErrorAlert)