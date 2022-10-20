import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../../store';
import { ModalType } from '../../../core';

export default function UpgardePromptModal() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.modal[ModalType.UpgardePromptModal] || false);

    const handleClose = () => {
        dispatch(closeModal(ModalType.UpgardePromptModal));
    }

    const handleContinue = () => {
        dispatch(openModal(ModalType.CheckoutUpgradeModal));
        handleClose();
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
                    <h4>Upgrade Prompt</h4>
                    <p>ERC721 contract records NFT data Upgrade triggers data changes</p>
                    <ol>
                        <li>1. Level increase</li>
                        <li>2. Increased the number of battles Data Change Triggered by Degree Upgrade (H-SS) change level</li>
                    </ol>
                    <p>Each upgrade will get a 100% boost to the battlefield.</p>
                    <p>Battle times before the upgrade: 0/200 After the upgrade ️: 0/400 Upgrade again: 0/600</p>
                </div>
                <div className="modal-footer mt-4">
                    <button type="button" onClick={handleContinue} className="btn btn-primary w-100 mx-0" data-dismiss="modal" data-toggle="modal" data-target="#checkout-modal2">Continue</button>
                </div>
            </div>
        </Modal>
    );
}