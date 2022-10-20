import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { ModalType, Contract, Token, getUserBalance } from "../../../core";
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, openModal, setUserNftTransactionHash, setWalletBalance } from '../../../store';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { apiNftHeroPurchase } from "../../../api"
import NFTmarketplace from "../../../abi/nftMarketplace10.json";

export default function NftCheckoutModal1() {
    const dispatch = useDispatch();
    const [checkBox, setCheckBox] = useState(false);
    const [confirmDisable, setConfirmDisable] = useState(false);
    const isOpen = useSelector((state) => state.ui.modal[ModalType.NftCheckoutModal1] || false);
    const currency = useSelector((state) => state.MysteryBoxes.currency.selectedCurrency);
    const nft = useSelector((state) => state.userDetails.UserNftBuyDetails.nftBuyDetails);
    const walletAddress = useSelector((state) => state.auth.user.walletAddress);

    const handleConfirm = async () => {
        setConfirmDisable(true);
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();

        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();
        let price = ethers.utils.parseUnits((nft?.price / 1000).toString(), 'ether')

        const nftMarketplace = new ethers.Contract(Contract.nftMarketplace, NFTmarketplace.abi, signer);

        let transaction, tx;

        if (currency === 'usdt') {
            transaction = await nftMarketplace.buyMarketItem721WETH(Token.Usdt, price, Contract.nft, nft?.marketitemId).catch((e) => handleClose())
            if (transaction)
                tx = await transaction.wait()
        } else if (currency === 'busd') {
            transaction = await nftMarketplace.buyMarketItem721WETH(Token.Busd, price, Contract.nft, nft?.marketitemId).catch((e) => handleClose())
            if (transaction)
                tx = await transaction.wait()
        }
        if (tx) {
            let event = tx.events[0];
            const transactionHash = event.transactionHash;

            let nftPurchasePayload = {
                token_count: nft?.token_count,
                owner_address: walletAddress, hash: transactionHash
            }
            fetchNftHeroPurchase(nftPurchasePayload);
            dispatch(setUserNftTransactionHash(transactionHash));
            handleClose();
            dispatch(openModal(ModalType.NftPurchaseCompleted));
            const userBalance = await getUserBalance(walletAddress);
            dispatch(setWalletBalance(userBalance));
        }
    }

    async function fetchNftHeroPurchase(nftPurchasePayload) {
        try {
            const { data } = await apiNftHeroPurchase(nftPurchasePayload);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        dispatch(closeModal(ModalType.NftCheckoutModal1));
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
                            <img src={nft?.image} alt="heroImage" />
                            <div className="sell-nft-name">
                                <h3>{nft?.name}</h3>
                                <span className="second-col">Quantity : {nft?.quantity}</span>
                            </div>
                        </div>
                        <div className="sell-nft-details">
                            <span>Price</span>
                            <h3>{nft?.price} {currency.toUpperCase()}</h3>
                            <span>$0.41 USD</span>
                        </div>
                    </div>
                    <ul className="checkout-all-details">
                        <li>
                            <span>Total</span>
                            <span>{nft?.price} {currency.toUpperCase()}</span>
                        </li>
                        <li>
                            <span></span>
                            <span>$0.41 USD</span>
                        </li>
                    </ul>
                    <div className="custom-control custom-checkbox checking-box-wrap">
                        <input type="checkbox" onChange={handleCheckBox} className="custom-control-input" id="defaultUnchecked" />
                        <label className="custom-control-label text-gray h6" htmlFor="defaultUnchecked">By checking this box, I agree</label>
                    </div>
                </div>
            </div>
            <div className="modal-footer modal-footer1">
                <button type="button" disabled={!checkBox || confirmDisable} onClick={handleConfirm} href="#" className={`btn btn-primary ${confirmDisable ? "checking" : ""}`} data-dismiss="modal" data-toggle="modal" data-target="#purchase-completed">{confirmDisable ? "Confirming" : "Confirm"}</button>
            </div>
        </Modal>
    )
}