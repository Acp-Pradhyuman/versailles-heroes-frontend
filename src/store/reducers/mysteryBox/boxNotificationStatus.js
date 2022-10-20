import { MYSTERYBOX } from "../../actions";

const defaultState = { status: false };

const boxNotificationStatusReducer = (state = defaultState, action) => {
    switch (action.type) {
        case MYSTERYBOX.BOX_NOTIFICATION_STATUS:
            return { ...state, status: action.payload }
        default:
            return state
    }
}

export { boxNotificationStatusReducer }