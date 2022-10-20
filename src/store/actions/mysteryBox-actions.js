import { MYSTERYBOX, OPENMYSTERYBOX } from "./action-types";

const setCurrencyType = (payload) => ({
    type: MYSTERYBOX.CURRENCY_TYPE,
    payload
});

const setBoxQuantity = (payload) => ({
    type: MYSTERYBOX.BOX_QUANTITY,
    payload
});

const setBoxData = (payload) => ({
    type: MYSTERYBOX.BOX_DETAILS,
    payload
});

const setPurchaseDetails = (payload) => ({
    type: MYSTERYBOX.BOX_PURCHASE,
    payload
});

const setTransferBoxDetails = (payload) => ({
    type: MYSTERYBOX.GET_TRANSFER_BOX_DETAILS,
    payload
});

const setBoxNotificationStatus = (payload) => ({
    type: MYSTERYBOX.BOX_NOTIFICATION_STATUS,
    payload
});

const setOpenBoxDetails = (payload) => ({
    type: MYSTERYBOX.OPEN_BOX_DETAILS,
    payload
});

const setBoxStatus = (payload) => ({
    type: MYSTERYBOX.OPEN_BOX_STATUS,
    payload
})



export {
    setCurrencyType, setBoxQuantity, setBoxData, setPurchaseDetails, setTransferBoxDetails,
    setBoxNotificationStatus, setOpenBoxDetails, setBoxStatus
}
