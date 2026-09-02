import Link from "next/link";
import React from "react";
// import { baseUrl } from "~/repositories/Repository";

const PromotionSecureInformation = () => {
    return (
        <div
            className="ps-delivery bg--cover"
            style={{
                backgroundImage: `url(/static/img/promotion/banner-delivery-2.jpg)`,
            }}>
            <div className="ps-delivery__content">
                <div className="ps-delivery__text">
                    <i className="icon-shield-check"></i>
                    <span>
                        <strong>100% Secure delivery </strong>without contacting
                        the courier
                    </span>
                </div>
                <Link className="ps-delivery__more" href="/shop">
                More
                </Link>
            </div>
        </div>
    );
};

export default PromotionSecureInformation;
