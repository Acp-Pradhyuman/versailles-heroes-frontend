import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { ModalType } from '../../../core';
import { closeModal } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyImg from "../../../assets/images/copy.svg"
import { useHistory } from "react-router-dom";

export default function NftPurchaseCompleted() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [copy, setCopy] = useState(false);
    const isOpen = useSelector((state) => state.ui.modal[ModalType.NftPurchaseCompleted] || false);
    const nft = useSelector((state) => state.userDetails.UserNftBuyDetails.nftBuyDetails);
    const currency = useSelector((state) => state.MysteryBoxes.currency.selectedCurrency);
    const transactionHash = useSelector((state) => state.userDetails.UserNftTransactionHash.transactionHash);

    const handleClose = () => {
        dispatch(closeModal(ModalType.NftPurchaseCompleted));
        history.push("/marketplace");
    }
    return (
        <Modal
            show={isOpen}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            dialogClassName="modal-class modal-md"
        >
            <button type="button" className="close modal-close-btn" data-dismiss="modal" aria-label="Close">x</button>
            <div className="modal-body">
                <div className="modal-inner-area">
                    <img src={require("../../../assets/images/icon/check-icon.png")} className="mb-4" alt="hero" />
                    <h4>Purchase Completed</h4>
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
                            <span>Status</span>
                            <span>Completed</span>
                        </li>
                        <li>
                            <span>Transaction ID</span>
                            <span>{`${transactionHash.substring(0, 5)}...${transactionHash.substring(transactionHash.length - 4)}`}
                                <CopyToClipboard text={transactionHash}
                                    onCopy={() => setCopy(true)}>
                                    <img src={CopyImg} style={{ width: "20px", marginLeft: "5px", cursor: "pointer" }} alt="copyimg" />
                                </CopyToClipboard> </span>
                        </li>
                    </ul>
                    <div className="modal-footer modal-footer1">
                        <button type="button" onClick={handleClose} className="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#purchase-completed">OK</button>
                    </div>
                </div>
            </div>
        </Modal >
    )
}