import { URL } from "./_urls";
import { get } from "lodash";
import { http } from "../core";

const marketPlaceHeroesList = async (data) => {
    console.log("apidata", data)
    const response = await http.post(URL.MARKET_PLACE_HEROES(), data);
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data", "");
        throw new Error(errorMessage || "Something went wrong!");
    }
    return response || null;
}

const getAllSkinRarity = async () => {
    const response = await http.get(URL.GET_ALL_SKIN_RARITY());
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data", "");
        throw new Error(errorMessage || "Something went wrong!");
    }
    return response || null;
}

const getAllHeroRarity = async () => {
    const response = await http.get(URL.GET_ALL_HERO_RARITY());
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data", "");
        throw new Error(errorMessage || "Something went wrong!");
    }
    return response || null;
}

const marketPlaceWeaponsList = async (data) => {
    const response = await http.post(URL.MARKET_PLACE_WEAPONS(), data);
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data", "");
        throw new Error(errorMessage || "Something went wrong!");
    }
    return response || null;
}

const getAllWeaponRarity = async () => {
    const response = await http.get(URL.GET_ALL_WEAPON_RARITY());
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data", "");
        throw new Error(errorMessage || "Something went wrong!");
    }
    return response || null;
}

const ListOfAllWeapons = async () => {
    const response = await http.get(URL.LIST_OF_ALL_WEAPONS());
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data", "");
        throw new Error(errorMessage || "Something went wrong!");
    }
    return response || null;
}

const ListOfAllHeroes = async () => {
    const response = await http.get(URL.LIST_OF_ALL_HEROES());
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data", "");
        throw new Error(errorMessage || "Something went wrong!");
    }
    return response || null;
}

export {
    marketPlaceHeroesList, getAllSkinRarity, getAllHeroRarity, marketPlaceWeaponsList,
    getAllWeaponRarity, ListOfAllWeapons, ListOfAllHeroes
}