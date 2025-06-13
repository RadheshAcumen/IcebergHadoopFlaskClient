import { api } from "./api";

export const ConversionIcebergToBigquery = (formData) => {
  return api.post(`/iceberg-to-big-query-conversion`, formData);
};

export const ConversionDataFilesToIceberg = (formData) => {
  return api.post(`/iceberg-to-big-query-conversion`, formData);
};
