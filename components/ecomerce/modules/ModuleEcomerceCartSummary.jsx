import React from "react";
import { calculateAmount } from "@/utilities/ecomerce-helpers";
import Link from "next/link";

const ModuleEcomerceCartSummary = ({ cartItems }) => {
    // view
    let totalView;

    if (cartItems) {
        if (cartItems && cartItems.length > 0) {
            totalView = calculateAmount(cartItems);
        } else {
            totalView = "0.00";
        }
    }

    return (
        <div className="ps-block--cart-summary">
            <div className="ps-block__header">
                <h4>Cart Total</h4>
            </div>
            <div className="ps-block__content">
                <div className="ps-block__records">
                    <p>
                        <span>Subtotal</span>
                        <strong>₹{totalView}</strong>
                    </p>
                    <p>
                        <span>Shipping</span>
                        <span>
                            {" "}
                            Enter your address to view shipping options.{" "}
                        </span>
                    </p>
                    <p className="total">
                        <span>Total</span>
                        <strong>₹{totalView}</strong>
                    </p>
                </div>
                <div className="ps-block__bottom">
                    <Link href="/shop/checkout" legacyBehavior>
                        <a className="ps-btn ps-btn--orange">
                            Proceed to checkout
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ModuleEcomerceCartSummary;
