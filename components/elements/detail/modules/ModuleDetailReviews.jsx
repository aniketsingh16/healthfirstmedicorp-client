import React from "react";
import Rating from "@/components/elements/Rating";
import { Rate } from "antd";

const ModuleDetailReviews = () => {
    return (
        <div
            className="tab-pane fade active show"
            id="reviews-content"
            role="tabpanel"
            aria-labelledby="reviews-tab">
            <div className="ps-product__tabreview">
                <div className="ps-review--product">
                    <div className="ps-review__row">
                        <div className="ps-review__avatar">
                            <img
                                src="/static/img/avatar/avatar-review.jpg"
                                alt="alt"
                            />
                        </div>
                        <div className="ps-review__info">
                            <div className="ps-review__name">Mark J.</div>
                            <div className="ps-review__date">Oct 30, 2021</div>
                        </div>
                        <div className="ps-review__rating">
                            <Rating />
                        </div>
                        <div className="ps-review__desc">
                            <p>Everything is perfect. I would recommend!</p>
                        </div>
                    </div>
                </div>
                <div className="ps-review--product">
                    <div className="ps-review__row">
                        <div className="ps-review__avatar">
                            <img
                                src="/static/img/avatar/avatar-review2.jpg"
                                alt="alt"
                            />
                        </div>
                        <div className="ps-review__info">
                            <div className="ps-review__name">Ann R.</div>
                            <div className="ps-review__date">Oct 30, 2021</div>
                        </div>
                        <div className="ps-review__rating">
                            <Rating />
                        </div>
                        <div className="ps-review__desc">
                            <p>
                                There was a small mistake in the order. In
                                return, I got the correct order and I could keep
                                the wrong one for myself.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="ps-review--product">
                    <div className="ps-review__row">
                        <div className="ps-review__avatar">
                            <img
                                src="/static/img/avatar/avatar-review3.jpg"
                                alt="alt"
                            />
                        </div>
                        <div className="ps-review__info">
                            <div className="ps-review__name">Jenna S.</div>
                            <div className="ps-review__date">Oct 30, 2021</div>
                        </div>
                        <div className="ps-review__rating">
                            <Rating />
                        </div>
                        <div className="ps-review__desc">
                            <p>
                                I ordered on Friday evening and on Monday at
                                12:30 the package was with me. I have never
                                encountered such a fast order processing.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="ps-review--product">
                    <div className="ps-review__row">
                        <div className="ps-review__avatar">
                            <img
                                src="/static/img/avatar/avatar-review4.jpg"
                                alt="alt"
                            />
                        </div>
                        <div className="ps-review__info">
                            <div className="ps-review__name">John M.</div>
                            <div className="ps-review__date">Oct 30, 2021</div>
                        </div>
                        <div className="ps-review__rating">
                            <Rating />
                        </div>
                        <div className="ps-review__desc">
                            <p>Everything is perfect. I would recommend!</p>
                        </div>
                    </div>
                </div>
                <div className="ps-review--product">
                    <div className="ps-review__row">
                        <div className="ps-review__avatar">
                            <img
                                src="/static/img/avatar/avatar-review.jpg"
                                alt="alt"
                            />
                        </div>
                        <div className="ps-review__info">
                            <div className="ps-review__name">Mark J.</div>
                            <div className="ps-review__date">Oct 30, 2021</div>
                        </div>
                        <div className="ps-review__rating">
                            <Rating />
                        </div>
                        <div className="ps-review__desc">
                            <p>
                                There was a small mistake in the order. In
                                return I got the correct order and I could keep
                                the wrong one for myself.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ps-form--review">
                <div className="ps-form__title">Write a review</div>
                <div className="ps-form__desc">
                    Your email address will not be published. Required fields
                    are marked *
                </div>
                <form action="do_action" method="post">
                    <div className="row">
                        <div className="col-12 col-lg-4">
                            <div className="form-group">
                                <label className="ps-form__label mr-2">
                                    Your rating *
                                </label>
                                <Rate />
                            </div>
                        </div>
                        <div className="col-6 col-lg-4">
                            <label className="ps-form__label">Name *</label>
                            <input className="form-control ps-form__input" />
                        </div>
                        <div className="col-6 col-lg-4">
                            <label className="ps-form__label">Email *</label>
                            <input className="form-control ps-form__input" />
                        </div>
                        <div className="col-12">
                            <div className="ps-form__block">
                                <label className="ps-form__label">
                                    Your review *
                                </label>
                                <textarea className="form-control ps-form__textarea"></textarea>
                            </div>
                        </div>
                        <div className="col-12 text-center">
                            <button className="btn ps-btn ps-btn--warning">
                                Add Review
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModuleDetailReviews;
