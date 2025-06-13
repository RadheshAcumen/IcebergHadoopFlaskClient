import { all } from "redux-saga/effects";
import { emailLoginWatcher, googleLoginWatcher, signupWatcher } from "./authSaga";
import { handleBigQueryToIcebergWatcher, handleDataFilesToIcebergWatcher } from "./conversionSaga";

export default function* rootSaga() {
        yield all([
                signupWatcher(),
                googleLoginWatcher(),
                emailLoginWatcher(),
                handleBigQueryToIcebergWatcher(),
                handleDataFilesToIcebergWatcher(),
        ]);
}
