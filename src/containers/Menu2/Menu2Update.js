import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    closeUpdateMenu2Act,
    updateMenu2Act,
    onchangeUpdateMenu2NameAct,
    onchangeUpdateMenu2ParentMenuIDAct,
    onchangeUpdateMenu2SeqAct
} from './Menu2UpdateAction';

import { Button, Row, Col, Modal, Spinner, Form } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        isShowUpdateMenu2: state.menu2Rdc.isShowUpdateMenu2,
        isPendingUpdateMenu2: state.menu2Rdc.isPendingUpdateMenu2,
        isUpdateMenu2NameValid: state.menu2Rdc.isUpdateMenu2NameValid,
        isUpdateMenu2ParentMenuIDValid: state.menu2Rdc.isUpdateMenu2ParentMenuIDValid,
        isUpdateMenu2SeqValid: state.menu2Rdc.isUpdateMenu2SeqValid,
        updateMenu2Name: state.menu2Rdc.updateMenu2Name,
        updateMenu2ParentMenuID: state.menu2Rdc.updateMenu2ParentMenuID,
        updateMenu2ParentName: state.menu2Rdc.updateMenu2ParentName,
        updateMenu2Seq: state.menu2Rdc.updateMenu2Seq,
        updateMenu2NameErrMsg: state.menu2Rdc.updateMenu2NameErrMsg,
        updateMenu2ParentMenuIDErrMsg: state.menu2Rdc.updateMenu2ParentMenuIDErrMsg,
        updateMenu2SeqErrMsg: state.menu2Rdc.updateMenu2SeqErrMsg,
        menu1: state.menu1Rdc.menu1,
        isPendingRequestMenu1: state.menu1Rdc.isPendingRequestMenu1
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseUpdateMenu2: () =>
            dispatch(closeUpdateMenu2Act()),
        onUpdateMenu2: () =>
            dispatch(updateMenu2Act()),
        onChangeUpdateMenu2Name: (event) =>
            dispatch(onchangeUpdateMenu2NameAct(event)),
        onChangeUpdateMenu2ParentMenuID: (event) =>
            dispatch(onchangeUpdateMenu2ParentMenuIDAct(event)),
        onChangeUpdateMenu2Seq: (event) =>
            dispatch(onchangeUpdateMenu2SeqAct(event)),
    }
}

class Menu2Update extends Component {

    render() {
        const {
            isShowUpdateMenu2,
            onCloseUpdateMenu2,
            isPendingUpdateMenu2,
            isUpdateMenu2NameValid,
            isUpdateMenu2ParentMenuIDValid,
            isUpdateMenu2SeqValid,
            updateMenu2Name,
            updateMenu2ParentMenuID,
            updateMenu2ParentName,
            updateMenu2Seq,
            onChangeUpdateMenu2Name,
            onChangeUpdateMenu2ParentMenuID,
            onChangeUpdateMenu2Seq,
            updateMenu2NameErrMsg,
            updateMenu2ParentMenuIDErrMsg,
            updateMenu2SeqErrMsg,
            onUpdateMenu2,
            menu1,
            isPendingRequestMenu1
        } = this.props;

        return (
            <Modal size="md" show={isShowUpdateMenu2} onHide={onCloseUpdateMenu2}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Menu2 Section</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="formMenu2Name">
                            <Form.Label column sm={4}>
                                Menu2 Name
                                </Form.Label>
                            <Col sm={8}>
                                <Form.Control size="sm" name="menu2-name"
                                    isValid={isUpdateMenu2NameValid}
                                    isInvalid={(isUpdateMenu2NameValid === null) ? null : !isUpdateMenu2NameValid}
                                    type="text" placeholder="Enter Menu Name"
                                    value={updateMenu2Name}
                                    onChange={onChangeUpdateMenu2Name} />
                                <Form.Control.Feedback type="invalid">
                                    {updateMenu2NameErrMsg}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    looks good
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formMenu2ParentName">
                            <Form.Label column sm={4}>
                                Parent Menu Name
                                </Form.Label>
                            <Col sm={8}>
                                <Form.Control as="select"
                                    size="sm" name="parent-menu-name"
                                    isValid={isUpdateMenu2ParentMenuIDValid}
                                    isInvalid={(isUpdateMenu2ParentMenuIDValid === null)
                                        ? null
                                        : !isUpdateMenu2ParentMenuIDValid}
                                    value={updateMenu2ParentMenuID}
                                    onChange={onChangeUpdateMenu2ParentMenuID}
                                >
                                    {(isPendingRequestMenu1)
                                        ? (<option value={updateMenu2ParentMenuID}>{updateMenu2ParentName}</option>)
                                        : (menu1.map((menu1) => {
                                            return (<option key={menu1.menu_id} value={menu1.menu_id}>{menu1.menu_name}</option>)
                                        }))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {updateMenu2ParentMenuIDErrMsg}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    looks good
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formMenu2Seq">
                            <Form.Label column sm={4}>
                                Seq
                                </Form.Label>
                            <Col sm={8}>
                                <Form.Control size="sm" name="seq"
                                    isValid={isUpdateMenu2SeqValid}
                                    isInvalid={(isUpdateMenu2SeqValid === null) ? null : !isUpdateMenu2SeqValid}
                                    type="text" placeholder="Enter seq"
                                    value={updateMenu2Seq}
                                    onChange={onChangeUpdateMenu2Seq} />
                                <Form.Control.Feedback type="invalid">
                                    {updateMenu2SeqErrMsg}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    looks good
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        {
                            isPendingUpdateMenu2
                                ? (<div className="row d-flex align-items-center justify-content-end">
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                            Loading...
                                </div>)
                                : (<Row className="d-flex justify-content-end">
                                    <Button
                                        className="mb-1 mx-1"
                                        name="create" onClick={onUpdateMenu2}
                                        variant="primary" size="sm"
                                        disabled={!isUpdateMenu2NameValid || !isUpdateMenu2SeqValid}>
                                        Update
                                </Button>
                                    <Button
                                        className="mb-1 mx-1"
                                        name="clear-create" onClick={onCloseUpdateMenu2}
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


export default connect(mapStateToProps, mapDispatchToProps)(Menu2Update)