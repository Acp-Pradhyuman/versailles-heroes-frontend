import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal, setUserNftStatus, setUserNftSaleStatus, setUserWeaponStatus, setUserOnSaleStatus } from '../../../store';
import { ModalType, Contract, NftName } from '../../../core';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers'
import NFTmarketplace from "../../../abi/nftMarketplace10.json"
import NFT from "../../../abi/NFT2.json";
import { apiSaleNft } from "../../../api";

export default function SellItemModal() {
    const dispatch = useDispatch();
    const [heroSelingPrice, setHeroSelingPrice] = useState();
    const [btnDisable, setBtnDisable] = useState(false);
    const [error, setError] = useState("");
    const isOpen = useSelector((state) => state.ui.modal[ModalType.SellItemModal] || false)
    const saleHeroTokenCount = useSelector((state) => state.userDetails.UserNftSaleDetails.token_count);
    console.log("sale nft token count ", saleHeroTokenCount);
    const userNftStatus = useSelector((state) => state.userDetails.UserNftStatus);
    const userNftSaleStatus = useSelector((state) => state.userDetails.UserNftSaleStatus);
    const walletAddress = useSelector((state) => state.auth.user.walletAddress);
    const selectedNftName = useSelector((state) => state.userDetails.UserNftSaleDetails.NftName);
    const weaponStatus = useSelector((state) => state.userDetails.userWeaponNftStatus.status);
    const weaponOnSaleStatus = useSelector((state) => state.userDetails.userWeaponNftStatus.weponsOnSaleStatus);

    const handleClose = () => {
        dispatch(closeModal(ModalType.SellItemModal));
    }
    const handleSellNow = async () => {
        if (!heroSelingPrice) {
            setError("Enter Price");
            return
        }
        setBtnDisable(true)
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();

        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();

        let price = ethers.utils.parseUnits((heroSelingPrice / 1000).toString(), 'ether')

        const nft = new ethers.Contract(Contract.nft, NFT.abi, signer);
        const nftMarketplace = new ethers.Contract(Contract.nftMarketplace, NFTmarketplace.abi, signer);

        let transaction = await nft.setApprovalForAll(Contract.nftMarketplace, true).catch((e) => handleClose());
        if (transaction) {
            let tx = await transaction.wait()

            transaction = await nftMarketplace.createMarketItem721WETH(Contract.nft,
                saleHeroTokenCount, price).catch((e) => handleClose());
            if (transaction) {
                tx = await transaction.wait();
                let event = tx.events[2];
                let hash = event.transactionHash
                let marketItemId = Number(event.args.marketItemId._hex)
                console.log("tx", tx);

                let saleNftObj = { token_count: saleHeroTokenCount, on_sale: true, hash, marketitemId: marketItemId, price: heroSelingPrice, address: walletAddress }
                SaleNft(saleNftObj);

                dispatch(openModal(ModalType.SellRequestCompleted));
                handleClose();
            }
        }
    }

    async function SaleNft(saleNftData) {
        try {
            const { data } = await apiSaleNft(saleNftData);
            console.log("saleNftApi response", data);
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
    const handlePriceChange = (e) => {
        setHeroSelingPrice(Number(e.target.value))
        setError("");
    }

    return (
        <Modal
            show={isOpen}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            dialogClassName="modal-class modal-md modal-center sell-iyem-modal"
        >

            <button type="button" onClick={handleClose} className="close modal-close-btn" data-dismiss="modal" aria-label="Close">x</button>
            <div className="modal-body">
                <div className="modal-inner-area">
                    <h4>Sell Item</h4>
                    <form>
                        <div className="form-group over-label lg mb-0">
                            <label className="label" htmlFor="email">Type your price</label>
                            <input type="number" onChange={handlePriceChange} className="form-control font-16" id="email" placeholder="0.01" />
                            {error && error !== "" ? <p class="waring-msg mt-2">{error}</p> : ""}
                        </div>
                    </form>
                    <ul className="checkout-all-details">
                        <li>
                            <span>Your Balance</span>
                            <span>234.3 BUSD/USDT</span>
                        </li>
                        <li>
                            <span>Service Fee</span>
                            <span>{heroSelingPrice ? heroSelingPrice * 0.02 : 0} BUSD/USDT</span>
                        </li>
                    </ul>
                    <p>Minimum Selling price is 123.00 BUSD/USDT</p>
                </div>
                <div className="modal-footer">
                    <button type="button" disabled={btnDisable} onClick={handleSellNow} data-dismiss="modal" data-toggle="modal" data-target="#sell-request-completed" className={`btn btn-primary w-100 mx-0 ${btnDisable ? "checking" : ""}`}>{btnDisable ? "Selling" : "Sell Now"}</button>
                </div>
            </div>
        </Modal>
    );
}