import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeDeleteMenu1Act, deleteMenu1Act } from './Menu1DeleteAction';

import { Button, Row, Col, Modal, Spinner } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        isShowDeleteMenu1: state.menu1Rdc.isShowDeleteMenu1,
        isPendingDeleteMenu1: state.menu1Rdc.isPendingDeleteMenu1,
        isDeleteMenu1Failed: state.menu1Rdc.isDeleteMenu1Failed,
        deleteMenu1ErrMsg: state.menu1Rdc.deleteMenu1ErrMsg,
        deleteMenu1Name: state.menu1Rdc.deleteMenu1Name
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseDeleteMenu1: () =>
            dispatch(closeDeleteMenu1Act()),
        onDeleteMenu1: () =>
            dispatch(deleteMenu1Act())
    }
}

class Menu1Delete extends Component {

    render() {
        const {
            isShowDeleteMenu1,
            isPendingDeleteMenu1,
            onCloseDeleteMenu1,
            onDeleteMenu1,
            deleteMenu1ErrMsg,
            isDeleteMenu1Failed,
            deleteMenu1Name
        } = this.props;

        return (
            <Modal size="md" show={isShowDeleteMenu1} onHide={onCloseDeleteMenu1}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Menu Section</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(isDeleteMenu1Failed)
                        ? (<Row>
                            <Col className="delete-menu1-err-msg">
                                {deleteMenu1ErrMsg}
                            </Col>
                        </Row>)
                        : (<Row>
                            <Col>
                                {`Are you sure to delete Menu<${deleteMenu1Name}>?`}
                            </Col>
                        </Row>)
                    }
                    {
                        (isPendingDeleteMenu1)
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
                                    {(isDeleteMenu1Failed)
                                        ? null
                                        : (<Button
                                            className="mb-1 mx-1"
                                            name="delete" onClick={onDeleteMenu1}
                                            variant="danger" size="sm">
                                            Delete
                                        </Button>)
                                    }
                                    <Button
                                        className="mb-1 mx-1"
                                        name="cancel" onClick={onCloseDeleteMenu1}
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


export default connect(mapStateToProps, mapDispatchToProps)(Menu1Delete)