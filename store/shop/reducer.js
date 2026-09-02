import { actionTypes } from './action';

export const initialState = {
    isGridView: true,
    isFilter: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_SHOP_GRID_VIEW_SUCCESS:
            return {
                ...state,
                isGridView: action.payload,
            };
        case actionTypes.TOGGLE_SHOP_FILTER_SUCCESS:
            return {
                ...state,
                isFilter: action.payload,
            };

        default:
            return state;
    }
}

export default reducer;
