import React from 'react';
import { ModalType } from '../../../core';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store';
import { Modal } from 'react-bootstrap';

export default function CoinClaimedModal() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.modal[ModalType.CoinClaimedModal] || false)

    const handleClose = () => {
        dispatch(closeModal(ModalType.CoinClaimedModal));
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
                    <img src={require("../../../assets/images/icon/check-icon.png")} className="checkIcon" alt="check icon" />
                    <h4>Coin Claimed Successfully!</h4>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam lorem ipsum dolemar nonumy eirmod tempor</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary w-100 mx-0">OK</button>
                </div>
            </div>
        </Modal>
    )
}