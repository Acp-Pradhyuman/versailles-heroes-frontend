import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, setCurrencyType, setWalletBalance } from '../../../store';
import { ModalType, Contract, Token, NftName, getUserBalance } from '../../../core'
import Web3Modal from 'web3modal';
import { ethers } from 'ethers'
import USDT from "../../../abi/Tether.json"
import BUSD from "../../../abi/BUSD.json"
import UpgradeHero from "../../../abi/UpgradeHero.json"
import { apiHeroUpgrade, apiWeaponUpgrade } from "../../../api";


export default function CheckoutUpgradeModal() {
    const dispatch = useDispatch();
    const [confirmDisable, setConfirmDisable] = useState(false);
    const isOpen = useSelector((state) => state.ui.modal[ModalType.CheckoutUpgradeModal] || false)
    const currency = useSelector((state) => state.MysteryBoxes.currency.selectedCurrency);
    const walletBalance = useSelector((state) => state.auth.user.walletBalance);
    const [error, setError] = useState("");
    const [selectedCurrencyType, setSelectedCurrency] = useState(false);

    const walletAddress = useSelector((state) => state.auth.user.walletAddress);
    const nftUpgradeDetails = useSelector((state) => state.userDetails.userNftUpgradeDetails.nftUpgradeDetails);
    console.log("nftUpgradeDetails", nftUpgradeDetails)
    const handleClose = () => {
        dispatch(closeModal(ModalType.CheckoutUpgradeModal));
    }
    const handleCheckout = async () => {
        setConfirmDisable(true);
        if ((currency.toLowerCase() === "usdt" && Number(walletBalance.usdt) >= nftUpgradeDetails?.upgradePrice / 1000) ||
            (currency.toLowerCase() === "busd" && Number(walletBalance.busd) >= nftUpgradeDetails?.upgradePrice / 1000)) {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();

            const provider = new ethers.providers.Web3Provider(connection);

            const signer = provider.getSigner();

            const tether = new ethers.Contract(Token.Usdt, USDT.abi, signer);
            const busd = new ethers.Contract(Token.Busd, BUSD.abi, signer);
            let price = ethers.utils.parseUnits((nftUpgradeDetails?.upgradePrice / 1000).toString(), 'ether')

            const upgradeHero = new ethers.Contract(Contract.upgradeHero, UpgradeHero.abi, signer);

            let transaction;

            if (currency === 'usdt') {
                transaction = await tether.approve(Contract.upgradeHero, price).catch((e) => handleClose())
                if (transaction) {
                    await transaction.wait()
                    transaction = await upgradeHero.upgradeHeroPayment(price, Token.Usdt).catch((e) => handleClose())
                }
            } else if (currency === 'busd') {
                transaction = await busd.approve(Contract.upgradeHero, price).catch((e) => handleClose());
                if (transaction) {
                    await transaction.wait()
                    transaction = await upgradeHero.upgradeHeroPayment(price, Token.Busd).catch((e) => handleClose())
                }
            }
            if (transaction) {
                await transaction.wait()

                fetchUpgrade();
                const userBalance = await getUserBalance(walletAddress);
                dispatch(setWalletBalance(userBalance));
                handleClose();
            }
        } else {
            return setError("insufficient balance");
        }
    }

    async function fetchUpgrade() {
        try {
            if (nftUpgradeDetails?.nftName === NftName.Hero) {
                const obj = { attribute_id: nftUpgradeDetails?.attribute_id };
                const { data } = await apiHeroUpgrade(obj);
                console.log("hero upgrade data", data);
            }
            else {
                const obj = { weapon_attribute_id: nftUpgradeDetails?.attribute_id };
                const { data } = await apiWeaponUpgrade(obj);
                console.log("weapon upgrade data", data);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    // async function fetchWeaponUpgrade() {
    //     try {
    //         const obj = { attribute_id: nftUpgradeDetails?.attribute_id }
    //         const { data } = await apiWeaponUpgrade(obj);
    //         console.log("datat from weapon upgrade", data);
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }

    const handleCurrencySelect = () => {
        setSelectedCurrency(selectedCurrencyType ? false : true);
    }
    const handleCurrencyType = (selectedCurrency) => {
        setError("");
        dispatch(setCurrencyType(selectedCurrency));
        setSelectedCurrency(false);
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
                    <h4>Checkout for upgrade</h4>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
                    <div className="checkout-price-details mt-4">
                        <div className="checkout-box-wrap">
                            <img src={nftUpgradeDetails?.image} alt="mystery-boxes" />
                            <div className="sell-nft-name">
                                <h3>{nftUpgradeDetails?.name}</h3>
                                <span className="second-col">Quantity : 1</span>
                            </div>
                        </div>
                        <div className="sell-nft-details">
                            <span>Price</span>
                            <h3>{nftUpgradeDetails?.upgradePrice} {currency.toUpperCase()}</h3>
                            <span>$0.41 USD</span>
                        </div>
                    </div>
                    <ul className="checkout-all-details">
                        {/* <li>
                            <span>Total</span>
                            <span>0.001 BUSD</span>
                        </li>
                        <li>
                            <span></span>
                            <span>$0.41 USD</span>
                        </li> */}
                        <li>
                            <span className="text-left">TOTAL <p className="mb-0">please choose your<br></br> desired currency</p></span>
                            <div className="mystery-box-select">
                                <span onClick={handleCurrencySelect}>{nftUpgradeDetails?.upgradePrice} {currency.toUpperCase()}</span>
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
            <div className="modal-footer modal-footer1">
                <button type="button" disabled={confirmDisable} onClick={handleCheckout} className={`btn btn-primary ${confirmDisable ? "checking" : ""}`} data-dismiss="modal" data-toggle="modal" data-target="#upgrade-completed">Confirm</button>
            </div>
        </Modal>
    );
}