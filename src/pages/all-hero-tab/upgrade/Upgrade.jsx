import React from "react";
import { Tab, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store";
import { NftName } from "../../../core";
import { Link } from "react-router-dom"
import Doler from "../../../assets/images/icon/doler-icon.svg";
import { DataNotFound } from "../../../containers";

export default function Upgrade(props) {
    const userAllHeroesList = props.userAllHeroesData;
    const userAllWeaponsList = props.userAllWeaponsData;

    const dispatch = useDispatch();
    return (
        <Tab.Pane eventKey="Upgrade">
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
                            {userAllHeroesList?.length ?
                                userAllHeroesList.map((item, index) =>
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-6 full-width-480" key={index}>
                                        <div className="all-heroes-tab">
                                            <img src={item?.hero_details_data?.compressed_image} alt="hero" />
                                            <ul className="icon-box-ul">
                                                <li className="img-li">
                                                    <img src={require("../../../assets/images/icon/heros-icon.png")} alt="heros-icon" />
                                                </li>
                                                <li className="level-li">
                                                    <p className="level text-uppercase mb-0">level</p>
                                                    <p className="level_no mb-0">{item?.hero_details_data?.level}</p>
                                                </li>
                                                <li className="rank-li">
                                                    <p className="rank mb-0">S</p>
                                                </li>
                                            </ul>
                                            <div className="all-heroes-details all-heroes-details2 upgrade-all-details-wrap">
                                                <h4>{item?.hero_details_data?.name}</h4>
                                                <Link to={`/upgrade-avatar/${item?._id}/${NftName.Hero}`} className="btn-common-style" data-dismiss="modal" data-toggle="modal" data-target="#upgrade-prompt-modal">
                                                    <img src={require("../../../assets/images/icon/btn-style3.png")} alt="btn style3" />
                                                    <span>UPGRADE</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ) : <DataNotFound />}
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="WEAPONS">
                        <div className="row">
                            {userAllWeaponsList?.length ?
                                userAllWeaponsList.map((item, index) =>
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
                                            <div className="all-heroes-details all-heroes-details2 upgrade-all-details-wrap">
                                                <h4>{item?.weapon_details_data?.name}</h4>
                                                <Link to={`/upgrade-avatar/${item?._id}/${NftName.Weapon}`} data-dismiss="modal" data-toggle="modal" data-target="#upgrade-prompt-modal">
                                                    <img src={require("../../../assets/images/icon/btn-style3.png")} alt="btn style3" />
                                                    <span>UPGRADE</span>
                                                </Link>
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