import { all } from "redux-saga/effects";
import { emailLoginWatcher, googleLoginWatcher, signupWatcher} from "./authSaga";

export default function* rootSaga() {
        yield all([
                signupWatcher(),
                googleLoginWatcher(),
                emailLoginWatcher(),
        ]);
}
