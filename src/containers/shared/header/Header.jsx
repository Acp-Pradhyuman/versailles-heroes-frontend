import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Notification from "../../../assets/images/icon/notifications.svg";
import Inventory from "../../../assets/images/icon/inventory.svg";
import Setting from "../../../assets/images/icon/setting.svg";
import Wallet from "../../../assets/images/icon/wallet.svg";
import Logout from "../../../assets/images/icon/logout.svg";
import CopyImg from "../../../assets/images/copy.svg"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from "react-redux";
import {
  openModal, setConnectedUser, setNonConnectedUser, setWalletConnected, setWalletAddress,
  setWalletBalance, setUserEmail, setUserProfileData, setOpenUserDetailsPage, setUserStatus
} from "../../../store";
import { checkEthNetwork, ModalType, getUserBalance } from "../../../core";
import { apiCreateUser, apiLogoutUser } from "../../../api";
import axios from "axios";
import { browserName } from "react-device-detect";
import MOH from "../../../abi/MOH.json";

export default function Header() {
  const dispatch = useDispatch();
  const ref = useRef();
  const UrlLocation = useLocation();

  const walletConnectStatus = useSelector((state) => state.auth.user.walletConnectStatus);

  const walletAddress = useSelector((state) => state.auth.user.walletAddress);
  const walletBalance = useSelector((state) => state.auth.user.walletBalance);
  const userProfileData = useSelector((state) => state.auth.user.profileData);

  const [showDiv, setShowDiv] = useState(false);
  // const [connect, setConnet] = useState(false);
  const [copy, setCopy] = useState(false);
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState({});

  const handleUserDetails = () => {
    setShowDiv(showDiv ? false : true);
  }
  const getIp = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    setIp(res.data.IPv4);
  }

  const getLocation = async () => {
    await navigator.geolocation.getCurrentPosition(res => {
      setLocation(res);
    });
  }

  async function fetchApiCreateUser() {
    try {
      const userData = { wallet_address: walletAddress, ip: ip, location: location, browser_agent: browserName }
      const res = await apiCreateUser(userData);
      if (res && res.status && res.status === "success") {
        dispatch(setUserStatus(true));
        dispatch(setUserEmail(res.data.email));
        dispatch(setUserProfileData({ userName: res.data.username, profile_picture: res.data.profile_picture }))
        if (res.data && res.data.email !== "") {
          const { _id, access_token, refresh_token } = res.data;
          localStorage.setItem("token", JSON.stringify(access_token));
          dispatch(setConnectedUser({ id: _id, token: access_token, refreshToken: refresh_token }));
        }
        else {
          const { _id } = res.data;
          dispatch(setNonConnectedUser(_id));
        }
      }
      else {
        dispatch(setUserStatus(false));
        dispatch(setUserEmail(""));
      }


    }
    catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    if (!ip) {
      getIp();
    }
    if (!location) {
      getLocation();
    }
    if (walletAddress) {
      fetchApiCreateUser();
    }
  }, [walletAddress, walletConnectStatus, ip]);


  const handleUserConnect = async () => {
    if (window.ethereum && window.ethereum !== "undefined" && window.ethereum.networkVersion === '97') {
      console.log("qwtyu ============ ");

      // res[0] for fetching a first wallet
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => {
          accountChangehandleUserConnect(res[0])
        });


      dispatch(openModal(ModalType.LoginRegisterModal));
    } else if (checkEthNetwork()) {
      dispatch(openModal(ModalType.SwitchNetworkModal));
    } else {
      dispatch(openModal(ModalType.DownloadMetaMask));
    }
  }


  const getbalance = async (address) => {
    const userBalance = await getUserBalance(address);
    dispatch(setWalletBalance(userBalance));
  };

  // Function for getting handling all events
  const accountChangehandleUserConnect = (account) => {
    // Setting an address data
    console.log("account ============= ", account);
    dispatch(setWalletAddress(account));
    // setAddress(account);
    console.log("metamask:-", walletAddress);

    // Setting a balance
    getbalance(account);
  };

  const handleLogOut = async () => {
    // setConnet(false);
    try {
      const { data } = await apiLogoutUser();
    }
    catch (error) {
      console.log(error);
    }
    dispatch(setWalletConnected(false));
  }

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (showDiv && ref.current && !ref.current.contains(e.target)) {
        setShowDiv(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [showDiv])

  const UserDetails = () => <div className="progile-images-inner">
    <div>
      <h4>{userProfileData && userProfileData.userName ? userProfileData.userName : ""}</h4>
      <span className="ml-3">{`${walletAddress.substring(
        0,
        5
      )}...${walletAddress.substring(
        walletAddress.length - 4
      )}`} <CopyToClipboard text={walletAddress}
        onCopy={() => setCopy(true)}>
          <img src={CopyImg} style={{ width: "20px", marginLeft: "5px", cursor: "pointer" }} alt="copyimg" />
        </CopyToClipboard> </span>
    </div>

    <div>
      <h4>BALANCE</h4>
      <h4>{walletBalance && walletBalance.usdt ? walletBalance.usdt : '0.0'} USDT</h4>
      <span className="ml-3"></span>
    </div>
    <ul className="profile-list-wrap">
      <li>
        <Link to="/notifications">
          <img src={Notification} alt="notification" />
          Notifications
        </Link>
      </li>
      <li>
        <Link to="/allHeros" onClick={() => dispatch(setOpenUserDetailsPage("Inventory"))}>
          <img src={Inventory} alt="inventory" />
          Inventory
        </Link>
      </li>
      <li>
        <Link to="/allHeros" onClick={() => dispatch(setOpenUserDetailsPage("Account Setting"))}>
          <img src={Setting} alt="setting" />Account Setting</Link>
      </li>
      <li>
        <Link to="/allHeros" onClick={() => dispatch(setOpenUserDetailsPage("Wallet"))}>
          <img src={Wallet} alt="wallet" />Wallet</Link>
      </li>
      <li>
        <Link to="/" onClick={handleLogOut}>
          <img src={Logout} alt="logout" />Logout</Link>
      </li>
    </ul>
  </div>


  return (
    <div className="header-main-wrapper py-2 mb-lg-5 mb-sm-4 mb-4">
      <nav className="navbar navbar-expand-lg header-menu-wrap navbar-light bg-transparent internal-head">
        <div className="container container1 mobile-menu-wrap">
          <Link to="/" className="navbar-brand">
            <img src={require("../../../assets/images/logo.png")} alt="logo" />
          </Link>
          <button
            className="navbar-toggler py-2 rounded-0"
            type="button"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars"></i>
          </button>

          <ul className="navbar-nav space m-auto header-nav-menu">
            <li className="nav-item active">
              <Link to="/" className={`nav-link ${UrlLocation && UrlLocation.pathname === "/" ? "active" : ""}`} >
                Mystery Boxes
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/marketplace" className={`nav-link ${UrlLocation && UrlLocation.pathname === "/marketplace" ? "active" : ""}`} >
                Marketplace
              </Link>
            </li>
          </ul>

          <div className="header-left-side">
            <Link to="/help-center" className="help-center-wrap">
              <img src={require("../../../assets/images/icon/Icon-headset.png")} alt="icon-headset" />
              Help Center
            </Link>
            <button style={{ position: "relative", background: "none", border: "none" }} onClick={walletConnectStatus ? handleUserDetails : handleUserConnect} className="btn-style profile-image-toggle" ref={ref}>
              <img src={walletConnectStatus ? userProfileData && userProfileData.profile_picture ? userProfileData.profile_picture : "" : require("../../../assets/images/icon/btn-style1.png")} alt="btn-style1" className={walletConnectStatus ? "profile_img" : ""} />
              {walletConnectStatus ? showDiv ? <UserDetails /> : null : <span style={{ textAlign: "center" }}>Connect</span>}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}