import React, { Component } from 'react';
import { connect } from 'react-redux';
import {    closeUpdateCategoryAct,
            updateCategoryAct,
            onchangeUpdateCategoryNameAct,
            onchangeUpdateCategoryDescAct,
            onchangeUpdateCategorySeqAct
} from './CategoryConfigUpdateAction';

import { Button, Row, Col, Modal, Spinner, Form } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        isShowUpdateCategory: state.categoryRdc.isShowUpdateCategory,
        isPendingUpdateCategory: state.categoryRdc.isPendingUpdateCategory,
        isUpdateCategoryNameValid: state.categoryRdc.isUpdateCategoryNameValid,
        isUpdateCategoryDescValid: state.categoryRdc.isUpdateCategoryDescValid,
        isUpdateCategorySeqValid: state.categoryRdc.isUpdateCategorySeqValid,
        updateCategoryName: state.categoryRdc.updateCategoryName,
        updateCategoryDesc: state.categoryRdc.updateCategoryDesc,
        updateCategorySeq: state.categoryRdc.updateCategorySeq,
        updateCategoryNameErrMsg: state.categoryRdc.updateCategoryNameErrMsg,
        updateCategoryDescErrMsg: state.categoryRdc.updateCategoryDescErrMsg,
        updateCategorySeqErrMsg: state.categoryRdc.updateCategorySeqErrMsg
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseUpdateCategory: () =>
            dispatch(closeUpdateCategoryAct()),
        onUpdateCategory: () =>
            dispatch(updateCategoryAct()),
        onChangeUpdateCategoryName: (event)=>
            dispatch(onchangeUpdateCategoryNameAct(event)),
        onChangeUpdateCategoryDesc: (event)=>
            dispatch(onchangeUpdateCategoryDescAct(event)),
        onChangeUpdateCategorySeq: (event)=>
            dispatch(onchangeUpdateCategorySeqAct(event)),
    }
}

class CategoryConfigUpdate extends Component {

    render() {
        const {
            isShowUpdateCategory,
            onCloseUpdateCategory,
            isPendingUpdateCategory,
            isUpdateCategoryNameValid,
            isUpdateCategoryDescValid,
            isUpdateCategorySeqValid,
            updateCategoryName,
            updateCategoryDesc,
            updateCategorySeq,
            onChangeUpdateCategoryName,
            onChangeUpdateCategoryDesc,
            onChangeUpdateCategorySeq,
            updateCategoryNameErrMsg,
            updateCategoryDescErrMsg,
            updateCategorySeqErrMsg,
            onUpdateCategory
        } = this.props;

        return (
            <Modal size="md" show={isShowUpdateCategory} onHide={onCloseUpdateCategory}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Category Section</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="formCategoryName">
                            <Form.Label column sm={2}>
                                Category Name
                                </Form.Label>
                            <Col sm={10}>
                                <Form.Control size="sm" name="category-name"
                                    isValid={isUpdateCategoryNameValid}
                                    isInvalid={(isUpdateCategoryNameValid === null) ? null : !isUpdateCategoryNameValid}
                                    type="text" placeholder="Enter Category Name"
                                    value={updateCategoryName}
                                    onChange={onChangeUpdateCategoryName} />
                                <Form.Control.Feedback type="invalid">
                                    {updateCategoryNameErrMsg}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    looks good
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formCategoryDesc">
                            <Form.Label column sm={2}>
                                Category Desc
                                </Form.Label>
                            <Col sm={10}>
                                <Form.Control size="sm" name="category-desc"
                                    isValid={isUpdateCategoryDescValid}
                                    isInvalid={(isUpdateCategoryDescValid === null) ? null : !isUpdateCategoryDescValid}
                                    type="text" placeholder="Enter Category Desc"
                                    value={updateCategoryDesc}
                                    onChange={onChangeUpdateCategoryDesc} />
                                <Form.Control.Feedback type="invalid">
                                    {updateCategoryDescErrMsg}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    looks good
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formCategorySeq">
                            <Form.Label column sm={2}>
                                Seq
                                </Form.Label>
                            <Col sm={10}>
                                <Form.Control size="sm" name="seq"
                                    isValid={isUpdateCategorySeqValid}
                                    isInvalid={(isUpdateCategorySeqValid === null) ? null : !isUpdateCategorySeqValid}
                                    type="text" placeholder="Enter seq"
                                    value={updateCategorySeq}
                                    onChange={onChangeUpdateCategorySeq} />
                                <Form.Control.Feedback type="invalid">
                                    {updateCategorySeqErrMsg}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    looks good
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        {
                            isPendingUpdateCategory
                            ?(<div className="row d-flex align-items-center justify-content-end">
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Loading...
                            </div>)
                            :(<Row className="d-flex justify-content-end">
                                <Button 
                                    className="mb-1 mx-1" 
                                    name="create" onClick={onUpdateCategory}
                                    variant="primary" size="sm"
                                    disabled={!isUpdateCategoryNameValid||!isUpdateCategorySeqValid}>
                                    Update
                                </Button>
                                <Button 
                                    className="mb-1 mx-1" 
                                    name="clear-create" onClick={onCloseUpdateCategory}
                                    variant="secondary"  size="sm">
                                        Cancel
                                </Button>
                            </Row>)
                        }
                        
                    </Form>
                </Modal.Body>
            </Modal>
        )


    }

}


export default connect(mapStateToProps, mapDispatchToProps)(CategoryConfigUpdate)