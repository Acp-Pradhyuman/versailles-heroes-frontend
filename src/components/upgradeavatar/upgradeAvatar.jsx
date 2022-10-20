import React, { useEffect, useState } from "react";
import Epic from "../../assets/images/icon/epic.svg";
import { useDispatch, useSelector } from "react-redux";
import { openModal, setCurrencyType, setUserNftUpgradeDetails } from "../../store";
import { ModalType, checkWalletConnectionStatus, checkEthNetwork, NftName } from "../../core";
import { getHeroDetails, apiUserWeaponDetails, apiUpgradeDetails } from "../../api";
import { useParams } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyImg from "../../assets/images/copy.svg";
import Styled from "styled-components";
import { Spinner } from "react-bootstrap";

export default function UpgardeAvatar() {
    const dispatch = useDispatch();
    const { id, name } = useParams();

    const [copy, setCopy] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [heroDetails, setHeroDetails] = useState(null);
    const [weaponDetails, setWeaponsDetails] = useState(null);
    const [selectedCurrencyType, setSelectedCurrency] = useState(false);
    const [upgradePercent, setupgradePercent] = useState(null);

    const currency = (useSelector((state) => state.MysteryBoxes.currency.selectedCurrency));
    const userRegistered = useSelector((state) => state.auth.user.walletConnectStatus);

    const handleUpgrade = async () => {
        const walletConnectionStatus = await checkWalletConnectionStatus();
        if (window.ethereum && window.ethereum !== "undefined" && window.ethereum.networkVersion === '97' && walletConnectionStatus && userRegistered) {
            dispatch(openModal(ModalType.UpgardePromptModal));
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
        if (name === NftName.Hero) {
            fetchHeroDetails();
        }
        else {
            fetchUserWeaponDetails();
        }
    }, []);

    async function fetchHeroDetails() {
        try {
            const { data } = await getHeroDetails(id);
            const res = data.data[0]
            setHeroDetails(res);
            const nftUpgradeDetails = {
                name: res?.heroData?.name, upgradePrice: res?.hero_rarity_data?.upgrade_price,
                image: res?.heroData?.compressed_image, attribute_id: res?.attribute_id, nftName: NftName.Hero
            }
            dispatch(setUserNftUpgradeDetails(nftUpgradeDetails));

            // calling UpgardeDetails Api
            fetchUpgradeDetails(res?.hero_rarity_data?.name);
            setSpinner(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    async function fetchUserWeaponDetails() {
        try {
            const { data } = await apiUserWeaponDetails(id);
            const res = data.data[0];
            setWeaponsDetails(res);
            const nftUpgradeDetails = {
                name: res?.weaponData?.name, upgradePrice: res?.weapon_rarity_data?.upgrade_price,
                image: res?.weaponData?.weapon_image, attribute_id: res?.weapon_attribute_id, nftName: NftName.Weapon
            }
            dispatch(setUserNftUpgradeDetails(nftUpgradeDetails));

            // calling UpgardeDetails Api
            fetchUpgradeDetails(res?.weapon_rarity_data?.name);
            setSpinner(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    async function fetchUpgradeDetails(boxRarityName) {
        try {
            const { data } = await apiUpgradeDetails();
            const res = data.upgrade;
            const upgradePercentDetails = res.filter((item) => item.name === boxRarityName)
            setupgradePercent(upgradePercentDetails[0]);

            console.log("data of upgrade details", upgradePercentDetails[0]);
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
                            <h2 className="blue-color">{name === NftName.Hero ? "UPGRADE AVATAR" : "UPGRADE WEAPON"}</h2>
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
                                                    <h2>{name === NftName.Hero ? heroDetails?.heroData?.name : weaponDetails?.weaponData?.name}</h2>
                                                    <p>Owner: {name === NftName.Hero ?
                                                        <span>
                                                            {`${heroDetails?.nft?.owner_address.substring(
                                                                0,
                                                                9
                                                            )}...${heroDetails?.nft?.owner_address.substring(
                                                                heroDetails?.nft?.owner_address.length - 9
                                                            )}`} <CopyToClipboard text={heroDetails?.nft?.owner_address}
                                                                onCopy={() => setCopy(true)}>
                                                                <img src={CopyImg} style={{ width: "20px", height: 20, marginLeft: "-1px", cursor: "pointer" }} alt="copyimg" />
                                                            </CopyToClipboard>
                                                        </span> : <span>
                                                            {`${weaponDetails?.nft?.owner_address.substring(
                                                                0,
                                                                9
                                                            )}...${weaponDetails?.nft?.owner_address.substring(
                                                                weaponDetails?.nft?.owner_address.length - 9
                                                            )}`} <CopyToClipboard text={weaponDetails?.nft?.owner_address}
                                                                onCopy={() => setCopy(true)}>
                                                                <img src={CopyImg} style={{ width: "20px", height: 20, marginLeft: "-1px", cursor: "pointer" }} alt="copyimg" />
                                                            </CopyToClipboard>
                                                        </span>}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-7">
                                                <ul className="avatars-details-list">
                                                    {name === NftName.Hero ? <li>
                                                        <img src={require("../../assets/images/icon/trophy.png")} alt="trophy" />
                                                    </li> : ""}
                                                    <li>
                                                        <div className="hero-level-container" >
                                                            <div className="hero-level-data-container">
                                                                <div className="hero-level-heading">{name === NftName.Hero ? heroDetails?.heroData?.level : weaponDetails?.weaponData?.level}</div>
                                                                <div className="hero-level-footer">LEVEL</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {name === NftName.Hero ? <li>
                                                        <img src={require("../../assets/images/icon/heros-icon.png")} alt="heros icon" />
                                                    </li> : ""}
                                                    <li>
                                                        <div className="hero-level-container" >
                                                            <div className="hero-level-data-container">
                                                                <div className="hero-level-heading">{name === NftName.Hero ? heroDetails?.hero_rarity_data?.name : weaponDetails?.weapon_rarity_data?.name}</div>
                                                                <div className="hero-level-footer">AVATAR RARITY</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="common-box-inner mb-4">
                                            <div className="avatar-details-tab">
                                                <div className="tab-content" id="myTabContent">
                                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                        {name === NftName.Hero
                                                            ?
                                                            <div className="row">
                                                                <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                                    <div className="common-box-head">
                                                                        <span>Health</span>
                                                                    </div>
                                                                    <div className="common-box-list">
                                                                        <h4>{heroDetails?.heroData?.health} <span>(+{parseFloat((Number(upgradePercent?.attribute_percentage) / 100) * heroDetails?.heroData?.health).toFixed(2)})</span></h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                                    <div className="common-box-head">
                                                                        <span>Level</span>
                                                                    </div>
                                                                    <div className="common-box-list">
                                                                        <h4>{heroDetails?.heroData?.level} <span>(+1)</span></h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                                    <div className="common-box-head">
                                                                        <span>Damage</span>
                                                                    </div>
                                                                    <div className="common-box-list">
                                                                        <h4>{heroDetails?.heroData?.damage} <span>(+{parseFloat((Number(upgradePercent?.attribute_percentage) / 100) * heroDetails?.heroData?.damage).toFixed(2)})</span></h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                                    <div className="common-box-head">
                                                                        <span>Attack Speed</span>
                                                                    </div>
                                                                    <div className="common-box-list">
                                                                        <h4>{heroDetails?.heroData?.attack_speed} <span>(+{parseFloat((Number(upgradePercent?.attribute_percentage) / 100) * heroDetails?.heroData?.attack_speed).toFixed(2)})</span></h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                                    <div className="common-box-head">
                                                                        <span>gMOH Battle</span>
                                                                    </div>
                                                                    <div className="common-box-list">
                                                                        <h4>0/{heroDetails?.battle_count_data?.total_battle_count}</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12 background-story-wrap">
                                                                    <p>{heroDetails?.heroData?.description}</p>
                                                                </div>
                                                            </div>
                                                            :
                                                            <div className="row">
                                                                <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                                    <div className="common-box-head">
                                                                        <span>Attack Power</span>
                                                                    </div>
                                                                    <div className="common-box-list">
                                                                        <h4>{weaponDetails?.weaponData?.attack_power} <span>(+{parseFloat((Number(upgradePercent?.weapon_attribute_percentage) / 100) * weaponDetails?.weaponData?.attack_power).toFixed(2)})</span></h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                                    <div className="common-box-head">
                                                                        <span>Attack Speed</span>
                                                                    </div>
                                                                    <div className="common-box-list">
                                                                        <h4>{weaponDetails?.weaponData?.attack_speed} <span>(+{parseFloat((Number(upgradePercent?.weapon_attribute_percentage) / 100) * weaponDetails?.weaponData?.attack_speed).toFixed(2)})</span></h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                                    <div className="common-box-head">
                                                                        <span>Move Speed</span>
                                                                    </div>
                                                                    <div className="common-box-list">
                                                                        <h4>{weaponDetails?.weaponData?.moving_speed} <span>(+{parseFloat((Number(upgradePercent?.weapon_attribute_percentage) / 100) * weaponDetails?.weaponData?.moving_speed).toFixed(2)})</span></h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12 background-story-wrap">
                                                                    <p>{weaponDetails?.weaponData?.description}</p>
                                                                </div>
                                                            </div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                                        <div className="text-center">
                                            <img src={name === NftName.Hero ? heroDetails?.heroData?.asset_image : weaponDetails?.weaponData?.weapon_image} style={{ width: '100%' }} alt="hero" />
                                            <div className="box-price-details">
                                                <div className="dropdown selectCurrency m-0">
                                                    <p>{name === NftName.Hero ? heroDetails?.hero_rarity_data?.upgrade_price : weaponDetails?.weapon_rarity_data?.upgrade_price}</p>&nbsp;
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
                                            <button onClick={handleUpgrade} data-dismiss="modal" data-toggle="modal" data-target="#upgrade-prompt-modal" className="btn-style2 buy-now-btn">
                                                <img src={require("../../assets/images/icon/btn-style2.png")} alt="btn style" />
                                                <span>UPGRADE</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </Wrapper>
    );
}

const Wrapper = Styled.div`
ul.avatars-details-list {
    
    justify-content: flex-end;
}
    .hero-level-container{
        min-width: 78px;
     
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
        text-align:center;
      
    }
    .hero-level-heading{
        font-weight:bold;
        font-size:20px;
        line-height:28px;
        text-align: center;
    }
    .hero-level-footer{
        font-size:12px;
        font-weight:700;
        text-transform:uppercase;

    }
   
`