import Link from "next/link";
import React from "react";

const HomeOnePromotions = () => {
    return (
        <div className="ps-promo ps-not-padding ps-home-promotion ps-home-promotion--one">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="ps-promo__item">
                            <img
                                className="ps-promo__banner"
                                src="/static/img/promotion/bg-banner1.jpg"
                                alt="alt"
                            />
                            <div className="ps-promo__content">
                                <span className="ps-promo__badge">New</span>
                                <h4 className="mb-20 ps-promo__name">
                                    Vaprorizer <br />
                                    Charger <br />
                                    X200 5KW
                                </h4>
                                <Link className="ps-promo__btn" href="/shop">
                                    More
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="ps-promo__item">
                            <img
                                className="ps-promo__banner"
                                src="/static/img/promotion/bg-banner2.jpg"
                                alt="alt"
                            />
                            <div className="ps-promo__content">
                                <h4 className="ps-promo__name">
                                    Digital <br />
                                    Thermometer <br />
                                    X30-Pro
                                </h4>
                                <div className="ps-promo__sale">-10%</div>
                                <Link className="ps-promo__btn" href="/shop">
                                    Shop now
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="ps-promo__item">
                            <img
                                className="ps-promo__banner"
                                src="/static/img/promotion/bg-banner3.jpg"
                                alt="alt"
                            />
                            <div className="ps-promo__content">
                                <h4 className="text-white ps-promo__name">
                                    SuperBrush <br />
                                    X200 Higenic
                                </h4>
                                <div className="ps-promo__meta">
                                    <p className="ps-promo__price">$119.00</p>
                                    <p className="ps-promo__del">$129.00</p>
                                </div>
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

export default HomeOnePromotions;
