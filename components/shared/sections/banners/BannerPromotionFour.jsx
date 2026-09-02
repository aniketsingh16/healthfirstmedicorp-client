import React from "react";

const BannerPromotionFour = () => {
    return (
        <div className="ps-home ps-banner--promotion-four">
            <div className="container ps-home__banner">
                <div className="ps-banner">
                    <img
                        className="ps-banner__overlay"
                        src="/static/img/promotion/bg.jpg"
                        alt="alt"
                    />
                    <div className="ps-banner__block">
                        <div className="ps-banner__content">
                            <h2 className="ps-banner__title">
                                Fully equipped <br />
                                of ophthalmic rooms
                            </h2>
                            <div className="ps-banner__btn-group">
                                <div className="ps-banner__btn">
                                    <img
                                        src="/static/img/icon/bacterial.svg"
                                        alt="alt"
                                    />
                                    Anti-Bacterial
                                </div>
                                <div className="ps-banner__btn">
                                    <img
                                        src="/static/img/icon/virus.svg"
                                        alt="alt"
                                    />
                                    Anti-Virus
                                </div>
                            </div>
                            <a className="bg-warning ps-banner__shop" href="#">
                                Add to cart
                            </a>
                        </div>
                        <div className="ps-banner__thumnail">
                            <div className="ps-banner__persen bg-yellow ps-right">
                                -30%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerPromotionFour;
