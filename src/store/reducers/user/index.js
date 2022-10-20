import { combineReducers } from "redux";
import { UserHeroesListReducer } from "./UserHeroList";
import { UserHeroSaleReducer } from "./userNftDetails";
import { UserNftStatusChangeReducer } from "./userNftStatusChange";
import { UserNftSaleStatusReducer } from "./userNftSaleStatusChange";
import { UserNftBuyReducer } from "./UserNftBuyDetails";
import { UserNftHashReducer } from "./NftTransactionHash";
import { userProfileTabReducer } from "./userProfileTab";
import { UserWeaponNftStatusChangeReducer } from "./userWeaponNftStatus";
import { UserNftUpgradeReducer } from "./userNftUpgradeDetails";

const UserReducer = combineReducers({
    UserHeroesDetails: UserHeroesListReducer,
    UserNftSaleDetails: UserHeroSaleReducer,
    UserNftStatus: UserNftStatusChangeReducer,
    UserNftSaleStatus: UserNftSaleStatusReducer,
    UserNftBuyDetails: UserNftBuyReducer,
    UserNftTransactionHash: UserNftHashReducer,
    UserSelectedTabName: userProfileTabReducer,
    userWeaponNftStatus: UserWeaponNftStatusChangeReducer,
    userNftUpgradeDetails: UserNftUpgradeReducer,




});

export { UserReducer }