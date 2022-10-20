import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalType, checkWalletConnectionStatus, checkEthNetwork } from "../../core";
import { openModal, setCurrencyType, setUserNftBuyData } from "../../store";
import { Tab, Nav, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Moment from 'react-moment';
import { apiUserWeaponDetails, apiNftTransactionHistory } from "../../api";

import Epic from "../../assets/images/icon/epic.svg";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyImg from "../../assets/images/copy.svg";
import Styled from "styled-components"

export default function WeaponDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [spinner, setSpinner] = useState(false);
    const [copy, setCopy] = useState(false);
    const [transactionDetails, setTransactionDetails] = useState([]);
    const [weaponDetails, setWeaponDetails] = useState(null);
    const [selectedCurrencyType, setSelectedCurrency] = useState(false);
    const currency = (useSelector((state) => state.MysteryBoxes.currency.selectedCurrency));
    const walletAddress = useSelector((state) => state.auth.user.walletAddress);
    const userRegistered = useSelector((state) => state.auth.user.walletConnectStatus);

    const handleBuy = async () => {
        const walletConnectionStatus = await checkWalletConnectionStatus();
        if (window.ethereum && window.ethereum !== "undefined" && window.ethereum.networkVersion === '97' && walletConnectionStatus && userRegistered) {
            dispatch(openModal(ModalType.NftCheckoutModal));
        }
        else if (checkEthNetwork() && window.ethereum && window.ethereum !== "undefined") {
            dispatch(openModal(ModalType.SwitchNetworkModal));
        }
        else if (walletConnectionStatus !== "" && walletConnectionStatus === false && window.ethereum && window.ethereum !== "undefined") {
            dispatch(openModal(ModalType.WalletConnectModal));
        }
        else if (!userRegistered && window.ethereum && window.ethereum !== "undefined") {
            dispatch(openModal(ModalType.LoginRegisterModal));
        }
        else {
            dispatch(openModal(ModalType.DownloadMetaMask));
        }
    }

    useEffect(() => {
        setSpinner(true);
        fetchUserWeaponDetails()
    }, []);

    async function fetchUserWeaponDetails() {
        try {
            const res = await apiUserWeaponDetails(id);
            const data = res.data.data[0];
            const NftBuyDetails = {
                name: data.weaponData.name, price: data.nft.price, image: data.weaponData.weapon_image,
                quantity: data.nft.quantity, marketitemId: data.nft.marketitemId, owner_address: data.nft.owner_address,
                token_count: data.nft.token_count
            }
            setWeaponDetails(data);
            dispatch(setUserNftBuyData(NftBuyDetails));
            console.log("apiu res", data)
            fetchTransactionHistory(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function fetchTransactionHistory(weaponData) {
        try {
            const obj = { attribute_id: weaponData?.weapon_attribute_id }
            const { data } = await apiNftTransactionHistory(weaponData?.nft?.token_count, obj);
            console.log('transction data', data)
            setTransactionDetails(data);
            setSpinner(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleCurrencyType = (selectedCurrency) => {
        dispatch(setCurrencyType(selectedCurrency));
        setSelectedCurrency(false);
    }
    const handleCurrencySelect = () => {
        setSelectedCurrency(selectedCurrencyType ? false : true);
    }

    return (
        <Wrapper className="container">
            {spinner ? <div className="spinnerWrapper">
                <Spinner className="text-white" animation="border" role="status">
                    {/* <span className="visually-hidden">Loading...</span> */}
                </Spinner>
            </div> : ""}
            {!spinner &&
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h2 className="blue-color">WEAPON DETAILS</h2>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-12">
                            <div className="common-box-wrapper mb-5">
                                <div className="row">
                                    <div className="col-lg-8 col-md-12">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="available-details-head">
                                                    <h2>{weaponDetails?.weaponData?.name}</h2>
                                                    <p>Owner: <span>
                                                        {`${weaponDetails?.nft?.owner_address.substring(
                                                            0,
                                                            9
                                                        )}...${weaponDetails?.nft?.owner_address.substring(
                                                            weaponDetails?.nft?.owner_address.length - 9
                                                        )}`} <CopyToClipboard text={weaponDetails?.nft?.owner_address}
                                                            onCopy={() => setCopy(true)}>
                                                            <img src={CopyImg} style={{ width: "20px", height: 20, marginLeft: "-1px", cursor: "pointer" }} alt="copyimg" />
                                                        </CopyToClipboard>
                                                    </span></p>
                                                </div>
                                            </div>
                                            <div className="col-md-7">
                                                <ul className="avatars-details-list">
                                                    <li>
                                                        <div className="hero-level-container" >
                                                            <div className="hero-level-data-container">
                                                                <div className="hero-level-heading">{weaponDetails?.weaponData?.level}</div>
                                                                <div className="hero-level-footer">LEVEL</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="hero-level-container" >
                                                            <div className="hero-level-data-container">
                                                                <div className="hero-level-heading">{weaponDetails?.weapon_rarity_data?.name}</div>
                                                                <div className="hero-level-footer">AVATAR RARITY</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="common-box-inner mb-4">
                                            <div className="avatar-details-tab">
                                                <Tab.Container defaultActiveKey="BATTLE">
                                                    <Nav>
                                                        <button>
                                                            <Nav.Link eventKey="BATTLE">BATTLE</Nav.Link>
                                                        </button>
                                                        <button>
                                                            <Nav.Link eventKey="STATS">STATS</Nav.Link>
                                                        </button>
                                                        <button>
                                                            <Nav.Link eventKey="NFT TRANSACTION">NFT TRANSACTION</Nav.Link>
                                                        </button>
                                                    </Nav>
                                                    <Tab.Content>
                                                        <Tab.Pane eventKey="BATTLE">
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <div className="common-box-head">
                                                                        <span>gMOH Battles</span>
                                                                    </div>
                                                                    <div className="common-box-list">
                                                                        <h4>{weaponDetails?.weaponData?.total_battle_count}/Max</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="common-box-head">
                                                                        <span>Daily gMOH Battles</span>
                                                                    </div>
                                                                    <div className="common-box-list">
                                                                        <h4>{weaponDetails?.weaponData?.daily_battle_count}</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="common-box-head">
                                                                        <span>Bonus</span>
                                                                    </div>
                                                                    <div className="common-box-list">
                                                                        <h4>{weaponDetails?.win_bonus_data?.amount}</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="common-box-head">
                                                                        <span>Winning Counts</span>
                                                                    </div>
                                                                    <div className="common-box-list">
                                                                        <h4>{weaponDetails?.weaponData?.winning_counts}</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12 background-story-wrap">
                                                                    <p>{weaponDetails?.weaponData?.description}</p>
                                                                </div>
                                                            </div>
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="STATS">
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <div className="common-box-head">
                                                                        <span>Attack Power</span>
                                                                    </div>
                                                                    <div className="common-box-list">
                                                                        <h4>{weaponDetails?.weaponData?.attack_power}</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="common-box-head">
                                                                        <span>Attack Speed</span>
                                                                    </div>
                                                                    <div className="common-box-list">
                                                                        <h4>{weaponDetails?.weaponData?.attack_speed}</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="common-box-head">
                                                                        <span>Moving Speed</span>
                                                                    </div>
                                                                    <div className="common-box-list">
                                                                        <h4>{weaponDetails?.weaponData?.moving_speed}</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="common-box-head">
                                                                        <span>Skill Cooldown</span>
                                                                    </div>
                                                                    <div className="common-box-list">
                                                                        <h4>{weaponDetails?.weaponData?.skill_cooldown}</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12 background-story-wrap">                                                        </div>
                                                                <p>{weaponDetails?.weaponData?.description}</p>
                                                            </div>
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="NFT TRANSACTION">
                                                            <div className="table-responsive">
                                                                <table className="table avtart-table-wrap">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Price</th>
                                                                            <th>USD</th>
                                                                            <th>Date</th>
                                                                            <th>FROM</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {transactionDetails &&
                                                                            transactionDetails.map((item, index) =>
                                                                                <tr key={index}>
                                                                                    <td>VRH {item?.nftowner?.price}</td>
                                                                                    <td>$0.41</td>
                                                                                    <td>
                                                                                        <Moment format="DD-MMMM-YYYY">
                                                                                            {(item?.createdAt)}
                                                                                        </Moment>
                                                                                    </td>
                                                                                    <td>
                                                                                        {`${item?.userData?.wallet_address.substring(
                                                                                            0,
                                                                                            9
                                                                                        )}...${item?.userData?.wallet_address.substring(
                                                                                            item?.userData?.wallet_address.length - 9
                                                                                        )}`} <CopyToClipboard text={item?.userData?.wallet_address}
                                                                                            onCopy={() => setCopy(true)}>
                                                                                            <img src={CopyImg} style={{ width: "20px", height: 20, marginLeft: "-1px", cursor: "pointer" }} alt="copyimg" />
                                                                                        </CopyToClipboard>
                                                                                    </td>
                                                                                </tr>
                                                                            )}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </Tab.Pane>
                                                    </Tab.Content>
                                                </Tab.Container>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-8">
                                        <div className="text-center">
                                            <img src={weaponDetails?.weaponData?.weapon_image} alt="mystery boxes2" className="mystery-box-img" />
                                            {weaponDetails?.nft?.owner_address !== walletAddress ?
                                                <div>
                                                    <div className="box-price-details">
                                                        <div className="dropdown selectCurrency m-0">
                                                            <p>{weaponDetails?.nft?.price}</p>&nbsp;
                                                            <span className="dropdown-toggle selectCurrency-head" data-bs-toggle="dropdown" onClick={handleCurrencySelect}>
                                                                {currency.toUpperCase()}
                                                            </span>
                                                            <span className='box-comn-size'>( $43.21 USD )</span>
                                                        </div>
                                                        <ul className={`dropdown-menu selectCurrency-menu ${selectedCurrencyType ? "dropdown-menu-show" : ""}`}>
                                                            <li onClick={(() => handleCurrencyType("usdt"))}>USDT</li>
                                                            <li onClick={(() => handleCurrencyType("busd"))}>BUSD</li>
                                                        </ul>
                                                    </div>
                                                    <button onClick={handleBuy} data-dismiss="modal" data-toggle="modal" data-target="#checkout-modal" className="btn-style2 buy-now-btn">
                                                        <img src={require("../../assets/images/icon/btn-style2.png")} alt="btn style2" />
                                                        <span>BUY NOW</span>
                                                    </button>
                                                </div> : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

        </Wrapper>
    );
}

const Wrapper = Styled.div`
            ul.avatars-details-list {

                justify - content: flex-end;
}
            .hero-level-container{
                min - width: 78px;

            padding: 5px 13px;
            height: 60px;
            background-color: #54EAEF;
            border-radius: 10px;
            background-repeat: no-repeat;
            background-size: contain;

            z-index: 10;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
    }
            .hero-level-data-container{
                text - align:center;
      
    }
            .hero-level-heading{
                font - weight:bold;
            font-size:20px;
            line-height:28px;
            text-align: center;
    }
            .hero-level-footer{
                font - size:12px;
            font-weight:700;
            text-transform:uppercase;

    }

            `