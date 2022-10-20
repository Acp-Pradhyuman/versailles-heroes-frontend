import { React } from "react";
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { ModalType, Contract } from "../../../core";
import { closeModal, openModal, setUserNftStatus, setBoxStatus, setUserWeaponStatus } from "../../../store";
import { apiOpenBox, apiOpenWeaponBox } from '../../../api'
import ModalCloseImg from "../../../assets/images/icon/modal-cross.svg";
import WarningImg from "../../../assets/images/icon/warningImage.svg";

import Web3Modal from "web3modal";
import { ethers, Wallet } from "ethers";
import VRF from "../../../abi/RandomNumberConsumer1.json";
import NFT from "../../../abi/NFT2.json";

export default function NftWarningModal() {
    const dispatch = useDispatch();
    const nftWarningModal = useSelector((state) => state.ui.modal[ModalType.NftWarningModal] || false);
    const openBoxModal = useSelector((state) => state.ui.modal[ModalType.OpenBoxModal] || false);
    const boxData = useSelector((state) => state.MysteryBoxes.openBoxDetails.openBoxData);
    const walletAddress = useSelector((state) => state.auth.user.walletAddress);
    const userNftStatus = useSelector((state) => state.userDetails.UserNftStatus);
    const boxStatus = useSelector((state) => state.MysteryBoxes.boxStatus);
    const weaponStatus = useSelector((state) => state.userDetails.userWeaponNftStatus.status);

    const handleClose = () => {
        dispatch(closeModal(nftWarningModal ? ModalType.NftWarningModal : ModalType.OpenBoxModal));
    }

    const handleBoxOpen = async () => {
        handleClose();
        dispatch(openModal(ModalType.BoxOpenModal));

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();

        const provider = new ethers.providers.Web3Provider(connection);

        let walletMnemonic = Wallet.fromMnemonic(process.env.REACT_APP_MNEMONIC)
        let wallet = walletMnemonic.connect(provider)

        const vrf = new ethers.Contract(Contract.vrf, VRF.abi, wallet);

        let transaction = await vrf.getRandomNumber()
        let tx = await transaction.wait()
        let event = tx.events[0];
        let transactionHash = event.transactionHash;

        //token id
        await wait(120);
        let randomTokenId = await vrf.randomTokenId();
        let tokenId = Number(randomTokenId._hex);
        let skinRarity, heroRarity, weaponRarity

        if (boxData.name === "Common Box") {
            skinRarity = await vrf.getCommonBoxSkin();
            heroRarity = await vrf.getCommonBoxHero();
        }
        else if (boxData.name === "Rare Box") {
            skinRarity = await vrf.getRareBoxSkin();
            heroRarity = await vrf.getRareBoxHero();
        }
        else if (boxData.name === "Epic Box") {
            skinRarity = await vrf.getEpicBoxSkin();
            heroRarity = await vrf.getEpicBoxHero();
        }
        else if (boxData.name === "Legendary Box") {
            skinRarity = await vrf.getLegendaryBoxSkin();
            heroRarity = await vrf.getLegendaryBoxHero();
        }
        else {
            weaponRarity = await vrf.getWeaponBoxRarityDrop();
        }

        console.log("randomTokenId :", Number(randomTokenId._hex))
        const openBox = {
            token_count: tokenId,
            token_standard: "ERC721", contract_address: Contract.nft, hash: transactionHash,
            mystery_box_id: boxData._id, creator_address: walletAddress
        }
        if (boxData.name === "Weapon Box") {
            openBox.weapon_rarity_id = weaponRarity
            fetchOpenWeaponBox(openBox, wallet);
        }
        else {
            openBox.skin_rarity_id = skinRarity;
            openBox.hero_rarity_id = heroRarity;
            fetchApiOpenBox(openBox, wallet);
        }
    }

    const wait = (seconds) => {
        const milliseconds = seconds * 1000
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    const fetchApiOpenBox = async (openBoxObj, wallet) => {
        console.log("openbox", openBoxObj);
        try {
            const { data } = await apiOpenBox(openBoxObj);
            console.log("api response", data.data.ipfs_uri, data.data.token_count)
            const nft = new ethers.Contract(Contract.nft, NFT.abi, wallet);

            let transaction = await nft.createToken(walletAddress, data.data.token_count,
                data.data.ipfs_uri, { gasLimit: 2000000 });
            let tx = await transaction.wait()
            console.log("tx", tx)
            let event = tx.events[0];
            let transactionHash = event.transactionHash;
            console.log("thash", transactionHash);
            dispatch(setBoxStatus(!boxStatus));
            dispatch(closeModal(ModalType.BoxOpenModal));
            dispatch(setUserNftStatus(userNftStatus ? false : true))
        }
        catch (error) {
            console.log(error)
        }
    }

    const fetchOpenWeaponBox = async (openBoxObj, wallet) => {
        try {
            const { data } = await apiOpenWeaponBox(openBoxObj);
            console.log("wapon box open data", data);
            const nft = new ethers.Contract(Contract.nft, NFT.abi, wallet);

            let transaction = await nft.createToken(walletAddress, data.data.token_count,
                data.data.ipfs_uri, { gasLimit: 2000000 });
            let tx = await transaction.wait()
            console.log("tx", tx)
            let event = tx.events[0];
            let transactionHash = event.transactionHash;
            console.log("thash", transactionHash);
            dispatch(setBoxStatus(!boxStatus));
            dispatch(setUserWeaponStatus(!weaponStatus));
            dispatch(closeModal(ModalType.BoxOpenModal));
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <Modal
            show={nftWarningModal || openBoxModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            dialogClassName="modal-class modal-md modal-center"
        >
            <button type="button" onClick={handleClose} className="close modal-close-btn" data-dismiss="modal" aria-label="Close">
                <img src={ModalCloseImg} alt="modal-closeImg" />
            </button>
            <div className="modal-body connect-wallet-wrap">
                <div className="modal-inner-area">
                    <div className="wallet-icon-box">
                        <img src={WarningImg} alt="wallet-Img" />
                    </div>
                    <h4>{nftWarningModal ? "You are inactive by admin" : "Are You Sure You Want to Open box"}</h4>
                </div>
            </div>
            <div className="modal-footer modal-footer1">
                <button type="submit" onClick={handleClose} className="btn btn-secondary">{nftWarningModal ? "Ok" : "No"}</button>
                {openBoxModal ?
                    <button type="submit" onClick={handleBoxOpen} className="btn btn-secondary">Yes</button>
                    : ""
                }
            </div>
        </Modal>
    )
}