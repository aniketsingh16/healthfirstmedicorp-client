import { all, put, takeEvery } from "redux-saga/effects";

import {
    actionTypes,
    setCartItemsSuccess,
    setCompareItemsSuccess,
    setWishlistTtemsSuccess,
    // setProductsSuccess
} from "./action";

function* getWishlistItems({ payload }) {
    try {
        yield put(setWishlistTtemsSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

function* getCartItems({ payload }) {
    try {
        yield put(setCartItemsSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

function* getCompareItems({ payload }) {
    try {
        yield put(setCompareItemsSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}
// function* getProducts({ payload }) {
//     try {
//         yield put(setProductsSuccess(payload));
//     } catch (err) {
//         console.log(err);
//     }
// }

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.SET_WISHLIST_ITEMS, getWishlistItems)]);
    yield all([takeEvery(actionTypes.SET_CART_ITEMS, getCartItems)]);
    yield all([takeEvery(actionTypes.SET_COMPARE_ITEMS, getCompareItems)]);
    // yield all([takeEvery(actionTypes.SET_PRODUCTS, getProducts)]);
}
