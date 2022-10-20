import React, { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ModalType } from '../../../core';
import { closeModal, setSelectedHeroRarityId, setSelectedHeroIndex } from '../../../store';
import { ListOfAllWeapons, ListOfAllHeroes } from "../../../api";

export default function PurchaseCompleted1() {
    const dispatch = useDispatch();
    const [heroList, setHeroList] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [heroRarityId, setHeroRarityId] = useState([]);
    const [HeroesIndex, setHeroesIndex] = useState([]);
    const isOpen = useSelector((state) => state.ui.modal[ModalType.PurchaseCompleted1] || false);
    const avatarModal = useSelector((state) => state.ui.modal[ModalType.ChooseAvatarModal] || false);
    const selectedHeroes = useSelector((state) => state.marketPlace.chooseAvatarFilterData.heroRarityId);
    const selectedHeroIndex = useSelector((state) => state.marketPlace.chooseAvatarFilterData.selectedHeroindex || []);
    console.log("selected checkobox data", selectedHeroIndex)

    const handleClose = () => {
        dispatch(closeModal(avatarModal ? ModalType.ChooseAvatarModal : ModalType.PurchaseCompleted1));
    }

    const handleApply = () => {
        dispatch(setSelectedHeroRarityId(heroRarityId));
        dispatch(setSelectedHeroIndex(HeroesIndex));
        handleClose();
    }

    useEffect(() => {
        console.log("dddddddd", selectedHeroes)
        // setHeroRarityId(selectedHeroes);
        setHeroesIndex(selectedHeroIndex);
        setSpinner(true);
        if (avatarModal) {
            fecthAllHeroesList();
        }
    }, []);

    async function fecthAllHeroesList() {
        try {
            const { data } = await ListOfAllHeroes();
            setHeroList(data);
            setSpinner(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleCheckBox = (item, event, index) => {
        console.log("ddddd", item, event.target.checked)
        if (avatarModal && event.target.checked) {
            setHeroRarityId([...heroRarityId, item.hero_rarity_id]);
            setHeroesIndex([...HeroesIndex, index]);
        }
        else if (avatarModal && !event.target.checked) {
            setHeroRarityId((heroRarityId) => heroRarityId.filter((id) => id !== item.hero_rarity_id));
            setHeroesIndex((HeroesIndex) => HeroesIndex.filter((itemIndex) => itemIndex !== index));
        }
    }
    // const handleAdd = () => {
    //     console.log("add", heroRarityId)
    // }

    return (
        <Modal
            show={isOpen || avatarModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            dialogClassName="modal-class modal-md modal-width-wrap"
        >
            <button type="button" onClick={handleClose} className="close modal-close-btn" data-dismiss="modal" aria-label="Close">x</button>
            <div className="modal-body">
                <div className="modal-inner-area">
                    <p><strong>Click on any of the following Heroes to select/unselect</strong><a href="">CLEAR</a></p>
                    <div className="all-avatars-box">
                        {spinner ? <div className="spinnerWrapper">
                            <Spinner className="text-white" animation="border" role="status">
                                {/* <span className="visually-hidden">Loading...</span> */}
                            </Spinner>
                        </div> : ""}
                        <ul>
                            {heroList && !spinner ?
                                heroList.map((item, index) => {
                                    const check = selectedHeroIndex.includes(index); return <li key={index}>
                                        <img src={item?.compressed_image} alt="modal avatar" />
                                        <input type="checkbox" defaultChecked={check} onChange={(e) => handleCheckBox(item, e, index)} id="vehicle1" name="vehicle1" value="Bike" />
                                        <span>{item?.name}</span>
                                    </li>
                                }
                                ) : ""}
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={handleApply} className="btn btn-primary mx-auto">APPLY</button>
                    </div>
                </div>
            </div>
            {/* <button onClick={handleAdd}>add</button> */}
        </Modal>
    );
}