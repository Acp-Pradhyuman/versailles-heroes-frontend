import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalType } from "../../core";
import { openModal, setTransferBoxDetails } from "../../store";
import { apiGetPendingTransfer } from "../../api";

export default function Notifications() {
    const dispatch = useDispatch();
    const [pendingMysteryBox, setPendingMysteryBox] = useState([]);
    const userId = useSelector((state) => state.auth.user.id);
    const boxNotificationStatus = useSelector((state) => state.MysteryBoxes.boxNotificationStatus.status);
    console.log("status",boxNotificationStatus);

    const onBtnClick = (item) => {
        dispatch(setTransferBoxDetails(item));
        dispatch(openModal(ModalType.BoxTransferModal));
    }

    async function fetchGetPendingTransfer() {
        try {
            const { data } = await apiGetPendingTransfer(userId);
            console.log("apidata", data.data);
            setPendingMysteryBox(data.data);

        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchGetPendingTransfer();
    }, [boxNotificationStatus]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h2 className="blue-color">NOTIFICATIONS</h2>
                </div>
            </div>
            <div className="row mt-5 justify-content-center">
                <div className="col-md-8">
                    <div className="notifications0box-style mb-4">
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.</p>
                        <p> No sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                    </div>
                    {pendingMysteryBox.map((item) =>
                        <div className="notifications0box-style mb-4" key={item._id}>
                            <p> No sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                            <button type="button" onClick={() => onBtnClick(item)} data-dismiss="modal" data-toggle="modal" data-target="#mystery-box-transfer-modal" className="btn btn-primary mt-3">Yes</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}