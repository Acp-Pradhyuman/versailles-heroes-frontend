import { MYSTERYBOX } from "../../actions";

const defaultState = { _id: "", box_type: null, price: null, boxName: "", boxImage: "" }

const boxDetailsReducer = (state = { boxData: defaultState }, action) => {
    switch (action.type) {
        case MYSTERYBOX.BOX_DETAILS:
            return { ...state, boxData: action.payload }
        default:
            return state;
    }
}

export { boxDetailsReducer }