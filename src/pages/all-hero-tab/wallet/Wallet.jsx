import React from "react";
import { Tab, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store";
import { ModalType } from "../../../core";
import { useSelector } from "react-redux";
import MOH from"../../../abi/MOH.json" ;
import { useState } from "react";
export default function Wallet() {
    const mohAddress = "0xd4c78c39FBB0C1E8c7f9e5598057F755755198D5";

    
    const walletBalance = useSelector((state) => state.auth.user.walletBalance);
   
    
    
    const dispatch = useDispatch();

    const handleDeposit = () => {
        dispatch(openModal(ModalType.DepositModal));
    }

    const handleVrhDeposit = () => {
        dispatch(openModal(ModalType.DepositVrhModal));
    }

    const handleClaim = () => {
        dispatch(openModal(ModalType.CoinClaimedModal));
    }
    return (
        <Tab.Pane eventKey="Wallet">
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-6 col-6 full-width-480">
                    <div className="wallet-box-wrap">
                        <div>
                            <span>Other Currency</span>
                            <h3>0.02</h3>
                            <span>BUSD</span>
                            <h3>{walletBalance && walletBalance.usdt ? walletBalance.usdt : '0.0'}</h3>
                            <span>USDT</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 col-6 full-width-480">
                    <div className="wallet-box-wrap">
                        <div className="wallet-box-wrap1">
                            <div>
                                <span>Other Currency</span>
                                <h3>0.02</h3>
                                <span>VRH</span>
                            </div>
                            <img src={require("../../../assets/images/icon/wallet-icon.png")} alt="wallet icon" />
                        </div>
                        <button type="button" onClick={handleVrhDeposit} data-dismiss="modal" data-toggle="modal" data-target="#deposit-modal" className="btn btn-primary mt-4">Deposit</button>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 col-6 full-width-480">
                    <div className="wallet-box-wrap">
                        <div className="wallet-box-wrap1">
                            <div>
                                <span>Other Currency</span>
                                <h3>{walletBalance && walletBalance.moh ? walletBalance.moh : '0.0'}</h3>
                                <span>MOH</span>
                                
                            </div>
                            <img src={require("../../../assets/images/icon/wallet-icon1.png")} alt="wallet icon1" />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" onClick={handleDeposit} className="btn btn-primary mt-4 ">Deposit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5 mb-5">
                <div className="col-md-12 mb-3">
                    <h2 className="blue-color">In Game Currency</h2>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 col-6 full-width-480">
                    <div className="wallet-box-wrap">
                        <div className="wallet-box-wrap1">
                            <div>
                                <span>gVRH Token</span>
                                <h3>0.02</h3>
                                <span>$40 USD</span>
                            </div>
                            <img src={require("../../../assets/images/icon/wallet-icon.png")} alt="wallet icon" />
                        </div>
                        <button type="button" onClick={handleClaim} data-dismiss="modal" data-toggle="modal" data-target="#coin-claimed-modal" className="btn btn-primary mt-4">Claim</button>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 col-6 full-width-480">
                    <div className="wallet-box-wrap">
                        <div className="wallet-box-wrap1">
                            <div>
                                <span>gMOH Token</span>
                                <h3>0.02</h3>
                                <span>$40 USD</span>
                            </div>
                            <img src={require("../../../assets/images/icon/wallet-icon1.png")} alt="wallet icon1" />
                        </div>
                        <button type="button" onClick={handleClaim} data-dismiss="modal" data-toggle="modal" data-target="#coin-claimed-modal" className="btn btn-primary mt-4">Claim</button>
                    </div>
                </div>
            </div>
        </Tab.Pane>
    )
}