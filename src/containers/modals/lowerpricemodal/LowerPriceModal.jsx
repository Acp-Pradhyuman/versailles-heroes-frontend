import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ModalType, Contract } from "../../../core";
import { closeModal } from "../../../store";
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { apiEditNftPrice } from "../../../api";

export default function LowerPriceModal() {
    const dispatch = useDispatch();
    const [nftPrice, setNftPrice] = useState();
    const [error, setError] = useState("");
    const [btnDisable, setBtnDisable] = useState(false);
    const isOpen = useSelector((state) => state.ui.modal[ModalType.LowerPriceModal] || false);
    const marketitemId = useSelector((state) => state.userDetails.UserNftSaleDetails.marketitemId);
    const tokenCount = useSelector((state) => state.userDetails.UserNftSaleDetails.token_count);

    const handleClose = () => {
        dispatch(closeModal(ModalType.LowerPriceModal));
    }
    const changePrice = async () => {
        if (!nftPrice) {
            setError("Enter Price");
            return
        }
        setBtnDisable(true);
        // const web3Modal = new Web3Modal();
        // const connection = await web3Modal.connect();
        // const provider = new ethers.providers.Web3Provider(connection);

        // const signer = provider.getSigner();
        // let price = ethers.utils.parseUnits((nftPrice / 1000).toString(), 'ether');

        // const nftMarketplace = new ethers.Contract(Contract.nftMarketplace, NFTmarketplace.abi, signer);

        // let transaction = await nftMarketplace.removeMarketItem721WETH(Contract.nft, marketitemId);
        // let tx = await transaction.wait()

        // transaction = await nftMarketplace.updateMarketItem721WETH(Contract.nft, marketitemId, price);
        // tx = await transaction.wait();

        EditNftPrice();
        handleClose();
    }

    async function EditNftPrice() {
        try {
            const editNft = { token_count: tokenCount, price: nftPrice }
            const { data } = await apiEditNftPrice(editNft);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handlePriceChange = (e) => {
        setError("");
        setNftPrice(Number(e.target.value));
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
                    <h4>Lower the price for your Art</h4>
                    <form className="deposit-form-wrap mt-4">
                        <div className="form-group">
                            <div className="deposit-form-box">
                                <span>BUSD/USDT</span>
                            </div>
                            <input type="number" onChange={handlePriceChange} placeholder="0.1" />
                            {error && error !== "" ? error : ""}
                        </div>
                    </form>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam lorem ipsum dolemar nonumy eirmod tempor</p>
                </div>
                <div className="modal-footer modal-footer1">
                    <button type="button" onClick={handleClose} className="btn btn-secondary">Never mind</button>
                    <button type="button" disabled={btnDisable} onClick={changePrice} className={`btn btn-primary ${btnDisable ? "checking" : ""}`}>Lower the price</button>
                </div>
            </div>
        </Modal >
    );
}