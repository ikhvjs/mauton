import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    closeCategoryCreateAct,
    onchangeCreateCategoryNameAct,
    onchangeCreateCategoryDescAct,
    onchangeCreateCategorySeqAct,
    postCategoryAct,
    clearCreateCategoryAct
} from './CategoryConfigCreateAction';

import { Form, Button, Row, Col, Modal,Spinner } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        isShowCreateCategory: state.categoryRdc.isShowCreateCategory,
        isCreateCategoryNameValid: state.categoryRdc.isCreateCategoryNameValid,
        isCreateCategoryDescValid: state.categoryRdc.isCreateCategoryDescValid,
        isCreateCategorySeqValid: state.categoryRdc.isCreateCategorySeqValid,
        createCategoryName: state.categoryRdc.createCategoryName,
        createCategoryDesc: state.categoryRdc.createCategoryDesc,
        createCategorySeq: state.categoryRdc.createCategorySeq,
        createCategoryNameErrMsg: state.categoryRdc.createCategoryNameErrMsg,
        createCategoryDescErrMsg: state.categoryRdc.createCategoryDescErrMsg,
        createCategorySeqErrMsg: state.categoryRdc.createCategorySeqErrMsg,
        isPendingPostCategory: state.categoryRdc.isPendingPostCategory
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseCategoryCreate: () =>
            dispatch(closeCategoryCreateAct()),
        onChangeCreateCategoryName: (event)=>
            dispatch(onchangeCreateCategoryNameAct(event)),
        onChangeCreateCategoryDesc: (event)=>
            dispatch(onchangeCreateCategoryDescAct(event)),
        onChangeCreateCategorySeq: (event)=>
            dispatch(onchangeCreateCategorySeqAct(event)),
        onCreateCategory: () =>
            dispatch(postCategoryAct()),
        onClearCreateCategory: ()=>
			dispatch(clearCreateCategoryAct())
    }
}

class CategoryConfigCreate extends Component {

    render() {
        const {
            isShowCreateCategory,
            onCloseCategoryCreate,
            isCreateCategoryNameValid,
            isCreateCategoryDescValid,
            isCreateCategorySeqValid,
            createCategoryName,
            createCategoryDesc,
            createCategorySeq,
            createCategoryNameErrMsg,
            createCategoryDescErrMsg,
            createCategorySeqErrMsg,
            onChangeCreateCategoryName,
            onChangeCreateCategoryDesc,
            onChangeCreateCategorySeq,
            isPendingPostCategory,
            onCreateCategory,
            onClearCreateCategory
        } = this.props;

        return (
            <Modal size="md" show={isShowCreateCategory} onHide={onCloseCategoryCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Category Section</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="formCategoryName">
                            <Form.Label column sm={2}>
                                Category Name
                                </Form.Label>
                            <Col sm={10}>
                                <Form.Control size="sm" name="category-name"
                                    isValid={isCreateCategoryNameValid}
                                    isInvalid={(isCreateCategoryNameValid === null) ? null : !isCreateCategoryNameValid}
                                    type="text" placeholder="Enter Category Name (Max. length: 20)"
                                    value={createCategoryName}
                                    onChange={onChangeCreateCategoryName} />
                                <Form.Control.Feedback type="invalid">
                                    {createCategoryNameErrMsg}
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
                                    isValid={isCreateCategoryDescValid}
                                    isInvalid={(isCreateCategoryDescValid === null) ? null : !isCreateCategoryDescValid}
                                    type="text" placeholder="Enter Category Desc (Max. length: 20)"
                                    value={createCategoryDesc}
                                    onChange={onChangeCreateCategoryDesc} />
                                <Form.Control.Feedback type="invalid">
                                    {createCategoryDescErrMsg}
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
                                    isValid={isCreateCategorySeqValid}
                                    isInvalid={(isCreateCategorySeqValid === null) ? null : !isCreateCategorySeqValid}
                                    type="text" placeholder="Enter seq"
                                    value={createCategorySeq}
                                    onChange={onChangeCreateCategorySeq} />
                                <Form.Control.Feedback type="invalid">
                                    {createCategorySeqErrMsg}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    looks good
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        {
                            isPendingPostCategory
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
                                    name="create" onClick={onCreateCategory}
                                    variant="primary" size="sm"
                                    disabled={!isCreateCategoryNameValid||!isCreateCategorySeqValid}>
                                    Create
                                </Button>
                                <Button 
                                    className="mb-1 mx-1" 
                                    name="clear-create" onClick={onClearCreateCategory}
                                    variant="secondary"  size="sm">
                                        Clear
                                </Button>
                            </Row>)
                        }
                        
                    </Form>
                </Modal.Body>
            </Modal>
        )


    }

}


export default connect(mapStateToProps, mapDispatchToProps)(CategoryConfigCreate)