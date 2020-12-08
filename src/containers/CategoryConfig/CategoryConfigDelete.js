import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeDeleteCategoryAct, deleteCategoryAct } from './CategoryConfigDeleteAction';
import { LoadingBar } from '../../components/LoadingBar/LoadingBar';
import { Button, Row, Col, Modal } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        isShowDeleteCategory: state.categoryRdc.isShowDeleteCategory,
        isPendingDeleteCategory: state.categoryRdc.isPendingDeleteCategory,
        isDeleteCategoryFailed: state.categoryRdc.isDeleteCategoryFailed,
        deleteCategoryErrMsg: state.categoryRdc.deleteCategoryErrMsg,
        deleteCategoryName: state.categoryRdc.deleteCategoryName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseDeleteCategory: () =>
            dispatch(closeDeleteCategoryAct()),
        onDeleteCategory: () =>
            dispatch(deleteCategoryAct())
    }
}

class CategoryConfigDelete extends Component {

    render() {
        const {
            isShowDeleteCategory,
            isPendingDeleteCategory,
            onCloseDeleteCategory,
            onDeleteCategory,
            deleteCategoryErrMsg,
            isDeleteCategoryFailed,
            deleteCategoryName
        } = this.props;

        return (
            <Modal size="md" show={isShowDeleteCategory} onHide={onCloseDeleteCategory}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Category Section</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(isDeleteCategoryFailed)
                        ? (<Row>
                            <Col className="delete-category-err-msg">
                                {deleteCategoryErrMsg}
                            </Col>
                        </Row>)
                        : (<Row>
                            <Col>
                                {`Are you sure to delete Category<${deleteCategoryName}>?`}
                            </Col>
                        </Row>)
                    }
                    {
                        (isPendingDeleteCategory)
                            ? (<LoadingBar />)
                            : (
                                <Row className="d-flex justify-content-end">
                                    {(isDeleteCategoryFailed)
                                        ? null
                                        : (<Button
                                            className="mb-1 mx-1"
                                            name="delete" onClick={onDeleteCategory}
                                            variant="danger" size="sm">
                                            Delete
                                        </Button>)
                                    }
                                    <Button
                                        className="mb-1 mx-1"
                                        name="cancel" onClick={onCloseDeleteCategory}
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


export default connect(mapStateToProps, mapDispatchToProps)(CategoryConfigDelete)