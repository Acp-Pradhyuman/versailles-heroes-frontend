import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../../store';
import { ModalType } from '../../../core';

export default function SetPriceModal() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.modal[ModalType.SetPriceModal] || false);

    const handleClose = () => {
        dispatch(closeModal(ModalType.SetPriceModal));
    }

    const handleTransfer = () => {
        dispatch(openModal(ModalType.BoxTransferPending));
        handleClose();
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
                    <h4>Set Price for Mystry Box</h4>
                    <form>
                        <div className="form-group over-label lg">
                            <input type="email" className="form-control font-16" id="email" placeholder="6.568" />
                            <label className="label" for="email">Amount</label>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={handleTransfer} data-dismiss="modal" data-toggle="modal" data-target="#transfer-pending-modal" className="btn btn-primary">Transfer</button>
                </div>
            </div>
        </Modal>
    )
}