import React, { useEffect, useState } from "react";
import { Tab, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { openModal } from "../../../store";
import { ModalType } from "../../../core";
import { useDispatch } from "react-redux";
import { marketPlaceHeroesList, getAllSkinRarity, getAllHeroRarity } from "../../../api";
import { isMobile } from "react-device-detect";
import { DataNotFound } from "../../../containers";

import AngelUp from "../../../assets/images/icon/angel-up-icon.svg";
import DolerIcon from "../../../assets/images/icon/doler-icon.svg";
import dropDownImg from "../../../assets/images/icon/angle-down-icon.svg";

export default function Heroes() {
    const dispatch = useDispatch();
    const [spinner, setSpinner] = useState(false);
    const [filter, setFilter] = useState(false);
    const [avatarDropDown, setAvatarDropDown] = useState(!isMobile ? true : false);
    const [avatarSkin, setAvatarSkin] = useState(!isMobile ? true : false);
    const [avatarLevel, setAvatarLevel] = useState(!isMobile ? true : false);
    const [trophy, setTrophy] = useState(!isMobile ? true : false);
    const [battleCount, setBattleCount] = useState(!isMobile ? true : false);
    const [priceDropDown, setPriceDropDown] = useState(!isMobile ? true : false);
    const [quality, setQuality] = useState(false);
    const [qualityType, setQualityType] = useState("Most Expensive");
    const [marketPlaceHeroes, setMarketPlaceHeroes] = useState([]);
    const [price, setPrice] = useState(-1)
    const [latest, setLatest] = useState();
    const [skinRarity, setSkinRarity] = useState([]);
    const [heroRarity, setHeroRarity] = useState([]);
    const [priceRange, setPriceRange] = useState();
    const [skin_rarity_id, setSkin_rarity_id] = useState([]);
    const [hero_rarity_id, setHero_rarity_id] = useState([]);

    const handleChooseWeapons = () => {
        dispatch(openModal(ModalType.ChooseAvatarModal));
    }

    useEffect(() => {
        setSpinner(true);
        if (!skinRarity.length) {
            fetchAllSkinRarity();
        }
        if (!heroRarity.length) {
            fetchAllHeroRarity();
        }
        getMarketPlaceHeroes();
    }, [latest, price, priceRange, skin_rarity_id, hero_rarity_id]);

    async function getMarketPlaceHeroes() {
        try {
            const obj = { latest, price, max: priceRange };
            if (skin_rarity_id && skin_rarity_id.length)
                obj.skin_rarity_id = skin_rarity_id
            if (hero_rarity_id && hero_rarity_id.length)
                obj.hero_rarity_id = hero_rarity_id

            const { data } = await marketPlaceHeroesList(obj);
            setMarketPlaceHeroes(data);
            setSpinner(false);
        }
        catch (error) {
            console.log(error)
        }
    }

    async function fetchAllSkinRarity() {
        try {
            const { data } = await getAllSkinRarity();
            setSkinRarity(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function fetchAllHeroRarity() {
        try {
            const { data } = await getAllHeroRarity();
            setHeroRarity(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleFilter = () => {
        setFilter(filter ? false : true);
    }

    const handleDropDown = () => {
        setQuality(quality ? false : true);
    }

    const handleQualityChange = (qualityType) => {
        setQualityType(qualityType);
        if (qualityType === "Most Expensive") {
            setPrice(-1);
            setLatest()
        }
        else if (qualityType === "Cheapest") {
            setPrice(1);
            setLatest()
        }
        else {
            setLatest(1);
            setPrice();
        }
    }

    const handlePriceRange = (event) => {
        setPriceRange(Number(event.target.value));
    }

    const handleSkinCheckBox = (item, e) => {
        if (e.target.checked) {
            setSkin_rarity_id([...skin_rarity_id, item._id]);
        }
        else {
            setSkin_rarity_id((skin_rarity_id) => skin_rarity_id.filter((id) => id !== item._id));
        }
    }

    const handleHeroCheckbox = (item, e) => {
        console.log("hero checkbox clicked")
        if (e.target.checked) {
            setHero_rarity_id([...hero_rarity_id, item._id]);
        }
        else {
            setHero_rarity_id((hero_rarity_id) => hero_rarity_id.filter((id) => id !== item._id));
        }
    }

    return (
        <Tab.Pane eventKey="heros">
            <button className="filterBtn" onClick={handleFilter}>
                <i className="fa fa-filter"></i>
            </button>
            <div className="row">
                <div className="col-md-3">
                    <div className={`fillter-bar-box ${filter ? "filterOpenClose" : ""}`}>
                        <div>
                            <div className="marketplace-head">
                                <span>Avatar/Heroes</span>
                                <button onClick={() => setAvatarDropDown(avatarDropDown ? false : true)}>
                                    <img src={avatarDropDown ? AngelUp : dropDownImg} alt="angel up" />
                                </button>

                            </div>
                            <div className={`toggleFilter ${avatarDropDown ? "showFilter" : ""}`}>
                                <ul className="marketplace-inner-content">
                                    {heroRarity.map((item, index) =>
                                        <li key={item?._id}>
                                            <div className="custom-control custom-checkbox checking-box-wrap">
                                                <input type="checkbox" onChange={(e) => handleHeroCheckbox(item, e)} className="custom-control-input" id={`defaultUnchecked${1 + index}`} />
                                                <label className="custom-control-label" htmlFor={`defaultUnchecked${1 + index}`}>{item?.name}</label>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                                <button onClick={handleChooseWeapons} className="btn btn-primary choose-weapon" data-dismiss="modal" data-toggle="modal" data-target="#choose-avatars-modal">CHOOSE AVATARS</button>
                            </div>
                        </div>
                        <div>
                            <div className="marketplace-head">
                                <span>Avatar Skin Rarity</span>
                                <button onClick={() => setAvatarSkin(avatarSkin ? false : true)}>
                                    <img src={avatarSkin ? AngelUp : dropDownImg} alt="angel up" />
                                </button>
                            </div>
                            <div className={`toggleFilter ${avatarSkin ? "showFilter" : ""}`}>
                                <ul className="marketplace-inner-content">
                                    {skinRarity.map((item, index) =>
                                        <li key={item?._id}>
                                            <div className="custom-control custom-checkbox checking-box-wrap">
                                                <input type="checkbox" onChange={(e) => handleSkinCheckBox(item, e)} className="custom-control-input" id={`defaultUnchecked${11 + index}`} />
                                                <label className="custom-control-label" htmlFor={`defaultUnchecked${11 + index}`}>{item?.name}</label>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                                <button onClick={handleChooseWeapons} className="btn btn-primary choose-weapon" data-dismiss="modal" data-toggle="modal" data-target="#choose-avatars-modal">CHOOSE SKINS</button>
                            </div>
                        </div>
                        <div>
                            <div className="marketplace-head">
                                <span>Avatar Level</span>
                                <button onClick={() => setAvatarLevel(avatarLevel ? false : true)}>
                                    <img src={avatarLevel ? AngelUp : dropDownImg} alt="angel up" />
                                </button>
                            </div>
                            <div className={`toggleFilter ${avatarLevel ? "showFilter" : ""}`}>
                                <div className="price-range-wrap">
                                    <input type="range" min="1" max="100" defaultValue="50" className="price-range-data" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="marketplace-head">
                                <span>Trophy className</span>
                                <button onClick={() => setTrophy(trophy ? false : true)}>
                                    <img src={trophy ? AngelUp : dropDownImg} alt="angel up" />
                                </button>
                            </div>
                            <div className={`toggleFilter ${trophy ? "showFilter" : ""}`}>
                                <div className="price-range-wrap">
                                    <input type="range" min="1" max="100" defaultValue="50" className="price-range-data" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="marketplace-head">
                                <span>Battle Count</span>
                                <button onClick={() => setBattleCount(battleCount ? false : true)}>
                                    <img src={battleCount ? AngelUp : dropDownImg} alt="angel up" />
                                </button>

                            </div>
                            <div className={`toggleFilter ${battleCount ? "showFilter" : ""}`}>
                                <div className="price-range-wrap">
                                    <input type="range" min="1" max="100" defaultValue="50" className="price-range-data" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="marketplace-head">
                                <span>Price (BUSD/USDT)</span>
                                <button onClick={() => setPriceDropDown(priceDropDown ? false : true)}>
                                    <img src={priceDropDown ? AngelUp : dropDownImg} alt="angel up" />
                                </button>
                            </div>
                            <div className={`toggleFilter ${priceDropDown ? "showFilter" : ""}`}>
                                <div className="price-range-wrap">
                                    <input type="range" min="1" onMouseUp={handlePriceRange} onTouchEnd={handlePriceRange} max="100" defaultValue="50" className="price-range-data" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-md-12 marketplace-top-head">
                            <h2 className="blue-color">ALL HEROES</h2>
                            <div className="marketplace-select-box" onClick={handleDropDown}>
                                <div className="dropdown-inventory-container">
                                    <div className="dropdown-data-shower mb-0"> {qualityType}
                                        <span style={{ padding: "0px", backgroundColor: "#FFCF0B", color: "white", display: "inline-block", borderRadius: "5px", marginLeft: "5px", cursor: "pointer", width: "25px", textAlign: "center", float: "right" }}>
                                            <img src={quality ? AngelUp : dropDownImg} alt="dropdown" />
                                        </span>
                                    </div>
                                    <ul className={`dropdown-menu-inventory ${quality ? "dropdown-menu-show" : "hide-inventory-menu"} `} >
                                        <li onClick={() => handleQualityChange("Latest")}>Latest</li>
                                        <li className="d-flex py-1"><div style={{ borderBottom: "1px solid #000", width: "80%", opacity: "0.3" }}></div> </li>
                                        <li onClick={() => handleQualityChange("Cheapest")}>Cheapest</li>
                                        <li className="d-flex py-1"><div style={{ borderBottom: "1px solid #000", width: "80%", opacity: "0.3" }}></div> </li>
                                        <li onClick={() => handleQualityChange("Most Expensive")}>Most Expensive</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {spinner ? <div className="spinnerWrapper">
                            <Spinner className="text-white" animation="border" role="status">
                                {/* <span className="visually-hidden">Loading...</span> */}
                            </Spinner>
                        </div> : ""}
                        {marketPlaceHeroes.length && !spinner ?
                            marketPlaceHeroes.map((item, index) =>
                                <div className="col-lg-4 col-md-6 col-6 full-width-480" key={index}>
                                    <Link to={`/avatar-details/${item?._id}`} className="anchor-style">
                                        <div className="all-heroes-tab">
                                            <div className="img-overlay">
                                                <img src={item?.heroDetail?.compressed_image} alt="hero" />
                                            </div>
                                            <h4>{item?.heroDetail?.name}</h4>
                                            <ul className="icon-box-ul">
                                                <li className="img-li">
                                                    <img src={require("../../../assets/images/icon/heros-icon.png")} alt="heros-icon" />                                            </li>
                                                <li className="level-li">
                                                    <p className="level text-uppercase mb-0">level</p>
                                                    <p className="level_no mb-0">{item?.heroDetail?.level}</p>
                                                </li>
                                                <li className="rank-li">
                                                    <p className="rank mb-0">S</p>
                                                </li>
                                            </ul>
                                            <div className="all-heroes-details">
                                                <ul>
                                                    <li>
                                                        <span>No. of battle</span>
                                                        <span className="green">{item?.battleCount?.total_battle_count}</span>
                                                    </li>
                                                    <li>
                                                        <span>Price</span>
                                                        <span className="yellow">{item?.nft?.price} BUSD/USDT</span>
                                                    </li>
                                                    <li>
                                                        <span></span>
                                                        <span>$105.44 USD</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ) : spinner ? "" : <DataNotFound />}
                    </div>
                    {/* {marketPlaceHeroes.length && !spinner ? <div className="row mt-2 mb-5">
                        <div className="col-md-12 d-flex justify-content-center">
                            <ul className="pagination">
                                <li className="page-item pagination-arrow pagination-left">
                                    <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">«</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                                <span className="pagintaion-status"> 2 of 203 </span>
                                <li className="page-item pagination-arrow pagination-right">
                                    <a className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">»</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div> : ""} */}
                </div>
            </div>
        </Tab.Pane >
    )
}