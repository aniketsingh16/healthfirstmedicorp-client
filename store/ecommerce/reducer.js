import { actionTypes } from "./action";

export const initState = {
    wishlistItems: [],
    compareItems: [],
    cartItems: [],
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.SET_WISHLIST_ITEMS_SUCCESS:
            return {
                ...state,
                wishlistItems: action.payload,
            };
        case actionTypes.SET_CART_ITEMS_SUCCESS:
            return {
                ...state,
                cartItems: action.payload,
            };
        case actionTypes.SET_COMPARE_ITEMS_SUCCESS:
            return {
                ...state,
                compareItems: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;
