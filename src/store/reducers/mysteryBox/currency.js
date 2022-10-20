import { MYSTERYBOX } from "../../actions";

const defaultState = { selectedCurrency: "usdt" }
const currencyReducer = (state = defaultState, action) => {
    switch (action.type) {
        case MYSTERYBOX.CURRENCY_TYPE:
            return { ...state, selectedCurrency: action.payload }
        default:
            return state
    }
}

export { currencyReducer }