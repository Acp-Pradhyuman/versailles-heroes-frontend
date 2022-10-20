import { MYSTERYBOX } from "../../actions";

const defaultState = null;

const GetTransferBoxReducer = (state = { getTransferBoxData: defaultState }, action) => {
    switch (action.type) {
        case MYSTERYBOX.GET_TRANSFER_BOX_DETAILS:
            return { ...state, getTransferBoxData: action.payload }
        default:
            return state;
    }
}
export { GetTransferBoxReducer }