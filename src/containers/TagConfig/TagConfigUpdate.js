import React, { Component } from 'react';
import { connect } from 'react-redux';
import {    closeUpdateTagAct,
            updateTagAct,
            onchangeUpdateTagNameAct,
            onchangeUpdateTagSeqAct
} from './TagConfigUpdateAction';

import { Button, Row, Col, Modal, Spinner, Form } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        isShowUpdateTag: state.tagRdc.isShowUpdateTag,
        isPendingUpdateTag: state.tagRdc.isPendingUpdateTag,
        isUpdateTagNameValid: state.tagRdc.isUpdateTagNameValid,
        isUpdateTagSeqValid: state.tagRdc.isUpdateTagSeqValid,
        updateTagName: state.tagRdc.updateTagName,
        updateTagNameErrMsg: state.tagRdc.updateTagNameErrMsg,
        updateTagSeq: state.tagRdc.updateTagSeq,
        updateTagSeqErrMsg: state.tagRdc.updateTagSeqErrMsg
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseUpdateTag: () =>
            dispatch(closeUpdateTagAct()),
        onUpdateTag: () =>
            dispatch(updateTagAct()),
        onChangeUpdateTagName: (event)=>
            dispatch(onchangeUpdateTagNameAct(event)),
        onChangeUpdateTagSeq: (event)=>
            dispatch(onchangeUpdateTagSeqAct(event)),
    }
}

class TagConfigUpdate extends Component {

    render() {
        const {
            isShowUpdateTag,
            onCloseUpdateTag,
            isPendingUpdateTag,
            isUpdateTagNameValid,
            isUpdateTagSeqValid,
            updateTagName,
            onChangeUpdateTagName,
            updateTagNameErrMsg,
            updateTagSeq,
            onChangeUpdateTagSeq,
            updateTagSeqErrMsg,
            onUpdateTag
        } = this.props;

        return (
            <Modal size="md" show={isShowUpdateTag} onHide={onCloseUpdateTag}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Tag Section</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="formTagName">
                            <Form.Label column sm={2}>
                                Tag Name
                                </Form.Label>
                            <Col sm={10}>
                                <Form.Control size="sm" name="tag_name"
                                    isValid={isUpdateTagNameValid}
                                    isInvalid={(isUpdateTagNameValid === null) ? null : !isUpdateTagNameValid}
                                    type="text" placeholder="Enter Tag Name (Max. length: 20)"
                                    value={updateTagName}
                                    onChange={onChangeUpdateTagName} />
                                <Form.Control.Feedback type="invalid">
                                    {updateTagNameErrMsg}
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
                                    isValid={isUpdateTagSeqValid}
                                    isInvalid={(isUpdateTagSeqValid === null) ? null : !isUpdateTagSeqValid}
                                    type="text" placeholder="Enter seq"
                                    value={updateTagSeq}
                                    onChange={onChangeUpdateTagSeq} />
                                <Form.Control.Feedback type="invalid">
                                    {updateTagSeqErrMsg}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    looks good
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        {
                            isPendingUpdateTag
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
                                    name="create" onClick={onUpdateTag}
                                    variant="primary" size="sm"
                                    disabled={!isUpdateTagNameValid||!isUpdateTagSeqValid}>
                                    Update
                                </Button>
                                <Button 
                                    className="mb-1 mx-1" 
                                    name="clear-create" onClick={onCloseUpdateTag}
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


export default connect(mapStateToProps, mapDispatchToProps)(TagConfigUpdate)