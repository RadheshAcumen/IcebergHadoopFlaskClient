import { call, takeLatest } from "redux-saga/effects";
import * as authApis from "../apis/authApi";
import { EMAIL_LOGIN, GOOGLE_LOGIN, SIGNUP } from "../actions/types";


export function* googleLoginWorker(action) {
    try {
        const res = yield call(authApis.googleLoginApi, action.data);
        if (res.status === 200) {
            yield action.onSuccess(res);
        } else {
            yield action.onError(res);
        }
    } catch (error) {
        yield action.onError({
            data: {
                message: error,
            },
        });
    }
}

export function* signupWorker(action) {
    try {
        const res = yield call(authApis.signupApi, action.data);
        if (res.status === 200) {
            yield action.onSuccess(res);
        } else {
            yield action.onError(res);
        }
    } catch (error) {
        yield action.onError({
            data: {
                message: error,
            },
        });
    }
}

export function* emailLoginWorker(action) {
    try {
        const res = yield call(authApis.emailLoginApi, action.data);
        if (res.status === 200) {
            yield action.onSuccess(res);
        } else {
            yield action.onError(res);
        }
    } catch (error) {
        yield action.onError({
            data: {
                message: error,
            },
        });
    }
}

/**Watcher functions */
export function* googleLoginWatcher() {
    yield takeLatest(GOOGLE_LOGIN, googleLoginWorker);
}

export function* signupWatcher() {
    yield takeLatest(SIGNUP, signupWorker);
}

export function* emailLoginWatcher() {
    yield takeLatest(EMAIL_LOGIN, emailLoginWorker);
}
