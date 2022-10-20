import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, setCurrencyType, setBoxQuantity, setBoxData } from '../../store';
import { ModalType } from '../../core';
import { useParams, useHistory } from "react-router-dom";
import Minus from '../../assets/images/icon/minus.svg';
import Plus from '../../assets/images/icon/plus.svg';
import { apiMysteryBoxDetails } from '../../api';
import { checkWalletConnectionStatus, checkEthNetwork } from "../../core";

export default function MysteryBoxes() {
    const { id } = useParams();
    const history = useHistory();
    const { push } = history;
    const [boxDetails, setBoxDetails] = useState({});
    const [showWeaponDiv, setshowWeaponDiv] = useState(false);
    const [selectedCurrencyType, setSelectedCurrency] = useState(false);
    const boxCount = useSelector((state) => state.MysteryBoxes.boxQuantity.boxCount);

    // user images add here

    const [imageContainer, setImageContainer] = useState([
        "user1.jpg", "user2.jpg", "user3.jpg", "user4.jpg", "user5.jpg", "user6.jpg", "user7.jpg", "user8.jpg", "user9.jpg", "user10.jpg", "user11.jpg", "user12.jpg", "user13.jpg",
        "user14.jpg", "user15.jpg", "user16.jpg", "user17.jpg", "user18.jpg",

    ])

    const dispatch = useDispatch();
    const currency = (useSelector((state) => state.MysteryBoxes.currency.selectedCurrency));
    const userRegistered = useSelector((state) => state.auth.user.walletConnectStatus);

    const handleBuy = async () => {
        const walletConnectionStatus = await checkWalletConnectionStatus();
        if (window.ethereum && window.ethereum !== "undefined" && window.ethereum.networkVersion === '97' && walletConnectionStatus && userRegistered) {
            dispatch(openModal(ModalType.CheckoutModal));
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
        dispatch(setBoxQuantity(1));
    }, [])

    useEffect(() => {
        async function fetchMysteryBoxDetails() {
            try {
                const { data } = await apiMysteryBoxDetails(id);
                setBoxDetails(data);
                const boxData = { _id: data._id, box_type: data.box_type, price: data.price, boxName: data.name, boxImage: data.image }
                console.log("boxdata", boxData);
                dispatch(setBoxData(boxData));
                if (data && data.name === "Weapon Box") {
                    setshowWeaponDiv(true);
                }
            } catch (error) {
                push("/");
            }

        }
        fetchMysteryBoxDetails();
    }, [push, id]);

    const handleCountPlus = () => {
        dispatch(setBoxQuantity(boxCount + 1));
    }

    const handleCountMinus = () => {
        if (boxCount === 1) return
        dispatch(setBoxQuantity(boxCount - 1));
    }

    const handleCurrencySelect = () => {
        setSelectedCurrency(selectedCurrencyType ? false : true);
    }

    const handleCurrencyType = (selectedCurrency) => {
        dispatch(setCurrencyType(selectedCurrency));
        setSelectedCurrency(false);
    }

    const WeaponDiv = () =>
        <div className="common-box-inner mb-4">
            <div className="row">
                <div className="col-md-12 text-center mb-3">
                    <h3>BOX AVATAR PERCENTAGE DETAILS</h3>
                </div>
                <div className="col-md-4 col-sm-6 col-6">
                    <div className="common-box-head common-box-yellow">
                        <span>Rare Avatars</span>
                    </div>
                    <div className="common-box-list">
                        <h4>{boxDetails && boxDetails.drop_rates && boxDetails.drop_rates.rare_avatars ? boxDetails.drop_rates.rare_avatars : 0}%</h4>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-6">
                    <div className="common-box-head common-box-red">
                        <span>Epic Avatars</span>
                    </div>
                    <div className="common-box-list">
                        <h4>{boxDetails && boxDetails.drop_rates && boxDetails.drop_rates.epic_avatars ? boxDetails.drop_rates.epic_avatars : 0}%</h4>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-6">
                    <div className="common-box-head common-box-blue">
                        <span>Legendary Avatars</span>
                    </div>
                    <div className="common-box-list">
                        <h4>{boxDetails && boxDetails.drop_rates && boxDetails.drop_rates.legendary_avatars ? boxDetails.drop_rates.legendary_avatars : 0}%</h4>
                    </div>
                </div>
            </div>
        </div>

    const MysteryBoxDiv = () =>
        <div className="common-box-inner mb-4">
            <div className="row">
                <div className="col-md-12 text-center mb-3">
                    <h3>BOX AVATAR PERCENTAGE DETAILS</h3>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                    <div className="common-box-head common-box-yellow">
                        <span>Common Avatars</span>
                    </div>
                    <div className="common-box-list">
                        <ul>
                            <li>
                                <span>Normal skin</span>
                                <span>{boxDetails && boxDetails.drop_rates && boxDetails.drop_rates.common_avatars && boxDetails.drop_rates.common_avatars.normal_skin ? boxDetails.drop_rates.common_avatars.normal_skin : 0}%</span>
                            </li>
                            <li>
                                <span>Rare skin</span>
                                <span>{boxDetails && boxDetails.drop_rates && boxDetails.drop_rates.common_avatars && boxDetails.drop_rates.common_avatars.rate_skin ? boxDetails.drop_rates.common_avatars.rate_skin : 0}%</span>
                            </li>
                            <li>
                                <span>Mythic skin</span>
                                <span>{boxDetails && boxDetails.drop_rates && boxDetails.drop_rates.common_avatars && boxDetails.drop_rates.common_avatars.mythic_skin ? boxDetails.drop_rates.common_avatars.mythic_skin : 0}%</span>
                            </li>
                            <li>
                                <span>Legendary skin</span>
                                <span>{boxDetails && boxDetails.drop_rates && boxDetails.drop_rates.common_avatars && boxDetails.drop_rates.common_avatars.legendary_skin ? boxDetails.drop_rates.common_avatars.legendary_skin : 0}%</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                    <div className="common-box-head">
                        <span>Rare Avatars</span>
                    </div>
                    <div className="common-box-list">
                        <ul>
                            <li>
                                <span>Normal skin</span>
                                <span>{boxDetails && boxDetails.drop_rates && boxDetails.drop_rates.rare_avatars && boxDetails.drop_rates.rare_avatars.normal_skin ? boxDetails.drop_rates.rare_avatars.normal_skin : 0}%</span>
                            </li>
                            <li>
                                <span>Rare skin</span>
                                <span>{boxDetails && boxDetails.drop_rates && boxDetails.drop_rates.rare_avatars && boxDetails.drop_rates.rare_avatars.rate_skin ? boxDetails.drop_rates.rare_avatars.rate_skin : 0}%</span>
                            </li>
                            <li>
                                <span>Mythic skin</span>
                                <span>{boxDetails && boxDetails.drop_rates && boxDetails.drop_rates.rare_avatars && boxDetails.drop_rates.rare_avatars.mythic_skin ? boxDetails.drop_rates.rare_avatars.mythic_skin : 0}%</span>
                            </li>
                            <li>
                                <span>Legendary skin</span>
                                <span>{boxDetails && boxDetails.drop_rates && boxDetails.drop_rates.rare_avatars && boxDetails.drop_rates.rare_avatars.legendary_skin ? boxDetails.drop_rates.rare_avatars.legendary_skin : 0}%</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                    <div className="common-box-head common-box-red">
                        <span>Epic Avatars</span>
                    </div>
                    <div className="common-box-list">
                        <ul>
                            <li>
                                <span>Normal skin</span>
                                <span>{boxDetails && boxDetails.drop_rates && boxDetails.drop_rates.epic_avatars && boxDetails.drop_rates.epic_avatars.normal_skin ? boxDetails.drop_rates.epic_avatars.normal_skin : 0}%</span>
                            </li>
                            <li>
                                <span>Rare skin</span>
                                <span>{boxDetails && boxDetails.drop_rates && boxDetails.drop_rates.epic_avatars && boxDetails.drop_rates.epic_avatars.rate_skin ? boxDetails.drop_rates.epic_avatars.rate_skin : 0}%</span>
                            </li>
                            <li>
                                <span>Mythic skin</span>
                                <span>{boxDetails && boxDetails.drop_rates && boxDetails.drop_rates.epic_avatars && boxDetails.drop_rates.epic_avatars.mythic_skin ? boxDetails.drop_rates.epic_avatars.mythic_skin : 0}%</span>
                            </li>
                            <li>
                                <span>Legendary skin</span>
                                <span>{boxDetails && boxDetails.drop_rates && boxDetails.drop_rates.epic_avatars && boxDetails.drop_rates.epic_avatars.legendary_skin ? boxDetails.drop_rates.epic_avatars.legendary_skin : 0}%</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                    <div className="common-box-head common-box-blue">
                        <span>Legendary Avatars</span>
                    </div>
                    <div className="common-box-list">
                        <ul>
                            <li>
                                <span>Normal skin</span>
                                <span>{boxDetails && boxDetails.drop_rates && boxDetails.drop_rates.legendary_avatars && boxDetails.drop_rates.legendary_avatars.normal_skin ? boxDetails.drop_rates.legendary_avatars.normal_skin : 0}%</span>
                            </li>
                            <li>
                                <span>Rare skin</span>
                                <span>{boxDetails && boxDetails.drop_rates && boxDetails.drop_rates.legendary_avatars && boxDetails.drop_rates.legendary_avatars.rate_skin ? boxDetails.drop_rates.legendary_avatars.rate_skin : 0}%</span>
                            </li>
                            <li>
                                <span>Mythic skin</span>
                                <span>{boxDetails && boxDetails.drop_rates && boxDetails.drop_rates.legendary_avatars && boxDetails.drop_rates.legendary_avatars.mythic_skin ? boxDetails.drop_rates.legendary_avatars.mythic_skin : 0}%</span>
                            </li>
                            <li>
                                <span>Legendary skin</span>
                                <span>{boxDetails && boxDetails.drop_rates && boxDetails.drop_rates.legendary_avatars && boxDetails.drop_rates.legendary_avatars.legendary_skin ? boxDetails.drop_rates.legendary_avatars.legendary_skin : 0}%</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    const { name, price, image } = boxDetails;
    return (
        <>
            <div className="container-fluid body-bg-background">
                <img src={require("../../assets/images/body-bg-2.png")} alt="body-bg-2" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h2 className="blue-color">{name}</h2>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className="common-box-wrapper mb-5">
                            <div className="row">
                                <div className="col-lg-8 col-md-12">
                                    {showWeaponDiv && showWeaponDiv === true ? <WeaponDiv /> : <MysteryBoxDiv />}
                                    <div className="common-box-inner">
                                        <div className="row">
                                            <div className="col-md-12 text-center mb-3">
                                                <h3>Available Heroes: 18</h3>
                                            </div>
                                        </div>
                                        <div className="available-hero-wrap row">
                                            {
                                                imageContainer.map((data, index) => <img src={require(`../../assets/images/user${index + 1}.jpg`)} alt="available hero" key={index} />)
                                            }
                                            {/* <img src={require("../../assets/images/available-hero.png")} alt="available hero" />
                                            <img src={require("../../assets/images/available-hero.png")} alt="available hero" /> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-8">
                                    <div className="text-center mt-lg-0 mt-sm-3 mt-3">
                                        <div className="product-select-box">
                                            <button onClick={handleCountMinus}>
                                                <img src={Minus} alt="minus" />
                                            </button>
                                            {boxCount}
                                            <button onClick={handleCountPlus}>
                                                <img src={Plus} alt="plus" />
                                            </button>
                                        </div>
                                        <img src={image} alt="common box" className="animate-vertical" />
                                        <div className="box-price-details">
                                            <div className="dropdown selectCurrency m-0">
                                                <p>{price * boxCount} </p>&nbsp;
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

