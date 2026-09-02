import React from "react";
import Rating from "~/components/elements/Rating";

const FormProductReview = () => {
    return (
        <form className="ps-form--product-review" action="#" method="get">
            <div className="ps-form__header">
                <h4>Add a review</h4>
                <p>Connect with:</p>
                <ul className="ps-list--social square">
                    <li>
                        <a className="facebook" href="#">
                            <i className="fa fa-facebook"></i>
                        </a>
                    </li>
                    <li>
                        <a className="google-plus" href="#">
                            <i className="fa fa-google-plus"></i>
                        </a>
                    </li>
                    <li>
                        <a className="twitter" href="#">
                            <i className="fa fa-twitter"></i>
                        </a>
                    </li>
                </ul>
                <p>
                    Your email address will not be published. Required fields
                    are marked *
                </p>
            </div>
            <div className="form-group">
                <label>
                    Your rating<sup>*</sup>
                </label>
                <div className="br-wrapper br-theme-fontawesome-stars">
                    <Rating />

                    <div className="br-widget">
                        <a
                            href="#"
                            data-rating-value="1"
                            data-rating-text="1"></a>
                        <a
                            href="#"
                            data-rating-value="2"
                            data-rating-text="2"></a>
                        <a
                            href="#"
                            data-rating-value="3"
                            data-rating-text="3"></a>
                        <a
                            href="#"
                            data-rating-value="4"
                            data-rating-text="4"></a>
                        <a
                            href="#"
                            data-rating-value="5"
                            data-rating-text="5"></a>
                        <div className="br-current-rating"></div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>
                    Your Review:<sup>*</sup>
                </label>
                <textarea className="form-control" rows="6"></textarea>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>
                            Name:<sup>*</sup>
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder=""
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>
                            Email:<sup>*</sup>
                        </label>
                        <input
                            className="form-control"
                            type="email"
                            placeholder=""
                        />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <button className="ps-btn ps-btn--black">Submit</button>
            </div>
        </form>
    );
};

export default FormProductReview;
