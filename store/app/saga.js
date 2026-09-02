import { all, put, takeEvery } from 'redux-saga/effects';
import {
    actionTypes,
    toggleDrawerSuccess,
    toggleSearchBoxSuccess,
} from '@/store/app/action';

function* toggleSearchBoxSaga({ payload }) {
    try {
        yield put(toggleSearchBoxSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

function* toggleDrawerSaga({ payload }) {
    try {
        yield put(toggleDrawerSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.TOGGLE_SEARCHBOX, toggleSearchBoxSaga)]);
    yield all([takeEvery(actionTypes.TOGGLE_DRAWER, toggleDrawerSaga)]);
}

