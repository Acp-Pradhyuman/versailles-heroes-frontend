import React, { useState, useEffect } from "react";
import { Tab, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { openModal, setWalletBalance, setOpenBoxDetails } from "../../../store";
import { ModalType, getUserBalance } from "../../../core";
import Axios from "../../../core/api-caller";
import axios from "axios";
import Doler from "../../../assets/images/icon/doler-icon.svg";
import tokenServices from "../../../core/token-services";
import InventoryTransferModal from "./inventoryTransferModal";
import BoxTransferPendingModal from "./BoxTransferPending";
import dropdownimg from "../../../assets/images/dropdown.png"
import { useHistory } from "react-router-dom";
import { DataNotFound } from "../../../containers";

export default function Inventory(props) {
  const userAllHeroesList = props.userAllHeroesData;
  const userAllWeaponsList = props.userAllWeaponsData;

  const [currentTab, setCurrentTab] = useState("HEROES");
  const [mysteryBox, setMysteryBox] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false)
  const [boxTransferInput, setBoxTransferInput] = useState({ quantity: "", price: "" })
  const [boxSelectedForTransfer, setBoxSelectedForTransfer] = useState({
    name: "",
    id: "",
    price: "",
    quantity: "",
    transferAddress: "",
    inventorySelectedOption: "Transfer",
  });

  const [transferValidationMessage, setTransferValidationMessage] =
    useState({ quantity: "", transferMessage: "", amount: "" });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPendingIsOpen, setModalPendingIsOpen] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const walletAddress = useSelector((state) => state.auth.user.walletAddress);
  const { user: { id: userId }, } = useSelector((state) => state.auth);
  const boxStatus = useSelector((state) => state.MysteryBoxes.boxStatus);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleBoxOpen = async (selectedBoxData) => {
    const boxData = { name: selectedBoxData.name, _id: selectedBoxData._id }
    dispatch(setOpenBoxDetails(boxData));
    dispatch(openModal(ModalType.OpenBoxModal));
  };

  const handleTabSelect = (selectedBoxName, selectedBoxId, quantity) => {
    console.log(selectedBoxId);
    console.log(selectedBoxName, selectedBoxId);
    setBoxSelectedForTransfer((prev) => ({
      ...prev,
      name: selectedBoxName,
      id: selectedBoxId,
      quantity,
      inventorySelectedOption: "Transfer",
    }));
    setCurrentTab("TRANSFER");
  };
  // const handleBox = (name) => {
  //   const str = name.substring(0, name.indexOf(" "));
  //   return str.toLowerCase();
  // };
  const validateTransfer = () => {
    if (boxTransferInput.quantity <= 0) {
      setTransferValidationMessage((prev) => ({ ...prev, quantity: `least transferable quantity is 1` }))
      setTimeout(() => {
        setTransferValidationMessage({ transferMessage: "", quantity: "", amount: "" });
      }, 2000);

      return false;
    }


    if (!boxTransferInput.quantity) {
      setTransferValidationMessage((prev) => ({ ...prev, quantity: `Quantity is Required` }))
      setTimeout(() => {
        setTransferValidationMessage({ transferMessage: "", quantity: "", amount: "" });
      }, 2000);

      return false;
    }

    if (boxTransferInput.quantity > boxSelectedForTransfer.quantity) {
      setTransferValidationMessage((prev) => ({ ...prev, quantity: `can't transfer more than ${boxSelectedForTransfer.quantity} boxes` }))
      setTimeout(() => {
        setTransferValidationMessage({ transferMessage: "", quantity: "", amount: "" });
      }, 2000);

      return false;
    }

    if (!boxTransferInput.price) {
      setTransferValidationMessage((prev) => ({ ...prev, amount: `Amount is Required` }))
      setTimeout(() => {
        setTransferValidationMessage({ transferMessage: "", quantity: "", amount: "" });
      }, 2000);

      return false;
    }
    if (boxTransferInput.price <= 0) {
      setTransferValidationMessage((prev) => ({ ...prev, amount: `Amount must be greater than 0` }))
      setTimeout(() => {
        setTransferValidationMessage({ transferMessage: "", quantity: "", amount: "" });
      }, 2000);

      return false;
    }
    return true;
  }

  const handleTransfer = async () => {
    console.log("handleTransfer");
    const {
      id: mystery_box_id,
      transferAddress,
    } = boxSelectedForTransfer;
    const { quantity, price } = boxTransferInput;
    console.log("from handle transfer", quantity, price)
    console.log(boxSelectedForTransfer);
    if (validateTransfer()) {
      try {
        const dataToSend = {
          mystery_box_id,
          currency: "usd",
          quantity: Number(quantity),
          price: Number(price),
          to: transferAddress,
          from: userId,
        };
        const { data } = await Axios.post(
          "mysteryBox/createTransfer",
          dataToSend
        );
        console.log(data);

        if (data.success === false) {
          setTransferValidationMessage((prev) => ({ ...prev, transferMessage: data.message }));
          setTimeout(() => {
            setTransferValidationMessage({ transferMessage: "", quantity: "", amount: "" });
          }, 2000);
          return;
        }
        setModalIsOpen(false);
        setModalPendingIsOpen(true);
      } catch (error) {
        setModalIsOpen(false);
        setModalPendingIsOpen(false);
      }
      console.log(modalIsOpen);
    }

  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "quantityTransfer") {
      setBoxTransferInput((prev) => ({ ...prev, quantity: value }))
      return
    }
    if (name === "priceTransfer") {
      setBoxTransferInput((prev) => ({ ...prev, price: value }))
      return
    }
    setBoxSelectedForTransfer((prev) => ({ ...prev, [name]: value }));
    console.log(boxSelectedForTransfer);
  };



  const handleModalClose = () => {
    console.log("handle close");
    setModalIsOpen(false);
  };

  const onSelectHandler = (optionSelected) => {
    setIsOptionModalOpen(false);
    setBoxSelectedForTransfer(prev => ({ ...prev, inventorySelectedOption: optionSelected }))
  }

  const cancelTransferHandler = async (transferId) => {
    console.log("from cancel transfer", transferId);
    const { data } = await Axios.put(`mysteryBox/changeBoxStatus`, {
      id: transferId,
      status: "decline",
    });
    setRefreshPage(!refreshPage)
  };

  const getbalance = async () => {
    const userBalance = await getUserBalance(walletAddress);
    dispatch(setWalletBalance(userBalance));
  };

  useEffect(() => {
    async function fetchMysteryBox() {
      try {
        console.log(tokenServices.getLocalAccessToken());
        const { data } = await Axios.get("mysteryBox/getUserMysteryBoxes");
        const fetchedMysteryBoxes = data.data.map(
          (item) => ({ ...item.mystery_box_details[0], quantity: item.balance - item.blocked_balance })
        );
        console.log(fetchedMysteryBoxes);
        setMysteryBox(fetchedMysteryBoxes);
        getbalance();
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchPendingMysteryBox() {
      try {
        console.log(tokenServices.getLocalAccessToken());
        const { data } = await Axios.get(
          `mysteryBox/getPendingTransfers?from=${userId}`
        );
        const fetchedMysteryBoxes = data.data.map((item) => ({
          ...item.box_detail,
          transferId: item._id,
        }));

        console.log("pending mystery", data.data);
        setMysteryBox(fetchedMysteryBoxes);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchRejectedMysteryBox() {
      try {
        console.log(tokenServices.getLocalAccessToken());
        const { data } = await Axios.get(
          `mysteryBox/getRejectedTransfers?from=${userId}`
        );
        console.log(data)
        if (data.data.length <= 0) {
          setMysteryBox([])
          return
        }
        const fetchedMysteryBoxes = data.data.map((item) => ({
          ...item.box_detail,
          transferId: item._id,
        }));

        console.log("pending mystery", data.data);
        setMysteryBox(fetchedMysteryBoxes);
      } catch (error) {
        console.log(error);
      }
    }
    if (boxSelectedForTransfer.inventorySelectedOption === "Transfer") {
      fetchMysteryBox();
    }
    if (boxSelectedForTransfer.inventorySelectedOption === "Pending") {
      fetchPendingMysteryBox();
    }
    if (boxSelectedForTransfer.inventorySelectedOption === "Rejected") {
      fetchRejectedMysteryBox();
    }
  }, [refreshPage, boxSelectedForTransfer.inventorySelectedOption, boxStatus]);

  return (
    <Tab.Pane eventKey="Inventory">
      <Tab.Container
        defaultActiveKey="HEROES"
        activeKey={currentTab}
        onSelect={(key) => {
          setCurrentTab(key)
          if (key === "BOXES") {
            setBoxSelectedForTransfer((prev) => ({ ...prev, inventorySelectedOption: "Transfer" }))
          }
        }}
      >
        <Nav className="heros-details-list">
          <button>
            <Nav.Link eventKey="HEROES">HEROES</Nav.Link>
          </button>
          <button>
            <Nav.Link eventKey="WEAPONS">WEAPONS</Nav.Link>
          </button>
          <button>
            <Nav.Link eventKey="BOXES">BOXES</Nav.Link>
          </button>
          <button>
            <Nav.Link eventKey="TRANSFER">TRANSFER</Nav.Link>
          </button>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="HEROES">
            <div className="row">
              {userAllHeroesList?.length ?
                userAllHeroesList.map((item) =>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-6 full-width-480" key={item?.token_count} onClick={() => history.push(`/avatar-details/${item?._id}`)} style={{ cursor: "pointer" }}>
                    <div className="all-heroes-tab">
                      <img
                        src={item?.hero_details_data?.compressed_image}
                        alt="hero"
                      />
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
                      <div className="all-heroes-details all-heroes1-details">
                        <h4>{item?.hero_details_data?.name}</h4>
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
                  <div className="col-lg-4 col-md-6 col-sm-6 col-6 full-width-480" key={index} onClick={() => history.push(`/weapon-details/${item?._id}`)} style={{ cursor: "pointer" }}>
                    <div className="all-heroes-tab">
                      <img
                        src={item?.weapon_details_data?.weapon_image}
                        alt="hero"
                      />
                      <ul className="icon-box-ul">
                        <li className="level-li">
                          <p className="level text-uppercase mb-0">level</p>
                          <p className="level_no mb-0">{item?.weapon_details_data?.level}</p>
                        </li>
                        <li className="rank-li">
                          <p className="rank mb-0">S</p>
                        </li>
                      </ul>
                      <div className="all-heroes-details all-heroes1-details">
                        <h4>{item?.weapon_details_data?.name}</h4>
                      </div>
                    </div>
                  </div>
                ) : <DataNotFound />}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="BOXES">
            {modalIsOpen && (
              <InventoryTransferModal
                isOpen={modalIsOpen}
                onChangeHandler={onChangeHandler}
                handleClose={handleModalClose}
                handleTransfer={handleTransfer}
                transferValidationMessage={transferValidationMessage}
                mysteryBoxDetails={boxSelectedForTransfer}
                boxTransferInput={boxTransferInput}
              />
            )}

            {modalPendingIsOpen && (
              <BoxTransferPendingModal
                modalPendingIsOpen={modalPendingIsOpen}
                handleClosePending={() => setModalPendingIsOpen(false)}
              />
            )}

            <div className="row mt-5 ">
              {mysteryBox?.length ?
                mysteryBox.map((item) => {
                  console.log(item.image);
                  return (
                    <div
                      className="col-lg-4 col-md-6 col-sm-6 col-6 full-width-480"
                      key={item._id}
                    >
                      <div className="common-box-style">
                        <img src={item.image} alt="mystery-boxes" />
                        <h3 style={{ padding: "0px", margin: "0px" }}>{item.name}</h3>
                        <h3 className="text-uppercase " style={{
                          padding: "0px", margin: "0px", marginBottom: "15px", marginTop: "5px", color: "#FFFFFF",
                          opacity: "0.7", fontSize: "12px"
                        }}>quantity:{item.quantity}</h3>
                        <button
                          className="btn-style-wrap mb-3"
                          onClick={() => handleBoxOpen(item)}
                          data-dismiss="modal"
                          data-toggle="modal"
                          data-target="#opened-box-modal"
                        >
                          <img
                            src={require("../../../assets/images/icon/btn-style3.png")}
                            alt="btn style3"
                          />
                          <span>OPEN</span>
                        </button>
                        <a
                          className="btn-style-wrap"
                          name={item.name}
                          onClick={() => handleTabSelect(item.name, item._id, item.quantity)}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={require("../../../assets/images/icon/btn-style4.png")}
                            alt="btn style4"
                          />
                          <span>TRANSFER</span>
                        </a>
                      </div>
                    </div>
                  );
                }) : <DataNotFound />}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="TRANSFER">
            <div className="row mt-2 mb-4">
              <div className="col-md-9 left-side-col">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group over-label lg">
                    <input
                      type="text"
                      className="form-control font-16 text-white"
                      name="transferAddress"
                      onChange={onChangeHandler}
                    />
                    <label className="label " htmlFor="email">
                      Enter Receiver's Email/Account address
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => setModalIsOpen(true)}
                    className="btn btn-primary"
                    data-dismiss="modal"
                    data-toggle="modal"
                    data-target="#set-price-modal"
                  >
                    TRANSFER
                  </button>
                </form>
              </div>
              <div className="col-md-3">
                <div className="marketplace-select-box">
                  <div className="custom-select">
                    {/* <select
                      value={boxSelectedForTransfer.inventorySelectedOption}
                      onChange={onChangeHandler}
                      name="inventorySelectedOption"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Transfer">Transfer</option>
                    </select> */}



                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5 ">
              <div className="d-flex justify-content-end w-100 " >
                <div className="dropdown-inventory-container">
                  <div className="dropdown-data-shower" onClick={() => setIsOptionModalOpen(!isOptionModalOpen)}>{boxSelectedForTransfer.inventorySelectedOption} <span style={{ padding: "0px 10px", backgroundColor: "#FFCF0B", color: "white", display: "inline-block", borderRadius: "5px", marginLeft: "10px", cursor: "pointer" }}> <img src={dropdownimg} alt="dropdown" /></span></div>
                  <ul className={`dropdown-menu-inventory  ${isOptionModalOpen ? "dropdown-menu-show" : "hide-inventory-menu"}`} >
                    <li onClick={(() => onSelectHandler("Pending"))}  >Pending</li>
                    <li className=" d-flex "><div style={{ borderBottom: "1px solid #000", width: "80%", opacity: "0.3" }}></div> </li>
                    <li onClick={(() => onSelectHandler("Rejected"))}>Rejected</li>
                    <li className=" d-flex "><div style={{ borderBottom: "1px solid #000", width: "80%", opacity: "0.3" }}></div> </li>

                    <li onClick={(() => onSelectHandler("Transfer"))}>Transfer</li>

                  </ul>
                </div>
              </div>
              {mysteryBox &&
                mysteryBox.map((item) => {
                  console.log(item.image);
                  return (
                    <div
                      className="col-lg-4 col-md-6 col-sm-6 col-6 full-width-480"
                      key={item._id}
                    >
                      <div className="common-box-style">
                        {/*showing radio button on condition only when transfer option is selected */}
                        {boxSelectedForTransfer.inventorySelectedOption ===
                          "Transfer" && (
                            <div className="d-flex justify-content-center">
                              <input
                                type="radio"
                                name="name"
                                value={item.name}
                                checked={
                                  boxSelectedForTransfer.name === item.name
                                    ? "checked"
                                    : ""
                                }
                                onChange={(e) => {
                                  onChangeHandler(e);
                                  setBoxSelectedForTransfer((prev) => ({
                                    ...prev,
                                    id: item._id,
                                    quantity: item.quantity
                                  }));
                                }}
                              />
                            </div>
                          )}
                        <img src={item.image} alt="mystery-boxes" />
                        <h3>{item.name}</h3>
                        {/*showing TransferButton  on condition only when transfer option is selected */}
                        {boxSelectedForTransfer.inventorySelectedOption ===
                          "Transfer" && (
                            <a
                              className="btn-style-wrap"
                              name={item.name}
                              onClick={() => handleTabSelect(item.name, item._id, item.quantity)}
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                src={require("../../../assets/images/icon/btn-style4.png")}
                                alt="btn style4"
                              />
                              <span> TRANSFER</span>
                            </a>
                          )}
                        {/*showing cancelTransferButton  on condition only when pending option is selected */}

                        {boxSelectedForTransfer.inventorySelectedOption ===
                          "Pending" && (
                            <a
                              className="btn-style-wrap"
                              name={item.name}
                              onClick={() =>
                                cancelTransferHandler(item.transferId)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                src={require("../../../assets/images/icon/btn-style3.png")}
                                alt="btn style3"
                              />
                              <span>CANCEL TRANSFER</span>
                            </a>
                          )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Tab.Pane>
  );
}