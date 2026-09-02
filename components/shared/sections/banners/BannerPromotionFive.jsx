import React from "react";

const BannerPromotionFive = () => {
    return (
        <div className="ps-home ps-banner--promotion-five">
            <div className="container">
                <section className="ps-home__banner">
                    <div className="ps-banner">
                        <img
                            className="ps-banner__overlay"
                            src="/static/img/promotion/anti-virus-bg.jpg"
                            alt="alt"
                        />
                        <div className="ps-banner__block">
                            <div className="ps-banner__content">
                                <h2 className="ps-banner__title text-white">
                                    Antibacterial <br />
                                    Medical Mask
                                </h2>
                                <div className="ps-banner__btn-group">
                                    <div className="ps-banner__btn text-warning">
                                        Anti-Bacterial
                                    </div>
                                    <div className="ps-banner__btn text-warning">
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
                                <div className="ps-banner__persen bg-warning ps-left">
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

export default BannerPromotionFive;
