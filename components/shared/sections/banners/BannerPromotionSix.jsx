import React from "react";

const BannerPromotionSix = () => {
    return (
        <div className="ps-home">
            <div className="container">
                <section className="ps-home__banner">
                    <div className="ps-banner">
                        <img
                            className="ps-banner__overlay"
                            src="/static/img/promotion/bg-banner-detal.jpg"
                            alt="alt"
                        />
                        <div className="ps-banner__block">
                            <div className="ps-banner__content">
                                <h2 className="ps-banner__title">
                                    Super Sonic Brush <br />
                                    X200 Higenic
                                </h2>
                                <div className="ps-banner__btn-group">
                                    <div className="ps-banner__btn">
                                        Anti-Bacterial
                                    </div>
                                    <div className="ps-banner__btn">
                                        Anti-Virus
                                    </div>
                                </div>
                                <a
                                    className="bg-warning ps-banner__shop"
                                    href="#">
                                    Add to cart
                                </a>
                            </div>
                            <div className="ps-banner__thumnail">
                                <div className="ps-banner__persen bg-primary">
                                    -30%
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BannerPromotionSix;
