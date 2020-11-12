import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeDeleteMenu2Act, deleteMenu2Act } from './Menu2DeleteAction';

import { Button, Row, Col, Modal, Spinner } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        isShowDeleteMenu2: state.menu2Rdc.isShowDeleteMenu2,
        isPendingDeleteMenu2: state.menu2Rdc.isPendingDeleteMenu2,
        isDeleteMenu2Failed: state.menu2Rdc.isDeleteMenu2Failed,
        deleteMenu2ErrMsg: state.menu2Rdc.deleteMenu2ErrMsg,
        deleteMenu2Name: state.menu2Rdc.deleteMenu2Name
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseDeleteMenu2: () =>
            dispatch(closeDeleteMenu2Act()),
        onDeleteMenu2: () =>
            dispatch(deleteMenu2Act())
    }
}

class Menu2Delete extends Component {

    render() {
        const {
            isShowDeleteMenu2,
            isPendingDeleteMenu2,
            onCloseDeleteMenu2,
            onDeleteMenu2,
            deleteMenu2ErrMsg,
            isDeleteMenu2Failed,
            deleteMenu2Name
        } = this.props;

        return (
            <Modal size="md" show={isShowDeleteMenu2} onHide={onCloseDeleteMenu2}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Menu Section</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(isDeleteMenu2Failed)
                        ? (<Row>
                            <Col className="delete-menu2-err-msg">
                                {deleteMenu2ErrMsg}
                            </Col>
                        </Row>)
                        : (<Row>
                            <Col>
                                {`Are you sure to delete Menu<${deleteMenu2Name}>?`}
                            </Col>
                        </Row>)
                    }
                    {
                        (isPendingDeleteMenu2)
                            ? (<div className="row d-flex align-items-center justify-content-end">
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Deleting...
                            </div>)
                            : (
                                <Row className="d-flex justify-content-end">
                                    {(isDeleteMenu2Failed)
                                        ? null
                                        : (<Button
                                            className="mb-1 mx-1"
                                            name="delete" onClick={onDeleteMenu2}
                                            variant="danger" size="sm">
                                            Delete
                                        </Button>)
                                    }
                                    <Button
                                        className="mb-1 mx-1"
                                        name="cancel" onClick={onCloseDeleteMenu2}
                                        variant="secondary" size="sm">
                                        Cancel
                                </Button>
                                </Row>)
                    }
                </Modal.Body>
            </Modal>
        )


    }

}


export default connect(mapStateToProps, mapDispatchToProps)(Menu2Delete)