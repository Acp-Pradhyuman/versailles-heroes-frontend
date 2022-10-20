import { MYSTERYBOX } from "../../actions";

const defaultState = { boxCount: 1 }
const quantityReducer = (state = defaultState, action) => {
    switch (action.type) {
        case MYSTERYBOX.BOX_QUANTITY:
            return { ...state, boxCount: action.payload }
        default:
            return state;
    }
}

export { quantityReducer }