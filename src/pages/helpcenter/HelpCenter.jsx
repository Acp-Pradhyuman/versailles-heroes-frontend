import React from 'react';
import {Link} from "react-router-dom";

export default function HelpCenter() {
    return (
        <>
            <div className="container-fluid body-bg-background">
                <img src={require("../../assets/images/body-bg-2.png")} alt="body-bg-2" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h2>Hello, we are here to help you!</h2>
                        <div className="input-group how-help-search">
                            <i className="fas fa-search"></i>
                            <input type="search" className="form-control rounded" placeholder="Search question" aria-label="Search" aria-describedby="search-addon" />
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-12">
                        <h2 className="mb-3">Popular questions</h2>
                        <div className="box-style-wrap d-flex mb-5">
                            <div className="popular-questions-inner">
                                <Link to="/popular-questions" className="anchor-style2">
                                    <h4>Account</h4>
                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr?sed</p>
                                </Link>
                            </div>
                            <div className="popular-questions-inner">
                                <Link to="/popular-questions" className="anchor-style2">
                                    <h4>Account</h4>
                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr?sed</p>
                                </Link>
                            </div>
                            <div className="popular-questions-inner">
                                <Link to="/popular-questions" className="anchor-style2">
                                    <h4>Account</h4>
                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr?sed</p>
                                </Link>
                            </div>
                            <div className="popular-questions-inner">
                                <Link to="/popular-questions" className="anchor-style2">
                                    <h4>Account</h4>
                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr?sed</p>
                                </Link>
                            </div>
                            <div className="popular-questions-inner">
                                <Link to="/popular-questions" className="anchor-style2">
                                    <h4>Account</h4>
                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr?sed</p>
                                </Link>
                            </div>
                            <div className="popular-questions-inner">
                                <Link to="/popular-questions" className="anchor-style2">
                                    <h4>Account</h4>
                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr?sed</p>
                                </Link>
                            </div>
                        </div>
                        <h2 className="mb-3">Browse questions</h2>
                        <div className="row">
                            <div className="col-md-4 col-sm-6 mb-4">
                                <div className="box-style-wrap p-4">
                                    <h4>Account</h4>
                                    <ul className="list-style-type">
                                        <li>
                                            <Link to="/popular-questions" className="anchor-style2">
                                                Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/popular-questions" className="anchor-style2">
                                                Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/popular-questions" className="anchor-style2">
                                                Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/popular-questions" className="anchor-style2">
                                                Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/popular-questions" className="anchor-style2">
                                                Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/popular-questions" className="anchor-style2">
                                                Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                    <span className="more-wrapper">More <i className="fas fa-angle-right"></i></span>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 mb-4">
                                <div className="box-style-wrap p-4">
                                    <h4>Account</h4>
                                    <ul className="list-style-type">
                                        <li>
                                            <Link to="/popular-questions" className="anchor-style2">
                                                Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/popular-questions" className="anchor-style2">
                                                Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/popular-questions" className="anchor-style2">
                                                Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/popular-questions" className="anchor-style2">
                                                Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/popular-questions" className="anchor-style2">
                                                Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/popular-questions" className="anchor-style2">
                                                Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                    <span className="more-wrapper">More <i className="fas fa-angle-right"></i></span>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 mb-4">
                                <div className="box-style-wrap p-4">
                                    <h4>Account</h4>
                                    <ul className="list-style-type">
                                        <li>
                                            <Link to="/populLinkr-questions" className="anchor-style2">
                                                Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/popular-questions" className="anchor-style2">
                                                Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/popular-questions" className="anchor-style2">
                                                Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/popular-questions" className="anchor-style2">
                                                Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/popular-questions" className="anchor-style2">
                                                Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/popular-questions" className="anchor-style2">
                                                Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                    <span className="more-wrapper">More <i className="fas fa-angle-right"></i></span>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-center py-4">Need More Help?</h2>
                        <Link to="/contact-us" className="btn-style mb-5 text-center">
                            <img src={require("../../assets/images/icon/btn-style1.png")} alt="btn style" />
                            <span>Contact Us</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}