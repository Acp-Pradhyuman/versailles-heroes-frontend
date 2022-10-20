import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ModalType, getUserBalance } from "../../../core";
import { closeModal, openModal, setWalletBalance, setWalletAddress } from "../../../store";
import WalletImg from "../../../assets/images/icon/wallet.svg";
import ModalCloseImg from "../../../assets/images/icon/modal-cross.svg";

export default function WalletConnect() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.modal[ModalType.WalletConnectModal] || false)
    const walletAddress = useSelector((state) => state.auth.user.walletAddress);
    const userRegistered = useSelector((state) => state.auth.user.walletConnectStatus);

    const handleClose = () => {
        dispatch(closeModal(ModalType.WalletConnectModal));
    }

    const handleConnect = async () => {
        await window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((res) => {
                accountChangehandleUserConnect(res[0])
            });
        handleClose();
        if (!userRegistered && window.ethereum && window.ethereum !== "undefined") {
            dispatch(openModal(ModalType.LoginRegisterModal));
        }

    }

    const getbalance = async (address) => {
        const userBalance = await getUserBalance(walletAddress);
        dispatch(setWalletBalance(userBalance));
    };

    // Function for getting handling all events
    const accountChangehandleUserConnect = (account) => {
        // Setting an address data
        console.log("account ============= ", account);
        dispatch(setWalletAddress(account));
        // setAddress(account);
        console.log("metamask:-", walletAddress);

        // Setting a balance
        getbalance(account);
    };

    return (
        <Modal
            show={isOpen}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            dialogClassName="modal-class modal-md modal-center"
        >
            <button type="button" onClick={handleClose} className="close modal-close-btn" data-dismiss="modal" aria-label="Close">
                <img src={ModalCloseImg} alt="modal-closeImg" />
            </button>
            <div className="modal-body connect-wallet-wrap">
                <div className="modal-inner-area">
                    <div className="wallet-icon-box">
                        <img src={WalletImg} alt="wallet-Img" />
                    </div>
                    <h4>Connect Wallet</h4>
                    <p>You need to connect your wallet first</p>
                </div>
            </div>
            <div className="modal-footer">
                <button type="submit" onClick={handleClose} className="btn btn-secondary">Cancel</button>
                <button type="submit" onClick={handleConnect} className="btn btn-primary">Connect</button>
            </div>
        </Modal>
    )
}