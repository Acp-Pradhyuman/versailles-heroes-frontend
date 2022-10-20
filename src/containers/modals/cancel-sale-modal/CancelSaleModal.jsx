import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ModalType, Contract, NftName } from "../../../core";
import { closeModal, setUserNftStatus, setUserNftSaleStatus, setUserWeaponStatus, setUserOnSaleStatus } from "../../../store";
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { apiSaleNft } from "../../../api"
import NFTmarketplace from "../../../abi/nftMarketplace10.json"

export default function CancelSaleModal() {
    const dispatch = useDispatch();
    const [btnDisable, setBtnDisable] = useState(false);
    const isOpen = useSelector((state) => state.ui.modal[ModalType.CancelSaleModal] || false);
    const tokenCount = useSelector((state) => state.userDetails.UserNftSaleDetails.token_count);
    const marketitemId = useSelector((state) => state.userDetails.UserNftSaleDetails.marketitemId);
    const userNftStatus = useSelector((state) => state.userDetails.UserNftStatus);
    const userNftSaleStatus = useSelector((state) => state.userDetails.UserNftSaleStatus);
    const weaponStatus = useSelector((state) => state.userDetails.userWeaponNftStatus.status);
    const weaponOnSaleStatus = useSelector((state) => state.userDetails.userWeaponNftStatus.weponsOnSaleStatus);
    const selectedNftName = useSelector((state) => state.userDetails.UserNftSaleDetails.NftName);

    const handleClose = async () => {
        dispatch(closeModal(ModalType.CancelSaleModal));
    }
    const handleCancel = async () => {
        setBtnDisable(true)
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();

        const nftMarketplace = new ethers.Contract(Contract.nftMarketplace, NFTmarketplace.abi, signer);

        let transaction = await nftMarketplace.removeMarketItem721WETH(Contract.nft, marketitemId).catch((e) => handleClose());
        if (transaction) {
            let tx = await transaction.wait();

            cancelNftSale();
            handleClose();
        }

    }

    async function cancelNftSale() {
        try {
            const obj = { on_sale: false, token_count: tokenCount }
            const { data } = await apiSaleNft(obj);
            if (selectedNftName === NftName.Weapon) {
                dispatch(setUserWeaponStatus(!weaponStatus));
                dispatch(setUserOnSaleStatus(!weaponOnSaleStatus));
            }
            else {
                dispatch(setUserNftStatus(userNftStatus ? false : true));
                dispatch(setUserNftSaleStatus(userNftSaleStatus ? false : true));
            }
        }
        catch (error) {
            console.log(error);
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
                    <h4>Do you really want to cancel this sale?</h4>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam lorem ipsum dolemar nonumy eirmod tempor</p>
                </div>
            </div>
            <div className="modal-footer modal-footer1">
                <button type="submit" onClick={handleClose} className="btn btn-secondary">No</button>
                <button type="submit" disabled={btnDisable} onClick={handleCancel} className={`btn btn-primary ${btnDisable ? "checking" : ""}`}>Yes</button>
            </div>
        </Modal>
    )
}