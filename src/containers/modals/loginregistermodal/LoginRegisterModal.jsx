import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ModalType } from "../../../core";
import { closeModal, openModal } from "../../../store";


export default function LoginRegisterModal() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.modal[ModalType.LoginRegisterModal] || false);
    const userStatusByAdmin = useSelector((state) => state.auth.user.userStatusByAdmin);

    const handleClose = () => {
        dispatch(closeModal(ModalType.LoginRegisterModal));
    }

    const handleRegister = () => {
        if (!userStatusByAdmin) {
            dispatch(openModal(ModalType.NftWarningModal));
            handleClose();
            return;
        }
        dispatch(openModal(ModalType.RegisterModal));
        handleClose();
    }

    const handleLogin = () => {
        if (!userStatusByAdmin) {
            dispatch(openModal(ModalType.NftWarningModal));
            handleClose();
            return;
        }
        dispatch(openModal(ModalType.LoginModal));
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
                </div>
            </div>
            <div className="modal-footer modal-button-wrap">
                <button type="button" onClick={handleRegister} className="btn btn-primary mb-3" data-dismiss="modal" data-toggle="modal" data-target="#register-modal">REGISTER</button>
                <button type="button" onClick={handleLogin} className="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#login-modal">LOGIN</button>
            </div>
        </Modal>
    );
}