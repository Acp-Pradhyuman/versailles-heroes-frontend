import React from "react";
import { Tab, Nav } from "react-bootstrap";

export default function AccountSetting() {
    return (
        <Tab.Pane eventKey="Account Setting">
            <h2 className="blue-color mb-5">Game Profile</h2>
            <div className="row form-style-wrap">
                <form className="col-md-6">
                    <div className="form-group">
                        <input type="text" placeholder="Jhonathna" />
                        <label>Name</label>
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="user@mail.com" />
                        <label>Email</label>
                    </div>
                </form>
                <div className="col-md-6">
                    <button type="submit" disabled className="btn btn-primary">TRANSFER</button>
                </div>
            </div>
        </Tab.Pane>
    )
}