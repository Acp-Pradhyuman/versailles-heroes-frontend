import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../../store';
import { ModalType } from '../../../core';

export default function DepositModal() {
    const dispatch = useDispatch();
    const depositMohToken = useSelector((state) => state.ui.modal[ModalType.DepositModal] || false);
    const depositVrhToken = useSelector((state) => state.ui.modal[ModalType.DepositVrhModal] || false);

    const handleClose = () => {
        dispatch(closeModal(depositMohToken ? ModalType.DepositModal : ModalType.DepositVrhModal));
    }

    const handleDeposit = () => {
        dispatch(openModal(ModalType.DepositSuccessfulModal));
        handleClose();
    }
    return (
        <Modal
            show={depositMohToken || depositVrhToken}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            dialogClassName="modal-class modal-md modal-center"
        >
            <button type="button" onClick={handleClose} className="close modal-close-btn" data-dismiss="modal" aria-label="Close">x</button>
            <div className="modal-body">
                <div className="modal-inner-area">
                    <h4>Deposit</h4>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing</p>
                    <form className="deposit-form-wrap">
                        <div className="form-group mb-4">
                            <div className="deposit-form-box">
                                <span>{depositMohToken ? "MOH" : "VRH"}</span>
                            </div>
                            <input type="text" placeholder="Amount" />
                        </div>
                        <div className="form-group">
                            <div className="deposit-form-box">
                                <span>{depositMohToken ? "gMOH" : "gVRH"}</span>
                            </div>
                            <input type="text" placeholder="0" />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={handleDeposit} className="btn btn-primary w-100 mx-0" data-dismiss="modal" data-toggle="modal" data-target="#deposit-successful-modal">Deposit</button>
                </div>
            </div>
        </Modal>
    )
}