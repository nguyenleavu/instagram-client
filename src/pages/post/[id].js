import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const PostDetail = ({ open, onCloseModal }) => {
    return (
        <Modal open={open} onClose={onCloseModal} center>
            <h2>Simple centered modal</h2>
        </Modal>
    );
};

export default PostDetail;
