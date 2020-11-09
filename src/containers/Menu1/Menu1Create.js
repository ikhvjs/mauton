import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    closeMenu1CreateAct,
    onchangeCreateMenu1NameAct,
    onchangeCreateMenu1SeqAct,
    postMenu1Act,
    clearCreateMenu1Act
} from './Menu1CreateAction';

import { Form, Button, Row, Col, Modal,Spinner } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        isShowCreateMenu1: state.menu1Rdc.isShowCreateMenu1,
        isCreateMenu1NameValid: state.menu1Rdc.isCreateMenu1NameValid,
        isCreateMenu1SeqValid: state.menu1Rdc.isCreateMenu1SeqValid,
        createMenu1Name: state.menu1Rdc.createMenu1Name,
        createMenu1Seq: state.menu1Rdc.createMenu1Seq,
        createMenu1NameErrMsg: state.menu1Rdc.createMenu1NameErrMsg,
        createMenu1SeqErrMsg: state.menu1Rdc.createMenu1SeqErrMsg,
        isPendingPostMenu1: state.menu1Rdc.isPendingPostMenu1
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseMenu1Create: () =>
            dispatch(closeMenu1CreateAct()),
        onChangeCreateMenu1Name: (event)=>
            dispatch(onchangeCreateMenu1NameAct(event)),
        onChangeCreateMenu1Seq: (event)=>
            dispatch(onchangeCreateMenu1SeqAct(event)),
        onCreateMenu1: () =>
            dispatch(postMenu1Act()),
        onClearCreateMenu1: ()=>
			dispatch(clearCreateMenu1Act())
    }
}

class Menu1Create extends Component {

    render() {
        const {
            isShowCreateMenu1,
            onCloseMenu1Create,
            isCreateMenu1NameValid,
            isCreateMenu1SeqValid,
            createMenu1Name,
            createMenu1Seq,
            createMenu1NameErrMsg,
            createMenu1SeqErrMsg,
            onChangeCreateMenu1Name,
            onChangeCreateMenu1Seq,
            isPendingPostMenu1,
            onCreateMenu1,
            onClearCreateMenu1
        } = this.props;

        return (
            <Modal size="md" show={isShowCreateMenu1} onHide={onCloseMenu1Create}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Menu Section</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="formMenu1Name">
                            <Form.Label column sm={2}>
                                Menu Name
                                </Form.Label>
                            <Col sm={10}>
                                <Form.Control size="sm" name="menu1-name"
                                    isValid={isCreateMenu1NameValid}
                                    isInvalid={(isCreateMenu1NameValid === null) ? null : !isCreateMenu1NameValid}
                                    type="text" placeholder="Enter Menu1 Name"
                                    value={createMenu1Name}
                                    onChange={onChangeCreateMenu1Name} />
                                <Form.Control.Feedback type="invalid">
                                    {createMenu1NameErrMsg}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    looks good
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formMenu1Seq">
                            <Form.Label column sm={2}>
                                Seq
                                </Form.Label>
                            <Col sm={10}>
                                <Form.Control size="sm" name="seq"
                                    isValid={isCreateMenu1SeqValid}
                                    isInvalid={(isCreateMenu1SeqValid === null) ? null : !isCreateMenu1SeqValid}
                                    type="text" placeholder="Enter seq"
                                    value={createMenu1Seq}
                                    onChange={onChangeCreateMenu1Seq} />
                                <Form.Control.Feedback type="invalid">
                                    {createMenu1SeqErrMsg}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    looks good
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        {
                            isPendingPostMenu1
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
                                    name="create" onClick={onCreateMenu1}
                                    variant="primary" size="sm"
                                    disabled={!isCreateMenu1NameValid||!isCreateMenu1SeqValid}>
                                    Create
                                </Button>
                                <Button 
                                    className="mb-1 mx-1" 
                                    name="clear-create" onClick={onClearCreateMenu1}
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


export default connect(mapStateToProps, mapDispatchToProps)(Menu1Create)