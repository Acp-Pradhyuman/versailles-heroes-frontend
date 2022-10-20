import React from 'react';
import { Modal } from 'react-bootstrap';




export default function SetPriceModal({ isOpen, handleClose, onChangeHandler, handleTransfer, transferValidationMessage, mysteryBoxDetails,boxTransferInput }) {
    const {quantity,name}=mysteryBoxDetails;  

    console.log(isOpen)
    return (
        <Modal
            show={isOpen}
            onHide={handleClose}
            backdrop={"static"}
            keyboard={true}

        >
            <button type="button" onClick={handleClose} className="close modal-close-btn" aria-label="Close">x</button>
            <div className="modal-body">
                <div className="modal-inner-area mystery-box-area">
                    {!name &&!quantity && <h4 className='text-capitalize text-danger mb-3'>Please select any box</h4>}
                    {name && quantity && <>
                        <h4>Transfer {name}</h4>
                      <span>Available Quantity: {quantity}</span>
                        </>}
                    
                    <form onSubmit={(e)=>e.preventDefault()}>
                        <div className="form-group over-label lg">
                            <label className="label" htmlFor="quantity">Quantity to transfer</label>
                            <input type="number"  className="form-control font-16" id="quantity" name="quantityTransfer" value={boxTransferInput.quantity} onChange={onChangeHandler} />
                            {transferValidationMessage?.quantity && <div className="text-danger mb-2 " style={{textAlign:"left",marginTop:"3px"}}>{transferValidationMessage?.quantity}</div>}
                        </div>
                        <div className="form-group over-label lg">
                            <label className="label" htmlFor="Amount">Amount per quantity</label>
                            <input type="number"  className="form-control font-16" id="amount" name="priceTransfer" value={boxTransferInput.price} onChange={onChangeHandler} />
                            {/* <span>BUSD</span> */}
                            {transferValidationMessage?.amount && <div className="text-danger  mb-2 " style={{textAlign:"left",marginTop:"3px"}}>{transferValidationMessage?.amount}</div>}

                        </div>
                    </form>
                </div>
                {transferValidationMessage?.transferMessage && <div className="text-danger text-center  mb-2">{transferValidationMessage?.transferMessage}</div>}

                <div className="modal-footer modal-footer1">

                    <button type="button" onClick={handleTransfer} className="btn btn-primary">Transfer</button>
                </div>
            </div>
        </Modal>
    )
}
