import { USERDETAILS } from "../../actions";

const defaultState = {}
const UserHeroesListReducer = (state = defaultState, action) => {
    switch (action.type) {
        case USERDETAILS.USER_ALL_HEROES_LIST:
            return { ...state, userAllHeroesList: action.payload }
        default:
            return state;
    }
}

export { UserHeroesListReducer }