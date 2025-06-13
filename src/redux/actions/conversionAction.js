import { CONVERT_TO_ICEBERG_REQUEST, DATA_FILES_TO_ICEBERG } from "./types";


export const convertToIceberg = (data, onSuccess, onError) => {
  return {
    type: CONVERT_TO_ICEBERG_REQUEST,
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