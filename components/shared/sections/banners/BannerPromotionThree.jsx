import React from "react";
const BannerPromotionTwo = () => {
    return (
        <div className="ps-home container">
            <div className="ps-home__banner">
                <div className="ps-banner" style={{ background: "#103187" }}>
                    <img
                        className="ps-banner__overlay"
                        src="/static/img/promotion/home4-banner-4.jpg"
                        alt="alt"
                    />
                    <div className="ps-banner__block">
                        <div className="ps-banner__content">
                            <h2 className="ps-banner__title text-white">
                                PowerSteel <br />
                                X-tra 200 Brush
                            </h2>
                            <div className="ps-banner__price">
                                <span className="text-yellow">$25.99</span>
                                <del>$15.99</del>
                            </div>
                            <a className="bg-yellow ps-banner__shop" href="#">
                                Add to cart
                            </a>
                        </div>
                        <div className="ps-banner__thumnail">
                            <div className="ps-banner__persen bg-yellow">
                                -30%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerPromotionTwo;
