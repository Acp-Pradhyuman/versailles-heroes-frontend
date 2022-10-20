import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store';
import { ModalType } from '../../../core';

export default function BoxTransferPending() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.modal[ModalType.BoxTransferPending] || false)

    const handleClose = () => {
        dispatch(closeModal(ModalType.BoxTransferPending));
    }
    return (
        <Modal
            show={isOpen}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <button type="button" onClick={handleClose} className="close modal-close-btn" data-dismiss="modal" aria-label="Close">x</button>
            <div className="modal-body">
                <div className="modal-inner-area">
                    <h4>Your Mystery Box Transfer is pending</h4>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam lorem ipsum dolemar nonumy eirmod tempor</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary w-100 mx-0">OK</button>
                </div>
            </div>
        </Modal>
    )
}