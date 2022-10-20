import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalType } from "../../../core";
import { closeModal } from "../../../store";

export default function DownloadMetaMask() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.modal[ModalType.DownloadMetaMask] || false)
    const handleClose = () => {
        dispatch(closeModal(ModalType.DownloadMetaMask));
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
                    <i className="fas fa-globe"></i>
                    <h4>METMASK NOT FOUND</h4>
                    <p>You need to setup MetaMask wallet to continue</p>
                </div>
                <div className="modal-footer modal-footer1">
                    <a className="btn btn-primary" rel="noreferrer" target="_blank" href="https://metamask.io/download/">
                        DOWNLOAD METAMASK
                    </a>
                </div>
            </div>
        </Modal>
    );
}