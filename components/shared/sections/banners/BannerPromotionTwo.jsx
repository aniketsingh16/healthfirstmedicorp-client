import React from "react";

const BannerPromotionTwo = () => {
    return (
        <div
            className="ps-home3__banner ps-banner-item--default ps-banner--promotion-two bg--cover"
            // className="ps-banner-item--default ps-banner--promotion-two bg--cover"
            style={{
                backgroundImage: `url(/static/img/promotion/banner-bg-12.jpg)`,
            }}>
            <div className="ps-banner ps-banner--home-3">
                <div className="container">
                    <div className="ps-banner__block">
                        <div className="ps-banner__content">
                            <h2 className="ps-banner__title">
                                Super Sonic Brush <br />
                                X200 Higenic
                            </h2>
                            <div className="ps-banner__desc">
                                The sonic power of the brush is the best for{" "}
                                <br />
                                dental problems
                            </div>
                            <div className="ps-banner__btn-group">
                                <div className="ps-banner__btn">
                                    <img
                                        src="/static/img/icon/tooth-brush-icon.png"
                                        alt=""
                                    />
                                    Up to 5 users simultaneously
                                </div>
                                <div className="ps-banner__btn">
                                    <img
                                        src="/static/img/icon/dashboard-icon.png"
                                        alt=""
                                    />
                                    Has HEALTH certificate
                                </div>
                            </div>
                            <a className="ps-banner__shop bg-warning" href="#">
                                About
                            </a>
                        </div>
                        <div className="ps-banner__thumnail">
                            <div className="ps-banner__persen bg-warning">
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
