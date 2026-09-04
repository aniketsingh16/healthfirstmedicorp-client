import React, { useEffect, useState } from "react";
import { calculateAmount } from "@/utilities/ecomerce-helpers";
import useEcomerce from "@/hooks/useEcomerce";
import Link from "next/link";

const ModulEcomerceOrderSummary = ({ ecommerce }) => {
    const { products, getProducts } = useEcomerce();
    useEffect(() => {
        getProducts(ecommerce.cartItems, "cart");
    }, [ecommerce]);

    // Views
    let cartItemsView,
        amountView = "0.00";
    if (products && products.length > 0) {
        amountView = calculateAmount(products);
        cartItemsView = products.map((item) => (
            <div className="ps-checkout__row ps-product" key={item.productID}>
                <div className="ps-product__name">
                    <span>{item.name}</span> x <span>{item.quantity}</span>
                </div>
                <div className="ps-product__price">${item.sellingPrice}</div>
            </div>
        ));
    } else {
    }
    return (
        <>
            <div className="ps-checkout__order">
                <h3 className="ps-checkout__heading">Your order</h3>
                <div className="ps-checkout__row">
                    <div className="ps-title">Product</div>
                    <div className="ps-title">Subtotal</div>
                </div>
                {cartItemsView}

                <div className="ps-checkout__row">
                    <div className="ps-title">Subtotal</div>
                    <div className="ps-product__price">${amountView}</div>
                </div>
                <div className="ps-checkout__row">
                    <div className="ps-title">Shipping</div>
                    <span>
                        <small>Free shipping</small>
                    </span>
                </div>
                <div className="ps-checkout__row">
                    <div className="ps-title">Total</div>
                    <div className="ps-product__price">${amountView}</div>
                </div>
                <div className="ps-checkout__payment">
                    {/* <div className="payment-method">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="method"
                                id="payment"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="payment">
                                Check payments
                            </label>
                        </div>
                        <p className="ps-note">
                            Please send a check to Store Name, Store Street,
                            Store Town, Store State / County, Store Postcode.
                        </p>
                    </div>
                    <div className="paypal-method">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="method"
                                id="paypal"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="paypal">
                                {" "}
                                PayPal{" "}
                                <img
                                    src="/static/img/AM_mc_vs_ms_ae_UK.png"
                                    alt=""
                                />
                                <a href="https://www.paypal.com/uk/webapps/mpp/paypal-popup">
                                    What is PayPal?
                                </a>
                            </label>
                        </div>
                    </div>*/}
                    <div className="check-faq">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="agree-terms"
                                defaultChecked
                            />
                            <label
                                className="form-check-label"
                                htmlFor="agree-term">
                                {" "}
                                I have read and agree to the website terms and
                                conditions *
                            </label>
                        </div>
                    </div>
                    <Link href="/shop/order-success" legacyBehavior>
                        <a className="ps-btn ps-btn--warning">Place order</a>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ModulEcomerceOrderSummary;
