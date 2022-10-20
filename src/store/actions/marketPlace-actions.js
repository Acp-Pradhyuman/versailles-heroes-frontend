import { MARKETPLACE } from "./action-types";

const setSelectedHeroRarityId = (payload) => ({
    type: MARKETPLACE.HERO_RARITY_ID,
    payload,
});

const setSelectedHeroIndex = (payload) => ({
    type: MARKETPLACE.SELECTED_HERO_INDEX,
    payload
})
export { setSelectedHeroRarityId, setSelectedHeroIndex }