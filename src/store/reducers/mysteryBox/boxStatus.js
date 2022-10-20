import { MYSTERYBOX } from "../../actions";

const boxOpenStatus = false

const BoxStatusReducer = (state = boxOpenStatus, action) => {
    switch (action.type) {
        case MYSTERYBOX.OPEN_BOX_STATUS:
            return { ...state, boxOpenStatus: action.payload }
        default:
            return state;
    }
}
export { BoxStatusReducer }