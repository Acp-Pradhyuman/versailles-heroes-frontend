import { USERDETAILS } from "../../actions";

const userNftStatus = false

const UserNftStatusChangeReducer = (state = userNftStatus, action) => {
    switch (action.type) {
        case USERDETAILS.USER_NFT_STATUS:
            return { ...state, userNftStatus: action.payload }
        default:
            return state;
    }
}
export { UserNftStatusChangeReducer }