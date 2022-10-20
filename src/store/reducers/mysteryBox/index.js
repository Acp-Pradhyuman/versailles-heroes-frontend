import { combineReducers } from "redux";
import { currencyReducer } from "./currency";
import { quantityReducer } from "./quantity";
import { boxDetailsReducer } from "./boxDetails";
import { GetTransferBoxReducer } from "./getTransferBox";
import { boxPurchaseDetailsReducer } from "./boxPurchaseDetails";
import { boxNotificationStatusReducer } from "./boxNotificationStatus";
import { openBoxReducer } from "./openBoxDetails";
import { BoxStatusReducer } from "./boxStatus";

const MysteryBoxesReducer = combineReducers({
    currency: currencyReducer,
    boxQuantity: quantityReducer,
    boxDetails: boxDetailsReducer,
    boxPurchase: boxPurchaseDetailsReducer,
    getTransferBox: GetTransferBoxReducer,
    boxNotificationStatus: boxNotificationStatusReducer,
    openBoxDetails: openBoxReducer,
    boxStatus: BoxStatusReducer,
});

export { MysteryBoxesReducer }