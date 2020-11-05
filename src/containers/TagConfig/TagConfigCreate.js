import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    closeTagCreateAct,
    onchangeCreateTagNameAct,
    onchangeCreateTagSeqAct,
    postTagAct,
    clearCreateTagAct
} from './TagConfigCreateAction';

import { Form, Button, Row, Col, Modal,Spinner } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        isShowCreateTag: state.tagRdc.isShowCreateTag,
        isCreateTagNameValid: state.tagRdc.isCreateTagNameValid,
        isCreateTagSeqValid: state.tagRdc.isCreateTagSeqValid,
        createTagName: state.tagRdc.createTagName,
        createTagSeq: state.tagRdc.createTagSeq,
        createTagNameErrMsg: state.tagRdc.createTagNameErrMsg,
        createTagSeqErrMsg: state.tagRdc.createTagSeqErrMsg,
        isPendingPostTag: state.tagRdc.isPendingPostTag
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseTagCreate: () =>
            dispatch(closeTagCreateAct()),
        onChangeCreateTagName: (event)=>
            dispatch(onchangeCreateTagNameAct(event)),
        onChangeCreateTagSeq: (event)=>
            dispatch(onchangeCreateTagSeqAct(event)),
        onCreateTag: () =>
            dispatch(postTagAct()),
        onClearCreateTag: ()=>
			dispatch(clearCreateTagAct())
    }
}

class TagConfigCreate extends Component {

    render() {
        const {
            isShowCreateTag,
            onCloseTagCreate,
            isCreateTagNameValid,
            isCreateTagSeqValid,
            createTagName,
            createTagSeq,
            createTagNameErrMsg,
            createTagSeqErrMsg,
            onChangeCreateTagName,
            onChangeCreateTagSeq,
            isPendingPostTag,
            onCreateTag,
            onClearCreateTag
        } = this.props;

        return (
            <Modal size="md" show={isShowCreateTag} onHide={onCloseTagCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Tag Section</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="formTagName">
                            <Form.Label column sm={2}>
                                Tag Name
                                </Form.Label>
                            <Col sm={10}>
                                <Form.Control size="sm" name="tag-name"
                                    isValid={isCreateTagNameValid}
                                    isInvalid={(isCreateTagNameValid === null) ? null : !isCreateTagNameValid}
                                    type="text" placeholder="Enter Tag Name (Max. length: 20)"
                                    value={createTagName}
                                    onChange={onChangeCreateTagName} />
                                <Form.Control.Feedback type="invalid">
                                    {createTagNameErrMsg}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    looks good
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formTagSeq">
                            <Form.Label column sm={2}>
                                Seq
                                </Form.Label>
                            <Col sm={10}>
                                <Form.Control size="sm" name="seq"
                                    isValid={isCreateTagSeqValid}
                                    isInvalid={(isCreateTagSeqValid === null) ? null : !isCreateTagSeqValid}
                                    type="text" placeholder="Enter seq"
                                    value={createTagSeq}
                                    onChange={onChangeCreateTagSeq} />
                                <Form.Control.Feedback type="invalid">
                                    {createTagSeqErrMsg}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    looks good
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        {
                            isPendingPostTag
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
                                    name="create" onClick={onCreateTag}
                                    variant="primary" size="sm"
                                    disabled={!isCreateTagNameValid||!isCreateTagSeqValid}>
                                    Create
                                </Button>
                                <Button 
                                    className="mb-1 mx-1" 
                                    name="clear-create" onClick={onClearCreateTag}
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


export default connect(mapStateToProps, mapDispatchToProps)(TagConfigCreate)