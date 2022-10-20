import { UI } from "./action-types";

const openModal = (modal) => ({
    type: UI.OPEN_MODAL,
    modal,
});

const closeModal = (modal) => ({
    type: UI.CLOSE_MODAL,
    modal,
});

const modalData = (data) => ({
    type: UI.MODAL_DATA,
    data
})

export { openModal, closeModal, modalData }