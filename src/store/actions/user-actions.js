import { USERDETAILS } from "./action-types";

const setUserHeroesList = (payload) => ({
    type: USERDETAILS.USER_ALL_HEROES_LIST,
    payload,

});

const setUserSaleToken = (payload) => ({
    type: USERDETAILS.USER_HERO_SALE_TOKEN,
    payload
});

const setUserSaleNftMarketId = (payload) => ({
    type: USERDETAILS.USER_SALE_NFT_MARKETID,
    payload
});

const setUserNftStatus = (payload) => ({
    type: USERDETAILS.USER_NFT_STATUS,
    payload
});

const setUserNftSaleStatus = (payload) => ({
    type: USERDETAILS.USER_NFT_SALE_STATUS,
    payload
});

const setUserNftBuyData = (payload) => ({
    type: USERDETAILS.USER_NFT_BUY_DETAILS,
    payload
});

const setUserNftTransactionHash = (payload) => ({
    type: USERDETAILS.USER_NFT_BUY_HASH,
    payload
});

const setOpenUserDetailsPage = (payload) => ({
    type: USERDETAILS.OPEN_USER_DETAILS_PAGE_NAME,
    payload
});

const setUserWeaponStatus = (payload) => ({
    type: USERDETAILS.USER_WEAPON_NFT_STATUS,
    payload
});

const setUserSaleNftName = (payload) => ({
    type: USERDETAILS.USER_SALE_NFT_NAME,
    payload
});

const setUserOnSaleStatus = (payload) => ({
    type: USERDETAILS.USER_WEAPON_ONSALE_STATUS,
    payload
});

const setUserNftUpgradeDetails = (payload) => ({
    type: USERDETAILS.USER_NFT_UPGRADE_DETAILS,
    payload
});


export {
    setUserHeroesList, setUserSaleToken, setUserSaleNftMarketId, setUserNftStatus,
    setUserNftSaleStatus, setUserNftBuyData, setUserNftTransactionHash, setOpenUserDetailsPage,
    setUserWeaponStatus, setUserSaleNftName, setUserOnSaleStatus, setUserNftUpgradeDetails,
}