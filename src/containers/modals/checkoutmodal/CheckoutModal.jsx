import { Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal, modalData } from '../../../store';
import { ModalType, Contract } from '../../../core'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import Box from "../../../abi/BoxHub1.json"

export default function CheckoutModal() {
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [checkoutDisable, setCheckoutDisable] = useState(false);

    const currency = (useSelector((state) => state.MysteryBoxes.currency.selectedCurrency));
    const isOpen = useSelector((state) => state.ui.modal[ModalType.CheckoutModal] || false);
    const boxDetails = useSelector((state) => state.MysteryBoxes.boxDetails.boxData);
    const boxQuantity = useSelector((state) => state.MysteryBoxes.boxQuantity.boxCount);
    const walletAddress = useSelector((state) => state.auth.user.walletAddress);
    const walletBalance = useSelector((state) => state.auth.user.walletBalance);


    const handleClose = () => {
        dispatch(closeModal(ModalType.CheckoutModal))
    }

    const handleCheckout = async () => {
        if ((currency.toLowerCase() === "usdt" && Number(walletBalance.usdt) >= (boxDetails.price * boxQuantity) / 1000) || (currency.toLowerCase() === "busd" && Number(walletBalance.busd) >= (boxDetails.price * boxQuantity) / 1000)) {
            setCheckoutDisable(true);
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();

            const provider = new ethers.providers.Web3Provider(connection);

            const signer = provider.getSigner();
            console.log("signer", signer._address);

            const contract = new ethers.Contract(Contract.Address, Box.abi, signer);
            let price = ethers.utils.parseUnits(((boxDetails.price * boxQuantity) / 1000).toString(), 'ether');
            let messageHash = await contract.getMessageHash(boxDetails.box_type, price);

            await window.ethereum.request({ method: "personal_sign", params: [walletAddress, messageHash] }).then(res => {
                if (res) {
                    dispatch(modalData(res));
                    dispatch(openModal(ModalType.CheckoutModal1));
                    handleClose();
                }
            }).catch((e) => handleClose());
        } else {
            return setError("insufficient balance");
        }

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
                    <h4>Checkout</h4>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
                    <div className="checkout-price-details">
                        <span>Price</span>
                        <span>{boxDetails?.price} {currency.toUpperCase()}</span>
                    </div>
                    <ul className="checkout-all-details">
                        <li>
                            <span>Your Balance</span>
                            <span>{currency && currency === "usdt" ? (walletBalance && walletBalance.usdt ? walletBalance.usdt : '0.0') : (walletBalance && walletBalance.busd ? walletBalance.busd : '0.0')} {currency.toUpperCase()}</span>
                        </li>
                        <li>
                            <span>Quantity</span>
                            <span>{boxQuantity}</span>
                        </li>
                        <li>
                            <span>Total Value</span>
                            <span>{boxDetails?.price * boxQuantity} {currency.toUpperCase()}</span>
                        </li>
                        {error ? <li>
                            <span style={{ color: "red" }}>{error}</span>
                        </li> : ""}
                    </ul>
                </div>
            </div>
            <div className="modal-footer modal-footer1">
                <button type="button" onClick={handleClose} className="btn btn-secondary">Never Mind</button>
                <button type="button" onClick={handleCheckout} disabled={checkoutDisable} data-dismiss="modal" data-toggle="modal" data-target="#checkout-modal1" className={`btn btn-primary ${checkoutDisable && error === "" ? "checking" : ""}`}>{checkoutDisable && error === "" ? 'Checking out' : 'Checkout'}</button>
            </div>
        </Modal>
    );
}