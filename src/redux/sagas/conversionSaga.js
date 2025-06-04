import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  CONVERT_TO_ICEBERG_REQUEST,
  CONVERT_TO_ICEBERG_SUCCESS,
  CONVERT_TO_ICEBERG_FAILURE,
} from '../actions/conversionActions';

function* handleConvertToIceberg(action) {
  try {
    const response = yield call(() =>
      axios.post('http://localhost:5000/iceberg-to-big-query-conversion/', action.payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    );
    yield put({ type: CONVERT_TO_ICEBERG_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: CONVERT_TO_ICEBERG_FAILURE, error: error.message });
  }
}

export default function* conversionSaga() {
  yield takeLatest(CONVERT_TO_ICEBERG_REQUEST, handleConvertToIceberg);
}
