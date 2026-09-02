import React from "react";

const WidgetShopByRating = () => {
    return (
        <aside className="widget widget_shop widget_rating">
            <h3 className="widget-title">By Rating</h3>
            <div className="widget__content">
                <div className="form-group">
                    <div className="ps-checkbox">
                        <input
                            className="form-control"
                            type="checkbox"
                            id="five-star"
                            name="five-star"
                        />
                        <label htmlFor="five-star">
                            <span className="ps-rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </span>
                            <span className="total">(90)</span>
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="ps-checkbox">
                        <input
                            className="form-control"
                            type="checkbox"
                            id="four-star"
                            name="four-star"
                        />
                        <label htmlFor="four-star">
                            <span className="ps-rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star empty"></i>
                            </span>
                            <span className="total">(33)</span>
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="ps-checkbox">
                        <input
                            className="form-control"
                            type="checkbox"
                            id="three-star"
                            name="three-star"
                        />
                        <label htmlFor="three-star">
                            <span className="ps-rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star empty"></i>
                                <i className="fa fa-star empty"></i>
                            </span>
                            <span className="total">(15)</span>
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="ps-checkbox">
                        <input
                            className="form-control"
                            type="checkbox"
                            id="two-star"
                            name="two-star"
                        />
                        <label htmlFor="two-star">
                            <span className="ps-rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star empty"></i>
                                <i className="fa fa-star empty"></i>
                                <i className="fa fa-star empty"></i>
                            </span>
                            <span className="total">(11)</span>
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="ps-checkbox">
                        <input
                            className="form-control"
                            type="checkbox"
                            id="one-star"
                            name="one-star"
                        />
                        <label htmlFor="one-star">
                            <span className="ps-rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star empty"></i>
                                <i className="fa fa-star empty"></i>
                                <i className="fa fa-star empty"></i>
                                <i className="fa fa-star empty"></i>
                            </span>
                            <span className="total">(2)</span>
                        </label>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default WidgetShopByRating;
