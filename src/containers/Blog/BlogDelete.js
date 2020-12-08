import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeDeleteBlogAct, deleteBlogAct } from './BlogDeleteAction';
import { LoadingBar } from '../../components/LoadingBar/LoadingBar';
import { Button, Row, Col, Modal } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        isShowDeleteBlog: state.blogRdc.isShowDeleteBlog,
        isPendingDeleteBlog: state.blogRdc.isPendingDeleteBlog,
        isDeleteBlogFailed: state.blogRdc.isDeleteBlogFailed,
        deleteBlogErrMsg: state.blogRdc.deleteBlogErrMsg,
        blogTitle: state.blogRdc.blog.blog_title,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseDeleteBlog: () =>
            dispatch(closeDeleteBlogAct()),
        onDeleteBlog: () =>
            dispatch(deleteBlogAct())
    }
}

class BlogDelete extends Component {

    render() {
        const {
            isShowDeleteBlog,
            isPendingDeleteBlog,
            onCloseDeleteBlog,
            onDeleteBlog,
            deleteBlogErrMsg,
            isDeleteBlogFailed,
            blogTitle
        } = this.props;

        return (
            <Modal size="md" show={isShowDeleteBlog} onHide={onCloseDeleteBlog}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Blog Section</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(isDeleteBlogFailed)
                        ? (<Row>
                            <Col className="delete-blog-err-msg">
                                {deleteBlogErrMsg}
                            </Col>
                        </Row>)
                        : (<Row>
                            <Col>
                                {`Are you sure to delete Blog<${blogTitle}>?`}
                            </Col>
                        </Row>)
                    }
                    {
                        (isPendingDeleteBlog)
                            ? (<LoadingBar />)
                            : (
                                <Row className="d-flex justify-content-end">
                                    {(isDeleteBlogFailed)
                                        ? null
                                        : (<Button
                                            className="mb-1 mx-1"
                                            name="delete" onClick={onDeleteBlog}
                                            variant="danger" size="sm">
                                            Delete
                                        </Button>)
                                    }
                                    <Button
                                        className="mb-1 mx-1"
                                        name="cancel" onClick={onCloseDeleteBlog}
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


export default connect(mapStateToProps, mapDispatchToProps)(BlogDelete)