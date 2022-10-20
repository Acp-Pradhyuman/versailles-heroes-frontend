import { USERDETAILS } from "../../actions";

const defaultState = { name: "", price: null, image: "", quantity: null, marketitemId: null, owner_address: "", token_count: "" }

const UserNftBuyReducer = (state = { nftBuyDetails: defaultState }, action) => {
    switch (action.type) {
        case USERDETAILS.USER_NFT_BUY_DETAILS:
            return { ...state, nftBuyDetails: action.payload }
        default:
            return state
    }
}

export { UserNftBuyReducer }