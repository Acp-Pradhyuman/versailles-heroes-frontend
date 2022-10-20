import { AUTH } from "./action-types";

const loadAuth = () => ({
    type: AUTH.LOAD
});

const clearAuth = () => ({
    type: AUTH.CLEAR
});

const setConnectedUser = (payload) => ({
    type: AUTH.SET_CONNECTED_USER,
    payload
});

const setNonConnectedUser = (payload) => ({
    type: AUTH.SET_NOT_CONNECTED_USER,
    payload
});

const setWalletConnected = (payload) => ({
    type: AUTH.WALLET_CONNECTED,
    payload
});

const setWalletAddress = (payload) => ({
    type: AUTH.WALLET_ADDRESS,
    payload
});

const setWalletBalance = (payload) => ({
    type: AUTH.WALLET_BALANCE,
    payload,
});

const setUserEmail = (payload) => ({
    type: AUTH.EMAIL,
    payload,
});

const setUserProfileData = (payload) => ({
    type: AUTH.USER_PROFILE_DATA,
    payload,
});

const setUserStatus = (payload) => ({
    type: AUTH.USER_ACTIVE_STATUS,
    payload,
})


export {
    loadAuth, clearAuth, setConnectedUser, setNonConnectedUser, setWalletConnected, setWalletAddress,
    setWalletBalance, setUserEmail, setUserProfileData, setUserStatus
}