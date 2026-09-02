import { all, put, takeEvery } from 'redux-saga/effects';
import { 
    actionTypes, 
    toggleShopFilterSuccess,
    changeShopGridViewSuccess 
} from '@/store/shop/action';

function* handleToggleViewModeSaga({ payload }) {
    try {
        yield put(changeShopGridViewSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

function* handleToggleShopFilterSaga({ payload }) {
    try {
        yield put(toggleShopFilterSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actionTypes.CHANGE_SHOP_GRID_VIEW, handleToggleViewModeSaga),
        takeEvery(actionTypes.TOGGLE_SHOP_FILTER, handleToggleShopFilterSaga),
    ]);
}