export const actionTypes = {
    CHANGE_SHOP_GRID_VIEW: 'CHANGE_SHOP_GRID_VIEW',
    CHANGE_SHOP_GRID_VIEW_SUCCESS: 'CHANGE_SHOP_GRID_VIEW_SUCCESS',
    TOGGLE_SHOP_FILTER: 'TOGGLE_SHOP_FILTER',
    TOGGLE_SHOP_FILTER_SUCCESS: 'TOGGLE_SHOP_FILTER_SUCCESS',
};

export function changeShopGridView(payload) {
    return { type: actionTypes.CHANGE_SHOP_GRID_VIEW, payload };
}

export function changeShopGridViewSuccess(payload) {
    return {
        type: actionTypes.CHANGE_SHOP_GRID_VIEW_SUCCESS,
        payload,
    };
}

export function toggleShopFilter(payload) {
    return { type: actionTypes.TOGGLE_SHOP_FILTER, payload };
}

export function toggleShopFilterSuccess(payload) {
    return {
        type: actionTypes.TOGGLE_SHOP_FILTER_SUCCESS,
        payload,
    };
}
