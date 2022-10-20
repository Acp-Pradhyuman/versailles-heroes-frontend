import React from "react";

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-12 col-sm-12 footer-info">
                        <img src={require("../../../assets/images/marketplace-logo.png")} className="footer-info-logo" alt="footer" />
                        <div className="footer-info-row">
                            <h4 className="text-uppercase footer-info-title mb-3">ADDRESS ADDRESS STATE, CA,&nbsp;ZIP</h4>
                            <ul className="footer-social d-flex flex-wrap mb-0">
                                <li><a href="#"><i className="fab fa-facebook" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i className="fab fa-twitter" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i className="fab fa-youtube" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg col-md-4 col-sm-4 footer-nav">
                        <h3 className="footer-nav-head">About</h3>
                        <ul className="footer-nav-list">
                            <li><a href="#">Our Vision</a></li>
                            <li><a href="#">Game Play</a></li>
                            <li><a href="#">White Paper</a></li>
                            <li><a href="#">Partners / Affiliates</a></li>
                        </ul>
                    </div>
                    <div className="col-lg col-md-4 col-sm-4 footer-nav">
                        <h3 className="footer-nav-head">Info Center</h3>
                        <ul className="footer-nav-list">
                            <li><a href="#">FAQs</a></li>
                            <li><a target="_blank" href="https://gameinfinity.io/bounty">Whitelist</a></li>
                            <li><a href="#">Marketplace</a></li>
                        </ul>
                    </div>
                    <div className="col-lg col-md-4 col-sm-4 footer-nav">
                        <h3 className="footer-nav-head">Legal</h3>
                        <ul className="footer-nav-list">
                            <li><a href="#">Terms &amp; Conditions</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Cookie Policy</a></li>
                            <li><a href="#">Copyright Policy</a></li>
                            <li><a href="#">Disclaimer</a></li>
                            <li><a href="#">CCPA DSAR</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}