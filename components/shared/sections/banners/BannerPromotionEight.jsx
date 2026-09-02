import Link from "next/link";
import React from "react";

const BannerPromotionEight = () => {
    return (
        <div className="ps-promo ps-promotion--eight container">
            <div className="ps-promo__item">
                <img
                    className="ps-promo__banner"
                    src="/static/img/category/banner-promo.jpg"
                    alt="alt"
                />
                <div className="ps-promo__content">
                    <h4 className="ps-promo__name">
                        Multi-Surface <br />
                        Free&amp;Clear
                    </h4>
                    <div className="ps-promo__sale">-25%</div>
                    <div className="ps-promo__meta d-horizontal">
                        <p className="ps-promo__price">$15.99</p>
                        <p className="ps-promo__del">$29.99</p>
                    </div>
                    <Link className="ps-promo__btn" href="/shop">
                        Add to cart
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BannerPromotionEight;
