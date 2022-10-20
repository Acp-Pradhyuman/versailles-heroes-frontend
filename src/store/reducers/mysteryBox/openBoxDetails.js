import { MYSTERYBOX } from "../../actions";

const defaultState = { name: "", _id: "" }

const openBoxReducer = (state = { openBoxData: defaultState }, action) => {
    switch (action.type) {
        case MYSTERYBOX.OPEN_BOX_DETAILS:
            return { ...state, openBoxData: action.payload }
        default:
            return state;
    }
}

export { openBoxReducer }