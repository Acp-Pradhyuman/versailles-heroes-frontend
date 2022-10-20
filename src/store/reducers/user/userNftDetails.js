import { USERDETAILS } from "../../actions";

const defaultState = { token_count: null, marketitemId: null, NftName: "" }

const UserHeroSaleReducer = (state = defaultState, action) => {
    switch (action.type) {
        case USERDETAILS.USER_HERO_SALE_TOKEN:
            return { ...state, token_count: action.payload }
        case USERDETAILS.USER_SALE_NFT_MARKETID:
            return { ...state, marketitemId: action.payload }
        case USERDETAILS.USER_SALE_NFT_NAME:
            return { ...state, NftName: action.payload }
        default:
            return state;
    }
}
export { UserHeroSaleReducer }