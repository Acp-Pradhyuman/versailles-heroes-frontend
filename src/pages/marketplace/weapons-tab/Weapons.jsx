import React, { useState, useEffect } from "react";
import { Tab, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { openModal } from "../../../store";
import { ModalType } from "../../../core";
import { useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";
import { marketPlaceWeaponsList, getAllWeaponRarity, ListOfAllWeapons } from "../../../api";
import { DataNotFound } from "../../../containers";


import AngelUp from "../../../assets/images/icon/angel-up-icon.svg";
import DolerIcon from "../../../assets/images/icon/doler-icon.svg";
import dropDownImg from "../../../assets/images/icon/angle-down-icon.svg";

export default function Weapons() {
    const dispatch = useDispatch();
    const [spinner, setSpinner] = useState(false);
    const [filter, setFilter] = useState(false);
    const [weapon_rarity_id, setWeapon_rarity_id] = useState([]);
    const [weapon, setWeapon] = useState([])
    const [weaponDropDown, setWeaponDropDown] = useState(!isMobile ? true : false);
    const [weaponRarity, setWeaponRarity] = useState(!isMobile ? true : false);
    const [weaponLevel, setWeaponLevel] = useState(!isMobile ? true : false);
    const [trophy, setTrophy] = useState(!isMobile ? true : false);
    const [priceDropDown, setPriceDropDown] = useState(!isMobile ? true : false);
    const [quality, setQuality] = useState(false);
    const [qualityType, setQualityType] = useState("Most Expensive");
    const [marketPlaceWeapons, setMarketPlaceWeapons] = useState([]);
    const [allWeaponRarity, setAllWeaponRarity] = useState([]);
    const [price, setPrice] = useState();
    const [latest, setLatest] = useState();
    const [weapon_id, setWeapon_id] = useState([]);

    useEffect(() => {
        setSpinner(true);
        if (!allWeaponRarity.length) {
            fetchAllWeaponRarity();
        }
        if (!weapon.length) {
            fetchListOfAllWeapons();
        }
        fetchUserWeapons();
    }, [price, latest, weapon_rarity_id, weapon_id]);

    async function fetchUserWeapons() {
        try {
            // const obj = { level: 2, max: 1, price, latest, weapon_rarity_id: weapon_rarity_id, weapon: weapon }
            const obj = { price, latest }
            if (weapon_rarity_id && weapon_rarity_id.length)
                obj.weapon_rarity_id = weapon_rarity_id
            if (weapon_id && weapon_id.length)
                obj.weapon = weapon_id

            const { data } = await marketPlaceWeaponsList(obj);
            setMarketPlaceWeapons(data);
            console.log("user Weapon data", data);
            setSpinner(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    async function fetchAllWeaponRarity() {
        try {
            const { data } = await getAllWeaponRarity();
            setAllWeaponRarity(data);
            console.log("weaponrarity data", data);
        }
        catch (error) {
            console.log(error);
        }
    }

    async function fetchListOfAllWeapons() {
        try {
            const { data } = await ListOfAllWeapons();
            setWeapon(data);
            console.log("listof all weapons", data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleChooseWeapons = () => {
        dispatch(openModal(ModalType.PurchaseCompleted1));
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

    const handleRarityCheckBox = (item, event) => {
        console.log("item insid ehandle rearity ", item, event.target.checked);
        if (event.target.checked) {
            setWeapon_rarity_id([...weapon_rarity_id, item._id]);
        }
        else {
            setWeapon_rarity_id((weapon_rarity_id) => weapon_rarity_id.filter((_id) => _id !== item._id));
        }
    }

    const handleWeaponCheckBox = (item, event) => {
        if (event.target.checked) {
            setWeapon_id([...weapon_id, item.id]);
        }
        else {
            setWeapon_id((weapon_id) => weapon_id.filter((id) => id !== item.id));
        }
    }

    return (
        <Tab.Pane eventKey="weapons">
            <button className="filterBtn" onClick={handleFilter}>
                <i className="fa fa-filter"></i>
            </button>
            <div className="row">
                <div className="col-lg-3 col-md-4">
                    <div className={`fillter-bar-box ${filter ? "filterOpenClose" : ""}`}>
                        <div>
                            <div className="marketplace-head">
                                <span>Weapon Rarity</span>
                                <button onClick={() => setWeaponRarity(weaponRarity ? false : true)}>
                                    <img src={weaponRarity ? AngelUp : dropDownImg} alt="angel up" />
                                </button>
                            </div>
                            <div className={`toggleFilter ${weaponRarity ? "showFilter" : ""}`}>
                                <ul className="marketplace-inner-content">
                                    {allWeaponRarity &&
                                        allWeaponRarity.map((item, index) =>
                                            <li key={index}>
                                                <div className="custom-control custom-checkbox checking-box-wrap">
                                                    <input type="checkbox" onChange={(e) => handleRarityCheckBox(item, e)} className="custom-control-input" id={`defaultUnchecked${index + 21}`} />
                                                    <label className="custom-control-label" htmlFor={`defaultUnchecked${index + 21}`}>{item?.name}</label>
                                                </div>
                                            </li>
                                        )}
                                </ul>
                                <button onClick={handleChooseWeapons} className="btn btn-primary choose-weapon" data-dismiss="modal" data-toggle="modal" data-target="#choose-avatars-modal">CHOOSE WEAPONS</button>
                            </div>
                        </div>
                        <div>
                            <div className="marketplace-head">
                                <span>Weapon</span>
                                <button onClick={() => { setWeaponDropDown(weaponDropDown ? false : true) }}>
                                    <img src={weaponDropDown ? AngelUp : dropDownImg} alt="angel up" />
                                </button>
                            </div>
                            <div className={`toggleFilter ${weaponDropDown ? "showFilter" : ""}`}>
                                <ul className="marketplace-inner-content">
                                    {weapon &&
                                        weapon.map((item, index) =>
                                            <li key={index}>
                                                <div className="custom-control custom-checkbox checking-box-wrap">
                                                    <input type="checkbox" onChange={(e) => handleWeaponCheckBox(item, e)} className="custom-control-input" id={`defaultUnchecked${index + 31}`} />
                                                    <label className="custom-control-label" htmlFor={`defaultUnchecked${index + 31}`}>{item?.name}</label>
                                                </div>
                                            </li>
                                        )}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className="marketplace-head">
                                <span>Weapon Level</span>
                                <button onClick={() => { setWeaponLevel(weaponLevel ? false : true) }}>
                                    <img src={weaponLevel ? AngelUp : dropDownImg} alt="angel up" />
                                </button>
                            </div>
                            <div className={`toggleFilter ${weaponLevel ? "showFilter" : ""}`}>
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
                                <span>Price (BUSD/USDT)</span>
                                <button onClick={() => setPriceDropDown(priceDropDown ? false : true)}>
                                    <img src={priceDropDown ? AngelUp : dropDownImg} alt="angel up" />
                                </button>
                            </div>
                            <div className={`toggleFilter ${priceDropDown ? "showFilter" : ""}`}>
                                <div className="price-range-wrap">
                                    <input type="range" min="1" max="100" defaultValue="50" className="price-range-data" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9 col-md-8">
                    <div className="row">
                        <div className="col-md-12 marketplace-top-head">
                            <h2 className="blue-color">ALL WEAPONS</h2>
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
                        {marketPlaceWeapons?.length && !spinner ?
                            marketPlaceWeapons.map((item, index) =>
                                <div className="col-lg-4 col-md-6 col-6 full-width-480" key={index}>
                                    <Link to={`/weapon-details/${item?._id}`} className="anchor-style">
                                        <div className="all-heroes-tab">
                                            <div className="img-overlay">
                                                <img src={item?.weaponDetail?.weapon_image} alt="hero" />
                                            </div>
                                            <h4>{item?.weaponDetail?.name}</h4>
                                            <ul className="icon-box-ul">
                                                <li className="level-li">
                                                    <p className="level text-uppercase mb-0">level</p>
                                                    <p className="level_no mb-0">{item?.weaponDetail?.level}</p>
                                                </li>
                                                <li className="rank-li">
                                                    <p className="rank mb-0">S</p>
                                                </li>
                                            </ul>
                                            <div className="all-heroes-details">
                                                <ul>
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
                </div>
            </div>
        </Tab.Pane >
    )
}