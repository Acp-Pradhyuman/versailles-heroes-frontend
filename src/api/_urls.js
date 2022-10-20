import { CONFIG } from "../config";

export const URL = {
    CREATE_USER: () => `${CONFIG.API_URL}/users/createUser`,
    GET_OTP: (email, otpType) => `${CONFIG.API_URL}/users/getOtp?otp_type=${otpType}&email=${email}`,
    REGISTER_EMAIL: () => `${CONFIG.API_URL}/users/registerUserEmail`,
    LOGOUT_USER: () => `${CONFIG.API_URL}/users/logout`,
    USER_DETAILS: () => `${CONFIG.API_URL}/users/getUserDetails`,
    GET_ACCESS_TOKEN: () => `${CONFIG.API_URL}/users/getAccessToken`,
    GET_RATES: (currencyType) => `${CONFIG.API_URL}/currency/getRates?token_name=${currencyType}`,
    FIND: () => `${CONFIG.API_URL}/mysteryBox/find`,
    FIND_ONE: (boxId) => `${CONFIG.API_URL}/mysteryBox/find/one?mystery_box_id=${boxId}`,
    PURCHASE: () => `${CONFIG.API_URL}/mysteryBox/purchase`,
    GETPENDINGTRANSFERS: (userId) => `${CONFIG.API_URL}/mysteryBox/getPendingTransfers?to=${userId}`,
    CHANGETRANSFERBOXSTATUS: () => `${CONFIG.API_URL}/mysteryBox/changeBoxStatus`,
    OPEN_BOX: () => `${CONFIG.API_URL}/hero/nft`,
    SALE_NFT: () => `${CONFIG.API_URL}/hero/saleNft`,
    UPDATE_Profile: () => `${CONFIG.API_URL}/users/updateProfile`,
    LIST_OF_HEROE_OF_USER: (walletAddress) => `${CONFIG.API_URL}/hero/listOfHeroeOfUsers?address=${walletAddress}`,
    MARKET_PLACE_HEROES: () => `${CONFIG.API_URL}/hero/marketplace`,
    USER_ONSALE_HEROES_LIST: (walletAddress) => `${CONFIG.API_URL}/hero/listOfOnSaleHeroeOfUsers?address=${walletAddress}`,
    EDIT_NFT_PRICE: () => `${CONFIG.API_URL}/hero/price`,
    NFT_HERO_PURCHASE: () => `${CONFIG.API_URL}/hero/purchase`,
    GET_ALL_SKIN_RARITY: () => `${CONFIG.API_URL}/hero/getAllSkinRarity`,
    GET_ALL_HERO_RARITY: () => `${CONFIG.API_URL}/hero/getAllHeroRarity`,
    HERO_UPGRADE: () => `${CONFIG.API_URL}/hero/upgrade`,
    TRANSACTION_HISTORY: (tokenCount) => `${CONFIG.API_URL}/hero/transactionHistory?token_count=${tokenCount}`,
    BATTEL_REWARD: () => `${CONFIG.API_URL}/battle/getBattleResult`,
    OPEN_WEAPON_BOX: () => `${CONFIG.API_URL}/hero/openWeapon`,
    USER_WEAPONS: (walletAddress) => `${CONFIG.API_URL}/hero/listOfWeaponOfUsers?address=${walletAddress}`,
    USER_ONSALE_WEAPONS: (walletAddress) => `${CONFIG.API_URL}/hero/listOfOnSaleWeaponeOfUsers?address=${walletAddress}`,
    WEAPON_DETAILS: (nftId) => `${CONFIG.API_URL}/hero/weaponDetails?_id=${nftId}`,
    MARKET_PLACE_WEAPONS: () => `${CONFIG.API_URL}/weapon/marketPlaceWeapon`,
    GET_ALL_WEAPON_RARITY: () => `${CONFIG.API_URL}/weapon/getAllWeaponRarity`,
    LIST_OF_ALL_WEAPONS: () => `${CONFIG.API_URL}/weapon/listOfAllWeapon`,
    USER_ALL_TRANSACTIONS_HISTORY: (userId) => `${CONFIG.API_URL}/hero/transactionHistoryUser?from=${userId}`,
    LIST_OF_ALL_HEROES: () => `${CONFIG.API_URL}/hero/listOfAllHeroes`,
    GET_HERO_DETAILS: (id) => `${CONFIG.API_URL}/hero/heroDetails?_id=${id}`,
    WEAPON_UPGRADE: () => `${CONFIG.API_URL}/hero/weaponUpgrade`,
    UPGRADE_DETAILS: () => `${CONFIG.API_URL}/hero/upgradeDetails`,
}