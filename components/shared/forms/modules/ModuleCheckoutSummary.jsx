import React, { useEffect, useState } from 'react';
import { getCartItemsHelper } from '~/utilities/ecomerce-helpers';
import { connect } from 'react-redux';
import Link from 'next/link';

const ModuleCheckoutSummary = ({ cart }) => {
    const [cartItems, setCartItems] = useState([]);

    async function getProductByCardItems(cart) {
        const shoppingCart = await getCartItemsHelper(cart);
        if (shoppingCart) {
            setCartItems(shoppingCart.items);
        }
    }

    useEffect(() => {
        getProductByCardItems(cart);
    }, [cart]);

    let cartItemsViews;
    if (cartItems) {
        cartItemsViews = cartItems.map((item, index) => (
            <Link href="/" legacyBehavior key={index}>
                <a>
                    <strong>
                        {item.title}
                        <span>x{item.quantity}</span>
                    </strong>
                    <small>£{item.sellingPrice}</small>
                </a>
            </Link>
        ));
    }

    return (
        <div className="ps-block--checkout-order">
            <div className="ps-block__content">
                <figure>
                    <figcaption>
                        <strong>Product</strong>
                        <strong>total</strong>
                    </figcaption>
                </figure>
                <figure className="ps-block__items">{cartItemsViews}</figure>
                <figure>
                    <figcaption>
                        <strong>Subtotal</strong>
                        <small>£95.90</small>
                    </figcaption>
                </figure>
                <figure className="ps-block__shipping">
                    <h3>Shipping</h3>
                    <p>Enter your address to view shipping options.</p>
                </figure>
                <figure className="ps-block__total">
                    <figcaption>
                        Total<span>£165.90</span>
                    </figcaption>
                </figure>
                <figure className="ps-block__payment-methods">
                    <div className="ps-radio">
                        <input
                            className="form-control"
                            type="radio"
                            id="payment-method-1"
                            name="payment-method"
                        />
                        <label htmlFor="payment-method-1">
                            Direct bank transfer
                        </label>
                    </div>
                    <div className="ps-radio">
                        <input
                            className="form-control"
                            type="radio"
                            id="payment-method-2"
                            name="payment-method"
                        />
                        <label htmlFor="payment-method-2">Paypal</label>
                    </div>
                    <p>
                        Your personal data will be used to process your order,
                        support your experience throughout this website, and for
                        other purposes described in our
                        <Link href="#"> 
                            privacy policy.
                        </Link>
                    </p>
                </figure>
            </div>
            <div className="ps-block__footer">
                <Link href="/shop/checkout-success" legacyBehavior>
                    <a className="ps-btn ps-btn--fullwidth ps-btn--black">
                        Process to checkout
                    </a>
                </Link>
                {/*<button className="ps-btn ps-btn--fullwidth ps-btn--black">
                    Process to checkout
                </button>*/}
            </div>
        </div>
    );
};

export default connect((state) => state.cart)(ModuleCheckoutSummary);
