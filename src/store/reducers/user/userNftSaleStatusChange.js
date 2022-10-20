import { USERDETAILS } from "../../actions";

const userNftSaleStatus = false

const UserNftSaleStatusReducer = (state = userNftSaleStatus, action) => {
    switch (action.type) {
        case USERDETAILS.USER_NFT_SALE_STATUS:
            return { ...state, userNftSaleStatus: action.payload }
        default:
            return state;
    }
}
export { UserNftSaleStatusReducer }