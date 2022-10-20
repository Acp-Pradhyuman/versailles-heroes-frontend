import { http } from "../core";
import { URL } from "./_urls";
import { get } from "lodash";
import Axios from "../core/api-caller";

const apiCreateUser = async (userData) => {
    const response = await http.post(URL.CREATE_USER(), userData);
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data", "");
        throw new Error(errorMessage || "Something went wrong!");
    }
    return response || null;
};

const apiGetOtp = async (email, otpType) => {
    const response = await http.get(URL.GET_OTP(email, otpType));
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong!");
    }
    return response || null;
}

const apiRegisterEmail = async (registerDetails) => {
    const response = await http.post(URL.REGISTER_EMAIL(), registerDetails);
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.err", "");
        throw new Error(JSON.stringify(errorMessage) || "Something went wrong!");
    }
    return response || null;
}

const apiLogoutUser = async () => {
    const response = await Axios.post(URL.LOGOUT_USER());
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong!");
    }
    return response || null;
}

const apiGetUserDetails = async () => {
    const response = await http.get(URL.USER_DETAILS());
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

const apiChangeProfileImage = async () => {
    const response = await http.post(URL.UPDATE_Profile());
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;

}

const apiListOfAllHeroes = async (walletAddress) => {
    const response = await http.get(URL.LIST_OF_HEROE_OF_USER(walletAddress));
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;

}

const apiSaleNft = async (data) => {
    const response = await Axios.post(URL.SALE_NFT(), data);
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

const apiOnSaleHeroesList = async (walletAddress) => {
    const response = await Axios.get(URL.USER_ONSALE_HEROES_LIST(walletAddress));
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;

}

const apiEditNftPrice = async (data) => {
    const response = await Axios.put(URL.EDIT_NFT_PRICE(), data);
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

const apiNftHeroPurchase = async (data) => {
    const response = await Axios.post(URL.NFT_HERO_PURCHASE(), data);
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

const apiHeroUpgrade = async (data) => {
    const response = await Axios.post(URL.HERO_UPGRADE(), data);
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;

}

const apiNftTransactionHistory = async (tokenCount, data) => {
    const response = await http.get(URL.TRANSACTION_HISTORY(tokenCount), data);
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

const apiGetBattleReward = async () => {
    const response = await http.get(URL.BATTEL_REWARD());
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

const apiListOfAllWeapons = async (walletAddress) => {
    const response = await Axios.get(URL.USER_WEAPONS(walletAddress));
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

const apiOnSaleWeaponsList = (walletAddress) => {
    const response = Axios.get(URL.USER_ONSALE_WEAPONS(walletAddress));
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

const apiUserWeaponDetails = async (nftId) => {
    const response = await Axios.get(URL.WEAPON_DETAILS(nftId));
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

const getUserAllTransactions = async (userId) => {
    const response = await Axios.get(URL.USER_ALL_TRANSACTIONS_HISTORY(userId));
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

const getHeroDetails = async (id) => {
    const response = await Axios.get(URL.GET_HERO_DETAILS(id));
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

const apiWeaponUpgrade = async (data) => {
    const response = await Axios.post(URL.WEAPON_UPGRADE(), data);
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

const apiUpgradeDetails = async () => {
    const response = await Axios.get(URL.UPGRADE_DETAILS());
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

export {
    apiCreateUser, apiGetOtp, apiRegisterEmail, apiLogoutUser, apiGetUserDetails,
    apiChangeProfileImage, apiListOfAllHeroes, apiSaleNft, apiOnSaleHeroesList, apiEditNftPrice,
    apiNftHeroPurchase, apiHeroUpgrade, apiNftTransactionHistory, apiGetBattleReward, apiListOfAllWeapons,
    apiOnSaleWeaponsList, apiUserWeaponDetails, getUserAllTransactions, getHeroDetails, apiWeaponUpgrade,
    apiUpgradeDetails
}