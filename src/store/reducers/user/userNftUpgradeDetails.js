import { USERDETAILS } from "../../actions";

const defaultState = { name: "", upgradePrice: null, image: "", attribute_id: "", nftName: "" }

const UserNftUpgradeReducer = (state = { nftUpgradeDetails: defaultState }, action) => {
    switch (action.type) {
        case USERDETAILS.USER_NFT_UPGRADE_DETAILS:
            return { ...state, nftUpgradeDetails: action.payload }
        default:
            return state
    }
}

export { UserNftUpgradeReducer }