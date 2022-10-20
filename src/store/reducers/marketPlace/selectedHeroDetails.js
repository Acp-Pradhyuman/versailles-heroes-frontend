import { MARKETPLACE } from "../../actions";

const defaultState = { heroRarityId: [], selectedHeroIndex: [] }

const selectedHeroDetailReducer = (state = defaultState, action) => {
    switch (action.type) {
        case MARKETPLACE.HERO_RARITY_ID:
            return { ...state, heroRarityId: action.payload }
        case MARKETPLACE.SELECTED_HERO_INDEX:
            return { ...state, selectedHeroIndex: action.payload }
        default:
            return state;
    }
}

export { selectedHeroDetailReducer }