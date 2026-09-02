import React, { useEffect, useContext } from "react";
import {
    calculateCartQuantity,
    calculateAmount,
} from "@/utilities/ecomerce-helpers";
import ProductOnCart from "@/components/elements/products/ProductOnCart";
import { Alert } from "antd";
import Link from "next/link";
import useEcomerce from "@/hooks/useEcomerce";
import { useAppStore } from "@/store/Zustand/useAppStore";
import { useEcommerceStore } from "@/store/Zustand/useEcommerceStore";
import ProductsContext from "@/utilities/ProductContext";

const EcomerceMiniCart = () => {
    const { products } = useContext(ProductsContext);
    const cartItems = useEcommerceStore((state) => state.cartItems);
    const { cartProducts, removeItem, removeItems, getProducts } = useEcomerce();
    const toggleDrawer = useAppStore((state) => state.toggleDrawer);

    function handleRemoveItem(e, productId) {
        e.preventDefault();
        removeItem({ productID: productId }, cartItems, "cart");

    }

    function handleCloseDrawer(e) {
        e.preventDefault();
        toggleDrawer(false);
    }

    function handleRemoveCart(e) {
        e.preventDefault();
        removeItems("cart");
    }

    // `products` loads asynchronously from Sanity, so it must be a dependency:
    // without it this ran once against an empty catalogue and never re-resolved,
    // leaving the drawer blank even when the cart had items.
    useEffect(() => {
        if (products?.length > 0) {
            getProducts(cartItems ?? [], products, "cart");
        }
    }, [cartItems, products]);

    // View
    let cartItemsView, cartActionsView, cartQuantityView, cartAmountView;

    if (cartItems) {
        if (cartItems.length > 0) {
            cartAmountView = calculateAmount(cartProducts);
            cartQuantityView = calculateCartQuantity(cartProducts);
            const items = cartProducts.map((item) => (
                <div className="ps-cart__item" key={item.productID}>
                    <ProductOnCart product={item}>
                        <p className="ps-product__meta">
                            <span>{item.quantity} x item</span>
                            <a
                                href="#"
                                className="ps-product__remove-item"
                                onClick={(e) => handleRemoveItem(e, item.productID)}>
                                <strong>Remove </strong>
                            </a>
                        </p>
                    </ProductOnCart>
                </div>
            ));
            cartItemsView = <div className="ps-cart__items">{items}</div>;
            cartActionsView = (
                <>
                    <div className="ps-cart__summary">
                        <div className="ps-cart__total">
                            <h4>
                                Total: <strong>₹{cartAmountView}</strong>
                            </h4>
                        </div>
                        <div className="ps-cart__clear-cart">
                            <button
                                href="#"
                                className="ps-btn ps-btn--sm ps-btn--outline"
                                onClick={(e) => handleRemoveCart(e)}>
                                Clear all items
                            </button>
                        </div>
                    </div>
                    <div className="ps-cart__actions">
                        {/* <Link href="/shop/shopping-cart" className="ps-btn ps-btn--primary">
                            View Cart
                        </Link> */}
                        <Link href="/shop/cart" className="ps-btn ps-btn--orange">
                            Checkout
                        </Link>
                    </div>
                </>
            );
        } else {
                cartItemsView = (
                <div className="ps-cart__items">
                    <div className="ps-empty-state ps-empty-state--compact">
                        <span className="ps-empty-state__icon" aria-hidden="true">
                            <i className="icon-cart" />
                        </span>
                        <h2 className="ps-empty-state__title">
                            Your cart is empty
                        </h2>
                        <p className="ps-empty-state__text">
                            Looks like you haven&apos;t made your choice yet.
                        </p>
                    </div>
                </div>
            );

            cartActionsView = (
                <>
                    <Link
                        href="/products"
                        className="ps-btn ps-btn--primary"
                        onClick={(e) => handleCloseDrawer(e)}>
                        Back to Products
                    </Link>
                </>
            );
        }
    }
    return (
        <div className="ps-cart--simple">
            <div className="ps-cart__header">
                <h3>
                    Cart <sup>({cartQuantityView ? cartQuantityView : 0 })</sup>
                </h3>
            </div>
            <div className="ps-cart__content">
                {cartItemsView}
                {cartActionsView}
            </div>
        </div>
    );
};

export default EcomerceMiniCart;