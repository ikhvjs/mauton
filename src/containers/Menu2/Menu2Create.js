import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    closeMenu2CreateAct,
    onchangeCreateMenu2NameAct,
    onchangeCreateMenu2ParentMenuIDAct,
    onchangeCreateMenu2SeqAct,
    postMenu2Act,
    clearCreateMenu2Act
} from './Menu2CreateAction';
import { LoadingBar } from '../../components/LoadingBar/LoadingBar';
import { Form, Button, Row, Col, Modal } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        isShowCreateMenu2: state.menu2Rdc.isShowCreateMenu2,
        isCreateMenu2NameValid: state.menu2Rdc.isCreateMenu2NameValid,
        isCreateMenu2ParentMenuIDValid: state.menu2Rdc.isCreateMenu2ParentMenuIDValid,
        isCreateMenu2SeqValid: state.menu2Rdc.isCreateMenu2SeqValid,
        createMenu2Name: state.menu2Rdc.createMenu2Name,
        createMenu2ParentMenuID: state.menu2Rdc.createMenu2ParentMenuID,
        createMenu2Seq: state.menu2Rdc.createMenu2Seq,
        createMenu2NameErrMsg: state.menu2Rdc.createMenu2NameErrMsg,
        createMenu2ParentMenuIDErrMsg: state.menu2Rdc.createMenu2ParentMenuIDErrMsg,
        createMenu2SeqErrMsg: state.menu2Rdc.createMenu2SeqErrMsg,
        isPendingPostMenu2: state.menu2Rdc.isPendingPostMenu2,
        menu1: state.menu1Rdc.menu1
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseMenu2Create: () =>
            dispatch(closeMenu2CreateAct()),
        onChangeCreateMenu2Name: (event) =>
            dispatch(onchangeCreateMenu2NameAct(event)),
        onChangeCreateMenu2ParentMenuID: (event) =>
            dispatch(onchangeCreateMenu2ParentMenuIDAct(event)),
        onChangeCreateMenu2Seq: (event) =>
            dispatch(onchangeCreateMenu2SeqAct(event)),
        onCreateMenu2: () =>
            dispatch(postMenu2Act()),
        onClearCreateMenu2: () =>
            dispatch(clearCreateMenu2Act())
    }
}

class Menu2Create extends Component {

    render() {
        const {
            isShowCreateMenu2,
            onCloseMenu2Create,
            isCreateMenu2NameValid,
            isCreateMenu2ParentMenuIDValid,
            isCreateMenu2SeqValid,
            createMenu2Name,
            createMenu2ParentMenuID,
            createMenu2Seq,
            createMenu2NameErrMsg,
            createMenu2ParentMenuIDErrMsg,
            createMenu2SeqErrMsg,
            onChangeCreateMenu2Name,
            onChangeCreateMenu2ParentMenuID,
            onChangeCreateMenu2Seq,
            isPendingPostMenu2,
            onCreateMenu2,
            onClearCreateMenu2,
            menu1
        } = this.props;

        return (
            <Modal size="md" show={isShowCreateMenu2} onHide={onCloseMenu2Create}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Menu Section</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="formMenu2Name">
                            <Form.Label column sm={4}>
                                Menu Name
                                </Form.Label>
                            <Col sm={8}>
                                <Form.Control size="sm" name="menu2-name"
                                    isValid={isCreateMenu2NameValid}
                                    isInvalid={(isCreateMenu2NameValid === null) 
                                                ? null 
                                                : !isCreateMenu2NameValid}
                                    type="text" placeholder="Enter Menu Name"
                                    value={createMenu2Name}
                                    onChange={onChangeCreateMenu2Name} />
                                <Form.Control.Feedback type="invalid">
                                    {createMenu2NameErrMsg}
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
                                    isValid={isCreateMenu2ParentMenuIDValid}
                                    isInvalid={(isCreateMenu2ParentMenuIDValid === null) 
                                                ? null 
                                                : !isCreateMenu2ParentMenuIDValid}
                                    value={createMenu2ParentMenuID}
                                    onChange={onChangeCreateMenu2ParentMenuID}
                                >
                                    <option value="" disabled={true}>Select Parent Menu</option>
                                    {menu1.map((menu1)=>{
                                        return(<option key={menu1.menu_id} value={menu1.menu_id}>{menu1.menu_name}</option>)
                                    })}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {createMenu2ParentMenuIDErrMsg}
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
                                    isValid={isCreateMenu2SeqValid}
                                    isInvalid={(isCreateMenu2SeqValid === null) 
                                                ? null 
                                                : !isCreateMenu2SeqValid}
                                    type="text" placeholder="Enter seq"
                                    value={createMenu2Seq}
                                    onChange={onChangeCreateMenu2Seq} />
                                <Form.Control.Feedback type="invalid">
                                    {createMenu2SeqErrMsg}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    looks good
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        {
                            isPendingPostMenu2
                                ? (<LoadingBar />)
                                : (<Row className="d-flex justify-content-end">
                                    <Button
                                        className="mb-1 mx-1"
                                        name="create" onClick={onCreateMenu2}
                                        variant="primary" size="sm"
                                        disabled={!isCreateMenu2NameValid || !isCreateMenu2SeqValid}>
                                        Create
                                </Button>
                                    <Button
                                        className="mb-1 mx-1"
                                        name="clear-create" onClick={onClearCreateMenu2}
                                        variant="secondary" size="sm">
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


export default connect(mapStateToProps, mapDispatchToProps)(Menu2Create)