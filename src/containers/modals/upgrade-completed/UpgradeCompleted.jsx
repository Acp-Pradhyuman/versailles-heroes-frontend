import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store';
import { ModalType } from '../../../core';
import {Modal} from 'react-bootstrap';

export default function UpgradeCompleted() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.modal[ModalType.UpgradeCompleted] || false)

    const handleClose = () => {
        dispatch(closeModal(ModalType.UpgradeCompleted));
    }

    return (
        <Modal
            show={isOpen}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <button type="button" onClick={handleClose} className="close modal-close-btn" data-dismiss="modal" aria-label="Close">x</button>
                    <div className="modal-body">
                        <div className="modal-inner-area">
                            <img src="assets/images/icon/check-icon.png" alt="check icon" className="mb-4" />
                            <h4>Upgrade Completed</h4>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
                            <div className="checkout-price-details mt-4">
                                <div className="checkout-box-wrap">
                                    <img src="assets/images/mystery-boxes.png" alt="mystery boxes" />
                                    <div className="sell-nft-name">
                                        <h3>Common Box</h3>
                                        <span className="second-col">Quantity : 1</span>
                                    </div>
                                </div>
                                <div className="sell-nft-details">
                                    <span>Price</span>
                                    <h3>0.001 BUSD</h3>
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
                                    <span>454DJDJIK551</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );

}