import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ModalType, Token, Contract } from '../../../core';
import { closeModal, openModal } from '../../../store';
import { Modal } from 'react-bootstrap';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import USDT from "../../../abi/Tether.json"
import BUSD from "../../../abi/BUSD.json"

export default function NftCheckoutModal() {
    const dispatch = useDispatch();
    const [checkoutDisable, setCheckoutDisable] = useState(false);
    const [error, setError] = useState("");
    const isOpen = useSelector((state) => state.ui.modal[ModalType.NftCheckoutModal] || false);
    const nft = useSelector((state) => state.userDetails.UserNftBuyDetails.nftBuyDetails);
    console.log("nft", nft)
    const currency = useSelector((state) => state.MysteryBoxes.currency.selectedCurrency);
    const walletBalance = useSelector((state) => state.auth.user.walletBalance);

    const handleCheckout = async () => {
        if ((currency.toLowerCase() === "usdt" && Number(walletBalance.usdt) >= (nft.price) / 1000) || (currency.toLowerCase() === "busd" && Number(walletBalance.busd) >= (nft.price) / 1000)) {
            setCheckoutDisable(true);
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();

            const provider = new ethers.providers.Web3Provider(connection);

            const signer = provider.getSigner();

            const tether = new ethers.Contract(Token.Usdt, USDT.abi, signer);
            const busd = new ethers.Contract(Token.Busd, BUSD.abi, signer);
            let price = ethers.utils.parseUnits((nft.price / 1000).toString(), 'ether')

            let transaction;

            if (currency === 'usdt') {
                transaction = await tether.approve(Contract.nftMarketplace, price).catch((e) => handleClose());
                if (transaction) {
                    await transaction.wait();
                    handleClose();
                    dispatch(openModal(ModalType.NftCheckoutModal1));
                }
            } else if (currency === 'busd') {
                transaction = await busd.approve(Contract.nftMarketplace, price).catch((e) => handleClose());
                if (transaction) {
                    await transaction.wait();
                    handleClose();
                    dispatch(openModal(ModalType.NftCheckoutModal1));
                }
            }
        }
        else {
            return setError("insufficient balance");
        }

    }

    const handleClose = () => {
        dispatch(closeModal(ModalType.NftCheckoutModal));
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
                        <span>{nft?.price} {currency.toUpperCase()}</span>
                    </div>
                    <ul className="checkout-all-details">
                        <li>
                            <span>Your Balance</span>
                            <span>{currency && currency === "usdt" ? (walletBalance && walletBalance.usdt ? walletBalance.usdt : '0.0') : (walletBalance && walletBalance.busd ? walletBalance.busd : '0.0')} {currency.toUpperCase()}</span>
                        </li>
                        <li>
                            <span>Quantity</span>
                            <span>{nft?.quantity}</span>
                        </li>
                        <li>
                            <span>Total Value</span>
                            <span>{nft?.price} {currency.toUpperCase()}</span>
                        </li>
                        {error ? <li>
                            <span style={{ color: "red" }}>{error}</span>
                        </li> : ""}
                    </ul>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" onClick={handleClose} className="btn btn-secondary">Never Mind</button>
                <button type="button" disabled={checkoutDisable} onClick={handleCheckout} data-dismiss="modal" data-toggle="modal" data-target="#checkout-modal1" className={`btn btn-primary ${checkoutDisable && error === "" ? "checking" : ""}`}>{checkoutDisable && error === "" ? "Checking out" : "Checkout"}</button>
            </div>
        </Modal>
    )
}