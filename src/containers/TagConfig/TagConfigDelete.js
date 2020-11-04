import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeDeleteTagAct, deleteTagAct } from './TagConfigDeleteAction';

import { Button, Row, Col, Modal, Spinner } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        isShowDeleteTag: state.tagRdc.isShowDeleteTag,
        isPendingDeleteTag: state.tagRdc.isPendingDeleteTag,
        isDeleteTagFailed: state.tagRdc.isDeleteTagFailed,
        deleteTagErrMsg: state.tagRdc.deleteTagErrMsg,
        deleteTagName: state.tagRdc.deleteTagName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseDeleteTag: () =>
            dispatch(closeDeleteTagAct()),
        onDeleteTag: () =>
            dispatch(deleteTagAct())
    }
}

class TagConfigDelete extends Component {

    render() {
        const {
            isShowDeleteTag,
            isPendingDeleteTag,
            onCloseDeleteTag,
            onDeleteTag,
            deleteTagErrMsg,
            isDeleteTagFailed,
            deleteTagName
        } = this.props;

        return (
            <Modal size="md" show={isShowDeleteTag} onHide={onCloseDeleteTag}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Tag Section</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(isDeleteTagFailed)
                        ? (<Row>
                            <Col className="delete-tag-err-msg">
                                {deleteTagErrMsg}
                            </Col>
                        </Row>)
                        : (<Row>
                            <Col>
                                {`Are you sure to delete Tag<${deleteTagName}>?`}
                            </Col>
                        </Row>)
                    }
                    {
                        (isPendingDeleteTag)
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
                                    {(isDeleteTagFailed)
                                        ? null
                                        : (<Button
                                            className="mb-1 mx-1"
                                            name="delete" onClick={onDeleteTag}
                                            variant="danger" size="sm">
                                            Delete
                                        </Button>)
                                    }
                                    <Button
                                        className="mb-1 mx-1"
                                        name="cancel" onClick={onCloseDeleteTag}
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


export default connect(mapStateToProps, mapDispatchToProps)(TagConfigDelete)