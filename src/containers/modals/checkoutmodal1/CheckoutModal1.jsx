import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ModalType, Token, Contract, getUserBalance } from "../../../core"
import { closeModal, openModal, setWalletBalance, setPurchaseDetails } from '../../../store';
import { Modal } from "react-bootstrap";
import Web3Modal from 'web3modal';
import { ethers, Wallet } from 'ethers'
import Box from "../../../abi/BoxHub1.json"
import USDT from "../../../abi/Tether.json"
import BUSD from "../../../abi/BUSD.json"
import { apiMysteryBoxPurchase } from "../../../api";


export default function CheckoutModal1() {
    const [confirmDisable, setConfirmDisable] = useState(false);
    const [checkBox, setCheckBox] = useState(false);

    const boxQuantity = useSelector((state) => state.MysteryBoxes.boxQuantity.boxCount);
    const boxDetails = useSelector((state) => state.MysteryBoxes.boxDetails.boxData);
    const walletAddress = useSelector((state) => state.auth.user.walletAddress);
    const boxPurchase = useSelector((state) => state.MysteryBoxes.boxPurchase.boxPurchaseDetails);
    const currency = useSelector((state) => state.MysteryBoxes.currency.selectedCurrency);

    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.modal[ModalType.CheckoutModal1] || false)
    const isSignature = useSelector((state) => state.ui.modal.data || "")

    const handleClose = () => {
        dispatch(closeModal(ModalType.CheckoutModal1));
    }

    const handleConfirm = async () => {
        setConfirmDisable(true);
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();

        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();

        const tether = new ethers.Contract(Token.Usdt, USDT.abi, signer);
        const busd = new ethers.Contract(Token.Busd, BUSD.abi, signer);
        let price = ethers.utils.parseUnits(((boxDetails.price * boxQuantity) / 1000).toString(), 'ether')

        let walletMnemonic = Wallet.fromMnemonic(process.env.REACT_APP_MNEMONIC)
        let wallet = walletMnemonic.connect(provider)

        const contract = new ethers.Contract(Contract.Address, Box.abi, wallet);

        let transaction;
        let tx;
        let event;

        if (currency === 'usdt') {
            transaction = await tether.approve(Contract.Address, price).catch((e) => handleClose());
            if (transaction) {
                await transaction.wait()
                transaction = await contract.buyBoxWithSignature(boxDetails.box_type, boxDetails.box_type, walletAddress, price, Token.Usdt, isSignature)
            }
        } else if (currency === 'busd') {
            transaction = await busd.approve(Contract.Address, price).catch((e) => handleClose());
            if (transaction) {
                await transaction.wait()
                transaction = await contract.buyBoxWithSignature(boxDetails.box_type, boxDetails.box_type, walletAddress, price, Token.Busd, isSignature)
            }
        }
        if (transaction) {
            tx = await transaction.wait()
            event = tx.events[1]

            const transactionHash = event.transactionHash;
            const boxId = Number(event.args.boxId._hex);
            const boxType = Number(event.args.boxType._hex);
            const buyerAddress = event.args.buyer;

            const obj = { transactionHash, boxType, boxId, buyerAddress }

            dispatch(setPurchaseDetails(obj));
            fetchMysteryBoxPurchase(obj);
            dispatch(openModal(ModalType.PurchaseCompleted));
            handleClose();
            const userBalance = await getUserBalance(walletAddress);
            dispatch(setWalletBalance(userBalance));
        }

    }

    async function fetchMysteryBoxPurchase(props) {
        try {
            const { boxType, buyerAddress, transactionHash } = props
            const obj = {
                price: boxDetails.price, currency, quantity: boxQuantity,
                mystery_box_id: boxDetails._id,
                buyer_addr: buyerAddress,
                transaction_hash: transactionHash,
                box_type: boxType
            }
            const { data } = await apiMysteryBoxPurchase(obj);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleCheckBox = () => {
        setCheckBox(checkBox ? false : true);
    }
    return (
        <Modal
            show={isOpen}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <button type="button" onClick={handleClose} className="close modal-close-btn" data-dismiss="modal" aria-label="Close">x</button>
            <div className="modal-body">
                <div className="modal-inner-area">
                    <h4>Checkout</h4>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
                    <div className="checkout-price-details mt-4">
                        <div className="checkout-box-wrap">
                            <img src={boxDetails?.boxImage} alt="mystery-boxes" />
                            <div className="sell-nft-name">
                                <h3>{boxDetails?.boxName}</h3>
                                <span className="second-col">Quantity : {boxQuantity}</span>
                            </div>
                        </div>
                        <div className="sell-nft-details">
                            <span>Price</span>
                            <h3>{boxDetails?.price * boxQuantity} {currency.toUpperCase()}</h3>
                            <span>$0.41 USD</span>
                        </div>
                    </div>
                    {/* <ul className="checkout-all-details">
                        <li>
                            <span>Total</span>
                            <span>{boxDetails.price * boxQuantity} {currency.toUpperCase()}</span>
                        </li>
                        <li>
                            <span></span>
                            <span>$0.41 {currency.toUpperCase()}</span>
                        </li>
                    </ul> */}
                    <div className="custom-control custom-checkbox checking-box-wrap mt-3">
                        <input type="checkbox" onChange={handleCheckBox} className="custom-control-input" id="defaultUnchecked" />
                        <label className="custom-control-label text-gray h6" htmlFor="defaultUnchecked">By checking this box, I agree</label>
                    </div>
                </div>
            </div>
            <div className="modal-footer modal-footer1">
                <button type="button" disabled={!checkBox || confirmDisable} onClick={handleConfirm} className={`btn btn-primary ${confirmDisable ? "checking" : ""}`} data-dismiss="modal" data-toggle="modal" data-target="#purchase-completed">{confirmDisable ? 'Confirming' : 'Confirm'}</button>
            </div>
        </Modal>
    );
}