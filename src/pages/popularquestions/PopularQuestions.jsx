import React from 'react';
import { Link } from "react-router-dom";

export default function PopularQuestions() {
    return (
        <>
            <div className="container-fluid body-bg-background">
                <img src={require("../../assets/images/body-bg-2.png")} alt="body-bg-2" />
            </div>
            <div className="container">
                <div className="row mt-5 ">
                    <div className="col-lg-9 col-md-8 question-left-side">
                        <div className="input-group mb-5">
                            <i className="fas fa-search"></i>
                            <input type="search" className="form-control rounded" placeholder="Search question" aria-label="Search" aria-describedby="search-addon" />
                        </div>
                        <div className="box-style-wrap p-4 mb-5 all-question-box">
                            <span>Home/Account</span>
                            <h3>Lorem ipsum dolor sit amet, consetetur sadipscing elitr? sed diam nonumy eirmod?</h3>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr? sed diam nonumy eirmod? tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At.</p>
                            <div className="article-btn-group mt-5">
                                <span>Was this article helpful?</span>
                                <a href="">Yes</a>
                                <a href="">No</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 mt-lg-5 mt-0 pt-lg-5 pt-0">
                        <h2 className="mb-3">Related Articles</h2>
                        <div className="box-style-wrap p-4">
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
                    <div className="col-md-12">
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