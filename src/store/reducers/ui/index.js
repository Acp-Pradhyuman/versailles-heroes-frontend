import { combineReducers } from "redux";
import modalReducer from "./modal";

const uiReducers = combineReducers({
  modal: modalReducer,
});

export { uiReducers };
