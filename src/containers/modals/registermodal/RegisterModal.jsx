import React, { useState, useEffect } from "react";
import { closeModal, openModal, setWalletConnected, setUserEmail, setConnectedUser, setWalletBalance, setWalletAddress } from "../../../store";
import { ModalType } from "../../../core";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { apiGetOtp, apiRegisterEmail } from "../../../api";
import { OtpType, connectUserToMetaMask, getUserBalance } from "../../../core";
import CHECK_ICON from '../../../../src/assets/images/icon/check-icon.svg'


export default function RegisterModal() {
    const userEmail = useSelector((state) => state.auth.user.email);
    console.log("useEmail", userEmail);
    const userId = useSelector((state) => state.auth.user.id);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [enterCode, setEnterCode] = useState("");
    const [otpError, setOtpError] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [seconds, setSeconds] = useState();

    const dispatch = useDispatch();
    const isRegisterModalOpen = useSelector((state) => state.ui.modal[ModalType.RegisterModal] || false);
    const isLoginModalOpen = useSelector((state) => state.ui.modal[ModalType.LoginModal] || false);
    const walletAddress = useSelector((state) => state.auth.user.walletAddress);

    const handleClose = () => {
        dispatch(closeModal(isRegisterModalOpen ? ModalType.RegisterModal : ModalType.LoginModal));
    }

    async function fetchapiGetOtp() {
        try {
            const { data } = await apiGetOtp(email, OtpType.Registration);
            setOtp(data.otp);
            setSeconds(60);
            console.log(data.otp)
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleSendCode = () => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email)) {
            setErrorMsg("Invalid Email id!");
            return
        }
        fetchapiGetOtp();
    }

    const handleEmailChange = (event) => {
        setErrorMsg("")
        setEmail(event.target.value);
    }

    async function fetchRegisterEmail() {
        try {
            const registerDetails = { otp: enterCode, email: email, user_id: userId }
            const { data } = await apiRegisterEmail(registerDetails);
            dispatch(setUserEmail(data.email));
            dispatch(setWalletConnected(true));
            getbalance();
            if (data && data.access_token) {
                const { _id, access_token, refresh_token } = data;
                dispatch(setConnectedUser({ id: _id, token: access_token, refreshToken: refresh_token }));

                localStorage.setItem("token", JSON.stringify(data.access_token));
            }
            handleClose();
        }
        catch (error) {
            const parseData = JSON.parse(error.message)
            if (parseData.codeName === "DuplicateKey") {
                setErrorMsg("This email is invalid or already connected to another wallet")
            }
            console.log(error)
        }
    }

    const getbalance = async () => {
        const userBalance = await getUserBalance(walletAddress);
        dispatch(setWalletBalance(userBalance));
    };

    const handleRegister = () => {
        if (userEmail === "" && enterCode === otp) {
            fetchRegisterEmail();
        }
        else if (enterCode !== otp) setOtpError("Enter Valid Otp")
        else setErrorMsg("already registerd go to login page");
    }

    const handleLogin = () => {
        if (email === userEmail && otp === enterCode) {
            // fetchRegisterEmail()
            handleClose();
            getbalance();
            dispatch(setWalletConnected(true));
        }
        else if (enterCode !== otp) setOtpError("Enter Valid Otp");
        else setErrorMsg(userEmail === "" ? "you have to register first" : "Enter valid Email");
    }

    const handleEnterCode = (event) => {
        setOtpError("");
        setErrorMsg("");
        setEnterCode(event.target.value);
    }

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    }, [seconds]);

    return (
        <Modal
            show={isRegisterModalOpen || isLoginModalOpen}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            dialogClassName="modal-class modal-md modal-center"
        >

            <button onClick={handleClose} type="button" className="close modal-close-btn" data-dismiss="modal" aria-label="Close">x</button>
            <div className="modal-body">
                <div className="modal-inner-area">
                    <h4>{isRegisterModalOpen ? "Register" : "Login"}</h4>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
                    <form className="modal-form-style">
                        <div className="form-group over-label lg">
                            <div className="position-relative">
                                <input type="email" onChange={handleEmailChange} className="form-control font-16" id="email" placeholder="user@mail.com" />
                                <img src={CHECK_ICON} className="value-found" />
                            </div>
                            <label className="label" htmlFor="email">Email</label>
                            <span className="errorMsg">{errorMsg}</span>
                        </div>
                        <div className="d-flex modal-form-inner">
                            <div className="form-group over-label lg">
                                <input type="password" onChange={handleEnterCode} className="form-control font-16" id="email" placeholder="******" />
                                <label className="label" htmlFor="email">Enter CODE</label>
                                <span className="errorMsg">{otpError}</span>
                            </div>
                            {seconds && seconds !== null ? <button className="btn btn-primary" disabled={seconds}>Resend Code In {seconds}</button> : <button type="button" disabled={!email} onClick={handleSendCode} className="btn btn-primary">Send Code</button>}
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal-footer modal-footer1">
                <button type="button" disabled={!email || !enterCode} onClick={isRegisterModalOpen ? handleRegister : handleLogin} className="btn btn-primary">{isRegisterModalOpen ? "Register" : "Login"}</button>
            </div>
        </Modal>
    );
}
