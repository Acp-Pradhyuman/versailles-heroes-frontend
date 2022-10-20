import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store';
import { ModalType } from '../../../core';

export default function BoxTransferPending({handleClosePending,modalPendingIsOpen}) {
    

    
    return (
        <Modal
            show={modalPendingIsOpen}
            onHide={handleClosePending}
            backdrop="static"
            keyboard={false}
        >
            <button type="button" onClick={handleClosePending} className="close modal-close-btn" data-dismiss="modal" aria-label="Close">x</button>
            <div className="modal-body">
                <div className="modal-inner-area">
                    <h4>Your Mystery Box Transfer is pending</h4>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam lorem ipsum dolemar nonumy eirmod tempor</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary w-100 mx-0" onClick={handleClosePending}>OK</button>
                </div>
            </div>
        </Modal>
    )
}