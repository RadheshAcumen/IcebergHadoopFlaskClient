import { call, takeLatest } from 'redux-saga/effects';
import * as ConversionApis from "../apis/conversionApi";
import { CONVERT_TO_ICEBERG_REQUEST } from '../actions/types';

function* handleConvertToIcebergWorker(action) {
  try {
    const res = yield call(ConversionApis.ConversionIcebergToBigquery, action.data);
    console.log(res, ' this is the res ----------------------------------------------------');

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


export function* handleConvertToIcebergWatcher() {
  yield takeLatest(CONVERT_TO_ICEBERG_REQUEST, handleConvertToIcebergWorker);
}