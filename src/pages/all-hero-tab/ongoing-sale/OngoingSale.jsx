import React, { useEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { openModal, setUserSaleNftMarketId, setUserSaleToken, setUserSaleNftName } from "../../../store";
import { ModalType, NftName } from "../../../core";
import { apiOnSaleHeroesList, apiOnSaleWeaponsList } from "../../../api";
import Doler from "../../../assets/images/icon/doler-icon.svg";
import { DataNotFound } from "../../../containers";

export default function OngoingSale() {
    const [onSaleHeroesList, setOnSaleHeroesList] = useState([]);
    const [onSaleWeapons, setOnSaleWeapons] = useState([]);
    const walletAddress = useSelector((state) => state.auth.user.walletAddress);
    const refreshPage = useSelector((state) => state.userDetails.UserNftSaleStatus);
    const weaponOnSaleStatus = useSelector((state) => state.userDetails.userWeaponNftStatus.weponsOnSaleStatus);
    const dispatch = useDispatch();

    const handleLowerPrice = (item) => {
        dispatch(setUserSaleToken(item.token_count));
        dispatch(openModal(ModalType.LowerPriceModal));
    }

    const handleCancelSale = (item) => {
        if (item && item.weapon_details_data) {
            dispatch(setUserSaleNftName(NftName.Weapon));
        }
        else {
            dispatch(setUserSaleNftName(NftName.Hero));
        }
        dispatch(setUserSaleNftMarketId(item.token_owner_data.marketitemId));
        dispatch(setUserSaleToken(item.token_count));
        dispatch(openModal(ModalType.CancelSaleModal));
    }

    useEffect(() => {
        fetchUserOnSaleHeroesList();
    }, [refreshPage]);

    useEffect(() => {
        fetchUserOnSaleWeaponsList();
    }, [weaponOnSaleStatus]);

    async function fetchUserOnSaleHeroesList() {
        try {
            const { data } = await apiOnSaleHeroesList(walletAddress);
            const res = data.data.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) });
            setOnSaleHeroesList(res)
        }
        catch (error) {
            console.log(error);
        }
    }

    async function fetchUserOnSaleWeaponsList() {
        try {
            const { data } = await apiOnSaleWeaponsList(walletAddress);
            const res = data.data.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) });
            setOnSaleWeapons(res);
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <Tab.Pane eventKey="Ongoing Sale">
            <Tab.Container defaultActiveKey="HEROES">
                <Nav className="heros-details-list">
                    <button>
                        <Nav.Link eventKey="HEROES">HEROES</Nav.Link>
                    </button>
                    <button>
                        <Nav.Link eventKey="WEAPONS">WEAPONS</Nav.Link>
                    </button>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="HEROES">
                        <div className="row">
                            {onSaleHeroesList?.length ?
                                onSaleHeroesList.map((item, index) =>
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-6 full-width-480" key={index}>
                                        <div className="all-heroes-tab">
                                            <img src={item?.hero_details_data?.compressed_image} alt="hero" />
                                            <ul className="icon-box-ul">
                                                <li className="img-li">
                                                    <img src={require("../../../assets/images/icon/heros-icon.png")} alt="heros-icon" />                                            </li>
                                                <li className="level-li">
                                                    <p className="level text-uppercase mb-0">level</p>
                                                    <p className="level_no mb-0">{item?.hero_details_data?.level}</p>
                                                </li>
                                                <li className="rank-li">
                                                    <p className="rank mb-0">S</p>
                                                </li>
                                            </ul>
                                            <div className="all-heroes-details all-heroes-details2 all-heroes-details3 upgrade-all-details-wrap">
                                                <h4>{item?.hero_details_data?.name}</h4>
                                                <button onClick={() => handleLowerPrice(item)} className="btn-common-style mb-2" data-dismiss="modal" data-toggle="modal" data-target="#lower-price-modal">
                                                    <img src={require("../../../assets/images/icon/btn-style3.png")} alt="btn style3" />
                                                    <span>LOWER PRICE</span>
                                                </button>
                                                <button onClick={() => handleCancelSale(item)} className="btn-common-style" data-dismiss="modal" data-toggle="modal" data-target="#cancel-sale-modal">
                                                    <img src={require("../../../assets/images/icon/btn-style4.png")} alt="btn style4" />
                                                    <span>CANCEL SALE</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : <DataNotFound />}
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="WEAPONS">
                        <div className="row">
                            {onSaleWeapons.length ?
                                onSaleWeapons.map((item, index) =>
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-6 full-width-480" key={index}>
                                        <div className="all-heroes-tab">
                                            <img src={item?.weapon_details_data?.weapon_image} alt="hero" />
                                            <ul className="icon-box-ul">
                                                <li className="level-li">
                                                    <p className="level text-uppercase mb-0">level</p>
                                                    <p className="level_no mb-0">{item?.weapon_details_data?.level}</p>
                                                </li>
                                                <li className="rank-li">
                                                    <p className="rank mb-0">S</p>
                                                </li>
                                            </ul>
                                            <div className="all-heroes-details all-heroes-details2 all-heroes-details3 upgrade-all-details-wrap">
                                                <h4>{item?.weapon_details_data?.name}</h4>
                                                <button onClick={() => handleLowerPrice(item)} data-dismiss="modal" className="btn-common-style mb-2" data-toggle="modal" data-target="#lower-price-modal">
                                                    <img src={require("../../../assets/images/icon/btn-style3.png")} alt="btn style3" />
                                                    <span>LOWER PRICE</span>
                                                </button>
                                                <button onClick={() => handleCancelSale(item)} data-dismiss="modal" className="btn-common-style" data-toggle="modal" data-target="#cancel-sale-modal">
                                                    <img src={require("../../../assets/images/icon/btn-style4.png")} alt="btn style4" />
                                                    <span>CANCEL SALE</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : <DataNotFound />}
                        </div>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Tab.Pane>
    )
} 