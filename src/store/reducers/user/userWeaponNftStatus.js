import { USERDETAILS } from "../../actions";

const defaultState = { status: false, weponsOnSaleStatus: false }

const UserWeaponNftStatusChangeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case USERDETAILS.USER_WEAPON_NFT_STATUS:
            return { ...state, status: action.payload }
        case USERDETAILS.USER_WEAPON_ONSALE_STATUS:
            return { ...state, weponsOnSaleStatus: action.payload }
        default:
            return state;
    }
}
export { UserWeaponNftStatusChangeReducer }