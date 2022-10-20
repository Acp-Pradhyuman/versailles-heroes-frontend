import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ModalType } from '../../../core';
import { closeModal } from '../../../store';
import { Modal } from 'react-bootstrap';


export default function SellRequestCompleted() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.modal[ModalType.SellRequestCompleted] || false)

    const handleClose = () => {
        dispatch(closeModal(ModalType.SellRequestCompleted));
    }
    return (
        <Modal
            show={isOpen}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            dialogClassName="modal-class modal-md modal-center"
        >
            <button type="button" onClick={handleClose} className="close modal-close-btn" data-dismiss="modal" aria-label="Close">x</button>
            <div className="modal-body">
                <div className="modal-inner-area">
                    <img src={require("../../../assets/images/icon/check-icon.png")} alt="check icon" className="mb-4" />
                    <h4>Your request will be handled soon</h4>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
                </div>
                <div className="modal-footer modal-footer1">
                    <button type="button" onClick={handleClose} className="btn btn-primary">I Understand</button>
                </div>
            </div>
        </Modal>
    );
}