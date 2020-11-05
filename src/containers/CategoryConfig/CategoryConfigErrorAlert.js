import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeCategoryErrorAlertAct } from './CategoryConfigErrorAlertAction';
import { Modal } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        isShowRequestCategoryErrAlert: state.categoryRdc.isShowRequestCategoryErrAlert,
        requestCategoryErrMsg: state.categoryRdc.requestCategoryErrMsg,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseCategoryErrorAlert: () =>
            dispatch(closeCategoryErrorAlertAct())
    }
}

class CategoryConfigErrorAlert extends Component {
    render() {
        const { isShowRequestCategoryErrAlert,
                onCloseCategoryErrorAlert,
                requestCategoryErrMsg
        } = this.props;


        return (
            <Modal size="md" show={isShowRequestCategoryErrAlert} onHide={onCloseCategoryErrorAlert}>
                <Modal.Header className="modal-error-alert" closeButton>
                    <Modal.Title>Error, Cannot fetch Category!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-error-alert">
                    {requestCategoryErrMsg}
                </Modal.Body>
            </Modal>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CategoryConfigErrorAlert)