import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    closeUpdateMenu1Act,
    updateMenu1Act,
    onchangeUpdateMenu1NameAct,
    onchangeUpdateMenu1SeqAct
} from './Menu1UpdateAction';
import { LoadingBar } from '../../components/LoadingBar/LoadingBar';
import { Button, Row, Col, Modal, Form } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        isShowUpdateMenu1: state.menu1Rdc.isShowUpdateMenu1,
        isPendingUpdateMenu1: state.menu1Rdc.isPendingUpdateMenu1,
        isUpdateMenu1NameValid: state.menu1Rdc.isUpdateMenu1NameValid,
        isUpdateMenu1SeqValid: state.menu1Rdc.isUpdateMenu1SeqValid,
        updateMenu1Name: state.menu1Rdc.updateMenu1Name,
        updateMenu1NameErrMsg: state.menu1Rdc.updateMenu1NameErrMsg,
        updateMenu1Seq: state.menu1Rdc.updateMenu1Seq,
        updateMenu1SeqErrMsg: state.menu1Rdc.updateMenu1SeqErrMsg
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseUpdateMenu1: () =>
            dispatch(closeUpdateMenu1Act()),
        onUpdateMenu1: () =>
            dispatch(updateMenu1Act()),
        onChangeUpdateMenu1Name: (event) =>
            dispatch(onchangeUpdateMenu1NameAct(event)),
        onChangeUpdateMenu1Seq: (event) =>
            dispatch(onchangeUpdateMenu1SeqAct(event)),
    }
}

class Menu1Update extends Component {

    render() {
        const {
            isShowUpdateMenu1,
            onCloseUpdateMenu1,
            isPendingUpdateMenu1,
            isUpdateMenu1NameValid,
            isUpdateMenu1SeqValid,
            updateMenu1Name,
            onChangeUpdateMenu1Name,
            updateMenu1NameErrMsg,
            updateMenu1Seq,
            onChangeUpdateMenu1Seq,
            updateMenu1SeqErrMsg,
            onUpdateMenu1
        } = this.props;

        return (
            <Modal size="md" show={isShowUpdateMenu1} onHide={onCloseUpdateMenu1}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Menu1 Section</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="formMenu1Name">
                            <Form.Label column sm={2}>
                                Menu1 Name
                                </Form.Label>
                            <Col sm={10}>
                                <Form.Control size="sm" name="menu1-name"
                                    isValid={isUpdateMenu1NameValid}
                                    isInvalid={(isUpdateMenu1NameValid === null) ? null : !isUpdateMenu1NameValid}
                                    type="text" placeholder="Enter Menu Name"
                                    value={updateMenu1Name}
                                    onChange={onChangeUpdateMenu1Name} />
                                <Form.Control.Feedback type="invalid">
                                    {updateMenu1NameErrMsg}
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
                                    isValid={isUpdateMenu1SeqValid}
                                    isInvalid={(isUpdateMenu1SeqValid === null) ? null : !isUpdateMenu1SeqValid}
                                    type="text" placeholder="Enter seq"
                                    value={updateMenu1Seq}
                                    onChange={onChangeUpdateMenu1Seq} />
                                <Form.Control.Feedback type="invalid">
                                    {updateMenu1SeqErrMsg}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    looks good
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        {
                            isPendingUpdateMenu1
                                ? (<LoadingBar />)
                                : (<Row className="d-flex justify-content-end">
                                    <Button
                                        className="mb-1 mx-1"
                                        name="create" onClick={onUpdateMenu1}
                                        variant="primary" size="sm"
                                        disabled={!isUpdateMenu1NameValid || !isUpdateMenu1SeqValid}>
                                        Update
                                </Button>
                                    <Button
                                        className="mb-1 mx-1"
                                        name="clear-create" onClick={onCloseUpdateMenu1}
                                        variant="secondary" size="sm">
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


export default connect(mapStateToProps, mapDispatchToProps)(Menu1Update)