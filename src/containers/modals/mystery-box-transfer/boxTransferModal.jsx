import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ModalType, Token, Contract, getUserBalance } from '../../../core';
import { closeModal, openModal, setCurrencyType, setBoxNotificationStatus, setWalletBalance } from '../../../store';
import { apiChangeTransferBoxStatus } from "../../../api";
import { ethers, Wallet } from 'ethers';
import Web3Modal from 'web3modal';
import USDT from "../../../abi/Tether.json"
import BUSD from "../../../abi/BUSD.json"
import Box from "../../../abi/BoxHub1.json"

export default function BoxTransferModal() {
    const dispatch = useDispatch();
    const [acceptDisable, setAcceptDisable] = useState(false);
    const [error, setError] = useState("");

    const [selectedCurrencyType, setSelectedCurrency] = useState(false);

    const isOpen = useSelector((state) => state.ui.modal[ModalType.BoxTransferModal] || false)
    const currency = useSelector((state) => state.MysteryBoxes.currency.selectedCurrency);
    const walletAddress = useSelector((state) => state.auth.user.walletAddress);
    const getTransferBox = useSelector((state) => state.MysteryBoxes.getTransferBox.getTransferBoxData);
    const walletBalance = useSelector((state) => state.auth.user.walletBalance);
    const boxNotificationStatus = useSelector((state) => state.MysteryBoxes.boxNotificationStatus.status);

    const handleClose = () => {
        dispatch(closeModal(ModalType.BoxTransferModal));
    }

    async function fetchChangeTransferStatus(boxStatus) {
        try {
            const obj = { status: boxStatus, id: getTransferBox._id }
            const { data } = await apiChangeTransferBoxStatus(obj);
            handleClose();
            dispatch(setBoxNotificationStatus(boxNotificationStatus ? false : true));
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleDecline = async () => {
        fetchChangeTransferStatus("reject");

    }

    const handleAccept = async () => {
        if ((currency.toLowerCase() === "usdt" && Number(walletBalance.usdt) >= (getTransferBox.price * getTransferBox.quantity) / 1000) || (currency.toLowerCase() === "busd" && Number(walletBalance.busd) >= (getTransferBox.price * getTransferBox.quantity) / 1000)) {
            setAcceptDisable(true);
            const box_type = getTransferBox.box_detail.box_type;
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();

            const provider = new ethers.providers.Web3Provider(connection);

            const signer = provider.getSigner();

            const tether = new ethers.Contract(Token.Usdt, USDT.abi, signer);
            const busd = new ethers.Contract(Token.Busd, BUSD.abi, signer);
            let price = ethers.utils.parseUnits(((getTransferBox.price * getTransferBox.quantity) / 1000).toString(), 'ether')

            let walletMnemonic = Wallet.fromMnemonic(process.env.REACT_APP_MNEMONIC)
            let wallet = walletMnemonic.connect(provider)

            const contract = new ethers.Contract(Contract.Address, Box.abi, wallet);

            let transaction;
            let tx;
            let event;

            let boxOwner = getTransferBox.user_detail.wallet_address;
            if (currency === 'usdt') {

                transaction = await tether.approve(Contract.Address, price)
                await transaction.wait()
                transaction = await contract.TransferBox(box_type, box_type, boxOwner, walletAddress, Token.Usdt, price)
            } else if (currency === 'busd') {
                transaction = await busd.approve(Contract.Address, price)
                await transaction.wait()
                transaction = await contract.TransferBox(box_type, box_type, boxOwner, walletAddress, Token.Busd, price)
            }
            tx = await transaction.wait()
            event = tx.events[2]

            const transactionHash = event.transactionHash;
            console.log("transactionHash", transactionHash);
            const boxId = Number(event.args.boxId._hex);
            console.log("boxId", boxId);
            const boxType = Number(event.args.boxType._hex);
            console.log("boxType", boxType);

            fetchChangeTransferStatus("accept");
            handleClose();
            const userBalance = await getUserBalance(walletAddress);
            dispatch(setWalletBalance(userBalance));
        }
        else {
            return setError("insufficient balance");
        }
    }

    const handleCurrencySelect = () => {
        setSelectedCurrency(selectedCurrencyType ? false : true);
    }

    const handleCurrencyType = (selectedCurrency) => {
        setError("");
        dispatch(setCurrencyType(selectedCurrency));
        setSelectedCurrency(false);
    }

    const { from, quantity, price } = getTransferBox
    const { name, image } = getTransferBox.box_detail
    return (
        <Modal
            show={isOpen}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <button type="button" onClick={handleClose} className="close modal-close-btn" data-dismiss="modal" aria-label="Close">x</button>
            <div className="modal-body mb-0 pb-0">
                <div className="modal-inner-area">
                    <h4>Mystery Box Transfer</h4>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</p>
                    <p>Received from: <span>{from}</span></p>
                    <div className="row mystery-boxes-row">
                        <div className="col-md-6 clear-both">
                            <div className="mystery-image-boxes">
                                <img src={image} alt="mystery boxes" />
                                <h4>{name}</h4>
                            </div>
                        </div>
                        <div className="col-md-12 text-center mt-3">
                            <span>Quantity:<strong>{quantity}</strong></span>
                        </div>
                    </div>
                    <ul className="mystery-boxes-total">
                        <li>
                            <span className="text-left">TOTAL <p className="mb-0">please choose your<br></br> desired currency</p></span>
                            <div className="mystery-box-select">
                                <span onClick={handleCurrencySelect}>{price * quantity} {currency.toUpperCase()}</span>
                                <ul className={`dropdown-menu selectCurrency-menu ${selectedCurrencyType ? "mystery-box-select1" : ""}`}>
                                    <li onClick={(() => handleCurrencyType("usdt"))}>USDT</li>
                                    <li onClick={(() => handleCurrencyType("busd"))}>BUSD</li>
                                </ul>
                                <div className="usdt-pric-box">
                                    ($43.21USD)
                                </div>
                            </div>

                        </li>
                        {error ? <li>
                            <span style={{ color: "red" }}>{error}</span>
                        </li> : ""}
                    </ul>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" onClick={handleDecline} className="btn btn-secondary">Decline</button>
                <button type="button" disabled={acceptDisable} onClick={handleAccept} data-dismiss="modal" data-toggle="modal" data-target="#checkout-modal1" className="btn btn-primary">{acceptDisable ? "Accepting..." : "Accept"}</button>
            </div>
        </Modal>
    );
}