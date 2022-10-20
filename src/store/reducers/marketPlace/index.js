import { selectedHeroDetailReducer } from "./selectedHeroDetails";
import { combineReducers } from "redux";

const marketPlaceReducer = combineReducers({
    chooseAvatarFilterData: selectedHeroDetailReducer,
});

export { marketPlaceReducer }