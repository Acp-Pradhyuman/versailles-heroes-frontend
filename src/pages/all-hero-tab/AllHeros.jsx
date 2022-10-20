import React, { useEffect, useState } from "react";

import { Tab, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ethers, Wallet } from 'ethers'
import Web3Modal from 'web3modal'
import NFT from "../../abi/NFT2.json"
import { Inventory } from "./inventory";
import { AccountSetting } from "./account-setting";
import { WalletDetails } from "./wallet";
import { History } from "./history";
import { Upgrade } from "./upgrade";
import { Sell } from "./sell";
import { OngoingSale } from "./ongoing-sale";
import CopyImg from "../../assets/images/copy.svg";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from "react-redux";
import { apiListOfAllHeroes, apiListOfAllWeapons } from "../../api";
import { setOpenUserDetailsPage } from "../../store"


export default function AllHeros() {
	const dispatch = useDispatch();
	const [userAllHeroes, setUserAllHeroes] = useState([]);
	const [userAllWeapons, setUserAllWeapons] = useState([]);
	const walletAddress = useSelector((state) => state.auth.user.walletAddress);
	const userProfileData = useSelector((state) => state.auth.user.profileData);
	const refreshPage = useSelector((state) => state.userDetails.UserNftStatus);
	const selectedTab = useSelector((state) => state.userDetails.UserSelectedTabName.selectedTabName);
	const weaponStatus = useSelector((state) => state.userDetails.userWeaponNftStatus.status);

	const [copy, setCopy] = useState(false);

	useEffect(() => {
		fetchUserAllHeros();
	}, [refreshPage]);

	useEffect(() => {
		fetchUserAllWeapons();
	}, [weaponStatus]);

	const fetchUserAllHeros = async () => {
		try {
			const { data } = await apiListOfAllHeroes(walletAddress);
			const res = data.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) });
			setUserAllHeroes(res);
		}
		catch (error) {
			console.log(error);
		}
	}

	const fetchUserAllWeapons = async () => {
		try {
			const { data } = await apiListOfAllWeapons(walletAddress);
			const res = data.data.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) });
			setUserAllWeapons(res);
		}
		catch (error) {
			console.log(error);
		}
	}

	const handleTabChange = (tabName) => {
		dispatch(setOpenUserDetailsPage(tabName));
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12 text-center top-heading-area">
					<img src={userProfileData && userProfileData.profile_picture ? userProfileData.profile_picture : ""} alt="hero login" />
					<h4>{userProfileData && userProfileData.userName ? userProfileData.userName : ""}</h4>
					<span className="ml-3">{`${walletAddress.substring(
						0,
						9
					)}...${walletAddress.substring(
						walletAddress.length - 9
					)}`} <CopyToClipboard text={walletAddress}
						onCopy={() => setCopy(true)}>
							<img src={CopyImg} style={{ width: "20px", height: 20, marginLeft: "-1px", cursor: "pointer" }} alt="copyimg" />
						</CopyToClipboard> </span>
				</div>
			</div>
			<div className="row mt-5">
				<div className="col-md-12 account-details-col">
					<Tab.Container activeKey={selectedTab ? selectedTab : "Inventory"}>
						<Nav className="account-details-list" >
							<button onClick={() => handleTabChange("Inventory")}>
								<Nav.Link eventKey="Inventory">Inventory</Nav.Link>
							</button>
							<button onClick={() => handleTabChange("Account Setting")}>
								<Nav.Link eventKey="Account Setting">Account Setting</Nav.Link>
							</button>
							<button onClick={() => handleTabChange("Wallet")}>
								<Nav.Link eventKey="Wallet">Wallet</Nav.Link>
							</button>
							<button onClick={() => handleTabChange("History")}>
								<Nav.Link eventKey="History">History</Nav.Link>
							</button>
							<button onClick={() => handleTabChange("Upgrade")}>
								<Nav.Link eventKey="Upgrade">Upgrade</Nav.Link>
							</button>
							<button onClick={() => handleTabChange("Sell")}>
								<Nav.Link eventKey="Sell">Sell</Nav.Link>
							</button>
							<button onClick={() => handleTabChange("Ongoing Sale")}>
								<Nav.Link eventKey="Ongoing Sale">Ongoing Sale</Nav.Link>
							</button>
						</Nav>
						<Tab.Content className="account-details-tab-content">
							<Inventory userAllHeroesData={userAllHeroes} userAllWeaponsData={userAllWeapons} />
							<AccountSetting />
							<WalletDetails />
							<History />
							<Upgrade userAllHeroesData={userAllHeroes} userAllWeaponsData={userAllWeapons} />
							<Sell userAllHeroesData={userAllHeroes} userAllWeaponsData={userAllWeapons} />
							<OngoingSale />
						</Tab.Content>
					</Tab.Container>
				</div>
			</div>
		</div>
	);
}