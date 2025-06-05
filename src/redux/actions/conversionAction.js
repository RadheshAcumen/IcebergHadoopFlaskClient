import { CONVERT_TO_ICEBERG_REQUEST } from "./types";


export const convertToIceberg = (data, onSuccess, onError) => {
  return {
    type: CONVERT_TO_ICEBERG_REQUEST,
    data,
    onSuccess,
    onError,
  };
};
