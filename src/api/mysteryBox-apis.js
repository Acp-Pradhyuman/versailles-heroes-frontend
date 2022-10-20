import { http } from "../core";
import { get } from "lodash";
import { URL } from "./_urls";
import apiClient from "./apiClient";
import Axios from "../core/api-caller";

const apiMysteryBox = async () => {
    const response = await http.get(URL.FIND());
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

const apiMysteryBoxDetails = async (id) => {
    const response = await http.get(URL.FIND_ONE(id));
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

const apiMysteryBoxPurchase = async (data) => {
    const response = await Axios.post(URL.PURCHASE(), data);
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

const apiGetPendingTransfer = async (userId) => {
    const response = await Axios.get(URL.GETPENDINGTRANSFERS(userId));
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

const apiChangeTransferBoxStatus = async (boxStatus) => {
    const response = await http.put(URL.CHANGETRANSFERBOXSTATUS(), boxStatus);
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

const apiOpenBox = async (data) => {
    const response = await Axios.post(URL.OPEN_BOX(), data);
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

const apiOpenWeaponBox = async (data) => {
    const response = await Axios.post(URL.OPEN_WEAPON_BOX(), data);
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;
}

export {
    apiMysteryBox, apiMysteryBoxDetails, apiMysteryBoxPurchase, apiGetPendingTransfer,
    apiChangeTransferBoxStatus, apiOpenBox, apiOpenWeaponBox
}