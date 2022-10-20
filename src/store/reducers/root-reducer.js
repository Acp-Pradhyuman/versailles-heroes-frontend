import { combineReducers } from "redux";
import { uiReducers } from "./ui";
import { authReducer } from "./auth";
import { MysteryBoxesReducer } from "./mysteryBox";
import { UserReducer } from "./user";
import { marketPlaceReducer } from "./marketPlace";

const rootReducer = combineReducers({
    ui: uiReducers,
    auth: authReducer,
    MysteryBoxes: MysteryBoxesReducer,
    userDetails: UserReducer,
    marketPlace: marketPlaceReducer,
});

export { rootReducer };
