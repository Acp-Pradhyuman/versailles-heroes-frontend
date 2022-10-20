import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ModalType } from "../../../core";
import { closeModal } from "../../../store";

export default function SwitchNetworkModal() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.modal[ModalType.SwitchNetworkModal] || false)

    const handleClose = () => {
        dispatch(closeModal(ModalType.SwitchNetworkModal));
    }
    const handleSwtchNetwork = () =>{
        handleClose();
        window.ethereum.request({
			method: "wallet_addEthereumChain",
			params: [{
				chainId: "0x61",
				//chainId: "0x89",
				rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
				chainName: "BSC Testnet",
				nativeCurrency: {
					name: "BNB",
					symbol: "BNB",
					decimals: 18
				},
				blockExplorerUrls: ["https://explorer.binance.org/smart-testnet"]
			}]
		});
    }
    return (
        <Modal
            show={isOpen}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            dialogClassName="modal-class modal-md modal-center"
        >
            <button type="button" onClick={handleClose} className="close modal-close-btn" data-dismiss="modal" aria-label="Close">x</button>
            <div className="modal-body">
                <div className="modal-inner-area">
                    <i className="fas fa-globe"></i>
                    <h4>WRONG NETWORK</h4>
                    <p>You need to connect to supported network</p>
                </div>
                <div className="modal-footer modal-footer1">
                    <button type="button" onClick={handleSwtchNetwork} className="btn btn-primary">SWITCH TO BSC NETWORK</button>
                </div>
            </div>
        </Modal>
    )
}