export const actionTypes = {
    SET_WISHLIST_ITEMS: "SET_WISHLIST_ITEMS",
    SET_WISHLIST_ITEMS_SUCCESS: "SET_WISHLIST_ITEMS_SUCCESS",

    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_CART_ITEMS_SUCCESS: "SET_CART_ITEMS_SUCCESS",

    SET_COMPARE_ITEMS: "SET_COMPARE_ITEMS",
    SET_COMPARE_ITEMS_SUCCESS: "SET_COMPARE_ITEMS_SUCCESS",
};

export function setWishlistItems(payload) {
    return { type: actionTypes.SET_WISHLIST_ITEMS, payload };
}

export function setWishlistTtemsSuccess(payload) {
    return { type: actionTypes.SET_WISHLIST_ITEMS_SUCCESS, payload };
}

export function setCartItems(payload) {
    return { type: actionTypes.SET_CART_ITEMS, payload };
}

export function setCartItemsSuccess(payload) {
    return { type: actionTypes.SET_CART_ITEMS_SUCCESS, payload };
}

export function setCompareItems(payload) {
    return { type: actionTypes.SET_COMPARE_ITEMS, payload };
}

export function setCompareItemsSuccess(payload) {
    return { type: actionTypes.SET_COMPARE_ITEMS_SUCCESS, payload };
}

// export function setProducts(payload) {
//     return { type: actionTypes.SET_PRODUCTS, payload };
// }

// export function setProductsSuccess(payload) {
//     return { type: actionTypes.SET_PRODUCTS_SUCCESS, payload };
// }
