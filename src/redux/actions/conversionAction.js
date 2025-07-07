import { BIGQUERY_TO_ICEBERG, DATA_FILES_TO_ICEBERG, POSTGERS_TO_ICEBERG } from "./types";


export const bigqueryToIceberg = (data, onSuccess, onError) => {
  return {
    type: BIGQUERY_TO_ICEBERG,
    data,
    onSuccess,
    onError,
  };
};

export const dataFilesToIceberg = (data, onSuccess, onError) => {
  return {
    type: DATA_FILES_TO_ICEBERG,
    data,
    onSuccess,
    onError,
  };
};

export const postgresToIceberg = (data, onSuccess, onError) => {
  return {
    type: POSTGERS_TO_ICEBERG,
    data,
    onSuccess,
    onError,
  };
};