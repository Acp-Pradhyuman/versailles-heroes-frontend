import React from "react";
import { Tab, Nav } from "react-bootstrap";
import { Heroes } from "./heroes-tab";
import { Weapons } from "./weapons-tab";


export default function MarketPlace() {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Tab.Container defaultActiveKey="heros">
                        <Nav className="weapon-tabs">
                            <div>
                                <button>
                                    <Nav.Link eventKey="heros">heroes</Nav.Link>
                                </button>
                                <button>
                                    <Nav.Link eventKey="weapons">weapons</Nav.Link>
                                </button>
                            </div>
                        </Nav>
                        <Tab.Content>
                            <Weapons />
                            <Heroes />
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
        </div >
    );
}