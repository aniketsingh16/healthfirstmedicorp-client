import React from "react";
import Link from "next/link";

const ModuleHeaderPromotions = () => {
    return (
        <>
            <div className="ps-promo">
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
                        <Link href="/shop" legacyBehavior>
                            <a className="ps-promo__btn">More</a>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="ps-promo">
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
                        <Link href="/shop" legacyBehavior>
                            <a className="ps-promo__btn">More</a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModuleHeaderPromotions;
