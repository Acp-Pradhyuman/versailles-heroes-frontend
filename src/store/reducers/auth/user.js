import { AUTH } from "../../actions";

const defaultState = {
    id: "", token: "", refreshToken: "", email: "", walletConnectStatus: false,
    userName: "", proflie_picture: "", walletAddress: "", userStatusByAdmin: false
}

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case AUTH.CLEAR:
            return { ...defaultState }
        case AUTH.SET_CONNECTED_USER:
            return { ...state, ...action.payload }
        case AUTH.SET_NOT_CONNECTED_USER:
            return { ...state, id: action.payload }
        case AUTH.WALLET_CONNECTED:
            return { ...state, walletConnectStatus: action.payload || false }
        case AUTH.WALLET_ADDRESS:
            return { ...state, walletAddress: action.payload }
        case AUTH.WALLET_BALANCE:
            return { ...state, walletBalance: action.payload }
        case AUTH.EMAIL:
            return { ...state, email: action.payload }
        case AUTH.USER_PROFILE_DATA:
            return { ...state, profileData: action.payload }
        case AUTH.USER_ACTIVE_STATUS:
            return { ...state, userStatusByAdmin: action.payload }
        default:
            return state
    }
}

export { userReducer }