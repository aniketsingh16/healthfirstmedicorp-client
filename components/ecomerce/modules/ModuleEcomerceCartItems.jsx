import React from "react";
import { connect } from "react-redux";
import ProductOnCart from "@/components/elements/products/ProductOnCart";
import useEcomerce from "@/hooks/useEcomerce";
import { Result } from "antd";

const ModuleEcomerceCartItems = ({ ecommerce, cartItems }) => {
    const { increaseQty, decreaseQty, removeItem } = useEcomerce();

    function handleRemoveItem(e, productID) {
        e.preventDefault();
        removeItem({ productID: productID }, ecommerce.cartItems, "cart");
    }

    function handleIncreaseItemQty(e, productID) {
        e.preventDefault();
        increaseQty({ productID: productID }, ecommerce.cartItems);
    }

    function handleDecreaseItemQty(e, productID) {
        e.preventDefault();
        decreaseQty({ productID: productID }, ecommerce.cartItems);
    }

    // View
    let cartItemsViews;
    if (cartItems.length > 0) {
        const items = cartItems.map((item) => (
            <tr key={item.productID}>
                <td>
                    <a
                        className="ps-icon ps-cart-item__remove"
                        href="#"
                        onClick={(e) => handleRemoveItem(e, item.productID)}>
                        <i className="icon-cross mr-2"></i>
                    </a>
                    <ProductOnCart product={item} />
                </td>
                <td data-label="price">
                    <strong>₹{item.sellingPrice}</strong>
                </td>
                <td data-label="quantity">
                    <span className="form-group--number">
                        <button
                            className="up"
                            onClick={(e) =>
                                handleIncreaseItemQty(e, item.productID)
                            }></button>
                        <button
                            className="down"
                            onClick={(e) =>
                                handleDecreaseItemQty(e, item.productID)
                            }></button>
                        <input
                            className="form-control"
                            type="text"
                            placeholder={item.quantity}
                            disabled={true}
                        />
                    </span>
                </td>
                <td data-label="total">
                    <strong>₹{(item.sellingPrice * item.quantity).toFixed(2)}</strong>
                </td>
            </tr>
        ));

        cartItemsViews = (
            <>
                <table className="table ps-table ps-table--shopping-cart ps-table--responsive">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>{items}</tbody>
                </table>
            </>
        );
    } else {
        cartItemsViews = (
            <Result status="warning" title="No product in cart." />
        );
    }
    return <>{cartItemsViews}</>;
};

export default connect((state) => state)(ModuleEcomerceCartItems);
