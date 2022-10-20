import { USERDETAILS } from "../../actions";

const transactionHash = ""

const UserNftHashReducer = (state = transactionHash, action) => {
    switch (action.type) {
        case USERDETAILS.USER_NFT_BUY_HASH:
            return { ...state, transactionHash: action.payload }
        default:
            return state;
    }
}
export { UserNftHashReducer }