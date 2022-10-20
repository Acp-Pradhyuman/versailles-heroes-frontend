import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ModalType } from '../../../core';
import { closeModal, setBoxQuantity } from '../../../store';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyImg from "../../../assets/images/copy.svg"

export default function PurchaseCompleted() {
    const dispatch = useDispatch();
    const [copy, setCopy] = useState(false);
    const isOpen = useSelector((state) => state.ui.modal[ModalType.PurchaseCompleted] || false)
    const boxQuantity = useSelector((state) => state.MysteryBoxes.boxQuantity.boxCount);
    const boxDetails = useSelector((state) => state.MysteryBoxes.boxDetails.boxData);
    const currency = useSelector((state) => state.MysteryBoxes.currency.selectedCurrency);
    const boxPurchase = useSelector((state) => state.MysteryBoxes.boxPurchase.boxPurchaseDetails);

    const handleClose = () => {
        dispatch(setBoxQuantity(1));
        dispatch(closeModal(ModalType.PurchaseCompleted));
    }
    return (
        <Modal
            show={isOpen}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            dialogClassName="modal-class modal-md"
        >

            <button type="button" onClick={handleClose} className="close modal-close-btn" data-dismiss="modal" aria-label="Close">x</button>
            <div className="modal-body">
                <div className="modal-inner-area">
                    <img src={require("../../../assets/images/icon/check-icon.png")} alt="check icon" className="mb-4" />
                    <h4>Purchase Completed</h4>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
                    <div className="checkout-price-details mt-4">
                        <div className="checkout-box-wrap">
                            <img src={boxDetails?.boxImage} alt="mystery boxes" />
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
                    <ul className="checkout-all-details">
                        <li>
                            <span>Status</span>
                            <span>Completed</span>
                        </li>
                        <li>
                            <span>Transaction ID</span>
                            <span>{`${boxPurchase?.transactionHash.substring(0, 5)}...${boxPurchase?.transactionHash.substring(boxPurchase?.transactionHash.length - 4)}`}
                                <CopyToClipboard text={boxPurchase?.transactionHash}
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
        </Modal>

    );
}