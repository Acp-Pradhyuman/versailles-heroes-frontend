import React from 'react';

export default function ContactUs() {
    return (
        <>
            <div className="container-fluid body-bg-background">
                <img src={require("../../assets/images/body-bg-2.png")} alt="body-bg-2" />
            </div>
            <div className="container">
                <div className="row mt-5 ">
                    <div className="col-lg-9 col-md-8 question-left-side">
                        <div className="box-style-wrap p-4 mb-5 all-question-box">
                            <h3 className="mb-5">Contact Us</h3>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Your Name</label>
                                    <input type="email" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Country</label>
                                    <input type="email" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email Address</label>
                                    <input type="email" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Subject</label>
                                    <input type="email" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Describe your issue</label>
                                    <textarea></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Attach Files</label>
                                    <span>25 MB File Max</span>
                                    <div className="attachFile">
                                        <i className="fas fa-paperclip"></i>
                                    </div>
                                    <input type="email" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4">
                        <h2 className="mb-3">Popular Articles</h2>
                        <div className="box-style-wrap p-4">
                            <ul className="list-style-type">
                                <li>
                                    <a href="javascript:void(0);" className="anchor-style2">
                                        Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" className="anchor-style2">
                                        Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" className="anchor-style2">
                                        Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" className="anchor-style2">
                                        Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" className="anchor-style2">
                                        Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" className="anchor-style2">
                                        Lorem ipsum dolor sit? <i className="fas fa-angle-right"></i>
                                    </a>
                                </li>
                            </ul>
                            <span className="more-wrapper">More <i className="fas fa-angle-right"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}