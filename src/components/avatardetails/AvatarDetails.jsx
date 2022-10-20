import React, { useEffect, useState } from "react";
import { openModal, setCurrencyType, setUserNftBuyData } from "../../store";
import { ModalType, checkWalletConnectionStatus, checkEthNetwork } from "../../core";
import { useDispatch, useSelector } from "react-redux";
import Epic from "../../assets/images/icon/epic.svg";
import { Tab, Nav } from "react-bootstrap";
import { useParams } from "react-router-dom"
import Loader from "../Loader"
import Axios from "../../core/api-caller"
import Styled from "styled-components"
import heroTopThumbnail from "../../assets/images/icon/hero-top-thumbnail.png"
import { apiNftTransactionHistory, apiGetBattleReward } from "../../api";
import Moment from 'react-moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyImg from "../../assets/images/copy.svg";

export default function AvatarDetails() {
    const dispatch = useDispatch();
    const [heroDetails, setHeroDetails] = useState(null);
    const [transactionDetails, setTransactionDetails] = useState();
    const [battleRewardDetails, setBattleRewardDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCurrencyType, setSelectedCurrency] = useState(false);
    const [copy, setCopy] = useState(false);
    const currency = (useSelector((state) => state.MysteryBoxes.currency.selectedCurrency));
    const userRegistered = useSelector((state) => state.auth.user.walletConnectStatus);
    const walletAddress = useSelector((state) => state.auth.user.walletAddress);
    const { id } = useParams();


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
        const fetchHeroDetails = async () => {
            try {
                const response = await Axios.get(`/hero/heroDetails?_id=${id}`)
                const res = response.data.data[0]
                const NftBuyDetails = {
                    name: res.heroData.name, price: res.nft.price, image: res.heroData.asset_image,
                    quantity: res.nft.quantity, marketitemId: res.nft.marketitemId, owner_address: res.nft.owner_address,
                    token_count: res.nft.token_count
                }
                setHeroDetails(res);
                dispatch(setUserNftBuyData(NftBuyDetails));

                // fetchTransactionHistory api calling
                fetchTransactionHistory(res);
                setIsLoading(false);
            }
            catch (error) {
                setIsLoading(false)
            }
        }
        const fetchTransactionHistory = async (res) => {
            try {
                const obj = { attribute_id: res.attribute_id }
                const { data } = await apiNftTransactionHistory(res?.nft?.token_count, obj);
                setTransactionDetails(data);
            }
            catch (error) {
                console.log(error);
            }
        }
        const fetchBattleReward = async () => {
            try {
                const { data } = await apiGetBattleReward();
                setBattleRewardDetails(data)
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchHeroDetails();
        fetchBattleReward();
    }, []);

    const handleCurrencyType = (selectedCurrency) => {
        dispatch(setCurrencyType(selectedCurrency));
        setSelectedCurrency(false);
    }
    const handleCurrencySelect = () => {
        setSelectedCurrency(selectedCurrencyType ? false : true);
    }
    return (
        <Wrapper className="container">
            {isLoading && <Loader />}
            <div className="row">
                <div className="col-md-12 text-center">
                    <h2 className="blue-color">AVATAR DETAILS</h2>
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
                                            <h2>{heroDetails?.heroData?.name}</h2>
                                            <p>Owner: <span>
                                                {`${heroDetails?.nft?.owner_address.substring(
                                                    0,
                                                    9
                                                )}...${heroDetails?.nft?.owner_address.substring(
                                                    heroDetails?.nft?.owner_address.length - 9
                                                )}`} <CopyToClipboard text={heroDetails?.nft?.owner_address}
                                                    onCopy={() => setCopy(true)}>
                                                    <img src={CopyImg} style={{ width: "20px", height: 20, marginLeft: "-1px", cursor: "pointer" }} alt="copyimg" />
                                                </CopyToClipboard>
                                            </span></p>
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <ul className="avatars-details-list">
                                            <li><img src={require("../../assets/images/icon/trophy.png")} alt="trophy" /></li>
                                            <li>
                                                <div className="hero-level-container" >
                                                    <div className="hero-level-data-container">
                                                        <div className="hero-level-heading">{heroDetails?.heroData?.level}</div>
                                                        <div className="hero-level-footer">LEVEL</div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li><img src={require("../../assets/images/icon/heros-icon.png")} alt="heros icon" /></li>
                                            <li>
                                                <div className="hero-level-container" >
                                                    <div className="hero-level-data-container">
                                                        <div className="hero-level-heading">{heroDetails?.hero_rarity_data?.name}</div>
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
                                                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                            <div className="common-box-head">
                                                                <span>Battling Mode Record</span>
                                                            </div>
                                                            <div className="common-box-list">
                                                                <h4>220</h4>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                            <div className="common-box-head">
                                                                <span>Level</span>
                                                            </div>
                                                            <div className="common-box-list">
                                                                <h4>{heroDetails?.heroData?.level}</h4>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                            <div className="common-box-head">
                                                                <span>Reward</span>
                                                            </div>
                                                            <div className="common-box-list">
                                                                <ul>
                                                                    <li>
                                                                        <span>Win</span>
                                                                        <span>+{battleRewardDetails?.win}</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>Draw</span>
                                                                        <span>+{battleRewardDetails?.draw}</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>Lose</span>
                                                                        <span>+{battleRewardDetails?.lose}</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                            <div className="common-box-head">
                                                                <span>Bonus</span>
                                                            </div>
                                                            <div className="common-box-list">
                                                                <h4>+{heroDetails?.win_bonus_data?.amount}</h4>
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
                                                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                            <div className="common-box-head">
                                                                <span>Daily gMOH Battle</span>
                                                            </div>
                                                            <div className="common-box-list">
                                                                <h4>{heroDetails?.battle_count_data?.daily_battle_count}</h4>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 background-story-wrap">
                                                            <h3 className="blue-color">Background Story:</h3>
                                                            <p>{heroDetails?.heroData?.description}</p>
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="STATS">
                                                    <div className="row">
                                                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                            <div className="common-box-head">
                                                                <span>Attack Power</span>
                                                            </div>
                                                            <div className="common-box-list">
                                                                <h4>{heroDetails?.heroData?.damage}</h4>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                            <div className="common-box-head">
                                                                <span>Attack Speed</span>
                                                            </div>
                                                            <div className="common-box-list">
                                                                <h4>{heroDetails?.heroData?.attack_speed}</h4>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                            <div className="common-box-head">
                                                                <span>Move Speed</span>
                                                            </div>
                                                            <div className="common-box-list">
                                                                <h4>{heroDetails?.heroData?.movement_speed}</h4>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                            <div className="common-box-head">
                                                                <span>Health</span>
                                                            </div>
                                                            <div className="common-box-list">
                                                                <h4>{heroDetails?.heroData?.health}</h4>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 background-story-wrap">
                                                            <h3 className="blue-color">Background Story:</h3>
                                                            <p>{heroDetails?.heroData?.description}</p>
                                                        </div>
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
                                                                {transactionDetails?.map((item, index) =>
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
                                    <img src={heroDetails?.heroData?.asset_image} alt="avatar hero" className="mystery-box-img" />
                                    {/* <div className="box-price-details">
                                        <p>50 BUSD/USDT <span>( $43.21 USD )</span></p>
                                    </div> */}
                                    {heroDetails?.nft?.owner_address !== walletAddress ?
                                        <div className="box-price-details">
                                            <div className="dropdown selectCurrency m-0">
                                                <p>{heroDetails?.nft?.price}</p>&nbsp;
                                                <span className="dropdown-toggle selectCurrency-head" data-bs-toggle="dropdown" onClick={handleCurrencySelect}>
                                                    {currency.toUpperCase()}
                                                </span>
                                                <span className='box-comn-size'>( $43.21 USD )</span>
                                            </div>
                                            <ul className={`dropdown-menu selectCurrency-menu ${selectedCurrencyType ? "dropdown-menu-show" : ""}`}>
                                                <li onClick={(() => handleCurrencyType("usdt"))}>USDT</li>
                                                <li onClick={(() => handleCurrencyType("busd"))}>BUSD</li>
                                            </ul>
                                        </div> : ""}
                                    {heroDetails?.nft?.owner_address !== walletAddress ?
                                        <button onClick={handleBuy} data-dismiss="modal" data-toggle="modal" data-target="#checkout-modal" className="btn-style2 buy-now-btn">
                                            <img src={require("../../assets/images/icon/btn-style2.png")} alt="btn style2" />
                                            <span>BUY NOW</span>
                                        </button> : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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