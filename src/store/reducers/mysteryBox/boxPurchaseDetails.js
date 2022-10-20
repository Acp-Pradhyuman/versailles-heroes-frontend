import { MYSTERYBOX } from "../../actions";

const defaultState = null;

const boxPurchaseDetailsReducer = (state = { boxPurchaseDetails: defaultState }, action) => {
    switch (action.type) {
        case MYSTERYBOX.BOX_PURCHASE:
            return { ...state, boxPurchaseDetails: action.payload }
        default:
            return state
    }
}

export { boxPurchaseDetailsReducer }