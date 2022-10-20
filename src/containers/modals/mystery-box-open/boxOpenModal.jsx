import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store';
import { ModalType } from '../../../core';

export default function BoxOpenModal() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.modal[ModalType.BoxOpenModal] || false);

    const handleClose = () => {
        dispatch(closeModal(ModalType.BoxOpenModal));
    }
    return (
        <Modal
            show={isOpen}
            onHide={handleClose}
            keyboard={false}
            backdrop = "static"
            className="congratModal"
        >

            <div className="modal-body">
                <div className="modal-inner-area">
                    <h4>Congratulation! You opened a box.</h4>
                    <div className='congratModal-img'>
                        <img src={require("../../../assets/images/gift-box.png")} alt="gift box" />
                    </div>
                </div>
            </div>
        </Modal>
    )
}