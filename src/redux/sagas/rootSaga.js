import { all } from "redux-saga/effects";
import { emailLoginWatcher, googleLoginWatcher, signupWatcher } from "./authSaga";
import { handleConvertToIcebergWatcher } from "./conversionSaga";

export default function* rootSaga() {
        yield all([
                signupWatcher(),
                googleLoginWatcher(),
                emailLoginWatcher(),
                handleConvertToIcebergWatcher(),
        ]);
}
