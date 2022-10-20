import { USERDETAILS } from "../../actions";

const defaultState = { selectedTabName: "" }

const userProfileTabReducer = (state = defaultState, action) => {
    switch (action.type) {
        case USERDETAILS.OPEN_USER_DETAILS_PAGE_NAME:
            return { ...state, selectedTabName: action.payload }
        default:
            return state;
    }
}
export { userProfileTabReducer }