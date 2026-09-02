import React from "react";

const WidgetProductPromotion = () => {
    return (
        <div className="ps-product--extension">
            <div className="ps-product__delivery">
                <div className="ps-delivery__item">
                    <i className="icon-wallet"></i>100% <br />
                    Money back
                </div>
                <div className="ps-delivery__item">
                    <i className="icon-bag2"></i>Non-contact <br />
                    shipping
                </div>
                <div className="ps-delivery__item">
                    <i className="icon-truck"></i>Free delivery for <br />
                    order over $200
                </div>
            </div>
            <div className="ps-product__payment">
                <img src="/static/img/payment-product.png" alt="" />
            </div>
            <div className="ps-product__gif">
                <div className="ps-gif__text">
                    <i className="icon-shield-check"></i>
                    <strong>100% Secure delivery </strong>without contacting the
                    courier
                </div>
                <img
                    className="ps-gif__thumbnail"
                    src="/static/img/blue-white-ribbon-on-pink-box.jpg"
                    alt=""
                />
            </div>
        </div>
    );
};

export default WidgetProductPromotion;
