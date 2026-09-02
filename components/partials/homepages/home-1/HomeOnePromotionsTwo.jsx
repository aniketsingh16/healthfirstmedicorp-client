import Link from "next/link";
import React from "react";

const HomeOnePromotionsTwo = () => {
    return (
        <div className="ps-promo ps-home-promotions-two">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="ps-promo__item">
                            <img
                                className="ps-promo__banner"
                                src="/static/img/promotion/bg-banner4.jpg"
                                alt="alt"
                            />
                            <div className="ps-promo__content">
                                <span className="ps-promo__badge">New</span>
                                <h4 className="mb-20 ps-promo__name">
                                    Get rid of bacteria <br />
                                    in your home
                                </h4>
                                <Link className="ps-promo__btn" href="/shop">
                                    More
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="ps-promo__item">
                            <img
                                className="ps-promo__banner"
                                src="/static/img/promotion/bg-banner5.jpg"
                                alt="alt"
                            />
                            <div className="ps-promo__content">
                                <h4 className="ps-promo__name">
                                    Candid <br />
                                    Whitening Kit
                                </h4>
                                <div className="ps-promo__sale">-10%</div>
                                <Link className="ps-promo__btn" href="/shop">
                                    Shop now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeOnePromotionsTwo;
